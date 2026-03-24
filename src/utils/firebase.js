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

// Use a truly unique name for the portal app to avoid collisions with [DEFAULT]
const PORTAL_APP_NAME = "vls-master-portal";

let app;

try {
  // Try to find the app by name first
  app = getApps().find(a => a.name === PORTAL_APP_NAME);
  if (!app) {
    app = initializeApp(firebaseConfig, PORTAL_APP_NAME);
  }
} catch (error) {
  console.error("Firebase Critical Init Error:", error);
  // Fallback to default app if name-based init fails
  if (getApps().length > 0) {
    app = getApp();
  } else {
    app = initializeApp(firebaseConfig);
  }
}

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage, app };
