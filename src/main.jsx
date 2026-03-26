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
import VLSGameMain from './components/VLSGameMain.jsx';
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
import Serenito1945Page from './pages/Serenito1945Page.jsx';
import VLSQuantumWatch from './components/VLSQuantumWatch';
import VLSConsoleSound from './components/VLSConsoleSound';
import DevPortal from './pages/DevPortal';
import RDMLSOpciones from './pages/RDMLSOpciones.jsx';
import BellaDashboard from './pages/BellaDashboard.jsx';
import { Activity } from 'lucide-react';
import './index.css';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (let registration of registrations) {
      registration.unregister();
    }
  });
}

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
      const reloadCnt = parseInt(sessionStorage.getItem('chunk_reload_cnt') || '0', 10);
      if (reloadCnt < 2) {
        sessionStorage.setItem('chunk_reload_cnt', reloadCnt + 1);
        this.intervalRef = setInterval(() => {
          this.setState(prev => {
            if (prev.countdown <= 1) {
              clearInterval(this.intervalRef);
              window.location.reload();
              return prev;
            }
            return { countdown: prev.countdown - 1 };
          });
        }, 1000);
      } else {
        // Stop infinite reloading loop if it's already failed twice
        this.setState({ countdown: 0 });
      }
    }
  }

  componentWillUnmount() {
    if (this.intervalRef) clearInterval(this.intervalRef);
  }

  render() {
    if (this.state.hasError) {
      if (this.state.isChunkError) {
        return (
          <div style={{ padding: '3rem', textAlign: 'center', background: '#0f172a', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'sans-serif' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔄</div>
            <h2 style={{ color: '#38bdf8', marginBottom: '0.5rem' }}>Actualizando...</h2>
            {this.state.countdown > 0 ? (
              <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>Recargando en <strong style={{color:'white'}}>{this.state.countdown}</strong>s</p>
            ) : (
              <p style={{ color: '#ef4444', marginBottom: '1rem' }}>Error de conexión. Por favor, borre la caché de su navegador o espere unos minutos.</p>
            )}
            <button onClick={() => { sessionStorage.setItem('chunk_reload_cnt', '0'); window.location.reload(); }} style={{ marginTop: '2rem', background: '#38bdf8', color: '#0f172a', border: 'none', padding: '0.8rem 2rem', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer' }}>Forzar Actualización</button>
          </div>
        );
      }
      return (
        <div style={{ padding: '2rem', color: 'white', background: '#020617', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
          <Activity size={80} color="#38bdf8" style={{ marginBottom: '2rem', opacity: 0.8 }} />
          <h2 style={{ color: '#38bdf8', marginBottom: '1rem' }}>Sincronizando Sistema...</h2>
          <p style={{ color: '#94a3b8', maxWidth: '400px', marginBottom: '2rem' }}>Se ha detectado un ajuste necesario en la señal. Pulsa el botón para restaurar el portal.</p>
          <button 
            onClick={() => { sessionStorage.clear(); window.location.reload(); }}
            style={{ padding: '1rem 3rem', background: 'linear-gradient(90deg, #38bdf8, #1d4ed8)', border: 'none', borderRadius: '30px', color: 'white', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 10px 20px rgba(56, 189, 248, 0.3)' }}
          >
            RESTAURAR SEÑAL
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const host = (window.location.hostname || window.location.host || '').toLowerCase();
const isRdmlsDns = host.includes('rdmls') || (host.includes('laserena.cl') && !host.includes('vecinos'));
const isPuertaDns = host.includes('puertasmart.cl');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
    <LanguageProvider>
      <BrowserRouter>
        {(location.pathname !== '/induccion' && location.pathname !== '/induccion_imls' && location.pathname !== '/vlsabes' && !isRdmlsDns) && <VLSQuantumWatch isRDMLS={isRdmlsDns} />}
        {isRdmlsDns ? (
          <Routes>
            <Route path="/welcome" element={<Navigate to="/" replace />} />
            <Route path="/induccion" element={<Induccion26 isRDMLS={isRdmlsDns} />} />
            <Route path="/opciones" element={<RDMLSOpciones />} />
            <Route path="/" element={<CentroRadio />} />
            <Route path="/vlsabes" element={<VLSGameMain onClose={() => window.location.href = '/'} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        ) : isPuertaDns ? (
          <Routes>
            <Route path="/" element={<Navigate to="/puerta" replace />} />
            <Route path="/puerta" element={<PuertaSmart />} />
            <Route path="/induccion" element={<Induccion26 isRDMLS={isRdmlsDns} />} />
            <Route path="/vlsabes" element={<VLSGameMain onClose={() => window.location.href = '/'} />} />
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
              <Route path="inversores" element={<FaritoInversores />} />
              <Route path="legacy" element={<LegacyPortal />} />
              <Route path="serenamet" element={<Serenamet />} />
              <Route path="propiedades" element={<Propiedades />} />
              <Route path="acceso" element={<PuertaSerena />} />
              <Route path="dev" element={<DevPortal />} />
              <Route path="motors" element={<VLSMotorsShowroom />} />
              <Route path="induccion" element={<Induccion26 isRDMLS={isRdmlsDns} />} />
            </Route>
            <Route path="/puerta" element={<PuertaSmart />} />
            <Route path="/bisabuelo" element={<GameVLS />} />
            <Route path="/vlsabes" element={<VLSGameMain onClose={() => window.location.href = '/'} />} />
            <Route path="/radios" element={<App />}>
              <Route index element={<HubDashboard />} />
            </Route>
            <Route path="/bella" element={<BellaDashboard />} />
            <Route path="/1945" element={<Serenito1945Page />} />
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
