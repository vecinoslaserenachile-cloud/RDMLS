import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Play, Pause, Volume2, VolumeX, Activity, Zap, Mic, Headphones, ChevronUp, ChevronDown } from 'lucide-react';

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

export default function RadioHomeWidget() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(80);
    const [isMuted, setIsMuted] = useState(false);
    const [eqLevels, setEqLevels] = useState(Array(10).fill(50));
    const [spectrumLevels, setSpectrumLevels] = useState(Array(10).fill(10));
    const audioRef = useRef(null);
    const vuLeftRef = useRef(null);
    const vuRightRef = useRef(null);
    const analyzerRef = useRef(null);
    const animationRef = useRef(null);
    const currentHost = (window.location.host || window.location.hostname).toLowerCase();
    const isRDMLS = currentHost.includes('rdmls') || (currentHost.includes('laserena.cl') && !currentHost.includes('vecinos'));
    const isVLS = !isRDMLS;
    const [isMinimized, setIsMinimized] = useState(true);
    const prevVolume = useRef(80);
    
    // SEPARACIÓN ESTRICTA DE SEÑALES (Soberanía Digital)
    const stations = isRDMLS ? [
        { id: 10, sub: 'rdmls', name: 'RDMLS Señal Oficial', stream: 'https://az11.yesstreaming.net:8590/radio.mp3' }
    ] : [
        { id: 1, sub: 'vls', name: 'VLS Señal Principal', stream: 'https://az11.yesstreaming.net:8630/radio.mp3' }
    ];

    const initialStation = isRDMLS ? stations[0] : stations[1];
    const [currentStation, setCurrentStation] = useState(initialStation);

    const broadcastSchedule = isRDMLS ? [
        { start: '00:00', end: '08:00', name: 'RDMLS: Turno de Noche & Reportes' },
        { start: '08:00', end: '10:00', name: 'RDMLS: Actualidad Municipal' },
        { start: '10:00', end: '12:00', name: 'Sesión Clásica: Maestro Peña Hen' },
        { start: '12:00', end: '14:00', name: 'Entrevistas: Gestión La Serena' },
        { start: '14:00', end: '16:00', name: 'Música & Cultura Regional' },
        { start: '16:00', end: '18:00', name: 'RDMLS: Resumen de Noticias' },
        { start: '18:00', end: '21:00', name: 'RDMLS: Crónicas de la Serena' },
        { start: '21:00', end: '23:59', name: 'RDMLS: Cierre de Gestión & Música' }
    ] : [
        { start: '00:00', end: '05:00', name: 'VLS Night: Chiquitita One Love' },
        { start: '05:00', end: '08:00', name: 'VLS Relax: Elqui Instrumental' },
        { start: '08:00', end: '10:00', name: 'Mañanero con Rock Colapso' },
        { start: '10:00', end: '12:00', name: 'Tributos VLS: Maestro Peña Hen' },
        { start: '12:00', end: '14:00', name: 'EntreVecinas: Especial Soni Cev' },
        { start: '14:00', end: '16:00', name: 'Vallenato Vecinal & Mix Almuerzo' },
        { start: '16:00', end: '18:00', name: 'Sereneres: Remasterizaciones 2026' },
        { start: '18:00', end: '21:00', name: 'Relatos de Iquique & Arturo Prat' },
        { start: '21:00', end: '23:59', name: 'VLS: Sesión Continua' }
    ];

    const getCurrentShow = () => {
        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        const current = broadcastSchedule.find(s => timeStr >= s.start && timeStr < s.end);
        return current ? current.name : (isRDMLS ? 'RDMLS Transmisión Continua' : 'VLS Transmisión Continua');
    };

    useEffect(() => {
        const handleRadioState = (e) => {
            if (e.detail) {
                setIsPlaying(e.detail.playing);
                if (e.detail.volume !== undefined && e.detail.volume !== volume) {
                   setVolume(e.detail.volume);
                   if (e.detail.volume === 0) setIsMuted(true);
                   else setIsMuted(false);
                }
                if (e.detail.station) setCurrentStation(e.detail.station);
            }
        };
        window.addEventListener('vls-radio-state-sync', handleRadioState);
        return () => window.removeEventListener('vls-radio-state-sync', handleRadioState);
    }, [volume]);

    const handleVolumeChange = (newVal) => {
        const v = parseFloat(newVal);
        setVolume(v);
        setIsMuted(v === 0);
        window.dispatchEvent(new CustomEvent('vls-set-volume', { detail: v }));
    };

    const toggleMute = () => {
        if (isMuted) {
            handleVolumeChange(prevVolume.current || 80);
            setIsMuted(false);
        } else {
            prevVolume.current = volume;
            handleVolumeChange(0);
            setIsMuted(true);
        }
    };

    const togglePlay = () => {
        window.dispatchEvent(new CustomEvent('vls-toggle-radio-global'));
    };

    // Sincronización Real con el Motor de Audio (Soberanía de Datos VLS)
    useEffect(() => {
        const handleSync = (e) => {
            if (e.detail) {
                if (e.detail.spectrum) setSpectrumLevels(e.detail.spectrum);
                if (e.detail.left !== undefined && vuLeftRef.current) {
                    vuLeftRef.current.style.transform = `rotate(${e.detail.left}deg)`;
                }
                if (e.detail.right !== undefined && vuRightRef.current) {
                    vuRightRef.current.style.transform = `rotate(${e.detail.right}deg)`;
                }
            }
        };
        window.addEventListener('vls-audio-spectrum-sync', handleSync);
        return () => window.removeEventListener('vls-audio-spectrum-sync', handleSync);
    }, []);

    const handleEqChange = (index, val) => {
        const value = Math.max(0, Math.min(100, val));
        setEqLevels(prev => {
            const next = [...prev];
            next[index] = value;
            return next;
        });
        // Sincronizar con el motor de audio real
        window.dispatchEvent(new CustomEvent('vls-set-eq', { 
            detail: { index, value } 
        }));
    };

    const draggingIndex = useRef(null);

    const handlePointerMove = (e) => {
        if (draggingIndex.current === null) return;
        const barId = `eq-bar-${draggingIndex.current}`;
        const barElem = document.getElementById(barId);
        if (!barElem) return;
        
        const rect = barElem.getBoundingClientRect();
        const y = e.clientY - rect.top;
        const val = 100 - (y / rect.height) * 100;
        handleEqChange(draggingIndex.current, val);
    };

    const handlePointerUp = () => {
        draggingIndex.current = null;
    };

    useEffect(() => {
        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);
        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        };
    }, []);

    // Escuchar cambios externos del EQ (desde RadioPlayer)
    useEffect(() => {
        const syncEq = (e) => {
            if (e.detail && e.detail.levels) {
                setEqLevels(e.detail.levels);
            }
        };
        window.addEventListener('vls-sync-eq-ui', syncEq);
        return () => window.removeEventListener('vls-sync-eq-ui', syncEq);
    }, []);

    return (
        <motion.div 
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel"
            style={{
                width: '100%',
                background: 'linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(30,41,59,0.9) 100%)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                borderRadius: '24px',
                padding: isMinimized ? '1rem' : '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: isMinimized ? '0.5rem' : '1rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                marginBottom: '2rem',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className={isPlaying ? "pulse-red" : ""} style={{ background: isPlaying ? '#ef4444' : 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '14px' }}>
                        <Radio size={24} color="white" />
                    </div>
                    <div>
                        <h3 style={{ margin: 0, color: 'white', fontSize: '1.2rem', fontWeight: '900', letterSpacing: '1px' }}>
                            {isRDMLS ? 'RDMLS - RADIO DIGITAL MUNICIPAL' : 'VLS RADIO COMUNITARIA'}
                        </h3>
                    </div>
                </div>

                {isMinimized && (
                    <div style={{ display: 'flex', gap: '10px', margin: '0 20px', alignItems: 'center' }}>
                         <div style={{ transform: 'scale(0.6)', transformOrigin: 'right center', display: 'flex', gap: '8px' }}>
                            <AnalogVUMeter label="L" needleRef={vuLeftRef} />
                            <AnalogVUMeter label="R" needleRef={vuRightRef} />
                        </div>
                        <div style={{ display: 'flex', gap: '3px', height: '30px', alignItems: 'flex-end', paddingBottom: '3px' }}>
                            {spectrumLevels.map((l, i) => (
                                <div key={i} style={{ width: '3px', height: `${l/3}%`, background: '#ef4444', borderRadius: '1px' }} />
                            ))}
                        </div>
                    </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    
                    {/* Controles Rapidos Volumen / Mute */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.3)', padding: '4px 12px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <button onClick={toggleMute} style={{ background: 'none', border: 'none', padding: 0, color: isMuted ? '#64748b' : '#38bdf8', cursor: 'pointer', display: 'flex' }}>
                            {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                        </button>
                        <input 
                            type="range" min="0" max="100" 
                            value={volume} 
                            onChange={(e) => handleVolumeChange(e.target.value)}
                            style={{ width: '60px', height: '4px', cursor: 'pointer', accentColor: '#38bdf8' }}
                        />
                    </div>

                    <button 
                        onClick={togglePlay}
                        style={{ 
                            background: isPlaying ? 'rgba(239, 68, 68, 0.2)' : '#ef4444', 
                            color: isPlaying ? '#ef4444' : 'white', 
                            border: isPlaying ? '1px solid #ef4444' : 'none',
                            padding: '0.6rem 1.4rem', borderRadius: '14px', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer',
                            fontSize: '0.85rem', letterSpacing: '1px', boxShadow: isPlaying ? 'none' : '0 4px 15px rgba(239,68,68,0.3)'
                        }}
                    >
                        {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                        {isPlaying ? 'PAUSAR' : 'SINTONIZAR'}
                    </button>
                    <button 
                        onClick={() => setIsMinimized(!isMinimized)}
                        style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', cursor: 'pointer', padding: '10px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}
                    >
                        {isMinimized ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
                    </button>
                </div>
            </div>

            {!isMinimized && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <div style={{ flex: 1, minWidth: '250px' }}>
                        <div style={{ fontSize: '0.7rem', color: '#94a3b8', letterSpacing: '2px', fontWeight: '900', marginBottom: '8px' }}>PLAYING NOW ({isRDMLS ? 'RDMLS MASTER' : 'VLS MASTER'})</div>
                        <div style={{ fontSize: '1.3rem', color: '#fff', fontWeight: 'bold', textShadow: '0 0 10px rgba(56,189,248,0.3)' }}>
                            {currentStation.name}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#38bdf8', marginTop: '4px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Zap size={14} /> 192kbps HD Digital Stream (SSL Direct)
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <AnalogVUMeter label="CH-L" needleRef={vuLeftRef} />
                        <AnalogVUMeter label="CH-R" needleRef={vuRightRef} />
                    </div>
                </div>

                {/* EQ SECTION: BARRAS MÁS ANCHAS + LEDS */}
                <div style={{ background: '#070b14', padding: '18px 12px', borderRadius: '20px', marginTop: '15px', boxShadow: 'inset 0 0 30px rgba(0,0,0,0.9), 0 10px 30px rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', height: '160px' }}>
                        {['31', '62', '125', '250', '500', '1K', '2K', '4K', '8K', '16K'].map((freq, i) => (
                            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                <div 
                                    id={`eq-bar-${i}`}
                                    style={{ 
                                        width: '28px', // MÁS ANCHO como se solicitó
                                        height: '130px', 
                                        background: '#0a101f', 
                                        position: 'relative', 
                                        borderRadius: '6px', 
                                        cursor: 'ns-resize', 
                                        overflow: 'hidden',
                                        border: '1px solid #1e293b',
                                        boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                                        touchAction: 'none'
                                    }}
                                    onPointerDown={(e) => {
                                        draggingIndex.current = i;
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        const y = e.clientY - rect.top;
                                        const val = 100 - (y / rect.height) * 100;
                                        handleEqChange(i, val);
                                    }}
                                >
                                    {/* LED BLOCKS animadas */}
                                    <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column-reverse', gap: '2px', padding: '3px' }}>
                                        {[...Array(15)].map((_, blockIdx) => {
                                            const threshold = (blockIdx / 15) * 100;
                                            const isActive = spectrumLevels[i] > threshold;
                                            let color = '#111827'; // Off
                                            if (isActive) {
                                                if (blockIdx < 9) color = '#22c55e'; // Green
                                                else if (blockIdx < 13) color = '#fbbf24'; // Yellow/Amber
                                                else color = '#f43f5e'; // Red (Vibrant)
                                            }
                                            return <div key={blockIdx} style={{ flex: 1, width: '100%', background: color, borderRadius: '1.5px', transition: 'background 0.04s', boxShadow: isActive ? `0 0 6px ${color}33` : 'none' }} />;
                                        })}
                                    </div>
                                    
                                    {/* Knob/Handle del EQ Overlay (Sleek line) */}
                                    <motion.div 
                                        animate={{ bottom: `calc(${eqLevels[i]}% - 2px)` }}
                                        style={{ 
                                            position: 'absolute', 
                                            left: 0, 
                                            width: '100%', 
                                            height: '4px', 
                                            background: '#fff', 
                                            zIndex: 20,
                                            boxShadow: '0 0 15px #38bdf8',
                                            pointerEvents: 'none'
                                        }} 
                                    />
                                    {/* Highlight de posición */}
                                    <div style={{ position: 'absolute', bottom: 0, width: '100%', height: `${eqLevels[i]}%`, background: 'rgba(56,189,248,0.03)', borderTop: '1px solid rgba(56,189,248,0.15)', pointerEvents: 'none' }} />
                                </div>
                                <span style={{ fontSize: '0.6rem', color: '#64748b', fontWeight: 'bold' }}>{freq}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* GRILLA PROGRAMÁTICA: MÁS ATRACTIVA Y MODERNA */}
                <div style={{ marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <h4 style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: '900', letterSpacing: '2px', textTransform: 'uppercase', margin: 0 }}>Grilla Programática RDMLS/VLS</h4>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px #22c55e' }} />
                            <span style={{ fontSize: '0.65rem', color: '#22c55e', fontWeight: 'bold' }}>EN VIVO</span>
                        </div>
                    </div>
                    
                    <div style={{ 
                        maxHeight: '180px', 
                        overflowY: 'auto', 
                        paddingRight: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                    }}>
                        {broadcastSchedule.map((item, i) => {
                            const now = new Date();
                            const currentHour = now.getHours();
                            const startHour = parseInt(item.start.split(':')[0]);
                            const endHour = parseInt(item.end.split(':')[0]);
                            const isCurrent = currentHour >= startHour && currentHour < endHour;

                            let accentColor = '#38bdf8'; 
                            if (startHour < 12) accentColor = '#f59e0b'; 
                            else if (startHour < 18) accentColor = '#22c55e'; 
                            else accentColor = '#818cf8'; 

                            return (
                                <div 
                                    key={i}
                                    style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        background: isCurrent ? `${accentColor}11` : 'rgba(15, 23, 42, 0.2)', 
                                        padding: '12px 16px', 
                                        borderRadius: '14px', 
                                        border: isCurrent ? `1px solid ${accentColor}33` : '1px solid rgba(255,255,255,0.03)',
                                        position: 'relative',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    {isCurrent && (
                                        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: accentColor, borderRadius: '4px 0 0 4px' }} />
                                    )}
                                    <div style={{ width: '80px' }}>
                                        <span style={{ fontSize: '0.75rem', fontWeight: '900', color: isCurrent ? accentColor : '#64748b' }}>{item.start}</span>
                                        <div style={{ fontSize: '0.6rem', color: '#475569' }}>{item.end}</div>
                                    </div>
                                    <div style={{ flex: 1, paddingLeft: '15px' }}>
                                        <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: isCurrent ? '#fff' : '#cbd5e1' }}>{item.name}</div>
                                        <div style={{ fontSize: '0.6rem', color: '#64748b' }}>{isCurrent ? 'Escuchando ahora en HD' : 'Próximo bloque'}</div>
                                    </div>
                                    {isCurrent && (
                                        <div style={{ background: accentColor, padding: '3px 8px', borderRadius: '5px', fontSize: '0.55rem', fontWeight: '900', color: '#000' }}>AHORA</div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '15px' }}>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontSize: '0.75rem', fontWeight: 'bold' }}>
                        <Mic size={14} /> Locución IA Activa
                    </div>
                </div>
                <button 
                    onClick={() => {
                        window.dispatchEvent(new CustomEvent('toggle-radio-visibility'));
                        window.dispatchEvent(new CustomEvent('vls-set-player-mode', { detail: 'expanded' }));
                    }}
                    style={{ background: 'none', border: 'none', color: '#38bdf8', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}
                >
                    Expandir Consola de Control
                </button>
            </div>
            
            <style>{`
                @keyframes pulse { 0% { opacity: 0.6; } 50% { opacity: 1; } 100% { opacity: 0.6; } }
            `}</style>
        </motion.div>
    );
}
