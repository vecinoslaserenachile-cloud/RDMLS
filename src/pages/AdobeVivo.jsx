import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Play, Award, ChevronRight, X, User, CheckCircle, Home, Sun, Moon, CloudRain, Wind, AlertTriangle, Download, Hammer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import confetti from 'canvas-confetti';
import { logElearningActivity } from '../utils/elearningLogger';

const MODULES = [
  { id: 'intro', title: 'Módulo 1: Adobe Vivo', icon: Play },
  { id: 'termica', title: 'Módulo 2: Inercia Térmica', icon: Sun },
  { id: 'sismo', title: 'Módulo 3: Refuerzo Sísmico', icon: Hammer },
  { id: 'trivia', title: 'Módulo 4: Trivia del Barro', icon: BookOpen },
  { id: 'diploma', title: 'Certificación Final', icon: Award }
];

export default function AdobeVivo() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [activeModule, setActiveModule] = useState('intro');
  const [progress, setProgress] = useState(0);
  const [completedModules, setCompletedModules] = useState([]);
  
  // Quiz states
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  // Simulator states
  const [timeOfDay, setTimeOfDay] = useState('day');
  const [showIntroAnimation, setShowIntroAnimation] = useState(true);

  // Sismo states
  const [hasMesh, setHasMesh] = useState(false);
  const [isQuake, setIsQuake] = useState(false);
  const [faseConstruccion, setFaseConstruccion] = useState(1);
  const [mezclaState, setMezclaState] = useState({ tierra: 0, paja: 0, agua: 0 });
  const [quakeMagnitude, setQuakeMagnitude] = useState(6);
  const [houseStatus, setHouseStatus] = useState('intact');

  useEffect(() => {
    document.title = "Adobe Vivo | Entrevecinas.cl";
    const timer = setTimeout(() => setShowIntroAnimation(false), 4500);
    
    const savedUser = localStorage.getItem('adobe_vivo_user');
    const savedEmail = localStorage.getItem('adobe_vivo_email');
    const savedProgress = localStorage.getItem('adobe_vivo_progress');
    const savedModules = localStorage.getItem('adobe_vivo_completed');
    
    if (savedUser && savedEmail) {
      setUserName(savedUser);
      setUserEmail(savedEmail);
      setIsLogged(true);
      if (savedProgress) setProgress(parseInt(savedProgress));
      if (savedModules) setCompletedModules(JSON.parse(savedModules));
    }
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (userName.trim() && userEmail.trim()) {
      setIsLogged(true);
      localStorage.setItem('adobe_vivo_user', userName);
      localStorage.setItem('adobe_vivo_email', userEmail);
      logElearningActivity('Adobe Vivo', userName, userEmail, 'login');
    }
  };

  const markModuleComplete = (moduleId) => {
    if (!completedModules.includes(moduleId)) {
      const newModules = [...completedModules, moduleId];
      setCompletedModules(newModules);
      const newProgress = Math.round((newModules.length / MODULES.length) * 100);
      setProgress(newProgress);
      localStorage.setItem('adobe_vivo_completed', JSON.stringify(newModules));
      localStorage.setItem('adobe_vivo_progress', newProgress.toString());
      
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 }, colors: ['#d97706', '#b45309', '#fcd34d'] });
    }
  };

  const generateDiploma = async () => {
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([800, 600]);
      
      page.drawRectangle({ x: 0, y: 0, width: 800, height: 600, color: rgb(0.98, 0.92, 0.84) }); // Crema
      page.drawRectangle({ x: 20, y: 20, width: 760, height: 560, borderColor: rgb(0.7, 0.33, 0.03), borderWidth: 4 });
      
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const normalFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

      page.drawText('ACADEMIA ENTREVECINAS', { x: 250, y: 520, size: 24, font, color: rgb(0.7, 0.33, 0.03) });
      page.drawText('CERTIFICADO OFICIAL', { x: 260, y: 450, size: 28, font, color: rgb(0.2, 0.1, 0) });
      
      page.drawText('Se otorga el título de', { x: 330, y: 390, size: 16, font: normalFont, color: rgb(0.4, 0.2, 0) });
      page.drawText('ARQUITECTA DE TIERRA VIVA', { x: 190, y: 340, size: 26, font, color: rgb(0.85, 0.46, 0.04) });
      
      page.drawText('A:', { x: 390, y: 280, size: 16, font: normalFont, color: rgb(0.4, 0.2, 0) });
      
      const nameWidth = font.widthOfTextAtSize(userName.toUpperCase(), 32);
      page.drawText(userName.toUpperCase(), { x: 400 - (nameWidth/2), y: 230, size: 32, font, color: rgb(0.2, 0.1, 0) });

      page.drawText('Por completar la capacitación en arquitectura sustentable y Adobe Vivo.', { x: 180, y: 170, size: 14, font: normalFont, color: rgb(0.3, 0.3, 0.3) });

      const dateStr = new Date().toLocaleDateString('es-CL');
      page.drawText(`Fecha: ${dateStr}`, { x: 100, y: 80, size: 12, font, color: rgb(0.5, 0.5, 0.5) });
      page.drawText('Firma: Entrevecinas', { x: 500, y: 80, size: 12, font, color: rgb(0.5, 0.5, 0.5) });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Diploma_Adobe_Vivo_${userName.replace(' ', '_')}.pdf`;
      link.click();
      logElearningActivity('Adobe Vivo', userName, userEmail, 'diploma_downloaded');
    } catch (e) {
      console.error(e);
      alert('Error generando diploma.');
    }
  };

  if (showIntroAnimation) {
    return (
      <div style={{ position: 'fixed', inset: 0, background: '#451a03', zIndex: 99999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', overflow: 'hidden' }}>
        <motion.div initial={{ y: '100%' }} animate={{ y: '0%' }} transition={{ duration: 4, ease: "easeOut" }} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to top, #78350f, transparent)', opacity: 0.8, zIndex: 1 }} />
        <motion.div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 2, delay: 0.5 }}>
                <Home size={100} color="#fcd34d" strokeWidth={1.5} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 3, delay: 0.5 }} style={{ marginTop: '2rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1rem', letterSpacing: '4px', color: '#fcd34d' }}>ENTREVECINAS.CL</div>
                <div style={{ fontSize: '2rem', fontWeight: '900', color: 'white' }}>FABRICANDO ADOBE...</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 3.5 }} style={{ position: 'absolute', bottom: '-80px', textAlign: 'center', width: '300px' }}>
                <div style={{ fontSize: '1rem', letterSpacing: '4px', color: '#fcd34d' }}>ARQUITECTURA DE TIERRA</div>
                <div style={{ fontSize: '2.5rem', fontWeight: '900', color: 'white', textShadow: '0 0 20px rgba(252,211,77,0.5)' }}>ADOBE VIVO</div>
            </motion.div>
        </motion.div>
      </div>
    );
  }

  if (!isLogged) {
    return (
      <div style={{ minHeight: '100vh', background: '#451a03', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'Outfit', sans-serif" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'rgba(120, 53, 15, 0.6)', padding: '3rem', borderRadius: '30px', border: '1px solid rgba(217, 119, 6, 0.3)', backdropFilter: 'blur(20px)', maxWidth: '400px', width: '90%', textAlign: 'center' }}>
          <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #d97706, #78350f)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
            <Home size={40} color="white" />
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '1rem' }}>Adobe Vivo</h1>
          <p style={{ color: '#fdba74', marginBottom: '2rem' }}>Ingresa tu nombre para aprender sobre la construcción sostenible con Solange Miranda.</p>
          <form onSubmit={handleLogin}>
            <input type="text" placeholder="Tu nombre..." value={userName} onChange={e => setUserName(e.target.value)} style={{ width: '100%', padding: '1rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.3)', color: 'white', marginBottom: '1rem', boxSizing: 'border-box' }} required />
            <input type="email" placeholder="Tu correo electrónico..." value={userEmail} onChange={e => setUserEmail(e.target.value)} style={{ width: '100%', padding: '1rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.3)', color: 'white', marginBottom: '1.5rem', boxSizing: 'border-box' }} required />
            <button type="submit" style={{ width: '100%', padding: '1rem', background: '#d97706', color: 'white', border: 'none', borderRadius: '15px', fontWeight: '900', fontSize: '1.1rem', cursor: 'pointer' }}>INICIAR APRENDIZAJE</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#291002', color: 'white', fontFamily: "'Outfit', sans-serif" }}>
      <header style={{ padding: '1.5rem 2rem', background: 'rgba(0,0,0,0.6)', borderBottom: '1px solid rgba(217, 119, 6, 0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <div style={{ background: '#d97706', padding: '10px', borderRadius: '12px' }}><Home size={24} color="white" /></div>
          <div><div style={{ fontSize: '1.2rem', fontWeight: '900' }}>ADOBE VIVO</div><div style={{ fontSize: '0.7rem', color: '#fdba74' }}>Solange Miranda</div></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ fontWeight: 'bold' }}>{userName}</div>
          <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={24} /></button>
        </div>
      </header>

      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem', display: 'grid', gridTemplateColumns: '300px 1fr', gap: '3rem' }}>
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ background: 'rgba(0,0,0,0.4)', padding: '2rem', borderRadius: '25px', border: '1px solid rgba(217, 119, 6, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontWeight: '900', color: '#94a3b8' }}>TU PROGRESO</span>
              <span style={{ fontSize: '1.2rem', fontWeight: '900', color: '#fcd34d' }}>{progress}%</span>
            </div>
            <div style={{ width: '100%', height: '10px', background: 'rgba(0,0,0,0.5)', borderRadius: '5px', overflow: 'hidden', marginBottom: '1rem' }}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} style={{ height: '100%', background: '#d97706' }} />
            </div>
            <div style={{ fontSize: '0.8rem', color: '#fdba74' }}>
              {progress === 100 ? "¡Academia completada!" : `Falta completar: ${MODULES.find(m => !completedModules.includes(m.id))?.title}`}
            </div>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {MODULES.map((mod, index) => {
              const isActive = activeModule === mod.id;
              const isCompleted = completedModules.includes(mod.id);
              const isUnlocked = index === 0 || completedModules.includes(MODULES[index - 1].id);
              
              return (
                <button 
                  key={mod.id} 
                  onClick={() => isUnlocked && setActiveModule(mod.id)} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '15px', 
                    padding: '1.2rem', 
                    borderRadius: '20px', 
                    cursor: isUnlocked ? 'pointer' : 'not-allowed', 
                    background: isActive ? 'rgba(217, 119, 6, 0.2)' : 'rgba(0,0,0,0.3)', 
                    border: `1px solid ${isActive ? '#d97706' : 'transparent'}`, 
                    color: isActive ? 'white' : (isUnlocked ? '#94a3b8' : '#475569'), 
                    textAlign: 'left',
                    opacity: isUnlocked ? 1 : 0.5
                  }}
                >
                  <div style={{ background: isCompleted ? '#10b981' : (isActive ? '#d97706' : 'rgba(0,0,0,0.5)'), padding: '10px', borderRadius: '12px' }}>
                    {isCompleted ? <CheckCircle size={20} color="white" /> : <mod.icon size={20} color={isActive ? "white" : (isUnlocked ? "#64748b" : "#334155")} />}
                  </div>
                  <div style={{ flex: 1, fontWeight: 'bold', fontSize: '0.95rem' }}>{mod.title}</div>
                </button>
              );
            })}
          </nav>
        </aside>

        <section style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '35px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          
          {activeModule === 'intro' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '3rem' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#fcd34d', marginBottom: '1rem' }}>El Adobe en la Frontera</h2>
              <p style={{ fontSize: '1.2rem', color: '#cbd5e1', marginBottom: '2rem' }}>Solange Miranda propone el adobe como una tecnología de vanguardia para enfrentar la crisis climática.</p>
              <div style={{ borderRadius: '25px', overflow: 'hidden', background: '#000', aspectRatio: '16/9', border: '2px solid rgba(217, 119, 6, 0.5)', marginBottom: '2rem' }}>
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/EoIE7lVYWIw?start=1977" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
              </div>
              <button onClick={() => { markModuleComplete('intro'); setActiveModule('termica'); }} style={{ background: '#d97706', color: 'white', border: 'none', padding: '1rem 2rem', borderRadius: '15px', fontWeight: '900', cursor: 'pointer', float: 'right' }}>AVANZAR AL SIMULADOR</button>
            </motion.div>
          )}

          {activeModule === 'termica' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '3rem' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#fcd34d', marginBottom: '1rem' }}>Inercia Térmica</h2>
              <p style={{ color: '#cbd5e1', marginBottom: '2rem' }}>Experimenta cómo un muro de adobe aísla el interior, manteniendo el calor del día para liberarlo en la fría noche.</p>
              
              <div style={{ height: '350px', background: timeOfDay === 'day' ? 'linear-gradient(to bottom, #38bdf8, #fcd34d)' : 'linear-gradient(to bottom, #1e1b4b, #312e81)', borderRadius: '20px', position: 'relative', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.2)', transition: 'background 1s' }}>
                <div style={{ position: 'absolute', top: '10%', left: timeOfDay === 'day' ? '10%' : '80%', transition: 'all 1s' }}>
                  {timeOfDay === 'day' ? <Sun size={80} color="#fef08a" /> : <Moon size={60} color="#e2e8f0" />}
                </div>
                
                {/* Casa de Adobe */}
                <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '250px', height: '180px', background: '#92400e', borderRadius: '10px 10px 0 0', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <div style={{ width: '100%', height: '100%', position: 'absolute', background: 'url("https://www.transparenttextures.com/patterns/brick-wall-dark.png")' }} />
                  <div style={{ position: 'absolute', top: '20%', left: '20%', width: '60px', height: '50px', background: timeOfDay === 'day' ? '#1e293b' : '#fef08a', border: '3px solid #78350f', transition: 'background 1s' }} />
                  {/* Visualización del calor irradiando en la noche */}
                  {timeOfDay === 'night' && <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(ellipse, rgba(239,68,68,0.4), transparent)', filter: 'blur(20px)', zIndex: 10 }} />}
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '2rem' }}>
                <button onClick={() => setTimeOfDay('day')} style={{ padding: '1rem 2rem', background: '#38bdf8', border: 'none', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer' }}>🌞 Simular Día (Absorber Calor)</button>
                <button onClick={() => setTimeOfDay('night')} style={{ padding: '1rem 2rem', background: '#1e1b4b', color: 'white', border: 'none', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer' }}>🌙 Simular Noche (Liberar Calor)</button>
              </div>

              <div style={{ marginTop: '2rem', textAlign: 'right' }}>
                <button disabled={timeOfDay === 'day'} onClick={() => { markModuleComplete('termica'); setActiveModule('sismo'); }} style={{ background: timeOfDay === 'night' ? '#d97706' : '#52525b', color: 'white', border: 'none', padding: '1rem 2rem', borderRadius: '15px', fontWeight: '900', cursor: timeOfDay === 'night' ? 'pointer' : 'not-allowed' }}>{timeOfDay === 'night' ? 'AVANZAR' : 'SIMULA LA NOCHE PRIMERO'}</button>
              </div>
            </motion.div>
          )}

          {activeModule === 'sismo' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '3rem' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#fcd34d', marginBottom: '1rem' }}>Constructor Antisísmico</h2>
              <p style={{ color: '#cbd5e1', marginBottom: '2rem' }}>
                {faseConstruccion === 1 ? 'Fase 1: Prepara la mezcla perfecta. El adobe necesita 3 partes de tierra, 1 de paja y 1 de agua.' :
                 faseConstruccion === 2 ? 'Fase 2: Construcción y Refuerzo. Aplica la geomalla a tu muro de adobe.' :
                 'Fase 3: Prueba Sísmica. Selecciona la magnitud y simula el terremoto.'}
              </p>

              {faseConstruccion === 1 && (
                <div style={{ background: 'rgba(0,0,0,0.5)', padding: '2rem', borderRadius: '20px', border: '1px solid #d97706' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '2rem' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '3rem' }}>🪨</div>
                      <h4 style={{ color: '#fcd34d' }}>Tierra ({mezclaState.tierra})</h4>
                      <button onClick={() => setMezclaState({...mezclaState, tierra: mezclaState.tierra + 1})} style={{ background: '#78350f', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}>+ Agregar</button>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '3rem' }}>🌾</div>
                      <h4 style={{ color: '#fcd34d' }}>Paja ({mezclaState.paja})</h4>
                      <button onClick={() => setMezclaState({...mezclaState, paja: mezclaState.paja + 1})} style={{ background: '#a16207', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}>+ Agregar</button>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '3rem' }}>💧</div>
                      <h4 style={{ color: '#fcd34d' }}>Agua ({mezclaState.agua})</h4>
                      <button onClick={() => setMezclaState({...mezclaState, agua: mezclaState.agua + 1})} style={{ background: '#0284c7', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}>+ Agregar</button>
                    </div>
                  </div>
                  <button onClick={() => {
                    if (mezclaState.tierra === 3 && mezclaState.paja === 1 && mezclaState.agua === 1) {
                      setFaseConstruccion(2);
                    } else {
                      alert('Mezcla incorrecta. Recuerda: 3 de tierra, 1 de paja, 1 de agua.');
                      setMezclaState({ tierra: 0, paja: 0, agua: 0 });
                    }
                  }} style={{ width: '100%', padding: '1rem', background: '#d97706', color: 'white', border: 'none', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.2rem' }}>MEZCLAR Y CONSTRUIR</button>
                </div>
              )}

              {faseConstruccion >= 2 && (
                <>
                  <div style={{ height: '350px', background: '#0f172a', borderRadius: '20px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    <motion.div animate={{ x: isQuake ? [0, -quakeMagnitude*2, quakeMagnitude*2, -quakeMagnitude*2, quakeMagnitude*2, 0] : 0 }} transition={{ duration: 0.1, repeat: isQuake ? 30 : 0 }} style={{ width: '200px', height: '250px', background: '#78350f', position: 'relative', transformOrigin: 'bottom center' }}>
                      {/* Ladrillos Texture */}
                      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 20px', opacity: 0.3 }} />
                      
                      {hasMesh && (
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)', backgroundSize: '10px 10px', backgroundPosition: '0 0, 5px 5px', opacity: 0.5 }} />
                      )}
                      {houseStatus === 'cracked' && (
                        <div style={{ position: 'absolute', top: '10%', left: '40%', width: '3px', height: '80%', background: 'black', transform: 'rotate(15deg)' }} /> // Grieta
                      )}
                      {houseStatus === 'destroyed' && (
                        <div style={{ position: 'absolute', inset: 0, background: '#0f172a', display: 'flex', alignItems: 'flex-end' }}>
                          <div style={{ width: '100%', height: '50px', background: '#451a03', borderRadius: '20px 20px 0 0', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>ESCOMBROS</div>
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {faseConstruccion === 2 && (
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '2rem' }}>
                      <button onClick={() => { setHasMesh(true); setFaseConstruccion(3); }} style={{ padding: '1rem 2rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer' }}>🔧 Aplicar Geomalla</button>
                      <button onClick={() => setFaseConstruccion(3)} style={{ padding: '1rem 2rem', background: '#52525b', color: 'white', border: 'none', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer' }}>⏭️ Continuar sin Malla</button>
                    </div>
                  )}

                  {faseConstruccion === 3 && (
                    <div style={{ background: 'rgba(0,0,0,0.5)', padding: '2rem', borderRadius: '20px', marginTop: '2rem', textAlign: 'center' }}>
                      <h3 style={{ color: '#fcd34d', marginBottom: '1rem' }}>Magnitud del Sismo</h3>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '2rem', flexWrap: 'wrap' }}>
                        <button onClick={() => setQuakeMagnitude(6)} style={{ padding: '10px 20px', background: quakeMagnitude === 6 ? '#ea580c' : '#334155', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>Grado 6</button>
                        <button onClick={() => setQuakeMagnitude(7)} style={{ padding: '10px 20px', background: quakeMagnitude === 7 ? '#ef4444' : '#334155', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>Grado 7</button>
                        <button onClick={() => setQuakeMagnitude(8)} style={{ padding: '10px 20px', background: quakeMagnitude === 8 ? '#b91c1c' : '#334155', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>Grado 8 (Terremoto)</button>
                      </div>
                      
                      <button onClick={() => {
                        setIsQuake(true);
                        setTimeout(() => {
                          setIsQuake(false);
                          if (quakeMagnitude >= 7 && !hasMesh) {
                            setHouseStatus('destroyed');
                            alert('¡El muro colapsó completamente! La geomalla es vital para sismos sobre grado 6.');
                          } else if (quakeMagnitude === 6 && !hasMesh) {
                            setHouseStatus('cracked');
                            alert('El muro se agrietó. Aguantó el sismo grado 6, pero quedó dañado.');
                          } else {
                            alert('¡Excelente! Gracias a la geomalla, el muro de adobe resistió el sismo sin daños estructurales graves.');
                            markModuleComplete('sismo');
                          }
                        }, 3000);
                      }} style={{ padding: '1rem 3rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.2rem' }}>🌋 SIMULAR SISMO</button>
                    </div>
                  )}
                </>
              )}

              <div style={{ marginTop: '2rem', textAlign: 'right' }}>
                <button disabled={!completedModules.includes('sismo')} onClick={() => setActiveModule('trivia')} style={{ background: completedModules.includes('sismo') ? '#d97706' : '#52525b', color: 'white', border: 'none', padding: '1rem 2rem', borderRadius: '15px', fontWeight: '900', cursor: completedModules.includes('sismo') ? 'pointer' : 'not-allowed' }}>SIGUIENTE MÓDULO</button>
              </div>
            </motion.div>
          )}

          {activeModule === 'trivia' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '3rem' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#fcd34d', marginBottom: '1rem' }}>Trivia del Barro</h2>
              {!quizCompleted ? (
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: '20px' }}>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>¿Por qué el adobe es excelente para el Valle de Elqui?</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button onClick={() => alert('Falso.')} style={{ padding: '1rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid gray', borderRadius: '10px', textAlign: 'left', cursor: 'pointer' }}>A) Porque es el material más barato y fácil de romper.</button>
                    <button onClick={() => { setQuizCompleted(true); markModuleComplete('trivia'); }} style={{ padding: '1rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid gray', borderRadius: '10px', textAlign: 'left', cursor: 'pointer' }}>B) Porque regula pasivamente la temperatura (Inercia Térmica).</button>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <CheckCircle size={80} color="#10b981" />
                  <h3>¡Correcto!</h3>
                  <button onClick={() => setActiveModule('diploma')} style={{ background: '#d97706', padding: '1rem', color: 'white', borderRadius: '15px', border: 'none', marginTop: '1rem', cursor: 'pointer' }}>VER CERTIFICADO</button>
                </div>
              )}
            </motion.div>
          )}

          {activeModule === 'diploma' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '4rem', textAlign: 'center' }}>
              <Award size={80} color="#d97706" style={{ margin: '0 auto 1rem' }} />
              <h2 style={{ fontSize: '3rem', fontWeight: '900', color: '#fcd34d' }}>¡Felicidades!</h2>
              <button onClick={() => { markModuleComplete('diploma'); generateDiploma(); }} style={{ background: '#d97706', color: 'white', border: 'none', padding: '1.5rem 3rem', borderRadius: '20px', fontSize: '1.2rem', fontWeight: '900', cursor: 'pointer', marginTop: '2rem' }}><Download size={24} style={{ marginRight: '10px' }} /> DESCARGAR DIPLOMA</button>
            </motion.div>
          )}
        </section>
      </main>
    </div>
  );
}
