import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Radio, Shuffle, SkipForward, SkipBack, Play, Pause, Volume2, ExternalLink, List, Heart, Zap, X, LogIn } from 'lucide-react';

// ── SPOTIFY CONFIG ────────────────────────────────────────────────────────────
// Para habilitar: registra la app en https://developer.spotify.com/dashboard
// y pon el Client ID y Redirect URI correcto
const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID || 'TU_SPOTIFY_CLIENT_ID';
const REDIRECT_URI = window.location.origin + '/spotify-callback';
const SCOPES = [
    'streaming',
    'user-read-email',
    'user-read-private',
    'user-library-read',
    'user-read-playback-state',
    'user-modify-playback-state',
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-top-read',
    'user-recently-played'
].join(' ');

const loginWithSpotify = () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}&show_dialog=true`;
    window.location.href = authUrl;
};

const getTokenFromUrl = () => {
    const hash = window.location.hash;
    if (!hash) return null;
    const params = new URLSearchParams(hash.substring(1));
    return params.get('access_token');
};

// ── SPOTIFY API HELPERS ───────────────────────────────────────────────────────
const spotifyFetch = async (endpoint, token) => {
    const res = await fetch(`https://api.spotify.com/v1${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error(`Spotify API ${res.status}`);
    return res.json();
};

