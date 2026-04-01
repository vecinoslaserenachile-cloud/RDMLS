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
    { url: 'https://vimeo.com/712520/embed', title: 'DOC: CALETA SAN PEDRO', platform: 'TVLS' },
    { url: '/serenito_security_guard_close_up_1773392164475.png', title: 'PROMO: Seguridad Ciudadana VLS', isPoster: true },
    { url: '/portada_vls_trivia.jpg', title: 'PROMO: VLSabes - ¡Juega & Gana!', isPoster: true },
    { url: '/kiosko_3d_la_serena.png', title: 'PROMO: Kiosko Inteligente VLS', isPoster: true },
    { url: '/vls_motors_spot_premium.png', title: 'PROMO: VLS Motors Eléctrico', isPoster: true }
];
import {
    Search, Mic, CloudSun, Radio, Sliders, Volume2,
    VolumeX, ChevronUp, ChevronDown, Activity,
    Newspaper, Info, Music, Zap, Move, Tv, Monitor, Lock,
    MessageSquare, SkipForward, SkipBack, Layers, Settings, Maximize, Minimize, ExternalLink, Globe, Wifi, Shield, TrendingUp, TrendingDown, History as HistoryIcon, Star, Play, Pause,
    Heart, Users, Briefcase, Landmark, BookOpen, Book, Map, Phone, AlertCircle, ShoppingCart, Award, Sparkles, CheckCircle2,
    ShieldCheck, Eye, Home as HomeIcon, Ruler, Camera, Dumbbell, Box, PenTool, User as UserIcon, LogOut, ChevronRight, ChevronLeft, X, Pin, MapPin, Database, Share2,
    Stethoscope, AlertTriangle, Image as ImageIcon, GraduationCap, Gavel, Brain, SmilePlus, Vote, Rocket, ListChecks, PartyPopper, ShoppingBag, Leaf, Droplets,
    Gamepad2, Palette, Watch, Tablet, Smartphone, ShieldAlert, Building, FileSignature, LayoutGrid, Scale, Languages, Radar, Fuel, Church, Skull
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { useTranslation } from '../context/LanguageContext';
import GoreDashboard from './GoreDashboard';
import MarketplaceVecinal from '../components/MarketplaceVecinal';
import BitacoraC5 from '../components/BitacoraC5';
import PolideportivoVecinal from '../components/PolideportivoVecinal';
import SportsDataStrip from '../components/SportsDataStrip';
import VecnityPay from '../components/VecnityPay';
import TuercaVecinos from '../components/TuercaVecinos';
import VeciCat from '../components/VeciCat';
import AlcaldesHistory3D from '../components/AlcaldesHistory3D';
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
const VLSNotesGallery = lazy(() => import('../components/VLSNotesGallery'));
import VLSRoadmap from '../components/VLSRoadmap';
import VLSManifesto from '../components/VLSManifesto';
import VLSTriviaMain from '../components/vls_trivia/VLSTriviaMain';
import SmartFloatingTV from '../components/SmartFloatingTV';
import ParliamentaryObservatory from '../components/ParliamentaryObservatory';
import LoadingScreen from '../components/LoadingScreen';
const MemorialHijosRegion = lazy(() => import('../components/MemorialHijosRegion'));
const DistancesMap = lazy(() => import('../components/DistancesMap'));
import QuickEmergencyBar from '../components/QuickEmergencyBar';
import EmergencyDirectory from '../components/EmergencyDirectory';


export default function HubDashboard() {
    // 1. Context & Routing
    const navigate = useNavigate();
    const { weather, isAuthorized, isGuest, isRegistered, currentUser } = useOutletContext();
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
            const parsed = saved ? JSON.parse(saved) : [];
            return Array.isArray(parsed) ? parsed.filter(id => id && typeof id === 'string') : [];
        } catch (e) {
            console.warn("VLS_HUB: Error restaurando pines, reseteando...", e);
            return [];
        }
    });
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [deviceType, setDeviceType] = useState('Escritorio');
    const [DeviceIcon, setDeviceIcon] = useState(() => Monitor);
    const [vlsStats, setVlsStats] = useState({ liveUsers: 14228, totalServed: 2453.44, growth: '+284%' });

    // UI State Toggles
    const [showOmnibox, setShowOmnibox] = useState(false);
    const [showPoll, setShowPoll] = useState(false);
    const [showMusicRanking, setShowMusicRanking] = useState(false);
    const [showDistancias, setShowDistancias] = useState(false);
    const [showRoadmap, setShowRoadmap] = useState(false);
    const [showManifesto, setShowManifesto] = useState(false);
    const [showPrecolombino, setShowPrecolombino] = useState(false);
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
    const [showSeguridadVecinal, setShowSeguridadVecinal] = useState(false);
    const [showRequestPortal, setShowRequestPortal] = useState(false);
    const [activeTutorial, setActiveTutorial] = useState(null);
    const [selectedNews, setSelectedNews] = useState(null);
    const [showVecnityPay, setShowVecnityPay] = useState(false);
    const [initialOrder, setInitialOrder] = useState(null);
    const [showBackofficeMovil, setShowBackofficeMovil] = useState(false);
    const [showAjedrez, setShowAjedrez] = useState(false);
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
            citizensTitle: "Smart Citizens", citizensSub: "Reports, Maps and Digital Radio",
            adminTitle: "Smart Administration", adminSub: "Internal Management, E-learning & Reports",
            eventsTitle: "Smart Events", eventsSub: "Precedence Monitor and Protocol",
            listeningTitle: "Smart Listening", listeningSub: "Sentinel Faro & Social Listening Network",
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
        setShowDirectory(false); setShowVLSNewsIan(false); setShowSeguridadVecinal(false);
        setShowRequestPortal(false); setShowBackofficeMovil(false); setShowAjedrez(false);
        setShowEstudio(false); setReportInitialCategory(null);
    };

    useEffect(() => {
        const handleStorage = () => { };
        handleStorage();
        window.addEventListener('storage', handleStorage);

        const handleDecision = () => { closeAllPopups(); setShowPoll(true); };
        const handleGalaxia = () => { closeAllPopups(); setShowGalaxia(true); };
        const handleRoadmap = () => { closeAllPopups(); setShowRoadmap(true); };
        const handleManifesto = () => { closeAllPopups(); setShowManifesto(true); };
        const handlePrecolombino = () => { closeAllPopups(); setShowPrecolombino(true); };
        const handleAmbient = () => { closeAllPopups(); setShowAmbientMode(true); };
        const handleDifusion = () => { closeAllPopups(); setShowCentralDifusion(true); };
        const handleFaroIA = () => { closeAllPopups(); setShowVirtualAssistant(true); };

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
        const handleAlcaldes = () => { closeAllPopups(); setShowAlcaldes(true); };
        const handleHubDirectory = () => { closeAllPopups(); setShowDirectory(true); };
        const handleSmartReport = (e) => { 
            closeAllPopups(); 
            setReportInitialCategory(e.detail?.category || null);
            setShowRequestPortal(true); 
        };
        const handleEstudio = () => { closeAllPopups(); setShowEstudio(true); };
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


        window.addEventListener('open-decision-vecinal', handleDecision);
        window.addEventListener('open-galaxia-disco', handleGalaxia);
        window.addEventListener('open-vls-roadmap', handleRoadmap);
        window.addEventListener('open-vls-manifesto', handleManifesto);
        window.addEventListener('open-precolombino', handlePrecolombino);
        window.addEventListener('open-ambient-mode', handleAmbient);
        window.addEventListener('open-central-difusion', handleDifusion);
        window.addEventListener('open-faro-ia', handleFaroIA);
        window.addEventListener('open-hub-directory', handleHubDirectory);

        window.addEventListener('open-vls-motors', handleMotors);
        window.addEventListener('open-orientacion-legal', handleLegal);
        window.addEventListener('open-serenamet-admin', handleMetAdmin);
        window.addEventListener('open-vlspeak', handleVLSpeak);
        window.addEventListener('open-safe-route', handleSafeRoute);
        window.addEventListener('open-social-vision', handleSocialVision);
        window.addEventListener('open-analytics', handleAnalytics);
        window.addEventListener('open-plaza-vecinal', handleAnalytics);
        window.addEventListener('open-smart-admin', handleSmartAdmin);
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
        const handleIan = () => { closeAllPopups(); setShowVLSNewsIan(true); };
        const handleSeguridad = () => { closeAllPopups(); setShowSeguridadVecinal(true); };

        window.addEventListener('open-vls-ian', handleIan);
        window.addEventListener('open-vls-seguridad', handleSeguridad);
        window.addEventListener('open-ajedrez-patrimonial', handleAjedrez);

        // URL Parameter Routing (Deep Linking)
        const urlParams = new URLSearchParams(window.location.search);
        const newsParam = urlParams.get('news');
        const noteParam = urlParams.get('note');

        if (newsParam) {
            switch(newsParam) {
                case 'investigacion': handleInvestigacion(); break;
                case 'semanasanta': handleSemanaSanta(); break;
                case 'bencinazo': handleBencinazo(); break;
                case 'sentinel': handleSentinelNote(); break;
                case 'aguasvalle': setShowAguasValle(true); break;
                case 'poduje': setShowPoduje(true); break;
                case 'ian': handleIan(); break;
                case 'seguridad': handleSeguridad(); break;
                default: break;
            }
        }

        const pageParam = urlParams.get('page');
        if (pageParam === 'seguridad') handleSeguridad();
        if (pageParam === 'ian') handleIan();


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

            window.removeEventListener('open-vls-motors', handleMotors);
            window.removeEventListener('open-orientacion-legal', handleLegal);
            window.removeEventListener('open-serenamet-admin', handleMetAdmin);
            window.removeEventListener('open-vlspeak', handleVLSpeak);
            window.removeEventListener('open-safe-route', handleSafeRoute);
            window.removeEventListener('open-social-vision', handleSocialVision);
            window.removeEventListener('open-analytics', handleAnalytics);
            window.removeEventListener('open-smart-admin', handleSmartAdmin);
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

        };
    }, []);

    useEffect(() => {
        const handleNews = () => {
            const stored = localStorage.getItem('laserena_official_news');
            if (stored) {
                try {
                    let parsed = JSON.parse(stored);
                    setOfficialNews(parsed.filter(n => n.state === 'Publicado').slice(0, 3));
                } catch (e) { }
            } else if (window.innerWidth > 1024) {
                setOfficialNews([
                    { title: "El Punto Ciego del Retail: Caso Ian", date: "01 de Abril, 2026", category: "VLS INVESTIGA", desc: "El impactante caso de negligencia que cambió la seguridad en supermercados.", iconStr: "ShieldAlert", color: "#ef4444", eventId: "open-vls-ian" },
                    { title: "Semana Santa 2026: Historia y Tradición", date: "26 de Marzo, 2026", category: "INVESTIGACIÓN ESPECIAL", desc: "Más allá de la fe: Un viaje por las tradiciones globales y chilenas.", iconStr: "Church", color: "#7c3aed", eventId: "open-vls-semanasanta" },
                    { title: "Centinel Faro: El Ojo Social Predictivo", date: "24 de Marzo, 2026", category: "INTELIGENCIA", desc: "Cómo la IA de VLS detecta crisis antes de que ocurran.", iconStr: "Brain", color: "#38bdf8", eventId: "open-vls-sentinel" }
                ]);
            }
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
        'vls-investigacion-2026'
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
            id: 'vls-ian', title: 'EL PUNTO CIEGO: Caso Ian', subtitle: 'Reportaje: La trampa de los 100 y el abismo del retail',
            icon: ShieldAlert, color: '#ef4444', isEvent: 'open-vls-ian', active: true, badge: 'VLS INVESTIGA'
        },
        {
            id: 'vls-seguridad', title: 'PORTAL SEGURIDAD VECINAL', subtitle: 'Consejos, Contactos de Emergencia y Red de Protección',
            icon: ShieldCheck, color: '#10b981', isEvent: 'open-vls-seguridad', active: true, badge: 'PRO VLS'
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
            id: 'plaza-vecinal', title: 'Plaza Vecinal AI', subtitle: 'Espacio de encuentro ciudadano moderado por IA.', icon: Users, color: '#ec4899', path: 'https://ais-dev-m2dndpdv73k2izyiea7mef-41245370989.us-east5.run.app', isExternal: true, active: true },
        {
            id: 'ajedrez-patrimonial', title: 'Ajedrez Patrimonial 3D', subtitle: 'Desafía tu mente en el casco histórico',
            icon: Gamepad2, color: '#fcd34d', isEvent: 'open-ajedrez-patrimonial', active: true, badge: 'SABERES'
        },
        {
            id: 'vls-trivia', title: isRDMLS ? 'Saberes: Gestión del Conocimiento' : 'VLSabes: Juegaprende', subtitle: isRDMLS ? 'Pilar #2: Saberes, Historia y Soberanía' : 'Pilar #2: Trivia Educativa y Soberanía Comunicacional',
            icon: Gamepad2, color: '#FFD700', path: '/vlsabes', active: true, badge: isRDMLS ? 'SABERES' : 'TRIVIA'
        },
        {
            id: 'vls-investigacion-2026', title: 'LA PARADOJA 2026 (Reportaje)', subtitle: '¿Por qué la educación apagó el supercomputador?',
            icon: BookOpen, color: '#ef4444', isEvent: 'open-vls-investigacion', active: true, badge: 'EXCLUSIVO'
        },
        {
            id: 'vls-pyme-builder', title: 'Comercio Local Smart (PYME)', subtitle: 'Sitio Web, Radio Local y Pasarela VLS para anunciantes y compraventas',
            icon: ShoppingBag, color: '#f59e0b', isEvent: 'open-smart-business', active: true, badge: 'ANUNCIANTES'
        },
        {
            id: 'vls-motors', title: 'VLS Motors', subtitle: 'Flota Smart Eléctrica y Catálogo Premium',
            icon: Zap, color: '#38bdf8', isEvent: 'open-vls-motors', active: true, badge: 'MOVILIDAD'
        },
        {
            id: 'legal', title: 'Orientación Legal BCN', subtitle: 'Asesoría certificada para vecinos y Portal Abogados',
            icon: Scale, color: '#d4af37', isEvent: 'open-orientacion-legal', active: true, badge: 'PRO VLS'
        },
        {
            id: 'serenamet-admin', title: 'Serena Met (Admin)', subtitle: 'Inyectora de Locución y Reporte Móvil Terreno',
            icon: ShieldCheck, color: '#38bdf8', isEvent: 'open-serenamet-admin', active: true, badge: 'STAFF SMART'
        },
        {
            id: 'vlspeak', title: 'VLSpeak', subtitle: 'Traductor Simultáneo Transversal (Creole/English)',
            icon: Languages, color: '#a78bfa', isEvent: 'open-vlspeak', active: true, badge: 'INCLUSIÓN'
        },
        {
            id: 'safe-route', title: 'Safe Route AI', subtitle: 'Rutas seguras basadas en telemetría real (Leds/GPS)',
            icon: ShieldAlert, color: '#10b981', isEvent: 'open-safe-route', active: true, badge: 'SEGURIDAD IA'
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
            id: 'smart-learning', title: 'Portal de Inducción VLS', subtitle: 'Pilar #2: Capacitación, Diplomas y Soberanía',
            icon: GraduationCap, color: '#fbbf24', path: '/induccion', active: isRDMLS, badge: 'INDUCCIÓN'
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
            icon: Eye, color: '#38bdf8', isEvent: 'open-vecinojos', active: true, badge: 'NUEVO'
        },
        {
            id: 'camaras-faro', title: 'Cámaras del Faro (C5)', subtitle: 'Monitoreo Urbano y Estado de las Playas',
            icon: Camera, color: '#38bdf8', isEvent: 'open-retro-tv', active: true, badge: 'EN VIVO'
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
            icon: Gamepad2, color: '#f97316', isEvent: 'open-retro-room', active: true
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
            id: 'roadmap', title: 'Roadmap VLS', subtitle: 'Hitos proyectados 2026',
            icon: HistoryIcon, color: '#06b6d4', isEvent: 'open-vls-roadmap', active: true, badge: 'ESTRATÉGICO'
        },
        {
            id: 'legacy-game', title: 'Salón Arcade Retro', subtitle: 'Desafía el Record y gana Papayas',
            icon: Gamepad2, color: '#ef4444', isEvent: 'open-game', active: true
        },
        {
            id: 'serenito-1945', title: 'Serenito 1945 Arcade', subtitle: 'Vuela, dispara y defiende nuestra ciudad',
            icon: Gamepad2, color: '#f43f5e', isExternal: true, path: '/minijuegos/serenito-1945/', active: true, badge: 'NUEVO'
        },
        {
            id: 'galaxia-disco', title: 'Galaxia Discoteque', subtitle: 'Burbuja, Sundance, BCool & Fiestas de Colegio',
            icon: PartyPopper, color: '#ec4899', isEvent: 'open-galaxia-disco', active: true, badge: 'RECUERDOS'
        },
        {
            id: 'vls-roadmap', title: 'Roadmap VLS 2026', subtitle: 'Inventario de Servicios y Visión Estratégica',
            icon: ListChecks, color: '#3b82f6', isEvent: 'open-vls-roadmap', active: true, badge: 'ESTATUS'
        },
        {
            id: 'pitch-inversionistas', title: 'Pitch Inversionistas (B2G)', subtitle: 'Modelo SaaS Municipal y Nube Cero Costo (Cloudflare D1/R2)',
            icon: Rocket, color: '#c084fc', isEvent: 'open-project-info', active: true, badge: 'Dossier 2030'
        },
        {
            id: 'lite-portal-access', title: 'Sección Liviana (Low-Data)', subtitle: 'Portal de Ahorro para Celulares y 3G',
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
        return !s.title.toLowerCase().includes('municipal') && !s.subtitle.toLowerCase().includes('institucional') && !s.badge?.includes('GOBIERNO');
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
        }
    ];

    const participacionCiudadana = [
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
            id: 'almanaque-2026', title: 'Vecinos del Mundo', subtitle: 'Embajadas, Consulados y Relaciones Internacionales Smart',
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
            id: 'alcaldes-history', title: 'Archivo Alcaldes Regionales', subtitle: 'Hemeroteca y Cronología de Liderazgo Comunal',
            icon: HistoryIcon, color: '#38bdf8', isEvent: 'open-alcaldes-history', active: false, badge: 'HISTORIAL'
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
            name: isRDMLS ? 'Smart Citizens (Atención Ciudadana)' : 'Smart Citizens (Vecinos & Turistas)',
            description: isRDMLS ? 'Portal georreferenciado para reportes vecinales y monitoreo urbano/ambiental.' : 'Registro digital de accesos, reportes para vecinos/visitantes y Radio Digital VLS.',
            icon: Users,
            color: '#ef4444',
            modules: ['vecinojos', 'camaras-faro', 'servicios-publicos', 'safe-route', 'serenamet-admin', 'ecumenico', 'laico', 'smart-salud', 'vls-roadmap', 'pitch-inversionistas', 'lite-portal-access', 'difundir-app', 'distances', 'vetcinos', 'alcaldes-history', 'vecicat']
        },
        {
            id: 'admin',
            name: isRDMLS ? 'Smart Administration (Gestión Interna)' : 'Escuelas y Oficios (Formación Ciudadana)',
            description: isRDMLS ? 'Portal de inducción E-learning y digitalización de informes (Honorarios) con firma digital.' : 'Portal de inducción E-learning, Escuelas de Música/Artes y diplomados vecinales.',
            icon: Briefcase,
            color: '#10b981',
            modules: ['smart-learning', 'smart-admin-internal', 'vls-trivia', 'legal', 'vls-pyme-builder', 'smart-architecture', 'smart-real-estate', 'vlspeak', 'escuela-musica', 'escuela-artes', 'laboratorio-criticas', 'tribunales']
        },
        {
            id: 'events',
            name: 'Smart Events (Protocolo & Agenda)',
            description: isRDMLS ? 'Gestión automatizada de eventos y Monitor de Precedencias en tiempo real.' : 'Agenda para turistas, eventos comunales y Monitor de Precedencias.',
            icon: PartyPopper,
            color: '#f59e0b',
            modules: ['protocolo', 'almanaque-2026', 'muralismo', 'decision-vecinal']
        },
        {
            id: 'listening',
            name: 'Smart Listening (Inteligencia & IA)',
            description: isRDMLS ? 'Centinel Faro, Social Listening y Radio Digital Municipal.' : 'Centinel Faro, Social Listening y Análisis de Redes mediante IA.',
            icon: Radio,
            color: '#38bdf8',
            modules: ['vecinos-analytics', 'sentinel-apex', 'social-vision', 'vls-investigacion-2026', 'central-difusion', 'plaza-vecinal', 'parlamento-regional']
        },
        {
            id: 'patrimonio',
            name: isRDMLS ? 'Digitalización Patrimonial & Multimedia' : 'Experiencias 3D, Juegos y Memoria Histórica',
            description: isRDMLS ? 'Recorridos digitales interactivos del Casco Histórico y archivos visuales.' : 'Disfruta con Serenito, juegos Retro, y archivos nostálgicos.',
            icon: Sparkles,
            color: '#c084fc',
            modules: ['historic-3d', 'busdeltiempo', 'tienda-poleras', 'kiosko-diarios', 'tornamesa-digital', 'memorial-hijos', 'memory-portal', 'gym-3d', 'retro-gamer-room', 'personal-stereo', 'faro-ia', 'legacy-game', 'serenito-1945', 'galaxia-disco', 'vls-precolombino', 'estudio-musical', 'vhs-tv', 'operacion-ls', 'stickers-portal', 'glosario-vls', 'ambient-mode', 'vls-motors', 'cdls-club', 'pincha']
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
        const locked = isRestrictedModule(app?.id);
        const isPinned = pinnedApps.includes(app?.id);

        return (
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
                    background: locked ? 'rgba(0,0,0,0.6)' : `linear-gradient(135deg, ${app?.color}15 0%, rgba(0,0,0,0.6) 100%)`,
                    borderRadius: '20px', position: 'relative', overflow: 'hidden', textAlign: 'left',
                    transition: 'border 0.3s, background 0.3s, transform 0.1s', // Smoother feel
                    filter: locked ? 'grayscale(1) opacity(0.6)' : 'none',
                    height: '100%',
                    touchAction: 'none',
                    cursor: locked ? 'not-allowed' : 'grab'
                }}
            >
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
    };
    const [impactMessages, setImpactMessages] = useState([
        { icon: Award, color: '#fbbf24', text: "[VLSABES]: ¿Cuánto sabes de tu comuna? Juega la trivia oficial y gana fichas para el portal." },
        { icon: Map, color: '#38bdf8', text: "[El Túnel del Tiempo]: Viaja al pasado de La Serena en 3D. Explora el centro histórico como era hace 100 años." },
        { icon: Box, color: '#c084fc', text: "[Render 3D]: Ya puedes visualizar tu indumentaria institucional en 3D antes de pedirla." },
        { icon: AlertCircle, color: '#ef4444', text: "[Smart Comuna]: Reporta baches, luminarias o basura con un solo click. Gestión directa con el municipio." },
        { icon: Radio, color: '#38bdf8', text: "[RDMLS]: La radio oficial de La Serena ya está en el aire. Escucha la programación institucional 24/7." },
        { icon: Heart, color: '#f472b6', text: "[VecinityPay]: Apoya el desarrollo local de este portal 100% Home-Made y obtén beneficios exclusivos." },
        { icon: Leaf, color: '#10b981', text: "[Turismo Sustentable]: Medios destacan a La Serena como capital pionera en integración de tecnología no invasiva con el patrimonio." }
    ]);

    const guardianes = [
        { id: 'serenito-guard', name: 'Serenito', role: 'Seguridad & Protección', model: '/models/Serenito_polera_blancacuerpo_entero.glb', bio: isRDMLS ? 'Experto en seguridad municipal y IA biométrica. El corazón del Portal RDMLS.' : 'Experto en seguridad vecinal y IA biométrica. El corazón de VecinoSmart.' },
        { id: 'tata-rojas', name: 'Tata Rojas', role: 'Gran Patriarca VLS', model: '/models/tata_rojas_3d.glb', bio: 'El sabio del Valle. Custodio de las tradiciones y la memoria histórica de nuestra región.' },
        { id: 'alpino-tech', name: 'Alpino 3D', role: 'Élite Tecnológica VLS', model: '/models/alpino3d.glb', bio: 'Experto en infraestructura crítica y sistemas inteligentes. El puente entre el cerro y la nube.' },
        { id: 'don-joako', name: 'Don Joako', role: 'Seguridad Patrimonial', model: '/models/Serenito_polera_blancacuerpo_entero.glb', bio: 'Guardián del casco histórico. Siempre vigilante con su gorro de honor y mirada profunda.' },
        { id: 'pampita-huertera', name: 'Pampita', role: 'Humizales & Parques', model: '/models/Serenito_polera_blancacuerpo_entero.glb', bio: 'Guardiana de flora y fauna regional. Sabiduría de la tierra y biodiversidad.' },
        { id: 'ancestro-bisabuelo', name: 'Ancestral Serenito (Bisabuelo)', role: 'Historia & Tradición', model: '/models/faro_3d_modelo.glb', bio: 'Guardián original de la ciudad con su farol de la verdad. Sabiduría de los fundadores.' }
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

    const CurrentMessage = impactMessages[msgIndex] || impactMessages[0];
    const CurrentIcon = CurrentMessage.icon;

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
                        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.3rem', borderRadius: '50%', border: `1px solid ${CurrentMessage.color}50` }}>
                            {CurrentIcon ? <CurrentIcon size={16} color={CurrentMessage.color} /> : <Sparkles size={16} color={CurrentMessage.color} />}
                        </div>
                        <span style={{ fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 10px #10b981', animation: 'pulse 2s infinite' }}></span>
                            {CurrentMessage.text}
                        </span>
                    </div>
                </div>

                <div style={{ padding: '2rem 1rem', width: '100%', maxWidth: '900px', display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
                    {/* 2. Radio Dial */}
                    <div style={{ width: '100%', position: 'relative', zIndex: 100 }}>
                        <RDMLSRadioDial />
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

                    {/* 4. Footer Institucional RDMLS */}
                    <footer style={{ 
                        marginTop: '2rem', padding: '2rem', textAlign: 'center', 
                        width: '100%', color: 'rgba(255,255,255,0.6)', fontSize: '1rem',
                        borderTop: '1px solid rgba(245,158,11,0.2)', fontWeight: '500', letterSpacing: '1px'
                    }}>
                        <p>www.rdmls.cl · IMLS COMUNICACIONES 2026</p>
                        <p style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '5px' }}>Ilustre Municipalidad de La Serena</p>
                    </footer>
                </div>
            </div>
        );
    }

    return (
        <>
            <style>{`
                .btn-vls-action-light { background: #38bdf8; color: #000; padding: 0.8rem 1.5rem; border: none; font-weight: 900; border-radius: 12px; cursor: pointer; transition: all 0.3s; }
                .btn-vls-action-yellow { background: #fbbf24; color: #000; padding: 0.8rem 1.5rem; border: none; font-weight: 900; border-radius: 12px; cursor: pointer; transition: all 0.3s; }
                .btn-vls-action-white { background: #fff; color: #ef4444; padding: 0.8rem 1.5rem; border: none; font-weight: 900; border-radius: 12px; cursor: pointer; transition: all 0.3s; }
                .btn-vls-action-light:hover, .btn-vls-action-yellow:hover, .btn-vls-action-white:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.3); }
            `}</style>
            <div className="page-container trencadis-guell" style={{ WebkitPaddingStart: 'env(safe-area-inset-left)', paddingTop: 'var(--nav-height, 60px)', paddingBottom: '160px', paddingLeft: '0', paddingRight: '0', maxWidth: '100%', overflowX: 'hidden', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

                {/* Huincha Superior Optimizada para no tapar contenido en móviles */}
                <div style={{
                    width: '100%',
                    background: 'linear-gradient(90deg, #1e1b4b 0%, #312e81 100%)',
                    borderBottom: '2px solid #ef4444',
                    padding: '0.4rem 1.5rem',
                    display: 'flex',
                    flexDirection: window.innerWidth < 1200 ? 'column' : 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    color: 'white',
                    fontSize: '0.85rem',
                    zIndex: 990, // LOWERED: Prevent bleeding over modals (like VecnityPay zIndex: 100001)
                    position: 'relative',
                    gap: '1.5rem',
                    minHeight: '65px',
                    overflowX: 'hidden'
                }}>
                    {/* Mensaje Informativo (Izquierda/Centro) */}
                    <div key={msgIndex} className="animate-slide-up" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        textAlign: 'left',
                        flex: 1,
                        minWidth: 0,
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

                    {/* Botones de Acción (Derecha) */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        flexShrink: 0,
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    }}>
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

                    {!isRDMLS && (
                        <div style={{
                            display: 'flex',
                            gap: '10px'
                        }}>
                            <button
                                onClick={() => window.dispatchEvent(new CustomEvent('open-vls-feed'))}
                                className="btn-glass animate-pulse-slow"
                                style={{
                                    background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                                    border: '1px solid rgba(255,255,255,0.3)',
                                    borderRadius: '50px',
                                    padding: '0.4rem 1rem',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '0.75rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    boxShadow: '0 0 15px rgba(236, 72, 153, 0.4)',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                <Zap size={14} /> {tHub.smartFeed || 'SMART FEED'}
                            </button>
                            <button
                                onClick={() => window.dispatchEvent(new CustomEvent('open-city-3d'))}
                                className="btn-glass animate-pulse-slow"
                                style={{
                                    background: 'linear-gradient(135deg, #ef4444 0%, #991b1b 100%)',
                                    border: '1px solid rgba(255,255,255,0.3)',
                                    borderRadius: '50px',
                                    padding: '0.4rem 1rem',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '0.75rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    boxShadow: '0 0 15px rgba(239, 68, 68, 0.4)',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                <Sparkles size={14} /> {tHub.city3d || 'CIUDAD 3D'}
                            </button>
                            <button
                                onClick={() => window.dispatchEvent(new CustomEvent('open-vls-seguridad'))}
                                className="btn-glass animate-pulse-slow"
                                style={{
                                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                                    border: '1px solid rgba(255,255,255,0.4)',
                                    borderRadius: '50px',
                                    padding: '0.4rem 1rem',
                                    color: 'white',
                                    fontWeight: '950',
                                    fontSize: '0.75rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    boxShadow: '0 0 20px rgba(239, 68, 68, 0.6)',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                <ShieldAlert size={14} /> SEGURIDAD VECINAL
                            </button>
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
                                fontSize: '0.75rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                boxShadow: '0 0 10px rgba(245, 158, 11, 0.2)',
                                cursor: 'pointer'
                            }}
                        >
                            <Skull size={14} /> QUIMBO SMART
                        </button>
                    )}
                    </div>
                </div>

                {/* ══════════════════════════════════════════════════════════ */}
                {/* BARRA DE REPORTES RÁPIDOS (Agua, Luz, Emergencias)        */}
                {/* ══════════════════════════════════════════════════════════ */}
                <QuickEmergencyBar />

                {/* ══════════════════════════════════════════════════════════ */}
                {/* HEADLINE: INVESTIGACIÓN ESPECIAL VLS (IAN) - HIGH VISIBILITY   */}
                {/* ══════════════════════════════════════════════════════════ */}
                {!isRDMLS && (
                    <div style={{ padding: '2rem 1.5rem 0', maxWidth: '1400px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
                        <div 
                            onClick={() => window.dispatchEvent(new CustomEvent('open-vls-ian'))}
                            className="glass-panel animate-pulse-slow" 
                            style={{ 
                                background: 'linear-gradient(135deg, #450a0a 0%, #1e1b4b 100%)',
                                padding: '1.5rem 2rem',
                                borderRadius: '24px',
                                border: '2px solid #ef4444',
                                display: 'flex',
                                flexDirection: window.innerWidth < 768 ? 'column' : 'row',
                                alignItems: 'center',
                                gap: '1.5rem',
                                cursor: 'pointer',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                                transition: 'all 0.3s',
                                borderLeft: '8px solid #ef4444'
                            }}
                        >
                            <div style={{ background: '#ef4444', padding: '15px', borderRadius: '18px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                <ShieldAlert size={32} />
                                {/* Serenito Badge */}
                                <img 
                                    src="/serenito_v3.png" 
                                    alt="Serenito Investigador" 
                                    style={{ 
                                        position: 'absolute', 
                                        bottom: '-10px', 
                                        right: '-10px', 
                                        width: '45px', 
                                        height: '45px', 
                                        filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.5))',
                                        zIndex: 2
                                    }} 
                                />
                            </div>
                            <div style={{ flex: 1, textAlign: window.innerWidth < 768 ? 'center' : 'left' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: window.innerWidth < 768 ? 'center' : 'flex-start', marginBottom: '0.4rem' }}>
                                    <span style={{ background: '#ef4444', color: 'white', padding: '2px 8px', borderRadius: '10px', fontSize: '0.65rem', fontWeight: '900', letterSpacing: '1px' }}>BREAKING NEWS</span>
                                    <span style={{ color: '#ef4444', fontWeight: '900', fontSize: '0.75rem', letterSpacing: '2px' }}>VLS SALA DE INTELIGENCIA</span>
                                </div>
                                <h2 style={{ color: 'white', margin: 0, fontSize: '1.4rem', fontWeight: '950', lineHeight: 1.2 }}>EL PUNTO CIEGO DEL RETAIL: INVESTIGACIÓN CASO IAN</h2>
                                <p style={{ color: '#94a3b8', margin: '4px 0 0 0', fontSize: '0.85rem', fontWeight: 'bold' }}>Un análisis profundo sobre seguridad, vulnerabilidad y soberanía vecinal.</p>
                            </div>
                            <button className="btn btn-primary" style={{ padding: '0.8rem 2rem', background: '#ef4444', border: 'none', borderRadius: '12px', fontWeight: '900' }}>
                                LEER INVESTIGACIÓN →
                            </button>
                        </div>
                    </div>
                )}

                {/* ══════════════════════════════════════════════════════════ */}
                {/* NODO MAESTRO: RED REGIONAL UNIFICADA - EL NUEVO CEREBRO     */}
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
                    <div style={{ position: 'absolute', inset: 0, opacity: 0.15, background: 'radial-gradient(circle at 50% 50%, #38bdf8 0%, transparent 60%)' }}></div>
                    <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem' }}>
                        <div style={{ background: '#38bdf8', padding: '10px 25px', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 0 30px rgba(56,189,248,0.3)' }}>
                            <Rocket size={20} color="white" />
                            <span style={{ color: 'white', fontWeight: '900', fontSize: '0.85rem', letterSpacing: '2px' }}>{isRDMLS ? 'PORTAL INSTITUCIONAL' : 'COMUNIDAD DIGITAL'}</span>
                        </div>
                        <h2 style={{ fontSize: 'clamp(1.8rem, 6vw, 3.2rem)', fontWeight: '900', margin: 0, color: 'white', letterSpacing: '-1.5px', lineHeight: '1.1' }}>
                            {isRDMLS ? 'BIENVENIDOS A LA RED ' : 'BIENVENIDO A '} <br/> <span style={{ color: '#38bdf8' }}>{isRDMLS ? 'MUNICIPAL RDMLS' : 'VECINOS LA SERENA'}</span>
                        </h2>
                        <p style={{ maxWidth: '900px', fontSize: '1.15rem', color: '#94a3b8', margin: '0.5rem 0', lineHeight: '1.6' }}>
                            {tHub.heroDescription}
                        </p>
                        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {!isRDMLS && (
                                <button className="btn-vls-action-blue" onClick={() => window.dispatchEvent(new CustomEvent('open-hub-directory'))} style={{ fontSize: '1rem', padding: '1rem 2rem', background: '#38bdf8', color: 'white', fontWeight: '900', border: 'none', borderRadius: '30px', cursor: 'pointer' }}>EXPLORAR SERVICIOS</button>
                            )}
                            {isRDMLS && (
                                <button className="btn-vls-action-light" onClick={() => navigate('/induccion')} style={{ fontSize: '1rem', padding: '1rem 2rem', background: '#38bdf8', color: 'white', fontWeight: '900', border: 'none', borderRadius: '30px', cursor: 'pointer' }}>CAPACITACIÓN MUNICIPAL</button>
                            )}
                        </div>
                    </div>
                </div>
                )}

                {/* ══════════════════════════════════════════════════ */}
                {/* BANNER DUAL: SMART JUEGAPRENDE + SERENITO 1945    */}
                {/* ══════════════════════════════════════════════════ */}
                {!isRDMLS && (
                <div style={{
                    width: '100%',
                    background: '#050d1a',
                    borderTop: '1px solid rgba(255,215,0,0.2)',
                    borderBottom: '2px solid rgba(255,215,0,0.4)',
                    padding: '0.75rem 1rem',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '0.75rem',
                    boxShadow: '0 4px 30px rgba(0,0,0,0.5)',
                }}>

                    {/* Tarjeta 1: SMART JUEGAPRENDE */}
                    <div
                        onClick={() => { window.dispatchEvent(new CustomEvent('open-vls-game')); }}
                        style={{
                            background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
                            border: '1px solid rgba(255,215,0,0.4)',
                            borderRadius: '16px',
                            padding: '0.9rem 1rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            position: 'relative',
                            overflow: 'hidden',
                            transition: 'all 0.25s ease',
                            boxShadow: '0 0 20px rgba(255,215,0,0.1)',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 30px rgba(255,215,0,0.35)'; e.currentTarget.style.borderColor = 'rgba(255,215,0,0.8)'; }}
                        onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 20px rgba(255,215,0,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,215,0,0.4)'; }}
                    >
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,215,0,0.05) 1px, transparent 1px)', backgroundSize: '15px 15px', pointerEvents: 'none' }} />
                        <div style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C00)', borderRadius: '50%', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(255,215,0,0.5)', flexShrink: 0, animation: 'pulse 2s infinite' }}>
                            <Award size={22} color="#0f172a" />
                        </div>
                        <div style={{ flex: 1, minWidth: 0, zIndex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                                <span style={{ fontSize: 'clamp(0.8rem, 2.5vw, 1.1rem)', fontWeight: '900', color: '#FFD700', textShadow: '0 0 12px rgba(255,215,0,0.6)', letterSpacing: '-0.3px', lineHeight: 1 }}>{isRDMLS ? 'SABERES REGIONALES' : 'SMART JUEGAPRENDE'}</span>
                                <span style={{ background: 'linear-gradient(90deg,#ef4444,#f97316)', color: 'white', fontSize: '0.55rem', fontWeight: '900', padding: '1px 6px', borderRadius: '20px', letterSpacing: '1px' }}>{isRDMLS ? 'INSTITUCIONAL' : 'NUEVO'}</span>
                            </div>
                            <p style={{ color: 'rgba(255,215,0,0.6)', fontSize: 'clamp(0.6rem, 1.5vw, 0.75rem)', margin: '2px 0 0 0', lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {isRDMLS ? 'Historia y Cultura de La Serena' : 'Trivia La Serena · Gana Fichas VLS'}
                            </p>
                        </div>
                        <div style={{ background: 'linear-gradient(135deg,#FFD700,#FF8C00)', color: '#0f172a', padding: '0.4rem 0.8rem', borderRadius: '50px', fontWeight: '900', fontSize: 'clamp(0.6rem,1.5vw,0.75rem)', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap', flexShrink: 0, zIndex: 1 }}>
                            <Gamepad2 size={14} /> JUGAR ▶
                        </div>
                    </div>

                    {/* Tarjeta 2: SERENITO 1945 */}
                    <div
                        onClick={() => window.open('/minijuegos/serenito-1945/', '_blank')}
                        style={{
                            background: 'linear-gradient(135deg, #1a0a00 0%, #0f172a 100%)',
                            border: '1px solid rgba(239,68,68,0.4)',
                            borderRadius: '16px',
                            padding: '0.9rem 1rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            position: 'relative',
                            overflow: 'hidden',
                            transition: 'all 0.25s ease',
                            boxShadow: '0 0 20px rgba(239,68,68,0.1)',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 30px rgba(239,68,68,0.35)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.8)'; }}
                        onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 20px rgba(239,68,68,0.1)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.4)'; }}
                    >
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(239,68,68,0.05) 1px, transparent 1px)', backgroundSize: '15px 15px', pointerEvents: 'none' }} />
                        <div style={{ background: 'linear-gradient(135deg, #ef4444, #991b1b)', borderRadius: '50%', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(239,68,68,0.5)', flexShrink: 0, animation: 'pulse 2s infinite' }}>
                            <Rocket size={22} color="white" />
                        </div>
                        <div style={{ flex: 1, minWidth: 0, zIndex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                                <span style={{ fontSize: 'clamp(0.8rem, 2.5vw, 1.1rem)', fontWeight: '900', color: '#f87171', textShadow: '0 0 12px rgba(239,68,68,0.6)', letterSpacing: '-0.3px', lineHeight: 1 }}>SERENITO 1945</span>
                                <span style={{ background: 'linear-gradient(90deg,#7c3aed,#4f46e5)', color: 'white', fontSize: '0.55rem', fontWeight: '900', padding: '1px 6px', borderRadius: '20px', letterSpacing: '1px' }}>ARCADE</span>
                            </div>
                            <p style={{ color: 'rgba(248,113,113,0.6)', fontSize: 'clamp(0.6rem, 1.5vw, 0.75rem)', margin: '2px 0 0 0', lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                Vuela, dispara y defiende La Serena
                            </p>
                        </div>
                    </div>

                    {/* Tarjeta 3: AJEDREZ PATRIMONIAL 3D */}
                    <div
                        onClick={() => window.dispatchEvent(new CustomEvent('open-ajedrez-patrimonial'))}
                        style={{
                            background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
                            border: '1px solid rgba(252,211,77,0.4)',
                            borderRadius: '16px',
                            padding: '0.9rem 1rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            position: 'relative',
                            overflow: 'hidden',
                            transition: 'all 0.25s ease',
                            boxShadow: '0 0 20px rgba(252,211,77,0.1)',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 30px rgba(252,211,77,0.35)'; e.currentTarget.style.borderColor = 'rgba(252,211,77,0.8)'; }}
                        onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 20px rgba(252,211,77,0.1)'; e.currentTarget.style.borderColor = 'rgba(252,211,77,0.4)'; }}
                    >
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(252,211,77,0.05) 1px, transparent 1px)', backgroundSize: '15px 15px', pointerEvents: 'none' }} />
                        <div style={{ background: 'linear-gradient(135deg, #fcd34d, #b45309)', borderRadius: '50%', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(252,211,77,0.5)', flexShrink: 0 }}>
                            <Gamepad2 size={22} color="#0f172a" />
                        </div>
                        <div style={{ flex: 1, minWidth: 0, zIndex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                                <span style={{ fontSize: 'clamp(0.8rem, 2.5vw, 1.1rem)', fontWeight: '900', color: '#fcd34d', textShadow: '0 0 12px rgba(252,211,77,0.6)', letterSpacing: '-0.3px', lineHeight: 1 }}>AJEDREZ 3D</span>
                                <span style={{ background: 'rgba(252,211,77,0.2)', color: '#fcd34d', fontSize: '0.55rem', fontWeight: '900', padding: '1px 6px', borderRadius: '20px', letterSpacing: '1px', border: '1px solid rgba(252,211,77,0.3)' }}>SANDBOX</span>
                            </div>
                            <p style={{ color: 'rgba(252,211,77,0.6)', fontSize: 'clamp(0.6rem, 1.5vw, 0.75rem)', margin: '2px 0 0 0', lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                Casco Histórico en Tres Dimensiones
                            </p>
                        </div>
                    </div>
                </div>
                )}


                <div style={{ padding: '0 1rem 2rem 1rem' }}>

                    <header className="page-header" style={{ marginBottom: '2.5rem', textAlign: 'center', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '1.5rem', justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: '900px', boxSizing: 'border-box' }}>
                            
                            {/* Radio Dial / Home Widget dinámico */}
                            <div style={{ width: '100%', position: 'relative', zIndex: 100001 }}>
                                {isVLS ? <RadioHomeWidget /> : <RDMLSRadioDial />}
                            </div>

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
                                            <div className="animate-float" style={{ position: 'relative', width: '120px', height: '120px' }}>
                                                {/* Faro en Líneas - Animación Premium */}
                                                <div style={{ position: 'absolute', inset: -15, zIndex: 0, opacity: 0.6 }}>
                                                    <svg viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                                                        <motion.path
                                                            d="M 46 25 L 54 25 L 56 100 L 44 100 Z"
                                                            stroke="var(--brand-primary)" strokeWidth="1.5" strokeLinecap="round"
                                                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                                                            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                                                        />
                                                        <motion.path
                                                            d="M 43 25 L 57 25 M 44 20 L 56 20 L 56 25 L 44 25 Z M 47 20 L 53 20 L 53 15 L 47 15 Z M 50 15 L 50 10"
                                                            stroke="var(--brand-primary)" strokeWidth="1.5"
                                                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                                                            transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", delay: 0.2 }}
                                                        />
                                                        <motion.circle 
                                                            cx="50" cy="18" r="10" fill="rgba(255,50,50,0.15)"
                                                            animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.4, 0.1] }}
                                                            transition={{ duration: 2.5, repeat: Infinity }}
                                                        />
                                                    </svg>
                                                </div>
                                                <div style={{ position: 'relative', zIndex: 1, width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--brand-primary)', boxShadow: '0 0 20px rgba(255,50,50,0.3)', background: 'rgba(0,0,0,0.5)', margin: '10px' }}>
                                                    <img src="/serenito_v3.png" alt="Serenito 3D" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                                                    {showDistancias && <DistancesMap onClose={() => setShowDistancias(false)} />}
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
                                            {greetings.map((g, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setGreetingIdx(idx)}
                                                    title={g.text}
                                                    style={{
                                                        background: greetingIdx === idx ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)',
                                                        border: greetingIdx === idx ? `1.5px solid ${g.color}` : '1.5px solid rgba(255,255,255,0.15)',
                                                        borderRadius: '50px',
                                                        padding: '4px 10px',
                                                        cursor: 'pointer',
                                                        fontSize: '1.1rem',
                                                        transition: 'all 0.25s ease',
                                                        boxShadow: greetingIdx === idx ? `0 0 10px ${g.color}50` : 'none',
                                                        transform: greetingIdx === idx ? 'scale(1.15)' : 'scale(1)'
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
                                {pinnedApps.map(id => {
                                    const app = allApps.find(a => a?.id === id);
                                    if (!app) return null;
                                    return (
                                        <div
                                            key={id}
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
                         
                         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '2rem', width: '100%', boxSizing: 'border-box' }}>
                            {/* VLS NEWS IAN - BREAKING INVESTIGACIÓN - FULL WIDTH ARRIBA DE SEMANA SANTA */}
                            <div
                                onClick={() => window.location.href = '/media/ian'}
                                className="glass-panel hover-lift animate-fade-in"
                                style={{
                                    gridColumn: '1 / -1',
                                    background: 'linear-gradient(135deg, #1a0000 0%, #3b0000 40%, #1e0a0a 100%)',
                                    padding: isMobile ? '1.2rem 1.5rem' : '1.8rem 2.5rem',
                                    borderRadius: '20px',
                                    cursor: 'pointer',
                                    border: '1px solid rgba(239,68,68,0.5)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    boxShadow: '0 10px 40px rgba(239,68,68,0.15)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: isMobile ? '1rem' : '2rem',
                                    flexWrap: isMobile ? 'wrap' : 'nowrap',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 15px 50px rgba(239,68,68,0.3)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.8)'; }}
                                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 10px 40px rgba(239,68,68,0.15)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.5)'; }}
                            >
                                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 0% 50%, rgba(239,68,68,0.12) 0%, transparent 60%)', pointerEvents: 'none' }} />
                                <div style={{ flexShrink: 0, background: 'linear-gradient(135deg, #ef4444, #7f1d1d)', padding: isMobile ? '0.8rem' : '1.2rem', borderRadius: '16px', boxShadow: '0 8px 20px rgba(239,68,68,0.4)' }}>
                                    <ShieldAlert size={isMobile ? 28 : 36} color="white" />
                                </div>
                                <div style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                                        <span style={{ background: '#ef4444', color: 'white', padding: '0.2rem 0.9rem', borderRadius: '50px', fontSize: '0.65rem', fontWeight: 900, letterSpacing: '2px' }}>VLS INVESTIGA</span>
                                        <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem' }}>01 de Abril, 2026</span>
                                        <span style={{ background: 'rgba(239,68,68,0.15)', color: '#fca5a5', padding: '0.15rem 0.6rem', borderRadius: '6px', fontSize: '0.65rem', fontWeight: 700, border: '1px solid rgba(239,68,68,0.3)' }}>EXCLUSIVO</span>
                                    </div>
                                    <h3 style={{ color: 'white', margin: '0 0 0.4rem', fontSize: isMobile ? '1.2rem' : '1.6rem', fontWeight: 900, lineHeight: 1.2, fontFamily: '"Outfit", sans-serif' }}>
                                        El Punto Ciego del Retail: <span style={{ color: '#fca5a5' }}>Caso Ian</span>
                                    </h3>
                                    <p style={{ color: 'rgba(255,255,255,0.65)', margin: 0, fontSize: isMobile ? '0.82rem' : '0.95rem', lineHeight: 1.5 }}>
                                        La trampa de los $100 y el abismo de la negligencia. Una investigación exclusiva que cambió la seguridad en los supermercados de Chile.
                                    </p>
                                </div>
                                <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                                    <div style={{ background: 'linear-gradient(135deg, #ef4444, #991b1b)', color: 'white', padding: '0.7rem 1.5rem', borderRadius: '50px', fontWeight: 900, fontSize: '0.85rem', whiteSpace: 'nowrap', boxShadow: '0 6px 15px rgba(239,68,68,0.4)' }}>
                                        LEER AHORA →
                                    </div>
                                    <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.7rem' }}>vecinoslaserena.cl/media/ian</span>
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
                                        <span style={{ color: '#a78bfa', fontWeight: 'bold', fontSize: '0.8rem' }}>ESPECIAL SEMANA SANTA 2026</span>
                                    </div>
                                    <h1 style={{ color: 'white', fontSize: isMobile ? '1.8rem' : '2.8rem', fontWeight: 950, lineHeight: 1.1, marginBottom: '1rem', fontFamily: '"Outfit", sans-serif' }}>
                                        Semana Santa 2026:<br/>
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

                            {/* SENTINEL PREDICTIVE REPORT */}
                            <div 
                                 onClick={() => setShowSentinelNote(true)}
                                 className="glass-panel gaudi-curves hover-lift animate-fade-in" 
                                 style={{ 
                                     background: 'linear-gradient(135deg, #020617 0%, #0f172a 100%)', 
                                     padding: isMobile ? '1.5rem' : '2.5rem', 
                                     borderRadius: '35px', 
                                     cursor: 'pointer',
                                     border: '1px solid rgba(56,189,248,0.4)',
                                     position: 'relative',
                                     overflow: 'hidden',
                                     display: 'flex',
                                     flexDirection: 'column',
                                     boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                                 }}
                            >
                                <div style={{ position: 'absolute', top: '-5%', right: '-5%', opacity: 0.08, zIndex: 0 }}>
                                    <Radar size={isMobile ? 150 : 220} color="#38bdf8" />
                                </div>
                                <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ background: '#38bdf8', color: '#000', padding: '0.4rem 1.2rem', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 900 }}>INTELIGENCIA IA</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '8px', color: '#38bdf8', opacity: 0.8 }}>
                                            <TrendingUp size={18} />
                                        </div>
                                    </div>
                                    <h2 style={{ color: 'white', fontSize: isMobile ? '1.5rem' : '1.8rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '1rem', fontFamily: '"Outfit", sans-serif' }}>CENTINEL FARO 2026</h2>
                                    <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', margin: '0 0 1.5rem 0', fontWeight: 400, lineHeight: 1.4, flex: 1 }}>
                                        Ojo Social Predictivo: El sistema que está detectando las crisis antes de que ocurran en la Serena mediante Social Listening.
                                    </p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                        <button className="btn-vls-action-light" style={{ padding: '0.6rem 1.5rem', fontSize: '0.8rem' }}>ANALIZAR DATOS</button>
                                        <span style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '0.7rem', letterSpacing: '1px' }}>RADAR ACTIVO</span>
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
                                    <h2 style={{ color: 'white', fontSize: isMobile ? '1.5rem' : '1.8rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '1rem', fontFamily: '"Outfit", sans-serif' }}>LA PARADOJA 2026</h2>
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


                         </div>
                    </div>
                    )}

                    {/* VOCES VECINALES & HEMEROTECA SECTION */}
                    {!isRDMLS && (
                    <div style={{ maxWidth: '1400px', margin: '6rem auto 4rem auto', width: '100%', padding: '0 2rem' }}>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '3rem' }}>
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
                         <VLSNotesGallery />
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
                                                .filter(app => app?.id && cat?.modules?.includes(app?.id))
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
                                    style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', border: `1px solid ${news?.color || '#333'}30`, background: `linear-gradient(135deg, ${news?.color || '#333'}15 0%, rgba(0,0,0,0.4) 100%)`, cursor: 'pointer' }}
                                >
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
                                            Leer Nota Completa <SkipForward size={14} style={{ marginLeft: 'auto' }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                            <button onClick={() => window.open('https://laserena.cl/noticias', '_blank')} className="btn-glass" style={{ fontSize: '0.9rem', padding: '0.5rem 1.5rem', borderRadius: '30px' }}>Ver Archivo de Noticias (laserena.cl) <Globe size={14} style={{ marginLeft: '5px' }} /></button>
                        </div>
                    </div>
                    )}

                    {/* Featured Business Spotlight - VLS MOTORS */}
                    {!isRDMLS && <VLSMotorsSpot />}

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
                            <SportsDataStrip />
                            
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

                    {/* SECCIÓN GUARDIANES DE LA REGIÓN (Upgrade a 3D Elite 2026) */}
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
                                            <img src={(char.model && char.model.includes('Serenito')) ? '/serenito_v3.png' : ((char.model && char.model.includes('tata')) ? '/avatars/tata_rojas_sticker.png' : char.img)} alt={char.name} style={{ width: '85%', height: '85%', objectFit: 'contain', filter: 'drop-shadow(0 0 15px rgba(56,189,248,0.4))' }} />
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
                    {!isRDMLS && (
                    <div style={{ maxWidth: '1200px', margin: '3rem auto 0 auto', width: '100%' }}>
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
                                        <video
                                            src="https://raw.githubusercontent.com/vecinoslaserenachile-cloud/juego-serenito/main/Serenito_Polideportivo_Las_Compa%c3%b1ias.mp4"
                                            autoPlay loop muted playsInline
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                        <div style={{ position: 'absolute', bottom: '8px', left: '12px', color: '#00D4FF', fontSize: '0.8rem', fontWeight: 'bold', textShadow: '0 2px 4px black', background: 'rgba(0,0,0,0.6)', padding: '2px 8px', borderRadius: '4px' }}>CAM-02 (C5)</div>
                                    </div>
                                    <div style={{ position: 'relative', flex: 1, borderRadius: '12px', overflow: 'hidden', border: '2px solid #C41230', background: '#000' }}>
                                        <video
                                            src="https://raw.githubusercontent.com/vecinoslaserenachile-cloud/juego-serenito/main/Serenito_kiosco_suplementero.mp4"
                                            autoPlay loop muted playsInline
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                        <div style={{ position: 'absolute', bottom: '8px', left: '12px', color: '#00D4FF', fontSize: '0.8rem', fontWeight: 'bold', textShadow: '0 2px 4px black', background: 'rgba(0,0,0,0.6)', padding: '2px 8px', borderRadius: '4px' }}>CAM-03 (C5)</div>
                                    </div>
                                </div>
                                <div style={{ flex: '2', position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '2px solid #C41230', background: '#000', minHeight: window.innerWidth < 768 ? '300px' : 'auto' }}>
                                    <video
                                        src="https://raw.githubusercontent.com/vecinoslaserenachile-cloud/juego-serenito/main/Serenito_paseo_Avenida_Francisco_de_Aguirre.mp4"
                                        autoPlay loop muted playsInline
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <div style={{ position: 'absolute', bottom: '15px', left: '20px', color: '#FFD700', fontSize: '1rem', fontWeight: 'bold', textShadow: '0 2px 5px black', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.6)', padding: '5px 12px', borderRadius: '6px' }}>
                                        <div style={{ width: '12px', height: '12px', background: '#ef4444', borderRadius: '50%', animation: 'pulse 1s infinite' }}></div>
                                        <span style={{ letterSpacing: '1px' }}>C5: SERENITO EN TERRENO</span>
                                    </div>
                                </div>
                            </div>

                            <BitacoraC5 />

                            <div style={{ textAlign: 'center', marginTop: '3rem', padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#38bdf8', letterSpacing: '2px' }}>HECHO EN LA SERENA · v3.2 CRISTAL</span>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            </div>

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
            </Suspense>
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

            {showAlcaldes && (
                <Suspense fallback={<div style={{ position: 'fixed', inset: 0, zIndex: 100091, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.8)' }}><LoadingScreen /></div>}>
                    <AlcaldesHistory3D onClose={() => setShowAlcaldes(false)} />
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
            
            {showVLSNewsIan && (
                <VLSNewsIan onClose={() => setShowVLSNewsIan(false)} />
            )}
            
            {showSeguridadVecinal && (
                <SeguridadVecinal onClose={() => setShowSeguridadVecinal(false)} />
            )}
            
            {showBackofficeMovil && (
                <BackofficeMovilVLS onClose={() => setShowBackofficeMovil(false)} />
            )}
            
            {showDirectory && (
                <EmergencyDirectory onClose={() => setShowDirectory(false)} />
            )}
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
        </>
    );
}
