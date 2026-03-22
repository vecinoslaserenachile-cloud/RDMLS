import React, { useState, useEffect, useRef } from 'react';
import { Trophy, RefreshCcw, ArrowLeft } from 'lucide-react';

export default function CubeDash({ onExit }) {
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [level, setLevel] = useState(1);

    // Game State constants
    const TILE_SIZE = 32;
    const GRID_WIDTH = 20;
    const GRID_HEIGHT = 15;
    
    // Tile types: 0: empty, 1: dirt, 2: wall, 3: diamond, 4: goal
    const grid = useRef(Array(GRID_HEIGHT).fill().map(() => Array(GRID_WIDTH).fill(1)));
    const player = useRef({ x: 1, y: 1 });
    const enemies = useRef([]);
    const rooms = useRef([]); // Tracking closed areas

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Initialize Level
        const initLevel = () => {
            grid.current = Array(GRID_HEIGHT).fill().map(() => Array(GRID_WIDTH).fill(1));
            // Basic walls around
            for(let i=0; i<GRID_WIDTH; i++) { grid.current[0][i] = 2; grid.current[GRID_HEIGHT-1][i] = 2; }
            for(let i=0; i<GRID_HEIGHT; i++) { grid.current[i][0] = 2; grid.current[i][GRID_WIDTH-1] = 2; }
            
            // Random diamonds
            for(let i=0; i<5; i++) {
                let rx = Math.floor(Math.random() * (GRID_WIDTH-2)) + 1;
                let ry = Math.floor(Math.random() * (GRID_HEIGHT-2)) + 1;
                grid.current[ry][rx] = 3;
            }

            // Initialize Enemies (The Faces)
            enemies.current = [
                { x: 10, y: 7, dx: 1, dy: 0, angry: false },
                { x: 5, y: 12, dx: 0, dy: -1, angry: false }
            ];
            
            player.current = { x: 1, y: 1 };
            grid.current[1][1] = 0;
            setGameOver(false);
        };

        const draw = () => {
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw Grid
            for (let y = 0; y < GRID_HEIGHT; y++) {
                for (let x = 0; x < GRID_WIDTH; x++) {
                    const tile = grid.current[y][x];
                    if (tile === 1) { // Dirt
                        ctx.strokeStyle = '#333';
                        ctx.strokeRect(x * TILE_SIZE + 4, y * TILE_SIZE + 4, TILE_SIZE - 8, TILE_SIZE - 8);
                    } else if (tile === 2) { // Wall
                        ctx.strokeStyle = '#00f';
                        ctx.lineWidth = 2;
                        ctx.strokeRect(x * TILE_SIZE + 2, y * TILE_SIZE + 2, TILE_SIZE - 4, TILE_SIZE - 4);
                        ctx.lineWidth = 1;
                    } else if (tile === 3) { // Diamond
                        ctx.fillStyle = '#0ff';
                        ctx.beginPath();
                        ctx.moveTo(x * TILE_SIZE + TILE_SIZE/2, y * TILE_SIZE + 4);
                        ctx.lineTo(x * TILE_SIZE + TILE_SIZE - 4, y * TILE_SIZE + TILE_SIZE/2);
                        ctx.lineTo(x * TILE_SIZE + TILE_SIZE/2, y * TILE_SIZE + TILE_SIZE - 4);
                        ctx.lineTo(x * TILE_SIZE + 4, y * TILE_SIZE + TILE_SIZE/2);
                        ctx.fill();
                    }
                }
            }

            // Draw Player (Stick Figure Style)
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            const px = player.current.x * TILE_SIZE + TILE_SIZE / 2;
            const py = player.current.y * TILE_SIZE + TILE_SIZE / 2;
            ctx.beginPath();
            ctx.arc(px, py - 4, 4, 0, Math.PI * 2); // Head
            ctx.moveTo(px, py); ctx.lineTo(px, py + 8); // Body
            ctx.moveTo(px, py + 2); ctx.lineTo(px - 6, py + 6); // Arm L
            ctx.moveTo(px, py + 2); ctx.lineTo(px + 6, py + 6); // Arm R
            ctx.moveTo(px, py + 8); ctx.lineTo(px - 4, py + 14); // Leg L
            ctx.moveTo(px, py + 8); ctx.lineTo(px + 4, py + 14); // Leg R
            ctx.stroke();

            // Draw Enemies (The Faces)
            enemies.current.forEach(e => {
                const ex = e.x * TILE_SIZE + TILE_SIZE / 2;
                const ey = e.y * TILE_SIZE + TILE_SIZE / 2;
                ctx.fillStyle = e.angry ? '#f00' : '#ff0';
                ctx.beginPath();
                ctx.arc(ex, ey, 10, 0, Math.PI * 2);
                ctx.fill();
                // Face details
                ctx.fillStyle = '#000';
                ctx.fillRect(ex - 4, ey - 4, 2, 2);
                ctx.fillRect(ex + 2, ey - 4, 2, 2);
                if (e.angry) {
                    ctx.fillRect(ex - 3, ey + 4, 6, 2); // Angry mouth
                } else {
                    ctx.beginPath(); ctx.arc(ex, ey + 2, 4, 0, Math.PI); ctx.stroke(); // Happy mouth
                }
            });

            if (gameOver) {
                ctx.fillStyle = 'rgba(0,0,0,0.8)';
                ctx.fillRect(0,0,canvas.width, canvas.height);
                ctx.fillStyle = '#f00';
                ctx.font = '24px monospace';
                ctx.textAlign = 'center';
                ctx.fillText('GAME OVER', canvas.width/2, canvas.height/2);
                ctx.fillStyle = '#fff';
                ctx.font = '14px monospace';
                ctx.fillText('PULSA R PARA REINTENTAR', canvas.width/2, canvas.height/2 + 40);
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        const handleKeyDown = (e) => {
            if (gameOver && e.key.toLowerCase() === 'r') { initLevel(); return; }
            
            let nx = player.current.x;
            let ny = player.current.y;

            if (e.key === 'ArrowUp') ny--;
            if (e.key === 'ArrowDown') ny++;
            if (e.key === 'ArrowLeft') nx--;
            if (e.key === 'ArrowRight') nx++;

            if (nx >=0 && nx < GRID_WIDTH && ny >=0 && ny < GRID_HEIGHT) {
                const target = grid.current[ny][nx];
                if (target !== 2) { // Not a wall
                    if (target === 1) { // Dirt
                        grid.current[ny][nx] = 0;
                        // Sound effect placeholder
                    } else if (target === 3) { // Diamond
                        grid.current[ny][nx] = 0;
                        setScore(s => s + 100);
                    }
                    player.current.x = nx;
                    player.current.y = ny;
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        initLevel();
        draw();

        // Enemy movement loop
        const enemyInterval = setInterval(() => {
            if (gameOver) return;
            enemies.current.forEach(e => {
                let nx = e.x + e.dx;
                let ny = e.y + e.dy;
                
                if (nx < 0 || nx >= GRID_WIDTH || ny < 0 || ny >= GRID_HEIGHT || grid.current[ny][nx] !== 0) {
                    // Change direction
                    const dirs = [{dx:1,dy:0},{dx:-1,dy:0},{dx:0,dy:1},{dx:0,dy:-1}];
                    const d = dirs[Math.floor(Math.random() * dirs.length)];
                    e.dx = d.dx;
                    e.dy = d.dy;
                } else {
                    e.x = nx;
                    e.y = ny;
                }

                // Collision with player
                if (Math.floor(e.x) === player.current.x && Math.floor(e.y) === player.current.y) {
                    setGameOver(true);
                }
            });
        }, 200);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('keydown', handleKeyDown);
            clearInterval(enemyInterval);
        };
    }, [level, gameOver]);

    return (
        <div style={{
            width: '100%',
            height: '100%',
            background: '#000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontFamily: 'monospace'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '640px', padding: '0.5rem' }}>
                <span>SCORE: {score.toString().padStart(6, '0')}</span>
                <span>LEVEL: {level}</span>
                <button onClick={onExit} style={{ background: 'transparent', border: 'none', color: '#ff0', cursor: 'pointer' }}>[EXIT]</button>
            </div>
            
            <canvas 
                ref={canvasRef} 
                width={GRID_WIDTH * TILE_SIZE} 
                height={GRID_HEIGHT * TILE_SIZE}
                style={{ border: '2px solid #333', boxShadow: '0 0 20px rgba(0, 255, 255, 0.1)' }}
            />

            <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#666', textAlign: 'center' }}>
                LAS CARAS TE OBSERVAN. CIERRA LAS HABITACIONES PARA SOBREVIVIR.
            </div>
        </div>
    );
}
