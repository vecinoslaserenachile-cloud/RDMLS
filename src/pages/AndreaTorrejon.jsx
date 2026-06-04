import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Battery, Zap, CheckCircle, ShieldAlert, Download, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import confetti from 'canvas-confetti';
import { logElearningActivity } from '../utils/elearningLogger';

export default function AndreaTorrejon() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [isLogged, setIsLogged] = useState(false);
    
    const [phase, setPhase] = useState(1);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState(null);

    // Interactive states
    const [inclinacion, setInclinacion] = useState(0);
    const [isClean, setIsClean] = useState(false);

    useEffect(() => {
        document.title = "Energías Renovables | Andrea Torrejón";
        const savedUser = localStorage.getItem('andrea_torrejon_user');
        const savedEmail = localStorage.getItem('andrea_torrejon_email');
        if (savedUser && savedEmail) {
            setUserName(savedUser);
            setUserEmail(savedEmail);
            setIsLogged(true);
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        if (userName.trim() && userEmail.trim()) {
            setIsLogged(true);
            localStorage.setItem('andrea_torrejon_user', userName);
            localStorage.setItem('andrea_torrejon_email', userEmail);
            logElearningActivity('Andrea Torrejón - Energías', userName, userEmail, 'login');
        }
    };

    const handlePhase1 = () => {
        if (inclinacion >= 25 && inclinacion <= 35) {
            setFeedback({ isCorrect: true, text: "¡Excelente! En La Serena, una inclinación de ~30 grados hacia el norte es ideal para captar la mayor radiación solar durante todo el año." });
            setTimeout(() => { setFeedback(null); setPhase(2); }, 4000);
        } else {
            setFeedback({ isCorrect: false, text: "Esa inclinación no es óptima para nuestra latitud. Prueba acercándote a los 30 grados." });
            setTimeout(() => { setFeedback(null); }, 3000);
        }
    };

    const handlePhase2 = (clean) => {
        if (clean) {
            setIsClean(true);
            setFeedback({ isCorrect: true, text: "¡Muy bien! Mantener los paneles libres de polvo y excremento de aves es vital para no perder hasta un 20% de eficiencia." });
            setTimeout(() => { setFeedback(null); setPhase(3); }, 4000);
        } else {
            setFeedback({ isCorrect: false, text: "Dejar el panel sucio reduce drásticamente su capacidad de generar energía. ¡Límpialo!" });
            setTimeout(() => { setFeedback(null); }, 3000);
        }
    };

    const handlePhase3 = (isCorrect) => {
        if (isCorrect) {
            setFeedback({ isCorrect: true, text: "¡Conexión perfecta! Panel Solar (DC) -> Inversor (AC) -> Batería / Hogar." });
            setTimeout(() => { setFeedback(null); setPhase(4); }, 4000);
        } else {
            setFeedback({ isCorrect: false, text: "Conexión incorrecta. Recuerda que los electrodomésticos necesitan corriente alterna, por lo que debes pasar por un inversor." });
            setTimeout(() => { setFeedback(null); }, 3000);
        }
    };

    const generateDiploma = async () => {
        try {
            const pdfDoc = await PDFDocument.create();
            const page = pdfDoc.addPage([800, 600]);
            const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
            const helveticaRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
            
            page.drawRectangle({ x: 0, y: 0, width: 800, height: 600, color: rgb(0.9, 0.5, 0.1) });
            page.drawRectangle({ x: 20, y: 20, width: 760, height: 560, color: rgb(1, 0.9, 0.8) });
            page.drawRectangle({ x: 30, y: 30, width: 740, height: 540, color: rgb(1, 1, 1) });
            
            page.drawText('ACADEMIA ENTREVECINAS', { x: 260, y: 480, size: 20, font: helveticaFont, color: rgb(0.8, 0.4, 0.1) });
            page.drawText('CERTIFICADO OFICIAL', { x: 230, y: 420, size: 30, font: helveticaFont, color: rgb(0.1, 0.1, 0.1) });
            page.drawText('Certificamos que', { x: 340, y: 360, size: 16, font: helveticaRegular, color: rgb(0.3, 0.3, 0.3) });
            page.drawText(userName.toUpperCase(), { x: 400 - (userName.length * 8), y: 310, size: 30, font: helveticaFont, color: rgb(0.8, 0.4, 0.1) });
            page.drawText('Ha completado con éxito la capacitación y es reconocido(a) como:', { x: 180, y: 250, size: 14, font: helveticaRegular, color: rgb(0.3, 0.3, 0.3) });
            page.drawText('GESTOR DE ENERGÍAS RENOVABLES', { x: 160, y: 190, size: 24, font: helveticaFont, color: rgb(0.1, 0.5, 0.8) });
            
            const date = new Date().toLocaleDateString();
            page.drawText(`Fecha: ${date}`, { x: 100, y: 100, size: 12, font: helveticaRegular, color: rgb(0.5, 0.5, 0.5) });
            page.drawText('Firma: Andrea Torrejón (Virtual)', { x: 500, y: 100, size: 12, font: helveticaRegular, color: rgb(0.5, 0.5, 0.5) });

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `Diploma_Energias_${userName.replace(' ', '_')}.pdf`;
            link.click();
            
            logElearningActivity('Andrea Torrejón - Energías', userName, userEmail, 'diploma_downloaded');
            
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        } catch (e) {
            console.error(e);
            alert('Error generando diploma.');
        }
    };

    if (!isLogged) {
        return (
            <div style={{ minHeight: '100vh', background: '#fffbeb', color: '#1e293b', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'Outfit', sans-serif" }}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'white', padding: '3rem', borderRadius: '30px', border: '1px solid rgba(245, 158, 11, 0.3)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', maxWidth: '450px', width: '90%', textAlign: 'center' }}>
                    <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                        <Sun size={40} color="white" />
                    </div>
                    <h1 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '1rem' }}>Laboratorio Solar</h1>
                    <p style={{ color: '#64748b', marginBottom: '2rem' }}>Aprende sobre aprovechamiento de la energía solar con Andrea Torrejón.</p>
                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ position: 'relative' }}>
                            <User size={20} color="#f59e0b" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input type="text" placeholder="Tu nombre..." value={userName} onChange={e => setUserName(e.target.value)} style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '15px', border: '1px solid #e2e8f0', background: '#f8fafc', color: '#1e293b', boxSizing: 'border-box' }} required />
                        </div>
                        <input type="email" placeholder="Tu correo electrónico..." value={userEmail} onChange={e => setUserEmail(e.target.value)} style={{ width: '100%', padding: '1rem', borderRadius: '15px', border: '1px solid #e2e8f0', background: '#f8fafc', color: '#1e293b', boxSizing: 'border-box' }} required />
                        <button type="submit" style={{ width: '100%', padding: '1rem', background: '#f59e0b', color: 'white', border: 'none', borderRadius: '15px', fontWeight: '900', fontSize: '1.1rem', cursor: 'pointer', marginTop: '1rem' }}>ENTRAR AL LABORATORIO</button>
                    </form>
                    <button type="button" onClick={() => navigate('/entrevecinas')} style={{ background: 'transparent', color: '#94a3b8', border: 'none', marginTop: '1rem', cursor: 'pointer', textDecoration: 'underline' }}>Volver al Hub</button>
                </motion.div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#fffbeb', color: '#1e293b', fontFamily: "'Outfit', sans-serif" }}>
            <header style={{ padding: '1.5rem 2rem', background: 'white', borderBottom: '1px solid #fde68a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ background: '#f59e0b', padding: '10px', borderRadius: '12px' }}><Sun size={24} color="white" /></div>
                    <div>
                        <div style={{ fontSize: '1.2rem', fontWeight: '900' }}>SIMULADOR SOLAR</div>
                        <div style={{ fontSize: '0.8rem', color: '#d97706' }}>Andrea Torrejón</div>
                    </div>
                </div>
                <button onClick={() => navigate('/entrevecinas')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>Salir al Hub</button>
            </header>

            <main style={{ maxWidth: '1000px', margin: '3rem auto', padding: '0 2rem' }}>
                {/* Progress Bar */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '3rem' }}>
                    {[1, 2, 3].map(p => (
                        <div key={p} style={{ flex: 1, height: '8px', borderRadius: '4px', background: phase >= p ? '#f59e0b' : '#fef3c7', transition: '0.3s' }} />
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {feedback && (
                        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ background: feedback.isCorrect ? '#dcfce7' : '#fee2e2', border: `1px solid ${feedback.isCorrect ? '#22c55e' : '#ef4444'}`, padding: '1.5rem', borderRadius: '15px', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '15px' }}>
                            {feedback.isCorrect ? <CheckCircle size={30} color="#22c55e" /> : <ShieldAlert size={30} color="#ef4444" />}
                            <span style={{ fontSize: '1.1rem', color: feedback.isCorrect ? '#166534' : '#991b1b', fontWeight: 'bold' }}>{feedback.text}</span>
                        </motion.div>
                    )}

                    {phase === 1 && !feedback && (
                        <motion.div key="p1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div style={{ background: 'white', padding: '3rem', borderRadius: '30px', border: '1px solid #fde68a', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem', color: '#d97706' }}>1. Orientación e Inclinación</h2>
                                <p style={{ fontSize: '1.2rem', color: '#64748b', marginBottom: '2rem', lineHeight: '1.6' }}>Para aprovechar la energía del sol en nuestra latitud (Región de Coquimbo), el panel debe mirar hacia el Norte. Ajusta el ángulo de inclinación para maximizar la captación anual.</p>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
                                    <div style={{ position: 'relative', width: '200px', height: '200px', borderBottom: '4px solid #cbd5e1', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                                        {/* Panel Visual Representation */}
                                        <motion.div 
                                            animate={{ rotate: -inclinacion }} 
                                            style={{ width: '160px', height: '10px', background: '#1e3a8a', transformOrigin: 'bottom right', position: 'absolute', bottom: 0, right: '20px', border: '2px solid #0f172a', borderRadius: '2px' }}
                                        >
                                            {/* Grid lines of solar panel */}
                                            <div style={{display:'flex', width:'100%', height:'100%'}}>
                                                <div style={{flex:1, borderRight:'1px solid rgba(255,255,255,0.3)'}}></div>
                                                <div style={{flex:1, borderRight:'1px solid rgba(255,255,255,0.3)'}}></div>
                                                <div style={{flex:1}}></div>
                                            </div>
                                        </motion.div>
                                        <Sun size={60} color="#f59e0b" style={{ position: 'absolute', top: 0, left: 0 }} />
                                    </div>
                                    
                                    <div style={{ width: '100%', maxWidth: '400px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontWeight: 'bold' }}>
                                            <span>0° (Plano)</span>
                                            <span style={{ color: '#d97706', fontSize: '1.2rem' }}>{inclinacion}°</span>
                                            <span>90° (Vertical)</span>
                                        </div>
                                        <input 
                                            type="range" 
                                            min="0" 
                                            max="90" 
                                            value={inclinacion} 
                                            onChange={(e) => setInclinacion(parseInt(e.target.value))}
                                            style={{ width: '100%', cursor: 'pointer' }}
                                        />
                                    </div>
                                </div>
                                <button onClick={handlePhase1} style={{ width: '100%', padding: '1.2rem', background: '#f59e0b', color: 'white', border: 'none', borderRadius: '15px', fontWeight: '900', fontSize: '1.1rem', cursor: 'pointer' }}>VERIFICAR INCLINACIÓN</button>
                            </div>
                        </motion.div>
                    )}

                    {phase === 2 && !feedback && (
                        <motion.div key="p2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div style={{ background: 'white', padding: '3rem', borderRadius: '30px', border: '1px solid #fde68a', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem', color: '#d97706' }}>2. Mantenimiento Básico</h2>
                                <p style={{ fontSize: '1.2rem', color: '#64748b', marginBottom: '2rem', lineHeight: '1.6' }}>Ha pasado un mes y el panel está cubierto de polvo. ¿Qué debes hacer?</p>
                                
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <button onClick={() => handlePhase2(false)} style={{ background: '#f1f5f9', border: '2px solid #cbd5e1', padding: '2rem', borderRadius: '15px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}>
                                        Dejarlo así, el polvo no afecta la generación de energía.
                                    </button>
                                    <button onClick={() => handlePhase2(true)} style={{ background: '#fffbeb', border: '2px solid #f59e0b', padding: '2rem', borderRadius: '15px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}>
                                        Limpiarlo suavemente con agua para retirar el polvo y asegurar máxima captación.
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {phase === 3 && !feedback && (
                        <motion.div key="p3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div style={{ background: 'white', padding: '3rem', borderRadius: '30px', border: '1px solid #fde68a', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem', color: '#d97706' }}>3. Ensamblaje del Sistema</h2>
                                <p style={{ fontSize: '1.2rem', color: '#64748b', marginBottom: '2rem', lineHeight: '1.6' }}>Selecciona el orden correcto para conectar los componentes y dar energía a la casa.</p>
                                
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                                    <button onClick={() => handlePhase3(false)} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: '15px', fontSize: '1.1rem', textAlign: 'left', cursor: 'pointer' }}>
                                        Panel Solar ➔ Batería ➔ Electrodomésticos.
                                    </button>
                                    <button onClick={() => handlePhase3(true)} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: '15px', fontSize: '1.1rem', textAlign: 'left', cursor: 'pointer' }}>
                                        Panel Solar ➔ Inversor ➔ Batería / Hogar.
                                    </button>
                                    <button onClick={() => handlePhase3(false)} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: '15px', fontSize: '1.1rem', textAlign: 'left', cursor: 'pointer' }}>
                                        Inversor ➔ Panel Solar ➔ Batería.
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {phase === 4 && !feedback && (
                        <motion.div key="p4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                            <div style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', padding: '4rem', borderRadius: '30px', border: '1px solid #fcd34d', textAlign: 'center', boxShadow: '0 20px 50px rgba(245,158,11,0.3)' }}>
                                <div style={{ width: '100px', height: '100px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                                    <Zap size={50} color="#d97706" />
                                </div>
                                <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '1rem', color: 'white' }}>¡Sistema Energizado!</h2>
                                <p style={{ fontSize: '1.2rem', color: '#fef3c7', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem', lineHeight: '1.6' }}>
                                    Has comprendido los principios básicos de la energía solar. Inclinación correcta, mantención y uso de inversores son la clave para un hogar sustentable como nos enseña Andrea Torrejón.
                                </p>
                                <button onClick={generateDiploma} style={{ background: 'white', color: '#d97706', border: 'none', padding: '1.2rem 3rem', borderRadius: '50px', fontSize: '1.2rem', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', margin: '0 auto' }}>
                                    <Download size={24} /> OBTENER DIPLOMA RENOVABLE
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
