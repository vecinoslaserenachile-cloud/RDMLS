import React from 'react';

/**
 * HechoEnChile — Footer soberano para todos los portales del ecosistema.
 * Muestra el copyright institucional de La Serena de forma minimalista y limpia.
 */
export default function HechoEnChile({ dark = false }) {
    const bg = dark ? '#020617' : '#f8fafc';
    const textSecondary = dark ? '#94a3b8' : '#64748b';
    const borderColor = dark ? 'rgba(255,255,255,0.06)' : '#e2e8f0';

    return (
        <footer style={{
            background: bg,
            borderTop: `1px solid ${borderColor}`,
            padding: '1.5rem 2rem',
            textAlign: 'center',
            fontFamily: "'Outfit', 'Inter', sans-serif"
        }}>
            <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ margin: 0, fontSize: '0.85rem', color: textSecondary, fontWeight: 'bold', letterSpacing: '0.5px' }}>
                    © 2026 LA❤️SERENA — Smart Ciudad · Tecnología Municipal Autónoma
                </p>
            </div>
        </footer>
    );
}
