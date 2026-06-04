import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, TreePine, Droplets, ArrowRight, CheckCircle, ShieldAlert, Waves, Leaf, Download, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import confetti from 'canvas-confetti';
import { logElearningActivity } from '../utils/elearningLogger';

export default function PaulinaGodoy() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [isLogged, setIsLogged] = useState(false);
    
    const [phase, setPhase] = useState(1);
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
            setIsLogged(true);
            localStorage.setItem('paulina_godoy_user', userName);
            localStorage.setItem('paulina_godoy_email', userEmail);
            logElearningActivity('Paulina Godoy - Urbanismo', userName, userEmail, 'login');
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
            page.drawText('Firma: Paulina Godoy (Virtual)', { x: 500, y: 100, size: 12, font: helveticaRegular, color: rgb(0.5, 0.5, 0.5) });

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
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'rgba(6, 78, 59, 0.6)', padding: '3rem', borderRadius: '30px', border: '1px solid rgba(16, 185, 129, 0.3)', backdropFilter: 'blur(20px)', maxWidth: '450px', width: '90%', textAlign: 'center' }}>
                    <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #10b981, #047857)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                        <TreePine size={40} color="white" />
                    </div>
                    <h1 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '1rem' }}>Humedal El Culebrón</h1>
                    <p style={{ color: '#6ee7b7', marginBottom: '2rem' }}>Aprende sobre Infraestructura Verde y Planificación Urbana con la arquitecta Paulina Godoy.</p>
                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ position: 'relative' }}>
                            <User size={20} color="#6ee7b7" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input type="text" placeholder="Tu nombre..." value={userName} onChange={e => setUserName(e.target.value)} style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.3)', color: 'white', boxSizing: 'border-box' }} required />
                        </div>
                        <input type="email" placeholder="Tu correo electrónico..." value={userEmail} onChange={e => setUserEmail(e.target.value)} style={{ width: '100%', padding: '1rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.3)', color: 'white', boxSizing: 'border-box' }} required />
                        <button type="submit" style={{ width: '100%', padding: '1rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '15px', fontWeight: '900', fontSize: '1.1rem', cursor: 'pointer', marginTop: '1rem' }}>ENTRAR AL PROYECTO</button>
                    </form>
                    <button type="button" onClick={() => navigate('/entrevecinas')} style={{ background: 'transparent', color: '#6ee7b7', border: 'none', marginTop: '1rem', cursor: 'pointer', textDecoration: 'underline' }}>Volver al Hub</button>
                </motion.div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#064e3b', color: 'white', fontFamily: "'Outfit', sans-serif" }}>
            <header style={{ padding: '1.5rem 2rem', background: 'rgba(0,0,0,0.4)', borderBottom: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ background: '#10b981', padding: '10px', borderRadius: '12px' }}><Map size={24} color="white" /></div>
                    <div>
                        <div style={{ fontSize: '1.2rem', fontWeight: '900' }}>PLAN MAESTRO URBANO</div>
                        <div style={{ fontSize: '0.8rem', color: '#6ee7b7' }}>Arq. Paulina Godoy</div>
                    </div>
                </div>
                <button onClick={() => navigate('/entrevecinas')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>Salir al Hub</button>
            </header>

            <main style={{ maxWidth: '1000px', margin: '3rem auto', padding: '0 2rem' }}>
                {/* Progress Bar */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '3rem' }}>
                    {[1, 2, 3, 4].map(p => (
                        <div key={p} style={{ flex: 1, height: '8px', borderRadius: '4px', background: phase >= p ? '#10b981' : 'rgba(255,255,255,0.1)', transition: '0.3s' }} />
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {feedback && (
                        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ background: feedback.isCorrect ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)', border: `1px solid ${feedback.isCorrect ? '#10b981' : '#ef4444'}`, padding: '1.5rem', borderRadius: '15px', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '15px' }}>
                            {feedback.isCorrect ? <CheckCircle size={30} color="#10b981" /> : <ShieldAlert size={30} color="#ef4444" />}
                            <span style={{ fontSize: '1.1rem', color: feedback.isCorrect ? '#6ee7b7' : '#fca5a5' }}>{feedback.text}</span>
                        </motion.div>
                    )}

                    {phase === 1 && !feedback && (
                        <motion.div key="p1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '3rem', borderRadius: '30px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem', color: '#34d399' }}>1. Defensa Costera</h2>
                                <p style={{ fontSize: '1.2rem', color: '#a7f3d0', marginBottom: '2rem', lineHeight: '1.6' }}>El Humedal El Culebrón enfrenta el riesgo constante de marejadas. Como urbanista, ¿cuál es la mejor forma de proteger la ciudad costera?</p>
                                
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                                    <button onClick={() => handleAnswer(false, "El hormigón rebota la energía de las olas y termina erosionando más la playa. Además, corta la conexión ecológica.")} className="choice-btn">
                                        Levantar un gran muro de contención de hormigón a lo largo de la costa.
                                    </button>
                                    <button onClick={() => handleAnswer(true, "¡Exacto! Esta es la esencia de la infraestructura verde. El parque actúa como esponja, absorbiendo la energía del mar de forma natural y ofreciendo un espacio público de calidad.")} className="choice-btn correct">
                                        Construir un "Parque Inundable" con bordes blandos y dunas restauradas.
                                    </button>
                                    <button onClick={() => handleAnswer(false, "El enrocado es rígido y poco amigable con el ecosistema. Funciona, pero arruina el valor paisajístico y ambiental del humedal.")} className="choice-btn">
                                        Instalar un enrocado pesado (rompeolas de piedras gigantes) en la orilla.
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {phase === 2 && !feedback && (
                        <motion.div key="p2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '3rem', borderRadius: '30px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem', color: '#34d399' }}>2. Conectividad Social</h2>
                                <p style={{ fontSize: '1.2rem', color: '#a7f3d0', marginBottom: '2rem', lineHeight: '1.6' }}>Históricamente, Coquimbo le ha dado la espalda a su humedal. ¿Cómo logras que los vecinos vuelvan a apropiarse del lugar sin destruirlo?</p>
                                
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                                    <button onClick={() => handleAnswer(true, "¡Correcto! Las pasarelas elevadas permiten el tránsito humano sin aplastar los nidos ni compactar el suelo, logrando un equilibrio perfecto.")} className="choice-btn correct">
                                        Instalar pasarelas de madera elevadas y estaciones de avistamiento de aves.
                                    </button>
                                    <button onClick={() => handleAnswer(false, "Pavimentar el humedal destruye la infiltración de agua y ahuyenta a la fauna local. ¡No es sostenible!")} className="choice-btn">
                                        Pavimentar un gran paseo peatonal con asfalto directamente sobre el barro.
                                    </button>
                                    <button onClick={() => handleAnswer(false, "Si cierras el humedal, los vecinos no lo valorarán. La conservación moderna requiere que la comunidad conozca y ame su entorno.")} className="choice-btn">
                                        Cerrar completamente el humedal con mallas para que nadie pueda entrar.
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {phase === 3 && !feedback && (
                        <motion.div key="p3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '3rem', borderRadius: '30px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem', color: '#34d399' }}>3. Flora Resiliente</h2>
                                <p style={{ fontSize: '1.2rem', color: '#a7f3d0', marginBottom: '2rem', lineHeight: '1.6' }}>Para consolidar el Parque Inundable, necesitas plantar vegetación. ¿Qué tipo de plantas eliges para asegurar que el proyecto sobreviva a largo plazo?</p>
                                
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                                    <button onClick={() => handleAnswer(false, "El césped requiere demasiada agua (que escasea) y no soporta bien la salinidad del estero ni de las marejadas.")} className="choice-btn">
                                        Plantación masiva de césped ornamental para que se vea como un campo de golf.
                                    </button>
                                    <button onClick={() => handleAnswer(false, "Los eucaliptos y pinos secan el suelo y son especies exóticas invasoras. Destruirían el equilibrio del humedal.")} className="choice-btn">
                                        Eucaliptos y Pinos de rápido crecimiento para generar sombra rápida.
                                    </button>
                                    <button onClick={() => handleAnswer(true, "¡Perfecto! Las plantas nativas costeras (como docas, totoras y arbustos locales) soportan la salinidad, requieren poca agua y afirman el suelo previniendo la erosión.")} className="choice-btn correct">
                                        Flora nativa adaptada a la salinidad y al bajo consumo hídrico (flora endémica).
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {phase === 4 && !feedback && (
                        <motion.div key="p4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                            <div style={{ background: 'linear-gradient(135deg, #064e3b, #022c22)', padding: '4rem', borderRadius: '30px', border: '1px solid #10b981', textAlign: 'center', boxShadow: '0 20px 50px rgba(16,185,129,0.2)' }}>
                                <div style={{ width: '100px', height: '100px', background: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                                    <Leaf size={50} color="white" />
                                </div>
                                <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '1rem', color: 'white' }}>¡Plan Maestro Aprobado!</h2>
                                <p style={{ fontSize: '1.2rem', color: '#6ee7b7', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem', lineHeight: '1.6' }}>
                                    Has entendido a la perfección la visión de Paulina Godoy. Un humedal no es un patio trasero ni un problema; es infraestructura verde de alto valor que protege y embellece nuestra ciudad.
                                </p>
                                <button onClick={generateDiploma} style={{ background: '#f59e0b', color: 'white', border: 'none', padding: '1.2rem 3rem', borderRadius: '50px', fontSize: '1.2rem', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', margin: '0 auto' }}>
                                    <Download size={24} /> OBTENER DIPLOMA URBANISTA
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <style jsx>{`
                .choice-btn {
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(16, 185, 129, 0.3);
                    color: white;
                    padding: 1.5rem;
                    border-radius: 15px;
                    font-size: 1.1rem;
                    text-align: left;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .choice-btn:hover {
                    background: rgba(16, 185, 129, 0.2);
                    border-color: #10b981;
                    transform: translateX(10px);
                }
            `}</style>
        </div>
    );
}
