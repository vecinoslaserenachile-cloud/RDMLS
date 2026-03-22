import React, { useEffect, useRef } from 'react';

export default function RetroAsteroids({ brightness, contrast }) {
    const canvasRef = useRef(null);
    const requestRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const W = canvas.width = 600;
        const H = canvas.height = 800;

        let ship = { x: W / 2, y: H / 2, a: -Math.PI / 2, v: 0, size: 15, thrusting: false };
        let bullets = [];
        let asteroids = [];
        let keys = {};
        let score = 0, gameStarted = false, gameOver = false, frameCount = 0;

        const initGame = () => {
            ship = { x: W / 2, y: H / 2, a: -Math.PI / 2, v: 0, size: 15, thrusting: false };
            bullets = []; asteroids = []; score = 0; frameCount = 0;
            for (let i = 0; i < 5; i++) spawnAsteroid();
        };

        const spawnAsteroid = (x, y, size) => {
            let astX = x || Math.random() * W;
            let astY = y || Math.random() * H;
            if (!x) {
                while (Math.hypot(astX - ship.x, astY - ship.y) < 100) {
                    astX = Math.random() * W; astY = Math.random() * H;
                }
            }
            asteroids.push({
                x: astX, y: astY,
                vx: (Math.random() - 0.5) * 4, vy: (Math.random() - 0.5) * 4,
                size: size || 40,
                vertices: Math.floor(Math.random() * 5) + 5,
                offsets: Array(10).fill(0).map(() => Math.random() * 0.4 + 0.8)
            });
        };

        const handleKeyDown = (e) => {
            keys[e.key] = true;
            if (e.key === ' ') {
                e.preventDefault();
                if (!gameStarted || gameOver) {
                    gameStarted = true; gameOver = false; initGame();
                } else if (bullets.length < 5) {
                    bullets.push({
                        x: ship.x + Math.cos(ship.a) * ship.size,
                        y: ship.y + Math.sin(ship.a) * ship.size,
                        vx: Math.cos(ship.a) * 10, vy: Math.sin(ship.a) * 10,
                        life: 60
                    });
                }
            }
        };
        const handleKeyUp = (e) => { keys[e.key] = false; };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        const update = () => {
            if (!gameStarted || gameOver) return;
            frameCount++;
            if (frameCount % 600 === 0) spawnAsteroid();

            if (keys['ArrowLeft'] || keys['a']) ship.a -= 0.1;
            if (keys['ArrowRight'] || keys['d']) ship.a += 0.1;
            ship.thrusting = keys['ArrowUp'] || keys['w'];
            if (ship.thrusting) {
                ship.x += Math.cos(ship.a) * 4;
                ship.y += Math.sin(ship.a) * 4;
            }

            if (ship.x < 0) ship.x = W; if (ship.x > W) ship.x = 0;
            if (ship.y < 0) ship.y = H; if (ship.y > H) ship.y = 0;

            for (let i = bullets.length - 1; i >= 0; i--) {
                bullets[i].x += bullets[i].vx; bullets[i].y += bullets[i].vy;
                bullets[i].life--;
                if (bullets[i].x < 0) bullets[i].x = W; if (bullets[i].x > W) bullets[i].x = 0;
                if (bullets[i].y < 0) bullets[i].y = H; if (bullets[i].y > H) bullets[i].y = 0;
                if (bullets[i].life <= 0) bullets.splice(i, 1);
            }

            for (let j = asteroids.length - 1; j >= 0; j--) {
                let ast = asteroids[j];
                ast.x += ast.vx; ast.y += ast.vy;
                if (ast.x < -ast.size) ast.x = W + ast.size; if (ast.x > W + ast.size) ast.x = -ast.size;
                if (ast.y < -ast.size) ast.y = H + ast.size; if (ast.y > H + ast.size) ast.y = -ast.size;

                if (Math.hypot(ship.x - ast.x, ship.y - ast.y) < ship.size + ast.size) {
                    gameOver = true;
                }

                for (let i = bullets.length - 1; i >= 0; i--) {
                    if (!bullets[i] || !asteroids[j]) continue;
                    if (Math.hypot(bullets[i].x - ast.x, bullets[i].y - ast.y) < ast.size) {
                        bullets.splice(i, 1);
                        if (ast.size > 20) {
                            spawnAsteroid(ast.x, ast.y, ast.size / 2);
                            spawnAsteroid(ast.x, ast.y, ast.size / 2);
                        }
                        asteroids.splice(j, 1);
                        score += 100;
                        break;
                    }
                }
            }
        };

        const draw = () => {
            ctx.fillStyle = '#111'; ctx.fillRect(0, 0, W, H);

            if (!gameOver && gameStarted) {
                ctx.save();
                ctx.translate(ship.x, ship.y);
                ctx.rotate(ship.a + Math.PI/2);
                ctx.font = '35px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('🧹', 0, 0); // Serenito barriendo/volando

                if (ship.thrusting) {
                    ctx.fillStyle = '#f59e0b';
                    ctx.beginPath();
                    ctx.arc(0, 25 + Math.random()*5, 5, 0, Math.PI*2);
                    ctx.fill();
                }
                ctx.restore();
            }

            ctx.fillStyle = '#fff';
            bullets.forEach(b => { ctx.beginPath(); ctx.arc(b.x, b.y, 2, 0, Math.PI * 2); ctx.fill(); });

            ctx.font = '30px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            asteroids.forEach(a => {
                const sizePx = Math.floor(a.size * 1.5);
                ctx.font = `${sizePx}px Arial`;
                const types = ['🛍️', '🥤', '🗑️', '🛢️', '🥫'];
                const trash = types[a.vertices % types.length];
                ctx.fillText(trash, a.x, a.y);
            });

            ctx.fillStyle = '#fff'; ctx.font = '24px monospace'; ctx.textAlign = 'left';
            ctx.fillText(`SCORE: ${score}`, 20, 30);

            if (!gameStarted || gameOver) {
                ctx.textAlign = 'center'; ctx.font = '40px monospace';
                ctx.fillText(gameOver ? 'GAME OVER' : 'LIMPIANDO LA PLAYA', W / 2, H / 2);
                ctx.font = '16px monospace'; ctx.fillText('ESPACIO / A para purificar, FLECHAS para mover', W / 2, H / 2 + 40);
            }
        };

        const loop = () => { update(); draw(); requestRef.current = requestAnimationFrame(loop); };
        loop();

        return () => { window.removeEventListener('keydown', handleKeyDown); window.removeEventListener('keyup', handleKeyUp); cancelAnimationFrame(requestRef.current); };
    }, []);

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000', filter: `brightness(${brightness}%) contrast(${contrast}%)` }} />;
}
