import React from 'react'
import { subscribe } from '@/services/Videoteca';

export const useVideoteca = () => {

    const doSubscribe = ( id ) => {
        return new Promise( (resolve, reject) => {
            subscribe( id )
            .then( () => {
                resolve(true);
            })
            .catch( error => {
               reject( false )
            })
        })
    }

    return {
        doSubscribe
    }
}
