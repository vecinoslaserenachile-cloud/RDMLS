import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
    Home, Radio, Clock, CloudSun, Calendar, MessageCircle, Music, Info, MonitorPlay, Gamepad2, 
    Volume2, VolumeX, Maximize, ExternalLink, Download, Settings, FileText, GraduationCap, 
    Youtube, ChevronUp, ChevronDown, Activity, GripHorizontal, Globe, Play, Pause, RefreshCw, Zap
} from 'lucide-react';
import OldTVModal from '../../components/OldTVModal';
import VhsTVModal from '../../components/VhsTVModal';
import RetroArcadeLobby from '../../components/RetroArcadeLobby';
import RadioBackofficeModal from '../../components/RadioBackofficeModal';
import NewsDetailModal from '../../components/NewsDetailModal';
import { useNavigate, useLocation } from 'react-router-dom';
import VLSInduccion from '../VLSInduccion';
import Induccion25 from '../Induccion25';
import Aprende from '../Aprende';

const VUMeter = ({ label, needleRef }) => (
    <div style={{
        width: '80px', height: '60px', background: '#f5f5dc', borderRadius: '4px',
        border: '3px solid #111', position: 'relative', overflow: 'hidden',
        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.6)', display: 'flex', flexDirection: 'column', alignItems: 'center'
    }}>
        <svg viewBox="0 0 100 60" style={{ width: '100%', marginTop: '5px' }}>
            <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#333" strokeWidth="2" />
            <path d="M 70 50 A 40 40 0 0 1 90 50" fill="none" stroke="#e63946" strokeWidth="3" />
            {[...Array(9)].map((_, i) => {
                const angle = Math.PI - i * (Math.PI / 8);
                const x1 = 50 + 35 * Math.cos(angle);
                const y1 = 50 - 35 * Math.sin(angle);
                const x2 = 50 + 42 * Math.cos(angle);
                const y2 = 50 - 42 * Math.sin(angle);
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={i > 6 ? '#e63946' : '#333'} strokeWidth={i % 4 === 0 ? "2" : "1"} />
            })}
        </svg>
        
        <div 
            ref={needleRef}
            style={{ 
                position: 'absolute', bottom: '-2px', left: '50%', width: '2px', height: '45px', 
                background: 'linear-gradient(90deg, #555, #111, #555)', marginLeft: '-1px', 
                transformOrigin: 'bottom center', transform: 'rotate(-45deg)', transition: 'transform 0.05s ease-out',
                boxShadow: '2px 0 3px rgba(0,0,0,0.4)', pointerEvents: 'none', zIndex: 5
            }}
        />
        
        <div style={{ position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)', width: '20px', height: '20px', borderRadius: '50%', background: 'radial-gradient(circle, #aaa, #333)', border: '2px solid #111', zIndex: 6, boxShadow: '0 0 5px rgba(0,0,0,0.5)' }}></div>
        <div style={{ position: 'absolute', bottom: '10px', right: '5px', fontSize: '0.45rem', fontWeight: 'bold', color: '#111', fontFamily: 'monospace' }}>VU</div>
        <div style={{ position: 'absolute', bottom: '10px', left: '5px', fontSize: '0.55rem', fontWeight: 'bold', color: '#111', fontFamily: 'monospace' }}>{label}</div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 40%, rgba(0,0,0,0.05) 100%)', pointerEvents: 'none', zIndex: 10 }}></div>
    </div>
);

