import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Radio, Zap, ArrowLeft, AlertTriangle, Beaker,
  Signal, Headphones, Activity, Globe, Smartphone,
  Volume2, BarChart3, Shield, ChevronRight, Clock
} from 'lucide-react';
import CentroRadio from './CentroRadio/index.jsx';

/**
 * rdmls.cl/dev — Sandbox de innovación RDMLS
 * Envuelve CentroRadio con banner de entorno DEV visible
 * Solo para personal técnico IMLS / testers autorizados
 */
export default function CentroRadioDev() {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(
    () => sessionStorage.getItem('rdmls_dev_ok') === 'true'
  );

  const DEV_FEATURES = [
    { icon: Volume2,    label: 'Ecualizador Expanded',  desc: 'Presets adicionales BRILLIANT, BASS BOOST, RADIO FM' },
    { icon: BarChart3,  label: 'Spectrum 3D Canvas',     desc: 'Visualizador de espectro de 128 barras a 60fps' },
    { icon: Activity,   label: 'VU Meters Pro',          desc: 'Medidores L/R con PPM y hold indicators' },
    { icon: Shield,     label: 'Redundancia de Stream',  desc: 'Failover automático a servidor secundario' },
    { icon: Smartphone, label: 'Mini-Player Flotante',   desc: 'Widget persistente collapsable en todas las rutas' },
    { icon: Globe,      label: 'Contador de Oyentes',    desc: 'Dato en tiempo real desde API AzuraCast' },
    { icon: Signal,     label: 'Now Playing Avanzado',   desc: 'Metadatos del tema en emisión via ICY metadata' },
    { icon: Clock,      label: 'Reloj 12h/24h',          desc: 'Toggle persistente en localStorage del usuario' },
  ];

  // ── Gate de acceso DEV ──────────────────────────────────────────────
  if (!accepted) return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at top, #111827, #030712)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Segoe UI', Roboto, sans-serif", padding: '2rem', color: 'white'
    }}>
      {/* BANNER */}
      <div style={{
        background: 'rgba(16,185,129,0.1)', border: '2px solid rgba(16,185,129,0.4)',
        borderRadius: '16px', padding: '1rem 2rem', display: 'flex', alignItems: 'center',
        gap: '10px', marginBottom: '2rem', maxWidth: '520px', width: '100%'
      }}>
        <Zap size={22} color="#10b981" style={{ flexShrink: 0 }} />
        <div>
          <div style={{ fontWeight: '900', color: '#10b981', fontSize: '0.8rem', letterSpacing: '2px' }}>
            🧪 ENTORNO DE DESARROLLO
          </div>
          <div style={{ fontSize: '0.7rem', color: '#059669', marginTop: '3px' }}>
            rdmls.cl/dev · Solo para personal técnico IMLS autorizado
          </div>
        </div>
      </div>

      <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>🛠️</div>
      <h1 style={{ color: '#10b981', fontSize: '1.2rem', fontWeight: '900', letterSpacing: '2px', textAlign: 'center', margin: '0 0 0.4rem' }}>
        RDMLS · SANDBOX DEV
      </h1>
      <p style={{ color: '#475569', fontSize: '0.78rem', textAlign: 'center', marginBottom: '2rem', maxWidth: '420px', lineHeight: 1.6 }}>
        Este entorno contiene funcionalidades experimentales en prueba antes de ser promovidas
        a producción en <strong style={{ color: '#94a3b8' }}>rdmls.cl</strong>.
        El comportamiento puede ser inestable.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.7rem', maxWidth: '520px', width: '100%', marginBottom: '2rem' }}>
        {DEV_FEATURES.slice(0, 4).map(({ icon: Icon, label, desc }) => (
          <div key={label} style={{
            background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)',
            borderRadius: '12px', padding: '0.9rem', display: 'flex', gap: '8px', alignItems: 'flex-start'
          }}>
            <Icon size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontWeight: '700', color: 'white', fontSize: '0.78rem' }}>{label}</div>
              <div style={{ color: '#475569', fontSize: '0.68rem', marginTop: '2px', lineHeight: 1.4 }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', width: '100%', maxWidth: '320px' }}>
        <button onClick={() => { sessionStorage.setItem('rdmls_dev_ok', 'true'); setAccepted(true); }} style={{
          background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none',
          borderRadius: '12px', padding: '14px', color: 'white', fontWeight: '900',
          fontSize: '0.9rem', letterSpacing: '2px', cursor: 'pointer'
        }}>
          🧪 INGRESAR A SANDBOX
        </button>
        <button onClick={() => navigate('/')} style={{
          background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px',
          padding: '12px', color: '#475569', cursor: 'pointer', fontSize: '0.8rem'
        }}>← Volver a rdmls.cl (producción)</button>
      </div>
    </div>
  );

  // ── Sandbox activo: CentroRadio real + banner flotante ─────────────
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Banner DEV flotante */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
        background: 'rgba(16,185,129,0.95)', backdropFilter: 'blur(10px)',
        padding: '6px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Zap size={14} color="white" />
          <span style={{ color: 'white', fontSize: '0.7rem', fontWeight: '800', letterSpacing: '2px' }}>
            🧪 RDMLS DEV SANDBOX — Entorno de pruebas · No es producción
          </span>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button onClick={() => navigate('/opciones')} style={{
            background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white',
            borderRadius: '6px', padding: '3px 10px', fontSize: '0.65rem', cursor: 'pointer', fontWeight: '700'
          }}>DOCS →</button>
          <button onClick={() => navigate('/')} style={{
            background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white',
            borderRadius: '6px', padding: '3px 10px', fontSize: '0.65rem', cursor: 'pointer', fontWeight: '700'
          }}>PRODUCCIÓN →</button>
        </div>
      </div>
      {/* Espaciador para el banner */}
      <div style={{ height: '32px' }} />
      {/* Radio player real */}
      <CentroRadio isDevMode={true} />
    </div>
  );
}
