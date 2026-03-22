import React, { useState } from 'react';
import { X, Heart, Star, BookOpen, Music, Medal, MapPin, Search, ArrowRight, Share2, Calendar, Award } from 'lucide-react';
import MasterDanielPalominos3D from './MasterDanielPalominos3D';
import HolographicFigure from './HolographicFigure';

const ImageFallback = ({ src, alt, style, className }) => {
    const [status, setStatus] = React.useState('loading');
    return (
        <div style={{ position: 'relative', width: style.width || '100%', height: style.height || '100%', flexShrink: 0, borderRadius: style.borderRadius, overflow: 'hidden', background: 'rgba(255,255,255,0.05)' }}>
            {status === 'loading' && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="pulse-fast" style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(56,189,248,0.5)' }}></div>
                </div>
            )}
            <img 
                src={src} 
                alt={alt} 
                className={className} 
                style={{ ...style, opacity: status === 'success' ? 1 : 0, transition: 'opacity 0.5s ease' }} 
                onLoad={() => setStatus('success')} 
                onError={(e) => {
                    setStatus('error');
                    e.target.src = 'https://picsum.photos/seed/vls_avatar/400/600';
                }} 
            />
        </div>
    );
};

export default function MemorialHijosRegion({ onClose }) {
    const [selectedFigure, setSelectedFigure] = useState(null);
    const [filter, setFilter] = useState('Todos');
    const [is3DOpen, setIs3DOpen] = useState(false);
    const [flowers, setFlowers] = useState(() => {
        const saved = localStorage.getItem('vls_memorial_flowers');
        return saved ? JSON.parse(saved) : {};
    });
    const [animatedFlowers, setAnimatedFlowers] = useState([]);
    const [comments, setComments] = useState(() => {
        const saved = localStorage.getItem('vls_memorial_comments');
        return saved ? JSON.parse(saved) : {};
    });
    const [tributeFlowers, setTributeFlowers] = useState(() => {
        const saved = localStorage.getItem('vls_memorial_tributes');
        return saved ? JSON.parse(saved) : {};
    });

    const handleLeaveComment = (id, text) => {
        if (!text.trim()) return;
        const newComments = { ...comments, [id]: [...(comments[id] || []), { text, date: new Date().toLocaleString() }] };
        setComments(newComments);
        localStorage.setItem('vls_memorial_comments', JSON.stringify(newComments));
    };

    const handleAddTributeFlower = (id, type) => {
        const newTributes = { ...tributeFlowers };
        if (!newTributes[id]) newTributes[id] = [];
        newTributes[id].push({ type, left: Math.random() * 80 + 10, top: Math.random() * 60 + 20 });
        setTributeFlowers(newTributes);
        localStorage.setItem('vls_memorial_tributes', JSON.stringify(newTributes));
        handleLeaveFlower(id);
    };

    const handleLeaveFlower = (id) => {
        const newCount = (flowers[id] || 0) + 1;
        const updated = { ...flowers, [id]: newCount };
        setFlowers(updated);
        localStorage.setItem('vls_memorial_flowers', JSON.stringify(updated));

        // Trigger animation
        const newAnim = {
            idx: Date.now(),
            left: Math.random() * 80 + 10 + '%',
            delay: Math.random() * 0.5
        };
        setAnimatedFlowers(prev => [...prev, newAnim]);
        setTimeout(() => {
            setAnimatedFlowers(prev => prev.filter(f => f.idx !== newAnim.idx));
        }, 3000);

        // Feedback sonoro opcional o visual
        if (window.speechSynthesis) {
             const ut = new SpeechSynthesisUtterance("Has dejado una añañuca en memoria del hijo de la región.");
             ut.lang = "es-CL";
             ut.volume = 0.3;
             ut.rate = 1.2;
             window.speechSynthesis.speak(ut);
        }
    };

    const handleShareFigure = (figura) => {
        // Generamos un link profundo (Deep Link)
        const baseUrl = window.location.origin + window.location.pathname;
        const shareUrl = `${baseUrl}?m=${figura.id}`;
        
        const shareData = {
            title: `Homenaje: ${figura.name} - Smart Comuna`,
            text: `VLS rinde tributo a ${figura.name}. ${figura.legacy.substring(0, 120)}... Conoce su historia en:`,
            url: shareUrl,
            image: window.location.origin + figura.image 
        };

        window.dispatchEvent(new CustomEvent('open-smart-share', { detail: shareData }));
    };

    // Deep Link Listener
    React.useEffect(() => {
        const handleSelect = (e) => {
            const figId = e.detail;
            const fig = figuras.find(f => f.id === figId);
            if (fig) {
                setSelectedFigure(fig);
                setFilter('Todos');
            }
        };
        window.addEventListener('select-memorial-figure', handleSelect);
        return () => window.removeEventListener('select-memorial-figure', handleSelect);
    }, [figuras]);

    // Rutas de imágenes generadas para Master Daniel Palominos
    const PALOMINOS_MURAL_PATHS = [
        '/homenaje/palominos_mural_humanity_1773806652665.png',
        '/homenaje/palominos_mural_landscape_spirit_1773806746736.png',
        '/homenaje/palominos_mural_science_art_1773806667425.png',
        '/homenaje/palominos_mural_social_legacy_1773806794839.png'
    ];

    const figuras = [
        {
            id: 'mistral',
            name: 'Gabriela Mistral',
            pseudonym: 'Lucila Godoy Alcayaga',
            title: 'Premio Nobel de Literatura',
            birth: '7 de abril de 1889, Vicuña',
            death: '10 de enero de 1957',
            legacy: 'Poetisa, diplomática y pedagoga. Primera mujer iberoamericana en recibir el Nobel de Literatura.',
            image: 'https://raw.githubusercontent.com/vecinoslaserenachile-cloud/RDMLS/main/assets/memorial/mistral_3d.png',
            category: 'Letras',
            location: 'Vicuña / La Serena',
            icon: BookOpen,
            color: '#7c3aed'
        },
        {
            id: 'videla',
            name: 'Gabriel González Videla',
            title: 'Presidente de Chile (1946-1952)',
            birth: '23 de noviembre de 1898, La Serena',
            death: '22 de agosto de 1980',
            legacy: 'Impulsor del "Plan Serena", transformó la arquitectura de la ciudad al estilo neo-colonial. Estableció la presencia de Chile en la Antártida.',
            image: 'https://raw.githubusercontent.com/vecinoslaserenachile-cloud/RDMLS/main/assets/memorial/videla_3d.png',
            category: 'Política / Historia',
            location: 'La Serena',
            icon: Star,
            color: '#2563eb'
        },
        {
            id: 'sulantay',
            name: 'José Sulantay',
            title: 'Arquitecto de la "Generación Dorada"',
            birth: '3 de abril de 1940, Coquimbo',
            death: '20 de julio de 2023',
            legacy: 'Legendario DT de Coquimbo Unido y creador de la base del éxito del fútbol chileno moderno. Un maestro de disciplina y visión.',
            image: 'https://raw.githubusercontent.com/vecinoslaserenachile-cloud/RDMLS/main/assets/memorial/sulantay_3d.png',
            category: 'Deportes',
            location: 'Coquimbo',
            icon: Medal,
            color: '#ca8a04'
        },
        {
            id: 'pena',
            name: 'Jorge Peña Hen',
            title: 'Director y Compositor',
            birth: '16 de enero de 1928',
            death: '16 de octubre de 1973',
            legacy: 'Fundador de la primera Orquesta Sinfónica Infantil en Latinoamérica. Su legado vive en cada niño que toma un instrumento en la región.',
            image: 'https://raw.githubusercontent.com/vecinoslaserenachile-cloud/RDMLS/main/assets/memorial/penahan_3d.png',
            category: 'Música',
            location: 'La Serena',
            icon: Music,
            color: '#db2777'
        },
        {
            id: 'palominos',
            name: 'Maestro Daniel Palominos',
            title: 'Artista Ceramista y Defensor DD.HH.',
            birth: '1953',
            death: '5 de junio de 2024',
            legacy: 'Eximio ceramista de la ULS, profesor y ex concejal. Defensor infatigable de los Derechos Humanos. Su arte en arcilla es un testimonio eterno de la memoria y la cultura regional.',
            image: '/homenaje/palominos_mural_humanity_1773806652665.png',
            category: 'Arte / Social',
            location: 'La Serena / Región de Coquimbo',
            icon: Award,
            color: '#92400e',
            has3D: true
        },
        {
            id: 'blanche',
            name: 'Bartolomé Blanche',
            title: 'Militar y Político (Presidente de la República)',
            birth: '6 de junio de 1879, La Serena',
            death: '10 de junio de 1970',
            legacy: 'Destacado militar que llegó a la Presidencia de la República en 1932. Su carrera se inició en las aulas de nuestra ciudad.',
            image: 'https://raw.githubusercontent.com/vecinoslaserenachile-cloud/RDMLS/main/assets/memorial/blanche_3d.png',
            category: 'Política / Historia',
            location: 'La Serena',
            icon: Star,
            color: '#2563eb'
        },
        {
            id: 'bongard',
            name: 'Isabel Bongard',
            title: 'Pedagoga Educadora',
            birth: '20 de enero de 1849',
            death: '23 de mayo de 1928, La Serena',
            legacy: 'Pionera en la educación femenina en Chile. Traída por el gobierno para reformar la enseñanza, su nombre es sinónimo de excelencia pedagógica en la región.',
            image: 'https://raw.githubusercontent.com/vecinoslaserenachile-cloud/RDMLS/main/assets/memorial/bongard_3d.png',
            category: 'Educación',
            location: 'La Serena',
            icon: BookOpen,
            color: '#ec4899'
        },
        {
            id: 'peni',
            name: 'Juan de Dios Peni',
            title: 'Héroe de la Independencia',
            birth: '1770',
            death: '1849',
            legacy: 'Patriota serenense que luchó por la independencia de Chile. Su casa en calle Prat es un testimonio de la historia republicana de la ciudad.',
            image: 'https://raw.githubusercontent.com/vecinoslaserenachile-cloud/RDMLS/main/assets/memorial/peni_3d.png',
            category: 'Historia',
            location: 'La Serena',
            icon: Medal,
            color: '#7f1d1d'
        },
        {
            id: 'abalos',
            name: 'Nicasio Ábalos',
            title: 'Arquitecto Visionario',
            birth: 'Siglo XIX',
            death: '1945',
            legacy: 'Arquitecto que dio forma a los edificios más emblemáticos del centro histórico. Su visión estética definió la elegancia serenense.',
            image: 'https://raw.githubusercontent.com/vecinoslaserenachile-cloud/RDMLS/main/assets/memorial/abalos_3d.png',
            category: 'Arte / Historia',
            location: 'La Serena',
            icon: Award,
            color: '#0d9488'
        },
        {
            id: 'formas',
            name: 'Adolfo Formas',
            title: 'Educador e Intelectual',
            birth: '1860',
            death: '1934',
            legacy: 'Formador de generaciones de serenenses en el Liceo de Hombre. Su pasión por la historia local preservó la memoria de la ciudad.',
            image: 'https://raw.githubusercontent.com/vecinoslaserenachile-cloud/RDMLS/main/assets/memorial/formas_3d.png',
            category: 'Educación',
            location: 'La Serena',
            icon: BookOpen,
            color: '#9333ea'
        }
    ];

    const filteredFiguras = filter === 'Todos' ? figuras : figuras.filter(f => f.category === filter);

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100000,
            backgroundColor: '#020617',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            fontFamily: "'Playfair Display', serif"
        }}>
            {/* Header Memorial */}
            <header style={{
                padding: '2rem',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                background: 'linear-gradient(to bottom, #0f172a, #020617)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 10
            }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', margin: 0, fontWeight: '900', letterSpacing: '-1px' }}>
                        ALTARES DE LA REGIÓN
                    </h1>
                    <p style={{ color: '#94a3b8', margin: '0.5rem 0 0', fontSize: '1.1rem' }}>
                        Homenaje a los hijos ilustres de la Región de Coquimbo.
                    </p>
                </div>
                <button onClick={onClose} style={{
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <X size={24} />
                </button>
            </header>

            {/* Content Area */}
            <main style={{
                flex: 1,
                overflowY: 'auto',
                padding: '3rem 2rem',
                backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(30, 58, 138, 0.1) 0%, transparent 80%)'
            }}>
                {/* Filters */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
                    {['Todos', 'Letras', 'Política / Historia', 'Deportes', 'Música', 'Arte / Social', 'Educación', 'Historia'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            style={{
                                padding: '0.8rem 1.5rem',
                                borderRadius: '30px',
                                border: filter === cat ? 'none' : '1px solid rgba(255,255,255,0.2)',
                                backgroundColor: filter === cat ? '#3b82f6' : 'transparent',
                                color: 'white',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                transition: 'all 0.3s'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid Figuras */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '3rem',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    {filteredFiguras.map(figura => (
                        <div
                            key={figura.id}
                            onClick={() => setSelectedFigure(figura)}
                            style={{
                                background: 'rgba(15, 23, 42, 0.4)',
                                borderRadius: '24px',
                                border: '1px solid rgba(255,255,255,0.05)',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                position: 'relative'
                            }}
                            className="memorial-card"
                        >
                            <div style={{ height: '240px', position: 'relative', background: '#000' }}>
                                <ImageFallback
                                    src={figura.image}
                                    alt={figura.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    background: figura.color,
                                    padding: '0.5rem',
                                    borderRadius: '12px',
                                    boxShadow: `0 0 20px ${figura.color}50`
                                }}>
                                    <figura.icon color="white" size={20} />
                                </div>
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    padding: '2rem 1.5rem',
                                    background: 'linear-gradient(to top, rgba(2, 6, 23, 1), transparent)'
                                }}>
                                    <h3 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 'bold' }}>{figura.name}</h3>
                                    <p style={{ color: '#94a3b8', margin: '0.2rem 0 0', fontWeight: 'bold', fontSize: '0.9rem' }}>{figura.title}</p>
                                </div>
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: '1.6', height: '80px', overflow: 'hidden' }}>
                                    {figura.legacy}
                                </p>
                                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        <MapPin size={14} /> {figura.location}
                                    </span>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if(figura.has3D) {
                                                setIs3DOpen(true);
                                            } else {
                                                handleLeaveFlower(figura.id);
                                            }
                                        }}
                                        style={{
                                            background: (figura.has3D || (flowers[figura.id] > 0)) ? figura.color : 'rgba(255,255,255,0.05)', 
                                            border: 'none', 
                                            color: 'white', 
                                            padding: '0.6rem 1.2rem',
                                            borderRadius: '12px',
                                            fontWeight: 'bold', 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: '0.5rem',
                                            boxShadow: (figura.has3D || (flowers[figura.id] > 0)) ? `0 4px 15px ${figura.color}60` : 'none',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s'
                                        }}
                                    >
                                        {figura.has3D ? 'HOMENAJE 3D' : (flowers[figura.id] > 0 ? `FLORES: ${flowers[figura.id]}` : 'DEJAR FLOR')} <ArrowRight size={18} />
                                    </button>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleShareFigure(figura);
                                        }}
                                        style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'white', border: 'none', padding: '0.6rem', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s' }}
                                        title="Difundir Altar Digital"
                                    >
                                        <Share2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Integration de la Exposición 3D */}
                {is3DOpen && (
                    <MasterDanielPalominos3D 
                        onClose={() => setIs3DOpen(false)} 
                        muralImages={PALOMINOS_MURAL_PATHS}
                    />
                )}
            </main>

            {/* Modal Detalle Homenaje */}
            {selectedFigure && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 100010,
                    background: 'rgba(2, 6, 23, 0.98)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem'
                }}>
                    <div style={{
                        maxWidth: '900px',
                        width: '100%',
                        background: '#0f172a',
                        borderRadius: '32px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: window.innerWidth < 768 ? 'column' : 'row',
                        height: 'auto',
                        maxHeight: '90vh'
                    }}>
                        <div style={{ flex: 1, background: '#000', height: window.innerWidth < 768 ? '400px' : 'auto', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.3 }}>
                                <img src={selectedFigure.image} alt={selectedFigure.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(5px)' }} />
                            </div>
                            
                            {/* Hologram Display */}
                            <HolographicFigure image={selectedFigure.image} name={selectedFigure.name} color={selectedFigure.color} />

                            {/* Sticky Tribute Flowers */}
                            {(tributeFlowers[selectedFigure.id] || []).map((tf, i) => (
                                <div key={i} style={{
                                    position: 'absolute',
                                    left: `${tf.left}%`,
                                    top: `${tf.top}%`,
                                    pointerEvents: 'none',
                                    zIndex: 5
                                }}>
                                    <img 
                                        src={tf.type === 'ananuca-white' ? '/ananuca_flower_3d_icon_1773625751027.png' : '/ananuca_flower_3d_icon_1773625751027.png'} 
                                        style={{ height: '40px', filter: tf.type === 'ananuca-white' ? 'brightness(2) contrast(1.2)' : 'none' }} 
                                        alt="tribute" 
                                    />
                                </div>
                            ))}
                        </div>
                        <div style={{ flex: 1.2, padding: '3rem', overflowY: 'auto' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <span style={{ background: `${selectedFigure.color}20`, color: selectedFigure.color, padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 'bold', border: `1px solid ${selectedFigure.color}40` }}>
                                    {selectedFigure.category}
                                </span>
                                <button onClick={() => setSelectedFigure(null)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                                    <X size={24} />
                                </button>
                            </div>
                            <h2 style={{ fontSize: '3rem', margin: '0 0 0.5rem 0', fontWeight: '900' }}>{selectedFigure.name}</h2>
                            {selectedFigure.pseudonym && (
                                <p style={{ color: selectedFigure.color, fontStyle: 'italic', fontSize: '1.2rem', marginBottom: '1.5rem' }}>"{selectedFigure.pseudonym}"</p>
                            )}
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem', borderY: '1px solid rgba(255,255,255,0.05)', padding: '1.5rem 0' }}>
                                <div>
                                    <div style={{ color: '#64748b', fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Nacimiento</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
                                        <Calendar size={16} /> {selectedFigure.birth}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ color: '#64748b', fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Fallecimiento</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
                                        <Heart size={16} /> {selectedFigure.death}
                                    </div>
                                </div>
                            </div>

                            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#cbd5e1', marginBottom: '2.5rem' }}>
                                {selectedFigure.legacy}
                            </p>

                             <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem' }}>
                                <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '1rem' }}>TRIBUTO VECINAL</h4>
                                <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem' }}>
                                    <button onClick={() => handleAddTributeFlower(selectedFigure.id, 'ananuca-red')} style={{ padding: '0.6rem 1rem', background: '#7f1d1d', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '0.75rem', cursor: 'pointer' }}>+ Añañuca Roja</button>
                                    <button onClick={() => handleAddTributeFlower(selectedFigure.id, 'ananuca-white')} style={{ padding: '0.6rem 1rem', background: '#f8fafc', border: 'none', borderRadius: '8px', color: '#000', fontSize: '0.75rem', cursor: 'pointer' }}>+ Añañuca Blanca</button>
                                </div>

                                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
                                    <div style={{ maxHeight: '150px', overflowY: 'auto', marginBottom: '1rem' }}>
                                        {(comments[selectedFigure.id] || []).map((c, i) => (
                                            <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.85rem' }}>
                                                <p style={{ margin: 0, opacity: 0.9 }}>"{c.text}"</p>
                                                <small style={{ opacity: 0.5 }}>{c.date}</small>
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <input 
                                            id="comment-input"
                                            placeholder="Deja un mensaje póstumo..." 
                                            style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '8px 12px', borderRadius: '8px', color: '#fff' }}
                                            onKeyDown={(e) => {
                                                if(e.key === 'Enter') {
                                                    handleLeaveComment(selectedFigure.id, e.target.value);
                                                    e.target.value = '';
                                                }
                                            }}
                                        />
                                        <button 
                                            onClick={() => {
                                                const el = document.getElementById('comment-input');
                                                handleLeaveComment(selectedFigure.id, el.value);
                                                el.value = '';
                                            }}
                                            style={{ background: '#3b82f6', border: 'none', borderRadius: '8px', color: '#fff', padding: '0 12px' }}
                                        >
                                            Enviar
                                        </button>
                                    </div>
                                </div>
                             </div>

                             <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <button 
                                    onClick={() => { 
                                        if(selectedFigure.has3D) { 
                                            setSelectedFigure(null); 
                                            setIs3DOpen(true); 
                                        } else {
                                            handleAddTributeFlower(selectedFigure.id, 'ananuca-red');
                                        }
                                    }} 
                                    style={{ 
                                        flex: 1, 
                                        backgroundColor: selectedFigure.color, 
                                        color: 'white', 
                                        border: 'none', 
                                        padding: '1rem', 
                                        borderRadius: '14px', 
                                        fontWeight: 'bold', 
                                        cursor: 'pointer', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center', 
                                        gap: '0.6rem',
                                        boxShadow: `0 10px 20px ${selectedFigure.color}40`
                                    }}
                                >
                                    {selectedFigure.has3D ? 'ENTRAR AL HOMENAJE 3D' : 'DEJAR UNA AÑAÑUCA'} <Star size={20} />
                                </button>
                                {flowers[selectedFigure.id] > 0 && (
                                    <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)', fontWeight: 'bold' }}>
                                        🌸 {flowers[selectedFigure.id]}
                                    </div>
                                )}
                                <button
                                    onClick={() => handleShareFigure(selectedFigure)}
                                    style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '14px', cursor: 'pointer', transition: 'all 0.2s' }}
                                    title="Dinfundir en Redes"
                                >
                                    <Share2 size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Flower Animations Layer */}
            {animatedFlowers.map(f => (
                <div key={f.idx} style={{
                    position: 'fixed',
                    bottom: '-100px',
                    left: f.left,
                    zIndex: 200000,
                    pointerEvents: 'none',
                    animation: `floatFlower 3s ease-out forwards`,
                    animationDelay: `${f.delay}s`
                }}>
                    <img src="/ananuca_flower_3d_icon_1773625751027.png" style={{ height: '80px', filter: 'drop-shadow(0 0 15px rgba(239, 68, 68, 0.6))' }} alt="Añañuca" />
                </div>
            ))}

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&display=swap');
                
                @keyframes floatFlower {
                    0% { transform: translateY(0) rotate(0deg) scale(0.5); opacity: 0; }
                    20% { opacity: 1; transform: translateY(-20vh) rotate(10deg) scale(1.2); }
                    100% { transform: translateY(-110vh) rotate(-20deg) scale(1); opacity: 0; }
                }

                .memorial-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.6);
                    border-color: rgba(255,255,255,0.2) !important;
                }
                ::-webkit-scrollbar { width: 8px; }
                ::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); }
                ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
                ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
            `}</style>
        </div>
    );
}
