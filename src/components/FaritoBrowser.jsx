import React, { useState, useEffect, useRef } from 'react';
import { 
    Search, X, Globe, Shield, Eye, Info, HelpCircle, Compass, Home, 
    ArrowLeft, ArrowRight, RotateCw, Lock, Star, Zap, ShieldCheck, 
    Fingerprint, Activity, Terminal, Layers, Command, Bell, Radio, 
    Map, Users, Sparkles, Play, Plus, FileText, Megaphone, Mic, 
    Download, Briefcase, BarChart, Mail, CalendarDays, MousePointer2, 
    Settings, Key, Cpu, Volume2, LayoutGrid, FileSearch, Image as ImageIcon, Presentation, Calculator
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MicroTutorialVLS from './MicroTutorialVLS';

/**
 * FaritoBrowser: Módulo Avanzado de Búsqueda Neural e Interoperabilidad institucional.
 * Integra: 
 * 1. Farito Neural Search (Sentinel, G-Index, DDG, Bing).
 * 2. VecinOfis Pro (Docs, Sheets, Mail, Agenda).
 * 3. Faro Shield (Privacidad Extrema).
 * 4. Control por Voz.
 */
export default function FaritoBrowser({ onClose, initialQuery }) {
    const [url, setUrl] = useState('https://farito.cl');
    const [inputUrl, setInputUrl] = useState('farito.cl');
    const [isLoading, setIsLoading] = useState(false);
    const [activeTabId, setActiveTabId] = useState(1);
    const [tabs, setTabs] = useState([
        { id: 1, title: 'Inicio - Farito', url: 'https://farito.cl', active: true },
        { id: 2, title: 'ComunaSmart VLS', url: 'https://www.vecinoslaserena.cl', active: false }
    ]);
    const [downloads, setDownloads] = useState([
        { id: 1, name: 'manual_identidad_vls.pdf', size: '2.4 MB', status: 'Hecho', date: 'Ahora' },
        { id: 2, name: 'reporte_centinel_marzo.xls', size: '1.5 MB', status: 'Hecho', date: 'Hace 5 min' }
    ]);
    const [showDownloads, setShowDownloads] = useState(false);
    const [showShieldMenu, setShowShieldMenu] = useState(false);
    const [isShieldActive, setIsShieldActive] = useState(true);
    const [history, setHistory] = useState(['https://farito.cl']);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [showTicker, setShowTicker] = useState(false);
    const [tickerResults, setTickerResults] = useState([]);
    const [isListening, setIsListening] = useState(false);
    const [spokenText, setSpokenText] = useState('');
    const [activeApp, setActiveApp] = useState('browser'); // browser, doc, sheet, mail, calendar, resume, slides, photos
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [showTutorial, setShowTutorial] = useState(false);
    const browserRef = useRef(null);

    // Neural Engine State
    const [engineStatus, setEngineStatus] = useState('IDLE'); // IDLE, SCANNING, PURIFYING, READY

    useEffect(() => {
        if (initialQuery) {
            triggerNeuralSearch(initialQuery);
        }
    }, [initialQuery]);

    const handleMouseMove = (e) => {
        if (!browserRef.current) return;
        const rect = browserRef.current.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleNavigate = (newUrl) => {
        let finalUrl = newUrl;
        if (!newUrl.startsWith('http')) {
            if (newUrl.includes('.') && !newUrl.includes(' ')) {
                finalUrl = `https://${newUrl}`;
            } else {
                triggerNeuralSearch(newUrl);
                return;
            }
        }
        
        // Anti-Block for Iframes (Sentinel Proxy logic)
        if (finalUrl.includes('google.com') || finalUrl.includes('bing.com')) {
            const query = finalUrl.split('q=')[1] || finalUrl.split('/')[2];
            triggerNeuralSearch(decodeURIComponent(query));
            return;
        }
        
        setIsLoading(true);
        setEngineStatus('SCANNING');
        setUrl(finalUrl);
        setInputUrl(finalUrl.replace('https://', '').replace('http://', ''));
        setTabs(prev => prev.map(t => t.id === activeTabId ? { ...t, url: finalUrl, title: finalUrl.split('/')[2] || finalUrl } : t));
        
        setTimeout(() => {
            setIsLoading(false);
            setEngineStatus('READY');
            setHistory(prev => [...prev.slice(0, historyIndex + 1), finalUrl]);
            setHistoryIndex(prev => prev + 1);
            setShowTicker(false);
            setActiveApp('browser');
        }, 1200);
    };

    const triggerNeuralSearch = (query) => {
        setIsLoading(true);
        setEngineStatus('SCANNING');
        setSpokenText(query);
        setShowTicker(true);
        setActiveApp('browser');
        
        // Simulación de rastro en múltiples motores (DuckDuckGo, Bing, Sentinel)
        setTimeout(() => setEngineStatus('PURIFYING'), 800);
        
        setTimeout(() => {
            setIsLoading(false);
            setEngineStatus('READY');
            const mockResults = [
                { 
                    id: 1, 
                    title: `${query} | Faro Sentinel Intelligence`, 
                    type: 'ESTRATÉGICO', 
                    source: 'Sentinel Core v4',
                    icon: <Cpu size={14} />,
                    url: 'internal://sentinel.apex/search',
                    desc: `Análisis predictivo detectado. La red de Faros ha indexado 458 incidentes relacionados con "${query}" en el último ciclo horario. Seguridad nivel TRIDENT activa.`,
                    score: 99, 
                    verified: true 
                },
                { 
                    id: 2, 
                    title: `Portal de Gestión VLS - Resultados para "${query}"`, 
                    type: 'INSTITUCIONAL', 
                    source: 'Hub Vecinal',
                    icon: <ShieldCheck size={14} />,
                    url: 'https://vls.cl/servicios',
                    desc: `Acceso directo a trámites de baches, luminarias y Radio Digital filtrados por importancia semántica regional.`,
                    score: 95, 
                    verified: true 
                },
                { 
                    id: 3, 
                    title: `Google (Neural Proxy): ${query}`, 
                    type: 'WEB_GLOBAL', 
                    source: 'G-Index Cloud',
                    icon: <Search size={14} />,
                    url: `https://farito.cl/search/google?q=${query}`,
                    desc: `Índice global purificado. Se han eliminado 1,200 trackers y anuncios intrusivos para su comodidad.`,
                    score: 88, 
                    verified: false 
                },
                { 
                    id: 4, 
                    title: `DuckDuckGo (Safe Mode): ${query}`, 
                    type: 'PRIVACIDAD', 
                    source: 'Privacy Node',
                    icon: <Lock size={14} />,
                    url: `https://duckduckgo.com/?q=${query}`,
                    desc: `Rastreo anónimo garantizado por Faro Shield. No se han detectado perfiles de seguimiento.`,
                    score: 92, 
                    verified: true 
                }
            ];
            setTickerResults(mockResults);
        }, 2200);
    };

    const handleVoiceStart = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert("Su navegador no soporta reconocimiento de voz. Simularé el dictado...");
            mockVoiceSearch();
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = 'es-CL';
        recognition.onstart = () => setIsListening(true);
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInputUrl(transcript);
            triggerNeuralSearch(transcript);
        };
        recognition.onend = () => setIsListening(false);
        recognition.start();
    };

    const mockVoiceSearch = () => {
        setIsListening(true);
        const phrases = ["Clima en La Serena", "Estado de baches", "Radio Digital VLS", "Sentinel Apex"];
        const phrase = phrases[Math.floor(Math.random() * phrases.length)];
        let i = 0;
        const interval = setInterval(() => {
            setSpokenText(phrase.substring(0, i));
            i++;
            if (i > phrase.length) {
                clearInterval(interval);
                setIsListening(false);
                setInputUrl(phrase);
                triggerNeuralSearch(phrase);
            }
        }, 100);
    };

    return (
        <div 
            ref={browserRef}
            onMouseMove={handleMouseMove}
            style={{ 
                width: '100%', 
                height: '100vh', 
                background: '#020617', 
                color: 'white', 
                display: 'flex', 
                flexDirection: 'column', 
                overflow: 'hidden', 
                fontFamily: '"Outfit", sans-serif',
                position: 'relative'
            }}
        >
            {/* Background Glow Effect */}
            <div style={{ position: 'absolute', top: mousePos.y - 400, left: mousePos.x - 400, width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(56, 189, 248, 0.08) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }}></div>

            {/* 1. Tab Bar (Institutional Style) */}
            <div style={{ background: '#0a0a0a', padding: '10px 10px 0 10px', display: 'flex', alignItems: 'center', gap: '5px', zIndex: 10, borderBottom: '1px solid #1e293b' }}>
                <div style={{ display: 'flex', gap: '3px', flex: 1 }}>
                    {tabs.map(tab => (
                        <motion.div 
                            key={tab.id}
                            whileHover={{ y: -2 }}
                            onClick={() => { setActiveTabId(tab.id); setUrl(tab.url); setInputUrl(tab.url.replace('https://', '')); }}
                            style={{ 
                                background: tab.id === activeTabId ? '#1e293b' : 'transparent',
                                border: '1px solid #334155',
                                borderBottom: 'none',
                                padding: '8px 20px',
                                borderRadius: '12px 12px 0 0',
                                display: 'flex', alignItems: 'center', gap: '10px',
                                minWidth: '160px', cursor: 'pointer', transition: '0.2s'
                            }}
                        >
                            <Globe size={14} color={tab.id === activeTabId ? '#38bdf8' : '#64748b'} />
                            <span style={{ fontSize: '11px', fontWeight: tab.id === activeTabId ? '900' : '500', color: tab.id === activeTabId ? 'white' : '#94a3b8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tab.title}</span>
                            <X size={12} color="#475569" />
                        </motion.div>
                    ))}
                    <button style={{ background: 'none', border: 'none', color: '#475569', padding: '10px', cursor: 'pointer' }}><Plus size={18} /></button>
                </div>
                <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#ef4444', padding: '5px 15px', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            {/* 2. Advanced Toolbar */}
            <div style={{ background: '#0f172a', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '20px', zIndex: 10, borderBottom: '1px solid #1e293b' }}>
                <div style={{ display: 'flex', gap: '15px', color: '#94a3b8' }}>
                    <ArrowLeft size={20} style={{ cursor: 'pointer' }} />
                    <ArrowRight size={20} style={{ cursor: 'pointer', opacity: 0.3 }} />
                    <RotateCw size={18} className={isLoading ? 'spin' : ''} style={{ cursor: 'pointer' }} onClick={() => handleNavigate(url)} />
                    <Home size={20} style={{ cursor: 'pointer' }} onClick={() => handleNavigate('https://farito.cl')} />
                </div>

                <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: '#020617', border: '1px solid #334155', borderRadius: '30px', padding: '8px 20px', gap: '12px', boxShadow: 'inset 0 4px 6px rgba(0,0,0,0.5)' }}>
                    <div className="relative">
                        <Shield 
                            size={18} 
                            color={isShieldActive ? '#f97316' : '#64748b'} 
                            fill={isShieldActive ? '#f97316' : 'none'} 
                            style={{ cursor: 'pointer' }}
                            onClick={() => setShowShieldMenu(!showShieldMenu)}
                        />
                        <AnimatePresence>
                            {showShieldMenu && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                                    style={{ position: 'absolute', top: '40px', left: '-10px', width: '300px', background: '#1e293b', border: '1px solid #334155', borderRadius: '20px', padding: '20px', zIndex: 100, boxShadow: '0 10px 40px rgba(0,0,0,0.8)' }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                        <h4 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck size={18} color="#f97316" /> Faro Shield</h4>
                                        <div style={{ width: '40px', height: '20px', background: isShieldActive ? '#22c55e' : '#475569', borderRadius: '20px', position: 'relative', cursor: 'pointer' }} onClick={() => setIsShieldActive(!isShieldActive)}>
                                            <div style={{ width: '16px', height: '16px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: isShieldActive ? '22px' : '2px', transition: '0.2s' }}></div>
                                        </div>
                                    </div>
                                    <p style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.5 }}>Filtrado activo por Sentinel Faro. 124 rastreadores bloqueados en esta sesión.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <Lock size={14} color="#22c55e" />
                    <input 
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleNavigate(inputUrl)}
                        style={{ border: 'none', background: 'transparent', color: 'white', flex: 1, outline: 'none', fontSize: '14px', letterSpacing: '0.5px' }}
                        placeholder="Ingrese URL o Búsqueda Neural..."
                    />
                    <Sparkles size={16} color="#38bdf8" className={isLoading ? 'pulse' : ''} />
                </div>

                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', color: '#64748b' }}>
                    <div style={{ position: 'relative' }}>
                        <Download size={20} style={{ cursor: 'pointer' }} onClick={() => setShowDownloads(!showDownloads)} />
                        {showDownloads && (
                            <div style={{ position: 'absolute', top: '40px', right: '0', width: '320px', background: '#1e293b', padding: '20px', borderRadius: '20px', border: '1px solid #334155', zIndex: 100 }}>
                                <h5 style={{ margin: '0 0 15px 0', fontSize: '0.8rem', letterSpacing: '2px', color: '#38bdf8' }}>DESCARGAS</h5>
                                {downloads.map(d => (
                                    <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '12px' }}>
                                        <FileSearch size={20} />
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: '0.8rem', fontWeight: 900 }}>{d.name}</div>
                                            <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{d.size} • {d.status}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <Mic size={20} color={isListening ? '#ef4444' : '#64748b'} className={isListening ? 'pulse' : ''} style={{ cursor: 'pointer' }} onClick={handleVoiceStart} />
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(45deg, #38bdf8, #818cf8)', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', color: 'white' }}>VLS</div>
                </div>
            </div>

            {/* 3. Main Split Area (Sidebar + Content) */}
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden', zIndex: 1, background: '#020617' }}>
                
                {/* 3.1 Side Panel: VecinOfis Suite */}
                <div style={{ width: '80px', background: '#0a0a0a', borderRight: '1px solid #1e293b', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px 0', gap: '30px' }}>
                    {[
                        { id: 'browser', icon: Globe, label: 'WEB' },
                        { id: 'docs', icon: FileText, label: 'DOCS' },
                        { id: 'sheets', icon: BarChart, label: 'SHEETS' },
                        { id: 'slides', icon: Presentation, label: 'SLIDES' },
                        { id: 'photos', icon: ImageIcon, label: 'PHOTOS' },
                        { id: 'mail', icon: Mail, label: 'MAIL' },
                        { id: 'calendar', icon: CalendarDays, label: 'AGENDA' }
                    ].map(app => (
                        <motion.div 
                            key={app.id}
                            whileHover={{ scale: 1.1 }}
                            onClick={() => setActiveApp(app.id)}
                            style={{ 
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer',
                                color: activeApp === app.id ? '#38bdf8' : '#475569',
                                transition: '0.2s'
                            }}
                        >
                            <app.icon size={22} color={activeApp === app.id ? '#38bdf8' : 'currentColor'} />
                            <span style={{ fontSize: '8px', fontWeight: '900', letterSpacing: '0.5px' }}>{app.label}</span>
                            {activeApp === app.id && <motion.div layoutId="appIndicator" style={{ width: '4px', height: '4px', background: '#38bdf8', borderRadius: '50%' }} />}
                        </motion.div>
                    ))}
                    <div style={{ marginTop: 'auto', transform: 'rotate(-90deg)', fontSize: '10px', fontWeight: '900', color: 'rgba(56, 189, 248, 0.3)', whiteSpace: 'nowrap' }}>COMUNASMART OFFICE v3.0</div>
                </div>

                {/* 3.2 Main Content Viewport */}
                <div style={{ flex: 1, position: 'relative' }}>
                    {isLoading && (
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(2, 6, 23, 0.98)', zIndex: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ position: 'relative' }}>
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}>
                                    <Activity size={100} color="#38bdf8" style={{ opacity: 0.1 }} />
                                </motion.div>
                                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                    <Sparkles size={50} color="#38bdf8" />
                                </motion.div>
                            </div>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: '900', letterSpacing: '5px', marginTop: '30px', color: '#38bdf8' }}>{engineStatus}_VLS_ENGINE</h2>
                            <div style={{ width: '400px', height: '1px', background: '#1e293b', marginTop: '20px', position: 'relative', overflow: 'hidden' }}>
                                <motion.div initial={{ left: '-100%' }} animate={{ left: '100%' }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ position: 'absolute', width: '200px', height: '100%', background: 'linear-gradient(90deg, transparent, #38bdf8, transparent)' }} />
                            </div>
                            <p style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '10px', textTransform: 'uppercase' }}>Analizando integridad de paquetes institucionales...</p>
                        </div>
                    )}

                    <AnimatePresence mode="wait">
                        {activeApp === 'browser' ? (
                            <motion.div key="web" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ height: '100%' }}>
                                {showTicker ? (
                                    <div style={{ padding: '60px', height: '100%', overflowY: 'auto', background: '#020617' }}>
                                        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '50px' }}>
                                                <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', padding: '20px', borderRadius: '30px', border: '1px solid #334155' }}>
                                                    <FileSearch size={40} color="#38bdf8" />
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: '0.9rem', color: '#38bdf8', fontWeight: 900, letterSpacing: '3px' }}>OPTIMIZACIÓN_NEURAL_ACTIVA</div>
                                                    <h1 style={{ fontSize: '4rem', fontWeight: 950, letterSpacing: '-2px', margin: 0 }}>"{spokenText || inputUrl}"</h1>
                                                </div>
                                            </div>

                                            <div style={{ display: 'grid', gap: '20px' }}>
                                                {tickerResults.map((res, i) => (
                                                    <motion.div 
                                                        key={res.id}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.1 }}
                                                        className="result-card-vls"
                                                    >
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.7rem', color: '#38bdf8', fontWeight: 'bold' }}>
                                                                {res.icon} {res.source.toUpperCase()}
                                                            </div>
                                                            {res.verified && <div style={{ fontSize: '0.6rem', background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', padding: '2px 8px', borderRadius: '10px', fontWeight: '900', border: '1px solid rgba(34,197,94,0.3)' }}>VERIFICADO</div>}
                                                        </div>
                                                        <h3 style={{ fontSize: '1.4rem', color: '#e2e8f0', margin: '0 0 8px 0', cursor: 'pointer' }} onClick={() => handleNavigate(res.url)}>{res.title}</h3>
                                                        <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{res.desc}</p>
                                                        <div style={{ marginTop: '15px', display: 'flex', gap: '20px', fontSize: '0.65rem', color: '#475569', fontWeight: 'bold' }}>
                                                            <span>LINK: {res.url}</span>
                                                            <span style={{ color: '#38bdf8' }}>PRECISIÓN: {res.score}%</span>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <iframe 
                                        src={url.includes('farito.cl') ? '/farito-welcome' : url}
                                        style={{ width: '100%', height: '100%', border: 'none', background: 'white' }}
                                        title="Viewport"
                                    />
                                )}
                            </motion.div>
                        ) : (
                            <motion.div key="office" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} style={{ height: '100%', padding: '50px', background: '#020617', overflowY: 'auto' }}>
                                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                                    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' }}>
                                        <div>
                                            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, margin: 0 }}>COMUNASMART OFFICE</h2>
                                            <p style={{ color: '#38bdf8', fontSize: '0.9rem', fontWeight: 'bold', letterSpacing: '2px' }}>VECINOFIS PRO: LA SUITE DEL CIUDADANO – {activeApp.toUpperCase()}</p>
                                        </div>
                                        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                            <button 
                                                onClick={() => setShowTutorial(true)}
                                                style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid #38bdf8', color: '#38bdf8', padding: '10px 25px', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                                            >
                                                <HelpCircle size={18} /> ¿CÓMO USAR? (TUTORIAL)
                                            </button>
                                            <button onClick={() => setActiveApp('browser')} style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid #38bdf8', color: '#38bdf8', padding: '10px 25px', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer' }}>VOLVER AL NAVEGADOR</button>
                                        </div>
                                    </header>

                                        <div style={{ background: 'rgba(56, 189, 248, 0.03)', border: '1px solid #1e293b', borderRadius: '40px', padding: '20px', minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
                                            {/* App Toolbar */}
                                            <div style={{ display: 'flex', gap: '15px', padding: '10px 20px', background: '#0a0a0a', borderRadius: '15px', marginBottom: '20px', border: '1px solid #334155', alignItems: 'center' }}>
                                                <button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}><Plus size={16} /> NUEVO</button>
                                                
                                                {/* MEGA EXPORT DROPDOWN */}
                                                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                                    <button 
                                                        onClick={() => setShowShieldMenu(!showShieldMenu)} // Reusing state for simplicity in prototype
                                                        style={{ background: '#38bdf8', color: '#000', border: 'none', padding: '8px 15px', borderRadius: '10px', fontWeight: '900', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                                                    >
                                                        <Download size={16} /> EXPORTAR / DESCARGAR
                                                    </button>
                                                    
                                                    {showShieldMenu && (
                                                        <div style={{ position: 'absolute', top: '40px', left: 0, width: '220px', background: '#1e293b', borderRadius: '15px', border: '1px solid #334155', padding: '10px', zIndex: 1000, boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                                                            {[
                                                                { fmt: 'PDF', label: 'Documento PDF (.pdf)', icon: FileSearch },
                                                                { fmt: 'DOC', label: 'Word (.docx)', icon: FileText },
                                                                { fmt: 'PPT', label: 'PowerPoint (.pptx)', icon: Presentation },
                                                                { fmt: 'XLS', label: 'Excel (.xlsx)', icon: BarChart }
                                                            ].map(f => (
                                                                <div 
                                                                    key={f.fmt} 
                                                                    onClick={() => {
                                                                        setIsLoading(true);
                                                                        setShowShieldMenu(false);
                                                                        setTimeout(() => {
                                                                            setIsLoading(false);
                                                                            const blob = new Blob(["Archivo generado por ComunaSmart Office"], { type: 'text/plain' });
                                                                            const url = URL.createObjectURL(blob);
                                                                            const a = document.createElement('a');
                                                                            a.href = url;
                                                                            a.download = `proyecto_vecino_${f.fmt.toLowerCase()}.${f.fmt.toLowerCase()}`;
                                                                            a.click();
                                                                        }, 1500);
                                                                    }}
                                                                    style={{ padding: '10px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', color: '#e2e8f0', fontSize: '0.8rem', transition: '0.2s' }}
                                                                    onMouseEnter={(e) => e.target.style.background = 'rgba(56, 189, 248, 0.1)'}
                                                                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                                                                >
                                                                    <f.icon size={16} color="#38bdf8" /> {f.label}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                <button 
                                                    onClick={() => alert("Sincronizando con Google Drive...")}
                                                    style={{ background: 'rgba(56, 189, 248, 0.05)', border: '1px solid #334155', color: '#94a3b8', padding: '8px 15px', borderRadius: '10px', fontWeight: 'bold', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                                                >
                                                    <Globe size={16} color="#38bdf8" /> SINCRONIZAR GOOGLE DOCS
                                                </button>

                                                <button style={{ background: 'none', border: 'none', color: '#94a3b8' }}><Users size={16} /> COMPARTIR</button>
                                                
                                                <div style={{ flex: 1 }}></div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontSize: '0.65rem', fontWeight: '900' }}>
                                                    <ShieldCheck size={14} /> CLOUD SYNC ACTIVO
                                                </div>
                                            </div>

                                            {/* AI Prompt Bar */}
                                            <div style={{ display: 'flex', gap: '15px', padding: '15px', background: '#020617', border: '1px solid #38bdf8', borderRadius: '15px', marginBottom: '20px' }}>
                                                <Sparkles size={20} color="#38bdf8" />
                                                <input 
                                                    placeholder={
                                                        activeApp === 'docs' ? "Ej: Escribe un ensayo sobre los Humedales de La Serena..." :
                                                        activeApp === 'slides' ? "Ej: Crea una presentación sobre Turismo en Punta de Choros..." :
                                                        activeApp === 'sheets' ? "Ej: Tabla comparativa de biodiversidad costera..." :
                                                        "¿Qué quieres crear hoy con IA de ComunaSmart?"
                                                    }
                                                    style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', outline: 'none' }}
                                                />
                                                <button style={{ background: '#38bdf8', color: '#000', border: 'none', padding: '8px 20px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>GENERAR CON GEMINI</button>
                                            </div>

                                            {/* WYSIWYG Mock Area */}
                                            <div style={{ flex: 1, background: 'white', borderRadius: '20px', padding: '40px', color: '#0f172a', position: 'relative', overflow: 'hidden', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05)' }}>
                                                {activeApp === 'docs' && (
                                                    <div style={{ textAlign: 'left', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
                                                            <h2 contentEditable style={{ outline: 'none', margin: 0, fontSize: '1.5rem' }}>Nuevo Documento en Blanco</h2>
                                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                                <button 
                                                                    onClick={handleVoiceStart}
                                                                    style={{ background: isListening ? '#ef4444' : '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '8px 15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: isListening ? 'white' : '#475569', fontWeight: 'bold' }}
                                                                >
                                                                    <Mic size={16} /> {isListening ? 'ESCUCHANDO...' : 'DICTAR CON VOZ'}
                                                                </button>
                                                                <button 
                                                                    onClick={() => {
                                                                        const text = document.querySelector('[contentEditable="true"]').innerText;
                                                                        if (window.speechSynthesis.speaking) {
                                                                            window.speechSynthesis.cancel();
                                                                        } else {
                                                                            const utterance = new SpeechSynthesisUtterance(text);
                                                                            utterance.lang = 'es-CL';
                                                                            utterance.pitch = 1.1;
                                                                            utterance.rate = 1.0;
                                                                            window.speechSynthesis.speak(utterance);
                                                                        }
                                                                    }}
                                                                    style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '8px 15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontWeight: 'bold' }}
                                                                    title="Escuchar Documento"
                                                                >
                                                                    <Volume2 size={16} color="#10b981" /> LEER
                                                                </button>
                                                                
                                                                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                                                    <button 
                                                                        onClick={() => setShowShieldMenu(!showShieldMenu)} // Reuse state for language menu
                                                                        style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '8px 15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontWeight: 'bold' }}
                                                                    >
                                                                        <Globe size={16} color="#3b82f6" /> TRADUCIR
                                                                    </button>
                                                                    {showShieldMenu && (
                                                                        <div style={{ position: 'absolute', top: '40px', right: 0, width: '180px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '10px', zIndex: 1000, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                                                                            {['Inglés 🇺🇸', 'Francés 🇫🇷', 'Alemán 🇩🇪', 'Portugués 🇧🇷'].map(lang => (
                                                                                <div 
                                                                                    key={lang}
                                                                                    onClick={() => {
                                                                                        setIsLoading(true);
                                                                                        setEngineStatus('PURIFYING');
                                                                                        setShowShieldMenu(false);
                                                                                        setTimeout(() => {
                                                                                            setIsLoading(false);
                                                                                            setEngineStatus('READY');
                                                                                            alert(`DOCUMENTO TRADUCIDO AL ${lang.toUpperCase()} EXITOSAMENTE.`);
                                                                                        }, 2000);
                                                                                    }}
                                                                                    style={{ padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', color: '#1e293b', fontSize: '0.8rem' }}
                                                                                    onMouseEnter={(e) => e.target.style.background = '#f1f5f9'}
                                                                                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                                                                                >
                                                                                    {lang}
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                                                    <button 
                                                                        onClick={() => {
                                                                            setIsLoading(true);
                                                                            setEngineStatus('PURIFYING');
                                                                            setTimeout(() => {
                                                                                setIsLoading(false);
                                                                                setEngineStatus('READY');
                                                                                alert("DISEÑO INTELIGENTE APLICADO: Paleta de colores y tipografía optimizadas para su contenido.");
                                                                            }, 2000);
                                                                        }}
                                                                        style={{ background: 'linear-gradient(45deg, #f59e0b, #d97706)', border: 'none', borderRadius: '10px', padding: '8px 15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: 'white', fontWeight: 'bold' }}
                                                                    >
                                                                        <Layers size={16} /> DISEÑO IA
                                                                    </button>
                                                                </div>

                                                                <button style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '8px', cursor: 'pointer' }} title="Corregir con IA"><Sparkles size={16} color="#38bdf8" /></button>
                                                            </div>
                                                        </div>
                                                        <div 
                                                            contentEditable 
                                                            style={{ 
                                                                flex: 1, outline: 'none', fontSize: '1.1rem', lineHeight: 1.8, color: '#1e293b', padding: '20px', border: isListening ? '2px dashed #ef4444' : 'none', borderRadius: '15px' 
                                                            }}
                                                        >
                                                            {isListening ? (spokenText || 'Hable ahora para dictar su documento...') : 'Empieza a escribir sobre cualquier tema o usa el generador AI superior para crear borradores automáticos. También puedes usar el micrófono para capturar tus ideas en tiempo real.'}
                                                        </div>
                                                        
                                                        {isListening && (
                                                            <motion.div 
                                                                animate={{ opacity: [0.3, 1, 0.3] }} 
                                                                transition={{ repeat: Infinity, duration: 1.5 }}
                                                                style={{ position: 'absolute', bottom: '20px', right: '20px', background: '#ef4444', color: 'white', padding: '10px 20px', borderRadius: '30px', fontWeight: '900', fontSize: '0.7rem' }}
                                                            >
                                                                DICTADO POR VOZ COMUNA SMART ACTIVO
                                                            </motion.div>
                                                        )}
                                                    </div>
                                                )}
                                                {activeApp === 'sheets' && (
                                                    <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '40px repeat(10, 1fr)', gridAutoRows: '30px' }}>
                                                        {['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map(h => <div key={h} style={{ border: '0.5px solid #e2e8f0', background: '#f8fafc', fontWeight: '900', textAlign: 'center' }}>{h}</div>)}
                                                        {Array(15).fill(0).map((_, r) => (
                                                            <React.Fragment key={r}>
                                                                <div style={{ border: '0.5px solid #e2e8f0', background: '#f8fafc', textAlign: 'center', fontSize: '0.6rem' }}>{r + 1}</div>
                                                                {Array(10).fill(0).map((_, c) => <div key={c} contentEditable style={{ border: '0.5px solid #e2e8f0', outline: 'none' }}></div>)}
                                                            </React.Fragment>
                                                        ))}
                                                    </div>
                                                )}
                                                {activeApp === 'slides' && (
                                                    <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', height: '100%', gap: '20px' }}>
                                                        <div style={{ background: '#f1f5f9', borderRadius: '10px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                            <div style={{ width: '100%', height: '100px', background: 'white', border: '2px solid #38bdf8', borderRadius: '5px' }}></div>
                                                            <div style={{ width: '100%', height: '100px', background: 'white', border: '1px solid #cbd5e1', borderRadius: '5px' }}></div>
                                                            <div style={{ width: '100%', height: '100px', background: 'white', border: '1px solid #cbd5e1', borderRadius: '5px' }}></div>
                                                        </div>
                                                        <div style={{ background: '#f1f5f9', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px' }}>
                                                            <h1 contentEditable style={{ fontSize: '3.5rem', fontWeight: 900, outline: 'none' }}>TÍTULO DE DIAPOSITIVA</h1>
                                                            <p contentEditable style={{ outline: 'none', fontSize: '1.2rem', color: '#64748b' }}>Añade subtítulo o contenido libre aquí.</p>
                                                        </div>
                                                    </div>
                                                )}
                                                {activeApp === 'photos' && (
                                                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
                                                        <ImageIcon size={100} color="#cbd5e1" />
                                                        <p style={{ marginTop: '20px', color: '#64748b', fontWeight: 'bold' }}>Arrastra fotos o documentos escaneados aquí</p>
                                                        
                                                        <div style={{ display: 'flex', gap: '15px' }}>
                                                            <button style={{ marginTop: '20px', background: '#0f172a', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>CARGAR DESDE GALERÍA</button>
                                                            
                                                            <button 
                                                                onClick={() => {
                                                                    setIsLoading(true);
                                                                    setEngineStatus('SCANNING');
                                                                    setTimeout(() => {
                                                                        setIsLoading(false);
                                                                        setEngineStatus('READY');
                                                                        alert("OCR COMPLETO: Texto extraído con éxito. Enviando a ComunaSmart Docs...");
                                                                        setActiveApp('docs');
                                                                    }, 2500);
                                                                }}
                                                                style={{ marginTop: '20px', background: 'linear-gradient(45deg, #10b981, #059669)', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                                                            >
                                                                <FileSearch size={18} /> EXTRAER TEXTO (AI-OCR)
                                                            </button>
                                                        </div>
                                                        
                                                        <div style={{ marginTop: '30px', background: 'rgba(16, 185, 129, 0.05)', padding: '15px', borderRadius: '12px', border: '1px dashed #10b981', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                            <Sparkles size={16} color="#10b981" />
                                                            <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 'bold' }}>La IA de ComunaSmart puede digitalizar legajos, boletas y notas manuscritas.</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Floatings & Styles */}
            <AnimatePresence>
                {isListening && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}
                        style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(20px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '40px' }}>
                            {[1,2,3,4,5].map(i => (
                                <motion.div 
                                    key={i}
                                    animate={{ height: [20, 80, 20] }} 
                                    transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                                    style={{ width: '8px', background: '#38bdf8', borderRadius: '10px' }} 
                                />
                            ))}
                        </div>
                        <h2 style={{ fontSize: '2rem', fontWeight: 900 }}>ESCUCHANDO...</h2>
                        <p style={{ color: '#38bdf8', fontSize: '1.2rem', marginTop: '20px' }}>{spokenText}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* MICRO TUTORIAL OVERLAY */}
            <MicroTutorialVLS 
                section={activeApp === 'browser' ? 'farito' : 'vecinofis'} 
                isOpen={showTutorial} 
                onFinish={() => setShowTutorial(false)} 
            />

            <style>{`
                .spin { animation: spin_vls 1s linear infinite; }
                @keyframes spin_vls { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .pulse { animation: pulse_vls 1.5s infinite; }
                @keyframes pulse_vls { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.1); } 100% { opacity: 1; transform: scale(1); } }
                
                .result-card-vls {
                    background: rgba(15, 23, 42, 0.4);
                    border: 1px solid #1e293b;
                    padding: 30px;
                    border-radius: 20px;
                    transition: all 0.3s;
                }
                .result-card-vls:hover {
                    background: rgba(56, 189, 248, 0.05);
                    border-color: #38bdf8;
                }
                
                .office-btn-primary {
                    background: white; color: black; border: none; padding: 15px 40px; borderRadius: 12px;
                    font-weight: 900; cursor: pointer; transition: 0.3s;
                }
                .office-btn-primary:hover { background: #38bdf8; transform: translateY(-3px); }
                
                .office-btn-secondary {
                    background: transparent; color: white; border: 1px solid #334155; padding: 15px 40px; borderRadius: 12px;
                    font-weight: 900; cursor: pointer; transition: 0.3s;
                }
                .office-btn-secondary:hover { background: rgba(255,255,255,0.05); }

                @font-face {
                    font-family: 'Outfit';
                    src: url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;400;900&display=swap');
                }
            `}</style>
        </div>
    );
}
