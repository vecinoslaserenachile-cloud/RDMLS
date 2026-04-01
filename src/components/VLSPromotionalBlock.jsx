import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Map, Radio, Film, Globe } from 'lucide-react';

export default function VLSPromotionalBlock() {
  const isMobile = window.innerWidth < 1024;
  
  const handleNavigation = (eventId) => {
    window.dispatchEvent(new CustomEvent(eventId));
  };
  
  const promos = [
    {
      id: 'vlsabes',
      title: 'VLSabes',
      desc: 'El juego cultural interactivo',
      icon: Gamepad2,
      color: '#fbbf24',
      bg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      event: 'open-vls-play'
    },
    {
      id: 'radio',
      title: 'RDMLS',
      desc: 'Nuestra red de radiodifusión',
      icon: Radio,
      color: '#ef4444',
      bg: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
      event: 'toggle-radio-visibility'
    },
    {
      id: 'distancias',
      title: 'Geografía',
      desc: 'Mapa de conectividad regional',
      icon: Map,
      color: '#3b82f6',
      bg: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      event: 'open-distances'
    },
    {
      id: 'idiomas',
      title: 'Soberanía Global',
      desc: 'Aprendizaje inmersivo VLS',
      icon: Globe,
      color: '#10b981',
      bg: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
      event: 'open-smart-skills'
    },
    {
      id: 'teatro',
      title: 'Teatro Retro',
      desc: 'Clásicos y documentales',
      icon: Film,
      color: '#8b5cf6',
      bg: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
      event: 'open-theater'
    }
  ];

  return (
    <div style={{ marginTop: '4rem', marginBottom: '4rem', background: '#0f172a', padding: isMobile ? '2.5rem 1.5rem' : '4rem', borderRadius: '32px', border: '1px solid #1e293b', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Decor */}
      <div style={{ position: 'absolute', top: -100, right: -100, width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -100, left: -100, width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(239,68,68,0.1) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

      <h3 style={{ color: 'white', fontSize: isMobile ? '1.8rem' : '2.5rem', fontWeight: '900', marginBottom: '1rem', letterSpacing: '-0.03em', textAlign: 'center' }}>
        DESCUBRE EL <span style={{ color: '#38bdf8' }}>PORTAL VLS</span>
      </h3>
      <p style={{ color: '#94a3b8', fontSize: '1.1rem', textAlign: 'center', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
        No te quedes solo en la lectura. Explora las herramientas y experiencias interactivas que Vecinos La Serena tiene para ti y tu familia.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', position: 'relative', zIndex: 10 }}>
        {promos.map((promo) => (
          <motion.div 
            key={promo.id}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavigation(promo.event)}
            style={{ padding: '2rem 1.5rem', background: '#1e293b', borderRadius: '24px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)', transition: 'border-color 0.3s' }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = promo.color}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
          >
            <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: promo.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem', boxShadow: `0 10px 20px -5px ${promo.color}40` }}>
              <promo.icon size={32} color="white" />
            </div>
            <h4 style={{ color: 'white', fontSize: '1.1rem', fontWeight: '800', margin: 0 }}>{promo.title}</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.5rem' }}>{promo.desc}</p>
          </motion.div>
        ))}
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
         <p style={{ margin: 0, color: '#475569', fontSize: '0.8rem', fontWeight: 'bold' }}>HERRAMIENTAS PARA UNA SOBERANÍA INTELIGENTE</p>
      </div>
    </div>
  );
}
