import React, { useState, useEffect } from 'react';
import { X, Star, Compass, Info, Map as MapIcon, Aperture, Sparkles, Orbit } from 'lucide-react';

export default function ObservatorioSmart({ onClose }) {
    const [activeObject, setActiveObject] = useState(null);
    const [viewMode, setViewMode] = useState('sky'); // 'sky', 'observatories', 'humboldt', 'iss'
    const [issPos, setIssPos] = useState({ lat: -29.90, lng: -71.25, alt: 408 });

    // Simulación de Telemetría ISS
    useEffect(() => {
        const interval = setInterval(() => {
            setIssPos(prev => ({
                ...prev,
                lng: prev.lng + 0.01 > 180 ? -180 : prev.lng + 0.01,
                lat: prev.lat + 0.005 > 90 ? -90 : prev.lat + 0.005,
                alt: 408 + (Math.random() * 2 - 1)
            }));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const constellations = [
        { id: 'crux', name: 'Cruz del Sur', info: 'La constelación más emblemática del hemisferio sur. Sirve para encontrar el polo sur celeste.', coords: { top: '60%', left: '40%' } },
        { id: 'centaurus', name: 'Centauro', info: 'Contiene a Alfa Centauri, el sistema estelar más cercano al Sol.', coords: { top: '45%', left: '55%' } },
        { id: 'orion', name: 'Orión', info: 'Visible en verano, destaca por las \"Tres Marías\" o el Cinturón de Orión.', coords: { top: '20%', left: '30%' } },
        { id: 'scorpio', name: 'Escorpio', info: 'Se ve majestuoso en el cenit durante el invierno serenense.', coords: { top: '70%', left: '70%' } },
    ];

    const observatories = [
        { name: 'Cerro Tololo', type: 'Inter-American Observatory', desc: 'Uno de los más antiguos y prestigiosos de la región.' },
        { name: 'La Silla', type: 'ESO', desc: 'Ubicado en la parte sur del desierto de Atacama.' },
        { name: 'Las Campanas', type: 'Carnegie Institution', desc: 'Hogar de los telescopios Magallanes.' },
        { name: 'Gemini South', type: 'International', desc: 'Telescopio de 8.1 metros con tecnología de vanguardia.' },
        { name: 'Observatorio AURA', type: 'Association of Universities for Research in Astronomy', desc: 'Gestiona varios proyectos científicos clave en la zona.' }
    ];

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 100004,
            background: 'radial-gradient(circle at center, #020617 0%, #000 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
        }}>
            {/* Star Background Animation */}
            <div className="star-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }} />

            <div className="observatory-panel glass-panel" style={{
                width: '100%', maxWidth: '1200px', height: '90vh',
                display: 'flex', flexDirection: 'column', position: 'relative',
                border: '1px solid rgba(56, 189, 248, 0.3)', overflow: 'hidden'
            }}>
                {/* Header */}
                <div style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(56, 189, 248, 0.05)', borderBottom: '1px solid rgba(56, 189, 248, 0.2)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div className="animate-pulse-slow" style={{ background: '#38bdf8', padding: '1rem', borderRadius: '12px', boxShadow: '0 0 20px rgba(56, 189, 248, 0.5)' }}>
                            <Orbit size={28} color="black" />
                        </div>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: '900', letterSpacing: '2px' }}>DOMO ASTRONÓMICO SMART VLS</h2>
                            <p style={{ margin: 0, color: '#38bdf8', fontSize: '0.8rem', fontWeight: 'bold' }}>LA SERENA: CAPITAL MUNDIAL DE LA ASTRONOMÍA</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="btn-glass" style={{ width: '45px', height: '45px', borderRadius: '50%' }}>
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation Tabs */}
                <div style={{ display: 'flex', background: 'rgba(255,255,255,0.02)', padding: '0.5rem' }}>
                    <button onClick={() => setViewMode('sky')} style={{ flex: 1, padding: '1rem', border: 'none', background: viewMode === 'sky' ? 'rgba(56, 189, 248, 0.1)' : 'transparent', color: viewMode === 'sky' ? '#38bdf8' : 'white', fontWeight: 'bold', cursor: 'pointer', borderRadius: '8px' }}>
                        🔭 Cielo Estelar VLS
                    </button>
                    <button onClick={() => setViewMode('observatories')} style={{ flex: 1, padding: '1rem', border: 'none', background: viewMode === 'observatories' ? 'rgba(56, 189, 248, 0.1)' : 'transparent', color: viewMode === 'observatories' ? '#38bdf8' : 'white', fontWeight: 'bold', cursor: 'pointer', borderRadius: '8px' }}>
                        🏢 Red de Observatorios
                    </button>
                    <button onClick={() => setViewMode('humboldt')} style={{ flex: 1, padding: '1rem', border: 'none', background: viewMode === 'humboldt' ? 'rgba(56, 189, 248, 0.1)' : 'transparent', color: viewMode === 'humboldt' ? '#38bdf8' : 'white', fontWeight: 'bold', cursor: 'pointer', borderRadius: '8px' }}>
                        🌊 Efecto Humboldt & Clima
                    </button>
                    <button onClick={() => setViewMode('iss')} style={{ flex: 1, padding: '1rem', border: 'none', background: viewMode === 'iss' ? 'rgba(56, 189, 248, 0.1)' : 'transparent', color: viewMode === 'iss' ? '#38bdf8' : 'white', fontWeight: 'bold', cursor: 'pointer', borderRadius: '8px' }}>
                        🚀 Telemetría ISS Live
                    </button>
                </div>

                {/* Main Content Area */}
                <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                    
                    {viewMode === 'sky' && (
                        <div style={{ position: 'relative', width: '100%', height: '100%', background: 'url(/stars_placeholder.png) center/cover' }}>
                            {/* Interactive Constellations */}
                            {constellations.map(c => (
                                <div 
                                    key={c.id}
                                    style={{ position: 'absolute', ...c.coords, cursor: 'pointer' }}
                                    onClick={() => setActiveObject(c)}
                                >
                                    <div className="constellation-node" style={{ width: '15px', height: '15px', background: 'white', borderRadius: '50%', boxShadow: '0 0 10px white', animation: 'pulse 2s infinite' }} />
                                    <span style={{ fontSize: '0.7rem', color: '#38bdf8', whiteSpace: 'nowrap', position: 'absolute', top: '20px', left: '-50%' }}>{c.name}</span>
                                </div>
                            ))}

                            {/* Info Box */}
                            {activeObject && (
                                <div className="glass-panel" style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', padding: '1.5rem', background: 'rgba(15, 23, 42, 0.9)', border: '1px solid #38bdf8' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <h3 style={{ margin: 0, color: '#38bdf8' }}>{activeObject.name}</h3>
                                        <button onClick={() => setActiveObject(null)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}><X size={16} /></button>
                                    </div>
                                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#cbd5e1' }}>{activeObject.info}</p>
                                </div>
                            )}

                            {/* Discovery Tip */}
                            <div style={{ position: 'absolute', top: '20px', right: '20px', maxWidth: '250px', textAlign: 'right' }}>
                                <div style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 'bold', marginBottom: '5px' }}>TELEMETRÍA ORBITAL</div>
                                <div style={{ fontSize: '0.9rem', color: 'white', background: 'rgba(0,255,100,0.1)', padding: '10px', borderRadius: '12px' }}>
                                     <strong>ISS (ZARYA)</strong> <br />
                                     Alt: {issPos.alt.toFixed(2)} km <br />
                                     V: 27,600 km/h
                                </div>
                            </div>
                        </div>
                    )}

                    {viewMode === 'iss' && (
                        <div style={{ padding: '3rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
                                <div className="glass-panel" style={{ padding: '2rem', background: '#000', border: '2px solid #38bdf8' }}>
                                    <h3 style={{ color: '#38bdf8', marginBottom: '1.5rem' }}>Monitor de Rastreo Satelital</h3>
                                    <div style={{ height: '300px', background: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop) center/cover', borderRadius: '16px', position: 'relative' }}>
                                        <div style={{ position: 'absolute', top: '40%', left: '30%', width: '40px', height: '40px', background: 'rgba(56, 189, 248, 0.4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Orbit size={24} color="#38bdf8" className="pulse-slow" />
                                        </div>
                                        <div style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'black', padding: '5px 10px', fontSize: '0.7rem' }}>TRACKING: OVER SOUTH PACIFIC</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid #38bdf8' }}>
                                        <span style={{ fontSize: '0.7rem', color: '#38bdf8' }}>PRÓXIMO AVISTAMIENTO (LA SERENA)</span>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '10px 0' }}>22:45 <span style={{fontSize: '0.8rem'}}>HOY</span></div>
                                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>Magnitud: -3.8 (Extremadamente Brillante)</p>
                                    </div>
                                    <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid #10b981' }}>
                                        <span style={{ fontSize: '0.7rem', color: '#10b981' }}>ESTADO DE TELEMETRÍA</span>
                                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '10px 0' }}>NOMINAL / EN ÓRBITA</div>
                                        <div style={{ display: 'flex', gap: '5px' }}>
                                            {[...Array(10)].map((_, i) => <div key={i} style={{ height: '10px', flex: 1, background: '#10b981', opacity: 0.3 + Math.random() * 0.7 }} />)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(56, 189, 248, 0.05)' }}>
                                <p style={{ margin: 0, color: '#38bdf8', fontSize: '0.9rem', lineHeight: '1.6' }}>
                                    <strong>¿Sabías qué?</strong> Cuando la ISS pasa sobre La Serena, es el tercer objeto más brillante en el cielo. Gracias a la pureza de nuestra atmósfera (Humboldt), se puede ver a simple vista como una estrella que se mueve rápido y no parpadea.
                                </p>
                            </div>
                        </div>
                    )}

                    {viewMode === 'observatories' && (
                        <div style={{ padding: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', height: '100%', overflowY: 'auto' }}>
                            {observatories.map((obs, idx) => (
                                <div key={idx} className="glass-panel hover-lift" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                                    <h3 style={{ color: 'white', margin: '0 0 0.5rem 0' }}>{obs.name}</h3>
                                    <div style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: 'bold', marginBottom: '0.5rem' }}>{obs.type}</div>
                                    <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>{obs.desc}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {viewMode === 'humboldt' && (
                        <div style={{ padding: '3rem', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div className="glass-panel" style={{ maxWidth: '800px', width: '100%', padding: '2rem', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid #38bdf8' }}>
                                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ color: '#38bdf8', fontSize: '1.5rem', marginBottom: '1rem' }}>El Fenómeno de la Corriente de Humboldt</h3>
                                        <p style={{ color: 'white', lineHeight: '1.6' }}>
                                            La Corriente de Humboldt enfría el aire costero, estabilizando la atmósfera y disipando las nubes. Esto resulta en **cielos despejados casi todo el año**, una condición única que atrae a astrónomos de todo el mundo a la Región de Coquimbo.
                                        </p>
                                        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                                            <div style={{ padding: '0.8rem', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '8px', flex: 1 }}>
                                                <div style={{ fontSize: '0.7rem', color: '#38bdf8' }}>DÍAS DESPEJADOS AL AÑO</div>
                                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>300+</div>
                                            </div>
                                            <div style={{ padding: '0.8rem', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '8px', flex: 1 }}>
                                                <div style={{ fontSize: '0.7rem', color: '#38bdf8' }}>CALIDAD ATMOSFÉRICA</div>
                                                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>EXCEPCIONAL</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ flex: 1, height: '300px', background: 'url(/humboldt_current_map.png) center/contain no-repeat', opacity: 0.8 }} />
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                {/* Footer Info */}
                <div style={{ padding: '1rem', background: 'black', color: '#64748b', fontSize: '0.7rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>DATOS PROPORCIONADOS POR LA RED DE OBSERVATORIOS DE LA REGIÓN DE COQUIMBO</div>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <span>ESTADO CIELO: 🌌 DESPEJADO</span>
                        <span style={{ color: '#10b981' }}>SISTEMA ACTIVO</span>
                    </div>
                </div>
            </div>

            <style>{`
                .star-bg {
                    background-image: 
                        radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 40px),
                        radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 30px),
                        radial-gradient(white, rgba(255,255,255,.1) 2px, transparent 40px);
                    background-size: 550px 550px, 350px 350px, 250px 250px;
                    background-position: 0 0, 40px 60px, 130px 270px;
                }
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(1.1); opacity: 1; }
                    100% { transform: scale(1); opacity: 0.8; }
                }
            `}</style>
        </div>
    );
}
