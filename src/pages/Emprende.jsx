import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, FileText, CheckCircle2, ChevronRight, Upload, Bell, ArrowLeft, HeartPulse, ShoppingCart } from 'lucide-react';

export default function Emprende() {
    const navigate = useNavigate();
    const [step, setStep] = useState('welcome'); // welcome, form, upload, success
    const [formData, setFormData] = useState({ giro: '', rubro: 'Comercial', direccion: '' });
    const [files, setFiles] = useState([]);

    const handleNext = () => {
        if (step === 'welcome') setStep('form');
        else if (step === 'form') setStep('upload');
        else if (step === 'upload') setStep('success');
    };

    return (
        <div className="page-container" style={{ padding: '2rem 1rem' }}>
            <header className="page-header" style={{ marginBottom: '2rem' }}>
                <button onClick={() => navigate('/')} className="btn-glass" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '20px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                    <ArrowLeft size={16} /> Volver al Escritorio
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <Briefcase size={32} color="#10b981" />
                    <h2 className="text-gradient" style={{ margin: 0, fontSize: '1.8rem' }}>Ventanilla Única</h2>
                </div>
                <p className="text-muted">Centro de Inversión Ágil - La Serena</p>
            </header>

            {step === 'welcome' && (
                <div className="glass-panel animate-slide-up" style={{ padding: '2.5rem 1.5rem', textAlign: 'center' }}>
                    <img src="/serenito.png" alt="Serenito Guía" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #10b981', marginBottom: '1.5rem', animation: 'float 3s ease-in-out infinite' }} />
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>Emprendimiento y Servicios Locales</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6' }}>
                        Selecciona el área que deseas consultar o tramitar:
                    </p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <button 
                            className="btn btn-primary" 
                            onClick={handleNext} 
                            style={{ width: '100%', background: '#10b981', padding: '1rem', fontSize: '1.1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Briefcase size={20}/> Inversión Ágil (Patentes)</span>
                            <ChevronRight size={20} />
                        </button>

                        <button 
                            className="btn btn-primary" 
                            onClick={() => alert('Pronto: Marketplace Vecinal (Compra y Venta)')}
                            style={{ width: '100%', background: '#ec4899', padding: '1rem', fontSize: '1.1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><ShoppingCart size={20}/> Marketplace Vecinal</span>
                            <ChevronRight size={20} />
                        </button>

                        <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', padding: '1rem', marginTop: '1rem', textAlign: 'left' }}>
                            <h4 style={{ margin: '0 0 0.5rem 0', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <HeartPulse size={20} /> Directorio de Salud en el Hogar
                            </h4>
                            <p style={{ margin: '0 0 1rem 0', color: '#e2e8f0', fontSize: '0.9rem', lineHeight: '1.4' }}>
                                Acceso directo a Profesionales de Enfermería y TENS certificados para servicios a domicilio (Curaciones, inyecciones, cuidado de adultos mayores, toma de presión).
                            </p>
                            <button 
                                className="btn-success pulse" 
                                style={{ width: '100%', background: '#ef4444', color: 'white', padding: '0.8rem', fontSize: '1rem', borderRadius: '8px', border: 'none', fontWeight: 'bold' }}
                                onClick={() => alert('Conectando con red de TENS/Enfermeras de la comuna...')}
                            >
                                Solicitar Asistencia TENS / Enfermera
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {step === 'form' && (
                <div className="glass-panel animate-slide-up" style={{ padding: '2rem 1.5rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FileText size={20} color="#10b981" /> 1. Datos del Proyecto
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Nombre Fantasía o Giro</label>
                            <input type="text" placeholder="Ej: Cafetería El Faro" value={formData.giro} onChange={e => setFormData({ ...formData, giro: e.target.value })} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', outline: 'none' }} />
                        </div>

                        <div>
                            <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Tipo de Empresa (Rubro)</label>
                            <select value={formData.rubro} onChange={e => setFormData({ ...formData, rubro: e.target.value })} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', outline: 'none', appearance: 'none' }}>
                                <option value="Comercial">Patente Comercial General</option>
                                <option value="Alcoholes">Patente de Alcoholes</option>
                                <option value="Industrial">Patente Industrial</option>
                                <option value="Profesional">Patente Profesional</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Dirección del Local</label>
                            <input type="text" placeholder="Calle y Número" value={formData.direccion} onChange={e => setFormData({ ...formData, direccion: e.target.value })} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', outline: 'none' }} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                        <button className="btn btn-glass" style={{ flex: 1 }} onClick={() => setStep('welcome')}>Volver</button>
                        <button className="btn btn-primary" style={{ flex: 2, background: '#10b981' }} onClick={handleNext} disabled={!formData.giro || !formData.direccion}>
                            Siguiente Paso
                        </button>
                    </div>
                </div>
            )}

            {step === 'upload' && (
                <div className="glass-panel animate-slide-up" style={{ padding: '2rem 1.5rem' }}>
                    <h3 style={{ marginBottom: '0.5rem', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Upload size={20} color="#10b981" /> 2. Requisitos Previos
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Según el rubro ({formData.rubro}), el sistema indica que necesitas los siguientes adjuntos para el pre-ingreso:</p>

                    <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px dashed rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
                            <div style={{ width: '40px', height: '40px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <FileText color="#10b981" size={20} />
                            </div>
                            <div>
                                <h4 style={{ margin: 0, color: 'white', fontSize: '0.95rem' }}>Contrato de Arriendo o Título</h4>
                                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.75rem' }}>PDF o Imagen clara (Max 5MB)</p>
                            </div>
                        </div>

                        <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px dashed rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
                            <div style={{ width: '40px', height: '40px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <FileText color="#10b981" size={20} />
                            </div>
                            <div>
                                <h4 style={{ margin: 0, color: 'white', fontSize: '0.95rem' }}>Certificado Servicio Salud (Opcional)</h4>
                                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.75rem' }}>Si aplica y lo tienes, agiliza el trámite.</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="btn btn-glass" style={{ flex: 1 }} onClick={() => setStep('form')}>Atrás</button>
                        <button className="btn btn-primary" style={{ flex: 2, background: '#10b981' }} onClick={handleNext}>
                            Firmar y Enviar a Pre-Revisión
                        </button>
                    </div>
                </div>
            )}

            {step === 'success' && (
                <div className="glass-panel animate-slide-up" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
                    <CheckCircle2 size={80} color="#10b981" style={{ margin: '0 auto 1.5rem', display: 'block' }} />
                    <h2 style={{ color: 'white', marginBottom: '0.5rem' }}>¡Ingreso Exitoso!</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                        Tu expediente digital N° <strong style={{ color: '#10b981' }}>EXP-2026-004</strong> ha sido creado con éxito.
                    </p>

                    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px', textAlign: 'left', marginBottom: '2rem' }}>
                        <h4 style={{ margin: '0 0 0.5rem 0', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Bell size={16} color="#eab308" /> Estado: Procesando en Paralelo</h4>
                        <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                            <li style={{ marginBottom: '0.3rem' }}>Revisión Dir. de Obras Municipales</li>
                            <li style={{ marginBottom: '0.3rem' }}>Apertura Carpeta en Rentas</li>
                            <li>Notificación Preventiva al MINSAL</li>
                        </ul>
                    </div>

                    <button className="btn btn-primary" style={{ width: '100%', background: 'rgba(255,255,255,0.1)' }} onClick={() => navigate('/')}>
                        Volver al Inicio
                    </button>
                </div>
            )}
        </div>
    );
}
