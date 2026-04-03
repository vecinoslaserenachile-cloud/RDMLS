import React, { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations, Stars, Html, useTexture, Environment, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { X, Award, Music, Volume2, FileText, Share2, Heart, Navigation, Eye, User, Sparkles as SparklesIcon } from 'lucide-react';

const AnanucaFlower = ({ color = '#ef4444' }) => (
    <svg viewBox="0 0 100 100" style={{ width: '60px', height: '60px', filter: `drop-shadow(0 0 12px ${color})` }}>
        <path d="M50 95 Q50 65 50 45" stroke="#10b981" strokeWidth="2" fill="none" opacity="0.6" />
        <g transform="translate(50, 45)">
            <path d="M0 0 C-8 -18 0 -32 0 -32 C0 -32 8 -18 0 0" fill={color} stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
            <path d="M0 0 C-12 -12 -25 -12 -25 -12 C-25 -12 -12 -4 0 0" fill={color} opacity="0.9" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
            <path d="M0 0 C12 -12 25 -12 25 -12 C25 -12 12 -4 0 0" fill={color} opacity="0.9" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
            <path d="M0 0 C-18 4 -30 12 -30 12 C-30 12 -12 8 0 0" fill={color} opacity="0.8" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
            <path d="M0 0 C18 4 30 12 30 12 C30 12 12 8 0 0" fill={color} opacity="0.8" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
        </g>
        <circle cx="50" cy="45" r="3" fill="white" style={{ filter: 'blur(2px)' }} />
    </svg>
);

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

// ============================================================
// SERENITO 3D – El Guía Humanizado
// ============================================================
function SerenitoGuide({ avatarRef, headRef, isMoving }) {
  const { scene, animations } = useGLTF('/serenito_draco.glb', 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
  const { actions } = useAnimations(animations, avatarRef);

  useEffect(() => {
    if (!actions) return;
    const walkAnims = ['Walk', 'Run', 'Walking', 'Sprint'];
    const idleAnims = ['Idle', 'Standing_Idle', 'Stay'];
    
    const playAnim = (list) => {
      for (const name of list) {
        if (actions[name]) {
          actions[name].reset().fadeIn(0.5).play();
          return name;
        }
      }
      return null;
    };

    if (isMoving) {
      const active = playAnim(walkAnims);
      return () => { if(active) actions[active]?.fadeOut(0.5); };
    } else {
      const active = playAnim(idleAnims);
      return () => { if(active) actions[active]?.fadeOut(0.5); };
    }
  }, [isMoving, actions]);

  useEffect(() => {
    if (scene) {
      scene.traverse(node => {
        if (node.isBone && (node.name.toLowerCase().includes('head') || node.name.toLowerCase().includes('neck'))) {
          headRef.current = node;
        }
      });
    }
  }, [scene, headRef]);

  return (
    <group ref={avatarRef}>
      {/* Raising Serenito to floor level as requested by USER - v49 */}
      <primitive object={scene} scale={1.8} position={[0, 1.35, 0]} castShadow />
    </group>
  );
}

// ============================================================
// MOTOR TANK: Movimiento fluido para el Homenaje
// ============================================================
function MuseumPilot({ targetPos, cameraMode, setTargetPos }) {
  const { camera } = useThree();
  const avatarRef = useRef();
  const headRef = useRef();
  const posRef = useRef(new THREE.Vector3(0, 0, 8)); // Posición inicial
  const bodyRotRef = useRef(0);
  const headRotRef = useRef(0);
  const [keys, setKeys] = useState({});
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    const handleDown = (e) => setKeys(prev => ({ ...prev, [e.code]: true }));
    const handleUp = (e) => setKeys(prev => ({ ...prev, [e.code]: false }));
    window.addEventListener('keydown', handleDown);
    window.addEventListener('keyup', handleUp);
    return () => {
      window.removeEventListener('keydown', handleDown);
      window.removeEventListener('keyup', handleUp);
    };
  }, []);

  useFrame((state, delta) => {
    if (!avatarRef.current) return;

    let moving = false;
    const moveSpeed = 7 * delta;
    const rotSpeed = 2.4 * delta;

    if (keys['KeyA'] || keys['ArrowLeft']) bodyRotRef.current += rotSpeed;
    if (keys['KeyD'] || keys['ArrowRight']) bodyRotRef.current -= rotSpeed;
    if (keys['KeyW'] || keys['ArrowUp']) {
      posRef.current.x += Math.sin(bodyRotRef.current) * moveSpeed;
      posRef.current.z += Math.cos(bodyRotRef.current) * moveSpeed;
      moving = true;
    }
    if (keys['KeyS'] || keys['ArrowDown']) {
      posRef.current.x -= Math.sin(bodyRotRef.current) * moveSpeed;
      posRef.current.z -= Math.cos(bodyRotRef.current) * moveSpeed;
      moving = true;
    }

    // Click to move logic
    if (targetPos && !moving) {
        const dir = new THREE.Vector3().subVectors(targetPos, posRef.current);
        dir.y = 0;
        const dist = dir.length();
        if (dist > 0.5) {
            const angle = Math.atan2(dir.x, dir.z);
            let diff = angle - bodyRotRef.current;
            while(diff > Math.PI) diff -= Math.PI * 2;
            while(diff < -Math.PI) diff += Math.PI * 2;
            bodyRotRef.current += diff * 5 * delta;
            if (Math.abs(diff) < 0.3) {
                posRef.current.add(dir.normalize().multiplyScalar(8 * delta));
                moving = true;
            }
        } else {
            setTargetPos(null);
        }
    }

    avatarRef.current.position.copy(posRef.current);
    avatarRef.current.rotation.y = bodyRotRef.current;
    if (headRef.current) headRef.current.rotation.y = headRotRef.current;
    if (moving !== isMoving) setIsMoving(moving);

    // Cámara
    const fwdX = Math.sin(bodyRotRef.current);
    const fwdZ = Math.cos(bodyRotRef.current);
    const px = posRef.current.x;
    const py = posRef.current.y;
    const pz = posRef.current.z;
    
    if (cameraMode === '3rd') {
      camera.position.lerp(new THREE.Vector3(px - fwdX * 8, py + 5, pz - fwdZ * 8), 0.1);
      camera.lookAt(px, py + 2.5, pz);
    } else if (cameraMode === '1st') {
      camera.position.lerp(new THREE.Vector3(px, py + 3, pz), 0.2);
      camera.lookAt(px + fwdX * 3, py + 2.8, pz + fwdZ * 3);
    }
  });

  return (
    <SerenitoGuide avatarRef={avatarRef} headRef={headRef} isMoving={isMoving} />
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
// ELEMENTOS MUSICALES FLOTANTES (v53)
// ============================================================
function FloatingMusicalElements() {
  const elements = useMemo(() => Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    pos: [Math.sin(i) * 8, 2 + Math.cos(i) * 3, Math.tan(i) * 5],
    speed: 0.5 + Math.random(),
    symbol: ['♪', '♫', '∮', '♭'][i % 4]
  })), []);

  return (
    <group>
      {elements.map(el => (
        <Float key={el.id} speed={el.speed} rotationIntensity={1.5} floatIntensity={2} position={el.pos}>
           <Html center transform pointerEvents="none" scale={0.5}>
              <div style={{ 
                color: '#fbbf24', 
                opacity: 0.3, 
                fontSize: '40px', 
                fontWeight: '900',
                filter: 'blur(1px) drop-shadow(0 0 10px #fbbf24)' 
              }}>
                 {el.symbol}
              </div>
           </Html>
        </Float>
      ))}
    </group>
  );
}

