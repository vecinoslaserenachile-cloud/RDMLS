import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sky, Environment, Stars, useGLTF, Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Gamepad2, X, AlertCircle } from 'lucide-react';

/**
 * 🍄🚀 SUPER SERENITO BROS (V1 - Spherical Gravity Core)
 */

function PlanetCore() {
    return (
        <mesh receiveShadow>
            <sphereGeometry args={[10, 64, 64]} />
            <meshStandardMaterial color="#1e293b" wireframe visible={false} />
            <mesh position={[0,0,0]}>
                 <sphereGeometry args={[9.9, 32, 32]} />
                 <meshStandardMaterial color="#0f172a" roughness={0.9} />
            </mesh>
            {/* El Faro (Polo Norte) */}
            <mesh position={[0, 10, 0]}>
                <cylinderGeometry args={[0.5, 1, 4, 16]} />
                <meshStandardMaterial color="#ef4444" />
            </mesh>
        </mesh>
    );
}

function PlayerAntigravity() {
    const playerRef = useRef();
    const { camera } = useThree();
    
    // Antigravity & Spherical logic placeholder
    useFrame((state, delta) => {
        if (!playerRef.current) return;
        
        // El vector de gravedad es dir = normalize(center - position)
        // Alineamos el up del jugador con -dir (hacia afuera de la esfera)
        const center = new THREE.Vector3(0,0,0);
        const upDir = playerRef.current.position.clone().sub(center).normalize();
        
        // Orientación Quaternion (lookAt no sirve bien para esferas, usamos setFromUnitVectors)
        const defaultUp = new THREE.Vector3(0, 1, 0);
        const q = new THREE.Quaternion().setFromUnitVectors(defaultUp, upDir);
        playerRef.current.quaternion.copy(q);

        // Simple Camera Follow
        const camPos = playerRef.current.position.clone().add(upDir.multiplyScalar(5)).add(new THREE.Vector3(0, 0, 8));
        camera.position.lerp(camPos, 0.1);
        camera.lookAt(playerRef.current.position);
    });

    return (
        <group ref={playerRef} position={[0, 10.5, 0]}> {/* Inicia en el Polo Norte */}
           {/* Placeholder Serenito */}
           <mesh castShadow>
               <capsuleGeometry args={[0.4, 1, 4, 8]} />
               <meshStandardMaterial color="#38bdf8" />
           </mesh>
           <pointLight distance={15} intensity={2} color="#fca5a5" /> {/* Antorcha del Abuelo conceptual */}
        </group>
    );
}

export default function SuperSerenitoBros({ onClose }) {
    const [gameState, setGameState] = useState('menu'); // menu, playing, gameover

    const startGame = () => {
        // Here we charge 1 Token via the custom event we created
        window.dispatchEvent(new CustomEvent('charge-vls-token', {
            detail: {
                cost: 1,
                onSuccess: () => setGameState('playing'),
                onFail: () => console.log('Sin saldo para jugar')
            }
        }));
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100000, background: '#020617', color: 'white' }}>
            {gameState === 'menu' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'radial-gradient(circle at center, #1e3a8a, #020617)' }}>
                    <Gamepad2 size={80} color="#38bdf8" style={{ marginBottom: '2rem', animation: 'pulse 2s infinite' }} />
                    <h1 style={{ fontSize: '4rem', margin: '0 0 1rem 0', textShadow: '0 10px 30px rgba(56,189,248,0.5)', textAlign: 'center' }}>SUPER SERENITO<br/>BROS. 3D</h1>
                    <p style={{ color: '#bae6fd', fontSize: '1.2rem', marginBottom: '3rem' }}>
                        Gravedad esférica. Laberintos procedimentales. Resuelve los puzles lumínicos con El Abuelo.
                    </p>
                    
                    <button 
                        onClick={startGame}
                        style={{ padding: '1.5rem 4rem', fontSize: '1.5rem', fontWeight: '900', background: '#38bdf8', color: '#0f172a', border: 'border', borderRadius: '50px', cursor: 'pointer', boxShadow: '0 10px 40px rgba(56,189,248,0.4)', display: 'flex', alignItems: 'center', gap: '15px' }}
                    >
                        <AlertCircle size={24} /> INSERTAR 1 FICHA Y JUGAR
                    </button>
                    
                    <button onClick={onClose} style={{ marginTop: '2rem', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '1.1rem' }}>
                        SALIR DEL GABINETE
                    </button>
                </div>
            )}

            {gameState === 'playing' && (
                <>
                    <button onClick={onClose} style={{ position: 'absolute', top: '2rem', right: '2rem', zIndex: 10, background: 'rgba(2,6,23,0.8)', border: '1px solid #ef4444', color: '#ef4444', padding: '10px', borderRadius: '50%', cursor: 'pointer' }}>
                        <X size={24} />
                    </button>
                    
                    <Canvas shadows camera={{ position: [0, 15, 20], fov: 50 }}>
                        <color attach="background" args={['#020617']} />
                        <Stars radius={100} depth={50} count={5000} factor={4} />
                        <ambientLight intensity={0.2} />
                        <directionalLight castShadow position={[50, 50, 20]} intensity={1} color="#fef08a" />
                        
                        <Suspense fallback={<Html center><h2 style={{color:'white'}}>Cargando Gravedad...</h2></Html>}>
                            <PlanetCore />
                            <PlayerAntigravity />
                            <OrbitControls enablePan={false} enableZoom={true} maxDistance={30} minDistance={12} />
                        </Suspense>
                    </Canvas>

                    <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', background: 'rgba(0,0,0,0.7)', padding: '1rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <h3 style={{ margin: '0 0 0.5rem 0', color: '#10b981' }}>🟢 CONSOLA ACTIVA</h3>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#cbd5e1' }}>Motor de alineamiento esférico funcionando.<br/>Controles de rotación en iteración.</p>
                    </div>
                </>
            )}
        </div>
    );
}
