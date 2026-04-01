import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations, Sky, Stars, Html, Environment, Text, ContactShadows, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { X, Navigation, Info, Award, Music, User, Star, Quote, Play, Pause, SkipForward, SkipBack, Volume2, Droplets, Mail, Share2, Send, Sparkles, Camera, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import MiguelLightScanner from './MiguelLightScanner';

const MIGUEL_PLAYLIST = [
  { title: "El Aguatero Leguero", src: "/agua/El Aguatero Leguero.mp3" },
  { title: "El vecino cantautor del uruguay", src: "/agua/El Aguatero del Uruguay con Miguel.mp3" },
  { title: "Come Sano, Toma Agua!", src: "/agua/Come Sano, Toma Agua! (Remastered).mp3" },
  { title: "Cuidando Vive", src: "/agua/Cuidando Vive by Miguel.mp3" },
  { title: "Cuidando Vive de Miguel", src: "/agua/Cuidando Vive de Miguel.mp3" },
  { title: "Cuidando Vive la Región de Coquimbo", src: "/agua/Cuidando Vive la Región de Coquimbo by Miguel.mp3" },
  { title: "Cuidar", src: "/agua/Cuidar de Miguel.mp3" },
  { title: "Cuidar la vida", src: "/agua/Cuidar la vida con Miguel.mp3" },
  { title: "En La Serena", src: "/agua/En La Serena by Miguel.mp3" },
  { title: "Es Tarea de Todos!", src: "/agua/Es Tarea de Todos! by Miguel.mp3" },
  { title: "Llega la mañana", src: "/agua/Llega la mañana por Miguel.mp3" },
  { title: "No siempre fue igual", src: "/agua/No siempre fue igual by Miguel 2004.mp3" },
  { title: "Quién me cuida", src: "/agua/Quién me cuida de Miguel.mp3" },
  { title: "Vamos que ya llega la mañana", src: "/agua/Vamos que ya llega la mañana con Miguel.mp3" }
];

// ============================================================
// MOTOR DE SONIDO SINTÉTICO PARA INSTRUMENTOS
// ============================================================
const playInstrumentSound = (type) => {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        const now = ctx.currentTime;
        
        if (type === '🎸') { // Guitarra / Cuerda
            osc.type = 'sawtooth';
            const baseFreq = 146.83; // D3
            [0, 0.05, 0.1, 0.15].forEach((offset, i) => {
                const subOsc = ctx.createOscillator();
                subOsc.type = 'sawtooth';
                subOsc.frequency.setValueAtTime(baseFreq * (i + 1), now + offset);
                subOsc.connect(gain);
                subOsc.start(now + offset);
                subOsc.stop(now + offset + 0.8);
            });
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 1.2);
            osc.start(now); osc.stop(now + 1.2);
        } else if (type === '🥁') { // Batería / Percusión
            const noise = ctx.createBufferSource();
            const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.2, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
            noise.buffer = buffer;
            const filter = ctx.createBiquadFilter();
            filter.type = 'highpass';
            filter.frequency.setValueAtTime(1000, now);
            noise.connect(filter);
            filter.connect(gain);
            gain.gain.setValueAtTime(0.4, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
            noise.start(now);
        } else if (type === '🎷' || type === '🎺') { // Viento
            osc.type = 'square';
            osc.frequency.setValueAtTime(330, now);
            osc.frequency.exponentialRampToValueAtTime(660, now + 0.4);
            lfo.frequency.setValueAtTime(5, now);
            lfoGain.gain.setValueAtTime(10, now);
            lfo.connect(lfoGain.gain);
            lfoGain.connect(osc.frequency);
            lfo.start(now);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
            osc.start(now); osc.stop(now + 0.6);
        } else if (type === '🎹' || type === '🎼') { // Armonía
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(523.25, now); // C5
            gain.gain.setValueAtTime(0.25, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 1.5);
            osc.start(now); osc.stop(now + 1.5);
        } else {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(440, now);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
            osc.start(now); osc.stop(now + 0.5);
        }
    } catch (e) {
        console.warn("Audio Interaction blocked by browser or unavailable.");
    }
};

// ============================================================
// GOTA DE AGUA AVATAR - GUÍA 3D
// ============================================================
function MiguelSoccerAvatar({ avatarRef, isMoving }) {
  const model = useGLTF('/agua/miguel3dfutbol.glb', 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/');

  // Refinado de materiales para evitar efecto 'plástico' y humanizar el render
  const processedScene = React.useMemo(() => {
    const cloned = model.scene.clone();
    cloned.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
        if (o.material) {
          // Usamos MeshPhysicalMaterial para un look más premium
          const oldMat = o.material;
          o.material = new THREE.MeshPhysicalMaterial({
            map: oldMat.map,
            color: oldMat.color,
            roughness: 0.5,
            metalness: 0.1,
            reflectivity: 0.5,
            clearcoat: 0.2, // Añade una capa de brillo premium
            clearcoatRoughness: 0.2,
            envMapIntensity: 1.2
          });
        }
      }
    });
    return cloned;
  }, [model.scene]);

  useFrame((state) => {
    if (avatarRef.current) {
        avatarRef.current.position.y = 2.5 + Math.sin(state.clock.elapsedTime * 5) * 0.5;
        avatarRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 4) * 0.08;
    }
  });

  return (
    <group ref={avatarRef} scale={2.5}>
      <primitive object={processedScene} />
      <pointLight position={[0, 1, 0]} intensity={2.5} color="#ffffff" distance={10} />
    </group>
  );
}

function WaterDropAvatar({ avatarRef, isMoving }) {
  const { scene } = useGLTF('/agua/gota+de+agua+3d.glb', 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
  
  const processedScene = React.useMemo(() => {
    const cloned = scene.clone();
    cloned.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        if (o.material) {
            o.material = new THREE.MeshPhysicalMaterial({
                color: '#38bdf8',
                transparent: true,
                opacity: 0.8,
                transmission: 0.9,
                roughness: 0.1,
                metalness: 0.2,
                thickness: 2,
                ior: 1.33,
                envMapIntensity: 2
            });
        }
      }
    });
    return cloned;
  }, [scene]);

  useFrame((state, delta) => {
    if (avatarRef.current && avatarRef.current.children[0]) {
        avatarRef.current.children[0].rotation.y += delta * 0.5;
        avatarRef.current.children[0].position.y = 2.5 + Math.sin(state.clock.elapsedTime * 2) * 0.5;
        avatarRef.current.children[0].rotation.x = THREE.MathUtils.lerp(
            avatarRef.current.children[0].rotation.x, 
            isMoving ? 0.3 : 0, 
            0.1
        );
    }
  });

  return (
    <group ref={avatarRef}>
      <group scale={1.5}>
        <primitive object={processedScene} />
        <pointLight position={[0, 0, 0]} intensity={3.5} color="#38bdf8" distance={15} />
      </group>
    </group>
  );
}

