import { backendApi } from "@/api/backendApi"

const modulo = 'tenants/'

export const findByDomain = async ( domain ) => {
    const response = await backendApi.get(modulo + 'domain/' + domain)

    if ( response ) {
        return Promise.resolve(response.data.tenant);
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

export const remove = async (id) => {
    const response = await backendApi.delete(modulo + id)

    if ( response ) {
        return Promise.resolve(true);
    } else {
        return Promise.resolve(false);
    }
}