import React, { useState, useEffect, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import App from './App.jsx';
import { LanguageProvider } from './context/LanguageContext';
import LoadingScreen from './components/LoadingScreen';
const Citizens = React.lazy(() => import('./pages/Citizens.jsx'));
const Backoffice = React.lazy(() => import('./pages/Backoffice.jsx'));
const LegacyPortal = React.lazy(() => import('./pages/LegacyPortal.jsx'));
const Admin = React.lazy(() => import('./pages/Admin.jsx'));
const HubDashboard = React.lazy(() => import('./pages/HubDashboard.jsx'));
const VecinoDashboard = React.lazy(() => import('./pages/VecinoDashboard.jsx'));
const Panoramas = React.lazy(() => import('./pages/Panoramas.jsx'));
const Emprende = React.lazy(() => import('./pages/Emprende.jsx'));
const Elearning = React.lazy(() => import('./pages/Elearning.jsx'));
const LitePortal = React.lazy(() => import('./pages/LitePortal.jsx'));
const SeniorGames = React.lazy(() => import('./pages/SeniorGames.jsx'));
const GenealogyPortal = React.lazy(() => import('./pages/GenealogyPortal.jsx'));
const Glosario = React.lazy(() => import('./pages/Glosario.jsx'));
const CommunicationsHub = React.lazy(() => import('./pages/CommunicationsHub.jsx'));
const PuertaSerena = React.lazy(() => import('./pages/PuertaSerena.jsx'));
const VLSGameMain = React.lazy(() => import('./components/VLSGameMain.jsx'));
const Honorarios = React.lazy(() => import('./pages/Honorarios.jsx'));
const PuntoVecinal = React.lazy(() => import('./pages/PuntoVecinal/index.jsx'));
const CentroRadio = React.lazy(() => import('./pages/CentroRadio/index.jsx'));
const AdminRadio = React.lazy(() => import('./pages/AdminRadio/index.jsx'));
const Protocolo = React.lazy(() => import('./pages/Protocolo.jsx'));
const SmartSalud = React.lazy(() => import('./pages/SmartSalud.jsx'));
const WelcomePortal = React.lazy(() => import('./pages/WelcomePortal.jsx'));
const SuperAdminSetup = React.lazy(() => import('./pages/SuperAdminSetup.jsx'));
const HomeLiviano = React.lazy(() => import('./pages/HomeLiviano.jsx'));
const ProspeccionComercial = React.lazy(() => import('./pages/ProspeccionComercial.jsx'));
const FaritoHome = React.lazy(() => import('./pages/FaritoHome.jsx'));
const FaritoInversores = React.lazy(() => import('./pages/FaritoInversores.jsx'));
const BroadcastMaster = React.lazy(() => import('./pages/BroadcastMaster.jsx'));
const MediaPlus = React.lazy(() => import('./pages/MediaPlus.jsx'));
const PuertaSmart = React.lazy(() => import('./pages/PuertaSmart.jsx'));
const PegatinasVecinales = React.lazy(() => import('./pages/PegatinasVecinales/index.jsx'));
const EscuelaMusicaVecinal = React.lazy(() => import('./pages/EscuelaMusicaVecinal.jsx'));
const EscuelaArtesHumanidades = React.lazy(() => import('./pages/EscuelaArtesHumanidades.jsx'));
const MusicaPage = React.lazy(() => import('./pages/MusicaPage.jsx'));
const ArquitecturaPage = React.lazy(() => import('./pages/ArquitecturaPage.jsx'));
const Serenamet = React.lazy(() => import('./pages/Serenamet.jsx'));
const Propiedades = React.lazy(() => import('./pages/Propiedades.jsx'));
const DeBonoThinkingHats = React.lazy(() => import('./components/DeBonoThinkingHats.jsx'));
const GameVLS = React.lazy(() => import('./pages/GameVLS.jsx'));
const VLSMotorsShowroom = React.lazy(() => import('./pages/VLSMotorsShowroom.jsx'));
const VLSInduccion = React.lazy(() => import('./pages/VLSInduccion.jsx'));
const Induccion26 = React.lazy(() => import('./pages/Induccion26.jsx'));
const Serenito1945Page = React.lazy(() => import('./pages/Serenito1945Page.jsx'));
const VLSQuantumWatch = React.lazy(() => import('./components/VLSQuantumWatch'));
const VLSConsoleSound = React.lazy(() => import('./components/VLSConsoleSound'));
const DevPortal = React.lazy(() => import('./pages/DevPortal'));
const RDMLSOpciones = React.lazy(() => import('./pages/RDMLSOpciones.jsx'));
const RDMLSOpcionesV2026 = React.lazy(() => import('./pages/RDMLSOpcionesV2026.jsx'));
const VETcinos = React.lazy(() => import('./pages/VETcinos.jsx'));
const Pincha = React.lazy(() => import('./pages/Pincha.jsx'));
const SatelliteIntelligence = React.lazy(() => import('./pages/SatelliteIntelligence.jsx'));
const PlazaVecinal = React.lazy(() => import('./pages/PlazaVecinal.jsx'));
const SerenaMetPlus = React.lazy(() => import('./pages/SerenaMetPlus.jsx'));
const CentroRadioDev = React.lazy(() => import('./pages/CentroRadioDev.jsx'));
const BellaDashboard = React.lazy(() => import('./pages/BellaDashboard.jsx'));
const EntrevecinasHub = React.lazy(() => import('./pages/EntrevecinasHub.jsx'));
const PirataSmart = React.lazy(() => import('./pages/PirataSmart.jsx'));
const MuralismoVecinal = React.lazy(() => import('./pages/MuralismoVecinal.jsx'));
const VLSRequestPortal = React.lazy(() => import('./components/VLSRequestPortal.jsx'));
const Aprende = React.lazy(() => import('./pages/Aprende.jsx'));
const Sitemap = React.lazy(() => import('./pages/Sitemap'));
const TributePage = React.lazy(() => import('./pages/TributePage.jsx'));
const MasterMiguelMelendez3D = React.lazy(() => import('./components/MasterMiguelMelendez3D.jsx'));
import { Activity } from 'lucide-react';
import './index.css';

// ── CAPTURA GLOBAL DE ERRORES PRE-REACT ──────────────────────────────────────
// Captura errores que ocurren antes de que React monte (TDZ, imports fallidos, etc.)
if (typeof window !== 'undefined') {
  localStorage.removeItem('vls_maintenance_active');
  window.__VLS_BOOT_ERRORS = [];
  const _origOnerror = window.onerror;
  window.onerror = function(msg, src, line, col, err) {
    window.__VLS_BOOT_ERRORS.push({ msg, src, line, col, stack: err?.stack });
    // Escribir en el DOM para diagnóstico si React aún no montó
    const el = document.getElementById('vls-error-debug');
    if (el) {
      el.textContent = `ERROR: ${msg}\nEn: ${src}:${line}:${col}`;
      el.style.display = 'block';
    }
    if (_origOnerror) return _origOnerror.apply(this, arguments);
  };
  window.addEventListener('unhandledrejection', (e) => {
    window.__VLS_BOOT_ERRORS.push({ msg: e.reason?.message || String(e.reason), stack: e.reason?.stack });
  });
}
// ─────────────────────────────────────────────────────────────────────────────

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (let registration of registrations) {
      registration.unregister();
    }
  });
}

