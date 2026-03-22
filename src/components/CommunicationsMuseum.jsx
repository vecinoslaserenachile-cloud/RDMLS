import React, { useState, useRef, useEffect } from 'react';
import { X, Camera, History, Phone, Mail, Printer, Monitor, Smartphone, MessageSquare, Save, Download, RefreshCw, Zap, Disc, Type, Box } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage, Float, PerspectiveCamera, useGLTF, Environment } from '@react-three/drei';

const SERENITO_MODEL_URL = "https://tripo-data.rg1.data.tripo3d.com/tripo-studio/20260315/2bc84075-4b29-4f23-8c02-b177992bf8b1/tripo_rigging_2bc84075-4b29-4f23-8c02-b177992bf8b1_meshopt.glb?Key-Pair-Id=K1676C64NMVM2J&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly90cmlwby1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI2MDMxNS8yYmM4NDA3NS00YjI5LTRmMjMtOGMwMi1iMTc3OTkyYmY4YjEvdHJpcG9fcmlnZ2luZ18yYmM4NDA3NS00YjI5LTRmMjMtOGMwMi1iMTc3OTkyYmY4YjFfbWVzaG9wdC5nbGIiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3NzM2MTkyMDB9fX1dfQ__&Signature=WzX2ugtVoK265pfEmA9FzxQNcAcB1NgQoNPWk~oFwWmJnWKcO4pvFkjGIru6aGiHuUs0PctAS8j3ZtHsJg2wqaFApzKRl6LImsurZPbv3IDQDabrlTQl11gr7w~UVj45AxHwfu9wC0E-oeMDFATdvArAbbU6snjK41sqKcUxl-j7lH1lSk9EyE1DistSAEqqr-44yIMfTz6rzg6nmjeXCSHCGCQtgGSKqQZF13gVcedKPx9KhDFyO~4xQiHS-HzZFJ3ZteGPmy0jYMiIJ-tO4sNRECuiKK9T3ualGLEXMYU6EjA6i2qufLU6NZh7SIAumSwO0gS~8Yv7D9K4aLVpPQ__";

const ERAS = [
    {
        id: 'pioneer',
        year: '1844',
        title: 'La Era del Pulso (Telégrafo)',
        icon: Zap,
        color: '#f59e0b',
        items: [
            { name: 'Telégrafo Morse', desc: 'El primer gran salto. Pulsos eléctricos que cruzan continentes.', sound: '.. -.. -..' },
            { name: 'Manipulador de Bronce', desc: 'La herramienta del telegrafista. Cada clic era una letra.' }
        ]
    },
    {
        id: 'rotary',
        year: '1920',
        title: 'El Sonido del Disco (Telex & Teléfono)',
        icon: Disc,
        color: '#df2d2d',
        items: [
            { name: 'Telex', desc: 'La abuela del email. Mensajes de texto impresos por red telefónica.' },
            { name: 'Teléfono de Disco', desc: 'Paciencia en cada número. El ritual de girar el disco de baquelita.' }
        ]
    },
    {
        id: 'mechanical',
        year: '1960',
        title: 'Mecánica de Oficina (Máquinas & Copias)',
        icon: Type,
        color: '#3b82f6',
        items: [
            { name: 'Máquina de Escribir', desc: 'El golpeteo del acero sobre el papel. La Sinfonía de la oficina.', speed: '30 WPM' },
            { name: 'Fotocopiadora Térmica', desc: 'Papel azulado que olía a químicos. El inicio de la era de la copia.' }
        ]
    },
    {
        id: 'electronic',
        year: '1985',
        title: 'El Silbido del Fax (Fax & Numéricos)',
        icon: Printer,
        color: '#10b981',
        items: [
            { name: 'Fax', desc: 'Enviar un papel por la línea telefónica. Parecía magia negra en los 80.' },
            { name: 'Teléfono Público Monedero', desc: 'El refugio en la esquina. Monedas de 100 pesos y tarjetas Prepago.' },
            { name: 'Teléfono Numérico', desc: 'La rapidez del botón plástico. El fin del disco rotatorio.' }
        ]
    },
    {
        id: 'digital',
        year: '2005',
        title: 'Visión Plana (Escáner & PC)',
        icon: Monitor,
        color: '#a855f7',
        items: [
            { name: 'Escáner de Cama Plana', desc: 'Digitalizar fotos familiares con 300 DPI. Lento pero seguro.' },
            { name: 'PC de Escritorio', desc: 'El hub de la casa. Conexión Dial-up y ruidos de módem.' }
        ]
    }
];

const CHARACTERS = [
    { id: 'serenito', name: 'Serenito Real 3D', color: '#3b82f6', label: 'Patrimonio' },
    { id: 'bisabuelo', name: 'Serenito Bisabuelo', color: '#78350f', label: 'Historia' },
    { id: 'farino', name: 'Farino 3D', color: '#10b981', label: 'Sismicidad' },
    { id: 'compita', name: 'El Compita 3D', color: '#a855f7', label: 'Cultura' }
];

