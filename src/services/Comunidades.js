import { backendApi } from "@/api/backendApi"

const module = 'comunidades/'

export const list = async ( search = '' ) => {
    const response = await backendApi.get(module + search)
    if ( response ) {
        return Promise.resolve( response.data.comunidades );
    } else {
        return Promise.resolve( false );
    }
}

export const myList = async ( search = '' ) => {
    const response = await backendApi.post(module + 'my-list/' + search)
    if ( response ) {
        return Promise.resolve( response.data.comunidades );
    } else {
        return Promise.resolve( false );
    }
}

export const create = async (body) => {
    const response = await backendApi.post(module, body)

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