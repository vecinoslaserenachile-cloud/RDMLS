import React, { useState } from 'react';
import { ShieldCheck, User, Building2, CheckCircle, Camera, FileText, ArrowRight, X, AlertCircle, Landmark, Activity } from 'lucide-react';

export default function IdentityGate({ onClose, onVerified }) {
    const [mode, setMode] = useState(null); // 'citizen' or 'institution'
    const [step, setStep] = useState(1);
    const [isVerifying, setIsVerifying] = useState(false);

    const handleVerify = () => {
        setIsVerifying(true);
        setTimeout(() => {
            setIsVerifying(false);
            setStep(3);
        }, 3000);
    };

    const handleComplete = () => {
        onVerified(mode);
        onClose();
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(2, 6, 23, 0.95)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div className="glass-panel scale-in" style={{ maxWidth: '500px', width: '100%', padding: '2.5rem', borderRadius: '32px', border: '1px solid rgba(56, 189, 248, 0.3)', background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, #000 100%)', position: 'relative' }}>
                
                <button onClick={onClose} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                    <X size={24} />
                </button>

                {!mode && (
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ background: 'rgba(56, 189, 248, 0.1)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                            <ShieldCheck size={40} color="#38bdf8" />
                        </div>
                        <h2 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '0.5rem', color: 'white' }}>Validación Inteligente</h2>
                        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Seleccione su perfil para una validación segura y legal.</p>
                        
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            <button 
                                onClick={() => setMode('citizen')}
                                className="btn-glass hover-lift" 
                                style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem', borderRadius: '20px', textAlign: 'left', border: '1px solid rgba(255,255,255,0.1)' }}
                            >
                                <div style={{ background: '#38bdf8', padding: '12px', borderRadius: '15px' }}><User color="black" /></div>
                                <div>
                                    <strong style={{ display: 'block', color: 'white', fontSize: '1.1rem' }}>Soy Ciudadano</strong>
                                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Validación Biométrica (RUT + Selfie)</span>
                                </div>
                            </button>

                            <button 
                                onClick={() => setMode('institution')}
                                className="btn-glass hover-lift" 
                                style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem', borderRadius: '20px', textAlign: 'left', border: '1px solid rgba(255,255,255,0.1)' }}
                            >
                                <div style={{ background: '#10b981', padding: '12px', borderRadius: '15px' }}><Building2 color="black" /></div>
                                <div>
                                    <strong style={{ display: 'block', color: 'white', fontSize: '1.1rem' }}>Soy Institución</strong>
                                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>KYB (E-RUT + Representación)</span>
                                </div>
                            </button>
                        </div>

                        <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', color: '#64748b', fontSize: '0.75rem' }}>
                            <Lock size={12} /> Cifrado de Grado Militar (AES-256)
                        </div>
                    </div>
                )}

                {mode === 'citizen' && (
                    <div style={{ textAlign: 'center' }}>
                        {step === 1 && (
                            <div className="fade-in">
                                <h3 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '1rem' }}>Escaneo de Cédula</h3>
                                <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Fotografía el frente y dorso de tu cédula de identidad.</p>
                                <div style={{ background: '#111', border: '2px dashed #334155', borderRadius: '20px', padding: '3rem', cursor: 'pointer', marginBottom: '1.5rem' }}>
                                    <Camera size={48} color="#38bdf8" style={{ margin: '0 auto 1rem auto' }} />
                                    <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>Capturar Documento</span>
                                </div>
                                <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', fontSize: '0.8rem', color: '#10b981', textAlign: 'left', display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <CheckCircle size={16} /> Verificaremos el Número de Serie con el SRCeI.
                                </div>
                                <button onClick={() => setStep(2)} className="btn-primary" style={{ width: '100%', padding: '1rem', borderRadius: '15px', background: '#38bdf8', border: 'none', color: 'black', fontWeight: 'bold', marginTop: '1.5rem' }}>Siguiente</button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="fade-in">
                                <h3 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '1rem' }}>Prueba de Vida</h3>
                                <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Mira a la cámara y parpadea para confirmar tu identidad.</p>
                                <div style={{ width: '250px', height: '250px', borderRadius: '50%', border: '4px solid #38bdf8', margin: '0 auto 1.5rem auto', overflow: 'hidden', background: '#000', position: 'relative' }}>
                                    <video style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <div className="scan-line" style={{ height: '2px', background: '#38bdf8', boxShadow: '0 0 15px #38bdf8' }}></div>
                                </div>
                                <button onClick={handleVerify} disabled={isVerifying} className="btn-primary" style={{ width: '100%', padding: '1rem', borderRadius: '15px', background: '#38bdf8', border: 'none', color: 'black', fontWeight: 'bold' }}>
                                    {isVerifying ? 'PROCESANDO BIOMETRÍA...' : 'EMPEZAR ESCANEO'}
                                </button>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="scale-in">
                                <div style={{ background: '#10b981', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                                    <CheckCircle size={40} color="black" />
                                </div>
                                <h3 style={{ fontSize: '1.8rem', color: 'white', marginBottom: '0.5rem' }}>Identidad Validada</h3>
                                <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>Bienvenido, vecino. Tu invitación oficial ha sido generada y encriptada en el padrón VLS 2026.</p>
                                
                                {/* Final Security Check for Invitation Delivery */}
                                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.3)', marginBottom: '1.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <span style={{ fontSize: '0.65rem', color: '#10b981', fontWeight: '900', letterSpacing: '1px' }}>
                                            DESLIZA PARA RETIRAR INVITACIÓN OFICIAL
                                        </span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="0" max="100" 
                                        defaultValue="0"
                                        onChange={(e) => {
                                            if (parseInt(e.target.value) > 95) {
                                                handleComplete();
                                            }
                                        }}
                                        style={{ width: '100%', height: '8px', borderRadius: '5px', background: '#1e293b', appearance: 'none', outline: 'none', cursor: 'pointer' }}
                                    />
                                </div>

                                <button onClick={handleComplete} className="btn-primary" style={{ width: '100%', padding: '1rem', borderRadius: '15px', background: '#10b981', border: 'none', color: 'black', fontWeight: 'bold', opacity: 0.5, cursor: 'not-allowed' }}>Esperando Firma...</button>
                            </div>
                        )}
                    </div>
                )}

                {mode === 'institution' && (
                    <div style={{ textAlign: 'center' }}>
                        {step === 1 && (
                            <div className="fade-in">
                                <h3 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '1rem' }}>Documentación KYB</h3>
                                <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Sube el E-RUT de la institución y la patente municipal vigente.</p>
                                <div style={{ display: 'grid', gap: '1rem' }}>
                                    <div style={{ background: '#111', padding: '1rem', borderRadius: '15px', border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <FileText color="#10b981" />
                                            <span style={{ color: '#cbd5e1' }}>E-RUT SII (PDF/Imagen)</span>
                                        </div>
                                        <button style={{ background: '#10b981', color: 'black', border: 'none', padding: '5px 10px', borderRadius: '8px', fontSize: '0.7rem' }}>Cargar</button>
                                    </div>
                                    <div style={{ background: '#111', padding: '1rem', borderRadius: '15px', border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <Landmark color="#10b981" />
                                            <span style={{ color: '#cbd5e1' }}>Patente / Acta de Constitución</span>
                                        </div>
                                        <button style={{ background: '#10b981', color: 'black', border: 'none', padding: '5px 10px', borderRadius: '8px', fontSize: '0.7rem' }}>Cargar</button>
                                    </div>
                                </div>
                                <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(255, 191, 0, 0.1)', borderRadius: '12px', fontSize: '0.8rem', color: '#f59e0b', textAlign: 'left', display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <AlertCircle size={16} /> Se requiere validación manual por parte de la Administración.
                                </div>
                                <button onClick={() => setStep(2)} className="btn-primary" style={{ width: '100%', padding: '1rem', borderRadius: '15px', background: '#10b981', border: 'none', color: 'black', fontWeight: 'bold', marginTop: '1.5rem' }}>Enviar para Revisión</button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="scale-in">
                                <div style={{ background: '#f59e0b', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                                    <Activity size={40} color="black" />
                                </div>
                                <h3 style={{ fontSize: '1.8rem', color: 'white', marginBottom: '0.5rem' }}>En Revisión</h3>
                                <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Hemos recibido tus documentos. Te notificaremos en menos de 24 horas tras validar la vigencia de tu institución.</p>
                                <button onClick={handleComplete} className="btn-primary" style={{ width: '100%', padding: '1rem', borderRadius: '15px', background: '#334155', border: 'none', color: 'white', fontWeight: 'bold' }}>Volver al Hub</button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <style>{`
                .scale-in { animation: scaleIn 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); }
                .fade-in { animation: fadeIn 0.4s ease-out; }
                @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                .scan-line {
                    position: absolute;
                    width: 100%;
                    animation: scan 2s linear infinite;
                }
                @keyframes scan {
                    0% { top: 0; }
                    100% { top: 100%; }
                }
                .btn-glass:hover {
                    background: rgba(255,255,255,0.05);
                    border-color: rgba(255,255,255,0.3) !important;
                }
            `}</style>
        </div>
    );
}

function Lock({ size, color }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;
}

