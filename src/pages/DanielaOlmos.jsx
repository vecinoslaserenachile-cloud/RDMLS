import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Thermometer, Wind, Sun, CheckCircle, ShieldAlert, Download, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import confetti from 'canvas-confetti';
import { logElearningActivity } from '../utils/elearningLogger';

export default function DanielaOlmos() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [isLogged, setIsLogged] = useState(false);
    
    const [phase, setPhase] = useState(1);
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
            setIsLogged(true);
            localStorage.setItem('daniela_olmos_user', userName);
            localStorage.setItem('daniela_olmos_email', userEmail);
            logElearningActivity('Daniela Olmos - Diseño Bioclimático', userName, userEmail, 'login');
        }
    };

    const handleAnswer = (isCorrect, explanation) => {
        if (isCorrect) setScore(score + 1);
        setFeedback({ isCorrect, text: explanation });
        
        setTimeout(() => {
            setFeedback(null);
            if (isCorrect) setPhase(phase + 1);
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
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'white', padding: '3rem', borderRadius: '30px', border: '1px solid rgba(168, 85, 247, 0.3)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', maxWidth: '450px', width: '90%', textAlign: 'center' }}>
                    <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #a855f7, #7e22ce)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
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
                        <button type="submit" style={{ width: '100%', padding: '1rem', background: '#a855f7', color: 'white', border: 'none', borderRadius: '15px', fontWeight: '900', fontSize: '1.1rem', cursor: 'pointer', marginTop: '1rem' }}>COMENZAR SIMULACIÓN</button>
                    </form>
                    <button type="button" onClick={() => navigate('/entrevecinas')} style={{ background: 'transparent', color: '#94a3b8', border: 'none', marginTop: '1rem', cursor: 'pointer', textDecoration: 'underline' }}>Volver al Hub</button>
                </motion.div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#f3e8ff', color: '#1e293b', fontFamily: "'Outfit', sans-serif" }}>
            <header style={{ padding: '1.5rem 2rem', background: 'white', borderBottom: '1px solid #e9d5ff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ background: '#a855f7', padding: '10px', borderRadius: '12px' }}><Home size={24} color="white" /></div>
                    <div>
                        <div style={{ fontSize: '1.2rem', fontWeight: '900' }}>DISEÑO BIOCLIMÁTICO</div>
                        <div style={{ fontSize: '0.8rem', color: '#9333ea' }}>Daniela Olmos</div>
                    </div>
                </div>
                <button onClick={() => navigate('/entrevecinas')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>Salir al Hub</button>
            </header>

            <main style={{ maxWidth: '1000px', margin: '3rem auto', padding: '0 2rem' }}>
                {/* Progress Bar */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '3rem' }}>
                    {[1, 2, 3].map(p => (
                        <div key={p} style={{ flex: 1, height: '8px', borderRadius: '4px', background: phase >= p ? '#a855f7' : '#e9d5ff', transition: '0.3s' }} />
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
                            <div style={{ background: 'white', padding: '3rem', borderRadius: '30px', border: '1px solid #e9d5ff', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem', color: '#9333ea' }}>1. Orientación Solar</h2>
                                <p style={{ fontSize: '1.2rem', color: '#64748b', marginBottom: '2rem', lineHeight: '1.6' }}>En el hemisferio sur, si quieres que tu casa reciba luz y calor solar durante el invierno para mantenerla cálida naturalmente, ¿hacia dónde deben apuntar las ventanas principales?</p>
                                
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                                    <button onClick={() => handleAnswer(false, "El Sur recibe muy poca o nula luz solar directa en invierno, lo que hará la casa muy fría.")} className="choice-btn">
                                        Hacia el Sur.
                                    </button>
                                    <button onClick={() => handleAnswer(true, "¡Correcto! En el hemisferio sur, la fachada Norte es la que recibe mayor exposición solar durante el día, ideal para captar calor en invierno.")} className="choice-btn correct">
                                        Hacia el Norte.
                                    </button>
                                    <button onClick={() => handleAnswer(false, "El Poniente (Oeste) recibe el sol rasante de la tarde, lo que puede causar un sobrecalentamiento excesivo en verano.")} className="choice-btn">
                                        Hacia el Poniente (Oeste).
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {phase === 2 && !feedback && (
                        <motion.div key="p2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div style={{ background: 'white', padding: '3rem', borderRadius: '30px', border: '1px solid #e9d5ff', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem', color: '#9333ea' }}>2. Aislamiento Térmico</h2>
                                <p style={{ fontSize: '1.2rem', color: '#64748b', marginBottom: '2rem', lineHeight: '1.6' }}>De nada sirve captar calor si la casa no puede retenerlo. ¿Cuál es la mejor estrategia para evitar la pérdida de calor en invierno?</p>
                                
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                                    <button onClick={() => handleAnswer(false, "Pintar la casa no mejora significativamente la resistencia térmica de los muros.")} className="choice-btn">
                                        Pintar la casa de colores oscuros por fuera.
                                    </button>
                                    <button onClick={() => handleAnswer(true, "¡Excelente! Los termopaneles evitan que el calor escape por los vidrios y un buen aislamiento en muros y techos mantiene la temperatura interior estable.")} className="choice-btn correct">
                                        Instalar ventanas termopanel y aislamiento adecuado en muros/techo.
                                    </button>
                                    <button onClick={() => handleAnswer(false, "Tapar las ventilaciones condensa la humedad interior, generando hongos y problemas respiratorios.")} className="choice-btn">
                                        Sellar herméticamente todas las rendijas y nunca ventilar.
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {phase === 3 && !feedback && (
                        <motion.div key="p3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div style={{ background: 'white', padding: '3rem', borderRadius: '30px', border: '1px solid #e9d5ff', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem', color: '#9333ea' }}>3. Ventilación Cruzada</h2>
                                <p style={{ fontSize: '1.2rem', color: '#64748b', marginBottom: '2rem', lineHeight: '1.6' }}>En verano, la casa orientada al norte puede calentarse. Para refrescarla sin usar aire acondicionado, debes implementar ventilación cruzada. ¿Cómo funciona?</p>
                                
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                                    <button onClick={() => handleAnswer(true, "¡Así es! Al abrir ventanas en muros opuestos, creas un flujo de aire constante que extrae el aire caliente y renueva el ambiente.")} className="choice-btn correct">
                                        Abriendo ventanas en fachadas opuestas (ej: Norte y Sur) para crear una corriente de aire.
                                    </button>
                                    <button onClick={() => handleAnswer(false, "Eso no es ventilación cruzada. Además, el calor sube, por lo que el aire caliente se estancaría en el techo cerrado.")} className="choice-btn">
                                        Abriendo solo las ventanas del primer piso y cerrando las del segundo.
                                    </button>
                                    <button onClick={() => handleAnswer(false, "Una sola ventana no genera el 'tiraje' necesario para renovar el aire eficientemente.")} className="choice-btn">
                                        Manteniendo una sola ventana muy grande abierta todo el día.
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {phase === 4 && !feedback && (
                        <motion.div key="p4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                            <div style={{ background: 'linear-gradient(135deg, #a855f7, #7e22ce)', padding: '4rem', borderRadius: '30px', border: '1px solid #d8b4fe', textAlign: 'center', boxShadow: '0 20px 50px rgba(168,85,247,0.3)' }}>
                                <div style={{ width: '100px', height: '100px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                                    <Thermometer size={50} color="#7e22ce" />
                                </div>
                                <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '1rem', color: 'white' }}>¡Hogar Eficiente!</h2>
                                <p style={{ fontSize: '1.2rem', color: '#f3e8ff', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem', lineHeight: '1.6' }}>
                                    Dominas los principios del diseño bioclimático: Orientación al Norte, Aislamiento Térmico y Ventilación Cruzada. ¡Aplicar esto ahorra energía y mejora el bienestar como nos enseñó Daniela Olmos!
                                </p>
                                <button onClick={generateDiploma} style={{ background: 'white', color: '#7e22ce', border: 'none', padding: '1.2rem 3rem', borderRadius: '50px', fontSize: '1.2rem', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', margin: '0 auto' }}>
                                    <Download size={24} /> OBTENER DIPLOMA BIOCLIMÁTICO
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <style jsx>{`
                .choice-btn {
                    background: #f8fafc;
                    border: 1px solid #cbd5e1;
                    color: #1e293b;
                    padding: 1.5rem;
                    border-radius: 15px;
                    font-size: 1.1rem;
                    text-align: left;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .choice-btn:hover {
                    background: #f3e8ff;
                    border-color: #a855f7;
                    transform: translateX(10px);
                }
            `}</style>
        </div>
    );
}
