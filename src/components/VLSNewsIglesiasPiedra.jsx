import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { X, Map, History, Camera, Compass } from 'lucide-react';

export default function VLSNewsIglesiasPiedra({ onClose }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return typeof document !== 'undefined' ? createPortal(
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: '#fafafa', zIndex: 2147483647, display: 'flex', flexDirection: 'column',
      color: '#111827', fontFamily: "'Outfit', 'Inter', system-ui, sans-serif"
    }}>
      <header style={{
        padding: isMobile ? '1rem' : '1.5rem 2rem', borderBottom: '1px solid #e5e7eb',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: '#78350f', color: '#fff', padding: '0.4rem 0.8rem', fontWeight: '900', borderRadius: '4px' }}>PATRIMONIO VLS</div>
          <span style={{ fontWeight: 'bold', fontSize: '0.8rem', color: '#78350f', letterSpacing: '1px' }}>RUTA DE LAS IGLESIAS DE PIEDRA</span>
        </div>
        <button onClick={onClose} style={{ background: '#78350f', border: 'none', color: 'white', padding: '0.6rem 1.4rem', borderRadius: '50px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          CERRAR <X size={20} />
        </button>
      </header>

      <div style={{ flex: 1, overflowY: 'auto', padding: isMobile ? '2rem 1.5rem' : '4rem 6rem' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: '900', lineHeight: '1.1', marginBottom: '2rem', color: '#451a03' }}>
            Ruta Histórica: <span style={{ color: '#b45309' }}>Iglesias de Piedra</span>
          </h1>
          
          <div style={{ background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: '24px', padding: '3rem', marginBottom: '3rem' }}>
            <History size={48} color="#b45309" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1rem', color: '#78350f' }}>El Legado de la Piedra Caliza</h3>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: '#92400e' }}>
              Las iglesias más antiguas del casco histórico de La Serena fueron construidas con Piedra Caliza, extraída directamente de las canteras de Peñuelas. Esta ruta te invita a recorrer estos monumentos arquitectónicos que han resistido el paso de los siglos y los terremotos, siendo fieles testigos de la época colonial.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '2rem' }}>
            <div style={{ background: '#fff', padding: '2rem', borderRadius: '20px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
              <Map size={32} color="#b45309" style={{ marginBottom: '1rem' }} />
              <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#451a03' }}>Puntos de Interés</h4>
              <ul style={{ color: '#78350f', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                 <li>Iglesia de San Francisco</li>
                 <li>Iglesia Santo Domingo</li>
                 <li>Catedral de La Serena</li>
                 <li>Iglesia San Agustín</li>
              </ul>
            </div>
            <div style={{ background: '#fff', padding: '2rem', borderRadius: '20px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
              <Camera size={32} color="#b45309" style={{ marginBottom: '1rem' }} />
              <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#451a03' }}>Tour Fotográfico 3D</h4>
              <p style={{ color: '#78350f' }}>Próximamente: Explora los rincones, campanarios y criptas ocultas de estas iglesias mediante nuestro motor de navegación interactivo 3D.</p>
              <button onClick={() => { onClose(); window.dispatchEvent(new CustomEvent('open-3d-walk')); }} style={{ marginTop: '1rem', background: '#b45309', color: '#fff', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(180, 83, 9, 0.4)', transition: 'background 0.2s' }}>INICIAR TOUR 3D</button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>,
    document.body
  ) : null;
}
