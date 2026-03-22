import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Target, TrendingUp, Users, Radio, ShieldCheck, Leaf, Calendar, Lightbulb, Music, Award, X, Play } from 'lucide-react';

export default function Pitch2027({ onClose }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            icon: <Target size={48} color="#38bdf8" />,
            title: "Diapositiva 1: Portada y Visión Global",
            heading: "La Serena al Mundo: Modelo de Eventos de Alto Impacto y Gestión Transparente - Verano 2027",
            subtitle: "Integración cultural, tecnológica y sustentable desde la Región de Coquimbo para todo el continente.",
            content: "Crear espectáculos de clase mundial en la playa de La Serena, combinando artistas internacionales accesibles (Ej: Sophie Ellis-Bextor) con el talento local, bajo un estándar de absoluta transparencia pública y educación cívica impulsada por Vecinos La Serena SpA."
        },
        {
            icon: <TrendingUp size={48} color="#10b981" />,
            title: "Diapositiva 2: El Modelo 'Alto Impacto / Bajo Costo'",
            heading: "Estrategia Artística y Rentabilidad",
            subtitle: "Contratación inteligente de estrellas internacionales de primer nivel, pero en formatos eficientes (ej. DJ Set + Live Vocals).",
            content: "• El Hito 2027: Un concierto masivo en la arena de la playa de La Serena, transformando el borde costero en un escenario de estándar global comparable a grandes festivales internacionales.\n\n• Rentabilidad: Generar un evento 'Ancla' que maximice el retorno de inversión (ROI) para la ciudad en turismo, hotelería y comercio local."
        },
        {
            icon: <Award size={48} color="#f59e0b" />,
            title: "Diapositiva 3: Sponsorización y Atracción de Marcas",
            heading: "Target de Auspiciadores y Retorno",
            subtitle: "Marcas globales aterrizando en Chile (Telecomunicaciones 5G, Automotrices de electromovilidad).",
            content: "• Propuesta de Valor: Asociar su marca no solo a un concierto, sino a un proyecto de innovación social, transparencia municipal y sustentabilidad comunitaria.\n\n• Retorno de Marca: Visibilidad en el escenario físico, en la transmisión digital continental y en toda la campaña previa de participación ciudadana."
        },
        {
            icon: <Music size={48} color="#ec4899" />,
            title: "Diapositiva 4: Fusión Cultural: Talento Local y Repertorio Global",
            heading: "El Festival de Apertura",
            subtitle: "Reversiones del hit mundial ('Murder on the Dancefloor') ejecutadas por agrupaciones de la región.",
            content: "• Diversidad: Integración de más de 400 artistas locales distribuidos en ballets de K-Pop, colectivos de música urbana, orquestas sinfónicas locales y bailes tradicionales.\n\n• Objetivo: Dar vitrina internacional a los artistas de la zona, compartiendo escenario con una estrella global."
        },
        {
            icon: <Users size={48} color="#8b5cf6" />,
            title: "Diapositiva 5: Cobertura y Despliegue Territorial",
            heading: "La Serena como Epicentro Regional",
            subtitle: "Conectando a toda la región a través de la cultura.",
            content: "• Nodos de Participación: Inclusión activa y botones de acceso directo para delegaciones de Vicuña, Andacollo, Punta de Choros, Ovalle, Illapel, Parque Fray Jorge, Algarrobito y Coquimbo.\n\n• Impacto Social: Descentralizar el acceso a espectáculos de primer nivel, invitando a las comunidades del valle y la costa a ser protagonistas del evento."
        },
        {
            icon: <Radio size={48} color="#ef4444" />,
            title: "Diapositiva 6: Ecosistema Tecnológico y Transmisión",
            heading: "Radio Digital Municipal (Radio VLS) y Streaming",
            subtitle: "La columna vertebral de la transmisión oficial (Audio) y formato Multiplataforma.",
            content: "• Anfitriones Virtuales 3D: Uso de personajes locales (Serenito en su diseño humano y cercano, Fariño, Compita, Pampita) como hosts interactivos en pantallas gigantes y redes.\n\n• Proyección Continental: Streaming de alta calidad para exportar la 'Marca La Serena' a todo el mundo."
        },
        {
            icon: <ShieldCheck size={48} color="#14b8a6" />,
            title: "Diapositiva 7: Transparencia Activa y Gestión Pública",
            heading: "Portal de Datos Abiertos y Trazabilidad",
            subtitle: "Publicación en tiempo real de la planificación de eventos de la I. Municipalidad y Vecinos La Serena SpA.",
            content: "• Trazabilidad Total: Visualización de presupuestos, costos de artistas, contrataciones locales y tiempos de ejecución.\n\n• Comunicación Directa: Uso de la mensajería del back-office de la plataforma comunitaria para enviar reportes directos a autoridades y fiscalizadores."
        },
        {
            icon: <Leaf size={48} color="#84cc16" />,
            title: "Diapositiva 8: Estándares Verdes y Educación",
            heading: "Normas Voluntarias de Cuidado Ambiental",
            subtitle: "Implementación de protocolos estrictos de protección de la playa y manejo de residuos.",
            content: "• Educación Ciudadana: Uso de las pantallas del evento y personajes 3D para educar sobre reciclaje y cuidado del ecosistema costero durante el show.\n\n• Legado Sustentable: Demostrar que los grandes eventos masivos pueden ser ecológicamente responsables y dejar el entorno mejor de lo que se encontró."
        },
        {
            icon: <Lightbulb size={48} color="#eab308" />,
            title: "Diapositiva 9: Evaluación y Retroalimentación Ciudadana",
            heading: "Auditoría Social y Métricas de Éxito",
            subtitle: "Implementación de encuestas post-evento mediante la plataforma digital.",
            content: "• Evaluación Transparente: De la experiencia por parte de asistentes, vecinos del sector, artistas y auspiciadores.\n\n• Mejora Continua: Uso de datos recopilados (asistencia, percepción de seguridad, impacto comercial) para perfeccionar eventos del verano 2028 en adelante."
        },
        {
            icon: <Calendar size={48} color="#6366f1" />,
            title: "Diapositiva 10: Carta Gantt y Próximos Pasos",
            heading: "Cronograma Estratégico (Rumbo al 2027)",
            subtitle: "Planificación de ejecución, financiamiento y auditoría.",
            content: "• 2026 Q1/Q2: Cierre de booking internacional, levantamiento de capital con marcas y diseño técnico del escenario en arena.\n\n• 2026 Q3/Q4: Lanzamiento del portal de transparencia, casting de ballets locales para 'Festival de Covers' y educación cívico-ambiental.\n\n• Verano 2027: Ejecución del mega evento, transmisión global y auditoría pública de resultados."
        }
    ];

    const nextSlide = () => {
        if (currentSlide < slides.length - 1) setCurrentSlide(prev => prev + 1);
    };

    const prevSlide = () => {
        if (currentSlide > 0) setCurrentSlide(prev => prev - 1);
    };

    return (
        <div style={{ padding: '2rem 3rem', background: 'rgba(0,0,0,0.4)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {slides[currentSlide].title}
                </span>
                <span style={{ fontSize: '0.9rem', color: 'white', background: 'rgba(255,255,255,0.1)', padding: '0.25rem 0.75rem', borderRadius: '12px' }}>
                    {currentSlide + 1} / {slides.length}
                </span>
            </div>

            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', minHeight: '350px' }}>
                <div style={{ marginBottom: '1.5rem', padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', boxShadow: '0 0 30px rgba(0,0,0,0.5)' }}>
                    {slides[currentSlide].icon}
                </div>
                <h2 style={{ color: 'white', fontSize: '1.8rem', margin: '0 0 1rem 0', lineHeight: '1.3' }}>
                    {slides[currentSlide].heading}
                </h2>
                <h4 style={{ color: 'var(--brand-secondary)', margin: '0 0 1.5rem 0', fontSize: '1.1rem', fontWeight: 'normal' }}>
                    {slides[currentSlide].subtitle}
                </h4>
                <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '1.05rem', maxWidth: '800px', whiteSpace: 'pre-line', textAlign: 'left', background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px' }}>
                    {slides[currentSlide].content}
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem', alignItems: 'center' }}>
                <button
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    className="btn btn-glass"
                    style={{ opacity: currentSlide === 0 ? 0.3 : 1, padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    <ChevronLeft size={20} /> Anterior
                </button>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {slides.map((_, idx) => (
                        <div
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            style={{
                                width: '10px', height: '10px', borderRadius: '50%',
                                background: currentSlide === idx ? 'var(--brand-accent)' : 'rgba(255,255,255,0.2)',
                                cursor: 'pointer', transition: 'all 0.3s'
                            }}
                        />
                    ))}
                </div>
                <button
                    onClick={currentSlide === slides.length - 1 ? onClose : nextSlide}
                    className={currentSlide === slides.length - 1 ? "btn btn-primary pulse" : "btn btn-glass"}
                    style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: currentSlide === slides.length - 1 ? '#10b981' : '' }}
                >
                    {currentSlide === slides.length - 1 ? "Finalizar Presentación" : "Siguiente"} <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
}
