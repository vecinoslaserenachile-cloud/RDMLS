/**
 * RDMLS Radio Digital Municipal - API de Mensajes (Cloudflare D1)
 * Manejo de la Huincha de Mensajes (Marquee)
 * 
 * Endpoint: /api/radio
 */
export async function onRequest(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const method = request.method;

    if (!env.DB) {
        return new Response(JSON.stringify({ error: "D1 Binding 'DB' not found." }), { status: 500 });
    }

    try {
        // --- GET: Obtener todos los mensajes ---
        if (method === 'GET') {
            let { results } = await env.DB.prepare(
                "SELECT * FROM rdmls_marquees ORDER BY id ASC"
            ).all();
            
            // [SMART COMUNA] AUTO-SEED: Si no hay mensajes, poblar con los institucionales 2026
            if (results.length === 0) {
                await env.DB.prepare("INSERT INTO rdmls_marquees (text, icon, color, bold) VALUES (?, ?, ?, ?)").bind('🖥️ BIENVENIDOS A LA NUEVA RDMLS DIGITAL: INTEGRACIÓN TOTAL 2026', '🖥️', '#fbbf24', 1).run();
                await env.DB.prepare("INSERT INTO rdmls_marquees (text, icon, color, bold) VALUES (?, ?, ?, ?)").bind('✅ SOBERANÍA DIGITAL ACTIVA: PORTAL RDMLS OPERANDO AL 100%', '✅', '#00ff41', 1).run();
                await env.DB.prepare("INSERT INTO rdmls_marquees (text, icon, color, bold) VALUES (?, ?, ?, ?)").bind('📻 ESTÁS ESCUCHANDO LA SEÑAL DIGITAL RDMLS - TRANSMITIENDO AL 100%', '📻', '#ffffff', 0).run();
                
                const { results: seededResults } = await env.DB.prepare("SELECT * FROM rdmls_marquees ORDER BY id ASC").all();
                results = seededResults;
            }
            
            return Response.json(results);
        }

        // --- POST: Añadir nuevo mensaje ---
        if (method === 'POST') {
            const data = await request.json();
            const { success } = await env.DB.prepare(
                "INSERT INTO rdmls_marquees (text, icon, color, bold, fontFamily) VALUES (?, ?, ?, ?, ?)"
            ).bind(data.text, data.icon, data.color, data.bold ? 1 : 0, data.fontFamily).run();
            return Response.json({ success });
        }

        // --- PUT: Editar mensaje existente ---
        if (method === 'PUT') {
            const data = await request.json();
            const { success } = await env.DB.prepare(
                "UPDATE rdmls_marquees SET text = ? WHERE id = ?"
            ).bind(data.text, data.id).run();
            return Response.json({ success });
        }

        // --- DELETE: Eliminar mensaje ---
        if (method === 'DELETE') {
            const id = url.searchParams.get('id');
            if (!id) return new Response("Missing ID", { status: 400 });
            
            const { success } = await env.DB.prepare(
                "DELETE FROM rdmls_marquees WHERE id = ?"
            ).bind(id).run();
            return Response.json({ success });
        }

        return new Response("Method Not Allowed", { status: 405 });

    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}
