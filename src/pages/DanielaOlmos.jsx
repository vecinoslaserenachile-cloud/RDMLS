import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Thermometer, Wind, Sun, CheckCircle, ShieldAlert, Download, User, ChevronRight, Sparkles, Map } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import confetti from 'canvas-confetti';
import { logElearningActivity } from '../utils/elearningLogger';
import { playCorrectSound, playErrorSound, playLevelUpSound, playStartSound } from '../utils/soundEffects';

export default function DanielaOlmos() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [isLogged, setIsLogged] = useState(false);
    
    const [phase, setPhase] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        document.title = "Arquitectura Bioclimática | Daniela Olmos";
        const savedUser = localStorage.getItem('daniela_olmos_user');
        const savedEmail = localStorage.getItem('daniela_olmos_email');
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
            localStorage.setItem('daniela_olmos_user', userName);
            localStorage.setItem('daniela_olmos_email', userEmail);
            logElearningActivity('Daniela Olmos - Diseño Bioclimático', userName, userEmail, 'login');
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
                if (phase === 3) {
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
            
            page.drawRectangle({ x: 0, y: 0, width: 800, height: 600, color: rgb(0.3, 0.1, 0.5) });
            page.drawRectangle({ x: 20, y: 20, width: 760, height: 560, color: rgb(0.95, 0.9, 1) });
            page.drawRectangle({ x: 30, y: 30, width: 740, height: 540, color: rgb(1, 1, 1) });
            
            page.drawText('ACADEMIA ENTREVECINAS', { x: 260, y: 480, size: 20, font: helveticaFont, color: rgb(0.4, 0.2, 0.6) });
            page.drawText('CERTIFICADO OFICIAL', { x: 230, y: 420, size: 30, font: helveticaFont, color: rgb(0.1, 0.1, 0.1) });
            page.drawText('Certificamos que', { x: 340, y: 360, size: 16, font: helveticaRegular, color: rgb(0.3, 0.3, 0.3) });
            page.drawText(userName.toUpperCase(), { x: 400 - (userName.length * 8), y: 310, size: 30, font: helveticaFont, color: rgb(0.4, 0.2, 0.6) });
            page.drawText('Ha completado con éxito la capacitación y es reconocido(a) como:', { x: 180, y: 250, size: 14, font: helveticaRegular, color: rgb(0.3, 0.3, 0.3) });
            page.drawText('ARQUITECTO(A) BIOCLIMÁTICO(A)', { x: 170, y: 190, size: 24, font: helveticaFont, color: rgb(0.6, 0.2, 0.8) });
            
            const date = new Date().toLocaleDateString();
            page.drawText(`Fecha: ${date}`, { x: 100, y: 100, size: 12, font: helveticaRegular, color: rgb(0.5, 0.5, 0.5) });
            page.drawText('Firma: Daniela Olmos (Virtual)', { x: 500, y: 100, size: 12, font: helveticaRegular, color: rgb(0.5, 0.5, 0.5) });

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `Diploma_Bioclimatico_${userName.replace(' ', '_')}.pdf`;
            link.click();
            
            logElearningActivity('Daniela Olmos - Diseño Bioclimático', userName, userEmail, 'diploma_downloaded');
            
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        } catch (e) {
            console.error(e);
            alert('Error generando diploma.');
        }
    };

    if (!isLogged) {
        return (
            <div style={{ minHeight: '100vh', background: '#f3e8ff', color: '#1e293b', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'Outfit', sans-serif" }}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'white', padding: '2rem', borderRadius: '30px', border: '1px solid rgba(168, 85, 247, 0.3)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', maxWidth: '450px', width: '90%', textAlign: 'center' }}>
                    <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #a855f7, #7e22ce)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 10px 20px rgba(168,85,247,0.3)' }}>
                        <Home size={40} color="white" />
                    </div>
                    <h1 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '1rem', color: '#7e22ce' }}>Diseño Bioclimático</h1>
                    <p style={{ color: '#64748b', marginBottom: '2rem' }}>Aprende sobre orientación solar y eficiencia térmica con Daniela Olmos.</p>
                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ position: 'relative' }}>
                            <User size={20} color="#a855f7" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input type="text" placeholder="Tu nombre..." value={userName} onChange={e => setUserName(e.target.value)} style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '15px', border: '1px solid #e2e8f0', background: '#f8fafc', color: '#1e293b', boxSizing: 'border-box' }} required />
                        </div>
                        <input type="email" placeholder="Tu correo electrónico..." value={userEmail} onChange={e => setUserEmail(e.target.value)} style={{ width: '100%', padding: '1rem', borderRadius: '15px', border: '1px solid #e2e8f0', background: '#f8fafc', color: '#1e293b', boxSizing: 'border-box' }} required />
                        <motion.button whileTap={{ scale: 0.95 }} type="submit" style={{ width: '100%', padding: '1.2rem', background: 'linear-gradient(90deg, #a855f7, #7e22ce)', color: 'white', border: 'none', borderRadius: '15px', fontWeight: '900', fontSize: '1.1rem', cursor: 'pointer', marginTop: '1rem', boxShadow: '0 10px 20px rgba(168,85,247,0.3)' }}>
                            COMENZAR SIMULACIÓN
                        </motion.button>
                    </form>
                    <button type="button" onClick={() => navigate('/entrevecinas')} style={{ background: 'transparent', color: '#94a3b8', border: 'none', marginTop: '1.5rem', cursor: 'pointer', textDecoration: 'underline' }}>Volver al Hub</button>
                </motion.div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#f3e8ff', color: '#1e293b', fontFamily: "'Outfit', sans-serif", overflowX: 'hidden' }}>
            <header style={{ padding: '1rem 5%', background: 'white', borderBottom: '1px solid #e9d5ff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10, boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ background: '#a855f7', padding: '10px', borderRadius: '12px' }}><Home size={24} color="white" /></div>
                    <div>
                        <div style={{ fontSize: '1.2rem', fontWeight: '900', lineHeight: 1 }}>DISEÑO BIOCLIMÁTICO</div>
                        <div style={{ fontSize: '0.8rem', color: '#9333ea' }}>Daniela Olmos</div>
                    </div>
                </div>
                <button onClick={() => navigate('/entrevecinas')} style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', color: '#64748b', padding: '8px 15px', borderRadius: '20px', cursor: 'pointer', fontSize: '0.9rem' }}>Salir</button>
            </header>

            <main style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 5%' }}>
                {/* Progress Bar */}
                {phase > 0 && phase < 4 && (
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '2rem' }}>
                        {[1, 2, 3].map(p => (
                            <div key={p} style={{ flex: 1, height: '8px', borderRadius: '4px', background: phase >= p ? '#a855f7' : '#e9d5ff', transition: '0.3s', boxShadow: phase >= p ? '0 0 10px rgba(168,85,247,0.5)' : 'none' }} />
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
                        <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                            <div style={{ background: 'white', padding: '2.5rem 1.5rem', borderRadius: '30px', border: '1px solid #e9d5ff', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                                <div style={{ background: '#f3e8ff', padding: '15px', borderRadius: '50%', display: 'inline-flex', marginBottom: '1rem' }}>
                                    <Sparkles size={40} color="#a855f7" />
                                </div>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem', color: '#1e293b' }}>Trivia Final</h2>
                                <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '2rem', lineHeight: '1.6', maxWidth: '500px', margin: '0 auto 2rem' }}>
                                    Demuestra lo que aprendiste sobre orientación solar y eficiencia térmica. Responde correctamente para graduarte y obtener tu certificado.
                                </p>
                                <motion.button whileTap={{ scale: 0.95 }} onClick={() => { playStartSound(); setPhase(1); }} style={{ background: 'linear-gradient(90deg, #a855f7, #7e22ce)', color: 'white', border: 'none', padding: '1.2rem 3rem', borderRadius: '50px', fontSize: '1.2rem', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', margin: '0 auto', boxShadow: '0 10px 20px rgba(168,85,247,0.3)' }}>
                                    COMENZAR EXAMEN <ChevronRight size={24} />
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    {phase === 1 && !feedback && (
                        <motion.div key="p1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div style={{ background: 'white', padding: '2rem 1.5rem', borderRadius: '30px', border: '1px solid #e9d5ff', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                                    <div style={{ background: '#a855f7', padding: '12px', borderRadius: '15px' }}><Map size={30} color="white" /></div>
                                    <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#1e293b', margin: 0 }}>Orientación Solar</h2>
                                </div>
                                <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '2rem', lineHeight: '1.6' }}>En el hemisferio sur, si quieres que tu casa reciba luz y calor solar durante el invierno para mantenerla cálida naturalmente, ¿hacia dónde deben apuntar las ventanas principales?</p>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(false, "El Sur recibe muy poca o nula luz solar directa en invierno, lo que hará la casa muy fría.")} className="choice-btn">
                                        <span>Hacia el Sur.</span>
                                        <ChevronRight size={20} color="#a855f7" style={{ flexShrink: 0 }} />
                                    </motion.button>
                                    <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(true, "¡Correcto! En el hemisferio sur, la fachada Norte es la que recibe mayor exposición solar durante el día, ideal para captar calor en invierno.")} className="choice-btn">
                                        <span>Hacia el Norte.</span>
                                        <ChevronRight size={20} color="#a855f7" style={{ flexShrink: 0 }} />
                                    </motion.button>
                                    <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(false, "El Poniente (Oeste) recibe el sol rasante de la tarde, lo que puede causar un sobrecalentamiento excesivo en verano.")} className="choice-btn">
                                        <span>Hacia el Poniente (Oeste).</span>
                                        <ChevronRight size={20} color="#a855f7" style={{ flexShrink: 0 }} />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {phase === 2 && !feedback && (
                        <motion.div key="p2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div style={{ background: 'white', padding: '2rem 1.5rem', borderRadius: '30px', border: '1px solid #e9d5ff', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                                    <div style={{ background: '#a855f7', padding: '12px', borderRadius: '15px' }}><Thermometer size={30} color="white" /></div>
                                    <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#1e293b', margin: 0 }}>Aislamiento Térmico</h2>
                                </div>
                                <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '2rem', lineHeight: '1.6' }}>De nada sirve captar calor si la casa no puede retenerlo. ¿Cuál es la mejor estrategia para evitar la pérdida de calor en invierno?</p>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(false, "Pintar la casa no mejora significativamente la resistencia térmica de los muros.")} className="choice-btn">
                                        <span>Pintar la casa de colores oscuros por fuera.</span>
                                        <ChevronRight size={20} color="#a855f7" style={{ flexShrink: 0 }} />
                                    </motion.button>
                                    <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(true, "¡Excelente! Los termopaneles evitan que el calor escape por los vidrios y un buen aislamiento mantiene la temperatura interior.")} className="choice-btn">
                                        <span>Instalar ventanas termopanel y aislamiento adecuado en muros/techo.</span>
                                        <ChevronRight size={20} color="#a855f7" style={{ flexShrink: 0 }} />
                                    </motion.button>
                                    <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(false, "Tapar las ventilaciones condensa la humedad interior, generando hongos y problemas respiratorios.")} className="choice-btn">
                                        <span>Sellar herméticamente todas las rendijas y nunca ventilar.</span>
                                        <ChevronRight size={20} color="#a855f7" style={{ flexShrink: 0 }} />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {phase === 3 && !feedback && (
                        <motion.div key="p3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div style={{ background: 'white', padding: '2rem 1.5rem', borderRadius: '30px', border: '1px solid #e9d5ff', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                                    <div style={{ background: '#a855f7', padding: '12px', borderRadius: '15px' }}><Wind size={30} color="white" /></div>
                                    <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#1e293b', margin: 0 }}>Ventilación Cruzada</h2>
                                </div>
                                <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '2rem', lineHeight: '1.6' }}>En verano, la casa orientada al norte puede calentarse. Para refrescarla sin usar aire acondicionado, debes implementar ventilación cruzada. ¿Cómo funciona?</p>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(true, "¡Así es! Al abrir ventanas en muros opuestos, creas un flujo de aire constante que extrae el aire caliente y renueva el ambiente.")} className="choice-btn">
                                        <span>Abriendo ventanas en fachadas opuestas (ej: Norte y Sur) para crear una corriente de aire.</span>
                                        <ChevronRight size={20} color="#a855f7" style={{ flexShrink: 0 }} />
                                    </motion.button>
                                    <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(false, "Eso no es ventilación cruzada. Además, el calor sube, por lo que el aire caliente se estancaría en el techo cerrado.")} className="choice-btn">
                                        <span>Abriendo solo las ventanas del primer piso y cerrando las del segundo.</span>
                                        <ChevronRight size={20} color="#a855f7" style={{ flexShrink: 0 }} />
                                    </motion.button>
                                    <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(false, "Una sola ventana no genera el 'tiraje' necesario para renovar el aire eficientemente.")} className="choice-btn">
                                        <span>Manteniendo una sola ventana muy grande abierta todo el día.</span>
                                        <ChevronRight size={20} color="#a855f7" style={{ flexShrink: 0 }} />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {phase === 4 && !feedback && (
                        <motion.div key="p4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                            <div style={{ background: 'linear-gradient(135deg, #a855f7, #7e22ce)', padding: '3rem 1.5rem', borderRadius: '30px', border: '2px solid #d8b4fe', textAlign: 'center', boxShadow: '0 20px 50px rgba(168,85,247,0.3)' }}>
                                <div style={{ width: '100px', height: '100px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
                                    <Home size={50} color="#7e22ce" />
                                </div>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem', color: 'white', lineHeight: 1.1 }}>¡Hogar Eficiente!</h2>
                                <p style={{ fontSize: '1.1rem', color: '#f3e8ff', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
                                    Dominas los principios del diseño bioclimático: Orientación al Norte, Aislamiento Térmico y Ventilación Cruzada. ¡Aplicar esto ahorra energía y mejora el bienestar!
                                </p>
                                <motion.button whileTap={{ scale: 0.95 }} onClick={generateDiploma} style={{ background: 'white', color: '#7e22ce', border: 'none', padding: '1.2rem 2rem', borderRadius: '50px', fontSize: '1.1rem', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', maxWidth: '350px', margin: '0 auto', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
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
                    background: #f3e8ff;
                    border-color: #a855f7;
                }
            `}</style>
        </div>
    );
}
