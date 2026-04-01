import React, { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations, Stars, Html, useTexture, Environment, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { X, Award, Music, Volume2, FileText, Share2, Heart } from 'lucide-react';

// ============================================================
// DON WILSON 3D - Modelo Maestro
// ============================================================
// Pre-configuración de Draco para mejorar el rendimiento (94% de compresión)
useGLTF.preload("/models/memorial/DonWilson_draco.glb");
useGLTF.preload("/models/memorial/Cristian_Cuturrufo_draco.glb");

function DonWilsonModel({ url }) {
  const { scene, animations } = useGLTF(url, 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstAnim = Object.keys(actions)[0];
      actions[firstAnim].play();
    }
  }, [actions]);

  return (
    <group scale={2.5} position={[-2, 0, 0]}>
      <primitive object={scene} castShadow />
      <Sparkles count={50} scale={4} size={2} speed={0.4} color="#fbbf24" />
    </group>
  );
}

function CristianModel({ url }) {
  const { scene, animations } = useGLTF(url, 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstAnim = Object.keys(actions)[0];
      actions[firstAnim].play();
    }
  }, [actions]);

  return (
    <group scale={2.5} position={[2, 0, 0]}>
      <primitive object={scene} castShadow />
      <Sparkles count={50} scale={4} size={2} speed={0.4} color="#38bdf8" />
    </group>
  );
}

