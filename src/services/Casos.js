import { backendApi } from "@/api/backendApi"

const module = 'casos/'

export const create = async ( caso ) => {
    const response = await backendApi.post(module, caso)

    if ( response ) {
        return response.data.saved;
    } else {
        return false;
    }
}

export const remove = async (id) => {
    const response = await backendApi.delete(module + id)

    if ( response ) {
        return response.data.publi;
    } else {
        return false;
    }
}