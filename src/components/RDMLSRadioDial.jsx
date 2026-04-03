import React, { useState, useEffect, useRef } from 'react';
import { 
    Music, Volume2, VolumeX, SkipBack, SkipForward, Power
} from 'lucide-react';

const VUMeter = ({ label, needleRef }) => (
    <div style={{
        width: '80px', height: '60px', background: '#f5f5dc', borderRadius: '4px',
        border: '3px solid #111', position: 'relative', overflow: 'hidden',
        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.6)', display: 'flex', flexDirection: 'column', alignItems: 'center'
    }}>
        <svg viewBox="0 0 100 60" style={{ width: '100%', marginTop: '5px' }}>
            <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#333" strokeWidth="2" />
            <path d="M 70 50 A 40 40 0 0 1 90 50" fill="none" stroke="#e63946" strokeWidth="3" />
            {[...Array(9)].map((_, i) => {
                const angle = Math.PI - i * (Math.PI / 8);
                const x1 = 50 + 35 * Math.cos(angle);
                const y1 = 50 - 35 * Math.sin(angle);
                const x2 = 50 + 42 * Math.cos(angle);
                const y2 = 50 - 42 * Math.sin(angle);
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={i > 6 ? '#e63946' : '#333'} strokeWidth={i % 4 === 0 ? "2" : "1"} />
            })}
        </svg>
        
        <div 
            ref={needleRef}
            style={{ 
                position: 'absolute', bottom: '-2px', left: '50%', width: '2px', height: '45px', 
                background: 'linear-gradient(90deg, #555, #111, #555)', marginLeft: '-1px', 
                transformOrigin: 'bottom center', transform: 'rotate(-45deg)', transition: 'transform 0.05s ease-out',
                boxShadow: '2px 0 3px rgba(0,0,0,0.4)', pointerEvents: 'none', zIndex: 5
            }}
        />
        
        <div style={{ position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)', width: '20px', height: '20px', borderRadius: '50%', background: 'radial-gradient(circle, #aaa, #333)', border: '2px solid #111', zIndex: 6, boxShadow: '0 0 5px rgba(0,0,0,0.5)' }}></div>
        <div style={{ position: 'absolute', bottom: '10px', right: '5px', fontSize: '0.45rem', fontWeight: 'bold', color: '#111', fontFamily: 'monospace' }}>VU</div>
        <div style={{ position: 'absolute', bottom: '10px', left: '5px', fontSize: '0.55rem', fontWeight: 'bold', color: '#111', fontFamily: 'monospace' }}>{label}</div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 40%, rgba(0,0,0,0.05) 100%)', pointerEvents: 'none', zIndex: 10 }}></div>
    </div>
);

