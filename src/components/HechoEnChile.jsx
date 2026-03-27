import React, { useState } from 'react';

/**
 * HechoEnChile — Footer soberano para todos los portales del ecosistema.
 * "Desarrollado en La Serena, Región de Coquimbo"
 * Con modal explicativo de la filosofía HOME MADE y soberanía tecnológica.
 */
export default function HechoEnChile({ dark = false }) {
    const [showModal, setShowModal] = useState(false);

    const bg = dark ? '#020617' : '#f8fafc';
    const textPrimary = dark ? '#f1f5f9' : '#0f172a';
    const textSecondary = dark ? '#94a3b8' : '#64748b';
    const borderColor = dark ? 'rgba(255,255,255,0.06)' : '#e2e8f0';

    const isPirata = (window.location.hostname.includes('pirata') || window.location.hostname.includes('comunasmart') || window.location.pathname.includes('quimbo'));
    const isRDMLS = window.location.hostname.includes('rdmls') || (window.location.hostname.includes('laserena.cl') && !window.location.hostname.includes('vecinos'));
    const isAcademy = window.location.hostname.includes('vecinosmart.cl');

    const brandName = isAcademy ? "ACADEMIA SMART" : (isPirata ? "PIRATA SMART" : (isRDMLS ? "RDMLS.CL" : "LA SERENA"));
    const slogan = isAcademy ? "Entrenamiento Elite" : (isPirata ? "Soberanía Digital Coquimbo" : (isRDMLS ? "Radio Digital Municipal" : "Hecho en"));
    const brandIcon = isAcademy ? "/images/academy_gold.png" : (isPirata ? "/images/pirata_serenito.png" : "/images/papaya_3d_flag.png");

    return (
        <>
            <footer style={{
                background: bg,
                borderTop: `1px solid ${borderColor}`,
                padding: '1.5rem 2rem',
                textAlign: 'center',
                fontFamily: "'Outfit', 'Inter', sans-serif"
            }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}>
                    
                    {/* Badge principal */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <img 
                            src={brandIcon} 
                            alt={brandName} 
                            style={{ width: '42px', height: '42px', objectFit: 'contain', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }} 
                        />
                        <span style={{
                            fontWeight: '900',
                            fontSize: '0.95rem',
                            color: textPrimary,
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase'
                        }}>
                            {slogan} <span style={{ color: isAcademy ? '#fbbf24' : (isPirata ? '#f59e0b' : (isRDMLS ? '#ef4444' : 'var(--brand-primary)')) }}>{brandName}</span>
                        </span>

                        {!isPirata && (
                            <>
                                <span style={{ color: textSecondary, fontSize: '0.85rem' }}>·</span>
                                <span style={{ color: textSecondary, fontSize: '0.85rem' }}>
                                    Desarrollado en <strong style={{ color: textPrimary }}>LA❤️SERENA</strong>, Región de Coquimbo
                                </span>
                            </>
                        )}

                        <span style={{ color: textSecondary, fontSize: '0.85rem' }}>·</span>
                        <button
                            onClick={() => setShowModal(true)}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: isPirata ? '#f59e0b' : '#3b82f6',
                                fontWeight: 'bold',
                                fontSize: '0.85rem',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                textDecoration: 'underline',
                                textDecorationStyle: 'dotted',
                                padding: 0,
                                fontFamily: 'inherit'
                            }}
                        >
                            <img src={brandIcon} style={{ width: '32px', height: '32px', objectFit: 'contain' }} alt="" /> {isPirata ? 'PIRATA SMART' : 'HOME MADE'} — ¿Qué es?
                        </button>
                    </div>

                    {/* Sub-línea */}
                    <p style={{ margin: 0, fontSize: '0.75rem', color: textSecondary, opacity: 0.7 }}>
                        © {new Date().getFullYear()} {isPirata ? 'PirataSmart.cl' : 'Vecinos LA❤️SERENA'} — Smart Ciudad · Tecnología Municipal Autónoma
                    </p>
                </div>
            </footer>

            {/* Modal explicativo */}
            {showModal && (
                <div
                    onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 999999,
                        background: 'rgba(2,6,23,0.85)', display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                        padding: '1rem', backdropFilter: 'blur(8px)'
                    }}
                >
                    <div style={{
                        background: '#0f172a',
                        border: '1px solid rgba(56,189,248,0.2)',
                        borderRadius: '32px',
                        padding: '3rem',
                        maxWidth: '600px',
                        width: '100%',
                        color: 'white',
                        fontFamily: "'Outfit', 'Inter', sans-serif",
                        position: 'relative',
                        boxShadow: '0 40px 80px rgba(0,0,0,0.8)'
                    }}>
                        <button
                            onClick={() => setShowModal(false)}
                            style={{
                                position: 'absolute', top: '1.5rem', right: '1.5rem',
                                background: 'rgba(255,255,255,0.1)', border: 'none',
                                borderRadius: '50%', width: '36px', height: '36px',
                                color: 'white', cursor: 'pointer', fontSize: '1.1rem',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}
                        >✕</button>

                        {/* Encabezado */}
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                                <img 
                                    src={brandIcon} 
                                    style={{ width: '120px', height: '120px', filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.5))' }} 
                                    alt={brandName} 
                                />
                            </div>
                            <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: '900', color: isPirata ? '#f59e0b' : '#38bdf8' }}>
                                {isPirata ? 'PIRATA SMART' : 'Soberanía HOME MADE'}
                            </h2>
                            <p style={{ margin: '0.5rem 0 0 0', color: '#94a3b8', fontSize: '0.9rem', letterSpacing: '1px' }}>
                                {isPirata ? 'Tecnología Autónoma para el Puerto' : 'Orgullo Regional de LA❤️SERENA'}
                            </p>
                        </div>

                        {/* Contenido Dinámico */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            {[
                                { icon: <img src={brandIcon} style={{ width: '32px', height: '32px', objectFit: 'contain' }} alt="" />, title: isPirata ? 'Identidad Pirata' : 'La Papaya de LA❤️SERENA', text: isPirata ? 'Nuestra tecnología se funde con la bravura del puerto y la astucia del pirata.' : 'Nuestra tecnología es como una papaya: fácil, accesible y profundamente regional. Es el fruto de nuestra tierra.' },
                                { icon: '🤝', title: 'Aporte Universal', text: 'Somos herederos de siglos de innovación: desde las revoluciones industriales hasta el CD, el MP3 y la Internet. Sumamos el esfuerzo de la humanidad para crear soberanía hoy.' },
                                { icon: '🏗️', title: '100% Desarrollo Propio', text: 'Un equipo local construyó este ecosistema desde cero, línea a línea, honrando la historia tecnológica para el futuro de nuestra gente.' },
                                { icon: '🌐', title: 'Soberanía Digital', text: 'El código pertenece a la comunidad. Diseñado para ser escalable sin depender de licencias extranjeras ni contratos ocultos.' }
                            ].map((item, i) => (
                                <div key={i} style={{
                                    display: 'flex', gap: '1rem', alignItems: 'flex-start',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                    borderRadius: '16px', padding: '1.2rem'
                                }}>
                                    <span style={{ fontSize: '1.5rem', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.icon}</span>
                                    <div>
                                        <div style={{ fontWeight: 'bold', color: '#e2e8f0', marginBottom: '0.3rem', fontSize: '1rem' }}>{item.title}</div>
                                        <div style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.6' }}>{item.text}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Tags */}
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '2rem', justifyContent: 'center' }}>
                            {['#SoberaníaDigital', '#SmartCiudad', '#CoquimboInnovación', '#HechoEnChile'].map(tag => (
                                <span key={tag} style={{
                                    background: 'rgba(56,189,248,0.1)', color: '#38bdf8',
                                    border: '1px solid rgba(56,189,248,0.2)',
                                    padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold'
                                }}>{tag}</span>
                            ))}
                        </div>

                        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                            <a
                                href={isPirata ? "https://piratasmart.cl" : "https://vecinoslaserena.cl"}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-block',
                                    background: isPirata ? 'linear-gradient(90deg, #f59e0b, #ea580c)' : 'linear-gradient(90deg, #38bdf8, #1d4ed8)',
                                    color: isPirata ? 'black' : 'white', padding: '0.8rem 2rem',
                                    borderRadius: '50px', fontWeight: 'bold',
                                    textDecoration: 'none', fontSize: '0.9rem'
                                }}
                            >
                                ⭐ {isPirata ? 'Explorar Red Pirata' : 'Conoce el Ecosistema'} →
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
