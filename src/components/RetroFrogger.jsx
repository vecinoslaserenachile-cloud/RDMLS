import React, { useEffect, useRef } from 'react';

export default function RetroFrogger({ brightness, contrast }) {
    const canvasRef = useRef(null);
    const requestRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const W = canvas.width = 600;
        const H = canvas.height = 800;
        const grid = 50;

        let frog = { x: W / 2 - grid / 2, y: H - grid, size: grid - 10 };
        let cars = [];
        let score = 0, level = 1, gameStarted = false, gameOver = false;

        const initLanes = () => {
            cars = [];
            for (let i = 0; i < 10; i++) {
                let y = H - grid * 2 - (i * grid * 1.2);
                let speed = (Math.random() * 2 + 1 + level * 0.5) * (i % 2 === 0 ? 1 : -1);
                for (let j = 0; j < 3; j++) {
                    cars.push({ x: (j * 300) - 100, y, w: grid * 1.5, h: grid - 10, speed, c: `hsl(${i * 40},100%,50%)` });
                }
            }
        };

        const handleKeyDown = (e) => {
            if (!gameStarted || gameOver) {
                if ([' ', 'ArrowUp', 'w'].includes(e.key)) {
                    gameStarted = true; gameOver = false; score = 0; level = 1; frog.y = H - grid; initLanes();
                }
                return;
            }
            if (['ArrowUp', 'w'].includes(e.key)) { frog.y -= grid; score += 10; }
            if (['ArrowDown', 's'].includes(e.key) && frog.y < H - grid) frog.y += grid;
            if (['ArrowLeft', 'a'].includes(e.key) && frog.x > 0) frog.x -= grid;
            if (['ArrowRight', 'd'].includes(e.key) && frog.x < W - grid) frog.x += grid;
        };
        window.addEventListener('keydown', handleKeyDown);

        const update = () => {
            if (!gameStarted || gameOver) return;

            if (frog.y < grid) {
                level++; frog.y = H - grid; score += 1000; initLanes();
            }

            cars.forEach(c => {
                c.x += c.speed;
                if (c.speed > 0 && c.x > W) c.x = -c.w;
                if (c.speed < 0 && c.x + c.w < 0) c.x = W;

                if (frog.x < c.x + c.w && frog.x + frog.size > c.x && frog.y < c.y + c.h && frog.y + frog.size > c.y) {
                    gameOver = true;
                }
            });
        };

        const draw = () => {
            ctx.fillStyle = '#22c55e'; ctx.fillRect(0, 0, W, H); // Grass
            ctx.fillStyle = '#333'; ctx.fillRect(0, grid * 2, W, H - grid * 4); // Road

            ctx.fillStyle = '#ec4899'; // Frog represents citizen
            ctx.fillRect(frog.x + 5, frog.y + 5, frog.size, frog.size);

            cars.forEach(c => {
                ctx.fillStyle = c.c;
                ctx.fillRect(c.x, c.y + 5, c.w, c.h);
            });

            ctx.fillStyle = '#000'; ctx.font = '24px monospace'; ctx.textAlign = 'left';
            ctx.fillText(`SCORE: ${score} LVL: ${level}`, 10, 30);

            if (!gameStarted || gameOver) {
                ctx.fillStyle = 'rgba(0,0,0,0.6)'; ctx.fillRect(0, 0, W, H);
                ctx.fillStyle = '#fff'; ctx.textAlign = 'center';
                ctx.font = '40px monospace'; ctx.fillText(gameOver ? 'GAME OVER' : 'FROGGER', W / 2, H / 2);
                ctx.font = '20px monospace'; ctx.fillText('Cruza a la parte segura, usa FLECHAS/D-Pad', W / 2, H / 2 + 40);
            }
        };

        const loop = () => { update(); draw(); requestRef.current = requestAnimationFrame(loop); };
        loop();

        return () => { window.removeEventListener('keydown', handleKeyDown); cancelAnimationFrame(requestRef.current); };
    }, []);

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000', filter: `brightness(${brightness}%) contrast(${contrast}%)` }} />;
}
