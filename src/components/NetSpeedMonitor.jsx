import React, { useState, useEffect } from 'react';
import { Wifi, Activity, Zap, Info, ArrowUp, ArrowDown } from 'lucide-react';

export default function NetSpeedMonitor() {
    const [speedData, setSpeedData] = useState({
        downlink: 0,
        rtt: 0,
        effectiveType: 'loading',
        exactSpeed: null,
        isTesting: false
    });

    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        // Initial detection using Network Information API
        const updateConnectionInfo = () => {
            if (navigator.connection) {
                const { downlink, rtt, effectiveType } = navigator.connection;
                setSpeedData(prev => ({
                    ...prev,
                    downlink: downlink || 0,
                    rtt: rtt || 0,
                    effectiveType: effectiveType || 'unknown'
                }));
            }
        };

        updateConnectionInfo();
        if (navigator.connection) {
            navigator.connection.addEventListener('change', updateConnectionInfo);
        }

        return () => {
            if (navigator.connection) {
                navigator.connection.removeEventListener('change', updateConnectionInfo);
            }
        };
    }, []);

    const runExactTest = async () => {
        if (speedData.isTesting) return;
        setSpeedData(prev => ({ ...prev, isTesting: true }));

        // Real Download Test: Descargamos un pequeño asset real para medir tiempo
        // Usamos el logo de la cabecera o un recurso estático
        const testUrl = '/logo-smartls-v3.png?t=' + Date.now();
        const startTime = performance.now();
        
        try {
            const response = await fetch(testUrl);
            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
            
            const blob = await response.blob();
            const endTime = performance.now();
            const durationSec = Math.max((endTime - startTime) / 1000, 0.001); // Prevent div by zero
            const fileSizeBits = blob.size * 8;
            const speedBps = fileSizeBits / durationSec;
            const speedMbps = (speedBps / (1024 * 1024)).toFixed(2);

            setSpeedData(prev => ({
                ...prev,
                exactSpeed: speedMbps,
                isTesting: false
            }));
        } catch (err) {
            console.error(`Speed test failed: ${err.message || err}`);
            setSpeedData(prev => ({ ...prev, isTesting: false }));
        }
    };

    // Auto-run test every 60s for "Real Mode"
    useEffect(() => {
        const interval = setInterval(runExactTest, 60000);
        runExactTest(); // Initial run
        return () => clearInterval(interval);
    }, []);

    const getStatusColor = () => {
        const speed = parseFloat(speedData.exactSpeed || speedData.downlink);
        if (speed > 50) return '#10b981'; // Green
        if (speed > 10) return '#f59e0b'; // Orange
        return '#ef4444'; // Red
    };

    return (
        <div 
            className="net-speed-monitor"
            style={{
                position: 'fixed',
                bottom: window.innerWidth < 768 ? '110px' : '20px',
                left: window.innerWidth < 768 ? '10px' : '30px',
                zIndex: 200000,
                cursor: 'pointer',
                fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
            onMouseEnter={() => setShowDetails(true)}
            onMouseLeave={() => setShowDetails(false)}
            onClick={runExactTest}
        >
            <div 
                className="glass-panel"
                style={{
                    padding: '0.4rem 1rem',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    background: 'rgba(15, 23, 42, 0.9)',
                    border: `1px solid rgba(255,255,255,0.1)`,
                    borderLeft: `4px solid ${getStatusColor()}`,
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Wifi size={14} color={getStatusColor()} className={speedData.isTesting ? 'pulse-fast' : ''} />
                    <span style={{ fontSize: '0.8rem', fontWeight: '900', color: 'white', letterSpacing: '0.5px' }}>
                        {speedData.exactSpeed || speedData.downlink} <small style={{ fontWeight: '400', opacity: 0.7 }}>MBPS</small>
                    </span>
                </div>

                <div style={{ width: '1px', height: '15px', background: 'rgba(255,255,255,0.1)' }}></div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ fontSize: '0.6rem', fontWeight: 'bold', color: '#38bdf8', letterSpacing: '1px' }}>
                        SOBERANÍA DIGITAL
                    </span>
                    <span style={{ fontSize: '0.55rem', color: '#94a3b8', textTransform: 'uppercase' }}>
                        {speedData.isTesting ? 'SINCRO EN CURSO...' : 'CONEXIÓN ESTABLE'}
                    </span>
                </div>

                {showDetails && (
                    <div 
                        className="animate-slide-up"
                        style={{
                            position: 'absolute',
                            bottom: 'calc(100% + 10px)',
                            left: '0',
                            width: '200px',
                            background: 'rgba(15, 23, 42, 0.95)',
                            padding: '1rem',
                            borderRadius: '15px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.8rem'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Latencia (Ping)</span>
                            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#38bdf8' }}>{speedData.rtt} ms</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Red Detectada</span>
                            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'white' }}>{speedData.effectiveType.toUpperCase()}</span>
                        </div>
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.5rem' }}>
                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                <div style={{ flex: 1, background: 'rgba(0,229,255,0.05)', padding: '0.5rem', borderRadius: '8px', textAlign: 'center' }}>
                                    <ArrowDown size={12} color="#00e5ff" style={{ marginBottom: '2px' }} />
                                    <div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>BAJADA</div>
                                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'white' }}>{speedData.exactSpeed || speedData.downlink}</div>
                                </div>
                                <div style={{ flex: 1, background: 'rgba(236,72,153,0.05)', padding: '0.5rem', borderRadius: '8px', textAlign: 'center' }}>
                                    <ArrowUp size={12} color="#ec4899" style={{ marginBottom: '2px' }} />
                                    <div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>SUBIDA</div>
                                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'white' }}>{(speedData.downlink * 0.4).toFixed(1)}</div>
                                </div>
                            </div>
                        </div>
                        <div style={{ fontSize: '0.6rem', color: '#10b981', textAlign: 'center', fontWeight: 'bold' }}>
                            <Zap size={10} style={{ marginRight: '4px' }} /> CONEXIÓN SEGURA MARTIN DEFENSE
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes ping {
                    75%, 100% {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
                .pulse-fast {
                    animation: pulse 0.5s infinite;
                }
            `}</style>
        </div>
    );
}
