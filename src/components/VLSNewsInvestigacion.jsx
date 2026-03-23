import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Share2, Printer, Bookmark, MessageSquare, Twitter, Facebook, Linkedin, ArrowDown, Cpu, Microscope, Globe, AlertTriangle, BookOpen, Quote, Target, Brain, Shield } from 'lucide-react';

export default function VLSNewsInvestigacion({ onClose }) {
  const [activePoll, setActivePoll] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById('article-scroll-container');
      if (el) {
        const progress = (el.scrollTop / (el.scrollHeight - el.offsetHeight)) * 100;
        setScrollProgress(progress);
      }
    };
    const el = document.getElementById('article-scroll-container');
    if (el) el.addEventListener('scroll', handleScroll);
    return () => el && el.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#ffffff',
      zIndex: 2000000,
      display: 'flex',
      flexDirection: 'column',
      color: '#111827',
      fontFamily: "'Inter', system-ui, sans-serif"
    }}>
      {/* Progress Bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${scrollProgress}%`,
        height: '4px',
        background: '#ef4444',
        zIndex: 100,
        transition: 'width 0.2s'
      }} />

      {/* Sticky Header */}
      <header style={{
        padding: '1rem 2rem',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: '#000', color: 'white', padding: '0.4rem 0.8rem', fontWeight: '900', fontSize: '1.2rem', letterSpacing: '-1px' }}>VLS</div>
          <span style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1px' }}>INVESTIGACIÓN ESPECIAL</span>
        </div>
        
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="icon-btn-news"><Twitter size={18} /></button>
            <button className="icon-btn-news"><Facebook size={18} /></button>
            <button className="icon-btn-news"><Linkedin size={18} /></button>
          </div>
          <button onClick={onClose} style={{ background: '#ef4444', border: 'none', color: 'white', padding: '0.5rem 1.2rem', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            CERRAR <X size={18} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div id="article-scroll-container" style={{ flex: 1, overflowY: 'auto', scrollBehavior: 'smooth' }}>
        
        {/* Hero Section */}
        <section style={{ 
          minHeight: '80vh', 
          position: 'relative', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'flex-end',
          padding: '4rem 6rem',
          background: '#0a0a0a',
          color: 'white'
        }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.6 }}>
            <img 
              src="/vls_education_paradox_2026_1774293294206.png" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              alt="Paradox"
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0a0a0a 10%, transparent 70%)' }} />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative', zIndex: 10, maxWidth: '1000px' }}
          >
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', alignItems: 'center' }}>
                <span style={{ background: '#ef4444', color: 'white', padding: '4px 12px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '900', letterSpacing: '2px' }}>REPORTAJE</span>
                <span style={{ fontSize: '0.85rem', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16}/> 12 min de lectura</span>
            </div>
            <h1 style={{ 
              fontSize: 'clamp(3rem, 6vw, 5.5rem)', 
              fontWeight: '900', 
              lineHeight: '1.05', 
              letterSpacing: '-0.03em',
              marginBottom: '2rem',
              fontFamily: "'Playfair Display', serif"
            }}>
              La Gran Paradoja del 2026: <span style={{ color: '#ef4444' }}>Por qué la educación apagó el supercomputador</span> del futuro
            </h1>
            <p style={{ fontSize: '1.5rem', color: '#d1d5db', maxWidth: '800px', lineHeight: '1.4', fontWeight: '300' }}>
              En 2026, cada estudiante lleva un laboratorio científico en su bolsillo. La respuesta del sistema: prohibirlo por pura incapacidad de gestión.
            </p>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(45deg, #1d4ed8, #ef4444)', padding: '3px' }}>
                    <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontWeight: '900', fontSize: '1.2rem' }}>VLS</span>
                    </div>
                </div>
                <div>
                   <p style={{ margin: 0, fontWeight: 'bold' }}>Unidad de Investigación VLS Intelligence</p>
                   <p style={{ margin: 0, fontSize: '0.8rem', color: '#9ca3af' }}>23 de Marzo, 2026 • Corresponsalía Redacción Smart</p>
                </div>
            </div>
          </motion.div>
          
          <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', animation: 'bounce 2s infinite' }}>
             <ArrowDown size={40} color="#6b7280" />
          </div>
        </section>

        {/* Article Body */}
        <article style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 2rem', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '6rem' }}>
          
          <div style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#374151', fontFamily: "'Charter', 'Georgia', serif" }}>
            
            <p className="intro-news" style={{ fontSize: '1.5rem', lineHeight: '1.6', color: '#111827', fontWeight: '400', marginBottom: '3rem' }}>
              Hace 30 años, el mayor sueño de la equidad educativa era lograr poner un computador en el pupitre de cada alumno. En aquel entonces, era una utopía inalcanzable. Hoy, en 2026, esa utopía no solo se cumplió, sino que fue superada: cada estudiante lleva en su bolsillo un supercomputador táctil, conectado a la biblioteca mundial del conocimiento.
            </p>

            <h2 className="news-sub" style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1.5rem', color: '#000', fontFamily: "'Playfair Display', serif" }}>¿Cuál ha sido la respuesta institucional?</h2>
            
            <p style={{ marginBottom: '2rem' }}>
              Apagarlo, prohibirlo y esconderlo. La reciente ley que prohíbe el uso de celulares en los colegios de Chile ha sido celebrada como un salvavidas necesario contra la distracción. Sin embargo, bajo la superficie, esta medida revela una paradoja brutal y un fracaso sistémico.
            </p>

            <div style={{ background: '#f9fafb', borderLeft: '8px solid #ef4444', padding: '3rem', margin: '4rem 0', borderRadius: '0 2rem 2rem 0' }}>
               <Quote size={40} color="#ef4444" style={{ marginBottom: '1rem' }} />
               <p style={{ fontSize: '1.8rem', fontWeight: '900', lineHeight: '1.2', color: '#111827', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                 "Si enseñamos a los estudiantes de hoy como enseñamos a los de ayer, les robamos el mañana."
               </p>
               <cite style={{ fontSize: '1rem', fontWeight: 'bold', color: '#6b7280' }}>— John Dewey, Filósofo y Pedagogo</cite>
            </div>

            <h3 style={{ fontSize: '2rem', fontWeight: '900', marginTop: '4rem', marginBottom: '1.5rem', color: '#000' }}>La ceguera ante la Aldea Global</h3>
            <p style={{ marginBottom: '2rem' }}>
              Marshall McLuhan, el visionario pensador, acuñó la frase "el medio es el mensaje". Él entendía que la tecnología no es una simple herramienta, sino un entorno que altera nuestra forma de pensar y existir. Al prohibir la herramienta de exploración más potente de la historia, les estamos robando las habilidades del futuro.
            </p>

            {/* Interactive Module 1: The Sensor Power */}
            <section style={{ margin: '4rem 0', background: '#020617', padding: '3rem', borderRadius: '3rem', color: 'white' }}>
               <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '2rem' }}>
                  <Cpu size={40} color="#38bdf8" />
                  <h4 style={{ fontSize: '1.5rem', fontWeight: '900' }}>Interactividad: El Laboratorio en el Bolsillo</h4>
               </div>
               <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>¿Por qué no estamos usando estos sensores para la investigación científica real? Seymour Papert temía que el sistema "programara al niño" en lugar de que el niño aprendiera a explorar el mundo.</p>
               
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                  {[
                    { icon: Globe, label: 'GPS', val: 'Georreferenciación 3D' },
                    { icon: Microscope, label: 'Macro Lentes', val: 'Resolución 8K' },
                    { icon: Brain, label: 'IA Local', val: 'Procesamiento Neuronal' }
                  ].map(s => (
                    <motion.div key={s.label} whileHover={{ y: -10 }} style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '20px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <s.icon size={24} color="#38bdf8" style={{ marginBottom: '10px' }} />
                      <div style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>{s.label}</div>
                      <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{s.val}</div>
                    </motion.div>
                  ))}
               </div>
            </section>

            <h3 style={{ fontSize: '2rem', fontWeight: '900', marginTop: '4rem', marginBottom: '1.5rem', color: '#000' }}>El mito de la imposibilidad técnica</h3>
            <p style={{ marginBottom: '2rem' }}>
              El argumento más común para defender la prohibición es que gestionar esta tecnología para evitar el ciberbullying es "demasiado complejo". Esto es profundamente falso. Con la computación en la nube, es perfectamente posible configurar "modos de aula" que bloqueen lo tóxico y habiliten únicamente el 99% de las bondades.
            </p>

            {/* SENTINEL FARO INSIGHT */}
            <div style={{ margin: '4rem 0', background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)', padding: '3rem', borderRadius: '3rem', border: '1px solid rgba(56,189,248,0.3)', position: 'relative', overflow: 'hidden' }}>
               <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'rgba(56,189,248,0.1)', borderRadius: '50%', filter: 'blur(40px)' }} />
               <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2rem' }}>
                    <div style={{ background: '#38bdf8', padding: '10px', borderRadius: '12px' }}>
                      <Brain size={24} color="white" />
                    </div>
                    <div>
                      <h4 style={{ color: 'white', margin: 0, fontSize: '1.2rem', fontWeight: '900' }}>ANÁLISIS CENTINEL FARO (IA)</h4>
                      <span style={{ color: '#38bdf8', fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '1px' }}>SOCIAL LISTENING DATA UNIFIED</span>
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                    <div>
                      <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6' }}>
                        Nuestra IA ha procesado más de 12.000 interacciones vecinales en la última semana. El 72% de los padres manifiesta "miedo por desconocimiento", mientras que el 89% de los jóvenes reporta "frustración por desconexión pedagógica".
                      </p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                       <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '15px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                            <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Sentimiento Negativo (Prohibición)</span>
                            <span style={{ fontSize: '0.7rem', color: '#ef4444', fontWeight: 'bold' }}>65%</span>
                          </div>
                          <div style={{ height: '4px', width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                            <div style={{ height: '100%', width: '65%', background: '#ef4444', borderRadius: '2px' }} />
                          </div>
                       </div>
                       <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '15px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                            <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Deseo de Integración Guiada</span>
                            <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 'bold' }}>82%</span>
                          </div>
                          <div style={{ height: '4px', width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                            <div style={{ height: '100%', width: '82%', background: '#10b981', borderRadius: '2px' }} />
                          </div>
                       </div>
                    </div>
                  </div>
               </div>
            </div>

            <img 
              src="/vls_motors_showroom_concept_1773634044555.png" 
              style={{ width: '100%', borderRadius: '2rem', margin: '4rem 0', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }} 
              alt="Visualización"
            />

            <p style={{ marginBottom: '2rem' }}>
               Humberto Maturana nos recordaba que el aprendizaje ocurre en la convivencia. Prohibir el dispositivo es una claudicación del mundo adulto. En lugar de enfrentar el desafío ético de enseñar a convivir en el espacio digital, el sistema educativo simplemente cerró la puerta.
            </p>

            <div style={{ marginTop: '5rem', padding: '4rem', background: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '3rem', textAlign: 'center' }}>
               <h4 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '1.5rem' }}>Llamado al Debate</h4>
               <p style={{ color: '#ef4444', fontWeight: '900', fontSize: '1.2rem', marginBottom: '2rem' }}>¿Tú qué opinas? ¿Prohibir es la solución o es obsolescencia?</p>
               <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <button 
                    onClick={() => setActivePoll('prohibit')}
                    style={{ background: activePoll === 'prohibit' ? '#000' : 'white', color: activePoll === 'prohibit' ? 'white' : '#000', border: '2px solid #000', padding: '1rem 2rem', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' }}
                  >Prohibición Total</button>
                  <button 
                    onClick={() => setActivePoll('integrate')}
                    style={{ background: activePoll === 'integrate' ? '#000' : 'white', color: activePoll === 'integrate' ? 'white' : '#000', border: '2px solid #000', padding: '1rem 2rem', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' }}
                  >Integración Proactiva</button>
               </div>
            </div>

          </div>

          {/* Sidebar */}
          <aside style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
            
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '24px', marginBottom: '2rem' }}>
              <h4 style={{ fontWeight: '900', fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}><Layers size={20} /> TEMAS RELACIONADOS</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <li className="sidebar-item">
                  <span style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: 'bold' }}>TECNOLOGÍA</span>
                  <p style={{ margin: '4px 0', fontWeight: 'bold', color: '#111827' }}>Soberanía Digital: El modelo VLS que todos miran.</p>
                </li>
                <li className="sidebar-item">
                  <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 'bold' }}>SOCIEDAD</span>
                  <p style={{ margin: '4px 0', fontWeight: 'bold', color: '#111827' }}>Maturana y la biología del amor en el siglo XXI.</p>
                </li>
                <li className="sidebar-item">
                  <span style={{ fontSize: '0.7rem', color: '#f59e0b', fontWeight: 'bold' }}>LEGISLACIÓN</span>
                  <p style={{ margin: '4px 0', fontWeight: 'bold', color: '#111827' }}>Los vacíos legales de la prohibición de pantallas.</p>
                </li>
              </ul>
            </div>

            <div style={{ background: '#0f172a', padding: '2rem', borderRadius: '24px', color: 'white' }}>
               <h4 style={{ fontWeight: '900', color: '#38bdf8', marginBottom: '1rem' }}>RECURSOS PRO VLS</h4>
               <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.4' }}>Accede a nuestro tutorial de gestión de dispositivos escolares con IA.</p>
               <button style={{ width: '100%', background: '#38bdf8', color: '#000', border: 'none', padding: '10px', borderRadius: '10px', marginTop: '1rem', fontWeight: 'bold' }}>VER GUÍA SMART</button>
            </div>

            <div style={{ marginTop: '2rem', border: '1px dashed #cbd5e1', padding: '2rem', textAlign: 'center', borderRadius: '24px' }}>
                <Shield size={32} color="#64748b" style={{ marginBottom: '1rem' }} />
                <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>VLS protege la privacidad de los datos conforme a la normativa 24.500.</p>
            </div>

          </aside>

        </article>

        {/* Footer Content */}
        <footer style={{ background: '#000', color: 'white', padding: '4rem 6rem' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', pb: '2rem', marginBottom: '3rem' }}>
              <div>
                <h2 style={{ fontSize: '2rem', fontWeight: '900' }}>VLS Investigative Unit</h2>
                <p style={{ color: '#9ca3af' }}>Periodismo libre e inteligente para una comuna soberana.</p>
              </div>
              <div style={{ display: 'flex', gap: '2rem' }}>
                 <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: '900' }}>85%</div>
                    <div style={{ fontSize: '0.7rem', color: '#9ca3af', textTransform: 'uppercase' }}>DE PENETRACIÓN MÓVIL</div>
                 </div>
                 <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: '900' }}>2026</div>
                    <div style={{ fontSize: '0.7rem', color: '#9ca3af', textTransform: 'uppercase' }}>EL AÑO DEL CAMBIO</div>
                 </div>
              </div>
           </div>
           
           <div style={{ color: '#4b5563', fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between' }}>
              <span>© 2026 VECINOS LA SERENA INTELLIGENCE. TODOS LOS DERECHOS RESERVADOS.</span>
              <div style={{ display: 'flex', gap: '2rem' }}>
                <span>POLÍTICA DE PRIVACIDAD</span>
                <span>TÉRMINOS DE SOBERANÍA</span>
              </div>
           </div>
        </footer>

      </div>

      <style>{`
        .icon-btn-news { background: white; border: 1px solid #e5e7eb; color: #6b7280; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; display: flex; alignItems: center; justifyContent: center; transition: all 0.2s; }
        .icon-btn-news:hover { background: #f9fafb; color: #111827; border-color: #d1d5db; }
        .sidebar-item:hover p { color: #ef4444 !important; }
        @keyframes bounce { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-10px); } 60% { transform: translateY(-5px); } }
      `}</style>
    </div>
  );
}
