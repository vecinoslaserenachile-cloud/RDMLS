import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { useOutletContext, useNavigate, Navigate } from 'react-router-dom';

// Listas de reproducción diferenciadas por pilares
const PLAYLIST_INSTITUTIONAL = [
    { url: 'https://cdn.jsdelivr.net/gh/vecinoslaserenachile-cloud/juego-serenito@main/Serenito_kiosco_suplementero.mp4', title: 'Serenito Kiosco Suplementero' },
    { url: 'https://cdn.jsdelivr.net/gh/vecinoslaserenachile-cloud/juego-serenito@main/Serenito_playa_con_gato_Juanin.mp4', title: 'Serenito en la Playa con Juanín' },
    { url: 'https://cdn.jsdelivr.net/gh/vecinoslaserenachile-cloud/juego-serenito@main/Serenito_paseo_nocturno_Avenida_Francisco_de_Aguirre.mp4', title: 'Noche en La Serena' },
    { url: 'https://cdn.jsdelivr.net/gh/vecinoslaserenachile-cloud/juego-serenito@main/Serenito_paseo_Museo_Gabriel_Gonzalez_Videla.mp4', title: 'Museo Gabriel González Videla' },
    { url: 'https://cdn.jsdelivr.net/gh/vecinoslaserenachile-cloud/juego-serenito@main/Serenito_paseo_Avenida_Francisco_de_Aguirre.mp4', title: 'Avenida Francisco de Aguirre' },
    { url: 'https://cdn.jsdelivr.net/gh/vecinoslaserenachile-cloud/juego-serenito@main/Serenito_Polideportivo_Las_Compañias.mp4', title: 'Polideportivo Las Compañias' },
    { url: 'https://cdn.jsdelivr.net/gh/vecinoslaserenachile-cloud/juego-serenito@main/Serenito_paseo_Avenida_del_Mar_La_Serena.mp4', title: 'Avenida del Mar' },
    { id: 'b9LTH4muxR8', title: 'FARO LA SERENA LIVE' }
];

