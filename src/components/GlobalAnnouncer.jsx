import React, { useEffect, useState } from 'react';

const TIPS = [
    "Recuerde que el portal de reportes georreferenciados está activo para visibilizar las necesidades de nuestros barrios.",
    "La Radio Digital VLS ya cuenta con nuevas sesiones de música regional. ¡Sintonícenos!",
    "Nuestro Paseo 3D permite recorrer la zona típica de La Serena desde cualquier lugar del mundo.",
    "Vecino, su participación en las consultas ciudadanas es vital para el desarrollo de nuestra Smart City.",
    "El Santuario El Olivar es un tesoro arqueológico que todos debemos proteger y valorar.",
    "Recuerde que el asistente virtual Serenito está disponible las 24 horas para resolver sus dudas.",
    "La seguridad la construimos entre todos. Utilice el sistema Centinel para reportar anomalías.",
    "Smart Salud: Ya puede solicitar servicios de enfermería a domicilio a través del portal vecinal.",
    "Cultura VLS: No se pierda el nuevo ciclo de cine en el Teatro Municipal Digital.",
    "Sostenibilidad: El monitoreo de playas y humedales indica un estado de conservación óptimo hoy."
];

const ALERTS = [
    "Centinel detecta alta congestión vehicular en el sector de Cuatro Esquinas. Tome precauciones.",
    "Aviso de marea alta para las próximas horas en el sector de El Faro. Evite acercarse a las rocas.",
    "Reporte Vecinal: Luminaria reparada exitosamente en el sector de Las Compañías.",
    "Alerta de Clima: Se esperan cielos nublados para el atardecer. Una brisa marina refrescante."
];

export default function GlobalAnnouncer() {
    const [lastAnnouncedMinute, setLastAnnouncedMinute] = useState(-1);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [currentWeather, setCurrentWeather] = useState({ temp: 20, condition: 'Soleado' });

    // Efecto para actualizar el clima real desde API (Simulando consulta a Google via OpenMeteo/wttr)
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                // Coordenadas La Serena
                const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=-29.9027&longitude=-71.2519&current_weather=true");
                const data = await res.json();
                if (data.current_weather) {
                    setCurrentWeather({
                        temp: Math.round(data.current_weather.temperature),
                        condition: 'Despejado'
                    });
                }
            } catch (e) {
                console.warn("GlobalAnnouncer: Usando calibración manual (20°C)");
            }
        };
        fetchWeather();
        const interval = setInterval(fetchWeather, 900000); // Cada 15 min
        return () => clearInterval(interval);
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

        // 1. Horarios fijos (Cada 15 minutos)
        if (minute === 0 || minute === 15 || minute === 30 || minute === 45) {
            const timeStr = `En la red Vecinos La Serena CL, son las ${hour} con ${minute === 0 ? 'cero' : minute} minutos.`;
            const weatherMsg = `Reporte del tiempo: El clima actual en La Serena es de ${currentWeather.temp} grados. Una jornada perfecta para disfrutar de nuestra Avenida del Mar.`;
            announce(`${timeStr} ${weatherMsg}`);
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

        // 3. Tips Informativos (Probabilidad media cada minuto)
        if (Math.random() < 0.08) {
             const tip = TIPS[Math.floor(Math.random() * TIPS.length)];
             announce(`BOLETÍN VECINAL V L S: ${tip}`);
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
