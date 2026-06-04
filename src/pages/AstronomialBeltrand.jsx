import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Play, Award, ChevronRight, X, User, CheckCircle, Star, Moon, Sun, Sparkles, AlertTriangle, ShieldCheck, Download, Activity, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import confetti from 'canvas-confetti';
import { logElearningActivity } from '../utils/elearningLogger';

const ASTRO_MODULES = [
  {
    id: 'intro',
    title: 'Módulo 1: La Amenaza Invisible',
    icon: Play,
    desc: 'Entrevista maestra con Camila Beltrand sobre la contaminación lumínica y la OPCC.'
  },
  {
    id: 'circadiano',
    title: 'Módulo 2: Ciclo Circadiano',
    icon: Activity,
    desc: 'Comprende cómo la luz blanca altera nuestra salud y el ecosistema nocturno.'
  },
  {
    id: 'simulador',
    title: 'Módulo 3: Simulador Lumínico',
    icon: Lightbulb,
    desc: 'Práctica interactiva: Apaga la luz LED blanca y enciende la cálida hacia el suelo.'
  },
  {
    id: 'trivia',
    title: 'Módulo 4: Trivia Estelar',
    icon: Sparkles,
    desc: 'Demuestra tus conocimientos para desbloquear tu certificado final.'
  },
  {
    id: 'diploma',
    title: 'Certificación Final',
    icon: Award,
    desc: 'Evaluación final para obtener el título de "Guardiana de los Cielos".'
  }
];

