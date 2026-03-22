import React, { useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Html, OrbitControls, useGLTF, useAnimations } from '@react-three/drei';
import { X, Clock, MapPin, Search, Music, Volume2, VolumeX, Eye, Gamepad2, Tv, Film, Info } from 'lucide-react';
import HistoricWalk3D from './HistoricWalk3D';
import RetroArcadeLobby from './RetroArcadeLobby';
import OldTVModal from './OldTVModal';
import VhsTVModal from './VhsTVModal';
import RetroCubo3D from './RetroCubo3D';
import MemoryPortalModal from './MemoryPortalModal';

function SerenitoGuide() {
    const groupRef = React.useRef();
    const { scene, animations } = useGLTF('/serenito_draco.glb', 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
    const { actions } = useAnimations(animations, groupRef);

    useEffect(() => {
        if (!actions) return;
        const idleAnims = ['Idle', 'Standing_Idle', 'Stay'];
        let active = null;
        for (const name of idleAnims) {
            if (actions[name]) {
                actions[name].reset().fadeIn(0.5).play();
                active = name;
                break;
            }
        }
        if (!active && Object.keys(actions).length > 0) {
            actions[Object.keys(actions)[0]].reset().fadeIn(0.5).play();
        }
    }, [actions]);

    return (
        <group ref={groupRef} position={[-8, -5, 10]} rotation={[0, Math.PI / 4, 0]}>
            <primitive object={scene} scale={3} />
            <Html position={[0, 4, 0]} center>
                <div style={{ background: 'rgba(56,189,248,0.9)', padding: '6px 14px', borderRadius: '20px', color: '#000', fontWeight: '900', fontSize: '0.85rem', whiteSpace: 'nowrap', border: '2px solid white', boxShadow: '0 0 15px rgba(56,189,248,0.6)' }}>
                    ¡Sube a bordo viajero! ⏱️
                </div>
            </Html>
        </group>
    );
}

function TimeTunnel() {
    const groupRef = React.useRef();
    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.rotation.z = clock.getElapsedTime() * 0.06;
        }
    });

    return (
        <group ref={groupRef}>
            {Array.from({ length: 80 }).map((_, i) => (
                <Ring key={i} ringIndex={i} />
            ))}
            {/* Inner glowing tube core */}
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -60]}>
                <cylinderGeometry args={[1.2, 1.2, 240, 16, 1, true]} />
                <meshBasicMaterial color="#00ffff" transparent opacity={0.06} side={2} />
            </mesh>
            {/* Warp streaks */}
            <WarpStreaks />
        </group>
    );
}

function WarpStreaks() {
    const streaksRef = React.useRef([]);
    const NUM = 30;
    const data = useMemo(() => Array.from({ length: NUM }, (_, i) => ({
        angle: (i / NUM) * Math.PI * 2,
        r: 2.5 + Math.random() * 2,
        speed: 15 + Math.random() * 25,
        z0: -Math.random() * 120,
        color: `hsl(${(i * 137) % 360}, 100%, 70%)`
    })), []);

    useFrame((_, delta) => {
        streaksRef.current.forEach((mesh, i) => {
            if (!mesh) return;
            mesh.position.z += data[i].speed * delta;
            if (mesh.position.z > 8) mesh.position.z = -120;
        });
    });

    return (
        <>
            {data.map((d, i) => (
                <mesh
                    key={i}
                    ref={el => streaksRef.current[i] = el}
                    position={[
                        Math.cos(d.angle) * d.r,
                        Math.sin(d.angle) * d.r,
                        d.z0
                    ]}
                    rotation={[Math.PI / 2, 0, d.angle]}
                >
                    <cylinderGeometry args={[0.025, 0.025, 4 + Math.random() * 6, 4]} />
                    <meshBasicMaterial color={d.color} transparent opacity={0.7} />
                </mesh>
            ))}
        </>
    );
}

