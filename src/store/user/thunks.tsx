import { backendApi } from "@/api/backendApi"
import { register, setLista } from "./UserSlice"

export const registerAuth = (rol: string, name: string, email: string, password: string) => {
    return async( dispatch: any ) => {
        const body = {rol, name, email, password, estado: rol == 'Cliente' ? 'A': 'P'}
        const response = await backendApi.post('auth/register', body)
        if ( response ) {
            dispatch( register( body ) )
            return Promise.resolve(true);
        } else {
            return Promise.resolve(false);
        }
    }
}

export const loginAuth = (email: string, password: string) => {
    return async( dispatch: any ) => {
        const body = {email, password}
        const response = await backendApi.post('auth/', body)
        if ( response ) {
            localStorage.setItem('token', response.data.token);
            dispatch( register( {...response.data.usuario, token: response.data.token } ) )
            return Promise.resolve(true);
        } else {
            return Promise.resolve(false);
        }
    }
}

export const list = () => {
    return async( dispatch: any ) => {
        const response = await backendApi.get('usuarios/', { 
            headers: {
                'x-token': localStorage.getItem('token')
            }
        })

        if ( response ) {
            dispatch( setLista( response.data.usuarios.sort( (a: any, b: any) => a.name > b.name ? 1: -1  ) ) )
            return Promise.resolve(true);
        } else {
            return Promise.resolve(false);
        }
    }
}

export const find = (id: string) => {
    return async( dispatch: any ) => {
        const response = await backendApi.get('usuarios/' + id, { 
            headers: {
                'x-token': localStorage.getItem('token')
            }
        })

        if ( response ) {
            return Promise.resolve( response.data );
        } else {
            return Promise.resolve(false);
        }
    }
}

export const update = (id: string, user: any) => {
    return async( dispatch: any ) => {
        const response = await backendApi.put('usuarios/'+id, user, { 
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
        const response = await backendApi.delete('usuarios/'+id, { 
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