// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAd9-6u5NJcKmnCgElFgMfgK0d-uGKXZh8",
  authDomain: "aedi--project.firebaseapp.com",
  projectId: "aedi--project",
  storageBucket: "aedi--project.appspot.com",
  messagingSenderId: "365902896609",
  appId: "1:365902896609:web:61c303e387faa68e5146a0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
