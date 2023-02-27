import { backendApi } from "@/api/backendApi"
import { comunidad, set } from "./ComunidadesSlice"

export const list = () => {
    return async( dispatch ) => {
        const response = await backendApi.get('comunidades/', { 
            headers: {
                'x-token': localStorage.getItem('token')
            }
        })

        if ( response ) {
            dispatch( set( response.data.comunidades ) )
            return Promise.resolve(true);
        } else {
            return Promise.resolve(false);
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