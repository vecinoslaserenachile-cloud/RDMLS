import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Network, GitMerge, Search, PlusCircle, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { auth } from '../utils/firebase';

export default function GenealogyPortal() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [activeBranch, setActiveBranch] = useState(null);
    const [showJoinForm, setShowJoinForm] = useState(false);
    const [joinData, setJoinData] = useState({ name: '', details: '', relation: '' });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (auth) {
            const unsubscribe = auth.onAuthStateChanged(u => {
                setUser(u);
            });
            return () => unsubscribe && unsubscribe();
        }
    }, []);

    const branches = [
        { id: 'prehispanic', name: 'Pueblos Originarios & Diaguitas', color: '#f59e0b', nodes: ['Familia Huentelaf', 'Linaje Talinay'] },
        { id: 'colonial', name: 'Fundadores & Colonia', color: '#10b981', nodes: ['Serena Centro (1544)', 'Cabildo Histórico'] },
        { id: 'inmigracion', name: 'Inmigración Europea y Árabe', color: '#38bdf8', nodes: ['Siria/Palestina (1900)', 'Británicos/Crosthwaite'] },
        { id: 'contemporanea', name: 'Familias Contemporáneas', color: '#ec4899', nodes: ['Sector La Florida', 'Las Compañías', 'Rural'] }
    ];

    const handleJoinRequest = (e) => {
        e.preventDefault();
        if (!user) {
            alert("Debe iniciar sesión para enviar una solicitud de unión a rama genealógica.");
            return;
        }
        setSubmitted(true);
        setTimeout(() => {
            setShowJoinForm(false);
            setSubmitted(false);
            setJoinData({ name: '', details: '', relation: '' });
            alert("Solicitud recibida. Antropólogos municipales revisarán los registros históricos.");
        }, 2000);
    };

    return (
        <div className="page-container" style={{ minHeight: '100vh', paddingTop: '80px', paddingBottom: '40px', background: 'radial-gradient(circle at center, rgba(10, 17, 40, 0.9) 0%, #050b14 100%)' }}>
            <div className="container">
                <button onClick={() => activeBranch ? setActiveBranch(null) : navigate('/')} className="btn-glass animate-fade-in" style={{ padding: '0.5rem 1rem', borderRadius: '50px', marginBottom: '2rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ArrowLeft size={18} /> {activeBranch ? 'Volver al Árbol' : 'Volver al Inicio'}
                </button>

                <div className="neocolonial-frame animate-slide-up" style={{ textAlign: 'center', marginBottom: '3rem', padding: '3rem', border: '1px solid #00e5ff', boxShadow: '0 0 30px rgba(0, 229, 255, 0.2)' }}>
                    <Network size={64} color="#00e5ff" style={{ marginBottom: '1rem' }} />
                    <h1 className="serena-title-glow" style={{ fontSize: '2.5rem', textTransform: 'uppercase' }}>Raíces Serenenses</h1>
                    <p style={{ color: '#00e5ff', fontSize: '1.2rem', fontWeight: 'bold' }}>Plataforma Genealógica e Histórica de La Serena</p>
                    <p className="text-secondary" style={{ maxWidth: '800px', margin: '1rem auto' }}>Conecta tus orígenes con los fundadores, pueblos prehispánicos e inmigrantes que construyeron nuestra ciudad. El árbol de la vida serenense.</p>
                </div>

                {!activeBranch && !showJoinForm && (
                    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
                        {/* CSS GRID ROOT NODE */}
                        <div className="glass-panel pulse-slow" style={{ padding: '2rem', border: '2px solid #00e5ff', borderRadius: '50%', width: '150px', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', boxShadow: '0 0 40px rgba(0, 229, 255, 0.4)' }}>
                            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem', textAlign: 'center' }}>Serena<br />1544</span>
                        </div>

                        {/* CONNECTOR LINE */}
                        <div style={{ width: '2px', height: '50px', background: 'linear-gradient(to bottom, #00e5ff, transparent)' }}></div>

                        {/* BRANCHES GRID */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', width: '100%' }}>
                            {branches.map((branch) => (
                                <div key={branch.id} onClick={() => setActiveBranch(branch)} className="glass-panel gaudi-curves" style={{ cursor: 'pointer', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', border: `1px solid ${branch.color}`, transition: 'all 0.3s', boxShadow: `0 0 20px ${branch.color}30` }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                                    <GitMerge size={40} color={branch.color} style={{ marginBottom: '1rem' }} />
                                    <h3 style={{ color: 'white', textAlign: 'center', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{branch.name}</h3>
                                    <p className="text-muted" style={{ fontSize: '0.85rem', textAlign: 'center' }}>Explorar Linajes</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeBranch && !showJoinForm && (
                    <div className="glass-panel animate-scale-in" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto', border: `1px solid ${activeBranch.color}`, boxShadow: `0 0 40px ${activeBranch.color}20` }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
                            <h2 style={{ color: activeBranch.color, margin: 0 }}>Rama: {activeBranch.name}</h2>
                            <Search size={24} color={activeBranch.color} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {activeBranch.nodes.map((node, i) => (
                                <div key={i} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: `4px solid ${activeBranch.color}`, background: 'rgba(255,255,255,0.02)' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: `${activeBranch.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <ShieldAlert size={20} color={activeBranch.color} />
                                    </div>
                                    <div>
                                        <h4 style={{ margin: '0 0 0.2rem 0', color: 'white', fontSize: '1.1rem' }}>{node}</h4>
                                        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem' }}>Registros históricos validados DIBAM</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                            <button onClick={() => setShowJoinForm(true)} className="btn-primary pulse" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', fontSize: '1.1rem', borderRadius: '50px', background: activeBranch.color, border: 'none' }}>
                                <PlusCircle size={20} /> Solicitar unirme a esta Rama Histórica
                            </button>
                            {!user && <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '1rem' }}>Requiere autenticación de usuario (JWT/Google)</p>}
                        </div>
                    </div>
                )}

                {showJoinForm && (
                    <div className="glass-panel animate-slide-up" style={{ padding: '3rem', maxWidth: '600px', margin: '0 auto', border: '1px solid #00e5ff' }}>
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ color: '#00e5ff' }}>Solicitud de Nexo Genealógico</h2>
                            <p className="text-secondary" style={{ fontSize: '0.9rem' }}>Su información será confidencial y evaluada por la Corporación Municipal.</p>
                        </div>

                        {submitted ? (
                            <div style={{ textAlign: 'center', padding: '3rem 0', color: '#10b981' }}>
                                <CheckCircle2 size={64} className="animate-pulse" style={{ margin: '0 auto 1rem' }} />
                                <h3>Enviando Datos...</h3>
                            </div>
                        ) : (
                            <form onSubmit={handleJoinRequest} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ color: 'white', marginBottom: '0.5rem', display: 'block' }}>Nombre Completo (Linaje)</label>
                                    <input
                                        type="text" required
                                        className="input-base"
                                        style={{ width: '100%', border: '1px solid rgba(0, 229, 255, 0.4)' }}
                                        value={joinData.name} onChange={e => setJoinData({ ...joinData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label style={{ color: 'white', marginBottom: '0.5rem', display: 'block' }}>Rama Histórica a Vincular</label>
                                    <input
                                        type="text" readOnly
                                        className="input-base"
                                        style={{ width: '100%', background: 'rgba(0,0,0,0.5)', cursor: 'not-allowed' }}
                                        value={activeBranch?.name || ''}
                                    />
                                </div>
                                <div>
                                    <label style={{ color: 'white', marginBottom: '0.5rem', display: 'block' }}>Fundamentación o Documento de Prueba</label>
                                    <textarea
                                        required
                                        className="input-base"
                                        style={{ width: '100%', minHeight: '100px', resize: 'vertical', border: '1px solid rgba(0, 229, 255, 0.4)' }}
                                        value={joinData.details} onChange={e => setJoinData({ ...joinData, details: e.target.value })}
                                        placeholder="Describa parentescos, apellidos maternos, o suba certificados..."
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                    <button type="button" onClick={() => setShowJoinForm(false)} className="btn-glass" style={{ flex: 1 }}>Cancelar</button>
                                    <button type="submit" className="btn-primary" style={{ flex: 2, background: 'linear-gradient(45deg, #00e5ff, #3b82f6)' }}>Enviar Solicitud Legal</button>
                                </div>
                            </form>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
