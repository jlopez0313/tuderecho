import { backendApi } from "@/api/backendApi"
import { tag, set } from "./TagSlice"

export const list = () => {
    return async( dispatch ) => {
        const response = await backendApi.get('tags/', { 
            headers: {
                'x-token': localStorage.getItem('token')
            }
        })

        if ( response ) {
            dispatch( set( response.data.tags.sort( (a, b) => a.name > b.name ? 1: -1  ) ) )
            return Promise.resolve(true);
        } else {
            return Promise.resolve(false);
        }
    }
}

export const find = (id) => {
    return async( dispatch ) => {
        const response = await backendApi.get('tags/' + id, { 
            headers: {
                'x-token': localStorage.getItem('token')
            }
        })

        if ( response ) {
            dispatch( tag( response.data.tag ) )
            return Promise.resolve(true);
        } else {
            return Promise.resolve(false);
        }
    }
}

export const create = (name) => {
    return async( dispatch ) => {
        const response = await backendApi.post('tags/', { name }, { 
            headers: {
                'x-token': localStorage.getItem('token')
            }
        })

        if ( response ) {
            // dispatch( list() )
            return Promise.resolve(true);
        } else {
            return Promise.resolve(false);
        }
    }
}

export const update = (id, name) => {
    return async( dispatch ) => {
        const response = await backendApi.put('tags/'+id, { name }, { 
            headers: {
                'x-token': localStorage.getItem('token')
            }
        })

        if ( response ) {
            // dispatch( list() )
            return Promise.resolve(true);
        } else {
            return Promise.resolve(false);
        }
    }
}

export const remove = (id) => {
    return async( dispatch ) => {
        const response = await backendApi.delete('tags/'+id, { 
            headers: {
                'x-token': localStorage.getItem('token')
            }
        })

        if ( response ) {
            // dispatch( list() )
            return Promise.resolve(true);
        } else {
            return Promise.resolve(false);
        }
    }
}