function SerenitoRealModel({ variant }) {
    const { scene } = useGLTF(SERENITO_MODEL_URL);
    const modelRef = useRef();

    useEffect(() => {
        if (scene) {
            scene.traverse((child) => {
                if (child.isMesh) {
                    if (variant === 'bisabuelo') {
                        // Apply a sepia/vintage filter to materials
                        child.material.color.setStyle('#a16207'); // Dark ochre/sepia
                    } else {
                        // Reset to original or default
                        child.material.color.set(1, 1, 1);
                    }
                }
            });
        }
    }, [scene, variant]);

    useFrame((state) => {
        if (modelRef.current) {
            modelRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
        }
    });

    return (
        <primitive 
            ref={modelRef}
            object={scene} 
            scale={1.5} 
            position={[0, -1.2, 0]} 
            rotation={[0, 0, 0]}
        />
    );
}

function InteractiveSerenito({ character }) {
    if (character.id === 'serenito' || character.id === 'bisabuelo') {
        return (
            <React.Suspense fallback={<mesh><sphereGeometry args={[0.5]} /><meshStandardMaterial color="#3b82f6" /></mesh>}>
                <SerenitoRealModel variant={character.id} />
                <Environment preset="city" />
            </React.Suspense>
        );
    }

    return (
        <Float speed={3} rotationIntensity={1} floatIntensity={1}>
            <group position={[0, -0.8, 0]}>
                <mesh position={[0, 0.5, 0]}>
                    <capsuleGeometry args={[0.35, 0.7, 8, 32]} />
                    <meshStandardMaterial color={character.color} roughness={0.2} metalness={0.5} />
                </mesh>
                <mesh position={[0, 1.2, 0]}>
                    <sphereGeometry args={[0.3, 32, 32]} />
                    <meshStandardMaterial color={character.color} roughness={0.1} metalness={0.6} />
                </mesh>
                <mesh position={[0, 1.25, 0.2]}>
                    <boxGeometry args={[0.4, 0.15, 0.1]} />
                    <meshBasicMaterial color="#00ffff" />
                </mesh>
                <pointLight position={[0, 1.5, 0.5]} distance={2} intensity={1} color="#00ffff" />
            </group>
        </Float>
    );
}

