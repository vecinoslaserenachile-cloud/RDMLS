import React, { useEffect, useRef, useState } from 'react';

export default function RetroPong({ brightness, contrast }) {
    const canvasRef = useRef(null);
    const requestRef = useRef();
    const [gameMode, setGameMode] = useState('classic'); // 'classic', 'soccer', 'tennis'
    const [score, setScore] = useState({ p1: 0, p2: 0 });
    const [gameOver, setGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);

    // Refs for physics to avoid closure staleness in loop
    const state = useRef({
        ballX: 400, ballY: 300,
        ballSpeedX: 0, ballSpeedY: 0,
        p1Y: 265, p2Y: 265,
        p1Score: 0, p2Score: 0,
        paddleHeight: 70, paddleWidth: 12,
        upPressed: false, downPressed: false
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const W = 800;
        const H = 600;

        let audioCtx;
        const initAudio = () => { if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)(); };
        const playBeep = (freq = 440) => {
            if (!audioCtx) return;
            try {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'square';
                osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
                gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.1);
                osc.connect(gain); gain.connect(audioCtx.destination);
                osc.start(); osc.stop(audioCtx.currentTime + 0.1);
            } catch (e) { }
        };

        const handleKeyDown = (e) => {
            if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') { e.preventDefault(); state.current.upPressed = true; }
            if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') { e.preventDefault(); state.current.downPressed = true; }
            if (e.key === ' ') {
                e.preventDefault();
                if (gameOver) {
                    setGameOver(false);
                    state.current.p1Score = 0; state.current.p2Score = 0;
                    setScore({ p1: 0, p2: 0 });
                    setGameStarted(false);
                } else if (!gameStarted) {
                    initAudio();
                    setGameStarted(true);
                    const total = state.current.p1Score + state.current.p2Score;
                    state.current.ballSpeedX = (total % 2 === 0) ? 4.5 : -4.5; // Slower initial speed as requested
                    state.current.ballSpeedY = (Math.random() - 0.5) * 6;
                }
            }
        };
        const handleKeyUp = (e) => {
            if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') state.current.upPressed = false;
            if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') state.current.downPressed = false;
        };
        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            const mouseY = e.clientY - rect.top;
            state.current.p1Y = Math.max(0, Math.min(H - state.current.paddleHeight, mouseY - state.current.paddleHeight / 2));
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        canvas.addEventListener('mousemove', handleMouseMove);

        const resetBall = () => {
            setGameStarted(false);
            state.current.ballX = W / 2;
            state.current.ballY = H / 2;
            state.current.ballSpeedX = 0;
            state.current.ballSpeedY = 0;
        };

        const update = () => {
            const s = state.current;
            if (s.upPressed && s.p1Y > 0) s.p1Y -= 8;
            if (s.downPressed && s.p1Y < H - s.paddleHeight) s.p1Y += 8;

            // AI
            const aiCenter = s.p2Y + s.paddleHeight / 2;
            const aiSpeed = gameMode === 'soccer' ? 4 : 5.5; // Soccer AI slightly slower due to large goalie
            if (aiCenter < s.ballY - 15) s.p2Y += aiSpeed;
            if (aiCenter > s.ballY + 15) s.p2Y -= aiSpeed;

            s.ballX += s.ballSpeedX;
            s.ballY += s.ballSpeedY;

            // Wall Bounce
            if (s.ballY < 0 || s.ballY > H) {
                s.ballSpeedY *= -1;
                playBeep(300);
            }

            // Paddle Collision
            const p1Hit = s.ballX < 32 && s.ballY > s.p1Y && s.ballY < s.p1Y + s.paddleHeight;
            const p2Hit = s.ballX > W - 32 && s.ballY > s.p2Y && s.ballY < s.p2Y + s.paddleHeight;

            if (p1Hit) {
                s.ballSpeedX = Math.abs(s.ballSpeedX) + 0.2;
                s.ballSpeedY = (s.ballY - (s.p1Y + s.paddleHeight/2)) * 0.25;
                playBeep(500);
            }
            if (p2Hit) {
                s.ballSpeedX = -Math.abs(s.ballSpeedX) - 0.2;
                s.ballSpeedY = (s.ballY - (s.p2Y + s.paddleHeight/2)) * 0.25;
                playBeep(500);
            }

            // Score
            if (s.ballX < 0) {
                s.p2Score++; setScore({ p1: s.p1Score, p2: s.p2Score });
                if (s.p2Score >= 10) setGameOver(true);
                resetBall();
            }
            if (s.ballX > W) {
                s.p1Score++; setScore({ p1: s.p1Score, p2: s.p2Score });
                if (s.p1Score >= 10) setGameOver(true);
                resetBall();
            }
        };

        const draw = () => {
            // Background by mode
            if (gameMode === 'soccer') {
                ctx.fillStyle = '#15803d'; // Pitch green
                ctx.fillRect(0, 0, W, H);
                // Markings
                ctx.strokeStyle = 'rgba(255,255,255,0.5)';
                ctx.lineWidth = 3;
                ctx.strokeRect(10, 10, W - 20, H - 20);
                ctx.beginPath(); ctx.moveTo(W/2, 10); ctx.lineTo(W/2, H-10); ctx.stroke();
                ctx.beginPath(); ctx.arc(W/2, H/2, 60, 0, Math.PI*2); ctx.stroke();
                // Areas
                ctx.strokeRect(10, H/2 - 120, 100, 240);
                ctx.strokeRect(W - 110, H/2 - 120, 100, 240);
                // Crowd (Dots)
                for(let i=0; i<W; i+=20) {
                    ctx.fillStyle = i%40===0 ? '#f87171' : '#60a5fa';
                    ctx.fillRect(i, 2, 8, 4); ctx.fillRect(i, H-6, 8, 4);
                }
            } else if (gameMode === 'tennis') {
                ctx.fillStyle = '#c2410c'; // Clay
                ctx.fillRect(0, 0, W, H);
                ctx.strokeStyle = '#fff'; ctx.lineWidth = 4;
                ctx.strokeRect(50, 50, W-100, H-100);
                ctx.beginPath(); ctx.moveTo(W/2, 50); ctx.lineTo(W/2, H-50); ctx.stroke();
                // Net
                ctx.strokeStyle = 'rgba(255,255,255,0.3)';
                ctx.setLineDash([5, 5]);
                ctx.beginPath(); ctx.moveTo(W/2, 0); ctx.lineTo(W/2, H); ctx.stroke();
                ctx.setLineDash([]);
            } else {
                ctx.fillStyle = '#0f172a';
                ctx.fillRect(0, 0, W, H);
                ctx.strokeStyle = '#38bdf8'; ctx.setLineDash([10, 10]);
                ctx.beginPath(); ctx.moveTo(W/2, 0); ctx.lineTo(W/2, H); ctx.stroke();
                ctx.setLineDash([]);
            }

            // Ball
            if (gameStarted) {
                ctx.font = '24px Arial';
                ctx.textAlign = 'center';
                const ballIcon = gameMode === 'soccer' ? '⚽' : gameMode === 'tennis' ? '🎾' : '⚪';
                ctx.fillText(ballIcon, state.current.ballX, state.current.ballY + 8);
            }

            // Paddles
            const s = state.current;
            ctx.fillStyle = gameMode === 'classic' ? '#38bdf8' : '#fff';
            if (gameMode === 'tennis') {
                 ctx.font = '40px Arial';
                 ctx.fillText('🏸', 15, s.p1Y + 40);
                 ctx.fillText('🏸', W - 15, s.p2Y + 40);
            } else {
                ctx.fillRect(20, s.p1Y, s.paddleWidth, s.paddleHeight);
                ctx.fillRect(W - 32, s.p2Y, s.paddleWidth, s.paddleHeight);
            }

            // Scores
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 48px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(state.current.p1Score, W/4, 80);
            ctx.fillText(state.current.p2Score, (W/4)*3, 80);
        };

        const loop = () => {
            if (!gameOver && gameStarted) update();
            draw();
            requestRef.current = requestAnimationFrame(loop);
        };
        requestRef.current = requestAnimationFrame(loop);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            canvas.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(requestRef.current);
        };
    }, [gameMode, gameOver, gameStarted]);

    return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 5, background: 'black', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: '800px', display: 'flex', gap: '10px', marginBottom: '10px', padding: '0 20px' }}>
                {['classic', 'soccer', 'tennis'].map(m => (
                    <button 
                        key={m} 
                        onClick={() => setGameMode(m)}
                        style={{ flex: 1, padding: '8px', border: 'none', borderRadius: '4px', background: gameMode === m ? '#ef4444' : '#334155', color: 'white', fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase', fontSize: '0.7rem' }}
                    >
                        {m}
                    </button>
                ))}
            </div>
            
            <div style={{ position: 'relative', width: '100%', height: '100%', maxHeight: '600px', maxWidth: '800px' }}>
                <canvas ref={canvasRef} width={800} height={600} style={{ width: '100%', height: '100%', border: '4px solid #334155', borderRadius: '8px', boxSizing: 'border-box', filter: `brightness(${brightness}%) contrast(${contrast}%)` }} />
                
                {(!gameStarted && !gameOver) && (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', color: 'white', flexDirection: 'column', pointerEvents: 'none' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{gameMode.toUpperCase()} CHALLENGE</h2>
                        <p>PRESIONA ESPACIO PARA SACAR</p>
                    </div>
                )}

                {gameOver && (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.8)', color: 'white', flexDirection: 'column' }}>
                        <h2 style={{ fontSize: '3rem', color: '#ef4444' }}>FIN DEL PARTIDO</h2>
                        <p style={{ fontSize: '1.5rem', margin: '1rem 0' }}>GANADOR: {score.p1 > score.p2 ? 'TÚ' : 'OPONENTE'}</p>
                        <button onClick={() => { setGameOver(false); setGameStarted(false); }} style={{ padding: '1rem 2rem', background: '#ef4444', border: 'none', color: 'white', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold' }}>REINTENTAR</button>
                    </div>
                )}
            </div>
        </div>
    );
}
