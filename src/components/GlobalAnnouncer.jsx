import React, { useEffect, useState } from 'react';

const TIPS = [
    // --- Contenidos de Sala de Inteligencia ---
    "INVESTIGACIÓN VLS: '\u00bfPor qué la bencina es más cara en Chile que en Estados Unidos?' El Espejismo Americano ya está disponible en nuestra Sala de Inteligencia. Entérese ahora.",
    "INVESTIGACIÓN VLS: El gobierno anunció hoy ocho medidas paliativas ante el bencinazo. ¿Cuánto llega realmente a La Serena? Lea nuestro análisis en la Sala de Inteligencia.",
    "INFORME ESPECIAL: 'El Dilema de la Vivienda' analiza por qué en nuestra región los departamentos no bajan de precio aunque baje la demanda. Un fenómeno que afecta a todos los serenenses.",
    "INVESTIGACIÓN: 'La Gran Paradoja del 2026': Chile apaga el supercomputador del conocimiento justo cuando el mundo lo necesita más. Un informe profundo disponible en nuestro portal.",
    "CENTINEL FARO: Monitoreamos las redes sociales de la región en tiempo real. Si hay un tema que preocupa a La Serena, nosotros lo detectamos primero.",
    // --- Servicios ciudadanos ---
    "Su portal inteligente de La Serena le permite reportar luminarias dañadas, baches y problemas comunitarios con foto y geolocalizado. Entérese cómo en la sección Smart Citizens.",
    "El Paseo Histórico 3D de La Serena le permite recorrer la zona típica desde cualquier lugar del mundo. Ingrese al módulo de Patrimonio y viaje en el tiempo.",
    "La Radio Digital Municipal de La Serena transmite las 24 horas. Música regional, entrevistas ciudadanas y noticias en tiempo real. Sintoncíonos en vecinoslaserena.cl.",
    "Smart Administration: Si usted es funcionario municipal, recuerde que puede firmar digitalmente sus informes y acceder al portal de induccion desde cualquier dispositivo.",
    "El asistente virtual Serenito está disponible las 24 horas para responder sus consultas sobre servicios municipales, horarios y trámites. Es gratuito y está siempre activo.",
    "Centinel Faro detecta tendencias citizen aes de opinión en redes sociales. Hoy monitoreamos activamente los temas: bencina, vivienda y calidad de vida en la región.",
    "Puerto de Coquimbo: el Sistema de Monitoreo Naviero VLS sigue en tiempo real la planificación de naves del TPC. Consulte el estado portuario hoy en nuestro portal.",
    "Smart Events: El Módulo de Precedencias le permite organizar actos protocolares con autoridades de manera profesional y sin errores. Disponible en VLS para municipios.",
    // --- Invitaciones educativas/culturales ---
    "VLS Juegaprende: Juegue Trivia sobre La Serena y gane fichas ciudadanas. Una forma entretenida de conocer mejor nuestra ciudad. ¿Cuántos puntos suma hoy?",
    "El Monitor de Mareas VLS informa que las corrientes en el sector costero de La Serena son aptas para actividades acuaticas hoy.",
    "Sostenibilidad: El seguimiento de humedales y aves nativas de la región está disponible en el portal ciudadano. Ayude a proteger nuestro patrimonio natural.",
    "El Santuario El Olivar y el área de conservación del Pingüino de Humboldt siguen siendo tesoros que debemos cuidar. Nuestro sistema de alertas ambientales está activo.",
    "Smart Salud: Vecino, recuerde que puede solicitar servicios de bienestar comunitario a través del portal. Su salud también es asunto de nuestra comunidad inteligente.",
];

