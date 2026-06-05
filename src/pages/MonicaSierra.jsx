import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Droplet, Sun, Scissors, CheckCircle, ShieldAlert, Download, User, ChevronRight, Sparkles, Droplets } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import confetti from 'canvas-confetti';
import { logElearningActivity } from '../utils/elearningLogger';
import { playCorrectSound, playErrorSound, playLevelUpSound, playStartSound } from '../utils/soundEffects';

export default function MonicaSierra() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [isLogged, setIsLogged] = useState(false);
    
    const [phase, setPhase] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        document.title = "Taller de Batik | Mónica Sierra";
        const savedUser = localStorage.getItem('monica_sierra_user');
        const savedEmail = localStorage.getItem('monica_sierra_email');
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
            localStorage.setItem('monica_sierra_user', userName);
            localStorage.setItem('monica_sierra_email', userEmail);
            logElearningActivity('Mónica Sierra - Batik', userName, userEmail, 'login');
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
            
            page.drawRectangle({ x: 0, y: 0, width: 800, height: 600, color: rgb(0.8, 0.2, 0.5) });
            page.drawRectangle({ x: 20, y: 20, width: 760, height: 560, color: rgb(0.98, 0.9, 0.95) });
            page.drawRectangle({ x: 30, y: 30, width: 740, height: 540, color: rgb(1, 1, 1) });
            
            page.drawText('ACADEMIA ENTREVECINAS', { x: 260, y: 480, size: 20, font: helveticaFont, color: rgb(0.6, 0.1, 0.4) });
            page.drawText('CERTIFICADO OFICIAL', { x: 230, y: 420, size: 30, font: helveticaFont, color: rgb(0.1, 0.1, 0.1) });
            page.drawText('Certificamos que', { x: 340, y: 360, size: 16, font: helveticaRegular, color: rgb(0.3, 0.3, 0.3) });
            page.drawText(userName.toUpperCase(), { x: 400 - (userName.length * 8), y: 310, size: 30, font: helveticaFont, color: rgb(0.8, 0.2, 0.5) });
            page.drawText('Ha completado con éxito el taller y es reconocido(a) como:', { x: 180, y: 250, size: 14, font: helveticaRegular, color: rgb(0.3, 0.3, 0.3) });
            page.drawText('ARTESANO(A) EN BATIK', { x: 250, y: 190, size: 24, font: helveticaFont, color: rgb(0.9, 0.4, 0.1) });
            
            const date = new Date().toLocaleDateString();
            page.drawText(`Fecha: ${date}`, { x: 100, y: 100, size: 12, font: helveticaRegular, color: rgb(0.5, 0.5, 0.5) });
            page.drawText('Firma: Entrevecinas', { x: 500, y: 100, size: 12, font: helveticaRegular, color: rgb(0.5, 0.5, 0.5) });

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `Diploma_Batik_${userName.replace(' ', '_')}.pdf`;
            link.click();
            
            logElearningActivity('Mónica Sierra - Batik', userName, userEmail, 'diploma_downloaded');
            
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        } catch (e) {
            console.error(e);
            alert('Error generando diploma.');
        }
    };

    if (!isLogged) {
        return (
            <div style={{ minHeight: '100vh', background: '#fdf2f8', color: '#1e293b', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'Outfit', sans-serif" }}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'white', padding: '2rem', borderRadius: '30px', border: '1px solid rgba(236, 72, 153, 0.3)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', maxWidth: '450px', width: '90%', textAlign: 'center' }}>
                    <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #ec4899, #db2777)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 10px 20px rgba(236,72,153,0.3)' }}>
                        <Palette size={40} color="white" />
                    </div>
                    <h1 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '1rem', color: '#db2777' }}>Arte en Seda y Batik</h1>
                    <p style={{ color: '#64748b', marginBottom: '2rem' }}>Aprende la técnica milenaria del teñido por reserva con Mónica Sierra.</p>
                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ position: 'relative' }}>
                            <User size={20} color="#ec4899" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input type="text" placeholder="Tu nombre..." value={userName} onChange={e => setUserName(e.target.value)} style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '15px', border: '1px solid #e2e8f0', background: '#f8fafc', color: '#1e293b', boxSizing: 'border-box' }} required />
                        </div>
                        <input type="email" placeholder="Tu correo electrónico..." value={userEmail} onChange={e => setUserEmail(e.target.value)} style={{ width: '100%', padding: '1rem', borderRadius: '15px', border: '1px solid #e2e8f0', background: '#f8fafc', color: '#1e293b', boxSizing: 'border-box' }} required />
                        <motion.button whileTap={{ scale: 0.95 }} type="submit" style={{ width: '100%', padding: '1.2rem', background: 'linear-gradient(90deg, #ec4899, #db2777)', color: 'white', border: 'none', borderRadius: '15px', fontWeight: '900', fontSize: '1.1rem', cursor: 'pointer', marginTop: '1rem', boxShadow: '0 10px 20px rgba(236,72,153,0.3)' }}>
                            ENTRAR AL TALLER
                        </motion.button>
                    </form>
                    <button type="button" onClick={() => navigate('/entrevecinas')} style={{ background: 'transparent', color: '#94a3b8', border: 'none', marginTop: '1.5rem', cursor: 'pointer', textDecoration: 'underline' }}>Volver al Hub</button>
                </motion.div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#fdf2f8', color: '#1e293b', fontFamily: "'Outfit', sans-serif", overflowX: 'hidden' }}>
            <header style={{ padding: '1rem 5%', background: 'white', borderBottom: '1px solid #fbcfe8', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10, boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ background: '#ec4899', padding: '10px', borderRadius: '12px' }}><Palette size={24} color="white" /></div>
                    <div>
                        <div style={{ fontSize: '1.2rem', fontWeight: '900', lineHeight: 1 }}>TALLER DE BATIK</div>
                        <div style={{ fontSize: '0.8rem', color: '#db2777' }}>Mónica Sierra</div>
                    </div>
                </div>
                <button onClick={() => navigate('/entrevecinas')} style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', color: '#64748b', padding: '8px 15px', borderRadius: '20px', cursor: 'pointer', fontSize: '0.9rem' }}>Salir</button>
            </header>

            <main style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 5%' }}>
                {/* Progress Bar */}
                {phase > 1 && phase < 5 && (
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '2rem' }}>
                        {[2, 3, 4].map(p => (
                            <div key={p} style={{ flex: 1, height: '8px', borderRadius: '4px', background: phase >= p ? '#ec4899' : '#fce7f3', transition: '0.3s', boxShadow: phase >= p ? '0 0 10px rgba(236,72,153,0.5)' : 'none' }} />
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
                        <motion.div key="teoria" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                            <div style={{ background: 'white', padding: '2.5rem 1.5rem', borderRadius: '30px', border: '1px solid #fbcfe8', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                                    <div style={{ background: '#fdf2f8', padding: '15px', borderRadius: '20px' }}>
                                        <Palette size={35} color="#ec4899" />
                                    </div>
                                    <h2 style={{ fontSize: '2rem', fontWeight: '900', color: '#1e293b', margin: 0 }}>El Arte del Batik</h2>
                                </div>
                                <p style={{ fontSize: '1.15rem', color: '#475569', marginBottom: '1.5rem', lineHeight: '1.7' }}>
                                    El <strong>Batik</strong> es una técnica milenaria originaria de Indonesia que consiste en teñir telas (como la seda o el algodón) utilizando cera como barrera protectora.
                                </p>
                                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '20px', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                                    <h3 style={{ fontSize: '1.3rem', color: '#db2777', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}><Droplet size={24} /> Teñido por Reserva</h3>
                                    <p style={{ color: '#64748b', lineHeight: '1.6', marginBottom: '1rem' }}>El principio fundamental del Batik es el <strong>teñido por reserva</strong>. Para evitar que el tinte penetre en ciertas zonas del diseño, se aplica <strong>cera de abeja caliente</strong> (a menudo mezclada con parafina). La cera impermeabiliza la tela. Al sumergir la pieza en un baño de tinte <strong>frío</strong> (para que no derrita la cera), las áreas sin cera absorben el color, mientras que las reservadas conservan su tono original.</p>
                                    
                                    <h3 style={{ fontSize: '1.3rem', color: '#db2777', marginBottom: '1rem', marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}><Sparkles size={24} /> El Craquelado</h3>
                                    <p style={{ color: '#64748b', lineHeight: '1.6' }}>El efecto más valorado y distintivo del Batik es el <strong>craquelado</strong>. Se logra arrugando suavemente la tela una vez que la cera está seca. Esto crea micro-fisuras en la capa de cera. Al realizar un nuevo baño de tinte (usualmente más oscuro), el color se filtra por estas pequeñas grietas, creando una red de finas "venitas" que dan a cada pieza un carácter único e irrepetible.</p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <motion.button whileTap={{ scale: 0.95 }} onClick={() => { setPhase(1); }} style={{ background: 'linear-gradient(90deg, #ec4899, #db2777)', color: 'white', border: 'none', padding: '1.2rem 2.5rem', borderRadius: '50px', fontSize: '1.1rem', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 10px 20px rgba(236,72,153,0.3)' }}>
                                        ENTENDIDO <ChevronRight size={20} />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {phase === 1 && (
                        <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                            <div style={{ background: 'white', padding: '2.5rem 1.5rem', borderRadius: '30px', border: '1px solid #fbcfe8', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                                <div style={{ background: '#fdf2f8', padding: '15px', borderRadius: '50%', display: 'inline-flex', marginBottom: '1rem' }}>
                                    <Sparkles size={40} color="#ec4899" />
                                </div>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem', color: '#1e293b' }}>Trivia Final</h2>
                                <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '2rem', lineHeight: '1.6', maxWidth: '500px', margin: '0 auto 2rem' }}>
                                    Demuestra lo que aprendiste sobre las técnicas milenarias del Batik. Responde correctamente para graduarte y obtener tu certificado.
                                </p>
                                <motion.button whileTap={{ scale: 0.95 }} onClick={() => { playStartSound(); setPhase(2); }} style={{ background: 'linear-gradient(90deg, #ec4899, #db2777)', color: 'white', border: 'none', padding: '1.2rem 3rem', borderRadius: '50px', fontSize: '1.2rem', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', margin: '0 auto', boxShadow: '0 10px 20px rgba(236,72,153,0.3)' }}>
                                    COMENZAR EXAMEN <ChevronRight size={24} />
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    {phase === 2 && !feedback && (
                        <motion.div key="p1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div style={{ background: 'white', padding: '2rem 1.5rem', borderRadius: '30px', border: '1px solid #fbcfe8', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                                    <div style={{ background: '#ec4899', padding: '12px', borderRadius: '15px' }}><Droplet size={30} color="white" /></div>
                                    <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#1e293b', margin: 0 }}>Reserva con Cera</h2>
                                </div>
                                <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '2rem', lineHeight: '1.6' }}>El Batik es una técnica de teñido "por reserva". Antes de sumergir la seda en el tinte, ¿qué debes aplicar sobre la tela para crear tu diseño y que esa zona mantenga su color original?</p>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(false, "El pegamento arruinaría la seda permanentemente y no permite el craquelado característico del Batik.")} className="choice-btn">
                                        <span>Pegamento escolar sintético.</span>
                                        <ChevronRight size={20} color="#ec4899" style={{ flexShrink: 0 }} />
                                    </motion.button>
                                    <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(true, "¡Exacto! La cera de abeja (a menudo mezclada con parafina) sella la tela. Cuando sumerjas la seda en el tinte, el color no entrará donde pintaste con cera.")} className="choice-btn">
                                        <span>Cera de abeja derretida (caliente).</span>
                                        <ChevronRight size={20} color="#ec4899" style={{ flexShrink: 0 }} />
                                    </motion.button>
                                    <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(false, "La pintura acrílica es rígida y cubriría la tela, pero el Batik consiste en teñir la seda en baños de color, no en pintarla por encima.")} className="choice-btn">
                                        <span>Pintura acrílica blanca.</span>
                                        <ChevronRight size={20} color="#ec4899" style={{ flexShrink: 0 }} />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {phase === 3 && !feedback && (
                        <motion.div key="p2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div style={{ background: 'white', padding: '2rem 1.5rem', borderRadius: '30px', border: '1px solid #fbcfe8', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                                    <div style={{ background: '#ec4899', padding: '12px', borderRadius: '15px' }}><Sun size={30} color="white" /></div>
                                    <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#1e293b', margin: 0 }}>El Teñido en Frío</h2>
                                </div>
                                <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '2rem', lineHeight: '1.6' }}>Has aplicado la cera y ahora vas a teñir la seda para darle el primer color de fondo. ¿A qué temperatura debe estar el baño de tinte?</p>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(false, "¡Error fatal! Si el tinte está hirviendo, derretirá instantáneamente la cera de abeja y perderás todo tu diseño de reserva.")} className="choice-btn">
                                        <span>Hirviendo, para que el color fije más rápido.</span>
                                        <ChevronRight size={20} color="#ec4899" style={{ flexShrink: 0 }} />
                                    </motion.button>
                                    <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(true, "¡Correcto! El tinte debe estar frío (o a temperatura ambiente baja) para no derretir la cera de abeja que aplicaste como reserva.")} className="choice-btn">
                                        <span>Frío, o a temperatura ambiente.</span>
                                        <ChevronRight size={20} color="#ec4899" style={{ flexShrink: 0 }} />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {phase === 4 && !feedback && (
                        <motion.div key="p3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div style={{ background: 'white', padding: '2rem 1.5rem', borderRadius: '30px', border: '1px solid #fbcfe8', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                                    <div style={{ background: '#ec4899', padding: '12px', borderRadius: '15px' }}><Scissors size={30} color="white" /></div>
                                    <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#1e293b', margin: 0 }}>El Craquelado</h2>
                                </div>
                                <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '2rem', lineHeight: '1.6' }}>El Batik es famoso por esas "venitas" de color que cruzan las zonas protegidas por la cera. ¿Cómo se logra este efecto craquelado característico?</p>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(false, "Pintar rayitas finas a mano es otra técnica, pero no es el auténtico craquelado del Batik.")} className="choice-btn">
                                        <span>Pintando rayitas muy finas con un pincel sobre la cera.</span>
                                        <ChevronRight size={20} color="#ec4899" style={{ flexShrink: 0 }} />
                                    </motion.button>
                                    <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(true, "¡Exacto! Al arrugar la tela, la cera seca se quiebra creando micro-fisuras. Cuando vuelves a teñir la tela, el color penetra por esas grietas creando el hermoso efecto de venas típico del Batik.")} className="choice-btn">
                                        <span>Arrugando ligeramente la tela engomada con cera seca antes de volver a teñirla, para que el color entre por las grietas.</span>
                                        <ChevronRight size={20} color="#ec4899" style={{ flexShrink: 0 }} />
                                    </motion.button>
                                    <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(false, "Cortar la tela destruiría la pieza de seda.")} className="choice-btn">
                                        <span>Haciendo pequeños cortes con una tijera.</span>
                                        <ChevronRight size={20} color="#ec4899" style={{ flexShrink: 0 }} />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {phase === 5 && !feedback && (
                        <motion.div key="p4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                            <div style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)', padding: '3rem 1.5rem', borderRadius: '30px', border: '2px solid #f9a8d4', textAlign: 'center', boxShadow: '0 20px 50px rgba(236,72,153,0.3)' }}>
                                <div style={{ width: '100px', height: '100px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
                                    <Palette size={50} color="#be185d" />
                                </div>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem', color: 'white', lineHeight: 1.1 }}>¡Obra Maestra!</h2>
                                <p style={{ fontSize: '1.1rem', color: '#fbcfe8', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
                                    Has aprendido la paciencia, precisión y magia del teñido con cera. Como dice Mónica Sierra, el Batik es un arte de capas y tiempos, tan único como nuestra región.
                                </p>
                                <motion.button whileTap={{ scale: 0.95 }} onClick={generateDiploma} style={{ background: 'white', color: '#be185d', border: 'none', padding: '1.2rem 2rem', borderRadius: '50px', fontSize: '1.1rem', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', maxWidth: '350px', margin: '0 auto', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
                                    <Download size={24} /> OBTENER DIPLOMA TEXTIL
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
                    background: #fdf2f8;
                    border-color: #ec4899;
                }
            `}</style>
        </div>
    );
}
