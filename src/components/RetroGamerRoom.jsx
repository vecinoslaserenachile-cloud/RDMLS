import React, { useState, useEffect, useRef } from 'react';
import { X, Trophy, Gamepad2, Play, Power, History } from 'lucide-react';
import CubeDash from './CubeDash';
import RetroPong from './RetroPong';
import RetroSnake from './RetroSnake';
import RetroSpace from './RetroSpace';
import RetroPacman from './RetroPacman';
import RetroMoonPatrol from './RetroMoonPatrol';
import RetroRallyX from './RetroRallyX';
import RetroDecathlon from './RetroDecathlon';
import RetroFrogger from './RetroFrogger';
import RetroAsteroids from './RetroAsteroids';

export default function RetroGamerRoom({ onClose }) {
    const [isOn, setIsOn] = useState(false);
    const [bootPhase, setBootPhase] = useState(0); // 0: off, 1: flickering, 2: ready
    const [selectedGame, setSelectedGame] = useState(null);
    const audioRef = useRef(null);

    const games = [
        { id: 'decathlon', name: 'DECATHLON LS (ATARI CLASSIC)', component: RetroDecathlon },
        { id: 'pong', name: 'SERENITO PONG', component: RetroPong },
        { id: 'snake', name: 'COSECHA PAPAYAS', component: RetroSnake },
        { id: 'space', name: 'DEFENSOR DEL FARO', component: RetroSpace },
        { id: 'pacman', name: 'SERENITO PACMAN', component: RetroPacman },
        { id: 'moonpatrol', name: 'PASEO NOCTURNO', component: RetroMoonPatrol },
        { id: 'rallyx', name: 'SERENA RALLY-X', component: RetroRallyX },
        { id: 'frogger', name: 'CRUZANDO LA AVENIDA', component: RetroFrogger },
        { id: 'asteroids', name: 'LIMPIANDO LA PLAYA', component: RetroAsteroids },
        { id: 'cubedash', name: 'CUBE DASH: LABERINTO BIPOLAR', component: CubeDash }
    ];

    const turnOn = () => {
        if (isOn) return;
        setIsOn(true);
        setBootPhase(1);
        setTimeout(() => setBootPhase(2), 800);
    };

    const turnOff = () => {
        setIsOn(false);
        setBootPhase(0);
        setSelectedGame(null);
    };

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 70000,
            background: '#050505',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            fontFamily: "'Courier New', Courier, monospace"
        }}>
            {/* Ambient Background - Altar Gamer Image */}
            <div style={{ 
                position: 'absolute', 
                inset: 0, 
                backgroundImage: 'url(/nostalgia/atari_altar.png)', 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.6,
                zIndex: 1
            }} />

            {/* Close Button */}
            <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 100, background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', borderRadius: '50%', padding: '0.5rem', cursor: 'pointer' }}>
                <X size={32} />
            </button>

            {/* Desktop Setup Wrapper */}
            <div className="desk-setup" style={{ 
                position: 'relative', 
                zIndex: 10, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                gap: '2rem',
                transform: 'scale(0.9)'
            }}>
                
                {/* CRT TV Container */}
                <div className="tv-case" style={{
                    width: '600px',
                    height: '450px',
                    background: '#2a2a2a',
                    borderRadius: '40px',
                    padding: '2.5rem',
                    boxShadow: 'inset 0 0 20px #000, 0 50px 100px rgba(0,0,0,0.8)',
                    position: 'relative',
                    border: '8px solid #333'
                }}>
                    <div className="crt-screen" style={{
                        width: '100%',
                        height: '100%',
                        background: isOn ? (bootPhase === 1 ? '#fff' : '#000') : '#111',
                        borderRadius: '30px',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: isOn ? '0 0 50px rgba(56, 189, 248, 0.2)' : 'none',
                        transition: 'background 0.1s'
                    }}>
                        {/* Scanlines Effect */}
                        <div className="scanlines" style={{
                            position: 'absolute',
                            inset: 0,
                            zIndex: 5,
                            pointerEvents: 'none',
                            background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                            backgroundSize: '100% 2px, 3px 100%'
                        }} />

                        {/* Screen Glow / Curvature */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            zIndex: 4,
                            pointerEvents: 'none',
                            background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
                            boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5)'
                        }} />

                        {/* TV Content */}
                        {isOn && bootPhase === 2 && (
                            <div className="tv-content" style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '2rem',
                                color: '#38bdf8',
                                animation: 'flicker 0.15s infinite'
                            }}>
                                {!selectedGame ? (
                                    <div style={{ textAlign: 'left', width: '100%' }}>
                                        <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem', borderBottom: '2px solid #38bdf8', paddingBottom: '0.5rem' }}>*** ATARI VECINOS SMART 800XL ***</h2>
                                        <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>READY.</p>
                                        <div style={{ marginTop: '1rem' }}>
                                            {games.map((g, idx) => (
                                                <button 
                                                    key={g.id}
                                                    onClick={() => setSelectedGame(g)}
                                                    style={{ 
                                                        display: 'block', 
                                                        background: 'transparent', 
                                                        border: 'none', 
                                                        color: '#38bdf8', 
                                                        fontFamily: 'inherit',
                                                        fontSize: '1rem',
                                                        cursor: 'pointer',
                                                        textAlign: 'left',
                                                        padding: '0.2rem 0',
                                                        width: '100%'
                                                    }}
                                                    className="game-link"
                                                >
                                                    {idx + 1}. {g.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                                        {selectedGame.component ? (
                                            (() => {
                                                const Game = selectedGame.component;
                                                return <Game onExit={() => setSelectedGame(null)} brightness={100} contrast={100} />;
                                            })()
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                <p style={{ color: '#38bdf8' }}>[ ERROR DE CARGA ]</p>
                                                <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Memoria Corrupta...</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* TV Controls (Physical buttons) */}
                    <div style={{ position: 'absolute', bottom: '10px', right: '40px', display: 'flex', gap: '0.5rem' }}>
                        <button onClick={isOn ? turnOff : turnOn} style={{ width: '30px', height: '30px', borderRadius: '50%', background: isOn ? '#ef4444' : '#333', border: '2px solid #111', cursor: 'pointer', boxShadow: isOn ? '0 0 10px #ef4444' : 'none' }}>
                            <Power size={14} color="white" />
                        </button>
                    </div>
                </div>

                {/* Console & Peripherals Row */}
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3rem' }}>
                    
                    {/* XC12 Cassette Deck */}
                    <div className="casete-deck" style={{ 
                        width: '180px', 
                        height: '60px', 
                        background: '#444', 
                        borderRadius: '8px', 
                        border: '3px solid #222',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 1rem'
                    }}>
                        <div style={{ width: '40px', height: '15px', background: '#000', borderRadius: '2px', fontSize: '0.6rem', color: '#0f0', textAlign: 'center' }}>0123</div>
                        <div style={{ display: 'flex', gap: '4px' }}>
                            <button onClick={turnOn} style={{ width: '20px', height: '20px', background: '#888', border: '1px solid #111' }}></button>
                            <button style={{ width: '20px', height: '20px', background: '#888', border: '1px solid #111' }}></button>
                        </div>
                    </div>

                    {/* Atari 800XL Keyboard */}
                    <div className="atari-800xl" style={{
                        width: '450px',
                        height: '120px',
                        background: '#d1cdc4',
                        borderRadius: '10px',
                        border: '4px solid #b7b3aa',
                        boxShadow: '0 10px 0 #8c887e',
                        padding: '1rem',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(15, 1fr)',
                        gap: '4px'
                    }}>
                        {/* Simulating keys */}
                        {Array.from({ length: 45 }).map((_, i) => (
                            <div key={i} style={{ background: '#453c36', height: '18px', borderRadius: '2px', borderBottom: '2px solid #000' }}></div>
                        ))}
                    </div>

                    {/* CX40 Joystick */}
                    <div className="joystick" style={{ position: 'relative', width: '80px', height: '80px', background: '#111', borderRadius: '8px', border: '2px solid #000' }}>
                        <div style={{ 
                            position: 'absolute', 
                            top: '50%', 
                            left: '50%', 
                            transform: 'translate(-50%, -100%)', 
                            width: '12px', 
                            height: '50px', 
                            background: '#222', 
                            borderRadius: '6px' 
                        }}>
                            <div style={{ width: '20px', height: '20px', background: '#333', borderRadius: '50%', position: 'absolute', top: '-10px', left: '-4px' }}></div>
                        </div>
                        <div style={{ position: 'absolute', top: '10px', left: '10px', width: '15px', height: '15px', background: '#ef4444', borderRadius: '3px', boxShadow: '0 2px 0 #991b1b' }}></div>
                    </div>
                </div>

                {/* Serenito Character Sitting on Edge */}
                <div style={{ 
                    position: 'absolute', 
                    bottom: '-40px', 
                    left: '-100px', 
                    width: '180px', 
                    zIndex: 20,
                    animation: 'gentle-float 4s ease-in-out infinite'
                }}>
                    <img 
                        src="/serenito_3d_avatar_render_1773414152010.png" 
                        alt="Serenito" 
                        style={{ width: '100%', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))' }}
                    />
                </div>

            </div>

            <style>{`
                @keyframes flicker {
                    0% { opacity: 0.97; }
                    50% { opacity: 1; }
                    100% { opacity: 0.98; }
                }
                @keyframes gentle-float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .game-link:hover {
                    background: #38bdf8 !important;
                    color: black !important;
                }
                .desk-setup {
                    transition: all 0.3s ease;
                }
            `}</style>
        </div>
    );
}
