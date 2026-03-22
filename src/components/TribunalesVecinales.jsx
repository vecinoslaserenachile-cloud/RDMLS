import React, { useState, useEffect } from 'react';
import { 
    X as CloseIcon, Scale, Gavel, Landmark, ShieldCheck, 
    BookOpen, AlertCircle, ChevronRight, UserCheck,
    MessageSquare, History, FileText
} from 'lucide-react';

const COURTS = [
    { 
        id: 'jpl', 
        name: 'Tribunal de la Buena Vecindad (Serenito)', 
        level: 'Justicia de Proximidad',
        description: 'El primer paso para resolver conflictos de convivencia, ruidos y reglamentos de barrio.',
        icon: Scale
    },
    { 
        id: 'apelaciones', 
        name: 'Corte de la Segunda Mirada (El Faro)', 
        level: 'Revisión Panorámica',
        description: 'Desde lo alto del Faro, revisamos las sentencias para asegurar la equidad en toda la comuna.',
        icon: Landmark
    },
    { 
        id: 'suprema', 
        name: 'Consejo Supremo de la Recova', 
        level: 'Máxima Tradición y Ley',
        description: 'La máxima instancia donde los valores históricos y la ley soberana dictan el camino final.',
        icon: Gavel
    },
    { 
        id: 'tc', 
        name: 'Guardianes del Legado (Bisabuelo)', 
        level: 'Control de la Carta Fundamental',
        description: 'Garantizamos que nada vulnere los valores éticos y constitucionales que fundaron nuestra ciudad.',
        icon: ShieldCheck
    }
];

