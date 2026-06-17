import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Star, Users, MapPin, Building, Heart, BookOpen,
    Youtube, Map, TrendingUp, DollarSign, ChevronLeft, ChevronRight,
    Award, Target, Zap, Globe, PawPrint, Camera, Maximize, Minimize,
    Download, CheckCircle2, Megaphone, ShoppingBag, Calendar
} from 'lucide-react';

const models = [
    {
        id: 1, emoji: '🏆', icon: Building, title: 'Empresas Patrocinadoras', subtitle: 'Sponsorship Permanente',
        color: '#f59e0b', stars: 5, potential: '$1M – $2M / mes',
        desc: 'Vecinos La Serena cuenta con más de 60.000 personas interesadas en el desarrollo, historia y actualidad de la ciudad. Buscamos socios estratégicos que permitan sostener este medio ciudadano independiente.',
        tiers: [
            { name: 'Bronce', price: '$150.000/mes', perks: 'Logo en portada, mención semanal', color: '#cd7f32' },
            { name: 'Plata', price: '$300.000/mes', perks: 'Banner en portada, post mensual dedicado', color: '#94a3b8' },
            { name: 'Oro', price: '$500.000/mes', perks: 'Co-branding exclusivo, acceso a métricas', color: '#f59e0b' }
        ],
        targets: ['Constructoras locales', 'Clínicas / Centros médicos', 'Inmobiliarias', 'Universidades', 'Centros comerciales', 'Empresas de energía', 'Empresas sanitarias', 'Automotoras', 'Cámaras de Comercio', 'Turismo regional'],
        detail: 'Con solo 5 patrocinadores promedio se generan entre $1.000.000 y $2.000.000 mensuales en ingresos recurrentes predecibles.'
    },
    {
        id: 2, emoji: '🔧', icon: MapPin, title: 'Directorio Local de Servicios', subtitle: 'Vecinos Servicios',
        color: '#10b981', stars: 5, potential: '$2M – $5M / mes',
        desc: 'Un directorio digital premium de profesionales y servicios locales. Los proveedores pagan por visibilidad destacada, la comunidad recibe un servicio real y confiable.',
        tiers: [
            { name: 'Perfil Básico', price: '$20.000/mes', perks: 'Listado estándar, contacto directo', color: '#94a3b8' },
            { name: 'Perfil Destacado', price: '$35.000/mes', perks: 'Foto + reseñas + posición prioritaria', color: '#10b981' },
            { name: 'Perfil Premium', price: '$50.000/mes', perks: 'Página propia + analytics + leads', color: '#38bdf8' }
        ],
        targets: ['Gasfíteres', 'Electricistas', 'Arquitectos', 'Maestros', 'Veterinarios', 'Abogados', 'Psicólogos', 'Dentistas', 'Corredores de propiedades'],
        detail: 'Con 100 avisadores activos se generan entre $2.000.000 y $5.000.000 mensuales, prestando un servicio genuinamente útil a la comunidad.'
    },
    {
        id: 3, emoji: '🐾', icon: PawPrint, title: 'Vecinos Mascotas', subtitle: 'Mercado Pet Regional',
        color: '#ec4899', stars: 4, potential: '$500K – $1.5M / mes',
        desc: 'La comunidad pet de La Serena es enorme y activa. Mascotas perdidas, adopciones, veterinarios recomendados y hoteles para mascotas generan engagement orgánico y patrocinios premium.',
        tiers: [
            { name: 'Clínicas Vet.', price: '$80.000/mes', perks: 'Sponsor sección mascotas perdidas', color: '#ec4899' },
            { name: 'Pet Shops', price: '$50.000/mes', perks: 'Menciones en posts, banner', color: '#a855f7' },
            { name: 'Paseadores', price: '$20.000/mes', perks: 'Perfil en directorio pets', color: '#38bdf8' }
        ],
        targets: ['Clínicas veterinarias', 'Tiendas pet', 'Alimentos para mascotas', 'Paseadores', 'Hoteles para mascotas', 'Farmacias veterinarias'],
        detail: 'El mercado pet en Chile mueve enormes recursos. La segmentación local permite tarifas premium y alta tasa de conversión.'
    },
    {
        id: 4, emoji: '💎', icon: Star, title: 'Club Vecinos', subtitle: 'Membresía Premium',
        color: '#8b5cf6', stars: 5, potential: '$1.5M / mes (500 socios)',
        desc: 'Modelo tipo suscripción mensual con beneficios exclusivos: sorteos, descuentos en comercios locales, acceso anticipado a contenido histórico, charlas y rutas patrimoniales.',
        tiers: [
            { name: 'Socio Regular', price: '$2.990/mes', perks: 'Sorteos + descuentos básicos', color: '#8b5cf6' },
            { name: 'Socio Premium', price: '$5.990/mes', perks: 'Todo lo anterior + acceso rutas + charlas', color: '#a855f7' },
            { name: 'Socio Fundador', price: '$9.990/mes', perks: 'Todo + reconocimiento perpetuo + merchandise', color: '#ec4899' }
        ],
        targets: ['Serenenses con identidad local fuerte', 'Ex serenenses en Santiago y exterior', 'Familias con niños', 'Adultos mayores activos'],
        detail: '500 socios × $2.990 = $1.495.000 mensuales recurrentes. Con 1.000 socios se supera fácilmente el millón y medio mensual con estructura mínima.'
    },
    {
        id: 5, emoji: '🏛️', icon: Map, title: 'Rutas Patrimoniales', subtitle: 'Turismo Ciudadano',
        color: '#38bdf8', stars: 5, potential: '$300K – $450K / recorrido',
        desc: 'La Serena tiene un patrimonio histórico extraordinario. Rutas guiadas por el casco histórico, iglesias, Barrio Inglés, Faro Monumental, Av. Francisco de Aguirre y Cementerio histórico.',
        tiers: [
            { name: 'Ruta Básica', price: '$10.000/persona', perks: 'Ruta a pie 2 hrs, guía especializado', color: '#38bdf8' },
            { name: 'Ruta Premium', price: '$15.000/persona', perks: 'Ruta extendida + material digital', color: '#10b981' },
            { name: 'Ruta Privada', price: '$200.000/grupo', perks: 'Ruta exclusiva para empresas y colegios', color: '#f59e0b' }
        ],
        targets: ['Turistas nacionales', 'Turistas internacionales', 'Colegios de la región', 'Empresas (team building)', 'Hoteles como actividad opcional'],
        detail: '30 personas × $10.000 = $300.000 por recorrido. Con 2 rutas semanales se proyectan $2.4M mensuales en ingresos por turismo patrimonial.'
    },
    {
        id: 6, emoji: '📚', icon: BookOpen, title: 'Libros y Colecciones', subtitle: 'Editorial Histórica Local',
        color: '#d4af37', stars: 4, potential: '$500K – $2M / lanzamiento',
        desc: '"La Serena que ya no existe" con fotografías antiguas. Calendarios, postales, láminas, mapas históricos, cuadros. Muchos serenenses y ex serenenses comprarían por nostalgia.',
        tiers: [
            { name: 'Libro Físico', price: '$15.000 – 25.000', perks: 'Edición numerada, fotografías restauradas', color: '#d4af37' },
            { name: 'Calendario', price: '$8.000', perks: 'Fotografías históricas con contexto', color: '#f59e0b' },
            { name: 'Pack Colección', price: '$45.000', perks: 'Libro + calendario + láminas + postales', color: '#ec4899' }
        ],
        targets: ['Serenenses en todo Chile', 'Ex serenenses en el extranjero', 'Bibliotecas y colegios', 'Hoteles y museos', 'Negocios locales (regalo institucional)'],
        detail: 'Una tirada de 500 unidades a $20.000 genera $10.000.000. El crowdfunding previo garantiza la demanda antes de imprimir.'
    },
    {
        id: 7, emoji: '▶️', icon: Youtube, title: 'Canal de YouTube', subtitle: 'Contenido Histórico en Serie',
        color: '#ef4444', stars: 4, potential: '$300K – $800K / mes',
        desc: 'Series documentales: Historias de barrios, Personajes olvidados, Antes y después de La Serena, Misterios y leyendas regionales, Entrevistas a vecinos históricos.',
        tiers: [
            { name: 'Ad Revenue', price: 'Variable', perks: 'Monetización automática YouTube', color: '#ef4444' },
            { name: 'Sponsor por video', price: '$50.000 – 150.000', perks: 'Mención 30 seg al inicio del video', color: '#f59e0b' },
            { name: 'Membresía YT', price: '$2.500 – 5.000/mes', perks: 'Contenido exclusivo para miembros', color: '#10b981' }
        ],
        targets: ['Canales de turismo regional', 'Municipios', 'Empresas de patrimonio', 'Diáspora chilena en el exterior'],
        detail: 'La biblioteca de Vecinos ya tiene el material base. Un canal con 10.000 suscriptores genera entre $300.000 y $800.000 mensuales.'
    },
    {
        id: 8, emoji: '🤝', icon: Heart, title: 'Fondo de Apoyo Ciudadano', subtitle: 'Amigos de Vecinos La Serena',
        color: '#06b6d4', stars: 3, potential: '$300K – $700K / mes',
        desc: 'Aportes voluntarios de personas que sienten el proyecto como propio. Un modelo de sostenibilidad ciudadana puro, sin publicidad invasiva.',
        tiers: [
            { name: 'Apoyo Básico', price: '$1.000/mes', perks: 'Reconocimiento en RRSS mensual', color: '#06b6d4' },
            { name: 'Apoyo Amigo', price: '$3.000/mes', perks: 'Sticker digital + mención especial', color: '#38bdf8' },
            { name: 'Apoyo Solidario', price: '$5.000/mes', perks: 'Todo anterior + acceso anticipado contenido', color: '#10b981' }
        ],
        targets: ['Serenenses con identidad fuerte', 'Empresas en RSE (pequeña contribución)', 'Organismos de la sociedad civil'],
        detail: '200 aportantes × $3.000 = $600.000 mensuales. Es el modelo más puro de sostenibilidad comunitaria independiente.'
    },
    {
        id: 9, emoji: '🤖', icon: Camera, title: 'IA + Historia', subtitle: 'La Serena en el Tiempo con IA',
        color: '#a855f7', stars: 5, potential: '$1M – $5M / año',
        desc: 'Imágenes históricas recreadas con IA: La Serena en 1900, el Faro en distintas épocas, Gabriela Mistral caminando por la ciudad. Reconstrucciones fotorrealistas de edificios desaparecidos.',
        tiers: [
            { name: 'Print Premium', price: '$25.000 – 80.000', perks: 'Lámina impresa en alta resolución', color: '#8b5cf6' },
            { name: 'Colección Digital', price: '$5.000 – 50.000', perks: 'NFT histórico certificado', color: '#a855f7' },
            { name: 'Licencia Comercial', price: '$200.000+', perks: 'Uso para libros, museos, hoteles, SERNATUR', color: '#ec4899' }
        ],
        targets: ['Museos y centros culturales', 'Hoteles boutique', 'Editoriales', 'Gobierno Regional', 'SERNATUR / Turismo Chile'],
        detail: 'La IA generativa permite crear contenido histórico a bajo costo con altísimo valor emocional. Vecinos La Serena ya tiene el archivo fotográfico base.'
    },
    {
        id: 10, emoji: '📡', icon: Megaphone, title: 'Agencia de Difusión Regional', subtitle: 'La Voz Digital de La Serena',
        color: '#00ffcc', stars: 5, potential: '$1M – $3M / mes',
        desc: 'Con la comunidad que ya tiene, puede transformarse en "La voz digital de La Serena". Municipios, corporaciones culturales, universidades y empresas necesitan permanentemente llegar a públicos locales.',
        tiers: [
            { name: 'Difusión Básica', price: '$80.000/campaña', perks: 'Post + story en todas las RRSS', color: '#00ffcc' },
            { name: 'Campaña Completa', price: '$250.000/mes', perks: 'Cobertura de evento + difusión + reels', color: '#10b981' },
            { name: 'Partner Estratégico', price: '$500.000/mes', perks: 'Agencia dedicada, analytics mensuales', color: '#38bdf8' }
        ],
        targets: ['Municipios de la región', 'Corporaciones culturales', 'Universidades locales', 'Empresas con eventos', 'Organizaciones de turismo'],
        detail: 'La ventaja competitiva es insuperable: ninguna agencia de marketing regional tiene 60.000 seguidores orgánicos locales. Es el activo más escaso del mercado regional.'
    },
    {
        id: 11, emoji: '🌐', icon: Globe, title: 'Estrategia Digital Cruzada', subtitle: 'Ad Network Vecinal',
        color: '#14b8a6', stars: 5, potential: '$2M – $6M / mes',
        desc: 'Venta de espacios publicitarios, banners nativos y publirreportajes cruzados a través del ecosistema completo: portal vecinoslaserena.cl, red aliada entrevecinas.cl y todas las redes sociales comunitarias.',
        tiers: [
            { name: 'Display Básico', price: '$150.000/mes', perks: 'Banners rotativos en ambos portales', color: '#94a3b8' },
            { name: 'Cobertura Total', price: '$400.000/mes', perks: 'Publirreportaje SEO + Banner fijo + Posts RRSS', color: '#14b8a6' },
            { name: 'Auspicio de Sección', price: '$800.000/mes', perks: 'Patrocinio exclusivo de módulos (ej. Transparencia, Paseo 3D)', color: '#f59e0b' }
        ],
        targets: ['Inmobiliarias', 'Constructoras', 'Retail regional', 'Universidades', 'Empresas de telecomunicaciones'],
        detail: 'Combinar el tráfico SEO de las webs con el alcance viral en RRSS crea el circuito de pauta digital más poderoso de la región.'
    }
];

