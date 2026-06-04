// src/utils/soundEffects.js

/**
 * Motor de sonidos procedurales basado en Web Audio API
 * No requiere descargar archivos, reproduce al instante y ocupa 0 KB extra de red.
 */

let audioCtx = null;

const initAudio = () => {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
};

const playTone = (freq, type, duration, vol = 0.1) => {
    initAudio();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    gainNode.gain.setValueAtTime(vol, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + duration);
};

export const playCorrectSound = () => {
    // "Coin / Ding" style
    playTone(987.77, 'sine', 0.1, 0.1); // B5
    setTimeout(() => playTone(1318.51, 'sine', 0.3, 0.1), 100); // E6
};

export const playErrorSound = () => {
    // "Buzzer" style
    playTone(150, 'sawtooth', 0.2, 0.1);
    setTimeout(() => playTone(100, 'sawtooth', 0.3, 0.1), 150);
};

export const playLevelUpSound = () => {
    // Fanfare
    playTone(523.25, 'square', 0.15, 0.1); // C5
    setTimeout(() => playTone(659.25, 'square', 0.15, 0.1), 150); // E5
    setTimeout(() => playTone(783.99, 'square', 0.15, 0.1), 300); // G5
    setTimeout(() => playTone(1046.50, 'square', 0.4, 0.1), 450); // C6
};

export const playStartSound = () => {
    // UI Click or Whoosh
    playTone(800, 'triangle', 0.1, 0.05);
    setTimeout(() => playTone(1200, 'triangle', 0.2, 0.05), 50);
};
