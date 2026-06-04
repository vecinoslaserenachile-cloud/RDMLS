import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Clock, Radio, GraduationCap, ClipboardList, Calendar, DoorOpen, 
    Zap, Globe, Cloud, ShieldCheck, ChevronRight, ChevronLeft,
    Play, Info, BarChart3, Database, Users, ArrowRight, Monitor, Laptop, Smartphone,
    FileText, Download, Layers, Share2, Map, Activity, Volume2, VolumeX, Mic, Music, ExternalLink, Search, Scale, Shield, Pause, X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HechoEnChile from '../components/HechoEnChile';
import EInkReader from '../components/EInkReader';
import SeguridadVecinal from './SeguridadVecinal';

import { supabase } from '../utils/supabase';
const SentinelApex = React.lazy(() => import('../components/SentinelApex'));

// Campaign Tracks Definitions
const ENGLISH_TRACKS = [
    { title: "Aprende Inglés - Versión Principal", file: "aprendeinglés.mp3" },
    { title: "Aprende Inglés - Versión 2", file: "aprendeinglés (1).mp3" },
    { title: "Aprende Inglés - Versión 3", file: "aprendeinglés (2).mp3" }
];

const PERMISOS_TRACKS = [
    { title: "La Serena se Levanta - Construye", file: "1 La Serena se levanta - construye.MP3" },
    { title: "La Serena se Levanta - Gym", file: "2 La Serena se levanta - gym.MP3" },
    { title: "La Serena se Levanta - Escucharon eso", file: "3 La Serena se levanta - escucharon eso.MP3" },
    { title: "La Serena se Levanta - Himno LS Fondo", file: "4 La Serena se levanta - himno LS fondo.MP3" },
    { title: "La Serena se Levanta - Juvenil V1", file: "5 La Serena se levanta - juvenil.MP3" },
    { title: "La Serena se Levanta - Juvenil V2", file: "6. La Serena se lvanta - juvenil.MP3" },
    { title: "Campaña CPCLS26 - Maqueta 7 Video", file: "7 maqueta 7 video CPCLS26.MP3" },
    { title: "La Serena se Levanta con PS - Pop Principal", file: "LASERENASELEVANTACONPS.mp3" },
    { title: "Reggae 2 - Es Amor por La Serena", file: "../REGGEA 2 ESAMORPORLASERENA.mp3" },
    { title: "Reggae RDMLS", file: "../REGGEA RDMLS.mp3" },
    { title: "Reggae Tiempo de La Serena", file: "../REGGEA Tiempo de La Serena.mp3" },
    { title: "Ya es marzo (Sencillo CP)", file: "../Ya es marzo.mp3" },
    { title: "RDMLS Informativo Breve Marzo 1", file: "../RDMLS Informativo breve marzo 1.MP3" }
];

const getTrackSrc = (campaignId, file) => {
    let rawPath = '';
    if (file.startsWith('../')) {
        rawPath = `/music/${file.replace('../', '')}`;
    } else if (campaignId === 'ingles') {
        rawPath = `/music/vecinosmart.cl sección Audios MP3 campaña Cursos Talleres Inglés 2026/${file}`;
    } else {
        rawPath = `/music/vecinosmart.cl sección Audios MP3 campaña Permisos Circulación 2026/${file}`;
    }
    return encodeURI(rawPath);
};

// Legal Laws Definitions
const LAWS = [
    {
        id: 'ley-21180',
        title: 'Ley N° 21.180',
        badge: 'ESTADO DIGITAL',
        summary: 'Transformación Digital del Estado',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=1138479',
        icon: 'Scale',
        color: '#38bdf8',
        desc: 'Mandata a los órganos del Estado (incluyendo municipalidades) a tramitar sus procesos administrativos en soportes electrónicos. Valida e impulsa la creación de accesos inteligentes, expedientes digitales, expedientes cero papel y el uso de plataformas de capacitación a distancia (e-learning).',
        extended: 'Esta ley representa el sustento jurídico más potente para la digitalización municipal, pues establece la obligatoriedad de que los actos de la administración se realicen por medios electrónicos, reduciendo progresivamente el soporte físico hasta alcanzar el estándar "Cero Papel". Esto fundamenta directamente el Portal de Inducción, los expedientes de contratación digital y el seguimiento automatizado de tareas.'
    },
    {
        id: 'ley-19799',
        title: 'Ley N° 19.799',
        badge: 'FIRMA ELECTRÓNICA',
        summary: 'Firma y Documentos Electrónicos',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=198083',
        icon: 'Shield',
        color: '#38bdf8',
        desc: 'Otorga validez legal e institucional a los actos y contratos celebrados por medios electrónicos, regulando los tipos de firmas y certificando la integridad jurídica de los reportes.',
        extended: 'Permite que la generación de certificados digitales, diplomas de aprobación de e-learning y la suscripción de informes de prestadores de servicios a honorarios (con firma digital) gocen de plena equivalencia legal con sus contrapartes firmadas en papel, de acuerdo al principio de equivalencia de soporte.'
    },
    {
        id: 'ley-20416',
        title: 'Ley N° 20.416',
        badge: 'ESTATUTO PYME',
        summary: 'Fomento de Pymes y Producción Local',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=1010668',
        icon: 'Users',
        color: '#fbbf24',
        desc: 'Establece normas especiales para empresas de menor tamaño. Mandata a las instituciones públicas a fomentar el crecimiento económico, la difusión comercial y el apoyo a las pymes locales.',
        extended: 'Fundamenta directamente el compromiso de la Radio Digital Municipal de La Serena (RDMLS.cl) y las plataformas asociadas como canales gratuitos e institucionales de difusión para los emprendedores, pymes y comercios vecinales del territorio comunal, mitigando barreras económicas de marketing comercial.'
    },
    {
        id: 'ley-19733',
        title: 'Ley N° 19.733',
        badge: 'LIBERTAD DE INFORMACIÓN',
        summary: 'Medios de Comunicación Social',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=186008',
        icon: 'Radio',
        color: '#fbbf24',
        desc: 'Consagra la libertad de expresión y de información sin censura previa. Respalda jurídicamente el derecho del municipio a emitir contenidos a través de medios digitales.',
        extended: 'Garantiza el marco de legalidad necesario para la operación técnica de la Radio Digital Municipal La Serena (RDMLS.cl) como un medio público en línea para emitir música de creadores locales, noticias de interés comunitario y campañas públicas sin requerir de concesiones radioeléctricas del espectro radioeléctrico clásico.'
    },
    {
        id: 'dfl-1-2004',
        title: 'DFL N° 1/2004 (Subtel)',
        badge: 'TELECOMUNICACIONES',
        summary: 'Ley General de Telecomunicaciones',
        url: 'https://www.bcn.cl/leychile/navegar?idNorma=29591',
        icon: 'Globe',
        color: '#38bdf8',
        desc: 'Fija el texto refundido, coordinado y sistematizado de la Ley General de Telecomunicaciones. Habilita y ampara el libre flujo y transmisión de señales de audio digital.',
        extended: 'Esta normativa regula los servicios de telecomunicaciones terrestres y satelitales en Chile, aclarando que las señales multimedia y streaming transmitidas por redes públicas de internet no están afectas a los límites ni concesiones de frecuencias radioeléctricas que restringen a la AM o FM convencional, permitiendo que la señal de la Radio Municipal en línea llegue de manera soberana a toda la comuna.'
    },
    {
        id: 'decretos-municipales',
        title: 'Decretos Alcaldicios La Serena',
        badge: 'JURISPRUDENCIA COMUNAL',
        summary: 'Decretos N° 1730 y N° 2065',
        url: 'https://www.laserena.cl/transparencia',
        icon: 'DoorOpen',
        color: '#fbbf24',
        desc: 'Regulaciones internas específicas de la comuna. El Decreto 1730 formaliza las directrices para la digitalización administrativa y planificación (DAF/SECPLAN). El Decreto 2065 establece la inducción obligatoria para funcionarios.',
        extended: 'El Decreto Alcaldicio N° 1730 autoriza a las áreas de planificación y administración municipal a implementar softwares libres y tecnologías web de bajo costo para optimizar procesos. El Decreto N° 2065 rige la inducción municipal de la Ley Karin, mandando de forma perentoria que todo trabajador (planta, contrata y honorarios) sea capacitado de manera digital e interactiva.'
    }
];

