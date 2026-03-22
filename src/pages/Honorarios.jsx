import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Briefcase, Landmark, History, PlusCircle, Trash2, Edit3, CheckCircle2, FileDown, ShieldAlert, FileSignature, Camera } from 'lucide-react';

const DIRECCIONES = [
    "Alcaldía", "Administración Municipal", "Secretaría Municipal", "DIDECO", "DOM",
    "SECPLAN", "Tránsito y Transporte", "Aseo y Ornato", "Medio Ambiente",
    "Turismo y Patrimonio", "Seguridad Ciudadana", "Gestión de Personas", "Dirección de Finanzas", "Dirección de Control",
    "Asesoría Jurídica"
];

const MOCK_INFORMES = [
    { id: '1001', nombre: 'JUAN ANDRES SOTO', rut: '15.123.456-7', depto: 'DIDECO', mes: 'MARZO', estado: 'Pendiente', bruto: 550000, boleta: '458' },
    { id: '1002', nombre: 'MARIA PAZ SILVA', rut: '18.987.654-3', depto: 'SECPLAN', mes: 'MARZO', estado: 'Visado Jefatura', bruto: 800000, boleta: '112' },
    { id: '1003', nombre: 'ROBERTO SANDOVAL', rut: '12.345.678-9', depto: 'Seguridad Ciudadana', mes: 'FEBRERO', estado: 'Pago Liberado', bruto: 650000, boleta: '99' }
];

