import React, { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations, Sky, Stars, Html, useTexture, Clone, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { X, Navigation, Info, Award, RefreshCw, ZoomIn, MessageSquare, User } from 'lucide-react';

// ============================================================
// SERENITO 3D – Modelo GLTF Humanizado (Reemplaza Procedural)
// ============================================================
function SerenitoModel({ avatarRef, headRef, bodyRef, walkPhase, isMoving }) {
  const { scene, animations } = useGLTF('/serenito_draco.glb', 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
  const { actions } = useAnimations(animations, avatarRef);

  // Animaciones automáticas basadas en movimiento
  useEffect(() => {
    if (!actions) return;
    
    // Lista de nombres posibles para caminar/quieto
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

  // Buscamos el hueso de la cabeza para el "Motor Tanque"
  useEffect(() => {
    if (scene) {
      scene.traverse(node => {
        // Mapeo robusto de huesos para modelos humanizados (Mixamo/Standard)
        const name = node.name.toLowerCase();
        if (node.isBone && (name.includes('head') || name.includes('neck') || name.includes('jefe') || name.includes('cranium'))) {
          headRef.current = node;
        }
      });
    }
  }, [scene, headRef]);

  return (
    <group ref={avatarRef}>
      {/* Ajuste de altura: Serenito ya no está hundido. Originamos pies en Y=0 */}
      <primitive object={scene} scale={1.8} position={[0, 0, 0]} castShadow />
    </group>
  );
}

// ============================================================
// MOTOR TANK: Cabeza gira → Cuerpo sigue → Avanza
// ============================================================
function TankPlayer({ targetPos, cameraMode, setTargetPos }) {
  const { camera } = useThree();
  const avatarRef = useRef();
  const headRef = useRef();
  const bodyRef = useRef();

  const posRef = useRef(new THREE.Vector3(0, 0, 15));
  const bodyRotRef = useRef(0);     // Rotación actual del cuerpo
  const headRotRef = useRef(0);     // Rotación actual de la cabeza (RELATIVA al cuerpo)
  const targetBodyRotRef = useRef(0); // A dónde debe girar el cuerpo
  const targetHeadRotRef = useRef(0); // A dónde debe girar la cabeza primero

  const [keys, setKeys] = useState({});
  const [isMoving, setIsMoving] = useState(false);
  const [walkPhase, setWalkPhase] = useState(0);

  useEffect(() => {
    const handleDown = (e) => {
      if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault();
      setKeys(prev => ({ ...prev, [e.code]: true }));
    };
    const handleUp = (e) => {
      if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault();
      setKeys(prev => ({ ...prev, [e.code]: false }));
    };
    window.addEventListener('keydown', handleDown, { passive: false });
    window.addEventListener('keyup', handleUp, { passive: false });
    return () => {
      window.removeEventListener('keydown', handleDown);
      window.removeEventListener('keyup', handleUp);
    };
  }, []);

  useFrame((state, delta) => {
    if (!avatarRef.current || !headRef.current) return;

    let moving = false;
    const moveSpeed = 8 * delta;
    const rotSpeed = 2.5 * delta;
    let headLookAngle = 0;

    // ── TECLADO (modo clásico tanque: flechas/WASD) ──
    if (keys['KeyA'] || keys['ArrowLeft']) {
      bodyRotRef.current += rotSpeed;
      headRotRef.current = 0; // cabeza mira al frente al girar
    }
    if (keys['KeyD'] || keys['ArrowRight']) {
      bodyRotRef.current -= rotSpeed;
      headRotRef.current = 0;
    }
    if (keys['KeyW'] || keys['ArrowUp']) {
      posRef.current.x += Math.sin(bodyRotRef.current) * moveSpeed;
      posRef.current.z += Math.cos(bodyRotRef.current) * moveSpeed;
      headRotRef.current = THREE.MathUtils.lerp(headRotRef.current, 0, 0.1);
      moving = true;
    }
    if (keys['KeyS'] || keys['ArrowDown']) {
      posRef.current.x -= Math.sin(bodyRotRef.current) * moveSpeed;
      posRef.current.z -= Math.cos(bodyRotRef.current) * moveSpeed;
      moving = true;
    }

    // ── PUNTO Y CLICK: Cabeza → Cuerpo → Caminar ──
    if (targetPos && !keys['KeyW'] && !keys['ArrowUp']) {
      const dir = new THREE.Vector3().subVectors(targetPos, posRef.current);
      dir.y = 0;
      const dist = dir.length();

      if (dist > 0.8) {
        const globalTargetAngle = Math.atan2(dir.x, dir.z);

        // 1. Cabeza gira hacia el destino (relativa al cuerpo)
        const relAngle = globalTargetAngle - bodyRotRef.current;
        let clampedRel = relAngle;
        while (clampedRel > Math.PI) clampedRel -= Math.PI * 2;
        while (clampedRel < -Math.PI) clampedRel += Math.PI * 2;

        // Lerp la cabeza hacia el ángulo relativo (max ±60°)
        const maxHeadTurn = Math.PI / 3;
        targetHeadRotRef.current = THREE.MathUtils.clamp(clampedRel, -maxHeadTurn, maxHeadTurn);
        headRotRef.current = THREE.MathUtils.lerp(headRotRef.current, targetHeadRotRef.current, 8 * delta);

        // 2. El cuerpo sigue a la cabeza con delay (cuando la cabeza llegó ~50%)
        const headAligned = Math.abs(headRotRef.current - targetHeadRotRef.current) < 0.15;
        if (headAligned || Math.abs(clampedRel) > maxHeadTurn) {
          let bodyDiff = globalTargetAngle - bodyRotRef.current;
          while (bodyDiff > Math.PI) bodyDiff -= Math.PI * 2;
          while (bodyDiff < -Math.PI) bodyDiff += Math.PI * 2;
          bodyRotRef.current += bodyDiff * 5 * delta;
        }

        // 3. Una vez el cuerpo está alineado → avanza
        const bodyAligned = Math.abs(clampedRel) < 0.25;
        if (bodyAligned) {
          posRef.current.add(dir.normalize().multiplyScalar(9 * delta));
          headRotRef.current = THREE.MathUtils.lerp(headRotRef.current, 0, 6 * delta);
          moving = true;
        }
      } else {
        // Llegó al destino → cabeza vuelve al frente
        headRotRef.current = THREE.MathUtils.lerp(headRotRef.current, 0, 6 * delta);
        if (Math.abs(headRotRef.current) < 0.02) {
          setTargetPos(null);
        }
      }
    }
    // Asegurar nivel del suelo VLS – NUNCA BAJAR O COLGARSE
    posRef.current.y = 0;

    // Aplicar posición y rotaciones
    avatarRef.current.position.copy(posRef.current);
    avatarRef.current.rotation.y = bodyRotRef.current;

    // Solo rotamos la cabeza si el hueso fue encontrado en el modelo GLTF
    if (headRef.current) {
        headRef.current.rotation.y = headRotRef.current;
    }

    // Actualizar estado para animación de piernas/brazos
    if (moving !== isMoving) setIsMoving(moving);
    if (moving) setWalkPhase(state.clock.elapsedTime * 8);

    // ── CÁMARA ──
    const fwdX = Math.sin(bodyRotRef.current);
    const fwdZ = Math.cos(bodyRotRef.current);
    const px = posRef.current.x;
    const py = posRef.current.y;
    const pz = posRef.current.z;
    const sm = 0.07;

    if (cameraMode === '3rd') {
      camera.position.lerp(new THREE.Vector3(px - fwdX * 10, py + 6, pz - fwdZ * 10), sm);
      camera.lookAt(px, py + 2, pz);
    } else if (cameraMode === '1st') {
      camera.position.lerp(new THREE.Vector3(px, py + 2.8, pz), 0.25);
      camera.lookAt(px + fwdX * 3, py + 2.5, pz + fwdZ * 3);
    } else if (cameraMode === 'iso') {
      camera.position.lerp(new THREE.Vector3(px + 20, py + 25, pz + 20), sm);
      camera.lookAt(px, py, pz);
    } else if (cameraMode === 'top') {
      camera.position.lerp(new THREE.Vector3(px, 55, pz + 0.01), sm);
      camera.lookAt(px, py, pz);
    }
  });

  return (
    <>
      <SerenitoModel
        avatarRef={avatarRef}
        headRef={headRef}
        bodyRef={bodyRef}
        walkPhase={walkPhase}
        isMoving={isMoving}
      />
      {/* Indicador de destino */}
      {targetPos && (
        <group position={[targetPos.x, 0.05, targetPos.z]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.4, 0.6, 32]} />
            <meshBasicMaterial color="#ec4899" transparent opacity={0.7} />
          </mesh>
          <pointLight color="#ec4899" intensity={3} distance={4} />
        </group>
      )}
    </>
  );
}

// ============================================================
// EDIFICIOS GLTF – Municipalidad e Intendencia
// ============================================================
function Municipalidad({ position }) {
  const { scene } = useGLTF('/municipalidad_draco.glb', 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
  
  return (
    <group position={position}>
      {scene ? (
        <primitive object={scene} scale={0.8} castShadow receiveShadow />
      ) : (
        /* Fallback procedural por seguridad */
        <mesh position={[0, 5, 0]}>
          <boxGeometry args={[12, 10, 8]} />
          <meshStandardMaterial color="#e8dcc8" />
        </mesh>
      )}
      <Html position={[0, 10.5, 4.5]} center>
        <div style={{ background: 'rgba(30,64,175,0.9)', padding: '4px 12px', borderRadius: '4px', color: 'white', fontSize: '11px', fontWeight: 'bold', whiteSpace: 'nowrap', border: '1px solid #60a5fa' }}>
          🏛 MUNICIPALIDAD DE LA SERENA
        </div>
      </Html>
    </group>
  );
}

function Intendencia({ position }) {
  const { scene } = useGLTF('/intendencia_draco.glb', 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/');

  return (
    <group position={position}>
      {scene ? (
        <primitive object={scene} scale={0.8} castShadow receiveShadow />
      ) : (
        <mesh position={[0, 4.5, 0]}>
          <boxGeometry args={[14, 9, 8]} />
          <meshStandardMaterial color="#dfd5c5" />
        </mesh>
      )}
      <Html position={[0, 10, 4.5]} center>
        <div style={{ background: 'rgba(120,53,15,0.9)', padding: '4px 12px', borderRadius: '4px', color: 'white', fontSize: '11px', fontWeight: 'bold', whiteSpace: 'nowrap', border: '1px solid #f59e0b' }}>
          🏛 INTENDENCIA REGIONAL DE COQUIMBO
        </div>
      </Html>
    </group>
  );
}

// ============================================================
// ESCENA HISTÓRICA – Mapa + Columnas + POIs
// ============================================================
function HistoricScene({ setTargetPos, setSelectedPOI }) {
  const photoPaths = [
    '/comic-aves.jpg',
    '/comic-bici.jpg',
    '/comic-playa.jpg',
    '/serenito-bus.jpg',
    '/serenito-museo.jpg',
  ];

  // Carga robusta de texturas con fallback individual
  const textures = useTexture(photoPaths);

  const POIS = [
    {
      id: 'talavera-plaza',
      name: 'Banca Quijote & Sancho',
      location: 'Plaza España',
      pos: [5, 0.5, 5],
      fact: 'Donadas en 1952 por Talavera de la Reina, España. Patrimonio Cultural Inmaterial UNESCO.',
      audio: 'Bienvenido a la Plaza España. Frente a ti se encuentra un tesoro de 1952: las bancas de cerámica de Talavera de la Reina, un regalo para celebrar los 400 años de La Serena. ¡Mira esta recreación especial de Quijote y Sancho en nuestra ciudad!',
      video: 'https://raw.githubusercontent.com/vecinoslaserenachile-cloud/RDMLS/main/assets/models/Quijote%20Sancho%20en%20Municipalidad%20LS.mp4'
    },
    {
      id: 'municipalidad-puerta',
      name: 'Entrada Municipalidad',
      location: 'Edificio Consistorial',
      pos: [25, 0.5, -10],
      fact: 'El Edificio Consistorial fue construido en el marco del Plan Serena de 1948.',
      audio: 'Te encuentras frente al Edificio Consistorial. Hogar de la Alcaldía y del gobierno local de La Serena desde 1948.',
    },
    {
      id: 'intendencia-puerta',
      name: 'Acceso Intendencia',
      location: 'Gobierno Regional',
      pos: [-25, 0.5, -10],
      fact: 'La Intendencia representa el poder ejecutivo de la Región de Coquimbo.',
    },
    {
      id: 'memorial-precolombino',
      name: 'Memorial Precolombino',
      location: 'Plaza de Armas / Centro',
      pos: [-12, 0.5, 10],
      fact: 'Homenaje a las culturas Diaguita, El Molle y Changos, civilizaciones maestras del Elqui y la Costa.',
      audio: 'Este es el rincón precolombino. Aquí honramos a los Diaguitas, maestros de la alfarería; a la cultura El Molle, pioneros del valle; y a los Changos, nómades del mar que dominaron nuestras costas en balsas de cuero de lobo marino. Sus raíces son la esencia de nuestra Región de Coquimbo.',
      image: '/homenaje/diaguita_ceramic.png' 
    },
    {
      id: 'memorial-vecinos-region',
      name: 'Altar de los Hijos de la Región',
      location: 'Cúpula de la Memoria',
      pos: [0, 0.5, -45],
      fact: 'Memorial sagrado: Daniel Palominos, Jorge Peña Hen, Gabriela Mistral, Bartolomé Blanche e Isabel Bongard.',
      audio: 'Bienvenidos al Altar de los Hijos de la Región. En este espacio de reflexión recordamos al Maestro Daniel Palominos, cuya arcilla capturó el alma regional; a Jorge Peña Hen, quien sembró música en los niños; y a todos los vecinos ilustres que forjaron nuestra historia. Sus nombres están grabados en el corazón de La Serena.',
      image: '/homenaje/palominos_mural_humanity_1773806652665.png'
    }
  ];

  // Columnas laterales (6 por lado)
  const leftPillars = Array.from({ length: 6 }, (_, i) => ({ x: -15, z: -i * 14, texIndex: i % photoPaths.length }));
  const rightPillars = Array.from({ length: 6 }, (_, i) => ({ x: 15, z: -i * 14, texIndex: (i + 3) % photoPaths.length }));
  const pillars = [...leftPillars, ...rightPillars];

  return (
    <group>
      {/* PISO – suelo urbano */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
        onPointerDown={(e) => { e.stopPropagation(); setTargetPos(e.point); }}
      >
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#c8bfb0" roughness={1} />
      </mesh>

      {/* ACERA CENTRAL */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -40]} receiveShadow>
        <planeGeometry args={[14, 100]} />
        <meshStandardMaterial color="#d9d0c0" roughness={0.9} />
      </mesh>

      {/* Líneas de baldosas */}
      {Array.from({ length: 20 }, (_, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, -i * 5]}>
          <planeGeometry args={[13.8, 0.08]} />
          <meshStandardMaterial color="#b0a898" />
        </mesh>
      ))}

      {/* EDIFICIOS */}
      <Municipalidad position={[28, 0, -20]} />
      <Intendencia position={[-28, 0, -20]} />

      {/* COLUMNAS HISTÓRICAS LATERALES */}
      {pillars.map((p, idx) => (
        <group key={idx} position={[p.x, 0, p.z]}>
          {/* Base */}
          <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.1, 0.6, 1.1]} />
            <meshStandardMaterial color="#e8e0d0" roughness={0.9} />
          </mesh>
          {/* Fuste */}
          <mesh position={[0, 2.2, 0]} castShadow>
            <cylinderGeometry args={[0.28, 0.32, 3.6, 14]} />
            <meshStandardMaterial color="#f1ece2" roughness={0.7} />
          </mesh>
          {/* Capitel */}
          <mesh position={[0, 4.2, 0]} castShadow>
            <boxGeometry args={[1.2, 0.3, 1.2]} />
            <meshStandardMaterial color="#ddd5c5" roughness={0.6} />
          </mesh>
          {/* Marco de foto */}
          <mesh position={[(p.x < 0 ? 0.45 : -0.45), 2.8, 0]} rotation={[0, (p.x < 0 ? Math.PI / 2 : -Math.PI / 2), 0]}>
            <boxGeometry args={[1.7, 2.3, 0.08]} />
            <meshStandardMaterial color="#5c3d1e" roughness={0.8} />
          </mesh>
          {/* Foto histórica */}
          <mesh position={[(p.x < 0 ? 0.5 : -0.5), 2.8, 0]} rotation={[0, (p.x < 0 ? Math.PI / 2 : -Math.PI / 2), 0]}>
            <planeGeometry args={[1.5, 2.1]} />
            <meshBasicMaterial map={textures[p.texIndex]} />
          </mesh>
          {/* Linterna de columna */}
          <mesh position={[0, 4.7, 0]}>
            <sphereGeometry args={[0.2, 10, 8]} />
            <meshStandardMaterial color="#fef9c3" emissive="#fef08a" emissiveIntensity={0.8} />
          </mesh>
          <pointLight position={[p.x, 4.8, p.z]} intensity={0.5} distance={8} color="#fde68a" />
        </group>
      ))}

      {/* POI MARKERS & MEMORIALS */}
      {POIS.map(poi => (
        <group key={poi.id} position={poi.pos}>
          {/* Visual pedestal for specific monuments */}
          {poi.id === 'memorial-vecinos-region' && (
            <mesh position={[0, -0.4, 0]}>
              <cylinderGeometry args={[1.5, 1.8, 0.4, 32]} />
              <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
            </mesh>
          )}

          <mesh
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPOI(poi);
            }}
            onPointerOver={() => (document.body.style.cursor = 'pointer')}
            onPointerOut={() => (document.body.style.cursor = 'default')}
          >
            {/* Hitbox más generosa para activación táctil/mouse */}
            <sphereGeometry args={[0.5, 24, 24]} />
            <meshStandardMaterial 
                color={poi.id.includes('memorial') ? "#f59e0b" : "#38bdf8"} 
                emissive={poi.id.includes('memorial') ? "#f59e0b" : "#38bdf8"} 
                emissiveIntensity={2.5} 
                transparent
                opacity={0.8}
            />
          </mesh>
          <pointLight intensity={4} distance={8} color={poi.id.includes('memorial') ? "#f59e0b" : "#38bdf8"} />
          <Html position={[0, 1.4, 0]} center>
            <div style={{
              background: poi.id.includes('memorial') ? 'rgba(245,158,11,0.95)' : 'rgba(14,165,233,0.95)', 
              padding: '6px 12px', borderRadius: '20px',
              color: 'white', fontSize: '12px', fontWeight: '900', whiteSpace: 'nowrap',
              boxShadow: '0 0 15px rgba(255,255,255,0.3)',
              border: '2px solid white',
              pointerEvents: 'none'
            }}>
              {poi.id.includes('memorial') ? '🕯️' : '📍'} {poi.name}
            </div>
          </Html>
        </group>
      ))}

      {/* ÁRBOLES DECORATIVOS */}
      {[-8, 8, -8, 8].map((x, i) => (
        <group key={i} position={[x, 0, -20 - i * 18]}>
          <mesh position={[0, 1.5, 0]} castShadow>
            <cylinderGeometry args={[0.2, 0.3, 3, 8]} />
            <meshStandardMaterial color="#7c4f1e" roughness={0.9} />
          </mesh>
          <mesh position={[0, 4.5, 0]} castShadow>
            <sphereGeometry args={[2.2, 10, 8]} />
            <meshStandardMaterial color="#15803d" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* BANCO PÚBLICO */}
      <group position={[4, 0, 0]}>
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[2, 0.1, 0.6]} />
          <meshStandardMaterial color="#7c4f1e" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.8, -0.25]}>
          <boxGeometry args={[2, 0.55, 0.1]} />
          <meshStandardMaterial color="#7c4f1e" roughness={0.9} />
        </mesh>
        {[-0.7, 0.7].map((x, i) => (
          <mesh key={i} position={[x, 0.25, 0]}>
            <boxGeometry args={[0.1, 0.5, 0.6]} />
            <meshStandardMaterial color="#5c3d1e" roughness={0.9} />
          </mesh>
        ))}
      </group>

      {/* FOCOS DE AMBIENTE */}

      {/* MONUMENTO PRECOLOMBINO (DIAGUITA) */}
      <group position={[-12, 0, 10]}>
        <mesh position={[0, 1.5, 0]} castShadow>
          <boxGeometry args={[1.2, 3, 1.2]} />
          <meshStandardMaterial color="#92400e" roughness={0.9} />
        </mesh>
        <mesh position={[0, 3.5, 0]}>
          <coneGeometry args={[0.8, 1.5, 4]} />
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.2} />
        </mesh>
        {/* Patrones Diaguitas visuales (simulados por líneas) */}
        {[0, 1, 2].map(i => (
          <mesh key={i} position={[0, 1 + i, 0.61]}>
             <planeGeometry args={[1, 0.1]} />
             <meshBasicMaterial color="#fff" />
          </mesh>
        ))}
        <pointLight position={[0, 4, 0]} intensity={1.5} color="#f59e0b" distance={8} />
      </group>

      {/* ALTAR DE LOS HIJOS DE LA REGIÓN (DANIEL PALOMINOS Y OTROS) */}
      <group position={[0, 0, -45]}>
        <mesh position={[0, 0.4, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[4, 4.5, 0.8, 32]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.9, 0]}>
          <cylinderGeometry args={[3.5, 3.5, 0.2, 32]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.5} />
        </mesh>
        {/* Rayo de luz celestial */}
        <mesh position={[0, 10, 0]}>
          <cylinderGeometry args={[0.05, 1.5, 20, 16]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.15} />
        </mesh>
        <pointLight position={[0, 2, 0]} intensity={4} color="#38bdf8" distance={15} />
      </group>

      <ambientLight intensity={0.5} />
      <directionalLight castShadow position={[30, 50, 20]} intensity={1.5} color="#fff5e0" />
      <pointLight position={[0, 20, -30]} intensity={1} distance={60} color="#dbeafe" />
    </group>
  );
}

