import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, PerspectiveCamera, Html, OrbitControls, Float, MeshDistortMaterial, Text, RoundedBox, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { X, Mic, Zap, Shield, Radar, Send, Mail, Play, Volume2, Sparkles, Navigation } from 'lucide-react';

// --- CONFIGURACIÓN DE VOZ (Placeholder para ElevenLabs) ---
const KITT_VOICE_ID = "pNInz6obpgDQGcFmaJgB"; // Voz analítica/profunda (Adam)

// --- COMPONENTES 3D ---

function Road() {
    // Animated road stripes moving towards camera
    const stripesRef = useRef();
    useFrame((state, delta) => {
        if (stripesRef.current) {
            stripesRef.current.position.z += delta * 18;
            if (stripesRef.current.position.z > 8) stripesRef.current.position.z = 0;
        }
    });

    return (
        <group>
            {/* Road surface */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, -20]}>
                <planeGeometry args={[14, 120]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
            </mesh>
            {/* Side curbs */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[7.5, -1.95, -20]}>
                <planeGeometry args={[1, 120]} />
                <meshStandardMaterial color="#e2e8f0" emissive="#e2e8f0" emissiveIntensity={0.2} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-7.5, -1.95, -20]}>
                <planeGeometry args={[1, 120]} />
                <meshStandardMaterial color="#e2e8f0" emissive="#e2e8f0" emissiveIntensity={0.2} />
            </mesh>
            {/* Animated center dashes */}
            <group ref={stripesRef} position={[0, -1.95, 0]}>
                {Array.from({ length: 16 }).map((_, i) => (
                    <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -i * 8]}>
                        <planeGeometry args={[0.3, 4]} />
                        <meshStandardMaterial color="#facc15" emissive="#facc15" emissiveIntensity={0.6} />
                    </mesh>
                ))}
            </group>
            {/* Red scanner line overlay on road */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.9, 2]}>
                <planeGeometry args={[14, 0.15]} />
                <meshBasicMaterial color="#ff0000" transparent opacity={0.8} />
            </mesh>
        </group>
    );
}

