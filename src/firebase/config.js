import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    /*
    apiKey: "AIzaSyCX4_cJ581rh-74zBBNzSk6zKp2qh1LV_w",
    authDomain: "tu-derecho-374905.firebaseapp.com",
    projectId: "tu-derecho-374905",
    storageBucket: "tu-derecho-374905.appspot.com",
    messagingSenderId: "570971467616",
    appId: "1:570971467616:web:22ebc31ada2997926ef805"
    */
    apiKey: "AIzaSyD_vpEype3pc3EMuDxfenf8QmEmc6cS1x0",
    authDomain: "intense-talent-401205.firebaseapp.com",
    projectId: "intense-talent-401205",
    storageBucket: "intense-talent-401205.appspot.com",
    messagingSenderId: "358042132649",
    appId: "1:358042132649:web:ab38be58b5ef2dd03ac9b8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage(app);
export { firebaseConfig, app, auth, storage }