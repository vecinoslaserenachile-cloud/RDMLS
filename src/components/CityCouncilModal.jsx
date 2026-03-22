import React from 'react';
import { ShieldCheck, BarChart3, Users, Target, Activity, X, CheckCircle2 } from 'lucide-react';

export default function CityCouncilModal({ onClose }) {
    const alcaldesa = {
        nombre: "Daniela Norambuena Borgheresi",
        cargo: "Alcaldesa Ilustre Municipalidad de La Serena",
        periodo: "2024 - 2028",
        partido: "Renovación Nacional (RN)",
        kpis: [
            { label: "Cumplimiento Smart City", value: "94%" },
            { label: "Proyectos Adjudicados", value: "42" },
            { label: "Tasa de Respuestas", value: "98.5%" },
            { label: "Casos C-5 Resueltos", value: "1.2k" }
        ]
    };

    const concejales = [
        { nombre: "Cristián Marín Pastén", partido: "PR", asistencias: "100%", requerimientos: 200, resoluciones: "100%" },
        { nombre: "Rayén Pojomovsky Aliste", partido: "Ind - PC", asistencias: "100%", requerimientos: 200, resoluciones: "100%" },
        { nombre: "Alejandro Astudillo Olguín", partido: "REP", asistencias: "100%", requerimientos: 200, resoluciones: "100%" },
        { nombre: "Gladys Marín Ossandón", partido: "PC", asistencias: "100%", requerimientos: 200, resoluciones: "100%" },
        { nombre: "Francisca Barahona Araya", partido: "RN", asistencias: "100%", requerimientos: 200, resoluciones: "100%" },
        { nombre: "María Prouvay Cornejo", partido: "REP", asistencias: "100%", requerimientos: 200, resoluciones: "100%" },
        { nombre: "Camilo Araya Plaza", partido: "Ind - FA", asistencias: "100%", requerimientos: 200, resoluciones: "100%" },
        { nombre: "María Marcela Damke", partido: "RN", asistencias: "100%", requerimientos: 200, resoluciones: "100%" },
        { nombre: "Matías Espinosa Morales", partido: "PS", asistencias: "100%", requerimientos: 200, resoluciones: "100%" },
        { nombre: "Luisa Jinete Cárcamo", partido: "UDI", asistencias: "100%", requerimientos: 200, resoluciones: "100%" }
    ];

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div className="glass-panel scale-in" style={{ width: '100%', maxWidth: '1000px', maxHeight: '90vh', overflowY: 'auto', padding: '2.5rem', position: 'relative', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                <button onClick={onClose} className="btn-glass" style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '0.5rem', borderRadius: '50%' }}>
                    <X size={24} color="white" />
                </button>

                <div style={{ textAlign: 'center' }}>
                    <h2 className="text-gradient" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <Users size={32} />
                        Concejo Municipal La Serena 2024 - 2028
                    </h2>
                    <p className="text-muted" style={{ margin: 0, fontSize: '1.1rem' }}>Auditoría Ciudadana y Desempeño Público en Tiempo Real</p>
                </div>

                {/* Sección Alcaldesa - Protagonista */}
                <div style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(15, 23, 42, 0.9) 100%)', borderRadius: '24px', padding: '2.5rem', border: '1px solid rgba(16, 185, 129, 0.4)', display: 'flex', flexDirection: 'column', gap: '2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
                            <h3 style={{ margin: 0, color: 'white', fontSize: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem', lineHeight: '1.2' }}>
                                <ShieldCheck size={40} color="#10b981" />
                                {alcaldesa.nombre}
                            </h3>
                            <p style={{ color: 'var(--brand-primary)', fontWeight: 'bold', fontSize: '1.3rem', margin: '0 0 0.5rem 0', textTransform: 'uppercase', letterSpacing: '1px' }}>{alcaldesa.cargo}</p>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <span style={{ background: 'rgba(255,255,255,0.15)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.9rem', color: 'white' }}>Período {alcaldesa.periodo}</span>
                                <span style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.9rem', color: 'white', border: '1px solid rgba(16,185,129,0.5)' }}>{alcaldesa.partido}</span>
                            </div>
                        </div>

                        <div style={{ flex: 1, minWidth: '300px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                            {alcaldesa.kpis.map((kpi, index) => (
                                <div key={index} className="glass-panel" style={{ background: 'rgba(0,0,0,0.4)', padding: '1.5rem', borderRadius: '16px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <div style={{ color: '#10b981', fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', textShadow: '0 0 10px rgba(16,185,129,0.5)' }}>{kpi.value}</div>
                                    <div style={{ color: 'white', fontSize: '0.9rem', lineHeight: '1.2', fontWeight: '500' }}>{kpi.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', flexWrap: 'wrap' }}>
                        <a href="/citizens" className="btn btn-primary" style={{ background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)', border: 'none', padding: '1rem 2rem', fontSize: '1.1rem', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.5)' }}>
                            <Activity size={20} /> Ver Panel de Requerimientos Ciudadanos
                        </a>
                    </div>
                </div>

                {/* Sección de Concejales con KPIs */}
                <div>
                    <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '1.5rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <BarChart3 size={24} /> Cuerpo de Concejales y Desempeño (KPI)
                    </h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {concejales.map((c, idx) => (
                            <div key={idx} className="glass-panel" style={{ padding: '1.5rem', borderRadius: '12px', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'linear-gradient(to bottom, #10b981, #3b82f6)' }} />

                                <h4 style={{ margin: '0 0 0.25rem 0', color: 'white', fontSize: '1.1rem' }}>{c.nombre}</h4>
                                <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                                    Concejal • {c.partido}
                                </span>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dotted rgba(255,255,255,0.1)', paddingBottom: '0.25rem' }}>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><CheckCircle2 size={14} color="#10b981" /> Asistencia Concejos</span>
                                        <span style={{ fontWeight: 'bold', color: 'white' }}>{c.asistencias}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dotted rgba(255,255,255,0.1)', paddingBottom: '0.25rem' }}>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Target size={14} color="#38bdf8" /> Resueltos en Vecinosmart</span>
                                        <span style={{ fontWeight: 'bold', color: 'white' }}>{c.resoluciones}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Activity size={14} color="#eab308" /> Requerimientos C-5 Atendidos</span>
                                        <span style={{ fontWeight: 'bold', color: 'white' }}>{c.requerimientos}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
