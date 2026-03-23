import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { ShieldAlert, Map as MapIcon, Box, ExternalLink, Home, Info, X as CloseIcon, Star, Sun, Moon, Cloud, CloudRain, CloudLightning, CloudSnow, CloudFog, Bell, UserCircle, Sparkles, Fingerprint, ArrowLeft, Ticket, Activity } from 'lucide-react';
import RadioMasterEngine from './components/Radio/RadioMasterEngine';
import VLSQuantumWatch from './components/VLSQuantumWatch';

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
const SunoChartsPortal = lazy(() => import('./pages/SunoChart'));
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
const TribunalesVecinales = lazy(() => import('./components/TribunalesVecinales.jsx'));
const DonRadios = lazy(() => import('./components/DonRadios.jsx'));
const SmartAdministration = lazy(() => import('./components/SmartAdministration.jsx'));
const EmbajadasConsulados = lazy(() => import('./components/EmbajadasConsulados.jsx'));
const SismicCenter = lazy(() => import('./components/SismicCenter.jsx'));
const SmartTheater = lazy(() => import('./components/SmartTheater.jsx'));
const SmartHub3D = lazy(() => import('./components/SmartHub3D'));
const SocialVision = lazy(() => import('./components/SocialVision'));
const RadioIntercom = lazy(() => import('./components/RadioIntercom'));
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
const VecnityPay = lazy(() => import('./components/VecnityPay'));
const FaritoSocialNetwork = lazy(() => import('./components/FaritoSocialNetwork'));
const FaroCentinel = lazy(() => import('./components/FaroCentinel'));
const BoticaVecinal = lazy(() => import('./components/BoticaVecinal'));
const RedVeterinariaVLS = lazy(() => import('./components/RedVeterinariaVLS'));
const SuperSerenitoBros = lazy(() => import('./components/SuperSerenitoBros'));
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
import VLSGameMain from './components/VLSGameMain';

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
    "Lucas"
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
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import GlobalAnnouncer from './components/GlobalAnnouncer';

const LoadingScreen = () => <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020617', color: '#38bdf8' }}>Cargando VLS OS...</div>;

const ALLOWED_ADMINS = [
    'directorio@vecinosmart.cl', 
    'admin@vecinosmart.cl',
    'soporte@vecinosmart.cl',
    'master@vecinosmart.cl',
    'vecinossmart@gmail.com',
    'vecinoslaserenachile@gmail.com'
];

