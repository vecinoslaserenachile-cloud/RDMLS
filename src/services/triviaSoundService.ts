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

      const response = await fetch('https://raw.githubusercontent.com/vecinoslaserenachile-cloud/juego-serenito/0bfd480e7c9a2ef87c1b9101276a1a10b0c84c9b/Himno.mid');
      const arrayBuffer = await response.arrayBuffer();
      this.midiPlayer.loadArrayBuffer(arrayBuffer);
    } catch (error) {
      console.error('Error loading MIDI:', error);
      throw error;
    } finally {
      this.isMidiLoading = false;
    }
  }

  async playAnthem() {
    try {
      await this.initMidi();
      if (this.midiPlayer) this.midiPlayer.play();
      else throw new Error('MIDI player not initialized');
    } catch (error) {
      this.playAnthemSting(); // Fallback a melodía sintética
    }
  }

  stopAnthem() {
    if (this.midiPlayer) this.midiPlayer.stop();
  }

  playCorrect() {
    this.init();
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(523.25, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.3);
  }

  playWrong() {
    this.init();
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(40, ctx.currentTime + 0.8);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.8);
  }

  playSelect() {
    this.init();
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.1);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.1);
  }

  playSuspense() {
    this.init();
    if (this.droneOsc) return;
    const ctx = this.ctx!;
    this.droneGain = ctx.createGain();
    this.droneGain.gain.setValueAtTime(0, ctx.currentTime);
    this.droneGain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 2);
    this.droneGain.connect(ctx.destination);
    this.droneOsc = ctx.createOscillator();
    this.droneOsc.type = 'sawtooth';
    this.droneOsc.frequency.setValueAtTime(41.20, ctx.currentTime);
    this.droneOsc.connect(this.droneGain);
    this.droneOsc.start();
  }

  stopSuspense() {
    if (this.droneGain) {
      const now = this.ctx!.currentTime;
      this.droneGain.gain.linearRampToValueAtTime(0, now + 1);
      setTimeout(() => {
        this.droneOsc?.stop();
        this.droneOsc = null;
        this.droneGain = null;
      }, 1100);
    }
  }

  playBackgroundMusic() {
    this.init();
    if (this.bgMusicOsc) return;
    const ctx = this.ctx!;
    this.bgMusicGain = ctx.createGain();
    this.bgMusicGain.gain.setValueAtTime(0, ctx.currentTime);
    this.bgMusicGain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 5);
    this.bgMusicGain.connect(ctx.destination);
    this.bgMusicOsc = ctx.createOscillator();
    this.bgMusicOsc.type = 'sine';
    this.bgMusicOsc.frequency.setValueAtTime(164.81, ctx.currentTime);
    this.bgMusicOsc.connect(this.bgMusicGain);
    this.bgMusicOsc.start();
  }

  stopBackgroundMusic() {
    if (this.bgMusicGain) {
      const now = this.ctx!.currentTime;
      this.bgMusicGain.gain.linearRampToValueAtTime(0, now + 2);
      setTimeout(() => {
        this.bgMusicOsc?.stop();
        this.bgMusicOsc = null;
        this.bgMusicGain = null;
      }, 2100);
    }
  }

  playAudience() {
    this.init();
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine'; // Simulated crowd
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
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 1);
  }

  playJump() {
    this.init();
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.2);
  }

  playPrize() {
    this.init();
    const ctx = this.ctx!;
    const now = ctx.currentTime;
    const playNote = (f: number, s: number, d: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now + s);
      gain.gain.setValueAtTime(0.1, now + s);
      gain.gain.linearRampToValueAtTime(0, now + s + d);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(now + s); osc.stop(now + s + d);
    };
    [523.25, 659.25, 783.99, 1046.50].forEach((f, i) => playNote(f, i * 0.1, 0.2));
  }

  playCoin() {
    this.init();
    const ctx = this.ctx!;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(987.77, now);
    osc.frequency.setValueAtTime(1318.51, now + 0.1);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(now + 0.4);
  }

  playAnthemSting() {
    this.init();
    const ctx = this.ctx!;
    const now = ctx.currentTime;
    const playNote = (f: number, s: number, d: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now + s);
      gain.gain.setValueAtTime(0, now + s);
      gain.gain.linearRampToValueAtTime(0.1, now + s + 0.05);
      gain.gain.linearRampToValueAtTime(0, now + s + d);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(now + s); osc.stop(now + s + d);
    };
    [523.25, 659.25, 783.99, 1046.50].forEach((f, i) => playNote(f, i * 0.2, 0.4));
  }
}

export const soundService = new SoundService();