const STEPS = [
    {
        id: 'genesis',
        month: 'FEB',
        year: '2026',
        title: 'RDMLS: El Génesis de la Señal',
        pillar: 'Smart Citizens',
        concept: 'Comunicación Soberana',
        desc: 'Implementación del nodo inicial de comunicación digital. Procesamiento de audio en tiempo real mediante Web Audio API y streaming sobre infraestructura dedicada.',
        icon: <Radio size={48} />,
        color: '#e63946',
        tech: 'React + Web Audio API',
        platform: 'Soberana (Nativa)',
        component: 'CentroRadio',
        realUrl: 'https://rdmls.cl',
        auditUrl: 'https://github.com/VecinosLaSerena/RDMLS_Core'
    },
    {
        id: 'imls-hub',
        month: 'FEB',
        year: '2026',
        title: 'IMLS SmartCity Hub',
        pillar: 'Ecosistema Digital',
        concept: 'Consolidación Streamlit',
        desc: 'Prototipado rápido de servicios críticos (Honorarios, Protocolo, Puerta) en un entorno Streamlit para validación de flujos de trabajo antes de la migración nativa.',
        icon: <Monitor size={48} />,
        color: '#c0392b',
        tech: 'Python + Streamlit Cloud',
        platform: 'Prototipo (External)',
        component: 'IMLSHub',
        realUrl: 'https://app-smartcity-imls.streamlit.app/',
        auditUrl: 'https://github.com/VecinosLaSerena/IMLS_SmartCity'
    },
    {
        id: 'elearning',
        month: 'FEB',
        year: '2026',
        title: 'E-Learning e Inducción',
        pillar: 'Smart Administration',
        concept: 'Formación Digital',
        desc: 'Digitalización del proceso de inducción municipal. Integración con Supabase para persistencia de progreso y generación dinámica de diplomas institucionales.',
        icon: <GraduationCap size={48} />,
        color: '#38bdf8',
        tech: 'React + Supabase Auth/DB',
        platform: 'Soberana (Nativa)',
        component: 'Elearning',
        realUrl: 'https://www.rdmls.cl/imls/induccion',
        auditUrl: 'https://github.com/VecinosLaSerena/SmartInduccion'
    },
    {
        id: 'honorarios',
        month: 'MAR',
        year: '2026',
        title: 'Gestión RRHH: Cero Papel',
        pillar: 'Smart Administration',
        concept: 'Eficiencia Ecológica',
        desc: 'Revolución en la gestión de honorarios. Los informes se firman digitalmente y se generan reportes automáticos, ahorrando toneladas de papel al año.',
        icon: <ClipboardList size={48} />,
        color: '#10b981',
        tech: 'Digital Signature API',
        platform: 'Soberana (Streamlit)',
        component: 'Honorarios',
        realUrl: 'https://honorarios-ls-me.streamlit.app/',
        auditUrl: 'https://github.com/VecinosLaSerena/RRHH_ZeroPaper'
    },
    {
        id: 'protocolo',
        month: 'MAR',
        year: '2026',
        title: 'Protocolo y Eventos Pro',
        pillar: 'Smart Events',
        concept: 'Gestión Institucional',
        desc: 'Optimización de la producción de eventos municipales. Sistema de precedencias en tiempo real para autoridades y gestión de invitados.',
        icon: <Calendar size={48} />,
        color: '#ec4899',
        tech: 'Precedence Logic Engine',
        platform: 'Soberana (Nativa)',
        component: 'Protocolo',
        realUrl: 'https://vecinoslaserenachile-cloud.github.io/serenito-app/',
        auditUrl: 'https://github.com/VecinosLaSerena/Protocolo_Master'
    },
    {
        id: 'puerta',
        year: 'Marzo 2026',
        title: 'PuertaSmart Evolution',
        subtitle: 'De Prototipo Streamlit a Soberanía .CL',
        description: 'Evolución del sistema original (puertaserena.streamlit.app) hacia un entorno de alta disponibilidad y marca institucional propia para el control de acceso inteligente.',
        icon: <DoorOpen size={48} />,
        color: '#c0392b',
        tech: 'QR Dynamics + AI Radar',
        platform: 'Legacy (Streamlit) → Smart (.CL)',
        component: 'PuertaSmart',
        realUrl: 'https://www.puertasmart.cl',
        auditUrl: 'https://puertaserena.streamlit.app/'
    },
    {
        id: 'centinel',
        month: 'MAY',
        year: '2026',
        title: 'HITO 90 DÍAS: Smart Listening',
        pillar: 'Pilar #4: Inteligencia',
        concept: 'Escucha Territorial IA',
        desc: 'Culminación de 90 días de entrenamiento de modelos locales. Ingesta de menciones vía WebSockets y análisis de sentimiento con Sentinel Apex para la toma de decisiones soberanas.',
        icon: <Activity size={48} />,
        color: '#6366f1',
        tech: 'PyTorch + Local LLM + WebSockets',
        platform: 'Soberana (Hybrid Edge)',
        component: 'Centinel',
        realUrl: 'https://monitor-laserena.streamlit.app/',
        auditUrl: 'https://github.com/VecinosLaSerena/CentinelFaro_IA'
    },
    {
        id: 'sentinel-apex',
        month: 'MAY',
        year: '2026',
        title: 'HITO 90 DÍAS: Sentinel Apex',
        subtitle: 'Master Control Forense',
        description: 'Despliegue de la infraestructura de mando avanzado. Análisis forense de favorabilidad institucional en tiempo real sobre dashboards nativos React de alta fidelidad.',
        icon: <Search size={48} />,
        color: '#312e81',
        tech: 'Sentiment IA Engine + React 18',
        platform: 'Soberana (Nativa .CL)',
        component: 'SentinelApex',
        realUrl: 'https://app-smartcity-imls.streamlit.app/',
        auditUrl: 'https://github.com/VecinosLaSerena/Sentinel_Apex'
    },
    {
        id: 'seguridad-vecinal',
        month: 'MAY',
        year: '2026',
        title: 'Portal de Seguridad Vecinal',
        pillar: 'Smart Citizens',
        concept: 'Autocuidado Comunitario',
        desc: 'Recuperación del portal histórico de Seguridad Ciudadana. Recomendaciones, protocolos Senapred y números de emergencia para el autocuidado de los vecinos.',
        icon: <ShieldCheck size={48} />,
        color: '#10b981',
        tech: 'React + Interfaz Táctica',
        platform: 'Soberana (Nativa)',
        component: 'SeguridadVecinal',
        realUrl: '#',
        auditUrl: 'https://vecinoslaserena.cl'
    },
    {
        id: 'mando-central',
        month: 'JUN',
        year: '2026',
        title: 'RDMLS: Centro de Mando Unificado',
        pillar: 'Ecosistema 360',
        concept: 'Operación Total',
        desc: 'EN DESARROLLO: Orquestación de micro-frontends para la integración de los 4 pilares en una única interfaz táctica descentralizada. Control global de señales y telemetría ciudadana.',
        icon: <Layers size={48} />,
        color: '#ef4444',
        tech: 'React Micro-Frontends + State Sync',
        platform: 'Cloudflare Edge (Sovereign Node)',
        component: 'SmartComunaOS',
        realUrl: '/',
        auditUrl: 'https://github.com/VecinosLaSerena/RDMLS_OS'
    }
];

