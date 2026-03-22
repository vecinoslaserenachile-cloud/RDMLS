/**
 * VECINITY PAY — Cloudflare Pages Function
 * Endpoint: /api/vecinity-pay/create-order
 * 
 * Orquesta el pago híbrido:
 *   - Motor Nacional (Chile): Flow.cl API
 *   - Motor Global:           PayPal Checkout
 * 
 * Variables de Entorno requeridas (Cloudflare Pages Settings):
 *   FLOW_API_KEY       → Clave API de Flow.cl (Producción)
 *   FLOW_SECRET_KEY    → Secret para validar firma HMAC de Flow
 *   PAYPAL_CLIENT_ID   → Client ID de PayPal App
 *   PAYPAL_SECRET      → Secret de PayPal App
 *   PAYPAL_MODE        → 'sandbox' | 'live'
 *   FIREBASE_AUTH_KEY  → Admin SDK key para actualizar fichas
 *   VLS_WEBHOOK_SECRET → Secret interno para validar webhooks
 */

const FLOW_API_URL = 'https://www.flow.cl/api';
const FLOW_SANDBOX_URL = 'https://sandbox.flow.cl/api';

export async function onRequestPost(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const path = url.pathname;

    // Detectar motor basado en FLOW_MODE (prioritario) o prefijo de llave
    const currentFlowUrl = (env.FLOW_MODE === 'live') 
        ? FLOW_API_URL 
        : FLOW_SANDBOX_URL;

    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://vecinoslaserena.cl',
    };

    try {
        // ── RUTA 1: Crear Orden de Pago ──────────────────────────────────
        if (path.endsWith('/create-order')) {
            const body = await request.json();
            const { itemId, engine, userId, email, amountCLP, amountUSD, type, fichas } = body;

            // Validación básica de inputs
            if (!itemId || !engine || !userId || !email) {
                return new Response(JSON.stringify({ error: 'Parámetros incompletos' }), { status: 400, headers });
            }

            // Generar OrdenID única
            const orderId = `VLS-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

            // ── MOTOR NACIONAL: Flow.cl ──────────────────────────────────
            if (engine === 'national') {
                const flowParams = new URLSearchParams({
                    apiKey: env.FLOW_API_KEY,
                    commerceOrder: orderId,
                    subject: `VLS: ${type === 'fichas' ? fichas + ' Fichas VLS' : 'Suscripción Pro ' + itemId}`,
                    amount: Math.round(amountCLP),
                    email: email,
                    urlConfirmation: `https://vecinoslaserena.cl/api/vecinity-pay/webhook-flow`,
                    urlReturn: `https://vecinoslaserena.cl/rapido?pay_status=success&order=${orderId}`,
                    currency: 'CLP',
                    optional: JSON.stringify({ userId, fichas, type, itemId }),
                });

                // Firmar con HMAC-SHA256 según especificación Flow
                const signatureBase = [...flowParams.entries()]
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([k, v]) => k + v)
                    .join('');

                const encoder = new TextEncoder();
                const keyData = encoder.encode(env.FLOW_SECRET_KEY);
                const msgData = encoder.encode(signatureBase);
                const cryptoKey = await crypto.subtle.importKey('raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
                const signature = await crypto.subtle.sign('HMAC', cryptoKey, msgData);
                const hexSignature = Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, '0')).join('');

                flowParams.set('s', hexSignature);

                const flowRes = await fetch(`${currentFlowUrl}/payment/create`, {
                    method: 'POST',
                    body: flowParams,
                });
                const flowData = await flowRes.json();

                if (flowData.url && flowData.token) {
                    return new Response(JSON.stringify({
                        orderId,
                        engine: 'flow',
                        redirectUrl: `${flowData.url}?token=${flowData.token}`,
                    }), { status: 200, headers });
                }
                throw new Error('Flow API error: ' + JSON.stringify(flowData));
            }

            // ── MOTOR GLOBAL: PayPal ─────────────────────────────────────
            if (engine === 'global') {
                const isLive = env.PAYPAL_MODE === 'live';
                const ppBase = isLive ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';

                // 1. Obtener access token PayPal
                const tokenRes = await fetch(`${ppBase}/v1/oauth2/token`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Basic ${btoa(`${env.PAYPAL_CLIENT_ID}:${env.PAYPAL_SECRET}`)}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: 'grant_type=client_credentials',
                });
                const { access_token } = await tokenRes.json();

                // 2. Crear Order PayPal
                const ppOrderRes = await fetch(`${ppBase}/v2/checkout/orders`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                        'Content-Type': 'application/json',
                        'PayPal-Request-Id': orderId,
                    },
                    body: JSON.stringify({
                        intent: 'CAPTURE',
                        purchase_units: [{
                            reference_id: orderId,
                            description: type === 'fichas' ? `${fichas} Fichas VLS` : `Suscripción Pro - ${itemId}`,
                            amount: { currency_code: 'USD', value: amountUSD.toFixed(2) },
                            custom_id: JSON.stringify({ userId, fichas, type, itemId }),
                        }],
                        application_context: {
                            brand_name: 'Vecinity · VecinosLaSerena',
                            locale: 'es-CL',
                            landing_page: 'BILLING',
                            user_action: 'PAY_NOW',
                            return_url: `https://vecinoslaserena.cl/rapido?pay_status=success&order=${orderId}`,
                            cancel_url: `https://vecinoslaserena.cl/rapido?pay_status=cancelled`,
                        },
                    }),
                });
                const ppOrder = await ppOrderRes.json();
                const approveLink = ppOrder.links?.find(l => l.rel === 'approve')?.href;

                if (approveLink) {
                    return new Response(JSON.stringify({
                        orderId,
                        engine: 'paypal',
                        redirectUrl: approveLink,
                        ppOrderId: ppOrder.id,
                    }), { status: 200, headers });
                }
                throw new Error('PayPal API error: ' + JSON.stringify(ppOrder));
            }

            return new Response(JSON.stringify({ error: 'Motor de pago no reconocido' }), { status: 400, headers });

        }

        return new Response(JSON.stringify({ error: 'Ruta no encontrada' }), { status: 404, headers });

    } catch (err) {
        console.error('[VecnityPay] Error:', err);
        return new Response(JSON.stringify({ error: 'Error interno del servidor', detail: err.message }), { status: 500, headers });
    }
}

export async function onRequestOptions() {
    return new Response(null, {
        headers: {
            'Access-Control-Allow-Origin': 'https://vecinoslaserena.cl',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}
