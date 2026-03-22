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

let app, auth, db, storage;

try {
    if (firebaseConfig.apiKey !== "TU_API_KEY") {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        db = getFirestore(app);
        storage = getStorage(app);
    } else {
        console.warn('Firebase no está configurado. Usando mocks temporales para evitar que la app se caiga.');
        app = {};
        auth = { currentUser: null };
        db = {};
        storage = {};
    }
} catch (error) {
    console.warn('Error inicializando Firebase:', error);
}

export { auth, db, storage };