function Ring({ ringIndex }) {
    const meshRef = React.useRef();
    const innerRef = React.useRef();
    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if (meshRef.current) {
            const speed = 5;
            const totalDepth = 80 * 4.5;
            const offset = (t * speed + ringIndex * 4.5) % totalDepth;
            meshRef.current.position.z = -ringIndex * 4.5 + (offset % 4.5);
            meshRef.current.rotation.z = ringIndex * 0.2 + t * 0.15;
        }
        if (innerRef.current) {
            innerRef.current.rotation.z = -(ringIndex * 0.2 + t * 0.1);
        }
    });
    const hue = (ringIndex * 8) % 360;
    const size = 4.0 + Math.sin(ringIndex * 0.6) * 0.8;
    const innerSize = 1.8 + Math.cos(ringIndex * 0.4) * 0.4;
    return (
        <group position={[0, 0, -ringIndex * 4.5]}>
            {/* Outer ring */}
            <mesh ref={meshRef}>
                <ringGeometry args={[size, size + 0.6, 64]} />
                <meshBasicMaterial
                    color={`hsl(${hue}, 95%, 65%)`}
                    transparent
                    opacity={0.18 + (ringIndex % 4) * 0.06}
                    side={2}
                />
            </mesh>
            {/* Inner accent ring */}
            <mesh ref={innerRef}>
                <ringGeometry args={[innerSize, innerSize + 0.15, 32]} />
                <meshBasicMaterial
                    color={`hsl(${(hue + 180) % 360}, 100%, 80%)`}
                    transparent
                    opacity={0.3}
                    side={2}
                />
            </mesh>
        </group>
    );
}

function FloatingIcon({ position, color, text, year, onClick, active }) {
    const meshRef = React.useRef();
    useFrame(({ clock }) => {
        if (meshRef.current) {
            meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 2) * 0.2;
            meshRef.current.rotation.y += 0.01;
            meshRef.current.rotation.x = Math.sin(clock.getElapsedTime()) * 0.1;
        }
    });

    return (
        <group position={position} onClick={(e) => { e.stopPropagation(); onClick(); }}>
            <mesh ref={meshRef}>
                <octahedronGeometry args={[1.5, 0]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={active ? 1 : 0.4} wireframe={!active} />
            </mesh>
            <Html position={[0, -2.5, 0]} center>
                <div 
                    className="hover-scale"
                    style={{ 
                        background: active ? color : 'rgba(0,0,0,0.85)', 
                        padding: '12px 20px', 
                        borderRadius: '40px', 
                        color: active ? '#000' : 'white', 
                        fontWeight: '900', 
                        fontSize: '16px', 
                        whiteSpace: 'nowrap', 
                        border: `3px solid ${color}`, 
                        cursor: 'pointer', 
                        transition: 'all 0.3s', 
                        boxShadow: active ? `0 0 30px ${color}` : '0 10px 20px rgba(0,0,0,0.5)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px'
                    }}
                >
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', opacity: 0.8 }}>{year > 0 ? year : `${Math.abs(year)} AC`}</span>
                    {text}
                </div>
            </Html>
        </group>
    );
}

