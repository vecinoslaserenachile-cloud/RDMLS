import React from 'react';
import { Ruler, Building2, Map, ClipboardCheck, ArrowRight, ShieldCheck, Hammer, FileText, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ArquitecturaPage() {
    return (
        <div style={{ minHeight: '100vh', background: '#020617', color: 'white', padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Header Section */}
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: '#3b82f6', padding: '1rem', borderRadius: '15px', boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' }}>
                            <Ruler size={36} color="white" />
                        </div>
                        <div>
                            <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-1px' }}>ARQUITECTURA & OBRAS</h1>
                             <p style={{ margin: 0, color: '#60a5fa', fontWeight: 'bold' }}>Soberanía Urbanística Smart City VLS (68+ Módulos)</p>
                        </div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px 20px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <span style={{ color: '#10b981', fontWeight: 'bold' }}>●</span> ESTATUS: LIVE (9 DOMINIOS)
                    </div>
                </header>

                {/* Hero Section */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem', marginBottom: '4rem' }}>
                    <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #172554 100%)', padding: '3rem', borderRadius: '30px', border: '1px solid rgba(59, 130, 246, 0.2)', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'relative', zIndex: 2 }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: '900', lineHeight: '1.1', marginBottom: '1.5rem' }}>Damos forma al <span style={{ color: '#60a5fa' }}>futuro de La Serena.</span></h2>
                            <p style={{ fontSize: '1.2rem', color: '#94a3b8', lineHeight: '1.6', marginBottom: '2rem', maxWidth: '600px' }}>
                                Desde ampliaciones residenciales hasta megaproyectos urbanos de bajo costo. 68 módulos integrados para digitalizar la DOM y transformar la gestión de obras.
                            </p>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '12px 30px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    INICIAR PROYECTO <ArrowRight size={18} />
                                </button>
                                <button style={{ background: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.1)', padding: '12px 30px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                                    CONSULTAR PERMISO
                                </button>
                            </div>
                        </div>
                        {/* 3D-ish Background Decoration */}
                        <div style={{ position: 'absolute', right: '-50px', bottom: '-20px', fontSize: '15rem', opacity: 0.1 }}>🏗️</div>
                    </div>

                    <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '2rem', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#38bdf8' }}>📊 INDICADORES DE GESTIÓN</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '20px', textAlign: 'center' }}>
                                 <div style={{ fontSize: '1.5rem', fontWeight: '900', color: 'white' }}>68+</div>
                                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>MÓDULOS ACTIVOS</div>
                            </div>
                            <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '20px', textAlign: 'center' }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: '900', color: 'white' }}>9500+</div>
                                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>VISITANTES ÚNICOS</div>
                            </div>
                        </div>
                        <div style={{ background: 'linear-gradient(90deg, #10b981 68%, #334155 30%)', height: '10px', borderRadius: '10px' }}></div>
                        <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>Meta Anual Smart Infrastructure: 68% Completado (Fase 3.2)</p>
                    </div>
                </div>

                {/* Modules Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    {[
                        { title: 'DOM Digital', icon: FileText, color: '#f59e0b', desc: 'Ingreso telemático de carpetas de edificación y Ley del Mono.' },
                        { title: 'Catastro 3D', icon: Map, color: '#ef4444', desc: 'Mapa georreferenciado de urbanización y planeamiento comunal.' },
                        { title: 'Inspección Smart', icon: ShieldCheck, color: '#10b981', desc: 'Seguimiento de obras en tiempo real con registro fotográfico.' },
                        { title: 'Autoconstrucción', icon: Hammer, color: '#a855f7', desc: 'Asesoría técnica para regularizaciones y pequeñas obras.' }
                    ].map((mod, i) => (
                        <div key={i} style={{ 
                            background: 'rgba(15, 23, 42, 0.8)', padding: '2rem', borderRadius: '24px', 
                            border: '1px solid rgba(255,255,255,0.05)', transition: 'transform 0.3s'
                        }}>
                            <div style={{ background: `${mod.color}20`, width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                <mod.icon size={24} color={mod.color} />
                            </div>
                            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>{mod.title}</h4>
                            <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem', lineHeight: '1.5' }}>{mod.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Footer Disclaimer */}
                <footer style={{ marginTop: '5rem', textAlign: 'center', color: '#475569', fontSize: '0.8rem' }}>
                    SISTEMA BETA V2.0 - ARCHITECTURE MODULE - VECINOS LA SERENA 2026
                </footer>
            </div>
        </div>
    );
}
