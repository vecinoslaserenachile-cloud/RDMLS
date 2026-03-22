import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BibliotecaDigital from '../components/BibliotecaDigital';
import { ShieldAlert, Users, Phone, Map, DollarSign, Briefcase, Landmark, BookOpen, Clock, Zap, ArrowRight, Heart, Bus, Droplets, LogOut, Gamepad2, Tv, PlayCircle, ShoppingCart, CalendarDays, Building, Book, Box, Sparkles, Radio, Palette, Newspaper, Bot, Smartphone, Waves, Mic2, Wind, Camera, Network } from 'lucide-react';

export default function VecinoDashboard() {
    const navigate = useNavigate();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [showLibrary, setShowLibrary] = useState(false);
    // Actividades alimentadas por Sentinel Faro (Social Listening & Vecino Input)
    const [vecinoEvents, setVecinoEvents] = useState([
        { name: "CDLS vs Coquimbo (Juveniles)", month: 2, day: 14, importance: 'HIGH', label: '⚽ CLÁSICO REGIONAL', source: 'SENTINEL_FARO' },
        { name: "Mantención Eléctrica CGE", month: 2, day: 14, importance: 'CRITICAL', label: '⚡ ALERTA SUMINISTRO', source: 'SENTINEL_FARO' },
        { name: "Vacunatorio Móvil Plaza", month: 2, day: 16, importance: 'HIGH', label: '💉 OPERATIVO SALUD', source: 'USER_REPORT' },
        { name: "Asamblea Seguridad Vecinal", month: 2, day: 18, importance: 'MID', label: '🛡️ PAZ CIUDADANA', source: 'SENTINEL_FARO' },
        { name: "Cine bajo las estrellas", month: 2, day: 20, importance: 'MID', label: '🎬 CULTURA BARRIAL', source: 'SENTINEL_FARO' }
    ]);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatoFecha = new Intl.DateTimeFormat('es-CL', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(currentTime);

    const getHitosVecinales = () => {
        const now = currentTime;
        const year = now.getFullYear();

        // Combinamos Efemérides Nacionales con Base de Datos de Vecinos (Sentinel)
        const hitosInstitucionales = [
            { name: "Aniversario La Serena fundador", month: 7, day: 26, importance: 'HIGH', label: '⚓ 482 AÑOS DE HISTORIA' },
            { name: "Fiestas Patrias", month: 8, day: 18, importance: 'CRITICAL', label: '🇨🇱 DÍECIOCHO DE SEPTIEMBRE' },
            { name: "Fiestas Patrias (Día 2)", month: 8, day: 19, importance: 'CRITICAL', label: '🇨🇱 GLORIAS DEL EJÉRCITO' },
            { name: "Fiestas Patrias (Día 3)", month: 8, day: 20, importance: 'CRITICAL', label: '🇨🇱 CIERRE DE FESTIVIDADES' },
            { name: "Navidad", month: 11, day: 25, importance: 'HIGH', label: '🎄 NOCHEBUENA' },
            { name: "Año Nuevo", month: 0, day: 1, importance: 'CRITICAL', label: '🎆 BIENVENIDO 2026' },
            { name: "Día del Trabajador", month: 4, day: 1, importance: 'MID', label: '👷 MÉRITO LABORAL' },
            { name: "Glorias Navales", month: 4, day: 21, importance: 'MID', label: '🚢 COMBATE NAVAL IQUIQUE' }
        ];

        const allHitos = [...vecinoEvents, ...hitosInstitucionales];

        for (const hito of allHitos) {
            const hitoDate = new Date(year, hito.month, hito.day);
            if (now.getMonth() === hito.month && now.getDate() === hito.day) {
                return {
                    text: `HOY: ${hito.label}`,
                    color: hito.source ? "#ec4899" : "#22c55e",
                    sub: hito.name,
                    icon: hito.source ? '🌟' : '📅'
                };
            }

            const diffTime = hitoDate - now;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays > 0 && diffDays <= 30) {
                const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let color = "#94a3b8";
                if (hito.source) color = "#ec4899"; // Color distintivo para eventos de vecinos
                else if (hito.importance === 'CRITICAL') color = "#ef4444";
                else if (hito.importance === 'HIGH') color = "#00f3ff";

                return {
                    text: `QUEDAN ${diffDays}d ${hours}h PARA: ${hito.name}`,
                    color: color,
                    sub: hito.label,
                    days: diffDays,
                    source: hito.source
                };
            }
        }

        return { text: "TIEMPO ORDINARIO", color: "#64748b", sub: "Sin eventos próximos detectados" };
    };

    const hitoActual = getHitosVecinales();

    const handleLogout = () => {
        localStorage.removeItem('smart_tenant');
        navigate('/welcome');
    };

    const reportesSOS = [
        { title: 'Denuncias y Seguridad (SOS)', icon: ShieldAlert, color: '#ef4444', desc: 'Conexión directa C5, Carabineros y Paz Ciudadana.', path: '/citizens' },
        { title: 'Reportes de Tránsito', icon: Bus, color: '#3b82f6', desc: 'Baches, semáforos, vehículos abandonados o accidentes.', path: '/citizens' },
        { title: 'Servicios Básicos y Sanidad', icon: Droplets, color: '#0ea5e9', desc: 'Reclamos por agua, luz, basura y tenencia responsable.', path: '/citizens' },
        { title: 'Salud y Farmacia (Ayuda)', icon: Heart, color: '#10b981', desc: 'Requerimientos urgentes, CESFAM y farmacias turno.', path: '/citizens' }
    ];

    const tramitesVinculados = [
        { title: 'Subsidios y Ayudas Sociales', icon: DollarSign, color: '#f59e0b', desc: 'Postulación a Dideco, bonos estatales y ficha de protección.', path: '/citizens' },
        { title: 'Patentes y Emprendimiento', icon: Briefcase, color: '#8b5cf6', desc: 'Pago de patentes comerciales, Sercotec y permisos.', path: '/citizens' },
        { title: 'Juntas de Vecinos', icon: Users, color: '#f97316', desc: 'Participación territorial, certificados de residencia y asambleas.', path: '/citizens' },
        { title: 'GORE, SEREMIS y Fiscalizadores', icon: Landmark, color: '#d4af37', desc: 'Proyectos regionales, audiencias públicas y Contraloría.', path: '/citizens' }
    ];

    const bordeCostero = [
        { title: 'Bodyboard & Surf', icon: Waves, color: '#38bdf8', desc: 'Reportes de oleaje, campeonatos y "fiesta del bodyboard" en El Faro.', path: '/eventos' },
        { title: 'Zona Roller & Skate', icon: Wind, color: '#f59e0b', desc: 'Rutas de patinaje, encuentros y estado de la ciclovía.', path: '/eventos' },
        { title: 'Arena Deportiva', icon: Zap, color: '#fbbf24', desc: 'Voleibol playa, fútbol tenis y actividades en la arena.', path: '/eventos' }
    ];

    const expresionJoven = [
        { title: 'K-Pop Hub', icon: Mic2, color: '#ec4899', desc: 'Espacio para dance cover, ensayos en el Mall y competencias.', path: '/eventos' },
        { title: 'Galería Urbana', icon: Palette, color: '#a855f7', desc: 'Muralismo, grafiti y fotografía urbana de nuestra ciudad.', path: '/eventos' },
        { title: 'Escenario Abierto', icon: Camera, color: '#10b981', desc: 'Batallas de freestyle, bandas emergentes y danza.', path: '/eventos' }
    ];

    const panoramasYActividades = [
        { title: 'Cultura, Turismo y Deportes', icon: BookOpen, color: '#06b6d4', desc: 'Cartelera del Teatro, talleres, campeonatos y eventos turísticos.', path: '/eventos' },
        { title: 'Muros Smart (Grafiteros y Vecinos)', icon: Palette, color: '#14b8a6', desc: 'Conecta artistas urbanos (grafiteros) con vecinos que donan sus muros para arte, embelleciendo la ciudad.', path: '/eventos' },
        { title: 'Ferias y Emprendimiento Local', icon: ShoppingCart, color: '#84cc16', desc: 'Ruta de ferias libres, bazares y productos locales de la comuna.', path: '/emprende' },
        { title: 'Agenda Comunal Interactiva', icon: CalendarDays, color: '#6366f1', desc: 'Calendario de actividades cívicas y ceremonias municipales en vivo.', path: '/eventos' }
    ];

    const handleOpenSentinelMini = () => window.dispatchEvent(new CustomEvent('open-sentinel-mini'));
    const handleOpenSentinelApex = () => window.dispatchEvent(new CustomEvent('open-sentinel-apex'));
    const handleOpenFaro = () => window.dispatchEvent(new CustomEvent('open-luz-foco'));
    const handleTriggerSerenitoSecurity = () => window.dispatchEvent(new CustomEvent('trigger-serenito-security'));

    const handleOpenKiosko = () => window.dispatchEvent(new CustomEvent('open-kiosko-diarios'));

    const innovacionesVls = [
        { title: 'Cuadro de Distancias', icon: Map, color: '#38bdf8', desc: 'Calcula rutas y tiempos georeferenciados desde La Serena.', action: () => window.dispatchEvent(new CustomEvent('open-distances')) },
        { title: 'Kiosko de Diarios', icon: Newspaper, color: '#10b981', desc: 'Revistas y diarios tradicionales de La Serena y Chile.', action: handleOpenKiosko },
        { title: 'Crea tu Web/App', icon: Smartphone, color: '#38bdf8', desc: 'Constructor Smart Wizard para levantar sitios profesionales.', path: '/welcome' },
        { title: 'VLS Lab 3D', icon: Box, color: '#c084fc', desc: 'Diseña y genera personajes 3D (Serenitos).', path: '/hub-comunicaciones' },
        { title: 'Biblioteca VLS', icon: BookOpen, color: '#fcd34d', desc: 'Acceso a libros gratuitos con simulador E-Ink.', action: () => setShowLibrary(true) },
        { title: 'Sentinel Faro Apex', icon: Sparkles, color: '#10b981', desc: 'Inteligencia artificial (Escucha Social).', action: handleOpenSentinelApex },
        { title: 'VLS Broadcast', icon: Radio, color: '#ef4444', desc: 'Plataforma vecinal independiente para denuncias.', path: '/broadcast' }
    ];

    return (
        <div style={{ minHeight: '100vh', background: '#0f172a', padding: '2rem 1rem', fontFamily: 'Inter, sans-serif', transform: 'scale(0.85)', transformOrigin: 'top center', overflowX: 'hidden' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

                {/* Header Vecinal */}
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: '#ec4899', padding: '1rem', borderRadius: '16px', display: 'flex' }}>
                            <Users size={32} color="white" />
                        </div>
                        <div>
                            <img src="/vls_logo_3d_premium_1773521409747.png" alt="Vecinos VLS" style={{ height: '50px', marginBottom: '0.5rem', filter: 'drop-shadow(0 0 10px rgba(255,100,100,0.3))' }} />
                            <h1 style={{ margin: 0, color: 'white', fontSize: '2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                Portal Vecinal Central
                            </h1>
                            <p style={{ margin: '0.25rem 0 0 0', color: '#94a3b8', fontSize: '1rem' }}>
                                Acceso unificado a trámites estatales y comunales.
                            </p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div className="header-time-desktop" style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            {hitoActual && (
                                <div style={{
                                    background: hitoActual.source ? 'rgba(236, 72, 153, 0.1)' : `${hitoActual.color}10`,
                                    border: `1px solid ${hitoActual.source ? '#ec4899' : hitoActual.color}30`,
                                    color: hitoActual.source ? '#ec4899' : hitoActual.color,
                                    padding: '6px 14px',
                                    borderRadius: '12px',
                                    fontSize: '0.75rem',
                                    fontWeight: '900',
                                    marginBottom: '10px',
                                    textAlign: 'right',
                                    boxShadow: hitoActual.days < 5 ? `0 0 20px ${hitoActual.color}40` : 'none',
                                    animation: (hitoActual.days < 5 || hitoActual.source) ? 'pulse 1.5s infinite' : 'none',
                                    position: 'relative'
                                }}>
                                    <div style={{ fontSize: '0.55rem', opacity: 0.8, letterSpacing: '2px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '5px' }}>
                                        {hitoActual.source && <Sparkles size={10} />} {hitoActual.sub}
                                    </div>
                                    {hitoActual.text}
                                    {hitoActual.source && (
                                        <div style={{ fontSize: '0.5rem', marginTop: '2px', opacity: 0.6 }}>ALIMENTADO POR SENTINEL FARO 📡</div>
                                    )}
                                </div>
                            )}
                            <p style={{ margin: 0, color: 'white', fontWeight: 'bold' }}>{formatoFecha}</p>
                            <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem' }}>{currentTime.toLocaleTimeString('es-CL')}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '50px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }}
                            onMouseOver={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
                            onMouseOut={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                        >
                            <LogOut size={18} /> Salir
                        </button>
                    </div>
                    {showLibrary && <BibliotecaDigital onClose={() => setShowLibrary(false)} />}
        </header>

                <div className="dashboard-grid-container">

                    <main>
                        {/* Alerta Destacada */}
                        <div style={{ background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(153, 27, 27, 0.4) 100%)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '16px', padding: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'flex-start', gap: '1rem', boxShadow: '0 4px 20px rgba(239, 68, 68, 0.15)' }}>
                            <Zap color="#ef4444" size={32} style={{ flexShrink: 0, marginTop: '5px' }} />
                            <div>
                                <h3 style={{ margin: '0 0 0.5rem 0', color: 'white', fontSize: '1.2rem' }}>Emergencias en Desarrollo</h3>
                                <p style={{ margin: 0, color: '#fca5a5', lineHeight: '1.5' }}>
                                    Corte temporal de ruta D-43 por trabajos en la vía. Se recomienda tomar alternativas por Panamericana Norte. Tiempo estimado de reposición: 2 horas.
                                </p>
                            </div>
                        </div>

                        {/* Sección 1 */}
                        <h2 style={{ color: '#ef4444', fontSize: '1.4rem', marginBottom: '1.5rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ShieldAlert size={24} /> REPORTES / DENUNCIAS / AYUDA / SOS</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                            {reportesSOS.map((mod, idx) => (
                                <div
                                    key={idx}
                                    style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', position: 'relative', overflow: 'hidden' }}
                                    onMouseOver={e => {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                        e.currentTarget.style.background = 'rgba(30, 41, 59, 0.8)';
                                        e.currentTarget.style.borderColor = mod.color;
                                        e.currentTarget.style.boxShadow = `0 10px 25px ${mod.color}20`;
                                    }}
                                    onMouseOut={e => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.background = 'rgba(30, 41, 59, 0.5)';
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                    onClick={() => navigate(mod.path)}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${mod.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <mod.icon size={24} color={mod.color} />
                                        </div>
                                        <h3 style={{ margin: 0, color: 'white', fontSize: '1.1rem', lineHeight: '1.3' }}>{mod.title}</h3>
                                    </div>
                                    <p style={{ margin: '0 0 1.5rem 0', color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5', flex: 1 }}>
                                        {mod.desc}
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', color: mod.color, fontWeight: 'bold', fontSize: '0.9rem', gap: '0.5rem', marginTop: 'auto' }}>
                                        Ingresar a Módulo <ArrowRight size={16} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Sección 2 */}
                        <h2 style={{ color: '#3b82f6', fontSize: '1.4rem', marginBottom: '1.5rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Landmark size={24} /> TRÁMITES VINCULADOS A MUNICIPIO Y GOBIERNO</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                            {tramitesVinculados.map((mod, idx) => (
                                <div
                                    key={idx}
                                    style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', position: 'relative', overflow: 'hidden' }}
                                    onMouseOver={e => {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                        e.currentTarget.style.background = 'rgba(30, 41, 59, 0.8)';
                                        e.currentTarget.style.borderColor = mod.color;
                                        e.currentTarget.style.boxShadow = `0 10px 25px ${mod.color}20`;
                                    }}
                                    onMouseOut={e => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.background = 'rgba(30, 41, 59, 0.5)';
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                    onClick={() => navigate(mod.path)}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${mod.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <mod.icon size={24} color={mod.color} />
                                        </div>
                                        <h3 style={{ margin: 0, color: 'white', fontSize: '1.1rem', lineHeight: '1.3' }}>{mod.title}</h3>
                                    </div>
                                    <p style={{ margin: '0 0 1.5rem 0', color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5', flex: 1 }}>
                                        {mod.desc}
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', color: mod.color, fontWeight: 'bold', fontSize: '0.9rem', gap: '0.5rem', marginTop: 'auto' }}>
                                        Iniciar Trámite <ArrowRight size={16} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Sección 3 */}
                        <h2 style={{ color: '#06b6d4', fontSize: '1.4rem', marginBottom: '1.5rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CalendarDays size={24} /> PANORAMAS, EMPRENDIMIENTO Y CONVOCATORIAS</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                            {panoramasYActividades.map((mod, idx) => (
                                <div
                                    key={idx}
                                    style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', position: 'relative', overflow: 'hidden' }}
                                    onMouseOver={e => {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                        e.currentTarget.style.background = 'rgba(30, 41, 59, 0.8)';
                                        e.currentTarget.style.borderColor = mod.color;
                                        e.currentTarget.style.boxShadow = `0 10px 25px ${mod.color}20`;
                                    }}
                                    onMouseOut={e => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.background = 'rgba(30, 41, 59, 0.5)';
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                    onClick={() => navigate(mod.path)}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${mod.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <mod.icon size={24} color={mod.color} />
                                        </div>
                                        <h3 style={{ margin: 0, color: 'white', fontSize: '1.1rem', lineHeight: '1.3' }}>{mod.title}</h3>
                                    </div>
                                    <p style={{ margin: '0 0 1.5rem 0', color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5', flex: 1 }}>
                                        {mod.desc}
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', color: mod.color, fontWeight: 'bold', fontSize: '0.9rem', gap: '0.5rem', marginTop: 'auto' }}>
                                        Explorar Sector <ArrowRight size={16} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Sección Borde Costero */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ color: '#38bdf8', fontSize: '1.4rem', margin: 0, fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Waves size={24} /> BORDE COSTERO Y DEPORTES EXTREMOS</h2>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(56, 189, 248, 0.1)', padding: '0.4rem 0.8rem', borderRadius: '50px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                                <img src="/avatars/kevin_costanera.png" alt="Kevin Costanera" style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#38bdf8' }} />
                                <span style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 'bold' }}>KEVIN COSTANERA</span>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                            {bordeCostero.map((mod, idx) => (
                                <div
                                    key={idx}
                                    style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', position: 'relative', overflow: 'hidden' }}
                                    onMouseOver={e => {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                        e.currentTarget.style.background = 'rgba(30, 41, 59, 0.8)';
                                        e.currentTarget.style.borderColor = mod.color;
                                        e.currentTarget.style.boxShadow = `0 10px 25px ${mod.color}20`;
                                    }}
                                    onMouseOut={e => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.background = 'rgba(30, 41, 59, 0.5)';
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                    onClick={() => navigate(mod.path)}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${mod.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <mod.icon size={24} color={mod.color} />
                                        </div>
                                        <h3 style={{ margin: 0, color: 'white', fontSize: '1.1rem', lineHeight: '1.3' }}>{mod.title}</h3>
                                    </div>
                                    <p style={{ margin: '0 0 1.5rem 0', color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5', flex: 1 }}>
                                        {mod.desc}
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', color: mod.color, fontWeight: 'bold', fontSize: '0.9rem', gap: '0.5rem', marginTop: 'auto' }}>
                                        Ver Deportes <ArrowRight size={16} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Sección Expresión Joven */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ color: '#ec4899', fontSize: '1.4rem', margin: 0, fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Sparkles size={24} /> EXPRESIÓN JOVEN (CULTURA & ARTE)</h2>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(236, 72, 153, 0.1)', padding: '0.4rem 0.8rem', borderRadius: '50px', border: '1px solid rgba(236, 72, 153, 0.2)' }}>
                                <img src="/avatars/compita.png" alt="La Compa" style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#ec4899' }} />
                                <span style={{ fontSize: '0.75rem', color: '#ec4899', fontWeight: 'bold' }}>LA COMPA & COMPITA</span>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                            {expresionJoven.map((mod, idx) => (
                                <div
                                    key={idx}
                                    style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', position: 'relative', overflow: 'hidden' }}
                                    onMouseOver={e => {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                        e.currentTarget.style.background = 'rgba(30, 41, 59, 0.8)';
                                        e.currentTarget.style.borderColor = mod.color;
                                        e.currentTarget.style.boxShadow = `0 10px 25px ${mod.color}20`;
                                    }}
                                    onMouseOut={e => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.background = 'rgba(30, 41, 59, 0.5)';
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                    onClick={() => navigate(mod.path)}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${mod.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <mod.icon size={24} color={mod.color} />
                                        </div>
                                        <h3 style={{ margin: 0, color: 'white', fontSize: '1.1rem', lineHeight: '1.3' }}>{mod.title}</h3>
                                    </div>
                                    <p style={{ margin: '0 0 1.5rem 0', color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5', flex: 1 }}>
                                        {mod.desc}
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', color: mod.color, fontWeight: 'bold', fontSize: '0.9rem', gap: '0.5rem', marginTop: 'auto' }}>
                                        Explorar Arte <ArrowRight size={16} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Sección 4 */}
                        <h2 style={{ color: '#ec4899', fontSize: '1.4rem', marginBottom: '1.5rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Gamepad2 size={24} /> RECUERDOS / PATRIMONIO / RETROJUEGOS Y ENTRETENCIÓN</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                            <div
                                style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'all 0.3s' }}
                                onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                                onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                                onClick={() => navigate('/senior-games')}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(236, 72, 153, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Gamepad2 size={24} color="#ec4899" />
                                    </div>
                                    <h3 style={{ margin: 0, color: 'white', fontSize: '1.1rem' }}>Juegos Retro</h3>
                                </div>
                                <p style={{ margin: '0 0 1.5rem 0', color: '#94a3b8', fontSize: '0.9rem', flex: 1 }}>Salón arcade clásico, sopa de letras y memorice para usar de sobremesa familiar.</p>
                                <div style={{ color: '#ec4899', fontWeight: 'bold', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Jugar <ArrowRight size={16} /></div>
                            </div>

                            <div
                                style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'all 0.3s' }}
                                onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                                onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                                onClick={() => {
                                    window.dispatchEvent(new CustomEvent('open-3d-walk'));
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Landmark size={24} color="#f59e0b" />
                                    </div>
                                    <h3 style={{ margin: 0, color: 'white', fontSize: '1.1rem' }}>Paseo 3D / Patrimonio</h3>
                                </div>
                                <p style={{ margin: '0 0 1.5rem 0', color: '#94a3b8', fontSize: '0.9rem', flex: 1 }}>Recorre las calles históricas y revive el casco patrimonial de la ciudad en 3D.</p>
                                <div style={{ color: '#f59e0b', fontWeight: 'bold', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Pasear en 3D <ArrowRight size={16} /></div>
                            </div>

                            <div
                                style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'all 0.3s' }}
                                onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                                onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                                onClick={() => {
                                    window.dispatchEvent(new CustomEvent('open-hub-feature', { detail: 'player-music' }));
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <PlayCircle size={24} color="#10b981" />
                                    </div>
                                    <h3 style={{ margin: 0, color: 'white', fontSize: '1.1rem' }}>Música Local</h3>
                                </div>
                                <p style={{ margin: '0 0 1.5rem 0', color: '#94a3b8', fontSize: '0.9rem', flex: 1 }}>Descubre a los artistas de tu ciudad en el ranking vecinal.</p>
                                <div style={{ color: '#10b981', fontWeight: 'bold', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Escuchar <ArrowRight size={16} /></div>
                            </div>

                            <div
                                style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'all 0.3s' }}
                                onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                                onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                                onClick={() => navigate('/lite')}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Tv size={24} color="#38bdf8" />
                                    </div>
                                    <h3 style={{ margin: 0, color: 'white', fontSize: '1.1rem' }}>TV y Panoramas</h3>
                                </div>
                                <p style={{ margin: '0 0 1.5rem 0', color: '#94a3b8', fontSize: '0.9rem', flex: 1 }}>Sintoniza la señal digital y entérate de los eventos.</p>
                                <div style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Cambiaro a TV <ArrowRight size={16} /></div>
                            </div>
                        </div>

                        {/* Sección 5: INNOVACIONES Y VLS LAB */}
                        <div style={{ border: '1px solid rgba(192, 132, 252, 0.3)', background: 'linear-gradient(135deg, rgba(15, 23, 42, 0) 0%, rgba(192, 132, 252, 0.05) 100%)', padding: '2rem', borderRadius: '24px', marginBottom: '3rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h2 style={{ color: '#c084fc', fontSize: '1.6rem', margin: 0, fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                                    <Sparkles size={28} /> INNOVACIONES Y VLS LAB 3D
                                </h2>
                                <span style={{ background: 'rgba(192, 132, 252, 0.2)', color: '#c084fc', padding: '0.4rem 0.8rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px' }}>ACCESO DESARROLLADOR</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                                {innovacionesVls.map((mod, idx) => (
                                    <div
                                        key={idx}
                                        style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'all 0.3s' }}
                                        onMouseOver={e => {
                                            e.currentTarget.style.transform = 'translateY(-5px)';
                                            e.currentTarget.style.borderColor = mod.color;
                                            e.currentTarget.style.boxShadow = `0 10px 25px ${mod.color}20`;
                                        }}
                                        onMouseOut={e => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                        onClick={() => mod.action ? mod.action() : navigate(mod.path)}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${mod.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <mod.icon size={24} color={mod.color} />
                                            </div>
                                            <h3 style={{ margin: 0, color: 'white', fontSize: '1.1rem' }}>{mod.title}</h3>
                                        </div>
                                        <p style={{ margin: '0 0 1.5rem 0', color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.5', flex: 1 }}>{mod.desc}</p>
                                        <div style={{ color: mod.color, fontWeight: 'bold', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Abrir Herramienta <ArrowRight size={16} /></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </main>

                    {/* Sidebar Informativo */}
                    <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {/* VLS Lab Actions */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                            <button
                                onClick={handleOpenSentinelMini}
                                style={{
                                    background: 'rgba(56, 189, 248, 0.15)',
                                    border: '1px solid #38bdf8',
                                    color: '#38bdf8',
                                    padding: '0.8rem',
                                    borderRadius: '12px',
                                    fontWeight: 'bold',
                                    fontSize: '0.85rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <Network size={18} /> VLS Sentinel
                            </button>
                            <button
                                onClick={() => window.dispatchEvent(new CustomEvent('open-3d-walk'))}
                                style={{
                                    background: 'rgba(16, 185, 129, 0.15)',
                                    border: '1px solid #10b981',
                                    color: '#10b981',
                                    padding: '0.8rem',
                                    borderRadius: '12px',
                                    fontWeight: 'bold',
                                    fontSize: '0.85rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <Map size={18} /> Paseo 3D
                            </button>
                        </div>
                        {/* Tarjeta Mi Perfil Ciudadano */}
                        <div style={{ background: 'linear-gradient(180deg, rgba(56, 189, 248, 0.1) 0%, rgba(15, 23, 42, 0.5) 100%)', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '16px', padding: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>JS</div>
                                <div>
                                    <h3 style={{ margin: 0, color: 'white', fontSize: '1.1rem' }}>Juan Segura</h3>
                                    <p style={{ margin: 0, color: '#38bdf8', fontSize: '0.85rem' }}>Vecino Verificado (ClaveÚnica)</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                    <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Trámites en curso:</span>
                                    <span style={{ color: 'white', fontWeight: 'bold' }}>2</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                    <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Mensajes nuevos:</span>
                                    <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>1</span>
                                </div>
                            </div>
                            <button style={{ width: '100%', padding: '0.75rem', background: 'var(--brand-primary)', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 'bold', marginTop: '1.5rem', cursor: 'pointer' }}>
                                Ir a Mi Buzón
                            </button>
                        </div>

                        {/* Faro IA Premium Feature */}
                        <div style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(4, 120, 87, 0.4) 100%)', border: '1px solid #10b981', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 10px 30px rgba(16, 185, 129, 0.2)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
                                <div style={{ width: '50px', height: '50px', background: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                                    <Sparkles size={28} color="#10b981" />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>Luz de Foco Asistente</h3>
                                    <p style={{ margin: 0, color: '#a7f3d0', fontSize: '0.8rem' }}>Inteligencia Comunal 2026</p>
                                </div>
                            </div>
                            <p style={{ color: 'white', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.5', opacity: 0.9 }}>
                                ¿Necesitas ayuda con un trámite? Consúltale a Foco (Luz de Foco), nuestro asistente con voz humana para vecinos.
                            </p>
                            <button
                                onClick={handleOpenFaro}
                                className="btn pulse"
                                style={{ width: '100%', padding: '0.8rem', background: '#10b981', border: 'none', borderRadius: '12px', color: '#064e3b', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.9rem' }}
                            >
                                <Bot size={18} /> Consultar a Luz de Foco
                            </button>
                        </div>

                        {/* Canales Express */}
                        <div style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '1.5rem' }}>
                            <h3 style={{ margin: '0 0 1rem 0', color: 'white', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Phone size={20} color="#10b981" /> Telefonía Rápida
                            </h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <li style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '8px' }}>
                                    <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>Ambulancia SAMU</span>
                                    <strong style={{ color: '#10b981' }}>131</strong>
                                </li>
                                <li style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '8px' }}>
                                    <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>Carabineros</span>
                                    <strong style={{ color: '#10b981' }}>133</strong>
                                </li>
                                <li style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '8px' }}>
                                    <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>Bomberos</span>
                                    <strong style={{ color: '#10b981' }}>132</strong>
                                </li>
                                <li style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239,68,68,0.3)', padding: '0.75rem', borderRadius: '8px' }}>
                                    <span style={{ color: '#fca5a5', fontSize: '0.9rem' }}>S.O.S Vecinal Libre</span>
                                    <strong style={{ color: '#ef4444' }}>*1400</strong>
                                </li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Pseudo Media Queries directly in style prop alternative for older react versions via basic class injection or inline rules.
               Using inline rules via parent div for simplification but a proper css class is recommended for production.
            */}
            <style>
                {`
                    .dashboard-grid-container {
                        display: grid;
                        grid-template-columns: minmax(0, 1fr);
                        gap: 2rem;
                    }
                    @media (min-width: 1024px) {
                        .dashboard-grid-container { grid-template-columns: 1fr 300px; }
                        .header-time-desktop { display: block; }
                    }
                    @media (max-width: 1023px) {
                        .header-time-desktop { display: none; }
                    }
                `}
            </style>
            <div style={{ textAlign: 'center', marginTop: '2rem', padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#38bdf8', letterSpacing: '2px' }}>HECHO EN LA SERENA · v3.2 CRISTAL</span>
            </div>
        </div>
    );
}
