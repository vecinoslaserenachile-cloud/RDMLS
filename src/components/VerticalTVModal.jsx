import React, { useState, useRef } from 'react';
import { X, Tv, Volume2, Sun, Contrast, VolumeX, Smartphone, Maximize2, Minimize2, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

export default function VerticalTVModal({ onClose, inline = false }) {
    const [channel, setChannel] = useState(1);
    const [brightness, setBrightness] = useState(100);
    const [contrast, setContrast] = useState(100);
    const [isPowerOn, setIsPowerOn] = useState(true);
    const [isChangingChannel, setIsChangingChannel] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isExpanded, setIsExpanded] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [size, setSize] = useState({ width: 380, height: 750 });
    const screenRef = useRef(null);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            screenRef.current?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const toggleMaximize = () => {
        setIsMaximized(!isMaximized);
    };

    const resetToDefault = () => {
        setIsMaximized(false);
        setIsFullscreen(false);
        setSize({ width: 380, height: 750 });
    };
    const channels = {
        1: { name: 'Instagram VLS', url: 'https://www.instagram.com/p/DWJTy7WjtXi/embed/captioned', cat: 'INSTAGRAM', label: 'IG-1', iframeType: 'instagram' },
        2: { name: 'Twitter X Update', url: 'https://platform.twitter.com/embed/Tweet.html?id=2019962765981655395', cat: 'TWITTER / X', label: 'X-VLS', iframeType: 'basic' },
        3: { name: 'TikTok Viral', url: 'https://www.tiktok.com/embed/v2/7300000000000000000', rawUrl: 'https://vt.tiktok.com/ZSusjQ3wL/', cat: 'TIKTOK VLS', label: 'TK-1', iframeType: 'basic' },
        4: { name: 'Facebook Reel 1', url: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fshare%2Fv%2F1DXH72bPCw%2F&show_text=false&width=300', cat: 'FACEBOOK', label: 'FB-1', iframeType: 'basic' },
        5: { name: 'Facebook Reel 2', url: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fshare%2Fv%2F1AtYd7iEgM%2F&show_text=false&width=300', cat: 'FACEBOOK', label: 'FB-2', iframeType: 'basic' }
    };

    const playTacSound = () => {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(400, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);
            gain.gain.setValueAtTime(0.2, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
            osc.connect(gain);
            gain.connect(ctx.destination);
            const playPromise = osc.start();
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                     // Play started
                }).catch(error => {
                     // Error handling
                });
            }
            osc.stop(ctx.currentTime + 0.1);
        } catch (e) { }
    };

    const handleChannelChange = (newChannel) => {
        playTacSound();
        if (!isPowerOn) return;
        setIsChangingChannel(true);
        setChannel(newChannel);
        // Simular estática vertical al cambiar de canal social
        setTimeout(() => {
            setIsChangingChannel(false);
            setIsPlaying(true);
        }, 500);
    };

    const currentChannel = channels[channel];

    return (
        <motion.div 
            drag={!isMaximized}
            dragMomentum={false}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
                opacity: 1, 
                scale: 1,
                width: isMaximized ? '100vw' : size.width,
                height: isMaximized ? '100vh' : 'auto',
                ...(isMaximized ? { top: 0, left: 0, right: 0 } : {})
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{ 
                position: isMaximized ? 'fixed' : (inline ? 'relative' : 'fixed'),
                zIndex: 100000, 
                display: 'flex', 
                flexDirection: 'column',
                cursor: 'default',
                maxHeight: isMaximized ? '100vh' : '90vh',
                overflow: 'hidden',
                ...(!isMaximized ? {
                    top: inline ? 'auto' : '100px',
                    left: inline ? 'auto' : 'auto',
                    right: inline ? 'auto' : '50px'
                } : {})
            }}
        >
            {/* Header / Drag Handle */}
            <div 
              style={{ 
                  background: '#1e293b', padding: '10px 15px', display: 'flex', 
                  justifyContent: 'space-between', alignItems: 'center', 
                  borderTopLeftRadius: '15px', borderTopRightRadius: '15px', 
                  border: '2px solid #000', borderBottom: 'none', cursor: 'grab',
                  boxShadow: '0 -5px 15px rgba(0,0,0,0.5)', width: '100%', maxWidth: '380px', margin: '0 auto' 
              }}
            >
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', fontWeight: 'bold', color: '#38bdf8' }}>
                  <Smartphone size={16} />
                  <span>TV VERTICAL SOCIAL</span>
               </div>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                   <button onClick={resetToDefault} title="Reset" style={{ background: 'transparent', border: 'none', color: '#38bdf8', cursor: 'pointer', padding: 0 }}><Smartphone size={16} /></button>
                   <button onClick={toggleMaximize} title="Maximize" style={{ background: 'transparent', border: 'none', color: '#facc15', cursor: 'pointer', padding: 0 }}>
                      {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                   </button>
                   <button onClick={toggleFullscreen} title="Fullscreen" style={{ background: 'transparent', border: 'none', color: '#10b981', cursor: 'pointer', padding: 0 }}>
                      <Monitor size={16} />
                   </button>
                   <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 0 }}>
                      <X size={16} />
                   </button>
                </div>
            </div>

            {/* Contenedor principal de la TV VERTICAL */}
            {isExpanded && (
                <div className="vertical-tv-casing vertical-tv-wrapper" style={{
                    width: '100%',
                    height: isMaximized ? 'calc(100vh - 40px)' : 'auto',
                    background: '#8b4513', // Misma madera clásica del OldTVModal
                    border: '12px solid #5c2e0b',
                    borderTopLeftRadius: '0', borderTopRightRadius: '0',
                    borderBottomLeftRadius: '35px', borderBottomRightRadius: '35px',
                    padding: isMaximized ? '2rem' : '1rem',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: isMaximized ? '2rem' : '1rem',
                    margin: '0 auto',
                    position: 'relative'
                }}>

                {/* Pantalla Vertical (Tubo CRT Formato 9:16) */}
                <div ref={screenRef} className="vertical-tv-screen" style={{
                    width: '100%',
                    background: '#0a0a0a',
                    borderRadius: '30px', 
                    border: '15px solid #1a1a1a',
                    boxShadow: 'inset 0 0 30px rgba(255,255,255,0.1), 0 0 20px rgba(0,0,0,0.9)',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'block',
                    aspectRatio: '9/16' // VERTICAL!
                }}>
                    {isPowerOn ? (
                        <>
                            {isChangingChannel ? (
                                <div style={{ position: 'absolute', inset: 0, background: 'url(https://media.giphy.com/media/Yy26NRbpB9lDi/giphy.gif) center/cover', opacity: 0.6, zIndex: 5, transform: 'rotate(90deg) scale(1.5)' }}></div>
                            ) : null}

                            <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: '#000' }}>
                                
                                {isPlaying ? (
                                    <iframe
                                        key={currentChannel.url} // Forzar recarga al cambiar url
                                        src={currentChannel.url}
                                        frameBorder="0"
                                        allow="autoplay; encrypted-media;"
                                        allowFullScreen
                                        scrolling="no"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            position: 'absolute',
                                            top: 0, left: 0,
                                            filter: `brightness(${brightness}%) contrast(${contrast}%) sepia(5%)`,
                                            opacity: isChangingChannel ? 0 : 1,
                                            zIndex: 0,
                                            background: '#fff' // Muchas rrss tienen fondo blanco default
                                        }}
                                    />
                                ) : (
                                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', filter: `brightness(${brightness}%) contrast(${contrast}%)`, zIndex: 1 }}>
                                        <div style={{ flex: '7', background: 'linear-gradient(180deg, #c0c0c0 14.28%, #c0c000 14.28% 28.57%, #00c0c0 28.57% 42.85%, #00c000 42.85% 57.14%, #c000c0 57.14% 71.42%, #c00000 71.42% 85.71%, #0000c0 85.71%)' }}></div>
                                        <div style={{ flex: '1', background: 'linear-gradient(180deg, #0000c0 14.28%, #111 14.28% 28.57%, #c000c0 28.57% 42.85%, #111 42.85% 57.14%, #00c0c0 57.14% 71.42%, #111 71.42% 85.71%, #c0c0c0 85.71%)' }}></div>
                                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'black', color: 'white', padding: '10px 20px', fontFamily: 'monospace', fontSize: '1.5rem', border: '3px solid white', borderRadius: '5px' }}>PAUSA</div>
                                    </div>
                                )}

                                {/* Scanlines Effect adaptado a Vertical */}
                                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(0deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 4px, 100% 6px', pointerEvents: 'none', zIndex: 10 }}></div>
                                <div className="old-tv-ch-label" style={{ position: 'absolute', top: '15px', right: '20px', color: '#00ff00', fontFamily: 'monospace', fontSize: '1.5rem', fontWeight: 'bold', textShadow: '0 0 10px #00ff00', zIndex: 12, background: 'rgba(0,0,0,0.5)', padding: '2px 8px', borderRadius: '4px' }}>
                                    CH {channel}
                                </div>
                                <img src="/logo_vls.png" alt="VLS" style={{ position: 'absolute', bottom: '20px', right: '20px', width: '40px', opacity: 0.6, zIndex: 12, filter: 'grayscale(100%) contrast(200%) brightness(150%)', pointerEvents: 'none' }} />
                            </div>
                        </>
                    ) : (
                        <div style={{ position: 'absolute', inset: 0, background: '#050505' }}></div>
                    )}
                </div>

                {/* Panel Inferior de Controles (Reubicado verticalmente) */}
                <div className="vertical-tv-panel" style={{
                    background: '#d4d4d4',
                    border: '4px solid #a3a3a3',
                    borderTop: '10px solid #737373',
                    borderRadius: '10px',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    boxShadow: 'inset 0 5px 15px rgba(0,0,0,0.2)'
                }}>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {/* Botón Encendido */}
                        <button onClick={() => setIsPowerOn(!isPowerOn)} style={{ background: isPowerOn ? '#ef4444' : '#7f1d1d', color: 'white', borderRadius: '50%', width: '50px', height: '50px', border: '3px solid #450a0a', boxShadow: isPowerOn ? 'inset 0 0 10px rgba(255,255,255,0.5), 0 0 15px #ef4444' : '0 4px 0 #450a0a', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: isPowerOn ? 'translateY(2px)' : 'none' }}>
                            <Tv size={24} />
                        </button>
                        
                        {/* Pantalla LED Redes Sociales */}
                        <div style={{ background: '#0a0a0a', border: '3px solid #1a1a1a', borderRadius: '6px', padding: '6px 12px', boxShadow: 'inset 0 0 15px rgba(0,0,0,0.9)', textAlign: 'center', fontFamily: '"Courier New", Courier, monospace', color: isPowerOn ? '#3b82f6' : '#001', fontSize: '0.9rem', fontWeight: 'bold', letterSpacing: '2px', textShadow: isPowerOn ? '0 0 8px #3b82f6' : 'none', flex: 1, margin: '0 1rem' }}>
                            {isPowerOn ? currentChannel.cat : '---'}
                        </div>
                    </div>

                    {/* Selector de Canales Estilo Perilla y Botones de Reproducción */}
                    <div style={{ width: '100%', textAlign: 'center' }}>
                        
                        {/* Controles VCR: PLAY, PAUSE, CH+, CH- */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', background: '#222', padding: '8px', borderRadius: '8px', border: '2px solid #111' }}>
                            <div style={{ display: 'flex', gap: '5px' }}>
                                <button onClick={() => { if(isPowerOn) { setIsPlaying(true); playTacSound(); } }} style={{ background: '#475569', color: 'white', padding: '5px 15px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem', boxShadow: '0 2px 0 #0f172a' }}>PLAY</button>
                                <button onClick={() => { if(isPowerOn) { setIsPlaying(false); playTacSound(); } }} style={{ background: '#475569', color: 'white', padding: '5px 15px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem', boxShadow: '0 2px 0 #0f172a' }}>PAUSE</button>
                            </div>
                            <div style={{ display: 'flex', gap: '5px' }}>
                                <button onClick={() => handleChannelChange(channel < 5 ? channel + 1 : 1)} style={{ background: '#3b82f6', color: 'white', padding: '5px 15px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem', boxShadow: '0 2px 0 #1d4ed8' }}>CH +</button>
                                <button onClick={() => handleChannelChange(channel > 1 ? channel - 1 : 5)} style={{ background: '#3b82f6', color: 'white', padding: '5px 15px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem', boxShadow: '0 2px 0 #1d4ed8' }}>CH -</button>
                            </div>
                        </div>

                        <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#172554', marginBottom: '5px', textTransform: 'uppercase' }}>Señales Verticales</div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px' }}>
                            {[1, 2, 3, 4, 5].map(ch => (
                                <button
                                    key={ch}
                                    onClick={() => handleChannelChange(ch)}
                                    style={{
                                        background: channel === ch && isPowerOn ? '#3b82f6' : '#475569',
                                        color: 'white', border: '2px solid #1e293b', borderRadius: '6px',
                                        padding: '8px 2px', fontSize: '0.7rem', fontWeight: '900',
                                        cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', lineHeight: '1.2',
                                        boxShadow: channel === ch && isPowerOn ? 'inset 0 0 10px rgba(0,0,0,0.5)' : '0 2px 0 #1e293b',
                                        transform: channel === ch && isPowerOn ? 'translateY(2px)' : 'none'
                                    }}
                                >
                                    <span>CH {ch}</span>
                                    <span style={{ fontSize: '0.5rem', opacity: 0.8 }}>{channels[ch].label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Sun size={20} color="#172554" />
                        <input type="range" min="50" max="150" value={brightness} onChange={(e) => setBrightness(e.target.value)} style={{ flex: 1, accentColor: '#1e293b' }} />
                        <Contrast size={20} color="#172554" style={{ marginLeft: '10px' }} />
                        <input type="range" min="50" max="200" value={contrast} onChange={(e) => setContrast(e.target.value)} style={{ flex: 1, accentColor: '#1e293b' }} />
                    </div>

                    {/* Grilla Altavoz Inferior */}
                    <div style={{ width: '100%', height: '40px', background: 'repeating-linear-gradient(90deg, #172554, #172554 2px, transparent 2px, transparent 6px)', borderRadius: '4px', opacity: 0.8, marginTop: 'auto' }}></div>
                </div>

                {/* Marca Logo VLS Redes */}
                <div style={{ position: 'absolute', bottom: '15px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', pointerEvents: 'none' }}>
                    <div style={{ fontFamily: 'serif', fontSize: isMaximized ? '1.5rem' : '1rem', fontWeight: '900', color: '#ffd700', textShadow: '2px 2px 4px rgba(0,0,0,0.8)', letterSpacing: '2px', textAlign: 'center', textTransform: 'uppercase' }}>
                        VECINOS SMART · FORMATO VERTICAL
                    </div>
                </div>

                {/* Resize Handle */}
                {!isMaximized && (
                    <div 
                        onMouseDown={(e) => {
                            const startX = e.clientX;
                            const startY = e.clientY;
                            const startW = size.width;
                            const startH = size.height;

                            const onMouseMove = (moveEvent) => {
                                setSize({
                                    width: Math.max(300, startW + (moveEvent.clientX - startX)),
                                    height: Math.max(500, startH + (moveEvent.clientY - startY))
                                });
                            };

                            const onMouseUp = () => {
                                window.removeEventListener('mousemove', onMouseMove);
                                window.removeEventListener('mouseup', onMouseUp);
                            };

                            window.addEventListener('mousemove', onMouseMove);
                            window.addEventListener('mouseup', onMouseUp);
                        }}
                        style={{ 
                            position: 'absolute', bottom: 0, right: 0, width: '20px', height: '20px', 
                            cursor: 'nwse-resize', zIndex: 100,
                            background: 'linear-gradient(135deg, transparent 50%, #5c2e0b 50%)',
                            borderRadius: '0 0 35px 0'
                        }} 
                    />
                )}
                </div>
            )}
        </motion.div>
    );
}
