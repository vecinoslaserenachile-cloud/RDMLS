import React, { useState, useEffect, useRef } from 'react';
import { 
    X as CloseIcon, Radio, Tv, Music, Movie, 
    Image as ImageIcon, Folder, Bluetooth, Settings, 
    Volume2, Volume1, VolumeX, SkipBack, SkipForward, 
    Play, Pause, Power, Maximize2, Minimize2, 
    ChevronLeft, ChevronRight, Activity, Zap
} from 'lucide-react';

export default function VLSConsoleAiwa({ onClose, onOpenRadio, onOpenTV }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isPowerOn, setIsPowerOn] = useState(true);
    const [volume, setVolume] = useState(20);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [activeTab, setActiveTab] = useState('Home');
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const togglePower = () => setIsPowerOn(!isPowerOn);

    if (!isExpanded) {
        return (
            <div 
                onClick={() => setIsExpanded(true)}
                style={{
                    position: 'fixed', left: '20px', top: '50%', transform: 'translateY(-50%)',
                    zIndex: 100001, cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
            >
                <div style={{
                    width: '60px', height: '180px', background: '#111', borderRadius: '30px',
                    border: '2px solid #38bdf8', display: 'flex', flexDirection: 'column', 
                    alignItems: 'center', justifyContent: 'center', gap: '20px',
                    boxShadow: '0 0 30px rgba(56, 189, 248, 0.4)',
                    background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)'
                }}>
                    <Radio size={24} color="#38bdf8" className="pulse-slow" />
                    <Tv size={24} color="#38bdf8" />
                    <div style={{ writingMode: 'vertical-rl', fontSize: '0.7rem', fontWeight: 900, color: '#38bdf8', letterSpacing: '2px' }}>CONSOLE</div>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            position: 'fixed', left: '20px', top: '50%', transform: 'translateY(-50%)',
            zIndex: 100001, width: '1000px', height: '400px',
            background: '#1a1a1a', borderRadius: '24px', border: '4px solid #333',
            display: 'flex', overflow: 'hidden', boxShadow: '0 20px 80px rgba(0,0,0,0.8)',
            fontFamily: "'Inter', sans-serif"
        }}>
            {/* Left Control Panel (Knob & Buttons) */}
            <div style={{ width: '220px', background: 'linear-gradient(90deg, #111 0%, #222 100%)', display: 'flex', flexDirection: 'column', padding: '20px', justifyContent: 'space-between', borderRight: '1px solid #000' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 'bold', fontStyle: 'italic' }}>aiwa</div>
                    <button onClick={togglePower} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <Power size={24} color={isPowerOn ? "#38bdf8" : "#444"} style={{ filter: isPowerOn ? 'drop-shadow(0 0 5px #38bdf8)' : 'none' }} />
                    </button>
                </div>

                <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* The Knob */}
                    <div style={{ 
                        width: '100px', height: '100px', borderRadius: '50%', 
                        background: 'linear-gradient(135deg, #333 0%, #111 100%)',
                        border: '4px solid #444', position: 'relative',
                        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)',
                        transform: `rotate(${(volume/100)*270}deg)`,
                        transition: 'transform 0.1s'
                    }}>
                        <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', width: '4px', height: '15px', background: '#38bdf8', borderRadius: '2px', boxShadow: '0 0 10px #38bdf8' }}></div>
                    </div>
                    {/* Outer Glow Ring */}
                    <div style={{ position: 'absolute', inset: 0, border: '2px solid rgba(56, 189, 248, 0.2)', borderRadius: '50%' }}></div>
                    <div style={{ position: 'absolute', bottom: '-20px', width: '100%', textAlign: 'center', color: '#38bdf8', fontSize: '0.7rem', fontWeight: 'bold' }}>VOLUME: {volume}</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <button style={{ background: '#222', border: '1px solid #444', color: '#fff', padding: '8px', borderRadius: '8px', fontSize: '0.6rem', fontWeight: 'bold' }}>MODE</button>
                    <button style={{ background: '#222', border: '1px solid #444', color: '#fff', padding: '8px', borderRadius: '8px', fontSize: '0.6rem', fontWeight: 'bold' }}>BAND</button>
                    <button onClick={() => setVolume(v => Math.max(0, v-5))} style={{ background: '#222', border: '1px solid #444', color: '#fff', padding: '8px', borderRadius: '8px' }}><SkipBack size={16} /></button>
                    <button onClick={() => setVolume(v => Math.min(100, v+5))} style={{ background: '#222', border: '1px solid #444', color: '#fff', padding: '8px', borderRadius: '8px' }}><SkipForward size={16} /></button>
                </div>
            </div>

            {/* Main LCD Display Area */}
            <div style={{ flex: 1, background: '#000', padding: '15px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ 
                    height: '100%', width: '100%', 
                    background: isPowerOn ? 'linear-gradient(180deg, #121212 0%, #000 100%)' : '#000',
                    borderRadius: '12px', boxSizing: 'border-box', border: '1px solid #333',
                    padding: '20px', display: 'flex', flexDirection: 'column'
                }}>
                    {isPowerOn ? (
                        <>
                            {/* Header Info */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#fff', opacity: 0.8, marginBottom: '20px' }}>
                                <div>Home</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Volume2 size={14} /> {volume}
                                    <span>12:36</span>
                                    <Settings size={14} />
                                    <Bluetooth size={14} />
                                </div>
                            </div>

                            {/* Main Content (Icons) */}
                            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
                                {[
                                    { id: 'radio', label: 'Radio', icon: Radio, color: '#9333ea', action: onOpenRadio },
                                    { id: 'music', label: 'Music', icon: Music, color: '#22c55e', action: () => {} },
                                    { id: 'movie', label: 'Movie', icon: Tv, color: '#f97316', action: onOpenTV },
                                    { id: 'photo', label: 'Photo', icon: ImageIcon, color: '#38bdf8', action: () => {} },
                                    { id: 'explorer', label: 'Explorer', icon: Folder, color: '#eab308', action: () => {} },
                                    { id: 'bluetooth', label: 'Bluetooth', icon: Bluetooth, color: '#3b82f6', action: () => {} },
                                    { id: 'aux', label: 'AUX', icon: Activity, color: '#ec4899', action: () => {} },
                                    { id: 'setting', label: 'Setting', icon: Settings, color: '#64748b', action: () => {} }
                                ].map(item => (
                                    <button 
                                        key={item.id}
                                        onClick={item.action}
                                        style={{ 
                                            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '12px', display: 'flex', flexDirection: 'column', 
                                            alignItems: 'center', justifyContent: 'center', gap: '8px',
                                            cursor: 'pointer', transition: 'all 0.2s', padding: '10px'
                                        }}
                                        className="lcd-icon"
                                    >
                                        <div style={{ padding: '10px', borderRadius: '12px', background: item.color, boxShadow: `0 4px 15px ${item.color}40` }}>
                                            <item.icon size={24} color="#fff" />
                                        </div>
                                        <span style={{ fontSize: '0.7rem', color: '#fff' }}>{item.label}</span>
                                    </button>
                                ))}
                            </div>
                            
                            {/* Time & Date Display (Floating) */}
                            <div style={{ position: 'absolute', top: '50px', left: '40px', pointerEvents: 'none' }}>
                                <div style={{ fontSize: '3rem', fontWeight: 200, color: '#fff' }}>12:36</div>
                                <div style={{ fontSize: '0.7rem', color: '#aaa', marginTop: '-5px' }}>2026-03-31 Friday</div>
                            </div>
                        </>
                    ) : (
                        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ color: '#222', fontSize: '2rem', fontWeight: 900 }}>AIWA</div>
                        </div>
                    )}
                </div>
                {/* Decorative Elements */}
                <div style={{ position: 'absolute', bottom: '15px', right: '30px', fontSize: '0.6rem', color: '#444' }}>AW-W440BT</div>
            </div>

            {/* Right Control Panel (Direct Access) */}
            <div style={{ width: '220px', background: 'linear-gradient(270deg, #111 0%, #222 100%)', display: 'flex', flexDirection: 'column', padding: '20px', borderLeft: '1px solid #000', gap: '15px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <button style={{ background: '#222', border: '1px solid #444', color: '#fff', padding: '10px', borderRadius: '15px', fontSize: '0.6rem', fontWeight: 'bold' }}>1 II</button>
                    <button style={{ background: '#222', border: '1px solid #444', color: '#fff', padding: '10px', borderRadius: '15px', fontSize: '0.6rem', fontWeight: 'bold' }}>2 LIST</button>
                </div>

                <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* D-Pad Circular */}
                    <div style={{ width: '130px', height: '130px', borderRadius: '50%', background: '#111', border: '2px solid #333', position: 'relative' }}>
                        <button style={{ position: 'absolute', top: '5px', left: '50%', transform: 'translateX(-50%)', background: 'none', border: 'none', color: '#38bdf8', fontSize: '0.6rem', fontWeight: 'bold' }}>4 RDM</button>
                        <button style={{ position: 'absolute', bottom: '5px', left: '50%', transform: 'translateX(-50%)', background: 'none', border: 'none', color: '#38bdf8', fontSize: '0.6rem', fontWeight: 'bold' }}>6 +10</button>
                        <button style={{ position: 'absolute', left: '5px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#38bdf8', fontSize: '0.6rem', fontWeight: 'bold' }}>3 RPT</button>
                        <button style={{ position: 'absolute', right: '5px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#38bdf8', fontSize: '0.6rem', fontWeight: 'bold' }}>5 -10</button>
                        <div style={{ position: 'absolute', inset: '35px', borderRadius: '50%', background: 'linear-gradient(135deg, #1e3a8a 0%, #000 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8', fontSize: '0.7rem', fontWeight: 'bold', border: '2px solid #333' }}>AMS</div>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ width: '60px', height: '15px', background: '#333', borderRadius: '2px' }}></div> {/* USB Port slot */}
                    <div style={{ width: '15px', height: '15px', borderRadius: '50%', background: '#333' }}></div> {/* AUX Jack */}
                </div>
                
                <button onClick={() => setIsExpanded(false)} style={{ background: '#444', border: 'none', color: '#fff', padding: '8px', borderRadius: '10px', cursor: 'pointer' }}>
                   <Minimize2 size={16} />
                </button>
            </div>

            <style>{`
                .lcd-icon:hover { background: rgba(255,255,255,0.15); transform: translateY(-2px); }
                @keyframes pulse-vls {
                    0% { box-shadow: 0 0 10px rgba(56, 189, 248, 0.4); }
                    50% { box-shadow: 0 0 30px rgba(56, 189, 248, 0.8); }
                    100% { box-shadow: 0 0 10px rgba(56, 189, 248, 0.4); }
                }
            `}</style>
        </div>
    );
}
