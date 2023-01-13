import { backendApi } from "@/api/backendApi"
import { especialidad, set } from "./EspecialidadSlice"

export const list = () => {
    return async( dispatch: any ) => {
        const response = await backendApi.get('especialidades/', { 
            headers: {
                'x-token': localStorage.getItem('token')
            }
        })

        if ( response ) {
            dispatch( set( response.data.especialidades.sort( (a: any, b: any) => a.name > b.name ? 1: -1  ) ) )
            return Promise.resolve(true);
        } else {
            return Promise.resolve(false);
        }
    }
}

export const find = (id: string) => {
    return async( dispatch: any ) => {
        const response = await backendApi.get('especialidades/' + id, { 
            headers: {
                'x-token': localStorage.getItem('token')
            }
        })

        if ( response ) {
            dispatch( especialidad( response.data.especialidad ) )
            return Promise.resolve(true);
        } else {
            return Promise.resolve(false);
        }
    }
}

export const create = (name: string) => {
    return async( dispatch: any ) => {
        const response = await backendApi.post('especialidades/', { name }, { 
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
        const response = await backendApi.put('especialidades/'+id, { name }, { 
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
        const response = await backendApi.delete('especialidades/'+id, { 
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