import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Globe, ExternalLink, Radio, Shield, Building, MapPin, Landmark,
  Sparkles, Star, Clock, Zap, ChevronRight, Home, ArrowRight, Search
} from 'lucide-react';

const PORTALES = [
  {
    id: 'vecinosmart',
    domain: 'vecinosmart.cl',
    url: 'https://vecinosmart.cl',
    name: 'VecinoSmart',
    subtitle: 'Portal principal de la red Smart City',
    desc: 'Hub central: ciudadanos, administración, eventos e inteligencia urbana.',
    color: '#38bdf8',
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)',
    icon: Shield,
    badge: 'PRINCIPAL',
    featured: true
  },
  {
    id: 'puertasmart',
    domain: 'puertasmart.cl',
    url: 'https://puertasmart.cl',
    name: 'PuertaSmart',
    subtitle: 'Control de acceso con QR Vecinal',
    desc: 'Registro digital de accesos, listas VIP y monitoreo de recintos municipales.',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)',
    icon: Landmark,
    badge: 'ACCESO'
  },
  {
    id: 'radiovecinos',
    domain: 'radiovecinos.cl',
    url: 'https://radiovecinos.cl',
    name: 'Radio Vecinos',
    subtitle: 'Radio digital municipal en vivo',
    desc: 'Transmisión comunitaria, marquee de noticias y producción de contenido ciudadano 24/7.',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #d97706 0%, #92400e 100%)',
    icon: Radio,
    badge: 'EN VIVO'
  },
  {
    id: 'vecinoslaserena',
    domain: 'www.vecinoslaserena.cl',
    url: 'https://www.vecinoslaserena.cl',
    name: 'Vecinos LA❤️SERENA',
    subtitle: 'Plataforma Smart City La Serena',
    desc: 'Portal georreferenciado de reportes vecinales, paseo histórico 3D y monitoreo urbano.',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #059669 0%, #064e3b 100%)',
    icon: MapPin,
    badge: 'FULL'
  },
  {
    id: 'rdmls',
    domain: 'rdmls.cl',
    url: 'https://rdmls.cl',
    name: 'RDMLS',
    subtitle: 'Dashboard de Inteligencia Regional',
    desc: 'Monitoreo de datos, métricas urbanas y panel de control avanzado para gestión municipal.',
    color: '#ef4444',
    gradient: 'linear-gradient(135deg, #dc2626 0%, #7f1d1d 100%)',
    icon: Zap,
    badge: 'DATA'
  },
  {
    id: 'chilevecinos',
    domain: 'chilevecinos.cl',
    url: 'https://chilevecinos.cl',
    name: 'Chile Vecinos',
    subtitle: 'Red nacional de vecinos inteligentes',
    desc: 'Plataforma federada de participación ciudadana a nivel nacional. Conecta comunas.',
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #db2777 0%, #831843 100%)',
    icon: Globe,
    badge: 'NACIONAL'
  },
  {
    id: 'farito',
    domain: 'farito.cl',
    url: 'https://farito.cl',
    name: 'Farito',
    subtitle: 'Navegador web inteligente municipal',
    desc: 'Asistente de navegación con IA, guía de servicios y directorio interactivo de la ciudad.',
    color: '#00e5ff',
    gradient: 'linear-gradient(135deg, #0284c7 0%, #0c4a6e 100%)',
    icon: Sparkles,
    badge: 'IA'
  },
  {
    id: 'piratasmart',
    domain: 'comunasmart.cl/quimbo',
    url: '/quimbo',
    name: 'PirataSmart',
    subtitle: 'Smart City Ecosistema Coquimbo',
    desc: 'Versión soberana para la ciudad puerto. Seguridad, monitoreo pirata y gestión ciudadana local.',
    color: '#facc15',
    gradient: 'linear-gradient(135deg, #000000 0%, #451a03 100%)',
    icon: Landmark,
    badge: 'QUIMBO'
  }
];

const SafeIcon = ({ icon: Icon, size, color, className }) => {
  if (!Icon) return <Zap size={size} color={color} className={className} />;
  return <Icon size={size} color={color} className={className} />;
};