export default function TimeBus3D({ onClose, onOpenIquique }) {
    const [selectedEra, setSelectedEra] = useState(null);
    const [enteredEra, setEnteredEra] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [highContrast, setHighContrast] = useState(false);

    useEffect(() => {
        return () => {
            if (window.speechSynthesis) window.speechSynthesis.cancel();
        };
    }, []);

    const eras = [
        { id: 'pre', name: 'La Serena Diaguita', year: -1500, color: '#f59e0b', pos: [-15, 0, 0], img: '/comic-patrimonio.jpg', desc: 'Resumen Real: Antes de la llegada europea, el valle del Río Elqui era hogar de la cultura Diaguita. Maestros alfareros portadores de una estética geométrica única.', scenario: 'prehistoric', video: '/videos/historia_diaguita.mp4' },
        { id: 'fund_stgo', name: 'Fundación de Santiago', year: 1541, color: '#94a3b8', pos: [-15, 0, -10], desc: 'Resumen Real: Pedro de Valdivia funda Santiago del Nuevo Extremo a los pies del cerro Huelén. El inicio de la capital de Chile.', scenario: 'colonial_stgo', isChronological: true },
        { id: 'fund_ls', name: 'Fundación de La Serena', year: 1544, color: '#ef4444', pos: [-15, 0, -20], img: '/comic-playa.jpg', desc: 'Resumen Real: Fundada por Juan Bohón para asegurar la ruta al Perú. Segunda ciudad más antigua de Chile.', scenario: 'historic_ls', isChronological: true },
        { id: 'fund_coq', name: 'Fundación de Coquimbo', year: 1867, color: '#3b82f6', pos: [-15, 0, -30], desc: 'Resumen Real: Se establece la Municipalidad de Coquimbo, puerto estratégico y motor económico regional.', scenario: 'port_coq', isChronological: true },
        { id: 'guerra_pacifico', name: 'Guerra del Pacífico', year: 1879, color: '#ef4444', pos: [-15, 0, -40], img: '/prat_epic_jump_v2.png', desc: 'Resumen Real: Hitos: Combate de Iquique, captura del Huáscar y Toma del Morro de Arica. Sangre valiente regional.', scenario: 'war_pacific', isChronological: true },
        { id: 'teniente_bello', name: 'Misterio Teniente Bello', year: 1914, color: '#3b82f6', pos: [12, 5, -50], img: '/nostalgia/teniente_bello.png', desc: 'Resumen Real: Alejandro Bello Silva desaparece en su biplano biplano Sánchez-Besa en 1914.', scenario: 'bello_mystery' },
        { id: 'fund_arica', name: 'Arica Chilena', year: 1929, color: '#f59e0b', pos: [-15, 0, -60], desc: 'Resumen Real: Tratado de Lima, Arica queda definitivamente bajo soberanía chilena.', scenario: 'arica_1929', isChronological: true },
        { id: 'plan', name: 'Plan Serena', year: 1948, color: '#10b981', pos: [8, 0, -70], img: '/comic-cielo.jpg', desc: 'Resumen Real: Transformación neocolonial bajo González Videla.', scenario: 'plan_serena' },
        { id: 'mus_autos', name: 'Garaje Nostalgia', year: 1970, color: '#ff4d4d', pos: [20, 0, -80], img: '/nostalgia/autos/citroneta_nostalgia.png', desc: 'Resumen Real: Citronetas y Fitos que recorrieron la Avenida del Mar.', scenario: 'garage' },
        { id: 'mus_aviones', name: 'Hangar Aeronáutico', year: 1980, color: '#38bdf8', pos: [20, 5, -90], img: '/nostalgia/avion_halcones_1.jpg', desc: 'Resumen Real: Escuadrilla Halcones y vuelos históricos en La Florida.', scenario: 'hangar' },
        { id: 'discos90', name: 'Discos de los 90', year: 1995, color: '#a855f7', pos: [-10, 5, -100], img: '/nostalgia/cassette_ls.jpg', desc: 'Resumen Real: Galaxy, Be Cool, Sundance. La magia de la noche.', scenario: 'disco' },
        { id: 'tv80s', name: 'Señal Radio VLS TV', year: 1985, color: '#eab308', pos: [0, 5, -110], img: '/comic-retro.jpg', desc: 'Resumen Real: Cultura VHS y música New Wave.', scenario: 'tv_80s' },
        { id: 'smart2026', name: 'VECINO SMART', year: 2026, color: '#00ffcc', pos: [0, 0, -130], img: '/vls-logo-3d.png', desc: 'Resumen Real: Estado del arte en gestión ciudadana inteligente.', scenario: 'smart_city' },
        { id: 'caracol', name: 'Caracol Colonial', year: 1982, color: '#facc15', pos: [15, 0, -115], desc: 'Resumen Real: Inaugurado en los 80, fue el primer centro comercial de este tipo en la ciudad, con su icónico ascensor panorámico hacia Balmaceda.', scenario: 'caracol_game' }
    ];

    const activeEraData = selectedEra ? eras.find(e => e.id === selectedEra) : null;

    const handleShareEra = () => {
        if (!activeEraData) return;
        const shareUrl = `${window.location.origin}${window.location.pathname}?era=${activeEraData.id}`;
        window.dispatchEvent(new CustomEvent('open-smart-share', { detail: { url: shareUrl } }));
    };

    const toggleSpeech = () => {
        if (!window.speechSynthesis) return alert("Tu navegador no soporta lectura por voz.");

        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        } else if (activeEraData) {
            const textToRead = `${activeEraData.name}. ${activeEraData.desc}`;
            const utterance = new SpeechSynthesisUtterance(textToRead);
            utterance.lang = 'es-CL';
            utterance.rate = 1.0;
            window.speechSynthesis.speak(utterance);
            setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
        }
    };

    if (enteredEra && selectedEra !== 'smart2026') {
        const active = eras.find(e => e.id === selectedEra);
        if (selectedEra === 'arcade') return <RetroArcadeLobby onClose={() => setEnteredEra(false)} />;
        if (selectedEra === 'tv80s') return <OldTVModal onClose={() => setEnteredEra(false)} />;
        if (selectedEra === 'vhs90s') return <VhsTVModal onClose={() => setEnteredEra(false)} />;
        if (selectedEra === 'cubo90s') return (
            <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.95)' }}>
                <RetroCubo3D />
                <button onClick={() => setEnteredEra(false)} className="btn-danger" style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '0.5rem 1rem', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><X size={16} /> Volver</button>
            </div>
        );
        if (selectedEra === 'memoria') return <MemoryPortalModal onClose={() => setEnteredEra(false)} />;
        if (selectedEra === 'mus_autos') return <VehicleMuseum onClose={() => setEnteredEra(false)} />;
        if (selectedEra === 'mus_aviones') return <AirMuseum onClose={() => setEnteredEra(false)} />;
        if (selectedEra === 'discos90') return <Disco90Virtual onClose={() => setEnteredEra(false)} />;
        if (selectedEra === 'caracol') return (
            <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#000' }}>
                <RetroCaracolElevator />
                <button 
                    onClick={() => setEnteredEra(false)} 
                    className="btn-danger" 
                    style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '0.5rem 1rem', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    <X size={16} /> Volver al Túnel
                </button>
            </div>
        );
        
        // Dynamic Scenario Portal
        return <EpochViewer era={active} onClose={() => setEnteredEra(false)} />;
    }

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 3000, background: highContrast ? '#000' : '#050510' }}>
            {/* UI Overlay */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '1rem', zIndex: 3010, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="glass-panel" style={{ padding: '1rem', border: highContrast ? '2px solid #fff' : '1px solid rgba(192, 132, 252, 0.4)', background: 'rgba(0,0,0,0.7)' }}>
                    <h2 style={{ color: '#c084fc', margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock size={20} /> Bus del Tiempo 3D La Serena
                    </h2>
                    <p style={{ color: '#cbd5e1', margin: '0.2rem 0 0 0', fontSize: '0.8rem' }}>Navega por las eras históricas. Uso de Zoom/Giro permitido.</p>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <button onClick={() => setHighContrast(!highContrast)} className="btn-glass" style={{ padding: '0.5rem', borderRadius: '50%' }} title="Alto Contraste">
                        <Eye size={20} color="white" />
                    </button>
                    <button onClick={onClose} className="btn-danger" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem', borderRadius: '99px' }}>
                        <X size={20} /> <span style={{ fontWeight: 'bold' }}>Salir</span>
                    </button>
                </div>
            </div>

            {selectedEra && (
                <div className="glass-panel scale-in" style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 3020, padding: '1.5rem', width: '90%', maxWidth: '700px', textAlign: 'center', border: `3px solid ${activeEraData.color}`, background: 'rgba(5, 10, 20, 0.9)', backdropFilter: 'blur(15px)', borderRadius: '24px' }}>
                    {activeEraData.img && (
                        <img src={activeEraData.img} alt={activeEraData.name} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1rem' }} />
                    )}
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h2 style={{ fontSize: '1.8rem', margin: 0, color: 'white' }}>{activeEraData.name}</h2>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button onClick={handleShareEra} style={{ background: '#8b5cf6', border: 'none', padding: '0.8rem', borderRadius: '12px', cursor: 'pointer' }} title="Compartir este Hito">
                                <Share2 size={24} color="white" />
                            </button>
                            <button onClick={toggleSpeech} style={{ background: isSpeaking ? '#ef4444' : 'rgba(255,255,255,0.1)', border: 'none', padding: '0.8rem', borderRadius: '12px', cursor: 'pointer' }}>
                                {isSpeaking ? <VolumeX size={24} color="white" /> : <Volume2 size={24} color="white" />}
                            </button>
                        </div>
                    </div>

                    <p style={{ color: '#cbd5e1', marginBottom: '1.5rem', fontSize: '1rem', lineHeight: '1.6', textAlign: 'left' }}>{activeEraData.desc}</p>

                    <button
                        className="btn pulse"
                        style={{ background: activeEraData.color, color: 'white', border: 'none', padding: '1rem 2rem', borderRadius: '12px', fontWeight: 'bold', width: '100%', marginBottom: '0.5rem', fontSize: '1.1rem' }}
                        onClick={() => { if (isSpeaking) window.speechSynthesis.cancel(); setEnteredEra(true); }}
                    >
                        EXPLORAR ÉPOCA 3D
                    </button>
                    <button className="btn btn-glass" style={{ width: '100%' }} onClick={() => { if (isSpeaking) window.speechSynthesis.cancel(); setSelectedEra(null); }}>Volver al Túnel</button>
                </div>
            )}

            <Canvas camera={{ fov: 70, position: [0, 2, 30] }}>
                <OrbitControls target={[0, 0, -60]} enableZoom={true} enablePan={true} maxDistance={250} minDistance={5} />
                <Stars radius={200} count={6000} factor={7} fade speed={2} />
                <ambientLight intensity={0.6} />
                <pointLight position={[20, 20, 20]} intensity={1.5} />

                {/* ✨ TUNNEL RINGS — La firma visual del Bus del Tiempo */}
                <TimeTunnel />

                {/* Eje central del túnel (riel de luz) */}
                <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -100]}>
                    <cylinderGeometry args={[0.08, 0.08, 280, 8]} />
                    <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.2} transparent opacity={0.5} />
                </mesh>

                {eras.map(era => (
                    <FloatingIcon
                        key={era.id}
                        position={era.pos}
                        color={era.color}
                        text={era.name}
                        year={era.year}
                        active={selectedEra === era.id}
                        onClick={() => { setSelectedEra(era.id); if (isSpeaking) window.speechSynthesis.cancel(); }}
                    />
                ))}

                <SerenitoGuide />
            </Canvas>

            {/* Overlay decorativo del túnel en bordes */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 3005,
                pointerEvents: 'none',
                background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5, 5, 20, 0.75) 100%)'
            }} />
            <div style={{
                position: 'absolute', bottom: '50%', left: '50%',
                transform: 'translate(-50%, 50%)',
                zIndex: 3006, pointerEvents: 'none',
                color: 'rgba(192,132,252,0.25)',
                fontSize: '0.6rem', fontWeight: '900',
                letterSpacing: '6px', textTransform: 'uppercase',
                whiteSpace: 'nowrap'
            }}>⟵ NAVEGA CON ZOOM Y CLICK EN LOS CRISTALES ⟶</div>
        </div>
    );
}

