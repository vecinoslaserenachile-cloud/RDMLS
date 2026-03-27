import React, { useState, useEffect, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
import RDMLSOpcionesV2026 from './pages/RDMLSOpcionesV2026.jsx';
import VETcinos from './pages/VETcinos.jsx';
import Pincha from './pages/Pincha.jsx';
import SatelliteIntelligence from './pages/SatelliteIntelligence.jsx';
import PlazaVecinal from './pages/PlazaVecinal.jsx';
import SerenaMetPlus from './pages/SerenaMetPlus.jsx';
import CentroRadioDev from './pages/CentroRadioDev.jsx';
import BellaDashboard from './pages/BellaDashboard.jsx';
import EntrevecinasHub from './pages/EntrevecinasHub.jsx';
import PirataSmart from './pages/PirataSmart.jsx';
import { Activity } from 'lucide-react';
import './index.css';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (let registration of registrations) {
      registration.unregister();
    }
  });
}

import LoadingScreen from './components/LoadingScreen';


const GlobalOmniSyncOverlay = () => {
    const [active, setActive] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => setActive(false), 2000);
        return () => clearTimeout(timer);
    }, []);
    if (!active) return null;
    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000000, background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LoadingScreen isSyncing={true} />
        </div>
    );
};

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

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', color: 'white', background: '#020617', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', fontFamily: 'Inter, sans-serif' }}>
          <div style={{ maxWidth: '800px', width: '100%', position: 'relative', zIndex: 10 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '3rem', alignItems: 'center' }}>
                <div style={{ textAlign: 'left' }}>
                    <div style={{ width: '80px', height: '3px', background: '#38bdf8', marginBottom: '2rem' }}></div>
                    <h2 style={{ color: '#38bdf8', fontSize: '3rem', fontWeight: '900', letterSpacing: '-0.05em', marginBottom: '1rem', lineHeight: 1 }}>SISTEMA EN <br/><span style={{ color: 'white' }}>MANTENIMIENTO</span></h2>
                    <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                        Estamos resolviendo un conflicto en la señal. Vuelve en un momento.
                    </p>
                    <button onClick={() => window.location.reload()} style={{ padding: '1rem 2rem', background: '#38bdf8', border: 'none', borderRadius: '15px', color: '#020617', fontWeight: '900', cursor: 'pointer' }}>
                        REINTENTAR AHORA
                    </button>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '30px', padding: '2.5rem' }}>
                    <h3 style={{ color: 'white', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '1.5rem', letterSpacing: '0.1em' }}>REPORTE C5 AUTOMÁTICO</h3>
                    <code style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'block', wordBreak: 'break-all' }}>
                        {this.state.error?.message}
                    </code>
                </div>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const host = (window.location.hostname || window.location.host || '').toLowerCase();
const isRdmlsDns = host.includes('rdmls') || (host.includes('laserena.cl') && !host.includes('vecinos'));
const isPuertaDns = host.includes('puertasmart.cl');
const isEntrevecinasDns = host.includes('entrevecinas.cl');
const isPirataDns = host.includes('comunasmart.cl') || host.includes('piratasmart.cl');
const isProtocoloDns = host.includes('eventosmart.cl') || host.includes('protocolosmart.cl');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <LanguageProvider>
        <BrowserRouter>
          <GlobalOmniSyncOverlay />
          <Routes>
            {/* Rutas para Dominios Específicos */}
            {isRdmlsDns ? (
              <>
                <Route path="/induccion" element={<Induccion26 isRDMLS={true} />} />
                <Route path="/opciones" element={<RDMLSOpciones />} />
                <Route path="/flash-opciones" element={<RDMLSOpcionesV2026 />} />
                <Route path="/vetcino" element={<VETcinos />} />
                <Route path="/pincha" element={<Pincha />} />
                <Route path="/satellite" element={<SatelliteIntelligence />} />
                <Route path="/plaza" element={<PlazaVecinal />} />
                <Route path="/dev" element={<CentroRadioDev />} />
                <Route path="/" element={<CentroRadio />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            ) : isPuertaDns ? (
              <>
                <Route path="/" element={<PuertaSmart />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            ) : isEntrevecinasDns ? (
              <>
                <Route path="/" element={<EntrevecinasHub />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            ) : (isPirataDns || isProtocoloDns) ? (
              <>
                <Route path="/" element={isPirataDns ? <PirataSmart /> : <Protocolo />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            ) : (
              <>
                {/* Ruta Maestra para Todos los Demás (Aplica Layout de App) */}
                <Route path="/" element={<App />}>
                  <Route index element={<HubDashboard />} />
                  <Route path="punto" element={<PuntoVecinal />} />
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
                  <Route path="eventos" element={<Protocolo />} />
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
                  <Route path="induccion" element={<Induccion26 isRDMLS={false} />} />
                  <Route path="vetcino" element={<VETcinos />} />
                  <Route path="pincha" element={<Pincha />} />
                  <Route path="satellite" element={<SatelliteIntelligence />} />
                  <Route path="plaza" element={<PlazaVecinal />} />
                  <Route path="serenametplus" element={<SerenaMetPlus />} />
                  <Route path="entrevecinas" element={<EntrevecinasHub />} />
                </Route>
                <Route path="/welcome" element={<WelcomePortal />} />
                <Route path="/welcome" element={<WelcomePortal />} />
                <Route path="/smart-setup" element={<SuperAdminSetup />} />
                <Route path="/bisabuelo" element={<GameVLS />} />
                <Route path="/vlsabes" element={<VLSGameMain onClose={() => window.location.href = '/'} />} />
                <Route path="/bella" element={<BellaDashboard />} />
                <Route path="/1945" element={<Serenito1945Page />} />
                <Route path="/lite" element={<LitePortal />} />
                <Route path="/sombreros" element={<DeBonoThinkingHats />} />
                <Route path="/desk" element={<Backoffice />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
