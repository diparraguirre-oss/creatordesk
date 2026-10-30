import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { platform, postUrl, participants, criteria } = await req.json();

    if (!postUrl) {
      return NextResponse.json({ error: 'URL requerida' }, { status: 400 });
    }

    // Limpiar URL y extraer identificador
    const cleanUrl = postUrl.split('?')[0].replace(/\/$/, '');
    const urlParts = cleanUrl.split('/');
    let shortcode = '';

    if (platform === 'instagram') {
      const pIndex = urlParts.findIndex((part: string) => part === 'p' || part === 'reel');
      if (pIndex !== -1 && urlParts[pIndex + 1]) {
        shortcode = urlParts[pIndex + 1];
      }
    }

    // Extracción dinámica de comentarios vía fetch estructurado
    let extractedCommentsMap: Record<string, string> = {};

    if (shortcode) {
      try {
        // Intento de extracción pública
        const igRes = await fetch(`https://www.instagram.com/p/${shortcode}/?__a=1&__d=dis`, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'application/json'
          }
        });

        if (igRes.ok) {
          const igData = await igRes.json();
          const items = igData?.graphql?.shortcode_media?.edge_media_to_parent_comment?.edges || [];
          items.forEach((edge: any) => {
            const user = `@${edge.node.owner.username.toLowerCase()}`;
            const text = edge.node.text;
            extractedCommentsMap[user] = text;
          });
        }
      } catch (e) {
        console.error('Error al obtener datos públicos:', e);
      }
    }

    // Cruce dinámico con la lista de participantes del Pod
    const auditResults = (participants || []).map((userHandle: string) => {
      const cleanHandle = userHandle.toLowerCase().trim();
      const realComment = extractedCommentsMap[cleanHandle];
      const hasComment = Boolean(realComment);

      let mainBadgeText = '❌ Video no Comentado';
      let mainBadgeClass = 'bg-rose-500 text-white';
      let isCriteriaMet = false;

      if (hasComment) {
        mainBadgeText = '✅ Video Comentado';
        mainBadgeClass = 'bg-emerald-500 text-white';
        isCriteriaMet = true;
      }

      return {
        user: userHandle,
        textDisplay: hasComment ? `"${realComment}"` : 'Sin comentario detectado',
        mainBadgeText,
        mainBadgeClass,
        isCriteriaMet
      };
    });

    return NextResponse.json({
      success: true,
      results: auditResults
    });

  } catch (error) {
    console.error('Error en auditoría:', error);
    return NextResponse.json({ error: 'Error interno en servidor' }, { status: 500 });
  }
}