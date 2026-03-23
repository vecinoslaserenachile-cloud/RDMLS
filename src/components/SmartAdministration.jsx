import React, { useState, useRef, useEffect } from 'react';
import { 
    X as CloseIcon, GraduationCap, FileSignature, Camera, Upload, 
    CheckCircle2, Award, BookOpen, Video, Trash2, 
    Download, PenTool, ClipboardList, Briefcase, Smartphone, Send, History, Trophy, PlayCircle, ShieldCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SmartAdminService from '../services/SmartAdminService';

/**
 * SmartAdministration: Pilar #2 de Smart Administration (VLS)
 * Atiende: E-learning (Inducción + Diplomas) y Digitalización de Informes (Honorarios/Contrata).
 * Cumple con Regla #4: Backoffice Móvil con Cámara.
 */
export default function SmartAdministration({ onClose, currentUser }) {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('reports'); // learning, reports, history
    const [reportContent, setReportContent] = useState('');
    const [capturedPhotos, setCapturedPhotos] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSigned, setIsSigned] = useState(false);
    
    // E-learning status
    const [courses, setCourses] = useState([
        { id: 'induccion', name: 'Inducción al Teletrabajo ComunaSmart', progress: 85, completed: false, description: 'Protocolos de seguridad y uso de herramientas digitales institucionales.' },
        { id: 'smart-city', name: 'Gestión Smart City La Serena', progress: 30, completed: false, description: 'Introducción a modelos de ciudad inteligente y gobernanza soberana.' }
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
            alert("Acceso a cámara denegado o no disponible.");
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
            SmartAdminService.submitReport(currentUser?.id || 'VLS-USER', { content: reportContent, photos: capturedPhotos, signature: 'Validated-VLS-Signature' });
            setIsSubmitting(false);
            setReportContent('');
            setCapturedPhotos([]);
            setIsSigned(false);
            alert("Informe enviado a revisión de RRHH.");
            setActiveTab('history');
        }, 1500);
    };

    const handleCompleteCourse = (courseId) => {
        if (courseId === 'induccion') {
            // El componente VLSInduccion ya maneja el flujo completo
            navigate('/induccion');
            onClose();
            return;
        }
        SmartAdminService.completeCourse(currentUser?.id || 'VLS-USER', courseId);
        setCourses(courses.map(c => c.id === courseId ? { ...c, completed: true, progress: 100 } : c));
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100075, background: '#020617', display: 'flex', flexDirection: 'column', color: 'white', fontFamily: "'Outfit', sans-serif" }}>
            {/* Header */}
            <div style={{ background: 'linear-gradient(90deg, #1e293b, #0f172a)', padding: '1rem 2rem', borderBottom: '2px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ background: '#10b981', padding: '10px', borderRadius: '12px' }}><ShieldCheck size={28} /></div>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '900', letterSpacing: '1px' }}>SMART ADMINISTRATION · COMUNASMART</h1>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#10b981', fontWeight: 'bold' }}>SISTEMA DE GESTIÓN INTERNA MUNICIPAL (HNR / CTR)</p>
                    </div>
                </div>
                <button onClick={onClose} style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '50%', padding: '0.6rem', cursor: 'pointer' }}><CloseIcon size={24} /></button>
            </div>

            {/* Nav */}
            <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '0 2rem', borderBottom: '1px solid #334155', display: 'flex', gap: '2rem' }}>
                {[
                    { id: 'learning', label: '🎓 E-Learning', icon: GraduationCap },
                    { id: 'reports', label: '📰 Informes Digitales', icon: FileSignature },
                    { id: 'history', label: '📂 Historial', icon: History }
                ].map(nav => (
                    <button 
                        key={nav.id} 
                        onClick={() => setActiveTab(nav.id)}
                        style={{ padding: '1rem 0', background: 'transparent', border: 'none', borderBottom: activeTab === nav.id ? '3px solid #10b981' : '3px solid transparent', color: activeTab === nav.id ? '#10b981' : '#64748B', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s' }}
                    >
                        <nav.icon size={18} /> {nav.label}
                    </button>
                ))}
            </div>

            <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    
                    {activeTab === 'learning' && (
                        <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                            {courses.map(course => (
                                <div key={course.id} style={{ background: '#1e293b', padding: '2rem', borderRadius: '24px', border: '1px solid #334155', position: 'relative' }}>
                                    {course.completed && <Trophy style={{ position: 'absolute', top: 20, right: 20 }} color="#10b981" />}
                                    <h3 style={{ margin: '0 0 1rem 0', color: '#fbbf24' }}>{course.name}</h3>
                                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', minHeight: '60px' }}>{course.description}</p>
                                    <div style={{ background: '#000', height: '8px', borderRadius: '4px', margin: '1.5rem 0', overflow: 'hidden' }}>
                                        <div style={{ width: `${course.progress}%`, height: '100%', background: '#fbbf24' }}></div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{course.progress}% Completado</span>
                                        {!course.completed ? (
                                            <button onClick={() => handleCompleteCourse(course.id)} style={{ background: '#fbbf24', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Continuar</button>
                                        ) : (
                                            <button onClick={() => alert("Generando Diploma VLS...")} style={{ background: '#10b981', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}><Download size={16} /> Diploma</button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'reports' && (
                        <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem' }}>
                            <div>
                                <textarea 
                                    value={reportContent} onChange={e => setReportContent(e.target.value)}
                                    placeholder="Detalle sus actividades del mes aquí (obligatorio para pago de honorarios)..."
                                    style={{ width: '100%', minHeight: '400px', background: '#000', color: 'white', borderRadius: '20px', padding: '2rem', border: '1px solid #334155', fontSize: '1.1rem', outline: 'none' }}
                                />
                                <div style={{ marginTop: '2rem', background: '#111', padding: '1.5rem', borderRadius: '20px', border: '1px solid #333' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                        <h4 style={{ margin: 0, color: '#3b82f6' }}><Camera size={20} /> Evidencia Digital (Manejo de Cámara Regla #4)</h4>
                                        <button onClick={isCameraOpen ? closeCamera : openCamera} style={{ background: '#3b82f6', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>{isCameraOpen ? 'Cerrar Cámara' : 'Abrir Cámara'}</button>
                                    </div>
                                    {isCameraOpen && (
                                        <div style={{ position: 'relative', width: '100%', maxWidth: '400px', margin: '1rem auto' }}>
                                            <video ref={videoRef} autoPlay playsInline style={{ width: '100%', borderRadius: '12px', border: '3px solid #3b82f6' }} />
                                            <button onClick={capturePhoto} style={{ position: 'absolute', bottom: 15, left: '50%', transform: 'translateX(-50%)', width: '60px', height: '60px', background: 'white', borderRadius: '50%', border: '4px solid #3b82f6' }} />
                                            <canvas ref={canvasRef} style={{ display: 'none' }} />
                                        </div>
                                    )}
                                    <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', padding: '1rem 0' }}>
                                        {capturedPhotos.map((p, i) => <img key={i} src={p} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '10px', border: '2px solid #3b82f6' }} />)}
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div style={{ background: '#111', padding: '2rem', borderRadius: '24px', border: '2px dashed #444', textAlign: 'center' }}>
                                    <h4 style={{ margin: '0 0 1.5rem 0' }}>Firma Digital de Informe</h4>
                                    <div onClick={() => setIsSigned(true)} style={{ height: '150px', background: '#000', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                        {isSigned ? <div style={{ color: '#10b981', fontWeight: 'bold' }}><PenTool size={40} /><br />DOCUMENTO FIRMADO</div> : <span>Clic para estampar firma digital VLS</span>}
                                    </div>
                                    <button 
                                        onClick={handleSubmitReport} disabled={!isSigned || isSubmitting}
                                        style={{ width: '100%', marginTop: '2rem', padding: '1.2rem', borderRadius: '12px', border: 'none', background: isSigned ? '#10b981' : '#334155', color: 'white', fontWeight: '900', cursor: isSigned ? 'pointer' : 'not-allowed' }}
                                    >
                                        {isSubmitting ? 'ENVIANDO...' : 'ENVIAR TODO A RRHH'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'history' && (
                         <div className="animate-fade-in" style={{ background: '#111', padding: '2rem', borderRadius: '24px', textAlign: 'center' }}>
                            <History size={60} color="#64748b" style={{ marginBottom: '1.5rem' }} />
                            <h3>No hay tareas pendientes</h3>
                            <p style={{ color: '#64748b' }}>Todas su gestiones han sido enviadas y validadas por RRHH.</p>
                         </div>
                    )}

                </div>
            </div>
            <style>{`
                .animate-fade-in { animation: fadeIn 0.5s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
}
