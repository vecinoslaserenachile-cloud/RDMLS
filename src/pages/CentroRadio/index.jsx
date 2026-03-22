import React, { useState, useEffect, useRef } from 'react';
import { Home, Radio, Clock, CloudSun, Calendar, MessageCircle, Music, Info, MonitorPlay, Gamepad2, Volume2, VolumeX, Maximize, ExternalLink, Download, Settings, FileText, GraduationCap, Youtube } from 'lucide-react';
import OldTVModal from '../../components/OldTVModal';
import VhsTVModal from '../../components/VhsTVModal';
import RetroArcadeLobby from '../../components/RetroArcadeLobby';
import RadioBackofficeModal from '../../components/RadioBackofficeModal';
import NewsDetailModal from '../../components/NewsDetailModal';
import { useNavigate } from 'react-router-dom';

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

export default function CentroRadio() {
    const navigate = useNavigate();
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
    const host = window.location.hostname.toLowerCase();
    const isVLS = host.includes('vecinoslaserena');
    const isRDMLS = host.includes('rdmls') || host.includes('laserena.cl');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // ── Título de pestaña y favicon dinámico según dominio ──
    useEffect(() => {
        const updateFavicon = (href) => {
            const icons = document.querySelectorAll("link[rel*='icon']");
            icons.forEach(icon => icon.href = href);
        };

        if (!isVLS) {
            document.title = 'RDMLS · Radio Digital Municipal · I. Municipalidad de La Serena';
            updateFavicon('/escudo.png');
        } else {
            document.title = 'vecinoslaserena.cl';
            updateFavicon('/vls-crystal-icon.svg');
        }

        return () => {
            document.title = 'vecinoslaserena.cl';
            updateFavicon('/vls-crystal-icon.svg');
        };
    }, [isVLS]);
    
    const defaultStream = isVLS 
        ? "https://az11.yesstreaming.net:8630/radio.mp3" 
        : "https://az11.yesstreaming.net:8590/radio.mp3";

    const [streamUrl, setStreamUrl] = useState(defaultStream);
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [djImageError, setDjImageError] = useState(false);
    const [showArcade, setShowArcade] = useState(false);
    const [msgIndex, setMsgIndex] = useState(0);
    const [eqMode, setEqMode] = useState('90s'); // flat, claro, oscuro, 90s (90s default for punch)
    const [showAdmin, setShowAdmin] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);

    const onAirMessages = [
        "EN VIVO", "TRANSMITIENDO", "ONLINE", "ON AIR", "SONANDO",
        "CONNECTÉ", "DIFFUSION", "EMITINDO", "AO VIVO", "LIVE NOW"
    ];
    const radioStations = [
        ...(!isVLS ? [
            { 
                id: 'municipal', 
                name: 'RDMLS INSTITUCIONAL',
                dialLabel: 'RDMLS',
                slogan: 'LA SEÑAL SIEMPRE CONECTADA - IMLS 2026', 
                url: "https://az11.yesstreaming.net:8590/radio.mp3",
                color: '#FFD700',
                logo: '/logo_municipio.png',
                badge: 'OFICIAL'
            },
            { 
                id: 'concejo', 
                name: 'SESIÓN CONCEJO',
                dialLabel: 'CONCEJO',
                slogan: 'TRANSPARENCIA Y GESTIÓN', 
                url: "https://az11.yesstreaming.net:8630/sessions.mp3", 
                color: '#ef4444',
                logo: '/escudo.png',
                badge: 'TRANSPARENCIA'
            }
        ] : []),
        { 
            id: 'jjvv', 
            name: isVLS ? 'VLS RADIO (Oficial)' : 'RDMLS JJVV',
            dialLabel: isVLS ? 'VLS 2026' : 'JJVV',
            slogan: isVLS ? 'EL PULSO DIGITAL DE LA SERENA - VECINOS SMART' : 'JUNTAS DE VECINOS EN RED', 
            url: "https://az11.yesstreaming.net:8630/radio.mp3", 
            color: '#f97316',
            logo: '/logo_vls.png',
            badge: isVLS ? 'PRINCIPAL' : 'VECINAL'
        },
        { 
            id: 'instrumental', 
            name: isVLS ? 'SESIONES MUSICALES' : 'RDMLS RURAL',
            dialLabel: isVLS ? 'MUSICA' : 'RURAL',
            slogan: isVLS ? 'FOLKLORE, JAZZ Y ESTRENOS VLS' : 'CONEXIÓN CON EL CAMPO', 
            url: "https://az11.yesstreaming.net:8630/music_school.mp3", 
            color: '#a855f7',
            logo: '/piano_icon.png',
            badge: isVLS ? 'CULTURAL' : 'TERRITORIO'
        },
        { 
            id: 'entrevistas', 
            name: isVLS ? 'ENTREVECINAS' : 'RDMLS ENTREVISTAS',
            dialLabel: isVLS ? 'EVECINAS' : 'ENTREVISTAS',
            slogan: isVLS ? 'LA VOZ DE NUESTRAS DIRIGENTAS' : 'CRÓNICA VECINAL Y ACTUALIDAD', 
            url: "https://az11.yesstreaming.net:8630/sessions.mp3", 
            color: '#10b981',
            logo: '/sessions_icon.png',
            badge: isVLS ? 'SOCIAL' : 'ACTUALIDAD'
        },
        ...(isVLS ? [{
            id: 'sombreros',
            name: 'CANCIONES DE LOS SOMBREROS',
            dialLabel: 'SOMBREROS',
            slogan: 'EL SONIDO DE LOS SEIS SOMBREROS DE DE BONO',
            url: "https://az11.yesstreaming.net:8630/hats_music.mp3",
            color: '#00e5ff',
            logo: '/vls-logo-3d.png',
            badge: 'CREATIVIDAD'
        }] : [])
    ];

    const [currentStation, setCurrentStation] = useState(radioStations[0]);

    // Handle station change by knob or buttons
    const changeStation = (station) => {
        if (station.id === currentStation.id) return;
        setCurrentStation(station);
        setStreamUrl(station.url);
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
                if (cfg.radioStreamUrl) setStreamUrl(cfg.radioStreamUrl);
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
        if (isPlaying) {
            // Si estaba reproduciendo, cambiar la señal en caliente
            audioRef.current.src = streamUrl;
            audioRef.current.load();
            audioRef.current.play()
                .then(() => { setIsPlaying(true); syncAudioVolume(); })
                .catch(() => setIsPlaying(false));
        } else {
            // Solo actualizar src para que esté listo al hacer click
            audioRef.current.src = streamUrl;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [streamUrl]);

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

                // Cadena: source → low → mid → high → gain → analyser → destination
                if (audioRef.current && !sourceRef.current) {
                    sourceRef.current = ctx.createMediaElementSource(audioRef.current);
                    sourceRef.current.connect(low);
                    low.connect(mid);
                    mid.connect(high);
                    high.connect(gainNodeRef.current);
                    gainNodeRef.current.connect(analyserRef.current);
                    analyserRef.current.connect(ctx.destination);
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
            // Aplicar inmediatamente sin esperar el useEffect para evitar lag
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
                crossOrigin="anonymous"
                preload="none"
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

                <div className="hide-mobile" style={{ display: 'flex', gap: '1.5rem', background: 'rgba(0,0,0,0.3)', padding: '0.8rem 1.5rem', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <button onClick={handleInstall} className="pulse-fast" style={{ background: '#10b981', border: 'none', color: 'white', padding: '0.5rem 1rem', borderRadius: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
                        <Download size={16} /> Descargar {isVLS ? 'VLS' : 'RDMLS'} App
                    </button>
                    <div style={{ width: '1px', background: 'rgba(255,255,255,0.2)' }}></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
                        <Clock size={18} color="#FFD700" />
                        {time.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div style={{ width: '1px', background: 'rgba(255,255,255,0.2)' }}></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
                        <CloudSun size={18} color="#FFD700" />
                        {weather ? `${weather}°C` : '--'}
                    </div>
                    <div style={{ width: '1px', background: 'rgba(255,255,255,0.2)' }}></div>
                    <button onClick={() => navigate('/escuela-musica')} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }} title="Escuela de Música">
                        <GraduationCap size={18} color="#a855f7" />
                        <span style={{ fontSize: '0.9rem' }}>Escuela de Música</span>
                    </button>
                    <div style={{ width: '1px', background: 'rgba(255,255,255,0.2)' }}></div>
                    <button onClick={() => navigate('/')} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }} title="Volver al Portal Central">
                        <Home size={18} color="#00e5ff" />
                        <span style={{ fontSize: '0.9rem' }}>Smart Comuna</span>
                    </button>
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


                {/* 2. EL REPRODUCTOR (CONSOLA RADIO) */}
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
                                    <span style={{ fontSize: '1.1rem' }}>{s.badge}</span>
                                    <span style={{ letterSpacing: '1px' }}>{s.id === 'municipal' ? (isVLS ? 'VLS' : 'RDMLS') : s.id.toUpperCase()}</span>
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

                            {/* Visualizador + VU Meters */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                                <VUMeter label="L" needleRef={vuLeftRef} />
                                <div style={{
                                    flex: 1, height: '140px', background: '#030303', borderRadius: '12px',
                                    border: `3px solid ${currentStation.color}`,
                                    position: 'relative', overflow: 'hidden',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: isPlaying ? `0 0 25px ${currentStation.color}44` : 'none',
                                    transition: 'border 0.5s ease, box-shadow 0.5s ease'
                                }}>
                                    <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
                                    <div className="blink" style={{ position: 'absolute', color: currentStation.color, fontFamily: 'monospace', fontSize: isMobile ? '0.8rem' : '1rem', fontWeight: 'bold', letterSpacing: '2px', textShadow: `0 0 10px ${currentStation.color}`, textAlign: 'center' }}>
                                        {isPlaying ? onAirMessages[msgIndex] : `${currentStation.id === 'municipal' ? (isVLS ? 'VLS' : 'RDMLS') : currentStation.id.toUpperCase()} :: STANDBY`}
                                    </div>
                                    <div style={{ position: 'absolute', inset: 0, background: `repeating-linear-gradient(0deg, transparent, transparent 19px, ${currentStation.color}09 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, ${currentStation.color}09 20px)`, pointerEvents: 'none' }}></div>
                                </div>
                                <VUMeter label="R" needleRef={vuRightRef} />
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

                        {/* Ondas Sonoras (solo cuando está en reproducción) */}
                        {isPlaying && (
                            <div style={{ position: 'relative', width: '100%', height: '0', overflow: 'visible' }}>
                                <div className="wave-sonar" style={{ position: 'absolute', left: '50%', top: 0, width: '400px', height: '400px', marginLeft: '-200px', marginTop: '-200px', border: `2px solid ${currentStation.color}22`, borderRadius: '50%', animation: 'sonar-expand 4s linear infinite', zIndex: 0 }}></div>
                                <div className="wave-sonar" style={{ position: 'absolute', left: '50%', top: 0, width: '400px', height: '400px', marginLeft: '-200px', marginTop: '-200px', border: `2px solid ${currentStation.color}11`, borderRadius: '50%', animation: 'sonar-expand 4s linear 2s infinite', zIndex: 0 }}></div>
                            </div>
                        )}
                    </div>
                </section>

                {/* 3. CÁMARAS Y SEÑALES (TV) */}
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

                {/* 4. SERENAMET */}
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
                
                {/* 5. YOUTUBE SOURCES - Exclusivo VLS o si es solicitado */}
                {isVLS && (
                    <section id="youtube-section" className="glass-panel animate-slide-up" style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.5)', borderRadius: '24px', border: '1px solid #ff0000', overflow: 'hidden' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,0,0,0.3)', paddingBottom: '0.8rem' }}>
                            <Youtube size={28} color="#ff0000" />
                            <h2 style={{ margin: 0, fontSize: isMobile ? '1.2rem' : '1.8rem', color: 'white' }}>RED DE CANALES VECINOS SMART</h2>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '1rem' }}>
                            {[
                                { name: 'VECINOS LA SERENA CHILE', url: 'https://www.youtube.com/@vecinoslaserenachile', icon: '📺' },
                                { name: 'ENTRE VECINAS VLS', url: 'https://www.youtube.com/@entrevecinasvls', icon: '🎙️' },
                                { name: 'SESIONES CUTURRUFO', url: 'https://www.youtube.com/@sesionescuturrufo', icon: '🎶' },
                                { name: 'VECINOSMART TV', url: 'https://www.youtube.com/@vecinosmart', icon: '🚀' }
                            ].map(yt => (
                                <a key={yt.name} href={yt.url} target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '20px', border: '1px solid rgba(255,0,0,0.2)', textAlign: 'center', cursor: 'pointer', textDecoration: 'none', transition: 'all 0.3s' }}>
                                    <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{yt.icon}</div>
                                    <h3 style={{ margin: 0, color: '#ff0000', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 'bold' }}>{yt.name}</h3>
                                    <span style={{ fontSize: '0.65rem', opacity: 0.6, color: 'white' }}>Ver Canal</span>
                                </a>
                            ))}
                        </div>
                    </section>
                )}

                {/* 5. ARCADE - 3 JUEGOS VISIBLES CON SELECTOR */}
                <section id="arcade-section" className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.8)', borderRadius: '24px', border: '1px solid #c084fc' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Gamepad2 size={28} color="#c084fc" />
                            <h2 style={{ margin: 0, fontSize: '1.8rem', color: 'white' }}>{isVLS ? 'VLS' : 'RDMLS'} ARCADE - FAVORITOS</h2>
                        </div>
                        <button onClick={() => setShowArcade(true)} style={{ background: '#c084fc', border: 'none', color: 'black', padding: '0.6rem 1.2rem', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                            VER TODOS LOS JUEGOS
                        </button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '1.5rem' }}>
                        {featuredGames.map(gameId => {
                            // Simple mapping (we'd ideally share the game data list)
                            return (
                                <div key={gameId} onClick={() => setShowArcade(true)} style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '20px', border: '1px solid rgba(192,132,252,0.3)', textAlign: 'center', cursor: 'pointer' }}>
                                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎮</div>
                                    <h3 style={{ margin: 0, color: '#c084fc', textTransform: 'uppercase' }}>{gameId}</h3>
                                    <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>Haz clic para jugar</span>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* 6. PANORAMAS */}
                <section id="panoramas-section" className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.4)', borderRadius: '24px', border: '1px solid rgba(0,229,255,0.2)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <Calendar size={28} color="#00e5ff" />
                        <h2 style={{ margin: 0, fontSize: '1.8rem', color: 'white' }}>PANORAMAS & AGENDA CULTURAL</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '1rem' }}>
                        <div style={{ padding: '1.2rem', background: 'linear-gradient(90deg, #001220, #002233)', borderRadius: '16px', borderLeft: '5px solid #00e5ff' }}>
                            <strong style={{ color: '#00e5ff' }}>CONCIERTO EN EL FARO</strong>
                            <p style={{ margin: '5px 0 0', fontSize: '0.9rem' }}>Orquesta Sinfónica Juvenil - Sábado 20:00 Hrs.</p>
                        </div>
                        <div style={{ padding: '1.2rem', background: 'linear-gradient(90deg, #001220, #002233)', borderRadius: '16px', borderLeft: '5px solid #10b981' }}>
                            <strong style={{ color: '#10b981' }}>FERIA DEL LIBRO</strong>
                            <p style={{ margin: '5px 0 0', fontSize: '0.9rem' }}>Plaza de Armas - Todo el Fin de Semana.</p>
                        </div>
                    </div>
                </section>

                {/* 7. NOTICIAS REALES (LASERENA.CL) */}
                <section id="news-section" className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.5)', borderRadius: '24px', border: '1px solid rgba(255,215,0,0.2)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Info size={28} color="#FFD700" />
                            <h2 style={{ margin: 0, fontSize: isMobile ? '1.2rem' : '1.8rem', color: 'white' }}>NOTICIAS LASERENA.CL</h2>
                            {newsLoading && <div style={{ width: '18px', height: '18px', border: '3px solid rgba(255,215,0,0.3)', borderTopColor: '#FFD700', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div>}
                        </div>
                        <a href="https://www.laserena.cl/noticias" target="_blank" rel="noopener noreferrer" style={{ color: '#FFD700', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none' }}>
                            VER TODAS <ExternalLink size={13} />
                        </a>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        {newsItems.length === 0 && !newsLoading && (
                            <div style={{ textAlign: 'center', padding: '2rem', opacity: 0.5, fontSize: '0.9rem' }}>
                                Cargando noticias desde laserena.cl...
                            </div>
                        )}
                        {newsItems.slice(0, 4).map((item, i) => (
                            <a
                                key={i}
                                href={item.link || 'https://www.laserena.cl/noticias'}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ display: 'flex', gap: '1rem', background: 'rgba(255,255,255,0.02)', padding: '0.9rem', borderRadius: '12px', border: '1px solid rgba(255,215,0,0.1)', cursor: 'pointer', textDecoration: 'none', transition: 'background 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,215,0,0.06)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                            >
                                <div style={{ minWidth: '80px', width: '80px', height: '80px', background: '#1a1a1a', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                                    <img
                                        src={item.imageUrl || '/escudo.png'}
                                        alt={item.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        onError={e => { e.target.src = '/escudo.png'; e.target.style.objectFit = 'contain'; e.target.style.padding = '10px'; e.target.style.opacity = '0.5'; }}
                                    />
                                </div>
                                <div style={{ flex: 1, overflow: 'hidden' }}>
                                    <div style={{ fontSize: '0.65rem', color: '#FFD700', fontWeight: 'bold', marginBottom: '3px' }}>{item.category} · {item.date}</div>
                                    <div style={{ fontSize: '0.95rem', color: 'white', fontWeight: 'bold', lineHeight: 1.3, marginBottom: '4px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.title}</div>
                                    <p style={{ fontSize: '0.75rem', opacity: 0.55, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.4 }}>{item.content}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>


                {/* 8. BOTÓN DE BACKOFFICE (PROGRAMACIÓN INTERNA) */}
                <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
                    <button 
                        onClick={() => {
                            const pass = prompt("INGRESE CLAVE MAESTRA INSTITUCIONAL:");
                            if (pass === 'master2026' || pass === 'vls_master' || pass === 'master_bypass_2026') {
                                setShowAdmin(true);
                            } else if (pass !== null) {
                                alert("ACCESO DENEGADO: Credenciales incorrectas.");
                            }
                        }} 
                        style={{ background: 'linear-gradient(45deg, #111, #333)', border: '1px solid #FFD700', color: '#FFD700', padding: '1rem 3rem', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.8rem', boxShadow: '0 0 20px rgba(255,215,0,0.1)' }}
                    >
                        <Settings size={20} /> ACCESO BACKOFFICE GESTIÓN {isVLS ? 'VLS' : 'RDMLS'}
                    </button>
                </div>

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
                        <h3 style={{ margin: '0 0 0.3rem', color: '#FFD700', letterSpacing: '2px', fontSize: '1rem' }}>{isVLS ? 'VLS RADIO COMUNITARIA - PORTAL VLS' : 'RDMLS RADIO DIGITAL MUNICIPAL'}</h3>
                        <p style={{ margin: '0 0 0.3rem', opacity: 0.5, fontSize: '0.75rem' }}>I. MUNICIPALIDAD DE LA SERENA · COMUNICACIONES 2026</p>

                        {/* Links */}
                        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', flexWrap: 'wrap', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                            <a href="https://www.laserena.cl" target="_blank" rel="noopener noreferrer" style={{ color: '#FFD700', fontSize: '0.8rem', textDecoration: 'none' }}>WWW.LASERENA.CL</a>
                            <a href="https://www.laserena.cl/noticias" target="_blank" rel="noopener noreferrer" style={{ color: '#FFD700', fontSize: '0.8rem', textDecoration: 'none' }}>NOTICIAS</a>
                            <a href="mailto:comunicaciones@laserena.cl" style={{ color: '#FFD700', fontSize: '0.8rem', textDecoration: 'none' }}>CONTACTO</a>
                        </div>

                        {/* Botón instalar APP */}
                        <button
                            onClick={handleInstall}
                            style={{ marginTop: '1.2rem', background: 'linear-gradient(135deg, #FFD700, #B8860B)', color: '#000', border: 'none', borderRadius: '30px', padding: '0.7rem 1.8rem', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 15px rgba(255,215,0,0.3)' }}
                        >
                            <Download size={16} /> INSTALAR APP {isVLS ? 'VLS' : 'RDMLS'}
                        </button>

                        {/* Compartir */}
                        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.7rem', flexWrap: 'wrap', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                            <span style={{ fontSize: '0.72rem', opacity: 0.5, alignSelf: 'center' }}>COMPARTIR:</span>
                            {/* WhatsApp */}
                            <a
                                href={`https://wa.me/?text=Escucha%20${isVLS ? 'VLS' : 'RDMLS'}%20Radio%20en%20vivo%20%F0%9F%93%BB%20https%3A%2F%2Fwww.${isVLS ? 'vecinoslaserena' : 'rdmls'}.cl`}
                                target="_blank" rel="noopener noreferrer"
                                style={{ background: '#25D366', color: 'white', padding: '0.45rem 1rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                            >
                                📱 WhatsApp
                            </a>
                            {/* Facebook */}
                            <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.${isVLS ? 'vecinoslaserena' : 'rdmls'}.cl`}
                                target="_blank" rel="noopener noreferrer"
                                style={{ background: '#1877F2', color: 'white', padding: '0.45rem 1rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', textDecoration: 'none' }}
                            >
                                Facebook
                            </a>
                            {/* X / Twitter */}
                            <a
                                href={`https://twitter.com/intent/tweet?text=Escucha%20${isVLS ? 'VLS' : 'RDMLS'}%20en%20vivo&url=https%3A%2F%2Fwww.${isVLS ? 'vecinoslaserena' : 'rdmls'}.cl`}
                                target="_blank" rel="noopener noreferrer"
                                style={{ background: '#000', color: 'white', padding: '0.45rem 1rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', textDecoration: 'none', border: '1px solid #333' }}
                            >
                                𝕏 Twitter
                            </a>
                            {/* Copiar link */}
                            <button
                                onClick={() => { 
                                    const link = isVLS ? 'https://www.vecinoslaserena.cl' : 'https://www.rdmls.cl';
                                    navigator.clipboard.writeText(link); 
                                    alert('¡Enlace copiado! Compártelo con quien quieras.'); 
                                }}
                                style={{ background: 'rgba(255,255,255,0.1)', color: 'white', padding: '0.45rem 1rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer' }}
                            >
                                🔗 Copiar link
                            </button>
                        </div>
                        <div style={{ marginTop: '1.5rem', fontSize: '0.65rem', opacity: 0.25 }}>
                            TODOS LOS DERECHOS RESERVADOS © {isVLS ? 'RED DE INNOVACIÓN COMUNITARIA' : 'MUNICIPIO DE LA SERENA'} 2026
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
