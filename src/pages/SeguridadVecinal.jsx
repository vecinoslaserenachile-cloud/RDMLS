import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShieldAlert, Phone, MapPin, Camera, Siren, Eye, AlertTriangle,
    CheckCircle, ArrowRight, X, ChevronRight, ShieldCheck, Radio,
    Flame, Zap, Droplets, Dog, Car, Moon, Sun, Users, Lock,
    Smartphone, Wifi, Heart, Navigation, Bell, Volume2, ExternalLink,
    HomeIcon, Info, Clock, Map
} from 'lucide-react';
import QuickEmergencyBar from '../components/QuickEmergencyBar';

/* ─────────────── DATOS ─────────────── */
const EMERGENCY_CONTACTS = [
    { id: 'muni_seguridad', label: 'Seguridad Ciudadana LS', number: '1457', color: '#fbbf24', icon: ShieldAlert, desc: 'Seguridad Municipal La Serena' },
    { id: 'carabineros', label: 'Carabineros', number: '133', color: '#10b981', icon: ShieldAlert, desc: 'Seguridad y orden público' },
    { id: 'bomberos', label: 'Bomberos', number: '132', color: '#ef4444', icon: Flame, desc: 'Incendios y rescate' },
    { id: 'samu', label: 'SAMU', number: '131', color: '#3b82f6', icon: Heart, desc: 'Emergencias médicas' },
    { id: 'pdi', label: 'PDI', number: '134', color: '#8b5cf6', icon: Eye, desc: 'Policía de Investigaciones' },
    { id: 'onemi', label: 'Senapred', number: '1470', color: '#f59e0b', icon: AlertTriangle, desc: 'Emergencias y catástrofes' },
    { id: 'serena', label: 'Muni La Serena', number: '(51) 2 206 000', color: '#14b8a6', icon: HomeIcon, desc: 'Municipio de La Serena' },
];

const SAFETY_TIPS = [
    {
        id: 't1', icon: Moon, color: '#6366f1',
        title: 'Seguridad Nocturna',
        tips: [
            'Camina por calles bien iluminadas y evita atajos oscuros.',
            'Mantén tu celular guardado y visible solo cuando sea necesario.',
            'Informa a alguien de confianza tu ruta y hora de llegada.',
            'Usa auriculares solo en un oído para mantener alerta auditiva.',
        ]
    },
    {
        id: 't2', icon: Car, color: '#f59e0b',
        title: 'Seguridad Vial',
        tips: [
            'Verifica que estaciones Uber/taxi sean las oficiales en la app.',
            'Comparte tu viaje en tiempo real con un familiar.',
            'Fotografía la patente antes de subir a un taxi no solicitado.',
            'En caso de sensación de peligro, pide parar en un lugar público.',
        ]
    },
    {
        id: 't3', icon: Smartphone, color: '#10b981',
        title: 'Seguridad Digital',
        tips: [
            'No compartas tu ubicación en redes sociales en tiempo real.',
            'Activa la doble autenticación en tus cuentas importantes.',
            'Desconfía de llamadas que pidan datos bancarios urgentes.',
            'Usa redes Wi-Fi públicas solo con VPN activada.',
        ]
    },
    {
        id: 't4', icon: HomeIcon, color: '#ec4899',
        title: 'Seguridad del Hogar',
        tips: [
            'Une con tus vecinos en una red de vigilancia comunitaria.',
            'Instala cámaras en puntos ciegos de tu propiedad.',
            'Evita publicar ausencias prolongadas en redes sociales.',
            'Mantén actualizado el listado de contactos de emergencia a la vista.',
        ]
    },
    {
        id: 't5', icon: Dog, color: '#f97316',
        title: 'Animales en Vía Pública',
        tips: [
            'No acorrales ni ates animales en vía pública — reporta al municipio.',
            'En caso de mordedura, lava la herida y acude al SAMU (131).',
            'Llama al Departamento de Salud Municipal (+56 51 2 206 000).',
            'Reporta jaurías a través del portal ciudadano de VLS.',
        ]
    },
    {
        id: 't6', icon: Droplets, color: '#0ea5e9',
        title: 'Emergencias Hídrico-Eléctricas',
        tips: [
            'Agua cortada: llama a Aguas del Valle (600 601 6000).',
            'Luz cortada: llama a Enel (600 900 1000).',
            'Fuga de gas: llama a Lipigas (600 600 7777) y ventila el espacio.',
            'Nunca operes tableros eléctricos con humedad en manos.',
        ]
    },
];

