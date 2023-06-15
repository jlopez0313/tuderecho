import { backendApi } from "@/api/backendApi"

const module = 'videoteca/'

export const list = async ( search = '', page, limit ) => {
    const response = await backendApi.get(module + search + `?page=${page}&limit=${limit}`)
    if ( response ) {
        return Promise.resolve( response.data.videoteca );
    } else {
        return Promise.resolve( false );
    }
}

export const myList = async ( search = '', page, limit ) => {
    const response = await backendApi.post(module + 'my-list/' + search + `?page=${page}&limit=${limit}`)
    if ( response ) {
        return Promise.resolve( response.data.videoteca );
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

export const update = async (id, body) => {
    const response = await backendApi.put(module + id, body)

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