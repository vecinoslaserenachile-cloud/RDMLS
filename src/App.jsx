import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Outlet, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Map as MapIcon, Box, ExternalLink, Home, Info, X as CloseIcon, Star, Sun, Moon, Cloud, CloudRain, CloudLightning, CloudSnow, CloudFog, Bell, UserCircle, Sparkles, Fingerprint, ArrowLeft, Ticket, Activity, LogIn, ClipboardList, Eye, Download, ShieldClose, HardDrive, ShoppingCart, Tag, Shirt, Network, Fuel, Ruler, Plane, Anchor, LineChart, LayoutGrid } from 'lucide-react';
import { socket as comSocket } from './utils/socket';
import RadioMasterEngine from './components/Radio/RadioMasterEngine';

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
const SmartCalendar = lazy(() => import('./components/SmartCalendar.jsx'));
const LeanStartupMaster = lazy(() => import('./components/LeanStartupMaster.jsx'));
const TiendaPoleras3D = lazy(() => import('./components/TiendaPoleras3D'));
const CoquiSmartKanban = lazy(() => import('./components/CoquiSmartKanban'));
const Aprende = lazy(() => import('./pages/Aprende'));
const VLSInduccion = lazy(() => import('./pages/VLSInduccion'));
import Induccion26 from './pages/Induccion26';

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
import DeBonoThinkingHats from './components/DeBonoThinkingHats.jsx';
import VLSConsoleSound from './components/VLSConsoleSound.jsx';
import DronDrigo from './components/DronDrigo.jsx';
import VLSQuantumWatch from './components/VLSQuantumWatch.jsx';
const TribunalesVecinales = lazy(() => import('./components/TribunalesVecinales.jsx'));
const DonRadios = lazy(() => import('./components/DonRadios.jsx'));
const SmartAdministration = lazy(() => import('./components/SmartAdministration.jsx'));
const EmbajadasConsulados = lazy(() => import('./components/EmbajadasConsulados.jsx'));
const SismicCenter = lazy(() => import('./components/SismicCenter.jsx'));
const SmartTheater = lazy(() => import('./components/SmartTheater.jsx'));
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
const RadioPlayer = lazy(() => import('./components/RadioPlayer'));
const TokenEconomyMaster = lazy(() => import('./components/TokenEconomyMaster'));
import VecnityPay from './components/VecnityPay';
const FaritoSocialNetwork = lazy(() => import('./components/FaritoSocialNetwork'));
const FaroCentinel = lazy(() => import('./components/FaroCentinel'));
const BoticaVecinal = lazy(() => import('./components/BoticaVecinal'));
const RedVeterinariaVLS = lazy(() => import('./components/RedVeterinariaVLS'));
const SerenitoAntigravity = lazy(() => import('./components/SerenitoAntigravity'));
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
const DeBonoThinkingHatsVLS = lazy(() => import('./components/DeBonoThinkingHatsVLS'));
const FiestaFAVLS = lazy(() => import('./components/FiestaFAVLS'));
const VlsSmartBillionaire = lazy(() => import('./components/VlsSmartBillionaire'));
const PinchaDating = lazy(() => import('./components/PinchaDating'));
const EntreVecinasHub = lazy(() => import('./pages/EntrevecinasHub'));
const AlcaldesHistory = lazy(() => import('./pages/AlcaldesHistory'));
const VecinosChileHub = lazy(() => import('./pages/VecinosChileHub'));
const ParliamentaryObservatory = lazy(() => import('./components/ParliamentaryObservatory'));
const VecinosAnalyticsApp = lazy(() => import('./components/VecinosAnalyticsApp/VecinosAnalyticsApp.jsx'));
const VLSNewsBencinazo = lazy(() => import('./components/VLSNewsBencinazo'));
const VLSNewsPoduje = lazy(() => import('./components/VLSNewsPoduje'));
const VLSNewsSentinel = lazy(() => import('./components/VLSNewsSentinel'));
const VLSNewsInvestigacion = lazy(() => import('./components/VLSNewsInvestigacion'));
const VLSNewsSemanaSanta = lazy(() => import('./components/VLSNewsSemanaSanta'));
const VLSMotorsSpot = lazy(() => import('./components/VLSMotorsSpot'));
const SafeRouteAI = lazy(() => import('./components/SafeRouteAI'));
const PortMonitor = lazy(() => import('./components/NavieraMonitor'));
const OrientacionLegal = lazy(() => import('./components/OrientacionLegal'));
const VLSpeakTranslator = lazy(() => import('./components/VLSpeakTranslator'));

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



import MartinSecurityShield from './components/MartinSecurityShield';
import LegacyVLSAppendix from './components/LegacyVLSAppendix';
import NetSpeedMonitor from './components/NetSpeedMonitor';
import SerenitoSecurityGuard from './components/SerenitoSecurityGuard';
import KioskoDiarios from './components/KioskoDiarios';
import FloatingActionPanel from './components/FloatingActionPanel';
import SmartToolbox from './components/SmartToolbox';
import SmartEnfermeria from './components/SmartEnfermeria';
import PianoCompita from './components/PianoCompita';
import ErrorCollector from './components/ErrorCollector';

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


import { LanguageProvider, useTranslation } from './context/LanguageContext';
import { auth } from './utils/firebase';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, signInWithRedirect } from 'firebase/auth';
import { db } from './utils/firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import GlobalAnnouncer from './components/GlobalAnnouncer';

