import React, { useEffect, useRef, useState } from 'react';

export default function RetroMoonPatrol({ brightness = 100, contrast = 100 }) {
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const W = 600;
        const H = 300;
        canvas.width = W;
        canvas.height = H;

        let animationFrameId;
        const GROUND = H - 50;

        let buggy = { x: 50, y: GROUND - 30, vy: 0, isJumping: false, width: 40, height: 20 };
        let obstacles = [];
        let baseSpeed = 4;
        let speedMult = 1;
        let pScore = 0;

        const spawnObstacle = () => {
            if (Math.random() < 0.02) {
                obstacles.push({ x: W, y: Math.random() > 0.5 ? GROUND - 20 : Math.random() * (H / 2) + 20, width: 20, height: 20, type: Math.random() > 0.5 ? 'rock' : 'cloud' });
            }
        };

        const handleKeyDown = (e) => {
            if ((e.key === 'ArrowUp' || e.key === ' ') && !buggy.isJumping) {
                buggy.vy = -12;
                buggy.isJumping = true;
            }
            if (e.key === 'ArrowRight') speedMult = 2; // Acelerar
            if (e.key === 'ArrowLeft') speedMult = 0.5; // Frenar
        };

        const handleKeyUp = (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') speedMult = 1;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        const update = () => {
            if (gameOver) return;

            pScore += speedMult;
            if (Math.floor(pScore) % 10 === 0) setScore(s => s + 1);

            if (pScore % 500 === 0) baseSpeed += 0.5;

            // Buggy Physics
            buggy.vy += 0.5; // gravity
            buggy.y += buggy.vy;

            if (buggy.y > GROUND - buggy.height) {
                buggy.y = GROUND - buggy.height;
                buggy.vy = 0;
                buggy.isJumping = false;
            }

            // Obstacles
            spawnObstacle();
            obstacles.forEach(obs => {
                obs.x -= (baseSpeed * speedMult);
            });
            obstacles = obstacles.filter(o => o.x + o.width > 0);

            // Collision
            obstacles.forEach(o => {
                // Sólo chocar con rocas en el suelo
                if (o.type === 'rock') {
                    if (
                        buggy.x < o.x + o.width - 5 &&
                    buggy.x + buggy.width > o.x &&
                        buggy.y < o.y + o.height &&
                        buggy.y + buggy.height > o.y + 10
                    ) {
                        setGameOver(true);
                    }
                }
            });

            draw();
            animationFrameId = requestAnimationFrame(update);
        };

        const draw = () => {
            // Background
            ctx.fillStyle = '#0a0a2a';
            ctx.fillRect(0, 0, W, H);

            // Stars
            ctx.fillStyle = '#fff';
            for (let i = 0; i < 50; i++) {
                ctx.beginPath();
                ctx.arc((i * 123) % W, (i * 45) % (H - 50), 1, 0, Math.PI * 2);
                ctx.fill();
            }

            // Mountains
            ctx.fillStyle = '#1e1e40';
            ctx.beginPath();
            ctx.moveTo(0, H - 50);
            for (let i = 0; i <= W; i += 30) {
                ctx.lineTo(i, (H - 50) - 20 - Math.sin((i + pScore) / 50) * 20);
            }
            ctx.lineTo(W, H);
            ctx.lineTo(0, H);
            ctx.fill();

            // Ground
            ctx.fillStyle = '#b8860b';
            ctx.fillRect(0, GROUND, W, 50);

            // Buggy (Flipped to face right)
            ctx.save();
            ctx.scale(-1, 1);
            ctx.font = '40px Arial';
            ctx.fillText('🚙', -(buggy.x + buggy.width), buggy.y + buggy.height);
            ctx.restore();

            // Obstacles
            ctx.font = '30px Arial';
            obstacles.forEach(o => {
                if (o.type === 'rock') {
                    ctx.fillText('🪨', o.x, o.y + 20); // Ajuste y para render
                } else {
                    ctx.fillText('☁️', o.x, o.y);
                }
            });
        };

        update();

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            cancelAnimationFrame(animationFrameId);
        };
    }, [gameOver]);

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', filter: `brightness(${brightness}%) contrast(${contrast}%)` }}>
            <div style={{ width: '100%', maxWidth: '600px', fontFamily: 'monospace', color: '#ffb8ff', fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', padding: '0 1rem' }}>
                <span>SCORE: {score}</span>
                <span>PASEO NOCTURNO</span>
            </div>
            <canvas
                ref={canvasRef}
                style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    maxHeight: '400px',
                    objectFit: 'contain',
                    border: '4px solid #6633ff',
                    borderRadius: '10px',
                    boxShadow: '0 0 20px rgba(102, 51, 255, 0.5)',
                    imageRendering: 'pixelated',
                    background: '#0a0a2a',
                    minHeight: 0
                }}
            />
            {gameOver && (
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#ff0000', fontSize: '3rem', fontFamily: 'monospace', fontWeight: 'bold', textShadow: '0 0 10px #ff0000', background: 'rgba(0,0,0,0.8)', padding: '2rem', border: '2px solid #ff0000', borderRadius: '10px' }}>
                    GAME OVER
                    <p style={{ fontSize: '1rem', color: 'white', cursor: 'pointer', marginTop: '1rem' }} onClick={() => { setGameOver(false); setScore(0); }}>CLICK PARA REINICIAR</p>
                </div>
            )}
            <p style={{ color: '#aaa', marginTop: '1rem', fontFamily: 'monospace' }}>Presiona ARRIBA o ESPACIO para saltar los cráteres.</p>
        </div>
    );
}
