import { storage } from './config';
import { ref, uploadBytesResumable, listAll } from 'firebase/storage';

export const upload = ( file ) => {
    if ( !file ){
        alert('Please chose a file first!')
    } else {
        const fileRef = ref(storage, `files/${file.name}`);
        const task = uploadBytesResumable(fileRef, file);

        return task;
    }
}

export const getAll = () => {
    const listRef = ref(storage, '/files/');
    return listAll(listRef)
}