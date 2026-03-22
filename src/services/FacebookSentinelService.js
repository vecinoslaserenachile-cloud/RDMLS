import axios from 'axios';

const FB_APP_ID = import.meta.env.VITE_FACEBOOK_APP_ID;
const FB_APP_SECRET = import.meta.env.VITE_FACEBOOK_APP_SECRET;

/**
 * Servicio para integrar Facebook/Instagram en Sentinel Faro
 */
export const FacebookSentinelService = {
    /**
     * Obtiene comentarios y menciones de la página oficial
     * NOTA: Requiere un Page Access Token válido para datos reales.
     */
    getLatestPageInteractions: async (pageAccessToken) => {
        if (!pageAccessToken) {
            console.warn("Facebook Sentinel: No se ha proporcionado un Token de Acceso de Página.");
            return [];
        }

        try {
            // Ejemplo de consulta a la Graph API para obtener posts y comentarios
            // Esto es una estructura base, se ajustará según los permisos reales obtenidos
            const response = await axios.get(`https://graph.facebook.com/v20.0/me/feed?fields=message,created_time,from,comments{message,from,created_time}&access_token=${pageAccessToken}`);
            
            if (!response.data || !response.data.data) return [];
            
            return formatFacebookResponse(response.data.data);
        } catch (error) {
            console.error("Facebook Sentinel Error:", error.response?.data || error.message);
            throw new Error("ERROR_CONEXION_FACEBOOK");
        }
    }
};

const formatFacebookResponse = (data) => {
    // Transformamos los datos de FB al formato que entiende nuestro Sentinel Faro
    return data.map(post => ({
        id: post.id,
        text: post.message || "Post sin texto",
        author: post.from?.name || "Vecino FB",
        username: "Facebook",
        avatar: "/favicos_vls.svg", // Logo de la muni por defecto
        time: new Date(post.created_time).toLocaleString('es-CL', { hour: '2-digit', minute: '2-digit' }),
        metrics: {
            reply_count: post.comments?.data?.length || 0,
            retweet_count: 0 // Facebook no tiene retweets exactos en esta vista
        }
    }));
};
