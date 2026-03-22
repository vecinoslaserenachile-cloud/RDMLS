import React, { useState, useEffect, useRef } from 'react';
import { 
    X as CloseIcon, Radio, Tv, Music, 
    Image as ImageIcon, Folder, Bluetooth, Settings, 
    Volume2, Volume1, VolumeX, SkipBack, SkipForward, 
    Play, Pause, Power, Maximize2, Minimize2, 
    ChevronLeft, ChevronRight, Activity, Zap, ShieldCheck,
    MessageSquare, Newspaper, Ghost, Sparkles, AlertTriangle
} from 'lucide-react';

export default function VLSConsoleSound({ onClose, onOpenRadio, onOpenTV }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isPowerOn, setIsPowerOn] = useState(true);
    const [volume, setVolume] = useState(20);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isMuted, setIsMuted] = useState(false);
    const [activeTab, setActiveTab] = useState('main'); // main, pillars, settings

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => {
            clearInterval(timer);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const togglePower = () => setIsPowerOn(!isPowerOn);

    if (!isExpanded) {
        return (
            <div 
                onClick={() => setIsExpanded(true)}
                style={{
                    position: 'fixed', 
                    left: isMobile ? '50%' : '20px', 
                    top: isMobile ? 'auto' : '50%', 
                    bottom: isMobile ? '20px' : 'auto',
                    transform: isMobile ? 'translateX(-50%)' : 'translateY(-50%)',
                    zIndex: 100001, 
                    cursor: 'pointer', 
                    transition: 'all 0.4s'
                }}
            >
                <div style={{
                    width: isMobile ? '140px' : '65px', 
                    height: isMobile ? '45px' : '200px', 
                    background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
                    borderRadius: '35px', 
                    border: '2px solid #ef4444', 
                    display: 'flex', 
                    flexDirection: isMobile ? 'row' : 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: isMobile ? '15px' : '15px',
                    boxShadow: '0 0 30px rgba(239, 68, 68, 0.5)', 
                    borderBottom: isMobile ? '4px solid #ef4444' : 'none',
                    borderLeft: isMobile ? 'none' : '4px solid #ef4444'
                }}>
                    <Radio size={isMobile ? 22 : 28} color="#ef4444" className="pulse-slow" />
                    <div style={{ writingMode: isMobile ? 'horizontal-tb' : 'vertical-rl', fontSize: '0.65rem', fontWeight: 900, color: '#ef4444', letterSpacing: '2px' }}>VLSOUND</div>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-scale-in" style={{
            position: 'fixed', 
            left: isMobile ? '0' : '20px', 
            top: isMobile ? '0' : '50%', 
            transform: isMobile ? 'none' : 'translateY(-50%)',
            zIndex: 100001, 
            width: isMobile ? '100vw' : '900px', 
            height: isMobile ? '100vh' : '500px',
            background: 'rgba(2, 6, 23, 0.95)', 
            borderRadius: isMobile ? '0' : '32px', 
            border: isMobile ? 'none' : '1px solid rgba(56, 189, 248, 0.3)',
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            overflow: 'hidden',
            boxShadow: '0 50px 100px rgba(0,0,0,0.95)',
            fontFamily: "'Inter', sans-serif",
            backdropFilter: 'blur(20px)'
        }}>
            
            {/* Sidebar Branding & Power */}
            <div style={{ 
                width: isMobile ? '100%' : '260px', 
                background: 'linear-gradient(180deg, #1e293b 0%, #020617 100%)', 
                display: 'flex', 
                flexDirection: isMobile ? 'row' : 'column', 
                padding: '30px 20px',
                justifyContent: 'space-between', 
                alignItems: isMobile ? 'center' : 'stretch',
                borderRight: isMobile ? 'none' : '1px solid rgba(255,255,255,0.05)',
                flexShrink: 0
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', flex: 1 }}>
                    <div style={{ textAlign: isMobile ? 'left' : 'center' }}>
                        <div style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 900, fontStyle: 'italic', letterSpacing: '2px', textShadow: '0 0 15px #ef444455' }}>vlsound</div>
                        <div style={{ color: '#ef4444', fontSize: '0.6rem', fontWeight: 'bold', letterSpacing: '3px' }}>EXTENDED CONSOLE</div>
                    </div>

                    {/* Serenito Avatar Area */}
                    {!isMobile && (
                        <div style={{ position: 'relative', height: '180px', background: 'rgba(0,0,0,0.3)', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img src="/serenito_v3.png" style={{ height: '140px', filter: 'drop-shadow(0 0 10px rgba(56, 189, 248, 0.3))' }} alt="Serenito" />
                            <div style={{ position: 'absolute', bottom: '10px', left: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <div className="pulse-slow" style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%' }}></div>
                                <span style={{ fontSize: '0.6rem', color: '#10b981', fontWeight: 'bold' }}>HOST IA: ONLINE</span>
                            </div>
                        </div>
                    )}

                    {!isMobile && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>POWER STATUS</span>
                                <button onClick={togglePower} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                    <Power size={24} color={isPowerOn ? "#ef4444" : "#333"} style={{ filter: isPowerOn ? 'drop-shadow(0 0 10px #ef4444)' : 'none' }} />
                                </button>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>CONSOLA MASTER VOLUME</span>
                                <input 
                                    type="range" min="0" max="100" value={volume} 
                                    onChange={(e) => {
                                        const v = e.target.value;
                                        setVolume(v);
                                        window.dispatchEvent(new CustomEvent('vls-set-volume', { detail: v }));
                                    }}
                                    style={{ width: '100%', accentColor: '#ef4444', height: '10px', borderRadius: '5px', cursor: 'pointer' }}
                                />
                            </div>
                        </div>
                    )}

                    {isMobile && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '12px' }}>
                             <button onClick={togglePower} style={{ background: 'none', border: 'none' }}>
                                <Power size={20} color={isPowerOn ? "#ef4444" : "#333"} />
                             </button>
                             <input 
                                type="range" min="0" max="100" value={volume} 
                                onChange={(e) => {
                                    const v = e.target.value;
                                    setVolume(v);
                                    window.dispatchEvent(new CustomEvent('vls-set-volume', { detail: v }));
                                }}
                                style={{ width: '60%', accentColor: '#ef4444' }}
                             />
                             <div style={{ fontSize: '0.8rem', color: 'white fw-bold' }}>{volume}%</div>
                        </div>
                    )}
                </div>

                <div style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: '15px', marginTop: 'auto', width: '100%' }}>
                    <button 
                        onClick={() => setIsExpanded(false)} 
                        className="btn-glass"
                        style={{ flex: 1, padding: '12px', background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', border: '1px solid #38bdf8', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 'bold' }}
                    >
                        <Minimize2 size={18} /> RETRAER
                    </button>
                    <button 
                        onClick={onClose} 
                        className="btn-glass"
                        style={{ flex: 1, padding: '12px', background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid #ef4444', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 'bold' }}
                    >
                        <CloseIcon size={18} /> CERRAR
                    </button>
                </div>
            </div>

            {/* Main LCD Interface */}
            <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
                
                {/* Top Nav Tabs */}
                {isPowerOn && (
                    <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '15px' }}>
                        {[
                            { id: 'main', icon: Zap, label: 'CENTRAL' },
                            { id: 'radio', icon: Radio, label: 'RADIO' },
                            { id: 'tv', icon: Tv, label: 'VLS_TV' },
                            { id: 'intel', icon: Activity, label: 'FARITO_INTEL' }
                        ].map(tab => (
                            <button 
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{ 
                                    background: activeTab === tab.id ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                                    border: 'none',
                                    padding: '8px 16px',
                                    borderRadius: '10px',
                                    color: activeTab === tab.id ? '#38bdf8' : '#64748b',
                                    fontSize: '0.75rem',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    cursor: 'pointer',
                                    transition: '0.3s'
                                }}
                            >
                                <tab.icon size={14} /> {tab.label}
                            </button>
                        ))}
                    </div>
                )}

                <div style={{ flex: 1, background: '#020617', borderRadius: '24px', position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                    {isPowerOn ? (
                        <div style={{ padding: '25px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                            {activeTab === 'main' && (
                                <div className="animate-fade-in">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
                                        <div>
                                            <h3 style={{ color: 'white', margin: 0, fontSize: '1.2rem' }}>SMART HUB v5.2</h3>
                                            <span style={{ color: '#38bdf8', fontSize: '0.7rem' }}>CONECTADO A VECINOSLASERENA.CL</span>
                                        </div>
                                        <div style={{ textAlign: 'right', color: '#94a3b8', fontSize: '0.8rem' }}>
                                            <div style={{ fontWeight: 'bold' }}>{currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                                            <div style={{ fontSize: '0.6rem' }}>RD_VLS_SYSTEM_OK</div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '15px' }}>
                                        {[
                                            { id: 'r1', icon: Radio, col: '#ef4444', label: 'RADIO MASTER', action: () => window.dispatchEvent(new CustomEvent('open-radio-master')) },
                                            { id: 'tv1', icon: Tv, col: '#f97316', label: 'TV VECINAL', action: onOpenTV },
                                            { id: 'ia1', icon: Sparkles, col: '#10b981', label: 'NOTICIAS IA', action: () => window.dispatchEvent(new CustomEvent('open-broadcaster')) },
                                            { id: 'sh1', icon: ShieldCheck, col: '#3b82f6', label: 'SENTINEL', action: () => window.dispatchEvent(new CustomEvent('open-social-vision')) },
                                            { id: 'rep1', icon: MessageSquare, col: '#06b6d4', label: 'REPORTES', action: () => window.dispatchEvent(new CustomEvent('open-review-portal')) },
                                            { id: 'inf1', icon: Folder, col: '#eab308', label: 'GESTIÓN', action: () => window.dispatchEvent(new CustomEvent('open-smart-admin')) },
                                            { id: 'map1', icon: Zap, col: '#ec4899', label: 'MAPA VLS', action: () => window.dispatchEvent(new CustomEvent('open-distances')) },
                                            { id: 'set1', icon: Settings, col: '#64748b', label: 'MANTENCIÓN', action: null, disabled: true }
                                        ].map(btn => (
                                            <button 
                                                key={btn.id}
                                                onClick={btn.action}
                                                className="btn-console"
                                                disabled={btn.disabled}
                                                style={{ 
                                                    background: 'rgba(255,255,255,0.03)', 
                                                    border: '1px solid rgba(255,255,255,0.08)', 
                                                    borderRadius: '20px', 
                                                    padding: '15px', 
                                                    display: 'flex', 
                                                    flexDirection: 'column', 
                                                    alignItems: 'center', 
                                                    gap: '10px',
                                                    cursor: btn.disabled ? 'not-allowed' : 'pointer',
                                                    opacity: btn.disabled ? 0.3 : 1
                                                }}
                                            >
                                                <div style={{ background: btn.col, padding: '12px', borderRadius: '15px', color: 'white', boxShadow: `0 10px 20px ${btn.col}33`, filter: btn.disabled ? 'grayscale(1)' : 'none' }}>
                                                    <btn.icon size={20} />
                                                </div>
                                                <span style={{ fontSize: '0.65rem', color: '#fff', fontWeight: 'bold' }}>{btn.label}</span>
                                            </button>
                                        ))}
                                    </div>

                                    {/* System Status Feed */}
                                    {!isMobile && (
                                        <div style={{ marginTop: '25px', padding: '15px', background: 'rgba(0,0,0,0.5)', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                            <div style={{ color: '#64748b', fontSize: '0.6rem', fontWeight: 'bold', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <Activity size={10} /> FEED DE SEGURIDAD VLS
                                            </div>
                                            <div style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'flex', justifyContent: 'space-between' }}>
                                                <span>• Sensores de Humedal operativos (100%)</span>
                                                <span style={{ color: '#10b981' }}>ESTADO_OK</span>
                                            </div>
                                            <div style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                                                <span>• Patrullaje Digital Farito activo</span>
                                                <span style={{ color: '#10b981' }}>SCAN_OK</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'radio' && (
                                <div className="animate-fade-in" style={{ textAlign: 'center', paddingTop: '40px' }}>
                                    <div className="pulse-slow" style={{ background: 'rgba(239, 68, 68, 0.1)', width: '100px', height: '100px', borderRadius: '50%', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #ef4444' }}>
                                        <Radio size={50} color="#ef4444" />
                                    </div>
                                    <h3 style={{ color: 'white' }}>VLS RADIO NETWORK</h3>
                                    <p style={{ color: '#94a3b8', fontSize: '0.8rem', maxWidth: '300px', margin: '0 auto 20px' }}>Sintonice la voz oficial de los vecinos de La Serena. Información, música y contingencia.</p>
                                    <button 
                                        onClick={() => { window.dispatchEvent(new CustomEvent('toggle-radio-visibility')); }}
                                        style={{ background: '#ef4444', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' }}
                                    >
                                        ABRIR REPRODUCTOR
                                    </button>
                                </div>
                            )}

                            {activeTab === 'intel' && (
                                <div className="animate-fade-in">
                                    <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                                        <div style={{ flex: 1, background: 'rgba(56, 189, 248, 0.05)', padding: '20px', borderRadius: '20px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                                            <h4 style={{ color: '#38bdf8', fontSize: '0.9rem', marginBottom: '10px' }}>FARITO SOCIAL LISTENING</h4>
                                            <p style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Análisis de sentimiento vecinal en tiempo real mediante el monitoreo de redes y reportes.</p>
                                            <div style={{ marginTop: '15px', height: '40px', display: 'flex', gap: '4px', alignItems: 'flex-end' }}>
                                                {[30, 45, 60, 25, 80, 55, 40, 90, 70, 50].map((h, i) => (
                                                    <div key={i} style={{ flex: 1, height: `${h}%`, background: '#38bdf8', borderRadius: '2px', opacity: 0.6 }}></div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => window.dispatchEvent(new CustomEvent('open-social-vision'))}
                                        style={{ width: '100%', background: '#38bdf8', color: '#000', border: 'none', padding: '15px', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer' }}
                                    >
                                        ACCEDER A PANEL DE INTELIGENCIA
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px', opacity: 0.3 }}>
                            <Power size={60} color="#333" />
                            <h2 style={{ color: '#333', letterSpacing: '10px' }}>SYSTEM OFF</h2>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .btn-console:hover { transform: translateY(-5px); background: rgba(255,255,255,0.06) !important; border-color: rgba(255,255,255,0.15) !important; }
                .pulse-slow { animation: pulse 3s infinite ease-in-out; }
                @keyframes pulse { 0%, 100% { opacity: 0.8; transform: scale(1); } 50% { opacity: 1; transform: scale(1.05); } }
            `}</style>
        </div>
    );
}
