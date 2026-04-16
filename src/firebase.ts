// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdVD9R48VtkNv-rm1C3uZiWYK5y2MXqb8",
  authDomain: "ecopulse-planned-obsolescence.firebaseapp.com",
  projectId: "ecopulse-planned-obsolescence",
  storageBucket: "ecopulse-planned-obsolescence.firebasestorage.app",
  messagingSenderId: "945821855013",
  appId: "1:945821855013:web:a63861fe1b5c39f2873ecc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);