export default function TribunalesVecinales({ onClose }) {
    const [step, setStep] = useState('lobby'); // lobby, input, process, ruling
    const [selectedCourt, setSelectedCourt] = useState(null);
    const [caseTitle, setCaseTitle] = useState('');
    const [caseDescription, setCaseDescription] = useState('');
    const [ruling, setRuling] = useState(null);
    const [loading, setLoading] = useState(false);

    const processCase = () => {
        if (!caseTitle || !caseDescription) return;
        setLoading(true);
        setStep('process');
        
        // Simulate "AI" legal analysis based on Chilean Law
        setTimeout(() => {
            const result = generateRuling(selectedCourt.id, caseDescription);
            setRuling(result);
            setLoading(false);
            setStep('ruling');
        }, 3000);
    };

    const generateRuling = (courtId, desc) => {
        // Mocking legal responses based on Chilean terminology
        const base = `VISTO: El requerimiento vecinal relativo a "${caseTitle}". CONSIDERANDO: Los artículos pertinentes de la Constitución y la normativa municipal vigente... `;
        
        switch(courtId) {
            case 'jpl':
                return {
                    verdict: 'RESOLUCIÓN MUNICIPAL',
                    content: base + 'Se determina la aplicación de una medida reparatoria inmediata y una multa de 2 UTM si no se cumple el acuerdo de convivencia vecinal.',
                    legalBase: 'Ley 18.287 sobre procedimiento ante Juzgados de Policía Local.'
                };
            case 'apelaciones':
                return {
                    verdict: 'SENTENCIA DE REVISIÓN',
                    content: base + 'Se confirma la sentencia de primera instancia en lo principal, con costas. Se observa una correcta aplicación de los principios de equidad y justicia.',
                    legalBase: 'Código Orgánico de Tribunales (COT).'
                };
            case 'suprema':
                return {
                    verdict: 'SENTENCIA DE CASACIÓN',
                    content: base + 'ESTA CORTE ACUERDA: Rechazar el recurso de queja. La ley ha sido aplicada en su sentido natural y obvio dentro del marco de la soberanía nacional.',
                    legalBase: 'Jurisprudencia Unificada de la Excma. Corte Suprema.'
                };
            case 'tc':
                return {
                    verdict: 'FALLO CONSTITUCIONAL',
                    content: base + 'EL TRIBUNAL DECLARA: El acto administrativo impugnado se ajusta a las garantías fundamentales del Art. 19 de la Constitución Política de la República.',
                    legalBase: 'Constitución Política de la República de Chile (1980/2023).'
                };
            default: return { verdict: 'DUDOSO', content: 'Falta de competencia.', legalBase: 'N/A' };
        }
    };

    return (
        <div style={{ 
            position: 'fixed', inset: 0, zIndex: 100080, 
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
            color: 'white', display: 'flex', flexDirection: 'column'
        }}>
            {/* Header Institucional */}
            <header style={{ 
                padding: '1.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.1)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                background: 'rgba(2, 6, 23, 0.4)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: '#d4af37', padding: '10px', borderRadius: '12px' }}>
                        <Scale size={24} color="white" />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '900', letterSpacing: '1px' }}>TRIBUNALES VECINALES SMART</h2>
                        <div style={{ fontSize: '0.7rem', color: '#cbd5e1', fontWeight: 'bold' }}>MUNICIPALIDAD DE LA SERENA • EDUCACIÓN CÍVICA IA</div>
                    </div>
                </div>
                <button onClick={onClose} className="btn-glass" style={{ padding: '0.8rem', borderRadius: '50%' }}>
                    <CloseIcon size={20} />
                </button>
            </header>

            <main style={{ flex: 1, padding: '2rem', overflowY: 'auto', display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '100%', maxWidth: '900px' }}>
                    {step === 'lobby' && (
                        <div className="animate-fade-in">
                            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Plataforma Inmersiva de Justicia</h1>
                                <p style={{ color: '#e2e8f0', fontSize: '1.1rem' }}>Aprende, ensaya y resuelve situaciones bajo el marco legal de Chile con el apoyo de nuestra inteligencia artificial.</p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                                {COURTS.map(court => (
                                    <button 
                                        key={court.id}
                                        onClick={() => { setSelectedCourt(court); setStep('input'); }}
                                        className="glass-panel"
                                        style={{ 
                                            padding: '2rem', textAlign: 'center', borderRadius: '24px', 
                                            border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer',
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-10px)';
                                            e.currentTarget.style.borderColor = '#d4af37';
                                            e.currentTarget.style.boxShadow = '0 20px 40px rgba(212, 175, 55, 0.1)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                    >
                                        <div style={{ background: 'rgba(212, 175, 55, 0.1)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                            <court.icon size={32} color="#d4af37" />
                                        </div>
                                        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: 'white', fontWeight: 'bold' }}>{court.name}</h3>
                                        <div style={{ fontSize: '0.7rem', color: '#fbbf24', fontWeight: '900', marginBottom: '1rem', letterSpacing: '1px' }}>{court.level.toUpperCase()}</div>
                                        <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.6', margin: 0 }}>{court.description}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 'input' && (
                        <div className="glass-panel animate-slide-up" style={{ padding: '3rem', borderRadius: '32px', border: '1px solid #d4af3740' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                                <selectedCourt.icon size={40} color="#d4af37" />
                                <div>
                                    <h2 style={{ margin: 0 }}>Presentación de Requerimiento</h2>
                                    <p style={{ margin: 0, color: '#e2e8f0' }}>Estás ante el/la: {selectedCourt.name}</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#d4af37' }}>TEMA / CARÁTULA DEL CASO</label>
                                    <input 
                                        type="text" 
                                        placeholder="Ej: Conflicto por ruidos molestos en Calle Prat..." 
                                        value={caseTitle}
                                        onChange={(e) => setCaseTitle(e.target.value)}
                                        style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '12px', color: 'white', fontSize: '1.1rem' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#d4af37' }}>DESCRIPCIÓN DE LOS HECHOS / ARGUMENTOS</label>
                                    <textarea 
                                        placeholder="Describe la situación actual, los problemas detectados y por qué solicitas la intervención de este tribunal..." 
                                        value={caseDescription}
                                        onChange={(e) => setCaseDescription(e.target.value)}
                                        rows={6}
                                        style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '12px', color: 'white', resize: 'none', lineHeight: '1.6' }}
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button onClick={() => setStep('lobby')} className="btn-glass" style={{ flex: 1, padding: '1.2rem', borderRadius: '16px' }}>CANCELAR</button>
                                    <button onClick={processCase} className="btn btn-primary" style={{ flex: 2, padding: '1.2rem', borderRadius: '16px', background: '#d4af37', color: 'white', border: 'none', fontWeight: 'bold' }}>INICIAR PROCESO JUDICIAL</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 'process' && (
                        <div style={{ textAlign: 'center', padding: '5rem 0' }}>
                            <div className="animate-pulse" style={{ marginBottom: '2rem' }}>
                                <Scale size={80} color="#d4af37" style={{ margin: '0 auto' }} />
                            </div>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Analizando Marco Legal Chileno...</h2>
                            <p style={{ color: '#e2e8f0' }}>Consultando jurisprudencia, la Constitución de la República y ordenanzas municipales de La Serena.</p>
                            <div style={{ width: '200px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', margin: '2rem auto', overflow: 'hidden' }}>
                                <div className="loading-progress" style={{ height: '100%', background: '#d4af37', width: '0%', animation: 'loading-dna 3s linear infinite' }}></div>
                            </div>
                        </div>
                    )}

                    {step === 'ruling' && (
                        <div className="glass-panel animate-slide-up" style={{ padding: '4rem', borderRadius: '32px', border: '2px solid #d4af37', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '-1px', right: '4rem', background: '#d4af37', color: 'black', padding: '0.4rem 1.2rem', borderRadius: '0 0 12px 12px', fontWeight: '900', fontSize: '0.7rem', letterSpacing: '2px' }}>CASO CERRADO</div>
                            
                            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                                <h4 style={{ color: '#d4af37', letterSpacing: '2px', marginBottom: '0.5rem' }}>{ruling.verdict}</h4>
                                <h1 style={{ fontSize: '2.4rem', margin: 0 }}>REPÚBLICA DE CHILE</h1>
                                <p style={{ color: '#64748b' }}>{selectedCourt.name.toUpperCase()}</p>
                            </div>

                            <div style={{ background: 'white', color: '#0f172a', padding: '3rem', borderRadius: '12px', marginBottom: '2rem', boxShadow: 'inset 0 0 40px rgba(0,0,0,0.05)', fontFamily: 'serif', fontSize: '1.1rem', lineHeight: '2' }}>
                                <p style={{ whiteSpace: 'pre-wrap' }}>{ruling.content}</p>
                                <div style={{ marginTop: '3rem', borderTop: '1px solid #e2e8f0', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ color: '#475569', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                        <span style={{ color: '#d4af37' }}>Base Legal:</span> {ruling.legalBase}
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ width: '120px', height: '1px', background: '#e2e8f0', margin: '0 auto 10px' }}></div>
                                        <div style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>MINISTRO FE PÚBLICA (IA)</div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button onClick={() => setStep('lobby')} className="btn btn-primary" style={{ flex: 1, padding: '1.2rem', borderRadius: '16px', background: '#d4af37', color: 'white', border: 'none' }}>ACEPTAR Y VOLVER</button>
                                <button onClick={() => alert('Generando archivo PDF con firma digital...')} className="btn-glass" style={{ flex: 1, padding: '1.2rem', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                    <FileText size={18} /> DESCARGAR ACTA
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <style>{`
                @keyframes loading-dna {
                    0% { width: 0%; transform: translateX(-100%); }
                    50% { width: 100%; transform: translateX(0%); }
                    100% { width: 0%; transform: translateX(100%); }
                }
                .loading-progress {
                    animation: loading-dna 3s linear infinite;
                }
                .animate-fade-in { animation: fadeIn 0.8s ease-out; }
                .animate-slide-up { animation: slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
}
