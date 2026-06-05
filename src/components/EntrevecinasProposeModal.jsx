import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, MessageSquare, Sparkles, Send, CheckCircle2, Video, ChevronRight, User, Image as ImageIcon, Wand2, Lightbulb, RefreshCw } from 'lucide-react';

/**
 * ENTREVECINAS PROPOSE MODAL 2026
 * Sistema innovador de captura de contenidos ciudadanos con asistente de narrativa.
 */
const VLS_ASSISTANTS = [
    { id: 'pampita', name: 'Pampita', role: 'Humizales & Parques', img: '/pampita_v3.png', welcome: '¡Hola vecina! Soy Pampita. Juntas vamos a crear algo increíble para entrevecinas.cl.', color: '#f97316' },
    { id: 'milagros', name: 'Milagros', role: 'Gestión Social', img: '/characters/milagros.png', welcome: '¡Qué alegría saludarte! Soy Milagros. Déjame ayudarte a darle vida a tu historia vecinal.', color: '#ec4899' },
    { id: 'serenito-joven', name: 'Serenito Joven', role: 'Innovación Digital', img: '/serenito_v3.png', welcome: '¡Hola! Soy Serenito Joven. Estoy listo para ayudarte a proponer un contenido innovador para el barrio.', color: '#3b82f6' },
    { id: 'bisabuelo', name: 'Ancestral Serenito', role: 'Historia & Tradición', img: '/ancestral_serenito.png', welcome: 'Saludos, vecina. Soy el Ancestral Serenito. Permíteme guiar tu relato con la sabiduría de nuestra historia.', color: '#f59e0b' }
];

const SUGGESTIONS = [
    "Hola Milagros, tengo un emprendimiento de repostería casera que partió en mi cocina y hoy sueño con tener mi propio local...",
    "Milagros, me gustaría denunciar que en mi pasaje la luminaria lleva semanas fallando y nos sentimos inseguras al volver tarde...",
    "Quiero compartir un video del taller de costura vecinal donde nos reunimos 15 mujeres a crear y compartir la vida...",
    "Tengo una historia increíble sobre mi abuela, que fue una de las fundadoras de nuestra junta de vecinos en los años 60...",
    "Me encantaría proponer un reportaje sobre el huerto comunitario que estamos levantando en el sitio eriazo de la esquina...",
    "Milagros, somos un grupo de jóvenes que queremos organizar un festival de talentos para recaudar fondos para el club deportivo...",
    "Hola, mi idea es documentar cómo ha cambiado nuestro barrio desde que pavimentaron la calle principal...",
    "Quiero contarles sobre mi vecina artesana, que hace maravillas con lana de la región y nadie conoce su talento..."
];

