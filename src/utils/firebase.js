import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// IMPORTANTE: El usuario debe reemplazar estos valores con su configuración de Firebase real
const firebaseConfig = {
    apiKey: "AIzaSyCDUhik-oYwJ-yBkBYAohw6DJct5FQ78w4",
    authDomain: "laserena-d1263.firebaseapp.com",
    projectId: "laserena-d1263",
    storageBucket: "laserena-d1263.firebasestorage.app",
    messagingSenderId: "283725387947",
    appId: "1:283725387947:web:898aa22c80c2fadbe8bfee"
};

// Configuración de Mocks para evitar errores en modo desconectado
const mockAuth = {
    currentUser: null,
    onAuthStateChanged: (cb) => { cb(null); return () => {}; },
    signOut: async () => { return Promise.resolve(); },
    signInWithPopup: async () => { throw new Error('Firebase no configurado'); },
    app: { options: {} }
};

let app = null;
let auth = mockAuth;
let db = { collection: () => ({ doc: () => ({ onSnapshot: () => () => {} }) }) };
let storage = {};

try {
    if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "TU_API_KEY") {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        db = getFirestore(app);
        storage = getStorage(app);
    } else {
        console.warn('Firebase no está configurado (API Key de ejemplo). Usando mocks.');
    }
} catch (error) {
    console.warn('Error inicializando Firebase:', error);
}

export { auth, db, storage, app };

