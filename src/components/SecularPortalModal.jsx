import React, { useState, useEffect } from 'react';
import { X, Globe, Users, Book, Leaf, MapPin, Calendar, Lightbulb, Coffee, Settings, Info, Volume2, VolumeX, Eye } from 'lucide-react';

export default function SecularPortalModal({ onClose }) {
    const [activeTab, setActiveTab] = useState('libre');

    const secularGroups = [
        { id: 'libre', name: 'Librepensamiento', icon: <Lightbulb size={18} />, color: '#fbbf24' },
        { id: 'voluntariado', name: 'Ayuda Cívica', icon: <Users size={18} />, color: '#3b82f6' },
        { id: 'bienestar', name: 'Bienestar / Meditación', icon: <Leaf size={18} />, color: '#10b981' },
        { id: 'clubes', name: 'Clubes de Encuentro', icon: <Coffee size={18} />, color: '#f43f5e' },
        { id: 'logias', name: 'Agrupaciones Filosóficas', icon: <Settings size={18} />, color: '#a855f7' }
    ];

    const content = {
        libre: {
            title: "Círculos de Librepensamiento y Humanismo Secular",
            desc: "Agrupaciones ciudadanas orientadas al debate racional, la promoción del método científico y la ética secular.",
            activities: [
                { title: "Café Filosófico Semanal", time: "Jueves 19:00 hrs", loc: "Centro Cultural Santa Inés" },
                { title: "Charlas de Divulgación Científica", time: "2do Viernes de cada mes", loc: "Universidad de La Serena" },
                { title: "Mesa de Debate Ciudadano", time: "Miércoles 18:00 hrs", loc: "Biblioteca Regional Gabriela Mistral" }
            ],
            join: "La participación está abierta a todo ciudadano interesado en el pensamiento crítico y el humanismo secular. Para sumarte al Café Filosófico, simplemente preséntate en el horario indicado."
        },
        voluntariado: {
            title: "Cuerpo de Voluntariado Cívico y Social",
            desc: "Instituciones de ayuda desinteresada y servicio público (Bomberos, juntas de vecinos, ONGs medioambientales).",
            activities: [
                { title: "Reunión Juntas de Vecinos", time: "1er Sábado del mes 16:00 hrs", loc: "Sedes Vecinales Distribuidas" },
                { title: "Academia de Bomberos", time: "Ver cronograma en cuarteles", loc: "Compañías Cuerpos de Bomberos" },
                { title: "Limpieza de Playas (Eco-ONG)", time: "Domingos 09:30 hrs", loc: "Faro Monumental - Av del Mar" }
            ],
            join: "El voluntariado social requiere compromiso y constancia. Acércate a la unidad o institución más cercana (Cruz Roja, Bomberos, Defensa Civil) para postular e iniciar capacitación técnica y cívica."
        },
        bienestar: {
            title: "Agrupaciones de Meditación Laica y Mindfulness",
            desc: "Organizaciones enfocadas en el desarrollo personal, autoconocimiento, yoga integral y mindfulness sin afiliación religiosa.",
            activities: [
                { title: "Yoga Comunitario Gratuito", time: "Sábados 09:00 hrs", loc: "Parque Japonés / Espejo de Agua" },
                { title: "Círculo de Meditación Zen", time: "Martes y Jueves 19:30 hrs", loc: "Centro de Terapias Integrales" },
                { title: "Taller Práctico de Mindfulness", time: "Lunes 18:00 hrs", loc: "Salón Desarrollo Social Municipal" }
            ],
            join: "Cualquier persona de La Serena puede unirse, llevando ropa cómoda y mat de yoga (o similar). La contribución comunitaria está enfocada en el bienestar físico y psicológico."
        },
        clubes: {
            title: "Clubes de Rotary, Leones y Centros de Encuentro",
            desc: "Agrupaciones filantrópicas y redes de contacto cívicas que impulsan proyectos sociales y desarrollo equitativo en la comuna.",
            activities: [
                { title: "Sesion Rotary Club La Serena", time: "Martes 20:30 hrs", loc: "Sede Club Rotary Centro" },
                { title: "Encuentro Club de Leones", time: "Jueves 20:00 hrs", loc: "Casino / Salón Hotel Local" },
                { title: "Círculo de Adulto Mayor", time: "Lunes y Miércoles 16:00 hrs", loc: "Centros Diurnos Municipales" }
            ],
            join: "La integración a estas organizaciones sigue procesos internos donde usualmente se requiere padrinazgo cívico previo o asistencia inicial a sesiones abiertas lideradas por sus presidentes o coordinadores locales."
        },
        logias: {
            title: "Logias y Centros de Estudio Filosófico-Cultural",
            desc: "Espacios de formación de valores éticos, fraternidad y reflexión tradicional, histórica y constructiva.",
            activities: [
                { title: "Ceremonial Cívico y Homenajes", time: "Efemérides Patrias", loc: "Plaza de Armas / Colegios Perpendiculares" },
                { title: "Conversatorios de Historia Local", time: "Último sábado de mes 18:00 hrs", loc: "Casa Masónica de La Serena" },
                { title: "Actividad Cultural Abierta", time: "Anualmente (Día de los Patrimonios)", loc: "Templos Históricos y Culturales" }
            ],
            join: "Su asistencia directa generalmente responde al interés filosófico de libre elección y en diversos grados. Existen canales orgánicos y públicos para el diálogo y postulación que mantienen vigentes en sus normativas internas."
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
                <div style={{ position: 'sticky', top: 0, background: highContrast ? '#111' : 'linear-gradient(135deg, rgba(30, 58, 138, 0.95) 0%, rgba(16, 185, 129, 0.8) 100%)', padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10, borderBottom: highContrast ? '2px solid #fff' : '1px solid rgba(255,255,255,0.2)' }}>
                    <div>
                        <h2 className="serena-title-glow" style={{ margin: 0, fontSize: 'clamp(1.2rem, 4vw, 2rem)', display: 'flex', alignItems: 'center', gap: '0.75rem', textTransform: 'uppercase', color: highContrast ? '#fff' : 'inherit', textShadow: highContrast ? 'none' : undefined }}>
                            <Globe size={32} color={highContrast ? "#fff" : "#10b981"} />
                            Portal Cívico y Laico
                        </h2>
                        <p style={{ margin: '0.5rem 0 0 0', color: highContrast ? '#fff' : 'rgba(255,255,255,0.9)', fontSize: '1.1rem', fontWeight: '500' }}>
                            Espacios de encuentro, acción social y pensamiento libre en La Serena.
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

                    {/* Mensaje de Tolerancia Cívica */}
                    <div style={{ background: 'rgba(16, 185, 129, 0.1)', borderLeft: '4px solid #10b981', padding: '1rem 1.5rem', borderRadius: '8px', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <Info size={24} color="#10b981" style={{ marginTop: '0.2rem' }} />
                        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                            La plataforma asegura una <strong>representación completamente equitativa</strong>. Integramos los puntos de encuentro formativos, filosóficos, solidarios y de libre pensamiento de orden civil no confesional, que conforman la rica estructura social e histórica de la ciudad.
                        </p>
                    </div>

                    {/* Tabs Desktop & Mobile Scroll */}
                    <div style={{ display: 'flex', overflowX: 'auto', gap: '0.5rem', marginBottom: '2rem', paddingBottom: '0.5rem', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                        {secularGroups.map((group) => (
                            <button
                                key={group.id}
                                onClick={() => { setActiveTab(group.id); if (isSpeaking) window.speechSynthesis.cancel(); setIsSpeaking(false); }}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem',
                                    borderRadius: '30px', fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: highContrast ? '1.1rem' : '1rem',
                                    background: activeTab === group.id ? (highContrast ? '#fff' : `${group.color}20`) : (highContrast ? '#000' : 'rgba(255,255,255,0.05)'),
                                    color: activeTab === group.id ? (highContrast ? '#000' : group.color) : 'white',
                                    border: `2px solid ${activeTab === group.id ? (highContrast ? '#fff' : group.color) : (highContrast ? '#fff' : 'rgba(255,255,255,0.1)')}`,
                                    transition: 'all 0.3s', cursor: 'pointer'
                                }}
                            >
                                {group.icon} {group.name}
                            </button>
                        ))}
                    </div>

                    {/* Contenido Activo */}
                    <div className="glass-panel gaudi-curves animate-fade-in" style={{ padding: '2rem', background: highContrast ? '#111' : 'rgba(0,0,0,0.3)', border: highContrast ? '2px solid #fff' : 'none' }}>
                        <h3 style={{ color: highContrast ? '#fff' : 'white', fontSize: highContrast ? '2rem' : '1.6rem', margin: '0 0 0.5rem 0' }}>{activeData.title}</h3>
                        <p style={{ color: highContrast ? '#ccc' : 'var(--text-muted)', fontSize: highContrast ? '1.2rem' : '1.05rem', margin: '0 0 2rem 0', lineHeight: '1.6' }}>{activeData.desc}</p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                            <div style={{ background: highContrast ? '#000' : 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', border: highContrast ? '2px solid #fff' : '1px solid rgba(255,255,255,0.1)' }}>
                                <h4 style={{ color: highContrast ? '#fff' : '#fbbf24', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0, fontSize: highContrast ? '1.3rem' : '1.1rem' }}>
                                    <Calendar size={20} /> Encuentros y Sesiones
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
                                <h4 style={{ color: highContrast ? '#fff' : '#3b82f6', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0, fontSize: highContrast ? '1.3rem' : '1.1rem' }}>
                                    <Users size={20} /> Participación y Membresía
                                </h4>
                                <p style={{ color: highContrast ? '#ccc' : 'var(--text-secondary)', fontSize: highContrast ? '1.2rem' : '0.95rem', lineHeight: '1.6', flex: 1 }}>
                                    {activeData.join}
                                </p>
                                <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', background: highContrast ? '#fff' : '#3b82f6', color: highContrast ? '#000' : 'white', fontWeight: 'bold' }}>Contactar Agrupación</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
