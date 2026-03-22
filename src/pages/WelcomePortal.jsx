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
    icon: <Shield size={28} color="white" />,
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
    icon: <Landmark size={28} color="white" />,
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
    icon: <Radio size={28} color="white" />,
    badge: 'EN VIVO'
  },
  {
    id: 'vecinoslaserena',
    domain: 'www.vecinoslaserena.cl',
    url: 'https://www.vecinoslaserena.cl',
    name: 'Vecinos La Serena',
    subtitle: 'Plataforma Smart City La Serena',
    desc: 'Portal georreferenciado de reportes vecinales, paseo histórico 3D y monitoreo urbano.',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #059669 0%, #064e3b 100%)',
    icon: <MapPin size={28} color="white" />,
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
    icon: <Zap size={28} color="white" />,
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
    icon: <Globe size={28} color="white" />,
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
    icon: <Sparkles size={28} color="white" />,
    badge: 'IA'
  }
];

export default function WelcomePortal() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredPortal, setHoveredPortal] = useState(null);
  const [particles, setParticles] = useState([]);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const splashTimer = setTimeout(() => setShowSplash(false), 10000);
    return () => clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    // Generate particle positions only once
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
              background: 'var(--bg-primary)',
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
              {/* Background Glow */}
              <div style={{
                  position: 'absolute', inset: 0,
                  background: 'radial-gradient(circle at center, rgba(56, 189, 248, 0.15) 0%, transparent 60%)',
                  pointerEvents: 'none'
              }} />
              
              <div style={{ zIndex: 1, maxWidth: '600px' }} className="animate-fade-in">
                  <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #38bdf8, #0ea5e9)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', boxShadow: '0 0 30px rgba(56, 189, 248, 0.5)', animation: 'pulseDot 2s infinite' }}>
                      <Shield size={40} color="white" />
                  </div>
                  
                  <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-1px' }}>
                      Bienvenido al Sistema<br/><span style={{ color: '#38bdf8' }}>VecinoSmart</span>
                  </h1>
                  
                  <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '2rem' }}>
                      <p style={{ fontSize: '1.1rem', color: '#cbd5e1', lineHeight: '1.6', margin: 0 }}>
                          Estás ingresando a la plataforma comunal segura (Martin Shield activo). 
                          <br/><br/>
                          <strong>Instrucciones:</strong> Por favor lee detenidamente las indicaciones de cada módulo antes de operar. El ecosistema unificado permite acceso seguro a trámites, salud, eventos y seguridad.
                      </p>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.9rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                      <div className="typing-dot" style={{ width: '6px', height: '6px', background: '#38bdf8', borderRadius: '50%' }}></div>
                      Iniciando red de portales...
                  </div>
              </div>
          </div>
      );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      color: 'white',
      fontFamily: '"Outfit", "Inter", sans-serif',
      overflowX: 'hidden',
      position: 'relative',
      transform: 'scale(0.85)',
      transformOrigin: 'top center'
    }}>
      {/* Ambient Background */}
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

      {/* Floating Particles */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        {particles.map(p => (
          <div key={p.id} style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: 'rgba(56, 189, 248, 0.4)',
            borderRadius: '50%',
            animation: `floatParticle ${p.dur}s ${p.delay}s ease-in-out infinite alternate`
          }} />
        ))}
      </div>

      {/* === HEADER === */}
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
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 20px rgba(56, 189, 248, 0.4)'
          }}>
            <Home size={22} color="white" />
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: '1.3rem', letterSpacing: '-0.5px' }}>
              VecinoSmart<span style={{ color: '#38bdf8' }}>.cl</span>
            </div>
            <div style={{ fontSize: '0.65rem', color: '#64748b', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Red de Portales Smart City Chile
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {/* Live clock */}
          <div style={{ textAlign: 'right', display: 'none' }} className="clock-desktop">
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', fontVariantNumeric: 'tabular-nums' }}>
              {currentTime.toLocaleTimeString('es-CL')}
            </div>
            <div style={{ fontSize: '0.6rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {currentTime.toLocaleDateString('es-CL', { weekday: 'short', day: 'numeric', month: 'short' })}
            </div>
          </div>

          {/* Status indicator */}
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
            <div style={{
              width: '6px', height: '6px',
              background: '#10b981',
              borderRadius: '50%',
              boxShadow: '0 0 8px #10b981',
              animation: 'pulseDot 2s infinite'
            }} />
            7 PORTALES ACTIVOS
          </div>

          <button
            onClick={() => navigate('/')}
            style={{
              background: 'linear-gradient(135deg, #38bdf8, #0ea5e9)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              padding: '0.6rem 1.2rem',
              fontWeight: 'bold',
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            Ingresar <ArrowRight size={14} />
          </button>
        </div>
      </header>

      {/* === HERO === */}
      <section style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        padding: '4rem 1.5rem 2.5rem',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {/* Ancestral Serenito Welcome Figure */}
        <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 1rem auto', animation: 'floatParticle 3s ease-in-out infinite alternate' }}>
            <img
                src="/ancestral_serenito.png"
                alt="Ancestral Serenito"
                style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(56,189,248,0.4))' }}
            />
            <div style={{ position: 'absolute', bottom: '-5px', left: '50%', transform: 'translateX(-50%)', background: '#38bdf8', color: '#020617', padding: '2px 10px', borderRadius: '10px', fontSize: '0.6rem', fontWeight: 900, whiteSpace: 'nowrap' }}>BISABUELO VLS</div>
        </div>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(56, 189, 248, 0.08)',
          border: '1px solid rgba(56, 189, 248, 0.2)',
          borderRadius: '50px',
          padding: '0.4rem 1.2rem',
          fontSize: '0.65rem',
          fontWeight: 'bold',
          color: '#38bdf8',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          marginBottom: '1.5rem'
        }}>
          <Star size={10} fill="#38bdf8" /> Smart City Chile 2026
        </div>

        <h1 style={{
          fontSize: 'clamp(2.1rem, 5.1vw, 4.25rem)',
          fontWeight: 900,
          margin: '0 0 1.2rem',
          lineHeight: 1.05,
          letterSpacing: '-2px',
          background: 'linear-gradient(135deg, white 30%, #38bdf8 70%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          La Red de Ciudades<br />Inteligentes de Chile
        </h1>

        <p style={{
          fontSize: '1.15rem',
          color: '#94a3b8',
          lineHeight: 1.7,
          maxWidth: '600px',
          margin: '0 auto 3rem'
        }}>
          Accede a todos los portales de la red VecinoSmart — ciudadanos, radio,
          control de acceso, inteligencia urbana y más.
        </p>

        {/* Search */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '0 1.5rem',
          maxWidth: '560px',
          margin: '0 auto',
          transition: 'border-color 0.3s'
        }}>
          <Search size={20} color="#64748b" />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Buscar portal o servicio..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'white',
              fontSize: '1rem',
              padding: '1.1rem 0'
            }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
          )}
        </div>
      </section>

      {/* === PORTAL CARDS GRID === */}
      <section style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1300px',
        margin: '0 auto',
        padding: '2rem 2rem 6rem'
      }}>
        {/* Featured Portal */}
        {!searchQuery && featured && (
          <a
            href={featured.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
          >
          <div
            style={{
              background: featured.gradient,
              borderRadius: '28px',
              padding: '2.5rem 3rem',
              marginBottom: '2rem',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '2rem',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.3s',
              boxShadow: `0 20px 60px rgba(14, 165, 233, 0.3)`
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.01)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{ position: 'absolute', inset: 0, background: 'url("data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h200v200H0z\' fill=\'none\'/%3E%3Ccircle cx=\'150\' cy=\'50\' r=\'80\' fill=\'rgba(255,255,255,0.05)\'/%3E%3C/svg%3E") right / cover', pointerEvents: 'none' }} />
            <div style={{ flex: 1, position: 'relative' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '14px', padding: '0.8rem', backdropFilter: 'blur(10px)' }}>
                  {featured.icon}
                </div>
                <div>
                  <span style={{ background: 'rgba(255,255,255,0.25)', borderRadius: '20px', padding: '0.2rem 0.8rem', fontSize: '0.65rem', fontWeight: 900, letterSpacing: '1px' }}>
                    ⭐ {featured.badge}
                  </span>
                </div>
              </div>
              <h2 style={{ margin: '0 0 0.5rem', fontSize: '2.2rem', fontWeight: 900, letterSpacing: '-1px' }}>{featured.name}</h2>
              <p style={{ margin: '0 0 0.5rem', opacity: 0.9, fontSize: '1.1rem', fontWeight: 600 }}>{featured.subtitle}</p>
              <p style={{ margin: 0, opacity: 0.75, fontSize: '0.9rem', maxWidth: '500px' }}>{featured.desc}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem', flexShrink: 0, position: 'relative' }}>
              <div style={{ fontSize: '0.85rem', opacity: 0.8, fontFamily: 'monospace' }}>{featured.domain}</div>
              <div style={{
                background: 'white',
                color: '#0369a1',
                borderRadius: '14px',
                padding: '0.8rem 1.5rem',
                fontWeight: 900,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                Ingresar <ArrowRight size={16} />
              </div>
            </div>
          </div>
          </a>
        )}

        {/* Rest of portals grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredPortales
            .filter(p => searchQuery || !p.featured)
            .map(portal => (
              <a
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                key={portal.id}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
              <div
                onMouseEnter={() => setHoveredPortal(portal.id)}
                onMouseLeave={() => setHoveredPortal(null)}
                style={{
                  background: hoveredPortal === portal.id
                    ? 'rgba(255, 255, 255, 0.06)'
                    : 'rgba(255, 255, 255, 0.02)',
                  border: `1px solid ${hoveredPortal === portal.id ? portal.color + '50' : 'rgba(255, 255, 255, 0.06)'}`,
                  borderRadius: '24px',
                  padding: '1.8rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)',
                  transform: hoveredPortal === portal.id ? 'translateY(-6px)' : 'none',
                  boxShadow: hoveredPortal === portal.id ? `0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px ${portal.color}20` : 'none',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Glow overlay on hover */}
                <div style={{
                  position: 'absolute',
                  top: 0, right: 0,
                  width: '120px', height: '120px',
                  background: `radial-gradient(circle at top right, ${portal.color}20, transparent)`,
                  pointerEvents: 'none',
                  opacity: hoveredPortal === portal.id ? 1 : 0,
                  transition: 'opacity 0.3s'
                }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
                  <div style={{
                    background: portal.gradient,
                    borderRadius: '14px',
                    padding: '0.8rem',
                    boxShadow: `0 8px 20px ${portal.color}30`
                  }}>
                    {portal.icon}
                  </div>
                  <span style={{
                    background: `${portal.color}20`,
                    border: `1px solid ${portal.color}40`,
                    color: portal.color,
                    borderRadius: '20px',
                    padding: '0.2rem 0.7rem',
                    fontSize: '0.6rem',
                    fontWeight: 900,
                    letterSpacing: '1px',
                    textTransform: 'uppercase'
                  }}>
                    {portal.badge}
                  </span>
                </div>

                <h3 style={{ margin: '0 0 0.3rem', fontSize: '1.3rem', fontWeight: 900 }}>{portal.name}</h3>
                <div style={{ fontSize: '0.75rem', color: portal.color, fontWeight: 600, marginBottom: '0.7rem', fontFamily: 'monospace' }}>
                  {portal.domain}
                </div>
                <p style={{ margin: '0 0 1.2rem', fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6 }}>{portal.desc}</p>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid rgba(255,255,255,0.05)',
                  paddingTop: '1rem'
                }}>
                  <span style={{ fontSize: '0.75rem', color: '#475569' }}>{portal.subtitle}</span>
                  <div style={{
                    color: portal.color,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    opacity: hoveredPortal === portal.id ? 1 : 0.5,
                    transition: 'opacity 0.3s'
                  }}>
                    Abrir <ExternalLink size={14} />
                  </div>
                </div>
              </div>
              </a>
            ))}
        </div>

        {filteredPortales.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#475569' }}>
            <Globe size={48} style={{ marginBottom: '1rem', opacity: 0.4 }} />
            <p>No se encontraron portales para "{searchQuery}"</p>
          </div>
        )}
      </section>

      {/* === FOOTER === */}
      <footer style={{
        marginTop: '6rem',
        padding: '4rem 2rem',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        textAlign: 'center',
        background: 'rgba(0,0,0,0.2)'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(56,189,248,0.05)', padding: '5px 15px', borderRadius: '12px', border: '1px solid rgba(56,189,248,0.2)' }}>
            <Star size={14} color="#38bdf8" fill="#38bdf8" />
            <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#38bdf8', letterSpacing: '2px' }}>HECHO EN LA SERENA · v3.2 CRISTAL</span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: '600px', margin: 0 }}>
            &copy; 2026 Vecinos La Serena. Plataforma Smart City de código abierto para la Región de Coquimbo.
          </p>
          <div style={{ fontSize: '1.5rem', opacity: 0.3, letterSpacing: '5px' }}>★ ★ ★ ★ ★</div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;900&display=swap');
        @keyframes floatParticle {
          0% { transform: translateY(0px) scale(1); opacity: 0.3; }
          100% { transform: translateY(-30px) scale(1.5); opacity: 0.7; }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px #10b981; }
          50% { opacity: 0.5; box-shadow: 0 0 16px #10b981; }
        }
        @media (max-width: 768px) {
          .clock-desktop { display: none !important; }
        }
      `}</style>
    </div>
  );
}
