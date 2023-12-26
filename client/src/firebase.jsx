// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-a9879.firebaseapp.com",
  projectId: "mern-estate-a9879",
  storageBucket: "mern-estate-a9879.appspot.com",
  messagingSenderId: "619429795626",
  appId: "1:619429795626:web:75bdb92f0b84e23df3b053"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app