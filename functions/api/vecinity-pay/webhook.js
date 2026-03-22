/**
 * VECINITY PAY — Webhook Handler
 * 
 * Flujo:
 * 1. Recibe notificación del motor de pago
 * 2. Valida firma HMAC (Flow) o verifica con PayPal API (PayPal)
 * 3. Si pago aprobado → suma fichas en Firebase
 * 4. Notifica al usuario por P2P (Farito Inbox)
 */

async function getFirebaseAccessToken(env) {
    // Generar JWT para Google OAuth2 usando la Private Key de la Service Account
    // env.FIREBASE_SERVICE_ACCOUNT debe ser el JSON completo
    const sa = JSON.parse(env.FIREBASE_SERVICE_ACCOUNT);
    const now = Math.floor(Date.now() / 1000);
    
    const header = { alg: 'RS256', typ: 'JWT' };
    const payload = {
        iss: sa.client_email,
        sub: sa.client_email,
        aud: 'https://oauth2.googleapis.com/token',
        iat: now,
        exp: now + 3600,
        scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/firebase.database'
    };

    const sHeader = btoa(JSON.stringify(header)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    const sPayload = btoa(JSON.stringify(payload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    const message = sHeader + '.' + sPayload;

    const pemHeader = "-----BEGIN PRIVATE KEY-----";
    const pemFooter = "-----END PRIVATE KEY-----";
    const pemContents = sa.private_key.substring(pemHeader.length, sa.private_key.length - pemFooter.length).replace(/\n/g, '');
    const binaryDerString = atob(pemContents);
    const binaryDer = new Uint8Array(binaryDerString.length);
    for (let i = 0; i < binaryDerString.length; i++) binaryDer[i] = binaryDerString.charCodeAt(i);

    const key = await crypto.subtle.importKey(
        'pkcs8',
        binaryDer,
        { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
        false,
        ['sign']
    );

    const signature = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(message));
    const sSignature = btoa(String.fromCharCode(...new Uint8Array(signature))).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    
    const jwt = message + '.' + sSignature;

    const res = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`
    });
    const tokens = await res.json();
    return tokens.access_token;
}

async function updateFirebaseTokens(userId, fichas, env) {
    const accessToken = await getFirebaseAccessToken(env);
    const sa = JSON.parse(env.FIREBASE_SERVICE_ACCOUNT);
    const FIREBASE_DB_URL = `https://${sa.project_id}-default-rtdb.firebaseio.com`;

    // 1. Leer saldo actual
    const getRes = await fetch(`${FIREBASE_DB_URL}/users/${userId}/tokens.json`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    const currentTokens = (await getRes.json()) || 0;

    // 2. Actualizar saldo
    const newBalance = currentTokens + fichas;
    await fetch(`${FIREBASE_DB_URL}/users/${userId}/tokens.json`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${accessToken}` },
        body: JSON.stringify(newBalance)
    });

    // 3. Registrar transacción
    await fetch(`${FIREBASE_DB_URL}/users/${userId}/transactions.json`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${accessToken}` },
        body: JSON.stringify({
            type: 'purchase',
            fichas,
            timestamp: new Date().toISOString(),
            balance: newBalance,
        })
    });

    return newBalance;
}

async function sendP2PNotification(userId, message, env) {
    const accessToken = await getFirebaseAccessToken(env);
    const sa = JSON.parse(env.FIREBASE_SERVICE_ACCOUNT);
    const FIREBASE_DB_URL = `https://${sa.project_id}-default-rtdb.firebaseio.com`;

    await fetch(`${FIREBASE_DB_URL}/inbox/${userId}/messages.json`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${accessToken}` },
        body: JSON.stringify({
            from: 'sistema_vecinity',
            text: message,
            timestamp: new Date().toISOString(),
            type: 'system',
            read: false,
        })
    });
}

// ── WEBHOOK FLOW.CL ─────────────────────────────────────────────────────────
export async function onRequestPost_flow(context) {
    const { request, env } = context;
    const headers = { 'Content-Type': 'text/plain' };

    try {
        const formData = await request.formData();
        const flowToken = formData.get('token');

        if (!flowToken) {
            return new Response('TOKEN_MISSING', { status: 400, headers });
        }

        // Consultar estado del pago a Flow (nunca confiar solo en el POST)
        const params = new URLSearchParams({ apiKey: env.FLOW_API_KEY, token: flowToken });

        // Firmar la consulta con HMAC
        const signatureBase = [...params.entries()]
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([k, v]) => k + v)
            .join('');

        const encoder = new TextEncoder();
        const keyData = encoder.encode(env.FLOW_SECRET_KEY);
        const msgData = encoder.encode(signatureBase);
        const cryptoKey = await crypto.subtle.importKey('raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
        const signature = await crypto.subtle.sign('HMAC', cryptoKey, msgData);
        const hexSignature = Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, '0')).join('');
        params.set('s', hexSignature);

        const apiBase = (env.FLOW_MODE === 'live') 
            ? 'https://www.flow.cl/api' 
            : 'https://sandbox.flow.cl/api';

        const statusRes = await fetch(`${apiBase}/payment/getStatus?${params.toString()}`);
        const paymentData = await statusRes.json();

        // status 2 = PAGADO en Flow
        if (paymentData.status === 2) {
            const optional = JSON.parse(paymentData.optional || '{}');
            const { userId, fichas, type, itemId } = optional;

            const newBalance = await updateFirebaseTokens(userId, Number(fichas), env);

            await sendP2PNotification(
                userId,
                `✅ ¡Fichas cargadas! Tu pago de $${paymentData.amount.toLocaleString('es-CL')} CLP fue procesado con éxito. Tienes ${newBalance} Fichas VLS disponibles. ¡Disfruta el ecosistema! 🎟️`,
                env
            );

            return new Response('OK', { status: 200, headers });
        }

        // Pago rechazado o pendiente: no acreditar
        return new Response('PAYMENT_NOT_APPROVED', { status: 200, headers });

    } catch (err) {
        console.error('[WebhookFlow] Error:', err);
        return new Response('INTERNAL_ERROR', { status: 500, headers });
    }
}

// ── WEBHOOK PAYPAL ───────────────────────────────────────────────────────────
export async function onRequestPost_paypal(context) {
    const { request, env } = context;
    const headers = { 'Content-Type': 'application/json' };

    try {
        const body = await request.json();

        // Solo procesar evento de captura completada
        if (body.event_type !== 'PAYMENT.CAPTURE.COMPLETED') {
            return new Response(JSON.stringify({ received: true }), { status: 200, headers });
        }

        // Verificar con PayPal API que el evento es legítimo
        const isLive = env.PAYPAL_MODE === 'live';
        const ppBase = isLive ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';

        const tokenRes = await fetch(`${ppBase}/v1/oauth2/token`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${btoa(`${env.PAYPAL_CLIENT_ID}:${env.PAYPAL_SECRET}`)}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'grant_type=client_credentials',
        });
        const { access_token } = await tokenRes.json();

        // Verificar el webhook event con PayPal
        const verifyRes = await fetch(`${ppBase}/v1/notifications/verify-webhook-signature`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${access_token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                auth_algo: request.headers.get('paypal-auth-algo'),
                cert_url: request.headers.get('paypal-cert-url'),
                transmission_id: request.headers.get('paypal-transmission-id'),
                transmission_sig: request.headers.get('paypal-transmission-sig'),
                transmission_time: request.headers.get('paypal-transmission-time'),
                webhook_id: env.PAYPAL_WEBHOOK_ID,
                webhook_event: body,
            }),
        });
        const verification = await verifyRes.json();

        if (verification.verification_status !== 'SUCCESS') {
            console.warn('[WebhookPayPal] Firma inválida:', verification);
            return new Response(JSON.stringify({ error: 'Invalid signature' }), { status: 400, headers });
        }

        // Extraer custom_id (contiene userId, fichas, type)
        const customId = body.resource?.purchase_units?.[0]?.custom_id || '{}';
        const { userId, fichas, itemId } = JSON.parse(customId);
        const amountUSD = body.resource?.amount?.value;

        const newBalance = await updateFirebaseTokens(userId, Number(fichas), env);

        await sendP2PNotification(
            userId,
            `✅ ¡Pago Internacional Aprobado! USD ${amountUSD} procesados vía PayPal. ${fichas} Fichas VLS acreditadas. Saldo actual: ${newBalance} 🎟️`,
            env
        );

        return new Response(JSON.stringify({ success: true }), { status: 200, headers });

    } catch (err) {
        console.error('[WebhookPayPal] Error:', err);
        return new Response(JSON.stringify({ error: 'Internal error' }), { status: 500, headers });
    }
}

// Router: determinar cuál webhook manejar por path
export async function onRequestPost(context) {
    const url = new URL(context.request.url);
    if (url.pathname.includes('webhook-flow')) return onRequestPost_flow(context);
    if (url.pathname.includes('webhook-paypal')) return onRequestPost_paypal(context);
    return new Response('Not found', { status: 404 });
}
