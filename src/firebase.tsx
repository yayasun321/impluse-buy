import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAdVD9R48VtkNv-rm1C3uZiWYK5y2MXqb8",
  authDomain: "ecopulse-planned-obsolescence.firebaseapp.com",
  projectId: "ecopulse-planned-obsolescence",
  storageBucket: "ecopulse-planned-obsolescence.firebasestorage.app",
  messagingSenderId: "945821855013",
  appId: "1:945821855013:web:a63861fe1b5c39f2873ecc",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
