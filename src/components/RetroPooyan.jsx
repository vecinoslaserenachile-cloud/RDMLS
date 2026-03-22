import React, { useEffect, useRef } from 'react';

export default function RetroPooyan({ brightness, contrast }) {
    const canvasRef = useRef(null);
    const requestRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const W = 800;
        const H = 600;
        
        // Asignamos explícitamente el tamaño de resolución
        canvas.width = W;
        canvas.height = H;

        let pigY = H / 2;
        let pigX = W - 60;
        let upPressed = false;
        let downPressed = false;
        let spacePressed = false;

        let arrows = [];
        let balloons = [];
        let pirates = [];
        let clouds = [];
        let birds = [];

        let score = 0;
        let level = 1;
        let gameStarted = false;
        let frameCount = 0;
        let gameOver = false;
        let lives = 5;

        // Init decorative clouds
        for (let i = 0; i < 5; i++) {
            clouds.push({ x: Math.random() * W, y: Math.random() * (H / 2), speed: 0.2 + Math.random() * 0.5, size: 30 + Math.random() * 40 });
        }

        const imgHero = new Image();
        imgHero.src = '/serenito.png';

        const drawPirate = (x, y) => {
            ctx.font = '24px Arial';
            ctx.fillText('🏴‍☠️', x, y + 10);
        };

        const handleKeyDown = (e) => {
            if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') { e.preventDefault(); upPressed = true; }
            if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') { e.preventDefault(); downPressed = true; }
            if (e.key === ' ') {
                e.preventDefault();
                if (!gameStarted || gameOver) {
                    gameStarted = true;
                    gameOver = false;
                    score = 0;
                    level = 1;
                    lives = 5;
                    balloons = [];
                    arrows = [];
                    pirates = [];
                    birds = [];
                    pigY = H / 2;
                } else {
                    if (!spacePressed) {
                        arrows.push({ x: pigX, y: pigY });
                        spacePressed = true;
                    }
                }
            }
        };

        const handleKeyUp = (e) => {
            if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') { upPressed = false; }
            if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') { downPressed = false; }
            if (e.key === ' ') { spacePressed = false; }
        };

        window.addEventListener('keydown', handleKeyDown, { passive: false });
        window.addEventListener('keyup', handleKeyUp, { passive: false });

        const drawPig = (x, y) => {
            if (imgHero.complete && imgHero.naturalHeight !== 0) {
                ctx.drawImage(imgHero, x - 15, y - 25, 50, 50);
            } else {
                ctx.fillStyle = '#ffb6c1';
                ctx.fillRect(x, y - 15, 30, 30);
                ctx.fillStyle = '#fff';
                ctx.fillRect(x - 5, y - 5, 10, 10);
            }
        };

        const drawCloud = (x, y, radius) => {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.beginPath();
            ctx.arc(x, y, radius, Math.PI * 0.5, Math.PI * 1.5);
            ctx.arc(x + radius, y - radius * 0.5, radius * 0.9, Math.PI * 1, Math.PI * 1.85);
            ctx.arc(x + radius * 2, y, radius, Math.PI * 1.5, Math.PI * 0.5);
            ctx.fill();
        };

        const update = () => {
            if (gameOver || !gameStarted) return;
            frameCount++;

            // Level progression
            level = Math.floor(score / 200) + 1;

            if (upPressed && pigY > 20) pigY -= 5;
            if (downPressed && pigY < H - 20) pigY += 5;

            // Spawn balloons (more frequent at higher levels)
            const spawnRate = Math.max(20, 60 - level * 5);
            if (frameCount % spawnRate === 0) {
                balloons.push({
                    x: Math.random() * (W - 150) + 30, // Usa más ancho de pantalla
                    y: -20,
                    speed: 1 + (level * 0.2) + Math.random() * 1.5
                });
            }

            // Spawn birds (decorative / dynamic element)
            if (frameCount % 300 === 0) {
                birds.push({ x: -30, y: Math.random() * (H / 2) + 50, speed: 2 + Math.random() * 2 });
            }

            // Update clouds
            clouds.forEach(c => {
                c.x += c.speed;
                if (c.x > W + 100) {
                    c.x = -100;
                    c.y = Math.random() * (H / 2);
                }
            });

            // Update birds
            for (let i = birds.length - 1; i >= 0; i--) {
                birds[i].x += birds[i].speed;
                // wavy flight path
                birds[i].y += Math.sin(frameCount * 0.05) * 1.5;
                if (birds[i].x > W + 50) birds.splice(i, 1);
            }

            // Update arrows
            for (let i = arrows.length - 1; i >= 0; i--) {
                arrows[i].x -= 7 + (level * 0.5);
                if (arrows[i].x < 0) arrows.splice(i, 1);
            }

            // Update balloons
            for (let i = balloons.length - 1; i >= 0; i--) {
                balloons[i].y += balloons[i].speed;
                if (balloons[i].y > H - 40) {
                    pirates.push({ x: balloons[i].x - 10, y: H - 38, state: 'running' });
                    balloons.splice(i, 1);
                }
            }

            // Update running pirates
            for (let i = pirates.length - 1; i >= 0; i--) {
                if (pirates[i].state === 'running') {
                    pirates[i].x += 1.5 + (level * 0.1);
                    if (pirates[i].x >= pigX - 10) {
                        pirates[i].x = pigX - 10;
                        pirates[i].state = 'climbing';
                    }
                } else if (pirates[i].state === 'climbing') {
                    pirates[i].y -= 1.5 + (level * 0.1);
                    if (pirates[i].y <= pigY + 25 && pirates[i].y >= pigY - 25) {
                        lives--;
                        pirates.splice(i, 1);
                        if (lives <= 0) gameOver = true;
                    } else if (pirates[i].y < -20) {
                        pirates.splice(i, 1);
                    }
                }
            }

            // Collisions Arrows vs Balloons logic
            for (let i = arrows.length - 1; i >= 0; i--) {
                for (let j = balloons.length - 1; j >= 0; j--) {
                    if (!arrows[i] || !balloons[j]) continue;
                    let dx = arrows[i].x - balloons[j].x;
                    let dy = arrows[i].y - balloons[j].y;
                    let dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 25) {
                        arrows.splice(i, 1);
                        balloons.splice(j, 1);
                        score += 10;
                        break;
                    }
                }

                for (let j = pirates.length - 1; j >= 0; j--) {
                    if (!arrows[i] || !pirates[j]) continue;
                    let dx = arrows[i].x - (pirates[j].x + 10);
                    let dy = arrows[i].y - (pirates[j].y + 10);
                    if (Math.abs(dx) < 25 && Math.abs(dy) < 25) {
                        arrows.splice(i, 1);
                        pirates.splice(j, 1);
                        score += 20;
                        break;
                    }
                }
            }
        };

        const draw = () => {
            // Background Sky
            const gradient = ctx.createLinearGradient(0, 0, 0, H);
            gradient.addColorStop(0, '#0ea5e9'); // Cielo diurno
            gradient.addColorStop(1, '#3b82f6');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, W, H);

            // Draw clouds
            clouds.forEach(c => drawCloud(c.x, c.y, c.size));
            
            // Draw birds
            ctx.font = '24px Arial';
            birds.forEach(b => ctx.fillText('🕊️', b.x, b.y));

            // Floor
            ctx.fillStyle = '#1e293b';
            ctx.fillRect(0, H - 20, W, 20);

            // Ladder
            ctx.fillStyle = '#78350f';
            ctx.fillRect(pigX + 5, 0, 5, H);
            ctx.fillRect(pigX + 30, 0, 5, H);
            for (let ly = 10; ly < H; ly += 25) {
                ctx.fillRect(pigX + 5, ly, 30, 4);
            }

            drawPig(pigX, pigY);

            // Arrows
            ctx.fillStyle = '#fff';
            arrows.forEach(a => {
                ctx.fillRect(a.x - 10, a.y - 2, 20, 4);
            });

            // Balloons (Yellow with Black pattern to represent pirates as requested)
            balloons.forEach(b => {
                ctx.fillStyle = '#facc15'; // Amarillo
                ctx.beginPath();
                ctx.arc(b.x, b.y, 18, 0, Math.PI * 2);
                ctx.fill();
                
                // Raya negra al globo
                ctx.fillStyle = '#000';
                ctx.fillRect(b.x - 18, b.y - 4, 36, 8);

                // Hilo
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(b.x, b.y + 18);
                ctx.lineTo(b.x, b.y + 45); // Hace el hilo más largo
                ctx.stroke();

                drawPirate(b.x - 12, b.y + 35);
            });

            // Running pirates
            pirates.forEach(p => {
                drawPirate(p.x, p.y - 10);
            });

            // HUD
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(0, 0, W, 50);

            ctx.font = 'bold 24px "Courier New", monospace';
            ctx.fillStyle = '#fff';
            ctx.textAlign = 'left';
            ctx.fillText(`SCORE: ${score}`, 20, 35);

            ctx.textAlign = 'center';
            ctx.fillStyle = '#facc15';
            ctx.fillText(`NIVEL: ${level}`, W / 2, 35);

            ctx.textAlign = 'right';
            ctx.fillStyle = '#ef4444';
            ctx.fillText(`VIDAS: ${'❤️'.repeat(lives)}`, W - 20, 35);

            if (!gameStarted) {
                ctx.fillStyle = 'rgba(0,0,0,0.7)';
                ctx.fillRect(0, 0, W, H);
                ctx.textAlign = 'center';
                ctx.fillStyle = '#0f0';
                ctx.font = 'bold 36px "Courier New"';
                ctx.fillText("BALLOON DEFENDER LS", W / 2, H / 2 - 40);
                ctx.fillStyle = '#fff';
                ctx.font = '24px "Courier New"';
                ctx.fillText("PRESIONA ESPACIO PARA INICIAR", W / 2, H / 2 + 10);
                ctx.font = '16px "Courier New"';
                ctx.fillText("Usa W/S (Flechas) para subir/bajar, ESPACIO para disparar", W / 2, H / 2 + 50);
            } else if (gameOver) {
                ctx.fillStyle = 'rgba(0,0,0,0.8)';
                ctx.fillRect(0, 0, W, H);
                ctx.textAlign = 'center';
                ctx.fillStyle = '#f00';
                ctx.font = 'bold 40px "Courier New"';
                ctx.fillText("GAME OVER", W / 2, H / 2 - 20);
                ctx.fillStyle = '#fff';
                ctx.font = '24px "Courier New"';
                ctx.fillText(`PUNTAJE FINAL: ${score} (Nivel ${level})`, W / 2, H / 2 + 20);
                ctx.fillText("PRESIONA ESPACIO PARA REINTENTAR", W / 2, H / 2 + 60);
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
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 5, background: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <canvas ref={canvasRef} width={800} height={600} style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#0a0a0a', filter: `brightness(${brightness}%) contrast(${contrast}%) blur(0.5px)` }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.05), rgba(74, 222, 128, 0.02), rgba(0, 0, 255, 0.05))', backgroundSize: '100% 4px, 6px 100%', pointerEvents: 'none', zIndex: 10 }}></div>
        </div>
    );
}
