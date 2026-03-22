import React, { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, Text, Float, PerspectiveCamera, Environment, Sky, ContactShadows, useTexture, Decal, Loader } from '@react-three/drei';
import * as THREE from 'three';
import { X, Maximize2, RotateCcw, Camera, Info } from 'lucide-react';

// 3D Sweets and Candies Component (VLS Ecosistema)
function DulcesVLS3D() {
    return (
        <group position={[0, -0.1, 1.8]}>
            {/* Box of Miti-Smart Gums */}
            <mesh position={[-0.4, 0, 0]} castShadow>
                <boxGeometry args={[0.3, 0.1, 0.2]} />
                <meshStandardMaterial color="#ec4899" /> {/* Pink box */}
                <Text position={[0, 0.051, 0]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.03} color="white">Miti-Smart</Text>
            </mesh>

            {/* Individual Bicolor Gums */}
            {[0, 1, 2].map((i) => (
                <mesh key={i} position={[-0.4 + i*0.08, 0, 0.15]} castShadow>
                    <boxGeometry args={[0.06, 0.03, 0.04]} />
                    <meshStandardMaterial color={i % 2 === 0 ? "#10b981" : "#ef4444"} />
                </mesh>
            ))}

            {/* Lollipops (Koyak VLS) */}
            {[0, 1, 2, 3].map((i) => (
                <group key={i} position={[0.2 + i * 0.1, 0, -0.1]}>
                    <mesh position={[0, 0.08, 0]} castShadow>
                        <sphereGeometry args={[0.04, 16, 16]} />
                        <meshStandardMaterial color={i % 2 === 0 ? "#b91c1c" : "#3b82f6"} roughness={0.1} />
                    </mesh>
                    <mesh position={[0, 0.02, 0]}>
                        <cylinderGeometry args={[0.005, 0.005, 0.15, 8]} />
                        <meshStandardMaterial color="white" />
                    </mesh>
                </group>
            ))}

            {/* Chocolate Bars */}
            <mesh position={[0.6, 0, 0]} rotation={[0, -0.4, 0]} castShadow>
                <boxGeometry args={[0.2, 0.04, 0.1]} />
                <meshStandardMaterial color="#451a03" /> {/* Dark chocolate */}
                <Text position={[0, 0.021, 0]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.03} color="#fcd34d">VLS CHOCO</Text>
            </mesh>
            
            {/* Banderita Wafers */}
            <mesh position={[-0.7, 0, 0]} castShadow>
                <boxGeometry args={[0.15, 0.1, 0.05]} />
                <meshStandardMaterial color="#3b82f6" /> {/* Blue pack */}
                <Text position={[0, 0.051, 0]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.025} color="white">BANDERITA</Text>
            </mesh>
        </group>
    );
}

// Newspaper Mesh Component
function Newspaper3D({ position, rotation, textureUrl, title, color, url }) {
    return (
        <group 
            position={position} 
            rotation={rotation} 
            onClick={(e) => {
                e.stopPropagation();
                if (url) window.open(url, '_blank');
            }}
            onPointerOver={() => document.body.style.cursor = 'pointer'}
            onPointerOut={() => document.body.style.cursor = 'auto'}
        >
            {/* Paper Sheet - Using a solid color to avoid CORS freezing */}
            <mesh castShadow receiveShadow>
                <boxGeometry args={[0.6, 0.85, 0.01]} />
                <meshStandardMaterial 
                    color="#f8f8f8"
                    roughness={0.9}
                />
            </mesh>
            
            {/* Header / Title area (The "VLS Trick": Overlaying the real name) */}
            <group position={[0, 0.35, 0.006]}>
                <mesh>
                    <planeGeometry args={[0.58, 0.14]} />
                    <meshStandardMaterial color={color || "#1e3a8a"} metalness={0.5} roughness={0.2} />
                </mesh>
                <Text
                    position={[0, 0, 0.01]}
                    fontSize={0.07}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    // Use a more newspaper-like font if possible
                    font="https://fonts.gstatic.com/s/playfairdisplay/v37/nuFvD7Kpq1zlTK7o6DG99FkA8Z7_V4v3vXU.woff"
                >
                    {title?.toUpperCase()}
                </Text>
            </group>

            {/* Price Tag with Glow */}
            <mesh position={[0.22, -0.38, 0.01]}>
                <circleGeometry args={[0.06, 32]} />
                <meshStandardMaterial color="#fcd34d" emissive="#fcd34d" emissiveIntensity={0.2} />
                <Text
                    position={[0, 0, 0.001]}
                    fontSize={0.025}
                    color="black"
                    fontWeight="900"
                >
                    VLS
                </Text>
            </mesh>
        </group>
    );
}

