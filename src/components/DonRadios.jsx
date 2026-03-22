import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
    useGLTF, Environment, ContactShadows, PerspectiveCamera, 
    Html, useAnimations, Float, Text 
} from '@react-three/drei';
import { 
    Radio, Mic, Headphones, DollarSign, Glasses, 
    Zap, AlertCircle, Volume2, X, Music 
} from 'lucide-react';

/**
 * 3D MODEL COMPONENT: Don Radios (The Master of the Dial)
 * Refleja los atributos: Calva Espejo, Lentes Aviador, Micrófono y Chaqueta con parches.
 */
function DonRadiosModel({ isDisrupting }) {
    const group = useRef();
    // Reutilizamos el modelo base humanizado pero con modificaciones visuales vía props/shaders
    const { scene, animations } = useGLTF('/serenito_draco.glb');
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        const anim = isDisrupting ? 'Victory' : 'Standing_Idle'; // Usando animaciones conocidas del GLTF
        if (actions[anim]) {
            actions[anim].reset().fadeIn(0.5).play();
        }
        return () => { if (actions[anim]) actions[anim].fadeOut(0.5); };
    }, [isDisrupting, actions]);

    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    return (
        <group ref={group} position={[0, -1, 0]}>
            <primitive object={scene} scale={[1.8, 1.8, 1.8]} />
            
            {/* Calva Espejo (Brillo especular alto) */}
            <mesh position={[0, 2.3, 0]} rotation={[-0.2, 0, 0]}>
                <sphereGeometry args={[0.3, 32, 32]} />
                <meshStandardMaterial color="#fce7c1" roughness={0.05} metalness={0.9} />
            </mesh>
            
            {/* Lentes de Aviador */}
            <mesh position={[0, 2.15, 0.4]}>
                <boxGeometry args={[0.5, 0.15, 0.05]} />
                <meshStandardMaterial color="black" transparent opacity={0.9} roughness={0.1} />
            </mesh>

            {/* Micrófono de Brazo */}
            <group position={[0.7, 1.2, 1]}>
                <mesh rotation={[0, 0, Math.PI / 4]}>
                    <cylinderGeometry args={[0.02, 0.02, 1]} />
                    <meshStandardMaterial color="#334155" />
                </mesh>
                <mesh position={[0.35, 0.35, 0]}>
                    <sphereGeometry args={[0.1, 16, 16]} />
                    <meshStandardMaterial color="#1e293b" />
                </mesh>
            </group>

            {/* Cadena de Oro */}
            <mesh position={[0, 1.45, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.18, 0.015, 16, 48]} />
                <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.1} />
            </mesh>

            <pointLight position={[2, 2, 2]} intensity={isDisrupting ? 5 : 2} color={isDisrupting ? "#ff0000" : "#ffffff"} />
        </group>
    );
}

export default function DonRadios({ onComplete }) {
    const [isVisible, setIsVisible] = useState(false);
    const [phase, setPhase] = useState('static'); // static, intro, rap, exit

    useEffect(() => {
        // Bajar volumen de la radio cuando Don Radios irrumpe
        window.dispatchEvent(new CustomEvent('radio-duck'));
        const timer = setTimeout(() => setIsVisible(true), 500);
        return () => {
            clearTimeout(timer);
            // Restaurar volumen al desmontar
            window.dispatchEvent(new CustomEvent('radio-unduck'));
        };
    }, []);

    const playRap = () => {
        setPhase('rap');
        const synth = window.speechSynthesis;
        synth.cancel(); // Limpiar cualquier audio previo en cola
        const text = "¡Paren todo! ¡Llegó Don Radios! ¡Yo soy el jefe de este micrófono! ¡Nadie transmite sin mi permiso! ¡El que no pone publicidad, no tiene espacio en mi frecuencia! ¡Don Radios manda en el dial!";
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = 'es-US';
        utter.rate = 0.95; 
        utter.pitch = 0.80; 
        utter.onend = () => {
            setPhase('exit');
            setTimeout(() => {
                setIsVisible(false);
                window.dispatchEvent(new CustomEvent('radio-unduck'));
                if (onComplete) onComplete();
            }, 1000);
        };
        synth.speak(utter);
    };

    if (!isVisible) return null;

    return (
        <div style={{ 
            position: 'fixed', inset: 0, zIndex: 999999, 
            background: phase === 'static' ? 'transparent' : 'rgba(0,0,0,0.9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden'
        }}>
            {/* Efecto de Estática de Inicio */}
            {phase === 'static' && (
                <div 
                    onClick={playRap}
                    style={{ 
                        width: '100%', height: '100%', 
                        background: 'url("https://media.giphy.com/media/o8igknyuKs6aY/giphy.gif")',
                        opacity: 0.4, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }} 
                >
                    <div style={{ background: 'red', color: 'white', padding: '20px', fontWeight: '900', fontSize: '2rem', border: '5px solid white' }}>
                        ¡INTERRUPCIÓN DEL DIAL! (CLICK AQUÍ)
                    </div>
                </div>
            )}

            {phase !== 'static' && (
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                    
                    <Canvas shadows>
                        <PerspectiveCamera makeDefault position={[0, 1.5, 4]} fov={45} />
                        <ambientLight intensity={0.5} />
                        <Suspense fallback={null}>
                            <DonRadiosModel isDisrupting={phase === 'rap'} />
                            <Environment preset="night" />
                        </Suspense>
                    </Canvas>

                    <div style={{ position: 'absolute', top: '10%', right: '10%', width: '350px' }}>
                        <div className="glass-panel" style={{ 
                            padding: '2.5rem', borderRadius: '32px', 
                            background: 'rgba(212, 175, 55, 0.2)', 
                            border: '3px solid #d4af37', 
                            boxShadow: '0 0 60px rgba(212, 175, 55, 0.4)',
                            animation: 'pulse 2s infinite'
                        }}>
                            <div style={{ background: '#ff0000', color: 'white', padding: '5px 15px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: '900', display: 'inline-block', marginBottom: '10px' }}>
                                EN VIVO
                            </div>
                            <h2 style={{ color: 'white', margin: 0, fontSize: '2rem', fontWeight: '900' }}>DON RADIOS</h2>
                            <p style={{ color: '#d4af37', fontSize: '1rem', fontWeight: 'bold' }}>"EL AMO DEL DIAL"</p>
                            <div style={{ fontSize: '1.2rem', lineHeight: '1.4', color: 'white', marginTop: '1.5rem', fontStyle: 'italic', fontWeight: 'bold' }}>
                                "¡Esto que les digo vale más que un terreno en la Avenida del Mar!"
                            </div>
                        </div>
                    </div>

                    {phase === 'rap' && (
                        <div style={{ position: 'absolute', bottom: '10%', padding: '20px', width: '100%', textAlign: 'center', background: 'rgba(0,0,0,0.8)' }}>
                            <div style={{ color: '#d4af37', fontSize: '2.5rem', fontWeight: '900', textShadow: '0 0 10px gold' }}>
                                ¡EL QUE NO AUSPICIA, NO SUENA!
                            </div>
                            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '10px' }}>
                                <span style={{ color: 'white' }}>LOTEO EL PANTANO</span>
                                <span style={{ color: 'white' }}>ARRIENDOS EL CLAVO</span>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <style>{`
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.02); }
                    100% { transform: scale(1); }
                }
            `}</style>
        </div>
    );
}
