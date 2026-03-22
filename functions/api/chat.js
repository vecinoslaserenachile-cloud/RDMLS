const { GoogleGenAI } = require('@google/genai');

export async function onRequestPost({ request, env }) {
  const apiKey = env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API Key missing' }), { status: 500 });
  }

  try {
    const { message, history } = await request.json();
    const ai = new GoogleGenAI(apiKey);
    const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const chat = model.startChat({
        history: history || [],
        systemInstruction: "Eres 'Farito', el asistente inteligente de vecinoslaserena.cl y farito.cl. Tu rol es ser un enrutador inteligente. Si el usuario reporta un problema, sugiere los canales oficiales de la plataforma (Radar Vecinal, Reportes). Mantén un tono servicial, rápido y muy local de La Serena, Chile."
    });

    const result = await chat.sendMessage(message);

    return new Response(JSON.stringify({ response: result.response.text() }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
