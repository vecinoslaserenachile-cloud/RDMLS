import React, { useState } from 'react';
import { X, Power, FastForward, Rewind, Play, Sun, Contrast, Volume2, Sparkles } from 'lucide-react';

export default function VhsTVModal({ onClose }) {
    const [channel, setChannel] = useState(1);
    const [isPowerOn, setIsPowerOn] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    const [channelStatus, setChannelStatus] = useState('checking'); // ok, static
    const [brightness, setBrightness] = useState(100);
    const [contrast, setContrast] = useState(100);
    const [volume, setVolume] = useState(channel === 9 ? 25 : 50);

    const playMechanicalSound = () => {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(50, ctx.currentTime);
            osc.frequency.linearRampToValueAtTime(120, ctx.currentTime + 0.1);
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.2);
        } catch (e) { }
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
            osc.start();
            osc.stop(ctx.currentTime + 0.1);
        } catch (e) { }
    };

    const channels = {
        1: { name: 'Faro Monumental (Vivo)', videoId: 'fUeo_EhVFTY', cat: 'VHS-SP', label: 'VIVO' },
        2: { name: 'EntreVecinas Radio VLS', videoId: 'jWmaGafzEuk', cat: 'V-RADIO', label: 'RADIO' },
        3: { name: 'Seguridad Ciudadana', videoId: '9W_3M99B5Q0', cat: 'VHS-LP', label: 'SEGUR' },
        4: { name: 'Serenito Viaje Tiempo', videoId: 'HHHC7oEyyj4', cat: 'VHS-EP', label: 'SEREN' },
        5: { name: 'Serenito Marca Oficial', videoId: 'O6rEZwVbIPY', cat: 'VHS-SP', label: 'BRAND' },
        6: { name: 'La Serena Histo 1972', videoId: 'n3LZGaXvqiY', cat: 'VHS-SP', label: 'RETRO' },
        7: { name: 'TV Senado Chile', videoId: '6m5IXZk-oHE', cat: 'INSTIT', label: 'SENAD' },
        8: { name: '24 Horas Noticias', videoId: 'Nu775nv_Ppc', cat: 'TELEX', label: 'NEWS' },
        9: { name: 'NASA Space Live', videoId: 'zPH5KtjJFaQ', cat: 'VHS-HI', label: 'SPACE' },
        10: { name: 'JAXA Moon Live', videoId: 'rtQ0itlyLPI', cat: 'VHS-SP', label: 'MOON' },
        11: { name: 'Muni San José Maipo', videoId: 'M7lc1UVf-VE', cat: 'MUNI', label: 'MUNI' },
        12: { name: 'YouTube Developers', videoId: 'M7lc1UVf-VE', cat: 'SYS', label: 'DEV' },
        13: { name: 'El Hombre Nuclear', videoId: 'Y2qGy-ezuIY', cat: 'CLASSIC', label: 'TV80S' },
        14: { name: 'Misión Imposible', videoId: 't3uKEHojJGg', cat: 'CLASSIC', label: 'TV80S' },
        15: { name: 'El Auto Fantástico (KITT)', videoId: 'qlICHi6Vvn0', cat: 'CLASSIC', label: 'KITT' },
        16: { name: 'DW Español (Mundo)', videoId: 'jRnqxURJ120', cat: 'CULTUR', label: 'MUNDO' },
        17: { name: 'La Serena Antigua (VCR)', videoId: 'n3LZGaXvqiY', cat: 'HISTO', label: 'VCR' }
    };

    const checkChannelSignal = (chInfo, chNum) => {
        setChannelStatus('checking');

        const img = new Image();
        img.onload = () => {
            if (img.width === 120 || img.naturalWidth === 120) {
                setChannelStatus('static');
            } else {
                setChannelStatus('ok');
            }
        };
        img.onerror = () => {
            setChannelStatus('ok');
        };
        img.src = `https://img.youtube.com/vi/${chInfo.videoId}/mqdefault.jpg`;
    };

    React.useEffect(() => {
        checkChannelSignal(channels[channel], channel);
    }, []);

    const handleChannelChange = (newChannel) => {
        playTacSound();
        if (!isPowerOn) return;
        setIsPlaying(false);
        setChannel(newChannel);
        if (newChannel === 9) setVolume(25);
        checkChannelSignal(channels[newChannel], newChannel);
        setTimeout(() => setIsPlaying(true), 800);
    };

    const togglePower = () => {
        playTacSound();
        setIsPowerOn(!isPowerOn);
        if (!isPowerOn) {
            handleChannelChange(channel); // refrescar señal
        }
    };

    const currentChannel = channels[channel];

    return (
        <div className="vhs-tv-modal-bg" style={{ position: 'fixed', inset: 0, zIndex: 100000, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', overflowY: 'auto', height: '100dvh', paddingBottom: 'env(safe-area-inset-bottom)' }}>

            <button onClick={onClose} className="close-btn" style={{ position: 'absolute', top: '15px', right: '15px', background: '#222', border: '2px solid #555', borderRadius: '5px', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 100001, boxShadow: '0 4px 0 #111', color: 'white' }}>
                <X size={32} />
            </button>

            <div className="vhs-tv-casing" style={{
                width: '100%',
                maxWidth: '960px',
                background: '#1a1a1a', // Plástico negro oscuro (Sony/Panasonic 90s)
                border: '2px solid #333',
                borderRadius: '16px',
                padding: '1.5rem',
                boxShadow: 'inset 0 0 10px rgba(255,255,255,0.1), 0 20px 40px rgba(0,0,0,0.9)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                margin: 'auto'
            }}>

                {/* Pantalla Flat CRT 90s */}
                <div style={{
                    width: '100%',
                    background: '#0a0a0a',
                    borderRadius: '10px',
                    border: '15px solid #0d0d0d',
                    boxShadow: 'inset 0 0 20px rgba(255,255,255,0.1), 0 0 10px rgba(0,0,0,0.8)',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'block',
                    aspectRatio: '16/9',
                    minHeight: '300px'
                }}>
                    {isPowerOn ? (
                        <>
                            {(!isPlaying || channelStatus === 'checking') ? (
                                <div style={{ position: 'absolute', inset: 0, background: 'url(https://media.giphy.com/media/Yy26NRbpB9lDi/giphy.gif) center/cover', filter: 'hue-rotate(180deg)', opacity: 0.8, zIndex: 5 }}></div>
                            ) : null}

                            <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                                <iframe
                                    src={channelStatus === 'ok' ? `https://www.youtube.com/embed/${currentChannel.videoId}?autoplay=1&playsinline=1&mute=0&controls=1&modestbranding=1&rel=0&loop=1&playlist=${currentChannel.list || currentChannel.videoId}&vq=hd1080${currentChannel.start ? `&start=${currentChannel.start}` : ''}` : 'about:blank'}
                                    frameBorder="0"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        position: 'absolute',
                                        top: '0',
                                        left: '0',
                                        pointerEvents: 'auto',
                                        filter: `saturate(0.8) contrast(${contrast}%) brightness(${brightness}%)`,
                                        opacity: channelStatus === 'ok' && isPlaying ? 1 : 0,
                                        zIndex: 5
                                    }}
                                />

                                {channelStatus === 'static' && isPlaying && (
                                    <div style={{ position: 'absolute', inset: 0, background: 'url(https://media.giphy.com/media/Yy26NRbpB9lDi/giphy.gif) center/cover', opacity: 0.7, filter: 'sepia(50%)', zIndex: 1 }}></div>
                                )}

                                {/* Efecto Glitch y Reloj OSD (VHS clásico) */}
                                {isPlaying && (
                                    <>
                                        {/* VHS Tracking lines */}
                                        <div style={{ position: 'absolute', bottom: '15%', left: 0, right: 0, height: '4px', background: 'rgba(255,255,255,0.2)', boxShadow: '0 0 10px rgba(255,255,255,0.5)', zIndex: 10, animation: 'vhs-tracking 3s infinite linear' }}></div>
                                        <div style={{ position: 'absolute', bottom: '10%', left: 0, right: 0, height: '2px', background: 'rgba(255,255,255,0.1)', zIndex: 10, animation: 'vhs-tracking 2s infinite linear reverse' }}></div>

                                        {/* OSD UI */}
                                        <div style={{ position: 'absolute', top: '25px', left: '35px', color: '#00ff00', fontFamily: '"Courier New", Courier, monospace', fontSize: '2.5rem', fontWeight: 'bold', textShadow: '2px 2px 2px #000', zIndex: 12 }}>
                                            PLAY ►
                                        </div>
                                        <div style={{ position: 'absolute', bottom: '25px', left: '35px', color: '#00ff00', fontFamily: '"Courier New", Courier, monospace', fontSize: '1.5rem', fontWeight: 'bold', textShadow: '2px 2px 2px #000', zIndex: 12 }}>
                                            {currentChannel.cat}
                                        </div>
                                        <div style={{ position: 'absolute', bottom: '25px', right: '35px', color: '#00ff00', fontFamily: '"Courier New", Courier, monospace', fontSize: '1.5rem', fontWeight: 'bold', textShadow: '2px 2px 2px #000', zIndex: 12 }}>
                                            CH {channel}
                                        </div>

                                        {/* Predictive Subtitles / Karaoke Overlay (SIMULATED AI) */}
                                        <div style={{ 
                                            position: 'absolute', bottom: '15%', left: '10%', right: '10%', 
                                            textAlign: 'center', zIndex: 20, pointerEvents: 'none',
                                            animation: 'sub-float 5s infinite ease-in-out'
                                        }}>
                                            <div style={{ 
                                                display: 'inline-block', background: 'rgba(0,0,0,0.85)', 
                                                padding: '0.8rem 1.5rem', borderRadius: '4px', border: '1px solid rgba(0,255,0,0.5)',
                                                color: '#ffff00', fontSize: '1.6rem', fontWeight: 'bold', 
                                                fontFamily: 'monospace', textTransform: 'uppercase',
                                                letterSpacing: '2px', textShadow: '2px 2px 4px #000',
                                                boxShadow: '0 0 20px rgba(0,0,0,0.5)'
                                            }}>
                                                {channel === 6 ? (
                                                    <span style={{ animation: 'karaoke-glow 1s infinite alternate' }}>
                                                        ♪ With the lights out, it's less dangerous... ♪
                                                    </span>
                                                ) : channel === 7 ? (
                                                    <span style={{ animation: 'karaoke-glow 0.5s infinite alternate' }}>
                                                        ♪ SERENITO EN LA CASA, SMART CITY ACTIVA ♪
                                                    </span>
                                                ) : channel === 10 ? (
                                                    <span>♪ ENTREVECINAS RADIO: LA FRECUENCIA DEL BARRIO ♪</span>
                                                ) : channel === 11 || channel === 12 ? (
                                                    <span style={{ color: '#00ff00' }}>[VLS-NEWS]: Transmisión vecinal en curso vía YouTube...</span>
                                                ) : (
                                                    <span>{isPowerOn ? "FARO-AI: ANALIZANDO COMUNICACIÓN SUBLIMINAL..." : "NO SIGNAL"}</span>
                                                )}
                                            </div>
                                            <div style={{ marginTop: '0.8rem', color: '#00ff00', fontSize: '0.9rem', fontWeight: 'bold', textShadow: '1px 1px 2px black' }}>
                                                <Sparkles size={14} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                                                SUB_PREDICTIVO_VLS v.2.7_BETA | LATENCY: 12ms
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* Scanlines & Vigenette */}
                                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)', backgroundSize: '100% 4px', pointerEvents: 'none', zIndex: 10 }}></div>
                                <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 100px rgba(0,0,0,0.9)', pointerEvents: 'none', mixBlendMode: 'multiply', zIndex: 11 }}></div>
                            </div>
                        </>
                    ) : (
                        <div style={{ position: 'absolute', inset: 0, background: '#050505' }}></div>
                    )}
                </div>

                {/* VCR & Controles VHS 90s */}
                <div style={{
                    background: '#141414',
                    borderRadius: '8px',
                    border: '1px solid #333',
                    borderTop: '3px solid #444',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                }}>
                    {/* Brand y Cassete Slot */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ color: '#aaa', fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '4px' }}>Radio VLS <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>4 CABEZAS HI-FI</span></div>
                        <div style={{ flex: 1, maxWidth: '600px', margin: '0 2rem', background: '#080808', height: '24px', borderRadius: '4px', border: '1px solid #000', borderBottom: '2px solid #222', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, bottom: 0, left: '20px', right: '20px', background: '#050505', borderTop: '2px solid #000' }}></div>
                        </div>
                    </div>

                    {/* Botones de Operación y Canales */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button className="vhs-mech-btn" onClick={togglePower} style={{ background: isPowerOn ? '#ef4444' : '#555', color: 'white', padding: '10px 15px', borderRadius: '4px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 0 #111' }}>
                                <Power size={20} />
                            </button>
                            <button className="vhs-mech-btn" onClick={() => { if (isPowerOn) { playMechanicalSound(); alert('Rebobinando cinta...'); } }} style={{ background: '#333', color: '#ccc', padding: '10px 15px', borderRadius: '4px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 0 #111' }}>
                                <Rewind size={20} />
                            </button>
                            <button className="vhs-mech-btn" onClick={() => { if (isPowerOn) { playMechanicalSound(); } }} style={{ background: '#333', color: '#ccc', padding: '10px 15px', borderRadius: '4px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 0 #111' }}>
                                <Play size={20} />
                            </button>
                            <button className="vhs-mech-btn" onClick={() => { if (isPowerOn) { playMechanicalSound(); alert('Adelantando cinta...'); } }} style={{ background: '#333', color: '#ccc', padding: '10px 15px', borderRadius: '4px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 0 #111' }}>
                                <FastForward size={20} />
                            </button>
                        </div>

                        {/* Canales (Botones plásticos cuadrados) */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', background: '#222', padding: '0.5rem', borderRadius: '8px', border: '1px solid #111' }}>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(ch => (
                                <button
                                    key={ch}
                                    className={`tv-ch-btn ${channel === ch && isPowerOn ? 'active' : ''} ${!isPowerOn ? 'off' : ''}`}
                                    onClick={() => handleChannelChange(ch)}
                                    style={{
                                        color: '#e5e7eb',
                                        border: '1px solid #111',
                                        borderRadius: '4px',
                                        padding: '4px 2px',
                                        fontSize: '0.6rem',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <span>{ch}</span>
                                    <span style={{ fontSize: '0.45rem', opacity: 0.7, whiteSpace: 'nowrap', overflow: 'hidden', width: '35px' }}>{channels[ch].label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Perillas Inferiores (Vol, Brightness, Contrast) */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', width: '100%', marginTop: '5px', background: '#1a1a1a', padding: '1rem', borderRadius: '8px', border: '1px solid #222' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: '1 1 200px' }}>
                            <Volume2 size={20} color="#666" />
                            <input type="range" min="0" max="100" value={volume} onChange={(e) => setVolume(e.target.value)} style={{ flex: 1, accentColor: '#4b5563' }} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: '1 1 200px' }}>
                            <Sun size={20} color="#666" />
                            <input type="range" min="50" max="150" value={brightness} onChange={(e) => setBrightness(e.target.value)} style={{ flex: 1, accentColor: '#4b5563' }} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: '1 1 200px' }}>
                            <Contrast size={20} color="#666" />
                            <input type="range" min="50" max="200" value={contrast} onChange={(e) => setContrast(e.target.value)} style={{ flex: 1, accentColor: '#4b5563' }} />
                        </div>
                    </div>
                </div>

            </div>

            <style>{`
                @keyframes vhs-tracking {
                    0% { transform: translateY(-50px); opacity: 0; }
                    50% { opacity: 0.5; }
                    100% { transform: translateY(500px); opacity: 0; }
                }
                
                @keyframes sub-float { 
                    0% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0); }
                }

                @keyframes karaoke-glow {
                    from { text-shadow: 0 0 10px #ffff00, 2px 2px 4px #000; }
                    to { text-shadow: 0 0 25px #ffff00, 0 0 40px #ff0055, 2px 2px 4px #000; }
                }

                .vhs-mech-btn { transition: all 0.1s; }
                .vhs-mech-btn:active { transform: translateY(3px) !important; box-shadow: 0 1px 0 #111 !important; }

                .tv-ch-btn { transition: all 0.1s; background: #1f2937; box-shadow: 0 2px 0 #0f172a; }
                .tv-ch-btn:active { transform: translateY(2px) !important; box-shadow: 0 0px 0 #0f172a !important; }
                .tv-ch-btn:hover { filter: brightness(1.2); }
                .tv-ch-btn.active { background: #4b5563 !important; box-shadow: inset 0 0 10px rgba(0,0,0,0.8) !important; transform: translateY(2px) !important; }
                .tv-ch-btn.off { background: #1f2937 !important; transform: none !important; box-shadow: 0 2px 0 #0f172a !important; }

                
                @media (max-width: 768px) {
                    .vhs-tv-modal-bg { padding: 1rem 0.5rem !important; align-items: flex-start !important; }
                    .vhs-tv-casing { padding: 1rem !important; }
                    .close-btn { width: 40px !important; height: 40px !important; }
                }
            `}</style>
        </div>
    );
}