export default function SpotifyRadioVLS({ onClose }) {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [playlists, setPlaylists] = useState([]);
    const [topTracks, setTopTracks] = useState([]);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [mode, setMode] = useState('playlists'); // playlists | top | radio
    const [volume, setVolume] = useState(0.8);
    const [radioName, setRadioName] = useState('VLS Radio Personal');
    const [isLive, setIsLive] = useState(false);
    const playerRef = useRef(null);
    const sdkReadyRef = useRef(false);

    // ── INIT: get token from URL hash ─────────────────────────────────────────
    useEffect(() => {
        const urlToken = getTokenFromUrl();
        if (urlToken) {
            setToken(urlToken);
            window.history.pushState({}, document.title, window.location.pathname);
            localStorage.setItem('vls_spotify_token', urlToken);
        } else {
            const saved = localStorage.getItem('vls_spotify_token');
            if (saved) setToken(saved);
        }
    }, []);

    // ── LOAD USER DATA ────────────────────────────────────────────────────────
    useEffect(() => {
        if (!token) return;
        const load = async () => {
            try {
                const [userData, playlistData, topData] = await Promise.all([
                    spotifyFetch('/me', token),
                    spotifyFetch('/me/playlists?limit=20', token),
                    spotifyFetch('/me/top/tracks?limit=30&time_range=medium_term', token)
                ]);
                setUser(userData);
                setPlaylists(playlistData.items);
                setTopTracks(topData.items);
                if (topData.items.length > 0) setCurrentTrack(topData.items[0]);
            } catch (e) {
                console.warn('Spotify token expirado:', e);
                localStorage.removeItem('vls_spotify_token');
                setToken(null);
            }
        };
        load();
    }, [token]);

    // ── INIT SPOTIFY WEB PLAYBACK SDK ──────────────────────────────────────────
    useEffect(() => {
        if (!token || sdkReadyRef.current) return;
        const script = document.createElement('script');
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        script.async = true;
        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: radioName,
                getOAuthToken: cb => cb(token),
                volume
            });
            player.addListener('player_state_changed', state => {
                if (!state) return;
                setIsPlaying(!state.paused);
                const track = state.track_window?.current_track;
                if (track) setCurrentTrack({
                    name: track.name,
                    artists: [{ name: track.artists[0].name }],
                    album: { images: [{ url: track.album.images[0].url }] },
                    duration_ms: track.duration_ms
                });
            });
            player.connect().then(success => {
                if (success) { playerRef.current = player; sdkReadyRef.current = true; }
            });
        };
        return () => { playerRef.current?.disconnect(); };
    }, [token]);

    const playTrack = async (uri) => {
        if (!playerRef.current) return;
        const deviceRes = await spotifyFetch('/me/player/devices', token);
        const device = deviceRes.devices?.find(d => d.name === radioName);
        if (!device) return;
        await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device.id}`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ uris: [uri] })
        });
    };

    const togglePlay = () => playerRef.current?.[isPlaying ? 'pause' : 'resume']();

    // ── RENDER ────────────────────────────────────────────────────────────────
    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10000002, background: 'linear-gradient(135deg, #191414, #121212)', color: 'white', display: 'flex', flexDirection: 'column', fontFamily: "'Outfit', sans-serif" }}>
            
            {/* HEADER */}
            <div style={{ background: 'rgba(30,215,96,0.1)', padding: '1.5rem 3rem', borderBottom: '2px solid #1DB954', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ background: '#1DB954', padding: '12px', borderRadius: '50%' }}>
                        <Music size={26} color="#000" />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: '900' }}>VLS SPOTIFY RADIO</h2>
                        <span style={{ fontSize: '0.7rem', color: '#1DB954', letterSpacing: '2px' }}>
                            {user ? `🎵 ${user.display_name} · ${user.product?.toUpperCase()}` : 'SEÑAL PERSONAL · vecinoslaserena.cl'}
                        </span>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    {isLive && (
                        <div style={{ background: '#ef4444', padding: '6px 15px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', animation: 'pulse 1.5s infinite' }}>
                            ● EN VIVO
                        </div>
                    )}
                    <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '10px', borderRadius: '50%', cursor: 'pointer' }}>
                        <X size={18} />
                    </button>
                </div>
            </div>

            {/* BODY */}
            {!token ? (
                /* LOGIN SCREEN */
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem', padding: '4rem' }}>
                    <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 3 }}
                        style={{ width: '150px', height: '150px', background: '#1DB954', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 60px rgba(29,185,84,0.4)' }}>
                        <Music size={80} color="#000" />
                    </motion.div>
                    <h2 style={{ fontSize: '2.5rem', textAlign: 'center', margin: 0 }}>Tu música.<br/>Nuestra radio.</h2>
                    <p style={{ color: '#b3b3b3', textAlign: 'center', maxWidth: '500px', lineHeight: '1.6' }}>
                        Conecta tu cuenta Spotify Premium y conviértela en una señal de radio vecinal en vivo. 
                        Tus playlists favoritas sonarán en <strong>vecinoslaserena.cl</strong>.
                    </p>
                    <motion.button whileHover={{ scale: 1.05 }} onClick={loginWithSpotify}
                        style={{ background: '#1DB954', color: '#000', border: 'none', padding: '1.2rem 3rem', borderRadius: '50px', fontSize: '1.2rem', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 10px 30px rgba(29,185,84,0.3)' }}>
                        <LogIn size={22} /> CONECTAR SPOTIFY PREMIUM
                    </motion.button>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem', maxWidth: '600px', width: '100%', marginTop: '1rem' }}>
                        {[
                            { icon: Radio, title: 'Radio en Vivo', desc: 'Transmite tu playlist a todos los vecinos' },
                            { icon: Shuffle, title: 'Mix Inteligente', desc: 'IA recomienda según tu gusto musical' },
                            { icon: Heart, title: 'Música del Valle', desc: 'Prioriza artistas y géneros de La Serena' },
                        ].map((f, i) => (
                            <div key={i} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '1.5rem', textAlign: 'center', border: '1px solid rgba(29,185,84,0.2)' }}>
                                <f.icon color="#1DB954" size={30} style={{ marginBottom: '10px' }} />
                                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{f.title}</div>
                                <div style={{ fontSize: '0.8rem', color: '#b3b3b3' }}>{f.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                /* CONNECTED PLAYER */
                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '300px 1fr', overflow: 'hidden' }}>
                    {/* SIDEBAR */}
                    <div style={{ borderRight: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                        <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                            {[['playlists','Listas'], ['top','Top'], ['radio','Radio']].map(([m, label]) => (
                                <button key={m} onClick={() => setMode(m)} style={{ flex: 1, padding: '12px', background: mode === m ? 'rgba(29,185,84,0.2)' : 'transparent', border: 'none', color: mode === m ? '#1DB954' : '#b3b3b3', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.8rem' }}>
                                    {label}
                                </button>
                            ))}
                        </div>
                        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
                            {mode === 'playlists' && playlists.map(p => (
                                <div key={p.id} onClick={() => playTrack(`spotify:playlist:${p.id}`)}
                                    style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '8px', borderRadius: '8px', cursor: 'pointer', marginBottom: '4px' }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                    <img src={p.images?.[0]?.url || '/vls-logo-3d.png'} style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }} alt={p.name} />
                                    <div style={{ overflow: 'hidden' }}>
                                        <div style={{ fontSize: '0.85rem', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                                        <div style={{ fontSize: '0.7rem', color: '#b3b3b3' }}>{p.tracks?.total} canciones</div>
                                    </div>
                                </div>
                            ))}
                            {mode === 'top' && topTracks.map((t, i) => (
                                <div key={t.id} onClick={() => { setCurrentTrack(t); playTrack(t.uri); }}
                                    style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '8px', borderRadius: '8px', cursor: 'pointer', background: currentTrack?.id === t.id ? 'rgba(29,185,84,0.15)' : 'transparent' }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
                                    onMouseLeave={e => e.currentTarget.style.background = currentTrack?.id === t.id ? 'rgba(29,185,84,0.15)' : 'transparent'}>
                                    <span style={{ color: '#b3b3b3', fontSize: '0.75rem', width: '20px', textAlign: 'right' }}>{i + 1}</span>
                                    <img src={t.album.images?.[0]?.url} style={{ width: '35px', height: '35px', borderRadius: '4px' }} alt={t.name} />
                                    <div style={{ overflow: 'hidden' }}>
                                        <div style={{ fontSize: '0.82rem', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: currentTrack?.id === t.id ? '#1DB954' : 'white' }}>{t.name}</div>
                                        <div style={{ fontSize: '0.7rem', color: '#b3b3b3', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.artists.map(a => a.name).join(', ')}</div>
                                    </div>
                                </div>
                            ))}
                            {mode === 'radio' && (
                                <div style={{ padding: '1rem' }}>
                                    <h4 style={{ color: '#1DB954', marginBottom: '1rem' }}>📡 VLS Radio en Vivo</h4>
                                    <input value={radioName} onChange={e => setRadioName(e.target.value)} placeholder="Nombre de tu emisora" style={{ width: '100%', background: 'rgba(255,255,255,0.1)', border: '1px solid #1DB954', color: 'white', padding: '10px', borderRadius: '10px', marginBottom: '1rem', boxSizing: 'border-box' }} />
                                    <button onClick={() => setIsLive(!isLive)} style={{ width: '100%', background: isLive ? '#ef4444' : '#1DB954', border: 'none', color: isLive ? 'white' : '#000', padding: '12px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                                        {isLive ? '⏹ DETENER TRANSMISIÓN' : '● INICIAR RADIO EN VIVO'}
                                    </button>
                                    {isLive && <p style={{ color: '#1DB954', fontSize: '0.8rem', textAlign: 'center', marginTop: '10px' }}>🔴 Transmitiendo en vecinoslaserena.cl/radio</p>}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* MAIN PLAYER */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem', gap: '2rem' }}>
                        {currentTrack && (
                            <>
                                <motion.img animate={{ rotate: isPlaying ? 360 : 0 }} transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                                    src={currentTrack.album?.images?.[0]?.url || '/vls-logo-3d.png'}
                                    style={{ width: '220px', height: '220px', borderRadius: '50%', boxShadow: '0 0 60px rgba(29,185,84,0.3)', objectFit: 'cover', border: '4px solid #1DB954' }} alt="Album" />
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.6rem', fontWeight: '900' }}>{currentTrack.name}</div>
                                    <div style={{ color: '#b3b3b3', fontSize: '1rem' }}>{currentTrack.artists?.map(a => a.name).join(', ')}</div>
                                </div>
                                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                                    <button onClick={() => playerRef.current?.previousTrack()} style={{ background: 'none', border: 'none', color: '#b3b3b3', cursor: 'pointer' }}><SkipBack size={32} /></button>
                                    <button onClick={togglePlay} style={{ background: '#1DB954', border: 'none', color: '#000', width: '60px', height: '60px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                                    </button>
                                    <button onClick={() => playerRef.current?.nextTrack()} style={{ background: 'none', border: 'none', color: '#b3b3b3', cursor: 'pointer' }}><SkipForward size={32} /></button>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', width: '300px' }}>
                                    <Volume2 color="#b3b3b3" size={18} />
                                    <input type="range" min="0" max="1" step="0.01" value={volume} onChange={e => { setVolume(parseFloat(e.target.value)); playerRef.current?.setVolume(parseFloat(e.target.value)); }}
                                        style={{ flex: 1, accentColor: '#1DB954' }} />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            <style>{`@keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }`}</style>
        </div>
    );
}
