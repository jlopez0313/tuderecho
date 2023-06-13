import React from 'react'

import { subscribe } from '@/services/Comunidades';


export const useComunidad = () => {

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
