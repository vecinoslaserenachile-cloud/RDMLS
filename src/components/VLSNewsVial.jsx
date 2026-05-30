import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Clock, Share2, AlertTriangle, Zap, Shield, Gavel, Heart, 
  MapPin, Camera, Info, ExternalLink, ChevronRight, MessageSquare,
  ShieldAlert, UserCheck, Scale, Building2, Smartphone, Volume2,
  AlertCircle, Construction, HardHat, Car, RotateCcw
} from 'lucide-react';
import CommentSection from './CommentSection';

const SafeIcon = ({ icon: Icon, size, color }) => {
  if (!Icon) return <AlertCircle size={size} color={color} />;
  return <Icon size={size} color={color} />;
};

const CHAPTERS = [
  {
    id: 'intro',
    title: 'Anatomía de un Laberinto de Asfalto',
    content: `La Serena enfrenta una crisis de infraestructura sin precedentes. No se trata solo de "hoyos" en la calle; es una falla sistémica en la gestión de pavimentos que afecta la seguridad, la economía familiar y la movilidad urbana. Desde baches históricos en Avenida del Mar hasta socavones en sectores residenciales, el asfalto de nuestra comuna está gritando por una intervención técnica honesta y duradera.`,
    icon: Info,
    color: '#f59e0b'
  },
  {
    id: 'cap1',
    title: 'CAPÍTULO I: El Mapa del Riesgo Crítico',
    content: `Nuestra unidad de investigación ha georreferenciado los puntos de mayor peligro para conductores y ciclistas. La profundidad y ubicación de ciertos baches en arterias principales como Balmaceda y Gabriel González Videla ya no califican como fallas menores, sino como "trampas viales" que pueden gatillar accidentes fatales.`,
    technicalDetails: [
      { id: 'Zona A', title: 'Av. Juan Cisternas', desc: 'Desnivel estructural en empalmes. Riesgo de pérdida de control a alta velocidad.' },
      { id: 'Zona B', title: 'Cuatro Esquinas', desc: 'Baches de expansión lateral. El agua lluvia acelera la erosión de la base granular.' },
      { id: 'Zona C', title: 'Ruta 5 Norte', desc: 'Socavones perimetrales en zonas de frenado. Impacto directo en ejes y suspensión.' }
    ],
    icon: MapPin,
    color: '#ef4444'
  },
  {
    id: 'cap2',
    title: 'CAPÍTULO II: La Ingeniería del "Parche" Eterno',
    content: `¿Por qué un bache reparado vuelve a aparecer tras la primera lluvia? La respuesta está en la técnica. El bacheo en frío sin sellado asfáltico es una solución cosmética que no resuelve la infiltración de humedad. Investigamos los contratos de mantenimiento y el vacío en las garantías de obra que permiten que las reparaciones duren apenas semanas.`,
    icon: Construction,
    color: '#fbbf24'
  },
  {
    id: 'backoffice',
    title: 'CENTRO DE REPORTE TÁCTICO VIAL',
    content: `Si detectas un bache extremo que ponga en riesgo la vida de los vecinos, repórtalo aquí. Tu evidencia se indexa directamente en el Expediente VLS-2026-VIAL para fiscalización inmediata.`,
    isBackoffice: true,
    icon: Camera,
    color: '#38bdf8'
  },
  {
    id: 'conclusion',
    title: 'Propuesta: Sello de Calidad Vial VLS',
    content: `Proponemos una Ordenanza Municipal que exija a las empresas pavimentadoras un "Seguro de Vida de Asfalto". No más parches. Exigimos asfalto de alta densidad con polímeros y drenaje técnico para una ciudad que merece rutas dignas.`,
    icon: Shield,
    color: '#10b981'
  }
];

