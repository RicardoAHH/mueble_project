// firebase.js

// Importa los módulos necesarios de Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Define la configuración de Firebase
const firebaseConfig = {
    // Si la variable de Vite existe, úsala. Si no, usa la de Vercel.
    // Esto hace el código compatible con ambos entornos.
    apiKey: import.meta.env.VITE_API_KEY || process.env.FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN || process.env.FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET || process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID || process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID || process.env.FIREBASE_APP_ID,
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa y exporta los servicios que usarás
export const auth = getAuth(app);
export const db = getFirestore(app);

// Opcional: Si usas Analytics, inicialízalo.
let analytics = null;
if (typeof window !== 'undefined' && firebaseConfig.measurementId) {
    // Inicializa Analytics solo en el navegador
    analytics = getAnalytics(app);
}

export { analytics, app };