import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Play, Pause, Volume2, Activity, Zap, Mic, Headphones, ChevronUp, ChevronDown } from 'lucide-react';

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
    const [eqLevels, setEqLevels] = useState([50, 50, 50, 50, 50]);
    const [spectrumLevels, setSpectrumLevels] = useState([10, 20, 30, 20, 10]);
    const audioRef = useRef(null);
    const vuLeftRef = useRef(null);
    const vuRightRef = useRef(null);
    const analyzerRef = useRef(null);
    const animationRef = useRef(null);
    const isRDMLS = window.location.hostname.includes('rdmls');
    const [isMinimized, setIsMinimized] = useState(true);
    
    // SEPARACIÓN ESTRICTA DE SEÑALES (Soberanía Digital)
    const stations = [
        { id: 10, sub: 'rdmls', name: 'RDMLS Señal Oficial', stream: 'https://az11.yesstreaming.net:8590/radio.mp3' },
        { id: 1, sub: 'vls', name: 'VLS Señal Principal', stream: 'https://az11.yesstreaming.net:8630/radio.mp3' }
    ];

    const initialStation = isRDMLS ? stations[0] : stations[1];
    const [currentStation, setCurrentStation] = useState(initialStation);

    const broadcastSchedule = [
        { start: '08:00', end: '10:00', name: 'Mañanero con Rock Colapso' },
        { start: '10:00', end: '12:00', name: 'Tributos VLS: Maestro Peña Hen' },
        { start: '12:00', end: '14:00', name: 'EntreVecinos: Especial Soni Cev' },
        { start: '14:00', end: '16:00', name: 'Vallenato Vecinal & Mix Almuerzo' },
        { start: '16:00', end: '18:00', name: 'Sereneres: Remasterizaciones 2026' }
    ];

    const getCurrentShow = () => {
        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        const current = broadcastSchedule.find(s => timeStr >= s.start && timeStr < s.end);
        return current ? current.name : 'VLS Transmisión Continua';
    };

    useEffect(() => {
        const handleRadioState = (e) => {
            if (e.detail) {
                setIsPlaying(e.detail.playing);
                if (e.detail.station) setCurrentStation(e.detail.station);
            }
        };
        window.addEventListener('vls-radio-state-sync', handleRadioState);
        return () => window.removeEventListener('vls-radio-state-sync', handleRadioState);
    }, []);

    const togglePlay = () => {
        window.dispatchEvent(new CustomEvent('vls-toggle-radio-global'));
    };

    // Animación de los VU Meters (Mock si no hay AudioContext global)
    useEffect(() => {
        if (isPlaying) {
            const animate = () => {
                const talkLevel = Math.random() * 25; // Nivel variable
                const baseLevel = isPlaying ? -15 : -45;
                if (vuLeftRef.current) vuLeftRef.current.style.transform = `rotate(${baseLevel + talkLevel}deg)`;
                if (vuRightRef.current) vuRightRef.current.style.transform = `rotate(${baseLevel + (talkLevel * 0.85)}deg)`;
                
                // Mock spectrum
                setSpectrumLevels(prev => prev.map(() => 10 + Math.random() * 60));

                animationRef.current = requestAnimationFrame(animate);
            };
            animate();
        } else {
            if (vuLeftRef.current) vuLeftRef.current.style.transform = `rotate(-45deg)`;
            if (vuRightRef.current) vuRightRef.current.style.transform = `rotate(-45deg)`;
            setSpectrumLevels([5, 5, 5, 5, 5]);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        }
        return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
    }, [isPlaying]);

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
                            {isRDMLS ? 'RDMLS - RADIO DIGITAL MUNICIPAL' : 'RADIO VECINOS LA SERENA'}
                        </h3>
                    </div>
                </div>

                {isMinimized && (
                    <div style={{ display: 'flex', gap: '10px', margin: '0 20px', alignItems: 'center' }}>
                         <div style={{ transform: 'scale(0.6)', transformOrigin: 'right center', display: 'flex', gap: '8px' }}>
                            <AnalogVUMeter label="L" needleRef={vuLeftRef} />
                            <AnalogVUMeter label="R" needleRef={vuRightRef} />
                        </div>
                        <div style={{ display: 'flex', gap: '4px', height: '30px', alignItems: 'flex-end', paddingBottom: '5px' }}>
                            {spectrumLevels.map((l, i) => (
                                <div key={i} style={{ width: '4px', height: `${l/3}%`, background: '#ef4444', borderRadius: '1px' }} />
                            ))}
                        </div>
                    </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button 
                        onClick={togglePlay}
                        style={{ 
                            background: isPlaying ? 'rgba(239, 68, 68, 0.2)' : '#ef4444', 
                            color: isPlaying ? '#ef4444' : 'white', 
                            border: isPlaying ? '1px solid #ef4444' : 'none',
                            padding: '0.6rem 1.2rem', borderRadius: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer',
                            fontSize: '0.8rem'
                        }}
                    >
                        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                        {isPlaying ? 'PAUSAR' : 'ESCUCHAR'}
                    </button>
                    <button 
                        onClick={() => setIsMinimized(!isMinimized)}
                        style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        {isMinimized ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
                    </button>
                </div>
            </div>

            {!isMinimized && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <div style={{ flex: 1, minWidth: '250px' }}>
                        <div style={{ fontSize: '0.7rem', color: '#94a3b8', letterSpacing: '2px', fontWeight: '900', marginBottom: '8px' }}>PLAYING NOW (VLS MASTER)</div>
                        <div style={{ fontSize: '1.3rem', color: '#fff', fontWeight: 'bold', textShadow: '0 0 10px rgba(56,189,248,0.3)' }}>
                            {currentStation.name}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#38bdf8', marginTop: '4px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Zap size={14} /> 128kbps Hi-Fi Digital Stream
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <AnalogVUMeter label="CH-L" needleRef={vuLeftRef} />
                        <AnalogVUMeter label="CH-R" needleRef={vuRightRef} />
                    </div>
                </div>

                {/* EQ SECTION */}
                <div style={{ background: '#000', padding: '15px 10px', borderRadius: '16px', marginTop: '10px', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', height: '110px', padding: '0 5px' }}>
                        {spectrumLevels.map((l, i) => (
                            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                <div 
                                    id={`eq-bar-${i}`}
                                    style={{ 
                                        width: '18px', // Más ancho para fácil manipulación
                                        height: '75px', 
                                        background: '#222', 
                                        position: 'relative', 
                                        borderRadius: '10px', 
                                        cursor: 'ns-resize', 
                                        overflow: 'visible',
                                        border: '1px solid #333',
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
                                    {/* Track interactivo invisible más ancho */}
                                    <div style={{ position: 'absolute', top: '-10px', bottom: '-10px', left: '-5px', right: '-5px', zIndex: 0 }} />
                                    
                                    {/* Fondo de nivel EQ */}
                                    <div style={{ position: 'absolute', bottom: 0, width: '100%', height: `${eqLevels[i]}%`, background: 'rgba(239, 68, 68, 0.1)', borderTop: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '0 0 10px 10px', zIndex: 1 }} />
                                    
                                    {/* Vumeter de espectro real */}
                                    <div style={{ position: 'absolute', bottom: 0, left: '20%', width: '60%', height: `${l}%`, background: '#ef4444', borderRadius: '2px', transition: 'height 0.05s', zIndex: 2, pointerEvents: 'none', filter: 'drop-shadow(0 0 5px #ef444455)' }} />
                                    
                                    {/* Knob/Handle del EQ */}
                                    <motion.div 
                                        animate={{ bottom: `calc(${eqLevels[i]}% - 6px)` }}
                                        style={{ 
                                            position: 'absolute', 
                                            left: '-2px', 
                                            width: '22px', 
                                            height: '12px', 
                                            background: '#fff', 
                                            border: '2px solid #ef4444', 
                                            borderRadius: '4px', 
                                            zIndex: 5,
                                            boxShadow: '0 2px 5px rgba(0,0,0,0.5)',
                                            pointerEvents: 'none'
                                        }} 
                                    />
                                </div>
                                <span style={{ fontSize: '0.6rem', color: '#64748b', fontWeight: '900', letterSpacing: '0.5px' }}>{['60', '250', '1K', '4K', '12K'][i]}</span>
                            </div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '10px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '5px' }}>
                        <span style={{ fontSize: '0.6rem', color: '#ef4444', fontWeight: 'bold', letterSpacing: '2px', opacity: 0.8 }}>V L S  P R O F E S S I O N A L  E Q</span>
                    </div>
                </div>

                {/* GRILLA PROGRAMÁTICA */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '15px', marginTop: '5px' }}>
                    <span style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: '900', letterSpacing: '1px', display: 'block', marginBottom: '10px' }}>GRILLA PROGRAMÁTICA</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', maxHeight: '80px', overflowY: 'auto' }}>
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

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.75rem' }}>
                        <Headphones size={14} /> 1420 Vecinos Escuchando
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontSize: '0.75rem' }}>
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
                .pulse-red { animation: pulse-red 2s infinite; }
                @keyframes pulse-red { 0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); } 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); } }
            `}</style>
        </motion.div>
    );
}
