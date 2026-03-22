import React, { useState, useEffect } from 'react';
import { X, Heart, BookOpen, Users, Calendar, MapPin, HandHeart, Sun, Star, Info, Volume2, VolumeX, Eye } from 'lucide-react';

export default function EcumenicalPortalModal({ onClose }) {
    const [activeTab, setActiveTab] = useState('catolica');

    const religions = [
        { id: 'catolica', name: 'Iglesia Católica', icon: <Heart size={18} />, color: '#fcd34d' },
        { id: 'evangelica', name: 'Mundo Evangélico', icon: <BookOpen size={18} />, color: '#38bdf8' },
        { id: 'judia', name: 'Comunidad Judía', icon: <Star size={18} />, color: '#a78bfa' },
        { id: 'islam', name: 'Centro Islámico', icon: <Sun size={18} />, color: '#10b981' },
        { id: 'otras', name: 'Otras Confesiones', icon: <Users size={18} />, color: '#f472b6' }
    ];

    const content = {
        catolica: {
            title: "Arzobispado e Iglesia Católica",
            desc: "Información sobre misas, sacramentos y actividades de la Arquidiócesis de La Serena.",
            activities: [
                { title: "Misa Dominical Catedral", time: "Domingos 10:30 y 12:00 hrs", loc: "Catedral de La Serena" },
                { title: "Comedor Solidario", time: "Lunes a Viernes 13:00 hrs", loc: "Parroquia San José" },
                { title: "Encuentro Jóvenes Católicos", time: "Sábados 17:00 hrs", loc: "Santuario de Schoenstatt" }
            ],
            join: "Para participar en catequesis, coros o voluntariado de Cáritas, acércate a la oficina parroquial más cercana a tu domicilio de martes a viernes."
        },
        evangelica: {
            title: "Concilio de Iglesias Evangélicas y Protestantes",
            desc: "Espacio de unión para las diversas congregaciones evangélicas, pentecostales y bautistas de la comuna.",
            activities: [
                { title: "Culto Unido de Adoración", time: "Domingos 11:00 hrs", loc: "Diversos Templos (Rotativo)" },
                { title: "Estudio Bíblico Comunitario", time: "Miércoles 19:30 hrs", loc: "Plataforma Zoom / Templos Locales" },
                { title: "Acción Social: Ruta Calle", time: "Viernes 21:00 hrs", loc: "Centro de La Serena" }
            ],
            join: "Nuestras puertas están abiertas a cualquier persona. El Concilio agrupa a múltiples iglesias. Asiste a un culto y conversa con los pastores o ujieres al finalizar."
        },
        judia: {
            title: "Comunidad Judía de la Región",
            desc: "Mantenimiento de las tradiciones, festividades y estudios de la Torá.",
            activities: [
                { title: "Kabbalat Shabat", time: "Viernes al atardecer", loc: "Centro Comunitario" },
                { title: "Clases de Hebreo y Cultura", time: "Martes 18:30 hrs", loc: "Sede Regional / Online" },
                { title: "Celebración Festividades (Pesaj, Rosh Hashaná)", time: "Según calendario lunar", loc: "Por confirmar" }
            ],
            join: "Para integrarte a los servicios de Shabat y actividades culturales, por favor contáctanos previamente por correo para coordinar tu visita."
        },
        islam: {
            title: "Comunidad Islámica Regional",
            desc: "Punto de encuentro para la comunidad musulmana, oración y divulgación del Islam.",
            activities: [
                { title: "Oración del Jumu'ah (Viernes)", time: "Viernes 14:00 hrs", loc: "Centro Islámico Región de Coquimbo" },
                { title: "Charlas de Introducción al Islam", time: "Sábados 16:00 hrs", loc: "Centro Islámico" },
                { title: "Iftar Comunitario (En Ramadán)", time: "Al ponerse el sol", loc: "Centro Islámico" }
            ],
            join: "El Centro Islámico está abierto a todo público interesado en conocer la fe. Para asistir al Jumu'ah, recomendamos llegar 15 minutos antes."
        },
        otras: {
            title: "Diversidad de Confesiones",
            desc: "La Serena es hogar de múltiples comunidades de fe como Ortodoxos, Baha'i, Iglesia de Jesucristo de los Santos de los Últimos Días, Adventistas, entre otras.",
            activities: [
                { title: "Reuniones Sacramentales SUD", time: "Domingos 10:00 hrs", loc: "Capillas Locales" },
                { title: "Devocionales Baha'i", time: "1er Domingo de cada mes", loc: "Centros de Encuentro" },
                { title: "Culto Adventista del Séptimo Día", time: "Sábados 11:00 hrs", loc: "Iglesias Adventistas" }
            ],
            join: "La libertad de culto es un pilar de nuestra comuna. Cada una de estas comunidades dispone de canales oficiales para sumar nuevos integrantes y voluntarios."
        }
    };

    const activeData = content[activeTab];
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [highContrast, setHighContrast] = useState(false);

    useEffect(() => {
        return () => {
            if (window.speechSynthesis) window.speechSynthesis.cancel();
        };
    }, []);

    const toggleSpeech = () => {
        if (!window.speechSynthesis) return alert("Tu navegador no soporta lectura por voz.");

        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        } else {
            const textToRead = `${activeData.title}. ${activeData.desc}. Actividades principales: ${activeData.activities.map(a => `${a.title} a las ${a.time} en ${a.loc}`).join('. ')}. Cómo participar: ${activeData.join}`;
            const utterance = new SpeechSynthesisUtterance(textToRead);
            utterance.lang = 'es-CL';
            utterance.rate = 0.9;
            utterance.onend = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
            setIsSpeaking(true);
        }
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: highContrast ? 'rgba(0, 0, 0, 0.98)' : 'rgba(5, 10, 20, 0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(10px)' }}>
            <div className="neocolonial-frame animate-slide-up" style={{ width: '100%', maxWidth: '850px', maxHeight: '90vh', overflowY: 'auto', background: highContrast ? '#000' : 'var(--bg-primary)', padding: '0', border: highContrast ? '2px solid #fff' : 'none' }}>

                {/* Header Navbar */}
                <div style={{ position: 'sticky', top: 0, background: highContrast ? '#111' : 'linear-gradient(135deg, rgba(30, 58, 138, 0.95) 0%, rgba(212, 175, 55, 0.8) 100%)', padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10, borderBottom: highContrast ? '2px solid #fff' : '1px solid rgba(255,255,255,0.2)' }}>
                    <div>
                        <h2 className="serena-title-glow" style={{ margin: 0, fontSize: 'clamp(1.2rem, 4vw, 2rem)', display: 'flex', alignItems: 'center', gap: '0.75rem', textTransform: 'uppercase', color: highContrast ? '#fff' : 'inherit', textShadow: highContrast ? 'none' : undefined }}>
                            <HandHeart size={32} color={highContrast ? "#fff" : "#fcd34d"} />
                            Portal Ecuménico y Espiritual
                        </h2>
                        <p style={{ margin: '0.5rem 0 0 0', color: highContrast ? '#fff' : 'rgba(255,255,255,0.9)', fontSize: '1.1rem', fontWeight: '500' }}>
                            Conectando la diversidad de fe y congregaciones en La Serena.
                        </p>
                    </div>

                    {/* Botones de Accesibilidad */}
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <button onClick={() => { if (isSpeaking) toggleSpeech(); setHighContrast(!highContrast); }} className="btn-glass" style={{ padding: '0.5rem', borderRadius: '50%', background: highContrast ? '#fff' : 'rgba(255,255,255,0.2)' }} title="Modo Alto Contraste">
                            <Eye size={20} color={highContrast ? "#000" : "white"} />
                        </button>
                        <button onClick={toggleSpeech} className="btn-glass" style={{ padding: '0.5rem', borderRadius: '50%', background: isSpeaking ? '#ef4444' : 'rgba(255,255,255,0.2)' }} title={isSpeaking ? "Detener Lectura" : "Escuchar Contenido"}>
                            {isSpeaking ? <VolumeX size={20} color="white" /> : <Volume2 size={20} color="white" />}
                        </button>
                        <div style={{ width: '1px', height: '30px', background: 'rgba(255,255,255,0.3)', margin: '0 0.5rem' }}></div>
                        <button onClick={() => { if (isSpeaking) window.speechSynthesis.cancel(); onClose(); }} className="btn-glass" style={{ padding: '0.5rem', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.5)' }}>
                            <X size={24} color="white" />
                        </button>
                    </div>
                </div>

                <div style={{ padding: '2rem' }}>

                    {/* Mensaje de Tolerancia */}
                    <Info size={24} color="#38bdf8" style={{ marginTop: '0.2rem' }} />
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                        Este espacio garantiza <strong>equidad y respeto</strong> a todas las religiones. Fomentamos la libertad de culto, el diálogo interreligioso y la integración ciudadana a través de las diversas expresiones espirituales presentes en nuestra comuna.
                    </p>
                </div>

                {/* Tabs Desktop & Mobile Scroll */}
                <div style={{ display: 'flex', overflowX: 'auto', gap: '0.5rem', marginBottom: '2rem', paddingBottom: '0.5rem', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                    {religions.map((rel) => (
                        <button
                            key={rel.id}
                            onClick={() => { setActiveTab(rel.id); if (isSpeaking) window.speechSynthesis.cancel(); setIsSpeaking(false); }}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem',
                                borderRadius: '30px', fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: highContrast ? '1.1rem' : '1rem',
                                background: activeTab === rel.id ? (highContrast ? '#fff' : `${rel.color}20`) : (highContrast ? '#000' : 'rgba(255,255,255,0.05)'),
                                color: activeTab === rel.id ? (highContrast ? '#000' : rel.color) : 'white',
                                border: `2px solid ${activeTab === rel.id ? (highContrast ? '#fff' : rel.color) : (highContrast ? '#fff' : 'rgba(255,255,255,0.1)')}`,
                                transition: 'all 0.3s', cursor: 'pointer'
                            }}
                        >
                            {rel.icon} {rel.name}
                        </button>
                    ))}
                </div>

                {/* Contenido Activo */}
                <div className="glass-panel gaudi-curves animate-fade-in" style={{ padding: '2rem', background: highContrast ? '#111' : 'rgba(0,0,0,0.3)', border: highContrast ? '2px solid #fff' : 'none' }}>
                    <h3 style={{ color: highContrast ? '#fff' : 'white', fontSize: highContrast ? '2rem' : '1.6rem', margin: '0 0 0.5rem 0' }}>{activeData.title}</h3>
                    <p style={{ color: highContrast ? '#ccc' : 'var(--text-muted)', fontSize: highContrast ? '1.2rem' : '1.05rem', margin: '0 0 2rem 0', lineHeight: '1.6' }}>{activeData.desc}</p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                        <div style={{ background: highContrast ? '#000' : 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', border: highContrast ? '2px solid #fff' : '1px solid rgba(255,255,255,0.1)' }}>
                            <h4 style={{ color: highContrast ? '#fff' : '#d4af37', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0, fontSize: highContrast ? '1.3rem' : '1.1rem' }}>
                                <Calendar size={20} /> Actividades Públicas
                            </h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {activeData.activities.map((act, i) => (
                                    <li key={i} style={{ borderBottom: (i !== activeData.activities.length - 1) ? (highContrast ? '1px solid #fff' : '1px solid rgba(255,255,255,0.05)') : 'none', paddingBottom: i !== activeData.activities.length - 1 ? '0.5rem' : 0 }}>
                                        <strong style={{ color: 'white', display: 'block', fontSize: highContrast ? '1.1rem' : '1rem' }}>{act.title}</strong>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: highContrast ? '#ccc' : 'var(--text-secondary)', fontSize: highContrast ? '1rem' : '0.85rem', marginTop: '0.3rem' }}>
                                            <Calendar size={14} /> {act.time}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: highContrast ? '#ccc' : 'var(--text-secondary)', fontSize: highContrast ? '1rem' : '0.85rem', marginTop: '0.2rem' }}>
                                            <MapPin size={14} /> {act.loc}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div style={{ background: highContrast ? '#000' : 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', border: highContrast ? '2px solid #fff' : '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column' }}>
                            <h4 style={{ color: highContrast ? '#fff' : '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0, fontSize: highContrast ? '1.3rem' : '1.1rem' }}>
                                <Users size={20} /> Formas de Integración
                            </h4>
                            <p style={{ color: highContrast ? '#ccc' : 'var(--text-secondary)', fontSize: highContrast ? '1.2rem' : '0.95rem', lineHeight: '1.6', flex: 1 }}>
                                {activeData.join}
                            </p>
                            <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', background: highContrast ? '#fff' : 'var(--brand-primary)', color: highContrast ? '#000' : 'white', fontWeight: 'bold' }}>Contactar Comunidad</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
