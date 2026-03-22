const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'HubDashboard.jsx');
const lines = fs.readFileSync(filePath, 'utf8').split('\n');

// Extraemos la parte sana de los estados (desde la línea 17 del archivo dañado)
const healthyStatesPart = lines.slice(16).join('\n');

const fullRestore = `import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { 
    Search, Mic, CloudSun, Radio, Sliders, Volume2, 
    VolumeX, ChevronUp, ChevronDown, Activity, 
    Newspaper, Info, Music, Zap, Move, Tv, Monitor, Lock,
    MessageSquare, SkipForward, SkipBack, Layers, Settings, Maximize, ExternalLink, Globe, Wifi, Shield, TrendingUp, TrendingDown, Clock, Star, Play, Pause,
    Heart, Users, Briefcase, Landmark, BookOpen, Map, Phone, AlertCircle, ShoppingCart, Award, Sparkles, CheckCircle2,
    ShieldCheck, Eye, Home as HomeIcon, Ruler, Camera, Dumbbell, Box, PenTool, User as UserIcon, LogOut, ChevronRight, Pin, MapPin, Search as SearchIcon, Database, Share2,
    Stethoscope, AlertTriangle, Image as ImageIcon, GraduationCap, Gavel, Brain, SmilePlus, Vote, Rocket, ListChecks, PartyPopper, ShoppingBag, Eye as EyeIcon, Leaf
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
import SmartShare from '../components/SmartShare';

export default function HubDashboard() {
    const navigate = useNavigate();
    const { lang, setLang, t: baseT } = useTranslation();
    const [currentTime, setCurrentTime] = useState(new Date());

    const dict = {
        es: {
            title: "Hub de Comunicaciones y Ciudadanía Smart - Portal Unificado VLS",
            citizensTitle: "Smart Citizens", citizensSub: "Reportes, Mapas y Radio Digital",
            adminTitle: "Smart Administration", adminSub: "Gestión Interna, Diploma E-learning e Informes",
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

    useEffect(() => {
        const langToIdx = { es: 0, en: 1, pt: 2, fr: 3, it: 4, zh: 5 };
        if (langToIdx[lang] !== undefined) {
            setGreetingIdx(langToIdx[lang]);
        }
    }, [lang]);

    const isLockedForResident = (id) => {
        const role = localStorage.getItem('vls_user_role') || 'resident';
        const isAuthorized = localStorage.getItem('master_bypass') === 'true';
        const isRegistered = !!localStorage.getItem('vls_user_data');
        const isGuest = localStorage.getItem('vls_guest_mode') === 'true';

        const RESIDENT_ALLOWED_IDS = [
            'citizens', 'listening', 'web-builder', 'distances', 'paseo3d', 'cdls-club', 'elearning',
            'smart-salud', 'vecinos', 'auditoria-vecinal', 'parlamento-vecinal', 'ecumenico', 'laico',
            'vecinojos', 'camaras-faro', 'tornamesa-digital', 'radio-master', 'memory-portal', 'gym-3d',
            'retro-gamer-room', 'legacy-game', 'galaxia-disco', 'vls-roadmap', 'vls-manifesto', 
            'lite-portal-access', 'vls-precolombino', 'muralismo', 'estudio-musical', 'vhs-tv', 
            'decision-vecinal', 'difundir-app', 'operacion-ls', 'stickers-portal', 'glosario-vls',
            'escuela-musica', 'escuela-artes', 'laboratorio-criticas', 'enfermeria-smart', 'identity-gate'
        ];

        if (role === 'admin' || role === 'curator') return false;
        if (isAuthorized || isGuest) return false;
        if (isRegistered && !RESIDENT_ALLOWED_IDS.includes(id)) return true;
        return false;
    };

    if (curTenant === 'gore-coquimbo') {
        return <GoreDashboard />;
    }
    if (curTenant === 'vecino-portal-only') {
        return <Navigate to="/vecinos" />;
    }
`;

fs.writeFileSync(filePath, fullRestore + healthyStatesPart, 'utf8');
console.log('✅ HubDashboard.jsx RESTORED V2.');
