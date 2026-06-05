import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle, ShieldAlert, Download, User, ChevronRight, Sparkles, PlayCircle, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import confetti from 'canvas-confetti';
import { logElearningActivity } from '../utils/elearningLogger';
import { playCorrectSound, playErrorSound, playLevelUpSound, playStartSound } from '../utils/soundEffects';

export default function AuroraPortal() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [isLogged, setIsLogged] = useState(false);
    
    const [phase, setPhase] = useState(0); 
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        document.title = "La Gran Aurora | Entrevecinas";
        const savedUser = localStorage.getItem('aurora_user');
        const savedEmail = localStorage.getItem('aurora_email');
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
            localStorage.setItem('aurora_user', userName);
            localStorage.setItem('aurora_email', userEmail);
            logElearningActivity('Aurora - Entrevista', userName, userEmail, 'login');
        }
    };

    const handleAnswer = (isCorrect, explanation) => {
        if (isCorrect) {
            setScore(score + 1);
            playCorrectSound();
        } else {
            playErrorSound();
        }

        setFeedback({ isCorrect, text: explanation });
        
        setTimeout(() => {
            setFeedback(null);
            if (isCorrect) {
                if (phase === 4) {
                    playLevelUpSound();
                }
                setPhase(phase + 1);
            }
        }, 4000);
    };

    const generateDiploma = async () => {
        try {
            const pdfDoc = await PDFDocument.create();
            const page = pdfDoc.addPage([800, 600]);
            const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
            const helveticaRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
            
            page.drawRectangle({ x: 0, y: 0, width: 800, height: 600, color: rgb(0.3, 0.1, 0.6) });
            page.drawRectangle({ x: 20, y: 20, width: 760, height: 560, color: rgb(0.95, 0.9, 1) });
            page.drawRectangle({ x: 30, y: 30, width: 740, height: 540, color: rgb(1, 1, 1) });
            
            page.drawText('ACADEMIA ENTREVECINAS', { x: 260, y: 480, size: 20, font: helveticaFont, color: rgb(0.4, 0.1, 0.8) });
            page.drawText('CERTIFICADO OFICIAL', { x: 230, y: 420, size: 30, font: helveticaFont, color: rgb(0.1, 0.1, 0.1) });
            page.drawText('Certificamos que', { x: 340, y: 360, size: 16, font: helveticaRegular, color: rgb(0.3, 0.3, 0.3) });
            page.drawText(userName.toUpperCase(), { x: 400 - (userName.length * 8), y: 310, size: 30, font: helveticaFont, color: rgb(0.5, 0.1, 0.8) });
            page.drawText('Ha completado con éxito la actividad y es reconocido(a) como:', { x: 180, y: 250, size: 14, font: helveticaRegular, color: rgb(0.3, 0.3, 0.3) });
            page.drawText('APRECIADOR(A) CULTURAL', { x: 230, y: 190, size: 24, font: helveticaFont, color: rgb(0.8, 0.6, 0.1) });
            
            const date = new Date().toLocaleDateString();
            page.drawText(`Fecha: ${date}`, { x: 100, y: 100, size: 12, font: helveticaRegular, color: rgb(0.5, 0.5, 0.5) });
            page.drawText('Firma: Entrevecinas', { x: 500, y: 100, size: 12, font: helveticaRegular, color: rgb(0.5, 0.5, 0.5) });

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `Diploma_Aurora_${userName.replace(' ', '_')}.pdf`;
            link.click();
            
            logElearningActivity('Aurora - Entrevista', userName, userEmail, 'diploma_downloaded');
            
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        } catch (e) {
            console.error(e);
            alert('Error generando diploma.');
        }
    };

    if (!isLogged) {
        return (
            <div style={{ minHeight: '100vh', background: '#faf5ff', color: '#1e293b', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'Outfit', sans-serif" }}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'white', padding: '2rem', borderRadius: '30px', border: '1px solid rgba(139, 92, 246, 0.3)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', maxWidth: '450px', width: '90%', textAlign: 'center' }}>
                    <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #8b5cf6, #5b21b6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 10px 20px rgba(139,92,246,0.3)' }}>
                        <Star size={40} color="white" />
                    </div>
                    <h1 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '1rem', color: '#5b21b6' }}>La Gran Aurora</h1>
                    <p style={{ color: '#64748b', marginBottom: '2rem' }}>Acompaña a Aurora en esta inspiradora entrevista y demuestra tu apreciación cultural.</p>
                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ position: 'relative' }}>
                            <User size={20} color="#8b5cf6" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input type="text" placeholder="Tu nombre..." value={userName} onChange={e => setUserName(e.target.value)} style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '15px', border: '1px solid #e2e8f0', background: '#f8fafc', color: '#1e293b', boxSizing: 'border-box' }} required />
                        </div>
                        <input type="email" placeholder="Tu correo electrónico..." value={userEmail} onChange={e => setUserEmail(e.target.value)} style={{ width: '100%', padding: '1rem', borderRadius: '15px', border: '1px solid #e2e8f0', background: '#f8fafc', color: '#1e293b', boxSizing: 'border-box' }} required />
                        <motion.button whileTap={{ scale: 0.95 }} type="submit" style={{ width: '100%', padding: '1.2rem', background: 'linear-gradient(90deg, #8b5cf6, #5b21b6)', color: 'white', border: 'none', borderRadius: '15px', fontWeight: '900', fontSize: '1.1rem', cursor: 'pointer', marginTop: '1rem', boxShadow: '0 10px 20px rgba(139,92,246,0.3)' }}>
                            ENTRAR A LA SESIÓN
                        </motion.button>
                    </form>
                    <button type="button" onClick={() => navigate('/entrevecinas')} style={{ background: 'transparent', color: '#94a3b8', border: 'none', marginTop: '1.5rem', cursor: 'pointer', textDecoration: 'underline' }}>Volver al Hub</button>
                </motion.div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#faf5ff', color: '#1e293b', fontFamily: "'Outfit', sans-serif", overflowX: 'hidden' }}>
            <header style={{ padding: '1rem 5%', background: 'white', borderBottom: '1px solid #f3e8ff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10, boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ background: '#8b5cf6', padding: '10px', borderRadius: '12px' }}><Star size={24} color="white" /></div>
                    <div>
                        <div style={{ fontSize: '1.2rem', fontWeight: '900', lineHeight: 1 }}>LA GRAN AURORA</div>
                        <div style={{ fontSize: '0.8rem', color: '#5b21b6' }}>Especial Cultural</div>
                    </div>
                </div>
                <button onClick={() => navigate('/entrevecinas')} style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', color: '#64748b', padding: '8px 15px', borderRadius: '20px', cursor: 'pointer', fontSize: '0.9rem' }}>Salir</button>
            </header>

            <main style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 5%' }}>
                {phase > 1 && phase < 5 && (
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '2rem' }}>
                        {[2, 3, 4].map(p => (
                            <div key={p} style={{ flex: 1, height: '8px', borderRadius: '4px', background: phase >= p ? '#8b5cf6' : '#f3e8ff', transition: '0.3s', boxShadow: phase >= p ? '0 0 10px rgba(139,92,246,0.5)' : 'none' }} />
                        ))}
                    </div>
                )}

                <AnimatePresence mode="wait">
                    {feedback && (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} style={{ background: feedback.isCorrect ? '#dcfce7' : '#fee2e2', border: `2px solid ${feedback.isCorrect ? '#22c55e' : '#ef4444'}`, padding: '1.5rem', borderRadius: '20px', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '15px', boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}>
                            {feedback.isCorrect ? <CheckCircle size={40} color="#22c55e" style={{ flexShrink: 0 }} /> : <ShieldAlert size={40} color="#ef4444" style={{ flexShrink: 0 }} />}
                            <span style={{ fontSize: '1.1rem', color: feedback.isCorrect ? '#166534' : '#991b1b', fontWeight: 'bold' }}>{feedback.text}</span>
                        </motion.div>
                    )}

                    {phase === 0 && (
                        <motion.div key="video" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                            <div style={{ background: 'white', padding: '2.5rem 1.5rem', borderRadius: '30px', border: '1px solid #f3e8ff', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                                    <div style={{ background: '#f5f3ff', padding: '15px', borderRadius: '20px' }}>
                                        <Video size={35} color="#8b5cf6" />
                                    </div>
                                    <h2 style={{ fontSize: '2rem', fontWeight: '900', color: '#1e293b', margin: 0 }}>Entrevista Exclusiva</h2>
                                </div>
                                <p style={{ fontSize: '1.15rem', color: '#475569', marginBottom: '1.5rem', lineHeight: '1.7' }}>
                                    Disfruta de esta enriquecedora charla con <strong>La Gran Aurora</strong>. Te invitamos a ver el video completo para empaparte de su sabiduría antes de pasar a la evaluación.
                                </p>
                                
                                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '20px', marginBottom: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                                    <iframe 
                                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                                        src="https://www.youtube.com/embed/3Qr6w83Iqaw" 
                                        title="La gran aurora" 
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowFullScreen>
                                    </iframe>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <motion.button whileTap={{ scale: 0.95 }} onClick={() => { setPhase(1); }} style={{ background: 'linear-gradient(90deg, #8b5cf6, #5b21b6)', color: 'white', border: 'none', padding: '1.2rem 2.5rem', borderRadius: '50px', fontSize: '1.1rem', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 10px 20px rgba(139,92,246,0.3)' }}>
                                        YA VI EL VIDEO <ChevronRight size={20} />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {phase === 1 && (
                        <motion.div key="intro-trivia" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                            <div style={{ background: 'white', padding: '2.5rem 1.5rem', borderRadius: '30px', border: '1px solid #f3e8ff', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                                <div style={{ background: '#f5f3ff', padding: '15px', borderRadius: '50%', display: 'inline-flex', marginBottom: '1rem' }}>
                                    <Sparkles size={40} color="#8b5cf6" />
                                </div>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem', color: '#1e293b' }}>Evaluación Cultural</h2>
                                <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '2rem', lineHeight: '1.6', maxWidth: '500px', margin: '0 auto 2rem' }}>
                                    Demuestra que prestaste atención a las sabias palabras y al mensaje transmitido en el video. ¡Completa este cuestionario para obtener tu diploma!
                                </p>
                                <motion.button whileTap={{ scale: 0.95 }} onClick={() => { playStartSound(); setPhase(2); }} style={{ background: 'linear-gradient(90deg, #8b5cf6, #5b21b6)', color: 'white', border: 'none', padding: '1.2rem 3rem', borderRadius: '50px', fontSize: '1.2rem', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', margin: '0 auto', boxShadow: '0 10px 20px rgba(139,92,246,0.3)' }}>
                                    COMENZAR EVALUACIÓN <ChevronRight size={24} />
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    {phase === 2 && !feedback && (
                        <motion.div key="p1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div style={{ background: 'white', padding: '2rem 1.5rem', borderRadius: '30px', border: '1px solid #f3e8ff', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                                    <div style={{ background: '#8b5cf6', padding: '12px', borderRadius: '15px' }}><PlayCircle size={30} color="white" /></div>
                                    <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#1e293b', margin: 0 }}>El Mensaje Principal</h2>
                                </div>
                                <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '2rem', lineHeight: '1.6' }}>En base a la entrevista de Aurora, ¿cuál de las siguientes opciones describe mejor el espíritu de su mensaje?</p>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(false, "El enfoque de Aurora no es el aislamiento, sino todo lo contrario.")} className="choice-btn">
                                        <span>Que el arte debe vivirse en soledad y desconexión total del resto.</span>
                                        <ChevronRight size={20} color="#8b5cf6" style={{ flexShrink: 0 }} />
                                    </motion.button>
                                    <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(true, "¡Correcto! Su mensaje resalta la importancia de las raíces, el compartir comunitario y cómo el arte nos une profundamente.")} className="choice-btn">
                                        <span>La conexión profunda con nuestras raíces y la comunidad a través de la expresión artística y cultural.</span>
                                        <ChevronRight size={20} color="#8b5cf6" style={{ flexShrink: 0 }} />
                                    </motion.button>
                                    <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(false, "La entrevista trata temas más profundos que el puro éxito comercial.")} className="choice-btn">
                                        <span>Únicamente cómo conseguir el éxito comercial rápido.</span>
                                        <ChevronRight size={20} color="#8b5cf6" style={{ flexShrink: 0 }} />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {phase === 3 && !feedback && (
                        <motion.div key="p2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div style={{ background: 'white', padding: '2rem 1.5rem', borderRadius: '30px', border: '1px solid #f3e8ff', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                                    <div style={{ background: '#8b5cf6', padding: '12px', borderRadius: '15px' }}><Star size={30} color="white" /></div>
                                    <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#1e293b', margin: 0 }}>La Inspiración</h2>
                                </div>
                                <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '2rem', lineHeight: '1.6' }}>¿Qué papel juega el entorno local (la ciudad, los vecinos, el paisaje) en la obra y visión de un artista según lo discutido?</p>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(false, "Al contrario, el entorno es la fuente principal de energía e inspiración.")} className="choice-btn">
                                        <span>Es irrelevante, la inspiración siempre viene de fuera.</span>
                                        <ChevronRight size={20} color="#8b5cf6" style={{ flexShrink: 0 }} />
                                    </motion.button>
                                    <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(true, "¡Exacto! El entorno, los vecinos y el paisaje no son solo un escenario, sino que nutren de manera constante la identidad de la obra.")} className="choice-btn">
                                        <span>Es el motor creativo y una fuente inagotable de identidad e historias compartidas.</span>
                                        <ChevronRight size={20} color="#8b5cf6" style={{ flexShrink: 0 }} />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {phase === 4 && !feedback && (
                        <motion.div key="p3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div style={{ background: 'white', padding: '2rem 1.5rem', borderRadius: '30px', border: '1px solid #f3e8ff', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                                    <div style={{ background: '#8b5cf6', padding: '12px', borderRadius: '15px' }}><Star size={30} color="white" /></div>
                                    <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#1e293b', margin: 0 }}>El Futuro Cultural</h2>
                                </div>
                                <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '2rem', lineHeight: '1.6' }}>Si quisieras aplicar el mensaje de Aurora a tu propia vida, ¿qué pequeña acción podrías tomar hoy mismo?</p>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(false, "El mensaje se trata de compartir y potenciar nuestra cultura local.")} className="choice-btn">
                                        <span>Aislarme y no participar en actividades con mis vecinos.</span>
                                        <ChevronRight size={20} color="#8b5cf6" style={{ flexShrink: 0 }} />
                                    </motion.button>
                                    <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(true, "¡Así es! Involucrarte y participar activamente es la mejor manera de mantener viva nuestra cultura y comunidad.")} className="choice-btn">
                                        <span>Apoyar las iniciativas locales y compartir saberes con la comunidad y los vecinos.</span>
                                        <ChevronRight size={20} color="#8b5cf6" style={{ flexShrink: 0 }} />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {phase === 5 && !feedback && (
                        <motion.div key="p4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                            <div style={{ background: 'linear-gradient(135deg, #8b5cf6, #5b21b6)', padding: '3rem 1.5rem', borderRadius: '30px', border: '2px solid #ddd6fe', textAlign: 'center', boxShadow: '0 20px 50px rgba(139,92,246,0.3)' }}>
                                <div style={{ width: '100px', height: '100px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
                                    <Star size={50} color="#5b21b6" />
                                </div>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem', color: 'white', lineHeight: 1.1 }}>¡Evaluación Superada!</h2>
                                <p style={{ fontSize: '1.1rem', color: '#f3e8ff', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
                                    Has interiorizado perfectamente el valioso mensaje de La Gran Aurora. Eres parte vital del corazón cultural de nuestra comunidad.
                                </p>
                                <motion.button whileTap={{ scale: 0.95 }} onClick={generateDiploma} style={{ background: 'white', color: '#5b21b6', border: 'none', padding: '1.2rem 2rem', borderRadius: '50px', fontSize: '1.1rem', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', maxWidth: '350px', margin: '0 auto', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
                                    <Download size={24} /> OBTENER DIPLOMA
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <style jsx>{`
                .choice-btn {
                    background: #f8fafc;
                    border: 2px solid #e2e8f0;
                    color: #1e293b;
                    padding: 1.2rem;
                    border-radius: 20px;
                    font-size: 1.05rem;
                    text-align: left;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 15px;
                    line-height: 1.4;
                    width: 100%;
                    box-sizing: border-box;
                }
                .choice-btn:hover {
                    background: #f5f3ff;
                    border-color: #8b5cf6;
                }
            `}</style>
        </div>
    );
}
