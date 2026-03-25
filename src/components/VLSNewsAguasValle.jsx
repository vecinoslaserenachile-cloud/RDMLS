import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Share2, Printer, Bookmark, MessageSquare, Twitter, Facebook, Linkedin, ArrowDown, Droplets, Waves, Microscope, Globe, AlertTriangle, BookOpen, Quote, Shield, Info, Activity } from 'lucide-react';
import CommentSection from './CommentSection';

export default function VLSNewsAguasValle({ onClose }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById('aguas-scroll-container');
      if (el) {
        const progress = (el.scrollTop / (el.scrollHeight - el.offsetHeight)) * 100;
        setScrollProgress(progress);
      }
    };
    const el = document.getElementById('aguas-scroll-container');
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
        height: '5px',
        background: '#0284c7',
        zIndex: 1000,
        transition: 'width 0.2s'
      }} />

      {/* Sticky Header */}
      <header style={{
        padding: '0.8rem 1rem',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)',
        zIndex: 500
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <div style={{ background: '#0284c7', color: 'white', padding: '0.3rem 0.6rem', fontWeight: '900', fontSize: '1.1rem', letterSpacing: '-0.5px' }}>VLS</div>
          {!window.innerWidth < 640 && <span style={{ fontWeight: 'bold', fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>HEMEROTECA</span>}
        </div>
        
        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
          <button 
            onClick={() => {
               const shareUrl = `${window.location.origin}${window.location.pathname}?news=aguasvalle`;
               window.open(`https://wa.me/?text=${encodeURIComponent('Hemeroteca VLS: Caso Aguas del Valle (Emisario). Lee aquí: ' + shareUrl)}`, '_blank')
            }}
            style={{ background: '#25D366', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            title="Compartir en WhatsApp"
          >
            <Share2 size={18} />
          </button>
          <button onClick={onClose} style={{ background: '#0f172a', border: 'none', color: 'white', padding: '0.5rem 1rem', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
            {window.innerWidth < 640 ? <X size={18} /> : 'CERRAR'}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div id="aguas-scroll-container" className="hide-scrollbar" style={{ flex: 1, overflowY: 'auto', scrollBehavior: 'smooth', background: '#f8fafc' }}>
        
        {/* Banner Hero */}
        <section style={{ 
          minHeight: '70vh', 
          position: 'relative', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem 1.5rem',
          background: '#0a192f',
          color: 'white',
          textAlign: 'center',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.3 }}>
            <img 
              src="https://images.unsplash.com/photo-1518173946687-a4c8a9b749f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              alt="Agua y Región"
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, #0a192f)' }} />
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            style={{ position: 'relative', zIndex: 10, maxWidth: '900px' }}
          >
            <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ background: '#0284c7', color: 'white', padding: '6px 16px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: '900', letterSpacing: '2px' }}>CASO: AGUAS DEL VALLE</span>
            </div>
            <h1 style={{ 
              fontSize: 'clamp(2rem, 6vw, 4.5rem)', 
              fontWeight: '900', 
              lineHeight: '1', 
              marginBottom: '2rem',
              color: 'white',
              fontFamily: "'Outfit', sans-serif"
            }}>
              Sanitaria dispuesta a evaluar mantener tratamiento y disposición por <span style={{ color: '#38bdf8' }}>emisario submarino</span>
            </h1>
          </motion.div>
        </section>

        {/* Summary Grid - Fully Responsive */}
        <div style={{ maxWidth: '1100px', margin: '-4rem auto 3rem auto', padding: '0 1.5rem', position: 'relative', zIndex: 20 }}>
            <div style={{ 
                background: 'white', 
                borderRadius: '30px', 
                padding: '2rem', 
                boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
                border: '1px solid #e2e8f0'
            }}>
                <div style={{ textAlign: 'center', padding: '1rem' }}>
                    <Activity size={28} color="#0284c7" style={{ marginBottom: '10px' }} />
                    <h4 style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>HITO</h4>
                    <p style={{ margin: '5px 0 0 0', fontWeight: '900', fontSize: '1.1rem' }}>Diciembre 2023</p>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', borderRight: window.innerWidth > 640 ? '1px solid #f1f5f9' : 'none', borderLeft: window.innerWidth > 640 ? '1px solid #f1f5f9' : 'none' }}>
                    <Droplets size={28} color="#0284c7" style={{ marginBottom: '10px' }} />
                    <h4 style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>TECNOLOGÍA</h4>
                    <p style={{ margin: '5px 0 0 0', fontWeight: '900', fontSize: '1.1rem' }}>Emisario 1987</p>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem' }}>
                    <AlertTriangle size={28} color="#f59e0b" style={{ marginBottom: '10px' }} />
                    <h4 style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>ESTÁNDAR</h4>
                    <p style={{ margin: '5px 0 0 0', fontWeight: '900', fontSize: '1.1rem' }}>Bajo OCDE</p>
                </div>
            </div>
        </div>

        {/* Content Body */}
        <article style={{ maxWidth: '850px', margin: '0 auto', padding: '0 1.5rem 6rem 1.5rem' }}>
          <div style={{ borderLeft: '5px solid #0284c7', paddingLeft: '1.5rem', marginBottom: '3rem' }}>
            <p style={{ fontSize: '1.3rem', lineHeight: '1.6', color: '#334155', fontWeight: '400', fontStyle: 'italic' }}>
              "Aguas del Valle, que en 2023 cumplió 20 años operando en la región, enfrenta cuestionamientos por el uso de tecnologías de 1987."
            </p>
          </div>

          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
            El sistema de saneamiento implementado originalmente por SENDOS ha cumplido la normativa, pero su efectividad hoy es debatida bajo estándares globales de sustentabilidad hídrica.
          </p>

          <div style={{ background: '#f1f5f9', padding: '2rem', borderRadius: '20px', margin: '3rem 0' }}>
            <Quote size={32} color="#0284c7" style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <p style={{ fontSize: '1.25rem', lineHeight: '1.6', color: '#0f172a', fontWeight: 'bold' }}>
               «Las aguas residuales solo tienen tratamiento primario... la OCDE ya no reconoce estos sistemas de tratamiento propoamente tal».
            </p>
          </div>

          {/* Comment Section Integration */}
          <section style={{ marginTop: '5rem', borderTop: '1px solid #e2e8f0', paddingTop: '3rem' }}>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <MessageSquare size={28} color="#0284c7" /> Opinión Vecinal
            </h3>
            <CommentSection themeColor="#0284c7" reportTitle="Hemeroteca: Aguas del Valle 2023" />
          </section>
        </article>

        <footer style={{ background: '#0a192f', color: '#94a3b8', padding: '4rem 1.5rem', textAlign: 'center' }}>
           <p style={{ fontSize: '0.8rem' }}>VLS Hemeroteca © 2023-2026 - Archivo de Soberanía Hídrica</p>
        </footer>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
