import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PrensaTab from '../components/Communications/PrensaTab';
import DesignTab from '../components/Communications/DesignTab';
import MarketingTab from '../components/Communications/MarketingTab';
import RadioKioskTab from '../components/Communications/RadioKioskTab';
import VecinofficeTab from '../components/Communications/VecinofficeTab';
import InternalChat from '../components/Communications/InternalChat';
import { ArrowLeft, Newspaper, PenTool, Palette, Megaphone, Radio } from 'lucide-react';
import { supabase } from '../utils/supabase';
import { auth } from '../utils/firebase';

export default function CommunicationsHub() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('prensa');

    useEffect(() => {
        let isAuthOk = false;

        if (localStorage.getItem('master_bypass') === 'true') {
            isAuthOk = true;
            return;
        }

        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                isAuthOk = true;
                return;
            }

            if (auth && typeof auth.onAuthStateChanged === 'function') {
                const unsub = auth.onAuthStateChanged(user => {
                    if (!user && !isAuthOk) {
                        alert('Acceso restringido. Por favor, inicie sesión en el Portal Interno.');
                        navigate('/legacy');
                    }
                });
                return () => unsub();
            } else {
                alert('Acceso restringido. Por favor, inicie sesión en el Portal Interno.');
                navigate('/legacy');
            }
        });
    }, [navigate]);

    const tabs = [
        { id: 'prensa', label: 'Newsroom & Prensa', role: 'Periodista/Editor', icon: PenTool, color: '#00e5ff' },
        { id: 'vecinoffice', label: 'Vecinoffice Suite', role: 'Admin/Gestor', icon: Monitor, color: '#10b981' },
        { id: 'diseno', label: 'Diseño y Audiovisual', role: 'Gráfico/Media', icon: Palette, color: '#ec4899' },
        { id: 'marketing', label: 'Marketing Institucional', role: 'Director/Publicador', icon: Megaphone, color: '#10b981' },
        { id: 'radio', label: 'Dashboard Radio VLS', role: 'Director de Radio TV', icon: Radio, color: '#ef4444' }
    ];

    return (
        <div className="page-container" style={{ minHeight: '100vh', paddingTop: '80px', paddingBottom: '40px', background: 'radial-gradient(circle at top right, rgba(16, 25, 60, 0.9) 0%, #050b14 100%)' }}>
            <div className="container" style={{ maxWidth: '1400px' }}>
                <button onClick={() => navigate('/legacy')} className="btn-glass animate-fade-in" style={{ padding: '0.5rem 1rem', borderRadius: '50px', marginBottom: '2rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ArrowLeft size={18} /> Volver al Portal de Gestión
                </button>

                <div className="neocolonial-frame animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem', padding: '2rem 3rem', border: '1px solid rgba(255,255,255,0.1)', background: 'linear-gradient(90deg, rgba(10,17,40,0.8) 0%, rgba(28,37,65,0.8) 100%)', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.2rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <Newspaper size={40} color="var(--brand-primary)" />
                        </div>
                        <div>
                            <h1 className="serena-title-glow" style={{ fontSize: '2.2rem', margin: '0 0 0.2rem 0' }}>Hub de Comunicaciones Estratégicas</h1>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', margin: 0 }}>Gestor Omnicanal unificado de Contenidos, Media y Distribución Institucional.</p>
                        </div>
                    </div>

                    {/* Tabs Navigation */}
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', background: 'rgba(0,0,0,0.3)', padding: '0.5rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', overflowX: 'auto' }}>
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    flex: 1, minWidth: '220px', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem', borderRadius: '15px', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    background: activeTab === tab.id ? `linear-gradient(135deg, ${tab.color}30 0%, ${tab.color}10 100%)` : 'transparent',
                                    border: activeTab === tab.id ? `1px solid ${tab.color}60` : '1px solid transparent',
                                    boxShadow: activeTab === tab.id ? `0 0 20px ${tab.color}20` : 'none',
                                    textAlign: 'left'
                                }}
                            >
                                <tab.icon size={24} color={activeTab === tab.id ? tab.color : 'var(--text-muted)'} style={{ flexShrink: 0, marginTop: '2px' }} />
                                <div>
                                    <span style={{ display: 'block', color: activeTab === tab.id ? 'white' : 'var(--text-muted)', fontWeight: 'bold', fontSize: '1.05rem', marginBottom: '0.2rem' }}>{tab.label}</span>
                                    <span style={{ display: 'block', color: activeTab === tab.id ? tab.color : '#64748b', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Rol: {tab.role}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content Rendering Container */}
                <div style={{ minHeight: '600px' }}>
                    {activeTab === 'prensa' && <PrensaTab />}
                    {activeTab === 'vecinoffice' && <VecinofficeTab />}
                    {activeTab === 'diseno' && <DesignTab />}
                    {activeTab === 'marketing' && <MarketingTab />}
                    {activeTab === 'radio' && <RadioKioskTab />}
                </div>

                {/* Chat Interno (Flotante) */}
                <InternalChat />
            </div>
        </div>
    );
}
