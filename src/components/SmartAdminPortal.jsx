import React, { useState, useRef, useEffect } from 'react';
import { X, ShieldCheck, FileText, Camera, CheckCircle2, GraduationCap, Download, PenTool, Send, History, PlayCircle, Trophy, UserCheck, AlertCircle, Smartphone } from 'lucide-react';
import SmartAdminService from '../services/SmartAdminService';

/**
 * SmartAdminPortal: Pilar #2 de Smart Administration (VLS)
 * Gestiona Inducción, Digitalización de Informes (Honorarios) y Firma Digital.
 * Cumple con la Regla #4: Backoffice Móvil (Cámara y Fotos).
 */
export default function SmartAdminPortal({ onClose, currentUser }) {
    const [activeSection, setActiveSection] = useState('reports'); // reports, elearning, history
    const [reportContent, setReportContent] = useState('');
    const [capturedPhotos, setCapturedPhotos] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSigned, setIsSigned] = useState(false);
    
    // E-learning status
    const [courses, setCourses] = useState([
        { id: 'induccion', name: 'Inducción al Teletrabajo Municipal', progress: 85, completed: false, description: 'Protocolos de seguridad y uso de herramientas VLS.' },
        { id: 'smart-city', name: 'Gestión Smart City VLS', progress: 30, completed: false, description: 'Introducción a modelos de ciudad inteligente de bajo costo.' }
    ]);

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);

    const openCamera = async () => {
        setIsCameraOpen(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            if (videoRef.current) videoRef.current.srcObject = stream;
        } catch (err) {
            alert("No se pudo acceder a la cámara. Verifique los permisos.");
            setIsCameraOpen(false);
        }
    };

    const capturePhoto = () => {
        if (canvasRef.current && videoRef.current) {
            const context = canvasRef.current.getContext('2d');
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
            context.drawImage(videoRef.current, 0, 0);
            const photoUrl = canvasRef.current.toDataURL('image/jpeg');
            setCapturedPhotos([...capturedPhotos, photoUrl]);
            
            // Cerrar cámara después de captura si se desea, o dejarla abierta
            // Para backoffice ágil la dejaremos abierta para capturas múltiples
        }
    };

    const closeCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }
        setIsCameraOpen(false);
    };

    const handleSubmitReport = async () => {
        if (!reportContent || !isSigned) return alert("Complete el informe y firme digitalmente.");
        setIsSubmitting(true);
        setTimeout(() => {
            SmartAdminService.submitReport(currentUser?.id || 'TEST-USER', { content: reportContent, photos: capturedPhotos, signature: 'Validated-VLS-Signature' });
            setIsSubmitting(false);
            setReportContent('');
            setCapturedPhotos([]);
            setIsSigned(false);
            alert("Informe digitalizado enviado con éxito.");
            setActiveSection('history');
        }, 1500);
    };

    const handleCompleteCourse = (courseId) => {
        SmartAdminService.completeCourse(currentUser?.id || 'TEST-USER', courseId);
        setCourses(courses.map(c => c.id === courseId ? { ...c, completed: true, progress: 100 } : c));
        alert("¡Felicitaciones! Has completado el curso y tu certificado está disponible.");
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100070, background: '#020617', display: 'flex', flexDirection: 'column', color: 'white' }}>
            {/* Header VLS Admin Style */}
            <div style={{ background: 'linear-gradient(90deg, #1e293b, #0f172a)', padding: '1.2rem 2.5rem', borderBottom: '2px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ background: '#10b981', padding: '10px', borderRadius: '12px' }}><ShieldCheck size={28} /></div>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '900', letterSpacing: '1px' }}>SMART ADMINISTRATION VLS</h1>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#10b981', fontWeight: 'bold' }}>SISTEMA DE GESTIÓN INTERNA MUNICIPAL (HNR / CTR)</p>
                    </div>
                </div>
                <button onClick={onClose} style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '50%', padding: '0.8rem', cursor: 'pointer' }}><X size={24} /></button>
            </div>

            {/* Sub-Nav */}
            <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '0 2.5rem', borderBottom: '1px solid #334155', display: 'flex', gap: '2rem' }}>
                {[
                    { id: 'reports', label: '📰 Digitalización de Informes', icon: FileText },
                    { id: 'elearning', label: '🎓 Inducción E-Learning', icon: GraduationCap },
                    { id: 'history', label: '📂 Historial de Gestión', icon: History }
                ].map(nav => (
                    <button 
                        key={nav.id} 
                        onClick={() => setActiveSection(nav.id)}
                        style={{ padding: '1.2rem 0', background: 'transparent', border: 'none', borderBottom: activeSection === nav.id ? '3px solid #10b981' : '3px solid transparent', color: activeSection === nav.id ? '#10b981' : '#64748B', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s' }}
                    >
                        <nav.icon size={18} /> {nav.label}
                    </button>
                ))}
            </div>

            {/* Main Content Area */}
            <div style={{ flex: 1, padding: '3rem 2.5rem', overflowY: 'auto' }}>
                
                {activeSection === 'reports' && (
                    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '3rem', maxWidth: '1400px', margin: '0 auto' }}>
                        {/* Editor de Informe */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <h3 style={{ marginTop: 0, color: '#10b981', display: 'flex', alignItems: 'center', gap: '10px' }}>🧾 Informe Mensual de Actividades</h3>
                                <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Escriba el detalle de sus gestiones técnicas o administrativas realizadas en el periodo.</p>
                                <textarea 
                                    value={reportContent} onChange={e => setReportContent(e.target.value)}
                                    placeholder="Describa sus actividades aquí (ej: Mantenimiento cámaras sector centro, atención de 45 vecinos, registro de incidencias...)"
                                    style={{ width: '100%', minHeight: '300px', background: '#000', color: 'white', borderRadius: '15px', padding: '1.5rem', border: '1px solid #334155', outline: 'none', fontSize: '1rem', lineHeight: '1.6' }}
                                />
                            </div>

                            {/* Captura de Evidencia (Regla #4) */}
                            <div style={{ background: 'rgba(59, 130, 246, 0.05)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                    <h3 style={{ margin: 0, color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '10px' }}><Camera /> Registro Fotográfico (Cámara Móvil)</h3>
                                    {!isCameraOpen ? (
                                        <button onClick={openCamera} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><Smartphone size={18} /> Abrir Cámara</button>
                                    ) : (
                                        <button onClick={closeCamera} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Finalizar Captura</button>
                                    )}
                                </div>

                                {isCameraOpen && (
                                    <div style={{ position: 'relative', width: '100%', maxWidth: '480px', margin: '0 auto 1.5rem', borderRadius: '16px', overflow: 'hidden', border: '4px solid #3b82f6' }}>
                                        <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: 'auto', display: 'block' }}></video>
                                        <button onClick={capturePhoto} style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', width: '70px', height: '70px', background: 'white', borderRadius: '50%', border: '5px solid #3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 0 20px rgba(0,0,0,0.5)' }}>
                                            <div style={{ width: '50px', height: '50px', borderRadius: '50%', border: '2px solid #333' }}></div>
                                        </button>
                                        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                                    </div>
                                )}

                                <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', padding: '0.5rem 0' }}>
                                    {capturedPhotos.map((photo, i) => (
                                        <div key={i} style={{ position: 'relative', minWidth: '100px', height: '100px', borderRadius: '10px', overflow: 'hidden', border: '2px solid #3b82f6' }}>
                                            <img src={photo} alt="Evidencia" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            <button onClick={() => setCapturedPhotos(capturedPhotos.filter((_, idx) => idx !== i))} style={{ position: 'absolute', top: 5, right: 5, background: '#ef4444', border: 'none', borderRadius: '50%', width: '24px', height: '24px', color: 'white', cursor: 'pointer' }}><X size={14} /></button>
                                        </div>
                                    ))}
                                    {capturedPhotos.length === 0 && <p style={{ color: '#64748B', fontSize: '0.85rem' }}>Aún no hay fotos cargadas. Use la cámara para registros in situ.</p>}
                                </div>
                            </div>
                        </div>

                        {/* Firma y Validación */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ background: '#111', padding: '2rem', borderRadius: '24px', border: '1px solid #333' }}>
                                <h3 style={{ marginTop: 0, color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '10px' }}><PenTool /> Firma Digital VLS</h3>
                                <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '1.5rem' }}>La firma digital certifica el cumplimiento de sus labores según el reglamento municipal vigente.</p>
                                
                                <div onClick={() => setIsSigned(true)} style={{ height: '150px', background: '#000', borderRadius: '15px', border: `2px dashed ${isSigned ? '#10b981' : '#444'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
                                    {isSigned ? (
                                        <div style={{ textAlign: 'center' }}>
                                            <PenTool size={48} color="#10b981" />
                                            <p style={{ margin: '5px 0 0 0', color: '#10b981', fontWeight: 'bold' }}>Firmado Digitalmente</p>
                                            <CheckCircle2 size={16} color="#10b981" style={{ position: 'absolute', top: 10, right: 10 }} />
                                        </div>
                                    ) : (
                                        <div style={{ color: '#64748B', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                                            <PenTool size={32} />
                                            <span>Clic para Firmar</span>
                                        </div>
                                    )}
                                </div>

                                <button 
                                    onClick={handleSubmitReport}
                                    disabled={isSubmitting || !isSigned}
                                    style={{ width: '100%', marginTop: '2rem', background: isSigned ? '#10b981' : '#334155', color: 'white', border: 'none', padding: '1.2rem', borderRadius: '15px', fontWeight: '900', fontSize: '1rem', letterSpacing: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: isSigned ? 'pointer' : 'not-allowed', transition: 'all 0.3s' }}
                                >
                                    {isSubmitting ? 'PROCESANDO ENVÍO...' : <><Send size={20} /> ENVIAR INFORME A RRHH</>}
                                </button>
                            </div>

                            <div style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '1.5rem', borderRadius: '15px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                    <AlertCircle color="#10b981" />
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#cbd5e1' }}>Recuerde que este informe es auditoría para el pago de sus honorarios correspondientes al mes en curso.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === 'elearning' && (
                    <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <h2 style={{ color: '#fbbf24', fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem' }}>PORTAL DE INDUCCIÓN Y CAPACITACIÓN</h2>
                            <p style={{ color: '#94A3B8' }}>Fortalecemos el talento municipal con educación digital de vanguardia.</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            {courses.map(course => (
                                <div key={course.id} className="glass-panel" style={{ padding: '2rem', background: '#1e293b', border: '1px solid #334155', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
                                    {course.completed && <div style={{ position: 'absolute', top: -15, right: 20, background: '#10b981', color: 'white', padding: '0.5rem 1rem', borderRadius: '30px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}><Trophy size={16} /> Completado</div>}
                                    
                                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                        <div style={{ background: 'rgba(251, 191, 36, 0.1)', color: '#fbbf24', padding: '12px', borderRadius: '15px' }}><PlayCircle size={32} /></div>
                                        <h3 style={{ margin: 0, fontSize: '1.2rem', lineHeight: '1.3' }}>{course.name}</h3>
                                    </div>
                                    
                                    <p style={{ color: '#cbd5e1', fontSize: '0.9rem', margin: 0 }}>{course.description}</p>
                                    
                                    <div style={{ background: 'rgba(0,0,0,0.3)', height: '10px', borderRadius: '5px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        <div style={{ height: '100%', width: `${course.progress}%`, background: '#fbbf24', transition: 'width 1s' }}></div>
                                    </div>
                                    
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                        <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Progreso: {course.progress}%</span>
                                        {!course.completed ? (
                                            <button onClick={() => handleCompleteCourse(course.id)} style={{ background: '#fbbf24', color: 'black', border: 'none', padding: '0.7rem 1.5rem', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Continuar Módulo</button>
                                        ) : (
                                            <button style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', border: '1px solid #10b981', padding: '0.7rem 1.5rem', borderRadius: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                                <Download size={18} /> Descargar Diploma
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: '4rem', padding: '3rem', background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', borderRadius: '32px', textAlign: 'center', border: '1px solid rgba(251, 191, 36, 0.3)' }}>
                            <GraduationCap size={64} color="#fbbf24" style={{ marginBottom: '1.5rem' }} />
                            <h3>¿Necesitas formación en un área específica?</h3>
                            <p style={{ color: '#94A3B8', maxWidth: '600px', margin: '0 auto 2rem' }}>Solicite a su jefatura la apertura de nuevos módulos de especialización en herramientas tecnológicas.</p>
                            <button className="btn-glass" style={{ padding: '1rem 2rem', borderRadius: '15px' }}>Solicitar Nuevo Curso</button>
                        </div>
                    </div>
                )}

                {activeSection === 'history' && (
                    <div className="animate-fade-in" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <div style={{ background: '#111', borderRadius: '24px', padding: '2.5rem', border: '1px solid #333' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                                <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '15px' }}><History color="#10b981" /> Registro Histórico de Gestión</h3>
                                <button className="btn-glass" style={{ fontSize: '0.8rem' }}><Download size={16} /> Exportar Todo</button>
                            </div>

                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid #333', color: '#64748B', fontSize: '0.85rem' }}>
                                        <th style={{ padding: '1rem 0' }}>FECHA ENVÍO</th>
                                        <th>CÓDIGO REPORTE</th>
                                        <th>ESTADO RRHH</th>
                                        <th>EVIDENCIAS</th>
                                        <th>ACCIONES</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ borderBottom: '1px solid #222' }}>
                                        <td style={{ padding: '1.5rem 0' }}>15 Mar 2024, 09:45</td>
                                        <td style={{ fontWeight: 'bold', color: '#38bdf8' }}>REP-9920112</td>
                                        <td><span style={{ color: '#10b981', padding: '4px 10px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>✓ APROBADO</span></td>
                                        <td>3 Fotos JPG</td>
                                        <td><button style={{ background: 'transparent', border: 'none', color: '#10b981', cursor: 'pointer', fontWeight: 'bold' }}>Ver Detalle</button></td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid #222' }}>
                                        <td style={{ padding: '1.5rem 0' }}>14 Feb 2024, 11:20</td>
                                        <td style={{ fontWeight: 'bold', color: '#38bdf8' }}>REP-9912833</td>
                                        <td><span style={{ color: '#10b981', padding: '4px 10px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>✓ APROBADO</span></td>
                                        <td>5 Fotos JPG</td>
                                        <td><button style={{ background: 'transparent', border: 'none', color: '#10b981', cursor: 'pointer', fontWeight: 'bold' }}>Ver Detalle</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div style={{ marginTop: '2.5rem', display: 'flex', gap: '2rem' }}>
                            <div style={{ flex: 1, background: 'rgba(56, 189, 248, 0.05)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(56, 189, 248, 0.1)', textAlign: 'center' }}>
                                <UserCheck size={32} color="#38bdf8" style={{ marginBottom: '1rem' }} />
                                <h4 style={{ margin: 0 }}>Gestión VLS Certificada</h4>
                                <p style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Usted ha cumplido con el 100% de los informes del trimestre.</p>
                            </div>
                            <div style={{ flex: 1, background: 'rgba(16, 185, 129, 0.05)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(16, 185, 129, 0.1)', textAlign: 'center' }}>
                                <GraduationCap size={32} color="#10b981" style={{ marginBottom: '1rem' }} />
                                <h4 style={{ margin: 0 }}>Cumplimiento Formativo</h4>
                                <p style={{ fontSize: '0.8rem', color: '#94A3B8' }}>1 de 2 cursos de inducción completados.</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                .animate-fade-in { animation: fadeIn 0.5s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .glass-panel:hover { transform: translateY(-5px); transition: all 0.3s; }
            `}</style>
        </div>
    );
}
