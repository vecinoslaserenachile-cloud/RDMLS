export class ServerlessRadioEngine {
    constructor(playlistUrl = '/radio_playlist.json') {
        this.playlistUrl = playlistUrl;
        this.playlist = null;
        this.isReady = false;
        this.onTrackChange = null;
    }

    async init() {
        try {
            const response = await fetch(this.playlistUrl);
            if (!response.ok) throw new Error('Playlist no encontrada');
            this.playlist = await response.json();
            
            if (!this.playlist.tracks || this.playlist.tracks.length === 0) {
                throw new Error('Playlist vacía');
            }
            this.isReady = true;
            return true;
        } catch (error) {
            console.error('ServerlessRadioEngine Error:', error);
            return false;
        }
    }

    getCurrentState() {
        if (!this.isReady || !this.playlist) return null;

        // Utilizamos el tiempo UTC para que todos los clientes estén sincronizados
        const nowSecs = Math.floor(Date.now() / 1000);
        
        // Determinar la posición actual dentro del bucle total de la playlist
        let currentLoopPosition = nowSecs % this.playlist.totalDuration;
        
        let accumulatedTime = 0;
        let activeTrack = null;
        let trackOffset = 0;
        
        for (let i = 0; i < this.playlist.tracks.length; i++) {
            const track = this.playlist.tracks[i];
            if (currentLoopPosition >= accumulatedTime && currentLoopPosition < accumulatedTime + track.duration) {
                activeTrack = track;
                trackOffset = currentLoopPosition - accumulatedTime;
                break;
            }
            accumulatedTime += track.duration;
        }

        // Fallback por si hay algún error de redondeo
        if (!activeTrack) {
            activeTrack = this.playlist.tracks[0];
            trackOffset = 0;
        }

        const remainingTimeInTrack = activeTrack.duration - trackOffset;

        return {
            track: activeTrack,
            offset: trackOffset,
            remaining: remainingTimeInTrack,
            nowSecs
        };
    }

    getMetadata() {
        const state = this.getCurrentState();
        if (!state) return { title: 'Cargando programación...', artist: 'RDMLS' };
        return {
            title: state.track.title || 'Señal Oficial',
            artist: 'RDMLS',
            song: {
                title: state.track.title || 'Señal Oficial',
                artist: 'RDMLS'
            }
        };
    }
}
