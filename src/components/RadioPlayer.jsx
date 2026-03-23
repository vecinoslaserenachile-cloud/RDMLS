import React, { useState, useRef, useEffect } from 'react';
import { 
    Play, Pause, Mic, CloudSun, Radio, Sliders, Volume2, 
    VolumeX, ChevronUp, ChevronDown, Activity, GripHorizontal,
    Newspaper, Info, Music, Zap, Move, Tv, Monitor, Lock,
    MessageSquare, SkipForward, SkipBack, Layers, Settings, Maximize, ExternalLink, Globe, Wifi, Shield, TrendingUp, TrendingDown, Clock, Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../context/LanguageContext';
import { getVLSLocution } from '../utils/vlsNewsEngine';

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
    const [isPlaying, setIsPlaying] = useState(false);
    const [playerMode, setPlayerMode] = useState('compact'); // 3 estados
    const audioRef = useRef(null);
    const [volume, setVolume] = useState(0.8);
    const [eqLevels, setEqLevels] = useState([50, 50, 50, 50, 50]);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [activeMediaType, setActiveMediaType] = useState('radio');
    const [isDjTalking, setIsDjTalking] = useState(false);
    const [djMessage, setDjMessage] = useState('');
    const [currentTipIndex, setCurrentTipIndex] = useState(0);

    const vuLeftRef = useRef(null);
    const vuRightRef = useRef(null);
    const [spectrumLevels, setSpectrumLevels] = useState([10, 20, 30, 20, 10]);
    const meterLevelsRef = useRef({ left: -45, right: -45 });
    
    // Audio Engine Refs
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const sourceRef = useRef(null);
    const filtersRef = useRef([]);
    const animationRef = useRef(null);

    // isExpanded convenience derived from playerMode
    const isExpanded = playerMode === 'expanded';
    const isMini = playerMode === 'mini';

    const stations = [
        // --- RADIOS VLS & LOCALES ---
        { id: 1, type: 'radio', sub: 'vls', name: 'VLS Señal Principal', stream: 'https://az11.yesstreaming.net:8630/radio.mp3', isLive: true, isMain: true, desc: 'Noticias y Comunidad La Serena' },
        { id: 14, type: 'radio', sub: 'vls', name: 'VLS Sesiones Musicales', stream: 'https://az11.yesstreaming.net:8630/radio.mp3?rel=cuturrufo', isLive: true, desc: 'Marcelo Cuturrufo y Amigos - Sesiones VLS' },
        { id: 15, type: 'radio', sub: 'vls', name: 'VLS Entrevistas', stream: 'https://az11.yesstreaming.net:8630/radio.mp3?rel=entrevecinas', isLive: true, desc: 'EntreVecinas: Historias y Comunidad VLS' }
    ];
    const [currentStation, setCurrentStation] = useState(stations[0]);

    const newsFlashes = [
        {
            es: "COMUNA INTELIGENTE Informa: La Máxima Autoridad Comunal ha liderado una ronda de seguridad estratégica en terreno. Acción real por la tranquilidad de nuestros vecinos.",
            en: "SMART CITY News: The Highest Municipal Authority has led a strategic security round in the field. Real action for our neighbors' peace of mind.",
            it: "CITTÀ INTELLIGENTE Informa: La Massima Autorità Comunale ha guidato un giro di sicurezza strategica sul campo. Azione reale per la tranquillità dei nostri vicini.",
            fr: "COMMUNE INTELLIGENTE Informe : La Haute Autorité Comunale a mené une ronde de sécurité stratégique sur le terrain. Action réelle pour la tranquillité de nos voisins.",
            zh: "智慧社区通知：最高市政当局已在实地领导了战略安保工作。为了邻居们的安宁采取真正的行动。",
            pt: "NOTÍCIAS CIDADE INTELIGENTE: A Autoridade Municipal liderou uma ronda de segurança estratégica no terreno. Ação real pela tranquilidade dos nossos vizinhos."
        },
        {
            es: "Reporte de Gestión: Se consolida la Soberanía Comunicacional bajo la visión de vecinoslaserena.cl. Hacia un ecosistema digital de élite.",
            en: "Management Report: Communicational Sovereignty is consolidated under the vision of An anonymous neighbor. Towards an elite digital ecosystem.",
            it: "Rapporto di Gestione: La Sovranità Comunicativa si consolida sotto la visione di Un vicino anonimo. Verso un ecosistema digitale d'élite.",
            fr: "Rapport de Gestion : La Souveraineté Communicationnelle est consolidée unter vision d'un voisin anonyme. Vers un écosystème numérique d'élite.",
            zh: "管理报告：通信主权在一匿名邻居的愿景下得到巩固。迈向精英级数字生态系统。",
            pt: "Relatório de Gestão: A Soberania Comunicacional consolida-se sob a visão de um vizinho anônimo. Rumo a um ecossistema digital de elite."
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
    
    const [weatherData, setWeatherData] = useState({ temp: '17.4', condition: 'Despejado' });

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=-29.9027&longitude=-71.2519&current_weather=true");
                const data = await res.json();
                if (data.current_weather) {
                    setWeatherData({
                        temp: Math.round(data.current_weather.temperature).toString(),
                        condition: 'Despejado'
                    });
                }
            } catch (e) { 
                setWeatherData(prev => ({ ...prev, temp: (20 + (Math.random() * 0.5)).toFixed(1) }));
            }
        };
        fetchWeather();
        const wInterval = setInterval(fetchWeather, 600000);
        return () => clearInterval(wInterval);
    }, []);

    // ─── AUTOPLAY: inicia VLS al primer evento de usuario ───────────────────────
    const hasAutoplayAttempted = useRef(false);

    useEffect(() => {
        const tryAutoplay = () => {
            if (hasAutoplayAttempted.current) return;
            hasAutoplayAttempted.current = true;
            
            if (audioRef.current && audioRef.current.paused) {
                audioRef.current.src = stations[0].stream;
                audioRef.current.load();
                const p = audioRef.current.play();
                if (p !== undefined) {
                    p.then(() => {
                        setIsPlaying(true);
                        setCurrentStation(stations[0]);
                    }).catch(() => {});
                }
            }
            // Limpiar listeners una vez ejecutado
            ACTIVITY_EVENTS.forEach(evt => window.removeEventListener(evt, tryAutoplay));
        };

        const ACTIVITY_EVENTS = ['click', 'mousedown', 'touchstart', 'keydown', 'scroll']; // Removido mousemove para evitar falso trigger si solo pasa el mouse
        ACTIVITY_EVENTS.forEach(evt => window.addEventListener(evt, tryAutoplay, { once: true }));

        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        
        return () => {
            ACTIVITY_EVENTS.forEach(evt => window.removeEventListener(evt, tryAutoplay));
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
        window.speechSynthesis.onvoiceschanged = updateVoices;
        updateVoices();
    }, []);

    const broadcastSchedule = [
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
        utt.rate = 0.95;
        utt.pitch = 1.0;
        utt.volume = 1.0;
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
                const tips = [
                    `VLS informa: Son las ${hours} con ${minutes}. Estás escuchando el bloque "${getCurrentShow()}".`,
                    `Relatos Soberanos: Acompaña a Sofia y Lucas en su próximo viaje por el Paseo Histórico 3D.`,
                    `Spot Publicitario VLS: Ven al Nuevo Peregrino, ese lugar especial de La Serena. Pub y restaurante con más de 20 años de tradición musical.`,
                    `Dato VLS: Sofia y Lucas nos recuerdan que la soberanía empieza en la educación de nuestros hijos.`,
                    `Faro News: El Arquitecto Invisible reporta una optimización del 40% en los nodos de seguridad comunal.`,
                    "Actualidad Local: Se confirma la mediación exitosa en el primer caso de Derechos Soberanos del mes.",
                    "Recomendación VLS: Si buscas un refugio de bohemia y buena mesa, visita El Nuevo Peregrino en Balmaceda 2936. Un cuarto de siglo de historias y música chilena nos respaldan.",
                    "Homenaje: Recordamos la melodía inconclusa de un gran maestro, un tesoro de nuestra memoria que hoy rescatamos en formato digital para todos los vecinos.",
                    "Próximamente: El Master Plan 2026 incluye un nuevo Teatro Regional. Apoyamos el arte local con producciones de la escena regional."
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
        return () => {
            window.removeEventListener('stop-all-audio', handleStopAudio);
            window.removeEventListener('vls-stop-radio', handleManualStop);
            window.removeEventListener('radio-duck', handleDuck);
            window.removeEventListener('radio-unduck', handleUnduck);
            window.removeEventListener('vls-set-volume', handleSetVolume);
        };
    }, [isPlaying, isDjTalking, volume]);

    useEffect(() => {
        if (audioRef.current && isPlaying) {
            setupStreamAndPlay();
        }
    }, [currentStation]);

    // ─── LÓGICA MEJORADA DE STREAM (admite Montecarlo directStreaming) ─────────
    const setupStreamAndPlay = () => {
        if (!audioRef.current) return;
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        
        let streamUrl = currentStation.stream;
        
        // isMain y directStreaming → sin proxy (conexión directa)
        // Todo lo demás → proxy para CORS
        const needsProxy = currentStation.type === 'radio' 
            && streamUrl.startsWith('http') 
            && !currentStation.isMain 
            && !currentStation.directStreaming;
        
        if (needsProxy) {
            streamUrl = `https://corsproxy.io/?url=${encodeURIComponent(currentStation.stream)}`;
        }

        audioRef.current.pause();
        audioRef.current.crossOrigin = 'anonymous'; // Requisito estricto para Web Audio API AnalyserNode
        audioRef.current.src = streamUrl;
        audioRef.current.load();
        
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                setIsPlaying(true);
                audioRef.current.volume = volume;
                if (audioContextRef.current) audioContextRef.current.resume();
                startVULoop();
            }).catch(e => {
                console.warn("VLS Audio: Stream error.", e);
                setIsPlaying(false);
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
                    const gain = (level - 50) * 0.6;
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
            
            // Connect the <audio> element to the audio graph!
            if (audioRef.current) {
                sourceRef.current = ctx.createMediaElementSource(audioRef.current);
            }

            analyserRef.current = ctx.createAnalyser();
            analyserRef.current.fftSize = 64;
            const frequencies = [60, 250, 1000, 4000, 12000];
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
            let avgL = 0, avgR = 0;
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
                    avgL = leftSum / half;
                    avgR = rightSum / half;
                    setSpectrumLevels(Array.from(dataArray.slice(0, 5)).map(v => (v / 255) * 100));
                }
            }
            let rotL, rotR;
            if (hasRealData) {
                rotL = -45 + (Math.min(255, avgL) / 255) * 90;
                rotR = -45 + (Math.min(255, avgR) / 255) * 90;
            } else {
                // Si reproduces pero no hay data real aún (ej. buffering o silencio absoluto)
                rotL = -45;
                rotR = -45;
                setSpectrumLevels([5, 5, 5, 5, 5]);
            }
            meterLevelsRef.current.left += (rotL - meterLevelsRef.current.left) * 0.25;
            meterLevelsRef.current.right += (rotR - meterLevelsRef.current.right) * 0.25;
            if (vuLeftRef.current) vuLeftRef.current.style.transform = `rotate(${meterLevelsRef.current.left}deg)`;
            if (vuRightRef.current) vuRightRef.current.style.transform = `rotate(${meterLevelsRef.current.right}deg)`;
            animationRef.current = requestAnimationFrame(updateMeters);
        };
        animationRef.current = requestAnimationFrame(updateMeters);
    };

    const handleEqChange = (index, val) => {
        const newEq = [...eqLevels];
        newEq[index] = val;
        setEqLevels(newEq);
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
        const timeMsg = `V L S Radio informa: La hora exacta es, las ${hours} con ${minutes} minutos. Comuna Smart, tecnología al servicio del vecino.`;
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
                    zIndex: 999999,
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
                zIndex: 999999, 
                display: isVisible ? 'flex' : 'none', 
                flexDirection: 'column', 
                gap: '8px', 
                alignItems: 'flex-end',
                pointerEvents: isVisible ? 'auto' : 'none'
            }}
        >

            <audio 
                ref={audioRef} 
                loop={!currentStation.isLive} 
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
                        <span>RADIO IA VECINOS LA SERENA: {djMessage}</span>
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
                    <div style={{ padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '12px', marginBottom: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <CloudSun size={24} color="#38bdf8" />
                                <span style={{ fontSize: '1.2rem', color: 'white', fontWeight: '900' }}>{weatherData?.temp || globalWeather?.temp || '17.4'}</span>
                            </div>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <button 
                                    onClick={playAIDJLocution}
                                    style={{ 
                                        background: 'linear-gradient(135deg, #ef4444 0%, #991b1b 100%)', 
                                        border: '1px solid rgba(255,255,255,0.2)', color: 'white', 
                                        padding: '8px 12px', borderRadius: '12px', fontSize: '0.85rem', 
                                        fontWeight: '900', fontFamily: 'monospace', cursor: 'pointer', 
                                        display: 'flex', flexDirection: 'column', alignItems: 'center', 
                                        justifyContent: 'center', minWidth: '85px', gap: '2px',
                                        boxShadow: '0 0 15px rgba(239, 68, 68, 0.4)'
                                    }}
                                >
                                    <div style={{ fontSize: '0.55rem', color: '#fecaca', opacity: 0.9, letterSpacing: '1px' }}>SEÑAL HORARIA</div>
                                    <div>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                </button>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '0.7rem', color: '#cbd5e1' }}>LA SERENA</div>
                                    <div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>{weatherData?.condition || 'Despejado'}</div>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '5px', marginBottom: '15px' }}>
                            <button onClick={() => setActiveMediaType('radio')} style={{ flex: 1, background: activeMediaType === 'radio' ? '#ef4444' : 'rgba(255,255,255,0.05)', border: 'none', color: 'white', padding: '8px 2px', borderRadius: '8px', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontWeight: 'bold', cursor: 'pointer' }}><Radio size={12} /> Radio</button>
                            <button onClick={() => setActiveMediaType('tv-fast')} style={{ flex: 1, background: activeMediaType === 'tv-fast' ? '#ef4444' : 'rgba(255,255,255,0.05)', border: 'none', color: 'white', padding: '8px 2px', borderRadius: '8px', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontWeight: 'bold', cursor: 'pointer' }}><Tv size={12} /> TV Libre</button>
                            <button onClick={() => setActiveMediaType('tv-premium')} style={{ flex: 1, background: activeMediaType === 'tv-premium' ? '#ef4444' : 'rgba(255,255,255,0.05)', border: 'none', color: 'white', padding: '8px 2px', borderRadius: '8px', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontWeight: 'bold', cursor: 'pointer' }}><Lock size={12} /> Premium</button>
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
                                    <iframe width="100%" height="100%" src={currentStation.stream} title={currentStation.name} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                                )}
                            </div>
                        )}

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
                            <span style={{ fontSize: '0.6rem', color: '#ef4444', fontWeight: '900', letterSpacing: '1px', textTransform: 'uppercase' }}>V L S {activeMediaType}</span>
                            {stations.filter(s => s.type === activeMediaType || (activeMediaType === 'tv-premium' && s.type === 'tv-fast')).map(st => (
                                <div key={st.id} onClick={() => { setCurrentStation(st); if (st.type === 'radio') setupStreamAndPlay(); }} style={{ padding: '10px 12px', borderRadius: '10px', cursor: 'pointer', background: currentStation.id === st.id ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255,255,255,0.03)', fontSize: '0.75rem', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: currentStation.id === st.id ? '1px solid #ef4444' : '1px solid transparent' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <span style={{ fontWeight: 'bold' }}>{st.name}</span>
                                            {st.sub === 'vls' && <span style={{ fontSize: '0.5rem', background: '#38bdf8', padding: '1px 3px', borderRadius: '3px' }}>PROPIA</span>}
                                        </div>
                                        <span style={{ fontSize: '0.6rem', color: '#94a3b8' }}>{st.desc}</span>
                                    </div>
                                    {st.isLive && <span style={{ fontSize: '0.55rem', background: '#ef4444', padding: '2px 5px', borderRadius: '4px' }}>LIVE</span>}
                                </div>
                            ))}
                        </div>

                        <div style={{ background: '#000', padding: '15px', borderRadius: '16px', marginBottom: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '15px' }}>
                                <AnalogVUMeter label="L" needleRef={vuLeftRef} />
                                <AnalogVUMeter label="R" needleRef={vuRightRef} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', height: '120px', padding: '0 10px' }}>
                                {spectrumLevels.map((l, i) => (
                                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                                        <div style={{ width: '12px', height: '80px', background: '#333', position: 'relative', borderRadius: '6px', cursor: 'ns-resize', overflow: 'hidden' }}
                                            onPointerDownCapture={(e) => e.stopPropagation()}
                                            onMouseDownCapture={(e) => e.stopPropagation()}
                                        >
                                            <div style={{ position: 'absolute', bottom: 0, width: '100%', height: `${eqLevels[i]}%`, background: 'rgba(255,255,255,0.05)', borderTop: '2px solid #64748b', zIndex: 1 }}
                                                onClick={(e) => {
                                                    const rect = e.currentTarget.parentElement.getBoundingClientRect();
                                                    const y = e.clientY - rect.top;
                                                    const val = 100 - (y / rect.height) * 100;
                                                    handleEqChange(i, Math.max(0, Math.min(100, val)));
                                                }}
                                            />
                                            <div style={{ position: 'absolute', bottom: 0, width: '100%', height: `${l}%`, background: '#ef4444', borderRadius: '2px', transition: 'height 0.05s', zIndex: 2, pointerEvents: 'none' }} />
                                            <div style={{ position: 'absolute', bottom: `calc(${eqLevels[i]}% - 4px)`, width: '100%', height: '4px', background: 'white', border: '1px solid #ef4444', borderRadius: '2px', zIndex: 3 }} />
                                        </div>
                                        <span style={{ fontSize: '0.55rem', color: '#94a3b8', fontWeight: 'bold' }}>{['60', '250', '1K', '4K', '12K'][i]}</span>
                                    </div>
                                ))}
                            </div>
                            <div style={{ textAlign: 'center', marginTop: '5px' }}>
                                <span style={{ fontSize: '0.6rem', color: '#ef4444', fontWeight: 'bold', letterSpacing: '2px' }}>VLS PROFESSIONAL EQ</span>
                            </div>
                        </div>

                        <div style={{ marginBottom: '20px', background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <span style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: '900', letterSpacing: '1px', display: 'block', marginBottom: '10px' }}>GRILLA PROGRAMÁTICA</span>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', maxHeight: '100px', overflowY: 'auto' }}>
                                {broadcastSchedule.map((s, idx) => (
                                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: getCurrentShow() === s.name ? '#ef4444' : '#94a3b8' }}>
                                        <span>{s.start} - {s.end}</span>
                                        <span style={{ fontWeight: getCurrentShow() === s.name ? 'bold' : 'normal' }}>{s.name}</span>
                                    </div>
                                ))}
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

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: isMobile ? '120px' : '160px' }}>
                        <Volume2 size={18} color={volume === 0 ? '#64748b' : '#ef4444'} />
                        <input 
                            type="range" min="0" max="1" step="0.005" value={volume} 
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            style={{ 
                                flex: 1, accentColor: '#ef4444', height: '8px', borderRadius: '10px',
                                outline: 'none', cursor: 'pointer',
                                background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${volume * 100}%, #1e293b ${volume * 100}%, #1e293b 100%)`,
                                appearance: 'none', WebkitAppearance: 'none'
                            }} 
                            className="vls-volume-slider"
                        />
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
