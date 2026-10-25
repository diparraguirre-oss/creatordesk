import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ reply: 'Formato de mensaje no válido.' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || '';

    if (!apiKey) {
      return NextResponse.json({ 
        reply: '⚠️ No se encontró la GEMINI_API_KEY en tu archivo .env.local.' 
      }, { status: 200 });
    }

    const systemInstruction = `Eres GiorgIA 🤖, la manager digital e inteligencia artificial personal para creadores de contenido e influencers.
Tu personalidad es profesional, cercana, empática, ingeniosa, carismática y astuta.
Responde de forma totalmente libre, fluida, conversacional y natural a CUALQUIER consulta del usuario (chistes, fecha, consejos de tarifas en PEN/USD, revisión de media kits, negociaciones con marcas, etc.).
Sé concisa pero práctica en tus respuestas.`;

    // 1. Estructurar el historial respetando el formato REST de Gemini
    let formattedContents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    // Instrucción de sistema inicial
    formattedContents.push({
      role: 'user',
      parts: [{ text: systemInstruction }]
    });
    formattedContents.push({
      role: 'model',
      parts: [{ text: '¡Entendido! Soy GiorgIA, tu manager digital. ¿En qué te ayudo hoy?' }]
    });

    // Mapear historial
    messages.forEach((m: any) => {
      const role = m.sender === 'user' ? 'user' : 'model';
      const lastRole = formattedContents[formattedContents.length - 1]?.role;
      if (lastRole !== role) {
        formattedContents.push({
          role,
          parts: [{ text: m.text }]
        });
      } else {
        formattedContents[formattedContents.length - 1].parts[0].text += `\n${m.text}`;
      }
    });

    // 2. Probar modelos más estables en cascada (1.5-flash -> 1.5-pro -> 2.5-flash)
    const candidateModels = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.5-flash'];
    let replyText = '';
    let lastError = '';

    for (const modelName of candidateModels) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: formattedContents }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);
        const data = await res.json();

        if (res.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
          replyText = data.candidates[0].content.parts[0].text;
          break; // ¡Conexión exitosa! Salimos del bucle
        } else if (data.error) {
          lastError = data.error.message;
        }
      } catch (err: any) {
        console.warn(`Modelo ${modelName} no respondió a tiempo.`);
      }
    }

    if (replyText) {
      return NextResponse.json({ reply: replyText });
    }

    // Respuesta conversacional de reserva si la cuota gratuita de Google está saturada en todos los modelos
    const lastUserMsg = messages[messages.length - 1]?.text || '';
    return NextResponse.json({ 
      reply: `¡Hola! 👋 Google está limitando temporalmente las peticiones por alta demanda (${lastError || 'Servidor ocupado'}). Con respecto a "${lastUserMsg}", coméntame los detalles y lo revisamos juntos.` 
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error en servidor GiorgIA:', error);
    return NextResponse.json({ reply: 'Ocurrió un problema de conexión con el servidor.' }, { status: 500 });
  }
}