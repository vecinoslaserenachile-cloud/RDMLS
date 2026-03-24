import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Share2, Twitter, Facebook, MessageSquare, ArrowDown, Home, Landmark, Calculator, AlertTriangle, Newspaper, TrendingDown, Building, HardHat, FileText, Brain, Scale, Layers, Quote, ArrowRight } from 'lucide-react';
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
                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#000', marginBottom: '2rem', fontFamily: "'Outfit', sans-serif" }}>Capítulo I: La Promesa del "Ahorro" que Congeló un País</h2>
                <p style={{ marginBottom: '1.5rem', color: '#1e293b', fontWeight: 500 }}>
                  El debate actual sobre la reactivación del sector inmobiliario chileno se ha convertido en un laberinto sin salida aparente, y su epicentro no es un terremoto ni un estallido, sino una promesa legislativa: <strong>la eliminación del IVA a la venta de viviendas nuevas</strong>.
                </p>
                <p style={{ marginBottom: '1.5rem', color: '#1e293b', fontWeight: 500 }}>
                  Con la intención de dar un salvavidas a la golpeada clase media, el proyecto de ley ha generado un efecto colateral brutal y paradójico. En lugar de acelerar el mercado, ha provocado que miles de familias en La Serena, Coquimbo y el resto del país guarden sus carpetas bancarias en el cajón.
                </p>
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Edificios habitacionales" 
                  style={{ width: '100%', borderRadius: '24px', margin: '3rem 0', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} 
                />
            </section>

            {/* CAP II */}
            <section style={{ marginBottom: '5rem', background: '#f5f3ff', padding: '3rem', borderRadius: '32px', borderLeft: '8px solid #8b5cf6' }}>
              <Quote size={40} color="#8b5cf6" style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <h2 style={{ fontSize: '2rem', fontWeight: '900', color: '#4c1d95', marginBottom: '1.5rem' }}>Capítulo II: La Parálisis por Expectativa (El síndrome "Wait and See")</h2>
              <p style={{ marginBottom: '1.5rem', color: '#334155', fontWeight: 500 }}>
                El impacto en las salas de venta ha sido inmediato y demoledor. En términos macroeconómicos, esto se conoce como el efecto <em>"Wait and See"</em> (Esperar y Ver). Si a una familia se le anuncia que, en un futuro cercano, el Estado le podría perdonar hasta un 19% del valor total de una propiedad (lo que en una casa de 3.000 UF equivale a millones de pesos de reducción en el dividendo a 30 años), la decisión lógica y racional es <strong>no comprar hoy</strong>.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '3rem' }}>
                 <div style={{ background: '#fff', padding: '2rem', borderRadius: '20px', border: '1px solid #e11d48' }}>
                    <div style={{ color: '#e11d48', fontWeight: '900', fontSize: '1.5rem', marginBottom: '1rem' }}>- 40%</div>
                    <p style={{ margin: 0, fontSize: '1rem', color: '#1e293b' }}><strong>Caída en promesas de compra</strong> en La Serena durante el último trimestre tras el anuncio de los subsidios.</p>
                 </div>
                 <div style={{ background: '#fff', padding: '2rem', borderRadius: '20px', border: '1px solid #10b981' }}>
                    <div style={{ color: '#10b981', fontWeight: '900', fontSize: '1.5rem', marginBottom: '1rem' }}>+ 19%</div>
                    <p style={{ margin: 0, fontSize: '1rem', color: '#1e293b' }}><strong>Ahorro proyectado</strong> que ansían las familias, deteniendo completamente el flujo de caja del rubro de la construcción.</p>
                 </div>
              </div>
            </section>

            {/* CAP III */}
            <section style={{ marginBottom: '5rem' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#000', marginBottom: '2rem', fontFamily: "'Outfit', sans-serif" }}>Capítulo III: El Verdadero Costo de la "Vivienda Digna"</h2>
              <p style={{ marginBottom: '1.5rem', color: '#1e293b', fontWeight: 500 }}>
                Mientras las autoridades discuten en el Congreso, en la base social el problema crece. Las inmobiliarias, sin ventas, estancan los nuevos proyectos (no hay nuevos "pozos"). Esto destruye miles de puestos de trabajo para maestros de la construcción, topógrafos, subcontratistas y todo un ecosistema económico local.
              </p>
              <img 
                src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Maqueta de construcción" 
                style={{ width: '100%', borderRadius: '24px', margin: '3rem 0', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} 
              />
              <p style={{ marginBottom: '1.5rem', color: '#1e293b', fontWeight: 500 }}>
                A esto debemos sumarle el factor de la tasa de interés hipotecaria, que sigue en niveles altísimos comparados a la bonanza dorada del crédito en 2018-2019, junto con la inflación post-pandemia de los materiales de construcción. Hoy hacer un departamento cuesta casi un 45% más que hace cinco años, y los sueldos en Chile no han crecido en esa proporción.
              </p>
            </section>

            {/* LA PARADOJA FINAL */}
            <div style={{ background: '#000', padding: '4rem', borderRadius: '32px', color: '#fff', marginBottom: '6rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, opacity: 0.1 }}>
                <Landmark size={300} color="#8b5cf6" />
              </div>
              <h3 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#a78bfa', marginBottom: '2rem', position: 'relative', zIndex: 1 }}>La Conclusión Vecinal</h3>
              <p style={{ fontSize: '1.5rem', lineHeight: '1.6', color: '#e2e8f0', fontWeight: '300', margin: 0, position: 'relative', zIndex: 1 }}>
                Hasta que la promesa del IVA no se concrete en ley o se descarte por completo, el mercado no despertará. Y el dolor más grande lo llevan los jóvenes profesionales y familias emergentes, que miran las vitrinas de La Serena preguntándose: <strong>¿Llegará algún día el momento adecuado para tener mi casa propia?</strong>
              </p>
            </div>

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
