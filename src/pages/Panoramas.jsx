import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PartyPopper, Music, Ticket, Utensils, Calendar, MapPin, ExternalLink, PlusCircle, Search, ArrowLeft, Palette, Brush, ShieldCheck } from 'lucide-react';

export default function Panoramas() {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showEnrolModal, setShowEnrolModal] = useState(false);

    const categories = [
        { id: 'all', label: 'Todos', icon: PartyPopper, color: 'var(--brand-primary)' },
        { id: 'music', label: 'Música & Conciertos', icon: Music, color: 'var(--brand-accent)' },
        { id: 'theater', label: 'Cultura & Arte', icon: Ticket, color: 'var(--alert-warning)' },
        { id: 'party', label: 'Fiestas & Pubs', icon: PartyPopper, color: 'var(--alert-danger)' },
        { id: 'food', label: 'Gastronomía', icon: Utensils, color: 'var(--brand-secondary)' },
        { id: 'sports', label: 'Deportes', icon: Calendar, color: '#38bdf8' },
        { id: 'ecology', label: 'Ecológico', icon: MapPin, color: '#10b981' },
        { id: 'commerce', label: 'Comercial', icon: Ticket, color: '#f59e0b' },
        { id: 'religious', label: 'Católico & Religioso', icon: PlusCircle, color: '#a78bfa' },
        { id: 'graffiti', label: 'Artistas Locales & Muralismo', icon: Palette, color: '#f43f5e' }
    ];

    // Dummy data for panoramas
    const panoramasData = [
        {
            id: 1,
            title: 'Noche de Stand-up Comedy',
            provider: 'Pub El Colonial',
            category: 'theater',
            date: 'Hoy, 21:00 hrs',
            location: 'O\'Higgins 456, La Serena',
            price: '$5.000',
            image: '/comic-aves.jpg',
            tags: ['Humor', '+18', 'Tragos'],
            color: 'var(--alert-warning)'
        },
        {
            id: 2,
            title: 'Tributo Rock',
            provider: 'Rock & Soccer',
            category: 'music',
            date: 'Mañana, 22:30 hrs',
            location: 'Av. Juan Cisternas 2000',
            price: '$8.000',
            image: '/comic-bici.jpg',
            tags: ['Música en vivo', 'Rock', 'Cover'],
            color: 'var(--brand-accent)'
        },
        {
            id: 3,
            title: 'Sunset Playa',
            provider: 'Club Mistik',
            category: 'party',
            date: 'Sábado, 23:00 hrs',
            location: 'Av. Del Mar 1500',
            price: '$10.000 (Cover)',
            image: '/comic-playa.jpg',
            tags: ['Bailable', 'DJ', 'Promos'],
            color: 'var(--alert-danger)'
        },
        {
            id: 4,
            title: 'Feria Patronal y FoodTrucks',
            provider: 'Agrupación FoodTrucks LS',
            category: 'food',
            date: 'Sábado y Domingo, 12:00 a 20:00',
            location: 'Parque Pedro de Valdivia',
            price: 'Entrada Liberada',
            image: '/comic-patrimonio.jpg',
            tags: ['Familiar', 'Comida Local', 'Juegos'],
            color: 'var(--brand-secondary)'
        },
        {
            id: 5,
            title: 'Campeonato Regional de Surf',
            provider: 'Club Surf El Faro',
            category: 'sports',
            date: 'Sábado, 09:00 hrs',
            location: 'Playa El Faro',
            price: 'Gratis Público',
            image: '/comic-playa.jpg',
            tags: ['Deporte', 'Playa', 'Competencia'],
            color: '#38bdf8'
        },
        {
            id: 6,
            title: 'Limpieza Humedal El Culebrón',
            provider: 'Voluntarios LS Medioambiente',
            category: 'ecology',
            date: 'Domingo, 10:00 hrs',
            location: 'Entrada Humedal Sur',
            price: 'Voluntariado',
            image: '/comic-cielo.jpg',
            tags: ['Ecológico', 'Comunidad', 'Naturaleza'],
            color: '#10b981'
        },
        {
            id: 7,
            title: 'Gran Feria de Pymes, Empleos y Oficios',
            provider: 'Fomento Productivo LS',
            category: 'commerce',
            date: 'Viernes a Domingo, 11:00 a 19:00',
            location: 'Plaza de Armas',
            price: 'Entrada Liberada',
            image: '/comic-aves.jpg',
            tags: ['Emprendimiento', 'Comercial', 'Ventas'],
            color: '#f59e0b'
        },
        {
            id: 8,
            title: 'Misa Dominical y Coro Plurilingüe',
            provider: 'Arzobispado de La Serena',
            category: 'religious',
            date: 'Domingo, 12:00 hrs',
            location: 'Catedral de La Serena',
            price: 'Aporte Voluntario',
            image: '/comic-patrimonio.jpg',
            tags: ['Religión', 'Católico', 'Misa'],
            color: '#a78bfa'
        },
        {
            id: 9,
            title: 'Trisquel Murales: Taller y Servicios',
            provider: 'Colectivo Arte Urbano LS',
            category: 'graffiti',
            date: 'Disponible Lun a Dom',
            location: 'Atención a Domicilio/Empresas',
            price: 'Presupuesto a Medida',
            image: '/legacy_honorarios/v.jpg',
            tags: ['Muralismo', 'Anti-Vandalismo', 'ArteLocal'],
            color: '#f43f5e'
        },
        {
            id: 10,
            title: 'El Nuevo Peregrino: Tradición Musical',
            provider: 'Pub & Restaurant El Nuevo Peregrino',
            category: 'food',
            date: 'Abierto Lunes a Sábado',
            location: 'Av. Balmaceda 2936, La Serena',
            price: 'Carta Variada',
            image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1000&auto=format&fit=crop',
            tags: ['Gastronomía', 'Música en vivo', 'Espacio Cultural', '20 Años de Tradición'],
            color: 'var(--brand-secondary)',
            phone: '9 9199 3406',
            fb: 'https://www.facebook.com/nuevoperegrino/'
        }
    ];

    const filteredPanoramas = panoramasData.filter(panorama => {
        const matchesCategory = activeFilter === 'all' || panorama.category === activeFilter;
        const matchesSearch = panorama.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            panorama.provider.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="page-container" style={{ paddingBottom: '5rem' }}>
            <header className="page-header" style={{ marginBottom: '2rem' }}>
                <button onClick={() => navigate('/')} className="btn-glass" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '20px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                    <ArrowLeft size={16} /> Volver al Escritorio
                </button>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h2 className="text-gradient" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <PartyPopper size={32} color="var(--brand-accent)" className="pulse" />
                            Smart Eventos
                        </h2>
                        <p className="text-muted">Descubre eventos, fiestas, cultura y la mejor gastronomía en La Serena.</p>
                    </div>
                    <button className="btn btn-primary animate-slide-up" style={{ background: 'var(--brand-accent)', boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)' }} onClick={() => setShowEnrolModal(true)}>
                        <PlusCircle size={18} /> Publicar Evento / Enrolar Artista
                    </button>
                </div>
            </header>

            {/* Gamification Banner */}
            <div className="glass-panel animate-slide-up" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(20, 30, 48, 0.9) 100%)', border: '1px solid rgba(236, 72, 153, 0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1 }}>
                    <div style={{ position: 'relative' }}>
                        <img src="/characters/farino.png" alt="Fariño" style={{ width: '100px', height: '100px', objectFit: 'contain', animation: 'bounce 3s infinite alternate', filter: 'drop-shadow(0 0 15px rgba(56, 189, 248, 0.5))' }} />
                    </div>
                    <div>
                        <h3 className="text-gradient" style={{ margin: '0 0 0.25rem 0', fontSize: '1.4rem', color: '#38bdf8' }}>Fariño: "¡Oye, hay mansos eventos hoy!"</h3>
                        <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '600px' }}>
                            Descubre los mejores panoramas, gana tokens participando en eventos locales y colecciona a los 14 personajes de la ciudad.
                        </p>
                    </div>
                </div>
                <button className="btn btn-glass" style={{ background: 'rgba(236, 72, 153, 0.2)', color: 'white', borderColor: 'rgba(236, 72, 153, 0.5)' }} onClick={() => window.dispatchEvent(new CustomEvent('open-game'))}>
                    <PartyPopper size={16} style={{ display: 'inline', marginRight: '5px' }} /> Jugar Arcade Retro
                </button>
            </div>

            {/* Search and Filters */}
            <div className="glass-panel animate-slide-up" style={{ padding: '1rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ position: 'relative' }}>
                    <Search size={20} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                        type="text"
                        placeholder="Buscar por artista, local o nombre de evento..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: 'var(--border-radius-pill)', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white', outline: 'none', fontSize: '1rem' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', scrollbarWidth: 'none' }} className="hide-scroll">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveFilter(cat.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem 1rem',
                                borderRadius: 'var(--border-radius-pill)',
                                background: activeFilter === cat.id ? cat.color : 'rgba(255,255,255,0.05)',
                                color: activeFilter === cat.id ? 'white' : 'var(--text-secondary)',
                                border: `1px solid ${activeFilter === cat.id ? cat.color : 'rgba(255,255,255,0.1)'}`,
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.3s ease',
                                fontWeight: activeFilter === cat.id ? 'bold' : 'normal'
                            }}
                        >
                            <cat.icon size={16} />
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ARTISTAS LOCALES Y MURALISMO PREVENTIVO BANNER */}
            {activeFilter === 'graffiti' || activeFilter === 'all' ? (
                <div className="glass-panel animate-fade-in" style={{ padding: '2rem', marginBottom: '2rem', background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.15), rgba(15, 23, 42, 0.95))', border: '1px solid rgba(244, 63, 94, 0.4)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                        <div style={{ background: '#f43f5e', padding: '1rem', borderRadius: '50%', boxShadow: '0 0 20px rgba(244, 63, 94, 0.5)' }}>
                            <Palette size={32} color="white" />
                        </div>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '1.6rem', color: 'white' }}>Catálogo de Artistas Locales & Muralismo Preventivo</h3>
                            <p style={{ margin: '0.2rem 0 0 0', color: 'var(--text-secondary)', fontSize: '1rem' }}>Recupera tu fachada y previene rayados vandálicos contratando arte urbano profesional.</p>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {/* OFERTA DE SERVICIOS */}
                        <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1.5rem', borderRadius: '16px', border: '1px dashed #f43f5e' }}>
                            <h4 style={{ color: '#f43f5e', fontSize: '1.2rem', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Brush size={20} /> Para Grafiteros y Artistas</h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                                ¿Eres muralista o grafitero profesional? Enrola tus servicios aquí y permite que comercios, juntas de vecinos e instituciones coticen tu arte para hermosear la ciudad de manera legal.
                            </p>
                            <button className="btn pulse" onClick={() => setShowEnrolModal(true)} style={{ background: '#f43f5e', color: 'white', width: '100%', fontWeight: 'bold' }}>
                                Enrolar mi Portafolio Artístico
                            </button>
                        </div>

                        {/* DEMANDA DE EMPRESAS/VECINOS */}
                        <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1.5rem', borderRadius: '16px', border: '1px dashed #10b981' }}>
                            <h4 style={{ color: '#10b981', fontSize: '1.2rem', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ShieldCheck size={20} /> Para Vecinos y Empresas</h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                                Los estudios demuestran que un muro con un mural artístico reduce en un 95% los ataques por rayados vandálicos. Busca y contrata artistas locales validados para pintar la fachada de tu casa o negocio.
                            </p>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input type="text" placeholder="Ej: Mural Naturaleza, Letras 3D..." style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(16,185,129,0.3)', outline: 'none' }} />
                                <button className="btn" style={{ background: '#10b981', color: '#000', fontWeight: 'bold' }}>Buscar</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}


            {/* Feed / Cartelera */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {
                    filteredPanoramas.length > 0 ? (
                        filteredPanoramas.map((item, index) => (
                            <div
                                key={item.id}
                                className="glass-panel animate-slide-up"
                                style={{
                                    animationDelay: `${index * 0.1}s`,
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s',
                                    cursor: 'pointer',
                                    border: '1px solid rgba(255,255,255,0.1)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = `0 10px 30px ${item.color}40`;
                                    e.currentTarget.style.borderColor = item.color;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'var(--glass-shadow)';
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                }}
                            >
                                <div style={{ height: '180px', position: 'relative' }}>
                                    <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,1) 0%, rgba(15,23,42,0) 100%)' }}></div>
                                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: item.color, padding: '0.25rem 0.75rem', borderRadius: 'var(--border-radius-pill)', fontSize: '0.75rem', fontWeight: 'bold', color: 'white', display: 'flex', alignItems: 'center', gap: '0.25rem', boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>
                                        {categories.find(c => c.id === item.category)?.label}
                                    </div>
                                    <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem' }}>
                                        <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>{item.title}</h3>
                                        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{item.provider}</p>
                                    </div>
                                </div>

                                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.4rem', borderRadius: '50%' }}>
                                                <Calendar size={16} color="var(--brand-primary)" />
                                            </div>
                                            {item.date}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.4rem', borderRadius: '50%' }}>
                                                <MapPin size={16} color="var(--alert-danger)" />
                                            </div>
                                            {item.location}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.4rem', borderRadius: '50%' }}>
                                                <Ticket size={16} color="var(--brand-secondary)" />
                                            </div>
                                            {item.price}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: 'auto' }}>
                                        {item.tags.map(tag => (
                                            <span key={tag} style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div style={{ marginTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem', display: 'flex', justifyContent: 'center' }}>
                                        <button className="btn btn-glass" style={{ width: '100%', fontSize: '0.9rem', color: item.color, borderColor: 'rgba(255,255,255,0.1)' }}>
                                            Ver Detalles <ExternalLink size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)' }}>
                            <PartyPopper size={48} style={{ opacity: 0.2, margin: '0 auto 1rem' }} />
                            <h3>No hay panoramas en esta categoría</h3>
                            <p>Intenta con otra búsqueda o filtro.</p>
                        </div>
                    )
                }
            </div>

            <style>{`
                .hide-scroll::-webkit-scrollbar {
                    display: none;
                }
            `}</style>

            {showEnrolModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="glass-panel" style={{ width: '90%', maxWidth: '400px', padding: '2rem' }}>
                        <h3 style={{ color: 'white', marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <PlusCircle color="var(--brand-accent)" />
                            Solicitud de Enrolamiento
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                            Regístrate como artista o productor local para poder calendarizarte en nuestros mapas inmersivos y espacios autorizados.
                        </p>
                        <form onSubmit={(e) => { e.preventDefault(); alert('Solicitud enviada exitosamente.'); setShowEnrolModal(false); }}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Nombre Proyecto / Artista</label>
                                <input type="text" required style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '8px' }} />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Tipo de Arte</label>
                                <select style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '8px' }}>
                                    <option>Arte Urbano / Grafitero Preventivo</option>
                                    <option>Música / Banda en Vivo</option>
                                    <option>Teatro / Stand-Up Comedy</option>
                                    <option>Artesanía / Visuales</option>
                                    <option>Gastronomía Local</option>
                                </select>
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Contacto (Email/Tel)</label>
                                <input type="text" required style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '8px' }} />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button type="button" onClick={() => setShowEnrolModal(false)} className="btn btn-glass" style={{ flex: 1 }}>Cancelar</button>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1, background: 'var(--brand-accent)' }}>Enviar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
