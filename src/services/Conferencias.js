import { backendApi } from "@/api/backendApi"

const module = 'conferencias/'

export const list = async ( search = '' ) => {
    const response = await backendApi.get(module + search)
    if ( response ) {
        return Promise.resolve( response.data.conferencias );
    } else {
        return Promise.resolve( false );
    }
}

export const myList = async ( search = '' ) => {
    const response = await backendApi.post(module + 'my-list/' + search)
    if ( response ) {
        return Promise.resolve( response.data.conferencias );
    } else {
        return Promise.resolve( false );
    }
}

export const create = async (body) => {
    delete body.preview;
    
    const formData = new FormData();
    Object.keys( body ).forEach( key => {
        formData.append( key, body[key] )
    })

    console.log( body, formData );

    const response = await backendApi.post(module, formData)

    if ( response ) {
        return Promise.resolve(true);
    } else {
        return Promise.resolve(false);
    }
}

export const remove = async (id) => {
    const response = await backendApi.delete(module + id)

    if ( response ) {
        return Promise.resolve(true);
    } else {
        return Promise.resolve(false);
    }
}