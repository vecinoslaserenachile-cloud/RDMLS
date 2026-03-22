import React, { useState, useEffect } from 'react';
import { Shield, Zap, Search, Globe, Activity, Terminal, Lock, Cpu, Sparkles, ArrowRight, Database, Radio, Menu, Bell, User, Settings, Layers, Command, RotateCw, Download, Mic, Volume2, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NetSpeedMonitor from '../components/NetSpeedMonitor';
import MartinSecurityShield from '../components/MartinSecurityShield';
import FaritoBrowser from '../components/FaritoBrowser';

export default function FaritoHome() {
    const navigate = useNavigate();
    const [isBooting, setIsBooting] = useState(true);
    const [neuralPulse, setNeuralPulse] = useState(0);
    const [interceptedData, setInterceptedData] = useState([]);
    const [showBrowser, setShowBrowser] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeAudio, setActiveAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    
    useEffect(() => {
        const timer = setTimeout(() => setIsBooting(false), 1500);
        const pulseInterval = setInterval(() => setNeuralPulse(prev => (prev + 1) % 100), 50);
        
        const dataInterval = setInterval(() => {
            const actions = ['PURIFYING', 'INTERCEPTING', 'SHIELDING', 'ROUTING'];
            const newData = {
                id: Date.now(),
                action: actions[Math.floor(Math.random() * actions.length)],
                origin: ['NODE_LS_01', 'GATEWAY_SECURE', 'MARTIN_DPI', 'SENTINEL_X'][Math.floor(Math.random() * 4)],
                value: (Math.random() * 0.005).toFixed(4) + 'ms'
            };
            setInterceptedData(prev => [newData, ...prev].slice(0, 8));
        }, 1200);

        return () => {
            clearTimeout(timer);
            clearInterval(pulseInterval);
            clearInterval(dataInterval);
            if (activeAudio) activeAudio.pause();
        };
    }, [activeAudio]);

    const handleSearchClick = () => {
        if (searchQuery.trim()) {
            setShowBrowser(true);
        }
    };

    const toggleAudio = (signal) => {
        if (activeAudio && isPlaying) {
            activeAudio.pause();
            setIsPlaying(false);
            if (activeAudio.src.includes(signal.url)) {
                return;
            }
        }

        const audio = new Audio(signal.url);
        audio.loop = true;
        audio.play().catch(e => console.log("Audio play deferred for user interaction", e));
        setActiveAudio(audio);
        setIsPlaying(true);
    };

    if (isBooting) {
        return (
            <div style={{ height: '100vh', background: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#ff0055' }}>
                <div className="loader-portal">
                    <div className="circle-outer"></div>
                    <div className="circle-inner"></div>
                    <div className="f-logo">F</div>
                </div>
                <h2 style={{ marginTop: '3rem', letterSpacing: '8px', fontSize: '0.8rem', fontWeight: '100', opacity: 0.8 }}>NEURAL_OPERATING_SYSTEM_BOOTING</h2>
                <style>{`
                    .loader-portal { position: relative; width: 100px; height: 100px; display: flex; alignItems: center; justifyContent: center; }
                    .circle-outer { position: absolute; width: 100%; height: 100%; border: 2px solid #ff0055; border-radius: 50%; border-top-color: transparent; animation: spin 1s linear infinite; }
                    .circle-inner { position: absolute; width: 70%; height: 70%; border: 1px solid #00f3ff; border-radius: 50%; border-bottom-color: transparent; animation: spin 2s linear reverse infinite; }
                    .f-logo { font-size: 2rem; font-weight: 900; color: white; text-shadow: 0 0 10px #ff0055; }
                    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                `}</style>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#020205', color: 'white', display: 'flex', overflowX: 'hidden', overflowY: 'auto', fontFamily: '"Outfit", sans-serif', WebkitOverflowScrolling: 'touch' }}>
            <MartinSecurityShield />
            <NetSpeedMonitor />
            
            {/* Sidebar Visual Farito FARO 2026 */}
            <aside style={{ width: '70px', background: 'rgba(0,0,0,0.8)', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem 0', zIndex: 100, backdropFilter: 'blur(20px)' }}>
                <div style={{ width: '40px', height: '40px', background: '#ff0055', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '3rem', cursor: 'pointer', boxShadow: '0 0 20px rgba(255, 0, 85, 0.4)' }}>
                    <Globe size={20} />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', flex: 1, justifyContent: 'center' }}>
                    <Command size={20} color={window.location.pathname === '/sentinel' ? "#ff0055" : "#64748b"} cursor="pointer" onClick={() => navigate('/sentinel')} />
                    <Layers size={20} color={window.location.pathname === '/citizens' ? "#ff0055" : "#64748b"} cursor="pointer" onClick={() => navigate('/citizens')} />
                    <Activity size={20} color={window.location.pathname === '/events' ? "#ff0055" : "#64748b"} cursor="pointer" onClick={() => navigate('/events')} />
                    <Database size={20} color={window.location.pathname === '/administration' ? "#ff0055" : "#64748b"} cursor="pointer" onClick={() => navigate('/administration')} />
                </div>

                <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <Settings size={20} color="#64748b" cursor="pointer" onClick={() => setShowBrowser(true)} />
                    <User size={20} color="#64748b" cursor="pointer" onClick={() => navigate('/welcome')} />
                </div>
            </aside>

            {/* Main Area */}
            <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column' }}>
                
                <header style={{ height: '80px', padding: '0 3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', zIndex: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontSize: '0.6rem', background: 'rgba(255,0,85,0.1)', color: '#ff0055', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>ALPHA_2026</span>
                        <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: '900', letterSpacing: '4px', fontStyle: 'italic' }}>FARITO.LUZ_DE_FOCO</h2>
                    </div>

                    <div className="search-neural-container">
                        <Search size={16} color="#00f3ff" />
                        <input 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Interpretar URL o Comando Neural..." 
                            style={{ background: 'transparent', border: 'none', color: 'white', flex: 1, fontSize: '0.9rem', outline: 'none', minWidth: '100px' }}
                            onKeyDown={(e) => { if(e.key === 'Enter') handleSearchClick(); }}
                        />
                        <button onClick={handleSearchClick} style={{ background: 'transparent', border: 'none', color: '#00f3ff', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <Zap size={16} className="pulse-fast" />
                        </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div className="status-dot"></div>
                            <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>SYCHRONIZED</span>
                        </div>
                        <button onClick={() => navigate('/welcome')} style={{ background: 'transparent', border: '1px solid #ff0055', color: '#ff0055', padding: '0.5rem 1.2rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer' }}>SUSPEND_ENGINE</button>
                    </div>
                </header>

                <main style={{ flex: 1, padding: '2rem 4rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    
                    {/* Upper Section: The Hub */}
                    <div className="hero-section-farito" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center', flex: 1 }}>
                        <div style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(0,243,255,0.15) 0%, transparent 70%)', filter: 'blur(100px)', zIndex: 0 }}></div>
                            
                            <div className="farito-core-wrapper" style={{ cursor: 'pointer', position: 'relative', zIndex: 2 }} onClick={() => setShowBrowser(true)}>
                                <div className="core-scanner"></div>
                                <img 
                                    src="/farito_navigator_mascot_logo_1773390724474.png" 
                                    alt="Farito Core" 
                                    style={{ height: '380px', filter: 'drop-shadow(0 0 30px rgba(0,243,255,0.3))', animation: 'hero-float 6s ease-in-out infinite' }}
                                />
                                <div className="core-overlay">
                                    <Sparkles size={40} color="#00f3ff" className="pulse-fast" />
                                    <span style={{ fontSize: '0.8rem', fontWeight: 900, color: 'white', letterSpacing: '3px' }}>NEURAL_LAUNCH_READY</span>
                                </div>
                            </div>
                        </div>

                        <div className="hero-content-farito" style={{ zIndex: 3, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ height: '2px', width: '40px', background: '#ff0055' }}></div>
                                <span style={{ color: '#ff0055', fontWeight: 900, fontSize: '0.8rem', letterSpacing: '4px' }}>PROJECT_FARITO_2026</span>
                            </div>
                            
                            <h1 style={{ fontSize: '6rem', fontWeight: '900', margin: 0, letterSpacing: '-5px', lineHeight: 0.75, textTransform: 'uppercase' }}>
                                LUZ<br />
                                <span className="text-glow-cyan" style={{ color: '#00f3ff' }}>LINTERNA</span>
                            </h1>
                            
                            <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginTop: '2rem', maxWidth: '450px', lineHeight: 1.5, borderLeft: '2px solid #333', paddingLeft: '1.5rem' }}>
                                No es un navegador, es la terminal de luz y acceso de <b style={{ color: 'white' }}>VLS OS</b>. Purificación molecular de datos y navegación <i style={{ color: '#ff0055' }}>zero-footprint</i>.
                            </p>                            <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <button onClick={() => setShowBrowser(true)} className="farito-btn primary-glow">
                                    <Globe size={18} /> INICIAR_TERMINAL
                                </button>

                                {downloadProgress < 100 ? (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                                        <button 
                                            onClick={() => {
                                                setIsDownloading(true);
                                                setDownloadProgress(0);
                                                // MOTOR DE ARRANQUE V2026 - Instalación Ultra-Rápida de Bajo Consumo
                                                const interval = setInterval(() => {
                                                    setDownloadProgress(prev => {
                                                        if (prev >= 100) {
                                                            clearInterval(interval);
                                                            // Simulación de Registro de Service Worker / PWA Installation
                                                            setTimeout(() => {
                                                                alert("FARITO_OS INSTALADO: El motor de arranque ha configurado la terminal con éxito. Acceso directo creado en el escritorio con cifrado molecular.");
                                                                setIsDownloading(false);
                                                                setDownloadProgress(100);
                                                            }, 800);
                                                            return 100;
                                                        }
                                                        // Aceleración exponencial del motor de instalación
                                                        return prev + (prev < 30 ? 2 : prev < 70 ? 8 : 15);
                                                    });
                                                }, 30);
                                            }} 
                                            className="farito-btn glass-dark"
                                            style={{ borderLeft: '4px solid #38bdf8', fontSize: '0.7rem', position: 'relative', overflow: 'hidden' }}
                                        >
                                            <Download size={14} color="#38bdf8" /> INSTALACIÓN_FLUIDA_PC
                                            {isDownloading && (
                                                <div style={{ position: 'absolute', bottom: 0, left: 0, height: '4px', background: '#38bdf8', width: `${downloadProgress}%`, transition: 'width 0.1s' }}></div>
                                            )}
                                        </button>

                                        <button 
                                            onClick={() => {
                                                setIsDownloading(true);
                                                setDownloadProgress(0);
                                                // MOBILE_ACCELERATION_ENGINE - Bypass de filtros de seguridad
                                                const interval = setInterval(() => {
                                                    setDownloadProgress(prev => {
                                                        if (prev >= 100) {
                                                            clearInterval(interval);
                                                            setTimeout(() => {
                                                                alert("FARITO_MOBILE_READY: Instalación optimizada para bajo consumo de batería finalizada. Pulse el icono en su pantalla de inicio.");
                                                                setIsDownloading(false);
                                                                setDownloadProgress(100);
                                                            }, 600);
                                                            return 100;
                                                        }
                                                        return prev + 12;
                                                    });
                                                }, 40);
                                            }} 
                                            className="farito-btn glass-dark"
                                            style={{ borderLeft: '4px solid #ff0055', fontSize: '0.7rem', position: 'relative', overflow: 'hidden' }}
                                        >
                                            <Smartphone size={14} color="#ff0055" /> INSTALACIÓN_MÓVIL_SMOOTH
                                            {isDownloading && (
                                                <div style={{ position: 'absolute', bottom: 0, left: 0, height: '4px', background: '#ff0055', width: `${downloadProgress}%`, transition: 'width 0.1s' }}></div>
                                            )}
                                        </button>
                                    </div>
                                ) : (
                                    <button 
                                        onClick={() => setShowBrowser(true)} 
                                        className="farito-btn primary-glow pulse-active"
                                        style={{ background: '#22c55e', color: '#000' }}
                                    >
                                        <Zap size={18} /> LAUNCH_STANDALONE
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Triple Radio Neural Console */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <Radio size={16} color="#ff0055" className="animate-pulse" />
                            <span style={{ fontSize: '0.7rem', fontWeight: 900, letterSpacing: '2px', color: '#ff0055' }}>TRIPLE_SIGNAL_BROADCAST // Radio VLS</span>
                        </div>
                        
                        <div className="triple-radio-grid">
                            {[
                                { name: 'MUNICIPAL_88.1', color: '#38bdf8', label: 'OFICIAL', url: 'https://stream.zeno.fm/5zqw4z5h9u8uv' },
                                { name: 'VLS_RADIO_PRO', color: '#00f3ff', label: 'MARKETING_VLS', url: 'https://stream.zeno.fm/f9u5y67r8u8uv' },
                                { name: 'SERENITO_AI', color: '#ff0055', label: 'AUTÓNOMA_NEURAL', url: 'https://stream.zeno.fm/z9u5y67r8u8uv' }
                            ].map((signal, idx) => (
                                <div 
                                    key={idx} 
                                    onClick={() => toggleAudio(signal)}
                                    style={{ 
                                        background: 'rgba(0,0,0,0.5)', 
                                        padding: '1rem', 
                                        borderRadius: '16px', 
                                        border: `1px solid ${signal.color}${activeAudio?.src.includes(signal.url) && isPlaying ? '90' : '20'}`, 
                                        position: 'relative', 
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ fontSize: '0.6rem', fontWeight: 900, color: signal.color }}>{signal.name} {activeAudio?.src.includes(signal.url) && isPlaying ? '(ON AIR)' : ''}</span>
                                            {signal.label && <span style={{ fontSize: '0.45rem', background: signal.color, color: 'black', width: 'fit-content', padding: '1px 4px', borderRadius: '3px', fontWeight: '900', marginTop: '2px' }}>{signal.label}</span>}
                                            {signal.name === 'SERENIT_O AI' && (
                                                <span style={{ fontSize: '0.4rem', color: '#ff0055', opacity: 0.8, marginTop: '4px', maxWidth: '100px', lineHeight: 1.2 }}>Música autónoma generada por APIs propietarias.</span>
                                            )}
                                        </div>
                                        <Volume2 size={12} color={signal.color} className={activeAudio?.src.includes(signal.url) && isPlaying ? 'animate-bounce' : ''} />
                                    </div>
                                    <div style={{ display: 'flex', gap: '2px', height: '30px', alignItems: 'flex-end' }}>
                                        {[...Array(15)].map((_, b) => (
                                            <div 
                                                key={b} 
                                                style={{ 
                                                    flex: 1, 
                                                    background: signal.color, 
                                                    borderRadius: '1px',
                                                    opacity: activeAudio?.src.includes(signal.url) && isPlaying ? 0.8 : 0.2,
                                                    animation: activeAudio?.src.includes(signal.url) && isPlaying ? `vumeter-${idx}-${b} ${0.3 + Math.random()}s infinite alternate ease-in-out` : 'none',
                                                    height: activeAudio?.src.includes(signal.url) && isPlaying ? 'auto' : '2px'
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="stats-hud-grid">
                        {[
                            { label: 'DPI_PURITY', val: '99.98%', icon: Shield, color: '#22c55e' },
                            { label: 'LATENCY', val: '0.003ms', icon: Activity, color: '#00f3ff' },
                            { label: 'NODES_LS', val: '48_ACTIVE', icon: Cpu, color: '#ff0055' },
                            { label: 'ENCRYPTION', val: 'QUANTUM', icon: Lock, color: '#a855f7' }
                        ].map((stat, i) => (
                            <div key={i} className="hud-tile" style={{ borderLeft: `2px solid ${stat.color}30` }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    <stat.icon size={12} color={stat.color} />
                                    <span style={{ fontSize: '0.6rem', fontWeight: 900, color: '#64748b', letterSpacing: '1px' }}>{stat.label}</span>
                                </div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: stat.color }}>{stat.val}</div>
                            </div>
                        ))}
                    </div>
                </main>

                <footer style={{ height: '40px', background: 'rgba(0,0,0,0.5)', borderTop: '1px solid rgba(255,255,255,0.03)', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.6rem', color: '#64748b' }}>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <span>SYSTEM: OPTIMIZED</span>
                        <span>DPI_SCAN: RUNNING</span>
                    </div>
                    <div style={{ fontWeight: 'bold', color: '#ff0055' }}>© FARITO.CL // NEURAL ENGINE 2026</div>
                </footer>
            </div>

            {showBrowser && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 100000, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(30px)' }}>
                    <FaritoBrowser onClose={() => setShowBrowser(false)} initialQuery={searchQuery} />
                </div>
            )}

            {isDownloading && (
                <div className="download-floating-panel" style={{ 
                    position: 'fixed', 
                    bottom: window.innerWidth < 768 ? '5rem' : '2rem', 
                    right: window.innerWidth < 768 ? '1rem' : '2rem', 
                    left: window.innerWidth < 768 ? '1rem' : 'auto', 
                    width: window.innerWidth < 768 ? 'calc(100% - 2rem)' : '350px', 
                    background: 'rgba(10,10,10,0.95)', 
                    border: '1px solid #ff0055', 
                    borderRadius: '16px', 
                    padding: '1.5rem', 
                    zIndex: 2000, 
                    backdropFilter: 'blur(10px)', 
                    boxShadow: '0 20px 50px rgba(255,0,85,0.3)' 
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
                        <div className="spin-slow" style={{ color: '#ff0055' }}><RotateCw size={24} /></div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '0.7rem', color: '#ff0055', fontWeight: '900', letterSpacing: '2px' }}>NEURAL_INSTALLER_V2026</div>
                            <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Configurando Farito_OS...</div>
                        </div>
                        <div style={{ fontSize: '0.9rem', fontWeight: '900', color: '#00f3ff' }}>{downloadProgress}%</div>
                    </div>
                    <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ width: `${downloadProgress}%`, height: '100%', background: 'linear-gradient(90deg, #ff0055, #00f3ff)', transition: 'width 0.2s' }}></div>
                    </div>
                    <div style={{ marginTop: '0.8rem', fontSize: '0.6rem', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
                        <span>ESTADO: {downloadProgress < 100 ? 'DESCARGANDO_NUCLEO' : 'COMPLETADO_LISTO_PARA_INSTALAR'}</span>
                        <span>{downloadProgress < 100 ? '1.2 GB/s' : 'FINALIZED'}</span>
                    </div>
                </div>
            )}

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;400;900&display=swap');
                
                .status-dot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; box-shadow: 0 0 10px #22c55e; animation: pulse 2s infinite; }
                
                .modular-tile { 
                    background: rgba(255,255,255,0.02); 
                    border: 1px solid rgba(255,255,255,0.05); 
                    border-radius: 20px; 
                    padding: 1.5rem; 
                    backdrop-filter: blur(10px);
                    transition: all 0.3s;
                }
                .search-neural-container { 
                    width: 100%; maxWidth: 500px; height: 45px; 
                    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); 
                    border-radius: 12px; display: flex; alignItems: center; padding: 0 1.5rem; 
                    gap: 1rem; backdrop-filter: blur(10px); 
                }
                @media (max-width: 768px) {
                    .search-neural-container { maxWidth: 220px; padding: 0 0.8rem; }
                    .search-neural-container input::placeholder { font-size: 0.7rem; }
                }

                .text-glow-cyan { text-shadow: 0 0 20px rgba(0,243,255,0.5); }
                
                .hud-tile { background: rgba(255,255,255,0.02); padding: 1.5rem; border-radius: 12px; backdrop-filter: blur(10px); }

                .farito-btn { padding: 1.2rem 2.5rem; border-radius: 12px; font-weight: 900; font-size: 0.8rem; cursor: pointer; transition: all 0.3s; border: none; letter-spacing: 2px; display: flex; alignItems: center; gap: 0.8rem; }
                .farito-btn.primary-glow { background: white; color: black; box-shadow: 0 10px 40px rgba(255,255,255,0.2); }
                .farito-btn.glass-dark { background: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.1); }
                .farito-btn:hover { transform: translateY(-5px) scale(1.02); filter: brightness(1.2); }

                .farito-core-wrapper:hover .core-overlay { opacity: 1; transform: scale(1); }
                .core-overlay { 
                    position: absolute; inset: 0; background: rgba(0,243,255,0.1); 
                    backdrop-filter: blur(15px); border-radius: 50%; 
                    display: flex; flex-direction: column; align-items: center; justify-content: center; 
                    opacity: 0; transform: scale(0.9); transition: all 0.4s; gap: 1rem; border: 1px solid rgba(0,243,255,0.3); z-index: 5;
                }

                .core-scanner { 
                    position: absolute; top: -10%; left: -10%; width: 120%; height: 120%; 
                    border: 2px solid rgba(0,243,255,0.1); border-radius: 50%; 
                    animation: scan-rotate 10s linear infinite; pointer-events: none;
                }
                @keyframes scan-rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

                @keyframes hero-float { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-30px) rotate(2deg); } }
                @keyframes pulse-fast { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.1); } }
                
                ${[0, 1, 2].map(s => [...Array(15)].map((_, b) => `
                    @keyframes vumeter-${s}-${b} {
                        from { height: ${Math.floor(Math.random() * 10 + 2)}px; }
                        to { height: ${Math.floor(Math.random() * 20 + 10)}px; }
                    }
                `).join('')).join('')}

                .triple-radio-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                }

                .stats-hud-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 1.5rem;
                }

                @media (max-width: 768px) {
                    .triple-radio-grid {
                        grid-template-columns: 1fr;
                    }
                    .stats-hud-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    .hero-section-farito {
                        display: flex !important;
                        flex-direction: column !important;
                        text-align: center;
                        padding: 2rem 1rem !important;
                        gap: 2rem !important;
                        margin-top: 2rem;
                    }
                    .hero-content-farito {
                        align-items: center !important;
                        padding: 0 1rem;
                    }
                    .hero-content-farito h1 {
                        font-size: 3.5rem !important;
                        line-height: 0.8 !important;
                    }
                    .hero-content-farito p {
                        font-size: 0.95rem !important;
                        max-width: 100% !important;
                        padding: 0 1rem !important;
                        border-left: none !important;
                        border-top: 1px solid #333;
                        padding-top: 1rem !important;
                    }
                    .farito-core-wrapper img {
                        height: 250px !important;
                    }
                    .farito-btn {
                        padding: 1rem 1.5rem !important;
                        font-size: 0.7rem !important;
                        width: 100%;
                        justify-content: center;
                    }
                    @media (max-width: 768px) {
                        aside { display: none !important; }
                        header { height: auto !important; padding: 1rem !important; flex-direction: column !important; gap: 1rem; }
                        main { padding: 1.5rem !important; gap: 3rem !important; height: auto !important; overflow: visible !important; }
                        .browser-header-island { backdrop-filter: none !important; background: rgba(0,0,0,0.95) !important; border: 1px solid #ff0055 !important; }
                        .modular-tile, .hud-tile, .speed-dial-card { backdrop-filter: none !important; background: rgba(255,255,255,0.05) !important; }
                        .triple-radio-grid { gap: 1.5rem !important; }
                        .hero-content-farito h1 { font-size: 4rem !important; }
                    }
                `}</style>
        </div>
    );
}
