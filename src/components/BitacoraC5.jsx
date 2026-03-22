import React, { useState, useEffect } from 'react';
import { Terminal, ShieldAlert, Construction, AlertCircle, CheckCircle2, Zap, Clock, ChevronRight } from 'lucide-react';

const INITIAL_INCIDENTS = [
    { id: 1, time: '10:45', type: 'VÍAS', color: '#3b82f6', desc: 'Cierre de calle Prat por reparaciones viales. Desvío señalizado para transporte público.', tag: 'T-410', status: 'En Proceso' },
    { id: 2, time: '10:42', type: 'SEGURIDAD', color: '#10b981', desc: 'Patrullaje preventivo asignado a sector Puerta del Mar. Vigilancia constante en parques.', tag: 'S-102', status: 'Operativo' },
    { id: 3, time: '10:38', type: 'TRÁNSITO', color: '#f59e0b', desc: 'Congestión moderada en Rotonda Cisternas post-semáforo. Inspectores en ruta.', tag: 'T-204', status: 'Monitoreo' },
    { id: 4, time: '10:30', type: 'ALERTA', color: '#ef4444', desc: 'Se reporta corte de luz parcial en Las Compañías. CGE notificado y trabajando.', tag: 'E-511', status: 'Pendiente' },
    { id: 5, time: '10:15', type: 'MONITOREO', color: '#10b981', desc: 'Flujo normal en Ruta 5 Norte a la altura de 4 Esquinas. Visibilidad óptima con neblina leve.', tag: 'M-009', status: 'OK' },
    { id: 6, time: '10:05', type: 'RED VECINAL', color: '#8b5cf6', desc: 'Alerta de luminaria caída en Av. Estadio resuelta por equipo de Operaciones.', tag: 'R-449', status: 'Cerrado' }
];

export default function BitacoraC5() {
    const [incidents, setIncidents] = useState(INITIAL_INCIDENTS);
    const [selectedId, setSelectedId] = useState(null);

    return (
        <div style={{ 
            marginTop: '2rem', 
            padding: '1.5rem', 
            background: 'rgba(5, 10, 25, 0.95)', 
            border: '1px solid #10b981', 
            borderRadius: '16px', 
            boxShadow: '0 0 30px rgba(16, 185, 129, 0.1) inset' 
        }}>
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.8rem', 
                marginBottom: '1.5rem', 
                borderBottom: '1px dashed rgba(16, 185, 129, 0.4)', 
                paddingBottom: '1rem' 
            }}>
                <Terminal size={24} color="#10b981" />
                <div style={{ flex: 1 }}>
                    <span style={{ color: '#10b981', fontWeight: 'bold', letterSpacing: '2px', fontFamily: 'monospace', fontSize: '1.2rem', display: 'block' }}>BITÁCORA PÚBLICA C5</span>
                    <span style={{ color: 'rgba(16, 185, 129, 0.6)', fontSize: '0.75rem', fontFamily: 'monospace' }}>INFRAESTRUCTURA DE SEGURIDAD VLS</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '10px', height: '10px', background: '#10b981', borderRadius: '50%', animation: 'pulse 1.5s infinite', boxShadow: '0 0 10px #10b981' }}></span>
                    <span style={{ color: '#10b981', fontSize: '0.9rem', fontFamily: 'monospace', fontWeight: 'bold' }}>LIVE FEED</span>
                </div>
            </div>

            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '1rem', 
                maxHeight: '400px', 
                overflowY: 'auto', 
                fontFamily: 'monospace', 
                paddingRight: '0.5rem',
                scrollbarWidth: 'thin',
                scrollbarColor: '#10b981 rgba(0,0,0,0.1)'
            }}>
                {incidents.map((inc) => (
                    <div 
                        key={inc.id}
                        onClick={() => setSelectedId(selectedId === inc.id ? null : inc.id)}
                        style={{ 
                            background: `linear-gradient(90deg, ${inc.color}15 0%, rgba(20,30,48,0.4) 100%)`, 
                            borderLeft: `6px solid ${inc.color}`,
                            padding: '1.2rem', 
                            borderRadius: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            border: selectedId === inc.id ? `1px solid ${inc.color}50` : '1px solid transparent',
                            transform: selectedId === inc.id ? 'scale(1.02)' : 'scale(1)',
                            marginBottom: '0.5rem'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    <span style={{ color: '#94a3b8', fontWeight: 'bold', fontSize: '0.8rem' }}>[{inc.time}]</span>
                                    <span style={{ color: inc.color, fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '1px' }}>{inc.type}</span>
                                    <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', background: 'rgba(0,0,0,0.5)', padding: '2px 6px', borderRadius: '4px' }}>{inc.tag}</span>
                                </div>
                                {selectedId !== inc.id && (
                                    <div style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {inc.desc}
                                    </div>
                                )}
                            </div>
                            <ChevronRight size={20} color={inc.color} style={{ transform: selectedId === inc.id ? 'rotate(90deg)' : 'none', transition: 'transform 0.3s', flexShrink: 0, marginTop: '5px' }} />
                        </div>
 
                        {/* Detailed View */}
                        {selectedId === inc.id && (
                            <div className="animate-fade-in" style={{ marginTop: '1rem', borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                                <p style={{ color: '#fff', fontSize: '1rem', lineHeight: '1.6', margin: '0 0 1.2rem 0' }}>{inc.desc}</p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: inc.color }}>
                                            <Clock size={14} /> 
                                            <span>Activo hace {Math.floor(Math.random() * 15) + 1}m</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: '#10b981' }}>
                                            <CheckCircle2 size={14} />
                                            <span>Estado: {inc.status}</span>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); alert('Acceso a Canal de Respuesta Crítica C5 habilitado.'); }}
                                        style={{ background: inc.color, border: 'none', color: '#000', padding: '0.6rem 1.2rem', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer', boxShadow: `0 4px 15px ${inc.color}40` }}
                                    >
                                        GESTIÓN C5
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div style={{ 
                marginTop: '1rem', 
                display: 'flex', 
                gap: '1rem', 
                justifyContent: 'center', 
                flexWrap: 'wrap',
                fontSize: '0.75rem',
                color: '#94a3b8',
                fontFamily: 'monospace'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: '8px', height: '8px', background: '#3b82f6', borderRadius: '50%' }}></div> VÍAS/OBRAS</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%' }}></div> SEGURIDAD</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: '8px', height: '8px', background: '#f59e0b', borderRadius: '50%' }}></div> TRÁNSITO</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%' }}></div> ALERTAS</div>
            </div>
        </div>
    );
}
