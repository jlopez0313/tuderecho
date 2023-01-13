import { backendApi } from "@/api/backendApi"
import { tag, set } from "./TagSlice"

export const list = () => {
    return async( dispatch: any ) => {
        const response = await backendApi.get('tags/', { 
            headers: {
                'x-token': localStorage.getItem('token')
            }
        })

        if ( response ) {
            dispatch( set( response.data.tags.sort( (a: any, b: any) => a.name > b.name ? 1: -1  ) ) )
            return Promise.resolve(true);
        } else {
            return Promise.resolve(false);
        }
    }
}

export const find = (id: string) => {
    return async( dispatch: any ) => {
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

export const create = (name: string) => {
    return async( dispatch: any ) => {
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

export const update = (id: string, name: string) => {
    return async( dispatch: any ) => {
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

export const remove = (id: string) => {
    return async( dispatch: any ) => {
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