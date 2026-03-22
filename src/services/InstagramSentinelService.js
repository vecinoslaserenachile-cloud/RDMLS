export const InstagramSentinelService = {
    getMentions: (handle) => {
        console.log(`[Sentintel Faro] Rastreando Instagram para: ${handle}`);
        return [
            { id: 1, type: 'post', content: 'Hermosa vista de La Serena hoy #VLS', user: '@vecino_feliz' },
            { id: 2, type: 'comment', content: '¿A qué hora empieza la Radio VLS?', user: '@turista_ls' }
        ];
    },
    trackHashtag: (tag) => {
        return `Simulando monitoreo de hashtag: #${tag} en Instagram`;
    }
};
