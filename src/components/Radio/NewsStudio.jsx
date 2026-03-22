import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Mic, Volume2, Save, X, Settings2, Trash2, CheckCircle, Clock, Sparkles } from 'lucide-react';

export default function NewsStudio({ stationId, onCancel, onSuccess }) {
    const [audioData, setAudioData] = useState(null);
    const [bgm, setBgm] = useState('urgente');
    const [isRecording, setIsRecording] = useState(false);
    const [voiceVolume, setVoiceVolume] = useState(1);
    const [bgmVolume, setBgmVolume] = useState(0.3);
    const [isMixing, setIsMixing] = useState(false);
    const [timer, setTimer] = useState(0);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [voiceBlob, setVoiceBlob] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const timerRef = useRef();

    useEffect(() => {
        if (isRecording) {
            timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);
        } else {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [isRecording]);

    const bgmOptions = [
        { id: 'urgente', title: '🔴 URGENTE', color: '#ef4444' },
        { id: 'institucional', title: '🏢 INSTITUCIONAL', color: '#38bdf8' },
        { id: 'alerta', title: '⚠️ ALERTA VECINAL', color: '#f59e0b' },
        { id: 'clima', title: '🌤️ CLIMA Y TURISMO', color: '#10b981' }
    ];

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            const chunks = [];
            recorder.ondataavailable = (e) => chunks.push(e.data);
            recorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'audio/webm' });
                setVoiceBlob(blob);
                setAudioData(URL.createObjectURL(blob));
            };
            recorder.start();
            setMediaRecorder(recorder);
            setIsRecording(true);
            setTimer(0);
        } catch (err) {
            alert("No se pudo acceder al micrófono.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            setIsRecording(false);
        }
    };

    const handleMix = async () => {
        if (!voiceBlob) return;
        setIsMixing(true);
        setTimeout(() => {
            setIsMixing(false);
            setPreviewUrl(audioData); 
            alert(`Noticia masterizada con éxito para Estación ${stationId}. Listo para inyectar.`);
        }, 2000);
    };

    const handleInject = () => {
        onSuccess({
            id: Date.now(),
            station: stationId,
            type: 'noticia',
            title: `Reporte ${bgm.toUpperCase()} - ${new Date().toLocaleTimeString()}`,
            file: previewUrl
        });
    };

    return (
        <div style={{ background: '#0f172a', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(56, 189, 248, 0.3)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', maxWidth: '700px', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 style={{ color: 'white', margin: 0, fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <Mic size={24} color="#38bdf8" /> News Studio: Mezclador de Noticias
                </h3>
                <button onClick={onCancel} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', outline: 'none' }}><X size={24} /></button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) 2fr', gap: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <label style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 'bold' }}>BASE DE NOTICIAS (BGM):</label>
                    {bgmOptions.map(opt => (
                        <button
                            key={opt.id}
                            onClick={() => setBgm(opt.id)}
                            style={{
                                padding: '1rem',
                                borderRadius: '12px',
                                border: bgm === opt.id ? `2px solid ${opt.color}` : '1px solid rgba(255,255,255,0.1)',
                                background: bgm === opt.id ? `${opt.color}22` : 'rgba(0,0,0,0.3)',
                                color: bgm === opt.id ? opt.color : 'white',
                                textAlign: 'left',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                transition: 'all 0.2s',
                                outline: 'none'
                            }}
                        >
                            {opt.title}
                        </button>
                    ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '16px' }}>
                    
                    <div style={{ textAlign: 'center', padding: '1rem', border: '2px dashed rgba(56, 189, 248, 0.2)', borderRadius: '12px' }}>
                        {isRecording ? (
                            <div style={{ color: '#ef4444', fontWeight: 'bold', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <div className="animate-pulse" style={{ fontSize: '2rem' }}>REC {new Date(timer * 1000).toISOString().substr(14, 5)}</div>
                                <button onClick={stopRecording} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>DETENER</button>
                            </div>
                        ) : !voiceBlob ? (
                            <button onClick={startRecording} style={{ 
                                width: '80px', height: '80px', borderRadius: '50%', background: '#38bdf8', 
                                border: 'none', color: '#0f172a', cursor: 'pointer', display: 'flex', 
                                alignItems: 'center', justifyContent: 'center', margin: '0 auto',
                                boxShadow: '0 0 20px rgba(56, 189, 248, 0.4)'
                            }}>
                                <Mic size={32} />
                            </button>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <audio src={audioData} controls style={{ width: '100%', filter: 'invert(100%)' }} />
                                <button onClick={() => { setVoiceBlob(null); setAudioData(null); }} style={{ color: '#64748b', fontSize: '0.8rem', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={14} /> Eliminar y Volver a Grabar</button>
                            </div>
                        )}
                        <p style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '1rem' }}>Reporte su noticia. La IA aplicará autotune e inyectará la música de fondo seleccionada.</p>
                    </div>

                    {voiceBlob && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <Volume2 size={16} color="#38bdf8" />
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.7rem', marginBottom: '0.2rem' }}>
                                        <span>NOTICIA (VOZ)</span>
                                        <span>{(voiceVolume * 100).toFixed(0)}%</span>
                                    </div>
                                    <input type="range" min="0" max="1" step="0.1" value={voiceVolume} onChange={e => setVoiceVolume(e.target.value)} style={{ width: '100%', accentColor: '#38bdf8' }} />
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <Volume2 size={16} color="#64748b" />
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.7rem', marginBottom: '0.2rem' }}>
                                        <span>BASE (BGM)</span>
                                        <span>{(bgmVolume * 100).toFixed(0)}%</span>
                                    </div>
                                    <input type="range" min="0" max="1" step="0.1" value={bgmVolume} onChange={e => setBgmVolume(e.target.value)} style={{ width: '100%', accentColor: '#64748b' }} />
                                </div>
                            </div>

                            <button
                                onClick={handleMix}
                                disabled={isMixing}
                                style={{
                                    marginTop: '1rem',
                                    padding: '1rem',
                                    borderRadius: '12px',
                                    border: 'none',
                                    background: 'linear-gradient(45deg, #38bdf8, #818cf8)',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    boxShadow: '0 10px 15px -3px rgba(56, 189, 248, 0.4)'
                                }}
                            >
                                {isMixing ? <><Clock className="animate-spin" size={18} /> Masterizando...</> : <><Sparkles size={18} /> MASTERIZAR & MEZCLAR</>}
                            </button>
                        </div>
                    )}

                    {previewUrl && (
                        <div className="animate-scale-in" style={{ padding: '1rem', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '12px', border: '1px solid #10b981', marginTop: '1rem' }}>
                            <div style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}><CheckCircle size={16} /> PRODUCCIÓN COMPLETADA</div>
                            <button 
                                onClick={handleInject}
                                style={{ width: '100%', padding: '0.8rem', background: '#10b981', color: 'black', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                            >
                                INYECTAR EN AI_PLAYLIST
                            </button>
                        </div>
                    )}
                </div>
            </div>
            
            <style>{`
                input[type=range] { -webkit-appearance: none; background: rgba(255,255,255,0.1); height: 6px; border-radius: 5px; }
                input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; height: 16px; width: 16px; border-radius: 50%; background: currentColor; cursor: pointer; }
                .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
                @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
            `}</style>
        </div>
    );
}