import GlobalOmniSyncOverlay from './components/GlobalOmniSyncOverlay';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, isChunkError: false };
  }

  static getDerivedStateFromError(error) {
    const isChunk = error?.message?.includes('Failed to fetch dynamically imported module') ||
                    error?.message?.includes('Importing a module script failed') ||
                    error?.name === 'ChunkLoadError';
    return { hasError: true, error, isChunkError: isChunk };
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('vls_maintenance_active');
    }
  }

  componentDidCatch(error, info) {
    const isModuleError = error?.message?.includes('Failed to fetch dynamically imported module') ||
                          error?.name === 'ChunkLoadError' ||
                          error?.message?.includes('Importing a module script failed');
                          
    if (isModuleError) {
      console.warn('[VLS Recovery] Chunk Load Failure Detected. Triggering Hard Reload...');
      // Force reload with cache buster to bypass stale service worker or browser cache
      const sep = window.location.href.includes('?') ? '&' : '?';
      setTimeout(() => {
        window.location.href = window.location.pathname + sep + 'vls_sync=' + Date.now();
      }, 1500);
    }
    console.error('[VLS ErrorBoundary]', error?.message, error?.stack);
  }

  render() {
    if (this.state.hasError) {
      const errMsg = this.state.error?.message || (window.__VLS_BOOT_ERRORS?.[0]?.msg) || 'Error desconocido';
      const errStack = this.state.error?.stack || '';
      return (
        <div style={{ padding: '2rem', color: 'white', background: '#020617', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
          <div style={{ maxWidth: '600px', width: '100%', textAlign: 'center' }}>
            <div style={{ width: '60px', height: '3px', background: '#38bdf8', margin: '0 auto 2rem' }}></div>
            <h2 style={{ color: '#38bdf8', fontSize: '2rem', fontWeight: '900', marginBottom: '1rem' }}>SISTEMA EN <span style={{ color: 'white' }}>MANTENIMIENTO</span></h2>
            <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Estamos resolviendo un conflicto en la señal. Vuelve en un momento.</p>
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid #ef4444', borderRadius: '15px', padding: '1.5rem', marginBottom: '2rem', textAlign: 'left' }}>
              <p style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>REPORTE C5 — ERROR:</p>
              <code style={{ fontSize: '0.7rem', color: '#fca5a5', display: 'block', wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>{errMsg}</code>
              {errStack && <code style={{ fontSize: '0.6rem', color: '#94a3b8', display: 'block', wordBreak: 'break-all', whiteSpace: 'pre-wrap', marginTop: '0.5rem' }}>{errStack.split('\n').slice(0, 5).join('\n')}</code>}
            </div>
            <button onClick={() => {
              const sep = window.location.href.includes('?') ? '&' : '?';
              window.location.href = window.location.pathname + sep + 'vls_sync=' + Date.now();
            }} style={{ padding: '1rem 2rem', background: '#38bdf8', border: 'none', borderRadius: '15px', color: '#020617', fontWeight: '900', cursor: 'pointer', fontSize: '1rem' }}>
              REINTENTAR AHORA
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const host = (window.location.hostname || window.location.host || '').toLowerCase();
const isRdmlsDns = host.includes('rdmls') || host.includes('imls') || host.includes('rds') || (host.includes('laserena.cl') && !host.includes('vecinos'));
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
          <Suspense fallback={null}>
            <Routes>
              {/* Rutas para Dominios Específicos */}
              {isRdmlsDns ? (
                <>
                  <Route path="/IMLS/induccion" element={<App />}><Route index element={<Aprende isRDMLS={isRdmlsDns} />} /></Route>
                  <Route path="/IMLS/INDUCCION" element={<App />}><Route index element={<Aprende isRDMLS={isRdmlsDns} />} /></Route>
                  <Route path="/IMLS/:section" element={<App />}><Route index element={<Aprende isRDMLS={isRdmlsDns} />} /></Route>
                  <Route path="/induccion" element={<App />}><Route index element={<Aprende isRDMLS={isRdmlsDns} />} /></Route>
                  <Route path="/INDUCCION" element={<App />}><Route index element={<Aprende isRDMLS={isRdmlsDns} />} /></Route>
                  <Route path="/aprende" element={<App />}><Route index element={<Aprende isRDMLS={isRdmlsDns} />} /></Route>
                  <Route path="/APRENDE" element={<App />}><Route index element={<Aprende isRDMLS={isRdmlsDns} />} /></Route>
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
                    <Route path="inversiones" element={<FaritoInversores />} />
                    <Route path="legacy" element={<LegacyPortal />} />
                    <Route path="serenamet" element={<Serenamet />} />
                    <Route path="propiedades" element={<Propiedades />} />
                    <Route path="acceso" element={<PuertaSerena />} />
                    <Route path="arquitectura" element={<ArquitecturaPage />} />
                    <Route path="dev" element={<DevPortal />} />
                    <Route path="motors" element={<VLSMotorsShowroom />} />
                    <Route path="induccion" element={<Aprende isRDMLS={isRdmlsDns} />} />
                    <Route path="INDUCCION" element={<Aprende isRDMLS={isRdmlsDns} />} />
                    <Route path="IMLS/induccion" element={<Aprende isRDMLS={isRdmlsDns} />} />
                    <Route path="IMLS/INDUCCION" element={<Aprende isRDMLS={isRdmlsDns} />} />
                    <Route path="aprende" element={<Aprende isRDMLS={isRdmlsDns} />} />
                    <Route path="APRENDE" element={<Aprende isRDMLS={isRdmlsDns} />} />
                    <Route path="vetcino" element={<VETcinos />} />
                    <Route path="pincha" element={<Pincha />} />
                    <Route path="satellite" element={<SatelliteIntelligence />} />
                    <Route path="plaza" element={<PlazaVecinal />} />
                    <Route path="serenametplus" element={<SerenaMetPlus />} />
                    <Route path="entrevecinas" element={<EntrevecinasHub />} />
                    <Route path="muralismo" element={<MuralismoVecinal />} />
                    <Route path="reportes" element={<VLSRequestPortal onClose={() => window.history.back()} isPage={true} />} />
                    <Route path="agua" element={<MasterMiguelMelendez3D onClose={() => window.location.href = '/'} />} />
                    <Route path="sitemap" element={<Sitemap />} />
                    <Route path="altar" element={<TributePage />} />
                    <Route path="altar/:id" element={<TributePage />} />
                    <Route path="fichas" element={<HubDashboard />} />
                    <Route path="media/:id" element={<HubDashboard />} />
                    <Route path="paradoja" element={<HubDashboard />} />
                    <Route path="bencinazo" element={<HubDashboard />} />
                    <Route path="colapso" element={<HubDashboard />} />
                    <Route path="batik" element={<HubDashboard />} />
                    <Route path="semanasanta" element={<HubDashboard />} />
                    <Route path="semana-santa" element={<HubDashboard />} />
                    <Route path="aguasvalle" element={<HubDashboard />} />
                    <Route path="poduje" element={<HubDashboard />} />
                    <Route path="sentinel" element={<HubDashboard />} />
                    <Route path="investigacion" element={<HubDashboard />} />
                  </Route>
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
          </Suspense>
        </BrowserRouter>
      </LanguageProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