export default function WelcomePortal() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredPortal, setHoveredPortal] = useState(null);
  const [particles, setParticles] = useState([]);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const splashTimer = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const pts = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      dur: Math.random() * 8 + 4,
      delay: Math.random() * 5
    }));
    setParticles(pts);
    return () => clearInterval(timer);
  }, []);

  const filteredPortales = PORTALES.filter(p =>
    !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featured = PORTALES.find(p => p.featured);

  if (showSplash) {
      return (
          <div style={{
              minHeight: '100vh',
              background: '#020617',
              color: 'white',
              fontFamily: '"Outfit", "Inter", sans-serif',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '2rem',
              position: 'relative',
              overflow: 'hidden'
          }}>
              <div style={{
                  position: 'absolute', inset: 0,
                  background: 'radial-gradient(circle at center, rgba(56, 189, 248, 0.15) 0%, transparent 60%)',
                  pointerEvents: 'none'
              }} />
              
              <div style={{ zIndex: 1, maxWidth: '600px' }} className="animate-fade-in">
                  <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #38bdf8, #0ea5e9)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', boxShadow: '0 0 30px rgba(56, 189, 248, 0.5)', animation: 'pulseDot 2s infinite' }}>
                      <SafeIcon icon={Shield} size={40} color="white" />
                  </div>
                  
                  <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-1px' }}>
                      Bienvenido al Sistema<br/><span style={{ color: '#38bdf8' }}>VecinoSmart</span>
                  </h1>
                  
                  <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '2rem' }}>
                      <p style={{ fontSize: '1.1rem', color: '#cbd5e1', lineHeight: '1.6', margin: 0 }}>
                          Una filosofía de soberanía tecnológica en LA❤️SERENA
                          segura (Martin Shield activo).
                          <br/><br/>
                          <strong>Instrucciones:</strong> Por favor lee detenidamente las indicaciones de cada módulo antes de operar. El ecosistema unificado permite acceso seguro a trámites, salud, eventos y seguridad.
                      </p>
                  </div>
              </div>
          </div>
      );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#020617',
      color: 'white',
      fontFamily: '"Outfit", "Inter", sans-serif',
      overflowX: 'hidden',
      position: 'relative'
    }}>
      <div style={{
        position: 'fixed',
        inset: 0,
        background: `
          radial-gradient(ellipse at 10% 20%, rgba(56, 189, 248, 0.12) 0%, transparent 50%),
          radial-gradient(ellipse at 90% 80%, rgba(139, 92, 246, 0.10) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 50%, rgba(16, 185, 129, 0.05) 0%, transparent 60%)
        `,
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(2, 6, 23, 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(56, 189, 248, 0.15)',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '44px', height: '44px',
            background: 'linear-gradient(135deg, #38bdf8, #0ea5e9)',
            borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Home size={22} color="white" />
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: '1.3rem', letterSpacing: '-0.5px' }}>
              VecinoSmart<span style={{ color: '#38bdf8' }}>.cl</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '20px',
            padding: '0.3rem 0.8rem',
            fontSize: '0.7rem',
            fontWeight: 'bold',
            color: '#10b981'
          }}>
            7 PORTALES ACTIVOS
          </div>
          <button onClick={() => navigate('/')} style={{ background: 'linear-gradient(135deg, #38bdf8, #0ea5e9)', color: 'white', border: 'none', borderRadius: '10px', padding: '0.6rem 1.2rem', fontWeight: 'bold' }}>
            Ingresar <ArrowRight size={14} />
          </button>
        </div>
      </header>

      <section style={{ textAlign: 'center', padding: '4rem 1.5rem', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '50px', padding: '0.4rem 1.2rem', fontSize: '0.65rem', fontWeight: 'bold', color: '#38bdf8', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
          <Star size={10} fill="#38bdf8" /> Smart City Chile 2025
        </div>

        <h1 style={{ fontSize: 'clamp(2.1rem, 5.1vw, 4.25rem)', fontWeight: 900, margin: '0 0 1.2rem', lineHeight: 1.05, letterSpacing: '-2px' }}>
          La Red de Ciudades<br />Inteligentes de Chile
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '0 1.5rem', maxWidth: '560px', margin: '0 auto' }}>
          <Search size={20} color="#64748b" />
          <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Buscar portal o servicio..." style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', fontSize: '1rem', padding: '1.1rem 0', outline: 'none' }} />
        </div>
      </section>

      <section style={{ maxWidth: '1300px', margin: '0 auto', padding: '2rem 2rem 6rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {filteredPortales.map(portal => (
            <a href={portal.url} target="_blank" rel="noopener noreferrer" key={portal.id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '24px', padding: '1.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                  <div style={{ background: portal.gradient, borderRadius: '14px', padding: '0.8rem' }}>
                    <SafeIcon icon={portal.icon} size={24} color="white" />
                  </div>
                </div>
                <h3 style={{ margin: '0 0 0.3rem', fontSize: '1.3rem', fontWeight: 900 }}>{portal.name}</h3>
                <p style={{ margin: '0 0 1.2rem', fontSize: '0.85rem', color: '#94a3b8' }}>{portal.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
                  <span style={{ fontSize: '0.75rem', color: '#475569' }}>{portal.subtitle}</span>
                  <div style={{ color: portal.color, fontWeight: 'bold' }}>Abrir <ExternalLink size={14} /></div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <footer style={{ padding: '4rem 2rem', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
        <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
          &copy; 2025 Vecinos La Serena. Plataforma Smart City de código abierto para la Región de Coquimbo.
        </p>
      </footer>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;900&display=swap');
        @keyframes pulseDot {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px #10b981; }
          50% { opacity: 0.5; box-shadow: 0 0 16px #10b981; }
        }
      `}</style>
    </div>
  );
}
