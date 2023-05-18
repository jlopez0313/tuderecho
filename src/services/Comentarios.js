import { backendApi } from "@/api/backendApi"

const module = 'comentarios/'

export const create = async ( comentario ) => {
    const response = await backendApi.post(module, comentario)

    if ( response ) {
        return response.data.saved;
    } else {
        return false;
    }
}

export const remove = async (id, formData) => {
    const response = await backendApi.delete(module + id, { data: formData } )

    if ( response ) {
        return response.data.publi;
    } else {
        return false;
    }
}