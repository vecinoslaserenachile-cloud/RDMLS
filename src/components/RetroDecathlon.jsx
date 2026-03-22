import React, { useEffect, useRef, useState } from 'react';

export default function RetroDecathlon({ brightness, contrast }) {
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
                gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(); osc.stop(audioCtx.currentTime + duration);
            } catch (e) { }
        };

        let state = 'READY'; // READY, RUNNING, THROWING, FLYING, DONE
        let speed = 0;
        let dist = 0;
        let athleteX = 50;
        let javelin = { x: 0, y: 0, vx: 0, vy: 0, angle: 0, path: [] };
        let lastKey = null;
        let throwAngle = 0;
        let bestDist = 0;

        const handleKeyDown = (e) => {
            initAudio();
            if (state === 'READY') {
                if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') state = 'RUNNING';
            }

            if (state === 'RUNNING') {
                if ((e.key === 'ArrowLeft' && lastKey !== 'ArrowLeft') || (e.key === 'ArrowRight' && lastKey !== 'ArrowRight')) {
                    speed += 0.8;
                    if (speed > 12) speed = 12;
                    lastKey = e.key;
                    playSound(150 + speed * 10, 0.05, 'square');
                }
                if (e.key === ' ') {
                    state = 'THROWING';
                    throwAngle = 10;
                }
            }

            if (state === 'THROWING') {
                if (e.key === ' ') {
                    throwAngle += 2;
                    if (throwAngle > 80) throwAngle = 80;
                }
            }
        };

        const handleKeyUp = (e) => {
            if (state === 'THROWING' && e.key === ' ') {
                // THROW!
                const rad = (90 - throwAngle) * Math.PI / 180;
                javelin.x = athleteX + 10;
                javelin.y = H - 80;
                javelin.vx = Math.cos(rad) * speed * 2;
                javelin.vy = -Math.sin(rad) * speed * 2;
                javelin.path = [];
                state = 'FLYING';
                playSound(600, 0.3, 'sine');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        const update = () => {
            if (state === 'RUNNING') {
                athleteX += speed * 0.5;
                speed *= 0.98;
                if (athleteX > W - 100) { // Foul line
                    state = 'DONE';
                    dist = 0;
                    playSound(50, 0.5, 'triangle');
                }
            }

            if (state === 'FLYING') {
                javelin.x += javelin.vx;
                javelin.y += javelin.vy;
                javelin.vy += 0.15; // Gravity
                javelin.path.push({ x: javelin.x, y: javelin.y });

                if (javelin.y > H - 50) {
                    javelin.y = H - 50;
                    dist = (javelin.x - (W - 100)) / 2; // Arbitrary scale
                    if (dist < 0) dist = 0;
                    if (dist > bestDist) bestDist = dist;
                    state = 'DONE';
                    playSound(300, 0.2, 'square');
                }
            }
        };

        const draw = () => {
            // Field
            ctx.fillStyle = '#1e3a8a'; ctx.fillRect(0,0,W,H); // Sky
            ctx.fillStyle = '#10b981'; ctx.fillRect(0, H-50, W, 50); // Grass
            ctx.fillStyle = '#f97316'; ctx.fillRect(0, H-80, W, 30); // Track

            // Foul line
            ctx.strokeStyle = '#fff'; ctx.lineWidth = 4;
            ctx.beginPath(); ctx.moveTo(W - 100, H - 80); ctx.lineTo(W - 100, H - 50); ctx.stroke();

            // Markers
            ctx.fillStyle = '#fff'; ctx.font = '10px Arial';
            for (let i = 1; i < 5; i++) {
                ctx.fillText(i * 50 + "m", (W - 100) + i * 100, H - 35);
            }

            // Athlete (Simplified Serenito)
            ctx.fillStyle = '#3b82f6';
            ctx.fillRect(athleteX - 10, H - 110, 20, 30); // Body
            ctx.fillStyle = '#fde047'; ctx.beginPath(); ctx.arc(athleteX, H - 120, 10, 0, Math.PI*2); ctx.fill(); // Head
            
            // Running Effect
            if (state === 'RUNNING') {
                ctx.strokeStyle = '#fff'; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.moveTo(athleteX - 15, H - 80); ctx.lineTo(athleteX + (Math.sin(Date.now()*0.02)*10), H - 70); ctx.stroke();
            }

            // Javelin
            if (state === 'READY' || state === 'RUNNING' || state === 'THROWING') {
                ctx.save();
                ctx.translate(athleteX + 5, H - 100);
                if (state === 'THROWING') ctx.rotate(-throwAngle * Math.PI / 180);
                ctx.strokeStyle = '#fff'; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.moveTo(-20, 0); ctx.lineTo(20, 0); ctx.stroke();
                ctx.restore();
            }

            if (state === 'FLYING' || state === 'DONE') {
                ctx.strokeStyle = 'rgba(255,255,255,0.3)';
                ctx.beginPath();
                javelin.path.forEach((p, i) => { if(i===0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); });
                ctx.stroke();

                ctx.save();
                ctx.translate(javelin.x, javelin.y);
                const angle = Math.atan2(javelin.vy, javelin.vx);
                ctx.rotate(angle);
                ctx.strokeStyle = '#fff'; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.moveTo(-15, 0); ctx.lineTo(15, 0); ctx.stroke();
                ctx.restore();
            }

            // UI
            ctx.fillStyle = '#fff'; ctx.font = 'bold 20px monospace';
            ctx.textAlign = 'left'; ctx.fillText(`SPEED: ${Math.round(speed * 10)}`, 20, 40);
            ctx.textAlign = 'right'; ctx.fillText(`BEST: ${bestDist.toFixed(2)}m`, W - 20, 40);

            if (state === 'THROWING') {
                ctx.fillStyle = '#facc15'; ctx.textAlign = 'center';
                ctx.fillText(`ANGLE: ${throwAngle}°`, W/2, H/2);
            }

            if (state === 'DONE') {
                ctx.fillStyle = 'rgba(0,0,0,0.7)'; ctx.fillRect(0,0,W,H);
                ctx.fillStyle = '#fff'; ctx.textAlign = 'center';
                ctx.font = 'bold 40px monospace';
                if (dist === 0) ctx.fillText("FOUL!", W/2, H/2);
                else ctx.fillText(`${dist.toFixed(2)}m`, W/2, H/2);
                ctx.font = '16px monospace';
                ctx.fillText("PRESS ANY KEY TO RESET", W/2, H/2 + 50);
                
                const reset = () => {
                    athleteX = 50; speed = 0; state = 'READY';
                    window.removeEventListener('keydown', reset);
                };
                window.addEventListener('keydown', reset);
            }
            
            if (state === 'READY') {
                ctx.fillStyle = '#38bdf8'; ctx.textAlign = 'center'; ctx.font = 'bold 24px monospace';
                ctx.fillText("JAVELIN LA SERENA", W/2, H/2 - 40);
                ctx.fillStyle = '#fff'; ctx.font = '16px monospace';
                ctx.fillText("TAP LEFT/RIGHT TO RUN", W/2, H/2);
                ctx.fillText("HOLD SPACE TO SET ANGLE", W/2, H/2 + 30);
            }
        };

        const loop = () => { update(); draw(); requestRef.current = requestAnimationFrame(loop); };
        requestRef.current = requestAnimationFrame(loop);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            cancelAnimationFrame(requestRef.current);
            if (audioCtx) audioCtx.close().catch(()=>{});
        };
    }, []);

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '450px', height: '100%', maxHeight: '600px', border: '6px solid #f97316', borderRadius: '15px', overflow: 'hidden' }}>
                <canvas ref={canvasRef} width={450} height={600} style={{ width: '100%', height: '100%', filter: `brightness(${brightness}%) contrast(${contrast}%)` }} />
            </div>
        </div>
    );
}
