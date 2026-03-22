import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Book, ArrowLeft, Info, HelpCircle, ExternalLink, Languages, Sparkles, MessageSquare } from 'lucide-react';

const glosarioTerms = [
    { term: "C5", def: "Centro de Comando, Control, Cómputo, Comunicaciones y Contacto Ciudadano. Se trata de una infraestructura tecnológica avanzada y neutral diseñada para la gestión de emergencias, videovigilancia y coordinación de seguridad en tiempo real para cualquier institución protectora.", syn: "Centro de control, comando, núcleo de inteligencia", ant: "Descentralización operativa" },
    { term: "CESFAM", def: "Centro de Salud Familiar, establecimiento de atención primaria de salud orientado a la comunidad territorial.", syn: "Consultorio, centro médico, núcleo de salud", ant: "Hospital de alta complejidad" },
    { term: "Core", def: "Consejo Regional, órgano encargado de hacer efectiva la participación de la comunidad en la administración de recursos regionales.", syn: "Concejo, junta regional", ant: "Gobierno central" },
    { term: "DIDECO", def: "Dirección de Desarrollo Comunitario, área especializada en la gestión de subsidios, ayudas sociales y fomento del bienestar vecinal.", syn: "Asistencia social, gestión comunitaria", ant: "Privatización" },
    { term: "DOM", def: "Dirección de Obras, unidad técnica que regula e inspecciona las construcciones y el cumplimiento de planes reguladores urbanos.", syn: "Urbanismo, catastro, dirección técnica", ant: "Anarquía constructiva" },
    { term: "Faro IA", def: "Núcleo de inteligencia artificial predictiva de La Serena. Analiza datos del entorno para anticipar necesidades vecinales, desde baches hasta luminarias, optimizando la gestión municipal.", syn: "Cerebro digital, IA urbana, Centinel Faro", ant: "Gestión reactiva" },
    { term: "Ficha de Protección Social", def: "Instrumento institucional para determinar la asignación de beneficios y apoyos sociales según vulnerabilidad.", syn: "Registro Social, acreditación de apoyo", ant: "Acreditación privada" },
    { term: "Fiscalizador", def: "Funcionario institucional encargado de verificar el cumplimiento de normativas, leyes y reglamentos vigentes.", syn: "Inspector, interventor, auditor", ant: "Infractor, evasor" },
    { term: "GORE", def: "Gobierno Regional, entidad encargada de la administración superior de cada región para el desarrollo social y cultural.", syn: "Administración regional, gobierno local", ant: "Estado nacional" },
    { term: "Inversión Ágil", def: "Plataforma simplificada para la tramitación eficiente de permisos comerciales y fomento del emprendimiento.", syn: "Trámite exprés, digitalización eficiente", ant: "Burocracia lenta" },
    { term: "Ley de Tenencia Responsable", def: "Normativa integral de protección y cuidado de mascotas y animales de compañía (Conocida como Ley Cholito).", syn: "Protección animal, tenencia ética", ant: "Maltrato animal" },
    { term: "Marketplace Vecinal", def: "Espacio digital seguro dentro de la plataforma para el comercio justo y el intercambio entre ciudadanos.", syn: "Feria digital, economía circular", ant: "Monopolio externo" },
    { term: "Oficina de Partes", def: "Unidad institucional que gestiona el ingreso, registro y distribución de la documentación y correspondencia oficial.", syn: "Secretaría general, archivo documental", ant: "Informalidad documental" },
    { term: "Radio Digital (VLS Red)", def: "Estación de transmisión multimedia por internet, diseñada para informar y conectar a la comunidad de forma global.", syn: "Emisora online, hub de contenidos", ant: "Prensa tradicional" },
    { term: "Sentinel", def: "Sistema de monitorización distribuida y Social Listening. Escucha y mapea el sentimiento ciudadano en redes sociales y servicios para prevenir conflictos y mejorar la atención.", syn: "Vigía digital, centinela social", ant: "Ceguera institucional" },
    { term: "SIG", def: "Sistemas de Información Geográfica. Herramienta para el análisis de datos rururbanos sobre mapas interactivos.", syn: "Georreferenciación, mapa inteligente", ant: "Datos planos" },
    { term: "Smart City (VLS)", def: "Modelo de ciudad que utiliza la conectividad y el Big Data para mejorar la calidad de vida. En VLS, se enfoca en el bajo costo, código abierto y soberanía digital.", syn: "Ciudad inteligente, territorio digital", ant: "Ciudad analógica" },
    { term: "Smart Comuna", def: "Ecosistema integral que agrupa las 4 soluciones base: Smart Citizens, Smart Administration, Smart Events y Smart Listening.", syn: "Nuestra plataforma, paraguas tecnológico", ant: "Gestión silenciada" },
    { term: "Vecino Smart", def: "Ciudadano activo que utiliza la tecnología VLS para reportar, informarse y participar en la vida comunitaria, siendo un nodo humano de la red.", syn: "Ciudadano digital, vecino conectado", ant: "Vecino desconectado" },
    { term: "Ventanilla Única", def: "Modelo de atención centralizada donde el ciudadano puede realizar múltiples gestiones en un solo punto de contacto.", syn: "Servicio integrado, punto único", ant: "Fragmentación de trámites" }
];

