import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const provider = new GoogleAuthProvider();

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

const gmailLogin = () => {

    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log( user );
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
    });
}

// Initialize Firebase

export { app, auth, gmailLogin }