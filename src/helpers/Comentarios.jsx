import { backendApi } from "@/api/backendApi"

export const create = async ( comentario ) => {
    const response = await backendApi.post('comentarios/', 
        comentario,
        { 
            headers: {
                'x-token': localStorage.getItem('token')
            }
        }
    )

    if ( response ) {
        return response.data.saved;
    } else {
        return false;
    }
}

export const remove = async (id) => {
    const response = await backendApi.delete('comentarios/'+id, { 
        headers: {
            'x-token': localStorage.getItem('token')
        }
    })

    if ( response ) {
        // dispatch( list() )
        return true;
    } else {
        return false;
    }
}