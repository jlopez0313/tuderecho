import { backendApi } from "@/api/backendApi"

const modulo = 'usuarios/'

export const paginate = async (page, perPage) => {
    const response = await backendApi.get(modulo + `paginate?page=${page}&limit=${perPage}`)

    if ( response ) {
        return response.data;
    } else {
        return Promise.resolve(false);
    }
}

export const all = async () => {
    const response = await backendApi.get(modulo)

    if ( response ) {
        return response.data.usuarios;
    } else {
        return Promise.resolve(false);
    }
}

export const find = async (id) => {
    const response = await backendApi.get(modulo + id)

    if ( response ) {
        return Promise.resolve( response.data );
    } else {
        return Promise.resolve(false);
    }
}

export const update = async (id, user) => {
    const response = await backendApi.put(modulo + id, user)

    if ( response ) {
        return Promise.resolve( response.data );
    } else {
        return Promise.resolve(false);
    }
}

export const remove = async (id) => {
    const response = await backendApi.delete(modulo + id)

    if ( response ) {
        return Promise.resolve(true);
    } else {
        return Promise.resolve(false);
    }
}

export const passwords = async (user) => {
    const response = await backendApi.post(modulo + 'passwords', user)

    if ( response ) {
        return Promise.resolve( response );
    } else {
        return Promise.resolve(false);
    }
}

export const recovery = async (email) => {
    const response = await backendApi.post(modulo + 'recovery', { email })

    if ( response ) {
        return Promise.resolve( response );
    } else {
        return Promise.resolve(false);
    }
}