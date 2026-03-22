import React, { useEffect, useRef, useState } from 'react';

export default function RetroPacman({ brightness = 100, contrast = 100 }) {
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [pelletsCount, setPelletsCount] = useState(0);
    const heroImg = useRef(new Image());

    useEffect(() => {
        heroImg.current.src = '/serenito.png';
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const W = 400;
        const H = 400;
        canvas.width = W;
        canvas.height = H;

        let animationFrameId;
        const TILE = 20;

        // 1: Wall, 0: Vitamin (Pellet), 3: Papaya (Power Pellet), 2: Empty
        const maze = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1],
            [1,3,1,1,0,1,1,1,0,1,1,0,1,1,1,0,1,1,3,1],
            [1,0,1,1,0,1,1,1,0,1,1,0,1,1,1,0,1,1,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,1,1,0,1,0,1,1,1,1,1,1,0,1,0,1,1,0,1],
            [1,0,0,0,0,1,0,0,0,1,1,0,0,0,1,0,0,0,0,1],
            [1,1,1,1,0,1,1,1,2,1,1,2,1,1,1,0,1,1,1,1],
            [2,2,2,1,0,1,2,2,2,2,2,2,2,2,1,0,1,2,2,2],
            [1,1,1,1,0,1,2,1,1,2,2,1,1,2,1,0,1,1,1,1],
            [2,2,2,2,0,2,2,1,2,2,2,2,1,2,2,0,2,2,2,2],
            [1,1,1,1,0,1,2,1,1,1,1,1,1,2,1,0,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1], // Mas caminos
            [1,3,1,1,0,1,1,1,0,1,1,0,1,1,1,0,1,1,3,1],
            [1,0,0,1,0,0,0,3,0,1,1,0,3,0,0,0,1,0,0,1],
            [1,1,0,1,0,1,0,1,1,1,1,1,1,0,1,0,1,0,1,1],
            [1,0,0,0,0,1,0,0,0,1,1,0,0,0,1,0,0,0,0,1],
            [1,3,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,3,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ];

        let pellets = [];
        for (let y = 0; y < maze.length; y++) {
            for (let x = 0; x < maze[y].length; x++) {
                if (maze[y][x] === 0 || maze[y][x] === 3) {
                    pellets.push({ x, y, type: maze[y][x] });
                }
            }
        }
        setPelletsCount(pellets.length);

        let pacman = { x: 1, y: 1, vx: 0, vy: 0, nextVx: 0, nextVy: 0, angle: 0, powerTime: 0 };
        let ghosts = [
            { x: 9, y: 9, emoji: '🧊', vx: 1, vy: 0, vulnerable: false }, // Hielo
            { x: 10, y: 9, emoji: '❄️', vx: -1, vy: 0, vulnerable: false }, // Frio
            { x: 9, y: 10, emoji: '🌧️', vx: 1, vy: 0, vulnerable: false }, // Lluvia
            { x: 10, y: 10, emoji: '🦹', vx: -1, vy: 0, vulnerable: false } // Ladron
        ];

        const handleKeyDown = (e) => {
            if (e.key === 'ArrowUp') { pacman.nextVx = 0; pacman.nextVy = -1; }
            if (e.key === 'ArrowDown') { pacman.nextVx = 0; pacman.nextVy = 1; }
            if (e.key === 'ArrowLeft') { pacman.nextVx = -1; pacman.nextVy = 0; }
            if (e.key === 'ArrowRight') { pacman.nextVx = 1; pacman.nextVy = 0; }
        };
        window.addEventListener('keydown', handleKeyDown);

        const canMove = (x, y, vx, vy) => {
            let nextX = x + vx;
            let nextY = y + vy;
            if (nextX < 0) nextX = 19;
            if (nextX > 19) nextX = 0;
            if (nextY < 0 || nextY >= maze.length) return false;
            return maze[nextY][nextX] !== 1;
        };

        let frameCount = 0;

        const update = () => {
            frameCount++;
            if (gameOver) return;

            if (frameCount % 12 === 0) {
                // Try to change direction
                if (canMove(pacman.x, pacman.y, pacman.nextVx, pacman.nextVy)) {
                    pacman.vx = pacman.nextVx;
                    pacman.vy = pacman.nextVy;
                }

                // Move Pacman
                if (canMove(pacman.x, pacman.y, pacman.vx, pacman.vy)) {
                    pacman.x += pacman.vx;
                    pacman.y += pacman.vy;
                }

                // Wrap around
                if (pacman.x < 0) pacman.x = 19;
                if (pacman.x > 19) pacman.x = 0;

                // Move Ghosts
                ghosts.forEach(g => {
                    if (frameCount % 18 === 0 || !canMove(g.x, g.y, g.vx, g.vy)) {
                        const dirs = [{ vx: 1, vy: 0 }, { vx: -1, vy: 0 }, { vx: 0, vy: 1 }, { vx: 0, vy: -1 }];
                        const available = dirs.filter(d => canMove(g.x, g.y, d.vx, d.vy));
                        if (available.length > 0) {
                            const d = available[Math.floor(Math.random() * available.length)];
                            g.vx = d.vx;
                            g.vy = d.vy;
                        }
                    }
                    g.x += g.vx;
                    g.y += g.vy;

                    if (g.x < 0) g.x = 19;
                    if (g.x > 19) g.x = 0;

                    // Collision
                    if (g.x === pacman.x && g.y === pacman.y) {
                        if (pacman.powerTime > 0) {
                            g.x = 9; g.y = 9; // Reset ghost
                            setScore(s => s + 100);
                        } else {
                            setGameOver(true);
                        }
                    }
                });

                // Eat pellet
                const pIdx = pellets.findIndex(p => p.x === pacman.x && p.y === pacman.y);
                if (pIdx > -1) {
                    const p = pellets[pIdx];
                    if (p.type === 3) {
                        pacman.powerTime = 150;
                        setScore(s => s + 50);
                    } else {
                        setScore(s => s + 10);
                    }
                    pellets.splice(pIdx, 1);
                    setPelletsCount(pellets.length);
                }

                if (pacman.powerTime > 0) pacman.powerTime--;
                if (pellets.length === 0) setGameOver(true);
            }

            draw();
            animationFrameId = requestAnimationFrame(update);
        };

        const draw = () => {
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, W, H);

            // Draw Maze
            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth = 2;
            for (let y = 0; y < maze.length; y++) {
                for (let x = 0; x < maze[y].length; x++) {
                    if (maze[y][x] === 1) {
                        ctx.fillStyle = '#1e3a8a';
                        ctx.fillRect(x * TILE, y * TILE, TILE, TILE);
                        ctx.strokeRect(x * TILE, y * TILE, TILE, TILE);
                    }
                }
            }

            // Draw Pellets
            pellets.forEach(p => {
                ctx.fillStyle = p.type === 3 ? '#fb923c' : '#4ade80'; // Papaya or Vitamin
                ctx.beginPath();
                ctx.arc(p.x * TILE + TILE / 2, p.y * TILE + TILE / 2, p.type === 3 ? 6: 3, 0, Math.PI * 2);
                ctx.fill();
            });

            // Draw Pacman (Serenito)
            ctx.save();
            if (heroImg.current.complete) {
                ctx.drawImage(heroImg.current, pacman.x * TILE + 2, pacman.y * TILE + 2, TILE - 4, TILE - 4);
                if (pacman.powerTime > 50 || (pacman.powerTime > 0 && frameCount % 2 === 0)) {
                    ctx.strokeStyle = '#fff';
                    ctx.beginPath();
                    ctx.arc(pacman.x * TILE + TILE/2, pacman.y * TILE + TILE/2, TILE/2, 0, Math.PI*2);
                    ctx.stroke();
                }
            } else {
                ctx.fillStyle = '#ffff00';
                ctx.beginPath();
                ctx.arc(pacman.x * TILE + TILE / 2, pacman.y * TILE + TILE / 2, TILE / 2 - 2, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();

            // Draw Enemies
            ctx.font = '16px Arial';
            ghosts.forEach(g => {
                if (pacman.powerTime > 0) {
                    // Vulnerable
                    ctx.fillStyle = (pacman.powerTime < 50 && frameCount % 4 === 0) ? '#fff' : '#3b82f6';
                    ctx.beginPath();
                    ctx.arc(g.x * TILE + TILE / 2, g.y * TILE + TILE / 2, TILE / 2 - 2, Math.PI, 0);
                    ctx.lineTo(g.x * TILE + TILE - 2, g.y * TILE + TILE - 2);
                    ctx.lineTo(g.x * TILE + 2, g.y * TILE + TILE - 2);
                    ctx.fill();
                } else {
                    // Normal Emoji Enemy
                    ctx.fillText(g.emoji, g.x * TILE + 2, g.y * TILE + TILE - 4);
                }
            });
        };

        update();

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            cancelAnimationFrame(animationFrameId);
        };
    }, [gameOver]);

    return (
        <div style={{ textAlign: 'center', filter: `brightness(${brightness}%) contrast(${contrast}%)` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '400px', margin: '0 auto', fontFamily: 'monospace', color: '#ffff00', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                <span>VECIMAN - SCORE: {score}</span>
                <span style={{ color: '#fb923c' }}>PAPAYAS: {pelletsCount}</span>
            </div>
            <canvas ref={canvasRef} style={{ flex: 1, width: '100%', height: '100%', maxHeight: '500px', objectFit: 'contain', border: '4px solid #3b82f6', borderRadius: '10px', boxShadow: '0 0 20px rgba(51, 102, 255, 0.5)', background: '#000', minHeight: 0 }} />
            {gameOver && (
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#ff0000', fontSize: '2.5rem', fontFamily: 'monospace', fontWeight: 'bold', textShadow: '0 0 10px #ff0000', background: 'rgba(0,0,0,0.9)', padding: '2rem', border: '5px solid #ff0000', borderRadius: '20px', zIndex: 100 }}>
                    {pelletsCount === 0 ? '¡CIUDAD LIMPIA!' : 'GAME OVER'}
                    <p style={{ fontSize: '1rem', color: 'white', cursor: 'pointer', marginTop: '1rem' }} onClick={() => { setGameOver(false); setScore(0); }}>CLICK PARA REINICIAR</p>
                </div>
            )}
        </div>
    );
}
