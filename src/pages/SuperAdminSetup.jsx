import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Save, MapPin, Palette, FileImage, ShieldCheck, Power, RefreshCw } from 'lucide-react';

export default function SuperAdminSetup() {
    const navigate = useNavigate();

    const [profiles] = useState([
        { id: 'laserena', name: 'La Serena (Oficial)', org: 'La Serena', color: '#38bdf8', logo: '/escudo.png' },
        { id: 'valparaiso', name: 'Valparaíso', org: 'Valparaíso', color: '#10b981', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Escudo_de_Valpara%C3%ADso.svg/150px-Escudo_de_Valpara%C3%ADso.svg.png' },
        { id: 'santiago', name: 'Santiago', org: 'Santiago', color: '#ef4444', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Escudo_de_Santiago_de_Chile.svg/150px-Escudo_de_Santiago_de_Chile.svg.png' },
        { id: 'puentealto', name: 'Puente Alto', org: 'Puente Alto', color: '#f59e0b', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Escudo_de_Puente_Alto.svg/150px-Escudo_de_Puente_Alto.svg.png' },
        { id: 'custom', name: 'Personalizado', org: 'Mi Ciudad', color: '#8b5cf6', logo: 'URL_AQUI' }
    ]);

    const [selectedProfile, setSelectedProfile] = useState(profiles[0]);
    const [customVals, setCustomVals] = useState(profiles[0]);

    useEffect(() => {
        const storedOrg = localStorage.getItem('smart_brand_org');
        if (storedOrg) {
            setCustomVals({
                org: storedOrg,
                color: localStorage.getItem('smart_brand_color') || '#38bdf8',
                logo: localStorage.getItem('smart_brand_logo') || '/escudo.png'
            });
            setSelectedProfile({ id: 'custom' });
        }
    }, []);

    const handleProfileClick = (p) => {
        setSelectedProfile(p);
        if (p.id !== 'custom') {
            setCustomVals({ org: p.org, color: p.color, logo: p.logo });
        }
    };

    const handleSave = () => {
        if (selectedProfile.id === 'laserena') {
            localStorage.removeItem('smart_brand_org');
            localStorage.removeItem('smart_brand_color');
            localStorage.removeItem('smart_brand_logo');
            localStorage.setItem('smart_tenant', 'laserena');
        } else {
            localStorage.setItem('smart_tenant', 'custom');
            localStorage.setItem('smart_brand_org', customVals.org);
            localStorage.setItem('smart_brand_color', customVals.color);
            localStorage.setItem('smart_brand_logo', customVals.logo);
        }

        alert(`¡Entorno Smart reconfigurado exitosamente a ${customVals.org}! Redirigiendo a pantalla principal...`);
        navigate('/');
        window.location.reload(); // Force full reload to apply CSS vars globally
    };

    return (
        <div style={{ minHeight: '100vh', padding: '3rem', background: '#020617', color: 'white' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid #334155', paddingBottom: '1rem' }}>
                    <ShieldCheck size={40} color="#f59e0b" />
                    <div>
                        <h1 style={{ margin: 0, color: '#f59e0b' }}>PANEL SUPER ADMIN OCULTO</h1>
                        <p style={{ margin: 0, color: '#94a3b8' }}>Configuración global de entorno y variables maestras para presentaciones en vivo.</p>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem' }}>
                    {/* Perfiles Rápidos */}
                    <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px', background: 'rgba(15, 23, 42, 0.8)' }}>
                        <h3 style={{ marginTop: 0, color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><RefreshCw size={18} /> Perfiles Rápidos</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            {profiles.map(p => (
                                <button
                                    key={p.id}
                                    onClick={() => handleProfileClick(p)}
                                    style={{
                                        padding: '1rem', background: selectedProfile.id === p.id ? 'rgba(56, 189, 248, 0.2)' : 'rgba(0,0,0,0.4)',
                                        border: `1px solid ${selectedProfile.id === p.id ? '#38bdf8' : '#334155'}`,
                                        borderRadius: '8px', color: 'white', cursor: 'pointer', textAlign: 'left',
                                        display: 'flex', alignItems: 'center', gap: '1rem'
                                    }}
                                >
                                    <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: p.color }}></div>
                                    {p.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Editor Manual */}
                    <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px', background: 'rgba(15, 23, 42, 0.8)' }}>
                        <h3 style={{ marginTop: 0, color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                            <Settings size={20} /> Variables del Entorno
                        </h3>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1', marginBottom: '0.5rem' }}><MapPin size={16} /> Nombre Municipio / Institución</label>
                            <input
                                type="text"
                                value={customVals.org}
                                onChange={e => { setCustomVals({ ...customVals, org: e.target.value }); setSelectedProfile({ id: 'custom' }); }}
                                style={{ width: '100%', padding: '1rem', background: 'rgba(0,0,0,0.5)', border: '1px solid #475569', borderRadius: '8px', color: 'white', fontSize: '1.1rem' }}
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1', marginBottom: '0.5rem' }}><Palette size={16} /> Color Identidad (HEX)</label>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <input
                                    type="color"
                                    value={customVals.color}
                                    onChange={e => { setCustomVals({ ...customVals, color: e.target.value }); setSelectedProfile({ id: 'custom' }); }}
                                    style={{ width: '50px', height: '50px', padding: '0', border: 'none', background: 'transparent', cursor: 'pointer' }}
                                />
                                <input
                                    type="text"
                                    value={customVals.color}
                                    onChange={e => { setCustomVals({ ...customVals, color: e.target.value }); setSelectedProfile({ id: 'custom' }); }}
                                    style={{ flex: 1, padding: '1rem', background: 'rgba(0,0,0,0.5)', border: '1px solid #475569', borderRadius: '8px', color: 'white', fontSize: '1.1rem' }}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '2.5rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1', marginBottom: '0.5rem' }}><FileImage size={16} /> Logotipo Institucional (URL)</label>
                            <input
                                type="text"
                                value={customVals.logo}
                                onChange={e => { setCustomVals({ ...customVals, logo: e.target.value }); setSelectedProfile({ id: 'custom' }); }}
                                style={{ width: '100%', padding: '1rem', background: 'rgba(0,0,0,0.5)', border: '1px solid #475569', borderRadius: '8px', color: 'white', fontSize: '1.1rem' }}
                            />
                            {customVals.logo && (
                                <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', textAlign: 'center' }}>
                                    <p style={{ margin: '0 0 1rem 0', color: '#94a3b8', fontSize: '0.8rem' }}>Previsualización del Logo:</p>
                                    <img src={customVals.logo} alt="Preview" style={{ maxHeight: '80px', maxWidth: '100%', objectFit: 'contain' }} />
                                </div>
                            )}
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button className="btn-success pulse" onClick={handleSave} style={{ flex: 1, padding: '1.2rem', borderRadius: '8px', background: '#f59e0b', color: 'black', fontWeight: 'bold', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <Power size={20} /> FORZAR INYECCIÓN EN SISTEMA
                            </button>
                            <button className="btn-glass" onClick={() => navigate(-1)} style={{ padding: '1.2rem 2rem', borderRadius: '8px' }}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
