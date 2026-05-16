import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { useOutletContext, useNavigate, Navigate } from 'react-router-dom';

// Listas de reproducciAÂ³n diferenciadas por pilares
const PLAYLIST_INSTITUTIONAL = [
    { url: 'https://cdn.jsdelivr.net/gh/vecinoslaserenachile-cloud/juego-serenito@main/Serenito_kiosco_suplementero.mp4', title: 'Serenito Kiosco Suplementero' },
    { url: 'https://cdn.jsdelivr.net/gh/vecinoslaserenachile-cloud/juego-serenito@main/Serenito_playa_con_gato_Juanin.mp4', title: 'Serenito en la Playa con JuanÃ­n' },
    { url: 'https://cdn.jsdelivr.net/gh/vecinoslaserenachile-cloud/juego-serenito@main/Serenito_paseo_nocturno_Avenida_Francisco_de_Aguirre.mp4', title: 'Noche en La Serena' },
    { url: 'https://cdn.jsdelivr.net/gh/vecinoslaserenachile-cloud/juego-serenito@main/Serenito_paseo_Museo_Gabriel_Gonzalez_Videla.mp4', title: 'Museo Gabriel GonzÃ¡lez Videla' },
    { url: 'https://cdn.jsdelivr.net/gh/vecinoslaserenachile-cloud/juego-serenito@main/Serenito_paseo_Avenida_Francisco_de_Aguirre.mp4', title: 'Avenida Francisco de Aguirre' },
    { url: 'https://cdn.jsdelivr.net/gh/vecinoslaserenachile-cloud/juego-serenito@main/Serenito_Polideportivo_Las_CompaÃ±Ã­as.mp4', title: 'Polideportivo Las CompaÃ±Ã­as' },
    { url: 'https://cdn.jsdelivr.net/gh/vecinoslaserenachile-cloud/juego-serenito@main/Serenito_paseo_Avenida_del_Mar_La_Serena.mp4', title: 'Avenida del Mar' },
    { id: 'b9LTH4muxR8', title: 'FARO LA SERENA LIVE' }
];