export default function EntrevecinasProposeModal({ isOpen, onClose }) {
    const [step, setStep] = useState(1);
    const [assistant, setAssistant] = useState(VLS_ASSISTANTS[1]); // Default: Milagros
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        rawIdea: '',
        aiDraft: '',
        hasVideo: false,
        topic: 'GENERAL'
    });

    const [isGenerating, setIsGenerating] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [suggestionIdx, setSuggestionIdx] = useState(0);

    useEffect(() => {
        if (isOpen) {
            // Se define a Milagros como la anfitriona oficial de Entrevecinas
            const milagros = VLS_ASSISTANTS.find(a => a.id === 'milagros') || VLS_ASSISTANTS[0];
            setAssistant(milagros);
            setStep(1);
            setSelectedFiles([]);
        }
    }, [isOpen]);

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            setSelectedFiles(prev => [...prev, ...files]);
            const containsVideo = files.some(f => f.type.startsWith('video/'));
            if (containsVideo) setFormData(prev => ({ ...prev, hasVideo: true }));
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const nextIdx = (suggestionIdx + 1) % SUGGESTIONS.length;
            setSuggestionIdx(nextIdx);
            
            // Effect: Typewriter-like or instant replacement
            setFormData(prev => ({ ...prev, rawIdea: SUGGESTIONS[nextIdx] }));
            
            // Visual feedback
            window.dispatchEvent(new CustomEvent('vls-show-alert', { 
                detail: { 
                    title: 'ASISTENTE NARRATIVO', 
                    message: `Sugerencia: "${SUGGESTIONS[nextIdx].substring(0, 30)}..."`,
                    type: 'info',
                    icon: 'Sparkles'
                } 
            }));
        }
    };

    // Enviar a Cloudflare API (D1 + Notificación + Archivos) o Mock
    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            // Send email via Resend API
            const RESEND_KEY = localStorage.getItem('vls_resend_key') || "re_BxWBivzx_3CpokEvr9UbCKFzFXyfT3VYn";
            await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${RESEND_KEY}` },
                body: JSON.stringify({
                    from: 'Entrevecinas VLS <onboarding@resend.dev>',
                    to: [formData.email, 'vecinoslaserenachile@gmail.com'],
                    subject: `Tu propuesta ha sido recibida - Entrevecinas.cl`,
                    html: `
                        <h2>¡Hola ${formData.name || 'Vecina'}!</h2>
                        <p>Hemos recibido con éxito tu relato/propuesta para el portal Entrevecinas.cl.</p>
                        <h3>Resumen de tu propuesta:</h3>
                        <p><b>Asistente:</b> ${assistant.name} (${assistant.role})</p>
                        <p><b>Tu relato:</b></p>
                        <blockquote style="border-left: 4px solid #ec4899; padding-left: 15px; margin-left: 0; color: #4b5563;">
                            ${formData.aiDraft || formData.rawIdea}
                        </blockquote>
                        <p><b>Archivos adjuntos:</b> ${selectedFiles.length} (${formData.hasVideo ? 'Incluye video' : 'Solo fotos'})</p>
                        <br/>
                        <p>Nuestro equipo editorial revisará el material y nos pondremos en contacto contigo pronto.</p>
                        <p>¡Gracias por cocrear con nosotras!</p>
                        <p><b>Equipo Entrevecinas - Smart Comuna VLS</b></p>
                    `
                })
            });
            
            // Aquí iría la lógica real de Supabase o Cloudflare Workers para subir los archivos
            console.log("Datos enviados:", {
                name: formData.name,
                email: formData.email,
                topic: formData.topic,
                story: formData.aiDraft || formData.rawIdea,
                hasVideo: formData.hasVideo,
                filesCount: selectedFiles.length
            });
            
            setStep(5);
        } catch (error) {
            console.error("Submission error:", error);
            alert("Hubo un problema de conexión con la señal vecinal al intentar enviar el correo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Asistente de Narrativa VLS (Simulado)
    const generateHelp = () => {
        if (!formData.rawIdea) return;
        setIsGenerating(true);
        setTimeout(() => {
            const structure = `🌟 ESTRUCTURA RECOMENDADA:\n1. INICIO: Hola vecinas, soy ${formData.name || 'una vecina'} y les quiero contar sobre...\n2. DESARROLLO: Lo más importante de esta historia es que...\n3. CIERRE: ¿Qué opinan ustedes? Las leo en los comentarios.\n\n✨ TÍTULO SUGERIDO: "El Valor de ${formData.rawIdea.split(' ')[0]} en nuestro Barrio"`;
            setFormData(prev => ({ ...prev, aiDraft: structure }));
            setIsGenerating(false);
            setStep(3);
        }, 1500);
    };

    if (!isOpen) return null;

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(15px)', background: 'rgba(2, 6, 23, 0.85)' }}>
            
            {/* INPUTS DE ARCHIVOS OCULTOS */}
            <input type="file" id="vls-video-upload" accept="video/*" style={{ display: 'none' }} onChange={handleFileSelect} />
            <input type="file" id="vls-photo-upload" accept="image/*" multiple style={{ display: 'none' }} onChange={handleFileSelect} />

            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                style={{
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
                    width: '100%',
                    maxWidth: '800px',
                    minHeight: '600px',
                    borderRadius: '40px',
                    border: `1px solid ${assistant.color}40`,
                    boxShadow: `0 40px 100px rgba(0,0,0,0.8), 0 0 50px ${assistant.color}15`,
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                {/* Header Dinámico */}
                <div style={{ padding: '2rem 3rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: assistant.color, padding: '10px', borderRadius: '12px' }}>
                            <Sparkles size={24} color="white" />
                        </div>
                        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 900, color: 'white' }}>Cocreación Ciudadana</h2>
                    </div>
                    <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <X size={20} color="white" />
                    </button>
                </div>

                <div style={{ flex: 1, padding: '3rem', position: 'relative', overflowY: 'auto' }}>
                    
                    {/* PASO 1: MOTIVACIÓN */}
                    {step === 1 && (
                         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center' }}>
                             <div style={{ position: 'relative', display: 'inline-block', marginBottom: '2rem' }}>
                                <img src={assistant.img} style={{ width: '160px', height: '160px', borderRadius: '40px', border: `4px solid ${assistant.color}`, objectFit: 'cover', boxShadow: `0 10px 30px ${assistant.color}30` }} />
                                 <div style={{ position: 'absolute', bottom: '5px', right: '5px', background: '#10b981', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 'bold', border: '2px solid #0f172a' }}>EN LÍNEA</div>
                             </div>
                             <div style={{ color: assistant.color, fontWeight: 950, fontSize: '0.9rem', marginBottom: '0.5rem', letterSpacing: '2px' }}>{assistant.role.toUpperCase()}</div>
                             <h3 style={{ fontSize: '2.5rem', fontWeight: 950, marginBottom: '1.5rem', lineHeight: '1' }}>¡Tu historia merece ser contada!</h3>
                             <p style={{ color: '#94a3b8', fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '2.5rem' }}>
                                 {assistant.welcome}
                             </p>
                             <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                                 <button 
                                     onClick={() => setStep(2)}
                                     style={{ background: assistant.color, color: 'white', border: 'none', padding: '1rem 3rem', fontSize: '1.1rem', fontWeight: 900, borderRadius: '50px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: `0 10px 20px ${assistant.color}40` }}
                                 >
                                     EMPEZAR A CONTAR <ChevronRight size={20} />
                                 </button>
                             </div>
                         </motion.div>
                    )}

                    {/* PASO 2: IDEA RAW */}
                    {step === 2 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                            <h4 style={{ color: assistant.color, fontSize: '0.9rem', fontWeight: 900, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>Paso 2 de 4</h4>
                            <h3 style={{ fontSize: '2.2rem', fontWeight: 950, marginBottom: '2rem' }}>¿Qué tienes en mente?</h3>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ display: 'block', color: '#94a3b8', marginBottom: '8px', fontSize: '0.9rem' }}>Tu nombre</label>
                                        <input 
                                            type="text" 
                                            placeholder="Ej: María José"
                                            value={formData.name}
                                            onChange={e => setFormData({...formData, name: e.target.value})}
                                            style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '15px', color: 'white', outline: 'none' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', color: '#94a3b8', marginBottom: '8px', fontSize: '0.9rem' }}>Tu correo <span style={{ color: assistant.color }}>*</span></label>
                                        <input 
                                            type="email" 
                                            placeholder="Ej: vecina@correo.cl"
                                            value={formData.email}
                                            onChange={e => setFormData({...formData, email: e.target.value})}
                                            style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '15px', color: 'white', outline: 'none' }}
                                        />
                                    </div>
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <label style={{ color: '#94a3b8', marginBottom: '8px', fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        Cuéntame tu idea (en bruto) 
                                        <span style={{ fontSize: '0.7rem', color: assistant.color, fontWeight: 'bold' }}>Toca TAB para sugerencias</span>
                                    </label>
                                    <textarea 
                                        placeholder="Pulsar TAB para sugerencias de temas..."
                                        rows={4}
                                        value={formData.rawIdea}
                                        onKeyDown={handleKeyDown}
                                        onChange={e => setFormData({...formData, rawIdea: e.target.value})}
                                        style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '15px', color: 'white', outline: 'none', resize: 'none' }}
                                    />
                                </div>
                                <button 
                                    disabled={!formData.rawIdea || !formData.email || isGenerating}
                                    onClick={generateHelp}
                                    style={{ 
                                        background: assistant.color, 
                                        color: 'white', border: 'none', padding: '1.2rem', 
                                        fontSize: '1rem', fontWeight: 950, borderRadius: '15px', 
                                        cursor: (!formData.rawIdea || !formData.email || isGenerating) ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', 
                                        justifyContent: 'center', gap: '12px', opacity: (formData.rawIdea && formData.email) ? 1 : 0.5 
                                    }}
                                >
                                    {isGenerating ? <RefreshCw className="animate-spin" size={20} /> : <Wand2 size={20} />} 
                                    DARLE FORMA A MI HISTORIA
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* PASO 3: ASISTENTE AI */}
                    {step === 3 && (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                                <div style={{ background: assistant.color, padding: '8px', borderRadius: '50%' }}><Lightbulb size={20} color="white" /></div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, margin: 0 }}>¡Diseño Narrativo Listo!</h3>
                            </div>
                            
                            <div style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${assistant.color}40`, padding: '2rem', borderRadius: '25px', marginBottom: '2rem', position: 'relative' }}>
                                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'inherit', color: '#e2e8f0', lineHeight: '1.6', fontSize: '1.1rem' }}>
                                    {formData.aiDraft}
                                </pre>
                            </div>

                            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '2rem' }}>Puedes usar esta estructura como guion para tu video o para el texto final.</p>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button 
                                    onClick={() => setStep(2)}
                                    style={{ flex: 1, background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '50px', fontWeight: 'bold' }}
                                >
                                    ATRÁS
                                </button>
                                <button 
                                    onClick={() => setStep(4)}
                                    style={{ flex: 2, background: assistant.color, color: 'white', border: 'none', padding: '1rem', borderRadius: '50px', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                                >
                                    CONTINUAR A CARGA <ChevronRight size={20} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* PASO 4: CARGA DE MULTIMEDIA */}
                    {step === 4 && (
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center' }}>
                            <h3 style={{ fontSize: '2.5rem', fontWeight: 950, marginBottom: '2rem' }}>¡Sube tu contenido!</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
                                <div 
                                    style={{ background: `${assistant.color}05`, border: `3px dashed ${assistant.color}40`, padding: '3rem', borderRadius: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', cursor: 'pointer' }} 
                                    onClick={() => document.getElementById('vls-video-upload').click()}
                                >
                                    <Video size={50} color={assistant.color} />
                                    <div style={{ fontWeight: 'bold' }}>Subir Video</div>
                                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Max 100MB (MP4/MOV)</div>
                                </div>
                                <div 
                                    style={{ background: 'rgba(236, 72, 153, 0.05)', border: '3px dashed rgba(236, 72, 153, 0.3)', padding: '3rem', borderRadius: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}
                                    onClick={() => document.getElementById('vls-photo-upload').click()}
                                >
                                    <ImageIcon size={50} color="#ec4899" />
                                    <div style={{ fontWeight: 'bold' }}>Subir Fotos</div>
                                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>JPEG/PNG</div>
                                </div>
                            </div>

                            {selectedFiles.length > 0 && (
                                <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem 2rem', borderRadius: '15px', color: '#10b981', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '2rem', textAlign: 'left' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' }}>
                                        <CheckCircle2 size={20} /> Archivos listos para enviar ({selectedFiles.length}):
                                    </div>
                                    <ul style={{ margin: 0, paddingLeft: '2rem', fontSize: '0.8rem' }}>
                                        {selectedFiles.map((f, i) => <li key={i}>{f.name} ({(f.size/1024/1024).toFixed(2)} MB)</li>)}
                                    </ul>
                                </div>
                            )}

                            <button 
                                disabled={isSubmitting}
                                onClick={handleSubmit}
                                style={{ width: '100%', background: assistant.color, color: 'white', border: 'none', padding: '1.5rem', fontSize: '1.2rem', fontWeight: 900, borderRadius: '20px', cursor: isSubmitting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', boxShadow: `0 15px 30px ${assistant.color}40`, opacity: isSubmitting ? 0.7 : 1 }}
                            >
                                {isSubmitting ? <RefreshCw className="animate-spin" size={24} /> : <Send size={24} />} 
                                {isSubmitting ? 'ENVIANDO A LA NUBE...' : 'ENVIAR A ENTREVECINAS.CL'}
                            </button>
                        </motion.div>
                    )}

                    {/* PASO 5: ÉXITO */}
                    {step === 5 && (
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center' }}>
                            <div style={{ width: '100px', height: '100px', background: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', boxShadow: '0 0 40px rgba(16, 185, 129, 0.4)' }}>
                                <CheckCircle2 size={60} color="white" />
                            </div>
                            <h3 style={{ fontSize: '3rem', fontWeight: 950, marginBottom: '1.5rem' }}>¡Misión Cumplida!</h3>
                            <p style={{ color: '#94a3b8', fontSize: '1.3rem', lineHeight: '1.6', marginBottom: '3rem' }}>
                                Tu propuesta ha sido recibida con éxito. Nuestro equipo editorial VLS revisará el material y nos pondremos en contacto contigo pronto.
                            </p>
                            <button 
                                onClick={onClose}
                                style={{ background: 'white', color: '#020617', border: 'none', padding: '1rem 3rem', fontSize: '1.1rem', fontWeight: 950, borderRadius: '50px', cursor: 'pointer' }}
                            >
                                VOLVER AL PORTAL
                            </button>
                        </motion.div>
                    )}

                </div>

                {/* Footer / Progress */}
                <div style={{ padding: '1rem 3rem', background: 'rgba(0,0,0,0.2)', display: 'flex', gap: '8px', justifyContent: 'center' }}>
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} style={{ width: '40px', height: '4px', background: step >= i ? assistant.color : 'rgba(255,255,255,0.1)', borderRadius: '2px', transition: '0.3s' }} />
                    ))}
                </div>
            </motion.div>

            <style jsx>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
            `}</style>
        </div>
    );
}
