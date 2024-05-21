import { v4 as uuidv4 } from 'uuid';

import { firebaseConfig, storage } from './config';
import { splitFileName } from '../helpers/files';
import { ref, uploadBytesResumable, deleteObject, listAll } from 'firebase/storage';

export const upload = ( file ) => {
    if ( !file ){
        alert('Please chose a file first!')
    } else {
        const fileRef = ref(storage, `files/${ uuidv4() + '.' +splitFileName( file.name )[1] }`);
        const task = uploadBytesResumable(fileRef, file);

        return task;
    }
}

export const getAll = () => {
    const listRef = ref(storage, '/files/');
    return listAll(listRef)
}

export const remove = async (url) => {
    if ( !url ){
        alert('Please chose a file first!')
    } else {
        try {
            const fileRef = ref(storage, getPathStorageFromUrl(url));
            await deleteObject(fileRef);
            return fileRef;
        } catch ( error ) {
            console.log( error );
            alert('Internal remove Error!')
        }
    }
}

export const getPathStorageFromUrl = (url) => {
    
    const baseUrl = `${firebaseConfig.storageBucket}/o/`;
    let imagePath = url.replace(url.split(baseUrl)[0] + baseUrl,"");
    
    const indexOfEndPath = imagePath.indexOf("?");

    imagePath = imagePath.substring(0,indexOfEndPath);
    imagePath = imagePath.replace(/%2F/g,"/");
    imagePath = imagePath.replace(/%20/g," ");

    return imagePath;
}