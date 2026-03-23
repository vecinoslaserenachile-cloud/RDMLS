import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CloudSun, Wind, Droplets, Thermometer, Map, Activity, Zap, Compass, Navigation, Globe, Satellite } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Serenamet() {
    const navigate = useNavigate();
    const systems = [
        { name: 'Red de Estaciones', status: 'Online', icon: Compass, color: '#38bdf8' },
        { name: 'Micro-turbinas VLS', status: 'Activo', icon: Wind, color: '#10b981' },
        { name: 'Sensores de Costa', status: 'Sincronizado', icon: Droplets, color: '#0ea5e9' },
        { name: 'Índice UV', status: 'Extremo', icon: Zap, color: '#ef4444' }
    ];

    const alerts = [
        { type: 'Viento Blanco', area: 'Cordillera Elqui', level: 'Precaución' },
        { type: 'Marea Alta', area: 'Avenida del Mar', level: 'Informativo' },
        { type: 'Cielos Despejados', area: 'Valle del Elqui', level: 'Óptimo para Observación' }
    ];

    return (
        <div style={{
            minHeight: '100vh', padding: '2rem', paddingTop: '6rem',
            background: 'linear-gradient(135deg, #020617 0%, #0f172a 100%)', color: 'white',
            fontFamily: "'Inter', sans-serif",
            position: 'relative'
        }}>
            <style>{`
                @keyframes spin-radar { 100% { transform: rotate(360deg); } }
                @keyframes pulse-ring { 0% { transform: scale(0.8); opacity: 0.5; } 100% { transform: scale(1.5); opacity: 0; } }
                @keyframes vu-bounce { 0%, 100% { height: 10%; } 50% { height: 90%; } }
                .mosaic-card {
                    background: rgba(15, 23, 42, 0.6);
                    border: 1px solid rgba(56, 189, 248, 0.2);
                    border-radius: 24px;
                    padding: 1.5rem;
                    position: relative;
                    overflow: hidden;
                    backdrop-filter: blur(10px);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                    transition: transform 0.3s, border-color 0.3s;
                }
                .mosaic-card:hover {
                    transform: translateY(-5px);
                    border-color: rgba(56, 189, 248, 0.5);
                }
            `}</style>

            {/* Botón Home Flotante */}
            <button
                onClick={() => navigate('/')}
                style={{
                    position: 'fixed', top: '20px', left: '20px', zIndex: 2000,
                    background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)', padding: '10px 20px',
                    borderRadius: '50px', color: 'white', display: 'flex', alignItems: 'center',
                    gap: '8px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                }}
            >
                <CloudSun size={18} color="#38bdf8" />
                <span style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>VOLVER AL PORTAL</span>
            </button>

            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                   <div style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', padding: '20px', borderRadius: '25px', border: '1px solid #38bdf8', boxShadow: '0 0 20px rgba(56,189,248,0.4)' }}>
                      <CloudSun size={48} color="white" />
                   </div>
                   <div>
                      <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: '900', margin: 0, letterSpacing: '-2px', textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>SERENAMET</h1>
                      <p style={{ color: '#38bdf8', fontSize: '1rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>Hub Contextual de Sensores Urbanos</p>
                   </div>
                </div>

                {/* ── MOSAICO DE SENSORES ── */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                    
                    {/* SENSOR 1: RADAR SATELITAL GIRATORIO */}
                    <div className="mosaic-card" style={{ gridColumn: 'span 2', display: 'flex', gap: '1.5rem', alignItems: 'center', minHeight: '200px' }}>
                        <div style={{ position: 'relative', width: '150px', height: '150px', borderRadius: '50%', background: '#020617', border: '2px solid #10b981', overflow: 'hidden', flexShrink: 0, boxShadow: '0 0 20px rgba(16, 185, 129, 0.2)' }}>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', width: '100%', height: '1px', background: '#10b98133', transform: 'translate(-50%, -50%)' }}></div>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', width: '1px', height: '100%', background: '#10b98133', transform: 'translate(-50%, -50%)' }}></div>
                            {[1, 2, 3].map(i => (
                                <div key={i} style={{ position: 'absolute', top: '50%', left: '50%', width: `${i*30}%`, height: `${i*30}%`, border: '1px solid #10b98140', borderRadius: '50%', transform: 'translate(-50%, -50%)' }}></div>
                            ))}
                            {/* Haz giratorio del radar */}
                            <div style={{ 
                                position: 'absolute', top: '50%', left: '50%', width: '50%', height: '50%', 
                                background: 'conic-gradient(from 0deg, rgba(16, 185, 129, 0) 0deg, rgba(16, 185, 129, 0.8) 90deg)', 
                                transformOrigin: 'top left', animation: 'spin-radar 4s linear infinite', zIndex: 10 
                            }}></div>
                            {/* Puntos detectados */}
                            <div style={{ position: 'absolute', top: '30%', left: '60%', width: '6px', height: '6px', background: 'white', borderRadius: '50%', boxShadow: '0 0 10px white', zIndex: 11 }}></div>
                            <div style={{ position: 'absolute', top: '70%', left: '40%', width: '4px', height: '4px', background: 'white', borderRadius: '50%', boxShadow: '0 0 10px white', zIndex: 11 }}></div>
                        </div>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: 'bold', marginBottom: '8px' }}>
                                <Navigation size={20} /> TELEMETRÍA SATELITAL
                            </div>
                            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.6rem' }}>Radar Multipropósito</h3>
                            <p style={{ margin: 0, color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                Monitoreo sincronizado en vivo. Escaneando anomalías atmosféricas y reportes georreferenciados de la comuna en tiempo real. 
                            </p>
                            <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                                <span style={{ fontSize: '0.7rem', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold' }}>SATÉLITE GOES-16 ACTIVO</span>
                                <span style={{ fontSize: '0.7rem', background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold' }}>SIN ANOMALÍAS</span>
                            </div>
                        </div>
                    </div>

                    {/* SENSOR 2: RUIDO Y DECIBELES */}
                    <div className="mosaic-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', fontWeight: 'bold' }}>
                                <Activity size={20} /> MICRÓFONOS C5
                            </div>
                            <div style={{ width: '12px', height: '12px', background: '#ef4444', borderRadius: '50%', animation: 'pulse-ring 2s infinite' }}></div>
                        </div>
                        <div style={{ textAlign: 'center', margin: '20px 0' }}>
                            <span style={{ fontSize: '3rem', fontWeight: '900', color: 'white', textShadow: '0 0 20px rgba(239,68,68,0.5)' }}>42</span>
                            <span style={{ fontSize: '1rem', color: '#fca5a5', fontWeight: 'bold', marginLeft: '5px' }}>dB</span>
                            <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '5px' }}>Contaminación Acústica Comunal</div>
                        </div>
                        <div style={{ display: 'flex', gap: '4px', height: '30px', alignItems: 'flex-end', justifyContent: 'center' }}>
                            {[...Array(12)].map((_, i) => (
                                <div key={i} style={{ width: '6px', background: i > 8 ? '#ef4444' : '#10b981', animation: `vu-bounce ${0.5 + Math.random()}s infinite alternate ease-in-out` }}></div>
                            ))}
                        </div>
                    </div>

                    {/* SENSOR 3: CONTAMINACIÓN LUMÍNICA */}
                    <div className="mosaic-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b', fontWeight: 'bold' }}>
                            <Zap size={20} /> OBSERVATORIO LUMÍNICO
                        </div>
                        <div style={{ marginTop: '15px' }}>
                            <h3 style={{ margin: '0 0 5px 0', fontSize: '1.4rem' }}>Cielos Oscuros</h3>
                            <p style={{ margin: 0, color: '#cbd5e1', fontSize: '0.85rem' }}>D.S. 1/2022 del Ministerio del Medio Ambiente. Dispersión lumínica bajo control.</p>
                        </div>
                        <div style={{ marginTop: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '5px', color: '#fcd34d' }}>
                                <span>INCLINACIÓN LUMINARIAS</span>
                                <span>2.1% DISPERSIÓN</span>
                            </div>
                            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ width: '85%', height: '100%', background: 'linear-gradient(90deg, #10b981, #f59e0b)' }}></div>
                            </div>
                        </div>
                    </div>

                    {/* SENSOR 4: MAREAS Y NAVIERA */}
                    <div className="mosaic-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', fontWeight: 'bold' }}>
                            <Droplets size={20} /> MONITOR DE MAREAS
                        </div>
                        <div style={{ textAlign: 'center', margin: '15px 0' }}>
                            <span style={{ fontSize: '2.2rem', fontWeight: '900', color: 'white' }}>MAREA BAJA</span>
                            <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '5px' }}>Sector Avenida del Mar / Faro</div>
                        </div>
                        <div style={{ background: 'rgba(56, 189, 248, 0.1)', borderRadius: '12px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ fontSize: '0.75rem', color: '#e0f2fe' }}>Próxima Pleamar: <br/><strong style={{ fontSize: '1rem' }}>18:45 hrs</strong></div>
                            <Map size={24} color="#38bdf8" />
                        </div>
                    </div>
                </div>
165: 
166:                 {/* ── MOSAICO DE SATÉLITES (HEAVENS-ABOVE CONNECTION) ── */}
167:                 <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
168:                     <Satellite size={24} color="#a855f7" /> TRAYECTORIA ESPACIAL Y SATELITAL (COORD. LA SERENA)
169:                 </h2>
170:                 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
171:                     
172:                     {/* SATELLITE 1: STARLINK TRAIN */}
173:                     <div className="mosaic-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '4px solid #38bdf8' }}>
174:                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
175:                             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', fontWeight: 'bold' }}>
176:                                 <Satellite size={20} /> STARLINK TRAIN
177:                             </div>
178:                             <span style={{ fontSize: '0.7rem', background: '#38bdf820', color: '#38bdf8', padding: '2px 8px', borderRadius: '50px' }}>ACTIVE</span>
179:                         </div>
180:                         <div style={{ margin: '15px 0' }}>
181:                             <p style={{ margin: 0, fontSize: '0.85rem', color: '#cbd5e1' }}>Visualización de ráfagas de satélites SpaceX. Próximo paso visible sobre la bahía.</p>
182:                         </div>
183:                         <a href="https://www.heavens-above.com/StarlinkLaunchPasses.aspx?lat=-29.9027&lng=-71.2520&loc=La+Serena&alt=0&tz=CLST" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
184:                             <button style={{ width: '100%', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid #38bdf840', color: '#38bdf8', padding: '10px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem' }}>
185:                                 VER PASES PRÓXIMOS
186:                             </button>
187:                         </a>
188:                     </div>
189: 
190:                     {/* SATELLITE 2: ISS & TIANGONG */}
191:                     <div className="mosaic-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '4px solid #ef4444' }}>
192:                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
193:                             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', fontWeight: 'bold' }}>
194:                                 <Globe size={20} /> ISS & TIANGONG
195:                             </div>
196:                             <div style={{ width: '10px', height: '10px', background: '#ef4444', borderRadius: '50%', animation: 'pulse-ring 2s infinite' }}></div>
197:                         </div>
198:                         <div style={{ margin: '15px 0' }}>
199:                             <p style={{ margin: 0, fontSize: '0.85rem', color: '#cbd5e1' }}>Estación Espacial Internacional y Estación China. Avistamientos de magnitud negativa.</p>
200:                         </div>
201:                         <div style={{ display: 'flex', gap: '8px' }}>
202:                             <a href="https://www.heavens-above.com/PassSummary.aspx?satid=25544&lat=-29.9027&lng=-71.2520&loc=La+Serena&alt=0&tz=CLST" target="_blank" rel="noopener noreferrer" style={{ flex: 1, textDecoration: 'none' }}>
203:                                 <button style={{ width: '100%', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef444440', color: '#ef4444', padding: '10px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.75rem' }}>ISS</button>
204:                             </a>
205:                             <a href="https://www.heavens-above.com/PassSummary.aspx?satid=48274&lat=-29.9027&lng=-71.2520&loc=La+Serena&alt=0&tz=CLST" target="_blank" rel="noopener noreferrer" style={{ flex: 1, textDecoration: 'none' }}>
206:                                 <button style={{ width: '100%', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '10px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.75rem' }}>TIANGONG</button>
207:                             </a>
208:                         </div>
209:                     </div>
210: 
211:                     {/* SATELLITE 3: HUBBLE & JAMES WEBB */}
212:                     <div className="mosaic-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '4px solid #a855f7' }}>
213:                         <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a855f7', fontWeight: 'bold' }}>
214:                             <Zap size={20} /> TELESCOPIOS
215:                         </div>
216:                         <div style={{ margin: '15px 0' }}>
217:                             <p style={{ margin: 0, fontSize: '0.85rem', color: '#cbd5e1' }}>Monitoreo de Hubble y seguimiento orbital de James Webb. Ciencia espacial en vivo.</p>
218:                         </div>
219:                         <a href="https://www.heavens-above.com/PassSummary.aspx?satid=20580&lat=-29.9027&lng=-71.2520&loc=La+Serena&alt=0&tz=CLST" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
220:                             <button style={{ width: '100%', background: 'rgba(168, 85, 247, 0.1)', border: '1px solid #a855f740', color: '#a855f7', padding: '10px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem' }}>
221:                                 TRACK HUBBLE
222:                             </button>
223:                         </a>
224:                     </div>
225: 
226:                     {/* SATELLITE 4: FASAT-CHALLIE & DELTA (CHILE) */}
227:                     <div className="mosaic-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '4px solid #10b981' }}>
228:                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
229:                             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: 'bold' }}>
230:                                 <Navigation size={20} /> SOCHIAS / FASAT
231:                             </div>
232:                             <span style={{ fontSize: '0.7rem', background: '#10b98120', color: '#10b981', padding: '2px 8px', borderRadius: '50px' }}>NACIONAL</span>
233:                         </div>
234:                         <div style={{ margin: '15px 0' }}>
235:                             <p style={{ margin: 0, fontSize: '0.85rem', color: '#cbd5e1' }}>Últimos satélites del Sistema Nacional Satelital (SNSat). Soberanía espacial chilena.</p>
236:                         </div>
237:                         <div style={{ display: 'flex', gap: '8px' }}>
238:                             <a href="https://www.heavens-above.com/PassSummary.aspx?satid=37938&lat=-29.9027&lng=-71.2520&loc=La+Serena&alt=0&tz=CLST" target="_blank" rel="noopener noreferrer" style={{ flex: 1, textDecoration: 'none' }}>
239:                                 <button style={{ width: '100%', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b98140', color: '#10b981', padding: '10px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.7rem' }}>FASAT-C</button>
240:                             </a>
241:                             <a href="https://www.heavens-above.com/PassSummary.aspx?satid=56985&lat=-29.9027&lng=-71.2520&loc=La+Serena&alt=0&tz=CLST" target="_blank" rel="noopener noreferrer" style={{ flex: 1, textDecoration: 'none' }}>
242:                                 <button style={{ width: '100%', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '10px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.7rem' }}>FASAT-D</button>
243:                             </a>
244:                         </div>
245:                     </div>
246:                 </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                    {/* Mapa Windy Premium */}
                    <div className="mosaic-card" style={{ padding: 0, borderRadius: '24px', overflow: 'hidden', border: '2px solid rgba(56,189,248,0.3)', height: '500px', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ padding: '15px 20px', background: '#020617', borderBottom: '1px solid rgba(56,189,248,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' }}>
                                <Wind size={18} color="#38bdf8" /> MAPA METEOROLÓGICO SATELITAL
                            </div>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <span style={{ fontSize: '0.8rem', background: 'rgba(16,185,129,0.2)', color: '#10b981', padding: '4px 10px', borderRadius: '20px', fontWeight: 'bold' }}>MICRO-TURBINAS ACTIVAS</span>
                            </div>
                        </div>
                        <iframe 
                            src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=°C&metricWind=km/h&zoom=10&overlay=wind&product=ecmwf&level=surface&lat=-29.904&lon=-71.248" 
                            frameBorder="0" 
                            style={{ width: '100%', flex: 1 }}
                            title="SERENAMET Live Map"
                        />
                    </div>

                    {/* Reportes Laterales */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="mosaic-card" style={{ flex: 1 }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Activity size={18} color="#ef4444" /> Panel de Alertas
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {alerts.map((a, i) => (
                                    <div key={i} style={{ background: 'rgba(255,255,255,0.03)', borderLeft: `4px solid ${a.level === 'Precaución' ? '#f59e0b' : '#10b981'}`, padding: '1rem', borderRadius: '0 12px 12px 0' }}>
                                    <div style={{ color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 'bold' }}>{a.area}</div>
                                    <div style={{ fontSize: '1rem', fontWeight: 'bold', margin: '3px 0' }}>{a.type}</div>
                                    <div style={{ color: a.level === 'Precaución' ? '#f59e0b' : '#10b981', fontSize: '0.8rem' }}>{a.level}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button onClick={() => window.history.back()} style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', color: 'white', border: 'none', padding: '15px 20px', borderRadius: '16px', fontWeight: '900', letterSpacing: '1px', cursor: 'pointer', boxShadow: '0 10px 20px rgba(2, 132, 199, 0.4)', transition: 'transform 0.2s', width: '100%' }}>
                            SALIR DEL CENTRO DE MANDO
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