export default function AstronomiaBeltrand() {
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
  const [spectrumValue, setSpectrumValue] = useState(0);
  const [showIntroAnimation, setShowIntroAnimation] = useState(true);

  useEffect(() => {
    document.title = "Astronomía Beltrand | Entrevecinas.cl";
    const timer = setTimeout(() => setShowIntroAnimation(false), 6000);
    
    const savedUser = localStorage.getItem('astro_beltrand_user');
    const savedEmail = localStorage.getItem('astro_beltrand_email');
    const savedProgress = localStorage.getItem('astro_beltrand_progress');
    const savedModules = localStorage.getItem('astro_beltrand_completed');
    
    if (savedUser && savedEmail) {
      setUserName(savedUser);
      setUserEmail(savedEmail);
      setIsLogged(true);
      if (savedProgress) setProgress(parseInt(savedProgress));
      if (savedModules) setCompletedModules(JSON.parse(savedModules));
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (userName.trim() && userEmail.trim()) {
      setIsLogged(true);
      localStorage.setItem('astro_beltrand_user', userName);
      localStorage.setItem('astro_beltrand_email', userEmail);
      logElearningActivity('Astronomía Beltrand', userName, userEmail, 'login');
      // Play a space sound
      const audio = new Audio('/stella/Reloj_Anarquista.mp3'); // Fallback to an existing sound
      audio.volume = 0.2;
      audio.play().catch(() => {});
    }
  };

  const markModuleComplete = (moduleId) => {
    if (!completedModules.includes(moduleId)) {
      const newModules = [...completedModules, moduleId];
      setCompletedModules(newModules);
      const newProgress = Math.round((newModules.length / ASTRO_MODULES.length) * 100);
      setProgress(newProgress);
      localStorage.setItem('astro_beltrand_completed', JSON.stringify(newModules));
      localStorage.setItem('astro_beltrand_progress', newProgress.toString());
      
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#8b5cf6', '#38bdf8', '#fbbf24']
      });
    }
  };

  const generateDiploma = async () => {
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([800, 600]);
      
      // Draw background
      page.drawRectangle({
        x: 0, y: 0, width: 800, height: 600,
        color: rgb(0.02, 0.04, 0.1), // Dark space blue
      });

      // Draw borders
      page.drawRectangle({
        x: 20, y: 20, width: 760, height: 560,
        borderColor: rgb(0.55, 0.36, 0.96), // Purple
        borderWidth: 4,
      });

      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const normalFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

      page.drawText('ENTREVECINAS.CL', { x: 300, y: 520, size: 24, font, color: rgb(0.92, 0.28, 0.6) });
      page.drawText('CERTIFICADO OFICIAL', { x: 260, y: 450, size: 28, font, color: rgb(1, 1, 1) });
      
      page.drawText('Se otorga el título de', { x: 330, y: 390, size: 16, font: normalFont, color: rgb(0.7, 0.7, 0.8) });
      page.drawText('GUARDIANA DE LOS CIELOS', { x: 220, y: 340, size: 26, font, color: rgb(0.22, 0.74, 0.97) });
      
      page.drawText('A:', { x: 390, y: 280, size: 16, font: normalFont, color: rgb(0.7, 0.7, 0.8) });
      
      const nameWidth = font.widthOfTextAtSize(userName.toUpperCase(), 32);
      page.drawText(userName.toUpperCase(), { x: 400 - (nameWidth/2), y: 230, size: 32, font, color: rgb(0.98, 0.75, 0.14) });

      page.drawText('Por completar exitosamente la capacitación en protección contra', { x: 180, y: 170, size: 14, font: normalFont, color: rgb(0.8, 0.8, 0.8) });
      page.drawText('la contaminación lumínica y preservación del ciclo circadiano.', { x: 200, y: 150, size: 14, font: normalFont, color: rgb(0.8, 0.8, 0.8) });

      const dateStr = new Date().toLocaleDateString('es-CL');
      page.drawText(`Fecha: ${dateStr}`, { x: 100, y: 80, size: 12, font, color: rgb(0.5, 0.5, 0.5) });
      page.drawText('Firmado: Camila Beltrand (OPCC)', { x: 500, y: 80, size: 12, font, color: rgb(0.5, 0.5, 0.5) });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Certificado_Astronomia_${userName.replace(' ', '_')}.pdf`;
      link.click();
      logElearningActivity('Astronomía Beltrand', userName, userEmail, 'diploma_downloaded');
    } catch (e) {
      console.error(e);
      alert('Error generando diploma.');
    }
  };

  if (showIntroAnimation) {
    return (
      <div style={{ position: 'fixed', inset: 0, background: '#020617', zIndex: 99999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', overflow: 'hidden' }}>
        
        {/* Estrellas brillantes que aparecen al final */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1] }}
            transition={{ duration: 6, times: [0, 0.66, 1] }}
            style={{ position: 'absolute', inset: 0, background: 'url("https://www.transparenttextures.com/patterns/stardust.png")', zIndex: 1 }}
        />
        
        {/* Contenedor Central */}
        <motion.div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            
            {/* El Faro (Simulado) */}
            <motion.div 
                initial={{ opacity: 1, filter: 'brightness(1)' }}
                animate={{ opacity: 0.1, filter: 'brightness(0)', scale: 0.95 }}
                transition={{ duration: 2, delay: 2 }}
                style={{ width: '120px', height: '180px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
                {/* Luz del faro invasiva */}
                <motion.div 
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 2, delay: 2 }}
                    style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', width: '300vw', height: '300px', background: 'radial-gradient(ellipse at top, rgba(255,255,255,0.8), transparent 70%)', zIndex: 2 }}
                />
                
                {/* Estructura del Faro Mejorada */}
                {/* Cúpula / Techo de la linterna */}
                <div style={{ width: '34px', height: '24px', background: '#94a3b8', borderRadius: '50% 50% 0 0', position: 'relative', zIndex: 3, border: '2px solid #1e293b', borderBottom: 'none' }} />
                
                {/* Habitación de cristal (Linterna) */}
                <div style={{ width: '40px', height: '30px', background: 'rgba(255,255,255,0.9)', border: '4px solid #1e293b', position: 'relative', zIndex: 3, boxShadow: '0 0 30px rgba(255,255,255,0.8)' }}>
                    {/* Foco interno */}
                    <motion.div 
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '12px', height: '12px', background: '#fff', borderRadius: '50%', boxShadow: '0 0 10px #fff' }} 
                    />
                </div>
                
                {/* Balcón Superior */}
                <div style={{ width: '64px', height: '8px', background: '#1e293b', borderRadius: '4px', position: 'relative', zIndex: 3 }} />
                
                {/* Cuerpo del faro (trapezoidal simulado) */}
                <div style={{ width: '56px', height: '118px', background: 'linear-gradient(to right, #cbd5e1, #f1f5f9, #94a3b8)', position: 'relative', zIndex: 3, clipPath: 'polygon(15% 0, 85% 0, 100% 100%, 0% 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '15px' }}>
                    {/* Ventanas */}
                    <div style={{ width: '12px', height: '20px', background: '#1e293b', borderRadius: '10px 10px 0 0', marginBottom: '25px', border: '1px solid #0f172a' }} />
                    <div style={{ width: '14px', height: '24px', background: '#1e293b', borderRadius: '10px 10px 0 0', border: '1px solid #0f172a' }} />
                </div>
                
                {/* Base del Faro */}
                <div style={{ width: '80px', height: '15px', background: '#334155', borderRadius: '4px 4px 0 0', position: 'relative', zIndex: 2, marginTop: '-5px' }} />
            </motion.div>
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 3, delay: 0.5 }}
                style={{ marginTop: '2rem', textAlign: 'center' }}
            >
                <div style={{ fontSize: '1rem', letterSpacing: '4px', color: '#94a3b8' }}>ENTREVECINAS.CL</div>
                <div style={{ fontSize: '2rem', fontWeight: '900', color: 'white' }}>INICIANDO TRANSMISIÓN...</div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 3.5 }}
                style={{ position: 'absolute', bottom: '-80px', textAlign: 'center', width: '300px' }}
            >
                <div style={{ fontSize: '1rem', letterSpacing: '4px', color: '#38bdf8' }}>ACADEMIA ESTELAR</div>
                <div style={{ fontSize: '2.5rem', fontWeight: '900', color: 'white', textShadow: '0 0 20px rgba(56,189,248,0.5)' }}>ASTRONOMÍA</div>
            </motion.div>
        </motion.div>
      </div>
    );
  }

  if (!isLogged) {
    return (
      <div style={{ minHeight: '100vh', background: '#020617', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'Outfit', sans-serif", position: 'relative', overflow: 'hidden' }}>
        {/* Estrellas de fondo */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.3, background: 'radial-gradient(circle at 50% 50%, #1e1b4b 0%, #020617 100%)', zIndex: 0 }} />
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ zIndex: 1, background: 'rgba(15, 23, 42, 0.8)', padding: '3rem', borderRadius: '30px', border: '1px solid rgba(139, 92, 246, 0.3)', backdropFilter: 'blur(20px)', maxWidth: '400px', width: '90%', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
          <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', boxShadow: '0 0 30px rgba(139,92,246,0.5)' }}>
            <Moon size={40} color="white" />
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '1rem', lineHeight: '1.2' }}>Academia Estelar</h1>
          <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '0.9rem' }}>Ingresa tu nombre para comenzar la capacitación en defensa de nuestros cielos con Camila Beltrand.</p>
          
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Tu nombre completo..."
              value={userName}
              onChange={e => setUserName(e.target.value)}
              style={{ width: '100%', padding: '1rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.5)', color: 'white', marginBottom: '1rem', outline: 'none', fontSize: '1rem', boxSizing: 'border-box' }}
              required
            />
            <input
              type="email"
              placeholder="Tu correo electrónico..."
              value={userEmail}
              onChange={e => setUserEmail(e.target.value)}
              style={{ width: '100%', padding: '1rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.5)', color: 'white', marginBottom: '1.5rem', outline: 'none', fontSize: '1rem', boxSizing: 'border-box' }}
              required
            />
            <button type="submit" style={{ width: '100%', padding: '1rem', background: 'linear-gradient(90deg, #8b5cf6, #38bdf8)', color: 'white', border: 'none', borderRadius: '15px', fontWeight: '900', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', transition: 'all 0.3s' }}>
              COMENZAR VIAJE <Sparkles size={20} />
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: 'white', fontFamily: "'Outfit', sans-serif", position: 'relative' }}>
      {/* Header */}
      <header style={{ padding: '1.5rem 2rem', background: 'rgba(2, 6, 23, 0.95)', borderBottom: '1px solid rgba(139, 92, 246, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(20px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <div style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', padding: '10px', borderRadius: '12px' }}><Moon size={24} color="white" /></div>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: '900', letterSpacing: '1px' }}>ASTRONOMÍA BELTRAND</div>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '2px' }}>Protección de Cielos VLS</div>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.05)', padding: '5px 15px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <User size={16} color="#38bdf8" />
            <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{userName}</span>
          </div>
          <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={24} /></button>
        </div>
      </header>

      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem', display: 'grid', gridTemplateColumns: '300px 1fr', gap: '3rem' }}>
        
        {/* Sidebar */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '2rem', borderRadius: '25px', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: '900', color: '#94a3b8' }}>TU PROGRESO</span>
              <span style={{ fontSize: '1.2rem', fontWeight: '900', color: '#38bdf8' }}>{progress}%</span>
            </div>
            <div style={{ width: '100%', height: '10px', background: 'rgba(0,0,0,0.5)', borderRadius: '5px', overflow: 'hidden', marginBottom: '1rem' }}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} style={{ height: '100%', background: 'linear-gradient(90deg, #8b5cf6, #38bdf8)' }} />
            </div>
            <div style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
              {progress === 100 ? "¡Academia completada al 100%!" : `Falta completar: ${ASTRO_MODULES.find(m => !completedModules.includes(m.id))?.title || 'Módulos'}`}
            </div>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {ASTRO_MODULES.map((mod, index) => {
              const isActive = activeModule === mod.id;
              const isCompleted = completedModules.includes(mod.id);
              const isUnlocked = index === 0 || completedModules.includes(ASTRO_MODULES[index - 1].id);
              
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
                    background: isActive ? 'rgba(139, 92, 246, 0.2)' : 'rgba(0,0,0,0.3)', 
                    border: `1px solid ${isActive ? '#8b5cf6' : 'transparent'}`, 
                    color: isActive ? 'white' : (isUnlocked ? '#94a3b8' : '#475569'), 
                    textAlign: 'left',
                    opacity: isUnlocked ? 1 : 0.5
                  }}
                >
                  <div style={{ background: isCompleted ? '#10b981' : (isActive ? '#8b5cf6' : 'rgba(0,0,0,0.5)'), padding: '10px', borderRadius: '12px' }}>
                    {isCompleted ? <CheckCircle size={20} color="white" /> : <mod.icon size={20} color={isActive ? "white" : (isUnlocked ? "#64748b" : "#334155")} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>{mod.title}</div>
                    {isActive && <div style={{ fontSize: '0.75rem', marginTop: '5px', color: '#cbd5e1' }}>{mod.desc}</div>}
                  </div>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content Area */}
        <section style={{ background: 'rgba(15, 23, 42, 0.4)', borderRadius: '35px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          
          {activeModule === 'intro' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2rem' }}>
                <div style={{ background: 'rgba(139, 92, 246, 0.2)', padding: '15px', borderRadius: '15px' }}><Play size={30} color="#8b5cf6" /></div>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', margin: 0 }}>La Amenaza Invisible</h2>
              </div>
              <p style={{ fontSize: '1.2rem', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '3rem' }}>
                Camila Beltrand, directora de la Oficina de Protección de la Calidad del Cielo (OPCC), nos alerta sobre la contaminación lumínica. La "Región Estrella" está perdiendo su patrimonio nocturno debido al uso descontrolado de luminarias LED blancas.
              </p>
              
              <div style={{ borderRadius: '25px', overflow: 'hidden', background: '#000', aspectRatio: '16/9', border: '2px solid rgba(139,92,246,0.3)', marginBottom: '3rem', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/IUPiyBw6eSQ?rel=0" title="Entrevista Camila Beltrand" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => { markModuleComplete('intro'); setActiveModule('circadiano'); }} style={{ background: 'linear-gradient(90deg, #8b5cf6, #ec4899)', color: 'white', border: 'none', padding: '1rem 2.5rem', borderRadius: '15px', fontSize: '1.1rem', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  COMPLETAR Y AVANZAR <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          )}

          {activeModule === 'circadiano' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2rem' }}>
                <div style={{ background: 'rgba(56, 189, 248, 0.2)', padding: '15px', borderRadius: '15px' }}><Activity size={30} color="#38bdf8" /></div>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', margin: 0 }}>Ciclo Circadiano</h2>
              </div>
              <p style={{ fontSize: '1.2rem', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '2rem' }}>
                El exceso de luz blanca fría (tonos azules) engaña a nuestro cerebro, inhibiendo la producción de melatonina y alterando el sueño.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
                <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '2rem', borderRadius: '20px' }}>
                  <Sun size={40} color="#ef4444" style={{ marginBottom: '1rem' }} />
                  <h3 style={{ fontSize: '1.3rem', color: '#fca5a5', marginBottom: '1rem' }}>Luz Blanca Invasiva</h3>
                  <ul style={{ color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '20px' }}>
                    <li>Desorienta a aves migratorias e insectos polinizadores.</li>
                    <li>Inhibe la melatonina en humanos, causando insomnio.</li>
                    <li>Ciega los observatorios astronómicos de la región.</li>
                  </ul>
                </div>
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '2rem', borderRadius: '20px' }}>
                  <Moon size={40} color="#10b981" style={{ marginBottom: '1rem' }} />
                  <h3 style={{ fontSize: '1.3rem', color: '#6ee7b7', marginBottom: '1rem' }}>Cielo Oscuro Protegido</h3>
                  <ul style={{ color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '20px' }}>
                    <li>Regula los ritmos biológicos naturales.</li>
                    <li>Permite la vida silvestre nocturna.</li>
                    <li>Conserva el patrimonio astronómico del Valle de Elqui.</li>
                  </ul>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => { markModuleComplete('circadiano'); setActiveModule('simulador'); }} style={{ background: 'linear-gradient(90deg, #8b5cf6, #ec4899)', color: 'white', border: 'none', padding: '1rem 2.5rem', borderRadius: '15px', fontSize: '1.1rem', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  COMPLETAR Y AVANZAR <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          )}

          {activeModule === 'simulador' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '3rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1rem' }}>
                <div style={{ background: 'rgba(251, 191, 36, 0.2)', padding: '15px', borderRadius: '15px' }}><Lightbulb size={30} color="#fbbf24" /></div>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', margin: 0 }}>Analizador de Espectro Lumínico</h2>
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Desliza el control para filtrar las luminarias contaminantes y encontrar la luz certificada por la norma de cielos oscuros.</p>
              
              <div style={{ 
                flex: 1, 
                borderRadius: '30px', 
                position: 'relative', 
                overflow: 'hidden', 
                background: '#000', 
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '400px',
                transition: 'all 0.5s'
              }}>
                {/* Estrellas (solo visibles si la luz no es blanca/alta) */}
                <div style={{ position: 'absolute', inset: 0, opacity: spectrumValue >= 67 ? 1 : (spectrumValue >= 34 ? 0.3 : 0.05), transition: 'opacity 1s', background: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}>
                   {spectrumValue >= 67 && <div style={{ position: 'absolute', top: '20%', left: '30%', width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)', filter: 'blur(10px)' }} />}
                </div>

                {/* Foco de luz */}
                <div style={{ 
                  position: 'absolute', 
                  top: '20%', 
                  left: '50%', 
                  transform: 'translateX(-50%)', 
                  width: '300px', 
                  height: '600px', 
                  background: spectrumValue < 34 ? 'linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,0))' : spectrumValue < 67 ? 'linear-gradient(to bottom, rgba(200,220,255,0.9), rgba(200,220,255,0))' : 'linear-gradient(to bottom, rgba(251, 191, 36, 0.8), rgba(251, 191, 36, 0))', 
                  clipPath: spectrumValue < 34 ? 'polygon(0% 0%, 100% 0%, 150% 100%, -50% 100%)' : spectrumValue < 67 ? 'polygon(20% 0, 80% 0, 120% 100%, -20% 100%)' : 'polygon(30% 0, 70% 0, 100% 100%, 0% 100%)',
                  filter: 'blur(30px)',
                  transition: 'all 0.5s'
                }} />

                {/* Tipo de Luminaria */}
                <div style={{ position: 'absolute', top: '10%', background: 'rgba(0,0,0,0.7)', padding: '10px 20px', borderRadius: '20px', border: `1px solid ${spectrumValue >= 67 ? '#10b981' : '#ef4444'}`, color: 'white', fontWeight: 'bold' }}>
                  {spectrumValue < 34 ? 'Globo Multidireccional (Altamente Contaminante)' : spectrumValue < 67 ? 'LED Frío (Altera ciclo circadiano)' : 'LED Cálido Apantallado (Luz Certificada)'}
                </div>

                {/* Suelo */}
                <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '20%', background: 'linear-gradient(to top, #0f172a, transparent)' }} />
              </div>

              <div style={{ marginTop: '2rem', background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <h4 style={{ textAlign: 'center', marginBottom: '1rem', color: '#94a3b8' }}>FILTRO DE ESPECTRO LUMÍNICO</h4>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={spectrumValue} 
                  onChange={(e) => setSpectrumValue(parseInt(e.target.value))} 
                  style={{ width: '100%', cursor: 'pointer', accentColor: spectrumValue >= 67 ? '#fbbf24' : '#38bdf8' }} 
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '0.9rem', color: '#64748b', fontWeight: 'bold' }}>
                  <span>0% (Blanca / Globo)</span>
                  <span>50% (Fría / Semidirigida)</span>
                  <span>100% (Cálida / Apantallada)</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                <button 
                  disabled={spectrumValue < 67}
                  onClick={() => { markModuleComplete('simulador'); setActiveModule('trivia'); }} 
                  style={{ background: spectrumValue >= 67 ? 'linear-gradient(90deg, #8b5cf6, #ec4899)' : '#334155', color: spectrumValue >= 67 ? 'white' : '#64748b', border: 'none', padding: '1rem 2.5rem', borderRadius: '15px', fontSize: '1.1rem', fontWeight: '900', cursor: spectrumValue >= 67 ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {spectrumValue >= 67 ? 'COMPLETAR Y AVANZAR' : 'ENCUENTRA LA LUZ CERTIFICADA'} <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          )}

          {activeModule === 'trivia' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2rem' }}>
                <div style={{ background: 'rgba(56, 189, 248, 0.2)', padding: '15px', borderRadius: '15px' }}><Sparkles size={30} color="#38bdf8" /></div>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', margin: 0 }}>Trivia Estelar</h2>
              </div>
              
              {!quizCompleted ? (
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>¿Cuál de las siguientes afirmaciones es correcta para proteger nuestros cielos?</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <button onClick={() => { setQuizScore(0); alert('Incorrecto. La luz blanca fría contamina más.'); }} style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '15px', textAlign: 'left', cursor: 'pointer', fontSize: '1.1rem' }}>
                      A) Debemos usar focos de luz blanca intensa para ver mejor las estrellas.
                    </button>
                    <button onClick={() => { setQuizScore(0); alert('Incorrecto. La luz debe apuntar al suelo.'); }} style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '15px', textAlign: 'left', cursor: 'pointer', fontSize: '1.1rem' }}>
                      B) Las luminarias deben apuntar hacia arriba para no molestar a los peatones.
                    </button>
                    <button onClick={() => { setQuizScore(1); setQuizCompleted(true); markModuleComplete('trivia'); }} style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '15px', textAlign: 'left', cursor: 'pointer', fontSize: '1.1rem' }}>
                      C) Usar luces cálidas y dirigidas hacia el suelo protege el ciclo circadiano.
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                  <CheckCircle size={80} color="#10b981" style={{ margin: '0 auto 1rem' }} />
                  <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>¡Trivia Completada!</h3>
                  <button onClick={() => setActiveModule('diploma')} style={{ background: 'linear-gradient(90deg, #8b5cf6, #ec4899)', color: 'white', border: 'none', padding: '1rem 2.5rem', borderRadius: '15px', fontSize: '1.1rem', fontWeight: '900', cursor: 'pointer' }}>
                    IR A CERTIFICACIÓN
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {activeModule === 'diploma' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, textAlign: 'center' }}>
              <div style={{ width: '120px', height: '120px', background: 'linear-gradient(135deg, #10b981, #38bdf8)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', boxShadow: '0 0 40px rgba(16,185,129,0.5)' }}>
                <ShieldCheck size={60} color="white" />
              </div>
              <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '1rem', lineHeight: '1.1' }}>¡Felicidades, {userName}!</h2>
              <p style={{ fontSize: '1.2rem', color: '#cbd5e1', maxWidth: '600px', marginBottom: '3rem' }}>
                Has completado la capacitación interactiva sobre la contaminación lumínica. Ahora eres oficialmente parte de la resistencia para proteger el cielo nocturno y la salud de nuestros ecosistemas.
              </p>
              
              <button 
                onClick={() => {
                  markModuleComplete('diploma');
                  generateDiploma();
                }}
                style={{
                  background: 'linear-gradient(90deg, #fbbf24, #f59e0b)',
                  color: 'black',
                  border: 'none',
                  padding: '1.5rem 3rem',
                  borderRadius: '20px',
                  fontSize: '1.2rem',
                  fontWeight: '950',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  boxShadow: '0 15px 30px rgba(251, 191, 36, 0.4)',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              >
                <Download size={24} /> DESCARGAR DIPLOMA OFICIAL
              </button>
            </motion.div>
          )}
        </section>
      </main>
    </div>
  );
}
