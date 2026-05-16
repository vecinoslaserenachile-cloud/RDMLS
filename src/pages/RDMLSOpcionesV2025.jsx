import React, { useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Radio, Shield, Music, Zap, FileText, Download, 
    Upload, Mic, AlertTriangle, CheckCircle2, 
    Layers, Cpu, Globe, ArrowLeft, Camera, 
    Lock, Play, Plus, Trash2, Save
} from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows, Float } from '@react-three/drei';
import { supabase } from '../utils/supabase';
import { generateRDMLSPDF } from '../utils/rdmlsPdfGenerator';
import UniversalSerenito from '../components/UniversalSerenito';


/* --- 3D AVATAR (Serenito Humanized) --- */
function SerenitoAdmin() {
    return (
        <group scale={0.08} position={[0, -2, 0]} rotation={[0, -0.4, 0]}>
            <UniversalSerenito animation="Idle" />
        </group>
    );
}

export default function RDMLSOpcionesV2025() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('legal'); // legal, ia, artist, streaming
    const [pin, setPin] = useState('');
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [streamingMode, setStreamingMode] = useState('automatic');
    const [vlsSignature, setVlsSignature] = useState('');
    
    // Check Authorization
    const handleLogin = () => {
        if (pin === '2025' || pin === '8590') {
            setIsAuthorized(true);
        } else {
            alert("PIN de Acceso Maestro Incorrecto (VLS-SEC-99)");
            setPin('');
        }
    };

    // SCD Report Generation
    const generateSCDReport = () => {
        setIsExporting(true);
        setTimeout(() => {
            const date = new Date().toISOString().split('T')[0];
            const content = "RDMLS_TRANSMISSION_LOG\nDate,Song,Artist,ISRC,Duration,Cat\n" +
                `${date},Vals Mis Recuerdos,P. de La Serena,CL-ABC-01,180s,National\n` +
                `${date},Sereneres P1,IA Gemini,CL-VLS-IA,30s,Proprietary\n`;
            
            const blob = new Blob([content], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `LOG_SCD_RDMLS_${date}.csv`;
            a.click();
            setIsExporting(false);
            
            // Log to Supabase
            supabase.from('system_logs').insert([{
                type: 'SCD_EXPORT',
                user: 'ADMIN_VLS',
                timestamp: new Date().toISOString(),
                domain: window.location.hostname
            }]).then(({ error }) => {
                if (error) console.error("Supabase Log Error:", error);
            });
        }, 1500);
    };

    if (!isAuthorized) {
        return (
            <div style={{ height: '100vh', background: '#020617', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'system-ui' }}>
                <div style={{ position: 'absolute', inset: 0, opacity: 0.3 }}>
                     <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                        <Suspense fallback={null}>
                            <ambientLight intensity={0.5} />
                            <pointLight position={[10, 10, 10]} />
                            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                                <SerenitoAdmin />
                            </Float>
                            <ContactShadows opacity={0.4} />
                        </Suspense>
                    </Canvas>
                </div>
                
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="glass-panel" 
                    style={{ padding: '3rem', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(30px)', width: '400px', textAlign: 'center', zIndex: 10 }}
                >
                    <div style={{ background: '#ef4444', padding: '15px', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                        <Lock size={30} color="white" />
                    </div>
                    <h2 style={{ marginBottom: '0.5rem', fontWeight: 900 }}>RDMLS MASTER CONTROL</h2>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '2rem' }}>Ingrese el nivel de acceso para "Flash Opciones V2025"</p>
                    
                    <input 
                        type="password" 
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                        placeholder="Master PIN"
                        style={{ width: '100%', padding: '1rem', borderRadius: '15px', border: '1px solid #334155', background: '#020617', color: 'white', textAlign: 'center', fontSize: '1.5rem', letterSpacing: '8px', outline: 'none', marginBottom: '1.5rem' }}
                    />
                    
                    <button 
                        onClick={handleLogin}
                        style={{ width: '100%', padding: '1rem', borderRadius: '15px', background: '#ef4444', border: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' }}
                    >
                        ACCEDER AL NODO
                    </button>
                    
                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                        {["rdmls.cl", "vecinosmart.cl", "comunsmart.cl"].map(node => (
                             <span key={node} style={{ fontSize: '0.6rem', color: '#475569', border: '1px solid #334155', padding: '2px 8px', borderRadius: '4px' }}>{node}</span>
                        ))}
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#020617', color: 'white', fontFamily: 'system-ui', display: 'flex', overflow: 'hidden' }}>
            {/* Sidebar Navigation */}
            <nav style={{ width: '300px', background: 'rgba(15, 23, 42, 0.5)', borderRight: '1px solid rgba(255,255,255,0.05)', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2.5rem', padding: '0 0.5rem' }}>
                    <div style={{ background: '#ef4444', padding: '8px', borderRadius: '10px' }}>
                        <Radio size={24} color="white" />
                    </div>
                    <div>
                        <div style={{ fontSize: '0.7rem', color: '#ef4444', fontWeight: 'bold', letterSpacing: '2px' }}>RDMLS OP V2025</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 900 }}>OMNI CONTROL</div>
                    </div>
                </div>

                {[
                    { id: 'legal', icon: Shield, label: 'Marco Legal SCD' },
                    { id: 'ia', icon: Cpu, label: 'Motor IA Lyria 3' },
                    { id: 'artist', icon: Music, label: 'Artistas Locales' },
                    { id: 'streaming', icon: Zap, label: 'Streaming Overrides' }
                ].map(item => (
                    <button 
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        style={{ 
                            display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem', borderRadius: '15px', 
                            background: activeTab === item.id ? 'rgba(239, 68, 68, 0.15)' : 'transparent',
                            border: 'none', color: activeTab === item.id ? '#ef4444' : '#94a3b8',
                            fontWeight: activeTab === item.id ? 'bold' : 'normal',
                            cursor: 'pointer', transition: '0.3s', textAlign: 'left'
                        }}
                    >
                        <item.icon size={20} />
                        {item.label}
                    </button>
                ))}

                <button 
                    onClick={() => navigate('/')}
                    style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem', borderRadius: '15px', background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', cursor: 'pointer' }}
                >
                    <ArrowLeft size={20} /> Salir a Dashboard
                </button>

                <button 
                    onClick={() => generateRDMLSPDF(
                        { features: [], techStack: [], legal: [], roadmap: [] }, // Placeholders or common data
                        { benchmark: [
                            { provider: 'PowerHost (CL)', tech: 'Tier III Corporativo', uptime: '99.9%', latency: '12ms', rating: 'Óptima', cost: 'Medio' },
                            { provider: 'Kombi.cl (CL)', tech: 'Managed AzuraCast CP', uptime: '99.9%', latency: '15ms', rating: 'Soberana', cost: 'Bajo-Medio' }
                          ] 
                        }
                    )}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem', borderRadius: '15px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', color: '#10b981', cursor: 'pointer', marginTop: '10px', fontSize: '0.8rem', fontWeight: 'bold' }}
                >
                    <Download size={20} /> EXPEDIENTE PDF
                </button>

            </nav>

            {/* Main Workspace */}
            <main style={{ flex: 1, padding: '3rem', position: 'relative', overflowY: 'auto' }}>
                <AnimatePresence mode="wait">
                    {activeTab === 'legal' && (
                        <motion.div key="legal" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
                                <div>
                                    <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 900 }}>Marco Legal SCD Chile</h1>
                                    <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Sinceramiento de transmisiones y reporte mensual automatizado</p>
                                </div>
                                <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '1rem 2rem', borderRadius: '50px', border: '1px solid #10b981', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                    LICENCIA: Webcaster ACTIVA
                                </div>
                            </div>

                            <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                <div className="glass-panel" style={{ padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(30, 41, 59, 0.3)' }}>
                                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><FileText color="#ef4444" /> LOG DE TRANSMISIÓN MENSUAL (30 DÍAS)</h3>
                                    <div style={{ background: '#020617', borderRadius: '15px', padding: '1.5rem', marginTop: '1.5rem', border: '1px solid #1e293b' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #1e293b' }}>
                                            <span style={{ color: '#64748b' }}>Periodo Actual:</span>
                                            <strong>Marzo 2025</strong>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                            <span style={{ color: '#64748b' }}>Obras Detectadas:</span>
                                            <strong>4,285 tracks</strong>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                            <span style={{ color: '#64748b' }}>Propiedad VLS SpA:</span>
                                            <strong style={{ color: '#38bdf8' }}>62% (IA Enabled)</strong>
                                        </div>
                                        <button 
                                            onClick={generateSCDReport}
                                            disabled={isExporting}
                                            style={{ width: '100%', padding: '1rem', background: isExporting ? '#334155' : '#ef4444', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                                        >
                                            <Download size={18} /> {isExporting ? 'Procesando Nodos...' : 'Exportar CSV para SCD Chile'}
                                        </button>
                                    </div>
                                </div>

                                <div className="glass-panel" style={{ padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(30, 41, 59, 0.3)' }}>
                                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Shield color="#38bdf8" /> GESTIÓN DE VALIDACIÓN</h3>
                                    <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(56, 189, 248, 0.05)', padding: '1rem', borderRadius: '12px' }}>
                                            <CheckCircle2 size={24} color="#38bdf8" />
                                            <div>
                                                <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Catálogo Chileno Localizado</div>
                                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Prioridad asignada según Ley del 20%</div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(16, 185, 129, 0.05)', padding: '1rem', borderRadius: '12px' }}>
                                            <CheckCircle2 size={24} color="#10b981" />
                                            <div>
                                                <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Tarifa Mínima Mensual</div>
                                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Provisionada en budget fiscal 2025</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'ia' && (
                        <motion.div key="ia" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div style={{ marginBottom: '3rem' }}>
                                <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 900 }}>IA Content Engine: Lyria 3</h1>
                                <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Generación propietaria de jingles, cortinas y ambientes MIDI-Synced</p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                                {[
                                    { name: "Jingle Oficial RDMLS", type: "Vocal/Synth", mood: "Soberano" },
                                    { name: "Cortina 'Serenito' 2025", type: "Vocal/Child", mood: "Alegre" },
                                    { name: "Background Lofi La Serena", type: "Ambient", mood: "Relax" },
                                    { name: "Faro IA Voiceover Pack", type: "Speech", mood: "Master CEO" }
                                ].map((item, idx) => (
                                    <div key={idx} className="glass-panel" style={{ padding: '1.5rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(15, 23, 42, 0.6)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                            <div style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#a855f7', padding: '4px 8px', borderRadius: '6px', fontSize: '0.65rem', fontWeight: 'bold' }}>GEMINI MUSIC 3</div>
                                            <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Max 30s</span>
                                        </div>
                                        <h4 style={{ margin: '0 0 0.5rem 0' }}>{item.name}</h4>
                                        <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '0 0 1.5rem 0' }}>{item.type} • {item.mood}</p>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button style={{ flex: 1, padding: '0.6rem', background: '#38bdf8', border: 'none', borderRadius: '8px', color: '#020617', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                                <Play size={14} /> PLAY
                                            </button>
                                            <button style={{ flex: 1, padding: '0.6rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                                <Download size={14} /> .WAV
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div style={{ marginTop: '3rem', padding: '2rem', borderRadius: '24px', background: 'linear-gradient(90deg, #1e1b4b, #312e81)', border: '1px solid #4338ca' }}>
                                <h3 style={{ margin: 0 }}>DERECHOS Y PROPIEDAD: 100% Propietaria</h3>
                                <p style={{ color: '#c7d2fe', fontSize: '0.9rem' }}>Todo el contenido generado bajo este nodo pertenece legalmente a <strong>Vecinos La Serena SpA</strong> para uso libre en rdmls.cl y ecosistema propio.</p>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'artist' && (
                        <motion.div key="artist" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
                                <div>
                                    <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 900 }}>Reversiones Serenenses</h1>
                                    <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Programa de digitalización y difusión de artistas locales</p>
                                </div>
                                <button style={{ background: '#ef4444', color: 'white', padding: '1rem 2rem', borderRadius: '15px', border: 'none', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Plus size={20} /> NUEVA OBRA
                                </button>
                            </div>

                            <div className="glass-panel" style={{ padding: '2rem', borderRadius: '24px', background: 'rgba(15, 23, 42, 0.4)' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', padding: '0 1rem 1rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#64748b', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                    <span>OBRA / TRACK</span>
                                    <span>ARTISTA</span>
                                    <span>METADATA TAG</span>
                                    <span>ESTADO LEGAL</span>
                                </div>
                                <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {[
                                        { track: "Vals Mis Recuerdos", artist: "Orquesta La Serena", tag: "[RDMLS] - Vals Mis...", status: "SIGNED" },
                                        { track: "Atardecer en Coquimbo", artist: "Luchito VLS", tag: "[LUCHO] - Atardecer", status: "PENDING" },
                                        { track: "Clásicos La Serena", artist: "Soni Cev Project", tag: "[SONI] - Clásicos", status: "SIGNED" }
                                    ].map((row, i) => (
                                        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', padding: '1.2rem 1rem', borderRadius: '12px', background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent', alignItems: 'center' }}>
                                            <span style={{ fontWeight: 'bold' }}>{row.track}</span>
                                            <span>{row.artist}</span>
                                            <code style={{ fontSize: '0.7rem', color: '#10b981' }}>{row.tag}</code>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: row.status === 'SIGNED' ? '#10b981' : '#f59e0b' }} />
                                                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: row.status === 'SIGNED' ? '#10b981' : '#f59e0b' }}>{row.status}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{ marginTop: '2rem' }}>
                                <h3>Firma Digital de Autorización</h3>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <input 
                                        type="text" 
                                        placeholder="Nombre Completo para Firma Digital / Certificado VLS"
                                        value={vlsSignature}
                                        onChange={(e) => setVlsSignature(e.target.value)}
                                        style={{ flex: 1, padding: '1rem', borderRadius: '12px', background: '#020617', border: '1px solid #334155', color: 'white' }}
                                    />
                                    <button style={{ padding: '1rem 2rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold' }}>VALIDAR CONTRATO</button>
                                </div>
                                <p style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '1rem' }}>* Non-exclusive / Community Promotion. Exclusive RDMLS/Vecinosmart required for V-Sync.</p>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'streaming' && (
                        <motion.div key="streaming" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div style={{ marginBottom: '3rem' }}>
                                <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 900 }}>Streaming Logic Overrides</h1>
                                <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Priorización del catalogó y protocolos de emergencia</p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
                                {[
                                    { id: 'automatic', icon: Cpu, name: 'MODO AUTOMÁTICO', desc: 'Prioridad 1: Reversiones Locales + Jingles IA. Autopilot 24/7.', color: '#38bdf8' },
                                    { id: 'manual', icon: Mic, name: 'CONTROL DE CABINA', desc: 'Control manual por Locutor/DJ en vivo. Anula lógica de catálogo.', color: '#ef4444' },
                                    { id: 'emergency', icon: AlertTriangle, name: 'MODO EMERGENCIA', desc: 'Desconexión instantánea de música. Enlace a Feed de Emergencia RDMLS.', color: '#f59e0b' }
                                ].map(mode => (
                                    <button 
                                        key={mode.id}
                                        onClick={() => setStreamingMode(mode.id)}
                                        style={{ 
                                            padding: '2.5rem', borderRadius: '24px', border: '2px solid', 
                                            borderColor: streamingMode === mode.id ? mode.color : 'rgba(255,255,255,0.05)',
                                            background: streamingMode === mode.id ? `${mode.color}15` : 'rgba(15, 23, 42, 0.4)',
                                            color: 'white', textAlign: 'left', cursor: 'pointer', transition: '0.3s',
                                            display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', overflow: 'hidden'
                                        }}
                                    >
                                        <mode.icon size={32} color={mode.color} />
                                        <h3 style={{ margin: 0, fontSize: '1.4rem' }}>{mode.name}</h3>
                                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8', lineHeight: '1.4' }}>{mode.desc}</p>
                                        
                                        {streamingMode === mode.id && (
                                            <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                                                <div style={{ background: mode.color, color: '#020617', padding: '4px 12px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 'bold' }}>ACTIVO</div>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>

                            <div className="glass-panel" style={{ marginTop: '3rem', padding: '2rem', borderRadius: '24px', background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <Layers size={24} color="#38bdf8" />
                                        <div>
                                            <h4 style={{ margin: 0 }}>Stack de Prioridades (Playlist Buffer)</h4>
                                            <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>Inyectando metadatos en Icecast/AzuraCast sin afectar buffer físico.</p>
                                        </div>
                                    </div>
                                    <button style={{ padding: '0.8rem 1.5rem', background: '#38bdf8', color: '#020617', border: 'none', borderRadius: '12px', fontWeight: 'bold' }}>SINCRONIZAR PLAYLISTS</button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Background 3D Avatar Area */}
                <div style={{ position: 'fixed', bottom: '-150px', right: '-150px', width: '600px', height: '600px', opacity: 0.25, pointerEvents: 'none', zIndex: -1 }}>
                     <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                        <Suspense fallback={null}>
                            <ambientLight intensity={0.5} />
                            <pointLight position={[10, 10, 10]} />
                            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                                <SerenitoAdmin />
                            </Float>
                            <Environment preset="night" />
                        </Suspense>
                    </Canvas>
                </div>
            </main>
        </div>
    );
}
