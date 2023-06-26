import { backendApi } from "@/api/backendApi"

const modulo = 'tags/'

export const paginate = async (page, perPage) => {
    const response = await backendApi.get( modulo + `paginate?page=${page}&limit=${perPage}` )

    if ( response ) {
        return response.data;
    } else {
        return false;
    }
}

export const all = async () => {
    const response = await backendApi.get(modulo)

    if ( response ) {
        return response.data.tags;
    } else {
        return false;
    }
}

export const find = async (id) => {
    const response = await backendApi.get(modulo + id)

    if ( response ) {
        return Promise.resolve(response.data.tag);
    } else {
        return Promise.resolve(false);
    }
}

export const create = async (name) => {
    const response = await backendApi.post(modulo, { name })

    if ( response ) {
        return Promise.resolve(true);
    } else {
        return Promise.resolve(false);
    }
}

export const update = async(id, name) => {
    const response = await backendApi.put(modulo + id, { name })

    if ( response ) {
        return Promise.resolve(true);
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