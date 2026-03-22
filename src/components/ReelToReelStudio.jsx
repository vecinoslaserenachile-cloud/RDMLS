import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Square, Circle, FastForward, Rewind, Settings2, Sliders, Volume2, AudioLines, Move } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReelToReelStudio({ onClose }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [tapeProgress, setTapeProgress] = useState(0);
    const [vuLevels, setVuLevels] = useState([0, 0]);
    const [channelVolumes, setChannelVolumes] = useState([80, 70, 90, 60, 85, 75, 50, 65]);

    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef(null);
    const analyzerRef = useRef(null);
    const requestRef = useRef();

    const initAudio = () => {
        if (!audioRef.current) {
            const audio = new Audio("https://raw.githubusercontent.com/vecinoslaserenachile-cloud/RDMLS/main/assets/assets/audio/Vamos%20a%20recordar%20y%20pensar.mp3");
            audio.crossOrigin = "anonymous";
            audioRef.current = audio;

            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioContext();
            const source = ctx.createMediaElementSource(audio);
            const analyzer = ctx.createAnalyser();
            analyzer.fftSize = 64;
            source.connect(analyzer);
            analyzer.connect(ctx.destination);
            analyzerRef.current = analyzer;
        }
    };

    const animateVU = () => {
        if (isPlaying && analyzerRef.current) {
            const dataArray = new Uint8Array(analyzerRef.current.frequencyBinCount);
            analyzerRef.current.getByteFrequencyData(dataArray);
            
            const avg = dataArray.reduce((acc, v) => acc + v, 0) / dataArray.length;
            setVuLevels([
                Math.min(100, avg * 1.5 + (Math.random() * 5)),
                Math.min(100, avg * 1.4 + (Math.random() * 8))
            ]);
        } else if (isRecording) {
            setVuLevels([
                Math.random() * 30 + 30,
                Math.random() * 30 + 30
            ]);
        } else {
            setVuLevels([0, 0]);
        }

        if (audioRef.current && isPlaying) {
            setCurrentTime(audioRef.current.currentTime);
        }

        requestRef.current = requestAnimationFrame(animateVU);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animateVU);
        return () => cancelAnimationFrame(requestRef.current);
    }, [isPlaying, isRecording]);

    useEffect(() => {
        let interval;
        if (isPlaying || isRecording) {
            interval = setInterval(() => {
                setTapeProgress(prev => (prev + 0.1) % 360);
            }, 16);
        }
        return () => clearInterval(interval);
    }, [isPlaying, isRecording]);

    const handleAction = async (type) => {
        if (type === 'play') {
            initAudio();
            audioRef.current.play();
            setIsPlaying(true);
            setIsRecording(false);
            window.dispatchEvent(new CustomEvent('mute_global_radio'));
        } else if (type === 'stop') {
            if (audioRef.current) audioRef.current.pause();
            setIsPlaying(false);
            setIsRecording(false);
            window.dispatchEvent(new CustomEvent('radio-resume'));
        } else if (type === 'rec') {
            initAudio(); // Also init for recording simulation
            setIsPlaying(false);
            setIsRecording(true);
            alert("RECORDING MASTER TAPE... Simulando ingesta analógica.");
        }
    };

    return (
        <motion.div 
            drag
            dragMomentum={false}
            style={{ 
                position: 'fixed', inset: 0, zIndex: 100005, 
                background: 'rgba(5, 5, 10, 0.95)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                padding: '1rem', backdropFilter: 'blur(30px)',
                width: '100vw', height: '100vh', pointerEvents: 'none'
            }}
        >
            <div className="analog-mastering-panel animate-scale-in" style={{ 
                width: '100%', maxWidth: '1100px', height: '90vh', 
                background: '#e5e5e5', 
                borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column',
                border: '4px solid #333', boxShadow: '0 50px 100px rgba(0,0,0,0.8)',
                pointerEvents: 'auto'
            }}>
                {/* Header (Drag Handle) */}
                <div style={{ background: '#000', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #333', cursor: 'grab' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Move size={14} color="#38bdf8" />
                        <span style={{ color: '#666', fontSize: '0.65rem', fontWeight: '900', letterSpacing: '2px' }}>VLS_MASTER_RECORDER_REVOX_SIM</span>
                    </div>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                        <X size={20} />
                    </button>
                </div>

                {/* Upper Section: The Reels */}
                <div style={{ flex: 1.2, background: '#f0f0f0', display: 'flex', justifyContent: 'space-around', alignItems: 'center', position: 'relative', borderBottom: '2px solid #ccc', overflow: 'hidden' }}>
                    
                    {/* Moving Tape Line (Visual Connection) */}
                    {(isPlaying || isRecording) && (
                        <div style={{ 
                            position: 'absolute', top: '55%', left: '15%', right: '15%', height: '4px', 
                            background: '#222', zIndex: 0, boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                            animation: 'analog-tape-jitter 0.1s infinite alternate'
                        }}></div>
                    )}
                    <style>{`
                        @keyframes analog-tape-jitter {
                            from { transform: translateY(-1px); }
                            to { transform: translateY(1px); }
                        }
                    `}</style>

                    {/* Left Reel */}
                    <div style={{ position: 'relative', width: '380px', height: '380px', zIndex: 1 }}>
                        <div style={{ 
                            width: '100%', height: '100%', borderRadius: '50%', background: '#ccc', 
                            border: '4px solid #999', boxShadow: 'inset 0 0 40px rgba(0,0,0,0.4)',
                            transform: `rotate(${tapeProgress}deg)`, transition: 'transform 0.016s linear',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                             <div style={{ width: '90%', height: '90%', borderRadius: '50%', background: 'linear-gradient(135deg, #eee, #999)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ width: '40%', height: '15%', background: '#ff0055', position: 'absolute', top: '15%', borderRadius: '4px', textAlign: 'center', color: 'white', fontSize: '10px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>AMPEX 456</div>
                                <div style={{ width: '10px', height: '100%', background: 'rgba(0,0,0,0.1)', position: 'absolute' }}></div>
                                <div style={{ width: '100%', height: '10px', background: 'rgba(0,0,0,0.1)', position: 'absolute' }}></div>
                                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#333', border: '5px solid #666' }}></div>
                             </div>
                        </div>
                    </div>

                    {/* Bridge Center (Revox Logo) */}
                    <div style={{ width: '200px', height: '60px', background: '#ccc', border: '1px solid #999', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.2)', zIndex: 1, marginTop: '100px' }}>
                        <h1 style={{ color: '#333', fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '2px', fontFamily: 'serif' }}>REVOX</h1>
                    </div>

                    {/* Right Reel */}
                    <div style={{ position: 'relative', width: '380px', height: '380px' }}>
                        <div style={{ 
                            width: '100%', height: '100%', borderRadius: '50%', background: '#ccc', 
                            border: '4px solid #999', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3)',
                            transform: `rotate(${tapeProgress}deg)`, transition: 'transform 0.016s linear',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                             <div style={{ width: '90%', height: '90%', borderRadius: '50%', background: 'linear-gradient(135deg, #eee, #999)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ width: '40%', height: '15%', background: '#38bdf8', position: 'absolute', bottom: '15%', borderRadius: '4px', textAlign: 'center', color: 'white', fontSize: '10px', fontWeight: 'bold' }}>MAXELL XL-I</div>
                                <div style={{ width: '10px', height: '100%', background: 'rgba(0,0,0,0.1)', position: 'absolute' }}></div>
                                <div style={{ width: '100%', height: '10px', background: 'rgba(0,0,0,0.1)', position: 'absolute' }}></div>
                                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#333', border: '5px solid #666' }}></div>
                             </div>
                        </div>
                    </div>

                    {/* Close button Overlay */}
                    <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: 'white', border: '2px solid #333', borderRadius: '50%', padding: '10px', cursor: 'pointer', zIndex: 10 }}>
                        <X size={24} color="#333" />
                    </button>
                </div>

                {/* Digital Time Counter & Project Info */}
                <div style={{ padding: '1rem 2rem', background: '#111', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ background: '#000', padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid #444' }}>
                            <div style={{ color: '#ef4444', fontFamily: 'monospace', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                00:0{Math.floor(tapeProgress/60)}:0{Math.floor(tapeProgress%60)}
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ color: '#38bdf8', fontSize: '0.6rem', fontWeight: 'bold', letterSpacing: '1px' }}>PROJECT_MASTER:</span>
                            <span style={{ color: 'white', fontSize: '1rem', fontWeight: '900', letterSpacing: '1px' }}>VALS "MIS RECUERDOS" - MASTER TAPE 1982</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <span style={{ color: '#10b981', fontSize: '0.7rem', border: '1px solid #10b981', padding: '2px 8px', borderRadius: '4px' }}>44.1 kHz / 24 bit</span>
                        <span style={{ color: '#f59e0b', fontSize: '0.7rem', border: '1px solid #f59e0b', padding: '2px 8px', borderRadius: '4px' }}>ANALOG_BYPASS: ON</span>
                    </div>
                </div>

                {/* Lower Section: Controls & Meters */}
                <div style={{ flex: 1, background: '#222', padding: '2rem', display: 'flex', gap: '2rem' }}>
                    
                    {/* Left: 8 Channel Mixer (Sliders) */}
                    <div style={{ flex: 3, display: 'flex', gap: '0.5rem', background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '8px', border: '1px solid #444' }}>
                        {channelVolumes.map((vol, i) => (
                            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                                <div style={{ height: '30px', color: '#94a3b8', fontSize: '0.7rem' }}>CH{i+1}</div>
                                <div style={{ width: '8px', flex: 1, background: '#111', borderRadius: '4px', position: 'relative', border: '1px solid #333' }}>
                                    <div style={{ 
                                        position: 'absolute', bottom: `${vol}%`, left: '-12px', width: '32px', height: '12px', 
                                        background: '#38bdf8', borderRadius: '2px', cursor: 'pointer', border: '1px solid white'
                                    }} />
                                    {/* Tick marks */}
                                    {[0, 20, 40, 60, 80, 100].map(tick => (
                                        <div key={tick} style={{ position: 'absolute', bottom: `${tick}%`, left: '100%', width: '4px', height: '1px', background: '#444' }} />
                                    ))}
                                </div>
                                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#333', border: '1px solid #444' }}></div>
                            </div>
                        ))}
                    </div>

                    {/* Right: Master Control & Meters */}
                    <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        
                        {/* Secondary Status Info */}
                        <div style={{ background: '#000', padding: '0.8rem', borderRadius: '4px', border: '2px solid #333', textAlign: 'center' }}>
                            <div style={{ color: isPlaying || isRecording ? '#10b981' : '#444', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                {isRecording ? 'RECORDING MASTER' : isPlaying ? 'PLAYING MASTER' : 'READY'}
                            </div>
                            <div style={{ color: '#444', fontSize: '0.6rem', marginTop: '4px' }}>TAPE DECK STATUS</div>
                        </div>

                        {/* Analog VU Meters */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            {[0, 1].map(i => (
                                <div key={i} style={{ background: '#eee', height: '100px', borderRadius: '4px', border: '2px solid #555', position: 'relative', overflow: 'hidden' }}>
                                    <div style={{ position: 'absolute', bottom: '10px', left: '10px', color: '#222', fontSize: '0.8rem', fontWeight: 'bold' }}>VU {i === 0 ? 'L' : 'R'}</div>
                                    {/* Gauge Background */}
                                    <div style={{ position: 'absolute', top: '10px', left: '10px', right: '10px', height: '60px', borderBottom: '1px solid #999', borderRadius: '0 0 50% 50% / 0 0 100% 100%' }}></div>
                                    {/* Needle */}
                                    <div style={{ 
                                        position: 'absolute', bottom: '-10px', left: '50%', width: '2px', height: '80px', 
                                        background: '#333', transformOrigin: 'bottom center',
                                        transform: `translateX(-50%) rotate(${vuLevels[i] - 40}deg)`,
                                        transition: 'transform 0.1s ease'
                                    }}></div>
                                    <div style={{ position: 'absolute', top: '20px', right: '15px', color: '#ef4444', fontSize: '0.6rem', fontWeight: 'bold' }}>+3dB</div>
                                </div>
                            ))}
                        </div>

                        {/* Transport Buttons */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginTop: 'auto' }}>
                            <button onClick={() => handleAction('rec')} style={{ background: isRecording ? '#ef4444' : '#333', padding: '1rem', border: '1px solid #555', borderRadius: '4px', color: isRecording ? 'white' : '#ef4444', cursor: 'pointer' }}><Circle size={24} fill={isRecording ? 'white' : 'none'} /></button>
                            <button onClick={() => handleAction('stop')} style={{ background: '#333', padding: '1rem', border: '1px solid #555', borderRadius: '4px', color: 'white', cursor: 'pointer' }}><Square size={24} fill="white" /></button>
                            <button onClick={() => handleAction('play')} style={{ background: isPlaying ? '#10b981' : '#333', padding: '1rem', border: '1px solid #555', borderRadius: '4px', color: isPlaying ? 'white' : '#10b981', cursor: 'pointer' }}><Play size={24} fill={isPlaying ? 'white' : 'none'} /></button>
                            <button className="btn-glass" style={{ background: '#333', padding: '1rem', border: '1px solid #555', borderRadius: '4px', color: '#38bdf8', cursor: 'pointer' }}><FastForward size={24} /></button>
                        </div>
                    </div>

                </div>

                {/* Footer Labels */}
                <div style={{ padding: '0.8rem 2rem', background: '#ccc', borderTop: '2px solid #999', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <span style={{ fontSize: '0.8rem', color: '#333', fontWeight: 'bold' }}>8 CHANNEL ANALOG MASTERING</span>
                        <span style={{ fontSize: '0.8rem', color: '#333', fontWeight: 'bold' }}>HIGH BIAS 15 IPS</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                         <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: isPlaying || isRecording ? '#10b981' : '#666', boxShadow: isPlaying || isRecording ? '0 0 10px #10b981' : 'none' }}></div>
                         <span style={{ fontSize: '0.8rem', color: '#333', fontWeight: 'bold' }}>SYNC MODE</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
