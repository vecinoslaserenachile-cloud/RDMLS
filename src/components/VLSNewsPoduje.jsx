import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Share2, Twitter, Facebook, MessageSquare, ArrowDown, Home, Landmark, Calculator, AlertTriangle, Newspaper, TrendingDown, Building, HardHat, FileText, Brain, Scale, Layers, Quote, ArrowRight } from 'lucide-react';
import CommentSection from './CommentSection';

export default function VLSNewsPoduje({ onClose }) {
  const [activePoll, setActivePoll] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    console.log("VLSNewsPoduje Portal Mounted OK");
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    
    let lastProgress = 0;
    const handleScroll = () => {
      const el = document.getElementById('poduje-scroll-container');
      if (el) {
        const progress = Math.round((el.scrollTop / (el.scrollHeight - el.offsetHeight)) * 100);
        if (Math.abs(progress - lastProgress) >= 1) {
            lastProgress = progress;
            setScrollProgress(progress);
        }
      }
    };
    const el = document.getElementById('poduje-scroll-container');
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
      color: '#000',
      fontFamily: "'Outfit', 'Inter', system-ui, sans-serif"
    }}>
      {/* Progress Bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${scrollProgress}%`,
        height: '6px',
        background: '#8b5cf6',
        zIndex: 1000,
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
        zIndex: 500
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '0.5rem' : '1rem' }}>
          <div style={{ background: '#8b5cf6', color: 'white', padding: '0.4rem 0.8rem', fontWeight: '900', fontSize: isMobile ? '1rem' : '1.2rem', letterSpacing: '-1px', borderRadius: '4px' }}>VLS</div>
          <span style={{ fontWeight: 'bold', fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1px', display: isMobile ? 'none' : 'block' }}>ESPECIAL: VIVIENDA Y TERRITORIO</span>
        </div>
        
        <div style={{ display: 'flex', gap: isMobile ? '0.5rem' : '1.5rem', alignItems: 'center' }}>
          <button 
            onClick={() => {
               const shareUrl = `${window.location.origin}/poduje`;
               window.open(`https://wa.me/?text=${encodeURIComponent('Hemeroteca VLS: El Dilema de la Vivienda. Lee aquí: ' + shareUrl)}`, '_blank')
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
              <button className="icon-btn-news"><MessageSquare size={18} /></button>
            </div>
          )}
          <button onClick={onClose} style={{ background: '#000', border: 'none', color: 'white', padding: isMobile ? '0.5rem 1rem' : '0.6rem 1.4rem', borderRadius: '50px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isMobile ? 'X' : 'CERRAR'} <X size={isMobile ? 18 : 20} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div id="poduje-scroll-container" style={{ flex: 1, overflowY: 'auto', scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}>
        
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
          <div style={{ position: 'absolute', inset: 0, opacity: 0.5 }}>
            <img 
              src="/vls_chile_map.jpg" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'hue-rotate(240deg) contrast(1.2)' }}
              alt="Dilema Vivienda"
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
                <span style={{ background: '#8b5cf6', color: 'white', padding: '4px 12px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '900', letterSpacing: '3px' }}>CRISIS INMOBILIARIA</span>
                <span style={{ fontSize: '0.8rem', color: '#a78bfa', display: 'flex', alignItems: 'center', gap: '8px' }}><Clock size={16}/> 15 min de análisis</span>
            </div>
            
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 8vw, 5rem)', 
              fontWeight: '900', 
              lineHeight: '1', 
              letterSpacing: '-0.04em',
              marginBottom: '2rem',
              fontFamily: "'Outfit', sans-serif"
            }}>
              El Dilema de la Vivienda: <span style={{ color: '#8b5cf6' }}>¿Por qué nadie compra</span> casas hoy?
            </h1>
            
            <p style={{ fontSize: isMobile ? '1.2rem' : '1.5rem', color: '#d1d5db', maxWidth: '850px', lineHeight: '1.4', fontWeight: '300' }}>
              El anuncio de eliminar el IVA a la vivienda ha congelado las ventas a nivel nacional. Mientras los compradores esperan un ahorro del 19%, las obras se detienen.
            </p>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2.5rem' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontWeight: '900', fontSize: '0.8rem', color: 'white' }}>VLS</span>
                </div>
                <div>
                   <p style={{ margin: 0, fontWeight: 'bold' }}>Equipo de Investigación Vecinos La Serena</p>
                   <p style={{ margin: 0, fontSize: '0.7rem', color: '#a78bfa' }}>24 DE MARZO, 2026</p>
                </div>
            </div>
          </motion.div>
        </section>

        {/* Article Body */}
        <article style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            padding: isMobile ? '3rem 1.5rem' : '5rem 2rem', 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1fr) 350px', 
            gap: isMobile ? '4rem' : '6rem' 
        }}>
          
          <div style={{ position: 'relative', zIndex: 1, fontSize: isMobile ? '1.2rem' : '1.3rem', lineHeight: '1.8', color: '#111827' }}>
            
            <section style={{ marginBottom: '4rem' }}>
                <h2 style={{ fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: '900', color: '#000', marginBottom: '2rem' }}>Capítulo I: La Promesa del "Ahorro"</h2>
                <p style={{ marginBottom: '1.5rem' }}>
                  El debate sobre la reactivación del sector inmobiliario se ha convertido en un laberinto sin salida aparente: <strong>la eliminación del IVA a la vivienda</strong>.
                </p>
            </section>

            <section style={{ marginBottom: '4rem', background: '#f5f3ff', padding: isMobile ? '2rem' : '3rem', borderRadius: '32px', borderLeft: '8px solid #8b5cf6' }}>
               <Quote size={40} color="#8b5cf6" style={{ marginBottom: '1rem', opacity: 0.5 }} />
               <h2 style={{ fontSize: isMobile ? '1.8rem' : '2rem', fontWeight: '900', color: '#4c1d95', marginBottom: '1.5rem' }}>Capítulo II: La Parálisis por Expectativa</h2>
               <p style={{ marginBottom: '1.5rem' }}>
                Si una familia espera ahorrar un 19% en el futuro, la decisión lógica es <strong>no comprar hoy</strong>.
               </p>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: isMobile ? '1rem' : '2rem', marginTop: '2rem' }}>
                  <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '20px', border: '1px solid #e11d48' }}>
                     <div style={{ color: '#e11d48', fontWeight: '900', fontSize: '1.5rem' }}>- 40%</div>
                     <p style={{ margin: 0, fontSize: '0.8rem' }}>Caída en promesas</p>
                  </div>
                  <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '20px', border: '1px solid #10b981' }}>
                     <div style={{ color: '#10b981', fontWeight: '900', fontSize: '1.5rem' }}>+ 19%</div>
                     <p style={{ margin: 0, fontSize: '0.8rem' }}>Ahorro ansiado</p>
                  </div>
               </div>
            </section>

            {/* Commentary and Stats Grid */}
            <div style={{ background: '#0f172a', padding: isMobile ? '2rem' : '3.5rem', borderRadius: '3rem', color: 'white', margin: '4rem 0' }}>
                <h4 style={{ color: '#8b5cf6', fontWeight: '900', fontSize: '1.2rem', marginBottom: '2rem' }}>Sueldo vs. Metro Cuadrado</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span style={{ fontSize: '0.7rem' }}>Capacidad de Pago Familiar</span>
                            <span style={{ fontSize: '0.7rem', color: '#fb7185', fontWeight: 'bold' }}>- 28%</span>
                        </div>
                    </div>
                </div>
            </div>

            <CommentSection themeColor="#8b5cf6" reportTitle="El Dilema de la Vivienda" />
          </div>

          {!isMobile && (
            <aside style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
              <div style={{ background: '#f8fafc', padding: '2.5rem', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
                 <Brain size={32} color="#8b5cf6" style={{ marginBottom: '1.5rem' }} />
                 <h4 style={{ fontWeight: '900', marginBottom: '1rem' }}>VLS INTELLIGENCE</h4>
                 <p style={{ fontSize: '0.9rem' }}>Análisis sobre la parálisis del mercado inmobiliario regional.</p>
              </div>
            </aside>
          )}

        </article>

        <footer style={{ background: '#000', color: 'white', padding: isMobile ? '3rem 1.5rem' : '4rem 6rem', textAlign: 'center' }}>
           <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#8b5cf6' }}>VLS Investigative Unit</h2>
           <p style={{ color: '#4b5563', fontSize: '0.8rem' }}>Información soberana para el sueño de la casa propia.</p>
        </footer>
      </div>

      <style>{`
        .icon-btn-news { background: white; border: 1px solid #e5e7eb; color: #6b7280; width: 42px; height: 42px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
      `}</style>
    </div>,
    document.body
  ) : null;
}
