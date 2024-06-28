// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAUfZsUQ_0E7R-LWidqcKABS9lSk0mi48I",
    authDomain: "hackathons2k2.firebaseapp.com",
    projectId: "hackathons2k2",
    storageBucket: "hackathons2k2.appspot.com",
    messagingSenderId: "157796160143",
    appId: "1:157796160143:web:ba543588b85f17394156fa",
    measurementId: "G-KB2HNCQDM6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



const db = getFirestore(app);

export { db };
