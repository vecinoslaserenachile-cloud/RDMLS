import React, { useEffect, useRef } from 'react';

export default function RetroFronton({ brightness, contrast }) {
    const canvasRef = useRef(null);
    const requestRef = useRef();
    const heroImg = useRef(new Image());

    useEffect(() => {
        heroImg.current.src = '/serenito.png';
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = 600;
        canvas.height = 800;

        let audioCtx;

        const initAudio = () => {
            if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        };

        const playBeep = () => {
            if (!audioCtx) return;
            try {
                const oscillator = audioCtx.createOscillator();
                const gainNode = audioCtx.createGain();
                oscillator.type = 'square';
                oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
                gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.1);
                oscillator.connect(gainNode);
                gainNode.connect(audioCtx.destination);
                oscillator.start();
                oscillator.stop(audioCtx.currentTime + 0.1);
            } catch (e) { }
        };

        const playScoreSound = () => {
            if (!audioCtx) return;
            try {
                const oscillator = audioCtx.createOscillator();
                const gainNode = audioCtx.createGain();
                oscillator.type = 'sawtooth';
                oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.4);
                gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.4);
                oscillator.connect(gainNode);
                gainNode.connect(audioCtx.destination);
                oscillator.start();
                oscillator.stop(audioCtx.currentTime + 0.4);
            } catch (e) { }
        };

        let ballX = canvas.width / 2;
        let ballY = canvas.height / 2;
        let ballSpeedX = 0;
        let ballSpeedY = 0;
        let ballSize = 14;

        let paddleWidth = 100;
        const paddleHeight = 20;
        let p1X = (canvas.width - paddleWidth) / 2;
        let p1Y = canvas.height - 40;
        let score = 0;

        let leftPressed = false;
        let rightPressed = false;
        let gameStarted = false;

        let powerups = [];

        const spawnPowerup = (x, y) => {
            if (Math.random() < 0.3) {
                const types = ['W', 'F', 'S', 'B'];
                const type = types[Math.floor(Math.random() * types.length)];
                let color = '#ec4899'; // Rosa
                if (type === 'W') color = '#3b82f6'; // Azul
                if (type === 'F') color = '#fcd34d'; // Amarillo
                powerups.push({ x, y, type, color, size: 22, speed: 3.5 });
            }
        };

        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') { e.preventDefault(); leftPressed = true; }
            if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') { e.preventDefault(); rightPressed = true; }
            if (e.key === ' ') {
                e.preventDefault();
                if (!gameStarted) {
                    initAudio();
                    gameStarted = true;
                    score = 0;
                    paddleWidth = 100;
                    ballSize = 14;
                    powerups = [];
                    ballSpeedX = (Math.random() - 0.5) * 10;
                    ballSpeedY = -8;
                }
            }
        };

        const handleKeyUp = (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') { e.preventDefault(); leftPressed = false; }
            if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') { e.preventDefault(); rightPressed = false; }
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            let mouseX = e.clientX - rect.left;
            p1X = Math.max(0, Math.min(canvas.width - paddleWidth, mouseX - paddleWidth / 2));
        };

        window.addEventListener('keydown', handleKeyDown, { passive: false });
        window.addEventListener('keyup', handleKeyUp, { passive: false });
        canvas.addEventListener('mousemove', handleMouseMove);

        const resetBall = () => {
            gameStarted = false;
            ballX = canvas.width / 2;
            ballY = canvas.height / 2;
            ballSpeedX = 0;
            ballSpeedY = 0;
            p1X = (canvas.width - paddleWidth) / 2;
        };

        const draw = () => {
            // Background (Stadium pattern)
            const grassGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            grassGradient.addColorStop(0, '#064e3b');
            grassGradient.addColorStop(1, '#065f46');
            ctx.fillStyle = grassGradient; 
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.strokeStyle = 'rgba(255,255,255,0.05)';
            ctx.lineWidth = 1;
            for(let i=0; i<canvas.width; i+=40) {
                ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
            }
            for(let i=0; i<canvas.height; i+=40) {
                ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
            }

            // Court Lines
            ctx.strokeStyle = 'rgba(255,255,255,0.2)';
            ctx.lineWidth = 4;
            ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

            // Top boundary (Wall)
            ctx.fillStyle = '#991b1b'; // Rojo colonial
            ctx.fillRect(0, 0, canvas.width, 20);
            ctx.fillStyle = '#dc2626';
            ctx.fillRect(0, 0, canvas.width, 10);

            // Paddle (Dynamic Design)
            ctx.fillStyle = '#3b82f6'; // Azul
            ctx.shadowBlur = 10; ctx.shadowColor = '#3b82f6';
            ctx.fillRect(p1X, p1Y, paddleWidth, paddleHeight);
            ctx.shadowBlur = 0;
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.strokeRect(p1X, p1Y, paddleWidth, paddleHeight);
            
            if (heroImg.current.complete) {
                ctx.drawImage(heroImg.current, p1X + paddleWidth/2 - 15, p1Y - 10, 30, 30);
            }

            // Powerups
            powerups.forEach(p => {
                ctx.fillStyle = p.color;
                ctx.shadowBlur = 10; ctx.shadowColor = p.color;
                ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
                ctx.shadowBlur = 0;
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 12px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(p.type, p.x, p.y + 4);
            });

            // Ball (Beach Ball Style)
            if (gameStarted) {
                ctx.fillStyle = '#ec4899'; // Rosa
                ctx.beginPath();
                ctx.arc(ballX, ballY, ballSize/2, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#fff';
                ctx.beginPath();
                ctx.arc(ballX - 2, ballY - 2, 3, 0, Math.PI * 2);
                ctx.fill();
            }

            // HUD
            ctx.fillStyle = '#fcd34d';
            ctx.font = 'bold 30px monospace';
            ctx.textAlign = 'right';
            ctx.fillText("PUNTOS: " + score, canvas.width - 20, 50);

            if (!gameStarted) {
                ctx.fillStyle = 'rgba(0,0,0,0.8)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.textAlign = 'center';
                ctx.fillStyle = '#ec4899';
                ctx.font = 'bold 36px monospace';
                ctx.fillText("FRONTÓN ESTADIO LA PORTADA", canvas.width / 2, canvas.height / 2 - 40);

                ctx.fillStyle = '#fff';
                ctx.font = '20px monospace';
                ctx.fillText("PRESIONA ESPACIO PARA SACAR", canvas.width / 2, canvas.height / 2 + 20);
                ctx.font = '14px monospace';
                ctx.fillText("CONTROLES: RATÓN O TECLAS A / D", canvas.width / 2, canvas.height - 40);
            }
        };

        const update = () => {
            if (!gameStarted) return;

            if (leftPressed && p1X > 0) p1X -= 10;
            if (rightPressed && p1X < canvas.width - paddleWidth) p1X += 10;

            ballX += ballSpeedX;
            ballY += ballSpeedY;

            if (ballX - ballSize / 2 < 0 || ballX + ballSize / 2 > canvas.width) {
                ballSpeedX = -ballSpeedX;
                ballX = ballX < 0 ? ballSize/2 : canvas.width - ballSize/2;
                playBeep();
            }

            if (ballY - ballSize / 2 < 10) {
                ballSpeedY = -ballSpeedY;
                ballY = 10 + ballSize/2;
                playBeep();
                spawnPowerup(ballX, ballY);
            }

            else if (ballY + ballSize / 2 > canvas.height) {
                playScoreSound();
                resetBall();
            }

            if (ballY + ballSize / 2 > p1Y && ballY - ballSize / 2 < p1Y + paddleHeight && ballX + ballSize / 2 > p1X && ballX - ballSize / 2 < p1X + paddleWidth) {
                ballSpeedY = -Math.abs(ballSpeedY) - 0.2;
                const hitPoint = ballX - (p1X + paddleWidth / 2);
                ballSpeedX = hitPoint * 0.25;
                score++;
                playBeep();
            }

            for (let i = powerups.length - 1; i >= 0; i--) {
                let p = powerups[i];
                p.y += p.speed;
                if (p.y + p.size / 2 > p1Y && p.y - p.size / 2 < p1Y + paddleHeight && p.x + p.size / 2 > p1X && p.x - p.size / 2 < p1X + paddleWidth) {
                    if (p.type === 'W') paddleWidth = Math.min(250, paddleWidth + 50);
                    if (p.type === 'F') { ballSpeedX *= 1.2; ballSpeedY *= 1.2; }
                    if (p.type === 'S') { ballSpeedX *= 0.8; ballSpeedY *= 0.8; }
                    if (p.type === 'B') ballSize += 4;
                    playScoreSound();
                    powerups.splice(i, 1);
                } else if (p.y > canvas.height) {
                    powerups.splice(i, 1);
                }
            }
        };

        const loop = () => {
            update();
            draw();
            requestRef.current = requestAnimationFrame(loop);
        };

        requestRef.current = requestAnimationFrame(loop);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            canvas.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(requestRef.current);
            if (audioCtx) audioCtx.close().catch(() => { });
        };
    }, []);

    return (
        <div className="game-container-inner" style={{ position: 'absolute', inset: 0, zIndex: 5, background: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#0a0a0a', filter: `brightness(${brightness}%) contrast(${contrast}%)` }} />
        </div>
    );
}
