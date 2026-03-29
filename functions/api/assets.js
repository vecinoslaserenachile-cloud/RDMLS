/**
 * VLS Smart Comuna - Motor de Almacenamiento Cloudflare R2
 * Gestión de Diplomas, Activos 3D y Documentación Municipal.
 * 
 * Endpoint: /api/assets
 */
export async function onRequest(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const method = request.method;
    const fileName = url.searchParams.get('name');

    if (!env.VLS_BUCKET) {
        return new Response(JSON.stringify({ error: "R2 Binding 'VLS_BUCKET' not found." }), { status: 500 });
    }

    if (!fileName) {
        return new Response("Missing 'name' parameter", { status: 400 });
    }

    try {
        // --- GET: Descargar Activo ---
        if (method === 'GET') {
            const object = await env.VLS_BUCKET.get(fileName);
            if (object === null) {
                return new Response("Object Not Found", { status: 404 });
            }

            const headers = new Headers();
            object.writeHttpMetadata(headers);
            headers.set('etag', object.httpEtag);
            
            // Forzar descarga si es PDF
            if (fileName.endsWith('.pdf')) {
                headers.set('Content-Disposition', `attachment; filename="${fileName}"`);
            }

            return new Response(object.body, { headers });
        }

        // --- PUT: Subir Activo ---
        if (method === 'PUT') {
            // Solo para admin/sistemas (implementar auth en el futuro)
            await env.VLS_BUCKET.put(fileName, request.body);
            return Response.json({ success: true, url: `/api/assets?name=${fileName}` });
        }

        // --- DELETE: Eliminar Activo ---
        if (method === 'DELETE') {
            await env.VLS_BUCKET.delete(fileName);
            return Response.json({ success: true });
        }

        return new Response("Method Not Allowed", { status: 405 });

    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}
