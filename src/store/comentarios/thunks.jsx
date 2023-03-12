import { backendApi } from "@/api/backendApi"
import { setList, setLoading } from "./ComentariosSlice"

export const get = ( ) => {
    return async( dispatch ) => {
        dispatch( setLoading( true ) )
        const response = await backendApi.get('comentarios/', 
            { 
                headers: {
                    'x-token': localStorage.getItem('token')
                }
            }
        )

        dispatch( setLoading( false ) )

        if ( response ) {
            dispatch( setList( response.data.comentarios) )
            return Promise.resolve(true);
        } else {
            return Promise.resolve(false);
        }
    }
}

export const create = ( comentario ) => {
    return async( dispatch ) => {
        const response = await backendApi.post('comentarios/', 
            comentario,
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
        const response = await backendApi.delete('comentarios/'+id, { 
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