export default function Honorarios() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('prestador');

    // Auth gates
    const [authJefatura, setAuthJefatura] = useState(false);
    const [authFinanzas, setAuthFinanzas] = useState(false);
    const [loginIn, setLoginIn] = useState('');

    // Form data (Prestador)
    const [formData, setFormData] = useState({
        nombres: '', apPaterno: '', apMaterno: '', rut: '',
        direccion: DIRECCIONES[0], depto: '', jornada: 'Completa',
        diasMes: 30, horasReales: 160, atrasos: 0, incum: 0, comp: 0, desc: 0,
        mes: 'MARZO', anio: 2026, montoBruto: '', boleta: ''
    });

    const [actividades, setActividades] = useState([{ desc: '', prod: '' }]);

    const handleLoginJefatura = (e) => {
        e.preventDefault();
        if (loginIn === 'jefatura') setAuthJefatura(true);
        else alert('Credenciales incorrectas');
    };

    const handleLoginFinanzas = (e) => {
        e.preventDefault();
        if (loginIn === 'finanzas') setAuthFinanzas(true);
        else alert('Credenciales incorrectas');
    };

    return (
        <div className="page-container" style={{ minHeight: '100vh', paddingTop: '80px', paddingBottom: '40px', background: '#f8fafc' }}>
            <div className="container" style={{ maxWidth: '1200px' }}>
                <button onClick={() => navigate('/legacy')} className="btn-glass animate-fade-in" style={{ padding: '0.5rem 1rem', borderRadius: '50px', marginBottom: '2rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#e2e8f0', color: '#1e293b' }}>
                    <ArrowLeft size={18} /> Volver al Portal de Administración
                </button>

                {/* Header Municipal Institucional */}
                <div className="scale-in" style={{ background: 'white', borderRadius: '16px', padding: '2rem', marginBottom: '2rem', borderTop: '8px solid #0D47A1', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <h1 style={{ color: '#0D47A1', fontWeight: 900, margin: '0 0 0.5rem 0', fontSize: '2.5rem' }}>I. MUNICIPALIDAD DE LA SERENA</h1>
                    <div style={{ background: '#F0FDF4', border: '2px solid #22C55E', padding: '0.5rem 1rem', borderRadius: '8px', color: '#166534', fontWeight: 'bold' }}>
                        ☀️ GESTIÓN DIGITAL DE HONORARIOS 2026: EFICIENCIA Y CERO PAPEL
                    </div>
                </div>

                {/* Main Nav Tabs */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                    <button onClick={() => setActiveTab('prestador')} className={`btn ${activeTab === 'prestador' ? 'btn-primary' : 'btn-glass'}`} style={{ padding: '1rem', background: activeTab === 'prestador' ? '#0D47A1' : 'white', color: activeTab === 'prestador' ? 'white' : '#0D47A1', border: '2px solid #0D47A1', fontWeight: 'bold' }}>
                        <User size={20} className="inline mr-2" /> PORTAL PRESTADOR
                    </button>
                    <button onClick={() => setActiveTab('jefatura')} className={`btn ${activeTab === 'jefatura' ? 'btn-primary' : 'btn-glass'}`} style={{ padding: '1rem', background: activeTab === 'jefatura' ? '#0D47A1' : 'white', color: activeTab === 'jefatura' ? 'white' : '#0D47A1', border: '2px solid #0D47A1', fontWeight: 'bold' }}>
                        <Briefcase size={20} className="inline mr-2" /> PORTAL JEFATURA
                    </button>
                    <button onClick={() => setActiveTab('finanzas')} className={`btn ${activeTab === 'finanzas' ? 'btn-primary' : 'btn-glass'}`} style={{ padding: '1rem', background: activeTab === 'finanzas' ? '#0D47A1' : 'white', color: activeTab === 'finanzas' ? 'white' : '#0D47A1', border: '2px solid #0D47A1', fontWeight: 'bold' }}>
                        <Landmark size={20} className="inline mr-2" /> PORTAL FINANZAS
                    </button>
                    <button onClick={() => setActiveTab('historial')} className={`btn ${activeTab === 'historial' ? 'btn-primary' : 'btn-glass'}`} style={{ padding: '1rem', background: activeTab === 'historial' ? '#0D47A1' : 'white', color: activeTab === 'historial' ? 'white' : '#0D47A1', border: '2px solid #0D47A1', fontWeight: 'bold' }}>
                        <History size={20} className="inline mr-2" /> HISTORIAL
                    </button>
                </div>

                {/* --- TAB: PRESTADOR --- */}
                {activeTab === 'prestador' && (
                    <div className="scale-in">
                        <h2 style={{ color: '#0D47A1', textAlign: 'center', marginBottom: '2rem' }}>👤 Formulario de Actividades Honorarios</h2>

                        <div style={{ background: 'white', borderRadius: '12px', padding: '2rem', border: '2px solid #0D47A1', marginBottom: '2rem', boxShadow: '0 5px 20px rgba(13,71,161,0.1)' }}>
                            <h3 style={{ color: '#0D47A1', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>1. IDENTIFICACIÓN Y UBICACIÓN</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                <div>
                                    <label style={{ color: '#0D47A1', fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Nombres</label>
                                    <input type="text" className="input-base" style={{ width: '100%', borderColor: '#cbd5e1', color: 'black' }} />
                                </div>
                                <div>
                                    <label style={{ color: '#0D47A1', fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Ap. Paterno</label>
                                    <input type="text" className="input-base" style={{ width: '100%', borderColor: '#cbd5e1', color: 'black' }} />
                                </div>
                                <div>
                                    <label style={{ color: '#0D47A1', fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>RUT</label>
                                    <input type="text" className="input-base" style={{ width: '100%', borderColor: '#cbd5e1', color: 'black' }} />
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ color: '#0D47A1', fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Dirección Municipal</label>
                                    <select className="input-base" style={{ width: '100%', borderColor: '#cbd5e1', color: 'black' }}>
                                        {DIRECCIONES.map(d => <option key={d}>{d}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label style={{ color: '#0D47A1', fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Jornada</label>
                                    <select className="input-base" style={{ width: '100%', borderColor: '#cbd5e1', color: 'black' }}>
                                        <option>Completa</option><option>Media Jornada</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div style={{ background: 'white', borderRadius: '12px', padding: '2rem', border: '2px solid #0D47A1', marginBottom: '2rem', boxShadow: '0 5px 20px rgba(13,71,161,0.1)' }}>
                            <h3 style={{ color: '#0D47A1', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>2. DETALLE DE ACTIVIDADES</h3>
                            {actividades.map((act, index) => (
                                <div key={index} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '1rem' }}>
                                    <textarea placeholder={`Descripción Actividad ${index + 1}`} className="input-base" rows="3" style={{ width: '100%', borderColor: '#cbd5e1', color: 'black' }}></textarea>
                                    <textarea placeholder={`Resultados / Productos ${index + 1}`} className="input-base" rows="3" style={{ width: '100%', borderColor: '#cbd5e1', color: 'black' }}></textarea>
                                </div>
                            ))}
                            <button onClick={() => setActividades([...actividades, { desc: '', prod: '' }])} className="btn-glass" style={{ color: '#0D47A1', borderColor: '#0D47A1', marginTop: '1rem' }}><PlusCircle size={18} className="inline mr-2" /> Agregar Nueva Fila</button>
                        </div>

                        <div style={{ background: 'white', borderRadius: '12px', padding: '2rem', border: '2px solid #0D47A1', marginBottom: '2rem', boxShadow: '0 5px 20px rgba(13,71,161,0.1)' }}>
                            <h3 style={{ color: '#0D47A1', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>3. RESPALDOS Y EVIDENCIA (FOTO)</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center' }}>
                                <div>
                                    <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>Adjunte su Boleta de Honorarios (SII) o fotos de actividades realizadas para respaldar su informe mensual.</p>
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        capture="environment" 
                                        style={{ display: 'block', width: '100%', padding: '0.8rem', border: '1px solid #cbd5e1', borderRadius: '8px', color: '#1e293b' }} 
                                    />
                                </div>
                                <div style={{ background: '#f8fafc', border: '2px dashed #cbd5e1', height: '120px', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                                    <Camera size={24} />
                                    <span style={{ fontSize: '0.8rem', marginTop: '5px' }}>Vista Previa de Documento</span>
                                </div>
                            </div>
                        </div>

                        <div style={{ background: 'white', borderRadius: '12px', padding: '2rem', border: '2px solid #0D47A1', marginBottom: '2rem', boxShadow: '0 5px 20px rgba(13,71,161,0.1)' }}>
                            <h3 style={{ color: '#0D47A1', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>4. FIRMA DIGITAL Y ENVÍO</h3>
                            <div style={{ background: '#f8fafc', border: '2px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', position: 'relative' }}>
                                <div style={{ background: '#fff', border: '1px solid #cbd5e1', height: '180px', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', cursor: 'crosshair', position: 'relative' }}>
                                    <FileSignature size={48} opacity={0.2} />
                                    <span style={{ fontSize: '0.8rem' }}>Use el mouse o panel táctil para firmar aquí</span>
                                    <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', display: 'flex', gap: '0.5rem' }}>
                                        <button className="btn-glass" style={{ fontSize: '0.7rem', color: '#64748b' }}>Limpiar</button>
                                        <span style={{ fontSize: '0.7rem', background: '#dcfce7', color: '#166534', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 'bold' }}>BIOMETRÍA VLS ACTIVA</span>
                                    </div>
                                </div>
                                <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '1rem' }}>
                                    Al firmar, usted declara bajo juramento que la información proporcionada es fiel reflejo de las actividades realizadas durante el periodo informado.
                                </p>
                            </div>
                            <button 
                                className="btn btn-primary" 
                                style={{ background: '#0D47A1', width: '100%', padding: '1.2rem', fontSize: '1.3rem', fontWeight: 'bold', marginTop: '2rem', boxShadow: '0 10px 25px rgba(13,71,161,0.3)' }}
                                onClick={() => alert("✅ Documento Firmado Digitalmente.\nEnviando copia cifrada a Jefatura SECPLAN y Control Municipal...")}
                            >
                                🚀 FIRMAR Y ENVIAR INFORME DIGITAL
                            </button>
                        </div>
                    </div>
                )}

                {/* --- TAB: JEFATURA --- */}
                {activeTab === 'jefatura' && (
                    <div className="scale-in">
                        {!authJefatura ? (
                            <div style={{ background: 'white', maxWidth: '400px', margin: '0 auto', padding: '3rem', borderRadius: '16px', border: '2px solid #0D47A1', textAlign: 'center' }}>
                                <ShieldAlert size={48} color="#0D47A1" style={{ margin: '0 auto 1rem' }} />
                                <h3 style={{ color: '#0D47A1', marginBottom: '1.5rem' }}>Portal Jefaturas (Visación)</h3>
                                <form onSubmit={handleLoginJefatura}>
                                    <input type="password" value={loginIn} onChange={e => setLoginIn(e.target.value)} placeholder="Contraseña de acceso" className="input-base" style={{ width: '100%', marginBottom: '1rem', color: 'black', borderColor: '#cbd5e1' }} />
                                    <button className="btn btn-primary" style={{ background: '#0D47A1', width: '100%' }}>Ingresar a Bandeja</button>
                                </form>
                                <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '1rem' }}>* Pista Demo: Escribe "jefatura"</p>
                            </div>
                        ) : (
                            <div>
                                <h2 style={{ color: '#0D47A1', marginBottom: '2rem' }}>📥 Bandeja de Entrada - Visación Técnica</h2>
                                <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                                    <thead style={{ background: '#0D47A1', color: 'white' }}>
                                        <tr>
                                            <th style={{ padding: '1rem', textAlign: 'left' }}>ID</th>
                                            <th style={{ padding: '1rem', textAlign: 'left' }}>Funcionario(a)</th>
                                            <th style={{ padding: '1rem', textAlign: 'left' }}>Mes Pago</th>
                                            <th style={{ padding: '1rem', textAlign: 'center' }}>Estado</th>
                                            <th style={{ padding: '1rem', textAlign: 'center' }}>Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {MOCK_INFORMES.filter(i => i.estado === 'Pendiente').map((inf) => (
                                            <tr key={inf.id} style={{ borderBottom: '1px solid #e2e8f0', color: '#1e293b' }}>
                                                <td style={{ padding: '1rem', fontWeight: 'bold' }}>#{inf.id}</td>
                                                <td style={{ padding: '1rem' }}>{inf.nombre} <br /><span style={{ fontSize: '0.8rem', color: '#64748b' }}>RUT: {inf.rut}</span></td>
                                                <td style={{ padding: '1rem', fontWeight: 'bold' }}>{inf.mes}</td>
                                                <td style={{ padding: '1rem', textAlign: 'center' }}><span style={{ background: '#fee2e2', color: '#dc2626', padding: '0.3rem 0.6rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 'bold' }}>🔴 {inf.estado}</span></td>
                                                <td style={{ padding: '1rem', textAlign: 'center' }}>
                                                    <button className="btn btn-primary" style={{ background: '#10b981', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Visar</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* --- TAB: FINANZAS --- */}
                {activeTab === 'finanzas' && (
                    <div className="scale-in">
                        {!authFinanzas ? (
                            <div style={{ background: 'white', maxWidth: '400px', margin: '0 auto', padding: '3rem', borderRadius: '16px', border: '2px solid #0D47A1', textAlign: 'center' }}>
                                <Landmark size={48} color="#0D47A1" style={{ margin: '0 auto 1rem' }} />
                                <h3 style={{ color: '#0D47A1', marginBottom: '1.5rem' }}>Portal Finanzas (Pagos)</h3>
                                <form onSubmit={handleLoginFinanzas}>
                                    <input type="password" value={loginIn} onChange={e => setLoginIn(e.target.value)} placeholder="Contraseña de acceso" className="input-base" style={{ width: '100%', marginBottom: '1rem', color: 'black', borderColor: '#cbd5e1' }} />
                                    <button className="btn btn-primary" style={{ background: '#0D47A1', width: '100%' }}>Ingresar a Caja</button>
                                </form>
                                <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '1rem' }}>* Pista Demo: Escribe "finanzas"</p>
                            </div>
                        ) : (
                            <div>
                                <h2 style={{ color: '#0D47A1', marginBottom: '2rem' }}>💸 Liquidación de Honorarios</h2>
                                <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                                    <thead style={{ background: '#0D47A1', color: 'white' }}>
                                        <tr>
                                            <th style={{ padding: '1rem', textAlign: 'left' }}>Funcionario</th>
                                            <th style={{ padding: '1rem', textAlign: 'left' }}>Boleta</th>
                                            <th style={{ padding: '1rem', textAlign: 'left' }}>Bruto / Líquido</th>
                                            <th style={{ padding: '1rem', textAlign: 'center' }}>Estado</th>
                                            <th style={{ padding: '1rem', textAlign: 'center' }}>Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {MOCK_INFORMES.filter(i => i.estado === 'Visado Jefatura').map((inf) => (
                                            <tr key={inf.id} style={{ borderBottom: '1px solid #e2e8f0', color: '#1e293b' }}>
                                                <td style={{ padding: '1rem' }}>{inf.nombre} <br /><span style={{ fontSize: '0.8rem', color: '#64748b' }}>RUT: {inf.rut}</span></td>
                                                <td style={{ padding: '1rem', fontWeight: 'bold' }}>Nº {inf.boleta}</td>
                                                <td style={{ padding: '1rem' }}>${inf.bruto.toLocaleString()} <br /><strong style={{ color: '#166534' }}>${(inf.bruto * 0.8475).toLocaleString()}</strong></td>
                                                <td style={{ padding: '1rem', textAlign: 'center' }}><span style={{ background: '#fef3c7', color: '#d97706', padding: '0.3rem 0.6rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 'bold' }}>🟡 {inf.estado}</span></td>
                                                <td style={{ padding: '1rem', textAlign: 'center' }}>
                                                    <button className="btn btn-primary" style={{ background: '#0D47A1', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Liberar Pago</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
