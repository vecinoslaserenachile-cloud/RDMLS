import React, { useState, useEffect } from 'react';
import { X, Music, Play, Pause, Save, Type, AudioLines, Settings2, Download, Languages, GraduationCap, Mic2, Disc, Star } from 'lucide-react';
import { auth } from '../utils/firebase';
import MusicRanking from './MusicRanking';

export default function MusicCreatorModal({ onClose }) {
    const [brandOrg] = useState(() => {
        const tenant = localStorage.getItem('smart_tenant');
        return tenant === 'custom' ? (localStorage.getItem('smart_brand_org') || 'La Serena') : 'La Serena';
    });

    const [isPlaying, setIsPlaying] = useState(false);
    const [activeTab, setActiveTab] = useState('letras');
    const [songName, setSongName] = useState(`Himno Smart ${brandOrg}`);
    const [lyrics, setLyrics] = useState(`[Verso 1]
Avanza firme y con visión genial,
Hoy ${brandOrg} es un faro fenomenal.
Conectando a los barrios sin igual,
Nuestra ComunaSmart es la capital.

[Coro]
¡Vamos ${brandOrg}, segura y real!
Con innovación brillando en el portal,
Juntos construyendo un destino virtual,
¡Nuestra ciudad es de nivel mundial!`);
    const [tempo, setTempo] = useState(120);
    const [styleStr, setStyleStr] = useState('Pop / Himno Moderno');
    const [eduLanguage, setEduLanguage] = useState('es');
    const [karaokeProgress, setKaraokeProgress] = useState(0);

    const currentUser = auth.currentUser;

    // Referencias para la música de fondo
    const audioCtxRef = React.useRef(null);
    const intervalsRef = React.useRef([]);

    const stopMusic = () => {
        if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
            audioCtxRef.current.close().catch(() => { });
            audioCtxRef.current = null;
        }
        intervalsRef.current.forEach(clearInterval);
        intervalsRef.current = [];
    };

    const playBackgroundMusic = () => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();
        audioCtxRef.current = ctx;

        const bpm = parseInt(tempo, 10) || 120;
        const beatInterval = (60 / bpm) * 1000;

        const chords = [
            [261.63, 329.63, 392.00], // C
            [196.00, 246.94, 293.66], // G
            [220.00, 261.63, 329.63], // Am
            [174.61, 220.00, 261.63]  // F
        ];

        let beatCount = 0;
        let pType = 'sine';
        if (styleStr.includes('Trap')) pType = 'triangle';
        if (styleStr.includes('Elect')) pType = 'sawtooth';
        if (styleStr.includes('Rock')) pType = 'square';

        const playChord = (notes, waveType) => {
            if (ctx.state === 'closed') return;
            notes.forEach(freq => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = waveType;
                osc.frequency.value = freq;
                osc.connect(gain);
                gain.connect(ctx.destination);
                gain.gain.setValueAtTime(0.05, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.5);
                osc.start();
                osc.stop(ctx.currentTime + 1.5);
            });
        };

        const playKick = () => {
            if (ctx.state === 'closed') return;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.setValueAtTime(150, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
            gain.gain.setValueAtTime(0.5, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
            osc.start();
            osc.stop(ctx.currentTime + 0.3);
        };

        const loop = setInterval(() => {
            const isKickBeat = (beatCount % 2 === 0);
            const isChordBeat = (beatCount % 4 === 0);

            if (isChordBeat) {
                const chordIndex = (beatCount / 4) % chords.length;
                playChord(chords[chordIndex], pType);
            }

            if (styleStr.includes('Trap') || styleStr.includes('Pop') || styleStr.includes('Elect')) {
                if (isKickBeat || (styleStr.includes('Trap') && beatCount % 4 === 3)) {
                    playKick();
                }
            }

            beatCount++;
        }, beatInterval / 2);

        intervalsRef.current.push(loop);
    };

    const togglePlay = async () => {
        if (isPlaying) {
            window.speechSynthesis.cancel();
            stopMusic();
            setIsPlaying(false);
        } else {
            // Audio Context Resume for modern browsers
            if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
                await audioCtxRef.current.resume();
            }

            let textToSpeak = "";
            if (activeTab === 'educacion') {
                textToSpeak = getTranslatedLyrics().replace(/\[.*?\]/g, "");
            } else {
                textToSpeak = lyrics.replace(/\[.*?\]/g, "");
            }

            if (!textToSpeak.trim()) textToSpeak = "Escribe una letra para que pueda cantarla.";

            // Remove verse labels
            const utterance = new SpeechSynthesisUtterance(textToSpeak);

            // Adjust lang based on eduLanguage only if in edu tab, otherwise spanish
            if (activeTab === 'educacion') {
                if (eduLanguage === 'en') utterance.lang = 'en-US';
                else if (eduLanguage === 'zh') utterance.lang = 'zh-CN';
                else utterance.lang = 'es-CL';
            } else {
                utterance.lang = 'es-CL';
            }

            // Adjust TTS based on selected Style!
            if (styleStr.includes('Trap')) {
                utterance.rate = 1.3;
                utterance.pitch = 0.8;
            } else if (styleStr.includes('Folclore')) {
                utterance.rate = 0.9;
                utterance.pitch = 1.1;
            } else if (styleStr.includes('Rock')) {
                utterance.rate = 1.1;
                utterance.pitch = 1.2;
            } else {
                utterance.rate = 1.0;
                utterance.pitch = 1.0;
            }

            // Aumentar volumen para que suene fuerte
            utterance.volume = 1.0;

            utterance.onend = () => {
                setIsPlaying(false);
                stopMusic();
            };

            playBackgroundMusic();
            window.speechSynthesis.speak(utterance);
            setIsPlaying(true);
        }
    };

    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
            stopMusic();
        };
    }, []);

    // Simula avance del Karaoke
    useEffect(() => {
        let timer;
        if (isPlaying && activeTab === 'educacion') {
            timer = setInterval(() => {
                setKaraokeProgress(prev => (prev >= 100 ? 0 : prev + 2));
            }, 500);
        }
        return () => clearInterval(timer);
    }, [isPlaying, activeTab]);

    const getTranslatedLyrics = () => {
        if (eduLanguage === 'es') return `¡Vamos ${brandOrg}, segura y genial!`;
        if (eduLanguage === 'en') return `Let's go ${brandOrg}, safe and great!`;
        if (eduLanguage === 'arn') return `Amulepe ${brandOrg}, poyewün mapu!`;
        if (eduLanguage === 'rap') return `Ka oho ${brandOrg}, riva riva!`;
        if (eduLanguage === 'zh') return `去吧 ${brandOrg}，安全又伟大！`;
        if (eduLanguage === 'code') return `const org = { name: '${brandOrg}', status: 'safe', rating: 'great' };\norg.go();`;
        return lyrics;
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(5, 10, 25, 0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(15px)' }}>
            <div className="picasso-fractal animate-scale-in" style={{ width: '100%', maxWidth: '1200px', height: '95vh', padding: '0', position: 'relative', display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg, rgba(8, 14, 44, 0.98) 0%, rgba(30, 58, 138, 0.95) 100%)', border: '2px solid rgba(168, 85, 247, 0.8)', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 0 50px rgba(168, 85, 247, 0.3)' }}>
                <style>{`
                    .music-workspace { display: flex; flex-direction: row; flex: 1; overflow-y: auto; }
                    .music-sidebar { width: 250px; flex-shrink: 0; border-right: 1px solid rgba(255,255,255,0.1); display: flex; flex-direction: column; background: rgba(0,0,0,0.2); overflow-y: visible; padding-bottom: 2rem; }
                    .music-main-area { flex: 1; display: flex; flex-direction: column; overflow-y: auto; }
                    .music-sidebar > button { border-left: 4px solid transparent; }
                    
                    @media (max-width: 768px) {
                        .music-workspace { flex-direction: column; }
                        .music-sidebar { width: 100%; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.1); flex-direction: row; flex-wrap: wrap; padding-bottom: 0; }
                        .music-sidebar > button { flex: 1 1 45%; justify-content: center; border-left: none !important; border-bottom: 4px solid transparent; font-size: 0.85rem; padding: 0.75rem !important; }
                        .music-sidebar > button.active-letras { border-bottom-color: #a855f7 !important; }
                        .music-sidebar > button.active-partitura { border-bottom-color: #a855f7 !important; }
                        .music-sidebar > button.active-educacion { border-bottom-color: #10b981 !important; }
                        .music-sidebar > button.active-sintetizador { border-bottom-color: #a855f7 !important; }
                        .music-sidebar > button.active-biblioteca { border-bottom-color: #38bdf8 !important; }
                        .music-sidebar > button.active-settings { border-bottom-color: #a855f7 !important; }
                        .music-sidebar > .music-sidebar-controls { width: 100%; border-top: 1px solid rgba(255,255,255,0.1); margin-top: 0 !important; }
                        .music-settings-grid { grid-template-columns: 1fr !important; gap: 1rem !important; }
                        .music-toolbar { flex-wrap: wrap; justify-content: center; }
                        .music-toolbar > div { width: 100%; justify-content: space-around; margin-top: 0.5rem; }
                    }
                `}</style>
                {/* Superior Header */}
                <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: 'linear-gradient(135deg, #a855f7, #38bdf8)', padding: '1rem', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)' }}>
                            <Music size={28} color="white" />
                        </div>
                        <div>
                            <h2 className="serena-title-glow" style={{ margin: 0, fontSize: '1.8rem', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                Estudio Musical IA <span style={{ fontSize: '0.8rem', background: '#a855f7', padding: '0.2rem 0.5rem', borderRadius: '10px', verticalAlign: 'middle' }}>BETA</span>
                            </h2>
                            <p style={{ margin: '0.2rem 0 0 0', color: '#38bdf8', fontSize: '0.9rem' }}>Composición automatizada y amigable para {brandOrg}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="btn-glass" style={{ padding: '0.75rem', borderRadius: '50%' }}>
                        <X size={24} color="white" />
                    </button>
                </div>

                {/* Workspace IA */}
                <div className="music-workspace">

                    {/* Sidebar Tools */}
                    <div className="music-sidebar">
                        <button className={activeTab === 'letras' ? 'active-letras' : ''} onClick={() => setActiveTab('letras')} style={{ padding: '1rem', background: activeTab === 'letras' ? 'rgba(168, 85, 247, 0.2)' : 'transparent', border: 'none', color: 'white', textAlign: 'left', borderLeft: activeTab === 'letras' ? '4px solid #a855f7' : '4px solid transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', transition: 'all 0.2s' }}>
                            <Type size={18} color={activeTab === 'letras' ? '#a855f7' : 'var(--text-muted)'} /> <b>Letras y Acordes</b>
                        </button>
                        <button className={activeTab === 'partitura' ? 'active-partitura' : ''} onClick={() => setActiveTab('partitura')} style={{ padding: '1rem', background: activeTab === 'partitura' ? 'rgba(168, 85, 247, 0.2)' : 'transparent', border: 'none', color: 'white', textAlign: 'left', borderLeft: activeTab === 'partitura' ? '4px solid #a855f7' : '4px solid transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', transition: 'all 0.2s' }}>
                            <Music size={18} color={activeTab === 'partitura' ? '#a855f7' : 'var(--text-muted)'} /> <b>Partituras</b>
                        </button>
                        <button className={activeTab === 'sintetizador' ? 'active-sintetizador' : ''} onClick={() => setActiveTab('sintetizador')} style={{ padding: '1rem', background: activeTab === 'sintetizador' ? 'rgba(168, 85, 247, 0.2)' : 'transparent', border: 'none', color: 'white', textAlign: 'left', borderLeft: activeTab === 'sintetizador' ? '4px solid #a855f7' : '4px solid transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', transition: 'all 0.2s' }}>
                            <AudioLines size={18} color={activeTab === 'sintetizador' ? '#a855f7' : 'var(--text-muted)'} /> <b>Sintetizador VST</b>
                        </button>
                        <button className={activeTab === 'educacion' ? 'active-educacion pulse' : ''} onClick={() => setActiveTab('educacion')} style={{ padding: '1rem', background: activeTab === 'educacion' ? 'rgba(16, 185, 129, 0.2)' : 'transparent', border: 'none', color: 'white', textAlign: 'left', borderLeft: activeTab === 'educacion' ? '4px solid #10b981' : '4px solid transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', transition: 'all 0.2s' }}>
                            <GraduationCap size={18} color={activeTab === 'educacion' ? '#10b981' : 'var(--text-muted)'} /> <b style={{ color: activeTab === 'educacion' ? '#10b981' : 'white' }}>Karaoke Edu</b>
                        </button>
                        <button className={activeTab === 'biblioteca' ? 'active-biblioteca pulse' : ''} onClick={() => setActiveTab('biblioteca')} style={{ padding: '1rem', background: activeTab === 'biblioteca' ? 'rgba(56, 189, 248, 0.2)' : 'transparent', border: 'none', color: 'white', textAlign: 'left', borderLeft: activeTab === 'biblioteca' ? '4px solid #38bdf8' : '4px solid transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', transition: 'all 0.2s' }}>
                            <Disc size={18} color={activeTab === 'biblioteca' ? '#38bdf8' : 'var(--text-muted)'} /> <b style={{ color: activeTab === 'biblioteca' ? '#38bdf8' : 'white' }}>Biblioteca Local</b>
                        </button>
                        <button className={activeTab === 'timeline' ? 'active-timeline' : ''} onClick={() => setActiveTab('timeline')} style={{ padding: '1rem', background: activeTab === 'timeline' ? 'rgba(56, 189, 248, 0.2)' : 'transparent', border: 'none', color: 'white', textAlign: 'left', borderLeft: activeTab === 'timeline' ? '4px solid #38bdf8' : '4px solid transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', transition: 'all 0.2s' }}>
                            <AudioLines size={18} color={activeTab === 'timeline' ? '#38bdf8' : 'var(--text-muted)'} /> <b>Timeline Producción</b>
                        </button>
                        <button className={activeTab === 'settings' ? 'active-settings' : ''} onClick={() => setActiveTab('settings')} style={{ padding: '1rem', background: activeTab === 'settings' ? 'rgba(168, 85, 247, 0.2)' : 'transparent', border: 'none', color: 'white', textAlign: 'left', borderLeft: activeTab === 'settings' ? '4px solid #a855f7' : '4px solid transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', transition: 'all 0.2s' }}>
                            <Settings2 size={18} color={activeTab === 'settings' ? '#a855f7' : 'var(--text-muted)'} /> <b>Estilos & IA de Voz</b>
                        </button>

                        <div style={{ padding: '1rem', marginTop: '1rem' }}>
                            <button 
                                onClick={() => {
                                    setSongName('Vals Mis Recuerdos');
                                    setStyleStr('Folclore / Vals');
                                    setTempo(90);
                                    setLyrics(`[Vals - Intro Instrumental]
[Verso 1]
Mis recuerdos son flores de un jardín,
que en La Serena supieron florecer.
Bajo el faro que brilla sin un fin,
vuelvo siempre a volverte a querer.

[Coro]
¡Oh mi Serena, ciudad del aire fiel!
Tus calles llevan aroma de clavel.
En este vals te entrego mi querer,
la ComunaSmart te ve hoy renacer.`);
                                    setActiveTab('letras');
                                }}
                                className="btn-glass" 
                                style={{ width: '100%', fontSize: '0.7rem', color: '#f59e0b', borderColor: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)' }}
                            >
                                <Star size={12} fill="#f59e0b" /> CARGAR "MIS RECUERDOS"
                            </button>
                        </div>

                        <div className="music-sidebar-controls" style={{ marginTop: 'auto', padding: '1rem' }}>
                            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                                <p style={{ margin: '0 0 0.5rem 0', color: 'white', fontSize: '0.85rem' }}><AudioLines size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '5px' }} />Motor IA Audio</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <button onClick={togglePlay} className={`btn-primary ${isPlaying ? 'pulse' : ''}`} style={{ flex: 1, padding: '1rem', background: isPlaying ? '#ef4444' : '#10b981', display: 'flex', justifyContent: 'center', borderRadius: '12px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
                                        {isPlaying ? <Pause size={32} color="white" /> : <Play size={32} color="white" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="music-main-area">

                        {/* Toolbar */}
                        <div className="music-toolbar" style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', display: 'flex', gap: '1rem', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <input type="text" value={songName} onChange={(e) => setSongName(e.target.value)} style={{ background: 'transparent', border: 'none', borderBottom: '1px dashed rgba(255,255,255,0.3)', color: 'white', fontSize: '1.1rem', fontWeight: 'bold', outline: 'none', flex: '1 1 auto', minWidth: '150px' }} />
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                <button className="btn-glass" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', padding: '0.5rem 1rem' }}><Download size={14} /> MP3</button>
                                <button className="btn-glass" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', padding: '0.5rem 1rem' }}><Download size={14} /> PDF</button>
                                <button className="btn-primary" style={{ background: '#a855f7', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', padding: '0.5rem 1rem' }}><Save size={14} /> Nube</button>
                            </div>
                        </div>

                        {/* Editor Area */}
                        <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>

                            {activeTab === 'letras' && (
                                <div className="animate-fade-in">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                        <h3 style={{ margin: 0, color: 'white' }}>Editor de Letras y Acordes</h3>
                                        <div style={{ color: '#38bdf8', fontSize: '0.9rem' }}>Acorde Base: Do Mayor (C)</div>
                                    </div>
                                    <textarea
                                        value={lyrics}
                                        onChange={(e) => setLyrics(e.target.value)}
                                        style={{ width: '100%', minHeight: '300px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(168, 85, 247, 0.3)', color: '#e2e8f0', padding: '1.5rem', borderRadius: '12px', fontSize: '1.1rem', lineHeight: '1.8', fontFamily: 'monospace', resize: 'vertical' }}
                                    ></textarea>
                                </div>
                            )}

                            {activeTab === 'partitura' && (
                                <div className="animate-fade-in" style={{ textAlign: 'center', padding: '2rem' }}>
                                    <Music size={64} color="rgba(168, 85, 247, 0.5)" style={{ margin: '0 auto 1.5rem' }} />
                                    <h3 style={{ color: 'white', marginBottom: '1rem' }}>Generador de Partituras IA</h3>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto' }}>Nuestra IA convertirá tu letra y estilo seleccionado en partituras exportables listas para tocar en escuelas municipales.</p>

                                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', marginTop: '2rem', border: '1px dashed rgba(255,255,255,0.2)' }}>
                                        <span style={{ color: '#a855f7', fontWeight: 'bold' }}>[ Lector Musical Activado: Notas Sugeridas C - G - Am - F ]</span>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'sintetizador' && (
                                <div className="animate-fade-in" style={{ padding: '2rem' }}>
                                    <h3 style={{ color: 'white', marginBottom: '1rem' }}>Sintetizador Base e Instrumentos Virtuales Guía</h3>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Utiliza el sintetizador VST integrado en la plataforma EduSmart para experimentar con frecuencias puras o elegir sonidos MIDI.</p>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                                        <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1.5rem', borderRadius: '12px', border: '1px solid #10b981' }}>
                                            <h4 style={{ color: '#10b981', margin: '0 0 1rem 0' }}>🎹 Teclado Sintetizador</h4>

                                            {/* Minimalist Piano visual representation */}
                                            <div style={{ display: 'flex', justifyContent: 'center', gap: '2px', padding: '1rem', background: '#e2e8f0', borderRadius: '8px', marginBottom: '1.5rem', position: 'relative' }}>
                                                <div style={{ width: '30px', height: '80px', background: 'white', border: '1px solid #cbd5e1', borderRadius: '0 0 4px 4px' }}></div>
                                                <div style={{ width: '20px', height: '50px', background: '#334155', marginLeft: '-12px', marginRight: '-12px', zIndex: 1, borderRadius: '0 0 4px 4px' }}></div>
                                                <div style={{ width: '30px', height: '80px', background: 'white', border: '1px solid #cbd5e1', borderRadius: '0 0 4px 4px' }}></div>
                                                <div style={{ width: '20px', height: '50px', background: '#334155', marginLeft: '-12px', marginRight: '-12px', zIndex: 1, borderRadius: '0 0 4px 4px' }}></div>
                                                <div style={{ width: '30px', height: '80px', background: 'white', border: '1px solid #cbd5e1', borderRadius: '0 0 4px 4px' }}></div>
                                                <div style={{ width: '30px', height: '80px', background: 'white', border: '1px solid #cbd5e1', borderRadius: '0 0 4px 4px' }}></div>
                                                <div style={{ width: '20px', height: '50px', background: '#334155', marginLeft: '-12px', marginRight: '-12px', zIndex: 1, borderRadius: '0 0 4px 4px' }}></div>
                                                <div style={{ width: '30px', height: '80px', background: 'white', border: '1px solid #cbd5e1', borderRadius: '0 0 4px 4px' }}></div>
                                                <div style={{ width: '20px', height: '50px', background: '#334155', marginLeft: '-12px', marginRight: '-12px', zIndex: 1, borderRadius: '0 0 4px 4px' }}></div>
                                                <div style={{ width: '30px', height: '80px', background: 'white', border: '1px solid #cbd5e1', borderRadius: '0 0 4px 4px' }}></div>
                                                <div style={{ width: '20px', height: '50px', background: '#334155', marginLeft: '-12px', marginRight: '-12px', zIndex: 1, borderRadius: '0 0 4px 4px' }}></div>
                                                <div style={{ width: '30px', height: '80px', background: 'white', border: '1px solid #cbd5e1', borderRadius: '0 0 4px 4px' }}></div>
                                            </div>

                                            <button
                                                className="btn-primary"
                                                onClick={() => {
                                                    const AudioContext = window.AudioContext || window.webkitAudioContext;
                                                    if (AudioContext) {
                                                        const ctx = new AudioContext();
                                                        const osc = ctx.createOscillator();
                                                        const gain = ctx.createGain();
                                                        osc.type = 'triangle';
                                                        osc.frequency.value = 440; // A4
                                                        osc.connect(gain);
                                                        gain.connect(ctx.destination);
                                                        gain.gain.setValueAtTime(0.3, ctx.currentTime);
                                                        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);
                                                        osc.start();
                                                        osc.stop(ctx.currentTime + 1.5);
                                                    }
                                                }}
                                                style={{ width: '100%', background: '#10b981', fontWeight: 'bold', padding: '0.8rem' }}
                                            >
                                                Probar Sonido A4 (440Hz)
                                            </button>
                                        </div>

                                        <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1.5rem', borderRadius: '12px', border: '1px solid #38bdf8' }}>
                                            <h4 style={{ color: '#38bdf8', margin: '0 0 1rem 0' }}>🎸 Set de Instrumentos</h4>
                                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'white', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                                <li style={{ background: 'rgba(255,255,255,0.05)', padding: '0.6rem', borderRadius: '6px', fontSize: '0.9rem' }}>✔️ Sintetizador FM Interactivo</li>
                                                <li style={{ background: 'rgba(255,255,255,0.05)', padding: '0.6rem', borderRadius: '6px', fontSize: '0.9rem' }}>✔️ Caja de Rítmos Básica 808</li>
                                                <li style={{ background: 'rgba(255,255,255,0.05)', padding: '0.6rem', borderRadius: '6px', fontSize: '0.9rem' }}>✔️ Secuencias Bass Sub-60Hz</li>
                                                <li style={{ background: 'rgba(255,255,255,0.05)', padding: '0.6rem', borderRadius: '6px', fontSize: '0.9rem' }}>✔️ Mellotron Acústico / Strings</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', marginTop: '2rem', border: '1px dashed rgba(255,255,255,0.2)' }}>
                                        <span style={{ color: '#a855f7', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Settings2 size={18} /> [ CONSOLA MIDI ACTIVA: Conecta tu teclado o controlador USB. ]
                                        </span>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'settings' && (
                                <div className="animate-fade-in">
                                    <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>Ajustes de IA y Estilo</h3>

                                    <div className="music-settings-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                            <label style={{ color: 'white', display: 'block', marginBottom: '1rem', fontWeight: 'bold' }}>Estilo Musical Automático (Prompt IA)</label>

                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                                {['Pop / Himno', 'Urbano / Trap', 'Folclore Electrónico', 'Rock / M. Sinfónica', 'Indie Folk'].map(styleOption => (
                                                    <button
                                                        key={styleOption}
                                                        onClick={() => setStyleStr(styleOption)}
                                                        className="btn-glass"
                                                        style={{
                                                            background: styleStr === styleOption ? '#a855f7' : 'rgba(255,255,255,0.05)',
                                                            borderColor: styleStr === styleOption ? '#c084fc' : 'rgba(255,255,255,0.1)',
                                                            color: 'white',
                                                            flex: '1 1 auto',
                                                            fontSize: '0.85rem',
                                                            padding: '0.5rem 1rem',
                                                            fontWeight: styleStr === styleOption ? 'bold' : 'normal'
                                                        }}>
                                                        {styleOption}
                                                    </button>
                                                ))}
                                            </div>

                                            <label style={{ color: 'white', display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Tempo / Velocidad ({tempo} BPM)</label>
                                            <input type="range" min="60" max="180" value={tempo} onChange={(e) => setTempo(e.target.value)} style={{ width: '100%', accentColor: '#a855f7' }} />
                                        </div>

                                        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                            <label style={{ color: 'white', display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Voz IA</label>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                <label style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><input type="radio" name="voice" defaultChecked /> Serena (Voz Institucional Femenina)</label>
                                                <label style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><input type="radio" name="voice" /> Gabriel (Voz Cálida Masculina)</label>
                                                <label style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><input type="radio" name="voice" /> Coro Multi-Voz Infantil</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'timeline' && (
                                <div className="animate-fade-in" style={{ padding: '1rem' }}>
                                    <h3 style={{ color: 'white', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <AudioLines color="#38bdf8" /> Línea de Tiempo de Producción (Smart Composer)
                                    </h3>
                                    
                                    <div style={{ background: 'rgba(0,0,0,0.5)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(56, 189, 248, 0.3)', position: 'relative' }}>
                                        {/* Timeline Ruler */}
                                        <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                                            {[...Array(10)].map((_, i) => (
                                                <div key={i} style={{ flex: 1, fontSize: '0.7rem', color: '#64748b', borderLeft: '1px solid #334155', paddingLeft: '5px' }}>00:{(i*10).toString().padStart(2, '0')}</div>
                                            ))}
                                        </div>

                                        {/* Tracks */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                                <div style={{ width: '80px', fontSize: '0.7rem', color: '#94a3b8' }}>VOZ IA</div>
                                                <div style={{ flex: 1, height: '40px', background: 'rgba(56, 189, 248, 0.2)', border: '1px solid #38bdf8', borderRadius: '4px', position: 'relative', overflow: 'hidden' }}>
                                                    <div className={isPlaying ? 'wave-animate' : ''} style={{ position: 'absolute', inset: 0, opacity: 0.5, background: 'repeating-linear-gradient(90deg, #38bdf8 0, #38bdf8 2px, transparent 2px, transparent 10px)' }}></div>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                                <div style={{ width: '80px', fontSize: '0.7rem', color: '#94a3b8' }}>BASE RÍTMICA</div>
                                                <div style={{ flex: 1, height: '40px', background: 'rgba(168, 85, 247, 0.2)', border: '1px solid #a855f7', borderRadius: '4px', position: 'relative' }}>
                                                    <div style={{ position: 'absolute', top: '10px', left: '10px', width: '80%', height: '20px', background: '#a855f7', borderRadius: '2px', opacity: 0.3 }}></div>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                                <div style={{ width: '80px', fontSize: '0.7rem', color: '#94a3b8' }}>EFECTOS FX</div>
                                                <div style={{ flex: 1, height: '40px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid #f59e0b', borderRadius: '4px' }}></div>
                                            </div>
                                        </div>

                                        {/* Playhead */}
                                        {isPlaying && (
                                            <div style={{ position: 'absolute', top: '2rem', bottom: '2rem', left: `${(karaokeProgress || 0) + 12}%`, width: '2px', background: '#ef4444', zHeight: 10, transition: 'left 0.1s linear' }}>
                                                <div style={{ width: '10px', height: '10px', background: '#ef4444', borderRadius: '50%', marginLeft: '-4px', marginTop: '-5px' }}></div>
                                            </div>
                                        )}
                                    </div>

                                    <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                        <div className="glass-panel" style={{ padding: '1.5rem' }}>
                                            <h4 style={{ color: 'white', margin: '0 0 1rem 0' }}>Generación y Exportación</h4>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                                <button className="btn btn-primary" style={{ background: 'linear-gradient(90deg, #10b981, #059669)', border: 'none' }} onClick={() => alert("Generando Master VLS en alta fidelidad...")}>GENERAR MASTER</button>
                                                <button className="btn-glass" onClick={() => alert("Descargando proyecto para DAW externo...")}><Download size={16} /> STEMS .WAV</button>
                                            </div>
                                        </div>
                                        <div className="glass-panel" style={{ padding: '1.5rem' }}>
                                            <h4 style={{ color: 'white', margin: '0 0 1rem 0' }}>Sincronización Multicanal</h4>
                                            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '8px', fontSize: '0.8rem', color: '#94a3b8' }}>
                                                Modo NDI activado para streaming directo a Broadcaster VLS.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'educacion' && (
                                <div className="animate-slide-up" style={{ textAlign: 'center', pading: '1rem 0' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
                                        <GraduationCap size={40} color="#10b981" />
                                        <h3 style={{ color: 'white', fontSize: '1.8rem', margin: 0 }}>Modo Karaoke Educativo</h3>
                                    </div>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>Desarrollado para jardines infantiles y colegios. Modifica el idioma y sigue la música: los niños aprenden a leer y programar cantando.</p>

                                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
                                        <button onClick={() => setEduLanguage('es')} className="btn-glass" style={{ background: eduLanguage === 'es' ? '#10b981' : '', transition: 'all 0.3s' }}>🇪🇸 Español</button>
                                        <button onClick={() => setEduLanguage('en')} className="btn-glass" style={{ background: eduLanguage === 'en' ? '#38bdf8' : '', transition: 'all 0.3s' }}>🇺🇸 Inglés</button>
                                        <button onClick={() => setEduLanguage('arn')} className="btn-glass" style={{ background: eduLanguage === 'arn' ? '#84cc16' : '', transition: 'all 0.3s' }}>🌿 Mapudungun</button>
                                        <button onClick={() => setEduLanguage('rap')} className="btn-glass" style={{ background: eduLanguage === 'rap' ? '#eab308' : '', transition: 'all 0.3s' }}>🗿 Rapa Nui</button>
                                        <button onClick={() => setEduLanguage('zh')} className="btn-glass" style={{ background: eduLanguage === 'zh' ? '#ef4444' : '', transition: 'all 0.3s' }}>🇨🇳 Chino M.</button>
                                        <button onClick={() => setEduLanguage('code')} className="btn-glass" style={{ background: eduLanguage === 'code' ? '#a855f7' : '', transition: 'all 0.3s' }}>💻 Código JS</button>
                                    </div>

                                    <div style={{
                                        background: 'rgba(0,0,0,0.6)', padding: '4rem 2rem', borderRadius: '24px', position: 'relative', overflow: 'hidden',
                                        border: '2px solid rgba(16, 185, 129, 0.4)', boxShadow: '0 0 40px rgba(16, 185, 129, 0.1)', height: '250px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        {/* Barra de progreso visual (Karaoke Canta Conmigo) */}
                                        <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${karaokeProgress}%`, background: 'linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.2))', transition: 'width 0.2s', zIndex: 0 }}></div>

                                        <h1 style={{
                                            color: 'white', fontSize: eduLanguage === 'code' ? '2.5rem' : '4rem', fontWeight: '900', lineHeight: '1.2', margin: 0, position: 'relative', zIndex: 1, textShadow: '0 4px 10px rgba(0,0,0,0.8)',
                                            fontFamily: eduLanguage === 'code' ? 'monospace' : 'inherit', whiteSpace: 'pre-line'
                                        }}>
                                            {getTranslatedLyrics()}
                                        </h1>

                                        {isPlaying && (
                                            <div style={{ position: 'absolute', bottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: '#10b981' }}>
                                                <Mic2 size={24} className="pulse" /> <span style={{ fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '2px' }}>CANTANDO...</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'biblioteca' && (
                                <div className="animate-fade-in" style={{ padding: '1rem' }}>
                                    <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>Identidad Sonora Integrada</h3>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>El catálogo musical de la organización, conectado directamente con la Radio AI, está disponible en el entorno de creación.</p>
                                    <MusicRanking insideModal={true} />
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
