import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.jsx';
import { LanguageProvider } from './context/LanguageContext';
import Citizens from './pages/Citizens.jsx';
import Backoffice from './pages/Backoffice.jsx';
import LegacyPortal from './pages/LegacyPortal.jsx';
import Admin from './pages/Admin.jsx';
import HubDashboard from './pages/HubDashboard.jsx';
import VecinoDashboard from './pages/VecinoDashboard.jsx';
import Panoramas from './pages/Panoramas.jsx';
import Emprende from './pages/Emprende.jsx';
import Elearning from './pages/Elearning.jsx';
import LitePortal from './pages/LitePortal.jsx';
import SeniorGames from './pages/SeniorGames.jsx';
import GenealogyPortal from './pages/GenealogyPortal.jsx';
import Glosario from './pages/Glosario.jsx';
import CommunicationsHub from './pages/CommunicationsHub.jsx';
import PuertaSerena from './pages/PuertaSerena.jsx';
import Honorarios from './pages/Honorarios.jsx';
import PuntoVecinal from './pages/PuntoVecinal/index.jsx';
import CentroRadio from './pages/CentroRadio/index.jsx';
import AdminRadio from './pages/AdminRadio/index.jsx';
import Protocolo from './pages/Protocolo.jsx';
import SmartSalud from './pages/SmartSalud.jsx';
import WelcomePortal from './pages/WelcomePortal.jsx';
import SuperAdminSetup from './pages/SuperAdminSetup.jsx';
import HomeLiviano from './pages/HomeLiviano.jsx';
import ProspeccionComercial from './pages/ProspeccionComercial.jsx';
import FaritoHome from './pages/FaritoHome.jsx';
import FaritoInversores from './pages/FaritoInversores.jsx';
import BroadcastMaster from './pages/BroadcastMaster.jsx';
import MediaPlus from './pages/MediaPlus.jsx';
import PuertaSmart from './pages/PuertaSmart.jsx';
import PegatinasVecinales from './pages/PegatinasVecinales/index.jsx';
import EscuelaMusicaVecinal from './pages/EscuelaMusicaVecinal.jsx';
import EscuelaArtesHumanidades from './pages/EscuelaArtesHumanidades.jsx';
import MusicaPage from './pages/MusicaPage.jsx';
import ArquitecturaPage from './pages/ArquitecturaPage.jsx';
import Serenamet from './pages/Serenamet.jsx';
import Propiedades from './pages/Propiedades.jsx';
import DeBonoThinkingHats from './components/DeBonoThinkingHats.jsx';
import GameVLS from './pages/GameVLS.jsx';
import VLSMotorsShowroom from './pages/VLSMotorsShowroom.jsx';
import VLSInduccion from './pages/VLSInduccion.jsx';
import Induccion26 from './pages/Induccion26.jsx';
import VLSQuantumWatch from './components/VLSQuantumWatch';
import VLSConsoleSound from './components/VLSConsoleSound'; // Added import for VLSConsoleSound
import DevPortal from './pages/DevPortal';
import { AlertTriangle, X as CloseIcon, Calendar, Activity } from 'lucide-react';
import './index.css';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (let registration of registrations) {
      registration.unregister();
    }
  });
}
if (window.caches) {
  caches.keys().then(function (names) {
    for (let name of names) {
      if (name.includes('smart') || name.includes('workbox') || name.includes('pwa')) {
        caches.delete(name);
      }
    }
  });
}

