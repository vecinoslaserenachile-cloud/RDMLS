import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ShieldCheck, 
    Landmark, 
    Users, 
    Briefcase, 
    FileText, 
    Map, 
    Globe, 
    Siren, 
    AlertTriangle, 
    ChevronRight, 
    Activity, 
    CheckCircle2, 
    Clock, 
    Radio, 
    Phone, 
    Vote, 
    TrendingUp,
    Search,
    MessageSquare,
    Play
} from 'lucide-react';

export default function GoreDashboard() {
    const [activeView, setActiveView] = useState('dpr'); // 'dpr' or 'gore'
    const navigate = useNavigate();

    return (
        <div className="animate-fade-in" style={{ padding: '0 1rem 3rem 1rem', maxWidth: '1400px', margin: '0 auto' }}>
            {/* Header Section */}
            <div style={{ textAlign: 'center', margin: '2rem 0' }}>
                <div style={{ display: 'inline-flex', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '1rem', alignItems: 'center', gap: '0.8rem' }}>
                    <div className="pulse" style={{ width: '10px', height: '10px', background: '#38bdf8', borderRadius: '50%' }}></div>
                    <span style={{ color: '#cbd5e1', fontSize: '0.9rem', fontWeight: 'bold', letterSpacing: '1px' }}>REGIÓN DE COQUIMBO SMART CITY</span>
                </div>
                <h1 style={{ fontSize: '2.8rem', margin: '0 0 1rem 0', fontWeight: '900', letterSpacing: '-1px', color: 'white' }}>
                    Gobierno Regional y Delegación <span style={{ color: '#38bdf8' }}>Smart</span>
                </h1>
                <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
                    Portal Único del Ciudadano. Acceda a los servicios del Gobierno Central a través de la Delegación Presidencial Regional o interactúe con los fondos y proyectos del Gobierno Regional (GORE y CORE).
                </p>
            </div>

            {/* View Selector (DPR vs GORE) */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
                <button 
                    onClick={() => setActiveView('dpr')}
                    className={`btn-glass hover-scale ${activeView === 'dpr' ? 'pulse' : ''}`}
                    style={{ 
                        display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem 2.5rem', borderRadius: '20px', 
                        background: activeView === 'dpr' ? 'linear-gradient(135deg, rgba(220, 38, 38, 0.4), rgba(37, 99, 235, 0.4))' : 'rgba(255,255,255,0.05)',
                        border: activeView === 'dpr' ? '2px solid rgba(220, 38, 38, 0.6)' : '1px solid rgba(255,255,255,0.1)',
                        transition: 'all 0.3s'
                    }}
                >
                    <div style={{ background: activeView === 'dpr' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)', padding: '0.8rem', borderRadius: '50%' }}>
                        <ShieldCheck size={32} color={activeView === 'dpr' ? '#fff' : '#94a3b8'} />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <span style={{ display: 'block', fontWeight: 'bold', fontSize: '1.2rem', color: activeView === 'dpr' ? '#fff' : '#cbd5e1' }}>Delegación Presidencial</span>
                        <span style={{ fontSize: '0.85rem', color: activeView === 'dpr' ? '#f1f5f9' : '#64748b' }}>Seguridad, Seremías y Gobierno Central</span>
                    </div>
                </button>

                <button 
                    onClick={() => setActiveView('gore')}
                    className={`btn-glass hover-scale ${activeView === 'gore' ? 'pulse' : ''}`}
                    style={{ 
                        display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem 2.5rem', borderRadius: '20px', 
                        background: activeView === 'gore' ? 'linear-gradient(135deg, rgba(234, 179, 8, 0.3), rgba(22, 163, 74, 0.3))' : 'rgba(255,255,255,0.05)',
                        border: activeView === 'gore' ? '2px solid rgba(234, 179, 8, 0.6)' : '1px solid rgba(255,255,255,0.1)',
                        transition: 'all 0.3s'
                    }}
                >
                    <div style={{ background: activeView === 'gore' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)', padding: '0.8rem', borderRadius: '50%' }}>
                        <Landmark size={32} color={activeView === 'gore' ? '#fff' : '#94a3b8'} />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <span style={{ display: 'block', fontWeight: 'bold', fontSize: '1.2rem', color: activeView === 'gore' ? '#fff' : '#cbd5e1' }}>GORE y Consejeros (CORE)</span>
                        <span style={{ fontSize: '0.85rem', color: activeView === 'gore' ? '#f1f5f9' : '#64748b' }}>Inversión, FNDR y Fomento Productivo</span>
                    </div>
                </button>
            </div>

            {/* DELEGACIÓN PRESIDENCIAL VIEW */}
            {activeView === 'dpr' && (
                <div className="animate-slide-up">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', padding: '1rem', background: 'rgba(220, 38, 38, 0.1)', borderRadius: '12px', borderLeft: '4px solid #ef4444' }}>
                        <img src="/escudo.png" alt="Gobierno de Chile" style={{ height: '40px', filter: 'grayscale(100%) brightness(200%)' }} />
                        <div>
                            <h2 style={{ margin: 0, color: 'white', fontSize: '1.5rem' }}>Delegación Presidencial Regional de Coquimbo</h2>
                            <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem' }}>Delegado: Víctor Pino | Representación del Presidente José Antonio Kast</p>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                        {/* Ventanilla Única SEREMIS */}
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '24px', border: '1px solid rgba(56, 189, 248, 0.3)', background: 'linear-gradient(135deg, rgba(15,23,42,0.8), rgba(0,0,0,0.6))' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ padding: '12px', background: 'rgba(56, 189, 248, 0.2)', borderRadius: '16px', color: '#38bdf8' }}><FileText size={28} /></div>
                                <h3 style={{ margin: 0, color: 'white', fontSize: '1.4rem' }}>Ventanilla Única SEREMIS</h3>
                            </div>
                            <p style={{ color: '#94a3b8', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: '1.5' }}>Acceda a trámites y audiencias unificadas con todas las Secretarías Regionales Ministeriales (Salud, Educación, Obras Públicas, MIDESO).</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                <button className="btn-glass" style={{ justifyContent: 'space-between', padding: '1rem' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Phone size={18} /> Solicitar Audiencia SEREMI</span>
                                    <ChevronRight size={18} />
                                </button>
                                <button className="btn-glass" style={{ justifyContent: 'space-between', padding: '1rem' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Search size={18} /> Seguimiento de Trámite Central</span>
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>

                        {/* C5 Regional Security */}
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '24px', border: '1px solid rgba(239, 68, 68, 0.3)', background: 'linear-gradient(135deg, rgba(239,68,68,0.1), rgba(0,0,0,0.6))', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, right: 0, background: '#ef4444', color: 'white', padding: '4px 12px', borderBottomLeftRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <div className="pulse" style={{ width: '6px', height: '6px', background: 'white', borderRadius: '50%' }}></div> EN VIVO
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.2)', borderRadius: '16px', color: '#ef4444' }}><Siren size={28} /></div>
                                <h3 style={{ margin: 0, color: 'white', fontSize: '1.4rem' }}>C5 Regional (Seguridad)</h3>
                            </div>
                            <p style={{ color: '#94a3b8', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: '1.5' }}>Coordinación directa inter-comunal con Carabineros, PDI y unidades de televigilancia de las 15 comunas.</p>
                            
                            <div style={{ background: 'rgba(0,0,0,0.5)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.2)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <AlertTriangle color="#ef4444" size={24} />
                                <div>
                                    <strong style={{ color: '#ef4444', display: 'block', fontSize: '0.9rem' }}>Alerta Activa: Control Fronterizo</strong>
                                    <span style={{ color: '#cbd5e1', fontSize: '0.8rem' }}>Operativo conjunto DPR y Carabineros.</span>
                                </div>
                            </div>

                            <button className="btn-glass" style={{ width: '100%', padding: '1rem', borderColor: '#ef4444', color: '#ff8a8a' }}>
                                <Siren size={18} style={{ marginRight: '8px' }} /> Denuncia Segura C5
                            </button>
                        </div>

                        {/* Hub Comunicacional DPR */}
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '24px', border: '1px solid rgba(34, 197, 94, 0.3)', background: 'linear-gradient(135deg, rgba(34,197,94,0.1), rgba(0,0,0,0.6))' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ padding: '12px', background: 'rgba(34, 197, 94, 0.2)', borderRadius: '16px', color: '#22c55e' }}><Radio size={28} /></div>
                                <h3 style={{ margin: 0, color: 'white', fontSize: '1.4rem' }}>Vocería Regional (SEGEGOB)</h3>
                            </div>
                            <p style={{ color: '#94a3b8', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: '1.5' }}>Radio Digital Gubernamental, puntos de prensa del Delegado y Alertas Regionales SENAPRED.</p>
                            
                            <div style={{ background: 'rgba(0,0,0,0.5)', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(34,197,94,0.3)', marginBottom: '1rem' }}>
                                <div style={{ position: 'relative', height: '120px', background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img src="https://img.youtube.com/vi/HHHC7oEyyj4/maxresdefault.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} alt="Stream" />
                                    <div style={{ position: 'absolute', background: 'rgba(0,0,0,0.6)', padding: '12px', borderRadius: '50%', cursor: 'pointer' }}><Play color="white" /></div>
                                </div>
                                <div style={{ padding: '0.8rem' }}>
                                    <strong style={{ color: 'white', display: 'block', fontSize: '0.9rem' }}>Boletín DPR en vivo</strong>
                                    <span style={{ color: '#22c55e', fontSize: '0.8rem' }}>Transmitiendo ahora...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* GOBIERNO REGIONAL (GORE) VIEW */}
            {activeView === 'gore' && (
                <div className="animate-slide-up">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', padding: '1rem', background: 'rgba(234, 179, 8, 0.1)', borderRadius: '12px', borderLeft: '4px solid #eab308' }}>
                        <Landmark color="#eab308" size={40} />
                        <div>
                            <h2 style={{ margin: 0, color: 'white', fontSize: '1.5rem' }}>Gobierno Regional de Coquimbo (GORE)</h2>
                            <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem' }}>Gobernador(a) Regional y Cuerpo Colegiado CORE</p>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                        {/* El Smart CORE */}
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '24px', border: '1px solid rgba(234, 179, 8, 0.3)', background: 'linear-gradient(135deg, rgba(234,179,8,0.1), rgba(0,0,0,0.6))' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ padding: '12px', background: 'rgba(234, 179, 8, 0.2)', borderRadius: '16px', color: '#eab308' }}><Users size={28} /></div>
                                <h3 style={{ margin: 0, color: 'white', fontSize: '1.4rem' }}>Smart CORE En Vivo</h3>
                            </div>
                            <p style={{ color: '#94a3b8', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: '1.5' }}>Conozca a los Consejeros Regionales por provincia, sus comisiones activas y el detalle de cada votación en tiempo real.</p>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                <div style={{ background: 'rgba(0,0,0,0.5)', padding: '0.8rem', borderRadius: '8px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <strong style={{ display: 'block', color: 'white' }}>Elqui</strong>
                                    <span style={{ color: '#eab308', fontSize: '1.2rem', fontWeight: 'bold' }}>7</span>
                                </div>
                                <div style={{ background: 'rgba(0,0,0,0.5)', padding: '0.8rem', borderRadius: '8px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <strong style={{ display: 'block', color: 'white' }}>Limarí</strong>
                                    <span style={{ color: '#eab308', fontSize: '1.2rem', fontWeight: 'bold' }}>5</span>
                                </div>
                                <div style={{ background: 'rgba(0,0,0,0.5)', padding: '0.8rem', borderRadius: '8px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <strong style={{ display: 'block', color: 'white' }}>Choapa</strong>
                                    <span style={{ color: '#eab308', fontSize: '1.2rem', fontWeight: 'bold' }}>4</span>
                                </div>
                            </div>

                            <button className="btn-glass" style={{ width: '100%', padding: '1rem', borderColor: '#eab308', color: '#fde047' }}>
                                Acceder a Transparencia CORE
                            </button>
                        </div>

                        {/* Monitor FNDR */}
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '24px', border: '1px solid rgba(16, 185, 129, 0.3)', background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(0,0,0,0.6))' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '16px', color: '#10b981' }}><TrendingUp size={28} /></div>
                                <h3 style={{ margin: 0, color: 'white', fontSize: '1.4rem' }}>Monitor FNDR (Fondos)</h3>
                            </div>
                            <p style={{ color: '#94a3b8', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: '1.5' }}>Mapa interactivo con la ejecución presupuestaria del Fondo Nacional de Desarrollo Regional en las 15 comunas.</p>
                            
                            <div style={{ position: 'relative', height: '140px', background: '#020617', borderRadius: '12px', border: '1px solid rgba(16,185,129,0.2)', marginBottom: '1.5rem', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Map color="#10b981" size={40} style={{ opacity: 0.5 }} />
                                <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.8)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', color: '#10b981', fontWeight: 'bold' }}>Mapa de Inversión 2026</div>
                            </div>

                            <button className="btn-glass" style={{ width: '100%', padding: '1rem', borderColor: '#10b981', color: '#6ee7b7' }}>
                                Explorar Proyectos Regionales
                            </button>
                        </div>

                        {/* Decisión Ciudadana Regional */}
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '24px', border: '1px solid rgba(139, 92, 246, 0.3)', background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(0,0,0,0.6))' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ padding: '12px', background: 'rgba(139, 92, 246, 0.2)', borderRadius: '16px', color: '#8b5cf6' }}><Vote size={28} /></div>
                                <h3 style={{ margin: 0, color: 'white', fontSize: '1.4rem' }}>Decisión Ciudadana (GORE)</h3>
                            </div>
                            <p style={{ color: '#94a3b8', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: '1.5' }}>Participe en la priorización de grandes obras regionales: hospitales, embalses, conectividad y fomento productivo.</p>
                            
                            <div style={{ background: 'rgba(0,0,0,0.5)', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(139, 92, 246, 0.2)', marginBottom: '1rem' }}>
                                <strong style={{ color: 'white', display: 'block', marginBottom: '8px' }}>Consulta Activa (Provincia de Limarí)</strong>
                                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' }}>
                                    <div style={{ width: '65%', height: '100%', background: '#8b5cf6', borderRadius: '4px' }}></div>
                                </div>
                                <span style={{ color: '#c4b5fd', fontSize: '0.8rem' }}>65% Participación alcanzada (Electrónica)</span>
                            </div>

                            <button className="btn-glass" style={{ width: '100%', padding: '1rem', borderColor: '#8b5cf6', color: '#c4b5fd' }}>
                                Identificarse e Ingresar Voto
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
