import MidiPlayer from 'midi-player-js';
import Soundfont from 'soundfont-player';

class SoundService {
  private ctx: AudioContext | null = null;
  private midiPlayer: any = null;
  private soundfontInstrument: any = null;
  private isMidiLoading = false;
  private droneOsc: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;
  private pulseOsc: OscillatorNode | null = null;
  private pulseGain: GainNode | null = null;
  private bgMusicOsc: OscillatorNode | null = null;
  private bgMusicGain: GainNode | null = null;
  private bgMusicOsc2: OscillatorNode | null = null;
  private intensityLfoOsc: OscillatorNode | null = null;

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }

  private async initMidi() {
    this.init();
    if (this.midiPlayer && this.soundfontInstrument) return;
    if (this.isMidiLoading) return;
    this.isMidiLoading = true;

    try {
      this.soundfontInstrument = await Soundfont.instrument(this.ctx!, 'acoustic_grand_piano', {
        soundfont: 'MusyngKite'
      });

      this.midiPlayer = new MidiPlayer.Player((event: any) => {
        if (event.name === 'Note on' && event.velocity > 0) {
          this.soundfontInstrument.play(event.noteName, this.ctx!.currentTime, {
            gain: event.velocity / 127,
          });
        }
      });

      this.midiPlayer.on('endOfFile', () => {
        this.midiPlayer.play();
      });

      const response = await fetch('https://raw.githubusercontent.com/vecinoslaserenachile-cloud/juego-serenito/0bfd480e7c9a2ef87c1b9101276a1a10b0c84c9b/Himno.mid');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const arrayBuffer = await response.arrayBuffer();
      this.midiPlayer.loadArrayBuffer(arrayBuffer);
    } catch (error) {
      console.warn('[SoundService] MIDI load failed, will use synthetic fallback:', error);
      this.midiPlayer = null;
    } finally {
      this.isMidiLoading = false;
    }
  }

  async playAnthem() {
    try {
      await this.initMidi();
      if (this.midiPlayer) {
        this.midiPlayer.stop(); // Reset before play
        this.midiPlayer.play();
      } else {
        this.playAnthemSting(true);
      }
    } catch {
      this.playAnthemSting(true);
    }
  }

  stopAnthem() {
    if (this.midiPlayer) this.midiPlayer.stop();
  }

  playCorrect() {
    this.init();
    const ctx = this.ctx!;
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.15 / (i + 1), now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5 + (i * 0.2));
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(now); osc.stop(now + 2.0);
    });
  }

  playWrong() {
    this.init();
    const ctx = this.ctx!;
    const now = ctx.currentTime;
    [130.81, 185.00].forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.9, now + 1);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(now); osc.stop(now + 1.5);
    });
  }

  playSelect() {
    this.init();
    const ctx = this.ctx!;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.05);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.1, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(now); osc.stop(now + 0.1);
  }

  // Suspense con intensidad variable (0=inicial, 1=semi, 2=máximo)
  playSuspense(intensity: number = 0) {
    this.init();
    if (this.droneOsc) return;
    const ctx = this.ctx!;
    
    // Pitch y volumen escalan con intensidad
    const baseFreq = 55 + intensity * 15; // 55Hz leve → 85Hz máximo
    const baseVol = 0.2 + intensity * 0.12; // 0.2 → 0.44

    this.droneGain = ctx.createGain();
    this.droneGain.gain.setValueAtTime(0, ctx.currentTime);
    this.droneGain.gain.linearRampToValueAtTime(baseVol, ctx.currentTime + 3);
    this.droneGain.connect(ctx.destination);
    
    this.droneOsc = ctx.createOscillator();
    this.droneOsc.type = 'sine';
    this.droneOsc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    this.droneOsc.connect(this.droneGain);
    
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(baseFreq * 1.003, ctx.currentTime);
    osc2.connect(this.droneGain);
    
    this.droneOsc.start();
    osc2.start();
    (this.droneOsc as any)._layer = osc2;

    // En intensidad alta, añadir pulso rítmico
    if (intensity >= 2) {
      const pulseGain = ctx.createGain();
      pulseGain.connect(ctx.destination);
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 2.5; // 2.5 Hz pulsing
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.12;
      lfo.connect(lfoGain);
      lfoGain.connect(pulseGain.gain);
      lfo.start();
      this.intensityLfoOsc = lfo;
    }
  }

  stopSuspense() {
    if (this.droneGain) {
      const now = this.ctx!.currentTime;
      this.droneGain.gain.linearRampToValueAtTime(0, now + 1.5);
      setTimeout(() => {
        this.droneOsc?.stop();
        if ((this.droneOsc as any)?._layer) (this.droneOsc as any)._layer.stop();
        this.intensityLfoOsc?.stop();
        this.droneOsc = null;
        this.droneGain = null;
        this.intensityLfoOsc = null;
      }, 1600);
    }
  }

  // Música de fondo con matices por intensidad (1-5 etapas lógicas)
  playBackgroundMusic(intensity: number = 0) {
    this.init();
    if (this.bgMusicOsc) return;
    const ctx = this.ctx!;

    // Intensidad 0-2: calma; 3: tensión; 4+: épico
    const baseFreq = [110, 123.47, 138.59, 155.56, 174.61][Math.min(intensity, 4)];
    const maxVol = [0.025, 0.03, 0.04, 0.055, 0.07][Math.min(intensity, 4)];

    this.bgMusicGain = ctx.createGain();
    this.bgMusicGain.gain.setValueAtTime(0, ctx.currentTime);
    this.bgMusicGain.gain.linearRampToValueAtTime(maxVol, ctx.currentTime + 4);
    this.bgMusicGain.connect(ctx.destination);

    this.bgMusicOsc = ctx.createOscillator();
    this.bgMusicOsc.type = intensity >= 3 ? 'sawtooth' : 'sine';
    this.bgMusicOsc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    this.bgMusicOsc.connect(this.bgMusicGain);
    this.bgMusicOsc.start();

    // Segunda capa armónica si hay intensidad
    if (intensity >= 2) {
      this.bgMusicOsc2 = ctx.createOscillator();
      this.bgMusicOsc2.type = 'triangle';
      this.bgMusicOsc2.frequency.setValueAtTime(baseFreq * 1.5, ctx.currentTime);
      this.bgMusicOsc2.connect(this.bgMusicGain);
      this.bgMusicOsc2.start();
    }
  }

  stopBackgroundMusic() {
    if (this.bgMusicGain) {
      const now = this.ctx!.currentTime;
      this.bgMusicGain.gain.linearRampToValueAtTime(0, now + 2);
      setTimeout(() => {
        this.bgMusicOsc?.stop();
        this.bgMusicOsc2?.stop();
        this.bgMusicOsc = null;
        this.bgMusicOsc2 = null;
        this.bgMusicGain = null;
      }, 2100);
    }
  }

  playAudience() {
    this.init();
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.1);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 2);
  }

  playPhone() {
    this.init();
    const ctx = this.ctx!;
    const now = ctx.currentTime;
    [440, 480].forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.05, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(now); osc.stop(now + 1);
    });
  }

  playJump() {
    this.init();
    const ctx = this.ctx!;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.3);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.1, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(now); osc.stop(now + 0.3);
  }

  // Fanfarria final de victoria épica (más larga y grandiosa)
  playPrize() {
    this.init();
    const ctx = this.ctx!;
    const now = ctx.currentTime;
    const playNote = (f: number, s: number, d: number) => {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      osc1.type = 'sine';
      osc2.type = 'triangle';
      osc1.frequency.setValueAtTime(f, now + s);
      osc2.frequency.setValueAtTime(f * 1.002, now + s);
      gain.gain.setValueAtTime(0, now + s);
      gain.gain.linearRampToValueAtTime(0.13, now + s + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + s + d);
      osc1.connect(gain); osc2.connect(gain); gain.connect(ctx.destination);
      osc1.start(now + s); osc1.stop(now + s + d);
      osc2.start(now + s); osc2.stop(now + s + d);
    };
    // Fanfarria extendida – 8 notas ascendentes
    [392, 440, 523.25, 587.33, 659.25, 783.99, 880, 1046.50].forEach((f, i) => playNote(f, i * 0.15, 2.0));
  }

  playCoin() {
    this.init();
    const ctx = this.ctx!;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.setValueAtTime(1600, now + 0.05);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.1, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(now); osc.stop(now + 0.5);
  }

  // Himno sintético extendido (fallback si el MIDI falla)
  playAnthemSting(extended: boolean = false) {
    this.init();
    const ctx = this.ctx!;
    const now = ctx.currentTime;
    const playNote = (f: number, s: number, d: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now + s);
      gain.gain.setValueAtTime(0, now + s);
      gain.gain.linearRampToValueAtTime(0.12, now + s + 0.05);
      gain.gain.linearRampToValueAtTime(0, now + s + d);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(now + s); osc.stop(now + s + d);
    };
    if (extended) {
      // Melodía extendida
      const melody = [392, 440, 523, 587, 523, 440, 392, 330, 392, 440, 523, 659, 784, 659, 523, 440];
      melody.forEach((f, i) => playNote(f, i * 0.25, 0.5));
    } else {
      [523.25, 659.25, 783.99, 1046.50].forEach((f, i) => playNote(f, i * 0.2, 0.4));
    }
  }
  // Detener todo (limpieza total)
  stopAll() {
    this.stopSuspense();
    this.stopBackgroundMusic();
    this.stopAnthem();
    if (this.ctx) {
        this.ctx.suspend().catch(() => {});
    }
  }
}

export const soundService = new SoundService();
