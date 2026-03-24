import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Share2, Twitter, Facebook, MessageSquare, ArrowDown, Home, Landmark, Calculator, AlertTriangle, Newspaper, TrendingDown, Building, HardHat, FileText, Brain, Scale, Layers } from 'lucide-react';
import CommentSection from './CommentSection';

export default function VLSNewsPoduje({ onClose }) {
  const [activePoll, setActivePoll] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById('poduje-scroll-container');
      if (el) {
        const progress = (el.scrollTop / (el.scrollHeight - el.offsetHeight)) * 100;
        setScrollProgress(progress);
      }
    };
    const el = document.getElementById('poduje-scroll-container');
    if (el) el.addEventListener('scroll', handleScroll);
    return () => el && el.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#ffffff',
      zIndex: 2000003,
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
        padding: '1rem 2rem',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
        zIndex: 500
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: '#8b5cf6', color: 'white', padding: '0.4rem 0.8rem', fontWeight: '900', fontSize: '1.2rem', letterSpacing: '-1px', borderRadius: '4px' }}>VLS</div>
          <span style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1px' }}>ESPECIAL: VIVIENDA Y TERRITORIO</span>
        </div>
        
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="icon-btn-news"><Twitter size={18} /></button>
            <button className="icon-btn-news"><Facebook size={18} /></button>
            <button className="icon-btn-news"><MessageSquare size={18} /></button>
          </div>
          <button onClick={onClose} style={{ background: '#000', border: 'none', color: 'white', padding: '0.6rem 1.4rem', borderRadius: '50px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            CERRAR <X size={20} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div id="poduje-scroll-container" style={{ flex: 1, overflowY: 'auto', scrollBehavior: 'smooth' }}>
        
        {/* Hero Section */}
        <section style={{ 
          minHeight: '80vh', 
          position: 'relative', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          padding: '4rem 6rem',
          background: '#0a0a0a',
          color: 'white',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.5 }}>
            <img 
              src="/vls_chile_map.jpg" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'hue-rotate(240deg) contrast(1.2)' }}
              alt="Dilema Vivienda"
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0a0a0a 20%, transparent 60%)' }} />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{ position: 'relative', zIndex: 10, maxWidth: '1100px' }}
          >
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2.5rem', alignItems: 'center' }}>
                <span style={{ background: '#8b5cf6', color: 'white', padding: '6px 18px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: '900', letterSpacing: '3px' }}>CRISIS INMOBILIARIA</span>
                <span style={{ fontSize: '0.95rem', color: '#a78bfa', display: 'flex', alignItems: 'center', gap: '8px' }}><Clock size={16}/> 15 min de análisis</span>
            </div>
            
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 6vw, 5rem)', 
              fontWeight: '900', 
              lineHeight: '0.95', 
              letterSpacing: '-0.04em',
              marginBottom: '2rem',
              fontFamily: "'Outfit', sans-serif"
            }}>
              El Dilema de la Vivienda: <span style={{ color: '#8b5cf6' }}>¿Por qué nadie compra</span> casas hoy?
            </h1>
            
            <p style={{ fontSize: '1.6rem', color: '#d1d5db', maxWidth: '850px', lineHeight: '1.4', fontWeight: '300', marginBottom: '3rem' }}>
              El anuncio de eliminar el IVA a la vivienda ha congelado las ventas a nivel nacional. Mientras los compradores esperan un ahorro del 19%, las obras se detienen.
            </p>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                   <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontWeight: '900', fontSize: '1rem' }}>VLS</span>
                   </div>
                   <div>
                      <p style={{ margin: 0, fontWeight: 'bold' }}>Equipo de Investigación Vecinos La Serena</p>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#a78bfa' }}>Martes, 24 de marzo de 2026</p>
                   </div>
                </div>
            </div>
          </motion.div>
        </section>

        {/* Article Body */}
        <article style={{ maxWidth: '1280px', margin: '0 auto', padding: '6rem 2rem', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: '6rem' }}>
          
          <div style={{ fontSize: '1.25rem', lineHeight: '1.8', color: '#111827', fontFamily: "'Charter', 'Georgia', serif", position: 'relative', zIndex: 1 }}>
            
            {/* CAP I */}
            <section style={{ marginBottom: '5rem' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#000', marginBottom: '2rem', fontFamily: "'Outfit', sans-serif" }}>Capítulo I: La Promesa de la "Vivienda sin IVA"</h2>
                <p style={{ marginBottom: '1.5rem' }}>
                  El debate actual sobre la reactivación del sector inmobiliario se centra en un punto crítico: retomar el crédito hipotecario para la clase media. La propuesta de eliminar el IVA a la venta de viviendas nuevas busca ser un motor de cambio.
                </p>
            </section>

            {/* CAP II */}
            <section style={{ marginBottom: '5rem', background: '#f5f3ff', padding: '3rem', borderRadius: '32px', borderLeft: '8px solid #8b5cf6' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '900', color: '#4c1d95', marginBottom: '1.5rem' }}>Capítulo II: La Parálisis por Expectativa (El "Wait and See")</h2>
              <p style={{ marginBottom: '1.5rem' }}>
                El impacto en las ventas ha sido inmediato. Las familias prefieren esperar una ley que les ahorre millones, deteniendo el flujo normal del mercado habitacional.
              </p>
            </section>

            {/* Comment Section Integration */}
            <CommentSection themeColor="#8b5cf6" reportTitle="El Dilema de la Vivienda" />
          </div>

          <aside style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
            <div style={{ background: '#f8fafc', padding: '2.5rem', borderRadius: '24px', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
              <h4 style={{ fontWeight: '900', fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}><Layers size={22} /> CLAVES</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <li>
                  <span style={{ fontSize: '0.7rem', color: '#8b5cf6', fontWeight: 'bold' }}>IVA VIVIENDA</span>
                  <p style={{ margin: '4px 0', fontWeight: 'bold', color: '#111827' }}>La promesa del 19% que frenó el mercado.</p>
                </li>
              </ul>
            </div>
          </aside>
        </article>

        <footer style={{ background: '#000', color: 'white', padding: '6rem', textAlign: 'center' }}>
           <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#8b5cf6' }}>VLS Investigative Unit</h2>
           <p style={{ color: '#9ca3af' }}>Información soberana para el sueño de la casa propia.</p>
        </footer>
      </div>

      <style>{`
        .icon-btn-news { background: white; border: 1px solid #e5e7eb; color: #6b7280; width: 42px; height: 42px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
        .icon-btn-news:hover { background: #8b5cf6; color: white; border-color: #8b5cf6; }
      `}</style>
    </div>
  );
}
