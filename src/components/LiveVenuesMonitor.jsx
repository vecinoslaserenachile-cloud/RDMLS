import React, { useState } from 'react';
import { Building, ShieldAlert, CheckCircle2, QrCode, X, DoorOpen } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export const INFRAESTRUCTURA_IMLS = [
    { id: "EC-01", nombre: "Edificio Consistorial", dotacion: true, icono: "🏛️", active: 12, waiting: 3 },
    { id: "EC-02", nombre: "Edificio Carrera (Prat)", dotacion: true, icono: "🏢", active: 8, waiting: 5 },
    { id: "EB-03", nombre: "Edificio Balmaceda", dotacion: true, icono: "🏫", active: 15, waiting: 2 },
    { id: "DT-04", nombre: "Dirección de Tránsito", dotacion: true, icono: "🚦", active: 45, waiting: 18 },
    { id: "DI-05", nombre: "DIDECO (Social)", dotacion: true, icono: "🤝", active: 22, waiting: 10 },
    { id: "DLC-06", nombre: "Delegación Compañías", dotacion: true, icono: "🏘️", active: 14, waiting: 4 },
    { id: "DLP-08", nombre: "Delegación La Pampa", dotacion: false, icono: "🌳", active: 6, waiting: 1 },
    { id: "DAM-09", nombre: "Delegación Av. del Mar", dotacion: true, icono: "🏖️", active: 4, waiting: 0 },
    { id: "CM-11", nombre: "Coliseo Monumental", dotacion: true, icono: "🏀", active: 50, waiting: 12 },
    { id: "JPL-14", nombre: "Juzgado Policía Local", dotacion: true, icono: "⚖️", active: 28, waiting: 15 },
    { id: "ELP-17", nombre: "Estadio La Portada", dotacion: true, icono: "⚽", active: 5, waiting: 0 },
    { id: "CSI-16", nombre: "Centro Cultural Sta Inés", dotacion: false, icono: "🎨", active: 10, waiting: 2 }
];

