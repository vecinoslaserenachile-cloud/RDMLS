import React, { useState, useRef, useEffect } from 'react';
import { Music, Play, Pause, SkipForward, Volume2, X, Minimize2, Maximize2, Piano, Move } from 'lucide-react';
import { motion } from 'framer-motion';

const PIANO_TRACKS = [
    { 
        title: "Himno La Serena (Jazz Piano)", 
        audio: "/music/himno_la_serena_piano.mp3", 
        desc: "Neural Render: Elegancia serenense en 88 teclas" 
    },
    { 
        title: "Estadio La Portada (Ambient Piano)", 
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        desc: "Atmósfera deportiva transformada por Compita" 
    },
    { 
        title: "Piano Man - VLS Special Edition", 
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
        desc: "Interpretación magistral de Billy Joel vía Compita" 
    },
    { 
        title: "Nocturno de la Recova", 
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
        desc: "Melodía patrimonial en tono menor" 
    },
    { 
        title: "Tango del Faro (Piano Solo)", 
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
        desc: "Fuerza y elegancia frente al mar" 
    }
];

export default function PianoCompita() {
    const [isOpen, setIsOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [isMinimized, setIsMinimized] = useState(false);
    const audioRef = useRef(null);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const nextTrack = () => {
        setCurrentTrack((prev) => (prev + 1) % PIANO_TRACKS.length);
        setIsPlaying(true);
    };

    useEffect(() => {
        if (isPlaying && audioRef.current) {
            audioRef.current.play().catch(e => console.log("Auto-play blocked or error", e));
        }
    }, [currentTrack]);

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener('open-piano-compita', handleOpen);
        
        const handleCloseAll = () => {
            setIsOpen(false);
            if (audioRef.current) audioRef.current.pause();
            setIsPlaying(false);
        };
        window.addEventListener('close-all-floating', handleCloseAll);

        return () => {
            window.removeEventListener('open-piano-compita', handleOpen);
            window.removeEventListener('close-all-floating', handleCloseAll);
        };
    }, []);

    const playNote = (index) => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        
        // Frequencies for C4 to B4 (approx)
        const frequencies = [261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392.00, 415.30, 440.00, 466.16, 493.88];
        const freq = frequencies[index % frequencies.length];

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        // Piano-like timbre (combination of sine and square)
        osc.type = 'triangle'; 
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        
        // Envelope
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.02); // Attack
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2); // Decay
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + 1.3);
    };

    if (!isOpen) return null;

    return (
        <motion.div 
            drag
            dragMomentum={false}
            style={{
                position: 'fixed', bottom: '100px', left: '30px', zIndex: 1000,
                width: isMinimized ? '80px' : '320px',
                background: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(20px)',
                borderRadius: '24px', border: '1px solid rgba(56, 189, 248, 0.3)',
                padding: '1rem', boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                transition: 'width 0.3s, background 0.3s',
                overflow: 'hidden', cursor: 'default'
            }}
        >
            <audio ref={audioRef} src={PIANO_TRACKS[currentTrack].audio} onEnded={nextTrack} />

            {/* Header (Drag Handle) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: isMinimized ? '0' : '1.5rem', cursor: 'grab' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Move size={14} color="#38bdf8" />
                    {!isMinimized && <span style={{ fontSize: '0.7rem', fontWeight: 900, letterSpacing: '2px', color: '#38bdf8' }}>COMPITA_PIANO_V1</span>}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => setIsMinimized(!isMinimized)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                        {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                    </button>
                    <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                        <X size={16} />
                    </button>
                </div>
            </div>

            {!isMinimized && (
                <div className="animate-fade-in">
                    <div style={{ position: 'relative', height: '180px', borderRadius: '16px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                        <img 
                            src="/compita_piano_3d_1773545352836.png" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                            alt="Compita Piano"
                        />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}></div>
                        <div style={{ position: 'absolute', bottom: '10px', left: '10px' }}>
                            <div style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{PIANO_TRACKS[currentTrack].title}</div>
                            <div style={{ fontSize: '0.65rem', color: '#38bdf8', textTransform: 'uppercase' }}>{PIANO_TRACKS[currentTrack].desc}</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem' }}>
                        <SkipForward size={24} style={{ color: '#64748b', cursor: 'pointer', transform: 'rotate(180deg)' }} />
                        <button 
                            onClick={togglePlay}
                            style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#38bdf8', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 0 20px rgba(56, 189, 248, 0.4)' }}
                        >
                            {isPlaying ? <Pause color="black" fill="black" /> : <Play color="black" fill="black" style={{ marginLeft: '4px' }} />}
                        </button>
                        <SkipForward size={24} onClick={nextTrack} style={{ color: '#64748b', cursor: 'pointer' }} />
                    </div>

                    <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Volume2 size={14} color="#64748b" />
                        <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                            <div style={{ width: '70%', height: '100%', background: '#38bdf8', borderRadius: '2px' }}></div>
                        </div>
                    </div>

                    {/* Neural Virtual Keys */}
                    <div style={{ marginTop: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <span style={{ fontSize: '0.6rem', color: '#38bdf8', fontWeight: 900, letterSpacing: '1px' }}>TECLADO_MIDI_SENSITIVE</span>
                            <div style={{ display: 'flex', gap: '4px' }}>
                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: isPlaying ? '#10b981' : '#333' }}></div>
                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#38bdf8', animation: 'pulse 1s infinite' }}></div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', background: 'white', height: '40px', borderRadius: '4px', overflow: 'hidden', padding: '1px' }}>
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(k => (
                                <div 
                                    key={k} 
                                    onClick={() => playNote(k)}
                                    className="piano-key" 
                                    style={{ flex: 1, borderRight: '1px solid #ddd', cursor: 'pointer', transition: 'all 0.1s' }}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {isMinimized && isPlaying && (
                 <div onClick={() => setIsMinimized(false)} style={{ cursor: 'pointer' }} className="spin-slow">
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#38bdf8', border: '2px solid white', overflow: 'hidden' }}>
                        <img src="/avatars/compita-piano.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                 </div>
            )}

            <style>{`
                .hover-scale:hover { transform: scale(1.1); }
                .spin-slow { animation: spin 8s linear infinite; }
                .piano-key:active { background: #38bdf8 !important; }
                .piano-key:hover { background: #f1f5f9; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fadeIn 0.5s ease-out; }
            `}</style>
        </motion.div>
    );
}