export default function RDMLSRadioDial({ onClose }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.8);
    const [isMuted, setIsMuted] = useState(false);
    const [isPowerOn, setIsPowerOn] = useState(true);
    const audioRef = useRef(null);
    const vuLeftRef = useRef(null);
    const vuRightRef = useRef(null);
    const [msgIndex, setMsgIndex] = useState(0);

    const radioStations = [
        { 
            id: 'municipal', 
            name: 'RDMLS INSTITUCIONAL',
            dialLabel: 'RDMLS',
            slogan: 'LA SEÑAL SIEMPRE CONECTADA - IMLS 2026', 
            url: "https://az11.yesstreaming.net:8590/radio.mp3",
            color: '#FFD700',
            logo: '/logo_municipio.png',
            badge: 'HD 192K'
        },
        { 
            id: 'cultura', 
            name: 'RDMLS CULTURA',
            dialLabel: 'CULTURA',
            slogan: 'DIFUSIÓN CULTURAL MUNICIPAL - LA SERENA', 
            url: "https://az11.yesstreaming.net:8590/radio.mp3?rel=cultura", 
            color: '#ef4444',
            logo: '/escudo.png',
            badge: 'MUNICIPAL'
        },
        { 
            id: 'informativa', 
            name: 'RDMLS INFORMATIVA',
            dialLabel: 'RADIO INFO',
            slogan: 'BOLETINES Y GESTIÓN EN TERRENO', 
            url: "https://az11.yesstreaming.net:8590/radio.mp3?rel=info", 
            color: '#38bdf8',
            logo: '/logo_municipio.png',
            badge: 'OFICIAL 24/7'
        },
        { 
            id: 'eventos', 
            name: 'RDMLS EVENTOS',
            dialLabel: 'PROTOCOL',
            slogan: 'PROTOCOLOS Y ACTOS INSTITUCIONALES', 
            url: "https://az11.yesstreaming.net:8590/radio.mp3?rel=protocol", 
            color: '#10b981',
            badge: 'VIVO'
        }
    ];

    const [currentStation, setCurrentStation] = useState(radioStations[0]);

    useEffect(() => {
        const handleRemoteToggle = () => togglePlay();
        const handleRemoteVolume = (e) => {
            if (e.detail !== undefined) {
                setVolume(e.detail / 100);
            }
        };
        const handleRemoteMute = () => toggleMute();

        window.addEventListener('vls-toggle-radio', handleRemoteToggle);
        window.addEventListener('vls-set-volume', handleRemoteVolume);
        window.addEventListener('vls-remote-mute', handleRemoteMute);

        return () => {
            window.removeEventListener('vls-toggle-radio', handleRemoteToggle);
            window.removeEventListener('vls-set-volume', handleRemoteVolume);
            window.removeEventListener('vls-remote-mute', handleRemoteMute);
        };
    }, [isPlaying, isMuted, volume]);

    useEffect(() => {
        if (isPlaying && isPowerOn) {
            const interval = setInterval(() => {
                const randomL = Math.random() * 40 - 20;
                const randomR = Math.random() * 40 - 20;
                if (vuLeftRef.current) vuLeftRef.current.style.transform = `rotate(${randomL}deg)`;
                if (vuRightRef.current) vuRightRef.current.style.transform = `rotate(${randomR}deg)`;
            }, 100);
            return () => clearInterval(interval);
        } else {
            if (vuLeftRef.current) vuLeftRef.current.style.transform = `rotate(-45deg)`;
            if (vuRightRef.current) vuRightRef.current.style.transform = `rotate(-45deg)`;
        }
    }, [isPlaying, isPowerOn]);

    const togglePlay = () => {
        if (!isPowerOn) return;
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => setIsMuted(!isMuted);
    const togglePower = () => {
        setIsPowerOn(!isPowerOn);
        if (isPowerOn) setIsPlaying(false);
    };

    const changeStation = (station) => {
        if (!isPowerOn) return;
        setCurrentStation(station);
        setIsPlaying(false);
        setTimeout(() => setIsPlaying(true), 200);
    };

    return (
        <div style={{
            background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
            border: '4px solid #333',
            borderRadius: '24px',
            padding: '20px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8), inset 0 2px 10px rgba(255,255,255,0.05)',
            width: '100%',
            maxWidth: '600px',
            margin: '0 auto',
            color: '#fff',
            fontFamily: "'Inter', sans-serif",
            position: 'relative'
        }}>
            {/* CLOSE BUTTON */}
            {onClose && (
                <button 
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        color: 'white',
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10
                    }}
                >
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>&times;</span>
                </button>
            )}
            {/* VUMETERS SECTION */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
                <VUMeter label="CH L" needleRef={vuLeftRef} />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: isPowerOn ? '#ef4444' : '#333', boxShadow: isPowerOn ? '0 0 10px #ef4444' : 'none' }}></div>
                    <span style={{ fontSize: '0.5rem', marginTop: '5px', color: '#666' }}>POWER</span>
                </div>
                <VUMeter label="CH R" needleRef={vuRightRef} />
            </div>

            {/* LCD DISPLAY */}
            <div style={{
                background: '#040404',
                border: '2px solid #333',
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '20px',
                height: '80px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {isPowerOn && currentStation ? (
                    <>
                        <div style={{ fontSize: '0.7rem', color: currentStation.color, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>
                            {currentStation.name}
                        </div>
                        <div style={{ fontSize: '1.2rem', fontWeight: '900', color: '#fff', marginTop: '5px' }}>
                            {currentStation.dialLabel}
                        </div>
                        <div className="marquee" style={{ fontSize: '0.6rem', color: '#666', marginTop: '5px', whiteSpace: 'nowrap' }}>
                            {currentStation.slogan}
                        </div>
                    </>
                ) : (
                    <div style={{ color: '#222', fontSize: '1.2rem', fontWeight: 'bold' }}>{isPowerOn ? 'STATION ERROR' : 'RDMLS OFF'}</div>
                )}
                <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)', pointerEvents: 'none' }}></div>
            </div>

            {/* CONTROLS SECTION */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Volume Knob */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                    <div style={{ 
                        width: '60px', height: '60px', borderRadius: '50%', 
                        background: 'radial-gradient(circle, #333 0%, #111 100%)',
                        border: '3px solid #000', position: 'relative',
                        transform: `rotate(${(volume * 240) - 120}deg)`,
                        cursor: 'pointer'
                    }}>
                        <div style={{ position: 'absolute', top: '5px', left: '50%', width: '4px', height: '10px', background: '#FFD700', marginLeft: '-2px', borderRadius: '2px' }}></div>
                        <input 
                            type="range" min="0" max="1" step="0.1" value={volume} 
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
                        />
                    </div>
                    <span style={{ fontSize: '0.6rem', fontWeight: 'bold', color: '#666' }}>VOLUME</span>
                </div>

                {/* Main Buttons */}
                <div style={{ display: 'flex', gap: '15px' }}>
                    <button onClick={togglePower} style={{ 
                        width: '50px', height: '50px', borderRadius: '50%', background: isPowerOn ? '#ef4444' : '#222', 
                        border: '3px solid #000', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' 
                    }}>
                        <Power size={20} />
                    </button>
                    <button onClick={togglePlay} style={{ 
                        width: '70px', height: '70px', borderRadius: '50%', background: isPlaying ? '#22c55e' : '#FFD700', 
                        border: '4px solid #000', color: isPlaying ? '#fff' : '#000', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: isPlaying ? '0 0 20px rgba(34, 197, 94, 0.4)' : 'none'
                    }}>
                        {isPlaying ? <span style={{ width: '20px', height: '20px', background: '#fff', borderRadius: '4px' }}></span> : <Music size={30} />}
                    </button>
                    <button onClick={toggleMute} style={{ 
                        width: '50px', height: '50px', borderRadius: '50%', background: isMuted ? '#666' : '#333', 
                        border: '3px solid #000', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' 
                    }}>
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                </div>

                {/* Dial Knob */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                    <div style={{ 
                        width: '60px', height: '60px', borderRadius: '50%', 
                        background: 'radial-gradient(circle, #333 0%, #111 100%)',
                        border: '3px solid #000', position: 'relative',
                        transform: `rotate(${radioStations.indexOf(currentStation) * (360/radioStations.length)}deg)`,
                        transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor: 'pointer'
                    }} onClick={() => {
                        const idx = radioStations.indexOf(currentStation);
                        changeStation(radioStations[(idx + 1) % radioStations.length]);
                    }}>
                        <div style={{ position: 'absolute', top: '5px', left: '50%', width: '4px', height: '10px', background: '#38bdf8', marginLeft: '-2px', borderRadius: '2px' }}></div>
                    </div>
                    <span style={{ fontSize: '0.6rem', fontWeight: 'bold', color: '#666' }}>STATION</span>
                </div>
            </div>

            {/* STATION BUTTONS (PILLS) */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '20px', justifyContent: 'center' }}>
                {radioStations.map(station => (
                    <button
                        key={station.id}
                        onClick={() => changeStation(station)}
                        style={{
                            background: currentStation?.id === station?.id ? station?.color : 'rgba(255,255,255,0.05)',
                            color: currentStation?.id === station?.id ? '#000' : '#fff',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '20px',
                            padding: '5px 12px',
                            fontSize: '0.6rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                        }}
                    >
                        {station.dialLabel}
                    </button>
                ))}
            </div>

            <audio 
                ref={audioRef} 
                src={isPowerOn && isPlaying ? currentStation.url : ""} 
                autoPlay 
                muted={isMuted} 
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />
        </div>
    );
}
