import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Play, Award, ChevronRight, X, User, CheckCircle, Search, Flame, Map, AlertTriangle, Download, Info, Archive } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import confetti from 'canvas-confetti';
import { logElearningActivity } from '../utils/elearningLogger';

const MODULES = [
  { id: 'intro', title: 'Módulo 1: Legado Lambert', icon: Play },
  { id: 'horno', title: 'Módulo 2: Hornos de Reverbero', icon: Flame },
  { id: 'excavacion', title: 'Módulo 3: Arqueología', icon: Search },
  { id: 'trivia', title: 'Módulo 4: Trivia Minera', icon: BookOpen },
  { id: 'diploma', title: 'Certificación Final', icon: Award }
];

export default function RuinasLambert() {
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
  
  // Excavacion states
  const [excavationPhase, setExcavationPhase] = useState(0);
  const [dirtOpacity, setDirtOpacity] = useState(1);
  const [museumItems, setMuseumItems] = useState([]);

  // Horno states
  const [hornoTemp, setHornoTemp] = useState(0);

  const [showIntroAnimation, setShowIntroAnimation] = useState(true);

  useEffect(() => {
    document.title = "Ruinas Lambert | Entrevecinas.cl";
    const timer = setTimeout(() => setShowIntroAnimation(false), 4500);
    
    const savedUser = localStorage.getItem('ruinas_lambert_user');
    const savedEmail = localStorage.getItem('ruinas_lambert_email');
    const savedProgress = localStorage.getItem('ruinas_lambert_progress');
    const savedModules = localStorage.getItem('ruinas_lambert_completed');
    
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
      localStorage.setItem('ruinas_lambert_user', userName);
      localStorage.setItem('ruinas_lambert_email', userEmail);
      logElearningActivity('Ruinas Lambert', userName, userEmail, 'login');
    }
  };

  const markModuleComplete = (moduleId) => {
    if (!completedModules.includes(moduleId)) {
      const newModules = [...completedModules, moduleId];
      setCompletedModules(newModules);
      const newProgress = Math.round((newModules.length / MODULES.length) * 100);
      setProgress(newProgress);
      localStorage.setItem('ruinas_lambert_completed', JSON.stringify(newModules));
      localStorage.setItem('ruinas_lambert_progress', newProgress.toString());
      
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 }, colors: ['#b45309', '#f59e0b', '#78350f'] });
    }
  };

  const generateDiploma = async () => {
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([800, 600]);
      
      page.drawRectangle({ x: 0, y: 0, width: 800, height: 600, color: rgb(0.1, 0.05, 0.02) }); // Dark copper
      page.drawRectangle({ x: 20, y: 20, width: 760, height: 560, borderColor: rgb(0.7, 0.4, 0.1), borderWidth: 4 });
      
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const normalFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

      page.drawText('ACADEMIA ENTREVECINAS', { x: 250, y: 520, size: 24, font, color: rgb(0.8, 0.5, 0.2) });
      page.drawText('CERTIFICADO OFICIAL', { x: 260, y: 450, size: 28, font, color: rgb(1, 1, 1) });
      
      page.drawText('Se otorga el título de', { x: 330, y: 390, size: 16, font: normalFont, color: rgb(0.7, 0.7, 0.7) });
      page.drawText('CUSTODIO DEL PATRIMONIO INDUSTRIAL', { x: 130, y: 340, size: 26, font, color: rgb(0.9, 0.6, 0.2) });
      
      page.drawText('A:', { x: 390, y: 280, size: 16, font: normalFont, color: rgb(0.7, 0.7, 0.7) });
      
      const nameWidth = font.widthOfTextAtSize(userName.toUpperCase(), 32);
      page.drawText(userName.toUpperCase(), { x: 400 - (nameWidth/2), y: 230, size: 32, font, color: rgb(1, 1, 1) });

      page.drawText('Por su compromiso con la historia metalúrgica de Las Compañías.', { x: 190, y: 170, size: 14, font: normalFont, color: rgb(0.7, 0.7, 0.7) });

      const dateStr = new Date().toLocaleDateString('es-CL');
      page.drawText(`Fecha: ${dateStr}`, { x: 100, y: 80, size: 12, font, color: rgb(0.5, 0.5, 0.5) });
      page.drawText('Firmado: Margarita Ángel', { x: 500, y: 80, size: 12, font, color: rgb(0.5, 0.5, 0.5) });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Diploma_Patrimonio_Lambert_${userName.replace(' ', '_')}.pdf`;
      link.click();
      logElearningActivity('Ruinas Lambert', userName, userEmail, 'diploma_downloaded');
    } catch (e) {
      console.error(e);
      alert('Error generando diploma.');
    }
  };

  if (showIntroAnimation) {
    return (
      <div style={{ position: 'fixed', inset: 0, background: '#1c0f04', zIndex: 99999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', overflow: 'hidden' }}>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 2 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Flame size={100} color="#f97316" strokeWidth={1.5} />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 3, delay: 0.5 }} style={{ marginTop: '2rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1rem', letterSpacing: '4px', color: '#fdba74' }}>ENTREVECINAS.CL</div>
                <div style={{ fontSize: '2rem', fontWeight: '900', color: 'white' }}>ENCENDIENDO HORNOS...</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 3.5 }} style={{ position: 'absolute', bottom: '-80px', textAlign: 'center', width: '300px' }}>
                <div style={{ fontSize: '1rem', letterSpacing: '4px', color: '#f97316' }}>PATRIMONIO INDUSTRIAL</div>
                <div style={{ fontSize: '2.5rem', fontWeight: '900', color: 'white', textShadow: '0 0 20px rgba(249,115,22,0.5)' }}>RUINAS LAMBERT</div>
            </motion.div>
        </motion.div>
      </div>
    );
  }

  if (!isLogged) {
    return (
      <div style={{ minHeight: '100vh', background: '#1c0f04', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'Outfit', sans-serif" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'rgba(67, 20, 7, 0.6)', padding: '3rem', borderRadius: '30px', border: '1px solid rgba(194, 65, 12, 0.3)', backdropFilter: 'blur(20px)', maxWidth: '400px', width: '90%', textAlign: 'center' }}>
          <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #ea580c, #7c2d12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
            <Flame size={40} color="white" />
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '1rem' }}>Ruinas de Lambert</h1>
          <p style={{ color: '#fdba74', marginBottom: '2rem' }}>Ingresa tu nombre para explorar el patrimonio de Las Compañías con Margarita Ángel.</p>
          <form onSubmit={handleLogin}>
            <input type="text" placeholder="Tu nombre..." value={userName} onChange={e => setUserName(e.target.value)} style={{ width: '100%', padding: '1rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.3)', color: 'white', marginBottom: '1rem', boxSizing: 'border-box' }} required />
            <input type="email" placeholder="Tu correo electrónico..." value={userEmail} onChange={e => setUserEmail(e.target.value)} style={{ width: '100%', padding: '1rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.3)', color: 'white', marginBottom: '1.5rem', boxSizing: 'border-box' }} required />
            <button type="submit" style={{ width: '100%', padding: '1rem', background: '#ea580c', color: 'white', border: 'none', borderRadius: '15px', fontWeight: '900', cursor: 'pointer' }}>INICIAR EXPLORACIÓN</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0f0500', color: 'white', fontFamily: "'Outfit', sans-serif" }}>
      <header style={{ padding: '1.5rem 2rem', background: 'rgba(0,0,0,0.8)', borderBottom: '1px solid rgba(234, 88, 12, 0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <div style={{ background: '#ea580c', padding: '10px', borderRadius: '12px' }}><Flame size={24} color="white" /></div>
          <div><div style={{ fontSize: '1.2rem', fontWeight: '900' }}>RUINAS LAMBERT</div><div style={{ fontSize: '0.7rem', color: '#fdba74' }}>Margarita Ángel</div></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ fontWeight: 'bold' }}>{userName}</div>
          <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={24} /></button>
        </div>
      </header>

      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem', display: 'grid', gridTemplateColumns: '300px 1fr', gap: '3rem' }}>
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ background: 'rgba(0,0,0,0.4)', padding: '2rem', borderRadius: '25px', border: '1px solid rgba(234, 88, 12, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontWeight: '900', color: '#94a3b8' }}>TU PROGRESO</span>
              <span style={{ fontSize: '1.2rem', fontWeight: '900', color: '#fb923c' }}>{progress}%</span>
            </div>
            <div style={{ width: '100%', height: '10px', background: 'rgba(0,0,0,0.5)', borderRadius: '5px', overflow: 'hidden', marginBottom: '1rem' }}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} style={{ height: '100%', background: '#ea580c' }} />
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
                    background: isActive ? 'rgba(234, 88, 12, 0.2)' : 'rgba(0,0,0,0.3)', 
                    border: `1px solid ${isActive ? '#ea580c' : 'transparent'}`, 
                    color: isActive ? 'white' : (isUnlocked ? '#94a3b8' : '#475569'), 
                    textAlign: 'left',
                    opacity: isUnlocked ? 1 : 0.5
                  }}
                >
                  <div style={{ background: isCompleted ? '#10b981' : (isActive ? '#ea580c' : 'rgba(0,0,0,0.5)'), padding: '10px', borderRadius: '12px' }}>
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
              <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#fb923c', marginBottom: '1rem' }}>El Legado Lambert</h2>
              <p style={{ fontSize: '1.2rem', color: '#cbd5e1', marginBottom: '2rem' }}>Conoce la historia del galés Carlos Lambert, quien introdujo los hornos de reverbero en 1840 en Las Compañías.</p>
              <div style={{ borderRadius: '25px', overflow: 'hidden', background: '#000', aspectRatio: '16/9', border: '2px solid rgba(234, 88, 12, 0.5)', marginBottom: '2rem' }}>
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/EoIE7lVYWIw" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
              </div>
              <button onClick={() => { markModuleComplete('intro'); setActiveModule('horno'); }} style={{ background: '#ea580c', color: 'white', border: 'none', padding: '1rem 2rem', borderRadius: '15px', fontWeight: '900', cursor: 'pointer', float: 'right' }}>AVANZAR AL HORNO</button>
            </motion.div>
          )}

          {activeModule === 'horno' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '3rem' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#fb923c', marginBottom: '1rem' }}>Horno de Reverbero</h2>
              <p style={{ color: '#cbd5e1', marginBottom: '2rem' }}>Enciende el horno presionando el botón. Debes alcanzar alta temperatura para fundir los minerales de cobre.</p>
              
              <div style={{ height: '350px', background: '#1c1917', borderRadius: '20px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {/* Ladrillos del horno */}
                <div style={{ position: 'absolute', bottom: 0, width: '200px', height: '150px', background: '#78350f', border: '2px solid #431407', borderRadius: '50px 50px 0 0', display: 'flex', justifyContent: 'center' }}>
                  <div style={{ position: 'absolute', bottom: '10px', width: '100px', height: '60px', background: '#000', borderRadius: '50px 50px 0 0', overflow: 'hidden' }}>
                    {hornoTemp > 0 && <motion.div animate={{ height: [`${hornoTemp}%`, `${hornoTemp-10}%`] }} transition={{ yoyo: Infinity, duration: 0.1 }} style={{ position: 'absolute', bottom: 0, width: '100%', background: 'linear-gradient(to top, #fbbf24, #ef4444)' }} />}
                  </div>
                </div>
              </div>
              
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: hornoTemp > 80 ? '#fbbf24' : 'white', marginBottom: '1rem' }}>Temperatura: {hornoTemp * 10}°C</div>
                <button onMouseDown={() => setHornoTemp(prev => Math.min(prev + 10, 100))} style={{ padding: '1rem 3rem', background: '#ea580c', color: 'white', border: 'none', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.2rem' }}>🔥 AVIVAR FUEGO</button>
              </div>

              <div style={{ marginTop: '2rem', textAlign: 'right' }}>
                <button disabled={hornoTemp < 100} onClick={() => { markModuleComplete('horno'); setActiveModule('excavacion'); }} style={{ background: hornoTemp >= 100 ? '#ea580c' : '#52525b', color: 'white', border: 'none', padding: '1rem 2rem', borderRadius: '15px', fontWeight: '900', cursor: hornoTemp >= 100 ? 'pointer' : 'not-allowed' }}>{hornoTemp >= 100 ? 'FUNDICIÓN EXITOSA - AVANZAR' : 'ALCANZA 1000°C'}</button>
              </div>
            </motion.div>
          )}

          {activeModule === 'excavacion' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '3rem' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#fb923c', marginBottom: '1rem' }}>Excavación Arqueológica</h2>
              <p style={{ color: '#cbd5e1', marginBottom: '2rem' }}>Limpia la tierra para descubrir los vestigios industriales. Debes encontrar 3 artefactos históricos para tu museo.</p>
              
              <div style={{ display: 'flex', gap: '2rem', flexDirection: 'column' }}>
                <div style={{ height: '250px', background: '#292524', borderRadius: '20px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  {/* Reliquia escondida dinámica */}
                  {excavationPhase < 3 && (
                    <div style={{ 
                      width: '80px', height: '80px', 
                      background: excavationPhase === 0 ? '#1c1917' : excavationPhase === 1 ? '#b91c1c' : '#9ca3af', 
                      borderRadius: excavationPhase === 0 ? '50%' : '10px', 
                      boxShadow: 'inset -5px -5px 15px rgba(0,0,0,0.8)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2rem'
                    }}>
                      {excavationPhase === 0 ? '🌑' : excavationPhase === 1 ? '🧱' : '⛏️'}
                    </div>
                  )}
                  
                  {/* Capa de tierra */}
                  {excavationPhase < 3 && (
                    <div 
                      onClick={() => {
                        setDirtOpacity(prev => prev - 0.2);
                        if (dirtOpacity <= 0.3) {
                          const item = excavationPhase === 0 ? 'Escoria de Cobre (1840)' : excavationPhase === 1 ? 'Ladrillo Refractario Inglés' : 'Herramienta Galesa';
                          setMuseumItems([...museumItems, item]);
                          setDirtOpacity(1);
                          setExcavationPhase(prev => prev + 1);
                        }
                      }}
                      style={{ position: 'absolute', inset: 0, background: '#451a03', opacity: dirtOpacity, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                       {dirtOpacity > 0 && <span style={{ color: '#fca5a5', fontWeight: 'bold', fontSize: '1.2rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>CLICK PARA EXCAVAR</span>}
                    </div>
                  )}

                  {excavationPhase === 3 && (
                     <div style={{ color: '#10b981', fontSize: '2rem', fontWeight: 'bold' }}>¡Zona excavada al 100%!</div>
                  )}
                </div>

                <div style={{ background: 'rgba(0,0,0,0.5)', padding: '2rem', borderRadius: '20px', border: '1px solid #ea580c' }}>
                  <h3 style={{ color: '#fbbf24', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}><Archive size={24} /> Museo Lambert (Hallazgos)</h3>
                  {museumItems.length === 0 && <p style={{ color: '#9ca3af' }}>No hay artefactos descubiertos aún. Sigue excavando.</p>}
                  <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {museumItems.map((item, i) => (
                      <li key={i} style={{ padding: '15px', background: 'rgba(255,255,255,0.1)', margin: '5px 0', borderRadius: '10px', color: 'white', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' }}>
                        <CheckCircle size={20} color="#10b981" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div style={{ marginTop: '2rem', textAlign: 'right' }}>
                <button disabled={excavationPhase < 3} onClick={() => { markModuleComplete('excavacion'); setActiveModule('trivia'); }} style={{ background: excavationPhase === 3 ? '#ea580c' : '#52525b', color: 'white', border: 'none', padding: '1rem 2rem', borderRadius: '15px', fontWeight: '900', cursor: excavationPhase === 3 ? 'pointer' : 'not-allowed' }}>{excavationPhase === 3 ? 'Siguiente Módulo' : 'ENCUENTRA 3 ARTEFACTOS'}</button>
              </div>
            </motion.div>
          )}

          {activeModule === 'trivia' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '3rem' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#fb923c', marginBottom: '1rem' }}>Trivia Minera</h2>
              {!quizCompleted ? (
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: '20px' }}>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>¿Qué tecnología introdujo Carlos Lambert en Chile en 1840?</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button onClick={() => alert('Falso.')} style={{ padding: '1rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid gray', borderRadius: '10px', textAlign: 'left', cursor: 'pointer' }}>A) La pólvora para minas subterráneas.</button>
                    <button onClick={() => { setQuizCompleted(true); markModuleComplete('trivia'); }} style={{ padding: '1rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid gray', borderRadius: '10px', textAlign: 'left', cursor: 'pointer' }}>B) El horno de reverbero para aprovechar los sulfuros de cobre.</button>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <CheckCircle size={80} color="#10b981" />
                  <h3>¡Correcto!</h3>
                  <button onClick={() => setActiveModule('diploma')} style={{ background: '#ea580c', padding: '1rem', color: 'white', borderRadius: '15px', border: 'none', marginTop: '1rem', cursor: 'pointer' }}>VER CERTIFICADO</button>
                </div>
              )}
            </motion.div>
          )}

          {activeModule === 'diploma' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '4rem', textAlign: 'center' }}>
              <Award size={80} color="#ea580c" style={{ margin: '0 auto 1rem' }} />
              <h2 style={{ fontSize: '3rem', fontWeight: '900', color: '#fb923c' }}>¡Felicidades!</h2>
              <button onClick={() => { markModuleComplete('diploma'); generateDiploma(); }} style={{ background: '#ea580c', color: 'white', border: 'none', padding: '1.5rem 3rem', borderRadius: '20px', fontSize: '1.2rem', fontWeight: '900', cursor: 'pointer', marginTop: '2rem' }}><Download size={24} style={{ marginRight: '10px' }} /> DESCARGAR DIPLOMA</button>
            </motion.div>
          )}
        </section>
      </main>
    </div>
  );
}
