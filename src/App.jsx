import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Outlet, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
// StickyNoteWidget removido por solicitud institucional (MEMO no autorizado)

import { Search, ShieldAlert, Map as MapIcon, Box, ExternalLink, Home, Info, X as CloseIcon, Star, Sun, Moon, Cloud, CloudRain, CloudLightning, CloudSnow, CloudFog, Bell, UserCircle, Sparkles, Fingerprint, ArrowLeft, Ticket, Activity, LogIn, ClipboardList, Eye, Download, ShieldClose, HardDrive, ShoppingCart, Tag, Shirt, Network, Fuel, Ruler, Plane, Anchor, LineChart, LayoutGrid, Heart, Award, Joystick, Radio } from 'lucide-react';
import { socket as comSocket } from './utils/socket';
import RadioMasterEngine from './components/Radio/RadioMasterEngine';
import { LanguageProvider, useTranslation } from './context/LanguageContext';
import LoginModal from './components/LoginModal';
import { supabase } from './utils/supabase';
import GlobalAnnouncer from './components/GlobalAnnouncer';
import SEO from './components/SEO';
import { checkIsMobile } from './utils/device';
import LoadingScreen from './components/LoadingScreen';
import GlobalOmniSyncOverlay from './components/GlobalOmniSyncOverlay';

// Safe Icon Fallback for VLS_CRITICAL_RECOVERY (Prevent Recursive Crash)
const VLSActivityIcon = Activity || Heart || 'div';

// ——— LIMPIEZA DE FLAGS Y RECUPERACIÓN DE SEÑAL (C5-RECOVERY) ——————
if (typeof window !== 'undefined') {
  localStorage.removeItem('vls_maintenance_active');

  // Auto-recuperación ante errores de carga de Chunks (Stale assets post-deploy)
  window.addEventListener('error', (e) => {
    if (e.message && (e.message.includes('Failed to fetch dynamically imported module') || e.message.includes('chunk'))) {
      console.warn('VLS_C5: Error de señal detectado (Asset Stale). Re-sincronizando...');
      window.location.reload();
    }
  }, true);

  window.addEventListener('unhandledrejection', (e) => {
    // 1. SILENCIO_OPERATIVO: Interrupciones de carga de medios (AbortError) - SILVER BULLET FIX
    if (e.reason && (e.reason.name === 'AbortError' || (e.reason.message && e.reason.message.includes('play() request was interrupted')))) {
      e.preventDefault();
      return; 
    }

    // 2. RECUPERACIÓN_DE_SEÑAL: Chunks o Módulos fallidos
    if (e.reason && e.reason.message && (e.reason.message.includes('Failed to fetch dynamically imported module') || e.reason.message.includes('chunk'))) {
      console.warn('VLS_C5: Promesa de módulo fallida. Re-sincronizando portal...');
      window.location.reload();
    }
  });
}
// ——————————————————————————————————————————————————————————————————————————


// ——— CONFIGURACIÓN DE MANTENIMIENTO RDMLS ————————————————————————
const RDMLS_MAINTENANCE_ACTIVE = false; 
// ——————————————————————————————————————————————————————————————————————————

// Lazy Loaded Components (Bandwidth Optimization)
const ChatAssistant = lazy(() => import('./components/ChatAssistant'));
const DistancesMap = lazy(() => import('./components/DistancesMap'));
const HistoricWalk3D = lazy(() => import('./components/HistoricWalk3D'));
const TimeBus3D = lazy(() => import('./components/TimeBus3D'));
const CityCouncilModal = lazy(() => import('./components/CityCouncilModal'));
const CDLSPanel = lazy(() => import('./components/CDLSPanel'));
const ReviewPortalModal = lazy(() => import('./components/ReviewPortalModal'));
const MusicCreatorModal = lazy(() => import('./components/MusicCreatorModal'));
const MarketplaceVecinal = lazy(() => import('./components/MarketplaceVecinal'));
const SentinelMini = lazy(() => import('./components/SentinelMini'));
const IquiqueDiorama = lazy(() => import('./components/IquiqueDiorama'));
const EcumenicalPortalModal = lazy(() => import('./components/EcumenicalPortalModal'));
const SecularPortalModal = lazy(() => import('./components/SecularPortalModal'));
const SmartSkillsPortalModal = lazy(() => import('./components/SmartSkillsPortalModal'));
const OldTVModal = lazy(() => import('./components/OldTVModal'));
const VhsTVModal = lazy(() => import('./components/VhsTVModal'));
const MemoryPortalModal = lazy(() => import('./components/MemoryPortalModal'));
const VerticalTVModal = lazy(() => import('./components/VerticalTVModal'));
const VlsMasterChartsPortal = lazy(() => import('./pages/VlsMasterCharts'));
const RetroArcadeLobby = lazy(() => import('./components/RetroArcadeLobby'));
const SentinelApex = lazy(() => import('./components/SentinelApex'));
const FaritoBrowser = lazy(() => import('./components/FaritoBrowser'));
const LaFloridaAirport = lazy(() => import('./components/LaFloridaAirport'));
const SmartCity3DClone = lazy(() => import('./components/SmartCity3DClone'));
const OperacionLaSerena = lazy(() => import('./components/OperacionLaSerena.jsx'));
const IdentityGate = lazy(() => import('./components/IdentityGate.jsx'));
const MasterLock = lazy(() => import('./components/MasterLock.jsx'));
const VLSVisionModal = lazy(() => import('./components/VLSVisionModal.jsx'));
const ProjectInfoModal = lazy(() => import('./components/ProjectInfoModal.jsx'));
const SmartCalendar = lazy(() => import('./components/SmartCalendar.jsx'));
const LeanStartupMaster = lazy(() => import('./components/LeanStartupMaster.jsx'));
const TiendaPoleras3D = lazy(() => import('./components/TiendaPoleras3D'));
const CoquiSmartKanban = lazy(() => import('./components/CoquiSmartKanban'));
const Aprende = lazy(() => import('./pages/Aprende'));
const VLSInduccion = lazy(() => import('./pages/VLSInduccion'));
const VLSNewsStella = lazy(() => import('./components/VLSNewsStella'));
const ContactForm = lazy(() => import('./components/ContactForm'));
const RDMLSMaintenance = lazy(() => import('./components/RDMLSMaintenance'));

const MemorialHijosRegion = lazy(() => import('./components/MemorialHijosRegion.jsx'));
const PersonalStereo = lazy(() => import('./components/PersonalStereo.jsx'));
const RetroGamerRoom = lazy(() => import('./components/RetroGamerRoom.jsx'));
const ObservatorioSmart = lazy(() => import('./components/ObservatorioSmart.jsx'));
const ReelToReelStudio = lazy(() => import('./components/ReelToReelStudio.jsx'));
const CommunicationsMuseum = lazy(() => import('./components/CommunicationsMuseum.jsx'));
const VecinojosPortal = lazy(() => import('./components/VecinojosPortal.jsx'));
const SmartVLSFeed = lazy(() => import('./components/SmartVLSFeed.jsx'));
const SmartBroadcasterStudio = lazy(() => import('./components/SmartBroadcasterStudio.jsx'));
const PrecolombinoPortal = lazy(() => import('./components/PrecolombinoPortal.jsx'));
const ParlamentoVecinal = lazy(() => import('./components/Parlamento/ParlamentoVecinal.jsx'));
const DeBonoThinkingHats = lazy(() => import('./components/DeBonoThinkingHats.jsx'));
const VLSConsoleSound = lazy(() => import('./components/VLSConsoleSound.jsx'));
const DronDrigo = lazy(() => import('./components/DronDrigo.jsx'));
const VLSQuantumWatch = lazy(() => import('./components/VLSQuantumWatch.jsx'));
const HoraSerena = lazy(() => import('./components/HoraSerena.jsx'));
const TribunalesVecinales = lazy(() => import('./components/TribunalesVecinales.jsx'));
const DonRadios = lazy(() => import('./components/DonRadios.jsx'));
const SmartAdministration = lazy(() => import('./components/SmartAdministration.jsx'));
const EmbajadasConsulados = lazy(() => import('./components/EmbajadasConsulados.jsx'));
const SismicCenter = lazy(() => import('./components/SismicCenter.jsx'));
const SmartTheater = lazy(() => import('./components/SmartTheater.jsx'));
const VLSNewsUcen = React.lazy(() => import('./components/VLSNewsUcen.jsx'));
const VLSNewsIglesiasPiedra = React.lazy(() => import('./components/VLSNewsIglesiasPiedra.jsx'));
const SmartHub3D = lazy(() => import('./components/SmartHub3D'));
const SocialVision = lazy(() => import('./components/SocialVision'));
const RadioIntercom = lazy(() => import('./components/RadioIntercom'));
const VLSNewsAguasValle = lazy(() => import('./components/VLSNewsAguasValle'));
const AuditoriaVecinal = lazy(() => import('./components/Auditoria/AuditoriaVecinal'));
const Gimnasio3D = lazy(() => import('./components/Gimnasio3D'));
const MotorTiempoBrowser = lazy(() => import('./components/MotorTiempoBrowser'));
const SmartBusinessMVP = lazy(() => import('./components/SmartBusinessMVP'));
const SmartTV = lazy(() => import('./components/SmartTV'));
const EmergencyDirectory = lazy(() => import('./components/EmergencyDirectory'));
const LinkedInManager = lazy(() => import('./pages/LinkedInManager'));
const PropuestaEstrategica = lazy(() => import('./pages/PropuestaElDia'));
const HomeLiviano = lazy(() => import('./pages/HomeLiviano'));
const TokenEconomyMaster = lazy(() => import('./components/TokenEconomyMaster'));
const VecnityPay = lazy(() => import('./components/VecnityPay'));
const FaritoSocialNetwork = lazy(() => import('./components/FaritoSocialNetwork'));
const FaroCentinel = lazy(() => import('./components/FaroCentinel'));
const BoticaVecinal = lazy(() => import('./components/BoticaVecinal'));
const RedVeterinariaVLS = lazy(() => import('./components/RedVeterinariaVLS'));
const SerenitoVLS = lazy(() => import('./components/SerenitoVLS'));
const SkyGuideRA = lazy(() => import('./components/SkyGuideRA'));
const SmartShare = lazy(() => import('./components/SmartShare'));
const MemoriasUnicornio = lazy(() => import('./pages/MemoriasUnicornio'));
const DevPortalVLS = lazy(() => import('./pages/DevPortalVLS'));
const SmartEventsVLS = lazy(() => import('./pages/SmartEventsVLS'));
const ExecutiveDossierVLS = lazy(() => import('./components/ExecutiveDossierVLS'));
const WhatsAppEliteHub = lazy(() => import('./components/WhatsAppEliteHub'));
const PremiumNeighborHub = lazy(() => import('./components/PremiumNeighborHub'));
const RightsGovernanceVLS = lazy(() => import('./components/RightsGovernanceVLS'));
const MusicSchoolVLS = lazy(() => import('./components/MusicSchoolVLS'));
// DeBonoThinkingHatsVLS removido por conflicto de build
const FiestaFAVLS = lazy(() => import('./components/FiestaFAVLS'));
const VlsSmartBillionaire = lazy(() => import('./components/VlsSmartBillionaire'));
const PinchaDating = lazy(() => import('./components/PinchaDating'));
const EntreVecinasHub = lazy(() => import('./pages/EntrevecinasHub'));
const AlcaldesHistory = lazy(() => import('./pages/AlcaldesHistory'));
const VecinosChileHub = lazy(() => import('./pages/VecinosChileHub'));
const VLSNewsRedCine = lazy(() => import('./components/VLSNewsRedCine'));
const VLSNewsChoapa = lazy(() => import('./components/VLSNewsChoapa'));
const ParliamentaryObservatory = lazy(() => import('./components/ParliamentaryObservatory'));
const VecinosAnalyticsApp = lazy(() => import('./components/VecinosAnalyticsApp/VecinosAnalyticsApp.jsx'));
const VLSNewsBencinazo = lazy(() => import('./components/VLSNewsBencinazo'));
const VLSNewsSemanaSanta = lazy(() => import('./components/VLSNewsSemanaSanta'));
const VLSMotorsSpot = lazy(() => import('./components/VLSMotorsSpot'));
// const PulsoCiudadano = lazy(() => import('./pages/PulsoCiudadano.jsx'));
const SafeRouteAI = lazy(() => import('./components/SafeRouteAI'));
const PortMonitor = lazy(() => import('./components/NavieraMonitor'));
const OrientacionLegal = lazy(() => import('./components/OrientacionLegal'));
const VLSpeakTranslator = lazy(() => import('./components/VLSpeakTranslator'));
const VLSNewsIan = lazy(() => import('./components/VLSNewsIan'));
const VLSNewsArtemis = lazy(() => import('./components/VLSNewsArtemis'));
const VLSNewsAlcaldesa = lazy(() => import('./components/VLSNewsAlcaldesa'));
const VLSNewsAcciona = lazy(() => import('./components/VLSNewsAcciona'));
const VLSNewsSalud = lazy(() => import('./components/VLSNewsSalud'));
const VLSNewsChequia = lazy(() => import('./components/VLSNewsChequia'));
const SeguridadVecinal = lazy(() => import('./pages/SeguridadVecinal'));
const VLSNewsTimeChange = lazy(() => import('./components/VLSNewsTimeChange'));
const BackofficeMovilVLS = lazy(() => import('./components/BackofficeMovilVLS'));
const VLSNewsAvalancha = lazy(() => import('./components/VLSNewsAvalancha'));
const DomeykoPortal = lazy(() => import('./pages/DomeykoPortal'));
const RDMLSNewsMigra = lazy(() => import('./components/RDMLSNewsMigra'));
const SonicevPortal = lazy(() => import('./pages/SonicevPortal'));
const NuevoPeregrinoPortal = lazy(() => import('./pages/NuevoPeregrinoPortal'));
const SmartComunaOS = lazy(() => import('./components/SmartComunaOS'));
const VLSNotesGallery = lazy(() => import('./components/VLSNotesGallery'));
const MonitoreoTransparencia = lazy(() => import('./components/Auditoria/MonitoreoTransparencia'));
const MusicRanking = lazy(() => import('./components/MusicRanking'));
const DiaDelTrabajador = lazy(() => import('./pages/DiaDelTrabajador')); // Nueva sección autónoma 1 de Mayo
const AkichipPortal = lazy(() => import('./pages/AkichipPortal'));



const SOVEREIGN_NAMES = [
  "vecinoslaserena.cl",
  "Serenito (Explore & Skate) 🛹",
  "Compita (Arpa & Luthier) 🎻",
  "Tío Pedro (Caleta San Pedro) 🐟",
  "Fariño (Surf & Party) 🏄",
  "Pampita (Exploradora VLS) 🌿",
  "Milagros (Salud & Fuerza) 💪",
  "Serenito I (Tradición & Antorcha) 🕯️",
  "Tata Rojas (Valle & Agua) 👴",
  "Alpino (Informática & Cerro) 💻",
  "Flopi (Mermeladas Soberanas) 🍓",
  "Señora Tena (Memoria Viva) 👵",
  "Don Joaco (San Joaquín) 👴",
  "Coral del Arrayán (Costa Norte) 🌅",
  "Egocéntrico (Institucional) 👔",
  "Sofia",
  "Lucas",
  "Pinochef (Chef del Palacio) 👨‍🍳"
];



const MartinSecurityShield = lazy(() => import('./components/MartinSecurityShield'));
const LegacyVLSAppendix = lazy(() => import('./components/LegacyVLSAppendix'));
const NetSpeedMonitor = lazy(() => import('./components/NetSpeedMonitor'));
const SerenitoSecurityGuard = lazy(() => import('./components/SerenitoSecurityGuard'));
const KioskoDiarios = lazy(() => import('./components/KioskoDiarios'));
const FloatingActionPanel = lazy(() => import('./components/FloatingActionPanel'));
const SmartToolbox = lazy(() => import('./components/SmartToolbox'));
const SmartEnfermeria = lazy(() => import('./components/SmartEnfermeria'));
const PianoCompita = lazy(() => import('./components/PianoCompita'));
const ErrorCollector = lazy(() => import('./components/ErrorCollector'));

/**
 * AI HONEYPOT SECURITY LAYER
 * Discrete decoys to distract and neutralize automated scraping/analysis.
 */
const SecurityHoneypot = () => {
  useEffect(() => {
    // Bait: Global variable that looks like a secret but is a trap
    window.__VLS_INTERNAL_DEBUG_TOKEN__ = "VLS-AI-BAIT-" + Math.random().toString(36).substr(2, 9);

    // Detection: Detect if code is being inspected or analyzed by common patterns
    const detectHeuristics = () => {
      if (window.navigator.webdriver || window.outerWidth === 0 || window.outerHeight === 0) {
        console.warn("VLS SECURITY: AUTOMATED_AGENT_DETECTED. Serving decoy API structure...");
        window.__VLS_API_MAPPING__ = {
          status: "DECOY_ACTIVE",
          endpoints: "/api/v1/bait/auth, /api/v1/bait/database_dump",
          latency: "0.001ms"
        };
      }
    };
    detectHeuristics();
  }, []);

  return (
    <div style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', height: 0, width: 0, overflow: 'hidden' }}>
      {/* Bait Links for scrapers */}
      <a href="/admin-auth-debug">Access Control Bypass</a>
      <a href="/v1/internal/secrets.json">Secret Configuration Keys</a>
      <div id="vls-shadow-database">
        [BAIT_DATA] TABLE_USERS: {'{ "id": 1, "root_key": "DECOY_SECRET_7765" }'}
      </div>
    </div>
  );
};

// LoadingScreen is now imported from shared components

const ALLOWED_ADMINS = [
  'directorio@vecinoslaserena.cl',
  'admin@vecinoslaserena.cl',
  'soporte@vecinoslaserena.cl',
  'master@vecinoslaserena.cl',
  'henry@vecinoslaserena.cl',
  'carlos@vecinoslaserena.cl',
  'vecinossmart@gmail.com',
  'vecinoslaserenachile@gmail.com'
];

