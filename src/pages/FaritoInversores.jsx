import React, { useState, useEffect } from 'react';
import { 
    Zap, Globe, TrendingUp, Shield, Users, DollarSign, 
    ChevronRight, Star, ArrowRight, CheckCircle, Lock,
    BarChart3, Rocket, Building2, HeartPulse, Gamepad2,
    Radio, MapPin, ExternalLink, Mail, Phone,
    Music, Lightbulb, UtensilsCrossed
} from 'lucide-react';

export default function FaritoInversores() {
    const [activeTab, setActiveTab] = useState('b2c');
    const [counters, setCounters] = useState({ modulos: 0, municipios: 0, usuarios: 0, modelos: 0 });
    const [visibleSections, setVisibleSections] = useState(new Set());

    // Animación de contadores al cargar
    useEffect(() => {
        const targets = { modulos: 64, municipios: 12, usuarios: 24500, modelos: 4 };
        const duration = 2000;
        const steps = 60;
        const interval = duration / steps;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            const eased = 1 - Math.pow(1 - progress, 3);
            setCounters({
                modulos: Math.floor(targets.modulos * eased),
                municipios: Math.floor(targets.municipios * eased),
                usuarios: Math.floor(targets.usuarios * eased),
                modelos: Math.floor(targets.modelos * eased),
            });
            if (step >= steps) clearInterval(timer);
        }, interval);
        return () => clearInterval(timer);
    }, []);

    const monetizacion = {
        b2c: {
            label: 'B2C · Economía Arcade',
            color: '#f59e0b',
            icon: <Gamepad2 size={24} />,
            titulo: 'Fichas VLS: El ciudadano paga jugando',
            descripcion: 'Cada vecino recibe 50 Fichas de bienvenida al validar su identidad. Las regana completando misiones cívicas reales (encuestas, rutinas, trivias) y las gasta en módulos premium: partidas de Super Serenito Bros, sesiones de SkyGuide RA y alquileres en el ClipClub. Un modelo freemium que convierte participación cívica en ingreso recurrente.',
            metricas: [
                { label: 'Precio ficha objetivo', valor: '$50 CLP' },
                { label: 'Fichas vendidas est./mes', valor: '15.000' },
                { label: 'MRR proyectado Año 1', valor: '$750k CLP' },
                { label: 'Ticket promedio', valor: '3 fichas/sesión' },
            ],
            items: [
                'Super Serenito Bros 3D · 1 ficha/partida',
                'SkyGuide RA observatorio · 1 ficha/sesión',
                'Vecinos ClipClub alquiler · 1-3 fichas/título',
                'Perfil ciudadano destacado · 5 fichas/mes',
                'Acceso especial a eventos en vivo · 10 fichas'
            ]
        },
        b2b: {
            label: 'B2B · Directorio & Real Estate',
            color: '#10b981',
            icon: <Building2 size={24} />,
            titulo: 'Cada profesional local, un cliente nuestro',
            descripcion: 'Corredoras de propiedades, clínicas veterinarias, arquitectos, restaurantes y pubs pagan mensualmente por destacar sus fichas en nuestro ecosistema. Nuestro modelo Freemium Gastro permite a cada local publicar 1 evento gratis al mes en el Portal de Panoramas, escalando con fichas o suscripción Pro.',
            metricas: [
                { label: 'Plan Gastro Freemium', valor: '1 evento GRATIS/mes' },
                { label: 'Plan Gastro Pro', valor: '$14.990/mes' },
                { label: 'Plan Premium (integración)', valor: '$120.000/mes' },
                { label: 'Mercado direccionable', valor: '800+ pymes locales' },
            ],
            items: [
                'Restoranes y Pubs · Plan Gastro Freemium: 1 evento gratis + fichas para más',
                'Corredoras de propiedades · Nuestro buscador inmobiliario hiperlocal',
                'Clínicas veterinarias · Módulo Amigos 360 con llamada directa',
                'Arquitectos y constructoras · Portal de Desarrollo Urbano',
                'Locales gastronómicos · Monitor de Venues y menú digital integrado',
                'Comercios y emprendedores · Marketplace Vecinal integrado'
            ]
        },
        b2g: {
            label: 'B2G · Social Listening & Data',
            color: '#38bdf8',
            icon: <BarChart3 size={24} />,
            titulo: 'La percepción ciudadana como servicio',
            descripcion: 'Lo que Municipalidades, SEREMIAs y empresas privadas pagan a consultoras por $10M CLP en metodología tradicional, Faro Centinel lo entrega en tiempo real y con datos gamificados. Cada encuesta del Termómetro Vecinal es una microencuesta auditada. Cada mención en RRSS es un dato de inteligencia territorial. Vendemos comprensión de la ciudad, no formularios.',
            metricas: [
                { label: 'Estudio de percepción básico', valor: '$800k CLP' },
                { label: 'Suscripción mensual municipio', valor: '$350k CLP/mes' },
                { label: 'Dataset personalizado empresa', valor: 'Desde $1.5M CLP' },
                { label: 'Municipios en región objetivo', valor: '15' },
            ],
            items: [
                'Termómetro Vecinal · Microencuestas por barrio en tiempo real',
                'Faro Centinel · Social Listening automatizado de RRSS públicas',
                'Mapas de calor de problemáticas urbanas georreferenciadas',
                'Reportes de percepción por servicio municipal (aseo, iluminación, seguridad)',
                'API de datos anonimizados para GORE, SERECO y consultoras'
            ]
        }
    };

    const ventajas = [
        { icon: <Zap size={32} color="#f59e0b" />, titulo: 'Carga en < 3 segundos', desc: 'Cloudflare Edge en 300 nodos globales. Sin servidor propio que colapse ni costear infraestructura dedicada. El portal carga más rápido que la mayoría de los sitios corporativos chilenos.' },
        { icon: <Shield size={32} color="#10b981" />, titulo: 'AI Honeypot Security', desc: 'Capa de señuelos activos que detecta y neutraliza bots, scrapers y atacantes automáticamente. Seguridad Zero Trust sin fricción para el usuario legítimo.' },
        { icon: <Globe size={32} color="#38bdf8" />, titulo: 'Bypass por Inyección de URL', desc: 'Nuestro modelo no requiere backend para multimedia: inyectamos URLs de socios (Google Maps, YouTube, radios, catálogos) directamente en el portal. Zero hosting costs para contenido de terceros.' },
        { icon: <Rocket size={32} color="#ec4899" />, titulo: 'WebXR Nativo en Móvil', desc: 'Videojuegos 3D, Realidad Aumentada astronómica y paseos históricos corriendo en el navegador del teléfono sin apps, sin webviews, con WebGL full performance.' },
        { icon: <Radio size={32} color="#a78bfa" />, titulo: 'Radio 24/7 con IA', desc: 'Emisora digital autónoma: genera locuciones, bloques musicales y noticias narradas automáticamente. Sin locutor humano permanente. Protocolo ICECAST sobre CDN edge.' },
        { icon: <TrendingUp size={32} color="#f97316" />, titulo: 'Código 100% Abierto y Modular', desc: '60+ módulos independientes. Cada uno es un chunk lazy-loaded: el usuario descarga solo lo que usa. Escalar a 15 municipios no requiere reescribir nada, solo clonar la configuración.' },
    ];

    const problema_datos = [
        { stat: '73%', desc: 'de los vecinos no sabe cómo hacer una denuncia municipal online', fuente: 'INE 2023' },
        { stat: '89%', desc: 'abandona apps municipales antes de completar un trámite', fuente: 'BID 2022' },
        { stat: '$0', desc: 'es cuánto gana la mayoría de portales municipales chilenos con su tráfico', fuente: 'Análisis VLS' },
        { stat: '4x', desc: 'más retención que apps similares gracias a la gamificación cívica', fuente: 'Benchmarks VLS' },
    ];

    return (
        <div style={{ minHeight: '100vh', background: '#020617', color: 'white', fontFamily: 'system-ui, -apple-system, sans-serif', overflowX: 'hidden' }}>
            
            {/* ══════════════════════════════════════════════════════════════
                SECCIÓN 1: HERO — EL GANCHO
            ══════════════════════════════════════════════════════════════ */}
            <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 2rem', textAlign: 'center', overflow: 'hidden' }}>
                {/* Fondo animado */}
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(56, 189, 248, 0.15), transparent)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(56,189,248,0.08) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none', opacity: 0.5 }} />
                
                {/* Nav */}
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(2,6,23,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '1rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src="/vls-logo-premium.png" alt="Vecinity" style={{ height: '40px' }} />
                        <span style={{ fontWeight: '900', fontSize: '1.1rem', color: '#38bdf8' }}>Vecinity Partners</span>
                    </div>
                    <div style={{ display: 'flex', gap: '20px', fontSize: '0.9rem' }}>
                        {['Problema', 'Modelo', 'Tecnología', 'Inversión'].map(s => (
                            <a key={s} href={`#${s.toLowerCase()}`} style={{ color: '#94a3b8', textDecoration: 'none' }}>{s}</a>
                        ))}
                    </div>
                    <a href="mailto:contacto@vecinosmart.cl" style={{ background: '#38bdf8', color: '#0f172a', padding: '8px 20px', borderRadius: '30px', fontWeight: 'bold', textDecoration: 'none', fontSize: '0.9rem' }}>
                        Contactar
                    </a>
                </div>

                <div style={{ maxWidth: '900px', position: 'relative', zIndex: 1 }}>
                    {/* Badge de credibilidad */}
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.3)', padding: '8px 20px', borderRadius: '50px', marginBottom: '2rem', fontSize: '0.85rem', color: '#38bdf8' }}>
                        <DollarSign size={14} color="#38bdf8" />
                        <span>Plataforma Transaccional Activa (Webpay & PayPal) · Región de Coquimbo</span>
                    </div>

                    <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: '900', lineHeight: 1.1, margin: '0 0 1.5rem 0', letterSpacing: '-1px' }}>
                        La Primera
                        <span style={{ display: 'block', background: 'linear-gradient(90deg, #38bdf8, #10b981, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                            Smart City Monetizada
                        </span>
                        de Chile
                    </h1>

                    <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', color: '#bae6fd', lineHeight: 1.6, marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
                        No somos un MVP en papel. Somos un ecosistema vivo con <strong>60+ módulos</strong> procesando pagos reales de vecinos hoy mismo. Turismo AR, salud y comercio local convertidos en valor cívico.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="#inversion" style={{ background: 'linear-gradient(90deg, #38bdf8, #0ea5e9)', color: '#0f172a', padding: '1.1rem 2.5rem', borderRadius: '50px', fontWeight: '900', textDecoration: 'none', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 10px 40px rgba(56,189,248,0.4)' }}>
                            <Lock size={18} /> Solicitar Data Room
                        </a>
                        <a href="https://vecinoslaserena.cl/rapido" target="_blank" rel="noreferrer" style={{ background: 'rgba(255,255,255,0.08)', color: 'white', padding: '1.1rem 2.5rem', borderRadius: '50px', fontWeight: 'bold', textDecoration: 'none', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(255,255,255,0.2)' }}>
                            <ExternalLink size={18} /> Ver Demo en Vivo
                        </a>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════
                MÉTRICAS HERO
            ══════════════════════════════════════════════════════════════ */}
            <section style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '3rem 2rem' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
                    {[
                        { n: counters.modulos + '+', label: 'Módulos en producción', color: '#38bdf8' },
                        { n: counters.municipios, label: 'Municipios región objetivo', color: '#10b981' },
                        { n: counters.usuarios.toLocaleString(), label: 'Usuarios potenciales inmediatos', color: '#f59e0b' },
                        { n: counters.modelos, label: 'Vías de monetización activas', color: '#ec4899' },
                    ].map((m, i) => (
                        <div key={i}>
                            <div style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '900', color: m.color, fontVariantNumeric: 'tabular-nums' }}>{m.n}</div>
                            <div style={{ color: '#94a3b8', fontSize: '0.95rem', marginTop: '5px' }}>{m.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════
                SECCIÓN 2: EL PROBLEMA Y NUESTRA SOLUCIÓN
            ══════════════════════════════════════════════════════════════ */}
            <section id="problema" style={{ padding: '8rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <div style={{ display: 'inline-block', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5', padding: '6px 16px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '1rem' }}>EL MERCADO ESTÁ ROTO</div>
                    <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '900', margin: '0 0 1.5rem 0' }}>El vecino chileno merece más que un PDF en una web que no carga</h2>
                    <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.7 }}>Cada municipio tiene 4 apps diferentes que nadie usa, sitios que colapsan el día de las patentes y formularios que requieren cédula de identidad, firma notarial y paciencia de santo. El resultado: desconfianza, desapego y brechas digitales que se heredan.</p>
                </div>

                {/* Datos del problema */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '6rem' }}>
                    {problema_datos.map((d, i) => (
                        <div key={i} style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)', padding: '2rem', borderRadius: '20px', textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', fontWeight: '900', color: '#ef4444' }}>{d.stat}</div>
                            <p style={{ color: '#cbd5e1', margin: '0.5rem 0 0 0', lineHeight: 1.4 }}>{d.desc}</p>
                            <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Fuente: {d.fuente}</span>
                        </div>
                    ))}
                </div>

                {/* La solución */}
                <div style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(56,189,248,0.05))', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '32px', padding: '4rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                    <div>
                        <div style={{ display: 'inline-block', background: 'rgba(16,185,129,0.2)', border: '1px solid #10b981', color: '#10b981', padding: '6px 16px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '1.5rem' }}>NUESTRA SOLUCIÓN</div>
                        <h3 style={{ fontSize: '2.5rem', fontWeight: '900', margin: '0 0 1.5rem 0', lineHeight: 1.2 }}>Un jardín vallado donde toda la vida digital local ocurre</h3>
                        <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: '2rem' }}>
                            Vecinity es el primer ecosistema de <strong>Smart City gamificada</strong> donde el vecino resuelve toda su experiencia digital local sin salir de la plataforma: trámites, entretenimiento, salud, seguridad, comercio local, participación cívica y cultura. Todo conectado. Todo premiado.
                        </p>
                        <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '0.95rem' }}>
                            Mientras las apps municipales piden que el ciudadano se adapte a sus procesos, nosotros nos adaptamos al ciudadano. No imponemos la tecnología: la disfrazamos de juego, de nostalgia, de comunidad.
                        </p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {[
                            { icon: <Gamepad2 size={20} color="#f59e0b" />, text: 'Entretenimiento RA y gamificación', color: '#f59e0b' },
                            { icon: <Users size={20} color="#38bdf8" />, text: 'Red social cívica con IA moderadora', color: '#38bdf8' },
                            { icon: <HeartPulse size={20} color="#ec4899" />, text: 'Salud preventiva y bienestar gratuito', color: '#ec4899' },
                            { icon: <Building2 size={20} color="#10b981" />, text: 'Directorio inmobiliario y comercial integrado', color: '#10b981' },
                            { icon: <Shield size={20} color="#a78bfa" />, text: 'Seguridad pública con Inteligencia C5', color: '#a78bfa' },
                            { icon: <Radio size={20} color="#f97316" />, text: 'Radio e identidad cultural 24/7', color: '#f97316' },
                        ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.03)', padding: '1rem 1.5rem', borderRadius: '12px', border: `1px solid ${item.color}20` }}>
                                {item.icon}
                                <span style={{ color: 'white', fontWeight: '600' }}>{item.text}</span>
                                <CheckCircle size={16} color="#10b981" style={{ marginLeft: 'auto', flexShrink: 0 }} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════
                SECCIÓN: ECOSISTEMA DE DOMINIOS (CASCADA RAÍZ)
            ══════════════════════════════════════════════════════════════ */}
            <section style={{ background: '#020617', padding: '6rem 2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <div style={{ display: 'inline-block', background: 'rgba(56,189,248,0.1)', border: '1px solid #38bdf8', color: '#38bdf8', padding: '6px 16px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '1rem' }}>INFRAESTRUCTURA DE RED</div>
                        <h2 style={{ fontSize: '3rem', fontWeight: '900', margin: '0 0 1rem 0' }}>El Ecosistema: 9 Dominios. 1 ADN.</h2>
                        <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>Nuestra arquitectura de "Cascada Raíz" permite captar tráfico hiper-segmentado y canalizarlo según la intención del ciudadano.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                        {/* PILAR 1: GOBIERNO & CIUDADANÍA */}
                        <div className="glass-panel-white" style={{ borderTop: '6px solid #38bdf8', padding: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                                <div style={{ background: '#38bdf820', padding: '10px', borderRadius: '12px' }}><Building2 size={24} color="#38bdf8" /></div>
                                <h4 style={{ margin: 0, fontSize: '1.2rem', color: 'white' }}>COMUNA SMART (G2C)</h4>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 15px', borderRadius: '10px', borderLeft: '4px solid #38bdf8' }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>comunasmart.cl</div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Nodo de Administración & Hub Regional</div>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 15px', borderRadius: '10px', borderLeft: '4px solid #38bdf8' }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>vecinoslaserena.cl</div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Portal Matriz - Interfaz de Usuario Principal</div>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 15px', borderRadius: '10px', borderLeft: '4px solid #38bdf8' }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>vecinoschile.cl</div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Escalamiento a nivel Nacional</div>
                                </div>
                            </div>
                        </div>

                        {/* PILAR 2: SOCIAL & NEGOCIOS */}
                        <div className="glass-panel-white" style={{ borderTop: '6px solid #10b981', padding: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                                <div style={{ background: '#10b98120', padding: '10px', borderRadius: '12px' }}><Users size={24} color="#10b981" /></div>
                                <h4 style={{ margin: 0, fontSize: '1.2rem', color: 'white' }}>VECINOS SMART (S2B)</h4>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 15px', borderRadius: '10px', borderLeft: '4px solid #10b981' }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>vecinossmart.cl</div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Red Social Cívica & Participación</div>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 15px', borderRadius: '10px', borderLeft: '4px solid #10b981' }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>entrevecinas.cl</div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Portal Legacy & Patrimonio Histórico</div>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 15px', borderRadius: '10px', borderLeft: '4px solid #10b981' }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>puertasmart.cl</div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>SGAAC - Control de Accesos & Seguridad</div>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 15px', borderRadius: '10px', borderLeft: '4px solid #10b981' }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>farito.cl</div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Landing Técnica para Partners & VC</div>
                                </div>
                            </div>
                        </div>

                        {/* PILAR 3: ENTRETENIMIENTO & RADIO */}
                        <div className="glass-panel-white" style={{ borderTop: '6px solid #f59e0b', padding: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                                <div style={{ background: '#f59e0b20', padding: '10px', borderRadius: '12px' }}><Radio size={24} color="#f59e0b" /></div>
                                <h4 style={{ margin: 0, fontSize: '1.2rem', color: 'white' }}>RADIO VECINAL (MEDIA)</h4>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 15px', borderRadius: '10px', borderLeft: '4px solid #f59e0b' }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>radiovecinos.cl</div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Red de Distribución Auditiva Comunal</div>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 15px', borderRadius: '10px', borderLeft: '4px solid #f59e0b' }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>rdmls.cl</div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Radio Digital Municipal La Serena</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════
                SECCIÓN 3: MODELO DE MONETIZACIÓN
            ══════════════════════════════════════════════════════════════ */}
            <section id="modelo" style={{ background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '8rem 2rem' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <div style={{ display: 'inline-block', background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', color: '#fcd34d', padding: '6px 16px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '1rem' }}>MOTOR ECONÓMICO</div>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '900', margin: '0 0 1rem 0' }}>3 Vías de Ingresos. 1 Solo Ecosistema.</h2>
                        <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>No dependemos de un solo modelo. Nuestra arquitectura de ingresos diversificados reduce el riesgo de concentración y nos permite escalar por capas.</p>
                    </div>

                    {/* Tabs */}
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '2.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {Object.entries(monetizacion).map(([key, val]) => (
                            <button key={key} onClick={() => setActiveTab(key)} style={{ background: activeTab === key ? val.color : 'rgba(255,255,255,0.05)', color: activeTab === key ? '#0f172a' : '#94a3b8', border: `1px solid ${activeTab === key ? val.color : 'rgba(255,255,255,0.1)'}`, padding: '12px 24px', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {val.icon} {val.label}
                            </button>
                        ))}
                    </div>

                    {/* Panel de contenido */}
                    {Object.entries(monetizacion).map(([key, val]) => (
                        activeTab === key && (
                            <div key={key} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', background: `linear-gradient(135deg, ${val.color}0D, rgba(2,6,23,0.9))`, border: `1px solid ${val.color}30`, borderRadius: '28px', padding: '3rem', alignItems: 'start' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.8rem', fontWeight: '900', margin: '0 0 1rem 0', color: val.color }}>{val.titulo}</h3>
                                    <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: '2rem' }}>{val.descripcion}</p>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        {val.items.map((item, i) => (
                                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: 'white', fontSize: '0.95rem' }}>
                                                <ChevronRight size={16} color={val.color} style={{ marginTop: '3px', flexShrink: 0 }} />
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    {val.metricas.map((m, i) => (
                                        <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${val.color}20`, padding: '1.5rem', borderRadius: '16px', textAlign: 'center' }}>
                                            <div style={{ fontSize: '1.5rem', fontWeight: '900', color: val.color }}>{m.valor}</div>
                                            <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '5px' }}>{m.label}</div>
                                        </div>
                                    ))}
                                    <div style={{ gridColumn: '1 / -1', background: `${val.color}15`, border: `1px solid ${val.color}40`, padding: '1.5rem', borderRadius: '16px', textAlign: 'center' }}>
                                        <div style={{ fontSize: '0.85rem', color: val.color, fontWeight: 'bold', letterSpacing: '1px', marginBottom: '5px' }}>PROYECCIÓN AÑO 3</div>
                                        <div style={{ fontSize: '2rem', fontWeight: '900', color: 'white' }}>x15 municipios</div>
                                        <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Escalamiento regional sin costo de reescritura</div>
                                    </div>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════
                SECCIÓN 4: VENTAJA INJUSTA — EL FOSO TECNOLÓGICO
            ══════════════════════════════════════════════════════════════ */}
            <section id="tecnología" style={{ padding: '8rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div style={{ display: 'inline-block', background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', color: '#c4b5fd', padding: '6px 16px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '1rem' }}>VENTAJA INJUSTA</div>
                    <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '900', margin: '0 0 1rem 0' }}>Hicimos lo que nadie sabía que era posible</h2>
                    <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.7 }}>60+ módulos con 3D nativo, IA integrada, radio autónoma y gamificación cívica, corriendo en Cloudflare CDN por el costo de un dominio. Nuestro foso tecnológico no es solo lo que construimos: es cómo lo construimos.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {ventajas.map((v, i) => (
                        <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '2rem', transition: 'all 0.3s' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}>
                            <div style={{ marginBottom: '1rem' }}>{v.icon}</div>
                            <h4 style={{ fontSize: '1.2rem', fontWeight: '800', margin: '0 0 0.8rem 0', color: 'white' }}>{v.titulo}</h4>
                            <p style={{ color: '#94a3b8', lineHeight: 1.6, margin: 0, fontSize: '0.95rem' }}>{v.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Comparativa vs tradicional */}
                <div style={{ marginTop: '5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', overflow: 'hidden' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ padding: '1.5rem 2rem', textAlign: 'center', color: '#64748b', fontWeight: 'bold', fontSize: '0.9rem', borderRight: '1px solid rgba(255,255,255,0.05)' }}>PLATAFORMA MUNICIPAL TRADICIONAL</div>
                        <div style={{ padding: '1.5rem 2rem', textAlign: 'center', background: 'rgba(56,189,248,0.1)', color: '#38bdf8', fontWeight: 'bold', fontSize: '0.9rem' }}>VECINITY (Nuestro Modelo)</div>
                    </div>
                    {[
                        ['Costo infraestructura anual', '$15M CLP (servidor dedicado)', '$650k CLP (CDN + Firebase)'],
                        ['Tiempo de carga promedio', '7-12 segundos', '< 3 segundos'],
                        ['Módulos funcionales', '2-5 (tramitación básica)', '60+ (todos en producción)'],
                        ['3D / RA en móvil', 'No disponible', 'WebXR nativo, sin app'],
                        ['Monetización activa', 'Ninguna', 'B2C + B2B + B2G'],
                        ['Escalamiento a otros municipios', 'Reescritura completa', 'Clonación de configuración'],
                    ].map(([cat, trad, nuestro], i) => (
                        <div key={i} style={{ display: 'grid', gridTemplateColumns: '0.6fr 1fr 1fr', borderBottom: i < 5 ? '1px solid rgba(255,255,255,0.03)' : 'none' }}>
                            <div style={{ padding: '1.2rem 2rem', color: '#64748b', fontSize: '0.85rem', borderRight: '1px solid rgba(255,255,255,0.05)' }}>{cat}</div>
                            <div style={{ padding: '1.2rem 2rem', color: '#ef4444', fontSize: '0.9rem', borderRight: '1px solid rgba(255,255,255,0.05)' }}>{trad}</div>
                            <div style={{ padding: '1.2rem 2rem', color: '#10b981', fontSize: '0.9rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle size={14} />{nuestro}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════
                SECCIÓN 5: CALL TO ACTION — EL LLAMADO
            ══════════════════════════════════════════════════════════════ */}
            <section id="inversion" style={{ padding: '8rem 2rem', background: 'linear-gradient(135deg, #0f172a, #1e3a8a, #0f172a)', borderTop: '1px solid rgba(56,189,248,0.2)' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ display: 'inline-block', background: 'rgba(56,189,248,0.15)', border: '1px solid rgba(56,189,248,0.3)', color: '#38bdf8', padding: '6px 16px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '1.5rem' }}>ÚNETE AL ECOSISTEMA</div>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '900', margin: '0 0 1.5rem 0', lineHeight: 1.1 }}>
                        El momento de<br />
                        <span style={{ color: '#38bdf8' }}>La Serena Digital</span><br />
                        es ahora.
                    </h2>
                    <p style={{ color: '#bae6fd', fontSize: '1.15rem', lineHeight: 1.7, marginBottom: '4rem', maxWidth: '650px', margin: '0 auto 4rem auto' }}>
                        No somos un prototipo. Somos una plataforma viva, en producción, con vecinos reales usándola hoy. Solo necesitamos el músculo financiero para llevar este ecosistema a los 15 municipios de la región y escalar a nivel nacional.
                    </p>

                    {/* Tres botones CTA */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
                        {/* CTA 1: Data Room para VCs */}
                        <div style={{ background: 'linear-gradient(135deg, rgba(56,189,248,0.2), rgba(6,182,212,0.1))', border: '2px solid #38bdf8', borderRadius: '24px', padding: '2rem', textAlign: 'center' }}>
                            <Lock size={36} color="#38bdf8" style={{ marginBottom: '1rem' }} />
                            <h3 style={{ fontSize: '1.2rem', margin: '0 0 0.8rem 0' }}>Fondos & Inversores VC</h3>
                            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>Platanus, Broota, CORFO y family offices: accede a nuestro Data Room completo con métricas, cap table y proyecciones auditadas.</p>
                            <a href="mailto:contacto@vecinosmart.cl?subject=Solicitud Data Room VLS" style={{ background: '#38bdf8', color: '#0f172a', padding: '1rem', borderRadius: '12px', textDecoration: 'none', fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                <Mail size={18} /> Solicitar Acceso al Data Room
                            </a>
                        </div>

                        {/* CTA 2: Vecino Fundador */}
                        <div style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(234,179,8,0.1))', border: '2px solid #f59e0b', borderRadius: '24px', padding: '2rem', textAlign: 'center' }}>
                            <Star size={36} color="#f59e0b" style={{ marginBottom: '1rem' }} />
                            <h3 style={{ fontSize: '1.2rem', margin: '0 0 0.8rem 0' }}>Vecinos Fundadores</h3>
                            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>Sé parte de la comunidad que construyó esto. Acceso vitalicio a módulos premium, badge exclusivo y participación en decisiones de producto.</p>
                            <button 
                                onClick={() => window.dispatchEvent(new CustomEvent('open-vecinity-pay'))}
                                style={{ width: '100%', border: 'none', cursor: 'pointer', display: 'flex', background: '#f59e0b', color: '#0f172a', padding: '1rem', borderRadius: '12px', textDecoration: 'none', fontWeight: '900', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                            >
                                <Rocket size={18} /> Únete como Vecino Fundador
                            </button>
                        </div>

                        {/* CTA 3: Alianzas B2G */}
                        <div style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(5,150,105,0.1))', border: '2px solid #10b981', borderRadius: '24px', padding: '2rem', textAlign: 'center' }}>
                            <Building2 size={36} color="#10b981" style={{ marginBottom: '1rem' }} />
                            <h3 style={{ fontSize: '1.2rem', margin: '0 0 0.8rem 0' }}>Municipios & B2G</h3>
                            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>Alcaldes, SEREMI, GORE y directivos municipales: co-diseñemos juntos la instalación de Vecinity en tu territorio. Piloto sin costo el primer semestre.</p>
                            <a href="mailto:contacto@vecinosmart.cl?subject=Alianza Municipal Vecinity" style={{ display: 'flex', background: '#10b981', color: '#0f172a', padding: '1rem', borderRadius: '12px', textDecoration: 'none', fontWeight: '900', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                <MapPin size={18} /> Solicitar Alianza Municipal
                            </a>
                        </div>
                    </div>

                    {/* Contacto directo */}
                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '2rem', display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#94a3b8' }}>
                            <Mail size={18} color="#38bdf8" />
                            <a href="mailto:contacto@vecinosmart.cl" style={{ color: 'white', textDecoration: 'none' }}>contacto@vecinosmart.cl</a>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#94a3b8' }}>
                            <Globe size={18} color="#10b981" />
                            <a href="https://vecinoslaserena.cl" target="_blank" rel="noreferrer" style={{ color: 'white', textDecoration: 'none' }}>vecinoslaserena.cl</a>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#94a3b8' }}>
                            <MapPin size={18} color="#f59e0b" />
                            <span style={{ color: 'white' }}>La Serena, Región de Coquimbo, Chile</span>
                        </div>
                    </div>

                    {/* NUEVA SECCIÓN: NAVEGACIÓN Y RECOMENDADOS */}
                    <div style={{ marginTop: '5rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '4rem' }}>
                        <h3 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '2rem' }}>Explora el Ecosistema</h3>
                        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                             <a href="/" style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid #38bdf8', color: 'white', padding: '15px 30px', borderRadius: '15px', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Globe size={20} /> Volver a vecinoslaserena.cl
                             </a>
                             <a href="/musica" style={{ background: 'rgba(236,72,153,0.1)', border: '1px solid #ec4899', color: 'white', padding: '15px 30px', borderRadius: '15px', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Music size={20} /> Escuela de Música VLS
                             </a>
                             <a href="/sombreros" style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid #3b82f6', color: 'white', padding: '15px 30px', borderRadius: '15px', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Lightbulb size={20} /> Test de Sombreros De Bono
                             </a>
                        </div>

                        <div style={{ marginTop: '4rem' }}>
                            <h4 style={{ fontSize: '1.5rem', color: '#94a3b8', marginBottom: '2rem' }}>Lugares Recomendados para Conectar</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                {[
                                    { name: 'Faro Monumental', desc: 'Símbolo de la ciudad', url: 'https://www.google.com/maps?q=Faro+La+Serena' },
                                    { name: 'Avenida del Mar', desc: 'Gastronomía y playa', url: 'https://www.google.com/maps?q=Avenida+del+Mar+La+Serena' },
                                    { name: 'Valle del Elqui', desc: 'Astroturismo premium', url: 'https://www.google.com/maps?q=Valle+del+Elqui' },
                                    { name: 'Reserva Pingüino de Humboldt', desc: 'Biodiversidad única', url: 'https://www.google.com/maps?q=Punta+de+Choros' }
                                ].map((place, i) => (
                                    <a key={i} href={place.url} target="_blank" rel="noreferrer" style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)', textDecoration: 'none', textAlign: 'left', transition: 'all 0.3s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}>
                                        <div style={{ fontWeight: 'bold', color: 'white', marginBottom: '5px' }}>{place.name}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{place.desc}</div>
                                        <div style={{ fontSize: '0.7rem', color: '#38bdf8', marginTop: '10px' }}>Ver en Mapa →</div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ background: '#020617', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '2rem', textAlign: 'center', color: '#475569', fontSize: '0.85rem' }}>
                <p style={{ margin: 0 }}>© 2026 Vecinity · farito.cl · vecinoslaserena.cl · La Serena, Chile · Documento Comercial Estratégico</p>
            </footer>
        </div>
    );
}
