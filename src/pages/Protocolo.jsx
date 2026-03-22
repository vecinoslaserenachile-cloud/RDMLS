import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Mic2, Camera, Calendar, Play, Pause, CheckCircle, MapPin, AlertTriangle, Save, ArrowLeft, DoorOpen, BadgeCheck, Eye, ExternalLink } from 'lucide-react';
import LiveVenuesMonitor from '../components/LiveVenuesMonitor';

// Datos oficiales (febrero 2026 - Ejemplos)
const VIPS_DEFAULT = [
    { id: 1, nombre: "Gabriel Boric Font", cargo: "Presidente de la República", nivel: "nacional", orden: 1, estado: "pendiente" },
    { id: 2, nombre: "Daniela Norambuena", cargo: "Alcaldesa de La Serena", nivel: "alcaldia", orden: 2, estado: "pendiente" },
    { id: 3, nombre: "Cristóbal Juliá", cargo: "Gobernador Regional de Coquimbo", nivel: "regional", orden: 3, estado: "pendiente" },
    { id: 4, nombre: "Galo Luna", cargo: "Delegado Presidencial Regional", nivel: "regional", orden: 4, estado: "pendiente" },
    { id: 5, nombre: "Ricardo Cifuentes Lillo", cargo: "Diputado de la República", nivel: "nacional", orden: 5, estado: "pendiente" },
    { id: 6, nombre: "Matías Walker Prieto", cargo: "Senador de la República", nivel: "nacional", orden: 6, estado: "pendiente" },
    { id: 7, nombre: "Sergio Gahona Salazar", cargo: "Senador de la República", nivel: "nacional", orden: 7, estado: "pendiente" },
    { id: 8, nombre: "General Juan Jara", cargo: "Jefe de Zona Carabineros", nivel: "seguridad", orden: 8, estado: "pendiente" },
    { id: 9, nombre: "Prefecto PDI", cargo: "Jefe Regional PDI", nivel: "seguridad", orden: 9, estado: "pendiente" },
    { id: 10, nombre: "Aileen Margot", cargo: "Concejala de La Serena", nivel: "concejo", orden: 10, estado: "pendiente" },
    { id: 11, nombre: "Pablo Yáñez Pizarro", cargo: "Concejal de La Serena", nivel: "concejo", orden: 11, estado: "pendiente" },
    { id: 12, nombre: "Rayén Pojomovsky Aliste", cargo: "Concejala de La Serena", nivel: "concejo", orden: 12, estado: "pendiente" },
    { id: 13, nombre: "Felix Velasco Ladrón de Guevara", cargo: "Concejal de La Serena", nivel: "concejo", orden: 13, estado: "pendiente" },
    { id: 14, nombre: "Carmen Zamora Jopia", cargo: "Concejala de La Serena", nivel: "concejo", orden: 14, estado: "pendiente" },
    { id: 15, nombre: "Daniel Palominos Ramos", cargo: "Concejal de La Serena", nivel: "concejo", orden: 15, estado: "pendiente" },
    { id: 16, nombre: "Mauricio Ibacache Velásquez", cargo: "Concejal de La Serena", nivel: "concejo", orden: 16, estado: "pendiente" },
    { id: 17, nombre: "Cristian Marín Pérez", cargo: "Concejal de La Serena", nivel: "concejo", orden: 17, estado: "pendiente" },
];

const SONGS_HATS = [
    { id: 1, title: "Sinfonía Blanca (Datos VLS)", url: "https://vecinoslaserena.cl/audioteca/blanca", hat: "Blanco", color: "#ffffff" },
    { id: 2, title: "Ritmo Rojo (Emoción VLS)", url: "https://vecinoslaserena.cl/audioteca/roja", hat: "Rojo", color: "#ef4444" },
    { id: 3, title: "Oscura Cautela (Negro VLS)", url: "https://vecinoslaserena.cl/audioteca/negra", hat: "Negro", color: "#1e293b" },
    { id: 4, title: "Brillo Amarillo (Optimismo VLS)", url: "https://vecinoslaserena.cl/audioteca/amarilla", hat: "Amarillo", color: "#facc15" },
    { id: 5, title: "Eco Verde (Creatividad VLS)", url: "https://vecinoslaserena.cl/audioteca/verde", hat: "Verde", color: "#22c55e" },
    { id: 6, title: "Mando Azul (Control VLS)", url: "https://vecinoslaserena.cl/audioteca/azul", hat: "Azul", color: "#3b82f6" }
];

