import React, { useState, useEffect, useRef } from 'react';
import { X, Camera, Shield, Eye, Lock, Map as MapIcon, CheckCircle, AlertTriangle, Video, Power, Settings, Globe, ShieldAlert, Cpu } from 'lucide-react';

const MOCK_CAMERAS = [
    { id: 1, name: 'Entrada Condominio El Faro', type: 'Fija', status: 'Online', category: 'Neighborhood', region: 'La Serena', views: '24', provider: 'Ezviz Cloud' },
    { id: 2, name: 'Vista 4 Esquinas / Estadio', type: 'Domo PTZ', status: 'Online', category: 'City', region: 'La Serena', views: '156', provider: 'Axon Muni' },
    { id: 3, name: 'Patio Interior - Casa 42', type: 'Privada', status: 'Authorized', category: 'Home', region: 'Coquimbo', views: '1', provider: 'Tuya Smart' },
    { id: 4, name: 'Dashcam Colectivo L24', type: 'Móvil', status: 'Online', category: 'Vehicle', region: 'Interurbano', views: '8', provider: 'VLS-Connect' },
];

export default function VecinojosPortal({ onClose }) {
    const [step, setStep] = useState('lobby'); // lobby, validation, monitoring
    const [isValidating, setIsValidating] = useState(false);
    const [selectedCam, setSelectedCam] = useState(null);
    const [aiCensorshipActive, setAiCensorshipActive] = useState(true);

    const handleStartValidation = () => {
        setIsValidating(true);
        setTimeout(() => {
            setIsValidating(false);
            setStep('monitoring');
        }, 2500);
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100050, background: 'rgba(5, 10, 25, 0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(20px)' }}>
            <div className="vecinojos-container animate-scale-in" style={{ 
                width: '100%', maxWidth: '1200px', height: '90vh', background: '#0f172a', borderRadius: '32px', 
                overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid rgba(56, 189, 248, 0.2)',
                boxShadow: '0 40px 100px rgba(0,0,0,0.8)'
            }}>
                {/* Header Estilo Centro de Comando */}
                <div style={{ padding: '2rem', background: 'rgba(15, 23, 42, 0.9)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #38bdf8' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ background: 'linear-gradient(45deg, #38bdf8, #1e40af)', padding: '1rem', borderRadius: '15px', position: 'relative' }}>
                            <Eye size={32} color="white" />
                            <div className="pulse" style={{ position: 'absolute', top: -5, right: -5, width: '12px', height: '12px', background: '#ef4444', borderRadius: '50%' }}></div>
                        </div>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '2.2rem', fontWeight: '900', color: 'white', letterSpacing: '-1.5px' }}>VECINOJOS <span style={{ color: '#38bdf8', fontSize: '1rem', verticalAlign: 'middle', background: 'rgba(56, 189, 248, 0.1)', padding: '4px 10px', borderRadius: '20px', marginLeft: '10px' }}>BETA SEGURA</span></h2>
                            <p style={{ margin: 0, color: '#94a3b8', fontWeight: 'bold', fontSize: '0.9rem' }}>SEGURIDAD COLABORATIVA & INTELIGENCIA ARTIFICIAL VECINAL</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.5rem 1rem', borderRadius: '30px', border: '1px solid #10b981', color: '#10b981', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                            <Cpu size={14} /> AI-CENSOR ACTIVE (99.9% ACCURACY)
                        </div>
                        <button onClick={onClose} className="btn-glass" style={{ padding: '0.8rem', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                            <X size={24} color="#ef4444" />
                        </button>
                    </div>
                </div>

                <div style={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
                    
                    {step === 'lobby' && (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem', textAlign: 'center' }}>
                            <div className="glass-panel" style={{ maxWidth: '600px', padding: '3rem', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <Shield size={80} color="#38bdf8" style={{ marginBottom: '2rem' }} />
                                <h3 style={{ fontSize: '2rem', color: 'white', marginBottom: '1rem' }}>Comparte tu Seguridad</h3>
                                <p style={{ color: '#94a3b8', lineHeight: '1.6', marginBottom: '2.5rem' }}>
                                    Vecinojos permite a los vecinos autorizados compartir sus cámaras de seguridad (hogar, vehículos o negocios) para crear una red de protección comunitaria. 
                                    <br/><br/>
                                    <strong style={{ color: '#ef4444' }}>⚠️ REGLAS ESTRICTAS:</strong> Nuestra IA censura automáticamente contenido sexual, violencia o ataques ilegales. No se permite la autotutela.
                                </p>
                                
                                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                                    <button onClick={handleStartValidation} disabled={isValidating} className="btn btn-primary" style={{ padding: '1.2rem 2.5rem', borderRadius: '50px', fontSize: '1.1rem', background: '#38bdf8' }}>
                                        {isValidating ? 'Validando Identidad...' : 'Ingresar con Mi Identidad Digital'}
                                    </button>
                                    <button className="btn-glass" style={{ padding: '1.2rem 2.5rem', borderRadius: '50px' }}>Más Información</button>
                                </div>

                                {isValidating && (
                                    <div style={{ marginTop: '2rem', width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                                        <div className="loading-bar" style={{ width: '60%', height: '100%', background: '#38bdf8', borderRadius: '2px' }}></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {step === 'monitoring' && (
                        <>
                            {/* Sidebar de Cámaras / Filtros */}
                            <div style={{ width: '350px', background: 'rgba(0,0,0,0.3)', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <button className="btn btn-primary" style={{ width: '100%', gap: '0.8rem', background: '#10b981' }}>
                                        <Camera size={18} /> VINCULAR MI CÁMARA
                                    </button>
                                    <div style={{ position: 'relative' }}>
                                        <input type="text" placeholder="Buscar zona o calle..." style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem 1rem 1rem 3rem', borderRadius: '12px', color: 'white' }} />
                                        <Globe size={18} color="#475569" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                                    </div>
                                </div>

                                <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                    {MOCK_CAMERAS.map(cam => (
                                        <button 
                                            key={cam.id}
                                            onClick={() => setSelectedCam(cam)}
                                            style={{ 
                                                width: '100%', padding: '1rem', background: selectedCam?.id === cam.id ? 'rgba(56, 189, 248, 0.1)' : 'rgba(255,255,255,0.02)',
                                                border: '1px solid', borderColor: selectedCam?.id === cam.id ? '#38bdf8' : 'rgba(255,255,255,0.05)',
                                                borderRadius: '16px', textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s'
                                            }}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                                <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 'bold' }}>● {cam.status}</span>
                                                <span style={{ fontSize: '0.6rem', color: '#94a3b8' }}>{cam.views} WATCHING</span>
                                            </div>
                                            <div style={{ color: 'white', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '4px' }}>{cam.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{cam.category} • {cam.provider}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Main Camera View */}
                            <div style={{ flex: 1, position: 'relative', background: '#000', display: 'flex', flexDirection: 'column' }}>
                                {selectedCam ? (
                                    <>
                                        <div style={{ flex: 1, position: 'relative' }}>
                                            {/* Simulated Camera Feed */}
                                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, #0f172a, #1e293b)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <div style={{ textAlign: 'center' }}>
                                                    <Video size={60} color="#334155" />
                                                    <p style={{ color: '#334155', marginTop: '1rem', fontWeight: 'bold', letterSpacing: '2px' }}>CONNECTING TO END-TO-END FEED...</p>
                                                </div>
                                            </div>

                                            {/* Mock Overlay Interface */}
                                            <div style={{ position: 'absolute', inset: 0, padding: '2rem', pointerEvents: 'none', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <div style={{ background: 'rgba(0,0,0,0.6)', padding: '0.8rem 1.5rem', borderRadius: '8px', borderLeft: '4px solid #ef4444', color: 'white' }}>
                                                        <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>CAMERA NODE {selectedCam.id}</div>
                                                        <div style={{ fontWeight: 'bold' }}>{selectedCam.name.toUpperCase()}</div>
                                                    </div>
                                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                                        <div style={{ background: 'rgba(0,0,0,0.6)', padding: '0.5rem 1rem', borderRadius: '8px', color: '#10b981', border: '1px solid #10b981', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                                            REC ● LIVE 4K
                                                        </div>
                                                        <div style={{ background: 'rgba(0,0,0,0.6)', padding: '0.5rem 1rem', borderRadius: '8px', color: '#38bdf8', border: '1px solid #38bdf8', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                                            AI SHIELD ON
                                                        </div>
                                                    </div>
                                                </div>

                                                <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', display: 'flex', gap: '1rem', pointerEvents: 'auto' }}>
                                                    <button className="btn-glass" style={{ width: '40px', height: '40px', borderRadius: '8px', padding: 0 }}><Settings size={18} /></button>
                                                    <button className="btn-glass" style={{ width: '40px', height: '40px', borderRadius: '8px', padding: 0 }}><ShieldAlert size={18} /></button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Camera Controls Bar */}
                                        <div style={{ padding: '1.5rem 2rem', background: '#020617', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                                                <div>
                                                    <div style={{ fontSize: '0.6rem', color: '#64748b' }}>MODO DE VISUALIZACIÓN</div>
                                                    <div style={{ color: 'white', fontWeight: 'bold', fontSize: '0.9rem' }}>TIEMPO REAL (LATENCIA 30ms)</div>
                                                </div>
                                                <div style={{ width: '1px', height: '30px', background: 'rgba(255,255,255,0.1)' }}></div>
                                                <div>
                                                    <div style={{ fontSize: '0.6rem', color: '#64748b' }}>IA CENSURA</div>
                                                    <div style={{ color: '#10b981', fontWeight: 'bold', fontSize: '0.9rem' }}>PROTEGIDO CONTRA EXPLICIT CONTENT</div>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '0.8rem' }}>
                                                <button className="btn-glass" style={{ borderRadius: '12px', padding: '0.7rem 1.2rem', color: '#312e81' }}>HISTORIAL CLOUD</button>
                                                <button className="btn btn-primary" style={{ borderRadius: '12px', padding: '0.7rem 1.2rem', background: '#ef4444', border: 'none' }}>REPORTAR ACTIVIDAD SOSPECHOSA</button>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#334155', gap: '1.5rem' }}>
                                        <MapIcon size={120} opacity={0.3} />
                                        <div style={{ textAlign: 'center' }}>
                                            <h4 style={{ color: '#475569', fontSize: '1.5rem', margin: 0 }}>VISTA GLOBAL ACTIVA</h4>
                                            <p style={{ color: '#334155' }}>Selecciona una cámara del panel lateral para iniciar el monitoreo asistido por IA</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>

                {/* Footer Status */}
                <div style={{ padding: '0.8rem 2rem', background: '#020617', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem', color: '#475569', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <span>SISTEMA VECINOJOS V1.0 - PROTOCOLO ComunaSmart</span>
                        <span>ENCIPRATADO AES-256 PARA PRIVACIDAD HABITACIONAL</span>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <span style={{ color: '#10b981' }}>AI NODE STATUS: OPTIMAL</span>
                        <div style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
