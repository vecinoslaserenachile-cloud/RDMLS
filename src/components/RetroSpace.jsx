import React, { useEffect, useRef, useState } from 'react';

export default function RetroSpace({ brightness = 100, contrast = 100 }) {
    const canvasRef = useRef(null);
    const audioCtxRef = useRef(null);
    const [score, setScore] = useState(0);

    const playTone = (freq, type, dur, sweep = false) => {
        if (!audioCtxRef.current) return;
        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();
        osc.type = type;
        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);

        if (sweep) {
            osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);
            osc.frequency.exponentialRampToValueAtTime(10, audioCtxRef.current.currentTime + dur);
        } else {
            osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);
        }

        gain.gain.setValueAtTime(0.1, audioCtxRef.current.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtxRef.current.currentTime + dur);
        osc.start();
        osc.stop(audioCtxRef.current.currentTime + dur);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const W = 800;
        const H = 600;
        canvas.width = W;
        canvas.height = H;

        let pScore = 0;
        let isStarted = false;
        let gameEnded = false;
        let animationId;

        let player = { x: W / 2 - 25, y: H - 50, w: 50, h: 20, speed: 5 };
        let bullets = [];
        let enemies = [];
        let enemyDir = 1;
        let keys = {};

        const initEnemies = () => {
            enemies = [];
            for (let row = 0; row < 4; row++) {
                for (let col = 0; col < 10; col++) {
                    enemies.push({ x: 50 + col * 60, y: 50 + row * 50, w: 30, h: 20, alive: true });
                }
            }
        };

        const drawRect = (x, y, w, h, color) => {
            ctx.fillStyle = color;
            ctx.fillRect(x, y, w, h);
        };

        const update = () => {
            if (!isStarted || gameEnded) return;

            // Move player
            if (keys['ArrowLeft'] && player.x > 0) player.x -= player.speed;
            if (keys['ArrowRight'] && player.x + player.w < W) player.x += player.speed;

            // Move bullets
            for (let i = bullets.length - 1; i >= 0; i--) {
                bullets[i].y -= bullets[i].speed;
                if (bullets[i].y < 0) bullets.splice(i, 1);
            }

            // Move enemies
            let hitWall = false;
            enemies.forEach(e => {
                if (!e.alive) return;
                e.x += enemyDir * 1;
                if (e.x <= 0 || e.x + e.w >= W) hitWall = true;
            });

            if (hitWall) {
                enemyDir *= -1;
                enemies.forEach(e => { if (e.alive) e.y += 20; });
            }

            // Collisions
            for (let i = bullets.length - 1; i >= 0; i--) {
                let b = bullets[i];
                for (let j = 0; j < enemies.length; j++) {
                    let e = enemies[j];
                    if (e.alive && b.x > e.x && b.x < e.x + e.w && b.y > e.y && b.y < e.y + e.h) {
                        e.alive = false;
                        bullets.splice(i, 1);
                        pScore += 20;
                        setScore(pScore);
                        playTone(150, 'square', 0.1, true); // explosion
                        break;
                    }
                }
            }

            // Win or Lose
            let allDead = true;
            enemies.forEach(e => {
                if (e.alive) {
                    allDead = false;
                    if (e.y + e.h >= player.y) {
                        gameEnded = true; // Invaded
                        playTone(50, 'sawtooth', 1, true);
                    }
                }
            });

            if (allDead && enemies.length > 0) {
                // Next wave
                initEnemies();
                playTone(400, 'sine', 0.5);
            }

            draw();
            animationId = requestAnimationFrame(update);
        };

        const draw = () => {
            ctx.fillStyle = '#0a0a0a';
            ctx.fillRect(0, 0, W, H);

            // Draw player
            ctx.font = '40px Arial';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.fillText('🗼', player.x, player.y - 15);

            // Draw bullets
            bullets.forEach(b => drawRect(b.x, b.y, b.w, b.h, '#00ffff'));

            // Draw enemies
            ctx.font = '30px Arial';
            enemies.forEach(e => {
                if (e.alive) ctx.fillText('🛸', e.x, e.y);
            });

            if (!isStarted) {
                ctx.fillStyle = 'rgba(0,0,0,0.8)';
                ctx.fillRect(0, 0, W, H);
                ctx.fillStyle = '#00ffff';
                ctx.font = '30px "Courier New", Courier, monospace';
                ctx.textAlign = 'center';
                ctx.fillText("DEFENSOR DEL FARO LS", W / 2, H / 2 - 40);
                ctx.fillStyle = '#fff';
                ctx.font = '20px "Courier New", Courier, monospace';
                ctx.fillText("PRESIONA ESPACIO PARA INICIAR", W / 2, H / 2 + 20);
                ctx.fillText("FLECHAS PARA MOVER, ESPACIO PARA DISPARAR", W / 2, H / 2 + 60);
            } else if (gameEnded) {
                ctx.fillStyle = 'rgba(0,0,0,0.8)';
                ctx.fillRect(0, 0, W, H);
                ctx.fillStyle = '#ef4444';
                ctx.font = '40px "Courier New", Courier, monospace';
                ctx.textAlign = 'center';
                ctx.fillText("LA CIUDAD FUE INVADIDA", W / 2, H / 2);
                ctx.fillStyle = '#fff';
                ctx.font = '20px "Courier New", Courier, monospace';
                ctx.fillText("PRESIONA ESPACIO PARA REINTENTAR", W / 2, H / 2 + 50);
            }
        };

        const handleKeyDown = (e) => {
            if (!audioCtxRef.current) {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                audioCtxRef.current = new AudioContext();
            }

            keys[e.key] = true;

            if (e.key === ' ') {
                e.preventDefault();
                if (!isStarted || gameEnded) {
                    // Start/Restart
                    initEnemies();
                    pScore = 0;
                    setScore(0);
                    player.x = W / 2 - 25;
                    bullets = [];
                    enemyDir = 1;
                    isStarted = true;
                    gameEnded = false;
                    playTone(800, 'square', 0.2); // Start
                    if (!animationId) animationId = requestAnimationFrame(update);
                } else {
                    // Shoot
                    if (bullets.length < 3) { // Max 3 bullets
                        bullets.push({ x: player.x + 15, y: player.y - 10, w: 4, h: 15, speed: 7 });
                        playTone(600, 'square', 0.1, true); // Pew
                    }
                }
            } else if (e.key.startsWith('Arrow')) {
                e.preventDefault();
            }
        };

        const handleKeyUp = (e) => { keys[e.key] = false; };

        window.addEventListener('keydown', handleKeyDown, { passive: false });
        window.addEventListener('keyup', handleKeyUp, { passive: false });

        draw();

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            cancelAnimationFrame(animationId);
            gameEnded = true;
        };
    }, []);

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#000', filter: `brightness(${brightness}%) contrast(${contrast}%)` }}>
            <div style={{ padding: '0.5rem 2rem', color: '#00ffff', fontFamily: '"Courier New", Courier, monospace', fontSize: '2rem', fontWeight: 'bold' }}>
                SCORE: {score.toString().padStart(5, '0')}
            </div>
            <canvas ref={canvasRef} style={{ flex: 1, width: '100%', maxWidth: '800px', maxHeight: '600px', objectFit: 'contain', minHeight: 0 }} />
        </div>
    );
}