function CuturrufoPoster({ position, image, title, text, rotation = 0 }) {
  const texture = useTexture(image);
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Marco Minimalista */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[3.2, 4.2, 0.1]} />
        <meshStandardMaterial color="#0b1120" roughness={0.1} metalness={0.9} />
      </mesh>
      {/* Imagen con textura */}
      <mesh position={[0, 0, 0.055]}>
        <planeGeometry args={[2.8, 3.8]} />
        <meshBasicMaterial map={texture} depthTest={true} />
      </mesh>
      {/* Texto Pintado - v51 */}
      <Html position={[0, 0, 0.08]} center transform pointerEvents="none" scale={0.6}>
         <div style={{ color: 'white', textAlign: 'center', width: '380px', textShadow: '0 4px 12px rgba(0,0,0,0.9)', padding: '20px', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(1px)', borderRadius: '20px' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '28px', fontWeight: '950', color: '#fbbf24', letterSpacing: '2px' }}>{title}</h3>
            <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', lineHeight: '1.4', fontStyle: 'italic', color: 'rgba(255,255,255,0.9)' }}>{text}</p>
         </div>
      </Html>
      {/* Borde Dorado */}
      <mesh position={[0, 0, 0.01]}>
        <boxGeometry args={[3, 4, 0.1]} />
        <meshStandardMaterial color="#fbbf24" metalness={1} roughness={0} />
      </mesh>
    </group>
  );
}

