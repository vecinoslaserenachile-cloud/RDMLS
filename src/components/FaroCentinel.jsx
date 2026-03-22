import React, { useState } from 'react';
import { Radar, ThermometerSun, CheckCircle, AlertTriangle, ShieldCheck, Award, X } from 'lucide-react';

export default function FaroCentinel({ onClose }) {
    const [activeSurvey, setActiveSurvey] = useState(0);
    const [completed, setCompleted] = useState(false);

    const encuestas = [
        {
            id: 1,
            title: 'Higiene Urbana y Recolección',
            question: '¿Cómo evaluaría el servicio de recolección de basura domiciliaria en su sector durante la última semana?',
            options: ['Excelente', 'Aceptable, pero con retrasos', 'Deficiente'],
            reward: 5
        },
        {
            id: 2,
            title: 'Iluminación y Seguridad',
            question: '¿Considera que la iluminación LED de su calle principal es suficiente para disuadir incivilidades?',
            options: ['Sí, es adecuada y potente', 'No, hay zonas muy oscuras', 'Requiere mantención urgente'],
            reward: 5
        }
    ];

    const handleVote = () => {
        if (activeSurvey < encuestas.length - 1) {
            setActiveSurvey(prev => prev + 1);
        } else {
            setCompleted(true);
            // Simular entrega de fichas reales despachando evento custom
            window.dispatchEvent(new CustomEvent('tokens-updated', { detail: parseInt(localStorage.getItem('vls_tokens') || '0') + 10 }));
            // En un caso real: localstorage.setItem o llamada a API
        }
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100000, background: '#020617', color: 'white', display: 'flex' }}>
            {/* Panel Izquierdo: Social Listening */}
            <div style={{ flex: 1, borderRight: '1px solid rgba(255,255,255,0.1)', padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', background: 'radial-gradient(circle at top left, #1e3a8a, #020617)' }}>
                <Radar size={50} color="#38bdf8" style={{ marginBottom: '1rem', animation: 'spin-slow 8s linear infinite' }} />
                <h1 style={{ fontSize: '2.5rem', fontWeight: '900', margin: '0 0 0.5rem 0' }}>Faro Centinel</h1>
                <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '2rem' }}>
                    Motor de Social Listening. Análisis preventivo de macro-datos públicos vecinales mediante Inteligencia Artificial.
                </p>

                <div style={{ width: '100%', background: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '1.5rem', borderRadius: '16px', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#cbd5e1' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><AlertTriangle size={18} color="#f59e0b" /> Tópico Caliente (RRSS)</span>
                        <span style={{ fontSize: '0.8rem', background: '#f59e0b20', color: '#f59e0b', padding: '2px 8px', borderRadius: '10px' }}>Atención Moderada</span>
                    </div>
                    <strong>Baches en Av. Cuatro Esquinas</strong>
                    <p style={{ fontSize: '0.9rem', color: '#94a3b8', margin: '10px 0 0 0' }}>Detección de 45 menciones ciudadanas georreferenciadas en las últimas 12 horas. Solicitud de bacheo enviada a Dirección de Obras.</p>
                </div>

                <div style={{ width: '100%', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '1.5rem', borderRadius: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#cbd5e1' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck size={18} color="#10b981" /> Reporte Resuelto</span>
                        <span style={{ fontSize: '0.8rem', background: '#10b98120', color: '#10b981', padding: '2px 8px', borderRadius: '10px' }}>Estatus: Cerrado</span>
                    </div>
                    <strong>Mantención Lumínica Sector Antena</strong>
                    <p style={{ fontSize: '0.9rem', color: '#94a3b8', margin: '10px 0 0 0' }}>Cuadrilla despachada. Poste 124B reparado según incidencias de Centinel.</p>
                </div>
            </div>

            {/* Panel Derecho: Termómetro Vecinal (Encuestas) */}
            <div style={{ flex: 1, padding: '3rem 4rem', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <button onClick={onClose} style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                    <X size={30} />
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '3rem' }}>
                    <div style={{ background: '#ec4899', padding: '15px', borderRadius: '16px' }}>
                        <ThermometerSun size={32} color="white" />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '2rem', margin: 0 }}>Termómetro Vecinal</h2>
                        <span style={{ color: '#ec4899', fontWeight: 'bold' }}>Módulo de Sondeo Ciudadano</span>
                    </div>
                </div>

                {!completed ? (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
                            <span style={{ color: '#94a3b8', fontSize: '0.9rem', fontWeight: 'bold', letterSpacing: '2px' }}>ENCUESTA {activeSurvey + 1} DE {encuestas.length}</span>
                            <h3 style={{ fontSize: '1.5rem', color: '#38bdf8', marginTop: '10px' }}>{encuestas[activeSurvey].title}</h3>
                        </div>

                        <p style={{ fontSize: '1.2rem', lineHeight: '1.5', marginBottom: '2.5rem' }}>
                            {encuestas[activeSurvey].question}
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {encuestas[activeSurvey].options.map((opt, idx) => (
                                <button key={idx} onClick={handleVote} style={{ textAlign: 'left', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', padding: '1.2rem', borderRadius: '12px', color: 'white', fontSize: '1rem', cursor: 'pointer', transition: '0.2s', display: 'flex', alignItems: 'center', gap: '10px' }} className="hover-lift">
                                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #94a3b8' }}></div>
                                    {opt}
                                </button>
                            ))}
                        </div>

                        <div style={{ marginTop: 'auto', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid #f59e0b', padding: '1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', color: '#fcd34d' }}>
                            <Award size={20} /> Recompensa por participar: <strong>{encuestas[activeSurvey].reward} Fichas VLS</strong>
                        </div>
                    </div>
                ) : (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                        <CheckCircle size={80} color="#10b981" style={{ marginBottom: '2rem' }} />
                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>¡Sondeo Completado!</h2>
                        <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '400px' }}>
                            Gracias por contribuir al pulso de la ciudad. Sus respuestas ayudarán a la priorización de recursos municipales.
                        </p>
                        <div style={{ fontSize: '1.5rem', color: '#f59e0b', fontWeight: '900', background: 'rgba(245, 158, 11, 0.1)', padding: '1rem 3rem', borderRadius: '50px', border: '1px solid #f59e0b' }}>
                            +10 FICHAS VLS ACREDITADAS
                        </div>
                    </div>
                )}
            </div>
            
            <style>{`
                @keyframes spin-slow { 100% { transform: rotate(360deg); } }
                .hover-lift:hover { background: rgba(56, 189, 248, 0.1) !important; border-color: #38bdf8 !important; transform: translateY(-2px); }
            `}</style>
        </div>
    );
}
