// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBal6hProAv6oQRzUQDik2qamX2A2SvQTo",
    authDomain: "project-management-syste-9ff6d.firebaseapp.com",
    projectId: "project-management-syste-9ff6d",
    storageBucket: "project-management-syste-9ff6d.appspot.com",
    messagingSenderId: "75634005498",
    appId: "1:75634005498:web:e1ddb1583d9437514b8043",
    measurementId: "G-F6VSRLBS2Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);


const firebaseApp = {firestore}
export default firebaseApp;
