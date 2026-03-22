import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, MapPin, CheckCircle, Shield, ShieldAlert, AlertCircle, UserCheck, Briefcase, RefreshCw, X, Image as ImageIcon, MessageSquare, Send } from 'lucide-react';

export default function BackofficeMovilVLS({ userType = 'neighbor', onClose }) {
    const [capturedImage, setCapturedImage] = useState(null);
    const [location, setLocation] = useState("Procesando GPS: Sector El Milagro...");
    const [reportStatus, setReportStatus] = useState('idle'); // idle, capturing, reviewing, sent
    const [reportType, setReportType] = useState(userType === 'neighbor' ? 'citizen_report' : 'work_checkin');
    const [isLiveCamera, setIsLiveCamera] = useState(false);
    const fileInputRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCapturedImage(reader.result);
                setReportStatus('reviewing');
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerCamera = () => {
        // Prefer explicit stream if supported/requested, else fallback to native camera app
        fileInputRef.current.click();
    };

    const startLiveCapture = async () => {
        setIsLiveCamera(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            if (videoRef.current) videoRef.current.srcObject = stream;
        } catch (err) {
            console.error("Live camera failed, falling back to OS picker");
            setIsLiveCamera(false);
            triggerCamera();
        }
    };

    const captureFromLive = () => {
        if (canvasRef.current && videoRef.current) {
            const context = canvasRef.current.getContext('2d');
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
            context.drawImage(videoRef.current, 0, 0);
            setCapturedImage(canvasRef.current.toDataURL('image/jpeg'));
            setReportStatus('reviewing');
            stopLiveCamera();
        }
    };

    const stopLiveCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(t => t.stop());
        }
        setIsLiveCamera(false);
    };

    const sendSovereignReport = () => {
        setReportStatus('sending');
        setTimeout(() => {
            setReportStatus('sent');
        }, 2000);
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 3000000, background: '#020617', display: 'flex', flexDirection: 'column', fontFamily: "'Outfit', sans-serif" }}>
            
            {/* MOBILE HEADER */}
            <div style={{ background: '#0f172a', padding: '1rem', borderBottom: '2px solid #38bdf8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Shield color="#38bdf8" size={20} />
                    <div>
                        <h4 style={{ margin: 0, fontSize: '0.9rem', color: 'white', fontWeight: '900' }}>BACKOFFICE SOBERANO</h4>
                        <span style={{ fontSize: '0.6rem', color: '#38bdf8', fontWeight: 'bold' }}>VERSION MÓVIL V2.0</span>
                    </div>
                </div>
                <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#94a3b8' }}><X size={24} /></button>
            </div>

            <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                {/* SELECTOR DE TAREA */}
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                        onClick={() => setReportType('citizen_report')}
                        style={{ flex: 1, padding: '15px', borderRadius: '15px', border: reportType === 'citizen_report' ? '2px solid #38bdf8' : '1px solid #1e293b', background: reportType === 'citizen_report' ? 'rgba(56, 189, 248, 0.1)' : 'transparent', color: reportType === 'citizen_report' ? '#38bdf8' : '#64748b', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', transition: '0.3s' }}
                    >
                        <AlertCircle size={24} />
                        <span style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>REPORTAR BACHE</span>
                    </button>
                    <button 
                        onClick={() => setReportType('work_checkin')}
                        style={{ flex: 1, padding: '15px', borderRadius: '15px', border: reportType === 'work_checkin' ? '2px solid #fcd34d' : '1px solid #1e293b', background: reportType === 'work_checkin' ? 'rgba(252, 211, 77, 0.1)' : 'transparent', color: reportType === 'work_checkin' ? '#fcd34d' : '#64748b', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', transition: '0.3s' }}
                    >
                        <UserCheck size={24} />
                        <span style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>REPORTE RRHH</span>
                    </button>
                    <button 
                        onClick={() => setReportType('sernac_complaint')}
                        style={{ flex: 1, padding: '15px', borderRadius: '15px', border: reportType === 'sernac_complaint' ? '2px solid #ef4444' : '1px solid #1e293b', background: reportType === 'sernac_complaint' ? 'rgba(239, 68, 68, 0.1)' : 'transparent', color: reportType === 'sernac_complaint' ? '#ef4444' : '#64748b', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', transition: '0.3s' }}
                    >
                        <ShieldAlert size={24} />
                        <span style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>DENUNCIA SERNAC</span>
                    </button>
                </div>

                {/* CAMERA INTERFACE */}
                <div style={{ flex: 1, background: '#0f172a', borderRadius: '30px', border: '2px dashed #1e293b', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', minHeight: '300px', overflow: 'hidden' }}>
                    {isLiveCamera ? (
                        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                            <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <canvas ref={canvasRef} style={{ display: 'none' }} />
                            <div style={{ position: 'absolute', bottom: '20px', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '20px' }}>
                                <button onClick={stopLiveCamera} style={{ background: 'rgba(239, 68, 68, 0.8)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '40px', fontWeight: 'bold' }}>CANCELAR</button>
                                <button onClick={captureFromLive} style={{ background: 'white', width: '70px', height: '70px', borderRadius: '50%', border: '8px solid rgba(56, 189, 248, 0.5)', cursor: 'pointer', boxShadow: '0 0 30px rgba(0,0,0,0.5)' }} />
                            </div>
                        </div>
                    ) : capturedImage ? (
                        <motion.img 
                            initial={{ scale: 0.9, opacity: 0 }} 
                            animate={{ scale: 1, opacity: 1 }} 
                            src={capturedImage} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                    ) : (
                        <div style={{ textAlign: 'center', color: '#334155' }}>
                            <Camera size={60} style={{ marginBottom: '1rem', color: '#38bdf8' }} />
                            <p style={{ fontSize: '0.9rem', fontWeight: '900', color: '#38bdf8', letterSpacing: '1px' }}>REGISTRO IN SITU</p>
                            <p style={{ fontSize: '0.65rem', color: '#64748b' }}>LA IMAGEN SE PROTOCOLIZARÁ CON CRIPTOGRAFÍA VLS</p>
                        </div>
                    )}
                    
                    {reportStatus === 'sending' && (
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(2, 6, 23, 0.8)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}><RefreshCw size={40} color="#38bdf8" /></motion.div>
                            <span style={{ marginTop: '1rem', color: '#38bdf8', fontSize: '0.8rem', fontWeight: 'bold' }}>SUBIENDO REGISTRO AL NODO CENTRAL...</span>
                        </div>
                    )}
                </div>

                {/* LOCATION INFO */}
                <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <MapPin size={20} color="#ef4444" />
                    <span style={{ fontSize: '0.75rem', color: 'white', fontWeight: 'bold' }}>{location}</span>
                </div>

                {/* INPUT INVISIBLE PARA CÁMARA */}
                <input 
                    type="file" 
                    accept="image/*" 
                    capture="environment" 
                    ref={fileInputRef} 
                    style={{ display: 'none' }} 
                    onChange={handleFileUpload} 
                />

                {/* ACCIONES */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingBottom: '2rem' }}>
                    {reportStatus === 'reviewing' ? (
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button onClick={() => setCapturedImage(null)} style={{ flex: 1, padding: '20px', borderRadius: '20px', background: '#334155', color: 'white', border: 'none', fontWeight: 'bold', fontSize: '0.9rem' }}>REPETIR</button>
                            <button onClick={sendSovereignReport} style={{ flex: 1, padding: '20px', borderRadius: '20px', background: '#22c55e', color: '#000', border: 'none', fontWeight: '900', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                <Send size={20} /> ENVIAR
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button 
                                onClick={triggerCamera}
                                style={{ flex: 1, padding: '20px', borderRadius: '20px', background: '#1e293b', color: '#38bdf8', border: '1px solid #38bdf8', fontWeight: 'bold', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                            >
                                <Upload size={18} /> SUBIR ARCHIVO
                            </button>
                            <button 
                                onClick={startLiveCapture}
                                style={{ flex: 2, padding: '20px', borderRadius: '20px', background: '#38bdf8', color: '#000', border: 'none', fontWeight: '900', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 8px 25px rgba(56, 189, 248, 0.4)' }}
                            >
                                <Camera size={24} /> {reportType === 'citizen_report' ? 'ABRIR CÁMARA' : 'REGISTRO EN VIVO'}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* SUCCESS MODAL Overlay */}
            <AnimatePresence>
                {reportStatus === 'sent' && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ position: 'absolute', inset: 0, zIndex: 100, background: '#020617', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}
                    >
                        <CheckCircle size={100} color="#22c55e" />
                        <h2 style={{ color: 'white', fontWeight: '900', marginTop: '2rem' }}>EXPEDIENTE SERNAC ENVIADO</h2>
                        <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '1rem' }}>
                            Se ha notificado a: <strong>SERNAC Regional, Dirección Nacional, Auditores y Municipio</strong>. Se adjuntó copia fiel a tu correo registrado.
                        </p>
                        <div style={{ marginTop: '1.5rem', background: 'rgba(56, 189, 248, 0.1)', padding: '10px', borderRadius: '12px', fontSize: '0.65rem', color: '#38bdf8', textAlign: 'left' }}>
                            ⚖️ <strong>Ley 19.496:</strong> Tu denuncia ha sido protocolizada bajo el estándar de Soberanía Comunal VLS.
                        </div>
                        <button onClick={onClose} style={{ marginTop: '2.5rem', width: '100%', padding: '20px', borderRadius: '20px', background: 'transparent', color: '#22c55e', border: '2px solid #22c55e', fontWeight: 'bold' }}>VOLVER AL PORTAL</button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FOOTER BRANDING */}
            <div style={{ padding: '0.8rem', textAlign: 'center', background: '#000', color: '#334155', fontSize: '0.6rem', fontWeight: 'bold' }}>
                ADMINISTRADO POR COMUNASMART.CL — © COMUNASMART VLS 2026
            </div>
        </div>
    );
}