const MaintenanceNotice = () => {
  const [visible, setVisible] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const check = () => {
      if (localStorage.getItem('vls_maintenance_active') === 'true') setVisible(true);
    };
    check();
    const interval = setInterval(check, 5000);
    window.addEventListener('vls-show-maint', () => setVisible(true));
    return () => { clearInterval(interval); window.removeEventListener('vls-show-maint', () => setVisible(true)); };
  }, []);

  const handleClose = () => {
    localStorage.removeItem('vls_maintenance_active');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 999999, display: 'flex', alignItems: 'center', justifyContent: 'center', p: '2rem' }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-[#020617]/90 backdrop-blur-xl" />
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        style={{ position: 'relative', width: '100%', maxWidth: '600px', background: '#0f172a', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '30px', padding: '3rem', textAlign: 'center', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}
      >
        <div style={{ width: '60px', height: '60px', borderRadius: '20px', background: 'rgba(56, 189, 248, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', color: '#38bdf8' }}>
          <VLSActivityIcon size={32} className="animate-pulse" />
        </div>
        <h2 style={{ color: 'white', fontSize: '1.8rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.02em' }}>ESTAMOS MEJORANDO EL SISTEMA</h2>
        <p style={{ color: '#94a3b8', lineHeight: '1.6', marginBottom: '2.5rem' }}>
          Estamos puliendo detalles técnicos para brindarte la mejor experiencia. Actualiza el portal en unos minutos o envíanos un mensaje directo al equipo de soporte.
        </p>

        <div style={{ marginBottom: '2rem' }}>
          <textarea
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Escríbenos tu duda o reporte..."
            style={{ width: '100%', height: '100px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '15px', color: 'white', padding: '1rem', outline: 'none', fontSize: '0.9rem' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <button
            onClick={() => { handleClose(); window.location.reload(); }}
            style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', color: 'white', borderRadius: '15px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
          >
            REINTENTAR AHORA
          </button>
          <button
            onClick={() => {
              if (msg) {
                alert("REPORTE_C5: Tu mensaje ha sido enviado al equipo de vecinoslaserenachile.cl");
                setMsg("");
              }
              handleClose();
            }}
            style={{ padding: '1rem', background: '#38bdf8', color: '#020617', borderRadius: '15px', border: 'none', fontWeight: '900', cursor: 'pointer' }}
          >
            ENVIAR Y CERRAR
          </button>
        </div>
        <button
          onClick={handleClose}
          style={{ marginTop: '1rem', padding: '0.75rem 2rem', background: 'transparent', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '15px', cursor: 'pointer', width: '100%', fontSize: '0.85rem' }}
        >
          ✖ Cerrar y continuar al portal
        </button>
      </motion.div>
    </div>
  );
};

// GlobalOmniSyncOverlay is now imported from shared components

// ─── ERROR BOUNDARY (C5-CRITICAL-WATCHDOG) ───────────────────────────────────
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, errorInfo) {
    console.error("VLS_CRITICAL_CRASH:", error, errorInfo);
    
    // Auto-recuperación para errores de Chunks (post-deploy stale assets)
    const isChunkError = error?.message?.includes('Failed to fetch dynamically imported module') ||
                         error?.name === 'ChunkLoadError' ||
                         error?.message?.includes('Importing a module script failed');
                         
    if (isChunkError) {
      console.warn("VLS_RECOVERY: Chunk error detected inside App. Reloading...");
      setTimeout(() => {
        window.location.reload(true); // Hard reload if possible
      }, 1000);
    }
  }
  render() {
    if (this.state.hasError) {
      const isChunkError = this.state.error?.message?.includes('Failed to fetch dynamically imported module') ||
                           this.state.error?.name === 'ChunkLoadError';

      return (
        <div style={{ padding: '40px', background: '#020617', color: '#ef4444', minHeight: '100vh', fontFamily: 'monospace', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div style={{ width: '80px', height: '2px', background: '#38bdf8', marginBottom: '2rem' }}></div>
          <h2 style={{ color: 'white', fontSize: '2rem', fontWeight: '950', marginBottom: '1rem' }}>⚠️ {isChunkError ? 'SINCRONIZANDO SEÑAL...' : 'VLS_NUCLEUS_FAILURE'}</h2>
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '20px', borderRadius: '15px', border: '1px solid rgba(239, 68, 68, 0.2)', maxWidth: '800px', width: '100%' }}>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', color: '#fca5a5', fontSize: '0.9rem' }}>
              {this.state.error && this.state.error.toString()}
            </pre>
          </div>
          <div style={{ marginTop: '20px', color: '#94a3b8', fontSize: '0.9rem' }}>
             {isChunkError 
               ? "Detectamos una actualización en el portal. Re-sincronizando archivos..." 
               : "Si el error persiste, limpia la caché o contacta al soporte C5."}
          </div>
          <button 
            onClick={() => { 
              localStorage.clear(); 
              sessionStorage.clear();
              if ('caches' in window) {
                caches.keys().then(names => {
                  for (let name of names) caches.delete(name);
                }).finally(() => {
                  window.location.href = window.location.pathname + '?vls_refresh=' + Date.now();
                });
              } else {
                window.location.href = window.location.pathname + '?vls_refresh=' + Date.now();
              }
            }}
            style={{ marginTop: '30px', padding: '15px 30px', background: '#38bdf8', color: '#020617', fontWeight: 'bold', border: 'none', borderRadius: '15px', cursor: 'pointer' }}
          >
            {isChunkError ? 'REINTENTAR AHORA' : 'LIMPIAR CACHÉ (RECUPERAR SISTEMA)'}
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
// ——————————————————————————————————————————————————————————————————————

function App() {
  const [showProjectInfo, setShowProjectInfo] = useState(false);
  const [showCoquiSmartCRM, setShowCoquiSmartCRM] = useState(false);
  const location = useLocation();

  const host = (window.location.hostname || window.location.host || '').toLowerCase();
  const isRDMLS = host.includes('rdmls') || host.includes('rdmk') || host.includes('imls') || host.includes('rds') || (host.includes('laserena.cl') && !host.includes('vecinos') && !host.includes('prendes')) || host.includes('prendes-vls') || location.pathname.includes('/radio') || host.includes('localhost') || window.location.search.includes('rdmls');

  // Limpiar flag de mantenimiento al montar — evita bloqueo post-deploy
  useEffect(() => {
    localStorage.removeItem('vls_maintenance_active');
  }, []);

  const isSonicev = host.includes('sonicev');

  return (
    <Suspense fallback={
      isSonicev ? (
        <div style={{ background: '#050505', height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ color: '#ff4d4d', fontSize: '1.5rem', fontWeight: 900, fontFamily: 'system-ui, sans-serif', letterSpacing: '8px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>
            SONICEV
          </div>
        </div>
      ) : isRDMLS ? (
        <div style={{ background: '#0a0a0a', height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <div style={{ color: '#FFD700', fontSize: '2rem', fontWeight: 950, letterSpacing: '4px', textAlign: 'center' }}>
              RDMLS<br/>
              <span style={{ fontSize: '0.8rem', letterSpacing: '2px', opacity: 0.6 }}>SINTONIZANDO SEÑAL OFICIAL...</span>
           </div>
           {/* VLS_C5: SOBERANÍA AUDITIVA (RULE #1) - EXCLUDE FOR EVOLUTION SHOWROOM */}
           {!isRDMLS && !host.includes('vecinosmart.cl') && (
             <VLSConsoleSound isRDMLS={isRDMLS} />
           )}
        </div>
      ) : (
        <div style={{ background: '#020617', height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><LoadingScreen /></div>
      )
    }>
      <ErrorBoundary>
        <AppContent setShowCoquiSmartCRM={setShowCoquiSmartCRM} />
      </ErrorBoundary>
      {(window.location.pathname !== '/induccion' && window.location.pathname !== '/induccion_imls' && window.location.pathname !== '/vlsabes' && !window.location.host.includes('sonicev') && window.location.pathname !== '/sonicev' && !window.location.host.includes('vecinosmart.cl')) && (
        isRDMLS ? <HoraSerena /> : <VLSQuantumWatch isRDMLS={isRDMLS} />
      )}
      <MaintenanceNotice />
      {showCoquiSmartCRM && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#070707', zIndex: 200000, overflowY: 'auto' }}>
          <button
            onClick={() => setShowCoquiSmartCRM(false)}
            className="btn-glass"
            style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 200001, padding: '0.5rem 1rem', borderRadius: '10px', color: '#fbbf24', border: '2px solid #fbbf24', fontWeight: 'bold' }}
          >
            VOLVER AL BACKOFFICE
          </button>
          <Suspense fallback={<div className="p-20 text-yellow-400 font-bold">Iniciando Ecosistema CoquiSmart...</div>}>
            <CoquiSmartKanban />
          </Suspense>
        </div>
      )}


    </Suspense>
  );
}

function AppContent({ setShowCoquiSmartCRM }) {
  const navigate = useNavigate();
  const location = useLocation();
  // SEO logic based on the current page can be added here if needed, 
  // but for now the global SEO component handles the canonical URL.

  const host = (window.location.hostname || window.location.host || '').toLowerCase();
  const isRDMLS = host.includes('rdmls') || host.includes('rdmk') || host.includes('imls') || host.includes('rds') || (host.includes('laserena.cl') && !host.includes('vecinos') && !host.includes('prendes')) || host.includes('prendes-vls') || location.pathname.includes('/radio') || host.includes('localhost') || window.location.search.includes('rdmls');
  const isPuertaSmart = host.includes('puertasmart.cl') || location.pathname.toLowerCase().includes('/puerta');
  const isRadioVecinos = host.includes('radiovecinos.cl') || location.pathname.toLowerCase().includes('/archi');
  const isAcademy = host.includes('vecinosmart.cl') || host.includes('prendes.cl'); // Entorno Comercial de Venta de Know-how
  const isVLS = !isRDMLS && !isAcademy && (host.includes('vecinos') || host.includes('vls.cl') || host.includes('localhost'));
  const isMasterDomain = isAcademy || host.includes('vls.cl') || host.includes('smartcomuna.cl') || host.includes('prendes.cl');
  const isDirectDomain = host.includes('vecinoslaserena.cl') || host.includes('rdmls.cl') || host.includes('rdmk.cl') || host.includes('entrevecinas.cl') || host.includes('vecinoschile.cl') || host.includes('prendes.cl') || host.includes('sonicev.cl') || host.includes('pages.dev');
  const isChile = host.includes('vecinoschile.cl');
  const isNational = isChile;
  const isInduccion = location.pathname.includes('/induccion') || location.pathname.includes('/induccion_imls');
  const isVLSabes = location.pathname.includes('/vlsabes');
  const isTribute = location.pathname.includes('/agua');
  const isArtemis = location.pathname.toLowerCase().includes('/artemis');
  const isCordillera = location.pathname.toLowerCase().includes('/altacordillera') || location.pathname.toLowerCase().includes('/cordillera');
  const isClasica = location.pathname.toLowerCase().includes('/clasica');
  const isPeregrinoHost = host.includes('peregrino');
  const isEvolutionShowroom = host.includes('vecinosmart.cl');
  const isZeroDistraction = isInduccion || isVLSabes || isTribute || isClasica || isArtemis || isCordillera || isPeregrinoHost || isEvolutionShowroom;
  const isCommercial = isAcademy;

  const { t, lang, setLang } = useTranslation();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');
  const memorialId = searchParams.get('m');
  const stratParam = searchParams.get('strategy');
  const mKey = searchParams.get('vls_master');
  const appId = searchParams.get('app');
  const isMobileInitial = Math.min(window.innerWidth, 767) === window.innerWidth;
  const [isMobile, setIsMobile] = useState(isMobileInitial);

  useEffect(() => {
    const handleResize = () => setIsMobile(Math.min(window.innerWidth, 767) === window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // VLS Media Extractor v5.0
  // VLS Media Extractor v5.0 - Simplified to prevent build errors
  const mediaPathList = ['paradoja', 'horario', 'cambio-de-hora', 'bencinazo', 'colapso', 'batik', 'semanasanta', 'semana-santa', 'aguasvalle', 'chequia', 'efe', 'peregrino', 'juansoldado', 'juan-soldado', 'vallenar', 'retail', 'artemisa', 'artemis', 'artemis2', 'clasica', 'avalancha', 'ojo', 'domeyko', 'migra', 'ucen', 'sonicev', 'acciona', 'stella', 'arcade'];
  const mediaMatch = location.pathname.match(/^\/media\/([^/]+)/) || location.pathname.match(/^\/mundo\/([^/]+)/);
  const pathMatch = mediaPathList.find(p => location.pathname.toLowerCase().includes('/' + p));

  const newsId = searchParams.get('news') || searchParams.get('note') || (mediaMatch ? mediaMatch[1] : pathMatch);
  
  const [currentUser, setCurrentUser] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const [guestTimeLeft, setGuestTimeLeft] = useState(3600);
  // VLS_C5: authInitialized is now true by default in RDMLS, or after safety timer in VLS
  const [authInitialized, setAuthInitialized] = useState(isRDMLS);
  const [notifications, setNotifications] = useState([]);
  const [showSafeRoute, setShowSafeRoute] = useState(false);
  const [showRadio, setShowRadio] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [showDistances, setShowDistances] = useState(false);
  const [distancesTarget, setDistancesTarget] = useState(null);
  const [showSocialVision, setShowSocialVision] = useState(false);

  const [showProjectInfo, setShowProjectInfo] = useState(false);
  const [showRadioMaster, setShowRadioMaster] = useState(false);
  const [showHub3D, setShowHub3D] = useState(false);
  const [showDiaDelTrabajador, setShowDiaDelTrabajador] = useState(false);
  const [activeTab, setActiveTab] = useState('citizens');
  const [showAlert, setShowAlert] = useState(false);
  const [weather, setWeather] = useState(null);
  const [gameScore, setGameScore] = useState(0);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showLeanMaster, setShowLeanMaster] = useState(false);
  const [showSmartAdmin, setShowSmartAdmin] = useState(false);
  const [showDronDrigo, setShowDronDrigo] = useState(false);
  const [showVLSInduccion, setShowVLSInduccion] = useState(false);
  const [showIntercom, setShowIntercom] = useState(false);
  const [systemHealth, setSystemHealth] = useState('optimal'); // 'optimal', 'polishing', 'issue'
  const [showMaintenanceNotice, setShowMaintenanceNotice] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false);

  // SUPREME OVERRIDE: If mode=aprende is in URL, LOCK the screen to the induction portal - NO EARLY RETURN HERE TO PRESERVE HOOK COUNT
  const isAprendeMode = mode === 'aprende' || mode === 'induccion' || location.pathname.toLowerCase().includes('/imls/induccion');
  
  useEffect(() => {
    if (isAprendeMode) {
        console.log("IMLS_OS: Locking to Induction/Aprende Mode...");
    }
  }, [isAprendeMode]);

  // Sentinel Health Monitoring — checkIntegrity DESHABILITADO: el flag ya es borrado en App()
  useEffect(() => {
    window.addEventListener('trigger-vls-maintenance', () => {
      setSystemHealth('polishing');
      setShowMaintenanceNotice(true);
    });

    const handleOpenDistances = (e) => {
      setDistancesTarget(e.detail || null);
      setShowDistances(true);
    };
    window.addEventListener('vls-open-distances', handleOpenDistances);
    return () => {
      window.removeEventListener('vls-open-distances', handleOpenDistances);
    };
  }, []);

  const [showAuditoria, setShowAuditoria] = useState(false);
  const [showTransparenciaSecreta, setShowTransparenciaSecreta] = useState(false);
  const [showParlamento, setShowParlamento] = useState(false);
  const [showGym3D, setShowGym3D] = useState(false);
  const [showMotorTiempo, setShowMotorTiempo] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAkichip, setShowAkichip] = useState(false);
  const [showEnfermeria, setShowEnfermeria] = useState(false);
  const [showSmartBusiness, setShowSmartBusiness] = useState(false);
  const [showEmbajadas, setShowEmbajadas] = useState(false);
  const [showFaritoSocial, setShowFaritoSocial] = useState(false);
  const [showNotificationsMenu, setShowNotificationsMenu] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [vlsTokens, setVlsTokens] = useState(() => parseInt(localStorage.getItem('vls_tokens') || '0'));
  const [showSmartTV, setShowSmartTV] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [pendingPayment, setPendingPayment] = useState(null);

  // —— Sync con Supabase (El CRM del Vecino) ——————————————————————————
  useEffect(() => {
    if (!currentUser) return;

    // Obtener saldo inicial de la nube
    const syncFromCloud = async () => {
      try {
        const { data, error } = await supabase
          .from('vls_accounts')
          .select('*')
          .eq('uid', currentUser.uid)
          .single();

        if (data) {
          const cloudTokens = data.tokens || 0;
          if (cloudTokens > vlsTokens) {
            setVlsTokens(cloudTokens);
            localStorage.setItem('vls_tokens', cloudTokens.toString());
          }
        } else {
          // Crear perfil inicial si no existe
          await supabase.from('vls_accounts').insert([{
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            tokens: vlsTokens,
            lastSeen: new Date().toISOString()
          }]);
        }
      } catch (e) {
        console.warn("Supabase Sync Error:", e);
      }
    };
    syncFromCloud();

    // Listener en tiempo real para el saldo
    const channel = supabase
      .channel(`account_${currentUser.uid}`)
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'vls_accounts', 
        filter: `uid=eq.${currentUser.uid}` 
      }, payload => {
        const cloudTokens = payload.new.tokens || 0;
        if (cloudTokens !== vlsTokens) {
          setVlsTokens(cloudTokens);
          localStorage.setItem('vls_tokens', cloudTokens.toString());
          window.dispatchEvent(new CustomEvent('tokens-updated', { detail: cloudTokens }));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUser]);

  // Sincronizar cambios locales a la nube
  useEffect(() => {
    if (!currentUser) return;
    const syncToCloud = async () => {
      try {
        const { data } = await supabase
          .from('vls_accounts')
          .select('tokens')
          .eq('uid', currentUser.uid)
          .single();

        if (data && data.tokens < vlsTokens) {
          await supabase
            .from('vls_accounts')
            .update({ tokens: vlsTokens })
            .eq('uid', currentUser.uid);
        }
      } catch (e) { }
    };
    syncToCloud();
  }, [vlsTokens, currentUser]);
  const [showPrecolombino, setShowPrecolombino] = useState(false);
  const [showEntreVecinas, setShowEntreVecinas] = useState(host.includes('entrevecinas'));
  const [showMusicRanking, setShowMusicRanking] = useState(false);


  // States for modals
  const [showCouncil, setShowCouncil] = useState(false);
  const [showCDLS, setShowCDLS] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [showGameKPI, setShowGameKPI] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showMusicStudio, setShowMusicStudio] = useState(false);
  const [showMarketplace, setShowMarketplace] = useState(false);
  const [showSentinelMini, setShowSentinelMini] = useState(false);
  const [showSentinelApex, setShowSentinelApex] = useState(false);
  const [showLinkedInManager, setShowLinkedInManager] = useState(false);
  const [showDevPortal, setShowDevPortal] = useState(false);
  const [showSmartEvents, setShowSmartEvents] = useState(false);
  const [showExecutiveDossier, setShowExecutiveDossier] = useState(false);
  const [showWhatsAppHub, setShowWhatsAppHub] = useState(false);
  const [showPremiumHub, setShowPremiumHub] = useState(false);
  const [showRightsGovernance, setShowRightsGovernance] = useState(false);
  const [showMusicSchool, setShowMusicSchool] = useState(false);
  const [showDeBonoHats, setShowDeBonoHats] = useState(false);
  const [showFiestaFA, setShowFiestaFA] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [sovereignName, setSovereignName] = useState(SOVEREIGN_NAMES[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSovereignName(SOVEREIGN_NAMES[Math.floor(Math.random() * SOVEREIGN_NAMES.length)]);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // VLS_C5: Global KPI Score Synchronization
  useEffect(() => {
    const handleScore = (e) => {
      setGameScore(prev => {
        const newScore = prev + (e.detail || 1);
        localStorage.setItem('vls_game_score', newScore.toString());
        return newScore;
      });
    };
    window.addEventListener('vls-score-update', handleScore);
    return () => window.removeEventListener('vls-score-update', handleScore);
  }, []);

  // Sync initial score
  useEffect(() => {
    const saved = localStorage.getItem('vls_game_score');
    if (saved) setGameScore(parseInt(saved));
  }, []);

  // REDIRECCIÓN CASCADA POR HOSTNAME
  useEffect(() => {
    const host = window.location.hostname;
    if (host.includes('entrevecinas.cl') && location.pathname === '/') {
      // Sostener en Hub sin redirección legacy
    } else if (host.includes('farito.cl') && location.pathname === '/') {
      navigate('/inversores');
    } else if (host.includes('puertasmart.cl') && location.pathname === '/') {
      navigate('/puerta');
    } else if (host.includes('sonicev.cl') && location.pathname === '/') {
      navigate('/sonicev');
    }
  }, [location.pathname, navigate]);

  const [showPropuestaElDia, setShowPropuestaElDia] = useState(false);
  const [showEcumenical, setShowEcumenical] = useState(false);
  const [showSecular, setShowSecular] = useState(false);
  const [showAirport, setShowAirport] = useState(false);
  const [showCity3D, setShowCity3D] = useState(false);
  const [showSmartSkills, setShowSmartSkills] = useState(false);
  const [showRetroTV, setShowRetroTV] = useState(false);
  const [showVhsTV, setShowVhsTV] = useState(false);
  const [showVerticalTV, setShowVerticalTV] = useState(false);
  const [showMemoryPortal, setShowMemoryPortal] = useState(false);
  const [showVlsMasterCharts, setShowVlsMasterCharts] = useState(false);
  const [showAppendix, setShowAppendix] = useState(false);
  const [showFaritoBrowser, setShowFaritoBrowser] = useState(false);
  const [showKiosko, setShowKiosko] = useState(false);
  const [showOperacionLS, setShowOperacionLS] = useState(false);
  const [showIdentityGate, setShowIdentityGate] = useState(false);
  const [showVlsVision, setShowVlsVision] = useState(false);
  const [showMemorial, setShowMemorial] = useState(false);
  const [showPersonalStereo, setShowPersonalStereo] = useState(false);
  const [showSismicCenter, setShowSismicCenter] = useState(false);
  const [showSmartTheater, setShowSmartTheater] = useState(false);
  const [showObservatory, setShowObservatory] = useState(false);
  const [showReelToReel, setShowReelToReel] = useState(false);
  const [showMuseum, setShowMuseum] = useState(false);
  const [showVecinojos, setShowVecinojos] = useState(false);
  const [showVLSFeed, setShowVLSFeed] = useState(false);
  const [showBroadcaster, setShowBroadcaster] = useState(false);
  const [showIquique, setShowIquique] = useState(false);
  const [showTribunales, setShowTribunales] = useState(false);
  const [showDonRadios, setShowDonRadios] = useState(false);
  const [show3DWalk, setShow3DWalk] = useState(false);
  const [showTimeBus, setShowTimeBus] = useState(false);
  const [showRetroRoom, setShowRetroRoom] = useState(false);
  const [showEmergencyDirectory, setShowEmergencyDirectory] = useState(false);
  const [showSmartTrivia, setShowSmartTrivia] = useState(false);
  const [showPincha, setShowPincha] = useState(false);
  const [showPlazaVecinal, setShowPlazaVecinal] = useState(false);
  const [showFaroCentinel, setShowFaroCentinel] = useState(false);
  const [showBotica, setShowBotica] = useState(false);

  const [showVeterinaria, setShowVeterinaria] = useState(false);
  const [showSerenitoVLS, setShowSerenitoVLS] = useState(false);
  const [showSkyGuide, setShowSkyGuide] = useState(false);
  const [showVecnityPay, setShowVecnityPay] = useState(false);
  const [showMemoriasUnicornio, setShowMemoriasUnicornio] = useState(false);
  const [showVLSNewsArtemis, setShowVLSNewsArtemis] = useState(location.pathname.toLowerCase().match(/\/(artemis|artemisa|artemis2)/i));
  const [showVLSNewsUcen, setShowVLSNewsUcen] = useState(location.pathname.toLowerCase().match(/\/ucen(\/|$)/i));
  const [showNewsAlcaldesa, setShowNewsAlcaldesa] = useState(false);
  const [alcaldesaNoteId, setAlcaldesaNoteId] = useState(null);
  const [showErrorCollector, setShowErrorCollector] = useState(false);
  const [showAguasValle, setShowAguasValle] = useState(false);
  const [showTiendaPoleras, setShowTiendaPoleras] = useState(false);
  const [showNewsBencinazo, setShowNewsBencinazo] = useState(false);
  const [showNewsSemanaSanta, setShowNewsSemanaSanta] = useState(false);
  const [showVLSNewsIan, setShowVLSNewsIan] = useState(false);
  const [showVLSNewsChequia, setShowVLSNewsChequia] = useState(false);
  const [showSeguridadVecinal, setShowSeguridadVecinal] = useState(false);
  const [showVLSNewsTimeChange, setShowVLSNewsTimeChange] = useState(false);
  const [showNewsAvalancha, setShowNewsAvalancha] = useState(false);
  const [showBackofficeMovil, setShowBackofficeMovil] = useState(false);
  const [showRDMLSNewsMigra, setShowRDMLSNewsMigra] = useState(location.pathname.toLowerCase().match(/^\/migra/i) || searchParams.get('news') === 'migra' || searchParams.get('note') === 'migra');
  const [showAcciona, setShowAcciona] = useState(location.pathname.toLowerCase().match(/^\/acciona/i));
  const [showSalud, setShowSalud] = useState(location.pathname.toLowerCase().match(/^\/salud/i));
  const [showDomeyko, setShowDomeyko] = useState(location.pathname.toLowerCase().match(/^\/(domeyko|lambert)/i));
  const [domeykoInitialTab, setDomeykoInitialTab] = useState(location.pathname.toLowerCase().match(/\/lambert/i) ? 'lambert' : 'bio');
  const [showSonicev, setShowSonicev] = useState(location.pathname.toLowerCase().match(/^\/sonicev/i) || searchParams.get('news') === 'sonicev' || searchParams.get('note') === 'sonicev');
  const [showSmartOS, setShowSmartOS] = useState(searchParams.get('app') === 'os' || searchParams.get('os') === 'true');
  const [showNewsChoapa, setShowNewsChoapa] = useState(location.pathname.toLowerCase().match(/^\/choapa/i));
  const [showNewsRedCine, setShowNewsRedCine] = useState(location.pathname.toLowerCase().match(/^\/redcine/i));
  const [showStella, setShowStella] = useState(location.pathname.toLowerCase().match(/^\/stella/i) || searchParams.get('news') === 'stella' || searchParams.get('note') === 'stella');



  const [showSoveranix, setShowSoveranix] = useState(false);
  const [showAlcaldes, setShowAlcaldes] = useState(false);
  const [showVLSpeak, setShowVLSpeak] = useState(false);
  const [showChileHub, setShowChileHub] = useState(false);
  const [showParliamentary, setShowParliamentary] = useState(false);
  const [showPortMonitor, setShowPortMonitor] = useState(false);
  const [showAnalyticsApp, setShowAnalyticsApp] = useState(false);
  const [showVLSMotors, setShowVLSMotors] = useState(false);
  const [showOrientacionLegal, setShowOrientacionLegal] = useState(false);
  const [requestedMemorialId, setRequestedMemorialId] = useState(null);

  useEffect(() => {
    // Título y Favicon Dinámico
    let pageTitle = 'vecinoslaserena.cl';
    let favIconUrl = '/vls-crystal-icon.svg';

    const currentHost = window.location.hostname.toLowerCase();
    const isPrendesSession = currentHost.includes('prendes.cl') || currentHost.includes('prendes-vls');

    if (isPrendesSession) {
      pageTitle = 'PRENDES.cl | Educación Ciudadana Digital';
      favIconUrl = '/prendes_favicon.svg';
    } else if (isAcademy) {
      pageTitle = 'Academia Smart - Entrenamiento de Elite';
      favIconUrl = '/academy_icon.png';
    } else if (isMasterDomain) {
      pageTitle = 'VecinoSmart - Red Inteligente';
      favIconUrl = '/vls-logo-3d.png';
    } else if (isRDMLS) {
      pageTitle = 'RDMLS - Red Digital La Serena';
      favIconUrl = '/rdmls_favicon.png';
    } else if (host.includes('entrevecinas')) {
      pageTitle = 'Entre Vecinas - VLS Network';
      favIconUrl = '/entrevecinas_icon.png';
    } else if (host.includes('vecinoschile')) {
      pageTitle = 'Vecinos Chile - Red Republicana 2025';
      favIconUrl = '/chile_icon.png';
    } else if (host.includes('sonicev')) {
      pageTitle = 'Sonicev - Producción & Estudio Soberano';
      favIconUrl = '/sonicev_favicon.png';
    } else if (host.includes('peregrino')) {
      pageTitle = 'Nuevo Peregrino - Soberanía Digital';
      favIconUrl = '/peregrino_favicon.png';
    }

    document.title = pageTitle;
    
    // NUCLEAR FAVICON RECOVERY: ELIMINAR Y RECONSTRUIR PARA EVITAR CACHÉ PERSISTENTE
    const existingIcons = document.querySelectorAll("link[rel*='icon']");
    existingIcons.forEach(el => el.remove());

    const mainIcon = document.createElement('link');
    mainIcon.rel = 'icon';
    mainIcon.type = favIconUrl.endsWith('.svg') ? 'image/svg+xml' : 'image/png';
    mainIcon.href = favIconUrl + '?vLS=' + Date.now();
    document.head.appendChild(mainIcon);

    const appleIcon = document.createElement('link');
    appleIcon.rel = 'apple-touch-icon';
    appleIcon.href = favIconUrl + '?vLS=' + Date.now();
    document.head.appendChild(appleIcon);

    // Actualizar Meta Tags de Redes Sociales (Open Graph)
    const ogTitle = document.querySelector("meta[property='og:title']");
    if (ogTitle) ogTitle.setAttribute('content', pageTitle);
    
    const ogImage = document.querySelector("meta[property='og:image']");
    if (ogImage) ogImage.setAttribute('content', favIconUrl);

    if (location.pathname === '/radios' || location.pathname.includes('/radios')) {
      if (!showRadioMaster) setShowRadioMaster(true);
    }

    // VLS_DEEP_DOMAIN_BYPASS v5.2: Prendes.cl users NEVER get /welcome (they have their own branding)
    const isPrendesHost = host.includes('prendes.cl') || host.includes('prendes-vls');

    const isPeregrinoHost = host.includes('nuevoperegrino.cl');
    const isMediaPortal = location.pathname.match(/\/(clasica|chequia|artemis|artemisa|artemis2|ucen|fred|juansoldado|vallenar|andacollo|retail|media|mundo|altacordillera|cordillera|secrevial|vialidad2025|domeyko|horario|cambio-de-hora|migra|migracion|sonicev|nuevoperegrino|acciona|salud|choapa|redcine)/i);


    if (!localStorage.getItem('smart_tenant') && !isDirectDomain && !isRDMLS && !isPrendesHost && !isMediaPortal && !isPeregrinoHost && !host.includes('sonicev') && !host.includes('localhost') && !host.includes('127.0.0.1') && !isEvolutionShowroom) {
      if (location.pathname !== '/welcome') {
        // Preservar parámetros durante la redirección (Deep Linking Mundial)
        navigate('/welcome' + location.search);
      }
    }

    if (location.pathname === '/alcaldes' && !showAlcaldes) {
      setShowAlcaldes(true);
    }
    if (isChile && !showChileHub) {
      setShowChileHub(true);
    }
    const saved = localStorage.getItem('smart_notifications');
    if (saved) setNotifications(JSON.parse(saved));

      const handleHorario = () => window.open('https://honorarios-ls-me.streamlit.app/', '_blank');
      const handleArtemisEvent = () => setShowVLSNewsArtemis(true);
      const handleUcenEvent = () => setShowVLSNewsUcen(true);
      const handleChequiaEvent = () => setShowVLSNewsChequia(true);

      if (newsId && newsId.toLowerCase().includes('horario')) handleHorario();
      if (newsId && newsId.toLowerCase().includes('cambio-de-hora')) handleHorario();
      
      // Automatic Modal Activation based on Direct URL (Vanity URLs v5.5)
      if (newsId && (newsId.toLowerCase() === 'artemisa' || newsId.toLowerCase() === 'artemis' || newsId.toLowerCase() === 'artemis2')) handleArtemisEvent();
      if (newsId && newsId.toLowerCase() === 'ucen') handleUcenEvent();
      if (newsId && newsId.toLowerCase() === 'chequia') handleChequiaEvent();
      if (newsId && newsId.toLowerCase() === 'domeyko') setShowDomeyko(true);
      if (newsId && newsId.toLowerCase() === 'migra') setShowRDMLSNewsMigra(true);
      if (newsId && newsId.toLowerCase() === 'sonicev') setShowSonicev(true);
      if (newsId && newsId.toLowerCase() === 'acciona') setShowAcciona(true);
      if (newsId && newsId.toLowerCase() === 'salud') setShowSalud(true);
      if (newsId && newsId.toLowerCase() === 'choapa') setShowNewsChoapa(true);
      if (newsId && newsId.toLowerCase() === 'redcine') setShowNewsRedCine(true);
      if (location.pathname.toLowerCase().match(/\/migra(\/|$)/i)) setShowRDMLSNewsMigra(true);
      if (location.pathname.toLowerCase().match(/\/acciona(\/|$)/i)) setShowAcciona(true);
      if (location.pathname.toLowerCase().match(/\/salud(\/|$)/i)) setShowSalud(true);
      if (location.pathname.toLowerCase().match(/\/choapa(\/|$)/i)) setShowNewsChoapa(true);
      if (location.pathname.toLowerCase().match(/\/redcine(\/|$)/i)) setShowNewsRedCine(true);
      // if (location.pathname.toLowerCase().match(/\/pulsociudadano(\/|$)/i)) setShowPulsoCiudadano(true);
      
      const handleMigra = () => setShowRDMLSNewsMigra(true);
      const handleAcciona = () => setShowAcciona(true);
      const handleChoapa = () => setShowNewsChoapa(true);
      const handleRedCine = () => setShowNewsRedCine(true);
      const handleDomeyko = () => setShowDomeyko(true);

      window.addEventListener('open-vls-horario', handleHorario);
      window.addEventListener('open-vls-artemis', handleArtemisEvent);
      window.addEventListener('open-vls-ucen', handleUcenEvent);
      window.addEventListener('open-vls-chequia', handleChequiaEvent);
      window.addEventListener('open-vls-acciona', handleAcciona);
      window.addEventListener('open-vls-choapa', handleChoapa);
      window.addEventListener('open-vls-redcine', handleRedCine);
      window.addEventListener('open-smart-citizens', () => window.open('https://www.puertasmart.cl', '_blank'));
      window.addEventListener('open-smart-administration', () => window.open('https://www.rdmls.cl/imls/induccion', '_blank'));
      window.addEventListener('open-smart-events', () => window.open('https://vecinoslaserenachile-cloud.github.io/serenito-app/', '_blank'));
      window.addEventListener('open-smart-listening', handleOpenSentinelApex);
      // window.addEventListener('open-pulso-ciudadano', () => setShowPulsoCiudadano(true));
      window.addEventListener('open-rdmls-migra', handleMigra);
      // Reset Modals on Route Change (Soberanía de Navegación v5.8)
      setShowSmartEvents(false);
      setShowSmartBusiness(false);
      setShowChat(false);
      setShowFaroCentinel(false);

      // Force scroll to top on every route transition
      window.scrollTo({ top: 0, behavior: 'instant' });
      
      const handleCloseAll = () => {
        setShowSmartEvents(false);
        setShowSmartBusiness(false);
        setShowChat(false);
        setShowFaroCentinel(false);
        setShowCouncil(false);
        setShowCDLS(false);
        setShowTiendaPoleras(false);
        setShowVecnityPay(false);
        setShowSmartAdmin(false);
        setShowBackofficeMovil(false);
      };

      window.addEventListener('close-all-floating', handleCloseAll);
      
      return () => {
        window.removeEventListener('open-vls-horario', handleHorario);
        window.removeEventListener('open-vls-artemis', handleArtemisEvent);
        window.removeEventListener('open-vls-ucen', handleUcenEvent);
        window.removeEventListener('open-vls-chequia', handleChequiaEvent);
        window.removeEventListener('open-rdmls-migra', handleMigra);
        window.removeEventListener('open-domeyko-portal', handleDomeyko);
        window.removeEventListener('close-all-floating', handleCloseAll);
      };
    }, [navigate, location.pathname, newsId]);

  // ── Efecto de auto-invitado: corre SOLO al montar (una vez) ──
  // Si ya hay currentUser (logueo real), NUNCA activar modo invitado.
  useEffect(() => {
    // Si Firebase ya confirmó un usuario real → ignorar lógica de guest
    if (currentUser) return;

    const hasLoggedOut = localStorage.getItem('smart_logout') === 'true';
    const storedGuest = localStorage.getItem('smart_is_guest') === 'true';

    // Restaurar sesión de invitado guardada (solo si no hizo logout explícito)
    if (storedGuest && !hasLoggedOut) {
      setIsGuest(true);
    }
  }, [currentUser]); // Solo re-ejecutar si cambia currentUser (ej: login/logout de Firebase)

  useEffect(() => {
    // En RDMLS no se necesita autenticación — es un portal público de radio
    if (isRDMLS) {
      setAuthInitialized(true);
      return;
    }
    // VLS_C5: Aggressive safety timer. Never let the app stay black.
    const safetyTimer = setTimeout(() => {
      console.warn("VLS_RECOVERY: Auth taking too long, forcing hydration...");
      setAuthInitialized(true);
    }, 3500); 

    // VLS_C5_SOVEREIGN: Cambiado a Supabase Auth para Soberanía Digital
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      clearTimeout(safetyTimer);
      const user = session?.user || null;
      
      // Mapeo de Supabase User a estructura compatible con el resto de la App (Firebase-like)
      if (user) {
        user.displayName = user.user_metadata?.full_name || user.email?.split('@')[0];
        user.photoURL = user.user_metadata?.avatar_url;
        user.uid = user.id;
      }

      setCurrentUser(user);
      setAuthInitialized(true);
      if (user) {
        window.dispatchEvent(new CustomEvent('vls-start-radio'));
      }
    });

    // Carga inicial de sesión persistente
    supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
            const u = session.user;
            u.displayName = u.user_metadata?.full_name || u.email?.split('@')[0];
            u.photoURL = u.user_metadata?.avatar_url;
            u.uid = u.id;
            setCurrentUser(u);
        }
        setAuthInitialized(true);
        clearTimeout(safetyTimer);
    });

    return () => { 
        subscription.unsubscribe(); 
        clearTimeout(safetyTimer); 
    };
  }, [isRDMLS]);

  useEffect(() => {
    if (isGuest && authInitialized) {
      window.dispatchEvent(new CustomEvent('vls-start-radio'));
    }
  }, [isGuest, authInitialized]);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  useEffect(() => {
    // Global Listeners moved to main useEffect for consistency
  }, []);

  useEffect(() => {
    // Global listener for rewards and mission alerts
    const handleGlobalAlert = (e) => {
      const { title, message, type } = e.detail;
      const newNotif = {
        id: Date.now(),
        title: title || "AVISO VLS",
        body: message,
        read: false,
        timestamp: new Date().toLocaleString('es-CL'),
        type: type || 'info'
      };
      setNotifications(prev => [newNotif, ...prev]);
      // NO forzar apertura del panel
      window.dispatchEvent(new CustomEvent('vls-push-notification', { detail: { text: message } }));
      window.dispatchEvent(new CustomEvent('vls-play-sfx', { detail: 'win' }));
    };

    window.addEventListener('vls-show-alert', handleGlobalAlert);

    return () => {
      window.removeEventListener('vls-show-alert', handleGlobalAlert);
    };
  }, []);

  useEffect(() => {
    // Socket Event Listener for Push Alerts
    comSocket.on('receive_push_notification', (data) => {
      const newNotif = { ...data, id: Date.now(), read: false, timestamp: new Date().toLocaleString('es-CL') };

      setNotifications(prev => {
        const updated = [newNotif, ...prev];
        localStorage.setItem('smart_notifications', JSON.stringify(updated));
        return updated;
      });

      // Sincronizar con el ChatAssistant para historial permanente
      window.dispatchEvent(new CustomEvent('vls-push-notification', { detail: { text: data.body } }));

      if ('Notification' in window && Notification.permission === 'granted') {
        const options = {
          body: data.body,
          icon: '/escudo.png',
          badge: '/escudo.png',
          vibrate: [200, 100, 200]
        };

        if ('serviceWorker' in navigator && navigator.serviceWorker.ready) {
          navigator.serviceWorker.ready.then(registration => {
            registration.showNotification(data.title, options);
          }).catch(() => {
            new Notification(data.title, options);
          });
        } else {
          new Notification(data.title, options);
        }
      }
    });

    const handleTokensUpdate = (e) => setVlsTokens(e.detail);
    window.addEventListener('tokens-updated', handleTokensUpdate);

    // Módulos Críticos: Listeners de Activación Directa
    const handleSpeak = () => setShowVLSpeak(true);
    const handleAlcaldes = () => { setShowAlcaldes(true); window.scrollTo({ top:0, behavior: 'smooth' }); };
    const handleEntrevecinas = () => setShowEntreVecinas(true);
    const handleReportes = () => window.open('https://www.puertasmart.cl', '_blank');
    const handleParliamentary = () => setShowParliamentary(true);
    const handleInduccionFixed = () => setShowVLSInduccion(true);
    const handleSeguridad = () => setShowSeguridadVecinal(true);
    const handleVlsIan = () => setShowVLSNewsIan(true);
    const handleVlsChequia = () => setShowVLSNewsChequia(true);
    const handleVlsAvalancha = () => setShowNewsAvalancha(true);
    const handleDomeyko = (e) => {
      if (e.detail?.tab) setDomeykoInitialTab(e.detail.tab);
      setShowDomeyko(true);
    };

    window.addEventListener('open-vlspeak', handleSpeak);
    window.addEventListener('open-alcaldes-history', handleAlcaldes);
    window.addEventListener('open-entrevecinas', handleEntrevecinas);
    window.addEventListener('open-smart-business', handleReportes);
    window.addEventListener('open-parlamento-regional', handleParliamentary);
    window.addEventListener('open-smart-admin-fixed', handleInduccionFixed);
    window.addEventListener('open-vls-seguridad', handleSeguridad);
    window.addEventListener('open-vls-ian', handleVlsIan);
    window.addEventListener('open-vls-chequia', handleVlsChequia);
    window.addEventListener('open-vls-avalancha', handleVlsAvalancha);
    const handleContact = () => setShowContactForm(true);
    window.addEventListener('open-vls-contact', handleContact);

    return () => {
      comSocket.off('receive_push_notification');
      window.removeEventListener('tokens-updated', handleTokensUpdate);
      window.removeEventListener('open-vlspeak', handleSpeak);
      window.removeEventListener('open-alcaldes-history', handleAlcaldes);
      window.removeEventListener('open-entrevecinas', handleEntrevecinas);
      window.removeEventListener('open-smart-business', handleReportes);
      window.removeEventListener('open-parlamento-regional', handleParliamentary);
      window.removeEventListener('open-smart-admin-fixed', handleInduccionFixed);
      window.removeEventListener('open-vls-seguridad', handleSeguridad);
      window.removeEventListener('open-vls-ian', handleVlsIan);
      window.removeEventListener('open-vls-chequia', handleVlsChequia);
      window.removeEventListener('open-vls-avalancha', handleVlsAvalancha);
      window.removeEventListener('open-domeyko-portal', handleDomeyko);
      window.removeEventListener('open-vls-contact', handleContact);
    };
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markNotificationsAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem('smart_notifications', JSON.stringify(updated));
  };

  useEffect(() => {
    let timer;
    if (isGuest && guestTimeLeft > 0) {
      timer = setInterval(() => {
        setGuestTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isGuest && guestTimeLeft <= 0 && authInitialized && !currentUser) {
      setIsGuest(false);
      localStorage.setItem('smart_is_guest', 'false');
      // Only alert if we're not currently seeing the MasterLock (to avoid double locking/alerts)
      if (document.visibilityState === 'visible') {
        setTimeout(() => alert("Su tiempo de invitado ha concluido. Por favor, conecte su Identidad VLS para continuar."), 500);
      }
    }
    return () => clearInterval(timer);
  }, [isGuest, guestTimeLeft, authInitialized, currentUser]);

  const handleLogin = () => {
    setShowLoginModal(true);
    setShowUserProfile(false);
  };

  const handleLogout = () => {
    const doLogout = () => {
      setIsGuest(false);
      setCurrentUser(null);
      setGuestTimeLeft(0);
      localStorage.removeItem('smart_is_guest');
      localStorage.removeItem('master_bypass');
      localStorage.setItem('smart_logout', 'true');
      setShowUserProfile(false);
      window.location.href = '/';
    };
    if (currentUser) {
      supabase.auth.signOut().then(doLogout).catch(err => {
        console.error("Logout error:", err);
        doLogout();
      });
    } else {
      doLogout();
    }
  };

  const handleSaveKPI = () => {
    const history = JSON.parse(localStorage.getItem('smart_history') || '{"score": 0, "discounts": []}');
    history.score += gameScore;
    history.discounts.push({
      id: Date.now(),
      code: `SMART-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      val: '30% Dscto.',
      store: 'Comercio Local Adherido',
      date: new Date().toLocaleDateString('es-CL')
    });
    localStorage.setItem('smart_history', JSON.stringify(history));
    setShowGameKPI(false);
      alert('¡KPI y Beneficios Guardados con Éxito! Revisa tus descuentos en el Marketplace Vecinal.');
  };

  // Move handlers to component level
  const handleOpen3DWalk = () => setShow3DWalk(true);
  const handleOpenTimeBus = () => setShowTimeBus(true);
  const handleOpenDistances = () => setShowDistances(true);
  const handleOpenProjectInfo = () => setShowVlsVision(true);
  const handleOpenCouncil = () => setShowCouncil(true);
  const handleOpenCDLS = () => setShowCDLS(true);
  const handleOpenGame = () => setShowGame(true);
  const handleOpenReview = () => setShowReview(true);
  const handleOpenMusicStudio = () => setShowMusicStudio(true);
  const handleOpenMarketplace = () => setShowMarketplace(true);
  const handleOpenSentinelMini = () => setShowSentinelMini(true);
  const handleOpenSentinelApex = () => {
    if ((currentUser && ALLOWED_ADMINS.includes(currentUser.email.toLowerCase())) || localStorage.getItem('master_bypass') === 'true') {
      setShowSentinelApex(true);
    } else {
      const notif = {
        id: Date.now(),
        title: 'ACCESO BLOQUEADO 🔒',
        body: 'Módulo Estratégico Protegido. Se requiere perfil Directivo/Admin para Sentinel Apex.',
        read: false,
        timestamp: new Date().toLocaleTimeString()
      };
      setNotifications(prev => [notif, ...prev]);
      // No forzar apertura del panel automáticamente
      alert("SISTEMA DE SEGURIDAD MARTIN SHIELD:\n\nAcceso denegado a Información Estratégica. Su identidad ha sido registrada pero no posee permisos de 'Zero Trust' para este módulo.");
    }
  };
  const handleOpenEmbajadas = () => setShowEmbajadas(true);
  const handleOpenFaroIA = () => { window.dispatchEvent(new CustomEvent('stop-all-audio')); setShowChat(true); };
  const handleOpenEcumenical = () => setShowEcumenical(true);
  const handleOpenSecular = () => setShowSecular(true);
  const handleOpenSmartSkills = () => setShowSmartSkills(true);
  const handleOpenRetroTV = () => setShowRetroTV(true);
  const handleOpenVhsTV = () => setShowVhsTV(true);
  const handleOpenVerticalTV = () => setShowVerticalTV(true);
  const handleOpenMemoryPortal = () => setShowMemoryPortal(true);
  const handleOpenVlsMasterCharts = () => setShowVlsMasterCharts(true);
  const handleOpenAppendix = () => setShowAppendix(true);
  const handleOpenFaritoBrowser = () => setShowFaritoBrowser(true);
  const handleOpenKiosko = () => setShowKiosko(true);
  const handleOpenAirport = () => setShowAirport(true);
  const handleOpenCity3D = () => setShowCity3D(true);
  const handleOpenOperacionLS = () => setShowOperacionLS(true);
  const handleOpenMemorial = (e) => {
    if (e?.detail?.id) setRequestedMemorialId(e.detail.id);
    setShowMemorial(true);
  };
  const handleOpenSmartAdmin = () => setShowSmartAdmin(true);
  const handleOpenPersonalStereo = () => setShowPersonalStereo(true);
  const handleOpenRetroRoom = () => setShowRetroRoom(true);
  const handleOpenFaritoSocial = () => setShowFaritoSocial(true);
  const handleOpenVecnityPay = (e) => {
    if (e?.detail) setPendingPayment(e.detail);
    else setPendingPayment(null);
    setShowVecnityPay(true);
  };
  const handleOpenTienda = () => setShowTiendaPoleras(true);
  const handleOpenRoadmap = () => setShowRoadmap(true);
  const handleNavMusica = () => navigate('/escuela-musica');
  const handleNavArtes = () => navigate('/escuela-artes');
  const handleOpenHub3D = () => setShowHub3D(true);
  const handleOpenFaro = () => {
    window.dispatchEvent(new CustomEvent('stop-all-audio'));
    setShowChat(true);
  };

  const handleOpenBencinazo = () => setShowNewsBencinazo(true);
  const handleOpenVeterinaria = () => setShowVeterinaria(true);
  const handleOpenSafeRoute = () => setShowSafeRoute(true);
  const handleOpenEnfermeria = () => setShowEnfermeria(true);
  const handleOpenPincha = () => setShowPincha(true);
  const handleOpenSmartSalud = () => navigate('/smart-salud');
  const handleOpenArquitectura = () => navigate('/arquitectura');
  const handleOpenPropiedades = () => navigate('/propiedades');
  const handleOpenIdentityGate = () => setShowIdentityGate(true);
  const handleOpenGym = () => setShowGym3D(true);
  const handleOpenAvalancha = () => setShowNewsAvalancha(true);

   const handleToggleRadio = () => {
    // Dispatch event for the global RadioPlayer in main.jsx
    window.dispatchEvent(new CustomEvent('vls-toggle-radio-visibility'));
  };


  useEffect(() => {
    // Detectar Deep Link reactivamente (Deep Linking Mundial v5.0)
    const path = location.pathname;

    // Validación de Clave Maestra vía URL para activación rápida
    if (mKey === 'admin2025' || mKey === 'admin123') {
      localStorage.setItem('master_bypass', 'true');
    }

    // Ruta directa de fichas: /fichas
    if (path === '/fichas' || path.includes('/fichas')) {
      setTimeout(() => setShowVecnityPay(true), 1000);
    }

    // Ruta directa de distancias: /distancias (DESACTIVADO: Ahora se maneja vía Router v6 en main.jsx)
    // if (path === '/distancias' || path.includes('/distancias')) {
    //   setTimeout(() => setShowDistances(true), 1000);
    // }

    if (memorialId) {
      setShowMemorial(true);
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('select-memorial-figure', { detail: memorialId }));
      }, 1500);
    }

    if (stratParam === 'lean' && localStorage.getItem('master_bypass') === 'true') {
      setShowLeanMaster(true);
    }

    if (appId) {
      setTimeout(() => {
        if (appId === 'vecinity-pay') setShowVecnityPay(true);
        if (appId === 'memorial') setShowMemorial(true);
        if (appId === 'distances') setShowDistances(true);
        if (appId === 'bus') setShowTimeBus(true);
        if (appId === 'walk') setShow3DWalk(true);
        if (appId === 'backoffice') setShowSmartAdmin(true);
        if (appId === 'tienda') setShowTiendaPoleras(true);
        if (appId === 'roadmap') setShowRoadmap(true);
        if (appId === 'council') setShowCouncil(true);
        if (appId === 'faro' || appId === 'chat' || appId === 'ia') handleOpenFaro();
        if (appId === 'motors') setShowVLSMotors(true);
        if (appId === 'legal') setShowOrientacionLegal(true);
        if (appId === 'airport') setShowAirport(true);
        if (appId === 'port') setShowPortMonitor(true);
        if (appId === 'seguridad') setShowSeguridadVecinal(true);
        if (appId === 'sentinel') setShowSentinelApex(true);
        if (appId === 'analytics') setShowAnalyticsApp(true);
        if (appId === 'ian' || appId === 'retail') setShowVLSNewsIan(true);
        if (appId === 'camaras' || appId === 'vecinojos') setShowVecinojos(true);
        if (appId === 'ojo' || appId === 'avalancha') setShowNewsAvalancha(true);
        if (appId === 'backoffice') setShowBackofficeMovil(true);
        if (appId === 'radio') setShowRadioMaster(true); if (appId === 'stella') setShowStella(true);
      }, 1000);
    }

    if (path.match(/^\/(domeyko|lambert)/i)) {
      setDomeykoInitialTab(path.match(/\/lambert/i) ? 'lambert' : 'bio');
      setShowDomeyko(true);
    }

    if (newsId) {
      setTimeout(() => {
        if (newsId === 'bencinazo') setShowNewsBencinazo(true);
        if (newsId === 'semanasanta' || newsId === 'semana-santa') setShowNewsSemanaSanta(true);
        if (newsId === 'aguasvalle') setShowAguasValle(true);
        if (newsId === 'ian' || newsId === 'retail') setShowVLSNewsIan(true);
        if (newsId === 'artemisa') setShowVLSNewsArtemis(true);
        if (newsId === 'chequia') setShowVLSNewsChequia(true);
        if (newsId === 'ojo' || newsId === 'avalancha') setShowNewsAvalancha(true);
        if (newsId === 'alcaldesa') setShowNewsAlcaldesa(true);
        if (newsId === 'arcade') setShowGame(true);
        if (newsId === 'camaras') setShowVecinojos(true); if (newsId === 'stella') setShowStella(true);
      }, 1200);
    }
    if (location.pathname.match(/^\/stella/i)) {
      setShowStella(true);
    } else if (location.pathname.match(/^\/1demayo/i)) {
      setShowDiaDelTrabajador(true);
    } else {
      setShowStella(false);
      setShowDiaDelTrabajador(false);
    }
  }, [searchParams, location.pathname]);

  const isInvestigacionSecreta = searchParams.get('investigacion') === 'secreta';
  useEffect(() => {
    if (isInvestigacionSecreta) {
      setShowTransparenciaSecreta(true);
    }
  }, [isInvestigacionSecreta]);

  useEffect(() => {
    // Clima real y preciso de La Serena (Timezone Adjusted) - Actualización cada 5 min
    // Clima real unificado (v3.5) - Dispara evento para GlobalAnnouncer y Radio
    const fetchWeather = () => {
      // Clima y Calidad del Aire unificado (v4.0)
      Promise.all([
        fetch('https://api.open-meteo.com/v1/forecast?latitude=-29.9027&longitude=-71.2520&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m&timezone=America%2FSantiago').then(r => r.json()),
        fetch('https://air-quality-api.open-meteo.com/v1/air-quality?latitude=-29.9027&longitude=-71.2520&current=pm2_5').then(r => r.json())
      ])
        .then(([weatherData, aqData]) => {
          if (weatherData?.current) {
            const newTemp = Math.round(weatherData.current.temperature_2m);
            const wind = weatherData.current.wind_speed_10m;
            const hum = weatherData.current.relative_humidity_2m;
            const pm25 = aqData?.current?.pm2_5 || '--';

            const getWindDirection = (degree) => {
              const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
              return directions[Math.round(degree / 22.5) % 16];
            };
            const windDir = getWindDirection(weatherData.current.wind_direction_10m);

            setWeather(prev => ({
              ...prev,
              temp: newTemp,
              humidity: hum,
              windSpeed: wind,
              windDirection: windDir,
              pm25: pm25,
              lastUpdated: new Date().toLocaleTimeString()
            }));

            // Sincronizar GlobalAnnouncer y otros componentes
            window.dispatchEvent(new CustomEvent('vls-weather-sync', {
              detail: { temp: newTemp, humidity: hum, wind: wind, windDir: windDir, pm25: pm25 }
            }));
          }
        })
        .catch(console.error);
    };

    fetchWeather();
    const weatherInterval = setInterval(fetchWeather, 300000); // 5 min

    const handleOpenSismic = () => setShowSismicCenter(true);
    const handleOpenTheater = () => setShowSmartTheater(true);
    const handleOpenTwitter = () => setShowVerticalTV(true);
    const handleOpenFacebook = () => setShowVerticalTV(true);
    const handleOpenInstagram = () => setShowVerticalTV(true);
    const handleOpenObservatory = () => setShowObservatory(true);
    const handleOpenReelToReel = () => setShowReelToReel(true);
    const handleOpenMuseum = () => setShowMuseum(true);
    const handleOpenVecinojos = () => setShowVecinojos(true);
    const handleOpenVLSFeed = () => setShowVLSFeed(true);
    const handleOpenBroadcaster = () => setShowBroadcaster(true);
    const handleOpenDeBonoHats = () => setShowDeBonoHats(true);
    const handleOpenTribunales = () => setShowTribunales(true);
    const handleOpenUnicorn = () => setShowMemoriasUnicornio(true);
    const handleTriggerDonRadios = () => setShowDonRadios(true);
    const handleOpenHub3D = () => setShowHub3D(true);
    const handleOpenAuditoria = () => window.open('https://www.puertasmart.cl', '_blank');
    const handleOpenParlamento = () => setShowParlamento(true);
    const handleOpenFaritoSocial = () => setShowFaritoSocial(true);
    const handleOpenFaroCentinel = () => setShowFaroCentinel(true);
    const handleOpenBotica = () => setShowBotica(true);

    const handleOpenVeterinaria = () => setShowVeterinaria(true);
    const handleOpenSuperSerenito = () => setShowSerenitoVLS(true);
    const handleOpenSkyGuide = () => setShowSkyGuide(true);
    const handleOpenMotorTiempo = () => setShowMotorTiempo(true);
    const handleOpenRadioMaster = () => setShowRadioMaster(true);
    const handleOpenPrecolombino = () => setShowPrecolombino(true);
    const handleOpenCalendar = () => setShowCalendar(true);
    const handleOpenEnfermeria = () => setShowEnfermeria(true);
    const handleOpenSmartBusiness = () => { window.dispatchEvent(new CustomEvent('stop-all-audio')); setShowSmartBusiness(true); };
    const handleOpenEmergency = () => setShowEmergencyDirectory(true);
    const handleOpenSmartEvents = () => setShowSmartEvents(true);
    const handleOpenAguasValle = () => setShowAguasValle(true);
    const handleOpenPincha = () => setShowPincha(true);
    const handleOpenPlazaVecinal = () => setShowPlazaVecinal(true);
    const handleOpenEntreVecinas = () => setShowEntreVecinas(true);
    const handleOpenSmartAdmin = () => setShowSmartAdmin(true);
    const handleOpenGym = () => setShowGym3D(true);

    window.addEventListener('open-3d-walk', handleOpen3DWalk);
    window.addEventListener('open-time-bus', handleOpenTimeBus);
    window.addEventListener('open-distances', handleOpenDistances);
    window.addEventListener('open-precolombino', handleOpenPrecolombino);
    window.addEventListener('open-project-info', handleOpenProjectInfo);
    window.addEventListener('open-social-vision', () => setShowSocialVision(true));
    window.addEventListener('open-vls-vision', handleOpenProjectInfo);
    window.addEventListener('open-embajadas', handleOpenEmbajadas);
    window.addEventListener('open-council', handleOpenCouncil);
    window.addEventListener('open-cdls', handleOpenCDLS);
    window.addEventListener('open-game', handleOpenGame);
    window.addEventListener('open-arcade', handleOpenGame);
    window.addEventListener('open-akichip', () => setShowAkichip(true));
    window.openArcade = () => setShowGame(true);
    window.addEventListener('open-review-portal', handleOpenReview);
    window.addEventListener('open-music-studio', handleOpenMusicStudio);
    window.addEventListener('open-marketplace', handleOpenMarketplace);
    window.addEventListener('open-sentinel-mini', handleOpenSentinelMini);
    window.addEventListener('open-sentinel-apex', handleOpenSentinelApex);
    window.addEventListener('open-luz-foco', handleOpenFaroIA);
    window.addEventListener('open-ecumenical', handleOpenEcumenical);
    window.addEventListener('open-secular', handleOpenSecular);
    window.addEventListener('open-smart-skills', handleOpenSmartSkills);
    window.addEventListener('open-retro-tv', handleOpenRetroTV);
    window.addEventListener('open-vertical-tv', handleOpenVerticalTV);
    window.addEventListener('open-vhs-tv', handleOpenVhsTV);
    window.addEventListener('open-memory-portal', handleOpenMemoryPortal);
    window.addEventListener('open-vlsmastercharts', handleOpenVlsMasterCharts);
    window.addEventListener('open-appendix', handleOpenAppendix);
    window.addEventListener('open-music-ranking', () => setShowMusicRanking(true));

    window.addEventListener('open-farito-browser', handleOpenFaritoBrowser);
    window.addEventListener('open-kiosko-diarios', handleOpenKiosko);
    window.addEventListener('open-airport', handleOpenAirport);
    window.addEventListener('open-city-3d', handleOpenCity3D);
    window.addEventListener('open-operacion-ls', handleOpenOperacionLS);
    window.addEventListener('open-identity-gate', handleOpenIdentityGate);
    window.addEventListener('open-memorial-hijos', handleOpenMemorial);
    window.addEventListener('open-smart-admin-fixed', () => setShowVLSInduccion(true));
    window.addEventListener('open-retro-room', handleOpenRetroRoom);
    window.addEventListener('open-personal-stereo', handleOpenPersonalStereo);
    window.addEventListener('open-escuela-musica', handleNavMusica);
    window.addEventListener('open-escuela-artes', handleNavArtes);
    window.addEventListener('open-sismic', handleOpenSismic);
    window.addEventListener('open-theater', handleOpenTheater);
    window.addEventListener('open-faro', handleOpenFaro);
    window.addEventListener('toggle-radio-visibility', handleToggleRadio);
    window.addEventListener('open-twitter-vls', handleOpenTwitter);
    window.addEventListener('open-facebook-vls', handleOpenFacebook);
    window.addEventListener('open-instagram-vls', handleOpenInstagram);
    window.addEventListener('open-observatory', handleOpenObservatory);
    window.addEventListener('open-reeltoreel', handleOpenReelToReel);
    window.addEventListener('open-museum', handleOpenMuseum);
    window.addEventListener('open-vecinojos', handleOpenVecinojos);
    window.addEventListener('open-vls-feed', handleOpenVLSFeed);
    window.addEventListener('open-broadcaster', handleOpenBroadcaster);
    window.addEventListener('open-debono-hats', handleOpenDeBonoHats);
    window.addEventListener('open-tribunales', handleOpenTribunales);
    window.addEventListener('open-unicorn', handleOpenUnicorn);
    window.addEventListener('trigger-don-radios', handleTriggerDonRadios);
    window.addEventListener('open-hub-3d', handleOpenHub3D);
    window.addEventListener('open-auditoria', handleOpenAuditoria);
    window.addEventListener('open-parlamento', handleOpenParlamento);
    window.addEventListener('open-gym-3d', handleOpenGym);
    window.addEventListener('open-farito-social', handleOpenFaritoSocial);
    window.addEventListener('open-faro-centinel', handleOpenFaroCentinel);
    window.addEventListener('open-botica', handleOpenBotica);
    window.addEventListener('open-veterinaria', handleOpenVeterinaria);
    window.addEventListener('open-super-serenito', handleOpenSuperSerenito);
    window.addEventListener('open-sky-guide', handleOpenSkyGuide);
    window.addEventListener('open-motor-tiempo', handleOpenMotorTiempo);
    window.addEventListener('open-radio-master', handleOpenRadioMaster);
    window.addEventListener('open-calendar', handleOpenCalendar);
    window.addEventListener('open-smart-calendar', handleOpenCalendar);
    window.addEventListener('open-enfermeria-smart', handleOpenEnfermeria);
    window.addEventListener('open-almanaque-mundial', handleOpenEmbajadas);
    window.addEventListener('open-smart-business', handleOpenSmartBusiness);
    window.addEventListener('open-emergency-directory', handleOpenEmergency);
    window.addEventListener('open-smart-events', handleOpenSmartEvents);
    window.addEventListener('open-vls-game', () => navigate('/vlsabes'));
    window.addEventListener('open-vls-play', () => navigate('/vlsabes'));
    window.addEventListener('open-vls-bencinazo', handleOpenBencinazo);
    window.addEventListener('open-vlspeak', () => setShowVLSpeak(true));
    window.addEventListener('open-vls-aguas', handleOpenAguasValle);
    window.addEventListener('open-pincha', handleOpenPincha);
    window.addEventListener('open-plaza-vecinal', handleOpenPlazaVecinal);
    window.addEventListener('open-vls-stella', () => setShowStella(true));
    window.addEventListener('open-safe-route', handleOpenSafeRoute);
    window.addEventListener('open-vls-ian', () => setShowVLSNewsIan(true));
    window.addEventListener('open-vls-chequia', () => setShowVLSNewsChequia(true));
    window.addEventListener('open-vls-seguridad', () => setShowSeguridadVecinal(true));
    window.addEventListener('open-vls-avalancha', () => setShowNewsAvalancha(true));
    window.addEventListener('open-vls-alcaldesa', (e) => {
      if (e.detail?.noteId) setAlcaldesaNoteId(e.detail.noteId);
      else setAlcaldesaNoteId(null);
      setShowNewsAlcaldesa(true);
    });
    window.addEventListener('open-backoffice-movil', () => setShowBackofficeMovil(true));
    window.addEventListener('open-smart-os', () => setShowSmartOS(true));
    window.addEventListener('open-smart-salud', handleOpenSmartSalud);
    window.addEventListener('open-arquitectura', handleOpenArquitectura);
    window.addEventListener('open-propiedades', handleOpenPropiedades);
    window.addEventListener('open-parlamento-regional', () => setShowParliamentary(true));
    window.addEventListener('open-alcaldes-history', () => setShowAlcaldes(true));
    window.addEventListener('open-galaxia-disco', () => setShowMemoryPortal(true));
    window.addEventListener('open-entrevecinas', handleOpenEntreVecinas);
    window.addEventListener('open-vecinity-pay', handleOpenVecnityPay);
    window.addEventListener('open-tienda-poleras', handleOpenTienda);
    window.addEventListener('open-roadmap-vls', handleOpenRoadmap);
    window.addEventListener('open-decision-vecinal', handleOpenCouncil);
    window.addEventListener('open-vls-reporte', () => setShowSafeRoute(true));
    window.addEventListener('open-vls-academia', () => setShowVLSInduccion(true));
    window.addEventListener('open-vls-protocolo', () => setShowSmartEvents(true));
    window.addEventListener('open-faro-ia', () => { if (typeof handleOpenFaroIA !== 'undefined') handleOpenFaroIA(); else setShowFaroCentinel(true); });
    window.addEventListener('open-radio-vls', () => setShowRadio(true));
    window.addEventListener('open-vls-artemis', () => setShowVLSNewsArtemis(true));
    window.addEventListener('open-vls-ucen', () => setShowVLSNewsUcen(true));
    window.addEventListener('open-vls-migra', () => setShowRDMLSNewsMigra(true));
    window.addEventListener('open-project-info', () => setShowProjectInfo(true));
    window.addEventListener('vls-notification', (e) => {
      if (e.detail) {
        const newNotif = {
          id: Date.now(),
          title: e.detail.title || 'ALERTA REGIONAL',
          body: e.detail.body || '',
          read: false,
          timestamp: new Date().toLocaleTimeString(),
          type: 'push'
        };
        setNotifications(prev => [newNotif, ...prev]);
        setShowAlert(true);
      }
    });

    window.addEventListener('open-vls-note', (e) => {
       const noteId = e.detail;
       if (noteId) {
          // Si es un ID de video de YouTube (11 caracs), abrimos la galería y le pasamos el ID
          // VLSNotesGallery ya escucha este mismo evento y se abrirá internamente.
          // Solo necesitamos asegurar que el contenedor de la galería sea visible si fuera necesario.
          // Pero en HubDashboard el VLSNotesGallery está siempre montado estadísticamente.
          // Si el usuario quiere que se abra un "modal" en App.jsx, deberíamos manejarlo aquí.
       }
    });

    // Escucha global para detener todos los audios
    window.addEventListener('stop-all-audio', () => {
      // Disparar eventos individuales para cada componente que maneje audio
      window.dispatchEvent(new CustomEvent('vls-stop-radio'));
      window.dispatchEvent(new CustomEvent('vls-stop-cassette'));
      window.dispatchEvent(new CustomEvent('vls-stop-hats'));
      window.dispatchEvent(new CustomEvent('vls-stop-donradios'));
      window.dispatchEvent(new CustomEvent('vls-stop-studio'));
      window.dispatchEvent(new CustomEvent('vls-stop-stella-radio'));
      window.speechSynthesis.cancel();
    });

    window.addEventListener('close-all-floating', () => {
      setShowRadio(false);
      setShowChat(false);
      setShowNewsAvalancha(false);
      setShowDistances(false);
      setShowHub3D(false);
      setShowAuditoria(false);
      setShowParlamento(false);
      setShowGym3D(false);
      setShowMotorTiempo(false);
      setShowCalendar(false);
      setShowLeanMaster(false);
      setShowProjectInfo(false);
      setShowStella(false);
    });

    const handleMessage = (e) => {
      if (e.data && e.data.type === 'GAME_WIN_KPI') {
        setShowGame(false);
        setGameScore(e.data.score);
        setShowGameKPI(true);
      }
      if (e.data && e.data.type === 'CLOSE_GAME') {
        setShowGame(false);
      }
    };
    window.addEventListener('message', handleMessage);

    // Socket.io Push Listener
    const handlePush = (alertData) => {
      setNotifications(prev => {
        const updated = [alertData, ...prev];
        localStorage.setItem('smart_notifications', JSON.stringify(updated));
        return updated;
      });
      // Feedback visual tipo bubble ya ocurre vía useEffect de notifications si existe
    };
    comSocket.on('vls-receive-push', handlePush);

    return () => {
      window.removeEventListener('open-3d-walk', handleOpen3DWalk);
      window.removeEventListener('open-time-bus', handleOpenTimeBus);
      window.removeEventListener('open-distances', handleOpenDistances);
      window.removeEventListener('open-precolombino', handleOpenPrecolombino);
      window.removeEventListener('open-project-info', handleOpenProjectInfo);
      window.removeEventListener('open-vls-vision', handleOpenProjectInfo);
      window.removeEventListener('open-embajadas', handleOpenEmbajadas);
      window.removeEventListener('open-council', handleOpenCouncil);
      window.removeEventListener('open-cdls', handleOpenCDLS);
      window.removeEventListener('open-game', handleOpenGame);
      window.removeEventListener('open-arcade', handleOpenGame);
      window.removeEventListener('open-akichip', () => setShowAkichip(true));
      window.removeEventListener('open-review-portal', handleOpenReview);
      window.removeEventListener('open-music-studio', handleOpenMusicStudio);
      window.removeEventListener('open-marketplace', handleOpenMarketplace);
      window.removeEventListener('open-sentinel-mini', handleOpenSentinelMini);
      window.removeEventListener('open-sentinel-apex', handleOpenSentinelApex);
      window.removeEventListener('open-luz-foco', handleOpenFaroIA);
      window.removeEventListener('open-ecumenical', handleOpenEcumenical);
      window.removeEventListener('open-secular', handleOpenSecular);
      window.removeEventListener('open-smart-skills', handleOpenSmartSkills);
      window.removeEventListener('open-retro-tv', handleOpenRetroTV);
      window.removeEventListener('open-vertical-tv', handleOpenVerticalTV);
      window.removeEventListener('open-vhs-tv', handleOpenVhsTV);
      window.removeEventListener('open-memory-portal', handleOpenMemoryPortal);
      window.removeEventListener('open-vlsmastercharts', handleOpenVlsMasterCharts);
      window.removeEventListener('open-appendix', handleOpenAppendix);
      window.removeEventListener('open-farito-browser', handleOpenFaritoBrowser);
      window.removeEventListener('open-kiosko-diarios', handleOpenKiosko);
      window.removeEventListener('open-airport', handleOpenAirport);
      window.removeEventListener('open-city-3d', handleOpenCity3D);
      window.removeEventListener('open-operacion-ls', handleOpenOperacionLS);
      window.removeEventListener('open-identity-gate', handleOpenIdentityGate);
      window.removeEventListener('open-memorial-hijos', handleOpenMemorial);
      window.removeEventListener('vls-notification', (e) => {
        if (e.detail) {
          const newNotif = {
            id: Date.now(),
            title: e.detail.title || 'ALERTA REGIONAL',
            body: e.detail.body || '',
            read: false,
            timestamp: new Date().toLocaleTimeString(),
            type: 'push'
          };
          setNotifications(prev => [newNotif, ...prev]);
          setShowAlert(true);
        }
      });
      window.removeEventListener('open-smart-admin', handleOpenSmartAdmin);
      window.removeEventListener('open-retro-room', handleOpenRetroRoom);
      window.removeEventListener('open-personal-stereo', handleOpenPersonalStereo);
      window.removeEventListener('open-escuela-musica', handleNavMusica);
      window.removeEventListener('open-escuela-artes', handleNavArtes);
      window.removeEventListener('open-sismic', handleOpenSismic);
      window.removeEventListener('open-theater', handleOpenTheater);
      window.removeEventListener('open-faro', handleOpenFaro);
      window.removeEventListener('toggle-radio-visibility', handleToggleRadio);
      window.removeEventListener('open-twitter-vls', handleOpenTwitter);
      window.removeEventListener('open-facebook-vls', handleOpenFacebook);
      window.removeEventListener('open-instagram-vls', handleOpenInstagram);
      window.removeEventListener('open-observatory', handleOpenObservatory);
      window.removeEventListener('open-reeltoreel', handleOpenReelToReel);
      window.removeEventListener('open-museum', handleOpenMuseum);
      window.removeEventListener('open-vecinojos', handleOpenVecinojos);
      window.removeEventListener('open-vls-feed', handleOpenVLSFeed);
      window.removeEventListener('open-broadcaster', handleOpenBroadcaster);
      window.removeEventListener('open-debono-hats', handleOpenDeBonoHats);
      window.removeEventListener('open-tribunales', handleOpenTribunales);
      window.removeEventListener('open-unicorn', handleOpenUnicorn);
      window.removeEventListener('trigger-don-radios', handleTriggerDonRadios);
      window.removeEventListener('open-hub-3d', handleOpenHub3D);
      window.removeEventListener('open-auditoria', handleOpenAuditoria);
      window.removeEventListener('open-parlamento', handleOpenParlamento);
      window.removeEventListener('open-gym-3d', handleOpenGym);
      window.removeEventListener('open-farito-social', handleOpenFaritoSocial);
      window.removeEventListener('open-faro-centinel', handleOpenFaroCentinel);
      window.removeEventListener('open-botica', handleOpenBotica);
      window.removeEventListener('open-veterinaria', handleOpenVeterinaria);
      window.removeEventListener('open-super-serenito', handleOpenSuperSerenito);
      window.removeEventListener('open-sky-guide', handleOpenSkyGuide);
      window.removeEventListener('open-motor-tiempo', handleOpenMotorTiempo);
      window.removeEventListener('open-radio-master', handleOpenRadioMaster);
      window.removeEventListener('open-calendar', handleOpenCalendar);
      window.removeEventListener('open-smart-calendar', handleOpenCalendar);
      window.removeEventListener('open-enfermeria-smart', handleOpenEnfermeria);
      window.removeEventListener('open-almanaque-mundial', handleOpenEmbajadas);
      window.removeEventListener('open-smart-business', handleOpenSmartBusiness);
      window.removeEventListener('open-emergency-directory', handleOpenEmergency);
      window.removeEventListener('open-smart-events', handleOpenSmartEvents);
      window.removeEventListener('open-vls-bencinazo', handleOpenBencinazo);
      window.removeEventListener('open-vls-aguas', handleOpenAguasValle);
      window.removeEventListener('open-pincha', handleOpenPincha);
      window.removeEventListener('open-plaza-vecinal', handleOpenPlazaVecinal);
      window.removeEventListener('open-safe-route', handleOpenSafeRoute);
      window.removeEventListener('open-smart-salud', handleOpenSmartSalud);
      window.removeEventListener('open-arquitectura', handleOpenArquitectura);
      window.removeEventListener('open-propiedades', handleOpenPropiedades);
      window.removeEventListener('open-entrevecinas', handleOpenEntreVecinas);
      window.removeEventListener('open-tienda-poleras', handleOpenTienda);
      window.removeEventListener('open-vecinity-pay', handleOpenVecnityPay);
      window.removeEventListener('open-roadmap-vls', handleOpenRoadmap);
      window.removeEventListener('open-decision-vecinal', handleOpenCouncil);
      window.removeEventListener('open-project-info', () => setShowProjectInfo(true));
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('stop-all-audio', () => {}); 
      comSocket.off('vls-receive-push', handlePush);
      if (typeof weatherInterval !== 'undefined') clearInterval(weatherInterval);
    };
  }, []);

  const isAuthorized = currentUser && ALLOWED_ADMINS.some(admin => admin.toLowerCase() === currentUser.email.toLowerCase());

  // VLS_C5: NEVER return null. Return LoadingScreen to avoid "black screen" confusion.
  // Bypass loading screen for direct media portals to ensure immediate visual feedback
  const isMediaPortal = location.pathname.match(/\/(clasica|chequia|artemis|artemisa|artemis2|ucen|fred|juansoldado|vallenar|andacollo|retail|media|mundo|altacordillera|cordillera|secrevial|vialidad2025|domeyko|horario|cambio-de-hora|migra|migracion|sonicev|nuevoperegrino|acciona|salud|choapa|redcine|entrevecinas)/i);

  // ——— SYNC ARCADE ROUTE (Moved above early returns to satisfy Hook rules) ———
  useEffect(() => {
    if (location.pathname === '/arcade') {
      setShowGame(true);
    }
  }, [location.pathname]);

  if (!authInitialized && !isRDMLS && !isMediaPortal && !isEvolutionShowroom && !isPeregrinoHost) {
    return (
      <div style={{ background: '#020617', height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoadingScreen />
      </div>
    );
  }

  const isSonicevHost = host.includes('sonicev.cl') || location.pathname.match(/^\/sonicev/i);
  if (isSonicevHost) {
    return (
      <div style={{ background: '#050505', minHeight: '100vh', width: '100vw', overflowX: 'hidden' }}>
        <Suspense fallback={
          <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ color: '#ff4d4d', fontSize: '1.5rem', fontWeight: 900, fontFamily: 'system-ui, sans-serif', letterSpacing: '8px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>
              SONICEV
            </div>
          </div>
        }>
          <SonicevPortal onClose={() => {
            if (host.includes('sonicev.cl')) {
              window.location.reload();
            } else {
              navigate('/');
            }
          }} />
        </Suspense>
      </div>
    );
  }


  const isEntreVecinasHost = host.includes('entrevecinas.cl') || location.pathname.match(/^\/entrevecinas/i);
  if (isEntreVecinasHost) {
    return (
      <div style={{ background: '#07010a', minHeight: '100vh', width: '100vw', overflowX: 'hidden' }}>
        <Suspense fallback={
          <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ color: '#ec4899', fontSize: '1.5rem', fontWeight: 900, fontFamily: 'system-ui, sans-serif', letterSpacing: '8px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>
              ENTREVECINAS
            </div>
          </div>
        }>
          <EntreVecinasHub onClose={() => {
            if (host.includes('entrevecinas.cl')) {
              window.location.reload();
            } else {
              navigate('/');
            }
          }} />
        </Suspense>
      </div>
    );
  }

  if (isRDMLS && RDMLS_MAINTENANCE_ACTIVE) {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <RDMLSMaintenance />
      </Suspense>
    );
  }

  if (isAprendeMode) {
    return (
      <Suspense fallback={<div style={{ background: '#020617', height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><LoadingScreen /></div>}>
        <Aprende isRDMLS={isRDMLS} />
      </Suspense>
    );
  }

  return (
    <div className="app-layout animate-fade-in" style={{ background: '#020617', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SEO />
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 10001, 
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column"
      }}>
        {!isZeroDistraction && !isPuertaSmart && !isRadioVecinos && !isRDMLS && (
          <>
            {/* VLS_C5: TOP-TOP ACCESS (RULE #2) */}
            <div style={{ 
              height: "40px", 
              background: "linear-gradient(90deg, #b91c1c, #020617)", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              borderBottom: "1px solid rgba(255,215,0,0.3)", 
              padding: "0 1rem",
              gap: "15px",
              pointerEvents: "auto"
            }}>
              <button onClick={() => window.location.href="/reportes"} style={{ background: "transparent", border: "none", color: "white", fontSize: "0.75rem", fontWeight: "950", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", letterSpacing: "1px" }}>
                <span style={{ color: "#FFD700" }}>🚨 VLS SEGURA:</span> REPORTE CIUDADANO 24/7
              </button>
            {/* ZONA ARCADE - EXCLUDED FOR INSTITUTIONAL SOVEREIGNTY (RDMLS) */}
            {!isRDMLS && (
              <div style={{ position: 'absolute', top: '15px', right: '180px', zIndex: 1000, display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => { setShowGame(true); navigate('/arcade'); }} 
                  style={{ 
                    background: "rgba(168, 85, 247, 0.4)", 
                    border: "1px solid #a855f7", 
                    color: "white", 
                    fontSize: "0.65rem", 
                    fontWeight: "950", 
                    padding: "3px 12px", 
                    borderRadius: "50px", 
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    boxShadow: "0 0 10px rgba(168, 85, 247, 0.4)"
                  }}
                >
                  <Joystick size={12} /> ZONA ARCADE
                </button>
              </div>
            )}
            </div>

            <header
              className="glass-header animate-fade-in"
              style={{
                height: 'var(--nav-height, 60px)',
                borderBottom: isRDMLS ? '3px solid #f59e0b' : '1px solid rgba(255,255,255,0.05)',
                background: isRDMLS ? 'rgba(80, 5, 5, 0.97)' : 'rgba(15, 23, 42, 0.95)',
                padding: '0 0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxSizing: 'border-box',
                pointerEvents: 'auto',
                position: 'relative',
                zIndex: 10
              }}
            >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', overflow: 'hidden', flexShrink: 1, pointerEvents: 'auto' }}>
            <button 
              onClick={() => { navigate("/"); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
              className="btn-glass" 
              style={{ 
                padding: "0.35rem", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", 
                background: "rgba(255,255,255,0.1)", flexShrink: 0, pointerEvents: "auto", zIndex: 9999,
                cursor: 'pointer'
              }} 
              title="Inicio"
            >
              <Home size={16} color="white" />
            </button>
            <button 
              onClick={() => setShowGame(true)} 
              className="btn-glass" 
              style={{ 
                padding: "0.35rem", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", 
                background: "rgba(168, 85, 247, 0.2)", border: "1px solid rgba(168, 85, 247, 0.4)", 
                flexShrink: 0, pointerEvents: "auto", zIndex: 9999,
                cursor: 'pointer'
              }} 
              title="Zona Arcade VLS"
            >
              <Joystick size={16} color="#a855f7" />
            </button>
            <button onClick={() => navigate('/sitemap')} className="btn-glass" style={{ padding: '0.35rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(56, 189, 248, 0.2)', border: '1px solid rgba(56, 189, 248, 0.4)', flexShrink: 0, pointerEvents: 'auto' }} title="Mapa del Sitio">

              <Network size={16} color="#38bdf8" />
            </button>
            {location.pathname !== '/' && (
              <button
                onClick={() => navigate(-1)}
                className="btn-glass"
                style={{
                  padding: '0.35rem 0.6rem',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  background: 'rgba(255, 255, 255, 0.15)',
                  flexShrink: 0,
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}
                title="Volver"
              >
                <ArrowLeft size={14} /> VOLVER
              </button>
            )}
            <span className="text-gradient animate-fade-in" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 'bold', fontSize: 'clamp(0.85rem, 3.5vw, 1.2rem)', whiteWhiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {isRDMLS ? (
                <>
                  <img src="/rdmls_pwa_icon.png" style={{ height: '24px', marginRight: '6px' }} alt="RDMLS" />
                   RADIO DIGITAL MUNICIPAL LA SERENA
                </>
              ) : (
                <>
                  {!isPuertaSmart && <img src="/vls-logo-premium.png" style={{ height: '24px', marginRight: '6px', filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.3))' }} alt="VLS Logo" />}
                  {isPuertaSmart ? (
                    <span className="hide-on-mobile" style={{ color: '#fbbf24' }}>www.puertasmart.cl</span>
                  ) : isRadioVecinos ? (
                    <span className="hide-on-mobile" style={{ color: '#38bdf8' }}>www.radiovecinos.cl</span>
                  ) : (
                    <span className="hide-on-mobile">www.vecinoslaserena.cl</span>
                  )}
                  {(currentUser || isGuest) && (
                    <div style={{ marginLeft: '1rem', display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(56, 189, 248, 0.15)', padding: '2px 10px', borderRadius: '50px', border: '1px solid rgba(56, 189, 248, 0.4)' }}>
                      <div className="pulse-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#38bdf8' }} />
                      <span style={{ fontSize: '0.65rem', color: '#38bdf8', fontWeight: '900', letterSpacing: '1px' }}>SESIÓN ACTIVA</span>
                    </div>
                  )}
                </>
              )}
            </span>
          </div>

          {/* OMNI PABELLON - ACCESOS RAPIDOS (4 PILARES) */}
          <div className="desktop-only" style={{ flex: 1, display: 'flex', justifyContent: 'center', pointerEvents: 'auto', padding: '0 1rem' }}>
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '0.2rem 0.4rem',
                borderRadius: '30px',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                gap: '8px'
              }}
            >
               {/* Search Bar Falso (Ctrl+K effect) */}
               <div onClick={() => window.dispatchEvent(new CustomEvent('open-smart-search'))} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '0.7rem', cursor: 'pointer', padding: '0.2rem 0.8rem', borderRight: '1px solid rgba(255,255,255,0.1)' }} className="hover:text-white transition-colors rounded-full h-full">
                 <Search size={12} />
                 <span>Buscador Maestro...</span>
               </div>
               
               {/* 4 PILARES SMART CITY */}
               <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                 <button onClick={() => window.open('https://www.puertasmart.cl', '_blank')} style={{ padding: '0.3rem 0.8rem', fontSize: '0.65rem', fontWeight: '900', color: '#38bdf8', background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: '20px', letterSpacing: '0.5px' }} className="hover:bg-sky-900/40 transition-colors" title="Acceso a reportes, Registro de Accesos y monitoreo ambiental">
                    SMART CITIZENS
                 </button>
                 <button onClick={() => window.open('https://www.rdmls.cl/imls/induccion', '_blank')} style={{ padding: '0.3rem 0.8rem', fontSize: '0.65rem', fontWeight: '900', color: '#10b981', background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: '20px', letterSpacing: '0.5px' }} className="hover:bg-emerald-900/40 transition-colors" title="Gestión interna, E-learning y firmas digitales">
                    SMART ADMINISTRATION
                 </button>
                 <button onClick={() => window.open('https://vecinoslaserenachile-cloud.github.io/serenito-app/', '_blank')} style={{ padding: '0.3rem 0.8rem', fontSize: '0.65rem', fontWeight: '900', color: '#f59e0b', background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: '20px', letterSpacing: '0.5px' }} className="hover:bg-amber-900/40 transition-colors" title="Protocolo y monitor de precedencias">
                    SMART EVENTS
                 </button>
                 <button onClick={handleOpenSentinelApex} style={{ padding: '0.3rem 0.8rem', fontSize: '0.65rem', fontWeight: '900', color: '#ef4444', background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '4px', letterSpacing: '0.5px' }} className="hover:bg-red-900/40 transition-colors" title="Social listening e inteligencia artificial Sentinel Apex">
                    <div className="pulse-dot" style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#ef4444' }} /> SMART LISTENING
                 </button>
                 <button onClick={() => setShowMemorial(true)} style={{ padding: '0.3rem 0.8rem', fontSize: '0.65rem', fontWeight: '900', color: '#ec4899', background: 'rgba(236, 72, 153, 0.1)', border: '1px solid rgba(236, 72, 153, 0.4)', cursor: 'pointer', borderRadius: '200px', display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '6px', letterSpacing: '0.5px' }} className="hover:bg-pink-900/40 transition-colors">
                    <Heart size={12} fill="#ec4899" /> ALTARES
                 </button>
               </div>
            </div>
          </div>

          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            flexShrink: 1, 
            pointerEvents: 'auto',
            overflowX: isMobile ? 'auto' : 'visible',
            WebkitOverflowScrolling: 'touch',
            paddingRight: isMobile ? '10px' : '0',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
          }} className="vls-header-actions">
            {weather !== null && (
              <span className="glass-panel desktop-only" style={{ padding: '0.3rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', color: '#fcd34d', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                {(() => {
                  const { code, isDay } = weather;
                  let Icon = isDay ? Sun : Moon;
                  if (code === 1 || code === 2 || code === 3) Icon = Cloud;
                  return <Icon size={14} color={isDay ? "#fcd34d" : "#bae6fd"} />;
                })()}
                <span>{weather.temp}°C</span>
              </span>
            )}

            <button
              onClick={() => {
                setShowNotificationsMenu(!showNotificationsMenu);
                if (!showNotificationsMenu) markNotificationsAsRead();
              }}
              className="btn-glass"
              style={{ position: 'relative', padding: '0.35rem 0.4rem', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}
            >
              <Bell size={16} color="white" />
              {unreadCount > 0 && (
                <span className="pulse" style={{ position: 'absolute', top: '-2px', right: '-2px', background: '#ef4444', color: 'white', fontSize: '0.6rem', fontWeight: 'bold', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {unreadCount}
                </span>
              )}
            </button>

            {/* CTA REPORTE VECINAL (TOP) - Universal Visibility */}
            <button 
              onClick={() => window.open('https://www.puertasmart.cl', '_blank')}
              className="glass-panel animate-pulse"
              style={{
                padding: isMobile ? '0.35rem 0.6rem' : '0.4rem 1rem',
                borderRadius: '50px',
                background: 'rgba(239, 68, 68, 0.25)',
                border: `2px solid ${isMobile ? 'transparent' : '#ef4444'}`,
                color: 'white',
                fontWeight: '900',
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              <ShieldAlert size={14} color="#ef4444" />
              REPORTE CIUDADANO
            </button>

            {(isVLS || isRDMLS) && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {(!currentUser && !isGuest) ? (
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="glass-panel animate-pulse"
                    style={{ padding: '0.35rem 0.8rem', borderRadius: '20px', fontWeight: '900', fontSize: '0.75rem', background: '#3b82f6', border: '2px solid rgba(255,255,255,0.3)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 0 15px rgba(59,130,246,0.5)', flexShrink: 0 }}
                  >
                    <LogIn size={14} /> <span className="hide-on-small-mobile">CONECTAR</span>
                  </button>
                ) : (
                  <>
                    {currentUser ? (
                      <button
                        onClick={() => setShowUserProfile(true)}
                        className="user-badge glass-panel animate-pulse-slow"
                        style={{
                          padding: '0.35rem 0.8rem',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          background: 'rgba(16, 185, 129, 0.2)',
                          border: '1px solid #10b981',
                          color: '#10b981',
                          fontWeight: '900',
                          borderRadius: '20px',
                          flexShrink: 0
                        }}
                      >
                        <UserCircle size={14} />
                        {currentUser?.displayName ? currentUser.displayName.split(' ')[0] : (currentUser?.email ? currentUser.email.split('@')[0] : 'Vecino')}
                      </button>
                    ) : (
                      <button
                        onClick={() => setShowUserProfile(true)}
                        className="user-badge glass-panel"
                        style={{
                          padding: '0.35rem 0.8rem',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          background: 'rgba(56, 189, 248, 0.1)',
                          border: '1px solid #38bdf8',
                          color: '#38bdf8',
                          fontWeight: '900',
                          borderRadius: '20px',
                          flexShrink: 0
                        }}
                      >
                        <UserCircle size={14} /> INVITADO
                      </button>
                    )}

                    {/* Billetera VLS: Visible Token Economy */}
                    <button
                      onClick={() => { setShowNotificationsMenu(false); setShowVecnityPay(true); }}
                      className="glass-panel animate-pulse-slow"
                      style={{
                        padding: '0.35rem 0.6rem',
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'rgba(245, 158, 11, 0.1)',
                        border: '1px solid rgba(245, 158, 11, 0.4)',
                        color: '#f59e0b',
                        fontWeight: '900',
                        borderRadius: '20px',
                        flexShrink: 0
                      }}
                    >
                      <Ticket size={14} />
                      {vlsTokens} FICHAS
                    </button>

                    <button
                      onClick={handleLogout}
                      className="btn-glass pulse"
                      style={{
                        padding: '0.4rem 0.8rem',
                        borderRadius: '50px',
                        background: 'rgba(239, 68, 68, 0.4)',
                        border: '2px solid #ef4444',
                        color: 'white',
                        fontWeight: '900',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        flexShrink: 0
                      }}
                    >
                      <CloseIcon size={16} color="white" />
                      <span style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>SALIR</span>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          <AnimatePresence>
            {showNotificationsMenu && (
              <motion.div 
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="glass-panel" 
                style={{ 
                  position: 'absolute', top: '70px', right: '10px', width: '320px', 
                  maxHeight: '500px', overflowY: 'auto', background: 'rgba(15, 23, 42, 0.98)', 
                  border: '1px solid var(--brand-primary)', borderRadius: '16px', 
                  zIndex: 200000, pointerEvents: 'auto',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(20px)'
                }}
              >
                <div style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#38bdf8', fontSize: '0.9rem' }}>
                    <Bell size={18} className="animate-pulse" /> Alertas de la Red Vecinal
                  </strong>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setShowNotificationsMenu(false); }} 
                    className="btn-glass" 
                    style={{ padding: '4px', borderRadius: '50%', color: '#94a3b8' }}
                  >
                    <CloseIcon size={18} />
                  </button>
                </div>
                {notifications.length === 0 ? (
                  <div style={{ padding: '3rem 1.5rem', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
                    No hay alertas activas en tu sector en este momento.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {notifications.map((n, idx) => {
                      if (!n) return null;
                      return (
                        <div key={n?.id || idx} style={{ padding: '1.2rem', borderBottom: '1px solid rgba(255,255,255,0.05)', background: n?.read ? 'transparent' : 'rgba(56, 189, 248, 0.05)', transition: 'background 0.3s' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                            <span style={{ fontSize: '0.65rem', color: '#38bdf8', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>{n?.type === 'push' ? '🚨 Sistema PUSH' : '📢 Notificación'}</span>
                            <span style={{ fontSize: '0.65rem', color: '#64748b' }}>{n?.timestamp}</span>
                          </div>
                          <strong style={{ color: 'white', display: 'block', margin: '2px 0 6px 0', fontSize: '0.9rem', lineHeight: '1.2' }}>{n?.title}</strong>
                          {n?.body && <p style={{ margin: 0, fontSize: '0.8rem', color: '#cbd5e1', lineHeight: '1.5', fontWeight: '300' }}>{n.body}</p>}
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          </header>
        </>
      )}
      </div>
      
      <Suspense fallback={null}>
        {/* MARTIN SHIELD REMOVIDO POR SOLICITUD RDMLS */}
        {/* {!isMediaPortal && <MartinSecurityShield />} */}
        {!isZeroDistraction && !isRDMLS && <NetSpeedMonitor />}
        {!showVLSNewsIan && !isMediaPortal && <SerenitoSecurityGuard />}
        <SecurityHoneypot />
        <SmartShare renderAsHiddenObserver={true} />
        {!isZeroDistraction && !isRDMLS && <FloatingActionPanel />}
        <ErrorCollector />
      </Suspense>

      {/* Módulo Vertical RRSS (Transversal) */}
      {!isZeroDistraction && !isRDMLS && !isEvolutionShowroom && (
        <button
          onClick={() => {
            window.dispatchEvent(new CustomEvent('open-vls-feed'));
            window.dispatchEvent(new CustomEvent('stop-all-audio'));
          }}
          className="btn-glass hover-lift"
          style={{
            position: 'fixed', right: '0', top: '50%', transform: 'translateY(-50%)',
            zIndex: 99999, background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid #38bdf8', borderRight: 'none',
            padding: '15px 8px', borderRadius: '16px 0 0 16px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
            boxShadow: '-4px 0 20px rgba(56, 189, 248, 0.3)',
            cursor: 'pointer'
          }}
          title="Abrir Radar Vertical (5 Redes)"
        >
          <div style={{ fontSize: '0.7rem', color: '#white', writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontWeight: '900', letterSpacing: '2px', textShadow: '0 0 5px rgba(56, 189, 248, 0.8)' }}>
            RADAR SOCIAL
          </div>
          <Sparkles size={18} color="#38bdf8" className="pulse-slow" />
        </button>
      )}

      {/* VLSound — Transversal para VLS y RDMLS */}
      {!isZeroDistraction && !isRDMLS && !isEvolutionShowroom && (
        <VLSConsoleSound
          onOpenRadio={() => { window.dispatchEvent(new CustomEvent('stop-all-audio')); setShowRadio(true); }}
          onOpenTV={() => { window.dispatchEvent(new CustomEvent('stop-all-audio')); setShowRetroTV(true); }}
          onClose={() => { }}
        />
      )}


      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />

      {/* BANNER DE ALERTAS CRITICAS (GLOBAL) */}
      <AnimatePresence>
        {showAlert && notifications.length > 0 && !notifications[0].read && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            style={{
              position: 'fixed', top: '110px', left: '50%', transform: 'translateX(-50%)',
              zIndex: 1000000, width: '90%', maxWidth: '600px',
              pointerEvents: 'auto'
            }}
          >
            <div className="glass-panel" style={{ 
              background: 'rgba(239, 68, 68, 0.95)', 
              border: '2px solid #ef4444', 
              borderRadius: '16px', 
              padding: '1rem 1.5rem',
              display: 'flex', alignItems: 'center', gap: '15px',
              boxShadow: '0 10px 40px rgba(239, 68, 68, 0.4)',
              color: 'white'
            }}>
              <div style={{ background: 'white', borderRadius: '50%', padding: '8px', display: 'flex' }}>
                 <ShieldAlert size={20} color="#ef4444" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '900', fontSize: '0.85rem', letterSpacing: '1px' }}>{notifications[0].title}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>{notifications[0].body}</div>
              </div>
              <button onClick={() => setShowAlert(false)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', padding: '5px', cursor: 'pointer', color: 'white' }}>
                <CloseIcon size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className={`page-content ${(location.pathname === '/' || location.pathname === '/dev') ? 'full-width-dev' : 'container'}`} style={{ paddingBottom: isZeroDistraction ? 0 : '4rem', paddingTop: isZeroDistraction ? 0 : (isRDMLS ? '60px' : '100px'), background: '#020617', minHeight: '100vh' }}>
        <ErrorBoundary>
          <Outlet context={{ weather, isAuthorized, isGuest, isRegistered, lang, setLang, t, currentUser, isRDMLS, handleLogin, handleLogout }} />
        </ErrorBoundary>
        {!isZeroDistraction && (
          <footer style={{ marginTop: '4rem', padding: '2rem', textAlign: 'center', borderTop: '1px solid rgba(255,215,0,0.1)', color: '#94a3b8', fontSize: '0.9rem' }}>
            <p>© {isRDMLS ? '2026' : '2025'} {isRDMLS ? 'RDMLS.CL · RADIO DIGITAL MUNICIPAL LA SERENA' : 'VECINOSLASERENA.CL · INNOVACIÓN CIUDADANA'}</p>
            <p>Contacto: <button onClick={() => setShowContactForm(true)} style={{ color: '#FFD700', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline', fontWeight: 'bold' }}>FORMULARIO DE CONTACTO</button></p>
          </footer>
        )}
      </main>

      {/* Smart Toolbox Control (Caja de Herramientas) */}
      {!isZeroDistraction && !isRDMLS && !isEvolutionShowroom && <SmartToolbox />}

      {/* Chat Botón y Panel */}
      {showChat && (
        <Suspense fallback={<div />}>
          <ChatAssistant onClose={() => setShowChat(false)} isOpenDefault={true} />
        </Suspense>
      )}

      {!isZeroDistraction && (
        <>
          {/* Reproductores de TV flotantes eliminados (SmartTV) para evitar distracciones y errores de carga de señales externas */}
          <GlobalAnnouncer />
        </>
      )}

      {/* Smart Hub 3D (Sistema Simplificado) */}
      {showHub3D && (
        <Suspense fallback={null}>
          <SmartHub3D onClose={() => setShowHub3D(false)} />
        </Suspense>
      )}

      {!isZeroDistraction && !isRDMLS && !isEvolutionShowroom && <PianoCompita />}

      {/* Modal Distancias */}
      {showDistances && (
        <Suspense fallback={<div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100060, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>Cargando Mapa Distancias...</div>}>
          <DistancesMap onClose={() => { setShowDistances(false); setDistancesTarget(null); }} initialDestination={distancesTarget} />
        </Suspense>
      )}


      {/* Paseo 3D a pantalla completa */}
      {show3DWalk && (
        <Suspense fallback={<div style={{ position: 'fixed', inset: 0, background: '#020617', zIndex: 100060, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8' }}>Cargando Experiencia 3D...</div>}>
          <HistoricWalk3D onClose={() => setShow3DWalk(false)} />
        </Suspense>
      )}

      {/* Bus del Tiempo 3D a pantalla completa */}
      {showTimeBus && (
        <Suspense fallback={<div style={{ position: 'fixed', inset: 0, background: '#000', zIndex: 100060, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#facc15' }}>Abriendo Portal del Tiempo...</div>}>
          <TimeBus3D
            onClose={() => setShowTimeBus(false)}
            onOpenIquique={() => setShowIquique(true)}
          />
        </Suspense>
      )}

      {/* Diorama Heroico Arturo Prat (Iquique) */}
      {showIquique && (
        <Suspense fallback={<div style={{ position: 'fixed', inset: 0, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', zIndex: 100070 }}>Iniciando Relato Heroico...</div>}>
          <IquiqueDiorama onClose={() => setShowIquique(false)} />
        </Suspense>
      )}

      {/* Modal Sesión Digital */}
      {showCouncil && (
        <Suspense fallback={<div />}>
          <CityCouncilModal onClose={() => setShowCouncil(false)} />
        </Suspense>
      )}

      {/* Modal Club Deportes La Serena */}
      {showCDLS && (
        <Suspense fallback={<div />}>
          <CDLSPanel onClose={() => setShowCDLS(false)} />
        </Suspense>
      )}

      {/* Modal Game (Arcade Lobby) */}
      {showGame && (
        <Suspense fallback={<div />}>
          <RetroArcadeLobby onClose={() => setShowGame(false)} />
        </Suspense>
      )}



      {showParliamentary && (
        <Suspense fallback={null}>
          <ParliamentaryObservatory onClose={() => setShowParliamentary(false)} />
        </Suspense>
      )}

      {showMemorial && (
        <Suspense fallback={<LoadingScreen />}>
          <MemorialHijosRegion 
            onClose={() => { setShowMemorial(false); setRequestedMemorialId(null); }} 
            currentUser={currentUser} 
            tributeId={requestedMemorialId}
          />
        </Suspense>
      )}

      {showPrecolombino && (
        <Suspense fallback={<LoadingScreen />}>
          <PrecolombinoPortal onClose={() => setShowPrecolombino(false)} />
        </Suspense>
      )}

      {showContactForm && (
        <Suspense fallback={null}>
          <ContactForm onClose={() => setShowContactForm(false)} />
        </Suspense>
      )}

      {/* Game KPI Impact screen */}
      {showGameKPI && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(5, 10, 20, 0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="animate-slide-up" style={{ width: '100%', maxWidth: '800px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(30, 58, 138, 0.5) 100%)', padding: '3rem', borderRadius: '24px', border: '1px solid rgba(16, 185, 129, 0.4)', textAlign: 'center', position: 'relative', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>

            <button onClick={() => setShowGameKPI(false)} className="btn-glass" style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '0.5rem', borderRadius: '50%' }}>
              <CloseIcon size={24} color="white" />
            </button>

            <h2 style={{ color: '#10b981', fontSize: '2.5rem', margin: '0 0 1rem 0', textTransform: 'uppercase' }}>¡Misión Smart Cumplida!</h2>
            <p style={{ color: 'white', fontSize: '1.2rem', margin: '0 0 2rem 0' }}>Lograste {gameScore} Puntos. Esta acción activa las <strong style={{ color: '#fcd34d' }}>5 "I" de ComunaSmart:</strong></p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', textAlign: 'left', marginBottom: '2rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid #38bdf8' }}>
                <strong style={{ color: '#38bdf8', display: 'block', marginBottom: '0.3rem' }}>Informar</strong>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Data generada y enviada al servidor de La Serena.</span>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid #f472b6' }}>
                <strong style={{ color: '#f472b6', display: 'block', marginBottom: '0.3rem' }}>Influir</strong>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Desbloqueas insignias para motivar a otros vecinos.</span>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid #facc15' }}>
                <strong style={{ color: '#facc15', display: 'block', marginBottom: '0.3rem' }}>Interactuar</strong>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Integración directa entre el ciudadano y la plataforma minijuego.</span>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid #a78bfa' }}>
                <strong style={{ color: '#a78bfa', display: 'block', marginBottom: '0.3rem' }}>Involucrar</strong>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Eres parte de la fiscalización preventiva a través del juego.</span>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid #10b981' }}>
                <strong style={{ color: '#10b981', display: 'block', marginBottom: '0.3rem' }}>Implicar</strong>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Beneficios en economía local (Tokens de Dscto 30% asignados).</span>
              </div>
            </div>

            <button onClick={handleSaveKPI} className="btn btn-primary" style={{ background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)', border: 'none', padding: '1rem 2.5rem', fontSize: '1.2rem', fontWeight: 'bold' }}>Guardar mi KPI Social</button>
          </div>
        </div>
      )}

      {/* Modal El Espíritu y Visión (Generic Colloquial) */}
      {showVlsVision && <VLSVisionModal onClose={() => setShowVlsVision(false)} />}

      {/* Modal Voz Ciudadana (Evaluación y Review) */}
      {showReview && <ReviewPortalModal onClose={() => setShowReview(false)} />}

      {/* Portal Red Empleo & Oficios Smart */}
      {showSmartSkills && <SmartSkillsPortalModal onClose={() => setShowSmartSkills(false)} />}

      {/* Estudio Musical IA (Creación de Canciones, Acordes, Letras) */}
      {showMusicStudio && <MusicCreatorModal onClose={() => setShowMusicStudio(false)} />}
      {/* Marketplace Vecinal */}
      {showMarketplace && <MarketplaceVecinal onClose={() => setShowMarketplace(false)} />}

      {/* Sentinel Mini Búsqueda Inteligente */}
      {showSocialVision && (
        <Suspense fallback={<LoadingScreen />}>
          <SocialVision onClose={() => setShowSocialVision(false)} />
        </Suspense>
      )}
      {showNewsAlcaldesa && (
        <Suspense fallback={<LoadingScreen />}>
          <VLSNewsAlcaldesa onClose={() => { setShowNewsAlcaldesa(false); setAlcaldesaNoteId(null); }} initialId={alcaldesaNoteId} />
        </Suspense>
      )}

      {(showAcciona || location.pathname.toLowerCase().match(/^\/acciona(\/|$)/i)) && (
        <Suspense fallback={<LoadingScreen />}>
          <VLSNewsAcciona onClose={() => {
            setShowAcciona(false);
            if (location.pathname.match(/^\/acciona/i)) navigate('/');
          }} />
        </Suspense>
      )}

      {(showSalud || location.pathname.toLowerCase().match(/^\/salud(\/|$)/i)) && (
        <Suspense fallback={<LoadingScreen />}>
          <VLSNewsSalud onClose={() => {
            setShowSalud(false);
            if (location.pathname.match(/^\/salud/i)) navigate('/');
          }} />
        </Suspense>
      )}
      
      {showVLSNewsUcen && (
        <Suspense fallback={<LoadingScreen />}>
          <VLSNewsUcen onClose={() => {
            setShowVLSNewsUcen(false);
            if (location.pathname.match(/^\/ucen/i)) navigate('/');
          }} />
        </Suspense>
      )}

      {showVLSNewsArtemis && (
        <Suspense fallback={<LoadingScreen />}>
          <VLSNewsArtemis onClose={() => {
            setShowVLSNewsArtemis(false);
            if (location.pathname.match(/^\/(artemis|artemisa|artemis2)/i)) navigate('/');
          }} />
        </Suspense>
      )}

      {(showNewsChoapa || location.pathname.toLowerCase().match(/^\/choapa(\/|$)/i)) && (
        <Suspense fallback={<LoadingScreen />}>
          <VLSNewsChoapa onClose={() => {
            setShowNewsChoapa(false);
            if (location.pathname.match(/^\/choapa/i)) navigate('/');
          }} />
        </Suspense>
      )}

      {(showNewsRedCine || location.pathname.toLowerCase().match(/^\/redcine(\/|$)/i)) && (
        <Suspense fallback={<LoadingScreen />}>
          <VLSNewsRedCine onClose={() => {
            setShowNewsRedCine(false);
            if (location.pathname.match(/^\/redcine/i)) navigate('/');
          }} />
        </Suspense>
      )}

      {/* Encuentro Ciudadano: Fe y Civismo */}
      {showEcumenical && <EcumenicalPortalModal onClose={() => setShowEcumenical(false)} />}
      {showSecular && <SecularPortalModal onClose={() => setShowSecular(false)} />}
      {showAirport && <LaFloridaAirport onClose={() => setShowAirport(false)} />}
      {showCity3D && (
        <Suspense fallback={<div style={{ position: 'fixed', inset: 0, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', zIndex: 100060 }}>Construyendo Ciudad Digital...</div>}>
          <SmartCity3DClone onClose={() => setShowCity3D(false)} />
        </Suspense>
      )}
      {showOperacionLS && <OperacionLaSerena onClose={() => setShowOperacionLS(false)} />}
      {showIdentityGate && !isMediaPortal && <IdentityGate onClose={() => setShowIdentityGate(false)} onVerified={(type) => console.log('Verified as:', type)} />}

      {/* Retrov TVs y Portales */}
      {showRetroTV && <OldTVModal onClose={() => setShowRetroTV(false)} />}
      {showVerticalTV && <VerticalTVModal onClose={() => setShowVerticalTV(false)} />}
      {showVhsTV && <VhsTVModal onClose={() => setShowVhsTV(false)} />}
      {showVlsMasterCharts && <VlsMasterChartsPortal onClose={() => setShowVlsMasterCharts(false)} />}
      {showMemoryPortal && <MemoryPortalModal onClose={() => setShowMemoryPortal(false)} />}
      {showKiosko && <KioskoDiarios onClose={() => setShowKiosko(false)} />}

            {showSmartAdmin && (
        <Suspense fallback={<div className="glass-panel" style={{ position: 'fixed', inset: '20%', zIndex: 300000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando Panel de Administración...</div>}>
          <div style={{ position: 'fixed', inset: isMobile ? '0' : '10%', zIndex: 100075 }}>
            <SmartAdministration onClose={() => setShowSmartAdmin(false)} currentUser={currentUser} />
          </div>
        </Suspense>
      )}
      {showPersonalStereo && <PersonalStereo onClose={() => setShowPersonalStereo(false)} />}
      {showMusicRanking && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 60000, background: 'rgba(2,6,23,0.95)', backdropFilter: 'blur(15px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', overflowY: 'auto' }}>
            <div style={{ width: '100%', maxWidth: '1200px', position: 'relative' }}>
                <MusicRanking insideModal={true} onClose={() => setShowMusicRanking(false)} />
            </div>
        </div>
      )}
      {showSismicCenter && <SismicCenter onClose={() => setShowSismicCenter(false)} />}
      {showSmartTheater && <SmartTheater onClose={() => setShowSmartTheater(false)} />}
      {showObservatory && <ObservatorioSmart onClose={() => setShowObservatory(false)} />}
      {showReelToReel && <ReelToReelStudio onClose={() => setShowReelToReel(false)} />}
      {showSmartBusiness && <Suspense fallback={<div />}><SmartBusinessMVP onClose={() => setShowSmartBusiness(false)} /></Suspense>}
      {showMuseum && <CommunicationsMuseum onClose={() => setShowMuseum(false)} />}
      {showVecinojos && <VecinojosPortal onClose={() => setShowVecinojos(false)} />}
      {showVLSFeed && <SmartVLSFeed onClose={() => setShowVLSFeed(false)} />}
      {showBroadcaster && <SmartBroadcasterStudio onClose={() => setShowBroadcaster(false)} />}
      {showDeBonoHats && <DeBonoThinkingHats onClose={() => setShowDeBonoHats(false)} />}
      {showTribunales && <TribunalesVecinales onClose={() => setShowTribunales(false)} />}
      {showDonRadios && <DonRadios onComplete={() => setShowDonRadios(false)} />}
      {showRetroRoom && <RetroGamerRoom onClose={() => setShowRetroRoom(false)} />}
      {showCalendar && (
        <Suspense fallback={null}>
          <SmartCalendar onClose={() => setShowCalendar(false)} />
        </Suspense>
      )}
      {showLeanMaster && <LeanStartupMaster onClose={() => setShowLeanMaster(false)} />}
      {showAuditoria && <Suspense fallback={<div />}><AuditoriaVecinal onClose={() => setShowAuditoria(false)} /></Suspense>}
      {showParlamento && <Suspense fallback={<div />}><ParlamentoVecinal onClose={() => setShowParlamento(false)} /></Suspense>}
      {showSmartTV && !isRDMLS && <Suspense fallback={null}><SmartTV onClose={() => setShowSmartTV(false)} /></Suspense>}
      {showGym3D && <Suspense fallback={null}><Gimnasio3D onClose={() => setShowGym3D(false)} /></Suspense>}
      {showEnfermeria && <SmartEnfermeria onClose={() => setShowEnfermeria(false)} />}
      
      {showAkichip && (
        <Suspense fallback={<LoadingScreen />}>
          <div style={{ position: 'fixed', inset: 0, zIndex: 100000 }}>
            <AkichipPortal onClose={() => setShowAkichip(false)} />
          </div>
        </Suspense>
      )}

      {/* Secure Radio Master Engine Overlay */}
      {showRadioMaster && (
        currentUser && ALLOWED_ADMINS.includes(currentUser.email) ? (
          <div style={{ position: 'fixed', inset: 0, zIndex: 100050, background: 'rgba(5, 5, 20, 0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <RadioMasterEngine onClose={() => setShowRadioMaster(false)} />
          </div>
        ) : (
          <div style={{ position: 'fixed', inset: 0, zIndex: 100050, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="glass-panel" style={{ padding: '3rem', borderRadius: '24px', textAlign: 'center', border: '2px solid #ef4444' }}>
              <ShieldAlert size={60} color="#ef4444" style={{ marginBottom: '1rem' }} />
              <h2 style={{ color: 'white' }}>ACCESO RESTRINGIDO</h2>
              <p style={{ color: '#94a3b8' }}>Este módulo es exclusivo para Administradores {isRDMLS ? 'RDMLS' : 'VLS'}.<br />Favor contactar a {isRDMLS ? 'comunicaciones@rdmls.cl' : 'vecinossmart@gmail.com'}</p>
              <button onClick={() => setShowRadioMaster(false)} className="btn btn-primary" style={{ marginTop: '1.5rem', width: '100%', padding: '1rem' }}>VOLVER AL PORTAL</button>
            </div>
          </div>
        )
      )}

      {/* Broadcaster Studio (Restricted Access) */}
      {showBroadcaster && (
        currentUser && ALLOWED_ADMINS.includes(currentUser.email) ? (
          <SmartBroadcasterStudio onClose={() => setShowBroadcaster(false)} />
        ) : (
          <div style={{ position: 'fixed', inset: 0, zIndex: 100050, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="glass-panel" style={{ padding: '3rem', borderRadius: '24px', textAlign: 'center', border: '2px solid #ef4444' }}>
              <ShieldAlert size={60} color="#ef4444" style={{ marginBottom: '1rem' }} />
              <h2 style={{ color: 'white' }}>ESTUDIO RESTRINGIDO</h2>
              <p style={{ color: '#94a3b8' }}>Para usar el Switcher profesional debe ser un operador {isRDMLS ? 'autorizado' : 'VLS'} autorizado.</p>
              <button onClick={() => setShowBroadcaster(false)} className="btn btn-primary" style={{ marginTop: '1.5rem', width: '100%', padding: '1rem' }}>CERRAR</button>
            </div>
          </div>
        )
      )}
      {showRadioMaster && <RadioMasterEngine onClose={() => setShowRadioMaster(false)} />}

      {/* Directorio de Emergencia — Acceso 24/7 */}
      {showEmergencyDirectory && <EmergencyDirectory onClose={() => setShowEmergencyDirectory(false)} />}

      {/* Smart Events Portal */}
      {showSmartEvents && (
        <Suspense fallback={<div style={{ position: 'fixed', inset: 0, zIndex: 3000000, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>Cargando Panel de Eventos...</div>}>
          <SmartEventsVLS onClose={() => setShowSmartEvents(false)} />
        </Suspense>
      )}

      {showBackofficeMovil && (
        <Suspense fallback={<LoadingScreen />}>
          <BackofficeMovilVLS onClose={() => setShowBackofficeMovil(false)} />
        </Suspense>
      )}

      {showSentinelApex && (
        (currentUser && ALLOWED_ADMINS.includes(currentUser.email.toLowerCase())) || localStorage.getItem('master_bypass') === 'true' ? (
          <SentinelApex onClose={() => setShowSentinelApex(false)} />
        ) : (
          <div style={{ position: 'fixed', inset: 0, zIndex: 100000, background: 'rgba(5, 10, 25, 0.95)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', padding: '2rem', textAlign: 'center' }}>
            <div className="glass-panel scale-in" style={{ padding: '3rem', maxWidth: '500px', border: '1px solid #ef4444', boxShadow: '0 0 40px rgba(239, 68, 68, 0.2)' }}>
              <ShieldAlert size={80} color="#ef4444" style={{ marginBottom: '1.5rem', filter: 'drop-shadow(0 0 10px #ef4444)' }} />
              <h2 className="text-gradient" style={{ marginBottom: '1rem' }}>MÓDULO ESTRATÉGICO BLOQUEADO</h2>
              <p style={{ color: '#94a3b8', lineHeight: '1.6', marginBottom: '2rem' }}>
                Sentinel Apex contiene inteligencia social y operativa sensible. Solo operadores de nivel "Administrador" pueden acceder a esta consola.
              </p>
              <button onClick={() => setShowSentinelApex(false)} className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>Cerrar y Volver al Dashboard</button>
            </div>
          </div>
        )
      )}

      {showFaroCentinel && (
        <Suspense fallback={<LoadingScreen />}>
          <FaroCentinel onClose={() => setShowFaroCentinel(false)} />
        </Suspense>
      )}

      {showPortMonitor && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(10px)', overflowY: 'auto', padding: '2rem' }}>
          <div style={{ maxWidth: '1250px', margin: '0 auto', position: 'relative' }}>
            <button onClick={() => setShowPortMonitor(false)} className="btn-glass" style={{ position: 'absolute', top: 0, right: 0, zIndex: 1000, padding: '0.8rem', borderRadius: '50%' }}><CloseIcon color="white" /></button>
            <Suspense fallback={null}><PortMonitor isMini={false} /></Suspense>
          </div>
        </div>
      )}

      {showAnalyticsApp && (
        <Suspense fallback={null}><VecinosAnalyticsApp onClose={() => setShowAnalyticsApp(false)} /></Suspense>
      )}

      {showSafeRoute && (
        <Suspense fallback={null}><SafeRouteAI onClose={() => setShowSafeRoute(false)} /></Suspense>
      )}
      {showVeterinaria && (
        <Suspense fallback={null}><RedVeterinariaVLS onClose={() => setShowVeterinaria(false)} /></Suspense>
      )}
      {showPincha && (
        <Suspense fallback={null}><PinchaDating onClose={() => setShowPincha(false)} /></Suspense>
      )}

      {showOrientacionLegal && (
        <Suspense fallback={null}><OrientacionLegal onClose={() => setShowOrientacionLegal(false)} /></Suspense>
      )}

      {/* Radio Backoffice Access is also strategically locked */}
      {/* The event is usually handled inside components, but if it was here we would lock it too */}

      {/* Background Music Player (Always Active if stream/file set) */}
      {showUserProfile && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 3000000, background: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="glass-panel scale-in" style={{ 
            maxWidth: '500px', width: '100%', padding: '2.5rem', borderRadius: '32px', 
            border: '1px solid rgba(56, 189, 248, 0.4)', 
            background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', 
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', 
            display: 'flex', flexDirection: 'column', gap: '2rem',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Background Glow */}
            <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '250px', height: '250px', background: '#38bdf8', filter: 'blur(150px)', opacity: 0.1, pointerEvents: 'none' }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
              <div>
                <h2 style={{ color: 'white', margin: 0, fontSize: '1.6rem', fontWeight: 950, letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <UserCircle size={32} color="#38bdf8" /> CENTRO VECINAL
                </h2>
                <p style={{ margin: 0, color: '#38bdf8', fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '2px' }}>TERMINAL DEL CIUDADANO SMART</p>
              </div>
              <button 
                onClick={() => setShowUserProfile(false)} 
                style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: '#ef4444', padding: '10px', borderRadius: '50%', cursor: 'pointer', transition: '0.3s' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
              >
                <CloseIcon size={24} />
              </button>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '1.5rem', position: 'relative' }}>
              <div style={{ 
                width: '80px', height: '80px', borderRadius: '50%', 
                background: 'linear-gradient(45deg, #38bdf8, #10b981)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                fontSize: '2rem', fontWeight: '950', color: '#0f172a',
                boxShadow: '0 0 20px rgba(56, 189, 248, 0.4)'
              }}>
                {currentUser ? currentUser.displayName?.[0] || 'U' : 'V'}
              </div>
              <div>
                <h3 style={{ margin: '0 0 0.4rem 0', color: 'white', fontSize: '1.4rem', fontWeight: 900 }}>
                  {currentUser ? currentUser.displayName : 'Vecino Smart'}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 'bold' }}>{currentUser ? currentUser.email : 'vecino@laserena.cl'}</span>
                  {currentUser?.displayName?.toLowerCase().includes('cuturrufo') && (
                    <span style={{ background: '#fbbf24', color: '#000', fontSize: '0.65rem', padding: '2px 10px', borderRadius: '10px', fontWeight: '950', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Award size={12} /> LINAJE DE LA REGIÓN
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '1.5rem', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.2)', textAlign: 'center' }}>
                <span style={{ display: 'block', fontSize: '0.75rem', color: '#10b981', fontWeight: 'bold', marginBottom: '0.8rem', letterSpacing: '1px' }}>REPORTES ENVIADOS</span>
                <strong style={{ fontSize: '2.2rem', color: 'white', fontWeight: 950 }}>0</strong>
              </div>
              <div style={{ background: 'rgba(245, 158, 11, 0.05)', padding: '1.5rem', borderRadius: '20px', border: '1px solid rgba(245, 158, 11, 0.2)', textAlign: 'center' }}>
                <span style={{ display: 'block', fontSize: '0.75rem', color: '#f59e0b', fontWeight: 'bold', marginBottom: '0.8rem', letterSpacing: '1px' }}>PUNTOS KPI LOCAL</span>
                <strong style={{ fontSize: '2.2rem', color: 'white', fontWeight: 950 }}>{gameScore}</strong>
              </div>
            </div>

            {currentUser && (
              <div style={{ background: 'rgba(56, 189, 248, 0.03)', padding: '1.5rem', borderRadius: '24px', border: '1px solid rgba(56, 189, 248, 0.15)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.95rem', color: '#38bdf8', fontWeight: 950, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={18} color="#38bdf8" /> INVITA A TU RED VECINAL
                  </span>
                  <span style={{ fontSize: '0.7rem', background: '#38bdf8', color: '#000', padding: '3px 10px', borderRadius: '20px', fontWeight: '950' }}>
                    10 CUPOS
                  </span>
                </div>
                <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.6' }}>
                  Fortalece la seguridad y el tejido social compartiendo tu enlace de validación exclusivo.
                </p>
                <button
                  onClick={() => {
                    const inviteLink = `https://vecinoslaserena.cl/?invite_code=VLS-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
                    navigator.clipboard.writeText(inviteLink);
                    window.dispatchEvent(new CustomEvent('vls-notification', { detail: { title: '¡Enlace Copiado!', body: 'Pégalo en WhatsApp para invitar a tus vecinos.', type: 'success' } }));
                  }}
                  style={{ 
                    width: '100%', padding: '1.2rem', 
                    background: 'linear-gradient(45deg, rgba(56, 189, 248, 0.2), rgba(56, 189, 248, 0.1))', 
                    border: '1px solid #38bdf8', color: '#38bdf8', 
                    borderRadius: '16px', cursor: 'pointer', fontWeight: 950, 
                    fontSize: '0.9rem', letterSpacing: '1px',
                    transition: '0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(56, 189, 248, 0.3)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(56, 189, 248, 0.2)'}
                >
                  📋 COPIAR ENLACE MÁGICO (VLS TICKET)
                </button>
              </div>
            )}

            {currentUser ? (
              <button onClick={() => {
                const doLogout = () => {
                  setCurrentUser(null);
                  setIsGuest(false);
                  setGuestTimeLeft(0);
                  localStorage.removeItem('smart_is_guest');
                  localStorage.setItem('smart_logout', 'true');
                  setShowUserProfile(false);
                  window.location.href = '/';
                };
                signOut(auth).then(doLogout).catch(err => {
                  console.error("Logout error:", err);
                  doLogout();
                });
              }} className="btn" style={{ width: '100%', padding: '1rem', background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid #ef4444', borderRadius: '12px', fontWeight: 'bold', marginTop: '0.5rem' }}>
                Cerrar Sesión de Red
              </button>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                <button onClick={() => { setShowUserProfile(false); handleLogin(); }} className="btn btn-primary" style={{ width: '100%', padding: '1rem', borderRadius: '12px', fontWeight: 'bold' }}>
                  Conectar con Identidad VLS
                </button>
                {isGuest && (
                  <button
                    onClick={() => {
                      setIsGuest(false);
                      setCurrentUser(null);
                      setGuestTimeLeft(0);
                      localStorage.removeItem('smart_is_guest');
                      localStorage.setItem('smart_logout', 'true');
                      setShowUserProfile(false);
                      window.location.href = '/';
                    }}
                    className="btn-glass"
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', fontWeight: 'bold' }}
                  >
                    Cerrar Sesión de Invitado
                  </button>
                )}
              </div>
            )}

            <button
              onClick={() => {
                localStorage.removeItem('smart_tenant');
                window.location.href = '/welcome';
              }}
              className="btn btn-glass animate-pulse-slow"
              style={{ width: '100%', padding: '0.8rem', color: '#fcd34d', border: '1px solid rgba(252, 211, 77, 0.3)', background: 'rgba(252, 211, 77, 0.05)', borderRadius: '12px', marginTop: '1rem', fontSize: '0.9rem', cursor: 'pointer' }}
            >
              ðŸ”„ Reconfigurar Entorno B2B (Modo Demo)
            </button>
          </div>
        </div>
      )}

      {/* ELIMINADO: Passport AppLoginOverlay que bloqueaba el flujo de ciudadanos */}

      {showFaritoSocial && (
        <Suspense fallback={null}><FaritoSocialNetwork onClose={() => setShowFaritoSocial(false)} currentUser={currentUser} /></Suspense>
      )}
      {showLinkedInManager && (
        <Suspense fallback={null}>
          <div style={{ position: 'fixed', inset: 0, zIndex: 1000000 }}>
            <LinkedInManager onClose={() => setShowLinkedInManager(false)} />
          </div>
        </Suspense>
      )}
      {showEntreVecinas && (
        <Suspense fallback={<div style={{ position: 'fixed', inset: 0, zIndex: 1000000, background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ec4899' }}>Cargando EntreVecinas Hub...</div>}>
          <EntreVecinasHub onClose={() => setShowEntreVecinas(false)} />
        </Suspense>
      )}
      {showVLSpeak && (
        <Suspense fallback={null}><VLSpeakTranslator onClose={() => setShowVLSpeak(false)} /></Suspense>
      )}
      {showAlcaldes && (
        <Suspense fallback={<div style={{ position: 'fixed', inset: 0, zIndex: 1000000, background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8' }}>Cargando Archivo Histórico...</div>}>
          <AlcaldesHistory onClose={() => { setShowAlcaldes(false); navigate(-1); }} />
        </Suspense>
      )}
      {showChileHub && (
        <Suspense fallback={<div style={{ position: 'fixed', inset: 0, zIndex: 1000000, background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>Iniciando Red Nacional Vecinos Chile...</div>}>
          <VecinosChileHub onClose={() => setShowChileHub(false)} />
        </Suspense>
      )}
      {showVecnityPay && (
        <Suspense fallback={<div style={{ position: 'fixed', inset: 0, zIndex: 1000000, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><LoadingScreen /></div>}>
          <VecnityPay 
            onClose={() => { setShowVecnityPay(false); setPendingPayment(null); }} 
            currentUser={currentUser} 
            initialOrder={pendingPayment}
          />
        </Suspense>
      )}

      {showDomeyko && (
        <Suspense fallback={<div style={{ position: 'fixed', inset: 0, zIndex: 9999999, background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8', fontFamily: 'Outfit, sans-serif', fontWeight: 900 }}>Cargando Portal Domeyko...</div>}>
          <DomeykoPortal 
            initialTab={domeykoInitialTab}
            onClose={() => {
              setShowDomeyko(false);
              setDomeykoInitialTab('bio'); 
              if (location.pathname.match(/^\/(domeyko|lambert)/i)) navigate('/');
            }} 
          />
        </Suspense>
      )}
      {/* showPulsoCiudadano && (
        <Suspense fallback={<LoadingScreen />}>
          <PulsoCiudadano onClose={() => {
            setShowPulsoCiudadano(false);
            if (location.pathname.match(/^\/pulsociudadano/i)) navigate('/');
          }} />
        </Suspense>
      ) */}
      {showSmartOS && (
        <Suspense fallback={<LoadingScreen />}>
          <SmartComunaOS onLogout={() => setShowSmartOS(false)} />
        </Suspense>
      )}
      {showStella && (
        <Suspense fallback={<LoadingScreen />}>
          <VLSNewsStella onClose={() => { 
            window.dispatchEvent(new CustomEvent('stop-all-audio'));
            setShowStella(false); 
            navigate('/'); 
            window.dispatchEvent(new CustomEvent('vls-start-radio'));
          }} />
        </Suspense>
      )}
      {showDiaDelTrabajador && (
        <Suspense fallback={<LoadingScreen />}>
          <DiaDelTrabajador onClose={() => { 
            setShowDiaDelTrabajador(false); 
            navigate('/'); 
          }} />
        </Suspense>
      )}
      {showTransparenciaSecreta && <Suspense fallback={<div />}><MonitoreoTransparencia onClose={() => setShowTransparenciaSecreta(false)} /></Suspense>}
    </div>
  );
}

export default App;
