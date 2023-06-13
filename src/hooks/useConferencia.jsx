import React from 'react'
import { subscribe } from '@/services/Conferencias';

export const useConferencia = () => {

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
