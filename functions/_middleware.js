export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  const host = url.hostname.toLowerCase();
  const userAgent = request.headers.get('user-agent') || '';

  // Lista básica de bots sociales que leen OG Tags
  const isSocialBot = /facebookexternalhit|whatsapp|twitterbot|linkedinbot|pinterest|slackbot|telegrambot/i.test(userAgent);

  // Si ES un bot social
  if (isSocialBot) {
    const response = await next();
    
    // Si la respuesta no es HTML, dejarla pasar
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/html')) {
      return response;
    }

    if (url.pathname.toLowerCase().includes('/invierno')) {
      // OG tags para campaña invierno (cualquier dominio)
      return new HTMLRewriter()
        .on('meta[property="og:title"]', { element(e) { e.setAttribute('content', 'Campaña Invierno y Salud - La Serena'); } })
        .on('meta[property="og:description"]', { element(e) { e.setAttribute('content', 'Infórmate sobre vacunación, virus respiratorios y protocolos de salud para cuidarnos este invierno.'); } })
        .on('meta[name="description"]', { element(e) { e.setAttribute('content', 'Infórmate sobre vacunación, virus respiratorios y protocolos de salud para cuidarnos este invierno.'); } })
        .on('meta[property="og:image"]', { element(e) { e.setAttribute('content', 'https://vecinoslaserena.cl/invierno/invierno_share_card.jpg'); } })
        .on('title', { element(e) { e.setInnerContent('Invierno Saludable - La Serena'); } })
        .transform(response);
    }

    if (host.includes('radiovecinos') || host.includes('archi')) {
      // Reescribir OG tags para ARCHI / RADIO
      return new HTMLRewriter()
        .on('meta[property="og:title"]', { element(e) { e.setAttribute('content', 'Archi Lista Nueva Energía'); } })
        .on('meta[property="og:description"]', { element(e) { e.setAttribute('content', 'Archi Lista Nueva Energía, de Arica a Magallanes.'); } })
        .on('meta[name="description"]', { element(e) { e.setAttribute('content', 'Archi Lista Nueva Energía, de Arica a Magallanes.'); } })
        .on('head', { element(e) { e.append('<meta property="og:url" content="https://www.archinuevaenergia.cl" />', { html: true }); } })
        .on('title', { element(e) { e.setInnerContent('Lista Nueva Energía Archi'); } })
        .transform(response);
    } 
    
    if (host.includes('entrevecinas.cl')) {
      // Reescribir OG tags SOLO para ENTREVECINAS
      return new HTMLRewriter()
        .on('meta[property="og:title"]', { element(e) { e.setAttribute('content', 'Entrevecinas.cl Aprende italiano con Francesca Vives y vecinoslaserena.cl'); } })
        .on('meta[property="og:description"]', { element(e) { e.setAttribute('content', 'Aprende italiano de forma interactiva con la Arquitecta Francesca Vives en Entrevecinas.cl y vecinoslaserena.cl'); } })
        .on('meta[name="description"]', { element(e) { e.setAttribute('content', 'Aprende italiano de forma interactiva con la Arquitecta Francesca Vives en Entrevecinas.cl y vecinoslaserena.cl'); } })
        .on('meta[property="og:image"]', { element(e) { e.setAttribute('content', 'https://www.entrevecinas.cl/tano_assets/francesca_blanco.png'); } })
        .on('title', { element(e) { e.setInnerContent('Entrevecinas.cl Aprende italiano con Francesca Vives y vecinoslaserena.cl'); } })
        .transform(response);
    }

    // Para vecinoslaserena.cl u otros, usa el index.html original sin tocar
    return response;
  }

  // Si no es un bot social, pasar transparente
  return next();
}
