import React, { useState, Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Text, PerspectiveCamera, MeshDistortMaterial, Html } from '@react-three/drei';
import { X, Radio, Bot, Camera, Newspaper, GraduationCap, FileText, Calendar, Users, Info, ChevronRight, Activity, Lightbulb, Scale } from 'lucide-react';

const HUB_GROUPS = [
    {
        id: 'multimedia',
        name: 'ONDA & PULSO',
        desc: 'IA, Multimedia y Cámaras',
        color: '#38bdf8',
        icon: <Activity size={32} />,
        items: [
            { name: 'Radio VLS', icon: <Radio />, event: 'toggle-radio-visibility' },
            { name: 'IA Faro', icon: <Bot />, event: 'open-faro' },
            { name: 'Ojos VLS (Live)', icon: <Camera />, event: 'open-vecinojos' },
            { name: 'Feed Noticias', icon: <Activity />, event: 'open-vls-feed' }
        ]
    },
    {
        id: 'leisure',
        name: 'VIDA & CIUDAD',
        desc: 'Kiosko, Historia y Ocio',
        color: '#fcd34d',
        icon: <Calendar size={32} />,
        items: [
            { name: 'Kiosko Virtual', icon: <Newspaper />, event: 'open-kiosko-diarios' },
            { name: 'Bus del Tiempo', icon: <Activity />, event: 'open-time-bus' },
            { name: 'Teatro & Cine', icon: <Activity />, event: 'open-theater' },
            { name: 'Panoramas', icon: <Calendar />, event: 'open-theater' }
        ]
    },
    {
        id: 'admin',
        name: 'GESTIÓN PRO',
        desc: 'Administración y RRHH',
        color: '#10b981',
        icon: <GraduationCap size={32} />,
        items: [
            { name: 'Smart Admin', icon: <GraduationCap />, event: 'open-smart-admin' },
            { name: 'Cero Papel', icon: <FileText />, event: 'open-digital-reports' },
            { name: 'Justicia Vecinal', icon: <Scale />, event: 'open-tribunales' }
        ]
    },
    {
        id: 'citizen',
        name: 'CONEXIÓN VECINAL',
        desc: 'Soporte e Ideas',
        color: '#ef4444',
        icon: <Users size={32} />,
        items: [
            { name: 'Reporte Rápido', icon: <Bot />, event: 'open-faro' },
            { name: 'Ideas DeBono', icon: <Lightbulb />, event: 'open-debono-hats' },
            { name: 'Dial Regional', icon: <Activity />, event: 'trigger-don-radios' }
        ]
    }
];

function GroupNode({ group, index, total, onSelectItem, activeGroupId, setActiveGroupId }) {
    const angle = (index * Math.PI * 2) / total;
    const radius = 6;
    const position = [Math.cos(angle) * radius, Math.sin(angle) * 1.5, Math.sin(angle) * radius];
    const groupRef = useRef();
    const isActive = activeGroupId === group.id;

    // Pulse animation
    useFrame(({ clock }) => {
        if (groupRef.current) {
            const t = clock.getElapsedTime();
            const scale = isActive ? 1.2 : 1 + Math.sin(t * 2 + index) * 0.05;
            groupRef.current.scale.set(scale, scale, scale);
        }
    });

    return (
        <group position={position}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <mesh 
                    ref={groupRef}
                    onClick={() => setActiveGroupId(isActive ? null : group.id)}
                    onPointerOver={() => document.body.style.cursor = 'pointer'}
                    onPointerOut={() => document.body.style.cursor = 'auto'}
                >
                    <sphereGeometry args={[1.2, 32, 32]} />
                    <MeshDistortMaterial 
                        color={group.color} 
                        speed={isActive ? 4 : 2} 
                        distort={0.4} 
                        roughness={0} 
                        metalness={0.8}
                        emissive={group.color}
                        emissiveIntensity={isActive ? 0.8 : 0.4}
                    />
                </mesh>
            </Float>

            <Html position={[0, -2, 0]} center distanceFactor={10}>
                <div style={{
                    textAlign: 'center',
                    color: 'white',
                    fontFamily: 'Outfit, sans-serif',
                    width: '200px',
                    pointerEvents: 'none'
                }}>
                    <h3 style={{ textTransform: 'uppercase', margin: 0, fontWeight: '900', fontSize: '1.2rem', textShadow: '0 0 10px rgba(0,0,0,1)' }}>{group.name}</h3>
                    <p style={{ margin: 0, fontSize: '0.7rem', opacity: 0.8, color: group.color }}>{group.desc}</p>
                </div>
            </Html>

            {isActive && (
                <group>
                    {group.items.map((item, i) => {
                        const itemAngle = (i * Math.PI * 2) / group.items.length;
                        const itemRadius = 2.5;
                        const itemPos = [Math.cos(itemAngle) * itemRadius, Math.sin(itemAngle) * itemRadius, 0.5];
                        return (
                            <group key={item.name} position={itemPos}>
                                <mesh 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onSelectItem(item.event);
                                    }}
                                    onPointerOver={() => document.body.style.cursor = 'pointer'}
                                    onPointerOut={() => document.body.style.cursor = 'auto'}
                                >
                                    <boxGeometry args={[0.8, 0.8, 0.2]} />
                                    <meshStandardMaterial color="white" emissive={group.color} emissiveIntensity={0.5} />
                                </mesh>
                                <Html position={[0, -0.7, 0]} center>
                                    <button 
                                        onClick={() => onSelectItem(item.event)}
                                        style={{
                                            background: 'rgba(0,0,0,0.85)',
                                            border: `1px solid ${group.color}`,
                                            color: 'white',
                                            padding: '6px 14px',
                                            borderRadius: '20px',
                                            fontSize: '0.75rem',
                                            fontWeight: 'bold',
                                            whiteSpace: 'nowrap',
                                            cursor: 'pointer',
                                            boxShadow: `0 0 15px ${group.color}40`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '5px'
                                        }}
                                    >
                                        {item.name} <ChevronRight size={12} />
                                    </button>
                                </Html>
                            </group>
                        );
                    })}
                </group>
            )}
        </group>
    );
}

