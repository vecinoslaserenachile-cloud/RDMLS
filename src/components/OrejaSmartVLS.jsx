import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Headphones, Globe, Zap, X, AlertTriangle, Clock, CreditCard, Volume2, Languages } from 'lucide-react';

// ── CONFIGURACIÓN ────────────────────────────────────────────────────────────
const FICHA_APERTURA = 1;          // Costo de activación
const FICHA_POR_MINUTO = 1;        // Costo por minuto de sesión
const TICK_MS = 60000;             // Tick de cobro: 1 minuto
const IDIOMAS = [
    { code: 'es-CL', label: 'Español (Chile)', flag: '🇨🇱' },
    { code: 'en-US', label: 'English (US)',     flag: '🇺🇸' },
    { code: 'pt-BR', label: 'Português (BR)',   flag: '🇧🇷' },
    { code: 'fr-FR', label: 'Français',         flag: '🇫🇷' },
    { code: 'de-DE', label: 'Deutsch',          flag: '🇩🇪' },
    { code: 'zh-CN', label: '中文 (简体)',       flag: '🇨🇳' },
    { code: 'ja-JP', label: '日本語',            flag: '🇯🇵' },
    { code: 'ar-SA', label: 'عربي',             flag: '🇸🇦' },
    { code: 'ru-RU', label: 'Русский',          flag: '🇷🇺' },
    { code: 'it-IT', label: 'Italiano',         flag: '🇮🇹' },
];

