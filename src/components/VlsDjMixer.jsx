import React, { useState, useRef, useEffect } from 'react';
import { Disc, Play, Pause, FastForward, Rewind, Music, Volume2, Sparkles, Mic2, Radio, Headphones, Layers } from 'lucide-react';
import { MUSIC_LIBRARY } from '../services/musicService';

const FX_SAMPLES = [
    { id: 'airhorn', name: 'AIRHORN', color: '#ef4444' },
    { id: 'scratch', name: 'SCRATCH', color: '#38bdf8' },
    { id: 'vinly_stop', name: 'STOP', color: '#f59e0b' },
    { id: 'ai_intro', name: 'AI INTRO', color: '#a855f7' }
];

const AnalogVUMeter = ({ label, value }) => {
    // value is 0-100
    const rotation = -45 + (value / 100) * 90;
    return (
        <div style={{
            width: '80px', height: '55px', background: 'linear-gradient(to bottom, #fcfae3 0%, #e8e3c1 100%)', 
            borderRadius: '6px', border: '2px solid #1e293b', position: 'relative', overflow: 'hidden',
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.4), 0 4px 10px rgba(0,0,0,0.5)', 
            display: 'flex', flexDirection: 'column', alignItems: 'center'
        }}>
            <svg viewBox="0 0 100 60" style={{ width: '100%', marginTop: '4px' }}>
                <path d="M 12 48 A 45 45 0 0 1 88 48" fill="none" stroke="#222" strokeWidth="1.5" strokeDasharray="1,2" />
                <path d="M 72 48 A 45 45 0 0 1 88 48" fill="none" stroke="#ef4444" strokeWidth="3" />
                {[...Array(7)].map((_, i) => {
                    const angle = Math.PI + 0.5 + i * (Math.PI - 1) / 6;
                    const x1 = 50 + 40 * Math.cos(angle); const y1 = 55 + 40 * Math.sin(angle);
                    const x2 = 50 + 48 * Math.cos(angle); const y2 = 55 + 48 * Math.sin(angle);
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={i >= 5 ? "#ef4444" : "#222"} strokeWidth="1.5" />;
                })}
            </svg>
            <div style={{ 
                position: 'absolute', bottom: '-4px', left: '50%', width: '1.5px', height: '45px', 
                background: '#111', marginLeft: '-0.75px', transformOrigin: 'bottom center', 
                transform: `rotate(${rotation}deg)`, transition: 'transform 0.05s linear', zIndex: 5 
            }} />
            <div style={{ position: 'absolute', bottom: '-8px', left: '50%', transform: 'translateX(-50%)', width: '16px', height: '16px', borderRadius: '50%', background: 'radial-gradient(circle, #444, #111)', border: '2px solid #000', zIndex: 6 }} />
            <div style={{ position: 'absolute', bottom: '4px', left: '6px', fontSize: '0.45rem', fontWeight: '900', color: '#111', opacity: 0.8 }}>{label}</div>
        </div>
    );
};

