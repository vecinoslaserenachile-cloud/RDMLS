import React, { useState } from 'react';
import { X, Tv, Volume2, Sun, Contrast, VolumeX } from 'lucide-react';
import RetroPong from './RetroPong';

export default function OldTVModal({ onClose, inline = false }) {
    const isVLS = window.location.hostname.includes('vecinoslaserena');
    const [channel, setChannel] = useState(1);
    const [brightness, setBrightness] = useState(100);
    const [contrast, setContrast] = useState(100);
    const [volume, setVolume] = useState(channel === 1 ? 25 : 50);
    const [isPowerOn, setIsPowerOn] = useState(true);
    const [isChangingChannel, setIsChangingChannel] = useState(false);
    const [channelStatus, setChannelStatus] = useState('checking'); // ok, static, testcard
    const [isMuted, setIsMuted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const iframeRef = React.useRef(null);

    const channels = {
        1: { name: 'Faro Monumental (C1)', videoId: 'fUeo_EhVFTY', cat: 'EN VIVO', label: 'FARO 1', volume: 20 },
        2: { name: 'Faro Zoom (C2)', videoId: 'fUeo_EhVFTY', cat: 'TELESCOPIO', label: 'ZOOM 4X', scale: 4, origin: 'center center' },
        3: { name: 'Horizonte Marino (C3)', videoId: 'fUeo_EhVFTY', cat: 'TELESCOPIO', label: 'MAR 4X', scale: 4, origin: '80% 40%' },
        4: { name: '24 Horas Noticias', videoId: 'Nu775nv_Ppc', cat: 'NOTICIAS', label: '24H' },
        5: { name: 'DW Español (Cultura)', videoId: 'jRnqxURJ120', cat: 'CULTURA', label: 'DW' },
        6: { name: 'NASA: Live Space ISS', videoId: 'zPH5KtjJFaQ', cat: 'CIENCIA', label: 'CIENCIA' },
        7: { name: 'JAXA Moon Live', videoId: 'rtQ0itlyLPI', cat: 'CIENCIA', label: 'LUNA' },
        8: { name: 'Entre Vecinas VLS', videoId: 'jWmaGafzEuk', cat: 'VECINAL', label: 'VLS' },
        9: { name: 'Seguridad Ciudadana', videoId: '9W_3M99B5Q0', cat: 'MUNICIPAL', label: 'SEGUR' },
        10: { name: 'Serenito 3D Clip', videoId: 'HHHC7oEyyj4', cat: 'OFICIAL', label: 'VLS' },
        11: { name: 'Serenito Promo', videoId: 'O6rEZwVbIPY', cat: 'OFICIAL', label: 'MARCA' },
        12: { name: 'La Serena 1972', videoId: 'n3LZGaXvqiY', cat: 'HISTORIA', label: 'RETRO' },
        13: { name: 'Muni San José de Maipo', videoId: 'M7lc1UVf-VE', cat: 'COOPERACIÓN', label: 'CHILE' },
        14: { name: 'YouTube Developers', videoId: 'M7lc1UVf-VE', cat: 'SISTEMA', label: 'DEV' },
        15: { name: 'KITT: Knight Rider', videoId: 'qlICHi6Vvn0', cat: 'RETRO TV', label: 'KITT' },
        16: { name: 'Arcade 80s: PONG', isGame: true, cat: 'SISTEMA', label: 'ARCADE' }
    };

    const checkChannelSignal = (chInfo, chNum) => {
        setChannelStatus('checking');

        if (chInfo.isGame) {
            setTimeout(() => setChannelStatus('game'), 300);
            return;
        }

        const img = new Image();
        img.crossOrigin = "Anonymous"; // Fix para ciertos navegadores móviles
        img.onload = () => {
            // El mqdefault.jpg devuelve un fallback de 120px de ancho cuando no existe el video en youtube
            if (img.width === 120 || img.naturalWidth === 120) {
                setChannelStatus(chNum % 2 !== 0 ? 'static' : 'testcard');
            } else {
                setChannelStatus('ok');
            }
        };
        img.onerror = () => {
            // Si directamente falla el fetch (cors o url bloqueada en movil), asumimos roto
            setChannelStatus('ok'); // Ojo, en móviles a veces falla solo la carga de la imagen miniatura por AdBlockers. Forzamos OK e iframe decidirá.
        };
        img.src = `https://img.youtube.com/vi/${chInfo.videoId}/mqdefault.jpg`;
    };

    // Al montar verificamos el canal actual
    React.useEffect(() => {
        checkChannelSignal(channels[channel], channel);
    }, []);

    const playTacSound = () => {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioContext();
            // The following lines were part of an incomplete snippet and are removed to maintain original functionality
            // const bufferLength = analyser.frequencyBinCount;
            // const dataArray = new Uint8Array(bufferLength); // Fixed typo from Uint88Array
            // analyser.getByteFrequencyData(dataArray);
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
        if (newChannel === 1) setVolume(25);
        checkChannelSignal(channels[newChannel], newChannel);
        // Simular ruido blanco/estática al cambiar de canal
        setTimeout(() => {
            setIsChangingChannel(false);
        }, 600);
    };

    // Control volume dynamically
    React.useEffect(() => {
        if (iframeRef.current && iframeRef.current.contentWindow && channelStatus === 'ok') {
            try {
                // Post volume value or 0 if muted
                const volSend = isMuted ? 0 : volume;
                iframeRef.current.contentWindow.postMessage(JSON.stringify({
                    event: 'command',
                    func: 'setVolume',
                    args: [volSend]
                }), '*');
                
                if (isMuted) {
                    iframeRef.current.contentWindow.postMessage(JSON.stringify({
                        event: 'command',
                        func: 'mute',
                        args: []
                    }), '*');
                } else {
                    iframeRef.current.contentWindow.postMessage(JSON.stringify({
                        event: 'command',
                        func: 'unMute',
                        args: []
                    }), '*');
                }
            } catch(e) {}
        }
    }, [volume, isMuted, channelStatus, isChangingChannel]);

    const currentChannel = channels[channel];

    return (
        <div className={inline ? "old-tv-inline-bg" : "old-tv-modal-bg"} style={inline ? { width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' } : { position: 'fixed', inset: 0, zIndex: 100000, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', overflowY: 'auto' }}>

            {/* Botón de cierre superior */}
            {!inline && (
                <button onClick={onClose} className="close-btn" style={{ position: 'absolute', top: '15px', right: '15px', background: '#ef4444', border: '4px solid #7f1d1d', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 100001, boxShadow: '0 4px 0 #7f1d1d' }}>
                    <X size={32} color="white" />
                </button>
            )}

            {/* Contenedor principal del TV */}
            <div className="old-tv-casing old-tv-wrapper" style={{
                width: '100%',
                maxWidth: '950px',
                background: '#8b4513', // Color madera clásica
                border: '12px solid #5c2e0b',
                borderRadius: '25px',
                padding: '1.5rem',
                boxShadow: 'inset 0 0 50px rgba(0,0,0,0.8), 0 20px 50px rgba(0,0,0,0.7)',
                position: 'relative',
                margin: 'auto'
            }}>

                {/* Marca RDMLS */}
                <div className="old-tv-brand" style={{ position: 'absolute', bottom: '15px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', pointerEvents: 'none' }}>
                    <div style={{ fontFamily: 'serif', fontSize: '1.2rem', fontWeight: '900', color: '#ffd700', textShadow: '2px 2px 4px rgba(0,0,0,0.8)', letterSpacing: '1px', textAlign: 'center', textTransform: 'uppercase', lineHeight: '1.1' }}>
                        {isVLS ? 'VECINOS SMART · INNOVACIÓN CIUDADANA' : 'RDMLS RADIO DIGITAL MUNICIPAL LA SERENA'}
                    </div>
                    <div style={{ fontSize: '0.6rem', color: '#d4af37', textTransform: 'uppercase', letterSpacing: '3px', marginTop: '4px', fontWeight: 'bold' }}>{isVLS ? 'VECINOSLA SERENA 2026' : 'COMUNICACIONES TVLS 2026'}</div>
                </div>

                {/* Pantalla (Tubo CRT) */}
                <div className="old-tv-screen" style={{
                    flex: 1,
                    background: '#0a0a0a',
                    borderRadius: '40px 40px 40px 40px / 50px 50px 50px 50px', // Forma abombada de tubo antiguo
                    border: '20px solid #1a1a1a',
                    boxShadow: 'inset 0 0 30px rgba(255,255,255,0.1), 0 0 20px rgba(0,0,0,0.9)',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'block',
                    aspectRatio: '4/3'
                }}>
                    {isPowerOn ? (
                        <>
                            {(isChangingChannel || channelStatus === 'checking') ? (
                                // Estática simulada durante el cambio o chequeo de señal
                                <div style={{ position: 'absolute', inset: 0, background: 'url(https://media.giphy.com/media/Yy26NRbpB9lDi/giphy.gif) center/cover', opacity: 0.5, zIndex: 5 }}></div>
                            ) : null}

                            <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>

                                {/* Forzamos el renderizado del iframe siempre pero lo ocultamos visualmente si no corresponde, esto salva el bug de iOS/moviles donde iframes creados e destruidos dinamicamente se pegan en negro */}
                                <iframe
                                    ref={iframeRef}
                                    src={channelStatus === 'ok' ? `https://www.youtube.com/embed/${currentChannel.videoId}?autoplay=1&playsinline=1&controls=0&modestbranding=1&rel=0&loop=1&enablejsapi=1&playlist=${currentChannel.videoId}&vq=hd1080${currentChannel.start ? `&start=${currentChannel.start}` : ''}` : 'about:blank'}
                                    frameBorder="0"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                    style={{
                                        width: currentChannel.scale ? `${100 * (currentChannel.scale || 1.5)}%` : '150%',
                                        height: currentChannel.scale ? `${100 * (currentChannel.scale || 1.5)}%` : '150%',
                                        position: 'absolute',
                                        top: currentChannel.scale ? '50%' : '-25%',
                                        left: currentChannel.scale ? '50%' : '-25%',
                                        transform: currentChannel.scale ? 'translate(-50%, -50%)' : 'none',
                                        transformOrigin: currentChannel.origin || 'center center',
                                        pointerEvents: 'none',
                                        filter: `brightness(${brightness}%) contrast(${contrast}%) sepia(10%)`,
                                        opacity: channelStatus === 'ok' && !isChangingChannel && isPlaying ? 1 : 0,
                                        zIndex: 0
                                    }}
                                />

                                {channelStatus === 'static' && !isChangingChannel && isPlaying && (
                                    <div style={{ position: 'absolute', inset: 0, background: 'url(https://media.giphy.com/media/Yy26NRbpB9lDi/giphy.gif) center/cover', filter: `brightness(${brightness}%) contrast(${contrast}%)`, zIndex: 1 }}></div>
                                )}

                                {channelStatus === 'testcard' && !isChangingChannel && (
                                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', filter: `brightness(${brightness}%) contrast(${contrast}%)`, zIndex: 1 }}>
                                        <div style={{ flex: '7', background: 'linear-gradient(90deg, #c0c0c0 14.28%, #c0c000 14.28% 28.57%, #00c0c0 28.57% 42.85%, #00c000 42.85% 57.14%, #c000c0 57.14% 71.42%, #c00000 71.42% 85.71%, #0000c0 85.71%)' }}></div>
                                        <div style={{ flex: '1', background: 'linear-gradient(90deg, #0000c0 14.28%, #111 14.28% 28.57%, #c000c0 28.57% 42.85%, #111 42.85% 57.14%, #00c0c0 57.14% 71.42%, #111 71.42% 85.71%, #c0c0c0 85.71%)' }}></div>
                                        <div style={{ flex: '2', display: 'flex' }}>
                                            <div style={{ flex: '1 1 18%', background: '#00203f' }}></div>
                                            <div style={{ flex: '1 1 18%', background: '#fff' }}></div>
                                            <div style={{ flex: '1 1 18%', background: '#000040' }}></div>
                                            <div style={{ flex: '1 1 46%', background: '#111' }}></div>
                                        </div>
                                        {isPlaying ? (
                                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'black', color: 'white', padding: '10px 30px', fontFamily: 'monospace', fontSize: '2.5rem', border: '5px solid white', borderRadius: '50%' }}>SIN SEÑAL</div>
                                        ) : (
                                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'black', color: 'white', padding: '10px 30px', fontFamily: 'monospace', fontSize: '2.5rem', border: '5px solid white', borderRadius: '5px' }}>PAUSA</div>
                                        )}
                                    </div>
                                )}

                                {channelStatus === 'game' && !isChangingChannel && isPlaying && (
                                    <RetroPong brightness={brightness} contrast={contrast} />
                                )}

                                {/* Scanlines Effect */}
                                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 4px, 6px 100%', pointerEvents: 'none', zIndex: 10 }}></div>
                                <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 80px rgba(0,0,0,0.8)', pointerEvents: 'none', zIndex: 11 }}></div>
                                <div className="old-tv-ch-label" style={{ position: 'absolute', top: '30px', right: '40px', color: '#00ff00', fontFamily: 'monospace', fontSize: '2.5rem', fontWeight: 'bold', textShadow: '0 0 10px #00ff00', zIndex: 12 }}>
                                    CH {channel}
                                </div>

                                {/* Escudo Municipal marca de agua */}
                                <img src={isVLS ? "/logo_vls.png" : "/escudo.png"} alt="TVLS" style={{ position: 'absolute', bottom: '30px', right: '40px', width: '60px', opacity: 0.6, zIndex: 12, filter: 'grayscale(100%) contrast(200%) brightness(150%) drop-shadow(0 0 5px rgba(255,255,255,0.5))' }} />
                            </div>
                        </>
                    ) : (
                        // Apagado
                        <div style={{ position: 'absolute', inset: 0, background: '#050505' }}></div>
                    )}
                </div>

                {/* Panel Rederecho de Controles Metálicos */}
                <div className="old-tv-panel" style={{
                    background: '#d4d4d4',
                    border: '4px solid #a3a3a3',
                    borderLeft: '10px solid #737373',
                    borderRadius: '10px',
                    padding: '1rem 0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    boxShadow: 'inset -5px 0 15px rgba(0,0,0,0.2)'
                }}>

                    {/* Botón Encendido */}
                    <button
                        onClick={() => setIsPowerOn(!isPowerOn)}
                        style={{
                            background: isPowerOn ? '#ef4444' : '#7f1d1d',
                            color: 'white',
                            borderRadius: '50%',
                            width: '60px',
                            height: '60px',
                            border: '4px solid #450a0a',
                            boxShadow: isPowerOn ? 'inset 0 0 10px rgba(255,255,255,0.5), 0 0 15px #ef4444' : '0 4px 0 #450a0a',
                            cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transform: isPowerOn ? 'translateY(4px)' : 'none',
                            transition: 'all 0.1s'
                        }}>
                        <Tv size={28} />
                    </button>

                    {/* Pantalla LED Categoría */}
                    <div style={{
                        width: '100%',
                        background: '#0a0a0a',
                        border: '3px solid #1a1a1a',
                        borderRadius: '6px',
                        padding: '10px',
                        boxShadow: 'inset 0 0 15px rgba(0,0,0,0.9)',
                        textAlign: 'center',
                        fontFamily: '"Courier New", Courier, monospace',
                        color: isPowerOn ? '#ef4444' : '#330000',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        letterSpacing: '2px',
                        textShadow: isPowerOn ? '0 0 8px #ef4444' : 'none',
                        transition: 'all 0.3s'
                    }}>
                        {isPowerOn ? currentChannel.cat : '---'}
                    </div>

                    {/* Selector de Canales Estilo Perilla y Botones de Reproducción */}
                    <div className="old-tv-channels-grid" style={{ width: '100%', textAlign: 'center', marginTop: '5px' }}>
                        
                        {/* Controles VCR: PLAY, PAUSE, CH+, CH- */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', background: '#222', padding: '8px', borderRadius: '8px', border: '2px solid #111' }}>
                            <div style={{ display: 'flex', gap: '5px' }}>
                                <button className="tv-ch-btn" onClick={() => { if(isPowerOn) { setIsPlaying(true); playTacSound(); } }} style={{ background: '#475569', color: 'white', padding: '5px 10px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.7rem' }}>PLAY</button>
                                <button className="tv-ch-btn" onClick={() => { if(isPowerOn) { setIsPlaying(false); playTacSound(); } }} style={{ background: '#475569', color: 'white', padding: '5px 10px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.7rem' }}>PAUSE</button>
                            </div>
                            <div style={{ display: 'flex', gap: '5px' }}>
                                <button className="tv-ch-btn" onClick={() => handleChannelChange(channel < 16 ? channel + 1 : 1)} style={{ background: '#3b82f6', color: 'white', padding: '5px 12px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.7rem' }}>CH +</button>
                                <button className="tv-ch-btn" onClick={() => handleChannelChange(channel > 1 ? channel - 1 : 16)} style={{ background: '#3b82f6', color: 'white', padding: '5px 12px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.7rem' }}>CH -</button>
                            </div>
                        </div>

                        <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#172554', marginBottom: '5px', textTransform: 'uppercase' }}>Canales</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '4px' }}>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(ch => (
                                <button
                                    key={ch}
                                    className={`tv-ch-btn ${channel === ch && isPowerOn ? 'active' : ''} ${!isPowerOn ? 'off' : ''}`}
                                    onClick={() => handleChannelChange(ch)}
                                    style={{
                                        background: channel === ch && isPowerOn ? '#3b82f6' : '#475569',
                                        color: 'white',
                                        border: '2px solid #1e293b',
                                        borderRadius: '6px',
                                        padding: '6px 2px',
                                        fontSize: '0.65rem',
                                        fontWeight: '900',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        lineHeight: '1.1'
                                    }}
                                >
                                    <span style={{ fontSize: '0.8rem' }}>CH {ch}</span>
                                    <span style={{ fontSize: '0.5rem', opacity: 0.8, whiteSpace: 'nowrap', overflow: 'hidden', width: '100%' }}>{channels[ch].label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Perillas Inferiores (Vol, Brightnes, Contrast) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', marginTop: '5px' }}>
                        {/* Volumen */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div onClick={() => setIsMuted(!isMuted)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} title="Silenciar / Activar Sonido">
                                {isMuted || volume == 0 ? <VolumeX size={20} color="#172554" /> : <Volume2 size={20} color="#172554" />}
                            </div>
                            <input
                                type="range"
                                min="0" max="100"
                                value={volume}
                                onChange={(e) => {
                                    setVolume(parseFloat(e.target.value));
                                    if(isMuted && e.target.value > 0) setIsMuted(false);
                                }}
                                style={{ flex: 1, accentColor: '#1e293b' }}
                            />
                        </div>

                        {/* Brillo */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Sun size={20} color="#172554" />
                            <input
                                type="range"
                                min="50" max="150"
                                value={brightness}
                                onChange={(e) => setBrightness(e.target.value)}
                                style={{ flex: 1, accentColor: '#1e293b' }}
                            />
                        </div>

                        {/* Nitidez / Contraste */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Contrast size={20} color="#172554" />
                            <input
                                type="range"
                                min="50" max="200"
                                value={contrast}
                                onChange={(e) => setContrast(e.target.value)}
                                style={{ flex: 1, accentColor: '#1e293b' }}
                            />
                        </div>
                    </div>

                    {/* Parlante Simulacio */}
                    <div style={{
                        marginTop: 'auto',
                        width: '100%',
                        height: '80px',
                        background: 'repeating-linear-gradient(0deg, #172554, #172554 2px, transparent 2px, transparent 6px)',
                        borderRadius: '4px',
                        opacity: 0.8
                    }}></div>

                </div>

            </div>

            <style>{`
                .old-tv-wrapper {
                    display: flex;
                    flex-direction: ${inline ? 'column' : 'row'};
                    gap: ${inline ? '1rem' : '1.5rem'};
                    align-items: stretch;
                    width: 100%;
                    box-sizing: border-box;
                    overflow: hidden;
                }
                .old-tv-screen {
                    min-height: ${inline ? '200px' : '400px'};
                    display: flex;
                    flex: 1;
                }
                .old-tv-panel {
                    width: ${inline ? '100%' : '220px'};
                    flex-direction: column;
                    box-sizing: border-box;
                }
                .old-tv-channels-grid > div {
                    grid-template-columns: ${inline ? 'repeat(8, 1fr)' : 'repeat(4, 1fr)'} !important;
                }
                .tv-ch-btn {
                    transition: all 0.1s;
                    background: #475569;
                    color: white;
                }
                .tv-ch-btn:active {
                    transform: scale(0.95) translateY(2px) !important;
                    box-shadow: 0 1px 0 #1e293b !important;
                }
                .tv-ch-btn:hover {
                    filter: brightness(1.1);
                }
                .tv-ch-btn.active {
                    background: #3b82f6 !important;
                    box-shadow: inset 0 0 10px rgba(0,0,0,0.5) !important;
                    transform: translateY(3px) !important;
                }
                .tv-ch-btn.off {
                    background: #475569 !important;
                    transform: none !important;
                    box-shadow: 0 3px 0 #1e293b !important;
                }
                .old-tv-brand {
                    bottom: 10px;
                }

                @media (max-width: 900px) {
                    .old-tv-modal-bg {
                        align-items: flex-start !important; /* Permite escrollear modal en pantallas bajas */
                    }
                }

                @media (max-width: 768px) {
                    .old-tv-modal-bg {
                        padding: 1rem 0.5rem !important;
                    }
                    .old-tv-casing {
                        padding: 1rem !important;
                        border-width: 5px !important;
                        border-radius: 15px !important;
                    }
                    .old-tv-wrapper {
                        flex-direction: column;
                        gap: 1rem;
                    }
                    .old-tv-screen {
                        min-height: 250px;
                        border-width: 10px !important;
                        border-radius: 20px !important;
                    }
                    .old-tv-panel {
                        width: 100%;
                        flex-direction: column;
                        padding: 1rem !important;
                        border-left-width: 4px !important;
                        border-top: 10px solid #737373 !important;
                        gap: 1rem !important;
                    }
                    .old-tv-channels-grid > div {
                        grid-template-columns: repeat(4, 1fr) !important;
                    }
                    .old-tv-panel > button {
                        margin: 0 auto;
                        margin-bottom: 0;
                    }
                    .old-tv-brand {
                        position: relative !important;
                        bottom: 0 !important;
                        margin-top: 5px;
                        transform: none !important;
                    }
                    .old-tv-ch-label {
                        top: 10px !important;
                        right: 15px !important;
                        font-size: 1.5rem !important;
                    }
                    .close-btn {
                        top: 10px !important;
                        right: 10px !important;
                        width: 40px !important;
                        height: 40px !important;
                    }
                }
            `}</style>

        </div>
    );
}
