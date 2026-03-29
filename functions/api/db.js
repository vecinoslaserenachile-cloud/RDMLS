/**
 * VLS Smart Comuna - Motor de Base de Datos Cloudflare D1
 * Manejo de Reportes Ciudadanos, Leads y Logs sin pasar por Firebase.
 * 
 * Endpoint: /api/db
 */
export async function onRequest(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const method = request.method;
    const path = url.searchParams.get('table'); // vls_reports, puerta_leads, etc.

    if (!env.DB) {
        return new Response(JSON.stringify({ error: "D1 Binding 'DB' not found." }), { status: 500 });
    }

    try {
        // --- GET: Consultar Datos ---
        if (method === 'GET') {
            if (path === 'reports') {
                const { results } = await env.DB.prepare("SELECT * FROM vls_reports ORDER BY created_at DESC LIMIT 50").all();
                return Response.json(results);
            }
            if (path === 'leads') {
                // Solo para admin (verificar auth en el futuro)
                const { results } = await env.DB.prepare("SELECT * FROM puerta_leads ORDER BY created_at DESC").all();
                return Response.json(results);
            }
        }

        // --- POST: Insertar Datos ---
        if (method === 'POST') {
            const data = await request.json();

            if (path === 'reports') {
                const { success } = await env.DB.prepare(
                    "INSERT INTO vls_reports (tipo, descripcion, direccion, user_id) VALUES (?, ?, ?, ?)"
                ).bind(data.tipo, data.descripcion, data.direccion, data.user_id).run();
                return Response.json({ success });
            }

            if (path === 'leads') {
                const { success } = await env.DB.prepare(
                    "INSERT INTO puerta_leads (nombre, email, empresa, cargo, telefono, interes, source) VALUES (?, ?, ?, ?, ?, ?, ?)"
                ).bind(data.nombre, data.email, data.empresa, data.cargo, data.telefono, data.interes, data.source).run();
                return Response.json({ success });
            }
            
            if (path === 'logs') {
                const { success } = await env.DB.prepare(
                    "INSERT INTO system_logs (modulo, accion, detalles, severidad) VALUES (?, ?, ?, ?)"
                ).bind(data.modulo, data.accion, data.detalles, data.severidad).run();
                return Response.json({ success });
            }
        }

        return new Response("Method or Path Not Allowed", { status: 405 });

    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}
