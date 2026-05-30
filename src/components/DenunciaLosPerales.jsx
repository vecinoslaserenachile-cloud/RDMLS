import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Clock, Share2, AlertTriangle, Zap, Shield, Gavel, Heart, 
  MapPin, Camera, Info, ExternalLink, ChevronRight, MessageSquare,
  ShieldAlert, UserCheck, Scale, Building2, Smartphone, Volume2,
  AlertCircle, Droplets, Waves, Hammer, FileText, Play, Pause, Disc,
  Presentation, Search
} from 'lucide-react';
import CommentSection from './CommentSection';

const SafeIcon = ({ icon: Icon, size, color }) => {
  if (!Icon) return <AlertCircle size={size} color={color} />;
  return <Icon size={size} color={color} />;
};

const CHAPTERS = [
  {
    id: 'intro',
    title: 'Anatomía de una Negligencia Sanitaria',
    content: `La intersección de Av. Los Perales con Aníbal Pinto se ha transformado en un símbolo de la desidia corporativa. Tras una reparación de matriz por parte de Aguas del Valle, la calzada fue abandonada sin pavimento definitivo, dejando una "zanja de tierra" que proyecta piedras a alta velocidad hacia escolares y peatones. No es solo un bache; es un proyectil latente en el corazón de un barrio educativo.`,
    icon: Info,
    color: '#3b82f6'
  },
  {
    id: 'cap1',
    title: 'CAPÍTULO I: Matriz de Criticidad (Nivel 10/10)',
    content: `Nuestra unidad de investigación ha evaluado el riesgo en terreno. El flujo del "Lunes Escolar" convierte este obstáculo en un cuello de botella crítico. El frenado brusco de vehículos no solo entorpece el tránsito, sino que genera nubes de polvo y proyectiles de grava que amenazan la integridad física de los alumnos del Colegio Víctor Domingo Silva.`,
    technicalDetails: [
      { id: 'Riesgo 1', title: 'Proyectiles de Grava', desc: 'Piedras sueltas disparadas por neumáticos hacia las veredas. Riesgo de lesiones graves.' },
      { id: 'Riesgo 2', title: 'Daño Estructural', desc: 'Desnivel de +8cm que impacta directamente en ejes, amortiguación y neumáticos.' },
      { id: 'Riesgo 3', title: 'Seguridad Ciclista', desc: 'Inestabilidad total para vehículos de dos ruedas en zona de alto tráfico.' }
    ],
    icon: AlertTriangle,
    color: '#ef4444'
  },
  {
    id: 'legal',
    title: 'CAPÍTULO II: El Escudo Legal y la SISS',
    content: `La Ley General de Servicios Sanitarios (DFL N° 382) es clara: la obra no termina hasta que el pavimento sea restituido. La Superintendencia de Servicios Sanitarios (SISS) tiene la facultad de cursar multas de hasta 1.000 UTM por negligencias que afecten la seguridad de la población.`,
    icon: Gavel,
    color: '#10b981'
  },
  {
    id: 'backoffice',
    title: 'REGISTRO DE EVIDENCIA SANITARIA',
    content: `Si eres vecino o apoderado del sector, captura aquí el estado actual de la zanja. Tu reporte alimenta la denuncia colectiva ante la SISS y la Municipalidad.`,
    isBackoffice: true,
    icon: Camera,
    color: '#38bdf8'
  },
  {
    id: 'dossier',
    title: 'EXPEDIENTE TÉCNICO VLS: Visor PDF',
    content: 'Accede al informe detallado "Los Perales y Aníbal Pinto", que recopila la cronología técnica del colapso de matriz y la falta de reposición de la carpeta asfáltica. Este documento es clave para la fiscalización ciudadana.',
    isPdf: true,
    file: '/media/perales/Perales_Auditoria_Forense.pdf',
    icon: FileText,
    color: '#f59e0b'
  },
  {
    id: 'pptx',
    title: 'PRESENTACIÓN TÉCNICA: Auditoría Forense',
    content: 'Análisis detallado en formato PPTX sobre la falla estructural y los retrasos en la pavimentación de Los Perales. Visualiza la auditoría forense vial completa.',
    isPptx: true,
    file: '/media/perales/Perales_Auditoria_Forense.pptx',
    icon: Presentation, // Fix: Use correct imported Lucide icon
    color: '#ef4444'
  },
  {
    id: 'podcast',
    title: 'PODCAST: El Efecto Proyectil',
    content: 'Unidad de Investigación VLS presenta: Análisis acústico y testimonios sobre el impacto de la grava suelta. Escucha el expediente sonoro que describe el riesgo vial en tiempo real.',
    isPodcast: true,
    file: '/media/perales/Perales_Podcast.mp3',
    icon: Disc,
    color: '#a855f7'
  },
  {
    id: 'reporte',
    title: 'REPORTE DE CAMPO: La Peligrosa Zanja',
    content: 'Crónica in situ sobre el estado de la calzada de Los Perales tras la intervención de Aguas del Valle. Un registro de audio crudo que captura la realidad de la negligencia urbana.',
    isPodcast: true,
    file: '/media/perales/Perales_Reporte_Zanja.m4a',
    icon: Volume2,
    color: '#06b6d4'
  }
];

