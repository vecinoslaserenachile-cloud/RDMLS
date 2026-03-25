import React from 'react';
import { motion } from 'framer-motion';
import Hotspot from './Hotspot';

export default function SVGBackground({ scene, onSectorClick }) {
  const SECTORES = [
    { id: 'lacompanias', name: 'Las Compañías', x: '72%', y: '35%', zoom: 'North' },
    { id: 'laantena', name: 'La Antena / La Florida', x: '75%', y: '48%', zoom: 'East' },
    { id: 'tierrasgenerosas', name: 'Sector Rural (Valles)', x: '78%', y: '65%', zoom: 'Rural' },
    { id: 'avenidadelmar', name: 'Sector Avenida del Mar', x: '68%', y: '55%', zoom: 'West' }
  ];

  return (
    <div className="svg-wrapper" style={{ position: 'relative', width: '1200px', height: '800px' }}>
      <svg viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow">
             <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
             <feMerge>
                <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
             </feMerge>
          </filter>
        </defs>

        {/* Tuberías de Asesoría (Escena 3: Flujo de Luz) */}
        <motion.path
          d="M 600 200 L 400 300 L 400 500" 
          stroke={scene >= 3 ? "#fbbf24" : "rgba(255,255,255,0.1)"}
          strokeWidth="4"
          strokeDasharray="10 10"
          animate={scene === 3 ? { strokeDashoffset: [0, -100] } : {}}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        />
        
        <circle cx="600" cy="150" r="40" fill={scene === 2 ? "#fbbf24" : "#1e293b"} />
        <text x="600" y="155" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">ALCALDÍA</text>

        <motion.path
          d="M 850 300 Q 950 400 850 700 L 700 700 Q 650 400 700 300 Z"
          fill={scene === 5 ? "rgba(251, 191, 36, 0.15)" : "rgba(255,255,255,0.05)"}
          stroke={scene === 5 ? "#fbbf24" : "rgba(255,255,255,0.2)"}
          strokeWidth="2"
          animate={scene === 5 ? { filter: "url(#glow)" } : ""}
        />
      </svg>

      {scene === 5 && SECTORES.map(sec => (
        <Hotspot 
          key={sec.id}
          x={sec.x} 
          y={sec.y} 
          title={sec.name} 
          onClick={() => onSectorClick(sec)}
        />
      ))}

      <style>{`
        .svg-wrapper { display: flex; align-items: center; justify-content: center; transform-origin: center; }
        svg { width: 100%; height: 100%; }
      `}</style>
    </div>
  );
}