// ============================================================
// COMPONENTE PRINCIPAL – HistoricWalk3D
// ============================================================
export default function HistoricWalk3D({ onClose, era }) {
  const [cameraMode, setCameraMode] = useState('3rd');
  const [selectedPOI, setSelectedPOI] = useState(null);
  const [targetPos, setTargetPos] = useState(null);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLang, setSelectedLang] = useState('ES');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());
  const isMobileModal = window.innerWidth < 768;

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  const handlePlayAudio = (poi) => {
    // Detener cualquier audio previo
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    audioRef.current.pause();
    audioRef.current.currentTime = 0;

    if (poi.multilang && poi.multilang[selectedLang]) {
      // Audio pre-grabado del repositorio
      audioRef.current.src = poi.multilang[selectedLang];
      audioRef.current.play().catch(e => console.error("Error playing audio:", e));
      setIsPlaying(true);
      audioRef.current.onended = () => setIsPlaying(false);
    } else {
      // Fallback a Síntesis de voz (TTS)
      if (!window.speechSynthesis) return;
      const ut = new SpeechSynthesisUtterance(poi.audio);
      ut.lang = selectedLang === 'EN' ? 'en-US' : 'es-CL';
      ut.pitch = 1.1;
      ut.rate = 0.95;
      ut.onstart = () => setIsPlaying(true);
      ut.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(ut);
    }
  };

  const handleStopAudio = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    audioRef.current.pause();
    setIsPlaying(false);
  };

  useEffect(() => {
    return () => {
      handleStopAudio();
    };
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 90000, background: '#020617', fontFamily: 'system-ui, sans-serif' }}>
      <style>{`
        .cam-btn {
          padding: 0.5rem 1.1rem;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 10px;
          background: rgba(15,23,42,0.85);
          color: white;
          cursor: pointer;
          font-size: 0.8rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: all 0.2s;
        }
        .cam-btn:hover { background: rgba(56,189,248,0.25); border-color: #38bdf8; }
        .cam-btn.active { background: #38bdf8; color: #000; border-color: #38bdf8; box-shadow: 0 0 15px rgba(56,189,248,0.5); }
        .hint-key {
          display: inline-flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.25);
          border-radius: 6px; padding: 2px 8px; font-size: 0.75rem; font-weight: bold; color: white;
          min-width: 28px;
        }
        .cinematic-breathe {
          animation: cinematicBreathe 8s ease-in-out infinite alternate;
        }
        @keyframes cinematicBreathe {
          from { transform: scale(1.02) translate(0, 0); }
          to { transform: scale(1.08) translate(-1%, -1%); }
        }
      `}</style>

      {/* ── UI OVERLAY ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 3010, pointerEvents: 'none' }}>

        {/* Header */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', pointerEvents: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ background: 'rgba(2,6,23,0.92)', padding: '1rem 1.8rem', borderRadius: '16px', borderLeft: '4px solid #38bdf8', backdropFilter: 'blur(10px)' }}>
              <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '900', color: 'white', letterSpacing: '-0.5px' }}>
                🏛 PASEO HISTÓRICO 3D
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                <div style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
                <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 'bold' }}>
                  {era ? `VIAJE EN EL TIEMPO: ${era.year > 0 ? era.year : Math.abs(era.year) + ' AC'}` : 'TIEMPO REAL (HISTÓRICO)'}
                </span>
              </div>
            </div>
            {era && (
              <div className="animate-fade-in" style={{ background: 'rgba(245, 158, 11, 0.95)', padding: '0.8rem 1.2rem', borderRadius: '12px', borderLeft: '4px solid white', color: 'black', fontWeight: '900', fontSize: '0.85rem' }}>
                📜 {era.name.toUpperCase()}
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            style={{ background: '#ef4444', border: 'none', color: 'white', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 20px rgba(239,68,68,0.4)', pointerEvents: 'auto' }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Panel de controles (toggle) */}
        <div style={{ position: 'absolute', top: '110px', left: '2rem', pointerEvents: 'auto' }}>
          <button onClick={() => setShowControls(!showControls)} style={{ background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', padding: '0.4rem 0.9rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.5rem', display: 'block', width: '100%' }}>
            {showControls ? '▲ Ocultar controles' : '▼ Mostrar controles'}
          </button>
          {showControls && (
            <div style={{ background: 'rgba(2,6,23,0.9)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(56,189,248,0.3)', backdropFilter: 'blur(10px)' }}>
              <div style={{ color: '#38bdf8', fontSize: '0.7rem', fontWeight: '900', letterSpacing: '1px', marginBottom: '0.8rem' }}>CONTROLES</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <span className="hint-key">W</span><span className="hint-key">↑</span>
                  <span style={{ color: '#94a3b8', fontSize: '0.75rem', marginLeft: '4px' }}>Avanzar</span>
                </div>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <span className="hint-key">A</span><span className="hint-key">D</span>
                  <span style={{ color: '#94a3b8', fontSize: '0.75rem', marginLeft: '4px' }}>Girar</span>
                </div>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <span className="hint-key">S</span><span className="hint-key">↓</span>
                  <span style={{ color: '#94a3b8', fontSize: '0.75rem', marginLeft: '4px' }}>Retroceder</span>
                </div>
                <div style={{ marginTop: '4px', color: '#94a3b8', fontSize: '0.72rem', lineHeight: '1.4' }}>
                  🖱️ <strong style={{ color: 'white' }}>Clic en el suelo</strong> para que Serenito camine
                </div>
                <div style={{ color: '#94a3b8', fontSize: '0.72rem', lineHeight: '1.4' }}>
                  📍 <strong style={{ color: '#38bdf8' }}>Clic en esferas</strong> para explorar sitios
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Barra inferior – Cámara */}
        <div style={{ position: 'absolute', bottom: '2rem', left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', pointerEvents: 'auto' }}>
          <div style={{ background: 'rgba(2,6,23,0.85)', padding: '0.5rem 1.2rem', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', fontSize: '0.8rem', backdropFilter: 'blur(8px)' }}>
            🧭 La cabeza gira primero → el cuerpo sigue → Serenito camina
          </div>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            {[['1st', '👁 OJOS'], ['3rd', '🎮 SEGUIR'], ['iso', '🚁 DRÓN'], ['top', '🛰 ZÉNIT']].map(([mode, label]) => (
              <button key={mode} className={`cam-btn ${cameraMode === mode ? 'active' : ''}`} onClick={() => setCameraMode(mode)}>
                {label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* ── MODAL POI ── */}
      {selectedPOI && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100000, background: 'rgba(0,0,0,0.88)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div style={{ width: '100%', maxWidth: '700px', background: 'rgba(2,6,23,0.98)', borderRadius: '24px', padding: '2.5rem', border: '2px solid #38bdf8', boxShadow: '0 0 60px rgba(56,189,248,0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div>
                <h1 style={{ margin: 0, fontSize: '1.6rem', color: 'white' }}>{selectedPOI.name}</h1>
                <span style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '0.9rem' }}>{selectedPOI.location}</span>
              </div>
              <button onClick={() => setSelectedPOI(null)} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>

            <div style={{ display: 'flex', flexDirection: isMobileModal ? 'column' : 'row', gap: '1.5rem', alignItems: 'flex-start' }}>
              {selectedPOI.image && (
                <div style={{ flex: 1.5, width: '100%', borderRadius: '12px', overflow: 'hidden', border: '2px solid #38bdf8', position: 'relative' }}>
                  <img 
                    src={selectedPOI.image} 
                    alt={selectedPOI.name}
                    className="cinematic-breathe"
                    style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 40px rgba(0,0,0,0.6)', pointerEvents: 'none' }} />
                </div>
              )}
              {selectedPOI.video && (
                <div style={{ flex: 1.5, width: '100%', borderRadius: '12px', overflow: 'hidden', border: '2px solid #38bdf8' }}>
                  <video 
                    src={selectedPOI.video} 
                    style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }}
                    autoPlay 
                    muted 
                    loop 
                    controls
                  />
                </div>
              )}
              <div style={{ flex: 1, background: '#111827', borderRadius: '12px', padding: '1.2rem', border: '1px solid #1e3a5f' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.8rem' }}>
                  <Award color="#f59e0b" size={20} />
                  <span style={{ color: '#f59e0b', fontWeight: 'bold', fontSize: '0.85rem' }}>DATO HISTÓRICO</span>
                </div>
                <p style={{ color: '#94a3b8', lineHeight: '1.6', margin: 0, fontSize: '0.95rem' }}>{selectedPOI.fact}</p>
              </div>
            </div>

            {selectedPOI.multilang && (
              <div style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(56,189,248,0.2)' }}>
                <div style={{ width: '100%', textAlign: 'center', fontSize: '0.75rem', color: '#38bdf8', marginBottom: '0.5rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Seleccionar Idioma del Relato
                </div>
                {Object.keys(selectedPOI.multilang).map(lang => (
                  <button
                    key={lang}
                    onClick={() => {
                        setSelectedLang(lang);
                        handleStopAudio();
                    }}
                    style={{
                      padding: '0.4rem 0.8rem',
                      borderRadius: '6px',
                      border: '1px solid',
                      borderColor: selectedLang === lang ? '#38bdf8' : 'rgba(255,255,255,0.2)',
                      background: selectedLang === lang ? 'rgba(56,189,248,0.2)' : 'transparent',
                      color: selectedLang === lang ? '#38bdf8' : 'white',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      transition: 'all 0.2s'
                    }}
                  >
                    {lang === 'ES' ? '🇪🇸 ESP' : 
                     lang === 'EN' ? '🇺🇸 ENG' : 
                     lang === 'JP' ? '🇯🇵 JAP' : 
                     lang === 'RU' ? '🇷🇺 RUS' : 
                     lang === 'MAPU' ? '🌿 MAP' : 
                     lang === 'ZH' ? '🇨🇳 CHI' : 
                     lang === 'FR' ? '🇫🇷 FRA' : lang}
                  </button>
                ))}
              </div>
            )}

            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
              {!isPlaying ? (
                <button
                  onClick={() => handlePlayAudio(selectedPOI)}
                  style={{ flex: 1, background: '#1d4ed8', border: 'none', color: 'white', padding: '0.9rem', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <MessageSquare size={20} /> ESCUCHAR RELATO ({selectedLang})
                </button>
              ) : (
                <button
                  onClick={handleStopAudio}
                  style={{ flex: 1, background: '#ef4444', border: 'none', color: 'white', padding: '0.9rem', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <RefreshCw size={20} className="animate-spin" /> DETENER AUDIO
                </button>
              )}
              <button
                onClick={() => { handleStopAudio(); setSelectedPOI(null); }}
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '0.9rem 1.5rem', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── CANVAS 3D ── */}
      <Canvas shadows camera={{ fov: 60, position: [0, 6, 25] }}>
        <Sky sunPosition={[100, 30, 100]} turbidity={0.3} rayleigh={0.4} />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />

        <Suspense fallback={
          <Html center>
            <div style={{ background: 'rgba(2,6,23,0.95)', padding: '2rem 3rem', borderRadius: '20px', textAlign: 'center', border: '1px solid #38bdf8' }}>
              <div style={{ width: '50px', height: '50px', border: '4px solid rgba(56,189,248,0.2)', borderTopColor: '#38bdf8', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }} />
              <p style={{ color: '#38bdf8', fontWeight: 'bold', margin: 0 }}>Cargando Plaza Histórica...</p>
            </div>
          </Html>
        }>
          <HistoricScene setTargetPos={setTargetPos} setSelectedPOI={setSelectedPOI} />
          <TankPlayer targetPos={targetPos} cameraMode={cameraMode} setTargetPos={setTargetPos} />
        </Suspense>
      </Canvas>

      {/* ── PANTALLA DE CARGA ── */}
      {isLoading && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 200000, background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ width: '80px', height: '80px', border: '6px solid rgba(56,189,248,0.15)', borderTopColor: '#38bdf8', borderRadius: '50%', animation: 'spin 0.9s linear infinite' }} />
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: 'white', margin: 0, fontSize: '1.6rem', fontWeight: '900' }}>PASEO HISTÓRICO 3D</h2>
            <p style={{ color: '#38bdf8', marginTop: '8px', fontWeight: 'bold' }}>Inicializando Serenito & Motor Tanque...</p>
          </div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}
    </div>
  );
}
