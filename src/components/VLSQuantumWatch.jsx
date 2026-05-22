import React, { useState, useEffect } from 'react';
import { Calendar, Zap, Minimize2, Maximize2, Clock, Timer, Bell, Play, Pause, RotateCcw, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * VLSQuantumWatch v2 — Reloj digital retro premium.
 * - Arrastrable libremente
 * - Selector de color interno (visible solo cuando expandido)
 * - Botón minimizar → colapsa a pastilla en top-bar
 * - Botón restaurar en modo minimizado
 * - Botón calendario
 * - No solapea otros elementos al estar minimizado (zIndex correcto)
 */
export default function VLSQuantumWatch({ onCalendarClick, isRDMLS: isRDMLS_prop }) {
    const host = (window.location.host || window.location.hostname || '').toLowerCase();
    const path = window.location.pathname.toLowerCase();
    const isRDMLS = isRDMLS_prop ?? (host.includes('rdmls') || (host.includes('laserena.cl') && !host.includes('vecinos')));
    const isArchi = host.includes('archi') || host.includes('radiovecinos') || path.includes('/archi');
    const [time, setTime] = useState(new Date());
    const [blink, setBlink] = useState(true);
    const [isMinimized, setIsMinimized] = useState(() =>
        localStorage.getItem('vls_quantum_minimized') === 'true'
    );
    const [isAnyModalOpen, setIsAnyModalOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const checkModals = () => {
            const hasModal = !!document.querySelector('.vls-modal-active, .vls-news-modal, [style*="z-index: 2000000"]') ||
                           document.body.classList.contains('vls-modal-open');
            setIsAnyModalOpen(hasModal);
        };
        const interval = setInterval(checkModals, 500); // Check every 500ms
        checkModals();

        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const isVisible = !isAnyModalOpen;

    // --- NUEVOS ESTADOS: MODOS Y FUNCIONALIDADES ---
    const [mode, setMode] = useState('time'); // 'time' | 'stopwatch' | 'alarm'
    const [stopwatchTime, setStopwatchTime] = useState(0);
    const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
    const [alarmTime, setAlarmTime] = useState(() => localStorage.getItem('vls_quantum_alarm') || '08:00');
    const [isAlarmSet, setIsAlarmSet] = useState(() => localStorage.getItem('vls_quantum_alarm_set') === 'true');
    const [isAlarmRinging, setIsAlarmRinging] = useState(false);

    // Función de pitido clásico
    const playBeep = (freq = 880, duration = 0.1) => {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            const audioCtx = new AudioContext();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            oscillator.type = 'square'; // Sonido retro
            oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
            gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + duration);
        } catch (e) {}
    };

    const themes = [
        { id: 'blue',   bg: 'linear-gradient(180deg,#0ea5e9 0%,#0369a1 100%)', text: 'white',    sub: '#bae6fd', pin: '#0ea5e9' },
        { id: 'green',  bg: 'linear-gradient(180deg,#22c55e 0%,#15803d 100%)', text: 'white',    sub: '#bbf7d0', pin: '#22c55e' },
        { id: 'red',    bg: 'linear-gradient(180deg,#ef4444 0%,#b91c1c 100%)', text: '#fee2e2',  sub: '#fecaca', pin: '#ef4444' },
        { id: 'purple', bg: 'linear-gradient(180deg,#a855f7 0%,#7e22ce 100%)', text: 'white',    sub: '#e9d5ff', pin: '#a855f7' },
        { id: 'amber',  bg: 'linear-gradient(180deg,#f59e0b 0%,#b45309 100%)', text: '#fffbeb',  sub: '#fde68a', pin: '#f59e0b' },
        { id: 'dark',   bg: 'linear-gradient(180deg,#1e293b 0%,#0f172a 100%)', text: '#38bdf8',  sub: '#94a3b8', pin: '#334155' },
    ];

    const [themeId, setThemeId] = useState(() =>
        localStorage.getItem('vls_quantum_theme') || 'blue'
    );
    const theme = themes.find(themeItem => themeItem.id === themeId) || themes[0];

    const setTheme = (id, e) => {
        e && e.stopPropagation();
        setThemeId(id);
        localStorage.setItem('vls_quantum_theme', id);
    };

    const [is24h, setIs24h] = useState(() => localStorage.getItem('vls_quantum_24h') !== 'false');

    const toggle24h = (e) => {
        e && e.stopPropagation();
        const next = !is24h;
        setIs24h(next);
        localStorage.setItem('vls_quantum_24h', String(next));
    };

    const toggleMin = (e) => {
        e && e.stopPropagation();
        const next = !isMinimized;
        setIsMinimized(next);
        localStorage.setItem('vls_quantum_minimized', String(next));
    };

    const openCalendar = (e) => {
        e && e.stopPropagation();
        if (onCalendarClick) onCalendarClick();
        else window.dispatchEvent(new CustomEvent('open-smart-calendar'));
    };

    useEffect(() => {
        const timerWatch = setInterval(() => { 
            const now = new Date();
            setTime(now); 
            setBlink(p => !p); 

            // Verificar Alarma
            if (isAlarmSet && !isAlarmRinging) {
                const currentH = now.getHours().toString().padStart(2, '0');
                const currentM = now.getMinutes().toString().padStart(2, '0');
                if (`${currentH}:${currentM}` === alarmTime && now.getSeconds() === 0) {
                    setIsAlarmRinging(true);
                    setMode('alarm'); // AUTO-CAMBIO a modo alarma para control fácil
                }
            }
        }, 1000);
        return () => clearInterval(timerWatch);
    }, [isAlarmSet, alarmTime, isAlarmRinging]);

    // Efecto de Sonido de Alarma
    useEffect(() => {
        let interval;
        if (isAlarmRinging) {
            interval = setInterval(() => {
                playBeep(1200, 0.2);
            }, 500);
        }
        return () => clearInterval(interval);
    }, [isAlarmRinging]);

    // Efecto de Cronómetro
    useEffect(() => {
        let timer;
        if (isStopwatchRunning) {
            timer = setInterval(() => {
                setStopwatchTime(prev => prev + 10);
            }, 10);
        }
        return () => clearInterval(timer);
    }, [isStopwatchRunning]);

    const formatStopwatch = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const centiseconds = Math.floor((ms % 1000) / 10);
        return `${pad(minutes)}:${pad(seconds)}.${pad(centiseconds)}`;
    };

    const pad = n => n.toString().padStart(2, '0');
    const rawH = time.getHours();
    const isPM = rawH >= 12;
    const finalH = is24h ? rawH : (rawH % 12 || 12);
    const H = pad(finalH);
    const M = pad(time.getMinutes());
    const S = pad(time.getSeconds());
    const days   = ['DOM','LUN','MAR','MIÉ','JUE','VIE','SÁB'];
    const months = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
    const dayStr = days[time.getDay()];
    const monStr = months[time.getMonth()];
    const dayNum = pad(time.getDate());

    /* ─── Modo minimizado: pastilla compacta ─── */
    if (isMinimized) {
        return (
            <motion.div
                drag dragMomentum={false}
                style={{ position:'fixed', top:'8px', right:'150px', zIndex:9999999,
                         cursor:'grab', userSelect:'none', display:'flex', alignItems:'center',
                         gap:'6px',
                         background: isArchi
                             ? 'linear-gradient(135deg, rgba(251,191,36,0.15), rgba(4,9,20,0.97))'
                             : 'linear-gradient(145deg,#1e293b,#0f172a)',
                         border: isArchi ? '1.5px solid rgba(251,191,36,0.6)' : `1.5px solid ${theme.pin}60`,
                         borderRadius:'50px',
                         padding:'4px 10px',
                         boxShadow: isArchi
                             ? '0 4px 14px rgba(0,0,0,0.6), 0 0 12px rgba(251,191,36,0.2)'
                             : `0 4px 14px rgba(0,0,0,0.6), 0 0 0 1px ${theme.pin}30`,
                         filter:'drop-shadow(0 4px 8px rgba(0,0,0,0.4))' }}
                whileTap={{ cursor:'grabbing' }}
            >
                {isArchi
                    ? <span style={{ fontSize: '0.6rem' }}>📻</span>
                    : <Zap size={10} color="#fde047" fill="#fde047" style={{ animation:'pulse 1s infinite' }} />}
                <span style={{ fontFamily: isArchi ? '"Outfit",sans-serif' : '"Courier New",monospace',
                               fontSize:'0.85rem', fontWeight:900,
                               color: isArchi ? '#fbbf24' : 'white',
                               letterSpacing:'1px', lineHeight:1 }}>
                    {H}<span style={{ opacity: blink ? 1 : 0.3, transition:'opacity 0.1s' }}>:</span>{M}
                    {!is24h && <span style={{ fontSize: '0.45rem', marginLeft: '2px', opacity: 0.8 }}>{isPM ? 'PM':'AM'}</span>}
                </span>
                {isArchi && <span style={{ fontSize: '0.5rem', color: '#f59e0b', fontWeight: 900, letterSpacing: '0.5px' }}>NE</span>}
                <button onClick={toggleMin} title="Expandir reloj"
                    style={{ background:'none', border:'none', cursor:'pointer', padding:0,
                             display:'flex', alignItems:'center', color: isArchi ? '#fbbf24' : '#94a3b8' }}>
                    <Maximize2 size={12} />
                </button>
                <button onClick={openCalendar} title="Abrir calendario"
                    style={{ background:'none', border:'none', cursor:'pointer', padding:0,
                             display:'flex', alignItems:'center', color: isArchi ? '#fbbf24' : '#94a3b8' }}>
                    <Calendar size={12} />
                </button>
            </motion.div>
        );
    }

    if (!isVisible) return null;

    /* ─── Modo expandido: reloj completo ─── */

    // ── RENDER ARCHI ESPECIAL ──────────────────────────────────────────────────
    if (isArchi) {
        return (
            <motion.div
                drag dragMomentum={false}
                id="vls-quantum-watch-container"
                style={{ position:'fixed', top: isMobile ? '80px' : '220px', left: isMobile ? '50%' : '20px', transform: isMobile ? 'translateX(-50%)' : 'none', zIndex:9999999,
                         cursor:'grab', userSelect:'none', width:'210px',
                         filter:'drop-shadow(0 12px 28px rgba(251,191,36,0.25))' }}
                animate={{ y:[0,-5,0] }}
                transition={{ y:{ duration:5, repeat:Infinity, ease:'easeInOut' } }}
                whileHover={{ scale:1.04 }}
                whileTap={{ cursor:'grabbing', scale:0.96 }}
            >
                {/* Carcasa campaña */}
                <div style={{
                    background: 'linear-gradient(145deg, #0a0f1e, #040914)',
                    borderRadius: '14px', padding: '3px',
                    border: '1px solid rgba(251,191,36,0.4)',
                    boxShadow: '0 0 0 1px rgba(251,191,36,0.1), inset 0 1px 0 rgba(255,255,255,0.05)'
                }}>
                    {/* Marco dorado */}
                    <div style={{
                        background: 'linear-gradient(180deg, rgba(251,191,36,0.6), rgba(180,83,9,0.4))',
                        borderRadius: '10px', padding: '1px'
                    }}>
                        {/* Pantalla oscura campaña */}
                        <div style={{
                            background: isAlarmRinging
                                ? (blink ? 'rgba(251,191,36,0.3)' : '#040914')
                                : 'linear-gradient(180deg, #070f20 0%, #040914 100%)',
                            borderRadius: '8px', padding: '10px 12px',
                            position: 'relative', overflow: 'hidden',
                            boxShadow: 'inset 0 0 15px rgba(0,0,0,0.8)',
                        }}>
                            {/* Glow de fondo dorado */}
                            <div style={{
                                position:'absolute', inset: 0,
                                background: 'radial-gradient(ellipse at 50% 0%, rgba(251,191,36,0.07) 0%, transparent 70%)',
                                pointerEvents: 'none'
                            }} />

                            {/* Barra superior: logo + controles */}
                            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'6px', position:'relative', zIndex:1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <span style={{ fontSize: '0.65rem' }}>📻</span>
                                    <span style={{ fontFamily:'"Outfit",sans-serif', fontSize:'0.6rem', fontWeight:900, color:'#fbbf24', letterSpacing:'1px', textTransform:'uppercase' }}>ARCHI</span>
                                </div>
                                <div style={{ display:'flex', gap:'5px', alignItems:'center' }}>
                                    <button onClick={toggle24h}
                                        style={{ background:'rgba(251,191,36,0.1)', border:'1px solid rgba(251,191,36,0.3)', padding:'1px 4px', borderRadius:'4px', cursor:'pointer', fontSize:'0.45rem', fontWeight:'bold', color:'#fbbf24' }}>
                                        {is24h ? '24H' : '12H'}
                                    </button>
                                    <button onClick={toggleMin} title="Minimizar"
                                        style={{ background:'none', border:'none', cursor:'pointer', padding:0, display:'flex', alignItems:'center', color:'rgba(251,191,36,0.5)' }}>
                                        <Minimize2 size={10} />
                                    </button>
                                    <button onClick={openCalendar} title="Calendario"
                                        style={{ background:'none', border:'none', cursor:'pointer', padding:0, display:'flex', alignItems:'center', color:'rgba(251,191,36,0.5)' }}>
                                        <Calendar size={10} />
                                    </button>
                                </div>
                            </div>

                            {/* Fecha */}
                            <div style={{ textAlign:'center', marginBottom:'4px', position:'relative', zIndex:1 }}>
                                <span style={{ fontFamily:'"Outfit",sans-serif', fontSize:'0.65rem', fontWeight:700, color:'rgba(251,191,36,0.6)', letterSpacing:'2px', textTransform:'uppercase' }}>
                                    {dayStr} {dayNum} {monStr} 2026
                                </span>
                            </div>

                            {/* HORA PRINCIPAL — Estilo campaña */}
                            <div style={{ minHeight: '68px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position:'relative', zIndex:1 }}>
                                {mode === 'time' && (
                                    <div style={{ textAlign:'center' }}>
                                        <div style={{ display:'flex', alignItems:'baseline', justifyContent:'center' }}>
                                            <span style={{ fontFamily:'"Courier New",monospace', fontSize:'2.2rem', fontWeight:900, color:'#fbbf24', letterSpacing:'3px', lineHeight:1,
                                                textShadow:'0 0 20px rgba(251,191,36,0.5)' }}>{H}</span>
                                            <span style={{ fontFamily:'"Courier New",monospace', fontSize:'2.2rem', fontWeight:900, color:'#f59e0b', margin:'0 1px', lineHeight:1,
                                                opacity:blink?1:0.2, transition:'opacity 0.1s' }}>:</span>
                                            <span style={{ fontFamily:'"Courier New",monospace', fontSize:'2.2rem', fontWeight:900, color:'#fbbf24', letterSpacing:'3px', lineHeight:1,
                                                textShadow:'0 0 20px rgba(251,191,36,0.5)' }}>{M}</span>
                                            <div style={{ display:'flex', flexDirection:'column', gap:'2px', marginLeft:'5px', alignSelf:'flex-end', marginBottom:'3px' }}>
                                                <span style={{ fontFamily:'"Courier New",monospace', fontSize:'0.9rem', fontWeight:900, color:'rgba(251,191,36,0.6)' }}>{S}</span>
                                                {!is24h && <span style={{ fontSize:'0.4rem', background:'rgba(251,191,36,0.15)', padding:'1px 3px', borderRadius:'4px', color:'#fbbf24', textAlign:'center' }}>{isPM?'PM':'AM'}</span>}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {mode === 'stopwatch' && (
                                    <div style={{ textAlign:'center' }}>
                                        <div style={{ fontFamily:'"Courier New",monospace', fontSize:'1.5rem', fontWeight:900, color:'#fbbf24', letterSpacing:'1px', textShadow:'0 0 15px rgba(251,191,36,0.4)' }}>
                                            {formatStopwatch(stopwatchTime)}
                                        </div>
                                        <div style={{ display:'flex', justifyContent:'center', gap:'10px', marginTop:'6px' }}>
                                            <button onClick={(e) => { e.stopPropagation(); setIsStopwatchRunning(!isStopwatchRunning); playBeep(600); }}
                                                style={{ background:'rgba(251,191,36,0.15)', border:'1px solid rgba(251,191,36,0.4)', color:'#fbbf24', borderRadius:'4px', padding:'2px 8px', cursor:'pointer' }}>
                                                {isStopwatchRunning ? <Pause size={12}/> : <Play size={12}/>}
                                            </button>
                                            <button onClick={(e) => { e.stopPropagation(); setStopwatchTime(0); setIsStopwatchRunning(false); playBeep(400); }}
                                                style={{ background:'rgba(251,191,36,0.15)', border:'1px solid rgba(251,191,36,0.4)', color:'#fbbf24', borderRadius:'4px', padding:'2px 8px', cursor:'pointer' }}>
                                                <RotateCcw size={12}/>
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {mode === 'alarm' && (
                                    <div style={{ textAlign:'center', position:'relative' }}>
                                        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'5px' }}>
                                            <input type="time" value={alarmTime}
                                                onClick={(e) => e.stopPropagation()}
                                                onChange={(e) => { setAlarmTime(e.target.value); localStorage.setItem('vls_quantum_alarm', e.target.value); }}
                                                style={{ background:'rgba(0,0,0,0.5)', border:'1px solid rgba(251,191,36,0.4)', color:'#fbbf24', fontSize:'1.1rem', fontFamily:'"Courier New",monospace', borderRadius:'4px', padding:'2px', outline:'none' }}
                                            />
                                            <button onClick={(e) => { e.stopPropagation(); const next=!isAlarmSet; setIsAlarmSet(next); localStorage.setItem('vls_quantum_alarm_set',String(next)); playBeep(next?1000:500); if(isAlarmRinging)setIsAlarmRinging(false); }}
                                                style={{ background:isAlarmSet?'#fbbf24':'rgba(251,191,36,0.1)', border:'1px solid rgba(251,191,36,0.4)', color:isAlarmSet?'black':'#fbbf24', borderRadius:'4px', padding:'5px', cursor:'pointer' }}>
                                                <Bell size={14} fill={isAlarmSet?'currentColor':'none'}/>
                                            </button>
                                        </div>
                                        {isAlarmRinging && (
                                            <button onClick={(e) => { e.stopPropagation(); setIsAlarmRinging(false); }}
                                                style={{ position:'absolute', inset:-10, zIndex:10, background:'rgba(251,191,36,0.95)', border:'none', color:'#0f172a', fontSize:'0.75rem', fontWeight:900, cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'5px' }}>
                                                <Bell size={28} style={{ animation:'bounce 0.5s infinite' }}/>
                                                DETENER ALARMA
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Selector MODOS */}
                            <div style={{ display:'flex', justifyContent:'center', gap:'8px', marginTop:'6px', borderTop:'1px solid rgba(251,191,36,0.15)', paddingTop:'5px' }}>
                                <button onClick={(e) => { e.stopPropagation(); setMode('time'); playBeep(800); }}
                                    style={{ background:mode==='time'?'rgba(251,191,36,0.2)':'none', border:`1px solid ${mode==='time'?'rgba(251,191,36,0.5)':'transparent'}`, color:'#fbbf24', padding:'2px 6px', borderRadius:'4px', cursor:'pointer' }}><Clock size={12}/></button>
                                <button onClick={(e) => { e.stopPropagation(); setMode('stopwatch'); playBeep(800); }}
                                    style={{ background:mode==='stopwatch'?'rgba(251,191,36,0.2)':'none', border:`1px solid ${mode==='stopwatch'?'rgba(251,191,36,0.5)':'transparent'}`, color:'#fbbf24', padding:'2px 6px', borderRadius:'4px', cursor:'pointer' }}><Timer size={12}/></button>
                                <button onClick={(e) => { e.stopPropagation(); setMode('alarm'); playBeep(800); }}
                                    style={{ background:mode==='alarm'?'rgba(251,191,36,0.2)':'none', border:`1px solid ${mode==='alarm'?'rgba(251,191,36,0.5)':'transparent'}`, color:'#fbbf24', padding:'2px 6px', borderRadius:'4px', cursor:'pointer' }}><Bell size={12}/></button>
                            </div>

                            {/* Branding campaña */}
                            <div style={{ marginTop:'6px', borderTop:'1px solid rgba(251,191,36,0.2)', paddingTop:'5px', textAlign:'center', position:'relative', zIndex:1 }}>
                                <div style={{ fontSize:'0.55rem', fontWeight:900, color:'#fbbf24', letterSpacing:'2px', textTransform:'uppercase', marginBottom:'4px' }}>
                                    NUEVA ENERGÍA · ARCHI 2026
                                </div>
                                <div style={{ fontSize:'0.5rem', color:'rgba(251,191,36,0.5)', fontStyle:'italic' }}>
                                    Solange Gómez Jelves · Presidenta
                                </div>
                                {/* Pulso vivo dorado */}
                                <div style={{ display:'flex', justifyContent:'center', gap:'3px', marginTop:'5px' }}>
                                    {[0,1,2,3,4].map(i => (
                                        <div key={i} style={{
                                            width:'3px',
                                            height: `${[6,10,14,10,6][i]}px`,
                                            background:'rgba(251,191,36,0.6)',
                                            borderRadius:'1px',
                                            animation: `archiBeat${i} ${0.8 + i*0.15}s ease-in-out infinite alternate`
                                        }}/>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <style>{`
                    @keyframes archiBeat0 { from{height:4px;opacity:0.3} to{height:10px;opacity:1} }
                    @keyframes archiBeat1 { from{height:6px;opacity:0.4} to{height:14px;opacity:1} }
                    @keyframes archiBeat2 { from{height:8px;opacity:0.5} to{height:18px;opacity:1} }
                    @keyframes archiBeat3 { from{height:6px;opacity:0.4} to{height:14px;opacity:1} }
                    @keyframes archiBeat4 { from{height:4px;opacity:0.3} to{height:10px;opacity:1} }
                `}</style>
            </motion.div>
        );
    }

    /* ─── Modo expandido estándar (no ARCHI) ─── */
    return (
        <motion.div
            drag dragMomentum={false}
            id="vls-quantum-watch-container"
            style={{ position:'fixed', top: isMobile ? '80px' : '220px', left: isMobile ? '50%' : '20px', transform: isMobile ? 'translateX(-50%)' : 'none', zIndex:9999999,
                     cursor:'grab', userSelect:'none', width:'205px',
                     filter:'drop-shadow(0 10px 20px rgba(0,0,0,0.5))' }}
            animate={{ y:[0,-4,0] }}
            transition={{ y:{ duration:4, repeat:Infinity, ease:'easeInOut' } }}
            whileHover={{ scale:1.05 }}
            whileTap={{ cursor:'grabbing', scale:0.95 }}
        >
            {/* Carcasa */}
            <div style={{ background:'linear-gradient(145deg,#1e293b,#0f172a)', borderRadius:'12px',
                          padding:'3px', border:'1px solid #334155' }}>
                {/* Marco metalizado */}
                <div style={{ background:'linear-gradient(180deg,#64748b,#334155)', borderRadius:'8px',
                              padding:'1px' }}>
                    {/* Pantalla LCD */}
                    <div style={{ 
                        background: isAlarmRinging ? (blink ? '#f59e0b' : '#fff') : theme.bg, 
                        borderRadius:'6px', padding:'8px 12px',
                        position:'relative', 
                        boxShadow: isAlarmRinging ? '0 0 30px #f59e0b' : 'inset 0 0 10px rgba(0,0,0,0.5)',
                        transition: 'all 0.1s',
                        overflow: 'hidden'
                    }}>
                        {/* Flare */}
                        <div style={{ position:'absolute', inset:0,
                                      background:'linear-gradient(135deg,rgba(255,255,255,0.15) 0%,transparent 50%)',
                                      borderRadius:'6px', pointerEvents:'none' }} />
                        {/* Row 1: día + botones acción */}
                        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
                                      marginBottom:'4px', position:'relative', zIndex:1 }}>
                            <span style={{ fontFamily:'"Courier New",monospace', fontSize:'0.65rem',
                                           fontWeight:'bold', color:theme.sub }}>
                                {dayStr} {dayNum} {monStr}
                            </span>
                            <div style={{ display:'flex', gap:'6px', alignItems:'center' }}>
                                <button onClick={toggle24h} title="Formato 12/24h"
                                    style={{ background:'rgba(0,0,0,0.2)', border:`1px solid ${theme.pin}`, padding:'1px 4px', borderRadius:'4px', cursor:'pointer', fontSize: '0.45rem', fontWeight: 'bold', color: 'white' }}>
                                    {is24h ? '24H' : '12H'}
                                </button>
                                <button onClick={toggleMin} title="Minimizar"
                                    style={{ background:'none', border:'none', cursor:'pointer', padding:0,
                                             display:'flex', alignItems:'center', color:'rgba(255,255,255,0.6)' }}>
                                    <Minimize2 size={10} />
                                </button>
                                <button onClick={openCalendar} title="Calendario"
                                    style={{ background:'none', border:'none', cursor:'pointer', padding:0,
                                             display:'flex', alignItems:'center', color:'rgba(255,255,255,0.6)' }}>
                                    <Calendar size={10} />
                                </button>
                            </div>
                        </div>

                        {/* Pantalla LCD Principal cambiante según MODO */}
                        <div style={{ minHeight: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            {mode === 'time' && (
                                <div style={{ display:'flex', alignItems:'baseline', justifyContent:'center', position:'relative', zIndex:1 }}>
                                    <span style={{ fontFamily:'"Courier New",monospace', fontSize:'1.8rem', fontWeight:900, color:'white', letterSpacing:'2px', lineHeight:1 }}>{H}</span>
                                    <span style={{ fontFamily:'"Courier New",monospace', fontSize:'1.8rem', fontWeight:900, color:theme.text, margin:'0 2px', lineHeight:1, opacity:blink?1:0.3, transition:'opacity 0.1s' }}>:</span>
                                    <span style={{ fontFamily:'"Courier New",monospace', fontSize:'1.8rem', fontWeight:900, color:theme.text, letterSpacing:'2px', lineHeight:1 }}>{M}</span>
                                    <span style={{ fontFamily:'"Courier New",monospace', fontSize:'0.9rem', fontWeight:900, color:theme.sub, marginLeft:'5px', alignSelf:'flex-end', marginBottom:'2px', display:'flex', flexDirection:'column', gap:'2px' }}>
                                        <span>{S}</span>
                                        {!is24h && <span style={{ fontSize: '0.4rem', background: 'rgba(0,0,0,0.3)', padding: '1px 3px', borderRadius: '4px', letterSpacing: '0', textAlign: 'center' }}>{isPM ? 'PM':'AM'}</span>}
                                    </span>
                                </div>
                            )}
                            {mode === 'stopwatch' && (
                                <div style={{ textAlign: 'center', position:'relative', zIndex:1 }}>
                                    <div style={{ fontFamily:'"Courier New",monospace', fontSize:'1.6rem', fontWeight:900, color:'white', letterSpacing:'1px' }}>
                                        {formatStopwatch(stopwatchTime)}
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '5px' }}>
                                        <button onClick={(e) => { e.stopPropagation(); setIsStopwatchRunning(!isStopwatchRunning); playBeep(600); }} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', borderRadius: '4px', padding: '2px 8px', cursor: 'pointer' }}>
                                            {isStopwatchRunning ? <Pause size={12} /> : <Play size={12} />}
                                        </button>
                                        <button onClick={(e) => { e.stopPropagation(); setStopwatchTime(0); setIsStopwatchRunning(false); playBeep(400); }} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', borderRadius: '4px', padding: '2px 8px', cursor: 'pointer' }}>
                                            <RotateCcw size={12} />
                                        </button>
                                    </div>
                                </div>
                            )}
                            {mode === 'alarm' && (
                                <div style={{ textAlign: 'center', position:'relative', zIndex:1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                        <input type="time" value={alarmTime}
                                            onClick={(e) => e.stopPropagation()}
                                            onChange={(e) => { setAlarmTime(e.target.value); localStorage.setItem('vls_quantum_alarm', e.target.value); }}
                                            style={{ background: 'rgba(0,0,0,0.4)', border: `1px solid ${theme.sub}`, color: 'white', fontSize: '1.2rem', fontFamily: '"Courier New", monospace', borderRadius: '4px', padding: '2px', outline: 'none' }}
                                        />
                                        <button onClick={(e) => { e.stopPropagation(); const next = !isAlarmSet; setIsAlarmSet(next); localStorage.setItem('vls_quantum_alarm_set', String(next)); playBeep(next ? 1000 : 500); if (isAlarmRinging) setIsAlarmRinging(false); }}
                                            style={{ background: isAlarmSet ? '#f59e0b' : 'rgba(255,255,255,0.1)', border: 'none', color: isAlarmSet ? 'black' : 'white', borderRadius: '4px', padding: '5px', cursor: 'pointer' }}>
                                            <Bell size={14} fill={isAlarmSet ? 'black' : 'none'} />
                                        </button>
                                    </div>
                                    {isAlarmRinging && (
                                        <button onClick={(e) => { e.stopPropagation(); setIsAlarmRinging(false); }}
                                            style={{ position: 'absolute', inset: -10, zIndex: 10, background: 'rgba(239,68,68,0.9)', border: 'none', color: 'white', fontSize: '0.8rem', fontWeight: '900', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                            <Bell size={30} style={{ animation: 'bounce 0.5s infinite' }} />
                                            CLICK PARA DETENER
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Selector de MODOS */}
                        <div style={{ display:'flex', justifyContent:'center', gap:'8px', marginTop:'6px', borderTop:'1px solid rgba(255,255,255,0.1)', paddingTop:'4px' }}>
                            <button onClick={(e) => { e.stopPropagation(); setMode('time'); playBeep(800); }} style={{ background: mode === 'time' ? 'rgba(255,255,255,0.2)' : 'none', border:'none', color:'white', padding:'2px', borderRadius:'4px', cursor:'pointer' }}><Clock size={12}/></button>
                            <button onClick={(e) => { e.stopPropagation(); setMode('stopwatch'); playBeep(800); }} style={{ background: mode === 'stopwatch' ? 'rgba(255,255,255,0.2)' : 'none', border:'none', color:'white', padding:'2px', borderRadius:'4px', cursor:'pointer' }}><Timer size={12}/></button>
                            <button onClick={(e) => { e.stopPropagation(); setMode('alarm'); playBeep(800); }} style={{ background: mode === 'alarm' ? 'rgba(255,255,255,0.2)' : 'none', border:'none', color:'white', padding:'2px', borderRadius:'4px', cursor:'pointer' }}><Bell size={12}/></button>
                        </div>

                        {/* Branding + dots */}
                        <div style={{ marginTop:'4px', borderTop:'1px solid rgba(255,255,255,0.2)', paddingTop:'4px', display:'flex', flexDirection:'column', alignItems:'center', position:'relative', zIndex:1, gap:'4px' }}>
                            <div style={{ fontSize: '0.55rem', fontWeight: 'bold', color: theme.sub, letterSpacing: '1px', textTransform: 'uppercase' }}>
                                {isRDMLS ? 'HORA OFICIAL RDMLS.CL' : 'VLS QUANTUM'}
                            </div>
                            <div style={{ display:'flex', gap:'10px', alignItems:'center', background: 'rgba(0,0,0,0.3)', padding:'5px 15px', borderRadius:'20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                                {themes.map(themeItem => (
                                    <button key={themeItem.id}
                                        onClick={(e) => { e.stopPropagation(); setTheme(themeItem.id); playBeep(1200, 0.05); }}
                                        title={`Color ${themeItem.id}`}
                                        style={{ width:'14px', height:'14px', borderRadius:'50%', background:themeItem.pin, padding:0, cursor:'pointer', border: themeId === themeItem.id ? '2px solid white' : '1px solid rgba(0,0,0,0.3)', boxShadow: themeId === themeItem.id ? `0 0 12px ${themeItem.pin}` : 'none', transform: themeId === themeItem.id ? 'scale(1.2)' : 'scale(1)', transition:'all 0.2s' }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
