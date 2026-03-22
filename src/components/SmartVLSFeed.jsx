import React from 'react';
import SmartVerticalReel from './SmartVerticalReel';

export default function SmartVLSFeed({ onClose }) {
    const FEED_ITEMS = [
        {
            title: "Megaoperativo Regional: +100 Detenidos",
            desc: "Carabineros y PDI despliegan plan de seguridad en toda la Provincia de Elqui. Resultados históricos en combate al delito. #SeguridadVLS",
            tag: "Operativo Policial",
            bg: "#020617",
            image: "https://pbs.twimg.com/media/GH8c4w_WIAAQ9Vw?format=jpg&name=large",
            actionText: "VER DETALLES",
            link: "https://x.com/vecinoslaserena"
        },
        {
            title: "Alerta de Lluvias para el Finde",
            desc: "Se pronostican las primeras precipitaciones del año en La Serena y Coquimbo. Recomendamos limpiar canaletas y preparar kits de emergencia.",
            tag: "Meteorología",
            bg: "#1e3a8a",
            image: "https://pbs.twimg.com/media/GFu9M2BXwAAv9B8?format=jpg&name=large",
            actionText: "VER PRONÓSTICO",
            link: "https://x.com/vecinoslaserena"
        },
        {
            title: "Corte de Energía: Robo de Cables",
            desc: "Sectores de La Serena sufren interrupción por robo de 700m de tendido eléctrico. Red Inteligente VLS monitorea el restablecimiento.",
            tag: "Suministro",
            bg: "#064e3b",
            image: "https://pbs.twimg.com/media/GE8Xy_BXEAAYi6z?format=jpg&name=large",
            actionText: "VER MAPA DE AVANCE",
            link: "https://x.com/vecinoslaserena"
        },
        {
            title: "Resistencia Educativa: Slep Elqui",
            desc: "Polémica tras publicación de periodista de Slep Elqui. 'Comenzó la era de la resistencia' marca el pulso del cambio institucional.",
            tag: "Educación",
            bg: "#b45309",
            image: "https://pbs.twimg.com/media/GDUXy-BX0AA8Y9B?format=jpg&name=large",
            actionText: "LEER COLUMNA",
            link: "https://x.com/vecinoslaserena"
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
