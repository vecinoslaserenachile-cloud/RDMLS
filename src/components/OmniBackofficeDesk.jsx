import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    X, Ticket, Newspaper, Save, Plus, Edit3, Trash2, 
    CheckCircle, AlertTriangle, Search, Filter, 
    ArrowRight, Settings, Database, Code, Eye,
    Globe, Shield, Zap, Terminal, Cpu, Share2, 
    LayoutGrid, Activity, Cloud, Server, Mic, Bot
} from 'lucide-react';

/**
 * OMNI-BACKOFFICE DESK - MASTER ARCHITECTURE
 * -----------------------------------------
 * Centro de mando 360° para la gestión multisitio de vecinoslaserena.cl
 * Integra: News, Codes, Infrastructure (Cloudflare/Firebase) y Asistente IA.
 */

export default function OmniBackofficeDesk({ onClose }) {
    const [activeTab, setActiveTab] = useState('ia'); // 'ia', 'multisite', 'infra'
    const [siteContext, setSiteContext] = useState('vls'); // 'vls', 'rdmls', 'puerta', 'coqui'
    const [searchTerm, setSearchTerm] = useState('');
    
    // --- Persistencia ---
    const [promoCodes, setPromoCodes] = useState([]);
    const [newsItems, setNewsItems] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [editingItem, setEditingItem] = useState(null); // Para edición genérica
    
    // --- AI Assistant (Faro Master) ---
    const [chatHistory, setChatHistory] = useState([
        { role: 'bot', text: 'Bienvenido al Centro de Mando Omni-Funcional. Soy **Faro Master**, clon de inteligencia avanzado para la red de subsidiarias.' }
    ]);
    const [userInput, setUserInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        // Carga inicial (Simulando API Fetch de múltiples subsidiarias)
        const codes = JSON.parse(localStorage.getItem('vls_promo_codes') || '[]');
        const news = JSON.parse(localStorage.getItem('vls_published_news') || '[]');
        setPromoCodes(codes);
        setNewsItems(news);
    }, []);

    const saveState = (type, data) => {
        if (type === 'codes') {
            localStorage.setItem('vls_promo_codes', JSON.stringify(data));
            window.dispatchEvent(new CustomEvent('promo-codes-updated'));
        } else if (type === 'news') {
            localStorage.setItem('vls_published_news', JSON.stringify(data));
            window.dispatchEvent(new CustomEvent('news-catalogo-updated'));
        }
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!userInput.trim()) return;
        
        const newHistory = [...chatHistory, { role: 'user', text: userInput }];
        setChatHistory(newHistory);
        setUserInput('');
        setIsTyping(true);

        // -- Lógica de "Omni-Acción" via IA --
        setTimeout(() => {
            let response = "He procesado tu requerimiento a través del CORE_SQL_REPLICA. ";
            if (userInput.toLowerCase().includes('crear noticia')) {
                response += "He preparado una nueva plantilla en borrador para la sección de Investigación. Puedes verla en la pestaña Multisitio.";
            } else if (userInput.toLowerCase().includes('cloudflare') || userInput.toLowerCase().includes('dns')) {
                response = "Accediendo a la capa Cloudflare/DNS. La propagación está al 98%. Modo Under Attack: Desactivado.";
                setActiveTab('infra');
            } else {
                response += "Sincronizando todas las subsidiarias (RDMLS, PuertaSmart, VLS) bajo el mismo protocolo de soberanía digital.";
            }
            setChatHistory(prev => [...prev, { role: 'bot', text: response }]);
            setIsTyping(false);
        }, 1200);
    };

    const sites = [
        { id: 'vls', name: 'vecinoslaserena.cl', color: '#fbbf24', icon: <Globe size={14} /> },
        { id: 'rdmls', name: 'rdmls.cl (Radio)', color: '#f97316', icon: <Mic size={14} /> },
        { id: 'puerta', name: 'puertasmart.cl', color: '#38bdf8', icon: <Share2 size={14} /> },
        { id: 'coqui', name: 'coquismart.cl', color: '#10b981', icon: <LayoutGrid size={14} /> }
    ];

    return (
        <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(30px)',
            zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontFamily: "'Inter', system-ui, sans-serif"
        }}>
            <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                style={{
                    width: '98%', maxWidth: '1440px', height: '94vh',
                    background: '#070a13', borderRadius: '32px',
                    border: '1px solid rgba(255,255,255,0.08)', display: 'flex',
                    flexDirection: 'column', overflow: 'hidden',
                    boxShadow: '0 0 100px rgba(0,0,0,0.8), 0 0 40px rgba(251,191,36,0.05)'
                }}
            >
                {/* --- TOP BAR (OMNI HEADER) --- */}
                <div style={{
                    padding: '1.5rem 2.5rem', background: 'rgba(255,255,255,0.02)',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <div style={{ 
                                width: '45px', height: '45px', background: 'linear-gradient(135deg, #fbbf24, #d97706)',
                                borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black'
                            }}>
                                <Cpu size={28} />
                            </div>
                            <div>
                                <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '900', letterSpacing: '-0.5px' }}>
                                    OMNI<span style={{ color: '#fbbf24' }}>BACKOFFICE</span> DESK
                                </h2>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.7rem', color: '#64748b', fontWeight: 'bold' }}>
                                    <Activity size={12} color="#10b981" /> SISTEMAS SINCRONIZADOS [360° MODE] · POWERED BY SONI
                                </div>
                            </div>
                        </div>

                        {/* Site Selector Mini */}
                        <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.4)', padding: '4px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            {sites.map(s => (
                                <button 
                                    key={s.id}
                                    onClick={() => setSiteContext(s.id)}
                                    style={{
                                        padding: '6px 12px', borderRadius: '8px', border: 'none',
                                        background: siteContext === s.id ? s.color : 'transparent',
                                        color: siteContext === s.id ? 'black' : '#64748b',
                                        fontSize: '0.65rem', fontWeight: '900', cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s'
                                    }}
                                >
                                    {s.icon} {s.id.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ textAlign: 'right', display: 'none', lg: 'block' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#fbbf24' }}>ADMIN MASTER</div>
                            <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Soberanía Digital Activa</div>
                        </div>
                        <button onClick={onClose} style={{
                            background: 'rgba(255,255,255,0.05)', border: 'none',
                            color: 'white', width: '45px', height: '45px', borderRadius: '50%',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}><X size={20} /></button>
                    </div>
                </div>

                {/* --- NAVIGATION TABS --- */}
                <div style={{ display: 'flex', background: 'rgba(0,0,0,0.3)', padding: '0 2.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    {[
                        { id: 'ia', label: 'FARO MASTER IA', icon: <Bot size={18} /> },
                        { id: 'multisite', label: 'GESTIÓN MULTISITIO', icon: <Share2 size={18} /> },
                        { id: 'infra', label: 'INFRAESTRUCTURA (CF/DB)', icon: <Server size={18} /> },
                    ].map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                padding: '1.2rem 2rem', border: 'none', background: 'transparent',
                                color: activeTab === tab.id ? '#fbbf24' : '#64748b',
                                fontSize: '0.85rem', fontWeight: '900', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', gap: '10px',
                                borderBottom: `2px solid ${activeTab === tab.id ? '#fbbf24' : 'transparent'}`,
                                transition: 'all 0.3s'
                            }}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>

                {/* --- MAIN CONTENT AREA --- */}
                <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                    
                    {/* Lateral Sidebar (Contextual) */}
                    <div style={{ width: '300px', borderRight: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)', padding: '2rem', overflowY: 'auto' }}>
                        <h4 style={{ fontSize: '0.7rem', color: '#fbbf24', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Eslabones del Sitio</h4>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                    <Database size={16} color="#fbbf24" />
                                    <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Capa SQL Core</span>
                                </div>
                                <div style={{ fontSize: '0.7rem', color: '#64748b', lineHeight: '1.4' }}>
                                    Sincronizado con replica principal: {siteContext.toUpperCase()}_DB_MASTER
                                </div>
                            </div>

                            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                    <Cloud size={16} color="#38bdf8" />
                                    <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Capa Cloudflare</span>
                                </div>
                                <div style={{ fontSize: '0.7rem', color: '#64748b', lineHeight: '1.4' }}>
                                    DNS: Propagado<br/>WAF: Protegido (Nivel High)
                                </div>
                            </div>

                            <div style={{ background: 'rgba(251,191,36,0.05)', padding: '1.2rem', borderRadius: '16px', border: '1px solid rgba(251,191,36,0.1)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                    <Zap size={16} color="#fbbf24" />
                                <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#fbbf24' }}>Faro Master Engine (Soni IQ)</span>
                            </div>
                            <p style={{ fontSize: '0.65rem', color: '#94a3b8', margin: '0 0 10px 0' }}>
                                Motor de asistencia clonado con 100% de capacidades omni-funcionales.
                            </p>
                            <div style={{ display: 'flex', gap: '5px' }}>
                                <button style={{ flex: 1, padding: '5px', borderRadius: '6px', background: '#fbbf24', color: 'black', fontSize: '0.6rem', fontWeight: 'bold', border: 'none' }}>MODO MANUAL</button>
                                <button style={{ flex: 1, padding: '5px', borderRadius: '6px', background: 'rgba(255,255,255,0.1)', color: 'white', fontSize: '0.6rem', fontWeight: 'bold', border: 'none' }}>MODO ASISTIDO</button>
                            </div>
                        </div>
                        </div>
                    </div>

                    {/* Content View */}
                    <div style={{ flex: 1, padding: '2.5rem', overflowY: 'auto', background: 'radial-gradient(circle at 100% 100%, rgba(251,191,36,0.03) 0%, transparent 50%)' }}>
                        
                        <AnimatePresence mode="wait">
                            {/* TAB: IA ASSISTANT */}
                            {activeTab === 'ia' && (
                                <motion.div 
                                    key="ia-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
                                        {chatHistory.map((msg, i) => (
                                            <div key={i} style={{ 
                                                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                                maxWidth: '70%',
                                                background: msg.role === 'user' ? '#1e293b' : 'rgba(251,191,36,0.05)',
                                                padding: '1.2rem 1.8rem',
                                                borderRadius: msg.role === 'user' ? '24px 24px 0 24px' : '24px 24px 24px 0',
                                                border: msg.role === 'user' ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(251,191,36,0.1)'
                                            }}>
                                                <div style={{ fontSize: '0.95rem', lineHeight: '1.6', color: msg.role === 'user' ? 'white' : '#fbbf24' }}>
                                                    {msg.text}
                                                </div>
                                            </div>
                                        ))}
                                        {isTyping && (
                                            <div style={{ padding: '1rem', color: '#64748b', fontSize: '0.8rem' }}>Faro Master está procesando...</div>
                                        )}
                                    </div>

                                    <form onSubmit={handleSendMessage} style={{ position: 'relative' }}>
                                        <input 
                                            type="text" 
                                            placeholder="Escribe un comando omni-funcional (ej: 'Crear campaña en PuertaSmart')..."
                                            value={userInput}
                                            onChange={(e) => setUserInput(e.target.value)}
                                            style={{
                                                width: '100%', padding: '1.5rem 2rem', background: '#111827',
                                                border: '1px solid rgba(251,191,36,0.3)', borderRadius: '20px',
                                                color: 'white', fontSize: '1rem', outline: 'none',
                                                boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
                                            }}
                                        />
                                        <button type="submit" style={{
                                            position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
                                            background: '#fbbf24', border: 'none', width: '45px', height: '45px', borderRadius: '12px',
                                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            <ArrowRight size={20} color="black" />
                                        </button>
                                    </form>
                                </motion.div>
                            )}

                            {/* TAB: MULTISITE MANAGEMENT */}
                            {activeTab === 'multisite' && (
                                <motion.div key="multi" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                        <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '900' }}>
                                            Gestión: <span style={{ color: '#fbbf24' }}>{sites.find(s=>s.id === siteContext).name}</span>
                                        </h3>
                                        <div style={{ display: 'flex', gap: '0.8rem' }}>
                                            <button style={{ background: '#10b981', border: 'none', color: 'black', padding: '0.8rem 1.5rem', borderRadius: '12px', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                                <Plus size={18} /> NUEVA INVESTIGACIÓN
                                            </button>
                                            <button style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                                <Share2 size={18} /> EXPORTAR JSON
                                            </button>
                                        </div>
                                    </div>

                                    {/* News Grid Specialized */}
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                                        {newsItems.map(item => (
                                            <div key={item.id} style={{
                                                background: 'rgba(255,255,255,0.02)', borderRadius: '24px', padding: '1.5rem',
                                                border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden'
                                            }}>
                                                <div style={{ 
                                                    background: item.impact === 'High' ? 'rgba(239,68,68,0.1)' : 'rgba(56,189,248,0.1)',
                                                    padding: '4px 12px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 'bold',
                                                    color: item.impact === 'High' ? '#ef4444' : '#38bdf8', display: 'inline-block', marginBottom: '1rem'
                                                }}>
                                                    {item.template.toUpperCase()}
                                                </div>
                                                <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: 'bold', lineHeight: '1.4' }}>{item.title}</h4>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.date}</span>
                                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                        <button style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#94a3b8', padding: '8px', borderRadius: '8px' }}><Eye size={16} /></button>
                                                        <button style={{ background: 'rgba(251,191,36,0.1)', border: 'none', color: '#fbbf24', padding: '8px', borderRadius: '8px' }}><Edit3 size={16} /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* TAB: INFRASTRUCTURE */}
                            {activeTab === 'infra' && (
                                <motion.div key="infra" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <div style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', display: 'grid', gap: '2rem' }}>
                                        {/* Cloudflare Section */}
                                        <div className="glass-panel" style={{ padding: '2rem', border: '1px solid rgba(56,189,248,0.2)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                                                <Cloud size={24} color="#38bdf8" />
                                                <h3 style={{ margin: 0 }}>Red Sonal de Borde (Cloudflare)</h3>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                                                    <span>Propagación DNS Global</span>
                                                    <span style={{ color: '#10b981', fontWeight: 'bold' }}>Sincronizado (100%)</span>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                                                    <span>Certificados SSL/TLS</span>
                                                    <span style={{ color: '#10b981', fontWeight: 'bold' }}>Activo (Zero-Trust)</span>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                                                    <span>Protección WAF (Capa 7)</span>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                                                        <span>Bloqueando Amenazas</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Database Section */}
                                        <div className="glass-panel" style={{ padding: '2rem', border: '1px solid rgba(251,191,36,0.2)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                                                <Database size={24} color="#fbbf24" />
                                                <h3 style={{ margin: 0 }}>CORE_SQL_REPLICA [Relacional]</h3>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                                                     <span>Estado de Replicación</span>
                                                     <span style={{ color: '#fbbf24', fontWeight: 'bold' }}>Maestro &lt;&gt; Esclavo (12ms latencia)</span>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                                                     <span>Integridad de Firebase</span>
                                                     <span style={{ color: '#10b981', fontWeight: 'bold' }}>Sincronizado (RDMLS/VLS)</span>
                                                </div>
                                                <button style={{ width: '100%', padding: '1rem', background: 'rgba(251,191,36,0.1)', border: '1px solid #fbbf24', borderRadius: '12px', color: '#fbbf24', fontWeight: 'bold', cursor: 'pointer' }}>
                                                    <Terminal size={16} /> EJECUTAR VACUUM / OPTIMIZE
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* --- STATUS FOOTER --- */}
                <div style={{ padding: '0.8rem 2.5rem', background: '#000', fontSize: '0.73rem', color: '#475569', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <span>SESIÓN: <span style={{ color: '#94a3b8' }}>ADMIN_MASTER_VLS</span></span>
                        <span>IP ORIGEN: <span style={{ color: '#94a3b8' }}>Propulsada por Cloudflare Warp</span></span>
                    </div>
                    <span>OMNI DESK v5.0.0 (Master IQ Enabled)</span>
                </div>
            </motion.div>

            {showSuccess && (
                <motion.div 
                    initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
                    style={{ position: 'fixed', bottom: '40px', background: '#fbbf24', color: 'black', padding: '1rem 2rem', borderRadius: '12px', fontWeight: 'bold', zIndex: 1000000, display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                    <CheckCircle size={20} /> Sincronización Omni-Sitio Exitosa
                </motion.div>
            )}
        </div>
    );
}
