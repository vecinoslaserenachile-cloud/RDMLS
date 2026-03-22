import React, { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations, Sky, Stars, Html, useTexture, Clone, Environment, Text } from '@react-three/drei';
import * as THREE from 'three';
import { X, Navigation, Info, Award, RefreshCw, ZoomIn, MessageSquare, User, Heart, Star } from 'lucide-react';

// ============================================================
// SERENITO 3D – El Guía Humanizado
// ============================================================
function SerenitoGuide({ avatarRef, headRef, isMoving }) {
  const { scene, animations } = useGLTF('/serenito_draco.glb');
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
      <primitive object={scene} scale={1.8} castShadow />
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
  const posRef = useRef(new THREE.Vector3(0, 0, 15));
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

    // Click to move logic (simplificada)
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

// ============================================================
// GALERÍA DE MURALES – Daniel Palominos
// ============================================================
function MuralFrame({ position, rotation, texturePath, title, description, size = [8, 6] }) {
  const texture = useTexture(texturePath);
  
  return (
    <group position={position} rotation={rotation}>
      {/* Marco de madera noble */}
      <mesh castShadow>
        <boxGeometry args={[size[0] + 0.5, size[1] + 0.5, 0.2]} />
        <meshStandardMaterial color="#5c3d1e" roughness={0.8} />
      </mesh>
      {/* La Obra Mural */}
      <mesh position={[0, 0, 0.12]}>
        <planeGeometry args={size} />
        <meshBasicMaterial map={texture} />
      </mesh>
      {/* Placa de identificación */}
      <Html position={[0, -size[1] / 2 - 0.8, 0.15]} center>
        <div style={{ background: 'rgba(0,0,0,0.85)', padding: '10px 20px', borderRadius: '10px', border: '1px solid #92400e', color: 'white', width: '220px', textAlign: 'center' }}>
          <div style={{ fontWeight: '900', color: '#fbbf24', fontSize: '14px', marginBottom: '4px' }}>{title}</div>
          <div style={{ fontSize: '11px', color: '#d1d5db', lineHeight: '1.4' }}>{description}</div>
        </div>
      </Html>
      {/* Luz focal */}
      <spotLight position={[0, 5, 5]} target-position={[0, 0, 0]} intensity={1.5} angle={0.6} penumbra={0.5} castShadow />
    </group>
  );
}

function PalominosExhibition({ setTargetPos, muralImages }) {
  return (
    <group>
      {/* Suelo de mármol/piedra del museo */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow onPointerDown={(e) => { e.stopPropagation(); setTargetPos(e.point); }}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#111827" roughness={0.1} metalness={0.2} />
      </mesh>

      {/* Paredes de la Galería */}
      <group position={[0, 0, -25]}>
        <MuralFrame 
          position={[0, 5, 0]} 
          texturePath={muralImages[0]} 
          title="Legado y Humanidad" 
          description="Una visión del trabajo y la vida comunitaria en la Región de Coquimbo."
          size={[12, 8]}
        />
      </group>

      <group position={[20, 0, -10]} rotation={[0, -Math.PI / 2, 0]}>
        <MuralFrame 
          position={[0, 5, 0]} 
          texturePath={muralImages[1]} 
          title="Ciencia y Alquimia Cerámica" 
          description="El cruce de la investigación ULS con el fuego y la arcilla."
        />
      </group>

      <group position={[-20, 0, -10]} rotation={[0, Math.PI / 2, 0]}>
        <MuralFrame 
          position={[0, 5, 0]} 
          texturePath={muralImages[2]} 
          title="Paisaje y Memoria" 
          description="La fe y la naturaleza de Elqui plasmadas en relieve eterno."
        />
      </group>

      <group position={[0, 0, 15]} rotation={[0, Math.PI, 0]}>
        <MuralFrame 
          position={[0, 5, 0]} 
          texturePath={muralImages[3]} 
          title="Compromiso Social" 
          description="Homenaje a la lucha por los DD.HH. y la dignidad vecinal."
        />
      </group>

      {/* Monumento Central - Tributo al Maestro */}
      <group position={[0, 0, 0]}>
        <mesh position={[0, 0.5, 0]} castShadow>
          <cylinderGeometry args={[2, 2.2, 1, 32]} />
          <meshStandardMaterial color="#92400e" metalness={0.5} roughness={0.2} />
        </mesh>
        <Html position={[0, 1.2, 0]} center>
          <div style={{ textAlign: 'center', color: '#fbbf24', textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
            <h2 style={{ margin: 0, fontWeight: '900', fontSize: '24px' }}>MAESTRO DANIEL PALOMINOS</h2>
            <div style={{ fontWeight: 'bold', fontSize: '12px' }}>1953 - 2024</div>
          </div>
        </Html>
        <pointLight position={[0, 2, 0]} intensity={2} color="#fbbf24" distance={10} />
      </group>

      {/* Iluminación de Ambiente */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 20, 10]} intensity={1} castShadow />
      <Environment preset="night" />
    </group>
  );
}

export default function MasterDanielPalominos3D({ onClose, muralImages }) {
  const [cameraMode, setCameraMode] = useState('3rd');
  const [targetPos, setTargetPos] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  // Voz de Serenito al iniciar
  useEffect(() => {
    if (!isLoading && window.speechSynthesis) {
        const welcome = "Bienvenido a la Galería Virtual del Maestro Daniel Palominos. Un espacio sagrado para recordar su inmenso legado artístico y social en nuestra amada Región de Coquimbo. Su arte vive en esta arcilla digital.";
        const ut = new SpeechSynthesisUtterance(welcome);
        ut.lang = "es-CL";
        ut.rate = 0.92;
        window.speechSynthesis.speak(ut);
    }
  }, [isLoading]);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100100, background: '#020617' }}>
      <button 
        onClick={onClose} 
        style={{ position: 'absolute', top: '2rem', right: '2rem', background: '#ef4444', border: 'none', color: 'white', width: '50px', height: '50px', borderRadius: '50%', zIndex: 100, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 20px rgba(239, 68, 68, 0.4)' }}
      >
        <X size={24} />
      </button>

      {/* Título de la Exposición */}
      <div style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 100, pointerEvents: 'none' }}>
        <div style={{ background: 'rgba(15, 23, 42, 0.9)', padding: '1.5rem 2.5rem', borderRadius: '24px', borderLeft: '8px solid #92400e', backdropFilter: 'blur(12px)', border: '1px solid rgba(146, 64, 14, 0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Award color="#fbbf24" size={32} />
            <div>
              <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: '900', color: 'white', letterSpacing: '-1px' }}>DANIEL PALOMINOS</h1>
              <p style={{ margin: 0, color: '#fbbf24', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.9rem' }}>Legado Eterno • Artista Ceramista</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controles de Cámara */}
      <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '1rem', zIndex: 100 }}>
        <button 
            onClick={() => setCameraMode('3rd')} 
            style={{ padding: '0.8rem 1.5rem', borderRadius: '30px', border: 'none', background: cameraMode === '3rd' ? '#92400e' : 'rgba(15,23,42,0.8)', color: 'white', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s' }}
        >
            MODO SEGUIR
        </button>
        <button 
            onClick={() => setCameraMode('1st')} 
            style={{ padding: '0.8rem 1.5rem', borderRadius: '30px', border: 'none', background: cameraMode === '1st' ? '#92400e' : 'rgba(15,23,42,0.8)', color: 'white', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s' }}
        >
            MODO OJOS
        </button>
      </div>

      <Canvas shadows camera={{ fov: 60, position: [0, 8, 20] }}>
        <Suspense fallback={
          <Html center>
            <div style={{ background: 'rgba(15,23,42,0.95)', padding: '2rem', borderRadius: '20px', textAlign: 'center', border: '1px solid #92400e', color: 'white', minWidth: '250px' }}>
              <div style={{ width: '40px', height: '40px', border: '3px solid rgba(146, 64, 14, 0.2)', borderTopColor: '#fbbf24', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }} />
              <p style={{ fontWeight: 'bold', letterSpacing: '1px' }}>DESCARGANDO LEGADO 3D...</p>
            </div>
          </Html>
        }>
          <PalominosExhibition setTargetPos={setTargetPos} muralImages={muralImages} />
          <MuseumPilot targetPos={targetPos} cameraMode={cameraMode} setTargetPos={setTargetPos} />
        </Suspense>
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      </Canvas>

      {isLoading && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 200, background: '#020617', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
          <div style={{ width: '80px', height: '80px', border: '6px solid rgba(146, 64, 14, 0.2)', borderTopColor: '#92400e', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: 'white', margin: 0, fontSize: '2rem', fontWeight: '900' }}>ENTRANDO AL HOMENAJE</h2>
            <p style={{ color: '#fbbf24', fontWeight: 'bold' }}>Preparando Motor 3D Daniel Palominos...</p>
          </div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}
    </div>
  );
}
