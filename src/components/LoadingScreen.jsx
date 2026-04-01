import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ isSyncing = false }) => {
  const host = (window.location.hostname || window.location.host || '').toLowerCase();
  const isRDMLS = host.includes('rdmls') || (host.includes('laserena.cl') && !host.includes('vecinos'));
  const isEntrevecinas = host.includes('entrevecinas.cl');

  return (
    <div style={{ 
      height: '100vh', width: '100%', display: 'flex', flexDirection: 'column', 
      alignItems: 'center', justifyContent: 'center', background: '#020617', 
      color: 'white', fontFamily: 'Inter, sans-serif', position: 'relative', overflow: 'hidden'
    }}>
      
      {/* Animación de Faro en Líneas Vectoriales (INSTANT ON v21) */}
      <div style={{ position: 'relative', zIndex: 1, width: '180px', height: '220px', marginBottom: '2rem' }}>
          <svg viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              <defs>
                  <linearGradient id="beamGradientHorizontal" x1="50" y1="18" x2="350" y2="18" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="white" stopOpacity="1" />
                      <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="beamGradientLeft" x1="50" y1="18" x2="-250" y2="18" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="white" stopOpacity="1" />
                      <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                  <filter id="glow">
                      <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                      <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                  </filter>
                  <radialGradient id="frontBeamGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="white" stopOpacity="1" />
                      <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </radialGradient>
              </defs>

              {/* Cuerpo del Faro (INSTANTÁNEO) */}
              <motion.path
                  d="M 40 25 L 60 25 L 64 100 L 36 100 Z"
                  stroke="white" strokeWidth="4" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
              />
              <motion.path
                  d="M 37 25 L 63 25 M 38 20 L 62 20 L 62 25 L 38 25 Z M 44 20 L 56 20 L 56 15 L 44 15 Z M 50 15 L 50 10"
                  stroke="white" strokeWidth="3"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
              />
              <motion.path
                  d="M 15 100 L 85 100 L 90 115 L 10 115 Z M 20 100 L 20 95 L 25 95 L 25 100 M 75 100 L 75 95 L 80 95 L 80 100"
                  stroke="white" strokeWidth="3"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
              />

              {/* La Cúpula / Fanal (INSTANTÁNEA) */}
              <motion.circle 
                  cx="50" cy="18" r="10" fill="white"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
              />

              {/* HACES DE LUZ (GIRO INFINITO INSTANTÁNEO) */}
              <motion.path
                  d="M 50 18 L 400 -20 L 400 56 Z"
                  fill="url(#beamGradientHorizontal)"
                  initial={{ opacity: 0, scaleX: 0, originX: 0 }}
                  animate={{ opacity: [0, 1, 0.8, 1, 0], scaleX: [0, 2.5, 1.8, 2.2, 0] }}
                  transition={{ duration: 4, repeat: Infinity, repeatDelay: 0 }}
                  style={{ filter: 'url(#glow)' }}
              />
              <motion.path
                  d="M 50 18 L -300 -20 L -300 56 Z"
                  fill="url(#beamGradientLeft)"
                  initial={{ opacity: 0, scaleX: 0, originX: 1 }}
                  animate={{ opacity: [0, 1, 0.8, 1, 0], scaleX: [0, 2.5, 1.8, 2.2, 0] }}
                  transition={{ duration: 4, repeat: Infinity, repeatDelay: 0 }}
                  style={{ filter: 'url(#glow)' }}
              />

              {/* LENTE FLASH FRONTAL (INSTANTÁNEO) */}
              <motion.circle 
                  cx="50" cy="18" r="30" fill="url(#frontBeamGradient)"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0.7, 1, 0], scale: [0, 6, 2.5, 5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, repeatDelay: 0.5 }}
                  style={{ filter: 'blur(18px)' }}
              />

              {/* Resplandor Central Pulsante (INSTANTÁNEO) */}
              <motion.circle 
                  cx="50" cy="18" r="16" fill="white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.6, 1, 0.8, 1], scale: [0.8, 2, 1.5, 1.8] }}
                  transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                  style={{ filter: 'blur(10px)' }}
              />
          </svg>
      </div>

      <div style={{ textAlign: 'center', zIndex: 2 }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '0.6em', color: 'white', opacity: 1, display: 'block', marginBottom: '1.2rem', textShadow: '0 0 20px white' }}>SOBERANÍA DIGITAL — CIELO PROTEGIDO</span>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'white', marginBottom: '2rem' }}>
          {isEntrevecinas ? 'Entrevecinas: Sintonizando...' :
            (isRDMLS ? 'RDMLS: Estableciendo señal...' : 'Iniciando Red Vecinal...')}
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
};

export default LoadingScreen;
