import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, Environment, Stars, Html, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { 
    Zap, Timer, Trophy, Play, Pause, SkipForward, 
    CheckCircle2, Crown, Activity, Flame, ShieldCheck,
    Dumbbell, Heart, HeartPulse, UserCircle,
    Maximize, Volume2, VolumeX
} from 'lucide-react';

/**
 * 🏋️‍♂️ GIMNASIO VIRTUAL 3D VLS 2026
 * Rutinas de ejercicio con Serenito & Amigos.
 */
function CoachModel({ modelPath, animationName, isPlaying }) {
    const group = useRef();
    const { scene, animations } = useGLTF(modelPath);
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        if (!actions) return;
        
        // Buscamos una animación que encaje (Idle o de ejercicio)
        const action = actions[animationName] || Object.values(actions)[0];
        
        if (action) {
            if (isPlaying) {
                action.reset().fadeIn(0.5).play();
            } else {
                action.fadeOut(0.5);
            }
        }
        
        return () => action?.fadeOut(0.5);
    }, [actions, animationName, isPlaying]);

    return (
        <group ref={group} dispose={null}>
            <primitive object={scene} scale={2.2} position={[0, -1, 0]} castShadow />
        </group>
    );
}

const Gimnasio3D = ({ onClose }) => {
    const [level, setLevel] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [timer, setTimer] = useState(0);
    const [racha, setRacha] = useState(localStorage.getItem('gym_racha') || 3);
    const [completed, setCompleted] = useState(false);
    const [coach, setCoach] = useState('serenito'); 
    const [showActivityVideo, setShowActivityVideo] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef(null);

    const rutinas = [
        { id: 1, name: 'Pausa Ocular', duration: 120, coach: 'serenito', animation: 'Idle', type: 'Sentado', focus: 'Convergencia Visual', desc: 'Previene fatiga de pantallas.' },
        { id: 2, name: 'Ergonomía Articular', duration: 180, coach: 'serenito_abuelo', animation: 'Stretch', type: 'De Pie', focus: 'Prevención Articular', desc: 'Estiramiento suave de cuello y hombros.' },
        { id: 3, name: 'Estiramiento Lumbar', duration: 300, coach: 'serenito', animation: 'Flex', type: 'Acostado', focus: 'Relajación Espinal', desc: 'Descarga la presión de la columna baja.' },
        { id: 4, name: 'Movilidad de Cadera', duration: 240, coach: 'serenito_abuelo', animation: 'Squat', type: 'En el Suelo', focus: 'Flexibilidad', desc: 'Abre la cadera y mejora la postura.' },
        { id: 5, name: 'Activación Biomecánica', duration: 240, coach: 'serenito', animation: 'Jump', type: 'De Pie', focus: 'Flujo Sanguíneo', desc: 'Reactiva el sistema circulatorio general.' }
    ];

    const currentRoutine = rutinas.find(r => r.id === level) || rutinas[0];

    useEffect(() => {
        let interval;
        if (isPlaying && timer < currentRoutine.duration) {
            interval = setInterval(() => setTimer(prev => prev + 1), 1000);
            if (audioRef.current && !isMuted) audioRef.current.play().catch(() => {});
        } else if (timer >= currentRoutine.duration && isPlaying) {
            setIsPlaying(false);
            setCompleted(true);
            if (audioRef.current) audioRef.current.pause();
        } else {
            if (audioRef.current) audioRef.current.pause();
        }
        return () => clearInterval(interval);
    }, [isPlaying, timer, currentRoutine, isMuted]);

    const handleFinish = () => {
        const newRacha = parseInt(racha) + 1;
        setRacha(newRacha);
        localStorage.setItem('gym_racha', newRacha);
        setCompleted(false);
        setTimer(0);
        if (level < 5) setLevel(prev => prev + 1);
        else alert("🎖️ ¡MAESTRO DEL FARO! Has completado todas las rutinas de hoy.");
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200000, background: '#020617', color: 'white', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Background Synthesized Music */}
            <audio 
                ref={audioRef}
                src="/music/himno_vls_remix.mp3" 
                loop
            />

            {/* 3D Canvas Layer */}
            <div style={{ position: 'absolute', inset: 0, opacity: showActivityVideo ? 0.3 : 1, transition: 'opacity 0.5s' }}>
                <Canvas shadows camera={{ position: [0, 2, 8], fov: 45 }}>
                    <color attach="background" args={['#020617']} />
                    <fog attach="fog" args={['#020617', 5, 20]} />
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                    <Environment preset="night" />
                    
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
                    <pointLight position={[-10, -10, -10]} color="#38bdf8" intensity={1} />

                    <Suspense fallback={<Html center><div style={{ color: '#38bdf8', fontWeight: 'bold' }}>Sincronizando Entrenadores...</div></Html>}>
                        < CoachModel 
                            modelPath={currentRoutine.coach === 'serenito' ? '/serenito_draco.glb' : currentRoutine.coach === 'kevin' ? '/kevin_costanera.glb' : currentRoutine.coach === 'serenito_abuelo' ? '/serenito_abuelo.glb' : '/serenito_draco.glb'} 
                            animationName={currentRoutine.animation}
                            isPlaying={isPlaying}
                        />
                        <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.3} far={10} color="#000" />
                        
                        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
                            <planeGeometry args={[100, 100]} />
                            <meshStandardMaterial color="#020617" roughness={0.8} />
                        </mesh>
                        <gridHelper args={[50, 50, '#38bdf8', '#1e293b']} position={[0,-0.99,0]} />
                    </Suspense>
                </Canvas>
            </div>

            {/* Removed Video Bypass entirely as requested */}

            {/* UI Overlay */}
            <header style={{ position: 'relative', zIndex: 10, padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(2,6,23,0.8)', padding: '1.5rem', borderRadius: '24px', border: '1px solid #38bdf840', backdropFilter: 'blur(10px)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ padding: '10px', background: '#38bdf820', borderRadius: '12px', border: '1px solid #38bdf8' }}>
                            <Dumbbell color="#38bdf8" size={32} />
                        </div>
                        <div>
                            <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '900', color: 'white', letterSpacing: '1px' }}>GIMNASIO BIOMECÁNICO VLS</h1>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                <HeartPulse size={14} /> PAUSAS ACTIVAS · SALUD INTEGRAL
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <button 
                        onClick={() => setIsMuted(!isMuted)}
                        style={{ background: 'rgba(2,6,23,0.8)', border: '1px solid #38bdf840', color: 'white', width: '45px', height: '45px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                    <button onClick={onClose} style={{ background: '#ef4444', border: 'none', color: 'white', width: '45px', height: '45px', borderRadius: '50%', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
                </div>
            </header>

            <div style={{ position: 'absolute', bottom: '3rem', left: '2rem', right: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 10 }}>
                {/* Control Panel */}
                <div style={{ background: 'rgba(2,6,23,0.8)', padding: '1.5rem', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', width: '380px' }}>
                    <div style={{ marginBottom: '1rem', color: '#38bdf8', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px' }}>RUTINA ACTUAL</div>
                    <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '1.6rem' }}>{currentRoutine.name}</h2>
                    
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                        <span style={{ background: '#10b98120', border: '1px solid #10b981', color: '#10b981', padding: '4px 10px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 'bold' }}>
                            POSICIÓN: {currentRoutine.type.toUpperCase()}
                        </span>
                        <span style={{ background: '#f59e0b20', border: '1px solid #f59e0b', color: '#f59e0b', padding: '4px 10px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 'bold' }}>
                            FOCO: {currentRoutine.focus.toUpperCase()}
                        </span>
                    </div>
                    <p style={{ margin: '0 0 2rem 0', color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.4' }}>
                        {currentRoutine.desc}
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <button 
                            onClick={() => setIsPlaying(!isPlaying)}
                            style={{ flex: 1, padding: '1rem', borderRadius: '16px', background: isPlaying ? '#ef4444' : '#38bdf8', color: '#020617', border: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer' }}
                        >
                            {isPlaying ? <><Pause fill="#020617" size={20} /> PAUSAR</> : <><Play fill="#020617" size={20} /> INICIAR</>}
                        </button>
                        <div style={{ width: '100px', textAlign: 'center' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: '900', fontFamily: 'monospace' }}>{formatTime(timer)}</div>
                            <div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>CRONÓMETRO</div>
                        </div>
                    </div>
                </div>

                {/* Progress Medals */}
                <div style={{ display: 'flex', gap: '10px' }}>
                    <div className="medal-slot">
                        <Trophy color={level >= 1 ? '#cd7f32' : 'rgba(255,255,255,0.1)'} size={32} />
                        <span style={{fontSize: '0.6rem'}}>BRONCE</span>
                    </div>
                    <div className="medal-slot">
                        <Trophy color={level >= 2 ? '#c0c0c0' : 'rgba(255,255,255,0.1)'} size={32} />
                        <span style={{fontSize: '0.6rem'}}>PLATA</span>
                    </div>
                    <div className="medal-slot">
                        <Crown color={level >= 3 ? '#ffd700' : 'rgba(255,255,255,0.1)'} size={32} />
                        <span style={{fontSize: '0.6rem'}}>ORO VLS</span>
                    </div>
                </div>
            </div>

            {/* Finish Modal */}
            {completed && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 300000, background: 'rgba(2,6,23,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="glass-panel" style={{ padding: '3rem', borderRadius: '40px', textAlign: 'center', border: '1px solid #38bdf8', maxWidth: '500px' }}>
                        <Trophy size={80} color="#38bdf8" style={{ marginBottom: '2rem' }} />
                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>¡RUTINA COMPLETADA!</h2>
                        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
                            Has finalizado la sesión de <strong>{currentRoutine.name}</strong>. Tu racha se ha actualizado a {parseInt(racha)+1} días.
                        </p>
                        <button onClick={handleFinish} style={{ width: '100%', padding: '1.2rem', borderRadius: '16px', background: '#38bdf8', color: '#020617', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>
                            RECLAMAR RECOMPENSA VLS
                        </button>
                    </div>
                </div>
            )}

            <style>{`
                .medal-slot {
                    background: rgba(255,255,255,0.05);
                    padding: 1.5rem;
                    border-radius: 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    border: 1px solid rgba(255,255,255,0.1);
                }
                .glass-panel {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
            `}</style>
        </div>
    );
};

export default Gimnasio3D;
