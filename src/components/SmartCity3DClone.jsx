import React, { useState, Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Html, Stars, PresentationControls, Stage, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import { X, Map, Navigation, Users, Zap, Train, ShieldAlert } from 'lucide-react';
import * as THREE from 'three';

// miniaturas estilizadas (simulado con formas básicas pero con estilo)
function MiniBuilding({ position, color, label, onClick }) {
    const [hovered, setHovered] = useState(false);
    return (
        <group position={position} onClick={onClick} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
            <mesh castShadow>
                <boxGeometry args={[0.5, 0.8, 0.5]} />
                <meshStandardMaterial color={hovered ? '#fbbf24' : color} emissive={hovered ? '#fbbf24' : 'black'} emissiveIntensity={0.5} />
            </mesh>
            <Html distanceFactor={10} position={[0, 1, 0]}>
                <div style={{ 
                    background: 'rgba(0,0,0,0.8)', color: 'white', padding: '4px 8px', borderRadius: '4px', 
                    fontSize: '10px', whiteSpace: 'nowrap', border: '1px solid #38bdf8',
                    pointerEvents: 'none', transform: 'translateX(-50%)', opacity: hovered ? 1 : 0.6
                }}>
                    {label}
                </div>
            </Html>
        </group>
    );
}

function MiniVehicle({ position, color, speed = 1, rotation = [0, 0, 0] }) {
    const ref = useRef();
    useFrame((state) => {
        ref.current.position.x += Math.sin(state.clock.elapsedTime * 0.5) * 0.01 * speed;
    });
    return (
        <mesh ref={ref} position={position} rotation={rotation} castShadow>
            <boxGeometry args={[0.4, 0.2, 0.2]} />
            <meshStandardMaterial color={color} />
        </mesh>
    );
}

function MetroSystem({ points }) {
    const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)));
    const trainRef = useRef();

    useFrame((state) => {
        if (!trainRef.current) return;
        const time = state.clock.elapsedTime * 0.1;
        const loopTime = time % 1;
        const position = curve.getPointAt(loopTime);
        const tangent = curve.getTangentAt(loopTime);
        
        trainRef.current.position.copy(position);
        trainRef.current.lookAt(position.clone().add(tangent));
    });

    return (
        <group>
            {/* Rieles de Luz */}
            <mesh>
                <tubeGeometry args={[curve, 100, 0.02, 8, false]} />
                <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={2} transparent opacity={0.6} />
            </mesh>

            {/* Tren del Futuro */}
            <mesh ref={trainRef} castShadow>
                <boxGeometry args={[0.3, 0.15, 0.6]} />
                <meshStandardMaterial color="white" emissive="#38bdf8" emissiveIntensity={0.5} />
                <pointLight intensity={0.5} distance={2} color="#38bdf8" position={[0, 0.5, 0]} />
            </mesh>

            {/* Estaciones Metro */}
            {points.map((p, i) => (
                <group key={i} position={p}>
                    <mesh position={[0, 0.05, 0]}>
                        <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
                        <meshStandardMaterial color="#38bdf8" transparent opacity={0.3} />
                    </mesh>
                    <mesh position={[0, 0.1, 0]}>
                        <torusGeometry args={[0.2, 0.01, 16, 32]} rotation={[Math.PI / 2, 0, 0]} />
                        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" />
                    </mesh>
                </group>
            ))}
        </group>
    );
}

function CityBase() {
    return (
        <group>
            {/* Suelo Principal */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.01, 0]}>
                <circleGeometry args={[8, 64]} />
                <meshStandardMaterial
                    color="#020617"
                    roughness={0.9}
                    metalness={0.1}
                    emissive="#000"
                    emissiveIntensity={0.5}
                />
            </mesh>
            {/* Rejilla de Referencia */}
            <gridHelper args={[20, 40, '#38bdf8', '#1e293b']} position={[0, 0, 0]} rotation={[0, 0, 0]} opacity={0.1} transparent />
        </group>
    );
}