const PLAYLIST_LUDIC = [
    { url: '/alcaldesa_corrida/Foto corrida avenida del mar la serena 110426.jpeg', title: 'Marea Humana: 4.000 Personas en la Av. del Mar', isPoster: true },
    { url: '/serenito_security_guard_close_up_1773392164475.png', title: 'PROMO: Seguridad Ciudadana VLS', isPoster: true },
    { url: '/portada_vls_trivia.jpg', title: 'PROMO: VLSabes - ¡Juega & Gana!', isPoster: true },
    { url: '/kiosko_3d_la_serena.png', title: 'PROMO: Kiosko Inteligente VLS', isPoster: true }
];
import {
    Search, Mic, CloudSun, Radio, Sliders, Volume2,
    VolumeX, ChevronUp, ChevronDown, Activity,
    Newspaper, Info, Music, Zap, Move, Tv, Monitor, Lock, Clock, Calendar,
    MessageSquare, SkipForward, SkipBack, Layers, Settings, Maximize, Minimize, ExternalLink, Globe, Wifi, Shield, TrendingUp, TrendingDown, History as HistoryIcon, Star, Play, Pause,
    Heart, Users, Briefcase, Landmark, BookOpen, Book, Map, Phone, AlertCircle, ShoppingCart, Award, Sparkles, CheckCircle2,
    ArrowRight, Building2, UserCheck, Pill, Bell, CircuitBoard, Cpu, BarChart3
} from 'lucide-react';
import {
    ShieldCheck, Eye, Home as HomeIcon, Ruler, Camera, Dumbbell, Box, PenTool, User as UserIcon, LogOut, ChevronRight, ChevronLeft, X, Pin, MapPin, Database, Share2,
    Stethoscope, AlertTriangle, Image as ImageIcon, GraduationCap, Gavel, Brain, SmilePlus, Vote, Rocket, ListChecks, PartyPopper, ShoppingBag, Leaf, Droplets,
    Joystick, Palette, Watch, Tablet, Smartphone, ShieldAlert, Building, FileSignature, LayoutGrid, Scale, Languages, Radar, Fuel, Church, Skull, Waves, Construction, Hammer, Gem, HardHat, Bot, Trophy
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { useTranslation } from '../context/LanguageContext';
import GoreDashboard from './GoreDashboard';
import MarketplaceVecinal from '../components/MarketplaceVecinal';
import BitacoraC5 from '../components/BitacoraC5';
import PolideportivoVecinal from '../components/PolideportivoVecinal';
// import SportsDataStrip from '../components/SportsDataStrip';
import VecnityPay from '../components/VecnityPay';
import TuercaVecinos from '../components/TuercaVecinos';
import VeciCat from '../components/VeciCat';
import AlcaldesHistory from '../pages/AlcaldesHistory';
import UniversalSerenito from '../components/UniversalSerenito';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import EstudioVLS from '../components/EstudioVLS';
import AzuraCastSync from '../components/AzuraCastSync';
import VLSRequestPortal from '../components/VLSRequestPortal';
import PremiumClub from '../components/PremiumClub';
import GalaxiaDiscoteque from '../components/GalaxiaDiscoteque';
import RadioHomeWidget from '../components/RadioHomeWidget';
import RDMLSRadioDial from '../components/RDMLSRadioDial';
import VLSConsoleSound from '../components/VLSConsoleSound';
import PrecolombinoPortal from '../components/PrecolombinoPortal';
import AmbientModeVLS from '../components/AmbientModeVLS';
import CentralDifusionVLS from '../components/CentralDifusionVLS';
import ParlamentoVecinal from '../components/Parlamento/ParlamentoVecinal';
import SmartShare from '../components/SmartShare';
import NavieraMonitor from '../components/NavieraMonitor';
import MusicRanking from '../components/MusicRanking';
import LiveVenuesMonitor from '../components/LiveVenuesMonitor';
import LiveIncidentsMap from '../components/LiveIncidentsMap';
import SocialVision from '../components/SocialVision';
import VLSGuide from '../components/VLSGuide';
import VecinosAnalyticsApp from '../components/VecinosAnalyticsApp/VecinosAnalyticsApp';
import VLSMotorsSpot from '../components/VLSMotorsSpot';
import HechoEnChile from '../components/HechoEnChile';
import LaFloridaAirport from '../components/LaFloridaAirport';
import BackofficeMovilVLS from '../components/BackofficeMovilVLS';
import TiendaPoleras3D from '../components/TiendaPoleras3D';
import AjedrezPatrimonialVLS from '../components/AjedrezPatrimonialVLS';

import OrientacionLegal from '../components/OrientacionLegal';
import SerenaMetAdmin from '../components/SerenaMetAdmin';
import VLSpeakTranslator from '../components/VLSpeakTranslator';
import SafeRouteAI from '../components/SafeRouteAI';
import SmartAdminPortal from '../components/SmartAdminPortal';
import SeguridadVecinal from './SeguridadVecinal';
import VLSNewsIan from '../components/VLSNewsIan';
const VLSNewsInvestigacion = lazy(() => import('../components/VLSNewsInvestigacion'));
const VLSNewsSemanaSanta = lazy(() => import('../components/VLSNewsSemanaSanta'));
const VLSNewsBencinazo = lazy(() => import('../components/VLSNewsBencinazo'));
const VLSNewsSentinel = lazy(() => import('../components/VLSNewsSentinel'));
const VLSNewsPoduje = lazy(() => import('../components/VLSNewsPoduje'));
const VLSNewsAguasValle = lazy(() => import('../components/VLSNewsAguasValle'));
// const VLSNewsArtemis = lazy(() => import('../components/VLSNewsArtemis'));
// const VLSNewsChequia = lazy(() => import('../components/VLSNewsChequia'));
// const VLSNewsIglesiasPiedra = lazy(() => import('../components/VLSNewsIglesiasPiedra'));
// const VLSNewsAvalancha = lazy(() => import('../components/VLSNewsAvalancha'));
const VLSNotesGallery = lazy(() => import('../components/VLSNotesGallery'));
// const SerenitoVLS = lazy(() => import('../components/SerenitoVLS'));
import VLSRoadmap from '../components/VLSRoadmap';
import VLSManifesto from '../components/VLSManifesto';
import VLSTriviaMain from '../components/vls_trivia/VLSTriviaMain';
import SmartFloatingTV from '../components/SmartFloatingTV';
import ParliamentaryObservatory from '../components/ParliamentaryObservatory';
import SEO from '../components/SEO';
// import FeaturedBook from '../components/FeaturedBook';
import LoadingScreen from '../components/LoadingScreen';
const MemorialHijosRegion = lazy(() => import('../components/MemorialHijosRegion'));
const DistancesMap = lazy(() => import('../components/DistancesMap'));
import QuickEmergencyBar from '../components/QuickEmergencyBar';
import VLSCommunityDirectory from '../components/EmergencyDirectory';
// import NewsDataStrip from '../components/NewsDataStrip';
// import { useMasterEditor, MasterEditorToggle, MasterEditorBanner, EditorWrapper } from '../components/MasterEditorOverlay';
import WorldNewsTablets from '../components/WorldNewsTablets';
// import LocalNewsGrid from '../components/LocalNewsGrid';

export default function HubDashboard() {
    // 1. Context & Routing
    const navigate = useNavigate();
    const { weather, isAuthorized, isGuest, isRegistered, currentUser, handleLogin, handleLogout } = useOutletContext() || {};

    // ── MASTER EDITOR MODE (solo vecinoslaserenachile@gmail.com) ─────────────
    // const { isMaster, editorActive, toggleEditor, hiddenModules, hideModule, restoreAll, isHidden } = useMasterEditor(currentUser);
    const isMaster = false;
    const editorActive = false;
    const toggleEditor = () => {};
    const hiddenModules = [];
    const hideModule = () => {};
    const restoreAll = () => {};
    const isHidden = () => false;
    const { lang, setLang, t: translate } = useTranslation();

    // 2. Environmental Constants & Storage
    const host = (window.location.host || window.location.hostname).toLowerCase();
    const isRDMLS = host.includes('rdmls') || (host.includes('laserena.cl') && !host.includes('vecinos'));
    const isVLS = !isRDMLS;
    const curTenant = localStorage.getItem('smart_tenant') || 'laserena';
    const tenant = localStorage.getItem('smart_tenant');
    const customConfig = JSON.parse(localStorage.getItem('smart_custom_config') || '{}');

    // 3. Core States
    const [currentTime, setCurrentTime] = useState(new Date());
    const [brandOrg, setBrandOrg] = useState(() => {
        return tenant === 'custom' && customConfig.orgName ? customConfig.orgName : 'La Serena';
    });
    const [brandLogo, setBrandLogo] = useState(() => {
        return tenant === 'custom' ? (customConfig.logoUrl || '/escudo.png') : '/escudo.png';
    });
    const [showPremiumClub, setShowPremiumClub] = useState(false);
    const [greetingIdx, setGreetingIdx] = useState(0);
    const [vlsTokens, setVlsTokens] = useState(() => parseInt(localStorage.getItem('vls_tokens') || '0'));
    const [currentFlashIndex, setCurrentFlashIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [viewMode, setViewMode] = useState('full');
    const [pinnedApps, setPinnedApps] = useState(() => {
        try {
            const saved = localStorage.getItem('vls_pinned_apps');
            if (!saved) return [];
            const parsed = JSON.parse(saved);
            return Array.isArray(parsed) ? parsed.filter(id => id && typeof id === 'string') : [];
        } catch (e) {
            console.warn("VLS_HUB_C5: Corrupted Pinned Apps data. Resetting...", e);
            localStorage.removeItem('vls_pinned_apps');
            return [];
        }
    });


    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [deviceType, setDeviceType] = useState('Escritorio');
    const [DeviceIcon, setDeviceIcon] = useState(() => Monitor);
    const [vlsStats, setVlsStats] = useState({ liveUsers: 14228, totalServed: 2453.44, growth: '+284%' });
    
    // ── GESTIÓN DE HANDLERS GLOBALES (Component Scope) ──
    const closeAllPopups = () => {
        setShowPoll(false); setShowGalaxia(false); setShowRoadmap(false); setShowManifesto(false);
        setShowPrecolombino(false); setShowAmbientMode(false); setShowCentralDifusion(false);
        setShowVirtualAssistant(false); setShowVLSMotors(false); setShowOrientacionLegal(false);
        setShowSerenaMetAdmin(false); setShowVLSpeak(false); setShowSafeRoute(false);
        setShowSocialVision(false); setShowAnalyticsApp(false); setShowSmartAdminPortal(false);
        setShowInvestigacion(false); setShowSemanaSanta(false); setShowBencinazo(false);
        setShowSentinelNote(false); setShowAirportMonitor(false); setShowPortMonitor(false);
        setShowParliamentary(false); setShowAlcaldes(false); setShowMemorialHijos(false);
        setShowTuerca(false); setShowVeciCat(false); setShowTiendaPoleras(false); setShowVecnityPay(false);
        setShowDirectory(false); setShowVLSNewsIan(false); setShowVialNews(false); setShowSeguridadVecinal(false);
        setShowRequestPortal(false); setShowBackofficeMovil(false); setShowAjedrez(false);
        setShowEstudio(false); setShowVLSNewsArtemis(false); setShowChequia(false); setShowIglesias(false);
        setShowVLSNewsTimeChange(false);
        setShowArquiartista(false);
        setReportInitialCategory(null);
    };

    const handleAkichip = () => { console.log("Firing Akichip Portal..."); closeAllPopups(); navigate('/akichip'); };
    const handleDecision = () => { closeAllPopups(); setShowPoll(true); };
    const handleGalaxia = () => { closeAllPopups(); setShowGalaxia(true); };
    const handleRoadmap = () => { closeAllPopups(); setShowRoadmap(true); };
    const handleManifesto = () => { closeAllPopups(); setShowManifesto(true); };
    const handlePrecolombino = () => { closeAllPopups(); setShowPrecolombino(true); };
    const handleAmbient = () => { closeAllPopups(); setShowAmbientMode(true); };
    const handleDifusion = () => { closeAllPopups(); setShowCentralDifusion(true); };
    const handleFaroIA = () => { closeAllPopups(); setShowVirtualAssistant(true); };
    const handleArtemis = () => { 
        closeAllPopups(); 
        navigate('/artemisa'); 
        window.dispatchEvent(new CustomEvent('open-vls-artemis', { detail: { routed: true } })); 
    };
    const handleUcen = () => { 
        closeAllPopups(); 
        navigate('/ucen'); 
        window.dispatchEvent(new CustomEvent('open-vls-ucen', { detail: { routed: true } })); 
    };
    const handleMotors = () => { closeAllPopups(); setShowVLSMotors(true); };
    const handleLegal = () => { closeAllPopups(); setShowOrientacionLegal(true); };
    const handleMetAdmin = () => { closeAllPopups(); setShowSerenaMetAdmin(true); };
    const handleVLSpeak = () => { closeAllPopups(); setShowVLSpeak(true); setActiveTutorial('vlspeak'); };
    const handleSafeRoute = () => { closeAllPopups(); setShowSafeRoute(true); setActiveTutorial('safe-route'); };
    const handleSocialVision = () => { closeAllPopups(); setShowSocialVision(true); setActiveTutorial('radar'); };
    const handleAnalytics = () => { closeAllPopups(); setShowAnalyticsApp(true); };
    const handleSmartAdmin = () => { closeAllPopups(); setShowSmartAdminPortal(true); };
    const handleInvestigacion = () => { closeAllPopups(); setShowInvestigacion(true); };
    const handleSemanaSanta = () => { closeAllPopups(); setShowSemanaSanta(true); };
    const handleBencinazo = () => { closeAllPopups(); setShowBencinazo(true); };
    const handleSentinelNote = () => { closeAllPopups(); setShowSentinelNote(true); };
    const handleAirport = () => { closeAllPopups(); setShowAirportMonitor(true); };
    const handlePort = () => { closeAllPopups(); setShowPortMonitor(true); };
    const handleParliamentary = () => { closeAllPopups(); setShowParliamentary(true); };
    const handleAlcaldes = () => { closeAllPopups(); navigate('/alcaldes'); };
    const handleHubDirectory = () => { closeAllPopups(); setShowDirectory(true); };
    const handleSmartReport = (e) => { 
        closeAllPopups(); 
        setReportInitialCategory(e?.detail?.category || null);
        setShowRequestPortal(true); 
    };
    const handleEstudio = () => { closeAllPopups(); setShowEstudio(true); };
    const handleAndacollo = () => { closeAllPopups(); navigate('/andacollo'); };
    const handleVallenar = () => { closeAllPopups(); navigate('/vallenar'); };
    const handleMemorial = () => { closeAllPopups(); setShowMemorialHijos(true); };
    const handleTuerca = () => { closeAllPopups(); setShowTuerca(true); };
    const handleVeciCat = () => { closeAllPopups(); setShowVeciCat(true); };
    const handleTienda = () => { closeAllPopups(); setShowTiendaPoleras(true); };
    const handleVecnityPay = (e) => {
        closeAllPopups();
        if (e && e.detail) setInitialOrder(e.detail);
        else setInitialOrder(null);
        setShowVecnityPay(true);
    };
    const handleRequestPortal = () => { closeAllPopups(); setShowRequestPortal(true); };
    const handleBackofficeMovil = () => { closeAllPopups(); setShowBackofficeMovil(true); };
    const handleAjedrez = () => { closeAllPopups(); setShowAjedrez(true); };
    const handleIan = () => { closeAllPopups(); setShowVLSNewsIan(true); };
    const handleSeguridad = () => { closeAllPopups(); setShowSeguridadVecinal(true); };
    const handleJuanSoldado = () => { 
        closeAllPopups();
        navigate('/juansoldado');
    };
    const handleChequia = () => { closeAllPopups(); setShowChequia(true); };
    const handleIglesias = () => { closeAllPopups(); setShowIglesias(true); };
    const handleAvalancha = () => { closeAllPopups(); setShowNewsAvalancha(true); };
    const handleHorario = () => { closeAllPopups(); setShowVLSNewsTimeChange(true); };
    const handleArquiartista = () => { closeAllPopups(); setShowArquiartista(true); };
    
    const handleShareNews = (news) => {
        if (!news) return;
        const baseUrl = window.location.origin;
        let path = '/';
        // Deep linking mapping
        if (news.eventId === 'open-vls-alcaldesa') path = '/alcaldesa';
        else if (news.eventId === 'open-vls-horario') path = '/horario';
        else if (news.eventId === 'open-vls-ucen') path = '/ucen';
        else if (news.eventId === 'open-vls-artemis') path = '/artemis';
        
        const slug = news.id || news.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const shareUrl = `${baseUrl}${path}${path === '/' ? '?news=' : '?news='}${slug}`;

        if (navigator.share) {
            navigator.share({ title: news.title, url: shareUrl }).catch(() => {});
        } else {
            navigator.clipboard.writeText(shareUrl);
            alert('¡Enlace de noticia copiado al portapapeles!');
        }
    };

    // UI State Toggles
    const [showOmnibox, setShowOmnibox] = useState(false);
    const [showPoll, setShowPoll] = useState(false);
    const [showMusicRanking, setShowMusicRanking] = useState(false);
    const [showDistancias, setShowDistancias] = useState(false);
    const [showRoadmap, setShowRoadmap] = useState(false);
    const [showManifesto, setShowManifesto] = useState(false);
    const [showPrecolombino, setShowPrecolombino] = useState(false);
    const [showGalaxia, setShowGalaxia] = useState(false);
    const [showAmbientMode, setShowAmbientMode] = useState(false);
    const [showCentralDifusion, setShowCentralDifusion] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);
    const [isCaptchaSolved, setIsCaptchaSolved] = useState(false);
    const [showSmartAdminPortal, setShowSmartAdminPortal] = useState(false);
    const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
    const [showAirportMonitor, setShowAirportMonitor] = useState(false);
    const [showPortMonitor, setShowPortMonitor] = useState(false);
    const [showMemorialHijos, setShowMemorialHijos] = useState(false);
    const [showTuerca, setShowTuerca] = useState(false);
    const [showVeciCat, setShowVeciCat] = useState(false);
    const [showDirectory, setShowDirectory] = useState(false);
    const [showTiendaPoleras, setShowTiendaPoleras] = useState(false);
    const [showAlcaldes, setShowAlcaldes] = useState(false);
    const [showEstudio, setShowEstudio] = useState(false);
    const [reportInitialCategory, setReportInitialCategory] = useState(null);
    const [showVLSMotors, setShowVLSMotors] = useState(false);
    const [showOrientacionLegal, setShowOrientacionLegal] = useState(false);
    const [showSerenaMetAdmin, setShowSerenaMetAdmin] = useState(false);
    const [showVLSpeak, setShowVLSpeak] = useState(false);
    const [showSafeRoute, setShowSafeRoute] = useState(false);
    const [showSocialVision, setShowSocialVision] = useState(false);
    const [showInvestigacion, setShowInvestigacion] = useState(false);
    const [showSemanaSanta, setShowSemanaSanta] = useState(false);
    const [showBencinazo, setShowBencinazo] = useState(false);
    const [showSentinelNote, setShowSentinelNote] = useState(false);
    const [showPoduje, setShowPoduje] = useState(false);
    const [showVLSNewsIan, setShowVLSNewsIan] = useState(false);
    const [showVialNews, setShowVialNews] = useState(false);
    const [showVLSNewsTimeChange, setShowVLSNewsTimeChange] = useState(false);
    const [showArquiartista, setShowArquiartista] = useState(false);
    const [showVLSNewsArtemis, setShowVLSNewsArtemis] = useState(location.pathname.toLowerCase().includes('/artemis') || location.pathname.toLowerCase().includes('/artemisa'));
    const [showVLSNewsUcen, setShowVLSNewsUcen] = useState(location.pathname.toLowerCase().includes('/ucen'));
    const [showAguasValle, setShowAguasValle] = useState(false);
    const [showSeguridadVecinal, setShowSeguridadVecinal] = useState(false);
    const [showChequia, setShowChequia] = useState(false);
    const [showIglesias, setShowIglesias] = useState(false);
    const [showNewsAvalancha, setShowNewsAvalancha] = useState(false);
    const [showJuanSoldado, setShowJuanSoldado] = useState(false);
    const [showParliamentary, setShowParliamentary] = useState(false);
    const [showRequestPortal, setShowRequestPortal] = useState(false);
    const [activeTutorial, setActiveTutorial] = useState(null);
    const [selectedNews, setSelectedNews] = useState(null);
    const [showVecnityPay, setShowVecnityPay] = useState(false);
    const [initialOrder, setInitialOrder] = useState(null);
    const [showBackofficeMovil, setShowBackofficeMovil] = useState(false);
    const [showAjedrez, setShowAjedrez] = useState(false);
    const [showAnalyticsApp, setShowAnalyticsApp] = useState(false);
    const [showFloatingTV, setShowFloatingTV] = useState(true);
    const [floatingTVItem, setFloatingTVItem] = useState(PLAYLIST_INSTITUTIONAL[0]);
    const [isVideoPlaying, setIsVideoPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [videoSelected, setVideoSelected] = useState(false);
    const [currentPlaylist, setCurrentPlaylist] = useState('institutional');
    const [previewIndex, setPreviewIndex] = useState(0);
    const [officialNews, setOfficialNews] = useState([]);

    // 4. Dictionary & Internal Logic Objects
    const dict = {
        es: {
            title: isRDMLS ? "Hub de Gestión Institucional - Portal RDMLS.cl" : "Hub de Comunicaciones y Ciudadanía Smart - Portal Unificado VLS",
            citizensTitle: "Vecino Smart", 
            citizensSub: isRDMLS ? "Atención Ciudadana y Monitoreo Urbano" : "Atención Ciudadana y Radio Digital",
            adminTitle: isRDMLS ? "Administración Smart" : "Vecino Aprende (Escuelas y Oficios)", 
            adminSub: isRDMLS ? "Gestión Interna, RRHH y Portal de Inducción E-learning" : "Formación Ciudadana, E-learning e Iniciativas de Empleo",
            newsAlert: isRDMLS 
                ? "INFORMATIVO MUNICIPAL: La Ilustre Municipalidad de La Serena informa despliegue de equipos en terreno para mantención urbana. Siga la señal de RDMLS.cl para más detalles."
                : "VECINOS LA SERENA Informa: Se detecta patrullaje preventivo en cuadrantes urbanos y turísticos. Seguridad comunitaria activa para vecinos, visitantes y comerciantes.",
            eventsTitle: "Eventos Vecinales", 
            eventsSub: isRDMLS ? "Gestión Automatizada y Monitor de Precedencias" : "Monitor de Precedencia y Protocolo",
            listeningTitle: "Escucha Vecinal", 
            listeningSub: isRDMLS ? "Inteligencia Artificial y Social Listening" : "Centinel Faro y Red de Escucha Social",
            paseo3dTitle: isRDMLS ? "Paseo Patrimonial 3D" : "Paseo Histórico 3D", 
            paseo3dSub: "Arquitectura Tradicional y Museos",
            busdeltiempoTitle: "El Bus del Tiempo", busdeltiempoSub: "Viajes de 1948 a la Smart City",
            gameTitle: "Play Center VLS", gameSub: "Explora y Juega con Serenito",
            qrText: "Acceso Móvil",
            distancesTitle: "Cuadro de Distancias VLS", distancesSub: "Trayectos sobre Mapa Región de Coquimbo",
            projectTitle: "Gestión de Proyectos", projectSub: "Avance Obra y Planificación Territorio",
            councilTitle: isRDMLS ? "Consejo Municipal" : "Transparencia Comunal", councilSub: "Actas, Acuerdos y Transmisiones en Vivo",
            cdlsTitle: "Club Deportes La Serena", cdlsSub: "Socio VLS - Seguimiento e Historia Granate",
            musicTitle: "Tornamesa Digital", musicSub: "Selección de Música Tradicional y Regional",
            retroTitle: "Retro TV Master", retroSub: "Canales Clásicos y Archivo Histórico",
            vhsTitle: "Cineteca VHS", vhsSub: "Videos de la Región y Documentales",
            memoryTitle: "Portal de la Memoria", memorySub: "Sube Recuerdos y Fotos del Pasado",
            sentinelTitle: isRDMLS ? "Centinel Faro (IA)" : "Centinel Faro IA",
            sentinelSub: isRDMLS ? "Monitoreo Avanzado y Análisis de Datos" : "Monitoreo Avanzado de Redes y Seguridad",
            welcomePortales: isRDMLS 
                ? "Bienvenido al Portal Institucional RDMLS.cl de la I. Municipalidad de La Serena."
                : "Bienvenido al portal unificado de Vecinos La Serena para vecinos, visitantes, turistas, anunciantes y compraventas.",
            heroDescription: isRDMLS
                ? 'Plataforma oficial de inducción, gestión y capacitación continua para trabajadores de la Ilustre Municipalidad a honorarios y contrata.'
                : 'La red inteligente para vecinos, visitantes, turistas, anunciantes y compraventas. Conecta, aporta, monitorea y mantente seguro junto al resto de tu comunidad en La Serena.',
            saludTitle: "Smart Salud",
            memorialTitle: "Altares de la Región"
        },
        en: {
            title: "Smart Communications & Citizenship Hub - VLS Unified Portal",
            heroDescription: isRDMLS
                ? 'Official induction and management platform for workers of the Municipality of La Serena.'
                : 'The smart network for neighbors, visitors, tourists, advertisers and trade. Connect, contribute, monitor and stay safe with the rest of your community in La Serena.',
            welcomePortales: isRDMLS 
                ? "Welcome to the RDMLS.cl Institutional Portal of the Municipality of La Serena."
                : "Welcome to the unified portal of Vecinos La Serena for neighbors, visitors, tourists, advertisers and trade.",
            citizensTitle: "Smart Citizens", citizensSub: "Access Registry, Citizen Reports, Urban Monitoring & Digital Radio",
            adminTitle: "Smart Administration", adminSub: "Internal Management, E-learning & Reports with Digital Signature",
            eventsTitle: "Smart Events", eventsSub: "Precedence Monitor and Automated Protocol",
            listeningTitle: "Smart Listening", listeningSub: "Sentinel Faro & AI Social Listening Network",
            paseo3dTitle: "3D Historic Walk", paseo3dSub: "Traditional Architecture & Museums",
            busdeltiempoTitle: "The Time Bus", busdeltiempoSub: "Travel from 1948 to the Smart City",
            gameTitle: "3D Gamer Portal", gameSub: "Create your Serenito and Explore",
            qrText: "Mobile Access",
            distancesTitle: "VLS Distance Chart", distancesSub: "Routes on Coquimbo Region Map",
            projectTitle: "Project Management", projectSub: "Work Progress and Territory Planning",
            councilTitle: "City Council", councilSub: "Minutes, Agreements and Live Streams",
            cdlsTitle: "Club Deportes La Serena", cdlsSub: "VLS Member - Tracking and Garnet History",
            musicTitle: "Digital Turntable", musicSub: "Traditional and Regional Music Selection",
            retroTitle: "Retro TV Master", retroSub: "Classic Channels and Historical Archive",
            vhsTitle: "VHS Film Library", vhsSub: "Regional Videos and Documentaries",
            memoryTitle: "Memory Portal", memorySub: "Upload Memories and Photos from the Past",
            sentinelTitle: "Sentinel Faro AI", sentinelSub: "Advanced Social Media Monitoring",
            saludTitle: "Smart Health",
            memorialTitle: "Regional Memorials"
        },
        zh: {
            title: "智慧通讯与公民中心 - VLS 统一门户",
            citizensTitle: "智慧公民 (Smart Citizens)", citizensSub: "报告、地图和数字广播",
            adminTitle: "智慧行政 (Smart Administration)", adminSub: "内部管理、电子学习和报告",
            eventsTitle: "智慧活动 (Smart Events)", eventsSub: "优先顺序监控和协议",
            listeningTitle: "智慧听众 (Smart Listening)", listeningSub: "哨兵灯塔和社交监听网络 (Centinel Faro)",
            paseo3dTitle: "3D 历史走廊", paseo3dSub: "传统建筑和博物馆",
            busdeltiempoTitle: "时光巴士", busdeltiempoSub: "从 1948 年到智慧城市的旅行",
            gameTitle: "3D 游戏门户", gameSub: "创建您的小谢尔 (Serenito) 并探索",
            qrText: "移动端访问",
            distancesTitle: "VLS 距离表", distancesSub: "科金博大区地图上的路线",
            projectTitle: "项目管理", projectSub: "工作进度和领土规划",
            councilTitle: "市议会", councilSub: "会议纪要、协议和直播",
            cdlsTitle: "塞雷纳体育俱乐部", cdlsSub: "VLS 会员 - 追踪和俱乐部历史",
            musicTitle: "数字唱机", musicSub: "传统和地方音乐选择",
            retroTitle: "复古电视大师", retroSub: "经典频道和历史档案",
            vhsTitle: "VHS 电影库", vhsSub: "地区视频和纪录片",
            memoryTitle: "记忆门户", memorySub: "上传过去的会议和照片",
            sentinelTitle: "哨兵灯塔 AI", sentinelSub: "先进的社交媒体监控",
            saludTitle: "智慧健康 (Smart Health)",
            memorialTitle: "地区纪念馆 (Regional Memorials)",
            welcomePortales: "欢迎来到 La Serena 邻居统一门户。探索以下所有公民工具。"
        },
        arn: {
            title: "Hub de Comunicaciones y Ciudadanía Smart - Portal Unificado VLS",
            saludTitle: "Smart Salud", memorialTitle: "Altares de la Región",
            welcomePortales: "Küme akun portal unificado Vecinos La Serena mu. Inatunge kom pu küzaw ciudadanas fan."
        },
        ht: {
            title: "Hub de Comunicaciones y Ciudadanía Smart - Portal Unificado VLS",
            saludTitle: "Smart Salud", memorialTitle: "Altares de la Región",
            welcomePortales: "Byenveni nan pòtal inifye Vwazen La Serena. Eksplore tout zouti sitwayen yo anba a."
        },
        it: {
            title: "Hub di Comunicazione e Cittadinanza Smart - Portale Unificado VLS",
            saludTitle: "Salute Smart", memorialTitle: "Memoriali Regionali",
            welcomePortales: "Benvenuti nel portale unificato di Vecinos La Serena. Esplora tutti gli strumenti cittadini qui sotto."
        },
        fr: {
            title: "Smart Communications & Citizenship Hub - Portail Unifié VLS",
            saludTitle: "Santé Smart", memorialTitle: "Mémoriaux Régionaux",
            welcomePortales: "Bienvenue sur le portail unifié de Vecinos La Serena. Explorez tous les outils citoyens ci-dessous."
        },
        pt: {
            title: "Hub de Comunicações e Cidadania Smart - Portal Unificado VLS",
            saludTitle: "Saúde Smart", memorialTitle: "Memoriais Regionais",
            welcomePortales: "Bem-vindo ao portal unificado de Vecinos La Serena. Explore todas as herramientas cidadãs abaixo."
        }
    };





    const greetingsVLS = [
        { text: "¡HOLA, VECINO!", sub: "SOY SERENITO, TU GUÍA SMART CITY", color: "#ef4444", bg: "linear-gradient(135deg, #ef4444 0%, #1e3a8a 100%)", flag: "🇨🇱" },
        { text: "HELLO, NEIGHBOR!", sub: "I'M SERENITO, YOUR SMART CITY GUIDE", color: "#3b82f6", bg: "linear-gradient(135deg, #00247d 0%, #cf142b 100%)", flag: "🇬🇧🇺🇸" },
        { text: "OLÁ, VIZINHO!", sub: "SOU SERENITO, SEU GUIA SMART CITY", color: "#22c55e", bg: "linear-gradient(135deg, #009c3b 0%, #ffdf00 100%)", flag: "🇧🇷" },
        { text: "SALUT, VOISIN!", sub: "JE SUIS SERENITO, VOTRE GUIDE SMART CITY", color: "#ffffff", bg: "linear-gradient(135deg, #002395 0%, #ed2939 100%)", flag: "🇫🇷" },
        { text: "CIAO, VICINO!", sub: "SONO SERENITO, LA TUA GUIDA SMART CITY", color: "#10b981", bg: "linear-gradient(135deg, #009246 0%, #ce2b37 100%)", flag: "🇮🇹" },
        { text: "你好, 邻居!", sub: "我是小谢尔, 您的智慧城市指南 (SERENITO)", color: "#FFDE00", bg: "linear-gradient(135deg, #DE2910 0%, #FFDE00 100%)", flag: "🇨🇳" }
    ];

    const greetingsRDMLS = [
        { text: "PORTAL RDMLS.cl", sub: "I. MUNICIPALIDAD DE LA SERENA", color: "#f59e0b", bg: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)", flag: "🏛️" },
        { text: "SERVICIOS SMART", sub: "GESTIÓN PÚBLICA MODERNA", color: "#38bdf8", bg: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)", flag: "⚙️" },
        { text: "IDENTIDAD LOCAL", sub: "LA SERENA SIEMPRE LÍDER", color: "#ef4444", bg: "linear-gradient(135deg, #7f1d1d 0%, #b91c1c 100%)", flag: "🇨🇱" }
    ];

    const greetings = isRDMLS ? greetingsRDMLS : greetingsVLS;

    const newsFlashes = [
        {
            es: "COMUNA INTELIGENTE Informa: La Máxima Autoridad Comunal ha liderado una ronda de seguridad estratégica en terreno. Acción real por la tranquilidad de nuestros vecinos.",
            en: "SMART CITY News: The Highest Municipal Authority has led a strategic security round in the field. Real action for our neighbors' peace of mind.",
            it: "CITTÀ INTELLIGENTE Informa: La Massima Autorità Comunale ha guidato un giro di sicurezza strategica sul campo. Azione reale per la tranquillità dei nostri vicini.",
            fr: "COMMUNE INTELLIGENTE Informe : La Haute Autorité Comunale a mené une ronde de sécurité stratégique sur le terrain. Action réelle pour la tranquillité de nos voisins.",
            zh: "智慧社区通知：最高市政当局已在实地领导了战略安保工作。为了邻居们的安宁采取真正的行动。",
            pt: "NOTÍCIAS CIDADE INTELIGENTE: A Autoridade Municipal liderou uma ronda de segurança estratégica no terreno. Ação real pela tranquilidade dos nossos vizinhos."
        },
        {
            es: "RED REGIONAL UNIFICADA: Se ha activado el nuevo cerebro digital de elite. Soberanía avanzada y monitoreo inteligente ya disponible.",
            en: "UNIFIED REGIONAL NETWORK: The new elite digital brain has been activated. Advanced sovereignty and smart monitoring now available.",
        },
        {
            es: isRDMLS 
                ? "Gestión Institucional: Se consolida la Soberanía Comunicacional Digital en el Portal Principal RDMLS.cl."
                : "Reporte de Gestión: Se consolida la Soberanía Comunicacional bajo la visión de vecinoslaserena.cl. Hacia un ecosistema digital de élite.",
            en: "Management Report: Communicational Sovereignty is consolidated under the municipal vision. Towards an elite digital ecosystem.",
            it: "Rapporto di Gestione: La Sovranità Comunicativa si consolida sotto la visione istituzionale. Verso un ecosistema digitale d'élite.",
            fr: "Rapport de Gestion : La Souveraineté Communicationnelle est consolidée selon la vision institutionnelle. Vers un écosystème numérique d'élite.",
            zh: "管理报告：通信主权在一匿名邻居的愿景下得到巩固。迈向精英级数字生态系统。",
            pt: "Relatório de Gestão: A Soberania Comunicacional consolida-se sob a visão de um vizinho anônimo. Rumo a um ecossistema digital de elite."
        }
    ];


    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentFlashIndex(prev => (prev + 1) % newsFlashes.length);
        }, 30000);
        return () => clearInterval(timer);
    }, [newsFlashes.length]);

    useEffect(() => {
        const langToIdx = { es: 0, en: 1, pt: 2, fr: 3, it: 4, zh: 5 };
        if (langToIdx[lang] !== undefined) {
            setGreetingIdx(langToIdx[lang]);
        }
    }, [lang]);

    // Auto-rotate greeting every 4 seconds
    useEffect(() => {
        const timerGreeting = setInterval(() => setGreetingIdx(prev => (prev + 1) % greetings.length), 4000);
        return () => clearInterval(timerGreeting);
    }, [greetings.length]);

    
    useEffect(() => {
        const handleTokensUpdate = (e) => setVlsTokens(e.detail);
        window.addEventListener('tokens-updated', handleTokensUpdate);
        return () => window.removeEventListener('tokens-updated', handleTokensUpdate);
    }, []);



    const TVLS_VIDEOS = currentPlaylist === 'institutional' ? PLAYLIST_INSTITUTIONAL : PLAYLIST_LUDIC;

    const iframeRefActive = useRef(null);
    const customPlayerRef = useRef(null);

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const togglePlay = () => {
        setIsVideoPlaying(!isVideoPlaying);
    };

    const nextVideo = () => {
        setPreviewIndex((prev) => (prev + 1) % TVLS_VIDEOS.length);
    };

    const toggleFullscreen = () => {
        if (!isFullscreen) {
            if (customPlayerRef.current?.requestFullscreen) {
                customPlayerRef.current.requestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
        setIsFullscreen(!isFullscreen);
    };

    useEffect(() => {
        const onFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', onFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
    }, []);

    useEffect(() => {
        if (videoSelected) return;
        const interval = setInterval(() => {
            setPreviewIndex(prev => (prev + 1) % TVLS_VIDEOS.length);
        }, 8000); // 8 segundos por clip/cartel para dinamismo
        return () => clearInterval(interval);
    }, [videoSelected, currentPlaylist, TVLS_VIDEOS.length]);


    useEffect(() => {
        const handleStorage = () => { };
        handleStorage();
        window.addEventListener('storage', handleStorage);

        window.addEventListener('open-akichip', handleAkichip);
        window.addEventListener('open-decision-vecinal', handleDecision);
        window.addEventListener('open-galaxia-disco', handleGalaxia);
        window.addEventListener('open-vls-roadmap', handleRoadmap);
        window.addEventListener('open-vls-manifesto', handleManifesto);
        window.addEventListener('open-precolombino', handlePrecolombino);
        window.addEventListener('open-ambient-mode', handleAmbient);
        window.addEventListener('open-central-difusion', handleDifusion);
        window.addEventListener('open-faro-ia', handleFaroIA);
        window.addEventListener('open-hub-directory', handleHubDirectory);
        window.addEventListener('open-vls-artemis', (e) => { 
            if (e.detail?.routed) return;
            closeAllPopups(); 
            navigate('/artemisa'); 
        });
        window.addEventListener('open-vls-ucen', (e) => { 
            if (e.detail?.routed) return;
            closeAllPopups(); 
            navigate('/ucen'); 
        });
        window.addEventListener('open-vls-juansoldado', handleJuanSoldado);
        window.addEventListener('open-vls-andacollo', handleAndacollo);
        window.addEventListener('open-vls-vallenar', handleVallenar);
        window.addEventListener('open-vls-domeyko', (e) => handleDomeyko(e.detail?.tab));
        window.addEventListener('open-vls-chequia', handleChequia);
        window.addEventListener('open-vls-avalancha', handleAvalancha);
        window.addEventListener('open-vls-motors', handleMotors);
        window.addEventListener('open-orientacion-legal', handleLegal);
        window.addEventListener('open-serenamet-admin', handleMetAdmin);
        window.addEventListener('open-vlspeak', handleVLSpeak);
        window.addEventListener('open-safe-route', handleSafeRoute);
        window.addEventListener('open-social-vision', handleSocialVision);
        window.addEventListener('open-analytics', handleAnalytics);
        window.addEventListener('open-plaza-vecinal', handleAnalytics);
        window.addEventListener('open-smart-admin', handleSmartAdmin);
        window.addEventListener('open-vls-acciona', () => {
            closeAllPopups();
            window.dispatchEvent(new CustomEvent('open-vls-acciona')); // App.jsx will handle the modal
        });
        window.addEventListener('open-distances', () => {
            closeAllPopups();
            setShowDistancias(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        window.addEventListener('open-vls-investigacion', handleInvestigacion);
        window.addEventListener('open-vls-semanasanta', handleSemanaSanta);
        window.addEventListener('open-vls-bencinazo', handleBencinazo);
        window.addEventListener('open-vls-sentinel', handleSentinelNote);
        window.addEventListener('open-vls-aguasvalle', () => { closeAllPopups(); setShowAguasValle(true); });
        window.addEventListener('open-airport-monitor', handleAirport);
        window.addEventListener('open-port-monitor', handlePort);
        window.addEventListener('open-parlamento-regional', handleParliamentary);
        window.addEventListener('open-alcaldes-history', handleAlcaldes);
        window.addEventListener('open-smart-report', handleSmartReport);
        window.addEventListener('open-estudio-vls', handleEstudio);
        window.addEventListener('open-memorial-hijos', handleMemorial);
        window.addEventListener('open-tuerca-vecinos', handleTuerca);
        window.addEventListener('open-vecicat', handleVeciCat);
        window.addEventListener('open-tienda-poleras', handleTienda);
        window.addEventListener('open-vecinity-pay', handleVecnityPay);
        window.addEventListener('open-smart-business', handleRequestPortal);
        window.addEventListener('open-backoffice-movil', handleBackofficeMovil);

        window.addEventListener('open-vls-ian', handleIan);
        window.addEventListener('open-vls-seguridad', handleSeguridad);
        window.addEventListener('open-vls-iglesias', handleIglesias);
        window.addEventListener('open-ajedrez-patrimonial', handleAjedrez);
        window.addEventListener('open-vls-horario', handleHorario);
        window.addEventListener('open-vls-stella', () => { closeAllPopups(); navigate('/stella'); });
        window.addEventListener('open-arquiartista', handleArquiartista);


        const urlParams = new URLSearchParams(window.location.search);
        const newsParam = urlParams.get('news');

        if (newsParam) {
            switch(newsParam) {
                case 'investigacion': handleInvestigacion(); break;
                case 'semanasanta': handleSemanaSanta(); break;
                case 'bencinazo': handleBencinazo(); break;
                case 'sentinel': handleSentinelNote(); break;
                case 'aguasvalle': setShowAguasValle(true); break;
                case 'poduje': setShowPoduje(true); break;
                case 'ian': handleIan(); break;
                case 'artemis': handleArtemis(); break;
                case 'seguridad': handleSeguridad(); break;
                case 'iglesias': handleIglesias(); break;
                case 'merced': handleIglesias(); break;
                case 'juansoldado': handleJuanSoldado(); break;
                case 'andacollo': handleAndacollo(); break;
                case 'vallenar': handleVallenar(); break;
                case 'avalancha': handleAvalancha(); break;
                case 'horario': handleHorario(); break;
                default: break;
            }
        }

        const pageParam = urlParams.get('page');
        if (pageParam === 'seguridad') handleSeguridad();
        if (pageParam === 'chequia') handleChequia();
        if (pageParam === 'ian') handleIan();
        if (pageParam === 'artemis') handleArtemis();
        if (pageParam === 'iglesias' || pageParam === 'merced') handleIglesias();
        if (pageParam === 'horario' || pageParam === 'cambio-de-hora') handleHorario();

        return () => {
            window.removeEventListener('storage', handleStorage);
            window.removeEventListener('open-decision-vecinal', handleDecision);
            window.removeEventListener('open-galaxia-disco', handleGalaxia);
            window.removeEventListener('open-vls-roadmap', handleRoadmap);
            window.removeEventListener('open-vls-manifesto', handleManifesto);
            window.removeEventListener('open-precolombino', handlePrecolombino);
            window.removeEventListener('open-ambient-mode', handleAmbient);
            window.removeEventListener('open-central-difusion', handleDifusion);
            window.removeEventListener('open-faro-ia', handleFaroIA);
            window.removeEventListener('open-hub-directory', handleHubDirectory);
            window.removeEventListener('open-vls-artemis', handleArtemis);
            window.removeEventListener('open-vls-juansoldado', handleJuanSoldado);
            window.removeEventListener('open-vls-andacollo', handleAndacollo);
            window.removeEventListener('open-vls-vallenar', handleVallenar);
            window.removeEventListener('open-vls-chequia', handleChequia);
            window.removeEventListener('open-vls-motors', handleMotors);
            window.removeEventListener('open-orientacion-legal', handleLegal);
            window.removeEventListener('open-serenamet-admin', handleMetAdmin);
            window.removeEventListener('open-vlspeak', handleVLSpeak);
            window.removeEventListener('open-safe-route', handleSafeRoute);
            window.removeEventListener('open-social-vision', handleSocialVision);
            window.removeEventListener('open-analytics', handleAnalytics);
            window.removeEventListener('open-smart-admin', handleSmartAdmin);
            window.removeEventListener('open-vls-acciona', () => {});
            window.removeEventListener('open-vls-investigacion', handleInvestigacion);
            window.removeEventListener('open-vls-semanasanta', handleSemanaSanta);
            window.removeEventListener('open-vls-bencinazo', handleBencinazo);
            window.removeEventListener('open-vls-sentinel', handleSentinelNote);
            window.removeEventListener('open-airport-monitor', handleAirport);
            window.removeEventListener('open-port-monitor', handlePort);
            window.removeEventListener('open-parlamento-regional', handleParliamentary);
            window.removeEventListener('open-alcaldes-history', handleAlcaldes);
            window.removeEventListener('open-smart-report', handleSmartReport);
            window.removeEventListener('open-estudio-vls', handleEstudio);
            window.removeEventListener('open-memorial-hijos', handleMemorial);
            window.removeEventListener('open-tuerca-vecinos', handleTuerca);
            window.removeEventListener('open-vecicat', handleVeciCat);
            window.removeEventListener('open-tienda-poleras', handleTienda);
            window.removeEventListener('open-vecinity-pay', handleVecnityPay);
            window.removeEventListener('open-smart-business', handleRequestPortal);
            window.removeEventListener('open-backoffice-movil', handleBackofficeMovil);
            window.removeEventListener('open-ajedrez-patrimonial', handleAjedrez);
            window.removeEventListener('open-vls-ian', handleIan);
            window.removeEventListener('open-vls-seguridad', handleSeguridad);
            window.removeEventListener('open-vls-avalancha', handleAvalancha);
            window.removeEventListener('open-vls-stella', () => {});
            window.removeEventListener('open-arquiartista', handleArquiartista);
        };
    }, []);

    useEffect(() => {
        const handleNews = () => {
            const stored = localStorage.getItem('laserena_official_news');
            let newsList = [];
            const defaultNews = [
                { title: "OPORTUNIDAD: Capacitaciones Acciona para Mujeres", date: "Hoy", category: "EMPLEO", desc: "Curso gratuito de terminaciones en construcción para las vecinas de La Serena.", iconStr: "UserCheck", color: "#f87171", eventId: "open-vls-acciona", image: "/acciona/afiche_real.png" },
                { title: "INVESTIGACIÓN: Stella Díaz Varín «La Colorina»", date: "Hoy", category: "LITERATURA", desc: "Explora la vida y obra de la poeta más indómita de La Serena en su nuevo archivo digital.", iconStr: "BookOpen", color: "#ef4444", eventId: "open-vls-stella", image: "/stella/stella_bg.png" },
                { title: "INVESTIGACIÓN: Misión Artemis II", date: "03 de Abril, 2025", category: "NASA / VLS", desc: "Visualización 3D del Orion Spacecraft y la nueva frontera de la humanidad.", iconStr: "Zap", color: "#3b82f6", eventId: "open-vls-artemis", image: "/artemis_teaser.png" },
                { title: "INVESTIGACIÓN: El Futuro de los Negocios (UCEN)", date: "Hoy", category: "ACADEMIA", desc: "42° Congreso ASFAE: El impacto de la IA y la descentralización en Chile.", iconStr: "GraduationCap", color: "#00F0FF", eventId: "open-vls-ucen" },
                { title: "RESTAURACIÓN: Monumento Francisco de Aguirre", date: "Hoy", category: "PATRIMONIO", desc: "La alcaldesa Daniela Norambuena impulsa la recuperación del símbolo histórico de la ciudad.", iconStr: "Landmark", color: "#38bdf8", eventId: "open-vls-alcaldesa", image: "/alcaldesa_notas/aguirre_real.png" },
                { title: "GESTIÓN: Recursos en Santiago (DIPRES)", date: "Hoy", category: "GESTIÓN", desc: "La alcaldesa Daniela Norambuena destraba proyectos clave en Hacienda y Salud.", iconStr: "Building2", color: "#38bdf8", eventId: "open-vls-alcaldesa", image: "/alcaldesa_notas/dipres_real.png" },
            ];

            if (stored) {
                try {
                    let parsed = JSON.parse(stored);
                    newsList = parsed.filter(n => n.state === 'Publicado');
                } catch (e) { }
            } else {
                newsList = defaultNews;
            }
            
            // Priorizar Acciona, Monumento Aguirre y Marea Humana
            newsList.sort((a, b) => {
                if (a.title.includes('Acciona')) return -1;
                if (b.title.includes('Acciona')) return 1;
                if (a.title.includes('Francisco de Aguirre')) return -1;
                if (b.title.includes('Francisco de Aguirre')) return 1;
                if (a.title.includes('Marea Humana')) return -1;
                if (b.title.includes('Marea Humana')) return 1;
                return 0;
            });
            
            setOfficialNews(newsList.slice(0, 3));
        };
        handleNews();
        window.addEventListener('storage', handleNews);
        return () => window.removeEventListener('storage', handleNews);
    }, []);

    const getIconComponent = (iconStr) => {
        const iMap = {
            'Users': Users, 'Globe': Globe, 'ShieldAlert': ShieldAlert,
            'Activity': Heart, 'Building': Building, 'Stethoscope': Stethoscope,
            'Newspaper': BookOpen, 'Church': Church
        };
        const Res = iMap[iconStr] || BookOpen;
        // Blindaje para React 19: nos aseguramos de devolver algo que React pueda renderizar
        return Res;
    };


    useEffect(() => {
        const interval = setInterval(() => {
            setVlsStats(prev => ({
                ...prev,
                liveUsers: prev.liveUsers + Math.floor(Math.random() * 5) - 1,
                totalServed: parseFloat((prev.totalServed + Math.random() * 0.05).toFixed(2))
            }));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const sInt = setInterval(() => {
            setVlsStats(prev => {
                const addUsers = Math.floor(Math.random() * 5);
                const addData = (Math.random() * 0.5);
                return {
                    ...prev,
                    liveUsers: prev.liveUsers + addUsers,
                    totalServed: parseFloat((prev.totalServed + addData).toFixed(2))
                };
            });
        }, 1500);
        return () => clearInterval(sInt);
    }, []);


    const togglePin = (id) => {
        setPinnedApps(prev => {
            const next = prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id].slice(0, 5);
            localStorage.setItem('vls_pinned_apps', JSON.stringify(next));
            return next;
        });
    };

    useEffect(() => {
        const detectDevice = () => {
            const ua = navigator.userAgent.toLowerCase();
            const width = window.innerWidth;
            const height = window.innerHeight;
            const isPortrait = height > width;

            if (ua.includes('tv') || ua.includes('smarttv') || width >= 2560) {
                setDeviceType('Smart TV');
                setDeviceIcon(() => Tv);
            } else if (ua.includes('watch') || width <= 320) {
                setDeviceType('Smartwatch');
                setDeviceIcon(() => Watch);
            } else if (width <= 768 || (isPortrait && width <= 900)) {
                setDeviceType('Móvil');
                setDeviceIcon(() => Smartphone);
                document.body.classList.add('mobile-vertical-active');
            } else if (width > 768 && width <= 1024) {
                setDeviceType('Tablet');
                setDeviceIcon(() => Tablet);
                document.body.classList.remove('mobile-vertical-active');
            } else if (width > 1024) {
                setDeviceType('Escritorio');
                setDeviceIcon(() => Monitor);
                document.body.classList.remove('mobile-vertical-active');
            }
        };

        detectDevice();
        window.addEventListener('resize', detectDevice);
        window.addEventListener('orientationchange', detectDevice);
        return () => {
            window.removeEventListener('resize', detectDevice);
            window.removeEventListener('orientationchange', detectDevice);
        };
    }, []);

    useEffect(() => {
        const tenant = localStorage.getItem('smart_tenant');
        if (tenant === 'custom') {
            const org = localStorage.getItem('smart_brand_org') || 'La Serena';
            const color = localStorage.getItem('smart_brand_color');
            const logo = localStorage.getItem('smart_brand_logo') || '/escudo.png';

            setBrandOrg(org);
            setBrandLogo(logo);
            if (color) {
                document.documentElement.style.setProperty('--brand-primary', color);
                document.documentElement.style.setProperty('--brand-secondary', color);
            }
        }
    }, []);

    const rawDict = dict[lang] || dict['es'];
    const tHub = {
        ...rawDict,
        glosario: rawDict.glosario || translate('glosarioTitle'),
        smartFeed: rawDict.smartFeed || 'SMART FEED',
        city3d: rawDict.city3d || 'CIUDAD 3D',
        title: (rawDict.title || '').replace('La Serena', brandOrg),
        sentinelSub: (rawDict.sentinelSub || '').replace('La Serena', brandOrg),
        eventsTitle: (rawDict.eventsTitle || '').replace('La Serena', brandOrg),
        eventsSub: (rawDict.eventsSub || '').replace('La Serena', brandOrg),
        cdlsTitle: (rawDict.cdlsTitle || '').replace('La Serena', brandOrg),
        busdeltiempoTitle: (rawDict.busdeltiempoTitle || '').replace('La Serena', brandOrg)
    };

    const formatoFecha = currentTime.toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'short' });
    const formatoHora = currentTime.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit', second: '2-digit' });




    const HUB_OPEN_ACCESS_IDS = [
        'vhs-tv', 'retro-tv', 'cine', 'debono', 'donradios',
        'escuela-musica', 'escuela-artes', 'tribunales',
        'ecumenico', 'laico', 'farito-browser', 'glosario-vls',
        'stickers-portal', 'difundir-app', 'legacy-vls', 'red-social',
        'vls-investigacion-2025', 'memorias-unicornio', 'vls-juansoldado', 'vls-andacollo', 'vls-vallenar', 'vls-domeyko'
    ];

    const isRestrictedModule = (id) => {
        if (isAuthorized || isGuest) return false;
        if (isRegistered && !HUB_OPEN_ACCESS_IDS.includes(id)) return true;
        return false;
    };

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);

        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            clearInterval(timer);
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const servicios = [
        {
            id: 'vls-1demayo', title: '1 DE MAYO: DÍA DEL TRABAJADOR', subtitle: 'Portal Histórico · Hitos, Poesía y Memoria Obrera',
            icon: Calendar, color: '#d97706', path: '/1demayo', active: true, badge: 'HOY', category: 'citizens'
        },
        {
            id: 'vls-acciona', title: 'ACCIONA: CAPACITACIÓN MUJERES', subtitle: 'Curso Terminaciones · Nuevo Hospital La Serena · Inscripción Online',
            icon: HardHat, color: '#ff0000', isEvent: 'open-vls-acciona', active: true, badge: 'EMPLEO', category: 'citizens'
        },
        {
            id: 'vls-domeyko', title: 'IGNACIO DOMEYKO: SABIO DE CHILE', subtitle: 'Portal 3D · Mineralogía · Cronología · Juego Expedición',
            icon: Gem, color: '#a78bfa', isEvent: 'open-domeyko-portal', active: true, badge: 'PATRIMONIO', category: 'citizens'
        },
        {
            id: 'failover-lite-access', title: 'CLON DE RESPALDO (Lite Portal)', subtitle: 'Soberanía de Acceso: Versión liviana para datos bajos',
            icon: ShieldCheck, color: '#10b981', isEvent: 'open-lite-portal', active: true, badge: 'FAILOVER', category: 'citizens'
        },
        {
            id: 'vls-migra', title: 'MIGRA: SEGUNDA FUNDACIÓN', subtitle: 'Investigación: El futuro de la gestión y la migración',
            icon: MapPin, color: '#ef4444', isEvent: 'open-vls-migra', active: isRDMLS, badge: 'VLS INVESTIGA', category: 'citizens'
        },
        {
            id: 'vls-juansoldado', title: 'JUAN SOLDADO: LA MEMORIA', subtitle: 'Investigación: Orígenes, bruma y justicia popular',
            icon: Newspaper, color: '#f59e0b', isEvent: 'open-vls-juansoldado', active: true, badge: 'VLS INVESTIGA', category: 'citizens'
        },
        {
            id: 'vls-andacollo', title: 'ANDACOLLO: CIUDAD MONTAÑA', subtitle: 'Investigación: Oro, Fe y Tradición Minera',
            icon: Church, color: '#10b981', isEvent: 'open-vls-andacollo', active: true, badge: 'VLS INVESTIGA', category: 'citizens'
        },
        {
            id: 'vls-vallenar', title: 'VALLENAR: EL DESIERTO FLORIDO', subtitle: 'Investigación: Embalse Santa Juana y El Valle del Huasco',
            icon: Waves, color: '#a78bfa', isEvent: 'open-vls-vallenar', active: true, badge: 'VLS INVESTIGA', category: 'citizens'
        },
        {
            id: 'vls-ian', title: 'EL PUNTO CIEGO: Caso Ian', subtitle: 'Reportaje: La trampa de los 100 y el abismo del retail',
            icon: ShieldAlert, color: '#ef4444', isEvent: 'open-vls-ian', active: true, badge: 'VLS INVESTIGA'
        },
        {
            id: 'vls-artemis', title: 'Misión Artemis II', subtitle: 'Simulador 3D Orion Spacecraft (NASA High-Fidelity)',
            icon: Zap, color: '#312e81', isEvent: 'open-vls-artemis', active: true, badge: 'SPACE TECH'
        },
        {
            id: 'vls-chequia', title: 'Chequia: El Corazón de Europa', subtitle: 'Cooperación Internacional y Tecnología de Agua',
            icon: Globe, color: '#3b82f6', isEvent: 'open-vls-chequia', active: true, badge: 'INTELIGENCIA'
        },
        {
            id: 'vls-ucen', title: 'UCEN: Congreso ASFAE 42', subtitle: 'Investigación: IA, Negocios y Descentralización 2025',
            icon: GraduationCap, color: '#00F0FF', isEvent: 'open-vls-ucen', active: true, badge: 'ACADEMIA'
        },
        {
            id: 'vls-seguridad', title: 'PORTAL SEGURIDAD VECINAL', subtitle: 'Consejos, Contactos de Emergencia y Red de Protección',
            icon: ShieldCheck, color: '#10b981', isEvent: 'open-vls-seguridad', active: true, badge: 'PRO VLS'
        },
        {
            id: 'sticky-note', title: 'Papelito Amarillo', subtitle: 'Recordatorios, Dibujos y Notas Rápidas (Post-it)',
            icon: PenTool, color: '#fbbf24', isEvent: 'open-sticky-note', active: true, badge: 'FAVORITO'
        },
        {
            id: 'vecinity-pay', title: 'Recargar Fichas VLS', subtitle: 'Billetera Digital y Canje de Recompensas',
            icon: Award, color: '#FFD700', isEvent: 'open-vecinity-pay', active: true, badge: 'SISTEMA'
        },
        {
            id: 'vecicat', title: 'VeciCat: Adopción', subtitle: 'Red de Rescate y Adopción Felina',
            icon: Heart, color: '#ec4899', isEvent: 'open-vecicat', active: true, badge: 'NUEVO'
        },
        {
            id: 'plaza-vecinal-ai', title: 'Plaza Vecinal AI', subtitle: 'Espacio de encuentro ciudadano moderado por IA.', icon: Users, color: '#ec4899', path: 'https://ais-dev-m2dndpdv73k2izyiea7mef-41245370989.us-east5.run.app', isExternal: true, active: true },
        {
            id: 'ajedrez-patrimonial', title: 'Ajedrez Patrimonial 3D', subtitle: 'Desafía tu mente en el casco histórico',
            icon: Joystick, color: '#fcd34d', isEvent: 'open-ajedrez-patrimonial', active: true, badge: 'SABERES'
        },
        {
            id: 'vls-trivia', title: isRDMLS ? 'Saberes: Gestión del Conocimiento' : 'VLSabes: Juegaprende', subtitle: isRDMLS ? 'Pilar #2: Saberes, Historia y Soberanía' : 'Pilar #2: Trivia Educativa y Soberanía Comunicacional',
            icon: Joystick, color: '#FFD700', path: '/vlsabes', active: true, badge: isRDMLS ? 'SABERES' : 'TRIVIA'
        },
        {
            id: 'vls-investigacion-2025', title: 'LA PARADOJA 2025 (Reportaje)', subtitle: '¿Por qué la educación apagó el supercomputador?',
            icon: BookOpen, color: '#ef4444', isEvent: 'open-vls-investigacion', active: true, badge: 'EXCLUSIVO'
        },
        {
            id: 'memorias-unicornio', title: 'Memorias de un Unicornio', subtitle: 'Bitácora Técnica & Legado de Soberanía Digital',
            icon: Book, color: '#fcd34d', isEvent: 'open-unicorn', active: true, badge: 'BIBLIOTECA'
        },
        {
            id: 'vls-pyme-builder', title: 'Comercio Local Smart (PYME)', subtitle: 'Sitio Web, Radio Local y Pasarela VLS para anunciantes y compraventas',
            icon: ShoppingBag, color: '#f59e0b', isEvent: 'open-smart-business', active: true, badge: 'ANUNCIANTES'
        },
        {
            id: 'vls-motors', title: 'VLS Motors', subtitle: 'Flota Smart Eléctrica y Catálogo Premium',
            icon: Zap, color: '#38bdf8', isEvent: 'open-vls-motors', active: false, badge: 'MOVILIDAD'
        },
        {
            id: 'legal', title: 'Orientación Legal BCN', subtitle: 'Asesoría certificada para vecinos y Portal Abogados',
            icon: Scale, color: '#d4af37', isEvent: 'open-orientacion-legal', active: true, badge: 'PRO VLS'
        },
        {
            id: 'serenamet-admin', title: 'Serena Met (Admin)', subtitle: 'Inyectora de Locución y Reporte Móvil Terreno',
            icon: ShieldCheck, color: '#38bdf8', isEvent: 'open-serenamet-admin', active: false, badge: 'STAFF SMART'
        },
        {
            id: 'vlspeak', title: 'VLSpeak', subtitle: 'Traductor Simultáneo Transversal (Creole/English)',
            icon: Languages, color: '#a78bfa', isEvent: 'open-vlspeak', active: true, badge: 'INCLUSIÓN'
        },
        {
            id: 'safe-route', title: 'Safe Route AI', subtitle: 'Rutas seguras basadas en telemetría real (Leds/GPS)',
            icon: ShieldAlert, color: '#10b981', isEvent: 'open-safe-route', active: false, badge: 'SEGURIDAD IA'
        },
        {
            id: 'distances', title: 'Cuadro de Distancias', subtitle: 'Tiempos de viaje y rutas interurbanas optimizadas',
            icon: MapPin, color: '#3b82f6', isEvent: 'open-distances', active: true, badge: 'RUTAS'
        },
        {
            id: 'servicios-publicos', title: 'Reporte Servicios Públicos', subtitle: 'Agua, Alcantarillado, Baches y Aseo',
            icon: AlertTriangle, color: '#ef4444', path: '/citizens', active: true, badge: 'RED 24/7'
        },
        {
            id: 'smart-salud', title: tHub.saludTitle || 'Smart Salud', subtitle: 'Atención Médica y Agendamiento Vecinal',
            icon: Stethoscope, color: '#10b981', path: '/smart-salud', active: true
        },
        {
            id: 'smart-real-estate', title: 'Corretaje Propiedades Smart', subtitle: 'Arriendos y Ventas para vecinos y visitantes con trazabilidad VLS',
            icon: HomeIcon, color: '#f59e0b', path: '/propiedades', active: true, badge: 'COMPRAVENTA'
        },

        {
            id: 'smart-architecture', title: 'Arquitectura & Obras', subtitle: 'Diseño, Ampliaciones y Permisos Municipales',
            icon: Ruler, color: '#3b82f6', path: '/arquitectura', active: true, badge: 'DOM'
        },
        {
            id: 'smart-learning', title: isRDMLS ? 'Inducción Municipal' : 'Smart Academia VLS', subtitle: isRDMLS ? 'Pilar #2: Capacitación, Diplomas y Soberanía' : 'Capacitación, Inglés, Diplomas y Saberes Locales',
            icon: GraduationCap, color: '#fbbf24', path: '/induccion', active: true, badge: isRDMLS ? 'INDUCCIÓN' : 'ESTUDIOS'
        },
        {
            id: 'tienda-poleras', title: 'Tienda Poleras 3D', subtitle: 'Espejo Virtual y Creación de Vestuario',
            icon: Sparkles, color: '#facc15', isEvent: 'open-tienda-poleras', active: true, badge: 'NUEVO'
        },
        {
            id: 'kiosko-diarios', title: 'Kiosko de Prensa VLS', subtitle: 'Noticias, Portadas y Revistas Históricas',
            icon: Newspaper, color: '#065f46', isEvent: 'open-kiosko-diarios', active: true
        },
        {
            id: 'vecinojos', title: 'Visión Vecinal (Reportes)', subtitle: 'Georreferenciación de Casos en Comunidad',
            icon: Eye, color: '#38bdf8', isEvent: 'open-vecinojos', active: true, badge: 'EN DESARROLLO'
        },
        {
            id: 'camaras-faro', title: 'Cámaras del Faro (C5)', subtitle: 'Monitoreo Urbano y Estado de las Playas',
            icon: Camera, color: '#38bdf8', isEvent: 'open-retro-tv', active: false, badge: 'EN VIVO'
        },
        {
            id: 'tornamesa-digital', title: 'Música: El Tornamesa', subtitle: 'Selección de Vinilos y Éxitos Comunales',
            icon: Music, color: '#f59e0b', isEvent: 'open-personal-stereo', active: true, badge: 'RETRO'
        },
        {
            id: 'memorial-hijos', title: tHub.memorialTitle || 'Altares de la Región', subtitle: 'Homenaje Póstumo Digital y Hologramas',
            icon: Heart, color: '#f472b6', isEvent: 'open-memorial-hijos', active: true
        },
        {
            id: 'memory-portal', title: 'Portal de la Memoria', subtitle: 'Sube fotos, videos y recuerdos históricos',
            icon: Box, color: '#facc15', isEvent: 'open-memory-portal', active: true
        },
        {
            id: 'gym-3d', title: 'Gimnasio Virtual 3D', subtitle: 'Entrenamientos e Infraestructura Deportiva',
            icon: Dumbbell, color: '#ec4899', isEvent: 'open-gym-3d', active: true
        },
        {
            id: 'retro-gamer-room', title: 'Altar Gamer 1985', subtitle: 'Arcade Inmersivo y Clásicos de los 80/90',
            icon: Joystick, color: '#f97316', isEvent: 'open-retro-room', active: true
        },
        {
            id: 'personal-stereo', title: 'Personal Stereo VLS', subtitle: 'Tu música nostálgica siempre contigo',
            icon: HistoryIcon, color: '#fcd34d', isEvent: 'open-personal-stereo', active: true
        },
        {
            id: 'faro-ia', title: 'Serenito Guía (IA)', subtitle: 'Asistente Virtual con Inteligencia Humana',
            icon: Sparkles, color: '#10b981', isEvent: 'open-faro-ia', active: true
        },
        {
            id: 'historic-3d', title: 'Paseo Histórico 3D', subtitle: 'Recorrido Interactivo por la Zona Típica',
            icon: Map, color: '#10b981', isEvent: 'open-3d-walk', active: true
        },
        {
            id: 'busdeltiempo', title: 'Bus del Tiempo 3D', subtitle: 'Viaje Interdimensional por La Serena',
            icon: Map, color: '#c084fc', isEvent: 'open-time-bus', active: true
        },
        {
            id: 'roadmap', title: 'Roadmap VLS', subtitle: 'Hitos proyectados 2025',
            icon: HistoryIcon, color: '#06b6d4', isEvent: 'open-vls-roadmap', active: true, badge: 'ESTRATÉGICO'
        },
        {
            id: 'legacy-game', title: 'Salón Arcade Retro', subtitle: 'Desafía el Record y gana Papayas',
            icon: Joystick, color: '#ef4444', isEvent: 'open-game', active: true
        },
        {
            id: 'serenito-1945', title: 'Serenito 1945 Arcade', subtitle: 'Vuela, dispara y defiende nuestra ciudad',
            icon: Joystick, color: '#f43f5e', isExternal: true, path: '/minijuegos/serenito-1945/', active: true, badge: 'NUEVO'
        },
        {
            id: 'galaxia-disco', title: 'Galaxia Discoteque', subtitle: 'Burbuja, Sundance, BCool & Fiestas de Colegio',
            icon: PartyPopper, color: '#ec4899', isEvent: 'open-galaxia-disco', active: true, badge: 'RECUERDOS'
        },
        {
            id: 'vls-roadmap', title: 'Roadmap VLS 2025', subtitle: 'Inventario de Servicios y Visión Estratégica',
            icon: ListChecks, color: '#3b82f6', isEvent: 'open-vls-roadmap', active: true, badge: 'ESTATUS'
        },
        {
            id: 'pitch-inversionistas', title: 'Pitch Inversionistas (B2G)', subtitle: 'Modelo SaaS Municipal y Nube Cero Costo (Cloudflare D1/R2)',
            icon: Rocket, color: '#c084fc', isEvent: 'open-project-info', active: true, badge: 'Dossier 2030'
        },
        {
            id: 'low-data-safe-access', title: 'Sección Liviana (Low-Data)', subtitle: 'Portal de Ahorro para Celulares y 3G',
            icon: Zap, color: '#fbbf24', path: '/lite', active: true, badge: 'LITE'
        },
        {
            id: 'vls-precolombino', title: 'Raíces Precolombinas', subtitle: 'Santuario El Olivar, Diaguitas & Changos 3D',
            icon: Landmark, color: '#d4af37', isEvent: 'open-precolombino', active: true, badge: 'PATRIMONIO'
        },
        {
            id: 'muralismo', title: 'Muralismo Smart', subtitle: 'Arte Urbano y Protección de Fachadas',
            icon: Palette, color: '#f43f5e', path: '/muralismo', active: true
        },
        {
            id: 'cdls-club', title: 'Club Deportes La Serena', subtitle: 'Beneficios Vecinales y Pasión Granate',
            icon: Award, color: '#dc2626', isEvent: 'open-cdls', active: true
        },
        {
            id: 'estudio-musical', title: 'Estudio Musical IA', subtitle: 'Crea Letras y Acordes con Inteligencia',
            icon: Music, color: '#a855f7', isEvent: 'open-music-studio', active: true
        },
        {
            id: 'vhs-tv', title: 'Videoclub TVLS 90s', subtitle: 'Cine Nostálgico en Formato Clásico',
            icon: Tv, color: '#ef4444', isEvent: 'open-vhs-tv', active: true
        },
        {
            id: 'decision-vecinal', title: 'Decisión Vecinal', subtitle: 'Consultas Ciudadanas con Voto Digital',
            icon: Vote, color: '#d4af37', isEvent: 'open-decision-vecinal', active: false
        },
        {
            id: 'difundir-app', title: 'Difundir App Vecinal', subtitle: 'Haz crecer nuestra red comunitaria',
            icon: Share2, color: '#ec4899', isEvent: 'open-smart-share', active: true
        },
        {
            id: 'operacion-ls', title: 'Operación La Serena', subtitle: 'Simulador 3D Knight Rider (KITT)',
            icon: Zap, color: '#ff0000', isEvent: 'open-operacion-ls', active: true
        },
        {
            id: 'stickers-portal', title: 'Pegatinas Vecinales', subtitle: 'Descarga Stickers de Serenito 3D',
            icon: SmilePlus, color: '#10b981', path: '/pegatinas', active: true
        },
        {
            id: 'glosario-vls', title: 'Glosario Regional', subtitle: 'Diccionario y Modismos de La Serena',
            icon: Book, color: '#10b981', path: '/glosario', active: true
        },
        {
            id: 'escuela-musica', title: 'Escuela de Música Vecinal', subtitle: 'Clases y Producción para Talentos Locales',
            icon: GraduationCap, color: '#a855f7', isEvent: 'open-escuela-musica', active: true, badge: 'ESTUDIOS'
        },
        {
            id: 'escuela-artes', title: 'Academia de Artes', subtitle: 'Alfabetización, Idiomas, Oficios y Humanidades',
            icon: Palette, color: '#3b82f6', isEvent: 'open-escuela-artes', active: true, badge: 'ESTUDIOS'
        },
        {
            id: 'laboratorio-criticas', title: 'Laboratorio de Ideas', subtitle: 'Enfoque De Bono para Soluciones Vecinales',
            icon: Brain, color: '#a855f7', isEvent: 'open-debono-hats', active: true, badge: 'CO-CREACIÓN'
        },
        {
            id: 'tribunales', title: 'Tribunales Vecinales', subtitle: 'Educación Cívica y Justicia Ciudadana',
            icon: Gavel, color: '#d4af37', isEvent: 'open-tribunales', active: true, badge: 'NUEVO'
        },
        {
            id: 'sentinel-apex', title: 'Centinel Faro (IA Monitoring)', subtitle: 'Social Listening y Análisis de Redes mediante IA',
            icon: Search, color: '#312e81', isEvent: 'open-sentinel-apex', active: true, badge: 'AI'
        },
        {
            id: 'ambient-mode', title: 'Modo Ambiente VLS', subtitle: 'Postales de La Serena y Radio VLS en Vivo',
            icon: ImageIcon, color: '#3b82f6', isEvent: 'open-ambient-mode', active: true, badge: 'RELAX'
        },
        {
            id: 'central-difusion', title: 'Central de Difusión', subtitle: 'Envío Masivo RRSS e IA Google',
            icon: Share2, color: '#10b981', isEvent: 'open-central-difusion', active: true, badge: 'MUNICIPAL'
        },
        {
            id: 'vetcinos', title: 'VETcinos: Rescate Animal', subtitle: 'Pilar #1: Alerta, Voluntariado y SOS Mascotas',
            icon: Heart, color: '#ec4899', isEvent: 'open-veterinaria', active: true, badge: 'SOS'
        },
        {
            id: 'pincha', title: 'Pincha: Dating Premium', subtitle: 'Conexión Segura entre Vecinos Verificados',
            icon: Heart, color: '#f43f5e', isEvent: 'open-pincha', active: true, badge: 'NUEVO'
        },
        {
            id: 'plaza-vecinal', title: 'La Plaza Vecinal', subtitle: 'Pilar #4: Micro Red Social e Inteligencia Ciudadana',
            icon: MessageSquare, color: '#38bdf8', isEvent: 'open-plaza-vecinal', active: true, badge: 'VLS SOCIAL'
        }
    ].filter(s => {
        if (!s.active) return false;
        // Si es RDMLS, priorizamos lo municipal/institucional
        if (isRDMLS) {
            // No filtramos nada por ahora, dejamos que se vea todo lo relevante
            return true;
        }
        // Si es VLS, filtramos lo que explícitamente diga municipal/institucional si se desea ocultar, 
        // pero el usuario pidió lo opuesto antes.
        // Mantenemos la lógica original para VLS por ahora para no romper su vista.
        // VLS_C5: Blindaje contra objetos malformados en listas de servicios
        if (!s || !s.title) return false;
        
        return !s.title.toLowerCase().includes('municipal') && !s.subtitle?.toLowerCase().includes('institucional') && !s.badge?.includes('GOBIERNO');
    });

    const internalTools = [
        {
            id: 'smart-admin-internal', title: 'Gestión RRHH & Inducción', subtitle: 'Digitalización de Informes (Honorarios) y Firma',
            icon: ShieldCheck, color: '#10b981', isEvent: 'open-smart-admin', active: true, badge: 'PILAR #2'
        },
        {
            id: 'protocolo', title: 'Monitor de Precedencias', subtitle: 'Gestión Protocolar y Eventos de Autoridad',
            icon: Users, color: '#f59e0b', path: '/protocolo', active: true, badge: 'INTERNO'
        },
        {
            id: 'backoffice-movil', title: 'Backoffice Móvil (C5)', subtitle: 'Registro In Situ, Monitoreo y RRHH',
            icon: Camera, color: '#38bdf8', isEvent: 'open-backoffice-movil', active: true, badge: 'MÓVIL'
        },
        {
            id: 'vls-vial-back', title: 'Reporte Vial Directo', subtitle: 'Capture evidencias de baches en terreno',
            icon: Construction, color: '#f59e0b', isEvent: 'open-vial-news', active: true, badge: 'DENUNCIA'
        }
    ];

    const participacionCiudadana = [
        {
            id: 'pulso-ciudadano', title: 'Pulso Ciudadano VLS', subtitle: 'Reportes de Opinión Pública y Percepción Social',
            icon: BarChart3, color: '#38bdf8', isEvent: 'open-pulso-ciudadano', active: true, badge: 'PERIODIC'
        },
        {
            id: 'ecumenico', title: 'Portal Ecuménico y Espiritual', subtitle: 'Encuentro Interreligioso de Fe (Iglesias, Cultos y Templos)',
            icon: Heart, color: '#fcd34d', isEvent: 'open-ecumenical', active: true
        },
        {
            id: 'estudio-vls', title: 'Estudio Audiovisual VLS', subtitle: 'Arriendo de Estudio Broadcast & Podcast PRO',
            icon: Radio, color: '#00BCD4', isEvent: 'open-estudio-vls', active: true, badge: 'BROADCAST'
        },
        {
            id: 'laico', title: 'Portal Cívico y Laico', subtitle: 'Librepensamiento, Agrupaciones Cívicas y Voluntariado',
            icon: Globe, color: '#10b981', isEvent: 'open-secular', active: true
        },
        {
            id: 'almanaque-mundial', title: 'Portal Vecinos del Mundo', subtitle: 'Embajadas, Consulados y Relaciones Internacionales Smart',
            icon: Globe, color: '#60a5fa', isEvent: 'open-embajadas', active: true
        },
        {
            id: 'vecinos-analytics', title: 'Centinel Faro Analítica', subtitle: 'Análisis de Redes y IA Ciudadana',
            icon: Brain, color: '#00e5ff', isEvent: 'open-analytics', active: true, badge: 'IA PRO'
        },
        {
            id: 'parlamento-regional', title: 'Observatorio Parlamentario', subtitle: 'Transparencia y Auditoría de Representantes Regionales',
            icon: Gavel, color: '#38bdf8', isEvent: 'open-parlamento-regional', active: false, badge: 'NUEVO'
        },
        {
            id: 'vls-vial', title: 'Crisis Vial: El Laberinto', subtitle: 'Expediente VLS-2025-VIAL: Denuncia baches y rutas críticas',
            icon: Construction, color: '#f59e0b', isEvent: 'open-vial-news', active: true, badge: 'TACTICO'
        },
        {
            id: 'alcaldes-history', title: 'Archivo Alcaldes Regionales', subtitle: 'Hemeroteca y Cronología de Liderazgo Comunal',
            icon: HistoryIcon, color: '#38bdf8', isEvent: 'open-alcaldes-history', active: true, badge: 'HISTORIAL'
        }
    ];

    // Strict Filtering for RDMLS: Only show professional/institutional tools
    const allApps = [...servicios, ...participacionCiudadana, ...internalTools]
        .filter(a => a && a.active)
        .filter(a => {
            if (!a || !a?.id) return false;
            if (!isRDMLS) return true;
            // Purge ludic/citizen-only apps from RDMLS
            const vlsOnly = [
                'tienda-poleras', 'gym-3d', 'retro-gamer-room', 'personal-stereo', 'vhs-tv', 'cdls-club', 
                'difundir-app', 'stickers-portal', 'laico', 'ecumenico', 'vls-motors', 'tornamesa-digital',
                'galaxia-disco', 'memory-portal', 'kiosko-diarios', 'muralismo', 'operacion-ls', 
                'personal-stereo', 'tornamesa-digital', 'gym-3d', 'retro-gamer-room', 'vhs-tv', 
                'stickers-portal', 'glosario-vls', 'legacy-game', 'serenito-1945'
            ];
            // VLSabes (vls-trivia) is EXPLICITLY ALLOWED as it's part of the educational pillar
            return a?.id && !vlsOnly.includes(a?.id);
        })
        .map(app => {
            if (!app) return null;
            if (isRDMLS) {
                // Renombrar apps para el portal institucional
                if (app?.id === 'vls-trivia') return { ...app, title: 'Saberes Regionales', badge: 'INSTITUCIONAL' };
                if (app?.id === 'smart-learning') return { ...app, title: 'Inducción Municipal', badge: 'RRHH' };
            }
            return app;
        })
        .filter(app => app !== null);

    const filteredApps = allApps.filter(app =>
        app && (
            (app.title || '').toLowerCase().includes((searchTerm || '').toLowerCase()) ||
            (app.subtitle || '').toLowerCase().includes((searchTerm || '').toLowerCase())
        )
    );

    const baseCategories = [
        {
            id: 'citizens',
            name: 'Smart Citizens (Atención Ciudadana)',
            description: isRDMLS 
                ? 'Registro digital de accesos, portal georreferenciado para reportes vecinales, monitoreo urbano/ambiental (baches, luminarias, playas, humedales) y Radio Digital Municipal.'
                : 'Registro digital de accesos, portal georreferenciado para reportes vecinales, monitoreo urbano/ambiental (baches, luminarias, playas, humedales) y Radio Comunitaria VLS.',
            icon: Users,
            color: '#ef4444',
            modules: [
                'vls-domeyko', 'vecinojos', 'camaras-faro', 'servicios-publicos', 'safe-route', 'serenamet-admin', 
                'ecumenico', 'laico', 'smart-salud', 'vls-roadmap', 'pitch-inversionistas', 
                'low-data-safe-access', 'failover-lite-access', 'difundir-app', 'distances', 'vetcinos', 'alcaldes-history', 
                'vecicat', 'sticky-note', 'historic-3d', 'busdeltiempo', 'kiosko-diarios', 
                'memorial-hijos', 'memory-portal', 'tornamesa-digital', 'personal-stereo', 
                'vhs-tv', 'operacion-ls', 'stickers-portal', 'glosario-vls', 'ambient-mode', 
                'vls-motors', 'cdls-club', 'pincha', 'gym-3d', 'retro-gamer-room', 
                'legacy-game', 'serenito-1945', 'galaxia-disco', 'vls-andacollo', 'vls-vallenar', 'vls-juansoldado'
            ]
        },
        {
            id: 'admin',
            name: 'Smart Administration (Gestión Interna)',
            description: isRDMLS
                ? 'Portal de inducción E-learning (entrega de diplomas) y digitalización de informes para trabajadores municipales (Honorarios) con firma digital.'
                : 'Portal de formación continua, saberes locales y herramientas de gestión vecinal avanzada.',
            icon: Briefcase,
            color: '#10b981',
            modules: [
                'smart-learning', 'smart-admin-internal', 'vls-trivia', 'legal', 
                'vls-pyme-builder', 'smart-architecture', 'smart-real-estate', 'vlspeak', 
                'escuela-musica', 'escuela-artes', 'laboratorio-criticas', 'tribunales', 
                'tienda-poleras', 'estudio-musical'
            ]
        },
        {
            id: 'events',
            name: 'Smart Events (Protocolo)',
            description: isRDMLS
                ? 'Gestión automatizada de eventos institucionales y un Monitor de Precedencias en tiempo real para autoridades.'
                : 'Gestión de eventos vecinales, asambleas y monitor de participación ciudadana en tiempo real.',
            icon: PartyPopper,
            color: '#f59e0b',
            modules: ['protocolo', 'almanaque-2025', 'muralismo', 'decision-vecinal']
        },
        {
            id: 'listening',
            name: 'Smart Listening (Inteligencia)',
            description: 'Centinel Faro (Social Listening, monitoreo de redes y videos mediante IA para la toma de decisiones).',
            icon: Radio,
            color: '#38bdf8',
            modules: [
                'vls-domeyko', 'vecinos-analytics', 'sentinel-apex', 'social-vision', 'vls-investigacion-2025', 
                'vls-artemis', 'vls-chequia', 'central-difusion', 'plaza-vecinal', 
                'parlamento-regional', 'faro-ia', 'pulso-ciudadano', 'vls-andacollo', 'vls-vallenar', 'vls-juansoldado'
            ]
        }
    ];

    const categories = isRDMLS 
        ? baseCategories // Si es RDMLS, la función filter de allApps ya se encarga de eliminar módulos lúdicos no deseados
        : baseCategories;


    const displayApps = (viewMode === 'personalized'
        ? allApps.filter(a => a?.id && pinnedApps.includes(a?.id))
        : filteredApps
    ).filter(Boolean); // ← Blindaje: elimina cualquier undefined residual

    const AppCard = ({ app }) => {
        if (!app || !app?.id) return null; // ← Guardia crítica contra undefined
        // ── MASTER EDITOR: ocultar módulos marcados (fuera de modo editor)
        if (!editorActive && isHidden(app?.id)) return null;
        const locked = isRestrictedModule(app?.id);
        const isPinned = pinnedApps.includes(app?.id);

        const cardContent = (
            <motion.div
                drag
                dragMomentum={false}
                dragElastic={0.1}
                dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                whileDrag={{ scale: 1.05, zIndex: 100, boxShadow: `0 20px 50px ${app?.color}50` }}
                key={app?.id}
                className={`glass-panel gaudi-curves scale-in ${locked ? 'locked-module' : ''}`}
                style={{
                    display: 'flex', flexDirection: 'column', padding: '1.5rem',
                    border: locked ? '1px solid rgba(255,50,50,0.2)' : `1px solid ${app?.color}40`,
                    background: locked ? 'rgba(0,0,0,0.6)' : `linear-gradient(135deg, ${app?.color}25 0%, rgba(0,0,0,0.6) 100%)`,
                    borderRadius: '20px', position: 'relative', overflow: 'hidden', textAlign: 'left',
                    transition: 'border 0.3s, background 0.3s, transform 0.1s', 
                    filter: locked ? 'grayscale(1) opacity(0.6)' : 'none',
                    height: '100%',
                    touchAction: 'pan-y', // Allow vertical scrolling
                    cursor: locked ? 'not-allowed' : 'grab',
                    animation: app?.id === 'vls-artemis' ? 'vls-stardust-pulse 3s infinite alternate' : 'none'
                }}
            >
                {/* Visual Flair for Artemis */}
                {app?.id === 'vls-artemis' && (
                    <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(56, 189, 248, 0.2) 0%, transparent 70%)', filter: 'blur(20px)', pointerEvents: 'none' }} />
                )}
                <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '5px', zIndex: 10 }}>
                    <button
                        onClick={(e) => { e.stopPropagation(); togglePin(app?.id); }}
                        style={{ background: isPinned ? '#fbbf24' : 'rgba(255,255,255,0.05)', border: 'none', padding: '4px', borderRadius: '50%', color: isPinned ? '#000' : '#fff', cursor: 'pointer' }}
                    >
                        <Pin size={14} fill={isPinned ? "currentColor" : "none"} />
                    </button>
                    {locked && <Lock size={12} color="#ef4444" />}
                </div>

                <div
                    onClick={(e) => {
                        if (e.defaultPrevented) return; // Si es drag, no navegar
                        if (locked) return alert('Acceso Reservado a Estamento Directivo.');
                        if (app?.id === 'premium') { setShowPremiumClub(true); return; }
                        if (app?.id === 'galaxia-disco') { setShowGalaxia(true); return; }
                        if (app.isEvent) window.dispatchEvent(new CustomEvent(app.isEvent));
                        else if (app.isExternal) window.open(app.path, '_blank');
                        else navigate(app.path);
                    }}
                    style={{ cursor: locked ? 'not-allowed' : 'pointer', height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                    <div style={{ background: `${app.color}20`, padding: '1rem', borderRadius: '15px', border: `1px solid ${app.color}40`, width: 'fit-content', marginBottom: '1rem' }}>
                        <app.icon size={28} color={app.color} />
                    </div>
                    <h4 style={{ color: 'white', margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>{app.title}</h4>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: '1.4', margin: 0 }}>{app.subtitle}</p>
                    {app.badge && <span style={{ marginTop: '0.8rem', fontSize: '0.6rem', color: app.color, background: `${app.color}15`, padding: '2px 8px', borderRadius: '50px', fontWeight: 'bold', width: 'fit-content' }}>{app.badge}</span>}
                </div>
            </motion.div>
        );

        // En modo editor, envolver con EditorWrapper para mostrar botón ✕
        if (isMaster) {
            return (
                <EditorWrapper
                    id={app.id}
                    label={app.title}
                    editorActive={editorActive}
                    isHidden={isHidden(app.id)}
                    onToggleHide={hideModule}
                >
                    {cardContent}
                </EditorWrapper>
            );
        }
        return cardContent;
    };
    const [impactMessages, setImpactMessages] = useState([
        { icon: Award, color: '#fbbf24', text: isRDMLS ? "[RDMLSabes]: Juega la trivia oficial y valida tus conocimientos institucionales." : "[VLSABES]: ¿Cuánto sabes de tu comuna? Juega la trivia oficial y gana fichas para el portal." },
        { icon: Map, color: '#38bdf8', text: "[El Túnel del Tiempo]: Viaja al pasado de La Serena en 3D. Explora el centro histórico como era hace 100 años." },
        { icon: Box, color: '#c084fc', text: "[Render 3D]: Ya puedes visualizar tu indumentaria institucional en 3D antes de pedirla." },
        { icon: AlertCircle, color: '#ef4444', text: isRDMLS ? "[Gestión Municipal]: Reporte de baches y luminarias integrado con la central de mando." : "[Smart Comuna]: Reporta baches, luminarias o basura con un solo click. Gestión directa con el municipio." },
        { icon: Radio, color: '#38bdf8', text: isRDMLS ? "[RDMLS]: La radio oficial de La Serena ya está en el aire. Escucha la programación institucional 24/7." : "[Radio VLS]: La voz de los vecinos ya está en el aire. Escucha música y noticias locales 24/7." },
        { icon: Heart, color: '#f472b6', text: "[VecinityPay]: Apoya el desarrollo local de este portal 100% Home-Made y obtén beneficios exclusivos." },
        { icon: Leaf, color: '#10b981', text: "[Turismo Sustentable]: Medios destacan a La Serena como capital pionera en integración de tecnología no invasiva con el patrimonio." }
    ]);

    const guardianes = [
        { id: 'serenito-guard', name: 'Serenito', role: 'Seguridad & Protección', model: '/models/serenito_38.glb', img: '/serenito_3d_humanized_2025_1774875415876.png', bio: isRDMLS ? 'Experto en seguridad municipal y IA biométrica. El corazón del Portal RDMLS.' : 'Experto en seguridad vecinal y IA biométrica. El corazón de VecinoSmart.' },
        { id: 'tata-rojas', name: 'Tata Rojas', role: 'Gran Patriarca VLS', model: '/models/tata_rojas_3d.glb', img: '/avatars/tio_pedro.png', bio: 'El sabio del Valle. Custodio de las tradiciones y la memoria histórica de nuestra región.' },
        { id: 'alpino-tech', name: 'Alpino 3D', role: 'Élite Tecnológica VLS', model: '/models/alpino3d.glb', img: '/avatars/alpino.png', bio: 'Experto en infraestructura crítica y sistemas inteligentes. El puente entre el cerro y la nube.' },
        { id: 'don-joako', name: 'Don Joako', role: 'Seguridad Patrimonial', model: '/models/Serenito_polera_blancacuerpo_entero.glb', img: '/avatars/don_joako_guardian.png', bio: 'Guardián del casco histórico. Siempre vigilante con su gorro de honor y mirada profunda.' },
        { id: 'pampita-huertera', name: 'Pampita', role: 'Humizales & Parques', model: '/models/Serenito_polera_blancacuerpo_entero.glb', img: '/pampita_v3.png', bio: 'Guardiana de flora y fauna regional. Sabiduría de la tierra y biodiversidad.' },
        { id: 'ancestro-bisabuelo', name: 'Ancestral Serenito (Bisabuelo)', role: 'Historia & Tradición', model: '/models/faro_3d_modelo.glb', img: '/ancestral_serenito.png', bio: 'Guardián original de la ciudad con su farol de la verdad. Sabiduría de los fundadores.' }
    ];

    const [msgIndex, setMsgIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [realtimeData, setRealtimeData] = useState({
        temp: '--',
        wind: '--',
        windDir: '--',
        pm25: '--',
        humidity: '--'
    });

    useEffect(() => {
        if (weather && weather.temp !== undefined) {
            const { temp, windSpeed, windDirection, pm25, humidity } = weather;
            
            setRealtimeData({
                temp,
                wind: windSpeed || '--',
                windDir: windDirection || '--',
                pm25: pm25 || '--',
                humidity: humidity || '--'
            });

            setImpactMessages(prev => [
                { icon: Globe, color: '#38bdf8', text: `[Meteorología SERENAMET]: Condiciones en vivo: ${temp}°C, Viento ${windDirection} a ${windSpeed} km/h, Humedad: ${humidity}%.` },
                { icon: Leaf, color: '#10b981', text: `[Monitoreo Ambiental]: Calidad del Aire PM2.5 = ${pm25} µg/m³. Valores seguros para actividades al aire libre validados por IA.` },
                ...prev
            ]);
        }
    }, [weather]);

    useEffect(() => {
        const interval = setInterval(() => {
            setMsgIndex((prev) => (prev + 1) % impactMessages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [impactMessages.length]);

    const CurrentMessage = impactMessages[msgIndex] || impactMessages[0] || { text: 'Soberanía Digital: La Serena Smart', color: '#38bdf8' };
    const CurrentIcon = CurrentMessage?.icon || Sparkles;

    const handleSearchSubmit = (term) => {
        const lowerTerm = term.toLowerCase();
        
        // Atajos directos para módulos maestros o registros históricos
        if (lowerTerm.includes('alcalde') || lowerTerm.includes('historia') || lowerTerm.includes('registro') || lowerTerm.includes('municipio')) {
            setShowAlcaldes(true);
            return;
        }

        if (lowerTerm.includes('miguel') || lowerTerm.includes('melendez') || lowerTerm.includes('agua')) {
            window.dispatchEvent(new CustomEvent('open-memorial-hijos', { detail: { id: 'miguel' } }));
            return;
        }

        if (lowerTerm.includes('arrendar') || lowerTerm.includes('arriendo') || lowerTerm.includes('casa') || lowerTerm.includes('propiedad') || lowerTerm.includes('vender') || lowerTerm.includes('comprar')) {
            navigate('/propiedades');
        } else if (lowerTerm.includes('diseñar') || lowerTerm.includes('arquitecto') || lowerTerm.includes('construir') || lowerTerm.includes('ampliación') || lowerTerm.includes('obra')) {
            navigate('/arquitectura');
        } else if (lowerTerm.includes('salud') || lowerTerm.includes('médico') || lowerTerm.includes('doctor')) {
            navigate('/smart-salud');
        } else if (lowerTerm.includes('artemis') || lowerTerm.includes('luna') || lowerTerm.includes('espacio') || lowerTerm.includes('nasa')) {
            handleArtemis();
        } else {
            // Si no es un atajo, scrollear suavemente a los resultados filtrados
            const resultsSection = document.getElementById('search-results-anchor');
            if (resultsSection) {
                resultsSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const startVoiceSearch = () => {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new window.webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.lang = lang === 'es' ? 'es-ES' : 'en-US';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setSearchTerm(transcript);
                setViewMode('full'); // Switch to full view to show search results
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                alert('Error en el reconocimiento de voz. Intenta de nuevo.');
            };

            recognition.start();
        } else {
            alert('Tu navegador no soporta el reconocimiento de voz.');
        }
    };

    // Tenant guards (después de todos los hooks, válido por reglas de React)
    const huinchaButtonsJSX = (
        <div style={{ display: 'flex', gap: '20px', flexShrink: 0, minWidth: 'max-content', alignItems: 'center', paddingRight: '20px' }}>
            <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-unicorn'))}
                className="btn-glass animate-pulse"
                style={{
                    background: '#fbbf24', border: 'none', borderRadius: '50px', padding: '0.4rem 1.4rem',
                    color: 'black', fontWeight: '950', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '10px',
                    boxShadow: '0 0 30px rgba(251, 191, 36, 0.7)', cursor: 'pointer', zIndex: 1000, letterSpacing: '1px'
                }}
            >
                <Book size={18} color="black" fill="black" /> EL UNICORNIO
            </button>

            <button onClick={() => window.dispatchEvent(new CustomEvent('open-vls-chat'))} className="huincha-btn premium-citizens" style={{ background: 'rgba(56, 189, 248, 0.15)', border: '1px solid #38bdf8', borderRadius: '50px', padding: '0.4rem 1.2rem', color: 'white', fontWeight: '900', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 0 15px rgba(56, 189, 248, 0.3)' }}>
                <Users size={14} color="#38bdf8" /> SMART CITIZENS
            </button>
            <button onClick={() => navigate('/induccion')} className="huincha-btn premium-admin" style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', borderRadius: '50px', padding: '0.4rem 1.2rem', color: 'white', fontWeight: '900', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 0 15px rgba(16, 185, 129, 0.3)' }}>
                <Shield size={14} color="#10b981" /> SMART ADMINISTRATION
            </button>
            <button onClick={() => window.dispatchEvent(new CustomEvent('open-vls-eventos'))} className="huincha-btn premium-events" style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', borderRadius: '50px', padding: '0.4rem 1.2rem', color: 'white', fontWeight: '900', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 0 15px rgba(239, 68, 68, 0.3)' }}>
                <Calendar size={14} color="#ef4444" /> SMART EVENTS
            </button>
            <button onClick={() => navigate('/centinel')} className="huincha-btn premium-listening" style={{ background: 'rgba(168, 85, 247, 0.15)', border: '1px solid #a855f7', borderRadius: '50px', padding: '0.4rem 1.2rem', color: 'white', fontWeight: '900', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 0 15px rgba(168, 85, 247, 0.3)' }}>
                <Zap size={14} color="#a855f7" /> SMART LISTENING
            </button>

            <button onClick={() => window.dispatchEvent(new CustomEvent('open-vls-radio'))} className="huincha-btn" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50px', padding: '0.4rem 1rem', color: 'white', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Radio size={14} /> RADIO VLS
            </button>
        </div>
    );
    if (videoSelected) return null; 
    if (curTenant === 'gore-coquimbo') return <GoreDashboard />;
    if (curTenant === 'vecino-portal-only') return <Navigate to="/vecinos" />;

    if (isRDMLS) {
        return (
            <div className="page-container trencadis-guell" style={{ paddingTop: 'var(--nav-height, 60px)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                {/* 1. Huincha Superior */}
                <div style={{
                    width: '100%',
                    background: 'linear-gradient(90deg, #1e1b4b 0%, #312e81 100%)',
                    borderBottom: '2px solid #ef4444',
                    padding: '0.5rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '0.85rem',
                    zIndex: 1000,
                    minHeight: '60px'
                }}>
                    <div key={msgIndex} className="animate-slide-up" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.3rem', borderRadius: '50%', border: `1px solid ${CurrentMessage?.color || '#38bdf8'}50` }}>
                            {CurrentIcon ? <CurrentIcon size={16} color={CurrentMessage?.color || '#38bdf8'} /> : <Sparkles size={16} color="#38bdf8" />}
                        </div>
                        <span style={{ fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 10px #10b981', animation: 'pulse 2s infinite' }}></span>
                            {CurrentMessage?.text || 'Portal Institucional RDMLS'}
                        </span>
                    </div>
                </div>

                <div style={{ padding: '2rem 1rem', width: '100%', maxWidth: '900px', display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
                    {/* 2. Módulos Destacados (RDMLS View) - MOVED UP */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '1rem',
                        width: '100%',
                        maxWidth: '850px',
                        zIndex: 100
                    }}>
                        {/* Tarjeta ARCADE - PREMIUM DESIGN RESTORED */}
                        <div
                            onClick={() => { if (window.openArcade) window.openArcade(); else window.dispatchEvent(new CustomEvent('open-game')); }}
                            style={{
                                background: 'linear-gradient(135deg, rgba(88, 28, 135, 0.4) 0%, rgba(15, 23, 42, 0.4) 100%)',
                                border: '1px solid rgba(168, 85, 247, 0.7)',
                                borderRadius: '24px',
                                padding: '1.5rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1.2rem',
                                position: 'relative',
                                overflow: 'hidden',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                boxShadow: '0 15px 35px rgba(0,0,0,0.4), inset 0 0 20px rgba(168, 85, 247, 0.1)',
                                backdropFilter: 'blur(12px)'
                            }}
                            onMouseEnter={e => { 
                                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'; 
                                e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 1)';
                                e.currentTarget.style.boxShadow = '0 25px 50px rgba(168, 85, 247, 0.3)';
                            }}
                            onMouseLeave={e => { 
                                e.currentTarget.style.transform = 'translateY(0) scale(1)'; 
                                e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.7)';
                                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.4)';
                            }}
                        >
                            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/portada_vls_trivia.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15, mixBlendMode: 'overlay', pointerEvents: 'none' }} />
                            <div style={{ background: 'linear-gradient(135deg, #a855f7, #6b21a8)', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)', flexShrink: 0 }}>
                                <Joystick size={24} color="white" />
                            </div>
                            <div style={{ flex: 1, zIndex: 1 }}>
                                <div style={{ fontSize: '1.2rem', fontWeight: '900', color: '#c084fc', marginBottom: '2px' }}>SALÓN ARCADE</div>
                                <div style={{ color: 'rgba(192, 132, 252, 0.8)', fontSize: '0.85rem', fontWeight: '500' }}>Gaming Retro y Desafíos VLS</div>
                            </div>
                        </div>

                        {/* Tarjeta ALTAR */}
                        <div
                            onClick={() => window.dispatchEvent(new CustomEvent('open-memorial-hijos'))}
                            style={{
                                background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
                                border: '1px solid rgba(244, 114, 182, 0.5)',
                                borderRadius: '20px',
                                padding: '1.2rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                position: 'relative',
                                overflow: 'hidden',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                            }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(244, 114, 182, 0.9)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(244, 114, 182, 0.5)'; }}
                        >
                            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/memorial-mistral.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15, mixBlendMode: 'luminosity', pointerEvents: 'none' }} />
                            <div style={{ background: 'linear-gradient(135deg, #f472b6, #db2777)', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(244, 114, 182, 0.4)', flexShrink: 0 }}>
                                <Heart size={24} color="white" />
                            </div>
                            <div style={{ flex: 1, zIndex: 1 }}>
                                <div style={{ fontSize: '1.2rem', fontWeight: '900', color: '#f472b6', marginBottom: '2px' }}>ALTAR REGIONAL</div>
                                <div style={{ color: 'rgba(244, 114, 182, 0.8)', fontSize: '0.85rem', fontWeight: '500' }}>Homenaje Póstumo Digital</div>
                            </div>
                        </div>
                    </div>

                    {/* 3. Radio Dial */}
                    <div style={{ width: '100%', position: 'relative', zIndex: 100 }}>
                        <RDMLSRadioDial />
                        {/* <FeaturedBook isRDMLS={true} /> */}
                    </div>

                    {/* 3. Cartel Burdeo Municipal */}
                    <div className="picasso-fractal" style={{ 
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', 
                        width: '100%', maxWidth: '850px', padding: '2.5rem', borderRadius: '30px', 
                        background: 'rgba(80, 5, 5, 0.65)', border: '2px solid #f59e0b', 
                        boxShadow: '0 15px 40px rgba(0,0,0,0.4)', position: 'relative' 
                    }}>
                        <div style={{ position: 'absolute', top: -30, background: '#f59e0b', padding: '0.4rem 1.5rem', borderRadius: '20px', color: '#000', fontWeight: '900', fontSize: '0.8rem', letterSpacing: '2px' }}>PORTAL INSTITUCIONAL</div>
                        <img src="/escudo.png" style={{ height: '120px', filter: 'drop-shadow(0 0 15px rgba(245,158,11,0.5))' }} alt="Muni La Serena" />
                        <h1 style={{ color: 'white', fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', fontWeight: '950', letterSpacing: '-1px', margin: 0, textAlign: 'center', textShadow: '0 10px 20px rgba(0,0,0,0.5)' }}>I. MUNICIPALIDAD DE LA SERENA</h1>
                        <p style={{ color: '#fcd34d', fontWeight: '900', fontSize: '1.2rem', letterSpacing: '3px', textTransform: 'uppercase', margin: 0 }}>Radio Digital Municipal RDMLS.cl</p>
                    </div>

                    {/* 5. Footer Institucional RDMLS */}
                    <footer style={{ 
                        marginTop: '2rem', padding: '2rem', textAlign: 'center', 
                        width: '100%', color: 'rgba(255,255,255,0.6)', fontSize: '1rem',
                        borderTop: '1px solid rgba(245,158,11,0.2)', fontWeight: '500', letterSpacing: '1px'
                    }}>
                        {/* {isMaster && (
                <MasterEditorToggle
                    editorActive={editorActive}
                    toggleEditor={toggleEditor}
                    hiddenCount={hiddenModules.length}
                    onRestore={restoreAll}
                />
            )}
            {editorActive && (
                <MasterEditorBanner hiddenCount={hiddenModules.length} />
            )} */}
                        <p>www.rdmls.cl · IMLS COMUNICACIONES 2025</p>
                        <p style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '5px' }}>Ilustre Municipalidad de La Serena</p>
                    </footer>
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>
            <SEO 
                title="Vecinos La Serena — Portal Inteligente de la Comuna"
                description="La primera plataforma Smart City de la Región de Coquimbo. Radio, reportes vecinales, patrimonio 3D y servicios ciudadanos 24/7."
                image="/vls-logo-premium.png"
            />
            {/* ── MASTER EDITOR MODE UI (solo vecinoslaserenachile@gmail.com) ── */}
            {isMaster && (
                <MasterEditorToggle
                    editorActive={editorActive}
                    toggleEditor={toggleEditor}
                    hiddenCount={hiddenModules.length}
                    onRestore={restoreAll}
                />
            )}
            {isMaster && editorActive && (
                <MasterEditorBanner hiddenCount={hiddenModules.length} />
            )}
            <style>{`
                .btn-vls-action-light { background: #38bdf8; color: #000; padding: 0.8rem 1.5rem; border: none; font-weight: 900; border-radius: 12px; cursor: pointer; transition: all 0.3s; }
                .btn-vls-action-yellow { background: #fbbf24; color: #000; padding: 0.8rem 1.5rem; border: none; font-weight: 900; border-radius: 12px; cursor: pointer; transition: all 0.3s; }
                .btn-vls-action-white { background: #fff; color: #ef4444; padding: 0.8rem 1.5rem; border: none; font-weight: 900; border-radius: 12px; cursor: pointer; transition: all 0.3s; }
                .btn-vls-action-light:hover, .btn-vls-action-yellow:hover, .btn-vls-action-white:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.3); }
                @keyframes vls-stardust-pulse {
                    0% { box-shadow: 0 0 20px rgba(56, 189, 248, 0.2); border-color: rgba(56, 189, 248, 0.3); }
                    100% { box-shadow: 0 0 50px rgba(56, 189, 248, 0.6); border-color: rgba(56, 189, 248, 0.8); }
                }
                @keyframes vls-ticker-marquee {
                    0% { transform: translate3d(0, 0, 0); }
                    100% { transform: translate3d(-50%, 0, 0); }
                }
                .vls-ticker-wrapper { 
                    display: flex; 
                    width: max-content; 
                    flex-shrink: 0;
                    animation: vls-ticker-marquee 60s linear infinite; 
                    will-change: transform;
                    backface-visibility: hidden;
                }
                .vls-ticker-wrapper:hover { 
                    animation-play-state: paused; 
                }
            `}</style>
            <div className="page-container trencadis-guell" style={{ WebkitPaddingStart: 'env(safe-area-inset-left)', paddingBottom: '160px', paddingLeft: '0', paddingRight: '0', maxWidth: '100%', overflowX: 'hidden', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

                {/* Acceso Nuclear In-line eliminado para priorizar inserción en Huincha Superior */}

                {/* Huincha Superior Optimizada para no tapar contenido en móviles */}
                <div style={{
                    width: '100%',
                    background: 'linear-gradient(90deg, #1e1b4b 0%, #312e81 100%)',
                    borderBottom: '2px solid #ef4444',
                    padding: '0.4rem 1.5rem',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    color: 'white',
                    fontSize: '0.85rem',
                    zIndex: 990,
                    position: 'relative',
                    gap: '20px',
                    minHeight: '70px',
                    overflowX: 'hidden'
                }}>
                    {/* Mensaje Informativo (Izquierda/Centro) */}
                    <div key={msgIndex} className="animate-slide-up" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        textAlign: 'left',
                        flex: '0 0 auto',
                        flexShrink: 0,
                        maxWidth: '340px',
                        minWidth: '200px',
                        padding: '0.2rem 0',
                        overflow: 'hidden'
                    }}>
                        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.4rem', borderRadius: '50%', flexShrink: 0, border: `1px solid ${CurrentMessage?.color || 'white'}50`, boxShadow: `0 0 10px ${CurrentMessage?.color || 'white'}30` }}>
                            {CurrentIcon ? <CurrentIcon size={18} color={CurrentMessage?.color || 'white'} /> : <Sparkles size={18} color={CurrentMessage?.color || 'white'} />}
                        </div>
                        <span style={{ lineHeight: '1.4', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', flex: 1, overflow: 'hidden' }}>
                            <span style={{ width: '10px', height: '10px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 10px #10b981', flexShrink: 0, animation: 'pulse 2s infinite' }}></span>
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, letterSpacing: '0.3px' }}>
                                <strong style={{ color: CurrentMessage?.color || 'white', marginRight: '5px' }}>[{CurrentMessage?.category || 'VLS'}]</strong>
                                {CurrentMessage?.text || 'Soberanía Digital: La Serena Smart'}
                            </span>
                        </span>
                    </div>

                        {/* AMERICAN TICKER (MARQUEE) - ISOLATED CONTAINER */}
                        <div style={{ 
                            flexGrow: 1, 
                            overflow: 'hidden', 
                            position: 'relative', 
                            display: 'flex', 
                            alignItems: 'center',
                            marginLeft: '5px',
                            maskImage: 'linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent)',
                            WebkitMaskImage: 'linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent)'
                        }}>
                            <div className="vls-ticker-wrapper">
                                {huinchaButtonsJSX}
                                {huinchaButtonsJSX}
                            </div>
                        </div>

                        {/* Botones de Acción (Derecha) */}
                        <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        flexShrink: 0,
                        padding: '0.5rem 0',
                        justifyContent: 'flex-start'
                    }}>
                        {/* BOTÓN DE ACCESO DINÁMICO */}
                        {!currentUser ? (
                            <button
                                onClick={handleLogin}
                                className="btn-glass pulse"
                                style={{
                                    background: 'rgba(16, 185, 129, 0.2)',
                                    border: '1px solid rgba(16, 185, 129, 0.5)',
                                    borderRadius: '50px',
                                    padding: '0.4rem 1rem',
                                    color: '#10b981',
                                    fontWeight: '900',
                                    fontSize: '0.75rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    boxShadow: '0 0 15px rgba(16, 185, 129, 0.2)'
                                }}
                            >
                                <UserIcon size={14} /> INGRESAR
                            </button>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="btn-glass"
                                style={{
                                    background: 'rgba(239, 68, 68, 0.2)',
                                    border: '1px solid rgba(239, 68, 68, 0.5)',
                                    borderRadius: '50px',
                                    padding: '0.4rem 1rem',
                                    color: '#ef4444',
                                    fontWeight: '900',
                                    fontSize: '0.75rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}
                            >
                                <LogOut size={14} /> SALIR
                            </button>
                        )}

                        <button
                            onClick={() => navigate('/glosario')}
                            className="btn-glass"
                            style={{
                                background: 'rgba(255,255,255,0.1)',
                                border: '1px solid rgba(255,255,255,0.3)',
                                borderRadius: '50px',
                                padding: '0.4rem 1rem',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '0.75rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                            }}
                        >
                            <Book size={14} /> {tHub.glosario || 'GLOSARIO'}
                        </button>
                        
                        {/* TOKEN DISPLAY IN HEADER */}
                        {!isRDMLS && (
                            <div style={{
                                background: 'rgba(255,215,0,0.15)',
                                border: '1px solid rgba(255,215,0,0.5)',
                                borderRadius: '50px',
                                padding: '0.4rem 1rem',
                                color: '#FFD700',
                                fontWeight: '900',
                                fontSize: '0.75rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                boxShadow: '0 0 15px rgba(255,215,0,0.2)',
                                cursor: 'pointer'
                            }}
                            onClick={() => window.dispatchEvent(new CustomEvent('open-vecinity-pay'))}
                            title="Tus Fichas VLS Recompensadas"
                            >
                                <Award size={14} />
                                <span style={{ whiteSpace: 'nowrap' }}>{vlsTokens} FICHAS</span>
                                <span style={{ 
                                    background: '#ef4444', 
                                    color: 'white', 
                                    padding: '2px 8px', 
                                    borderRadius: '10px', 
                                    fontSize: '0.6rem', 
                                    marginLeft: '5px',
                                    boxShadow: '0 0 10px rgba(239, 68, 68, 0.5)'
                                }}>RECARGAR</span>
                            </div>
                        )}



                    
                    {host.includes('quimbo') && (
                        <button
                            onClick={() => navigate('/quimbo')}
                            className="btn-glass animate-float"
                            style={{
                                background: 'rgba(245, 158, 11, 0.2)',
                                border: '1px solid rgba(245, 158, 11, 0.4)',
                                borderRadius: '50px',
                                padding: '0.4rem 1rem',
                                color: '#f59e0b',
                                fontWeight: '900',
                                pointerEvents: 'auto'
                            }}
                        >
                            EN VIVO
                        </button>
                    )}
                </div>
            </div>


                <main className="flex-1 overflow-y-auto overflow-x-hidden relative" style={{ padding: '0 0 100px 0' }}>
                    {/* ══════════════════════════════════════════════════════════ */}
                    {/* RADAR MUNDIAL: NOTICIAS INTERNACIONALES (SIEMPRE VISIBLE)  */}
                    {/* ══════════════════════════════════════════════════════════ */}
                    <div style={{ width: '100%', maxWidth: '1200px', margin: '1rem auto 0', padding: '0 2rem' }}>
                        {/* <WorldNewsTablets /> */}
                        {/* <LocalNewsGrid /> */}
                    </div>
                    
                    {/* ══════════════════════════════════════════════════════════ */}
                    {/* NODO DE BIENVENIDA (ABS-TOP)                                 */}
                    {/* ══════════════════════════════════════════════════════════ */}
                    {isVLS && (
                        <div className="animate-fade-in" style={{
                            width: '100%',
                            background: 'linear-gradient(135deg, #020617 0%, #0f172a 100%)',
                            borderBottom: '4px solid #fbbf24',
                            padding: '3rem 2rem',
                            position: 'relative',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            boxSizing: 'border-box'
                        }}>
                             {/* Personaje 3D (Humanized Serenito) - REGLA ESTRICTA (Actualmente en producción) */}
                            <div style={{ position: 'absolute', inset: 0, opacity: 0.15, background: 'radial-gradient(circle at 50% 50%, #38bdf8 0%, transparent 60%)' }}></div>
                            <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem' }}>
                                <div style={{ background: '#38bdf8', padding: '10px 25px', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 0 30px rgba(56,189,248,0.3)' }}>
                                    <Rocket size={20} color="white" />
                                    <span style={{ color: 'white', fontWeight: '900', fontSize: '0.85rem', letterSpacing: '2px' }}>{isRDMLS ? 'HUB DE INTELIGENCIA' : 'COMUNIDAD DIGITAL'}</span>
                                </div>
                                <h2 style={{ fontSize: 'clamp(1.8rem, 6vw, 3.2rem)', fontWeight: '900', margin: 0, color: 'white', letterSpacing: '-1.5px', lineHeight: '1.1' }}>
                                    {isRDMLS ? 'BIENVENIDOS AL ECOSISTEMA ' : 'BIENVENIDO A '} <br/> <span style={{ color: '#38bdf8' }}>{isRDMLS ? 'RDMLS' : 'VECINOS LA SERENA'}</span>
                                </h2>
                                <p style={{ maxWidth: '900px', fontSize: '1.15rem', color: '#94a3b8', margin: '0.5rem 0', lineHeight: '1.6' }}>
                                    {tHub.heroDescription}
                                </p>
                                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    {!isRDMLS && (
                                        <button className="btn-vls-action-blue" onClick={() => setShowDirectory(true)} style={{ fontSize: '1rem', padding: '1rem 2rem', background: '#38bdf8', color: 'white', fontWeight: '900', border: 'none', borderRadius: '30px', cursor: 'pointer' }}>EXPLORAR SERVICIOS</button>
                                    )}
                                    {isRDMLS && (
                                        <button className="btn-vls-action-light" onClick={() => navigate('/induccion')} style={{ fontSize: '1rem', padding: '1rem 2rem', background: '#38bdf8', color: 'white', fontWeight: '900', border: 'none', borderRadius: '30px', cursor: 'pointer' }}>CENTRO DE FORMACIÓN</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ══════════════════════════════════════════════════════════ */}
                    {/* SUPER BANNER: PULSO CIUDADANO (PRINCIPAL ABAJO DE WELCOME) */}
                    {/* ══════════════════════════════════════════════════════════ */}
                    {isVLS && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={() => window.dispatchEvent(new CustomEvent('open-pulso-ciudadano'))}
                            style={{ 
                                margin: '2rem',
                                minHeight: '400px',
                                background: 'linear-gradient(135deg, #020617 0%, #1e1b4b 100%)',
                                borderRadius: '40px',
                                border: '1px solid rgba(56, 189, 248, 0.3)',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                position: 'relative',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                            }}
                            whileHover={{ scale: 1.01, borderColor: '#38bdf8' }}
                        >
                            <div style={{ position: 'absolute', inset: 0, opacity: 0.1, background: 'url("/grid_bg.png")' }}></div>
                            <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', maxWidth: '1200px', textAlign: 'center' }}>
                                <div style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid #38bdf8', padding: '8px 20px', borderRadius: '50px', color: '#38bdf8', fontWeight: 900, fontSize: '0.8rem', letterSpacing: '3px' }}>REPORTE EXTERNO · ACTIVA RESEARCH</div>
                                <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: 950, margin: 0, color: 'white', letterSpacing: '-3px', lineHeight: '0.9' }}>
                                    PULSO CIUDADANO
                                </h1>
                                
                                <div style={{ display: 'flex', gap: '2.5rem', marginTop: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '3rem', fontWeight: 950, color: '#ef4444' }}>54.4%</div>
                                        <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 900, textTransform: 'uppercase' }}>Desaprobación Presidencial</div>
                                    </div>
                                    <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)', height: '50px' }}></div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '3rem', fontWeight: 950, color: '#38bdf8' }}>31.2%</div>
                                        <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 900, textTransform: 'uppercase' }}>Aprobación Presidencial</div>
                                    </div>
                                    <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)', height: '50px' }}></div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '2.5rem', fontWeight: 950, color: '#38bdf8' }}>J. A. Kast</div>
                                        <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 900, textTransform: 'uppercase' }}>Aprobación (31.2%)</div>
                                    </div>
                                </div>

                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    style={{ background: 'linear-gradient(90deg, #38bdf8, #1d4ed8)', color: 'white', padding: '15px 50px', borderRadius: '50px', border: 'none', fontWeight: 950, fontSize: '1rem', marginTop: '1rem', boxShadow: '0 10px 30px rgba(58, 190, 248, 0.4)' }}
                                >
                                    EXPLORAR ANÁLISIS COMPLETO
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    {/* ══════════════════════════════════════════════════════════ */}
                    {/* TARJETÓN GRÁFICO: STELLA DÍAZ VARÍN (LA COLORINA)          */}
                    {/* ══════════════════════════════════════════════════════════ */}
                    {isVLS && (
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={() => {
                                navigate('/stella');
                                window.dispatchEvent(new CustomEvent('open-vls-stella'));
                                window.dispatchEvent(new CustomEvent('stella-force-maximize'));
                            }}
                            style={{ 
                                margin: '0 2rem 2rem 2rem',
                                minHeight: '300px',
                                background: 'linear-gradient(135deg, #450a0a 0%, #020617 100%)',
                                borderRadius: '40px',
                                border: '1px solid rgba(239, 68, 68, 0.4)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '2rem',
                                overflow: 'hidden',
                                position: 'relative',
                                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
                                padding: '2rem'
                            }}
                            whileHover={{ scale: 1.01, borderColor: '#ef4444' }}
                        >
                            <div style={{ position: 'absolute', right: '-50px', top: '0', bottom: '0', width: '50%', opacity: 0.4, maskImage: 'linear-gradient(to left, black, transparent)' }}>
                                <img src="/stella/stella_bg.png" alt="Stella" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', padding: '5px 15px', borderRadius: '50px', color: '#ef4444', fontWeight: 900, fontSize: '0.7rem', letterSpacing: '2px' }}>NUEVO ARCHIVO VLS</div>
                                    <div style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '5px 15px', borderRadius: '50px', color: 'white', fontWeight: 900, fontSize: '0.7rem', letterSpacing: '2px' }}>RADIO EN VIVO</div>
                                </div>
                                <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 950, margin: 0, color: 'white', letterSpacing: '-2px', lineHeight: '1' }}>
                                    STELLA DÍAZ VARÍN <br/> <span style={{ color: '#ef4444' }}>«LA COLORINA»</span>
                                </h2>
                                <p style={{ fontSize: '1.1rem', color: '#cbd5e1', margin: 0, lineHeight: '1.5' }}>
                                    Descubre el legado indómito de la poeta que estremeció la lírica chilena. Escucha su voz, recorre su historia y descarga su obra completa.
                                </p>
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            window.dispatchEvent(new CustomEvent('open-vls-stella'));
                                            window.dispatchEvent(new CustomEvent('stella-force-maximize'));
                                        }}
                                        style={{ background: '#ef4444', color: 'white', padding: '12px 30px', borderRadius: '50px', border: 'none', fontWeight: 950, cursor: 'pointer', boxShadow: '0 10px 20px rgba(239, 68, 68, 0.3)' }}
                                    >
                                        INGRESAR AL ESTUDIO
                                    </button>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigator.clipboard.writeText('https://www.vecinoslaserena.cl/stella');
                                            alert('¡Enlace de Stella copiado!');
                                        }}
                                        style={{ background: 'rgba(255,255,255,0.05)', color: 'white', padding: '12px 20px', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)', fontWeight: 950, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                                    >
                                        <Share2 size={18} /> COMPARTE
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

            {/* ═════════════════════════════════════════════════════════════ */}
            {/* PORTALES MAESTROS (ARRIBA): ARCADE, ALTAR & JUEGOS           */}
            {/* ═════════════════════════════════════════════════════════════ */}
            {!isRDMLS && (
            <div style={{
                width: '100%',
                background: '#050d1a',
                borderBottom: '2px solid rgba(255,215,0,0.4)',
                padding: '1.5rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1rem',
                boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                zIndex: 100,
                position: 'relative'
            }}>
                <div
                    onClick={() => { window.dispatchEvent(new CustomEvent('open-game')); navigate('/arcade'); }}
                    style={{
                        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.3) 0%, rgba(15, 23, 42, 0.6) 100%)',
                        border: '1px solid rgba(239, 68, 68, 0.6)',
                        borderRadius: '24px',
                        padding: '1.5rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.2rem',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                        backdropFilter: 'blur(10px)'
                    }}
                    onMouseEnter={e => { 
                        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'; 
                        e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 1)';
                        e.currentTarget.style.boxShadow = '0 25px 60px rgba(239, 68, 68, 0.25)';
                    }}
                    onMouseLeave={e => { 
                        e.currentTarget.style.transform = 'translateY(0) scale(1)'; 
                        e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.6)';
                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
                    }}
                >
                    <div style={{ background: 'linear-gradient(135deg, #ef4444, #991b1b)', borderRadius: '50%', width: '55px', height: '55px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 25px rgba(239, 68, 68, 0.4)', flexShrink: 0, border: '2px solid rgba(255,255,255,0.2)' }}>
                        <Joystick size={28} color="white" />
                    </div>
                    <div style={{ flex: 1, zIndex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '1.3rem', fontWeight: '950', color: '#fca5a5', textShadow: '0 0 15px rgba(239, 68, 68, 0.6)' }}>ARCADE ZONE</span>
                            <span style={{ background: '#ef4444', color: 'white', fontSize: '0.6rem', fontWeight: '900', padding: '2px 8px', borderRadius: '10px' }}>PLAY CENTER</span>
                        </div>
                        <p style={{ color: 'rgba(252, 165, 165, 0.9)', fontSize: '0.85rem', margin: '4px 0 0 0', fontWeight: '500' }}>Pinball, Juegos 3D y Desafíos</p>
                    </div>
                </div>

                {/* Tarjeta 2: SMART CITIZENS (ATENCIÓN CIUDADANA) */}
                <div
                    onClick={() => navigate('/citizens')}
                    style={{
                        background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.3) 0%, rgba(15, 23, 42, 0.6) 100%)',
                        border: '1px solid rgba(14, 165, 233, 0.6)',
                        borderRadius: '24px',
                        padding: '1.5rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.2rem',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                        backdropFilter: 'blur(10px)'
                    }}
                    onMouseEnter={e => { 
                        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'; 
                        e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 1)';
                        e.currentTarget.style.boxShadow = '0 25px 60px rgba(14, 165, 233, 0.25)';
                    }}
                    onMouseLeave={e => { 
                        e.currentTarget.style.transform = 'translateY(0) scale(1)'; 
                        e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.6)';
                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
                    }}
                >
                    <div style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', borderRadius: '50%', width: '55px', height: '55px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 25px rgba(14, 165, 233, 0.4)', flexShrink: 0, border: '2px solid rgba(255,255,255,0.2)' }}>
                        <Users size={28} color="white" />
                    </div>
                    <div style={{ flex: 1, zIndex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '1.3rem', fontWeight: '950', color: '#38bdf8', textShadow: '0 0 15px rgba(56, 189, 248, 0.6)' }}>SMART CITIZENS</span>
                            <span style={{ background: '#0ea5e9', color: 'white', fontSize: '0.6rem', fontWeight: '900', padding: '2px 8px', borderRadius: '10px' }}>ATENCIÓN</span>
                        </div>
                        <p style={{ color: 'rgba(125, 211, 252, 0.9)', fontSize: '0.85rem', margin: '4px 0 0 0', fontWeight: '500' }}>Reportes Vecinales y Monitoreo</p>
                    </div>
                </div>

                {/* Tarjeta 3: SMART ADMINISTRATION (GESTIÓN INTERNA) - OCULTO EN VECINOS POR REGLA DE SEGURIDAD */}
                {isRDMLS && (
                    <div
                        onClick={() => navigate('/honorarios')}
                        style={{
                            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(15, 23, 42, 0.6) 100%)',
                            border: '1px solid rgba(34, 197, 94, 0.6)',
                            borderRadius: '24px',
                            padding: '1.5rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1.2rem',
                            position: 'relative',
                            overflow: 'hidden',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                            backdropFilter: 'blur(10px)'
                        }}
                        onMouseEnter={e => { 
                            e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'; 
                            e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 1)';
                            e.currentTarget.style.boxShadow = '0 25px 60px rgba(34, 197, 94, 0.25)';
                        }}
                        onMouseLeave={e => { 
                            e.currentTarget.style.transform = 'translateY(0) scale(1)'; 
                            e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.6)';
                            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
                        }}
                    >
                        <div style={{ background: 'linear-gradient(135deg, #22c55e, #15803d)', borderRadius: '50%', width: '55px', height: '55px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 25px rgba(34, 197, 94, 0.4)', flexShrink: 0, border: '2px solid rgba(255,255,255,0.2)' }}>
                            <Database size={28} color="white" />
                        </div>
                        <div style={{ flex: 1, zIndex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '1.3rem', fontWeight: '950', color: '#4ade80', textShadow: '0 0 15px rgba(74, 222, 128, 0.6)' }}>SMART ADMIN</span>
                                <span style={{ background: '#16a34a', color: 'white', fontSize: '0.6rem', fontWeight: '900', padding: '2px 8px', borderRadius: '10px' }}>GESTIÓN</span>
                            </div>
                            <p style={{ color: 'rgba(187, 247, 208, 0.9)', fontSize: '0.85rem', margin: '4px 0 0 0', fontWeight: '500' }}>Informes RRHH & E-learning</p>
                        </div>
                    </div>
                )}

                {/* Tarjeta 4: SMART EVENTS (PROTOCOLO) - OCULTO EN VECINOS POR REGLA DE PROTOCOLO MUNICIPAL */}
                {isRDMLS && (
                    <div
                        onClick={() => navigate('/protocolo')}
                        style={{
                            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(15, 23, 42, 0.6) 100%)',
                            border: '1px solid rgba(245, 158, 11, 0.6)',
                            borderRadius: '24px',
                            padding: '1.5rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1.2rem',
                            position: 'relative',
                            overflow: 'hidden',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                            backdropFilter: 'blur(10px)'
                        }}
                        onMouseEnter={e => { 
                            e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'; 
                            e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 1)';
                            e.currentTarget.style.boxShadow = '0 25px 60px rgba(245, 158, 11, 0.25)';
                        }}
                        onMouseLeave={e => { 
                            e.currentTarget.style.transform = 'translateY(0) scale(1)'; 
                            e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.6)';
                            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
                        }}
                    >
                        <div style={{ background: 'linear-gradient(135deg, #f59e0b, #b45309)', borderRadius: '50%', width: '55px', height: '55px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 25px rgba(245, 158, 11, 0.4)', flexShrink: 0, border: '2px solid rgba(255,255,255,0.2)' }}>
                            <Users size={28} color="white" />
                        </div>
                        <div style={{ flex: 1, zIndex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '1.3rem', fontWeight: '950', color: '#fbbf24', textShadow: '0 0 15px rgba(245, 158, 11, 0.6)' }}>SMART EVENTS</span>
                                <span style={{ background: '#f59e0b', color: 'white', fontSize: '0.6rem', fontWeight: '900', padding: '2px 8px', borderRadius: '10px' }}>PROTOCOLO</span>
                            </div>
                            <p style={{ color: 'rgba(251, 191, 36, 0.9)', fontSize: '0.85rem', margin: '4px 0 0 0', fontWeight: '500' }}>Monitor de Precedencias</p>
                        </div>
                    </div>
                )}

                {/* NUEVA TARJETA: ARCHIVO DE ALCALDES 3D - VISIBLE PARA TODOS (Soberanía Cultural VLS) */}
                <div
                    onClick={handleAlcaldes}
                    style={{
                        background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.1) 0%, rgba(15, 23, 42, 0.6) 100%)',
                        border: '1px solid rgba(56, 189, 248, 0.4)',
                        borderRadius: '24px',
                        padding: '1.5rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.2rem',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                        backdropFilter: 'blur(10px)'
                    }}
                    onMouseEnter={e => { 
                        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'; 
                        e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 1)';
                        e.currentTarget.style.boxShadow = '0 25px 60px rgba(56, 189, 248, 0.25)';
                    }}
                    onMouseLeave={e => { 
                        e.currentTarget.style.transform = 'translateY(0) scale(1)'; 
                        e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
                    }}
                >
                    <div style={{ background: 'linear-gradient(135deg, #38bdf8, #1e40af)', borderRadius: '50%', width: '55px', height: '55px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 25px rgba(56, 189, 248, 0.4)', flexShrink: 0, border: '2px solid rgba(255,255,255,0.2)' }}>
                        <Landmark size={28} color="white" />
                    </div>
                    <div style={{ flex: 1, zIndex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '1.1rem', fontWeight: '950', color: '#7dd3fc', textShadow: '0 0 15px rgba(58, 189, 248, 0.6)' }}>ARCHIVO HISTÓRICO</span>
                            <span style={{ background: '#0ea5e9', color: 'white', fontSize: '0.6rem', fontWeight: '900', padding: '2px 8px', borderRadius: '10px' }}>ALCALDES</span>
                        </div>
                        <p style={{ color: 'rgba(186, 230, 253, 0.9)', fontSize: '0.8rem', margin: '4px 0 0 0', fontWeight: '500' }}>Línea de Tiempo 1944-2028</p>
                    </div>
                </div>

                {/* Tarjeta 5: SMART LISTENING (CENTINEL FARO IA) */}
                <div
                    onClick={() => window.dispatchEvent(new CustomEvent('open-faro'))}
                    style={{
                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(15, 23, 42, 0.6) 100%)',
                        border: '1px solid rgba(16, 185, 129, 0.6)',
                        borderRadius: '24px',
                        padding: '1.5rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.2rem',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                        backdropFilter: 'blur(10px)'
                    }}
                    onMouseEnter={e => { 
                        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'; 
                        e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 1)';
                        e.currentTarget.style.boxShadow = '0 25px 60px rgba(16, 185, 129, 0.25)';
                    }}
                    onMouseLeave={e => { 
                        e.currentTarget.style.transform = 'translateY(0) scale(1)'; 
                        e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.6)';
                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
                    }}
                >
                    <div style={{ background: 'linear-gradient(135deg, #10b981, #064e3b)', borderRadius: '50%', width: '55px', height: '55px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 25px rgba(16, 185, 129, 0.4)', flexShrink: 0, border: '2px solid rgba(255,255,255,0.2)' }}>
                        <Bot size={28} color="white" />
                    </div>
                    <div style={{ flex: 1, zIndex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '1.3rem', fontWeight: '950', color: '#10b981', textShadow: '0 0 15px rgba(16, 185, 129, 0.6)' }}>SMART LISTENING</span>
                            <span style={{ background: '#10b981', color: 'white', fontSize: '0.6rem', fontWeight: '900', padding: '2px 8px', borderRadius: '10px' }}>FARO IA</span>
                        </div>
                        <p style={{ color: 'rgba(167, 243, 208, 0.9)', fontSize: '0.85rem', margin: '4px 0 0 0', fontWeight: '500' }}>Inteligencia y Social Listening</p>
                    </div>
                </div>
                {/* Tarjeta 6: SMART JUEGAPRENDE (VALSABES) */}
                <div
                    onClick={() => { window.dispatchEvent(new CustomEvent('open-vls-game')); }}
                    style={{
                        background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.1) 0%, rgba(15, 23, 42, 0.6) 100%)',
                        border: '1px solid rgba(250, 204, 21, 0.6)',
                        borderRadius: '24px',
                        padding: '1.5rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.2rem',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                        backdropFilter: 'blur(10px)'
                    }}
                    onMouseEnter={e => { 
                        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'; 
                        e.currentTarget.style.borderColor = 'rgba(250, 204, 21, 1)';
                        e.currentTarget.style.boxShadow = '0 25px 60px rgba(250, 204, 21, 0.25)';
                    }}
                    onMouseLeave={e => { 
                        e.currentTarget.style.transform = 'translateY(0) scale(1)'; 
                        e.currentTarget.style.borderColor = 'rgba(250, 204, 21, 0.6)';
                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
                    }}
                >
                    <div style={{ background: 'linear-gradient(135deg, #facc15, #854d0e)', borderRadius: '50%', width: '55px', height: '55px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 25px rgba(250, 204, 21, 0.4)', flexShrink: 0, border: '2px solid rgba(255,255,255,0.2)' }}>
                        <Trophy size={28} color="white" />
                    </div>
                    <div style={{ flex: 1, zIndex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '1.3rem', fontWeight: '950', color: '#facc15', textShadow: '0 0 15px rgba(234, 179, 8, 0.4)' }}>VLSabes?</span>
                            <span style={{ background: '#ca8a04', color: 'white', fontSize: '0.6rem', fontWeight: '900', padding: '2px 8px', borderRadius: '10px' }}>EDUCATIVO</span>
                        </div>
                        <p style={{ color: 'rgba(250, 204, 21, 0.9)', fontSize: '0.85rem', margin: '4px 0 0 0', fontWeight: '500' }}>Cultura, Historia y Desafíos</p>
                    </div>
                </div>

                {/* Tarjeta 7: CUADRO DE DISTANCIAS RADAR */}
                <div
                    onClick={() => navigate('/distancias')}
                    style={{
                        background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(15, 23, 42, 0.6) 100%)',
                        border: '1px solid rgba(56, 189, 248, 0.6)',
                        borderRadius: '24px',
                        padding: '1.5rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.2rem',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                        backdropFilter: 'blur(10px)'
                    }}
                    onMouseEnter={e => { 
                        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'; 
                        e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 1)';
                        e.currentTarget.style.boxShadow = '0 25px 60px rgba(56, 189, 248, 0.25)';
                    }}
                    onMouseLeave={e => { 
                        e.currentTarget.style.transform = 'translateY(0) scale(1)'; 
                        e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.6)';
                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
                    }}
                >
                    <div style={{ background: 'linear-gradient(135deg, #38bdf8, #1d4ed8)', borderRadius: '50%', width: '55px', height: '55px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 25px rgba(58, 190, 248, 0.4)', flexShrink: 0, border: '2px solid rgba(255,255,255,0.2)' }}>
                        <MapPin size={28} color="white" />
                    </div>
                    <div style={{ flex: 1, zIndex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '1.3rem', fontWeight: '950', color: '#38bdf8', textShadow: '0 0 15px rgba(58, 190, 248, 0.6)' }}>RADAR VLS</span>
                            <span style={{ background: '#38bdf8', color: 'white', fontSize: '0.6rem', fontWeight: '900', padding: '2px 8px', borderRadius: '10px' }}>MAPA</span>
                        </div>
                        <p style={{ color: 'rgba(125, 211, 252, 0.9)', fontSize: '0.85rem', margin: '4px 0 0 0', fontWeight: '500' }}>Cuadro de Distancias Interactivo</p>
                    </div>
                </div>

                {/* Tarjeta 8: PORTAL DOMEYKO */}
                <div
                    onClick={() => navigate('/domeyko')}
                    style={{
                        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
                        border: '1px solid rgba(56, 189, 248, 0.6)',
                        borderRadius: '20px',
                        padding: '1.2rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 0 30px rgba(56, 189, 248, 0.15)'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.9)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.6)'; }}
                >
                    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/domeyko/VLSinfographic_DOMEYKO.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1, mixBlendMode: 'screen', pointerEvents: 'none' }} />
                    <div style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(56, 189, 248, 0.5)', flexShrink: 0 }}>
                        <GraduationCap size={26} color="white" />
                    </div>
                    <div style={{ flex: 1, zIndex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '1.3rem', fontWeight: '950', color: '#38bdf8', textShadow: '0 0 15px rgba(56, 189, 248, 0.6)' }}>DOMEYKO</span>
                            <span style={{ background: '#38bdf8', color: 'white', fontSize: '0.6rem', fontWeight: '900', padding: '2px 8px', borderRadius: '10px' }}>CIENCIA</span>
                        </div>
                        <p style={{ color: 'rgba(56, 189, 248, 0.9)', fontSize: '0.85rem', margin: '4px 0 0 0', fontWeight: '500' }}>Legado Naturalista en Chile</p>
                    </div>
                </div>

                {/* Tarjeta 9: PORTAL LAMBERT */}
                <div
                    onClick={() => navigate('/lambert')}
                    style={{
                        background: 'linear-gradient(135deg, #0f172a 0%, #451a03 100%)',
                        border: '1px solid rgba(245, 158, 11, 0.6)',
                        borderRadius: '20px',
                        padding: '1.2rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 0 30px rgba(245, 158, 11, 0.15)'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.9)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.6)'; }}
                >
                    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/lambert/infographic_clean_unnamed (68).png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1, mixBlendMode: 'screen', pointerEvents: 'none' }} />
                    <div style={{ background: 'linear-gradient(135deg, #f59e0b, #451a03)', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(245, 158, 11, 0.5)', flexShrink: 0 }}>
                        <Zap size={26} color="white" />
                    </div>
                    <div style={{ flex: 1, zIndex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '1.3rem', fontWeight: '950', color: '#f59e0b', textShadow: '0 0 15px rgba(245, 158, 11, 0.6)' }}>LAMBERT</span>
                            <span style={{ background: '#f59e0b', color: 'white', fontSize: '0.6rem', fontWeight: '900', padding: '2px 8px', borderRadius: '10px' }}>INDUSTRIA</span>
                        </div>
                        <p style={{ color: 'rgba(245, 158, 11, 0.9)', fontSize: '0.85rem', margin: '4px 0 0 0', fontWeight: '500' }}>Revolución del Cobre en Coquimbo</p>
                    </div>
                </div>
            </div>
            )}



                {/* ══════════════════════════════════════════════════════════ */}
                {/* HIGHLIGHTS: ACCIONA, DIPRES & PULSO (PERIODISMO DE DATOS)   */}
                {/* ══════════════════════════════════════════════════════════ */}
                <div style={{ padding: '0 1.5rem 3rem', maxWidth: '1400px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 1024 ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {/* 1 DE MAYO PORTAL */}
                        <motion.div 
                            whileHover={{ y: -5 }}
                            onClick={() => navigate('/1demayo')}
                            style={{ 
                                background: 'linear-gradient(135deg, #450a0a 0%, #0f172a 100%)', padding: '1.5rem', borderRadius: '24px', 
                                border: '2px solid #d97706', cursor: 'pointer', backdropFilter: 'blur(20px)',
                                display: 'flex', flexDirection: 'column', gap: '0.8rem', boxShadow: '0 10px 30px rgba(217, 119, 6, 0.2)'
                            }}
                        >
                            <div style={{ background: '#d9770620', color: '#d97706', padding: '4px 12px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 900, alignSelf: 'start', border: '1px solid #d97706' }}>EFEMÉRIDE HOY</div>
                            <h4 style={{ margin: 0, color: 'white', fontSize: '1.2rem', fontWeight: 900 }}>1 de Mayo: Día del Trabajador</h4>
                            <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.4 }}>Portal Conmemorativo: Historia, Mártires de Chicago e hitos nacionales.</p>
                            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '8px', color: '#d97706', fontWeight: 900, fontSize: '0.75rem' }}>INGRESAR AL PORTAL <ArrowRight size={14} /></div>
                        </motion.div>
                        {/* ACCIONA MUJERES */}
                        <motion.div 
                            whileHover={{ y: -5 }}
                            onClick={() => window.dispatchEvent(new CustomEvent('open-vls-acciona'))}
                            style={{ 
                                background: 'rgba(15, 23, 42, 0.4)', padding: '1.5rem', borderRadius: '24px', 
                                border: '2px solid #ef4444', cursor: 'pointer', backdropFilter: 'blur(20px)',
                                display: 'flex', flexDirection: 'column', gap: '0.8rem', boxShadow: '0 10px 30px rgba(239, 68, 68, 0.1)'
                            }}
                        >
                            <div style={{ background: '#ef444420', color: '#ef4444', padding: '4px 12px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 900, alignSelf: 'start', border: '1px solid #ef4444' }}>OPORTUNIDADES</div>
                            <h4 style={{ margin: 0, color: 'white', fontSize: '1.2rem', fontWeight: 900 }}>Acciona Mujeres</h4>
                            <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.4 }}>Capacitación exclusiva en construcción para el nuevo hospital.</p>
                            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', fontWeight: 900, fontSize: '0.75rem' }}>POSTULAR ONLINE <ArrowRight size={14} /></div>
                        </motion.div>

                        {/* PULSO CIUDADANO NEW REPORT */}
                        <motion.div 
                            whileHover={{ y: -5 }}
                            onClick={() => window.dispatchEvent(new CustomEvent('open-pulso-ciudadano'))}
                            style={{ 
                                background: 'rgba(15, 23, 42, 0.4)', padding: '1.5rem', borderRadius: '24px', 
                                border: '2px solid #38bdf8', cursor: 'pointer', backdropFilter: 'blur(20px)',
                                display: 'flex', flexDirection: 'column', gap: '0.8rem', boxShadow: '0 10px 30px rgba(56, 189, 248, 0.1)'
                            }}
                        >
                            <div style={{ background: '#38bdf820', color: '#38bdf8', padding: '4px 12px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 900, alignSelf: 'start', border: '1px solid #38bdf8' }}>NUEVO REPORTE</div>
                            <h4 style={{ margin: 0, color: 'white', fontSize: '1.2rem', fontWeight: 900 }}>Pulso Ciudadano Abril</h4>
                            <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.4 }}>Análisis de percepción social y opinión pública Q1-2025.</p>
                            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', fontWeight: 900, fontSize: '0.75rem' }}>VER ESTUDIO <BarChart3 size={14} /></div>
                        </motion.div>

                        {/* GESTIÓN DIPRES */}
                        <motion.div 
                            whileHover={{ y: -5 }}
                            onClick={() => window.dispatchEvent(new CustomEvent('open-vls-alcaldesa', { detail: { noteId: 'dipres_gestion' } }))}
                            style={{ 
                                background: 'rgba(15, 23, 42, 0.4)', padding: '1.5rem', borderRadius: '24px', 
                                border: '2px solid #38bdf8', cursor: 'pointer', backdropFilter: 'blur(20px)',
                                display: 'flex', flexDirection: 'column', gap: '0.8rem', boxShadow: '0 10px 30px rgba(56, 189, 248, 0.1)'
                            }}
                        >
                            <div style={{ background: '#38bdf820', color: '#38bdf8', padding: '4px 12px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 900, alignSelf: 'start', border: '1px solid #38bdf8' }}>HITOS VECINALES</div>
                            <h4 style={{ margin: 0, color: 'white', fontSize: '1.2rem', fontWeight: 900 }}>Gestión DIPRES</h4>
                            <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.4 }}>Reunión en Santiago para destrabar recursos históricos.</p>
                            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', fontWeight: 900, fontSize: '0.75rem' }}>VER GESTIÓN <ArrowRight size={14} /></div>
                        </motion.div>
                    </div>
                </div>

                {/* ══════════════════════════════════════════════════════════ */}
                {/* NOTICIAS DE HOY: GESTIÓN Y EVENTOS (Marea Humana & Alcaldesa) */}
                {/* ══════════════════════════════════════════════════════════ */}
                <div style={{ padding: '3rem 1.5rem', maxWidth: '1400px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>

                    <div className="vls-perf-section" style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 1024 ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2.5rem' }}>
                        
                        {/* CARD 0: SALUD LA SERENA (TOP HIGHLIGHT) */}
                        <motion.div 
                            initial={isMobile ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
                            whileInView={isMobile ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            onClick={() => navigate('/salud')}
                            style={{ 
                                position: 'relative', minHeight: isMobile ? '220px' : '520px', borderRadius: '40px', overflow: 'hidden', 
                                border: '2px solid rgba(239, 68, 68, 0.4)', boxShadow: '0 30px 60px rgba(239, 68, 68, 0.2)',
                                cursor: 'pointer', background: '#020617', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                                gridColumn: '1 / -1' // SPANS THE ENTIRE FIRST ROW!
                            }}
                            whileHover={{ y: -10, transition: { duration: 0.3 } }}
                        >
                            <img src="/salud/VLS_Nueva_Salud_La_Serena.jpg" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.6 }} alt="Salud La Serena" />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(2, 6, 23, 1) 0%, rgba(2, 6, 23, 0.8) 40%, transparent 100%)' }} />
                            
                            <div style={{ 
                                position: 'absolute', top: window.innerWidth < 768 ? 15 : 30, right: window.innerWidth < 768 ? 15 : 30, 
                                background: '#ef4444', padding: window.innerWidth < 768 ? '0.4rem 1rem' : '0.6rem 1.8rem', borderRadius: '30px', 
                                color: 'white', fontWeight: 950, fontSize: 'clamp(0.65rem, 2vw, 0.9rem)', letterSpacing: window.innerWidth < 768 ? '1px' : '2px', 
                                zIndex: 20, boxShadow: '0 10px 20px rgba(239, 68, 68, 0.5)' 
                            }}>
                                🎙️ NUEVO REPORTAJE VLS
                            </div>
 
                            <div style={{ position: 'relative', padding: window.innerWidth < 768 ? '1.5rem' : '3rem', zIndex: 10, maxWidth: '1000px', paddingTop: window.innerWidth < 768 ? '4rem' : '3rem' }}>
                                <h2 style={{ color: 'white', fontSize: 'clamp(1.5rem, 5.5vw, 3.8rem)', fontWeight: 950, margin: 0, letterSpacing: '-1px', lineHeight: 1.05 }}>
                                   CRUZADA VECINAL:<br/>
                                   <span style={{ color: '#ef4444' }}>AL RESCATE DE LA SALUD<br className="lg:hidden" style={{ display: window.innerWidth < 768 ? 'block' : 'none' }}/> EN LA SERENA</span>
                                </h2>
                                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 'clamp(0.95rem, 2vw, 1.4rem)', marginTop: '1rem', fontWeight: 400, maxWidth: '800px', lineHeight: 1.4 }}>
                                   El "Plan Norambuena" busca extirpar el déficit histórico y rescatar la atención primaria. Descubre en exclusiva el plan de acción, estadísticas clave, podcast inmersivo y respaldos oficiales.
                                </p>
                                <button className="btn-vls-action-light" style={{ marginTop: window.innerWidth < 768 ? '1.5rem' : '2rem', background: '#ef4444', color: 'white', border: 'none', padding: window.innerWidth < 768 ? '0.8rem 1.5rem' : '1rem 2rem', fontSize: window.innerWidth < 768 ? '0.9rem' : '1rem' }}>
                                   ENTRAR A LA NOTA CENTRAL
                                </button>
                            </div>
                        </motion.div>
                        
 

                          {/* CARD 4: ARTE & ARQUITECTURA (EDUARDO GARDELLA) */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            onClick={() => navigate('/gardella')}
                            style={{ 
                                position: 'relative', minHeight: '480px', borderRadius: '40px', overflow: 'hidden', 
                                border: '2px solid rgba(168, 85, 247, 0.4)', boxShadow: '0 30px 60px rgba(168, 85, 247, 0.2)',
                                cursor: 'pointer', background: '#020617',
                                gridColumn: window.innerWidth < 1024 ? 'auto' : 'span 2',
                                display: 'flex', flexDirection: 'column', justifyContent: 'center'
                            }}
                            whileHover={{ scale: 1.005 }}
                        >
                            <img src="/media/arquiartista/Eduardo_Auto.png" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} alt="Ilustración Eduardo Gardella" />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #020617 35%, rgba(2, 6, 23, 0.5) 75%, transparent 100%)' }} />
                            
                            <div style={{ 
                                position: 'absolute', top: 35, right: 30, 
                                background: '#a855f7', padding: '0.6rem 1.8rem', borderRadius: '30px', 
                                color: 'white', fontWeight: 950, fontSize: 'clamp(0.7rem, 2vw, 0.9rem)', letterSpacing: '2px',
                                zIndex: 10
                            }}>
                                TALENTO LOCAL
                            </div>
 
                            <div style={{ position: 'relative', padding: '3rem', zIndex: 10, maxWidth: '850px' }}>
                                <h2 style={{ color: 'white', fontSize: 'clamp(2rem, 5vw, 3.8rem)', fontWeight: 950, margin: 0, letterSpacing: '-2px', lineHeight: 1 }}>
                                    GALERÍA PREMIUM:<br/>
                                    <span style={{ color: '#d8b4fe' }}>EDUARDO GARDELLA</span>
                                </h2>
                                <p style={{ color: 'rgba(255,255,255,1)', fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', marginTop: '1.5rem', fontWeight: 300, lineHeight: 1.4, fontStyle: 'italic' }}>
                                    "El trazo que captura el alma de la Región." Explora ilustraciones hiperrealistas en grafito de este artista vallenarino.
                                </p>
                                <button className="btn-vls-action-light" style={{ marginTop: '2.5rem', background: '#a855f7', color: 'white', border: 'none', padding: '1rem 3rem', borderRadius: '50px' }}>
                                    EXPLORAR PORTAFOLIO COMPLETO
                                </button>
                            </div>
                        </motion.div>

                        {/* CARD 1: CORRIDA FAMILIAR - MAREA HUMANA (MOVED DOWN) */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            onClick={() => window.dispatchEvent(new CustomEvent('open-vls-alcaldesa', { detail: { noteId: 'corrida_familiar' } }))}
                            style={{ 
                                position: 'relative', minHeight: isMobile ? '220px' : '520px', borderRadius: '40px', overflow: 'hidden', 
                                border: '2px solid rgba(239, 68, 68, 0.4)', boxShadow: '0 30px 60px rgba(239, 68, 68, 0.2)',
                                cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                                gridColumn: window.innerWidth < 1024 ? 'auto' : 'span 1'
                            }}
                            whileHover={{ y: -10, transition: { duration: 0.3 } }}
                        >
                            <img src="/alcaldesa_corrida/Foto corrida avenida del mar la serena 110426.jpeg" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} alt="Marea Humana" />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #020617 0%, rgba(2, 6, 23, 0.8) 40%, transparent 100%)' }} />
                            
                            <div style={{ 
                                position: 'absolute', top: 30, right: 30, 
                                background: '#ef4444', padding: '0.6rem 1.8rem', borderRadius: '30px', 
                                color: 'white', fontWeight: 950, fontSize: 'clamp(0.7rem, 2vw, 0.9rem)', letterSpacing: '2px', 
                                zIndex: 10, boxShadow: '0 10px 20px rgba(239, 68, 68, 0.5)' 
                            }}>
                                EVENTO MASIVO
                            </div>

                            <div style={{ position: 'relative', padding: '3rem', zIndex: 10 }}>
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                                    <h2 style={{ color: 'white', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 950, margin: 0, letterSpacing: '-2px', lineHeight: 0.95 }}>
                                        MAREA HUMANA:<br/>
                                        <span style={{ color: '#ef4444' }}>4.000 PERSONAS </span><br/> 
                                        EN LA AV. DEL MAR
                                    </h2>
                                    <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 'clamp(1rem, 3vw, 1.25rem)', marginTop: '1.2rem', fontWeight: 500, maxWidth: '550px', lineHeight: 1.4 }}>
                                        Éxito rotundo en la Corrida Familiar. La Serena se mueve con soberanía y deporte vecinal.
                                    </p>
                                    <div className="flex flex-wrap gap-4 mt-8">
                                        <button className="btn-vls-action-light" style={{ background: '#ef4444', color: 'white', border: 'none', padding: '1rem 2rem' }}>
                                            LEER CRÓNICA
                                        </button>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                        {/* CARD 2: ALCALDESA GESTIÓN (MOVED DOWN) */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            onClick={() => window.dispatchEvent(new CustomEvent('open-vls-alcaldesa'))}
                            style={{ 
                                position: 'relative', minHeight: isMobile ? '220px' : '520px', borderRadius: '40px', overflow: 'hidden', 
                                border: '2px solid rgba(56, 189, 248, 0.4)', boxShadow: '0 30px 60px rgba(56, 189, 248, 0.2)',
                                cursor: 'pointer', background: '#020617', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                                gridColumn: window.innerWidth < 1024 ? 'auto' : 'span 1'
                            }}
                            whileHover={{ y: -10, transition: { duration: 0.3 } }}
                        >
                            <img src="/alcaldesa_daniela_norambuena.png" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', opacity: 0.9 }} alt="Alcaldesa" />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #020617 0%, rgba(2, 6, 23, 0.8) 40%, transparent 100%)' }} />
                            
                                <div style={{ 
                                    position: 'absolute', top: 30, right: 30, 
                                    background: '#38bdf8', padding: '0.6rem 1.8rem', borderRadius: '30px', 
                                    color: 'white', fontWeight: 950, fontSize: 'clamp(0.7rem, 2vw, 0.9rem)', letterSpacing: '2px', 
                                    zIndex: 20, boxShadow: '0 10px 20px rgba(56, 189, 248, 0.5)' 
                                }}>
                                    GESTIÓN ESTRATÉGICA
                                </div>
 
                            <div style={{ position: 'relative', padding: '3rem', zIndex: 10 }}>
                                <h2 style={{ color: 'white', fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 950, margin: 0, letterSpacing: '-2px', lineHeight: 0.95 }}>
                                   AVANCE Y SOBERANÍA:<br/>
                                   <span style={{ color: '#38bdf8' }}>PORTAL GESTIÓN</span>
                                </h2>
                                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 'clamp(0.9rem, 2.5vw, 1.25rem)', marginTop: '1.2rem', fontWeight: 400, maxWidth: '450px', lineHeight: 1.4 }}>
                                   Conoce los pilares de la gestión actual y el compromiso de la Alcaldesa Daniela Norambuena con la comuna.
                                </p>
                                <button className="btn-vls-action-light" style={{ marginTop: '2rem', background: '#38bdf8', color: 'white', border: 'none', padding: '1rem 2rem' }}>
                                   ENTRAR AL PORTAL
                                </button>
                            </div>
                        </motion.div>

                        {/* CARD 5: JVRCH - ELECCIONES COMUNIDADES DE AGUAS */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            onClick={() => {
                                navigate('/choapa');
                                window.dispatchEvent(new CustomEvent('open-vls-choapa'));
                            }}
                            style={{ 
                                position: 'relative', minHeight: isMobile ? '220px' : '520px', borderRadius: '40px', overflow: 'hidden', 
                                border: '2px solid rgba(59, 130, 246, 0.4)', boxShadow: '0 30px 60px rgba(59, 130, 246, 0.2)',
                                cursor: 'pointer', background: '#020617', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                                gridColumn: window.innerWidth < 1024 ? 'auto' : 'span 1'
                            }}
                            whileHover={{ y: -10, transition: { duration: 0.3 } }}
                        >
                            <img src="/jvrch/foto_referencial_choapa.jpg" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} alt="JVRCH" />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0a1628 0%, rgba(10, 22, 40, 0.8) 40%, transparent 100%)' }} />
                            
                            <div style={{ 
                                position: 'absolute', top: 30, right: 30, 
                                background: '#1d4ed8', padding: '0.6rem 1.8rem', borderRadius: '30px', 
                                color: 'white', fontWeight: 950, fontSize: 'clamp(0.7rem, 2vw, 0.9rem)', letterSpacing: '2px', 
                                zIndex: 20
                            }}>
                                AGUAS SOBERANAS
                            </div>
 
                            <div style={{ position: 'relative', padding: '3rem', zIndex: 10 }}>
                                <h2 style={{ color: 'white', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 950, margin: 0, letterSpacing: '-1.5px', lineHeight: 1 }}>
                                   CHOAPA: ELECCIONES<br/>
                                   <span style={{ color: '#60a5fa' }}>COMUNIDADES DE AGUAS</span>
                                </h2>
                                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem', marginTop: '1.2rem', fontWeight: 400, maxWidth: '450px', lineHeight: 1.4 }}>
                                   Llamado a regularizar procesos de renovación de directorios. Seguridad jurídica para la cuenca.
                                </p>
                                <button className="btn-vls-action-light" style={{ marginTop: '2rem', background: '#1d4ed8', color: 'white', border: 'none', padding: '0.8rem 1.8rem', borderRadius: '50px' }}>
                                   VER COMUNICADO
                                </button>
                            </div>
                        </motion.div>

                        {/* CARD 6: RED SALAS DE CINE - TALLERES GRATUITOS */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            onClick={() => {
                                navigate('/redcine');
                                window.dispatchEvent(new CustomEvent('open-vls-redcine'));
                            }}
                            style={{ 
                                position: 'relative', minHeight: isMobile ? '220px' : '520px', borderRadius: '40px', overflow: 'hidden', 
                                border: '2px solid rgba(244, 63, 94, 0.4)', boxShadow: '0 30px 60px rgba(244, 63, 94, 0.2)',
                                cursor: 'pointer', background: '#020617', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                                gridColumn: window.innerWidth < 1024 ? 'auto' : 'span 1'
                            }}
                            whileHover={{ y: -10, transition: { duration: 0.3 } }}
                        >
                            <img src="/redcine/taller1.jpg" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} alt="Red Cine" />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0f172a 0%, rgba(15, 23, 42, 0.8) 40%, transparent 100%)' }} />
                            
                            <div style={{ 
                                position: 'absolute', top: 30, right: 30, 
                                background: '#f43f5e', padding: '0.6rem 1.8rem', borderRadius: '30px', 
                                color: 'white', fontWeight: 950, fontSize: 'clamp(0.7rem, 2vw, 0.9rem)', letterSpacing: '2px', 
                                zIndex: 20
                            }}>
                                FORMACIÓN CULTURAL
                            </div>
 
                            <div style={{ position: 'relative', padding: '3rem', zIndex: 10 }}>
                                <h2 style={{ color: 'white', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 950, margin: 0, letterSpacing: '-1.5px', lineHeight: 1 }}>
                                   RED SALAS DE CINE:<br/>
                                   <span style={{ color: '#fb7185' }}>TALLERES GRATUITOS</span>
                                </h2>
                                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem', marginTop: '1.2rem', fontWeight: 400, maxWidth: '450px', lineHeight: 1.4 }}>
                                   Cineclubismo y curatoría. Convocatoria abierta para gestores y amantes del séptimo arte.
                                </p>
                                <button className="btn-vls-action-light" style={{ marginTop: '2rem', background: '#f43f5e', color: 'white', border: 'none', padding: '0.8rem 1.8rem', borderRadius: '50px' }}>
                                   INSCRIBIRSE AHORA
                                </button>
                            </div>
                        </motion.div>

                        {/* CARD AKICHIP MASTER (GRAND TARJETÓN CENTRAL - REPLACING EDUCATIVO) */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            onClick={() => navigate('/akichip')}
                            style={{ 
                                position: 'relative', 
                                minHeight: '600px', 
                                borderRadius: '40px', 
                                overflow: 'hidden', 
                                border: '3px solid rgba(153, 27, 27, 0.6)', 
                                boxShadow: '0 50px 100px -20px rgba(153, 27, 27, 0.4)',
                                cursor: 'pointer', 
                                background: '#020617',
                                gridColumn: '1 / -1', 
                                display: 'flex', 
                                flexDirection: 'column', 
                                justifyContent: 'center',
                                margin: '2rem 0'
                            }}
                            whileHover={{ scale: 1.005 }}
                        >
                            <img src="/akichip_edificio_circular_concept_1776467838982.png" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} alt="AKICHIP" />
                            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/akichip_motherboard_granate_1776467862884.png)', backgroundSize: '700px', opacity: 0.2, mixBlendMode: 'overlay' }} />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #450a0a 35%, rgba(69, 10, 10, 0.6) 70%, transparent 100%)' }} />
                            
                            <div style={{ 
                                position: 'absolute', top: 30, right: 30, 
                                background: 'rgba(239, 68, 68, 0.2)', backdropFilter: 'blur(10px)', border: '1px solid #ef4444',
                                padding: '0.6rem 2.22rem', borderRadius: '30px', 
                                color: 'white', fontWeight: 950, fontSize: '1rem', letterSpacing: '4px', 
                                zIndex: 10, boxShadow: '0 0 30px rgba(239, 68, 68, 0.4)' 
                            }}>
                                🚀 PORTAL EMPRESARIAL MASTER
                            </div>
                            
                            <div style={{ position: 'relative', padding: '5rem', zIndex: 10, maxWidth: '1000px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '25px', marginBottom: '2.5rem' }}>
                                    <div style={{ width: '90px', height: '90px', background: '#991b1b', borderRadius: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 40px rgba(153, 27, 27, 0.6)', border: '2px solid rgba(239, 68, 68, 0.5)' }}>
                                        <Cpu size={50} color="white" />
                                    </div>
                                    <h4 style={{ color: '#ef4444', fontWeight: '900', margin: 0, fontSize: '1.5rem', letterSpacing: '3px' }}>VLS COMERCIO</h4>
                                </div>

                                <h2 style={{ color: 'white', fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', fontWeight: 950, margin: 0, letterSpacing: '-3px', lineHeight: 0.85 }}>
                                    AKICHIP:<br/>
                                    <span style={{ color: '#ef4444' }}>EL CORAZÓN TECNOLÓGICO</span>
                                </h2>
                                <p style={{ color: 'rgba(255,255,255,1)', fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', marginTop: '2.5rem', fontWeight: 300, lineHeight: 1.3, maxWidth: '900px' }}>
                                    Explora el portal interactivo del Local 204. Microsoldadura, Hardware Maestro y la pasión por el fútbol local en una experiencia digital única. 
                                    <br/><strong style={{ fontWeight: 900, color: '#ef4444' }}>¡Sintoniza RADIO AKICHIP ahora!</strong>
                                </p>
                                <div style={{ display: 'flex', gap: '25px', marginTop: '4rem', flexWrap: 'wrap' }}>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); navigate('/akichip'); }}
                                        className="btn-vls-action-light" 
                                        style={{ background: '#ef4444', color: 'white', border: 'none', padding: '1.2rem 3.5rem', fontSize: '1.3rem', borderRadius: '50px', boxShadow: '0 20px 40px rgba(239, 68, 68, 0.4)', transition: 'all 0.3s' }}
                                    >
                                        INGRESAR AL PORTAL
                                    </button>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); navigate('/akichip'); }}
                                        style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'rgba(0,0,0,0.4)', padding: '1rem 2.5rem', borderRadius: '50px', border: '1px solid rgba(239, 68, 68, 0.3)', cursor: 'pointer' }}
                                    >
                                        <div style={{ width: '12px', height: '12px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 15px #10b981', animation: 'pulse 2s infinite' }} />
                                        <span style={{ color: 'white', fontWeight: '900', letterSpacing: '2px', fontSize: '0.9rem' }}>ON AIR</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>


                {/* ══════════════════════════════════════════════════════════ */}
                {/* HEADLINE: INVESTIGACIÓN ESPECIAL VLS (IAN & ARTEMIS)        */}
                {/* ══════════════════════════════════════════════════════════ */}
                <div style={{ padding: '2rem 1.5rem 0', maxWidth: '1400px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 1024 ? '1fr' : '1fr 1fr', gap: '1.5rem' }}>
                        {/* CASO IAN */}
                        <div 
                            onClick={() => window.dispatchEvent(new CustomEvent('open-vls-ian'))}
                            className="glass-panel" 
                            style={{ 
                                background: 'linear-gradient(135deg, #450a0a 0%, #1e1b4b 100%)',
                                padding: '1.5rem',
                                borderRadius: '24px',
                                border: '2px solid #ef4444',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1.2rem',
                                cursor: 'pointer',
                                boxShadow: '0 15px 35px rgba(239, 68, 68, 0.2)',
                                borderLeft: '8px solid #ef4444',
                                transition: 'transform 0.3s'
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <ShieldAlert size={28} color="#ef4444" />
                            <div>
                                <h3 style={{ margin: 0, color: '#fff', fontSize: '1.1rem', fontWeight: 900 }}>CASO IAN: PUNTO CIEGO</h3>
                                <p style={{ margin: 0, color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>Investigación sobre seguridad retail.</p>
                            </div>
                        </div>




                        {/* PLAZA DE LOS POETAS (NUEVO PATRIMONIO) */}
                        <div 
                            onClick={() => {
                                closeAllPopups();
                                navigate('/plazapoetas');
                            }}
                            className="glass-panel group" 
                            style={{ 
                                background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%), url(/patrimonio/magallanes_portrait.png)',
                                backgroundBlendMode: 'overlay',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                padding: '1.5rem',
                                borderRadius: '24px',
                                border: '2px solid #f59e0b',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1.2rem',
                                cursor: 'pointer',
                                boxShadow: '0 15px 35px rgba(245, 158, 11, 0.2)',
                                borderLeft: '8px solid #f59e0b',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                                e.currentTarget.style.boxShadow = '0 20px 40px rgba(245, 158, 11, 0.4)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                e.currentTarget.style.boxShadow = '0 15px 35px rgba(245, 158, 11, 0.2)';
                            }}
                        >
                            <div className="bg-amber-900/50 p-2 rounded-xl backdrop-blur-md">
                                <Landmark size={28} color="#fbbf24" />
                            </div>
                            <div>
                                <h3 style={{ margin: 0, color: '#fbbf24', fontSize: '1.1rem', fontWeight: 900, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>PLAZA DE LOS POETAS</h3>
                                <p style={{ margin: 0, color: '#fef3c7', fontSize: '0.8rem', fontWeight: 600, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>Patrimonio Serenense Renovado</p>
                            </div>
                        </div>

                        {/* ARTEMIS II */}
                        <div 
                            onClick={() => navigate('/artemisa')}
                            className="glass-panel animate-pulse-slow" 
                            style={{ 
                                background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
                                padding: '1.5rem',
                                borderRadius: '24px',
                                border: '2px solid #38bdf8',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1.2rem',
                                cursor: 'pointer',
                                boxShadow: '0 15px 35px rgba(56, 189, 248, 0.2)',
                                borderLeft: '8px solid #38bdf8',
                                transition: 'transform 0.3s'
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <Rocket size={28} color="#38bdf8" />
                            <div>
                                <h3 style={{ margin: 0, color: '#fff', fontSize: '1.1rem', fontWeight: 900 }}>MISIÓN ARTEMIS II: LA LUNA</h3>
                                <p style={{ margin: 0, color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>Expediciones y tecnología espacial 2025.</p>
                            </div>
                        </div>

                        {/* UES: UNIVERSIDAD CENTRAL - REDISEÑO GRÁFICO PREMIUM */}
                        <div 
                            onClick={() => {
                                closeAllPopups();
                                navigate('/ucen');
                                window.dispatchEvent(new CustomEvent('open-vls-ucen', { detail: { routed: true } }));
                            }}
                            className="glass-panel group" 
                            id="ucen-portal-trigger"                            style={{ 
                                background: 'url(/img/ucen_asfae_1.jpg)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                padding: '0',
                                borderRadius: '24px',
                                border: '2px solid #00F0FF',
                                height: 'auto',
                                cursor: 'pointer',
                                boxShadow: '0 15px 35px rgba(0, 240, 255, 0.2)',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                                e.currentTarget.style.boxShadow = '0 30px 60px rgba(0, 240, 255, 0.4)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 240, 255, 0.2)';
                            }}
                        >
                            {/* Overlay de cristal dinámico */}
                            <div style={{ 
                                position: 'absolute', inset: 0, 
                                background: 'linear-gradient(to bottom, transparent 30%, rgba(2, 6, 23, 0.9) 100%)',
                                zIndex: 1
                            }} />
                            <div style={{ 
                                position: 'absolute', inset: 0, 
                                background: 'rgba(0, 240, 255, 0.05)',
                                backdropFilter: 'blur(2px)',
                                zIndex: 0
                            }} />

                            <div style={{ position: 'relative', zIndex: 2, padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                                <div style={{ 
                                    background: 'white', padding: '8px', borderRadius: '15px', 
                                    boxShadow: '0 10px 20px rgba(0,0,0,0.5)', width: '60px', height: '60px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    border: '2px solid #00F0FF', cursor: 'pointer'
                                }}>
                                    <img src="/img/logo_ucen.jpg" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} alt="UCEN" />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ margin: 0, color: '#fff', fontSize: '1.1rem', fontWeight: 900, textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>UCEN: 42° CONGRESO ASFAE</h3>
                                    <p style={{ margin: 0, color: 'rgba(0, 240, 255, 0.9)', fontSize: '0.8rem', fontWeight: 900, letterSpacing: '0.5px' }}>Epicentro de Ciencias Empresariales</p>
                                    <div style={{ marginTop: '8px', display: 'flex', gap: '5px' }}>
                                        <span style={{ fontSize: '0.6rem', color: 'white', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '50px' }}>IA / NOV 2025</span>
                                    </div>
                                    </div>
                                </div>
                    </div>
                </div>
            </div>




                <div style={{ padding: '0 1rem 2rem 1rem' }}>

                    <header className="page-header" style={{ marginBottom: '2.5rem', textAlign: 'center', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '1.5rem', justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: '900px', boxSizing: 'border-box' }}>
                            
                            {/* Radio Dial / Home Widget dinámico */}
                            <div style={{ width: '100%', position: 'relative', zIndex: 100001 }}>
                                {isVLS ? <RadioHomeWidget /> : <RDMLSRadioDial />}
                            </div>
                             {/* El libro se ha movido a la sección principal de contenido arriba del QuickEmergencyBar para máxima visibilidad */}

                            {/* BANNER DINÁMICO SEGÚN DOMINIO */}
                            {isRDMLS ? (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', padding: '1rem 0', textAlign: 'center', width: '100%' }}>
                                    <div className="picasso-fractal" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '100%', maxWidth: '850px', marginBottom: '1.5rem', padding: '2.5rem', borderRadius: '30px', background: 'rgba(80, 5, 5, 0.4)', border: '2px solid #f59e0b', boxShadow: '0 15px 40px rgba(0,0,0,0.4)', position: 'relative' }}>
                                        <div style={{ position: 'absolute', top: -30, background: '#f59e0b', padding: '0.4rem 1.5rem', borderRadius: '20px', color: '#000', fontWeight: '900', fontSize: '0.8rem', letterSpacing: '2px' }}>PORTAL INSTITUCIONAL</div>
                                        <img src="/escudo.png" style={{ height: '120px', filter: 'drop-shadow(0 0 15px rgba(245,158,11,0.5))' }} alt="Muni La Serena" />
                                        <h1 style={{ color: 'white', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '950', letterSpacing: '-1px', margin: 0, textShadow: '0 10px 20px rgba(0,0,0,0.5)' }}>I. MUNICIPALIDAD DE LA SERENA</h1>
                                        <p style={{ color: '#fcd34d', fontWeight: '900', fontSize: '1.2rem', letterSpacing: '3px', textTransform: 'uppercase', margin: 0 }}>Radio Digital Municipal RDMLS.cl</p>
                                    </div>
                                    <div style={{ background: 'rgba(255,158,11,0.1)', padding: '0.6rem 1rem', borderRadius: '12px', border: '1px solid rgba(255,158,11,0.3)', fontSize: '0.9rem', color: '#fcd34d', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span style={{ fontSize: '1.1rem' }}>🏛️</span>
                                        Acceso prioritario a herramientas de gestión municipal y servicios para funcionarios.
                                    </div>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', padding: '1rem 0', textAlign: 'center', width: '100%' }}>
                                    {isVLS ? (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                                            <div className="animate-float" style={{ position: 'relative', width: '150px', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <div style={{ position: 'relative', zIndex: 1, width: '130px', height: '130px', borderRadius: '50%', overflow: 'hidden', border: '4px solid #38bdf8', boxShadow: '0 0 30px rgba(56,189,248,0.4)', background: 'radial-gradient(circle at center, #1e3a8a 0%, #0f172a 100%)', margin: '0' }}>
                                                    <Canvas camera={{ position: [0, 0, 3], fov: 45 }} style={{ width: '100%', height: '100%' }}>
                                                        <ambientLight intensity={0.8} />
                                                        <pointLight position={[10, 10, 10]} intensity={1.5} />
                                                        <Environment preset="city" />
                                                        <Suspense fallback={null}>
                                                            <UniversalSerenito 
                                                                animation={greetingIdx === 0 ? 'Wave' : 'Idle'} 
                                                                scale={2.2} 
                                                                position={[0, -1.8, 0]} 
                                                            />
                                                        </Suspense>
                                                        <OrbitControls 
                                                            enableZoom={false} 
                                                            enablePan={false} 
                                                            autoRotate 
                                                            autoRotateSpeed={0.5} 
                                                        />
                                                    </Canvas>
                                                </div>
                                            </div>
                                            <div style={{ textAlign: 'left', maxWidth: '400px' }}>
                                                <AnimatePresence mode="wait">
                                                    <motion.div
                                                        key={greetingIdx}
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: -20 }}
                                                        transition={{ duration: 0.5 }}
                                                        style={{ overflow: 'visible', width: '100%' }}
                                                    >
                                                        <h1 style={{ color: 'white', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '950', letterSpacing: '-1.5px', margin: 0, fontFamily: '"Outfit", sans-serif', lineHeight: '1.1', textShadow: '0 8px 16px rgba(0,0,0,0.5)' }}>
                                                            {greetings[greetingIdx].text.split(',')[0]},
                                                            <span style={{ color: greetings[greetingIdx].color, background: greetings[greetingIdx].bg, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', padding: '0 5px' }}>{greetings[greetingIdx].text.split(',')[1] || ''}</span>
                                                        </h1>
                                                        <p style={{ color: greetings[greetingIdx].color, fontWeight: "bold", margin: "0.5rem 0", letterSpacing: "1.5px", textShadow: "0 2px 4px rgba(0,0,0,0.5)", textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '10px', fontSize: 'clamp(0.7rem, 2vw, 0.9rem)' }}>
                                                            <span style={{ fontSize: '1.5rem' }}>{greetings[greetingIdx].flag}</span>
                                                            <span>{greetings[greetingIdx].sub}</span>
                                                        </p>
                                                    </motion.div>
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="neocolonial-frame" style={{ border: '2px solid #ef4444', padding: '2rem', background: 'rgba(0,0,0,0.8)', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                                                <img src="/vls_chile_map.jpg" alt="Región Coquimbo" style={{ maxHeight: '140px', maxWidth: '90%', height: 'auto', borderRadius: '12px' }} />
                                            </div>
                                            <div className="picasso-fractal" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', width: '100%', maxWidth: '800px', marginBottom: '2rem', padding: '2rem', borderRadius: '20px' }}>
                                                <h2 className="serena-title-glow" style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', margin: '0', textAlign: 'center' }}>{brandOrg.toUpperCase()}</h2>
                                                <h3 className="text-gradient" style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', margin: '0', fontWeight: 'bold' }}>RADIO PORTAL REGIONAL</h3>
                                            </div>
                                        </>
                                    )}

                                    {isVLS && (
                                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.75rem' }}>
                                            {greetings.map((g, gIdx) => (
                                                <button
                                                    key={`greeting-btn-${g.id || gIdx}`}
                                                    onClick={() => setGreetingIdx(gIdx)}
                                                    title={g.text}
                                                    style={{
                                                        background: greetingIdx === gIdx ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)',
                                                        border: greetingIdx === gIdx ? `1.5px solid ${g.color}` : '1.5px solid rgba(255,255,255,0.15)',
                                                        borderRadius: '50px',
                                                        padding: '4px 10px',
                                                        cursor: 'pointer',
                                                        fontSize: '1.1rem',
                                                        transition: 'all 0.25s ease',
                                                        boxShadow: greetingIdx === gIdx ? `0 0 10px ${g.color}50` : 'none',
                                                        transform: greetingIdx === gIdx ? 'scale(1.15)' : 'scale(1)'
                                                    }}
                                                >{g.flag}</button>
                                            ))}
                                        </div>
                                    )}

                                    {!isVLS && (
                                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.6rem 1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ fontSize: '1.1rem' }}>{greetings[greetingIdx].flag}</span>
                                            {tHub.welcomePortales || 'Bienvenido al portal unificado de La Serena.'}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* BUSCADOR INTEGRADO */}
                            <div style={{ width: '100%', maxWidth: '600px', position: 'relative', marginTop: '1rem' }}>
                                <Search size={20} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                <input
                                    type="text"
                                    placeholder="O busca un servicio específico aquí..."
                                    value={searchTerm}
                                    onChange={(e) => { setSearchTerm(e.target.value); if (e.target.value) setViewMode('full'); }}
                                    onKeyDown={(e) => { if (e.key === 'Enter') handleSearchSubmit(searchTerm); }}
                                    style={{ width: '100%', padding: '1rem 1.2rem 1rem 3.5rem', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '25px', color: 'white', fontSize: '1rem', outline: 'none', backdropFilter: 'blur(10px)', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}
                                />
                                <button
                                    onClick={startVoiceSearch}
                                    style={{ position: 'absolute', right: '1.2rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
                                >
                                    <Mic size={20} />
                                </button>
                            </div>

                            {/* ELIMINADO: Métricas hardcoded (Reemplazar por VLS-Cloud Realtime en v3.5) */}

                            {/* GALERÍA DE LOS 4 PILARES */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', width: '100%', maxWidth: '1200px', marginTop: '0.5rem' }}>
                                {categories.map((pillar, idx) => {
                                    const PillarIcon = pillar?.icon;
                                    return (
                                        <div
                                            key={pillar?.id || idx}
                                            onClick={() => {
                                                setSearchTerm("");
                                                const element = document.getElementById(`cat-section-${pillar?.id}`);
                                                if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                            }}
                                            className="glass-panel gaudi-curves hover-lift"
                                        >
                                            <div style={{ background: pillar?.color || '#333', padding: '1.2rem', borderRadius: '24px', color: pillar?.id === 'citizens' ? 'black' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                {pillar?.icon && <pillar.icon size={36} />}
                                            </div>
                                            <div>
                                                <h4 style={{ color: 'white', margin: '0 0 0.5rem 0', fontSize: '1.3rem', fontWeight: '900', letterSpacing: '1px' }}>{tHub[`${pillar?.id}Title`] || pillar?.name}</h4>
                                                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>{tHub[`${pillar?.id}Sub`] || pillar?.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* BARRA DE HERRAMIENTAS INFERIOR */}
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', width: '100%' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '12px', color: 'white', fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <Globe size={18} color="var(--brand-primary)" />
                                <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ background: 'transparent', color: 'white', border: 'none', outline: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                                    <option value="es" style={{ color: '#000' }}>Español (ES)</option>
                                    <option value="en" style={{ color: '#000' }}>English (EN)</option>
                                </select>
                            </div>

                            <button
                                className="btn-glass"
                                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1.2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}
                                onClick={() => window.dispatchEvent(new CustomEvent('open-smart-share'))}
                            >
                                <QRCodeSVG value={isRDMLS ? "https://www.rdmls.cl" : "https://www.vecinoslaserena.cl"} size={35} level={"L"} />
                                <span style={{ fontSize: '0.8rem', color: 'white', fontWeight: 'bold' }}>{tHub.qrText}</span>
                            </button>

                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{formatoFecha}</span>
                                <span style={{ fontSize: '1rem', color: 'white', fontWeight: 'bold', fontFamily: 'monospace' }}>{formatoHora}</span>
                            </div>

                            {!isRDMLS && (
                                <>
                                    <button onClick={() => navigate('/serenamet')} className="btn-glass" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(56, 189, 248, 0.2)', padding: '0.5rem 1.2rem', borderRadius: '12px' }}>
                                        <Map size={18} color="#38bdf8" />
                                        <span style={{ fontSize: '0.85rem', color: 'white', fontWeight: 'bold' }}>SERENAMET</span>
                                    </button>

                                    <button onClick={() => navigate('/sombreros')} className="btn-glass" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(167, 139, 250, 0.2)', padding: '0.5rem 1.2rem', borderRadius: '12px' }}>
                                        <Star size={18} color="#a78bfa" />
                                        <span style={{ fontSize: '0.85rem', color: 'white', fontWeight: 'bold' }}>LAB. IDEAS</span>
                                    </button>
                                </>
                            )}
                        </div>
                    </header>

                    {/* Pinned Apps Bar (Los Elegidos) */}
                    {!isRDMLS && pinnedApps.length > 0 && (
                        <div className="fade-in" style={{
                            maxWidth: '1200px', margin: '0 auto 2.5rem auto', width: '95%', padding: '0 1rem',
                            display: 'flex', flexDirection: 'column', gap: '1rem'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Pin size={18} color="#fbbf24" fill="#fbbf24" style={{ filter: 'drop-shadow(0 0 5px #fbbf24)' }} />
                                <h3 style={{ margin: 0, fontSize: '0.9rem', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '3px', fontWeight: '900' }}>Tus Elegidos</h3>
                                <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, rgba(251,191,36,0.5), transparent)' }}></div>
                            </div>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                                gap: '12px'
                            }}>
                                {pinnedApps.map((id, pIdx) => {
                                    const app = allApps.find(a => a?.id === id);
                                    if (!app) return null;
                                    return (
                                        <div
                                            key={`pinned-app-${id}-${pIdx}`}
                                            onClick={() => {
                                                if (app?.id === 'premium') { setShowPremiumClub(true); return; }
                                                if (app?.id === 'galaxia-disco') { setShowGalaxia(true); return; }
                                                if (app.isEvent) window.dispatchEvent(new CustomEvent(app.isEvent));
                                                else if (app.isExternal) window.open(app.path, '_blank');
                                                else navigate(app.path);
                                            }}
                                            className="glass-panel hover-lift"
                                            style={{
                                                padding: '0.8rem 1.2rem', borderRadius: '18px', cursor: 'pointer',
                                                display: 'flex', alignItems: 'center', gap: '12px',
                                                background: `linear-gradient(135deg, ${app.color}25, rgba(0,0,0,0.6))`,
                                                border: `1px solid ${app.color}40`,
                                                boxShadow: `0 4px 15px ${app.color}15`,
                                                position: 'relative',
                                                overflow: 'hidden',
                                                boxSizing: 'border-box'
                                            }}
                                        >
                                            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: app.color }}></div>
                                            <app.icon size={20} color={app.color} />
                                            <span style={{ fontSize: '0.85rem', color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{app.title}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* SALA DE INTELIGENCIA - 3 Pillars Grid Investigations */}
                    {!isRDMLS && (
                    <div style={{ maxWidth: '1400px', margin: '4rem auto 1rem auto', width: '100%', padding: window.innerWidth < 768 ? '0 1rem' : '0 2rem', boxSizing: 'border-box' }}>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '2½rem' }}>
                            <div style={{ background: 'linear-gradient(45deg, #1e3a8a, #38bdf8)', padding: '12px', borderRadius: '15px', color: 'white' }}>
                                <Brain size={28} />
                            </div>
                            <div>
                                <h2 style={{ color: 'white', margin: 0, fontSize: '2.2rem', fontWeight: '900', letterSpacing: '5px', textTransform: 'uppercase', fontFamily: '"Outfit", sans-serif' }}>SALA DE INTELIGENCIA</h2>
                                <p style={{ color: '#38bdf8', margin: 0, fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '2px' }}>CENTINEL FARO : INVESTIGACIÓN ESPECIAL VLS</p>
                            </div>
                            <div style={{ height: '2px', flex: 1, background: 'linear-gradient(90deg, #38bdf8, transparent)' }}></div>
                         </div>
                         
                         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', width: '100%', marginBottom: '4rem' }}>
                            {/* TRIPLE_SIGNAL_DECODING_VLS */}
                            <div style={{ gridColumn: '1 / -1', background: 'rgba(0,0,0,0.4)', borderRadius: '40px', padding: isMobile ? '1.5rem' : '3rem', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, #38bdf8, transparent)', opacity: 0.5 }}></div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                        <div style={{ background: '#ef4444', padding: '10px', borderRadius: '12px', border: '2px solid rgba(255,255,255,0.1)', boxShadow: '0 0 20px rgba(239,68,68,0.3)' }}>
                                            <Radar size={24} color="white" className="animate-spin-slow" />
                                        </div>
                                        <div>
                                            <h3 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 900, letterSpacing: '4px', margin: 0, textTransform: 'uppercase' }}>DECODIFICANDO <span style={{ color: '#ef4444' }}>TRIPLE SEÑAL LIVE</span></h3>
                                            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', fontWeight: 'bold', margin: '5px 0 0 0', letterSpacing: '2px' }}>CENTINEL FARO : MASTER SIGNAL MONITORING SATELLITE 2025</p>
                                        </div>
                                    </div>
                                    <div className="hide-on-mobile" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                        <div style={{ width: '80px', height: '40px', background: 'rgba(239,68,68,0.1)', borderRadius: '10px', border: '1px solid #ef444430', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <span style={{ fontSize: '0.6rem', color: '#ef4444', fontWeight: 900 }}>DPI_ACTIVE</span>
                                        </div>
                                        <div style={{ width: '120px', height: '40px', background: 'rgba(56,189,248,0.1)', borderRadius: '10px', border: '1px solid #38bdf830', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <span style={{ fontSize: '0.6rem', color: '#38bdf8', fontWeight: 900 }}>VLS_ENCRYPTION_SAFE</span>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '2rem' }}>
                                    {[
                                        { title: 'OFICIAL NASA LIVE', id: 'GVWXfFfDWBM', color: '#38bdf8', label: 'SPACE ENGINE' },
                                        { title: 'VLS NEWS REUTERS', id: 'YUG1BGFRwDM', color: '#8b5cf6', label: 'WORLD NEWS' },
                                        { title: 'VLS VIA CBS/NEWS', id: '9Hr_9VHCbSE', color: '#ef4444', label: 'NETWORK LINK' }
                                    ].map((feed, idx) => (
                                        <div key={idx} style={{ background: 'rgba(15,23,42,0.8)', border: `1px solid ${feed.color}30`, borderRadius: '25px', padding: '1rem', position: 'relative', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', padding: '0 0.5rem' }}>
                                               <span style={{ fontSize: '0.6rem', fontWeight: 900, color: feed.color, letterSpacing: '2px' }}>{feed.title}</span>
                                               <span style={{ fontSize: '0.5rem', background: feed.color, color: 'black', padding: '2px 8px', borderRadius: '4px', fontWeight: 900 }}>{feed.label}</span>
                                            </div>
                                            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: '15px', overflow: 'hidden', background: '#000', border: '1px solid rgba(255,255,255,0.05)' }}>
                                                <iframe 
                                                    width="100%" height="100%" 
                                                    src={`https://www.youtube.com/embed/${feed.id}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=${feed.id}`}
                                                    frameBorder="0" allowFullScreen style={{ pointerEvents: 'none' }} 
                                                />
                                                <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '5px' }}>
                                                    <div style={{ width: '6px', height: '6px', background: '#ef4444', borderRadius: '50%', boxShadow: '0 0 10px #ef4444', animation: 'pulse 1s infinite' }}></div>
                                                </div>
                                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <div style={{ display: 'flex', gap: '2px' }}>
                                                        {[...Array(5)].map((_, b) => (
                                                            <div key={b} style={{ width: '2px', height: `${Math.random()*15+5}px`, background: feed.color, borderRadius: '1px', animation: 'vls-vu-simple 0.5s infinite alternate' }} />
                                                        ))}
                                                    </div>
                                                    <span style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.5)', fontWeight: 'bold' }}>AUTO_SYNCING...</span>
                                                </div>
                                            </div>
                                            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
                                                <button onClick={() => window.open(`https://youtube.com/watch?v=${feed.id}`, '_blank')} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'rgba(255,255,255,0.6)', padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.65rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                                    <Maximize size={12} /> EXPANDIR MASTER SIGNAL
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                            </div>
                        </div>

                         <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '4rem', width: '100%', boxSizing: 'border-box' }}>
                            {/* VLS NEWS IAN - BREAKING INVESTIGACIÓN - FULL WIDTH ARRIBA DE SEMANA SANTA */}
                            <div 
                                onClick={() => window.dispatchEvent(new CustomEvent('open-vls-ian'))}
                                className="glass-panel hover-lift animate-fade-in" 
                                style={{ 
                                    gridColumn: '1 / -1',
                                    background: 'linear-gradient(135deg, #450a0a 0%, #1e1b4b 100%)',
                                    padding: '2rem',
                                    borderRadius: '24px',
                                    border: '1px solid rgba(239, 68, 68, 0.4)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1.5rem',
                                    cursor: 'pointer',
                                    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)',
                                    borderLeft: '8px solid #ef4444',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.8)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.4)'; }}
                            >
                                <div style={{ flexShrink: 0 }}>
                                    <ShieldAlert size={36} color="#ef4444" />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', gap: '8px', marginBottom: '0.5rem', alignItems: 'center' }}>
                                        <span style={{ background: '#ef4444', color: 'white', padding: '0.2rem 0.8rem', borderRadius: '50px', fontSize: '0.65rem', fontWeight: 900, letterSpacing: '1px' }}>VLS INVESTIGA</span>
                                        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontWeight: 600 }}>01 de Abril, 2025</span>
                                    </div>
                                    <h3 style={{ margin: 0, color: '#fff', fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.5px' }}>CASO IAN: PUNTO CIEGO DEL RETAIL</h3>
                                    <p style={{ margin: '0.5rem 0 0', color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: '1.5' }}>La investigación sobre negligencia e infraestructura que busca transformar para siempre las normativas de seguridad al interior de los supermercados.</p>
                                </div>
                                <div style={{ display: window.innerWidth > 768 ? 'flex' : 'none', flexShrink: 0, paddingLeft: '1rem' }}>
                                     <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '0.8rem 1.5rem', borderRadius: '12px', fontWeight: 900, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                                        LEER REPORTE <ChevronRight size={16} />
                                    </div>
                                </div>
                            </div>

                            {/* SEMANA SANTA SPECIAL - FULL WIDTH PRIORITY */}
                            <div 
                                onClick={() => setShowSemanaSanta(true)}
                                className="glass-panel gaudi-curves hover-lift animate-fade-in" 
                                style={{ 
                                    gridColumn: isMobile ? '1 / -1' : (window.innerWidth > 900 ? '1 / -1' : 'auto'),
                                    background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', 
                                    padding: isMobile ? '1.5rem' : '2.5rem', 
                                    borderRadius: '35px', 
                                    cursor: 'pointer',
                                    border: '2px solid #7c3aed60',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    boxShadow: '0 25px 50px rgba(0,0,0,0.6)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1.5rem'
                                }}
                            >
                                <div style={{ position: 'absolute', top: '-10%', right: '-5%', opacity: 0.1, zIndex: 0 }}>
                                    <Church size={isMobile ? 200 : 350} color="#7c3aed" />
                                </div>
                                <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                                        <span style={{ background: '#7c3aed', color: 'white', padding: '0.4rem 1.5rem', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 900, letterSpacing: '2px' }}>HEMEROTECA VLS</span>
                                        <span style={{ color: '#a78bfa', fontWeight: 'bold', fontSize: '0.8rem' }}>ESPECIAL SEMANA SANTA 2025</span>
                                    </div>
                                    <h1 style={{ color: 'white', fontSize: isMobile ? '1.8rem' : '2.8rem', fontWeight: 950, lineHeight: 1.1, marginBottom: '1rem', fontFamily: '"Outfit", sans-serif' }}>
                                        Semana Santa 2025:<br/>
                                        <span style={{ color: '#a78bfa' }}>Historia y Tradición</span>
                                    </h1>
                                    <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: isMobile ? '0.95rem' : '1.15rem', maxWidth: '800px', margin: 0, fontWeight: 400, lineHeight: 1.5 }}>
                                        Más allá de la fe: Un viaje por las tradiciones globales y chilenas que definen nuestro patrimonio ancestral en la Región de Coquimbo.
                                    </p>
                                    
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginTop: '2.5rem', alignItems: 'center' }}>
                                        <button className="btn-vls-action-light" style={{ background: '#7c3aed', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '15px', fontWeight: 900 }}>LEER INVESTIGACIÓN</button>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a78bfa', fontWeight: 'bold', fontSize: '0.85rem' }}>
                                            <BookOpen size={18} /> ALTA RELEVANCIA
                                        </div>
                                    </div>
                                </div>

                                <div className="hide-on-mobile" style={{ 
                                    width: '100%', 
                                    height: '220px', 
                                    borderRadius: '25px', 
                                    background: 'radial-gradient(ellipse at center, #1a0a3a 0%, #07030f 100%)',
                                    border: '1px solid rgba(255,180,0,0.25)', 
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 40px rgba(255,160,0,0.08)', 
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden',
                                    marginTop: '1rem'
                                }}>
                                    {/* Cruz del Tercer Milenio - Coquimbo */}
                                    <svg viewBox="0 0 200 300" width="160" height="210"
                                        style={{ filter: 'drop-shadow(0 0 18px rgba(255,190,0,0.7)) drop-shadow(0 0 40px rgba(255,120,0,0.3))', position: 'relative', zIndex: 2 }}>
                                        <defs>
                                            <linearGradient id="cg1" x1="0%" y1="0%" x2="0%" y2="100%">
                                                <stop offset="0%" stopColor="#fff5a0"/>
                                                <stop offset="35%" stopColor="#FFD700"/>
                                                <stop offset="75%" stopColor="#FFA500"/>
                                                <stop offset="100%" stopColor="#b85a00"/>
                                            </linearGradient>
                                            <linearGradient id="cg2" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#b85a00"/>
                                                <stop offset="40%" stopColor="#FFA500"/>
                                                <stop offset="60%" stopColor="#FFD700"/>
                                                <stop offset="100%" stopColor="#b85a00"/>
                                            </linearGradient>
                                            <style>{`
                                                .cv1{stroke-dasharray:280;stroke-dashoffset:280;animation:dL 2.2s ease-out 0.1s forwards;}
                                                .cv2{stroke-dasharray:280;stroke-dashoffset:280;animation:dL 2.2s ease-out 0.4s forwards;}
                                                .cv3{stroke-dasharray:280;stroke-dashoffset:280;animation:dL 2.2s ease-out 0.7s forwards;}
                                                .ch1{stroke-dasharray:180;stroke-dashoffset:180;animation:dL 1.6s ease-out 1.6s forwards;}
                                                .ch2{stroke-dasharray:180;stroke-dashoffset:180;animation:dL 1.6s ease-out 1.9s forwards;}
                                                .cb{stroke-dasharray:240;stroke-dashoffset:240;animation:dL 1.4s ease-out 2.2s forwards;}
                                                .cpulse{animation:gP 2.8s ease-in-out 3.2s infinite;}
                                                @keyframes dL{to{stroke-dashoffset:0;}}
                                                @keyframes gP{0%,100%{opacity:.7;}50%{opacity:1;filter:drop-shadow(0 0 18px #FFD700);}}
                                            `}</style>
                                        </defs>
                                        <g className="cpulse">
                                            {/* Vertical — 3 líneas paralelas */}
                                            <line className="cv1" x1="87" y1="10" x2="87" y2="210" stroke="url(#cg1)" strokeWidth="8" strokeLinecap="round"/>
                                            <line className="cv2" x1="100" y1="4" x2="100" y2="214" stroke="url(#cg1)" strokeWidth="13" strokeLinecap="round"/>
                                            <line className="cv3" x1="113" y1="10" x2="113" y2="210" stroke="url(#cg1)" strokeWidth="8" strokeLinecap="round"/>
                                            {/* Horizontal — 2 líneas paralelas */}
                                            <line className="ch1" x1="18" y1="78" x2="182" y2="78" stroke="url(#cg2)" strokeWidth="8" strokeLinecap="round"/>
                                            <line className="ch2" x1="18" y1="94" x2="182" y2="94" stroke="url(#cg2)" strokeWidth="8" strokeLinecap="round"/>
                                            {/* Base piramidal */}
                                            <line className="cb" x1="72" y1="212" x2="100" y2="246" stroke="url(#cg1)" strokeWidth="6" strokeLinecap="round"/>
                                            <line className="cb" x1="128" y1="212" x2="100" y2="246" stroke="url(#cg1)" strokeWidth="6" strokeLinecap="round"/>
                                            <line className="cb" x1="50" y1="246" x2="150" y2="246" stroke="url(#cg2)" strokeWidth="5" strokeLinecap="round"/>
                                            <line className="cb" x1="50" y1="246" x2="36" y2="270" stroke="url(#cg1)" strokeWidth="4" strokeLinecap="round"/>
                                            <line className="cb" x1="150" y1="246" x2="164" y2="270" stroke="url(#cg1)" strokeWidth="4" strokeLinecap="round"/>
                                            <line className="cb" x1="30" y1="270" x2="170" y2="270" stroke="url(#cg2)" strokeWidth="4" strokeLinecap="round"/>
                                            {/* Luces pulsantes */}
                                            <circle cx="18" cy="86" r="4" fill="#FFD700">
                                                <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite"/>
                                            </circle>
                                            <circle cx="182" cy="86" r="4" fill="#FFD700">
                                                <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" begin="0.5s" repeatCount="indefinite"/>
                                            </circle>
                                            <circle cx="100" cy="4" r="5" fill="#fff5a0">
                                                <animate attributeName="r" values="3;7;3" dur="2.2s" repeatCount="indefinite"/>
                                                <animate attributeName="opacity" values="0.5;1;0.5" dur="2.2s" repeatCount="indefinite"/>
                                            </circle>
                                        </g>
                                    </svg>
                                    {/* Halo de fondo */}
                                    <div style={{ position: 'absolute', width: '140px', height: '140px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,185,0,0.12) 0%, transparent 70%)', top: '25%', left: '50%', transform: 'translate(-50%, -20%)' }} />
                                    <div style={{ position: 'absolute', bottom: '10px', right: '15px', color: '#a78bfa', fontSize: '0.6rem', fontWeight: '900', letterSpacing: '2px' }}>✝ RDMLS HERITAGE · COQUIMBO</div>
                                </div>
                            </div>

                            {/* JUAN SOLDADO SUPREME GRAPHICAL CARD (16:9) */}
                            <div 
                                 onClick={() => navigate('/juansoldado')}
                                 className="glass-panel gaudi-curves hover-lift animate-fade-in" 
                                 style={{ 
                                     gridColumn: isMobile ? 'span 1' : 'span 2',
                                     aspectRatio: isMobile ? 'auto' : '16 / 7',
                                     borderRadius: '45px', 
                                     cursor: 'pointer',
                                     border: '1px solid rgba(245,158,11,0.4)',
                                     position: 'relative',
                                     overflow: 'hidden',
                                     display: 'flex',
                                     flexDirection: 'column',
                                     boxShadow: '0 30px 60px -12px rgba(0,0,0,0.6)',
                                     marginBottom: '2.5rem',
                                     background: 'rgb(2, 6, 23)'
                                 }}
                            >
                                <img 
                                    src="/media/juansoldado/juansoldadoavisa.jpg" 
                                    style={{ 
                                        position: 'absolute', inset: 0, width: '100%', height: '100%', 
                                        objectFit: 'cover', opacity: 0.4,
                                        transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)' 
                                    }} 
                                    className="hover-scale-img"
                                    alt="Juan Soldado Background"
                                />
                                {/* Personaje Juan Soldado en la derecha */}
                                <motion.img 
                                    initial={{ x: 100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    src="/media/juansoldado/JuanSoldado3dplano.png"
                                    style={{ 
                                        position: 'absolute', 
                                        right: isMobile ? '-10%' : '5%', 
                                        bottom: 0, 
                                        height: isMobile ? '70%' : '110%', 
                                        objectFit: 'contain',
                                        zIndex: 2,
                                        pointerEvents: 'none',
                                        filter: 'drop-shadow(0 0 30px rgba(245,158,11,0.3))'
                                    }}
                                />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(2,6,23,1) 0%, rgba(2,6,23,0.8) 40%, transparent 100%)', zIndex: 1 }} />
                                <div style={{ position: 'relative', zIndex: 10, height: '100%', width: isMobile ? '100%' : '50%', padding: isMobile ? '1.5rem' : '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.5rem' }}>
                                        <div style={{ padding: '6px 15px', background: 'rgba(245,158,11,0.2)', border: '1px solid #f59e0b', borderRadius: '50px', color: '#f59e0b', fontSize: '0.65rem', fontWeight: 900, letterSpacing: '2px' }}>VLS PREMIERE</div>
                                        <div style={{ padding: '6px 15px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50px', color: 'white', fontSize: '0.65rem', fontWeight: 900, letterSpacing: '2px' }}>HISTORIA VIVA</div>
                                    </div>
                                    <h2 style={{ color: 'white', fontSize: isMobile ? '2rem' : '3rem', fontWeight: 950, lineHeight: 1, margin: 0, fontFamily: '"Outfit", sans-serif', textTransform: 'uppercase', letterSpacing: '-1px' }}>
                                        JUAN SOLDADO <br/>
                                        <span style={{ color: '#f59e0b' }}>EL REGRESO</span>
                                    </h2>
                                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', fontWeight: 400, lineHeight: 1.6, maxWidth: '450px' }}>
                                        Explora la investigación más ambiciosa sobre la leyenda que marcó a una región. Documentos inéditos, radio digital y testimonios vecinales.
                                    </p>
                                    <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <button onClick={(e) => { e.stopPropagation(); navigate('/juansoldado'); }} style={{ padding: '1rem 2.5rem', background: '#f59e0b', color: '#000', border: 'none', borderRadius: '18px', fontWeight: 950, fontSize: '0.9rem', boxShadow: '0 10px 30px rgba(245,158,11,0.5)', cursor: 'pointer', transition: 'all 0.3s' }}>ENTRAR AL PORTAL</button>
                                        <span style={{ color: 'white', fontSize: '0.7rem', fontWeight: 900, opacity: 0.6, letterSpacing: '3px' }}>100% SOBERANO</span>
                                    </div>
                                </div>
                                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '4px', background: 'linear-gradient(to right, #f59e0b, transparent)', zIndex: 5 }} />
                            </div>

                            {/* ANDACOLLO & VALLENAR REGIONAL DUO (SIDE BY SIDE) */}
                            <div style={{ 
                                gridColumn: '1 / -1', 
                                display: 'grid', 
                                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
                                gap: '2rem',
                                marginBottom: '2.5rem'
                            }}>
                                {/* ANDACOLLO CARD */}
                                <div 
                                    onClick={() => navigate('/andacollo')}
                                    className="glass-panel hover-lift group"
                                    style={{
                                        aspectRatio: '16/9', borderRadius: '35px', overflow: 'hidden', cursor: 'pointer',
                                        position: 'relative', border: '1px solid rgba(16, 185, 129, 0.4)',
                                        background: '#022c22'
                                    }}
                                >
                                    <img src="/media/andacollo/Andacollo_vls.png" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, transform: 'scale(1.1)' }} alt="Andacollo Background" />
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', zIndex: 1 }} />
                                    
                                    {/* 3D Character Decorator (Andacollo Minero) */}
                                    {!isMobile && (
                                        <motion.img 
                                            initial={{ x: 50, opacity: 0 }}
                                            whileInView={{ x: 0, opacity: 1 }}
                                            src="/media/andacollo/Minero.png"
                                            style={{ position: 'absolute', bottom: -20, right: 0, height: '110%', objectFit: 'contain', zIndex: 4, filter: 'drop-shadow(0 10px 40px rgba(0,0,0,0.8))' }}
                                        />
                                    )}

                                    <div style={{ position: 'relative', zIndex: 10, padding: '2.5rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                                        <div style={{ display: 'flex', gap: '8px', marginBottom: '0.8rem' }}>
                                            <span style={{ background: '#10b981', color: 'white', padding: '4px 14px', borderRadius: '50px', fontSize: '0.65rem', fontWeight: 950, letterSpacing: '2px' }}>VLS LEGEND</span>
                                            <span style={{ background: 'rgba(255,255,255,0.1)', color: 'white', padding: '4px 14px', borderRadius: '50px', fontSize: '0.65rem', fontWeight: 950 }}>CIUDAD MONTAÑA</span>
                                        </div>
                                        <h3 style={{ margin: 0, color: 'white', fontSize: '1.8rem', fontWeight: 950, letterSpacing: '-1px' }}>ANDACOLLO: ORO Y FE</h3>
                                        <p style={{ margin: '8px 0 0', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', maxWidth: '70%', lineHeight: 1.4 }}>Investigación territorial sobre la minería y religiosidad regional.</p>
                                    </div>
                                </div>

                                {/* VALLENAR CARD */}
                                <div 
                                    onClick={() => navigate('/vallenar')}
                                    className="glass-panel hover-lift group"
                                    style={{
                                        aspectRatio: '16/9', borderRadius: '35px', overflow: 'hidden', cursor: 'pointer',
                                        position: 'relative', border: '1px solid rgba(168, 85, 247, 0.4)',
                                        background: '#1e1b4b'
                                    }}
                                >
                                    <img src="/media/vallenar/VallenarMíticoImagen.png" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} alt="Vallenar Background" />
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(46,16,101,0.95), transparent)', zIndex: 1 }} />
                                    
                                    {/* 3D Character Decorator (Vallenar Inti) */}
                                    {!isMobile && (
                                        <motion.img 
                                            initial={{ x: 50, opacity: 0 }}
                                            whileInView={{ x: 0, opacity: 1 }}
                                            src="/media/vallenar/characters/inti.png"
                                            style={{ position: 'absolute', bottom: -10, right: 10, height: '95%', objectFit: 'contain', zIndex: 4, filter: 'drop-shadow(0 0 30px rgba(168,85,247,0.5))' }}
                                        />
                                    )}

                                    <div style={{ position: 'relative', zIndex: 10, padding: '2.5rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                                        <div style={{ display: 'flex', gap: '8px', marginBottom: '0.8rem' }}>
                                            <span style={{ background: '#a855f7', color: 'white', padding: '4px 14px', borderRadius: '50px', fontSize: '0.65rem', fontWeight: 950, letterSpacing: '2px' }}>VLS PREMIERE</span>
                                            <span style={{ background: 'rgba(255,255,255,0.1)', color: 'white', padding: '4px 14px', borderRadius: '50px', fontSize: '0.65rem', fontWeight: 950 }}>PERLA DEL HUASCO</span>
                                        </div>
                                        <h3 style={{ margin: 0, color: 'white', fontSize: '1.8rem', fontWeight: 950, letterSpacing: '-1px' }}>VALLENAR: MITOLOGÍA</h3>
                                        <p style={{ margin: '8px 0 0', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', maxWidth: '70%', lineHeight: 1.4 }}>Exploración digital sobre el embalse Santa Juana y su biodiversidad.</p>
                                    </div>
                                </div>
                            </div>

                            {/* TARJETAS RÁPIDAS: CLASICA, PERALES, VIAL */}
                            <div style={{ 
                                gridColumn: '1 / -1', 
                                display: 'grid', 
                                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', 
                                gap: '2rem',
                                marginBottom: '2.5rem'
                            }}>
                                {/* RADIO CLASICA */}
                                <div 
                                    onClick={() => navigate('/clasica')}
                                    className="glass-panel hover-lift"
                                    style={{ padding: '2.5rem', background: 'linear-gradient(135deg, rgba(153, 27, 27, 0.4) 0%, rgba(2, 6, 23, 0.9) 100%)', borderRadius: '30px', border: '1px solid rgba(239, 68, 68, 0.3)', display: 'flex', flexDirection: 'column', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
                                >
                                    <h4 style={{ color: '#ef4444', fontSize: '0.7rem', fontWeight: 900, letterSpacing: '2px', marginBottom: '10px' }}>RADIO VLS</h4>
                                    <h3 style={{ color: 'white', fontSize: '1.8rem', fontWeight: 950, marginBottom: '15px' }}>CLÁSICA</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>El proyecto Alma Eterna de streaming lossless y curaduría audiovisual.</p>
                                </div>

                                {/* LOS PERALES */}
                                <div 
                                    onClick={() => navigate('/perales')}
                                    className="glass-panel hover-lift"
                                    style={{ padding: '2.5rem', background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.4) 0%, rgba(2, 6, 23, 0.9) 100%)', borderRadius: '30px', border: '1px solid rgba(249, 115, 22, 0.3)', display: 'flex', flexDirection: 'column', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
                                >
                                    <h4 style={{ color: '#f97316', fontSize: '0.7rem', fontWeight: 900, letterSpacing: '2px', marginBottom: '10px' }}>DENUNCIA VLS</h4>
                                    <h3 style={{ color: 'white', fontSize: '1.8rem', fontWeight: 950, marginBottom: '15px' }}>LOS PERALES</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>Investigación sobre la emergencia sanitaria y el estado de los ductos.</p>
                                </div>

                                {/* SEGURIDAD VIAL */}
                                <div 
                                    onClick={() => navigate('/vial')}
                                    className="glass-panel hover-lift"
                                    style={{ padding: '2.5rem', background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.4) 0%, rgba(2, 6, 23, 0.9) 100%)', borderRadius: '30px', border: '1px solid rgba(45, 212, 191, 0.3)', display: 'flex', flexDirection: 'column', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
                                >
                                    <h4 style={{ color: '#2dd4bf', fontSize: '0.7rem', fontWeight: 900, letterSpacing: '2px', marginBottom: '10px' }}>REPORTAJE VLS</h4>
                                    <h3 style={{ color: 'white', fontSize: '1.8rem', fontWeight: 950, marginBottom: '15px' }}>EDICIÓN VIAL</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>Análisis de la ruta 5, congestión, lomos de toros y medidas estructurales.</p>
                                </div>
                                
                                {/* ARCADE ZONE */}
                                <div 
                                    onClick={() => navigate('/arcade')}
                                    className="glass-panel hover-lift"
                                    style={{ padding: '2.5rem', background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.4) 0%, rgba(2, 6, 23, 0.9) 100%)', borderRadius: '30px', border: '1px solid rgba(168, 85, 247, 0.3)', display: 'flex', flexDirection: 'column', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
                                >
                                    <h4 style={{ color: '#a855f7', fontSize: '0.7rem', fontWeight: 900, letterSpacing: '2px', marginBottom: '10px' }}>VLS LAB</h4>
                                    <h3 style={{ color: 'white', fontSize: '1.8rem', fontWeight: 950, marginBottom: '15px' }}>ARCADE</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>Experimentos interactivos, minijuegos y desarrollo tecnológico regional.</p>
                                </div>
                            </div>
                        </div>

                        {/* VOCES VECINALES & HEMEROTECA SECTION (PROMOTED FOR VISIBILITY) */}
                        <div style={{ maxWidth: '1400px', margin: '4rem auto 2rem auto', width: '100%', padding: '0 2rem', boxSizing: 'border-box' }}>
                                 <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '2rem' }}>
                                    <div style={{ background: 'linear-gradient(45deg, #ef4444, #f59e0b)', padding: '12px', borderRadius: '15px', color: 'white' }}>
                                        <Mic size={28} />
                                    </div>
                                    <div>
                                        <h2 style={{ color: 'white', margin: 0, fontSize: '2.2rem', fontWeight: '900', letterSpacing: '5px', textTransform: 'uppercase', fontFamily: '"Outfit", sans-serif' }}>VOCES Y ARCHIVOS</h2>
                                        <p style={{ color: '#f59e0b', margin: 0, fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '2px' }}>HEMEROTECA DIGITAL · PORTAL DE LA MEMORIA VLS</p>
                                    </div>
                                    <div style={{ height: '2px', flex: 1, background: 'linear-gradient(90deg, #f59e0b, transparent)' }}></div>
                                 </div>

                                 <div id="search-results-anchor" />
                                 <Suspense fallback={<div />}>
                                    <VLSNotesGallery />
                                 </Suspense>
                        </div>

                        {/* SALUD LA SERENA PREMIUM CARD */}
                        <div style={{ maxWidth: '1400px', margin: '0 auto 2.5rem auto', width: '100%', padding: '0 2rem', boxSizing: 'border-box' }}>
                             <div 
                                  onClick={() => navigate('/salud')}
                                  className="glass-panel gaudi-curves hover-lift animate-fade-in" 
                                  style={{ 
                                      background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.7) 0%, rgba(2, 6, 23, 0.95) 100%)', 
                                      padding: isMobile ? '1.5rem' : '2.5rem', 
                                      borderRadius: '35px', 
                                      cursor: 'pointer',
                                      border: '1px solid rgba(239, 68, 68, 0.5)',
                                      position: 'relative',
                                      overflow: 'hidden',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      marginBottom: '2.5rem',
                                      boxShadow: '0 25px 50px -12px rgba(239, 68, 68, 0.2)'
                                  }}
                             >
                                 <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'url("/salud/VLS_Nueva_Salud_La_Serena.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.35, zIndex: 0 }}></div>
                                 <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                     <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.2rem' }}>
                                         <div style={{ background: '#ef4444', color: 'white', padding: '5px 15px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 900, letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 5px 15px rgba(239,68,68,0.5)' }}>
                                             🎙️ ANÁLISIS EDITORIAL
                                         </div>
                                     </div>
                                     <h3 style={{ color: 'white', fontSize: isMobile ? '1.8rem' : '2.5rem', fontWeight: 950, marginBottom: '1rem', lineHeight: 1.1, textShadow: '0 5px 15px rgba(0,0,0,0.5)' }}>CRUZADA POR LA SALUD MUNICIPAL</h3>
                                     <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', lineHeight: 1.6, maxWidth: '800px', margin: 0, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                                         El "Plan Norambuena" busca extirpar el déficit histórico y rescatar la atención primaria en La Serena desde la "UCI" a la dignidad. <b>Incluye podcast inmersivo y respaldos oficiales.</b>
                                     </p>
                                     <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px', color: '#fca5a5', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '1px' }}>
                                         ESCUCHAR REPORTAJE Y VER CIFRAS ➔
                                     </div>
                                 </div>
                             </div>
                        </div>

                        {/* CAMBIO DE HORA 2025 PREMIUM CARD */}
                        <div style={{ maxWidth: '1400px', margin: '0 auto 2.5rem auto', width: '100%', padding: '0 2rem', boxSizing: 'border-box' }}>
                             <div 
                                  onClick={handleHorario}
                                  className="glass-panel gaudi-curves hover-lift animate-fade-in" 
                                  style={{ 
                                      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', 
                                      padding: isMobile ? '1.5rem' : '2.5rem', 
                                      borderRadius: '35px', 
                                      cursor: 'pointer',
                                      border: '1px solid rgba(251,191,36,0.6)',
                                      position: 'relative',
                                      overflow: 'hidden',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      marginBottom: '2.5rem',
                                      boxShadow: '0 25px 50px -12px rgba(251, 191, 36, 0.2)'
                                  }}
                             >
                                 <div style={{ position: 'absolute', top: '-5%', right: '-5%', opacity: 0.1, zIndex: 0 }}>
                                     <Clock size={isMobile ? 150 : 220} color="#fbbf24" />
                                 </div>
                                 <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                         <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                             <span style={{ background: '#fbbf24', color: '#000', padding: '0.4rem 1.2rem', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 900 }}>HEMEROTECA / VLS INVESTIGA</span>
                                         </div>
                                         <div style={{ display: 'flex', gap: '8px', color: '#fbbf24', opacity: 1 }}>
                                             <HistoryIcon size={18} className="animate-spin-slow" />
                                         </div>
                                     </div>
                                     <h2 style={{ color: 'white', fontSize: isMobile ? '1.5rem' : '1.8rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '1rem', fontFamily: '"Outfit", sans-serif' }}>EL GRAN CAMBIO DE HORA 2025</h2>
                                     <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', margin: '0 0 1.5rem 0', fontWeight: 400, lineHeight: 1.4, flex: 1 }}>
                                         Chile atrasa sus relojes este 5 de abril. Investigamos el origen de esta medida, sus efectos en el organismo y cómo asimilarlo con éxito desde La Serena.
                                     </p>
                                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                         <button className="btn-vls-action-light" style={{ padding: '0.6rem 1.5rem', fontSize: '0.8rem', background: '#fbbf24', color: '#000', border: 'none', borderRadius: '12px', fontWeight: '900' }}>REVISAR INVESTIGACIÓN</button>
                                         <span style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '0.7rem', letterSpacing: '1px' }}>ESTADO: GMT-4 ACTIVO</span>
                                     </div>
                                 </div>
                             </div>
                        </div>

                        {/* ARTEMIS II PREMIUM REPORT */}
                        <div style={{ maxWidth: '1400px', margin: '0 auto 2.5rem auto', width: '100%', padding: '0 2rem', boxSizing: 'border-box' }}>
                             <div 
                                 onClick={() => setShowVLSNewsArtemis(true)}
                                 className="glass-panel gaudi-curves hover-lift animate-fade-in" 
                                 style={{ 
                                     background: 'linear-gradient(135deg, #020617 0%, #0f172a 100%)', 
                                     padding: isMobile ? '1.5rem' : '2.5rem', 
                                     borderRadius: '35px', 
                                     cursor: 'pointer',
                                     border: '1px solid rgba(56,189,248,0.6)',
                                     position: 'relative',
                                     overflow: 'hidden',
                                     display: 'flex',
                                     flexDirection: 'column',
                                     boxShadow: '0 25px 50px -12px rgba(56, 189, 248, 0.3)',
                                     animation: 'vls-stardust-pulse 3s infinite alternate'
                                 }}
                            >
                                <div style={{ position: 'absolute', top: '-5%', right: '-5%', opacity: 0.12, zIndex: 0 }}>
                                    <Rocket size={isMobile ? 150 : 220} color="#38bdf8" />
                                </div>
                                <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ background: '#38bdf8', color: '#000', padding: '0.4rem 1.2rem', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 900 }}>NASA / VLS</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '8px', color: '#38bdf8', opacity: 1 }}>
                                            <Sparkles size={18} className="animate-pulse" />
                                        </div>
                                    </div>
                                    <h2 style={{ color: 'white', fontSize: isMobile ? '1.5rem' : '1.8rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '1rem', fontFamily: '"Outfit", sans-serif' }}>ARTEMIS II: RUMBO A LA LUNA</h2>
                                    <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', margin: '0 0 1.5rem 0', fontWeight: 400, lineHeight: 1.4, flex: 1 }}>
                                        Visualización 3D del Orion Spacecraft y la nueva frontera de la humanidad. El futuro de la exploración espacial desde La Serena.
                                    </p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                        <button className="btn-vls-action-light" style={{ padding: '0.6rem 1.5rem', fontSize: '0.8rem', background: '#38bdf8', color: '#000', border: 'none', borderRadius: '12px', fontWeight: '900' }}>INICIAR MISIÓN</button>
                                        <span style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '0.7rem', letterSpacing: '1px' }}>ESTADO: EN ÓRBITA</span>
                                    </div>
                                </div>
                            </div>

                            {/* BENCINAZO REPORT */}
                            <div 
                                onClick={() => setShowBencinazo(true)}
                                className="glass-panel gaudi-curves hover-lift animate-fade-in" 
                                style={{ 
                                    background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)', 
                                    padding: isMobile ? '1.5rem' : '2.5rem', 
                                    borderRadius: '35px', 
                                    cursor: 'pointer',
                                    border: '1px solid #fbbf2460',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                                }}
                            >
                                <div style={{ position: 'absolute', top: '-5%', right: '-5%', opacity: 0.08, zIndex: 0 }}>
                                    <Fuel size={isMobile ? 150 : 220} color="#fbbf24" />
                                </div>
                                <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ background: '#fbbf24', color: '#000', padding: '0.4rem 1.2rem', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 900 }}>ALERTA ECONÓMICA</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '8px', color: '#fbbf24', opacity: 0.8 }}>
                                            <AlertCircle size={18} />
                                        </div>
                                    </div>
                                    <h2 style={{ color: 'white', fontSize: isMobile ? '1.5rem' : '1.8rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '1rem', fontFamily: '"Outfit", sans-serif' }}>ESPEJISMO AMERICANO</h2>
                                    <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', margin: '0 0 1.5rem 0', fontWeight: 400, lineHeight: 1.4, flex: 1 }}>
                                        ¿Bencina de Primer Mundo con sueldos de tercero? El choque de realidades del Ministro Quiroz y su impacto en La Serena.
                                    </p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                        <button className="btn-vls-action-yellow" style={{ padding: '0.6rem 1.5rem', fontSize: '0.8rem', color: '#000', border: 'none', background: '#fbbf24', borderRadius: '12px', fontWeight: '900' }}>VER REPORTE</button>
                                        <span style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '0.7rem', letterSpacing: '1px' }}>88% CRÍTICO</span>
                                    </div>
                                </div>
                            </div>

                            {/* PARADOJA REPORT */}
                            <div 
                                onClick={() => setShowInvestigacion(true)}
                                className="glass-panel gaudi-curves hover-lift animate-fade-in" 
                                style={{ 
                                    background: 'linear-gradient(135deg, #ef4444 0%, #7f1d1d 100%)', 
                                    padding: isMobile ? '1.5rem' : '2.5rem', 
                                    borderRadius: '35px', 
                                    cursor: 'pointer',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                                }}
                            >
                                <div style={{ position: 'absolute', top: '-5%', right: '-5%', opacity: 0.08, zIndex: 0 }}>
                                    <Newspaper size={isMobile ? 150 : 200} color="white" />
                                </div>
                                <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ background: 'white', color: '#ef4444', padding: '0.4rem 1.2rem', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 900 }}>INVESTIGACIÓN CENTRAL</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '8px', color: 'white', opacity: 0.8 }}>
                                            <Zap size={18} />
                                        </div>
                                    </div>
                                    <h2 style={{ color: 'white', fontSize: isMobile ? '1.5rem' : '1.8rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '1rem', fontFamily: '"Outfit", sans-serif' }}>LA PARADOJA 2025</h2>
                                    <p style={{ color: 'white', fontSize: '0.95rem', margin: '0 0 1.5rem 0', fontWeight: 400, lineHeight: 1.4, flex: 1 }}>
                                        ¿Por qué la educación apagó el supercomputador del futuro? Una crisis pedagógica silenciada en el Chile actual.
                                    </p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                        <button className="btn-vls-action-white" style={{ background: 'white', color: '#ef4444', padding: '0.6rem 1.5rem', fontSize: '0.8rem', border: 'none', borderRadius: '12px', fontWeight: '900' }}>LEER AHORA</button>
                                        <span style={{ color: 'white', fontWeight: 'bold', fontSize: '0.7rem', letterSpacing: '1px' }}>VLS EXCLUSIVO</span>
                                    </div>
                                </div>
                            </div>
                            {/* PODUJE REPORT */}
                            <div 
                                onClick={() => setShowPoduje(true)}
                                className="glass-panel gaudi-curves hover-lift animate-fade-in" 
                                style={{ 
                                    background: 'linear-gradient(135deg, #8b5cf6 0%, #4c1d95 100%)', 
                                    padding: isMobile ? '1.5rem' : '2.5rem', 
                                    borderRadius: '35px', 
                                    cursor: 'pointer',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                                }}
                            >
                                <div style={{ position: 'absolute', top: '-5%', right: '-5%', opacity: 0.08, zIndex: 0 }}>
                                    <HomeIcon size={isMobile ? 150 : 200} color="white" />
                                </div>
                                <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ background: 'white', color: '#8b5cf6', padding: '0.4rem 1.2rem', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 900 }}>VIVIENDA Y TERRITORIO</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '8px', color: 'white', opacity: 0.8 }}>
                                            <LayoutGrid size={18} />
                                        </div>
                                    </div>
                                    <h2 style={{ color: 'white', fontSize: isMobile ? '1.5rem' : '1.8rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '1rem', fontFamily: '"Outfit", sans-serif' }}>DILEMA DE LA VIVIENDA</h2>
                                    <p style={{ color: 'white', fontSize: '0.95rem', margin: '0 0 1.5rem 0', fontWeight: 400, lineHeight: 1.4, flex: 1 }}>
                                        ¿Por qué nadie compra casas hoy? La paradoja de la vivienda sin IVA que congeló el mercado nacional y regional.
                                    </p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                        <button className="btn-vls-action-white" style={{ background: 'white', color: '#8b5cf6', padding: '0.6rem 1.5rem', fontSize: '0.8rem', border: 'none', borderRadius: '12px', fontWeight: '900' }}>VER INFORME</button>
                                        <span style={{ color: 'white', fontWeight: 'bold', fontSize: '0.7rem', letterSpacing: '1px' }}>ALERTA MERCADO</span>
                                    </div>
                                </div>
                            </div>

                            {/* JORGE CAMPOS REPORT */}
                            <div 
                                onClick={() => {
                                    const ev = new CustomEvent('open-vls-note', { detail: 'ZAJpC9o-Mok' });
                                    window.dispatchEvent(ev);
                                }}
                                className="glass-panel gaudi-curves hover-lift animate-fade-in" 
                                style={{ 
                                    background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', 
                                    padding: isMobile ? '1.5rem' : '2.5rem', 
                                    borderRadius: '35px', 
                                    cursor: 'pointer',
                                    border: '1px solid rgba(59,130,246,0.4)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                                }}
                            >
                                <div style={{ position: 'absolute', top: '-5%', right: '-5%', opacity: 0.08, zIndex: 0 }}>
                                    <Music size={isMobile ? 150 : 200} color="#3b82f6" />
                                </div>
                                <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ background: '#3b82f6', color: 'white', padding: '0.4rem 1.2rem', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 900 }}>ARTE Y CULTURA</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '8px', color: '#3b82f6', opacity: 0.8 }}>
                                            <Star size={18} />
                                        </div>
                                    </div>
                                    <h2 style={{ color: 'white', fontSize: isMobile ? '1.5rem' : '1.8rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '1rem', fontFamily: '"Outfit", sans-serif' }}>MAESTRO CAMPOS</h2>
                                    <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', margin: '0 0 1.5rem 0', fontWeight: 400, lineHeight: 1.4, flex: 1 }}>
                                        La Arquitectura y el Arte de Girar: El virtuoso bajista de Congreso y Fulano reflexiona sobre el bajo como cimiento.
                                    </p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                        <button className="btn-vls-action-light" style={{ background: '#3b82f6', color: 'white', padding: '0.6rem 1.5rem', fontSize: '0.8rem', border: 'none', borderRadius: '12px', fontWeight: '900' }}>VER SESIÓN</button>
                                        <span style={{ color: '#3b82f6', fontWeight: 'bold', fontSize: '0.7rem', letterSpacing: '1px' }}>VLS MASTERCLASS</span>
                                    </div>
                                </div>
                            </div>

                            {/* IGLESIAS DE PIEDRA REPORT */}
                            <div 
                                onClick={() => setShowIglesias(true)}
                                className="glass-panel gaudi-curves hover-lift animate-fade-in" 
                                style={{ 
                                    background: 'linear-gradient(135deg, #451a03 0%, #7d201c 100%)', 
                                    padding: isMobile ? '1.5rem' : '2.5rem', 
                                    borderRadius: '35px', 
                                    cursor: 'pointer',
                                    border: '1px solid rgba(245,158,11,0.4)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    boxShadow: '0 25px 50px -12px rgba(125, 32, 28, 0.4)'
                                }}
                            >
                                <div style={{ position: 'absolute', top: '-5%', right: '-5%', opacity: 0.12, zIndex: 0 }}>
                                    <Church size={isMobile ? 150 : 220} color="#f59e0b" />
                                </div>
                                <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ background: '#f59e0b', color: '#000', padding: '0.4rem 1.2rem', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 900 }}>PATRIMONIO VLS</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '8px', color: '#f59e0b', opacity: 1 }}>
                                            <HistoryIcon size={18} className="animate-pulse" />
                                        </div>
                                    </div>
                                    <h2 style={{ color: 'white', fontSize: isMobile ? '1.5rem' : '1.8rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '1rem', fontFamily: '"Outfit", sans-serif' }}>IGLESIAS DE PIEDRA</h2>
                                    <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', margin: '0 0 1.5rem 0', fontWeight: 400, lineHeight: 1.4, flex: 1 }}>
                                        Investigación: Los secretos de La Merced y la arquitectura de piedra caliza que define el alma de La Serena Colonial.
                                    </p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                        <button className="btn-vls-action-light" style={{ padding: '0.6rem 1.5rem', fontSize: '0.8rem', background: '#f59e0b', color: '#000', border: 'none', borderRadius: '12px', fontWeight: '900' }}>EXPLORAR RUTA</button>
                                        <span style={{ color: '#f59e0b', fontWeight: 'bold', fontSize: '0.7rem', letterSpacing: '1px' }}>VLS PATRIMONIAL</span>
                                    </div>
                                </div>
                            </div>

                            {/* CULEBRON REPORT */}
                            <div 
                                onClick={() => {
                                    const ev = new CustomEvent('open-vls-note', { detail: 'lgjba4j0Afo' });
                                    window.dispatchEvent(ev);
                                }}
                                className="glass-panel gaudi-curves hover-lift animate-fade-in" 
                                style={{ 
                                    background: 'linear-gradient(135deg, #831843 0%, #064e3b 100%)', 
                                    padding: isMobile ? '1.5rem' : '2.5rem', 
                                    borderRadius: '35px', 
                                    cursor: 'pointer',
                                    border: '1px solid rgba(236,72,153,0.4)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                                }}
                            >
                                <div style={{ position: 'absolute', top: '-5%', right: '-5%', opacity: 0.08, zIndex: 0 }}>
                                    <Waves size={isMobile ? 150 : 200} color="#ec4899" />
                                </div>
                                <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ background: '#ec4899', color: 'white', padding: '0.4rem 1.2rem', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 900 }}>MEDIO AMBIENTE</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '8px', color: '#ec4899', opacity: 0.8 }}>
                                            <Droplets size={18} />
                                        </div>
                                    </div>
                                    <h2 style={{ color: 'white', fontSize: isMobile ? '1.5rem' : '1.8rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '1rem', fontFamily: '"Outfit", sans-serif' }}>EL CULEBRÓN</h2>
                                    <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', margin: '0 0 1.5rem 0', fontWeight: 400, lineHeight: 1.4, flex: 1 }}>
                                        Urbanismo de Borde: Recuperando el Pulmón de Coquimbo. Una infraestructura verde resiliente para el futuro.
                                    </p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                        <button className="btn-vls-action-light" style={{ background: '#ec4899', color: 'white', padding: '0.6rem 1.5rem', fontSize: '0.8rem', border: 'none', borderRadius: '12px', fontWeight: '900' }}>VER PROYECTO</button>
                                        <span style={{ color: '#ec4899', fontWeight: 'bold', fontSize: '0.7rem', letterSpacing: '1px' }}>SANTUARIO VLS</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '0 1rem' }}>
                        {/* ENCABEZADO DE BÚSQUEDA Y CATEGORÍAS */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem', width: '100%' }}>
                            <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
                                <Search size={20} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                <input
                                    type="text"
                                    placeholder="Buscar módulo, trámite o servicio..."
                                    value={searchTerm}
                                    onChange={(e) => { setSearchTerm(e.target.value); if (e.target.value) setViewMode('full'); }}
                                    style={{ width: '100%', padding: '1rem 1.2rem 1rem 3.5rem', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '25px', color: 'white', fontSize: '1rem', outline: 'none', backdropFilter: 'blur(10px)', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}
                                />
                                <button
                                    onClick={startVoiceSearch}
                                    style={{ position: 'absolute', right: '1.2rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
                                >
                                    <Mic size={20} />
                                </button>
                            </div>
                            <div style={{ display: 'flex', gap: '0.8rem' }}>
                                <button onClick={() => setViewMode('personalized')} style={{ background: viewMode === 'personalized' ? '#fbbf24' : 'rgba(255,255,255,0.05)', color: viewMode === 'personalized' ? '#000' : '#fff', padding: '0.8rem 1.4rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                    <Pin size={18} /> Mi Top 5
                                </button>
                                <button onClick={() => setViewMode('full')} style={{ background: viewMode === 'full' ? 'var(--brand-primary)' : 'rgba(255,255,255,0.05)', color: 'white', padding: '0.8rem 1.4rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                    <LayoutGrid size={18} /> Mosaicos
                                </button>
                            </div>
                        </div>

                        {/* VISTA FILTRADA / PERSONALIZADA */}
                        {(viewMode === 'personalized' || searchTerm !== "") && (
                            <div style={{ marginBottom: '4rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                                    <div style={{ height: '2px', flex: 1, background: 'linear-gradient(90deg, transparent, #fbbf24)' }}></div>
                                    <h3 style={{ color: '#fbbf24', margin: 0, fontSize: '1.4rem', letterSpacing: '2px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        {viewMode === 'personalized' ? <Pin size={24} /> : <Search size={24} />}
                                        {viewMode === 'personalized' ? 'MI PANEL PERSONALIZADO (TOP 5)' : `RESULTADOS DE BÚSQUEDA (${filteredApps.length})`}
                                    </h3>
                                    <div style={{ height: '2px', flex: 1, background: 'linear-gradient(-90deg, transparent, #fbbf24)' }}></div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                                    {displayApps.filter(app => app && app?.id).map(app => <AppCard key={app?.id || Math.random()} app={app} />)}
                                </div>
                            </div>
                        )}

                        {/* VISTA POR MOSAICOS (FULL) */}
                        {viewMode === 'full' && searchTerm === "" && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
                                {categories.map(cat => (
                                    <div key={cat?.id || Math.random()} id={cat?.id ? `cat-section-${cat?.id}` : undefined} style={{ scrollMarginTop: '100px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}>
                                            <h3 style={{ color: 'white', margin: 0, fontSize: '1.5rem', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: '900', fontFamily: '"Outfit", sans-serif' }}>
                                                {cat?.name || 'SECCIÓN'}
                                            </h3>
                                            <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, rgba(255,255,255,0.2), transparent)' }}></div>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                                            {allApps
                                                .filter(app => app?.id && Array.isArray(cat?.modules) && cat.modules.includes(app.id))
                                                .map(app => <AppCard key={app?.id || Math.random()} app={app} />)
                                            }
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div style={{ height: '6rem' }} />

                    <div style={{ height: '5rem' }} />

                    {!isRDMLS && (
                    <div style={{ maxWidth: '1200px', margin: '4rem auto 0 auto', width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
                            <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, transparent, rgba(236, 72, 153, 0.5))' }}></div>
                            <h3 style={{ color: '#ec4899', margin: 0, fontSize: '1.3rem', letterSpacing: '2px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <ShieldAlert size={20} color="#ec4899" />
                                <span style={{ color: '#ec4899', fontWeight: '900', letterSpacing: '1px' }}>
                                    vecinoslaserena.cl
                                </span>
                            </h3>
                            <div style={{ height: '1px', flex: 1, background: 'linear-gradient(-90deg, transparent, rgba(236, 72, 153, 0.5))' }}></div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                            {officialNews.map((news, idx) => {
                                if (!news) return null;
                                const IconCmp = getIconComponent(news.iconStr);
                                return (
                                    <div 
                                    key={news?.id || idx} 
                                    className="glass-panel gaudi-curves hover-lift" 
                                    onClick={() => {
                                        if (news?.eventId) window.dispatchEvent(new CustomEvent(news.eventId));
                                        else if (news?.url) window.open(news.url, '_blank');
                                    }}
                                    style={{ display: 'flex', flexDirection: 'column', padding: '0', border: `1px solid ${news?.color || '#333'}30`, background: `linear-gradient(135deg, ${news?.color || '#333'}15 0%, rgba(0,0,0,0.4) 100%)`, cursor: 'pointer', overflow: 'hidden' }}
                                >
                                        {news.image && (
                                            <div style={{ height: '140px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                                                <img src={news.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={news.title} loading="lazy" />
                                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.6))' }}></div>
                                            </div>
                                        )}
                                        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                                <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'black', background: news?.color || '#333', padding: '0.2rem 0.6rem', borderRadius: '20px' }}>
                                                    {news?.category || 'INFO'}
                                                </span>
                                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{news?.date || ''}</span>
                                            </div>
                                            <h4 style={{ color: 'white', margin: '0 0 0.5rem 0', fontSize: '1.2rem', lineHeight: '1.4' }}>{news?.title || ''}</h4>
                                            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: '1.5', margin: '0 0 1rem 0', flex: 1 }}>{news?.desc || ''}</p>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: news?.color || '#38bdf8', fontSize: '0.9rem', fontWeight: 'bold', marginTop: 'auto' }}>
                                                {IconCmp ? <IconCmp size={16} /> : <BookOpen size={16} />}
                                                Leer Nota Completa
                                                <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); handleShareNews(news); }}
                                                        style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                                        title="Compartir Noticia"
                                                    >
                                                        <Share2 size={16} />
                                                    </button>
                                                    <SkipForward size={14} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                            <button onClick={() => navigate('/noticias')} className="btn-glass" style={{ fontSize: '0.9rem', padding: '0.5rem 1.5rem', borderRadius: '30px' }}>Ver Archivo de Noticias (RDMLS) <Globe size={14} style={{ marginLeft: '5px' }} /></button>
                        </div>
                    </div>
                    )}

                    {/* VLS MOTORS (HIDDEN PER USER REQUEST)
                    {!isRDMLS && <VLSMotorsSpot />} 
                    */}

                    {/* GRID PLANO ELIMINADO PARA MANTENER LA VISTA "MASTER CEO" (BENTO GRID POR CATEGRÍAS FUNCIONANDO ARRIBA) */}


                    {/* El render estático de VecinityPay fue eliminado para no bloquear el dashboard */}
                    {/* HERRAMIENTAS INTERNAS (Sólo Autorizados o Portales Maestros) */}
                    {(isAuthorized || isRDMLS || host.includes('vecinosmart.cl')) && (
                        <div style={{ maxWidth: '1200px', margin: '4rem auto 0 auto', width: '100%', padding: '0 1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', gap: '1.5rem' }}>
                                <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.5))' }}></div>
                                <h3 className="text-gradient" style={{ margin: 0, fontSize: '1.6rem', letterSpacing: '4px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <Lock size={20} color="#38bdf8" /> {isRDMLS ? 'Gestión Interna Municipal' : 'Gestión Interna VLS'}
                                </h3>
                                <div style={{ height: '1px', flex: 1, background: 'linear-gradient(-90deg, transparent, rgba(56,189,248,0.5))' }}></div>
                            </div>
                            {/* Main Content Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem', marginTop: '2.5rem' }}>
                                {internalTools.filter(app => app && app?.id).map(app => (
                                    <AppCard key={app?.id || Math.random()} app={app} />
                                ))}
                            </div>
                        </div>
                    )}
                    {isVLS && (
                        <div style={{ maxWidth: '1200px', margin: '4rem auto 0 auto', width: '100%', padding: '0 1rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                                <NavieraMonitor isMini={true} />
                                <LaFloridaAirport isMini={true} />
                            </div>
                            <MusicRanking />
                            {/* <NewsDataStrip /> */}
                            {/* SportsDataStrip eliminado por inconsistencia de datos */}
                            
                            {/* TUERCA VECINOS - REFACTORIZADO A CTA COMPACTO */}
                            <div className="glass-panel gaudi-curves hover-scale" style={{ 
                                marginTop: '4rem', 
                                padding: '2.5rem', 
                                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(15, 23, 42, 0.9))', 
                                border: '2.5px solid #f59e0b',
                                borderRadius: '35px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '2rem',
                                cursor: 'pointer',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
                                flexWrap: 'wrap'
                            }} onClick={() => window.dispatchEvent(new CustomEvent('open-tuerca-vecinos'))}>
                                <div style={{ background: '#f59e0b', padding: '1.2rem', borderRadius: '25px', color: 'white', boxShadow: '0 0 25px rgba(245, 158, 11, 0.5)' }}>
                                    <Settings size={35} />
                                </div>
                                <div style={{ flex: 1, minWidth: '300px' }}>
                                    <h3 style={{ color: 'white', margin: 0, fontSize: '1.8rem', fontWeight: '900', letterSpacing: '2px' }}>TUERCA VECINOS MECÁNICOS</h3>
                                    <p style={{ color: '#fcd34d', margin: '0.3rem 0 0 0', fontSize: '1rem', fontWeight: 'bold' }}>¿Fallas en tu Toyota, Hyundai o Peugeot? Busca tips de reparación rápida aquí.</p>
                                </div>
                                <div style={{ display: 'flex', gap: '15px', alignItems: 'center', background: 'rgba(0,0,0,0.3)', padding: '10px 25px', borderRadius: '50px', border: '1px solid #f59e0b40' }}>
                                    <Search size={22} color="#f59e0b" />
                                    <span style={{ color: 'white', fontWeight: '900', fontSize: '0.9rem' }}>BUSCAR TIPS MECÁNICOS</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SECCIÓN GUARDIANES DE LA REGIÓN (Upgrade a 3D Elite 2025) */}
                    <div style={{ maxWidth: '1200px', margin: '6rem auto 0 auto', width: '100%', padding: '0 1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '3rem', gap: '1.5rem' }}>
                            <div style={{ height: '2px', flex: 1, background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.5))' }}></div>
                            <h3 className="text-gradient" style={{ margin: 0, fontSize: '2.2rem', letterSpacing: '6px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '1.5rem', fontWeight: '900', fontFamily: '"Outfit", sans-serif' }}>
                                <Sparkles size={32} color="#38bdf8" /> Guardianes de la Región
                            </h3>
                            <div style={{ height: '2px', flex: 1, background: 'linear-gradient(-90deg, transparent, rgba(56,189,248,0.5))' }}></div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
                            {guardianes.map((char) => {
                                if (!char || !char?.id) return null;
                                return (
                                    <div key={char?.id} className="glass-panel gaudi-curves hover-lift" style={{ 
                                        padding: '2rem', 
                                        textAlign: 'center', 
                                        border: '1.5px solid rgba(255,255,255,0.15)', 
                                        background: 'linear-gradient(180deg, rgba(30,41,59,0.7) 0%, rgba(15,23,42,0.95) 100%)', 
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        alignItems: 'center', 
                                        gap: '1.2rem', 
                                        boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}>
                                        {/* Visual 3D Loader Placeholder (Reemplazar por Canvas si @react-three/fiber está disponible globalmente) */}
                                        <div style={{ 
                                            position: 'relative', 
                                            width: '240px', 
                                            height: '240px', 
                                            borderRadius: '32px', 
                                            overflow: 'hidden', 
                                            border: '1.5px solid rgba(56,189,248,0.3)', 
                                            background: 'radial-gradient(circle, #1e293b 0%, #020617 100%)',
                                            boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8), 0 0 25px rgba(56,189,248,0.2)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            {/* Fallback a Imagen si el modelo no carga o para preview rápido, pero con estilo 3D */}
                                            <div style={{ fontSize: '0.6rem', position: 'absolute', top: 10, left: 10, color: '#38bdf8', fontWeight: 900, letterSpacing: '1px', textTransform: 'uppercase' }}>VLS BIOMETRIC SCAN</div>
                                            {char.id === 'serenito-guard' && !isMobile ? (
                                                <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }} style={{ width: '100%', height: '100%' }} dpr={[1, 1.5]}>
                                                    <ambientLight intensity={1.2} />
                                                    <pointLight position={[10, 10, 10]} intensity={1.5} />
                                                    <Environment preset="city" />
                                                    <Suspense fallback={null}>
                                                        <UniversalSerenito 
                                                            animation="Wave" 
                                                            scale={2.4} 
                                                            position={[0, -2, 0]} 
                                                        />
                                                    </Suspense>
                                                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                                                </Canvas>
                                            ) : (
                                                <img src={char.img} alt={char.name} style={{ width: '85%', height: '85%', objectFit: 'contain', filter: 'drop-shadow(0 0 15px rgba(56,189,248,0.4))' }} loading="lazy" />
                                            )}
                                            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '10px', background: 'linear-gradient(90deg, #38bdf8, transparent, #38bdf8)', opacity: 0.3 }}></div>
                                        </div>

                                        <div style={{ width: '100%' }}>
                                            <h4 style={{ color: '#fff', margin: '0 0 0.3rem 0', fontSize: '1.5rem', fontWeight: '900', letterSpacing: '2px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{(char.name || '').toUpperCase()}</h4>
                                            <div style={{ display: 'inline-block', fontSize: '0.8rem', color: '#000', background: '#38bdf8', padding: '4px 20px', borderRadius: '50px', fontWeight: '900', marginBottom: '1.2rem', boxShadow: '0 0 15px rgba(56,189,248,0.5)' }}>{char.role}</div>
                                            <p style={{ margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', lineHeight: '1.6', fontWeight: 500 }}>"{char.bio}"</p>
                                        </div>
                                        <button 
                                            onClick={() => window.dispatchEvent(new CustomEvent('open-faro-ia', { detail: { target: char.name } }))} 
                                            className="btn-vls-action-light" 
                                            style={{ width: '100%', padding: '1.2rem', borderRadius: '15px', fontSize: '1rem', fontWeight: '900' }}
                                        >Hablar con {char.name}</button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* NUEVA SECCIÓN CÁMARAS EN VIVO C5 */}
                    <div className="vls-perf-section" style={{ maxWidth: '1200px', margin: '3rem auto 0 auto', width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
                            <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.5))' }}></div>
                            <h3 style={{ color: '#10b981', margin: 0, fontSize: '1.3rem', letterSpacing: '2px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <div style={{ width: '12px', height: '12px', background: '#ef4444', borderRadius: '50%', animation: 'pulse 1.5s infinite', boxShadow: '0 0 10px #ef4444' }}></div>
                                Cámaras C5 en Vivo (Faro & Radio Municipal)
                            </h3>
                            <div style={{ height: '1px', flex: 1, background: 'linear-gradient(-90deg, transparent, rgba(16,185,129,0.5))' }}></div>
                        </div>
                        <div className="glass-panel scale-in" style={{ background: 'rgba(0,0,0,0.6)', borderRadius: '24px', padding: '2rem', border: '1px solid rgba(16,185,129,0.3)', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
                            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '1.5rem', maxWidth: '850px', margin: '0 auto 1.5rem auto', fontSize: '1.1rem', lineHeight: '1.6' }}>
                                <strong>Centro de Comando, Control, Cómputo, Comunicaciones y Contacto Ciudadano (C5):</strong> Infraestructura tecnológica avanzada y neutral de seguridad pública, fundamental para la videovigilancia, coordinación de emergencias y contacto ciudadano en tiempo real para cualquier institución protectora.
                            </p>

                            <div style={{ display: 'flex', gap: '15px', flexDirection: window.innerWidth < 768 ? 'column' : 'row', height: window.innerWidth < 768 ? 'auto' : '450px' }}>
                                <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '15px', minHeight: window.innerWidth < 768 ? '300px' : 'auto' }}>
                                    <div style={{ position: 'relative', flex: 1, borderRadius: '12px', overflow: 'hidden', border: '2px solid #C41230', background: '#000' }}>
                                        {(!isMobile) ? (
                                        <video
                                            src="https://raw.githubusercontent.com/vecinoslaserenachile-cloud/juego-serenito/main/Serenito_Polideportivo_Las_Compa%c3%b1ias.mp4"
                                            autoPlay={!isMobile} loop muted playsInline
                                            onCanPlay={e => { if(!isMobile) e.target.play().catch(() => {}); }}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <div style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 900 }}>VIDEO EN PAUSA (AHORRO MÓVIL)</div>
                                            </div>
                                        )}
                                        <div style={{ position: 'absolute', bottom: '8px', left: '12px', color: '#00D4FF', fontSize: '0.8rem', fontWeight: 'bold', textShadow: '0 2px 4px black', background: 'rgba(0,0,0,0.6)', padding: '2px 8px', borderRadius: '4px' }}>CAM-02 (C5)</div>
                                    </div>
                                    <div style={{ position: 'relative', flex: 1, borderRadius: '12px', overflow: 'hidden', border: '2px solid #C41230', background: '#000' }}>
                                        {(!isMobile) ? (
                                        <video
                                            src="https://raw.githubusercontent.com/vecinoslaserenachile-cloud/juego-serenito/main/Serenito_kiosco_suplementero.mp4"
                                            autoPlay={!isMobile} loop muted playsInline
                                            onCanPlay={e => { if(!isMobile) e.target.play().catch(() => {}); }}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <div style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 900 }}>VIDEO EN PAUSA (AHORRO MÓVIL)</div>
                                            </div>
                                        )}
                                        <div style={{ position: 'absolute', bottom: '8px', left: '12px', color: '#00D4FF', fontSize: '0.8rem', fontWeight: 'bold', textShadow: '0 2px 4px black', background: 'rgba(0,0,0,0.6)', padding: '2px 8px', borderRadius: '4px' }}>CAM-03 (C5)</div>
                                    </div>
                                </div>
                                <div style={{ flex: '2', position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '2px solid #C41230', background: '#000', minHeight: window.innerWidth < 768 ? '300px' : 'auto' }}>
                                    {(!isMobile) ? (
                                    <video
                                        src="https://raw.githubusercontent.com/vecinoslaserenachile-cloud/juego-serenito/main/Serenito_paseo_Avenida_Francisco_de_Aguirre.mp4"
                                        autoPlay={!isMobile} loop muted playsInline
                                        onCanPlay={e => { if(!isMobile) e.target.play().catch(() => {}); }}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <div style={{ color: '#FFD700', fontSize: '0.9rem', fontWeight: 900 }}>SEÑAL ACTIVA - CLICK PARA VER</div>
                                        </div>
                                    )}
                                    <div style={{ position: 'absolute', bottom: '15px', left: '20px', color: '#FFD700', fontSize: '1rem', fontWeight: 'bold', textShadow: '0 2px 5px black', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.6)', padding: '5px 12px', borderRadius: '6px' }}>
                                        <div style={{ width: '12px', height: '12px', background: '#ef4444', borderRadius: '50%', animation: 'pulse 1s infinite' }}></div>
                                        <span style={{ letterSpacing: '1px' }}>C5: SERENITO EN TERRENO</span>
                                    </div>
                                </div>
                            </div>

                            <BitacoraC5 />

                            <div style={{ textAlign: 'center', marginTop: '3rem', padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#38bdf8', letterSpacing: '2px' }}>HECHO EN LA SERENA · v3.5 CRISTAL</span>
                            </div>
                        </div>
                    </div>
                </div>
                </main>
            {showVeciCat && <VeciCat onClose={() => setShowVeciCat(false)} />}
            {showVLSMotors && <VLSMotorsSpot onClose={() => setShowVLSMotors(false)} />}
            {showOrientacionLegal && <OrientacionLegal onClose={() => setShowOrientacionLegal(false)} />}
            {showSerenaMetAdmin && <SerenaMetAdmin onClose={() => setShowSerenaMetAdmin(false)} />}
            {showVLSpeak && (
                <div style={{ position: 'relative', zIndex: 100091 }}>
                    <VLSpeakTranslator onClose={() => setShowVLSpeak(false)} />
                    {activeTutorial === 'vlspeak' && (
                        <div style={{ position: 'fixed', bottom: '40px', left: '40px', zIndex: 100092 }}>
                            <VLSGuide sectionId="vlspeak" onClose={() => setActiveTutorial(null)} />
                        </div>
                    )}
                </div>
            )}
            {showSafeRoute && (
                <div style={{ position: 'relative', zIndex: 100091 }}>
                    <SafeRouteAI onClose={() => setShowSafeRoute(false)} />
                    {activeTutorial === 'safe-route' && (
                        <div style={{ position: 'fixed', bottom: '40px', right: '40px', zIndex: 100092 }}>
                            <VLSGuide sectionId="safe-route" onClose={() => setActiveTutorial(null)} />
                        </div>
                    )}
                </div>
            )}
            {showSocialVision && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 1000000, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                    <div style={{ width: '100%', maxWidth: '1200px', height: '85vh', borderRadius: '30px', overflow: 'hidden', boxShadow: '0 25px 50px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', position: 'relative' }}>
                        <SocialVision onClose={() => setShowSocialVision(false)} />
                        {activeTutorial === 'radar' && (
                            <div style={{ position: 'absolute', bottom: '20px', left: '20px', zIndex: 1000001 }}>
                                <VLSGuide sectionId="radar" onClose={() => setActiveTutorial(null)} />
                            </div>
                        )}
                    </div>
                </div>
            )}
            {showAnalyticsApp && (
                <VecinosAnalyticsApp onClose={() => setShowAnalyticsApp(false)} />
            )}
            {showPrecolombino && <PrecolombinoPortal onClose={() => setShowPrecolombino(false)} />}
            {showRoadmap && <VLSRoadmap onClose={() => setShowRoadmap(false)} />}
            {showManifesto && <VLSManifesto onClose={() => setShowManifesto(false)} />}
            {showGalaxia && <GalaxiaDiscoteque onClose={() => setShowGalaxia(false)} />}
            {showAmbientMode && <AmbientModeVLS onClose={() => setShowAmbientMode(false)} />}
            {showPoll && <ParlamentoVecinal onClose={() => setShowPoll(false)} />}
            {showCentralDifusion && <CentralDifusionVLS onClose={() => setShowCentralDifusion(false)} />}
            <Suspense fallback={<LoadingScreen />}>
                {showInvestigacion && <VLSNewsInvestigacion onClose={() => setShowInvestigacion(false)} />}
                {showSemanaSanta && <VLSNewsSemanaSanta onClose={() => setShowSemanaSanta(false)} />}
                {showBencinazo && <VLSNewsBencinazo onClose={() => setShowBencinazo(false)} />}
                {showSentinelNote && <VLSNewsSentinel onClose={() => setShowSentinelNote(false)} />}
                {showPoduje && <VLSNewsPoduje onClose={() => setShowPoduje(false)} />}
                {showAguasValle && <VLSNewsAguasValle onClose={() => setShowAguasValle(false)} />}
                {/* {showChequia && <VLSNewsChequia onClose={() => setShowChequia(false)} />}
                {showIglesias && <VLSNewsIglesiasPiedra onClose={() => setShowIglesias(false)} />}
                {showNewsAvalancha && <VLSNewsAvalancha onClose={() => setShowNewsAvalancha(false)} />} */}
            </Suspense>
            
            {/* MODALS RENDERED IN APP.JSX (GLOBAL EVENT BUS) */}
            {/* Redundant portals removed here to avoid z-index conflicts v5.5 */}
            
            {showSmartAdminPortal && <SmartAdminPortal onClose={() => setShowSmartAdminPortal(false)} currentUser={currentUser} />}
            {showAirportMonitor && <LaFloridaAirport onClose={() => setShowAirportMonitor(false)} />}
            {showPortMonitor && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(10px)', overflowY: 'auto', padding: '2rem' }}>
                    <div style={{ maxWidth: '1250px', margin: '0 auto', position: 'relative' }}>
                        <button onClick={() => setShowPortMonitor(false)} className="btn-glass" style={{ position: 'absolute', top: 0, right: 0, zIndex: 1000, padding: '0.8rem', borderRadius: '50%' }}><X color="white" /></button>
                        <NavieraMonitor isMini={false} />
                    </div>
                </div>
            )}

            {showParliamentary && (
                <Suspense fallback={<div style={{ position: 'fixed', inset: 0, zIndex: 100091, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.8)' }}><LoadingScreen /></div>}>
                    <ParliamentaryObservatory onClose={() => setShowParliamentary(false)} />
                </Suspense>
            )}



            {showEstudio && (
                <Suspense fallback={<div style={{ position: 'fixed', inset: 0, zIndex: 100091, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.8)' }}><LoadingScreen /></div>}>
                    <EstudioVLS onClose={() => setShowEstudio(false)} />
                </Suspense>
            )}

            {showMemorialHijos && (
                <Suspense fallback={<LoadingScreen />}>
                    <MemorialHijosRegion onClose={() => setShowMemorialHijos(false)} />
                </Suspense>
            )}

            {showTiendaPoleras && (
                <TiendaPoleras3D onClose={() => setShowTiendaPoleras(false)} />
            )}

            {showDistancias && (
                <Suspense fallback={<LoadingScreen />}>
                    <DistancesMap onClose={() => setShowDistancias(false)} />
                </Suspense>
            )}

            {showVecnityPay && (
                <VecnityPay onClose={() => { setShowVecnityPay(false); setInitialOrder(null); }} currentUser={currentUser} initialOrder={initialOrder} />
            )}

            {showRequestPortal && (
                <VLSRequestPortal onClose={() => { setShowRequestPortal(false); setReportInitialCategory(null); }} initialCategory={reportInitialCategory} />
            )}

            {showAjedrez && (
                <AjedrezPatrimonialVLS onClose={() => setShowAjedrez(false)} />
            )}
            
            {showVLSNewsTimeChange && (
                <Suspense fallback={<LoadingScreen />}>
                    <VLSNewsTimeChange onClose={() => setShowVLSNewsTimeChange(false)} />
                </Suspense>
            )}
            
            {showVLSNewsIan && (
                <VLSNewsIan onClose={() => setShowVLSNewsIan(false)} />
            )}
            
            {showVialNews && (
                <VLSNewsVial onClose={() => setShowVialNews(false)} />
            )}
            
            {showSeguridadVecinal && (
                <SeguridadVecinal onClose={() => setShowSeguridadVecinal(false)} />
            )}
            
            {showBackofficeMovil && (
                <BackofficeMovilVLS onClose={() => setShowBackofficeMovil(false)} />
            )}
            
            <AnimatePresence>
                {showDirectory && (
                    <VLSCommunityDirectory onClose={() => setShowDirectory(false)} />
                )}
            </AnimatePresence>
            {showTuerca && (
                <TuercaVecinos onClose={() => setShowTuerca(false)} />
            )}

            {showFloatingTV && (
              <SmartFloatingTV 
                title={floatingTVItem.title || "VLS LIVE"}
                item={floatingTVItem}
                isVertical={false}
                widthDesktop="320px"
                heightDesktop="180px"
                widthMobile="160px"
                heightMobile="90px"
                onEnded={() => {
                  const idx = PLAYLIST_INSTITUTIONAL.findIndex(v => v.url === floatingTVItem.url);
                  setFloatingTVItem(PLAYLIST_INSTITUTIONAL[(idx + 1) % PLAYLIST_INSTITUTIONAL.length]);
                }}
              />
            )}
            {/* FOOTER SOBERANO */}
            <HechoEnChile dark={true} />
        </div>
        </React.Fragment>
    );
}
