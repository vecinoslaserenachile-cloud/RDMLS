/**
 * VIGÍA GUBERNAMENTAL : MÓDULO DE BLINDAJE INSTITUCIONAL
 * ------------------------------------------------------
 * Versión: 3.5.0 (Soberanía Digital 2026)
 * Objetivo: Encapsulamiento total y manejo de excepciones silencioso 
 * para el procesamiento de eventos y noticias gubernamentales.
 */

class VigiaGubernamental {
    /**
     * Categorías predefinidas para el etiquetado automático y mapeo de impacto.
     */
    static CATEGORIAS = {
        ECONOMIA: { tag: "#Economía", color: "#10b981", palabras: ["combustible", "bencina", "hacienda", "mepco", "inflación", "ipc", "sueldo"] },
        SEGURIDAD: { tag: "#Seguridad", color: "#ef4444", palabras: ["frontera", "zanjas", "delincuencia", "carabineros", "pdi", "migración", "seguridad"] },
        MEDIOAMBIENTE: { tag: "#Medioambiente", color: "#34d399", palabras: ["playa", "humedal", "sequía", "agua", "contaminación", "reciclaje"] },
        DERECHOS_HUMANOS: { tag: "#DerechosHumanos", color: "#a78bfa", palabras: ["igualdad", "género", "diversidad", "memoria", "justicia"] },
        TRABAJO: { tag: "#Trabajo", color: "#fbbf24", palabras: ["empleo", "honorarios", "contrata", "minvu", "seremi"] }
    };

    /**
     * Punto de entrada único para el procesamiento de noticias.
     * @param {Object} eventoCrudo - El objeto de noticia o evento sin procesar.
     * @returns {Object} Un objeto estandarizado y seguro para el frontend.
     */
    static procesarEvento(eventoCrudo) {
        try {
            // BLINDAJE: Validación estricta de entrada
            if (!eventoCrudo || typeof eventoCrudo !== 'object') {
                throw new Error("Formato de entrada inválido: se requiere un objeto.");
            }

            const titulo = eventoCrudo.titulo || "Evento Informativo";
            const descripcion = eventoCrudo.descripcion || "Sin descripción disponible.";
            const fuente = eventoCrudo.fuente || "VLS Cloud";

            // Lógica de extracción de etiquetas (Método privado simulado dentro del scope)
            const tagsSet = new Set();
            const textoCompleto = (titulo + " " + descripcion).toLowerCase();

            Object.values(this.CATEGORIAS).forEach(cat => {
                if (cat.palabras.some(p => textoCompleto.includes(p))) {
                    tagsSet.add(cat.tag);
                }
            });

            const tags = tagsSet.size > 0 ? Array.from(tagsSet) : ["#Institucional"];

            // Cálculo de impacto local
            const impacto = (tags.includes("#Seguridad") || tags.includes("#Economía")) ? "Alto" : "Medio";

            // BLINDAJE: Salida estandarizada
            return {
                status: "success",
                timestamp: new Date().toISOString(),
                data: {
                    titulo: titulo.toUpperCase(),
                    resumen: descripcion.length > 180 ? descripcion.substring(0, 180) + "..." : descripcion,
                    etiquetas: tags,
                    impacto_local: impacto,
                    color_referencia: this._obtenerColorPrincipal(tags),
                    fuente_verificada: fuente
                }
            };

        } catch (error) {
            // BLINDAJE: Captura silenciosa del error
            console.error("VIGÍA_LOG_ERROR:", error.message);
            
            // Retorno de Fallback Inofensivo (No rompe el frontend)
            return {
                status: "processing",
                timestamp: new Date().toISOString(),
                data: {
                    titulo: "NOTICIA EN PROCESAMIENTO",
                    resumen: "El sistema Vigía está verificando y categorizando esta información para tu seguridad.",
                    etiquetas: ["#Actualizando"],
                    impacto_local: "Pendiente",
                    color_referencia: "#64748b",
                    fuente_verificada: "VLS AI Sentinel"
                }
            };
        }
    }

    /**
     * Obtiene el color del primer tag reconocido para coherencia visual.
     * @private
     */
    static _obtenerColorPrincipal(tags) {
        const principal = Object.values(this.CATEGORIAS).find(cat => tags.includes(cat.tag));
        return principal ? principal.color : "#38bdf8";
    }
}

export default VigiaGubernamental;