export default function SmartCity3DClone({ onClose }) {
    const [activeLabel, setActiveLabel] = useState("Modo Ciudad Satelital Activo");
    const [nextStation, setNextStation] = useState("Aeropuerto La Florida");
    const [showEmergencyForm, setShowEmergencyForm] = useState(false);

    const METRO_POINTS = [
        [3.5, 0.1, -2],     // Aeropuerto
        [1, 0.1, 0],        // Casco
        [-1, 0.1, -2.5],    // Faro
        [-2.5, 0.1, -1.5], // Comisaría Smart
        [-2, 0.1, 1],       // Puerto
        [0, 0.1, 2.5],      // Escuela Música
        [2.5, 0.1, 1.5],     // Escuela Artes
        [3, 0.1, 0]          // Observatorio
    ];

    const stationNames = [
        "Estación La Florida (Aero)",
        "Estación Casco Histórico",
        "Estación El Faro (Borde Costero)",
        "Estación Comisaría Smart (Seguridad)",
        "Estación Puerto TPC",
        "Estación Escuela Musical",
        "Estación Artes & Oficios",
        "Estación Cosmos (Observatorio)"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setNextStation(stationNames[Math.floor(Math.random() * stationNames.length)]);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const jumpTo = (event, path) => {
        if (event) event.stopPropagation();
        window.dispatchEvent(new CustomEvent(event));
        // Si el event es una ruta de navegación, se enviaría desde App.jsx
        // Pero para simplificar, dispararemos los eventos que ya reconoce el sistema
    };

    return (
        <div className="city-3d-modal" style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: '#020617', display: 'flex', flexDirection: 'column'
        }}>
            {/* Overlay UI */}
            <div style={{ position: 'absolute', top: '20px', left: '20px', right: '20px', zIndex: 10, display: 'flex', justifyContent: 'space-between', pointerEvents: 'none' }}>
                <div className="glass-panel" style={{ padding: '1rem', border: '1px solid #38bdf8', pointerEvents: 'auto', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ background: '#38bdf8', padding: '0.5rem', borderRadius: '8px' }}>
                        <Map size={20} color="black" />
                    </div>
                    <div>
                        <h3 style={{ color: 'white', margin: 0, fontSize: '1rem' }}>Smart Clone La Serena/Coquimbo</h3>
                        <span style={{ color: '#38bdf8', fontSize: '0.7rem', fontWeight: 'bold' }}>{activeLabel.toUpperCase()}</span>
                    </div>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem', pointerEvents: 'auto' }}>
                    <div className="glass-panel" style={{ padding: '0.8rem 1.5rem', border: '1px solid #a855f7', background: 'rgba(168, 85, 247, 0.1)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Train size={20} color="#a855f7" className="animate-pulse" />
                        <div>
                            <div style={{ fontSize: '0.6rem', color: '#a855f7', fontWeight: 'bold' }}>PRÓXIMA ESTACIÓN:</div>
                            <div style={{ fontSize: '0.9rem', color: 'white', fontWeight: '900' }}>{nextStation}</div>
                        </div>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="btn-glass" 
                        style={{ 
                            width: '50px', 
                            height: '50px', 
                            borderRadius: '50%', 
                            background: 'rgba(239, 68, 68, 0.4)', 
                            border: '2px solid #ef4444', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            boxShadow: '0 0 20px rgba(239, 68, 68, 0.4)',
                            cursor: 'pointer',
                            pointerEvents: 'auto'
                        }}
                    >
                        <X size={26} color="white" />
                    </button>
                </div>
            </div>

            {/* Bottom Menu */}
            <div style={{ position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', gap: '1rem' }}>
                <button className="btn-glass" style={{ background: 'rgba(56, 189, 248, 0.2)', border: '1px solid #38bdf8', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Users size={18} /> Ciudadanos Activados
                </button>
                <button className="btn-glass" style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Zap size={18} /> Energética Online
                </button>
            </div>

            {/* 3D Scene */}
            <div style={{ flex: 1, cursor: 'grab', position: 'relative' }}>
                <Canvas shadows dpr={[1, 2]} camera={{ position: [10, 10, 10], fov: 45 }}>
                    <Suspense fallback={null}>
                        <Environment preset="city" />
                        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                        
                        <group>
                            <ambientLight intensity={0.5} />
                            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
                            <pointLight position={[-10, 5, -5]} intensity={0.5} color="#38bdf8" />
                            
                            <CityBase />

                                {/* Agua (Mar) */}
                                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-4, -0.05, 0]} receiveShadow>
                                    <planeGeometry args={[8, 12]} />
                                    <meshStandardMaterial color="#0ea5e9" opacity={0.6} transparent />
                                </mesh>

                                {/* Puntos de interés interactivos */}
                                
                                {/* Aeropuerto La Florida */}
                                <group position={[3.5, 0, -2]} onClick={() => window.dispatchEvent(new CustomEvent('open-airport'))}>
                                    <MiniBuilding position={[0, 0.2, 0]} color="#38bdf8" label="Aeropuerto La Florida" />
                                    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                                        <mesh position={[0.5, 1, 0]}>
                                            <coneGeometry args={[0.1, 0.4, 3]} rotation={[Math.PI / 2, 0, 0]} />
                                            <meshStandardMaterial color="white" />
                                        </mesh>
                                    </Float>
                                </group>

                                {/* Puerto Coquimbo */}
                                <group position={[-2, 0, 1]} onClick={() => alert("Smart Port: Abriendo monitoreo de naves...")}>
                                    <MiniBuilding position={[0, 0.2, 0]} color="#fbbf24" label="Puerto Coquimbo (TPC)" />
                                    <mesh position={[0.5, 0, 0.5]}>
                                        <boxGeometry args={[1, 0.1, 0.4]} />
                                        <meshStandardMaterial color="#475569" />
                                    </mesh>
                                    {/* Barco Gardenia K (Simulado) */}
                                    <mesh position={[0.8, 0.2, 0.5]}>
                                        <boxGeometry args={[0.6, 0.2, 0.2]} />
                                        <meshStandardMaterial color="#334155" />
                                    </mesh>
                                </group>

                                {/* Guayacán */}
                                <group position={[-2.5, 0, 3]} onClick={() => alert("Dársena Guayacán (CMP)")}>
                                    <MiniBuilding position={[0, 0.2, 0]} color="#f59e0b" label="Puerto Guayacán" />
                                </group>

                                {/* El Faro */}
                                <group position={[-1, 0, -2.5]} onClick={() => window.dispatchEvent(new CustomEvent('open-3d-walk'))}>
                                    <mesh position={[0, 0.5, 0]}>
                                        <cylinderGeometry args={[0.1, 0.2, 1, 8]} />
                                        <meshStandardMaterial color="#ef4444" />
                                    </mesh>
                                    <Html position={[0, 1.2, 0]} center>
                                        <div style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '10px' }}>Farito VLS</div>
                                    </Html>
                                </group>

                                {/* Edificios Genéricos */}
                                <MiniBuilding position={[1, 0, 0]} color="#475569" label="Casco Histórico" />
                                <MiniBuilding position={[1.5, 0, 0.8]} color="#475569" label="Juntas de Vecinos" />
                                <MiniBuilding position={[0.5, 0, 1.2]} color="#475569" label="Smart Services" />
                                
                                {/* Nuevas Estaciones/Edificios */}
                                <MiniBuilding position={[0, 0, 2.5]} color="#a855f7" label="Escuela de Música" onClick={() => window.dispatchEvent(new CustomEvent('open-escuela-musica'))} />
                                <MiniBuilding position={[2.5, 0, 1.5]} color="#3b82f6" label="Escuela de Artes" onClick={() => window.dispatchEvent(new CustomEvent('open-escuela-artes'))} />
                                <MiniBuilding position={[-2.5, 0, -1.5]} color="#1e3a8a" label="Comisaría Smart" onClick={() => setShowEmergencyForm(true)} />
                                <MiniBuilding position={[-1, 0, 2]} color="#ef4444" label="Faro-AI (Sismic)" onClick={() => window.dispatchEvent(new CustomEvent('open-sismic'))} />
                                <MiniBuilding position={[1, 0, -2.5]} color="#b91c1c" label="Teatro Municipal" onClick={() => window.dispatchEvent(new CustomEvent('open-theater'))} />
                                <MiniBuilding position={[0.5, 0, 3]} color="#444" label="Estudios Revox (Mastering)" onClick={() => window.dispatchEvent(new CustomEvent('open-reeltoreel'))} />
                                <MiniBuilding position={[-2, 0, 3]} color="#f59e0b" label="Cabina de Comunicaciones & AR" onClick={() => window.dispatchEvent(new CustomEvent('open-museum'))} />
                                <MiniBuilding position={[2, 0, 1.5]} color="#38bdf8" label="Centro Vecinojos (AI Cam)" onClick={() => window.dispatchEvent(new CustomEvent('open-vecinojos'))} />
                                <group position={[3, 0, 0]} onClick={() => window.dispatchEvent(new CustomEvent('open-observatory'))}>
                                    <MiniBuilding position={[0, 0.2, 0]} color="#38bdf8" label="Observatorio Smart" />
                                    <mesh position={[0, 0.6, 0]}>
                                        <sphereGeometry args={[0.2, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                                        <meshStandardMaterial color="#334155" />
                                    </mesh>
                                </group>

                                {/* Sistema de Metro */}
                                <MetroSystem points={METRO_POINTS} />
                                
                                {/* Vehículos en movimiento */}
                                <MiniVehicle position={[2, 0.05, 0]} color="#38bdf8" speed={2} />
                                <MiniVehicle position={[2, 0.05, 0.5]} color="#f59e0b" speed={1.5} rotation={[0, Math.PI, 0]} />
                            
                            <ContactShadows opacity={0.4} scale={15} blur={2.4} far={10} />
                        </group>
                    </Suspense>
                    <OrbitControls 
                        enableDamping 
                        dampingFactor={0.05}
                        minDistance={3}
                        maxDistance={12}
                        minPolarAngle={Math.PI / 6} 
                        maxPolarAngle={Math.PI / 2.1} 
                        enablePan={false}
                        target={[0, 0, 0]}
                        makeDefault 
                    />
                </Canvas>

                {/* Reset Camera Button */}
                <button 
                    onClick={() => {
                        window.location.reload(); // Forma rápida de resetear el canvas 3D si se cuelga
                    }}
                    style={{ position: 'absolute', bottom: '20px', right: '20px', background: 'rgba(2,6,23,0.8)', color: '#38bdf8', border: '1px solid #38bdf8', padding: '10px 15px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    🔄 REINICIAR VISTA
                </button>

                {/* Pixar Backdrop Hint */}
                <div style={{ 
                    position: 'absolute', inset: 0, zIndex: -1, 
                    backgroundImage: 'url(/smart_city_3d_pixar_style_1773538873800.png)', 
                    backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15 
                }} />
            </div>

            {/* Modal de Emergencia (Police Station) */}
            {showEmergencyForm && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 100001, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                    <div className="glass-panel" style={{ width: '100%', maxWidth: '500px', padding: '2rem', border: '1px solid #1e40af', position: 'relative' }}>
                        <button onClick={() => setShowEmergencyForm(false)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
                            <X size={24} />
                        </button>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                            <div style={{ background: '#1e3a8a', padding: '1rem', borderRadius: '12px' }}>
                                <ShieldAlert size={32} color="white" />
                            </div>
                            <div>
                                <h2 style={{ color: 'white', margin: 0, fontSize: '1.5rem' }}>Comisaría Smart VLS</h2>
                                <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.8rem' }}>Notificación Inmediata a Central de Emergencias</p>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gap: '1rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <button className="btn-glass" style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', color: '#ef4444', height: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }} onClick={() => { alert('ALERTA DE ROBO ENVIADA. Unidades en camino.'); setShowEmergencyForm(false); }}>
                                    <ShieldAlert size={28} />
                                    <span>ROBO</span>
                                </button>
                                <button className="btn-glass" style={{ background: 'rgba(245, 158, 11, 0.2)', border: '1px solid #f59e0b', color: '#f59e0b', height: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }} onClick={() => { alert('NOTIFICACIÓN DE PÉRDIDA REGISTRADA.'); setShowEmergencyForm(false); }}>
                                    <Map size={28} />
                                    <span>PÉRDIDAS</span>
                                </button>
                                <button className="btn-glass" style={{ background: 'rgba(220, 38, 38, 0.4)', border: '1px solid #dc2626', color: 'white', height: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }} onClick={() => { alert('ALERTA DE ASALTO / PELIGRO EXTREMO. Activando cámaras municipales...'); setShowEmergencyForm(false); }}>
                                    <Zap size={28} />
                                    <span>ASALTO</span>
                                </button>
                                <button className="btn-glass" style={{ background: 'rgba(59, 130, 246, 0.2)', border: '1px solid #3b82f6', color: '#3b82f6', height: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }} onClick={() => { alert('OTRA EMERGENCIA NOTIFICADA.'); setShowEmergencyForm(false); }}>
                                    <Users size={28} />
                                    <span>OTRO</span>
                                </button>
                            </div>
                            
                            <textarea placeholder="Describe la situación aquí..." style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '1rem', borderRadius: '12px', minHeight: '100px', width: '100%' }}></textarea>
                            
                            <button className="btn btn-primary" style={{ background: '#1e3a8a', width: '100%', height: '50px', fontSize: '1rem', fontWeight: 'bold' }}>
                                ENVIAR A CENTRAL C-5
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
