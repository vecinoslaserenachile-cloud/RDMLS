import React, { useState, useRef, useEffect } from 'react';
import { Camera, RefreshCw, Download, Share2, UserCheck, Shield, Sparkles, Smartphone, Check } from 'lucide-react';

export default function VLSAvatarCreator({ onComplete, currentUser }) {
    const [step, setStep] = useState('capture'); // capture, processing, result
    const [capturedImage, setCapturedImage] = useState(null);
    const [avatarModel, setAvatarModel] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        if (step === 'capture') {
            startCamera();
        } else {
            stopCamera();
        }
    }, [step]);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Error accessing camera:", err);
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
        }
    };

    const takePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (video && canvas) {
            const context = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/png');
            setCapturedImage(dataUrl);
            setStep('processing');
            
            // Simulate AI processing
            setTimeout(() => {
                setStep('result');
                // Mock avatar generation - using a premium "Serenito-like" 3D avatar look
                // In a real app, this would be a URL to a generated GLB or a processed image
                setAvatarModel(dataUrl); 
            }, 3000);
        }
    };

    const handleShare = () => {
        alert("Compartiendo tu Huella VLS en redes sociales...");
    };

    const handleInstall = () => {
        alert("Instalando Acceso Directo VLS en tu pantalla de inicio...");
    };

    return (
        <div style={{ padding: '2rem', color: 'white', display: 'flex', flexDirection: 'column', height: '100%', gap: '1.5rem' }}>
            <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#10b981', textShadow: '0 2px 10px rgba(16, 185, 129, 0.3)' }}>HUELLA VLS: AVATAR 3D</h3>
                <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>Crea tu identidad digital única para Vecinos La Serena</p>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)', borderRadius: '25px', padding: '1rem', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
                
                {step === 'capture' && (
                    <>
                        <video ref={videoRef} autoPlay playsInline style={{ width: '100%', maxWidth: '400px', borderRadius: '20px', transform: 'scaleX(-1)', border: '2px solid #3b82f6' }} />
                        <canvas ref={canvasRef} style={{ display: 'none' }} />
                        <button onClick={takePhoto} style={{ marginTop: '1.5rem', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', border: 'none', padding: '1rem 2rem', borderRadius: '50px', color: 'white', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)' }}>
                            <Camera size={24} /> CAPTURAR MI ROSTRO
                        </button>
                    </>
                )}

                {step === 'processing' && (
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ position: 'relative', width: '200px', height: '200px', margin: '0 auto 2rem' }}>
                            <img src={capturedImage} alt="Captured" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', inset: 0, border: '4px solid #10b981', borderRadius: '50%', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }}></div>
                            <Sparkles size={40} color="#10b981" style={{ position: 'absolute', top: -10, right: -10 }} />
                        </div>
                        <h4 style={{ fontSize: '1.2rem', color: '#10b981' }}>GENERANDO AVATAR 3D...</h4>
                        <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>Nuestra IA "El Búnker" está mapeando tu fisonomía</p>
                    </div>
                )}

                {step === 'result' && (
                    <div style={{ textAlign: 'center', width: '100%' }}>
                        <div style={{ position: 'relative', width: '220px', height: '220px', margin: '0 auto 2rem', background: 'linear-gradient(135deg, #18181b 0%, #3f3f46 100%)', borderRadius: '30px', padding: '10px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', border: '2px solid #10b981' }}>
                            {/* In a real app, this would be a 3D Canvas element or a high-quality render */}
                            <img src={avatarModel} alt="3D Avatar" style={{ width: '100%', height: '100%', borderRadius: '20px', objectFit: 'cover', filter: 'hue-rotate(30deg) saturate(1.2)' }} />
                            <div style={{ position: 'absolute', bottom: -15, left: '50%', transform: 'translateX(-50%)', background: '#10b981', color: 'white', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <UserCheck size={14} /> IDENTIDAD VERIFICADA
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', width: '100%', maxWidth: '400px', margin: '0 auto' }}>
                            <button onClick={handleShare} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '15px', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <Share2 size={24} color="#3b82f6" />
                                <span style={{ fontSize: '0.75rem' }}>COMPARTIR</span>
                            </button>
                            <button onClick={handleInstall} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '15px', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <Smartphone size={24} color="#10b981" />
                                <span style={{ fontSize: '0.75rem' }}>INSTALAR PWA</span>
                            </button>
                        </div>

                        <button onClick={() => setStep('capture')} style={{ marginTop: '2rem', background: 'none', border: '1px dashed #555', padding: '0.8rem 1.5rem', borderRadius: '15px', color: '#888', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '2rem auto 0' }}>
                            <RefreshCw size={16} /> REPETIR CAPTURA
                        </button>
                    </div>
                )}
            </div>

            <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1.2rem', borderRadius: '20px', border: '1px solid rgba(59, 130, 246, 0.3)', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <Shield size={24} color="#3b82f6" style={{ flexShrink: 0 }} />
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                    <strong>Pacto Creativo VLS:</strong> Tu avatar es propiedad de tu identidad. Al generarlo, otorgas derecho de alojamiento a vecinoslaserena.cl para uso institucional en la Smart City. Puedes descargarlo y usarlo libremente con nuestra marca.
                </div>
            </div>
            
            <style>{`
                @keyframes spin { 100% { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
}
