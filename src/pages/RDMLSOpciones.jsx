import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Radio, Users, GraduationCap, Calendar, Eye, Map, Wifi, Shield, 
  Building2, Globe, ChevronRight, ArrowLeft, Zap, Award, FileText,
  Mic, Activity, Layers, BarChart3, Lock, Smartphone
} from 'lucide-react';

const PILLARS = [
  {
    id: 'citizens',
    icon: Users,
    color: '#38bdf8',
    label: 'SMART CITIZENS',
    subtitle: 'Atención Ciudadana',
    items: [
      'Registro digital de accesos con QR',
      'Portal georreferenciado de reportes vecinales',
      'Monitoreo urbano y ambiental (baches, luminarias)',
      'Monitoreo de playas y humedales',
      'Radio Digital Municipal RDMLS'
    ]
  },
  {
    id: 'admin',
    icon: Building2,
    color: '#f59e0b',
    label: 'SMART ADMINISTRATION',
    subtitle: 'Gestión Interna',
    items: [
      'Portal de inducción E-Learning con diploma digital',
      'Digitalización de informes de honorarios y contrata',
      'Firma digital de documentos municipales',
      'Gestión de RRHH con Backoffice Móvil',
      'Captura fotográfica in situ en terreno'
    ]
  },
  {
    id: 'events',
    icon: Calendar,
    color: '#a855f7',
    label: 'SMART EVENTS',
    subtitle: 'Protocolo',
    items: [
      'Gestión automatizada de ceremonias y eventos',
      'Monitor de Precedencias en tiempo real',
      'Asignación automática de ubicaciones de autoridades',
      'Plantillas de programas protocolares',
      'Dashboard de coordinación de eventos'
    ]
  },
  {
    id: 'listening',
    icon: Eye,
    color: '#10b981',
    label: 'SMART LISTENING',
    subtitle: 'Inteligencia',
    items: [
      'Centinel Faro: Social Listening municipal',
      'Monitoreo de redes sociales con IA',
      'Análisis de video y contenido multimedia',
      'Alertas automáticas de menciones',
      'Dashboard de reputación institucional'
    ]
  }
];

const TECH_STACK = [
  { label: 'React 18 + Vite', desc: 'Frontend SPA de alta performance', icon: Zap },
  { label: 'Firebase Firestore', desc: 'Base de datos en tiempo real', icon: Activity },
  { label: 'Cloudflare Pages', desc: 'CDN global + Edge Computing', icon: Globe },
  { label: 'PWA + IndexedDB', desc: 'Funciona sin conexión', icon: Smartphone },
  { label: 'Web Audio API', desc: 'Radio digital con ecualizador', icon: Radio },
  { label: 'Firma Digital', desc: 'Documentos oficiales certificados', icon: Lock },
];

const LEGAL_BASIS = [
  { num: 'Ley 19.880', title: 'Procedimientos Administrativos', desc: 'Bases para la digitalización de actos administrativos municipales.' },
  { num: 'Ley 19.886', title: 'Compras Públicas', desc: 'Gestión de contratos y licitaciones en plataforma transparente.' },
  { num: 'Ley 21.180', title: 'Transformación Digital', desc: 'Mandato legal para digitalizar procesos del Estado chileno.' },
  { num: 'Ley 21.533', title: 'Datos Personales', desc: 'Protección de datos de los funcionarios y vecinos.' },
  { num: 'DFL Nº1-3.063', title: 'Municipalidades', desc: 'Ley Orgánica que habilita servicios digitales municipales.' },
  { num: 'Ley 19.799', title: 'Documentos Electrónicos', desc: 'Validez jurídica de diplomas y firma electrónica.' },
];

const PIN = '2026'; // PIN de acceso — solo personal RDMLS/IMLS

