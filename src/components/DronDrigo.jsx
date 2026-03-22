import React, { useState, useEffect } from 'react';
import { 
    X as CloseIcon, Activity, Zap, Shield, 
    ChevronUp, ChevronDown,
    Volume2, VolumeX, Compass, Cloud
} from 'lucide-react';

export default function DronDrigo({ onClose }) {
    const [isMuted, setIsMuted] = useState(false);
    const [altitude, setAltitude] = useState(150);
    const [speed, setSpeed] = useState(0);
    const [coordinates, setCoordinates] = useState({ lat: -29.9027, lng: -71.2519 });
    const [isRecording, setIsRecording] = useState(false);
    const [viewMode, setViewMode] = useState('3D-SCAN');
    const isAdmin = localStorage.getItem('master_bypass') === 'true';

    // Simulación de movimiento
    useEffect(() => {
        const interval = setInterval(() => {
            if (speed > 0) {
                setCoordinates(prev => ({
                    lat: prev.lat + (Math.random() - 0.5) * 0.0001 * speed,
                    lng: prev.lng + (Math.random() - 0.5) * 0.0001 * speed
                }));
            }
        }, 100);
        return () => clearInterval(interval);
    }, [speed]);

    /* ─────────── VISTA PÚBLICA (Ciudadana) ─────────── */
    if (!isAdmin) {
        return (
            <div style={{
                position: 'fixed', inset: 0, zIndex: 1000000,
                background: 'linear-gradient(180deg, #38bdf8 0%, #bae6fd 100%)',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', color: '#0f172a', overflow: 'hidden'
            }}>
                <button onClick={onClose} style={{
                    position: 'absolute', top: '2rem', right: '2rem',
                    background: 'rgba(255,255,255,0.6)', border: 'none',
                    borderRadius: '50%', padding: '12px', cursor: 'pointer'
                }}>
                    <CloseIcon size={24} color="#0f172a" />
                </button>

                {/* Nube decorativa */}
                <div style={{ position: 'absolute', top: '10%', right: '15%', animation: 'floatCloud 10s ease-in-out infinite' }}>
                    <Cloud color="white" fill="white" size={120} opacity={0.6} />
                </div>
                <div style={{ position: 'absolute', top: '25%', left: '10%', animation: 'floatCloud 14s ease-in-out infinite' }}>
                    <Cloud color="white" fill="white" size={80} opacity={0.4} />
                </div>

                {/* Dron en patrulla */}
                <div style={{ animation: 'patrol 15s linear infinite', position: 'relative', marginBottom: '3rem' }}>
                    <div style={{ width: '80px', height: '40px', background: '#1e293b', borderRadius: '12px', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
                        {/* Hélices */}
                        {['-30px', '30px'].map((pos, i) => (
                            <div key={i} style={{ position: 'absolute', top: '-12px', left: `calc(50% + ${pos})`, width: '24px', height: '4px', background: '#38bdf8', borderRadius: '2px', transform: 'translateX(-50%)', animation: 'spin 0.3s linear infinite' }} />
                        ))}
                        <div style={{ position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)', width: '12px', height: '12px', background: '#ef4444', borderRadius: '50%', boxShadow: '0 0 15px rgba(239,68,68,0.9)', animation: 'blink 1s infinite' }} />
                    </div>
                    <div style={{ position: 'absolute', bottom: '-35px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(239,68,68,0.9)', color: 'white', padding: '4px 14px', borderRadius: '20px', fontSize: '0.65rem', fontWeight: 'bold', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <div style={{ width: '6px', height: '6px', background: 'white', borderRadius: '50%', animation: 'blink 1s infinite' }} />
                        PATRULLA C5 EN VUELO
                    </div>
                </div>

                {/* Info Card ciudadana */}
                <div style={{
                    background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)',
                    padding: '2rem 3rem', borderRadius: '24px', textAlign: 'center',
                    border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}>
                    <h2 style={{ margin: '0 0 8px 0', fontSize: '1.6rem' }}>🚁 Sky View Activo</h2>
                    <p style={{ margin: '0 0 8px 0', color: '#475569' }}>
                        El dron de seguridad <strong>"Rodrigo Godoy · VLS-01"</strong> vigila tu sector.
                    </p>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#ef4444', fontWeight: 'bold' }}>
                        🔒 Solo operadores C5 acceden al feed térmico y la telemetría.
                    </p>
                </div>

                <style>{`
                    @keyframes patrol { 0% { transform: translateX(-40vw); } 50% { transform: translateX(40vw) translateY(-20px); } 100% { transform: translateX(-40vw); } }
                    @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
                    @keyframes floatCloud { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(20px); } }
                    @keyframes spin { 100% { transform: translateX(-50%) rotate(360deg); } }
                `}</style>
            </div>
        );
    }

    /* ─────────── VISTA AUTORIDAD (HUD C5) ─────────── */
    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 1000000, background: '#000',
            display: 'flex', flexDirection: 'column', color: '#00F0FF',
            fontFamily: "'Orbitron', monospace", overflow: 'hidden'
        }}>
            {/* Feed Principal del Dron */}
            <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d10000!2d${coordinates.lng}!3d${coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses!2scl!4v1700000000000!5m2!1ses!2scl`}
                    style={{ border: 0, filter: viewMode === 'THERMAL' ? 'invert(1) hue-rotate(180deg) contrast(1.5)' : 'none', opacity: 0.8 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="VLS Drone Feed"
                />

                {/* HUD Overlay */}
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', border: '2px solid rgba(0,240,255,0.2)' }}>
                    {/* Crosshair */}
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '60px', height: '60px' }}>
                        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: '#00F0FF', opacity: 0.5 }} />
                        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: '#00F0FF', opacity: 0.5 }} />
                        <div style={{ position: 'absolute', inset: '10px', border: '1px solid #00F0FF', borderRadius: '50%', opacity: 0.3 }} />
                    </div>

                    {/* Altímetro */}
                    <div style={{ position: 'absolute', left: '30px', top: '50%', transform: 'translateY(-50%)' }}>
                        <div style={{ fontSize: '0.6rem', opacity: 0.6 }}>ALTITUDE</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{altitude}m</div>
                        <div style={{ width: '4px', height: '100px', background: 'rgba(255,255,255,0.1)', marginTop: '10px', position: 'relative' }}>
                            <div style={{ position: 'absolute', bottom: `${(altitude / 500) * 100}%`, left: '-5px', width: '14px', height: '2px', background: '#00F0FF' }} />
                        </div>
                    </div>

                    {/* Velocímetro */}
                    <div style={{ position: 'absolute', right: '30px', top: '50%', transform: 'translateY(-50%)', textAlign: 'right' }}>
                        <div style={{ fontSize: '0.6rem', opacity: 0.6 }}>SPEED</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{speed.toFixed(1)} km/h</div>
                        <div style={{ width: '4px', height: '100px', background: 'rgba(255,255,255,0.1)', marginTop: '10px', position: 'relative', marginLeft: 'auto' }}>
                            <div style={{ position: 'absolute', bottom: `${(speed / 100) * 100}%`, right: '-5px', width: '14px', height: '2px', background: '#facc15' }} />
                        </div>
                    </div>

                    {/* Barra de Estado Superior */}
                    <div style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', width: '80%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.5)', padding: '10px 20px', borderRadius: '4px', border: '1px solid rgba(0,240,255,0.2)' }}>
                        <div style={{ display: 'flex', gap: '20px', fontSize: '0.7rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Zap size={14} color="#facc15" /> 88% BAT</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Activity size={14} color="#22c55e" /> SIGNAL STRONG</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Shield size={14} color="#38bdf8" /> C5-ENCRYPTION</div>
                        </div>
                        <div style={{ fontWeight: 'bold', letterSpacing: '2px' }}>VLS · DRON DRIGO v5.0</div>
                        <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>{coordinates.lat.toFixed(5)}, {coordinates.lng.toFixed(5)}</div>
                    </div>

                    {/* Controles de Vista Inferiores */}
                    <div style={{ position: 'absolute', bottom: '140px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '15px', pointerEvents: 'auto' }}>
                        <button className="hud-btn" onClick={() => setViewMode('3D-SCAN')} style={{ background: viewMode === '3D-SCAN' ? '#00F0FF' : 'rgba(0,0,0,0.6)', color: viewMode === '3D-SCAN' ? '#000' : '#00F0FF' }}>STD</button>
                        <button className="hud-btn" onClick={() => setViewMode('THERMAL')} style={{ background: viewMode === 'THERMAL' ? '#ff4400' : 'rgba(0,0,0,0.6)', color: viewMode === 'THERMAL' ? '#fff' : '#00F0FF', borderColor: viewMode === 'THERMAL' ? '#ff4400' : '#00F0FF' }}>THERM</button>
                        <button className="hud-btn" style={{ background: isRecording ? '#ef4444' : 'rgba(0,0,0,0.6)', pointerEvents: 'auto' }} onClick={() => setIsRecording(!isRecording)}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fff', display: 'inline-block', marginRight: '5px', animation: isRecording ? 'blink 1s infinite' : 'none' }} /> REC
                        </button>
                    </div>
                </div>
            </div>

            {/* Panel de Control Terrestre */}
            <div style={{ height: '120px', background: '#050505', borderTop: '2px solid #222', display: 'flex', alignItems: 'center', padding: '0 2rem', gap: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ background: '#1e293b', padding: '10px', borderRadius: '12px', border: '1px solid #334155' }}>
                        <Compass size={32} style={{ animation: speed > 0 ? 'spin360 2s linear infinite' : 'none' }} />
                    </div>
                    <div>
                        <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>PILOT STATUS</div>
                        <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#fff' }}>RODRIGO GODOY (VLS-01)</div>
                    </div>
                </div>

                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <button onClick={() => setSpeed(prev => Math.max(0, prev - 5))} className="ctrl-btn"><ChevronDown /></button>
                    <button onClick={() => setSpeed(prev => Math.min(100, prev + 5))} className="ctrl-btn"><ChevronUp /></button>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => setIsMuted(!isMuted)} className="ctrl-btn" style={{ background: isMuted ? '#444' : '#1e293b' }}>
                        {isMuted ? <VolumeX /> : <Volume2 />}
                    </button>
                    <button onClick={onClose} className="ctrl-btn" style={{ background: '#ef4444', borderColor: '#7f1d1d' }}>EXIT</button>
                </div>
            </div>

            <style>{`
                .hud-btn {
                    padding: 8px 15px; background: rgba(0,0,0,0.6); border: 1px solid #00F0FF;
                    color: #00F0FF; font-size: 0.7rem; font-weight: bold; border-radius: 4px; cursor: pointer; transition: all 0.2s;
                }
                .hud-btn:hover { background: #00F0FF; color: black; }
                .ctrl-btn {
                    width: 50px; height: 50px; background: #1e293b; border: 1px solid #334155;
                    border-radius: 12px; display: flex; align-items: center; justify-content: center;
                    color: white; cursor: pointer; transition: all 0.2s;
                }
                .ctrl-btn:hover { border-color: #00F0FF; box-shadow: 0 0 10px rgba(0,240,255,0.3); }
                @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
                @keyframes spin360 { 100% { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
}
