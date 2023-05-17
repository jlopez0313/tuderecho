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

export const remove = async (id) => {
    const response = await backendApi.delete(module + id)

    if ( response ) {
        return true;
    } else {
        return false;
    }
}