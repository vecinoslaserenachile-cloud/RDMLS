export async function onRequest(context) {
  const request = context.request;
  const response = await context.next();
  const url = new URL(request.url);
  const host = url.hostname.toLowerCase();

  // Si es la radio, sobrescribir los Open Graph tags
  if (host.includes('radiovecinos') || host.includes('archi')) {
    const isHtml = response.headers.get('content-type')?.includes('text/html');
    if (isHtml) {
      return new HTMLRewriter()
        .on('meta[property="og:title"]', {
          element(element) {
            element.setAttribute('content', 'NUEVA ENERGÍA Archi 2026 - 2028');
          }
        })
        .on('meta[property="og:description"]', {
          element(element) {
            element.setAttribute('content', 'La radio de la Lista Nueva Energía. Únete a nosotros.');
          }
        })
        .on('meta[property="og:image"]', {
          element(element) {
            element.setAttribute('content', '/archi-media/audio/Solange.png');
          }
        })
        .on('title', {
          element(element) {
            element.setInnerContent('NUEVA ENERGÍA Archi 2026 - 2028');
          }
        })
        .transform(response);
    }
  }

  return response;
}