function StarField() {
    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </group>
    );
}

export default function SmartHub3D({ onClose }) {
    const [activeGroupId, setActiveGroupId] = useState(null);

    const handleAction = (eventName) => {
        window.dispatchEvent(new CustomEvent(eventName));
        if (eventName !== 'toggle-radio-visibility') {
            // Radio preserves UI, others might cover the hub, so we keep hub open unless requested
        }
    };

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200000,
            background: '#020617',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        }}>
            {/* Minimal Header */}
            <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                right: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 10
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', padding: '0.6rem', borderRadius: '12px' }}>
                        <Bot size={24} color="white" />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, color: 'white', fontSize: '1.2rem', fontWeight: '900', letterSpacing: '1px' }}>SMART HUB 3D</h2>
                        <p style={{ margin: 0, color: '#38bdf8', fontSize: '0.7rem', fontWeight: 'bold' }}>SISTEMA DE NAVEGACIÓN SIMPLIFICADO</p>
                    </div>
                </div>
                <button 
                    onClick={onClose}
                    style={{ background: '#ef4444', border: 'none', color: 'white', width: '45px', height: '45px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 15px rgba(239, 68, 68, 0.4)' }}
                >
                    <X size={24} />
                </button>
            </div>

            {/* Bottom Help Text */}
            <div style={{
                position: 'absolute',
                bottom: '30px',
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'rgba(255,255,255,0.5)',
                fontSize: '0.75rem',
                zIndex: 10,
                textAlign: 'center',
                pointerEvents: 'none'
            }}>
                Toca una categoría para expandir • Arrastra para explorar la red neuronal
            </div>

            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#38bdf8" />
                
                <Suspense fallback={null}>
                    <StarField />
                    
                    <group>
                        {HUB_GROUPS.map((group, i) => (
                            <GroupNode 
                                key={group.id}
                                group={group}
                                index={i}
                                total={HUB_GROUPS.length}
                                onSelectItem={handleAction}
                                activeGroupId={activeGroupId}
                                setActiveGroupId={setActiveGroupId}
                            />
                        ))}
                    </group>

                    <OrbitControls 
                        enablePan={false} 
                        minDistance={8} 
                        maxDistance={25} 
                        autoRotate={!activeGroupId}
                        autoRotateSpeed={0.5}
                    />
                </Suspense>
            </Canvas>

            <style>{`
                @font-face {
                    font-family: 'Outfit';
                    src: url('https://fonts.gstatic.com/s/outfit/v11/Q8bc8v06WWiYxKRYmZSQ_mS7.woff');
                }
            `}</style>
        </div>
    );
}
