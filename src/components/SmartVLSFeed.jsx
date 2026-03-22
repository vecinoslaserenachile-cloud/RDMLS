import React from 'react';
import SmartVerticalReel from './SmartVerticalReel';

export default function SmartVLSFeed({ onClose }) {
    const FEED_ITEMS = [
        {
            title: "Red Vecinal Abierta",
            desc: "Mantente conectado con tu comunidad. Grupos vecinales, alertas comunitarias y comercio local directo en Facebook.",
            tag: "Facebook",
            bg: "#1877f2", // Facebook Blue
            image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1074&auto=format&fit=crop",
            actionText: "IR AL GRUPO",
            link: "https://facebook.com"
        },
        {
            title: "Noticias en Tiempo Real",
            desc: "Sigue el pulso de la ciudad. Alertas de tráfico, clima y contingencias de la Comuna Smart directo en X.",
            tag: "X (Twitter)",
            bg: "#000000", // X Black
            image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=1074&auto=format&fit=crop",
            actionText: "SEGUIR ALERTA",
            link: "https://x.com/vecinoslaserena"
        },
        {
            title: "Galería Urbana",
            desc: "Nuestra identidad visual. Rincones históricos, panoramas y emprendedores locales destacados cada día.",
            tag: "Instagram",
            bg: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)", // Instagram Gradient
            image: "https://images.unsplash.com/photo-1611262588024-d12430b98920?q=80&w=1074&auto=format&fit=crop",
            actionText: "VER REELS",
            link: "https://instagram.com"
        },
        {
            title: "#LaSerenaSmart",
            desc: "Cultura urbana vibrante. Retos, trends locales y el lado más joven y dinámico de nuestra comuna.",
            tag: "TikTok",
            bg: "#000000",
            image: "https://images.unsplash.com/photo-1611605698323-b185335eeb8e?q=80&w=1074&auto=format&fit=crop",
            actionText: "VER TENDENCIAS",
            link: "https://tiktok.com"
        },
        {
            title: "TVLS Contenidos",
            desc: "Nuestro canal oficial. Reportajes, entrevistas, consejos de soberanía digital y transmisiones en vivo del municipio.",
            tag: "YouTube",
            bg: "#ff0000", // YouTube Red
            image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=1074&auto=format&fit=crop",
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
