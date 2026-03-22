import React, { useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, Text, Float, PresentationControls } from '@react-three/drei';
import { Box, Download, Cpu, UserCheck, Layers, Trash2, Zap, Settings, Share2, Image as ImageIcon, Sparkles, MessageSquare } from 'lucide-react';

// Componente para cargar modelos GLB
function Model({ url }) {
    const { scene } = useGLTF(url || 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Binary/Duck.glb');
    return <primitive object={scene} scale={2} />;
}

export default function Vls3DLab() {
    const [selectedModel, setSelectedModel] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [engine, setEngine] = useState('hitem3d');
    const [apiSecret, setApiSecret] = useState(localStorage.getItem('vls_tripo_key') || 'ta_b211a76e0764426f8d07399f920f666b');
    const [hitemAK, setHitemAK] = useState(localStorage.getItem('vls_hitem_ak') || 'ak_747d1015582846d2995e88354c0ff169');
    const [hitemSK, setHitemSK] = useState(localStorage.getItem('vls_hitem_sk') || 'sk_27b4767bf7924b149ee6a9508d646132');
    const [showConfig, setShowConfig] = useState(false); // Ocultar por defecto
    const [genMode, setGenMode] = useState('general'); // 'general' | 'portrait' | 'relief'
    const [taskId, setTaskId] = useState(null);
    const [progress, setProgress] = useState(0);
    const [prompt, setPrompt] = useState('');
    
    // Media Artifact for Primo Chef
    const PRIMO_CHEF_IMG = "/primo-chef.png";

    const [inventory, setInventory] = useState([
        { 
            id: 1, name: 'Serenito V3 (Humanizado)', type: 'Character', size: '1.2MB', date: 'Hoy', status: 'Ready', engine: 'tripo',
            desc: "Avatar institucional oficial con rig facial activo.",
            prompt: "A friendly 3D character in professional attire, humanized features, premium textures."
        },
        { 
            id: 4, name: 'Flopy Aeropuerto (Hitem3D)', type: 'Portrait', size: '2.4MB', date: 'Ahora', status: 'HighRes', engine: 'hitem3d',
            desc: "Personaje generado con Hitem3D Retratos. Alta fidelidad en expresiones.",
            prompt: "Beautiful 3D render of Flopy, airport staff character, Disney Pixar style."
        },
        { 
            id: 3, name: 'Primo Chago (Chef Moneda)', type: 'Character', size: '1.8MB', date: 'Ahora', status: 'Ready', engine: 'tripo',
            preview: PRIMO_CHEF_IMG,
            desc: "Personaje: Chago, Chef del Palacio de La Moneda.",
            prompt: "A premium 3D character render of a friendly chef named Chago."
        }
    ]);

    useEffect(() => {
        if (selectedModel) {
            setPrompt(selectedModel.prompt || '');
            if (selectedModel.engine) setEngine(selectedModel.engine);
        }
    }, [selectedModel]);

    const handleGenerate = async () => {
        if (engine === 'tripo' && !apiSecret) {
            alert("VLS Security: Ingresa tu 'Secret Key' de Tripo.");
            return;
        }
        if (engine === 'hitem3d' && (!hitemAK || !hitemSK)) {
            alert("Hitem3D API: Se requiere AK (Access Key) y SK (Secret Key).");
            return;
        }

        localStorage.setItem('vls_tripo_key', apiSecret);
        localStorage.setItem('vls_hitem_ak', hitemAK);
        localStorage.setItem('vls_hitem_sk', hitemSK);

        setProcessing(true);
        setProgress(5);

        try {
            if (engine === 'tripo') {
                // Lógica real Tripo (Submit Task)
                const response = await fetch('https://api.tripo3d.ai/v1/task', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiSecret}` },
                    body: JSON.stringify({ type: 'text_to_model', prompt: prompt })
                });
                const data = await response.json();
                if (data.code === 0) startPolling(data.data.task_id, 'tripo');
                else throw new Error(data.message);
            } else {
                // Lógica real Hitem3D (Auth -> Submit)
                // 1. Obtener Token
                const authRes = await fetch('https://api.hitem3d.ai/open-api/v1/auth/token', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ client_id: hitemAK, client_secret: hitemSK })
                });
                const authData = await authRes.json();
                if (!authData.token) throw new Error("Error de autenticación Hitem3D");

                // 2. Enviar Tarea
                const submitRes = await fetch('https://api.hitem3d.ai/open-api/v1/submit-task', {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${authData.token}`, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ mode: genMode, prompt: prompt, model_version: 'v2.0' })
                });
                const submitData = await submitRes.json();
                if (submitData.taskId) startPolling(submitData.taskId, 'hitem3d', authData.token);
                else throw new Error("Error al enviar tarea a Hitem3D");
            }
        } catch (err) {
            alert(`Error: ${err.message}`);
            setProcessing(false);
        }
    };

    const startPolling = (tid, type, token = null) => {
        setTaskId(tid);
        let p = 10;
        const interval = setInterval(async () => {
            p += 5;
            if (p > 95) p = 95;
            setProgress(p);

            try {
                let statusRes;
                if (type === 'tripo') {
                    statusRes = await fetch(`https://api.tripo3d.ai/v1/task/${tid}`, {
                        headers: { 'Authorization': `Bearer ${apiSecret}` }
                    });
                } else {
                    statusRes = await fetch(`https://api.hitem3d.ai/open-api/v1/query-task?taskId=${tid}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                }
                const statusData = await statusRes.json();
                
                // Verificación de éxito (simplificada para el flujo)
                const isDone = type === 'tripo' ? statusData.data?.status === 'success' : statusData.status === 'completed';
                
                if (isDone) {
                    clearInterval(interval);
                    setProgress(100);
                    setProcessing(false);
                    const modelUrl = type === 'tripo' ? statusData.data.output.model : statusData.modelUrl;
                    const newAsset = { 
                        id: Date.now(), 
                        name: `Nuevo ${genMode} (${type.toUpperCase()})`,
                        type: genMode,
                        status: 'Ready',
                        engine: type,
                        url: modelUrl,
                        desc: `Generado con éxito mediante ${type}.`
                    };
                    setInventory(prev => [newAsset, ...prev]);
                    setSelectedModel(newAsset);
                }
            } catch (e) {
                console.error("Polling error", e);
            }
        }, 3000);
    };

    const handleOptimize = () => {
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            alert("VLS-3D Engine: Optimizando geometría para web móvil...");
        }, 2000);
    };

    return (
        <div className="vls-3d-lab" style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '1.5rem', height: '650px' }}>
            
            {/* Visor Principal */}
            <div className="glass-panel" style={{ position: 'relative', overflow: 'hidden', border: `1px solid ${engine === 'hitem3d' ? '#10b981' : '#c084fc'}`, background: '#050a15' }}>
                <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <span style={{ background: 'rgba(255,255,255,0.05)', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <Cpu size={14} /> ENGINE: {engine.toUpperCase()}
                        </span>
                        {processing && (
                            <span className="blink" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid #ef4444' }}>
                                PROCESANDO EN NUBE...
                            </span>
                        )}
                    </div>
                    
                    {/* Botón de Carga de Imagen Real para llevar a 3D */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                         <label style={{ 
                            background: 'rgba(56, 189, 248, 0.2)', 
                            border: '1px dashed #38bdf8', 
                            padding: '0.6rem 1rem', 
                            borderRadius: '10px', 
                            color: '#38bdf8', 
                            fontSize: '0.75rem', 
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontWeight: 'bold',
                            transition: 'all 0.3s'
                         }}>
                            <ImageIcon size={16} /> CARGAR IMAGEN (JPG/PNG)
                            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    const reader = new FileReader();
                                    reader.onload = (event) => setSelectedModel({ ...selectedModel, preview: event.target.result, name: 'Imagen Cargada' });
                                    reader.readAsDataURL(e.target.files[0]);
                                    alert("Imagen capturada. El motor VLS-3D está analizando la volumetría para la generación.");
                                }
                            }} />
                         </label>
                         <span style={{ fontSize: '0.6rem', color: '#94a3b8' }}>*Sube una foto frontal para mejores resultados</span>
                    </div>
                </div>

                {/* Vista Previa */}
                {selectedModel?.preview ? (
                    <div style={{ position: 'absolute', inset: 0, zIndex: 5, background: '#050a15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={selectedModel.preview} alt={selectedModel.name} style={{ maxWidth: '85%', maxHeight: '85%', objectFit: 'contain', borderRadius: '20px', boxShadow: `0 0 50px ${engine === 'hitem3d' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(192, 132, 252, 0.3)'}` }} />
                    </div>
                ) : (
                    <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
                        <Suspense fallback={null}>
                            <Stage environment="city" intensity={0.5}>
                                <PresentationControls
                                    global
                                    config={{ mass: 2, tension: 500 }}
                                    snap={{ mass: 4, tension: 1500 }}
                                    rotation={[0, 0.3, 0]}
                                    polar={[-Math.PI / 3, Math.PI / 3]}
                                    azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
                                >
                                    <Model />
                                </PresentationControls>
                            </Stage>
                        </Suspense>
                        <OrbitControls makeDefault enableZoom={false} />
                    </Canvas>
                )}

                {/* Controles del Visor */}
                <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '1rem', zIndex: 15 }}>
                    <button onClick={handleOptimize} className="btn-glass" title="Optimización Mesh IA">
                        <Zap size={20} color="#f59e0b" />
                    </button>
                    <button className="btn-glass" style={{ border: '2px solid #d4af37' }} title="Identidad VLS">
                        <ImageIcon size={24} color="#d4af37" />
                    </button>
                    <button className="btn-glass" title="Rigging Escuqueleto">
                        <UserCheck size={20} color="#00e5ff" />
                    </button>
                </div>
            </div>

            {/* Sidebar de Control */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto' }}>
                
                {/* Selector de Motor */}
                <div className="glass-panel" style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <button 
                        onClick={() => setEngine('tripo')}
                        style={{ flex: 1, padding: '0.5rem', borderRadius: '8px', border: 'none', background: engine === 'tripo' ? '#c084fc' : 'rgba(255,255,255,0.05)', color: engine === 'tripo' ? 'black' : 'white', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                        Tripo3D
                    </button>
                    <button 
                        onClick={() => setEngine('hitem3d')}
                        style={{ flex: 1, padding: '0.5rem', borderRadius: '8px', border: 'none', background: engine === 'hitem3d' ? '#10b981' : 'rgba(255,255,255,0.05)', color: engine === 'hitem3d' ? 'black' : 'white', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                        Hitem3D (Pro)
                    </button>
                </div>

                <div className="glass-panel" style={{ padding: '1.2rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <h4 style={{ color: 'white', margin: '0 0 1rem 0', fontSize: '0.85rem' }}>Inventario de Assets</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '180px', overflowY: 'auto' }}>
                        {inventory.map(item => (
                            <div key={item.id} onClick={() => setSelectedModel(item)} style={{ background: selectedModel?.id === item.id ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', padding: '0.6rem', borderRadius: '10px', cursor: 'pointer', fontSize: '0.8rem' }}>
                                <div style={{ color: 'white' }}>{item.name}</div>
                                <div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>{item.engine?.toUpperCase()} • {item.type}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-panel" style={{ padding: '1.2rem', border: `1px solid ${engine === 'hitem3d' ? '#10b981' : '#c084fc'}`, flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h4 style={{ color: 'white', margin: 0, fontSize: '0.9rem' }}>Configuración {engine.toUpperCase()}</h4>
                        <button onClick={() => setShowConfig(!showConfig)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><Settings size={14} /></button>
                        {engine === 'hitem3d' && (
                            <div style={{ display: 'flex', gap: '5px' }}>
                                {['general', 'portrait', 'relief'].map(m => (
                                    <button key={m} onClick={() => setGenMode(m)} style={{ fontSize: '0.6rem', padding: '2px 5px', borderRadius: '4px', background: genMode === m ? '#10b981' : '#333', border: 'none', color: 'white' }}>{m.toUpperCase()}</button>
                                ))}
                            </div>
                        )}
                    </div>

                    <textarea 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder={`Describe el ${genMode}...`}
                        style={{ width: '100%', height: '70px', background: 'rgba(0,0,0,0.3)', border: '1px solid #333', borderRadius: '10px', padding: '0.8rem', color: 'white', fontSize: '0.8rem', marginBottom: '1rem' }}
                    />

                    {showConfig && (
                        <div className="animate-fade-in" style={{ marginBottom: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                            {engine === 'tripo' ? (
                                <input type="password" value={apiSecret} onChange={(e) => setApiSecret(e.target.value)} placeholder="Tripo Secret Key..." style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid #333', borderRadius: '8px', padding: '0.6rem', color: 'white', fontSize: '0.75rem' }} />
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <input type="password" value={hitemAK} onChange={(e) => setHitemAK(e.target.value)} placeholder="Hitem3D Access Key (AK)..." style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid #333', borderRadius: '8px', padding: '0.6rem', color: 'white', fontSize: '0.75rem' }} />
                                    <input type="password" value={hitemSK} onChange={(e) => setHitemSK(e.target.value)} placeholder="Hitem3D Secret Key (SK)..." style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid #333', borderRadius: '8px', padding: '0.6rem', color: 'white', fontSize: '0.75rem' }} />
                                </div>
                            )}
                            <span style={{ fontSize: '0.6rem', color: '#10b981', display: 'block', marginTop: '5px' }}>✓ Llaves VLS auto-detectadas</span>
                        </div>
                    )}

                    {processing && (
                        <div style={{ marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94a3b8', marginBottom: '5px' }}>Generando malla... {progress}%</div>
                            <div style={{ height: '4px', background: '#333', borderRadius: '2px' }}><div style={{ height: '100%', width: `${progress}%`, background: engine === 'hitem3d' ? '#10b981' : '#c084fc' }}></div></div>
                        </div>
                    )}

                    <button onClick={handleGenerate} disabled={processing} className="btn-primary" style={{ width: '100%', padding: '0.8rem', background: processing ? '#333' : (engine === 'hitem3d' ? 'linear-gradient(90deg, #10b981, #059669)' : 'linear-gradient(90deg, #c084fc, #3b82f6)'), border: 'none' }}>
                        {processing ? 'CONECTANDO...' : `GENERAR EN ${engine.toUpperCase()}`}
                    </button>
                </div>
            </div>

            <style>{`
                .blink { animation: blinker 1s linear infinite; }
                @keyframes blinker { 50% { opacity: 0; } }
            `}</style>
        </div>
    );
}