export default function VLSNewsVial({ onClose = () => window.location.href = '/' }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const el = document.getElementById('vial-report-scroll');
    const handleScroll = () => {
      if (el) {
        const progress = (el.scrollTop / (el.scrollHeight - el.offsetHeight)) * 100;
        setScrollProgress(progress);
      }
    };
    if (el) el.addEventListener('scroll', handleScroll);
    return () => el && el.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = () => {
    const text = 'VLS Investigación: La Crisis Vial en La Serena. Expediente VLS-2026-VIAL.';
    if (navigator.share) {
      navigator.share({ title: 'VLS Investigación', text, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Enlace copiado al portapapeles');
    }
  };

  return (
    <div 
      style={{ 
        position: 'fixed', 
        inset: 0, 
        background: '#020617', 
        zIndex: 9999999, 
        display: 'flex', 
        flexDirection: 'column', 
        color: 'white', 
        fontFamily: '"Outfit", sans-serif',
        overflow: 'hidden'
      }}
    >
      {/* Barra de Progreso */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: `${scrollProgress}%`, height: '4px', background: '#f59e0b', zIndex: 1000, transition: 'width 0.1s linear' }} />

      {/* Header Táctico Premium */}
      <header style={{ 
          padding: '1.2rem 2.5rem', 
          background: 'rgba(2, 6, 23, 0.98)', 
          backdropFilter: 'blur(20px)', 
          borderBottom: '1px solid rgba(245, 158, 11, 0.3)', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          zIndex: 500,
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: '#f59e0b', color: 'black', padding: '3px 12px', fontWeight: '950', borderRadius: '4px', fontSize: '0.65rem', letterSpacing: '1px' }}>VLS INVESTIGACIÓN TÁCTICA</div>
            <div style={{ fontSize: '0.7rem', fontWeight: '800', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '2px' }}>EXPEDIENTE VLS-2026-VIAL — LA SERENA</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
          <button 
            onClick={handleShare}
            style={{ 
                background: 'rgba(255, 255, 255, 0.05)', 
                border: '1px solid rgba(255,255,255,0.1)', 
                color: 'white', 
                padding: '0.7rem 1.4rem', 
                borderRadius: '50px', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '0.75rem',
                fontWeight: '900',
                transition: 'all 0.3s'
            }}
          >
            <Share2 size={16} /> COMPARTIR
          </button>
          
          <button 
            onClick={onClose} 
            style={{ 
                background: '#ef4444', 
                border: 'none', 
                color: 'white', 
                padding: '0.7rem 1.8rem', 
                borderRadius: '50px', 
                fontWeight: '950', 
                fontSize: '0.75rem',
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                boxShadow: '0 8px 25px rgba(239, 68, 68, 0.4)'
            }}
          >
            TERMINAR <X size={18} />
          </button>
        </div>
      </header>

      <div id="vial-report-scroll" style={{ flex: 1, overflowY: 'auto', scrollBehavior: 'smooth' }}>
        
        {/* Hero Section */}
        <section style={{ minHeight: '85vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 2rem', textAlign: 'center', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(245, 158, 11, 0.12) 0%, transparent 75%)', zIndex: 0 }} />
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ maxWidth: '1000px', position: 'relative', zIndex: 1 }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.2rem', marginBottom: '2.5rem' }}>
              <span style={{ 
                  background: 'rgba(245, 158, 11, 0.15)', 
                  border: '1px solid rgba(245, 158, 11, 0.4)', 
                  color: '#f59e0b', 
                  padding: '6px 20px', 
                  borderRadius: '30px', 
                  fontSize: '0.8rem', 
                  fontWeight: '950', 
                  letterSpacing: '3px' 
              }}>REPORTAJE DE INVESTIGACIÓN</span>
              <span style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: '700', padding: '6px 15px', background: 'rgba(255,255,255,0.05)', borderRadius: '30px' }}>
                <Clock size={16} /> 8 MIN LECTURA
              </span>
            </div>
            
            <h1 style={{ 
                fontSize: 'clamp(3rem, 8vw, 6rem)', 
                fontWeight: '950', 
                lineHeight: '0.9', 
                letterSpacing: '-3px', 
                marginBottom: '2rem', 
                textTransform: 'uppercase',
                color: 'white'
            }}>
              CRISIS VIAL: EL <br /> <span style={{ color: '#f59e0b' }}>LABERINTO DE ASFALTO</span>
            </h1>
            
            <p style={{ 
                fontSize: '1.4rem', 
                color: 'rgba(255, 255, 255, 0.6)', 
                maxWidth: '850px', 
                margin: '0 auto 4rem', 
                lineHeight: '1.5',
                fontWeight: '500'
            }}>
              Anatomía de una infraestructura fallida y el impacto <br /> en la seguridad y economía de los vecinos de La Serena.
            </p>

            <div style={{ 
                maxWidth: '700px',
                margin: '0 auto',
                padding: '2.5rem', 
                background: 'rgba(255, 255, 255, 0.02)', 
                border: '1px solid rgba(255, 255, 255, 0.08)', 
                borderRadius: '35px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '2rem', 
                textAlign: 'left',
                backdropFilter: 'blur(10px)'
            }}>
              <div style={{ 
                  background: 'linear-gradient(135deg, #f59e0b 0%, #92400e 100%)', 
                  padding: '18px', 
                  borderRadius: '20px', 
                  boxShadow: '0 10px 25px rgba(245, 158, 11, 0.3)' 
              }}>
                <Construction size={36} color="black" />
              </div>
              <div>
                <p style={{ margin: '0 0 5px 0', fontWeight: '950', fontSize: '1.1rem', letterSpacing: '0.5px' }}>AUTORÍA INTELECTUAL VLS</p>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.5)', lineHeight: '1.4' }}>
                  Reporte técnico de la Unidad de Gestión de Bienes Públicos <br /> de Vecinos La Serena.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Content Section */}
        <section style={{ maxWidth: '850px', margin: '0 auto', padding: '4rem 1.5rem' }}>
          
          {CHAPTERS.map((chapter) => (
            <motion.div 
              key={chapter.id} 
              id={chapter.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              style={{ marginBottom: '6rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ background: chapter.color, padding: '12px', borderRadius: '12px', color: 'white' }}>
                  <SafeIcon icon={chapter.icon} size={24} />
                </div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: '900', margin: 0, color: chapter.color }}>{chapter.title}</h2>
              </div>

              <div style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'rgba(255, 255, 255, 0.85)', textAlign: 'justify' }}>
                <p>{chapter.content}</p>
              </div>

              {chapter.technicalDetails && (
                <div style={{ background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: '24px', padding: '2.5rem', marginTop: '2rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                    {chapter.technicalDetails.map((f, fi) => (
                      <div key={fi}>
                        <div style={{ fontSize: '0.75rem', fontWeight: '900', color: '#f59e0b', marginBottom: '0.5rem', textTransform: 'uppercase' }}>{f.id}</div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '0.5rem', color: 'white' }}>{f.title}</h4>
                        <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', margin: 0 }}>{f.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {chapter.isBackoffice && (
                <div style={{ marginTop: '2.5rem', padding: '2rem', background: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '24px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#38bdf8', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Camera size={24} /> REGISTRO DE BACHE EN TIEMPO REAL
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <label 
                      htmlFor="vial-photo" 
                      style={{ background: '#38bdf8', color: '#000', padding: '1rem', borderRadius: '15px', fontWeight: '950', textAlign: 'center', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
                    >
                      <Camera size={24} /> ABRIR CÁMARA / SUBIR EVIDENCIA
                    </label>
                    <input type="file" id="vial-photo" accept="image/*" capture="environment" style={{ display: 'none' }} />
                  </div>
                </div>
              )}
            </motion.div>
          ))}

          {/* Comentarios */}
          <section style={{ marginTop: '4rem', padding: '3rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '32px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <CommentSection themeColor="#f59e0b" />
          </section>

        </section>
      </div>
    </div>
  );
}
