import React, { useState, useRef, useEffect } from 'react';
import { X, ShieldCheck, Trophy, Radio, Users, Newspaper, Speaker, CheckCircle2, ChevronRight, Activity, Heart, Music, Star, Volume2, Share2, Sliders } from 'lucide-react';

export default function CDLSPanel({ onClose }) {
    const [activeTab, setActiveTab] = useState('seguro');
    const [volumen, setVolumen] = useState(50);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volumen / 100;
        }
    }, [volumen]);

    useEffect(() => {
        if (isPlaying && activeTab === 'radio') {
            audioRef.current?.play().catch(() => setIsPlaying(false));
        } else {
            audioRef.current?.pause();
        }
    }, [isPlaying, activeTab]);

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'linear-gradient(135deg, rgba(8, 15, 30, 0.95) 0%, rgba(133, 20, 38, 0.9) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(20px)' }}>
            <audio ref={audioRef} src="https://sonic.mallocohosting.cl/8032/stream" crossOrigin="anonymous" />
            <div className="glass-panel scale-in" style={{ width: '100%', maxWidth: '1200px', height: '90vh', overflowY: 'auto', padding: '0', position: 'relative', display: 'flex', flexDirection: 'column', borderRadius: '24px', border: '1px solid rgba(220, 38, 38, 0.3)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', transform: 'scale(0.85)', transformOrigin: 'center center' }}>

                {/* Header CDLS */}
                <div style={{ padding: '2rem 2.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ width: '80px', height: '80px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', border: '2px solid #dc2626' }}>
                            <Trophy size={40} color="#dc2626" />
                        </div>
                        <div>
                            <h2 className="text-gradient" style={{ margin: 0, fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', background: 'linear-gradient(90deg, #fca5a5, #dc2626)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                Deportes La Serena & Agrupaciones
                            </h2>
                            <p style={{ margin: '0.2rem 0 0 0', color: '#fca5a5', fontWeight: 'bold', fontSize: '1.1rem', letterSpacing: '1px' }}>Primera División Honor 2026</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="btn-glass" style={{ padding: '0.5rem', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}>
                        <X size={24} color="white" />
                    </button>
                </div>

                {/* Tab Navigation */}
                <div style={{ display: 'flex', overflowX: 'auto', padding: '0 1.5rem', background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(255,255,255,0.05)', scrollbarWidth: 'none' }}>
                    {[
                        { id: 'seguro', icon: ShieldCheck, label: 'CDLS & Enrolar' },
                        { id: 'amateurs', icon: Users, label: 'ANFA, DUC & Ligas' },
                        { id: 'radio', icon: Radio, label: 'Consola Papayera' },
                        { id: 'noticias', icon: Newspaper, label: 'Redes Sociales' },
                        { id: 'nostalgia', icon: Heart, label: 'Memoria Cultural' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                padding: '1rem 1.5rem',
                                background: 'transparent',
                                border: 'none',
                                borderBottom: activeTab === tab.id ? '3px solid #dc2626' : '3px solid transparent',
                                color: activeTab === tab.id ? 'white' : 'var(--text-secondary)',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                transition: 'all 0.3s',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            <tab.icon size={18} color={activeTab === tab.id ? '#dc2626' : 'currentColor'} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div style={{ flex: 1, padding: '2.5rem', overflowY: 'auto' }}>

                    {/* Seguro */}
                    {activeTab === 'seguro' && (
                        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.2) 0%, rgba(0, 0, 0, 0) 100%)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(220, 38, 38, 0.3)' }}>
                                <h3 style={{ margin: '0 0 1rem 0', color: 'white', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Users size={24} color="#dc2626" /> Registro Huella Barrista & Estadio Seguro</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                                    Smart Comuna en alianza con CDLS integra la matriz de enrolamiento digital. Un empadronamiento de hinchas diseñado bajo la ley de violencia en los estadios, usando reconocimiento facial (Faro) para agilizar los accesos.
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <ShieldCheck size={32} color="#10b981" />
                                        <div><div style={{ color: 'white', fontWeight: 'bold' }}>Ingreso Express</div><div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Acceso facial y digital</div></div>
                                    </div>
                                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <CheckCircle2 size={32} color="#3b82f6" />
                                        <div><div style={{ color: 'white', fontWeight: 'bold' }}>Socio Beneficios</div><div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Descuentos exclusivos</div></div>
                                    </div>
                                </div>
                                <button className="btn btn-primary" style={{ background: '#dc2626', border: 'none', width: '100%', padding: '1rem', fontSize: '1.1rem', fontWeight: 'bold' }}>INICIAR ENROLAMIENTO OFICIAL (Identidad Digital)</button>
                            </div>
                        </div>
                    )}

                    {/* Amateurs, DUC y Ligas Locales */}
                    {activeTab === 'amateurs' && (
                        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                                <Users size={48} color="#38bdf8" style={{ margin: '0 auto 1rem auto' }} />
                                <h3 style={{ color: 'white', fontSize: '2.2rem', margin: '0 0 1rem 0' }}>Fútbol Amateur y Ligas Locales</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>Más allá del CDLS, el corazón del deporte serenense late en los barrios, canchas y gimnasios. Aquí apoyamos a nuestra identidad comunal.</p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                                {/* Deportes Union Compañias */}
                                <div style={{ background: 'linear-gradient(135deg, rgba(8, 145, 178, 0.2) 0%, rgba(0,0,0,0.6) 100%)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(8, 145, 178, 0.4)' }}>
                                    <h4 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Trophy color="#06b6d4" /> Deportes Unión Compañías (DUC)
                                    </h4>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>El orgullo representativo del sector Las Compañías. Sigue sus campañas, resultados y participa en su captación de socios.</p>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#06b6d4', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <li>▶ Tercera División</li>
                                        <li>▶ Campañas Solidarias</li>
                                        <li>▶ Captación Inferiores</li>
                                    </ul>
                                </div>

                                {/* ANFA y Agrupaciones */}
                                <div style={{ background: 'rgba(0,0,0,0.4)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <h4 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Activity color="#10b981" /> Liga Deportiva ANFA
                                    </h4>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Toda la programación oficial de los legendarios clubes de barrio, torneos de verano, liguillas y fútbol femenino agrupado.</p>
                                    <button className="btn-glass" style={{ width: '100%', border: '1px solid #10b981', color: '#10b981' }}>Ver Tabla de Posiciones y Fixture</button>
                                </div>

                                {/* Deportes Recreativos y Otros */}
                                <div style={{ background: 'rgba(0,0,0,0.4)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', gridColumn: '1 / -1' }}>
                                    <h4 style={{ color: 'white', fontSize: '1.4rem', marginBottom: '1rem' }}>Básquetbol, Vóleibol y Polideportivas</h4>
                                    <p style={{ color: 'var(--text-secondary)' }}>La Serena no es solo fútbol. Accede al directorio de corporaciones que defienden la camiseta de nuestra ciudad a nivel nacional en diversos deportes y gimnasios, para enrolamiento y becas.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Radio */}
                    {activeTab === 'radio' && (
                        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ background: 'linear-gradient(135deg, rgba(8, 15, 30, 0.95), rgba(30, 5, 5, 0.95))', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(220,38,38,0.3)', boxShadow: 'inset 0 0 50px rgba(0,0,0,0.8)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                                    <h3 style={{ margin: 0, color: 'white', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <Speaker size={24} color="#fca5a5" /> Solo Deportes - Consola VLS
                                    </h3>
                                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                        <select 
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                alert(`Cambiando a señal: ${val === 'montecarlo' ? 'Radio Montecarlo 102.7' : 'Transmisión Vecinal Móvil (Latencia 0.2s)'}`);
                                                // Link logic here
                                            }}
                                            style={{ 
                                                background: 'rgba(220, 38, 38, 0.2)', color: 'white', border: '1px solid #dc2626', 
                                                padding: '0.5rem', borderRadius: '8px', fontSize: '0.8rem', cursor: 'pointer' 
                                            }}
                                        >
                                            <option value="oficial">RDMLS OFICIAL (La Serena)</option>
                                            <option value="montecarlo">Radio Montecarlo (Transmisión En Vivo)</option>
                                            <option value="vecinal">📡 Transmisión Vecinal Directa (Móvil)</option>
                                        </select>
                                        <button className="btn-glass" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }} title="Ajuste de Ecualización">
                                            <Sliders size={16} /> Ecualizador
                                        </button>
                                        <button className="btn-glass" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }} title="Compartir Audio (Bluetooth/Wi-Fi/Cast)">
                                            <Share2 size={16} /> Compartir
                                        </button>
                                    </div>
                                </div>

                                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Transmisión en alianza con Radio Montecarlo y el programa <strong>Solo Deportes</strong>. Sigue toda la actualidad del fútbol regional y las diversas disciplinas del granate.</p>

                                {/* Analogue VU Meters UI (Hiperrealista) */}
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                                    {[1, 2].map((meter) => (
                                        <div key={meter} style={{
                                            background: 'linear-gradient(to bottom, #d4d4d4, #f5f5f5)',
                                            padding: '10px',
                                            borderRadius: '8px',
                                            border: '2px solid #333',
                                            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5), 0 10px 20px rgba(0,0,0,0.5)',
                                            width: '200px',
                                            height: '120px',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'flex-end'
                                        }}>
                                            <div style={{ position: 'absolute', top: '10px', width: '90%', height: '70%', background: '#fff9e6', borderRadius: '4px', border: '1px solid #ccc', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)' }}>
                                                {/* Graduaciones del Meter */}
                                                <div style={{ position: 'absolute', top: '15px', left: '10%', right: '10%', height: '40px', borderTop: '2px solid black', borderRadius: '50% 50% 0 0 / 100% 100% 0 0' }}></div>
                                                <div style={{ position: 'absolute', top: '25px', width: '100%', display: 'flex', justifyContent: 'space-around', fontSize: '10px', fontWeight: 'bold', color: '#333' }}>
                                                    <span>-20</span><span>-10</span><span>-5</span><span>0</span><span style={{ color: 'red' }}>+3</span>
                                                </div>
                                                <div style={{ position: 'absolute', top: '50px', width: '100%', textAlign: 'center', fontSize: '8px', color: '#666', letterSpacing: '1px' }}>VU METER {meter === 1 ? 'L' : 'R'}</div>

                                                {/* Aguja Analógica Hiperrealista Animada */}
                                                <div style={{
                                                    position: 'absolute',
                                                    bottom: '-10px',
                                                    left: '50%',
                                                    width: '2px',
                                                    height: '75px',
                                                    background: 'linear-gradient(to top, #111, #ff3333)',
                                                    transformOrigin: 'bottom center',
                                                    transform: isPlaying ? `rotate(${-30 + Math.random() * 60 * (volumen / 100)}deg)` : 'rotate(-40deg)',
                                                    transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    boxShadow: '2px 0 3px rgba(0,0,0,0.3)',
                                                    zIndex: 2
                                                }}></div>
                                                {/* Base de Aguja */}
                                                <div style={{ position: 'absolute', bottom: '-15px', left: 'calc(50% - 8px)', width: '16px', height: '16px', background: 'radial-gradient(circle, #444, #111)', borderRadius: '50%', zIndex: 3, border: '1px solid #000' }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Control de Play y Volumen Milimétrico */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', background: 'rgba(0,0,0,0.4)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div
                                        onClick={() => setIsPlaying(!isPlaying)}
                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: isPlaying ? 'radial-gradient(circle, rgba(220,38,38,0.5) 0%, rgba(0,0,0,0.8) 100%)' : 'radial-gradient(circle, rgba(220,38,38,0.2) 0%, rgba(0,0,0,0.4) 100%)', borderRadius: '50%', width: '100px', height: '100px', border: isPlaying ? '2px solid rgba(220,38,38,0.8)' : '2px solid rgba(220,38,38,0.5)', cursor: 'pointer', boxShadow: isPlaying ? '0 0 40px rgba(220,38,38,0.6)' : '0 0 20px rgba(220,38,38,0.3)', transition: 'all 0.3s' }}>
                                        <Speaker size={48} color={isPlaying ? "white" : "#dc2626"} />
                                    </div>
                                    <div style={{ textAlign: 'center', color: isPlaying ? '#dc2626' : 'var(--text-muted)', fontWeight: 'bold', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                                        {isPlaying ? 'Solo Deportes - Radio Montecarlo' : 'Radio en Reposo'}
                                    </div>

                                    {/* Control de Volumen */}
                                    <div style={{ width: '100%', maxWidth: '400px', display: 'flex', alignItems: 'center', gap: '1rem', background: '#1a1a1a', padding: '1rem', borderRadius: '8px', border: '1px solid #333', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)' }}>
                                        <Volume2 size={20} color="#dc2626" />
                                        <input
                                            type="range"
                                            min="0" max="100"
                                            value={volumen}
                                            onChange={(e) => setVolumen(e.target.value)}
                                            style={{
                                                flex: 1,
                                                accentColor: '#dc2626',
                                                height: '6px',
                                                cursor: 'pointer'
                                            }}
                                        />
                                        <span style={{ color: 'white', fontFamily: 'monospace', fontSize: '1.1rem', width: '40px', textAlign: 'right' }}>{volumen}%</span>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
                                    {['Cántico "Señores soy Papayero"', 'Podcast: Entrevista D.T. post-partido', 'Documental de Audio: Campeón 58'].map((item, i) => (
                                        <div key={i} className="glass-panel" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', borderRadius: '8px', border: '1px solid rgba(220,38,38,0.2)' }}>
                                            <span style={{ fontSize: '0.9rem', color: 'white' }}>{item}</span>
                                            <ChevronRight size={16} color="#dc2626" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Noticias */}
                    {activeTab === 'noticias' && (
                        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 style={{ margin: 0, color: 'white' }}>Minuto a Minuto Primera División</h3>
                                <span style={{ background: '#dc2626', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>Live Centinel</span>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                                {[
                                    { fuente: '@cdls_oficial', texto: "Preparando la táctica para el clásico del domingo! Nos vemos en La Portada 🔴⚪ #VamosSerena #CDLS", tiempo: "Hace 10 min", img: "https://images.unsplash.com/photo-1518605368461-1e1e25bb8a63?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
                                    { fuente: 'Smart Comuna News', texto: "Nuevo refuerzo internacional llega a Club Deportes La Serena, promete asegurar los goles granates.", tiempo: "Hace 1 hora" },
                                    { fuente: '@BarraPapayera', texto: "Ya estamos armando el carnaval. Todos a la puerta 5!!", tiempo: "Hace 2 horas" }
                                ].map((n, i) => (
                                    <div key={i} className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: '#fca5a5', fontWeight: 'bold', fontSize: '0.9rem' }}>{n.fuente}</span>
                                            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{n.tiempo}</span>
                                        </div>
                                        <p style={{ color: 'white', margin: 0, fontSize: '1rem', lineHeight: '1.4' }}>{n.texto}</p>
                                        {n.img && <img src={n.img} alt="Post image" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Memoria y Nostalgia (La Portada / Coliseo) */}
                    {activeTab === 'nostalgia' && (
                        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                                <Heart size={48} color="#fca5a5" style={{ margin: '0 auto 1rem auto', animation: 'pulse 3s infinite' }} />
                                <h3 style={{ color: 'white', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', margin: '0 0 1rem 0' }}>El Corazón de La Serena</h3>
                                <p style={{ color: '#fca5a5', fontSize: '1.2rem', fontWeight: 'bold' }}>La Portada y El Coliseo Monumental</p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                                <div style={{ background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.15) 0%, rgba(0,0,0,0.8) 100%)', padding: '2.5rem', borderRadius: '24px', border: '1px solid rgba(220, 38, 38, 0.3)', gridColumn: '1 / -1' }}>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: '1.8', fontStyle: 'italic', margin: 0 }}>
                                        "Muchos de nosotros, cuando éramos niños o escolares, participamos de eventos masivos con plumeros en las gradas de nuestra querida Portada, que hoy luce renovada y espectacular. Corrimos como atletas los 900 metros, o dimos esas inolvidables 2 vueltas y media a la pista atlética de ceniza. Aquí, en el Estadio y en nuestro Coliseo Monumental, vibramos viendo a gigantes como <strong>Miguel Mateos</strong> o <strong>Soda Stereo</strong> en vivo. Gozamos las multitudinarias fiestas de Navidad, y sufrimos viendo a nuestro <strong>Club Deportes La Serena</strong> ganar, siempre soñando con ser campeones de primera. Pero también fuimos testigos y protagonistas de espectáculos escolares y masivos. Hoy ese espíritu masivo de estadio y esa energía vibrante se transforma en acción ciudadana: en La Serena Smart City no decimos <em>'yo perreo sola'</em>, decimos muy fuerte: <strong>'Yo cuido, Tú cuidas, Cuidamos solos, nadie nos tiene que decir'</strong>."
                                    </p>
                                </div>

                                <div style={{ background: 'rgba(0,0,0,0.4)', padding: '2rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                    <Music size={40} color="#38bdf8" style={{ marginBottom: '1rem' }} />
                                    <h4 style={{ color: 'white', fontSize: '1.3rem', marginBottom: '1rem' }}>Conciertos de Leyenda</h4>
                                    <p style={{ color: 'var(--text-muted)' }}>Desde el rock latino en su época dorada hasta los ritmos urbanos contemporáneos. El escenario que vio nacer la cultura de toda una generación Papayera.</p>
                                </div>

                                <div style={{ background: 'rgba(0,0,0,0.4)', padding: '2rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                    <Activity size={40} color="#10b981" style={{ marginBottom: '1rem' }} />
                                    <h4 style={{ color: 'white', fontSize: '1.3rem', marginBottom: '1rem' }}>Espíritu Deportivo Escolar</h4>
                                    <p style={{ color: 'var(--text-muted)' }}>Las inolvidables revistas de gimnasia, las carreras en la pista y esa sensación única de desfilar representando a tu colegio ante todo el estadio.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