// ============================================================
// COMPONENTE DE EXHIBICIÓN
// ============================================================
function CuturrufoExhibition({ setTargetPos }) {
  return (
    <group>
      {/* Suelo Elegante Interactivo */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow onPointerDown={(e) => { e.stopPropagation(); setTargetPos(e.point); }}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#0b1120" roughness={0.05} metalness={0.6} />
      </mesh>

      {/* Dinastía Cuturrufo: Padre e Hijo en Escena */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <DonWilsonModel url="/models/memorial/DonWilson_draco.glb" />
      </Float>
      
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.3} position={[0, 0.5, 0]}>
        <CristianModel url="/models/memorial/Cristian_Cuturrufo_draco.glb" />
      </Float>

      {/* CARTELES ELEGANTES (Regla: Imágenes desplegadas en el espacio) */}
      <CuturrufoPoster 
        position={[5, 2.8, -4]} 
        image="/DonWilson/DonWilsonPiano.png" 
        title="EL MAESTRO" 
        text="El sembrador de melodías que convirtió el acordeón en el latido de un pueblo." 
        rotation={-Math.PI/6} 
      />
      <CuturrufoPoster 
        position={[-5, 2.8, -4]} 
        image="/DonWilson/Cristian_Cuturrufo.png" 
        title="EL VIRTUOSO" 
        text="El genio que llevó el jazz de las academias a los muelles, democratizando el bebop." 
        rotation={Math.PI/6} 
      />

      {/* Atmósfera Musical y Resplandor */}
      <FloatingMusicalElements />
      <Sparkles count={100} scale={15} size={3} speed={0.2} color="#fbbf24" opacity={0.5} />

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
const MultimediaPanel = ({ assets, onClose, onLeaveFlower }) => {
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
             {/* Audios Biográficos */}
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.2rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <Volume2 size={18} color="#fbbf24" />
                  <span style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '1px' }}>DON WILSON: BIOLOGÍA DEL ACORDEÓN</span>
                </div>
                <audio controls style={{ width: '100%', height: '35px' }}>
                  <source src="/DonWilson/wilson_bio_acordeon.mp3" type="audio/mpeg" />
                </audio>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <Volume2 size={18} color="#38bdf8" />
                  <span style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '1px' }}>CRISTIÁN: EL JAZZ CALLEJERO (EXCLUSIVO)</span>
                </div>
                <audio controls style={{ width: '100%', height: '35px' }}>
                  <source src="https://raw.githubusercontent.com/vecinoslaserenachile-cloud/juego-serenito/fe7c71ad5d61ad80a494d197d999be18157a132b/memorial/cuturrufo/El_jazz_callejero_de_Cristi%C3%A1n_Cuturrufo.mp3" type="audio/mpeg" />
                </audio>
              </div>
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
                <img src="/DonWilson/Cristian_Cuturrufo.png" style={{ width: '100%', height: '120px', objectFit: 'cover', objectPosition: 'center 15%', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)' }} alt="Cristian Cuturrufo" />
                <div style={{ position: 'absolute', bottom: '5px', left: '10px', fontSize: '0.5rem', color: 'white', background: 'rgba(0,0,0,0.5)', padding: '2px 5px', borderRadius: '4px' }}>CRISTIÁN (TROMPETA PRO)</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '2rem' }}>
        <button 
          onClick={onLeaveFlower}
          style={{ flex: 1, background: '#fbbf24', border: 'none', padding: '12px', borderRadius: '15px', color: '#000', fontWeight: '900', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
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
  const [cameraMode, setCameraMode] = useState('3rd');
  const [targetPos, setTargetPos] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [animatedFlowers, setAnimatedFlowers] = useState([]);
  
  // Audio Controls for Cacharrito
  const [isCacharritoPlaying, setIsCacharritoPlaying] = useState(true);
  const [cacharritoVolume, setCacharritoVolume] = useState(0.4);
  const cacharritoRef = useRef(null);

  useEffect(() => {
    if (cacharritoRef.current) {
      cacharritoRef.current.volume = cacharritoVolume;
      if (isCacharritoPlaying) {
        cacharritoRef.current.play().catch(e => console.warn("Auto-play blocked"));
      } else {
        cacharritoRef.current.pause();
      }
    }
  }, [cacharritoVolume, isCacharritoPlaying]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleLeaveFlower = () => {
    const colors = ['#ef4444', '#fbbf24', '#f97316']; 
    const newAnim = {
        idx: Date.now() + Math.random(),
        left: Math.random() * 80 + 10 + '%',
        delay: 0,
        color: colors[Math.floor(Math.random() * colors.length)]
    };
    setAnimatedFlowers(prev => [...prev, newAnim]);
    window.dispatchEvent(new CustomEvent('vls-score-update', { detail: 1 }));
    setTimeout(() => {
        setAnimatedFlowers(prev => prev.filter(f => f.idx !== newAnim.idx));
    }, 3000);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100100, background: '#020617', fontFamily: "'Outfit', sans-serif" }}>
      {/* Header Fijo */}
      <div style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 100 }}>
        <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '1.5rem 2rem', borderRadius: '24px', border: '1px solid rgba(251, 191, 36, 0.3)', backdropFilter: 'blur(10px)' }}>
          <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 950, color: 'white', letterSpacing: '-1px' }}>DINASTÍA CUTURRUFO</h1>
          <p style={{ margin: 0, color: '#fbbf24', fontWeight: 'bold', fontSize: '0.8rem', letterSpacing: '2px' }}>WILSON • CRISTIÁN • LEGADO ETERNO</p>
        </div>
      </div>

      {/* Controles de Cámara */}
      <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '1rem', zIndex: 200, pointerEvents: 'auto' }}>
        <button 
            onClick={() => setCameraMode('3rd')} 
            style={{ padding: '0.8rem 1.5rem', borderRadius: '30px', border: 'none', background: cameraMode === '3rd' ? '#fbbf24' : 'rgba(15,23,42,0.8)', color: cameraMode === '3rd' ? '#000' : 'white', fontWeight: '900', fontSize: '0.75rem', cursor: 'pointer', transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
            <Navigation size={16} /> MODO SEGUIR
        </button>
        <button 
            onClick={() => setCameraMode('1st')} 
            style={{ padding: '0.8rem 1.5rem', borderRadius: '30px', border: 'none', background: cameraMode === '1st' ? '#fbbf24' : 'rgba(15,23,42,0.8)', color: cameraMode === '1st' ? '#000' : 'white', fontWeight: '900', fontSize: '0.75rem', cursor: 'pointer', transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
            <Eye size={16} /> MODO OJOS
        </button>
        
        {/* Cacharrito Global Controls (Regla: Control de ambiente) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(15,23,42,0.8)', padding: '0.5rem 1.5rem', borderRadius: '30px', border: '1px solid rgba(251, 191, 36, 0.3)', backdropFilter: 'blur(10px)' }}>
            <span style={{ color: '#fbbf24', fontSize: '0.65rem', fontWeight: '900', letterSpacing: '1px' }}>CACHARRITO</span>
            <button 
                onClick={() => setIsCacharritoPlaying(!isCacharritoPlaying)}
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex' }}
            >
                {isCacharritoPlaying ? <Volume2 size={16} /> : <Eye size={16} style={{ opacity: 0.5 }} />}
            </button>
            <input 
                type="range" min="0" max="1" step="0.01" 
                value={cacharritoVolume} 
                onChange={(e) => setCacharritoVolume(parseFloat(e.target.value))}
                style={{ width: '60px' }}
            />
        </div>
      </div>

      <button 
        onClick={onClose} 
        style={{ position: 'absolute', top: '2rem', right: '2rem', background: '#ef4444', border: 'none', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '50px', zIndex: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '900', fontSize: '0.8rem', boxShadow: '0 10px 20px rgba(239, 68, 68, 0.4)' }}
      >
        SALIR AL PORTAL <X size={20} />
      </button>

      <MultimediaPanel onClose={onClose} onLeaveFlower={handleLeaveFlower} />

      {/* Música de Fondo Especial (Cacharrito) */}
      <audio ref={cacharritoRef} loop>
        <source src="/DonWilson/Cacharrito.mp3" type="audio/mpeg" />
      </audio>

      <Canvas shadows camera={{ fov: 45, position: [0, 5, 12] }}>
        <Suspense fallback={null}>
          <CuturrufoExhibition setTargetPos={setTargetPos} />
          <MuseumPilot targetPos={targetPos} cameraMode={cameraMode} setTargetPos={setTargetPos} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Suspense>
      </Canvas>

      {isLoading && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 2000, background: '#020617', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
          <div style={{ width: '80px', height: '80px', border: '6px solid rgba(251, 191, 36, 0.2)', borderTopColor: '#fbbf24', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: 'white', margin: 0, fontSize: '2rem', fontWeight: '900' }}>ENTRANDO AL HOMENAJE</h2>
            <p style={{ color: '#fbbf24', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>Sincronizando Dinasta Cuturrufo...</p>
          </div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* Flower Animations Layer */}
      {animatedFlowers.map(f => (
          <div key={f.idx} style={{ position: 'fixed', bottom: '-100px', left: f.left, zIndex: 200000, pointerEvents: 'none', animation: `floatFlower 3.5s ease-out forwards`, animationDelay: `${f.delay}s` }}>
              <AnanucaFlower color={f.color} />
          </div>
      ))}

      <style>{`
        @keyframes floatFlower { 
            0% { transform: translateY(0) rotate(0deg) scale(0.5); opacity: 0; } 
            20% { opacity: 1; transform: translateY(-25vh) rotate(10deg) scale(1.3); } 
            100% { transform: translateY(-110vh) rotate(-20deg) scale(1); opacity: 0; } 
        }
      `}</style>
    </div>
  );
}
