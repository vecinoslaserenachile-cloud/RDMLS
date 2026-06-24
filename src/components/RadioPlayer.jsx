import React, { useState, useRef, useEffect } from 'react';
import { 
    Play, Pause, Mic, CloudSun, Radio, Sliders, Volume2, 
    VolumeX, ChevronUp, ChevronDown, Activity, GripHorizontal,
    Newspaper, Info, Music, Zap, Move, Tv, Monitor, Lock,
    MessageSquare, SkipForward, SkipBack, Layers, Settings, Maximize, ExternalLink, Globe, Wifi, Shield, TrendingUp, TrendingDown, Clock, Star, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../context/LanguageContext';
import { getVLSLocution } from '../utils/vlsNewsEngine';
import { ServerlessRadioEngine } from '../utils/ServerlessRadioEngine';

const AnalogVUMeter = ({ label, needleRef }) => (
    <div style={{
        width: '100px', height: '65px', background: 'linear-gradient(to bottom, #fcfae3 0%, #e8e3c1 100%)', 
        borderRadius: '6px', border: '3px solid #1e293b', position: 'relative', overflow: 'hidden',
        boxShadow: 'inset 0 0 15px rgba(0,0,0,0.4), 0 4px 10px rgba(0,0,0,0.5)', 
        display: 'flex', flexDirection: 'column', alignItems: 'center'
    }}>
        <svg viewBox="0 0 100 60" style={{ width: '100%', marginTop: '6px' }}>
            <path d="M 12 48 A 45 45 0 0 1 88 48" fill="none" stroke="#222" strokeWidth="1.5" strokeDasharray="1,2" />
            <path d="M 72 48 A 45 45 0 0 1 88 48" fill="none" stroke="#ef4444" strokeWidth="3" />
            {[...Array(7)].map((_, i) => {
                const angle = Math.PI + 0.5 + i * (Math.PI - 1) / 6;
                const x1 = 50 + 40 * Math.cos(angle); const y1 = 55 + 40 * Math.sin(angle);
                const x2 = 50 + 48 * Math.cos(angle); const y2 = 55 + 48 * Math.sin(angle);
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={i >= 5 ? "#ef4444" : "#222"} strokeWidth="1.5" />;
            })}
            <text x="15" y="42" fontSize="6" fontWeight="bold" fill="#222" fontFamily="serif">-20</text>
            <text x="50" y="22" fontSize="6" fontWeight="bold" fill="#222" fontFamily="serif">0</text>
            <text x="85" y="42" fontSize="6" fontWeight="bold" fill="#ef4444" fontFamily="serif">+5</text>
            <text x="50" y="52" fontSize="7" fontWeight="bold" fill="#222" textAnchor="middle" opacity="0.6">VU LEVEL</text>
        </svg>
        <div ref={needleRef} style={{ position: 'absolute', bottom: '-4px', left: '50%', width: '2px', height: '52px', background: '#111', marginLeft: '-1px', transformOrigin: 'bottom center', transform: 'rotate(-45deg)', transition: 'transform 0.08s cubic-bezier(0.1, 0, 0, 1)', zIndex: 5 }} />
        <div style={{ position: 'absolute', bottom: '-12px', left: '50%', transform: 'translateX(-50%)', width: '24px', height: '24px', borderRadius: '50%', background: 'radial-gradient(circle, #444, #111)', border: '2px solid #000', zIndex: 6 }} />
        <div style={{ position: 'absolute', bottom: '8px', left: '8px', fontSize: '0.55rem', fontWeight: '900', color: '#111', opacity: 0.8 }}>{label}</div>
    </div>
);

// playerMode: 'expanded' | 'compact' | 'mini'
export default function RadioPlayer({ globalWeather, isVisible }) {
    const host = (window.location.hostname || window.location.host || '').toLowerCase();
    const path = window.location.pathname.toLowerCase();
    const isArchi = host.includes('archi') || path.includes('/archi');
    const isRDMLS = host.includes('rdmls') || (host.includes('laserena.cl') && !host.includes('vecinos'));
    const isVLS = !isRDMLS && !isArchi;

    const [isPlaying, setIsPlaying] = useState(false);
    const [playerMode, setPlayerMode] = useState('mini'); // Iniciamos en modo mini (replegado) para no obstruir el home
    const audioRef = useRef(null);

    
    
    const [volume, setVolume] = useState(0.8);
    const [eqLevels, setEqLevels] = useState([50, 50, 50, 50, 50, 50, 50, 50, 50, 50]);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [activeMediaType, setActiveMediaType] = useState('radio');
    const [isDjTalking, setIsDjTalking] = useState(false);
    const [djMessage, setDjMessage] = useState('');
    const [currentTipIndex, setCurrentTipIndex] = useState(0);

    const vuLeftRef = useRef(null);
    const vuRightRef = useRef(null);
    const [spectrumLevels, setSpectrumLevels] = useState(Array(10).fill(10));
    const meterLevelsRef = useRef({ left: -45, right: -45 });
    const [hasProxyFallback, setHasProxyFallback] = useState(false);
    
    const serverlessEngineRef = useRef(null);
    const [serverlessMetadata, setServerlessMetadata] = useState(null);
    
    // Audio Engine Refs
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const sourceRef = useRef(null);
    const filtersRef = useRef([]);
    const animationRef = useRef(null);

    // isExpanded convenience derived from playerMode
    const isExpanded = playerMode === 'expanded';
    const isMini = playerMode === 'mini';

    // SEPARACIÓN ESTRICTA DE SEÑALES (Soberanía Digital)
    const stations = isArchi ? [
        { id: 99, type: 'radio', sub: 'archi', name: 'Jingle Oficial Archi', stream: '/archi-media/jingle_remastered.mp3', isLive: false, isMain: true, desc: 'Campaña Nueva Energía' }
    ] : isRDMLS ? [
        { id: 10, type: 'radio', sub: 'rdmls', name: 'RDMLS Señal Oficial', stream: 'serverless', isLive: true, isMain: true, desc: 'I. Municipalidad de La Serena' }
    ] : [
        { id: 1, type: 'radio', sub: 'vls', name: 'vecinoslaserena.cl Señal Principal', stream: 'https://az11.yesstreaming.net:8630/radio.mp3', isLive: true, isMain: true, desc: 'Noticias y Comunidad La Serena' },
        { id: 14, type: 'radio', sub: 'vls', name: 'vecinoslaserena.cl Sesiones Musicales', stream: 'https://az11.yesstreaming.net:8630/radio.mp3?rel=cuturrufo', isLive: true, desc: 'Marcelo Cuturrufo y Amigos - Sesiones vecinoslaserena.cl' },
        { id: 15, type: 'radio', sub: 'vls', name: 'vecinoslaserena.cl Entrevistas', stream: 'https://az11.yesstreaming.net:8630/radio.mp3?rel=entrevecinas', isLive: true, desc: 'EntreVecinas: Historias y Comunidad vecinoslaserena.cl' }
    ];
    const [currentStation, setCurrentStation] = useState(stations[0]);

    const newsFlashes = [
        {
            es: "COMUNA INTELIGENTE Informa: La Máxima Autoridad Comunal ha liderado una ronda de seguridad estratégica en terreno. Acción real por la tranquilidad de nuestros vecinos.",
            en: "SMART CITY News: The Highest Municipal Authority has led a strategic security round in the field. Real action for our neighbors' peace of mind.",
            it: "CITTÀ INTELLIGENTE Informa: La Massima Autorità Comunale ha guidato un giro di sicurezza strategica sul campo. Azione reale per la tranquillità dei nostri vicini.",
            fr: "COMMUNE INTELIGENTE Informe : La Haute Autorité Comunale a mené une ronde de seguridad stratégique sur le terrain. Action réelle pour la tranquillité de nos voisins.",
            zh: "智慧社区通知：最高市政当局已在实地领导了战略安保工作。为了邻居们的安宁采取真正的行动。",
            pt: "NOTÍCIAS CIDADE INTELIGENTE: A Autoridad Municipal liderou una ronda de seguridad estratégica no terreno. Ação real pela tranquilidad de nuestros vecinos."
        },
        {
            es: isRDMLS 
                ? "Reporte de Gestión: Se consolida la Modernización Digital bajo la visión de la I. Municipalidad de La Serena. Hacia un servicio ciudadano de élite."
                : "Reporte de Gestión: Se consolida la Soberanía Comunicacional bajo la visión de vecinoslaserena.cl. Hacia un ecosistema digital de élite.",
            en: isRDMLS
                ? "Management Report: Digital Modernization is consolidated under the vision of the I. Municipality of La Serena. Towards an elite citizen service."
                : "Management Report: Communicational Sovereignty is consolidated under the vision of vecinosmart.cl. Towards an elite digital ecosystem.",
            it: isRDMLS
                ? "Rapporto di Gestione: La Modernizzazione Digitale si consolida sotto la visione della I. Municipalità di La Serena. Verso un servizio cittadino d'élite."
                : "Rapporto di Gestione: La Sovranità Comunicativa si consolida sotto la visione de vecinoslaserena.cl. Verso un ecosistema digitale d'élite.",
            fr: isRDMLS
                ? "Rapport de Gestion : La Modernisation Numérique est consolidée sous la vision de la I. Municipalité de La Serena. Vers un service citoyen d'élite."
                : "Rapport de Gestion : La Souveraineté Communicationnelle est consolidée selon la vision de vecinosmart.cl. Vers un écosystème numérique d'élite.",
            zh: isRDMLS
                ? "管理报告：在拉塞雷纳市第一市政当局的愿景下，数字化现代化得到巩固。迈向精英级公民服务。"
                : "管理报告：通信主权在 vecinoslaserena.cl 的愿景下得到巩固。迈向精英级数字生态系统。",
            pt: isRDMLS
                ? "Relatório de Gestão: A Modernização Digital consolida-se sob a visão da I. Municipalidade de La Serena. Rumo a um serviço cidadão de elite."
                : "Relatório de Gestão: A Soberania Comunicacional consolida-se sob a visão de vecinosmart.cl. Rumo a un ecossistema digital de elite."
        }
    ];

    const { lang: globalLang, setLang: setGlobalLang } = useTranslation();
    const [currentFlashIndex, setCurrentFlashIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentFlashIndex(prev => (prev + 1) % newsFlashes.length);
        }, 30000);
        return () => clearInterval(timer);
    }, [newsFlashes.length]);
    
    const [weatherData, setWeatherData] = useState({ temp: '17.4', condition: isRDMLS ? 'Normal' : 'Estado VLS' });

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=-29.9027&longitude=-71.2519&current_weather=true");
                const data = await res.json();
                if (data.current_weather) {
                    setWeatherData({
                        temp: Math.round(data.current_weather.temperature).toString(),
                        condition: 'Sincronizado'
                    });
                }
            } catch (e) { 
                // Fallback silencioso sin reporte de grados falsos
                setWeatherData(prev => ({ ...prev, temp: '--' }));
            }
        };
        fetchWeather();
        const wInterval = setInterval(fetchWeather, 600000);
        return () => clearInterval(wInterval);
    }, []);

    // ─── AUTOPLAY: inicia VLS al primer evento de usuario ───────────────────────
    const hasAutoplayAttempted = useRef(false);

    useEffect(() => {
        const ACTIVITY_EVENTS = ['click', 'mousedown', 'touchstart', 'keydown'];

        const tryAutoplay = () => {
            if (hasAutoplayAttempted.current) return;
            
            // Requisitos React-Three/Web Audio: resume obligatoriamente en evento
            initAudioContext();
            hasAutoplayAttempted.current = true;
            
            if (audioRef.current && audioRef.current.paused) {
                setIsPlaying(true);
                setupStreamAndPlay();
            }
            // Limpiar listeners una vez ejecutado
            ACTIVITY_EVENTS.forEach(evt => window.removeEventListener(evt, tryAutoplay));
        };

        const handleExternalStart = () => {
            if (audioRef.current && audioRef.current.paused) {
                initAudioContext();
                setIsPlaying(true);
                setupStreamAndPlay();
            }
        };

        const handleGlobalToggle = () => {
            togglePlay();
        };

        window.addEventListener('vls-start-radio', handleExternalStart);
        window.addEventListener('vls-toggle-radio-global', handleGlobalToggle);
        
        ACTIVITY_EVENTS.forEach(evt => window.addEventListener(evt, tryAutoplay, { once: true }));

        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        
        return () => {
            ACTIVITY_EVENTS.forEach(evt => window.removeEventListener(evt, tryAutoplay));
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('vls-start-radio', handleExternalStart);
            window.removeEventListener('vls-toggle-radio-global', handleGlobalToggle);
        };
    }, []);

    // ============================================================
    // VLS RADIO MASTER SYNC (BroadcastChannel 2026)
    // ============================================================
    const syncChannel = useRef(new BroadcastChannel('vls_radio_master'));

    const broadcastState = () => {
        const state = {
            playing: isPlaying,
            isPlaying: isPlaying,
            station: currentStation || stations[0],
            currentStation: currentStation || stations[0],
            volume: volume * 100,
            mode: playerMode,
            metadata: serverlessMetadata,
            timestamp: Date.now()
        };
        syncChannel.current.postMessage({ type: 'STATE_SYNC', state });
        syncChannel.current.postMessage({ type: 'VLS_RADIO_STATE_HEARTBEAT', state });
        // Compatibilidad con eventos legacy
        window.dispatchEvent(new CustomEvent('vls-radio-state-sync', { detail: state }));
    };

    // Heartbeat de sincronización radical (1 segundo)
    useEffect(() => {
        const heartbeat = setInterval(broadcastState, 1000);
        return () => clearInterval(heartbeat);
    }, [isPlaying, currentStation, volume, playerMode]);

    // Escuchar peticiones de sincronización forzada
    useEffect(() => {
        const handleMessage = (e) => {
            if (e.data.type === 'REQUEST_SYNC') {
                broadcastState();
            }
        };
        syncChannel.current.onmessage = handleMessage;
        return () => { syncChannel.current.onmessage = null; };
    }, [isPlaying, currentStation, volume, playerMode]);

    const [humanVoice, setHumanVoice] = useState(null);

    const findBestVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        const latAmVoices = voices.filter(v => 
            (v.lang.includes('es-CL') || v.lang.includes('es-MX') || v.lang.includes('es-AR') || v.lang.includes('es-US') || v.lang.includes('es-CO') || v.lang.includes('es-419')) 
            && !v.lang.includes('es-ES')
            && !v.name.includes('Spain') 
            && !v.name.includes('España')
        );
        const priorities = ['Sabina', 'Paulina', 'es-CL', 'Javier', 'Raul', 'Helena', 'Zira'];
        for (const p of priorities) {
            const found = latAmVoices.find(v => v.name.includes(p) || v.lang.includes(p));
            if (found) return found;
        }
        return latAmVoices[0] || voices.find(v => v.lang.includes('es') && !v.lang.includes('es-ES')) || voices[0];
    };

    useEffect(() => {
        const updateVoices = () => setHumanVoice(findBestVoice());
        if (window.speechSynthesis) {
            try {
                window.speechSynthesis.onvoiceschanged = updateVoices;
            } catch (e) {
                console.warn("speechSynthesis.onvoiceschanged not supported", e);
            }
            updateVoices();
        }
    }, []);

    const broadcastSchedule = [
        { start: '00:00', end: '04:00', name: 'Sinfonía Nocturna: VLS Relax' },
        { start: '04:00', end: '08:00', name: 'Madrugada Regional: Noticias & Clima' },
        { start: '08:00', end: '10:00', name: 'Mañanero con Rock Colapso' },
        { start: '10:00', end: '12:00', name: 'Tributos VLS: Maestro Peña Hen' },
        { start: '12:00', end: '14:00', name: 'EntreVecinos: Especial Soni Cev' },
        { start: '14:00', end: '16:00', name: 'Vallenato Vecinal & Mix Almuerzo' },
        { start: '16:00', end: '18:00', name: 'Sereneres: Remasterizaciones 2026' },
        { start: '18:00', end: '20:00', name: 'Relatos de Iquique & Arturo Prat' },
        { start: '20:00', end: '23:59', name: 'VLS Night: Chiquitita One Love' }
    ];

    const getCurrentShow = () => {
        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        const current = broadcastSchedule.find(s => timeStr >= s.start && timeStr < s.end);
        return current ? current.name : 'VLS Transmisión Continua';
    };

    const fadeVolume = (target, duration = 600) => {
        if (!audioRef.current) return;
        const startVol = audioRef.current.volume;
        const diff = target - startVol;
        const steps = 20;
        const stepTime = duration / steps;
        let currentStep = 0;
        const interval = setInterval(() => {
            currentStep++;
            audioRef.current.volume = Math.max(0, Math.min(1, startVol + (diff * (currentStep / steps))));
            if (currentStep >= steps) {
                clearInterval(interval);
                audioRef.current.volume = target;
            }
        }, stepTime);
    };

    const injectAIDJ = (msg) => {
        if (localStorage.getItem('vls_locution_enabled') === 'false') return;
        if (!window.speechSynthesis) return;
        setIsDjTalking(true);
        setDjMessage(msg);
        fadeVolume(volume * 0.1, 800);
        const utt = new SpeechSynthesisUtterance(msg);
        const voice = findBestVoice();
        if (voice) utt.voice = voice;
        utt.lang = (voice && voice.lang) ? voice.lang : 'es-MX';
        utt.rate = 0.98; // Ligeramente más pausado para sonar empático
        utt.pitch = 1.05; // Tono cálido, no estridente
        utt.volume = 0.9;
        // Pausas naturales para un ritmo más humano y reflexivo
        const textToSpeak = msg.split('. ').join('... ').split(', ').join('... ');
        utt.text = textToSpeak; 
        utt.onend = () => {
            fadeVolume(volume, 1000);
            setIsDjTalking(false);
            setDjMessage("");
        };
        utt.onerror = () => {
            fadeVolume(volume, 500);
            setIsDjTalking(false);
        };
        window.speechSynthesis.speak(utt);
    };

    useEffect(() => {
        const intervalTime = 600000;
        const djInterval = setInterval(() => {
            if (!isDjTalking && (isPlaying || Math.random() > 0.6)) {
                const hours = new Date().getHours();
                const minutes = new Date().getMinutes().toString().padStart(2, '0');
                const tips = isRDMLS ? [
                    `Radio Municipal informa: Son las ${hours} con ${minutes}. Les acompañamos en el bloque informativo oficial.`,
                    "En nuestro portal buscamos facilitar el acceso a trámites y servicios municipales de forma coordinada. Una herramienta para su día a día.",
                    "Queremos que su experiencia al reportar incidencias urbanas sea eficiente. Gracias por su compromiso con nuestra comuna.",
                    "¿Busca profundizar sus conocimientos? El portal de inducción elearning está a su disposición para el crecimiento profesional.",
                    "Le invitamos a conocer el Paseo Histórico de nuestra ciudad. Un recorrido virtual por la identidad serenense.",
                    "Nuestros observatorios son ventanas al universo. La Serena, capital mundial de la astronomía, le saluda.",
                    "Fomentamos el desarrollo económico local. Conozca las iniciativas de fomento productivo en nuestro portal estratégico.",
                    "El aprendizaje continuo es clave en la gestión digital. Explore nuestros módulos de capacitación para funcionarios y ciudadanos.",
                    "Saludamos a la red de comunicadores regionales. Gracias por ser parte de esta señal oficial."
                ] : [
                    `vecinoslaserena.cl informa: Son las ${hours} con ${minutes}. Les acompañamos en el bloque "${getCurrentShow()}".`,
                    "En puertasmart.cl buscamos facilitar el acceso de sus visitas y proveedores de forma sencilla. Una herramienta vecinal.",
                    "Queremos que su experiencia al reportar baches o luminarias sea lo más simple posible. Gracias por cuidar los barrios con vecinosmart.cl.",
                    "¿Busca descansar un momento? Nuestra Zona Arcade está disponible para que disfrute de los clásicos de siempre en comunasmart.cl.",
                    "Le invitamos a recorrer el Paseo Histórico 3D. Es un viaje tranquilo por la memoria y los rincones de nuestra región con vecinosmart.cl.",
                    "Si le gusta observar el cielo, nuestro simulador de estrellas es una ventana abierta a la belleza de nuestras noches en vecinoslaserena.cl.",
                    "Apoyamos el emprendimiento local. Si tiene un negocio, puede compartirlo en nuestro hub comercial de puertasmart.cl para conectar con vecinos.",
                    "Aprender algo nuevo siempre es un buen plan. Explore nuestros módulos de idiomas y descubra nuevas habilidades en comunasmart.cl.",
                    "Recordamos con cariño a los maestros de nuestra música regional. Gracias por acompañarnos en esta sintonía de vecinoslaserena.cl."
                ];
                const nextIndex = (currentTipIndex + 1) % tips.length;
                setCurrentTipIndex(nextIndex);
                injectAIDJ(tips[nextIndex]);
            }
        }, intervalTime);
        return () => clearInterval(djInterval);
    }, [isPlaying, isDjTalking, currentStation, volume, currentTipIndex]);

    useEffect(() => {
        const handleStopAudio = () => {
            if (audioRef.current) {
                audioRef.current.pause();
                setIsPlaying(false);
            }
            if (isDjTalking) {
                window.speechSynthesis.cancel();
                setIsDjTalking(false);
                setDjMessage("");
            }
        };
        const handleManualStop = () => {
            if (audioRef.current) {
                audioRef.current.pause();
                setIsPlaying(false);
            }
        };
        window.addEventListener('stop-all-audio', handleStopAudio);
        window.addEventListener('vls-stop-radio', handleManualStop);
        const handleDuck = () => { if (audioRef.current) audioRef.current.volume = volume * 0.1; };
        const handleUnduck = () => { if (audioRef.current) audioRef.current.volume = volume; };
        window.addEventListener('radio-duck', handleDuck);
        window.addEventListener('radio-unduck', handleUnduck);
        const handleSetVolume = (e) => {
            if (e.detail !== undefined) setVolume(parseFloat(e.detail) / 100);
        };
        window.addEventListener('vls-set-volume', handleSetVolume);

        const handleExternalEq = (e) => {
            if (e.detail && e.detail.index !== undefined) {
                handleEqChange(e.detail.index, e.detail.value);
            }
        };
        window.addEventListener('vls-set-eq', handleExternalEq);

        const handleSetMode = (e) => {
            if (e.detail) setPlayerMode(e.detail);
        };
        window.addEventListener('vls-set-player-mode', handleSetMode);

        return () => {
            window.removeEventListener('stop-all-audio', handleStopAudio);
            window.removeEventListener('vls-stop-radio', handleManualStop);
            window.removeEventListener('radio-duck', handleDuck);
            window.removeEventListener('radio-unduck', handleUnduck);
            window.removeEventListener('vls-set-volume', handleSetVolume);
            window.removeEventListener('vls-set-eq', handleExternalEq);
            window.removeEventListener('vls-set-player-mode', handleSetMode);
        };
    }, [isPlaying, isDjTalking, volume, eqLevels]);

    useEffect(() => {
        if (audioRef.current && isPlaying) {
            setupStreamAndPlay();
        }
    }, [currentStation, hasProxyFallback]);

    // ─── LÓGICA VLS NATIVE HTML5 STREAMING 2026 ─────────
    const setupStreamAndPlay = async () => {
        if (!audioRef.current) return;
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        
        if (!currentStation) return;
        const streamUrl = currentStation.stream;

        audioRef.current.pause();
        audioRef.current.removeAttribute('crossorigin'); // Bypass CORS completely

        if (streamUrl === 'serverless') {
            if (!serverlessEngineRef.current) {
                serverlessEngineRef.current = new ServerlessRadioEngine('/radio_playlist.json');
                await serverlessEngineRef.current.init();
            }
            const state = serverlessEngineRef.current.getCurrentState();
            if (state) {
                audioRef.current.src = state.track.url;
                audioRef.current.load();
                
                audioRef.current.onloadedmetadata = () => {
                    audioRef.current.currentTime = state.offset;
                    const playPromise = audioRef.current.play();
                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                            setIsPlaying(true);
                            audioRef.current.volume = volume;
                            startVULoop();
                        }).catch(e => {
                            setIsPlaying(false);
                            console.warn("VLS Serverless Autoplay Bloqueado.");
                        });
                    }
                };
                
                audioRef.current.onended = () => {
                    if (isPlaying) setupStreamAndPlay();
                };
                
                setServerlessMetadata(serverlessEngineRef.current.getMetadata());
            } else {
                console.error("VLS Serverless Engine no pudo obtener el estado.");
            }
            return;
        }

        audioRef.current.src = streamUrl;
        audioRef.current.load();
        
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                setIsPlaying(true);
                audioRef.current.volume = volume;
                startVULoop();
            }).catch(e => {
                setIsPlaying(false);
                if (e.name === "AbortError") {
                    // Completamente Silencioso: Flujo intencional VLS al pausar rápido (Cero Console Errors)
                    console.log("VLS Audio 2026: Fast-Switch Abort (Safe).");
                } else if (e.name === "NotAllowedError") {
                    console.warn("⚠️ Autoplay Bloqueado: Esperando interacción M/K del vecino.");
                } else {
                    console.error("VLS Audio: Red Stream Error.", e);
                    console.warn("⚠️ Fallo en Sintonía VLS: Transmisión inaccesible en este momento.");
                }
            });
        }
    };

    useEffect(() => {
        if (audioRef.current && !isDjTalking) audioRef.current.volume = volume;
    }, [volume, isDjTalking]);

    useEffect(() => {
        if (filtersRef.current.length > 0 && audioContextRef.current) {
            eqLevels.forEach((level, i) => {
                if (filtersRef.current[i]) {
                    const gain = (level - 50) * 0.8; // Increased from 0.6 to 0.8 for clearer EQ response
                    filtersRef.current[i].gain.setTargetAtTime(gain, audioContextRef.current.currentTime, 0.1);
                }
            });
        }
    }, [eqLevels]);

    const initAudioContext = () => {
        if (!audioContextRef.current) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioContext();
            audioContextRef.current = ctx;
            
            // INTENCIONAMENTE DESCONECTADO (VLS 5.1 Bypass de Taint CORS)
            // No creamos MediaElementSource para el audioRef porque mudece el Player.


            analyserRef.current = ctx.createAnalyser();
            analyserRef.current.fftSize = 512; 
            const frequencies = [31, 62, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];
            const filters = frequencies.map(freq => {
                const filter = ctx.createBiquadFilter();
                filter.type = 'peaking';
                filter.frequency.value = freq;
                filter.Q.value = 1.0;
                filter.gain.value = 0;
                return filter;
            });
            filtersRef.current = filters;

            // Wire the graph: source -> filters -> analyser -> destination
            if (sourceRef.current) {
                let currentNode = sourceRef.current;
                filters.forEach(filter => {
                    currentNode.connect(filter);
                    currentNode = filter;
                });
                currentNode.connect(analyserRef.current);
            }
            
            analyserRef.current.connect(ctx.destination);
        }
        if (audioContextRef.current.state === 'suspended') audioContextRef.current.resume();
    };

    const togglePlay = () => {
        if (!audioRef.current) return;
        initAudioContext();
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        } else {
            setIsPlaying(true);
            setupStreamAndPlay();
        }
    };

    useEffect(() => {
        if (isPlaying) startVULoop();
        else if (animationRef.current) cancelAnimationFrame(animationRef.current);
    }, [isPlaying]);

    useEffect(() => {
        if (!isPlaying) return;
        const checkTime = () => {
            const now = new Date();
            if (now.getMinutes() === 0 && now.getSeconds() < 10) playAIDJLocution();
        };
        const interval = setInterval(checkTime, 10000);
        return () => clearInterval(interval);
    }, [isPlaying, volume]);

    const startVULoop = () => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        const updateMeters = () => {
            if (!audioRef.current || audioRef.current.paused) return;
            let hasRealData = false;
            let rotL = -45, rotR = -45;
            let newSpectrum = Array(10).fill(10);

            if (analyserRef.current) {
                const bufferLength = analyserRef.current.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);
                analyserRef.current.getByteFrequencyData(dataArray);
                hasRealData = dataArray.some(v => v > 0);
                
                if (hasRealData) {
                    let leftSum = 0, rightSum = 0;
                    const half = Math.floor(bufferLength / 2);
                    for(let i = 0; i < half; i++) leftSum += dataArray[i];
                    for(let i = half; i < bufferLength; i++) rightSum += dataArray[i];
                    const avgL = leftSum / half;
                    const avgR = rightSum / half;
                    rotL = -45 + (Math.min(255, avgL) / 255) * 90;
                    rotR = -45 + (Math.min(255, avgR) / 255) * 90;
                    
                    const step = Math.floor(bufferLength / 10);
                    for(let i = 0; i < 10; i++) {
                        let bandSum = 0;
                        for(let j = 0; j < step; j++) bandSum += dataArray[i * step + j];
                        newSpectrum[i] = (bandSum / step / 255) * 100;
                    }
                }
            }
            
            if (!hasRealData) {
                // VLS HIGH-FIDELITY SYNTHETIC MODE (Immune to CORS disconnections)
                const time = Date.now() / 150;
                const volFactor = volume * 0.8;
                const fakeL = 90 + Math.abs(Math.sin(time) * 120 * volFactor);
                const fakeR = 90 + Math.abs(Math.cos(time * 0.8) * 120 * volFactor);
                rotL = -45 + (Math.min(255, fakeL) / 255) * 90;
                rotR = -45 + (Math.min(255, fakeR) / 255) * 90;
                newSpectrum = [80*volume, 60*volume, 70*volume, 50*volume, 40*volume, 60*volume, 30*volume, 20*volume, 25*volume, 15*volume].map(v => v + (Math.random() * 5));
            }

            setSpectrumLevels(newSpectrum);
            meterLevelsRef.current.left += (rotL - meterLevelsRef.current.left) * 0.25;
            meterLevelsRef.current.right += (rotR - meterLevelsRef.current.right) * 0.25;
            
            if (vuLeftRef.current) vuLeftRef.current.style.transform = `rotate(${meterLevelsRef.current.left}deg)`;
            if (vuRightRef.current) vuRightRef.current.style.transform = `rotate(${meterLevelsRef.current.right}deg)`;
            
            // Sync with other components
            window.dispatchEvent(new CustomEvent('vls-audio-spectrum-sync', { 
                detail: { spectrum: newSpectrum, left: meterLevelsRef.current.left, right: meterLevelsRef.current.right, isPlaying: true } 
            }));
            
            animationRef.current = requestAnimationFrame(updateMeters);
        };
        animationRef.current = requestAnimationFrame(updateMeters);
    };

    const handleEqChange = (index, val) => {
        const newEq = [...eqLevels];
        newEq[index] = val;
        setEqLevels(newEq);
        // Notificar a otros componentes (UI Sync)
        window.dispatchEvent(new CustomEvent('vls-sync-eq-ui', { 
            detail: { levels: newEq } 
        }));
    };

    useEffect(() => {
        if (!isPlaying) {
            const decay = setInterval(() => {
                meterLevelsRef.current.left += (-45 - meterLevelsRef.current.left) * 0.1;
                meterLevelsRef.current.right += (-45 - meterLevelsRef.current.right) * 0.1;
                if (vuLeftRef.current) vuLeftRef.current.style.transform = `rotate(${meterLevelsRef.current.left}deg)`;
                if (vuRightRef.current) vuRightRef.current.style.transform = `rotate(${meterLevelsRef.current.right}deg)`;
                setSpectrumLevels(prev => prev.map(l => Math.max(0, l * 0.85)));
            }, 50);
            return () => clearInterval(decay);
        } else {
            startVULoop();
        }
    }, [isPlaying]);

    const playTimeSignal = () => {
        if (!audioContextRef.current) initAudioContext();
        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') ctx.resume();
        const host = window.location.hostname.toLowerCase();

        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        g.gain.setValueAtTime(0, ctx.currentTime);
        g.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);
        g.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.8);
    };

    const playAIDJLocution = () => {
        const hours = new Date().getHours();
        const minutes = new Date().getMinutes();
        const timeMsg = isArchi
            ? `Archi de todo Chile informa: La hora exacta es, las ${hours} con ${minutes} minutos. Únete a la Lista Nueva Energía.`
            : isRDMLS 
            ? `Radio Digital Municipal informa: La hora exacta es, las ${hours} con ${minutes} minutos. R-D-M-L-S, tecnología al servicio de la comuna.`
            : `vecinoslaserena.cl informa: La hora exacta es, las ${hours} con ${minutes} minutos. Comuna Smart, tecnología al servicio del vecino.`;
        playTimeSignal();
        setTimeout(() => injectAIDJ(timeMsg), 1000);
    };

    // ─── CICLAR ENTRE LOS 3 MODOS: expanded → compact → mini → expanded ──────
    const cycleMode = () => {
        setPlayerMode(prev => {
            if (prev === 'expanded') return 'compact';
            if (prev === 'compact') return 'mini';
            return 'expanded';
        });
    };

    // ─── MODO MINI: Solo ícono radio flotante ─────────────────────────────────
    if (isMini) {
        return (
            <motion.div
                drag
                dragMomentum={false}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{
                    position: 'fixed',
                    bottom: isMobile ? '80px' : '24px',
                    right: isMobile ? '12px' : '24px',
                    zIndex: 99999999,
                    display: isVisible ? 'flex' : 'none',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px'
                }}
            >
                <audio ref={audioRef} loop={!currentStation.isLive} crossOrigin="anonymous"
                    onPlay={() => { initAudioContext(); setIsPlaying(true); }}
                    onPause={() => setIsPlaying(false)}
                />
                {/* Botón minimizado */}
                <motion.button
                    onClick={cycleMode}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                        width: '52px', height: '52px',
                        borderRadius: '50%',
                        background: isPlaying
                            ? 'linear-gradient(135deg, #ef4444 0%, #991b1b 100%)'
                            : 'rgba(15,23,42,0.95)',
                        border: `2px solid ${isPlaying ? '#ef4444' : 'rgba(239,68,68,0.4)'}`,
                        boxShadow: isPlaying
                            ? '0 0 20px rgba(239,68,68,0.6), 0 4px 15px rgba(0,0,0,0.5)'
                            : '0 4px 15px rgba(0,0,0,0.5)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(20px)'
                    }}
                >
                    <Radio size={22} color="white" />
                </motion.button>
                {/* Mini play/pause debajo */}
                <motion.button
                    onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                    whileTap={{ scale: 0.85 }}
                    style={{
                        width: '28px', height: '28px',
                        borderRadius: '50%',
                        background: 'rgba(239,68,68,0.9)',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
                    }}
                >
                    {isPlaying ? <Pause size={12} color="white" /> : <Play size={12} color="white" style={{ marginLeft: '2px' }} />}
                </motion.button>
                {/* Indicador live */}
                {isPlaying && (
                    <div style={{ fontSize: '0.45rem', color: '#ef4444', fontWeight: '900', letterSpacing: '1px', animation: 'pulse 1s infinite' }}>
                        ● EN VIVO
                    </div>
                )}
                <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
            </motion.div>
        );
    }

    // ─── MODOS COMPACT y EXPANDED ─────────────────────────────────────────────
    return (
        <motion.div 
            drag
            dragMomentum={false}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            style={{ 
                position: 'fixed', 
                bottom: isMobile ? '70px' : '20px', 
                right: isMobile ? '10px' : '20px', 
                zIndex: 99999999, 
                display: isVisible ? 'flex' : 'none', 
                flexDirection: 'column', 
                gap: '8px', 
                alignItems: 'flex-end',
                pointerEvents: isVisible ? 'auto' : 'none'
            }}
        >

            <audio 
                ref={audioRef} 
                loop={!currentStation?.isLive} 
                crossOrigin="anonymous"
                onPlay={() => { initAudioContext(); setIsPlaying(true); }}
                onPause={() => setIsPlaying(false)}
            />

            <AnimatePresence>
                {isDjTalking && (
                    <motion.div 
                        initial={{ y: 20, opacity: 0, scale: 0.8 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 20, opacity: 0, scale: 0.8 }}
                        style={{ 
                            background: 'rgba(239, 68, 68, 0.95)', color: 'white', padding: '10px 18px', 
                            borderRadius: '16px 16px 0 16px', fontSize: '0.8rem', fontWeight: 'bold', 
                            maxWidth: isMobile ? '200px' : '300px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                            border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)',
                            display: 'flex', alignItems: 'center', gap: '8px'
                        }}
                    >
                        <Zap size={14} className="pulse-fast" />
                        <span>{isRDMLS ? 'RDMLS IA INSTITUCIONAL' : 'RADIO IA VECINOS LA SERENA'}: {djMessage}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <div style={{ 
                background: 'rgba(15, 23, 42, 0.95)', 
                backdropFilter: 'blur(20px)', 
                borderRadius: isExpanded ? '20px' : '40px', 
                border: '2px solid rgba(239, 68, 68, 0.5)', 
                boxShadow: '0 15px 45px rgba(0,0,0,0.8)',
                transition: 'border-radius 0.4s, background 0.4s', 
                minWidth: isExpanded ? (isMobile ? '280px' : '340px') : 'auto',
                maxWidth: '95vw',
                width: isExpanded && !isMobile ? '340px' : 'auto',
                resize: isExpanded && !isMobile ? 'horizontal' : 'none',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
            }}>
                
                {isExpanded && (
                    <div style={{ padding: '0', display: 'flex', flexDirection: 'column' }}>
                        {/* ── Header de Ventana Premium ── */}
                        <div style={{ 
                            padding: '12px 20px', 
                            background: 'linear-gradient(90deg, #1e293b, #0f172a)', 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            borderBottom: '1px solid rgba(239, 68, 68, 0.3)',
                            userSelect: 'none'
                        }}>
                             <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Radio size={16} color="#ef4444" className="pulse-fast" />
                                <span style={{ fontSize: '0.75rem', fontWeight: '900', color: 'white', letterSpacing: '1px' }}>VLS RADIO & TV STREAMING</span>
                             </div>
                             <div style={{ display: 'flex', gap: '10px' }}>
                                <button onClick={() => setPlayerMode('compact')} title="Replegar" style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', borderRadius: '4px', width: '28px', height: '22px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <ChevronDown size={14} />
                                </button>
                                <button onClick={() => setPlayerMode('mini')} title="Minimizar" style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', borderRadius: '4px', width: '28px', height: '22px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Maximize size={12} style={{ transform: 'rotate(180deg)' }} />
                                </button>
                                <button onClick={() => window.dispatchEvent(new CustomEvent('vls-stop-radio'))} title="Cerrar" style={{ background: 'rgba(239, 68, 68, 0.2)', border: 'none', color: '#ef4444', borderRadius: '4px', width: '28px', height: '22px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <X size={14} />
                                </button>
                             </div>
                        </div>

                        <div style={{ padding: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '12px', marginBottom: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <CloudSun size={24} color="#38bdf8" />
                                    <span style={{ fontSize: '1.2rem', color: 'white', fontWeight: '900' }}>{weatherData?.temp || globalWeather?.temp || '17.4'}°</span>
                                </div>
                                <button 
                                    onClick={playAIDJLocution}
                                    style={{ 
                                        background: 'linear-gradient(135deg, #ef4444 0%, #991b1b 100%)', 
                                        border: '1px solid rgba(255,255,255,0.2)', color: 'white', 
                                        padding: '5px 12px', borderRadius: '8px', fontSize: '0.8rem', 
                                        fontWeight: '900', fontFamily: 'monospace', cursor: 'pointer', 
                                        display: 'flex', flexDirection: 'column', alignItems: 'center', 
                                        justifyContent: 'center', minWidth: '85px', gap: '0',
                                        boxShadow: '0 0 15px rgba(239, 68, 68, 0.4)'
                                    }}
                                >
                                    <div style={{ fontSize: '0.45rem', color: '#fecaca', opacity: 0.9 }}>SEÑAL HORARIA</div>
                                    <div>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                </button>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '0.7rem', color: '#cbd5e1', fontWeight: 'bold' }}>LA SERENA</div>
                                    <div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>{weatherData?.condition || 'Sincronizado'}</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '5px', marginBottom: '15px' }}>
                                <button onClick={() => setActiveMediaType('radio')} style={{ flex: 1, background: activeMediaType === 'radio' ? '#ef4444' : 'rgba(255,255,255,0.05)', border: 'none', color: 'white', padding: '10px 2px', borderRadius: '8px', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' }}><Radio size={12} /> Radio</button>
                                <button onClick={() => setActiveMediaType('tv-fast')} style={{ flex: 1, background: activeMediaType === 'tv-fast' ? '#ef4444' : 'rgba(255,255,255,0.05)', border: 'none', color: 'white', padding: '10px 2px', borderRadius: '8px', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' }}><Tv size={12} /> TV Libre</button>
                                <button onClick={() => setActiveMediaType('tv-premium')} style={{ flex: 1, background: activeMediaType === 'tv-premium' ? '#ef4444' : 'rgba(255,255,255,0.05)', border: 'none', color: 'white', padding: '10px 2px', borderRadius: '8px', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' }}><Lock size={12} /> Premium</button>
                            </div>

                            {activeMediaType.startsWith('tv') && currentStation.type.startsWith('tv') && (
                                <div style={{ width: '100%', aspectRatio: '16/9', background: '#000', borderRadius: '12px', overflow: 'hidden', marginBottom: '15px', border: '1px solid #ef4444', position: 'relative' }}>
                                    {currentStation.isLocked ? (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.8)', color: 'white', padding: '15px', textAlign: 'center' }}>
                                            <Lock size={40} color="#ef4444" style={{ marginBottom: '10px' }} />
                                            <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>CONTENIDO PREMIUM</span>
                                            <button onClick={() => window.dispatchEvent(new CustomEvent('open-vecinity-pay'))} style={{ background: '#ef4444', border: 'none', color: 'white', padding: '8px 15px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>Desbloquear con Fichas</button>
                                        </div>
                                    ) : (
                                        <iframe width="100%" height="100%" src={currentStation?.stream || ''} title={currentStation?.name || 'VLS TV'} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                                    )}
                                </div>
                            )}

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
                                <span style={{ fontSize: '0.6rem', color: '#ef4444', fontWeight: '900', letterSpacing: '1px', textTransform: 'uppercase' }}>{isRDMLS ? 'RDMLS' : 'VECINOS LA SERENA'} {activeMediaType}</span>
                                    {stations.filter(s => s && s.type === activeMediaType || (activeMediaType === 'tv-premium' && s && s.type === 'tv-fast')).map(st => (
                                        <div key={st?.id || Math.random()} onClick={() => { setCurrentStation(st); if (st?.type === 'radio') setupStreamAndPlay(); }} style={{ padding: '10px 12px', borderRadius: '10px', cursor: 'pointer', background: currentStation?.id === st?.id ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255,255,255,0.03)', fontSize: '0.75rem', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: currentStation?.id === st?.id ? '1px solid #ef4444' : '1px solid transparent', transition: '0.2s' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <span style={{ fontWeight: 'bold' }}>{st.name}</span>
                                                {st.sub === 'vls' && <span style={{ fontSize: '0.5rem', background: '#38bdf8', padding: '1px 3px', borderRadius: '3px' }}>PROPIA</span>}
                                            </div>
                                            <span style={{ fontSize: '0.6rem', color: '#94a3b8' }}>{st.desc}</span>
                                        </div>
                                        {st.isLive && <span style={{ fontSize: '0.55rem', background: '#ef4444', padding: '2px 5px', borderRadius: '4px', fontWeight: 'bold' }}>LIVE</span>}
                                    </div>
                                ))}
                            </div>

                            <div style={{ background: '#000', padding: '15px', borderRadius: '16px', marginBottom: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.5) inset' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' }}>
                                    <AnalogVUMeter label="L" needleRef={vuLeftRef} />
                                    <AnalogVUMeter label="R" needleRef={vuRightRef} />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', height: '110px', padding: '0 5px', gap: '4px' }}>
                                    {spectrumLevels.map((l, i) => (
                                        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flex: 1 }}>
                                            <div style={{ width: '100%', maxWidth: '14px', height: '80px', background: 'rgba(255,255,255,0.02)', position: 'relative', borderRadius: '2px', cursor: 'ns-resize', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}
                                                onPointerDownCapture={(e) => e.stopPropagation()}
                                                onMouseDownCapture={(e) => e.stopPropagation()}
                                            >
                                                <div style={{ position: 'absolute', bottom: 0, width: '100%', height: `${eqLevels[i]}%`, background: 'rgba(255,255,255,0.03)', borderTop: '2px solid #64748b', zIndex: 1 }}
                                                    onClick={(e) => {
                                                        const rect = e.currentTarget.parentElement.getBoundingClientRect();
                                                        const y = e.clientY - rect.top;
                                                        const val = 100 - (y / rect.height) * 100;
                                                        handleEqChange(i, Math.max(0, Math.min(100, val)));
                                                    }}
                                                />
                                                <div style={{ position: 'absolute', bottom: 0, width: '100%', height: `${l}%`, background: l > 80 ? '#ef4444' : l > 50 ? '#fbbf24' : '#10b981', borderRadius: '1px', transition: 'height 0.05s', zIndex: 2, pointerEvents: 'none', opacity: 0.8 }} />
                                                <div style={{ position: 'absolute', bottom: `calc(${eqLevels[i]}% - 4px)`, width: '100%', height: '5px', background: '#e2e8f0', border: '1px solid #ef4444', borderRadius: '1px', zIndex: 3, boxShadow: '0 0 5px rgba(239, 68, 68, 0.5)' }} />
                                            </div>
                                            <span style={{ fontSize: '0.45rem', color: '#94a3b8', fontWeight: 'bold', fontFamily: 'monospace' }}>
                                                {['31', '62', '125', '250', '500', '1K', '2K', '4K', '8K', '16K'][i]}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ textAlign: 'center', marginTop: '8px' }}>
                                    <span style={{ fontSize: '0.6rem', color: '#ef4444', fontWeight: '950', letterSpacing: '2px' }}>{isRDMLS ? 'RDMLS' : 'VLS'} PROFESSIONAL 10-BAND EQ</span>
                                </div>
                            </div>

                            <div style={{ marginBottom: '20px', background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <span style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: '900', letterSpacing: '1px', display: 'block', marginBottom: '10px' }}>GRILLA PROGRAMÁTICA</span>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', maxHeight: '100px', overflowY: 'auto', paddingRight: '5px' }}>
                                    {broadcastSchedule.map((s, idx) => (
                                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: getCurrentShow() === s.name ? '#ef4444' : '#94a3b8', background: getCurrentShow() === s.name ? 'rgba(239, 68, 68, 0.05)' : 'transparent', padding: '2px 5px', borderRadius: '4px' }}>
                                            <span style={{ fontWeight: 'bold' }}>{s.start} - {s.end}</span>
                                            <span style={{ fontWeight: getCurrentShow() === s.name ? '900' : 'normal' }}>{s.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Barra de Control Principal ── */}
                <div style={{ 
                    display: 'flex', alignItems: 'center', gap: '15px', 
                    padding: '12px 20px',
                    justifyContent: 'flex-start'
                }}>
                    {!isMobile && (
                        <div style={{ cursor: 'grab', opacity: 0.5 }} className="drag-handle">
                            <GripHorizontal size={20} color="white" />
                        </div>
                    )}

                    <button 
                        onClick={togglePlay} 
                        style={{ 
                            background: '#ef4444', border: 'none', borderRadius: '50%', 
                            width: '45px', height: '45px', 
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexShrink: 0
                        }}
                    >
                        {isPlaying ? <Pause size={24} color="white" /> : <Play size={24} color="white" style={{ marginLeft: '4px' }} />}
                    </button>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', cursor: 'pointer', overflow: 'hidden' }} onClick={() => setPlayerMode(prev => prev === 'expanded' ? 'compact' : 'expanded')}>
                        <span style={{ fontSize: '0.85rem', fontWeight: '900', color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {currentStation.name}
                        </span>
                        <span style={{ fontSize: '0.65rem', color: isPlaying ? '#ef4444' : '#64748b' }}>
                            {isPlaying ? '● SINTONIZADO' : 'RADIO EN PAUSA'}
                        </span>
                    </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: isMobile ? '160px' : '220px' }}>
                            <Volume2 size={18} color={volume === 0 ? '#64748b' : '#ef4444'} />
                            <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <input 
                                    type="range" min="0" max="1" step="0.001" value={volume} 
                                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                                    style={{ 
                                        width: '100%', accentColor: '#ef4444', height: '10px', borderRadius: '10px',
                                        outline: 'none', cursor: 'pointer',
                                        background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${volume * 100}%, #1e293b ${volume * 100}%, #1e293b 100%)`,
                                        appearance: 'none', WebkitAppearance: 'none',
                                        marginRight: '10px'
                                    }} 
                                    className="vls-volume-slider"
                                />
                                <span style={{ fontSize: '0.7rem', color: '#ef4444', fontWeight: 'bold', minWidth: '35px', textAlign: 'right', fontFamily: 'monospace' }}>
                                    {Math.round(volume * 100)}%
                                </span>
                            </div>
                        </div>
                        {/* Botón ciclar modo: expanded → compact → mini */}
                        <button 
                            onClick={cycleMode} 
                            title={isExpanded ? 'Colapsar' : isMini ? 'Expandir' : 'Minimizar'} 
                            style={{ 
                                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', 
                                color: 'white', padding: '5px', borderRadius: '50%', cursor: 'pointer', transition: 'all 0.3s',
                                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}
                        >
                            {playerMode === 'compact' ? <ChevronUp size={20} /> : playerMode === 'expanded' ? <ChevronDown size={20} /> : <Radio size={16} />}
                        </button>
                    </div>
                </div>


            <style>{`
                .drag-handle:active { cursor: grabbing; }
                .pulse-fast { animation: pulse 0.6s infinite; }
                @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
                .vls-volume-slider::-webkit-slider-thumb {
                    -webkit-appearance: none; appearance: none;
                    width: 14px; height: 14px; border-radius: 50%;
                    background: white; cursor: pointer;
                    box-shadow: 0 0 10px rgba(0,0,0,0.5); border: 2px solid #ef4444;
                }
                .vls-volume-slider::-moz-range-thumb {
                    width: 14px; height: 14px; border-radius: 50%;
                    background: white; cursor: pointer;
                    box-shadow: 0 0 10px rgba(0,0,0,0.5); border: 2px solid #ef4444;
                }
            `}</style>
        </motion.div>
    );
}
