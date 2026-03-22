import React, { useState, useEffect, useRef, useCallback } from 'react';
import { User, Shield, Package, Trophy, ArrowRight, ArrowLeft, ArrowUp, ArrowDown, Building2, ShoppingBag } from 'lucide-react';

const LEVEL_HEIGHT = 160;
const FLOOR_WIDTH = 800;
const TOTAL_FLOORS = 5;
const PLAYER_SIZE = 40;
const GRAVITY = 0.8;
const JUMP_FORCE = -15;
const SPEED = 5;

export default function RetroCaracolElevator({ brightness = 100, contrast = 100 }) {
    const canvasRef = useRef(null);
    const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'win', 'gameover'
    const [score, setScore] = useState(0);
    const [itemsCollected, setItemsCollected] = useState(0);
    const [lives, setLives] = useState(3);
    
    // Game state refs for the loop
    const player = useRef({
        x: 100,
        y: (TOTAL_FLOORS - 1) * LEVEL_HEIGHT + 100,
        vx: 0,
        vy: 0,
        dir: 1, // 1: right, -1: left
        isJumping: false,
        isDucking: false,
        inElevator: false,
        currentFloor: TOTAL_FLOORS - 1
    });

    const elevator = useRef({
        y: (TOTAL_FLOORS - 1) * LEVEL_HEIGHT,
        targetY: (TOTAL_FLOORS - 1) * LEVEL_HEIGHT,
        status: 'idle', // 'idle', 'moving'
        floor: TOTAL_FLOORS - 1
    });

    const enemies = useRef([]);
    const enemyBullets = useRef([]);
    const bullets = useRef([]);
    const stores = useRef([]);
    const keys = useRef({});

    const initLevel = useCallback(() => {
        setScore(0);
        setItemsCollected(0);
        enemyBullets.current = [];
        bullets.current = [];
        player.current = {
            x: 100,
            y: (TOTAL_FLOORS - 1) * LEVEL_HEIGHT + (LEVEL_HEIGHT - PLAYER_SIZE - 20),
            vx: 0,
            vy: 0,
            dir: 1,
            isJumping: false,
            isDucking: false,
            inElevator: false,
            currentFloor: TOTAL_FLOORS - 1
        };
        
        // Init stores with more variety reflecting the real Caracol
        const storeTypes = ['Ropa', 'Electrónica', 'Artesanía', 'Comida', 'Disquería', 'Lanas', 'Peluquería', 'Joguetes', 'Cafetería'];
        const newStores = [];
        for (let f = 0; f < TOTAL_FLOORS; f++) {
            for (let s = 0; s < 4; s++) {
                newStores.push({
                    x: 80 + s * 160,
                    y: f * LEVEL_HEIGHT + 60,
                    floor: f,
                    visited: false,
                    type: storeTypes[Math.floor(Math.random() * storeTypes.length)]
                });
            }
        }
        stores.current = newStores;

        // Init enemies - Increased count and added shooting state
        enemies.current = Array.from({ length: 8 }, () => ({
            x: Math.random() * 500 + 100,
            y: Math.floor(Math.random() * TOTAL_FLOORS) * LEVEL_HEIGHT + 100,
            vx: (Math.random() > 0.5 ? 2.5 : -2.5),
            type: 'agent',
            lastShot: 0
        }));
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => keys.current[e.key] = true;
        const handleKeyUp = (e) => keys.current[e.key] = false;
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    useEffect(() => {
        if (gameState !== 'playing') return;

        let animationFrameId;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const update = () => {
            const p = player.current;
            const el = elevator.current;

            // Horizontal movement
            if (keys.current['ArrowLeft']) {
                p.vx = -SPEED;
                p.dir = -1;
                p.isDucking = false;
            } else if (keys.current['ArrowRight']) {
                p.vx = SPEED;
                p.dir = 1;
                p.isDucking = false;
            } else {
                p.vx = 0;
            }

            // Ducking
            if (keys.current['ArrowDown'] && !p.inElevator) {
                p.isDucking = true;
                p.vx = 0;
            } else {
                p.isDucking = false;
            }

            // Jumping
            if (keys.current['ArrowUp'] && !p.isJumping && !p.inElevator) {
                p.vy = JUMP_FORCE;
                p.isJumping = true;
            }

            // Shoot
            if (keys.current[' '] && bullets.current.length < 3) {
                bullets.current.push({
                    x: p.x + (p.dir === 1 ? PLAYER_SIZE : 0),
                    y: p.y + (p.isDucking ? 30 : 15),
                    vx: p.dir * 10
                });
                keys.current[' '] = false; // Prevents spam
            }

            // Gravity & Vertical bounds
            p.vy += GRAVITY;
            p.y += p.vy;
            p.x += p.vx;

            const floorBaseY = p.currentFloor * LEVEL_HEIGHT + (LEVEL_HEIGHT - PLAYER_SIZE - 20);
            if (p.y > floorBaseY && !p.inElevator) {
                p.y = floorBaseY;
                p.vy = 0;
                p.isJumping = false;
            }

            // Horizontal bounds
            if (p.x < 0) p.x = 0;
            if (p.x > canvas.width - PLAYER_SIZE) p.x = canvas.width - PLAYER_SIZE;

            // Elevator Login
            const elevatorX = canvas.width - 100;
            if (Math.abs(p.x - elevatorX) < 20 && Math.abs(p.y - (el.y + 100)) < 20) {
                if (keys.current['ArrowUp'] || keys.current['ArrowDown']) {
                    p.inElevator = true;
                    p.x = elevatorX + 20;
                }
            }

            if (p.inElevator) {
                if (keys.current['ArrowUp'] && el.floor > 0) {
                    el.floor--;
                    el.y = el.floor * LEVEL_HEIGHT;
                    p.y = el.y + 100;
                    p.currentFloor = el.floor;
                } else if (keys.current['ArrowDown'] && el.floor < TOTAL_FLOORS - 1) {
                    el.floor++;
                    el.y = el.floor * LEVEL_HEIGHT;
                    p.y = el.y + 100;
                    p.currentFloor = el.floor;
                }
                
                if (keys.current['ArrowLeft']) {
                    p.inElevator = false;
                    p.x = elevatorX - 30;
                }
            }

            // Bullet movement
            bullets.current = bullets.current.filter(b => {
                b.x += b.vx;
                return b.x > 0 && b.x < canvas.width;
            });

            // Enemy Bullet movement & Collision with Player
            enemyBullets.current = enemyBullets.current.filter(b => {
                b.x += b.vx;
                const isPlayerHit = Math.abs(b.x - p.x) < 20 && 
                                  Math.abs(b.y - (p.y + (p.isDucking ? 35 : 15))) < 20 && 
                                  !p.inElevator;
                if (isPlayerHit) {
                    setLives(prev => {
                        if (prev <= 1) setGameState('gameover');
                        return prev - 1;
                    });
                    initLevel();
                    return false;
                }
                return b.x > 0 && b.x < canvas.width;
            });

            // Enemy movement & shooting logic
            enemies.current.forEach(e => {
                e.x += e.vx;
                if (e.x < 50 || e.x > 600) e.vx *= -1;
                
                // Enemy shoots if on same floor and facing player
                const eFloor = Math.floor(e.y / LEVEL_HEIGHT);
                if (eFloor === p.currentFloor && Math.abs(e.x - p.x) < 400 && Date.now() - e.lastShot > 2500) {
                    const facingPlayer = (e.vx > 0 && p.x > e.x) || (e.vx < 0 && p.x < e.x);
                    if (facingPlayer) {
                        enemyBullets.current.push({
                            x: e.x + (e.vx > 0 ? 30 : 0),
                            y: e.y + (LEVEL_HEIGHT - 45),
                            vx: (e.vx > 0 ? 7 : -7)
                        });
                        e.lastShot = Date.now();
                    }
                }

                // Direct collision
                if (Math.abs(e.x - p.x) < 30 && Math.abs(eFloor - p.currentFloor) === 0 && !p.inElevator) {
                    setLives(prev => {
                        if (prev <= 1) setGameState('gameover');
                        return prev - 1;
                    });
                    initLevel();
                }
            });

            // Store interaction
            stores.current.forEach(s => {
                if (Math.abs(s.x - p.x) < 30 && s.floor === p.currentFloor && !s.visited) {
                    if (keys.current['ArrowUp']) {
                        s.visited = true;
                        setItemsCollected(prev => prev + 1);
                        setScore(prev => prev + 500);
                        if (itemsCollected + 1 >= stores.current.length) setGameState('win');
                    }
                }
            });

            // Hit enemies
            bullets.current.forEach((b, bi) => {
                enemies.current.forEach((e, ei) => {
                    const eYActual = e.y + (LEVEL_HEIGHT - 40);
                    if (Math.abs(b.x - e.x) < 30 && Math.abs(b.y - eYActual) < 40) {
                        enemies.current.splice(ei, 1);
                        bullets.current.splice(bi, 1);
                        setScore(prev => prev + 250);
                    }
                });
            });
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Background (City View)
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw City through panoramic windows
            ctx.save();
            ctx.globalAlpha = 0.3;
            ctx.fillStyle = '#38bdf8';
            ctx.beginPath();
            ctx.moveTo(canvas.width - 150, 0);
            ctx.lineTo(canvas.width, 0);
            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(canvas.width - 150, canvas.height);
            ctx.fill();
            
            // Cathedral Silhouette
            ctx.fillStyle = '#1e293b';
            ctx.fillRect(canvas.width - 120, 100, 40, 150);
            ctx.fillRect(canvas.width - 140, 180, 80, 70);
            
            // Sea
            ctx.fillStyle = '#0369a1';
            ctx.fillRect(canvas.width - 150, canvas.height - 100, 150, 100);
            ctx.restore();

            // Draw Floors
            for (let i = 0; i < TOTAL_FLOORS; i++) {
                const y = i * LEVEL_HEIGHT + (LEVEL_HEIGHT - 20);
                ctx.fillStyle = '#4b5563';
                ctx.fillRect(0, y, canvas.width - 150, 20);
                
                // Railing
                ctx.strokeStyle = '#94a3b8';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(0, y - 20);
                ctx.lineTo(canvas.width - 150, y - 20);
                ctx.stroke();
                
                for (let x = 0; x < canvas.width - 150; x += 40) {
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x, y - 20);
                    ctx.stroke();
                }

                // Floor labels
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 12px monospace';
                ctx.fillText(`NIVEL ${TOTAL_FLOORS - i}`, 10, y + 15);
            }

            // Draw Stores
            stores.current.forEach(s => {
                const y = s.floor * LEVEL_HEIGHT + (LEVEL_HEIGHT - 80);
                ctx.fillStyle = s.visited ? '#1e293b' : '#334155';
                ctx.fillRect(s.x, y, 60, 60);
                ctx.strokeStyle = s.visited ? '#059669' : '#38bdf8';
                ctx.lineWidth = 3;
                ctx.strokeRect(s.x, y, 60, 60);
                
                ctx.fillStyle = s.visited ? '#059669' : '#38bdf8';
                ctx.font = 'bold 9px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(s.visited ? 'CANJEADO' : s.type, s.x + 30, y - 5);
                ctx.textAlign = 'left';
                
                ctx.fillStyle = '#000';
                ctx.fillRect(s.x + 20, y + 15, 20, 45);
            });

            // Draw Elevator
            const el = elevator.current;
            ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
            ctx.fillRect(canvas.width - 100, el.y + 20, 80, LEVEL_HEIGHT - 40);
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 4;
            ctx.strokeRect(canvas.width - 100, el.y + 20, 80, LEVEL_HEIGHT - 40);
            
            ctx.strokeStyle = '#64748b';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(canvas.width - 60, 0);
            ctx.lineTo(canvas.width - 60, el.y + 20);
            ctx.stroke();

            // Draw Enemies
            enemies.current.forEach(e => {
                ctx.fillStyle = '#ef4444';
                ctx.fillRect(e.x, e.y + (LEVEL_HEIGHT - 60), 30, 40);
                ctx.fillStyle = '#000';
                ctx.fillRect(e.x - 5, e.y + (LEVEL_HEIGHT - 65), 40, 5);
                ctx.fillRect(e.x + 5, e.y + (LEVEL_HEIGHT - 75), 20, 10);
                // Enemy Gun
                ctx.fillStyle = '#000';
                if (e.vx > 0) ctx.fillRect(e.x + 25, e.y + (LEVEL_HEIGHT - 45), 10, 4);
                else ctx.fillRect(e.x - 5, e.y + (LEVEL_HEIGHT - 45), 10, 4);
            });

            // Draw Bullets (Player - Red Hearts)
            bullets.current.forEach(b => {
                ctx.fillStyle = '#ef4444';
                ctx.font = '20px Arial';
                ctx.fillText('❤️', b.x - 10, b.y + (LEVEL_HEIGHT - 30));
            });

            // Draw Bullets (Enemies)
            enemyBullets.current.forEach(b => {
                ctx.fillStyle = '#f87171';
                ctx.beginPath();
                ctx.arc(b.x, b.y, 4, 0, Math.PI * 2);
                ctx.fill();
            });

            // Draw Player (Serenito Detective)
            const p = player.current;
            ctx.save();
            ctx.translate(p.x, p.y);
            
            // Shadow
            ctx.fillStyle = 'rgba(0,0,0,0.3)';
            ctx.beginPath();
            ctx.ellipse(PLAYER_SIZE/2, PLAYER_SIZE + 15, 20, 5, 0, 0, Math.PI * 2);
            ctx.fill();

            // Character body (Serenito in Trench coat)
            ctx.fillStyle = '#facc15'; // Serenito Yellow
            const h = p.isDucking ? PLAYER_SIZE/2 : PLAYER_SIZE;
            ctx.fillRect(0, 0, PLAYER_SIZE, h);
            
            // Trench coat
            ctx.fillStyle = '#334155';
            ctx.fillRect(0, h/3, PLAYER_SIZE, h * (2/3));
            
            // Belt
            ctx.fillStyle = '#000';
            ctx.fillRect(0, h/2, PLAYER_SIZE, 4);

            // Eyes
            ctx.fillStyle = '#fff';
            ctx.fillRect(p.dir === 1 ? 25 : 5, 10, 10, 5);
            ctx.fillStyle = '#000';
            ctx.fillRect(p.dir === 1 ? 30 : 10, 10, 5, 5);

            // Fedora
            ctx.fillStyle = '#1e293b';
            ctx.fillRect(-5, -5, PLAYER_SIZE + 10, 5);
            ctx.fillRect(5, -20, PLAYER_SIZE - 10, 15);

            // Gun if shooting or holding
            ctx.fillStyle = '#475569';
            if (p.dir === 1) ctx.fillRect(PLAYER_SIZE - 5, 20, 15, 8);
            else ctx.fillRect(-10, 20, 15, 8);

            ctx.restore();

            // Overlay scanlines
            ctx.fillStyle = 'rgba(0, 255, 0, 0.05)';
            for (let i = 0; i < canvas.height; i += 4) {
                ctx.fillRect(0, i, canvas.width, 1);
            }
        };

        const loop = () => {
            update();
            draw();
            animationFrameId = requestAnimationFrame(loop);
        };

        animationFrameId = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(animationFrameId);
    }, [gameState, initLevel, itemsCollected]);

    const startGame = () => {
        setGameState('playing');
        setLives(3);
        initLevel();
    };

    return (
        <div style={{ 
            width: '100%', 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            background: '#000',
            color: 'white',
            fontFamily: 'monospace',
            filter: `brightness(${brightness}%) contrast(${contrast}%)`
        }}>
            <div style={{ 
                width: '800px', 
                height: '600px', 
                position: 'relative', 
                border: '10px solid #334155', 
                borderRadius: '8px',
                boxShadow: '0 0 50px rgba(56, 189, 248, 0.2)'
            }}>
                <canvas 
                    ref={canvasRef} 
                    width={800} 
                    height={600} 
                    style={{ display: 'block', background: '#000' }}
                />

                {/* Score / UI Overlay */}
                <div style={{ position: 'absolute', top: '10px', left: '20px', display: 'flex', gap: '2rem', fontSize: '1.2rem', textShadow: '2px 2px #000', zIndex: 100 }}>
                    <div style={{ color: '#fbbf24' }}>PUNTOS: {score.toString().padStart(6, '0')}</div>
                    <div style={{ color: '#ef4444' }}>VIDAS: {'❤️'.repeat(lives)}</div>
                    <div style={{ color: '#38bdf8' }}>COMPRAS: {itemsCollected}/{stores.current.length}</div>
                </div>

                <div style={{ position: 'absolute', top: '10px', right: '20px', background: 'rgba(0,0,0,0.5)', padding: '5px 10px', borderRadius: '4px', border: '1px solid #38bdf8' }}>
                    CARACOL COLONIAL LS
                </div>

                {gameState === 'start' && (
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
                        <h1 style={{ fontSize: '4rem', color: '#facc15', marginBottom: '0.5rem', textAlign: 'center' }}>CARACOL ACTION</h1>
                        <h2 style={{ fontSize: '1.5rem', color: '#38bdf8', marginBottom: '2rem' }}>Detective en La Serena</h2>
                        
                        <div style={{ background: 'rgba(56, 189, 248, 0.1)', padding: '2rem', borderRadius: '20px', border: '1px solid #38bdf8', marginBottom: '2rem', maxWidth: '500px' }}>
                            <p style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#cbd5e1' }}><ArrowRight size={20} /> Flechas: Mover / Saltar / Agacharse</p>
                            <p style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#cbd5e1' }}><ArrowUp size={20} /> Flecha Arriba: Entrar a tienda o subir ascensor</p>
                            <p style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#cbd5e1' }}><ShoppingBag size={20} /> Meta: Visita las todas las tiendas del Caracol Colonial</p>
                            <p style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#cbd5e1' }}><Shield size={20} /> Espacio: Disparar a los agentes enemigos</p>
                        </div>
                        
                        <button 
                            onClick={startGame}
                            className="btn pulse" 
                            style={{ background: '#facc15', color: '#000', padding: '1rem 3rem', borderRadius: '50px', fontSize: '1.5rem', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}
                        >
                            INICIAR MISIÓN
                        </button>
                    </div>
                )}

                {gameState === 'win' && (
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
                        <Trophy size={100} color="#facc15" className="animate-bounce" />
                        <h1 style={{ fontSize: '3rem', color: '#facc15', margin: '1rem 0' }}>¡MISIÓN CUMPLIDA!</h1>
                        <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Has completado todas las compras en el Caracol Colonial.</p>
                        <div style={{ fontSize: '2rem', marginBottom: '2rem', color: '#38bdf8' }}>PUNTOS: {score}</div>
                        <button 
                            onClick={startGame}
                            style={{ background: '#facc15', color: '#000', padding: '1rem 3rem', borderRadius: '50px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}
                        >
                            JUGAR DE NUEVO
                        </button>
                    </div>
                )}

                {gameState === 'gameover' && (
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
                        <h1 style={{ fontSize: '4rem', color: '#ef4444', marginBottom: '1rem' }}>FIN DEL JUEGO</h1>
                        <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Los agentes te han atrapado.</p>
                        <button 
                            onClick={startGame}
                            style={{ background: '#ef4444', color: '#fff', padding: '1rem 3rem', borderRadius: '50px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}
                        >
                            REINTENTAR
                        </button>
                    </div>
                )}
            </div>

            <div style={{ marginTop: '20px', color: '#4b5563', textAlign: 'center' }}>
                <p>Usa el Ascensor Panorámico para moverte entre los 5 niveles.</p>
                <p>Vista desde Balmaceda: Catedral y el Mar en el fondo.</p>
            </div>

            <style>{`
                .pulse { animation: pulse 1.5s infinite; }
                @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
                .hover-scale:hover { transform: scale(1.1); }
            `}</style>
        </div>
    );
}
