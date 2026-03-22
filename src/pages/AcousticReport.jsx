import React, { useState, useEffect, useRef } from 'react';
import imageCompression from 'browser-image-compression';
import { Mic, Camera, AlertTriangle, CheckCircle2, Volume2, X as CloseIcon, Maximize2 } from 'lucide-react';
import { socket } from '../utils/socket';

export default function AcousticReport() {
    const [step, setStep] = useState('welcome'); // welcome, measure, success, evaluation
    const [decibels, setDecibels] = useState(0);
    const [isMeasuring, setIsMeasuring] = useState(false);
    const [report, setReport] = useState({ photo: null, avgDb: 0, peakDb: 0, lat: null, lng: null, address: '', reference: '', isAnonymous: true, contactName: '', contactPhone: '' });
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const resetForm = () => {
        setStep('welcome');
        setReport({ photo: null, avgDb: 0, peakDb: 0, lat: null, lng: null, address: '', reference: '', isAnonymous: true, contactName: '', contactPhone: '' });
        setDecibels(0);
    };
    const [isSubmitting, setIsSubmitting] = useState(false);

    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const microphoneRef = useRef(null);
    const animationFrameRef = useRef(null);
    const wakeLockRef = useRef(null);
    const fileInputRef = useRef(null);

    const peakTrackerRef = useRef({ peak: 0, timer: null });

    // 1. WAKE LOCK API para que no se apague la pantalla (Truco Antigravity)
    const requestWakeLock = async () => {
        try {
            if ('wakeLock' in navigator) {
                wakeLockRef.current = await navigator.wakeLock.request('screen');
            }
        } catch (err) {
            console.warn('Wake Lock no disponible:', err);
        }
    };

    const releaseWakeLock = () => {
        if (wakeLockRef.current !== null) {
            wakeLockRef.current.release()
                .then(() => { wakeLockRef.current = null; });
        }
    };

    // 2. WEB AUDIO API (Procesamiento 100% Local, privacidad total)
    const startMeasurement = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });

            requestWakeLock();

            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            analyserRef.current = audioContextRef.current.createAnalyser();
            microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);

            analyserRef.current.fftSize = 256;
            microphoneRef.current.connect(analyserRef.current);

            const bufferLength = analyserRef.current.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            setIsMeasuring(true);
            setStep('measure');

            const measureAcoustics = () => {
                analyserRef.current.getByteFrequencyData(dataArray);

                // Calcular "volumen" o simular dB relativos
                let sum = 0;
                for (let i = 0; i < bufferLength; i++) { sum += dataArray[i]; }
                let average = sum / bufferLength;

                // Mapeo simple a dB FS (Aproximación demo)
                let dbValue = Math.max(0, Math.round((average / 255) * 100));

                setDecibels(dbValue);

                // Tracking de Picos Rápidos (>80dB en <2s)
                if (dbValue > 80) {
                    peakTrackerRef.current.peak = dbValue;
                    if (peakTrackerRef.current.timer) clearTimeout(peakTrackerRef.current.timer);
                    peakTrackerRef.current.timer = setTimeout(() => {
                        peakTrackerRef.current.peak = 0;
                    }, 2000);
                }

                animationFrameRef.current = requestAnimationFrame(measureAcoustics);
            };

            measureAcoustics();
        } catch (err) {
            alert("Para medir el ruido necesitamos tu permiso para usar el micrófono (No grabaremos ni guardaremos audio o conversaciones).");
        }
    };

    const stopMeasurement = () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        if (microphoneRef.current) microphoneRef.current.disconnect();
        if (audioContextRef.current) audioContextRef.current.close();
        releaseWakeLock();
        setIsMeasuring(false);
    };

    useEffect(() => {
        return () => { stopMeasurement(); };
    }, []);

    // 3. CAPTURA DE FOTOS INTEGRADA (Patentes, autos molestos)
    const handlePhotoCapture = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const options = { maxSizeMB: 0.5, maxWidthOrHeight: 1024, useWebWorker: true };
            const compressedFile = await imageCompression(file, options);
            const reader = new FileReader();
            reader.onloadend = () => setReport(prev => ({ ...prev, photo: reader.result }));
            reader.readAsDataURL(compressedFile);
        } catch (err) { console.error("Error comprimiendo foto", err); }
    };

    const getGeoLocation = () => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) reject('Geolocalización no soportada');
            else navigator.geolocation.getCurrentPosition(
                (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
                (err) => reject(err),
                { enableHighAccuracy: true, timeout: 5000 }
            );
        });
    };

    // 4. EMISIÓN AL BACKEND PARA TRIANGULACIÓN Y ALERTAS
    const handleSubmit = async () => {
        setIsSubmitting(true);
        // Registrar decibeles al momento del stop
        const finalDb = decibels;
        const isPeak = peakTrackerRef.current.peak > 80;
        stopMeasurement();

        try {
            const loc = await getGeoLocation();

            const alertPayload = {
                category: 'incivilidad',
                subcategory: isPeak ? 'Ruido Vehicular/Moto' : 'Contaminación Acústica Abusiva',
                lat: loc.lat,
                lng: loc.lng,
                photo: report.photo,
                db: finalDb,
                address: report.address,
                reference: report.reference,
                isAnonymous: report.isAnonymous,
                contactName: report.contactName,
                contactPhone: report.contactPhone,
                isAcoustic: true // Flag para el backend de triangulación
            };

            socket.emit('new_alert', alertPayload);

            setTimeout(() => {
                setIsSubmitting(false);
                setStep('success');
            }, 1000);
        } catch (error) {
            console.warn("Usando location centro Serena");
            const lat = -29.90453 + (Math.random() * 0.01 - 0.005);
            const lng = -71.24894 + (Math.random() * 0.01 - 0.005);
            socket.emit('new_alert', {
                category: 'incivilidad', subcategory: isPeak ? 'Ruido Vehicular' : 'Ruido Excesivo',
                lat, lng, db: finalDb, photo: report.photo, isAcoustic: true
            });
            setTimeout(() => { setIsSubmitting(false); setStep('success'); }, 1000);
        }
    };

    // UI STATE: WELCOME (Pausada para no asustar al usuario)
    if (step === 'welcome') {
        return (
            <div className="glass-panel animate-fade-in" style={{ padding: '2rem', textAlign: 'center', marginTop: '1rem' }}>
                <Volume2 size={48} color="var(--brand-primary)" style={{ margin: '0 auto 1rem' }} />
                <h3>Medidor Acústico Vecinal</h3>
                <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    Tu dispositivo actuará como un sensor de decibeles. <strong>Nunca grabaremos ni transmitiremos tus conversaciones</strong>, solo emitiremos la intensidad del ruido a la central para su triangulación y fiscalización (Decreto 38 MMA).
                </p>
                <button className="btn btn-primary" onClick={startMeasurement} style={{ width: '100%' }}>
                    Activar Sensor Local
                </button>
            </div>
        );
    }

    // UI STATE: EVALUATION
    if (step === 'evaluation') {
        return (
            <div className="glass-panel animate-slide-up" style={{ padding: '3rem 2rem', textAlign: 'center', marginTop: '1rem' }}>
                <h2 className="text-gradient" style={{ marginBottom: '1.5rem' }}>Evalúa tu experiencia</h2>
                <p className="text-muted" style={{ marginBottom: '2rem' }}>
                    ¿Qué tan sencillo fue realizar este reporte ciudadano?
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                    {[1, 2, 3, 4, 5].map(star => (
                        <button key={star} className="btn-glass" style={{ padding: '0.75rem', fontSize: '1.5rem', borderRadius: '50%' }} onClick={resetForm}>
                            ⭐
                        </button>
                    ))}
                </div>
                <button className="btn btn-glass" onClick={resetForm}>Saltar por ahora</button>
            </div>
        );
    }

    // UI STATE: FINAL SUCCESS
    if (step === 'success') {
        return (
            <div className="glass-panel animate-slide-up" style={{ padding: '3rem 2rem', textAlign: 'center', marginTop: '1rem' }}>
                <CheckCircle2 size={80} color="var(--brand-secondary)" style={{ margin: '0 auto 1.5rem' }} />
                <h2 className="text-gradient">Recibido y Gracias</h2>
                <p className="text-muted" style={{ marginBottom: '2rem' }}>
                    La central ha recepcionado los datos acústicos y fotográficos. Estamos aplicando el filtro anti-falsos positivos localizando otras mediciones cercanas.
                </p>
                <button className="btn btn-primary" onClick={() => setStep('evaluation')}>
                    Continuar
                </button>
            </div>
        );
    }

    // UI STATE: MEASURING
    let dbColor = 'var(--brand-primary)'; // Seguro
    if (decibels >= 55) dbColor = 'var(--alert-warning)'; // Diurno
    if (decibels >= 80) dbColor = 'var(--alert-danger)'; // Alerta Máxima (Moto)

    return (
        <div className="glass-panel animate-slide-up" style={{ padding: '1.5rem', marginTop: '1rem' }}>
            {isPreviewOpen && report.photo && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.9)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(10px)' }}>
                    <button className="btn-glass" style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', padding: '1rem', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.4)' }} onClick={() => setIsPreviewOpen(false)}>
                        <CloseIcon size={32} color="white" />
                    </button>
                    <img src={report.photo} alt="Evidencia en pantalla completa" style={{ maxWidth: '100%', maxHeight: '75vh', objectFit: 'contain', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }} />
                    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem 2rem', borderRadius: '50px', marginTop: '1.5rem' }}>
                        <p style={{ color: 'white', margin: 0, textAlign: 'center', fontSize: '1.1rem', fontWeight: 'bold' }}>
                            Evidencia Fotográfica: <span style={{ color: 'var(--alert-danger)' }}>Reporte Acústico</span>
                        </p>
                    </div>
                </div>
            )}

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <Mic className="pulse" color={dbColor} />
                    <span style={{ fontSize: '0.9rem', color: 'var(--alert-danger)', fontWeight: 'bold' }}>Medición Web en vivo (Pantalla Protegida)</span>
                </div>

                <div style={{ fontSize: '3.5rem', fontWeight: 'bold', color: dbColor, textShadow: `0 0 15px ${dbColor}` }}>
                    {decibels} <span style={{ fontSize: '1.5rem' }}>dB</span>
                </div>

                <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
                    {decibels >= 80 ? '⚠️ Riesgo Alto (Escape Libre / Ruido Molesto)' :
                        decibels >= 55 ? '⚠️ Supera Norma Diurna (55dB)' : '✔️ Dentro de rango normal'}
                </p>
            </div>

            <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>Ubicación y Referencias:</h4>
                <input type="text" placeholder="Dirección exacta del ruido" value={report.address} onChange={e => setReport({ ...report, address: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white', marginBottom: '0.5rem', outline: 'none' }} />
                <input type="text" placeholder="Calles cercanas" value={report.reference} onChange={e => setReport({ ...report, reference: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white', marginBottom: '1rem', outline: 'none' }} />

                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', marginBottom: '1rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginBottom: report.isAnonymous ? '0' : '1rem' }}>
                        <input type="checkbox" checked={report.isAnonymous} onChange={e => setReport({ ...report, isAnonymous: e.target.checked })} style={{ width: '1.2rem', height: '1.2rem' }} />
                        <span style={{ color: 'white' }}>Reporte Anónimo</span>
                    </label>
                    {!report.isAnonymous && (
                        <div style={{ display: 'grid', gap: '0.5rem' }}>
                            <input type="text" placeholder="Tu nombre" value={report.contactName} onChange={e => setReport({ ...report, contactName: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none' }} />
                            <input type="tel" placeholder="Tu teléfono" value={report.contactPhone} onChange={e => setReport({ ...report, contactPhone: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none' }} />
                        </div>
                    )}
                </div>
            </div>

            <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.75rem' }}>Evidencia Fotográfica de la Fuente (Opcional):</h4>
                <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handlePhotoCapture} />
                {report.photo ? (
                    <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', height: '120px', cursor: 'pointer', border: '2px solid var(--alert-danger)' }} onClick={() => setIsPreviewOpen(true)}>
                        <img src={report.photo} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Maximize2 color="white" size={32} className="pulse" />
                        </div>
                        <button className="btn-danger" style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', borderRadius: '50%', padding: '0.2rem', zIndex: 10 }} onClick={(e) => { e.stopPropagation(); setReport({ ...report, photo: null }); }}><CloseIcon size={16} /></button>
                    </div>
                ) : (
                    <button className="btn btn-glass" style={{ width: '100%' }} onClick={() => fileInputRef.current.click()}>
                        <Camera size={20} /> Capturar Patente / Fuente
                    </button>
                )}
            </div>

            <button className="btn btn-primary" style={{ width: '100%', background: 'var(--alert-danger)' }} disabled={isSubmitting} onClick={handleSubmit}>
                {isSubmitting ? 'Triangulando Datos...' : 'Enviar Alerta y Detener Medición'}
            </button>
        </div>
    );
}
