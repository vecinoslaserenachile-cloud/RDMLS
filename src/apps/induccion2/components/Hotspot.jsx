import React from 'react';
import { motion } from 'framer-motion';

export default function Hotspot({ x, y, title, onClick }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.2 }}
      onClick={onClick}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        cursor: 'pointer',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <div className="radar-circle">
        <div className="ripple" />
        <div className="core" />
      </div>
      
      <motion.span 
        className="hotspot-label"
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        {title}
      </motion.span>

      <style>{`
        .radar-circle { width: 30px; height: 30px; position: relative; }
        .core { width: 12px; height: 12px; background: #fbbf24; border-radius: 50%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); border: 2px solid white; box-shadow: 0 0 15px #fbbf24; }
        .ripple { width: 100%; height: 100%; border: 2px solid #fbbf24; border-radius: 50%; animation: pulse 2s infinite; opacity: 0; }
        .hotspot-label { background: rgba(0,0,0,0.8); color: white; font-size: 0.65rem; padding: 2px 8px; border-radius: 4px; margin-top: 5px; font-weight: bold; white-space: nowrap; border: 1px solid rgba(251, 191, 36, 0.5); }
        @keyframes pulse { 0% { transform: scale(0.5); opacity: 0.8; } 100% { transform: scale(2.5); opacity: 0; } }
      `}</style>
    </motion.div>
  );
}
