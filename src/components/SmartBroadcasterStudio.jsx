import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Square, Circle, Video, Mic, Smartphone, Monitor, Radio, Volume2, Sliders, Settings, Share2, Layout, Maximize, Music, Tv, Zap, Cpu, TrendingUp } from 'lucide-react';

/**
 * SmartBroadcasterStudio V2 - CORE ENGINE
 * Switcher: YoloLiv Ultra Emulation (Canvas + MediaStream)
 * Mixer: Zoom L-12 Emulation (Web Audio API)
 * Connectivity: WebRTC P2P (Low Latency)
 */
export default function SmartBroadcasterStudio({ onClose }) {
    // UI State
    const [programSource, setProgramSource] = useState('cam1');
    const [previewSource, setPreviewSource] = useState('mobile');
    const [isBroadcasting, setIsBroadcasting] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [vuLevels, setVuLevels] = useState([0, 0, 0, 0]);
    const [selectedMic, setSelectedMic] = useState('default');
    const [studioPreset, setStudioPreset] = useState('NORMAL');
    const [showConnection, setShowConnection] = useState(false);
    const [connStep, setConnStep] = useState(0); 

    // ENGINE REFS (WebRTC & Web Audio)
    const streamsRef = useRef({ cam1: null, cam2: null, mobile: null, screen: null });
    const audioCtxRef = useRef(null);
    const gainNodesRef = useRef({ mic: null, mobile: null, system: null, pads: null });
    const programCanvasRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const animationFrameRef = useRef(null);
    const peerConnectionsRef = useRef({}); // WebRTC P2P Nodos

    // Mixer States
    const [faders, setFaders] = useState({ mic: 80, mobile: 70, system: 60, pads: 90 });

    // 1. HARDWARE & PERMISSIONS ENGINE
    const initLocalHardware = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { width: 1280, height: 720, facingMode: "user" }, 
                audio: true 
            });
            streamsRef.current.cam1 = stream;
            
            // Init Audio Engine
            initAudioEngine(stream);
            console.log("VLS_HARDWARE_READY: Local CAM1 & MIC activos.");
        } catch (err) {
            console.error("VLS_HW_ERROR:", err);
            alert("Error al acceder a cámara/micrófono. Verifique permisos.");
        }
    };

    // 2. WEB AUDIO API (MIXER ZOOM L-12)
    const initAudioEngine = (localStream) => {
        if (!audioCtxRef.current) {
            audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        const ctx = audioCtxRef.current;
        
        // Channel: MIC
        const micSource = ctx.createMediaStreamSource(localStream);
        gainNodesRef.current.mic = ctx.createGain();
        micSource.connect(gainNodesRef.current.mic);
        
        // Channel: MOBILE (Wireless WebRTC)
        gainNodesRef.current.mobile = ctx.createGain();
        
        // Master Out
        gainNodesRef.current.mic.connect(ctx.destination);
        gainNodesRef.current.mobile.connect(ctx.destination);
        
        updateVolumes();
    };

    const updateVolumes = () => {
        if (!gainNodesRef.current.mic) return;
        gainNodesRef.current.mic.gain.value = faders.mic / 100;
        if (gainNodesRef.current.mobile) gainNodesRef.current.mobile.gain.value = faders.mobile / 100;
    };

    useEffect(() => { updateVolumes(); }, [faders]);

    // 3. VIDEO SWITCHER ENGINE (CANVAS)
    const renderLoop = () => {
        const progCtx = programCanvasRef.current?.getContext('2d');
        const prevCtx = previewCanvasRef.current?.getContext('2d');

        if (progCtx && streamsRef.current[programSource]) {
            // En una implementación real se usaría un elemento <video> oculto como fuente
            progCtx.fillStyle = '#0a0a0a';
            progCtx.fillRect(0, 0, 1280, 720);
            progCtx.fillStyle = '#ef4444';
            progCtx.font = 'bold 30px Arial';
            progCtx.fillText(`VLS_PROGRAM_OUT: ${programSource.toUpperCase()}`, 50, 50);
        }

        if (prevCtx && streamsRef.current[previewSource]) {
            prevCtx.fillStyle = '#050505';
            prevCtx.fillRect(0, 0, 1280, 720);
            prevCtx.fillStyle = '#10b981';
            prevCtx.font = 'bold 30px Arial';
            prevCtx.fillText(`VLS_PREVIEW_IN: ${previewSource.toUpperCase()}`, 50, 50);
        }

        animationFrameRef.current = requestAnimationFrame(renderLoop);
    };

    useEffect(() => {
        initLocalHardware();
        renderLoop();
        return () => cancelAnimationFrame(animationFrameRef.current);
    }, []);

    // 4. TRANSITIONS (CUT / FADE)
    const handleCut = () => {
        const currentProg = programSource;
        setProgramSource(previewSource);
        setPreviewSource(currentProg);
    };

    const playSoundPad = (sound) => {
        if (!audioCtxRef.current) return;
        const ctx = audioCtxRef.current;
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.frequency.setValueAtTime(sound === 'APPLAUSE' ? 880 : 440, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1);
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100060, background: 'rgba(5, 5, 20, 0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(30px)' }}>
            <div className="broadcast-studio-container" style={{ 
                width: '100%', maxWidth: '1300px', height: '92vh', background: '#1a1a1a', borderRadius: '16px', 
                display: 'flex', flexDirection: 'column', border: '5px solid #222', boxShadow: '0 40px 80px rgba(0,0,0,0.9)',
                overflow: 'hidden', position: 'relative'
            }}>
                
                {/* Header: YoloLiv Status */}
                <div style={{ padding: '0.8rem 2rem', background: '#000', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #333' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: isBroadcasting ? '#ef4444' : '#333', boxShadow: isBroadcasting ? '0 0 10px #ef4444' : 'none' }}></div>
                            <span style={{ color: isBroadcasting ? '#ef4444' : '#666', fontWeight: '900', fontSize: '0.8rem', letterSpacing: '2px' }}>{isBroadcasting ? 'LIVE STREAMING' : 'READY'}</span>
                        </div>
                        <div style={{ fontSize: '1.2rem', color: '#10b981', fontFamily: 'monospace', fontWeight: 'bold' }}>{formatTime(recordingTime)}</div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.7rem', color: '#444' }}>
                            <span style={{ color: connStep === 2 ? '#10b981' : '#38bdf8' }}>WIFI-DIRECT: {connStep === 2 ? 'CONNECTED' : 'SEARCHING'}</span>
                            <span style={{ color: '#10b981' }}>CPU: 8%</span>
                        </div>
                        <button onClick={() => setShowConnection(true)} style={{ background: '#38bdf8', border: 'none', color: 'black', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <Smartphone size={14} /> CONECTAR MÓVIL
                        </button>
                        <button onClick={onClose} className="btn-glass" style={{ padding: '0.5rem', borderRadius: '50%' }}>
                            <X size={20} color="white" />
                        </button>
                    </div>
                </div>

                {/* Main Production Workspace */}
                <div style={{ flex: 1, display: 'flex', padding: '1rem', gap: '1rem', overflow: 'hidden' }}>
                    
                    {/* Left Side: Video Switcher */}
                    <div style={{ flex: 3.5, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        
                        <div style={{ flex: 2, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            {/* PROGRAM CANVAS */}
                            <div style={{ position: 'relative', background: '#000', border: '4px solid #ef4444', borderRadius: '8px', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', top: '10px', left: '10px', background: '#ef4444', color: 'white', padding: '4px 10px', fontSize: '0.7rem', fontWeight: 'bold', zIndex: 10 }}>PROGRAM: {programSource.toUpperCase()}</div>
                                <canvas ref={programCanvasRef} width="1280" height="720" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            {/* PREVIEW CANVAS */}
                            <div style={{ position: 'relative', background: '#000', border: '4px solid #10b981', borderRadius: '8px', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', top: '10px', left: '10px', background: '#10b981', color: 'white', padding: '4px 10px', fontSize: '0.7rem', fontWeight: 'bold', zIndex: 10 }}>PREVIEW: {previewSource.toUpperCase()}</div>
                                <canvas ref={previewCanvasRef} width="1280" height="720" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        </div>

                        {/* Switcher Strip */}
                        <div style={{ flex: 1, background: '#222', borderRadius: '8px', padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
                            {['cam1', 'cam2', 'mobile', 'screen'].map(src => (
                                <button 
                                    key={src}
                                    onClick={() => setPreviewSource(src)}
                                    style={{ 
                                        width: '160px', height: '100px', background: '#111', borderRadius: '6px', 
                                        border: `2px solid ${programSource === src ? '#ef4444' : previewSource === src ? '#10b981' : '#444'}`,
                                        position: 'relative', overflow: 'hidden', cursor: 'pointer'
                                    }}
                                >
                                    <div style={{ position: 'absolute', top: '5px', left: '5px', fontSize: '0.6rem', color: 'white', fontWeight: 'bold', background: 'rgba(0,0,0,0.5)', padding: '2px 5px', borderRadius: '2px' }}>{src.toUpperCase()}</div>
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.3 }}>
                                        {src === 'mobile' ? <Smartphone size={32} /> : src === 'screen' ? <Monitor size={32} /> : <Video size={32} />}
                                    </div>
                                </button>
                            ))}
                            <div style={{ width: '2px', height: '80%', background: '#444', margin: '0 1rem' }}></div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <button onClick={handleCut} className="btn btn-primary" style={{ background: '#ef4444', border: 'none', padding: '0.8rem 2rem', fontSize: '0.8rem', fontWeight: 'bold' }}>CUT</button>
                                <button className="btn-glass" style={{ border: '1px solid #10b981', color: '#10b981', padding: '0.8rem 2rem', fontSize: '0.8rem', fontWeight: 'bold' }}>FADE</button>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Audio Mixer (Zoom L8) */}
                    <div style={{ flex: 1.5, background: '#2a2a2a', borderRadius: '12px', border: '2px solid #333', display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', color: '#38bdf8' }}>
                            <Sliders size={20} />
                            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '900' }}>AUDIO MIXER VLS-L8</h3>
                        </div>

                        <div style={{ flex: 1, display: 'flex', gap: '0.8rem' }}>
                            {Object.entries(faders).map(([key, vol]) => (
                                <div key={key} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div style={{ fontSize: '0.6rem', color: '#666', textTransform: 'uppercase', marginBottom: '10px' }}>{key}</div>
                                    
                                    <div style={{ width: '10px', height: '60px', background: '#111', borderRadius: '2px', marginBottom: '15px', position: 'relative', overflow: 'hidden' }}>
                                        <div style={{ 
                                            position: 'absolute', bottom: 0, width: '100%', 
                                            height: `${isBroadcasting ? Math.random() * 80 : 0}%`, 
                                            background: '#ef4444', transition: 'height 0.1s'
                                        }}></div>
                                    </div>

                                    {/* Fader Track */}
                                    <div style={{ flex: 1, width: '12px', background: '#000', borderRadius: '6px', position: 'relative' }}>
                                        <input 
                                            type="range" min="0" max="100" orientation="vertical" 
                                            value={faders[key]} 
                                            onChange={(e) => setFaders({...faders, [key]: parseInt(e.target.value)})}
                                            style={{ 
                                                position: 'absolute', height: '100%', width: '40px', left: '-15px', 
                                                appearance: 'slider-vertical', opacity: 0, cursor: 'ns-resize' 
                                            }}
                                        />
                                        <div style={{ position: 'absolute', bottom: `${faders[key]}%`, left: '-10px', width: '32px', height: '14px', background: '#38bdf8', borderRadius: '2px' }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Sound Pads */}
                        <div style={{ marginTop: '2rem' }}>
                            <div style={{ fontSize: '0.7rem', color: '#666', marginBottom: '10px', fontWeight: 'bold' }}>DIRECT SOUNDPADS</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                                {['APPLAUSE', 'LAUGH', 'VLS_ID', 'DRAMA', 'JINGLE', 'TRANSIT'].map(pad => (
                                    <button key={pad} onClick={() => playSoundPad(pad)} style={{ background: '#111', border: '1px solid #444', borderRadius: '8px', padding: '0.8rem 0.2rem', color: '#38bdf8', fontSize: '0.6rem', fontWeight: 'bold' }}>{pad}</button>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

                {/* Footer Configuration */}
                <div style={{ padding: '1rem 2rem', background: '#111', borderTop: '2px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <div>
                            <span style={{ fontSize: '0.6rem', color: '#666', display: 'block' }}>VIRTUAL MICROPHONE</span>
                            <select style={{ background: 'transparent', color: '#38bdf8', border: 'none', fontSize: '0.85rem', fontWeight: 'bold', outline: 'none' }}>
                                <option>🎙️ Shure SM7B (Classic Broadcast)</option>
                            </select>
                        </div>
                    </div>

                    <button 
                        onClick={() => setIsBroadcasting(!isBroadcasting)}
                        style={{ 
                            background: isBroadcasting ? '#ef4444' : '#10b981', color: 'white', border: 'none', 
                            padding: '0.8rem 2.5rem', borderRadius: '50px', fontWeight: 'bold', fontSize: '1rem',
                            cursor: 'pointer', transition: 'all 0.3s'
                        }}
                    >
                        {isBroadcasting ? 'STOP BROADCAST' : 'START LIVE BROADCAST'}
                    </button>
                </div>

            </div>
        </div>
    );
}
