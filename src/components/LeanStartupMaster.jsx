import React, { useState, useEffect } from 'react';
import { 
    X as CloseIcon, Lightbulb, Rocket, BarChart2, Repeat, 
    Target, Briefcase, Zap, ShieldCheck, 
    TrendingUp, MessageSquare, BookOpen, 
    Sparkles, Key, Lock, Globe
} from 'lucide-react';

export default function LeanStartupMaster({ onClose }) {
    const isAuthorized = localStorage.getItem('master_bypass') === 'true';

    if (!isAuthorized) {
        return (
            <div style={{ position: 'fixed', inset: 0, zIndex: 1000000, background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                <div style={{ textAlign: 'center', maxWidth: '400px' }}>
                    <Lock size={80} color="#ef4444" style={{ marginBottom: '2rem' }} />
                    <h2 style={{ color: 'white' }}>ACCESO RESTRINGIDO - MÓDULO ESTRATÉGICO</h2>
                    <p style={{ color: '#94a3b8' }}>Este espacio contiene propiedad intelectual y estrategias de negocio de nivel corporativo.</p>
                    <button onClick={onClose} className="btn-glass" style={{ width: '100%', marginTop: '2rem', padding: '1rem', color: '#ef4444', border: '1px solid #ef4444' }}>Cerrar Acceso</button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ 
            position: 'fixed', inset: 0, zIndex: 1000000, background: '#020617', color: 'white',
            display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: "'Outfit', sans-serif"
        }}>
            {/* Master Header */}
            <header style={{ 
                padding: '2rem', background: 'rgba(30, 58, 138, 0.2)', borderBottom: '1px solid rgba(56, 189, 248, 0.3)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', backdropFilter: 'blur(10px)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ background: '#38bdf8', padding: '1rem', borderRadius: '18px', boxShadow: '0 0 25px rgba(56, 189, 248, 0.4)' }}>
                        <Rocket size={32} color="#020617" />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: '900', letterSpacing: '2px' }}>VLS: BUSINESS MASTER STRATEGY</h2>
                        <b style={{ color: '#38bdf8', fontSize: '0.9rem' }}>METODOLOGÍA LEAN STARTUP APLICADA A MUNICIPALIDADES CHILENAS</b>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', padding: '0.5rem 1.2rem', borderRadius: '12px', border: '1px solid #10b981', fontSize: '0.8rem', fontWeight: 'bold' }}>
                        BYPASS ACTIVO: MASTER ACCESS
                    </div>
                    <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', width: '45px', height: '45px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CloseIcon size={24} />
                    </button>
                </div>
            </header>

            <main style={{ flex: 1, overflowY: 'auto', padding: '3rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem' }}>
                    
                    {/* Strategical Analysis Column */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                        
                        <section>
                            <h3 style={{ borderLeft: '4px solid #38bdf8', paddingLeft: '1rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <BookOpen size={24} color="#38bdf8" /> Análsis: El Método Lean Startup (Eric Ries)
                            </h3>
                            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', lineHeight: '1.8', color: '#cbd5e1' }}>
                                <p>La clave para vender <strong>"Smart Comuna"</strong> no es el software, es el <b>Aprendizaje Validado</b>. Municipalidades como las de la Región de Coquimbo operan con incertidumbre extrema y presupuestos rígidos. El método nos propone:</p>
                                <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', listStyle: 'none', padding: 0, marginTop: '2rem' }}>
                                    <li style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                                        <b style={{ color: 'white', display: 'block', marginBottom: '0.5rem' }}>1. MVP (Producto Mínimo Viable)</b>
                                        No vendamos la ciudad 3D completa. Vendamos el **Portal de Reportes Vecinales** con feedback inmediato. Validamos si el vecino realmente usa la herramienta.
                                    </li>
                                    <li style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                                        <b style={{ color: 'white', display: 'block', marginBottom: '0.5rem' }}>2. Ciclo Crear-Medir-Aprender</b>
                                        Implementamos un módulo (ej. Smart Admin), medimos el ahorro de papel, y aprendemos si los funcionarios están listos para el siguiente paso.
                                    </li>
                                    <li style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                                        <b style={{ color: 'white', display: 'block', marginBottom: '0.5rem' }}>3. Pivotar o Perseverar</b>
                                        Si la Radio Digital tiene más alcance que los reportes, **pivotamos** la estrategia de seguridad hacia la Radio Vecinal como eje de alerta temprana.
                                    </li>
                                    <li style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                                        <b style={{ color: 'white', display: 'block', marginBottom: '0.5rem' }}>4. Contabilidad de la Innovación</b>
                                        Convertimos los XP de la gamificación en métricas reales de ahorro municipal (Menos baches no reportados = menos demandas).
                                    </li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h3 style={{ borderLeft: '4px solid #10b981', paddingLeft: '1rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Briefcase size={24} color="#10b981" /> Estrategia de Venta: "Smart City as a Service"
                            </h3>
                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                <div style={{ background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.1), transparent)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#10b981' }}>Fase 1: El Gancho Político (Seguridad)</h4>
                                    <p style={{ margin: 0, fontSize: '0.9rem' }}>Vender el <strong>Sentinel Faro</strong>. La seguridad es el dolor #1. Un sistema que usa IA para escuchar y alertar es irresistible para un Alcalde en año electoral.</p>
                                </div>
                                <div style={{ background: 'linear-gradient(90deg, rgba(56, 189, 248, 0.1), transparent)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#38bdf8' }}>Fase 2: La Eficiencia Interna (Admin)</h4>
                                    <p style={{ margin: 0, fontSize: '0.9rem' }}>Una vez dentro, digitalizamos los Honorarios. Ahorramos horas de RRHH. El sistema se paga solo con el tiempo ahorrado de los funcionarios.</p>
                                </div>
                                <div style={{ background: 'linear-gradient(90deg, rgba(167, 139, 250, 0.1), transparent)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(167, 139, 250, 0.2)' }}>
                                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#a78bfa' }}>Fase 3: El Legado (Patrimonio & Niños)</h4>
                                    <p style={{ margin: 0, fontSize: '0.9rem' }}>El Memorial Virtual y el Paseo 3D. Esto genera "votos blandos" y conexión emocional con la comunidad. Es el cierre del círculo Smart.</p>
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* Action Plan Column */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        
                        <div style={{ background: 'rgba(56, 189, 248, 0.1)', padding: '2rem', borderRadius: '32px', border: '1px solid rgba(56, 189, 248, 0.3)', position: 'relative', overflow: 'hidden' }}>
                            <Zap size={48} color="#38bdf8" style={{ marginBottom: '1.5rem' }} />
                            <h3 style={{ margin: '0 0 1rem 0' }}>Hoja de Ruta 2026</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <div style={{ minWidth: '35px', height: '35px', borderRadius: '50%', background: '#38bdf8', color: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>1</div>
                                    <div>
                                        <b style={{ display: 'block' }}>Estandarización de APIs</b>
                                        Conectar los 97 componentes bajo una arquitectura de micro-servicios escalable a nivel nacional.
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <div style={{ minWidth: '35px', height: '35px', borderRadius: '50%', background: '#38bdf8', color: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>2</div>
                                    <div>
                                        <b style={{ display: 'block' }}>Modelo B2G (Business to Government)</b>
                                        Paquetizar "Smart Comuna" por tramos (Comuna Pequeña, Mediana, Grande).
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <div style={{ minWidth: '35px', height: '35px', borderRadius: '50%', background: '#38bdf8', color: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>3</div>
                                    <div>
                                        <b style={{ display: 'block' }}>Branding Vecinos Smart</b>
                                        Relanzar la marca como la "Red Social de Seguridad y Bienestar" número 1 de Chile.
                                    </div>
                                </div>
                            </div>

                            <button style={{ width: '100%', marginTop: '2rem', padding: '1.2rem', background: 'linear-gradient(45deg, #38bdf8, #2563eb)', border: 'none', borderRadius: '16px', color: 'white', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}>
                                <TrendingUp size={20} /> GENERAR PITCH DE VENTA (.PPTX)
                            </button>
                        </div>

                        <div style={{ background: '#0f172a', padding: '2rem', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <h4 style={{ margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '10px', color: '#facc15' }}>
                                <Sparkles size={20} /> Frases Maestro
                            </h4>
                            <p style={{ fontStyle: 'italic', color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6' }}>
                                "No construyas lo que los vecinos piden, construye lo que el aprendizaje validado dice que los vecinos realmente valoran."
                                <br /><br />
                                "En una Smart City, la tecnología es el vehículo, pero los datos son el combustible y la confianza ciudadana es la carretera."
                            </p>
                        </div>

                        <div style={{ textAlign: 'center', padding: '1.5rem', background: '#e11d4820', border: '1px solid #e11d4840', borderRadius: '20px' }}>
                            <p style={{ margin: 0, color: '#fb7185', fontSize: '0.75rem', fontWeight: 'bold' }}>CONFIDENCIAL: Este documento tiene validez solo para el portador de la Clave Maestra.</p>
                        </div>

                    </div>

                </div>
            </main>

            <footer style={{ padding: '1.5rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: '0.8rem', color: '#475569' }}>
                MASTER_STRATEGY_PROTOCOL_V26 • VECINOS SMART CORE • LA SERENA, CHILE
            </footer>
        </div>
    );
}
