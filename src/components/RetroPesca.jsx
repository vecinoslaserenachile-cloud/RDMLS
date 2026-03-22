import React, { useEffect, useRef } from 'react';

export default function RetroPesca({ brightness, contrast }) {
    const canvasRef = useRef(null);
    const requestRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const W = canvas.width = 600;
        const H = canvas.height = 800;

        const serenitoImg = new Image();
        serenitoImg.src = '/serenito.png';

        let items = [];
        for (let i = 0; i < 8; i++) {
            items.push({
                type: i % 2 === 0 ? 'ring' : 'fish',
                x: W / 4 + Math.random() * (W / 2),
                y: H - 50 - Math.random() * 50,
                vx: 0,
                vy: 0,
                radius: 12, // argolla grande
                caught: false,
                pegIndex: -1,
                color: ['#fde047', '#a3e635', '#f472b6', '#c084fc', '#fb923c', '#38bdf8'][i % 6]
            });
        }

        let bgFishes = [];
        for (let i = 0; i < 5; i++) {
            bgFishes.push({ x: Math.random()*W, y: Math.random()*(H-200)+100, vx: (Math.random()-0.5)*2, type: '🐟' });
        }

        const pegs = [
            { x: W / 2 - 80, y: 250, w: 8, h: 200 }, // Left peg
            { x: W / 2 + 80, y: 200, w: 8, h: 250 }  // Right peg
        ];

        let leftJet = 0;
        let rightJet = 0;

        let score = 0;
        let gameStarted = false;

        let audioCtx;
        const initAudio = () => { if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)(); };
        const playBubble = () => {
            if (!audioCtx) return;
            try {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(300 + Math.random() * 300, audioCtx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1);
                gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(); osc.stop(audioCtx.currentTime + 0.1);
            } catch (e) { }
        };

        const handleJetLeft = (active) => {
            leftJet = active;
            if (active) {
                playBubble();
                if (!gameStarted) { gameStarted = true; initAudio(); }
            }
        };

        const handleJetRight = (active) => {
            rightJet = active;
            if (active) {
                playBubble();
                if (!gameStarted) { gameStarted = true; initAudio(); }
            }
        };

        const btnL = document.getElementById('btn-pe-left');
        const btnR = document.getElementById('btn-pe-right');

        if (btnL) {
            btnL.onmousedown = () => handleJetLeft(1);
            btnL.onmouseup = () => handleJetLeft(0);
            btnL.onmouseleave = () => handleJetLeft(0);
            btnL.ontouchstart = (e) => { e.preventDefault(); handleJetLeft(1); };
            btnL.ontouchend = (e) => { e.preventDefault(); handleJetLeft(0); };
        }
        if (btnR) {
            btnR.onmousedown = () => handleJetRight(1);
            btnR.onmouseup = () => handleJetRight(0);
            btnR.onmouseleave = () => handleJetRight(0);
            btnR.ontouchstart = (e) => { e.preventDefault(); handleJetRight(1); };
            btnR.ontouchend = (e) => { e.preventDefault(); handleJetRight(0); };
        }

        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') handleJetLeft(1);
            if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') handleJetRight(1);
        };
        const handleKeyUp = (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') handleJetLeft(0);
            if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') handleJetRight(0);
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        const update = () => {
            if (!gameStarted) return;
            score = 0;
            items.forEach(r => {
                if (r.caught) {
                    score += (r.type === 'fish' ? 20 : 10);
                    // Caida agradable por la caña
                    if (r.y < pegs[r.pegIndex].y + pegs[r.pegIndex].h - r.radius - 5) {
                        r.y += 2; // cae lentamente hasta el fondo
                    }
                    return;
                }

                // Physics
                r.vy += 0.4; // Gravity in water

                // Apply jets
                if (leftJet > 0 && r.x < W / 2 + 50) {
                    r.vy -= 2.5;
                    r.vx += 1.5 + (Math.random() * 0.5);
                }
                if (rightJet > 0 && r.x > W / 2 - 50) {
                    r.vy -= 2.5;
                    r.vx -= 1.5 + (Math.random() * 0.5);
                }

                // Water drag
                r.vx *= 0.90;
                r.vy *= 0.90;

                r.x += r.vx;
                r.y += r.vy;

                // Boundaries
                let wOffset = r.type === 'fish' ? 40 : r.radius;
                if (r.x < r.radius) { r.x = r.radius; r.vx *= -1; }
                if (r.x > W - wOffset) { r.x = W - wOffset; r.vx *= -1; }
                if (r.y < r.radius) { r.y = r.radius; r.vy *= -1; }
                if (r.y > H - r.radius * 2) { r.y = H - r.radius * 2; r.vy *= -0.5; }

                // Peg collision and catching
                pegs.forEach((peg, index) => {
                    const dx = r.x - (peg.x + peg.w / 2);
                    const dy = r.y - peg.y;
                    if (Math.abs(dx) < 12 && dy > -15 && dy < 15) {
                        r.caught = true;
                        r.pegIndex = index;
                        r.x = peg.x + peg.w / 2;
                        initAudio();
                        if (audioCtx) {
                            try {
                                const osc = audioCtx.createOscillator();
                                osc.frequency.setValueAtTime(800, audioCtx.currentTime);
                                osc.connect(audioCtx.destination);
                                osc.start(); osc.stop(audioCtx.currentTime + 0.1);
                            } catch (e) { }
                        }
                    }

                    if (!r.caught) {
                        if (r.y > peg.y && r.y < peg.y + peg.h) {
                            if (Math.abs(r.x - peg.x - peg.w / 2) < r.radius + peg.w / 2) {
                                r.vx *= -1.5;
                                r.x += r.vx;
                            }
                        }
                    }
                });
            });

            bgFishes.forEach(f => {
                f.x += f.vx;
                if (f.x > W + 50) f.x = -50;
                if (f.x < -50) f.x = W + 50;
            });
        };

        const draw = () => {
            // Background water
            const grad = ctx.createLinearGradient(0, 0, 0, H);
            grad.addColorStop(0, '#0ea5e9'); // cyan
            grad.addColorStop(1, '#0284c7'); // dark blue
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, W, H);

            // Draw Serenito background
            if (serenitoImg.complete) {
                ctx.globalAlpha = 0.3;
                ctx.drawImage(serenitoImg, W / 2 - 120, H / 2 - 100, 240, 240);
                ctx.globalAlpha = 1.0;
            }

            ctx.font = '40px Arial';
            ctx.textAlign = 'center';
            bgFishes.forEach(f => {
                ctx.save();
                ctx.translate(f.x, f.y);
                if (f.vx > 0) ctx.scale(-1, 1);
                ctx.fillText(f.type, 0, 0);
                ctx.restore();
            });

            // Bubbles from jets
            if (leftJet) {
                ctx.fillStyle = 'rgba(255,255,255,0.6)';
                for (let i = 0; i < 8; i++) {
                    ctx.beginPath();
                    ctx.arc(W / 4 - 50 + (Math.random() * 60 - 30), H - Math.random() * 150, Math.random() * 8, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            if (rightJet) {
                ctx.fillStyle = 'rgba(255,255,255,0.6)';
                for (let i = 0; i < 8; i++) {
                    ctx.beginPath();
                    ctx.arc(3 * W / 4 + 50 + (Math.random() * 60 - 30), H - Math.random() * 150, Math.random() * 8, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // Draw Pegs (Las Cañas)
            pegs.forEach(peg => {
                ctx.fillStyle = '#dc2626'; // Red peg base
                ctx.fillRect(peg.x, peg.y, peg.w, peg.h);
                // Top cap
                ctx.fillStyle = '#fca5a5';
                ctx.beginPath();
                ctx.arc(peg.x + peg.w / 2, peg.y, peg.w / 2, 0, Math.PI * 2);
                ctx.fill();
            });

            // Draw Items
            items.forEach((r) => {
                ctx.beginPath();
                ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
                ctx.lineWidth = 4;
                ctx.strokeStyle = r.color;
                ctx.stroke();

                if (r.type === 'fish') {
                    ctx.fillStyle = r.color;
                    ctx.beginPath();
                    // Draw a simple fish body attached to the ring
                    ctx.ellipse(r.x + 22, r.y, 12, 7, 0, 0, Math.PI * 2);
                    ctx.fill();
                    // Tail
                    ctx.beginPath();
                    ctx.moveTo(r.x + 30, r.y);
                    ctx.lineTo(r.x + 42, r.y - 8);
                    ctx.lineTo(r.x + 42, r.y + 8);
                    ctx.closePath();
                    ctx.fill();
                    // Eye
                    ctx.fillStyle = '#1e293b';
                    ctx.beginPath();
                    ctx.arc(r.x + 18, r.y - 2, 2, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            if (!gameStarted) {
                ctx.fillStyle = 'rgba(0,0,0,0.5)';
                ctx.fillRect(0, 0, W, H);
                ctx.fillStyle = '#fff';
                ctx.textAlign = 'center';
                ctx.font = 'bold 30px "Courier New"';
                ctx.fillText("MILAGRO CON SERENITO", W / 2, H / 2 - 20);
                ctx.font = '18px "Courier New"';
                ctx.fillText("Presiona los botones del juego para lanzar agua", W / 2, H / 2 + 20);
            } else {
                ctx.fillStyle = '#fff';
                ctx.textAlign = 'center';
                ctx.font = 'bold 24px "Courier New"';
                ctx.fillText("SCORE: " + score, W / 2, 40);
                if (score >= 100) {
                    ctx.fillStyle = '#fde047';
                    ctx.font = 'bold 45px "Courier New"';
                    ctx.fillText("¡GANASTE!", W / 2, H / 2);
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
            if (btnL) {
                btnL.onmousedown = null; btnL.onmouseup = null; btnL.onmouseleave = null; btnL.ontouchstart = null; btnL.ontouchend = null;
            }
            if (btnR) {
                btnR.onmousedown = null; btnR.onmouseup = null; btnR.onmouseleave = null; btnR.ontouchstart = null; btnR.ontouchend = null;
            }
            cancelAnimationFrame(requestRef.current);
            if (audioCtx) audioCtx.close().catch(() => { });
        };
    }, []);

    return (
        <div className="game-container-inner" style={{ position: 'absolute', inset: 0, zIndex: 5, background: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div style={{ width: '100%', height: '100%', background: '#ef4444', borderRadius: 40, padding: 20, display: 'flex', flexDirection: 'column', position: 'relative', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)' }}>
                {/* Pantalla o Tanque de agua */}
                <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
                    <canvas ref={canvasRef} width={600} height={800} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 20, background: '#0284c7', boxShadow: 'inset 0 0 30px rgba(0,0,0,0.8), 0 5px 15px rgba(0,0,0,0.5)', filter: `brightness(${brightness}%) contrast(${contrast}%)` }} />
                </div>

                {/* Tablero de Botones Físicos en el juguete */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 15, padding: '0 20px', height: '100px' }}>
                    <button
                        id="btn-pe-left"
                        style={{ width: 60, height: 60, borderRadius: '50%', background: '#fde047', boxShadow: '0 8px 0 #ca8a04, inset 0 5px 10px rgba(255,255,255,0.5)', border: '2px solid #ca8a04', cursor: 'pointer', outline: 'none', touchAction: 'none' }}
                    ></button>

                    <div style={{ flex: 1, margin: '0 15px', textAlign: 'center', background: '#fff', borderRadius: 15, padding: '10px 5px', alignSelf: 'center', boxShadow: 'inset 0 3px 10px rgba(0,0,0,0.2)' }}>
                        <h3 style={{ margin: 0, color: '#3b82f6', fontFamily: 'sans-serif', fontStyle: 'italic', fontWeight: '900', fontSize: '1rem' }}>PESCA MILAGRO LS</h3>
                        <span style={{ color: '#94a3b8', fontSize: '0.6rem', fontWeight: 'bold' }}>ComunaSmart</span>
                    </div>

                    <button
                        id="btn-pe-right"
                        style={{ width: 60, height: 60, borderRadius: '50%', background: '#fde047', boxShadow: '0 8px 0 #ca8a04, inset 0 5px 10px rgba(255,255,255,0.5)', border: '2px solid #ca8a04', cursor: 'pointer', outline: 'none', touchAction: 'none' }}
                    ></button>
                </div>
            </div>
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.05), rgba(74, 222, 128, 0.02), rgba(0, 0, 255, 0.05))', backgroundSize: '100% 4px, 6px 100%', zIndex: 10 }}></div>
        </div>
    );
}
