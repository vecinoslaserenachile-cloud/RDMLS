import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, TreePine, CheckCircle, ShieldAlert, Leaf, Download, User, ChevronRight, Sparkles, Waves, ArrowUp, Droplets } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import confetti from 'canvas-confetti';
import { logElearningActivity } from '../utils/elearningLogger';
import { playCorrectSound, playErrorSound, playLevelUpSound, playStartSound } from '../utils/soundEffects';

export default function PaulinaGodoy() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [isLogged, setIsLogged] = useState(false);
    
    const [phase, setPhase] = useState(0); // 0 = Intro, 1 = Q1, 2 = Q2, 3 = Q3, 4 = Diploma
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        document.title = "Plan Maestro El Culebrón | Paulina Godoy";
        const savedUser = localStorage.getItem('paulina_godoy_user');
        const savedEmail = localStorage.getItem('paulina_godoy_email');
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
            localStorage.setItem('paulina_godoy_user', userName);
            localStorage.setItem('paulina_godoy_email', userEmail);
            logElearningActivity('Paulina Godoy - Urbanismo', userName, userEmail, 'login');
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
            
            page.drawRectangle({ x: 0, y: 0, width: 800, height: 600, color: rgb(0.02, 0.2, 0.1) });
            page.drawRectangle({ x: 20, y: 20, width: 760, height: 560, color: rgb(0.05, 0.3, 0.15) });
            page.drawRectangle({ x: 30, y: 30, width: 740, height: 540, color: rgb(1, 1, 1) });
            
            page.drawText('ACADEMIA ENTREVECINAS', { x: 260, y: 480, size: 20, font: helveticaFont, color: rgb(0.1, 0.4, 0.2) });
            page.drawText('CERTIFICADO OFICIAL', { x: 230, y: 420, size: 30, font: helveticaFont, color: rgb(0.1, 0.1, 0.1) });
            page.drawText('Certificamos que', { x: 340, y: 360, size: 16, font: helveticaRegular, color: rgb(0.3, 0.3, 0.3) });
            page.drawText(userName.toUpperCase(), { x: 400 - (userName.length * 8), y: 310, size: 30, font: helveticaFont, color: rgb(0.1, 0.4, 0.2) });
            page.drawText('Ha completado con éxito la capacitación y es reconocido(a) como:', { x: 180, y: 250, size: 14, font: helveticaRegular, color: rgb(0.3, 0.3, 0.3) });
            page.drawText('URBANISTA DE INFRAESTRUCTURA VERDE', { x: 130, y: 190, size: 24, font: helveticaFont, color: rgb(0.8, 0.5, 0.1) });
            
            const date = new Date().toLocaleDateString();
            page.drawText(`Fecha: ${date}`, { x: 100, y: 100, size: 12, font: helveticaRegular, color: rgb(0.5, 0.5, 0.5) });
            page.drawText('Firma: Entrevecinas', { x: 500, y: 100, size: 12, font: helveticaRegular, color: rgb(0.5, 0.5, 0.5) });

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `Diploma_Urbanismo_${userName.replace(' ', '_')}.pdf`;
            link.click();
            
            logElearningActivity('Paulina Godoy - Urbanismo', userName, userEmail, 'diploma_downloaded');
            
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        } catch (e) {
            console.error(e);
            alert('Error generando diploma.');
        }
    };

    if (!isLogged) {
        return (
            <div style={{ minHeight: '100vh', background: '#022c22', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'Outfit', sans-serif" }}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'rgba(6, 78, 59, 0.6)', padding: '2rem', borderRadius: '30px', border: '1px solid rgba(16, 185, 129, 0.3)', backdropFilter: 'blur(20px)', maxWidth: '450px', width: '90%', textAlign: 'center' }}>
                    <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #10b981, #047857)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 10px 20px rgba(16,185,129,0.3)' }}>
                        <TreePine size={40} color="white" />
                    </div>
                    <h1 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '1rem' }}>Humedal El Culebrón</h1>
                    <p style={{ color: '#6ee7b7', marginBottom: '2rem' }}>Aprende sobre Infraestructura Verde y Planificación Urbana con la arquitecta Paulina Godoy.</p>
                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ position: 'relative' }}>
                            <User size={20} color="#6ee7b7" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input type="text" placeholder="Tu nombre completo..." value={userName} onChange={e => setUserName(e.target.value)} style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.3)', color: 'white', boxSizing: 'border-box' }} required />
                        </div>
                        <input type="email" placeholder="Tu correo electrónico..." value={userEmail} onChange={e => setUserEmail(e.target.value)} style={{ width: '100%', padding: '1rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.3)', color: 'white', boxSizing: 'border-box' }} required />
                        <motion.button whileTap={{ scale: 0.95 }} type="submit" style={{ width: '100%', padding: '1.2rem', background: 'linear-gradient(90deg, #10b981, #059669)', color: 'white', border: 'none', borderRadius: '15px', fontWeight: '900', fontSize: '1.1rem', cursor: 'pointer', marginTop: '1rem', boxShadow: '0 10px 20px rgba(16,185,129,0.4)' }}>
                            ENTRAR A LA ACADEMIA
                        </motion.button>
                    </form>
                    <button type="button" onClick={() => navigate('/entrevecinas')} style={{ background: 'transparent', color: '#6ee7b7', border: 'none', marginTop: '1.5rem', cursor: 'pointer', textDecoration: 'underline' }}>Volver al Hub</button>
                </motion.div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#064e3b', color: 'white', fontFamily: "'Outfit', sans-serif", overflowX: 'hidden' }}>
            <header style={{ padding: '1rem 5%', background: 'rgba(0,0,0,0.4)', borderBottom: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10, backdropFilter: 'blur(10px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ background: '#10b981', padding: '10px', borderRadius: '12px' }}><Map size={24} color="white" /></div>
                    <div>
                        <div style={{ fontSize: '1.2rem', fontWeight: '900', lineHeight: 1 }}>PLAN MAESTRO</div>
                        <div style={{ fontSize: '0.8rem', color: '#6ee7b7' }}>Arq. Paulina Godoy</div>
                    </div>
                </div>
                <button onClick={() => navigate('/entrevecinas')} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '8px 15px', borderRadius: '20px', cursor: 'pointer', fontSize: '0.9rem' }}>Salir</button>
            </header>

            <main style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 5%' }}>
                {/* Progress Bar */}
                {phase > 1 && phase < 5 && (
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '2rem' }}>
                        {[2, 3, 4].map(p => (
                            <div key={p} style={{ flex: 1, height: '8px', borderRadius: '4px', background: phase >= p ? '#10b981' : 'rgba(255,255,255,0.1)', transition: '0.3s', boxShadow: phase >= p ? '0 0 10px rgba(16,185,129,0.5)' : 'none' }} />
                        ))}
                    </div>
                )}

                <AnimatePresence mode="wait">
                    {feedback && (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} style={{ background: feedback.isCorrect ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)', border: `2px solid ${feedback.isCorrect ? '#10b981' : '#ef4444'}`, padding: '1.5rem', borderRadius: '20px', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '15px', boxShadow: '0 15px 30px rgba(0,0,0,0.3)' }}>
                            {feedback.isCorrect ? <CheckCircle size={40} color="#10b981" style={{ flexShrink: 0 }} /> : <ShieldAlert size={40} color="#ef4444" style={{ flexShrink: 0 }} />}
                            <span style={{ fontSize: '1.1rem', color: feedback.isCorrect ? '#a7f3d0' : '#fca5a5', fontWeight: 'bold' }}>{feedback.text}</span>
                        </motion.div>
                    )}

                    {phase === 0 && (
                        <motion.div key="teoria" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '2.5rem 1.5rem', borderRadius: '30px', border: '1px solid rgba(16, 185, 129, 0.3)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                                    <div style={{ background: 'rgba(16,185,129,0.2)', padding: '15px', borderRadius: '20px' }}>
                                        <TreePine size={35} color="#34d399" />
                                    </div>
                                    <h2 style={{ fontSize: '2rem', fontWeight: '900', color: 'white', margin: 0 }}>Infraestructura Verde</h2>
                                </div>
                                <p style={{ fontSize: '1.15rem', color: '#a7f3d0', marginBottom: '1.5rem', lineHeight: '1.7' }}>
                                    En urbanismo moderno, espacios como el <strong>Humedal El Culebrón</strong> no son "sitios eriazos". Son infraestructuras ecológicas críticas que protegen a la ciudad y mejoran la calidad de vida.
                                </p>
                                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '2rem' }}>
                                    <h3 style={{ fontSize: '1.3rem', color: '#34d399', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}><Waves size={24} /> La Ciudad Esponja</h3>
                                    <p style={{ color: '#d1fae5', lineHeight: '1.6', marginBottom: '1rem' }}>Frente a marejadas o crecidas del estero, el hormigón rígido falla o traslada el problema. Un humedal funciona como un <strong>Parque Inundable</strong> (una esponja gigante): absorbe el exceso de agua, disipa la energía del mar de forma natural y luego libera el agua lentamente.</p>
                                    
                                    <h3 style={{ fontSize: '1.3rem', color: '#34d399', marginBottom: '1rem', marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}><Leaf size={24} /> Coexistencia y Resiliencia</h3>
                                    <p style={{ color: '#d1fae5', lineHeight: '1.6' }}>Para que la comunidad valore este espacio sin destruirlo, la planificación urbana debe implementar conectividad de bajo impacto, como <strong>pasarelas elevadas</strong>. Además, la revegetación debe hacerse siempre con <strong>flora nativa</strong>, la cual ya está genéticamente adaptada a la salinidad costera y a la escasez hídrica de la región.</p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <motion.button whileTap={{ scale: 0.95 }} onClick={() => { setPhase(1); }} style={{ background: 'linear-gradient(90deg, #10b981, #059669)', color: 'white', border: 'none', padding: '1.2rem 2.5rem', borderRadius: '50px', fontSize: '1.1rem', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 10px 20px rgba(16,185,129,0.4)' }}>
                                        ENTENDIDO <ChevronRight size={20} />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {phase === 1 && (
                        <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '2.5rem 1.5rem', borderRadius: '30px', border: '1px solid rgba(16, 185, 129, 0.3)', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                                <div style={{ background: 'rgba(16,185,129,0.2)', padding: '15px', borderRadius: '50%', display: 'inline-flex', marginBottom: '1rem' }}>
                                    <Sparkles size={40} color="#34d399" />
                                </div>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem', color: 'white' }}>Trivia Final</h2>
                                <p style={{ fontSize: '1.1rem', color: '#a7f3d0', marginBottom: '2rem', lineHeight: '1.6', maxWidth: '500px', margin: '0 auto 2rem' }}>
                                    Demuestra lo que aprendiste sobre Infraestructura Verde. Deberás responder correctamente para graduarte y obtener tu certificado.
                                </p>
                                <motion.button whileTap={{ scale: 0.95 }} onClick={() => { playStartSound(); setPhase(2); }} style={{ background: 'linear-gradient(90deg, #10b981, #059669)', color: 'white', border: 'none', padding: '1.2rem 3rem', borderRadius: '50px', fontSize: '1.2rem', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', margin: '0 auto', boxShadow: '0 10px 20px rgba(16,185,129,0.4)' }}>
                                    COMENZAR EXAMEN <ChevronRight size={24} />
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    {phase === 2 && !feedback && (
                        <motion.div key="p1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '2rem 1.5rem', borderRadius: '30px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                                    <div style={{ background: '#10b981', padding: '12px', borderRadius: '15px' }}><Waves size={30} color="white" /></div>
                                    <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'white', margin: 0 }}>Defensa Costera</h2>
                                </div>
                                <p style={{ fontSize: '1.1rem', color: '#a7f3d0', marginBottom: '2rem', lineHeight: '1.6' }}>El Humedal El Culebrón enfrenta el riesgo constante de marejadas. Como urbanista, ¿cuál es la mejor forma de proteger la ciudad costera?</p>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(false, "El hormigón rebota la energía de las olas y termina erosionando más la playa. Además, corta la conexión ecológica.")} className="choice-btn">
                                        <span>Levantar un gran muro de contención de hormigón a lo largo de la costa.</span>
                                        <ChevronRight size={20} color="#10b981" style={{ flexShrink: 0 }} />
                                    </motion.button>
                                    <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(true, "¡Exacto! Esta es la esencia de la infraestructura verde. El parque actúa como esponja, absorbiendo la energía del mar de forma natural y ofreciendo un espacio público de calidad.")} className="choice-btn">
                                        <span>Construir un "Parque Inundable" con bordes blandos y dunas restauradas.</span>
                                        <ChevronRight size={20} color="#10b981" style={{ flexShrink: 0 }} />
                                    </motion.button>
                                    <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(false, "El enrocado es rígido y poco amigable con el ecosistema. Funciona, pero arruina el valor paisajístico y ambiental del humedal.")} className="choice-btn">
                                        <span>Instalar un enrocado pesado (rompeolas de piedras gigantes) en la orilla.</span>
                                        <ChevronRight size={20} color="#10b981" style={{ flexShrink: 0 }} />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {phase === 3 && !feedback && (
                        <motion.div key="p2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '2rem 1.5rem', borderRadius: '30px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                                    <div style={{ background: '#10b981', padding: '12px', borderRadius: '15px' }}><ArrowUp size={30} color="white" /></div>
                                    <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'white', margin: 0 }}>Conectividad Social</h2>
                                </div>
                                <p style={{ fontSize: '1.1rem', color: '#a7f3d0', marginBottom: '2rem', lineHeight: '1.6' }}>Históricamente, Coquimbo le ha dado la espalda a su humedal. ¿Cómo logras que los vecinos vuelvan a apropiarse del lugar sin destruirlo?</p>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(true, "¡Correcto! Las pasarelas elevadas permiten el tránsito humano sin aplastar los nidos ni compactar el suelo, logrando un equilibrio perfecto.")} className="choice-btn">
                                        <span>Instalar pasarelas de madera elevadas y estaciones de avistamiento de aves.</span>
                                        <ChevronRight size={20} color="#10b981" style={{ flexShrink: 0 }} />
                                    </motion.button>
                                    <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(false, "Pavimentar el humedal destruye la infiltración de agua y ahuyenta a la fauna local. ¡No es sostenible!")} className="choice-btn">
                                        <span>Pavimentar un gran paseo peatonal con asfalto directamente sobre el barro.</span>
                                        <ChevronRight size={20} color="#10b981" style={{ flexShrink: 0 }} />
                                    </motion.button>
                                    <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(false, "Si cierras el humedal, los vecinos no lo valorarán. La conservación moderna requiere que la comunidad conozca y ame su entorno.")} className="choice-btn">
                                        <span>Cerrar completamente el humedal con mallas para que nadie pueda entrar.</span>
                                        <ChevronRight size={20} color="#10b981" style={{ flexShrink: 0 }} />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {phase === 4 && !feedback && (
                        <motion.div key="p3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '2rem 1.5rem', borderRadius: '30px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                                    <div style={{ background: '#10b981', padding: '12px', borderRadius: '15px' }}><Droplets size={30} color="white" /></div>
                                    <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'white', margin: 0 }}>Flora Resiliente</h2>
                                </div>
                                <p style={{ fontSize: '1.1rem', color: '#a7f3d0', marginBottom: '2rem', lineHeight: '1.6' }}>Para consolidar el Parque Inundable, necesitas plantar vegetación. ¿Qué tipo de plantas eliges para asegurar que el proyecto sobreviva a largo plazo?</p>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(false, "El césped requiere demasiada agua (que escasea) y no soporta bien la salinidad del estero ni de las marejadas.")} className="choice-btn">
                                        <span>Plantación masiva de césped ornamental para que se vea como un campo de golf.</span>
                                        <ChevronRight size={20} color="#10b981" style={{ flexShrink: 0 }} />
                                    </motion.button>
                                    <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(false, "Los eucaliptos y pinos secan el suelo y son especies exóticas invasoras. Destruirían el equilibrio del humedal.")} className="choice-btn">
                                        <span>Eucaliptos y Pinos de rápido crecimiento para generar sombra rápida.</span>
                                        <ChevronRight size={20} color="#10b981" style={{ flexShrink: 0 }} />
                                    </motion.button>
                                    <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(true, "¡Perfecto! Las plantas nativas costeras (como docas, totoras y arbustos locales) soportan la salinidad, requieren poca agua y afirman el suelo previniendo la erosión.")} className="choice-btn">
                                        <span>Flora nativa adaptada a la salinidad y al bajo consumo hídrico (flora endémica).</span>
                                        <ChevronRight size={20} color="#10b981" style={{ flexShrink: 0 }} />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {phase === 5 && !feedback && (
                        <motion.div key="p4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                            <div style={{ background: 'linear-gradient(135deg, #064e3b, #022c22)', padding: '3rem 1.5rem', borderRadius: '30px', border: '2px solid #10b981', textAlign: 'center', boxShadow: '0 20px 50px rgba(16,185,129,0.3)' }}>
                                <div style={{ width: '100px', height: '100px', background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', boxShadow: '0 10px 20px rgba(245,158,11,0.4)' }}>
                                    <Award size={50} color="white" />
                                </div>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem', color: 'white', lineHeight: 1.1 }}>¡Examen Aprobado!</h2>
                                <p style={{ fontSize: '1.1rem', color: '#6ee7b7', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
                                    Has entendido a la perfección la visión de Paulina Godoy. Un humedal no es un patio trasero ni un problema; es infraestructura verde de alto valor que protege y embellece nuestra ciudad.
                                </p>
                                <motion.button whileTap={{ scale: 0.95 }} onClick={generateDiploma} style={{ background: 'linear-gradient(90deg, #f59e0b, #d97706)', color: 'white', border: 'none', padding: '1.2rem 2rem', borderRadius: '50px', fontSize: '1.1rem', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', maxWidth: '350px', margin: '0 auto', boxShadow: '0 10px 20px rgba(245,158,11,0.3)' }}>
                                    <Download size={24} /> OBTENER DIPLOMA
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <style jsx>{`
                .choice-btn {
                    background: rgba(0,0,0,0.5);
                    border: 1px solid rgba(16, 185, 129, 0.4);
                    color: white;
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
                    background: rgba(16, 185, 129, 0.2);
                    border-color: #10b981;
                }
            `}</style>
        </div>
    );
}
