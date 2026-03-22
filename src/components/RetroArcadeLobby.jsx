import React, { useState } from 'react';
import { Gamepad2, X, Trophy, History, Building2 } from 'lucide-react';
import RetroPong from './RetroPong';
import RetroSnake from './RetroSnake';
import RetroSpace from './RetroSpace';
import RetroPooyan from './RetroPooyan';
import RetroTetris from './RetroTetris';
import RetroBreakout from './RetroBreakout';
import RetroAsteroids from './RetroAsteroids';
import RetroFlappy from './RetroFlappy';
import RetroFrogger from './RetroFrogger';
import RetroDino from './RetroDino';
import RetroFronton from './RetroFronton';
import RetroPesca from './RetroPesca';
import RetroPinball from './RetroPinball';
import RetroPacman from './RetroPacman';
import RetroMoonPatrol from './RetroMoonPatrol';
import RetroCubo3D from './RetroCubo3D';
import RetroRallyX from './RetroRallyX';
import RetroDecathlon from './RetroDecathlon';
import RetroRubik from './RetroRubik';
import RetroCaracolElevator from './RetroCaracolElevator';
import PlayCenterNostalgia from './PlayCenterNostalgia';

export default function RetroArcadeLobby({ onClose }) {
    const [selectedGame, setSelectedGame] = useState(null);

    const games = [
        { id: 'rubik', name: 'CUBO VLS 3D', desc: 'Explora la ciudad en un cubo interactivo de 360 grados con fotos reales.', color: '#ec4899', icon: Gamepad2, component: RetroRubik },
        { id: 'cubo', name: 'PIEZAS MÁGICAS 3D', desc: '¡Nuevo! 7 Puzzles con paisajes reales y vista satelital de La Serena.', color: '#fcd34d', icon: Gamepad2, component: RetroCubo3D },
        { id: 'pong', name: 'SERENITO PONG', desc: 'Tenis de playa en la Avenida del Mar.', color: '#39ff14', icon: Gamepad2, component: RetroPong },
        { id: 'snake', name: 'SERENITO COSECHA PAPAYAS', desc: 'Recorre el valle recogiendo las ricas papayas.', color: '#ffb300', icon: Gamepad2, component: RetroSnake },
        { id: 'space', name: 'DEFENSOR DEL FARO', desc: 'Defiende el Faro Monumental de invasores.', color: '#00ffff', icon: Gamepad2, component: RetroSpace },
        { id: 'pooyan', name: 'BALLOON DEFENDER LS', desc: '¡Protege La Serena desde tu globo aerostático!', color: '#ff69b4', icon: Gamepad2, component: RetroPooyan },
        { id: 'tetris', name: 'CONSTRUYENDO LA SERENA', desc: 'Acomoda los bloques arquitectónicos coloniales.', color: '#a855f7', icon: Gamepad2, component: RetroTetris },
        { id: 'breakout', name: 'SERENITO ALBAÑIL', desc: 'Construye y despeja los ladrillos de la ciudad.', color: '#f97316', icon: Gamepad2, component: RetroBreakout },
        { id: 'asteroids', name: 'LIMPIANDO LA PLAYA', desc: 'Destruye la basura espacial para cuidar nuestro borde costero.', color: '#eab308', icon: Gamepad2, component: RetroAsteroids },
        { id: 'frogger', name: 'CRUZANDO LA AVENIDA', desc: 'Ayuda a Serenito a cruzar la recargada Avenida de Aguirre.', color: '#22c55e', icon: Gamepad2, component: RetroFrogger },
        { id: 'flappy', name: 'SERENITO PLANEADOR', desc: 'Vuela entre los arcos históricos sin chocar.', color: '#3b82f6', icon: Gamepad2, component: RetroFlappy },
        { id: 'dino', name: 'TROTANDO EN LA AV. DEL MAR', desc: 'Ayuda a Serenito a trotar por la playa saltando sobre la basura y gaviotas.', color: '#ec4899', icon: Gamepad2, component: RetroDino },
        { id: 'fronton', name: 'PELOTA DE PLAYA (FRONTÓN)', desc: '¡Rebota contra el muro del estadio La Portada con Serenito!', color: '#3b82f6', icon: Gamepad2, component: RetroFronton },
        { id: 'pesca', name: 'PESCA CON SERENITO', desc: '¡Atrapa los anillos de colores en las varas, clásico juguete de agua con burbujas!', color: '#0ea5e9', icon: Gamepad2, component: RetroPesca },
        { id: 'pinball', name: 'FLIPPERS VLS', desc: '¡Nuevo! Mesa de pinball mejorada con el arte clásico de FLIPPERS. ¡Suma puntos con Serenito!', color: '#fcd34d', icon: Gamepad2, component: RetroPinball },
        { id: 'rallyx', name: 'SERENA RALLY-X', desc: 'Recorre las calles de La Serena esquivando vehículos con tu cortina de humo.', color: '#3b82f6', icon: Gamepad2, component: RetroRallyX, maintenance: true },
        { id: 'decathlon', name: 'JABALINA SERENENSE', desc: '¡Lanza la jabalina como en el clásico Decathlon del Atari! Corre y ajusta el ángulo.', color: '#f97316', icon: Gamepad2, component: RetroDecathlon, maintenance: true },
        { id: 'pacman', name: 'SERENITO PACMAN', desc: 'Limpia el laberinto comiendo vitaminas y papayas para derrotar a los enemigos.', color: '#ffff00', icon: Gamepad2, component: RetroPacman },
        { id: 'moonpatrol', name: 'PASEO NOCTURNO', desc: 'Recorre la noche serenense sin chocar con escombros.', color: '#ffb8ff', icon: Gamepad2, component: RetroMoonPatrol, maintenance: true },
        { id: 'elevator', name: 'CARACOL ACTION', desc: '¡NUEVO! Detective Serenito en el ascensor panorámico del Caracol Colonial. ¡De compras por los 5 niveles!', color: '#facc15', icon: Building2, component: RetroCaracolElevator },
        { id: 'playcenter', name: 'PLAY CENTER CORDOVEZ', desc: '¡Nuevo! Viaja al pasado con fotos reales del mítico salón de juegos.', color: '#f97316', icon: History, component: PlayCenterNostalgia }
    ];

    const simulateKey = (key, eventType) => {
        window.dispatchEvent(new KeyboardEvent(eventType, { key }));
    };

    if (selectedGame) {
        const GameComponent = selectedGame.component;
        return (
            <div style={{ position: 'fixed', inset: 0, zIndex: 50000, background: '#0a0a0a', display: 'flex', flexDirection: 'column', height: '100dvh', paddingBottom: 'env(safe-area-inset-bottom)' }}>
                <div className="arcade-header" style={{ padding: '0.5rem 1rem', background: '#000', borderBottom: `4px solid ${selectedGame.color}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100 }}>
                    <h2 style={{ color: selectedGame.color, fontFamily: 'monospace', margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textShadow: `0 0 10px ${selectedGame.color}` }}>
                        <Trophy size={20} /> <span className="game-title-text">{selectedGame.name}</span>
                    </h2>
                    <button
                        onClick={() => setSelectedGame(null)}
                        className="exit-game-btn"
                        style={{ background: 'transparent', border: `2px solid ${selectedGame.color}`, color: selectedGame.color, padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontFamily: 'monospace', fontSize: '1rem', fontWeight: 'bold' }}
                    >
                        <span className="exit-btn-full">[ SALIR AL LOBBY ]</span>
                        <span className="exit-btn-short">[ SALIR ]</span>
                        <span className="exit-btn-mini">[X]</span>
                    </button>
                </div>
                <div className="arcade-game-workspace" style={{ 
                    flex: 1, 
                    position: 'relative', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    overflow: 'hidden',
                    background: '#000'
                }}>
                    {/* CRTs Scanlines */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 4px, 6px 100%', pointerEvents: 'none', zIndex: 30 }}></div>
                    <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 100px rgba(0,0,0,0.9)', pointerEvents: 'none', zIndex: 31 }}></div>

                    {/* Game Container Area */}
                    <div style={{ 
                        flex: 1, 
                        width: '100%',
                        height: '100%',
                        position: 'relative', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        overflow: 'hidden', 
                        zIndex: 12,
                        minHeight: 0 // CRITICAL for flex-grow to work as expected
                    }}>
                        <div className="game-container-inner" style={{ width: '100%', height: '100%', position: 'relative' }}>
                            <GameComponent brightness={100} contrast={100} />
                        </div>
                    </div>

                    {/* Universal Mobile Touch Controls Overlay - Gameboy Style Bottom Bar */}
                    {selectedGame.id !== 'cubo' && (
                        <div className="mobile-only-controls" style={{ width: '100%', zIndex: 100000, display: 'flex', justifyContent: 'space-between', padding: '15px 20px', background: 'linear-gradient(to bottom, #d1d5db, #9ca3af)', borderTop: '4px solid #4b5563' }}>
                        {/* D-Pad */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 45px)', gridTemplateRows: 'repeat(3, 45px)', gap: '2px', background: '#374151', padding: '10px', borderRadius: '50%', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.8), 0 5px 10px rgba(0,0,0,0.5)' }}>
                            <div></div>
                            <button
                                onTouchStart={(e) => { e.preventDefault(); simulateKey('ArrowUp', 'keydown'); }} onTouchEnd={(e) => { e.preventDefault(); simulateKey('ArrowUp', 'keyup'); }}
                                onMouseDown={() => simulateKey('ArrowUp', 'keydown')} onMouseUp={() => simulateKey('ArrowUp', 'keyup')}
                                style={{ background: '#111827', border: 'none', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', color: '#6b7280', fontSize: '20px', boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.2)' }}>⬆</button>
                            <div></div>
                            <button
                                onTouchStart={(e) => { e.preventDefault(); simulateKey('ArrowLeft', 'keydown'); }} onTouchEnd={(e) => { e.preventDefault(); simulateKey('ArrowLeft', 'keyup'); }}
                                onMouseDown={() => simulateKey('ArrowLeft', 'keydown')} onMouseUp={() => simulateKey('ArrowLeft', 'keyup')}
                                style={{ background: '#111827', border: 'none', borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px', color: '#6b7280', fontSize: '20px', boxShadow: 'inset 2px 0 4px rgba(255,255,255,0.2)' }}>⬅</button>
                            <div style={{ background: '#111827' }}></div>
                            <button
                                onTouchStart={(e) => { e.preventDefault(); simulateKey('ArrowRight', 'keydown'); }} onTouchEnd={(e) => { e.preventDefault(); simulateKey('ArrowRight', 'keyup'); }}
                                onMouseDown={() => simulateKey('ArrowRight', 'keydown')} onMouseUp={() => simulateKey('ArrowRight', 'keyup')}
                                style={{ background: '#111827', border: 'none', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', color: '#6b7280', fontSize: '20px', boxShadow: 'inset -2px 0 4px rgba(255,255,255,0.2)' }}>➡</button>
                            <div></div>
                            <button
                                onTouchStart={(e) => { e.preventDefault(); simulateKey('ArrowDown', 'keydown'); }} onTouchEnd={(e) => { e.preventDefault(); simulateKey('ArrowDown', 'keyup'); }}
                                onMouseDown={() => simulateKey('ArrowDown', 'keydown')} onMouseUp={() => simulateKey('ArrowDown', 'keyup')}
                                style={{ background: '#111827', border: 'none', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', color: '#6b7280', fontSize: '20px', boxShadow: 'inset 0 -2px 4px rgba(255,255,255,0.2)' }}>⬇</button>
                            <div></div>
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', paddingRight: '5px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <button
                                    onTouchStart={(e) => { e.preventDefault(); simulateKey('w', 'keydown'); }} onTouchEnd={(e) => { e.preventDefault(); simulateKey('w', 'keyup'); }}
                                    onMouseDown={() => simulateKey('w', 'keydown')} onMouseUp={() => simulateKey('w', 'keyup')}
                                    style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'radial-gradient(circle, #ef4444, #b91c1c)', border: 'none', color: '#fff', fontWeight: 'bold', fontSize: '16px', boxShadow: '0 4px 8px rgba(0,0,0,0.5)', cursor: 'pointer', marginBottom: '4px' }}>B</button>
                                <span style={{ color: '#4b5563', fontWeight: 'bold', fontSize: '10px' }}>B</span>
                            </div>
                           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <button
                                    onTouchStart={(e) => { e.preventDefault(); simulateKey(' ', 'keydown'); }} onTouchEnd={(e) => { e.preventDefault(); simulateKey(' ', 'keyup'); }}
                                    onMouseDown={() => simulateKey(' ', 'keydown')} onMouseUp={() => simulateKey(' ', 'keyup')}
                                    style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'radial-gradient(circle, #ef4444, #b91c1c)', border: 'none', color: '#fff', fontWeight: 'bold', fontSize: '16px', boxShadow: '0 4px 8px rgba(0,0,0,0.5)', cursor: 'pointer', marginBottom: '4px' }}>A</button>
                                <span style={{ color: '#4b5563', fontWeight: 'bold', fontSize: '10px' }}>A</span>
                            </div>
                        </div>
                        </div>
                    )}
                    <style>{`
                        .mobile-only-controls { display: none !important; }
                        @media (max-width: 1023px) {
                            .mobile-only-controls { 
                                display: flex !important; 
                                flex-shrink: 0; 
                                padding: 10px !important;
                                gap: 10px;
                                height: auto !important;
                                min-height: 100px;
                                max-height: 180px;
                                padding-bottom: 25px !important; 
                                border-top: 4px solid #1f2937 !important;
                            }
                            .game-container-inner > div {
                                height: 100% !important;
                                width: 100% !important;
                            }
                            canvas {
                                max-height: 100% !important;
                                max-width: 100% !important;
                            }
                            .arcade-header {
                                padding: 0.5rem 1rem !important;
                            }
                            .arcade-header h2 {
                                fontSize: 1.1rem !important;
                            }
                            .game-title-text {
                                display: none;
                            }
                            .arcade-header h2::after {
                                content: '${selectedGame.name.split(' ')[0]}...';
                            }
                            @media (min-width: 640px) {
                                .game-title-text { display: inline; }
                                .arcade-header h2::after { content: ''; }
                                .arcade-header h2 { fontSize: 1.5rem !important; }
                            }
                            @media (max-width: 640px) {
                                .lobby-title { font-size: 1.8rem !important; }
                                .lobby-icon { width: 30px; height: 30px; }
                                .close-text { display: none; }
                                .lobby-close-btn { padding: 0.5rem !important; border-radius: 50% !important; }
                                .title-text { display: none; }
                                .title-text::after { content: 'ARCADE'; }
                            }

                            .exit-btn-short, .exit-btn-mini { display: none; }
                            @media (max-width: 768px) {
                                .exit-btn-full { display: none; }
                                .exit-btn-short { display: inline; }
                            }
                            @media (max-width: 480px) {
                                .exit-btn-short { display: none; }
                                .exit-btn-mini { display: inline; }
                            }
                        }
                    `}</style>
                </div>
            </div>
        );
    }

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50000, background: '#111', color: 'white', overflowY: 'auto', height: '100dvh', paddingBottom: 'env(safe-area-inset-bottom)' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'url(/comic-cielo.jpg) center/cover', opacity: 0.1, zIndex: 0 }}></div>

            <div style={{ position: 'relative', zIndex: 1, padding: '2rem', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <header className="lobby-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '2px solid #333', paddingBottom: '1rem', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <h1 className="lobby-title" style={{ color: '#ec4899', fontSize: '2.5rem', margin: 0, textShadow: '0 0 15px #ec4899', fontFamily: 'monospace', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Gamepad2 size={40} className="lobby-icon" /> <span className="title-text">ARCADE '90</span>
                        </h1>
                        <p style={{ color: '#fbcfe8', margin: '0.5rem 0 0', fontSize: '1rem', fontFamily: 'monospace' }}>¡INSERTE SU FICHA!</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="lobby-close-btn"
                        style={{ background: '#ef4444', border: 'none', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', boxShadow: '0 0 15px rgba(239, 68, 68, 0.5)' }}
                    >
                        <X size={20} /> <span className="close-text">CERRAR ARCADE</span>
                    </button>
                </header>

                <div className="games-grid" style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                    gap: '1.5rem', 
                    flex: 1,
                    transform: 'scale(0.85)',
                    transformOrigin: 'top center'
                }}>
                    {games.map(game => (
                        <div
                            key={game.id}
                            onClick={() => {
                                if (game.maintenance) {
                                    alert("🕹️ ESTE JUEGO SE ENCUENTRA EN MANTENIMIENTO TÉCNICO. ¡Pronto disponible!");
                                    return;
                                }
                                setSelectedGame(game);
                            }}
                            style={{
                                background: 'rgba(0,0,0,0.8)',
                                border: `4px solid ${game.maintenance ? '#71717a' : game.color}`,
                                borderRadius: '16px',
                                padding: '2.5rem 2rem',
                                cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                boxShadow: `inset 0 0 20px ${game.maintenance ? '#000000' : game.color}40, 0 10px 30px rgba(0,0,0,0.5)`,
                                opacity: game.maintenance ? 0.7 : 1,
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            onMouseEnter={e => {
                                if (game.maintenance) return;
                                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                                e.currentTarget.style.boxShadow = `inset 0 0 40px ${game.color}80, 0 20px 40px rgba(0,0,0,0.8), 0 0 20px ${game.color}`;
                            }}
                            onMouseLeave={e => {
                                if (game.maintenance) return;
                                e.currentTarget.style.transform = 'none';
                                e.currentTarget.style.boxShadow = `inset 0 0 20px ${game.color}40, 0 10px 30px rgba(0,0,0,0.5)`;
                            }}
                        >
                            {game.maintenance && (
                                <div style={{ 
                                    position: 'absolute', top: '15px', right: '-35px', 
                                    background: 'repeating-linear-gradient(45deg, #facc15, #facc15 10px, #000 10px, #000 20px)', 
                                    color: 'black', fontWeight: '900', padding: '5px 40px', 
                                    transform: 'rotate(45deg)', fontSize: '0.7rem', 
                                    boxShadow: '0 5px 10px rgba(0,0,0,0.5)', zIndex: 10 
                                }}>
                                    MANTENCIÓN
                                </div>
                            )}
                            <game.icon size={80} color={game.maintenance ? '#71717a' : game.color} style={{ filter: `drop-shadow(0 0 10px ${game.maintenance ? '#000' : game.color})`, marginBottom: '1.5rem' }} />
                            <h2 style={{ color: game.maintenance ? '#71717a' : game.color, fontFamily: 'monospace', fontSize: '2.5rem', margin: '0 0 1rem', textShadow: `0 0 10px ${game.maintenance ? '#000' : game.color}` }}>
                                {game.name}
                            </h2>
                            <p style={{ color: '#ccc', fontSize: '1.2rem', lineHeight: '1.6', margin: 0 }}>
                                {game.maintenance ? 'NUESTROS TÉCNICOS ESTÁN TRABAJANDO EN ESTA MAQUINITA.' : game.desc}
                            </p>
                            <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
                                <span style={{ background: game.maintenance ? '#333' : game.color, color: game.maintenance ? '#666' : 'black', padding: '0.75rem 2rem', borderRadius: '50px', fontWeight: '900', fontSize: '1.2rem', fontFamily: 'monospace', letterSpacing: '2px', display: 'inline-block' }}>
                                    {game.maintenance ? 'OUT OF ORDER' : '► JUGAR AHORA'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <footer style={{ marginTop: '2rem', textAlign: 'center', color: '#666', fontFamily: 'monospace', paddingBottom: '1rem' }}>
                    &copy; 1990 VECINOSMART.CL / VECINOSLASERENA.CL
                </footer>
            </div>
        </div>
    );
}
