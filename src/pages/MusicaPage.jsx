import React, { useEffect } from 'react';
import { Music, Tv, PlayCircle, Headphones, Radio, Gamepad2, MonitorPlay, Speaker, Newspaper, Plane, Brain, Cloud, Video, Monitor, Layers, Wind } from 'lucide-react';
import MusicRanking from '../components/MusicRanking';
import RadioPlayer from '../components/RadioPlayer';
import VlsDjMixer from '../components/VlsDjMixer';

export default function MusicaPage() {
    useEffect(() => {
        // La radio se auto-iniciará cuando el usuario haga su primer click real en la página
        // para cumplir con las políticas de autoplay de los navegadores.
    }, []);

    const AUDIO_TOOLS = [
        { title: "Cadena de Audio", subtitle: "Reel to Reel MasterEngine", icon: Speaker, action: () => window.dispatchEvent(new CustomEvent('open-reeltoreel')), color: "from-gray-700 to-gray-900" },
        { title: "Personal Stereo", subtitle: "Tu Cassette portátil VLS", icon: Headphones, action: () => window.dispatchEvent(new CustomEvent('open-personal-stereo')), color: "from-yellow-500 to-orange-500" },
        { title: "Estudio Multimedia", subtitle: "Switcher L8 Yolo VLS Live", icon: Video, action: () => window.dispatchEvent(new CustomEvent('open-broadcaster')), color: "from-red-600 to-pink-800" },
    ];

    const VISUAL_GAMES = [
        { title: "Reproductor Audiovisual", subtitle: "Videos y TV del Recuerdo", icon: Tv, action: () => window.dispatchEvent(new CustomEvent('open-vertical-tv')), color: "from-red-600 to-orange-600" },
        { title: "Cine VHS Teatro", subtitle: "Clásicos en cassette visual", icon: PlayCircle, action: () => window.dispatchEvent(new CustomEvent('open-vhs-tv')), color: "from-indigo-600 to-purple-800" },
        { title: "Arcade Comunal", subtitle: "Fichas gratis. ¡A jugar!", icon: Gamepad2, action: () => window.dispatchEvent(new CustomEvent('open-game')), color: "from-pink-600 to-purple-600" },
        { title: "La Pieza del Atari", subtitle: "Consolas Clásicas", icon: MonitorPlay, action: () => window.dispatchEvent(new CustomEvent('open-retro-room')), color: "from-green-600 to-emerald-800" },
    ];

    const UTILITIES = [
        { title: "Aeropuerto y Puerto", subtitle: "Tráfico SERENAMET Live", icon: Plane, action: () => window.dispatchEvent(new CustomEvent('open-airport')), color: "from-cyan-600 to-blue-800" },
        { title: "Kiosko de Noticias", subtitle: "Diarios VLS en tiempo real", icon: Newspaper, action: () => window.dispatchEvent(new CustomEvent('open-kiosko-diarios')), color: "from-gray-600 to-slate-800" },
        { title: "Pensamiento Lateral", subtitle: "Sombreros de Bono VLS", icon: Brain, action: () => window.dispatchEvent(new CustomEvent('open-debono-hats')), color: "from-yellow-600 to-orange-600" }
    ];

    const Card = ({ card }) => {
        const Icon = card.icon;
        return (
            <div 
                onClick={card.action}
                className="glass-panel"
                style={{
                    borderRadius: '24px', padding: '2rem', cursor: 'pointer', border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem', position: 'relative', overflow: 'hidden'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)'; e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.5)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}
            >
                <div style={{ position: 'absolute', inset: 0, opacity: 0.15, background: `linear-gradient(135deg, var(--tw-gradient-stops))` }} className={card.color} />
                <div style={{ background: '#ef4444', padding: '1rem', borderRadius: '16px', zIndex: 1 }}><Icon size={32} color="white" /></div>
                <div style={{ zIndex: 1 }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0 0 0.5rem 0', color: 'white' }}>{card.title}</h3>
                    <p style={{ color: '#cbd5e1', margin: 0, fontSize: '0.95rem' }}>{card.subtitle}</p>
                </div>
            </div>
        );
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #020617 0%, #0f172a 100%)',
            padding: '2rem',
            paddingTop: '6rem',
            fontFamily: "'Inter', sans-serif",
            color: 'white'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <div style={{
                        padding: '1rem',
                        background: 'rgba(239, 68, 68, 0.2)',
                        borderRadius: '20px',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(239, 68, 68, 0.5)'
                    }}>
                        <Radio size={40} color="#ef4444" />
                    </div>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', margin: 0, fontWeight: '900', letterSpacing: '-1px', color: '#f8fafc' }}>
                            Música & Entretenimiento
                        </h1>
                        <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginTop: '0.5rem' }}>
                            Conectando sensaciones. Un espacio unificado para la cultura musical, visual y retro gaming de nuestra comuna.
                        </p>
                    </div>
                </div>
                
                {/* CONTROLES INCORPORADOS: RANKING, RADIO Y DENON MIXER PRO */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', marginBottom: '6rem' }}>
                    
                    {/* SECCIÓN 1: MIXING Y RANKING CIUDADANO */}
                    <div>
                        <MusicRanking />
                    </div>

                    <div id="dj-mixer-section">
                        <VlsDjMixer />
                    </div>
                    
                    {/* SECCIÓN 2: RADIO MUNICIPAL */}
                    <div className="glass-panel" style={{ padding: '2rem', borderRadius: '24px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(56,189,248,0.2)' }}>
                        <h2 style={{ color: '#38bdf8', marginTop: 0, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                            <Radio size={24} /> CONSOLA RADIO VLS MUNICIPAL
                        </h2>
                        <RadioPlayer />
                    </div>
                </div>

                {/* GRILLAS CATEGORIZADAS */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                    
                    {/* Audio Tools Grid */}
                    <section>
                        <h2 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Headphones size={20} color="#ef4444" /> AUDIO & PRODUCCIÓN VECINAL
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                            {AUDIO_TOOLS.map((c, i) => <Card key={i} card={c} />)}
                        </div>
                    </section>

                    {/* Visuals & Games Grid */}
                    <section>
                        <h2 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Tv size={20} color="#ef4444" /> ENTRETENIMIENTO VISUAL & GAMING
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                            {VISUAL_GAMES.map((c, i) => <Card key={i} card={c} />)}
                        </div>
                    </section>
                    
                    {/* SERENAMET & Airport full (Embedded or placeholder for now) */}
                    <section className="glass-panel" style={{ padding: '2rem', borderRadius: '30px', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56,189,248,0.3)' }}>
                        <h2 style={{ color: '#38bdf8', margin: '0 0 1.5rem 0', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Wind size={28} /> SERENAMET - MONITOREO REGIONAL
                        </h2>
                        <div style={{ height: '300px', background: '#000', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '10px' }}>
                             <div style={{ fontSize: '2rem', fontWeight: '900' }}>18º C</div>
                             <div style={{ color: '#38bdf8' }}>Cielos Despejados · Humedad 65%</div>
                             <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Módulo Meteorológico VLS (API: ON)</div>
                             <button 
                                onClick={() => window.location.href='/serenamet'} 
                                style={{ marginTop: '20px', background: '#38bdf8', color: '#0f172a', border: 'none', padding: '10px 25px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }}
                             >
                                VER GAMA REPORTE COMPLETO →
                             </button>
                        </div>
                    </section>

                    {/* Infrastructure & Intelligence Grid */}
                    <section>
                        <h2 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Monitor size={20} color="#ef4444" /> INTELIGENCIA & INFRAESTRUCTURA
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                            {UTILITIES.map((c, i) => <Card key={i} card={c} />)}
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}