function CityScenery() {
    const buildingsRef = useRef();
    useFrame((state, delta) => {
        if (buildingsRef.current) {
            buildingsRef.current.position.z += delta * 20;
            if (buildingsRef.current.position.z > 50) buildingsRef.current.position.z = 0;
        }
    });
 
     return (
         <group ref={buildingsRef}>
             {Array.from({ length: 40 }).map((_, i) => (
                 <mesh key={i} position={[
                     (i % 2 === 0 ? 12 : -12) + (Math.random() - 0.5) * 5, 
                     5, 
                     -i * 10
                 ]}>
                     <boxGeometry args={[4, 10 + Math.random() * 20, 4]} />
                     <meshStandardMaterial color="#0a0a20" emissive="#38bdf8" emissiveIntensity={0.1} />
                     {/* Ventanas */}
                     <mesh position={[0, 0, 2.01]}>
                         <planeGeometry args={[3.8, 10]} />
                         <meshStandardMaterial emissive="#eab308" emissiveIntensity={0.2} transparent opacity={0.3} />
                     </mesh>
                 </mesh>
             ))}
         </group>
     );
 }
 
 function OilSlick({ active }) {
     const ref = useRef();
     useFrame((state, delta) => {
         if (ref.current) {
             ref.current.position.z += delta * 15;
             if (ref.current.position.z > 10) ref.current.position.z = -2;
         }
     });
     if (!active) return null;
     return (
         <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, -2]}>
             <circleGeometry args={[2, 32]} />
             <meshStandardMaterial color="#111" roughness={0} metalness={1} transparent opacity={0.8} />
         </mesh>
     );
 }
 
 function SmokeScreen({ active }) {
     const ref = useRef();
     const [smokeParticles] = useState(() => Array.from({ length: 20 }, () => ({
         pos: [(Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, -1],
         scale: 0.5 + Math.random() * 2
     })));
 
     useFrame((state, delta) => {
         if (ref.current) {
             ref.current.position.z += delta * 10;
             if (ref.current.position.z > 20) ref.current.position.z = 0;
         }
     });
 
     if (!active) return null;
     return (
         <group ref={ref}>
             {smokeParticles.map((p, i) => (
                 <mesh key={i} position={p.pos}>
                     <sphereGeometry args={[p.scale, 8, 8]} />
                     <meshStandardMaterial color="#555" transparent opacity={0.4} />
                 </mesh>
             ))}
         </group>
     );
 }

function KittCockpit({ turboActive, scannerActive, voiceLevel }) {
    return (
        <group position={[0, -0.5, 3]}>
            {/* Volante tipo avión */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh position={[0, -0.8, 1]} rotation={[0.4, 0, 0]}>
                    <torusGeometry args={[1.2, 0.1, 16, 100, Math.PI]} />
                    <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
                </mesh>
                <mesh position={[0, -0.8, 1]} rotation={[0.4, 0, 0]}>
                    <boxGeometry args={[2.5, 0.2, 0.1]} />
                    <meshStandardMaterial color="#111" metalness={0.9} />
                </mesh>
            </Float>

            {/* Dashboard Principal */}
            <mesh position={[0, -0.5, 0]}>
                <boxGeometry args={[8, 2, 2]} />
                <meshStandardMaterial color="#050505" metalness={1} roughness={0} />
            </mesh>

            {/* Pantalla Central KITT (Voz) */}
            <mesh position={[0, -0.2, 1.01]}>
                <planeGeometry args={[1.5, 0.8]} />
                <meshBasicMaterial color="#000" />
                <group position={[0, 0, 0.01]}>
                    {Array.from({ length: 3 }).map((_, i) => (
                        <mesh key={i} position={[0, (i - 1) * 0.15, 0]}>
                            <planeGeometry args={[1.2, 0.08]} />
                            <meshBasicMaterial color="#ff0000" transparent opacity={0.3 + (voiceLevel * 0.7)} />
                        </mesh>
                    ))}
                    {/* Barra de progreso de voz */}
                    <mesh position={[0, 0, 0.02]} scale={[voiceLevel, 1, 1]}>
                        <planeGeometry args={[1.2, 0.08]} />
                        <meshBasicMaterial color="#ff4d4d" />
                    </mesh>
                </group>
            </mesh>

            {/* Velocímetro Digital */}
            <Html position={[-1.5, -0.1, 1.05]} transform occlude>
                <div style={{ color: '#ff0000', fontFamily: 'monospace', textAlign: 'center', width: '100px', textShadow: '0 0 10px #ff0000' }}>
                    <div style={{ fontSize: '10px' }}>SPEED</div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{Math.floor(88 + Math.random() * 5)}</div>
                    <div style={{ fontSize: '8px' }}>MPH</div>
                </div>
            </Html>

            {/* Pantalla CRT Derecha */}
            <mesh position={[1.8, -0.1, 1.01]}>
                <planeGeometry args={[1.2, 0.8]} />
                <meshBasicMaterial color={scannerActive ? "#003366" : "#0a0a0a"} />
                <Html position={[0, 0, 0.01]} center transform>
                    <div style={{ width: '80px', height: '60px', overflow: 'hidden', pointerEvents: 'none' }}>
                         <Radar size={40} color={scannerActive ? "#38bdf8" : "#333"} className={scannerActive ? "animate-spin" : ""} style={{ margin: '0 auto' }} />
                         <div style={{ fontSize: '6px', color: '#38bdf8', textAlign: 'center', marginTop: '5px' }}>SCANNING...</div>
                    </div>
                </Html>
            </mesh>

            {/* Luces de la cabina */}
            <pointLight position={[0, 0.5, 0.5]} intensity={turboActive ? 5 : 0.5} color="#ff0000" />
        </group>
    );
}

export default function OperacionLaSerena({ onClose }) {
    const [status, setStatus] = useState('initializing');
    const [voiceLevel, setVoiceLevel] = useState(0);
    const [turboActive, setTurboActive] = useState(false);
    const [scannerActive, setScannerActive] = useState(false);
    const [microJamActive, setMicroJamActive] = useState(false);
    const [oilSlickActive, setOilSlickActive] = useState(false);
    const [smokeActive, setSmokeActive] = useState(false);
    const [bgMusicPlaying, setBgMusicPlaying] = useState(true);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(120);
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [kittResponse, setKittResponse] = useState('Bienvenido, Michael. Esperando instrucciones.');
    const [showMailing, setShowMailing] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const recognitionRef = useRef(null);
    const audioRef = useRef(null);
    const musicRef = useRef(null);

    // GTA Style Stations
    const radioStations = [
        { name: "KITT CLASSIC", id: "_tDL7dPRCwo", label: "80s Knight Rider", genre: "Synthwave" },
        { name: "VLS 90.1", id: "5qap5aO4i9A", label: "La Serena Beats", genre: "Lofi" },
        { name: "RADIO LA RECOVA", id: "jfKfPfyJRdk", label: "Tropical Mix", genre: "Pachanga" },
        { name: "FARO FM", id: "dQw4w9WgXcQ", label: "Pop Hits", genre: "Pop" },
        { name: "COQUIMBO WAVE", id: "0WzG64rnKps", label: "Ocean Chords", genre: "Chill" }
    ];
    const [currentStation, setCurrentStation] = useState(0);
    const [showRadioOverlay, setShowRadioOverlay] = useState(false);

    // Audio context for voice bars
    useEffect(() => {
        const interval = setInterval(() => {
            if (isListening) setVoiceLevel(Math.random());
            else setVoiceLevel(prev => Math.max(0, prev - 0.1));
        }, 100);
        return () => clearInterval(interval);
    }, [isListening]);

    // Timer logic
    useEffect(() => {
        if (status === 'playing' && timeLeft > 0) {
            const t = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearInterval(t);
        } else if (timeLeft === 0 && status === 'playing') {
            setStatus('finished');
            handleMissionEnd();
        }
    }, [status, timeLeft]);

    const speakWithElevenLabs = async (text) => {
        setKittResponse(text);
        const apiKey = localStorage.getItem('vls_elevenlabs_key');
        
        if (!apiKey) {
            // Fallback to browser speech
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'es-ES';
            utterance.rate = 1.0;
            utterance.pitch = 0.9;
            window.speechSynthesis.speak(utterance);
            return;
        }

        try {
            const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${KITT_VOICE_ID}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'xi-api-key': apiKey },
                body: JSON.stringify({
                    text: text,
                    model_id: "eleven_multilingual_v2",
                    voice_settings: { stability: 0.5, similarity_boost: 0.75 }
                })
            });
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            if (audioRef.current) {
                audioRef.current.src = url;
                audioRef.current.play();
            }
        } catch (error) {
            console.error("ElevenLabs Error:", error);
        }
    };

    const startMission = () => {
        setStatus('playing');
        speakWithElevenLabs("Iniciando Operación La Serena. Ruta establecida hacia El Faro Monumental. Todos los sistemas en línea, Michael.");
    };

    const handleSTT = () => {
        try {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition) {
                return alert("Navegador no soporta reconocimiento de voz. Use Chrome o Edge.");
            }
            
            const recognition = new SpeechRecognition();
            recognition.lang = 'es-CL';
            recognition.continuous = false;
            recognition.onstart = () => setIsListening(true);
            recognition.onresult = (e) => {
                const text = e.results[0][0].transcript.toLowerCase();
                setTranscript(text);
                processCommand(text);
            };
            recognition.onerror = (err) => {
                console.warn("Speech Recognition Error:", err);
                setIsListening(false);
            };
            recognition.onend = () => setIsListening(false);
            recognition.start();
        } catch (e) {
            console.error("VLS KITT Error:", e);
            alert("Error al iniciar reconocimiento de voz. Verifique permisos de micrófono.");
        }
    };

    const nextStation = () => {
        const next = (currentStation + 1) % radioStations.length;
        setCurrentStation(next);
        setShowRadioOverlay(true);
        speakWithElevenLabs(`Sintonizando ${radioStations[next].name}.`);
        setTimeout(() => setShowRadioOverlay(false), 3000);
    };

    const processCommand = (cmd) => {
        if (cmd.includes('turbo') || cmd.includes('acelera')) {
            activateTurbo();
        } else if (cmd.includes('scanner') || cmd.includes('rastreador') || cmd.includes('escanea')) {
            activateScanner();
        } else if (cmd.includes('jam') || cmd.includes('interferencia') || cmd.includes('detén')) {
            activateMicroJam();
        } else if (cmd.includes('radio') || cmd.includes('música') || cmd.includes('estación')) {
            nextStation();
        } else if (cmd.includes('aceite') || cmd.includes('oil')) {
            activateOilSlick();
        } else if (cmd.includes('humo') || cmd.includes('cortina') || cmd.includes('smoke')) {
            activateSmoke();
        } else if (cmd.includes('ruta') || cmd.includes('dónde')) {
            speakWithElevenLabs("Estamos a 2.4 kilómetros del Faro. Sugiero mantener la velocidad en Avenida del Mar.");
        } else if (cmd.includes('quién eres')) {
            speakWithElevenLabs("Soy KITT, la unidad de inteligencia artificial más avanzada de la Fundación para la Ley y el Orden. Y por si lo olvida, Michael, usted es el conductor.");
        } else {
            speakWithElevenLabs("Entendido, Michael. Ejecutando análisis de entorno.");
        }
    };
 
     const activateOilSlick = () => {
         setOilSlickActive(true);
         speakWithElevenLabs("Desplegando mancha de aceite. Los perseguidores perderán tracción.");
         setTimeout(() => setOilSlickActive(false), 3000);
         setScore(prev => prev + 400);
     };
 
     const activateSmoke = () => {
         setSmokeActive(true);
         speakWithElevenLabs("Activando cortina de humo. Visibilidad nula para el enemigo.");
         setTimeout(() => setSmokeActive(false), 5000);
         setScore(prev => prev + 350);
     };

    const activateTurbo = () => {
        if (turboActive) return;
        setTurboActive(true);
        speakWithElevenLabs("Activando Turbo Boost. Sujétese, Michael.");
        setTimeout(() => setTurboActive(false), 3000);
        setScore(prev => prev + 500);
    };

    const activateScanner = () => {
        setScannerActive(true);
        speakWithElevenLabs("Escaneando el perímetro. Detecto baches en Calle Prat y alta congestión en La Recova.");
        setTimeout(() => setScannerActive(false), 5000);
        setScore(prev => prev + 200);
    };

    const activateMicroJam = () => {
        setMicroJamActive(true);
        speakWithElevenLabs("Generando micro-jam. Tráfico neutralizado temporalmente.");
        setTimeout(() => setMicroJamActive(false), 2000);
        setScore(prev => prev + 300);
    };

    const handleMissionEnd = () => {
        speakWithElevenLabs("Misión finalizada. Hemos recolectado datos valiosos para la Fundación. Generando reporte de desempeño.");
        setShowMailing(true);
    };

    const sendReport = () => {
        setEmailSent(true);
        setTimeout(() => {
            onClose();
        }, 2000);
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 5000, background: '#000', color: 'white', overflow: 'hidden', fontFamily: "'Outfit', sans-serif" }}>
            
            {/* Audio Refs */}
            <audio ref={audioRef} style={{ display: 'none' }} />
            
            {/* Background Music Iframe (GTA Style Hidden) */}
            <div style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                <iframe
                    ref={musicRef}
                    src={`https://www.youtube.com/embed/${radioStations[currentStation].id}?autoplay=${status === 'playing' ? 1 : 0}&loop=1&playlist=${radioStations[currentStation].id}&enablejsapi=1`}
                    allow="autoplay"
                />
            </div>

            {/* Radio Station Overlay (GTA Style) */}
            {showRadioOverlay && (
                <div style={{ 
                    position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)',
                    background: 'rgba(0,0,0,0.85)', padding: '2rem 4rem', borderRadius: '20px',
                    border: '2px solid #ff0000', zIndex: 100, textAlign: 'center',
                    animation: 'scaleIn 0.3s ease-out', boxShadow: '0 0 50px rgba(255,0,0,0.4)'
                }}>
                    <div style={{ fontSize: '0.8rem', color: '#ff4d4d', fontWeight: 'bold', letterSpacing: '3px', marginBottom: '1rem' }}>SINTONIZANDO</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '900', color: 'white' }}>{radioStations[currentStation].name}</div>
                    <div style={{ fontSize: '1rem', color: '#ff4d4d', marginTop: '0.5rem' }}>{radioStations[currentStation].genre} • {radioStations[currentStation].label}</div>
                    
                    <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', marginTop: '1.5rem' }}>
                        {radioStations.map((_, i) => (
                            <div key={i} style={{ width: '40px', height: '4px', background: i === currentStation ? '#ff0000' : 'rgba(255,255,255,0.2)' }}></div>
                        ))}
                    </div>
                </div>
            )}

            {/* 3D Scene */}
            <div style={{ position: 'absolute', inset: 0 }}>
                <Canvas shadows camera={{ position: [0, 1, 8], fov: 60 }} onError={(e) => console.error("Canvas Error:", e)}>
                    <color attach="background" args={['#020205']} />
                    <fog attach="fog" args={['#020205', 10, 50]} />
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                    
                    <ambientLight intensity={0.4} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    
                    <Suspense fallback={<Html center><div style={{color: 'red'}}>Cargando Sistemas de KITT...</div></Html>}>
                        <Road />
                        <CityScenery />
                        <KittCockpit turboActive={turboActive} scannerActive={scannerActive} voiceLevel={voiceLevel} />
                        <OilSlick active={oilSlickActive} />
                        <SmokeScreen active={smokeActive} />
                        {turboActive && (
                             <Float speed={10} rotationIntensity={2} floatIntensity={5}>
                                <mesh position={[0,0,-5]}>
                                    <sphereGeometry args={[10, 32, 32]} />
                                    <MeshDistortMaterial color="#ff0000" speed={10} distort={1} radius={1} transparent opacity={0.2} />
                                </mesh>
                             </Float>
                        )}
                    </Suspense>
                </Canvas>
            </div>

            {/* Hidden Background Music Iframe - Synced with Radio */}
            {bgMusicPlaying && (
                <div style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                    <iframe 
                        width="100" 
                        height="100" 
                        src={`https://www.youtube.com/embed/${radioStations[currentStation].id}?autoplay=1&mute=0&loop=1&playlist=${radioStations[currentStation].id}&enablejsapi=1`} 
                        frameBorder="0" 
                        allow="autoplay">
                    </iframe>
                </div>
            )}

            {/* UI Overlay */}
            <div style={{ position: 'relative', zIndex: 10, height: '100%', pointerEvents: 'none', display: 'flex', flexDirection: 'column' }}>
                
                {/* Header Stats */}
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2rem', pointerEvents: 'auto' }}>
                    <div className="glass-panel" style={{ border: '2px solid #ff0000', padding: '1rem', background: 'rgba(0,0,0,0.8)', borderRadius: '12px' }}>
                        <div style={{ fontSize: '0.7rem', color: '#ff4d4d', fontWeight: '900', letterSpacing: '2px' }}>OPERACIÓN LA SERENA</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>SC: {score.toLocaleString()}</div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div className="glass-panel" style={{ border: '2px solid #38bdf8', padding: '1rem', background: 'rgba(0,0,0,0.8)', borderRadius: '12px' }}>
                            <div style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: '900' }}>TIEMPO</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</div>
                        </div>
                        <button onClick={onClose} style={{ pointerEvents: 'auto', background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '2px solid #ef4444', height: '60px', width: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <X size={32} />
                        </button>
                    </div>
                </div>

                {/* Central Feedback (KITT Text) */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', paddingBottom: '12%' }}>
                    <div className="glass-panel scale-in" style={{ 
                        background: 'rgba(0,0,0,0.95)', 
                        border: '2px solid #ff0000', 
                        padding: '1.5rem', 
                        maxWidth: '700px', 
                        borderRadius: '16px', 
                        textAlign: 'center',
                        boxShadow: '0 0 40px rgba(255,0,0,0.3)',
                        pointerEvents: 'auto'
                    }}>
                        <div style={{ color: '#ff4d4d', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <Volume2 size={16} /> COMUNICACIÓN_ACTIVA
                        </div>
                        <p style={{ fontSize: '1.3rem', margin: 0, color: 'white', lineHeight: '1.4', fontWeight: 'bold' }}>
                           "{kittResponse}"
                        </p>
                    </div>
                </div>

                {/* Global Controls */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', paddingBottom: '3rem', pointerEvents: 'auto' }}>
                    
                    {status === 'initializing' && (
                        <button 
                            onClick={startMission}
                            className="btn pulse" 
                            style={{ background: '#ff0000', color: 'white', padding: '1.5rem 4rem', borderRadius: '16px', fontSize: '1.5rem', fontWeight: '900', border: 'none', cursor: 'pointer', boxShadow: '0 0 50px rgba(255,0,0,0.5)' }}
                        >
                            INICIAR MISIÓN
                        </button>
                    )}

                    {status === 'playing' && (
                        <>
                            <div style={{ position: 'relative' }}>
                                <button 
                                    onMouseDown={handleSTT}
                                    style={{ background: isListening ? '#38bdf8' : 'rgba(255,255,255,0.1)', color: 'white', height: '90px', width: '90px', borderRadius: '50%', border: isListening ? '6px solid #fff' : '2px solid rgba(255,255,255,0.4)', transition: '0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: isListening ? '0 0 30px #38bdf8' : 'none' }}
                                >
                                    <Mic size={45} className={isListening ? 'pulse' : ''} />
                                </button>
                                <div style={{ position: 'absolute', bottom: '-20px', width: '100%', textAlign: 'center', fontSize: '0.6rem', color: isListening ? '#38bdf8' : '#666', fontWeight: '900' }}>{isListening ? 'ESCUCHANDO' : 'HABLAR'}</div>
                            </div>

                             <div style={{ display: 'flex', gap: '1rem', pointerEvents: 'auto' }}>
                                 <button onClick={activateTurbo} style={{ background: 'rgba(249, 115, 22, 0.2)', color: '#f97316', border: '2px solid #f97316', padding: '1rem', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', width: '80px', transition: '0.2s' }} className="hover-scale">
                                     <Zap size={24} /> <span style={{fontSize: '0.7rem', fontWeight: 'bold'}}>TURBO</span>
                                 </button>
                                 <button onClick={activateOilSlick} style={{ background: 'rgba(0,0,0,0.8)', color: '#fff', border: '2px solid #555', padding: '1rem', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', width: '80px' }} className="hover-scale">
                                     <div style={{ width: '20px', height: '20px', background: '#333', borderRadius: '50%' }}></div> <span style={{fontSize: '0.7rem', fontWeight: 'bold'}}>OIL</span>
                                 </button>
                                 <button onClick={activateSmoke} style={{ background: 'rgba(100,100,100,0.2)', color: '#999', border: '2px solid #999', padding: '1rem', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', width: '80px' }} className="hover-scale">
                                     <Radar size={24} style={{ opacity: 0.5 }} /> <span style={{fontSize: '0.7rem', fontWeight: 'bold'}}>SMOKE</span>
                                 </button>
                                 <button onClick={activateScanner} style={{ background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', border: '2px solid #38bdf8', padding: '1rem', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', width: '80px' }} className="hover-scale">
                                     <Radar size={24} /> <span style={{fontSize: '0.7rem', fontWeight: 'bold'}}>SCAN</span>
                                 </button>
                                 <button onClick={nextStation} style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#fff', border: '3px solid #ff0000', padding: '1rem', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', minWidth: '120px', boxShadow: '0 0 15px rgba(255,0,0,0.3)' }} className="hover-scale pulse">
                                     <Volume2 size={24} /> <span style={{fontSize: '0.6rem', fontWeight: '900'}}>{radioStations[currentStation].name}</span>
                                 </button>
                             </div>
                        </>
                    )}
                </div>
            </div>

            {/* Result / Mailing Modal */}
            {showMailing && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 6000, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                    <div className="glass-panel animate-scale-in" style={{ maxWidth: '500px', width: '100%', padding: '3rem', border: '2px solid #ff0000', borderRadius: '24px', textAlign: 'center' }}>
                         <img src="/logo-smartls-v3.png" alt="VLS" style={{ height: '60px', marginBottom: '2rem' }} />
                         <h2 style={{ fontSize: '2rem', color: '#ff0000', marginBottom: '1rem' }}>REPORTE DE MISIÓN</h2>
                         <p style={{ color: '#cbd5e1', marginBottom: '2rem' }}>FUNDACIÓN PARA LA LEY Y EL ORDEN - DIVISIÓN LA SERENA</p>
                         
                         <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px', textAlign: 'left', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}><span>PUNTUACIÓN:</span> <strong>{score} pts</strong></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}><span>TIEMPO FINAL:</span> <strong>{120 - timeLeft}s</strong></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>ESTADO:</span> <strong style={{color: '#10b981'}}>ÉXITO</strong></div>
                         </div>

                         {!emailSent ? (
                             <button 
                                onClick={sendReport}
                                className="btn pulse" 
                                style={{ width: '100%', background: '#ff0000', color: 'white', padding: '1.2rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', fontWeight: 'bold', fontSize: '1.1rem' }}
                             >
                                <Mail size={24} /> ENVIAR REPORTE A LA FUNDACIÓN
                             </button>
                         ) : (
                             <div className="text-success" style={{ padding: '1.2rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', borderRadius: '12px', fontWeight: 'bold' }}>
                                 ✓ REPORTE ENVIADO CON ÉXITO
                             </div>
                         )}
                         <button onClick={onClose} style={{ marginTop: '2rem', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>Cerrar simulación</button>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes pulse {
                    0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,0,0,0.7); }
                    70% { transform: scale(1.05); box-shadow: 0 0 0 20px rgba(255,0,0,0); }
                    100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,0,0,0); }
                }
                .pulse { animation: pulse 2s infinite; }
                .animate-scale-in { animation: scaleIn 0.5s ease-out; }
                @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
                .hover-scale { transition: 0.3s; pointer-events: auto !important; }
                .hover-scale:hover { transform: scale(1.1); filter: brightness(1.2); }
            `}</style>
        </div>
    );
}
