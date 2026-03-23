import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { 
    Search, Mic, CloudSun, Radio, Sliders, Volume2, 
    VolumeX, ChevronUp, ChevronDown, Activity, 
    Newspaper, Info, Music, Zap, Move, Tv, Monitor, Lock,
    MessageSquare, SkipForward, SkipBack, Layers, Settings, Maximize, Minimize, ExternalLink, Globe, Wifi, Shield, TrendingUp, TrendingDown, Clock, Star, Play, Pause,
    Heart, Users, Briefcase, Landmark, BookOpen, Book, Map, Phone, AlertCircle, ShoppingCart, Award, Sparkles, CheckCircle2,
    ShieldCheck, Eye, Home as HomeIcon, Ruler, Camera, Dumbbell, Box, PenTool, User as UserIcon, LogOut, ChevronRight, ChevronLeft, X, Pin, MapPin, Search as SearchIcon, Database, Share2,
    Stethoscope, AlertTriangle, Image as ImageIcon, GraduationCap, Gavel, Brain, SmilePlus, Vote, Rocket, ListChecks, PartyPopper, ShoppingBag, Eye as EyeIcon, Leaf,
    Trophy, Gamepad2, Palette, Watch, Tablet, Smartphone, ShieldAlert, Building, History, FileSignature, LayoutGrid, Scale, Languages
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { useTranslation } from '../context/LanguageContext';
import GoreDashboard from './GoreDashboard';
import MarketplaceVecinal from '../components/MarketplaceVecinal';
import BitacoraC5 from '../components/BitacoraC5';
import PolideportivoVecinal from '../components/PolideportivoVecinal';
import TuercaVecinos from '../components/TuercaVecinos';
import AzuraCastSync from '../components/AzuraCastSync';
import VLSRequestPortal from '../components/VLSRequestPortal';
import PremiumClub from '../components/PremiumClub';
import GalaxiaDiscoteque from '../components/GalaxiaDiscoteque';
import VLSRoadmap from '../components/VLSRoadmap';
import VLSManifesto from '../components/VLSManifesto';
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
import VecinosAnalyticsApp from '../components/VecinosAnalyticsApp/VecinosAnalyticsApp.jsx';
import VLSMotorsSpot from '../components/VLSMotorsSpot';
import VecnityPay from '../components/VecnityPay';
import TiendaPoleras3D from '../components/TiendaPoleras3D';
import OrientacionLegal from '../components/OrientacionLegal';
import SerenaMetAdmin from '../components/SerenaMetAdmin';
import VLSpeakTranslator from '../components/VLSpeakTranslator';
import SafeRouteAI from '../components/SafeRouteAI';

export default function HubDashboard() {
    const navigate = useNavigate();
    const { lang, setLang, t: baseT } = useTranslation();
    
    const dict = {
        es: {
            title: "Hub de Comunicaciones y Ciudadanía Smart - Portal Unificado VLS",
            citizensTitle: "Smart Citizens", citizensSub: "Reportes, Mapas y Radio Digital",
            adminTitle: "Smart Administration", adminSub: "Gestión Interna, Diploma E-learning e Informes",
            newsAlert: "COMUNA SMART Informa: La Máxima Autoridad Comunal ha liderado una ronda de seguridad estratégica en terreno. Acción real por la tranquilidad de nuestros vecinos a través de vecinosmart.cl.",
            eventsTitle: "Smart Events", eventsSub: "Monitor de Precedencia y Protocolo",
            listeningTitle: "Smart Listening", listeningSub: "Centinel Faro y Red de Escucha Social",
            paseo3dTitle: "Paseo Histórico 3D", paseo3dSub: "Arquitectura Tradicional y Museos",
            busdeltiempoTitle: "El Bus del Tiempo", busdeltiempoSub: "Viajes de 1948 a la Smart City",
            gameTitle: "Gamer Portal 3D", gameSub: "Crea tu Serenito y Explora",
            qrText: "Acceso Móvil",
            distancesTitle: "Cuadro de Distancias VLS", distancesSub: "Trayectos sobre Mapa Región de Coquimbo",
            projectTitle: "Gestión de Proyectos", projectSub: "Avance Obra y Planificación Territorio",
            councilTitle: "Consejo Municipal", councilSub: "Actas, Acuerdos y Transmisiones en Vivo",
            cdlsTitle: "Club Deportes La Serena", cdlsSub: "Socio VLS - Seguimiento e Historia Granate",
            musicTitle: "Tornamesa Digital", musicSub: "Selección de Música Tradicional y Regional",
            retroTitle: "Retro TV Master", retroSub: "Canales Clásicos y Archivo Histórico",
            vhsTitle: "Cineteca VHS", vhsSub: "Videos de la Región y Documentales",
            memoryTitle: "Portal de la Memoria", memorySub: "Sube Recuerdos y Fotos del Pasado",
            sentinelTitle: "Centinel Faro IA", sentinelSub: "Monitoreo Avanzado de Redes y Seguridad",
            welcomePortales: "Bienvenido al portal unificado de Vecinos La Serena. Explora todas las herramientas ciudadanas a continuación."
        },
        en: { 
            title: "Smart Communications & Citizenship Hub - VLS Unified Portal",
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
            welcomePortales: "Welcome to the unified portal of Vecinos La Serena. Explore all citizen tools below."
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
            welcomePortales: "欢迎来到 La Serena 邻居统一门户。探索以下所有公民工具。"
        },
        arn: {
            title: "Hub de Comunicaciones y Ciudadanía Smart - Portal Unificado VLS",
            welcomePortales: "Küme akun portal unificado Vecinos La Serena mu. Inatunge kom pu küzaw ciudadanas fan."
        },
        ht: {
            title: "Hub de Comunicaciones y Ciudadanía Smart - Portal Unificado VLS",
            welcomePortales: "Byenveni nan pòtal inifye Vwazen La Serena. Eksplore tout zouti sitwayen yo anba a."
        },
        it: {
            title: "Hub di Comunicazione e Cittadinanza Smart - Portale Unificato VLS",
            welcomePortales: "Benvenuti nel portale unificato di Vecinos La Serena. Esplora tutti gli strumenti cittadini qui sotto."
        },
        fr: {
            title: "Smart Communications & Citizenship Hub - Portail Unifié VLS",
            welcomePortales: "Bienvenue sur le portail unifié de Vecinos La Serena. Explorez tous les outils citoyens ci-dessous."
        },
        pt: {
            title: "Hub de Comunicações e Cidadania Smart - Portal Unificado VLS",
            welcomePortales: "Bem-vindo ao portal unificado de Vecinos La Serena. Explore todas as ferramentas cidadãs abaixo."
        }
    };


    const curTenant = localStorage.getItem('smart_tenant') || 'laserena';
    // State missing from broken file
    const [showPremiumClub, setShowPremiumClub] = useState(false);
    const [greetingIdx, setGreetingIdx] = useState(0);

    const greetings = [
        { text: "¡HOLA, VECINO!", sub: "SOY SERENITO, TU GUÍA SMART CITY", color: "#ef4444", bg: "linear-gradient(135deg, #ef4444 0%, #1e3a8a 100%)", flag: "🇨🇱" },
        { text: "HELLO, NEIGHBOR!", sub: "I'M SERENITO, YOUR SMART CITY GUIDE", color: "#3b82f6", bg: "linear-gradient(135deg, #00247d 0%, #cf142b 100%)", flag: "🇬🇧🇺🇸" },
        { text: "OLÁ, VIZINHO!", sub: "SOU SERENITO, SEU GUIA SMART CITY", color: "#22c55e", bg: "linear-gradient(135deg, #009c3b 0%, #ffdf00 100%)", flag: "🇧🇷" },
        { text: "SALUT, VOISIN!", sub: "JE SUIS SERENITO, VOTRE GUIDE SMART CITY", color: "#ffffff", bg: "linear-gradient(135deg, #002395 0%, #ed2939 100%)", flag: "🇫🇷" },
        { text: "CIAO, VICINO!", sub: "SONO SERENITO, LA TUA GUIDA SMART CITY", color: "#10b981", bg: "linear-gradient(135deg, #009246 0%, #ce2b37 100%)", flag: "🇮🇹" },
        { text: "你好, 邻居!", sub: "我是小谢尔, 您的智慧城市指南 (SERENITO)", color: "#FFDE00", bg: "linear-gradient(135deg, #DE2910 0%, #FFDE00 100%)", flag: "🇨🇳" }
    ];

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
            es: "Reporte de Gestión: Se consolida la Soberanía Comunicacional bajo la visión de vecinoslaserena.cl. Hacia un ecosistema digital de élite.",
            en: "Management Report: Communicational Sovereignty is consolidated under the vision of An anonymous neighbor. Towards an elite digital ecosystem.",
            it: "Rapporto di Gestione: La Sovranità Comunicativa si consolida sotto la visione di Un vicino anonimo. Verso un ecosistema digitale d'élite.",
            fr: "Rapport de Gestion : La Souveraineté Communicationnelle est consolidée unter vision d'un voisin anonyme. Vers un écosystème numérique d'élite.",
            zh: "管理报告：通信主权在一匿名邻居的愿景下得到巩固。迈向精英级数字生态系统。",
            pt: "Relatório de Gestão: A Soberania Comunicacional consolida-se sob a visão de um vizinho anônimo. Rumo a um ecossistema digital de elite."
        }
    ];

    const [currentFlashIndex, setCurrentFlashIndex] = useState(0);

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
    const [showOmnibox, setShowOmnibox] = useState(false);
    const [showPoll, setShowPoll] = useState(false);
    const [showGalaxia, setShowGalaxia] = useState(false);
    const [showRoadmap, setShowRoadmap] = useState(false);
    const [showManifesto, setShowManifesto] = useState(false);
    const [showPrecolombino, setShowPrecolombino] = useState(false);
    const [showAmbientMode, setShowAmbientMode] = useState(false);
    const [showCentralDifusion, setShowCentralDifusion] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);
    const [isCaptchaSolved, setIsCaptchaSolved] = useState(false);
    const [showSmartAdminLocal, setShowSmartAdminLocal] = useState(false);
    const [showVirtualAssistant, setShowVirtualAssistant] = useState(false); // New state for virtual assistant
    const [showTiendaPoleras, setShowTiendaPoleras] = useState(false);
    const [showVLSMotors, setShowVLSMotors] = useState(false); // Estado para VLS Motors Spot
    const [showOrientacionLegal, setShowOrientacionLegal] = useState(false);
    const [showSerenaMetAdmin, setShowSerenaMetAdmin] = useState(false);
    const [showVLSpeak, setShowVLSpeak] = useState(false);
    const [showSafeRoute, setShowSafeRoute] = useState(false);
    const [showSocialVision, setShowSocialVision] = useState(false);
    const [showAnalyticsApp, setShowAnalyticsApp] = useState(false);
    const [activeTutorial, setActiveTutorial] = useState(null); // 'radar', 'vlspeak', 'safe-route'

    const [isVideoPlaying, setIsVideoPlaying] = useState(true);
    const [previewIndex, setPreviewIndex] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [videoSelected, setVideoSelected] = useState(false);
    
    // Lista de videos para el módulo flotante TVLS
    const TVLS_VIDEOS = [
        { id: 'b9LTH4muxR8', title: 'C5 FARO LIVE' },
        { id: 'jfKfPfyJRdk', title: 'TURISMO LA SERENA' },
        { id: '6S6vOa-D0Z0', title: 'PATRIMONIO VLS' }
    ];

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

    // const toggleMute = (e) => {
    //     e.stopPropagation();
    //     if (iframeRefActive.current && iframeRefActive.current.contentWindow) {
    //         iframeRefActive.current.contentWindow.postMessage(JSON.stringify({
    //             event: 'command',
    //             func: isMuted ? 'unMute' : 'mute',
    //             args: []
    //         }), '*');
    //     }
    //     setIsMuted(!isMuted);
    // };

    // const [isVideoPlaying, setIsVideoPlaying] = useState(true);

    // const togglePlay = (e) => {
    //     e.stopPropagation();
    //     if (iframeRefActive.current && iframeRefActive.current.contentWindow) {
    //         iframeRefActive.current.contentWindow.postMessage(JSON.stringify({
    //             event: 'command',
    //             func: isVideoPlaying ? 'pauseVideo' : 'playVideo',
    //             args: []
    //         }), '*');
    //     }
    //     setIsVideoPlaying(!isVideoPlaying);
    // };

    // const nextVideo = (e) => {
    //     e.stopPropagation();
    //     setPreviewIndex(prev => prev === 0 ? 1 : 0);
    // };

    useEffect(() => {
        if (videoSelected) return;
        const interval = setInterval(() => {
            setPreviewIndex(prev => prev === 0 ? 1 : 0);
        }, 8000);
        return () => clearInterval(interval);
    }, [videoSelected]);

    const [officialNews, setOfficialNews] = useState([]);

    useEffect(() => {
        const handleStorage = () => { };
        handleStorage();
        window.addEventListener('storage', handleStorage);

        const handleDecision = () => setShowPoll(true);
        const handleGalaxia = () => setShowGalaxia(true);
        const handleRoadmap = () => setShowRoadmap(true);
        const handleManifesto = () => setShowManifesto(true);
        const handlePrecolombino = () => setShowPrecolombino(true);
        const handleAmbient = () => setShowAmbientMode(true);
        const handleDifusion = () => setShowCentralDifusion(true);
        const handleFaroIA = () => setShowVirtualAssistant(true);
        const handleTienda = () => setShowTiendaPoleras(true);
        const handleMotors = () => setShowVLSMotors(true);
        const handleLegal = () => setShowOrientacionLegal(true);
        const handleMetAdmin = () => setShowSerenaMetAdmin(true);
        const handleVLSpeak = () => { setShowVLSpeak(true); setActiveTutorial('vlspeak'); };
        const handleSafeRoute = () => { setShowSafeRoute(true); setActiveTutorial('safe-route'); };
        const handleSocialVision = () => { setShowSocialVision(true); setActiveTutorial('radar'); };
        const handleAnalytics = () => setShowAnalyticsApp(true);

        window.addEventListener('open-decision-vecinal', handleDecision);
        window.addEventListener('open-galaxia-disco', handleGalaxia);
        window.addEventListener('open-vls-roadmap', handleRoadmap);
        window.addEventListener('open-vls-manifesto', handleManifesto);
        window.addEventListener('open-precolombino', handlePrecolombino);
        window.addEventListener('open-ambient-mode', handleAmbient);
        window.addEventListener('open-central-difusion', handleDifusion);
        window.addEventListener('open-faro-ia', handleFaroIA);
        window.addEventListener('open-tienda-poleras', handleTienda);
        window.addEventListener('open-vls-motors', handleMotors);
        window.addEventListener('open-orientacion-legal', handleLegal);
        window.addEventListener('open-serenamet-admin', handleMetAdmin);
        window.addEventListener('open-vlspeak', handleVLSpeak);
        window.addEventListener('open-safe-route', handleSafeRoute);
        window.addEventListener('open-social-vision', handleSocialVision);
        window.addEventListener('open-analytics', handleAnalytics);

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
            window.removeEventListener('open-tienda-poleras', handleTienda);
            window.removeEventListener('open-vls-motors', handleMotors);
            window.removeEventListener('open-orientacion-legal', handleLegal);
            window.removeEventListener('open-serenamet-admin', handleMetAdmin);
            window.removeEventListener('open-vlspeak', handleVLSpeak);
            window.removeEventListener('open-safe-route', handleSafeRoute);
            window.removeEventListener('open-social-vision', handleSocialVision);
            window.removeEventListener('open-analytics', handleAnalytics);
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
                    { title: "Campaña de Limpieza Histórica en Casco Central", date: "10 de Marzo, 2026", category: "Patrimonio", desc: "La Dirección de Aseo y Ornato despliega un operativo masivo para restaurar fachadas de monumentos y calles emblemáticas.", iconStr: "Building", color: "#f59e0b" },
                    { title: "Licitación para Nuevos CESFAM Inteligentes Aprobada", date: "09 de Marzo, 2026", category: "Salud Comunal", desc: "El concejo aprueba fondos extraordinarios para equipamiento de telemedicina en periféricos de la ciudad.", iconStr: "Stethoscope", color: "#10b981" },
                    { title: "Despliegue de Seguridad Preventiva Fin de Semana", date: "08 de Marzo, 2026", category: "Puerta Serena", desc: "Más de 40 inspectores y drones apoyarán el circuito gastronómico y borde costero para brindar seguridad integral.", iconStr: "ShieldAlert", color: "#38bdf8" }
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
            'Newspaper': BookOpen
        };
        const Res = iMap[iconStr] || BookOpen;
        // Blindaje para React 19: nos aseguramos de devolver algo que React pueda renderizar
        return Res;
    };

    const [currentTime, setCurrentTime] = useState(new Date());
    const [deviceType, setDeviceType] = useState('Escritorio');
    const [DeviceIcon, setDeviceIcon] = useState(() => Monitor);
    const [showRequestPortal, setShowRequestPortal] = useState(false);
    const [isMiniTV, setIsMiniTV] = useState(false);
    const [isFullscreenTV, setIsFullscreenTV] = useState(false);
    const [vlsStats, setVlsStats] = useState({ liveUsers: 14205, totalServed: 2450.4, growth: '+284%' });

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

    const [searchTerm, setSearchTerm] = useState("");
    const [viewMode, setViewMode] = useState('full'); // 'full' or 'personalized'
    const [pinnedApps, setPinnedApps] = useState(() => {
        const saved = localStorage.getItem('vls_pinned_apps');
        return saved ? JSON.parse(saved) : [];
    });

    const togglePin = (id) => {
        setPinnedApps(prev => {
            const next = prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id].slice(0, 5);
            localStorage.setItem('vls_pinned_apps', JSON.stringify(next));
            return next;
        });
    };
    const [deferredPrompt, setDeferredPrompt] = useState(null);

    const tenant = localStorage.getItem('smart_tenant');
    const customConfig = JSON.parse(localStorage.getItem('smart_custom_config') || '{}');

    const [brandOrg, setBrandOrg] = useState(() => {
        return tenant === 'custom' && customConfig.orgName ? customConfig.orgName : 'La Serena';
    });
    const [brandLogo, setBrandLogo] = useState(() => {
        return tenant === 'custom' ? (customConfig.logoUrl || '/escudo.png') : '/escudo.png';
    });

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
    const t = {
        ...baseT,
        ...rawDict,
        title: (rawDict.title || '').replace('La Serena', brandOrg),
        sentinelSub: (rawDict.sentinelSub || '').replace('La Serena', brandOrg),
        eventsTitle: (rawDict.eventsTitle || '').replace('La Serena', brandOrg),
        eventsSub: (rawDict.eventsSub || '').replace('La Serena', brandOrg),
        cdlsTitle: (rawDict.cdlsTitle || '').replace('La Serena', brandOrg),
        busdeltiempoTitle: (rawDict.busdeltiempoTitle || '').replace('La Serena', brandOrg)
    };

    const formatoFecha = currentTime.toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'short' });
    const formatoHora = currentTime.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const host = window.location.hostname.toLowerCase();
    const isVLS = !host.includes('rdmls') && !host.includes('radiovecino') && !host.includes('entrevecinas');

    const { weather, isAuthorized, isGuest, isRegistered } = useOutletContext();

    const RESIDENT_ALLOWED_IDS = [
        'vhs-tv', 'retro-tv', 'cine', 'debono', 'donradios',
        'escuela-musica', 'escuela-artes', 'tribunales',
        'ecumenico', 'laico', 'farito-browser', 'glosario-vls',
        'stickers-portal', 'difundir-app', 'legacy-vls', 'red-social'
    ];

    const isLockedForResident = (id) => {
        if (isAuthorized || isGuest) return false;
        if (isRegistered && !RESIDENT_ALLOWED_IDS.includes(id)) return true;
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
            id: 'vls-pyme-builder', title: 'Comercio Local Smart (PYME)', subtitle: 'Sitio Web, Radio Local y Pasarela VLS',
            icon: ShoppingBag, color: '#f59e0b', isEvent: 'open-smart-business', active: true, badge: 'EMPRESAS'
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
            id: 'servicios-publicos', title: 'Reporte Servicios Públicos', subtitle: 'Agua, Alcantarillado, Baches y Aseo',
            icon: AlertTriangle, color: '#ef4444', path: '/citizens', active: true, badge: 'RED 24/7'
        },
        {
            id: 'smart-salud', title: t.saludTitle || 'Smart Salud', subtitle: 'Atención Médica y Agendamiento Vecinal',
            icon: Stethoscope, color: '#10b981', path: '/smart-salud', active: true
        },
        {
            id: 'smart-real-estate', title: 'Corretaje Propiedades Smart', subtitle: 'Arriendos y Ventas con Trazabilidad VLS',
            icon: HomeIcon, color: '#f59e0b', path: '/propiedades', active: true, badge: 'CORRETAJE'
        },
        {
            id: 'smart-architecture', title: 'Arquitectura & Obras', subtitle: 'Diseño, Ampliaciones y Permisos Municipales',
            icon: Ruler, color: '#3b82f6', path: '/arquitectura', active: true, badge: 'DOM'
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
            id: 'memorial-hijos', title: t.memorialTitle || 'Altares de la Región', subtitle: 'Homenaje Póstumo Digital y Hologramas',
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
            icon: History, color: '#fcd34d', isEvent: 'open-personal-stereo', active: true
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
            id: 'vls-manifesto', title: 'Sobre el Proyecto', subtitle: 'Nuestra Visión, Tecnología y Metas VLS 2026',
            icon: Rocket, color: '#c084fc', isEvent: 'open-vls-manifesto', active: true, badge: 'MANIFIESTO'
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
            icon: Palette, color: '#f43f5e', path: '/eventos', active: true
        },
        {
            id: 'cdls-club', title: 'Club Deportes La Serena', subtitle: 'Beneficios Vecinales y Pasión Granate',
            icon: Trophy, color: '#dc2626', isEvent: 'open-cdls', active: true
        },
        {
            id: 'estudio-musical', title: 'Estudio Musical IA', subtitle: 'Crea Letras y Acordes con Inteligencia',
            icon: Music, color: '#a855f7', isEvent: 'open-music-studio', active: true
        },
        {
            id: 'vhs-tv', title: 'Videoclub VHS 90s', subtitle: 'Cine Nostálgico en Formato Clásico',
            icon: Tv, color: '#ef4444', isEvent: 'open-vhs-tv', active: true
        },
        {
            id: 'decision-vecinal', title: 'Decisión Vecinal', subtitle: 'Consultas Ciudadanas con Voto Digital',
            icon: Vote, color: '#d4af37', isEvent: 'open-decision-vecinal', active: true
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
        }
    ].filter(s => s.active && !s.title.toLowerCase().includes('municipal') && !s.subtitle.toLowerCase().includes('institucional') && !s.badge?.includes('GOBIERNO'));

    const internalTools = [
        {
            id: 'honorarios', title: 'Honorarios & Contrata', subtitle: 'Digitalización y Firma de Informes Mensuales',
            icon: FileSignature, color: '#10b981', path: '/honorarios', active: true, badge: 'INTERNO'
        },
        {
            id: 'protocolo', title: 'Monitor de Precedencias', subtitle: 'Gestión Protocolar y Eventos de Autoridad',
            icon: Users, color: '#f59e0b', path: '/protocolo', active: true, badge: 'INTERNO'
        }
    ];

    const participacionCiudadana = [
        {
            id: 'ecumenico', title: 'Portal Ecuménico y Espiritual', subtitle: 'Encuentro Interreligioso de Fe (Iglesias, Cultos y Templos)',
            icon: Heart, color: '#fcd34d', isEvent: 'open-ecumenical', active: true
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
        }
    ];

    const allApps = [...servicios, ...participacionCiudadana].filter(a => a.active || a.id === 'debono');
    const filteredApps = allApps.filter(app =>
        (app.title || '').toLowerCase().includes((searchTerm || '').toLowerCase()) ||
        (app.subtitle || '').toLowerCase().includes((searchTerm || '').toLowerCase())
    );

    const categories = [
        {
            id: 'citizens',
            name: 'Smart Citizens (Atención Ciudadana)',
            description: 'Registro digital de accesos, reportes vecinales y Radio Digital VLS.',
            icon: Users,
            color: '#ef4444',
            modules: ['citizens', 'listening', 'vecinos', 'auditoria-vecinal', 'parlamento-vecinal', 'ecumenico', 'laico', 'smart-salud', 'vecinojos', 'camaras-faro', 'glosario-vls', 'enfermeria-smart', 'identity-gate']
        },
        {
            id: 'admin',
            name: 'Smart Administration (Gestión Interna)',
            description: 'Portal de inducción E-learning y digitalización de informes vecinales.',
            icon: Briefcase,
            color: '#10b981',
            modules: ['admin', 'smart-admin', 'web-builder', 'escuela-musica', 'escuela-artes', 'almanaque-mundial', 'elearning', 'vls-crm-admin']
        },
        {
            id: 'events',
            name: 'Smart Events (Protocolo)',
            description: 'Gestión automatizada de eventos, Turnos y Monitor de Precedencias.',
            icon: PartyPopper,
            color: '#f59e0b',
            modules: ['events', 'qr-acc', 'distances', 'paseo3d', 'cdls-club', 'embajadas', 'protocolo', 'historic-3d', 'busdeltiempo']
        },
        {
            id: 'listening',
            name: 'Smart Listening (Inteligencia)',
            description: 'Centinel Faro, Social Listening y Análisis de Redes mediante IA.',
            icon: Radio,
            color: '#38bdf8',
            modules: ['debono', 'tornamesa-digital', 'radio-master', 'sentinel-mini', 'faro-ia', 'premium', 'sentinel-apex', 'social-vision', 'vecinos-analytics']
        }
    ];


    const displayApps = viewMode === 'personalized'
        ? allApps.filter(a => pinnedApps.includes(a.id))
        : filteredApps;

    const AppCard = ({ app }) => {
        const locked = isLockedForResident(app.id);
        const isPinned = pinnedApps.includes(app.id);
        
        return (
            <motion.div
                drag
                dragMomentum={false}
                dragElastic={0.1}
                dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                whileDrag={{ scale: 1.05, zIndex: 100, boxShadow: `0 20px 50px ${app.color}50` }}
                key={app.id}
                className={`glass-panel gaudi-curves scale-in ${locked ? 'locked-module' : ''}`}
                style={{
                    display: 'flex', flexDirection: 'column', padding: '1.5rem',
                    border: locked ? '1px solid rgba(255,50,50,0.2)' : `1px solid ${app.color}40`,
                    background: locked ? 'rgba(0,0,0,0.6)' : `linear-gradient(135deg, ${app.color}15 0%, rgba(0,0,0,0.6) 100%)`,
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
                        onClick={(e) => { e.stopPropagation(); togglePin(app.id); }}
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
                        if (app.id === 'premium') { setShowPremiumClub(true); return; }
                        if (app.id === 'galaxia-disco') { setShowGalaxia(true); return; }
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
        { icon: Sparkles, color: '#fcd34d', text: "[Faro IA - Social Listening]: Menciones positivas sobre limpieza y seguridad en Borde Costero y Avenida del Mar esta semana." },
        { icon: Zap, color: '#38bdf8', text: "[Aviso Bahía] Mar picado. Evite acercarse a las rocas en Punta de Teatinos y Arrayán Costero. En El Faro precaución por fuerte oleaje." },
        { icon: MessageSquare, color: '#38bdf8', text: "[Conversación Viral]: Vecinos comentan divertida anécdota del 'Primo Chago' (Chef en El Billete) sobre el puré con gusto a mariscos y los guantes de la jefa." },
        { icon: Landmark, color: '#38bdf8', text: "[Monitor Vecinal]: Aprobación comunitaria en despliegue de nuevos equipos Smart iluminando sectores periféricos." },
        { icon: Heart, color: '#ef4444', text: "[Pulso Ciudadano]: Redes sociales destacan recuperación de espacios públicos y erradicación de microbasurales." },
        { icon: Box, color: '#c084fc', text: "[Transparencia]: El nuevo sistema Home-Made es valorado positivamente por las juntas de vecinos locales." },
        { icon: Music, color: '#a855f7', text: "[Escuela de Música]: Alta convocatoria en el lanzamiento de la nueva 'Escuela de Música Vecinal'. ¡Vecinos ya están componiendo sus primeros hits!" },
        { icon: Leaf, color: '#10b981', text: "[Turismo Sustentable]: Medios destacan a La Serena como capital pionera en integración de tecnología no invasiva con el patrimonio." }
    ]);

    const guardianes = [
        { id: 'serenito-guard', name: 'Serenito', role: 'Seguridad & Protección', img: '/serenito_v3.png', bio: 'Experto en seguridad vecinal y IA biométrica. El corazón de VecinoSmart.' },
        { id: 'don-joako', name: 'Don Joako', role: 'Seguridad Patrimonial', img: '/avatars/don_joako_guardian.png', bio: 'Guardián del casco histórico. Siempre vigilante con su gorro de honor y mirada profunda.' },
        { id: 'pampita-huertera', name: 'Pampita', role: 'Humizales & Parques', img: '/pampita_v3.png', bio: 'Guardiana de flora y fauna regional. Sabiduría de la tierra y biodiversidad.' },
        { id: 'ancestro-bisabuelo', name: 'Ancestral Serenito (Bisabuelo)', role: 'Historia & Tradición', img: '/ancestral_serenito.png', bio: 'Guardián original de la ciudad con su farol de la verdad. Sabiduría de los fundadores.' },
        { id: 'farito-nav', name: 'Farito', role: 'Navegación & Guía', img: '/avatars/farito_navigator.png', bio: 'Asistente experto en geografía y clima regional. Navega el Borde Costero con el nuevo Tripo Engine Rigged.' },
        { id: 't-9a8e', name: 'Curador 3D Heritage', role: 'Arte Digital VLS', img: '/avatars/compita.png', bio: 'Maestro de la reconstrucción digital del patrimonio serenense (Tripo Engine).' }
    ];

    const [msgIndex, setMsgIndex] = useState(0);

    const [realtimeData, setRealtimeData] = useState({
        temp: '--',
        wind: '--',
        windDir: '--',
        pm25: '--',
        humidity: '--'
    });

    useEffect(() => {
        // Fetch real conditions unconditionally for the dashboard messages and omnibox
        fetch('https://api.open-meteo.com/v1/forecast?latitude=-29.9027&longitude=-71.2520&current=temperature_2m,wind_speed_10m,wind_direction_10m,relative_humidity_2m&timezone=America%2FSantiago')
            .then(res => res.json())
            .then(data => {
                if (data?.current) {
                    const temp = data.current.temperature_2m;
                    const wind = data.current.wind_speed_10m;
                    const hum = data.current.relative_humidity_2m;

                    const getWindDirection = (degree) => {
                        const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
                        return directions[Math.round(degree / 22.5) % 16];
                    };
                    const windDir = getWindDirection(data.current.wind_direction_10m);

                    fetch('https://air-quality-api.open-meteo.com/v1/air-quality?latitude=-29.9027&longitude=-71.2520&current=pm2_5')
                        .then(res => res.json())
                        .then(aqData => {
                            const pm25 = aqData?.current?.pm2_5 || '--';

                            setRealtimeData({
                                temp,
                                wind,
                                windDir,
                                pm25,
                                humidity: hum
                            });

                            setImpactMessages(prev => [
                                { icon: Globe, color: '#38bdf8', text: `[Meteorología SERENAMET]: Condiciones en vivo: ${temp}°C, Viento ${windDir} a ${wind} km/h, Humedad: ${hum}%.` },
                                { icon: Leaf, color: '#10b981', text: `[Monitoreo Ambiental]: Calidad del Aire PM2.5 = ${pm25} µg/m³. Valores seguros para actividades al aire libre validados por IA.` },
                                ...prev
                            ]);
                        });
                }
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setMsgIndex((prev) => (prev + 1) % impactMessages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [impactMessages.length]);

    const CurrentMessage = impactMessages[msgIndex] || impactMessages[0];
    const CurrentIcon = CurrentMessage.icon;

    const handleSearchSubmit = (term) => {
        const t = term.toLowerCase();
        if (t.includes('arrendar') || t.includes('arriendo') || t.includes('casa') || t.includes('propiedad') || t.includes('vender') || t.includes('comprar')) {
            navigate('/propiedades');
        } else if (t.includes('diseñar') || t.includes('arquitecto') || t.includes('construir') || t.includes('ampliación') || t.includes('obra')) {
            navigate('/arquitectura');
        } else if (t.includes('salud') || t.includes('médico') || t.includes('doctor')) {
            navigate('/smart-salud');
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
    if (curTenant === 'gore-coquimbo') return <GoreDashboard />;
    if (curTenant === 'vecino-portal-only') return <Navigate to="/vecinos" />;

    return (
        <>
        <div className="page-container trencadis-guell" style={{ WebkitPaddingStart: 'env(safe-area-inset-left)', paddingTop: 'calc(var(--nav-height, 60px) + 75px)', paddingBottom: '160px', paddingLeft: '0', paddingRight: '0', maxWidth: '100%', overflowX: 'hidden', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

            {/* Huincha Superior Optimizada para no tapar contenido en móviles */}
            <div style={{
                width: '100%',
                background: 'linear-gradient(90deg, #1e1b4b 0%, #312e81 100%)',
                borderBottom: '2px solid #ef4444',
                padding: '0.5rem 1rem',
                display: 'flex',
                flexDirection: window.innerWidth < 768 ? 'column' : 'row',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '0.85rem',
                zIndex: 1000,
                position: 'fixed',
                top: 'var(--nav-height, 56px)',
                left: 0,
                gap: '1rem',
                minHeight: '60px'
            }}>
                {/* Botón 3D Movido para no solapar mensajes activos */}
                <div style={{
                    position: window.innerWidth < 768 ? 'static' : 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: window.innerWidth < 768 ? 'none' : 'translateY(-50%)',
                    zIndex: 1001,
                    display: 'flex',
                    gap: '10px'
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
                        <Book size={14} /> {t.glosario || 'GLOSARIO'}
                    </button>
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
                        <Zap size={14} /> {t.smartFeed || 'SMART FEED'}
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
                        <Sparkles size={14} /> {t.city3d || 'CIUDAD 3D'}
                    </button>
                </div>

                <div key={msgIndex} className="animate-slide-up" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    textAlign: 'center',
                    maxWidth: window.innerWidth < 768 ? '100%' : '70%'
                }}>
                    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.3rem', borderRadius: '50%', flexShrink: 0, border: `1px solid ${CurrentMessage.color}50` }}>
                        {CurrentIcon ? <CurrentIcon size={16} color={CurrentMessage.color} /> : <Sparkles size={16} color={CurrentMessage.color} />}
                    </div>
                    <span style={{ lineHeight: '1.2', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem' }}>
                        <span style={{ width: '6px', height: '6px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 10px #10b981', flexShrink: 0, animation: 'pulse 2s infinite' }}></span>
                        {CurrentMessage.text}
                    </span>
                </div>
            </div>

            <div style={{ padding: '0 1rem 2rem 1rem' }}>

                <header className="page-header" style={{ marginBottom: '2.5rem', textAlign: 'center', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    {/* Nueva Identidad Visual: Integración de Logo VLS */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '1.5rem', justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: '900px', boxSizing: 'border-box' }}>
                        {!window.location.hostname.includes('vecinoslaserena.cl') && !window.location.hostname.includes('laserena.cl') && !window.location.hostname.includes('localhost') ? (
                            <>
                                <div className="neocolonial-frame" style={{ border: '2px solid #ef4444', padding: '2rem', background: 'rgba(0,0,0,0.8)', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    <img src="/vls_chile_map.jpg" alt="Vecinossmart Chile" style={{ maxHeight: '140px', maxWidth: '90%', height: 'auto', borderRadius: '12px', boxShadow: '0 0 20px rgba(255,255,255,0.2)' }} />
                                </div>
                                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    <img src="/vls_red_square.jpg" alt="VLS Logo" style={{ maxHeight: '80px', width: 'auto', borderRadius: '8px' }} />
                                    <img src="/vls_white_banner.jpg" alt="VLS Banner" style={{ maxHeight: '40px', width: 'auto', opacity: 0.9 }} />
                                </div>

                                <div className="picasso-fractal" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', width: '100%', maxWidth: '800px', marginBottom: '2rem', padding: '2rem', borderRadius: '20px' }}>
                                    <h2 className="serena-title-glow" style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', margin: '0', textAlign: 'center' }}>LA SERENA</h2>
                                    <h3 className="text-gradient" style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', margin: '0', fontWeight: 'bold' }}>{t.title}</h3>
                                    <p style={{ fontWeight: 'bold', margin: '0', fontSize: '1.1rem', color: '#d4af37', textTransform: 'uppercase', letterSpacing: '2px' }}>{t.subtitle}</p>
                                    <button
                                        className="btn btn-primary animate-pulse"
                                        style={{
                                            width: '100%', maxWidth: '400px', marginTop: '1.5rem', padding: '1rem',
                                            fontSize: '1.2rem', fontWeight: 'bold', borderRadius: '50px',
                                            background: 'linear-gradient(90deg, #d4af37, #f59e0b)',
                                            color: 'black', border: 'none',
                                            boxShadow: '0 10px 30px rgba(212, 175, 55, 0.5)'
                                        }}
                                        onClick={() => window.location.href = 'https://tramites.laserena.cl'}
                                    >
                                        <Globe size={24} style={{ marginRight: '10px' }} />
                                        Trámites Municipales
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', padding: '2rem 0', textAlign: 'center', width: '100%' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    <div className="animate-float" style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--brand-primary)', boxShadow: '0 0 20px rgba(255,50,50,0.3)', background: 'rgba(0,0,0,0.5)' }}>
                                        <img src="/avatars/serenito.png" alt="Serenito" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div style={{ textAlign: 'left', maxWidth: '400px' }}>
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={greetingIdx}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <h1 style={{
                                                    color: 'white',
                                                    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                                                    fontWeight: '950',
                                                    letterSpacing: '-2px',
                                                    margin: 0,
                                                    fontFamily: '"Outfit", sans-serif',
                                                    lineHeight: '1',
                                                    textShadow: '0 10px 20px rgba(0,0,0,0.5)'
                                                }}>
                                                    {greetings[greetingIdx].text.split(',')[0]}, 
                                                    <span style={{ 
                                                        color: greetings[greetingIdx].color,
                                                        background: greetings[greetingIdx].bg,
                                                        WebkitBackgroundClip: 'text',
                                                        WebkitTextFillColor: 'transparent',
                                                        padding: '0 5px'
                                                    }}>
                                                        {greetings[greetingIdx].text.split(',')[1]}
                                                    </span>
                                                </h1>
                                                <p style={{ color: greetings[greetingIdx].color, fontWeight: "bold", margin: "0.4rem 0", letterSpacing: "2px", textShadow: "0 2px 4px rgba(0,0,0,0.5)", textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <span style={{ fontSize: '1.2rem', filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.3))' }}>{greetings[greetingIdx].flag}</span>
                                                    {greetings[greetingIdx].sub}
                                                </p>
                                            </motion.div>
                                        </AnimatePresence>
                                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.6rem 1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ fontSize: '1.1rem' }}>{greetings[greetingIdx].flag}</span>
                                            {t.welcomePortales || 'Bienvenido al portal unificado de La Serena. Explora todas las herramientas ciudadanas a continuación.'}
                                        </div>

                                        {/* TRANSLATION TICKER FROM RADIO */}
                                        <div style={{ marginTop: '15px' }}>
                                            <style>{`
                                                .vls-hub-wincha-container {
                                                    width: 100%;
                                                    background: #ef4444;
                                                    color: white;
                                                    overflow: hidden;
                                                    white-space: nowrap;
                                                    border-radius: 12px 12px 0 0;
                                                    box-shadow: 0 4px 10px rgba(239, 68, 68, 0.3);
                                                    border: 1px solid rgba(255,255,255,0.2);
                                                    height: 32px;
                                                    display: flex;
                                                    align-items: center;
                                                    position: relative;
                                                }
                                                .vls-hub-wincha-text {
                                                    display: inline-block;
                                                    padding-left: 100%;
                                                    animation: vls-hub-marquee 40s linear infinite;
                                                    font-size: 0.85rem;
                                                    font-weight: 800;
                                                    text-transform: uppercase;
                                                    letter-spacing: 0.5px;
                                                }
                                                @keyframes vls-hub-marquee {
                                                    0% { transform: translate(0, 0); }
                                                    100% { transform: translate(-150%, 0); }
                                                }
                                            `}</style>
                                            <div className="vls-hub-wincha-container" style={{ marginBottom: '0' }}>
                                                <div className="vls-hub-wincha-text">
                                                    {newsFlashes[currentFlashIndex][lang] || newsFlashes[currentFlashIndex]['es']}
                                                </div>
                                            </div>
                                            <div style={{ 
                                                display: 'flex', gap: '6px', padding: '4px 8px', 
                                                background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(5px)',
                                                borderRadius: '0 0 12px 12px', width: '100%',
                                                justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)',
                                                borderTop: 'none', flexWrap: 'nowrap'
                                            }}>
                                                {[
                                                    { id: 'es', flag: '🇨🇱', label: 'CHI' },
                                                    { id: 'en', flag: '🇺🇸', label: 'USA' },
                                                    { id: 'it', flag: '🇮🇹', label: 'ITA' },
                                                    { id: 'fr', flag: '🇫🇷', label: 'FRA' },
                                                    { id: 'zh', flag: '🇨🇳', label: 'CHN' },
                                                    { id: 'pt', flag: '🇧🇷', label: 'BRA' }
                                                ].map(l => (
                                                    <button 
                                                        key={l.id} 
                                                        onClick={() => setLang(l.id)}
                                                        style={{
                                                            background: lang === l.id ? '#ef4444' : 'transparent',
                                                            border: '1px solid ' + (lang === l.id ? '#ef4444' : 'rgba(255,255,255,0.1)'),
                                                            cursor: 'pointer', padding: '2px 8px',
                                                            borderRadius: '6px', display: 'flex', alignItems: 'center',
                                                            gap: '4px', transition: 'all 0.3s'
                                                        }}
                                                    >
                                                        <span style={{ fontSize: '1rem' }}>{l.flag}</span>
                                                        <span style={{ fontSize: '0.65rem', color: 'white', fontWeight: 'bold' }}>{l.label}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

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
                                        style={{
                                            position: 'absolute',
                                            right: '1.2rem',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            color: '#94a3b8',
                                            padding: '0',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                        title="Búsqueda por voz"
                                    >
                                        <Mic size={20} />
                                    </button>
                                </div>

                                {/* VLS LIVE METRICS: SUCCESS CELEBRATION */}
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{ 
                                        display: 'flex', flexDirection: 'column', alignItems: 'center', 
                                        gap: '10px', marginTop: '20px', padding: '15px 30px',
                                        background: 'rgba(56, 189, 248, 0.03)', borderTop: '1px solid rgba(56, 189, 248, 0.1)',
                                        borderBottom: '1px solid rgba(56, 189, 248, 0.1)', minWidth: '100%'
                                    }}
                                >
                                    <span style={{ fontSize: '0.8rem', fontWeight: '950', color: '#38bdf8', letterSpacing: '2.5px', textTransform: 'uppercase' }}>
                                        VLS LIVE: {vlsStats.liveUsers} VECINOS ACTIVOS • {vlsStats.totalServed}GB SERVIDOS TODAY
                                    </span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(56, 189, 248, 0.1)', padding: '4px 12px', borderRadius: '20px' }}>
                                        <TrendingUp size={14} color="#38bdf8" />
                                        <span style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#38bdf8', letterSpacing: '2px' }}>
                                            CRECIMIENTO SOCIAL: {vlsStats.growth} VS SEMANA-1
                                        </span>
                                    </div>
                                </motion.div>

                                {/* GALERÍA DE LOS 4 PILARES (REGLA #2) */}
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                                    gap: '1.5rem',
                                    width: '100%',
                                    maxWidth: '1200px',
                                    marginTop: '0.5rem'
                                }}>
                                    {categories.map(pillar => (
                                        <div
                                            key={pillar.id}
                                            onClick={() => {
                                                setSearchTerm("");
                                                const element = document.getElementById(`cat-section-${pillar.id}`);
                                                if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                            }}
                                            className="glass-panel gaudi-curves hover-lift"
                                            style={{
                                                padding: '2rem',
                                                borderRadius: '32px',
                                                border: `1.5px solid ${pillar.color}50`,
                                                background: `linear-gradient(135deg, ${pillar.color}20 0%, rgba(15,23,42,0.9) 100%)`,
                                                cursor: 'pointer',
                                                textAlign: 'center',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                gap: '1.2rem',
                                                boxShadow: `0 20px 40px rgba(0,0,0,0.4)`
                                            }}
                                        >
                                            <div style={{
                                                background: pillar.color,
                                                padding: '1.2rem',
                                                borderRadius: '24px',
                                                color: pillar.id === 'citizens' ? 'black' : 'white',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: `0 10px 20px ${pillar.color}44`
                                            }}>
                                                <pillar.icon size={36} />
                                            </div>
                                            <div>
                                                <h4 style={{ color: 'white', margin: '0 0 0.5rem 0', fontSize: '1.3rem', fontWeight: '900', letterSpacing: '1px' }}>{t[`${pillar.id}Title`] || pillar.name}</h4>
                                                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>{t[`${pillar.id}Sub`] || pillar.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '12px', color: 'white', fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <Globe size={18} color="var(--brand-primary)" />
                            <select
                                value={lang}
                                onChange={(e) => setLang(e.target.value)}
                                style={{
                                    background: 'transparent',
                                    color: 'white',
                                    border: 'none',
                                    outline: 'none',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    fontFamily: lang === 'zh' ? '"Microsoft YaHei", "PingFang SC", sans-serif' : 'inherit'
                                }}>
                                <option value="es" style={{ color: '#000' }}>Español (ES)</option>
                                <option value="en" style={{ color: '#000' }}>English (EN)</option>
                                <option value="fr" style={{ color: '#000' }}>Français (FR)</option>
                                <option value="it" style={{ color: '#000' }}>Italiano (IT)</option>
                                <option value="pt" style={{ color: '#000' }}>Português (PT)</option>
                                <option value="zh" style={{ color: '#000' }}>中文 (ZH)</option>
                                <option value="ht" style={{ color: '#000' }}>Kreyòl (HT)</option>
                                <option value="arn" style={{ color: '#000' }}>Mapudungun (ARN)</option>
                            </select>
                        </div>

                        {lang !== 'es' && (
                            <button
                                onClick={() => alert("ComunaSmart: Estamos activando la traducción dinámica mediante Gemini para las secciones faltantes...")}
                                style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', border: '1px solid #10b981', padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}
                            >
                                âœ¨ AI Auto-Translate
                            </button>
                        )}

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '12px', color: 'var(--text-secondary)', fontSize: '0.85rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <DeviceIcon size={16} />
                            <span style={{ fontWeight: 'bold' }}>Modo {deviceType}</span>
                        </div>

                        <button
                            className="btn-glass"
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', transition: 'all 0.3s' }}
                            onClick={() => window.dispatchEvent(new CustomEvent('open-smart-share'))}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                        >
                            <QRCodeSVG value={window.location.hostname.includes('rdmls') ? "https://www.rdmls.cl" : "https://www.vecinoslaserena.cl"} size={35} level={"L"} />
                            <span style={{ fontSize: '0.8rem', color: 'white', fontWeight: 'bold' }}>{t.qrText}</span>
                        </button>

                        <SmartShare renderAsHiddenObserver={true} />

                        {/* Reloj en vivo */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{formatoFecha}</span>
                            <span style={{ fontSize: '1rem', color: 'white', fontWeight: 'bold', fontFamily: 'monospace' }}>{formatoHora}</span>
                        </div>

                        <button onClick={() => navigate('/serenamet')} className="btn-glass" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(56, 189, 248, 0.2)', padding: '0.5rem 1.2rem', borderRadius: '12px' }}>
                            <Map size={18} color="#38bdf8" />
                            <span style={{ fontSize: '0.85rem', color: 'white', fontWeight: 'bold' }}>SERENAMET</span>
                        </button>

                        <button onClick={() => navigate('/inversores')} className="btn-glass" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(245, 158, 11, 0.2)', padding: '0.5rem 1.2rem', borderRadius: '12px' }}>
                            <Zap size={18} color="#f59e0b" />
                            <span style={{ fontSize: '0.85rem', color: 'white', fontWeight: 'bold' }}>PITCH INVERSORES</span>
                        </button>

                        <button onClick={() => navigate('/sombreros')} className="btn-glass" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(167, 139, 250, 0.2)', padding: '0.5rem 1.2rem', borderRadius: '12px' }}>
                            <Star size={18} color="#a78bfa" />
                            <span style={{ fontSize: '0.85rem', color: 'white', fontWeight: 'bold' }}>LAB. IDEAS</span>
                        </button>
                    </div>
                </header>

                {/* Pinned Apps Bar (Los Elegidos) */}
                {pinnedApps.length > 0 && (
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
                                const app = allApps.find(a => a.id === id);
                                if (!app) return null;
                                return (
                                    <div 
                                        key={id}
                                        onClick={() => {
                                            if (app.id === 'premium') { setShowPremiumClub(true); return; }
                                            if (app.id === 'galaxia-disco') { setShowGalaxia(true); return; }
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
                                            overflow: 'hidden'
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

                <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '0 1rem' }}>
                    {/* ENCABEZADO DE BÚSQUEDA Y CATEGORÍAS */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem', width: '100%' }}>
                        <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
                            <Search size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                            <input
                                type="text"
                                placeholder="Buscar módulo, trámite o servicio..."
                                value={searchTerm}
                                onChange={(e) => { setSearchTerm(e.target.value); if (e.target.value) setViewMode('full'); }}
                                style={{ width: '100%', padding: '1rem 1rem 1rem 3.2rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '15px', color: 'white', fontSize: '1rem', outline: 'none' }}
                            />
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
                                {displayApps.map(app => <AppCard key={app.id} app={app} />)}
                            </div>
                        </div>
                    )}

                    {/* VISTA POR MOSAICOS (FULL) */}
                    {viewMode === 'full' && searchTerm === "" && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
                            {categories.map(cat => (
                                <div key={cat.id} id={`cat-section-${cat.id}`} style={{ scrollMarginTop: '100px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}>
                                        <h3 style={{ color: 'white', margin: 0, fontSize: '1.5rem', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: '900', fontFamily: '"Outfit", sans-serif' }}>
                                            {cat.name}
                                        </h3>
                                        <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, rgba(255,255,255,0.2), transparent)' }}></div>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                                        {allApps
                                            .filter(app => cat.modules.includes(app.id))
                                            .map(app => <AppCard key={app.id} app={app} />)
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div style={{ height: '6rem' }} />

                <div style={{ height: '5rem' }} />

                <div style={{ maxWidth: '1200px', margin: '4rem auto 0 auto', width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
                        <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, transparent, rgba(236, 72, 153, 0.5))' }}></div>
                        <h3 style={{ color: '#ec4899', margin: 0, fontSize: '1.3rem', letterSpacing: '2px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <ShieldAlert size={20} color="#ec4899" />
                            Noticias Oficiales (laserena.cl)
                        </h3>
                        <div style={{ height: '1px', flex: 1, background: 'linear-gradient(-90deg, transparent, rgba(236, 72, 153, 0.5))' }}></div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {officialNews.map((news, idx) => {
                            const IconCmp = getIconComponent(news.iconStr);
                            return (
                                <div key={idx} className="glass-panel gaudi-curves hover-lift" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', border: `1px solid ${news.color}30`, background: `linear-gradient(135deg, ${news.color}15 0%, rgba(0,0,0,0.4) 100%)`, cursor: 'pointer' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                        <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'black', background: news.color, padding: '0.2rem 0.6rem', borderRadius: '20px' }}>
                                            {news.category}
                                        </span>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{news.date}</span>
                                    </div>
                                    <h4 style={{ color: 'white', margin: '0 0 0.5rem 0', fontSize: '1.2rem', lineHeight: '1.4' }}>{news.title}</h4>
                                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: '1.5', margin: '0 0 1rem 0', flex: 1 }}>{news.desc}</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: news.color, fontSize: '0.9rem', fontWeight: 'bold', marginTop: 'auto' }}>
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

                {/* Featured Business Spotlight - VLS MOTORS */}
                <VLSMotorsSpot />

                <div style={{ maxWidth: '1200px', margin: '4rem auto 0 auto', width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
                        <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2))' }}></div>
                        <h3 style={{ color: 'white', margin: 0, fontSize: '1.3rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Catálogo de Servicios Smart</h3>
                        <div style={{ height: '1px', flex: 1, background: 'linear-gradient(-90deg, transparent, rgba(255,255,255,0.2))' }}></div>
                    </div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '1.2rem'
                    }}>
                        {servicios.map((srv) => {
                            const locked = isLockedForResident(srv.id);
                            return (
                                <button
                                    key={srv.id}
                                    className="glass-panel"
                                    onClick={() => {
                                        if (locked) {
                                            alert('Modulo Reservado: Este espacio requiere credenciales de Directorio / Admin para acceso total.');
                                            return;
                                        }
                                        if (srv.isEvent) {
                                            window.dispatchEvent(new CustomEvent(srv.isEvent));
                                        } else if (srv.isExternal) {
                                            window.open(srv.path, '_blank');
                                        } else if (window.innerWidth > 1024) {
                                            navigate(srv.path);
                                        }
                                    }}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.5rem',
                                        border: locked ? '1px solid rgba(255,50,50,0.2)' : '1px solid rgba(255, 255, 255, 0.1)',
                                        background: locked ? 'rgba(0,0,0,0.6)' : 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.4) 100%)',
                                        cursor: locked ? 'not-allowed' : 'pointer', transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                                        borderRadius: '16px', position: 'relative', overflow: 'hidden', textAlign: 'left',
                                        filter: locked ? 'grayscale(1) opacity(0.6)' : 'none'
                                    }}
                                >
                                    {locked && (
                                        <div style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '2px', padding: '1px 6px', borderRadius: '50px', fontSize: '0.6rem', fontWeight: 'bold' }}>
                                            <Lock size={8} /> ADMIN
                                        </div>
                                    )}
                                    <div style={{ background: locked ? '#1e293b' : `${srv.color}20`, padding: srv.customLogo ? '0.5rem' : '1rem', borderRadius: '12px', border: `1px solid ${locked ? 'rgba(255,255,255,0.1)' : `${srv.color}40`}`, flexShrink: 0, width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {srv.customLogo ? (
                                            <img src={srv.customLogo} alt={srv.title} style={{ width: '100%', height: '100%', objectFit: 'contain', filter: locked ? 'grayscale(1)' : `drop-shadow(0 0 5px ${srv.color})` }} />
                                        ) : (
                                            <srv.icon size={26} color={locked ? '#475569' : srv.color} />
                                        )}
                                    </div>
                                    <div style={{ zIndex: 1 }}>
                                        <span style={{ color: locked ? '#64748b' : 'white', fontWeight: 'bold', display: 'block', fontSize: '1.15rem', marginBottom: '0.3rem' }}>{srv.title}</span>
                                        <span style={{ color: locked ? '#475569' : 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.4', display: 'block' }}>{srv.subtitle}</span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* El render estático de VecinityPay fue eliminado para no bloquear el dashboard */}
                {/* HERRAMIENTAS INTERNAS (Sólo Autorizados o Portales Maestros) */}
                {(isAuthorized || !isVLS || host.includes('vecinosmart.cl')) && (
                    <div style={{ maxWidth: '1200px', margin: '4rem auto 0 auto', width: '100%', padding: '0 1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', gap: '1.5rem' }}>
                            <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.5))' }}></div>
                            <h3 className="text-gradient" style={{ margin: 0, fontSize: '1.6rem', letterSpacing: '4px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <Lock size={20} color="#38bdf8" /> Gestión Interna VLS
                            </h3>
                            <div style={{ height: '1px', flex: 1, background: 'linear-gradient(-90deg, transparent, rgba(56,189,248,0.5))' }}></div>
                        </div>
                {/* Main Content Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem', marginTop: '2.5rem' }}>
                            {internalTools.map(app => (
                                <AppCard key={app.id} app={app} />
                            ))}
                        </div>
                    </div>
                )}
                {/* MONITOREO NAVIERO EN TIEMPO REAL */}
                <NavieraMonitor />

                {/* RANKING MUSICAL SERENENSE */}
                <MusicRanking />

                {/* POLIDEPORTIVO VECINAL - Ligas, ATP, etc. */}
                <PolideportivoVecinal />

                {/* TUERCA VECINOS - Mecánica y protocolos */}
                <TuercaVecinos />

                {/* SECCIÓN GUARDIANES DE LA REGIÓN (Personajes 3D) */}
                <div style={{ maxWidth: '1200px', margin: '4rem auto 0 auto', width: '100%', padding: '0 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', gap: '1.5rem' }}>
                        <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.5))' }}></div>
                        <h3 className="text-gradient" style={{ margin: 0, fontSize: '1.8rem', letterSpacing: '4px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Sparkles size={24} color="#38bdf8" /> Guardianes de la Región
                        </h3>
                        <div style={{ height: '1px', flex: 1, background: 'linear-gradient(-90deg, transparent, rgba(56,189,248,0.5))' }}></div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {guardianes.map((char) => (
                            <div key={char.id} className="glass-panel gaudi-curves hover-scale" style={{ padding: '1.5rem', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)', background: 'linear-gradient(180deg, rgba(30,41,59,0.5) 0%, rgba(15,23,42,0.8) 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', transform: 'scale(0.92)' }}>
                                <div style={{ position: 'relative', width: '130px', height: '130px', borderRadius: '50%', overflow: 'hidden', border: '3px solid rgba(56,189,248,0.3)', background: 'rgba(0,0,0,0.5)', boxShadow: '0 0 20px rgba(56,189,248,0.2)' }}>
                                    <img src={char.img} alt={char.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div style={{ transform: 'scale(0.95)' }}>
                                    <h4 style={{ color: '#d4af37', margin: '0 0 0.2rem 0', fontSize: '1.2rem', letterSpacing: '1px' }}>{char.name.toUpperCase()}</h4>
                                    <span style={{ display: 'block', fontSize: '0.75rem', color: '#38bdf8', fontWeight: 'bold', marginBottom: '0.8rem', padding: '2px 8px', background: 'rgba(56,189,248,0.1)', borderRadius: '10px' }}>{char.role}</span>
                                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.4', fontStyle: 'italic' }}>"{char.bio}"</p>
                                </div>
                                <button onClick={() => setShowVirtualAssistant(true)} className="btn-glass" style={{ width: '100%', padding: '0.5rem', borderRadius: '10px', fontSize: '0.8rem', color: 'white', marginTop: 'auto' }}>Hablar con {char.name}</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* NUEVA SECCIÓN CÁMARAS EN VIVO C5 */}
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
                                    <div style={{ width: '400%', height: '400%', position: 'absolute', top: '-180%', left: '-100%' }}>
                                        <iframe src="https://www.youtube.com/embed/b9LTH4muxR8?autoplay=1&mute=1&controls=0&modestbranding=1&showinfo=0&rel=0&loop=1&playlist=b9LTH4muxR8&vq=hd1080" frameBorder="0" style={{ width: '100%', height: '140%', position: 'absolute', top: '-20%', left: 0, pointerEvents: 'none' }} allow="autoplay; encrypted-media"></iframe>
                                    </div>
                                    <div style={{ position: 'absolute', bottom: '8px', left: '12px', color: '#00D4FF', fontSize: '0.8rem', fontWeight: 'bold', textShadow: '0 2px 4px black', background: 'rgba(0,0,0,0.6)', padding: '2px 8px', borderRadius: '4px' }}>CAM-02 (ZOOM 34x)</div>
                                </div>
                                <div style={{ position: 'relative', flex: 1, borderRadius: '12px', overflow: 'hidden', border: '2px solid #C41230', background: '#000' }}>
                                    <div style={{ width: '350%', height: '350%', position: 'absolute', top: '-80%', left: '-40%' }}>
                                        <iframe src="https://www.youtube.com/embed/b9LTH4muxR8?autoplay=1&mute=1&controls=0&modestbranding=1&showinfo=0&rel=0&loop=1&playlist=b9LTH4muxR8&vq=hd1080" frameBorder="0" style={{ width: '100%', height: '140%', position: 'absolute', top: '-20%', left: 0, pointerEvents: 'none' }} allow="autoplay; encrypted-media"></iframe>
                                    </div>
                                    <div style={{ position: 'absolute', bottom: '8px', left: '12px', color: '#00D4FF', fontSize: '0.8rem', fontWeight: 'bold', textShadow: '0 2px 4px black', background: 'rgba(0,0,0,0.6)', padding: '2px 8px', borderRadius: '4px' }}>CAM-03 (WIDE ANGLE)</div>
                                </div>
                            </div>
                            <div style={{ flex: '2', position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '2px solid #C41230', background: '#000', minHeight: window.innerWidth < 768 ? '300px' : 'auto' }}>
                                <iframe src="https://www.youtube.com/embed/b9LTH4muxR8?autoplay=1&mute=1&controls=0&modestbranding=1&showinfo=0&rel=0&loop=1&playlist=b9LTH4muxR8&vq=hd1080" frameBorder="0" style={{ width: '100%', height: '140%', position: 'absolute', top: '-20%', left: 0, pointerEvents: 'none' }} allow="autoplay; encrypted-media"></iframe>
                                <div style={{ position: 'absolute', bottom: '15px', left: '20px', color: '#FFD700', fontSize: '1rem', fontWeight: 'bold', textShadow: '0 2px 5px black', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.6)', padding: '5px 12px', borderRadius: '6px' }}>
                                    <div style={{ width: '12px', height: '12px', background: '#ef4444', borderRadius: '50%', animation: 'pulse 1s infinite' }}></div>
                                    <span style={{ letterSpacing: '1px' }}>C5: FARO M. EN VIVO</span>
                                </div>
                            </div>
                        </div>

                        <BitacoraC5 />

                                {isVideoPlaying && (
                <AnimatePresence>
                    {/* ─── TVLS SMART PLAYER ─── */}
                    {isFullscreenTV && (
                        // BACKDROP dim overlay
                        <motion.div
                            key="tvls-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsFullscreenTV(false)}
                            style={{
                                position: 'fixed', inset: 0, zIndex: 9998,
                                background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)'
                            }}
                        />
                    )}
                    <motion.div
                        key="tvls-player"
                        drag={!isFullscreenTV}
                        dragMomentum={false}
                        dragElastic={0.1}
                        dragConstraints={{ left: -1000, right: 1000, top: -1000, bottom: 1000 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isFullscreenTV ? {
                            opacity: 1, scale: 1,
                            width: '100vw', height: '100vh'
                        } : {
                            opacity: 1, scale: 1,
                            width: window.innerWidth < 768 ? (isMiniTV ? '60px' : '160px') : (isMiniTV ? '80px' : '280px'),
                            height: window.innerWidth < 768 ? (isMiniTV ? '60px' : '90px') : (isMiniTV ? '60px' : '158px')
                        }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        whileHover={!isFullscreenTV ? { scale: 1.02 } : {}}
                        style={isFullscreenTV ? {
                            position: 'fixed', inset: 0,
                            zIndex: 9999,
                            borderRadius: 0,
                            background: '#000',
                            overflow: 'hidden',
                            pointerEvents: 'auto'
                        } : {
                            position: 'fixed',
                            bottom: window.innerWidth < 768 ? '140px' : '100px',
                            right: '25px',
                            width: window.innerWidth < 768 ? '160px' : '280px',
                            height: window.innerWidth < 768 ? '90px' : '158px',
                            zIndex: 10000,
                            borderRadius: '16px',
                            overflow: 'hidden',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 20px rgba(239, 68, 68, 0.2)',
                            border: '2px solid rgba(255,255,255,0.1)',
                            background: '#000',
                            pointerEvents: 'auto'
                        }}
                    >
                        {/* gradient overlay bottom */}
                        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%)', zIndex: 1 }}></div>

                        {/* ─── CONTROL BAR (always visible) ─── */}
                        <div style={{
                            position: 'absolute', top: isFullscreenTV ? '16px' : '6px',
                            right: isFullscreenTV ? '16px' : '6px',
                            zIndex: 10, display: 'flex', gap: isFullscreenTV ? '8px' : '4px',
                            background: 'rgba(0,0,0,0.65)', borderRadius: '20px',
                            padding: isFullscreenTV ? '6px 10px' : '3px 5px',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.15)'
                        }}>
                            {/* MINIMIZAR */}
                            {!isFullscreenTV && (
                                <button
                                    onClick={() => { setIsMiniTV(!isMiniTV); setIsFullscreenTV(false); }}
                                    title={isMiniTV ? 'Expandir' : 'Minimizar'}
                                    style={{ padding: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: isFullscreenTV ? '32px' : '22px', height: isFullscreenTV ? '32px' : '22px' }}
                                >
                                    {isMiniTV ? <Maximize size={isFullscreenTV ? 16 : 11} /> : <Minimize size={isFullscreenTV ? 16 : 11} />}
                                </button>
                            )}
                            {/* PANTALLA COMPLETA */}
                            <button
                                onClick={() => { setIsFullscreenTV(!isFullscreenTV); setIsMiniTV(false); }}
                                title={isFullscreenTV ? 'Salir de pantalla completa' : 'Pantalla completa'}
                                style={{ padding: '4px', borderRadius: '50%', background: isFullscreenTV ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: isFullscreenTV ? '32px' : '22px', height: isFullscreenTV ? '32px' : '22px' }}
                            >
                                <Maximize size={isFullscreenTV ? 16 : 11} />
                            </button>
                            {/* MUTE */}
                            <button
                                onClick={toggleMute}
                                title={isMuted ? 'Activar audio TVLS' : 'Silenciar TVLS'}
                                style={{ padding: '4px', borderRadius: '50%', background: isMuted ? '#ef4444' : 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: isFullscreenTV ? '32px' : '22px', height: isFullscreenTV ? '32px' : '22px' }}
                            >
                                {isMuted ? <VolumeX size={isFullscreenTV ? 16 : 11} /> : <Volume2 size={isFullscreenTV ? 16 : 11} />}
                            </button>
                            {/* CERRAR */}
                            <button
                                onClick={() => { setIsVideoPlaying(false); setIsFullscreenTV(false); setIsMiniTV(false); }}
                                title="Cerrar TVLS"
                                style={{ padding: '4px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.7)', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: isFullscreenTV ? '32px' : '22px', height: isFullscreenTV ? '32px' : '22px' }}
                            >
                                <X size={isFullscreenTV ? 16 : 11} />
                            </button>
                        </div>

                        {/* ─── CHANNEL BAR (always visible) ─── */}
                        <div style={{
                            position: 'absolute',
                            bottom: isFullscreenTV ? '24px' : '6px',
                            left: '50%', transform: 'translateX(-50%)',
                            zIndex: 10, display: 'flex', alignItems: 'center', gap: '8px',
                            background: 'rgba(0,0,0,0.75)', padding: isFullscreenTV ? '6px 20px' : '2px 8px',
                            borderRadius: '20px', backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.15)', whiteSpace: 'nowrap'
                        }}>
                            <button onClick={nextVideo} style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '0 4px' }}>
                                <ChevronLeft size={isFullscreenTV ? 18 : 12} />
                                <span style={{ fontSize: isFullscreenTV ? '0.75rem' : '0.55rem', fontWeight: 'bold' }}>CH-</span>
                            </button>
                            <div style={{ width: '1px', height: isFullscreenTV ? '14px' : '8px', background: 'rgba(255,255,255,0.2)' }}></div>
                            <span style={{ fontSize: isFullscreenTV ? '1rem' : '0.55rem', fontWeight: '900', color: '#ef4444', letterSpacing: '0.5px' }}>TVLS</span>
                            {isFullscreenTV && (
                                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {TVLS_VIDEOS[previewIndex]?.title || 'Canal Local'}
                                </span>
                            )}
                            <div style={{ width: '1px', height: isFullscreenTV ? '14px' : '8px', background: 'rgba(255,255,255,0.2)' }}></div>
                            <button onClick={nextVideo} style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '0 4px' }}>
                                <span style={{ fontSize: isFullscreenTV ? '0.75rem' : '0.55rem', fontWeight: 'bold' }}>CH+</span>
                                <ChevronRight size={isFullscreenTV ? 18 : 12} />
                            </button>
                        </div>

                        {/* ─── IFRAME ─── */}
                        <div style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
                            <iframe
                                ref={iframeRefActive}
                                width="100%" height="100%"
                                src={`https://www.youtube.com/embed/${TVLS_VIDEOS[previewIndex].id}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=${TVLS_VIDEOS[previewIndex].id}`}
                                title="TVLS Preview"
                                frameBorder="0"
                                style={{ transform: isFullscreenTV ? 'scale(1)' : 'scale(1.1)' }}
                                allow="autoplay; encrypted-media; fullscreen"
                            />
                        </div>
                    </motion.div>
                </AnimatePresence>
            )}
                <div style={{ textAlign: 'center', marginTop: '3rem', padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#38bdf8', letterSpacing: '2px' }}>HECHO EN LA SERENA · v3.2 CRISTAL</span>
                </div>
                </div>
            </div>
          </div>
        </div>
        {showTiendaPoleras && <TiendaPoleras3D onClose={() => setShowTiendaPoleras(false)} />}
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
      </>
    );
}
