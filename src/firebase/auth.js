import { auth } from './config';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export const GmailLogin = () => {
    const provider = new GoogleAuthProvider();

    return new Promise( (resolve, reject) => {
        signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            resolve( user );
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            reject( error );
        });
    })

}