/**
 * ARCHI News API
 * Cloudflare Pages Function - Noticias ARCHI desde D1 (no Firebase)
 * Routes: GET /api/archi-news (público), POST (admin con token)
 */

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

// GET: Obtener noticias (público)
export async function onRequestGet({ request, env }) {
  try {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '20');
    const token = url.searchParams.get('token');

    let query;
    if (token === 'archi2026admin') {
      // Admin ve todo
      query = env.DB_ARCHI.prepare(
        'SELECT * FROM archi_news ORDER BY created_at DESC LIMIT ?'
      ).bind(limit);
    } else {
      // Público solo ve activas
      query = env.DB_ARCHI.prepare(
        'SELECT id, title, content, image_url, category, created_at FROM archi_news WHERE active = 1 ORDER BY created_at DESC LIMIT ?'
      ).bind(limit);
    }

    const { results } = await query.all();
    return new Response(JSON.stringify({ success: true, data: results }), {
      status: 200, headers: CORS
    });

  } catch (err) {
    console.error('[archi-news GET]', err);
    return new Response(JSON.stringify({ success: false, error: 'Error al obtener noticias.' }), {
      status: 500, headers: CORS
    });
  }
}

// POST: Crear noticia (solo admin)
export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const { token, title, content, image_url, category } = body;

    if (token !== 'archi2026admin') {
      return new Response(JSON.stringify({ success: false, error: 'No autorizado.' }), {
        status: 401, headers: CORS
      });
    }

    if (!title || !content) {
      return new Response(JSON.stringify({ success: false, error: 'Título y contenido son obligatorios.' }), {
        status: 400, headers: CORS
      });
    }

    const stmt = await env.DB_ARCHI.prepare(
      `INSERT INTO archi_news (title, content, image_url, category, active, created_at)
       VALUES (?, ?, ?, ?, 1, datetime('now', 'localtime'))`
    ).bind(
      title.trim(),
      content.trim(),
      image_url || null,
      category || 'General'
    ).run();

    return new Response(JSON.stringify({
      success: true,
      message: 'Noticia publicada correctamente.',
      id: stmt.meta?.last_row_id
    }), { status: 201, headers: CORS });

  } catch (err) {
    console.error('[archi-news POST]', err);
    return new Response(JSON.stringify({ success: false, error: 'Error al publicar noticia.' }), {
      status: 500, headers: CORS
    });
  }
}

// DELETE: Eliminar noticia (admin)
export async function onRequestDelete({ request, env }) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const token = url.searchParams.get('token');

    if (token !== 'archi2026admin') {
      return new Response(JSON.stringify({ success: false, error: 'No autorizado.' }), {
        status: 401, headers: CORS
      });
    }

    await env.DB_ARCHI.prepare('DELETE FROM archi_news WHERE id = ?').bind(id).run();

    return new Response(JSON.stringify({ success: true, message: 'Noticia eliminada.' }), {
      status: 200, headers: CORS
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: 'Error al eliminar.' }), {
      status: 500, headers: CORS
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS });
}