// ============================================================
// MOTOR TANK: Gota se mueve al click
// ============================================================
function MuseumPilot({ targetPos, setTargetPos, currentTrackIdx = 0, showDrop = true, showSoccer = true }) {
  const dropRef = useRef();
  const soccerRef = useRef();
  const posRef = useRef(new THREE.Vector3(0, 0, 15));
  const bodyRotRef = useRef(0);
  const [isMoving, setIsMoving] = useState(false);

  useFrame((state, delta) => {
    if ((!showDrop && !showSoccer)) return;
    let moving = false;

    if (targetPos) {
        const dir = new THREE.Vector3().subVectors(targetPos, posRef.current);
        dir.y = 0;
        const dist = dir.length();
        if (dist > 0.5) {
            const angle = Math.atan2(dir.x, dir.z);
            let diff = angle - bodyRotRef.current;
            while(diff > Math.PI) diff -= Math.PI * 2;
            while(diff < -Math.PI) diff += Math.PI * 2;
            bodyRotRef.current += diff * 5 * delta;
            
            if (Math.abs(diff) < 0.5) {
                posRef.current.add(dir.normalize().multiplyScalar(8 * delta));
                moving = true;
            }
        } else {
            setTargetPos(null);
        }
    }

    if (dropRef.current) {
        dropRef.current.position.copy(posRef.current);
        dropRef.current.rotation.y = bodyRotRef.current;
        dropRef.current.visible = showDrop;
    }
    if (soccerRef.current) {
        const offset = new THREE.Vector3(3, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), bodyRotRef.current);
        soccerRef.current.position.copy(posRef.current).add(offset);
        soccerRef.current.rotation.y = bodyRotRef.current;
        soccerRef.current.visible = showSoccer;
    }
    if (moving !== isMoving) setIsMoving(moving);
  });

  return (
    <group>
        {showDrop && <WaterDropAvatar avatarRef={dropRef} isMoving={isMoving} />}
        {showSoccer && (
           <Suspense fallback={
               <group ref={soccerRef} scale={1.5} position={[posRef.current.x + 3, 0, posRef.current.z]}>
                   <mesh position={[0, 1.5, 0]} castShadow><capsuleGeometry args={[0.5, 1, 4, 8]} /><meshStandardMaterial color="#0ea5e9" /></mesh>
                   <mesh position={[0, 2.8, 0]} castShadow><sphereGeometry args={[0.4]} /><meshStandardMaterial color="#fbbf24" /></mesh>
               </group>
           }>
               <MiguelSoccerAvatar avatarRef={soccerRef} isMoving={isMoving} />
           </Suspense>
        )}
    </group>
  );
}

// ============================================================
// INSTRUMENTOS ORBITALES INTERACTIVOS
// ============================================================
function InteractiveInstrument({ type, orbitRadius, speed, offset, height }) {
    const groupRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime() * speed + offset;
        if (groupRef.current) {
            groupRef.current.position.x = Math.sin(time) * orbitRadius;
            groupRef.current.position.z = Math.cos(time) * orbitRadius;
            groupRef.current.position.y = height + Math.sin(time * 1.5) * 1.5;
            groupRef.current.rotation.y = -time;
        }
    });

    return (
        <group ref={groupRef}>
            <Html center distanceFactor={12}>
                <motion.div 
                    whileHover={{ scale: 1.4, filter: 'drop-shadow(0 0 15px #38bdf8)' }}
                    whileTap={{ scale: 0.8 }}
                    onClick={() => playInstrumentSound(type)}
                    style={{
                        fontSize: '60px',
                        cursor: 'pointer',
                        userSelect: 'none',
                        filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.5))',
                        transition: 'all 0.2s'
                    }}
                >
                    {type}
                </motion.div>
            </Html>
        </group>
    );
}

function MusicalAtmosphere() {
    const instruments = [
        { type: '🎸', radius: 25, speed: 0.4, offset: 0, height: 10 },
        { type: '🥁', radius: 20, speed: -0.5, offset: Math.PI / 2, height: 8 },
        { type: '🎷', radius: 30, speed: 0.3, offset: Math.PI, height: 12 },
        { type: '🎺', radius: 35, speed: -0.2, offset: Math.PI * 1.5, height: 15 },
        { type: '🎹', radius: 40, speed: 0.25, offset: 0.5, height: 9 },
        { type: '🪗', radius: 28, speed: 0.35, offset: 2.5, height: 11 }
    ];

    return (
        <group>
            {instruments.map((inst, i) => (
                <InteractiveInstrument key={i} {...inst} />
            ))}
        </group>
    );
}

// ============================================================
// EL RÍO Y CICLO DEL AGUA
// ============================================================
function FloatingRiver({ color = "#0ea5e9" }) {
  const riverRef = useRef();
  
  useFrame((state, delta) => {
      if (riverRef.current) {
          riverRef.current.position.z = (state.clock.elapsedTime * 2) % 20;
      }
  });

  return (
    <group position={[0, 0.02, 0]}>
        {/* River current - Cristalino con Transmisión Física */}
        <mesh ref={riverRef} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[14, 200, 32, 32]} />
            <meshPhysicalMaterial 
               color={color} 
               transparent 
               opacity={0.4} 
               transmission={0.8}
               roughness={0.05}
               metalness={0.1}
               ior={1.33}
               thickness={1.5}
               emissive={color}
               emissiveIntensity={0.2}
            />
        </mesh>
        
        {/* Shore glow */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
            <planeGeometry args={[18, 200]} />
            <meshBasicMaterial color={color} transparent opacity={0.1} />
        </mesh>
    </group>
  );
}

