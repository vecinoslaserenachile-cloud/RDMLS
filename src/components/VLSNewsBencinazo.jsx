import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Share2, Printer, Bookmark, MessageSquare, Twitter, Facebook, Linkedin, ArrowDown, Cpu, Microscope, Globe, AlertTriangle, BookOpen, Quote, Target, Brain, Shield, Layers, Zap, TrendingUp, AlertCircle, Fuel, Coins, BarChart3, Info, Wallet, Search, Users } from 'lucide-react';
import CommentSection from './CommentSection';

export default function VLSNewsBencinazo({ onClose }) {
  const [activePoll, setActivePoll] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    console.log("VLSNewsBencinazo Portal Mounted OK");
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    
    let lastProgress = 0;
    const handleScroll = () => {
      const el = document.getElementById('bencinazo-scroll-container');
      if (el) {
        const progress = Math.round((el.scrollTop / (el.scrollHeight - el.offsetHeight)) * 100);
        if (Math.abs(progress - lastProgress) >= 1) {
            lastProgress = progress;
            setScrollProgress(progress);
        }
      }
    };
    const el = document.getElementById('bencinazo-scroll-container');
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
        background: '#fbbf24',
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
          <div style={{ background: '#fbbf24', color: '#000', padding: '0.4rem 0.8rem', fontWeight: '900', fontSize: isMobile ? '1rem' : '1.2rem', letterSpacing: '-1px', borderRadius: '4px' }}>VLS</div>
          <span style={{ fontWeight: 'bold', fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1px', display: isMobile ? 'none' : 'block' }}>ESPECIAL: LA SERENA EN ALERTA</span>
        </div>
        
        <div style={{ display: 'flex', gap: isMobile ? '0.5rem' : '1.5rem', alignItems: 'center' }}>
          <button 
            onClick={() => {
               const shareUrl = `${window.location.origin}${window.location.pathname}?news=bencinazo`;
               window.open(`https://wa.me/?text=${encodeURIComponent('Hemeroteca VLS: Espejismo Americano. Lee aquí: ' + shareUrl)}`, '_blank')
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
      <div id="bencinazo-scroll-container" style={{ flex: 1, overflowY: 'auto', scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}>
        
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
              alt="Bencinazo Quiroz"
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
                <span style={{ background: '#fbbf24', color: '#000', padding: '4px 12px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '900', letterSpacing: '2px' }}>INVESTIGACIÓN ESPECIAL</span>
                <span style={{ fontSize: '0.8rem', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16}/> 18 min lectura</span>
            </div>
            <h1 style={{ 
              fontSize: 'clamp(2.2rem, 10vw, 5rem)', 
              fontWeight: '900', 
              lineHeight: '1', 
              letterSpacing: '-0.03em',
              marginBottom: '2rem',
              fontFamily: "'Outfit', sans-serif"
            }}>
              El Espejismo Americano <span style={{ color: '#fbbf24' }}>de Quiroz:</span> ¿Bencina de Primer Mundo con sueldos de Tercero?
            </h1>
            <p style={{ fontSize: isMobile ? '1.2rem' : '1.5rem', color: '#d1d5db', maxWidth: '800px', lineHeight: '1.4', fontWeight: '300', fontStyle: 'italic', borderLeft: '4px solid #fbbf24', paddingLeft: '1.5rem' }}>
              "Analizamos el trasfondo de una medida que promete sanar el cáncer, pero amenaza con quebrar la economía del hogar chileno."
            </p>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(45deg, #fbbf24, #000)', padding: '2px' }}>
                    <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontWeight: '900', fontSize: '0.8rem', color: '#fbbf24' }}>VLS</span>
                    </div>
                </div>
                <div>
                   <p style={{ margin: 0, fontWeight: 'bold', fontSize: '0.9rem' }}>Equipo Vecinos La Serena</p>
                   <p style={{ margin: 0, fontSize: '0.7rem', color: '#fbbf24', fontWeight: 'bold' }}>24 DE MARZO, 2026</p>
                </div>
            </div>
          </motion.div>
        </section>

        {/* DATA COMPARISON MODULE */}
        <div style={{ background: '#000', padding: isMobile ? '3rem 1.5rem' : '5rem 2rem' }}>
           <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <h3 style={{ borderLeft: '8px solid #fbbf24', paddingLeft: '1.5rem', color: 'white', fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: '900', marginBottom: '3rem' }}>
                 ¿PAGAMOS LO MISMO QUE EN EE.UU? <span style={{ color: '#fbbf24' }}>LA TRAMPA DE LOS DATOS</span>
              </h3>
              
              <div style={{ overflowX: 'auto' }}>
                 <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px', color: 'white' }}>
                    <thead>
                       <tr style={{ background: '#111', color: '#fbbf24', fontSize: '0.7rem', fontWeight: '900', textTransform: 'uppercase' }}>
                          <th style={{ padding: '15px', textAlign: 'left' }}>CONCEPTO</th>
                          <th style={{ padding: '15px', textAlign: 'center' }}>EE.UU.</th>
                          <th style={{ padding: '15px', textAlign: 'center', color: 'white', border: '1px solid #fbbf24' }}>CHILE</th>
                       </tr>
                    </thead>
                    <tbody>
                       {[
                          { label: 'Sueldo Mínimo', us: 'US$ 1.500', cl: 'US$ 550' },
                          { label: 'Impuesto Galón', us: 'US$ 0.18', cl: 'US$ 1.30' },
                          { label: 'Efecto Bolsillo', us: '1.2%', cl: '4.8%' }
                       ].map((row, idx) => (
                          <tr key={idx} style={{ background: 'rgba(255,255,255,0.05)' }}>
                             <td style={{ padding: '15px', fontSize: '0.9rem' }}>{row.label}</td>
                             <td style={{ padding: '15px', textAlign: 'center', color: '#94a3b8' }}>{row.us}</td>
                             <td style={{ padding: '15px', textAlign: 'center', fontWeight: '900', color: '#fbbf24' }}>{row.cl}</td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>

        {/* Article Body */}
        <article style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            padding: isMobile ? '3rem 1.5rem' : '5rem 2rem', 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1fr) 350px', 
            gap: isMobile ? '3rem' : '5rem' 
        }}>
          
          <div style={{ position: 'relative', zIndex: 1, fontSize: isMobile ? '1.1rem' : '1.2rem', lineHeight: '1.8', color: '#111827' }}>
            
            <section style={{ marginBottom: '4rem' }}>
               <h2 style={{ fontSize: isMobile ? '1.8rem' : '2.5rem', fontWeight: '900', marginBottom: '2rem' }}>Capítulo I: La "Frase de la Discordia"</h2>
               <p style={{ marginBottom: '2rem' }}>
                  El ministro de Hacienda, Jorge Quiroz, no solo anunció el fin de los subsidios; lanzó un dardo directo a la lógica del consumidor chileno.
               </p>
               
               <div style={{ background: '#0a0a0a', padding: isMobile ? '2rem' : '3rem', borderRadius: '24px', margin: '3rem 0' }}>
                  <Quote size={40} color="#fbbf24" style={{ marginBottom: '1rem', opacity: 0.5 }} />
                  <p style={{ color: '#fff', fontSize: isMobile ? '1.4rem' : '1.8rem', fontWeight: '900', fontStyle: 'italic', lineHeight: '1.3', borderLeft: '6px solid #fbbf24', paddingLeft: '1.5rem' }}>
                     "No podemos gastarnos en una semana lo que cuesta resolver las listas de espera oncológicas solo para que el chileno pague la bencina a un precio más bajo que el que paga un ciudadano norteamericano".
                  </p>
                  <p style={{ color: '#fbbf24', fontWeight: 'bold', marginTop: '1.5rem', textAlign: 'right', fontSize: '0.9rem' }}>— Jorge Quiroz (Marzo 2026)</p>
               </div>
            </section>

            <section style={{ marginBottom: '4rem', background: '#f0f9ff', padding: isMobile ? '2rem' : '3rem', borderRadius: '32px' }}>
               <h2 style={{ fontSize: isMobile ? '1.8rem' : '2.2rem', fontWeight: '900', color: '#0c4a6e', marginBottom: '1.5rem' }}>Capítulo II: El Espejismo de la Paridad</h2>
               <p style={{ color: '#1e293b' }}>
                  Comparar el precio de la bencina en Chile con el de Estados Unidos sin ajustar por ingresos es la definición clásica de un <strong>espejismo económico</strong>.
               </p>
               
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.5rem', marginTop: '2.5rem' }}>
                  <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '20px', border: '1px solid #0ea5e9', textAlign: 'center' }}>
                     <div style={{ color: '#0284c7', fontWeight: '900', fontSize: '1.5rem' }}>US$&thinsp;3,85</div>
                     <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>Chile</p>
                  </div>
                  <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '20px', border: '1px solid #0ea5e9', textAlign: 'center' }}>
                     <div style={{ color: '#0284c7', fontWeight: '900', fontSize: '1.5rem' }}>US$&thinsp;0,95</div>
                     <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>EE.UU.</p>
                  </div>
                  <div style={{ background: '#000', padding: '1.5rem', borderRadius: '20px', border: '1px solid #fbbf24', textAlign: 'center', color: '#fff' }}>
                     <div style={{ color: '#fbbf24', fontWeight: '900', fontSize: '1.5rem' }}>4&times;</div>
                     <p style={{ margin: 0, fontSize: '0.8rem' }}>Impactivo Relativo</p>
                  </div>
               </div>
            </section>

            {/* Regional Impact */}
            <section style={{ marginBottom: '4rem', padding: isMobile ? '2rem' : '3rem', background: '#f8fafc', borderRadius: '32px' }}>
               <h2 style={{ fontSize: isMobile ? '1.8rem' : '2.2rem', fontWeight: '900', marginBottom: '1.5rem' }}>Capítulo V: El Grito Regional</h2>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '24px', borderLeft: '6px solid #ef4444' }}>
                     <h4 style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '10px' }}>PESCA ARTESANAL</h4>
                     <p style={{ margin: 0, fontStyle: 'italic', fontSize: '1rem' }}>"Es una tragedia para el mundo de la pesca artesanal. Los costos ya no dan."</p>
                  </div>
                  <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '24px', borderLeft: '6px solid #3b82f6' }}>
                     <h4 style={{ color: '#3b82f6', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '10px' }}>AGUA RURAL</h4>
                     <p style={{ margin: 0, fontSize: '1rem' }}>Los camiones aljibe dependen del petróleo para llevar vida a los cerros.</p>
                  </div>
               </div>
            </section>

            {/* Action Bar */}
            <div style={{ background: '#000', padding: '3rem', borderRadius: '32px', color: 'white', textAlign: 'center' }}>
               <Zap size={40} color="#fbbf24" style={{ margin: '0 auto 1.5rem auto' }} />
               <h4 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '1rem' }}>¿Qué piensas tú?</h4>
               <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>¿Es el orden fiscal más importante que el costo de la vida?</p>
               <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button style={{ padding: '0.8rem 1.5rem', borderRadius: '12px', background: '#fbbf24', color: '#000', fontWeight: 'bold', border: 'none' }}>ORDEN FISCAL</button>
                  <button style={{ padding: '0.8rem 1.5rem', borderRadius: '12px', background: 'transparent', color: '#fff', border: '2px solid #fff', fontWeight: 'bold' }}>COSTO DE VIDA</button>
               </div>
            </div>

            <CommentSection themeColor="#fbbf24" reportTitle="Espejismo Americano" />

          </div>

          {/* Sidebar */}
          {!isMobile && (
            <aside style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
              <div style={{ background: '#000', color: 'white', padding: '2rem', borderRadius: '24px', marginBottom: '2rem' }}>
                 <Brain size={32} color="#fbbf24" style={{ marginBottom: '1.5rem' }} />
                 <h4 style={{ fontWeight: '900', color: '#fbbf24', marginBottom: '1rem' }}>VLS INTELLIGENCE</h4>
                 <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                   "El Centinel Faro ha detectado un aumento del 400% en el tráfico de palabras clave críticas en la región."
                 </p>
              </div>
              <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
                 <h4 style={{ fontWeight: '900', fontSize: '1.1rem', marginBottom: '1.5rem' }}>EJE DEL REPORTE</h4>
                 <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <li><p style={{ margin: 0, fontWeight: 'bold', fontSize: '0.9rem' }}>Sueldos vs Surtidor: La brecha real.</p></li>
                    <li><p style={{ margin: 0, fontWeight: 'bold', fontSize: '0.9rem' }}>Impuesto Específico 1986: La mochila eterna.</p></li>
                 </ul>
              </div>
            </aside>
          )}

        </article>

        {/* Footer */}
        <footer style={{ background: '#000', color: 'white', padding: isMobile ? '3rem 1.5rem' : '4rem 6rem' }}>
           <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', gap: '2rem' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#fbbf24' }}>VLS Research</h2>
                <p style={{ color: '#4b5563', fontSize: '0.8rem' }}>Soberanía Informativa para la Comuna Smart.</p>
              </div>
              <div style={{ color: '#4b5563', fontSize: '0.7rem' }}>© 2026 UNIDAD DE INVESTIGACIÓN FARO - VLS.</div>
           </div>
        </footer>

      </div>

      <style>{`
        .icon-btn-news { background: white; border: 1px solid #e5e7eb; color: #6b7280; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
        @keyframes bounce { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-10px); } 60% { transform: translateY(-5px); } }
      `}</style>
    </div>,
    document.body
  ) : null;
}
