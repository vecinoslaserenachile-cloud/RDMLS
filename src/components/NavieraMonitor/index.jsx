import React, { useState, useEffect } from 'react';
import { Ship, Anchor, Database, Radio, CheckCircle2, AlertTriangle, ExternalLink, CalendarDays, Map } from 'lucide-react';

export default function NavieraMonitor() {
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
                        <button onClick={() => window.open('https://tpc.cl/wp-content/uploads/2026/03/Planificacion-Naviera-12-03-2026.pdf', '_blank')} className="btn-glass" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1rem', borderRadius: '8px', fontSize: '0.9rem', color: '#38bdf8', borderColor: '#38bdf8' }}>
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
                                            <Ship size={18} color={buque.estado === "Atracado" ? "#10b981" : "#f59e0b"} />
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
                                        <span>Estado: <strong style={{color: buque.estado === "Atracado" ? '#10b981' : '#fcd34d'}}>{buque.estado}</strong></span>
                                    </div>
                                    <div style={{ marginTop: '0.8rem', paddingTop: '0.8rem', borderTop: '1px dashed rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}><Anchor size={12} style={{display: 'inline', marginRight: '4px'}}/> Destino: {buque.muelle}</span>
                                        <button onClick={() => window.open(`https://www.marinetraffic.com/en/ais/details/ships/shipid:0/vessel:${buque.name.replace(' ', '%20')}`, '_blank')} style={{ background: 'transparent', border: 'none', color: '#38bdf8', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
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
                            <iframe 
                                title="MarineTraffic Live Map"
                                width="100%" 
                                height="100%" 
                                frameBorder="0" 
                                scrolling="no" 
                                marginHeight="0" 
                                marginWidth="0" 
                                src="https://www.marinetraffic.com/en/ais/embed/zoom:13/centery:-29.9328/centerx:-71.3414/maptype:1/shownames:false/mmsi:0/shipid:0/fleet:/fleet_id:/vtypes:7,8,4/showmenu:false/remember:false"
                                style={{ border: 'none' }}
                                allow="geolocation"
                                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                            ></iframe>
                        </div>

                        {/* Botón Flotante para expansión si es necesario */}
                        <div style={{ position: 'absolute', bottom: '15px', right: '15px', zIndex: 10, display: 'flex', gap: '8px' }}>
                            <button 
                                onClick={() => window.open('https://www.marinetraffic.com', '_blank')}
                                style={{ background: 'rgba(56,189,248,0.9)', color: '#000', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
                            >
                                EXPANDIR RADAR
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

