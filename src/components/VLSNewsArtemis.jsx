import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { X, Clock, Share2, Twitter, Facebook, Globe, Rocket, Star, Info } from 'lucide-react';

export default function VLSNewsArtemis({ onClose }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return typeof document !== 'undefined' ? createPortal(
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: '#020617', zIndex: 2147483647, display: 'flex', flexDirection: 'column',
      color: '#f8fafc', fontFamily: "'Outfit', 'Inter', system-ui, sans-serif"
    }}>
      <header style={{
        padding: isMobile ? '1rem' : '1.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.1)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#020617'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: '#3b82f6', color: '#fff', padding: '0.4rem 0.8rem', fontWeight: '900', borderRadius: '4px' }}>VLS ESPACIO</div>
          <span style={{ fontWeight: 'bold', fontSize: '0.8rem', color: '#94a3b8', letterSpacing: '1px' }}>MISIÓN ARTEMIS II</span>
        </div>
        <button onClick={onClose} style={{ background: '#3b82f6', border: 'none', color: 'white', padding: '0.6rem 1.4rem', borderRadius: '50px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          CERRAR <X size={20} />
        </button>
      </header>

      <div style={{ flex: 1, overflowY: 'auto', padding: isMobile ? '2rem 1.5rem' : '4rem 6rem' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', alignItems: 'center' }}>
            <span style={{ background: '#3b82f6', color: '#fff', padding: '4px 12px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '900' }}>NASA HIGH-FIDELITY</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: '900', lineHeight: '1.1', marginBottom: '2rem' }}>
            Artemis II: <span style={{ color: '#3b82f6' }}>El Regreso a la Luna</span>
          </h1>
          
          <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid #3b82f6', borderRadius: '24px', padding: '3rem', marginBottom: '3rem' }}>
            <Rocket size={48} color="#3b82f6" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1rem' }}>Preparativos Finales de la Cápsula Orion</h3>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: '#cbd5e1' }}>
              La misión Artemis II de la NASA es la primera misión tripulada del programa Artemis. Cuatro astronautas volarán alrededor de la Luna, probando los sistemas de soporte vital de la nave espacial Orion para allanar el camino hacia futuras misiones de alunizaje y, eventualmente, misiones a Marte.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '2rem' }}>
            <div style={{ background: '#0f172a', padding: '2rem', borderRadius: '20px' }}>
              <Globe size={32} color="#fbbf24" style={{ marginBottom: '1rem' }} />
              <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Cooperación Internacional</h4>
              <p style={{ color: '#94a3b8' }}>Múltiples agencias espaciales, incluyendo la CSA (Canadá), la ESA (Europa) y la JAXA (Japón), están colaborando en la construcción de los módulos de servicio y la estación Gateway.</p>
            </div>
            <div style={{ background: '#0f172a', padding: '2rem', borderRadius: '20px' }}>
              <Star size={32} color="#fbbf24" style={{ marginBottom: '1rem' }} />
              <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Impacto Tecnológico</h4>
              <p style={{ color: '#94a3b8' }}>Los desarrollos tecnológicos para la supervivencia en el espacio profundo tienen aplicaciones directas en la medicina, purificación de agua y telecomunicaciones en la Tierra.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>,
    document.body
  ) : null;
}
