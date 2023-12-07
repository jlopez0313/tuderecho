import { backendApi } from "@/api/backendApi"

const modulo = 'settings/'

export const find = async () => {
    const response = await backendApi.get(modulo)

    if ( response ) {
        return Promise.resolve( response.data );
    } else {
        return Promise.resolve(false);
    }
}

export const update = async (form) => {
    const response = await backendApi.put(modulo, form)

    if ( response ) {
        return Promise.resolve( response.data );
    } else {
        return Promise.resolve(false);
    }
}