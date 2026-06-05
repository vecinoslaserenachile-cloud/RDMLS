import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { X, Clock, Share2, MessageSquare, Twitter, Facebook, Info, Shield, Users, Megaphone } from 'lucide-react';
import CommentSection from './CommentSection';

export default function VisitaKastReport({ onClose }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    
    let lastProgress = 0;
    const handleScroll = () => {
      const el = document.getElementById('kast-scroll-container');
      if (el) {
        const progress = Math.round((el.scrollTop / (el.scrollHeight - el.offsetHeight)) * 100);
        if (Math.abs(progress - lastProgress) >= 1) {
            lastProgress = progress;
            setScrollProgress(progress);
        }
      }
    };
    const el = document.getElementById('kast-scroll-container');
    if (el) el.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
        el && el.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  return typeof document !== 'undefined' ? createPortal(
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: '#ffffff', zIndex: 2147483647, display: 'flex', flexDirection: 'column',
      color: '#111827', fontFamily: "'Outfit', 'Inter', system-ui, sans-serif"
    }}>
      {/* Progress Bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, width: `${scrollProgress}%`, height: '6px',
        background: '#ef4444', zIndex: 1000, transition: 'width 0.2s'
      }} />

      {/* Sticky Header */}
      <header style={{
        padding: isMobile ? '0.8rem 1rem' : '1rem 2rem', borderBottom: '1px solid #e5e7eb',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff', zIndex: 500
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '0.5rem' : '1rem' }}>
          <div style={{ background: '#ef4444', color: '#fff', padding: '0.4rem 0.8rem', fontWeight: '900', fontSize: isMobile ? '1rem' : '1.2rem', borderRadius: '4px' }}>VLS</div>
          <span style={{ fontWeight: 'bold', fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1px', display: isMobile ? 'none' : 'block' }}>REPORTE NACIONAL: VISITA PRESIDENCIAL</span>
        </div>
        
        <div style={{ display: 'flex', gap: isMobile ? '0.5rem' : '1.5rem', alignItems: 'center' }}>
          <button 
            onClick={() => {
               const shareUrl = `${window.location.origin}/kast`;
               window.open(`https://wa.me/?text=${encodeURIComponent('Hemeroteca VLS: Visita del Presidente Kast. Lee aquí: ' + shareUrl)}`, '_blank')
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
      <div id="kast-scroll-container" style={{ flex: 1, overflowY: 'auto', scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}>
        
        {/* Hero Section */}
        <section style={{ 
          minHeight: '80vh', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          padding: isMobile ? '2.5rem 1.5rem' : '4rem 6rem', background: '#0a0a0a', color: 'white'
        }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.7 }}>
            <img 
              src="/kast_visita.png" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              alt="Presidente Kast en La Serena"
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
                <span style={{ background: '#ef4444', color: '#fff', padding: '4px 12px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '900', letterSpacing: '2px' }}>COBERTURA ESPECIAL</span>
                <span style={{ fontSize: '0.8rem', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16}/> 15 min lectura</span>
            </div>
            <h1 style={{ 
              fontSize: 'clamp(2.2rem, 10vw, 5rem)', fontWeight: '900', lineHeight: '1', letterSpacing: '-0.03em',
              marginBottom: '2rem', fontFamily: "'Outfit', sans-serif"
            }}>
              Cumbre en La Serena: <span style={{ color: '#ef4444' }}>Kast y Alcaldes</span> Definen la Agenda 2026
            </h1>
            <p style={{ fontSize: isMobile ? '1.2rem' : '1.5rem', color: '#d1d5db', maxWidth: '800px', lineHeight: '1.4', fontWeight: '300', fontStyle: 'italic', borderLeft: '4px solid #ef4444', paddingLeft: '1.5rem' }}>
              "Entre manifestaciones masivas en el exterior y tensión política en el interior, el Presidente de la República detalló un nuevo plan de seguridad e infraestructura para la macrozona norte."
            </p>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(45deg, #ef4444, #000)', padding: '2px' }}>
                    <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontWeight: '900', fontSize: '0.8rem', color: '#ef4444' }}>VLS</span>
                    </div>
                </div>
                <div>
                   <p style={{ margin: 0, fontWeight: 'bold', fontSize: '0.9rem' }}>Unidad de Prensa VLS</p>
                   <p style={{ margin: 0, fontSize: '0.7rem', color: '#ef4444', fontWeight: 'bold' }}>5 DE JUNIO, 2026</p>
                </div>
            </div>
          </motion.div>
        </section>

        {/* Article Body */}
        <article style={{ 
            maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '3rem 1.5rem' : '5rem 2rem', 
            display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1fr) 350px', gap: isMobile ? '3rem' : '5rem' 
        }}>
          
          <div style={{ position: 'relative', zIndex: 1, fontSize: isMobile ? '1.1rem' : '1.2rem', lineHeight: '1.8', color: '#111827' }}>
            
            <section style={{ marginBottom: '4rem' }}>
               <h2 style={{ fontSize: isMobile ? '1.8rem' : '2.5rem', fontWeight: '900', marginBottom: '2rem' }}>El Escenario: Tensión en el Coliseo Monumental</h2>
               <p style={{ marginBottom: '2rem' }}>
                  La llegada del Presidente José Antonio Kast a La Serena marcó uno de los hitos políticos más intensos del año. El <strong>Encuentro Nacional de Alcaldes</strong> se convirtió en una caja de resonancia de las demandas ciudadanas, donde la seguridad, el financiamiento municipal y los proyectos de infraestructura se tomaron la agenda.
               </p>
               <p>
                  Afuera del recinto, más de cinco mil personas protagonizaron manifestaciones que mantuvieron a Carabineros en un extenso operativo preventivo. En el interior, los alcaldes esperaban respuestas concretas sobre los presupuestos locales.
               </p>
            </section>

            <section style={{ marginBottom: '4rem', background: '#fff', border: '1px solid #e1e4e8', padding: isMobile ? '2rem' : '3rem', borderRadius: '32px' }}>
               <h2 style={{ fontSize: isMobile ? '1.8rem' : '2.2rem', fontWeight: '900', color: '#000', marginBottom: '1.5rem' }}>Anuncios Presidenciales</h2>
               
               <div style={{ display: 'grid', gap: '1.5rem', marginTop: '2.5rem' }}>
                  <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '20px', borderLeft: '4px solid #ef4444' }}>
                     <h4 style={{ color: '#000', fontWeight: '900', fontSize: '1.2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Shield size={20} color="#ef4444" /> Plan Escudo Norte</h4>
                     <p style={{ margin: 0, fontSize: '1rem', color: '#334155' }}>Aumento de dotación policial en la región de Coquimbo y un fondo especial de $40.000 millones para patrullaje mixto municipal.</p>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '20px', borderLeft: '4px solid #3b82f6' }}>
                     <h4 style={{ color: '#000', fontWeight: '900', fontSize: '1.2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Megaphone size={20} color="#3b82f6" /> Fondo Solidario Municipal</h4>
                     <p style={{ margin: 0, fontSize: '1rem', color: '#334155' }}>Modificación a la ley de rentas regionales para asegurar que el 30% de los impuestos generados queden en la zona.</p>
                  </div>
               </div>
            </section>

            <section style={{ marginBottom: '4rem', background: '#020617', padding: isMobile ? '2rem' : '3.5rem', borderRadius: '32px', color: 'white' }}>
               <h2 style={{ fontSize: isMobile ? '1.8rem' : '2.2rem', fontWeight: '900', color: '#ef4444', marginBottom: '2rem' }}>Comentarios de las Autoridades</h2>
               
               <div style={{ display: 'grid', gap: '2rem' }}>
                  <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', pb: '1.5rem' }}>
                     <h4 style={{ color: '#ef4444', fontWeight: '900', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '0.5rem' }}>ALCALDESA DE LA SERENA</h4>
                     <p style={{ fontStyle: 'italic', fontSize: '1.1rem', lineHeight: '1.5' }}>
                        "Valoramos la presencia del Presidente, pero La Serena no puede esperar más por el nuevo hospital y la ampliación de la Ruta 5. Los fondos de seguridad son un alivio, aunque necesitamos facultades reales para nuestros inspectores."
                     </p>
                  </div>
                  
                  <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', pb: '1.5rem' }}>
                     <h4 style={{ color: '#ef4444', fontWeight: '900', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '0.5rem' }}>ALCALDE DE COQUIMBO</h4>
                     <p style={{ fontStyle: 'italic', fontSize: '1.1rem', lineHeight: '1.5' }}>
                        "El puerto y el barrio industrial requieren una inyección directa. El anuncio del 'Plan Escudo' es positivo, pero la reactivación económica y el empleo local son la verdadera clave de la seguridad."
                     </p>
                  </div>

                  <div>
                     <h4 style={{ color: '#ef4444', fontWeight: '900', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '0.5rem' }}>DIPUTADOS DE LA REGIÓN</h4>
                     <p style={{ fontStyle: 'italic', fontSize: '1.1rem', lineHeight: '1.5' }}>
                        "Los anuncios de hoy deben plasmarse en la ley de presupuesto de inmediato; la ciudadanía se manifestó afuera exigiendo resultados, no solo visitas protocolares."
                     </p>
                  </div>
               </div>
            </section>

            <CommentSection themeColor="#ef4444" reportTitle="Visita Presidencial" />

          </div>

          {/* Sidebar */}
          {!isMobile && (
            <aside style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
              <div style={{ background: '#000', color: 'white', padding: '2rem', borderRadius: '24px', marginBottom: '2rem' }}>
                 <Users size={32} color="#ef4444" style={{ marginBottom: '1.5rem' }} />
                 <h4 style={{ fontWeight: '900', color: '#ef4444', marginBottom: '1rem' }}>EL PULSO DE LA CALLE</h4>
                 <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                   Más de 15 agrupaciones vecinales entregaron un petitorio único al finalizar la ceremonia.
                 </p>
              </div>
              <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
                 <h4 style={{ fontWeight: '900', fontSize: '1.1rem', marginBottom: '1.5rem' }}>EJE DEL ENCUENTRO</h4>
                 <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <li><p style={{ margin: 0, fontWeight: 'bold', fontSize: '0.9rem' }}>Seguridad Nacional y Municipal.</p></li>
                    <li><p style={{ margin: 0, fontWeight: 'bold', fontSize: '0.9rem' }}>Presupuestos Regionales.</p></li>
                    <li><p style={{ margin: 0, fontWeight: 'bold', fontSize: '0.9rem' }}>Obras de Infraestructura 2026.</p></li>
                 </ul>
              </div>
            </aside>
          )}

        </article>

        {/* Footer */}
        <footer style={{ background: '#000', color: 'white', padding: isMobile ? '3rem 1.5rem' : '4rem 6rem' }}>
           <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', gap: '2rem' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#ef4444' }}>VLS Research</h2>
                <p style={{ color: '#4b5563', fontSize: '0.8rem' }}>Soberanía Informativa para la Comuna Smart.</p>
              </div>
              <div style={{ color: '#4b5563', fontSize: '0.7rem' }}>© 2026 UNIDAD DE INVESTIGACIÓN FARO - VLS.</div>
           </div>
        </footer>

      </div>

      <style>{`
        .icon-btn-news { background: white; border: 1px solid #e5e7eb; color: #6b7280; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
      `}</style>
    </div>,
    document.body
  ) : null;
}
