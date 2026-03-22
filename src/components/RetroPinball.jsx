import React, { useEffect, useRef } from 'react';

export default function RetroPinball({ brightness, contrast }) {
    const canvasRef = useRef(null);
    const requestRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const W = canvas.width;
        const H = canvas.height;

        let audioCtx;
        const initAudio = () => { if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)(); };
        const playSound = (freq, duration, type = 'square') => {
            if (!audioCtx) return;
            try {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = type;
                osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
                gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(); osc.stop(audioCtx.currentTime + duration);
            } catch (e) { }
        };

        const ball = { x: W - 15, y: H - 50, vx: 0, vy: 0, radius: 10, active: false };
        let score = 0;
        let ballsLeft = 3;
        let gameStarted = false;

        const bgImg = new Image();
        bgImg.src = 'https://raw.githubusercontent.com/vecinoslaserenachile-cloud/RDMLS/main/assets/models/flippers';

        // More separated flippers (W/2 - 100 and W/2 + 100)
        let leftFlipper = { x: W / 2 - 100, y: H - 90, length: 85, angle: 30, lastAngle: 30, isUp: false };
        let rightFlipper = { x: W / 2 + 100, y: H - 90, length: 85, angle: 30, lastAngle: 30, isUp: false };

        const bumpers = [
            { x: W / 2, y: 150, r: 25, score: 100, lit: 0, text: 'FARO' },
            { x: W / 2 - 90, y: 230, r: 25, score: 150, lit: 0, text: 'MUNI' },
            { x: W / 2 + 90, y: 230, r: 25, score: 150, lit: 0, text: 'SERENITO' },
            { x: W / 2, y: 310, r: 20, score: 200, lit: 0, text: 'PLAYA' }
        ];

        let plungerForce = 0;
        let spacePressed = false;

        const handleKeyDown = (e) => {
            initAudio();
            if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
                if (!leftFlipper.isUp) playSound(250, 0.05, 'triangle');
                leftFlipper.isUp = true;
            }
            if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
                if (!rightFlipper.isUp) playSound(250, 0.05, 'triangle');
                rightFlipper.isUp = true;
            }
            if (e.key === ' ') {
                spacePressed = true;
                if (ballsLeft <= 0) {
                    ballsLeft = 3;
                    score = 0;
                    resetBall();
                } else if (!ball.active && ball.x > W - 30) {
                    plungerForce += 3;
                    if (plungerForce > 45) plungerForce = 45;
                }
            }
        };

        const handleKeyUp = (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') leftFlipper.isUp = false;
            if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') rightFlipper.isUp = false;
            if (e.key === ' ') {
                spacePressed = false;
                if (!ball.active && ball.x > W - 30 && plungerForce > 5) {
                    ball.vy = -plungerForce;
                    ball.active = true;
                    gameStarted = true;
                    playSound(350, 0.5, 'triangle');
                }
                plungerForce = 0;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        const resetBall = () => {
            ball.x = W - 15;
            ball.y = H - 50;
            ball.vx = 0;
            ball.vy = 0;
            ball.active = false;
        };

        const checkCollisionLine = (x1, y1, x2, y2, bounceExt = 1) => {
            const dx = x2 - x1;
            const dy = y2 - y1;
            const len = Math.sqrt(dx * dx + dy * dy);
            const dot = (((ball.x - x1) * dx) + ((ball.y - y1) * dy)) / (len * len);
            const closestX = x1 + (dot * dx);
            const closestY = y1 + (dot * dy);

            const hitRadius = ball.radius + 2;

            if (dot >= 0 && dot <= 1) {
                const distSize = Math.hypot(ball.x - closestX, ball.y - closestY);
                if (distSize < hitRadius) {
                    let nx = dy / len;
                    let ny = -dx / len;
                    let vdot = ball.vx * nx + ball.vy * ny;
                    if (vdot < 0) {
                        ball.vx -= 2 * vdot * nx;
                        ball.vy -= 2 * vdot * ny;
                        ball.vx *= bounceExt;
                        ball.vy *= bounceExt;
                        ball.x += nx * (hitRadius - distSize + 1);
                        ball.y += ny * (hitRadius - distSize + 1);
                        return true;
                    }
                }
            }
            return false;
        };

        const update = () => {
            if (ballsLeft <= 0) return;

            leftFlipper.lastAngle = leftFlipper.angle;
            const targetLeftAngle = leftFlipper.isUp ? -35 : 25;
            leftFlipper.angle += (targetLeftAngle - leftFlipper.angle) * 0.5;

            rightFlipper.lastAngle = rightFlipper.angle;
            const targetRightAngle = rightFlipper.isUp ? -35 : 25;
            rightFlipper.angle += (targetRightAngle - rightFlipper.angle) * 0.5;

            if (ball.active) {
                ball.vy += 0.35; // Gravity
                ball.x += ball.vx;
                ball.y += ball.vy;

                ball.vx *= 0.996;
                ball.vy *= 0.996;

                if (ball.x < ball.radius) { ball.x = ball.radius; ball.vx *= -0.7; }
                if (ball.x > W - ball.radius) { ball.x = W - ball.radius; ball.vx *= -0.7; }
                if (ball.y < ball.radius) { ball.y = ball.radius; ball.vy *= -0.7; }

                checkCollisionLine(W, 30, W - 100, 0); 
                checkCollisionLine(W - 35, H, W - 35, 120); 
                checkCollisionLine(0, 300, leftFlipper.x, leftFlipper.y);
                checkCollisionLine(rightFlipper.x, rightFlipper.y, W - 35, 300);

                bumpers.forEach(b => {
                    const dx = ball.x - b.x;
                    const dy = ball.y - b.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < ball.radius + b.r) {
                        const nx = dx / dist;
                        const ny = dy / dist;
                        const bounceForce = Math.max(12, Math.hypot(ball.vx, ball.vy) * 1.8);
                        ball.vx = nx * bounceForce;
                        ball.vy = ny * bounceForce;
                        ball.x += nx * (ball.radius + b.r - dist + 2);
                        ball.y += ny * (ball.radius + b.r - dist + 2);
                        score += b.score;
                        b.lit = 15;
                        playSound(800, 0.1, 'square');
                    }
                    if (b.lit > 0) b.lit--;
                });

                // Flipper collisions with "kick"
                const lfRad = leftFlipper.angle * Math.PI / 180;
                const lfEndX = leftFlipper.x + Math.cos(lfRad) * leftFlipper.length;
                const lfEndY = leftFlipper.y + Math.sin(lfRad) * leftFlipper.length;
                if (checkCollisionLine(leftFlipper.x, leftFlipper.y, lfEndX, lfEndY, 1.2)) {
                    if (leftFlipper.angle < leftFlipper.lastAngle) { // Moving up
                        ball.vy -= 15;
                        ball.vx += (ball.x - leftFlipper.x) * 0.1;
                    }
                }

                const rfRad = rightFlipper.angle * Math.PI / 180;
                const rfEndX = rightFlipper.x - Math.cos(rfRad) * rightFlipper.length;
                const rfEndY = rightFlipper.y + Math.sin(rfRad) * rightFlipper.length;
                if (checkCollisionLine(rightFlipper.x, rightFlipper.y, rfEndX, rfEndY, 1.2)) {
                    if (rightFlipper.angle < rightFlipper.lastAngle) { // Moving up
                        ball.vy -= 15;
                        ball.vx -= (rightFlipper.x - ball.x) * 0.1;
                    }
                }

                if (ball.y > H + ball.radius) {
                    ballsLeft--;
                    playSound(150, 0.4, 'sawtooth');
                    resetBall();
                    gameStarted = false;
                }
            } else {
                if (gameStarted) ball.y = H - 50 + plungerForce * 0.4;
            }
        };

        const draw = () => {
            // Background
            const oceanGrad = ctx.createLinearGradient(0, 0, 0, H);
            oceanGrad.addColorStop(0, '#0f172a'); 
            oceanGrad.addColorStop(1, '#1e3a8a'); 
            ctx.fillStyle = oceanGrad; ctx.fillRect(0, 0, W, H);

            // Serenito Image Background
            ctx.globalAlpha = 0.3;
            if (bgImg.complete) {
                const aspect = bgImg.width / bgImg.height;
                const dw = W * 0.8;
                const dh = dw / aspect;
                ctx.drawImage(bgImg, (W - dw) / 2, (H - dh) / 2, dw, dh);
            }
            ctx.globalAlpha = 1.0;

            // Faro
            ctx.fillStyle = '#f1f5f9'; ctx.fillRect(W/2 - 15, 60, 30, 100);
            ctx.fillStyle = '#ef4444'; ctx.fillRect(W/2 - 15, 80, 30, 15); ctx.fillRect(W/2 - 15, 120, 30, 15);
            ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(W/2, 55, 20, 0, Math.PI*2); ctx.fill();

            // Brand Borders
            ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 6;
            ctx.beginPath(); ctx.arc(W / 2 - 15, 100, W / 2 - 15, Math.PI, 0); ctx.stroke();
            ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 4;
            ctx.beginPath(); ctx.moveTo(W - 35, 120); ctx.lineTo(W - 35, H); ctx.stroke();

            // Bumpers
            bumpers.forEach(b => {
                ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
                ctx.fillStyle = b.lit > 0 ? '#10b981' : '#1e40af';
                ctx.fill();
                ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 2; ctx.stroke();
                ctx.fillStyle = '#fff'; ctx.font = 'bold 10px monospace'; ctx.textAlign = 'center'; 
                ctx.fillText(b.text, b.x, b.y + 4);
            });

            // Flippers
            ctx.lineWidth = 16; ctx.lineCap = 'round';
            ctx.strokeStyle = '#ef4444';
            ctx.shadowBlur = 10; ctx.shadowColor = '#ef4444';

            ctx.beginPath(); ctx.moveTo(leftFlipper.x, leftFlipper.y);
            const lfRad = leftFlipper.angle * Math.PI / 180;
            ctx.lineTo(leftFlipper.x + Math.cos(lfRad) * leftFlipper.length, leftFlipper.y + Math.sin(lfRad) * leftFlipper.length);
            ctx.stroke();

            ctx.beginPath(); ctx.moveTo(rightFlipper.x, rightFlipper.y);
            const rfRad = rightFlipper.angle * Math.PI / 180;
            ctx.lineTo(rightFlipper.x - Math.cos(rfRad) * rightFlipper.length, rightFlipper.y + Math.sin(rfRad) * rightFlipper.length);
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Ball
            ctx.beginPath(); ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#fff'; ctx.fill();
            ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 2; ctx.stroke();

            // HUD
            ctx.fillStyle = '#38bdf8'; ctx.textAlign = 'left'; ctx.font = 'bold 18px monospace';
            ctx.fillText("PUNTAJE: " + score, 20, 30);
            ctx.textAlign = 'right'; ctx.fillText("BOLAS: " + ballsLeft, W - 50, 30);

            if (ballsLeft <= 0) {
                ctx.fillStyle = 'rgba(0,0,0,0.8)'; ctx.fillRect(0, 0, W, H);
                ctx.fillStyle = '#ef4444'; ctx.textAlign = 'center'; ctx.font = 'bold 40px monospace';
                ctx.fillText("FÍN DEL JUEGO", W / 2, H / 2 - 20);
                ctx.fillStyle = '#fff'; ctx.font = '16px monospace'; ctx.fillText("ESPACIO PARA REINICIAR", W / 2, H / 2 + 50);
            } else if (!gameStarted && !ball.active) {
                ctx.fillStyle = 'rgba(0,0,0,0.6)'; ctx.fillRect(0, 0, W, H);
                ctx.fillStyle = '#38bdf8'; ctx.textAlign = 'center'; ctx.font = 'bold 30px monospace';
                ctx.fillText("SMART PINBALL CITY", W / 2, H / 2 - 40);
                ctx.fillStyle = '#fff'; ctx.font = '14px monospace';
                ctx.fillText("ESPACIO: LANZAR | FLECHAS: PALETAS", W / 2, H / 2 + 10);
            }
        };

        const loop = () => { update(); draw(); requestRef.current = requestAnimationFrame(loop); };
        requestRef.current = requestAnimationFrame(loop);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            cancelAnimationFrame(requestRef.current);
            if (audioCtx) audioCtx.close().catch(() => { });
        };
    }, []);

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '450px', height: '100%', maxHeight: '600px', border: '6px solid #38bdf8', borderRadius: '30px 30px 10px 10px', overflow: 'hidden', boxShadow: '0 0 60px rgba(56, 189, 248, 0.4)' }}>
                <canvas ref={canvasRef} width={450} height={600} style={{ width: '100%', height: '100%', filter: `brightness(${brightness}%) contrast(${contrast}%)` }} />
            </div>
        </div>
    );
}
