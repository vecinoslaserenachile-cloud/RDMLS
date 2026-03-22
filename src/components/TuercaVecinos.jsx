import React, { useState } from 'react';
import { PenTool as Tool, AlertTriangle, CheckCircle2, Info, ChevronRight, Car, Settings, Search } from 'lucide-react';

const MECHANIC_DATA = [
    {
        brand: 'Toyota / Suzuki (Japón)',
        faults: [
            { id: 1, title: 'Falla Sensor Oxígeno', homeFix: 'Limpieza de contactos con alcohol isopropílico. Verificar cables.', expert: 'Si la luz de Check Engine persiste o el consumo sube un 30%.', level: 'Medio' },
            { id: 2, title: 'Ruido en Frenos', homeFix: 'Revisión visual de pastillas (grosor < 3mm). Limpieza de polvo.', expert: 'Cambio de pastillas y rectificado de discos obligatorio.', level: 'Crítico' }
        ]
    },
    {
        brand: 'Hyundai / Kia (Corea)',
        faults: [
            { id: 3, title: 'Vibración al Ralentí', homeFix: 'Revisión de soportes de motor y limpieza de válvula IAC.', expert: 'Si persiste, posible falla en inyectores o cuerpo de aceleración.', level: 'Bajo' },
            { id: 4, title: 'Pedal Embrague Duro', homeFix: 'Revisión de niveles de líquido de frenos/embrague.', expert: 'Cambio de kit de embrague (Prensa, disco y rodamiento).', level: 'Medio' }
        ]
    },
    {
        brand: 'Peugeot / Renault (Europa)',
        faults: [
            { id: 5, title: 'Falla Eléctrica (Testigos)', homeFix: 'Revisión de fusibles principales y bornes de batería.', expert: 'Diagnóstico por SCANNER especializado para multiplexado.', level: 'Medio' },
            { id: 6, title: 'Pérdida de Refrigerante', homeFix: 'NUNCA abrir en caliente. Revisar mangueras y abrazaderas.', expert: 'Si la temperatura sube, apagar de inmediato. Riesgo de culata.', level: 'Crítico' }
        ]
    }
];

export default function TuercaVecinos() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBrand, setSelectedBrand] = useState(null);

    return (
        <div style={{ 
            marginTop: '3rem', 
            padding: '2rem', 
            background: 'rgba(28, 37, 65, 0.9)', 
            borderRadius: '24px', 
            border: '1px solid #f59e0b',
            boxShadow: '0 15px 40px rgba(0,0,0,0.5)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid rgba(245, 158, 11, 0.3)', paddingBottom: '1.5rem' }}>
                <div style={{ background: '#f59e0b', padding: '0.8rem', borderRadius: '12px', boxShadow: '0 0 20px rgba(245, 158, 11, 0.4)' }}>
                    <Settings size={28} color="white" />
                </div>
                <div style={{ flex: 1 }}>
                    <h3 style={{ color: 'white', margin: 0, fontSize: '1.6rem' }}>TUERCA VECINOS MECÁNICOS</h3>
                    <p style={{ color: '#fcd34d', margin: 0, fontSize: '0.85rem', fontWeight: 'bold' }}>Protocolos de Reparación y Guía de Fallas Habituales</p>
                </div>
            </div>

            <div style={{ position: 'relative', marginBottom: '2rem' }}>
                <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={20} />
                <input 
                    type="text" 
                    placeholder="Busca por marca (Toyota, Peugeot, Hyundai...)" 
                    style={{ paddingLeft: '3rem', background: '#0f172a', border: '1px solid rgba(245, 158, 11, 0.2)' }}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {MECHANIC_DATA.filter(b => b.brand.toLowerCase().includes(searchTerm.toLowerCase())).map((item, idx) => (
                    <div 
                        key={idx} 
                        style={{ 
                            background: 'rgba(0,0,0,0.3)', 
                            borderRadius: '16px', 
                            padding: '1.5rem',
                            border: '1px solid rgba(255,255,255,0.05)'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
                            <Car size={24} color="#f59e0b" />
                            <h4 style={{ color: 'white', margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>{item.brand}</h4>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                            {item.faults.map((fault) => (
                                <div key={fault.id} style={{ background: 'rgba(255,255,255,0.03)', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                                        <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>{fault.title}</span>
                                        <span style={{ 
                                            fontSize: '0.7rem', 
                                            padding: '2px 8px', 
                                            borderRadius: '20px', 
                                            background: fault.level === 'Crítico' ? '#ef444430' : '#10b98130',
                                            color: fault.level === 'Crítico' ? '#ef4444' : '#10b981',
                                            fontWeight: 'bold',
                                            border: `1px solid ${fault.level === 'Crítico' ? '#ef444450' : '#10b98150'}`
                                        }}>
                                            {fault.level}
                                        </span>
                                    </div>
                                    
                                    <div style={{ marginBottom: '1rem' }}>
                                        <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '0.3rem' }}>
                                            <Tool size={12} /> REPARACIÓN EN CASA:
                                        </div>
                                        <p style={{ margin: 0, color: '#cbd5e1', fontSize: '0.85rem' }}>{fault.homeFix}</p>
                                    </div>

                                    <div style={{ padding: '0.8rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                                        <div style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '0.3rem' }}>
                                            <AlertTriangle size={12} /> CUÁNDO IR AL TÉCNICO:
                                        </div>
                                        <p style={{ margin: 0, color: '#fecaca', fontSize: '0.85rem', fontStyle: 'italic' }}>{fault.expert}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Info size={24} color="#38bdf8" />
                <p style={{ margin: 0, color: '#bae6fd', fontSize: '0.8rem' }}>
                    Esta guía es informativa. Si no se siente seguro, acuda a un servicio técnico autorizado. 
                    <button style={{ background: 'none', border: 'none', color: '#38bdf8', fontWeight: 'bold', marginLeft: '5px', cursor: 'pointer', textDecoration: 'underline' }}>Ver Talleres Cercanos</button>
                </p>
            </div>
        </div>
    );
}
