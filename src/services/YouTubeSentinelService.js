export const YouTubeSentinelService = {
    getLiveStatus: (channelId) => {
        console.log(`[Sentintel Faro] Consultando estado de YouTube Live para: ${channelId}`);
        return { isLive: true, viewers: 154, title: 'Radio Vecinos La Serena - Matinal' };
    },
    getLatestVideos: () => {
        return [
            { title: 'Inauguración Paseo 3D VLS', date: '2026-03-15' },
            { title: 'Tutorial Creative Studio', date: '2026-03-10' }
        ];
    }
};
