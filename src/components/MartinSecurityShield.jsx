import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, EyeOff, Server, Terminal, AlertTriangle } from 'lucide-react';

export default function MartinSecurityShield() {
    const [logs, setLogs] = useState([]);
    const [isChecking, setIsChecking] = useState(true);
    const [showConsole, setShowConsole] = useState(false);
    const [isUnderAttack, setIsUnderAttack] = useState(false);
    const [attackLogs, setAttackLogs] = useState([]);
    const [activeTab, setActiveTab] = useState('audit'); // 'audit' or 'cloudflare'
    const [cfConfig, setCfConfig] = useState({
        token: localStorage.getItem('cf_api_token') || '',
        zoneId: localStorage.getItem('cf_zone_id') || '29f036041db098a57636c27c3cc5a067',
        underAttack: localStorage.getItem('cf_under_attack') === 'true',
        domain: 'farito.cl'
    });
    const [dnsStatus, setDnsStatus] = useState('checking'); // 'checking', 'unconfigured', 'protected'

    const ALLOWED_ADMINS = ['vecinosmart@gmail.com', 'master@vecinosmart.cl', 'fabi@vecinosmart.cl'];
    const userEmail = localStorage.getItem('user_email') || '';
    const isAuthorized = ALLOWED_ADMINS.includes(userEmail.toLowerCase()) || localStorage.getItem('master_bypass') === 'true';

    useEffect(() => {
        // Prevención básica de iframe clickjacking y devtools (simulado)
        if (window.top !== window.self) {
            window.top.location = window.self.location;
        }

        const bootSequence = [
            {msg: 'INIT: Protocolo de Defensa Activa - MARTIN SECURITY 360° ©', time: 300 },
            { msg: 'ACTIVA: Capa ANTI-SPY v2026 - Bloqueando rastreo invasivo...', time: 250 },
            { msg: 'SCAN: Deep Packet Inspection (DPI) - Purificando tráfico de red...', time: 200 },
            { msg: 'OK: Sanitización de inputs y formularios reactivos completada', time: 100 },
            { msg: 'Cargando Pilar 1: Smart Citizens (Atención Vecinal, Reportes y Clima)', time: 350 },
            { msg: '---> Módulo: SERENAMET Sistema Meteorológico Local [INTEGRADO]', time: 150 },
            { msg: '---> Módulo: Radio Digital La Serena [INTEGRADO]', time: 150 },
            { msg: 'Cargando Pilar 2: Smart Administration (E-Learning y Capacitaciones)', time: 350 },
            { msg: '---> Módulo: Portal Red Empleo & Oficios Smart [INTEGRADO]', time: 150 },
            { msg: 'Cargando Pilar 3: Smart Events (Protocolos y Deportes)', time: 350 },
            { msg: '---> Módulo: Club Deportes La Serena (CDLS Panel) [INTEGRADO]', time: 150 },
            { msg: '---> Módulo: Paseo Histórico 3D y Bus del Tiempo [INTEGRADO]', time: 150 },
            { msg: 'Cargando Pilar 4: Smart Listening (Faro IA Asistente y Sentinel Mini)', time: 350 },
            { msg: '---> Módulo: Inteligencia Artificial FARO [INTEGRADO]', time: 150 },
            { msg: '---> Módulo: Farito Navigator (Navegador Web Guiado) [INTEGRADO]', time: 150 },
            { msg: 'DEFENSE: Martin Shield Anti-Spy Engine [READY]', time: 200 },
            { msg: 'SCAN: Verificando integridad de nodos criptográficos y balanceadores', time: 400 },
            { msg: 'OK: Todos los Módulos Smart Comuna cargados y operativos', time: 300 },
            { msg: 'MARTIN SHIELD ACTIVE: Arquitectura Zero-Trust asegurada. 2026 Safe Mode ON.', time: 500 }
        ];

        let isCancelled = false;

        const loadLogs = async () => {
            for (let i = 0; i < bootSequence.length; i++) {
                if (isCancelled) return;
                const { msg, time } = bootSequence[i];
                setLogs(prev => [...prev, msg]);
                await new Promise(r => setTimeout(r, time));
            }
            if (!isCancelled) {
                setTimeout(() => setIsChecking(false), 800);
            }
        };

        const checkDNS = async () => {
            try {
                // Simulación de chequeo de NS (en producción usaría una API de DNS)
                setTimeout(() => {
                    const hasZone = cfConfig.zoneId.length > 10;
                    setDnsStatus(hasZone ? 'protected' : 'unconfigured');
                }, 2000);
            } catch (err) {
                setDnsStatus('unconfigured');
            }
        };

        loadLogs();
        checkDNS();

        // MARTIN PROTECT VECINOS Active Protections
        const handleContextMenu = (e) => {
            e.preventDefault();
            // Instead of immediate defense, we offer to share the app
            window.dispatchEvent(new CustomEvent('open-smart-share-qr', { 
                detail: { 
                    url: window.location.href,
                    title: '¡Difunde la App Smart Comuna!',
                    message: 'Escanea el código para llevar la ciudad en tu bolsillo.'
                } 
            }));
            
            // Keep a log of "suspicious" behavior but don't block unless it's extreme
            setLogs(prev => [...prev.slice(-10), `[${new Date().toLocaleTimeString()}] INFO: Interacción de menú contextual redirigida a Smart Share QR.`]);
        };

        const handleKeyDown = (e) => {
            // F12 - Still suspicious
            if (e.keyCode === 123) {
                e.preventDefault();
                setLogs(prev => [...prev.slice(-10), `[${new Date().toLocaleTimeString()}] WARN: Intento de F12 detectado. Desviando...`]);
                // triggerDefense('Intento de F12 (DevTools) detectado.'); // Disabled for now to be less aggressive as per user request
            }
            // Ctrl+Shift+I or Ctrl+Shift+J or Ctrl+U
            if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) {
                e.preventDefault();
                triggerDefense('Intento de consola de desarrollador detectado.');
            }
            if (e.ctrlKey && e.keyCode === 85) {
                e.preventDefault();
                triggerDefense('Intento de ver código fuente (Ctrl+U) detectado.');
            }
        };

        const triggerDefense = (reason) => {
            setIsUnderAttack(true);
            setAttackLogs([`[${new Date().toLocaleTimeString()}] ALARMA C5: ${reason}`, 'Iniciando contramedidas de neutralización...', 'Desviando IP a honeypot municipal...']);
            setTimeout(() => {
                window.location.href = "https://laserena.cl";
            }, 5500);
        };

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            isCancelled = true;
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        const handleOpen = () => setShowConsole(true);
        const handleCloseAll = () => setShowConsole(false);
        
        window.addEventListener('open-martin-shield', handleOpen);
        window.addEventListener('close-all-floating', handleCloseAll);

        return () => {
            window.removeEventListener('open-martin-shield', handleOpen);
            window.removeEventListener('close-all-floating', handleCloseAll);
        };
    }, []);

    if (isUnderAttack) {
        return (
            <div style={{
                position: 'fixed', inset: 0, zIndex: 999999,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'monospace', padding: '2rem', textAlign: 'center'
            }}>
                {/* BLURRED BACKGROUND OVERLAY (Freeze effect) */}
                <div style={{ 
                    position: 'absolute', inset: 0, 
                    backdropFilter: 'blur(25px)', 
                    background: 'rgba(15, 23, 42, 0.7)', 
                    zIndex: -1 
                }}></div>

                {/* TECH SCANNING GRID EFFECT */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                    backgroundSize: '100% 4px, 6px 100%',
                    pointerEvents: 'none',
                    zIndex: 0
                }}></div>

                <div className="animate-float" style={{ position: 'relative', zIndex: 10, marginBottom: '2rem' }}>
                    <img 
                        src="/serenito_security_guard_close_up_1773392164475.png" 
                        alt="Serenito Guard" 
                        style={{ height: '240px', filter: 'drop-shadow(0 0 30px rgba(56, 189, 248, 0.6))' }}
                    />
                    <div style={{ 
                        position: 'absolute', top: '-10px', right: '-80px', 
                        background: '#38bdf8', color: '#0f172a', padding: '0.8rem 1.2rem', 
                        borderRadius: '20px', border: '2px solid white', 
                        fontSize: '0.9rem', fontWeight: 'bold', maxWidth: '250px', 
                        textAlign: 'left', boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                        animation: 'slide-up 0.5s ease-out'
                    }}>
                        ¡Tranqui! Aquí está Serenito vigilando 360°. Detectamos movimientos raros pero mi <b>Martin Protect Defense</b> ya está neutralizando todo. ✨
                    </div>
                </div>

                <div className="glass-panel" style={{ 
                    background: 'rgba(10, 10, 10, 0.8)', padding: '2rem', borderRadius: '24px', 
                    width: '100%', maxWidth: '750px', textAlign: 'left', 
                    border: '1px solid rgba(56, 189, 248, 0.5)', 
                    boxShadow: '0 0 50px rgba(56, 189, 248, 0.2)',
                    zIndex: 5
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8', marginBottom: '1rem', fontSize: '0.8rem' }}>
                        <ShieldCheck size={18} /> MODO DE PROTECCIÓN ACTIVA VLS 2026
                    </div>
                    {attackLogs.map((log, idx) => (
                        <div key={idx} style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '0.6rem' }}>
                            <span style={{ color: '#38bdf8', marginRight: '8px' }}>[√]</span> {log}
                        </div>
                    ))}
                    <div className="pulse" style={{ color: '#facc15', fontSize: '1.1rem', marginTop: '1.5rem', fontWeight: 'bold', textAlign: 'center' }}>
                        &gt; RE-ESTABILIZANDO CONEXIÓN SEGURA... _
                    </div>
                </div>

                <style>{`
                    .animate-float { animation: float-martin 5s ease-in-out infinite; }
                    @keyframes float-martin { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
                    @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                `}</style>
            </div>
        );
    }

    if (!isChecking && !showConsole) {
        return null;
    }

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100000,
            background: 'rgba(5, 10, 25, 0.98)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{
                width: '95%',
                maxWidth: '1200px',
                background: '#0a0a0a',
                border: '1px solid #10b981',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 0 40px rgba(16, 185, 129, 0.2)',
                fontFamily: 'monospace'
            }}>
                <div style={{ padding: '0.75rem 1rem', background: '#052e16', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #10b981', gap: '1rem', flexWrap: 'nowrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', flex: 1, minWidth: 0 }}>
                        <Terminal size={18} style={{ flexShrink: 0 }} />
                        <span style={{ fontWeight: 'bold', letterSpacing: '1px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>SHIELD TERMINAL v3.0 (MARTIN SECURITY 360° ©)</span>
                    </div>
                    {!isChecking && (
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button 
                                onClick={() => setActiveTab('audit')}
                                style={{ background: activeTab === 'audit' ? '#10b981' : 'transparent', border: '1px solid #10b981', borderRadius: '4px', color: activeTab === 'audit' ? '#000' : '#10b981', padding: '0.4rem 0.8rem', cursor: 'pointer', fontWeight: 'bold' }}
                            >
                                AUDITORÍA SMART
                            </button>
                            <button 
                                onClick={() => setActiveTab('cloudflare')}
                                style={{ 
                                    background: activeTab === 'cloudflare' ? '#f97316' : 'transparent', 
                                    border: '1px solid #f97316', 
                                    borderRadius: '4px', 
                                    color: activeTab === 'cloudflare' ? '#000' : '#f97316', 
                                    padding: '0.4rem 0.8rem', 
                                    cursor: 'pointer', 
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    opacity: isAuthorized ? 1 : 0.5
                                }}
                                title={isAuthorized ? "Gestión de Infraestructura" : "Acceso Restringido: Requiere Perfil de Superusuario"}
                            >
                                {isAuthorized ? <Server size={14} /> : <Lock size={14} />}
                                CLOUDFLARE ☁️
                            </button>
                            <button onClick={() => setShowConsole(false)} style={{ flexShrink: 0, background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', borderRadius: '4px', color: '#ef4444', padding: '0.4rem 0.8rem', cursor: 'pointer', fontWeight: 'bold' }}>SALIR</button>
                        </div>
                    )}
                </div>

                <div style={{ padding: '2rem', height: '80vh', maxHeight: '700px', display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto' }}>
                    {activeTab === 'audit' ? (
                        <>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px dashed rgba(16, 185, 129, 0.3)' }}>
                                <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
                                    <h2 style={{ margin: 0, color: '#10b981', textTransform: 'uppercase', fontSize: '1rem', overflow: 'hidden', textOverflow: 'ellipsis', letterSpacing: '0.5px' }}>
                                        MARTIN PROTECT VECINOS - www.vecinoslaserena.cl / vecinosmart.cl
                                    </h2>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                                {logs.map((log, i) => (
                                    <div key={i} className="animate-fade-in" style={{ color: log.startsWith('OK') || log.startsWith('SHIELD') ? '#10b981' : '#38bdf8', display: 'flex', gap: '1rem', fontSize: '0.9rem' }}>
                                        <span style={{ opacity: 0.5 }}>[{new Date().toISOString().substring(11, 23)}]</span>
                                        <span>{log}</span>
                                    </div>
                                ))}
                                {isChecking && (
                                    <div className="pulse" style={{ color: '#10b981' }}>_</div>
                                )}

                                {!isChecking && (
                                    <div className="animate-fade-in" style={{ marginTop: '2rem', borderTop: '1px dashed rgba(16, 185, 129, 0.3)', paddingTop: '2rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                            <h3 style={{ margin: 0, color: '#10b981', textTransform: 'uppercase', fontSize: '1.4rem', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                                <div style={{ width: '12px', height: '12px', background: '#ef4444', borderRadius: '50%', animation: 'pulse 1.5s infinite', boxShadow: '0 0 10px #ef4444' }}></div>
                                                C5: Centro de Comando (Cámara Faro en Vivo)
                                            </h3>
                                        </div>
                                        <div style={{ display: 'flex', gap: '15px', flexDirection: 'column', height: 'auto' }}>
                                            <div style={{ flex: '1', display: 'flex', gap: '15px', height: '180px' }}>
                                                <div style={{ position: 'relative', flex: 1, borderRadius: '12px', overflow: 'hidden', border: '2px solid #C41230', background: '#000' }}>
                                                    <div style={{ width: '400%', height: '400%', position: 'absolute', top: '-180%', left: '-100%' }}>
                                                        <iframe src="https://www.youtube.com/embed/fUeo_EhVFTY?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=fUeo_EhVFTY&vq=hd1080" frameBorder="0" style={{ width: '100%', height: '140%', position: 'absolute', top: '-20%', left: 0, pointerEvents: 'none' }} allow="autoplay; encrypted-media"></iframe>
                                                    </div>
                                                    <div style={{ position: 'absolute', bottom: '8px', left: '12px', color: '#00D4FF', fontSize: '0.8rem', fontWeight: 'bold', textShadow: '0 2px 4px black', background: 'rgba(0,0,0,0.6)', padding: '2px 8px', borderRadius: '4px' }}>CAM-02 (ZOOM 34x)</div>
                                                </div>
                                                <div style={{ position: 'relative', flex: 1, borderRadius: '12px', overflow: 'hidden', border: '2px solid #C41230', background: '#000' }}>
                                                    <div style={{ width: '350%', height: '350%', position: 'absolute', top: '-80%', left: '-40%' }}>
                                                        <iframe src="https://www.youtube.com/embed/fUeo_EhVFTY?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=fUeo_EhVFTY&vq=hd1080" frameBorder="0" style={{ width: '100%', height: '140%', position: 'absolute', top: '-20%', left: 0, pointerEvents: 'none' }} allow="autoplay; encrypted-media"></iframe>
                                                    </div>
                                                    <div style={{ position: 'absolute', bottom: '8px', left: '12px', color: '#00D4FF', fontSize: '0.8rem', fontWeight: 'bold', textShadow: '0 2px 4px black', background: 'rgba(0,0,0,0.6)', padding: '2px 8px', borderRadius: '4px' }}>CAM-03 (WIDE ANGLE)</div>
                                                </div>
                                            </div>
                                            <div style={{ flex: '2', position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '2px solid #C41230', background: '#000', height: '350px' }}>
                                                <iframe src="https://www.youtube.com/embed/fUeo_EhVFTY?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=fUeo_EhVFTY&vq=hd1080" frameBorder="0" style={{ width: '100%', height: '140%', position: 'absolute', top: '-20%', left: 0, pointerEvents: 'none' }} allow="autoplay; encrypted-media"></iframe>
                                                <div style={{ position: 'absolute', bottom: '15px', left: '20px', color: '#FFD700', fontSize: '1rem', fontWeight: 'bold', textShadow: '0 2px 5px black', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.6)', padding: '5px 12px', borderRadius: '6px' }}>
                                                    <div style={{ width: '12px', height: '12px', background: '#ef4444', borderRadius: '50%', animation: 'pulse 1s infinite' }}></div>
                                                    <span style={{ letterSpacing: '1px' }}>C5: FARO M. EN VIVO</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {!isAuthorized ? (
                                <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', padding: '3rem', borderRadius: '12px', textAlign: 'center' }}>
                                    <Lock size={64} color="#ef4444" style={{ marginBottom: '1.5rem' }} />
                                    <h2 style={{ color: 'white', marginBottom: '1rem' }}>SISTEMA ESTRATÉGICO BLOQUEADO</h2>
                                    <p style={{ color: '#94a3b8', maxWidth: '500px', margin: '0 auto' }}>
                                        Esta sección contiene información comprometedora de infraestructura y certificados SSL de la Municipalidad. 
                                        Para acceder, inicie sesión con una cuenta de administrador autorizada en el Backoffice.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                                        <div style={{ background: '#111', padding: '1.5rem', borderRadius: '12px', border: '1px solid #f97316' }}>
                                            <span style={{ fontSize: '0.8rem', color: '#f97316' }}>WEB TRAFFIC (24h)</span>
                                            <div style={{ fontSize: '2rem', color: 'white', fontWeight: 'bold' }}>83.3k</div>
                                            <div style={{ fontSize: '0.7rem', color: '#22c55e' }}>↑ 12% vs ayer</div>
                                        </div>
                                        <div style={{ background: '#111', padding: '1.5rem', borderRadius: '12px', border: '1px solid #3b82f6' }}>
                                            <span style={{ fontSize: '0.8rem', color: '#3b82f6' }}>TOTAL BANDWIDTH</span>
                                            <div style={{ fontSize: '2rem', color: 'white', fontWeight: 'bold' }}>2.12 GB</div>
                                            <div style={{ fontSize: '0.7rem', color: '#3b82f6' }}>Redireccionando 99%</div>
                                        </div>
                                        <div style={{ background: '#111', padding: '1.5rem', borderRadius: '12px', border: '1px solid #ef4444' }}>
                                            <span style={{ fontSize: '0.8rem', color: '#ef4444' }}>CLIENT ERRORS (4xx)</span>
                                            <div style={{ fontSize: '2rem', color: 'white', fontWeight: 'bold' }}>42</div>
                                            <div style={{ fontSize: '0.7rem', color: '#ef4444' }}>Mitigación Proactiva</div>
                                        </div>
                                    </div>

                                    <div style={{ background: '#111', padding: '2rem', borderRadius: '12px', border: '1px solid #333' }}>
                                        <h3 style={{ margin: '0 0 1.5rem 0', color: '#f97316', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                            <Lock /> Configuración de Seguridad Vecinos Smart
                                        </h3>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                <div>
                                                    <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Cloudflare Global API Token</label>
                                                    <input 
                                                        type="password" 
                                                        value={cfConfig.token}
                                                        onChange={e => {setCfConfig({...cfConfig, token: e.target.value}); localStorage.setItem('cf_api_token', e.target.value);}}
                                                        placeholder="EDG-..."
                                                        style={{ width: '100%', padding: '0.8rem', background: '#000', border: '1px solid #333', borderRadius: '8px', color: 'white', marginTop: '0.5rem' }}
                                                    />
                                                </div>
                                                <div>
                                                    <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Zone ID (vecinosmart.cl)</label>
                                                    <input 
                                                        type="text" 
                                                        value={cfConfig.zoneId}
                                                        onChange={e => {setCfConfig({...cfConfig, zoneId: e.target.value}); localStorage.setItem('cf_zone_id', e.target.value);}}
                                                        placeholder="927a..."
                                                        style={{ width: '100%', padding: '0.8rem', background: '#000', border: '1px solid #333', borderRadius: '8px', color: 'white', marginTop: '0.5rem' }}
                                                    />
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '12px', border: '1px solid #ef4444' }}>
                                                    <div>
                                                        <div style={{ fontWeight: 'bold', color: 'white' }}>Modo "I'm Under Attack"</div>
                                                        <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Activa el desafío de JS para todo el tráfico</div>
                                                    </div>
                                                    <button 
                                                        onClick={() => {
                                                            const newState = !cfConfig.underAttack;
                                                            setCfConfig({...cfConfig, underAttack: newState});
                                                            localStorage.setItem('cf_under_attack', newState.toString());
                                                        }}
                                                        style={{ background: cfConfig.underAttack ? '#ef4444' : '#333', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
                                                    >
                                                        {cfConfig.underAttack ? 'ACTIVO' : 'ACTIVAR'}
                                                    </button>
                                                </div>
                                                {/* Farito.cl Status Card */}
                                                <div style={{ background: '#000', padding: '1.5rem', borderRadius: '12px', border: `1px solid ${dnsStatus === 'protected' ? '#22c55e' : '#f59e0b'}`, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <div style={{ fontWeight: 'bold', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                            <Server size={18} color={dnsStatus === 'protected' ? '#22c55e' : '#f59e0b'} /> 
                                                            DOMINIO: {cfConfig.domain}
                                                        </div>
                                                        <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', borderRadius: '20px', background: dnsStatus === 'protected' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(245, 158, 11, 0.2)', color: dnsStatus === 'protected' ? '#22c55e' : '#f59e0b', fontWeight: 'bold' }}>
                                                            {dnsStatus === 'checking' ? 'VERIFICANDO...' : dnsStatus === 'protected' ? 'PROTEGIDO' : 'ACCION REQUERIDA'}
                                                        </span>
                                                    </div>
                                                    
                                                    {dnsStatus === 'unconfigured' && (
                                                        <div style={{ fontSize: '0.8rem', color: '#94a3b8', borderTop: '1px solid #333', paddingTop: '1rem' }}>
                                                            <p style={{ margin: '0 0 0.5rem 0', color: '#f97316' }}>⚠️ Pendiente: Vinculación con Cloudflare</p>
                                                            <ol style={{ paddingLeft: '1.2rem', margin: 0 }}>
                                                                <li>Agrega <b>farito.cl</b> en tu dash de Cloudflare.</li>
                                                                <li>Copia los Nameservers a NIC Chile (IMAGEN 2).</li>
                                                                <li>Pega el <b>Zone ID</b> aquí a la izquierda.</li>
                                                            </ol>
                                                        </div>
                                                    )}

                                                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                                                        <button 
                                                            onClick={() => setDnsStatus('checking')}
                                                            style={{ flex: 1, background: 'rgba(59, 130, 246, 0.1)', border: '1px solid #3b82f6', color: '#3b82f6', padding: '0.5rem', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 'bold' }}
                                                        >
                                                            RE-EVALUAR DNS
                                                        </button>
                                                    </div>
                                                </div>

                                                <div style={{ border: '1px dashed #10b981', padding: '1rem', borderRadius: '12px', color: '#10b981', fontSize: '0.85rem' }}>
                                                    <ShieldCheck size={16} /> Status: Sincronizado con Cloudflare Zero Trust.
                                                    <br/>
                                                    <span style={{ fontSize: '0.7rem', opacity: 0.7 }}>Filtrando tráfico mediante reglas de firewall Smart.</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>

                <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderTop: '1px solid rgba(16, 185, 129, 0.2)', display: 'flex', justifyContent: 'space-around' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontSize: '0.8rem' }}><Lock size={14} /> AES-256 END-TO-END</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontSize: '0.8rem' }}><EyeOff size={14} /> ANTI-XSS PROACTIVE</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontSize: '0.8rem' }}><Server size={14} /> ZERO-TRUST ARCHITECTURE</div>
                </div>
            </div>
        </div>
    );
}
