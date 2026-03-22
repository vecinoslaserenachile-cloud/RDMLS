const { GoogleGenAI } = require('@google/genai');

export async function onRequestPost(context) {
  const { env, request } = context;
  const apiKey = env.GEMINI_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API Key not configured' }), { status: 500 });
  }

  try {
    const { text } = await request.json();
    const ai = new GoogleGenAI(apiKey);
    const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Analiza el comentario del vecino de La Serena: "${text}". 
    Determina toxicidad (isToxic), sentimiento (alegría, enojo, preocupación, neutro) y tema principal.
    Devuelve estrictamente JSON.`;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
      }
    });

    return new Response(result.response.text(), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
