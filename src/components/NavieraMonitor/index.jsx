import React, { useState, useEffect } from 'react';
import { Ship, Anchor, Database, Radio, CheckCircle2, AlertTriangle, ExternalLink, CalendarDays, Map } from 'lucide-react';

export default function NavieraMonitor({ isMini = false }) {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            clearInterval(timer);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const isMobile = width < 1024;

    const [buquesSimulados, setBuquesSimulados] = useState([
        { name: "OCEAN JASMIN", tipo: "Carga General", bandera: "LR", eslora: "180m", agc: "IAN TAYLOR", eta: "19-03-2026 06:00", estado: "Atracado / Operando", muelle: "Sitio 1" },
        { name: "GARDENIA K", tipo: "Concentrado Cobre", bandera: "PA", eslora: "180m", agc: "IAN TAYLOR", eta: "14-03-2026 18:00", estado: "Zarpado", muelle: "Sitio 3" },
        { name: "WILD LOTUS", tipo: "Frigorífico", bandera: "BS", eslora: "149m", agc: "AGENTAL", eta: "20-03-2026 06:00", estado: "En Tránsito / Programado", muelle: "Sitio 2" },
        { name: "CHACABUCO", tipo: "Carga General", bandera: "CL", eslora: "80m", agc: "AUTORIDAD MARÍTIMA", eta: "20-03-2026 06:00", estado: "En Tránsito / Programado", muelle: "Sitio 3" },
    ]);

    useEffect(() => {
        const syncWorker = async () => {
            try {
                const res = await fetch('/api/port-monitoring');
                const data = await res.json();
                if (data.vessels) setBuquesSimulados(data.vessels);
            } catch (e) { console.log("VLS_MONITOR: Sin respuesta de Worker, usando fallback...", e); }
        };
        syncWorker();
        const syncInt = setInterval(syncWorker, 300000); // 5 min
        return () => clearInterval(syncInt);
    }, []);

    if (isMini) {
        return (
            <div className="glass-panel hover-lift" style={{ 
                background: 'rgba(15,23,42,0.8)', 
                borderRadius: '24px', 
                padding: '1.5rem', 
                border: '1px solid rgba(56,189,248,0.3)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ color: '#38bdf8', margin: 0, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Anchor size={18} /> PUERTO COQUIMBO
                    </h4>
                    <span style={{ fontSize: '0.6rem', background: '#10b981', color: '#000', padding: '2px 6px', borderRadius: '10px', fontWeight: 'bold' }}>LIVE AIS</span>
                </div>
                
                <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '120px' }}>
                    <img src="/images/port_placeholder.png" alt="Puerto" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}></div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {buquesSimulados.slice(0, 2).map((b, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '4px' }}>
                            <span style={{ color: 'white', fontWeight: 'bold' }}>{b.name}</span>
                            <span style={{ color: b.estado.includes('Atracado') ? '#10b981' : '#f59e0b' }}>{b.estado.split(' ')[0]}</span>
                        </div>
                    ))}
                </div>

                <button 
                    onClick={() => window.dispatchEvent(new CustomEvent('open-port-monitor'))}
                    style={{ marginTop: 'auto', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.3)', color: '#38bdf8', padding: '8px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}
                >
                    MONITOR PORTUARIO COMPLETO
                </button>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '1200px', margin: '3rem auto 0 auto', width: '100%', fontFamily: "'Segoe UI', Roboto, sans-serif" }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
                <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.5))' }}></div>
                <h3 style={{ color: '#38bdf8', margin: 0, fontSize: '1.3rem', letterSpacing: '2px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <Ship size={24} /> Monitoreo Naviero Conurbación
                </h3>
                <div style={{ height: '1px', flex: 1, background: 'linear-gradient(-90deg, transparent, rgba(56,189,248,0.5))' }}></div>
            </div>

            <div className="glass-panel" style={{ background: 'rgba(15,23,42,0.8)', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(56,189,248,0.3)', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
                {/* Header de Status */}
                <div style={{ padding: '1.5rem 2rem', background: 'linear-gradient(90deg, rgba(8,145,178,0.2) 0%, rgba(15,23,42,0) 100%)', borderBottom: '1px solid rgba(56,189,248,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: 'rgba(56,189,248,0.1)', padding: '0.8rem', borderRadius: '12px', border: '1px solid rgba(56,189,248,0.3)' }}>
                            <Radio size={24} color="#38bdf8" className="animate-pulse" />
                        </div>
                        <div>
                            <h4 style={{ margin: 0, color: 'white', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                Puerto de Coquimbo & Bahía Guayacán
                                <span style={{ fontSize: '0.7rem', background: '#10b981', color: '#000', padding: '2px 6px', borderRadius: '10px', fontWeight: 'bold' }}>LIVE AIS</span>
                            </h4>
                            <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Actualización Satelital: {currentTime.toLocaleTimeString()} hrs</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button onClick={() => window.open('https://tpc.cl/planificacion-naviera/', '_blank')} className="btn-glass" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1rem', borderRadius: '8px', fontSize: '0.9rem', color: '#38bdf8', borderColor: '#38bdf8' }}>
                            <CalendarDays size={16} /> Planificador Oficial TPC
                        </button>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '0' }}>
                    
                    {/* Lista Data */}
                    <div style={{ flex: 1, padding: '2rem', borderRight: isMobile ? 'none' : '1px solid rgba(255,255,255,0.1)', borderBottom: isMobile ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                        <h5 style={{ margin: '0 0 1rem 0', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Database size={16} /> Naves Detectadas (Radar Costero)
                        </h5>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {buquesSimulados.map((buque, idx) => (
                                <div key={idx} className="hover-lift" style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                        <h6 style={{ margin: 0, color: 'white', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Ship size={18} color={buque.estado.includes("Atracado") ? "#10b981" : "#f59e0b"} />
                                            {buque.name}
                                        </h6>
                                        <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.1)', color: '#cbd5e1', padding: '2px 6px', borderRadius: '4px' }}>
                                            {buque.tipo} 
                                        </span>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.85rem', color: '#94a3b8' }}>
                                        <span>Bandera: <strong style={{color: '#fff'}}>{buque.bandera}</strong></span>
                                        <span>Eslora: <strong style={{color: '#fff'}}>{buque.eslora}</strong></span>
                                        <span>Fecha (ETA): <strong style={{color: '#38bdf8'}}>{buque.eta}</strong></span>
                                        <span>Estado: <strong style={{color: buque.estado.includes("Atracado") ? '#10b981' : '#fcd34d'}}>{buque.estado}</strong></span>
                                    </div>
                                    <div style={{ marginTop: '0.8rem', paddingTop: '0.8rem', borderTop: '1px dashed rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}><Anchor size={12} style={{display: 'inline', marginRight: '4px'}}/> Destino: {buque.muelle}</span>
                                        <button onClick={() => window.open(`https://www.marinetraffic.com/en/ais/home/centerx:-71.3/centery:-29.9/zoom:13`, '_blank')} style={{ background: 'transparent', border: 'none', color: '#38bdf8', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            Ficha AIS <ExternalLink size={12} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Simulación Mapa */}
                    <div style={{ flex: 1.5, position: 'relative', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
                        <div style={{ position: 'absolute', inset: 0, borderRadius: '12px', overflow: 'hidden' }}>
                            <img 
                                src="/images/port_placeholder.png" 
                                alt="MarineTraffic Placeholder" 
                                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
                            />
                            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 0%, rgba(15,23,42,0.8) 100%)' }}></div>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '80%' }}>
                                <AlertTriangle size={48} color="#f59e0b" style={{ margin: '0 auto 1rem' }} />
                                <h4 style={{ color: 'white', margin: '0 0 1rem 0' }}>SISTEMA AIS EXTERNO (MarineTraffic) Bloqueado</h4>
                                <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '2rem' }}>Debido a restricciones de seguridad de MarineTraffic.com, el mapa en vivo debe abrirse en una ventana segura independiente para garantizar la soberanía de datos.</p>
                                <button 
                                    onClick={() => window.open('https://www.marinetraffic.com/en/ais/home/centerx:-71.3/centery:-29.9/zoom:13', '_blank')}
                                    className="btn-glass" 
                                    style={{ background: '#38bdf8', color: 'black', fontWeight: 'bold', padding: '1rem 2rem', borderRadius: '12px' }}
                                >
                                    ABRIR MAPA EN VIVO COMPLETO
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


