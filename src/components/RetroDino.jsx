import React, { useEffect, useRef } from 'react';

export default function RetroDino({ brightness, contrast }) {
    const canvasRef = useRef(null);
    const requestRef = useRef();
    const heroImg = useRef(new Image());
    const bgImg = useRef(new Image());

    useEffect(() => {
        heroImg.current.src = '/serenito.png';
        bgImg.current.src = '/comic-playa.jpg'; // Using existing beach asset

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const W = canvas.width = 600;
        const H = canvas.height = 800;

        let dino = { x: 80, y: H - 80, w: 60, h: 60, velocity: 0, gravity: 0.6, jump: -14, isJumping: false, frame: 0 };
        let obstacles = [];
        let score = 0, frameCount = 0, gameStarted = false, gameOver = false, speed = 7;
        let bgScroll = 0;

        const handleKeyDown = (e) => {
            if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
                e.preventDefault();
                if (!gameStarted || gameOver) {
                    gameStarted = true; gameOver = false; score = 0; frameCount = 0; obstacles = []; speed = 7;
                } else if (!dino.isJumping) {
                    dino.velocity = dino.jump;
                    dino.isJumping = true;
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        const update = () => {
            if (!gameStarted || gameOver) return;
            frameCount++; 
            score += 0.1;
            if (frameCount % 1000 === 0) speed += 0.5;

            bgScroll -= speed * 0.5;
            if (bgScroll <= -W) bgScroll = 0;

            dino.velocity += dino.gravity;
            dino.y += dino.velocity;
            if (dino.y >= H - 80) { 
                dino.y = H - 80; 
                dino.isJumping = false; 
                dino.velocity = 0;
            }

            // Spawn obstacles
            if (Math.random() < 0.02) {
                if (obstacles.length === 0 || W - obstacles[obstacles.length - 1].x > 250) {
                    const type = Math.random() > 0.5 ? 'trash' : 'bird';
                    obstacles.push({ 
                        x: W, 
                        y: type === 'bird' ? H - 150 - Math.random() * 100 : H - 80, 
                        w: 40, 
                        h: 40,
                        type: type
                    });
                }
            }

            for (let i = obstacles.length - 1; i >= 0; i--) {
                obstacles[i].x -= speed;
                if (obstacles[i].x + obstacles[i].w < -50) {
                    obstacles.splice(i, 1);
                    continue;
                }

                // collision
                let o = obstacles[i];
                const hitBoxShrink = 15;
                if (dino.x + hitBoxShrink < o.x + o.w - hitBoxShrink && 
                    dino.x + dino.w - hitBoxShrink > o.x + hitBoxShrink && 
                    dino.y + hitBoxShrink < o.y + o.h - hitBoxShrink && 
                    dino.y + dino.h - hitBoxShrink > o.y + hitBoxShrink) {
                    gameOver = true;
                }
            }
        };

        const draw = () => {
            // Background Sky
            ctx.fillStyle = '#87CEEB'; 
            ctx.fillRect(0, 0, W, H);

            // Draw scrolling beach background
            if (bgImg.current.complete) {
                ctx.globalAlpha = 0.4;
                ctx.drawImage(bgImg.current, bgScroll, 0, W, H);
                ctx.drawImage(bgImg.current, bgScroll + W, 0, W, H);
                ctx.globalAlpha = 1.0;
            }

            // Sand / Floor
            ctx.fillStyle = '#fde68a';
            ctx.fillRect(0, H - 40, W, 40);
            ctx.fillStyle = '#d97706';
            ctx.fillRect(0, H - 42, W, 2); // Shore line

            // Protagonist (Serenito)
            ctx.save();
            // Animation bounce
            let bounce = gameStarted && !gameOver && !dino.isJumping ? Math.sin(frameCount * 0.2) * 5 : 0;
            if (heroImg.current.complete) {
                ctx.drawImage(heroImg.current, dino.x, dino.y + bounce, dino.w, dino.h);
            }
            ctx.font = '60px Arial';
            ctx.fillText('🏃', dino.x, dino.y + 10 + bounce);
            ctx.restore();

            // Obstacles
            ctx.font = '40px Arial';
            obstacles.forEach(o => {
                if (o.type === 'bird') {
                    ctx.fillText('🐦', o.x, o.y + o.h);
                } else {
                    ctx.fillText('🐕', o.x, o.y + o.h);
                }
            });

            // HUD
            ctx.fillStyle = '#1e1b4b'; 
            ctx.font = 'bold 24px monospace'; 
            ctx.textAlign = 'right';
            ctx.fillText(`AV. DEL MAR: ${Math.floor(score)}m`, W - 20, 40);

            if (!gameStarted || gameOver) {
                ctx.fillStyle = 'rgba(0,0,0,0.7)';
                ctx.fillRect(0, 0, W, H);
                ctx.textAlign = 'center'; 
                ctx.fillStyle = gameOver ? '#ef4444' : '#ec4899';
                ctx.font = 'bold 50px monospace';
                ctx.fillText(gameOver ? '¡CUIDADO CON LA BASURA!' : 'TROTANDO EN LA AV. DEL MAR', W / 2, H / 2 - 20);
                
                ctx.fillStyle = '#fff';
                ctx.font = '20px monospace'; 
                ctx.fillText('PRESIONA ESPACIO PARA SALTAR', W / 2, H / 2 + 30);
                if (gameOver) {
                    ctx.fillText(`Distancia lograda: ${Math.floor(score)} metros`, W / 2, H / 2 + 70);
                    ctx.font = 'bold 26px monospace';
                    ctx.fillText('CLICK / ESPACIO PARA REINTENTAR', W / 2, H / 2 + 110);
                }
            }
        };

        const loop = () => { update(); draw(); requestRef.current = requestAnimationFrame(loop); };
        loop();

        return () => { window.removeEventListener('keydown', handleKeyDown); cancelAnimationFrame(requestRef.current); };
    }, []);

    return (
        <div className="game-container-inner" style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', padding: '1rem' }}>
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#f3f4f6', border: '10px solid #333', borderRadius: '20px', boxShadow: '0 0 40px rgba(0,0,0,0.5)' }} />
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(circle, transparent 70%, rgba(0,0,0,0.3) 100%)' }}></div>
        </div>
    );
}