// ─────────────────────────────────────────────────────────────────────────────
// CAMPAIGN SECTION — Reproductores de Campañas Municipales
// ─────────────────────────────────────────────────────────────────────────────
const pdfList = [
  { id: 'guide', name: 'Production Guide', file: '/pdfs/IMLS_Serenito_Production_Guide.pdf' },
  { id: 'canon', name: 'Canon Visual y Guía de Estilo', file: '/pdfs/VLS_Serenito_3D_Canon_Visual_y_Guia_de_Estilo.pdf' },
  { id: 'biblia', name: 'Biblia Visual de Producción', file: '/pdfs/VLS_Serenito_Produccion_Biblia_Visual.pdf' },
  { id: 'toys', name: 'Toys & Local Hero Story', file: '/pdfs/IMLS_Serenito_Toys_A_Local_Hero_Story.pdf' }
];
function CampaignSection() {
    const [campId, setCampId] = useState('permisos'); // 'permisos' | 'ingles'
    const [trackIdx, setTrackIdx] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [audioEl, setAudioEl] = useState(null);
    const [volume, setVolume] = useState(0.8);
    const [selectedPdf, setSelectedPdf] = useState(pdfList[0]);

    const tracks = campId === 'permisos' ? PERMISOS_TRACKS : ENGLISH_TRACKS;
    const current = tracks[trackIdx];

    useEffect(() => {
        if (audioEl) {
            audioEl.pause();
            audioEl.src = '';
        }
        setPlaying(false);
        setTrackIdx(0);
    }, [campId]);

    const playTrack = (idx) => {
        if (audioEl) { audioEl.pause(); audioEl.src = ''; }
        const src = getTrackSrc(campId, tracks[idx].file);
        const a = new Audio(src);
        a.volume = volume;
        a.onended = () => {
            const next = (idx + 1) % tracks.length;
            setTrackIdx(next);
            playTrack(next);
        };
        a.onerror = () => console.warn('Audio no disponible:', src);
        a.play().catch(e => console.warn('Play bloqueado:', e));
        setAudioEl(a);
        setTrackIdx(idx);
        setPlaying(true);
    };

    const togglePlay = () => {
        if (playing) {
            audioEl?.pause();
            setPlaying(false);
        } else {
            if (audioEl && audioEl.src && !audioEl.ended) {
                audioEl.play().catch(()=>{});
                setPlaying(true);
            } else {
                playTrack(trackIdx);
            }
        }
    };

    const CAMP_COLORS = { permisos: '#c0392b', ingles: '#1a6b3c', propuestas: '#f59e0b' };
    const cc = CAMP_COLORS[campId];

    return (
        <section style={{ background: '#fff', padding: '5rem 2rem', borderTop: '4px solid #c0392b' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: '900', letterSpacing: '4px', color: '#c0392b', marginBottom: '0.5rem' }}>CAMPAÑAS MUNICIPALES 2026</div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '950', margin: 0, color: '#1a1a2e', letterSpacing: '-1px' }}>
                        Radio de <span style={{ color: '#c0392b' }}>Campaña</span>
                    </h2>
                    <p style={{ color: '#64748b', marginTop: '0.5rem', fontSize: '0.95rem' }}>Jingles y narraciones oficiales para difusión municipal</p>
                </div>

                {/* Tabs selector de campaña */}
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
                    {[
                        { id: 'permisos', label: '🚗 Permisos de Circulación 2026', color: '#c0392b' },
                        { id: 'ingles',   label: '🇬🇧 Cursos y Talleres de Inglés', color: '#1a6b3c' },
                        { id: 'propuestas', label: '📖 Propuestas Gráficas', color: '#f59e0b' },
                        { id: 'memoria', label: '📖 Memoria Institucional', color: '#3b82f6' }
                    ].map(tab => (
                        <button key={tab.id} onClick={() => setCampId(tab.id)} style={{
                            padding: '0.75rem 1.8rem', borderRadius: '100px', fontWeight: '900',
                            fontSize: '0.9rem', cursor: 'pointer', transition: '0.3s',
                            background: campId === tab.id ? tab.color : 'transparent',
                            color: campId === tab.id ? 'white' : tab.color,
                            border: `2px solid ${tab.color}`,
                            boxShadow: campId === tab.id ? `0 6px 20px ${tab.color}40` : 'none'
                        }}>{tab.label}</button>
                    ))}
                </div>

                {campId === 'memoria' ? (
                    <EInkReader />
                ) : campId === 'propuestas' ? (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'stretch', background: 'rgba(15, 23, 42, 0.03)', borderRadius: '24px', overflow: 'hidden', minHeight: '600px', border: '1px solid rgba(0,0,0,0.05)' }}>
                        <div style={{ flex: '1 1 300px', background: 'rgba(0,0,0,0.03)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', borderRight: '1px solid rgba(0,0,0,0.05)' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#64748b', letterSpacing: '2px', marginBottom: '1rem' }}>BIBLIAS Y MANUALES</div>
                            {pdfList.map(pdf => (
                                <button key={pdf.id} onClick={() => setSelectedPdf(pdf)} style={{
                                    padding: '1rem', borderRadius: '12px', border: 'none',
                                    background: selectedPdf.id === pdf.id ? '#f59e0b' : 'white',
                                    color: selectedPdf.id === pdf.id ? 'white' : '#475569',
                                    fontWeight: '700', textAlign: 'left', cursor: 'pointer',
                                    boxShadow: selectedPdf.id === pdf.id ? '0 10px 20px rgba(245,158,11,0.3)' : '0 2px 5px rgba(0,0,0,0.05)',
                                    transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '0.5rem'
                                }}>
                                    <FileText size={18} /> {pdf.name}
                                </button>
                            ))}
                        </div>
                        <div style={{ flex: '1 1 100%', minWidth: '280px', padding: '0', background: '#f8fafc', position: 'relative', minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ padding: '1rem', background: '#f1f5f9', display: 'flex', justifyContent: 'flex-end', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                                <a href={selectedPdf.file} target="_blank" rel="noopener noreferrer" style={{
                                    display: 'flex', alignItems: 'center', gap: '8px', background: '#f59e0b', color: 'white',
                                    padding: '0.6rem 1.2rem', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.85rem', textDecoration: 'none'
                                }}>
                                    <ExternalLink size={16} /> Abrir PDF Completo
                                </a>
                            </div>
                            <div style={{ flex: 1, position: 'relative' }}>
                                <iframe src={`${selectedPdf.file}#view=FitH`} title={selectedPdf.name} style={{ width: '100%', height: '100%', border: 'none', position: 'absolute', top: 0, left: 0 }} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start' }}>
                        {/* Player principal */}
                        <div style={{
                            flex: '1 1 350px', background: cc, borderRadius: '24px', padding: '2rem',
                            boxShadow: `0 20px 60px ${cc}40`, color: 'white', position: 'sticky', top: '2rem'
                        }}>
                            <div style={{ fontSize: '0.6rem', fontWeight: '900', letterSpacing: '3px', opacity: 0.7, marginBottom: '1rem' }}>
                                {campId === 'permisos' ? 'CAMPAÑA PERMISOS DE CIRCULACIÓN' : 'CAMPAÑA INGLÉS 2026'}
                            </div>
                            <div style={{ fontSize: '1.1rem', fontWeight: '900', marginBottom: '0.4rem', lineHeight: 1.3 }}>
                                {current.title}
                            </div>
                            <div style={{ fontSize: '0.75rem', opacity: 0.7, marginBottom: '2rem' }}>
                                Pista {trackIdx + 1} de {tracks.length}
                            </div>

                            {/* Barra de progreso decorativa */}
                            <div style={{ background: 'rgba(255,255,255,0.2)', height: '4px', borderRadius: '4px', marginBottom: '1.5rem', overflow: 'hidden' }}>
                                {playing && (
                                    <motion.div
                                        animate={{ width: ['0%', '100%'] }}
                                        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                                        style={{ height: '100%', background: 'white', borderRadius: '4px' }}
                                    />
                                )}
                            </div>

                            {/* Controles */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                                <button onClick={() => playTrack((trackIdx - 1 + tracks.length) % tracks.length)}
                                    style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <ChevronLeft size={20} />
                                </button>
                                <button onClick={togglePlay}
                                    style={{ background: 'white', border: 'none', borderRadius: '50%', width: '60px', height: '60px', cursor: 'pointer', color: cc, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                                    {playing ? <Pause size={28} /> : <Play size={28} />}
                                </button>
                                <button onClick={() => playTrack((trackIdx + 1) % tracks.length)}
                                    style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <ChevronRight size={20} />
                                </button>
                                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Volume2 size={14} />
                                    <input type="range" min="0" max="1" step="0.1" value={volume}
                                        onChange={e => {
                                            const v = parseFloat(e.target.value);
                                            setVolume(v);
                                            if (audioEl) audioEl.volume = v;
                                        }}
                                        style={{ width: '60px', accentColor: 'white' }}
                                    />
                                </div>
                            </div>

                            {/* Ecualizador animado */}
                            {playing && (
                                <div style={{ display: 'flex', gap: '3px', height: '30px', alignItems: 'flex-end', justifyContent: 'center' }}>
                                    {[...Array(12)].map((_, i) => (
                                        <motion.div key={i}
                                            animate={{ height: [4, Math.random()*24+6, 4] }}
                                            transition={{ duration: 0.4 + i*0.05, repeat: Infinity }}
                                            style={{ width: '4px', background: 'rgba(255,255,255,0.7)', borderRadius: '2px' }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Playlist */}
                        <div style={{ flex: '2 1 450px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div style={{ fontSize: '0.7rem', fontWeight: '900', letterSpacing: '3px', color: '#94a3b8', marginBottom: '0.5rem' }}>PLAYLIST COMPLETA</div>
                            {tracks.map((t, i) => (
                                <motion.button key={i}
                                    onClick={() => playTrack(i)}
                                    whileHover={{ x: 4 }}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '1rem',
                                        padding: '0.9rem 1.2rem', borderRadius: '12px', cursor: 'pointer',
                                        background: i === trackIdx ? `${cc}15` : 'rgba(0,0,0,0.03)',
                                        border: `1px solid ${i === trackIdx ? cc : 'transparent'}`,
                                        textAlign: 'left', transition: '0.2s'
                                    }}
                                >
                                    <div style={{
                                        width: '32px', height: '32px', borderRadius: '8px',
                                        background: i === trackIdx ? cc : '#e2e8f0',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        flexShrink: 0, color: i === trackIdx ? 'white' : '#64748b'
                                    }}>
                                        {i === trackIdx && playing ? <Volume2 size={14} /> : <Music size={14} />}
                                    </div>
                                    <div style={{ flex: 1, overflow: 'hidden' }}>
                                        <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#1a1a2e', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                            {t.title}
                                        </div>
                                        <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>Municipalidad de La Serena · 2026</div>
                                    </div>
                                    <div style={{ fontSize: '0.7rem', fontWeight: '900', color: i === trackIdx ? cc : '#cbd5e1' }}>
                                        {String(i + 1).padStart(2, '0')}
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// LEGAL SECTION — Marco Legal Expandible con links reales BCN
// ─────────────────────────────────────────────────────────────────────────────
function LegalSection() {
    const [expanded, setExpanded] = useState(null);

    const iconMap = {
        Scale: <Scale size={22} />,
        Shield: <Shield size={22} />,
        Users: <Users size={22} />,
        Radio: <Radio size={22} />,
        Globe: <Globe size={22} />,
        DoorOpen: <DoorOpen size={22} />
    };

    return (
        <section style={{ background: '#020617', padding: '5rem 2rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: '900', letterSpacing: '4px', color: '#38bdf8', marginBottom: '0.5rem' }}>FUNDAMENTO JURÍDICO</div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '950', margin: 0, color: 'white', letterSpacing: '-1px' }}>
                        Marco <span style={{ color: '#38bdf8' }}>Legal</span>
                    </h2>
                    <p style={{ color: '#64748b', marginTop: '0.5rem', fontSize: '0.95rem', maxWidth: '600px', margin: '0.5rem auto 0' }}>
                        Base normativa que ampara y valida la plataforma Smart Ciudad. Haz clic en cada ley para ver el análisis completo y acceder a la fuente oficial.
                    </p>
                </div>

                {/* Grilla de leyes */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {LAWS.map(law => (
                        <motion.div key={law.id}
                            initial={false}
                            style={{
                                background: 'rgba(255,255,255,0.02)',
                                border: `1px solid ${expanded === law.id ? law.color + '60' : 'rgba(255,255,255,0.07)'}`,
                                borderRadius: '16px', overflow: 'hidden',
                                boxShadow: expanded === law.id ? `0 0 30px ${law.color}15` : 'none',
                                transition: '0.3s'
                            }}
                        >
                            {/* Header de la ley (siempre visible) */}
                            <button
                                onClick={() => setExpanded(expanded === law.id ? null : law.id)}
                                style={{
                                    width: '100%', display: 'flex', alignItems: 'center', gap: '1.2rem',
                                    padding: '1.4rem 1.8rem', background: 'none', border: 'none',
                                    cursor: 'pointer', textAlign: 'left'
                                }}
                            >
                                <div style={{
                                    width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
                                    background: `${law.color}15`, border: `1px solid ${law.color}30`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: law.color
                                }}>
                                    {iconMap[law.icon]}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3px', flexWrap: 'wrap' }}>
                                        <span style={{ fontSize: '1rem', fontWeight: '900', color: 'white' }}>{law.title}</span>
                                        <span style={{
                                            fontSize: '0.55rem', fontWeight: '900', letterSpacing: '2px',
                                            background: `${law.color}25`, color: law.color,
                                            padding: '2px 8px', borderRadius: '100px', border: `1px solid ${law.color}40`
                                        }}>{law.badge}</span>
                                    </div>
                                    <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{law.summary}</div>
                                </div>
                                <motion.div
                                    animate={{ rotate: expanded === law.id ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    style={{ color: law.color, flexShrink: 0 }}
                                >
                                    <ChevronRight size={20} style={{ transform: 'rotate(90deg)' }} />
                                </motion.div>
                            </button>

                            {/* Contenido expandido */}
                            <AnimatePresence>
                                {expanded === law.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <div style={{ padding: '0 1.8rem 1.8rem 1.8rem', borderTop: `1px solid ${law.color}20` }}>
                                            <p style={{ color: '#cbd5e1', lineHeight: 1.7, fontSize: '0.92rem', marginTop: '1.2rem' }}>
                                                {law.desc}
                                            </p>
                                            <p style={{
                                                color: '#94a3b8', lineHeight: 1.7, fontSize: '0.85rem',
                                                background: 'rgba(255,255,255,0.03)', padding: '1rem 1.2rem',
                                                borderRadius: '10px', borderLeft: `3px solid ${law.color}`, marginTop: '0.75rem'
                                            }}>
                                                {law.extended}
                                            </p>
                                            <div style={{ marginTop: '1.2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                                <a href={law.url} target="_blank" rel="noopener noreferrer"
                                                    style={{
                                                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                                                        background: law.color, color: 'black', fontWeight: '900',
                                                        fontSize: '0.8rem', padding: '0.6rem 1.4rem', borderRadius: '10px',
                                                        textDecoration: 'none', boxShadow: `0 4px 15px ${law.color}40`
                                                    }}
                                                >
                                                    <FileText size={14} /> Ver texto oficial BCN <ExternalLink size={12} />
                                                </a>
                                                <button onClick={() => setExpanded(null)}
                                                    style={{
                                                        background: 'rgba(255,255,255,0.05)', color: '#94a3b8',
                                                        border: '1px solid rgba(255,255,255,0.1)', fontWeight: 'bold',
                                                        fontSize: '0.8rem', padding: '0.6rem 1.2rem', borderRadius: '10px',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    Cerrar
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Nota al pie */}
                <div style={{ marginTop: '2.5rem', textAlign: 'center', color: '#475569', fontSize: '0.8rem' }}>
                    <Scale size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                    Todas las referencias legales enlazan directamente a la <strong style={{ color: '#64748b' }}>Biblioteca del Congreso Nacional de Chile (BCN)</strong> como fuente oficial.
                </div>
            </div>
        </section>
    );
}

export default function SmartComunaEvolution() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const step = STEPS[currentStep];
    const [isTransitioning, setIsTransitioning] = useState(false);
    const host = window.location.host;
    const isRDMLS = host.includes('rdmls') || host.includes('radiomunicipal');
    const [showSerenitoRap, setShowSerenitoRap] = useState(false);

    const nextStep = () => {
        if (currentStep < STEPS.length - 1) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentStep(prev => prev + 1);
                setIsTransitioning(false);
            }, 500);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentStep(prev => prev - 1);
                setIsTransitioning(false);
            }, 500);
        }
    };

    const [currentTime, setCurrentTime] = useState(new Date());
    const [isRadioPlaying, setIsRadioPlaying] = useState(false);
    const [showSeguridadVecinal, setShowSeguridadVecinal] = useState(false);
    const [isNarrating, setIsNarrating] = useState(false);
    const [currentMinicast, setCurrentMinicast] = useState(null);
    const [audioInstance, setAudioInstance] = useState(null);
    const [playlistIndex, setPlaylistIndex] = useState(0);
    const [radioVolume, setRadioVolume] = useState(0.4);
    const [isPaused, setIsPaused] = useState(false);

    // Refs: siempre tienen el valor actual sin closure stale
    const voicesRef   = React.useRef([]);
    const audioRef    = React.useRef(null); // espeja audioInstance para controles en tiempo real
    const volumeRef   = React.useRef(0.4);

    // Sincroniza volumeRef cuando cambia el slider
    useEffect(() => { volumeRef.current = radioVolume; }, [radioVolume]);

    // Precarga voces — espera 'voiceschanged' para tener Google/MS disponibles
    useEffect(() => {
        const load = () => {
            const all = window.speechSynthesis.getVoices();
            if (all.length > 0) voicesRef.current = all;
        };
        load();
        window.speechSynthesis.addEventListener('voiceschanged', load);
        return () => window.speechSynthesis.removeEventListener('voiceschanged', load);
    }, []);

    // Helper: setea la instancia de audio en estado Y en ref
    const setAudio = (a) => {
        audioRef.current = a;
        setAudioInstance(a);
    };

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const lyraMusic = [
        '/music/estiempodelaserena.mp3',
        '/music/es_amor_por_la_serena.mp3',
        '/music/himno_la_serena_jazz.mp3',
        '/music/vals_mis_recuerdos.mp3',
        '/audio/reggaeprendes.cl.mp3'
    ];

    // ── Audio Ducking: baja música gradualmente, habla, sube de vuelta ──────────
    const fadeVolume = (audio, fromVol, toVol, durationMs, onComplete) => {
        if (!audio) { if (onComplete) onComplete(); return; }
        const steps = 30;
        const stepMs = durationMs / steps;
        const delta = (toVol - fromVol) / steps;
        let current = fromVol;
        let count = 0;
        const interval = setInterval(() => {
            count++;
            current += delta;
            audio.volume = Math.max(0, Math.min(1, current));
            if (count >= steps) {
                clearInterval(interval);
                audio.volume = toVol;
                if (onComplete) onComplete();
            }
        }, stepMs);
    };

    const playNarration = (text, audioArg) => {
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel();

        const activeAudio = audioArg || audioRef.current;
        setIsNarrating(true);
        setCurrentMinicast(`🎙️ ${text.slice(0, 55)}...`);

        // Fade OUT música → 8% en 1.2s antes de hablar
        fadeVolume(activeAudio, activeAudio ? activeAudio.volume : 0.4, 0.08, 1200, () => {
            // Voces desde ref (nunca closure stale)
            const voices = voicesRef.current.length > 0
                ? voicesRef.current
                : window.speechSynthesis.getVoices();

            // ── Selección de voz LATINA / CHILENA — excluye España (es-ES) ──
            // es-419 = Español Latino, es-MX, es-CL, es-AR, es-US son neutros/chilenos
            const isLatino = v =>
                v.lang.startsWith('es') &&
                v.lang !== 'es-ES' &&          // excluye ceceo España
                v.lang !== 'es_ES' &&
                !v.name.toLowerCase().includes('spain') &&
                !v.name.toLowerCase().includes('españa');

            const preferred =
                voices.find(v => isLatino(v) && v.lang === 'es-CL') ||  // Chile primero
                voices.find(v => isLatino(v) && v.lang === 'es-419') ||  // Latino genérico
                voices.find(v => isLatino(v) && v.lang === 'es-MX') ||   // México
                voices.find(v => isLatino(v) && v.lang === 'es-AR') ||   // Argentina
                voices.find(v => isLatino(v) && v.lang === 'es-US') ||   // Español US
                voices.find(v => isLatino(v) && v.name.includes('Google')) ||
                voices.find(v => isLatino(v) && v.name.includes('Microsoft')) ||
                voices.find(v => isLatino(v)) ||                          // cualquier latino
                voices.find(v => v.lang.startsWith('en'));                // inglés > robot

            const utterance = new SpeechSynthesisUtterance(text);
            if (preferred) {
                utterance.voice = preferred;
                utterance.lang  = preferred.lang;
            } else {
                utterance.lang = 'es-419'; // fuerza latino si no hay voz
            }
            utterance.rate   = 0.87;
            utterance.pitch  = 1.0;
            utterance.volume = 1.0;

            utterance.onend = () => {
                setIsNarrating(false);
                const nm = (audioRef.current?.src || '').split('/').pop() || 'Radio Evolución';
                setCurrentMinicast(`🎵 ${nm}`);
                fadeVolume(activeAudio, 0.08, volumeRef.current, 1500, () => {
                    if (audioRef.current && !audioRef.current.paused) playNextTrack();
                });
            };
            utterance.onerror = () => {
                setIsNarrating(false);
                fadeVolume(activeAudio, 0.08, volumeRef.current, 800, () => {});
            };
            window.speechSynthesis.speak(utterance);
        });
    };

    const playNextTrack = () => {
        const nextIdx = (playlistIndex + 1) % lyraMusic.length;
        setPlaylistIndex(nextIdx);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = '';
        }
        const audio = new Audio(lyraMusic[nextIdx]);
        audio.volume = volumeRef.current;
        audio.onended = () => {
            if (Math.random() > 0.5) {
                playNarration(`Estás escuchando Radio Evolución. Hito actual: ${step.title}. ${step.desc}`, audio);
            } else {
                playNextTrack();
            }
        };
        audio.play().catch(e => console.warn('Track error:', e));
        setAudio(audio);
        setIsPaused(false);
        setCurrentMinicast(`🎵 ${lyraMusic[nextIdx].split('/').pop()}`);
    };

    const togglePlayPause = () => {
        const a = audioRef.current;
        if (!a) return;
        if (a.paused) {
            a.play().catch(() => {});
            setIsPaused(false);
        } else {
            a.pause();
            setIsPaused(true);
        }
    };

    const skipNarration = () => {
        window.speechSynthesis.cancel();
        setIsNarrating(false);
        if (audioRef.current) {
            fadeVolume(audioRef.current, audioRef.current.volume, volumeRef.current, 600, () => {});
        }
    };

    const toggleRadio = () => {
        if (!isRadioPlaying) {
            setIsRadioPlaying(true);
            setIsPaused(false);
            setCurrentMinicast('🎵 Iniciando Radio Evolución...');

            const audio = new Audio(lyraMusic[playlistIndex]);
            audio.volume = 0.05;
            audio.play().catch(e => console.warn('Radio start error:', e));
            audio.onended = () => playNextTrack();
            setAudio(audio);

            // Fade in suave → 20%, luego narración bienvenida
            fadeVolume(audio, 0.05, 0.2, 800, () => {
                playNarration(`Bienvenido a Radio Evolución. Hito: ${step.title}. ${step.desc}`, audio);
            });
        } else {
            // Apagar con fade out
            window.speechSynthesis.cancel();
            setIsNarrating(false);
            const a = audioRef.current;
            if (a) {
                fadeVolume(a, a.volume, 0, 600, () => {
                    a.pause();
                    a.src = '';
                });
            }
            setIsRadioPlaying(false);
            setIsPaused(false);
            setCurrentMinicast(null);
            setAudio(null);
        }
    };

    const handleDownloadPDF = () => {
        const confirm = window.confirm("¿Desea generar el Dossier Técnico IMLS 2024-2026 en formato PDF?");
        if (confirm) {
            alert("Generando Dossier de Evolución Smart Comuna...\n\nCompilando hitos:\n1. RDMLS\n2. E-Learning\n3. RRHH Cero Papel\n4. Protocolo\n5. PuertaSmart\n\nListo para imprimir.");
            window.print();
        }
    };

    return (
        <div className="evolution-showroom-container" style={{ 
            minHeight: '100vh', 
            background: '#020617', 
            color: 'white', 
            fontFamily: "'Outfit', sans-serif",
            overflowX: 'hidden',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <style>{`
                @media (max-width: 768px) {
                    .showroom-main { flex-direction: column !important; }
                    .milestones-sidebar { width: 100% !important; order: 2; height: auto !important; }
                    .presentation-grid { grid-template-columns: 1fr !important; padding: 1rem !important; }
                    .hide-mobile { display: none; }
                }
            `}</style>

            <nav className="showroom-nav" style={{ 
                padding: '1.5rem 2rem', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                background: 'rgba(2, 6, 23, 0.8)',
                backdropFilter: 'blur(20px)',
                zIndex: 100,
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: '#38bdf8', padding: '8px', borderRadius: '10px', boxShadow: '0 0 20px rgba(56, 189, 248, 0.4)' }}>
                        <Zap size={20} color="black" />
                    </div>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '900', letterSpacing: '-1px' }}>
                            SMART COMUNA <span style={{ color: '#38bdf8' }}>EVOLUTION</span>
                        </h1>
                        <p style={{ margin: 0, fontSize: '0.6rem', opacity: 0.5, fontWeight: 'bold', letterSpacing: '1px' }}>SHOWROOM SOBERANO</p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.03)', padding: '6px 15px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ width: '6px', height: '6px', background: '#38bdf8', borderRadius: '50%' }}></div>
                        <span style={{ fontSize: '0.65rem', fontWeight: 'bold' }}>ESTADO: 90 DÍAS (MAY-2026)</span>
                    </div>
                    <button 
                        onClick={async () => {
                            localStorage.removeItem('vls_admin_bypass');
                            await supabase.auth.signOut();
                            window.location.reload();
                        }}
                        style={{ background: 'rgba(239,68,68,0.1)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.3)', padding: '8px 16px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.2)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
                    >
                        CERRAR SESIÓN
                    </button>
                    <button 
                        onClick={handleDownloadPDF}
                        style={{ background: 'rgba(255,255,255,0.05)', color: '#38bdf8', border: '1px solid #38bdf8', padding: '0.5rem 1rem', borderRadius: '10px', fontWeight: '900', fontSize: '0.7rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                        <Download size={14} /> PDF
                    </button>
                    <button 
                        onClick={() => navigate('/')}
                        style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '10px', fontWeight: '900', fontSize: '0.7rem', cursor: 'pointer' }}
                    >
                        CERRAR
                    </button>
                </div>
            </nav>

            <main className="showroom-main" style={{ flex: 1, display: 'flex', position: 'relative' }}>
                <div className="milestones-sidebar" style={{ width: '280px', display: 'flex', flexDirection: 'column', padding: '2rem 1rem', borderRight: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}>
                    <div className="sidebar-clock-container" style={{ marginBottom: '2rem', padding: '0 1rem' }}>
                        <div style={{ fontSize: '0.65rem', fontWeight: '900', letterSpacing: '3px', color: '#64748b', marginBottom: '1rem' }}>ARBOLITO DE HITOS</div>
                        
                        {/* Integrated Clock */}
                        <div style={{ 
                            background: 'rgba(56, 189, 248, 0.05)', 
                            border: '1px solid rgba(56, 189, 248, 0.2)', 
                            borderRadius: '15px', 
                            padding: '1rem',
                            marginBottom: '2rem',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '0.6rem', color: '#38bdf8', fontWeight: '900', letterSpacing: '2px', marginBottom: '5px' }}>TIEMPO REAL IMLS</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: '950', fontFamily: 'monospace', color: 'white' }}>
                                {currentTime.toLocaleTimeString('es-CL', { hour12: false })}
                            </div>
                            <div style={{ fontSize: '0.5rem', opacity: 0.5 }}>SYNCHRONIZED_UTC-4</div>
                        </div>
                    </div>

                    <div className="milestones-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', overflowY: 'auto' }}>
                        {STEPS.map((s, idx) => (
                            <button 
                                key={s.id}
                                onClick={() => setCurrentStep(idx)}
                                className={`milestone-item ${idx === currentStep ? 'active' : ''}`}
                                style={{ 
                                    width: '100%', 
                                    padding: '1rem', 
                                    borderRadius: '12px', 
                                    background: idx === currentStep ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                                    border: '1px solid',
                                    borderColor: idx === currentStep ? 'rgba(56, 189, 248, 0.3)' : 'transparent',
                                    cursor: 'pointer',
                                    transition: '0.3s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    textAlign: 'left'
                                }}
                            >
                                <div style={{ 
                                    width: '32px', height: '32px', borderRadius: '8px', 
                                    background: idx === currentStep ? s.color : 'rgba(255,255,255,0.05)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: idx === currentStep ? 'black' : 'white',
                                    transition: '0.3s',
                                    flexShrink: 0
                                }}>
                                    {React.cloneElement(s.icon, { size: 16 })}
                                </div>
                                <div style={{ flex: 1, overflow: 'hidden' }}>
                                    <div style={{ fontSize: '0.7rem', fontWeight: '900', color: idx === currentStep ? s.color : 'white' }}>{s.month}</div>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 'bold', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', color: idx === currentStep ? 'white' : '#cbd5e1', opacity: idx === currentStep ? 1 : 0.8 }}>{s.title.split(':')[0]}</div>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="sidebar-status-container" style={{ marginTop: 'auto', padding: '1rem' }}>
                        <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.4)', padding: '1rem', borderRadius: '12px' }}>
                            <div style={{ fontSize: '0.6rem', color: '#4ade80', fontWeight: '900', marginBottom: '5px', letterSpacing: '1px' }}>OBJETIVOS 100% LOGRADOS</div>
                            <div style={{ fontSize: '0.65rem', fontWeight: 'bold', color: 'white', opacity: 1 }}>PRÓXIMAS ETAPAS EN EVALUACIÓN</div>
                        </div>
                    </div>
                </div>

                {/* Presentation Stage */}
                <div className="presentation-grid" style={{ flex: 1, padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2rem', alignItems: 'center', overflowY: 'auto' }}>
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={step.id}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 30 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: `${step.color}15`, padding: '10px 25px', borderRadius: '100px', border: `1px solid ${step.color}30`, marginBottom: '2.5rem' }}>
                                <span style={{ fontSize: '0.8rem', fontWeight: '950', color: step.color, letterSpacing: '4px' }}>{step.month} {step.year}</span>
                            </div>

                            <h2 className="step-title" style={{ fontSize: '3rem', fontWeight: '950', lineHeight: 1, marginBottom: '1.5rem', letterSpacing: '-2px' }}>
                                {step.title.split(':').map((t, i) => (
                                    <span key={i} style={{ display: 'block', color: i === 1 ? step.color : 'white' }}>{t}</span>
                                ))}
                            </h2>

                            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
                                <div>
                                    <div style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '4px' }}>PILARES</div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{step.pillar}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '4px' }}>CONCEPTO</div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{step.concept}</div>
                                </div>
                            </div>

                            <p style={{ fontSize: '1.1rem', color: '#e2e8f0', lineHeight: '1.5', marginBottom: '2rem', maxWidth: '100%' }}>
                                {step.desc}
                            </p>

                            <div className="tech-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: 'bold', marginBottom: '5px' }}>CORE</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
                                        <Monitor size={14} color={step.color} />
                                        <span style={{ fontWeight: 'bold' }}>{step.tech}</span>
                                    </div>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: 'bold', marginBottom: '5px' }}>CLOUD</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
                                        <Cloud size={14} color="#38bdf8" />
                                        <span style={{ fontWeight: 'bold' }}>{step.platform}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="action-buttons" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                                <button 
                                    onClick={() => {
                                        if (step.id === 'seguridad-vecinal') setShowSeguridadVecinal(true);
                                        else if (step.id === 'sentinel-apex') window.dispatchEvent(new CustomEvent('open-sentinel-apex'));
                                        else if (step.realUrl.startsWith('/')) navigate(step.realUrl);
                                        else window.open(step.realUrl, '_blank');
                                    }}
                                    style={{ 
                                        background: step.color, color: 'black', border: 'none', 
                                        padding: '1rem 2rem', borderRadius: '15px', fontWeight: '950', 
                                        fontSize: '0.9rem', cursor: 'pointer', display: 'flex', 
                                        alignItems: 'center', gap: '10px', boxShadow: `0 10px 30px ${step.color}30`
                                    }}
                                >
                                    LANZAR SISTEMA REAL <ExternalLink size={16} />
                                </button>

                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button 
                                        onClick={prevStep}
                                        disabled={currentStep === 0}
                                        style={{ 
                                            background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', 
                                            padding: '1rem', borderRadius: '15px', fontWeight: '950', 
                                            fontSize: '0.9rem', cursor: currentStep === 0 ? 'not-allowed' : 'pointer', display: 'flex', 
                                            alignItems: 'center', gap: '5px', opacity: currentStep === 0 ? 0.3 : 1
                                        }}
                                        title="Hito Anterior"
                                    >
                                        <ChevronLeft size={16} /> Anterior
                                    </button>
                                    <button 
                                        onClick={nextStep}
                                        disabled={currentStep === STEPS.length - 1}
                                        style={{ 
                                            background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', 
                                            padding: '1rem', borderRadius: '15px', fontWeight: '950', 
                                            fontSize: '0.9rem', cursor: currentStep === STEPS.length - 1 ? 'not-allowed' : 'pointer', display: 'flex', 
                                            alignItems: 'center', gap: '5px', opacity: currentStep === STEPS.length - 1 ? 0.3 : 1
                                        }}
                                        title="Hito Siguiente"
                                    >
                                        Siguiente <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="visual-stage" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <div style={{ width: '100%', maxWidth: '400px', aspectRatio: '1/1', background: 'radial-gradient(circle, rgba(56, 189, 248, 0.05) 0%, transparent 70%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <AnimatePresence mode="wait">
                                <motion.div 
                                    key={step.id}
                                    onClick={toggleRadio}
                                    initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    exit={{ opacity: 0, scale: 0.5, rotate: 20 }}
                                    transition={{ type: 'spring', damping: 15 }}
                                    style={{ 
                                        width: '80%', height: '80%', background: '#111', 
                                        borderRadius: '40px', border: `2px solid ${step.color}50`,
                                        boxShadow: `0 30px 60px rgba(0,0,0,0.8), 0 0 50px ${step.color}20`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        position: 'relative', overflow: 'hidden', cursor: 'pointer'
                                    }}
                                >
                                    {/* Glassmorphic "Mock" Content */}
                                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '30px', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '6px', padding: '0 10px' }}>
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: isRadioPlaying ? '#10b981' : '#ef4444' }} />
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fbbf24' }} />
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                                        <span style={{ fontSize: '0.5rem', color: isRadioPlaying ? '#10b981' : '#444', marginLeft: 'auto' }}>{isRadioPlaying ? 'STREAMING_LIVE' : 'SIGNAL_IDLE'}</span>
                                    </div>

                                    {/* Hero Icon */}
                                    <div style={{ color: step.color, transform: isRadioPlaying ? 'scale(1.7)' : 'scale(1.5)', filter: `drop-shadow(0 0 15px ${step.color}50)`, transition: '0.5s' }}>
                                        {isRadioPlaying ? <Volume2 size={48} /> : step.icon}
                                    </div>

                                    {isRadioPlaying && (
                                        <div style={{ position: 'absolute', bottom: '20px', left: '0', width: '100%', display: 'flex', justifyContent: 'center', gap: '4px' }}>
                                            {[...Array(5)].map((_, i) => (
                                                <motion.div 
                                                    key={i}
                                                    animate={{ height: [10, 30, 10] }}
                                                    transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                                                    style={{ width: '4px', background: step.color, borderRadius: '2px' }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </main>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* LÍNEA DE TIEMPO INTERACTIVA */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <section style={{ background: '#010b1a', padding: '4rem 2rem', borderTop: '1px solid rgba(56,189,248,0.1)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: '900', letterSpacing: '4px', color: '#38bdf8', marginBottom: '0.5rem' }}>CRONOLOGÍA SOBERANA</div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '950', margin: 0, letterSpacing: '-1px' }}>
                            Línea de Tiempo <span style={{ color: '#38bdf8' }}>90 Días</span>
                        </h2>
                        <p style={{ color: '#64748b', marginTop: '0.5rem', fontSize: '0.95rem' }}>Haz clic en cada hito para enfocarlo en el showroom</p>
                    </div>

                    {/* Timeline horizontal */}
                    <div style={{ position: 'relative', overflowX: 'auto', paddingBottom: '1rem' }}>
                        {/* Línea central */}
                        <div style={{ position: 'absolute', top: '60px', left: '5%', right: '5%', height: '2px', background: 'linear-gradient(90deg, #38bdf8, #6366f1, #ef4444)', borderRadius: '2px', zIndex: 0 }} />

                        <div style={{ display: 'flex', gap: '0', minWidth: '900px', justifyContent: 'space-between', padding: '0 2rem', position: 'relative', zIndex: 1 }}>
                            {STEPS.map((s, idx) => (
                                <motion.button
                                    key={s.id}
                                    onClick={() => setCurrentStep(idx)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                                        background: 'none', border: 'none', cursor: 'pointer', gap: '0.75rem',
                                        width: `${100 / STEPS.length}%`
                                    }}
                                >
                                    {/* Nodo */}
                                    <div style={{
                                        width: '48px', height: '48px', borderRadius: '50%',
                                        background: idx === currentStep ? s.color : '#0f172a',
                                        border: `3px solid ${idx === currentStep ? s.color : 'rgba(255,255,255,0.15)'}`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        boxShadow: idx === currentStep ? `0 0 20px ${s.color}80` : 'none',
                                        transition: '0.3s',
                                        color: idx === currentStep ? 'black' : s.color,
                                        flexShrink: 0
                                    }}>
                                        {React.cloneElement(s.icon, { size: 20 })}
                                    </div>
                                    {/* Badge mes */}
                                    <div style={{
                                        fontSize: '0.55rem', fontWeight: '900', letterSpacing: '2px',
                                        color: idx === currentStep ? s.color : '#475569',
                                        transition: '0.3s'
                                    }}>{s.month} {s.year}</div>
                                    {/* Título corto */}
                                    <div style={{
                                        fontSize: '0.65rem', fontWeight: 'bold', color: idx === currentStep ? 'white' : '#64748b',
                                        textAlign: 'center', lineHeight: 1.3, maxWidth: '80px',
                                        transition: '0.3s'
                                    }}>{s.title.split(':')[0]}</div>
                                    {/* Pastilla activa */}
                                    {idx === currentStep && (
                                        <motion.div
                                            layoutId="timeline-active"
                                            style={{
                                                background: s.color, color: 'black',
                                                fontSize: '0.5rem', fontWeight: '900', letterSpacing: '1px',
                                                padding: '2px 8px', borderRadius: '20px'
                                            }}
                                        >
                                            ACTIVO
                                        </motion.div>
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* SECCIÓN CAMPAÑAS DE AUDIO */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <CampaignSection />

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* MARCO LEGAL */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <LegalSection />

            {/* Presentation Controls Footer */}
            <footer style={{ 
                padding: '2rem 4rem', 
                borderTop: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(2, 6, 23, 0.8)'
            }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button 
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        style={{ 
                            background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', 
                            padding: '1rem 2rem', borderRadius: '15px', cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
                            display: 'flex', alignItems: 'center', gap: '10px', opacity: currentStep === 0 ? 0.3 : 1
                        }}
                    >
                        <ChevronLeft size={20} /> ANTERIOR
                    </button>
                    <button 
                        onClick={nextStep}
                        disabled={currentStep === STEPS.length - 1}
                        style={{ 
                            background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', 
                            padding: '1rem 2rem', borderRadius: '15px', cursor: currentStep === STEPS.length - 1 ? 'not-allowed' : 'pointer',
                            display: 'flex', alignItems: 'center', gap: '10px', opacity: currentStep === STEPS.length - 1 ? 0.3 : 1
                        }}
                    >
                        SIGUIENTE <ChevronRight size={20} />
                    </button>
                </div>

                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 'bold' }}>CICLO DE INNOVACIÓN ÁGIL RDMLS</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: '900', color: '#38bdf8' }}>90 DÍAS DE EJECUCIÓN ➔ 100% SOBERANO</div>
                </div>
            </footer>

            <HechoEnChile dark={true} />

            {/* RADIO EVOLUCIÓN: SOVEREIGN AUDIO ENGINE */}
            <motion.div 
                drag 
                dragMomentum={false}
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    right: '30px',
                    zIndex: 1000,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '0.75rem',
                    cursor: 'grab'
                }}
            >
                <AnimatePresence>
                    {isRadioPlaying && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.9 }}
                            style={{
                                background: 'rgba(2, 6, 23, 0.97)',
                                border: '1px solid rgba(56, 189, 248, 0.35)',
                                padding: '1.2rem 1.4rem',
                                borderRadius: '20px',
                                width: '300px',
                                backdropFilter: 'blur(16px)',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.6), 0 0 30px rgba(56,189,248,0.08)'
                            }}
                        >
                            {/* Header */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.8rem' }}>
                                <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '18px' }}>
                                    {[1,2,3,4].map(i => (
                                        <motion.div key={i}
                                            animate={{ height: isNarrating ? [3,8,3] : [5,15,8,18,5] }}
                                            transition={{ repeat: Infinity, duration: isNarrating ? 0.4 : 0.5 + i*0.1 }}
                                            style={{ width: '3px', background: isNarrating ? '#ef4444' : '#38bdf8', borderRadius: '10px' }}
                                        />
                                    ))}
                                </div>
                                <div style={{ fontSize: '0.58rem', fontWeight: '900', color: isNarrating ? '#ef4444' : '#38bdf8', letterSpacing: '2px' }}>
                                    {isNarrating ? '🎙️ LOCUTOR EN VIVO' : '🎵 RADIO EVOLUCIÓN'}
                                </div>
                                <div style={{ marginLeft: 'auto', fontSize: '0.55rem', background: '#e63946', color: 'white', padding: '2px 7px', borderRadius: '4px', fontWeight: 'bold' }}>EN VIVO</div>
                            </div>

                            {/* Track info */}
                            <div style={{ fontSize: '0.78rem', fontWeight: 'bold', color: 'white', marginBottom: '0.3rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {currentMinicast || 'Sintonizando señal...'}
                            </div>
                            <div style={{ fontSize: '0.58rem', color: '#64748b', marginBottom: '1rem' }}>
                                Motor: Web Speech API · Voz humanizada Google/Microsoft
                            </div>

                            {/* Progress bar animada */}
                            <div style={{ background: 'rgba(255,255,255,0.06)', height: '3px', borderRadius: '10px', overflow: 'hidden', marginBottom: '1rem' }}>
                                <motion.div
                                    animate={{ width: ['0%', '100%'] }}
                                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                                    style={{ height: '100%', background: 'linear-gradient(90deg, #38bdf8, #e63946)', borderRadius: '10px' }}
                                />
                            </div>

                            {/* Controles: skip-narracion / play-pause / next + volumen */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <button
                                    onClick={skipNarration}
                                    title="Saltar narración"
                                    style={{ background: isNarrating ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.06)', border: `1px solid ${isNarrating ? '#ef4444' : 'rgba(255,255,255,0.1)'}`, borderRadius: '8px', width: '32px', height: '32px', cursor: 'pointer', color: isNarrating ? '#ef4444' : '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <ChevronLeft size={16} />
                                </button>
                                <button
                                    onClick={togglePlayPause}
                                    title={isPaused ? 'Reanudar' : 'Pausar'}
                                    style={{ background: '#38bdf8', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(56,189,248,0.4)', flexShrink: 0 }}>
                                    {isPaused ? <Play size={18} /> : <Pause size={18} />}
                                </button>
                                <button
                                    onClick={playNextTrack}
                                    title="Siguiente pista"
                                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', width: '32px', height: '32px', cursor: 'pointer', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <ChevronRight size={16} />
                                </button>
                                {/* Volumen */}
                                <div style={{ marginLeft: '4px', display: 'flex', alignItems: 'center', gap: '5px', flex: 1 }}>
                                    <Volume2 size={13} color="#64748b" />
                                    <input type="range" min="0" max="1" step="0.05"
                                        value={radioVolume}
                                        onChange={e => {
                                            const v = parseFloat(e.target.value);
                                            setRadioVolume(v);
                                            if (audioRef.current && !isNarrating) audioRef.current.volume = v;
                                        }}
                                        style={{ flex: 1, accentColor: '#38bdf8', cursor: 'pointer' }}
                                    />
                                </div>
                            </div>

                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Botón principal ON/OFF */}
                <button
                    onClick={toggleRadio}
                    style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: isRadioPlaying ? '#e63946' : 'rgba(230, 57, 70, 0.12)',
                        border: `2px solid ${isRadioPlaying ? '#e63946' : 'rgba(230,57,70,0.4)'}`,
                        color: isRadioPlaying ? 'white' : '#e63946',
                        cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: isRadioPlaying ? '0 0 25px rgba(230,57,70,0.5)' : 'none',
                        transition: '0.3s'
                    }}
                >
                    {isRadioPlaying ? <Volume2 size={26} /> : <VolumeX size={26} />}
                </button>
            </motion.div>

            <style>{`
                @keyframes vls-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
                .vls-floating { animation: vls-float 4s ease-in-out infinite; }
                .vls-floating-alt { animation: vls-float 6s ease-in-out infinite reverse; }
                
                @media (max-width: 900px) {
                    .showroom-main { flex-direction: column !important; }
                    .milestones-sidebar { 
                        width: 100% !important; 
                        height: auto !important; 
                        border-right: none !important; 
                        border-bottom: 1px solid rgba(255,255,255,0.05) !important;
                        padding: 1rem !important;
                    }
                    .milestones-list { 
                        flex-direction: row !important; 
                        overflow-x: auto !important; 
                        padding-bottom: 0.5rem !important;
                    }
                    .milestone-item { width: auto !important; min-width: 150px !important; }
                    .sidebar-clock-container, .sidebar-status-container { display: none !important; }
                    
                    .presentation-grid { 
                        grid-template-columns: 1fr !important; 
                        padding: 1.5rem !important;
                        gap: 2rem !important;
                    }
                    .step-title { fontSize: 2rem !important; }
                    .visual-stage { height: 300px !important; order: -1; }
                    .hide-mobile { display: none !important; }
                }

                @media (max-width: 480px) {
                    .showroom-nav { padding: 1rem !important; }
                    .action-buttons button { width: 100% !important; justify-content: center !important; }
                    .tech-grid { grid-template-columns: 1fr !important; }
                }
                
                .milestones-list::-webkit-scrollbar { height: 4px; }
                .milestones-list::-webkit-scrollbar-thumb { background: rgba(56, 189, 248, 0.2); borderRadius: 10px; }
            `}</style>
            
            {/* Botón Flotante para Serenito Rap */}
            <motion.div 
                drag 
                dragMomentum={false}
                style={{
                    position: 'fixed',
                    bottom: '250px', // Lo subimos un poco para que no parta montado sobre la radio expandida
                    right: '30px',
                    zIndex: 90000,
                    cursor: 'grab'
                }}
            >
                <button 
                    onClick={() => setShowSerenitoRap(true)}
                    className="vls-floating"
                    style={{
                        background: 'linear-gradient(135deg, #f43f5e, #e11d48)',
                        border: '2px solid rgba(255,255,255,0.2)',
                        borderRadius: '50px',
                        padding: '0.8rem 1.5rem',
                        color: 'white',
                        fontWeight: '900',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        boxShadow: '0 10px 25px rgba(244,63,94,0.4)',
                        cursor: 'pointer'
                    }}
                >
                    <Play size={20} fill="white" />
                    <span>VER SERENITO RAP</span>
                </button>
            </motion.div>

            {/* Modal Visor Interno Serenito Rap */}
            <AnimatePresence>
                {showSerenitoRap && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(2, 6, 23, 0.95)',
                            backdropFilter: 'blur(10px)',
                            zIndex: 100000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem'
                        }}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            style={{
                                width: '100%',
                                maxWidth: '900px',
                                background: '#0f172a',
                                borderRadius: '24px',
                                border: '1px solid rgba(56, 189, 248, 0.2)',
                                overflow: 'hidden',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: '32px', height: '32px', background: '#e11d48', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Music size={16} color="white" />
                                    </div>
                                    <div>
                                        <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>Serenito Rap Oficial</div>
                                        <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Producción 3D VecinoSmart</div>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setShowSerenitoRap(false)}
                                    style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '0.5rem' }}
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            <div style={{ width: '100%', aspectRatio: '16/9', background: '#000' }}>
                                <iframe 
                                    width="100%" 
                                    height="100%" 
                                    src="https://www.youtube.com/embed/_MeFYP4PkqU?autoplay=1&rel=0&modestbranding=1" 
                                    title="Serenito Rap" 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {showSeguridadVecinal && <SeguridadVecinal onClose={() => setShowSeguridadVecinal(false)} />}
        </div>
    );
}
