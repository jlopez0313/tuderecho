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
    delete body.preview;
    
    const formData = new FormData();
    Object.keys( body ).forEach( key => {
        formData.append( key, body[key] )
    })
    
    const response = await backendApi.post(module, formData)

    if ( response ) {
        return Promise.resolve(true);
    } else {
        return Promise.resolve(false);
    }
}

export const find = async (id) => {
    const response = await backendApi.get(module + 'find/' + id)

    if ( response ) {
        return Promise.resolve( response.data );
    } else {
        return Promise.resolve(false);
    }
}

export const update = async(id, body) => {
    delete body.preview;
    !body.archivo && delete body.archivo;
    
    const formData = new FormData();
    Object.keys( body ).forEach( key => {
        formData.append( key, body[key] )
    })

    const response = await backendApi.put(module + id, formData)

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

export const subscribe = async (id) => {
    const response = await backendApi.post(module + 'subscribe/' + id)

    if ( response ) {
        return Promise.resolve(true);
    } else {
        return Promise.resolve(false);
    }
}