// Procedural Kiosk Component
function KioskStructure() {
    return (
        <group>
            {/* Octagonal Base */}
            <mesh position={[0, -1.9, 0]} receiveShadow>
                <cylinderGeometry args={[2.2, 2.5, 0.2, 8]} />
                <meshStandardMaterial color="#1e293b" roughness={0.5} />
            </mesh>

            {/* Main Body (Lower part) */}
            <mesh position={[0, -1, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[1.8, 1.8, 1.5, 8]} />
                <meshStandardMaterial color="#065f46" roughness={0.3} metalness={0.2} />
            </mesh>

            {/* Counter */}
            <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[2.1, 1.9, 0.15, 8]} />
                <meshStandardMaterial color="#047857" roughness={0.1} metalness={0.5} />
            </mesh>

            {/* Pillars */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <mesh 
                    key={i} 
                    position={[
                        Math.cos((i * Math.PI) / 4) * 1.7, 
                        0.75, 
                        Math.sin((i * Math.PI) / 4) * 1.7
                    ]} 
                    castShadow
                >
                    <boxGeometry args={[0.15, 1.8, 0.15]} />
                    <meshStandardMaterial color="#064e3b" />
                </mesh>
            ))}

            {/* Roof (Green Octagon) */}
            <mesh position={[0, 1.8, 0]} castShadow>
                <cylinderGeometry args={[2.3, 2.0, 0.6, 8]} />
                <meshStandardMaterial color="#065f46" roughness={0.2} metalness={0.4} />
            </mesh>
            
            {/* Top decorative part */}
            <mesh position={[0, 2.2, 0]} castShadow>
                <cylinderGeometry args={[1.2, 2.3, 0.4, 8]} />
                <meshStandardMaterial color="#059669" />
            </mesh>

            {/* "vecinoslaserena.cl" Sign */}
            <mesh position={[0, 1.5, 1.8]} rotation={[0, 0, 0]}>
                <boxGeometry args={[2.5, 0.4, 0.05]} />
                <meshStandardMaterial color="#064e3b" />
                <Text
                    position={[0, 0, 0.03]}
                    fontSize={0.18}
                    color="#fcd34d"
                    font="https://fonts.gstatic.com/s/outfit/v11/Q8bc8v06WWiYxKRYmZSQ_mS7.woff"
                >
                    www.vecinoslaserena.cl
                </Text>
            </mesh>
        </group>
    );
}

function SerenitoAvatar() {
    const { scene } = useGLTF('/serenito_draco.glb');
    return (
        <group position={[0, -0.3, 0]} scale={1.8} rotation={[0, Math.PI, 0]}>
            <primitive object={scene} />
        </group>
    );
}

export default function Kiosko3DModal({ onClose, diarios }) {
    const [viewMode, setViewMode] = useState('orbit');
    
    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200000,
            background: '#000',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* UI Overlay */}
            <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                right: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 200005 // Higher than canvas
            }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', padding: '0.8rem 1.2rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}>
                        <h3 style={{ margin: 0, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Maximize2 size={18} color="#38bdf8" /> MODO KIOSKO VIRTUAL 3D
                        </h3>
                    </div>
                </div>
                
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => setViewMode(prev => prev === 'orbit' ? 'auto' : 'orbit')} className="btn-glass" style={{ padding: '0.8rem', borderRadius: '50%' }}>
                        <RotateCcw size={20} color="white" />
                    </button>
                    <button onClick={onClose} style={{ background: '#ef4444', border: 'none', color: 'white', width: '45px', height: '45px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <X size={24} />
                    </button>
                </div>
            </div>

            {/* Bottom Help */}
            <div style={{
                position: 'absolute',
                bottom: '30px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(0,0,0,0.7)',
                padding: '0.8rem 2rem',
                borderRadius: '50px',
                color: 'white',
                fontSize: '0.9rem',
                zIndex: 10,
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
            }}>
                <Info size={16} color="#38bdf8" /> Mantén presionado y mueve para ver alrededor • Scroll para Zoom
            </div>

            {/* Three.js Canvas Container */}
            <div style={{ flex: 1, position: 'relative', width: '100%', height: '100%' }}>
                <Canvas shadows camera={{ position: [5, 2, 8], fov: 45 }} style={{ background: '#020617' }}>
                <Suspense fallback={null}>
                    <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
                    <Environment preset="park" />
                    
                    <ambientLight intensity={0.4} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} />

                    <group position={[0, 0, 0]}>
                        <KioskStructure />
                        <SerenitoAvatar />
                        <DulcesVLS3D />

                        {/* Distribute Newspapers on the kiosk walls */}
                        {diarios && diarios.length > 0 && diarios.map((diario, idx) => {
                            // Positions for an octagon
                            const angle = (idx * Math.PI * 2) / 8;
                            const radius = 1.85;
                            const x = Math.cos(angle) * radius;
                            const z = Math.sin(angle) * radius;
                            const rotY = -angle + Math.PI / 2;

                            return (
                                <group key={diario.id} position={[x, 0.5, z]} rotation={[0, rotY, 0]}>
                                    <Newspaper3D 
                                        position={[0, 0, 0]} 
                                        rotation={[0, 0, 0]} 
                                        textureUrl={diario.cover} 
                                        title={diario.name}
                                        color={diario.color}
                                        url={diario.url}
                                    />
                                    {/* Secondary papers at different heights */}
                                    <Newspaper3D 
                                        position={[0, -0.9, 0]} 
                                        rotation={[0, 0, 0]} 
                                        textureUrl={diarios[(idx + 1) % diarios.length].cover} 
                                        title={diarios[(idx + 1) % diarios.length].name}
                                        color={diarios[(idx + 1) % diarios.length].color}
                                        url={diarios[(idx + 1) % diarios.length].url}
                                    />
                                </group>
                            );
                        })}
                    </group>

                    <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.35} far={10} color="#000000" />
                    <OrbitControls 
                        enablePan={false} 
                        minDistance={3} 
                        maxDistance={12} 
                        maxPolarAngle={Math.PI / 2.1} 
                        autoRotate={viewMode === 'auto'}
                    />
                </Suspense>
            </Canvas>
          </div>
          <Loader containerStyles={{ background: 'rgba(2, 6, 23, 0.9)', zIndex: 300000 }} />
            
            <style>{`
                .btn-glass {
                    background: rgba(255,255,255,0.1);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255,255,255,0.2);
                    cursor: pointer;
                    transition: all 0.3s;
                }
                .btn-glass:hover {
                    background: rgba(255,255,255,0.2);
                }
            `}</style>
        </div>
    );
}
