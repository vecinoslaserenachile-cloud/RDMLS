import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Share2, Printer, Bookmark, MessageSquare, Twitter, Facebook, Linkedin, ArrowDown, Cpu, Microscope, Globe, AlertTriangle, BookOpen, Quote, Target, Brain, Shield, Layers, Zap, TrendingUp, AlertCircle, Eye, Radar, Video, LineChart, ShieldCheck } from 'lucide-react';
import CommentSection from './CommentSection';

export default function VLSNewsSentinel({ onClose }) {
  const [activePoll, setActivePoll] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    console.log("VLSNewsSentinel Mounted OK");
    const handleScroll = () => {
      const el = document.getElementById('sentinel-scroll-container');
      if (el) {
        const progress = (el.scrollTop / (el.scrollHeight - el.offsetHeight)) * 100;
        setScrollProgress(progress);
      }
    };
    const el = document.getElementById('sentinel-scroll-container');
    if (el) el.addEventListener('scroll', handleScroll);
    return () => el && el.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#ffffff',
      zIndex: 2000002,
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
          <div style={{ background: '#38bdf8', color: '#000', padding: '0.4rem 0.8rem', fontWeight: '900', fontSize: '1.2rem', letterSpacing: '-1px' }}>VLS</div>
          <span style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1px' }}>INTELIGENCIA PREDICTIVA</span>
        </div>
        
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <button onClick={onClose} style={{ background: '#000', border: 'none', color: 'white', padding: '0.5rem 1.2rem', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            SALIR <X size={18} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div id="sentinel-scroll-container" style={{ flex: 1, overflowY: 'auto', scrollBehavior: 'smooth' }}>
        
        {/* Hero Section */}
        <section style={{ 
          minHeight: '85vh', 
          position: 'relative', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          padding: '4rem 6rem',
          background: '#020617',
          color: 'white'
        }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
             <img 
               src="/vls_chile_map.jpg" 
               style={{ width: '100%', height: '100%', objectFit: 'cover' }}
               alt="Centinel Faro 2026"
             />
             <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 0%, #020617 80%)' }} />
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            style={{ position: 'relative', zIndex: 10, maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}
          >
            <div style={{ display: 'inline-flex', gap: '1rem', background: 'rgba(56,189,248,0.1)', padding: '10px 25px', borderRadius: '50px', border: '1px solid rgba(56,189,248,0.3)', marginBottom: '3rem' }}>
                <Radar className="animate-pulse" color="#38bdf8" size={24} />
                <span style={{ color: '#38bdf8', fontWeight: '900', letterSpacing: '2px', fontSize: '0.9rem' }}>SMART LISTENING : CENTINEL FARO</span>
            </div>
            
            <h1 style={{ 
              fontSize: 'clamp(3rem, 7vw, 6rem)', 
              fontWeight: '900', 
              lineHeight: '0.9', 
              letterSpacing: '-3px',
              marginBottom: '2rem',
              fontFamily: "'Outfit', sans-serif",
              textTransform: 'uppercase'
            }}>
              Centinel Faro: <span style={{ color: '#38bdf8' }}>El Ojo de la Comuna</span> con Inteligencia Social
            </h1>
            
            <p style={{ fontSize: '1.8rem', color: '#94a3b8', maxWidth: '800px', margin: '0 auto 4rem auto', lineHeight: '1.3', fontWeight: '300' }}>
              En 2026, La Serena se convierte en la primera ciudad de Chile en predecir crisis sociales y ambientales mediante modelos de IA soberanos.
            </p>
            
            <button style={{ background: '#38bdf8', color: '#000', padding: '1.2rem 3rem', borderRadius: '15px', fontWeight: '900', fontSize: '1.2rem', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }}>
                EXPLORAR REPORTE DE INTELIGENCIA
            </button>
          </motion.div>
        </section>

        {/* Technical Visualization Grid */}
        <div style={{ background: '#0a0a0a', padding: '6rem 2rem' }}>
           <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {[
                 { icon: Brain, title: 'Redes Neuronales', desc: 'Análisis de sentimiento en tiempo real sobre 50.000 fuentes locales para detectar focos de conflicto o necesidad.', color: '#38bdf8' },
                 { icon: Video, title: 'Monitor Visual', desc: 'Identificación de patrones de tráfico, microbasurales y luminarias apagadas mediante visión computacional soberana.', color: '#34d399' },
                 { icon: ShieldCheck, title: 'Balance Ético', desc: 'Anonimización total de datos mediante capas de privacidad local. El vecino es un dato libre, no un objetivo.', color: '#a78bfa' }
              ].map((item, i) => (
                 <motion.div 
                    key={i} 
                    whileHover={{ y: -10 }}
                    style={{ background: 'rgba(255,255,255,0.03)', padding: '3rem', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.1)' }}
                 >
                    <item.icon size={40} color={item.color} style={{ marginBottom: '1.5rem' }} />
                    <h4 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '900', marginBottom: '1rem' }}>{item.title}</h4>
                    <p style={{ color: '#64748b', lineHeight: '1.6', fontSize: '1.1rem' }}>{item.desc}</p>
                 </motion.div>
              ))}
           </div>
        </div>

        {/* Investigative Body */}
        <article style={{ maxWidth: '1000px', margin: '0 auto', padding: '8rem 2rem' }}>
            
            {/* CAP I */}
            <section style={{ marginBottom: '6rem' }}>
                <h2 style={{ fontSize: '3rem', fontWeight: '900', color: '#000', marginBottom: '2.5rem', fontFamily: "'Outfit', sans-serif" }}>Capítulo I: Social Listening y el Pulso del Barrio</h2>
                <p style={{ fontSize: '1.4rem', lineHeight: '1.8', color: '#1e293b', fontWeight: 500, marginBottom: '2rem' }}>
                   Centinel Faro no espera que el vecino llame al municipio; el sistema ya sabe qué está pasando. Mediante el análisis de <strong>50.000 puntos de metadata diarios</strong> —desde menciones en redes sociales hasta reportes ciudadanos georreferenciados en nuestra App— la IA crea un mapa de calor dinámico. 
                </p>
                <div style={{ background: '#f8fafc', padding: '2.5rem', borderRadius: '32px', border: '1px solid #e2e8f0', marginBottom: '3rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                        <TrendingUp color="#38bdf8" />
                        <h5 style={{ margin: 0, fontWeight: '900', fontSize: '1.2rem' }}>METROLOGÍA URBANA (DATO REAL DE HOY)</h5>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                            <p style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 'bold', margin: 0 }}>SENTIMIENTO POSITIVO</p>
                            <p style={{ fontSize: '2rem', fontWeight: '900', color: '#10b981', margin: 0 }}>72%</p>
                        </div>
                        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                            <p style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 'bold', margin: 0 }}>ALERTAS CLIMÁTICAS</p>
                            <p style={{ fontSize: '2rem', fontWeight: '900', color: '#38bdf8', margin: 0 }}>4</p>
                        </div>
                        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                            <p style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 'bold', margin: 0 }}>CASOS RESUELTOS IA</p>
                            <p style={{ fontSize: '2rem', fontWeight: '900', color: '#8b5cf6', margin: 0 }}>1.240</p>
                        </div>
                    </div>
                </div>
                <img 
                   src="https://images.unsplash.com/photo-1551288049-bbda48658a7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                   alt="Análisis de datos urbanos" 
                   style={{ width: '100%', borderRadius: '24px', margin: '2rem 0', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} 
                />
            </section>

            {/* CAP II */}
            <section style={{ marginBottom: '6rem' }}>
                <h2 style={{ fontSize: '3rem', fontWeight: '900', color: '#000', marginBottom: '2.5rem', fontFamily: "'Outfit', sans-serif" }}>Capítulo II: Inteligencia Visual y Orden Urbano</h2>
                <p style={{ fontSize: '1.4rem', lineHeight: '1.8', color: '#1e293b', fontWeight: 500, marginBottom: '2rem' }}>
                   ¿Por qué esperar a que un bache rompa el amortiguador de un vecino? El módulo visual de Centinel procesa feeds de cámaras municipales con un único objetivo: <strong>mantenimiento preventivo</strong>. Mediante modelos entrenados en La Serena, el sistema identifica grietas en el pavimento, saturación de contenedores de basura y focos de inseguridad vial en tiempo récord.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', margin: '4rem 0' }}>
                    <div style={{ background: '#020617', padding: '3rem', borderRadius: '32px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: '-10%', right: '-10%', opacity: 0.1 }}><Radar size={200} color="#38bdf8" /></div>
                        <h4 style={{ color: '#38bdf8', fontWeight: '900', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Efecto Prevención</h4>
                        <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                           Desde la implementación de la Fase 2, el tiempo de respuesta municipal ante problemas de infraestructura crítica ha bajado de 5 días a solo 12 horas en el sector de El Milagro.
                        </p>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <span style={{ border: '1px solid #38bdf8', padding: '5px 15px', borderRadius: '20px', fontSize: '0.8rem', color: '#38bdf8', fontWeight: 'bold' }}>BACHE CERO</span>
                            <span style={{ border: '1px solid #34d399', padding: '5px 15px', borderRadius: '20px', fontSize: '0.8rem', color: '#34d399', fontWeight: 'bold' }}>LUMEN ACTIVO</span>
                        </div>
                    </div>
                    <img 
                       src="https://images.unsplash.com/photo-1544383335-917366bb9a20?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                       alt="CCTV AI Monitoring" 
                       style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} 
                    />
                </div>
            </section>

            {/* CAP III */}
            <section style={{ marginBottom: '6rem' }}>
                <h2 style={{ fontSize: '3rem', fontWeight: '900', color: '#000', marginBottom: '2.5rem', fontFamily: "'Outfit', sans-serif" }}>Capítulo III: IA Soberana para la Paz Local</h2>
                <p style={{ fontSize: '1.4rem', lineHeight: '1.8', color: '#1e293b', fontWeight: 400, marginBottom: '3rem' }}>
                   A diferencia de los modelos cerrados de las Big Tech, este sistema procesa los datos en servidores municipales locales de La Serena, garantizando que la inteligencia de nuestra comuna se quede en nuestra comuna. 
                </p>
                <div style={{ background: '#f0f9ff', padding: '4rem', borderRadius: '40px', margin: '5rem 0', border: '2px dashed #0ea5e9', textAlign: 'center' }}>
                   <Quote size={40} color="#0ea5e9" style={{ marginBottom: '2rem', margin: '0 auto 2rem auto' }} />
                   <p style={{ fontSize: '2.2rem', fontWeight: '900', color: '#0369a1', lineHeight: '1.2', letterSpacing: '-1px' }}>
                      "La tecnología debe ser un radar de bienestar, no una lupa de control intrusivo."
                   </p>
                </div>
            </section>

            {/* Comment Section Integration */}
            <CommentSection themeColor="#38bdf8" reportTitle="Centinel Faro 2026" />
        </article>

        <footer style={{ background: '#020617', color: 'white', padding: '6rem', textAlign: 'center' }}>
           <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#38bdf8' }}>VLS Intelligence Hub</h2>
           <p style={{ color: '#94a3b8' }}>Protocolo de Inteligencia Symmetrica 2026</p>
        </footer>

      </div>
    </div>
  );
}