// Auto-reload cuando falla un chunk dinámico (cache drift post-deploy)
window.addEventListener('unhandledrejection', (event) => {
  const msg = event?.reason?.message || '';
  if (msg.includes('Failed to fetch dynamically imported module') || msg.includes('Importing a module script failed')) {
    console.warn('[VLS] Chunk desactualizado detectado, recargando...');
    // Evitar loops infinitos: solo recargar si no se ha recargado en los últimos 10s
    const lastReload = sessionStorage.getItem('chunk_reload_ts');
    const now = Date.now();
    if (!lastReload || now - parseInt(lastReload) > 10000) {
      sessionStorage.setItem('chunk_reload_ts', now.toString());
      window.location.reload();
    }
  }
});

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, isChunkError: false, countdown: 3 };
    this.intervalRef = null;
  }

  static getDerivedStateFromError(error) {
    const isChunk = error?.message?.includes('Failed to fetch dynamically imported module') ||
                    error?.message?.includes('Importing a module script failed') ||
                    error?.name === 'ChunkLoadError';
    return { hasError: true, error, isChunkError: isChunk };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary:", error, errorInfo);
    if (this.state.isChunkError) {
      this.intervalRef = setInterval(() => {
        this.setState(prev => {
          if (prev.countdown <= 1) {
            clearInterval(this.intervalRef);
            const lastReload = sessionStorage.getItem('chunk_reload_ts');
            const now = Date.now();
            if (!lastReload || now - parseInt(lastReload) > 10000) {
              sessionStorage.setItem('chunk_reload_ts', now.toString());
              window.location.reload();
            }
            return prev;
          }
          return { countdown: prev.countdown - 1 };
        });
      }, 1000);
    }
  }

  componentWillUnmount() {
    if (this.intervalRef) clearInterval(this.intervalRef);
  }

  render() {
    const isRDMLS = window.location.hostname.includes('rdmls'); // Define isRDMLS here for use in render
    if (this.state.hasError) {
      if (this.state.isChunkError) {
        return (
          <div style={{ padding: '3rem', textAlign: 'center', background: '#0f172a', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'sans-serif' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔄</div>
            <h2 style={{ color: '#38bdf8', marginBottom: '0.5rem' }}>Actualizando VLS...</h2>
            <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>Se detectó una nueva versión. Recargando en <strong style={{color:'white'}}>{this.state.countdown}</strong>s</p>
            <div style={{ width: '200px', height: '4px', background: '#1e293b', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: '#38bdf8', width: `${(this.state.countdown / 3) * 100}%`, transition: 'width 1s linear' }}></div>
            </div>
            <button onClick={() => window.location.reload()} style={{ marginTop: '2rem', background: '#38bdf8', color: '#0f172a', border: 'none', padding: '0.8rem 2rem', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer' }}>Recargar Ahora</button>
          </div>
        );
      }
      return (
        <div style={{ padding: '2rem', color: 'white', background: '#020617', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
          {/* Ilustración Ultra-Liviana Branding */}
          <div style={{ position: 'relative', marginBottom: '3rem' }}>
            <div style={{ position: 'absolute', inset: '-20px', background: 'radial-gradient(circle, #38bdf820 0%, transparent 70%)', filter: 'blur(15px)' }}></div>
            <Activity size={80} color="#38bdf8" style={{ position: 'relative', opacity: 0.8 }} />
          </div>

                    <div>
                        <h3 style={{ margin: 0, color: 'white', fontSize: '1.2rem', fontWeight: '900', letterSpacing: '1px' }}>
                            {isRDMLS ? 'RDMLS - RADIO DIGITAL MUNICIPAL' : 'RADIO VECINOS LA SERENA'}
                        </h3>
            <h1 style={{ color: 'white', fontSize: '2rem', fontWeight: '900', marginBottom: '1rem', letterSpacing: '-1px' }}>Sincronizando con la última versión</h1>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2.5rem' }}>
              Estamos actualizando los módulos de la ComunaSmart para garantizar tu seguridad y la mejor experiencia en <strong>vecinoslaserena.cl</strong>.
            </p>
            
            {/* Soft Debug Info */}
            <div style={{ marginBottom: '3rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)', fontWeight: 'bold' }}>
             {/* VLSound — siempre encendido para VLS y RDMLS */}
      {!window.location.pathname.includes('/induccion') && !window.location.pathname.includes('/induccion_imls') && (
        <VLSConsoleSound 
           onOpenRadio={() => { window.dispatchEvent(new CustomEvent('stop-all-audio')); /* setShowRadio(true); */ }} 
           onOpenTV={() => { window.dispatchEvent(new CustomEvent('stop-all-audio')); /* setShowRetroTV(true); */ }}
           onClose={() => {}}
           isRDMLS={isRDMLS} // Pass isRDMLS prop
        />
      )}
            </div>

            <button 
              onClick={() => {
                sessionStorage.clear();
                window.location.reload(true);
              }} 
              style={{ 
                background: 'linear-gradient(135deg, #38bdf8 0%, #1d4ed8 100%)', color: 'white', border: 'none', 
                padding: '1.2rem 3rem', borderRadius: '20px', fontWeight: '900', fontSize: '1rem', cursor: 'pointer', 
                boxShadow: '0 10px 30px rgba(56, 189, 248, 0.4)', transition: 'all 0.3s'
              }}
            >
              SINCRONIZAR AHORA
            </button>
            
            <p style={{ marginTop: '3rem', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
              Soberanía Digital La Serena 2026
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function GlobalWarning() {
  return null;
}

import BellaDashboard from './pages/BellaDashboard.jsx';

const currentHost = window.location.hostname.toLowerCase();
const isPuertaDns = currentHost.includes('puertasmart.cl');
const isRdmlsDns = currentHost.includes('rdmls.cl') || currentHost.includes('rdmls');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
    <LanguageProvider>
      <BrowserRouter>
        {(!window.location.pathname.includes('/induccion') && !window.location.pathname.includes('/induccion_imls')) && <VLSQuantumWatch isRDMLS={isRdmlsDns} />}
        {isRdmlsDns ? (
          <Routes>
            <Route path="/welcome" element={<WelcomePortal />} />
            <Route path="/radio-portal" element={<Navigate to="/" replace />} />
            <Route path="/induccion" element={<VLSInduccion onClose={() => window.history.back()} />} />
            <Route path="/induccion2" element={<Induccion26 />} />
            <Route path="/induccion26" element={<Induccion26 />} />
            <Route path="/" element={<App />}>
              <Route index element={<CentroRadio />} />
            </Route>
            <Route path="/hub" element={<App />}>
              <Route index element={<HubDashboard />} />
            </Route>
            <Route path="/admin" element={<App />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        ) : isPuertaDns ? (
          <Routes>
            <Route path="/" element={<Navigate to="/puerta" replace />} />
            <Route path="/puerta" element={<PuertaSmart />} />
            <Route path="/induccion" element={<VLSInduccion onClose={() => window.history.back()} />} />
            <Route path="/induccion_imls" element={<VLSInduccion onClose={() => window.history.back()} />} />
            <Route path="*" element={<Navigate to="/puerta" replace />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/welcome" element={<WelcomePortal />} />
            <Route path="/smart-setup" element={<SuperAdminSetup />} />
            <Route path="/" element={<App />}>
              <Route index element={<HubDashboard />} />
              <Route path="punto" element={<PuntoVecinal />} />
              <Route path="hub" element={<HubDashboard />} />
              <Route path="vecinos" element={<VecinoDashboard />} />
              <Route path="citizens" element={<Citizens />} />
              <Route path="panoramas" element={<Panoramas />} />
              <Route path="eventos" element={<Panoramas />} />
              <Route path="emprende" element={<Emprende />} />
              <Route path="elearning" element={<Elearning />} />
              <Route path="senior-games" element={<SeniorGames />} />
              <Route path="genealogy" element={<GenealogyPortal />} />
              <Route path="musica" element={<MusicaPage />} />
              <Route path="escuela-musica" element={<EscuelaMusicaVecinal />} />
              <Route path="escuela-artes" element={<EscuelaArtesHumanidades />} />
              <Route path="protocolo" element={<Protocolo />} />
              <Route path="smart-salud" element={<SmartSalud />} />
              <Route path="honorarios" element={<Honorarios />} />
              <Route path="pegatinas" element={<PegatinasVecinales />} />
              <Route path="glosario" element={<Glosario />} />
              <Route path="mediaplus" element={<MediaPlus />} />
              <Route path="rapido" element={<HomeLiviano />} />
              <Route path="juega" element={<HomeLiviano />} />
              <Route path="juego" element={<HomeLiviano />} />
              <Route path="inversores" element={<FaritoInversores />} />
              <Route path="arquitectura" element={<ArquitecturaPage />} />
              <Route path="legacy" element={<LegacyPortal />} />
              <Route path="serenamet" element={<Serenamet />} />
              <Route path="propiedades" element={<Propiedades />} />
              <Route path="acceso" element={<PuertaSerena />} />
              <Route path="dev" element={<DevPortal />} />
              <Route path="motors" element={<VLSMotorsShowroom />} />
              <Route path="induccion" element={<VLSInduccion onClose={() => window.history.back()} />} />
              <Route path="induccion_imls" element={<VLSInduccion onClose={() => window.history.back()} />} />
            </Route>
            <Route path="/puerta" element={<PuertaSmart />} />
            <Route path="/bisabuelo" element={<GameVLS />} />
            <Route path="/radios" element={<App />}>
              <Route index element={<HubDashboard />} />
            </Route>
            <Route path="/bella" element={<BellaDashboard />} />
            <Route path="/lite" element={<LitePortal />} />
            <Route path="/sombreros" element={<DeBonoThinkingHats />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/desk" element={<Backoffice />} />
          </Routes>
        )}
      </BrowserRouter>
    </LanguageProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
