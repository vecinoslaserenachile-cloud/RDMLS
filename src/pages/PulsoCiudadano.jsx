import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, TrendingUp, TrendingDown, Info, Share2, Download, ExternalLink, ChevronRight, BarChart3, Users, Clock, Globe, ShieldCheck, Rocket } from 'lucide-react';

const PulsoCiudadano = ({ onClose }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const pdfUrl = "https://www.biobiochile.cl/assets/bbcl-embed/#/static/documentos/2026/04/261439_pulso_ciudadano_abril_q1_2026_0419_v2.pdf?title=261439_PULSO_CIUDADANO_ABRIL_Q1_2026_0419_V2";
    const navigate = (path) => window.location.href = path; // Fallback helper

    const history = [
        { date: 'Mayo 2026 - Q1', title: 'Pulso Ciudadano Mayo (Quincena 1)', type: 'Mensual' },
        { date: 'Abril 2026 - Q1', title: 'Pulso Ciudadano Abril (Quincena 1)', type: 'Mensual' },
        { date: 'Marzo 2026 - Q2', title: 'Pulso Ciudadano Marzo (Quincena 2)', type: 'Mensual' },
        { date: 'Marzo 2026 - Q1', title: 'Pulso Ciudadano Marzo (Quincena 1)', type: 'Mensual' },
    ];

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9000000, overflowY: 'auto', background: '#020617', color: 'white', padding: '2rem 1rem' }}>
            {onClose && (
                <button 
                    onClick={onClose}
                    style={{ position: 'fixed', top: '2rem', right: '2rem', zIndex: 9000001, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '45px', height: '45px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}
                >
                    <FileText size={24} />
                </button>
            )}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="container"
                style={{ maxWidth: '1200px', margin: '0 auto' }}
            >
                {/* HEADER SECTION */}
                <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '1rem' }}>
                        <div style={{ background: 'linear-gradient(135deg, #38bdf8 0%, #1d4ed8 100%)', padding: '12px', borderRadius: '16px', boxShadow: '0 8px 20px rgba(56, 189, 248, 0.3)' }}>
                            <BarChart3 size={32} color="white" />
                        </div>
                        <div>
                            <h1 style={{ fontSize: '2.5rem', fontWeight: 950, margin: 0, letterSpacing: '-1px' }}>OBSERVATORIO <span style={{ color: '#38bdf8' }}>CIUDADANO</span></h1>
                            <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>REPORTE EXTERNO vía ACTIVA RESEARCH</p>
                        </div>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                        <div style={{ display: 'inline-flex', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '6px 20px', borderRadius: '30px', alignItems: 'center', gap: '10px' }}>
                            <Calendar size={14} color="#38bdf8" />
                            <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 900 }}>DATO EXTERNO: MAYO 2026 (QUINCENA 1)</span>
                        </div>
                        <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '6px 20px', borderRadius: '30px', alignItems: 'center', gap: '10px' }}>
                            <Info size={14} color="#94a3b8" />
                            <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 900 }}>ESTUDIO: PULSO CIUDADANO ©</span>
                        </div>
                    </div>
                </header>

                {/* DATA VISUALIZATION DASHBOARD (EXTRACTED DATA) */}
                <section style={{ marginBottom: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    <motion.div whileHover={{ scale: 1.02 }} style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #020617 100%)', padding: '2rem', borderRadius: '24px', border: '1px solid #ef444450', boxShadow: '0 15px 30px rgba(239, 68, 68, 0.1)' }}>
                        <div style={{ color: '#ef4444', fontWeight: 950, fontSize: '0.75rem', letterSpacing: '2px', marginBottom: '10px' }}>DESAPROBACIÓN PRESIDENCIAL</div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                            <div style={{ fontSize: '3.5rem', fontWeight: 950, color: '#ef4444' }}>54.4%</div>
                            <TrendingUp size={20} color="#ef4444" />
                        </div>
                        <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '10px 0 0 0' }}>Máximo histórico desde el inicio del gobierno de J.A. Kast (Mayo 2026).</p>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #020617 100%)', padding: '2rem', borderRadius: '24px', border: '1px solid #10b98150', boxShadow: '0 15px 30px rgba(16, 185, 129, 0.1)' }}>
                        <div style={{ color: '#10b981', fontWeight: 950, fontSize: '0.75rem', letterSpacing: '2px', marginBottom: '10px' }}>APROBACIÓN GESTIÓN</div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                            <div style={{ fontSize: '3.5rem', fontWeight: 950, color: '#10b981' }}>31.2%</div>
                            <TrendingUp size={20} color="#ef4444" style={{ transform: 'rotate(180deg)' }} />
                        </div>
                        <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '10px 0 0 0' }}>Fuerte caída mensual. El respaldo ciudadano alcanza su nivel más bajo.</p>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #020617 100%)', padding: '2rem', borderRadius: '24px', border: '1px solid #38bdf850', boxShadow: '0 15px 30px rgba(56, 189, 248, 0.1)' }}>
                        <div style={{ color: '#38bdf8', fontWeight: 950, fontSize: '0.75rem', letterSpacing: '2px', marginBottom: '10px' }}>MINISTRO MEJOR EVALUADO</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{ width: '50px', height: '50px', borderRadius: '15px', background: 'rgba(56, 189, 248, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Users size={24} color="#38bdf8" />
                            </div>
                            <div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 950, color: 'white' }}>Iván Poduje</div>
                                <div style={{ fontSize: '0.9rem', color: '#38bdf8', fontWeight: 700 }}>46.4% Evaluación Positiva</div>
                            </div>
                        </div>
                        <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '15px 0 0 0' }}>Titular de Vivienda lidera valoraciones positivas del gabinete.</p>
                    </motion.div>
                </section>



                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 320px', gap: '2rem' }}>
                    
                    {/* MAIN CONTENT: PDF VIEWER */}
                    <main>

                        {/* ══════════════════════════════════════════════════════════ */}
                        {/* SECCIÓN 1: INDICADORES DE CONFIANZA Y GABINETE             */}
                        {/* ══════════════════════════════════════════════════════════ */}
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '2rem', marginTop: '3rem' }}>
                            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '2.5rem', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2rem' }}>
                                    <ShieldCheck size={28} color="#38bdf8" />
                                    <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 950, color: 'white' }}>Confianza Presidencial</h3>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
                                    <div>
                                        <div style={{ fontSize: '3rem', fontWeight: 950, color: '#38bdf8' }}>24.6%</div>
                                        <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 900, textTransform: 'uppercase' }}>Confianza Total/Mucha</div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '1.4rem', fontWeight: 950, color: '#ef4444' }}>-11.4%</div>
                                        <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>vs Dic 2025 (36%)</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(239, 68, 68, 0.1)', padding: '1.2rem', borderRadius: '20px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                                    <div>
                                        <div style={{ fontSize: '1.8rem', fontWeight: 950, color: '#ef4444' }}>51.0%</div>
                                        <div style={{ fontSize: '0.75rem', color: 'white', fontWeight: 900 }}>DESCONFIANZA (MAX.)</div>
                                    </div>
                                    <TrendingUp size={24} color="#ef4444" />
                                </div>
                            </div>

                            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '2.5rem', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2rem' }}>
                                    <Users size={28} color="#a78bfa" />
                                    <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 950, color: 'white' }}>Desempeño Equipo Ministerial</h3>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                    <div style={{ textAlign: 'center', background: 'rgba(56, 189, 248, 0.1)', padding: '1.5rem', borderRadius: '24px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                                        <div style={{ fontSize: '2.5rem', fontWeight: 950, color: '#38bdf8' }}>27.0%</div>
                                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 900, textTransform: 'uppercase' }}>Aprobación</div>
                                    </div>
                                    <div style={{ textAlign: 'center', background: 'rgba(239, 68, 68, 0.1)', padding: '1.5rem', borderRadius: '24px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                                        <div style={{ fontSize: '2.5rem', fontWeight: 950, color: '#ef4444' }}>59.5%</div>
                                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 900, textTransform: 'uppercase' }}>Desaprobación</div>
                                    </div>
                                </div>
                                <div style={{ marginTop: '1.5rem', padding: '1rem', borderRadius: '15px', background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.1)', fontSize: '0.8rem', color: '#94a3b8' }}>
                                    <strong>Conocimiento Público:</strong> X. Rincón (Energía) • N. Ducó (Deportes) • M. Sedini (Segegob)
                                </div>
                            </div>
                        </div>

                        {/* ══════════════════════════════════════════════════════════ */}
                        {/* SECCIÓN 2: FOCO CRISIS "ALMUERZO MONEDA"                    */}
                        {/* ══════════════════════════════════════════════════════════ */}
                        <div style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #020617 100%)', padding: isMobile ? '2rem' : '4rem', borderRadius: '40px', marginTop: '2.5rem', border: '1px solid rgba(167, 139, 250, 0.2)', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, right: 0, padding: '1rem 2.5rem', background: '#ef4444', color: 'white', fontWeight: 950, fontSize: '0.85rem', borderBottomLeftRadius: '25px', letterSpacing: '2px' }}>CRISIS DE CONFIANZA</div>
                            <div style={{ maxWidth: '850px' }}>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: 950, margin: 0, color: 'white', lineHeight: '1' }}>Controversia: Almuerzo en Palacio</h2>
                                <p style={{ color: '#94a3b8', fontSize: '1.1rem', margin: '1rem 0 2.5rem 0', lineHeight: '1.6' }}>
                                    Evaluación del evento con excompañeros universitarios en la sede de Gobierno.
                                </p>
                                
                                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '1.5rem' }}>
                                    <div style={{ background: 'rgba(239, 68, 68, 0.2)', padding: '2rem', borderRadius: '28px', border: '1px solid #ef444440' }}>
                                        <div style={{ fontSize: '2.5rem', fontWeight: 950, color: '#ef4444' }}>46.5%</div>
                                        <div style={{ fontSize: '0.8rem', color: 'white', fontWeight: 900, marginTop: '8px' }}>Califica como GRAVE</div>
                                    </div>
                                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '28px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        <div style={{ fontSize: '2.5rem', fontWeight: 950, color: '#94a3b8' }}>31.8%</div>
                                        <div style={{ fontSize: '0.8rem', color: 'white', fontWeight: 900, marginTop: '8px' }}>Poco o Nada Grave</div>
                                    </div>
                                    <div style={{ background: 'rgba(239, 68, 68, 0.2)', padding: '2rem', borderRadius: '28px', border: '1px solid #ef444440' }}>
                                        <div style={{ fontSize: '2.5rem', fontWeight: 950, color: '#ef4444' }}>47.4%</div>
                                        <div style={{ fontSize: '0.8rem', color: 'white', fontWeight: 900, marginTop: '8px' }}>Desacuerdo Uso Personal</div>
                                    </div>
                                </div>
                                
                                <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                                    <div style={{ background: 'rgba(56, 189, 248, 0.1)', padding: '0.8rem 1.5rem', borderRadius: '15px', color: '#38bdf8', fontWeight: 900, fontSize: '0.9rem', border: '1px solid #38bdf840' }}>
                                        41.0% A Favor de Residencia en Moneda
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* DETAILED MINISTERIAL RANKING (REFACTORED) */}
                        <section style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                            {/* TOP MINISTERS */}
                            <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '35px', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '2.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2.5rem' }}>
                                    <TrendingUp color="#10b981" size={32} />
                                    <h4 style={{ margin: 0, fontWeight: 950, fontSize: '1.6rem', color: 'white' }}>Líderes de Desempeño</h4>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                    {[
                                        { name: 'Iván Poduje', role: 'Vivienda y Urbanismo', val: 46.4, color: '#10b981', info: 'Mejor evaluación del gabinete' },
                                        { name: 'Claudio Alvarado', role: 'Interior', val: 45.7, color: '#10b981' },
                                        { name: 'Catalina Parot', role: 'Bienes Nacionales', val: 40.0, color: '#38bdf8' }
                                    ].map((m, i) => (
                                        <div key={i}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                                <div>
                                                    <div style={{ fontWeight: 950, fontSize: '1rem', color: 'white' }}>{m.name}</div>
                                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700 }}>{m.role} {m.info && `· ${m.info}`}</div>
                                                </div>
                                                <div style={{ fontWeight: 950, color: m.color, fontSize: '1.2rem' }}>{m.val}%</div>
                                            </div>
                                            <div style={{ height: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', overflow: 'hidden' }}>
                                                <motion.div initial={{ width: 0 }} animate={{ width: `${m.val}%` }} transition={{ duration: 1, delay: i * 0.1 }} style={{ height: '100%', background: m.color }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* BOTTOM MINISTERS */}
                            <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '35px', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '2.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2.5rem' }}>
                                    <TrendingDown color="#ef4444" size={32} />
                                    <h4 style={{ margin: 0, fontWeight: 950, fontSize: '1.6rem', color: 'white' }}>Evaluación de Crítica</h4>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                    {[
                                        { name: 'Mara Sedini', role: 'Vocería (Segegob)', val: 49.7, color: '#ef4444', info: 'Mayor desgaste político' },
                                        { name: 'Jorge Quiroz', role: 'Hacienda', val: 43.7, color: '#f97316' },
                                        { name: 'María Paz Arzola', role: 'Educación', val: 40.2, color: '#fbbf24' }
                                    ].map((m, i) => (
                                        <div key={i}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                                <div>
                                                    <div style={{ fontWeight: 950, fontSize: '1rem', color: 'white' }}>{m.name}</div>
                                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700 }}>{m.role} {m.info && `· ${m.info}`}</div>
                                                </div>
                                                <div style={{ fontWeight: 950, color: m.color, fontSize: '1.2rem' }}>{m.val}%</div>
                                            </div>
                                            <div style={{ height: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', overflow: 'hidden' }}>
                                                <motion.div initial={{ width: 0 }} animate={{ width: `${m.val}%` }} transition={{ duration: 1, delay: i * 0.1 }} style={{ height: '100%', background: m.color }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>


                        {/* EXTRA ANALYSIS: NATIONAL VS INTERNATIONAL PRESS */}
                        <section style={{ marginTop: '2rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                                <div style={{ background: 'rgba(15, 23, 42, 0.4)', borderRadius: '24px', border: '1px solid rgba(56, 189, 248, 0.1)', padding: '2rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                                        <Globe size={20} color="#38bdf8" />
                                        <h4 style={{ margin: 0, fontWeight: 900, fontSize: '1.1rem' }}>Mirada Nacional</h4>
                                    </div>
                                    <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <li style={{ fontSize: '0.85rem', color: '#94a3b8', borderLeft: '3px solid #38bdf8', paddingLeft: '12px' }}>
                                            <strong style={{ color: 'white' }}>CNN/MSN:</strong> Foco en la gobernabilidad interna y el desgaste del "periodo de gracia" tras el desplome al 33.3%.
                                        </li>
                                        <li style={{ fontSize: '0.85rem', color: '#94a3b8', borderLeft: '3px solid #38bdf8', paddingLeft: '12px' }}>
                                            <strong style={{ color: 'white' }}>Emol:</strong> Análisis sobre el núcleo electoral duro que resiste ante medidas de austeridad fiscal.
                                        </li>
                                    </ul>
                                </div>

                                <div style={{ background: 'rgba(15, 23, 42, 0.4)', borderRadius: '24px', border: '1px solid #fbbf2430', padding: '2rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                                        <Globe size={20} color="#fbbf24" style={{ transform: 'rotate(180deg)' }} />
                                        <h4 style={{ margin: 0, fontWeight: 900, fontSize: '1.1rem' }}>Prensa Internacional</h4>
                                    </div>
                                    <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <li style={{ fontSize: '0.85rem', color: '#94a3b8', borderLeft: '3px solid #fbbf24', paddingLeft: '12px' }}>
                                            <strong style={{ color: 'white' }}>Bloomberg:</strong> Preocupación por la "incertidumbre política" y su impacto en inversiones mineras regionales.
                                        </li>
                                        <li style={{ fontSize: '0.85rem', color: '#94a3b8', borderLeft: '3px solid #fbbf24', paddingLeft: '12px' }}>
                                            <strong style={{ color: 'white' }}>Reuters:</strong> El aislamiento diplomático de Chile ante la pérdida de liderazgo conservador en el Cono Sur.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* ANALYSIS SECTION */}
                        <section style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div style={{ background: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.1)', padding: '2rem', borderRadius: '24px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                                    <TrendingUp color="#38bdf8" />
                                    <h4 style={{ margin: 0, fontWeight: 900 }}>Indicadores Clave</h4>
                                </div>
                                <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6 }}>
                                    El estudio mensual Pulso Ciudadano proporciona una visión profunda sobre la percepción ciudadana en temas políticos, económicos y sociales a nivel país con representatividad regional.
                                </p>
                            </div>
                            <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.1)', padding: '2rem', borderRadius: '24px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                                    <Users color="#10b981" />
                                    <h4 style={{ margin: 0, fontWeight: 900 }}>Metodología Activa</h4>
                                </div>
                                <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6 }}>
                                    Encuestas probabilísticas que permiten a los equipos de análisis ajustar las estrategias de comunicación y atención ciudadana basadas en data real y actualizada.
                                </p>
                            </div>
                        </section>

                        {/* ══════════════════════════════════════════════════════════ */}
                        {/* INFOGRAFÍA Y REPORTE (RELOCALIZADO AL FINAL)               */}
                        {/* ══════════════════════════════════════════════════════════ */}
                        <div style={{ 
                            marginTop: '3rem',
                            background: 'rgba(15, 23, 42, 0.6)', 
                            borderRadius: '24px', 
                            border: '1px solid rgba(255,255,255,0.05)', 
                            padding: '1.5rem',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <FileText size={20} color="#38bdf8" />
                                    <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>Infografía y Reporte Detallado</h3>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button className="btn-glass" style={{ padding: '8px 16px', borderRadius: '12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Share2 size={14} /> Compartir
                                    </button>
                                    <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="btn-glass" style={{ padding: '8px 16px', borderRadius: '12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <ExternalLink size={14} /> Fuente Original
                                    </a>
                                </div>
                            </div>

                            <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', background: '#e2e8f0', height: '700px' }}>
                                <div style={{ 
                                    position: 'absolute', 
                                    top: 0, 
                                    left: 0, 
                                    right: 0, 
                                    height: '60px', 
                                    background: '#0f172a', 
                                    zIndex: 2, 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    borderBottom: '1px solid rgba(56, 189, 248, 0.3)'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#38bdf8', fontWeight: 900, fontSize: '0.8rem' }}>
                                        <BarChart3 size={16} /> REVISOR DE DATOS VLS - MODO LECTURA SEGURA
                                    </div>
                                </div>
                                <iframe 
                                    src={pdfUrl} 
                                    width="100%" 
                                    height="850px" 
                                    frameBorder="0" 
                                    allowFullScreen={true}
                                    style={{ border: 'none', marginTop: '-120px' }} 
                                    title="Pulso Ciudadano Abril 2026"
                                />
                            </div>
                        </div>
                    </main>

                    {/* SIDEBAR: HISTORY */}
                    <aside>
                        <div style={{ background: 'rgba(15, 23, 42, 0.4)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', padding: '1.5rem', marginBottom: '2rem' }}>
                            <h4 style={{ margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', fontWeight: 900 }}>
                                <Clock size={18} color="#38bdf8" /> HISTORIAL DE REPORTES
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {history.map((item, idx) => (
                                    <div 
                                        key={idx} 
                                        style={{ 
                                            padding: '1rem', 
                                            background: idx === 0 ? 'rgba(56, 189, 248, 0.1)' : 'rgba(255,255,255,0.02)', 
                                            borderRadius: '16px',
                                            border: idx === 0 ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid rgba(255,255,255,0.05)',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <div style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: 950, marginBottom: '4px' }}>{item.date}</div>
                                        <div style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '8px', color: 'white' }}>{item.title}</div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '10px', color: '#94a3b8' }}>{item.type}</span>
                                            <ChevronRight size={14} color="#38bdf8" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ background: 'linear-gradient(135deg, #450a0a 0%, #020617 100%)', borderRadius: '24px', border: '1px solid #ef444450', padding: '1.5rem', marginBottom: '2rem', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, right: 0, padding: '4px 10px', background: '#ef4444', color: 'white', fontSize: '0.6rem', fontWeight: 900 }}>CRISIS DE CONFIANZA</div>
                            <h5 style={{ margin: '0 0 0.8rem 0', fontSize: '0.9rem', fontWeight: 900, color: 'white' }}>Controversia: Almuerzo Moneda</h5>
                            <div style={{ fontSize: '2rem', fontWeight: 950, color: '#ef4444', marginBottom: '5px' }}>46.5%</div>
                            <p style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
                                Ciudadanos consideran "Muy Grave" el uso de la sede presidencial para actividades personales.
                            </p>
                            <div style={{ marginTop: '10px', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                                <div style={{ width: '46.5%', height: '100%', background: '#ef4444' }}></div>
                            </div>
                        </div>

                        <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #020617 100%)', borderRadius: '24px', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '1.5rem', textAlign: 'center' }}>
                            <Info size={30} color="#38bdf8" style={{ marginBottom: '1rem' }} />
                            <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', fontWeight: 900 }}>¿Por qué este reporte?</h5>
                            <p style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.5 }}>
                                La transparencia en los datos de percepción ciudadana es fundamental para una gestión Smart City moderna y conectada con la realidad de sus habitantes.
                            </p>
                        </div>
                    </aside>

                </div>

                <footer style={{ marginTop: '4rem', padding: '2rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', color: '#475569', fontSize: '0.8rem', fontWeight: 700 }}>
                    ESTE REPORTE ES PROPIEDAD INTELECTUAL DE ACTIVA RESEARCH · DISTRIBUIDO PARA FINES INFORMATIVOS EN VLS DIGITAL 2026
                </footer>
            </motion.div>
        </div>
    );
};

export default PulsoCiudadano;
