import React, { useRef, useState } from 'react';
import { Download, Share2, Facebook, Twitter, Smartphone } from 'lucide-react';
import * as htmlToImage from 'html-to-image';
import { motion } from 'framer-motion';

export default function ArchiPosterCard({ data }) {
  const posterRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // Colores Institucionales
  const primaryBlue = '#002D8B';
  const darkBlue = '#001b54';
  const gold = '#d4af37';

  const downloadImage = async () => {
    if (!posterRef.current) return;
    setIsDownloading(true);
    try {
      // Necesario para evitar problemas en móviles y forzar el renderizado completo
      const dataUrl = await htmlToImage.toJpeg(posterRef.current, { 
        quality: 0.95,
        backgroundColor: '#040914',
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left'
        }
      });
      const link = document.createElement('a');
      link.download = `ArchiNuevaEnergia-${data.id}.jpg`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generando imagen:', error);
      alert('Hubo un error al generar la imagen. Intenta nuevamente.');
    } finally {
      setIsDownloading(false);
    }
  };

  const shareWhatsApp = () => {
    const url = 'www.archinuevaenergia.cl';
    const message = `*${data.pillar}*\n\n${data.text}\n\nConoce nuestras propuestas en: ${url}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  };

  const shareTwitter = () => {
    const url = 'www.archinuevaenergia.cl';
    const text = `${data.pillar}. ${data.text} #ArchiNuevaEnergia #ListaArchi2026`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '16px',
      border: `1px solid rgba(212,175,55,0.2)`,
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      maxWidth: '400px',
      margin: '0 auto'
    }}>
      {/* EL AFICHE VISUAL (LO QUE SE RENDERIZA COMO JPG) */}
      <div 
        ref={posterRef}
        style={{
          width: '100%',
          aspectRatio: '4/5', // Proporción ideal para IG/FB
          background: `linear-gradient(145deg, ${darkBlue}, #020617)`,
          borderRadius: '12px',
          position: 'relative',
          overflow: 'hidden',
          border: `2px solid ${gold}`,
          boxShadow: `0 10px 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(212,175,55,0.1)`,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Efecto de luz de fondo */}
        <div style={{
          position: 'absolute', top: '-20%', right: '-20%', width: '70%', height: '70%',
          background: `radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)`,
          zIndex: 0
        }} />        {/* TOP: Branding sin sellos duplicados para ganar espacio y limpieza */}
        <div style={{ padding: '14px 14px 10px 14px', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ color: gold, fontFamily: '"Outfit", sans-serif', fontWeight: 900, letterSpacing: '2px', fontSize: '1.15rem', textTransform: 'uppercase' }}>
            ARCHI <span style={{ color: 'white' }}>Nueva Energía</span>
          </div>
          <div style={{ width: '40px', height: '2px', background: gold, margin: '6px auto 0' }} />
        </div>

        {/* MIDDLE: Foto del candidato / directiva maximizada al ancho del afiche */}
        <div style={{ 
          width: '100%', 
          height: '225px', 
          position: 'relative', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          overflow: 'hidden',
          flexShrink: 0
        }}>
          {/* FOTO */}
          <div style={{ 
            width: '100%', 
            height: '100%', 
            backgroundImage: `url('${data.image}')`,
            backgroundSize: 'contain',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            zIndex: 1
          }} />
        </div>

        {/* BOTTOM: Contenido Textual y Propuesta */}
        <div style={{ 
          padding: '12px 16px 14px 16px', 
          textAlign: 'center', 
          width: '100%', 
          background: 'rgba(2, 6, 23, 0.45)', 
          borderTop: `1px solid rgba(212,175,55,0.15)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          zIndex: 2,
          flex: 1,
          justifyContent: 'center'
        }}>
          <div style={{ 
            display: 'inline-block',
            background: `linear-gradient(90deg, ${primaryBlue}, ${darkBlue})`,
            padding: '3px 10px', borderRadius: '30px', 
            color: 'white', fontWeight: 'bold', fontSize: '0.65rem',
            border: `1px solid ${gold}`, marginBottom: '3px',
            textTransform: 'uppercase', letterSpacing: '1px'
          }}>
            {data.role}
          </div>
          
          <h2 style={{ color: 'white', margin: 0, fontSize: '1.2rem', fontFamily: '"Outfit", sans-serif', fontWeight: 900, textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
            {data.name}
          </h2>
          
          <h3 style={{ color: gold, margin: 0, fontSize: '0.9rem', fontWeight: 600, fontStyle: 'italic', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
            "{data.pillar}"
          </h3>
          
          {data.text && (data.id === 'mesa-completa' || (data.role && data.role.toLowerCase().includes('propuesta'))) && (
            <p style={{
              color: '#e2e8f0', fontSize: '0.68rem', lineHeight: '1.35',
              margin: '5px auto 0', maxWidth: '320px',
              textShadow: '0 2px 8px rgba(0,0,0,0.9)',
              fontWeight: 'normal',
              fontFamily: '"Outfit", sans-serif',
              opacity: 0.95
            }}>
              {data.text}
            </p>
          )}
        </div>

        {/* BOTTOM: Footer web */}
        <div style={{ 
          background: 'rgba(0,0,0,0.5)', padding: '12px', textAlign: 'center',
          borderTop: `1px solid rgba(212,175,55,0.3)`, position: 'relative', zIndex: 3
        }}>
          <span style={{ color: 'white', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px' }}>
            WWW.ARCHINUEVAENERGIA.CL
          </span>
        </div>
      </div>

      {/* CONTROLES / BOTONES FUERA DEL AFICHE */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <motion.button 
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={downloadImage}
          disabled={isDownloading}
          style={{
            background: `linear-gradient(135deg, ${gold}, #b45309)`,
            color: 'white', border: 'none', padding: '12px', borderRadius: '10px',
            fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            boxShadow: `0 4px 15px rgba(212,175,55,0.4)`
          }}
        >
          <Download size={18} />
          {isDownloading ? 'Generando...' : 'Descargar JPG'}
        </motion.button>
        
        <motion.button 
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={shareWhatsApp}
          style={{
            background: '#25D366',
            color: 'white', border: 'none', padding: '12px', borderRadius: '10px',
            fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            boxShadow: '0 4px 15px rgba(37,211,102,0.4)'
          }}
        >
          <Smartphone size={18} />
          Compartir WA
        </motion.button>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          onClick={shareTwitter}
          style={{
            flex: 1, background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)',
            padding: '10px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
          }}
        >
          <Twitter size={16} /> Twitter (X)
        </button>
      </div>
    </div>
  );
}
