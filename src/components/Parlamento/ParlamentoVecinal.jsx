import React, { useState } from 'react';
import { 
    Users, Gavel, Vote, Award, ShieldCheck, 
    MessageSquare, Search, Filter, TrendingUp, 
    UserPlus, Heart, Star, CheckCircle2, AlertCircle
} from 'lucide-react';

/**
 * 🏛️ PARLAMENTO DEL ECOSISTEMA VECINAL
 * Órgano Consultivo y Votación Ciudadana VLS.
 */
const ParlamentoVecinal = ({ onClose }) => {
    const [view, setView] = useState('consejo'); // 'consejo' | 'propuestas' | 'votar'
    const [hasVoted, setHasVoted] = useState(false);
    const [votingId, setVotingId] = useState(null);

    const consejeros = [
        { id: 1, name: 'Don Ruperto', sector: 'Casco Histórico', votes: 452, bio: 'Vecino histórico, defensor del patrimonio arquitectónico.', medallas: ['Patrimonio', 'Experiencia'] },
        { id: 2, name: 'Sra. Elena', sector: 'Las Compañías', votes: 890, bio: 'Líder social en juntas de vecinos y comedores comunitarios.', medallas: ['Social', 'Voz del Pueblo'] },
        { id: 3, name: 'Camila Ríos', sector: 'Avenida del Mar', votes: 321, bio: 'Ecologista y experta en conservación oceánica.', medallas: ['Eco-Guerrera', 'Innovación'] },
        { id: 4, name: 'Mauricio Paz', sector: 'La Florida', votes: 567, bio: 'Emprendedor local y gestor de seguridad vecinal.', medallas: ['Pyme', 'Seguridad'] }
    ];

    const propuestas = [
        { id: 'P-01', title: 'Iluminación Led Peatonal Calle Prat', status: 'En Debate', support: 85 },
        { id: 'P-02', title: 'Nueva Ciclovía Conectividad VLS', status: 'Aprobada', support: 92 },
        { id: 'P-03', title: 'Clínica Veterinaria Móvil 24/7', status: 'Votación Abierta', support: 98 }
    ];

    const handleVote = (id) => {
        setVotingId(id);
        setTimeout(() => {
            setHasVoted(true);
            setVotingId(null);
        }, 1200);
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200000, background: 'rgba(2, 6, 23, 0.98)', color: 'white', display: 'flex', flexDirection: 'column', fontFamily: 'system-ui, sans-serif' }}>
            {/* Header Parlamento */}
            <header style={{ padding: '1.5rem 2rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(90deg, rgba(212, 175, 55, 0.1) 0%, transparent 100%)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ padding: '10px', background: '#d4af3720', borderRadius: '12px', border: '1px solid #d4af37' }}>
                        <Gavel color="#d4af37" size={32} />
                    </div>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '900', color: '#d4af37', letterSpacing: '2px' }}>
                            PARLAMENTO VLS
                        </h1>
                        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>CONSEJO CONSULTIVO DEL ECOSISTEMA CIUDADANO</span>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => setView('consejo')} className={`btn-gold ${view==='consejo'?'active':''}`} style={navBtnStyle}>EL CONSEJO</button>
                    <button onClick={() => setView('propuestas')} className={`btn-gold ${view==='propuestas'?'active':''}`} style={navBtnStyle}>PROPUESTAS</button>
                    <button onClick={() => setView('votar')} className={`btn-gold ${view==='votar'?'active':''}`} style={navBtnStyle}>VOTACIÓN CÍVICA</button>
                    <button onClick={onClose} style={{ marginLeft: '1rem', background: '#ef4444', border: 'none', color: 'white', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer' }}>✕</button>
                </div>
            </header>

            <main style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
                {view === 'consejo' && (
                    <div className="fade-in">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '2rem' }}>
                            {/* Panel Izquierdo: Resumen */}
                            <div>
                                <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '24px', position: 'sticky', top: 0 }}>
                                    <h3 style={{ borderBottom: '1px solid rgba(212,175,55,0.2)', paddingBottom: '10px', marginBottom: '1rem', fontSize: '0.9rem', color: '#d4af37' }}>ESTADO DEL CONSEJO</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Efectividad:</span>
                                            <span style={{ color: '#10b981', fontWeight: 'bold' }}>94%</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Vecinos Activos:</span>
                                            <span style={{ fontWeight: 'bold' }}>12.4K</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Sesiones 2026:</span>
                                            <span style={{ fontWeight: 'bold' }}>24</span>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '2rem', background: 'rgba(212,175,55,0.05)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(212,175,55,0.2)' }}>
                                        <p style={{ margin: 0, fontSize: '0.75rem', lineHeight: '1.5', color: '#d4af37' }}>
                                            "El Parlamento es el puente entre la tecnología y la convivencia vecinal. Aquí nace el sentido de comunidad."
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Panel Derecho: Consejeros */}
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                    <h2 style={{ margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <Users color="#d4af37" /> CONSEJEROS ELECTOS POR EL PUEBLO
                                    </h2>
                                    <button className="btn-gold" style={{ padding: '8px 16px' }}><UserPlus size={16} /> Postular al Consejo</button>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                                    {consejeros.map(c => (
                                        <div key={c.id} className="glass-panel hover-lift" style={{ borderRadius: '24px', padding: '1.5rem', borderTop: '4px solid #d4af37' }}>
                                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #d4af37, #b8860b)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Users size={30} color="white" />
                                                </div>
                                                <div>
                                                    <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{c.name}</h4>
                                                    <span style={{ fontSize: '0.8rem', color: '#d4af37', fontWeight: 'bold' }}>{c.sector}</span>
                                                </div>
                                            </div>
                                            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.5', height: '45px', overflow: 'hidden' }}>{c.bio}</p>
                                            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', margin: '15px 0' }}>
                                                {c.medallas.map(m => (
                                                    <span key={m} style={{ fontSize: '0.65rem', background: '#d4af3720', color: '#d4af37', padding: '2px 8px', borderRadius: '20px', border: '1px solid #d4af3740' }}>{m}</span>
                                                ))}
                                            </div>
                                            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                    <Heart size={14} color="#f43f5e" fill="#f43f5e" />
                                                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{c.votes} Apoyos</span>
                                                </div>
                                                <button className="btn-gold" style={{ fontSize: '0.7rem', padding: '4px 10px', borderRadius: '6px' }}>VER PERFIL</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {view === 'votar' && (
                    <div className="fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <div className="glass-panel" style={{ padding: '3rem', borderRadius: '32px', textAlign: 'center', border: '1px solid rgba(212,175,55,0.3)' }}>
                            <Vote size={64} color="#d4af37" style={{ marginBottom: '1.5rem' }} />
                            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>SISTEMA DE VOTACIÓN ELECTRÓNICA</h2>
                            <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem' }}>
                                Tu voto es encriptado y auditable. Elige a los representantes que guiarán las decisiones de inversión ciudadana en el ecosistema <strong>vecinoslaserena.cl</strong>.
                            </p>

                            {hasVoted ? (
                                <div style={{ background: '#10b98120', border: '1px solid #10b981', padding: '2rem', borderRadius: '24px' }}>
                                    <CheckCircle2 color="#10b981" size={48} style={{ marginBottom: '1rem' }} />
                                    <h3 style={{ color: '#10b981', margin: 0 }}>¡VOTO REGISTRADO EXITOSAMENTE!</h3>
                                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '10px' }}>Gracias por ejercer tu poder cívico. Los resultados se actualizarán en el próximo bloque de la red.</p>
                                </div>
                            ) : (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                                    {consejeros.map(c => (
                                        <button 
                                            key={c.id} 
                                            onClick={() => handleVote(c.id)}
                                            className="glass-panel hover-lift" 
                                            disabled={votingId !== null}
                                            style={{ padding: '2rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                                        >
                                            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#d4af3720', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                                <Vote size={24} color="#d4af37" />
                                            </div>
                                            <span style={{ fontWeight: 'bold', fontSize: '1rem', color: 'white' }}>{c.name}</span>
                                            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{c.sector}</span>
                                            <div style={{ marginTop: '1.5rem', width: '100%', padding: '8px', background: '#d4af37', color: '#020617', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.8rem' }}>
                                                {votingId === c.id ? 'PROCESANDO...' : 'VOTAR'}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {view === 'propuestas' && (
                    <div className="fade-in">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ margin: 0, color: '#d4af37', display: 'flex', alignItems: 'center', gap: '10px' }}><TrendingUp /> PROPUESTAS DEL CONSEJO</h2>
                            <button className="btn-gold"><Star size={16} /> Enviar Propuesta</button>
                        </div>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {propuestas.map(p => (
                                <div key={p.id} className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                    <div style={{ width: '80px', height: '80px', borderRadius: '12px', background: 'rgba(212,175,55,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(212,175,55,0.2)' }}>
                                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#d4af37' }}>{p.support}%</div>
                                        <div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>APOYO</div>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{p.title}</h3>
                                        <span style={{ fontSize: '0.8rem', color: p.status === 'Aprobada' ? '#10b981' : '#f59e0b', fontWeight: 'bold' }}>{p.status}</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button className="btn-gold" style={{ padding: '8px 20px' }}>APOYAR</button>
                                        <button className="btn-glass" style={{ padding: '8px' }}><MessageSquare size={16} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            <style>{`
                .btn-gold {
                    background: rgba(212, 175, 55, 0.1);
                    border: 1px solid #d4af37;
                    color: #d4af37;
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 0.75rem;
                    font-weight: bold;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .btn-gold:hover {
                    background: #d4af37;
                    color: #020617;
                }
                .btn-gold.active {
                    background: #d4af37;
                    color: #020617;
                    box-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
                }
                .glass-panel {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                .hover-lift:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.4);
                    background: rgba(255,255,255,0.05);
                }
                .fade-in {
                    animation: fadeIn 0.4s ease-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

const navBtnStyle = {
    letterSpacing: '1px'
};

export default ParlamentoVecinal;
