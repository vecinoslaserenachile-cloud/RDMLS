import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCDUhik-oYwJ-yBkBYAohw6DJct5FQ78w4",
    authDomain: "laserena-d1263.firebaseapp.com",
    projectId: "laserena-d1263",
    storageBucket: "laserena-d1263.firebasestorage.app",
    messagingSenderId: "283725387947",
    appId: "1:283725387947:web:898aa22c80c2fadbe8bfee"
};

let app;

// Use a try-catch pattern and explicit checks to avoid collisions in production HMR or multi-load scenarios
try {
  if (getApps().length > 0) {
    app = getApp();
  } else {
    app = initializeApp(firebaseConfig);
  }
} catch (error) {
  console.warn("Firebase already initialized, retrieving existing app instance.");
  app = getApp();
}

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage, app };
