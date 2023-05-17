import { backendApi } from "@/api/backendApi"

const modulo = 'tags/'

export const all = async () => {
    const response = await backendApi.get(modulo)

    if ( response ) {
        return response.data.tags.sort( (a, b) => a.name > b.name ? 1: -1  );
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