import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Network, ExternalLink, Map, Layers, Zap, Info, 
  MessageSquare, Radio, Shield, Globe, Users, 
  Landmark, ShoppingCart, Smartphone, Activity,
  ChevronRight, ChevronDown, TreeDeciduous, 
  Search, Package, BookOpen, Anchor, Plane, 
  Ruler, MapPin, Newspaper, PlayCircle, Palette, 
  Music, ShieldAlert, LineChart, Fuel, GraduationCap, Sun,
  Move
} from 'lucide-react';

const SITEMAP_DATA = [
  {
    id: 'core',
    title: 'NÚCLEO Y DASHBOARD',
    icon: <Globe size={20} />,
    color: '#38bdf8',
    links: [
      { name: 'Smart Hub Principal', url: '/', icon: <Layers size={14} />, description: 'Portal unificado de comunicaciones' },
      { name: 'Punto Vecinal', url: '/punto', icon: <MapPin size={14} />, description: 'Mapa interactivo de reportes' },
      { name: 'Dashboard Vecino', url: '/vecinos', icon: <Users size={14} />, description: 'Perfil y gestiones personales' },
      { name: 'Atención Ciudadana', url: '/citizens', icon: <Smartphone size={14} />, description: 'Portal de trámites y reportes' },
    ]
  },
  {
    id: 'apps',
    title: 'MÓDULOS SMART (ACCESO DIRECTO)',
    icon: <Zap size={20} />,
    color: '#fbbf24',
    links: [
      { name: 'Vecinity Pay', url: '/?app=vecinity-pay', icon: <ShoppingCart size={14} />, description: 'Recarga de fichas y suscripciones' },
      { name: 'Memorial Hijos Ilustres', url: '/?app=memorial', icon: <TreeDeciduous size={14} />, description: 'Homenaje a figuras regionales' },
      { name: 'Paseo 3D / Walk', url: '/?app=walk', icon: <Move size={14} />, description: 'Tour virtual histórico' },
      { name: 'Cuadro de Distancias', url: '/?app=distances', icon: <Ruler size={14} />, description: 'Trayectos y rutas de la región' },
      { name: 'Faro IA (Chat)', url: '/?app=chat', icon: <MessageSquare size={14} />, description: 'Asistente inteligente 24/7' },
      { name: 'Backoffice Móvil', url: '/?app=backoffice', icon: <Smartphone size={14} />, description: 'Gestión in situ para operadores' },
    ]
  },
  {
    id: 'news',
    title: 'HEMEROTECA Y NOTICIAS',
    icon: <Newspaper size={20} />,
    color: '#10b981',
    links: [
      { name: 'Especial Semana Santa', url: '/?news=semanasanta', icon: <Sun size={14} />, description: 'Reporte de despliegue y contingencia' },
      { name: 'Informe Bencinazo', url: '/?news=bencinazo', icon: <Fuel size={14} />, description: 'Análisis de precios y mercado local' },
      { name: 'Investigación VLS', url: '/?news=investigacion', icon: <Search size={14} />, description: 'Reportajes de profundidad' },
      { name: 'Sentinel Report', url: '/?news=sentinel', icon: <Shield size={14} />, description: 'Monitoreo de seguridad y RRSS' },
    ]
  },
  {
    id: 'education',
    title: 'ACADEMIA Y CULTURA',
    icon: <GraduationCap size={20} />,
    color: '#a855f7',
    links: [
      { name: 'Portal de Inducción', url: '/induccion', icon: <BookOpen size={14} />, description: 'Capacitación institucional' },
      { name: 'E-learning VLS', url: '/elearning', icon: <PlayCircle size={14} />, description: 'Cursos y formación ciudadana' },
      { name: 'Escuela de Música', url: '/escuela-musica', icon: <Music size={14} />, description: 'Formación artística regional' },
      { name: 'Escuela de Artes', url: '/escuela-artes', icon: <Palette size={14} />, description: 'Talleres creativos comunitarios' },
    ]
  },
  {
    id: 'specialized',
    title: 'MONITOREO ESTRATÉGICO',
    icon: <Activity size={20} />,
    color: '#ef4444',
    links: [
      { name: 'Sentinel Apex (Admin)', url: '/?app=sentinel', icon: <ShieldAlert size={14} />, description: 'Inteligencia social de elite' },
      { name: 'Monitor de Puerto', url: '/?app=port', icon: <Anchor size={14} />, description: 'Seguimiento naviero en tiempo real' },
      { name: 'Monitor Aeropuerto', url: '/?app=airport', icon: <Plane size={14} />, description: 'Vuelos La Florida (SCSE)' },
      { name: 'Analytics Dashboard', url: '/?app=analytics', icon: <LineChart size={14} />, description: 'Métricas de la red comunal' },
    ]
  }
];