// ============================================================
// HORIZONTE DEL ELQUI (Montañas y Observatorios)
// ============================================================
function ElquiHorizon() {
  const mountMaterial = new THREE.MeshStandardMaterial({ color: '#1e293b', roughness: 0.8, metalness: 0.1 });
  
  const mountains = React.useMemo(() => {
    const items = [];
    // Generar anillo de montañas con cimas aplanadas para los observatorios
    for(let i=0; i<45; i++) {
        const angle = (i / 45) * Math.PI * 2;
        const radius = 65 + Math.random() * 15;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        const height = 8 + Math.random() * 15;
        const topRadius = 2 + Math.random() * 3; // Cima aplanada
        
        items.push(
            <group key={i} position={[x, height/2 - 3, z]}>
                <mesh material={mountMaterial}>
                    <cylinderGeometry args={[topRadius, height * 1.2, height * 2, 16]} />
                </mesh>
                {/* Observatorios mejor acoplados en la meseta de la cumbre */}
                {Math.random() > 0.85 && (
                    <group position={[0, height - 2.5, 0]} scale={0.6}>
                        <mesh position={[0, 0.5, 0]}><cylinderGeometry args={[2, 2.2, 1.5, 16]} /><meshStandardMaterial color="#cbd5e1" /></mesh>
                        <mesh position={[0, 1.8, 0]}><sphereGeometry args={[2, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshStandardMaterial color="#f8fafc" /></mesh>
                        <mesh position={[1.5, 2.3, 0]} rotation={[0, 0, -Math.PI / 4]}><boxGeometry args={[0.5, 2, 0.5]} /><meshStandardMaterial color="#020617" /></mesh>
                        <pointLight intensity={0.5} distance={20} color="#fcd34d" />
                    </group>
                )}
            </group>
        );
    }
    return items;
  }, []);

  return <group>{mountains}</group>;
}

// ============================================================
// ELEMENTOS DEL CIELO (Cometas, Estrellas Fugaces y Satélites)
// ============================================================
function ShootingStars() {
    const starRef = useRef();
    useFrame((state, delta) => {
        if (starRef.current) {
            starRef.current.position.x -= delta * 80;
            starRef.current.position.y -= delta * 30;
            if (starRef.current.position.x < -150) {
                starRef.current.position.set(150, 60 + Math.random() * 40, -120 - Math.random() * 50);
            }
        }
    });
    return (
        <mesh ref={starRef} position={[150, 80, -120]}>
            <sphereGeometry args={[0.5, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
            <mesh position={[5, 2, 0]} rotation={[0, 0, Math.PI / 6.5]}>
                <cylinderGeometry args={[0.01, 0.5, 12, 8]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
            </mesh>
        </mesh>
    );
}

function Satellite() {
    const ref = useRef();
    useFrame((state, delta) => {
        if(ref.current) {
            ref.current.position.x = Math.sin(state.clock.elapsedTime * 0.05) * 90;
            ref.current.position.z = Math.cos(state.clock.elapsedTime * 0.05) * 90;
            ref.current.rotation.y += delta * 0.5;
        }
    });
    return (
        <group ref={ref} position={[0, 50, 0]}>
            <mesh><boxGeometry args={[1.5, 1.5, 1.5]} /><meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} /></mesh>
            <mesh position={[3, 0, 0]}><planeGeometry args={[4, 1.5]} /><meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={0.2} /></mesh>
            <mesh position={[-3, 0, 0]}><planeGeometry args={[4, 1.5]} /><meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={0.2} /></mesh>
            <pointLight intensity={2} distance={15} color="#ef4444" />
        </group>
    );
}

// ============================================================
// PANELES BIOGRÁFICOS Y RETRATOS
// ============================================================
function BiopicPanel({ position, rotation, title, description, icon: Icon, color, image }) {
    return (
      <group position={position} rotation={rotation}>
        <mesh position={[0, 4, 0]} castShadow>
          <boxGeometry args={[11, 6, 0.2]} />
          <meshStandardMaterial color="#0f172a" roughness={0.7} metalness={0.5} />
        </mesh>
        
        <Html position={[0, 4, 0.15]} center transform>
          <div style={{ width: '880px', height: '480px', display: 'flex', flexDirection: 'row', borderRadius: '15px', color: 'white', border: `3px solid ${color}`, boxShadow: `0 0 40px ${color}40`, overflow: 'hidden', background: '#020617' }}>
            
            {/* IZQUIERDO: IMAGEN COMPLETA SIN RECORTES */}
            <div style={{ width: '45%', position: 'relative', background: 'radial-gradient(circle at center, rgba(30,41,59,1) 0%, rgba(2,6,23,1) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '15px' }} />
                {/* Opcional: marca de agua removedor */}
                <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '90px', height: '90px', background: '#020617', borderTopLeftRadius: '30px', boxShadow: '-10px -10px 20px rgba(2, 6, 23, 1)' }} />
            </div>

            {/* DERECHO: TEXTO E ICONOS AL LADO */}
            <div style={{ width: '55%', background: 'linear-gradient(135deg, rgba(15,23,42,1) 0%, rgba(2,6,23,1) 100%)', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderLeft: '2px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                    <div style={{ background: `${color}20`, padding: '16px', borderRadius: '50%' }}>
                        <Icon size={40} color={color} />
                    </div>
                    <h3 style={{ margin: 0, fontSize: '32px', fontWeight: '900', color: color, lineHeight: '1.2' }}>{title}</h3>
                </div>
                <p style={{ fontSize: '18px', lineHeight: '1.7', color: '#cbd5e1', margin: 0, flex: 1 }}>{description}</p>
                <div style={{ alignSelf: 'flex-end', marginTop: '20px', opacity: 0.3 }}>
                    <Quote size={35} color={color} />
                </div>
            </div>
          </div>
        </Html>
        <spotLight position={[0, 9, 3]} target-position={[0, 4, 0]} intensity={2.5} color={color} angle={0.9} penumbra={0.5} />
      </group>
    );
}

// ============================================================
// TOCADISCOS MODULAR Y VUMETERS 3D
// ============================================================
function VUMeter({ isPlaying, position }) {
    const barsRef = useRef([]);
    useFrame(() => {
        barsRef.current.forEach((bar, i) => {
            if(!bar) return;
            if(isPlaying) {
                const target = 0.2 + Math.random() * 0.8;
                bar.scale.y = THREE.MathUtils.lerp(bar.scale.y, target, 0.4);
                bar.material.color.setHSL(0.3 - bar.scale.y * 0.3, 1, 0.5); // Verde a Rojo
            } else {
                bar.scale.y = THREE.MathUtils.lerp(bar.scale.y, 0.1, 0.2);
                bar.material.color.setHex(0x334155);
            }
        });
    });

    return (
        <group position={position}>
            {Array.from({length: 10}).map((_, i) => (
                <mesh key={i} position={[i * 0.15 - 0.7, 0, 0]} ref={el => barsRef.current[i] = el}>
                    <boxGeometry args={[0.08, 1, 0.1]} />
                    <meshBasicMaterial color="#334155" />
                </mesh>
            ))}
        </group>
    );
}

function Turntable3D({ isPlaying, position, rotation }) {
    const recordRef = useRef();
    const armRef = useRef();
    
    useFrame((state, delta) => {
        if (isPlaying && recordRef.current) {
            recordRef.current.rotation.y -= delta * 1.5; // Spins vinyl
        }
        if (armRef.current) {
            const targetRot = isPlaying ? 0.35 : 0; // Move arm over record
            armRef.current.rotation.y = THREE.MathUtils.lerp(armRef.current.rotation.y, targetRot, 0.05);
        }
    });

    return (
        <group position={position} rotation={rotation} scale={0.65}>
            {/* Plinth */}
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
                <boxGeometry args={[4, 0.4, 3]} />
                <meshStandardMaterial color="#0f172a" roughness={0.1} metalness={0.8} />
            </mesh>
            <mesh position={[0, 0.2, 0]}>
                <boxGeometry args={[3.8, 0.5, 2.8]} />
                <meshStandardMaterial color="#38bdf8" />
            </mesh>
            
            {/* Platter */}
            <mesh position={[-0.5, 0.35, 0]} castShadow>
                <cylinderGeometry args={[1.3, 1.3, 0.1, 32]} />
                <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
            </mesh>

            {/* Vinyl Record */}
            <group position={[-0.5, 0.45, 0]} ref={recordRef}>
                <mesh castShadow>
                    <cylinderGeometry args={[1.25, 1.25, 0.02, 32]} />
                    <meshStandardMaterial color="#020617" roughness={0.3} />
                </mesh>
                <mesh position={[0, 0.02, 0]}>
                    <ringGeometry args={[0.4, 1.2, 32]} />
                    <meshStandardMaterial color="#0f172a" roughness={0.6} />
                </mesh>
                {/* Gotita / Water label con indicador de giro */}
                <group position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <mesh>
                        <circleGeometry args={[0.35, 32]} />
                        <meshStandardMaterial color="#0ea5e9" />
                    </mesh>
                    <mesh position={[0.15, 0, 0.01]}>
                        <circleGeometry args={[0.05, 16]} />
                        <meshBasicMaterial color="#ffffff" />
                    </mesh>
                </group>
                {/* Spindle */}
                <mesh position={[0, 0.05, 0]}>
                    <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
                    <meshStandardMaterial color="#cbd5e1" metalness={1} />
                </mesh>
            </group>

            {/* Tonearm Base */}
            <mesh position={[1.2, 0.5, -1]}>
                <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
                <meshStandardMaterial color="#94a3b8" metalness={0.9} />
            </mesh>

            {/* Tonearm Mechanism */}
            <group position={[1.2, 0.7, -1]} ref={armRef}>
                <mesh position={[0, 0, 0.4]}>
                    <cylinderGeometry args={[0.15, 0.15, 0.3, 16]} rotation={[Math.PI / 2, 0, 0]} />
                    <meshStandardMaterial color="#475569" metalness={0.8} />
                </mesh>
                <mesh position={[-0.6, 0.1, -1]} rotation={[-0.1, 0.5, 0]}>
                    <cylinderGeometry args={[0.03, 0.03, 2.2, 8]} rotation={[Math.PI / 2, 0, 0]} />
                    <meshStandardMaterial color="#cbd5e1" metalness={1} />
                </mesh>
                <mesh position={[-1.2, 0, -1.8]} rotation={[0, -0.3, 0]}>
                    <boxGeometry args={[0.15, 0.1, 0.4]} />
                    <meshStandardMaterial color="#020617" />
                </mesh>
            </group>
            
            {/* Buttons & VUMeter */}
            <mesh position={[1.5, 0.4, 1]}><cylinderGeometry args={[0.1, 0.1, 0.2, 16]} /><meshStandardMaterial color="#38bdf8" metalness={0.8} /></mesh>
            <mesh position={[1.1, 0.4, 1.2]}><cylinderGeometry args={[0.15, 0.15, 0.2, 16]} /><meshStandardMaterial color="#38bdf8" metalness={0.8} /></mesh>
            <VUMeter position={[0, 0.4, 1.45]} isPlaying={isPlaying} />
        </group>
    );
}

function MelendezExhibition({ setTargetPos, currentTrackIdx, isPlaying }) {
  const themes = [
      { light: '#bae6fd', river: '#0ea5e9', shadow: '#0284c7', sunPos: [0, -100, -50], rayleigh: 0.1 }, // Día 0: Noche profunda estrellada
      { light: '#fcd34d', river: '#f59e0b', shadow: '#b45309', sunPos: [100, 5, -50], rayleigh: 3 }, // Día 1: Amanecer/Atardecer Ámbar
      { light: '#a7f3d0', river: '#10b981', shadow: '#047857', sunPos: [0, 50, 0], rayleigh: 0.5 }, // Día 2: Mediodía Verde Brillante
      { light: '#fbcfe8', river: '#ec4899', shadow: '#be185d', sunPos: [-100, 5, -50], rayleigh: 4 }, // Día 3: Atardecer Rosado
      { light: '#c4b5fd', river: '#8b5cf6', shadow: '#6d28d9', sunPos: [0, -50, -100], rayleigh: 0.1 }, // Día 4: Noche Mística
  ];
  const theme = themes[(currentTrackIdx || 0) % themes.length];
  const isNight = theme.sunPos[1] < 10;

  return (
    <group>
      {/* Sky Dinámico y Ciclos de Luz */}
      <Sky sunPosition={theme.sunPos} inclination={0.2} azimuth={0.25} turbidity={10} rayleigh={theme.rayleigh} mieCoefficient={0.005} mieDirectionalG={0.8} />
      <ambientLight intensity={isNight ? 0.3 : 0.8} />
      <directionalLight position={theme.sunPos} intensity={2.5} color={theme.light} castShadow />
      
      {/* Estrellas y Fenómenos sólo de Noche */}
      {isNight && (
        <>
          <Stars radius={100} depth={50} count={6000} factor={4} saturation={0} fade speed={1.5} />
          <ShootingStars />
        </>
      )}
      <Satellite />
      <MusicalAtmosphere />
      <ElquiHorizon />

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow onPointerDown={(e) => { e.stopPropagation(); setTargetPos(e.point); }}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#020617" roughness={0.2} metalness={0.3} />
      </mesh>

      <FloatingRiver color={theme.river} />

      {/* PEDESTAL Y TOCADISCOS 3D EN PRIMER PLANO CERCA DEL REPRODUCTOR */}
      <group position={[-10, -2, 8]} rotation={[0, Math.PI / 6, 0]}>
          <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
              <boxGeometry args={[3.5, 0.5, 3]} />
              <meshStandardMaterial color="#1e293b" metalness={0.2} roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.25, 1.55]}>
              <planeGeometry args={[2, 0.4]} />
              <meshBasicMaterial color="#0ea5e9" transparent opacity={0.3} />
          </mesh>
          <Turntable3D position={[0, 0.5, 0]} isPlaying={isPlaying} />
      </group>

      {/* PANELES BIOGRÁFICOS HORIZONTALES DISPUESTOS EN ARCO */}
      <BiopicPanel 
        position={[-30, 0, -10]} rotation={[0, Math.PI / 4.5, 0]}
        title="El Músico Cantautor" description="A través de la 'Murga', Miguel educa a toda una generación de estudiantes sobre el cuidado del agua en la Región. Sus hermosas melodías pegajosas son el himno inconfundible de la responsabilidad ecológica local, tocando el piano, la guitarra y el corazón."
        icon={Music} color="#eab308" image="/agua/Migue_cantando_guitarra.png"
      />

      <BiopicPanel 
        position={[-10, 0, -26]} rotation={[0, Math.PI / 16, 0]}
        title="Informático y Astrónomo" description="Hombre de ciencia y datos. Su visión integral le permite comprender los ciclos del universo y aplicarlos a sus sistemas informáticos, uniendo tecnología con la aguda observación empírica de las estrellas puras del Valle de Elqui."
        icon={Star} color="#a855f7" image="/agua/Otro_retrato_Miguel.png"
      />

      <BiopicPanel 
        position={[10, 0, -26]} rotation={[0, -Math.PI / 16, 0]}
        title="Inventor y Cervecero" description="Un genuino alquimista moderno. Experto en fermentación, cocinero de profunda vocación y creador de cervezas artesanales. Miguel demuestra que dominar el elemento agua permite transformarlo en arte culinario y celebración."
        icon={Award} color="#f97316" image="/agua/Miguel_uruguay.png"
      />

      <BiopicPanel 
        position={[30, 0, -10]} rotation={[0, -Math.PI / 4.5, 0]}
        title="Vecino Cantautor Histórico" description="Caudillo de la sustentabilidad y el respeto a la vida. Aportó una visión transformadora del uso del recurso hídrico, sembrando en los más jóvenes la certeza de que proteger el agua es salvaguardar a toda la humanidad interconectada."
        icon={Droplets} color="#0ea5e9" image="/agua/Retrato_Miguel_URUGUAY.png"
      />

      <ContactShadows position={[0, 0.1, 0]} opacity={0.8} scale={30} blur={2} far={10} color={theme.shadow} />
      <Environment preset="night" />
    </group>
  );
}

// ============================================================
// MODAL DE CONTACTO CREATIVO
// ============================================================
function ContactMiguelModal({ onClose }) {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', msg: '' });
  
  const handleSend = () => {
     if(!formData.msg.trim() || !formData.name.trim()) return alert("Por favor escribe tu nombre y tu mensaje.");
     const subject = encodeURIComponent(`Contacto Creativo VLS de ${formData.name}`);
     const body = encodeURIComponent(`Nombre: ${formData.name}\nTeléfono: ${formData.phone}\nCorreo: ${formData.email}\n\nMensaje:\n${formData.msg}\n\n---\nEnviado desde el Tributo Interactivo 3D: vecinoslaserena.cl/agua`);
     window.location.href = `mailto:unorientaldeverdad@gmail.com?cc=vecinoslaserenachile@gmail.com&subject=${subject}&body=${body}`;
     onClose();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 300000, background: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
       <div style={{ background: 'linear-gradient(135deg, rgba(30,41,59,0.95), rgba(15,23,42,0.95))', border: '1px solid #0ea5e9', borderRadius: '30px', padding: '2rem', width: '100%', maxWidth: '500px', boxShadow: '0 30px 60px rgba(0,0,0,0.8)', color: 'white', display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '90vh', overflowY: 'auto' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                 <div style={{ background: 'rgba(14, 165, 233, 0.2)', padding: '12px', borderRadius: '50%' }}>
                    <Sparkles color="#38bdf8" size={24} />
                 </div>
                 <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '900', color: '#38bdf8' }}>Crea con Miguel</h2>
              </div>
              <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}><X size={28} /></button>
          </div>
          
          <p style={{ color: '#cbd5e1', lineHeight: '1.4', fontSize: '0.9rem', margin: '0 0 10px 0' }}>
              Contrata directamente a Miguel para la <strong>creación de canciones, historias, guiones, revistas y multimedia.</strong> Ideal para potenciar tu organización.
          </p>

          <input 
             type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
             placeholder="Tu Nombre o Institución"
             style={{ width: '100%', background: 'rgba(2, 6, 23, 0.6)', border: '1px solid #334155', borderRadius: '15px', padding: '1rem', color: 'white', fontSize: '1rem', outline: 'none' }}
          />
          <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                 type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                 placeholder="Ej: +56 9 1234 5678"
                 style={{ flex: 1, background: 'rgba(2, 6, 23, 0.6)', border: '1px solid #334155', borderRadius: '15px', padding: '1rem', color: 'white', fontSize: '1rem', outline: 'none' }}
              />
              <input 
                 type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                 placeholder="tu@correo.com"
                 style={{ flex: 1, background: 'rgba(2, 6, 23, 0.6)', border: '1px solid #334155', borderRadius: '15px', padding: '1rem', color: 'white', fontSize: '1rem', outline: 'none' }}
              />
          </div>

          <textarea 
             value={formData.msg}
             onChange={e => setFormData({...formData, msg: e.target.value})}
             placeholder="Hola Miguel, me gustaría solicitar tus servicios creativos para..."
             style={{ width: '100%', height: '100px', background: 'rgba(2, 6, 23, 0.6)', border: '1px solid #334155', borderRadius: '15px', padding: '1rem', color: 'white', resize: 'none', fontSize: '1rem', outline: 'none' }}
          />

          <button onClick={handleSend} style={{ width: '100%', padding: '1rem', background: '#0ea5e9', color: 'white', border: 'none', borderRadius: '15px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', boxShadow: '0 10px 20px rgba(14, 165, 233, 0.4)' }}>
             <Send size={20} /> ENVIAR MENSAJE
          </button>
       </div>
    </div>
  );
}

// ============================================================
// COMPONENTE PRINCIPAL Y REPRODUCTOR
// ============================================================
export default function MasterMiguelMelendez3D({ onClose }) {
  const [targetPos, setTargetPos] = useState(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  // Reproductor State
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0); 
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isPlayerMinimized, setIsPlayerMinimized] = useState(false);
  const [showDrop, setShowDrop] = useState(true);
  const [showSoccer, setShowSoccer] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('vls-stop-radio')); 
    
    // Detener y silenciar cualquier audio preexistente (Protección Radio VLS)
    const stopGlobalAudio = () => {
        const audios = document.querySelectorAll('audio, video');
        audios.forEach(a => {
            if (a !== audioRef.current) {
                a.pause();
                a.muted = true;
            }
        });
    };
    stopGlobalAudio();

    // Ocultar incondicional y forzosamente cualquier reporductor de radio del root base de vecinoslaserena.cl
    const style = document.createElement('style');
    style.id = 'vls-hide-radio-override';
    style.innerHTML = '#radio-vls-container, .radio-player-container, [data-test="radio-player"] { display: none !important; }';
    document.head.appendChild(style);
    
    return () => {
        document.getElementById('vls-hide-radio-override')?.remove();
    };
  }, []);

  // Guía de la Gota interactiva (con Flyby cerca de la cámara)
  useEffect(() => {
      const activePanel = currentTrackIdx % 4;
      let finalPos = new THREE.Vector3(0, 0, 0);

      // Posiciones de los paneles (Traídas 5 unidades más cerca del usuario)
      if (activePanel === 0) finalPos = new THREE.Vector3(-25, 0, 2);
      if (activePanel === 1) finalPos = new THREE.Vector3(-8, 0, -14);
      if (activePanel === 2) finalPos = new THREE.Vector3(8, 0, -14);
      if (activePanel === 3) finalPos = new THREE.Vector3(25, 0, 2);

      // Super Flyby (Z: 23) - Miguel y la Gota saludan muy de cerca
      const shouldFlyby = Math.random() > 0.2; // 80% de las veces vienen al frente
      if (shouldFlyby) {
          const flybyX = (Math.random() - 0.5) * 10; 
          setTargetPos(new THREE.Vector3(flybyX, 0, 23));
          
          const timer = setTimeout(() => {
              setTargetPos(finalPos);
          }, 4500);
          return () => clearTimeout(timer);
      } else {
          setTargetPos(finalPos);
      }
  }, [currentTrackIdx]);

  const handleEnter = () => {
      setHasEntered(true);
      setIsPlaying(true);
      if (window.speechSynthesis) {
        const welcome = "Bienvenido al Homenaje Interactivo de Miguel Meléndez, el Aguatero del Uruguay. Explora su legado como músico, inventor y educador hídrico de nuestra región.";
        const ut = new SpeechSynthesisUtterance(welcome);
        ut.lang = "es-CL";
        ut.rate = 0.95;
        ut.pitch = 1.1; 
        
        const voices = window.speechSynthesis.getVoices();
        const bestVoice = voices.find(v => v.name.includes("Google") && v.lang.includes("es")) ||
                          voices.find(v => (v.name.includes("Sabina") || v.name.includes("Elena")) && v.lang.includes("es")) ||
                          voices.find(v => v.lang.includes("es-CL")) ||
                          voices.find(v => v.lang.includes("es-MX"));
        if(bestVoice) ut.voice = bestVoice;
        
        window.speechSynthesis.speak(ut);
      }
  };

  // Audio Controls Logic
  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.volume = volume;
        if (isPlaying) {
            audioRef.current.play().catch(e => console.log("Autoplay prevented:", e));
        } else {
            audioRef.current.pause();
        }
    }
  }, [isPlaying, currentTrackIdx, volume]);

  const handleNext = () => {
      setCurrentTrackIdx((prev) => (prev + 1) % MIGUEL_PLAYLIST.length);
      setIsPlaying(true);
  };

  const handlePrev = () => {
      setCurrentTrackIdx((prev) => (prev - 1 + MIGUEL_PLAYLIST.length) % MIGUEL_PLAYLIST.length);
      setIsPlaying(true);
  };

  const handleShare = () => {
      const shareData = {
          title: 'Miguel Meléndez - El Aguatero del Uruguay',
          text: 'Explora el homenaje interactivo y contacta a Miguel Meléndez para servicios creativos y multimedia.',
          url: window.location.href
      };
      if (navigator.share) {
          navigator.share(shareData).catch(err => console.log('Error sharing', err));
      } else {
          navigator.clipboard.writeText(shareData.url);
          alert("¡Enlace copiado y listo para compartir al mundo!");
      }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100100, background: '#020617', fontFamily: "'Inter', sans-serif" }}>
      {showContact && <ContactMiguelModal onClose={() => setShowContact(false)} />}
      {showScanner && <MiguelLightScanner onClose={() => setShowScanner(false)} />}

      {/* Acción Cortar */}
      <button 
        onClick={onClose} 
        style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(225, 29, 72, 0.9)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', width: '45px', height: '45px', borderRadius: '50%', zIndex: 100, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 20px rgba(225, 29, 72, 0.4)', backdropFilter: 'blur(5px)' }}
      >
        <X size={24} />
      </button>

      {/* PANEL DE ACCIÓN CONSOLIDADO (Prevención traslape móvil) */}
      <div style={{ 
          position: 'absolute', 
          top: '75px', 
          right: '15px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '12px', 
          zIndex: 150,
          background: 'rgba(15, 23, 42, 0.4)',
          padding: '10px',
          borderRadius: '35px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)'
      }}>
          {/* Toggles de Presencia */}
          <button 
            onClick={() => setShowDrop(!showDrop)}
            style={{ width: '55px', height: '55px', borderRadius: '50%', background: showDrop ? '#0ea5e9' : 'rgba(15,23,42,0.8)', border: '1px solid rgba(14, 165, 233, 0.5)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s' }}
            title="Toggle Gota"
          >
              <Droplets size={24} style={{ opacity: showDrop ? 1 : 0.4 }} />
          </button>
          
          <button 
            onClick={() => setShowSoccer(!showSoccer)}
            style={{ width: '55px', height: '55px', borderRadius: '50%', background: showSoccer ? '#0ea5e9' : 'rgba(15,23,42,0.8)', border: '1px solid rgba(14, 165, 233, 0.5)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s' }}
            title="Toggle Miguel Futbolista"
          >
              <span style={{ fontSize: '24px', opacity: showSoccer ? 1 : 0.4 }}>⚽</span>
          </button>

          <div style={{ width: '30px', height: '1px', background: 'rgba(255,255,255,0.1)', margin: '5px auto' }} />

          {/* Acciones Especiales */}
          <button 
             onClick={() => setShowContact(true)}
             style={{ background: 'rgba(245, 158, 11, 0.9)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '50%', width: '55px', height: '55px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 5px 20px rgba(245, 158, 11, 0.3)' }}
          >
             <Mail size={22} />
             <span style={{ fontSize: '7px', fontWeight: 'bold' }}>CONTRATAR</span>
          </button>
          
          <button 
             onClick={handleShare}
             style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', width: '55px', height: '55px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
             <Share2 size={24} color="#38bdf8" />
          </button>
          
          <button 
             onClick={() => setShowScanner(true)}
             style={{ background: 'rgba(16, 185, 129, 0.8)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', width: '55px', height: '55px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
             title="Escáner Lumínico DS43"
          >
             <Camera size={24} color="#fff" />
          </button>
      </div>

      {/* Hero Title (Responsive) */}
      <div style={{ position: 'absolute', top: '15px', left: '15px', zIndex: 100, pointerEvents: 'none', maxWidth: 'calc(100% - 90px)' }}>
        <div style={{ background: 'rgba(2, 6, 23, 0.85)', padding: '15px', borderRadius: '20px', borderLeft: '6px solid #0ea5e9', backdropFilter: 'blur(12px)', border: '1px solid rgba(14, 165, 233, 0.3)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Droplets color="#38bdf8" size={28} />
            <div style={{ overflow: 'hidden' }}>
              <h1 style={{ margin: 0, fontSize: 'clamp(1.4rem, 4vw, 2.5rem)', fontWeight: '900', color: 'white', letterSpacing: '-0.5px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', display: 'flex', alignItems: 'center', gap: '10px' }}>
                 MIGUEL MELÉNDEZ
                 <img src="https://flagcdn.com/w40/uy.png" alt="URY" style={{height: '22px', borderRadius:'2px', marginLeft: '5px'}}/>
                 <img src="https://flagcdn.com/w40/cl.png" alt="CHL" style={{height: '22px', borderRadius:'2px'}}/>
              </h1>
              <p style={{ margin: 0, color: '#38bdf8', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', fontSize: 'clamp(0.6rem, 2vw, 0.9rem)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>El Aguatero • Servicios Creativos</p>
            </div>
        </div>
      </div>

      {/* Reproductor Flotante "Aguatero" (Minimizable para visibilidad móvil) */}
      <div style={{ 
          position: 'fixed', 
          bottom: window.innerWidth < 768 ? '1.5rem' : '15px', 
          left: '15px', 
          zIndex: 100070, 
          width: 'calc(100% - 30px)', 
          maxWidth: '320px',
          transform: isPlayerMinimized ? 'translateY(115px)' : 'translateY(0)',
          transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.9)', borderRadius: '24px', padding: '1.2rem', border: '1px solid #1e293b', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', position: 'relative' }}>
              
              {/* Botón de Colapso */}
              <button 
                onClick={() => setIsPlayerMinimized(!isPlayerMinimized)}
                style={{ position: 'absolute', top: '-15px', right: '15px', background: '#0ea5e9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.4)', zIndex: 110 }}
              >
                  {isPlayerMinimized ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: isPlayerMinimized ? '0' : '1rem' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '1px' }}>{isPlayerMinimized ? 'RADIO AGUATERO (MIN)' : 'REPRODUCTOR HÍDRICO'}</span>
                {!isPlayerMinimized && <Volume2 size={16} color="#0ea5e9" />}
              </div>

              <div style={{ marginBottom: isPlayerMinimized ? '5px' : '1.5rem', background: '#020617', padding: '0.8rem', borderRadius: '12px', border: '1px solid #334155', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ color: '#38bdf8', fontSize: isPlayerMinimized ? '0.85rem' : '1.2rem', fontWeight: '900', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {MIGUEL_PLAYLIST[currentTrackIdx].title}
                    </div>
                    {!isPlayerMinimized && <div style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '4px' }}>Miguel Meléndez</div>}
                  </div>
                  {isPlayerMinimized && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button onClick={handlePrev} style={{ background: '#1e293b', border: 'none', color: 'white', width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><SkipBack size={14} /></button>
                      <button onClick={() => setIsPlaying(!isPlaying)} style={{ background: '#0ea5e9', border: 'none', color: 'white', width: '35px', height: '35px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: '2px' }} />}
                      </button>
                      <button onClick={handleNext} style={{ background: '#1e293b', border: 'none', color: 'white', width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><SkipForward size={14} /></button>
                    </div>
                  )}
              </div>

              {!isPlayerMinimized && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                      <button onClick={handlePrev} style={{ background: '#1e293b', border: 'none', color: 'white', width: '45px', height: '45px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><SkipBack size={20} /></button>
                      <button onClick={() => setIsPlaying(!isPlaying)} style={{ background: '#0ea5e9', border: 'none', color: 'white', width: '60px', height: '60px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(14, 165, 233, 0.3)' }}>
                          {isPlaying ? <Pause size={28} /> : <Play size={28} style={{ marginLeft: '4px' }} />}
                      </button>
                      <button onClick={handleNext} style={{ background: '#1e293b', border: 'none', color: 'white', width: '45px', height: '45px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><SkipForward size={20} /></button>
                  </div>

                  {/* Master Volume Control */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(0,0,0,0.3)', padding: '8px 15px', borderRadius: '30px', marginTop: '10px' }}>
                      <Volume2 size={18} color="#38bdf8" />
                      <input 
                        type="range" min="0" max="1" step="0.01" 
                        value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))}
                        style={{ flex: 1, accentColor: '#0ea5e9', cursor: 'pointer', height: '4px' }}
                      />
                      <span style={{ color: '#38bdf8', fontSize: '0.75rem', fontWeight: 'bold', width: '30px' }}>{Math.round(volume * 100)}%</span>
                  </div>
                </>
              )}

              <audio 
                ref={audioRef} 
                src={MIGUEL_PLAYLIST[currentTrackIdx].src} 
                onEnded={handleNext} 
                className="hidden" 
              />
          </div>
      </div>

      {/* Subtítulos Conceptuales (Ecológicos / Contextuales) - Responsive */}
      <div style={{ position: 'absolute', bottom: '6rem', left: '50%', transform: 'translateX(-50%)', zIndex: 100, width: '90%', maxWidth: '800px', display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
        <div style={{ background: 'rgba(2, 6, 23, 0.85)', padding: '1rem 2rem', borderRadius: '20px', border: '1px solid rgba(14, 165, 233, 0.5)', backdropFilter: 'blur(10px)', textAlign: 'center', animation: isPlaying ? 'pulseSubtitles 3s infinite' : 'none' }}>
            <p style={{ margin: 0, color: '#38bdf8', fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)', fontWeight: 'bold', fontStyle: 'italic', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                " {
                    (() => {
                        const t = MIGUEL_PLAYLIST[currentTrackIdx].title;
                        if(t.includes("Aguatero Leguero")) return "Como el leguero que anuncia a lo lejos, el agua da el aviso de la vida inminente...";
                        if(t.includes("Uruguay")) return "Desde tierras lejanas, el ritmo del tambor y el vital elemento nos hermanan en un solo abrazo...";
                        if(t.includes("Come Sano")) return "La buena salud empieza en la vertiente: Beber y cuidar el agua es resguardar la mente y el cuerpo...";
                        if(t.includes("Cuidando Vive")) return "Quien cuida ciegamente cada gota, protege su propia vida y la de las generaciones venideras...";
                        if(t.includes("Es Tarea de Todos")) return "El cuidado prudente de las cuencas no distingue fronteras, es una labor planetaria...";
                        if(t.includes("Quién me cuida")) return "Si la naturaleza nos brinda el elemento vital en los Andes, nos toca a nosotros proteger su cauce en los valles...";
                        if(t.includes("mañana")) return "Cada amanecer brillante es posible gracias a la pureza del rocío y al murmullo de los ríos cordilleranos...";
                        return "El ciclo incesante del agua nutre silenciosamente el ciclo de la vida en nuestra árida región...";
                    })()
                } "
            </p>
        </div>
      </div>
      <style>{`@keyframes pulseSubtitles { 0%, 100% { opacity: 0.8; transform: scale(1); } 50% { opacity: 1; transform: scale(1.02); box-shadow: 0 0 20px rgba(14, 165, 233, 0.4); } }`}</style>


      {/* Controles de Vista Táctil sugeridos desde QA Móvil se manejan nativamente por OrbitControls ahora */}


      <Canvas shadows camera={{ fov: 75, position: [0, 8, 30] }}>
        <Suspense fallback={<Html center><div style={{ color: 'white', background: 'rgba(0,0,0,0.8)', padding: '1rem', borderRadius: '10px' }}>Cargando Mundo del Agua...</div></Html>}>
          <MelendezExhibition setTargetPos={setTargetPos} currentTrackIdx={currentTrackIdx} isPlaying={isPlaying} />
          {/* Envolvemos en un grupo extra para asegurar que MuseumPilot no rompa si falla la carga interna */}
          <Suspense fallback={null}>
             <MuseumPilot targetPos={targetPos} setTargetPos={setTargetPos} currentTrackIdx={currentTrackIdx} showDrop={showDrop} showSoccer={showSoccer} />
          </Suspense>
          <OrbitControls makeDefault enableZoom={true} enablePan={false} minDistance={5} maxDistance={65} zoomSpeed={1.5} rotateSpeed={0.8} />
        </Suspense>
      </Canvas>

      {!hasEntered && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 200, background: '#020617', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
          <div style={{ width: '80px', height: '80px', border: '6px solid rgba(14, 165, 233, 0.2)', borderTopColor: '#0ea5e9', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: 'white', margin: 0, fontSize: '2rem', fontWeight: '900' }}>GOTA DE LA VIDA 3D</h2>
            <p style={{ color: '#38bdf8', fontWeight: 'bold', marginTop: '10px', marginBottom: '30px' }}>Tributo Vivo Interactivo a Miguel Meléndez</p>
            <button onClick={handleEnter} style={{ background: '#0ea5e9', border: 'none', padding: '1rem 3rem', borderRadius: '30px', color: 'white', fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer', boxShadow: '0 10px 30px rgba(14,165,233,0.5)', transition: 'all 0.3s' }}>
                INGRESAR AHORA
            </button>
          </div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}
    </div>
  );
}
