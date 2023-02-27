import { backendApi } from "@/api/backendApi"
import { set } from "./VideotecaSlice"

export const list = () => {
    return async( dispatch ) => {
        const response = await backendApi.get('videoteca/', { 
            headers: {
                'x-token': localStorage.getItem('token')
            }
        })

        if ( response ) {
            dispatch( set( response.data.videoteca ) )
            return Promise.resolve(true);
        } else {
            return Promise.resolve(false);
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