export default function Glosario() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [raeQuery, setRaeQuery] = useState('');
    const [aiHelp, setAiHelp] = useState(null);

    const filteredTerms = glosarioTerms.filter(item => 
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.def.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRaeSearch = () => {
        if (!raeQuery) return;
        window.open(`https://dle.rae.es/${encodeURIComponent(raeQuery)}`, '_blank');
    };

    return (
        <div className="page-container" style={{ padding: '2rem 1rem', minHeight: '100vh', background: 'radial-gradient(circle at top right, #0f172a 0%, #020617 100%)' }}>
            <header className="page-header" style={{ marginBottom: '3rem', maxWidth: '1000px', margin: '0 auto' }}>
                <button onClick={() => navigate('/vecinos')} className="btn-glass" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '20px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                    <ArrowLeft size={16} /> Volver al Portal Vecinal
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '1rem', borderRadius: '20px', border: '1px solid #10b981' }}>
                        <Book size={40} color="#10b981" />
                    </div>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: '900', color: 'white', letterSpacing: '-1px' }}>DICCIONARIO VLS</h1>
                        <p style={{ color: '#94a3b8', margin: 0, fontSize: '1.1rem' }}>Conceptos, Tecnología y RAE • Inspirado en "Hablar y Escribir Bien"</p>
                    </div>
                </div>
            </header>

            <main style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: window.innerWidth > 1024 ? '1fr 350px' : '1fr', gap: '2rem' }}>
                
                {/* Panel Central: Glosario */}
                <section>
                    <div style={{ position: 'relative', marginBottom: '2rem' }}>
                        <Search color="#10b981" size={24} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                        <input 
                            type="text" 
                            placeholder="Buscar en el glosario municipal (Ej: C5, DIDECO)..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ 
                                width: '100%', 
                                padding: '1.2rem 1.2rem 1.2rem 3.5rem', 
                                borderRadius: '16px', 
                                background: 'rgba(30, 41, 59, 0.5)', 
                                border: '1px solid rgba(16, 185, 129, 0.3)', 
                                color: 'white', 
                                fontSize: '1.1rem',
                                outline: 'none',
                                transition: 'all 0.3s'
                            }} 
                            onFocus={e => e.target.style.borderColor = '#10b981'}
                            onBlur={e => e.target.style.borderColor = 'rgba(16, 185, 129, 0.3)'}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {filteredTerms.length > 0 ? (
                            filteredTerms.map((item, idx) => (
                                <div 
                                    key={idx} 
                                    className="glass-panel"
                                    style={{ 
                                        padding: '2rem', 
                                        border: '1px solid rgba(255,255,255,0.05)', 
                                        borderRadius: '24px', 
                                        background: 'rgba(15, 23, 42, 0.8)',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                        <h3 style={{ margin: 0, color: 'white', fontSize: '1.4rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                                            <HelpCircle color="#38bdf8" size={22} /> {item.term}
                                        </h3>
                                        <span style={{ padding: '0.3rem 0.8rem', borderRadius: '50px', background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', fontSize: '0.7rem', fontWeight: 'bold', border: '1px solid rgba(56, 189, 248, 0.2)' }}>TEORÍA VLS</span>
                                    </div>
                                    <p style={{ margin: '0 0 1.5rem 0', color: '#cbd5e1', fontSize: '1.1rem', lineHeight: '1.6' }}>
                                        {item.def}
                                    </p>
                                    
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', paddingTop: '1.2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div>
                                            <span style={{ display: 'block', fontSize: '0.65rem', color: '#10b981', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Sinónimo</span>
                                            <span style={{ color: 'white', fontSize: '0.9rem' }}>{item.syn || '--'}</span>
                                        </div>
                                        <div>
                                            <span style={{ display: 'block', fontSize: '0.65rem', color: '#ef4444', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Antónimo</span>
                                            <span style={{ color: 'white', fontSize: '0.9rem' }}>{item.ant || '--'}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px dashed rgba(255,255,255,0.1)' }}>
                                <Info size={56} color="#94a3b8" style={{ margin: '0 auto 1rem' }} />
                                <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>Búsqueda sin resultados</h3>
                                <p style={{ color: '#64748b' }}>Consulta nuestro asistente IA o utiliza el buscador RAE lateral.</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Sidebar: RAE & IA */}
                <aside style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    
                    {/* Tarjeta RAE Interactiva */}
                    <div className="glass-panel" style={{ padding: '2rem', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '24px', background: 'rgba(239, 68, 68, 0.05)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '1.5rem' }}>
                            <Languages color="#ef4444" size={24} />
                            <h3 style={{ margin: 0, color: 'white', fontSize: '1.2rem' }}>Consulta RAE Oficial</h3>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem', lineHeight: '1.5' }}>
                            Accede al Diccionario de la Lengua Española en tiempo real para verificar ortografía y semántica.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <input 
                                type="text" 
                                placeholder="Palabra a consultar..." 
                                value={raeQuery}
                                onChange={(e) => setRaeQuery(e.target.value)}
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(239, 68, 68, 0.2)', color: 'white' }}
                            />
                            <button 
                                onClick={handleRaeSearch}
                                style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: '#ef4444', color: 'white', border: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer' }}
                            >
                                <ExternalLink size={18} /> CONSULTAR DLE
                            </button>
                        </div>
                    </div>

                    {/* Tarjeta Filosofía "Escribir Bien" */}
                    <div className="glass-panel" style={{ padding: '2rem', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '24px', background: 'rgba(168, 85, 247, 0.05)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '1.2rem' }}>
                            <Sparkles color="#a855f7" size={24} />
                            <h3 style={{ margin: 0, color: 'white', fontSize: '1.2rem' }}>Buen Escribir VLS</h3>
                        </div>
                        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '16px', fontSize: '0.9rem', color: '#e2e8f0', fontStyle: 'italic', marginBottom: '1rem' }}>
                            "La claridad de una gestión se refleja en la precisión de sus palabras." 
                        </div>
                        <ul style={{ paddingLeft: '1.2rem', color: '#94a3b8', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', margin: 0 }}>
                            <li>Evita los anglicismos innecesarios.</li>
                            <li>Usa siglas solo si son explicadas.</li>
                            <li>Prefiere el verbo activo sobre el pasivo.</li>
                        </ul>
                    </div>

                    {/* Footer Serenito */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
                        <img src="/avatars/serenito.png" alt="Serenito" style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#38bdf8' }} />
                        <p style={{ color: '#38bdf8', fontSize: '0.8rem', fontWeight: 'bold', margin: 0 }}>
                            ¿Tienes dudas? Consulta con el Tatarabuelo Alpino en el Bus del Tiempo.
                        </p>
                    </div>

                </aside>
            </main>
        </div>
    );
}
