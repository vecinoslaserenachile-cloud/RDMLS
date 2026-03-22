/**
 * PublicUtilityService: Módulo para gestionar avisos de utilidad pública gratuitos (VLS)
 * Mascotas perdidas, documentos, vehículos robados, etc.
 */

class PublicUtilityService {
    constructor() {
        this.storageKey = 'vls_public_utility_ads';
    }

    getAds() {
        try {
            const ads = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
            return ads;
        } catch (e) {
            return [];
        }
    }

    addAd(ad) {
        const ads = this.getAds();
        const newAd = {
            id: Date.now(),
            date: new Date().toISOString(),
            title: ad.title || "Aviso de Utilidad Pública",
            content: ad.content || "",
            type: ad.type || "OTRO", // MASCOTA, DOCUMENTO, VEHICULO, OTRO
            image: ad.image || null,
            status: 'ACTIVO',
            isFree: true
        };
        localStorage.setItem(this.storageKey, JSON.stringify([newAd, ...ads]));
        window.dispatchEvent(new CustomEvent('vls-new-utility-ad', { detail: newAd }));
        return newAd;
    }

    getLiveAd() {
        const ads = this.getAds().filter(ad => ad.status === 'ACTIVO');
        if (ads.length === 0) return null;
        // Rotación simple por tiempo
        const index = Math.floor(Date.now() / 10000) % ads.length;
        return ads[index];
    }
}

export default new PublicUtilityService();
