export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  const host = url.hostname.toLowerCase();
  const userAgent = request.headers.get('user-agent') || '';

  // Lista básica de bots sociales que leen OG Tags
  const isSocialBot = /facebookexternalhit|whatsapp|twitterbot|linkedinbot|pinterest|slackbot|telegrambot/i.test(userAgent);

  // Si ES un bot social Y el dominio es radiovecinos.cl o archi
  if (isSocialBot && (host.includes('radiovecinos') || host.includes('archi'))) {
    const response = await next();
    
    // Si la respuesta no es HTML, dejarla pasar
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/html')) {
      return response;
    }

    // Reescribir OG tags
    return new HTMLRewriter()
      .on('meta[property="og:title"]', {
        element(e) { e.setAttribute('content', 'Archi Lista Nueva Energía'); }
      })
      .on('meta[property="og:description"]', {
        element(e) { e.setAttribute('content', 'Archi Lista Nueva Energía, de Arica a Magallanes.'); }
      })
      .on('meta[name="description"]', {
        element(e) { e.setAttribute('content', 'Archi Lista Nueva Energía, de Arica a Magallanes.'); }
      })
      .on('head', {
        element(e) {
          e.append('<meta property="og:url" content="https://www.archinuevaenergia.cl" />', { html: true });
        }
      })
      .on('title', {
        element(e) { e.setInnerContent('Lista Nueva Energía Archi'); }
      })
      .transform(response);
  }

  // Si no es un bot social para este dominio, pasar transparente
  return next();
}