const Deck = ({ id, track, isPlaying, volume, pitch, onPlayPause, onPitchChange, scratchPos }) => {
    return (
        <div className="glass-panel" style={{ 
            padding: '1.5rem', 
            borderRadius: '24px', 
            background: 'rgba(15, 23, 42, 0.9)', 
            border: '2px solid rgba(255,255,255,0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            flex: 1,
            position: 'relative',
            overflow: 'hidden',
            minWidth: '300px'
        }}>
            <div style={{ position: 'absolute', top: 10, left: 15, fontSize: '0.6rem', color: '#475569', fontWeight: 900 }}>DECK {id} - VLS PRO SERIES</div>
            
            {/* Vinilo */}
            <div style={{ 
                width: '180px', 
                height: '180px', 
                borderRadius: '50%', 
                background: 'radial-gradient(circle, #222 0%, #000 70%)',
                border: '6px solid #334155',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                cursor: 'grab',
                transform: `rotate(${scratchPos}deg)`,
                animation: (isPlaying && scratchPos === 0) ? `spin ${2 / pitch}s linear infinite` : 'none',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'absolute', inset: '15%', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)', backgroundImage: `url(${track?.cover || '/vls-logo-3d.png'})`, backgroundSize: 'cover' }}></div>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fff', border: '2px solid #000', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '6px', height: '6px', background: '#000', borderRadius: '50%' }}></div>
                </div>
            </div>

            {/* Info Track */}
            <div style={{ textAlign: 'center', width: '100%' }}>
                <div style={{ color: '#38bdf8', fontSize: '1rem', fontWeight: '900', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {track ? track.title : '--- NO TRACK ---'}
                </div>
                <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{track ? track.artist : 'Select from library'}</div>
            </div>

            {/* Controls Deck */}
            <div style={{ display: 'flex', gap: '10px', width: '100%', alignItems: 'center' }}>
                <button 
                    onClick={onPlayPause}
                    style={{ flex: '0 0 60px', height: '60px', borderRadius: '50%', background: isPlaying ? '#ef4444' : '#10b981', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}
                >
                    {isPlaying ? <Pause size={28} /> : <Play size={28} style={{ marginLeft: '4px' }} />}
                </button>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        {[33, 45, 78].map(rpm => (
                            <button 
                                key={rpm} 
                                onClick={() => onPitchChange(rpm === 33 ? 1.0 : (rpm === 45 ? 1.35 : 2.34))}
                                style={{ 
                                    flex: 1, padding: '4px', borderRadius: '4px', 
                                    background: (rpm === 33 && pitch === 1.0) || (rpm === 45 && pitch === 1.35) || (rpm === 78 && pitch === 2.34) ? '#38bdf8' : 'rgba(255,255,255,0.1)',
                                    color: (rpm === 33 && pitch === 1.0) || (rpm === 45 && pitch === 1.35) || (rpm === 78 && pitch === 2.34) ? '#000' : '#fff',
                                    border: 'none', fontSize: '0.6rem', fontWeight: '900', cursor: 'pointer'
                                }}
                            >
                                {rpm}
                            </button>
                        ))}
                    </div>
                    <input 
                        type="range" min="0.5" max="2.5" step="0.01" 
                        value={pitch} 
                        onChange={(e) => onPitchChange(parseFloat(e.target.value))} 
                        style={{ width: '100%', accentColor: '#38bdf8', cursor: 'pointer' }} 
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', color: '#94a3b8', fontWeight: 'bold' }}>
                        <span>PITCH</span>
                        <span>{(pitch * 100).toFixed(1)}%</span>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

export default function VlsDjMixer() {
    const [lib, setLib] = useState(MUSIC_LIBRARY);
    const [deckA, setDeckA] = useState({ track: MUSIC_LIBRARY[0], isPlaying: false, pitch: 1.0, volume: 1.0, scratch: 0 });
    const [deckB, setDeckB] = useState({ track: MUSIC_LIBRARY[1], isPlaying: false, pitch: 1.0, volume: 1.0, scratch: 0 });
    const [crossfader, setCrossfader] = useState(50);
    const audioARef = useRef(null);
    const audioBRef = useRef(null);
    const fileInputRef = useRef(null);
    const [customUrl, setCustomUrl] = useState('');

    const [masterSpectrum, setMasterSpectrum] = useState(Array(12).fill(0));
    const [vuLevels, setVuLevels] = useState({ left: 0, right: 0 });
    
    // Audio Engine Refs
    const audioContextRef = useRef(null);
    const analyserARef = useRef(null);
    const analyserBRef = useRef(null);
    const sourceARef = useRef(null);
    const sourceBRef = useRef(null);
    const animationRef = useRef(null);

    const initAudioContext = () => {
        if (!audioContextRef.current) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioContextRef.current = new AudioContext();
            
            analyserARef.current = audioContextRef.current.createAnalyser();
            analyserARef.current.fftSize = 256;
            analyserBRef.current = audioContextRef.current.createAnalyser();
            analyserBRef.current.fftSize = 256;

            if (audioARef.current && !sourceARef.current) {
                sourceARef.current = audioContextRef.current.createMediaElementSource(audioARef.current);
                sourceARef.current.connect(analyserARef.current);
                analyserARef.current.connect(audioContextRef.current.destination);
            }
            if (audioBRef.current && !sourceBRef.current) {
                sourceBRef.current = audioContextRef.current.createMediaElementSource(audioBRef.current);
                sourceBRef.current.connect(analyserBRef.current);
                analyserBRef.current.connect(audioContextRef.current.destination);
            }
        }
        if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }
    };

    useEffect(() => {
        if (!audioARef.current) return;
        initAudioContext();
        const vol = deckA.volume * (1 - crossfader / 100);
        audioARef.current.volume = Math.max(0, Math.min(1, vol));
        audioARef.current.playbackRate = deckA.pitch;
        
        if (audioARef.current.src !== deckA.track?.audio) {
            audioARef.current.load();
        }

        if (deckA.isPlaying) {
            audioARef.current.play().catch(e => console.log("Play A error:", e));
        } else {
            audioARef.current.pause();
        }
    }, [deckA.isPlaying, deckA.volume, deckA.pitch, crossfader, deckA.track]);

    useEffect(() => {
        if (!audioBRef.current) return;
        initAudioContext();
        const vol = deckB.volume * (crossfader / 100);
        audioBRef.current.volume = Math.max(0, Math.min(1, vol));
        audioBRef.current.playbackRate = deckB.pitch;

        if (audioBRef.current.src !== deckB.track?.audio) {
            audioBRef.current.load();
        }

        if (deckB.isPlaying) {
            audioBRef.current.play().catch(e => console.log("Play B error:", e));
        } else {
            audioBRef.current.pause();
        }
    }, [deckB.isPlaying, deckB.volume, deckB.pitch, crossfader, deckB.track]);

    // Sincronización con el Motor de Audio Global (Radio RDMLS/VLS)
    useEffect(() => {
        const handleRadioSync = (e) => {
            if (e.detail && !deckA.isPlaying && !deckB.isPlaying) {
                if (e.detail.spectrum) {
                    // Adaptamos de 10 bandas de radio a las barras del mixer (que ahora unificaremos a 10 para coherencia)
                    setMasterSpectrum(e.detail.spectrum);
                }
                if (e.detail.left !== undefined) {
                    // Convertimos rotación (-45 a 45) a valor 0-100 para AnalogVUMeter
                    const valL = ((e.detail.left + 45) / 90) * 100;
                    const valR = ((e.detail.right + 45) / 90) * 100;
                    setVuLevels({ left: valL, right: valR });
                }
            }
        };
        window.addEventListener('vls-audio-spectrum-sync', handleRadioSync);
        return () => window.removeEventListener('vls-audio-spectrum-sync', handleRadioSync);
    }, [deckA.isPlaying, deckB.isPlaying]);

    // Spectrometer Loop
    useEffect(() => {
        const update = () => {
            if (!deckA.isPlaying && !deckB.isPlaying) {
                animationRef.current = requestAnimationFrame(update);
                return;
            }

            const dataA = new Uint8Array(analyserARef.current?.frequencyBinCount || 0);
            const dataB = new Uint8Array(analyserBRef.current?.frequencyBinCount || 0);
            
            if (analyserARef.current) analyserARef.current.getByteFrequencyData(dataA);
            if (analyserBRef.current) analyserBRef.current.getByteFrequencyData(dataB);

            // Combine data based on crossfader
            const mixA = 1 - crossfader / 100;
            const mixB = crossfader / 100;
            
            const newSpectrum = Array(10).fill(0).map((_, i) => {
                const valA = dataA[i * 2] || 0;
                const valB = dataB[i * 2] || 0;
                return (valA * mixA + valB * mixB) / 255 * 100;
            });
            setMasterSpectrum(newSpectrum);

            const avgA = dataA.reduce((a, b) => a + b, 0) / (dataA.length || 1);
            const avgB = dataB.reduce((a, b) => a + b, 0) / (dataB.length || 1);
            
            setVuLevels({
                left: (avgA * mixA + avgB * mixB) / 128 * 100, // Normalized roughly
                right: (avgA * mixA + avgB * mixB) / 140 * 100
            });

            animationRef.current = requestAnimationFrame(update);
        };
        animationRef.current = requestAnimationFrame(update);
        return () => cancelAnimationFrame(animationRef.current);
    }, [crossfader, deckA.isPlaying, deckB.isPlaying]);

    const processFile = (file) => {
        if (!file) return;
        
        // Validaciones: Máximo 25MB y formatos comunes
        const MAX_SIZE = 25 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            alert("ARCHIVO DEMASIADO GRANDE: El límite es 25MB para mantener la fluidez de la consola.");
            return;
        }
        
        const validTypes = ['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/ogg', 'audio/x-m4a'];
        if (!validTypes.includes(file.type) && !file.name.endsWith('.mp3') && !file.name.endsWith('.wav')) {
            alert("FORMATO NO SOPORTADO: Por favor usa MP3 o WAV.");
            return;
        }

        const url = URL.createObjectURL(file);
        const newTrack = {
            id: Date.now(),
            title: file.name.substring(0, 20),
            artist: 'Subida Local',
            cover: '/vls-logo-3d.png',
            audio: url,
            bpm: 128
        };
        setLib([newTrack, ...lib]);
        alert(`¡LISTO! "${file.name}" inyectado en la Biblioteca de Sesión.`);
    };

    const handleFileUpload = (e) => {
        processFile(e.target.files[0]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.currentTarget.style.borderColor = '#38bdf8';
        e.currentTarget.style.background = 'rgba(56, 189, 248, 0.1)';
    };

    const handleDragLeave = (e) => {
        e.currentTarget.style.borderColor = '#334155';
        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
    };

    const handleDrop = (e) => {
        e.preventDefault();
        handleDragLeave(e);
        const file = e.dataTransfer.files[0];
        processFile(file);
    };

    const handleUrlAdd = () => {
        if (!customUrl) return;
        const newTrack = {
            id: Date.now(),
            title: 'Fuente Externa',
            artist: customUrl.substring(0, 30) + '...',
            cover: '/vls-logo-3d.png',
            audio: customUrl,
            bpm: 120
        };
        setLib([newTrack, ...lib]);
        setCustomUrl('');
    };

    const handleFX = (fx) => {
        const audio = new Audio(`/fx/${fx}.mp3`);
        audio.volume = 0.5;
        audio.play().catch(() => console.log("FX Triggered (simulated)"));
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ height: '2px', flex: 1, background: 'linear-gradient(90deg, transparent, #38bdf8)' }}></div>
                <h2 style={{ color: '#38bdf8', fontSize: '1.5rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '3px', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Layers size={30} /> VLS DUAL-DENON CONSOLE PRO
                </h2>
                <div style={{ height: '2px', flex: 1, background: 'linear-gradient(-90deg, transparent, #38bdf8)' }}></div>
            </div>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {/* DECK A */}
                <Deck 
                    id="A" 
                    track={deckA.track} 
                    isPlaying={deckA.isPlaying} 
                    volume={deckA.volume} 
                    pitch={deckA.pitch}
                    scratchPos={deckA.scratch}
                    onPlayPause={() => setDeckA({...deckA, isPlaying: !deckA.isPlaying})}
                    onPitchChange={(p) => setDeckA({...deckA, pitch: p})}
                />

                {/* MIXER CENTRAL */}
                <div className="glass-panel" style={{ 
                    width: '240px', 
                    padding: '1.5rem', 
                    background: '#1e293b', 
                    borderRadius: '24px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    gap: '1.5rem',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                }}>
                    <div style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: '900', letterSpacing: '2px' }}>MASTER MIXER</div>
                    
                    {/* VU Meters Real-time */}
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                        <AnalogVUMeter label="L" value={vuLevels.left} />
                        <AnalogVUMeter label="R" value={vuLevels.right} />
                    </div>

                    <div style={{ display: 'flex', gap: '8px', height: '100px', width: '100%', alignItems: 'flex-end', background: '#000', padding: '10px', borderRadius: '8px', border: '1px solid #334155', position: 'relative', overflow: 'hidden' }}>
                        {/* Track Title Display in Center */}
                        <div style={{ position: 'absolute', top: '5px', left: 0, width: '100%', textAlign: 'center', zIndex: 10 }}>
                            <div style={{ fontSize: '0.5rem', color: '#10b981', fontWeight: '900', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', padding: '0 5px', animation: 'vls-marquee 3s linear infinite' }}>
                                {deckA.isPlaying ? `PLAYING A: ${deckA.track?.title}` : (deckB.isPlaying ? `PLAYING B: ${deckB.track?.title}` : 'IDLE - READY TO MIX')}
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '3px', flex: 1, height: '100%', alignItems: 'flex-end' }}>
                            {masterSpectrum.map((level, i) => (
                                <div key={i} style={{ 
                                    flex: 1, 
                                    height: `${Math.max(5, level)}%`, 
                                    background: i > 10 ? '#ef4444' : (i > 8 ? '#fbbf24' : '#10b981'), 
                                    borderRadius: '1px',
                                    transition: 'height 0.05s ease-out'
                                }}></div>
                            ))}
                        </div>
                    </div>

                    <style>{`
                        @keyframes vls-marquee {
                            0% { opacity: 1; transform: translateX(10%); }
                            50% { opacity: 0.8; transform: translateX(0); }
                            100% { opacity: 1; transform: translateX(-10%); }
                        }
                    `}</style>

                    {/* Crossfader */}
                    <div style={{ width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', color: '#94a3b8', marginBottom: '8px', fontWeight: 'bold' }}>
                            <span>DECK A</span>
                            <span>DECK B</span>
                        </div>
                        <input 
                            type="range" 
                            min="0" max="100" 
                            value={crossfader} 
                            onChange={(e) => setCrossfader(e.target.value)} 
                            style={{ 
                                width: '100%', 
                                height: '40px', 
                                appearance: 'none', 
                                background: '#0f172a',
                                borderRadius: '10px',
                                border: '2px solid #334155',
                                padding: '0 5px'
                            }} 
                        />
                    </div>

                    {/* FX Patches */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', width: '100%' }}>
                        {FX_SAMPLES.map(fx => (
                            <button 
                                key={fx.id}
                                onClick={() => handleFX(fx.id)}
                                style={{ 
                                    padding: '8px', 
                                    background: 'rgba(255,255,255,0.05)', 
                                    border: `1px solid ${fx.color}40`, 
                                    color: fx.color,
                                    fontSize: '0.6rem',
                                    fontWeight: '900',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = fx.color + '20'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                            >
                                {fx.name}
                            </button>
                        ))}
                    </div>

                    <button style={{ 
                        width: '100%', padding: '10px', background: 'linear-gradient(45deg, #a855f7, #6366f1)', 
                        border: 'none', borderRadius: '10px', color: 'white', fontWeight: 'bold', fontSize: '0.8rem',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer'
                    }}>
                        <Mic2 size={14} /> AI VOICE SYNC
                    </button>
                </div>

                {/* DECK B */}
                <Deck 
                    id="B" 
                    track={deckB.track} 
                    isPlaying={deckB.isPlaying} 
                    volume={deckB.volume} 
                    pitch={deckB.pitch}
                    scratchPos={deckB.scratch}
                    onPlayPause={() => setDeckB({...deckB, isPlaying: !deckB.isPlaying})}
                    onPitchChange={(p) => setDeckB({...deckB, pitch: p})}
                />
            </div>

            {/* PANEL DE CARGA Y BIBLIOTECA */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', flexWrap: 'wrap' }}>
                {/* SUBIR ARCHIVOS / LINKS */}
                <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '24px', background: 'rgba(15, 23, 42, 0.5)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h3 style={{ margin: 0, color: '#38bdf8', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
                        <Sparkles size={18} /> INYECTAR AUDIO EXTERNO
                    </h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <input 
                                type="text" 
                                placeholder="Pegar Link (YouTube, MP3, Stream...)" 
                                value={customUrl}
                                onChange={(e) => setCustomUrl(e.target.value)}
                                style={{ flex: 1, padding: '10px', borderRadius: '10px', background: '#0f172a', border: '1px solid #334155', color: 'white' }}
                            />
                            <button 
                                onClick={handleUrlAdd}
                                style={{ padding: '10px 20px', borderRadius: '10px', background: '#38bdf8', border: 'none', color: '#0f172a', fontWeight: 'bold', cursor: 'pointer' }}
                            >AÑADIR</button>
                        </div>
                        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', width: '100%' }}></div>
                        <div 
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current.click()}
                            style={{ 
                                width: '100%', padding: '25px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', 
                                border: '2px dashed #334155', color: '#94a3b8', fontSize: '0.85rem', cursor: 'pointer',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                transition: 'all 0.3s'
                            }}
                        >
                            <FastForward size={24} />
                            <div style={{ textAlign: 'center' }}>
                                <strong>CLIC PARA SUBIR O ARRASTRA AQUÍ</strong>
                                <div style={{ fontSize: '0.65rem', opacity: 0.6, marginTop: '4px' }}>MP3 / WAV · MÁX 25MB</div>
                            </div>
                        </div>
                        <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="audio/*" style={{ display: 'none' }} />
                    </div>
                </div>

                {/* BIBLIOTECA UNIFICADA */}
                <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '24px', background: 'rgba(15, 23, 42, 0.5)', maxHeight: '400px', overflowY: 'auto' }}>
                    <h3 style={{ margin: '0 0 1rem 0', color: '#cbd5e1', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px', position: 'sticky', top: 0, background: 'rgba(15, 23, 42, 0.8)', padding: '5px 0' }}>
                        <Music size={18} /> BIBLIOTECA DE SESIÓN
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {lib.map(track => (
                            <div key={track.id} style={{ 
                                padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', 
                                display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid rgba(255,255,255,0.05)'
                            }}>
                                <img src={track.cover} alt={track.title} style={{ width: '45px', height: '45px', borderRadius: '8px', objectFit: 'cover' }} />
                                <div style={{ overflow: 'hidden', flex: 1 }}>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 'bold', whiteSpace: 'nowrap', textOverflow: 'ellipsis', color: 'white' }}>{track.title}</div>
                                    <div style={{ fontSize: '0.65rem', color: '#64748b' }}>{track.artist}</div>
                                    <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                                        <button 
                                            onClick={() => setDeckA({...deckA, track, isPlaying: false})} 
                                            style={{ flex: 1, background: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '4px', fontSize: '0.6rem', padding: '4px', fontWeight: '900', cursor: 'pointer' }}
                                        >CARGAR DECK A</button>
                                        <button 
                                            onClick={() => setDeckB({...deckB, track, isPlaying: false})} 
                                            style={{ flex: 1, background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', fontSize: '0.6rem', padding: '4px', fontWeight: '900', cursor: 'pointer' }}
                                        >CARGAR DECK B</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <audio ref={audioARef} src={deckA.track?.audio || null} />
            <audio ref={audioBRef} src={deckB.track?.audio || null} />
        </div>
    );
}
