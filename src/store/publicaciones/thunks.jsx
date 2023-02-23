import { backendApi } from "@/api/backendApi"
import { setList } from "./PublicacionesSlice"

export const get = ( ) => {
    return async( dispatch ) => {
        const response = await backendApi.get('publicaciones/', 
            { 
                headers: {
                    'x-token': localStorage.getItem('token')
                }
            }
        )

        if ( response ) {
            dispatch( setList( response.data.publicaciones) )
            return Promise.resolve(true);
        } else {
            return Promise.resolve(false);
        }
    }
}

export const save = ( publicacion ) => {
    return async( dispatch ) => {
        const response = await backendApi.post('publicaciones/', 
            publicacion,
            { 
                headers: {
                    'x-token': localStorage.getItem('token')
                }
            }
        )

        if ( response ) {
            return Promise.resolve(true);
        } else {
            return Promise.resolve(false);
        }
    }
}

export const remove = (id) => {
    return async( dispatch ) => {
        const response = await backendApi.delete('publicaciones/'+id, { 
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