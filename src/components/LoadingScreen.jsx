import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ isSyncing = false }) => {
  const host = (window.location.hostname || window.location.host || '').toLowerCase();
  const isEntrevecinas = host.includes('entrevecinas.cl');
  // Detecta RDMLS con máxima cobertura — también cubre la ruta /radio en VLS
  const isRDMLS = host.includes('rdmls') || host.includes('rdmk') || host.includes('imls') || host.includes('rds') || (host.includes('laserena.cl') && !host.includes('vecinos') && !host.includes('prendes')) || host.includes('prendes-vls') || window.location.pathname.includes('/radio') || host.includes('localhost') || window.location.search.includes('rdmls');
  const isPeregrino = host.includes('peregrino') || host.includes('nuevoperegrino.cl') || host.includes('nuevo-peregrino') || window.location.pathname.includes('/peregrino');
  const isPrendesLegacy = host.includes('vecinosmart.cl');

  // ── VECINOSMART: Showroom Evolution Loader (SIN FARO) ────────────────
  if (isPrendesLegacy) {
    return (
      <div style={{
        height: '100vh', width: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', background: '#020617',
        color: 'white', fontFamily: 'Outfit, sans-serif'
      }}>
        <div style={{ color: '#38bdf8', fontSize: '2.5rem', fontWeight: 950, letterSpacing: '8px', marginBottom: '1rem', textAlign: 'center' }}>
          SMART COMUNA
        </div>
        <div style={{ fontSize: '0.8rem', color: 'rgba(56, 189, 248, 0.6)', letterSpacing: '4px', fontWeight: 700, marginBottom: '3rem', textAlign: 'center' }}>
          EVOLUTION SHOWROOM
        </div>
        <div style={{ width: '300px', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '15px', overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 4, ease: 'linear' }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #1e3a8a, #38bdf8, #1e3a8a)',
              borderRadius: '15px',
              boxShadow: '0 0 20px rgba(56, 189, 248, 0.5)'
            }}
          />
        </div>
        <div style={{ marginTop: '2rem', fontSize: '0.6rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '3px' }}>
          CARGANDO ECOSISTEMA SOBERANO...
        </div>
      </div>
    );
  }

  // ── RDMLS: Loader institucional dorado (SIN FARO) ────────────────────
  if (isRDMLS) {
    return (
      <div style={{
        height: '100vh', width: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', background: '#0a0a0a',
        color: 'white', fontFamily: 'Inter, sans-serif'
      }}>
        <div style={{ color: '#FFD700', fontSize: '2.2rem', fontWeight: 950, letterSpacing: '6px', marginBottom: '0.5rem', textAlign: 'center' }}>
          RDMLS
        </div>
        <div style={{ fontSize: '0.7rem', color: 'rgba(255,215,0,0.55)', letterSpacing: '3px', fontWeight: 700, marginBottom: '2.5rem', textAlign: 'center' }}>
          RADIO DIGITAL MUNICIPAL LA SERENA
        </div>
        <div style={{ width: '260px', height: '4px', background: 'rgba(255,215,0,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 3.5, ease: 'linear' }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #92400e, #FFD700)',
              borderRadius: '10px',
              boxShadow: '0 0 15px rgba(255,215,0,0.5)'
            }}
          />
        </div>
        <div style={{ marginTop: '1.8rem', fontSize: '0.55rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '3px' }}>
          SINTONIZANDO SEÑAL OFICIAL...
        </div>
      </div>
    );
  }

  // ── PEREGRINO: Loader minimalista (SIN FARO) ────────────────────────
  if (isPeregrino) {
    return (
      <div style={{
        height: '100vh', width: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', background: '#020617',
        color: 'white', fontFamily: 'Inter, sans-serif'
      }}>
        <div style={{ color: '#3b82f6', fontSize: '2rem', fontWeight: 950, letterSpacing: '8px', marginBottom: '1rem', textAlign: 'center' }}>
          NUEVO PEREGRINO
        </div>
        <div style={{ width: '200px', height: '2px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '10px', overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 3, ease: 'linear' }}
            style={{
              height: '100%',
              background: '#3b82f6',
              boxShadow: '0 0 10px #3b82f6'
            }}
          />
        </div>
        <div style={{ marginTop: '2rem', fontSize: '0.6rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '4px' }}>
          SINCRONIZANDO ARCHIVO CULTURAL...
        </div>
      </div>
    );
  }

  // ── VLS / Entrevecinas: Loader con Faro Institucional ─────────────────
  const isVLS = host.includes('vecinoslaserena.cl') || host.includes('vls.cl') || host.includes('entrevecinas.cl');

  if (isVLS) {
    return (
      <div style={{ 
        height: '100vh', width: '100%', display: 'flex', flexDirection: 'column', 
        alignItems: 'center', justifyContent: 'center', background: '#020617', 
        color: 'white', fontFamily: 'Inter, sans-serif', position: 'relative', overflow: 'hidden'
      }}>
        
        {/* Animación de Faro Institucional VLS */}
        <div style={{ position: 'relative', zIndex: 1, width: '144px', height: '176px', marginBottom: '2rem' }}>
            <svg viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                <defs>
                     <linearGradient id="beamGradientHorizontal" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse">
                         <stop offset="0%" stopColor="white" stopOpacity="0.9" />
                         <stop offset="100%" stopColor="white" stopOpacity="0" />
                     </linearGradient>
                     <filter id="strongGlow">
                         <feGaussianBlur stdDeviation="6" result="blur"/>
                         <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                     </filter>
                     <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
                         <stop offset="0%" stopColor="white" stopOpacity="1" />
                         <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.5" />
                         <stop offset="100%" stopColor="transparent" opacity="0" />
                     </radialGradient>
                     <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                       <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
                       <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.6" />
                     </linearGradient>
                 </defs>
  
                 {/* OLA DE MAR */}
                 <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                    <motion.path 
                       d="M 120 115 Q 100 110 80 115 Q 65 120 58 115"
                       stroke="url(#waveGrad)" strokeWidth="1.5" strokeLinecap="round"
                       animate={{ x: [10, -30], opacity: [0, 1, 0] }}
                       transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                 </motion.g>
  
                 {/* Cuerpo del Faro */}
                 <motion.path
                     d="M 40 25 L 60 25 L 64 100 L 36 100 Z"
                     stroke="white" strokeWidth="4" strokeLinecap="round"
                     initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                     transition={{ duration: 0.8, ease: "easeOut" }}
                 />
                 
                 {/* Ventanas */}
                 {[40, 55, 70, 85].map((y, i) => (
                   <motion.rect 
                       key={y} x="47" y={y} width="6" height="6"
                       initial={{ opacity: 0 }}
                       animate={{ opacity: [0.3, 1, 0.3] }}
                       transition={{ delay: i * 0.2, duration: 2, repeat: Infinity }}
                       fill="white"
                   />
                 ))}
                 
                 {/* Cúpula y Fanal Superior */}
                 <motion.path
                     d="M 37 25 L 63 25 M 38 20 L 62 20 L 62 25 L 38 25 Z M 44 20 L 56 20 L 56 15 L 44 15 Z"
                     stroke="white" strokeWidth="2"
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                 />
  
                 {/* Base Monumental */}
                 <motion.path
                     d="M 15 100 L 85 100 L 90 115 L 10 115 Z"
                     stroke="white" strokeWidth="3"
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                 />
  
                 {/* Motor de Luz */}
                 <motion.g 
                      transform="translate(50, 17.5)"
                      animate={{ rotate: [0, 18, -18, 0] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  >
                      <path d="M 0 0 L 500 -60 L 500 60 Z" fill="white" style={{ opacity: 0.5, filter: 'blur(5px)' }} />
                      <path d="M 0 0 L -450 -50 L -450 50 Z" fill="white" style={{ opacity: 0.18, filter: 'blur(8px)' }} />
                  </motion.g>
  
                 {/* Linterna pulsante */}
                 <motion.circle 
                     cx="50" cy="17.5" r="4" fill="white"
                     animate={{ scale: [1, 1.8, 1], opacity: [0.9, 1, 0.9] }}
                     transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                 />
                 {/* Halo */}
                 <motion.circle 
                     cx="50" cy="17.5" r="9" fill="url(#lampGlow)"
                     animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                     transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                 />
            </svg>
        </div>
  
        <div style={{ textAlign: 'center', zIndex: 2 }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '0.6em', color: 'white', opacity: 1, display: 'block', marginBottom: '1.2rem', textShadow: '0 0 20px white' }}>
            SOBERANÍA DIGITAL — CIELO PROTEGIDO — v4.5
          </span>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'white', marginBottom: '2rem' }}>
            {isEntrevecinas ? 'Entrevecinas: Sintonizando...' : 'Iniciando Red Vecinal...'}
          </h2>
          
          <div style={{ width: '350px', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '15px', overflow: 'hidden', marginInline: 'auto', boxShadow: '0 0 25px rgba(0,0,0,0.8)' }}>
              <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: '100%' }} 
                  transition={{ duration: 4.5, ease: "linear" }}
                  style={{ height: '100%', background: 'linear-gradient(90deg, transparent, white, transparent)', boxShadow: '0 0 30px white' }}
              />
          </div>
        </div>
  
        {isSyncing && (
          <div style={{ position: 'absolute', bottom: '4rem', opacity: 0.8, fontSize: '0.75rem', fontWeight: 'bold', color: 'white', letterSpacing: '0.25em', textShadow: '0 0 8px white' }}>
            VLS_OS_GLOBAL_ENGINE_v4.2.7_SINGLE_INSTANCE_INSTANT
          </div>
        )}
      </div>
    );
  }

  // DEFAULT: Loader minimalista (Soberano, sin faro)
  return (
    <div style={{
      height: '100vh', width: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', background: '#020617',
      color: 'white', fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{ width: '250px', height: '2px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 3.5, ease: 'linear' }}
          style={{ height: '100%', background: 'white', boxShadow: '0 0 15px white' }}
        />
      </div>
      <div style={{ marginTop: '2rem', fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '4px', fontWeight: 900 }}>
        INICIANDO ECOSISTEMA SOBERANO...
      </div>
    </div>
  );
};

export default LoadingScreen;