const SENAPRED_PROTOCOLS = [
    { id: 'p1', label: 'Sismo', icon: '🌍', steps: ['Agáchate, cúbrete y sosténte.', 'Aléjate de ventanas y objetos que puedan caer.', 'Al cesar el movimiento, evacua si hay daños o gas.', 'Escucha las instrucciones de Senapred (1470 / radio).'] },
    { id: 'p2', label: 'Tsunam', icon: '🌊', steps: ['Ante sismo fuerte en zona costera: evacua de inmediato.', 'No esperes la alarma; el sismo ES la señal.', 'Dirígete hacia zonas altas (> 20 m s.n.m.).', 'No vuelvas a la costa hasta que autoridades lo indiquen.'] },
    { id: 'p3', label: 'Incendio', icon: '🔥', steps: ['Activa la alarma y llama al 132.', 'Evacua por las rutas de escape establecidas.', 'Usa escaleras, nunca el ascensor.', 'Si hay humo, agáchate y cubre boca/nariz con tela húmeda.'] },
    { id: 'p4', label: 'Aluvión', icon: '⛰️', steps: ['Ante lluvias intensas en zona andina, aléjate de quebradas.', 'No intentes cruzar cauces de agua en crecida.', 'Sigue la señalética de evacuación municipal.', 'Llama al número de emergencias 1470 si hay personas atrapadas.'] },
];

