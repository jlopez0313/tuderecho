import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyCX4_cJ581rh-74zBBNzSk6zKp2qh1LV_w",
    authDomain: "tu-derecho-374905.firebaseapp.com",
    projectId: "tu-derecho-374905",
    storageBucket: "tu-derecho-374905.appspot.com",
    messagingSenderId: "570971467616",
    appId: "1:570971467616:web:22ebc31ada2997926ef805"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth }