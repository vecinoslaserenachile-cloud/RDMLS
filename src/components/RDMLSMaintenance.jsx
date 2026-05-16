import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Environment } from '@react-three/drei';
import { ShieldAlert, Info, ExternalLink } from 'lucide-react';
import UniversalSerenito from './UniversalSerenito';

const RDMLSMaintenance = () => {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'radial-gradient(circle at center, #0f172a, #020617)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 999999,
      color: 'white',
      overflow: 'hidden',
      fontFamily: "'Outfit', sans-serif"
    }}>
      {/* Estrellas de fondo para profundidad */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.5 }}>
        <Canvas>
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Canvas>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '800px',
          padding: '2rem'
        }}
      >
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginBottom: '2rem',
          height: '300px'
        }}>
          <Canvas camera={{ position: [0, 0, 9], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <Environment preset="city" />
            <Suspense fallback={null}>
              <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <UniversalSerenito 
                  scale={1.5} 
                  animation="Idle" 
                  position={[0, -2.8, 0]} 
                />
              </Float>
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>

        <div style={{ 
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '40px',
          padding: '3rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}>
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse' }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: 'rgba(239, 68, 68, 0.15)',
              color: '#ef4444',
              padding: '8px 20px',
              borderRadius: '50px',
              fontSize: '0.75rem',
              fontWeight: '900',
              letterSpacing: '2px',
              marginBottom: '1.5rem',
              border: '1px solid rgba(239, 68, 68, 0.3)'
            }}
          >
            <ShieldAlert size={16} /> SISTEMA EN OPTIMIZACIÓN
          </motion.div>

          <h1 style={{ 
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
            fontWeight: '950', 
            marginBottom: '1rem',
            letterSpacing: '-0.03em',
            background: 'linear-gradient(to bottom, #ffffff, #94a3b8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textTransform: 'uppercase'
          }}>
            Red Digital La Serena
          </h1>



          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <a 
              href="https://vecinoslaserena.cl"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '1.2rem',
                background: 'white',
                color: '#020617',
                borderRadius: '20px',
                textDecoration: 'none',
                fontWeight: '900',
                fontSize: '0.9rem',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              PORTAL CIUDADANO <ExternalLink size={18} />
            </a>
            <button
              onClick={() => window.location.href = "mailto:soporte@vecinoslaserena.cl"}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '1.2rem',
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer',
                fontWeight: '900',
                fontSize: '0.9rem',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
            >
              CONTACTAR SOPORTE <Info size={18} />
            </button>
          </div>
        </div>

        <div style={{ marginTop: '3rem', opacity: 0.4, fontSize: '0.7rem', letterSpacing: '1px' }}>
          VECINOS LA SERENA &copy; 2025 | INFRAESTRUCTURA SOBERANA
        </div>
      </motion.div>
    </div>
  );
};

export default RDMLSMaintenance;