const plan12Meses = [
    { mes: 'Mes 1–2', accion: 'Conseguir 5 patrocinadores fundadores Oro/Plata', icon: Building, color: '#f59e0b' },
    { mes: 'Mes 2–3', accion: 'Lanzar Directorio Vecinos Servicios (50 perfiles iniciales)', icon: MapPin, color: '#10b981' },
    { mes: 'Mes 3', accion: 'Crear página separada Vecinos Mascotas La Serena', icon: PawPrint, color: '#ec4899' },
    { mes: 'Mes 4', accion: 'Lanzar Club Vecinos con 100 socios fundadores', icon: Star, color: '#8b5cf6' },
    { mes: 'Mes 5', accion: 'Primer recorrido patrimonial piloto (30 personas)', icon: Map, color: '#38bdf8' },
    { mes: 'Mes 6', accion: 'Publicar primer libro digital "La Serena que ya no existe"', icon: BookOpen, color: '#d4af37' },
    { mes: 'Mes 7', accion: 'Abrir canal YouTube + primeras 4 series históricas', icon: Youtube, color: '#ef4444' },
    { mes: 'Mes 8', accion: 'Lanzar colección IA + Historia (20 imágenes restauradas)', icon: Camera, color: '#a855f7' },
    { mes: 'Mes 9–10', accion: 'Formalizar Agencia de Difusión Regional (primeros 3 clientes)', icon: Megaphone, color: '#00ffcc' },
    { mes: 'Mes 11–12', accion: 'Activar Fondo Ciudadano + evaluar Serie A / escalabilidad', icon: TrendingUp, color: '#06b6d4' }
];