export default function CentroRadio({ isDevMode = false }) {
    const navigate = useNavigate();
    const location = useLocation();
    
    // EMERGENCY BYPASS: If mode=aprende is in URL, override everything and show the portal
    const queryParams = new URLSearchParams(location.search);
    const mode = queryParams.get('mode');
    

    const [weather, setWeather] = useState(null);
    const [time, setTime] = useState(new Date());
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.8);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef(null);
    const canvasRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const sourceRef = useRef(null);
    const filtersRef = useRef(null);
    const gainNodeRef = useRef(null);
    const animationRef = useRef(null);
    const vuLeftRef = useRef(null);
    const vuRightRef = useRef(null);
    const isMobile = window.innerWidth < 1024;
    const isVLS = false; // Forza false para mantener compatibilidad con codigo viejo si quedó algo
    const isRDMLS = true; // Hardcoded ya que esta app solo corre aca


    useEffect(() => {
        // resize listener handled in css
    }, []);

    // ── Título de pestaña y favicon dinámico según dominio ──
    useEffect(() => {
        const updateFavicon = (href) => {
            const icons = document.querySelectorAll("link[rel*='icon']");
            icons.forEach(icon => icon.href = href);
        };

        if (!isVLS) {
            document.title = 'RDMLS · Radio Digital Municipal · I. Municipalidad de La Serena';
            updateFavicon('/rdmls_favicon.png');
        } else {
            document.title = 'vecinoslaserena.cl';
            updateFavicon('/vls-crystal-icon.svg');
        }

        return () => {
            document.title = 'vecinoslaserena.cl';
            updateFavicon('/vls-crystal-icon.svg');
        };
    }, [isVLS]);
    
    // ── CONFIGURACIÓN DE SEÑALES (Soberanía Digital RDMLS) ──────────────────
    // Se utiliza redundancia de endpoints para asegurar la escucha continua.
    const RDMLS_MAIN_STREAM = 'https://az11.yesstreaming.net:8590/radio.mp3';
    const RDMLS_FALLBACK_STREAM = 'https://az11.yesstreaming.net/listen/rdmls/radio.mp3';
    
    const [streamUrl, setStreamUrl] = useState(RDMLS_MAIN_STREAM);
    const [streamError, setStreamError] = useState(false);

    const handleStreamError = () => {
        if (streamUrl === RDMLS_MAIN_STREAM) {
            console.warn("[RDMLS] Señal principal falló, activando redundancia...");
            setStreamUrl(RDMLS_FALLBACK_STREAM);
        } else {
            console.error("[RDMLS] Error crítico en todas las señales.");
            setStreamError(true);
        }
    };
    // ──────────────────────────────────────────────────────────────────────────
    
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [djImageError, setDjImageError] = useState(false);
    const [showArcade, setShowArcade] = useState(false);
    const [msgIndex, setMsgIndex] = useState(0);
    const [eqMode, setEqMode] = useState('90s'); // flat, claro, oscuro, 90s (90s default for punch)
    const [is24h, setIs24h] = useState(() => localStorage.getItem('vls_time_format') === '24h');
    const [showAdmin, setShowAdmin] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);

    const onAirMessages = [
        "EN VIVO", "TRANSMITIENDO", "ONLINE", "ON AIR", "SONANDO",
        "CONNECTÉ", "DIFFUSION", "EMITINDO", "AO VIVO", "LIVE NOW"
    ];

    const CONCEJO_ARCHIVE = [
        {
            id: 'track_01',
            title: "Concejo Comunal La Serena",
            date: "19 de noviembre de 2025",
            points: [
                "Inicio de la sesión ordinaria número 1416 y modificaciones en la tabla",
                "Discusión técnica y legal sobre la Ley 21.411 para el cierre de pasajes (Marcial Martínez)"
            ],
            duration: "45:12"
        },
        {
            id: 'track_02',
            title: "Concejo Comunal La Serena",
            date: "04 de junio de 2025",
            points: [
                "Presentación del Plan Invierno 2025: Limpieza de sumideros en Las Compañías",
                "Convenio 40ª Feria del Libro: Suplemento de 35 millones de pesos"
            ],
            duration: "38:45"
        },
        {
            id: 'track_03',
            title: "Concejo Comunal La Serena",
            date: "05 de marzo de 2025",
            points: [
                "Transferencia Pro-Empleo: 825 millones para áreas verdes y aseo",
                "Adjudicación Proyecto 'Pórtico Seguro': Barrio El Romeral"
            ],
            duration: "52:10"
        },
        {
            id: 'track_04',
            title: "Concejo Comunal La Serena",
            date: "07 de mayo de 2025",
            points: [
                "Exposición 'Punto Cultura Comunitaria' y actualización Plan de Cultura",
                "Ordenanza Municipal: Retiro de cables aéreos en desuso en el Casco Histórico"
            ],
            duration: "41:30"
        },
        {
            id: 'track_05',
            title: "Concejo Comunal La Serena",
            date: "10 de diciembre de 2025",
            points: [
                "Convenio GORE: Adquisición de camiones y equipos de mantenimiento",
                "Reposición vehículos traslado pacientes diálisis (206 millones)",
                "Adjudicación 'Quiero mi Barrio': Área verde Colo Colo (La Antena)"
            ],
            duration: "58:00"
        },
        {
            id: 'track_06',
            title: "Cuenta Pública La Serena",
            date: "Gestión 2024",
            points: [
                "Rendición en Aula Magna ULS - Gestión 2024 completa",
                "Ejecución 'Plan Serena Mayor': Atenciones domiciliarias integrales"
            ],
            duration: "1:15:20"
        },
        {
            id: 'track_07',
            title: "Desfile 481 Aniversario",
            date: "26 de agosto de 2025",
            points: [
                "Anuncio recuperación: Parque Pedro de Valdivia, Coll y La Recoba",
                "Medalla Ciudad de La Serena a ciudadanos destacados"
            ],
            duration: "2:05:00"
        }
    ];

    const [selectedCouncilTrack, setSelectedCouncilTrack] = useState(CONCEJO_ARCHIVE[0]);

    const radioStations = [
        { 
            id: 'municipal',
            name: 'RADIO MUNICIPAL 100.1 FM (Simulcast)',
            dialLabel: 'RDMLS',
            slogan: 'LLEGASTE AL PULSO OFICIAL DE LA CIUDAD', 
            url: RDMLS_MAIN_STREAM, 
            color: '#f97316',
            logo: '/escudo.png',
            badge: 'RDMLS'
        },
        ...(isDevMode ? [
             { 
                id: 'tv-concejo',
                name: 'TV CONCEJO MUNICIPAL (Live)',
                dialLabel: 'TV_CONCEJO',
                slogan: 'TRANSMISIÓN EN VIVO - SESIÓN CONCEJO MUNICIPAL', 
                url: "https://www.youtube.com/embed/live_stream?channel=UCvly2C2WzVvL5G_P9sA3Tig", 
                color: '#ef4444',
                badge: 'TV CONCEJO',
                isVideo: true
            },
            { 
                id: 'audio-concejo',
                name: 'ARCHIVO CONCEJO (On-Demand)',
                dialLabel: 'CONCEJO',
                slogan: 'DIFUSIÓN SESIÓN PROCESADA - BROADCAST STANDARD', 
                url: null, 
                color: '#6366f1',
                badge: 'AUDIO',
                isPlaylist: true
            }
        ] : []),
        ...(isVLS ? [
            { 
               id: 'vls',
               name: 'VLS RADIO COMUNITARIA (Main)',
               dialLabel: 'VLS_RADIO',
               slogan: 'EL PULSO CIUDADANO DE LA SERENA', 
               url: atob('aHR0cHM6Ly9hejExLnllc3N0cmVhbWluZy5uZXQ6ODYzMC9yYWRpby5tcDM='), 
               color: '#0ea5e9',
               badge: 'VLS'
           }
       ] : [])
    ];

    const [currentStation, setCurrentStation] = useState(radioStations[0]);

    // Handle station change by knob or buttons
    // weather fetch removed from here (handled below with correct temp extraction)

    const changeStation = (station) => {
        if (!station || station.id === currentStation?.id) return;
        setCurrentStation(station);
        if (!station.isVideo) {
            setStreamUrl(station.url);
        } else {
            setStreamUrl(""); // No audio stream for videos
        }
        setIsPlaying(false);
        // Play click sound
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.frequency.setValueAtTime(150, ctx.currentTime);
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.1);
        } catch(e) {}
    };

    // Selection of 3 featured games
    const [featuredGames, setFeaturedGames] = useState(() => {
        const saved = localStorage.getItem('rdmls_featured_games');
        return saved ? JSON.parse(saved) : ['rubik', 'pinball', 'elevator'];
    });

    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(() => {
                setMsgIndex(prev => (prev + 1) % onAirMessages.length);
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [isPlaying]);


    // Equalizer Visualizer & Filter Update Logic
    useEffect(() => {
        if (!canvasRef.current) return;

        let cancel = false;
        
        // Update Filters only if context is initialized
        if (filtersRef.current) {
            const { low, mid, high } = filtersRef.current;
            if (eqMode === 'flat') {
                low.gain.value = 0; mid.gain.value = 0; high.gain.value = 0;
            } else if (eqMode === 'claro') {
                low.gain.value = -4; mid.gain.value = 4; high.gain.value = 7;
            } else if (eqMode === 'oscuro') {
                low.gain.value = 8; mid.gain.value = -3; high.gain.value = -5;
            } else if (eqMode === '90s') {
                low.gain.value = 6; mid.gain.value = -5; high.gain.value = 6;
            }
        }

        const draw = () => {
            if (cancel || !isPlaying) return;
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            const analyser = analyserRef.current;
            if (!ctx || !analyser) return;

            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            analyser.getByteFrequencyData(dataArray);

            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const barWidth = (canvas.width / bufferLength) * 2.5;
            let barHeight;
            let x = 0;
            let sumL = 0;
            let sumR = 0;
            const halfBuffer = Math.floor(bufferLength / 2);

            for (let i = 0; i < bufferLength; i++) {
                if (i < halfBuffer) sumL += dataArray[i];
                else sumR += dataArray[i];

                barHeight = dataArray[i] / 1.5;
                const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
                gradient.addColorStop(0, '#B45309');
                gradient.addColorStop(1, '#FFD700');
                
                ctx.fillStyle = gradient;
                
                // Draw Bars
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                
                // Draw Circles/Shapes for more "Dynamic" feel
                if (i % 4 === 0) {
                    ctx.beginPath();
                    ctx.arc(x + barWidth / 2, canvas.height - barHeight - 10, barWidth / 2, 0, Math.PI * 2);
                    ctx.fill();
                }
                
                // Floating particles
                if (Math.random() > 0.95) {
                    ctx.beginPath();
                    ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
                    ctx.fill();
                }

                x += barWidth + 2;
            }

            const avgL = sumL / halfBuffer;
            const avgR = sumR / halfBuffer;
            
            if (vuLeftRef.current && vuRightRef.current) {
                let rotL = -45 + (avgL / 180) * 90;
                let rotR = -45 + (avgR / 180) * 90;
                if (rotL > 45) rotL = 45; if (rotL < -45) rotL = -45;
                if (rotR > 45) rotR = 45; if (rotR < -45) rotR = -45;
                
                vuLeftRef.current.style.transform = `rotate(${rotL}deg)`;
                vuRightRef.current.style.transform = `rotate(${rotR}deg)`;
            }

            animationRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancel = true;
            cancelAnimationFrame(animationRef.current);
        };
    }, [isPlaying, eqMode]);

    useEffect(() => {
        fetch('/AdminConfig.json')
            .then(r => r.json())
            .then(cfg => {
                // NOTE: radioStreamUrl in AdminConfig is IGNORED for RDMLS portal.
                // Stream is always enforced to the official 8590 port.
                // if (cfg.radioStreamUrl) setStreamUrl(cfg.radioStreamUrl);
            })
            .catch(() => {});
        
        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };
        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstall = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                setDeferredPrompt(null);
            }
        } else {
            alert('Para instalar la App RDMLS: Toca el ícono de opciones de tu navegador web y selecciona "Añadir a la pantalla de inicio" o "Instalar App".');
        }
    };

    // Modales compartidos
    const [showRetroTV, setShowRetroTV] = useState(false);
    const [showVhsTV, setShowVhsTV] = useState(false);

    // Weather & Time fetch
    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);

        const fetchWeather = () => {
            fetch('https://api.open-meteo.com/v1/forecast?latitude=-29.9027&longitude=-71.2520&current=temperature_2m,weathercode&timezone=America%2FSantiago')
                .then(res => res.json())
                .then(data => {
                    if (data?.current) setWeather(data.current.temperature_2m);
                })
                .catch(err => console.error(err));
        };
        fetchWeather();
        const weatherTimer = setInterval(fetchWeather, 300000);

        window.dispatchEvent(new CustomEvent('mute_global_radio'));
        
        return () => { 
            clearInterval(timer); 
            clearInterval(weatherTimer); 
            if (window.backupAudio) {
                window.backupAudio.pause();
                window.backupAudio.removeAttribute('src');
                window.backupAudio.load();
                window.backupAudio = null;
            }
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.removeAttribute('src');
                audioRef.current.load();
            }
            if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
                audioContextRef.current.close().catch(e => console.error("Error cerrando AudioContext", e));
            }
        };
    }, []);

    // ── Sincronizar volumen y mute sobre el elemento de audio ──
    const syncAudioVolume = () => {
        if (!audioRef.current) return;
        const vol = isMuted ? 0 : volume;
        audioRef.current.volume = vol;
        audioRef.current.muted = isMuted;
        // Si hay GainNode Web Audio activo, también actualizar ahí
        if (gainNodeRef.current && audioContextRef.current && audioContextRef.current.state !== 'closed') {
            try {
                gainNodeRef.current.gain.setTargetAtTime(vol, audioContextRef.current.currentTime, 0.05);
            } catch (e) { /* context may not be ready yet */ }
        }
    };

    useEffect(() => {
        syncAudioVolume();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [volume, isMuted]);

    // Cuando cambia la estación (streamUrl), actualizar el src pero NO auto-reproducir
    useEffect(() => {
        if (!audioRef.current) return;
        audioRef.current.src = streamUrl;
        audioRef.current.load();
        if (isPlaying && streamUrl) {
            audioRef.current.play()
                .then(() => { setIsPlaying(true); syncAudioVolume(); })
                .catch(() => setIsPlaying(false));
        } else {
            audioRef.current.pause();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [streamUrl, isPlaying]);

    // initAudioContext — incluye cadena EQ completa desde el inicio
    const initAudioContext = () => {
        if (!audioContextRef.current) {
            try {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                audioContextRef.current = new AudioContext();

                // Crear filtros EQ
                const ctx = audioContextRef.current;
                const low = ctx.createBiquadFilter();
                low.type = 'lowshelf';
                low.frequency.value = 320;

                const mid = ctx.createBiquadFilter();
                mid.type = 'peaking';
                mid.frequency.value = 1000;
                mid.Q.value = 0.7;

                const high = ctx.createBiquadFilter();
                high.type = 'highshelf';
                high.frequency.value = 3200;

                // Aplicar preset inicial
                const applyEQ = (mode) => {
                    if (mode === 'flat')   { low.gain.value = 0;  mid.gain.value = 0;  high.gain.value = 0; }
                    if (mode === 'claro')  { low.gain.value = -4; mid.gain.value = 4;  high.gain.value = 7; }
                    if (mode === 'oscuro') { low.gain.value = 8;  mid.gain.value = -3; high.gain.value = -5; }
                    if (mode === '90s')    { low.gain.value = 6;  mid.gain.value = -5; high.gain.value = 6; }
                };
                applyEQ(eqMode);
                filtersRef.current = { low, mid, high };

                // Crear GainNode para volumen Maestro (Mute robusto)
                gainNodeRef.current = ctx.createGain();
                gainNodeRef.current.gain.value = isMuted ? 0 : volume;

                // Crear analyser
                analyserRef.current = ctx.createAnalyser();
                analyserRef.current.fftSize = 64;

                // Re-enable real MediaElementSource chain for EQ + VU meter.
                // Use crossOrigin="anonymous" on the <audio> element.
                if (audioRef.current && !sourceRef.current) {
                    try {
                        const source = ctx.createMediaElementSource(audioRef.current);
                        source.connect(low);
                        low.connect(mid);
                        mid.connect(high);
                        high.connect(gainNodeRef.current);
                        gainNodeRef.current.connect(analyserRef.current);
                        analyserRef.current.connect(ctx.destination);
                        sourceRef.current = source;
                    } catch (corsErr) {
                        console.warn('MediaElementSource CORS blocked — falling back to bypass:', corsErr);
                        // Fallback: connect analyser directly to destination (no EQ, no VU data)
                        analyserRef.current.connect(ctx.destination);
                        sourceRef.current = true;
                    }
                }
            } catch (e) {
                console.error("Error al inicializar AudioContext:", e);
            }
        }
        if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }
    };


    // ── Toggle Play / Pause ──
    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) {
            console.warn('audioRef no está disponible');
            return;
        }

        // Inicializar / reanudar Web Audio Context en click de usuario
        initAudioContext();

        if (isPlaying) {
            // PARAR
            audio.pause();
            audio.currentTime = 0;
            setIsPlaying(false);
        } else {
            // REPRODUCIR
            if (currentStation.isVideo) {
                setIsPlaying(true);
                return;
            }

            audio.src = streamUrl;
            audio.load();
            syncAudioVolume(); // Aplicar volumen/mute antes de reproducir
            const p = audio.play();
            if (p !== undefined) {
                p.then(() => {
                    setIsPlaying(true);
                    syncAudioVolume();
                }).catch(err => {
                    console.warn('Play bloqueado por el navegador:', err);
                    setIsPlaying(false);
                });
            } else {
                setIsPlaying(true);
            }
        }
    };

    // ── Toggle Mute ──
    const toggleMute = () => {
        setIsMuted(prev => {
            const next = !prev;
            if (audioRef.current) {
                audioRef.current.muted = next;
                audioRef.current.volume = next ? 0 : volume;
            }
            if (gainNodeRef.current && audioContextRef.current && audioContextRef.current.state !== 'closed') {
                try {
                    gainNodeRef.current.gain.setTargetAtTime(
                        next ? 0 : volume,
                        audioContextRef.current.currentTime,
                        0.05
                    );
                } catch (e) { /* ignore */ }
            }
            return next;
        });
    };

    // Listener global de interaccion para moviles
    useEffect(() => {
        const unlockAudio = () => {
            initAudioContext();
            document.removeEventListener('click', unlockAudio);
            document.removeEventListener('touchstart', unlockAudio);
        };
        document.addEventListener('click', unlockAudio);
        document.addEventListener('touchstart', unlockAudio);
    }, []);

    const [newsItems, setNewsItems] = useState([]);
    const [newsLoading, setNewsLoading] = useState(true);

    // Fetch real news from laserena.cl RSS
    useEffect(() => {
        const fetchRealNews = async () => {
            setNewsLoading(true);
            try {
                // rss2json convierte cualquier RSS a JSON sin CORS
                const rssUrl = encodeURIComponent('https://www.laserena.cl/feed/');
                const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}&api_key=qrpejuncoexwfqklhxnolxjegvdtmvxrxlrblcpj&count=8`);
                const data = await res.json();
                if (data.status === 'ok' && data.items?.length > 0) {
                    const mapped = data.items.map((item, i) => ({
                        id: i,
                        title: item.title,
                        category: (item.categories?.[0] || 'MUNICIPAL').toUpperCase(),
                        date: new Date(item.pubDate).toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' }),
                        content: item.description?.replace(/<[^>]+>/g, '').substring(0, 200) + '...',
                        imageUrl: item.enclosure?.link || item.thumbnail || null,
                        link: item.link
                    }));
                    setNewsItems(mapped);
                } else {
                    throw new Error('No items');
                }
            } catch (e) {
                // Fallback: fetch directo con proxy CORS abierto
                try {
                    const res2 = await fetch(`https://corsproxy.io/?${encodeURIComponent('https://www.laserena.cl/feed/')}`);
                    const text = await res2.text();
                    const parser = new DOMParser();
                    const xml = parser.parseFromString(text, 'text/xml');
                    const items = Array.from(xml.querySelectorAll('item')).slice(0, 8);
                    const mapped = items.map((item, i) => {
                        const img = item.querySelector('enclosure')?.getAttribute('url') ||
                            item.querySelector('content\\:encoded, encoded')?.textContent?.match(/src="([^"]+\.(jpg|jpeg|png|webp))"/)?.[1] || null;
                        return {
                            id: i,
                            title: item.querySelector('title')?.textContent || '',
                            category: item.querySelector('category')?.textContent?.toUpperCase() || 'MUNICIPAL',
                            date: new Date(item.querySelector('pubDate')?.textContent).toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' }),
                            content: item.querySelector('description')?.textContent?.replace(/<[^>]+>/g, '').substring(0, 200) + '...',
                            imageUrl: img,
                            link: item.querySelector('link')?.textContent || 'https://www.laserena.cl/noticias'
                        };
                    });
                    if (mapped.length > 0) setNewsItems(mapped);
                    else throw new Error('empty');
                } catch {
                    // Último fallback — noticias de muestra
                    setNewsItems([
                        { id: 1, title: 'Municipio de La Serena anuncia nuevos proyectos para el 2026', category: 'MUNICIPAL', date: '17 Mar 2026', content: 'La Ilustre Municipalidad de La Serena continúa avanzando en su plan de modernización...', imageUrl: null, link: 'https://www.laserena.cl/noticias' },
                        { id: 2, title: 'Operativo de limpieza en el casco histórico este fin de semana', category: 'OBRAS', date: '16 Mar 2026', content: 'Equipos municipales realizarán trabajos de mantención en la zona central...', imageUrl: null, link: 'https://www.laserena.cl/noticias' },
                        { id: 3, title: isVLS ? 'VLS Radio lanza nueva programación comunitaria' : 'RDMLS Radio Digital lanza nueva programación cultural', category: 'CULTURA', date: '15 Mar 2026', content: isVLS ? 'El portal de vecinos amplía su oferta de contenidos para el barrio...' : 'La Radio Digital Municipal de La Serena amplía su oferta de contenidos...', imageUrl: null, link: isVLS ? 'https://www.vecinoslaserena.cl' : 'https://www.laserena.cl/noticias' },
                        { id: 4, title: 'Feria del Libro en Plaza de Armas este mes de marzo', category: 'CULTURA', date: '14 Mar 2026', content: 'El evento contará con más de 50 editoriales nacionales e internacionales...', imageUrl: null, link: 'https://www.laserena.cl/noticias' },
                    ]);
                }
            } finally {
                setNewsLoading(false);
            }
        };
        fetchRealNews();
        // Refrescar cada 15 minutos
        const interval = setInterval(fetchRealNews, 15 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);



    const [marquees, setMarquees] = useState(() => {
        try {
            const stored = JSON.parse(localStorage.getItem('rdmls_marquees'));
            return (stored && Array.isArray(stored) && stored.length > 0) ? stored : [
                { id: 1, text: "📻 ESTÁS ESCUCHANDO RDMLS DIGITAL - LA RADIO DIGITAL DE LA SERENA" },
                { id: 2, text: "⚠️ AVISO DE UTILIDAD PÚBLICA: Cierre de calles en el centro histórico mañana por trabajos viales." },
                { id: 3, text: "☎️ NÚMERO DE EMERGENCIA MUNICIPAL: 1420 - OPERATIVO 24/7" }
            ];
        } catch(e) {
            return [
                { id: 1, text: "📻 ESTÁS ESCUCHANDO RDMLS DIGITAL - LA SEÑAL SIEMPRE CONECTADA DE LA SERENA" },
                { id: 2, text: "⚠️ AVISO DE UTILIDAD PÚBLICA: Cierre de calles en el centro histórico mañana por trabajos viales." },
                { id: 3, text: "☎️ NÚMERO DE EMERGENCIA MUNICIPAL: 1420 - OPERATIVO 24/7" }
            ];
        }
    });

    useEffect(() => {
        const handleStorage = () => {
            try {
                // Prioritize official news from PrensaTab (Hub Dashboard News)
                const officialNewsStr = localStorage.getItem('laserena_official_news');
                if (officialNewsStr) {
                    const officialNews = JSON.parse(officialNewsStr);
                    if (Array.isArray(officialNews) && officialNews.length > 0) {
                        // Map official news to the newsItems format expected by the UI
                        const mapped = officialNews.map(n => ({
                            id: n.id,
                            title: n.title,
                            category: n.category,
                            date: n.date,
                            content: n.body || n.desc,
                            imageUrl: n.imageUrl || null
                        }));
                        setNewsItems(mapped);
                    }
                } else {
                    const snStr = localStorage.getItem('rdmls_news');
                    if (snStr) {
                        const sn = JSON.parse(snStr);
                        if (sn && sn.length > 0) setNewsItems(sn);
                    }
                }

                const smStr = localStorage.getItem('rdmls_marquees');
                if (smStr) {
                    const sm = JSON.parse(smStr);
                    if (sm && sm.length > 0) setMarquees(sm);
                }
            } catch (e) {
                console.error("Error sync RDMLS Storage:", e);
            }
        };
        const handleOpenAdmin = () => setShowAdmin(true);

        handleStorage(); // Initial sync
        window.addEventListener('storage', handleStorage);
        window.addEventListener('open-admin', handleOpenAdmin);

        return () => {
            window.removeEventListener('storage', handleStorage);
            window.removeEventListener('open-admin', handleOpenAdmin);
        };
    }, []);

    // --- BYPASS RENDER AFTER ALL HOOKS ---
    const isInduccionPath = location.pathname.toLowerCase().includes('/imls/induccion') || location.pathname.toLowerCase().includes('/induccion');
    if (mode === 'aprende' || mode === 'induccion' || isInduccionPath) {
        return <Aprende isRDMLS={isRDMLS} />;
    }

    return (
        <div style={{
            minHeight: '100vh',
            width: '100%',
            maxWidth: '100%',
            overflowX: 'hidden',
            background: '#8B1D19',
            backgroundImage: 'radial-gradient(circle at center, #A6231E 0%, #681512 100%)',
            color: 'white',
            fontFamily: "'Segoe UI', Roboto, sans-serif",
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
        }}>
            {/* ELEMENTO AUDIO OCULTO — ancla del audioRef */}
            <audio 
                ref={audioRef}
                src={streamUrl} 
                onError={handleStreamError}
                autoPlay
                crossOrigin="anonymous"
                style={{ display: 'none' }}
            />

            {/* HEADER INSTITUCIONAL RDMLS */}
            <header style={{
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(15px)',
                padding: isMobile ? '1rem' : '1.5rem 2rem',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                textAlign: isMobile ? 'center' : 'left',
                gap: '1.5rem',
                borderBottom: '3px solid #FFD700',
                zIndex: 100
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{
                        background: 'radial-gradient(circle at center, #222 0%, #000 100%)', 
                        padding: '0.8rem', 
                        borderRadius: '50%',
                        boxShadow: `0 10px 30px rgba(0,0,0,0.8), 0 0 20px ${currentStation.color}44`,
                        border: `2px solid ${currentStation.color}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '80px',
                        height: '80px',
                        overflow: 'hidden',
                        position: 'relative'
                    }}>
                        <img src={isVLS ? "/logo_vls.png" : "/escudo.png"} alt={isVLS ? "VLS Logo" : "RDMLS Logo"} style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 0 5px gold)' }} />
                        <div className="pulse-fast" style={{ position: 'absolute', inset: 0, border: '2px solid gold', borderRadius: '50%', opacity: 0.3 }}></div>
                    </div>
                    <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
                        <h1 style={{ margin: 0, fontSize: isMobile ? '1.2rem' : '1.8rem', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: isMobile ? 'center' : 'flex-start', gap: '0.8rem', color: '#FFD700', textShadow: '0 0 10px rgba(255,215,0,0.3)' }}>
                            {isVLS ? 'VLS RADIO COMUNITARIA' : 'RDMLS RADIO DIGITAL'}
                        </h1>
                        <p style={{ margin: 0, color: 'white', opacity: 0.8, fontSize: isMobile ? '0.7rem' : '0.85rem', fontWeight: 'bold', letterSpacing: '1px' }}>
                            {isVLS ? 'VECINOS SMART - LA SERENA 2026' : 'MUNICIPAL DE LA SERENA - IMLS 2026'}
                        </p>
                    </div>
                </div>

                {/* Solo dejamos links oficiales de Noticias y Contacto */}
                <div style={{ display: 'flex', gap: '1.5rem', background: 'rgba(0,0,0,0.3)', padding: '0.8rem 1.5rem', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <a href="https://www.laserena.cl/noticias" target="_blank" rel="noopener noreferrer" style={{ color: '#FFD700', fontSize: '0.75rem', fontWeight: '900', textDecoration: 'none', letterSpacing: '1px' }}>NOTICIAS @ LASERENA.CL</a>
                    <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
                    <a href="mailto:radio@laserena.cl" style={{ color: '#FFD700', fontSize: '0.75rem', fontWeight: '900', textDecoration: 'none', letterSpacing: '1px' }}>RADIO@LASERENA.CL</a>
                </div>
            </header>

            {/* SEQUENTIAL MAIN CONTENT - FLOW AS REQUESTED */}
            <main style={{ 
                flex: 1, 
                display: 'flex',
                flexDirection: 'column',
                gap: '2.5rem',
                padding: isMobile ? '1rem' : '2.5rem', 
                maxWidth: '1200px',
                margin: '0 auto',
                width: '100%',
                boxSizing: 'border-box'
            }}>


                {/* 1. SECCIÓN RELOJ (HORA SERENA) & MARQUEE INICIAL */}
                <section id="clock-section" style={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center', 
                    gap: '1rem',
                    width: '100%',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    paddingBottom: '1.5rem'
                }}>
                    <div className="glass-panel" style={{ 
                        padding: '1.5rem 3rem',
                        borderRadius: '50px',
                        background: 'rgba(0,0,0,0.4)',
                        border: '2px solid #FFD700',
                        boxShadow: '0 0 30px rgba(255,215,0,0.2)',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#FFD700', letterSpacing: '3px', marginBottom: '0.5rem' }}>HORASERENA de rdmls.cl</div>
                        <div style={{ fontSize: isMobile ? '3rem' : '4.5rem', fontWeight: '900', fontFamily: 'monospace', color: 'white', textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>
                            {time.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </div>
                        <div style={{ fontSize: '1rem', opacity: 0.8, fontWeight: 'bold', marginTop: '0.5rem', textTransform: 'uppercase' }}>
                            {time.toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                    </div>
                    

                    {/* MARQUEE DINÁMICO */}
                    <div style={{ 
                        width: '100%', 
                        background: '#000', 
                        height: '35px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        overflow: 'hidden',
                        borderRadius: '8px',
                        border: '1px solid #333'
                    }}>
                        <div style={{ 
                            background: '#FFD700', 
                            color: '#000', 
                            height: '100%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            padding: '0 1rem', 
                            fontSize: '0.7rem', 
                            fontWeight: '900',
                            zIndex: 2,
                            whiteSpace: 'nowrap'
                        }}>
                            INFO RDMLS
                        </div>
                        <div style={{ flex: 1, whiteSpace: 'nowrap', position: 'relative' }}>
                            <div style={{ 
                                display: 'inline-block', 
                                whiteSpace: 'nowrap', 
                                animation: 'marquee 40s linear infinite',
                                color: '#00ff41',
                                fontSize: '0.85rem',
                                fontFamily: 'monospace',
                                fontWeight: 'bold',
                                paddingLeft: '100%'
                            }}>
                                {marquees.map(m => m.text).join('  ///  ')}
                            </div>
                        </div>
                    </div>
                </section>
                <section id="radio-section" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <div style={{ width: '100%', maxWidth: '680px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>

                        {/* Selector de Estaciones */}
                        <div style={{ display: 'flex', gap: '0.5rem', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {radioStations.map(s => (
                                <button key={s.id} onClick={() => changeStation(s)} style={{
                                    flex: '1 1 110px',
                                    padding: '0.7rem 0.4rem',
                                    background: currentStation.id === s.id ? s.color : 'rgba(0,0,0,0.6)',
                                    color: currentStation.id === s.id ? 'black' : 'white',
                                    border: `2px solid ${s.color}`,
                                    borderRadius: '12px',
                                    fontSize: '0.7rem',
                                    fontWeight: '900',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '3px',
                                    boxShadow: currentStation.id === s.id ? `0 0 20px ${s.color}88` : 'none'
                                }}>
                                    <span style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{s.badge === 'OFICIAL' ? '⚡' : s.badge === 'TV CONCEJO' ? '📺' : '📻'}</span>
                                    <span style={{ letterSpacing: '1px' }}>{s.dialLabel}</span>
                                </button>
                            ))}
                        </div>

                        {/* Consola Radio Retro-Digital */}
                        <div className="radio-console-body" style={{
                            width: '100%',
                            background: 'linear-gradient(180deg, #2a2a2a 0%, #0a0a0a 100%)',
                            padding: isMobile ? '1.2rem' : '2rem',
                            borderRadius: '30px',
                            border: `6px solid ${currentStation.color}33`,
                            boxShadow: `0 30px 80px rgba(0,0,0,0.95), inset 0 0 30px rgba(255,255,255,0.02), 0 0 40px ${currentStation.color}11`,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem',
                            transition: 'border 0.5s ease, box-shadow 0.5s ease'
                        }}>

                            {/* Dial de Frecuencia */}
                            <div className="radio-dial-glass" style={{
                                background: '#050505',
                                height: '120px',
                                borderRadius: '12px',
                                border: '6px solid #1a1a1a',
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: 'inset 0 0 60px rgba(0,0,0,0.95), 0 0 15px rgba(255,215,0,0.15)'
                            }}>
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(255,215,0,0.04) 0%, transparent 50%, rgba(255,215,0,0.04) 100%)', zIndex: 1 }}></div>
                                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '12px 35px', color: '#00ff41', fontFamily: 'monospace', fontWeight: 'bold', zIndex: 2 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.6, fontSize: '0.65rem' }}>
                                        <span>AM</span>
                                        <span>540</span><span>600</span><span>700</span><span>800</span><span>1000</span><span>1200</span><span>1600</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', borderTop: '1px solid rgba(0,255,65,0.15)', borderBottom: '1px solid rgba(0,255,65,0.15)', padding: '4px 0', color: '#fff' }}>
                                        {radioStations.map((s, idx) => (
                                            <span key={idx} onClick={() => changeStation(s)} style={{
                                                cursor: 'pointer',
                                                fontSize: currentStation.id === s.id ? '0.85rem' : '0.65rem',
                                                color: currentStation.id === s.id ? '#FFD700' : '#555',
                                                fontWeight: '900',
                                                transition: 'all 0.4s ease',
                                                textShadow: currentStation.id === s.id ? '0 0 10px #FFD700' : 'none',
                                                maxWidth: '90px',
                                                textAlign: 'center',
                                                lineHeight: '1.1'
                                            }}>
                                                {s.dialLabel || s.name}
                                            </span>
                                        ))}
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.6, fontSize: '0.65rem' }}>
                                        <span>FM</span>
                                        <span>88</span><span>92</span><span>96</span><span>100</span><span>104</span><span>108</span>
                                    </div>
                                </div>
                                {/* Aguja Mecánica */}
                                <div style={{
                                    position: 'absolute',
                                    left: `${((radioStations.findIndex(s => s.id === currentStation.id) + 1) * (100 / (radioStations.length + 1)))}%`,
                                    top: '8%', bottom: '8%', width: '3px',
                                    background: 'linear-gradient(180deg, #fff 0%, #e63946 60%, #900 100%)',
                                    transform: 'translateX(-50%)',
                                    transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                    boxShadow: '0 0 12px rgba(230,57,70,0.9)',
                                    zIndex: 10, pointerEvents: 'none'
                                }}>
                                    <div style={{ position: 'absolute', top: -4, left: '50%', transform: 'translateX(-50%)', width: '10px', height: '10px', borderRadius: '50%', background: '#fff', border: '2px solid #e63946', boxShadow: '0 0 8px #fff' }}></div>
                                </div>
                                {/* Reflexión de vidrio */}
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%)', pointerEvents: 'none', zIndex: 6 }}></div>
                            </div>

                             {/* Visualizador + VU Meters / YouTube Player for Concejo */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', width: '100%' }}>
                                <div className="hide-mobile">
                                    <VUMeter label="L" needleRef={vuLeftRef} />
                                </div>
                                
                                <div style={{
                                    flex: 1, 
                                    height: currentStation.isVideo ? '240px' : '140px', 
                                    background: '#030303', 
                                    borderRadius: '16px',
                                    border: `3px solid ${currentStation.color}`,
                                    position: 'relative', 
                                    overflow: 'hidden',
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    boxShadow: isPlaying ? `0 0 35px ${currentStation.color}55` : 'none',
                                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                    zIndex: 5
                                }}>
                                    {currentStation.isVideo ? (
                                        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                                            {isPlaying ? (
                                                <iframe 
                                                    width="100%" 
                                                    height="100%" 
                                                    src={currentStation.url} 
                                                    title="YouTube video player" 
                                                    frameBorder="0" 
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                                    allowFullScreen
                                                    style={{ display: 'block' }}
                                                />
                                            ) : (
                                                <div style={{ 
                                                    width: '100%', height: '100%', 
                                                    display: 'flex', flexDirection: 'column', 
                                                    alignItems: 'center', justifyContent: 'center',
                                                    background: 'linear-gradient(135deg, #1a1a1a 0%, #000 100%)',
                                                    color: 'white', gap: '1rem', textAlign: 'center', padding: '1rem'
                                                }}>
                                                    <div className="pulse-fast" style={{ fontSize: '3rem', opacity: 0.8 }}>🗳️</div>
                                                    <div>
                                                        <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#ef4444', letterSpacing: '1px' }}>TRANSMISIÓN CONCEJO MUNICIPAL</div>
                                                        <div style={{ fontSize: '0.65rem', opacity: 0.6, marginTop: '4px' }}>Pulse PLAY para conectar señal audiovisual</div>
                                                    </div>
                                                </div>
                                            )}
                                            {/* Efecto Scanlines */}
                                            <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 2px)', pointerEvents: 'none', opacity: 0.3 }}></div>
                                        </div>
                                    ) : currentStation.isPlaylist ? (
                                        <div style={{ width: '100%', height: '100%', overflowY: 'auto', padding: '1rem', background: '#020617', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <div className="blink" style={{ width: '8px', height: '8px', background: '#38bdf8', borderRadius: '50%' }}></div>
                                                    <span style={{ fontSize: '0.7rem', fontWeight: '900', color: '#38bdf8', letterSpacing: '1px' }}>SINTONIZADOR ARCHIVO_CONCEJO</span>
                                                </div>
                                                <span style={{ fontSize: '0.55rem', color: '#64748b' }}>TOTAL: {CONCEJO_ARCHIVE.length} TRACKS</span>
                                            </div>
                                            {CONCEJO_ARCHIVE.map(track => (
                                                <div 
                                                    key={track.id} 
                                                    onClick={() => setSelectedCouncilTrack(track)}
                                                    style={{ 
                                                        padding: '10px', 
                                                        borderRadius: '8px', 
                                                        background: selectedCouncilTrack.id === track.id ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255,255,255,0.03)',
                                                        border: `1px solid ${selectedCouncilTrack.id === track.id ? '#6366f1' : 'transparent'}`,
                                                        cursor: 'pointer',
                                                        transition: '0.2s'
                                                    }}
                                                >
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                        <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'white' }}>{track.date}</div>
                                                        <div style={{ fontSize: '0.65rem', color: '#6366f1', fontWeight: 'bold' }}>{track.duration}</div>
                                                    </div>
                                                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', lineHeight: '1.4' }}>
                                                        {track.points[0].substring(0, 60)}...
                                                    </div>
                                                    {selectedCouncilTrack.id === track.id && (
                                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} style={{ marginTop: '8px', overflow: 'hidden' }}>
                                                            {track.points.map((p, idx) => (
                                                                <div key={idx} style={{ fontSize: '0.65rem', color: '#38bdf8', display: 'flex', gap: '6px', marginBottom: '4px' }}>
                                                                    <span>•</span><span>{p}</span>
                                                                </div>
                                                            ))}
                                                        </motion.div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <>
                                            <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
                                            <div className="blink" style={{ position: 'absolute', color: currentStation.color, fontFamily: 'monospace', fontSize: isMobile ? '0.8rem' : '1rem', fontWeight: 'bold', letterSpacing: '2px', textShadow: `0 0 10px ${currentStation.color}`, textAlign: 'center' }}>
                                                {isPlaying ? onAirMessages[msgIndex] : `${currentStation.id === 'municipal' ? (isVLS ? 'VLS' : 'RDMLS') : currentStation.id.toUpperCase()} :: STANDBY`}
                                            </div>
                                            <div style={{ position: 'absolute', inset: 0, background: `repeating-linear-gradient(0deg, transparent, transparent 19px, ${currentStation.color}09 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, ${currentStation.color}09 20px)`, pointerEvents: 'none' }}></div>
                                        </>
                                    )}
                                </div>

                                <div className="hide-mobile">
                                    <VUMeter label="R" needleRef={vuRightRef} />
                                </div>
                            </div>

                            {/* EQ Buttons */}
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
                                {['flat', 'claro', 'oscuro', '90s'].map(mode => (
                                    <button key={mode} onClick={() => setEqMode(mode)} style={{
                                        background: eqMode === mode ? '#fcd34d' : '#1a1a1a',
                                        color: eqMode === mode ? '#000' : '#666',
                                        border: `2px solid ${eqMode === mode ? '#f59e0b' : '#333'}`,
                                        borderRadius: '6px', fontSize: '0.65rem', fontWeight: 'bold',
                                        padding: '5px 10px', cursor: 'pointer', textTransform: 'uppercase',
                                        transition: 'all 0.2s', letterSpacing: '1px'
                                    }}>
                                        {mode === 'flat' ? 'NORMAL' : mode === 'claro' ? 'CLARO' : mode === 'oscuro' ? 'GRAVE' : 'V-90s'}
                                    </button>
                                ))}
                            </div>

                            {/* Panel de Controles: Volumen | Play/Mute | Smart Dial */}
                            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '0.5rem 0' }}>
                                {/* Perilla Volumen */}
                                <div style={{ textAlign: 'center', position: 'relative' }}>
                                    <div className="knob-container" style={{
                                        width: '70px', height: '70px', borderRadius: '50%',
                                        background: 'conic-gradient(from 0deg, #1a1a1a, #3a3a3a, #1a1a1a)',
                                        border: '4px solid #0a0a0a', position: 'relative', cursor: 'pointer',
                                        transform: `rotate(${(volume * 270) - 135}deg)`,
                                        boxShadow: '0 6px 15px rgba(0,0,0,0.7), inset 0 2px 4px rgba(255,255,255,0.08)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <div style={{ position: 'absolute', top: '7px', width: '3px', height: '10px', background: currentStation.color, borderRadius: '2px', boxShadow: `0 0 6px ${currentStation.color}` }}></div>
                                        <div style={{ width: '80%', height: '80%', borderRadius: '50%', background: 'radial-gradient(circle, #2a2a2a 0%, #0a0a0a 100%)' }}></div>
                                    </div>
                                    <input type="range" min="0" max="1" step="0.01" value={volume}
                                        onChange={e => { setVolume(parseFloat(e.target.value)); if (isMuted) setIsMuted(false); }}
                                        style={{ position: 'absolute', opacity: 0, width: '70px', height: '70px', top: 0, left: 0, cursor: 'pointer', zIndex: 10, borderRadius: '50%' }}
                                    />
                                    <span style={{ display: 'block', marginTop: '10px', fontSize: '0.7rem', color: currentStation.color, fontWeight: '900', letterSpacing: '1px' }}>VOL</span>
                                </div>

                                {/* Centro: Botón ON/AIR grande + botón MUTE pequeño */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                    {/* Botón principal PLAY / STOP */}
                                    <button
                                        type="button"
                                        onClick={() => { togglePlay(); }}
                                        style={{
                                            width: '95px', height: '95px', borderRadius: '50%',
                                            background: isPlaying
                                                ? 'radial-gradient(circle at 35% 35%, #ff6b6b 0%, #cc0000 60%, #800000 100%)'
                                                : 'radial-gradient(circle at 35% 35%, #ffe066 0%, #f59e0b 60%, #b45309 100%)',
                                            border: '7px solid #111',
                                            color: isPlaying ? '#fff' : '#000',
                                            cursor: 'pointer',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            boxShadow: isPlaying
                                                ? '0 0 50px rgba(220,38,38,0.7), 0 6px 20px rgba(0,0,0,0.6), inset 0 -3px 6px rgba(0,0,0,0.4)'
                                                : '0 8px 25px rgba(0,0,0,0.6), inset 0 -3px 6px rgba(0,0,0,0.3)',
                                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                            transform: isPlaying ? 'scale(0.93)' : 'scale(1)'
                                        }}>
                                        {isPlaying ? <div style={{ width: '35px', height: '35px', background: 'white', borderRadius: '4px' }}></div> : <Music size={42} className="pulse-fast" />}
                                    </button>

                                    {/* Botón MUTE / UNMUTE separado */}
                                    <button
                                        type="button"
                                        onClick={toggleMute}
                                        style={{
                                            background: isMuted ? '#ef4444' : 'rgba(255,255,255,0.08)',
                                            border: `1px solid ${isMuted ? '#ef4444' : 'rgba(255,255,255,0.2)'}`,
                                            borderRadius: '20px',
                                            color: 'white',
                                            padding: '4px 14px',
                                            fontSize: '0.65rem',
                                            fontWeight: 'bold',
                                            cursor: 'pointer',
                                            letterSpacing: '1px',
                                            display: 'flex', alignItems: 'center', gap: '4px',
                                            transition: 'all 0.2s'
                                        }}>
                                        {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
                                        {isMuted ? 'SILENCIO' : 'MUTE'}
                                    </button>
                                </div>

                                {/* Smart Dial */}
                                <div style={{ textAlign: 'center' }}>
                                    <div onClick={() => {
                                        const ci = radioStations.findIndex(s => s.id === currentStation.id);
                                        changeStation(radioStations[(ci + 1) % radioStations.length]);
                                    }} style={{
                                        width: '80px', height: '80px', borderRadius: '50%',
                                        background: 'conic-gradient(from 0deg, #1a1a1a, #4a4a4a, #1a1a1a)',
                                        border: '5px solid #050505', position: 'relative', cursor: 'pointer',
                                        boxShadow: '0 8px 20px rgba(0,0,0,0.8), inset 0 2px 5px rgba(255,255,255,0.12)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        transition: 'transform 0.5s ease',
                                        transform: `rotate(${radioStations.findIndex(s => s.id === currentStation.id) * (360 / radioStations.length)}deg)`
                                    }}>
                                        <div style={{ position: 'absolute', top: '9px', width: '5px', height: '13px', background: '#FFD700', borderRadius: '3px', boxShadow: '0 0 12px #FFD700' }}></div>
                                        <div style={{ width: '38%', height: '38%', borderRadius: '50%', background: '#0a0a0a', border: '1px solid #333' }}></div>
                                    </div>
                                    <span style={{ display: 'block', marginTop: '10px', fontSize: '0.75rem', color: '#FFD700', fontWeight: '900', letterSpacing: '1px' }}>SMART DIAL</span>
                                    <div style={{ fontSize: '0.55rem', color: '#555', marginTop: '3px' }}>CLICK → SINTONIZAR</div>
                                </div>
                            </div>


                            {/* Tag grabado consola */}
                            <div style={{ textAlign: 'right', fontSize: '0.6rem', color: 'rgba(255,255,255,0.08)', fontWeight: 'bold', letterSpacing: '3px' }}>
                                {isVLS ? 'VLS DIGITAL BROADCAST CONSOLE' : 'RDMLS DIGITAL BROADCAST CONSOLE'} v2.0
                            </div>
                        </div>

                    </div>
                </section>

                {/* 3. CÁMARAS Y SEÑALES (TV) */}
                {isVLS && (
                <section id="cameras-section" className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.5)', borderRadius: '24px', border: '1px solid rgba(255,215,0,0.2)', overflowX: 'hidden' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem', borderBottom: '1px solid rgba(255,215,0,0.3)', paddingBottom: '0.8rem' }}>
                        <MonitorPlay size={24} color="#FFD700" />
                        <h2 style={{ margin: 0, fontSize: isMobile ? '1.1rem' : '1.5rem', color: 'white' }}>CENTRO DE MONITOREO &amp; SEÑALES EN VIVO</h2>
                    </div>

                    {/* TV RETRO — ancho completo, sin desborde */}
                    <div style={{ width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
                        <OldTVModal inline={true} />
                    </div>

                    {/* Cámaras Faro Monumental — 3 tomas zoom 1x / 4x / 8x */}
                    <div style={{ marginTop: '1.2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
                            <div className="blink" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f00', flexShrink: 0 }}></div>
                            <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#FFD700', letterSpacing: '1px' }}>FARO MONUMENTAL — VIGILANCIA EN VIVO</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: '0.8rem' }}>
                            {[
                                { label: 'CAM 01 · 1x', scale: 1.05, pos: 'center center' },
                                { label: 'CAM 02 · 4x', scale: 2.5,  pos: 'center 35%' },
                                { label: 'CAM 03 · 8x', scale: 5,    pos: 'center 25%' }
                            ].map(cam => (
                                <div key={cam.label} style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', border: '2px solid #333', background: '#000', aspectRatio: '16/9' }}>
                                    <img
                                        src="https://img.youtube.com/vi/fUeo_EhVFTY/hqdefault.jpg"
                                        alt={cam.label}
                                        style={{
                                            width: '100%', height: '100%',
                                            objectFit: 'cover',
                                            objectPosition: cam.pos,
                                            transform: `scale(${cam.scale})`,
                                            transformOrigin: cam.pos,
                                            filter: 'brightness(0.9) contrast(1.1)',
                                            display: 'block'
                                        }}
                                    />
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.5) 100%)', pointerEvents: 'none' }}></div>
                                    <div style={{ position: 'absolute', top: 5, left: 7, fontSize: '0.52rem', color: '#f55', fontWeight: 'bold', letterSpacing: '0.5px', fontFamily: 'monospace' }}>{cam.label}</div>
                                    <div className="blink" style={{ position: 'absolute', top: 6, right: 7, width: '5px', height: '5px', background: '#f00', borderRadius: '50%' }}></div>
                                    <div style={{ position: 'absolute', bottom: 5, right: 7, fontSize: '0.48rem', color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace' }}>ZOOM {cam.scale < 2 ? '1' : cam.scale < 4 ? '4' : '8'}x</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                )}

                {/* 4. SERENAMET */}
                {isVLS && (
                <section id="serenamet-section" className="glass-panel" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(14,165,233,0.1), rgba(15,23,42,0.8))', borderRadius: '24px', border: '1px solid rgba(56,189,248,0.3)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <CloudSun size={28} color="#38bdf8" />
                        <h2 style={{ margin: 0, fontSize: isMobile ? '1.3rem' : '1.8rem', color: 'white' }}>SERENAMET - CLIMA &amp; TEMPERATURA</h2>
                        <div style={{ marginLeft: 'auto', fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: '800', color: '#38bdf8' }}>{weather ? `${weather}°C` : '--°C'}</div>
                    </div>
                    <div style={{ height: '300px', borderRadius: '16px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.1)' }}>
                        <iframe src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=°C&metricWind=km/h&zoom=11&overlay=wind&product=ecmwf&level=surface&lat=-29.904&lon=-71.248" frameBorder="0" style={{ width: '100%', height: '100%' }}></iframe>
                    </div>
                </section>
                )}
                
                {/* 5. NOTICIAS OFICIALES */}
                {isVLS && (
                <section id="noticias-section" className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(15,23,42,0.8)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.8rem' }}>
                        <FileText size={28} color="#f43f5e" />
                        <h2 style={{ margin: 0, fontSize: isMobile ? '1.2rem' : '1.5rem', color: 'white' }}>NOTICIAS OFICIALES IMLS</h2>
                    </div>
                    {newsLoading ? (
                        <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>Cargando noticias desde www.laserena.cl/noticias...</div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                            {newsItems.map(news => (
                                <a href={news.link} target="_blank" rel="noopener noreferrer" key={news.id} style={{ display: 'block', textDecoration: 'none', background: 'rgba(0,0,0,0.4)', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', transition: 'transform 0.3s', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                                    {news.imageUrl && (
                                        <div style={{ width: '100%', height: '160px', overflow: 'hidden' }}>
                                            <img src={news.imageUrl} alt={news.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                    )}
                                    <div style={{ padding: '1rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                                            <span style={{ fontSize: '0.65rem', fontWeight: 'bold', color: '#f43f5e', background: 'rgba(244,63,94,0.1)', padding: '0.2rem 0.6rem', borderRadius: '20px' }}>{news.category}</span>
                                            <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{news.date}</span>
                                        </div>
                                        <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem', color: 'white', lineHeight: '1.4' }}>{news.title}</h3>
                                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#94b3c8', lineHeight: '1.5' }}>{news.content}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    )}
                </section>
                )}

                {/* 6. JUEGOS Y ENTRETENIMIENTO (isDevMode) */}
                {isDevMode && (
                <section id="games-section" className="glass-panel" style={{ padding: '2rem', background: 'rgba(255,115,22,0.05)', borderRadius: '32px', border: '2px solid rgba(255,115,22,0.2)', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <Gamepad2 size={32} color="#f97316" />
                        <div>
                            <h2 style={{ margin: 0, fontSize: isMobile ? '1.3rem' : '1.8rem', color: 'white', fontWeight: '900', letterSpacing: '-1px' }}>ZONA DE ENTRETENIMIENTO MUNICIPAL</h2>
                            <p style={{ margin: 0, color: '#f97316', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px' }}>VERSIONES EXPERIMENTALES RDMLS.CL/DEV</p>
                        </div>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {/* Serenito 1945 */}
                        <div style={{ background: 'rgba(0,0,0,0.5)', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ height: '140px', background: 'url(https://raw.githubusercontent.com/vecinoslaserenachile-cloud/juego-serenito/main/serenito_1945_bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #000, transparent)' }}></div>
                                <div style={{ position: 'absolute', bottom: '15px', left: '15px' }}>
                                    <span style={{ background: '#f97316', color: 'black', padding: '2px 8px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: '900' }}>ARCADE VLS</span>
                                </div>
                            </div>
                            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ color: 'white', margin: '0 0 0.5rem 0', fontWeight: '800' }}>SERENITO 1945: AL RESCATE</h3>
                                <p style={{ color: '#94a3b8', fontSize: '0.8rem', lineHeight: '1.5', margin: '0 0 1.5rem 0' }}>Vuela sobre La Serena, esquiva obstáculos y recolecta monedas para restaurar los monumentos históricos de la ciudad.</p>
                                <button onClick={() => setShowArcade(true)} style={{ marginTop: 'auto', background: '#f97316', color: 'black', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: '900', cursor: 'pointer', transition: 'all 0.3s' }}>JUGAR AHORA ✈️</button>
                            </div>
                        </div>

                        {/* MuniSabios (vlsabes) */}
                        <div style={{ background: 'rgba(0,0,0,0.5)', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ height: '140px', background: 'linear-gradient(135deg, #7c3aed 0%, #4338ca 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <GraduationCap size={60} color="white" opacity={0.3} style={{ position: 'absolute' }} />
                                <h2 style={{ color: 'white', fontWeight: '900', letterSpacing: '4px', zIndex: 1 }}>MUNISABIOS</h2>
                                <div style={{ position: 'absolute', bottom: '15px', left: '15px' }}>
                                    <span style={{ background: '#7c3aed', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: '900' }}>TRIVIA IMLS</span>
                                </div>
                            </div>
                            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ color: 'white', margin: '0 0 0.5rem 0', fontWeight: '800' }}>EL GRAN MUNISABIO</h3>
                                <p style={{ color: '#94a3b8', fontSize: '0.8rem', lineHeight: '1.5', margin: '0 0 1.5rem 0' }}>Desafía tus conocimientos sobre la historia de La Serena, geografía local y cultura patrimonial. ¿Eres un verdadero Sabio de la ciudad?</p>
                                <button onClick={() => navigate('/vlsabes')} style={{ marginTop: 'auto', background: '#7c3aed', color: 'white', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: '900', cursor: 'pointer', transition: 'all 0.3s' }}>DEMOSTRAR TALENTO 🎓</button>
                            </div>
                        </div>
                    </div>
                </section>
                )}

            </main>

            {/* FOOTER INSTITUCIONAL */}
            <footer style={{ background: '#0a0a0a', borderTop: '4px solid #FFD700', padding: '2.5rem 1.5rem', color: 'white' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '2.5rem', alignItems: 'center' }}>

                    {/* Columna izquierda — Logo + info */}
                    <div style={{ flex: 1, textAlign: isMobile ? 'center' : 'left' }}>
                        <img
                            src={isVLS ? "/logo_vls.png" : "/escudo.png"}
                            alt={isVLS ? "VLS Logo" : "IMLS Logo"}
                            style={{ height: '70px', marginBottom: '1rem', filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.4))' }}
                            onError={e => { e.target.style.display = 'none'; }}
                        />
                                             <p style={{ margin: '0 0 0.3rem', opacity: 0.5, fontSize: '0.75rem' }}>I. MUNICIPALIDAD DE LA SERENA · COMUNICACIONES 2026</p>
                        
                        {/* Links Consolidados RDMLS */}
                        <div style={{ display: 'flex', gap: '1.2rem', marginTop: '1.2rem', flexWrap: 'wrap', justifyContent: isMobile ? 'center' : 'flex-start', alignItems: 'center' }}>
                            <a href="https://www.laserena.cl/noticias" target="_blank" rel="noopener noreferrer" style={{ color: '#FFD700', fontSize: '0.75rem', fontWeight: '900', textDecoration: 'none', letterSpacing: '1px' }}>NOTICIAS</a>
                            <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
                            <a href="mailto:radio@laserena.cl" style={{ color: '#FFD700', fontSize: '0.75rem', fontWeight: '900', textDecoration: 'none', letterSpacing: '1px' }}>CONTACTO</a>
                        </div>

                        {/* Botón instalar APP */}
                        <button
                            onClick={handleInstall}
                            style={{ marginTop: '1.2rem', background: 'linear-gradient(135deg, #FFD700, #B8860B)', color: '#000', border: 'none', borderRadius: '30px', padding: '0.7rem 1.8rem', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 15px rgba(255,215,0,0.3)' }}
                        >
                            <Download size={16} /> INSTALAR APP {isVLS ? 'VLS' : 'RDMLS'}
                        </button>

                        <div style={{ marginTop: '1.5rem', fontSize: '0.65rem', opacity: 0.5, fontWeight: 'bold', textTransform: 'uppercase' }}>
                            RDMLS.CL Desarrollado por Comunicaciones IMLS 2026
                        </div>
                    </div>

                    {/* Columna derecha — QR */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem', flexShrink: 0 }}>
                        <div style={{ background: 'white', padding: '12px', borderRadius: '16px', boxShadow: '0 0 30px rgba(255,215,0,0.3)' }}>
                            <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https%3A%2F%2Fwww.${isVLS ? 'vecinoslaserena' : 'rdmls'}.cl&color=8B1D19&bgcolor=ffffff&qzone=1&margin=0`}
                                alt={isVLS ? "QR VLS" : "QR RDMLS"}
                                width="160" height="160"
                                style={{ display: 'block', borderRadius: '8px' }}
                                onError={e => {
                                    // Fallback a otro proveedor de QR
                                    e.target.src = `https://quickchart.io/qr?text=https%3A%2F%2Fwww.${isVLS ? 'vecinoslaserena' : 'rdmls'}.cl&size=160&margin=2&ecLevel=M&dark=8B1D19&light=ffffff`;
                                }}
                            />
                        </div>
                        <p style={{ margin: 0, fontSize: '0.72rem', opacity: 0.6, textAlign: 'center', letterSpacing: '0.5px' }}>
                            ESCANEA Y ESCUCHA<br />
                            <strong style={{ color: '#FFD700' }}>WWW.{isVLS ? 'VECINOSLASERENA' : 'RDMLS'}.CL</strong>
                        </p>
                    </div>

                </div>
            </footer>

 
            {showRetroTV && <OldTVModal onClose={() => setShowRetroTV(false)} />}
            {showVhsTV && <VhsTVModal onClose={() => setShowVhsTV(false)} />}
            {showArcade && <RetroArcadeLobby onClose={() => setShowArcade(false)} />}
            {showAdmin && <RadioBackofficeModal onClose={() => setShowAdmin(false)} />}
            {selectedNews && <NewsDetailModal item={selectedNews} onClose={() => setSelectedNews(null)} />}

 
            <style>{`
                @keyframes marquee { 0% { transform: translateX(100vw); } 100% { transform: translateX(-150%); } }
                @keyframes pulse-fast { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.1); opacity: 0.8; } 100% { transform: scale(1); opacity: 1; } }
                @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
                @keyframes sonar-expand {
                    0% { transform: scale(0.6); opacity: 0; }
                    50% { opacity: 0.5; }
                    100% { transform: scale(1.4); opacity: 0; }
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .blink { animation: blink 2s infinite; }
                
                @media (max-width: 1024px) {
                    .rdmls-main-grid {
                        grid-template-columns: 1fr !important;
                        padding: 1rem !important;
                        gap: 1.5rem !important;
                    }
                    .hide-mobile {
                        display: none !important;
                    }
                }
            `}</style>
        </div>
    );
}
