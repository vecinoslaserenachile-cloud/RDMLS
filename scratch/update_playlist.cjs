const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/components/ArchiRadioPlayer.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const newPlaylist = `const ARCHI_PLAYLIST = [
  {
    id: 1,
    title: 'Aire',
    artist: 'Locución ARCHI',
    file: '/archi-media/audio/Aire.MP3',
    duration: null,
    category: 'Locución',
  },
  {
    id: 2,
    title: 'Súmate Lista Nueva Energía',
    artist: 'ARCHI Nueva Energía',
    file: '/archi-media/audio/Súmate Lista Nueva Energía.mp3',
    duration: null,
    category: 'Jingle',
  },
  {
    id: 3,
    title: 'Primer Mujer Presi',
    artist: 'Solange Gómez',
    file: '/archi-media/audio/Primer Mujer Presi.mp3',
    duration: null,
    category: 'Spot',
  },
  {
    id: 4,
    title: 'Voz de Chile',
    artist: 'Locución ARCHI',
    file: '/archi-media/audio/voz de chile.MP3',
    duration: null,
    category: 'Locución',
  },
  {
    id: 5,
    title: 'La más transparente',
    artist: 'ARCHI Nueva Energía',
    file: '/archi-media/audio/La más transparente.mp3',
    duration: null,
    category: 'Spot',
  },
  {
    id: 6,
    title: 'La Antena de todo Chile',
    artist: 'ARCHI Nueva Energía',
    file: '/archi-media/audio/La Antena de todo Chile.mp3',
    duration: null,
    category: 'Spot',
  },
  {
    id: 7,
    title: 'Nueva E',
    artist: 'Locución ARCHI',
    file: '/archi-media/audio/Nueva E.MP3',
    duration: null,
    category: 'Locución',
  },
  {
    id: 8,
    title: 'La ARChi vamos',
    artist: 'ARCHI Nueva Energía',
    file: '/archi-media/audio/La ARChi vamos.mp3',
    duration: null,
    category: 'Jingle',
  },
  {
    id: 9,
    title: 'Motor Emergencia',
    artist: 'ARCHI Nueva Energía',
    file: '/archi-media/audio/Motor Emergencia.mp3',
    duration: null,
    category: 'Spot',
  },
  {
    id: 10,
    title: 'Cambia E',
    artist: 'Locución ARCHI',
    file: '/archi-media/audio/Cambia E.MP3',
    duration: null,
    category: 'Locución',
  },
  {
    id: 11,
    title: 'Nunca están de vacaciones',
    artist: 'ARCHI Nueva Energía',
    file: '/archi-media/audio/Nunca están de vacaciones.mp3',
    duration: null,
    category: 'Spot',
  },
  {
    id: 12,
    title: 'Radio del Futuro',
    artist: 'ARCHI Nueva Energía',
    file: '/archi-media/audio/Radio del Futuro.mp3',
    duration: null,
    category: 'Spot',
  },
  {
    id: 13,
    title: 'Súmate',
    artist: 'Locución ARCHI',
    file: '/archi-media/audio/súmate.MP3',
    duration: null,
    category: 'Locución',
  },
  {
    id: 14,
    title: 'ARCHI NUEVA CUECA ENERGÍA',
    artist: 'ARCHI Nueva Energía',
    file: '/archi-media/audio/ARCHI NUEVA CUECA ENERGÍA.mp3',
    duration: null,
    category: 'Jingle',
  },
  {
    id: 15,
    title: 'Escudo de Chile',
    artist: 'ARCHI Nueva Energía',
    file: '/archi-media/audio/Escudo de Chile.mp3',
    duration: null,
    category: 'Himno',
  },
  {
    id: 16,
    title: 'Expe',
    artist: 'Locución ARCHI',
    file: '/archi-media/audio/Expe.MP3',
    duration: null,
    category: 'Locución',
  },
  {
    id: 17,
    title: 'Motor Nueva E Radio',
    artist: 'ARCHI Nueva Energía',
    file: '/archi-media/audio/Motor Nueva E Radio.mp3',
    duration: null,
    category: 'Spot',
  },
  {
    id: 18,
    title: 'Frecuencia Solanch',
    artist: 'ARCHI Nueva Energía',
    file: '/archi-media/audio/Frecuencia Solanch.mp3',
    duration: null,
    category: 'Jingle',
  },
  {
    id: 19,
    title: 'Tango ARCHI',
    artist: 'ARCHI Nueva Energía',
    file: '/archi-media/audio/Tango ARCHI.mp3',
    duration: null,
    category: 'Jingle',
  },
  {
    id: 20,
    title: 'Cambiarchi',
    artist: 'ARCHI Nueva Energía',
    file: '/archi-media/audio/Cambiarchi.mp3',
    duration: null,
    category: 'Jingle',
  }
];`;

const regex = /const ARCHI_PLAYLIST = \[[\s\S]*?\];/;
content = content.replace(regex, newPlaylist);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Playlist updated successfully.');