const MUSIC_SPOTS = [
    "Estamos en línea desde La Serena. A continuación, un momento musical del archivo de sesiones de nuestra Radio Digital. Gracias por acompañarnos en este momento.",
    "Esta es la Radio Digital de La Serena. Nuestra programación incluye música regional autóctona, folk chileno y sesiones en vivo. Sintonizados en vecinoslaserena punto ce ele.",
    "En pocos instantes continuamos con su programación. Si tiene una solicitud musical o quiere compartir un testimonio ciudadano, nuestras redes están abiertas.",
    "Transmitimos para La Serena, Coquimbo y toda la región. Ésta es la frecuencia donde los vecinos tienen voz.",
];

const ALERTS = [
    "Centinel Faro detecta alta congestin vehicular en el sector de Cuatro Esquinas. Tome precauciones y utilice rutas alternativas.",
    "Aviso de marea alta para las próximas horas en el sector de El Faro. Evite acercarse a las rocas e informe a sus hijos.",
    "Reporte Vecinal: Una luminaria fue reparada exitosamente en Las Compañías gracias al reporte ciudadano. Así funcionamos juntos.",
    "Alerta de Clima: Se esperan cielos nublados y brisa marina para el atardecer. Una tarde perfecta para la costanera.",
    "AVISO ECONOMÍA: El alza de combustibles entra en vigencia este jueves. VLS mantiene actualizado el monitor de precios en su portal.",
];

