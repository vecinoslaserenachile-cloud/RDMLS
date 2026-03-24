import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Play, Pause, Volume2, Activity, Zap, Mic, Headphones } from 'lucide-react';

const AnalogVUMeter = ({ label, needleRef }) => (
    <div style={{ position: 'relative', width: '120px', height: '60px', background: '#e5e7eb', borderRadius: '60px 60px 0 0', overflow: 'hidden', border: '2px solid #334155', boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.2)' }}>
        <div style={{ position: 'absolute', bottom: 0, left: '5%', right: '5%', height: '100%', border: '1px solid #94a3b8', borderBottom: 'none', borderRadius: '60px 60px 0 0', opacity: 0.3 }}></div>
        <div style={{ position: 'absolute', bottom: '5px', left: 0, width: '100%', textAlign: 'center', fontSize: '10px', fontWeight: 'bold', color: '#1e293b', zIndex: 10 }}>{label}</div>
        <div style={{ position: 'absolute', bottom: '15px', left: '10%', right: '10%', display: 'flex', justifyContent: 'space-between', fontSize: '8px', color: '#475569', fontWeight: 'bold', zIndex: 10 }}>
            <span>-20</span><span>-10</span><span>-5</span><span>0</span><span style={{ color: '#ef4444' }}>+3</span>
        </div>
        <div 
            ref={needleRef}
            style={{ 
                position: 'absolute', bottom: '-5px', left: '50%', width: '2px', height: '55px', 
                background: '#ef4444', originY: 'bottom', transform: 'translateX(-50%) rotate(-45deg)',
                boxShadow: '0 0 4px rgba(0,0,0,0.3)', transition: 'transform 0.1s cubic-bezier(0.1, 0.9, 0.2, 1)', zIndex: 20
            }} 
        />
        <div style={{ position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)', width: '20px', height: '20px', background: '#334155', borderRadius: '50%', zIndex: 30, boxShadow: '0 2px 4px rgba(0,0,0,0.5)' }}></div>
    </div>
);

export default function RadioHomeWidget() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const vuLeftRef = useRef(null);
    const vuRightRef = useRef(null);
    const analyzerRef = useRef(null);
    const animationRef = useRef(null);
    const [currentStation, setCurrentStation] = useState({ name: 'VLS Señal Principal', stream: 'https://az11.yesstreaming.net:8630/radio.mp3' });

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
                const talkLevel = Math.random() * 20; // Mock de nivel
                const baseLevel = isPlaying ? -15 : -45;
                if (vuLeftRef.current) vuLeftRef.current.style.transform = `translateX(-50%) rotate(${baseLevel + talkLevel}deg)`;
                if (vuRightRef.current) vuRightRef.current.style.transform = `translateX(-50%) rotate(${baseLevel + (talkLevel * 0.8)}deg)`;
                animationRef.current = requestAnimationFrame(animate);
            };
            animate();
        } else {
            if (vuLeftRef.current) vuLeftRef.current.style.transform = `translateX(-50%) rotate(-45deg)`;
            if (vuRightRef.current) vuRightRef.current.style.transform = `translateX(-50%) rotate(-45deg)`;
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        }
        return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
    }, [isPlaying]);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel"
            style={{
                width: '100%',
                background: 'linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(30,41,59,0.9) 100%)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                borderRadius: '24px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                marginBottom: '2rem'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className={isPlaying ? "pulse-red" : ""} style={{ background: isPlaying ? '#ef4444' : 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '14px' }}>
                        <Radio size={24} color="white" />
                    </div>
                    <div>
                        <h3 style={{ margin: 0, color: 'white', fontSize: '1.1rem', fontWeight: '900' }}>RADIO VECINOS LA SERENA</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '0.75rem', color: isPlaying ? '#ef4444' : '#64748b', fontWeight: 'bold' }}>
                                {isPlaying ? 'SINTONIZADA • EN VIVO' : 'SINTONIZADA • PAUSADA'}
                            </span>
                        </div>
                    </div>
                </div>
                <button 
                    onClick={togglePlay}
                    className="btn pulse" 
                    style={{ 
                        background: isPlaying ? 'rgba(239, 68, 68, 0.2)' : '#ef4444', 
                        color: isPlaying ? '#ef4444' : 'white', 
                        border: isPlaying ? '1px solid #ef4444' : 'none',
                        padding: '0.8rem 1.5rem', borderRadius: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' 
                    }}
                >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                    {isPlaying ? 'PAUSAR RDMLS' : 'ESCUCHAR EN VIVO'}
                </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '20px' }}>
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
                    onClick={() => window.dispatchEvent(new CustomEvent('toggle-radio-visibility'))}
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
