import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, Stars, PerspectiveCamera, useGLTF } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import {
  X, Gem, BookOpen, Map, Award, Play, RotateCcw, Clock, Mountain, MessageCircle, Send,
  ChevronRight, ChevronLeft, ArrowUp, ArrowDown, Move, FlaskConical, Zap, Settings
} from 'lucide-react';
import DomeykoLambertSimulator from '../components/DomeykoLambertSimulator';

// ─── DATOS HISTÓRICOS ────────────────────────────────────────────────────────
const DOMEYKO_DATA = {
  birth: '31 de julio de 1802',
  birthPlace: 'Niedźwiadka, Polonia',
  death: '23 de enero de 1889',
  deathPlace: 'Santiago, Chile',
  rector: '1867–1883 (Universidad de Chile)',
  education: 'Universidad de Vilna y Escuela de Minas de París',
  milestones: [
    { year: '1837', title: 'El Contrato que cambió a Chile', desc: 'Carlos Lambert, actuando como agente del gobierno, le ofrece el contrato en París para enseñar en Coquimbo.' },
    { year: '1838', title: 'Llegada a La Serena', desc: 'Inaugura la cátedra de Química y Mineralogía en el actual Liceo Gregorio Cordovez.' },
    { year: '1845', title: 'Descubrimiento de la Domeykite', desc: 'Identifica este mineral único en la mina Algodones, Coquimbo.' },
    { year: '1847', title: 'Liderazgo Nacional', desc: 'Se traslada a Santiago para reformar la educación científica nacional.' },
    { year: '1867', title: 'Rectoría U. de Chile', desc: 'Lideró la principal casa de estudios por 16 años, impulsando la ingeniería.' }
  ],
  lambertBio: `La historia de La Serena y la Región de Coquimbo no puede comprenderse a cabalidad sin la figura de Charles Saint Lambert. Su llegada no solo significó un salto tecnológico sin precedentes, sino que sentó las bases de la Revolución Industrial en Chile. Introdujo el Horno de Reverbero en 1831, permitiendo procesar sulfuros que antes se desechaban como "basura", transformando la economía regional y nacional de manera definitiva.`,
  minerals: [
    { id: 'domeykite', name: 'Domeykita', formula: 'Cu₃As', color: '#b8860b', desc: 'Mineral de cobre y arsénico descubierto en la mina Algodones (1845).', rarity: 'Legendario', points: 500 },
    { id: 'atacamite', name: 'Atacamita', formula: 'Cu₂Cl(OH)₃', color: '#2d8a5c', desc: 'Cloruro de cobre emblemático del desierto de Atacama.', rarity: 'Épico', points: 350 },
    { id: 'coquimbite', name: 'Coquimbita', formula: 'Fe₂(SO₄)₃·9H₂O', color: '#7b52ab', desc: 'Sulfato de hierro hidratado, común en la región de Coquimbo.', rarity: 'Raro', points: 250 },
    { id: 'lambertite', name: 'Lambertita', formula: 'Cu-Fe-Sulf', color: '#f59e0b', desc: 'Cobre gris del cual Lambert obtuvo su gran fortuna.', rarity: 'Legendario', points: 600 },
    { id: 'silver', name: 'Plata Nativa', formula: 'Ag', color: '#c0c0c0', desc: 'Plata del mineral de Arqueros, fundamental para la economía regional.', rarity: 'Raro', points: 200 },
    { id: 'lapis', name: 'Lapislázuli', formula: '(Na,Ca)₈Al₆Si₆O₂₄', color: '#26619c', desc: 'Piedra azul emblemática de Chile, clasificada por su legado.', rarity: 'Épico', points: 300 },
    { id: 'chalcantite', name: 'Calcantita', formula: 'CuSO₄·5H₂O', color: '#3b82f6', desc: 'Sulfato de cobre hidratado de azul intenso.', rarity: 'Raro', points: 200 }
  ],
  quotes: [
    '"Chile me dio una second patria, y yo le di mi vida entera."',
    '"El mineral es el libro en que la tierra escribe su historia."',
    '"Cada roca de esta cordillera es un misterio que espera ser revelado."'
  ]
};

