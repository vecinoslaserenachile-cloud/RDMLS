import React, { useState, useEffect } from 'react';
import { Ticket, StopCircle, UserCheck } from 'lucide-react';

export default function TokenEconomyMaster() {
    const [tokens, setTokens] = useState(() => {
        const t = localStorage.getItem('vls_tokens');
        return t ? parseInt(t) : 0;
    });
    const [showNoBalance, setShowNoBalance] = useState(false);

    useEffect(() => {
        const handleGrant = (e) => {
            if (!localStorage.getItem('vls_welcome_bonus')) {
                const newB = tokens + 50;
                setTokens(newB);
                localStorage.setItem('vls_tokens', newB);
                localStorage.setItem('vls_welcome_bonus', 'true');
                alert("🎁 Bono Smart Ciudadano: 50 Fichas han sido cargadas a tu credencial por validar tu identidad.");
                window.dispatchEvent(new CustomEvent('tokens-updated', { detail: newB }));
            }
        };

        const handleCharge = (e) => {
            const cost = e.detail?.cost || 1;
            let current = parseInt(localStorage.getItem('vls_tokens') || '0');
            
            if (current >= cost) {
                current -= cost;
                setTokens(current);
                localStorage.setItem('vls_tokens', current);
                window.dispatchEvent(new CustomEvent('tokens-updated', { detail: current }));
                // Permite la acción real que lo solicitó
                if (e.detail?.onSuccess) e.detail.onSuccess();
            } else {
                setShowNoBalance(true);
                if (e.detail?.onFail) e.detail.onFail();
            }
        };

        window.addEventListener('grant-welcome-tokens', handleGrant);
        window.addEventListener('charge-vls-token', handleCharge);
        return () => {
            window.removeEventListener('grant-welcome-tokens', handleGrant);
            window.removeEventListener('charge-vls-token', handleCharge);
        };
    }, [tokens]);

    if (!showNoBalance) return null;

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 999999, background: 'rgba(5,5,20,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(15px)' }}>
            <div className="glass-panel" style={{ maxWidth: '500px', width: '100%', padding: '3rem', textAlign: 'center', border: '2px solid #ef4444', borderRadius: '32px', background: '#020617', boxShadow: '0 0 50px rgba(239,68,68,0.4)', color: 'white' }}>
                <StopCircle size={70} color="#ef4444" style={{ marginBottom: '1.5rem', animation: 'pulse 1s infinite' }} />
                <h2 style={{ fontSize: '2.2rem', color: 'white', margin: '0 0 1rem 0' }}>SALDO INSUFICIENTE</h2>
                <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '2rem' }}>
                    Tu billetera cívica tiene <strong>0 Fichas</strong>. No puedes iniciar este módulo ni costear esta acción virtual.
                </p>
                <div style={{ background: 'rgba(239,68,68,0.2)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', border: '1px solid #ef4444' }}>
                    <span style={{ color: '#fca5a5', fontWeight: 'bold' }}>Sugerencia del Asistente Farito:</span><br/>
                    Completa encuestas del <i>Termómetro Vecinal</i> o rutinas en el <i>Gimnasio Biomecánico</i> para recargar tu saldo gratuitamente.
                </div>
                <button onClick={() => setShowNoBalance(false)} style={{ padding: '1rem 2rem', background: '#ef4444', color: 'white', fontWeight: 'bold', fontSize: '1.1rem', border: 'none', borderRadius: '50px', cursor: 'pointer', width: '100%' }}>
                    Entendido. Buscar Recompensas
                </button>
            </div>
            <style>{`
                @keyframes pulse {
                    0% { transform: scale(1); filter: brightness(1); }
                    50% { transform: scale(1.1); filter: brightness(1.5); }
                    100% { transform: scale(1); filter: brightness(1); }
                }
            `}</style>
        </div>
    );
}