function EpochViewer({ era, onClose }) {
    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#000', color: 'white' }}>
            {/* Immersive Header */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '2rem', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)' }}>
                <div>
                    <h1 style={{ color: era.color, margin: 0, fontSize: '2.5rem', textTransform: 'uppercase', letterSpacing: '2px' }}>{era.name}</h1>
                    <p style={{ margin: 0, opacity: 0.8 }}>Escenario Interactivo - {era.year}</p>
                </div>
                <button onClick={onClose} className="btn-danger" style={{ padding: '1rem 2rem', borderRadius: '30px' }}><X /> Volver al Túnel</button>
            </div>

            {/* Scenario Content */}
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {era.video ? (
                    era.video.includes('youtube.com') || era.video.includes('youtu.be') ? (
                        <iframe 
                            width="100%" 
                            height="100%" 
                            src={`${era.video.replace('watch?v=', 'embed/')}${era.video.includes('?') ? '&' : '?'}autoplay=1&mute=1&loop=1&playlist=${era.video.split('v=')[1] || era.video.split('/').pop()}`}
                            title={era.name}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ border: 'none' }}
                        ></iframe>
                    ) : (
                        <video autoPlay loop muted style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                            <source src={era.video} type="video/mp4" />
                        </video>
                    )
                ) : (
                    <div style={{ textAlign: 'center', width: '100%', height: '100%', position: 'relative' }}>
                        {/* Here we integrate HistoricWalk3D as the "Diorema Real 3D" for chronological eras */}
                        {(era.scenario === 'historic_ls' || era.isChronological) ? (
                            <HistoricWalk3D era={era} onClose={onClose} />
                        ) : (
                            <div style={{ 
                                width: '100%', height: '100%', display: 'flex', flexDirection: 'column', 
                                alignItems: 'center', justifyContent: 'center', padding: '5rem',
                                backgroundImage: era.img ? `url(${era.img})` : 'none',
                                backgroundSize: 'cover', backgroundPosition: 'center',
                                position: 'relative'
                            }}>
                                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)' }}></div>
                                <div className="glass-panel" style={{ zIndex: 10, padding: '3rem', borderRadius: '40px', maxWidth: '800px', border: `2px solid ${era.color}`, background: 'rgba(0,0,0,0.85)' }}>
                                    <h2 style={{ color: era.color }}>Inmersión Histórica: {era.name}</h2>
                                    <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
                                        Estás presenciando la era de <strong>{era.year > 0 ? era.year : Math.abs(era.year) + ' AC'}</strong>. {era.desc}
                                    </p>
                                    <div style={{ marginTop: '2rem', height: '300px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: `1px solid ${era.color}` }}>
                                        {era.img ? (
                                            <img src={era.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Historical Scene" />
                                        ) : (
                                            <Clock size={80} className="pulse" color={era.color} style={{ opacity: 0.3 }} />
                                        )}
                                    </div>
                                    <button onClick={onClose} style={{ marginTop: '2rem', padding: '1rem 2rem', background: era.color, border: 'none', color: 'white', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer', width: '100%', fontSize: '1.1rem' }}>RESTAURAR LÍNEA TEMPORAL</button>
                                    
                                    {era.id === 'guerra_pacifico' && (
                                        <button 
                                            onClick={() => { if(onOpenIquique) onOpenIquique(); }}
                                            style={{ marginTop: '1rem', padding: '1.2rem 2rem', background: '#ef4444', border: '2px solid white', color: 'white', borderRadius: '30px', fontWeight: '900', cursor: 'pointer', width: '100%', fontSize: '1.2rem', boxShadow: '0 0 20px #ef444450' }}
                                            className="pulse"
                                        >
                                            🚀 ABRIR ILUSTRACIÓN ARTURO PRAT 3D
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Sidebar Info - Real Data */}
            <div className="glass-panel animate-fade-in" style={{ position: 'absolute', right: '2rem', bottom: '2rem', width: '350px', padding: '1.5rem', borderRadius: '20px', border: `1px solid ${era.color}40`, backdropFilter: 'blur(10px)' }}>
                <h3 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: era.color }}>
                    <Info size={20} /> Información Histórica Real
                </h3>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>{era.desc}</p>
                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '0.8rem', opacity: 0.6 }}>
                    Fuente: Archivo Histórico Municipal La Serena
                </div>
            </div>
        </div>
    );
}

import { Share2, Car, Plane, Music as MusicIcon, Disc, Play, Pause, SkipForward, ChevronRight, Building2 } from 'lucide-react';
import RetroCaracolElevator from './RetroCaracolElevator';

function VehicleMuseum({ onClose }) {
    const vehicles = [
        { name: 'Citroneta 2CV', img: '/nostalgia/autos/citroneta_nostalgia.png', year: '1970s', desc: 'El ícono de la juventud chilena' },
        { name: 'Fiat 600 Fito', img: '/nostalgia/autos/fito_nostalgia.png', year: '1980s', desc: 'El pequeño gigante de la carretera' },
        { name: 'Toyota Cressida', img: '/nostalgia/autos/citroneta_nostalgia.png', year: '1982', desc: 'Lujo y elegancia japonesa' },
        { name: 'Mazda 929', img: '/nostalgia/autos/fito_nostalgia.png', year: '1989', desc: 'El preferido de los paseos familiares' }
    ];
    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#050505', padding: '2rem', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ color: '#ff4d4d', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Car size={32} /> Garaje de la Nostalgia</h2>
                <button onClick={onClose} className="btn-danger"><X /> Volver</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {vehicles.map(v => (
                    <div key={v.name} className="glass-panel" style={{ padding: '0', overflow: 'hidden', border: '1px solid rgba(255,100,100,0.3)' }}>
                        <img src={v.img} style={{ width: '100%', height: '200px', objectFit: 'cover' }} alt={v.name} />
                        <div style={{ padding: '1.5rem' }}>
                            <h3 style={{ margin: 0, color: 'white' }}>{v.name} ({v.year})</h3>
                            <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>{v.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function AirMuseum({ onClose }) {
    const planes = [
        { name: 'Escuadrilla Halcones', img: '/nostalgia/avion_halcones_1.jpg', desc: 'Orgullo Nacional en los cielos de La Serena' },
        { name: 'Vuelo Comercial 1985', img: '/nostalgia/avion_halcones_2.jpg', desc: 'Conectando la región con el mundo' },
        { name: 'Halcones Formación', img: '/nostalgia/avion_halcones_3.jpg', desc: 'Precisión y valor sobre El Faro' }
    ];
    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#020617', padding: '2rem', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ color: '#38bdf8', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Plane size={32} /> Hangar Aeronáutico</h2>
                <button onClick={onClose} className="btn-danger"><X /> Volver</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                {planes.map(p => (
                    <div key={p.name} className="glass-panel" style={{ padding: '0', overflow: 'hidden', border: '1px solid rgba(56,189,248,0.3)' }}>
                        <img src={p.img} style={{ width: '100%', height: '240px', objectFit: 'cover' }} alt={p.name} />
                        <div style={{ padding: '1.5rem' }}>
                            <h3 style={{ margin: 0, color: 'white' }}>{p.name}</h3>
                            <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>{p.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Disco90Virtual({ onClose }) {
    const [playing, setPlaying] = useState(false);
    const bars = Array.from({ length: 40 });
    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.3, background: 'linear-gradient(45deg, #a855f7 0%, transparent 50%, #ec4899 100%)' }}></div>
            
            <button onClick={onClose} className="btn-danger" style={{ position: 'absolute', top: '2rem', right: '2rem' }}><X /> Salir de la Disco</button>
            
            <div style={{ textAlign: 'center', zIndex: 10 }}>
                <h1 style={{ color: '#a855f7', fontSize: '3rem', textTransform: 'uppercase', textShadow: '0 0 20px #a855f7' }}>Galaxy Discotheque</h1>
                <p style={{ color: '#94a3b8', fontSize: '1.2rem' }}>DJ Virtual Set - La Serena Night Experience</p>
                
                <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '4px', margin: '3rem 0', justifyContent: 'center' }}>
                    {bars.map((_, i) => (
                        <div key={i} style={{ 
                            width: '8px', 
                            height: playing ? `${20 + Math.random() * 80}%` : '10%', 
                            background: `hsl(${280 + i * 2}, 70%, 50%)`,
                            borderRadius: '4px',
                            transition: 'height 0.1s ease-in-out',
                            boxShadow: `0 0 10px hsl(${280 + i * 2}, 70%, 50%)`
                        }}></div>
                    ))}
                </div>

                <div className="glass-panel" style={{ padding: '2rem', borderRadius: '50px', display: 'inline-flex', gap: '2rem', alignItems: 'center' }}>
                    <button onClick={() => setPlaying(!playing)} style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#a855f7', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 0 20px #a855f7' }}>
                        {playing ? <Pause size={40} /> : <Play size={40} />}
                    </button>
                    <div style={{ textAlign: 'left' }}>
                        <h4 style={{ margin: 0, color: 'white' }}>Vals Mis Recuerdos</h4>
                        <p style={{ margin: 0, color: '#94a3b8' }}>Remix Nostalgia 90s</p>
                    </div>
                </div>
            </div>
            
            <div style={{ position: 'absolute', bottom: '2rem', width: '100%', display: 'flex', justifyContent: 'space-around', opacity: 0.5 }}>
                <span style={{ color: 'white' }}>Galaxy</span>
                <span style={{ color: 'white' }}>Be Cool</span>
                <span style={{ color: 'white' }}>Sundance</span>
                <span style={{ color: 'white' }}>La Cantera</span>
            </div>
        </div>
    );
}
