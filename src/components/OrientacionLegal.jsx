import React, { useState, useEffect } from 'react';
import { 
    Scale, AlertTriangle, BookOpen, MessageSquare, 
    Send, CheckCircle, Clock, ShieldAlert, X, ChevronRight, Lock
} from 'lucide-react';

export default function OrientacionLegal({ onClose, isLawyer = false }) {
    const [view, setView] = useState(isLawyer ? 'backoffice' : 'citizen');
    const [consultationText, setConsultationText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bcnResults, setBcnResults] = useState([]);
    const [chatHistory, setChatHistory] = useState([
        { id: 1, sender: 'system', text: 'Bienvenido al Portal de Orientación Legal VLS. Por favor, describa su situación detalladamente.' }
    ]);
    
    // BACKOFFICE STATE
    const [poolConsultations, setPoolConsultations] = useState([
        { id: '101', user: 'Vecino_Prat', text: 'Llevo 3 meses con ruidos molestos del pub de la esquina y la municipalidad no cursa la multa efectiva.', status: 'pending', reward: 15 },
        { id: '102', user: 'Maria_G', text: 'Me chocaron por alcance en Cuatro Esquinas y el responsable no tenía seguro. ¿Puedo demandar por JPL?', status: 'pending', reward: 20 }
    ]);
    const [activeCase, setActiveCase] = useState(null);
    const [lawyerResponse, setLawyerResponse] = useState('');

    const handleCitizenSubmit = () => {
        if (!consultationText.trim()) return;
        setIsSubmitting(true);
        
        // Simulación de búsqueda en BCN (Biblioteca del Congreso Nacional)
        setTimeout(() => {
            const simulatedBCN = [
                { ley: 'Ley 19.300', desc: 'Bases Generales del Medio Ambiente (Ruido/Contaminación).' },
                { ley: 'Ley 15.231', desc: 'Organización y Atribuciones de los Juzgados de Policía Local.' }
            ];
            setBcnResults(simulatedBCN);
            
            setChatHistory(prev => [
                ...prev, 
                { id: Date.now(), sender: 'user', text: consultationText },
                { id: Date.now()+1, sender: 'system', text: 'Su consulta ha sido derivada al Pool de Abogados Certificados VLS. Costo retenido: 15 Fichas. Tiempo estimado de respuesta: 2-4 horas hábiles.' }
            ]);
            setConsultationText('');
            setIsSubmitting(false);
        }, 1500);
    };

    const handleLawyerReply = () => {
        if (!lawyerResponse.trim() || !activeCase) return;
        
        // Actualizar pool
        setPoolConsultations(prev => prev.filter(c => c.id !== activeCase.id));
        alert(`¡Consulta respondida con éxito! Se han acreditado ${activeCase.reward} Fichas VLS a tu cuenta profesional.`);
        setLawyerResponse('');
        setActiveCase(null);
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100060, background: 'rgba(2, 6, 23, 0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(10px)' }}>
            <div className="glass-panel" style={{ width: '100%', maxWidth: '1000px', height: '85vh', display: 'flex', flexDirection: 'column', borderRadius: '24px', overflow: 'hidden', border: '1px solid #d4af37' }}>
                
                {/* ── HEADER ── */}
                <div style={{ padding: '1.5rem', background: 'linear-gradient(90deg, #1e293b, #0f172a)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #d4af37' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: '#d4af37', padding: '10px', borderRadius: '12px' }}>
                            <Scale size={24} color="#000" />
                        </div>
                        <div>
                            <h2 style={{ margin: 0, color: '#d4af37', fontSize: '1.4rem' }}>Orientación Legal Ciudadana</h2>
                            <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                {view === 'citizen' ? 'Conexión BCN & Asesoría Profesional' : 'Backoffice de Gestión para Abogados VLS'}
                            </p>
                        </div>
                    </div>
                    {/* Botón temporal de cambio de vista para demostración */}
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <button onClick={() => setView(view === 'citizen' ? 'backoffice' : 'citizen')} style={{ background: 'transparent', border: '1px solid #d4af37', color: '#d4af37', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}>
                            Cambiar a Vista {view === 'citizen' ? 'Abogado' : 'Ciudadano'}
                        </button>
                        <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* ── DISCLAIMER ESTRICTO (Regla del Prompt) ── */}
                <div style={{ background: 'rgba(239, 68, 68, 0.1)', borderBottom: '1px solid #ef4444', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <AlertTriangle size={18} color="#ef4444" style={{ flexShrink: 0 }} />
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#fca5a5', lineHeight: '1.4' }}>
                        <strong style={{ display: 'block' }}>Aviso Legal y Renuncia de Responsabilidad:</strong> 
                        Esta plataforma conecta con fuentes de la Biblioteca del Congreso Nacional (BCN) y provee orientación legal general. <strong>ESTO NO CONSTITUYE PATROCINIO, PODER NI RELACIÓN CLIENTE-ABOGADO FORMAL.</strong> La Municipalidad y VLS no asumen responsabilidad por acciones tomadas en base a esta plataforma.
                    </p>
                </div>

                {/* ── ÁREA PRINCIPAL ── */}
                <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                    
                    {/* VISTA CIUDADANO */}
                    {view === 'citizen' && (
                        <div style={{ flex: 1, display: 'flex', padding: '1.5rem', gap: '1.5rem' }}>
                            {/* Chatbox Ciudadano */}
                            <div style={{ flex: 2, display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.3)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {chatHistory.map(msg => (
                                        <div key={msg.id} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', background: msg.sender === 'user' ? '#d4af37' : '#1e293b', color: msg.sender === 'user' ? 'black' : 'white', padding: '12px 16px', borderRadius: '16px', maxWidth: '80%', fontSize: '0.95rem', lineHeight: '1.5', border: msg.sender === 'system' ? '1px solid #d4af3750' : 'none' }}>
                                            {msg.sender === 'system' && <Scale size={14} style={{ marginBottom: '6px', color: '#d4af37' }} />}
                                            {msg.text}
                                        </div>
                                    ))}
                                    {isSubmitting && <div style={{ color: '#d4af37', fontSize: '0.8rem', fontStyle: 'italic' }}>Analizando normativa BCN y derivando...</div>}
                                </div>
                                <div style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '10px' }}>
                                    <input 
                                        type="text" 
                                        value={consultationText}
                                        onChange={(e) => setConsultationText(e.target.value)}
                                        placeholder="Ej: Choqué en mi vehículo frente al faro, ¿cómo demando en JPL?"
                                        style={{ flex: 1, background: '#0f172a', border: '1px solid rgba(255,255,255,0.2)', padding: '12px 16px', borderRadius: '12px', color: 'white', width: '100%', outline: 'none' }}
                                    />
                                    <button onClick={handleCitizenSubmit} disabled={isSubmitting || !consultationText} style={{ background: '#d4af37', color: 'black', border: 'none', padding: '0 20px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>
                                        <Send size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Panel Derecho Ciudadano (BCN) */}
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ background: '#1e293b', border: '1px solid #3b82f6', borderRadius: '16px', padding: '1.5rem' }}>
                                    <h3 style={{ margin: '0 0 1rem 0', color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}>
                                        <BookOpen size={20} /> Búsqueda BCN Oficial
                                    </h3>
                                    {bcnResults.length === 0 ? (
                                        <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>La inteligencia artificial cruzará automáticamente su relato con Leyes de la República (bcn.cl).</p>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            {bcnResults.map((res, i) => (
                                                <div key={i} style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '10px', borderRadius: '8px', borderLeft: '3px solid #3b82f6' }}>
                                                    <strong style={{ color: '#60a5fa', display: 'block', fontSize: '0.8rem' }}>{res.ley}</strong>
                                                    <span style={{ color: '#e2e8f0', fontSize: '0.75rem' }}>{res.desc}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div style={{ background: 'rgba(212, 175, 55, 0.1)', border: '1px solid rgba(212, 175, 55, 0.3)', borderRadius: '16px', padding: '1.5rem' }}>
                                    <h3 style={{ margin: '0 0 0.5rem 0', color: '#d4af37', fontSize: '1rem' }}>Costo de Asesoría</h3>
                                    <p style={{ color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '1rem' }}>Las consultas derivadas al pool de abogados privados descuentan Fichas VLS de su billetera.</p>
                                    <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#d4af37' }}>15 🎟️ <span style={{fontSize: '0.8rem', color: '#94a3b8'}}>/ consulta</span></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* VISTA ABOGADO (BACKOFFICE) */}
                    {view === 'backoffice' && (
                        <div style={{ flex: 1, display: 'flex', background: '#0f172a' }}>
                            {/* Lista de Casos (Pool Nacional) */}
                            <div style={{ width: '350px', borderRight: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ padding: '1rem', background: '#1e293b', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <h3 style={{ margin: 0, color: 'white', fontSize: '1rem' }}>Pool de Consultas (Chile)</h3>
                                </div>
                                <div style={{ flex: 1, overflowY: 'auto' }}>
                                    {poolConsultations.length === 0 ? (
                                        <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>No hay casos pendientes.</div>
                                    ) : (
                                        poolConsultations.map(c => (
                                            <div 
                                                key={c.id} 
                                                onClick={() => setActiveCase(c)}
                                                style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', background: activeCase?.id === c.id ? 'rgba(212, 175, 55, 0.1)' : 'transparent', borderLeft: activeCase?.id === c.id ? '4px solid #d4af37' : '4px solid transparent' }}
                                            >
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                                    <strong style={{ color: 'white', fontSize: '0.9rem' }}>@{c.user}</strong>
                                                    <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '0.8rem' }}>+ {c.reward} Fichas</span>
                                                </div>
                                                <div style={{ color: '#94a3b8', fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.text}</div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Área de Resolución */}
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'url(/abstract_legal_bg.png) center/cover' }}>
                                {!activeCase ? (
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                                        <ShieldAlert size={64} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                                        <p>Seleccione un caso del pool para responder y monetizar.</p>
                                    </div>
                                ) : (
                                    <div style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'rgba(15, 23, 42, 0.85)' }}>
                                        {/* Caso Activo */}
                                        <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                            <div style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '0.8rem', marginBottom: '10px' }}>CONSULTA CIUDADANA / ID: {activeCase.id}</div>
                                            <p style={{ color: 'white', fontSize: '1.1rem', margin: '0 0 1rem 0', lineHeight: '1.6' }}>"{activeCase.text}"</p>
                                            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Usuario verificado con ClaveÚnica. Nivel de Urgencia Normal.</div>
                                        </div>

                                        {/* Constraint Alert */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#f59e0b', fontSize: '0.8rem', background: 'rgba(245, 158, 11, 0.1)', padding: '10px', borderRadius: '8px' }}>
                                            <Lock size={16} /> <strong>Regla del Backoffice:</strong> Este sistema funciona estrictamente vía texto. No está permitida la subida de fotos, expedientes ni activar cámara. Solo orientación jurídica pura.
                                        </div>

                                        {/* Input Abogado */}
                                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                            <label style={{ display: 'block', color: 'white', fontWeight: 'bold', marginBottom: '10px' }}>Respuesta Profesional (Dictamen Breve)</label>
                                            <textarea 
                                                value={lawyerResponse}
                                                onChange={(e) => setLawyerResponse(e.target.value)}
                                                placeholder="Redacte su orientación legal aquí citando la ley aplicable. Esta respuesta será entregada directamente al vecino."
                                                style={{ flex: 1, width: '100%', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(212, 175, 55, 0.5)', borderRadius: '12px', padding: '1.5rem', color: 'white', fontSize: '1rem', resize: 'none', lineHeight: '1.6' }}
                                            />
                                        </div>

                                        {/* Botonera */}
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                                            <button onClick={() => setActiveCase(null)} className="btn-glass" style={{ padding: '1rem 2rem', borderRadius: '12px' }}>Cerrar Caso</button>
                                            <button onClick={handleLawyerReply} disabled={!lawyerResponse} style={{ background: '#d4af37', color: 'black', border: 'none', padding: '1rem 2rem', borderRadius: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px', cursor: lawyerResponse ? 'pointer' : 'not-allowed', opacity: lawyerResponse ? 1 : 0.5 }}>
                                                <CheckCircle size={20} /> Enviar y Cobrar {activeCase.reward} Fichas
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
