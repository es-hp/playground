// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, type Auth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeQjEqq-Qq-Xdx6u1kOXq99uiVDn2tIkg",
  authDomain: "hp-test-01-a7e43.firebaseapp.com",
  projectId: "hp-test-01-a7e43",
  storageBucket: "hp-test-01-a7e43.firebasestorage.app",
  messagingSenderId: "738534115240",
  appId: "1:738534115240:web:8efa6e0dd3d8d3a5797f9d",
  measurementId: "G-ZRCG741B5W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth: Auth = getAuth(app);
