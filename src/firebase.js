// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqWD8jQzJ1gqEJT79EBmlI44AphUJRQ9s",
  authDomain: "dummy1-36202.firebaseapp.com",
  projectId: "dummy1-36202",
  storageBucket: "dummy1-36202.appspot.com",
  messagingSenderId: "889629747823",
  appId: "1:889629747823:web:7f0f7abd8641a98d77bb9a",
  measurementId: "G-V0B6JPDECZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);