import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    MessageCircle, Users, TrendingUp, Award, 
    Camera, Image as ImageIcon, ThumbsUp, MapPin, 
    Share2, ShieldAlert, Navigation, Search, 
    Plus, Send, X as CloseIcon, Info, Heart, 
    Layers, Zap, Coffee, CheckCircle2, MoreHorizontal,
    Smile, AlertTriangle
} from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Float, Environment, ContactShadows } from '@react-three/drei';

/* --- 3D HUMANIZED SERENITO (Popcorn Host) --- */
function SerenitoPopcorn() {
    // Modelado humanizado: manos y proporciones estéticas.
    const { scene } = useGLTF('/serenito_draco.glb', 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
    return (
        <group scale={2.8} position={[0, -2, 0]}>
            <primitive object={scene} />
        </group>
    );
}

/* --- COMPONENTS --- */

const BubbleMap = ({ clusters, onSelect }) => {
    return (
        <div style={{ height: '500px', width: '100%', position: 'relative', background: '#020617', borderRadius: '32px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ position: 'absolute', top: '20px', left: '20px', fontSize: '0.8rem', color: '#64748b', fontWeight: 'bold', zIndex: 10 }}>MAPA DE BURBUJAS TEMÁTICAS (LA SERENA LIVE)</div>
            {clusters.map((c, i) => (
                <motion.div 
                    key={c.id}
                    drag
                    whileHover={{ scale: 1.1 }}
                    onClick={() => onSelect(c)}
                    style={{ 
                        position: 'absolute', 
                        bottom: `${c.y}%`, 
                        left: `${c.x}%`, 
                        width: `${c.size}px`, 
                        height: `${c.size}px`, 
                        borderRadius: '50%', 
                        background: c.color, 
                        display: 'flex', 
                        flexDirection: 'column',
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        cursor: 'pointer', 
                        boxShadow: `0 0 30px ${c.color}60`,
                        border: '2px solid rgba(255,255,255,0.3)',
                        padding: '10px',
                        textAlign: 'center'
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                >
                    <div style={{ color: 'white', fontWeight: 900, fontSize: c.size > 140 ? '1rem' : '0.8rem' }}>{c.label}</div>
                    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.6rem', fontWeight: 'bold' }}>{c.vol} COMENTARIOS</div>
                </motion.div>
            ))}
        </div>
    );
};

export default function PlazaVecinal() {
    const navigate = useNavigate();
    const [view, setView] = useState('bubbles'); // bubbles, list, tree
    const [activeTheme, setActiveTheme] = useState(null);
    const [isPosting, setIsPosting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const fileInputRef = useRef(null);

    // Mock Data para Burbujas
    const CLUSTERS = [
        { id: 1, label: "TRÁFICO VLS", vol: 124, x: 20, y: 30, size: 160, color: '#ef4444' },
        { id: 2, label: "PICARDÍA LOCAL", vol: 85, x: 50, y: 60, size: 120, color: '#f59e0b' },
        { id: 3, label: "AVISOS / MASCOTAS", vol: 42, x: 75, y: 25, size: 100, color: '#10b981' },
        { id: 4, label: "HUMEDALES", vol: 198, x: 60, y: 15, size: 180, color: '#38bdf8' }
    ];

    // Mock Data para Debate Tree
    const COMMENTS = [
        { id: 1, user: "Vecino_Sergio", text: "Propongo un lomo de toro en calle Larraín.", authorType: 'user', votes: 45, sentiment: 'positivo' },
        { id: 2, user: "Marta_LS", text: "¡Apoyo total! He visto atropellos.", parent: 1, votes: 12, sentiment: 'positivo' },
        { id: 3, user: "Don_Joaco (Gobernanza)", text: "Tomamos nota. Elevando a Vialidad.", parent: 1, votes: 30, sentiment: 'neutro' }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmissionStatus('processing');
        // Simular Multi-part Upload e IA Filter
        setTimeout(() => {
            setSubmissionStatus('success');
            setTimeout(() => {
                setSubmissionStatus(null);
                setIsPosting(false);
            }, 3000);
        }, 1500);
    };

    const handleCameraClick = () => {
        // Habilita apertura robusta de cámara en dispositivos móviles (Refactorización Punto 1)
        fileInputRef.current.click();
    };

    return (
        <div style={{ minHeight: '100vh', background: '#0d1117', color: 'white', fontFamily: 'system-ui' }}>
            <header style={{ background: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '1rem 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ background: '#38bdf8', padding: '10px', borderRadius: '15px' }}><Users size={24} color="white" /></div>
                    <div>
                        <div style={{ fontWeight: 900, fontSize: '1.4rem', letterSpacing: '1px' }}>LA PLAZA VECINAL</div>
                        <div style={{ fontSize: '0.65rem', color: '#10b981', fontWeight: 'bold' }}>MICRO RED SOCIAL · LA SERENA VIVA</div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={() => setView('bubbles')} style={{ background: view === 'bubbles' ? 'rgba(56, 189, 248, 0.1)' : 'transparent', border: 'none', color: view === 'bubbles' ? '#38bdf8' : '#94a3b8', padding: '0.6rem 1.2rem', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>MAPA BURBUJAS</button>
                    <button onClick={() => setView('tree')} style={{ background: view === 'tree' ? 'rgba(16, 185, 129, 0.1)' : 'transparent', border: 'none', color: view === 'tree' ? '#10b981' : '#94a3b8', padding: '0.6rem 1.2rem', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>ÁRBOLES DE DEBATE</button>
                    <button onClick={() => navigate('/')} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', padding: '0.6rem 1rem', borderRadius: '12px', cursor: 'pointer' }}>VOLVER</button>
                </div>
            </header>

            <main style={{ padding: '2rem 3rem', maxWidth: '1600px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 350px', gap: '3rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    
                    <AnimatePresence mode="wait">
                        {view === 'bubbles' && (
                            <motion.div key="bubbles" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <BubbleMap clusters={CLUSTERS} onSelect={(c) => { setActiveTheme(c); setView('tree'); }} />
                            </motion.div>
                        )}

                        {view === 'tree' && (
                            <motion.div key="tree" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        {activeTheme ? `Navegando: ${activeTheme.label}` : 'Estructura de Debate (Árboles)'}
                                        <div style={{ fontSize: '0.7rem', padding: '5px 12px', background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', borderRadius: '50px' }}>{activeTheme?.vol || 340} TEMAS VIVOS</div>
                                    </h2>
                                    <button onClick={() => setIsPosting(true)} style={{ background: '#38bdf8', color: '#000', border: 'none', padding: '0.8rem 2rem', borderRadius: '15px', fontWeight: 900, cursor: 'pointer' }}>NUEVA DISCUSIÓN</button>
                                </div>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {COMMENTS.map((c, i) => (
                                        <motion.div 
                                            key={c.id} 
                                            initial={{ opacity: 0, x: c.parent ? 40 : 0 }} 
                                            animate={{ opacity: 1, x: c.parent ? 40 : 0 }}
                                            className="glass-panel" 
                                            style={{ 
                                                padding: '2rem', 
                                                borderRadius: '24px', 
                                                background: 'rgba(15, 23, 42, 0.4)', 
                                                border: c.authorType === 'governance' ? '2px solid #10b981' : '1px solid rgba(255,255,255,0.05)',
                                                position: 'relative'
                                            }}
                                        >
                                            {c.parent && <div style={{ position: 'absolute', top: '-40px', left: '-20px', width: '2px', height: '60px', background: 'rgba(255,255,255,0.1)' }}></div>}
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <div style={{ width: '40px', height: '40px', background: c.authorType === 'governance' ? '#10b981' : '#334155', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{c.user[0]}</div>
                                                    <div>
                                                        <div style={{ fontWeight: 900, fontSize: '0.9rem' }}>{c.user} {c.authorType === 'governance' && '✓'}</div>
                                                        <div style={{ fontSize: '0.65rem', color: '#64748b' }}>HACE 12 MINUTOS</div>
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', gap: '1rem' }}>
                                                    <button style={{ color: '#10b981', border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold', fontSize: '0.8rem' }}><ThumbsUp size={16} /> {c.votes}</button>
                                                    <button style={{ color: '#64748b', border: 'none', background: 'transparent' }}><MoreHorizontal size={18} /></button>
                                                </div>
                                            </div>
                                            <p style={{ lineHeight: 1.6, color: '#e2e8f0' }}>{c.text}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* PODIO MENSUAL */}
                    <div className="glass-panel" style={{ padding: '2rem', borderRadius: '28px', background: 'linear-gradient(135deg, #1e1b4b 0%, #0d1117 100%)', border: '1px solid #4338ca' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', marginBottom: '1.5rem' }}><Award color="#f59e0b" /> PODIO VECINAL</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {["Sergio G.", "Marta L.", "Antonia R."].map((u, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', borderRadius: '15px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{ fontWeight: 900, color: i === 0 ? '#f59e0b' : '#94a3b8' }}>#{i+1}</div>
                                        <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{u}</div>
                                    </div>
                                    <div style={{ fontSize: '0.7rem', background: '#4338ca', padding: '3px 8px', borderRadius: '50px' }}>{200 - i*20} XP</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* POPCORN TIME - SERENITO 3D HUMANIZADO */}
                    <div style={{ height: '350px', background: 'rgba(255,255,255,0.02)', borderRadius: '32px', overflow: 'hidden', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '20px', left: '20px', display: 'flex', alignItems: 'center', gap: '10px', zIndex: 10 }}>
                            <div style={{ background: '#ef4444', padding: '6px 12px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 'bold' }}>POPCORN TIME 🍿</div>
                        </div>
                        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                            <Suspense fallback={null}>
                                <ambientLight intensity={0.5} />
                                <pointLight position={[10, 10, 10]} />
                                <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                                    <SerenitoPopcorn />
                                </Float>
                                <Environment preset="night" />
                                <ContactShadows opacity={0.4} />
                            </Suspense>
                        </Canvas>
                        <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', padding: '1rem', borderRadius: '15px', fontSize: '0.75rem', lineHeight: 1.5 }}>
                            <div style={{ fontWeight: 'black', color: '#38bdf8', marginBottom: '5px' }}>SERENITO DICE:</div>
                            "¡Atención vecinos! El tema del tráfico en Av. Larraín ha crecido un 40% hoy. ¡Debatamos con respeto!"
                        </div>
                    </div>

                    {/* TERMÓMETRO SOCIAL */}
                    <div className="glass-panel" style={{ padding: '2rem', borderRadius: '28px', background: 'rgba(15, 23, 42, 0.4)' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#94a3b8' }}><TrendingUp size={16} /> TERMÓMETRO SOCIAL</h3>
                        <div style={{ marginTop: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.8rem' }}>
                                <span>Optimismo / Humor</span>
                                <span style={{ color: '#10b981' }}>78%</span>
                            </div>
                            <div style={{ height: '8px', background: '#1e293b', borderRadius: '50px', overflow: 'hidden' }}>
                                <motion.div initial={{ width: 0 }} animate={{ width: '78%' }} style={{ height: '100%', background: '#10b981' }} />
                            </div>
                        </div>
                        <div style={{ marginTop: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.8rem' }}>
                                <span>Preocupación</span>
                                <span style={{ color: '#ef4444' }}>22%</span>
                            </div>
                            <div style={{ height: '8px', background: '#1e293b', borderRadius: '50px', overflow: 'hidden' }}>
                                <motion.div initial={{ width: 0 }} animate={{ width: '22%' }} style={{ height: '100%', background: '#ef4444' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* MODAL: PUBLICAR CON REFACTOR DE CÁMARA & MULTIPART */}
            <AnimatePresence>
                {isPosting && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                        <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} style={{ width: '100%', maxWidth: '600px', background: '#0d1117', borderRadius: '32px', border: '1px solid #334155', padding: '3rem', position: 'relative' }}>
                            <button onClick={() => setIsPosting(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><CloseIcon size={24} /></button>
                            
                            <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '2rem' }}>Poner Temática en La Plaza</h2>
                            
                            {submissionStatus === 'success' ? (
                                <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                                    <div style={{ background: '#10b981', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}><CheckCircle2 size={40} color="white" /></div>
                                    <h3>¡Publicación Exitosa!</h3>
                                    <p style={{ color: '#94a3b8' }}>Tu aporte ya está en el Mapa de Burbujas.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <div>
                                        <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 900, display: 'block', marginBottom: '10px' }}>TEMÁTICA VINCULADA</label>
                                        <select style={{ width: '100%', padding: '1rem', borderRadius: '15px', background: '#1e293b', border: '1px solid #334155', color: 'white' }}>
                                            <option>Seleccione Categoría...</option>
                                            <option>🚨 Tráfico / Vialidad</option>
                                            <option>😂 Humor / Picardía</option>
                                            <option>🤝 Solidaridad Vecinal</option>
                                            <option>📢 Avisos Clasificados</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 900, display: 'block', marginBottom: '10px' }}>TEXTO DE LA PUBLICACIÓN</label>
                                        <textarea rows="4" placeholder="¿Qué quieres decir a tus vecinos?..." style={{ width: '100%', padding: '1.5rem', borderRadius: '20px', background: '#1e293b', border: '1px solid #334155', color: 'white', resize: 'none' }} required />
                                    </div>
                                    
                                    {/* REFACTOR: CÁMARA & MULTIPART UI */}
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <button type="button" onClick={handleCameraClick} style={{ flex: 1, padding: '1rem', borderRadius: '15px', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid #38bdf8', color: '#38bdf8', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer' }}>
                                            <Camera size={20} /> Abrir Cámara
                                        </button>
                                        <button type="button" onClick={handleCameraClick} style={{ flex: 1, padding: '1rem', borderRadius: '15px', background: 'rgba(148, 163, 184, 0.1)', border: '1px solid #94a3b8', color: '#94a3b8', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer' }}>
                                            <ImageIcon size={20} /> Elegir Foto
                                        </button>
                                        <input type="file" ref={fileInputRef} accept="image/*" capture="environment" style={{ display: 'none' }} />
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={submissionStatus === 'processing'}
                                        style={{ width: '100%', padding: '1.2rem', borderRadius: '20px', background: '#10b981', border: 'none', color: 'white', fontWeight: 900, fontSize: '1.1rem', cursor: 'pointer' }}
                                    >
                                        {submissionStatus === 'processing' ? 'PROCESANDO CON IA...' : 'PUBLICAR EN LA PLAZA'}
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .glass-panel { backdrop-filter: blur(15px); }
                @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
                .pulse { animation: pulse 2s infinite ease-in-out; }
            `}</style>
        </div>
    );
}
