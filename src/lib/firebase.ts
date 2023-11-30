// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjRhPE4qXh7Q2ej4tL1MZoBek9iMwtPcY",
  authDomain: "sveltekit-tutorial-25393.firebaseapp.com",
  projectId: "sveltekit-tutorial-25393",
  storageBucket: "sveltekit-tutorial-25393.appspot.com",
  messagingSenderId: "563374494967",
  appId: "1:563374494967:web:6507cbb9cf5ab7e9f82ff2",
  measurementId: "G-9ESWT6LVWR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();