import React, { useEffect, useRef, useState } from 'react';

export default function RetroSnake({ brightness = 100, contrast = 100 }) {
    const canvasRef = useRef(null);
    const audioCtxRef = useRef(null);
    const [score, setScore] = useState(0);

    const playTone = (freq, type, dur) => {
        if (!audioCtxRef.current) return;
        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();
        osc.type = type;
        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);
        osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);
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

        let snake = [{ x: 10, y: 10 }];
        let food = { x: 15, y: 15 };
        let dx = 1;
        let dy = 0;
        const grid = 20;
        let lastTime = 0;
        let isStarted = false;
        let gameEnded = false;
        let pScore = 0;

        const drawGridContext = () => {
            ctx.fillStyle = '#111';
            ctx.fillRect(0, 0, W, H);

            // Draw border
            ctx.strokeStyle = '#ffb300';
            ctx.lineWidth = 4;
            ctx.strokeRect(0, 0, W, H);
        };

        const randomFood = () => {
            food = {
                x: Math.floor(Math.random() * (W / grid - 2)) + 1,
                y: Math.floor(Math.random() * (H / grid - 2)) + 1
            };
        };

        const update = (time) => {
            if (!lastTime) lastTime = time;
            if (time - lastTime < 100) {
                requestAnimationFrame(update);
                return;
            }
            lastTime = time;

            if (gameEnded) return;

            if (isStarted) {
                const head = { x: snake[0].x + dx, y: snake[0].y + dy };

                // Walls death
                if (head.x < 0 || head.x >= W / grid || head.y < 0 || head.y >= H / grid) {
                    gameEnded = true;
                    playTone(100, 'sawtooth', 0.5); // Crash
                }

                // Self collision
                for (let i = 0; i < snake.length; i++) {
                    if (snake[i].x === head.x && snake[i].y === head.y) {
                        gameEnded = true;
                        playTone(100, 'sawtooth', 0.5); // Crash
                    }
                }

                snake.unshift(head);

                // Eat food
                if (head.x === food.x && head.y === food.y) {
                    pScore += 10;
                    setScore(pScore);
                    playTone(600, 'square', 0.1); // Eat
                    randomFood();
                } else {
                    snake.pop();
                }
            }

            // Draw
            drawGridContext();

            // Food
            ctx.fillStyle = '#ef4444';
            ctx.fillRect(food.x * grid, food.y * grid, grid - 2, grid - 2);

            // Snake
            ctx.fillStyle = '#ffb300';
            for (let i = 0; i < snake.length; i++) {
                ctx.fillRect(snake[i].x * grid, snake[i].y * grid, grid - 2, grid - 2);
            }

            if (!isStarted && !gameEnded) {
                ctx.fillStyle = 'rgba(0,0,0,0.7)';
                ctx.fillRect(0, 0, W, H);
                ctx.fillStyle = '#ffb300';
                ctx.font = '30px "Courier New", Courier, monospace';
                ctx.textAlign = 'center';
                ctx.fillText("PRESIONA ESPACIO PARA INICIAR (USE FLECHAS)", W / 2, H / 2);
            }

            if (gameEnded) {
                ctx.fillStyle = 'rgba(0,0,0,0.8)';
                ctx.fillRect(0, 0, W, H);
                ctx.fillStyle = '#ef4444';
                ctx.font = '40px "Courier New", Courier, monospace';
                ctx.textAlign = 'center';
                ctx.fillText("GAME OVER", W / 2, H / 2 - 20);
                ctx.fillStyle = '#ffb300';
                ctx.font = '20px "Courier New", Courier, monospace';
                ctx.fillText(`SCORE: ${pScore}`, W / 2, H / 2 + 20);
                ctx.fillText("PULSA ESPACIO PARA REINTENTAR", W / 2, H / 2 + 50);
            }

            requestAnimationFrame(update);
        };

        const handleKey = (e) => {
            if (!audioCtxRef.current) {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                audioCtxRef.current = new AudioContext();
            }

            if (e.key === ' ') {
                e.preventDefault();
                if (gameEnded) {
                    snake = [{ x: 10, y: 10 }];
                    dx = 1; dy = 0;
                    pScore = 0;
                    setScore(0);
                    gameEnded = false;
                    isStarted = true;
                    randomFood();
                    requestAnimationFrame(update);
                } else if (!isStarted) {
                    isStarted = true;
                    playTone(800, 'square', 0.2); // Start
                }
            }

            if (!isStarted || gameEnded) return;

            if (e.key === 'ArrowUp' && dy === 0) { dx = 0; dy = -1; e.preventDefault(); }
            if (e.key === 'ArrowDown' && dy === 0) { dx = 0; dy = 1; e.preventDefault(); }
            if (e.key === 'ArrowLeft' && dx === 0) { dx = -1; dy = 0; e.preventDefault(); }
            if (e.key === 'ArrowRight' && dx === 0) { dx = 1; dy = 0; e.preventDefault(); }
        };

        drawGridContext();
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#ffb300';
        ctx.font = '30px "Courier New", Courier, monospace';
        ctx.textAlign = 'center';
        ctx.fillText("PRESIONA ESPACIO PARA INICIAR", W / 2, H / 2);

        window.addEventListener('keydown', handleKey);
        requestAnimationFrame(update);

        return () => {
            window.removeEventListener('keydown', handleKey);
            gameEnded = true;
        };
    }, []);

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#000', filter: `brightness(${brightness}%) contrast(${contrast}%)` }}>
            <div style={{ padding: '0.5rem 2rem', color: '#ffb300', fontFamily: '"Courier New", Courier, monospace', fontSize: '2rem', fontWeight: 'bold' }}>
                SCORE: {score.toString().padStart(4, '0')}
            </div>
            <canvas ref={canvasRef} style={{ flex: 1, width: '100%', maxWidth: '800px', maxHeight: '600px', objectFit: 'contain', minHeight: 0 }} />
        </div>
    );
}
