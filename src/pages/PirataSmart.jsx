import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Search, MapPin, Anchor, Ship, Skull, TrendingUp, Radio, Activity, 
    ShieldCheck, Zap, ExternalLink, Globe, Star, Users, Phone, Bell, 
    Video, Camera, CloudSun, Map as MapIcon, Compass, Building, Radar,
    Play, Info, ChevronRight, Layers, BarChart3, Database, MessageSquare
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import HechoEnChile from '../components/HechoEnChile';
import CoquiSmartKanban from '../components/CoquiSmartKanban';

export default function PirataSmart() {
    const [scrolled, setScrolled] = useState(false);
    const [activeTab, setActiveTab] = useState('all');
    
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const goldColor = "#fbbf24"; // SaaS Gold Coquimbo Unido
    const darkBg = "#000000"; // Elegant SaaS Black
    const panelBg = "#0a0a0a";
    const borderSemi = "rgba(251, 191, 36, 0.15)";

    const EMBAJADORES = [
        { id: 1, title: 'DON PUERTO', subtitle: 'El Corazón de la Bahía', desc: 'Soberanía portuaria y el espíritu de la bahía más importante del norte.', color: '#fbbf24' },
        { id: 2, title: 'EL TROMPETISTA', subtitle: 'Melodías del Puerto', desc: 'El ritmo y la bohemia que define la identidad sonora de las calles piratas.', color: '#38bdf8' },
        { id: 3, title: 'DON CRUZ', subtitle: 'El Vigía Espiritual', desc: 'Custodiando la paz desde la Cruz del Tercer Milenio, hito de nuestra fe.', color: '#ffffff' },
        { id: 4, title: 'LOS MENITAS', subtitle: 'La Banda del Puerto', desc: 'Tradición musical colectiva: Trompetas, Trombones y Caja Acústica en armonía.', color: '#fbbf24' },
        { id: 5, title: 'TIERRAS BLANCAS', subtitle: 'Fuerza y Trabajo', desc: 'El motor productivo y residencial que impulsa el crecimiento industrial.', color: '#ef4444' },
        { id: 6, title: 'EXALCALDES', subtitle: 'Sabiduría y Gestión', desc: 'El legado de quienes forjaron las bases de la administración pública local.', color: '#10b981' },
        { id: 7, title: 'TONGOY & GUANAQUEROS', subtitle: 'El Tesoro del Mar', desc: 'Gastronomía, turismo y la riqueza inagotable de nuestro litoral sur.', color: '#60a5fa' },
        { id: 8, title: 'LA CANTERA', subtitle: 'Origen de la Piedra', desc: 'Donde nace la materia prima que construyó los cimientos de nuestra historia.', color: '#94a3b8' },
        { id: 9, title: 'PARTE ALTA', subtitle: 'Mirador de la Ciudad', desc: 'La vista privilegiada que vigila el horizonte y protege la bahía.', color: '#ec4899' },
        { id: 10, title: 'EL CENTRO', subtitle: 'Corazón Comercial', desc: 'El núcleo vital de intercambios y la vida urbana de Coquimbo.', color: '#fcd34d' }
    ];

    const NAV_ITEMS = [
        { id: 'home', label: 'Inicio', icon: <Compass size={18} /> },
        { id: 'stories', label: 'Leyendas', icon: <Layers size={18} /> },
        { id: 'monitoring', label: 'Monitoreo', icon: <Activity size={18} /> },
        { id: 'admin', label: 'Backoffice', icon: <ShieldCheck size={18} /> }
    ];

    return (
        <div style={{ 
            background: darkBg, 
            color: 'white', 
            minHeight: '100vh', 
            fontFamily: "'Inter', sans-serif",
            overflowX: 'hidden'
        }}>
            {/* Top SaaS Bar */}
            <div style={{ background: '#0a0a0a', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '0.4rem 2rem', display: 'flex', justifyContent: 'flex-end', gap: '2rem', fontSize: '11px', fontWeight: 'bold', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px' }}>
                <span>SERVICE STATUS: <span style={{ color: '#10b981' }}>OPERATIONAL</span></span>
                <span>GLOBAL OPS: COQUIMBO HUB #4</span>
                <span>SECURE SSL ACTIVE</span>
            </div>

            {/* Main Navigation SaaS */}
            <nav style={{
                position: 'fixed', top: '1.8rem', width: '100%', zIndex: 1000,
                background: scrolled ? 'rgba(0, 0, 0, 0.9)' : 'transparent',
                backdropFilter: scrolled ? 'blur(15px)' : 'none',
                borderBottom: scrolled ? `1px solid ${borderSemi}` : 'none',
                padding: '1rem 3rem', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                    <div style={{ background: goldColor, padding: '10px', borderRadius: '14px', boxShadow: `0 0 25px ${goldColor}50` }}>
                        <Skull size={28} color="black" />
                    </div>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '950', letterSpacing: '-1px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            COQUIMBO STORIES <span style={{ background: goldColor, color: 'black', fontSize: '10px', padding: '2px 8px', borderRadius: '4px', letterSpacing: '1px' }}>SaaS 2026</span>
                        </h1>
                        <span style={{ fontSize: '10px', color: '#666', fontWeight: 'bold' }}>BY SMART COMUNA NETWORK</span>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
                    {NAV_ITEMS.map(item => (
                        <button key={item.id} className="nav-hover-gold" style={{ 
                            background: 'none', border: 'none', color: scrolled ? '#999' : 'white', fontWeight: '800', 
                            fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                            transition: '0.2s', textTransform: 'uppercase', letterSpacing: '1px'
                        }}>
                            {React.cloneElement(item.icon, { size: 16 })} {item.label}
                        </button>
                    ))}
                    <button 
                        onClick={() => window.location.href = '/'}
                        style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', padding: '0.6rem 1.4rem', borderRadius: '10px', fontWeight: '900', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        <Globe size={14} /> LS HUB
                    </button>
                    <button style={{ background: goldColor, color: 'black', border: 'none', padding: '0.6rem 1.4rem', borderRadius: '10px', fontWeight: '900', fontSize: '0.75rem', cursor: 'pointer', boxShadow: `0 5px 15px ${goldColor}40` }}>
                        LOGIN ADMIN
                    </button>
                </div>
            </nav>

            {/* Hero Section SaaS */}
            <header style={{ 
                padding: '15rem 4rem 10rem', position: 'relative', overflow: 'hidden',
                background: 'radial-gradient(circle at 10% 20%, rgba(251, 191, 36, 0.08) 0%, transparent 40%)'
            }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', alignItems: 'center' }}>
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }} 
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(251,191,36,0.1)', padding: '8px 20px', borderRadius: '100px', border: `1px solid ${goldColor}30`, marginBottom: '2.5rem' }}>
                            <Zap size={16} color={goldColor} fill={goldColor} />
                            <span style={{ fontSize: '0.7rem', fontWeight: '950', color: goldColor, letterSpacing: '4px' }}>TECNOLOGÍA SOBERANA AURINEGRA</span>
                        </div>

                        <h2 style={{ fontSize: 'clamp(3.5rem, 6vw, 6rem)', fontWeight: '950', lineHeight: 0.85, marginBottom: '2.5rem', letterSpacing: '-3px' }}>
                            Coquimbo Stories:<br/>
                            <span style={{ color: goldColor, position: 'relative' }}>
                                Barrios y Leyendas
                                <motion.div 
                                    initial={{ width: 0 }} 
                                    animate={{ width: '100%' }} 
                                    transition={{ delay: 0.5, duration: 1 }}
                                    style={{ position: 'absolute', bottom: 10, left: 0, height: '8px', background: goldColor, opacity: 0.2, zIndex: -1 }} 
                                />
                            </span>
                        </h2>

                        <p style={{ fontSize: '1.4rem', color: '#888', maxWidth: '700px', marginBottom: '4rem', lineHeight: '1.6', fontWeight: '500' }}>
                            Descubre la identidad única de nuestro puerto a través de sus personajes lúdicos e hitos patrimoniales. Una plataforma SaaS unificada para la gestión ciudadana y cultural.
                        </p>

                        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                            <button className="gold-glow" style={{ background: goldColor, color: 'black', border: 'none', padding: '1.5rem 3rem', borderRadius: '20px', fontWeight: '950', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                ACCESO BACKOFFICE <ChevronRight size={20} />
                            </button>
                            <button style={{ background: 'rgba(255,255,255,0.03)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', padding: '1.5rem 3rem', borderRadius: '20px', fontWeight: '950', fontSize: '1.1rem', cursor: 'pointer' }}>
                                VER DEMO INTERACTIVA
                            </button>
                        </div>
                    </motion.div>

                    {/* Interactive Map Placeholder / World Visual */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
                    >
                        <div style={{ width: '100%', aspectRatio: '1/1', background: 'rgba(255,255,255,0.02)', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {/* Animated Rings */}
                            <div className="animate-ping" style={{ position: 'absolute', inset: 0, border: `1px solid ${goldColor}20`, borderRadius: '50%', animationDuration: '3s' }} />
                            <div className="animate-pulse" style={{ position: 'absolute', inset: '20%', border: `1px solid ${goldColor}10`, borderRadius: '50%', animationDuration: '4s' }} />
                            
                            <img src="/img/mapa_coquimbo_storia.png" alt="Coquimbo World" style={{ width: '80%', filter: 'drop-shadow(0 0 50px rgba(251,191,36,0.3))' }} />
                            
                            {/* Floating Stats */}
                            <div style={{ position: 'absolute', bottom: '10%', right: '-10%', background: '#111', padding: '1.5rem', borderRadius: '25px', border: `1px solid ${goldColor}30`, boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
                                <div style={{ fontSize: '10px', color: goldColor, fontWeight: '900', letterSpacing: '2px', marginBottom: '8px' }}>REAL-TIME NODES</div>
                                <div style={{ fontSize: '2rem', fontWeight: '950' }}>1,248</div>
                                <div style={{ fontSize: '11px', color: '#555' }}>Active stories today</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* Module 1: Embajadores Territoriales */}
            <section style={{ padding: '8rem 4rem', background: '#0a0a0a' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '5rem' }}>
                        <div>
                            <div style={{ fontSize: '0.8rem', fontWeight: '950', color: goldColor, letterSpacing: '5px', marginBottom: '1rem' }}>MÓDULO CULTURAL #01</div>
                            <h3 style={{ fontSize: '4rem', fontWeight: '950', letterSpacing: '-2px' }}>Embajadores <span style={{ color: goldColor }}>Territoriales</span></h3>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '5px', borderRadius: '12px', display: 'flex', gap: '5px' }}>
                            <button onClick={() => setActiveTab('all')} style={{ background: activeTab === 'all' ? goldColor : 'transparent', color: activeTab === 'all' ? 'black' : '#999', padding: '10px 20px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>TODOS</button>
                            <button onClick={() => setActiveTab('port')} style={{ background: activeTab === 'port' ? goldColor : 'transparent', color: activeTab === 'port' ? 'black' : '#999', padding: '10px 20px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>PUERTO</button>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
                        {EMBAJADORES.map((char) => (
                            <motion.div 
                                key={char.id}
                                whileHover={{ y: -15, borderColor: goldColor }}
                                style={{ 
                                    background: '#111', borderRadius: '35px', padding: '2.5rem', 
                                    border: '1px solid rgba(255,255,255,0.05)', transition: '0.3s border-color ease',
                                    display: 'flex', flexDirection: 'column', gap: '1.5rem',
                                    position: 'relative', overflow: 'hidden'
                                }}
                            >
                                <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: `radial-gradient(circle at top right, ${char.color}15, transparent)`, zIndex: 0 }} />
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                                    <div style={{ background: 'rgba(0,0,0,0.5)', padding: '15px', borderRadius: '20px', border: `1px solid ${char.color}40` }}>
                                        <Users size={32} color={char.color} />
                                    </div>
                                    <span style={{ fontSize: '10px', color: '#555', fontWeight: '900' }}>ID_{char.id.toString().padStart(3, '0')}</span>
                                </div>

                                <div style={{ position: 'relative', zIndex: 1 }}>
                                    <h4 style={{ fontSize: '1.6rem', fontWeight: '950', color: 'white', marginBottom: '0.5rem' }}>{char.title}</h4>
                                    <h5 style={{ fontSize: '0.9rem', color: goldColor, fontWeight: '800', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{char.subtitle}</h5>
                                    <p style={{ color: '#777', lineHeight: '1.6', fontSize: '1rem' }}>{char.desc}</p>
                                </div>

                                <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                                    <button style={{ background: 'none', border: 'none', color: goldColor, fontWeight: 'bold', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                        AUDITAR NODO <ExternalLink size={14} />
                                    </button>
                                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: char.color, opacity: 0.2 }} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Kanban CRM Integration */}
            <section style={{ padding: '8rem 4rem' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: '950', color: goldColor, letterSpacing: '5px', marginBottom: '1rem' }}>COLABORACIÓN ACTIVA</div>
                        <h3 style={{ fontSize: '3.5rem', fontWeight: '950', letterSpacing: '-2px' }}>Gestión de <span style={{ color: goldColor }}>Proyectos Comunitarios</span></h3>
                    </div>
                    <CoquiSmartKanban />
                </div>
            </section>

            {/* Module 2: Georreferenciación Smart */}
            <section style={{ padding: '8rem 4rem', background: '#0a0a0a' }}>
                 <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(400px, 1fr) 1.5fr', gap: '6rem', alignItems: 'center' }}>
                    <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: '950', color: goldColor, letterSpacing: '5px', marginBottom: '1rem' }}>DATA VIZ #02</div>
                        <h3 style={{ fontSize: '3.5rem', fontWeight: '950', letterSpacing: '-2px', marginBottom: '2.5rem' }}>Georreferenciación <span style={{ color: goldColor }}>Smart Coquimbo</span></h3>
                        <p style={{ fontSize: '1.2rem', color: '#777', lineHeight: '1.8', marginBottom: '3rem' }}>
                            Monitoreo en tiempo real de los hitos patrimoniales y flujo de interacción ciudadana mediante nuestra red de sensores inteligentes y social listening.
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            {[
                                { label: 'Cruz del Tercer Milenio', status: 'ACTIVE', color: '#10b981' },
                                { label: 'Estadio FSR', status: 'EVENT LIVE', color: '#38bdf8' },
                                { label: 'Barrio Inglés', status: 'VIBRANT', color: '#fbbf24' },
                                { label: 'Fuerte Lambert', status: 'LOW TRAFFIC', color: '#94a3b8' }
                            ].map(site => (
                                <div key={site.label} style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div style={{ fontSize: '10px', color: site.color, fontWeight: '900', marginBottom: '5px' }}>{site.status}</div>
                                    <div style={{ fontWeight: 'bold' }}>{site.label}</div>
                                </div>
                            ))}
                        </div>

                        <button style={{ marginTop: '3rem', background: goldColor, color: 'black', border: 'none', padding: '1.2rem 2.5rem', borderRadius: '15px', fontWeight: '950', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <MapPin size={20} /> VER MAPA COMPLETO
                        </button>
                    </div>

                    <div style={{ background: '#111', borderRadius: '40px', overflow: 'hidden', padding: '2rem', border: `1px solid ${goldColor}20`, height: '600px', position: 'relative' }}>
                         <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(0,0,0,0.8)', padding: '1rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)', zIndex: 10 }}>
                             <div style={{ fontSize: '9px', fontWeight: '900', color: goldColor, letterSpacing: '2px' }}>LAYER ACTIVE: HEATMAP_VLS</div>
                             <div style={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
                                 <div style={{ width: '4px', height: '12px', background: '#ef4444' }} />
                                 <div style={{ width: '4px', height: '12px', background: '#fbbf24' }} />
                                 <div style={{ width: '4px', height: '12px', background: '#10b981' }} />
                             </div>
                         </div>
                         <div style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '2rem' }}>
                             <Radar size={80} color={goldColor} className="animate-pulse" />
                             <div style={{ textAlign: 'center' }}>
                                 <h4 style={{ fontWeight: '900', fontSize: '1.5rem' }}>MONITOR CRÉDITO SOCIAL ACTIVO</h4>
                                 <p style={{ color: '#555' }}>Proyectando flujos de red territorial...</p>
                             </div>
                         </div>
                    </div>
                 </div>
            </section>

            {/* Backoffice Architecture Section (Technical) */}
            <section style={{ padding: '8rem 4rem', background: '#000' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: '950', color: goldColor, letterSpacing: '5px', marginBottom: '2rem' }}>ARCHITECTURE & CLOUD</div>
                    <h3 style={{ fontSize: '3rem', fontWeight: '950', marginBottom: '4rem' }}>Infraestructura <span style={{ color: goldColor }}>Enterprise SaaS</span></h3>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', textAlign: 'left' }}>
                        {[
                            { title: 'Relational Schema (SQL)', desc: 'Tablas normalizadas para Ciudadanos, Proyectos y Métricas Territoriales con integridad referencial.', icon: <Database /> },
                            { title: 'Worker Edge Runtime', desc: 'Despliegue global en milisegundos mediante Cloudflare Workers para una baja latencia.', icon: <Zap /> },
                            { title: 'Backoffice Bridge', desc: 'Integración vía API REST con Auth JWT para conectar el frontend con el Core de Gestión.', icon: <Layers /> }
                        ].map(tech => (
                            <div key={tech.title} style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '25px', background: 'rgba(255,255,255,0.01)' }}>
                                <div style={{ color: goldColor, marginBottom: '1.2rem' }}>{React.cloneElement(tech.icon, { size: 24 })}</div>
                                <h4 style={{ fontWeight: '900', marginBottom: '1rem' }}>{tech.title}</h4>
                                <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.6' }}>{tech.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer SaaS */}
            <footer style={{ padding: '5rem 4rem', borderTop: '1px solid rgba(255,255,255,0.05)', background: '#050505' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '3rem' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <Skull size={24} color={goldColor} />
                            <span style={{ fontSize: '1.2rem', fontWeight: '950', letterSpacing: '-1px' }}>COQUIMBO<span style={{ color: goldColor }}>STORIES</span></span>
                        </div>
                        <p style={{ color: '#444', fontSize: '12px', maxWidth: '300px' }}>© 2026 Smart Comuna Network. Todos los derechos reservados bajo licencia de soberanía tecnológica regional.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '3rem' }}>
                        <div>
                            <div style={{ color: 'white', fontWeight: 'bold', fontSize: '12px', marginBottom: '1.2rem' }}>PRODUCTO</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '12px', color: '#555' }}>
                                <span>Embajadores</span>
                                <span>Geomapping</span>
                                <span>Backoffice</span>
                            </div>
                        </div>
                        <div>
                            <div style={{ color: 'white', fontWeight: 'bold', fontSize: '12px', marginBottom: '1.2rem' }}>LEGAL</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '12px', color: '#555' }}>
                                <span>Privacidad</span>
                                <span>Soberanía de Datos</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: '5rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.02)', textAlign: 'center' }}>
                    <HechoEnChile dark={true} />
                </div>
            </footer>
        </div>
    );
}
