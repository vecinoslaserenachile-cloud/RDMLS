import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Apple, Leaf, Utensils, Droplet, CheckCircle, ShieldAlert, Download, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import confetti from 'canvas-confetti';
import { logElearningActivity } from '../utils/elearningLogger';

export default function LoretoNarbona() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [isLogged, setIsLogged] = useState(false);
    
    const [phase, setPhase] = useState(1);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        document.title = "Feria y Salud | Loreto Narbona";
        const savedUser = localStorage.getItem('loreto_narbona_user');
        const savedEmail = localStorage.getItem('loreto_narbona_email');
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
            localStorage.setItem('loreto_narbona_user', userName);
            localStorage.setItem('loreto_narbona_email', userEmail);
            logElearningActivity('Loreto Narbona - Nutrición', userName, userEmail, 'login');
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
            
            page.drawRectangle({ x: 0, y: 0, width: 800, height: 600, color: rgb(0.9, 0.2, 0.2) });
            page.drawRectangle({ x: 20, y: 20, width: 760, height: 560, color: rgb(1, 0.95, 0.95) });
            page.drawRectangle({ x: 30, y: 30, width: 740, height: 540, color: rgb(1, 1, 1) });
            
            page.drawText('ACADEMIA ENTREVECINAS', { x: 260, y: 480, size: 20, font: helveticaFont, color: rgb(0.8, 0.1, 0.2) });
            page.drawText('CERTIFICADO OFICIAL', { x: 230, y: 420, size: 30, font: helveticaFont, color: rgb(0.1, 0.1, 0.1) });
            page.drawText('Certificamos que', { x: 340, y: 360, size: 16, font: helveticaRegular, color: rgb(0.3, 0.3, 0.3) });
            page.drawText(userName.toUpperCase(), { x: 400 - (userName.length * 8), y: 310, size: 30, font: helveticaFont, color: rgb(0.8, 0.1, 0.2) });
            page.drawText('Ha completado con éxito la capacitación y es reconocido(a) como:', { x: 180, y: 250, size: 14, font: helveticaRegular, color: rgb(0.3, 0.3, 0.3) });
            page.drawText('EMBAJADOR DE ALIMENTACIÓN SANA', { x: 150, y: 190, size: 24, font: helveticaFont, color: rgb(0.2, 0.6, 0.2) });
            
            const date = new Date().toLocaleDateString();
            page.drawText(`Fecha: ${date}`, { x: 100, y: 100, size: 12, font: helveticaRegular, color: rgb(0.5, 0.5, 0.5) });
            page.drawText('Firma: Loreto Narbona (Virtual)', { x: 500, y: 100, size: 12, font: helveticaRegular, color: rgb(0.5, 0.5, 0.5) });

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `Diploma_Nutricion_${userName.replace(' ', '_')}.pdf`;
            link.click();
            
            logElearningActivity('Loreto Narbona - Nutrición', userName, userEmail, 'diploma_downloaded');
            
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        } catch (e) {
            console.error(e);
            alert('Error generando diploma.');
        }
    };

    if (!isLogged) {
        return (
            <div style={{ minHeight: '100vh', background: '#fff1f2', color: '#1e293b', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'Outfit', sans-serif" }}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'white', padding: '3rem', borderRadius: '30px', border: '1px solid rgba(244, 63, 94, 0.3)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', maxWidth: '450px', width: '90%', textAlign: 'center' }}>
                    <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #f43f5e, #be123c)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                        <Apple size={40} color="white" />
                    </div>
                    <h1 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '1rem', color: '#be123c' }}>De la Feria al Plato</h1>
                    <p style={{ color: '#64748b', marginBottom: '2rem' }}>Aprende sobre nutrición, compras locales e hidratación con Loreto Narbona.</p>
                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ position: 'relative' }}>
                            <User size={20} color="#f43f5e" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input type="text" placeholder="Tu nombre..." value={userName} onChange={e => setUserName(e.target.value)} style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '15px', border: '1px solid #e2e8f0', background: '#f8fafc', color: '#1e293b', boxSizing: 'border-box' }} required />
                        </div>
                        <input type="email" placeholder="Tu correo electrónico..." value={userEmail} onChange={e => setUserEmail(e.target.value)} style={{ width: '100%', padding: '1rem', borderRadius: '15px', border: '1px solid #e2e8f0', background: '#f8fafc', color: '#1e293b', boxSizing: 'border-box' }} required />
                        <button type="submit" style={{ width: '100%', padding: '1rem', background: '#f43f5e', color: 'white', border: 'none', borderRadius: '15px', fontWeight: '900', fontSize: '1.1rem', cursor: 'pointer', marginTop: '1rem' }}>COMENZAR CURSO</button>
                    </form>
                    <button type="button" onClick={() => navigate('/entrevecinas')} style={{ background: 'transparent', color: '#94a3b8', border: 'none', marginTop: '1rem', cursor: 'pointer', textDecoration: 'underline' }}>Volver al Hub</button>
                </motion.div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#fff1f2', color: '#1e293b', fontFamily: "'Outfit', sans-serif" }}>
            <header style={{ padding: '1.5rem 2rem', background: 'white', borderBottom: '1px solid #ffe4e6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ background: '#f43f5e', padding: '10px', borderRadius: '12px' }}><Apple size={24} color="white" /></div>
                    <div>
                        <div style={{ fontSize: '1.2rem', fontWeight: '900' }}>ALIMENTACIÓN SALUDABLE</div>
                        <div style={{ fontSize: '0.8rem', color: '#e11d48' }}>Loreto Narbona</div>
                    </div>
                </div>
                <button onClick={() => navigate('/entrevecinas')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>Salir al Hub</button>
            </header>

            <main style={{ maxWidth: '1000px', margin: '3rem auto', padding: '0 2rem' }}>
                {/* Progress Bar */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '3rem' }}>
                    {[1, 2, 3].map(p => (
                        <div key={p} style={{ flex: 1, height: '8px', borderRadius: '4px', background: phase >= p ? '#f43f5e' : '#ffe4e6', transition: '0.3s' }} />
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
                            <div style={{ background: 'white', padding: '3rem', borderRadius: '30px', border: '1px solid #ffe4e6', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem', color: '#e11d48' }}>1. La regla del plato</h2>
                                <p style={{ fontSize: '1.2rem', color: '#64748b', marginBottom: '2rem', lineHeight: '1.6' }}>Para organizar un almuerzo saludable, ¿cuál es la proporción correcta según el Método del Plato de Harvard (y que recomienda Loreto)?</p>
                                
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                                    <button onClick={() => handleAnswer(false, "Mucha proteína y carbohidrato, pero carece de la fibra y vitaminas que te entregan los vegetales.")} className="choice-btn">
                                        50% Carne, 50% Arroz/Fideos. Cero verduras.
                                    </button>
                                    <button onClick={() => handleAnswer(true, "¡Correcto! La mitad del plato deben ser vegetales (ensaladas, verduras cocidas), un cuarto proteína (huevo, legumbres, carne magra) y un cuarto de carbohidratos complejos.")} className="choice-btn correct">
                                        50% Vegetales, 25% Proteínas, 25% Carbohidratos.
                                    </button>
                                    <button onClick={() => handleAnswer(false, "Un plato solo de verduras no te dará la energía ni los aminoácidos necesarios. ¡Necesitas equilibrio!")} className="choice-btn">
                                        100% Lechuga y verduras verdes.
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {phase === 2 && !feedback && (
                        <motion.div key="p2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div style={{ background: 'white', padding: '3rem', borderRadius: '30px', border: '1px solid #ffe4e6', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem', color: '#e11d48' }}>2. Proteína de la Feria</h2>
                                <p style={{ fontSize: '1.2rem', color: '#64748b', marginBottom: '2rem', lineHeight: '1.6' }}>Estás en la feria libre y quieres comprar una fuente de proteína económica, saludable y excelente para reemplazar la carne roja. ¿Qué eliges?</p>
                                
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                                    <button onClick={() => handleAnswer(false, "Las vienesas y embutidos son ultraprocesados altos en sodio y grasas saturadas. ¡Evítalos!")} className="choice-btn">
                                        Vienesas y embutidos envasados.
                                    </button>
                                    <button onClick={() => handleAnswer(true, "¡Perfecto! Las legumbres (lentejas, garbanzos, porotos) son una excelente fuente de proteína vegetal, fibra y hierro, ¡y muy económicas en la feria!")} className="choice-btn correct">
                                        Legumbres (Lentejas, Garbanzos, Porotos).
                                    </button>
                                    <button onClick={() => handleAnswer(false, "Aunque son deliciosas, las papas fritas son carbohidratos fritos en aceite, no una fuente de proteína.")} className="choice-btn">
                                        Papas fritas envasadas.
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {phase === 3 && !feedback && (
                        <motion.div key="p3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div style={{ background: 'white', padding: '3rem', borderRadius: '30px', border: '1px solid #ffe4e6', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem', color: '#e11d48' }}>3. Hidratación Inteligente</h2>
                                <p style={{ fontSize: '1.2rem', color: '#64748b', marginBottom: '2rem', lineHeight: '1.6' }}>Para acompañar tus comidas y mantenerte hidratado durante el día, ¿cuál es la mejor opción?</p>
                                
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                                    <button onClick={() => handleAnswer(false, "Los jugos en polvo suelen tener altos niveles de edulcorantes artificiales y colorantes. El agua pura es mejor.")} className="choice-btn">
                                        Jugos en polvo (incluso los sin azúcar).
                                    </button>
                                    <button onClick={() => handleAnswer(false, "Las bebidas gaseosas, incluso las Zero, contienen ácidos que dañan el esmalte dental y no hidratan tan eficientemente como el agua.")} className="choice-btn">
                                        Bebida gaseosa Zero Azúcar.
                                    </button>
                                    <button onClick={() => handleAnswer(true, "¡Excelente! El agua pura es insuperable para hidratar el cuerpo. Y si es de la llave en La Serena, es perfectamente potable.")} className="choice-btn correct">
                                        Agua pura (de la llave o filtrada).
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {phase === 4 && !feedback && (
                        <motion.div key="p4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                            <div style={{ background: 'linear-gradient(135deg, #f43f5e, #be123c)', padding: '4rem', borderRadius: '30px', border: '1px solid #fca5a5', textAlign: 'center', boxShadow: '0 20px 50px rgba(244,63,94,0.3)' }}>
                                <div style={{ width: '100px', height: '100px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                                    <Utensils size={50} color="#be123c" />
                                </div>
                                <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '1rem', color: 'white' }}>¡Nutrición Dominada!</h2>
                                <p style={{ fontSize: '1.2rem', color: '#ffe4e6', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem', lineHeight: '1.6' }}>
                                    Ahora sabes cómo estructurar un plato balanceado, aprovechar los recursos económicos de la feria y mantenerte hidratado. ¡Loreto Narbona estaría orgullosa!
                                </p>
                                <button onClick={generateDiploma} style={{ background: 'white', color: '#be123c', border: 'none', padding: '1.2rem 3rem', borderRadius: '50px', fontSize: '1.2rem', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', margin: '0 auto' }}>
                                    <Download size={24} /> OBTENER DIPLOMA NUTRICIONAL
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
                    background: #fff1f2;
                    border-color: #f43f5e;
                    transform: translateX(10px);
                }
            `}</style>
        </div>
    );
}
