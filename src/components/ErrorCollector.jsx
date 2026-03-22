import React, { useState, useEffect, useRef } from 'react';

export default function ErrorCollector() {
    const [errors, setErrors] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const IGNORED_ERRORS = [
            'THREE.GLTFLoader',
            'Couldn\'t load texture',
            'Autoplay blocked',
            'Play prevented',
            'Warning:',
            'DevTools',
            'chrome-extension',
            'blob:',
            'Speed test failed',
            'Error fetching real weather'
        ];

        const addError = (msg, source, lineno, colno, errorObj) => {
            const entryStr = String(msg || '');
            if (IGNORED_ERRORS.some(black => entryStr.includes(black))) return false;

            const entry = {
                id: Date.now() + Math.random(),
                time: new Date().toLocaleTimeString('es-CL'),
                message: msg || 'Error desconocido',
                source: source ? source.split('/').pop() : 'desconocido',
                line: lineno || 0,
                col: colno || 0,
                stack: errorObj?.stack || ''
            };
            const now = Date.now();
            if (window._vls_last_error_time && now - window._vls_last_error_time < 500) {
                // Avoid infinite loops if render fails repeatedly
                return false;
            }
            window._vls_last_error_time = now;

            setErrors(prev => [entry, ...prev].slice(0, 50));
            // Auto-abrir panel si hay error real
            setIsOpen(true);
            return false;
        };

        const handleError = (event) => {
            addError(event.message, event.filename, event.lineno, event.colno, event.error);
        };

        const handleUnhandledRejection = (event) => {
            const msg = event.reason?.message || String(event.reason) || 'Promise rechazada';
            if (IGNORED_ERRORS.some(black => String(msg).includes(black))) return;
            addError(msg, 'Promise', 0, 0, event.reason);
        };

        window.addEventListener('error', handleError);
        window.addEventListener('unhandledrejection', handleUnhandledRejection);

        // Parchar console.error también
        const origConsoleError = console.error;
        console.error = (...args) => {
            const msg = args.map(a => {
                if (a instanceof Error) return a.message || a.toString();
                if (typeof a === 'object') {
                    try { return JSON.stringify(a); } catch(e) { return '[Circular Object]'; }
                }
                return String(a);
            }).join(' ');
            
            if (msg && !IGNORED_ERRORS.some(black => msg.includes(black))) {
                setErrors(prev => [{
                    id: Date.now() + Math.random(),
                    time: new Date().toLocaleTimeString('es-CL'),
                    message: msg.substring(0, 300),
                    source: 'console.error',
                    line: 0, col: 0, stack: args.find(a => a instanceof Error)?.stack || ''
                }, ...prev].slice(0, 50));
                setIsOpen(true);
            }
            origConsoleError.apply(console, args);
        };

        return () => {
            window.removeEventListener('error', handleError);
            window.removeEventListener('unhandledrejection', handleUnhandledRejection);
            console.error = origConsoleError;
        };
    }, []);

    const copyAll = () => {
        const text = errors.map(e =>
            `[${e.time}] ${e.message}\n  Archivo: ${e.source} L${e.line}:${e.col}\n  ${e.stack.split('\n')[0] || ''}`
        ).join('\n\n---\n\n');
        navigator.clipboard.writeText(text).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    const errorCount = errors.length;
    const hasErrors = errorCount > 0;

    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 999999,
            fontFamily: 'monospace',
            fontSize: '12px'
        }}>
            {/* Barra de toggle */}
            <div
                onClick={() => setIsOpen(o => !o)}
                style={{
                    background: hasErrors ? 'rgba(239,68,68,0.95)' : 'rgba(15,23,42,0.90)',
                    borderTop: `1px solid ${hasErrors ? '#ef4444' : '#1e293b'}`,
                    padding: '4px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    backdropFilter: 'blur(10px)',
                    justifyContent: 'space-between'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '10px' }}>{isOpen ? '▼' : '▲'}</span>
                    <span style={{ color: hasErrors ? 'white' : '#64748b', fontWeight: 'bold', letterSpacing: '1px' }}>
                        {hasErrors
                            ? `⚠ VLS ERROR LOG — ${errorCount} error${errorCount !== 1 ? 'es' : ''} detectado${errorCount !== 1 ? 's' : ''}`
                            : '✓ VLS ERROR LOG — Sin errores'}
                    </span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {hasErrors && (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); copyAll(); }}
                                style={{
                                    background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)',
                                    color: 'white', padding: '2px 10px', borderRadius: '4px', cursor: 'pointer',
                                    fontSize: '11px', fontWeight: 'bold'
                                }}
                            >
                                {isCopied ? '✓ COPIADO' : '📋 COPIAR TODO'}
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); setErrors([]); }}
                                style={{
                                    background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.2)',
                                    color: 'white', padding: '2px 10px', borderRadius: '4px', cursor: 'pointer',
                                    fontSize: '11px'
                                }}
                            >
                                🗑 LIMPIAR
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Panel expandido */}
            {isOpen && (
                <div
                    ref={containerRef}
                    style={{
                        background: 'rgba(2,6,23,0.97)',
                        borderTop: '1px solid #1e293b',
                        maxHeight: '220px',
                        overflowY: 'auto',
                        padding: hasErrors ? '0' : '12px 16px'
                    }}
                >
                    {!hasErrors ? (
                        <div style={{ color: '#10b981', padding: '8px 0' }}>
                            ✓ No se han detectado errores JavaScript en esta sesión.
                        </div>
                    ) : (
                        errors.map((err, i) => (
                            <div
                                key={err.id}
                                style={{
                                    padding: '6px 12px',
                                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                                    background: i % 2 === 0 ? 'rgba(239,68,68,0.05)' : 'transparent'
                                }}
                            >
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                    <span style={{ color: '#64748b', flexShrink: 0 }}>[{err.time}]</span>
                                    <span style={{ color: '#f87171', wordBreak: 'break-all', flex: 1 }}>
                                        {err.message}
                                    </span>
                                    <span style={{ color: '#475569', flexShrink: 0, fontSize: '10px' }}>
                                        {err.source}:{err.line}
                                    </span>
                                </div>
                                {err.stack && err.stack.split('\n').slice(1, 3).map((line, si) => (
                                    <div key={si} style={{ color: '#475569', paddingLeft: '70px', fontSize: '10px' }}>
                                        {line.trim().substring(0, 120)}
                                    </div>
                                ))}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
