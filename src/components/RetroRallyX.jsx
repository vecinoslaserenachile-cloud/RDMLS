import React, { useEffect, useRef, useState } from 'react';

export default function RetroRallyX({ brightness, contrast }) {
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

        const car = { 
            x: W / 2, y: H / 2, 
            dir: 0, // 0: Right, 1: Down, 2: Left, 3: Up
            speed: 4,
            width: 20, height: 12,
            smoke: 0
        };

        let flags = [];
        let enemies = [
            { x: 100, y: 100, dir: 1, speed: 3 },
            { x: W - 100, y: H - 100, dir: 3, speed: 3 }
        ];

        let score = 0;
        let lives = 3;
        let gameOver = false;
        let fuel = 100;

        const grid = 40;
        const spawnFlags = () => {
            flags = [];
            for (let i = 0; i < 10; i++) {
                flags.push({ 
                    x: Math.floor(Math.random() * (W/grid - 2) + 1) * grid + grid/2,
                    y: Math.floor(Math.random() * (H/grid - 2) + 1) * grid + grid/2,
                    collected: false
                });
            }
        };
        spawnFlags();

        const handleKeyDown = (e) => {
            initAudio();
            if (e.key === 'ArrowRight') car.nextDir = 0;
            if (e.key === 'ArrowDown') car.nextDir = 1;
            if (e.key === 'ArrowLeft') car.nextDir = 2;
            if (e.key === 'ArrowUp') car.nextDir = 3;
            if (e.key === ' ' && fuel > 5) {
                car.smoke = 30;
                fuel -= 10;
                playSound(150, 0.2, 'sawtooth');
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        const update = () => {
            if (gameOver || lives <= 0) return;

            // Simple Grid Logic
            if (car.x % grid === grid/2 && car.y % grid === grid/2) {
                if (car.nextDir !== undefined) {
                    car.dir = car.nextDir;
                    car.nextDir = undefined;
                }
            }

            if (car.dir === 0) car.x += car.speed;
            if (car.dir === 1) car.y += car.speed;
            if (car.dir === 2) car.x -= car.speed;
            if (car.dir === 3) car.y -= car.speed;

            // Boundary
            if (car.x < grid/2) car.x = W - grid/2;
            if (car.x > W - grid/2) car.x = grid/2;
            if (car.y < grid/2) car.y = H - grid/2;
            if (car.y > H - grid/2) car.y = grid/2;

            // Flags
            flags.forEach(f => {
                if (!f.collected && Math.hypot(car.x - f.x, car.y - f.y) < 20) {
                    f.collected = true;
                    score += 100;
                    playSound(800, 0.1, 'square');
                }
            });
            if (flags.every(f => f.collected)) spawnFlags();

            // Fuel
            fuel -= 0.05;
            if (fuel < 0) fuel = 0;

            // Enemies
            enemies.forEach(e => {
                // Move towards car if no smoke
                if (car.smoke > 0) {
                    // Wander
                    if (Math.random() < 0.05) e.dir = Math.floor(Math.random() * 4);
                } else {
                    if (Math.abs(car.x - e.x) > Math.abs(car.y - e.y)) {
                        e.dir = car.x > e.x ? 0 : 2;
                    } else {
                        e.dir = car.y > e.y ? 1 : 3;
                    }
                }

                if (e.dir === 0) e.x += e.speed;
                if (e.dir === 1) e.y += e.speed;
                if (e.dir === 2) e.x -= e.speed;
                if (e.dir === 3) e.y -= e.speed;

                if (Math.hypot(car.x - e.x, car.y - e.y) < 25) {
                    lives--;
                    playSound(100, 0.5, 'sawtooth');
                    car.x = W/2; car.y = H/2;
                    if (lives <= 0) gameOver = true;
                }
            });

            if (car.smoke > 0) car.smoke--;
        };

        const draw = () => {
            ctx.fillStyle = '#0a2a0a'; ctx.fillRect(0,0,W,H);
            
            // Grid Streets
            ctx.strokeStyle = '#333'; ctx.lineWidth = 1;
            for(let i=0; i<W; i+=grid) { ctx.beginPath(); ctx.moveTo(i,0); ctx.lineTo(i,H); ctx.stroke(); }
            for(let j=0; j<H; j+=grid) { ctx.beginPath(); ctx.moveTo(0,j); ctx.lineTo(W,j); ctx.stroke(); }

            // Flags
            flags.forEach(f => {
                if(!f.collected) {
                    ctx.fillStyle = '#facc15';
                    ctx.beginPath(); ctx.moveTo(f.x, f.y-10); ctx.lineTo(f.x+10, f.y); ctx.lineTo(f.x, f.y+10); ctx.fill();
                }
            });

            // Smoke
            if (car.smoke > 0) {
                ctx.fillStyle = 'rgba(255,255,255,0.6)';
                ctx.beginPath(); ctx.arc(car.x, car.y, 40, 0, Math.PI*2); ctx.fill();
            }

            // Car
            ctx.save();
            ctx.translate(car.x, car.y);
            if (car.dir === 1) ctx.rotate(Math.PI/2);
            if (car.dir === 2) ctx.rotate(Math.PI);
            if (car.dir === 3) ctx.rotate(-Math.PI/2);
            ctx.fillStyle = '#3b82f6';
            ctx.fillRect(-10, -6, 20, 12);
            ctx.fillStyle = '#fff'; ctx.fillRect(2, -4, 6, 8); // Windshield
            ctx.restore();

            // Enemies
            enemies.forEach(e => {
                ctx.save();
                ctx.translate(e.x, e.y);
                if (e.dir === 1) ctx.rotate(Math.PI/2);
                if (e.dir === 2) ctx.rotate(Math.PI);
                if (e.dir === 3) ctx.rotate(-Math.PI/2);
                ctx.fillStyle = '#ef4444';
                ctx.fillRect(-10, -6, 20, 12);
                ctx.restore();
            });

            // UI
            ctx.fillStyle = '#fff'; ctx.font = 'bold 16px monospace';
            ctx.fillText(`SCORE: ${score}`, 20, 30);
            ctx.fillText(`VIDAS: ${lives}`, 20, 55);
            ctx.fillText(`GAS: ${Math.round(fuel)}%`, W - 100, 30);

            if (gameOver) {
                ctx.fillStyle = 'rgba(0,0,0,0.8)'; ctx.fillRect(0,0,W,H);
                ctx.fillStyle = '#ef4444'; ctx.textAlign = 'center'; ctx.font = 'bold 40px monospace';
                ctx.fillText("FÍN DEL RALLY", W/2, H/2);
            }
        };

        const loop = () => { update(); draw(); requestRef.current = requestAnimationFrame(loop); };
        requestRef.current = requestAnimationFrame(loop);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            cancelAnimationFrame(requestRef.current);
            if (audioCtx) audioCtx.close().catch(()=>{});
        };
    }, []);

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '450px', height: '100%', maxHeight: '600px', border: '6px solid #3b82f6', borderRadius: '15px', overflow: 'hidden' }}>
                <canvas ref={canvasRef} width={450} height={600} style={{ width: '100%', height: '100%', filter: `brightness(${brightness}%) contrast(${contrast}%)` }} />
            </div>
        </div>
    );
}