const LoadingScreen = ({ isSyncing = false }) => {
  const host = (window.location.hostname || window.location.host || '').toLowerCase();
  const isRDMLS = host.includes('rdmls') || (host.includes('laserena.cl') && !host.includes('vecinos'));
  const isEntrevecinas = host.includes('entrevecinas.cl');

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#020617', color: isEntrevecinas ? '#f472b6' : (isRDMLS ? '#dc2626' : '#38bdf8'), fontFamily: 'Inter, sans-serif' }}>
      
      {/* Animación de Faro en Líneas Vectoriales */}
      <div style={{ position: 'relative', zIndex: 1, width: '120px', height: '150px', marginBottom: '1.5rem' }}>
          <svg viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
              <motion.path
                  d="M 46 25 L 54 25 L 56 100 L 44 100 Z"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              />
              <motion.path
                  d="M 43 25 L 57 25 M 44 20 L 56 20 L 56 25 L 44 25 Z M 47 20 L 53 20 L 53 15 L 47 15 Z M 50 15 L 50 10"
                  stroke="currentColor" strokeWidth="1.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", delay: 0.2 }}
              />
              <motion.path
                  d="M 20 100 L 80 100 L 85 115 L 15 115 Z M 25 100 L 25 95 L 30 95 L 30 100 M 70 100 L 70 95 L 75 95 L 75 100"
                  stroke="currentColor" strokeWidth="1.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
              />
              <motion.circle cx="15" cy="115" r="4" stroke="currentColor" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, repeat: Infinity }} />
              <motion.circle cx="85" cy="115" r="4" stroke="currentColor" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, repeat: Infinity, delay: 0.2 }} />
              
              <motion.path
                  d="M 15 115 L 15 90 M 15 90 L 22 93 L 15 96"
                  stroke="currentColor" strokeWidth="1"
                  animate={{ x: [0, 2, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.path
                  d="M 85 115 L 85 85 M 85 85 L 92 88 L 85 91"
                  stroke="currentColor" strokeWidth="1"
                  animate={{ x: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />

              {[35, 50, 65, 80].map((y, i) => (
                  <motion.rect key={i} x="48.5" y={y} width="3" height="5" stroke="currentColor" strokeWidth="1" 
                      initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }} />
              ))}
              
              <motion.circle 
                  cx="50" cy="18" r="8" fill="currentColor"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
              />
          </svg>
      </div>

      <div style={{ textAlign: 'center' }}>
        <span style={{ fontSize: '0.7rem', fontWeight: 'black', letterSpacing: '0.3em', opacity: 0.5, display: 'block', marginBottom: '0.5rem' }}>OMNIDIRECTIONAL_SYNC_ACTIVE</span>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          {isEntrevecinas ? 'Entrevecinas: Sintonizando Voz Femenina...' :
            (isRDMLS ? 'RDMLS: Estableciendo señal municipal...' : 'VLS OS: Sincronizando con la Red Ciudadana...')}
        </h2>
      </div>
      {isSyncing && (
        <div style={{ position: 'fixed', bottom: '4rem', opacity: 0.3, fontSize: '0.6rem', fontWeight: 'bold' }}>
          DEPLOING_VLS_OS_GLOBAL_ENGINE_v4.2.1
        </div>
      )}
    </div>
  );
};

const ALLOWED_ADMINS = [
  'directorio@vecinosmart.cl',
  'admin@vecinosmart.cl',
  'soporte@vecinosmart.cl',
  'master@vecinosmart.cl',
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
          <Activity size={32} className="animate-pulse" />
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
            onClick={() => window.location.reload()}
            style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', color: 'white', borderRadius: '15px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
          >
            REINTENTAR AHORA
          </button>
          <button
            onClick={() => {
              if (msg) {
                alert("REPORTE_C5: Tu mensaje ha sido enviado al equipo de vecinoslaserenachile.cl");
                setMsg("");
                setVisible(false);
                localStorage.removeItem('vls_maintenance_active');
              }
            }}
            style={{ padding: '1rem', background: '#38bdf8', color: '#020617', borderRadius: '15px', border: 'none', fontWeight: '900', cursor: 'pointer' }}
          >
            ENVIAR Y CERRAR
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const GlobalOmniSyncOverlay = () => {
  const [active, setActive] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setActive(false), 2500);
    return () => clearTimeout(timer);
  }, []);
  if (!active) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000000, pointerEvents: 'none' }}>
      <motion.div
        initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 1, delay: 1.5 }}
        style={{ width: '100%', height: '100%', background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <LoadingScreen isSyncing={true} />
      </motion.div>
    </div>
  );
};

function App() {
  const [showCoquiSmartCRM, setShowCoquiSmartCRM] = useState(false);
  const host = window.location.host.toLowerCase();
  const isRDMLS = host.includes('rdmls') || (host.includes('laserena.cl') && !host.includes('vecinos'));

  return (
    <>
      <GlobalOmniSyncOverlay />
      <AppContent setShowCoquiSmartCRM={setShowCoquiSmartCRM} />
      {(window.location.pathname !== '/induccion' && window.location.pathname !== '/induccion_imls' && window.location.pathname !== '/vlsabes' && !isRDMLS) && <VLSQuantumWatch isRDMLS={isRDMLS} />}
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
    </>
  );
}

