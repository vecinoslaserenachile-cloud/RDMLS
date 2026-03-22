import React from 'react';
import SmartVerticalReel from './SmartVerticalReel';

export default function SmartVLSFeed({ onClose }) {
    const FEED_ITEMS = [
        {
            title: "Red Vecinal Abierta",
            desc: "Mantente conectado con tu comunidad. Grupos vecinales, alertas comunitarias y comercio local directo en Facebook.",
            tag: "Facebook",
            bg: "#1877f2", // Facebook Blue
            image: "/vls_diaguita_ceramic_smart_ui_1774012541579.png",
            actionText: "IR AL GRUPO",
            link: "https://facebook.com"
        },
        {
            title: "Noticias en Tiempo Real",
            desc: "Sigue el pulso de la ciudad. Alertas de tráfico, clima y contingencias de la Comuna Smart directo en X.",
            tag: "X (Twitter)",
            bg: "#000000", // X Black
            image: "/vls_elolivar_sanctuary_3d_1774012523251.png",
            actionText: "SEGUIR ALERTA",
            link: "https://x.com/vecinoslaserena"
        },
        {
            title: "Galería Urbana",
            desc: "Nuestra identidad visual. Rincones históricos, panoramas y emprendedores locales destacados cada día.",
            tag: "Instagram",
            bg: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)", // Instagram Gradient
            image: "/comic-patrimonio.jpg",
            actionText: "VER REELS",
            link: "https://instagram.com"
        },
        {
            title: "#LaSerenaSmart",
            desc: "Cultura urbana vibrante. Retos, trends locales y el lado más joven y dinámico de nuestra comuna.",
            tag: "TikTok",
            bg: "#000000",
            image: "/comic-playa.jpg",
            actionText: "VER TENDENCIAS",
            link: "https://tiktok.com"
        },
        {
            title: "TVLS Contenidos",
            desc: "Nuestro canal oficial. Reportajes, entrevistas, consejos de soberanía digital y transmisiones en vivo del municipio.",
            tag: "YouTube",
            bg: "#ff0000", // YouTube Red
            image: "/vls_molle_animas_3d_1774012579587.png",
            actionText: "SUSCRIBIRSE",
            link: "https://youtube.com"
        }
    ];

    return (
        <SmartVerticalReel 
            onClose={onClose}
            title="RADAR @VECINOSLASERENA"
            accentColor="#1d9bf0"
            items={FEED_ITEMS}
        />
    );
}
