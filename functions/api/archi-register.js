/**
 * ARCHI Campaign Registration API
 * Cloudflare Pages Function - Stores supporter data in D1 (no Firebase)
 * Routes: POST /api/archi-register, GET /api/archi-register (admin)
 *
 * WhatsApp: Al registrarse, devuelve un enlace wa.me preformateado
 * para que el simpatizante confirme su adhesión al +56956020690
 */

const ADMIN_PHONE = '56956020690'; // ← número WhatsApp del administrador

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

// ── POST: Registro de simpatizante ─────────────────────────
export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const { name, email, phone, radio_station, ideas } = body;

    // Validaciones básicas
    if (!name || !email) {
      return new Response(JSON.stringify({ success: false, error: 'Nombre y correo son obligatorios.' }), {
        status: 400, headers: CORS
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ success: false, error: 'Correo electrónico inválido.' }), {
        status: 400, headers: CORS
      });
    }

    // Verificar duplicado por email
    const existing = await env.DB_ARCHI.prepare(
      'SELECT id FROM archi_supporters WHERE email = ?'
    ).bind(email.toLowerCase().trim()).first();

    if (existing) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Este correo ya está registrado. ¡Gracias por tu apoyo!'
      }), { status: 409, headers: CORS });
    }

    // Insertar en D1
    const stmt = await env.DB_ARCHI.prepare(
      `INSERT INTO archi_supporters (name, email, phone, radio_station, ideas, created_at)
       VALUES (?, ?, ?, ?, ?, datetime('now', 'localtime'))`
    ).bind(
      name.trim(),
      email.toLowerCase().trim(),
      phone ? phone.trim() : null,
      radio_station ? radio_station.trim() : null,
      ideas ? ideas.trim() : null
    ).run();

    const registrationId = stmt.meta?.last_row_id || '?';

    // ── Construir mensaje WhatsApp preformateado ──────────────
    // El nuevo simpatizante presiona el botón y se abre WhatsApp
    // con un mensaje listo para enviar al administrador.
    const waMessage = [
      `📻 *NUEVA ADHESIÓN - Lista Nueva Energía*`,
      ``,
      `👤 *Nombre:* ${name.trim()}`,
      `📧 *Correo:* ${email.toLowerCase().trim()}`,
      `📱 *Teléfono:* ${phone ? phone.trim() : 'No indicado'}`,
      `🎙️ *Emisora:* ${radio_station ? radio_station.trim() : 'No indicada'}`,
      ``,
      ideas ? `💡 *Mi idea:* ${ideas.trim()}` : `💡 *Idea:* (sin comentarios adicionales)`,
      ``,
      `🆔 Registro #${registrationId} | radiovecinos.cl/archi`,
    ].join('\n');

    const waLink = `https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(waMessage)}`;

    return new Response(JSON.stringify({
      success: true,
      message: '¡Bienvenido/a a la Lista Nueva Energía! Tu registro fue guardado correctamente.',
      id: registrationId,
      waLink,                  // ← el frontend abre esto automáticamente
      adminPhone: ADMIN_PHONE,
    }), { status: 201, headers: CORS });

  } catch (err) {
    console.error('[archi-register] ERROR:', err);
    return new Response(JSON.stringify({ success: false, error: 'Error interno del servidor.' }), {
      status: 500, headers: CORS
    });
  }
}

// ── GET: Listado de registros (admin protegido) ────────────
export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');

  if (token !== 'archi2026admin') {
    return new Response(JSON.stringify({ error: 'No autorizado.' }), {
      status: 401, headers: CORS
    });
  }

  try {
    const { results } = await env.DB_ARCHI.prepare(
      'SELECT id, name, email, phone, radio_station, ideas, created_at FROM archi_supporters ORDER BY created_at DESC'
    ).all();

    // Construir link de WhatsApp para contactar a cada simpatizante
    const enriched = results.map(r => ({
      ...r,
      waContact: r.phone
        ? `https://wa.me/${r.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hola ${r.name}, te contactamos desde la Lista Nueva Energía de ARCHI 📻`)}`
        : null
    }));

    return new Response(JSON.stringify({
      success: true,
      total: enriched.length,
      data: enriched
    }), { status: 200, headers: CORS });

  } catch (err) {
    return new Response(JSON.stringify({ error: 'Error al consultar la base de datos.' }), {
      status: 500, headers: CORS
    });
  }
}

// ── OPTIONS: Preflight CORS ────────────────────────────────
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}
