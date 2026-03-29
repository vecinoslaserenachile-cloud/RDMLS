import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Share2, Printer, Bookmark, MessageSquare, Twitter, Facebook, Linkedin, ArrowDown, Cpu, Microscope, Globe, AlertTriangle, BookOpen, Quote, Target, Brain, Shield, Layers } from 'lucide-react';
import CommentSection from './CommentSection';

export default function VLSNewsInvestigacion({ onClose }) {
  const [activePoll, setActivePoll] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    console.log("VLSNewsInvestigacion Mounted OK");
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    
    let lastProgress = 0;
    const handleScroll = () => {
      const el = document.getElementById('article-scroll-container');
      if (el) {
        const progress = Math.round((el.scrollTop / (el.scrollHeight - el.offsetHeight)) * 100);
        if (Math.abs(progress - lastProgress) >= 1) {
            lastProgress = progress;
            setScrollProgress(progress);
        }
      }
    };
    const el = document.getElementById('article-scroll-container');
    if (el) el.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
        el && el.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  return typeof document !== 'undefined' ? createPortal(
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: '#ffffff',
      zIndex: 2147483647,
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
        padding: isMobile ? '0.8rem 1rem' : '1rem 2rem',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#ffffff',
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '0.5rem' : '1rem' }}>
          <div style={{ background: '#000', color: 'white', padding: '0.4rem 0.8rem', fontWeight: '900', fontSize: isMobile ? '1rem' : '1.2rem', letterSpacing: '-1px' }}>VLS</div>
          <span style={{ fontWeight: 'bold', fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1px', display: isMobile ? 'none' : 'block' }}>INVESTIGACIÓN ESPECIAL</span>
        </div>
        
        <div style={{ display: 'flex', gap: isMobile ? '0.5rem' : '1.5rem', alignItems: 'center' }}>
          <button 
            onClick={() => {
               const shareUrl = `${window.location.origin}${window.location.pathname}?news=investigacion`;
               window.open(`https://wa.me/?text=${encodeURIComponent('Hemeroteca VLS: La Paradoja 2026. Lee aquí: ' + shareUrl)}`, '_blank')
            }}
            style={{ background: '#25D366', color: 'white', border: 'none', padding: '0.4rem', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            title="Compartir en WhatsApp"
          >
            <Share2 size={16} />
          </button>
          {!isMobile && (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
               <button className="icon-btn-news"><Twitter size={18} /></button>
               <button className="icon-btn-news"><Facebook size={18} /></button>
            </div>
          )}
          <button onClick={onClose} style={{ background: '#ef4444', border: 'none', color: 'white', padding: isMobile ? '0.5rem 1rem' : '0.5rem 1.2rem', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
            {isMobile ? 'X' : 'CERRAR'} <X size={isMobile ? 14 : 18} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div id="article-scroll-container" style={{ flex: 1, overflowY: 'auto', scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}>
        
        {/* Hero Section */}
        <section style={{ 
          minHeight: '80vh', 
          position: 'relative', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'flex-end',
          padding: isMobile ? '2.5rem 1.5rem' : '4rem 6rem',
          background: '#0a0a0a',
          color: 'white'
        }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.6 }}>
            <img 
              src="/vls_chile_map.jpg" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              alt="Paradox 2026"
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0a0a0a 10%, transparent 70%)' }} />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative', zIndex: 10, maxWidth: '1000px' }}
          >
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ background: '#ef4444', color: 'white', padding: '4px 12px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '900', letterSpacing: '2px' }}>REPORTAJE</span>
                <span style={{ fontSize: '0.8rem', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16}/> 12 min lectura</span>
            </div>
            <h1 style={{ 
              fontSize: 'clamp(2.2rem, 10vw, 5.5rem)', 
              fontWeight: '900', 
              lineHeight: '1', 
              letterSpacing: '-0.03em',
              marginBottom: '2rem',
              fontFamily: "'Playfair Display', serif"
            }}>
              La Gran Paradoja del 2026: <span style={{ color: '#ef4444' }}>Por qué la educación apagó el supercomputador</span>
            </h1>
            <p style={{ fontSize: isMobile ? '1.2rem' : '1.5rem', color: '#d1d5db', maxWidth: '800px', lineHeight: '1.4', fontWeight: '300' }}>
              En 2026, cada estudiante lleva un laboratorio científico en su bolsillo. La respuesta educativa: prohibirlo.
            </p>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(45deg, #1d4ed8, #ef4444)', padding: '2px' }}>
                    <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontWeight: '900', fontSize: '0.8rem' }}>VLS</span>
                    </div>
                </div>
                <div>
                   <p style={{ margin: 0, fontWeight: 'bold', fontSize: '0.9rem' }}>Unidad de Investigación VLS Intelligence</p>
                   <p style={{ margin: 0, fontSize: '0.7rem', color: '#9ca3af' }}>23 de Marzo, 2026 • Redacción Smart</p>
                </div>
            </div>
          </motion.div>
        </section>

        {/* Article Body */}
        <article style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            padding: isMobile ? '3rem 1.5rem' : '6rem 2rem', 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1fr) 350px', 
            gap: isMobile ? '4rem' : '6rem' 
        }}>
          
          <div style={{ position: 'relative', zIndex: 1, fontSize: isMobile ? '1.1rem' : '1.2rem', lineHeight: '1.8', color: '#111827' }}>
            
            <p className="intro-news" style={{ fontSize: isMobile ? '1.3rem' : '1.5rem', lineHeight: '1.6', color: '#000', fontWeight: '400', marginBottom: '3rem' }}>
              Hace 30 años, el mayor sueño era poner un computador en cada pupitre. Hoy, cada estudiante lleva en su bolsillo un supercomputador conectado a la biblioteca mundial.
            </p>

            <h2 className="news-sub" style={{ fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: '900', marginBottom: '1.5rem', color: '#000' }}>¿Cuál ha sido la respuesta institucional?</h2>
            
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               style={{ background: '#f8fafc', padding: isMobile ? '2rem' : '3rem', borderRadius: '2.5rem', margin: '4rem 0', border: '1px solid #e2e8f0' }}
            >
               <h4 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#000', marginBottom: '2rem', textAlign: 'center' }}>AULA 1996 vs 2026</h4>
               <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '2rem' }}>
                  <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '20px', border: '1px solid #cbd5e1' }}>
                     <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: '900', marginBottom: '10px' }}>1996</div>
                     <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>El PC de Escritorio</span>
                     <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '10px' }}>Compartido por 4 alumnos, enciclopedia estática.</p>
                  </div>
                  <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '20px', border: '2px solid #ef4444' }}>
                     <div style={{ fontSize: '0.7rem', color: '#ef4444', fontWeight: '900', marginBottom: '10px' }}>2026</div>
                     <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Computador de Bolsillo</span>
                     <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '10px' }}>Personal, Inteligencia Artificial generativa.</p>
                  </div>
               </div>
            </motion.div>

            <p style={{ marginBottom: '2rem' }}>
              Apagarlo y prohibirlo. La reciente ley revela una paradoja brutal: el sistema intenta gobernar el 2026 con reglas de 1996.
            </p>

            <div style={{ background: '#f9fafb', borderLeft: '8px solid #ef4444', padding: isMobile ? '2rem' : '3rem', margin: '4rem 0', borderRadius: '0 2rem 2rem 0' }}>
               <Quote size={32} color="#ef4444" style={{ marginBottom: '1rem' }} />
               <p style={{ fontSize: isMobile ? '1.4rem' : '1.8rem', fontWeight: '900', lineHeight: '1.3', color: '#111827', fontStyle: 'italic', marginBottom: '1rem' }}>
                 "Si enseñamos hoy como ayer, les robamos el mañana."
               </p>
               <cite style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#6b7280' }}>— John Dewey</cite>
            </div>

            <h3 style={{ fontSize: isMobile ? '1.8rem' : '2rem', fontWeight: '900', marginTop: '4rem', marginBottom: '1.5rem' }}>La ceguera ante la Aldea Global</h3>
             <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Aprendizaje Digital" 
                style={{ width: '100%', borderRadius: '2rem', margin: '2rem 0', boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }} 
             />

            {/* Interactive Module: The Sensor Power */}
            <section style={{ margin: '4rem 0', background: '#020617', padding: isMobile ? '2rem' : '3rem', borderRadius: '2.5rem', color: 'white' }}>
               <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '2rem' }}>
                  <Cpu size={32} color="#38bdf8" />
                  <h4 style={{ fontSize: '1.3rem', fontWeight: '900' }}>Laboratorio de Bolsillo</h4>
               </div>
               
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
                  {[
                    { icon: Globe, label: 'GPS 3D' },
                    { icon: Microscope, label: 'Sensor Macro' },
                    { icon: Brain, label: 'IA Local' }
                  ].map(s => (
                    <div key={s.label} style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '20px', textAlign: 'center' }}>
                      <s.icon size={24} color="#38bdf8" style={{ marginBottom: '10px' }} />
                      <div style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>{s.label}</div>
                    </div>
                  ))}
               </div>
            </section>

            <img 
              src="/vls_motors_spot_premium.png" 
              style={{ width: '100%', borderRadius: '2rem', margin: '4rem 0' }} 
              alt="Futuro VLS Motors"
            />

            {/* SENTINEL FARO INSIGHT */}
            <div style={{ margin: '4rem 0', background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)', padding: isMobile ? '2rem' : '3rem', borderRadius: '2.5rem', border: '1px solid rgba(56,189,248,0.3)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2rem' }}>
                    <Brain size={32} color="#38bdf8" />
                    <div>
                      <h4 style={{ color: 'white', margin: 0, fontSize: '1.2rem', fontWeight: '900' }}>DATA CENTINEL FARO</h4>
                      <span style={{ color: '#38bdf8', fontSize: '0.7rem', fontWeight: 'bold' }}>VLS INTELLIGENCE</span>
                    </div>
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    Nuestra IA procesó 12.000 interacciones. El 89% de los jóvenes reporta frustración por la desconexión pedagógica institucional.
                  </p>
            </div>

            {/* Comment Section Integration */}
            <CommentSection themeColor="#ef4444" reportTitle="La Paradoja 2026" />

          </div>

          {/* Sidebar */}
          {!isMobile && (
            <aside style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
              <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '24px', marginBottom: '2rem' }}>
                <h4 style={{ fontWeight: '900', fontSize: '1.2rem', marginBottom: '1.5rem' }}>TEMAS RELACIONADOS</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <li><p style={{ margin: 0, fontWeight: 'bold', fontSize: '0.95rem' }}>Soberanía Digital: El modelo VLS que todos miran.</p></li>
                  <li><p style={{ margin: 0, fontWeight: 'bold', fontSize: '0.95rem' }}>Los vacíos legales de la prohibición de pantallas.</p></li>
                </ul>
              </div>
            </aside>
          )}

        </article>

        {/* Footer Content */}
        <footer style={{ background: '#000', color: 'white', padding: isMobile ? '3rem 1.5rem' : '4rem 6rem' }}>
           <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', gap: '2rem' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '900' }}>VLS Investigative Unit</h2>
                <p style={{ color: '#4b5563', fontSize: '0.8rem' }}>Periodismo libre para una comuna soberana.</p>
              </div>
              <div style={{ color: '#4b5563', fontSize: '0.7rem' }}>© 2026 VECINOS LA SERENA INTELLIGENCE.</div>
           </div>
        </footer>

      </div>

      <style>{`
        .icon-btn-news { background: white; border: 1px solid #e5e7eb; color: #6b7280; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; display: flex; alignItems: center; justifyContent: center; transition: all 0.2s; }
        @keyframes bounce { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-10px); } 60% { transform: translateY(-5px); } }
      `}</style>
    </div>,
    document.body
  ) : null;
}