const RARITY_COLOR = {
  Legendario: '#ffd700',
  Épico: '#a855f7',
  Raro: '#3b82f6',
  Común: '#10b981'
};

// ─── ASISTENTE VIRTUAL (Regla Estricta - Serenito Humanizado) ────────────────
function DomeykoChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: '¡Hola! Soy Serenito, tu guía de innovación. El Prof. Domeyko nos ha dejado un legado increíble. ¿Quieres conocer su meteorito, su dinosaurio o sus 6,000 minerales?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', text: '¡Fascinante! Sabías que Domeyko no solo clasificó rocas, sino que fundó el gabinete nacional con más de 6,000 muestras. ¡Explora el "Gabinete de Coleccionista" en el portal!' }]);
    }, 1000);
  };

  return (
    <div style={{ position: 'fixed', bottom: 30, right: 30, zIndex: 200000 }}>
      <AnimatePresence>
        {isOpen && (
           <motion.div
             initial={{ opacity: 0, y: 50, scale: 0.9 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             exit={{ opacity: 0, scale: 0.9, y: 50 }}
             style={{ width: 360, height: 500, background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(56,189,248,0.4)', borderRadius: 32, marginBottom: 20, display: 'flex', flexDirection: 'column', overflow: 'hidden', backdropFilter: 'blur(30px)', boxShadow: '0 40px 100px rgba(0,0,0,0.8)' }}
           >
             <div style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                 <div style={{ width: 45, height: 45, borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.3)', background: 'white' }}>
                    <img src="/pampita_v3.png" alt="Serenito" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                 </div>
                 <div>
                    <div style={{ color: 'white', fontWeight: 950, fontSize: 16 }}>Serenito</div>
                    <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>Guía de Innovación</div>
                 </div>
               </div>
               <button onClick={() => setIsOpen(false)} style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '50%', width: 32, height: 32, border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={18}/></button>
             </div>
             <div style={{ flex: 1, overflowY: 'auto', padding: 25, display: 'flex', flexDirection: 'column', gap: 16 }}>
                 {messages.map((m, i) => (
                    <div key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', background: m.role === 'user' ? '#0ea5e9' : 'rgba(255,255,255,0.05)', color: 'white', padding: '14px 18px', borderRadius: 24, borderBottomRightRadius: m.role === 'user' ? 4 : 24, borderBottomLeftRadius: m.role === 'assistant' ? 4 : 24, maxWidth: '85%', fontSize: 14, lineHeight: 1.6 }}>{m.text}</div>
                 ))}
                 <div ref={messagesEndRef} />
             </div>
             <form onSubmit={handleSend} style={{ display: 'flex', padding: 20, background: 'rgba(0,0,0,0.3)' }}>
               <input value={input} onChange={e => setInput(e.target.value)} placeholder="¿Qué quieres saber de Domeyko?" style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 50, padding: '12px 20px', color: 'white', outline: 'none' }} />
               <button type="submit" style={{ width: 48, height: 48, background: '#0ea5e9', borderRadius: '50%', border: 'none', marginLeft: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer', boxShadow: '0 10px 20px rgba(14,165,233,0.3)' }}><Send size={20}/></button>
             </form>
           </motion.div>
        )}
      </AnimatePresence>
      {!isOpen && (
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsOpen(true)} style={{ width: 70, height: 70, borderRadius: '50%', background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }} >
           <img src="/pampita_v3.png" style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
        </motion.button>
      )}
    </div>
  );
}

// ─── COMPONENTES 3D (Motor tipo Tanque) ──────────────────────────────────────

// Controles tipo tanque (W/S para avanzar, A/D para girar) - Requisito estricto
function TankControls() {
  const { camera } = useThree();
  const [keys, setKeys] = useState({ w: false, a: false, s: false, d: false });

  useEffect(() => {
    // Posición inicial
    camera.position.set(0, 1.6, 5);
    camera.rotation.order = 'YXZ';

    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (['w', 'arrowup'].includes(key)) setKeys(k => ({ ...k, w: true }));
      if (['a', 'arrowleft'].includes(key)) setKeys(k => ({ ...k, a: true }));
      if (['s', 'arrowdown'].includes(key)) setKeys(k => ({ ...k, s: true }));
      if (['d', 'arrowright'].includes(key)) setKeys(k => ({ ...k, d: true }));
    };
    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      if (['w', 'arrowup'].includes(key)) setKeys(k => ({ ...k, w: false }));
      if (['a', 'arrowleft'].includes(key)) setKeys(k => ({ ...k, a: false }));
      if (['s', 'arrowdown'].includes(key)) setKeys(k => ({ ...k, s: false }));
      if (['d', 'arrowright'].includes(key)) setKeys(k => ({ ...k, d: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [camera]);

  useFrame((state, delta) => {
    const moveSpeed = 6 * delta;
    const rotSpeed = 2.5 * delta;

    if (keys.a) camera.rotation.y += rotSpeed;
    if (keys.d) camera.rotation.y -= rotSpeed;
    if (keys.w) {
      camera.position.z -= Math.cos(camera.rotation.y) * moveSpeed;
      camera.position.x -= Math.sin(camera.rotation.y) * moveSpeed;
    }
    if (keys.s) {
      camera.position.z += Math.cos(camera.rotation.y) * moveSpeed;
      camera.position.x += Math.sin(camera.rotation.y) * moveSpeed;
    }
  });

  return null;
}

function HtmlPoster({ url, position, rotation, title, desc }) {
  return (
    <group position={position} rotation={rotation}>
      <Html transform occlude scale={0.5}>
        <div style={{ width: 400, background: '#020617', border: '2px solid rgba(56,189,248,0.5)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 10px 40px rgba(56,189,248,0.2)' }}>
          <img src={url} alt={title} style={{ width: '100%', height: 300, objectFit: 'cover' }} />
          <div style={{ padding: 20 }}>
            <h3 style={{ margin: '0 0 8px', color: 'white', fontSize: 24, fontWeight: 900 }}>{title}</h3>
            <p style={{ margin: 0, color: '#94a3b8', fontSize: 16, lineHeight: 1.5 }}>{desc}</p>
          </div>
        </div>
      </Html>
    </group>
  );
}

function DomeykoModel({ position, rotation }) {
  const { scene } = useGLTF('/domeyko/IgnacioDomeyko.glb', '/draco/');
  return (
    <primitive 
      object={scene} 
      position={position} 
      rotation={rotation} 
      scale={2.2} 
    />
  );
}

function LambertModel({ position, rotation }) {
  const { scene } = useGLTF('/domeyko/CharlesLambert.glb', '/draco/');
  return (
    <primitive 
      object={scene} 
      position={position} 
      rotation={rotation} 
      scale={2.2} 
    />
  );
}

// Escenario del museo interactivo con columnas
function MuseumHall() {
  const elements = [];
  for (let i = 0; i < 6; i++) {
    const z = -i * 8;
    elements.push(
      <mesh key={`col_l_${i}`} position={[-4, 2, z]}>
        <boxGeometry args={[1, 4, 1]} />
        <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
      </mesh>
    );
    elements.push(
      <mesh key={`col_r_${i}`} position={[4, 2, z]}>
        <boxGeometry args={[1, 4, 1]} />
        <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
      </mesh>
    );
  }

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -20]} receiveShadow>
        <planeGeometry args={[20, 60]} />
        <meshStandardMaterial color="#020617" roughness={0.1} metalness={0.6} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4, -20]}>
        <planeGeometry args={[20, 60]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      {elements}
      
      <HtmlPoster 
        url="/domeyko/DomeykoHumanizado_sentado.png" 
        position={[-3.3, 2, -4]} 
        rotation={[0, Math.PI / 6, 0]} 
        title="Don Ignacio Domeyko" 
        desc="El ilustre científico polaco que sentó las bases de la mineralogía en Chile." 
      />
      <HtmlPoster 
        url="/domeyko/Charles Lambert (3).png" 
        position={[3.3, 2, -12]} 
        rotation={[0, -Math.PI / 6, 0]} 
        title="Carlos Lambert" 
        desc="Innovador minero y socio tecnológico clave para la industrialización regional." 
      />

      <Suspense fallback={null}>
         <DomeykoModel position={[0, 0, -6]} rotation={[0, 0, 0]} />
         <LambertModel position={[2, 0, -10]} rotation={[0, -Math.PI/4, 0]} />
      </Suspense>
    </group>
  );
}

function FloatingItem({ mineral, position, onCollect, collected }) {
  const meshRef = useRef();
  useFrame((state) => {
    if (!meshRef.current || collected) return;
    meshRef.current.rotation.y += 0.02;
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
  });

  if (collected) return null;

  return (
    <group position={position}>
      <mesh ref={meshRef} onClick={onCollect}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color={mineral.color} emissive={mineral.color} emissiveIntensity={0.5} roughness={0.1} metalness={0.9} />
      </mesh>
      <Html center distanceFactor={10} position={[0, 1, 0]}>
         <div style={{ background: 'rgba(2,6,23,0.8)', border: `1px solid ${mineral.color}`, padding: '4px 10px', borderRadius: 12, color: 'white', fontSize: 14, fontWeight: 'bold', whiteSpace: 'nowrap' }}>
            {mineral.name}
         </div>
      </Html>
    </group>
  );
}

// ─── PORTAL PRINCIPAL ────────────────────────────────────────────────────────
export default function DomeykoPortal({ onClose, initialTab = 'bio' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [started, setStarted] = useState(false);
  const [collectedIds, setCollectedIds] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (!started || gameOver || activeTab !== 'game') return;
    if (timeLeft <= 0) { setGameOver(true); return; }
    const t = setInterval(() => setTimeLeft(p => p - 1), 1000);
    return () => clearInterval(t);
  }, [started, gameOver, timeLeft, activeTab]);

  useEffect(() => {
    if (collectedIds.length === DOMEYKO_DATA.minerals.length) setGameOver(true);
  }, [collectedIds]);

  const handleCollect = (mineral) => {
    setCollectedIds(p => [...p, mineral.id]);
    setScore(p => p + mineral.points);
  };

  const tabs = [
    { id: 'bio', label: 'Biografía Central', icon: BookOpen },
    { id: 'legacy', label: 'Legado Global', icon: Award },
    { id: 'lambert', label: 'Legado Lambert', icon: Zap },
    { id: 'minerals', label: 'Gabinete de Riquezas', icon: Gem },
    { id: 'multimedia', label: 'Sala Multimedia', icon: Play },
    { id: 'simulator', label: 'Laboratorio Químico', icon: FlaskConical },
    { id: 'game', label: 'Expedición 3D', icon: Mountain },
  ];

  const mineralPositions = [
    [0, 1, -8], [-2, 1, -16], [2, 1, -24], [0, 1, -32], [-2, 1, -40], [2, 1, -46], [0, 1, -54]
  ];

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 999999, background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', display: 'flex', flexDirection: 'column', color: 'white', fontFamily: '"Outfit", sans-serif', isolation: 'isolate', overflow: 'hidden' }}>
      
      <header style={{ height: 100, padding: '0 40px', background: 'rgba(15, 23, 42, 0.8)', borderBottom: '1px solid rgba(56,189,248,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backdropFilter: 'blur(30px)', zIndex: 1000 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 60, height: 60, borderRadius: 20, background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(14, 165, 233, 0.3)' }}>
            <Gem size={32} color="white" />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 950, letterSpacing: '-1px', color: 'white' }}>
              IGNACIO <span style={{ color: '#0ea5e9' }}>DOMEYKO</span>
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>Portal de Investigación v2.0</span>
                <div style={{ width: 4, height: 4, background: '#10b981', borderRadius: '50%' }} />
                <span style={{ fontSize: 10, color: '#10b981', fontWeight: 900 }}>DIGITAL TWIN ACTIVO</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, background: 'rgba(0,0,0,0.3)', padding: 8, borderRadius: 24, border: '1px solid rgba(255,255,255,0.05)' }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 16, border: 'none', background: activeTab === tab.id ? 'white' : 'transparent', color: activeTab === tab.id ? '#0f172a' : 'rgba(255,255,255,0.4)', fontWeight: 900, fontSize: 14, cursor: 'pointer', transition: '0.3s' }}>
              <tab.icon size={18} />
              <span style={{ whiteSpace: 'nowrap' }}>{tab.label}</span>
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {activeTab === 'game' && started && (
             <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid #10b98130', padding: '10px 20px', borderRadius: 16, color: '#10b981', fontWeight: 950 }}>{score} PTS</div>
                <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid #ef444430', padding: '10px 20px', borderRadius: 16, color: '#ef4444', fontWeight: 950 }}>{timeLeft}S</div>
             </div>
          )}
          <button onClick={onClose} style={{ width: 50, height: 50, borderRadius: 16, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>
      </header>

      <div style={{ flex: 1, overflow: 'hidden', position: 'relative', isolation: 'isolate' }}>
        <AnimatePresence mode="wait">
          {activeTab === 'bio' && (
            <motion.div key="bio" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{ height: '100%', overflowY: 'auto' }}>
               <div style={{ maxWidth: 1200, margin: '40px auto', display: 'flex', gap: 40, flexWrap: 'wrap', padding: '0 40px' }}>
                  <div style={{ flex: '1 1 400px', background: 'rgba(255,255,255,0.03)', borderRadius: 32, padding: 40, border: '1px solid rgba(255,255,255,0.1)' }}>
                     <img src="/domeyko/DomeykoHumanizado_sentado.png" alt="Domeyko" style={{ width: '100%', borderRadius: 24, marginBottom: 24 }} />
                     <h2 style={{ fontSize: 32, fontWeight: 950, marginBottom: 12 }}>Ignacio Domeyko</h2>
                     <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>Científico, educador y humanista polaco que transformó la ciencia en Chile.</p>
                  </div>
                  <div style={{ flex: '1 1 500px' }}>
                     <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 24 }}>Hitos Principales</h3>
                     {DOMEYKO_DATA.milestones.map((m, i) => (
                        <div key={i} style={{ marginBottom: 24, paddingLeft: 20, borderLeft: '2px solid #0ea5e9' }}>
                           <div style={{ color: '#0ea5e9', fontWeight: 900, fontSize: 14 }}>{m.year}</div>
                           <div style={{ fontWeight: 800, fontSize: 18, margin: '4px 0' }}>{m.title}</div>
                           <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>{m.desc}</p>
                        </div>
                     ))}
                  </div>
               </div>
            </motion.div>
          )}

          {activeTab === 'lambert' && (
             <motion.div key="lambert" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ height: '100%', overflowY: 'auto', padding: '40px' }}>
                <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                   <div style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', borderRadius: 40, padding: 60, border: '1px solid rgba(245,158,11,0.2)', display: 'flex', gap: 40, alignItems: 'center' }}>
                      <img src="/domeyko/Charles Lambert.png" style={{ width: 150, height: 150, borderRadius: 32, border: '4px solid #f59e0b' }} />
                      <div>
                         <h2 style={{ fontSize: 48, fontWeight: 950, marginBottom: 12 }}>Charles Saint Lambert</h2>
                         <p style={{ color: '#94a3b8', fontSize: 18 }}>El ingeniero alsaciano que forjó el destino industrial de Coquimbo.</p>
                      </div>
                   </div>
                   <div style={{ marginTop: 40, background: 'rgba(255,255,255,0.02)', padding: 40, borderRadius: 32 }}>
                      <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 20 }}>La Revolución del Reverbero</h3>
                      <p style={{ lineHeight: 1.8, color: 'rgba(255,255,255,0.7)' }}>
                         Lambert introdujo en **1831** el horno de reverbero, procesando sulfuros que antes se desechaban. Esto sextuplicó la producción de cobre nacional, posicionando a Chile como líder mundial.
                      </p>
                      <audio controls style={{ width: '100%', marginTop: 30, filter: 'invert(1)' }}>
                         <source src="/lambert/Charles_Lambert_y_su_fortuna_con_basura.mp3" type="audio/mpeg" />
                      </audio>
                   </div>
                </div>
             </motion.div>
          )}

          {activeTab === 'minerals' && (
             <motion.div key="minerals" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1 }} style={{ height: '100%', overflowY: 'auto', padding: 40 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
                   {DOMEYKO_DATA.minerals.map(m => (
                      <div key={m.id} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${m.color}40`, borderRadius: 24, padding: 30 }}>
                         <Gem size={32} color={m.color} style={{ marginBottom: 16 }} />
                         <h3 style={{ margin: 0 }}>{m.name}</h3>
                         <div style={{ fontSize: 12, color: m.color, fontWeight: 700, margin: '4px 0 12px' }}>{m.formula}</div>
                         <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', margin: 0 }}>{m.desc}</p>
                      </div>
                   ))}
                </div>
             </motion.div>
          )}

          {activeTab === 'multimedia' && (
             <motion.div key="multimedia" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ height: '100%', overflowY: 'auto', padding: 40 }}>
                <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 40 }}>
                   <div style={{ background: '#1e293b', padding: 32, borderRadius: 32, display: 'flex', gap: 32, alignItems: 'center' }}>
                      <Play size={48} color="#0ea5e9" fill="#0ea5e9" />
                      <div style={{ flex: 1 }}>
                         <h3 style={{ margin: 0 }}>Podcast: El polaco en La Serena</h3>
                         <p style={{ color: '#94a3b8', margin: '4px 0 16px' }}>Relato sonoro de su llegada y contribución.</p>
                         <audio controls style={{ width: '100%', filter: 'invert(1)' }}>
                            <source src="/domeyko/VLS_El_polaco_que_revolucionó_la_minería_chilena.mp3" type="audio/mpeg" />
                         </audio>
                      </div>
                   </div>
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                      <img src="/domeyko/VLSinfographic_DOMEYKO.png" style={{ width: '100%', borderRadius: 24 }} />
                      <img src="/domeyko/VLSverticalInfographic_Domeyko.png" style={{ width: '100%', borderRadius: 24 }} />
                   </div>
                </div>
             </motion.div>
          )}

          {activeTab === 'game' && (
             <motion.div key="game" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ height: '100%', background: '#020617' }}>
                <DomeykoGame onClose={onClose} score={score} setScore={setScore} timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
             </motion.div>
          )}

          {activeTab === 'simulator' && (
             <motion.div key="simulator" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ height: '100%' }}>
                <DomeykoLambertSimulator />
             </motion.div>
          )}

          {activeTab === 'legacy' && (
             <motion.div key="legacy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ height: '100%', overflowY: 'auto', padding: '40px' }}>
                <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '30px' }}>
                   <div style={{ background: 'rgba(255,255,255,0.02)', padding: '40px', borderRadius: '40px', border: '1px solid rgba(167, 139, 250, 0.2)' }}>
                      <Award size={48} color="#a78bfa" style={{ marginBottom: 20 }} />
                      <h2 style={{ fontSize: 32, fontWeight: 950, marginBottom: 15 }}>Legado Universal</h2>
                      <p style={{ fontSize: 16, color: '#94a3b8', lineHeight: 1.8 }}>
                         Desde el asteroide (2784) Domeyko hasta el dinosaurio Domeykosaurus chilensis, su nombre perdura en lo más alto de la ciencia mundial.
                      </p>
                   </div>
                   
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      {/* TARJETA GRAFICA DOMEYKO */}
                      <div style={{ background: 'linear-gradient(180deg, rgba(14, 165, 233, 0.1), transparent)', border: '1px solid #0ea5e950', borderRadius: '32px', overflow: 'hidden', position: 'relative' }}>
                         <img src="/domeyko/VLSinfographic_DOMEYKO.png" style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', opacity: 0.6 }} />
                         <div style={{ padding: '25px', position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(0deg, #0f172a, transparent)' }}>
                            <div style={{ fontSize: '10px', color: '#0ea5e9', fontWeight: 900, letterSpacing: '2px', marginBottom: '5px' }}>FIGURA FUNDACIONAL</div>
                            <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 950 }}>IGNACIO DOMEYKO</h4>
                         </div>
                      </div>

                      {/* TARJETA GRAFICA LAMBERT */}
                      <div style={{ background: 'linear-gradient(180deg, rgba(245, 158, 11, 0.1), transparent)', border: '1px solid #f59e0b50', borderRadius: '32px', overflow: 'hidden', position: 'relative' }}>
                         <img src="/domeyko/Charles Lambert (1).png" style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', opacity: 0.6 }} />
                         <div style={{ padding: '25px', position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(0deg, #0f172a, transparent)' }}>
                            <div style={{ fontSize: '10px', color: '#f59e0b', fontWeight: 900, letterSpacing: '2px', marginBottom: '5px' }}>PIONERO INDUSTRIAL</div>
                            <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 950 }}>CHARLES LAMBERT</h4>
                         </div>
                      </div>
                   </div>
                </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer style={{ padding: '20px 40px', background: 'rgba(2,6,23,0.5)', borderTop: '1px solid rgba(56,189,248,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', fontWeight: 700, letterSpacing: '2px' }}>
          IGNACIO DOMEYKO · 1802–1889 · PORTAL VLS SMART COMMONS
        </span>
        <button onClick={() => setActiveTab('game')} style={{ background: '#38bdf820', border: '1px solid #38bdf840', padding: '6px 16px', borderRadius: 20, color: '#38bdf8', fontSize: 11, fontWeight: 800, cursor: 'pointer' }}>
          ▶ JUGAR EXPEDICIÓN 3D
        </button>
      </footer>
      <DomeykoChat />
    </div>
  );
}

function DomeykoGame({ onClose, score, setScore, timeLeft, setTimeLeft }) {
  const [started, setStarted] = useState(false);
  const [collectedIds, setCollectedIds] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const mineralPositions = [
    [0, 1, -8], [-2, 1, -16], [2, 1, -24], [0, 1, -32], [-2, 1, -40], [2, 1, -46], [0, 1, -54]
  ];

  useEffect(() => {
    if (!started || gameOver) return;
    if (timeLeft <= 0) { setGameOver(true); return; }
    const t = setInterval(() => setTimeLeft(p => p - 1), 1000);
    return () => clearInterval(t);
  }, [started, gameOver, timeLeft, setTimeLeft]);

  const handleCollect = (mineral) => {
    if (collectedIds.includes(mineral.id)) return;
    setCollectedIds(p => [...p, mineral.id]);
    setScore(p => p + mineral.points);
  };

  useEffect(() => {
    if (collectedIds.length === 7) setGameOver(true);
  }, [collectedIds]);

  return (
    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
      <Canvas shadows camera={{ fov: 75, position: [0, 1.6, 5] }}>
        <pointLight position={[0, 10, 0]} intensity={2} color="#0ea5e9" />
        <Stars radius={100} depth={50} count={5000} factor={4} />
        <Suspense fallback={null}>
           {started && !gameOver && <TankControls />}
           <MuseumHall />
           {started && !gameOver && DOMEYKO_DATA.minerals.map((mineral, i) => (
             <FloatingItem key={mineral.id} mineral={mineral} position={mineralPositions[i] || [0,1,0]} collected={collectedIds.includes(mineral.id)} onCollect={() => handleCollect(mineral)} />
           ))}
        </Suspense>
        <fog attach="fog" args={['#020617', 2, 40]} />
      </Canvas>

      {!started && !gameOver && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
          <div style={{ textAlign: 'center', padding: 40, border: '1px solid #38bdf8', borderRadius: 40, background: '#0f172a' }}>
            <h2 style={{ fontSize: 32, marginBottom: 20 }}>EXPEDICIÓN 3D</h2>
            <button onClick={() => setStarted(true)} style={{ background: '#0ea5e9', padding: '16px 40px', borderRadius: 32, border: 'none', color: 'white', fontWeight: 900 }}>INICIAR</button>
          </div>
        </div>
      )}

      {gameOver && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
           <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: 48, marginBottom: 20 }}>{collectedIds.length === 7 ? '¡COMPLETADO!' : 'TIEMPO AGOTADO'}</h2>
              <div style={{ fontSize: 64, fontWeight: 900, marginBottom: 40 }}>{score} PTS</div>
              <button onClick={() => { setStarted(true); setGameOver(false); setTimeLeft(60); setCollectedIds([]); setScore(0); }} style={{ background: 'white', color: '#0f172a', padding: '16px 40px', borderRadius: 32, border: 'none', fontWeight: 900 }}>REINTENTAR</button>
           </div>
        </div>
      )}
    </div>
  );
}
