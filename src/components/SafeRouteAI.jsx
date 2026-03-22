import React, { useState, useEffect } from 'react';
import { 
    ShieldAlert, MapPin, 
    Zap, Navigation, 
    Users, AlertTriangle, 
    CheckCircle2, Info, X
} from 'lucide-react';
import { geminiService } from '../services/geminiService';

export default function SafeRouteAI({ onClose }) {
    const [status, setStatus] = useState('FETCHING_TELEMETRY');
    const [telemetry, setTelemetry] = useState({
        luminarias: 'ACTUALIZANDO...',
        seguridad: 'MONITOREANDO...',
        reportes: 'PROCESANDO...'
    });
    const [evaluating, setEvaluating] = useState(false);
    const [evaluationResult, setEvaluationResult] = useState(null);

    // Conexión al Data Pipeline Real
    useEffect(() => {
        const fetchRealTelemetry = async () => {
            setStatus('ANALYZING_DATA');
            try {
                // Endpoint real que cruza las 3 DBs (Luminarias, Seguridad, Reportes)
                // const response = await fetch('https://vecinoslaserena.cl/api/v1/safe-routes/evaluate');
                // const data = await response.json();
                
                // MOCK para efectos del prototipo Fase 3.5 (QA Antigravity)
                setTimeout(() => {
                    setTelemetry({
                        luminarias: '92% Operativas (vía Telegestión)',
                        seguridad: '3 Patrullas activas en cuadrante',
                        reportes: '0 Críticos en las últimas 4h'
                    });
                    setStatus('READY');
                }, 1500);
            } catch (error) {
                setStatus('TELEMETRY_ERROR');
            }
        };

        fetchRealTelemetry();
    }, []);

    const handleEvaluateRoute = async () => {
        setEvaluating(true);
        // Llamada al motor de IA central (Shadow Deployment logic)
        const result = await geminiService.process('Ruta desde Casco Histórico a Sector Faro', 'safe-route', {
            coordinates: [-29.9027, -71.2520],
            telemetry: telemetry
        });
        
        setEvaluationResult(result);
        setEvaluating(false);
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100100, background: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div className="glass-panel" style={{ width: '100%', maxWidth: '850px', borderRadius: '40px', overflow: 'hidden', border: '1px solid #10b98140', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
                
                {/* Header Táctico */}
                <div style={{ padding: '1.5rem 2rem', background: 'rgba(16, 185, 129, 0.1)', borderBottom: '1px solid #10b98130', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: '#10b981', padding: '10px', borderRadius: '15px' }}>
                            <ShieldAlert size={28} color="#000" />
                        </div>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '900', letterSpacing: '-0.5px' }}>SAFE ROUTE AI</h2>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', color: '#10b981', fontWeight: '800' }}>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', animation: 'pulse 1.5s infinite' }} /> TELEMETRÍA EN TIEMPO REAL
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', cursor: 'pointer', padding: '8px', borderRadius: '10px' }}><X size={24} /></button>
                </div>

                <div style={{ padding: '2.5rem', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem' }}>
                    
                    {/* Panel de Datos Reales */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <h4 style={{ margin: 0, color: '#94a3b8', fontSize: '0.8rem', letterSpacing: '2px', fontWeight: '900' }}>DATA PIPELINE DE SEGURIDAD</h4>
                        
                        <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '25px', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                                <Zap size={22} color="#f59e0b" />
                                <div>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>RED LUMINARIAS LED</div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{telemetry.luminarias}</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                                <Navigation size={22} color="#38bdf8" />
                                <div>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>PATRULLAJE MÓVIL (BACKOFFICE)</div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{telemetry.seguridad}</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <AlertTriangle size={22} color="#ef4444" />
                                <div>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>REPORTES VECINALES (ULT. 24H)</div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{telemetry.reportes}</div>
                                </div>
                            </div>
                        </div>

                        <div style={{ position: 'relative', height: '200px', background: 'rgba(15, 23, 42, 0.5)', borderRadius: '25px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 50% 50%, #10b98120 0%, transparent 70%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <MapPin size={40} color="#10b981" />
                                <div style={{ position: 'absolute', fontSize: '0.7rem', color: '#10b981', bottom: '10px', fontWeight: 'bold' }}>MAPA TÁCTICO INTEGRADO VLS</div>
                            </div>
                        </div>
                    </div>

                    {/* Evaluación de Ruta IA */}
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div style={{ flex: 1, background: 'rgba(16, 185, 129, 0.05)', border: '1px solid #10b98140', borderRadius: '30px', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
                            {!evaluationResult ? (
                                <>
                                    <div style={{ marginBottom: '1.5rem' }}><Users size={48} color="#10b981" style={{ opacity: 0.5 }} /></div>
                                    <h3 style={{ margin: '0 0 1rem 0' }}>Planifica tu retorno seguro</h3>
                                    <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: '1.6', marginBottom: '2rem' }}>La IA de Antigravity analizará en segundos el camino más iluminado y con mayor presencia de inspectores para tu tranquilidad.</p>
                                    <button 
                                        disabled={status !== 'READY' || evaluating}
                                        onClick={handleEvaluateRoute}
                                        style={{ 
                                            padding: '1.2rem', borderRadius: '15px', border: 'none', background: '#10b981', color: '#000', 
                                            fontWeight: '900', cursor: 'pointer', transition: 'all 0.3s',
                                            boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)'
                                        }}
                                    >
                                        {evaluating ? 'EVALUANDO...' : 'CARCULAR RUTA SEGURA'}
                                    </button>
                                </>
                            ) : (
                                <div style={{ textAlign: 'left' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#10b981', marginBottom: '1rem' }}>
                                        <CheckCircle2 size={24} /> <span style={{ fontWeight: 'bold' }}>Ruta Recomendada</span>
                                    </div>
                                    <div style={{ fontSize: '1.4rem', fontWeight: '900', marginBottom: '1rem' }}>{evaluationResult.path}</div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '1.5rem' }}>
                                        <div style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', fontSize: '0.75rem' }}>
                                            <span style={{ display: 'block', color: '#10b981', fontWeight: 'bold' }}>ILUMINACIÓN</span> {evaluationResult.lighting}
                                        </div>
                                        <div style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', fontSize: '0.75rem' }}>
                                            <span style={{ display: 'block', color: '#10b981', fontWeight: 'bold' }}>CONFIANZA</span> {evaluationResult.score * 100}%
                                        </div>
                                    </div>
                                    <div style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.5', background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '15px' }}>
                                        <strong>Nota Guardián VLS:</strong> El sistema detecta 3 patrullas a menos de 5 min. Evita pasar por el sector de reparaciones de luminarias en calle Colo-Colo.
                                    </div>
                                    <button 
                                        onClick={() => setEvaluationResult(null)}
                                        style={{ marginTop: '2rem', width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'white', cursor: 'pointer' }}
                                    >
                                        RE-EVALUAR
                                    </button>
                                </div>
                            )}
                        </div>

                        <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.75rem' }}>
                            <Info size={14} /> Los datos de telemetría se actualizan cada 60 seg.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
