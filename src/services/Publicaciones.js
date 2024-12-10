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

    const headers = {
        'Content-Type': 'multipart/form-data',
    }

    const response = await backendApi.post(modulo, formData, { headers })
    console.log(response);

    if ( response ) {
        return Promise.resolve(response.data.saved);
    } else {
        return Promise.resolve(false);
    }
}

export const update = async ( id, body ) => {    
    
    if (!body.post) {
        delete body.post;
    }

    const formData = new FormData();
    Object.keys( body ).forEach( key => {
        if ( key === 'medias' ) {
            for (const file of body[key]) {
                if ( typeof file == 'string' ) {
                    formData.append('old_files', file)
                } else {
                    formData.append('files', file) // appending every file to formdata
                }
            }
        } else {
            formData.append( key, body[key] )
        }
    })

    const headers = {
        'Content-Type': 'multipart/form-data',
    }

    const response = await backendApi.put(modulo + '/' + id, formData, { headers })
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