// ============================================================
// COMPONENTE DE EXHIBICIÓN
// ============================================================
function CuturrufoExhibition({ assets }) {
  return (
    <group>
      {/* Suelo Elegante */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#0f172a" roughness={0.1} metalness={0.5} />
      </mesh>

      {/* Dinastía Cuturrufo: Padre e Hijo en Escena */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <DonWilsonModel url="/models/memorial/DonWilson_draco.glb" />
      </Float>
      
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.3} position={[0, 0.5, 0]}>
        <CristianModel url="/models/memorial/Cristian_Cuturrufo_draco.glb" />
      </Float>

      {/* Iluminación Escénica Dual */}
      <spotLight position={[5, 10, 5]} angle={0.3} penumbra={1} intensity={2} castShadow />
      <spotLight position={[-5, 10, -5]} angle={0.3} penumbra={1} intensity={1} color="#38bdf8" castShadow />
      <pointLight position={[0, 5, 0]} intensity={1.5} color="#fbbf24" />
      <ambientLight intensity={0.5} />
      <Environment preset="night" />
    </group>
  );
}

// ============================================================
// PANEL DE INFORMACIÓN Y MULTIMEDIA (UI)
// ============================================================
const MultimediaPanel = ({ assets, onClose }) => {
  const [activeTab, setActiveTab] = useState('historia');

  return (
    <div style={{
      position: 'absolute',
      right: '2rem',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '450px',
      maxHeight: '85vh',
      background: 'rgba(15, 23, 42, 0.9)',
      backdropFilter: 'blur(20px)',
      borderRadius: '32px',
      border: '1px solid rgba(251, 191, 36, 0.4)',
      padding: '2.5rem',
      color: 'white',
      zIndex: 100,
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
        <div style={{ background: '#fbbf24', padding: '10px', borderRadius: '15px' }}>
          <Music size={24} color="#000" />
        </div>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 950, letterSpacing: '1px' }}>DINASTÍA CUTURRUFO</h2>
          <p style={{ margin: 0, fontSize: '0.7rem', color: '#fbbf24', fontWeight: 'bold' }}>EL LEGADO DEL PUERTO Y EL JAZZ NATIVO</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem' }}>
        {['historia', 'multimedia'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ 
              flex: 1, 
              padding: '8px', 
              borderRadius: '12px', 
              border: 'none', 
              background: activeTab === tab ? '#fbbf24' : 'rgba(255,255,255,0.05)',
              color: activeTab === tab ? '#000' : '#94a3b8',
              fontWeight: '900',
              fontSize: '0.7rem',
              cursor: 'pointer',
              textTransform: 'uppercase'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingRight: '10px' }} className="custom-scroll">
        {activeTab === 'historia' ? (
          <div style={{ fontSize: '0.85rem', lineHeight: 1.8, color: '#e2e8f0' }}>
            <p style={{ marginBottom: '1rem', borderLeft: '4px solid #fbbf24', paddingLeft: '15px', fontStyle: 'italic' }}>
              "El artista se debe a su público y tiene la obligación moral de crear algo nuevo todos los días."
            </p>
            <p style={{ marginBottom: '1.2rem' }}>
              <strong>El Origen:</strong> Cristián nació en el "Clan Cuturrufo", familia de raíces diaguitas liderada por <strong>Don Wilson</strong>. Su padre entrelazó la enseñanza de la biología con la música, criando a sus hijos en un ambiente de creación constante.
            </p>
            <p style={{ marginBottom: '1.2rem' }}>
              <strong>El Reto de "La Bamba":</strong> Siendo un joven rebelde, su padre le impuso el reto de aprender el solo de trompeta de "La Bamba" antes de ir a una fiesta. Al lograrlo, Cristián descubrió su vocación y el jazz se volvió su obsesión.
            </p>
            <p style={{ marginBottom: '1.2rem' }}>
              <strong>Democratización del Jazz:</strong> Fiel a las enseñanzas de Don Wilson, Cristián llevó su virtuosismo a las calles, plazas y muelles de Coquimbo. Junto a Valentín Trujillo, sacó al jazz de los clubes elitistas para conectarlo con las masas.
            </p>
            <p style={{ marginBottom: '1.2rem' }}>
              <strong>Jazz Nativo:</strong> Con el proyecto <em>Vernáculo</em>, Cristián fusionó el jazz con su herencia diaguita y las fiestas religiosas nortinas, integrando la ocarina y el pututu al lenguaje del bebop.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
             {/* Audio Bio */}
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.2rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <Volume2 size={18} color="#fbbf24" />
                <span style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '1px' }}>DON WILSON: BIOLOGÍA DEL ACORDEÓN</span>
              </div>
              <audio controls style={{ width: '100%', height: '35px' }}>
                <source src="/DonWilson/wilson_bio_acordeon.mp3" type="audio/mpeg" />
              </audio>
            </div>

            {/* PPTX Legado */}
            <button 
              onClick={() => window.open(`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(window.location.origin + '/DonWilson/clean_Dinastía_Musical_Cuturrufo_legado.pptx')}`, '_blank')}
              style={{ background: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.3)', padding: '1.2rem', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', width: '100%', textAlign: 'left' }}
            >
              <div style={{ background: '#fbbf24', padding: '8px', borderRadius: '12px' }}>
                <FileText size={20} color="#000" />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 950, color: 'white' }}>PPTX: DINASTÍA MUSICAL</div>
                <div style={{ fontSize: '0.65rem', color: '#fbbf24' }}>Legado y Trayectoria Familiar</div>
              </div>
            </button>

            {/* Imágenes Finales (Vecinos La Serena) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={{ position: 'relative' }}>
                <img src="/DonWilson/DonWilsonPiano.png" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)' }} alt="Don Wilson Piano" />
                <div style={{ position: 'absolute', bottom: '5px', left: '10px', fontSize: '0.5rem', color: 'white', background: 'rgba(0,0,0,0.5)', padding: '2px 5px', borderRadius: '4px' }}>EL MAESTRO (PIANO)</div>
              </div>
              <div style={{ position: 'relative' }}>
                <img src="/DonWilson/Cristian_Cuturrufo_trompeta.png" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)' }} alt="Cristian Cuturrufo" />
                <div style={{ position: 'absolute', bottom: '5px', left: '10px', fontSize: '0.5rem', color: 'white', background: 'rgba(0,0,0,0.5)', padding: '2px 5px', borderRadius: '4px' }}>CRISTIÁN (TROMPETA PRO)</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '2rem' }}>
        <button style={{ flex: 1, background: '#fbbf24', border: 'none', padding: '12px', borderRadius: '15px', color: '#000', fontWeight: '900', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <Heart size={16} fill="black" /> DEJAR FLOR
        </button>
        <button style={{ background: 'rgba(255,255,255,0.1)', border: 'none', padding: '12px', borderRadius: '15px', color: 'white', cursor: 'pointer' }}>
          <Share2 size={20} />
        </button>
      </div>

      <style>{`
        .custom-scroll::-webkit-scrollbar { width: 5px; }
        .custom-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
        .custom-scroll::-webkit-scrollbar-thumb { background: #fbbf24; borderRadius: 10px; }
      `}</style>
    </div>
  );
};

export default function MasterDonWilson3D({ onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100100, background: '#020617', fontFamily: "'Outfit', sans-serif" }}>
      {/* Header Fijo */}
      <div style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 100 }}>
        <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '1.5rem 2rem', borderRadius: '24px', border: '1px solid rgba(251, 191, 36, 0.3)', backdropFilter: 'blur(10px)' }}>
          <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 950, color: 'white', letterSpacing: '-1px' }}>DINASTÍA CUTURRUFO</h1>
          <p style={{ margin: 0, color: '#fbbf24', fontWeight: 'bold', fontSize: '0.8rem', letterSpacing: '2px' }}>WILSON • CRISTIÁN • LEGADO ETERNO</p>
        </div>
      </div>

      <button 
        onClick={onClose} 
        style={{ position: 'absolute', top: '2rem', right: '2rem', background: '#ef4444', border: 'none', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '50px', zIndex: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '900', fontSize: '0.8rem', boxShadow: '0 10px 20px rgba(239, 68, 68, 0.4)' }}
      >
        SALIR AL PORTAL <X size={20} />
      </button>

      <MultimediaPanel onClose={onClose} />

      {/* Música de Fondo Especial */}
      <audio autoPlay loop>
        <source src="/DonWilson/Cacharrito.mp3" type="audio/mpeg" />
      </audio>

      <Canvas shadows camera={{ position: [0, 5, 12], fov: 45 }}>
        <Suspense fallback={null}>
          <CuturrufoExhibition />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Suspense>
      </Canvas>

      {/* Sello de Autenticidad */}
      <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', opacity: 0.3 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Award size={40} color="white" />
          <div style={{ color: 'white', fontSize: '0.6rem', fontWeight: 'bold', letterSpacing: '2px' }}>
            PORTAL DE LA MEMORIA<br/>VECINOS LA SERENA 2026
          </div>
        </div>
      </div>
    </div>
  );
}
