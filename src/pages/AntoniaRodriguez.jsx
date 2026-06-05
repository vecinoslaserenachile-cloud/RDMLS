import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bike, CheckCircle, ShieldAlert, Download, User, ChevronRight, Sparkles, MapPin, Mountain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import confetti from 'canvas-confetti';
import { logElearningActivity } from '../utils/elearningLogger';
import { playCorrectSound, playErrorSound, playLevelUpSound, playStartSound } from '../utils/soundEffects';

export default function AntoniaRodriguez() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [isLogged, setIsLogged] = useState(false);
    
    const [phase, setPhase] = useState(0); 
    const [feedback, setFeedback] = useState(null);

    // Mini-game state
    const canvasRef = useRef(null);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [wonGame, setWonGame] = useState(false);

    useEffect(() => {
        document.title = "Mountain Bike | Antonia Rodríguez";
        const savedUser = localStorage.getItem('antonia_rodriguez_user');
        const savedEmail = localStorage.getItem('antonia_rodriguez_email');
        if (savedUser && savedEmail) {
            setUserName(savedUser);
            setUserEmail(savedEmail);
            setIsLogged(true);
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        if (userName.trim() && userEmail.trim()) {
            playStartSound();
            setIsLogged(true);
            localStorage.setItem('antonia_rodriguez_user', userName);
            localStorage.setItem('antonia_rodriguez_email', userEmail);
            logElearningActivity('Antonia Rodríguez - Ciclismo', userName, userEmail, 'login');
        }
    };

    const generateDiploma = async () => {
        try {
            const pdfDoc = await PDFDocument.create();
            const page = pdfDoc.addPage([800, 600]);
            const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
            const helveticaRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
            
            page.drawRectangle({ x: 0, y: 0, width: 800, height: 600, color: rgb(0.95, 0.45, 0.1) });
            page.drawRectangle({ x: 20, y: 20, width: 760, height: 560, color: rgb(1, 0.95, 0.9) });
            page.drawRectangle({ x: 30, y: 30, width: 740, height: 540, color: rgb(1, 1, 1) });
            
            page.drawText('ACADEMIA ENTREVECINAS', { x: 260, y: 480, size: 20, font: helveticaFont, color: rgb(0.8, 0.3, 0.1) });
            page.drawText('CERTIFICADO OFICIAL', { x: 230, y: 420, size: 30, font: helveticaFont, color: rgb(0.1, 0.1, 0.1) });
            page.drawText('Certificamos que', { x: 340, y: 360, size: 16, font: helveticaRegular, color: rgb(0.3, 0.3, 0.3) });
            page.drawText(userName.toUpperCase(), { x: 400 - (userName.length * 8), y: 310, size: 30, font: helveticaFont, color: rgb(0.95, 0.45, 0.1) });
            page.drawText('Ha completado con éxito el desafío y es reconocido(a) como:', { x: 180, y: 250, size: 14, font: helveticaRegular, color: rgb(0.3, 0.3, 0.3) });
            page.drawText('CICLISTA EXPERTO(A) EN RUTAS LOCALES', { x: 130, y: 190, size: 24, font: helveticaFont, color: rgb(0.5, 0.3, 0.1) });
            
            const date = new Date().toLocaleDateString();
            page.drawText(`Fecha: ${date}`, { x: 100, y: 100, size: 12, font: helveticaRegular, color: rgb(0.5, 0.5, 0.5) });
            page.drawText('Firma: Entrevecinas', { x: 500, y: 100, size: 12, font: helveticaRegular, color: rgb(0.5, 0.5, 0.5) });

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `Diploma_Ciclismo_${userName.replace(' ', '_')}.pdf`;
            link.click();
            
            logElearningActivity('Antonia Rodríguez - Ciclismo', userName, userEmail, 'diploma_downloaded');
            
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        } catch (e) {
            console.error(e);
            alert('Error generando diploma.');
        }
    };

    // --- GAME LOGIC ---
    useEffect(() => {
        if (phase !== 1 || !gameStarted || gameOver || wonGame) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        let bike = { x: 50, y: 150, width: 40, height: 40, velocityY: 0, gravity: 0.6, jumpPower: -10, isGrounded: true };
        let obstacles = [];
        let frameCount = 0;
        let speed = 4;
        let gameScore = 0;

        const jump = () => {
            if (bike.isGrounded) {
                bike.velocityY = bike.jumpPower;
                bike.isGrounded = false;
            }
        };

        const handleKeyDown = (e) => {
            if (e.code === 'Space' || e.code === 'ArrowUp') jump();
        };

        const handleTouch = () => jump();

        window.addEventListener('keydown', handleKeyDown);
        canvas.addEventListener('touchstart', handleTouch);
        canvas.addEventListener('mousedown', handleTouch);

        const update = () => {
            frameCount++;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw sky and ground
            ctx.fillStyle = '#fef3c7'; // warm sky
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#78716c'; // ground
            ctx.fillRect(0, 190, canvas.width, 10);

            // Update bike
            bike.velocityY += bike.gravity;
            bike.y += bike.velocityY;
            if (bike.y >= 150) {
                bike.y = 150;
                bike.velocityY = 0;
                bike.isGrounded = true;
            }

            // Draw bike (emoji as simple sprite)
            ctx.font = "40px Arial";
            ctx.fillText("🚲", bike.x, bike.y + 35);

            // Generate obstacles
            if (frameCount % 90 === 0) {
                obstacles.push({ x: canvas.width, y: 160, width: 30, height: 30, passed: false });
            }

            // Update and draw obstacles
            for (let i = 0; i < obstacles.length; i++) {
                let obs = obstacles[i];
                obs.x -= speed;
                
                // Draw rock (emoji)
                ctx.font = "30px Arial";
                ctx.fillText("🪨", obs.x, obs.y + 25);

                // Collision detection (approximate bounding boxes)
                if (bike.x < obs.x + 20 && bike.x + 30 > obs.x && bike.y < obs.y + 20 && bike.y + 30 > obs.y) {
                    setGameOver(true);
                    playErrorSound();
                    return; // End game loop
                }

                // Scoring
                if (obs.x + obs.width < bike.x && !obs.passed) {
                    obs.passed = true;
                    gameScore++;
                    setScore(gameScore);
                    if (gameScore >= 5) {
                        setWonGame(true);
                        playLevelUpSound();
                        return; // Win!
                    }
                }
            }

            // Remove off-screen obstacles
            obstacles = obstacles.filter(obs => obs.x + obs.width > 0);

            // Draw Score
            ctx.fillStyle = '#9a3412';
            ctx.font = "bold 20px Outfit, sans-serif";
            ctx.fillText(`Rocas esquivadas: ${gameScore}/5`, 10, 30);

            animationFrameId = requestAnimationFrame(update);
        };

        update();

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            canvas.removeEventListener('touchstart', handleTouch);
            canvas.removeEventListener('mousedown', handleTouch);
            cancelAnimationFrame(animationFrameId);
        };
    }, [phase, gameStarted, gameOver, wonGame]);

    if (!isLogged) {
        return (
            <div style={{ minHeight: '100vh', background: '#fff7ed', color: '#1e293b', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'Outfit', sans-serif" }}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'white', padding: '2rem', borderRadius: '30px', border: '1px solid rgba(249, 115, 22, 0.3)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', maxWidth: '450px', width: '90%', textAlign: 'center' }}>
                    <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #f97316, #c2410c)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 10px 20px rgba(249,115,22,0.3)' }}>
                        <Bike size={40} color="white" />
                    </div>
                    <h1 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '1rem', color: '#c2410c' }}>Rutas en Movimiento</h1>
                    <p style={{ color: '#64748b', marginBottom: '2rem' }}>Acompaña a Antonia Rodríguez a recorrer las rutas de Mountain Bike de nuestra región.</p>
                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ position: 'relative' }}>
                            <User size={20} color="#f97316" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input type="text" placeholder="Tu nombre..." value={userName} onChange={e => setUserName(e.target.value)} style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '15px', border: '1px solid #e2e8f0', background: '#f8fafc', color: '#1e293b', boxSizing: 'border-box' }} required />
                        </div>
                        <input type="email" placeholder="Tu correo electrónico..." value={userEmail} onChange={e => setUserEmail(e.target.value)} style={{ width: '100%', padding: '1rem', borderRadius: '15px', border: '1px solid #e2e8f0', background: '#f8fafc', color: '#1e293b', boxSizing: 'border-box' }} required />
                        <motion.button whileTap={{ scale: 0.95 }} type="submit" style={{ width: '100%', padding: '1.2rem', background: 'linear-gradient(90deg, #f97316, #ea580c)', color: 'white', border: 'none', borderRadius: '15px', fontWeight: '900', fontSize: '1.1rem', cursor: 'pointer', marginTop: '1rem', boxShadow: '0 10px 20px rgba(249,115,22,0.3)' }}>
                            INICIAR RECORRIDO
                        </motion.button>
                    </form>
                    <button type="button" onClick={() => navigate('/entrevecinas')} style={{ background: 'transparent', color: '#94a3b8', border: 'none', marginTop: '1.5rem', cursor: 'pointer', textDecoration: 'underline' }}>Volver al Hub</button>
                </motion.div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#fff7ed', color: '#1e293b', fontFamily: "'Outfit', sans-serif", overflowX: 'hidden' }}>
            <header style={{ padding: '1rem 5%', background: 'white', borderBottom: '1px solid #ffedd5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10, boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ background: '#f97316', padding: '10px', borderRadius: '12px' }}><Bike size={24} color="white" /></div>
                    <div>
                        <div style={{ fontSize: '1.2rem', fontWeight: '900', lineHeight: 1 }}>MOUNTAIN BIKE</div>
                        <div style={{ fontSize: '0.8rem', color: '#ea580c' }}>Antonia Rodríguez</div>
                    </div>
                </div>
                <button onClick={() => navigate('/entrevecinas')} style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', color: '#64748b', padding: '8px 15px', borderRadius: '20px', cursor: 'pointer', fontSize: '0.9rem' }}>Salir</button>
            </header>

            <main style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 5%' }}>
                <AnimatePresence mode="wait">
                    {phase === 0 && (
                        <motion.div key="teoria" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                            <div style={{ background: 'white', padding: '2.5rem 1.5rem', borderRadius: '30px', border: '1px solid #ffedd5', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                                    <div style={{ background: '#ffedd5', padding: '15px', borderRadius: '20px' }}>
                                        <Mountain size={35} color="#f97316" />
                                    </div>
                                    <h2 style={{ fontSize: '2rem', fontWeight: '900', color: '#1e293b', margin: 0 }}>Ciclismo de Montaña</h2>
                                </div>
                                <p style={{ fontSize: '1.15rem', color: '#475569', marginBottom: '1.5rem', lineHeight: '1.7' }}>
                                    La Región de Coquimbo ofrece rutas de nivel mundial para el <strong>Mountain Bike</strong>. Más allá de ser un deporte, es una forma de conectar con la naturaleza, mejorar la salud física y mental, y fomentar el turismo sustentable.
                                </p>
                                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '20px', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                                    <h3 style={{ fontSize: '1.3rem', color: '#c2410c', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}><Bike size={24} /> Desafío Técnico</h3>
                                    <p style={{ color: '#64748b', lineHeight: '1.6' }}>El Mountain Bike requiere equilibrio, concentración y reflejos. En las rutas te encontrarás con terrenos irregulares, raíces y rocas. La clave está en mirar siempre hacia adelante y saber cuándo saltar o esquivar los obstáculos.</p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <motion.button whileTap={{ scale: 0.95 }} onClick={() => setPhase(1)} style={{ background: 'linear-gradient(90deg, #f97316, #ea580c)', color: 'white', border: 'none', padding: '1.2rem 2.5rem', borderRadius: '50px', fontSize: '1.1rem', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 10px 20px rgba(249,115,22,0.3)' }}>
                                        IR A LA PISTA <ChevronRight size={20} />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {phase === 1 && !wonGame && (
                        <motion.div key="game" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                            <div style={{ background: 'white', padding: '2rem 1.5rem', borderRadius: '30px', border: '1px solid #ffedd5', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                                <h2 style={{ fontSize: '2rem', fontWeight: '900', color: '#c2410c', marginBottom: '1rem' }}>Mini-Desafío MTB</h2>
                                <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '2rem' }}>
                                    Ayuda a Antonia a sortear las rocas del camino. <strong>Presiona la barra espaciadora o toca la pantalla</strong> para saltar. ¡Esquiva 5 rocas para ganar!
                                </p>
                                
                                <div style={{ position: 'relative', width: '100%', maxWidth: '600px', margin: '0 auto', border: '4px solid #fed7aa', borderRadius: '20px', overflow: 'hidden', background: '#fef3c7' }}>
                                    <canvas 
                                        ref={canvasRef} 
                                        width={600} 
                                        height={200} 
                                        style={{ width: '100%', display: 'block', cursor: 'pointer' }}
                                    />
                                    {!gameStarted && !gameOver && (
                                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <button onClick={() => setGameStarted(true)} style={{ background: '#f97316', color: 'white', border: 'none', padding: '1rem 2rem', borderRadius: '30px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 5px 15px rgba(249,115,22,0.4)' }}>
                                                JUGAR AHORA
                                            </button>
                                        </div>
                                    )}
                                    {gameOver && (
                                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                            <ShieldAlert size={50} color="#ef4444" style={{ marginBottom: '1rem' }} />
                                            <h3 style={{ fontSize: '1.8rem', fontWeight: '900', margin: 0 }}>¡Ups! Chocaste</h3>
                                            <p style={{ margin: '1rem 0' }}>Esquivaste {score} rocas.</p>
                                            <button onClick={() => { setGameOver(false); setScore(0); setGameStarted(true); }} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '20px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}>
                                                REINTENTAR
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {wonGame && (
                        <motion.div key="win" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                            <div style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', padding: '3rem 1.5rem', borderRadius: '30px', border: '2px solid #fed7aa', textAlign: 'center', boxShadow: '0 20px 50px rgba(249,115,22,0.3)' }}>
                                <div style={{ width: '100px', height: '100px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
                                    <CheckCircle size={60} color="#ea580c" />
                                </div>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem', color: 'white', lineHeight: 1.1 }}>¡Desafío Completado!</h2>
                                <p style={{ fontSize: '1.1rem', color: '#ffedd5', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
                                    ¡Increíbles reflejos! Has logrado completar la ruta demostrando gran destreza en el Mountain Bike.
                                </p>
                                <motion.button whileTap={{ scale: 0.95 }} onClick={generateDiploma} style={{ background: 'white', color: '#c2410c', border: 'none', padding: '1.2rem 2rem', borderRadius: '50px', fontSize: '1.1rem', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', maxWidth: '350px', margin: '0 auto', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
                                    <Download size={24} /> OBTENER DIPLOMA
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