export default function GlobalAnnouncer() {
    const [lastAnnouncedMinute, setLastAnnouncedMinute] = useState(-1);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [currentWeather, setCurrentWeather] = useState({ temp: 20, condition: 'Soleado' });

    // Sincronización de Clima Unificado (v3.5)
    useEffect(() => {
        const handleWeatherSync = (e) => {
            if (e.detail && e.detail.temp) {
                setCurrentWeather(prev => ({ ...prev, temp: e.detail.temp }));
            }
        };
        window.addEventListener('vls-weather-sync', handleWeatherSync);
        return () => window.removeEventListener('vls-weather-sync', handleWeatherSync);
    }, []);

    // Motor de Humanización de Texto
    const humanizeText = (text) => {
        if (!text) return "";
        return text
            .replace(/\bVLS\b/g, "Vecinos La Serena")
            .replace(/\bV L S\b/g, "Vecinos La Serena")
            .replace(/\bRDMLS\b/g, "Radio Digital Municipal La Serena")
            .replace(/\bCL\b/g, "punto ce ele")
            .replace(/#/g, "número ");
    };

    const getSpanishVoice = () => {
        if (!window.speechSynthesis) return null;
        const voices = window.speechSynthesis.getVoices();
        
        // Filtro Estricto: NO voces de España, SÍ LatAm/Chile
        const latAmVoices = voices.filter(v => 
            (v.lang.includes('es-CL') || v.lang.includes('es-MX') || v.lang.includes('es-AR') || v.lang.includes('es-US') || v.lang.includes('es-CO') || v.lang.includes('es-419')) 
            && !v.lang.includes('es-ES')
            && !v.name.includes('Spain') 
            && !v.name.includes('España')
        );

        // Priority: Microsoft Sabina, Paulina (CL), Helena, or Google LatAm
        return latAmVoices.find(v => v.name.includes('Sabina')) || 
               latAmVoices.find(v => v.name.includes('Paulina')) || 
               latAmVoices.find(v => v.name.includes('es-CL')) ||
               latAmVoices.find(v => v.name.includes('Google') && v.lang.includes('es')) ||
               latAmVoices[0] ||
               voices.find(v => v.lang.includes('es') && !v.lang.includes('es-ES'));
    };

    const announce = (text, priority = 'normal') => {
        // CHECK MASTER KILL-SWITCH (Prevents 'Robot Woman' if disabled)
        if (localStorage.getItem('vls_locution_enabled') === 'false') return;

        if (!window.speechSynthesis) return;
        
        // Humanizamos el texto antes de procesar
        const cleanText = humanizeText(text);
        
        // Cancel if something else is being said and this is normal priority
        if (isSpeaking && priority === 'normal') return;

        // Force stop previous if high priority
        if (priority === 'high') window.speechSynthesis.cancel();
        
        // Notify radio to duck volume
        window.dispatchEvent(new CustomEvent('radio-duck'));
        setIsSpeaking(true);
        
        const utter = new SpeechSynthesisUtterance(cleanText);
        const voice = getSpanishVoice();
        if (voice) utter.voice = voice;
        
        utter.lang = 'es-CL';
        utter.rate = 0.88; // Slightly slower for better human modulation
        utter.pitch = 1.0; // Natural neutral pitch
        
        utter.onend = () => {
            window.dispatchEvent(new CustomEvent('radio-unduck'));
            setIsSpeaking(false);
        };

        utter.onerror = () => {
            window.dispatchEvent(new CustomEvent('radio-unduck'));
            setIsSpeaking(false);
        };

        window.speechSynthesis.speak(utter);
    };

    const runAnnouncementLogic = () => {
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();

        // Evitar múltiples anuncios en el mismo minuto (por re-renders)
        if (minute === lastAnnouncedMinute) return;

        // 1. Hora en punto y cuartos — saludo contextual
        if (minute === 0 || minute === 15 || minute === 30 || minute === 45) {
            // Franja del día
            const franja = hour >= 5 && hour < 12
                ? 'buenos días'
                : hour >= 12 && hour < 20
                ? 'buenas tardes'
                : 'buenas noches';

            const minWord = minute === 0
                ? 'en punto'
                : `con ${minute} minutos`;

            const contextualTip = TIPS[Math.floor(Math.random() * TIPS.length)];

            const fullSentence = [
                `${franja} desde La Serena. Son las ${hour} horas ${minWord}.`,
                `El tiempo en La Serena es de ${currentWeather.temp} grados. ${currentWeather.condition}.`,
                contextualTip
            ].join(' ');

            announce(fullSentence);
            setLastAnnouncedMinute(minute);
            return;
        }

        // 2. Alertas Centinel / Social Listening Simulation (Probabilidad baja cada minuto)
        if (Math.random() < 0.05) { 
            const alert = ALERTS[Math.floor(Math.random() * ALERTS.length)];
            announce(`CENTINEL FARO INFORMA: ${alert}`, 'high');
            setLastAnnouncedMinute(minute);
            return;
        }

        // 3. Tips Informativos (probabilidad media cada minuto para no saturar)
        if (Math.random() < 0.08) {
             const tip = TIPS[Math.floor(Math.random() * TIPS.length)];
             announce(`BOLETÍN VLS: ${tip}`);
             setLastAnnouncedMinute(minute);
             return;
        }

        // 4. Spots musicales / de ambiente (probabilidad baja)
        if (Math.random() < 0.04) {
             const spot = MUSIC_SPOTS[Math.floor(Math.random() * MUSIC_SPOTS.length)];
             announce(spot);
             setLastAnnouncedMinute(minute);
        }
    };

    useEffect(() => {
        // Inicializar voces (algunos navegadores necesitan esto)
        const loadVoices = () => {
            window.speechSynthesis.getVoices();
        };
        
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
        loadVoices();
        
        // Intervalo de chequeo cada minuto (60s)
        const interval = setInterval(runAnnouncementLogic, 60000);
        
        // Primer chequeo al montar (con delay pequeño para esperar interacción humana si es necesario)
        const timeout = setTimeout(runAnnouncementLogic, 8000);

        // Escucha para anuncios manuales solicitados desde otros componentes
        const handleManualAnnounce = (e) => {
            if (e.detail && e.detail.text) {
                announce(e.detail.text, e.detail.priority || 'normal');
            }
        };
        window.addEventListener('vls-manual-announce', handleManualAnnounce);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
            window.removeEventListener('vls-manual-announce', handleManualAnnounce);
        };
    }, [lastAnnouncedMinute]);

    return null; // Componente invisible que actúa como "alma" sonora
}
