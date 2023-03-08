import { backendApi } from "@/api/backendApi"
import { set, setLoading } from "./VideotecaSlice"

export const myList = ( search = '' ) => {
    return async( dispatch ) => {
        dispatch( setLoading( true ) )

        const response = await backendApi.post(`videoteca/my-list/${search}`, {}, { 
            headers: {
                'x-token': localStorage.getItem('token')
            }
        })

        if ( response ) {
            dispatch( set( response.data.videoteca ) )
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

        const response = await backendApi.get(`videoteca/${search}`, { 
            headers: {
                'x-token': localStorage.getItem('token')
            }
        })

        if ( response ) {
            dispatch( set( response.data.videoteca ) )
            dispatch( setLoading( false ) )

            return Promise.resolve( true );
        } else {
            return Promise.resolve( false );
        }
    }
}

export const create = (body) => {
    return async( dispatch ) => {
        const response = await backendApi.post('videoteca/', body, { 
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
        const response = await backendApi.delete('videoteca/'+id, { 
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