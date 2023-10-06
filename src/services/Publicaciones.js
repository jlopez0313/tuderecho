import { backendApi } from "@/api/backendApi"

const modulo = 'publicaciones/'

export const list = async ( { comunidad }, page, limit ) => {
    const response = await backendApi.post(modulo + `list?page=${page}&limit=${limit}`, { comunidad })

    if ( response ) {
        return Promise.resolve(response.data.publicaciones);
    } else {
        return Promise.resolve(false);
    }
}

export const find = async (id) => {
    const response = await backendApi.get(modulo + id)

    if ( response ) {
        return Promise.resolve(response.data.publicacion);
    } else {
        return Promise.resolve(false);
    }
}

export const save = async ( body ) => {    
    
    if (!body.post) {
        delete body.post;
    }

    const formData = new FormData();
    Object.keys( body ).forEach( key => {
        if ( key === 'medias' ) {
            for (const file of body[key]) {
                formData.append('files', file) // appending every file to formdata
            }
        } else {
            formData.append( key, body[key] )
        }
    })

    const response = await backendApi.post(modulo, formData)
    console.log(response);

    if ( response ) {
        return Promise.resolve(response.data.saved);
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