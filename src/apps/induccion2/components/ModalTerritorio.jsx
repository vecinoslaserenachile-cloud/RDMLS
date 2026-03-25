import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Map as MapIcon, Users, Landmark, Zap } from 'lucide-react';

const SECTOR_DATA = {
  lacompanias: {
    title: "MACROSECTOR: LAS COMPAÑÍAS",
    desc: "El corazón poblacional de la comuna. Aquí la gestión municipal se enfoca en la delegación territorial y servicios de salud primaria.",
    focalPoint: "Norte de la ciudad",
    metric: "120.000+ vecinos",
    color: "#fbbf24",
    img: "https://images.unsplash.com/photo-1544383335-917366bb9a20?auto=format&fit=crop&q=80&w=400"
  },
  laantena: {
    title: "MACROSECTOR: LA ANTENA",
    desc: "Sector histórico sobre la terraza de la ciudad. Foco en recuperación de espacios públicos y fuerte arraigo comunitario.",
    focalPoint: "Miradores de la ciudad",
    metric: "35.000+ vecinos",
    color: "#38bdf8",
    img: "https://images.unsplash.com/photo-1551288049-bbda48658a7d?auto=format&fit=crop&q=80&w=400"
  },
  tierrasgenerosas: {
    title: "SECTOR RURAL / VALLES",
    desc: "Extenso territorio de valles y cuencas. Gestión enfocada en el agua rural (APR) y conectividad sustentable.",
    focalPoint: "Valles del Elqui",
    metric: "60% del territorio",
    color: "#10b981",
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400"
  },
  avenidadelmar: {
    title: "BORDE COSTERO / AV. DEL MAR",
    desc: "Base del turismo y desarrollo económico regional. Gestión crítica en seguridad estival y medioambiente marino.",
    focalPoint: "6km de Borde Costero",
    metric: "Epicentro Turístico",
    color: "#f43f5e",
    img: "https://images.unsplash.com/photo-1544383335-917366bb9a20?auto=format&fit=crop&q=80&w=400"
  }
};

export default function ModalTerritorio({ sectorId, onClose }) {
  if (!sectorId || !SECTOR_DATA[sectorId]) return null;
  const data = SECTOR_DATA[sectorId];

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="modal-overlay"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.8, y: 50 }} 
        animate={{ scale: 1, y: 0 }} 
        exit={{ scale: 0.8, y: 50 }}
        className="modal-card"
        onClick={e => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}><X size={20} /></button>
        
        <div className="modal-inner">
          <div className="modal-header">
            <div className="icon-badge" style={{ background: `${data.color}20`, color: data.color }}>
               <MapIcon size={24} />
            </div>
            <h3>{data.title}</h3>
          </div>

          <div className="modal-content">
             <div className="text-side">
                <p className="description">{data.desc}</p>
                <div className="stats-grid">
                   <div className="stat">
                      <Users size={16} color={data.color} /> 
                      <span>{data.metric}</span>
                   </div>
                   <div className="stat">
                      <Landmark size={16} color={data.color} /> 
                      <span>{data.focalPoint}</span>
                   </div>
                </div>
                <div className="action-feedback">
                   <Zap size={14} /> Gestión Territorial Activa
                </div>
             </div>
             
             <div className="visual-side">
                <img src={data.img} alt={data.title} />
                <div className="map-overlay-vls">
                   <div className="pulse-point" style={{ background: data.color }} />
                </div>
             </div>
          </div>
        </div>
      </motion.div>

      <style>{`
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(15px); z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 2rem; }
        .modal-card { width: 100%; max-width: 800px; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border: 1px solid rgba(255,255,255,0.1); border-radius: 40px; position: relative; overflow: hidden; }
        .close-btn { position: absolute; top: 2rem; right: 2rem; background: rgba(255,255,255,0.05); border: none; color: white; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.3s; z-index: 100; }
        .modal-inner { padding: 3rem; }
        .modal-header { display: flex; align-items: center; gap: 1.5rem; margin-bottom: 2rem; }
        .icon-badge { padding: 12px; border-radius: 16px; border: 1px solid currentColor; display: flex; align-items: center; justify-content: center; }
        .modal-content { display: grid; grid-template-columns: 1.2fr 1fr; gap: 3rem; }
        .description { font-size: 1.1rem; color: #94a3b8; line-height: 1.6; margin-bottom: 2rem; }
        .stats-grid { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem; }
        .stat { display: flex; align-items: center; gap: 12px; color: white; font-weight: bold; font-size: 0.9rem; }
        .action-feedback { display: flex; align-items: center; gap: 8px; color: #fbbf24; font-size: 0.75rem; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; }
        .visual-side { position: relative; border-radius: 30px; overflow: hidden; height: 250px; border: 1px solid rgba(255,255,255,0.1); }
        .visual-side img { width: 100%; height: 100%; object-fit: cover; opacity: 0.6; }
        .map-overlay-vls { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle, transparent 20%, #0f172a 80%); }
        .pulse-point { width: 15px; height: 15px; border-radius: 50%; }
        @keyframes scaleUp { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(3); opacity: 0; } }
      `}</style>
    </motion.div>
  );
}
