import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Html, OrbitControls, Sky, Environment } from '@react-three/drei';
import { Compass, ExternalLink, Activity, AlertCircle, X, ChevronRight } from 'lucide-react';
import * as THREE from 'three';

// Data Local y Lore (Coordenadas ficticias/referenciales para la demo WebXR)
const OBSERVATORIOS = [
    { id: 'mamalluca', name: 'Mamalluca', lore: 'Foco Turístico', position: [10, 5, -20], color: '#f59e0b' },
    { id: 'collowara', name: 'Collowara', lore: 'Nexo Andacollo', position: [-15, 8, -10], color: '#10b981' },
    { id: 'seminario', name: 'Seminario Conciliar', lore: 'El Decanato', position: [5, 2, -5], color: '#38bdf8' },
    { id: 'gemelos_sur', name: 'Gemelos Sur', lore: 'Portal Norte', position: [0, 15, -30], color: '#ec4899', isPortal: true },
    { id: 'lamesa', name: 'La Mesa', lore: 'Vigía del Valle', position: [20, 10, 0], color: '#a855f7' },
    { id: 'el_pololo', name: 'El Pololo', lore: 'Cerro Tololo', position: [-25, 12, -25], color: '#ef4444' },
    { id: 'antofagasta_0', name: 'Obs. Antofagasta 0', lore: 'Señal Fantasma', position: [0, 20, 30], color: '#64748b' }
];

