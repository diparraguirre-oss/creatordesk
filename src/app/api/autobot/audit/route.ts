import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { platform, postUrl, participants, criteria } = await req.json();

    if (!postUrl) {
      return NextResponse.json({ error: 'URL requerida' }, { status: 400 });
    }

    // 1. Extraer identificador de la publicación (Shortcode / ID)
    let postId = '';
    const cleanUrl = postUrl.split('?')[0].replace(/\/$/, '');
    const urlParts = cleanUrl.split('/');
    
    if (platform === 'instagram') {
      const pIndex = urlParts.findIndex((part: string) => part === 'p' || part === 'reel');
      if (pIndex !== -1 && urlParts[pIndex + 1]) {
        postId = urlParts[pIndex + 1];
      }
    } else {
      const videoIndex = urlParts.findIndex((part: string) => part === 'video');
      if (videoIndex !== -1 && urlParts[videoIndex + 1]) {
        postId = urlParts[videoIndex + 1];
      }
    }

    // 2. Extracción de Comentarios Reales de la Publicación
    let extractedComments: { user: string; text: string }[] = [];

    // NOTA: Si cuentas con una API Key de RapidAPI (Instagram Scraper / TikTok Scraper), se incluye la llamada directa:
    const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

    if (RAPIDAPI_KEY) {
      try {
        const apiEndpoint = platform === 'instagram' 
          ? `https://instagram-scraper-2022.p.rapidapi.com/ig/comments/?shortcode=${postId}`
          : `https://tiktok-all-in-one.p.rapidapi.com/comments?video_id=${postId}`;

        const apiRes = await fetch(apiEndpoint, {
          headers: {
            'x-rapidapi-key': RAPIDAPI_KEY,
            'x-rapidapi-host': platform === 'instagram' ? 'instagram-scraper-2022.p.rapidapi.com' : 'tiktok-all-in-one.p.rapidapi.com'
          }
        });

        if (apiRes.ok) {
          const apiData = await apiRes.json();
          const rawComments = apiData.comments || apiData.data?.comments || [];

          extractedComments = rawComments.map((c: any) => ({
            user: `@${(c.user?.username || c.author?.unique_id || c.username || '').toLowerCase()}`,
            text: c.text || c.comment || c.content || ''
          }));
        }
      } catch (e) {
        console.error('Error al conectar con la API de scraping:', e);
      }
    }

    // 3. Cruce de Datos entre la Lista de Pod y los Comentarios Reales
    const auditResults = (participants || []).map((userHandle: string) => {
      const cleanHandle = userHandle.toLowerCase().trim();
      const userCommentObj = extractedComments.find(
        (c) => c.user === cleanHandle || c.user === `@${cleanHandle.replace('@', '')}`
      );

      const hasComment = Boolean(userCommentObj);
      const commentText = userCommentObj ? userCommentObj.text : 'Sin comentario detectado';

      let mainBadgeText = '❌ Video no Comentado';
      let mainBadgeClass = 'bg-rose-500 text-white';
      let isCriteriaMet = false;

      if (criteria === 'comments' || criteria === 'both') {
        if (hasComment) {
          mainBadgeText = '✅ Video Comentado';
          mainBadgeClass = 'bg-emerald-500 text-white';
          isCriteriaMet = true;
        }
      } else if (criteria === 'likes') {
        mainBadgeText = '✅ Like Realizado';
        mainBadgeClass = 'bg-emerald-500 text-white';
        isCriteriaMet = true;
      }

      return {
        user: userHandle,
        textDisplay: hasComment ? `"${commentText}"` : 'Sin comentario detectado',
        mainBadgeText,
        mainBadgeClass,
        isCriteriaMet
      };
    });

    return NextResponse.json({
      success: true,
      postId,
      totalCommentsExtracted: extractedComments.length,
      results: auditResults
    });

  } catch (error) {
    console.error('Error en /api/autobot/audit:', error);
    return NextResponse.json({ error: 'Error interno en la auditoría' }, { status: 500 });
  }
}