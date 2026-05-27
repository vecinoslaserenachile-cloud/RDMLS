/** VLS_MAIN_ENTRY v1.1.5 - RECOVERY_SYNC_ACTIVE **/
import React, { useState, useEffect, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
console.log("%c VLS_SYSTEM: SYNC_v44 ACTIVE ", "background: #38bdf8; color: #000; font-weight: 900;");
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import App from './App.jsx';
import { LanguageProvider } from './context/LanguageContext';
import LoadingScreen from './components/LoadingScreen';
// import RDMLSNewsMigra from './components/RDMLSNewsMigra';
const Citizens = React.lazy(() => import('./pages/Citizens.jsx'));
const Backoffice = React.lazy(() => import('./pages/Backoffice.jsx'));
const LegacyPortal = React.lazy(() => import('./pages/LegacyPortal.jsx'));
// const Admin = React.lazy(() => import('./pages/Admin.jsx'));
// const PrendesMasterControl = React.lazy(() => import('./pages/PrendesMasterControl.jsx'));
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
const Induccion25 = React.lazy(() => import('./pages/Induccion25.jsx'));
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
const SeguridadVecinal = React.lazy(() => import('./pages/SeguridadVecinal.jsx'));
// const VLSNewsChequia = React.lazy(() => import('./components/VLSNewsChequia.jsx'));
const VLSNotesGallery = React.lazy(() => import('./components/VLSNotesGallery'));
const DiaDelTrabajador = React.lazy(() => import('./pages/DiaDelTrabajador'));
const VLSNewsIan = React.lazy(() => import('./components/VLSNewsIan.jsx'));
// const VLSNewsArtemis = React.lazy(() => import('./components/VLSNewsArtemis.jsx'));
const ErrorCollector = React.lazy(() => import('./components/ErrorCollector.jsx'));
const MarruecosPortal = React.lazy(() => import('./components/MarruecosPortal.jsx'));
// const EfeERP = React.lazy(() => import('./pages/EfeERP.jsx'));
// const PeregrinoERP = React.lazy(() => import('./pages/PeregrinoERP.jsx'));
// const PrendesLanding = React.lazy(() => import('./pages/PrendesLanding.jsx'));
// import PrendesFred from './pages/PrendesFred.jsx';
// const JuanSoldadoPortal = React.lazy(() => import('./pages/JuanSoldadoPortal.jsx'));
// const DenunciaLosPerales = React.lazy(() => import('./components/DenunciaLosPerales.jsx'));
// const AndacolloPortal = React.lazy(() => import('./pages/AndacolloPortal.jsx'));
// const VallenarPortal = React.lazy(() => import('./pages/VallenarPortal.jsx'));
// const ClasicaPortal = React.lazy(() => import('./pages/ClasicaPortal.jsx'));
// const AbrazoMaipu = React.lazy(() => import('./pages/AbrazoMaipu.jsx'));
// const VLSNewsVial = React.lazy(() => import('./components/VLSNewsVial.jsx'));
// const MunicipalNewsPage = React.lazy(() => import('./pages/MunicipalNewsPage.jsx'));
// const VlsMediaCenterPage = React.lazy(() => import('./pages/VlsMediaCenterPage.jsx'));
// const VLSNewsUcen = React.lazy(() => import('./components/VLSNewsUcen.jsx'));
// const VLSNewsIglesiasPiedra = React.lazy(() => import('./components/VLSNewsIglesiasPiedra.jsx'));
// const VLSNewsAlcaldesa = React.lazy(() => import('./components/VLSNewsAlcaldesa.jsx'));
// const HuinchaStandalone = React.lazy(() => import('./pages/HuinchaStandalone.jsx'));
const MemoriasUnicornio = React.lazy(() => import('./pages/MemoriasUnicornio'));
const NuevoPeregrinoPortal = React.lazy(() => import('./pages/NuevoPeregrinoPortal'));
const SmartComunaEvolution = React.lazy(() => import('./pages/SmartComunaEvolution.jsx'));
const AkichipPortal = React.lazy(() => import('./pages/AkichipPortal'));
// const VLSNewsStella = React.lazy(() => import('./components/VLSNewsStella'));
const PescaArtesanalNota = React.lazy(() => import('./pages/PescaArtesanalNota.jsx'));
// const SlepElquiNota = React.lazy(() => import('./pages/SlepElquiNota.jsx'));
// const SaludPatrimonioNota = React.lazy(() => import('./pages/SaludPatrimonioNota.jsx'));
// const AvivaPortal = React.lazy(() => import('./pages/AvivaPortal.jsx'));
const GardellaPortfolio = React.lazy(() => import('./pages/GardellaPortfolio.jsx'));
const PlazaPoetas = React.lazy(() => import('./pages/PlazaPoetas.jsx'));
// const PulsoCiudadano = React.lazy(() => import('./pages/PulsoCiudadano.jsx'));
// const DistanciasRadar = React.lazy(() => import('./pages/DistanciasRadar.jsx'));
const RadioPlayer = React.lazy(() => import('./components/RadioPlayer'));
const ArchiRadioPlayer = React.lazy(() => import('./components/ArchiRadioPlayer'));
const ArchiCampaign = React.lazy(() => import('./pages/ArchiCampaign.jsx'));
const ArchiNewsAdmin = React.lazy(() => import('./pages/ArchiNewsAdmin.jsx'));
const ArchiWapHub = React.lazy(() => import('./pages/ArchiWapHub.jsx'));
const ArchiSocialHub = React.lazy(() => import('./pages/ArchiSocialHub.jsx'));

// Configuración de rutas (React Router v6)
// const MarruecosPage = React.lazy(() => import('./pages/Marruecos.jsx'));
// const PatrimonioVulnerable = React.lazy(() => import('./pages/PatrimonioVulnerable.jsx'));
// const LegalDocs = React.lazy(() => import('./pages/LegalDocs.jsx'));
// const MegarreformaNota = React.lazy(() => import('./pages/MegarreformaNota.jsx'));

// const RawHTMLProxy = React.lazy(() => import('./components/RawHTMLProxy.jsx'));

// Marker for hash renewal
import './index.css';

// ── CAPTURA GLOBAL DE ERRORES PRE-REACT ──────────────────────────────────────
// Captura errores que ocurren antes de que React monte (TDZ, imports fallidos, etc.)
if (typeof window !== 'undefined') {
  window.VLS_BOOT_SUCCESS = true;
  localStorage.removeItem('vls_maintenance_active');
  sessionStorage.removeItem('vls_crash_count');
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
      // Reset error count after 1 minute of smooth running
      this._errorResetTimer = setTimeout(() => {
        sessionStorage.removeItem('vls_crash_count');
      }, 60000);
    }
  }

  componentWillUnmount() {
    clearTimeout(this._errorResetTimer);
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

    // --- FAILOVER LOGIC (AUTO-CLONE) ---
    if (typeof window !== 'undefined') {
        const count = parseInt(sessionStorage.getItem('vls_crash_count') || '0') + 1;
        sessionStorage.setItem('vls_crash_count', count.toString());

        if (count >= 10) { /* Changed from 2 to 10 to allow observing the error */
            console.warn("VLS_SYSTEM: Multiple crashes detected. Redirect disabled for debugging.");
            // window.location.href = '/lite'; 
            // return;
        }
    }
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
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '15px', borderRadius: '15px', border: '1px solid rgba(239, 68, 68, 0.3)', marginBottom: '2rem', wordBreak: 'break-word', textAlign: 'left' }}>
              <code style={{ color: '#fca5a5', fontSize: '0.85rem', whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                {errMsg}
              </code>
            </div>
            <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Estamos resolviendo un conflicto en la señal. Vuelve en un momento o limpia la caché si el problema persiste.</p>
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
const isRdmlsDns = host.includes('rdmls') || host.includes('rdmk') || host.includes('imls') || host.includes('rds') || (host.includes('laserena.cl') && !host.includes('vecinos') && !host.includes('prendes'));
const isImlsDns = host.includes('imls');
const isRDMLS = host.includes('vecinoslaserena.cl') && (window.location.pathname.includes('/rdmls') || window.location.pathname === '/rdmls' || window.location.pathname === '/rdmls/');
const isRadioVecinosDns = host.includes('radiovecinos.cl') || host.includes('radiovecinos') || host.includes('archinuevaenergia');

if (typeof window !== 'undefined' && isRadioVecinosDns) {
  document.title = "ARCHI Nueva Energía";
  try {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/png';
    link.rel = 'icon';
    link.href = '/archi-media/fotos/archi_foto_solange_1779330163090.png';
    document.getElementsByTagName('head')[0].appendChild(link);
  } catch(e) {}
}

const themeMode = (isRdmlsDns || isImlsDns || isRDMLS || isRadioVecinosDns) ? 'dark' : 'light';
const isDirectRdmls = host.includes('rdmls.cl') || host.includes('rdmk.cl');
const isPuertaDns = host.includes('puertasmart.cl');
const isEntrevecinasDns = host.includes('entrevecinas.cl');
const isPirataDns = host.includes('comunasmart.cl') || host.includes('piratasmart.cl');
const isProtocoloDns = host.includes('eventosmart.cl') || host.includes('protocolosmart.cl');
const isPrendesDns = host.includes('prendes.cl') || host.includes('vls-hub.cl') || host.includes('prendes-vls') || host.includes('peregrino') || host.includes('nuevoperegrino.cl') || host.includes('pren-vls');
const isPrendesLegacy = host.includes('vecinosmart.cl'); // Separate from prendes.cl rebranding

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <LanguageProvider>
        <BrowserRouter>
          <GlobalOmniSyncOverlay />
          
          {/* VLS_PERSISTENT_CORE: Components that must NEVER unmount during SPA navigation */}
          {(!window.location.pathname.toLowerCase().match(/\/fred(\/|$)/)) && (
            <Suspense fallback={null}>
              {/* En radiovecinos.cl el reproductor ARCHI propio aparece globalmente */}
              {isRadioVecinosDns ? <ArchiRadioPlayer isVisible={true} /> : <RadioPlayer isVisible={true} />}
            </Suspense>
          )}
          
          <Suspense fallback={null}>
            <ErrorCollector />
          </Suspense>

          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              {/* --- 1. RUTAS GLOBALES DE ALTA PRIORIDAD (VLS_SUPER_ROUTES) --- */}
              {/* FIX: Envueltas con <App /> para que useOutletContext() nunca retorne null */}
              <Route path="/FRED" element={<App />}><Route index element={<HubDashboard />} /></Route>
              <Route path="/chequia" element={<App />}><Route index element={<HubDashboard />} /></Route>
              <Route path="/CHEQUIA" element={<App />}><Route index element={<HubDashboard />} /></Route>
              <Route path="/retail" element={<VLSNewsIan onClose={() => window.location.href = '/'} />} />
              <Route path="/alcaldesa" element={<App />}><Route index element={<HubDashboard />} /></Route>
              <Route path="/andacollo" element={<App />}><Route index element={<HubDashboard />} /></Route>
              <Route path="/vallenar" element={<App />}><Route index element={<HubDashboard />} /></Route>
              <Route path="/juansoldado" element={<App />}><Route index element={<HubDashboard />} /></Route>
              <Route path="/juan-soldado" element={<App />}><Route index element={<HubDashboard />} /></Route>
              <Route path="/JUANSOLDADO" element={<App />}><Route index element={<HubDashboard />} /></Route>
              <Route path="/horario" element={<App />}><Route index element={<HubDashboard />} /></Route>
              <Route path="/stella" element={<App />}><Route index element={<HubDashboard />} /></Route>
              <Route path="/STELLA" element={<App />}><Route index element={<HubDashboard />} /></Route>
              <Route path="/1demayo" element={<DiaDelTrabajador />} />
              <Route path="/cambio-de-hora" element={<App />}><Route index element={<HubDashboard />} /></Route>
              <Route path="/artemis" element={<App />}><Route index element={<HubDashboard />} /></Route>
              <Route path="/artemisa" element={<App />}><Route index element={<HubDashboard />} /></Route>
              <Route path="/artemis2" element={<App />}><Route index element={<HubDashboard />} /></Route>
              <Route path="/ucen" element={<App />}><Route index element={<HubDashboard />} /></Route>
              <Route path="/UCEN" element={<App />}><Route index element={<HubDashboard />} /></Route>
              <Route path="/domeyko" element={<App />}><Route index element={<HubDashboard />} /></Route>
              <Route path="/lambert" element={<App />}><Route index element={<HubDashboard />} /></Route>
              <Route path="/chequia" element={<App />}><Route index element={<HubDashboard />} /></Route>
              <Route path="/ian" element={<App />}><Route index element={<HubDashboard />} /></Route>
              <Route path="/retail" element={<App />}><Route index element={<HubDashboard />} /></Route>
              <Route path="/sonicev" element={<App />}><Route index element={<HubDashboard />} /></Route>
              <Route path="/SONICEV" element={<App />}><Route index element={<HubDashboard />} /></Route>
              <Route path="/nuevoperegrino" element={<App />}><Route index element={<NuevoPeregrinoPortal />} /></Route>
              <Route path="/NUEVOPEREGRINO" element={<App />}><Route index element={<NuevoPeregrinoPortal />} /></Route>
              <Route path="/acciona" element={<App />}><Route index element={<HubDashboard />} /></Route>
              <Route path="/ACCIONA" element={<App />}><Route index element={<HubDashboard />} /></Route>
              <Route path="/salud" element={<App />}><Route index element={<HubDashboard />} /></Route>
              <Route path="/SALUD" element={<App />}><Route index element={<HubDashboard />} /></Route>
              <Route path="/choapa" element={<App />}><Route index element={<HubDashboard />} /></Route>
              <Route path="/CHOAPA" element={<App />}><Route index element={<HubDashboard />} /></Route>
              <Route path="/redcine" element={<App />}><Route index element={<HubDashboard />} /></Route>
              <Route path="/REDCINE" element={<App />}><Route index element={<HubDashboard />} /></Route>
              <Route path="/aviva" element={<App />}><Route index element={<HubDashboard />} /></Route>
              <Route path="/AVIVA" element={<App />}><Route index element={<HubDashboard />} /></Route>
              <Route path="/slep-elqui" element={<App />}><Route index element={<HubDashboard />} /></Route>
              <Route path="/SLEP-ELQUI" element={<App />}><Route index element={<HubDashboard />} /></Route>
              <Route path="/pesca-artesanal" element={<PescaArtesanalNota />} />
              <Route path="/PESCA-ARTESANAL" element={<PescaArtesanalNota />} />
              <Route path="/salud-patrimonio" element={<App />}><Route index element={<HubDashboard />} /></Route>
              <Route path="/SALUD-PATRIMONIO" element={<App />}><Route index element={<HubDashboard />} /></Route>
              
              <Route path="/pulsociudadano" element={<App />}><Route index element={<HubDashboard />} /></Route>
              <Route path="/PULSOCIUDADANO" element={<App />}><Route index element={<HubDashboard />} /></Route>
              <Route path="/opciones" element={<RDMLSOpciones />} />
              <Route path="/OPCIONES" element={<RDMLSOpciones />} />
              <Route path="/admin-radio" element={<AdminRadio />} />
              <Route path="/memorias" element={<MemoriasUnicornio onClose={() => window.location.href = '/'} />} />
              <Route path="/unicornio" element={<MemoriasUnicornio onClose={() => window.location.href = '/'} />} />
              
              {/* --- 2. RUTAS DE INVESTIGACIÓN DE ALTO IMPACTO (MODAL WRAPPERS) --- */}
              <Route path="/migra/*" element={<App />}>
                <Route index element={(isRdmlsDns || isDirectRdmls) ? <CentroRadio /> : <HubDashboard />} />
              </Route>
              <Route path="/MIGRA/*" element={<App />}>
                <Route index element={(isRdmlsDns || isDirectRdmls) ? <CentroRadio /> : <HubDashboard />} />
              </Route>
              <Route path="/migracion" element={<App />}>
                <Route index element={(isRdmlsDns || isDirectRdmls) ? <CentroRadio /> : <HubDashboard />} />
              </Route>

              {/* --- 3. RUTAS SEGMENTADAS POR DOMINIO (DNS_CONTEXTS) --- */}
              {isPrendesDns ? (
                <Route path="/" element={<App />}>
                  <Route path="efe" element={<HubDashboard />} />
                  <Route path="peregrino" element={<HubDashboard />} />
                  <Route path="admin" element={<HubDashboard />} />
                  <Route path="artemis" element={<HubDashboard />} />
                  <Route path="altacordillera" element={<HubDashboard />} />
                  <Route path="cordillera" element={<HubDashboard />} />
                  <Route path="vialidad2025" element={<HubDashboard />} />
                  <Route path="chequia" element={<HubDashboard />} />
                  <Route path="fred" element={<HubDashboard />} />
                  <Route path="centro/akichip" element={<AkichipPortal onClose={() => window.location.href = '/'} />} />
                  <Route path="akichip" element={<AkichipPortal onClose={() => window.location.href = '/'} />} />
                  <Route index element={host.includes('peregrino') || host.includes('nuevoperegrino.cl') ? <NuevoPeregrinoPortal /> : <HubDashboard />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
              ) : isRdmlsDns ? (
                <Route path="/" element={<App />}>
                  <Route path="noticias" element={<HubDashboard />} />
                  <Route index element={<CentroRadio />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
              ) : isPuertaDns ? (
                <Route path="/" element={<App />}>
                  <Route index element={<PuertaSmart />} />
                  <Route path="puerta" element={<PuertaSmart />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
              ) : isEntrevecinasDns ? (
                <Route path="/" element={<App />}>
                  <Route index element={<EntrevecinasHub />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
              ) : isRadioVecinosDns ? (
                <>
                  <Route path="/" element={<App />}>
                    <Route index element={<ArchiCampaign />} />
                    <Route path="archi" element={<ArchiCampaign />} />
                    <Route path="wap" element={<ArchiWapHub />} />
                    <Route path="social" element={<ArchiSocialHub />} />
                    <Route path="afiches" element={<ArchiSocialHub />} />
                  </Route>
                  <Route path="/admin" element={<ArchiNewsAdmin />} />
                  <Route path="/archi-admin" element={<ArchiNewsAdmin />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </>
              ) : isPrendesLegacy ? (
                <Route path="/" element={<App />}>
                  <Route index element={<SmartComunaEvolution />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
              ) : (isPirataDns || isProtocoloDns) ? (
                <Route path="/" element={<App />}>
                  <Route index element={isPirataDns ? <PirataSmart /> : <Protocolo />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
              ) : (
                <>
                  <Route path="/" element={<App />}>
                    <Route index element={<HubDashboard />} />
                    {/* --- rutas del portal principal VLS --- */}
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
                    <Route path="centro/akichip" element={<AkichipPortal onClose={() => window.location.href = '/'} />} />
                    <Route path="akichip" element={<AkichipPortal onClose={() => window.location.href = '/'} />} />
                    <Route path="motors" element={<VLSMotorsShowroom />} />
                    <Route path="noticias" element={<HubDashboard />} />
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
                    <Route path="seguridad" element={<SeguridadVecinal />} />
                    <Route path="agua" element={<MasterMiguelMelendez3D onClose={() => window.location.href = '/'} />} />
                    <Route path="sitemap" element={<Sitemap />} />
                    <Route path="altar" element={<TributePage />} />
                    <Route path="altar/:id" element={<TributePage />} />
                    <Route path="fichas" element={<HubDashboard />} />
                    <Route path="media/ian" element={<VLSNewsIan onClose={() => window.history.back()} />} />
                    <Route path="mundo/chequia" element={<HubDashboard />} />
                    <Route path="mundo/Chequia" element={<HubDashboard />} />
                    <Route path="media/:id" element={<HubDashboard />} />
                    <Route path="paradoja" element={<HubDashboard />} />
                    <Route path="bencinazo" element={<HubDashboard />} />
                    <Route path="colapso" element={<HubDashboard />} />
                    <Route path="batik" element={<HubDashboard />} />
                    <Route path="semanasanta" element={<HubDashboard />} />
                    <Route path="semana-santa" element={<HubDashboard />} />
                    <Route path="aguasvalle" element={<HubDashboard />} />
                    <Route path="avalancha" element={<HubDashboard />} />
                    <Route path="ojo" element={<HubDashboard />} />
                    <Route path="poduje" element={<HubDashboard />} />
                    <Route path="sentinel" element={<HubDashboard />} />
                    <Route path="investigacion" element={<HubDashboard />} />
                     <Route path="artemis" element={<HubDashboard />} />
                     <Route path="artemisa" element={<HubDashboard />} />
                     <Route path="artemis2" element={<HubDashboard />} />
                     <Route path="ucen" element={<HubDashboard />} />
                     <Route path="UCEN" element={<HubDashboard />} />
                     <Route path="domeyko" element={<HubDashboard />} />
                     <Route path="lambert" element={<HubDashboard />} />
                     <Route path="chequia" element={<HubDashboard />} />
                     <Route path="ian" element={<HubDashboard />} />
                     <Route path="retail" element={<HubDashboard />} />
                     <Route path="acciona" element={<HubDashboard />} />
                     <Route path="salud" element={<HubDashboard />} />
                     <Route path="choapa" element={<HubDashboard />} />
                     <Route path="redcine" element={<HubDashboard />} />
                     <Route path="juansoldado" element={<HubDashboard />} />
                    <Route path="juan-soldado" element={<HubDashboard />} />
                    <Route path="JUANSOLDADO" element={<HubDashboard />} />
                    <Route path="andacollo" element={<HubDashboard />} />
                    <Route path="vallenar" element={<HubDashboard />} />
                    <Route path="alcaldesa" element={<HubDashboard />} />
                    <Route path="horario" element={<HubDashboard />} />
                    <Route path="stella" element={<HubDashboard />} />
                    <Route path="STELLA" element={<HubDashboard />} />
                    <Route path="arcade" element={<App />} />
                    <Route path="cambio-de-hora" element={<HubDashboard />} />

                    <Route path="clasica" element={<HubDashboard />} />
                    <Route path="vial" element={<HubDashboard />} />
                    <Route path="vls-vial" element={<HubDashboard />} />
                    <Route path="CLASICA" element={<HubDashboard />} />
                    <Route path="perales" element={<HubDashboard />} />
                    <Route path="los-perales" element={<HubDashboard />} />
                    <Route path="media/denuncias/sanitaria/los-perales" element={<HubDashboard />} />
                    <Route path="gardella" element={<GardellaPortfolio />} />
                    <Route path="plazapoetas" element={<PlazaPoetas />} />
                    <Route path="pesca-artesanal" element={<PescaArtesanalNota />} />
                    <Route path="slep-elqui" element={<HubDashboard />} />
                    <Route path="salud-patrimonio" element={<HubDashboard />} />
                    <Route path="distancias" element={<HubDashboard />} />
                    <Route path="DISTANCIAS" element={<HubDashboard />} />
                    <Route path="privacidad" element={<HubDashboard />} />
                    <Route path="terminos" element={<HubDashboard />} />
                    <Route path="megarreforma" element={<HubDashboard />} />
                    <Route path="alcaldes" element={<HubDashboard />} />
                    <Route path="welcome" element={<WelcomePortal />} />
                    <Route path="archi" element={<ArchiCampaign />} />
                  </Route>
                  <Route path="/marruecos" element={<HubDashboard />} />
                  <Route path="/patrimonio" element={<HubDashboard />} />
                  <Route path="/efe" element={<HubDashboard />} />
                  <Route path="/peregrino" element={<HubDashboard />} />
                  <Route path="/smart-setup" element={<SuperAdminSetup />} />
                  <Route path="/bisabuelo" element={<GameVLS />} />
                  <Route path="/vlsabes" element={<VLSGameMain onClose={() => window.location.href = '/'} />} />
                  <Route path="/bella" element={<BellaDashboard />} />
                  <Route path="/1945" element={<Serenito1945Page />} />
                  <Route path="/lite" element={<LitePortal />} />
                  <Route path="/sombreros" element={<HubDashboard />} />
                  <Route path="/news-studio" element={<HubDashboard />} />
                  <Route path="/archi-admin" element={<ArchiNewsAdmin />} />
                  <Route path="/desk" element={<Backoffice />} />
                  {isRadioVecinosDns ? (
                    <Route path="/admin" element={<ArchiNewsAdmin />} />
                  ) : (
                    <Route path="/admin" element={<HubDashboard />} />
                  )}
                  <Route path="/prendes-admin" element={<HubDashboard />} />
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

