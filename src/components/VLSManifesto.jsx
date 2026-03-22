import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, TrendingUp, Zap, Map, Rocket, Heart, Cpu, Globe } from 'lucide-react';

export default function VLSManifesto({ onClose }) {
    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    position: 'fixed', inset: 0, zIndex: 1000100,
                    background: 'rgba(2, 6, 23, 0.95)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
                    backdropFilter: 'blur(20px)'
                }}
            >
                <div style={{ position: 'relative', width: '100%', maxWidth: '750px' }}>
                    <motion.div 
                        initial={{ scale: 0.9, y: 30 }}
                        animate={{ scale: 1, y: 0 }}
                        className="glass-panel"
                        style={{
                            width: '100%', maxHeight: '90vh',
                            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 58, 138, 0.5) 100%)',
                            border: '1px solid rgba(56, 189, 248, 0.3)',
                            borderRadius: '40px', display: 'flex', flexDirection: 'column',
                            overflow: 'hidden', boxShadow: '0 20px 80px rgba(0,0,0,0.8)'
                        }}
                    >
                        {/* Header */}
                        <div style={{ padding: '2.5rem', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.3)' }}>
                            <div style={{ display: 'inline-flex', background: 'rgba(56, 189, 248, 0.15)', padding: '1rem', borderRadius: '50%', marginBottom: '1rem', color: '#38bdf8' }}>
                                <Rocket size={40} />
                            </div>
                            <h2 style={{ margin: 0, color: 'white', fontSize: '2.2rem', fontWeight: '900', letterSpacing: '2px' }}>VLS: EL MANIFIESTO</h2>
                            <p style={{ margin: '0.5rem 0 0 0', color: '#38bdf8', fontSize: '0.9rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '4px' }}>La Serena Smart City 2026</p>
                        </div>

                        {/* Content Scrollable */}
                        <div style={{ flex: 1, padding: '2.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            
                            {/* 7k Success */}
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                <div style={{ background: '#10b98120', padding: '12px', borderRadius: '15px', color: '#10b981' }}>
                                    <TrendingUp size={24} />
                                </div>
                                <div>
                                    <h4 style={{ color: 'white', margin: '0 0 5px 0', fontSize: '1.1rem' }}>El Éxito del Contenido Puro</h4>
                                    <p style={{ color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>
                                        Nuestra versión anterior alcanzó las <strong>7.000 visitas en un solo mes</strong> sin invertir un solo peso en publicidad. Esto demuestra que la comunidad de <strong>La Serena</strong> busca herramientas reales y conexión auténtica.
                                    </p>
                                </div>
                            </div>

                            {/* Technology */}
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                <div style={{ background: '#38bdf820', padding: '12px', borderRadius: '15px', color: '#38bdf8' }}>
                                    <Cpu size={24} />
                                </div>
                                <div>
                                    <h4 style={{ color: 'white', margin: '0 0 5px 0', fontSize: '1.1rem' }}>Tecnología Escalable y Sofisticada</h4>
                                    <p style={{ color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>
                                        Este es un proyecto <strong>"Homemade" (Hecho en casa)</strong>, pero no te equivoques: bajo el capó late tecnología de última generación, escalable y de bajo costo. Usamos IA avanzada y motores 3D para democratizar la innovación municipal.
                                    </p>
                                </div>
                            </div>

                            {/* Mapping Disclaimer */}
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                <div style={{ background: '#f59e0b20', padding: '12px', borderRadius: '15px', color: '#f59e0b' }}>
                                    <Map size={24} />
                                </div>
                                <div>
                                    <h4 style={{ color: 'white', margin: '0 0 5px 0', fontSize: '1.1rem' }}>Fase 1: Mapeo y Visualización</h4>
                                    <p style={{ color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>
                                        Actualmente, los reportes de baches, luminarias y seguridad nos permiten generar un <strong>mapeo real de la ciudad</strong>. Aunque aún no están conectados directamente al despacho de las autoridades, esta data es la base para sustentar cambios y soluciones concretas ante quienes toman las decisiones.
                                    </p>
                                </div>
                            </div>

                            {/* Vision */}
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                <div style={{ background: '#ef444420', padding: '12px', borderRadius: '15px', color: '#ef4444' }}>
                                    <Globe size={24} />
                                </div>
                                <div>
                                    <h4 style={{ color: 'white', margin: '0 0 5px 0', fontSize: '1.1rem' }}>Nuestro Sueño Regional</h4>
                                    <p style={{ color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>
                                        Buscamos generar una revolución en el impacto social. Soñamos con expandir este modelo a toda la conurbación y más allá, demostrando que con voluntad y tecnología se puede transformar el entorno.
                                    </p>
                                </div>
                            </div>

                        </div>

                        {/* Footer / Call to Action */}
                        <div style={{ padding: '2rem', background: 'rgba(0,0,0,0.5)', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                            <button 
                                onClick={onClose}
                                className="btn-primary-vls"
                                style={{ 
                                    padding: '1.5rem 4rem', background: '#38bdf8', color: '#0f172a', 
                                    border: 'none', borderRadius: '50px', fontWeight: '900', fontSize: '1.1rem',
                                    cursor: 'pointer', boxShadow: '0 10px 30px rgba(56, 189, 248, 0.4)'
                                }}
                            >
                                ¡ENTENDIDO! UNIRME AL SUEÑO VLS
                            </button>
                        </div>
                    </motion.div>

                    {/* Security Badge */}
                    <div style={{ position: 'absolute', top: '15px', right: '15px' }}>
                        <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#94a3b8', padding: '10px', borderRadius: '50%', cursor: 'pointer' }}>
                            <X size={24} />
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