function SensorTarget({ activeHawaii }) {
    const group = useRef();

    useFrame((state) => {
        // En una app PWA real, aquí inyectamos DeviceOrientationControls
        // navigator.sensors u OrbitControls en dispositivos PC
        if (group.current) {
            group.current.rotation.y += 0.001;
        }
    });

    return (
        <group ref={group}>
            {OBSERVATORIOS.map((obs) => (
                <mesh key={obs.id} position={activeHawaii ? [-obs.position[0], obs.position[1], -obs.position[2]] : obs.position}>
                    <sphereGeometry args={[0.5, 16, 16]} />
                    <meshBasicMaterial color={obs.color} />
                    <Html center distanceFactor={15}>
                        <div style={{ background: 'rgba(2,6,23,0.8)', border: `1px solid ${obs.color}`, padding: '4px 12px', borderRadius: '12px', color: 'white', fontSize: '0.8rem', whiteSpace: 'nowrap', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <strong style={{ color: obs.color, textTransform: 'uppercase' }}>{obs.name}</strong>
                            <span style={{ fontSize: '0.6rem', color: '#94a3b8' }}>{obs.lore}</span>
                            {obs.isPortal && !activeHawaii && (
                                <span style={{ marginTop: '5px', background: '#ec4899', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '0.5rem', animation: 'pulse 1s infinite' }}>
                                    PORTAL A HAWÁI DETECTADO
                                </span>
                            )}
                        </div>
                    </Html>
                </mesh>
            ))}
        </group>
    );
}

export default function SkyGuideRA({ onClose }) {
    const [gameState, setGameState] = useState('menu');
    const [hawaiiMode, setHawaiiMode] = useState(false);
    const [permissionGranted, setPermissionGranted] = useState(false);

    const requestSensors = () => {
        // Petición de giroscopio (iOS 13+ requiere permiso explícito)
        if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') startGame();
                    else alert("Permiso de sensores denegado. Se usará modo interactivo táctil.");
                })
                .catch(console.error);
        } else {
            startGame(); // Dispositivos sin bloqueo estricto (Android/PC)
        }
    };

    const startGame = () => {
        window.dispatchEvent(new CustomEvent('charge-vls-token', {
            detail: {
                cost: 1,
                onSuccess: () => setGameState('playing'),
                onFail: () => console.log('Sin saldo para RA')
            }
        }));
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100000, background: '#020617', color: 'white', fontFamily: 'sans-serif' }}>
            {gameState === 'menu' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '2rem', textAlign: 'center', background: 'radial-gradient(circle at top, #1e3a8a, #020617)' }}>
                    <Compass size={80} color="#38bdf8" style={{ marginBottom: '1.5rem', animation: 'spin-slow 10s linear infinite' }} />
                    <h1 style={{ fontSize: '3rem', margin: '0 0 1rem 0', fontWeight: '900', letterSpacing: '2px' }}>SkyGuide<span style={{ color: '#10b981' }}>RA</span></h1>
                    <p style={{ color: '#bae6fd', maxWidth: '600px', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '3rem' }}>
                        Transforma tu dispositivo en una ventana táctica hacia el cosmos. 
                        Explora los observatorios locales y conecta con el <b>Polo Norte Místico</b> a través del portal interhemisférico.
                    </p>

                    <button 
                        onClick={requestSensors}
                        style={{ background: '#38bdf8', color: '#0f172a', border: 'none', padding: '1.2rem 3rem', borderRadius: '50px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 10px 30px rgba(56,189,248,0.4)', marginBottom: '2rem' }}
                    >
                        <Activity size={20} /> ACTIVAR SENSORES (1 FICHA VLS)
                    </button>

                    <button onClick={onClose} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: '#94a3b8', padding: '0.8rem 2rem', borderRadius: '30px', cursor: 'pointer' }}>
                        VOLVER AL HUB
                    </button>
                </div>
            )}

            {gameState === 'playing' && (
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', background: 'linear-gradient(180deg, rgba(2,6,23,0.9), transparent)' }}>
                        <div>
                            <h2 style={{ margin: 0, color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem' }}>
                                <Activity size={18} className="pulse" />
                                {hawaiiMode ? 'CIELO NORTE (Inyección Telemetría Hawai)' : 'CIELO SUR (Región Estrella)'}
                            </h2>
                            <p style={{ margin: '5px 0 0 0', color: '#10b981', fontSize: '0.8rem', fontWeight: 'bold' }}>Giroscopio / Touch Activo</p>
                        </div>
                        <button onClick={onClose} style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', color: '#fca5a5', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <X size={20} />
                        </button>
                    </div>

                    {!hawaiiMode && (
                        <div style={{ position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
                            <button 
                                onClick={() => setHawaiiMode(true)}
                                style={{ background: '#ec4899', color: 'white', border: '2px solid white', padding: '1rem 2rem', borderRadius: '50px', fontSize: '1rem', fontWeight: '900', cursor: 'pointer', boxShadow: '0 10px 30px rgba(236, 72, 153, 0.5)', display: 'flex', alignItems: 'center', gap: '10px' }}
                            >
                                <ExternalLink size={20} /> PORTAL A HAWÁI (Gemelos Sur)
                            </button>
                        </div>
                    )}
                    
                    {hawaiiMode && (
                        <div style={{ position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
                            <button 
                                onClick={() => setHawaiiMode(false)}
                                style={{ background: '#38bdf8', color: '#0f172a', border: '2px solid white', padding: '1rem 2rem', borderRadius: '50px', fontSize: '1rem', fontWeight: '900', cursor: 'pointer', boxShadow: '0 10px 30px rgba(56, 189, 248, 0.5)' }}
                            >
                                VOLVER A LA REGIÓN
                            </button>
                        </div>
                    )}

                    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                        <color attach="background" args={['#020617']} />
                        <Stars radius={100} depth={50} count={hawaiiMode ? 8000 : 5000} factor={hawaiiMode ? 6 : 4} saturation={1} fade />
                        
                        <Suspense fallback={null}>
                            <SensorTarget activeHawaii={hawaiiMode} />
                            {/* DeviceOrientationControls de Drei se usaría aquí si se instala el paquete extra, por defecto OrbitControls simula la rotación */}
                            <OrbitControls enableZoom={false} enablePan={false} autoRotate={!permissionGranted} autoRotateSpeed={0.5} />
                        </Suspense>
                    </Canvas>
                </div>
            )}
            <style>{`
                @keyframes spin-slow { 100% { transform: rotate(360deg); } }
                .pulse { animation: pulseAnim 2s infinite alternate; }
                @keyframes pulseAnim { from { opacity: 0.5; } to { opacity: 1; } }
            `}</style>
        </div>
    );
}