export default function DenunciaLosPerales({ onClose = () => window.location.href = '/' }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeAudioId, setActiveAudioId] = useState(null); // null, 'podcast', 'reporte'
  const [viewerUrl, setViewerUrl] = useState(null);
  const [viewerType, setViewerType] = useState('pdf');

  useEffect(() => {
    const el = document.getElementById('perales-report-scroll');
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
    const text = 'VLS Investigación: Peligro Sanitario en Los Perales / Aníbal Pinto. Expediente VLS-2026-PERALES.';
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
      <div style={{ position: 'fixed', top: 0, left: 0, width: `${scrollProgress}%`, height: '4px', background: '#3b82f6', zIndex: 1000, transition: 'width 0.1s linear' }} />

      {/* VLS INTERNAL HUB VIEWER */}
      <AnimatePresence>
        {viewerUrl && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{ position: 'fixed', inset: 0, zIndex: 200000, background: 'rgba(2, 6, 23, 0.98)', display: 'flex', flexDirection: 'column', padding: '1rem', paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '20px', border: '1px solid rgba(59, 130, 246, 0.4)', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '200px' }}>
                    <div style={{ width: '12px', height: '12px', background: '#3b82f6', borderRadius: '50%', boxShadow: '0 0 10px #3b82f6', flexShrink: 0 }} />
                    <h2 style={{ fontSize: '0.8rem', fontWeight: 950, letterSpacing: '2px', color: '#3b82f6', margin: 0, textOverflow: 'ellipsis', overflow: 'hidden' }}>VLS DOC VIEWER</h2>
                </div>
                <button 
                  onClick={() => setViewerUrl(null)}
                  style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.7rem 2.5rem', borderRadius: '15px', fontWeight: 950, cursor: 'pointer', boxShadow: '0 5px 15px rgba(239, 68, 68, 0.3)' }}
                >
                  CERRAR EXPEDIENTE
                </button>
            </div>
            <div style={{ flex: 1, borderRadius: '35px', overflow: 'hidden', background: '#000', border: '1px solid rgba(255,255,255,0.1)' }}>
              <iframe src={viewerUrl} style={{ width: '100%', height: '100%', border: 'none' }} title="VLS Dashboard Viewer" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Táctico Premium */}
      <header style={{ 
          padding: '1.2rem 2.5rem', 
          background: 'rgba(2, 6, 23, 0.98)', 
          backdropFilter: 'blur(20px)', 
          borderBottom: '1px solid rgba(59, 130, 246, 0.3)', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          zIndex: 500,
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: '#3b82f6', color: 'white', padding: '3px 12px', fontWeight: '950', borderRadius: '4px', fontSize: '0.65rem', letterSpacing: '1px' }}>VLS INVESTIGACIÓN TÁCTICA</div>
            <div style={{ fontSize: '0.7rem', fontWeight: '800', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '2px' }}>EXPEDIENTE VLS-2026-PERALES — ANÍBAL PINTO</div>
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
                fontWeight: '900'
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

      <div id="perales-report-scroll" style={{ flex: 1, overflowY: 'auto', scrollBehavior: 'smooth' }}>
        
        {/* Hero Section */}
        <section style={{ minHeight: '85vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 2rem', textAlign: 'center', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.12) 0%, transparent 75%)', zIndex: 0 }} />
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ maxWidth: '1000px', position: 'relative', zIndex: 1 }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.2rem', marginBottom: '2.5rem' }}>
              <span style={{ 
                  background: 'rgba(59, 130, 246, 0.15)', 
                  border: '1px solid rgba(59, 130, 246, 0.4)', 
                  color: '#3b82f6', 
                  padding: '6px 20px', 
                  borderRadius: '30px', 
                  fontSize: '0.8rem', 
                  fontWeight: '950', 
                  letterSpacing: '3px' 
              }}>REPORTAJE SANITARIO</span>
              <span style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: '700', padding: '6px 15px', background: 'rgba(255,255,255,0.05)', borderRadius: '30px' }}>
                <Clock size={16} /> 10 MIN LECTURA
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
              PELIGRO SANITARIO: <br /> <span style={{ color: '#3b82f6' }}>LA ZANJA DE LOS PERALES</span>
            </h1>
            
            <p style={{ 
                fontSize: '1.4rem', 
                color: 'rgba(255, 255, 255, 0.6)', 
                maxWidth: '850px', 
                margin: '0 auto 4rem', 
                lineHeight: '1.5',
                fontWeight: '500'
            }}>
              Investigación sobre la obra inconclusa de Aguas del Valle <br /> y el riesgo inminente para la comunidad escolar.
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
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)', 
                  padding: '18px', 
                  borderRadius: '20px', 
                  boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)' 
              }}>
                <Droplets size={36} color="white" />
              </div>
              <div>
                <p style={{ margin: '0 0 5px 0', fontWeight: '950', fontSize: '1.1rem', letterSpacing: '0.5px' }}>AUTORÍA INTELECTUAL VLS</p>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.5)', lineHeight: '1.4' }}>
                  Unidad de Investigación de Servicios Básicos y <br /> Fiscalización de Vecinos La Serena.
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
                <div style={{ background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '24px', padding: '2.5rem', marginTop: '2rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                    {chapter.technicalDetails.map((f, fi) => (
                      <div key={fi}>
                        <div style={{ fontSize: '0.75rem', fontWeight: '900', color: chapter.color, marginBottom: '0.5rem', textTransform: 'uppercase' }}>{f.id}</div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '0.5rem', color: 'white' }}>{f.title}</h4>
                        <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', margin: 0 }}>{f.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {chapter.isBackoffice && (
                <div style={{ marginTop: '2.5rem', padding: '2rem', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '24px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#ef4444', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Camera size={24} /> REGISTRO DE EVIDENCIA (SISS)
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <label 
                      htmlFor="perales-photo" 
                      style={{ background: '#ef4444', color: 'white', padding: '1rem', borderRadius: '15px', fontWeight: '950', textAlign: 'center', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
                    >
                      <Camera size={24} /> ABRIR CÁMARA / SUBIR PRUEBAS
                    </label>
                    <input type="file" id="perales-photo" accept="image/*" capture="environment" style={{ display: 'none' }} />
                  </div>
                </div>
              )}

              {chapter.isPdf && (
                <div style={{ marginTop: '2.5rem', padding: '3rem', background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '35px', textAlign: 'center' }}>
                   <div style={{ width: '80px', height: '80px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', border: '1px solid rgba(59, 130, 246, 0.4)' }}>
                      <FileText size={40} color="#3b82f6" />
                   </div>
                   <h3 style={{ fontSize: '1.4rem', fontWeight: '950', color: 'white', marginBottom: '1rem' }}>SALA DE EVIDENCIA PDF</h3>
                   <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', marginBottom: '2.5rem' }}>Expediente consolidado de la investigación técnica en Los Perales.</p>
                   <button 
                     onClick={() => { 
                         const absoluteUrl = 'https://vecinoslaserena.cl' + chapter.file;
                         const embedUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(absoluteUrl)}&embedded=true`;
                         setViewerType('pdf'); setViewerUrl(embedUrl); 
                     }}
                     style={{ 
                        background: '#3b82f6', color: 'white', padding: '1.2rem 3rem', borderRadius: '18px', 
                        fontWeight: '950', fontSize: '1rem', border: 'none', cursor: 'pointer',
                        boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)',
                        display: 'inline-flex', alignItems: 'center', gap: '12px'
                     }}
                   >
                     ABRIR VISOR VLS <Search size={20} />
                   </button>
                </div>
              )}

              {chapter.isPptx && (
                <div style={{ marginTop: '2.5rem', padding: '3rem', background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '35px', textAlign: 'center' }}>
                   <div style={{ width: '80px', height: '80px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', border: '1px solid rgba(245, 158, 11, 0.4)' }}>
                      <Presentation size={40} color="#f59e0b" />
                   </div>
                   <h3 style={{ fontSize: '1.4rem', fontWeight: '950', color: 'white', marginBottom: '1rem' }}>EVIDENCIA MULTIMEDIA (PPTX)</h3>
                   <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', marginBottom: '2.5rem' }}>Análisis visual y auditoría forense de la infraestructura vial.</p>
                   <button 
                     onClick={() => {
                        const absoluteUrl = 'https://vecinoslaserena.cl' + chapter.file;
                        // Uso de Google Docs Viewer en lugar de Office Live (Suele ser más estable en iframes web para PPTX públicos)
                        const embedUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(absoluteUrl)}&embedded=true`;
                        setViewerType('pptx'); setViewerUrl(embedUrl); 
                     }}
                     style={{ 
                        background: '#f59e0b', color: 'black', padding: '1.2rem 3rem', borderRadius: '18px', 
                        fontWeight: '950', fontSize: '1rem', border: 'none', cursor: 'pointer',
                        boxShadow: '0 10px 30px rgba(245, 158, 11, 0.4)',
                        display: 'inline-flex', alignItems: 'center', gap: '12px'
                     }}
                   >
                     PROYECTAR EN DASHBOARD <ExternalLink size={20} />
                   </button>
                </div>
              )}

              {chapter.isPodcast && (
                <div style={{ marginTop: '2.5rem', padding: '3rem', background: `${chapter.color}10`, border: `1px solid ${chapter.color}44`, borderRadius: '35px', textAlign: 'center' }}>
                   <div style={{ width: '80px', height: '80px', background: `${chapter.color}22`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', border: `2px solid ${chapter.color}` }}>
                      <SafeIcon icon={chapter.icon} size={40} color={chapter.color} className={activeAudioId === chapter.id ? "animate-spin-slow" : ""} />
                   </div>
                   <h3 style={{ fontSize: '1.4rem', fontWeight: '950', color: 'white', marginBottom: '1rem' }}>SALA DE AUDIO VLS</h3>
                   <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', marginBottom: '2.5rem' }}>{chapter.id === 'podcast' ? 'EPISODIO: EFECTO PROYECTIL' : 'CRÓNICA: LA PELIGROSA ZANJA'}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                          <button 
                            onClick={() => {
                              const audio = document.getElementById(`perales-audio-${chapter.id}`);
                              if (activeAudioId === chapter.id) {
                                audio.pause();
                                setActiveAudioId(null);
                              } else {
                                // Pausar otros audios
                                CHAPTERS.filter(c => c.isPodcast).forEach(c => {
                                    const other = document.getElementById(`perales-audio-${c.id}`);
                                    if (other) other.pause();
                                });
                                // Apagar Radio Ambiental Automáticamente
                                window.dispatchEvent(new CustomEvent('vls-stop-radio'));
                                
                                audio.play().catch(() => {});
                                setActiveAudioId(chapter.id);
                              }
                            }}
                            style={{ 
                               width: '80px', height: '80px', background: activeAudioId === chapter.id ? '#ef4444' : chapter.color, 
                               color: 'white', borderRadius: '50%', border: 'none', cursor: 'pointer',
                               display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                               boxShadow: `0 10px 30px ${activeAudioId === chapter.id ? 'rgba(239, 68, 68, 0.4)' : 'rgba(168, 85, 247, 0.4)'}`
                            }}
                          >
                             {activeAudioId === chapter.id ? <Pause size={30} fill="currentColor" /> : <Play size={30} fill="currentColor" style={{ marginLeft: '6px' }} />}
                          </button>
                          
                          <div style={{ textAlign: 'left', flex: 1 }}>
                             <div style={{ fontSize: '0.7rem', color: chapter.color, fontWeight: '950', letterSpacing: '2px' }}>RADIO INVESTIGACIÓN</div>
                             <div style={{ fontSize: '0.9rem', color: 'white', fontWeight: '900' }}>{activeAudioId === chapter.id ? 'ESCUCHANDO AHORA...' : 'LISTO PARA REPRODUCIR'}</div>
                          </div>
                        </div>
                        
                        {/* El control de audio nativo mostrado explícitamente para controlar volumen/tiempo */}
                        <div style={{ marginTop: '10px' }}>
                           <audio 
                             id={`perales-audio-${chapter.id}`} 
                             src={chapter.file} 
                             controls 
                             onEnded={() => setActiveAudioId(null)} 
                             style={{ width: '100%', borderRadius: '30px', filter: 'invert(1) hue-rotate(180deg)' }} 
                           />
                        </div>
                    </div>
                 </div>
              )}
            </motion.div>
          ))}

          {/* Comentarios */}
          <section style={{ marginTop: '4rem', padding: '3rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '32px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <CommentSection themeColor="#3b82f6" />
          </section>

        </section>
      </div>
    </div>
  );
}