export default function VLSPitchInversores({ onClose }) {
    const [activeModel, setActiveModel] = useState(0);
    const [activePage, setActivePage] = useState('contexto'); // 'contexto' | 'modelos' | 'plan'
    const [isFullscreen, setIsFullscreen] = useState(false);
    const printRef = useRef(null);
    const model = models[activeModel];

    const fmtCLP = (n) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(n);

    const handlePrint = () => {
        const style = document.createElement('style');
        style.id = 'vls-pitch-print-style';
        style.textContent = `
            @media print {
                * {
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                    color-adjust: exact !important;
                }
                body > *:not(#vls-pitch-print-root) { display: none !important; }
                #vls-pitch-print-root { 
                    position: absolute !important; inset: 0 !important; 
                    background: #020617 !important; 
                    color: white !important;
                    font-family: 'Inter', Arial, sans-serif !important;
                    overflow: visible !important;
                }
                .no-print { display: none !important; }
                .pitch-model-card, .pitch-tier-card { page-break-inside: avoid; }
                .pitch-page { page-break-after: always; }
                @page { margin: 1cm; size: A4 portrait; }
            }
        `;
        document.head.appendChild(style);
        const el = document.getElementById('vls-pitch-print-root');
        if (el) el.style.overflow = 'visible';
        window.print();
        setTimeout(() => {
            const s = document.getElementById('vls-pitch-print-style');
            if (s) s.remove();
            if (el) el.style.overflow = '';
        }, 1000);
    };

    return createPortal(
        <div id="vls-pitch-print-root" style={{
            position: 'fixed', inset: 0, zIndex: 2147483647,
            background: '#020617',
            display: 'flex', flexDirection: 'column',
            fontFamily: "'Inter', system-ui, sans-serif",
            color: 'white',
            overflow: 'hidden'
        }}>
            {/* ─── ESTILOS IMPRESIÓN ─── */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');
                #vls-pitch-print-root * { box-sizing: border-box; }
                .vls-pitch-scroll::-webkit-scrollbar { width: 6px; }
                .vls-pitch-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
                .vls-pitch-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
                @media print {
                    #vls-pitch-print-root { background: #020617 !important; color: white !important; overflow: visible !important; position: relative !important; }
                    .vls-pitch-scroll { overflow: visible !important; max-height: none !important; }
                    .pitch-sidebar { display: none !important; }
                    .pitch-header-controls { display: none !important; }
                    .pitch-nav-btn { display: none !important; }
                    .pitch-print-content { background: #020617 !important; color: white !important; padding: 0 !important; }
                    .pitch-kpi-bar { display: none !important; }
                    .pitch-footer { display: none !important; }
                    .pitch-all-models { display: flex; flex-direction: column; gap: 2rem; }
                }
            `}</style>

            {/* ─── HEADER ─── */}
            <div className="no-print" style={{
                padding: '1rem 1.5rem',
                background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)',
                borderBottom: '1px solid rgba(56,189,248,0.25)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                flexShrink: 0, gap: '1rem', flexWrap: 'wrap'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ background: 'linear-gradient(135deg, #f59e0b, #ec4899)', padding: '9px', borderRadius: '12px' }}>
                        <TrendingUp size={22} color="white" />
                    </div>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '900', color: 'white', letterSpacing: '1px' }}>
                            VECINOS LA SERENA · PITCH INVERSORES 2026
                        </h1>
                        <p style={{ margin: 0, fontSize: '0.68rem', color: '#94a3b8', letterSpacing: '2px' }}>
                            10 MODELOS DE MONETIZACIÓN · +60.000 SEGUIDORES ORGÁNICOS · PLAN 12 MESES
                        </p>
                    </div>
                </div>
                <div className="pitch-header-controls" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {/* Nav Tabs */}
                    {['contexto', 'modelos', 'plan'].map(p => (
                        <button key={p} onClick={() => setActivePage(p)} style={{
                            background: activePage === p ? 'rgba(56,189,248,0.2)' : 'transparent',
                            border: activePage === p ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.1)',
                            color: activePage === p ? '#38bdf8' : '#94a3b8',
                            padding: '6px 14px', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.78rem'
                        }}>
                            {p === 'contexto' ? '📖 Contexto' : p === 'modelos' ? '💼 11 Modelos' : '📅 Roadmap'}
                        </button>
                    ))}
                    <button onClick={handlePrint} style={{
                        background: 'linear-gradient(135deg, #10b981, #38bdf8)',
                        border: 'none', color: '#0f172a', padding: '7px 16px', borderRadius: '50px',
                        cursor: 'pointer', fontWeight: '900', fontSize: '0.78rem',
                        display: 'flex', alignItems: 'center', gap: '6px'
                    }}>
                        <Download size={15} /> Descargar PDF
                    </button>
                    <button onClick={() => setIsFullscreen(!isFullscreen)} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', width: '34px', height: '34px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
                    </button>
                    <button onClick={onClose} style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', color: '#ef4444', width: '34px', height: '34px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <X size={18} />
                    </button>
                </div>
            </div>

            {/* ─── KPI BAR ─── */}
            <div className="pitch-kpi-bar no-print" style={{
                padding: '0.75rem 1.5rem',
                background: 'rgba(0,0,0,0.5)',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                display: 'flex', gap: '1rem', overflowX: 'auto', flexShrink: 0
            }}>
                {[
                    { label: 'Seguidores Org.', value: '60.000+', color: '#38bdf8', icon: Users },
                    { label: 'Pot. Mensual Bajo', value: '$6.2M', color: '#10b981', icon: DollarSign },
                    { label: 'Pot. Mensual Alto', value: '$15.5M', color: '#f59e0b', icon: TrendingUp },
                    { label: 'Modelos Activos', value: '10', color: '#a855f7', icon: Target },
                    { label: 'Años Audiencia', value: '10+ años', color: '#ec4899', icon: Award },
                    { label: 'Horizonte Meta', value: '2–3 años', color: '#06b6d4', icon: Calendar },
                ].map(kpi => (
                    <div key={kpi.label} style={{
                        flexShrink: 0,
                        background: `linear-gradient(135deg, ${kpi.color}15, rgba(0,0,0,0.5))`,
                        border: `1px solid ${kpi.color}30`,
                        padding: '0.6rem 1.1rem',
                        borderRadius: '10px', minWidth: '130px'
                    }}>
                        <kpi.icon size={14} color={kpi.color} style={{ marginBottom: '3px' }} />
                        <div style={{ fontSize: '1.05rem', fontWeight: '900', color: 'white' }}>{kpi.value}</div>
                        <div style={{ fontSize: '0.62rem', color: '#94a3b8', letterSpacing: '1px' }}>{kpi.label.toUpperCase()}</div>
                    </div>
                ))}
            </div>

            {/* ─── BODY ─── */}
            {activePage === 'contexto' ? (
                /* ─── CONTEXTO DEL PROYECTO ─── */
                <div className="vls-pitch-scroll pitch-page" style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
                    <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ background: 'linear-gradient(135deg, #10b981, #38bdf8)', display: 'inline-flex', padding: '1rem', borderRadius: '50%', marginBottom: '1rem', boxShadow: '0 0 30px rgba(16,185,129,0.3)' }}>
                                <Globe size={36} color="white" />
                            </div>
                            <h2 style={{ margin: 0, fontSize: '2.5rem', fontWeight: '900', color: 'white' }}>El Medio Ciudadano de La Serena</h2>
                            <p style={{ margin: '0.5rem 0 0', color: '#38bdf8', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                +60.000 Seguidores Orgánicos. 100% Audiencia Hiperlocal.
                            </p>
                        </div>
                        
                        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '22px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <h3 style={{ color: '#f59e0b', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 10px' }}>
                                    <Star size={20} /> Audiencia Cautiva y Leal
                                </h3>
                                <p style={{ margin: 0, color: '#cbd5e1', lineHeight: '1.6' }}>
                                    Conseguir 60.000 seguidores orgánicos reales en una ciudad como La Serena no es fácil. Muchas empresas regionales invierten millones en marketing y no logran generar ni una fracción del nivel de interacción e identidad que ha consolidado <strong>Vecinos La Serena</strong> durante la última década.
                                </p>
                            </div>
                            <div>
                                <h3 style={{ color: '#10b981', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 10px' }}>
                                    <TrendingUp size={20} /> De Fanpage a Smart City Platform
                                </h3>
                                <p style={{ margin: 0, color: '#cbd5e1', lineHeight: '1.6' }}>
                                    El desafío actual ya no es conseguir seguidores. El desafío es transformar la comunidad en un modelo sostenible de ingresos recurrentes, evolucionando hacia un hub interactivo que integre a ciudadanos, comercios, y herramientas tecnológicas bajo un solo ecosistema confiable y transparente.
                                </p>
                            </div>
                            <div>
                                <h3 style={{ color: '#ec4899', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 10px' }}>
                                    <Target size={20} /> Ecosistema Web (vecinoslaserena.cl + entrevecinas.cl)
                                </h3>
                                <p style={{ margin: 0, color: '#cbd5e1', lineHeight: '1.6' }}>
                                    Al unificar las propiedades digitales con las redes sociales orgánicas, la plataforma ofrece a los inversionistas y auspiciadores regionales un canal de difusión único, ineludible y de altísimo prestigio para llegar directamente al consumidor serenense.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : activePage === 'modelos' ? (
                <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

                    {/* Sidebar */}
                    <div className="pitch-sidebar no-print" style={{
                        width: '230px', flexShrink: 0,
                        background: 'rgba(0,0,0,0.5)', borderRight: '1px solid rgba(255,255,255,0.06)',
                        overflowY: 'auto', padding: '0.75rem',
                        display: 'flex', flexDirection: 'column', gap: '4px'
                    }}>
                        <div style={{ fontSize: '0.6rem', color: '#64748b', letterSpacing: '2px', fontWeight: 'bold', marginBottom: '6px', paddingLeft: '6px' }}>
                            MODELOS DE INGRESOS
                        </div>
                        {models.map((m, i) => (
                            <button key={m.id} onClick={() => setActiveModel(i)} style={{
                                width: '100%',
                                background: activeModel === i ? `${m.color}18` : 'transparent',
                                border: activeModel === i ? `1px solid ${m.color}45` : '1px solid transparent',
                                borderRadius: '9px', padding: '0.6rem 0.8rem', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', gap: '8px', textAlign: 'left', transition: 'all 0.18s'
                            }}>
                                <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{m.emoji}</span>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: '0.78rem', fontWeight: 'bold', color: activeModel === i ? 'white' : '#94a3b8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.title}</div>
                                    <div style={{ display: 'flex', gap: '2px', marginTop: '2px' }}>
                                        {[...Array(5)].map((_, si) => (
                                            <Star key={si} size={8} fill={si < m.stars ? m.color : 'transparent'} color={si < m.stars ? m.color : '#334155'} />
                                        ))}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Detail */}
                    <div className="vls-pitch-scroll pitch-print-content" style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={model.id}
                                initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                                transition={{ duration: 0.22 }}
                                style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '860px', margin: '0 auto' }}
                            >
                                {/* Card principal */}
                                <div className="pitch-model-card" style={{
                                    background: `linear-gradient(135deg, ${model.color}15, rgba(0,0,0,0.6))`,
                                    border: `1px solid ${model.color}40`, borderRadius: '22px', padding: '2rem',
                                    position: 'relative', overflow: 'hidden'
                                }}>
                                    <div style={{ position: 'absolute', top: '-15px', right: '-15px', fontSize: '7rem', opacity: 0.07, lineHeight: 1 }}>{model.emoji}</div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.2rem' }}>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                                <span style={{ background: model.color, color: '#0f172a', fontWeight: '900', fontSize: '0.65rem', padding: '2px 8px', borderRadius: '50px', letterSpacing: '1px' }}>
                                                    MODELO {model.id} / 11
                                                </span>
                                                <div style={{ display: 'flex', gap: '2px' }}>
                                                    {[...Array(5)].map((_, si) => (
                                                        <Star key={si} size={12} fill={si < model.stars ? model.color : 'transparent'} color={si < model.stars ? model.color : '#334155'} />
                                                    ))}
                                                </div>
                                            </div>
                                            <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: '900', color: 'white' }}>{model.emoji} {model.title}</h2>
                                            <p style={{ margin: '3px 0 0', color: model.color, fontWeight: 'bold', fontSize: '0.95rem' }}>{model.subtitle}</p>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: '0.65rem', color: '#94a3b8', letterSpacing: '1px' }}>POTENCIAL MENSUAL</div>
                                            <div style={{ fontSize: '1.5rem', fontWeight: '900', color: model.color }}>{model.potential}</div>
                                        </div>
                                    </div>
                                    <p style={{ margin: 0, color: '#cbd5e1', fontSize: '1rem', lineHeight: '1.65', borderLeft: `3px solid ${model.color}`, paddingLeft: '1rem' }}>
                                        {model.desc}
                                    </p>
                                </div>

                                {/* Tiers */}
                                <div>
                                    <div style={{ fontSize: '0.7rem', color: '#64748b', letterSpacing: '2px', fontWeight: 'bold', marginBottom: '0.8rem' }}>ESTRUCTURA DE PRECIOS</div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(185px, 1fr))', gap: '0.9rem' }}>
                                        {model.tiers.map((tier, ti) => (
                                            <div className="pitch-tier-card" key={ti} style={{
                                                background: `${tier.color}15`, border: `1px solid ${tier.color}40`,
                                                borderRadius: '14px', padding: '1.2rem', position: 'relative'
                                            }}>
                                                {ti === 1 && <div style={{ position: 'absolute', top: '-9px', right: '10px', background: model.color, color: '#0f172a', fontSize: '0.55rem', fontWeight: '900', padding: '2px 7px', borderRadius: '50px' }}>MÁS POPULAR</div>}
                                                <div style={{ fontSize: '0.7rem', color: tier.color, fontWeight: 'bold', letterSpacing: '1px', marginBottom: '5px' }}>{tier.name.toUpperCase()}</div>
                                                <div style={{ fontSize: '1.2rem', fontWeight: '900', color: 'white', marginBottom: '6px' }}>{tier.price}</div>
                                                <div style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: '1.4' }}>{tier.perks}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Targets + Proyección */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
                                    <div>
                                        <div style={{ fontSize: '0.7rem', color: '#64748b', letterSpacing: '2px', fontWeight: 'bold', marginBottom: '0.8rem' }}>CLIENTES OBJETIVO</div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                            {model.targets.map(t => (
                                                <span key={t} style={{ background: `${model.color}18`, border: `1px solid ${model.color}35`, color: model.color, padding: '4px 10px', borderRadius: '50px', fontSize: '0.74rem', fontWeight: 'bold' }}>{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div style={{ background: `${model.color}10`, border: `1px solid ${model.color}30`, borderRadius: '14px', padding: '1.2rem' }}>
                                        <div style={{ fontSize: '0.7rem', color: '#64748b', letterSpacing: '2px', fontWeight: 'bold', marginBottom: '0.7rem' }}>PROYECCIÓN CLAVE</div>
                                        <p style={{ margin: 0, color: 'white', fontSize: '0.9rem', lineHeight: '1.6' }}>{model.detail}</p>
                                    </div>
                                </div>

                                {/* Nav */}
                                <div className="pitch-nav-btn" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.8rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                                    <button onClick={() => setActiveModel(Math.max(0, activeModel - 1))} disabled={activeModel === 0}
                                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: activeModel === 0 ? '#334155' : 'white', padding: '0.6rem 1.2rem', borderRadius: '50px', cursor: activeModel === 0 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold', fontSize: '0.82rem' }}>
                                        <ChevronLeft size={16} /> Anterior
                                    </button>
                                    <div style={{ display: 'flex', gap: '5px' }}>
                                        {models.map((_, mi) => (
                                            <button key={mi} onClick={() => setActiveModel(mi)} style={{ width: '7px', height: '7px', borderRadius: '50%', background: mi === activeModel ? model.color : 'rgba(255,255,255,0.12)', border: 'none', cursor: 'pointer', transition: 'all 0.2s', transform: mi === activeModel ? 'scale(1.5)' : 'scale(1)' }} />
                                        ))}
                                    </div>
                                    <button onClick={() => setActiveModel(Math.min(models.length - 1, activeModel + 1))} disabled={activeModel === models.length - 1}
                                        style={{ background: model.color, border: 'none', color: '#0f172a', padding: '0.6rem 1.2rem', borderRadius: '50px', cursor: activeModel === models.length - 1 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '900', fontSize: '0.82rem', opacity: activeModel === models.length - 1 ? 0.4 : 1 }}>
                                        Siguiente <ChevronRight size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

            ) : (
                /* ─── PLAN 12 MESES ─── */
                <div className="vls-pitch-scroll" style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
                    <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                        {/* Headline */}
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ background: 'linear-gradient(135deg, #f59e0b, #ec4899)', display: 'inline-flex', padding: '1rem', borderRadius: '50%', marginBottom: '1rem', boxShadow: '0 0 30px rgba(245,158,11,0.3)' }}>
                                <Calendar size={36} color="white" />
                            </div>
                            <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: '900', color: 'white' }}>Plan de Ejecución 12 Meses</h2>
                            <p style={{ margin: '0.5rem 0 0', color: '#94a3b8', fontSize: '1rem' }}>
                                Con una ejecución ordenada, no es descabellado generar entre <strong style={{ color: '#10b981' }}>$3M y $10M mensuales</strong> en un horizonte de 2 a 3 años.
                            </p>
                        </div>

                        {/* Timeline */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: '2px solid rgba(255,255,255,0.1)', paddingLeft: '2rem', marginLeft: '1rem' }}>
                            {plan12Meses.map((step, i) => (
                                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                                    style={{ position: 'relative', background: `${step.color}12`, border: `1px solid ${step.color}30`, borderRadius: '16px', padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                                    <div style={{ position: 'absolute', left: '-2.75rem', width: '18px', height: '18px', borderRadius: '50%', background: step.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 0 10px ${step.color}60` }}>
                                        <span style={{ fontSize: '0.6rem', fontWeight: '900', color: '#0f172a' }}>{i + 1}</span>
                                    </div>
                                    <div style={{ background: `${step.color}25`, border: `1px solid ${step.color}40`, padding: '8px', borderRadius: '10px', flexShrink: 0 }}>
                                        <step.icon size={20} color={step.color} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.68rem', color: step.color, fontWeight: '900', letterSpacing: '1.5px', marginBottom: '3px' }}>{step.mes.toUpperCase()}</div>
                                        <div style={{ color: 'white', fontWeight: 'bold', fontSize: '0.95rem' }}>{step.accion}</div>
                                    </div>
                                    <CheckCircle2 size={18} color={step.color} style={{ flexShrink: 0, opacity: 0.6 }} />
                                </motion.div>
                            ))}
                        </div>

                        {/* Resumen financiero */}
                        <div style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(0,0,0,0.6))', border: '1px solid rgba(16,185,129,0.4)', borderRadius: '22px', padding: '2rem' }}>
                            <h3 style={{ margin: '0 0 1.5rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}>
                                <DollarSign size={20} /> Proyección Financiera Combinada
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                {[
                                    { label: 'Año 1 (conservador)', value: '$3M – $5M / mes', color: '#38bdf8' },
                                    { label: 'Año 2 (moderado)', value: '$5M – $8M / mes', color: '#10b981' },
                                    { label: 'Año 3 (optimista)', value: '$8M – $15M / mes', color: '#f59e0b' },
                                ].map(p => (
                                    <div key={p.label} style={{ background: `${p.color}15`, border: `1px solid ${p.color}30`, borderRadius: '14px', padding: '1.2rem', textAlign: 'center' }}>
                                        <div style={{ fontSize: '0.7rem', color: '#94a3b8', letterSpacing: '1px', marginBottom: '6px' }}>{p.label.toUpperCase()}</div>
                                        <div style={{ fontSize: '1.4rem', fontWeight: '900', color: p.color }}>{p.value}</div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ marginTop: '1.5rem', background: 'rgba(0,0,0,0.3)', borderLeft: '3px solid #10b981', padding: '1rem', borderRadius: '8px' }}>
                                <p style={{ margin: 0, color: '#e2e8f0', fontSize: '0.9rem', lineHeight: '1.65' }}>
                                    <strong style={{ color: '#10b981' }}>Lo más valioso:</strong> no hay que partir de cero. Ya existe lo que la mayoría de los emprendimientos tardan años en conseguir: <strong>credibilidad, comunidad y conocimiento profundo del territorio.</strong> Vecinos La Serena puede convertirse en uno de los medios locales más influyentes de la Región de Coquimbo.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ─── FOOTER ─── */}
            <div className="pitch-footer no-print" style={{
                padding: '0.6rem 1.5rem',
                background: 'rgba(0,0,0,0.7)', borderTop: '1px solid rgba(255,255,255,0.05)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0, flexWrap: 'wrap', gap: '6px'
            }}>
                <div style={{ fontSize: '0.65rem', color: '#475569', letterSpacing: '1px' }}>⚡ CONFIDENCIAL · Vecinos La Serena © 2026 · vecinoslaserena.cl</div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                    Proyección combinada: <strong style={{ color: '#10b981' }}>$6.2M – $15.5M / mes</strong>
                </div>
            </div>
        </div>,
        document.body
    );
}