export default function Protocolo() {
    const navigate = useNavigate();
    const [rol, setRol] = useState('secretaria');
    const [eventos, setEventos] = useState([]);
    
    // Check local storage for VIPS or use default
    const [vips, setVips] = useState(() => {
        const saved = localStorage.getItem('smartls_vips_status');
        return saved ? JSON.parse(saved) : VIPS_DEFAULT;
    });
    
    const [eventoActivo, setEventoActivo] = useState(null);

    // Save VIPS to local storage when changed to persist check-ins across views
    useEffect(() => {
        localStorage.setItem('smartls_vips_status', JSON.stringify(vips));
        // Disparar evento para que otras vistas se actualicen si están en otras pestañas/dispositivos locales
        window.dispatchEvent(new Event('vips_updated'));
    }, [vips]);

    // Listener for cross-view synchronization
    useEffect(() => {
        const handleSync = () => {
            const saved = localStorage.getItem('smartls_vips_status');
            if (saved) setVips(JSON.parse(saved));
        };
        window.addEventListener('vips_updated', handleSync);
        return () => window.removeEventListener('vips_updated', handleSync);
    }, []);

    const agregarEvento = (nuevo) => {
        const ev = { ...nuevo, id: Date.now() };
        setEventos([ev, ...eventos]);
        if (!eventoActivo) setEventoActivo(ev);
    };

    const toggleCheckIn = (id) => {
        setVips(prev => prev.map(v => v.id === id ? { ...v, estado: v.estado === 'pendiente' ? 'presente' : 'pendiente' } : v));
    };

    const resetCheckIns = () => {
        if(window.confirm('¿Seguro que desea reiniciar el padrón de asistencia?')) {
            setVips(VIPS_DEFAULT);
        }
    };

    // Funciones de utilidad para agrupar VIPS
    const agruparVipsPorNivel = () => {
        const grupos = {
            'alcaldia': vips.filter(v => v.nivel === 'alcaldia'),
            'nacional': vips.filter(v => v.nivel === 'nacional'),
            'regional': vips.filter(v => v.nivel === 'regional'),
            'concejo': vips.filter(v => v.nivel === 'concejo'),
        };
        return grupos;
    };

    const vipsPresentes = vips.filter(v => v.estado === 'presente');
    const vipsAgrupados = agruparVipsPorNivel();

    return (
        <div className="page-container" style={{ minHeight: '100vh', paddingBottom: '80px', background: 'var(--bg-primary)', fontFamily: 'Outfit, sans-serif', color: 'var(--text-primary)' }}>

            {/* HEADER SUPERIOR */}
            <header style={{ background: 'linear-gradient(to bottom, #1e3a8a, #0a1128)', color: 'white', padding: '1.5rem', borderBottomLeftRadius: '2rem', borderBottomRightRadius: '2rem', boxShadow: '0 10px 25px rgba(0,0,0,0.3)', position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid var(--brand-primary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '800px', margin: '0 auto' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                            <button onClick={() => navigate('/hub')} className="btn-glass" style={{ padding: '0.4rem 0.8rem', borderRadius: '50px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white' }}>
                                <ArrowLeft size={16} /> Volver
                            </button>
                            <h1 style={{ fontSize: '1.8rem', fontWeight: 900, margin: 0, letterSpacing: '-0.05em' }}>S.E.R.E.N.I.T.O.</h1>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.8 }}>
                            <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', background: 'rgba(255,255,255,0.2)', padding: '0.1rem 0.5rem', borderRadius: '4px' }}>Inteligencia Protocolar</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <label style={{ fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: 'bold', opacity: 0.7, marginBottom: '0.2rem' }}>Vista Actual:</label>
                        <select
                            value={rol}
                            onChange={(e) => setRol(e.target.value)}
                            style={{ fontSize: '0.85rem', background: 'white', color: '#1e3a8a', fontWeight: 'bold', padding: '0.5rem', borderRadius: '8px', border: '2px solid transparent', outline: 'none', cursor: 'pointer' }}
                        >
                            <option value="secretaria">👩‍💼 Secretaría</option>
                            <option value="protocolo">👠 Protocolo</option>
                            <option value="tecnico">🎚️ Técnico Minuto a Minuto</option>
                            <option value="prensa">📸 Hub de Prensa</option>
                            <option value="c5">🚨 Monitoreo Cámaras C5</option>
                            <option value="almanaque">🌍 Vecinos del Mundo</option>
                        </select>
                    </div>
                </div>
            </header>

            {/* CONTENIDO PRINCIPAL CON VIDEO LATERAL */}
            <main style={{ 
                padding: '1.5rem', 
                maxWidth: '1400px', 
                margin: '0 auto', 
                display: 'grid', 
                gridTemplateColumns: (window.innerWidth > 1100 && rol !== 'almanaque') ? '350px 1fr' : '1fr', 
                gap: '2rem' 
            }}>
                {/* LADO IZQUIERDO: VIDEO SERENITO RESPONSIVE (Ocultar en Almanaque para full width) */}
                {rol !== 'almanaque' && (
                    <aside style={{ position: 'sticky', top: '120px', height: 'fit-content', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '24px', border: '1px solid var(--brand-primary)', background: 'rgba(5, 11, 20, 0.6)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                                <div style={{ background: 'var(--brand-primary)', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Play size={18} color="black" fill="black" />
                                </div>
                                <h3 style={{ fontSize: '0.9rem', color: 'var(--brand-primary)', margin: 0, fontWeight: '800' }}>INNOVACIÓN: 6 SOMBREROS</h3>
                            </div>

                            {/* Video / Grok Frame Responsive */}
                            <div style={{ 
                                width: '100%', 
                                aspectRatio: '9/16', 
                                background: '#000', 
                                borderRadius: '16px', 
                                overflow: 'hidden', 
                                border: '1px solid rgba(0, 229, 255, 0.2)',
                                boxShadow: '0 0 20px rgba(0, 229, 255, 0.1)'
                            }}>
                                 <iframe 
                                    src="https://www.youtube.com/embed/O6rEZwVbIPY?autoplay=1&mute=1&loop=1&playlist=O6rEZwVbIPY"
                                    style={{ width: '100%', height: '100%', border: 'none' }}
                                    title="Serenito Sombreros"
                                    allow="autoplay; encrypted-media"
                                />
                            </div>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '1rem', lineHeight: '1.4', fontStyle: 'italic' }}>
                                * Simulador interactivo: Serenito aplica los sombreros de De Bono para la toma de decisiones protocolares con éxito.
                            </p>
                        </div>

                        {/* Quick Stats Column (Opcional) */}
                        <div className="glass-panel" style={{ padding: '1.2rem', borderRadius: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--brand-primary)', marginBottom: '1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Mic2 size={16} /> BANDA SONORA: 6 SOMBREROS
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {SONGS_HATS.map(song => (
                                    <button 
                                        key={song.id}
                                        onClick={() => window.open(song.url, '_blank')}
                                        className="btn-glass"
                                        style={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: '10px', 
                                            padding: '0.6rem', 
                                            fontSize: '0.7rem', 
                                            textAlign: 'left',
                                            background: 'rgba(255,255,255,0.03)',
                                            border: `1px solid ${song.color}40`,
                                            borderRadius: '10px'
                                        }}
                                    >
                                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: song.color, boxShadow: `0 0 10px ${song.color}` }}></div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ color: 'white', fontWeight: 'bold' }}>{song.hat}</div>
                                            <div style={{ color: 'var(--text-muted)', fontSize: '0.6rem' }}>{song.title}</div>
                                        </div>
                                        <ExternalLink size={12} color="var(--text-muted)" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>
                )}

                {/* BLOQUE DE MÓDULOS (DERECHA / FULL WIDTH EN ALMANAQUE) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                {/* --- MÓDULO VECINOS DEL MUNDO (🌎) --- */}
                {rol === 'almanaque' && (
                    <div className="scale-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '2rem', background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.4) 0%, rgba(15, 23, 42, 0.8) 100%)', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ background: '#38bdf8', padding: '0.8rem', borderRadius: '15px', boxShadow: '0 0 20px rgba(56, 189, 248, 0.4)' }}>
                                    <BadgeCheck size={32} color="white" />
                                </div>
                                <div>
                                    <h2 style={{ fontSize: '2.4rem', fontWeight: 900, color: 'white', margin: 0, letterSpacing: '-0.05em' }}>VECINOS DEL MUNDO</h2>
                                    <p style={{ color: '#38bdf8', fontWeight: 'bold', margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Relaciones Diplomáticas & Comerciales del Ecosistema VLS</p>
                                </div>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '800px' }}>
                                Bienvenido al repositorio inteligente de misiones diplomáticas. Información fidedigna de los países con los que mantienen vínculos estratégicos proyectados al 2026.
                            </p>
                        </div>
                        <VecinosDelMundo />
                    </div>
                )}

                {/* --- VISTA SECRETARÍA --- */}
                {rol === 'secretaria' && (
                    <div className="scale-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(15, 23, 42, 0.5)' }}>
                            <h2 style={{ fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--brand-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Calendar color="var(--brand-primary)" /> Agenda Global de Actos
                            </h2>
                            <FormularioEvento onGuardar={agregarEvento} />
                        </div>

                        {/* Gestión Automatizada - Plantillas */}
                        <div style={{ background: '#f0f9ff', padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid #bae6fd' }}>
                            <h3 style={{ fontSize: '1rem', color: '#0369a1', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <BadgeCheck size={18} /> Asistente de Gestión Automatizada
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                <button onClick={() => agregarEvento({ nombre: 'Ceremonia Izamiento Pabellón', lugar: 'Faro Monumental', decreto: 'D-2026/015' })} className="btn-glass" style={{ textAlign: 'left', padding: '0.8rem', fontSize: '0.8rem', background: 'white', color: '#0369a1' }}>
                                    + Plantilla Izamiento
                                </button>
                                <button onClick={() => agregarEvento({ nombre: 'Sesión Ordinaria de Concejo', lugar: 'Salón Consistorial', decreto: 'D-2026/022' })} className="btn-glass" style={{ textAlign: 'left', padding: '0.8rem', fontSize: '0.8rem', background: 'white', color: '#0369a1' }}>
                                    + Plantilla Concejo
                                </button>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <h3 style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--text-muted)', marginLeft: '1rem' }}>Hitos Activos</h3>
                            {eventos.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic', padding: '2rem 0' }}>No hay eventos registrados hoy.</p>}
                            {eventos.map(ev => (
                                <div key={ev.id} className="glass-panel" style={{ padding: '1rem', borderRadius: '1rem', borderLeft: '4px solid #22c55e', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
                                    <div>
                                        <h4 style={{ fontWeight: 'bold', color: 'white', margin: '0 0 0.2rem 0' }}>{ev.nombre}</h4>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={10} /> {ev.lugar} • Dec: {ev.decreto}</p>
                                    </div>
                                    <span style={{ background: '#dcfce720', color: '#22c55e', fontSize: '0.65rem', fontWeight: 'bold', padding: '0.25rem 0.5rem', borderRadius: '9999px', border: '1px solid #22c55e40' }}>EN CURSO</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- VISTA PROTOCOLO --- */}
                {rol === 'protocolo' && (
                    <div className="scale-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ background: 'linear-gradient(135deg, #9333ea 0%, #4f46e5 100%)', color: 'white', padding: '1.5rem', borderRadius: '1.5rem', boxShadow: '0 10px 25px rgba(147, 51, 234, 0.3)', marginBottom: '1rem', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', right: '-20px', top: '-20px', opacity: 0.1 }}><Users size={120} /></div>
                            <h2 style={{ fontWeight: 'bold', fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 0 0.2rem 0', position: 'relative', zIndex: 10 }}><BadgeCheck /> Control de Acceso S.M.A.R.T.</h2>
                            <p style={{ color: '#e0e7ff', fontSize: '0.9rem', margin: '0 0 1rem 0', position: 'relative', zIndex: 10 }}>Monitoreo de Autoridades 2026-2030</p>
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '0.8rem', borderRadius: '12px', backdropFilter: 'blur(5px)' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#c7d2fe', fontWeight: 'bold' }}>Quórum Presente</span>
                                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{vipsPresentes.length} / {vips.length}</span>
                                </div>
                                <button onClick={resetCheckIns} className="btn-glass" style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', fontSize: '0.8rem' }}>Reiniciar Padrón</button>
                            </div>
                        </div>

                        {/* Monitor de Precedencias en Tiempo Real */}
                        <div style={{ background: '#1e293b', color: 'white', padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid #334155' }}>
                            <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Users color="#38bdf8" /> Monitor de Precedencia Oficial
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {vipsPresentes.length > 0 ? (
                                    vipsPresentes.sort((a,b) => a.orden - b.orden).map((vip, i) => (
                                        <div key={vip.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', borderLeft: '4px solid #38bdf8' }}>
                                            <span style={{ fontWeight: 'bold', color: '#38bdf8', minWidth: '20px' }}>{i + 1}</span>
                                            <div>
                                                <div style={{ fontWeight: 'bold' }}>{vip.nombre}</div>
                                                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{vip.cargo}</div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.9rem', fontStyle: 'italic' }}>Esperando check-in para generar orden de precedencia...</p>
                                )}
                            </div>
                        </div>

                        {/* Listado de Protocolo Agrupado */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {/* Alcaldía y Nacional */}
                            <GrupoVip titulo="Alta Dirección y Poderes del Estado" vips={[...vipsAgrupados.alcaldia, ...vipsAgrupados.nacional].sort((a,b) => a.orden - b.orden)} toggleCheckIn={toggleCheckIn} />
                            
                            {/* Regional */}
                            <GrupoVip titulo="Autoridades Regionales" vips={vipsAgrupados.regional.sort((a,b) => a.orden - b.orden)} toggleCheckIn={toggleCheckIn} />

                            {/* Seguridad */}
                            <GrupoVip titulo="Fuerzas de Orden y Seguridad" vips={vips.filter(v => v.nivel === 'seguridad').sort((a,b) => a.orden - b.orden)} toggleCheckIn={toggleCheckIn} />
                            
                            {/* Concejo Municipal */}
                            <GrupoVip titulo="Cuerpo de Concejales La Serena" vips={vipsAgrupados.concejo.sort((a,b) => a.orden - b.orden)} toggleCheckIn={toggleCheckIn} />
                        </div>
                    </div>
                )}

                {/* --- VISTA TÉCNICA (ALOCUCIONES, MINUTO A MINUTO Y PANTALLA DE LOCUTOR) --- */}
                {rol === 'tecnico' && (
                    <div className="scale-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <VistaTecnica evento={eventoActivo} />
                        
                        {/* Monitor en tiempo real de Autoridades Presentes para el Locutor */}
                        <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', border: '1px solid #334155' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #334155', paddingBottom: '1rem' }}>
                                <h2 style={{ color: 'white', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.3rem' }}>
                                    <Eye color="#38bdf8" /> Teleprompter Locutor Oficial
                                </h2>
                                <span className="pulse" style={{ background: 'rgba(239,68,68,0.2)', color: '#fca5a5', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', border: '1px solid #ef4444' }}>LIVE</span>
                            </div>

                            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem', fontStyle: 'italic' }}>Las siguientes autoridades están presentes en la sala y ya se encuentran sentadas (actualizado en tiempo real por el equipo de Protocolo y Puerta):</p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {vipsPresentes.length === 0 ? (
                                    <div style={{ textAlign: 'center', padding: '2rem', background: '#0f172a', borderRadius: '1rem', border: '1px dashed #334155' }}>
                                        <p style={{ color: '#64748b', margin: 0 }}>Ninguna autoridad VIP ha hecho check-in aún.</p>
                                    </div>
                                ) : (
                                    vipsPresentes.map((vip, i) => (
                                        <div key={vip.id} style={{
                                            padding: '1rem 1.5rem',
                                            background: i === 0 ? 'linear-gradient(90deg, rgba(56,189,248,0.1), transparent)' : '#0f172a',
                                            borderLeft: i === 0 ? '4px solid #38bdf8' : '4px solid #475569',
                                            borderRadius: '8px',
                                            display: 'flex', alignItems: 'center', gap: '1rem'
                                        }}>
                                            <span style={{ fontSize: '1.2rem', color: i === 0 ? '#38bdf8' : '#94a3b8', fontWeight: 'bold', minWidth: '30px' }}>{i + 1}.</span>
                                            <div>
                                                <p style={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem', margin: '0 0 0.1rem 0' }}>{vip.nombre}</p>
                                                <p style={{ color: '#cbd5e1', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>{vip.cargo}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* --- VISTA PRENSA --- */}
                {rol === 'prensa' && (
                    <div className="scale-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'center' }}>
                        <div style={{ background: '#3b82f6', color: 'white', padding: '2rem', borderRadius: '1.5rem', boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)' }}>
                            <Camera size={48} style={{ margin: '0 auto 1rem auto', opacity: 0.8 }} />
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0 0 0.2rem 0' }}>Hub de Medios Oficial</h2>
                            <p style={{ color: '#dbeafe', margin: 0 }}>Conexión directa con RRPP y Cobertura</p>
                        </div>
                        <button style={{
                            width: '100%', border: '4px dashed #cbd5e1', borderRadius: '1.5rem', height: '12rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', background: 'transparent', cursor: 'pointer', transition: 'all 0.2s',
                        }} onMouseOver={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#60a5fa'; e.currentTarget.style.color = '#3b82f6' }} onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.color = '#94a3b8' }}>
                            <div style={{ background: '#e2e8f0', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
                                <Camera size={32} />
                            </div>
                            <span style={{ fontWeight: 'bold' }}>Tocar para Subir Evidencia Fotográfica</span>
                        </button>
                    </div>
                )}

                {/* --- VISTA C5 --- */}
                {rol === 'c5' && (
                    <div className="scale-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ background: '#1e293b', color: 'white', padding: '1.5rem', borderRadius: '1.5rem', boxShadow: '0 10px 25px rgba(0,0,0,0.3)', borderTop: '4px solid #ef4444' }}>
                            <h2 style={{ fontWeight: 'bold', fontSize: '1.25rem', color: '#f8fafc', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span className="pulse" style={{ width: '10px', height: '10px', background: '#ef4444', borderRadius: '50%', display: 'inline-block' }}></span>
                                Monitoreo C5: El Faro en Vivo
                            </h2>
                            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Cámara de videovigilancia Sector Costera (PTZ-1)</p>

                            <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', borderRadius: '12px', overflow: 'hidden', border: '1px solid #334155' }}>
                                <iframe
                                    src="https://www.youtube.com/embed/5K9Lsc6U8I0?autoplay=1&mute=1"
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', filter: 'contrast(1.1) brightness(0.9) saturate(1.2)' }}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title="Cámara C5 Faro">
                                </iframe>
                            </div>
                        </div>
                        <div style={{ background: '#1e293b', color: 'white', padding: '1.5rem', borderRadius: '1.5rem', boxShadow: '0 10px 25px rgba(0,0,0,0.3)', borderTop: '4px solid #3b82f6' }}>
                            <h2 style={{ fontWeight: 'bold', fontSize: '1.25rem', color: '#f8fafc', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <DoorOpen color="#3b82f6" />
                                Sistema Puerta Serena (Status en Vivo)
                            </h2>
                            <LiveVenuesMonitor detailed={true} />
                        </div>
                    </div>
                )}

                </div> {/* Fin de bloque de módulos (derecha) */}
            </main>
        </div>
    );
}

// --- SUB-COMPONENTES AUXILIARES ---

const GrupoVip = ({ titulo, vips, toggleCheckIn }) => {
    if (vips.length === 0) return null;
    
    return (
        <div style={{ marginBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#64748b', marginLeft: '0.5rem', marginBottom: '0.8rem', letterSpacing: '0.05em' }}>{titulo}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {vips.map(vip => (
                    <button
                        key={vip.id}
                        onClick={() => toggleCheckIn(vip.id)}
                        className="glass-panel"
                        style={{
                            width: '100%', padding: '1rem 1.2rem', borderRadius: '1rem', border: '2px solid', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.2s', cursor: 'pointer',
                            background: vip.estado === 'presente' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255,255,255,0.02)',
                            borderColor: vip.estado === 'presente' ? '#22c55e' : 'rgba(255, 255, 255, 0.1)'
                        }}
                    >
                        <div style={{ textAlign: 'left' }}>
                            <p style={{ fontWeight: 'bold', fontSize: '1.05rem', color: 'white', margin: '0 0 0.2rem 0', transition: 'color 0.2s' }}>{vip.nombre}</p>
                            <p style={{ fontSize: '0.8rem', color: vip.estado === 'presente' ? '#22c55e' : 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 'bold', margin: 0, opacity: 0.8 }}>{vip.cargo}</p>
                        </div>
                        <div style={{
                            padding: '0.4rem 0.8rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.4rem',
                            background: vip.estado === 'presente' ? '#22c55e' : 'rgba(255,255,255,0.1)',
                            color: vip.estado === 'presente' ? 'black' : 'white',
                            boxShadow: vip.estado === 'presente' ? '0 0 15px rgba(34, 197, 94, 0.4)' : 'none'
                        }}>
                            {vip.estado === 'presente' ? <CheckCircle size={16} /> : <DoorOpen size={14} />}
                            {vip.estado === 'presente' ? 'RECEPCIONADO' : 'CHECK-IN'}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

const FormularioEvento = ({ onGuardar }) => {
    const [f, setF] = useState({ nombre: '', lugar: '', decreto: '' });
    const enviar = (e) => {
        e.preventDefault();
        onGuardar(f);
        setF({ nombre: '', lugar: '', decreto: '' });
        alert("✅ Hito registrado correctamente en la Matriz");
    };
    return (
        <form onSubmit={enviar} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <input required placeholder="Nombre del Evento (Ej: Inauguración Cesfam)" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', color: 'white', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.1)', outline: 'none' }} value={f.nombre} onChange={e => setF({ ...f, nombre: e.target.value })} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <input required placeholder="Lugar (Ej: El Faro)" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', color: 'white', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.1)', outline: 'none' }} value={f.lugar} onChange={e => setF({ ...f, lugar: e.target.value })} />
                <input required placeholder="N° Decreto o Res." style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', color: 'white', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.1)', outline: 'none' }} value={f.decreto} onChange={e => setF({ ...f, decreto: e.target.value })} />
            </div>
            <button style={{ width: '100%', background: 'var(--brand-primary)', color: 'black', padding: '1rem', borderRadius: '0.75rem', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', border: 'none', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0, 229, 255, 0.3)' }}>
                <Save size={18} /> Guardar Hito en Agenda
            </button>
        </form>
    );
};

const VistaTecnica = ({ evento }) => {
    const [segundos, setSegundos] = useState(0);
    const [activo, setActivo] = useState(false);

    useEffect(() => {
        let int = null;
        if (activo) int = setInterval(() => setSegundos(s => s + 1), 1000);
        else clearInterval(int);
        return () => clearInterval(int);
    }, [activo]);

    const formato = (s) => {
        const min = Math.floor(s / 60).toString().padStart(2, '0');
        const sec = (s % 60).toString().padStart(2, '0');
        return `${min}:${sec}`;
    };

    if (!evento) return (
        <div style={{ textAlign: 'center', padding: '3rem', background: '#f1f5f9', borderRadius: '1.5rem', border: '2px dashed #cbd5e1' }}>
            <AlertTriangle color="#94a3b8" size={32} style={{ margin: '0 auto 0.5rem auto' }} />
            <p style={{ color: '#64748b', fontWeight: 'bold', margin: 0 }}>Esperando señal de Secretaría General...</p>
        </div>
    );

    return (
        <div style={{ background: '#0f172a', color: 'white', padding: '1.5rem', borderRadius: '2.5rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)', borderBottom: '8px solid #dc2626', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, padding: '1rem', opacity: 0.1 }}><Mic2 size={120} /></div>

            <div style={{ position: 'relative', zIndex: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                    <div>
                        <span style={{ background: '#dc2626', color: 'white', fontSize: '0.65rem', fontWeight: 900, padding: '0.1rem 0.5rem', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }} className="animate-pulse">En Aire</span>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginTop: '0.5rem', marginBottom: '0.2rem', lineHeight: 1.2 }}>{evento.nombre}</h2>
                        <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={12} /> {evento.lugar}</p>
                    </div>
                </div>

                <div style={{ textAlign: 'center', padding: '1.5rem 0', background: 'rgba(30, 41, 59, 0.5)', borderRadius: '1rem', marginBottom: '1.5rem', backdropFilter: 'blur(4px)', border: '1px solid #334155' }}>
                    <span style={{ fontSize: '4.5rem', fontFamily: 'monospace', fontWeight: 'bold', color: '#fbbf24', letterSpacing: '-0.05em', lineHeight: 1 }}>{formato(segundos)}</span>
                    <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: 'bold', color: '#64748b', letterSpacing: '0.2em', margin: '0.5rem 0 0 0' }}>Cronómetro Oficial</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem' }}>
                    <button onClick={() => setActivo(!activo)} style={{ padding: '1rem', borderRadius: '1rem', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: activo ? '#f97316' : '#22c55e', color: 'white', border: 'none', cursor: 'pointer', boxShadow: activo ? 'none' : '0 4px 0 #15803d' }}>
                        {activo ? <Pause fill="currentColor" /> : <Play fill="currentColor" />} {activo ? 'PAUSAR' : 'INICIAR CUENTA'}
                    </button>
                    <button onClick={() => { setActivo(false); setSegundos(0) }} style={{ background: '#334155', padding: '1rem', borderRadius: '1rem', fontWeight: 'bold', color: '#cbd5e1', border: 'none', cursor: 'pointer' }}>
                        REINICIAR
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- MÓDULO VECINOS DEL MUNDO (ALMANAQUE 2026) ---
const VecinosDelMundo = () => {
    const [search, setSearch] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null);

    const countries = [
        { 
            id: 'uy', name: "Uruguay", capital: "Montevideo", flag: "🇺🇾", pulse: "#38bdf8",
            relacion: "Aliado Estratégico Digital", nexo: "Software & Ganadería Sostenible",
            lider: "Yamandú Orsi", poblacion: "3.48M", pib: "75B",
            wiki: "En marzo 2026, Uruguay y Chile lideran el mercado de servicios globales. Montevideo es el hub preferente para el intercambio de talentos TI con La Serena."
        },
        { 
            id: 'ar', name: "Argentina", capital: "Buenos Aires", flag: "🇦🇷", pulse: "#38bdf8",
            relacion: "Integración Cordillerana", nexo: "Corredor Bioceánico & Energía",
            lider: "Javier Milei", poblacion: "47.4M", pib: "645B",
            wiki: "La finalización del Corredor Bioceánico en 2026 ha impulsado las exportaciones desde el puerto de Coquimbo hacia el Atlántico."
        },
        { 
            id: 'cl', name: "Chile", capital: "Santiago", flag: "🇨🇱", pulse: "#ef4444",
            relacion: "Nuestra Nación (Matriz)", nexo: "Cobre, Litio & Vinos",
            lider: "Presidencia de la República", poblacion: "20.3M", pib: "355B",
            wiki: "En marzo 2026, Chile consolida su posición como líder en litio refinado e hidrógeno verde, con La Serena como nodo innovador."
        },
        { 
            id: 'pe', name: "Perú", capital: "Lima", flag: "🇵🇪", pulse: "#ef4444",
            relacion: "Alianza del Pacífico", nexo: "Minería & Agroexportación",
            lider: "Dina Boluarte", poblacion: "34.8M", pib: "260B",
            wiki: "Socios estratégicos en minerales críticos. La Serena mantiene flujo constante de intercambio técnico con regiones del sur peruano."
        },
        { 
            id: 'bo', name: "Bolivia", capital: "La Paz / Sucre", flag: "🇧🇴", pulse: "#22c55e",
            relacion: "Relación Vecinal", nexo: "Gas & Litio (Triángulo ABC)",
            lider: "Luis Arce", poblacion: "12.6M", pib: "46B",
            wiki: "El acuerdo de enero 2026 reactivó la cooperación fronteriza y el tránsito comercial por el Paso de Agua Negra."
        },
        { 
            id: 'br', name: "Brasil", capital: "Brasilia", flag: "🇧🇷", pulse: "#22c55e",
            relacion: "Gigante Regional", nexo: "Turismo & Agronegocios",
            lider: "Luiz Inácio Lula da Silva", poblacion: "218M", pib: "2.2T",
            wiki: "Con el Corredor Bioceánico operativo, Brasil es el principal destino de los servicios logísticos de la zona norte de Chile."
        },
        { 
            id: 'co', name: "Colombia", capital: "Bogotá", flag: "🇨🇴", pulse: "#facc15",
            relacion: "Cooperación Cultural", nexo: "Café & Servicios IT",
            lider: "Gustavo Petro", poblacion: "52.9M", pib: "370B",
            wiki: "Estrecho vínculo en economía naranja. Startups colombianas operan en el ecosistema Hub VLS."
        },
        { 
            id: 've', name: "Venezuela", capital: "Caracas", flag: "🇻🇪", pulse: "#ef4444",
            relacion: "Integración Comunitaria", nexo: "Petróleo & Comercio",
            lider: "Nicolás Maduro", poblacion: "29.2M", pib: "95B",
            wiki: "El 2026 marca una nueva etapa de regularización migratoria masiva bajo el sistema de identidad digital VLS."
        },
        { 
            id: 'us', name: "Estados Unidos", capital: "Washington D.C.", flag: "🇺🇸", pulse: "#38bdf8",
            relacion: "Socio de Seguridad", nexo: "Tecnología & Defensa",
            lider: "Presidencia de EE.UU.", poblacion: "342M", pib: "28T",
            wiki: "Chile y EE.UU. mantienen la declaración de minerales críticos. Los observatorios en el Valle del Elqui mantienen una conexión satelital prioritaria."
        },
        { 
            id: 'jp', name: "Japón", capital: "Tokio", flag: "🇯🇵", pulse: "#ef4444",
            relacion: "Alianza Tecnológica", nexo: "Electromovilidad & Litio",
            lider: "Shigeru Ishiba", poblacion: "123M", pib: "4.5T",
            wiki: "Para 2026, Japón es el principal socio en la reconversión de buses eléctricos en la Región Estrella."
        },
        { 
            id: 'cn', name: "China", capital: "Pekín", flag: "🇨🇳", pulse: "#ef4444",
            relacion: "Gigante Comercial", nexo: "Infraestructura & Cable Submarino",
            lider: "Xi Jinping", poblacion: "1.4B", pib: "20T",
            wiki: "El mayor socio comercial de Chile. En marzo 2026, se consolidó la conexión directa de fibra óptica transpacífica con la infraestructura de La Serena."
        },
        { 
            id: 'mx', name: "México", capital: "Ciudad de México", flag: "🇲🇽", pulse: "#22c55e",
            relacion: "Líder Hispanoamericano", nexo: "Cine, Cultura & Comercio",
            lider: "Claudia Sheinbaum", poblacion: "131M", pib: "1.6T",
            wiki: "Chile y México operan una red de 'Cactus Digital' compartida bajo convenios de cooperación mutua actualizados a 2026."
        },
        { 
            id: 'es', name: "España", capital: "Madrid", flag: "🇪🇸", pulse: "#ef4444",
            relacion: "Madre Patria y Socio UE", nexo: "Energías Renovables",
            lider: "Pedro Sánchez", poblacion: "48.2M", pib: "1.7T",
            wiki: "Empresas españolas gestionan gran parte de los parques eólicos locales bajo estándares Smart europeos."
        },
        { 
            id: 'ca', name: "Canadá", capital: "Ottawa", flag: "🇨🇦", pulse: "#ef4444",
            relacion: "Socio Minero y Ambiental", nexo: "Minería Responsable",
            lider: "Justin Trudeau", poblacion: "41.5M", pib: "2.1T",
            wiki: "Canadá ha financiado el desarrollo de robots de rescate y simuladores de realidad aumentada para capacitación regional."
        }
    ];

    const filtered = countries.filter(c => 
        c.name.toLowerCase().includes(search.toLowerCase()) || 
        c.capital.toLowerCase().includes(search.toLowerCase()) ||
        c.nexo.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fadeIn 0.5s ease' }}>
            {/* Buscador Premium */}
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem 2rem', borderRadius: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center', border: '1px solid rgba(56, 189, 248, 0.2)', backdropFilter: 'blur(10px)' }}>
                <MapPin color="#38bdf8" size={24} />
                <input 
                    placeholder="Escriba país, capital o nexo comercial (Ej: China, Litio, Madrid)..." 
                    style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', fontSize: '1.2rem', outline: 'none', fontFamily: 'Outfit, sans-serif' }}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                {search && (
                    <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1.2rem' }}>×</button>
                )}
            </div>

            {/* Grid de Países */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {filtered.map(c => (
                    <div 
                        key={c.id}
                        onClick={() => setSelectedCountry(c)}
                        className="glass-panel"
                        style={{ 
                            padding: '2rem', 
                            borderRadius: '2rem', 
                            cursor: 'pointer',
                            background: 'rgba(5, 11, 20, 0.4)',
                            border: `1px solid ${c.pulse}30`,
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            position: 'relative',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center'
                        }}
                        onMouseEnter={e => { 
                            e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'; 
                            e.currentTarget.style.background = 'rgba(15, 23, 42, 0.7)';
                            e.currentTarget.style.boxShadow = `0 15px 30px ${c.pulse}20`;
                        }}
                        onMouseLeave={e => { 
                            e.currentTarget.style.transform = 'translateY(0) scale(1)'; 
                            e.currentTarget.style.background = 'rgba(5, 11, 20, 0.4)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <div 
                            className="chocolate-flag"
                            style={{ 
                                width: '180px',
                                height: '140px',
                                background: '#fff',
                                padding: '10px',
                                paddingBottom: '30px',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1), inset 0 0 40px rgba(0,0,0,0.05)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid #ddd',
                                marginBottom: '1.5rem',
                                transform: 'rotate(-2deg)',
                                position: 'relative'
                            }}
                        >
                            <div style={{ fontSize: '3.5rem', filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.2))' }}>{c.flag}</div>
                            <div style={{ position: 'absolute', bottom: '5px', width: '100%', textAlign: 'center', color: '#666', fontSize: '0.6rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>VLS.DIPLOMACY.2026</div>
                        </div>
                        
                        <h3 style={{ color: 'white', margin: '0 0 0.5rem 0', fontSize: '1.6rem', fontWeight: '900', letterSpacing: '-0.02em' }}>{c.name}</h3>
                        <p style={{ color: c.pulse, fontSize: '0.75rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', background: `${c.pulse}15`, padding: '0.3rem 0.8rem', borderRadius: '50px' }}>{c.lider}</p>
                        
                        <div style={{ width: '100%', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                             <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'white' }}>{c.poblacion}</div>
                                <div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>POBLACIÓN</div>
                             </div>
                             <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                             <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'white' }}>{c.pib}</div>
                                <div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>PIB NOMINAL</div>
                             </div>
                        </div>

                        <div style={{ 
                            position: 'absolute', 
                            top: '1.5rem', 
                            right: '1.5rem', 
                            width: '12px', 
                            height: '12px', 
                            borderRadius: '50%', 
                            background: c.pulse, 
                            boxShadow: `0 0 20px ${c.pulse}` 
                        }} className="pulse"></div>
                    </div>
                ))}
            </div>

            {/* Modal de Detalle Enciclopédico (Wikipedia-Style 2026) */}
            {selectedCountry && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(2, 6, 23, 0.95)', backdropFilter: 'blur(15px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setSelectedCountry(null)}>
                    <div 
                        className="scale-in" 
                        style={{ background: '#ffffff', color: '#0f172a', maxWidth: '900px', width: '100%', height: '85vh', borderRadius: '2.5rem', overflow: 'hidden', boxShadow: '0 50px 100px rgba(0,0,0,0.8)', display: 'flex', flexDirection: 'column' }} 
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header con gradiente dinámico */}
                        <div style={{ 
                            minHeight: '220px', 
                            background: `linear-gradient(135deg, #0a1128 0%, ${selectedCountry.pulse} 150%)`, 
                            position: 'relative', 
                            display: 'flex', 
                            alignItems: 'flex-end', 
                            padding: '3rem' 
                        }}>
                             <div style={{ 
                                fontSize: '8rem', 
                                position: 'absolute', 
                                right: '2rem', 
                                bottom: '-1rem', 
                                opacity: 0.15,
                                userSelect: 'none'
                            }}>{selectedCountry.flag}</div>
                            
                            <div style={{ position: 'relative', zIndex: 2 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                    <span style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 'bold' }}>ISO-3166 {selectedCountry.id.toUpperCase()}</span>
                                    <span style={{ color: 'white', opacity: 0.6 }}>•</span>
                                    <span style={{ color: 'white', fontWeight: 'bold' }}>Diplomacia Digital v2.0</span>
                                </div>
                                <h2 style={{ fontSize: '4.5rem', fontWeight: 950, color: 'white', margin: 0, letterSpacing: '-0.05em', lineHeight: 0.9 }}>{selectedCountry.name}</h2>
                            </div>
                            
                            <button onClick={() => setSelectedCountry(null)} style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', fontSize: '2rem', transition: 'all 0.3s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.4)'}>×</button>
                        </div>

                        {/* Cuerpo del Artículo */}
                        <div style={{ flex: 1, padding: '4rem', overflowY: 'auto', fontFamily: '"Outfit", sans-serif' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid #e2e8f0' }}>
                                    <h4 style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 'bold', marginBottom: '0.5rem' }}>Población (2026)</h4>
                                    <p style={{ fontSize: '1.2rem', fontWeight: '900', color: selectedCountry.pulse, margin: 0 }}>{selectedCountry.poblacion}</p>
                                </div>
                                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid #e2e8f0' }}>
                                    <h4 style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 'bold', marginBottom: '0.5rem' }}>PIB Nominal</h4>
                                    <p style={{ fontSize: '1.2rem', fontWeight: '900', color: '#1e293b', margin: 0 }}>{selectedCountry.pib}</p>
                                </div>
                                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid #e2e8f0' }}>
                                    <h4 style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 'bold', marginBottom: '0.5rem' }}>Estatus VLS</h4>
                                    <p style={{ fontSize: '1.2rem', fontWeight: '900', color: '#10b981', margin: 0 }}>Excelente</p>
                                </div>
                            </div>
                            
                            <section style={{ marginBottom: '3rem' }}>
                                <h3 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#1e3a8a', borderBottom: '3px solid #f1f5f9', paddingBottom: '0.8rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                    <BadgeCheck size={28} color="#1e3a8a" /> Informe de Relaciones Exteriores
                                </h3>
                                <p style={{ fontSize: '1.25rem', lineHeight: '1.8', color: '#334155', textAlign: 'justify', fontWeight: '400' }}>
                                    {selectedCountry.wiki}
                                </p>
                            </section>

                            <section style={{ background: 'linear-gradient(to right, #eff6ff, #f8fafc)', padding: '2.5rem', borderRadius: '2rem', border: '1px solid #dbeafe' }}>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#1e40af', marginBottom: '1rem', textTransform: 'uppercase' }}>Oportunidades Comerciales Región Estrella:</h4>
                                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#1e3a8a', fontSize: '1.1rem', lineHeight: '2', fontWeight: 'bold' }}>
                                    <li>Intercambio de comodities de alto valor (Litio/Cobre/Agro).</li>
                                    <li>Cooperación técnica en Desalinización y Energías Limpias.</li>
                                    <li>Transferencia tecnológica mediante Ecosistemas VLS-Hub.</li>
                                    <li>Alianzas para el fomento del Astroturismo y Patrimonio 3D.</li>
                                </ul>
                            </section>
                        </div>

                        {/* Footer del Modal */}
                        <div style={{ padding: '1.5rem 4rem', background: '#f1f5f9', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: '#64748b' }}>
                            <div style={{ display: 'flex', gap: '2rem' }}>
                                <strong>VECINOS DEL MUNDO v.2.6.0</strong>
                                <span>DATOS MARZO 2026</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Mic2 size={16} /> <span>Smart City Voice Enabled</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};
