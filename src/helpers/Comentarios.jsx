import { backendApi } from "@/api/backendApi"

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