/* ─────────────── COMPONENTE TARJETA TIP ─────────────── */
function TipCard({ section }) {
    const [open, setOpen] = useState(false);
    const Icon = section.icon;
    return (
        <motion.div
            layout
            onClick={() => setOpen(o => !o)}
            style={{
                background: `linear-gradient(135deg, ${section.color}12, rgba(15,23,42,0.8))`,
                border: `1px solid ${section.color}40`,
                borderRadius: '20px',
                padding: '1.5rem',
                cursor: 'pointer',
                overflow: 'hidden',
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: open ? '1rem' : 0 }}>
                <div style={{ background: section.color, padding: '10px', borderRadius: '14px', color: 'white', flexShrink: 0 }}>
                    <Icon size={22} />
                </div>
                <span style={{ color: 'white', fontWeight: '800', fontSize: '1rem', flex: 1 }}>{section.title}</span>
                <motion.div animate={{ rotate: open ? 90 : 0 }} style={{ color: section.color }}>
                    <ChevronRight size={20} />
                </motion.div>
            </div>
            <AnimatePresence>
                {open && (
                    <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}
                    >
                        {section.tips.map((tip, i) => (
                            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.7rem', color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                <CheckCircle size={15} style={{ color: section.color, marginTop: '3px', flexShrink: 0 }} />
                                {tip}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

/* ─────────────── COMPONENTE PROTOCOLO SENAPRED ─────────────── */
function ProtocolCard({ protocol, isActive, onClick }) {
    return (
        <motion.div
            onClick={onClick}
            whileHover={{ scale: 1.03 }}
            style={{
                background: isActive ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.04)',
                border: isActive ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '1.2rem',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.3s'
            }}
        >
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{protocol.icon}</div>
            <span style={{ color: 'white', fontWeight: '800', fontSize: '0.9rem' }}>{protocol.label}</span>
        </motion.div>
    );
}

/* ─────────────── COMPONENTE PRINCIPAL ─────────────── */
export default function SeguridadVecinal({ onClose }) {
    const [activeProtocol, setActiveProtocol] = useState(null);
    const [callTarget, setCallTarget] = useState(null);
    const [reportFormOpen, setReportFormOpen] = useState(false);
    const [reportSent, setReportSent] = useState(false);
    const [reportData, setReportData] = useState({ tipo: '', descripcion: '', ubicacion: '' });
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [activeSection, setActiveSection] = useState('emergencia');

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const handleReport = (tipo) => {
        setReportData(prev => ({ ...prev, tipo }));
        setReportFormOpen(true);
    };

    const submitReport = () => {
        if (!reportData.descripcion || !reportData.ubicacion) {
            alert('Por favor completa la descripción y la ubicación.');
            return;
        }
        window.dispatchEvent(new CustomEvent('vls-show-alert', {
            detail: { title: '📍 Reporte Enviado', message: `Reporte "${reportData.tipo}" recibido. El equipo VLS lo atenderá a la brevedad.`, type: 'success' }
        }));
        setReportSent(true);
        setTimeout(() => {
            setReportFormOpen(false);
            setReportSent(false);
            setReportData({ tipo: '', descripcion: '', ubicacion: '' });
        }, 2500);
    };

    const sections = [
        { id: 'emergencia', label: '🚨 Emergencias', icon: ShieldAlert },
        { id: 'consejos', label: '🛡️ Consejos', icon: ShieldCheck },
        { id: 'protocolos', label: '📋 Protocolos', icon: AlertTriangle },
        { id: 'reporte', label: '📸 Reportar', icon: Camera },
    ];

    return (
        <div style={{
            position: onClose ? 'fixed' : 'relative',
            inset: onClose ? 0 : undefined,
            zIndex: onClose ? 3000000 : undefined,
            overflowY: onClose ? 'auto' : undefined,
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #020617 0%, #0f172a 40%, #1e0a2e 100%)',
            fontFamily: '"Inter", -apple-system, sans-serif',
            color: 'white',
            paddingBottom: '6rem'
        }}>
            {/* ── HERO ── */}
            <div style={{
                background: 'linear-gradient(180deg, rgba(239,68,68,0.15) 0%, transparent 100%)',
                padding: isMobile ? '3rem 1.5rem 2rem' : '5rem 4rem 3rem',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(239,68,68,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

                {/* CLOSE BUTTON */}
                {onClose && (
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 10,
                            background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)',
                            borderRadius: '50%', width: '44px', height: '44px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', color: '#ef4444', transition: 'all 0.2s'
                        }}
                        aria-label="Cerrar portal de seguridad"
                    >
                        <X size={20} />
                    </button>
                )}

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    style={{
                        width: '80px', height: '80px', borderRadius: '24px',
                        background: 'linear-gradient(135deg, #ef4444, #7f1d1d)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                        boxShadow: '0 20px 40px rgba(239,68,68,0.3)'
                    }}
                >
                    <ShieldAlert size={42} color="white" />
                </motion.div>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
                    style={{ fontSize: isMobile ? '2rem' : '3.5rem', fontWeight: 900, margin: '0 0 1rem', lineHeight: 1.1 }}
                >
                    Portal de <span style={{ color: '#ef4444' }}>Seguridad</span> Vecinal
                </motion.h1>
                <motion.p
                    initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                    style={{ color: 'rgba(255,255,255,0.65)', fontSize: isMobile ? '1rem' : '1.2rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}
                >
                    Contactos de emergencia, protocolos activos y reporte ciudadano para La Serena y la Región de Coquimbo.
                </motion.p>

                {/* SOS PRINCIPAL */}
                <motion.a
                    href="tel:133"
                    whileHover={{ scale: 1.05, boxShadow: '0 30px 60px rgba(239,68,68,0.5)' }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: '1rem',
                        padding: '1rem 2.5rem',
                        background: 'linear-gradient(135deg, #ef4444, #7f1d1d)',
                        borderRadius: '50px', border: 'none',
                        color: 'white', fontWeight: 900, fontSize: isMobile ? '1rem' : '1.2rem',
                        textDecoration: 'none',
                        boxShadow: '0 20px 40px rgba(239,68,68,0.3)',
                        cursor: 'pointer'
                    }}
                >
                    <Phone size={22} className="animate-pulse" />
                    LLAMAR AL 133 — EMERGENCIA
                </motion.a>
            </div>

            {/* ── QUICK EMERGENCY BAR ── */}
            <div style={{ padding: '0 1rem', marginTop: '1.5rem' }}>
                <QuickEmergencyBar />
            </div>

            {/* ── NAV TABS ── */}
            <div style={{
                display: 'flex', gap: '0.5rem', overflowX: 'auto',
                padding: '1rem 1rem 0.5rem', scrollbarWidth: 'none',
                justifyContent: isMobile ? 'flex-start' : 'center'
            }}>
                {sections.map(s => (
                    <motion.button
                        key={s.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveSection(s.id)}
                        style={{
                            padding: '0.7rem 1.4rem',
                            borderRadius: '50px',
                            border: 'none',
                            background: activeSection === s.id
                                ? 'linear-gradient(135deg, #ef4444, #991b1b)'
                                : 'rgba(255,255,255,0.06)',
                            color: 'white',
                            fontWeight: 800,
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            boxShadow: activeSection === s.id ? '0 8px 20px rgba(239,68,68,0.3)' : 'none',
                            transition: 'all 0.2s'
                        }}
                    >
                        {s.label}
                    </motion.button>
                ))}
            </div>

            {/* ── CONTENIDO POR SECCIÓN ── */}
            <div style={{ maxWidth: '1100px', margin: '2rem auto', padding: '0 1rem' }}>
                <AnimatePresence mode="wait">

                    {/* EMERGENCIAS */}
                    {activeSection === 'emergencia' && (
                        <motion.div key="emergencia" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                            <h2 style={{ textAlign: 'center', fontWeight: 900, fontSize: '1.5rem', color: '#ef4444', marginBottom: '2rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
                                Números de Emergencia
                            </h2>
                            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)', gap: '1rem' }}>
                                {EMERGENCY_CONTACTS.map(contact => {
                                    const Icon = contact.icon;
                                    return (
                                        <motion.a
                                            key={contact.id}
                                            href={`tel:${contact.number.replace(/\D/g, '')}`}
                                            whileHover={{ scale: 1.04, y: -4 }}
                                            whileTap={{ scale: 0.96 }}
                                            style={{
                                                display: 'flex', flexDirection: 'column', alignItems: 'center',
                                                gap: '0.75rem', padding: '1.5rem 1rem',
                                                background: `linear-gradient(135deg, ${contact.color}15, rgba(15,23,42,0.8))`,
                                                border: `1px solid ${contact.color}40`,
                                                borderRadius: '20px', textDecoration: 'none',
                                                textAlign: 'center',
                                                boxShadow: `0 8px 20px ${contact.color}10`
                                            }}
                                        >
                                            <div style={{ background: contact.color, padding: '12px', borderRadius: '16px', color: 'white', boxShadow: `0 8px 20px ${contact.color}40` }}>
                                                <Icon size={26} />
                                            </div>
                                            <div>
                                                <div style={{ color: 'white', fontWeight: 900, fontSize: '1rem' }}>{contact.label}</div>
                                                <div style={{ color: contact.color, fontWeight: 900, fontSize: '1.5rem', lineHeight: 1.2 }}>{contact.number}</div>
                                                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', marginTop: '4px' }}>{contact.desc}</div>
                                            </div>
                                        </motion.a>
                                    );
                                })}
                            </div>

                            {/* Ruta segura IA */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                                onClick={() => window.dispatchEvent(new CustomEvent('open-safe-route'))}
                                style={{
                                    marginTop: '2rem', padding: '1.5rem 2rem',
                                    background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(15,23,42,0.9))',
                                    border: '1px solid rgba(99,102,241,0.4)',
                                    borderRadius: '20px', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', gap: '1.5rem'
                                }}
                            >
                                <div style={{ background: '#6366f1', padding: '14px', borderRadius: '16px', color: 'white' }}>
                                    <Navigation size={28} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ color: 'white', fontWeight: 900, fontSize: '1.1rem' }}>Ruta Segura IA</div>
                                    <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Calcula el trayecto más seguro de La Serena usando inteligencia artificial y datos de incidentes en tiempo real.</div>
                                </div>
                                <ArrowRight size={22} style={{ color: '#6366f1' }} />
                            </motion.div>
                        </motion.div>
                    )}

                    {/* CONSEJOS */}
                    {activeSection === 'consejos' && (
                        <motion.div key="consejos" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                            <h2 style={{ textAlign: 'center', fontWeight: 900, fontSize: '1.5rem', color: '#10b981', marginBottom: '2rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
                                Guía de Autoprotección
                            </h2>
                            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1rem' }}>
                                {SAFETY_TIPS.map(section => (
                                    <TipCard key={section.id} section={section} />
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* PROTOCOLOS SENAPRED */}
                    {activeSection === 'protocolos' && (
                        <motion.div key="protocolos" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                            <h2 style={{ textAlign: 'center', fontWeight: 900, fontSize: '1.5rem', color: '#f59e0b', marginBottom: '0.5rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
                                Protocolos de Emergencia
                            </h2>
                            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', marginBottom: '2rem', fontSize: '0.9rem' }}>
                                Selecciona un escenario para ver los pasos de actuación.
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                {SENAPRED_PROTOCOLS.map(p => (
                                    <ProtocolCard
                                        key={p.id}
                                        protocol={p}
                                        isActive={activeProtocol?.id === p.id}
                                        onClick={() => setActiveProtocol(activeProtocol?.id === p.id ? null : p)}
                                    />
                                ))}
                            </div>

                            <AnimatePresence>
                                {activeProtocol && (
                                    <motion.div
                                        key={activeProtocol.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        style={{
                                            background: 'rgba(239,68,68,0.1)',
                                            border: '1px solid rgba(239,68,68,0.4)',
                                            borderRadius: '20px', padding: '2rem'
                                        }}
                                    >
                                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#ef4444', fontSize: '1.3rem', fontWeight: 900, marginBottom: '1.5rem' }}>
                                            <span style={{ fontSize: '1.8rem' }}>{activeProtocol.icon}</span>
                                            Protocolo: {activeProtocol.label}
                                        </h3>
                                        <ol style={{ margin: 0, padding: '0 0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            {activeProtocol.steps.map((step, i) => (
                                                <motion.li
                                                    key={i}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem', lineHeight: '1.6' }}
                                                >
                                                    {step}
                                                </motion.li>
                                            ))}
                                        </ol>
                                        <a
                                            href="https://www.senapred.cl" target="_blank" rel="noopener noreferrer"
                                            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '1.5rem', color: '#f59e0b', fontSize: '0.85rem', fontWeight: 'bold', textDecoration: 'none' }}
                                        >
                                            <ExternalLink size={14} /> Ver más en Senapred.cl
                                        </a>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Línea Senapred */}
                            <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <AlertTriangle size={28} style={{ color: '#f59e0b', flexShrink: 0 }} />
                                <div>
                                    <div style={{ color: 'white', fontWeight: 900 }}>Línea Senapred</div>
                                    <a href="tel:1470" style={{ color: '#f59e0b', fontWeight: 900, fontSize: '1.5rem', textDecoration: 'none' }}>1470</a>
                                    <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginLeft: '0.75rem' }}>disponible 24/7 a nivel nacional</span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* FORMULARIO DE REPORTE */}
                    {activeSection === 'reporte' && (
                        <motion.div key="reporte" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                            <h2 style={{ textAlign: 'center', fontWeight: 900, fontSize: '1.5rem', color: '#8b5cf6', marginBottom: '0.5rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
                                Reportar Incidente
                            </h2>
                            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', marginBottom: '2rem', fontSize: '0.9rem' }}>
                                Tu reporte va directamente al equipo de monitoreo VLS y puede salvar vidas.
                            </p>

                            <div style={{ maxWidth: '640px', margin: '0 auto', background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: '24px', padding: '2rem' }}>
                                {reportSent ? (
                                    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ textAlign: 'center', padding: '3rem' }}>
                                        <CheckCircle size={60} style={{ color: '#10b981', margin: '0 auto 1rem' }} />
                                        <h3 style={{ color: '#10b981', fontWeight: 900, fontSize: '1.5rem' }}>¡Reporte Enviado!</h3>
                                        <p style={{ color: 'rgba(255,255,255,0.6)' }}>El equipo VLS ha recibido tu alerta y dará seguimiento.</p>
                                    </motion.div>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                        <div>
                                            <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>TIPO DE INCIDENTE *</label>
                                            <select
                                                value={reportData.tipo}
                                                onChange={e => setReportData(p => ({ ...p, tipo: e.target.value }))}
                                                style={{ width: '100%', padding: '0.9rem 1rem', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', color: 'white', fontSize: '1rem', outline: 'none' }}
                                            >
                                                <option value="">Selecciona una categoría...</option>
                                                <option value="Accidente vial">🚗 Accidente vial</option>
                                                <option value="Robo o asalto">🦹 Robo o asalto</option>
                                                <option value="Incendio">🔥 Incendio</option>
                                                <option value="Corte de agua">💧 Corte de agua</option>
                                                <option value="Falla eléctrica">⚡ Falla eléctrica</option>
                                                <option value="Animal en vía pública">🐕 Animal en vía pública</option>
                                                <option value="Bache o daño vial">🕳️ Bache o daño vial</option>
                                                <option value="Luminaria dañada">💡 Luminaria dañada</option>
                                                <option value="Otro">📋 Otro</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>DESCRIPCIÓN DEL INCIDENTE *</label>
                                            <textarea
                                                value={reportData.descripcion}
                                                onChange={e => setReportData(p => ({ ...p, descripcion: e.target.value }))}
                                                placeholder="Describe brevemente lo que está ocurriendo..."
                                                rows={4}
                                                style={{ width: '100%', padding: '0.9rem 1rem', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', color: 'white', fontSize: '0.95rem', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                                            />
                                        </div>

                                        <div>
                                            <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>UBICACIÓN APROXIMADA *</label>
                                            <input
                                                type="text"
                                                value={reportData.ubicacion}
                                                onChange={e => setReportData(p => ({ ...p, ubicacion: e.target.value }))}
                                                placeholder="Ej: Av. Francisco de Aguirre 100, La Serena"
                                                style={{ width: '100%', padding: '0.9rem 1rem', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', color: 'white', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
                                            />
                                        </div>

                                        {/* PHOTO UPLOAD (Rule 4) */}
                                        <div>
                                            <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>EVIDENCIA FOTOGRÁFICA (CÁMARA / GALERÍA)</label>
                                            <div style={{ display: 'flex', gap: '1rem' }}>
                                                <div 
                                                    onClick={() => document.getElementById('report-photo-input').click()}
                                                    style={{ 
                                                        flex: 1, height: '100px', background: 'rgba(255,255,255,0.05)', border: '2px dashed rgba(255,255,255,0.2)', 
                                                        borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                                        cursor: 'pointer', transition: 'all 0.3s', color: '#94a3b8'
                                                    }}
                                                >
                                                    {reportData.photo ? (
                                                        <img src={reportData.photo} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '13px' }} alt="Preview" />
                                                    ) : (
                                                        <>
                                                            <Camera size={24} style={{ marginBottom: '5px' }} />
                                                            <span style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>TOMAR FOTO</span>
                                                        </>
                                                    )}
                                                </div>
                                                <input 
                                                    id="report-photo-input" 
                                                    type="file" 
                                                    accept="image/*" 
                                                    capture="environment" 
                                                    style={{ display: 'none' }} 
                                                    onChange={(e) => {
                                                        const file = e.target.files[0];
                                                        if (file) {
                                                            const reader = new FileReader();
                                                            reader.onloadend = () => setReportData(p => ({ ...p, photo: reader.result }));
                                                            reader.readAsDataURL(file);
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                                            <motion.button
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                                onClick={() => {
                                                    if ('geolocation' in navigator) {
                                                        navigator.geolocation.getCurrentPosition(pos => {
                                                            setReportData(p => ({ ...p, ubicacion: `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}` }));
                                                        });
                                                    }
                                                }}
                                                style={{ flex: 1, padding: '0.9rem', background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', borderRadius: '12px', color: '#818cf8', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.85rem' }}
                                            >
                                                <MapPin size={16} /> Usar mi Ubicación
                                            </motion.button>

                                            <motion.button
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                                onClick={submitReport}
                                                style={{ flex: 2, padding: '0.9rem', background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', border: 'none', borderRadius: '12px', color: 'white', fontWeight: 900, cursor: 'pointer', fontSize: '1rem', boxShadow: '0 8px 20px rgba(139,92,246,0.4)' }}
                                            >
                                                📡 ENVIAR REPORTE
                                            </motion.button>
                                        </div>

                                        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', textAlign: 'center', marginTop: '0.25rem' }}>
                                            * En caso de emergencia activa, llama primero al 133, 132 o 131.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>

            {/* ── FOOTER VLS ── */}
            <div style={{ textAlign: 'center', padding: '3rem 1rem 2rem', borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <ShieldCheck size={18} style={{ color: '#10b981' }} />
                    <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Portal VLS — Seguridad Ciudadana • La Serena, Región de Coquimbo</span>
                </div>
                <motion.a
                    href="/"
                    whileHover={{ scale: 1.05 }}
                    style={{ color: '#38bdf8', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}
                >
                    ← Volver al portal principal
                </motion.a>
            </div>
        </div>
    );
}
