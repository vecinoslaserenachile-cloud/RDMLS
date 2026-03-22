import React from 'react';
import { CloudSun, Wind, Droplets, Thermometer, Map, Activity, Zap, Compass, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Serenamet() {
    const systems = [
        { name: 'Red de Estaciones', status: 'Online', icon: Compass, color: '#38bdf8' },
        { name: 'Micro-turbinas VLS', status: 'Activo', icon: Wind, color: '#10b981' },
        { name: 'Sensores de Costa', status: 'Sincronizado', icon: Droplets, color: '#0ea5e9' },
        { name: 'Índice UV', status: 'Extremo', icon: Zap, color: '#ef4444' }
    ];

    const alerts = [
        { type: 'Viento Blanco', area: 'Cordillera Elqui', level: 'Precaución' },
        { type: 'Marea Alta', area: 'Avenida del Mar', level: 'Informativo' },
        { type: 'Cielos Despejados', area: 'Valle del Elqui', level: 'Óptimo para Observación' }
    ];

    return (
        <div style={{
            minHeight: '100vh', padding: '2rem', paddingTop: '6rem',
            background: 'linear-gradient(135deg, #020617 0%, #0f172a 100%)', color: 'white',
            fontFamily: "'Inter', sans-serif"
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem' }}>
                   <div style={{ background: '#38bdf820', padding: '20px', borderRadius: '25px', border: '1px solid #38bdf8' }}>
                      <CloudSun size={48} color="#38bdf8" />
                   </div>
                   <div>
                      <h1 style={{ fontSize: '3rem', fontWeight: '900', margin: 0 }}>SERENAMET</h1>
                      <p style={{ color: '#94a3b8', fontSize: '1.2rem' }}>Centro de Inteligencia Meteorológica Comunal</p>
                   </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                    {systems.map((s, i) => (
                        <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '20px' }}>
                           <s.icon size={24} color={s.color} style={{ marginBottom: '10px' }} />
                           <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{s.name}</div>
                           <div style={{ color: s.color, fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{s.status}</div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                    {/* Mapa Windy Premium */}
                    <div style={{ background: '#000', borderRadius: '30px', overflow: 'hidden', border: '2px solid rgba(56,189,248,0.3)', height: '600px', position: 'relative' }}>
                        <iframe 
                            src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=°C&metricWind=km/h&zoom=10&overlay=wind&product=ecmwf&level=surface&lat=-29.904&lon=-71.248" 
                            frameBorder="0" 
                            style={{ width: '100%', height: '100%' }}
                            title="SERENAMET Live Map"
                        />
                        <div style={{ position: 'absolute', bottom: '20px', right: '20px', background: 'rgba(0,0,0,0.8)', padding: '10px 20px', borderRadius: '50px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '15px' }}>
                           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Thermometer size={16} color="#38bdf8" /> 18ºC</div>
                           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Wind size={16} color="#10b981" /> 12 km/h</div>
                        </div>
                    </div>

                    {/* Reportes Laterales */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Alertas y Reportes</h3>
                        {alerts.map((a, i) => (
                            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', borderLeft: `6px solid ${a.level === 'Precaución' ? '#f59e0b' : '#10b981'}`, padding: '1.5rem', borderRadius: '0 15px 15px 0' }}>
                               <div style={{ color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 'bold' }}>{a.area}</div>
                               <div style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '5px 0' }}>{a.type}</div>
                               <div style={{ color: a.level === 'Precaución' ? '#f59e0b' : '#10b981', fontSize: '0.9rem' }}>{a.level}</div>
                            </div>
                        ))}

                        <div style={{ marginTop: 'auto', background: 'rgba(56,189,248,0.1)', padding: '1.5rem', borderRadius: '20px', border: '1px solid #38bdf840' }}>
                           <h4 style={{ margin: '0 0 10px 0' }}>Data Inteligente VLS</h4>
                           <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.5' }}>
                              SERENAMET utiliza algoritmos de IA para predecir microclimas en la bahía de Coquimbo y el Valle de Elqui, optimizando la gestión de turbinas urbanas.
                           </p>
                           <button onClick={() => window.history.back()} style={{ background: 'white', color: '#0f172a', border: 'none', padding: '10px 20px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', width: '100%' }}>VOLVER AL TABLERO</button>
                        </div>
                    </div>
                </div>

                {/* Reportes de Estaciones (Fake but detailed) */}
                <div style={{ marginTop: '4rem' }}>
                   <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Reporte de Estaciones Digitales</h2>
                   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                      {['Estación Peñuelas', 'Faro Central', 'Vicente Zorrilla', 'Valle Norte'].map(name => (
                         <div key={name} style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '10px' }}>ESTACIÓN ACTIVA</div>
                            <div style={{ fontWeight: 'bold' }}>{name}</div>
                            <div style={{ height: '50px', display: 'flex', alignItems: 'center', gap: '2px', marginTop: '15px' }}>
                               {[...Array(20)].map((_, j) => (
                                  <div key={j} style={{ flex: 1, height: `${Math.random() * 100}%`, background: '#38bdf8', opacity: 0.5 + Math.random() * 0.5, borderRadius: '2px' }} />
                               ))}
                            </div>
                         </div>
                      ))}
                   </div>
                </div>
            </div>
        </div>
    );
}