function AppContent({ setShowCoquiSmartCRM }) {
  const navigate = useNavigate();
  const location = useLocation();
  const host = window.location.host.toLowerCase();
  const isRDMLS = host.includes('rdmls') || (host.includes('laserena.cl') && !host.includes('vecinos'));
  const isAcademy = host.includes('vecinosmart.cl'); // Entorno Comercial de Venta de Know-how
  const isVLS = !isRDMLS && !isAcademy && (host.includes('vecinos') || host.includes('vls.cl') || host.includes('localhost'));
  const isMasterDomain = isAcademy || host.includes('vls.cl') || host.includes('smartcomuna.cl');
  const isDirectDomain = host.includes('vecinoslaserena.cl') || host.includes('rdmls.cl') || host.includes('entrevecinas.cl') || host.includes('vecinoschile.cl');
  const isChile = host.includes('vecinoschile.cl');
  const isNational = isChile;
  const isInduccion = location.pathname.includes('/induccion') || location.pathname.includes('/induccion_imls');
  const isVLSabes = location.pathname.includes('/vlsabes');
  const isZeroDistraction = isInduccion || isVLSabes || isRDMLS;
  const isCommercial = isAcademy;

  const { t, lang, setLang } = useTranslation();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');
  const memorialId = searchParams.get('m');
  const stratParam = searchParams.get('strategy');
  const mKey = searchParams.get('vls_master');
  const appId = searchParams.get('app');
  const newsId = searchParams.get('news');
  const [currentUser, setCurrentUser] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const [guestTimeLeft, setGuestTimeLeft] = useState(3600);
  const [authInitialized, setAuthInitialized] = useState(isRDMLS);
  const [notifications, setNotifications] = useState([]);
  const [showSafeRoute, setShowSafeRoute] = useState(false);
  const [showRadio, setShowRadio] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [showDistances, setShowDistances] = useState(false);
  const [showProjectInfo, setShowProjectInfo] = useState(false);
  const [showRadioMaster, setShowRadioMaster] = useState(false);
  const [showHub3D, setShowHub3D] = useState(false);
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
  useEffect(() => {
    if (mode === 'aprende' || mode === 'induccion') {
        console.log("IMLS_OS: Locking to Induction/Aprende Mode...");
    }
  }, [mode]);

  const isAprendeMode = mode === 'aprende' || mode === 'induccion';

  // Sentinel Health Monitoring
  useEffect(() => {
    // Simulamos un check de integridad de red o de componentes críticos
    const checkIntegrity = () => {
      const maintenanceFlag = localStorage.getItem('vls_maintenance_active');
      if (maintenanceFlag === 'true') {
        setSystemHealth('polishing');
        setShowMaintenanceNotice(true);
      }
    };
    checkIntegrity();
    window.addEventListener('trigger-vls-maintenance', () => {
      setSystemHealth('polishing');
      setShowMaintenanceNotice(true);
    });
  }, []);
  const [showAuditoria, setShowAuditoria] = useState(false);
  const [showParlamento, setShowParlamento] = useState(false);
  const [showGym3D, setShowGym3D] = useState(false);
  const [showMotorTiempo, setShowMotorTiempo] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showEnfermeria, setShowEnfermeria] = useState(false);
  const [showSmartBusiness, setShowSmartBusiness] = useState(false);
  const [showEmbajadas, setShowEmbajadas] = useState(false);
  const [showFaritoSocial, setShowFaritoSocial] = useState(false);
  const [showNotificationsMenu, setShowNotificationsMenu] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [vlsTokens, setVlsTokens] = useState(() => parseInt(localStorage.getItem('vls_tokens') || '0'));
  const [showSmartTV, setShowSmartTV] = useState(false);
  const [pendingPayment, setPendingPayment] = useState(null);

  // ── Sync con Firestore (El CRM del Vecino) ─────────────────────────────────
  useEffect(() => {
    if (!currentUser) return;
    const userDocRef = doc(db, "vls_accounts", currentUser.uid);

    // Obtener saldo inicial de la nube
    const syncFromCloud = async () => {
      try {
        const snap = await getDoc(userDocRef);
        if (snap.exists()) {
          const cloudTokens = snap.data().tokens || 0;
          // Si la nube tiene más, actualizamos localmente
          if (cloudTokens > vlsTokens) {
            setVlsTokens(cloudTokens);
            localStorage.setItem('vls_tokens', cloudTokens.toString());
          }
        } else {
          // Crear perfil inicial si no existe
          await setDoc(userDocRef, {
            email: currentUser.email,
            displayName: currentUser.displayName,
            tokens: vlsTokens,
            lastSeen: new Date().toISOString()
          });
        }
      } catch (e) {
        console.warn("Firestore Sync Error:", e);
      }
    };
    syncFromCloud();

    // Listener en tiempo real para el saldo (pagos exitosos recargan aquí)
    const unsub = onSnapshot(userDocRef, (snap) => {
      if (snap.exists()) {
        const cloudTokens = snap.data().tokens || 0;
        if (cloudTokens !== vlsTokens) {
          setVlsTokens(cloudTokens);
          localStorage.setItem('vls_tokens', cloudTokens.toString());
          window.dispatchEvent(new CustomEvent('tokens-updated', { detail: cloudTokens }));
        }
      }
    });
    return () => unsub();
  }, [currentUser]);

  // Sincronizar cambios locales a la nube (ej: cuando gana una trivia)
  useEffect(() => {
    if (!currentUser) return;
    const userDocRef = doc(db, "vls_accounts", currentUser.uid);
    const syncToCloud = async () => {
      try {
        const snap = await getDoc(userDocRef);
        if (snap.exists() && snap.data().tokens < vlsTokens) {
          await setDoc(userDocRef, { tokens: vlsTokens }, { merge: true });
        }
      } catch (e) { }
    };
    syncToCloud();
  }, [vlsTokens, currentUser]);
  const [showPrecolombino, setShowPrecolombino] = useState(false);
  const [showEntreVecinas, setShowEntreVecinas] = useState(host.includes('entrevecinas'));

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
  const [sovereignName, setSovereignName] = useState(SOVEREIGN_NAMES[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSovereignName(SOVEREIGN_NAMES[Math.floor(Math.random() * SOVEREIGN_NAMES.length)]);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // REDIRECCIÓN CASCADA POR HOSTNAME
  useEffect(() => {
    const host = window.location.hostname;
    if (host.includes('entrevecinas.cl') && location.pathname === '/') {
      navigate('/legacy');
    } else if (host.includes('farito.cl') && location.pathname === '/') {
      navigate('/inversores');
    } else if (host.includes('puertasmart.cl') && location.pathname === '/') {
      navigate('/puerta');
    } else if (host.includes('radiovecinos.cl') && location.pathname === '/') {
      // Opcional: Redirigir a un hub de radios si existiera
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
  const [showSerenitoAntigravity, setShowSerenitoAntigravity] = useState(false);
  const [showSkyGuide, setShowSkyGuide] = useState(false);
  const [showVecnityPay, setShowVecnityPay] = useState(false);
  const [showMemoriasUnicornio, setShowMemoriasUnicornio] = useState(false);
  const [showAguasValle, setShowAguasValle] = useState(false);
  const [showTiendaPoleras, setShowTiendaPoleras] = useState(false);
  const [showNewsBencinazo, setShowNewsBencinazo] = useState(false);
  const [showNewsPoduje, setShowNewsPoduje] = useState(false);
  const [showNewsSentinel, setShowNewsSentinel] = useState(false);
  const [showNewsInvestigacion, setShowNewsInvestigacion] = useState(false);
  const [showNewsSemanaSanta, setShowNewsSemanaSanta] = useState(false);
  const [showSoveranix, setShowSoveranix] = useState(false);
  const [showAlcaldes, setShowAlcaldes] = useState(false);
  const [showVLSpeak, setShowVLSpeak] = useState(false);
  const [showChileHub, setShowChileHub] = useState(false);
  const [showParliamentary, setShowParliamentary] = useState(false);
  const [showPortMonitor, setShowPortMonitor] = useState(false);
  const [showAnalyticsApp, setShowAnalyticsApp] = useState(false);
  const [showVLSMotors, setShowVLSMotors] = useState(false);
  const [showOrientacionLegal, setShowOrientacionLegal] = useState(false);

  useEffect(() => {
    // Título y Favicon Dinámico
    let pageTitle = 'vecinoslaserena.cl';
    let favIconUrl = '/vls-crystal-icon.svg';

    if (isAcademy) {
      pageTitle = 'Academia Smart - Entrenamiento de Elite';
      favIconUrl = '/academy_icon.png';
    } else if (isMasterDomain) {
      pageTitle = 'VecinoSmart - Red Inteligente';
      favIconUrl = '/vls-logo-3d.png';
    } else if (isRDMLS) {
      pageTitle = 'RDMLS - Radio Digital Municipal';
      favIconUrl = '/escudo.png';
    } else if (host.includes('entrevecinas')) {
      pageTitle = 'Entre Vecinas - VLS Network';
      favIconUrl = '/entrevecinas_icon.png';
    } else if (host.includes('vecinoschile')) {
      pageTitle = 'Vecinos Chile - Red Republicana 2026';
      favIconUrl = '/chile_icon.png';
    }

    document.title = pageTitle;
    const links = document.querySelectorAll("link[rel~='icon']");
    links.forEach(link => { link.href = favIconUrl; });

    if (location.pathname === '/radios' || location.pathname.includes('/radios')) {
      if (!showRadioMaster) setShowRadioMaster(true);
    }

    if (!localStorage.getItem('smart_tenant') && !isDirectDomain && !isRDMLS && !host.includes('localhost') && !host.includes('127.0.0.1')) {
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

    // Force scroll to top on every route transition
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [navigate, location.pathname]);

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
    if (!auth) {
      setAuthInitialized(true);
      return;
    }
    // Timeout de seguridad: si Firebase tarda más de 5s, renderizamos de todas formas
    const safetyTimer = setTimeout(() => {
      setAuthInitialized(true);
    }, 5000);
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      clearTimeout(safetyTimer);
      setCurrentUser(u);
      setAuthInitialized(true);
      if (u) {
        window.dispatchEvent(new CustomEvent('vls-start-radio'));
      }
    });
    return () => { unsubscribe(); clearTimeout(safetyTimer); };
  }, [auth, isRDMLS]);

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
    const handleReportes = () => navigate('/reportes');
    const handleParliamentary = () => setShowParliamentary(true);
    const handleInduccionFixed = () => setShowVLSInduccion(true);

    window.addEventListener('open-vlspeak', handleSpeak);
    window.addEventListener('open-alcaldes-history', handleAlcaldes);
    window.addEventListener('open-entrevecinas', handleEntrevecinas);
    window.addEventListener('open-smart-business', handleReportes);
    window.addEventListener('open-parlamento-regional', handleParliamentary);
    window.addEventListener('open-smart-admin-fixed', handleInduccionFixed);

    return () => {
      comSocket.off('receive_push_notification');
      window.removeEventListener('tokens-updated', handleTokensUpdate);
      window.removeEventListener('open-vlspeak', handleSpeak);
      window.removeEventListener('open-alcaldes-history', handleAlcaldes);
      window.removeEventListener('open-entrevecinas', handleEntrevecinas);
      window.removeEventListener('open-smart-business', handleReportes);
      window.removeEventListener('open-parlamento-regional', handleParliamentary);
      window.removeEventListener('open-smart-admin-fixed', handleInduccionFixed);
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
    if (!auth || !auth.app) {
      console.error('CRÍTICO: El motor de Identidad VLS no se ha inicializado correctamente.');
      alert("⚠️ El sistema de autenticación no está listo. Por favor, recargue la página.");
      return;
    }
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    signInWithPopup(auth, provider).then((result) => {
      const rewardKey = `vls_tokens_rewarded_${result.user.uid}`;
      // VLS TOKEN INTELLIGENCE: Evitar duplicidad de recompensa por ingreso
      const userDocRef = doc(db, "vls_accounts", result.user.uid);
      getDoc(userDocRef).then(snap => {
          const alreadyRewarded = snap.exists() && snap.data().rewarded_entry;
          const isNewLocal = localStorage.getItem(rewardKey) === null;

          if (isNewLocal && !alreadyRewarded) {
            const reward = 20; 
            const currentTokens = parseInt(localStorage.getItem('vls_tokens') || '0');
            const newTokens = currentTokens + reward;
            setVlsTokens(newTokens);
            localStorage.setItem('vls_tokens', newTokens.toString());
            localStorage.setItem(rewardKey, 'true');
            
            // Persistir en Firestore para que no ocurra en otros dispositivos
            setDoc(userDocRef, { rewarded_entry: true }, { merge: true });

            const msg = `Por bienvenida cargamos tu VecinityBank con ${reward} fichas VLS. ¡Disfruta el portal!`;
            const newNotif = {
              id: Date.now(),
              title: "🎁 RECOMPENSA DE INGRESO",
              body: msg,
              read: false,
              timestamp: new Date().toLocaleString('es-CL'),
              type: 'token_gift'
            };
            setNotifications(prev => [newNotif, ...prev]);
            window.dispatchEvent(new CustomEvent('tokens-updated', { detail: newTokens }));
          }
      });

      setCurrentUser(result.user);
      setIsGuest(false);
      localStorage.removeItem('smart_is_guest');
      localStorage.removeItem('smart_logout');

      window.dispatchEvent(new CustomEvent('vls-start-radio'));
    }).catch((error) => {
      if (error.code === 'auth/popup-closed-by-user') {
        console.warn("VLS Auth: Login cancelado por el usuario.");
      } else {
        console.error("Auth Error:", error.message);
      }
    });
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
    if (currentUser && ALLOWED_ADMINS.includes(currentUser.email.toLowerCase())) {
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
  const handleOpenMemorial = () => setShowMemorial(true);
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
  const handleOpenPoduje = () => setShowNewsPoduje(true);
  const handleOpenSentinelNews = () => setShowNewsSentinel(true);
  const handleOpenInvestigacion = () => setShowNewsInvestigacion(true);
  const handleOpenVeterinaria = () => setShowVeterinaria(true);
  const handleOpenSafeRoute = () => setShowSafeRoute(true);
  const handleOpenEnfermeria = () => setShowEnfermeria(true);
  const handleOpenPincha = () => setShowPincha(true);
  const handleOpenSmartSalud = () => navigate('/smart-salud');
  const handleOpenArquitectura = () => navigate('/arquitectura');
  const handleOpenPropiedades = () => navigate('/propiedades');
  const handleOpenIdentityGate = () => setShowIdentityGate(true);
  const handleOpenGym = () => setShowGym3D(true);

  const handleToggleRadio = () => {
    if (!showRadio) window.dispatchEvent(new CustomEvent('stop-all-audio'));
    setShowRadio(prev => !prev);
  };


  useEffect(() => {
    // Detectar Deep Link reactivamente (Deep Linking Mundial v5.0)
    const path = location.pathname;

    // Validación de Clave Maestra vía URL para activación rápida
    if (mKey === 'admin2026' || mKey === 'admin123') {
      localStorage.setItem('master_bypass', 'true');
    }

    // Ruta directa de fichas: /fichas
    if (path === '/fichas' || path.includes('/fichas')) {
      setTimeout(() => setShowVecnityPay(true), 1000);
    }

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
        if (appId === 'sentinel') setShowSentinelApex(true);
        if (appId === 'analytics') setShowAnalyticsApp(true);
      }, 1000);
    }

    if (newsId) {
      setTimeout(() => {
        if (newsId === 'bencinazo') setShowNewsBencinazo(true);
        if (newsId === 'semanasanta' || newsId === 'semana-santa') setShowNewsSemanaSanta(true);
        if (newsId === 'poduje') setShowNewsPoduje(true);
        if (newsId === 'sentinel') setShowNewsSentinel(true);
        if (newsId === 'investigacion' || newsId === 'paradoja') setShowNewsInvestigacion(true);
        if (newsId === 'aguasvalle') setShowAguasValle(true);
      }, 1200);
    }
  }, [searchParams, location.pathname]);

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
    const handleOpenAuditoria = () => setShowAuditoria(true);
    const handleOpenParlamento = () => setShowParlamento(true);
    const handleOpenFaritoSocial = () => setShowFaritoSocial(true);
    const handleOpenFaroCentinel = () => setShowFaroCentinel(true);
    const handleOpenBotica = () => setShowBotica(true);
    const handleOpenVeterinaria = () => setShowVeterinaria(true);
    const handleOpenSuperSerenito = () => setShowSerenitoAntigravity(true);
    const handleOpenSkyGuide = () => setShowSkyGuide(true);
    const handleOpenMotorTiempo = () => setShowMotorTiempo(true);
    const handleOpenRadioMaster = () => setShowRadioMaster(true);
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
    window.addEventListener('open-project-info', handleOpenProjectInfo);
    window.addEventListener('open-social-vision', () => setShowSocialVision(true));
    window.addEventListener('open-vls-vision', handleOpenProjectInfo);
    window.addEventListener('open-embajadas', handleOpenEmbajadas);
    window.addEventListener('open-council', handleOpenCouncil);
    window.addEventListener('open-cdls', handleOpenCDLS);
    window.addEventListener('open-game', handleOpenGame);
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
    window.addEventListener('open-vls-poduje', handleOpenPoduje);
    window.addEventListener('open-vls-sentinel', handleOpenSentinelNews);
    window.addEventListener('open-vls-investigacion', handleOpenInvestigacion);
    window.addEventListener('open-vlspeak', () => setShowVLSpeak(true));
    window.addEventListener('open-vls-aguas', handleOpenAguasValle);
    window.addEventListener('open-pincha', handleOpenPincha);
    window.addEventListener('open-plaza-vecinal', handleOpenPlazaVecinal);
    window.addEventListener('open-safe-route', handleOpenSafeRoute);
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

    // Escucha global para detener todos los audios
    window.addEventListener('stop-all-audio', () => {
      // Disparar eventos individuales para cada componente que maneje audio
      window.dispatchEvent(new CustomEvent('vls-stop-radio'));
      window.dispatchEvent(new CustomEvent('vls-stop-cassette'));
      window.dispatchEvent(new CustomEvent('vls-stop-hats'));
      window.dispatchEvent(new CustomEvent('vls-stop-donradios'));
      window.dispatchEvent(new CustomEvent('vls-stop-studio'));
      window.speechSynthesis.cancel();
    });

    window.addEventListener('close-all-floating', () => {
      setShowRadio(false);
      setShowChat(false);
      setShowDistances(false);
      setShowHub3D(false);
      setShowAuditoria(false);
      setShowParlamento(false);
      setShowGym3D(false);
      setShowMotorTiempo(false);
      setShowCalendar(false);
      setShowLeanMaster(false);
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
      window.removeEventListener('open-project-info', handleOpenProjectInfo);
      window.removeEventListener('open-vls-vision', handleOpenProjectInfo);
      window.removeEventListener('open-embajadas', handleOpenEmbajadas);
      window.removeEventListener('open-council', handleOpenCouncil);
      window.removeEventListener('open-cdls', handleOpenCDLS);
      window.removeEventListener('open-game', handleOpenGame);
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
      window.removeEventListener('open-vls-poduje', handleOpenPoduje);
      window.removeEventListener('open-vls-sentinel', handleOpenSentinelNews);
      window.removeEventListener('open-vls-investigacion', handleOpenInvestigacion);
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
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('stop-all-audio', () => {}); 
      comSocket.off('vls-receive-push', handlePush);
      if (typeof weatherInterval !== 'undefined') clearInterval(weatherInterval);
    };
  }, []);

  const isAuthorized = currentUser && ALLOWED_ADMINS.some(admin => admin.toLowerCase() === currentUser.email.toLowerCase());
  // Un usuario de Google no-admin también puede acceder (como vecino registrado)
  const isGoogleUser = currentUser && !isAuthorized;

  // ELIMINADO: Bloqueo Maestro Passport que impedía acceso a pagos
  const showMasterLock = false;

  if (!authInitialized && !isRDMLS) {
    return <LoadingScreen />;
  }

  if (isRDMLS) {
    return (
      <div className="app-layout animate-fade-in" style={{ background: '#020617', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <main className="page-content container" style={{ flex: 1, padding: 0 }}>
          <Outlet context={{ weather, lang, setLang, t, currentUser, isRDMLS }} />
        </main>
        {/* Radio Player can remain as a hidden service if needed, but not the UI */}
        <Suspense fallback={null}>
          <RadioMasterEngine host="rdmls.cl" />
        </Suspense>
        <footer style={{ padding: '2rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', fontSize: '1rem' }}>
          <p>© 2026 ILUSTRE MUNICIPALIDAD DE LA SERENA · GESTIÓN INSTITUCIONAL</p>
          <p>www.rdmls.cl · IMLS COMUNICACIONES</p>
        </footer>

        {/* Global Modals for RDMLS branch */}
        {showTiendaPoleras && (
          <Suspense fallback={null}>
            <TiendaPoleras3D onClose={() => setShowTiendaPoleras(false)} currentUser={currentUser} />
          </Suspense>
        )}
        {showRoadmap && (
          <Suspense fallback={null}>
            <VLSVisionModal onClose={() => setShowRoadmap(false)} />
          </Suspense>
        )}
      </div>
    );
  }

  if (isAprendeMode) {
    return <Aprende isRDMLS={isRDMLS} />;
  }

  return (
    <div className="app-layout animate-fade-in">
      <Suspense fallback={null}>
        <MartinSecurityShield />
        {!isZeroDistraction && !isRDMLS && <NetSpeedMonitor />}
        <SerenitoSecurityGuard />
        <SecurityHoneypot />
        <SmartShare renderAsHiddenObserver={true} />
        {!isZeroDistraction && !isRDMLS && <FloatingActionPanel />}
        <ErrorCollector />
      </Suspense>

      {/* Módulo Vertical RRSS (Transversal) */}
      {!isZeroDistraction && (
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
      {!isZeroDistraction && !isRDMLS && (
        <VLSConsoleSound
          onOpenRadio={() => { window.dispatchEvent(new CustomEvent('stop-all-audio')); setShowRadio(true); }}
          onOpenTV={() => { window.dispatchEvent(new CustomEvent('stop-all-audio')); setShowRetroTV(true); }}
          onClose={() => { }}
        />
      )}


      {/* Top Header — Branding dinámico según dominio */}
      {!isZeroDistraction && !isRDMLS && (
        <header
          className="glass-header animate-fade-in"
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
            height: 'var(--nav-height)',
            borderBottom: isRDMLS ? '3px solid #f59e0b' : '1px solid rgba(255,255,255,0.05)',
            background: isRDMLS ? 'rgba(80, 5, 5, 0.97)' : 'rgba(15, 23, 42, 0.95)',
            padding: '0 0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
            pointerEvents: 'none'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', overflow: 'hidden', flexShrink: 1, pointerEvents: 'auto' }}>
            <button onClick={() => navigate('/')} className="btn-glass" style={{ padding: '0.35rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.1)', flexShrink: 0, pointerEvents: 'auto' }} title="Inicio">
              <Home size={16} color="white" />
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
                  <img src="/escudo.png" style={{ height: '24px', marginRight: '6px' }} alt="RDMLS" />
                  RADIO DIGITAL MUNICIPAL LA SERENA
                </>
              ) : (
                <>
                  <img src="/vls-logo-premium.png" style={{ height: '24px', marginRight: '6px', filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.3))' }} alt="VLS Logo" />
                  www.vecinoslaserena.cl
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

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0, pointerEvents: 'auto' }}>
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

            {/* CTA REPORTE VECINAL (TOP) */}
            <button 
              onClick={() => navigate('/reportes')}
              className="glass-panel animate-pulse desktop-only"
              style={{
                padding: '0.4rem 1rem',
                borderRadius: '50px',
                background: 'rgba(239, 68, 68, 0.15)',
                border: '2px solid #ef4444',
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
              <>
                {!currentUser ? (
                  <button
                    onClick={handleLogin}
                    className="glass-panel animate-pulse"
                    style={{ padding: '0.35rem 0.8rem', borderRadius: '20px', fontWeight: '900', fontSize: '0.75rem', background: 'rgba(59, 130, 246, 0.2)', border: '1px solid #3b82f6', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <LogIn size={14} /> CONECTAR IDENTIDAD
                  </button>
                ) : (
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
                      borderRadius: '20px'
                    }}
                  >
                    <UserCircle size={14} />
                    {currentUser.displayName?.split(' ')[0]}
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
                    borderRadius: '20px'
                  }}
                >
                  <Ticket size={14} />
                  {vlsTokens} FICHAS
                  <span style={{ fontSize: '0.6rem', background: '#f59e0b', color: '#0f172a', padding: '1px 4px', borderRadius: '4px' }}>CARGAR</span>
                </button>
                <button
                  onClick={() => setShowTiendaPoleras(true)}
                  className="glass-panel hover-lift"
                  style={{
                    padding: '0.35rem 0.8rem',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(251, 191, 36, 0.15)',
                    border: '1px solid rgba(251, 191, 36, 0.5)',
                    color: '#fbbf24',
                    fontWeight: '900',
                    borderRadius: '20px'
                  }}
                  title="Tienda de Poleras 3D"
                >
                  <Shirt size={14} /> TIENDA
                </button>
                <button
                  onClick={() => {
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
                      signOut(auth).then(doLogout).catch(err => {
                        console.error("Logout error:", err);
                        doLogout();
                      });
                    } else {
                      doLogout();
                    }
                  }}
                  className="btn-glass pulse"
                  style={{
                    padding: '0.6rem 1.2rem',
                    borderRadius: '50px',
                    background: 'rgba(239, 68, 68, 0.4)',
                    border: '2px solid #ef4444',
                    color: 'white',
                    fontWeight: '900',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <CloseIcon size={20} color="white" />
                  <span style={{ fontSize: '0.9rem', letterSpacing: '1px' }}>SALIR</span>
                </button>
              </>
            )}
          </div>

          {showNotificationsMenu && (
            <div className="glass-panel" style={{ position: 'absolute', top: '50px', right: '10px', width: '300px', maxHeight: '400px', overflowY: 'auto', background: 'rgba(15, 23, 42, 0.95)', border: '1px solid var(--brand-primary)', borderRadius: '12px', zIndex: 100000 }}>
              <div style={{ padding: '0.8rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8' }}><Bell size={16} /> Alertas de la Red Vecinal</strong>
                <button onClick={() => setShowNotificationsMenu(false)} className="btn-glass"><CloseIcon size={14} /></button>
              </div>
              {notifications.length === 0 ? (
                <div style={{ padding: '2rem 1rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem' }}>No tienes notificaciones recientes.</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {notifications.map(n => (
                    <div key={n.id} style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', background: n.read ? 'transparent' : 'rgba(16, 185, 129, 0.05)' }}>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{n.timestamp}</div>
                      <strong style={{ color: 'white', display: 'block', margin: '4px 0' }}>{n.title}</strong>
                      {n.body && <p style={{ margin: 0, fontSize: '0.8rem', color: '#cbd5e1', lineHeight: '1.4' }}>{n.body}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </header>
      )}

      <main className={`page-content ${location.pathname === '/dev' ? 'full-width-dev' : 'container'}`} style={{ paddingBottom: isZeroDistraction ? 0 : '4rem', paddingTop: isZeroDistraction ? 0 : 'var(--nav-height)' }}>
        <Outlet context={{ weather, isAuthorized, isGuest, isRegistered, lang, setLang, t, currentUser, isRDMLS }} />
        {!isZeroDistraction && (
          <footer style={{ marginTop: '4rem', padding: '2rem', textAlign: 'center', borderTop: '1px solid rgba(255,215,0,0.1)', color: '#94a3b8', fontSize: '0.9rem' }}>
            <p>© 2026 {isRDMLS ? 'ILUSTRE MUNICIPALIDAD DE LA SERENA · GESTIÓN INSTITUCIONAL' : 'VECINOSLASERENA.CL · INNOVACIÓN CIUDADANA'}</p>
            <p>Contacto: <a href="mailto:contacto@vecinosmart.cl" style={{ color: '#FFD700' }}>contacto@vecinosmart.cl</a></p>
          </footer>
        )}
      </main>

      {/* Smart Toolbox Control (Caja de Herramientas) */}
      {!isZeroDistraction && !isRDMLS && <SmartToolbox />}

      {/* Chat Botón y Panel */}
      {showChat && (
        <Suspense fallback={<div />}>
          <ChatAssistant onClose={() => setShowChat(false)} isOpenDefault={true} />
        </Suspense>
      )}

      {!isZeroDistraction && !isRDMLS && (
        <>
          {/* Reproductores de TV flotantes eliminados (SmartTV) para evitar distracciones y errores de carga de señales externas */}
          <GlobalAnnouncer />

          <Suspense fallback={<div style={{ position: 'fixed', bottom: 20, right: 20, color: 'white' }}>Cargando Señal VLS...</div>}>
            {!isRDMLS && <RadioPlayer globalWeather={weather} isVisible={showRadio} style={{ zIndex: (showUserProfile || showSentinelApex || showBroadcaster || showRadioMaster) ? 50 : 100050 }} />}
          </Suspense>
        </>
      )}

      {/* Smart Hub 3D (Sistema Simplificado) */}
      {showHub3D && (
        <Suspense fallback={null}>
          <SmartHub3D onClose={() => setShowHub3D(false)} />
        </Suspense>
      )}

      {!isZeroDistraction && !isRDMLS && <PianoCompita />}

      {/* Modal Distancias */}
      {showDistances && (
        <Suspense fallback={<div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100060, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>Cargando Mapa Distancias...</div>}>
          <DistancesMap onClose={() => setShowDistances(false)} />
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

      {/* Modal Concejo Municipal */}
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
        <Suspense fallback={null}>
          <MemorialHijosRegion onClose={() => setShowMemorial(false)} currentUser={currentUser} />
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
      {showSentinelMini && <SentinelMini onClose={() => setShowSentinelMini(false)} />}

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
      {showIdentityGate && <IdentityGate onClose={() => setShowIdentityGate(false)} onVerified={(type) => console.log('Verified as:', type)} />}

      {/* Retrov TVs y Portales */}
      {showRetroTV && <OldTVModal onClose={() => setShowRetroTV(false)} />}
      {showVerticalTV && <VerticalTVModal onClose={() => setShowVerticalTV(false)} />}
      {showVhsTV && <VhsTVModal onClose={() => setShowVhsTV(false)} />}
      {showVlsMasterCharts && <VlsMasterChartsPortal onClose={() => setShowVlsMasterCharts(false)} />}
      {showMemoryPortal && <MemoryPortalModal onClose={() => setShowMemoryPortal(false)} />}
      {showKiosko && <KioskoDiarios onClose={() => setShowKiosko(false)} />}
      {showMemorial && <MemorialHijosRegion onClose={() => setShowMemorial(false)} />}
            {showSmartAdmin && (
        <Suspense fallback={<div className="glass-panel" style={{ position: 'fixed', inset: '20%', zIndex: 300000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando Panel de Administración...</div>}>
          <div style={{ position: 'fixed', inset: isMobile ? '0' : '10%', zIndex: 100075 }}>
            <SmartAdministration onClose={() => setShowSmartAdmin(false)} currentUser={currentUser} />
          </div>
        </Suspense>
      )}
      {showPersonalStereo && <PersonalStereo onClose={() => setShowPersonalStereo(false)} />}
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
              <p style={{ color: '#94a3b8' }}>Este módulo es exclusivo para Administradores {isRDMLS ? 'RDMLS' : 'VLS'}.<br />Favor contactar a {isRDMLS ? 'comunicaciones@laserena.cl' : 'vecinossmart@gmail.com'}</p>
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
              <p style={{ color: '#94a3b8' }}>Para usar el Switcher profesional debe ser un operador {isRDMLS ? 'municipal' : 'VLS'} autorizado.</p>
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


      {/* Legacy VLS Appendix */}
      {showAppendix && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 90000 }}>
          <LegacyVLSAppendix onClose={() => setShowAppendix(false)} />
        </div>
      )}
      {/* Memorias del Unicornio (El Libro del Unicornio) */}
      {showMemoriasUnicornio && (
        <Suspense fallback={<div style={{ position: 'fixed', inset: 0, background: '#000', zIndex: 100060 }} />}>
          <MemoriasUnicornio onClose={() => setShowMemoriasUnicornio(false)} />
        </Suspense>
      )}
      {showAguasValle && (
        <Suspense fallback={<div className="loading-vls">Cargando Hemeroteca...</div>}>
          <VLSNewsAguasValle onClose={() => setShowAguasValle(false)} />
        </Suspense>
      )}
      {showTiendaPoleras && (
        <Suspense fallback={null}>
          <TiendaPoleras3D onClose={() => setShowTiendaPoleras(false)} currentUser={currentUser} />
        </Suspense>
      )}

      {showRoadmap && (
        <Suspense fallback={null}>
          <VLSVisionModal onClose={() => setShowRoadmap(false)} />
        </Suspense>
      )}
      {showNewsBencinazo && (
        <Suspense fallback={null}>
          <VLSNewsBencinazo onClose={() => setShowNewsBencinazo(false)} />
        </Suspense>
      )}
      {showNewsPoduje && (
        <Suspense fallback={null}>
          <VLSNewsPoduje onClose={() => setShowNewsPoduje(false)} />
        </Suspense>
      )}
      {showNewsSentinel && (
        <Suspense fallback={null}>
          <VLSNewsSentinel onClose={() => setShowNewsSentinel(false)} />
        </Suspense>
      )}
      {showNewsInvestigacion && (
        <Suspense fallback={null}>
          <VLSNewsInvestigacion onClose={() => setShowNewsInvestigacion(false)} />
        </Suspense>
      )}
      {showNewsSemanaSanta && (
        <Suspense fallback={null}>
          <VLSNewsSemanaSanta onClose={() => setShowNewsSemanaSanta(false)} />
        </Suspense>
      )}
      {/* Strategic Lock for Sentinel Apex (Intelligence Module) */}
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
        <div style={{ position: 'fixed', inset: 0, zIndex: 3000000, background: 'rgba(15, 23, 42, 0.98)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="glass-panel scale-in" style={{ maxWidth: '500px', width: '100%', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(56, 189, 248, 0.5)', background: 'linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,58,138,0.95))', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ color: 'white', margin: 0, fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><UserCircle size={24} color="#38bdf8" /> Centro Vecinal</h2>
              <button onClick={() => setShowUserProfile(false)} className="btn-glass" style={{ padding: '0.4rem', borderRadius: '50%' }}><CloseIcon size={18} /></button>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: '#0f172a' }}>
                {currentUser ? currentUser.displayName?.[0] || 'U' : 'V'}
              </div>
              <div>
                <h3 style={{ margin: '0 0 0.3rem 0', color: 'white' }}>{currentUser ? currentUser.displayName : 'Vecino Smart'}</h3>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem' }}>{currentUser ? currentUser.email : 'vecino@laserena.cl'}</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                <span style={{ display: 'block', fontSize: '0.8rem', color: '#10b981', marginBottom: '0.3rem' }}>Reportes Enviados</span>
                <strong style={{ fontSize: '1.5rem', color: 'white' }}>0</strong>
              </div>
              <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                <span style={{ display: 'block', fontSize: '0.8rem', color: '#f59e0b', marginBottom: '0.3rem' }}>Puntos KPI Local</span>
                <strong style={{ fontSize: '1.5rem', color: 'white' }}>{gameScore}</strong>
              </div>
            </div>

            {currentUser && (
              <div style={{ background: 'linear-gradient(45deg, rgba(56, 189, 248, 0.1), rgba(16, 185, 129, 0.1))', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(56, 189, 248, 0.3)', marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                  <span style={{ fontSize: '0.9rem', color: '#bae6fd', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={16} color="#38bdf8" /> Invita a tu Red Vecinal
                  </span>
                  <span style={{ fontSize: '0.75rem', background: '#38bdf8', color: '#0f172a', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>
                    10 Cupos
                  </span>
                </div>
                <p style={{ margin: '0 0 1rem 0', fontSize: '0.8rem', color: '#94a3b8', lineHeight: '1.4' }}>
                  Asegura el barrio compartiendo tu enlace de validación exclusivo. Cada vecino que se una expande nuestra ComunaSmart.
                </p>
                <button
                  onClick={() => {
                    const inviteLink = `https://vecinoslaserena.cl/?invite_code=VLS-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
                    navigator.clipboard.writeText(inviteLink);
                    alert(`¡Enlace copiado!\n\n${inviteLink}\n\nEnvíalo por WhatsApp o Correo a tus vecinos.`);
                  }}
                  className="btn-glass hover-lift"
                  style={{ width: '100%', padding: '0.8rem', background: 'rgba(56, 189, 248, 0.2)', border: '1px solid #38bdf8', color: '#38bdf8', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}
                >
                  📋 Copiar Enlace Mágico (VLS Ticket)
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
              🔄 Reconfigurar Entorno B2B (Modo Demo)
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
          <AlcaldesHistory onClose={() => { setShowAlcaldes(false); navigate('/hub'); }} />
        </Suspense>
      )}
      {showChileHub && (
        <Suspense fallback={<div style={{ position: 'fixed', inset: 0, zIndex: 1000000, background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>Iniciando Red Nacional Vecinos Chile...</div>}>
          <VecinosChileHub onClose={() => setShowChileHub(false)} />
        </Suspense>
      )}
      {showVecnityPay && (
        <VecnityPay 
          onClose={() => { setShowVecnityPay(false); setPendingPayment(null); }} 
          currentUser={currentUser} 
          initialOrder={pendingPayment}
        />
      )}
    </div>
  );
}

export default App;
