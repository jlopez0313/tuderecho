import { ref, set, update, onValue, delete } from "firebase/database";
import { realTimeDb } from './config.js';

function writeData(databaseURL, payload) {    
    return set( ref(realTimeDb, databaseURL), payload );
}

function readData( databaseURL ) {
    const starCountRef = ref(realTimeDb, databaseURL );
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      updateStarCount(postElement, data);
    });
}

function updateData( databaseURL, key, data ) {
    return update( ref(realTimeDb), data);
}

function removeData( databaseURL ) {
    return delete( ref(realTimeDb) );
}