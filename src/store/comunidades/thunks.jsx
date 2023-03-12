import { backendApi } from "@/api/backendApi"
import { comunidad, set, setLoading } from "./ComunidadesSlice"

export const myList = ( search = '' ) => {
    return async( dispatch ) => {
        dispatch( setLoading( true ) )

        const response = await backendApi.post(`comunidades/my-list/${search}`, {}, { 
            headers: {
                'x-token': localStorage.getItem('token')
            }
        })

        dispatch( setLoading( false ) )

        if ( response ) {
            dispatch( set( response.data.comunidades ) )
            return Promise.resolve( true );
        } else {
            return Promise.resolve( false );
        }
    }
}

export const list = ( search = '' ) => {
    return async( dispatch ) => {
        dispatch( setLoading( true ) )

        const response = await backendApi.get(`comunidades/${search}`, { 
            headers: {
                'x-token': localStorage.getItem('token')
            }
        })

        dispatch( setLoading( false ) )

        if ( response ) {
            dispatch( set( response.data.comunidades ) )            
            return Promise.resolve( true );
        } else {
            return Promise.resolve( false );
        }
    }
}

export const create = (body) => {
    return async( dispatch ) => {
        const response = await backendApi.post('comunidades/', body, { 
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
        const response = await backendApi.delete('comunidades/'+id, { 
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