function App() {
  return (
    <>
      <AppContent />
    </>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, lang, setLang } = useTranslation();
  const [currentUser, setCurrentUser] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const [guestTimeLeft, setGuestTimeLeft] = useState(3600);
  const [authInitialized, setAuthInitialized] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showRadio, setShowRadio] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [showDistances, setShowDistances] = useState(false);
  const [showProjectInfo, setShowProjectInfo] = useState(false);
  const [showRadioMaster, setShowRadioMaster] = useState(false);
  const [showHub3D, setShowHub3D] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [weather, setWeather] = useState(null);
  const [gameScore, setGameScore] = useState(0);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showLeanMaster, setShowLeanMaster] = useState(false);
  const [showSmartAdmin, setShowSmartAdmin] = useState(false);
  const [showDronDrigo, setShowDronDrigo] = useState(false);
  const [showSocialVision, setShowSocialVision] = useState(false);
  const [showIntercom, setShowIntercom] = useState(false);
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
  const [showPrecolombino, setShowPrecolombino] = useState(false);

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
  const [showSunoCharts, setShowSunoCharts] = useState(false);
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
  const [showFaroCentinel, setShowFaroCentinel] = useState(false);
  const [showBotica, setShowBotica] = useState(false);
  const [showVLSGame, setShowVLSGame] = useState(false);
  const [showVeterinaria, setShowVeterinaria] = useState(false);
  const [showSuperSerenito, setShowSuperSerenito] = useState(false);
  const [showSkyGuide, setShowSkyGuide] = useState(false);
  const [showVecnityPay, setShowVecnityPay] = useState(false);


  const host = window.location.hostname.toLowerCase();
  const isVLS = !host.includes('rdmls') && !host.includes('radiovecino') && !host.includes('entrevecinas');
  const isRDMLS = !isVLS; 
  const isMasterDomain = host.includes('vecinosmart.cl') || host.includes('vls.cl') || host.includes('smartcomuna.cl');
  const isDirectDomain = host.includes('vecinoslaserena.cl') || host.includes('laserena.cl'); 

  useEffect(() => {
    // Título y Favicon Dinámico
    let pageTitle = 'vecinoslaserena.cl';
    // FAVICON RESTAURADO: Cristal Biselado VLS (Rojo/Blanco)
    let favIconUrl = '/vls-crystal-icon.svg'; 

    if (isMasterDomain) {
       pageTitle = 'VecinoSmart - Red Inteligente';
       favIconUrl = '/vls-logo-3d.png';
    } else if (host.includes('rdmls') || host.includes('rdmls.cl')) {
       pageTitle = 'RDMLS - Radio Digital Municipal';
       favIconUrl = '/escudo.png';
    } else if (host.includes('entrevecinas')) {
       pageTitle = 'Entre Vecinas - VLS';
       favIconUrl = '/vls-logo-3d.png';
    }

    document.title = pageTitle;
    const links = document.querySelectorAll("link[rel~='icon']");
    links.forEach(link => { link.href = favIconUrl; });
    
    if (location.pathname === '/radios' || location.pathname.includes('/radios')) {
        if (!showRadioMaster) setShowRadioMaster(true);
    }

    if (isDirectDomain && !currentUser && !localStorage.getItem('smart_logout') && !isGuest) {
        setIsGuest(true);
        localStorage.setItem('smart_is_guest', 'true');
    }

    if (!localStorage.getItem('smart_tenant') && !isDirectDomain && !host.includes('localhost') && !host.includes('127.0.0.1')) {
        if (location.pathname !== '/welcome') {
            navigate('/welcome');
        }
    }

    const storedGuest = localStorage.getItem('smart_is_guest') === 'true';
    if (storedGuest && !isGuest) {
        setIsGuest(true);
    }

    const saved = localStorage.getItem('smart_notifications');
    if (saved) setNotifications(JSON.parse(saved));
  }, [navigate, location.pathname, isGuest, currentUser]);

  useEffect(() => {
    if (auth && typeof auth.onAuthStateChanged === 'function') {
      const unsubscribe = auth.onAuthStateChanged(u => {
        setCurrentUser(u);
        setAuthInitialized(true);
      });
      return () => unsubscribe();
    } else {
      setAuthInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);


  useEffect(() => {
    const handleOpenDron = () => setShowDronDrigo(true);
    const handleRetroTv = () => setShowRetroTV(true);
    const handleVhsTv = () => setShowVhsTV(true);
    const handleGame = () => setShowGame(true);
    const handlePersonalStereo = () => setShowPersonalStereo(true);
    const handleTimeBus = () => setShowTimeBus(true);
    const handleGym = () => setShowGym3D(true);
    const handleRetroRoom = () => setShowRetroRoom(true);
    const handleFaritoSocial = () => setShowFaritoSocial(true);
    const handleVecnityPay   = () => setShowVecnityPay(true);
    
    const handleFaroChat = () => setShowChat(true);
    const handlePrecolombino = () => setShowPrecolombino(true);
    const handleParlamento = () => setShowParlamento(true);

    window.addEventListener('open-dron-drigo', handleOpenDron);
    window.addEventListener('open-retro-tv', handleRetroTv);
    window.addEventListener('open-vhs-tv', handleVhsTv);
    window.addEventListener('open-game', handleGame);
    window.addEventListener('open-personal-stereo', handlePersonalStereo);
    window.addEventListener('open-time-bus', handleTimeBus);
    window.addEventListener('open-gym-3d', handleGym);
    window.addEventListener('open-retro-room', handleRetroRoom);
    window.addEventListener('open-farito-social', handleFaritoSocial);
    window.addEventListener('open-vecinity-pay', handleVecnityPay);
    window.addEventListener('open-faro-ia', handleFaroChat);
    window.addEventListener('open-precolombino', handlePrecolombino);
    window.addEventListener('open-decision-vecinal', handleParlamento);
    
    return () => {
      window.removeEventListener('open-dron-drigo', handleOpenDron);
      window.removeEventListener('open-retro-tv', handleRetroTv);
      window.removeEventListener('open-vhs-tv', handleVhsTv);
      window.removeEventListener('open-game', handleGame);
      window.removeEventListener('open-personal-stereo', handlePersonalStereo);
      window.removeEventListener('open-time-bus', handleTimeBus);
      window.removeEventListener('open-gym-3d', handleGym);
      window.removeEventListener('open-retro-room', handleRetroRoom);
      window.removeEventListener('open-farito-social', handleFaritoSocial);
      window.removeEventListener('open-vecinity-pay', handleVecnityPay);
      window.removeEventListener('open-faro-ia', handleFaroChat);
      window.removeEventListener('open-precolombino', handlePrecolombino);
      window.removeEventListener('open-decision-vecinal', handleParlamento);
    };
  }, []);

  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }

    import('./utils/socket').then(({ socket }) => {
      socket.on('receive_push_notification', (data) => {
        const newNotif = { ...data, id: Date.now(), read: false, timestamp: new Date().toLocaleString('es-CL') };

        setNotifications(prev => {
          const updated = [newNotif, ...prev];
          localStorage.setItem('smart_notifications', JSON.stringify(updated));
          return updated;
        });

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
    });

    const handleTokensUpdate = (e) => setVlsTokens(e.detail);
    window.addEventListener('tokens-updated', handleTokensUpdate);

    return () => {
      import('./utils/socket').then(({ socket }) => {
        socket.off('receive_push_notification');
      });
      window.removeEventListener('tokens-updated', handleTokensUpdate);
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
      console.warn('Firebase / Auth object might be mocked');
      setCurrentUser({ displayName: 'Usuario Test', email: 'test@laserena.cl' });
      return;
    }
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      setCurrentUser(result.user);
      window.dispatchEvent(new CustomEvent('grant-welcome-tokens'));
    }).catch(err => {
      console.error("Error logging in:", err);
      if (err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request') {
        console.warn('Popup action cancelled by user.');
        return;
      }
      if (err.code === 'auth/unauthorized-domain') {
        alert('Tu dominio actual (vecinosmart.cl) no ha sido autorizado en la consola de Firebase. Por favor, agregalo en Firebase -> Authentication -> Settings -> Authorized domains.\n\nIngresando en Modo Vecino por ahora...');
      } else {
        alert(`Aviso: Hubo un problema de conexión o bloqueo de ventanas emergentes (Firebase). \n\nCódigo: ${err.code}\nIngresando en Modo Vecino para que puedas probar la plataforma...`);
      }
      setCurrentUser({ displayName: 'Vecino Smart', email: 'vecino@vecinosmart.cl' });
      setIsGuest(false);
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
  const handleOpenProjectInfo = () => setShowProjectInfo(true);
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
        setShowNotificationsMenu(true);
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
  const handleOpenSunoCharts = () => setShowSunoCharts(true);
  const handleOpenAppendix = () => setShowAppendix(true);
  const handleOpenFaritoBrowser = () => setShowFaritoBrowser(true);
  const handleOpenKiosko = () => setShowKiosko(true);
  const handleOpenAirport = () => setShowAirport(true);
  const handleOpenCity3D = () => setShowCity3D(true);
  const handleOpenOperacionLS = () => setShowOperacionLS(true);
  const handleOpenIdentityGate = () => setShowIdentityGate(true);
  const handleOpenMemorial = () => setShowMemorial(true);
  const handleOpenSmartAdmin = () => setShowSmartAdmin(true);
  const handleOpenPersonalStereo = () => setShowPersonalStereo(true);
  const handleOpenRetroRoom = () => setShowRetroRoom(true);
  const handleOpenFaritoSocial = () => setShowFaritoSocial(true);
  const handleNavMusica = () => navigate('/escuela-musica');
  const handleNavArtes = () => navigate('/escuela-artes');
  const handleOpenHub3D = () => setShowHub3D(true);
  const handleOpenFaro = () => {
    window.dispatchEvent(new CustomEvent('stop-all-audio'));
    setShowChat(true);
  };
  const handleToggleRadio = () => {
    if (!showRadio) window.dispatchEvent(new CustomEvent('stop-all-audio'));
    setShowRadio(prev => !prev);
  };

  useEffect(() => {
    // Detectar Deep Link de Memorial a hijos de la región
    const params = new URLSearchParams(window.location.search);
    const memorialId = params.get('m');
    const stratParam = params.get('strategy');
    const mKey = params.get('vls_master');

    // Validación de Clave Maestra vía URL para activación rápida
    if (mKey === 'admin2026' || mKey === 'admin123') {
        localStorage.setItem('master_bypass', 'true');
        console.log("VLS_SECURITY: MASTER_BYPASS_ACTIVATED_VIA_URL");
    }

    if (memorialId) {
      setShowMemorial(true);
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('select-memorial-figure', { detail: memorialId }));
      }, 1500);
    }

    if (stratParam === 'lean') {
        // Si tiene el bypass o la clave es correcta, abrimos
        if (localStorage.getItem('master_bypass') === 'true') {
            setShowLeanMaster(true);
        }
    }
  }, []);

  useEffect(() => {
    // Clima real y preciso de La Serena (Timezone Adjusted) - Actualización cada 5 min
    const fetchWeather = () => {
      fetch('https://api.open-meteo.com/v1/forecast?latitude=-29.9027&longitude=-71.2520&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m,uv_index&timezone=America%2FSantiago')
        .then(res => res.json())
        .then(data => {
          if (data?.current) {
            setWeather({
              temp: data.current.temperature_2m,
              code: data.current.weather_code,
              isDay: data.current.is_day,
              wind: data.current.wind_speed_10m,
              humidity: data.current.relative_humidity_2m,
              rain: data.current.precipitation,
              uv: data.current.uv_index
            });
          }
        })
        .catch(() => {}); // Fallback is already handled by default state
    };

    fetchWeather();
    const weatherInterval = setInterval(fetchWeather, 300000); // 5 min

    // Custom Event Listeners
    window.addEventListener('open-3d-walk', handleOpen3DWalk);
    window.addEventListener('open-time-bus', handleOpenTimeBus);
    window.addEventListener('open-distances', handleOpenDistances);
    window.addEventListener('open-project-info', () => setShowVlsVision(true));
    window.addEventListener('open-social-vision', () => setShowSocialVision(true));
    window.addEventListener('open-radio-intercom', () => setShowIntercom(true));
    window.addEventListener('open-vls-vision', () => setShowVlsVision(true));
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
    window.addEventListener('open-sunocharts', handleOpenSunoCharts);
    window.addEventListener('open-appendix', handleOpenAppendix);
    window.addEventListener('open-farito-browser', handleOpenFaritoBrowser);
    window.addEventListener('open-kiosko-diarios', handleOpenKiosko);
    window.addEventListener('open-airport', handleOpenAirport);
    window.addEventListener('open-city-3d', handleOpenCity3D);
    window.addEventListener('open-operacion-ls', handleOpenOperacionLS);
    window.addEventListener('open-identity-gate', handleOpenIdentityGate);
    window.addEventListener('open-memorial-hijos', handleOpenMemorial);
    window.addEventListener('open-smart-admin', handleOpenSmartAdmin);
    window.addEventListener('open-retro-room', handleOpenRetroRoom);
    window.addEventListener('open-personal-stereo', handleOpenPersonalStereo);
    window.addEventListener('open-escuela-musica', handleNavMusica);
    window.addEventListener('open-escuela-artes', handleNavArtes);
    window.addEventListener('open-sismic', () => setShowSismicCenter(true));
    window.addEventListener('open-theater', () => setShowSmartTheater(true));
    window.addEventListener('open-faro', handleOpenFaro);
    window.addEventListener('toggle-radio-visibility', handleToggleRadio);
    window.addEventListener('open-twitter-vls', () => setShowVerticalTV(true));
    window.addEventListener('open-facebook-vls', () => setShowVerticalTV(true));
    window.addEventListener('open-instagram-vls', () => setShowVerticalTV(true));
    window.addEventListener('open-observatory', () => setShowObservatory(true));
    window.addEventListener('open-reeltoreel', () => setShowReelToReel(true));
    window.addEventListener('open-museum', () => setShowMuseum(true));
    window.addEventListener('open-vecinojos', () => setShowVecinojos(true));
    window.addEventListener('open-vls-feed', () => setShowVLSFeed(true));
    window.addEventListener('open-broadcaster', () => setShowBroadcaster(true));
    window.addEventListener('open-production-hub', () => setShowBroadcaster(true));
    window.addEventListener('open-debono-hats', () => setShowDeBonoHats(true));
    window.addEventListener('open-tribunales', () => setShowTribunales(true));
    window.addEventListener('trigger-don-radios', () => setShowDonRadios(true));
    window.addEventListener('open-hub-3d', () => setShowHub3D(true));
    window.addEventListener('open-auditoria', () => setShowAuditoria(true));
    window.addEventListener('open-parlamento', () => setShowParlamento(true));
    window.addEventListener('open-gym-3d', () => setShowGym3D(true));
    window.addEventListener('open-farito-social', () => setShowFaritoSocial(true));
    window.addEventListener('open-faro-centinel', () => setShowFaroCentinel(true));
    window.addEventListener('open-botica', () => setShowBotica(true));
    window.addEventListener('open-veterinaria', () => setShowVeterinaria(true));
    window.addEventListener('open-super-serenito', () => setShowSuperSerenito(true));
    window.addEventListener('open-sky-guide', () => setShowSkyGuide(true));
    window.addEventListener('open-motor-tiempo', () => setShowMotorTiempo(true));
    window.addEventListener('open-radio-master', () => setShowRadioMaster(true));
    window.addEventListener('open-calendar', () => setShowCalendar(true));
    window.addEventListener('open-smart-calendar', () => setShowCalendar(true));
    window.addEventListener('open-enfermeria-smart', () => setShowEnfermeria(true));
    window.addEventListener('open-almanaque-mundial', () => setShowEmbajadas(true));
    window.addEventListener('open-smart-business', () => { window.dispatchEvent(new CustomEvent('stop-all-audio')); setShowSmartBusiness(true); });
    window.addEventListener('open-emergency-directory', () => setShowEmergencyDirectory(true));
    window.addEventListener('open-smart-events', () => setShowSmartEvents(true));
    window.addEventListener('open-vls-game', () => setShowVLSGame(true));
    window.addEventListener('open-vls-play', () => setShowVLSGame(true));

    
    window.addEventListener('open-galaxia-disco', () => setShowMemoryPortal(true));
    window.addEventListener('open-pegatinas', () => navigate('/pegatinas'));
    window.addEventListener('open-glosario', () => navigate('/glosario'));

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

    return () => {
      window.removeEventListener('open-3d-walk', handleOpen3DWalk);
      window.removeEventListener('open-time-bus', handleOpenTimeBus);
      window.removeEventListener('open-distances', handleOpenDistances);
      window.removeEventListener('open-project-info', handleOpenProjectInfo);
      window.removeEventListener('open-council', handleOpenCouncil);
      window.removeEventListener('open-cdls', handleOpenCDLS);
      window.removeEventListener('open-game', handleOpenGame);
      window.removeEventListener('open-review-portal', handleOpenReview);
      window.removeEventListener('open-music-studio', handleOpenMusicStudio);
      window.removeEventListener('open-marketplace', handleOpenMarketplace);
      window.removeEventListener('open-sentinel-mini', handleOpenSentinelMini);
      window.removeEventListener('open-sentinel-apex', handleOpenSentinelApex); // Added cleanup
      window.removeEventListener('open-embajadas', handleOpenEmbajadas);
      window.removeEventListener('open-luz-foco', handleOpenFaroIA);
      window.removeEventListener('open-ecumenical', handleOpenEcumenical);
      window.removeEventListener('open-secular', handleOpenSecular);
      window.removeEventListener('open-smart-skills', handleOpenSmartSkills);
      window.removeEventListener('open-retro-tv', handleOpenRetroTV);
      window.removeEventListener('open-vertical-tv', handleOpenVerticalTV);
      window.removeEventListener('open-vhs-tv', handleOpenVhsTV);
      window.removeEventListener('open-memory-portal', handleOpenMemoryPortal);
      window.removeEventListener('open-sunocharts', handleOpenSunoCharts);
      window.removeEventListener('open-appendix', handleOpenAppendix);
      window.removeEventListener('open-farito-browser', handleOpenFaritoBrowser);
      window.removeEventListener('open-kiosko-diarios', handleOpenKiosko);
      window.removeEventListener('open-smart-events', () => setShowSmartEvents(true));

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
      window.removeEventListener('open-galaxia-disco', () => setShowMemoryPortal(true));
      window.removeEventListener('open-pegatinas', () => navigate('/pegatinas'));
      window.removeEventListener('open-glosario', () => navigate('/glosario'));
      window.removeEventListener('open-sismic', () => setShowSismicCenter(true));
      window.removeEventListener('open-theater', () => setShowSmartTheater(true));
      window.removeEventListener('open-observatory', () => setShowObservatory(true));
      window.removeEventListener('open-reeltoreel', () => setShowReelToReel(true));
      window.removeEventListener('open-museum', () => setShowMuseum(true));
      window.removeEventListener('open-vecinojos', () => setShowVecinojos(true));
      window.removeEventListener('open-vls-feed', () => setShowVLSFeed(true));
      window.removeEventListener('open-broadcaster', () => setShowBroadcaster(true));
      window.removeEventListener('open-debono-hats', () => setShowDeBonoHats(true));
      window.removeEventListener('open-tribunales', () => setShowTribunales(true));
      window.removeEventListener('trigger-don-radios', () => setShowDonRadios(true));
      window.removeEventListener('message', handleMessage);
      if (typeof weatherInterval !== 'undefined') clearInterval(weatherInterval);
    };
  }, []);

  const isAuthorized = currentUser && ALLOWED_ADMINS.some(admin => admin.toLowerCase() === currentUser.email.toLowerCase());
  const showMasterLock = !isAuthorized && !isGuest && !isRegistered;

  if (!authInitialized) {
      return <LoadingScreen />;
  }

  // Si requiere bloqueo maestro, NO renderizamos el Dashboard para evitar el "desfase" visual
  if (showMasterLock) {
      return (
          <Suspense fallback={<LoadingScreen />}>
              <MasterLock 
                onUnlock={(user) => setCurrentUser(user)} 
                setIsGuest={setIsGuest}
                setGuestTimeLeft={setGuestTimeLeft}
                setIsRegistered={setIsRegistered}
              />
          </Suspense>
      );
  }

  return (
    <div className="app-layout animate-fade-in">
      <Suspense fallback={<div className="loading-overlay">Cargando Ecosistema VLS...</div>}>
      </Suspense>

      <MartinSecurityShield />
      <NetSpeedMonitor />
      <SerenitoSecurityGuard />
      <SecurityHoneypot />
      <SmartShare renderAsHiddenObserver={true} />
      <FloatingActionPanel />
      <ErrorCollector />

      {/* Módulo Vertical RRSS (Transversal) */}
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

      {/* VLSound — solo portales VLS, no RDMLS */}
      {!isRDMLS && (
        <VLSConsoleSound 
           onOpenRadio={() => { window.dispatchEvent(new CustomEvent('stop-all-audio')); setShowRadio(true); }} 
           onOpenTV={() => { window.dispatchEvent(new CustomEvent('stop-all-audio')); setShowRetroTV(true); }}
           onClose={() => {}}
        />
      )}


      {/* Top Header — Branding dinámico según dominio */}
      <header className="app-header glass-panel" style={{
        width: '100%',
        borderBottom: isRDMLS ? '3px solid #f59e0b' : '1px solid rgba(255,255,255,0.05)',
        background: isRDMLS ? 'rgba(80, 5, 5, 0.97)' : 'rgba(15, 23, 42, 0.95)',
        padding: '0 0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxSizing: 'border-box'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', overflow: 'hidden', flexShrink: 1 }}>
          <button onClick={() => navigate('/')} className="btn-glass" style={{ padding: '0.35rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.1)', flexShrink: 0 }} title="Inicio">
            <Home size={16} color="white" />
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
                </>
              )}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0 }}>
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

          <button
            onClick={() => setShowUserProfile(true)}
            className="user-badge glass-panel"
            style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
          >
            <UserCircle size={14} />
            {currentUser ? `${currentUser.displayName?.split(' ')[0]}` : 'Identidad VLS'}
          </button>

          {/* Billetera VLS: Visible Token Economy */}
          <button
            onClick={() => setShowVecnityPay(true)}
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
            onClick={() => {
              if (currentUser) signOut(auth);
              setIsGuest(false);
              setGuestTimeLeft(0);
              localStorage.removeItem('smart_is_guest');
              setShowUserProfile(false);
              // Opcionalmente, recargar para asegurar un estado limpio
              window.location.reload();
            }}
            className="btn-glass"
            style={{ padding: '0.4rem 0.8rem', borderRadius: '50px', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', color: 'white' }}
          >
            <CloseIcon size={18} color="#ef4444" />
            <span style={{ fontSize: '0.8rem' }}>SALIR</span>
          </button>
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
                  <div key={n.id} style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{n.timestamp}</div>
                    <strong style={{ color: 'white', display: 'block' }}>{n.title}</strong>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </header>

      <main className="page-content container" style={{ paddingBottom: '4rem' }}>
        <Outlet context={{ weather, isAuthorized, isGuest, isRegistered, lang, setLang, t }} />
        <footer style={{ marginTop: '4rem', padding: '2rem', textAlign: 'center', borderTop: '1px solid rgba(255,215,0,0.1)', color: '#94a3b8', fontSize: '0.9rem' }}>
          <p>© 2026 {isVLS ? 'VECINOSLASERENA.CL · INNOVACIÓN CIUDADANA' : 'ILUSTRE MUNICIPALIDAD DE LA SERENA · COMUNICACIONES ESTRATÉGICAS'}</p>
          <p>Contacto: <a href="mailto:contacto@vecinosmart.cl" style={{ color: '#FFD700' }}>contacto@vecinosmart.cl</a></p>
        </footer>
      </main>

      {/* Smart Toolbox Control (Caja de Herramientas) */}
      <SmartToolbox />

      {/* Chat Botón y Panel */}
      {showChat && (
        <Suspense fallback={<div/>}>
          <ChatAssistant onClose={() => setShowChat(false)} isOpenDefault={true} />
        </Suspense>
      )}

      <Suspense fallback={<div/>}>
         <SmartTV weather={weather} />
      </Suspense>

      <GlobalAnnouncer />
      <RadioPlayer globalWeather={weather} isVisible={showRadio} />
      
      {/* Smart Hub 3D (Sistema Simplificado) */}
      {showHub3D && <SmartHub3D onClose={() => setShowHub3D(false)} />}

      <PianoCompita />

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
        <Suspense fallback={<div/>}>
          <CityCouncilModal onClose={() => setShowCouncil(false)} />
        </Suspense>
      )}

      {/* Modal Club Deportes La Serena */}
      {showCDLS && (
        <Suspense fallback={<div/>}>
          <CDLSPanel onClose={() => setShowCDLS(false)} />
        </Suspense>
      )}

      {/* Modal Game (Arcade Lobby) */}
      {showGame && (
        <Suspense fallback={<div/>}>
          <RetroArcadeLobby onClose={() => setShowGame(false)} />
        </Suspense>
      )}

      {showVLSGame && (
          <VLSGameMain onClose={() => setShowVLSGame(false)} />
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
      {showSunoCharts && <SunoChartsPortal onClose={() => setShowSunoCharts(false)} />}
      {showMemoryPortal && <MemoryPortalModal onClose={() => setShowMemoryPortal(false)} />}
      {showKiosko && <KioskoDiarios onClose={() => setShowKiosko(false)} />}
      {showMemorial && <MemorialHijosRegion onClose={() => setShowMemorial(false)} />}
      {showSmartAdmin && <SmartAdministration onClose={() => setShowSmartAdmin(false)} />}
      {showPersonalStereo && <PersonalStereo onClose={() => setShowPersonalStereo(false)} />}
      {showSismicCenter && <SismicCenter onClose={() => setShowSismicCenter(false)} />}
      {showSmartTheater && <SmartTheater onClose={() => setShowSmartTheater(false)} />}
      {showObservatory && <ObservatorioSmart onClose={() => setShowObservatory(false)} />}
      {showReelToReel && <ReelToReelStudio onClose={() => setShowReelToReel(false)} />}
      {showSmartBusiness && <Suspense fallback={<div/>}><SmartBusinessMVP onClose={() => setShowSmartBusiness(false)} /></Suspense>}
      {showMuseum && <CommunicationsMuseum onClose={() => setShowMuseum(false)} />}
      {showVecinojos && <VecinojosPortal onClose={() => setShowVecinojos(false)} />}
      {showVLSFeed && <SmartVLSFeed onClose={() => setShowVLSFeed(false)} />}
      {showBroadcaster && <SmartBroadcasterStudio onClose={() => setShowBroadcaster(false)} />}
      {showDeBonoHats && <DeBonoThinkingHats onClose={() => setShowDeBonoHats(false)} />}
      {showTribunales && <TribunalesVecinales onClose={() => setShowTribunales(false)} />}
      {showDonRadios && <DonRadios onComplete={() => setShowDonRadios(false)} />}
      {showRetroRoom && <RetroGamerRoom onClose={() => setShowRetroRoom(false)} />}
      {showCalendar && <SmartCalendar onClose={() => setShowCalendar(false)} />}
      {showLeanMaster && <LeanStartupMaster onClose={() => setShowLeanMaster(false)} />}
      {showAuditoria && <Suspense fallback={<div/>}><AuditoriaVecinal onClose={() => setShowAuditoria(false)} /></Suspense>}
      {showParlamento && <Suspense fallback={<div/>}><ParlamentoVecinal onClose={() => setShowParlamento(false)} /></Suspense>}
      {showGym3D && <Suspense fallback={<div/>}><Gimnasio3D onClose={() => setShowGym3D(false)} /></Suspense>}
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
                <p style={{ color: '#94a3b8' }}>Este módulo es exclusivo para Administradores VLS.<br/>Favor contactar a vecinosmart@gmail.com</p>
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
                <p style={{ color: '#94a3b8' }}>Para usar el Switcher profesional debe ser un creador autorizado.</p>
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
      
      {/* Radio Backoffice Access is also strategically locked */}
      {/* The event is usually handled inside components, but if it was here we would lock it too */}
      
      {/* Background Music Player (Always Active if stream/file set) */}
      {showUserProfile && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100000, background: 'rgba(15, 23, 42, 0.98)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
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
              <button onClick={() => { signOut(auth).then(() => { setIsGuest(false); setGuestTimeLeft(0); localStorage.removeItem('smart_is_guest'); window.location.reload(); }); }} className="btn" style={{ width: '100%', padding: '1rem', background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid #ef4444', borderRadius: '12px', fontWeight: 'bold', marginTop: '0.5rem' }}>
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
                      setGuestTimeLeft(0);
                      localStorage.removeItem('smart_is_guest');
                      window.location.reload();
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

      {/* Global Secure Login Overlay */}
      {!currentUser && !isGuest && !isRegistered && authInitialized && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100000, background: '#020617', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center', overflow: 'hidden' }}>
          
          <div className="animate-float" style={{ marginBottom: '2rem', position: 'relative' }}>
            <img 
              src="/serenito_security_guard_close_up_1773392164475.png" 
              alt="Serenito AI" 
              style={{ height: '220px', filter: 'drop-shadow(0 0 20px rgba(56, 189, 248, 0.4))' }} 
            />
            <div className="glass-panel" style={{ position: 'absolute', top: '-20px', right: '-120px', padding: '1rem', borderRadius: '12px', border: '1px solid #38bdf8', fontSize: '0.8rem', color: 'white', maxWidth: '200px', textAlign: 'left', animation: 'slide-up 0.5s ease-out' }}>
              <Sparkles size={14} color="#38bdf8" style={{ marginBottom: '5px' }} />
              ¡Hola! Soy Serenito. Recuerda usar nuestras <b>APIs Integradas</b> (SEREMIX + Sentinel) para una experiencia total.
            </div>
          </div>

          <div className="glass-panel animate-slide-up" style={{ maxWidth: '450px', width: '100%', padding: '3rem 2rem', textAlign: 'center', borderRadius: '24px', border: '1px solid rgba(56, 189, 248, 0.5)', background: 'linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,58,138,0.95))', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', zIndex: 2 }}>
            <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: '#38bdf8', color: '#0f172a', padding: '4px 12px', borderRadius: '20px', fontSize: '0.6rem', fontWeight: '900', letterSpacing: '2px' }}>ACCESO_RESTRINGIDO</div>
            
            <img src="/vls-logo-premium.png" alt="La Serena Smart City" style={{ height: '80px', margin: '0 auto', filter: 'drop-shadow(0 0 15px rgba(56, 189, 248, 0.5))' }} />

            <AppLoginOverlay
              handleLogin={handleLogin}
              setIsGuest={setIsGuest}
              setGuestTimeLeft={setGuestTimeLeft}
              navigate={navigate}
            />
          </div>

          <style>{`
            .animate-float { animation: float-anim 6s ease-in-out infinite; }
            @keyframes float-anim { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
            @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          `}</style>
        </div>
      )}
      
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
      {showPropuestaElDia && (
        <Suspense fallback={null}>
          <div style={{ position: 'fixed', inset: 0, zIndex: 1000000 }}>
            <PropuestaEstrategica onClose={() => setShowPropuestaElDia(false)} />
          </div>
        </Suspense>
      )}
      {showFaroCentinel && (
        <Suspense fallback={null}><FaroCentinel onClose={() => setShowFaroCentinel(false)} /></Suspense>
      )}
      {showBotica && (
        <Suspense fallback={null}><BoticaVecinal onClose={() => setShowBotica(false)} /></Suspense>
      )}
      {showVeterinaria && (
        <Suspense fallback={null}><RedVeterinariaVLS onClose={() => setShowVeterinaria(false)} /></Suspense>
      )}
      {showSuperSerenito && (
        <Suspense fallback={null}><SuperSerenitoBros onClose={() => setShowSuperSerenito(false)} /></Suspense>
      )}
      {showSkyGuide && (
        <Suspense fallback={null}><SkyGuideRA onClose={() => setShowSkyGuide(false)} /></Suspense>
      )}
      {showCalendar && (
        <Suspense fallback={null}>
          <SmartCalendar onClose={() => setShowCalendar(false)} />
        </Suspense>
      )}
      <TokenEconomyMaster />
      {showVecnityPay && <VecnityPay onClose={() => setShowVecnityPay(false)} currentUser={currentUser} />}
      {showPrecolombino && (
        <Suspense fallback={null}><PrecolombinoPortal onClose={() => setShowPrecolombino(false)} /></Suspense>
      )}
      {showParlamento && (
        <Suspense fallback={null}><ParlamentoVecinal onClose={() => setShowParlamento(false)} /></Suspense>
      )}
      <SmartShare isFloating={true} />
      <VLSQuantumWatch onCalendarClick={() => setShowCalendar(true)} />
    </div>
  );
}

function AppLoginOverlay({ handleLogin, setIsGuest, setGuestTimeLeft, navigate }) {
  const [loginMode, setLoginMode] = useState(null);

  if (loginMode === 'external') {
    return (
      <div className="scale-in">
        <h2 style={{ color: 'white', margin: '0 0 1rem 0', fontSize: '1.6rem' }}>Portal del Ciudadano</h2>
        <p style={{ color: '#bae6fd', marginBottom: '2rem', lineHeight: '1.6', fontSize: '1rem' }}>
          Identifíquese para asegurar la trazabilidad y la seguridad de nuestra red vecinal.
        </p>

        <button
          onClick={handleLogin}
          className="btn pulse"
          style={{ width: '100%', background: 'linear-gradient(90deg, #ff0055, #38bdf8)', color: 'white', border: 'none', padding: '1.2rem', borderRadius: '12px', fontSize: '1.15rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', cursor: 'pointer', marginBottom: '1.5rem', boxShadow: '0 10px 20px rgba(255, 0, 85, 0.3)' }}
        >
          <Fingerprint size={24} color="white" />
          Ingresar con VLS Passport
        </button>

        <button
          onClick={() => { 
            setIsGuest(true);
            setGuestTimeLeft(3600); // 1 hour for trial sessions
          }}
          className="btn-glass hover-lift"
          style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#38bdf8', border: '1px solid #38bdf8', padding: '1rem', borderRadius: '12px', cursor: 'pointer', fontSize: '1rem', width: '100%', fontWeight: 'bold' }}
        >
          <strong>Acceso de Prueba (Modo Vecino)</strong><br />
          <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>Ingreso sin contraseña</span>
        </button>

        <div style={{ marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
          <p style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '0.5rem' }}>ENTRADA_PARA_OPERADORES_NIVEL_ALPHA</p>
          <button
            onClick={() => {
                const pass = prompt("INTRODUZCA LLAVE MAESTRA NEURAL:");
                if (pass === 'master_bypass_2026') {
                    localStorage.setItem('master_bypass', 'true');
                    alert("ACCESO_CONCEDIDO: Identidad Digital Confirmada.");
                    window.location.reload();
                } else {
                    alert("ACCESO_DENEGADO: Protocolo Sentinel Activado.");
                    window.dispatchEvent(new CustomEvent('trigger-serenito-security'));
                }
            }}
            style={{ background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', border: '1px solid #38bdf8', padding: '0.8rem', borderRadius: '12px', cursor: 'pointer', fontSize: '0.85rem', width: '100%', fontWeight: 'bold' }}
          >
            Validar Credencial VLS_OS
          </button>
        </div>

        <button onClick={() => setLoginMode(null)} className="btn-glass" style={{ marginTop: '1.5rem', fontSize: '0.85rem' }}>← Volver</button>
      </div>
    );
  }

  if (loginMode === 'internal') {
    return (
      <div className="scale-in">
        <h2 style={{ color: '#10b981', margin: '0 0 0.5rem 0', fontSize: '1.6rem' }}>Directorio Institucional</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Seleccione su plataforma de destino operativo.</p>

        <div style={{ display: 'grid', gap: '0.75rem', textAlign: 'left' }}>
          <button onClick={() => navigate('/desk')} className="btn btn-glass" style={{ justifyContent: 'flex-start', padding: '1rem', borderLeft: '4px solid #ef4444' }}>
            🚨 C5 - Seguridad y Monitoreo Backoffice
          </button>
          <button onClick={() => navigate('/puerta-serena')} className="btn btn-glass" style={{ justifyContent: 'flex-start', padding: '1rem', borderLeft: '4px solid #8b5cf6' }}>
            🏢 Puerta Serena (SGAAC)
          </button>
          <button onClick={() => navigate('/hub-comunicaciones')} className="btn btn-glass" style={{ justifyContent: 'flex-start', padding: '1rem', borderLeft: '4px solid #06b6d4' }}>
            📡 Hub Estratégico de Comunicaciones
          </button>
          <button onClick={() => navigate('/honorarios')} className="btn btn-glass" style={{ justifyContent: 'flex-start', padding: '1rem', borderLeft: '4px solid #eab308' }}>
            📝 RRHH - Gestión Honorarios E-Sign
          </button>
          <button onClick={() => navigate('/protocolo')} className="btn btn-glass" style={{ justifyContent: 'flex-start', padding: '1rem', borderLeft: '4px solid #f472b6' }}>
            🎙️ Protocolo, RRPP y Producción
          </button>
          <button onClick={() => { setLoginMode(null); setShowPropuestaElDia(true); }} className="btn btn-glass" style={{ justifyContent: 'flex-start', padding: '1rem', borderLeft: '4px solid #ef4444' }}>
            🗞️ Alianza Estratégica Diario El Día
          </button>
          <button onClick={() => { setLoginMode(null); setShowLinkedInManager(true); }} className="btn btn-glass" style={{ justifyContent: 'flex-start', padding: '1rem', borderLeft: '4px solid #0077b5' }}>
            💼 LinkedIn Manager (B2B Outreach)
          </button>
        </div>

        <button onClick={() => setLoginMode(null)} className="btn-glass" style={{ marginTop: '1.5rem', width: '100%', padding: '0.75rem', borderRadius: '12px' }}>← Volver</button>
      </div>
    );
  }

  return (
    <div className="scale-in">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img src="/vls-logo-3d.png" alt="VLS 3D Logo" style={{ width: '120px', height: '120px', filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))' }} className="animate-float" />
      </div>
      <h2 style={{ color: 'white', margin: '0 0 1rem 0', fontSize: '1.6rem' }}>Sistema de Autenticación</h2>
      
      {!window.location.hostname.includes('vecinosmart.cl') && (
        <div style={{ padding: '0.8rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '8px', color: '#fca5a5', fontSize: '0.85rem', marginBottom: '1.5rem', textAlign: 'left', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
          <ShieldAlert size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
          <span><strong>INNOVACIÓN ESTRATÉGICA:</strong> Esta plataforma integra el ecosistema digital avanzado de La Serena. Desarrollo por <strong>Vecino Smart</strong> para la modernización de la gestión regional y ciudadana.</span>
        </div>
      )}

      <p style={{ color: '#bae6fd', marginBottom: '2rem', lineHeight: '1.5', fontSize: '0.95rem' }}>
        Plataforma unificada Ilustre Municipalidad de La Serena. Seleccione su perfil de usuario:
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button
          onClick={() => setLoginMode('external')}
          className="btn"
          style={{ width: '100%', background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', color: 'white', padding: '1.25rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1rem', border: 'none', boxShadow: '0 10px 20px rgba(59, 130, 246, 0.3)' }}
        >
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.75rem', borderRadius: '50%' }}>
            <UserCircle size={32} color="white" />
          </div>
          <div style={{ textAlign: 'left' }}>
            <strong style={{ display: 'block', fontSize: '1.1rem', marginBottom: '0.1rem' }}>Portal Externo (Ciudadanía)</strong>
            <span style={{ fontSize: '0.85rem', color: '#bae6fd' }}>Vecinos, Turistas, Visitas y Clientes</span>
          </div>
        </button>

        <button
          onClick={() => setLoginMode('internal')}
          className="btn"
          style={{ width: '100%', background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)', color: 'white', padding: '1.25rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1rem', border: 'none', boxShadow: '0 10px 20px rgba(16, 185, 129, 0.3)' }}
        >
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.75rem', borderRadius: '50%' }}>
            <ShieldAlert size={32} color="white" />
          </div>
          <div style={{ textAlign: 'left' }}>
            <strong style={{ display: 'block', fontSize: '1.1rem', marginBottom: '0.1rem' }}>Portal Interno Institucional</strong>
            <span style={{ fontSize: '0.85rem', color: '#a7f3d0' }}>Funcionarios, Directivos, RRHH y C5</span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default App;
