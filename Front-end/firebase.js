// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/**
 * must hide it all inside a env variable
 */
const firebaseConfig = {
  apiKey: "AIzaSyBXF6a4EcUqJYXhbsKsKa--Gc3slcPwG-I",
  authDomain: "send-it-1975b.firebaseapp.com",
  projectId: "send-it-1975b",
  storageBucket: "send-it-1975b.firebasestorage.app",
  messagingSenderId: "40086557761",
  appId: "1:40086557761:web:0858461ccb9c4c8c46a2c0",
  measurementId: "G-9SZE4WNX65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };