import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Share2, Printer, Bookmark, MessageSquare, Twitter, Facebook, Linkedin, ArrowDown, Droplets, Waves, Microscope, Globe, AlertTriangle, BookOpen, Quote, Shield, Info, Activity, Brain } from 'lucide-react';
import CommentSection from './CommentSection';

export default function VLSNewsAguasValle({ onClose }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    console.log("VLSNewsAguasValle Portal Mounted OK");
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    
    let lastProgress = 0;
    const handleScroll = () => {
      const el = document.getElementById('aguas-scroll-container');
      if (el) {
        const progress = Math.round((el.scrollTop / (el.scrollHeight - el.offsetHeight)) * 100);
        if (Math.abs(progress - lastProgress) >= 1) {
            lastProgress = progress;
            setScrollProgress(progress);
        }
      }
    };
    const el = document.getElementById('aguas-scroll-container');
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
        height: '5px',
        background: '#0284c7',
        zIndex: 1000,
        transition: 'width 0.2s'
      }} />

      {/* Sticky Header */}
      <header style={{
        padding: isMobile ? '0.8rem 1rem' : '1rem 2rem',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#ffffff',
        zIndex: 500
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '0.5rem' : '0.8rem' }}>
          <div style={{ background: '#0284c7', color: 'white', padding: '0.3rem 0.6rem', fontWeight: '900', fontSize: isMobile ? '1rem' : '1.1rem', letterSpacing: '-0.5px' }}>VLS</div>
          {!isMobile && <span style={{ fontWeight: 'bold', fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>HEMEROTECA</span>}
        </div>
        
        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
          <button 
            onClick={() => {
               const shareUrl = `${window.location.origin}/media/aguasvalle`;
               window.open(`https://wa.me/?text=${encodeURIComponent('Hemeroteca VLS: Caso Aguas del Valle (Emisario). Lee aquí: ' + shareUrl)}`, '_blank')
            }}
            style={{ background: '#25D366', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            title="Compartir en WhatsApp"
          >
            <Share2 size={18} />
          </button>
          <button onClick={onClose} style={{ background: '#0f172a', border: 'none', color: 'white', padding: isMobile ? '0.5rem 1rem' : '0.6rem 1.4rem', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
            {isMobile ? 'X' : 'CERRAR'} <X size={isMobile ? 18 : 20} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div id="aguas-scroll-container" style={{ flex: 1, overflowY: 'auto', scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}>
        
        {/* Banner Hero */}
        <section style={{ 
          minHeight: '60vh', 
          position: 'relative', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'flex-end',
          padding: isMobile ? '2.5rem 1.5rem' : '4rem 6rem',
          background: '#0a192f',
          color: 'white'
        }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.3 }}>
            <img 
              src="https://images.unsplash.com/photo-1518173946687-a4c8a9b749f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              alt="Agua y Región"
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0a192f 10%, transparent 70%)' }} />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative', zIndex: 10, maxWidth: '1000px' }}
          >
            <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ background: '#0284c7', color: 'white', padding: '6px 16px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: '900', letterSpacing: '2px' }}>CASO: AGUAS DEL VALLE</span>
            </div>
            <h1 style={{ 
              fontSize: 'clamp(2rem, 8vw, 4.5rem)', 
              fontWeight: '900', 
              lineHeight: '1.1', 
              marginBottom: '2rem',
              fontFamily: "'Outfit', sans-serif"
            }}>
              Sanitaria dispuesta a evaluar mantener tratamiento y disposición por <span style={{ color: '#38bdf8' }}>emisario submarino</span>
            </h1>
          </motion.div>
        </section>

        {/* Summary Grid */}
        <div style={{ maxWidth: '1100px', margin: '-3rem auto 3rem auto', padding: '0 1.5rem', position: 'relative', zIndex: 20 }}>
            <div style={{ 
                background: 'white', 
                borderRadius: '24px', 
                padding: '2rem', 
                boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1.5rem',
                border: '1px solid #e2e8f0'
            }}>
                <div style={{ textAlign: 'center', padding: '1rem' }}>
                    <Activity size={28} color="#0284c7" style={{ marginBottom: '10px' }} />
                    <h4 style={{ margin: 0, fontSize: '0.7rem', color: '#64748b' }}>HITO</h4>
                    <p style={{ margin: '5px 0 0 0', fontWeight: '900', fontSize: '1rem' }}>Diciembre 2023</p>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem' }}>
                    <Droplets size={28} color="#0284c7" style={{ marginBottom: '10px' }} />
                    <h4 style={{ margin: 0, fontSize: '0.7rem', color: '#64748b' }}>TECNOLOGÍA</h4>
                    <p style={{ margin: '5px 0 0 0', fontWeight: '900', fontSize: '1rem' }}>Emisario 1987</p>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem' }}>
                    <AlertTriangle size={28} color="#f59e0b" style={{ marginBottom: '10px' }} />
                    <h4 style={{ margin: 0, fontSize: '0.7rem', color: '#64748b' }}>ESTÁNDAR</h4>
                    <p style={{ margin: '5px 0 0 0', fontWeight: '900', fontSize: '1rem' }}>Bajo OCDE</p>
                </div>
            </div>
        </div>

        {/* Content Body */}
        <article style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            padding: isMobile ? '2rem 1.5rem' : '4rem 2rem', 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1fr) 350px', 
            gap: isMobile ? '3rem' : '5rem' 
        }}>
          
          <div style={{ position: 'relative', zIndex: 1, fontSize: isMobile ? '1.1rem' : '1.2rem', lineHeight: '1.8', color: '#111827' }}>
            <div style={{ borderLeft: '5px solid #0284c7', paddingLeft: '2rem', marginBottom: '4rem', marginTop: '3rem' }}>
               <p style={{ fontSize: isMobile ? '1.3rem' : '1.6rem', lineHeight: '1.5', color: '#1e293b', fontStyle: 'italic', fontWeight: '500' }}>
                  "Aguas del Valle, que en 2023 cumplió 20 años operando en la región, enfrenta hoy el desafío de transitar desde una infraestructura de disposición reactiva a una de recuperación circular bajo estándares OCDE."
               </p>
            </div>

            <h2 style={{ fontSize: '2rem', fontWeight: '900', color: '#0f172a', marginBottom: '1.5rem' }}>El Legado del Emisario de 1987</h2>
            <p style={{ marginBottom: '2rem' }}>
              El sistema de saneamiento actual, heredado del antiguo SENDOS, se basa en un emisario submarino que fue punta de lanza tecnológica a finales de los 80. Sin embargo, en el contexto de la megasequía que azota a la Región de Coquimbo en 2026, la idea de "disponer" agua tratada en el mar es vista por expertos como un desperdicio de recursos críticos. 
            </p>

            <p style={{ marginBottom: '2rem' }}>
               Nuestra investigación para la Hemeroteca VLS revela que el emisario de La Serena descarga aguas con tratamiento primario avanzado, un nivel que cumplía la normativa chilena histórica pero que hoy palidece ante los requerimientos de la OCDE para países en estrés hídrico extremo. La soberanía hídrica de la comuna depende de la capacidad de reconvertir estas plantas en biofactorías de recuperación total.
            </p>

            <div style={{ background: '#f1f5f9', padding: isMobile ? '2rem' : '3.5rem', borderRadius: '32px', margin: '4rem 0', border: '1px solid #e2e8f0' }}>
               <Quote size={40} color="#0284c7" style={{ marginBottom: '1.5rem', opacity: 0.3 }} />
               <p style={{ fontSize: isMobile ? '1.3rem' : '1.7rem', lineHeight: '1.4', color: '#0f172a', fontWeight: '900', letterSpacing: '-0.5px' }}>
                  «Las aguas residuales no son un desperdicio, son una reserva estratégica. La OCDE no reconoce sistemas de descarga como soluciones de largo plazo; la meta es la descarga cero al mar para el 2030».
               </p>
               <div style={{ marginTop: '2rem', borderTop: '1px solid #cbd5e1', paddingTop: '1.5rem' }}>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 'bold' }}>— Panel de Expertos VLS Intelligence</p>
               </div>
            </div>

            <h3 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#0f172a', marginBottom: '1.5rem' }}>Hacia el Reuso Soberano</h3>
            <p style={{ marginBottom: '2rem' }}>
               El debate no es solo técnico, es político. ¿A quién pertenece el agua una vez tratada? Mientras la sanitaria evalúa la factibilidad económica de mantener el emisario, los ciudadanos de La Serena exigen que ese recurso sea reinyectado en el riego de áreas verdes o procesos industriales que hoy consumen agua potable. El portal **Smart Citizens** monitoreará en tiempo real la calidad de estas descargas para asegurar la salud de nuestra bahía.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '2rem', margin: '4rem 0' }}>
               <div style={{ background: '#0a192f', color: 'white', padding: '2rem', borderRadius: '24px' }}>
                  <Waves size={32} color="#38bdf8" style={{ marginBottom: '1rem' }} />
                  <h4 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Emisario 1.0</h4>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Disposición oceánica. Dilución natural. Bajo costo operativo pero nula recuperación de recurso.</p>
               </div>
               <div style={{ background: '#f0f9ff', color: '#0369a1', padding: '2rem', borderRadius: '24px', border: '2px solid #0369a1' }}>
                  <Droplets size={32} color="#0369a1" style={{ marginBottom: '1rem' }} />
                  <h4 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Biofactoría 2027</h4>
                  <p style={{ fontSize: '0.85rem', color: '#0c4a6e' }}>Tratamiento terciario. Remoción de nutrientes. Reuso agrícola e industrial. Soberanía Hídrica.</p>
               </div>
            </div>

            <CommentSection themeColor="#0284c7" reportTitle="Hemeroteca: Aguas del Valle 2026" />

          </div>

          {/* Sidebar */}
          {!isMobile && (
            <aside style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
              <div style={{ background: '#0a192f', color: 'white', padding: '2rem', borderRadius: '24px', marginBottom: '2rem' }}>
                 <Brain size={32} color="#38bdf8" style={{ marginBottom: '1.5rem' }} />
                 <h4 style={{ fontWeight: '900', color: '#38bdf8', marginBottom: '1rem' }}>VLS RESEARCH</h4>
                 <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                   Análisis retrospectivo sobre la soberanía hídrica de la Región de Coquimbo.
                 </p>
              </div>
            </aside>
          )}

        </article>

        <footer style={{ background: '#0a192f', color: '#94a3b8', padding: isMobile ? '3rem 1.5rem' : '4rem 6rem', textAlign: 'center' }}>
           <p style={{ fontSize: '0.8rem' }}>VLS Hemeroteca © 2023-2026 - Archivo de Soberanía Hídrica</p>
        </footer>
      </div>
    </div>,
    document.body
  ) : null;
}
