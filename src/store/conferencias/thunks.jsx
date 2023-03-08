import { backendApi } from "@/api/backendApi"
import { conferencia, set, setLoading } from "./ConferenciaSlice"

export const myList = ( search = '' ) => {
    return async( dispatch ) => {
        dispatch( setLoading( true ) )

        const response = await backendApi.post(`conferencias/my-list/${search}`, {}, { 
            headers: {
                'x-token': localStorage.getItem('token')
            }
        })

        if ( response ) {
            dispatch( set( response.data.conferencias ) )
            dispatch( setLoading( false ) )

            return Promise.resolve( true );
        } else {
            return Promise.resolve( false );
        }
    }
}

export const list = ( search = '' ) => {
    return async( dispatch ) => {
        dispatch( setLoading( true ) )

        const response = await backendApi.get(`conferencias/${search}`, { 
            headers: {
                'x-token': localStorage.getItem('token')
            }
        })

        if ( response ) {
            dispatch( set( response.data.conferencias ) )
            dispatch( setLoading( false ) )

            return Promise.resolve( true );
        } else {
            return Promise.resolve( false );
        }
    }
}

export const create = (body) => {
    return async( dispatch ) => {
        const response = await backendApi.post('conferencias/', body, { 
            headers: {
                'x-token': localStorage.getItem('token')
            }
        })

        if ( response ) {
            // dispatch( list() )
            return Promise.resolve(true);
        } else {
            return Promise.resolve(false);
        }
    }
}

export const remove = (id) => {
    return async( dispatch ) => {
        const response = await backendApi.delete('conferencias/'+id, { 
            headers: {
                'x-token': localStorage.getItem('token')
            }
        })

        if ( response ) {
            // dispatch( list() )
            return Promise.resolve(true);
        } else {
            return Promise.resolve(false);
        }
    }
}