export default function LiveVenuesMonitor({ detailed = false, showPrintQR = false }) {
    const [selectedQR, setSelectedQR] = useState(null);

    const totalActive = INFRAESTRUCTURA_IMLS.reduce((acc, curr) => acc + curr.active, 0);
    const totalWaiting = INFRAESTRUCTURA_IMLS.reduce((acc, curr) => acc + curr.waiting, 0);

    return (
        <div className="scale-in" style={{ width: '100%' }}>
            {detailed && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                    <div className="glass-panel" style={{ background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(0,0,0,0.5))', border: '1px solid rgba(239, 68, 68, 0.4)', textAlign: 'center', padding: '2rem' }}>
                        <h3 style={{ color: '#fca5a5', margin: '0 0 1rem 0', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            <ShieldAlert size={20} /> EN ESPERA (FILAS VIRTUALES)
                        </h3>
                        <div style={{ fontSize: '4rem', fontWeight: 'bold', color: 'white', textShadow: '0 0 20px rgba(239,68,68,0.5)' }}>{totalWaiting}</div>
                    </div>
                    <div className="glass-panel" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(0,0,0,0.5))', border: '1px solid rgba(16, 185, 129, 0.4)', textAlign: 'center', padding: '2rem' }}>
                        <h3 style={{ color: '#6ee7b7', margin: '0 0 1rem 0', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            <CheckCircle2 size={20} /> DENTRO DE RECINTOS (VIVO)
                        </h3>
                        <div style={{ fontSize: '4rem', fontWeight: 'bold', color: 'white', textShadow: '0 0 20px rgba(16,185,129,0.5)' }}>{totalActive}</div>
                    </div>
                </div>
            )}

            <div style={{
                display: 'grid',
                gridTemplateColumns: detailed ? 'repeat(auto-fill, minmax(280px, 1fr))' : 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: '1.5rem'
            }}>
                {INFRAESTRUCTURA_IMLS.map((inf, i) => {
                    const statusColor = inf.waiting > 10 ? '#ef4444' : inf.waiting > 4 ? '#f59e0b' : '#3b82f6';
                    return (
                        <div key={inf.id} className="glass-panel" style={{
                            padding: detailed ? '1.5rem' : '1rem',
                            borderTop: `4px solid ${statusColor}`,
                            background: 'rgba(0,0,0,0.4)',
                            transition: 'all 0.3s ease',
                            border: '1px solid rgba(255,255,255,0.05)',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <h4 style={{ color: 'white', margin: '0 0 1rem 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: detailed ? '1.1rem' : '0.9rem' }}>
                                {inf.icono} {inf.nombre}
                            </h4>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flex: 1 }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: detailed ? '2rem' : '1.5rem', fontWeight: 'bold', color: statusColor, lineHeight: '1' }}>{inf.waiting}</div>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 'bold' }}>ESPERA</span>
                                </div>
                                <div style={{ height: '30px', width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: detailed ? '2rem' : '1.5rem', fontWeight: 'bold', color: '#10b981', lineHeight: '1' }}>{inf.active}</div>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 'bold' }}>DENTRO</span>
                                </div>
                            </div>

                            {showPrintQR && (
                                <button onClick={() => setSelectedQR(inf)} className="btn-glass" style={{ width: '100%', marginTop: '1.2rem', padding: '0.6rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', borderColor: '#ec4899', color: '#ec4899', textTransform: 'uppercase', fontWeight: 'bold' }}>
                                    <QrCode size={16} /> Imprimir QR Acceso
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* MODAL QR Y TARJETA DIGITAL POR RECINTO */}
            {selectedQR && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 100000, background: 'rgba(0,0,0,0.85)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
                    backdropFilter: 'blur(5px)'
                }}>
                    <div className="glass-panel animate-scale-in" style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '430px',
                        background: 'linear-gradient(135deg, rgba(16, 25, 60, 0.95) 0%, rgba(5, 11, 20, 0.98) 100%)',
                        border: '1px solid var(--brand-primary)',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        boxShadow: '0 20px 50px rgba(0, 229, 255, 0.2)'
                    }}>
                        <button
                            onClick={() => setSelectedQR(null)}
                            style={{
                                position: 'absolute', top: '15px', right: '15px', zIndex: 10,
                                background: 'rgba(239, 68, 68, 0.8)', color: 'white', border: 'none',
                                borderRadius: '50%', width: '36px', height: '36px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                            }}
                        >
                            <X size={20} />
                        </button>

                        {/* Banner Superior */}
                        <div style={{
                            height: '160px',
                            background: 'url(/mapa.jpg) center/cover',
                            position: 'relative'
                        }}>
                            <div style={{
                                position: 'absolute', inset: 0,
                                background: 'linear-gradient(to bottom, transparent 0%, rgba(5, 11, 20, 1) 100%)'
                            }}></div>

                            <img src="/serenito.png" alt="Serenito" style={{
                                position: 'absolute', bottom: '-10px', left: '20px', height: '120px',
                                filter: 'drop-shadow(0 0 10px rgba(0,229,255,0.5))', zIndex: 2
                            }} />

                            <img src="/escudo.png" alt="IMLS" style={{
                                position: 'absolute', top: '15px', left: '20px', height: '50px',
                                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))'
                            }} />
                        </div>

                        <div style={{ padding: '0 2rem 2rem 2rem', textAlign: 'center', position: 'relative', zIndex: 3 }}>
                            <h2 style={{ fontSize: '1.4rem', color: 'white', margin: '0 0 0.5rem 0', textShadow: '0 2px 4px rgba(0,0,0,0.5)', textTransform: 'uppercase' }}>
                                Puerta Serena
                            </h2>
                            <p style={{ color: 'var(--brand-primary)', margin: '0 0 0.5rem 0', fontWeight: 'bold', fontSize: '1.1rem' }}>
                                Acceso: {selectedQR.icono} {selectedQR.nombre}
                            </p>

                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                                Escanea para validar y registrar tu ingreso
                            </p>

                            <div style={{
                                background: 'white', padding: '15px', borderRadius: '16px', display: 'inline-block',
                                boxShadow: '0 10px 30px rgba(255,255,255,0.1)'
                            }}>
                                <QRCodeSVG value={`${window.location.origin}/puerta-serena?recinto=${encodeURIComponent(selectedQR.id)}`} size={200} level="H" includeMargin={true} />
                            </div>

                            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '1.5rem', lineHeight: '1.4' }}>
                                Pegar este código QR en la entrada o recepción del recinto. Al escanearlo, el ciudadano iniciará su proceso de autorización de ingreso de forma autónoma.
                            </p>

                            <button onClick={() => window.print()} className="btn btn-primary" style={{ marginTop: '1.5rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <DoorOpen size={18} /> IMPRIMIR TARJETA QR
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
