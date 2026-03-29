import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Share2, Printer, Bookmark, MessageSquare, Twitter, Facebook, Linkedin, ArrowDown, Cpu, Microscope, Globe, AlertTriangle, BookOpen, Quote, Target, Brain, Shield, Layers, Zap, TrendingUp, AlertCircle, Eye, Radar, Video, LineChart, ShieldCheck } from 'lucide-react';
import CommentSection from './CommentSection';

export default function VLSNewsSentinel({ onClose }) {
  const [activePoll, setActivePoll] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    console.log("VLSNewsSentinel Portal Mounted OK");
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    
    let lastProgress = 0;
    const handleScroll = () => {
      const el = document.getElementById('sentinel-scroll-container');
      if (el) {
        const progress = Math.round((el.scrollTop / (el.scrollHeight - el.offsetHeight)) * 100);
        if (Math.abs(progress - lastProgress) >= 1) {
            lastProgress = progress;
            setScrollProgress(progress);
        }
      }
    };
    const el = document.getElementById('sentinel-scroll-container');
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
      fontFamily: "'Outfit', 'Inter', system-ui, sans-serif"
    }}>
      {/* Progress Bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${scrollProgress}%`,
        height: '6px',
        background: '#38bdf8',
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
          <div style={{ background: '#38bdf8', color: '#000', padding: '0.4rem 0.8rem', fontWeight: '900', fontSize: isMobile ? '1rem' : '1.2rem', letterSpacing: '-1px' }}>VLS</div>
          {!isMobile && <span style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1px' }}>INTELIGENCIA PREDICTIVA</span>}
        </div>
        
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <button 
            onClick={() => {
               const shareUrl = `${window.location.origin}${window.location.pathname}?news=sentinel`;
               window.open(`https://wa.me/?text=${encodeURIComponent('Hemeroteca VLS: Centinel Faro 2026. Lee aquí: ' + shareUrl)}`, '_blank')
            }}
            style={{ background: '#25D366', color: 'white', border: 'none', padding: '0.4rem', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            title="Compartir en WhatsApp"
          >
            <Share2 size={16} />
          </button>
          <button onClick={onClose} style={{ background: '#000', border: 'none', color: 'white', padding: isMobile ? '0.5rem 1rem' : '0.6rem 1.4rem', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isMobile ? 'X' : 'SALIR'} <X size={isMobile ? 18 : 20} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div id="sentinel-scroll-container" style={{ flex: 1, overflowY: 'auto', scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}>
        
        {/* Hero Section */}
        <section style={{ 
          minHeight: '80vh', 
          position: 'relative', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'flex-end',
          padding: isMobile ? '2.5rem 1.5rem' : '4rem 6rem',
          background: '#020617',
          color: 'white'
        }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
             <img 
               src="/vls_chile_map.jpg" 
               style={{ width: '100%', height: '100%', objectFit: 'cover' }}
               alt="Centinel Faro 2026"
             />
             <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #020617 10%, transparent 70%)' }} />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative', zIndex: 10, maxWidth: '1000px' }}
          >
            <div style={{ display: 'inline-flex', gap: '1rem', background: 'rgba(56,189,248,0.1)', padding: '10px 25px', borderRadius: '50px', border: '1px solid rgba(56,189,248,0.3)', marginBottom: '2rem' }}>
                <Radar className="animate-pulse" color="#38bdf8" size={24} />
                <span style={{ color: '#38bdf8', fontWeight: '900', letterSpacing: '2px', fontSize: '0.8rem' }}>SMART LISTENING : CENTINEL FARO</span>
            </div>
            
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 8vw, 5rem)', 
              fontWeight: '900', 
              lineHeight: '1', 
              letterSpacing: '-2px',
              marginBottom: '2rem',
              fontFamily: "'Outfit', sans-serif"
            }}>
              Centinel Faro: <span style={{ color: '#38bdf8' }}>El Ojo de la Comuna</span> con Inteligencia Social
            </h1>
            
            <p style={{ fontSize: isMobile ? '1.2rem' : '1.5rem', color: '#94a3b8', maxWidth: '800px', lineHeight: '1.4', fontWeight: '300' }}>
              En 2026, La Serena se convierte en la primera ciudad de Chile en predecir crisis sociales y ambientales mediante modelos de IA soberanos.
            </p>
          </motion.div>
        </section>

        {/* Investigative Body */}
        <article style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            padding: isMobile ? '3rem 1.5rem' : '5rem 2rem', 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1fr) 350px', 
            gap: isMobile ? '4rem' : '6rem' 
        }}>
          
          <div style={{ position: 'relative', zIndex: 1, fontSize: isMobile ? '1.1rem' : '1.2rem', lineHeight: '1.8', color: '#111827' }}>
            <section style={{ marginBottom: '4rem' }}>
                <h2 style={{ fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: '900', color: '#000', marginBottom: '2rem' }}>Capítulo I: Social Listening</h2>
                <p style={{ marginBottom: '2rem' }}>
                   Centinel Faro no espera que el vecino llame al municipio; el sistema ya sabe qué está pasando.
                </p>
                <div style={{ background: '#f8fafc', padding: isMobile ? '2rem' : '2.5rem', borderRadius: '24px', border: '1px solid #e2e8f0', marginBottom: '3rem' }}>
                    <h5 style={{ fontWeight: '900', fontSize: '1.2rem', marginBottom: '1.5rem' }}>METROLOGÍA URBANA (DATO REAL)</h5>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
                        <div style={{ background: 'white', padding: '1.2rem', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                            <p style={{ color: '#64748b', fontSize: '0.7rem', fontWeight: 'bold' }}>SENTIMIENTO POSITIVO</p>
                            <p style={{ fontSize: '1.8rem', fontWeight: '900', color: '#10b981' }}>72%</p>
                        </div>
                    </div>
                </div>
            </section>

            <CommentSection themeColor="#38bdf8" reportTitle="Centinel Faro 2026" />
          </div>

          {!isMobile && (
            <aside style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
              <div style={{ background: '#020617', color: 'white', padding: '2rem', borderRadius: '24px', marginBottom: '2rem' }}>
                 <Brain size={32} color="#38bdf8" style={{ marginBottom: '1.5rem' }} />
                 <h4 style={{ fontWeight: '900', color: '#38bdf8', marginBottom: '1rem' }}>IA SOBERANA</h4>
                 <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>Protocolo de Inteligencia Symmetrica 2026.</p>
              </div>
            </aside>
          )}

        </article>

        <footer style={{ background: '#020617', color: 'white', padding: isMobile ? '3rem 1.5rem' : '4rem 6rem', textAlign: 'center' }}>
           <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#38bdf8' }}>VLS Intelligence Hub</h2>
           <p style={{ color: '#4b5563', fontSize: '0.8rem' }}>Protocolo de Inteligencia Symmetrica 2026</p>
        </footer>
      </div>
    </div>,
    document.body
  ) : null;
}