// ── HELPERS ──────────────────────────────────────────────────────────────────
const traducirTexto = async (texto, targetLang) => {
    // Usamos MyMemory API (gratuita, sin key requerida para ~5000 chars/día)
    try {
        const res = await fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=es|${targetLang.split('-')[0]}`
        );
        const data = await res.json();
        return data?.responseData?.translatedText || texto;
    } catch {
        return texto; // Fallback: devuelve original
    }
};

const speakTTS = (text, lang) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = lang;
    utt.rate = 0.95;
    utt.pitch = 1.05;
    const voices = window.speechSynthesis.getVoices();
    const match = voices.find(v => v.lang.startsWith(lang.split('-')[0]));
    if (match) utt.voice = match;
    window.speechSynthesis.speak(utt);
};

// ── COMPONENTE PRINCIPAL ──────────────────────────────────────────────────────
export default function OrejaSmartVLS({ onClose, fichasDisponibles = 0, onDeducirFichas }) {
    const [fase, setFase] = useState('inicio'); // inicio | activa | saldo_cero | error
    const [idiomaOrigen, setIdiomaOrigen] = useState('es-CL');
    const [idiomaDestino, setIdiomaDestino] = useState('en-US');
    const [transcripcion, setTranscripcion] = useState('');
    const [traduccion, setTraduccion] = useState('');
    const [fichas, setFichas] = useState(fichasDisponibles);
    const [segundosActivos, setSegundosActivos] = useState(0);
    const [ondas, setOndas] = useState([0.2, 0.4, 0.3, 0.6, 0.5, 0.7, 0.4]);
    const [sentimiento, setSentimiento] = useState(null);
    const [log, setLog] = useState([]);

    const reconRef = useRef(null);
    const tickRef = useRef(null);
    const cronRef = useRef(null);
    const ondasRef = useRef(null);

    // ── ANIMACIÓN DE ONDAS ────────────────────────────────────────────────────
    const animarOndas = useCallback(() => {
        ondasRef.current = setInterval(() => {
            setOndas(prev => prev.map(() => 0.15 + Math.random() * 0.85));
        }, 120);
    }, []);

    const detenerOndas = useCallback(() => {
        clearInterval(ondasRef.current);
        setOndas([0.2, 0.4, 0.3, 0.6, 0.5, 0.7, 0.4]);
    }, []);

    // ── INICIAR SESIÓN ────────────────────────────────────────────────────────
    const iniciarSesion = useCallback(() => {
        if (fichas < FICHA_APERTURA) { setFase('saldo_cero'); return; }

        // Cobrar apertura
        setFichas(f => f - FICHA_APERTURA);
        onDeducirFichas?.(FICHA_APERTURA);
        setFase('activa');
        setTranscripcion('');
        setTraduccion('');
        setLog([]);
        setSegundosActivos(0);

        animarOndas();

        // Cronómetro
        cronRef.current = setInterval(() => setSegundosActivos(s => s + 1), 1000);

        // Tick de cobro por minuto
        tickRef.current = setInterval(() => {
            setFichas(prev => {
                const next = prev - FICHA_POR_MINUTO;
                if (next <= 0) {
                    finalizarSesion('saldo_cero');
                    return 0;
                }
                onDeducirFichas?.(FICHA_POR_MINUTO);
                addLog(`🪙 −${FICHA_POR_MINUTO} ficha. Saldo: ${next}`);
                return next;
            });
        }, TICK_MS);

        // Speech recognition
        iniciarReconocimiento();
    }, [fichas, animarOndas]);

    const iniciarReconocimiento = () => {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SR) { addLog('⚠️ STT no disponible en este navegador.'); return; }

        const rec = new SR();
        rec.lang = idiomaOrigen;
        rec.continuous = true;
        rec.interimResults = true;

        rec.onresult = async (e) => {
            const res = Array.from(e.results);
            const texto = res.map(r => r[0].transcript).join(' ');
            setTranscripcion(texto);

            const final = res.filter(r => r.isFinal);
            if (final.length > 0) {
                const textoFinal = final.map(r => r[0].transcript).join(' ');
                // Inyección JSON al backoffice VLS
                window.dispatchEvent(new CustomEvent('vls-oreja-input', {
                    detail: { texto: textoFinal, idioma: idiomaOrigen, ts: Date.now() }
                }));
                // Traducción
                const trad = await traducirTexto(textoFinal, idiomaDestino);
                setTraduccion(trad);
                addLog(`🗣 "${textoFinal}" → "${trad}"`);
                // TTS
                speakTTS(trad, idiomaDestino);
                // Sentimiento simple
                const neg = ['no', 'malo', 'terrible', 'problema', 'error', 'mal'].some(w => textoFinal.toLowerCase().includes(w));
                setSentimiento(neg ? 'negativo' : 'positivo');
            }
        };

        rec.onerror = (e) => addLog(`⚠️ Error STT: ${e.error}`);
        rec.onend = () => { if (fase === 'activa') rec.start(); };
        rec.start();
        reconRef.current = rec;
    };

    // ── FINALIZAR SESIÓN ──────────────────────────────────────────────────────
    const finalizarSesion = useCallback((motivo = 'manual') => {
        reconRef.current?.stop();
        clearInterval(tickRef.current);
        clearInterval(cronRef.current);
        window.speechSynthesis?.cancel();
        detenerOndas();
        setFase(motivo === 'saldo_cero' ? 'saldo_cero' : 'inicio');
    }, [detenerOndas]);

    useEffect(() => () => finalizarSesion(), []);

    const addLog = (msg) => setLog(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 30));

    const fmtTiempo = (s) => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

    // ── RENDER ────────────────────────────────────────────────────────────────
    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 10000001,
            background: 'rgba(2,6,23,0.98)',
            display: 'flex', flexDirection: 'column', fontFamily: "'Outfit', sans-serif", color: 'white'
        }}>
            {/* HEADER */}
            <div style={{
                background: 'linear-gradient(135deg, #0f172a, #1e1b4b)',
                padding: '1.5rem 3rem',
                borderBottom: '3px solid #6366f1',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <motion.div
                        animate={{ scale: fase === 'activa' ? [1, 1.1, 1] : 1 }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', padding: '14px', borderRadius: '50%', boxShadow: '0 0 30px rgba(99,102,241,0.5)' }}
                    >
                        <Headphones size={28} color="white" />
                    </motion.div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: '900', letterSpacing: '2px' }}>
                            VLS OREJA SMART™
                        </h2>
                        <span style={{ fontSize: '0.7rem', color: '#a5b4fc', fontWeight: 'bold', letterSpacing: '2px' }}>
                            MÓDULO 18 — TRADUCCIÓN SIMULTÁNEA WEBRTC + STT/TTS
                        </span>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ background: 'rgba(99,102,241,0.15)', padding: '10px 20px', borderRadius: '20px', border: '1px solid #6366f1', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <CreditCard size={16} color="#a5b4fc" />
                        <span style={{ fontWeight: 'bold', color: '#a5b4fc' }}>{fichas} fichas</span>
                    </div>
                    {fase === 'activa' && (
                        <div style={{ background: 'rgba(239,68,68,0.15)', padding: '10px 20px', borderRadius: '20px', border: '1px solid #ef4444', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Clock size={16} color="#f87171" />
                            <span style={{ fontWeight: 'bold', color: '#f87171', fontFamily: 'monospace' }}>{fmtTiempo(segundosActivos)}</span>
                        </div>
                    )}
                    <button onClick={() => { finalizarSesion(); onClose?.(); }} style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid #ef4444', color: 'white', padding: '10px 20px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>
                        <X size={18} />
                    </button>
                </div>
            </div>

            {/* BODY */}
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', padding: '3rem', overflow: 'hidden' }}>
                
                {/* COLUMNA IZQUIERDA: AURICULAR VIRTUAL + CONTROLES */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* VISUALIZADOR DE ONDAS (AURICULAR VIRTUAL) */}
                    <div style={{
                        background: 'linear-gradient(145deg, #0f172a, #1e1b4b)',
                        borderRadius: '40px', padding: '3rem', border: '2px solid #6366f1',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem',
                        boxShadow: fase === 'activa' ? '0 0 60px rgba(99,102,241,0.3)' : 'none'
                    }}>
                        {/* Ícono auricular animado */}
                        <motion.div
                            animate={fase === 'activa' ? { rotate: [0, -5, 5, -5, 0] } : {}}
                            transition={{ repeat: Infinity, duration: 3 }}
                            style={{
                                width: '140px', height: '140px',
                                background: fase === 'activa' ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'rgba(99,102,241,0.15)',
                                borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                border: `3px solid ${fase === 'activa' ? '#a5b4fc' : '#6366f1'}`,
                                boxShadow: fase === 'activa' ? '0 0 40px rgba(139,92,246,0.6)' : 'none'
                            }}
                        >
                            {fase === 'activa' ? <Headphones size={70} color="white" /> : <Headphones size={70} color="#6366f1" />}
                        </motion.div>

                        {/* ONDAS DE AUDIO */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', height: '70px' }}>
                            {ondas.map((h, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ height: fase === 'activa' ? `${h * 60 + 6}px` : '6px' }}
                                    transition={{ duration: 0.12 }}
                                    style={{ width: '8px', background: `hsl(${240 + i*8}, 80%, ${50 + h * 30}%)`, borderRadius: '4px', minHeight: '6px' }}
                                />
                            ))}
                        </div>

                        {/* ESTADO */}
                        <div style={{ fontSize: '1.1rem', fontWeight: 'bold', letterSpacing: '3px', color: fase === 'activa' ? '#a5b4fc' : '#64748b' }}>
                            {fase === 'inicio' && '◉ EN ESPERA'}
                            {fase === 'activa' && '● ESCUCHANDO'}
                            {fase === 'saldo_cero' && '⚠ SALDO INSUFICIENTE'}
                        </div>

                        {sentimiento && fase === 'activa' && (
                            <div style={{ background: sentimiento === 'positivo' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)', padding: '8px 20px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold', border: `1px solid ${sentimiento === 'positivo' ? '#10b981' : '#ef4444'}`, color: sentimiento === 'positivo' ? '#6ee7b7' : '#fca5a5' }}>
                                Tono: {sentimiento === 'positivo' ? '✅ Positivo' : '⚠️ Negativo'}
                            </div>
                        )}
                    </div>

                    {/* SELECTOR DE IDIOMAS */}
                    <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '30px', padding: '2rem', border: '1px solid rgba(99,102,241,0.3)' }}>
                        <h4 style={{ margin: '0 0 1.5rem 0', color: '#a5b4fc', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '2px' }}>
                            <Languages size={14} style={{ marginRight: '8px' }} />
                            CONFIGURACIÓN DE IDIOMAS
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1rem', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '6px' }}>HABLAS EN:</div>
                                <select value={idiomaOrigen} onChange={e => setIdiomaOrigen(e.target.value)} disabled={fase === 'activa'} style={{ width: '100%', background: '#0f172a', border: '1px solid #6366f1', color: 'white', padding: '10px', borderRadius: '12px', fontSize: '0.9rem' }}>
                                    {IDIOMAS.map(i => <option key={i.code} value={i.code}>{i.flag} {i.label}</option>)}
                                </select>
                            </div>
                            <Zap color="#6366f1" size={24} />
                            <div>
                                <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '6px' }}>TRADUCIR A:</div>
                                <select value={idiomaDestino} onChange={e => setIdiomaDestino(e.target.value)} style={{ width: '100%', background: '#0f172a', border: '1px solid #8b5cf6', color: 'white', padding: '10px', borderRadius: '12px', fontSize: '0.9rem' }}>
                                    {IDIOMAS.filter(i => i.code !== idiomaOrigen).map(i => <option key={i.code} value={i.code}>{i.flag} {i.label}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* BOTÓN PRINCIPAL */}
                    <AnimatePresence mode="wait">
                        {fase === 'inicio' && (
                            <motion.button key="start" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                onClick={iniciarSesion}
                                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: 'none', color: 'white', padding: '1.5rem', borderRadius: '25px', fontSize: '1.2rem', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', boxShadow: '0 10px 40px rgba(99,102,241,0.4)' }}>
                                <Headphones size={24} /> ACTIVAR OREJA SMART ({FICHA_APERTURA} ficha)
                            </motion.button>
                        )}
                        {fase === 'activa' && (
                            <motion.button key="stop" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                onClick={() => finalizarSesion()}
                                style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)', border: 'none', color: 'white', padding: '1.5rem', borderRadius: '25px', fontSize: '1.2rem', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', boxShadow: '0 10px 40px rgba(239,68,68,0.4)' }}>
                                <MicOff size={24} /> DETENER SESIÓN
                            </motion.button>
                        )}
                        {fase === 'saldo_cero' && (
                            <motion.div key="broke" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                style={{ background: 'rgba(239,68,68,0.15)', border: '2px solid #ef4444', borderRadius: '25px', padding: '2rem', textAlign: 'center' }}>
                                <AlertTriangle size={40} color="#ef4444" style={{ marginBottom: '1rem' }} />
                                <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#f87171' }}>SALDO INSUFICIENTE</div>
                                <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.5rem' }}>Recarga tus fichas para continuar.</div>
                                <button onClick={() => setFase('inicio')} style={{ marginTop: '1.5rem', background: '#6366f1', border: 'none', color: 'white', padding: '10px 30px', borderRadius: '15px', cursor: 'pointer', fontWeight: 'bold' }}>Volver</button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* COLUMNA DERECHA: TRANSCRIPCIÓN + TRADUCCIÓN + LOG */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto' }}>

                    {/* TRANSCRIPCIÓN ORIGINAL */}
                    <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '30px', padding: '2rem', border: '1px solid rgba(99,102,241,0.2)', flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                            <Mic size={18} color="#6366f1" />
                            <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#6366f1', letterSpacing: '2px' }}>
                                TRANSCRIPCIÓN EN TIEMPO REAL
                            </span>
                        </div>
                        <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#e2e8f0', minHeight: '80px' }}>
                            {transcripcion || <span style={{ color: '#334155', fontStyle: 'italic' }}>Habla para comenzar la transcripción...</span>}
                        </div>
                    </div>

                    {/* TRADUCCIÓN */}
                    <div style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1))', borderRadius: '30px', padding: '2rem', border: '1px solid rgba(139,92,246,0.3)', flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                            <Globe size={18} color="#8b5cf6" />
                            <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b5cf6', letterSpacing: '2px' }}>
                                TRADUCCIÓN SIMULTÁNEA → {IDIOMAS.find(i => i.code === idiomaDestino)?.flag}
                            </span>
                            {traduccion && <Volume2 size={14} color="#8b5cf6" style={{ marginLeft: 'auto', cursor: 'pointer' }} onClick={() => speakTTS(traduccion, idiomaDestino)} />}
                        </div>
                        <div style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#c4b5fd', fontStyle: traduccion ? 'normal' : 'italic', minHeight: '80px' }}>
                            {traduccion || <span style={{ color: '#334155' }}>La traducción aparecerá aquí...</span>}
                        </div>
                    </div>

                    {/* LOG DE SESIÓN */}
                    <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '25px', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.05)', maxHeight: '200px', overflowY: 'auto' }}>
                        <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '1rem' }}>📟 LOG DE SESIÓN VLS</div>
                        {log.length === 0 ? (
                            <div style={{ color: '#334155', fontSize: '0.8rem', fontStyle: 'italic' }}>Esperando actividad...</div>
                        ) : log.map((entry, i) => (
                            <div key={i} style={{ fontSize: '0.75rem', color: '#64748b', padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,0.03)', fontFamily: 'monospace' }}>
                                {entry}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* STATUS FOOTER */}
            <div style={{ padding: '1rem 3rem', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#334155', fontWeight: 'bold' }}>
                <div>🎧 VLS OREJA SMART™ — MÓDULO 18 — WebRTC + STT/TTS + Traducción Simultánea</div>
                <div>🪙 {FICHA_POR_MINUTO} ficha/min · {FICHA_APERTURA} ficha apertura · © COMUNA SMART 2026</div>
            </div>
        </div>
    );
}
