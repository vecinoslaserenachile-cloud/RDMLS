import React, { useState, useEffect } from 'react';

export default function RadioKioskTab() {
    const [time, setTime] = useState('');
    const [dateNum, setDateNum] = useState('');
    const [isNight, setIsNight] = useState(false);
    const audioUrl = "https://az11.yesstreaming.net:8590/radio.mp3";
    const camURL = "https://www.youtube.com/embed/fUeo_EhVFTY?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&playsinline=1&enablejsapi=1&loop=1&playlist=fUeo_EhVFTY";

    useEffect(() => {
        const timerId = setInterval(() => {
            const now = new Date();
            setTime(now.toLocaleTimeString('es-CL', { hour12: false }));
            setDateNum(now.getDate());
            setIsNight(now.getHours() >= 19 || now.getHours() < 7);
        }, 1000);
        return () => clearInterval(timerId);
    }, []);

    const agendaRDMLS = {
        1: "Verano Seguro.", 5: "Concejo Vivo.", 7: "Run N Sand.", 10: "Permisos 26.",
        12: "HOY: Humedal Río Elqui.", 14: "San Valentín.", 21: "Fiesta Macha.", 28: "Carnaval Elquino."
    };

    const handlePlay = (e) => {
        const audio = document.getElementById('rdmls-audio-stream-kiosk');
        if (audio) {
            audio.play().catch(() => { });
            e.currentTarget.style.background = '#00D4FF';
        }
    };

    return (
        <div style={{
            background: '#8B1D19',
            fontFamily: "'Segoe UI', Roboto, sans-serif",
            color: '#ffffff',
            overflow: 'hidden',
            borderRadius: '20px',
            border: '2px solid #C41230',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            height: '750px',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
        }}>

            {/* HUINCHAS */}
            <div style={{ background: '#000', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '3px solid #C41230', fontWeight: '900', textTransform: 'uppercase', fontSize: '12px', gap: '20px', width: '100%' }}>
                <span>RDMLS LA SERENA</span>
                <span>{time || '00:00:00'}</span>
                <span>LA SERENA ¡SE LEVANTA!</span>
            </div>

            <div style={{ background: 'rgba(0, 0, 0, 0.95)', height: '35px', display: 'flex', alignItems: 'center', overflow: 'hidden', borderBottom: '1px solid rgba(255, 255, 255, 0.15)' }}>
                <div style={{ whiteSpace: 'nowrap', fontSize: '11px', fontWeight: '800', color: '#00D4FF', textTransform: 'uppercase', animation: 'scroll-top-slow 55s linear infinite' }}>
                    {"Transmite RDMLS | UF: $38.542 | 🛡️ SEGURIDAD: 1420 | ".repeat(20)}
                </div>
            </div>

            {/* LAYOUT */}
            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', width: '100%', padding: '10px', flex: 1, boxSizing: 'border-box' }}>

                {/* PANEL LEFT */}
                <div style={{ width: '310px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>

                    {/* CALBOX */}
                    <div style={{ background: 'rgba(0,0,0,0.9)', borderRadius: '20px', padding: '10px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ textAlign: 'center', fontSize: '10px', fontWeight: '900', color: '#C41230', marginBottom: '5px' }}>MES EN CURSO 2026</div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', marginBottom: '2px' }}>
                            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(d => <div key={d} style={{ fontSize: '8px', textAlign: 'center', color: '#aaa', fontWeight: '700', paddingBottom: '2px' }}>{d}</div>)}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '3px' }}>
                            {[...Array(6)].map((_, i) => <div key={`e-${i}`} style={{ aspectRatio: '1', borderRadius: '6px', background: 'rgba(255,255,255,0.05)' }}></div>)}
                            {[...Array(28)].map((_, i) => {
                                const d = i + 1;
                                const isToday = d === dateNum;
                                const hasEvent = !!agendaRDMLS[d];
                                return (
                                    <div key={d} style={{
                                        aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', borderRadius: '6px',
                                        background: isToday ? '#C41230' : 'rgba(255,255,255,0.05)',
                                        fontWeight: isToday ? '900' : 'normal',
                                        borderBottom: hasEvent ? '2.5px solid #00D4FF' : 'none',
                                        border: isToday ? '1px solid #fff' : 'none',
                                        cursor: 'pointer'
                                    }} title={agendaRDMLS[d] || 'Día normal'}>
                                        {d}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div style={{ position: 'relative', borderRadius: '15px', overflow: 'hidden', border: '2px solid #C41230', background: '#000', height: '125px', flexShrink: 0 }}>
                        <div style={{ width: '400%', height: '400%', position: 'absolute', top: '-180%', left: '-100%' }}>
                            <iframe src={camURL} frameBorder="0" style={{ width: '100%', height: '140%', border: 0, position: 'absolute', top: '-20%', left: 0, pointerEvents: 'none' }}></iframe>
                        </div>
                    </div>

                    <div style={{ position: 'relative', borderRadius: '15px', overflow: 'hidden', border: '2px solid #C41230', background: '#000', height: '125px', flexShrink: 0 }}>
                        <div style={{ width: '350%', height: '350%', position: 'absolute', top: '-80%', left: '-40%' }}>
                            <iframe src={camURL} frameBorder="0" style={{ width: '100%', height: '140%', border: 0, position: 'absolute', top: '-20%', left: 0, pointerEvents: 'none' }}></iframe>
                        </div>
                    </div>

                    {/* BRAND LOOP */}
                    <div style={{ flexGrow: 1, background: 'radial-gradient(circle, #222 0%, #000 100%)', borderRadius: '15px', border: '3px solid #C41230', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 0 50px rgba(0,0,0,0.9), 0 0 15px rgba(196, 18, 48, 0.4)', minHeight: '110px' }}>
                        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                            <div style={{ fontSize: '24px', fontWeight: '900', color: '#fff', textTransform: 'uppercase', textShadow: '3px 3px 0 #8B1D19, 0 0 15px #00D4FF', marginBottom: '5px' }}>EN VIVO</div>
                            <div style={{ fontSize: '36px', marginBottom: '2px', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.8))' }}>📡</div>
                            <div style={{ fontSize: '11px', color: '#FFD700', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', background: '#000', padding: '2px 6px', borderRadius: '4px', border: '1px solid #FFD700' }}>RDMLS LA SERENA</div>
                        </div>
                    </div>

                </div>

                {/* PANEL CENTER */}
                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ textAlign: 'center', padding: '10px', background: 'rgba(0,0,0,0.4)', borderRadius: '20px' }}>
                        <img src="/logo-smartls-v3.png" style={{ height: '40px' }} alt="Logo" />
                    </div>

                    <div style={{ background: 'linear-gradient(135deg, #000, #8B1D19)', padding: '15px', borderRadius: '25px', border: '2px solid #C41230', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                        <div style={{ fontSize: '14px', fontWeight: '900', color: '#fff', textAlign: 'center', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '1px', textShadow: '0 2px 4px rgba(0,0,0,0.5)', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '5px', width: '100%' }}>RADIO DIGITAL MUNICIPAL LA SERENA</div>
                        <div onClick={handlePlay} style={{ width: '50px', height: '50px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s' }}>
                            <div style={{ borderStyle: 'solid', borderWidth: '10px 0 10px 18px', borderColor: 'transparent transparent transparent #8B1D19', marginLeft: '3px' }}></div>
                        </div>
                        <audio id="rdmls-audio-stream-kiosk" src={audioUrl} controls style={{ width: '100%', height: '30px', filter: 'invert(100%)', marginTop: '10px' }}></audio>
                    </div>

                    <div style={{ flex: 2, height: 'auto', position: 'relative', borderRadius: '15px', overflow: 'hidden', border: '2px solid #C41230', background: '#000' }}>
                        <iframe src={camURL} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}></iframe>
                    </div>
                </div>

                {/* PANEL RIGHT */}
                <div style={{ width: '375px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ textAlign: 'center', background: 'rgba(0,0,0,0.9)', padding: '15px', borderRadius: '20px', border: '2px solid rgba(255,255,255,0.2)' }}>
                        <div style={{ fontSize: '54px', fontWeight: '900', lineHeight: '1', fontFamily: "'Consolas', monospace", color: '#fff' }}>{time || '00:00:00'}</div>
                        <div style={{ fontSize: '11px', fontWeight: '800', color: '#C41230', marginTop: '5px' }}>HORA OFICIAL LA SERENA</div>
                    </div>

                    <div style={{ background: 'linear-gradient(135deg, rgba(0,20,40,0.95), rgba(0,0,0,0.95))', borderRadius: '20px', padding: '12px', border: '1px solid #00D4FF' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginTop: '8px' }}>
                            {/* Dummy Data for Nautical Dashboard */}
                            <div style={{ background: 'rgba(0, 212, 255, 0.08)', padding: '8px', borderRadius: '10px', border: '1px solid rgba(0,212,255,0.2)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}><span style={{ fontSize: '8px', color: '#00D4FF', textTransform: 'uppercase', fontWeight: '900' }}>Marea</span><span style={{ fontSize: '14px', fontWeight: '900', color: '#fff' }}>12:44</span></div>
                            <div style={{ background: 'rgba(0, 212, 255, 0.08)', padding: '8px', borderRadius: '10px', border: '1px solid rgba(0,212,255,0.2)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}><span style={{ fontSize: '8px', color: '#00D4FF', textTransform: 'uppercase', fontWeight: '900' }}>Viento</span><span style={{ fontSize: '14px', fontWeight: '900', color: '#fff' }}>14 NDS</span></div>
                            <div style={{ background: 'rgba(0, 212, 255, 0.08)', padding: '8px', borderRadius: '10px', border: '1px solid rgba(0,212,255,0.2)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}><span style={{ fontSize: '8px', color: '#00D4FF', textTransform: 'uppercase', fontWeight: '900' }}>Olas</span><span style={{ fontSize: '14px', fontWeight: '900', color: '#fff' }}>1.8 M</span></div>
                            <div style={{ background: 'rgba(0, 212, 255, 0.08)', padding: '8px', borderRadius: '10px', border: '1px solid rgba(0,212,255,0.2)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}><span style={{ fontSize: '8px', color: '#00D4FF', textTransform: 'uppercase', fontWeight: '900' }}>Luna</span><span style={{ fontSize: '14px', fontWeight: '900', color: '#fff' }}>92%</span></div>
                        </div>
                    </div>

                    <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '25px', border: '2.5px solid #C41230', flexGrow: 1, display: 'flex', background: isNight ? 'linear-gradient(to bottom, #0f2027, #203a43)' : '#87CEEB' }}>
                        <iframe src="https://www.meteoblue.com/es/weather/widget/three/la-serena_chile_3884373?geoloc=fixed&days=4&tempunit=CELSIUS&windunit=KILOMETER_PER_HOUR&layout=dark" frameBorder="0" scrolling="no" style={{ width: '100%', height: '100%', background: 'transparent' }}></iframe>
                    </div>
                </div>
            </div>

            {/* TICKER BOTTOM */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '40px', background: '#000', borderTop: '3.5px solid #C41230', display: 'flex', alignItems: 'center', zIndex: 10000, overflow: 'hidden' }}>
                <div style={{ whiteSpace: 'nowrap', fontSize: '14px', fontWeight: '900', animation: 'scroll-top-slow 80s linear infinite', color: '#fff', textTransform: 'uppercase' }}>
                    {"ESTAMOS EN VIVO... 🌟 RDMLS: LA SERENA ¡SE LEVANTA! | 🚗 PAGA TU PERMISO DE CIRCULACIÓN 2026 | ".repeat(15)}
                </div>
            </div>

            <style>{`
                @keyframes scroll-top-slow { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
            `}</style>
        </div>
    );
}
