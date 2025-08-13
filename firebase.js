// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // <-- Importa el servicio de autenticación
import { getFirestore } from "firebase/firestore"; // <-- Importa el servicio de base de datos

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD_UpeLOeKYvkapNqLyV8FkGo7Bde2-mbw",
    authDomain: "carpinteria-hernandez-react.firebaseapp.com",
    projectId: "carpinteria-hernandez-react",
    storageBucket: "carpinteria-hernandez-react.firebasestorage.app",
    messagingSenderId: "697898873377",
    appId: "1:697898873377:web:71c7866cf8ae427c16a960",
    measurementId: "G-3PFKD8V0NJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// Inicializa y exporta los servicios que usarás
export const auth = getAuth(app);
export const db = getFirestore(app); // <-- Ahora 'db' es tu instancia de Firestore
export { analytics };