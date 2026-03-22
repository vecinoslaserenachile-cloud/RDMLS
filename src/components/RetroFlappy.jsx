import React, { useEffect, useRef } from 'react';

export default function RetroFlappy({ brightness, contrast }) {
    const canvasRef = useRef(null);
    const requestRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const W = canvas.width = 600;
        const H = canvas.height = 800;

        let bird = { x: 150, y: H / 2, velocity: 0, gravity: 0.5, jump: -8, size: 15 };
        let pipes = [];
        let score = 0, frameCount = 0, gameStarted = false, gameOver = false;

        const handleKeyDown = (e) => {
            if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w') {
                e.preventDefault();
                if (!gameStarted || gameOver) {
                    gameStarted = true; gameOver = false; score = 0; frameCount = 0;
                    bird.y = H / 2; bird.velocity = 0; pipes = [];
                } else {
                    bird.velocity = bird.jump;
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        const update = () => {
            if (!gameStarted || gameOver) return;
            frameCount++;

            bird.velocity += bird.gravity;
            bird.y += bird.velocity;

            if (frameCount % 100 === 0) {
                let gap = 150;
                let topH = Math.random() * (H - gap - 100) + 50;
                pipes.push({ x: W, w: 60, topH, bottomY: topH + gap, passed: false });
            }

            for (let i = pipes.length - 1; i >= 0; i--) {
                pipes[i].x -= 4;
                if (pipes[i].x + pipes[i].w < 0) pipes.splice(i, 1);

                // score
                if (!pipes[i].passed && pipes[i].x + pipes[i].w < bird.x) {
                    pipes[i].passed = true; score++;
                }

                // collision
                if (bird.x + bird.size > pipes[i].x && bird.x - bird.size < pipes[i].x + pipes[i].w) {
                    if (bird.y - bird.size < pipes[i].topH || bird.y + bird.size > pipes[i].bottomY) {
                        gameOver = true;
                    }
                }
            }
            if (bird.y + bird.size >= H || bird.y - bird.size <= 0) gameOver = true;
        };

        const draw = () => {
            // Fondo Ciudad, sol, nubes
            const grad = ctx.createLinearGradient(0, 0, 0, H);
            grad.addColorStop(0, '#38bdf8'); grad.addColorStop(1, '#86efac');
            ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H);
            
            ctx.font = '60px Arial';
            ctx.fillText('☀️', 100, 100);
            ctx.font = '40px Arial';
            ctx.fillText('☁️', 200 + ((frameCount*0.5) % 400), 150);
            ctx.fillText('☁️', 400 - ((frameCount*0.3) % 200), 200);
            ctx.fillText('⛰️', W/2 - 20, H - 100);
            ctx.fillText('⛰️', W/2 + 60, H - 80);
            ctx.fillText('🐦', (frameCount*2) % (W + 50), 300);

            // Avioneta / Serenito planeador
            ctx.font = '40px Arial';
            ctx.save();
            ctx.translate(bird.x, bird.y);
            ctx.rotate(Math.min(Math.PI / 4, Math.max(-Math.PI / 4, (bird.velocity * 0.1))));
            ctx.fillText('🛩️', -20, 10);
            ctx.restore();

            // Pipes (Estructuras de ciudad)
            pipes.forEach(p => {
                const gradPipe = ctx.createLinearGradient(p.x, 0, p.x + p.w, 0);
                gradPipe.addColorStop(0, '#9ca3af'); gradPipe.addColorStop(1, '#6b7280');
                ctx.fillStyle = gradPipe;
                ctx.fillRect(p.x, 0, p.w, p.topH);
                ctx.fillRect(p.x, p.bottomY, p.w, H - p.bottomY);
                // Bordes coloniales
                ctx.fillStyle = '#4b5563';
                ctx.fillRect(p.x - 5, p.topH - 20, p.w + 10, 20);
                ctx.fillRect(p.x - 5, p.bottomY, p.w + 10, 20);
            });

            ctx.fillStyle = 'black'; ctx.font = '30px monospace'; ctx.textAlign = 'left';
            ctx.fillText(`SCORE: ${score}`, 20, 40);

            if (!gameStarted || gameOver) {
                ctx.textAlign = 'center';
                ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.fillRect(0, 0, W, H);
                ctx.fillStyle = 'white'; ctx.font = '40px monospace';
                ctx.fillText(gameOver ? 'GAME OVER' : 'SERENITO PLANEADOR', W / 2, H / 2);
                ctx.font = '20px monospace';
                ctx.fillText('Pulsa ESPACIO/A/ARRIBA para saltar', W / 2, H / 2 + 40);
            }
        };

        const loop = () => { update(); draw(); requestRef.current = requestAnimationFrame(loop); };
        loop();

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000', filter: `brightness(${brightness}%) contrast(${contrast}%)` }} />;
}