const PLAYLIST_LUDIC = [
    { url: '/alcaldesa_corrida/Foto corrida avenida del mar la serena 110425.jpeg', title: 'Marea Humana: 4.000 Personas en la Av. del Mar', isPoster: true },
    { url: '/serenito_security_guard_close_up_1773392164475.png', title: 'PROMO: Seguridad Ciudadana VLS', isPoster: true },
    { url: '/portada_vls_trivia.jpg', title: 'PROMO: VLSabes - Â¡Juega & Gana!', isPoster: true },
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
const VLSNewsSemanaSanta = lazy(() => import('../components/VLSNewsSemanaSanta'));
const VLSNewsBencinazo = lazy(() => import('../components/VLSNewsBencinazo'));
const VLSNewsAguasValle = lazy(() => import('../components/VLSNewsAguasValle'));
const VLSNewsArtemis = lazy(() => import('../components/VLSNewsArtemis'));
const VLSNewsChequia = lazy(() => import('../components/VLSNewsChequia'));
const VLSNewsIglesiasPiedra = lazy(() => import('../components/VLSNewsIglesiasPiedra'));
const VLSNewsAvalancha = lazy(() => import('../components/VLSNewsAvalancha'));
const VLSNotesGallery = lazy(() => import('../components/VLSNotesGallery'));
const SerenitoVLS = lazy(() => import('../components/SerenitoVLS'));
const FaroCentinel = lazy(() => import('../components/FaroCentinel'));
import VLSRoadmap from '../components/VLSRoadmap';
import VLSManifesto from '../components/VLSManifesto';
import VLSTriviaMain from '../components/vls_trivia/VLSTriviaMain';
import SmartFloatingTV from '../components/SmartFloatingTV';
import ParliamentaryObservatory from '../components/ParliamentaryObservatory';
import SeoHead from '../components/SeoHead';
import FeaturedBook from '../components/FeaturedBook';
import LoadingScreen from '../components/LoadingScreen';
const MemorialHijosRegion = lazy(() => import('../components/MemorialHijosRegion'));
const DistancesMap = lazy(() => import('../components/DistancesMap'));
import QuickEmergencyBar from '../components/QuickEmergencyBar';
import VLSCommunityDirectory from '../components/EmergencyDirectory';
import NewsDataStrip from '../components/NewsDataStrip';
import { useMasterEditor, MasterEditorToggle, MasterEditorBanner, EditorWrapper } from '../components/MasterEditorOverlay';
import WorldNewsTablets from '../components/WorldNewsTablets';
import LocalNewsGrid from '../components/LocalNewsGrid';
import VlsTvIp from '../components/VlsTvIp';



export default function HubDashboard() {
    // 1. Context & Routing
    const navigate = useNavigate();
    const { weather, isAuthorized, isGuest, isRegistered, currentUser, handleLogin, handleLogout } = useOutletContext();

    // Ã¢â€â‚¬Ã¢â€â‚¬ MASTER EDITOR MODE (solo vecinoslaserenachile@gmail.com) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
    const { isMaster, editorActive, toggleEditor, hiddenModules, hideModule, restoreAll, isHidden } = useMasterEditor(currentUser);
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
    const [officialNews, setOfficialNews] = useState([]);
    
    // Ã¢â€â‚¬Ã¢â€â‚¬ GESTION DE HANDLERS GLOBALES (Component Scope) Ã¢â€â‚¬Ã¢â€â‚¬
    const closeAllPopups = () => {
        setShowPoll(false); setShowGalaxia(false); setShowRoadmap(false); setShowManifesto(false);
        setShowPrecolombino(false); setShowAmbientMode(false); setShowCentralDifusion(false);
        setShowVirtualAssistant(false); setShowVLSMotors(false); setShowOrientacionLegal(false);
        setShowSerenaMetAdmin(false); setShowVLSpeak(false); setShowSafeRoute(false);
        setShowSocialVision(false); setShowAnalyticsApp(false); setShowSmartAdminPortal(false);
        setShowSemanaSanta(false); setShowBencinazo(false);
        setShowAirportMonitor(false); setShowPortMonitor(false);
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
    const handleSemanaSanta = () => { closeAllPopups(); setShowSemanaSanta(true); };
    const handleBencinazo = () => { closeAllPopups(); setShowBencinazo(true); };
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
    const handleTvIp = () => { closeAllPopups(); setShowTvIp(true); };
    const handleDomeyko = (tab) => { 
        closeAllPopups(); 
        navigate('/domeyko' + (tab ? `?tab=${tab}` : '')); 
    };

    const handleInvestigacion = () => { closeAllPopups(); setShowVLSNewsIan(true); };
    const handleSentinelNote = () => { closeAllPopups(); setShowFaroCentinel(true); };
    const handleAcciona = () => { closeAllPopups(); window.dispatchEvent(new CustomEvent('open-vls-acciona')); };
    const handleDistances = () => { closeAllPopups(); setShowDistancias(true); window.scrollTo({ top: 0, behavior: 'smooth' }); };
    const handleAguasValle = () => { closeAllPopups(); setShowAguasValle(true); };

    
    const onDomeykoEvent = (e) => handleDomeyko(e.detail?.tab);
    const onArtemisEvent = (e) => { if (!e.detail?.routed) handleArtemis(); };
    const onUcenEvent = (e) => { if (!e.detail?.routed) handleUcen(); };

    
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
            alert('Ã‚Â¡Enlace de noticia copiado al portapapeles!');
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
    const [showSemanaSanta, setShowSemanaSanta] = useState(false);
    const [showBencinazo, setShowBencinazo] = useState(false);
    const [showVLSNewsIan, setShowVLSNewsIan] = useState(false);
    const [showVialNews, setShowVialNews] = useState(false);
    const [showVLSNewsTimeChange, setShowVLSNewsTimeChange] = useState(false);
    const [showFaroCentinel, setShowFaroCentinel] = useState(false);
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
    const [showTvIp, setShowTvIp] = useState(false);
    const [showFloatingTV, setShowFloatingTV] = useState(true);
    const [floatingTVItem, setFloatingTVItem] = useState(PLAYLIST_INSTITUTIONAL[0]);
    const [isVideoPlaying, setIsVideoPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [videoSelected, setVideoSelected] = useState(false);
    const [currentPlaylist, setCurrentPlaylist] = useState('institutional');
    const [previewIndex, setPreviewIndex] = useState(0);
    const dict = {
        es: {
            title: isRDMLS ? "Hub de GestiÃ³n Institucional - Portal RDMLS.cl" : "Hub de Comunicaciones y CiudadanÃ­a Smart - Portal Unificado VLS",
            citizensTitle: "Vecino Smart", 
            citizensSub: isRDMLS ? "AtenciÃ³n Ciudadana y Monitoreo Urbano" : "AtenciÃ³n Ciudadana y Radio Digital",
            adminTitle: isRDMLS ? "AdministraciÃ³n Smart" : "Vecino Aprende (Escuelas y Oficios)", 
            adminSub: isRDMLS ? "GestiÃ³n Interna, RRHH y Portal de InducciÃ³n E-learning" : "FormaciÃ³n Ciudadana, E-learning e Iniciativas de Empleo",
            newsAlert: isRDMLS 
                ? "INFORMATIVO VLS: La Red Digital La Serena informa despliegue de equipos en terreno para mantenciÃ³n urbana. Siga la seÃ±al de RDMLS para mÃ¡s detalles."
                : "VECINOS LA SERENA Informa: Se detecta patrullaje preventivo en cuadrantes urbanos y turÃ­sticos. Seguridad comunitaria activa para vecinos, visitantes y comerciantes.",
            eventsTitle: "Eventos Vecinales", 
            eventsSub: isRDMLS ? "GestiÃ³n Automatizada y Monitor de Precedencias" : "Monitor de Precedencia y Protocolo",
            listeningTitle: "Escucha Vecinal", 
            listeningSub: isRDMLS ? "Inteligencia Artificial y Social Listening" : "Centinel Faro y Red de Escucha Social",
            paseo3dTitle: isRDMLS ? "Paseo Patrimonial 3D" : "Paseo HistÃ³rico 3D", 
            paseo3dSub: "Arquitectura Tradicional y Museos",
            busdeltiempoTitle: "El Bus del Tiempo", busdeltiempoSub: "Viajes de 1948 a la Smart City",
            gameTitle: "Play Center VLS", gameSub: "Explora y Juega con Serenito",
            qrText: "Acceso MÃ³vil",
            distancesTitle: "Cuadro de Distancias VLS", distancesSub: "Trayectos sobre Mapa RegiÃ³n de Coquimbo",
            projectTitle: "GestiÃ³n de Proyectos", projectSub: "Avance Obra y PlanificaciÃ³n Territorio",
            councilTitle: isRDMLS ? "Consejo Ciudadano" : "Transparencia Comunal", councilSub: "Actas, Acuerdos y Transmisiones en Vivo",
            cdlsTitle: "Club Deportes La Serena", cdlsSub: "Socio VLS - Seguimiento e Historia Granate",
            musicTitle: "Tornamesa Digital", musicSub: "SelecciÃ³n de MÃºsica Tradicional y Regional",
            retroTitle: "Retro TV Master", retroSub: "Canales ClÃ¡sicos y Archivo HistÃ³rico",
            vhsTitle: "Cineteca VHS", vhsSub: "Videos de la RegiÃ³n y Documentales",
            memoryTitle: "Portal de la Memoria", memorySub: "Sube Recuerdos y Fotos del Pasado",
            sentinelTitle: isRDMLS ? "Centinel Faro (IA)" : "Centinel Faro IA",
            sentinelSub: isRDMLS ? "Monitoreo Avanzado y AnÃ¡lisis de Datos" : "Monitoreo Avanzado de Redes y Seguridad",
            welcomePortales: isRDMLS 
                ? "Bienvenido al Portal Institucional RDMLS de La Serena."
                : "Bienvenido al portal unificado de Vecinos La Serena para vecinos, visitantes, turistas, anunciantes y compraventas.",
            heroDescription: isRDMLS
                ? 'Plataforma oficial de inducciÃ³n, gestiÃ³n y capacitaciÃ³n continua para colaboradores de La Serena en diversas modalidades.'
                : 'La red inteligente para vecinos, visitantes, turistas, anunciantes y compraventas. Conecta, aporta, monitorea y mantente seguro junto al resto de tu comunidad en La Serena.',
            saludTitle: "Smart Salud",
            memorialTitle: "Altares de la RegiÃ³n"
        },
        en: {
            title: "Smart Communications & Citizenship Hub - VLS Unified Portal",
            heroDescription: isRDMLS
                ? 'Official induction and management platform for collaborators of La Serena.'
                : 'The smart network for neighbors, visitors, tourists, advertisers and trade. Connect, contribute, monitor and stay safe with the rest of your community in La Serena.',
            welcomePortales: isRDMLS 
                ? "Welcome to the RDMLS Institutional Portal of La Serena."
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
            title: "æ™ºæ…§é€šè®¯ä¸Žå…¬æ°‘ä¸­å¿ƒ - VLS ç»Ÿä¸€é—¨æˆ·",
            citizensTitle: "æ™ºæ…§å…¬æ°‘ (Smart Citizens)", citizensSub: "æŠ¥å‘Šã€åœ°å›¾å’Œæ•°å­—å¹¿æ’­",
            adminTitle: "æ™ºæ…§è¡Œæ”¿ (Smart Administration)", adminSub: "å†…éƒ¨ç®¡ç†ã€ç”µå­å­¦ä¹ å’ŒæŠ¥å‘Š",
            eventsTitle: "æ™ºæ…§æ´»åŠ¨ (Smart Events)", eventsSub: "ä¼˜å…ˆé¡ºåºç›‘æŽ§å’Œåè®®",
            listeningTitle: "æ™ºæ…§è§‚ä¼— (Smart Listening)", listeningSub: "å“¨å…µç¯å¡”å’Œç¤¾äº¤ç›‘å¬ç½‘ç»œ (Centinel Faro)",
            paseo3dTitle: "3D åŽ†å²èµ°å»Š", paseo3dSub: "ä¼ ç»Ÿå»ºç­‘å’Œåšç‰©é¦†",
            busdeltiempoTitle: "æ—¶å…‰å¤§å·´", busdeltiempoSub: "ä»Ž 1948 å¹´åˆ°æ™ºæ…§åŸŽå¸‚çš„æ—…è¡Œ",
            gameTitle: "3D æ¸¸æˆé—¨æˆ·", gameSub: "åˆ›å»ºæ‚¨çš„å°è°¢å°” (Serenito) å¹¶æŽ¢ç´¢",
            qrText: "ç§»åŠ¨ç«¯è®¿é—®",
            distancesTitle: "VLS è·ç¦»è¡¨", distancesSub: "ç§‘é‡‘åšå¤§åŒºåœ°å›¾ä¸Šçš„è·¯çº¿",
            projectTitle: "é¡¹ç›®ç®¡ç†", projectSub: "å·¥ä½œè¿›åº¦å’Œé¢†åœŸè§„åˆ’",
            councilTitle: "å¸‚è®®ä¼š", councilSub: "ä¼šè®®çºªè¦ã€åè®®å’Œç›´æ’­",
            cdlsTitle: "å¡žé›·çº³ä½“è‚²ä¿±ä¹éƒ¨", cdlsSub: "VLS ä¼šå‘˜ - è¿½è¸ªå’Œä¿±ä¹éƒ¨åŽ†å²",
            musicTitle: "æ•°å­—å”±æœº", musicSub: "ä¼ ç»Ÿå’Œåœ°æ–¹éŸ³ä¹é€‰æ‹©",
            retroTitle: "å¤å¤ç”µè§†å¤§å¸ˆ", retroSub: "ç»å…¸é¢‘é“å’ŒåŽ†å²æ¡£æ¡ˆ",
            vhsTitle: "VHS ç”µå½±åº“", vhsSub: "åœ°åŒºè§†é¢‘å’Œçºªå½•ç‰‡",
            memoryTitle: "è®°å¿†é—¨æˆ·", memorySub: "ä¸Šä¼ è¿‡åŽ»çš„ä¼šè®®å’Œç…§ç‰‡",
            sentinelTitle: "å“¨å…µç¯å¡” AI", sentinelSub: "å…ˆè¿›çš„ç¤¾äº¤åª’ä½“ç›‘æŽ§",
            saludTitle: "æ™ºæ…§å¥åº· (Smart Health)",
            memorialTitle: "åœ°åŒºçºªå¿µé¦† (Regional Memorials)",
            welcomePortales: "æ¬¢è¿Žæ¥åˆ° La Serena é‚»å±…ç»Ÿä¸€é—¨æˆ·ã€‚æŽ¢ç´¢ä»¥ä¸‹æ‰€æœ‰å…¬æ°‘å·¥å…·ã€‚"
        },
        arn: {
            title: "Hub de Comunicaciones y CiudadanÃ­a Smart - Portal Unificado VLS",
            saludTitle: "Smart Salud", memorialTitle: "Altares de la RegiÃ³n",
            welcomePortales: "KÃºme akun portal unificado Vecinos La Serena mu. Inatunge kom pu kÃºzaw ciudadanas fan."
        },
        ht: {
            title: "Hub de Comunicaciones y CiudadanÃ­a Smart - Portal Unificado VLS",
            saludTitle: "Smart Salud", memorialTitle: "Altares de la RegiÃ³n",
            welcomePortales: "Byenveni nan pÃ²tal inifye Vwazen La Serena. Eksplore tout zouti sitwayen yo anba a."
        },
        it: {
            title: "Hub di Comunicazione e Cittadinanza Smart - Portale Unificado VLS",
            saludTitle: "Salute Smart", memorialTitle: "Memoriali Regionali",
            welcomePortales: "Benvenuti nel portale unificato di Vecinos La Serena. Esplora tutti gli strumenti cittadini qui sotto."
        },
        fr: {
            title: "Smart Communications & Citizenship Hub - Portail UnifiÃ© VLS",
            saludTitle: "SantÃ© Smart", memorialTitle: "MÃ©moriaux RÃ©gionaux",
            welcomePortales: "Bienvenue sur le portail unifiÃ© de Vecinos La Serena. Explorez tous les outils citoyens ci-dessous."
        },
        pt: {
            title: "Hub de ComunicaÃ§Ãµes e Cidadania Smart - Portal Unificado VLS",
            saludTitle: "SaÃºde Smart", memorialTitle: "Memoriais Regionais",
            welcomePortales: "Bem-vindo ao portal unificado de Vecinos La Serena. Explore todas as herramientas cidadÃ£s abaixo."
        }
    };

    const greetingsVLS = [
        { text: "Â¡HOLA, VECINO!", sub: "SOY SERENITO, TU GUÃA SMART CITY", color: "#ef4444", bg: "linear-gradient(135deg, #ef4444 0%, #1e3a8a 100%)", flag: "ðŸ‡¨ðŸ‡±" },
        { text: "HELLO, NEIGHBOR!", sub: "I'M SERENITO, YOUR SMART CITY GUIDE", color: "#3b82f6", bg: "linear-gradient(135deg, #00247d 0%, #cf142b 100%)", flag: "ðŸ‡¬ðŸ‡§ðŸ‡ºðŸ‡¸" },
        { text: "OLÃ, VIZINHO!", sub: "SOU SERENITO, SEU GUIA SMART CITY", color: "#22c55e", bg: "linear-gradient(135deg, #009c3b 0%, #ffdf00 100%)", flag: "ðŸ‡§ðŸ‡·" },
        { text: "SALUT, VOISIN!", sub: "JE SUIS SERENITO, VOTRE GUIDE SMART CITY", color: "#ffffff", bg: "linear-gradient(135deg, #002395 0%, #ed2939 100%)", flag: "ðŸ‡«ðŸ‡·" },
        { text: "CIAO, VICINO!", sub: "SONO SERENITO, LA TUA GUIDA SMART CITY", color: "#10b981", bg: "linear-gradient(135deg, #009246 0%, #ce2b37 100%)", flag: "ðŸ‡®ðŸ‡¹" },
        { text: "ä½ å¥½, é‚»å±…!", sub: "æˆ‘æ˜¯å°è°¢å°”, æ‚¨çš„æ™ºæ…§åŸŽå¸‚æŒ‡å— (SERENITO)", color: "#FFDE00", bg: "linear-gradient(135deg, #DE2910 0%, #FFDE00 100%)", flag: "ðŸ‡¨ðŸ‡³" }
    ];

    const greetingsRDMLS = [
        { text: "PORTAL RDMLS.cl", sub: "RDMLS SOBERANÍA DIGITAL", color: "#f59e0b", bg: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)", flag: "ðŸ›ï¸" },
        { text: "SERVICIOS SMART", sub: "GESTIÃ“N PÃšBLICA MODERNA", color: "#38bdf8", bg: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)", flag: "âš™ï¸" },
        { text: "IDENTIDAD LOCAL", sub: "LA SERENA SIEMPRE LÃDER", color: "#ef4444", bg: "linear-gradient(135deg, #7f1d1d 0%, #b91c1c 100%)", flag: "ðŸ‡¨ðŸ‡±" }
    ];

    const greetings = isRDMLS ? greetingsRDMLS : greetingsVLS;

    const newsFlashes = [
        {
            es: "Bienvenido al Portal Institucional Vecinos La Serena: Su conexiÃ³n directa con los servicios institucionales y la innovaciÃ³n ciudadana.",
            en: "Welcome to the Vecinos La Serena Institutional Portal: Your direct connection with institucional services and citizen innovation.",
            it: "Benvenuti nel Portale Istituzionale Vecinos La Serena: La vostra connessione diretta con i servicios institucionali e l'innovazione cittadina.",
            fr: "Bienvenue sur le Portail Institutionnel Vecinos La Serena : Votre connexion directe avec les services municipaux et l'innovation citoyenne.",
            zh: "æ¬¢è¿Žæ¥åˆ°æ‹‰å¡žé›·çº³æœºæž„é—¨æˆ·ç½‘ç«™ï¼šæ‚¨ä¸Žå¸‚æ”¿æœåŠ¡å’Œå…¬æ°‘åˆ›æ–°çš„ç›´æŽ¥è”ç³»ã€‚",
            pt: "Bem-vindo ao Portal Institucional Vecinos La Serena: Sua conexÃ£o direta com os serviÃ§os municipais e a inovaciÃ³n cidadÃ£."
        },
        {
            es: "SMART CITIZENS: Acceda al reporte urbano georreferenciado para informar baches, luminarias y otras incidencias en tiempo real.",
            en: "SMART CITIZENS: Access the georeferenced urban report to report potholes, streetlights, and other incidents in real time.",
        },
        {
            es: "SMART ADMINISTRATION: Portal E-Learning operativo para la capacitaciÃ³n continua y digitalizaciÃ³n de informes de gestiÃ³n interna.",
            en: "SMART ADMINISTRATION: E-Learning Portal operational for continuous training and digitalization of internal management reports.",
            it: "SMART ADMINISTRATION: Portale E-Learning operativo per la formazione continua e la digitalizzazione dei rapporti di gestione interna.",
            fr: "SMART ADMINISTRATION : Portail E-Learning opÃ©rationnel pour la formation continue et la numÃ©risation des rapports de gestiÃ³n interne.",
            zh: "æ™ºæ…§ç®¡ç†ï¼šç”µå­å­¦ä¹ é—¨æˆ·ç½‘ç«™è¿è¡Œï¼Œç”¨äºŽæŒç»­åŸ¹è®­å’Œå†…éƒ¨ç®¡ç†æŠ¥å‘Šçš„æ•°å­—åŒ–ã€‚",
            pt: "SMART ADMINISTRATION: Portal de E-Learning operacional para treinamento contÃ­nuo e digitalizaÃ§Ã£o de relatÃ³rios de gestÃ£o interna."
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
        window.addEventListener('open-vls-artemis', onArtemisEvent);
        window.addEventListener('open-vls-ucen', onUcenEvent);
        window.addEventListener('open-vls-juansoldado', handleJuanSoldado);
        window.addEventListener('open-vls-andacollo', handleAndacollo);
        window.addEventListener('open-vls-vallenar', handleVallenar);
        window.addEventListener('open-vls-domeyko', onDomeykoEvent);
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
        window.addEventListener('open-vls-acciona', handleAcciona);
        window.addEventListener('open-distances', handleDistances);
        window.addEventListener('open-vls-semanasanta', handleSemanaSanta);
        window.addEventListener('open-vls-bencinazo', handleBencinazo);
        window.addEventListener('open-vls-aguasvalle', handleAguasValle);
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

        window.addEventListener('open-arquiartista', handleArquiartista);
        window.addEventListener('open-vls-tv-ip', handleTvIp);
        window.addEventListener('open-vls-investigacion', handleInvestigacion);
        window.addEventListener('open-vls-sentinel', handleSentinelNote);



        const urlParams = new URLSearchParams(window.location.search);
        const newsParam = urlParams.get('news');

        if (newsParam) {
            switch(newsParam) {
                case 'semanasanta': handleSemanaSanta(); break;
                case 'bencinazo': handleBencinazo(); break;
                case 'aguasvalle': setShowAguasValle(true); break;
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
            window.removeEventListener('open-akichip', handleAkichip);
            window.removeEventListener('open-decision-vecinal', handleDecision);
            window.removeEventListener('open-galaxia-disco', handleGalaxia);
            window.removeEventListener('open-vls-roadmap', handleRoadmap);
            window.removeEventListener('open-vls-manifesto', handleManifesto);
            window.removeEventListener('open-precolombino', handlePrecolombino);
            window.removeEventListener('open-ambient-mode', handleAmbient);
            window.removeEventListener('open-central-difusion', handleDifusion);
            window.removeEventListener('open-faro-ia', handleFaroIA);
            window.removeEventListener('open-hub-directory', handleHubDirectory);
            window.removeEventListener('open-vls-artemis', onArtemisEvent);
            window.removeEventListener('open-vls-ucen', onUcenEvent);
            window.removeEventListener('open-vls-juansoldado', handleJuanSoldado);
            window.removeEventListener('open-vls-andacollo', handleAndacollo);
            window.removeEventListener('open-vls-vallenar', handleVallenar);
            window.removeEventListener('open-vls-domeyko', onDomeykoEvent);
            window.removeEventListener('open-vls-chequia', handleChequia);
            window.removeEventListener('open-vls-avalancha', handleAvalancha);
            window.removeEventListener('open-vls-motors', handleMotors);
            window.removeEventListener('open-orientacion-legal', handleLegal);
            window.removeEventListener('open-serenamet-admin', handleMetAdmin);
            window.removeEventListener('open-vlspeak', handleVLSpeak);
            window.removeEventListener('open-safe-route', handleSafeRoute);
            window.removeEventListener('open-social-vision', handleSocialVision);
            window.removeEventListener('open-analytics', handleAnalytics);
            window.removeEventListener('open-plaza-vecinal', handleAnalytics);
            window.removeEventListener('open-smart-admin', handleSmartAdmin);
            window.removeEventListener('open-vls-acciona', handleAcciona);
            window.removeEventListener('open-distances', handleDistances);
            window.removeEventListener('open-vls-semanasanta', handleSemanaSanta);
            window.removeEventListener('open-vls-bencinazo', handleBencinazo);
            window.removeEventListener('open-vls-aguasvalle', handleAguasValle);
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
            window.removeEventListener('open-vls-iglesias', handleIglesias);
            window.removeEventListener('open-vls-horario', handleHorario);

            window.removeEventListener('open-arquiartista', handleArquiartista);
            window.removeEventListener('open-vls-tv-ip', handleTvIp);
            window.removeEventListener('open-vls-investigacion', handleInvestigacion);
            window.removeEventListener('open-vls-sentinel', handleSentinelNote);
        };
    }, []);

    useEffect(() => {
        const handleNews = () => {
            const stored = localStorage.getItem('laserena_official_news');
            let newsList = [];
            const defaultNews = [
                { title: "SMART CITIZENS: Reporte Urbano Georreferenciado", date: "Hoy", category: "CIUDADANÃA", desc: "Monitoreo en tiempo real de baches y luminarias mediante IA para una respuesta institucional inmediata.", iconStr: "Search", color: "#10b981", eventId: "open-vls-reporte", image: "/vls_seguridad_central.png" },
                { title: "SMART ADMINISTRATION: Portal E-Learning Institucional", date: "Hoy", category: "GESTIÃ“N", desc: "Nueva plataforma de inducciÃ³n con firma digital y entrega de certificados para funcionarios.", iconStr: "GraduationCap", color: "#3b82f6", eventId: "open-vls-academia", image: "/serenito_3d_avatar_premium_1774312066289.png" },
                { title: "SMART EVENTS: Monitor de Precedencias 2025", date: "Hoy", category: "PROTOCOLO", desc: "GestiÃ³n automatizada de eventos y seguimiento de autoridades regionales en tiempo real.", iconStr: "Users", color: "#8b5cf6", eventId: "open-vls-protocolo", image: "/serenito_security_guard_close_up_1773392164475.png" },
                { title: "SMART LISTENING: Inteligencia Centinel Faro", date: "Hoy", category: "SEGURIDAD", desc: "Escucha activa y anÃ¡lisis de video mediante IA para la prevenciÃ³n de incidentes crÃ­ticos.", iconStr: "Eye", color: "#f59e0b", eventId: "open-faro-ia", image: "/faro_monumental_premium_png_1774894700995.png" },
                { title: "RADIO VLS: SintonÃ­a Digital 24/7", date: "Hoy", category: "RADIO", desc: "La voz de los barrios y la cultura serenense en alta fidelidad por RDMLS.cl.", iconStr: "Mic", color: "#ef4444", eventId: "open-radio-vls", image: "/rdmls_pwa_icon.png" },
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
            
            setOfficialNews(newsList.slice(0, 5));
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
                setDeviceType('MÃ³vil');
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
        'memorias-unicornio', 'vls-juansoldado', 'vls-andacollo', 'vls-vallenar', 'vls-domeyko'
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
            id: 'vls-1demayo', title: '1 DE MAYO: DÃA DEL TRABAJADOR', subtitle: 'Portal HistÃ³rico Â· Hitos, PoesÃ­a y Memoria Obrera',
            icon: Calendar, color: '#d97706', path: '/1demayo', active: true, badge: 'MAY-2025', category: 'citizens'
        },
        {
            id: 'vls-acciona', title: 'ACCIONA: CAPACITACIÃ“N MUJERES', subtitle: 'Curso Terminaciones Â· Nuevo Hospital La Serena Â· InscripciÃ³n Online',
            icon: HardHat, color: '#ff0000', isEvent: 'open-vls-acciona', active: true, badge: 'EMPLEO', category: 'citizens'
        },
        {
            id: 'vls-domeyko', title: 'IGNACIO DOMEYKO: SABIO DE CHILE', subtitle: 'Portal 3D Â· MineralogÃ­a Â· CronologÃ­a Â· Juego ExpediciÃ³n',
            icon: Gem, color: '#a78bfa', isEvent: 'open-domeyko-portal', active: true, badge: 'PATRIMONIO', category: 'citizens'
        },
        {
            id: 'failover-lite-access', title: 'CLON DE RESPALDO (Lite Portal)', subtitle: 'SoberanÃ­a de Acceso: VersiÃ³n liviana para datos bajos',
            icon: ShieldCheck, color: '#10b981', isEvent: 'open-lite-portal', active: true, badge: 'FAILOVER', category: 'citizens'
        },
        {
            id: 'vls-migra', title: 'MIGRA: SEGUNDA FUNDACIÃ“N', subtitle: 'InvestigaciÃ³n: El futuro de la gestiÃ³n y la migraciÃ³n',
            icon: MapPin, color: '#ef4444', isEvent: 'open-vls-migra', active: isRDMLS, badge: 'VLS INVESTIGA', category: 'citizens'
        },
        {
            id: 'vls-juansoldado', title: 'JUAN SOLDADO: LA MEMORIA', subtitle: 'InvestigaciÃ³n: OrÃ­genes, bruma y justicia popular',
            icon: Newspaper, color: '#f59e0b', isEvent: 'open-vls-juansoldado', active: true, badge: 'VLS INVESTIGA', category: 'citizens'
        },
        {
            id: 'vls-andacollo', title: 'ANDACOLLO: CIUDAD MONTAÃ‘A', subtitle: 'InvestigaciÃ³n: Oro, Fe y TradiciÃ³n Minera',
            icon: Church, color: '#10b981', isEvent: 'open-vls-andacollo', active: true, badge: 'VLS INVESTIGA', category: 'citizens'
        },
        {
            id: 'vls-vallenar', title: 'VALLENAR: EL DESIERTO FLORIDO', subtitle: 'InvestigaciÃ³n: Embalse Santa Juana y El Valle del Huasco',
            icon: Waves, color: '#a78bfa', isEvent: 'open-vls-vallenar', active: true, badge: 'VLS INVESTIGA', category: 'citizens'
        },
        {
            id: 'vls-ian', title: 'EL PUNTO CIEGO: Caso Ian', subtitle: 'Reportaje: La trampa de los 100 y el abismo del retail',
            icon: ShieldAlert, color: '#ef4444', isEvent: 'open-vls-ian', active: true, badge: 'VLS INVESTIGA'
        },
        {
            id: 'vls-artemis', title: 'MisiÃ³n Artemis II', subtitle: 'Simulador 3D Orion Spacecraft (NASA High-Fidelity)',
            icon: Zap, color: '#312e81', isEvent: 'open-vls-artemis', active: true, badge: 'SPACE TECH'
        },
        {
            id: 'vls-chequia', title: 'Chequia: El CorazÃ³n de Europa', subtitle: 'CooperaciÃ³n Internacional y TecnologÃ­a de Agua',
            icon: Globe, color: '#3b82f6', isEvent: 'open-vls-chequia', active: true, badge: 'INTELIGENCIA'
        },
        {
            id: 'vls-ucen', title: 'UCEN: Congreso ASFAE 42', subtitle: 'InvestigaciÃ³n: IA, Negocios y DescentralizaciÃ³n 2025',
            icon: GraduationCap, color: '#00F0FF', isEvent: 'open-vls-ucen', active: true, badge: 'ACADEMIA'
        },
        {
            id: 'vls-seguridad', title: 'PORTAL SEGURIDAD VECINAL', subtitle: 'Consejos, Contactos de Emergencia y Red de ProtecciÃ³n',
            icon: ShieldCheck, color: '#10b981', isEvent: 'open-vls-seguridad', active: true, badge: 'PRO VLS'
        },
        {
            id: 'sticky-note', title: 'Papelito Amarillo', subtitle: 'Recordatorios, Dibujos y Notas RÃ¡pidas (Post-it)',
            icon: PenTool, color: '#fbbf24', isEvent: 'open-sticky-note', active: true, badge: 'FAVORITO'
        },
        {
            id: 'vecinity-pay', title: 'Recargar Fichas VLS', subtitle: 'Billetera Digital y Canje de Recompensas',
            icon: Award, color: '#FFD700', isEvent: 'open-vecinity-pay', active: true, badge: 'SISTEMA'
        },
        {
            id: 'vecicat', title: 'VeciCat: AdopciÃ³n', subtitle: 'Red de Rescate y AdopciÃ³n Felina',
            icon: Heart, color: '#ec4899', isEvent: 'open-vecicat', active: true, badge: 'NUEVO'
        },
        {
            id: 'plaza-vecinal-ai', title: 'Plaza Vecinal AI', subtitle: 'Espacio de encuentro ciudadano moderado por IA.', icon: Users, color: '#ec4899', path: 'https://ais-dev-m2dndpdv73k2izyiea7mef-41245370989.us-east5.run.app', isExternal: true, active: true },
        {
            id: 'ajedrez-patrimonial', title: 'Ajedrez Patrimonial 3D', subtitle: 'DesafÃ­a tu mente en el casco histÃ³rico',
            icon: Joystick, color: '#fcd34d', isEvent: 'open-ajedrez-patrimonial', active: true, badge: 'SABERES'
        },
        {
            id: 'vls-trivia', title: isRDMLS ? 'Saberes: GestiÃ³n del Conocimiento' : 'VLSabes: Juegaprende', subtitle: isRDMLS ? 'Pilar #2: Saberes, Historia y SoberanÃ­a' : 'Pilar #2: Trivia Educativa y SoberanÃ­a Comunicacional',
            icon: Joystick, color: '#FFD700', path: '/vlsabes', active: true, badge: isRDMLS ? 'SABERES' : 'TRIVIA'
        },
        {
            id: 'memorias-unicornio', title: 'Memorias de un Unicornio', subtitle: 'BitÃ¡cora TÃ©cnica & Legado de SoberanÃ­a Digital',
            icon: Book, color: '#fcd34d', isEvent: 'open-unicorn', active: true, badge: 'BIBLIOTECA'
        },
        {
            id: 'vls-pyme-builder', title: 'Comercio Local Smart (PYME)', subtitle: 'Sitio Web, Radio Local y Pasarela VLS para anunciantes y compraventas',
            icon: ShoppingBag, color: '#f59e0b', isEvent: 'open-smart-business', active: true, badge: 'ANUNCIANTES'
        },
        {
            id: 'vls-motors', title: 'VLS Motors', subtitle: 'Flota Smart ElÃ©ctrica y CatÃ¡logo Premium',
            icon: Zap, color: '#38bdf8', isEvent: 'open-vls-motors', active: false, badge: 'MOVILIDAD'
        },
        {
            id: 'legal', title: 'OrientaciÃ³n Legal BCN', subtitle: 'AsesorÃ­a certificada para vecinos y Portal Abogados',
            icon: Scale, color: '#d4af37', isEvent: 'open-orientacion-legal', active: true, badge: 'PRO VLS'
        },
        {
            id: 'serenito-admin', title: 'Serena Met (Admin)', subtitle: 'Inyectora de LocuciÃ³n y Reporte MÃ³vil Terreno',
            icon: ShieldCheck, color: '#38bdf8', isEvent: 'open-serenamet-admin', active: false, badge: 'STAFF SMART'
        },
        {
            id: 'vlspeak', title: 'VLSpeak', subtitle: 'Traductor SimultÃ¡neo Transversal (Creole/English)',
            icon: Languages, color: '#a78bfa', isEvent: 'open-vlspeak', active: true, badge: 'INCLUSION'
        },
        {
            id: 'safe-route', title: 'Safe Route AI', subtitle: 'Rutas seguras basadas en telemetrÃ­a real (Leds/GPS)',
            icon: ShieldAlert, color: '#10b981', isEvent: 'open-safe-route', active: false, badge: 'SEGURIDAD IA'
        },
        {
            id: 'distances', title: 'Cuadro de Distancias', subtitle: 'Tiempos de viaje y rutas interurbanas optimizadas',
            icon: MapPin, color: '#3b82f6', isEvent: 'open-distances', active: true, badge: 'RUTAS'
        },
        {
            id: 'servicios-publicos', title: 'Reporte Servicios PÃºblicos', subtitle: 'Agua, Alcantarillado, Baches y Aseo',
            icon: AlertTriangle, color: '#ef4444', path: '/citizens', active: true, badge: 'RED 24/7'
        },
        {
            id: 'vls-tv-ip', title: 'TV IP VLS', subtitle: 'SeÃ±ales Nacionales e Internacionales en Alta DefiniciÃ³n',
            icon: Tv, color: '#38bdf8', isEvent: 'open-vls-tv-ip', active: true, badge: 'EN VIVO'
        },
        {
            id: 'smart-salud', title: tHub.saludTitle || 'Smart Salud', subtitle: 'AtenciÃ³n MÃ©dica y Agendamiento Vecinal',
            icon: Stethoscope, color: '#10b981', path: '/smart-salud', active: true
        },
        {
            id: 'smart-real-estate', title: 'Corretaje Propiedades Smart', subtitle: 'Arriendos y Ventas para vecinos y visitantes con trazabilidad VLS',
            icon: HomeIcon, color: '#f59e0b', path: '/propiedades', active: true, badge: 'COMPRAVENTA'
        },

        {
            id: 'smart-architecture', title: 'Arquitectura & Obras', subtitle: 'DiseÃ±o, Ampliaciones y Permisos de EdificaciÃ³n',
            icon: Ruler, color: '#3b82f6', path: '/arquitectura', active: true, badge: 'DOM'
        },
        {
            id: 'smart-learning', title: isRDMLS ? 'InducciÃ³n La Serena' : 'Smart Academia VLS', subtitle: isRDMLS ? 'Pilar #2: CapacitaciÃ³n, Diplomas y SoberanÃ­a' : 'CapacitaciÃ³n, InglÃ©s, Diplomas y Saberes Locales',
            icon: GraduationCap, color: '#fbbf24', path: '/induccion', active: true, badge: isRDMLS ? 'VLS' : 'ESTUDIOS'
        },
        {
            id: 'tienda-poleras', title: 'Tienda Poleras 3D', subtitle: 'Espejo Virtual y CreaciÃ³n de Vestuario',
            icon: Sparkles, color: '#facc15', isEvent: 'open-tienda-poleras', active: true, badge: 'NUEVO'
        },
        {
            id: 'kiosko-diarios', title: 'Kiosko de Prensa VLS', subtitle: 'Noticias, Portadas y Revistas HistÃ³ricas',
            icon: Newspaper, color: '#065f46', isEvent: 'open-kiosko-diarios', active: true
        },
        {
            id: 'vecinojos', title: 'VisiÃ³n Vecinal (Reportes)', subtitle: 'GeorreferenciaciÃ³n de Casos en Comunidad',
            icon: Eye, color: '#38bdf8', isEvent: 'open-vecinojos', active: true, badge: 'EN DESARROLLO'
        },
        {
            id: 'camaras-faro', title: 'CÃ¡maras del Faro (C5)', subtitle: 'Monitoreo Urbano y Estado de las Playas',
            icon: Camera, color: '#38bdf8', isEvent: 'open-retro-tv', active: false, badge: 'EN VIVO'
        },
        {
            id: 'tornamesa-digital', title: 'MÃºsica: El Tornamesa', subtitle: 'SelecciÃ³n de Vinilos y Ã‰xitos Comunales',
            icon: Music, color: '#f59e0b', isEvent: 'open-personal-stereo', active: true, badge: 'RETRO'
        },
        {
            id: 'memorial-hijos', title: tHub.memorialTitle || 'Altares de la RegiÃ³n', subtitle: 'Homenaje PÃ³stumo Digital y Hologramas',
            icon: Heart, color: '#f472b6', isEvent: 'open-memorial-hijos', active: true
        },
        {
            id: 'memory-portal', title: 'Portal de la Memoria', subtitle: 'Sube fotos, videos y recuerdos histÃ³ricos',
            icon: Box, color: '#facc15', isEvent: 'open-memory-portal', active: true
        },
        {
            id: 'gym-3d', title: 'Gimnasio Virtual 3D', subtitle: 'Entrenamientos e Infraestructura Deportiva',
            icon: Dumbbell, color: '#ec4899', isEvent: 'open-gym-3d', active: true
        },
        {
            id: 'retro-gamer-room', title: 'Altar Gamer 1985', subtitle: 'Arcade Inmersivo y ClÃ¡sicos de los 80/90',
            icon: Joystick, color: '#f97316', isEvent: 'open-retro-room', active: true
        },
        {
            id: 'personal-stereo', title: 'Personal Stereo VLS', subtitle: 'Tu mÃºsica nostÃ¡lgica siempre contigo',
            icon: HistoryIcon, color: '#fcd34d', isEvent: 'open-personal-stereo', active: true
        },
        {
            id: 'faro-ia', title: 'Serenito GuÃ­a (IA)', subtitle: 'Asistente Virtual con Inteligencia Humana',
            icon: Sparkles, color: '#10b981', isEvent: 'open-faro-ia', active: true
        },
        {
            id: 'historic-3d', title: 'Paseo HistÃ³rico 3D', subtitle: 'Recorrido Interactivo por la Zona TÃ­pica',
            icon: Map, color: '#10b981', isEvent: 'open-3d-walk', active: true
        },
        {
            id: 'busdeltiempo', title: 'Bus del Tiempo 3D', subtitle: 'Viaje Interdimensional por La Serena',
            icon: Map, color: '#c084fc', isEvent: 'open-time-bus', active: true
        },
        {
            id: 'roadmap', title: 'Roadmap VLS', subtitle: 'Hitos proyectados 2025',
            icon: HistoryIcon, color: '#06b6d4', isEvent: 'open-vls-roadmap', active: true, badge: 'ESTRATÃ‰GICO'
        },
        {
            id: 'legacy-game', title: 'SalÃ³n Arcade Retro', subtitle: 'DesafÃ­a el Record y gana Papayas',
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
            id: 'vls-roadmap', title: 'Roadmap VLS 2025', subtitle: 'Inventario de Servicios y VisiÃ³n EstratÃ©gica',
            icon: ListChecks, color: '#3b82f6', isEvent: 'open-vls-roadmap', active: true, badge: 'ESTATUS'
        },
        {
            id: 'pitch-inversionistas', title: 'Pitch Inversionistas (B2G)', subtitle: 'Modelo SaaS La Serena y Nube Cero Costo (Cloudflare D1/R2)',
            icon: Rocket, color: '#c084fc', isEvent: 'open-project-info', active: true, badge: 'Dossier 2025'
        },
        {
            id: 'low-data-safe-access', title: 'SecciÃ³n Liviana (Low-Data)', subtitle: 'Portal de Ahorro para Celulares y 3G',
            icon: Zap, color: '#fbbf24', path: '/lite', active: true, badge: 'LITE'
        },
        {
            id: 'vls-precolombino', title: 'RaÃ­ces Precolombinas', subtitle: 'Santuario El Olivar, Diaguitas & Changos 3D',
            icon: Landmark, color: '#d4af37', isEvent: 'open-precolombino', active: true, badge: 'PATRIMONIO'
        },
        {
            id: 'muralismo', title: 'Muralismo Smart', subtitle: 'Arte Urbano y ProtecciÃ³n de Fachadas',
            icon: Palette, color: '#f43f5e', path: '/muralismo', active: true
        },
        {
            id: 'cdls-club', title: 'Club Deportes La Serena', subtitle: 'Beneficios Vecinales y PasiÃ³n Granate',
            icon: Award, color: '#dc2626', isEvent: 'open-cdls', active: true
        },
        {
            id: 'estudio-musical', title: 'Estudio Musical IA', subtitle: 'Crea Letras y Acordes con Inteligencia',
            icon: Music, color: '#a855f7', isEvent: 'open-music-studio', active: true
        },
        {
            id: 'vhs-tv', title: 'Videoclub TVLS 90s', subtitle: 'Cine NostÃ¡lgico en Formato ClÃ¡sico',
            icon: Tv, color: '#ef4444', isEvent: 'open-vhs-tv', active: true
        },
        {
            id: 'decision-vecinal', title: 'DecisiÃ³n Vecinal', subtitle: 'Consultas Ciudadanas con Voto Digital',
            icon: Vote, color: '#d4af37', isEvent: 'open-decision-vecinal', active: false
        },
        {
            id: 'difundir-app', title: 'Difundir App Vecinal', subtitle: 'Haz crecer nuestra red comunitaria',
            icon: Share2, color: '#ec4899', isEvent: 'open-smart-share', active: true
        },
        {
            id: 'operacion-ls', title: 'OperaciÃ³n La Serena', subtitle: 'Simulador 3D Knight Rider (KITT)',
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
            id: 'escuela-musica', title: 'Escuela de MÃºsica Vecinal', subtitle: 'Clases y ProducciÃ³n para Talentos Locales',
            icon: GraduationCap, color: '#a855f7', isEvent: 'open-escuela-musica', active: true, badge: 'ESTUDIOS'
        },
        {
            id: 'escuela-artes', title: 'Academia de Artes', subtitle: 'AlfabetizaciÃ³n, Idiomas, Oficios y Humanidades',
            icon: Palette, color: '#3b82f6', isEvent: 'open-escuela-artes', active: true, badge: 'ESTUDIOS'
        },
        {
            id: 'laboratorio-criticas', title: 'Laboratorio de Ideas', subtitle: 'Enfoque De Bono para Soluciones Vecinales',
            icon: Brain, color: '#a855f7', isEvent: 'open-debono-hats', active: true, badge: 'CO-CREACION'
        },
        {
            id: 'tribunales', title: 'Tribunales Vecinales', subtitle: 'EducaciÃ³n CÃ­vica y Justicia Ciudadana',
            icon: Gavel, color: '#d4af37', isEvent: 'open-tribunales', active: true, badge: 'NUEVO'
        },
        {
            id: 'sentinel-apex', title: 'Centinel Faro (IA Monitoring)', subtitle: 'Social Listening y AnÃ¡lisis de Redes mediante IA',
            icon: Search, color: '#312e81', isEvent: 'open-sentinel-apex', active: true, badge: 'AI'
        },
        {
            id: 'ambient-mode', title: 'Modo Ambiente VLS', subtitle: 'Postales de La Serena y Radio VLS en Vivo',
            icon: ImageIcon, color: '#3b82f6', isEvent: 'open-ambient-mode', active: true, badge: 'RELAX'
        },
        {
            id: 'central-difusion', title: 'Central de DifusiÃ³n', subtitle: 'EnvÃ­o Masivo RRSS e IA Google',
            icon: Share2, color: '#10b981', isEvent: 'open-central-difusion', active: true, badge: 'institucional'
        },
        {
            id: 'vetcinos', title: 'VETcinos: Rescate Animal', subtitle: 'Pilar #1: Alerta, Voluntariado y SOS Mascotas',
            icon: Heart, color: '#ec4899', isEvent: 'open-veterinaria', active: true, badge: 'SOS'
        },
        {
            id: 'pincha', title: 'Pincha: Dating Premium', subtitle: 'ConexiÃ³n Segura entre Vecinos Verificados',
            icon: Heart, color: '#f43f5e', isEvent: 'open-pincha', active: true, badge: 'NUEVO'
        },
        {
            id: 'plaza-vecinal', title: 'La Plaza Vecinal', subtitle: 'Pilar #4: Micro Red Social e Inteligencia Ciudadana',
            icon: MessageSquare, color: '#38bdf8', isEvent: 'open-plaza-vecinal', active: true, badge: 'VLS SOCIAL'
        }
    ].filter(s => {
        if (!s.active) return false;
        // Si es RDMLS, priorizamos lo institucional/institucional
        if (isRDMLS) {
            // No filtramos nada por ahora, dejamos que se vea todo lo relevante
            return true;
        }
        // Si es VLS, filtramos lo que explÃ­citamente diga institucional/institucional si se desea ocultar, 
        // pero el usuario pidiÃ³ lo opuesto antes.
        // Mantenemos la lÃ³gica original para VLS por ahora para no romper su vista.
        // VLS_C5: Blindaje contra objetos malformados en listas de servicios
        if (!s || !s.title) return false;
        
        return !s.title.toLowerCase().includes('institucional') && !s.subtitle?.toLowerCase().includes('institucional') && !s.badge?.includes('GOBIERNO');
    });

    const internalTools = [
        {
            id: 'smart-admin-internal', title: 'GestiÃ³n RRHH & InducciÃ³n', subtitle: 'DigitalizaciÃ³n de Informes (Honorarios) y Firma',
            icon: ShieldCheck, color: '#10b981', isEvent: 'open-smart-admin', active: true, badge: 'PILAR #2'
        },
        {
            id: 'protocolo', title: 'Monitor de Precedencias', subtitle: 'GestiÃ³n Protocolar y Eventos de Autoridad',
            icon: Users, color: '#f59e0b', path: '/protocolo', active: true, badge: 'INTERNO'
        },
        {
            id: 'backoffice-movil', title: 'Backoffice MÃ³vil (C5)', subtitle: 'Registro In Situ, Monitoreo y RRHH',
            icon: Camera, color: '#38bdf8', isEvent: 'open-backoffice-movil', active: true, badge: 'MOVIL'
        },
        {
            id: 'vls-vial-back', title: 'Reporte Vial Directo', subtitle: 'Capture evidencias de baches en terreno',
            icon: Construction, color: '#f59e0b', isEvent: 'open-vial-news', active: true, badge: 'DENUNCIA'
        }
    ];

    const participacionCiudadana = [
        {
        },
        {
            id: 'ecumenico', title: 'Portal EcumÃ©dico y Espiritual', subtitle: 'Encuentro Interreligioso de Fe (Iglesias, Cultos y Templos)',
            icon: Heart, color: '#fcd34d', isEvent: 'open-ecumenical', active: true
        },
        {
            id: 'estudio-vls', title: 'Estudio Audiovisual VLS', subtitle: 'Arriendo de Estudio Broadcast & Podcast PRO',
            icon: Radio, color: '#00BCD4', isEvent: 'open-estudio-vls', active: true, badge: 'BROADCAST'
        },
        {
            id: 'laico', title: 'Portal CÃ­vico y Laico', subtitle: 'Librepensamiento, Agrupaciones CÃ­vicas y Voluntariado',
            icon: Globe, color: '#10b981', isEvent: 'open-secular', active: true
        },
        {
            id: 'almanaque-mundial', title: 'Portal Vecinos del Mundo', subtitle: 'Embajadas, Consulados y Relaciones Internacionales Smart',
            icon: Globe, color: '#60a5fa', isEvent: 'open-embajadas', active: true
        },
        {
            id: 'vecinos-analytics', title: 'Centinel Faro AnalÃ­tica', subtitle: 'AnÃ¡lisis de Redes y IA Ciudadana',
            icon: Brain, color: '#00e5ff', isEvent: 'open-analytics', active: true, badge: 'IA PRO'
        },
        {
            id: 'parlamento-regional', title: 'Observatorio Parlamentario', subtitle: 'Transparencia y AuditorÃ­a de Representantes Regionales',
            icon: Gavel, color: '#38bdf8', isEvent: 'open-parlamento-regional', active: false, badge: 'NUEVO'
        },
        {
            id: 'vls-vial', title: 'Crisis Vial: El Laberinto', subtitle: 'Expediente VLS-2025-VIAL: Denuncia baches y rutas crÃ­ticas',
            icon: Construction, color: '#f59e0b', isEvent: 'open-vial-news', active: true, badge: 'TACTICO'
        },
        {
            id: 'alcaldes-history', title: 'Archivo Alcaldes Regionales', subtitle: 'Hemeroteca y CronologÃ­a de Liderazgo Comunal',
            icon: HistoryIcon, color: '#38bdf8', isEvent: 'open-alcaldes-history', active: true, badge: 'HISTORIAL'
        }
    ];

    const allApps = [...servicios, ...participacionCiudadana, ...internalTools]
        .filter(a => a && a.active)
        .filter(a => {
            if (!a || !a?.id) return false;
            if (!isRDMLS) return true;
            const vlsOnly = [
                'tienda-poleras', 'gym-3d', 'retro-gamer-room', 'personal-stereo', 'vhs-tv', 'cdls-club', 
                'difundir-app', 'stickers-portal', 'laico', 'ecumenico', 'vls-motors', 'tornamesa-digital',
                'galaxia-disco', 'memory-portal', 'kiosko-diarios', 'muralismo', 'operacion-ls', 
                'personal-stereo', 'tornamesa-digital', 'gym-3d', 'retro-gamer-room', 'vhs-tv', 
                'stickers-portal', 'glosario-vls', 'legacy-game', 'serenito-1945'
            ];
            return a?.id && !vlsOnly.includes(a?.id);
        })
        .map(app => {
            if (!app) return null;
            if (isRDMLS) {
                if (app?.id === 'vls-trivia') return { ...app, title: 'Saberes Regionales', badge: 'INSTITUCIONAL' };
                if (app?.id === 'smart-learning') return { ...app, title: 'InducciÃ³n La Serena', badge: 'VLS' };
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
            name: 'Smart Citizens (AtenciÃ³n Ciudadana)',
            description: isRDMLS 
                ? 'Registro digital de accesos, portal georreferenciado para reportes vecinales, monitoreo urbano/ambiental (baches, luminarias, playas, humedales) y Radio Digital La Serena.'
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
            name: 'Smart Administration (GestiÃ³n Interna)',
            description: isRDMLS
                ? 'Portal de inducciÃ³n E-learning (entrega de diplomas) y digitalizaciÃ³n de informes para trabajadores institucionales (Honorarios) con firma digital.'
                : 'Portal de formaciÃ³n continua, saberes locales y herramientas de gestiÃ³n vecinal avanzada.',
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
                ? 'GestiÃ³n automatizada de eventos institucionales y un Monitor de Precedencias en tiempo real para autoridades.'
                : 'GestiÃ³n de eventos vecinales, asambleas y monitor de participaciÃ³n ciudadana en tiempo real.',
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
                'vls-domeyko', 'vecinos-analytics', 'sentinel-apex', 'social-vision', 
                'vls-artemis', 'vls-chequia', 'central-difusion', 'plaza-vecinal', 
                'parlamento-regional', 'faro-ia', 'vls-andacollo', 'vls-vallenar', 'vls-juansoldado'
            ]
        }
    ];

    const categories = isRDMLS 
        ? baseCategories 
        : baseCategories;


    const displayApps = (viewMode === 'personalized'
        ? allApps.filter(a => a?.id && pinnedApps.includes(a?.id))
        : filteredApps
    ).filter(Boolean);

    const AppCard = ({ app }) => {
        if (!app || !app?.id) return null;
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
                    touchAction: 'pan-y', 
                    cursor: locked ? 'not-allowed' : 'grab',
                    animation: app?.id === 'vls-artemis' ? 'vls-stardust-pulse 3s infinite alternate' : 'none'
                }}
            >
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
                        if (e.defaultPrevented) return;
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
        { icon: Award, color: '#fbbf24', text: isRDMLS ? "[RDMLSabes]: Juega la trivia oficial y valida tus conocimientos regionales." : "[VLSABES]: Â¿CuÃ¡nto sabes de tu comuna? Juega la trivia oficial y gana fichas para el portal." },
        { icon: Map, color: '#38bdf8', text: "[El TÃºnel de Tiempo]: Viaja al pasado de La Serena en 3D. Explora el centro histÃ³rico como era hace 100 aÃ±os." },
        { icon: Box, color: '#c084fc', text: "[Render 3D]: Ya puedes visualizar tu indumentaria institucional en 3D antes de pedirla." },
        { icon: AlertCircle, color: '#ef4444', text: isRDMLS ? "[GestiÃ³n La Serena]: Reporte de baches y luminarias integrado con la central de mando." : "[Smart Comuna]: Reporta baches, luminarias o basura con un solo click. GestiÃ³n directa con la administraciÃ³n." },
        { icon: Radio, color: '#38bdf8', text: isRDMLS ? "[RDMLS]: La radio oficial de La Serena ya estÃ¡ en el aire. Escucha la programaciÃ³n regional 24/7." : "[Radio VLS]: La voz de los vecinos ya estÃ¡ en el aire. Escucha mÃºsica y noticias locales 24/7." },
        { icon: Heart, color: '#f472b6', text: "[VecinityPay]: Apoya el desarrollo local de este portal 100% Home-Made y obtÃ©n beneficios exclusivos." },
        { icon: Leaf, color: '#10b981', text: "[Turismo Sustentable]: Medios destacan a La Serena como capital pionera en integraciÃ³n de tecnologÃ­a no invasiva con el patrimonio." }
    ]);

    const guardianes = [
        { id: 'serenito-guard', name: 'Serenito', role: 'Seguridad & ProtecciÃ³n', model: '/models/serenito_38.glb', img: '/serenito_3d_humanized_2025_1774875415876.png', bio: isRDMLS ? 'Experto en seguridad urbana y IA biomÃ©trica. El corazÃ³n del Portal RDMLS.' : 'Experto en seguridad vecinal y IA biomÃ©trica. El corazÃ³n de VecinoSmart.' },
        { id: 'tata-rojas', name: 'Tata Rojas', role: 'Gran Patriarca VLS', model: '/models/tata_rojas_3d.glb', img: '/avatars/tio_pedro.png', bio: 'El sabio del Valle. Custodio de las tradiciones y la memoria histÃ³rica de nuestra regiÃ³n.' },
        { id: 'alpino-tech', name: 'Alpino 3D', role: 'Ã‰lite TecnolÃ³gica VLS', model: '/models/alpino3d.glb', img: '/avatars/alpino.png', bio: 'Experto en infraestructura crÃ­tica y sistemas inteligentes. El puente entre el cerro y la nube.' },
        { id: 'don-joako', name: 'Don Joako', role: 'Seguridad Patrimonial', model: '/models/Serenito_polera_blancacuerpo_entero.glb', img: '/avatars/don_joako_guardian.png', bio: 'GuardiÃ¡n del casco histÃ³rico. Siempre vigilante con su gorro de honor y mirada profunda.' },
        { id: 'pampita-huertera', name: 'Pampita', role: 'Humizales & Parques', model: '/models/Serenito_polera_blancacuerpo_entero.glb', img: '/pampita_v3.png', bio: 'Guardiana de flora y fauna regional. SabidurÃ­a de la tierra y biodiversidad.' },
        { id: 'ancestro-bisabuelo', name: 'Ancestral Serenito (Bisabuelo)', role: 'Historia & TradiciÃ³n', model: '/models/faro_3d_modelo.glb', img: '/ancestral_serenito.png', bio: 'GuardiÃ¡n original de la ciudad con su farol de la verdad. SabidurÃ­a de los fundadores.' }
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
                { icon: Globe, color: '#38bdf8', text: `[MeteorologÃ­a SERENAMET]: Condiciones en vivo: ${temp}Â°C, Viento ${windDirection} a ${windSpeed} km/h, Humedad: ${humidity}%.` },
                { icon: Leaf, color: '#10b981', text: `[Monitoreo Ambiental]: Calidad del Aire PM2.5 = ${pm25} Âµg/mÂ³. Valores seguros para actividades al aire libre validados por IA.` },
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

    const CurrentMessage = impactMessages[msgIndex] || impactMessages[0] || { text: 'SoberanÃ­a Digital: La Serena Smart', color: '#38bdf8' };
    const CurrentIcon = CurrentMessage?.icon || Sparkles;

    const handleSearchSubmit = (term) => {
        const lowerTerm = term.toLowerCase();
        
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
        } else if (lowerTerm.includes('diseÃ±ar') || lowerTerm.includes('arquitecto') || lowerTerm.includes('construir') || lowerTerm.includes('ampliaciÃ³n') || lowerTerm.includes('obra')) {
            navigate('/arquitectura');
        } else if (lowerTerm.includes('salud') || lowerTerm.includes('mÃ©dico') || lowerTerm.includes('doctor')) {
            navigate('/smart-salud');
        } else if (lowerTerm.includes('artemis') || lowerTerm.includes('luna') || lowerTerm.includes('espacio') || lowerTerm.includes('nasa')) {
            handleArtemis();
        } else {
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
                setViewMode('full');
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

            <button onClick={() => handleSmartReport()} className="huincha-btn premium-citizens" style={{ background: 'rgba(56, 189, 248, 0.15)', border: '1px solid #38bdf8', borderRadius: '50px', padding: '0.4rem 1.2rem', color: 'white', fontWeight: '900', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 0 15px rgba(56, 189, 248, 0.3)' }}>
                <Users size={14} color="#38bdf8" /> SMART CITIZENS
            </button>
            <button onClick={() => navigate('/induccion')} className="huincha-btn premium-admin" style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', borderRadius: '50px', padding: '0.4rem 1.2rem', color: 'white', fontWeight: '900', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 0 15px rgba(16, 185, 129, 0.3)' }}>
                <Shield size={14} color="#10b981" /> SMART ADMINISTRATION
            </button>
            <button onClick={() => window.dispatchEvent(new CustomEvent('open-smart-events'))} className="huincha-btn premium-events" style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', borderRadius: '50px', padding: '0.4rem 1.2rem', color: 'white', fontWeight: '900', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 0 15px rgba(239, 68, 68, 0.3)' }}>
                <Calendar size={14} color="#ef4444" /> SMART EVENTS
            </button>
            <button onClick={() => handleSentinelNote()} className="huincha-btn premium-listening" style={{ background: 'rgba(168, 85, 247, 0.15)', border: '1px solid #a855f7', borderRadius: '50px', padding: '0.4rem 1.2rem', color: 'white', fontWeight: '900', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 0 15px rgba(168, 85, 247, 0.3)' }}>
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
            <div className="page-container trencadis-guell" style={{ 
                minHeight: '100vh', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '100%',
                background: 'linear-gradient(135deg, #020617 0%, #1e1b4b 100%)',
                color: 'white',
                textAlign: 'center',
                padding: '2rem'
            }}>
                <SeoHead 
                    title="RDMLS.cl â€” Red Digital Movilizando La Serena"
                    description="Sitio oficial de la Red Digital Movilizando La Serena. En mantenimiento institucional."
                    image="/escudo.png"
                    type="website"
                />
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ 
                        maxWidth: '800px', 
                        padding: '4rem', 
                        borderRadius: '40px', 
                        background: 'rgba(15, 23, 42, 0.6)', 
                        backdropFilter: 'blur(20px)',
                        border: '2px solid rgba(245, 158, 11, 0.3)',
                        boxShadow: '0 40px 100px rgba(0,0,0,0.6)'
                    }}
                >
                    <img src="/escudo.png" style={{ height: '140px', marginBottom: '2rem', filter: 'drop-shadow(0 0 20px rgba(245,158,11,0.4))' }} alt="Escudo La Serena" />
                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 950, letterSpacing: '-2px', lineHeight: 1.1, margin: '0 0 1rem 0' }}>
                        RED DIGITAL <br/>
                        <span style={{ color: '#f59e0b' }}>MOVILIZANDO LA SERENA</span>
                    </h1>
                    <div style={{ background: '#f59e0b', color: 'black', padding: '0.6rem 2rem', borderRadius: '50px', fontWeight: 950, fontSize: '1rem', display: 'inline-block', marginBottom: '2rem', letterSpacing: '2px' }}>
                        RDMLS.CL
                    </div>
                    
                    <div style={{ height: '2px', width: '100px', background: 'rgba(255,255,255,0.1)', margin: '0 auto 2rem' }}></div>
                    
                    <p style={{ color: '#94a3b8', fontSize: '1.2rem', lineHeight: 1.6, maxWidth: '600px', margin: '0 auto 2rem' }}>
                        Informamos a la comunidad que la seÃ±al de radio y el portal institucional de RDMLS se encuentran en un proceso de <strong>reestructuraciÃ³n tÃ©cnica y administrativa</strong>. 
                    </p>
                    
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', color: '#f59e0b', fontWeight: 'bold' }}>
                        <Clock size={20} />
                        <span>SITIO EN MANTENIMIENTO</span>
                    </div>

                    <div style={{ marginTop: '3rem' }}>
                        <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)' }}>
                            Para reportes ciudadanos y servicios activos, visite:<br/>
                            <a href="https://www.vecinoslaserena.cl" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 'bold' }}>www.vecinoslaserena.cl</a>
                        </p>
                    </div>
                </motion.div>

                <footer style={{ marginTop: '4rem', opacity: 0.5, fontSize: '0.8rem' }}>
                    Â© 2025 RDMLS SOBERANÍA DIGITAL Â· DEPARTAMENTO DE COMUNICACIONES
                </footer>
            </div>
        );
    }


    return (
        <React.Fragment>
            <SeoHead 
                title="Vecinos La Serena â€” Portal Inteligente de la Comuna"
                description="La primera plataforma Smart City de la RegiÃ³n de Coquimbo. Radio, reportes vecinales, patrimonio 3D y servicios ciudadanos 24/7."
                image="/vls-logo-premium.png"
                type="website"
            />
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
            <div className="page-container trencadis-guell" style={{ WebkitPaddingStart: 'env(safe-area-inset-left)', paddingBottom: '160px', paddingLeft: '0', paddingRight: '0', width: '100%', maxWidth: '100%', overflowX: 'hidden', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

                <div style={{
                    width: '100%',
                    background: 'linear-gradient(90deg, #1e1b4b 0%, #1e1b4b 100%)',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    padding: '0 1rem',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    color: 'white',
                    fontSize: '0.85rem',
                    zIndex: 990,
                    position: 'relative',
                    gap: '15px',
                    minHeight: '60px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                }}>
                    <div key={msgIndex} className="animate-slide-up" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                        textAlign: 'left',
                        flexShrink: 0,
                        maxWidth: isMobile ? '200px' : '380px',
                        padding: '0.5rem 0',
                        overflow: 'hidden',
                        borderRight: '1px solid rgba(255,255,255,0.1)',
                        marginRight: '10px'
                    }}>
                        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.4rem', borderRadius: '50%', flexShrink: 0, border: `1px solid ${CurrentMessage?.color || 'white'}50`, boxShadow: `0 0 10px ${CurrentMessage?.color || 'white'}30` }}>
                            {CurrentIcon ? <CurrentIcon size={18} color={CurrentMessage?.color || 'white'} /> : <Sparkles size={18} color={CurrentMessage?.color || 'white'} />}
                        </div>
                        <span style={{ lineHeight: '1.4', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', flex: 1, overflow: 'hidden' }}>
                            <span style={{ width: '10px', height: '10px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 10px #10b981', flexShrink: 0, animation: 'pulse 2s infinite' }}></span>
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, letterSpacing: '0.3px' }}>
                                <strong style={{ color: CurrentMessage?.color || 'white', marginRight: '5px' }}>[{CurrentMessage?.category || 'VLS'}]</strong>
                                {CurrentMessage?.text || 'SoberanÃ­a Digital: La Serena Smart'}
                            </span>
                        </span>
                    </div>

                        <div style={{ 
                            flexGrow: 1, 
                            overflow: 'hidden', 
                            position: 'relative', 
                            display: 'flex', 
                            alignItems: 'center',
                            maskImage: 'linear-gradient(to right, transparent, black 40px, black calc(100% - 40px), transparent)',
                            WebkitMaskImage: 'linear-gradient(to right, transparent, black 40px, black calc(100% - 40px), transparent)'
                        }}>
                            <div className="vls-ticker-wrapper" style={{ display: 'flex', gap: '30px' }}>
                                {huinchaButtonsJSX}
                                {huinchaButtonsJSX}
                                {huinchaButtonsJSX}
                            </div>
                        </div>

                        <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        flexShrink: 0,
                        padding: '0.5rem 0',
                        justifyContent: 'flex-start'
                    }}>
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
                    
                    {isVLS && (
                        <div style={{
                            width: '100%',
                            background: 'linear-gradient(135deg, #020617 0%, #0f172a 100%)',
                            borderBottom: '4px solid #fbbf24',
                            padding: isMobile ? '2rem 1rem' : '3rem 2rem',
                            position: 'relative',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            boxSizing: 'border-box',
                            minHeight: isMobile ? '350px' : '550px',
                            zIndex: 10,
                            opacity: 1
                        }}>
                            <div style={{ position: 'absolute', inset: 0, opacity: 0.15, background: 'radial-gradient(circle at 50% 50%, #38bdf8 0%, transparent 60%)' }}></div>
                            
                            <div style={{ zIndex: 2, display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: isMobile ? '1.5rem' : '3rem', maxWidth: '1400px', width: '100%', justifyContent: 'center', padding: '0 2rem' }}>
                                <div style={{ textAlign: isMobile ? 'center' : 'left', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: isMobile ? 'center' : 'flex-start' }}>
                                    <div style={{ background: 'rgba(56,189,248,0.15)', padding: '8px 20px', borderRadius: '50px', display: 'inline-flex', alignItems: 'center', gap: '10px', border: '1px solid rgba(56,189,248,0.3)', width: 'fit-content' }}>
                                        <Rocket size={18} color="#38bdf8" />
                                        <span style={{ color: '#38bdf8', fontWeight: '900', fontSize: '0.75rem', letterSpacing: '2px' }}>{greetings[greetingIdx].sub}</span>
                                    </div>

                                    <div style={{ minHeight: '110px' }}>
                                        <h1 style={{ color: 'white', fontSize: isMobile ? '2.2rem' : 'clamp(2.5rem, 5.5vw, 4.2rem)', fontWeight: '950', letterSpacing: '-2px', margin: 0, fontFamily: '"Outfit", sans-serif', lineHeight: '1', textShadow: '0 10px 20px rgba(0,0,0,0.6)' }}>
                                            {greetings[greetingIdx].text.split(',')[0]},<br/>
                                            <span style={{ color: greetings[greetingIdx].color, background: greetings[greetingIdx].bg, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{greetings[greetingIdx].text.split(',')[1] || ''}</span>
                                        </h1>
                                        
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '1rem', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <span style={{ fontSize: isMobile ? '2rem' : '2.5rem', filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.5))' }}>{greetings[greetingIdx].flag}</span>
                                                <div style={{ height: '30px', width: '2px', background: 'rgba(255,255,255,0.2)' }}></div>
                                                <p style={{ color: '#94a3b8', fontSize: isMobile ? '0.9rem' : '1.1rem', margin: 0, lineHeight: '1.4', fontWeight: '500' }}>
                                                    {tHub?.heroDescription || 'La red inteligente para vecinos, visitantes, turistas y servicios.'}
                                                </p>
                                            </div>
                                            
                                            {/* CAJA DE TRADUCCIÃ“N INTELIGENTE RESTAURADA */}
                                            <motion.div 
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                key={`trans-box-${greetingIdx}`}
                                                style={{ 
                                                    background: 'rgba(56, 189, 248, 0.1)', 
                                                    borderLeft: '4px solid #38bdf8',
                                                    padding: '8px 15px',
                                                    borderRadius: '8px',
                                                    marginTop: '5px',
                                                    maxWidth: '500px',
                                                    backdropFilter: 'blur(5px)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '10px'
                                                }}
                                            >
                                                <Languages size={16} color="#38bdf8" />
                                                <span style={{ color: 'white', fontSize: '0.85rem', fontWeight: 'bold' }}>
                                                    {greetingIdx === 0 ? 'Portal Ciudadano Inteligente' : `TraducciÃ³n: "${greetings[0].text.replace('Â¡', '').replace('!', '')}"`}
                                                </span>
                                            </motion.div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                                        <button className="btn-vls-action-blue" onClick={() => setShowDirectory(true)} style={{ fontSize: '0.9rem', padding: '0.8rem 1.8rem', background: '#38bdf8', color: 'white', fontWeight: '900', border: 'none', borderRadius: '50px', cursor: 'pointer', boxShadow: '0 10px 20px rgba(56,189,248,0.3)' }}>EXPLORAR SERVICIOS</button>
                                        <button className="btn-glass" onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })} style={{ fontSize: '0.9rem', padding: '0.8rem 1.8rem', color: 'white', fontWeight: '900', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50px', cursor: 'pointer' }}>VER NOTICIAS</button>
                                    </div>
                                    
                                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '1.2rem', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                                        {greetings.map((g, gIdx) => (
                                            <button
                                                key={`top-greeting-btn-${gIdx}`}
                                                onClick={() => { setGreetingIdx(gIdx); setLang(['es','en','pt','fr','it','zh'][gIdx] || 'es'); }}
                                                style={{
                                                    background: greetingIdx === gIdx ? 'rgba(56,189,248,0.2)' : 'rgba(255,255,255,0.05)',
                                                    border: greetingIdx === gIdx ? '1.5px solid #38bdf8' : '1.5px solid rgba(255,255,255,0.1)',
                                                    borderRadius: '50px',
                                                    padding: '5px 12px',
                                                    cursor: 'pointer',
                                                    fontSize: '1.1rem',
                                                    transition: 'all 0.3s ease',
                                                    transform: greetingIdx === gIdx ? 'scale(1.1)' : 'scale(1)'
                                                }}
                                            >
                                                <span style={{ fontWeight: '900', color: greetingIdx === gIdx ? '#38bdf8' : 'white', fontSize: '0.75rem' }}>
                                                    {['CL', 'GBUS', 'BR', 'FR', 'IT', 'CN'][gIdx]}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="animate-float" style={{ position: 'relative', width: isMobile ? '200px' : '320px', height: isMobile ? '200px' : '320px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <div style={{ position: 'relative', zIndex: 1, width: isMobile ? '180px' : '280px', height: isMobile ? '180px' : '280px', borderRadius: '50%', overflow: 'hidden', border: '6px solid #38bdf8', boxShadow: '0 0 50px rgba(56,189,248,0.5)', background: 'radial-gradient(circle at center, #1e3a8a 0%, #0f172a 100%)' }}>
                                        <Canvas camera={{ position: [0, 0, 3], fov: 45 }} style={{ width: '100%', height: '100%' }}>
                                            <ambientLight intensity={1.2} />
                                            <pointLight position={[10, 10, 10]} intensity={2} />
                                            <Environment preset="city" />
                                            <Suspense fallback={null}>
                                                <UniversalSerenito 
                                                    animation={greetingIdx === 0 ? 'Wave' : 'Idle'} 
                                                    scale={isMobile ? 2.0 : 2.5} 
                                                    position={[0, -2.4, 0]} 
                                                />
                                            </Suspense>
                                        </Canvas>
                                    </div>
                                    <div style={{ position: 'absolute', inset: -20, border: '1px dashed rgba(56,189,248,0.3)', borderRadius: '50%', animation: 'spin 20s linear infinite' }}></div>
                                </div>
                            </div>

                            <div style={{ width: '100%', maxWidth: '900px', position: 'relative', zIndex: 10, marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                {/* SEARCH BAR ADDITION */}
                                <div style={{ 
                                    background: 'rgba(255, 255, 255, 0.05)', 
                                    border: '1px solid rgba(255, 255, 255, 0.1)', 
                                    borderRadius: '24px', 
                                    padding: '0.8rem 1.5rem', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '1rem',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                                    backdropFilter: 'blur(10px)'
                                }}>
                                    <Search size={20} color="#38bdf8" />
                                    <input 
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="O busca un servicio especÃ­fico aquÃ­..."
                                        style={{ 
                                            background: 'transparent', 
                                            border: 'none', 
                                            color: 'white', 
                                            flex: 1, 
                                            outline: 'none', 
                                            fontSize: '1rem', 
                                            fontWeight: '500',
                                            fontFamily: '"Inter", sans-serif'
                                        }}
                                    />
                                    {searchTerm && (
                                        <button onClick={() => setSearchTerm('')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                                            <X size={18} />
                                        </button>
                                    )}
                                </div>

                                <RadioHomeWidget />
                            </div>
                        </div>
                    )}



            {!isRDMLS && (
            <div style={{
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto 3rem auto',
                padding: '0 1rem',
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: '1.5rem',
                zIndex: 100,
                position: 'relative'
            }}>
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
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'; e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 1)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.6)'; }}
                >
                    <div style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', borderRadius: '50%', width: '55px', height: '55px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 25px rgba(14, 165, 233, 0.4)', flexShrink: 0, border: '2px solid rgba(255,255,255,0.2)' }}>
                        <Users size={28} color="white" />
                    </div>
                    <div style={{ flex: 1, zIndex: 1 }}>
                        <span style={{ fontSize: '1.3rem', fontWeight: '950', color: '#38bdf8', textShadow: '0 0 15px rgba(56, 189, 248, 0.6)' }}>SMART CITIZENS</span>
                        <p style={{ color: 'rgba(125, 211, 252, 0.9)', fontSize: '0.85rem', margin: '4px 0 0 0', fontWeight: '500' }}>AtenciÃ³n Ciudadana & Reportes</p>
                    </div>
                </div>

                <div
                    onClick={() => navigate('/induccion')}
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
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'; e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 1)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.6)'; }}
                >
                    <div style={{ background: 'linear-gradient(135deg, #22c55e, #15803d)', borderRadius: '50%', width: '55px', height: '55px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 25px rgba(34, 197, 94, 0.4)', flexShrink: 0, border: '2px solid rgba(255,255,255,0.2)' }}>
                        <Shield size={28} color="white" />
                    </div>
                    <div style={{ flex: 1, zIndex: 1 }}>
                        <span style={{ fontSize: '1.3rem', fontWeight: '950', color: '#4ade80', textShadow: '0 0 15px rgba(74, 222, 128, 0.6)' }}>SMART ADMINISTRATION</span>
                        <p style={{ color: 'rgba(187, 247, 208, 0.9)', fontSize: '0.85rem', margin: '4px 0 0 0', fontWeight: '500' }}>GestiÃ³n Interna & E-learning</p>
                    </div>
                </div>

                <div
                    onClick={() => window.dispatchEvent(new CustomEvent('open-smart-events'))}
                    style={{
                        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(15, 23, 42, 0.6) 100%)',
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
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'; e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 1)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.6)'; }}
                >
                    <div style={{ background: 'linear-gradient(135deg, #ef4444, #b91c1c)', borderRadius: '50%', width: '55px', height: '55px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 25px rgba(239, 68, 68, 0.4)', flexShrink: 0, border: '2px solid rgba(255,255,255,0.2)' }}>
                        <Calendar size={28} color="white" />
                    </div>
                    <div style={{ flex: 1, zIndex: 1 }}>
                        <span style={{ fontSize: '1.3rem', fontWeight: '950', color: '#fca5a5', textShadow: '0 0 15px rgba(239, 68, 68, 0.6)' }}>SMART EVENTS</span>
                        <p style={{ color: 'rgba(252, 165, 165, 0.9)', fontSize: '0.85rem', margin: '4px 0 0 0', fontWeight: '500' }}>Protocolo & Ceremonias</p>
                    </div>
                </div>

                <div
                    onClick={() => handleSentinelNote()}
                    style={{
                        background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(15, 23, 42, 0.6) 100%)',
                        border: '1px solid rgba(168, 85, 247, 0.6)',
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
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'; e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 1)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.6)'; }}
                >
                    <div style={{ background: 'linear-gradient(135deg, #a855f7, #7e22ce)', borderRadius: '50%', width: '55px', height: '55px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 25px rgba(168, 85, 247, 0.4)', flexShrink: 0, border: '2px solid rgba(255,255,255,0.2)' }}>
                        <Zap size={28} color="white" />
                    </div>
                    <div style={{ flex: 1, zIndex: 1 }}>
                        <span style={{ fontSize: '1.3rem', fontWeight: '950', color: '#d8b4fe', textShadow: '0 0 15px rgba(168, 85, 247, 0.6)' }}>SMART LISTENING</span>
                        <p style={{ color: 'rgba(216, 180, 254, 0.9)', fontSize: '0.85rem', margin: '4px 0 0 0', fontWeight: '500' }}>Inteligencia & Social Listening</p>
                    </div>
                </div>
            </div>
            )}
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
                        <p style={{ color: 'rgba(250, 204, 21, 0.9)', fontSize: '0.85rem', margin: '4px 0 0 0', fontWeight: '500' }}>Cultura, Historia y DesafÃ­os</p>
                    </div>
                </div>

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

                <div
                    onClick={() => navigate('/domeyko')}
                    style={{
                        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
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
                    <div style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', borderRadius: '50%', width: '55px', height: '55px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 25px rgba(56, 189, 248, 0.4)', flexShrink: 0, border: '2px solid rgba(255,255,255,0.2)' }}>
                        <GraduationCap size={28} color="white" />
                    </div>
                    <div style={{ flex: 1, zIndex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '1.3rem', fontWeight: '950', color: '#38bdf8', textShadow: '0 0 15px rgba(56, 189, 248, 0.6)' }}>DOMEYKO</span>
                            <span style={{ background: '#38bdf8', color: 'white', fontSize: '0.6rem', fontWeight: '900', padding: '2px 8px', borderRadius: '10px' }}>CIENCIA</span>
                        </div>
                        <p style={{ color: 'rgba(56, 189, 248, 0.9)', fontSize: '0.85rem', margin: '4px 0 0 0', fontWeight: '500' }}>Legado Naturalista en Chile</p>
                    </div>
                </div>
                <div style={{ padding: '0 1.5rem 3rem', maxWidth: '1600px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>

                </div>

                <div style={{ padding: '3rem 1.5rem', maxWidth: '1600px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>

                    <div className="vls-perf-section" style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 1024 ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
                        
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
                                gridColumn: '1 / -1'
                            }}
                            whileHover={{ y: -10, transition: { duration: 0.3 } }}
                        >
                            <img src="/salud/VLS_Nueva_Salud_La_Serena.jpg" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.6 }} alt="Salud La Serena" />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(2, 6, 23, 1) 0%, rgba(2, 6, 23, 0.8) 40%, transparent 100%)' }} />
                            
                            <div style={{ 
                                position: 'absolute', top: window.innerWidth < 768 ? 15 : 30, right: window.innerWidth < 768 ? 15 : 30, 
                                background: '#ef4444', padding: window.innerWidth < 768 ? '0.4rem 1rem' : '0.6rem 1.8rem', borderRadius: '30px', 
                                color: 'white', fontWeight: 950, fontSize: 'clamp(0.65rem, 2vw, 0.9rem)', letterSpacing: window.innerWidth < 768 ? '1px' : '2px', 
                                zIndex: 20, boxShadow: '0 10px 20px rgba(239, 68, 68, 0.5)',
                                display: 'flex', alignItems: 'center', gap: '8px'
                            }}>
                                <Mic size={window.innerWidth < 768 ? 14 : 18} /> NUEVO REPORTAJE VLS
                            </div>
 
                            <div style={{ position: 'relative', padding: window.innerWidth < 768 ? '1.5rem' : '3rem', zIndex: 10, maxWidth: '1000px', paddingTop: window.innerWidth < 768 ? '4rem' : '3rem' }}>
                                <h2 style={{ color: 'white', fontSize: 'clamp(1.5rem, 5.5vw, 3.8rem)', fontWeight: 950, margin: 0, letterSpacing: '-1px', lineHeight: 1.05 }}>
                                   CRUZADA VECINAL:<br/>
                                   <span style={{ color: '#ef4444' }}>AL RESCATE DE LA SALUD<br className="lg:hidden" style={{ display: window.innerWidth < 768 ? 'block' : 'none' }}/> EN LA SERENA</span>
                                </h2>
                                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 'clamp(0.95rem, 2vw, 1.4rem)', marginTop: '1rem', fontWeight: 400, maxWidth: '800px', lineHeight: 1.4 }}>
                                   El "Plan Norambuena" busca extirpar el dÃ©ficit histÃ³rico y rescatar la atenciÃ³n primaria. Descubre en exclusiva el plan de acciÃ³n, estadÃ­sticas clave, podcast inmersivo y respaldos oficiales.
                                </p>
                                <button className="btn-vls-action-light" style={{ marginTop: window.innerWidth < 768 ? '1.5rem' : '2rem', background: '#ef4444', color: 'white', border: 'none', padding: window.innerWidth < 768 ? '0.8rem 1.5rem' : '1rem 2rem', fontSize: window.innerWidth < 768 ? '0.9rem' : '1rem' }}>
                                   ENTRAR A LA NOTA CENTRAL
                                </button>
                            </div>
                        </motion.div>
                        
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
                            <img src="/media/arquiartista/Eduardo_Auto.png" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} alt="IlustraciÃ³n Eduardo Gardella" />
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
                                    GALERÃA PREMIUM:<br/>
                                    <span style={{ color: '#d8b4fe' }}>EDUARDO GARDELLA</span>
                                </h2>
                                <p style={{ color: 'rgba(255,255,255,1)', fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', marginTop: '1.5rem', fontWeight: 300, lineHeight: 1.4, fontStyle: 'italic' }}>
                                    "El trazo que captura el alma de la RegiÃ³n." Explora ilustraciones hiperrealistas en grafito de este artista vallenarino.
                                </p>
                                <button className="btn-vls-action-light" style={{ marginTop: '2.5rem', background: '#a855f7', color: 'white', border: 'none', padding: '1rem 3rem', borderRadius: '50px' }}>
                                    EXPLORAR PORTAFOLIO COMPLETO
                                </button>
                            </div>
                        </motion.div>

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
                                        Ã‰xito rotundo en la Corrida Familiar. La Serena se mueve con soberanÃ­a y deporte vecinal.
                                    </p>
                                    <div className="flex flex-wrap gap-4 mt-8">
                                        <button className="btn-vls-action-light" style={{ background: '#ef4444', color: 'white', border: 'none', padding: '1rem 2rem' }}>
                                            LEER CRÃ“NICA
                                        </button>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

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
                                    GESTIÃ“N ESTRATÃ‰GICA
                                </div>
 
                            <div style={{ position: 'relative', padding: '3rem', zIndex: 10 }}>
                                <h2 style={{ color: 'white', fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 950, margin: 0, letterSpacing: '-2px', lineHeight: 0.95 }}>
                                   AVANCE Y SOBERANÃA:<br/>
                                   <span style={{ color: '#38bdf8' }}>PORTAL GESTIÃ“N</span>
                                </h2>
                                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 'clamp(0.9rem, 2.5vw, 1.25rem)', marginTop: '1.2rem', fontWeight: 400, maxWidth: '450px', lineHeight: 1.4 }}>
                                   Conoce los pilares de la gestiÃ³n actual y el compromiso de la Alcaldesa Daniela Norambuena con la comuna.
                                </p>
                                <button className="btn-vls-action-light" style={{ marginTop: '2rem', background: '#38bdf8', color: 'white', border: 'none', padding: '1rem 2rem' }}>
                                   ENTRAR AL PORTAL
                                </button>
                            </div>
                        </motion.div>

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
                                   Llamado a regularizar procesos de renovaciÃ³n de directorios. Seguridad jurÃ­dica para la cuenca.
                                </p>
                                <button className="btn-vls-action-light" style={{ marginTop: '2rem', background: '#1d4ed8', color: 'white', border: 'none', padding: '0.8rem 1.8rem', borderRadius: '50px' }}>
                                   VER COMUNICADO
                                </button>
                            </div>
                        </motion.div>

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
                                FORMACIÃ“N CULTURAL
                            </div>
 
                            <div style={{ position: 'relative', padding: '3rem', zIndex: 10 }}>
                                <h2 style={{ color: 'white', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 950, margin: 0, letterSpacing: '-1.5px', lineHeight: 1 }}>
                                   RED SALAS DE CINE:<br/>
                                   <span style={{ color: '#fb7185' }}>TALLERES GRATUITOS</span>
                                </h2>
                                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem', marginTop: '1.2rem', fontWeight: 400, maxWidth: '450px', lineHeight: 1.4 }}>
                                   Cineclubismo y curatorÃ­a. Convocatoria abierta para gestores y amantes del sÃ©ptimo arte.
                                </p>
                                <button className="btn-vls-action-light" style={{ marginTop: '2rem', background: '#f43f5e', color: 'white', border: 'none', padding: '0.8rem 1.8rem', borderRadius: '50px' }}>
                                   INSCRIBIRSE AHORA
                                </button>
                            </div>
                        </motion.div>

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
                                zIndex: 10, boxShadow: '0 0 30px rgba(239, 68, 68, 0.4)',
                                display: 'flex', alignItems: 'center', gap: '10px'
                            }}>
                                <Rocket size={20} /> PORTAL EMPRESARIAL MASTER
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
                                    <span style={{ color: '#ef4444' }}>EL CORAZON TECNOLÃ“GICO</span>
                                </h2>
                                <p style={{ color: 'rgba(255,255,255,1)', fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', marginTop: '2.5rem', fontWeight: 300, lineHeight: 1.3, maxWidth: '900px' }}>
                                    Explora el portal interactivo del Local 204. Microsoldadura, Hardware Maestro y la pasiÃ³n por el fÃºtbol local en una experiencia digital Ãºnica. 
                                    <br/><strong style={{ fontWeight: 900, color: '#ef4444' }}>Â¡Sintoniza RADIO AKICHIP ahora!</strong>
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


                        {/* VOCES VECINALES & HEMEROTECA SECTION (PROMOTED FOR VISIBILITY) */}
                        <div style={{ maxWidth: '1600px', margin: '4rem auto 2rem auto', width: '100%', padding: '0 2rem', boxSizing: 'border-box' }}>
                                 <h2 style={{ color: 'white', fontSize: '2.5rem', fontWeight: '900', marginBottom: '2rem', letterSpacing: '-1px' }}>
                                     NOTAS VECINALES Y SERVICIOS
                                 </h2>
                                 <LocalNewsGrid />

                                 <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '4rem', marginBottom: '2rem' }}>
                                    <div style={{ background: 'linear-gradient(45deg, #ef4444, #f59e0b)', padding: '12px', borderRadius: '15px', color: 'white' }}>
                                        <Mic size={28} />
                                    </div>
                                    <div>
                                        <h2 style={{ color: 'white', margin: 0, fontSize: '2.2rem', fontWeight: '900', letterSpacing: '5px', textTransform: 'uppercase', fontFamily: '"Outfit", sans-serif' }}>VOCES Y ARCHIVOS</h2>
                                        <p style={{ color: '#f59e0b', margin: 0, fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '2px' }}>HEMEROTECA DIGITAL Â· PORTAL DE LA MEMORIA VLS</p>
                                    </div>
                                    <div style={{ height: '2px', flex: 1, background: 'linear-gradient(90deg, #f59e0b, transparent)' }}></div>
                                 </div>

                                 <div id="search-results-anchor" />
                                 <Suspense fallback={<div />}>
                                    <VLSNotesGallery />
                                 </Suspense>
                        </div>

                        {/* SMART CITIZENS PREMIUM CARD */}
                        <div style={{ maxWidth: '1600px', margin: '0 auto 2.5rem auto', width: '100%', padding: '0 2rem', boxSizing: 'border-box' }}>
                             <div 
                                  onClick={() => window.dispatchEvent(new CustomEvent('open-vls-reporte'))}
                                  className="glass-panel gaudi-curves hover-lift animate-fade-in" 
                                  style={{ 
                                      background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.7) 0%, rgba(2, 6, 23, 0.95) 100%)', 
                                      padding: isMobile ? '1.5rem' : '2.5rem', 
                                      borderRadius: '35px', 
                                      cursor: 'pointer',
                                      border: '1px solid rgba(16, 185, 129, 0.5)',
                                      position: 'relative',
                                      overflow: 'hidden',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      marginBottom: '2.5rem',
                                      boxShadow: '0 25px 50px -12px rgba(16, 185, 129, 0.2)'
                                  }}
                             >
                                 <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("/vls_seguridad_central.png")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.35, zIndex: 0 }}></div>
                                 <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                     <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.2rem' }}>
                                         <div style={{ background: '#10b981', color: 'white', padding: '5px 15px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 900, letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 5px 15px rgba(16,185,129,0.5)' }}>
                                             ðŸš€ SMART CITIZENS
                                         </div>
                                         <div style={{ display: 'flex', gap: '8px', color: '#10b981' }}>
                                             <Shield size={18} />
                                         </div>
                                     </div>
                                     <h2 style={{ color: 'white', fontSize: isMobile ? '1.8rem' : '2.5rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '1rem', fontFamily: '"Outfit", sans-serif' }}>REPORTE VECINAL</h2>
                                     <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', margin: '0 0 1.5rem 0', fontWeight: 400, lineHeight: 1.4, flex: 1 }}>
                                         Portal georreferenciado para reportes de baches, luminarias, playas y humedales. Tu voz construye una ciudad inteligente.
                                     </p>
                                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                         <button className="btn-vls-action-light" style={{ background: '#10b981', color: 'white', padding: '0.8rem 2rem', fontSize: '0.9rem', border: 'none', borderRadius: '15px', fontWeight: '900' }}>CREAR REPORTE</button>
                                         <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '0.8rem', letterSpacing: '2px' }}>VLS SEGURIDAD</span>
                                     </div>
                                 </div>
                             </div>

                             <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '2rem' }}>
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
                                                 <Music size={18} />
                                             </div>
                                         </div>
                                         <h2 style={{ color: 'white', fontSize: isMobile ? '1.5rem' : '1.8rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '1rem', fontFamily: '"Outfit", sans-serif' }}>JORGE CAMPOS</h2>
                                         <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', margin: '0 0 1.5rem 0', fontWeight: 400, lineHeight: 1.4, flex: 1 }}>
                                             La Arquitectura y el Arte de Girar: El virtuoso bajista de Congreso y Fulano reflexiona sobre el bajo como cimiento.
                                         </p>
                                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                             <button className="btn-vls-action-light" style={{ background: '#3b82f6', color: 'white', padding: '0.6rem 1.5rem', fontSize: '0.8rem', border: 'none', borderRadius: '12px', fontWeight: '900' }}>VER SESIÃ“N</button>
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
                                         boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                                     }}
                                 >
                                     <div style={{ position: 'absolute', top: '-5%', right: '-5%', opacity: 0.1, zIndex: 0 }}>
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
                                             InvestigaciÃ³n: Los secretos de La Merced y la arquitectura de piedra caliza que define el alma de La Serena Colonial.
                                         </p>
                                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                             <button className="btn-vls-action-light" style={{ padding: '0.6rem 1.5rem', fontSize: '0.8rem', background: '#f59e0b', color: '#000', border: 'none', borderRadius: '12px', fontWeight: '900' }}>EXPLORAR RUTA</button>
                                             <span style={{ color: '#f59e0b', fontWeight: 'bold', fontSize: '0.7rem', letterSpacing: '1px' }}>VLS PATRIMONIAL</span>
                                         </div>
                                     </div>
                                 </div>
                             </div>


                    {/* NUEVA SECCION CAÂMARAS EN VIVO C5 */}
                    <div className="vls-perf-section" style={{ maxWidth: '1200px', margin: '3rem auto 0 auto', width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
                            <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.5))' }}></div>
                            <h3 style={{ color: '#10b981', margin: 0, fontSize: '1.3rem', letterSpacing: '2px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <div style={{ width: '12px', height: '12px', background: '#ef4444', borderRadius: '50%', animation: 'pulse 1.5s infinite', boxShadow: '0 0 10px #ef4444' }}></div>
                                CÃ¡maras C5 en Vivo (Faro & Radio La Serena)
                            </h3>
                            <div style={{ height: '1px', flex: 1, background: 'linear-gradient(-90deg, transparent, rgba(16,185,129,0.5))' }}></div>
                        </div>
                        <div className="glass-panel scale-in" style={{ background: 'rgba(0,0,0,0.6)', borderRadius: '24px', padding: '2rem', border: '1px solid rgba(16,185,129,0.3)', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
                            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '1.5rem', maxWidth: '850px', margin: '0 auto 1.5rem auto', fontSize: '1.1rem', lineHeight: '1.6' }}>
                                <strong>Centro de Comando, Control, CÃ³mputo, Comunicaciones y Contacto Ciudadano (C5):</strong> Infraestructura tecnolÃ³gica avanzada y neutral de seguridad pÃºblica, fundamental para la videovigilancia, coordinaciÃ³n de emergencias y contacto ciudadano en tiempo real para cualquier instituciÃ³n protectora.
                            </p>

                            <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 1024 ? '1fr' : '1fr 1.5fr', gap: '20px', minHeight: '500px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    {/* WINDOWED PLAYER 1 */}
                                    <div style={{ flex: 1, borderRadius: '15px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#000', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', position: 'relative' }}>
                                        <div style={{ background: '#1a1a1a', padding: '8px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <div style={{ display: 'flex', gap: '6px' }}>
                                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }}></div>
                                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }}></div>
                                            </div>
                                            <span style={{ fontSize: '0.65rem', color: '#888', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Polideportivo Las CompaÃ±Ã­as</span>
                                        </div>
                                        <div style={{ position: 'relative', height: 'calc(100% - 31px)' }}>
                                            {(!isMobile) ? (
                                            <video
                                                src="https://raw.githubusercontent.com/vecinoslaserenachile-cloud/juego-serenito/main/Serenito_Polideportivo_Las_Compa%c3%b1ias.mp4"
                                                autoPlay={!isMobile} loop muted playsInline
                                                onCanPlay={e => { if(!isMobile) e.target.play().catch(() => {}); }}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                            ) : (
                                                <div style={{ width: '100%', height: '100%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <div style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 900 }}>VIDEO EN PAUSA</div>
                                                </div>
                                            )}
                                            <div style={{ position: 'absolute', bottom: '8px', left: '12px', color: '#00D4FF', fontSize: '0.65rem', fontWeight: 'bold', textShadow: '0 2px 4px black', background: 'rgba(0,0,0,0.6)', padding: '2px 8px', borderRadius: '4px' }}>CAM-02 (C5)</div>
                                        </div>
                                    </div>

                                    {/* WINDOWED PLAYER 2 */}
                                    <div style={{ flex: 1, borderRadius: '15px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#000', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', position: 'relative' }}>
                                        <div style={{ background: '#1a1a1a', padding: '8px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <div style={{ display: 'flex', gap: '6px' }}>
                                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }}></div>
                                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }}></div>
                                            </div>
                                            <span style={{ fontSize: '0.65rem', color: '#888', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Centro HistÃ³rico</span>
                                        </div>
                                        <div style={{ position: 'relative', height: 'calc(100% - 31px)' }}>
                                            {(!isMobile) ? (
                                            <video
                                                src="https://raw.githubusercontent.com/vecinoslaserenachile-cloud/juego-serenito/main/Serenito_kiosco_suplementero.mp4"
                                                autoPlay={!isMobile} loop muted playsInline
                                                onCanPlay={e => { if(!isMobile) e.target.play().catch(() => {}); }}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                            ) : (
                                                <div style={{ width: '100%', height: '100%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <div style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 900 }}>VIDEO EN PAUSA</div>
                                                </div>
                                            )}
                                            <div style={{ position: 'absolute', bottom: '8px', left: '12px', color: '#00D4FF', fontSize: '0.65rem', fontWeight: 'bold', textShadow: '0 2px 4px black', background: 'rgba(0,0,0,0.6)', padding: '2px 8px', borderRadius: '4px' }}>CAM-03 (C5)</div>
                                        </div>
                                    </div>
                                </div>

                                {/* MAIN WINDOWED PLAYER */}
                                <div style={{ borderRadius: '15px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#000', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', position: 'relative' }}>
                                    <div style={{ background: '#1a1a1a', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56', boxShadow: '0 0 5px rgba(255,95,86,0.5)' }}></div>
                                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e', boxShadow: '0 0 5px rgba(255,189,46,0.5)' }}></div>
                                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f', boxShadow: '0 0 5px rgba(39,201,63,0.5)' }}></div>
                                        </div>
                                        <span style={{ fontSize: '0.75rem', color: '#aaa', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>C5: Serenito en Terreno - Vivo</span>
                                    </div>
                                    <div style={{ position: 'relative', height: 'calc(100% - 40px)' }}>
                                        {(!isMobile) ? (
                                        <video
                                            src="https://raw.githubusercontent.com/vecinoslaserenachile-cloud/juego-serenito/main/Serenito_paseo_Avenida_Francisco_de_Aguirre.mp4"
                                            autoPlay={!isMobile} loop muted playsInline
                                            onCanPlay={e => { if(!isMobile) e.target.play().catch(() => {}); }}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <div style={{ color: '#FFD700', fontSize: '0.9rem', fontWeight: 900 }}>SEAL ACTIVA - CLICK PARA VER</div>
                                            </div>
                                        )}
                                        <div style={{ position: 'absolute', bottom: '15px', left: '20px', color: '#FFD700', fontSize: '1rem', fontWeight: 'bold', textShadow: '0 2px 5px black', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.6)', padding: '5px 12px', borderRadius: '6px' }}>
                                            <div style={{ width: '12px', height: '12px', background: '#ef4444', borderRadius: '50%', animation: 'pulse 1s infinite' }}></div>
                                            <span style={{ letterSpacing: '1px' }}>VIVO: AV. FRANCISCO DE AGUIRRE</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <BitacoraC5 />

                            <div style={{ textAlign: 'center', marginTop: '3rem', padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#38bdf8', letterSpacing: '2px' }}>HECHO EN LA SERENA Â· v3.5 CRISTAL</span>
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
                {showSemanaSanta && <VLSNewsSemanaSanta onClose={() => setShowSemanaSanta(false)} />}
                {showBencinazo && <VLSNewsBencinazo onClose={() => setShowBencinazo(false)} />}
                {showAguasValle && <VLSNewsAguasValle onClose={() => setShowAguasValle(false)} />}
                {showChequia && <VLSNewsChequia onClose={() => setShowChequia(false)} />}
                {showIglesias && <VLSNewsIglesiasPiedra onClose={() => setShowIglesias(false)} />}
                {showNewsAvalancha && <VLSNewsAvalancha onClose={() => setShowNewsAvalancha(false)} />}
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
            
            {showFaroCentinel && (
                <Suspense fallback={<LoadingScreen />}>
                    <FaroCentinel onClose={() => setShowFaroCentinel(false)} />
                </Suspense>
            )}
            
            <AnimatePresence>
                {showDirectory && (
                    <VLSCommunityDirectory onClose={() => setShowDirectory(false)} />
                )}
            </AnimatePresence>
            {showTuerca && (
                <TuercaVecinos onClose={() => setShowTuerca(false)} />
            )}
            <AnimatePresence>
                {showTvIp && <VlsTvIp onClose={() => setShowTvIp(false)} />}
            </AnimatePresence>

            </div>

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
            <HechoEnChile dark={true} />
        </React.Fragment>
    );
}