export default function RDMLSOpcionesPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pilares');
  const [visible, setVisible] = useState(false);
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('rdmls_opciones_ok') === 'true');
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [shake, setShake] = useState(false);

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput === PIN) {
      sessionStorage.setItem('rdmls_opciones_ok', 'true');
      setUnlocked(true);
    } else {
      setPinError(true);
      setShake(true);
      setPinInput('');
      setTimeout(() => { setPinError(false); setShake(false); }, 1500);
    }
  };

  useEffect(() => {
    document.title = unlocked
      ? 'RDMLS · Smart Municipality · Opciones y Fundamentos'
      : 'RDMLS · Acceso Restringido';
    if (unlocked) setTimeout(() => setVisible(true), 100);
  }, [unlocked]);

  /* ─── PANTALLA DE PIN ─── */
  if (!unlocked) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at center, #0f1729 0%, #050810 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Segoe UI', Roboto, sans-serif",
        padding: '2rem'
      }}>
        <img src="/escudo.png" alt="IMLS" style={{ height: '70px', marginBottom: '1.5rem', filter: 'drop-shadow(0 0 20px rgba(197,160,101,0.4))' }} />
        <h1 style={{ color: '#C5A065', fontSize: '1.2rem', fontWeight: '900', letterSpacing: '3px', marginBottom: '0.3rem', textAlign: 'center' }}>
          RDMLS · ÁREA RESTRINGIDA
        </h1>
        <p style={{ color: '#475569', fontSize: '0.8rem', marginBottom: '2.5rem', letterSpacing: '1px', textAlign: 'center' }}>
          Solo personal autorizado IMLS · 2026
        </p>
        <form onSubmit={handlePinSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem' }}>
          <div style={{
            background: pinError ? 'rgba(239,68,68,0.08)' : 'rgba(197,160,101,0.06)',
            border: `2px solid ${pinError ? '#ef4444' : '#C5A06550'}`,
            borderRadius: '16px',
            padding: '1.5rem 2rem',
            textAlign: 'center',
            animation: shake ? 'shake 0.4s ease' : 'none',
            transition: 'border-color 0.3s'
          }}>
            <div style={{ fontSize: '0.65rem', color: '#64748b', letterSpacing: '2px', marginBottom: '1rem' }}>
              INGRESE CÓDIGO DE ACCESO
            </div>
            <input
              type="password"
              inputMode="numeric"
              maxLength={6}
              autoFocus
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
              style={{
                background: 'rgba(0,0,0,0.4)',
                border: `2px solid ${pinError ? '#ef4444' : 'rgba(197,160,101,0.3)'}`,
                borderRadius: '12px',
                padding: '12px 24px',
                fontSize: '2rem',
                fontFamily: '"Courier New", monospace',
                color: 'white',
                textAlign: 'center',
                width: '160px',
                letterSpacing: '8px',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
            />
            {pinError && (
              <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.8rem', fontWeight: '600' }}>
                Código incorrecto. Intente nuevamente.
              </div>
            )}
          </div>
          <button type="submit" style={{
            background: 'linear-gradient(135deg, #C5A065, #9a7640)',
            border: 'none',
            borderRadius: '12px',
            padding: '12px 40px',
            color: '#0a0a0f',
            fontWeight: '900',
            fontSize: '0.9rem',
            letterSpacing: '2px',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}>
            AUTORIZAR INGRESO
          </button>
          <button type="button" onClick={() => navigate('/')} style={{
            background: 'none',
            border: 'none',
            color: '#475569',
            cursor: 'pointer',
            fontSize: '0.75rem',
            textDecoration: 'underline'
          }}>
            Volver a la Radio RDMLS
          </button>
        </form>
        <style>{`@keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)} }`}</style>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0f 0%, #0f1729 40%, #0a0a0f 100%)',
      color: 'white',
      fontFamily: "'Segoe UI', Roboto, sans-serif",
      overflowX: 'hidden'
    }}>

      {/* HEADER */}
      <header style={{
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(20px)',
        borderBottom: '2px solid #C5A06560',
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <button onClick={() => navigate('/')} style={{
          background: 'rgba(197,160,101,0.15)',
          border: '1px solid #C5A06540',
          color: '#C5A065',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}>
          <ArrowLeft size={18} />
        </button>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/escudo.png" alt="IMLS" style={{ height: '36px' }} />
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: '900', color: '#C5A065', letterSpacing: '2px' }}>
                RDMLS · SMART MUNICIPALITY
              </div>
              <div style={{ fontSize: '0.65rem', color: '#94a3b8', letterSpacing: '1px' }}>
                MUNICIPALIDAD DE LA SERENA · DEPARTAMENTO DE INNOVACIÓN DIGITAL
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{
            background: 'linear-gradient(135deg, #C5A065, #9a7640)',
            borderRadius: '20px',
            padding: '4px 14px',
            fontSize: '0.7rem',
            fontWeight: '900',
            letterSpacing: '2px'
          }}>
            2026
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section style={{
        textAlign: 'center',
        padding: '4rem 2rem 3rem',
        background: 'radial-gradient(ellipse at top, rgba(197,160,101,0.1) 0%, transparent 60%)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.8s ease',
        borderBottom: '1px solid rgba(197,160,101,0.15)'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(197,160,101,0.1)',
          border: '1px solid rgba(197,160,101,0.3)',
          borderRadius: '50px',
          padding: '6px 20px',
          fontSize: '0.7rem',
          color: '#C5A065',
          letterSpacing: '3px',
          fontWeight: '700',
          marginBottom: '1.5rem'
        }}>
          <Radio size={12} /> RADIO DIGITAL MUNICIPAL LA SERENA
        </div>
        <h1 style={{
          fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
          fontWeight: '900',
          background: 'linear-gradient(135deg, #ffffff 0%, #C5A065 50%, #fde68a 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          margin: '0 0 1rem',
          lineHeight: 1.1
        }}>
          Plataforma Smart<br/>Municipality 2026
        </h1>
        <p style={{
          fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
          color: '#94a3b8',
          maxWidth: '650px',
          margin: '0 auto 2rem',
          lineHeight: 1.7
        }}>
          Sistema de innovación municipal de código abierto, diseñado para optimizar 
          la gestión ciudadana, administrativa y de inteligencia territorial de la 
          Ilustre Municipalidad de La Serena.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {[
            { icon: Shield, label: '100% Transparente' },
            { icon: Globe, label: 'Código Abierto' },
            { icon: Award, label: 'Nivel Institucional' },
            { icon: Layers, label: '4 Pilares Smart' }
          ].map(({ icon: Icon, label }) => (
            <div key={label} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '50px',
              padding: '6px 16px',
              fontSize: '0.75rem',
              color: '#cbd5e1'
            }}>
              <Icon size={12} color="#C5A065" />
              {label}
            </div>
          ))}
        </div>
      </section>

      {/* TABS */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '4px',
        padding: '1.5rem 1rem',
        background: 'rgba(0,0,0,0.3)',
        flexWrap: 'wrap'
      }}>
        {[
          { id: 'pilares', label: 'Los 4 Pilares', icon: Layers },
          { id: 'tecnologia', label: 'Tecnología', icon: Zap },
          { id: 'legal', label: 'Base Legal', icon: FileText },
          { id: 'ruta', label: 'Ruta de Innovación', icon: Map }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 20px',
              borderRadius: '10px',
              border: `2px solid ${activeTab === id ? '#C5A065' : 'rgba(255,255,255,0.1)'}`,
              background: activeTab === id ? 'rgba(197,160,101,0.15)' : 'transparent',
              color: activeTab === id ? '#C5A065' : '#94a3b8',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: activeTab === id ? '700' : '400',
              transition: 'all 0.2s',
              letterSpacing: '0.5px'
            }}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {/* CONTENT AREA */}
      <main style={{ padding: '1.5rem 1.5rem 4rem', maxWidth: '1100px', margin: '0 auto' }}>

        {/* TAB: PILARES */}
        {activeTab === 'pilares' && (
          <div>
            <h2 style={{ textAlign: 'center', color: '#C5A065', fontSize: '1.4rem', marginBottom: '2rem', letterSpacing: '2px' }}>
              LOS 4 PILARES DE LA SMART MUNICIPALITY
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}>
              {PILLARS.map((pillar) => (
                <div key={pillar.id} style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${pillar.color}30`,
                  borderRadius: '20px',
                  padding: '2rem',
                  transition: 'all 0.3s',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: `linear-gradient(90deg, ${pillar.color}, transparent)`
                  }} />
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    background: `${pillar.color}20`,
                    border: `1.5px solid ${pillar.color}50`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    <pillar.icon size={24} color={pillar.color} />
                  </div>
                  <div style={{ fontSize: '0.6rem', color: pillar.color, letterSpacing: '2px', fontWeight: '700', marginBottom: '4px' }}>
                    {pillar.label}
                  </div>
                  <h3 style={{ fontSize: '1.1rem', margin: '0 0 1rem', color: 'white' }}>
                    {pillar.subtitle}
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {pillar.items.map((item, i) => (
                      <li key={i} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        fontSize: '0.82rem',
                        color: '#94a3b8',
                        lineHeight: 1.4
                      }}>
                        <ChevronRight size={12} color={pillar.color} style={{ marginTop: '3px', flexShrink: 0 }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: TECNOLOGIA */}
        {activeTab === 'tecnologia' && (
          <div>
            <h2 style={{ textAlign: 'center', color: '#C5A065', fontSize: '1.4rem', marginBottom: '0.5rem', letterSpacing: '2px' }}>
              STACK TECNOLÓGICO
            </h2>
            <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '2rem', fontSize: '0.9rem' }}>
              Tecnología de nivel enterprise, sin costo de licencias
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem',
              marginBottom: '2.5rem'
            }}>
              {TECH_STACK.map(({ label, desc, icon: Icon }) => (
                <div key={label} style={{
                  background: 'rgba(197,160,101,0.05)',
                  border: '1px solid rgba(197,160,101,0.2)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem'
                }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: 'rgba(197,160,101,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Icon size={20} color="#C5A065" />
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', color: 'white', marginBottom: '4px' }}>{label}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              background: 'rgba(197,160,101,0.05)',
              border: '1px solid rgba(197,160,101,0.3)',
              borderRadius: '20px',
              padding: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <BarChart3 size={20} color="#C5A065" />
                <h3 style={{ margin: 0, color: '#C5A065', fontSize: '1rem', letterSpacing: '1px' }}>
                  ARQUITECTURA DUAL DE DESPLIEGUE
                </h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {[
                  { title: 'Firebase Hosting', desc: 'Infraestructura principal con CI/CD automático y CDN de Google', badge: 'PRIMARIO' },
                  { title: 'Cloudflare Pages', desc: 'Redundancia global con Edge Workers para máxima disponibilidad', badge: 'RESPALDO' },
                  { title: 'GitHub Actions', desc: 'Pipeline de integración continua con deploy automático al push', badge: 'CI/CD' },
                  { title: 'Firestore + Auth', desc: 'Backend serverless con autenticación y base de datos en tiempo real', badge: 'BDD' }
                ].map(({ title, desc, badge }) => (
                  <div key={title} style={{
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '12px',
                    padding: '1rem',
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}>
                    <div style={{
                      display: 'inline-block',
                      background: '#C5A065',
                      color: '#0a0a0f',
                      borderRadius: '4px',
                      padding: '2px 8px',
                      fontSize: '0.55rem',
                      fontWeight: '900',
                      letterSpacing: '1px',
                      marginBottom: '8px'
                    }}>{badge}</div>
                    <div style={{ fontWeight: '700', color: 'white', marginBottom: '4px', fontSize: '0.9rem' }}>{title}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.5 }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: BASE LEGAL */}
        {activeTab === 'legal' && (
          <div>
            <h2 style={{ textAlign: 'center', color: '#C5A065', fontSize: '1.4rem', marginBottom: '0.5rem', letterSpacing: '2px' }}>
              FUNDAMENTOS LEGALES
            </h2>
            <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '2rem', fontSize: '0.9rem' }}>
              Base normativa que habilita y respalda la plataforma municipal
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {LEGAL_BASIS.map(({ num, title, desc }) => (
                <div key={num} style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderLeft: '4px solid #C5A065',
                  borderRadius: '0 16px 16px 0',
                  padding: '1.5rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1.5rem'
                }}>
                  <div style={{
                    background: 'rgba(197,160,101,0.1)',
                    border: '1px solid rgba(197,160,101,0.3)',
                    borderRadius: '10px',
                    padding: '6px 12px',
                    fontSize: '0.7rem',
                    fontWeight: '900',
                    color: '#C5A065',
                    letterSpacing: '1px',
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}>
                    {num}
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', color: 'white', marginBottom: '4px', fontSize: '0.95rem' }}>{title}</div>
                    <div style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.6 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: '2rem',
              background: 'rgba(197,160,101,0.08)',
              border: '1px solid rgba(197,160,101,0.25)',
              borderRadius: '16px',
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <Mic size={24} color="#C5A065" style={{ marginBottom: '8px' }} />
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0, lineHeight: 1.7 }}>
                La plataforma RDMLS opera bajo los principios de <strong style={{ color: '#C5A065' }}>transparencia activa</strong>, 
                acceso universal a la información pública y modernización del Estado, 
                en conformidad con la Agenda Digital Chile 2035.
              </p>
            </div>
          </div>
        )}

        {/* TAB: RUTA */}
        {activeTab === 'ruta' && (
          <div>
            <h2 style={{ textAlign: 'center', color: '#C5A065', fontSize: '1.4rem', marginBottom: '0.5rem', letterSpacing: '2px' }}>
              RUTA DE INNOVACIÓN DIGITAL
            </h2>
            <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '2.5rem', fontSize: '0.9rem' }}>
              Plan estratégico de implementación progresivo por fases
            </p>
            <div style={{ position: 'relative', paddingLeft: '2rem' }}>
              {/* Línea vertical */}
              <div style={{
                position: 'absolute',
                left: '10px',
                top: 0,
                bottom: 0,
                width: '2px',
                background: 'linear-gradient(to bottom, #C5A065, rgba(197,160,101,0.1))'
              }} />
              {[
                {
                  fase: 'FASE 1', label: 'Radio Digital Municipal', status: 'ACTIVO',
                  color: '#10b981',
                  items: ['Streaming profesional en az11.yesstreaming.net:8590', 'Ecualizador Multi-preset (Normal/Claro/Grave/V-90s)', 'VU Meters analógicos en tiempo real', 'PWA instalable en dispositivos móviles']
                },
                {
                  fase: 'FASE 2', label: 'Inducción y Gestión RRHH', status: 'ACTIVO',
                  color: '#10b981',
                  items: ['E-Learning de inducción municipal con evaluación', 'Generación de diplomas digitales firmados', 'Módulo de informes honorarios y contrata', 'Backoffice Móvil con captura fotográfica']
                },
                {
                  fase: 'FASE 3', label: 'Portal Ciudadano VLS', status: 'ACTIVO',
                  color: '#10b981',
                  items: ['Reportes georreferenciados de problemas urbanos', 'Monitor de playas y ambientes naturales', 'Acceso de vecinos con QR y panel de seguimiento', 'VLSabes: Trivia educativa de La Serena']
                },
                {
                  fase: 'FASE 4', label: 'Protocolo y Smart Events', status: 'EN DESARROLLO',
                  color: '#f59e0b',
                  items: ['Monitor de Precedencias para autoridades en tiempo real', 'Gestión de ceremonias y eventos oficiales', 'Plantillas digitales de pautas protocolares', 'Sistema de notificaciones a coordinadores']
                },
                {
                  fase: 'FASE 5', label: 'Centinel Faro (Inteligencia)', status: 'PLANIFICADO',
                  color: '#64748b',
                  items: ['Social Listening de menciones públicas', 'IA para análisis de redes sociales', 'Monitoreo de video con visión computacional', 'Alertas de reputación institucional en tiempo real']
                }
              ].map(({ fase, label, status, color, items }) => (
                <div key={fase} style={{ marginBottom: '2.5rem', position: 'relative' }}>
                  {/* Punto en la línea */}
                  <div style={{
                    position: 'absolute',
                    left: '-2rem',
                    top: '6px',
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: `${color}30`,
                    border: `2px solid ${color}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }} />
                  </div>
                  <div style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: `1px solid ${color}25`,
                    borderRadius: '16px',
                    padding: '1.5rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem', flexWrap: 'wrap' }}>
                      <span style={{
                        fontSize: '0.6rem',
                        fontWeight: '900',
                        color: '#C5A065',
                        letterSpacing: '2px',
                        background: 'rgba(197,160,101,0.1)',
                        padding: '3px 10px',
                        borderRadius: '6px'
                      }}>{fase}</span>
                      <span style={{ fontWeight: '700', color: 'white', fontSize: '1rem' }}>{label}</span>
                      <span style={{
                        fontSize: '0.6rem',
                        fontWeight: '700',
                        color: color,
                        background: `${color}20`,
                        padding: '3px 10px',
                        borderRadius: '20px',
                        border: `1px solid ${color}50`,
                        marginLeft: 'auto'
                      }}>{status}</span>
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {items.map((item, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.82rem', color: '#94a3b8' }}>
                          <ChevronRight size={12} color={color} style={{ marginTop: '3px', flexShrink: 0 }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer style={{
        background: 'rgba(0,0,0,0.5)',
        borderTop: '1px solid rgba(197,160,101,0.2)',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <img src="/escudo.png" alt="IMLS" style={{ height: '24px', opacity: 0.7 }} />
          <span style={{ color: '#64748b', fontSize: '0.8rem' }}>
            © 2026 I. Municipalidad de La Serena · RDMLS · Smart Municipality Platform
          </span>
        </div>
        <p style={{ color: '#334155', fontSize: '0.7rem', margin: 0 }}>
          Sistema de código abierto desarrollado para la innovación municipal de La Serena · rdmls.cl
        </p>
      </footer>
    </div>
  );
}
