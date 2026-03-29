import React, { useState } from 'react';
import { X, Tv, Volume2, Sun, Contrast, VolumeX } from 'lucide-react';
import RetroPong from './RetroPong';

export default function OldTVModal({ onClose, inline = false }) {
    const host = window.location.hostname.toLowerCase();
    const isRDMLS = host.includes('rdmls') || (host.includes('laserena.cl') && !host.includes('vecinos'));
    const isVLS = !isRDMLS;
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
        1: { name: 'Faro Monumental (C1)', videoId: 'fUeo_EhVFTY', cat: 'MONITOREO', label: 'FARO 1' },
        2: { name: 'Faro Vista (C2)', videoId: 'fUeo_EhVFTY', cat: 'MONITOREO', label: 'ZOOM 4X', scale: 4, origin: 'center center' },
        3: { name: 'Radar Marítimo (C3)', videoId: 'fUeo_EhVFTY', cat: 'MONITOREO', label: 'MAR 4X', scale: 4, origin: '80% 40%' },
        4: { name: '24 Horas Noticias', videoId: 'Nu775nv_Ppc', cat: 'NOTICIAS', label: 'TVN 24H' },
        5: { name: 'Canal 13 Live', videoId: 'v8yIDzU8t_I', cat: 'NACIONAL', label: 'C13 TV' },
        6: { name: 'NASA: Misión Artemisa', videoId: 'zPH5KtjJFaQ', cat: 'CIENCIA', label: 'NASA' },
        7: { name: 'DW Español (Cultura)', videoId: 'jRnqxURJ120', cat: 'CULTURA', label: 'DW' },
        8: { name: 'Entre Vecinas VLS', videoId: 'jWmaGafzEuk', cat: 'VECINAL', label: 'VLS TV' },
        9: { name: 'Seguridad Ciudadana', videoId: '9W_3M99B5Q0', cat: 'MUNICIPAL', label: 'VIGIA' },
        10: { name: 'Serenito 3D Clip', videoId: 'HHHC7oEyyj4', cat: 'OFICIAL', label: 'SERENIT' },
        11: { name: 'Google Developers', videoId: 'M7lc1UVf-VE', cat: 'TECNOLOGÍA', label: 'GOOGLE' },
        12: { name: 'La Serena 1972', videoId: 'n3LZGaXvqiY', cat: 'HISTORIA', label: 'RETRO' },
        13: { name: 'CHV Chilevisión', videoId: 'vX1eX-W-wUE', cat: 'NACIONAL', label: 'CHV' },
        14: { name: 'Mega TV Chile', videoId: 'H_v_9S5j5Kk', cat: 'NACIONAL', label: 'MEGA' },
        15: { name: 'Auto Fantástico: KITT', videoId: 'qlICHi6Vvn0', cat: 'RETRO TV', label: 'KITT' },
        16: { name: 'Arcade 80s: PONG', isGame: true, cat: 'SISTEMA', label: 'ARCADE' },
        17: { name: 'El Hombre Nuclear', videoId: 'rNoiizp7u6c', cat: 'RETRO TV', label: 'AUSTIN' },
        18: { name: 'La Mujer Biónica', videoId: '8p_Q8P_hBqU', cat: 'RETRO TV', label: 'JAIME' },
        19: { name: 'El Hombre Increíble', videoId: 'w5Wj6z-z8h8', cat: 'RETRO TV', label: 'HULK' },
        20: { name: 'Columbo: Clásicos', videoId: 'X9zQ7_Q7h8A', cat: 'RETRO TV', label: 'COLUMBO' },
        21: { name: 'Especial Semana Santa', videoId: 'k1_S_S_7_S8', cat: 'RELIGIÓN', label: 'INVEST.' },
        22: { name: 'Canal Luz Live', videoId: 'vS_S_S_7_S8', cat: 'RELIGIÓN', label: 'LUZ' },
        23: { name: 'Cristovisión TV', videoId: 'y5S_S_S_7_S8', cat: 'RELIGIÓN', label: 'CRISTO' },
        24: { name: 'EWTN Español', videoId: 'u4S_S_S_7_S8', cat: 'RELIGIÓN', label: 'EWTN' },
        25: { name: 'Investigation Discovery', videoId: 'M7lc1UVf-VE', cat: 'INVESTIGACIÓN', label: 'ID' },
        26: { name: 'Canal Municipal VLS', videoId: 'O6rEZwVbIPY', cat: 'VECINAL', label: 'MUNI' },
        27: { name: 'Cámara Playa (C4)', videoId: 'fUeo_EhVFTY', cat: 'MONITOREO', label: 'PLAYA', scale: 2, origin: 'bottom left' },
        28: { name: 'Cámara Humedal (C5)', videoId: 'fUeo_EhVFTY', cat: 'MONITOREO', label: 'HUMEDAL', scale: 3, origin: 'top right' },
        29: { name: 'Cámara Avenida (C6)', videoId: 'fUeo_EhVFTY', cat: 'MONITOREO', label: 'AVENID', scale: 2.5, origin: '20% 80%' },
        30: { name: 'NASA Live Deep Space', videoId: '21X5lGlDOfg', cat: 'CIENCIA', label: 'SPACE' },
        31: { name: 'Bloomberg Tech', videoId: 'dp8PhlsucFE', cat: 'TECNOLOGÍA', label: 'BLOOM' },
        32: { name: 'RDMLS: Radio Video', videoId: 'M7lc1UVf-VE', cat: 'OFICIAL', label: 'RDMLS' }
    };

    const checkChannelSignal = (chInfo, chNum) => {
        setChannelStatus('checking');
        if (chInfo.isGame) {
            setTimeout(() => setChannelStatus('game'), 300);
            return;
        }
        if (chInfo.url) {
            setChannelStatus('ok');
            return;
        }
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
            if (img.width === 120 || img.naturalWidth === 120) {
                setChannelStatus(chNum % 2 !== 0 ? 'static' : 'testcard');
            } else {
                setChannelStatus('ok');
            }
        };
        img.onerror = () => { setChannelStatus('ok'); };
        img.src = `https://img.youtube.com/vi/${chInfo.videoId}/mqdefault.jpg`;
    };

    React.useEffect(() => {
        checkChannelSignal(channels[channel], channel);
    }, []);

    const playTacSound = () => {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(400, ctx.currentTime);
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.1);
        } catch (e) { }
    };

    const handleChannelChange = (newChannel) => {
        playTacSound();
        if (!isPowerOn) return;
        setIsChangingChannel(true);
        setChannel(newChannel);
        checkChannelSignal(channels[newChannel], newChannel);
        setTimeout(() => { setIsChangingChannel(false); }, 600);
    };

    const currentChannel = channels[channel];

    return (
        <div className={inline ? "old-tv-inline-bg" : "old-tv-modal-bg"} style={inline ? { width: '100%' } : { position: 'fixed', inset: 0, zIndex: 100000, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', overflowY: 'auto' }}>
            {!inline && (
                <button onClick={onClose} className="close-btn" style={{ position: 'absolute', top: '15px', right: '15px', background: '#ef4444', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 100001 }}>
                    <X size={24} color="white" />
                </button>
            )}

            <div className="old-tv-casing" style={{ width: '100%', maxWidth: '1100px', background: '#5c4033', border: '12px solid #3d2b1f', borderRadius: '35px', padding: '2rem', display: 'flex', gap: '1.5rem', position: 'relative' }}>
                
                <div className="old-tv-screen-container" style={{ flex: 1, background: '#0a0a0a', borderRadius: '30px', border: '15px solid #222', position: 'relative', overflow: 'hidden', aspectRatio: '4/3' }}>
                    {isPowerOn ? (
                        <>
                            {(isChangingChannel || channelStatus === 'checking') && (
                                <div style={{ position: 'absolute', inset: 0, background: 'url(https://media.giphy.com/media/Yy26NRbpB9lDi/giphy.gif) center/cover', opacity: 0.6, zIndex: 5 }}></div>
                            )}
                            {currentChannel.videoId && (
                                <iframe
                                    ref={iframeRef}
                                    src={channelStatus === 'ok' ? `https://www.youtube.com/embed/${currentChannel.videoId}?autoplay=1&playsinline=1&controls=0&modestbranding=1&rel=0&loop=1&enablejsapi=1` : 'about:blank'}
                                    frameBorder="0"
                                    style={{ width: '150%', height: '150%', position: 'absolute', top: '-25%', left: '-25%', pointerEvents: 'none', filter: `brightness(${brightness}%) contrast(${contrast}%)`, opacity: (channelStatus === 'ok' && !isChangingChannel) ? 1 : 0 }}
                                />
                            )}
                            {channelStatus === 'game' && <RetroPong brightness={brightness} contrast={contrast} />}
                            <div className="crt-overlay" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10, background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%)', backgroundSize: '100% 4px' }}></div>
                        </>
                    ) : (
                        <div style={{ position: 'absolute', inset: 0, background: '#000' }}></div>
                    )}
                </div>

                <div className="old-tv-panel" style={{ width: '250px', background: 'linear-gradient(135deg, #bbb, #777)', border: '4px solid #555', borderRadius: '15px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <button onClick={() => setIsPowerOn(!isPowerOn)} style={{ background: isPowerOn ? '#ef4444' : '#444', width: '60px', height: '60px', borderRadius: '50%', border: '4px solid #111', margin: '0 auto', cursor: 'pointer' }}>
                        <Tv size={24} color="white" />
                    </button>
                    <div style={{ background: '#000', padding: '10px', borderRadius: '5px', color: '#0f0', textAlign: 'center', fontFamily: 'monospace' }}>
                        {isPowerOn ? currentChannel.cat : 'POWER OFF'}
                    </div>
                    <div style={{ flex: 1, overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
                        {Object.keys(channels).map(ch => (
                            <button key={ch} onClick={() => handleChannelChange(parseInt(ch))} style={{ background: channel === parseInt(ch) && isPowerOn ? '#0f0' : '#333', color: channel === parseInt(ch) && isPowerOn ? '#000' : '#fff', border: 'none', padding: '5px', borderRadius: '4px', fontSize: '0.7rem', cursor: 'pointer' }}>
                                {ch.padStart(2, '0')}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                .old-tv-modal-bg {
                    padding: 1rem;
                }
                @media (max-width: 768px) {
                    .old-tv-casing { flex-direction: column !important; padding: 1rem !important; }
                    .old-tv-panel { width: 100% !important; }
                }
            `}</style>
        </div>
    );
}