export default function CommunicationsMuseum({ onClose }) {
    const [activeEra, setActiveEra] = useState('electronic');
    const [showPhotoBooth, setShowPhotoBooth] = useState(false);
    const [selectedChar, setSelectedChar] = useState(CHARACTERS[0]);
    const [capturedImage, setCapturedImage] = useState(null);
    const [arLoading, setArLoading] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const eraData = ERAS.find(e => e.id === activeEra);

    useEffect(() => {
        if (showPhotoBooth) {
            startCamera();
            setArLoading(true);
            setTimeout(() => setArLoading(false), 2000);
        } else {
            stopCamera();
        }
    }, [showPhotoBooth]);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) videoRef.current.srcObject = stream;
        } catch (err) {
            console.error("Camera error:", err);
        }
    };

    const stopCamera = () => {
        if (videoRef.current?.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(t => t.stop());
        }
    };

    const takePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (video && canvas) {
            const context = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0);
            setCapturedImage(canvas.toDataURL('image/png'));
        }
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100010, background: 'rgba(5, 10, 20, 0.98)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(15px)' }}>
            <div className="museum-panel animate-scale-in" style={{ 
                width: '100%', maxWidth: '1200px', height: '90vh', background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', 
                borderRadius: '24px', overflow: 'hidden', display: 'flex', flexDirection: 'column',
                border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 50px 100px rgba(0,0,0,0.5)'
            }}>
                {/* Header */}
                <div style={{ padding: '2rem', background: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: 'linear-gradient(45deg, #f59e0b, #3b82f6)', padding: '1rem', borderRadius: '15px' }}>
                            <History size={32} color="white" />
                        </div>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: '900', color: 'white' }}>EL VIAJE DE LA COMUNICACIÓN</h2>
                            <p style={{ margin: 0, color: '#f59e0b', fontWeight: 'bold' }}>MUSEO HARDWARE & REALIDAD AUMENTADA VECINAL</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button onClick={() => setShowPhotoBooth(!showPhotoBooth)} className={`btn ${showPhotoBooth ? 'btn-primary' : 'btn-glass'}`} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 1.5rem', borderRadius: '12px' }}>
                            <Box size={20} /> {showPhotoBooth ? 'Ver Galería Histórica' : 'Activar Modo AR'}
                        </button>
                        <button onClick={onClose} className="btn-glass" style={{ padding: '0.8rem', borderRadius: '50%' }}>
                            <X size={24} color="white" />
                        </button>
                    </div>
                </div>

                <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>
                    
                    {!showPhotoBooth ? (
                        <>
                            {/* Navigation Slider */}
                            <div style={{ width: '300px', background: 'rgba(0,0,0,0.2)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                                {ERAS.map(era => (
                                    <button 
                                        key={era.id}
                                        onClick={() => setActiveEra(era.id)}
                                        style={{ 
                                            padding: '1rem', background: activeEra === era.id ? `${era.color}20` : 'transparent', 
                                            border: 'none', borderLeft: `6px solid ${activeEra === era.id ? era.color : 'transparent'}`,
                                            display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', textAlign: 'left',
                                            transition: 'all 0.3s', borderRadius: '0 12px 12px 0'
                                        }}
                                    >
                                        <era.icon color={activeEra === era.id ? era.color : '#475569'} size={24} />
                                        <div>
                                            <div style={{ fontSize: '0.65rem', color: era.color, fontWeight: '900' }}>{era.year}</div>
                                            <div style={{ fontSize: '0.85rem', color: activeEra === era.id ? 'white' : '#94a3b8', fontWeight: 'bold' }}>{era.title}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Museum Details */}
                            <div style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
                                <div className="animate-fade-in" key={activeEra}>
                                    <h2 style={{ fontSize: '3rem', color: 'white', fontWeight: '900', marginBottom: '2rem' }}>{eraData.title}</h2>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                                        {eraData.items.map((item, i) => (
                                            <div key={i} className="glass-panel" style={{ padding: '1.5rem', border: `1px solid ${eraData.color}20`, borderRadius: '16px', background: 'rgba(255,255,255,0.02)' }}>
                                                <h3 style={{ color: 'white', fontSize: '1.3rem', marginBottom: '0.5rem' }}>{item.name}</h3>
                                                <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.5' }}>{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        /* AR REALIDAD AUMENTADA VIEW */
                        <div style={{ flex: 1, position: 'relative', background: '#000' }}>
                            <video ref={videoRef} autoPlay playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
                            
                            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                                <Canvas shadows dpr={[1, 2]}>
                                    <PerspectiveCamera makeDefault position={[0, 0.5, 3]} />
                                    <ambientLight intensity={0.5} />
                                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                                    <pointLight position={[-10, -10, -10]} />
                                    
                                    <InteractiveSerenito character={selectedChar} />
                                    
                                    <OrbitControls enableZoom={false} enablePan={false} />
                                </Canvas>
                            </div>

                            {arLoading && (
                                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.8)', zIndex: 10 }}>
                                    <div className="pulse" style={{ width: '80px', height: '80px', border: '4px solid #3b82f6', borderRadius: '50%', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} />
                                    <p style={{ color: '#3b82f6', marginTop: '1.5rem', fontWeight: 'bold', letterSpacing: '2px' }}>INICIALIZANDO LENTES AR VLS...</p>
                                </div>
                            )}

                            {/* UI Overlays */}
                            <div style={{ position: 'absolute', bottom: '40px', left: '0', right: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', background: 'rgba(0,0,0,0.6)', padding: '1rem', borderRadius: '50px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    {CHARACTERS.map(char => (
                                        <button 
                                            key={char.id}
                                            onClick={() => setSelectedChar(char)}
                                            style={{ 
                                                width: '60px', height: '60px', borderRadius: '50%', background: selectedChar.id === char.id ? char.color : 'rgba(255,255,255,0.1)', 
                                                border: '2px solid white', cursor: 'pointer', color: 'white', fontWeight: 'bold', fontSize: '0.6rem', transition: 'all 0.3s'
                                            }}
                                        >
                                            {char.name.split(' ')[0]}
                                        </button>
                                    ))}
                                </div>
                                <button onClick={takePhoto} style={{ width: '90px', height: '90px', borderRadius: '50%', background: 'white', border: '8px solid rgba(59, 130, 246, 0.5)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Camera size={40} color="#1e293b" />
                                </button>
                            </div>

                            <div style={{ position: 'absolute', top: '20px', left: '20px', display: 'flex', gap: '1rem' }}>
                                <div style={{ background: 'rgba(0,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #00ffff', color: '#00ffff', fontSize: '0.7rem', fontWeight: 'bold' }}>
                                    SCANNING ENVIRONMENT... OK
                                </div>
                                <div style={{ background: 'rgba(255, 158, 11, 0.2)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #f59e0b', color: '#f59e0b', fontSize: '0.7rem', fontWeight: 'bold' }}>
                                    {selectedChar.label.toUpperCase()} MODE ACTIVE
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Status */}
                <div style={{ padding: '0.8rem 2rem', background: '#000', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem', color: '#475569' }}>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <span>SISTEMA DE PRESERVACIÓN TECNOLÓGICA VLS v1.5</span>
                        <span>DATOS: ARCHIVO HISTÓRICO MUNICIPAL</span>
                    </div>
                </div>
            </div>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
    );
}
