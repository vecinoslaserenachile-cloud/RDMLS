import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Play, Award, ChevronRight, X, User, CheckCircle, Droplets, Leaf, Waves, ShieldAlert, Bird, Search, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import confetti from 'canvas-confetti';
import { logElearningActivity } from '../utils/elearningLogger';

export default function HumedalesCampos() {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [progress, setProgress] = useState(0);
  const [completedModules, setCompletedModules] = useState([]);
  const [activeModule, setActiveModule] = useState(null);
  const [showIntroAnimation, setShowIntroAnimation] = useState(true);

  // Módulo 2: Quiz Ley 21.202
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Módulo 3: Vigía Vecinal (Pilpilén, Zarapito, Garza)
  const [birdLevel, setBirdLevel] = useState(1);
  const [showBirdCard, setShowBirdCard] = useState(false);
  const [birdQuizAnswered, setBirdQuizAnswered] = useState(false);
  
  useEffect(() => {
    document.title = "Humedales y Borde Vivo | Entrevecinas.cl";
    const timer = setTimeout(() => setShowIntroAnimation(false), 5000);
    
    const savedUser = localStorage.getItem('humedales_user');
    const savedEmail = localStorage.getItem('humedales_email');
    const savedProgress = localStorage.getItem('humedales_progress');
    const savedModules = localStorage.getItem('humedales_completed');

    if (savedUser && savedEmail) {
      setUsername(savedUser);
      setUserEmail(savedEmail);
      setIsLogged(true);
      setShowIntroAnimation(false); // Skip if logged
    }
    if (savedProgress) setProgress(parseInt(savedProgress));
    if (savedModules) setCompletedModules(JSON.parse(savedModules));
    
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim().length > 2 && userEmail.trim()) {
      localStorage.setItem('humedales_user', username);
      localStorage.setItem('humedales_email', userEmail);
      setIsLogged(true);
      logElearningActivity('Humedales y Borde Vivo', username, userEmail, 'login');
      
      const audio = new Audio('https://www.soundjay.com/nature/ocean-wave-1.mp3');
      audio.volume = 0.5;
      audio.play().catch(e => console.log('Audio autoplay blocked'));
    }
  };

  const markModuleCompleted = (moduleId) => {
    if (!completedModules.includes(moduleId)) {
      const newModules = [...completedModules, moduleId];
      setCompletedModules(newModules);
      localStorage.setItem('humedales_completed', JSON.stringify(newModules));
      
      const newProgress = Math.min((newModules.length / 4) * 100, 100);
      setProgress(newProgress);
      localStorage.setItem('humedales_progress', newProgress.toString());
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0d9488', '#14b8a6', '#5eead4']
      });
    }
  };

  const generatePDF = async () => {
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([800, 600]);
      
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const helveticaRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
      
      page.drawRectangle({ x: 0, y: 0, width: 800, height: 600, color: rgb(0.05, 0.2, 0.2) });
      page.drawRectangle({ x: 20, y: 20, width: 760, height: 560, color: rgb(0.1, 0.3, 0.3) });
      page.drawRectangle({ x: 30, y: 30, width: 740, height: 540, color: rgb(1, 1, 1) });
      
      page.drawText('ACADEMIA ENTREVECINAS', { x: 260, y: 480, size: 20, font: helveticaFont, color: rgb(0.05, 0.5, 0.4) });
      page.drawText('CERTIFICADO OFICIAL', { x: 230, y: 420, size: 30, font: helveticaFont, color: rgb(0.1, 0.1, 0.1) });
      page.drawText('Certificamos que', { x: 340, y: 360, size: 16, font: helveticaRegular, color: rgb(0.3, 0.3, 0.3) });
      page.drawText(username.toUpperCase(), { x: 400 - (username.length * 8), y: 310, size: 35, font: helveticaFont, color: rgb(0.05, 0.5, 0.4) });
      page.drawText('Ha completado con éxito la capacitación y es reconocido(a) como:', { x: 180, y: 250, size: 14, font: helveticaRegular, color: rgb(0.3, 0.3, 0.3) });
      page.drawText('VIGÍA OFICIAL DEL BORDE VIVO', { x: 190, y: 190, size: 26, font: helveticaFont, color: rgb(0.9, 0.6, 0.1) });
      
      const date = new Date().toLocaleDateString();
      page.drawText(`Fecha: ${date}`, { x: 100, y: 100, size: 12, font: helveticaRegular, color: rgb(0.5, 0.5, 0.5) });
      page.drawText('Firma: Javiera Campos (Virtual)', { x: 550, y: 100, size: 12, font: helveticaRegular, color: rgb(0.5, 0.5, 0.5) });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Certificado_Vigia_Humedal_${username}.pdf`;
      link.click();
      logElearningActivity('Humedales y Borde Vivo', username, userEmail, 'diploma_downloaded');
    } catch (error) {
      console.error(error);
      alert('Error generando diploma.');
    }
  };

  if (showIntroAnimation) {
    return (
      <div style={{ position: 'fixed', inset: 0, background: '#022c22', zIndex: 99999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', overflow: 'hidden' }}>
        <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 4, ease: "easeOut" }}
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', background: 'linear-gradient(to top, #0d9488, transparent)', opacity: 0.5, zIndex: 1 }}
        />
        
        <motion.div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, delay: 1 }}
            >
                <Waves size={80} color="#5eead4" strokeWidth={1} />
            </motion.div>
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 3, delay: 0.5 }}
                style={{ marginTop: '2rem', textAlign: 'center' }}
            >
                <div style={{ fontSize: '1rem', letterSpacing: '4px', color: '#5eead4' }}>ENTREVECINAS.CL</div>
                <div style={{ fontSize: '2rem', fontWeight: '900', color: 'white' }}>CARGANDO ECOSISTEMA...</div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 3.5 }}
                style={{ position: 'absolute', bottom: '-80px', textAlign: 'center', width: '350px' }}
            >
                <div style={{ fontSize: '1rem', letterSpacing: '4px', color: '#5eead4' }}>ACADEMIA ECOLÓGICA</div>
                <div style={{ fontSize: '2.5rem', fontWeight: '900', color: 'white', textShadow: '0 0 20px rgba(20,184,166,0.5)' }}>HUMEDALES</div>
            </motion.div>
        </motion.div>
      </div>
    );
  }

  if (!isLogged) {
    return (
      <div style={{ minHeight: '100vh', background: '#022c22', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'Outfit', sans-serif", position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(13, 148, 136, 0.2) 0%, transparent 70%)', zIndex: 1 }} />
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ position: 'relative', zIndex: 10, background: 'rgba(20, 184, 166, 0.1)', padding: '3rem', borderRadius: '30px', border: '1px solid rgba(20, 184, 166, 0.3)', backdropFilter: 'blur(10px)', textAlign: 'center', maxWidth: '400px', width: '90%' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <Droplets size={60} color="#5eead4" />
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '0.5rem', color: 'white' }}>Borde Vivo</h1>
          <p style={{ color: '#99f6e4', marginBottom: '2rem' }}>Protegiendo el ecosistema urbano</p>
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <User size={20} color="#5eead4" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text" 
                placeholder="Tu nombre completo" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: '100%', padding: '15px 15px 15px 45px', borderRadius: '15px', border: '1px solid rgba(20, 184, 166, 0.5)', background: 'rgba(0,0,0,0.5)', color: 'white', fontSize: '1.1rem', outline: 'none', boxSizing: 'border-box' }}
                required
              />
            </div>
            <div style={{ position: 'relative' }}>
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                style={{ width: '100%', padding: '15px', borderRadius: '15px', border: '1px solid rgba(20, 184, 166, 0.5)', background: 'rgba(0,0,0,0.5)', color: 'white', fontSize: '1.1rem', outline: 'none', boxSizing: 'border-box' }}
                required
              />
            </div>
            <button type="submit" style={{ background: 'linear-gradient(90deg, #0d9488, #14b8a6)', color: 'white', border: 'none', padding: '15px', borderRadius: '15px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s', boxShadow: '0 10px 20px rgba(13, 148, 136, 0.3)' }}>
              Ingresar al Estuario
            </button>
            <button type="button" onClick={() => navigate('/')} style={{ background: 'transparent', color: '#99f6e4', border: 'none', padding: '10px', cursor: 'pointer', textDecoration: 'underline' }}>
              Volver al Inicio
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // Quiz Questions
  const quizQuestions = [
    { q: "¿Qué busca proteger principalmente la Ley 21.202?", options: ["Las zonas urbanas de la lluvia", "Los humedales dentro de áreas urbanas", "Los ríos en la cordillera"], ans: 1 },
    { q: "¿Es el humedal solo el área cubierta por agua?", options: ["Sí, el resto es playa", "No, incluye el área de amortiguación o 'borde vivo'", "Depende de la marea"], ans: 1 },
    { q: "¿Quién tiene la responsabilidad principal de proteger el humedal según Javiera?", options: ["Solo el municipio", "Solo el gobierno", "La ciudadanía y el municipio en conjunto"], ans: 2 }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#022c22', color: 'white', fontFamily: "'Outfit', sans-serif" }}>
      {/* HEADER */}
      <header className="humedales-header" style={{ padding: '1rem', background: 'rgba(0,0,0,0.4)', borderBottom: '1px solid rgba(20, 184, 166, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(10px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: '1 1 auto', minWidth: '200px' }}>
          <div onClick={() => navigate('/')} style={{ width: '40px', height: '40px', background: 'rgba(20, 184, 166, 0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
            <ChevronRight size={24} color="#5eead4" style={{ transform: 'rotate(180deg)' }} />
          </div>
          <div style={{ overflow: 'hidden' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: '900', margin: 0, display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              <Droplets size={18} color="#5eead4" style={{ flexShrink: 0 }} /> 
              <span style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>HUMEDALES Y BORDE VIVO</span>
            </h2>
            <div style={{ fontSize: '0.75rem', color: '#99f6e4', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>Javiera Campos - Proyecto GEF</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div className="hidden-mobile" style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.8rem', color: '#99f6e4' }}>Vigía en Entrenamiento</div>
            <div style={{ fontWeight: 'bold' }}>{username}</div>
          </div>
          <div style={{ width: '45px', height: '45px', background: 'linear-gradient(135deg, #0d9488, #14b8a6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '1.2rem', boxShadow: '0 0 15px rgba(20, 184, 166, 0.5)', flexShrink: 0 }}>
            {username.charAt(0).toUpperCase()}
          </div>
        </div>
      </header>

      {/* PROGRESS BAR */}
      <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)' }}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          style={{ height: '100%', background: '#5eead4', boxShadow: '0 0 10px #5eead4' }}
        />
      </div>

      <main style={{ padding: '1rem', maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        
        {/* MODULE 1: INTRO */}
        <motion.div 
          whileHover={{ y: -5 }}
          onClick={() => setActiveModule(1)}
          style={{ background: 'rgba(20, 184, 166, 0.05)', borderRadius: '25px', border: `1px solid ${completedModules.includes(1) ? '#10b981' : 'rgba(20, 184, 166, 0.3)'}`, padding: '2rem', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
        >
          {completedModules.includes(1) && <div style={{ position: 'absolute', top: '15px', right: '15px' }}><CheckCircle color="#10b981" size={28} /></div>}
          <Play size={40} color="#5eead4" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>1. La Entrevista</h3>
          <p style={{ color: '#94a3b8' }}>Observa la entrevista con Javiera Campos sobre el Borde Vivo.</p>
        </motion.div>

        {/* MODULE 2: LEY 21.202 */}
        <motion.div 
          whileHover={{ y: -5 }}
          onClick={() => { if(completedModules.includes(1)) setActiveModule(2); }}
          style={{ background: 'rgba(20, 184, 166, 0.05)', borderRadius: '25px', border: `1px solid ${completedModules.includes(2) ? '#10b981' : 'rgba(20, 184, 166, 0.3)'}`, padding: '2rem', cursor: completedModules.includes(1) ? 'pointer' : 'not-allowed', opacity: completedModules.includes(1) ? 1 : 0.5, position: 'relative' }}
        >
          {completedModules.includes(2) && <div style={{ position: 'absolute', top: '15px', right: '15px' }}><CheckCircle color="#10b981" size={28} /></div>}
          <ShieldAlert size={40} color="#5eead4" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>2. Ley 21.202</h3>
          <p style={{ color: '#94a3b8' }}>Aprende qué protege la ley de humedales urbanos.</p>
        </motion.div>

        {/* MODULE 3: VIGÍA VECINAL */}
        <motion.div 
          whileHover={{ y: -5 }}
          onClick={() => { if(completedModules.includes(2)) setActiveModule(3); }}
          style={{ background: 'rgba(20, 184, 166, 0.05)', borderRadius: '25px', border: `1px solid ${completedModules.includes(3) ? '#10b981' : 'rgba(20, 184, 166, 0.3)'}`, padding: '2rem', cursor: completedModules.includes(2) ? 'pointer' : 'not-allowed', opacity: completedModules.includes(2) ? 1 : 0.5, position: 'relative' }}
        >
          {completedModules.includes(3) && <div style={{ position: 'absolute', top: '15px', right: '15px' }}><CheckCircle color="#10b981" size={28} /></div>}
          <Search size={40} color="#5eead4" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>3. Vigía Vecinal</h3>
          <p style={{ color: '#94a3b8' }}>Usa los binoculares para encontrar al ave Pilpilén.</p>
        </motion.div>

        {/* MODULE 4: CERTIFICADO */}
        <motion.div 
          whileHover={{ y: -5 }}
          onClick={() => { if(completedModules.includes(3)) setActiveModule(4); }}
          style={{ background: completedModules.includes(3) ? 'linear-gradient(135deg, rgba(20, 184, 166, 0.2), rgba(16, 185, 129, 0.2))' : 'rgba(20, 184, 166, 0.05)', borderRadius: '25px', border: `1px solid ${completedModules.includes(3) ? '#10b981' : 'rgba(20, 184, 166, 0.3)'}`, padding: '2rem', cursor: completedModules.includes(3) ? 'pointer' : 'not-allowed', opacity: completedModules.includes(3) ? 1 : 0.5, position: 'relative' }}
        >
          <Award size={40} color={completedModules.includes(3) ? "#10b981" : "#5eead4"} style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: completedModules.includes(3) ? '#10b981' : 'white' }}>4. Tu Diploma</h3>
          <p style={{ color: '#94a3b8' }}>Obtén tu certificado oficial de Vigía del Borde Vivo.</p>
        </motion.div>

      </main>

      {/* MODAL OVERLAYS */}
      <AnimatePresence>
        {activeModule !== null && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(2, 44, 34, 0.95)', zIndex: 100, overflowY: 'auto', padding: '2rem', backdropFilter: 'blur(10px)' }}
          >
            <button onClick={() => setActiveModule(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer' }}>
              <X size={24} />
            </button>

            <div style={{ maxWidth: '800px', margin: '40px auto 0 auto' }}>
              
              {/* MODAL 1: VIDEO */}
              {activeModule === 1 && (
                <div style={{ textAlign: 'center' }}>
                  <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem', color: '#5eead4' }}>El Borde Vivo</h2>
                  <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '2rem' }}>La zona de amortiguación es clave para proteger nuestra ciudad.</p>
                  <div style={{ width: '100%', aspectRatio: '16/9', background: '#000', borderRadius: '20px', overflow: 'hidden', border: '2px solid rgba(20, 184, 166, 0.3)' }}>
                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/EoIE7lVYWIw?start=1174" title="YouTube video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                  </div>
                  <button onClick={() => { markModuleCompleted(1); setActiveModule(null); }} style={{ marginTop: '2rem', padding: '15px 40px', background: '#14b8a6', color: 'white', border: 'none', borderRadius: '30px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer' }}>
                    Completar Módulo
                  </button>
                </div>
              )}

              {/* MODAL 2: LEY 21.202 QUIZ */}
              {activeModule === 2 && (
                <div style={{ textAlign: 'center' }}>
                  <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem', color: '#5eead4' }}>Ley de Humedales</h2>
                  {!quizFinished ? (
                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '3rem', borderRadius: '20px', border: '1px solid rgba(20,184,166,0.3)' }}>
                      <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>{quizQuestions[quizIndex].q}</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {quizQuestions[quizIndex].options.map((opt, i) => (
                          <button key={i} onClick={() => {
                            if (i === quizQuestions[quizIndex].ans) setQuizScore(quizScore + 1);
                            if (quizIndex < quizQuestions.length - 1) setQuizIndex(quizIndex + 1);
                            else { setQuizFinished(true); if(quizScore >= 1) markModuleCompleted(2); }
                          }} style={{ padding: '15px', background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.4)', color: 'white', borderRadius: '15px', fontSize: '1.1rem', cursor: 'pointer', transition: '0.2s' }}>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <CheckCircle size={80} color="#10b981" style={{ margin: '0 auto 1rem auto' }} />
                      <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>¡Quiz Completado!</h3>
                      <button onClick={() => setActiveModule(null)} style={{ padding: '15px 40px', background: '#14b8a6', color: 'white', border: 'none', borderRadius: '30px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer' }}>
                        Siguiente Módulo
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* MODAL 3: VIGÍA VECINAL */}
              {activeModule === 3 && (
                <div style={{ textAlign: 'center' }}>
                  <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem', color: '#5eead4' }}>
                    {birdLevel === 1 ? 'Nivel 1: Pilpilén' : birdLevel === 2 ? 'Nivel 2: Zarapito' : 'Nivel 3: Garza Cuca'}
                  </h2>
                  <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
                    {birdLevel === 1 ? 'Busca el ave con pico naranja escondida en la vegetación.' : birdLevel === 2 ? 'Busca el ave de pico curvo en el fango oscuro.' : 'Encuentra a la gran garza entre los juncos.'}
                  </p>
                  
                  {!showBirdCard ? (
                    <div style={{ position: 'relative', width: '100%', height: '400px', background: birdLevel === 1 ? 'linear-gradient(to bottom, #0ea5e9, #10b981)' : birdLevel === 2 ? 'linear-gradient(to bottom, #475569, #78350f)' : 'linear-gradient(to bottom, #0284c7, #064e3b)', borderRadius: '20px', overflow: 'hidden', border: '2px solid rgba(20,184,166,0.5)', cursor: 'crosshair' }}>
                        {/* Fake background elements */}
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '150px', background: birdLevel === 1 ? '#065f46' : birdLevel === 2 ? '#451a03' : '#065f46', clipPath: 'polygon(0 40%, 100% 0, 100% 100%, 0% 100%)' }} />
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '100px', background: birdLevel === 1 ? '#022c22' : birdLevel === 2 ? '#292524' : '#022c22', clipPath: 'polygon(0 0, 100% 30%, 100% 100%, 0% 100%)' }} />
                        
                        {/* Clickable Bird */}
                        <motion.div 
                            onClick={() => setShowBirdCard(true)}
                            whileHover={{ scale: 1.1 }}
                            style={{ position: 'absolute', bottom: birdLevel === 1 ? '80px' : birdLevel === 2 ? '40px' : '150px', right: birdLevel === 1 ? '120px' : birdLevel === 2 ? '250px' : '80px', width: '40px', height: '40px', background: birdLevel === 1 ? '#1e293b' : birdLevel === 2 ? '#78350f' : '#f8fafc', borderRadius: birdLevel === 2 ? '50% 50% 20% 50%' : '50% 50% 50% 10%', cursor: 'pointer' }}
                        >
                            <div style={{ position: 'absolute', top: '10px', right: birdLevel===3? '20px':'-15px', width: '20px', height: birdLevel===3?'40px':'5px', background: birdLevel === 1 ? '#f97316' : birdLevel === 2 ? '#fb923c' : '#fbbf24', borderRadius: '5px', transform: birdLevel === 2 ? 'rotate(30deg)' : 'none' }} /> 
                        </motion.div>
                    </div>
                  ) : (
                    <div style={{ background: 'rgba(0,0,0,0.5)', padding: '2rem', borderRadius: '20px', border: '1px solid #14b8a6' }}>
                      <Bird size={80} color="#10b981" style={{ margin: '0 auto 1rem auto' }} />
                      <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#10b981' }}>¡Ave Identificada!</h3>
                      <p style={{ color: '#e2e8f0', marginBottom: '2rem', fontSize: '1.1rem' }}>
                        {birdLevel === 1 ? 'El Pilpilén anida en la arena. Los perros sin correa destruyen sus huevos.' : 
                         birdLevel === 2 ? 'El Zarapito migra desde el Ártico hasta nuestros humedales. Usa su pico curvo para buscar gusanos.' : 
                         'La Garza Cuca es la garza más grande de Chile. Habita escondida entre la densa vegetación.'}
                      </p>
                      
                      {!birdQuizAnswered ? (
                        <div style={{ marginTop: '2rem' }}>
                          <h4 style={{ color: '#5eead4', marginBottom: '1rem' }}>Pregunta Rápida:</h4>
                          <p style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
                            {birdLevel === 1 ? '¿Cuál es la mayor amenaza para el nido del Pilpilén?' : 
                             birdLevel === 2 ? '¿Desde dónde migra el Zarapito?' : 
                             '¿Dónde suele esconderse la Garza Cuca?'}
                          </p>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', margin: '0 auto' }}>
                            {birdLevel === 1 ? (
                              <>
                                <button onClick={() => setBirdQuizAnswered(true)} style={{ padding: '15px', background: 'rgba(20,184,166,0.2)', border: '1px solid #14b8a6', color: 'white', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>Perros asilvestrados/sueltos</button>
                                <button style={{ padding: '15px', background: 'rgba(255,0,0,0.2)', border: '1px solid red', color: 'white', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>El viento del mar</button>
                              </>
                            ) : birdLevel === 2 ? (
                              <>
                                <button style={{ padding: '15px', background: 'rgba(255,0,0,0.2)', border: '1px solid red', color: 'white', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>Desde la Antártica</button>
                                <button onClick={() => setBirdQuizAnswered(true)} style={{ padding: '15px', background: 'rgba(20,184,166,0.2)', border: '1px solid #14b8a6', color: 'white', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>Desde el Ártico</button>
                              </>
                            ) : (
                              <>
                                <button onClick={() => setBirdQuizAnswered(true)} style={{ padding: '15px', background: 'rgba(20,184,166,0.2)', border: '1px solid #14b8a6', color: 'white', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>Entre los densos juncos</button>
                                <button style={{ padding: '15px', background: 'rgba(255,0,0,0.2)', border: '1px solid red', color: 'white', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>En las copas de los árboles</button>
                              </>
                            )}
                          </div>
                        </div>
                      ) : (
                        <button onClick={() => {
                          if (birdLevel < 3) {
                            setBirdLevel(birdLevel + 1);
                            setShowBirdCard(false);
                            setBirdQuizAnswered(false);
                          } else {
                            markModuleCompleted(3);
                            setActiveModule(null);
                          }
                        }} style={{ padding: '15px 40px', background: '#14b8a6', color: 'white', border: 'none', borderRadius: '30px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '2rem' }}>
                          {birdLevel < 3 ? 'Siguiente Nivel' : 'Completar Entrenamiento'}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* MODAL 4: CERTIFICADO */}
              {activeModule === 4 && (
                <div style={{ textAlign: 'center' }}>
                  <Award size={80} color="#f59e0b" style={{ margin: '0 auto 1rem auto' }} />
                  <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem', color: '#f59e0b' }}>¡Felicidades {username}!</h2>
                  <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '2rem' }}>Has completado la capacitación. Ahora eres un Vigía Oficial del Borde Vivo.</p>
                  
                  <button onClick={generatePDF} style={{ padding: '20px 50px', background: 'linear-gradient(90deg, #f59e0b, #d97706)', color: 'white', border: 'none', borderRadius: '40px', fontSize: '1.5rem', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px', margin: '0 auto', boxShadow: '0 10px 30px rgba(245, 158, 11, 0.4)', transition: '0.3s' }}>
                    <Download size={28} /> DESCARGAR DIPLOMA
                  </button>
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
