import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Share2, Printer, Bookmark, MessageSquare, Twitter, Facebook, Linkedin, ArrowDown, Cpu, Microscope, Globe, AlertTriangle, BookOpen, Quote, Target, Brain, Shield, Layers, Zap, TrendingUp, AlertCircle, Fuel, Coins, BarChart3, Info, Wallet, Search } from 'lucide-react';
import CommentSection from './CommentSection';

export default function VLSNewsBencinazo({ onClose }) {
  const [activePoll, setActivePoll] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    console.log("VLSNewsBencinazo Updated Mounted OK");
    const handleScroll = () => {
      const el = document.getElementById('bencinazo-scroll-container');
      if (el) {
        const progress = (el.scrollTop / (el.scrollHeight - el.offsetHeight)) * 100;
        setScrollProgress(progress);
      }
    };
    const el = document.getElementById('bencinazo-scroll-container');
    if (el) el.addEventListener('scroll', handleScroll);
    return () => el && el.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#ffffff',
      zIndex: 2000001,
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
          <div style={{ background: '#fbbf24', color: '#000', padding: '0.4rem 0.8rem', fontWeight: '900', fontSize: '1.2rem', letterSpacing: '-1px', borderRadius: '4px' }}>VLS</div>
          <span style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1px' }}>ESPECIAL: LA SERENA EN ALERTA</span>
        </div>
        
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="icon-btn-news"><Twitter size={18} /></button>
            <button className="icon-btn-news"><Facebook size={18} /></button>
            <button className="icon-btn-news"><MessageSquare size={18} /></button>
          </div>
          <button onClick={onClose} style={{ background: '#000', border: 'none', color: 'white', padding: '0.6rem 1.4rem', borderRadius: '50px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'transform 0.2s' }} className="hover-scale">
            CERRAR <X size={20} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div id="bencinazo-scroll-container" style={{ flex: 1, overflowY: 'auto', scrollBehavior: 'smooth' }}>
        
        {/* Hero Section */}
        <section style={{ 
          minHeight: '90vh', 
          position: 'relative', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          padding: '4rem 6rem',
          background: '#0a0a0a',
          color: 'white',
          overflow: 'hidden'
        }}>
          {/* Animated Background elements */}
          <div style={{ position: 'absolute', top: '10%', right: '10%', width: '300px', height: '300px', background: '#fbbf2415', borderRadius: '50%', filter: 'blur(80px)', animation: 'pulse 10s infinite' }} />
          <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: '200px', height: '200px', background: '#ef444410', borderRadius: '50%', filter: 'blur(60px)', animation: 'pulse 8s infinite' }} />

          <div style={{ position: 'absolute', inset: 0, opacity: 0.6 }}>
            <img 
              src="/vls_chile_map.jpg" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.4) contrast(1.2)' }}
              alt="Bencinazo Quiroz"
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0a0a0a 20%, transparent 60%), linear-gradient(to right, #0a0a0a 30%, transparent 80%)' }} />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ position: 'relative', zIndex: 10, maxWidth: '1200px' }}
          >
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2.5rem', alignItems: 'center' }}>
                <span style={{ background: '#fbbf24', color: '#000', padding: '6px 18px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: '900', letterSpacing: '3px' }}>INVESTIGACIÓN ESPECIAL</span>
                <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.3)' }} />
                <span style={{ fontSize: '0.95rem', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '900', letterSpacing: '1px' }}>
                    <TrendingUp size={20}/> ECONOMÍA REAL
                </span>
            </div>
            
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', 
              fontWeight: '900', 
              lineHeight: '0.95', 
              letterSpacing: '-0.04em',
              marginBottom: '2rem',
              fontFamily: "'Outfit', sans-serif"
            }}>
              El Espejismo Americano <span style={{ color: '#fbbf24' }}>de Quiroz:</span> ¿Bencina de Primer Mundo con sueldos de Tercero?
            </h1>
            
            <p style={{ fontSize: '1.8rem', color: '#d1d5db', maxWidth: '950px', lineHeight: '1.3', fontWeight: '300', marginBottom: '4rem', fontStyle: 'italic', borderLeft: '4px solid #fbbf24', paddingLeft: '2rem' }}>
              "Analizamos el trasfondo de una medida que promete sanar el cáncer, pero amenaza con quebrar la economía del hogar chileno."
            </p>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                   <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(45deg, #fbbf24, #000)', padding: '2px' }}>
                      <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <span style={{ fontWeight: '900', fontSize: '1.2rem', color: '#fbbf24' }}>VLS</span>
                      </div>
                   </div>
                   <div>
                      <p style={{ margin: 0, fontWeight: '900', fontSize: '1.2rem', color: 'white' }}>Equipo Vecinos La Serena</p>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: '#fbbf24', fontWeight: 'bold' }}>MARTES, 24 DE MARZO, 2026</p>
                   </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.05)', padding: '10px 20px', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)' }}>
                   <Clock size={20} color="#fbbf24" />
                   <span style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 'bold' }}>18 MIN DE ANÁLISIS CRÍTICO</span>
                </div>
            </div>
          </motion.div>
          
          <div style={{ position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
             <p style={{ fontSize: '0.7rem', color: '#fbbf24', letterSpacing: '3px', fontWeight: '900', marginBottom: '10px' }}>EXPLORA EL INFORME</p>
             <ArrowDown size={30} color="#fbbf24" style={{ animation: 'bounce 2s infinite' }} />
          </div>
        </section>

        {/* DATA COMPARISON MODULE - Chapter II Style */}
        <div style={{ background: '#000', padding: '6rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
           <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h3 style={{ borderLeft: '8px solid #fbbf24', paddingLeft: '1.5rem', color: 'white', fontSize: '2.2rem', fontWeight: '900', marginBottom: '4rem', fontFamily: '"Outfit", sans-serif' }}>
                 ¿PAGAMOS LO MISMO QUE EN EE.UU? <span style={{ color: '#fbbf24' }}>LA TRAMPA DE LOS DATOS</span>
              </h3>
              
              <div style={{ overflowX: 'auto' }}>
                 <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 15px', color: 'white' }}>
                    <thead>
                       <tr style={{ background: '#111', color: '#fbbf24', fontSize: '0.9rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px' }}>
                          <th style={{ padding: '20px', textAlign: 'left', borderRadius: '15px 0 0 15px' }}>CONCEPTO</th>
                          <th style={{ padding: '20px', textAlign: 'center' }}>ESTADOS UNIDOS</th>
                          <th style={{ padding: '20px', textAlign: 'center', borderRadius: '0 15px 15px 0', border: '2px solid #fbbf24' }}>CHILE (QUIROZ)</th>
                       </tr>
                    </thead>
                    <tbody>
                       {[
                          { label: 'Sueldo Mínimo (Aprox)', us: 'US$ 1.500', cl: 'US$ 550', highlight: true },
                          { label: 'Impuesto Específico (Galón)', us: 'US$ 0.18', cl: 'US$ 1.30', highlight: true },
                          { label: 'Carga Tributaria Total', us: 'Baja (Consumo)', cl: 'Muy Alta (IEC + IVA)', highlight: false },
                          { label: 'Clasificación del Bien', us: 'Insumo Básico', cl: 'Bien de Lujo', highlight: false }
                       ].map((row, idx) => (
                          <tr key={idx} style={{ background: 'rgba(255,255,255,0.03)', transition: 'all 0.3s' }}>
                             <td style={{ padding: '20px', fontWeight: 'bold', borderRadius: '15px 0 0 15px' }}>{row.label}</td>
                             <td style={{ padding: '20px', textAlign: 'center', color: '#94a3b8' }}>{row.us}</td>
                             <td style={{ padding: '20px', textAlign: 'center', fontWeight: '900', color: row.highlight ? '#fbbf24' : 'white', borderRadius: '0 15px 15px 0' }}>{row.cl}</td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '2rem', textAlign: 'center' }}>* Análisis basado en paridad de poder adquisitivo y tasas impositivas 18.502 modificadas 2026.</p>
           </div>
        </div>

        {/* Article Body */}
        <article style={{ maxWidth: '1280px', margin: '0 auto', padding: '8rem 2rem', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 400px', gap: '8rem' }}>
          
          <div style={{ position: 'relative', zIndex: 1, fontSize: '1.35rem', lineHeight: '1.8', color: '#000', fontFamily: "'Charter', 'Georgia', serif" }}>            {/* CHAPTER I */}
            <section style={{ marginBottom: '6rem' }}>
               <h2 style={{ fontSize: '2.8rem', fontWeight: '900', color: '#000', marginBottom: '2.5rem', fontFamily: "'Outfit', sans-serif", letterSpacing: '-0.02em' }}>
                  Capítulo I: La "Frase de la Discordia" y el Choque de Realidades
               </h2>
               <p style={{ marginBottom: '2rem', color: '#1e293b', fontWeight: 500 }}>
                  El ministro de Hacienda, Jorge Quiroz, no solo anunció el fin de los subsidios; lanzó un dardo directo a la lógica del consumidor chileno. Al defender el ahorro de <strong>US$ 200 millones semanales</strong> para el fisco, disparó una comparación que hoy recorre cada fila en las bencineras de La Serena:
               </p>
               
               <div style={{ background: '#0a0a0a', padding: '3.5rem', borderRadius: '32px', margin: '4rem 0', position: 'relative', overflow: 'hidden' }}>
                  <Quote size={60} color="#fbbf24" style={{ position: 'absolute', top: '20px', right: '20px', opacity: 0.2 }} />
                  <p style={{ color: '#fff', fontSize: '2.1rem', fontWeight: '900', fontStyle: 'italic', lineHeight: '1.2', borderLeft: '8px solid #fbbf24', paddingLeft: '2.5rem', margin: 0 }}>
                     "No podemos gastarnos en una semana lo que cuesta resolver las listas de espera oncológicas solo para que el chileno pague la bencina a un precio más bajo que el que paga un ciudadano norteamericano".
                  </p>
                  <p style={{ color: '#fbbf24', fontWeight: 'bold', marginTop: '2rem', textAlign: 'right', fontSize: '1rem' }}>— Jorge Quiroz, Ministro de Hacienda (Marzo 2026)</p>
               </div>

               <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '3rem', margin: '5rem 0' }}
               >
                  <div style={{ borderLeft: '4px solid #ef4444', paddingLeft: '2rem' }}>
                    <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: '1.6' }}>
                      En las estaciones de servicio de la Avenida del Mar y Balmaceda, la molestia no es solo por el precio, sino por la narrativa. Para el serenense que debe conducir desde Las Compañías al centro, el auto no es un lujo, es la única herramienta de trabajo viable ante un transporte público que aún no logra la frecuencia necesaria.
                    </p>
                  </div>
                  <img 
                    src="/bencinazo_fuel_pump.png" 
                    alt="Bencinera de Noche" 
                    style={{ width: '100%', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} 
                  />
               </motion.div>
            </section>

            {/* CAPÍTULO II */}
            <section style={{ marginBottom: '6rem', background: '#f0f9ff', padding: '4rem', borderRadius: '40px', border: '1px solid #bae6fd' }}>
               <h2 style={{ fontSize: '2.8rem', fontWeight: '900', color: '#0c4a6e', marginBottom: '2.5rem', fontFamily: "'Outfit', sans-serif" }}>
                  Capítulo II: El Espejismo de la Paridad
               </h2>
               <p style={{ marginBottom: '2rem', color: '#1e293b', fontWeight: 500 }}>
                  Comparar el precio de la bencina en Chile con el de Estados Unidos sin ajustar por ingreso per cápita, paridad de poder adquisitivo (PPA) ni infraestructura de transporte público, es la definición clásica de un <strong>espejismo económico</strong>.
               </p>
               
               <div style={{ background: '#fff', padding: '3rem', borderRadius: '32px', border: '1px solid #bae6fd', marginBottom: '3rem' }}>
                  <h4 style={{ color: '#0369a1', fontWeight: '900', fontSize: '1.2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}><Layers size={22} /> MAPA DE CALOR: COSTO RELATIVO POR PAÍS</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                     <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '20px' }}>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 'bold' }}>USA (CALIFORNIA)</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#10b981' }}>US$ 1.20 / Litro</div>
                        <div style={{ height: '6px', width: '100%', background: '#e2e8f0', borderRadius: '3px', marginTop: '10px' }}>
                           <div style={{ height: '100%', width: '25%', background: '#10b981', borderRadius: '3px' }} />
                        </div>
                     </div>
                     <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '20px' }}>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 'bold' }}>CHILE (LA SERENA)</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#ef4444' }}>US$ 1.55 / Litro</div>
                        <div style={{ height: '6px', width: '100%', background: '#e2e8f0', borderRadius: '3px', marginTop: '10px' }}>
                           <div style={{ height: '100%', width: '90%', background: '#ef4444', borderRadius: '3px' }} />
                        </div>
                     </div>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '1.5rem' }}>* Al ajustar por salario promedio, el impacto real en el bolsillo chileno es 4.2 veces superior al del promedio estadounidense.</p>
               </div>
               
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', margin: '3rem 0' }}>
                  <div style={{ background: '#fff', padding: '2rem', borderRadius: '20px', border: '1px solid #0ea5e9', textAlign: 'center' }}>
                     <div style={{ color: '#0284c7', fontWeight: '900', fontSize: '2rem', marginBottom: '0.5rem' }}>US$&thinsp;3,85</div>
                     <p style={{ margin: 0, color: '#334155', fontSize: '1rem' }}><strong>Precio por Galón en Chile</strong><br/>equivalente en dólares</p>
                  </div>
                  <div style={{ background: '#fff', padding: '2rem', borderRadius: '20px', border: '1px solid #0ea5e9', textAlign: 'center' }}>
                     <div style={{ color: '#0284c7', fontWeight: '900', fontSize: '2rem', marginBottom: '0.5rem' }}>US$&thinsp;0,95</div>
                     <p style={{ margin: 0, color: '#334155', fontSize: '1rem' }}><strong>Precio por Galón en EE. UU.</strong><br/>(Promedio nacional ajustado)</p>
                  </div>
                  <div style={{ background: '#000', padding: '2rem', borderRadius: '20px', border: '1px solid #fbbf24', textAlign: 'center', color: '#fff' }}>
                     <div style={{ color: '#fbbf24', fontWeight: '900', fontSize: '2rem', marginBottom: '0.5rem' }}>4&times;
                     </div>
                     <p style={{ margin: 0, color: '#e2e8f0', fontSize: '1rem' }}><strong>Impacto real sobre el ingreso</strong><br/> El chileno paga 4 veces más de su esfuerzo diario.</p>
                  </div>
               </div>
            </section>

            {/* CHAPTER III - UPDATED */}
            <section style={{ marginBottom: '6rem', padding: '4rem', background: '#fffbeb', borderRadius: '40px', border: '1px solid #fef3c7' }}>
              <h2 style={{ fontSize: '2.8rem', fontWeight: '900', color: '#7c2d12', marginBottom: '2rem', fontFamily: "'Outfit', sans-serif" }}>
                Capítulo III: La "Mochila" de 1986
              </h2>
              <p style={{ marginBottom: '2rem', color: '#1e293b', fontWeight: 500 }}>
                Para el vecino de Las Compañías o de los barrios residenciales de La Serena, la pregunta es una sola: ¿Por qué la bencina es tan cara? La respuesta tiene fecha: <strong>1986</strong>. Mediante la Ley 18.502, se creó el Impuesto Específico para reconstruir los caminos tras el terremoto de 1985. Fue una medida "transitoria" que hoy, 40 años después, sigue vigente.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '2rem' }}>
                 <div style={{ background: '#fff', padding: '2rem', borderRadius: '24px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                    <h4 style={{ color: '#7c2d12', fontWeight: '900', marginBottom: '1rem' }}>LA PARADOJA FINAL</h4>
                    <p style={{ fontSize: '1.1rem', margin: 0, color: '#334155' }}>Pagamos peajes en carreteras concesionadas (que ya están construidas) y, además, pagamos el impuesto que originalmente iba a construirlas.</p>
                 </div>
                  <div style={{ background: '#000', padding: '2rem', borderRadius: '24px', color: '#fbbf24' }}>
                     <h4 style={{ color: '#fff', fontWeight: '900', marginBottom: '1rem' }}>EFECTO ELIMINACIÓN</h4>
                     <p style={{ fontSize: '1.1rem', margin: 0, color: '#fbbf24', fontWeight: 500 }}>Si el gobierno eliminara el IEC, la bencina bajaría hoy mismo <strong style={{ color: '#fff' }}>$350 pesos por litro</strong>, neutralizando completamente el alza anunciada.</p>
                  </div>
              </div>
            </section>

            {/* CHAPTER IV */}
            <section style={{ marginBottom: '6rem' }}>
               <h2 style={{ fontSize: '2.8rem', fontWeight: '900', color: '#000', marginBottom: '2.5rem', fontFamily: "'Outfit', sans-serif" }}>
                  Capítulo IV: Peras, Manzanas y Listas de Espera
               </h2>
               <p style={{ marginBottom: '2rem', color: '#1e293b', fontWeight: 500 }}>
                  El ministro Quiroz ha sido hábil en &ldquo;moralizar&rdquo; la caja del Estado. Al declarar que el subsidio a la bencina compite con el tratamiento de pacientes con cáncer, coloca al ciudadano en una encrucijada ética de imposible resolución inmediata.
               </p>
               
               <div style={{ background: '#f9fafb', padding: '3rem', borderRadius: '32px', border: '1px solid #e5e7eb' }}>
                  <h4 style={{ color: '#ef4444', fontWeight: '900', fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}><AlertTriangle size={24}/> EL EFECTO CASCADA (INFLACIÓN)</h4>
                  <ul style={{ paddingLeft: '1.5rem', fontSize: '1.15rem', color: '#1e293b' }}>
                     <li style={{ marginBottom: '1rem' }}><strong>Alza del diésel ($580/litro):</strong> Encarece el flete de los camiones que abastecen el Terminal Agropecuario, impactando directamente el costo de los alimentos frescos.</li>
                     <li style={{ marginBottom: '1rem' }}><strong>Inflación de alimentos:</strong> Sube el precio del pan, las verduras y el aceite; los productos que más pesan en la canasta básica de familias de ingresos medios y bajos.</li>
                     <li style={{ marginBottom: '1rem' }}><strong>Precarización del transporte menor:</strong> La familia que pierde poder adquisitivo por la bencina, lo recupera pagando más en el supermercado y en la tarifa del colectivo.</li>
                  </ul>
               </div>
            </section>

            {/* CHAPTER V */}
            <section style={{ marginBottom: '6rem' }}>
               <h2 style={{ fontSize: '2.8rem', fontWeight: '900', color: '#000', marginBottom: '2.5rem', fontFamily: "'Outfit', sans-serif" }}>
                  Capítulo V: El Descalabro en La Serena y Regiones
               </h2>
                <p style={{ marginBottom: '2rem', color: '#1e293b', fontWeight: 500 }}>
                  En Santiago, el Metro &mdash;parcialmente subsidiado&mdash; es una alternativa real. En La Serena, Coquimbo y toda la macro-zona norte chica, la movilidad dep totalende de la micro, el colectivo y el vehículo particular. No existe red ferroviaria urbana ni alternativa de locomoción pública de gran escala.
               </p>
               <p style={{ color: '#1e293b', fontWeight: 500 }}>
                  <strong>Locomoción Colectiva:</strong> Los dueños de micros y colectiveros de nuestra zona ya advierten que el alza del petróleo es "la sentencia de muerte" para sus actuales tarifas. 
               </p>
               <p style={{ marginTop: '2rem', borderTop: '2px dashed #fbbf24', paddingTop: '2rem', fontStyle: 'italic', color: '#b45309', fontWeight: 'bold' }}>
                  "Mientras Quiroz sube la bencina, el gobierno retira 43 decretos ambientales, incluyendo protecciones en nuestra región como el área del Pingüino de Humboldt."
               </p>
            </section>

            {/* MEDIDAS PALIATIVAS 24 MARZO 2026 */}
            <section style={{ marginBottom: '6rem' }}>
               <h2 style={{ fontSize: '2.8rem', fontWeight: '900', color: '#000', marginBottom: '2.5rem', fontFamily: "'Outfit', sans-serif" }}>
                  Capítulo VI: Las Medidas Paliativas &mdash; Plan &laquo;Chile Sale Adelante&raquo;
               </h2>
               <p style={{ marginBottom: '2rem', color: '#1e293b', fontWeight: 500 }}>
                  El 24 de marzo de 2026, el gobierno ingresó al Congreso un proyecto de ley con <strong>ocho medidas paliativas</strong> para contener el impacto del bencinazo. Con un costo fiscal de <strong>$111.530 millones</strong>, el ejecutivo las presentó como &ldquo;neutral para las arcas del Estado&rdquo;, arguyendo que la suspensión de un crédito tributario al diésel no transportista cubrirá la mayor parte del gasto. Pero, ¿qué pesa realmente en la balanza del ciudadano serenense?
               </p>

               {/* Grid de medidas */}
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                  {[
                    { icon: '🛢️', titulo: 'MEPCO Reforzado', desc: 'El cálculo del precio de paridad se extiende de 2 a 4 semanas, amortiguando alzas internacionales bruscas.', veredicto: 'PARCIAL', color: '#f59e0b' },
                    { icon: '🕯️', titulo: 'Parafina Congelada', desc: 'El precio de la parafina se fija en ~$1.000/litro hasta el fin del invierno. El FEPP se recapitaliza de US$5M a US$60M.', veredicto: 'POSITIVO', color: '#10b981' },
                    { icon: '🚌', titulo: 'Tarifas Red Congeladas', desc: 'El Metro y el Sistema Red en la Región Metropolitana no subirá hasta el 31 de diciembre de 2026.', veredicto: 'SANTIAGO', color: '#3b82f6' },
                    { icon: '🚕', titulo: 'Subsidio Taxistas', desc: '$100.000 mensuales por vehículo durante 6 meses. Requiere tramitación en el Congreso.', veredicto: 'PENDIENTE', color: '#8b5cf6' },
                    { icon: '🔋', titulo: 'Crédito EV BancoEstado', desc: 'Línea de financiamiento preferencial (6 años + 6 meses gracia) para renovar flotas a vehículos eléctricos.', veredicto: 'LARGO PLAZO', color: '#64748b' },
                    { icon: '🚛', titulo: 'Transporte de Carga', desc: 'Medidas de seguridad vial en rutas y áreas de descanso para camioneros.', veredicto: 'INDIRECTO', color: '#94a3b8' },
                  ].map((m, i) => (
                    <div key={i} style={{ background: '#fff', padding: '1.5rem', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{m.icon}</div>
                      <h5 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontWeight: '900', fontSize: '1rem', fontFamily: "'Outfit', sans-serif" }}>{m.titulo}</h5>
                      <p style={{ margin: '0 0 1rem 0', color: '#334155', fontSize: '0.95rem', lineHeight: '1.5', fontWeight: 500 }}>{m.desc}</p>
                      <span style={{ display: 'inline-block', background: m.color + '20', color: m.color, fontWeight: '900', fontSize: '0.7rem', padding: '3px 10px', borderRadius: '20px', letterSpacing: '1px', border: `1px solid ${m.color}40` }}>{m.veredicto}</span>
                    </div>
                  ))}
               </div>

               {/* Balance VLS para La Serena */}
               <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)', padding: '3rem', borderRadius: '32px', border: '1px solid rgba(59,130,246,0.3)' }}>
                  <h4 style={{ color: '#93c5fd', fontWeight: '900', fontSize: '1.3rem', marginBottom: '1.5rem', fontFamily: "'Outfit', sans-serif" }}>⚖️ Balance VLS: ¿Qué cambia realmente para La Serena?</h4>
                  <p style={{ color: '#e2e8f0', fontWeight: 400, lineHeight: '1.7', marginBottom: '1.5rem' }}>
                     La mayor parte de las medidas están diseñadas para el Gran Santiago. <strong style={{ color: '#fff' }}>El congelamiento del Metro no nos beneficia</strong>; en la Región de Coquimbo no existe un sistema equivalente. Los <strong style={{ color: '#fff' }}>fondos para regiones</strong> son genéricos y sin garantía de montos mínimos por zona. El subsidio a taxistas es prometedor, pero <strong style={{ color: '#93c5fd' }}>aún requiere aprobación del Congreso</strong>, y en el intertanto los colectiveros de Las Compañías y Coquimbo absorberán el alza desde este jueves.
                  </p>
                  <p style={{ color: '#e2e8f0', fontWeight: 400, lineHeight: '1.7', marginBottom: 0 }}>
                     Lo que sí aplica hoy de forma directa en La Serena es el <strong style={{ color: '#fff' }}>congelamiento de la parafina</strong> &mdash;clave para los hogares más vulnerables&mdash; y el <strong style={{ color: '#fff' }}>ajuste al MEPCO</strong>, que podría suavizar futuras alzas pero no evitar la de esta semana. En suma: las medidas existen, pero la mayoría llega tarde, a destinatarios lejanos o con condicionales legíslativos que dilatan el alivio real.
                  </p>
               </div>
            </section>

            {/* CONCLUSION */}
            <div style={{ background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)', color: 'white', padding: '5rem', borderRadius: '48px', marginTop: '8rem', position: 'relative', overflow: 'hidden' }}>
               <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '300px', height: '300px', background: '#fbbf2410', borderRadius: '50%', filter: 'blur(50px)' }} />
               <h3 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#fbbf24', marginBottom: '2.5rem', fontFamily: "'Outfit', sans-serif" }}>Veredicto: La Terapia de Choque vs. El Sentido Común</h3>
               <p style={{ color: 'white', fontSize: '1.4rem', lineHeight: '1.6', marginBottom: '3rem', fontWeight: '400' }}>
                  La comparación del ministro Quiroz es un espejismo. No se puede exigir al chileno pagar como un ciudadano de una potencia mundial cuando su realidad de transporte, salud y sueldos está a años luz.
               </p>
               <div style={{ padding: '3rem', background: 'rgba(251,191,36,0.05)', borderRadius: '32px', border: '1px solid rgba(251,191,36,0.2)' }}>
                  <p style={{ margin: 0, fontWeight: '900', color: '#fbbf24', fontSize: '1.2rem', letterSpacing: '2px' }}>VEREDICTO VLS:</p>
                  <p style={{ margin: '15px 0 0 0', fontSize: '1.8rem', fontWeight: '900', color: '#fff', lineHeight: '1.2' }}>Estamos ante una decisión política que prioriza el balance de Excel del Ministerio de Hacienda por sobre la paz social de las regiones.</p>
               </div>
            </div>
            {/* Comment Section Integration */}
            <CommentSection themeColor="#fbbf24" reportTitle="Espejismo Americano" />
          </div>

          {/* Sidebar */}
          <aside style={{ position: 'sticky', top: '120px', height: 'fit-content' }}>
            
            <div style={{ background: '#000', color: 'white', padding: '2.5rem', borderRadius: '32px', marginBottom: '2.5rem', border: '1px solid rgba(251,191,36,0.4)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2rem' }}>
                 <Brain size={32} color="#fbbf24" />
                 <h4 style={{ fontWeight: '900', fontSize: '1.2rem', color: '#fbbf24', margin: 0 }}>VLS INTELLIGENCE</h4>
               </div>
               <p style={{ fontSize: '0.95rem', color: 'white', lineHeight: '1.6', fontWeight: 500 }}>
                 "El Centinel Faro ha detectado un aumento del 400% en el tráfico de palabras clave relacionadas con <strong>'protesta'</strong> y <strong>'desabastecimiento'</strong> en la Región de Coquimbo."
               </p>
               <div style={{ marginTop: '2.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                     <span style={{ fontSize: '0.8rem', color: '#fbbf24', fontWeight: 'bold' }}>ESTADO COMUNAL:</span>
                     <span style={{ fontSize: '0.8rem', color: '#ef4444', fontWeight: '900' }}>CRÍTICO</span>
                  </div>
                  <div style={{ height: '12px', background: '#111', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                     <motion.div initial={{ width: 0 }} animate={{ width: '92%' }} transition={{ duration: 2 }} style={{ height: '100%', background: 'linear-gradient(90deg, #fbbf24, #ef4444)' }} />
                  </div>
               </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '2.5rem', borderRadius: '32px', marginBottom: '2.5rem', border: '1px solid #e2e8f0' }}>
               <h4 style={{ fontWeight: '900', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}><Layers size={22} /> CLAVES DEL REPORTE</h4>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div className="key-point">
                     <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <Wallet size={18} color="#b45309" />
                        <span style={{ fontSize: '0.8rem', color: '#b45309', fontWeight: '900' }}>SUELDOS</span>
                     </div>
                     <p style={{ margin: '8px 0', fontSize: '1.05rem', fontWeight: 'bold', color: '#111827' }}>Chile paga combustible de elite con ingresos de emergencia.</p>
                  </div>
                  <div className="key-point">
                     <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <BarChart3 size={18} color="#ef4444" />
                        <span style={{ fontSize: '0.8rem', color: '#ef4444', fontWeight: '900' }}>IMPUESTO 1986</span>
                     </div>
                     <p style={{ margin: '8px 0', fontSize: '1.05rem', fontWeight: 'bold', color: '#111827' }}>El tributo "transitorio" que lleva 4 décadas asfixiando al país.</p>
                  </div>
                  <div className="key-point">
                     <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <Search size={18} color="#3b82f6" />
                        <span style={{ fontSize: '0.8rem', color: '#3b82f6', fontWeight: '900' }}>FALACIA</span>
                     </div>
                     <p style={{ margin: '8px 0', fontSize: '1.05rem', fontWeight: 'bold', color: '#111827' }}>Por qué la comparación con EE.UU. no resiste análisis técnico.</p>
                  </div>
               </div>
            </div>

            <div style={{ padding: '2rem', textAlign: 'center', background: '#fbbf2408', borderRadius: '32px', border: '1px dashed #fbbf24' }}>
               <Share2 size={28} color="#fbbf24" style={{ marginBottom: '1.2rem', cursor: 'pointer' }} />
               <p style={{ fontSize: '0.85rem', color: '#334155', fontWeight: 'bold', margin: 0 }}>DIFUNDE ESTE ANÁLISIS SOBERANO</p>
               <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '5px' }}>#Bencinazo2026 #SmartLaSerena</p>
            </div>

          </aside>

        </article>

        {/* Action Bar - Mobile Ready */}
        <section style={{ background: '#000', padding: '6rem 2rem', textAlign: 'center', position: 'relative' }}>
           <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <Zap size={50} color="#fbbf24" style={{ margin: '0 auto 2rem auto' }} />
              <h4 style={{ fontSize: '2.8rem', fontWeight: '900', color: '#fff', marginBottom: '2rem', fontFamily: '"Outfit", sans-serif' }}>¿Qué piensas tú?</h4>
              <p style={{ color: '#d1d5db', fontSize: '1.4rem', marginBottom: '3.5rem', fontWeight: '300' }}>Tu opinión como vecino es la base de nuestra inteligencia social. ¿Es el orden fiscal más importante que el costo de la vida?</p>
              
              <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                 <button className="btn-vls-action" style={{ background: '#fbbf24', color: '#000' }}>ORDEN FISCAL ANTE TODO</button>
                 <button className="btn-vls-action" style={{ background: 'transparent', color: '#fff', border: '2px solid #fff' }}>PRIORIZAR COSTO DE VIDA</button>
              </div>
           </div>
        </section>

        {/* Footer Content */}
        <footer style={{ background: '#000', color: 'white', padding: '5rem 6rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '3rem', marginBottom: '3rem' }}>
              <div>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#fbbf24' }}>VLS Research</h2>
                <p style={{ color: '#9ca3af', fontSize: '1.1rem' }}>Soberanía Informativa para la Comuna Smart.</p>
              </div>
              <div style={{ display: 'flex', gap: '4rem' }}>
                 <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: '900' }}>400%</div>
                    <div style={{ fontSize: '0.8rem', color: '#fbbf24', textTransform: 'uppercase', fontWeight: 'bold' }}>ALERTA SOCIAL</div>
                 </div>
                 <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: '900' }}>VLS</div>
                    <div style={{ fontSize: '0.8rem', color: '#fbbf24', textTransform: 'uppercase', fontWeight: 'bold' }}>Soberana</div>
                 </div>
              </div>
           </div>
           
           <div style={{ color: '#4b5563', fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
              <span>© 2026 UNIDAD DE INVESTIGACIÓN FARO INTELLIGENCE - VECINOS LA SERENA CHILE.</span>
              <div style={{ display: 'flex', gap: '3rem' }}>
                <span className="footer-link">ESTÁNDARES ÉTICOS</span>
                <span className="footer-link">SISTEMA CENTINEL</span>
              </div>
           </div>
        </footer>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700;900&display=swap');
        
        .icon-btn-news { background: white; border: 1px solid #e5e7eb; color: #6b7280; width: 45px; height: 45px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
        .icon-btn-news:hover { background: #000; color: #fff; border-color: #000; transform: translateY(-5px); }
        .hover-scale:hover { transform: scale(1.05); }
        .footer-link:hover { color: #fbbf24; cursor: pointer; }
        .btn-vls-action { padding: 1.5rem 3rem; border-radius: 20px; font-weight: 900; font-size: 1.1rem; cursor: pointer; transition: all 0.3s; min-width: 250px; }
        .btn-vls-action:hover { transform: translateY(-8px); box-shadow: 0 15px 30px rgba(251,191,36,0.2); }
        .key-point:hover p { color: #fbbf24 !important; }
        
        @keyframes pulse { 0% { opacity: 0.1; } 50% { opacity: 0.2; } 100% { opacity: 0.1; } }
        @keyframes bounce { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-10px); } 60% { transform: translateY(-5px); } }
        
        /* News Specific Typography Fixes */
        .intro-news { font-family: 'Charter', 'Georgia', serif; }
      `}</style>
    </div>
  );
}
