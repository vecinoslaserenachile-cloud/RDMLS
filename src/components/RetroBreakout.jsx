import React, { useEffect, useRef } from 'react';

export default function RetroBreakout({ brightness, contrast }) {
    const canvasRef = useRef(null);
    const requestRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const W = canvas.width = 600;
        const H = canvas.height = 800;

        let paddle = { x: W / 2 - 60, y: H - 40, w: 120, h: 20, speed: 8 };
        let ball = { x: W / 2, y: H / 2 + 100, r: 8, dx: 4, dy: -6 };
        let bricks = [];
        const rows = 8, cols = 6;
        const brickW = 80, brickH = 25, padding = 12, offset = 35;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                bricks.push({
                    x: c * (brickW + padding) + offset,
                    y: r * (brickH + padding) + offset,
                    status: 1,
                    color: `hsl(${r * 50}, 100%, 50%)`
                });
            }
        }

        let leftPressed = false, rightPressed = false, spacePressed = false;
        let score = 0, gameStarted = false, gameOver = false, won = false;

        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'A' || e.key === 'a') leftPressed = true;
            if (e.key === 'ArrowRight' || e.key === 'D' || e.key === 'd') rightPressed = true;
            if (e.key === ' ') {
                if (!gameStarted || gameOver || won) {
                    gameStarted = true; gameOver = false; won = false;
                    score = 0; bricks.forEach(b => b.status = 1);
                    paddle.x = W / 2 - 60; ball = { x: W / 2, y: H / 2 + 100, r: 8, dx: 5, dy: -6 };
                }
            }
        };
        const handleKeyUp = (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'A' || e.key === 'a') leftPressed = false;
            if (e.key === 'ArrowRight' || e.key === 'D' || e.key === 'd') rightPressed = false;
        };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        const update = () => {
            if (!gameStarted || gameOver || won) return;

            if (leftPressed && paddle.x > 0) paddle.x -= paddle.speed;
            if (rightPressed && paddle.x < W - paddle.w) paddle.x += paddle.speed;

            ball.x += ball.dx; ball.y += ball.dy;

            if (ball.x - ball.r < 0 || ball.x + ball.r > W) ball.dx *= -1;
            if (ball.y - ball.r < 0) ball.dy *= -1;
            else if (ball.y + ball.r > H) gameOver = true;

            if (ball.y + ball.r > paddle.y && ball.x > paddle.x && ball.x < paddle.x + paddle.w) {
                ball.dy = -Math.abs(ball.dy);
                ball.dx = ((ball.x - (paddle.x + paddle.w / 2)) / (paddle.w / 2)) * 6;
            }

            let activeBricks = 0;
            bricks.forEach(b => {
                if (b.status === 1) {
                    activeBricks++;
                    if (ball.x > b.x && ball.x < b.x + brickW && ball.y > b.y && ball.y < b.y + brickH) {
                        ball.dy *= -1;
                        b.status = 0;
                        score += 10;
                    }
                }
            });
            if (activeBricks === 0) won = true;
        };

        const draw = () => {
            ctx.fillStyle = '#111'; ctx.fillRect(0, 0, W, H);

            ctx.fillStyle = '#4ade80';
            ctx.shadowBlur = 10; ctx.shadowColor = '#4ade80';
            ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);
            ctx.shadowBlur = 0;
            ctx.font = '24px Arial';
            ctx.fillText('👷', paddle.x + paddle.w/2 - 12, paddle.y - 5);

            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
            ctx.fill();

            bricks.forEach(b => {
                if (b.status === 1) {
                    ctx.fillStyle = b.color;
                    ctx.fillRect(b.x, b.y, brickW, brickH);
                }
            });

            ctx.fillStyle = 'white'; ctx.font = '24px monospace';
            ctx.fillText(`SCORE: ${score}`, 20, 30);

            if (!gameStarted || gameOver || won) {
                ctx.textAlign = 'center';
                ctx.fillStyle = won ? '#4ade80' : gameOver ? '#ef4444' : '#fff';
                ctx.font = '40px monospace';
                ctx.fillText(won ? '¡GANASTE!' : gameOver ? 'GAME OVER' : 'SERENITO ALBAÑIL', W / 2, H / 2);
                ctx.font = '20px monospace';
                ctx.fillText('Precione ESPACIO/A para Jugar', W / 2, H / 2 + 40);
            }
        };

        const loop = () => { update(); draw(); requestRef.current = requestAnimationFrame(loop); };
        loop();

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 5, background: 'black' }}>
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%', objectFit: 'contain', filter: `brightness(${brightness}%) contrast(${contrast}%) blur(0.5px)` }} />
        </div>
    );
}