// Final of helper section removal

export default function Sitemap() {
  const [expanded, setExpanded] = useState(['core', 'apps']);
  const [search, setSearch] = useState('');

  const toggle = (id) => {
    setExpanded(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const filteredData = SITEMAP_DATA.map(section => ({
    ...section,
    links: section.links.filter(l => 
      l.name.toLowerCase().includes(search.toLowerCase()) || 
      l.description.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(section => section.links.length > 0);

  return (
    <div className="sitemap-page" style={{ 
      minHeight: '100vh', 
      background: '#020617', 
      color: 'white', 
      fontFamily: 'Outfit, sans-serif',
      padding: '4rem 2rem'
    }}>
      <style>{`
        .sitemap-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }
        .sitemap-card {
          background: rgba(30, 41, 59, 0.4);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .sitemap-card:hover {
          border-color: rgba(255,255,255,0.2);
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .link-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.02);
          text-decoration: none;
          color: #94a3b8;
          transition: all 0.2s ease;
        }
        .link-item:hover {
          background: rgba(255,255,255,0.05);
          color: white;
        }
        .link-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(148, 163, 184, 0.1);
        }
        .search-bar {
          max-width: 600px;
          margin: 0 auto 3rem auto;
          position: relative;
        }
        .search-input {
          width: 100%;
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(56, 189, 248, 0.3);
          padding: 1rem 3rem;
          border-radius: 50px;
          color: white;
          outline: none;
          font-size: 1.1rem;
        }
        .search-input:focus {
          border-color: #38bdf8;
          box-shadow: 0 0 15px rgba(56, 189, 248, 0.2);
        }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'inline-block', padding: '0.5rem 1.5rem', background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '1rem', border: '1px solid rgba(56, 189, 248, 0.2)' }}
        >
          SISTEMA DE NAVEGACIÓN INTELIGENTE
        </motion.div>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.05em' }}>Mapa Estelar del <span style={{ color: '#38bdf8' }}>Ecosistema VLS</span></h1>
        <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
          Visualización viva de todos los módulos, reportes y servicios de vecinoslaserena.cl. Acceso rápido y soberanía digital.
        </p>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <Search style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={20} />
        <input 
          type="text" 
          placeholder="Buscar módulo, sección o función..." 
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Interactive Navigation Tree Visualization (Ultra Liviano) */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 4rem auto', padding: '2rem', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '30px', border: '1px solid rgba(56, 189, 248, 0.1)' }}>
        <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}><Network color="#38bdf8" /> Árbol de Conectividad VLS</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          {SITEMAP_DATA.map(section => (
            <motion.div 
              key={section.id}
              whileHover={{ scale: 1.05 }}
              onClick={() => toggle(section.id)}
              style={{ 
                padding: '1rem 2rem', 
                background: section.color + '15', 
                border: `1px solid ${section.color}30`, 
                borderRadius: '15px', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <div style={{ color: section.color }}>{section.icon}</div>
              <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{section.title}</span>
              <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>({section.links.length})</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sections Grid */}
      <div className="sitemap-grid">
        {filteredData.map((section, idx) => (
          <motion.div 
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="sitemap-card"
          >
            <div 
              onClick={() => toggle(section.id)}
              style={{ 
                padding: '1.5rem', 
                background: section.color + '08', 
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ color: section.color }}>{section.icon}</div>
                <h2 style={{ fontSize: '1rem', fontWeight: 900, margin: 0, letterSpacing: '0.05em' }}>{section.title}</h2>
              </div>
              {expanded.includes(section.id) ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </div>

            <AnimatePresence>
              {expanded.includes(section.id) && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  style={{ overflow: 'hidden' }}
                >
                  {section.links.map(link => (
                    <a key={link.name} href={link.url} className="link-item">
                      <div className="link-icon">{link.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ color: 'white', fontWeight: 'bold', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          {link.name}
                          <ExternalLink size={12} opacity={0.3} />
                        </div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>{link.description}</div>
                      </div>
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Footer Meta */}
      <div style={{ textAlign: 'center', marginTop: '6rem', opacity: 0.3, fontSize: '0.8rem' }}>
        © 2026 Ecosistema Municipal La Serena · Infraestructura Crítica Sberana
      </div>
    </div>
  );
}
