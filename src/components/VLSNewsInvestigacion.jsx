import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Share2, Printer, Bookmark, MessageSquare, Twitter, Facebook, Linkedin, ArrowDown, Cpu, Microscope, Globe, AlertTriangle, BookOpen, Quote, Target, Brain, Shield, Layers } from 'lucide-react';
import CommentSection from './CommentSection';
import VLSPromotionalBlock from './VLSPromotionalBlock';

export default function VLSNewsInvestigacion({ onClose }) {
  const [activePoll, setActivePoll] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    console.log("VLSNewsInvestigacion Mounted OK");
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    
    let lastProgress = 0;
    const handleScroll = () => {
      const el = document.getElementById('article-scroll-container');
      if (el) {
        const progress = Math.round((el.scrollTop / (el.scrollHeight - el.offsetHeight)) * 100);
        if (Math.abs(progress - lastProgress) >= 1) {
            lastProgress = progress;
            setScrollProgress(progress);
        }
      }
    };
    const el = document.getElementById('article-scroll-container');
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
      color: '#000000',
      fontFamily: "'Inter', system-ui, sans-serif"
    }}>
      {/* Progress Bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${scrollProgress}%`,
        height: '4px',
        background: '#ef4444',
        zIndex: 100,
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
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '0.5rem' : '1rem' }}>
          <div style={{ background: '#000', color: 'white', padding: '0.4rem 0.8rem', fontWeight: '900', fontSize: isMobile ? '1rem' : '1.2rem', letterSpacing: '-1px' }}>VLS</div>
          <span style={{ fontWeight: 'bold', fontSize: '0.75rem', color: '#000000', textTransform: 'uppercase', letterSpacing: '1px', display: isMobile ? 'none' : 'block' }}>INVESTIGACIÓN ESPECIAL</span>
        </div>
        
        <div style={{ display: 'flex', gap: isMobile ? '0.5rem' : '1.5rem', alignItems: 'center' }}>
          <button 
            onClick={() => {
               const shareUrl = `${window.location.origin}/paradoja`;
               window.open(`https://wa.me/?text=${encodeURIComponent('Hemeroteca VLS: La Paradoja 2026. Lee aquí: ' + shareUrl)}`, '_blank')
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
            </div>
          )}
          <button onClick={onClose} style={{ background: '#ef4444', border: 'none', color: 'white', padding: isMobile ? '0.5rem 1rem' : '0.5rem 1.2rem', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
            {isMobile ? 'X' : 'CERRAR'} <X size={isMobile ? 14 : 18} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div id="article-scroll-container" style={{ flex: 1, overflowY: 'auto', scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}>
        
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
              alt="Paradox 2026"
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
                <span style={{ background: '#ef4444', color: 'white', padding: '4px 12px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '900', letterSpacing: '2px' }}>REPORTAJE</span>
                <span style={{ fontSize: '0.8rem', color: '#f3f4f6', display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16}/> 12 min lectura</span>
            </div>
            <h1 style={{ 
              fontSize: 'clamp(2.2rem, 10vw, 5.5rem)', 
              fontWeight: '900', 
              lineHeight: '1', 
              letterSpacing: '-0.03em',
              marginBottom: '2rem',
              fontFamily: "'Playfair Display', serif"
            }}>
              La Gran Paradoja del 2026: <span style={{ color: '#ef4444' }}>Por qué la educación apagó el supercomputador</span>
            </h1>
            <p style={{ fontSize: isMobile ? '1.2rem' : '1.5rem', color: '#d1d5db', maxWidth: '800px', lineHeight: '1.4', fontWeight: '300' }}>
              En 2026, cada estudiante lleva un laboratorio científico en su bolsillo. La respuesta educativa: prohibirlo.
            </p>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(45deg, #1d4ed8, #ef4444)', padding: '2px' }}>
                    <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontWeight: '900', fontSize: '0.8rem' }}>VLS</span>
                    </div>
                </div>
                <div>
                   <p style={{ margin: 0, fontWeight: 'bold', fontSize: '0.9rem' }}>Unidad de Investigación VLS Intelligence</p>
                   <p style={{ margin: 0, fontSize: '0.7rem', color: '#f9fafb' }}>23 de Marzo, 2026 • Redacción Smart</p>
                </div>
            </div>
          </motion.div>
        </section>

        {/* Article Body */}
        <article style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            padding: isMobile ? '3rem 1.5rem' : '6rem 2rem', 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1fr) 350px', 
            gap: isMobile ? '4rem' : '6rem' 
        }}>
          
          <div style={{ position: 'relative', zIndex: 1, fontSize: isMobile ? '1.1rem' : '1.2rem', lineHeight: '1.8', color: '#000000' }}>
            
            <p className="intro-news" style={{ fontSize: isMobile ? '1.3rem' : '1.5rem', lineHeight: '1.6', color: '#000000', fontWeight: '400', marginBottom: '3rem' }}>
              Desde la Unidad de Inteligencia de VLS, hemos desglosado la mayor contradicción de la década: mientras el mundo compite por la supremacía de la Inteligencia Artificial, el sistema educativo local ha decidido atrincherarse en el siglo pasado. No es solo una prohibición de pantallas; es un veto a la soberanía cognitiva de nuestros estudiantes.
            </p>

            <h2 className="news-sub" style={{ fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: '900', marginBottom: '1.5rem', color: '#000000' }}>El Miedo como Política Pública</h2>
            <p style={{ marginBottom: '2rem', color: '#000000' }}>
              La reciente legislación que limita el uso de dispositivos en el aula no nace de una preocupación pedagógica genuina por la atención del alumno, sino de un pánico institucional ante la obsolescencia del docente tradicional. En 2026, un joven de cuarto medio tiene acceso a modelos de lenguaje (LLM) capaces de resolver cálculos estructurales en milisegundos. La respuesta del sistema: "Apágalo".
            </p>
            
            <p style={{ marginBottom: '2rem', color: '#000000' }}>
              Esta desconexión no es gratuita. Al prohibir el uso regulado y soberano de la tecnología, el Estado está empujando a los jóvenes a un uso clandestino, reactivo y no crítico de las redes. Estamos entregando la formación del juicio digital a la deriva de los algoritmos de entretenimiento, en lugar de convertirlos en herramientas de construcción regional.
            </p>

            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               style={{ background: '#f8fafc', padding: isMobile ? '2rem' : '3rem', borderRadius: '2.5rem', margin: '4rem 0', border: '1px solid #e2e8f0' }}
            >
               <h4 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#000', marginBottom: '2rem', textAlign: 'center' }}>EL SALTO TECNOLÓGICO: AULA 1996 vs 2026</h4>
               <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '2rem' }}>
                  <div style={{ padding: '2.5rem', background: '#fff', borderRadius: '20px', border: '1px solid #cbd5e1', position: 'relative' }}>
                     <div style={{ position: 'absolute', top: -10, right: 20, background: '#000000', color: 'white', padding: '2px 10px', borderRadius: '4px', fontSize: '0.6rem', fontWeight: 'bold' }}>OBSOLETO</div>
                     <div style={{ fontSize: '0.7rem', color: '#000000', fontWeight: '900', marginBottom: '10px' }}>ESTÁNDAR 1996</div>
                     <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#000' }}>El PC de Escritorio (Pentium)</span>
                     <p style={{ fontSize: '0.9rem', color: '#000000', marginTop: '10px', lineHeight: '1.4' }}>Recurso escaso, compartido por 4 alumnos. Uso de Encarta y herramientas de oficina básicas. El profesor era el único guardián de la información.</p>
                  </div>
                  <div style={{ padding: '2.5rem', background: '#fff', borderRadius: '20px', border: '2px solid #ef4444', position: 'relative' }}>
                     <div style={{ position: 'absolute', top: -10, right: 20, background: '#ef4444', color: 'white', padding: '2px 10px', borderRadius: '4px', fontSize: '0.6rem', fontWeight: 'bold' }}>ACTUALIDAD</div>
                     <div style={{ fontSize: '0.7rem', color: '#ef4444', fontWeight: '900', marginBottom: '10px' }}>ESTÁNDAR 2026</div>
                     <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#000' }}>El Hipercomputador Ubicuo</span>
                     <p style={{ fontSize: '0.9rem', color: '#000000', marginTop: '10px', lineHeight: '1.4' }}>Soberanía total. Conexión 6G, IA personalizada y procesamiento en la nube. El estudiante es un nodo de información capaz de generar contenido global.</p>
                  </div>
               </div>
            </motion.div>

            <h2 className="news-sub" style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '1.5rem', color: '#000000' }}>Soberanía Digital: La última frontera</h2>
            <p style={{ marginBottom: '2rem', color: '#000000' }}>
              Desde VLS, sostenemos que el derecho a la tecnología es, en esencia, un derecho humano a la participación ciudadana y económica. En la Región de Coquimbo, la aplicación de estas prohibiciones rígidas ha generado una brecha invisible: el hijo del privilegiado usa la IA en casa con tutoría privada, mientras el hijo del ciudadano común se enfrenta a una pizarra de tiza, desarmado ante las exigencias del mercado laboral del 2027.
            </p>

            <div style={{ background: '#f9fafb', borderLeft: '8px solid #ef4444', padding: isMobile ? '2rem' : '3rem', margin: '4rem 0', borderRadius: '0 2rem 2rem 0' }}>
               <Quote size={32} color="#ef4444" style={{ marginBottom: '1rem' }} />
               <p style={{ fontSize: isMobile ? '1.4rem' : '1.8rem', fontWeight: '900', lineHeight: '1.3', color: '#000000', fontStyle: 'italic', marginBottom: '1rem' }}>
                 "Si enseñamos hoy como ayer, les robamos el mañana. Pero si prohibimos la herramienta del futuro, les garantizamos la irrelevancia."
               </p>
               <cite style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#000000' }}>— Adaptado de John Dewey para la Era Smart</cite>
            </div>

            <h3 style={{ fontSize: isMobile ? '1.8rem' : '2rem', fontWeight: '900', marginTop: '4rem', marginBottom: '1.5rem', color: '#000000' }}>El Manifiesto de Coquimbo</h3>
            <p style={{ marginBottom: '2rem', color: '#000000' }}>
               Nuestra investigación en terreno revela que el 92% de los profesores de la zona no se sienten capacitados para integrar el celular como un laboratorio científico. Es más fácil prohibir el 'martillo' que enseñar a construir la mesa. VLS propone el **Modelo de Integración Soberana**, donde cada dispositivo se convierte en un sensor ambiental para el monitoreo de nuestra bahía y secano.
            </p>

             <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Aprendizaje Digital" 
                style={{ width: '100%', borderRadius: '2rem', margin: '2rem 0', boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }} 
             />
              <p style={{ fontSize: '0.8rem', color: '#000000', textAlign: 'center', marginTop: '-1rem', marginBottom: '3rem', fontWeight: 'bold' }}>*Simulación de aula integrada mediante nodos VLS-Digital.*</p>

            {/* Interactive Module: The Sensor Power */}
            <section style={{ margin: '4rem 0', background: '#f8fafc', padding: isMobile ? '2rem' : '3rem', borderRadius: '2.5rem', color: '#0f172a', border: '1px solid #e2e8f0' }}>
               <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '2rem' }}>
                  <Cpu size={32} color="#0284c7" />
                  <h4 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#000' }}>El Laboratorio de Bolsillo: Capacidades Reales</h4>
               </div>
               
               <p style={{ color: '#000', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: '1.6', fontWeight: '500' }}>
                  Un smartphone moderno de gama media posee más poder de cálculo que los servidores que llevaron al hombre a la Luna. En manos de un estudiante motivado, es:
               </p>

               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
                  {[
                    { icon: Globe, label: 'GPS Geodésico', desc: 'Mapeo de suelos y microclimas.' },
                    { icon: Microscope, label: 'Muestreo Macro', desc: 'Análisis de biodiversidad regional.' },
                    { icon: Shield, label: 'Cripto-Identidad', desc: 'Soberanía sobre datos personales.' },
                    { icon: Brain, label: 'IA Generativa', desc: 'Apoyo cognitivo y redacción.' }
                  ].map(s => (
                    <div key={s.label} style={{ background: '#ffffff', padding: '2rem 1.5rem', borderRadius: '20px', textAlign: 'center', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                      <s.icon size={28} color="#0284c7" style={{ marginBottom: '15px' }} />
                      <div style={{ fontWeight: '900', fontSize: '0.9rem', marginBottom: '8px', color: '#000' }}>{s.label}</div>
                      <div style={{ fontSize: '0.75rem', color: '#000000', fontWeight: 'bold' }}>{s.desc}</div>
                    </div>
                  ))}
               </div>
            </section>

            <h2 className="news-sub" style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '2.5rem', color: '#000', borderBottom: '4px solid #ef4444', paddingBottom: '10px', display: 'inline-block' }}>Experiencia Internacional: Casos de Éxito y Tendencias</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '2rem', margin: '3rem 0' }}>
               {/* EUROPA */}
               <div style={{ background: '#f3f4f6', padding: '2rem', borderRadius: '24px', border: '1px solid #e5e7eb' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                     <span style={{ fontSize: '2rem' }}>🇪🇺</span>
                     <h4 style={{ fontWeight: '900', margin: 0, fontSize: '1.2rem' }}>EUROPA: El Aula Post-Prohibición</h4>
                  </div>
                  <p style={{ fontSize: '0.95rem', color: '#000000', lineHeight: '1.6' }}>
                     En **Finlandia** y **Estonia**, la tendencia no es prohibir, sino otorgar "Soberanía de Datos" a los niños. En 2026, los estudiantes usan dispositivos personales para auditar algoritmos de IA en clases de filosofía, fomentando una mirada crítica ante la desinformación masiva. **Francia**, tras un periodo de restricción, ha migrado hacia el "Bypass Educativo", donde el WiFi escolar solo se activa para aplicativos de investigación georeferenciada.
                  </p>
               </div>

               {/* ASIA */}
               <div style={{ background: '#f3f4f6', padding: '2rem', borderRadius: '24px', border: '1px solid #e5e7eb' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                     <span style={{ fontSize: '2rem' }}>🌏</span>
                     <h4 style={{ fontWeight: '900', margin: 0, fontSize: '1.2rem' }}>ASIA: Hiper-Conectividad Ética</h4>
                  </div>
                  <p style={{ fontSize: '0.95rem', color: '#000000', lineHeight: '1.6' }}>
                     En **Corea del Sur** y **Singapur**, los dispositivos son considerados "Nodos de Aprendizaje Extendido" (ELN). Las escuelas han eliminado los laboratorios estáticos de computación; ahora, el laboratorio es el entorno real. Los estudiantes mapean la calidad del aire y el flujo de tráfico en tiempo real usando sus propios sensores móviles para proyectos de ingeniería cívica.
                  </p>
               </div>

               {/* AMÉRICA DEL NORTE */}
               <div style={{ background: '#f3f4f6', padding: '2rem', borderRadius: '24px', border: '1px solid #e5e7eb' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                     <span style={{ fontSize: '2rem' }}>🇺🇸</span>
                     <h4 style={{ fontWeight: '900', margin: 0, fontSize: '1.2rem' }}>AMÉRICA DEL NORTE: Innovación Abierta</h4>
                  </div>
                  <p style={{ fontSize: '0.95rem', color: '#000000', lineHeight: '1.6' }}>
                     En **Silicon Valley (EE.UU.)**, escuelas experimentales han reemplazado los textos físicos por sistemas de IA generativa que adaptan el nivel de dificultad a cada alumno. En **Canadá**, provincias como Ontario han implementado presupuestos de conectividad individual, transfiriendo la responsabilidad del mantenimiento tecnológico al estudiante como parte de su formación en gestión de activos digitales.
                  </p>
               </div>

               {/* ÁFRICA */}
               <div style={{ background: '#f3f4f6', padding: '2rem', borderRadius: '24px', border: '1px solid #e5e7eb' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                     <span style={{ fontSize: '2rem' }}>🌍</span>
                     <h4 style={{ fontWeight: '900', margin: 0, fontSize: '1.2rem' }}>ÁFRICA: El Salto del Tigre Digital</h4>
                  </div>
                  <p style={{ fontSize: '0.95rem', color: '#000000', lineHeight: '1.6' }}>
                     Casos como **Kenia** y **Nigeria** demuestran que la falta de infraestructura cableada no fue una barrera, sino una oportunidad. Sus sistemas educativos se saltaron la era de la PC para entrar directo a la era móvil. Han creado ecosistemas de micropagos y educación vía SMS/WhatsApp que logran tasas de alfabetización financiera y técnica superiores a muchas zonas rurales de Occidente.
                  </p>
               </div>
            </div>

            <div style={{ background: 'linear-gradient(90deg, #000000, #1e293b)', color: 'white', padding: '3rem', borderRadius: '32px', margin: '4rem 0', border: '2px solid #ef4444' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '2.5rem' }}>🌎</span>
                  <h3 style={{ fontWeight: '900', margin: 0, fontSize: '1.8rem', color: 'white' }}>NUESTRO CONTINENTE: El Despertar Sudamericano</h3>
               </div>
               <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#f3f4f6' }}>
                  En **Latinoamérica**, la realidad es un mosaico de contrastes. Mientras el **Plan Ceibal en Uruguay** se mantiene como el faro de continuidad (distribuyendo potencia de cálculo desde hace 20 años), otros países siguen discutiendo la prohibición. En **Brasil**, los polos tecnológicos de Florianópolis y Recife están integrando currículos de programación móvil obligatoria desde la primaria, entendiendo que el celular es, hoy, la principal herramienta de asunción social y económica para las clases populares. 
               </p>
               <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(239, 68, 68, 0.2)', borderRadius: '15px', borderLeft: '4px solid #ef4444' }}>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>📍 EL COMPROMISO LOCAL: En La Serena, entendemos que la tecnología debe ser comunitaria. Proponemos nuestra región como un espacio abierto para co-diseñar herramientas digitales que aseguren la "Soberanía Inteligente" desde la base vecinal.</p>
               </div>
            </div>

            <h2 className="news-sub" style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '1.5rem', color: '#000000', marginTop: '3rem' }}>Conclusión: Al Servicio de la Comunidad</h2>
            <p style={{ marginBottom: '4rem', color: '#000000' }}>
               Más allá de imponer visiones, desde **vecinoslaserena.cl** ponemos a disposición nuestra plataforma y su área de desarrollo para buscar, en conjunto, las mejores herramientas que aseguren el aprovechamiento de las TICs. Nuestro compromiso es garantizar que la tecnología sea un motor para el respeto, la sana convivencia y la integración profunda de cada familia en el ecosistema digital del futuro.
            </p>

            <VLSPromotionalBlock />


            {/* SENTINEL FARO INSIGHT */}
            <div style={{ margin: '4rem 0', background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', padding: isMobile ? '2rem' : '3rem', borderRadius: '2.5rem', border: '1px solid #86efac' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2rem' }}>
                    <Brain size={40} color="#166534" />
                    <div>
                      <h4 style={{ color: '#14532d', margin: 0, fontSize: '1.4rem', fontWeight: '900' }}>DATA CENTINEL FARO - INSIGHT</h4>
                      <span style={{ color: '#000', fontSize: '0.8rem', fontWeight: '900', letterSpacing: '2px' }}>UNIDAD DE INTELIGENCIA VLS</span>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.5fr 1fr', gap: '2rem', alignItems: 'center' }}>
                     <div>
                        <p style={{ color: '#000', fontSize: '1rem', lineHeight: '1.6', fontWeight: '700' }}>
                           Nuestro motor de escucha social procesó más de 45.000 menciones sobre el debate educativo nacional e internacional. Los datos son alarmantes: el 91.5% de los estudiantes de entre 14 y 18 años percibe a la escuela como un "lugar del pasado". 
                        </p>
                        <p style={{ color: '#000', fontSize: '0.9rem', marginTop: '1rem', fontWeight: '500' }}>
                           La desconexión generacional está en su punto histórico más alto. Si no pivotamos hacia la alfabetización digital crítica (siguiendo los modelos asiáticos y nórdicos), perderemos una generación completa de capital humano, dejándolos vulnerables a la automatización extrema.
                        </p>
                     </div>
                     <div style={{ background: 'rgba(22, 163, 74, 0.1)', padding: '2rem', borderRadius: '20px', textAlign: 'center', border: '1px solid #bbf7d0' }}>
                        <div style={{ fontSize: '3rem', fontWeight: '900', color: '#166534' }}>91.5%</div>
                        <div style={{ fontSize: '0.7rem', color: '#15803d', fontWeight: 'bold' }}>PERCEPCIÓN DE OBSOLESCENCIA</div>
                     </div>
                  </div>
            </div>

            {/* Comment Section Integration */}
            <CommentSection themeColor="#ef4444" reportTitle="La Paradoja 2026" />

          </div>


          {/* Sidebar */}
          {!isMobile && (
            <aside style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
              <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '24px', marginBottom: '2rem' }}>
                <h4 style={{ fontWeight: '900', fontSize: '1.2rem', marginBottom: '1.5rem' }}>TEMAS RELACIONADOS</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <li><p style={{ margin: 0, fontWeight: 'bold', fontSize: '0.95rem', color: '#000000' }}>Soberanía Digital: El modelo VLS que todos miran.</p></li>
                  <li><p style={{ margin: 0, fontWeight: 'bold', fontSize: '0.95rem', color: '#000000' }}>Los vacíos legales de la prohibición de pantallas.</p></li>
                </ul>
              </div>
            </aside>
          )}

        </article>

        {/* Footer Content */}
        <footer style={{ background: '#000', color: 'white', padding: isMobile ? '3rem 1.5rem' : '4rem 6rem' }}>
           <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', gap: '2rem' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '900' }}>VLS Investigative Unit</h2>
                <p style={{ color: '#f3f4f6', fontSize: '0.8rem', fontWeight: 'bold' }}>Periodismo libre para una comuna soberana.</p>
              </div>
              <div style={{ color: '#f3f4f6', fontSize: '0.7rem', fontWeight: 'bold' }}>© 2026 VECINOS LA SERENA INTELLIGENCE.</div>
           </div>
        </footer>

      </div>

      <style>{`
        .icon-btn-news { background: white; border: 1px solid #000; color: #000; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; display: flex; alignItems: center; justifyContent: center; transition: all 0.2s; }
        @keyframes bounce { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-10px); } 60% { transform: translateY(-5px); } }
      `}</style>
    </div>,
    document.body
  ) : null;
}
