import { backendApi } from "@/api/backendApi"
import { Dispatch } from "react"
import { headers } from "@/constants/constants"
import { register, setLista } from "./UserSlice"

export const registerAuth = (rol, name, email, password, provider) => {
    return async( dispatch ) => {
        const body = {rol, name, email, password, provider, estado: rol == 'Cliente' ? 'A': 'P'}
        const response = await backendApi.post('auth/register', body)
        if ( response ) {
            localStorage.setItem('token', response.data.token);
            dispatch( register( {...response.data.usuario, token: response.data.token } ) )
            return Promise.resolve(response.data.usuario);
        } else {
            return Promise.resolve(false);
        }
    }
}

export const loginAuth = (email, password) => {
    return async( dispatch ) => {
        const body = {email, password}
        const response = await backendApi.post('auth/', body)
        if ( response ) {
            localStorage.setItem('token', response.data.token);
            dispatch( register( {...response.data.usuario, token: response.data.token } ) )
            return Promise.resolve(response.data.usuario);
        } else {
            return Promise.resolve(false);
        }
    }
}

export const list = () => {
    return async( dispatch ) => {
        const response = await backendApi.get('usuarios/', { 
            headers: {
                'x-token': localStorage.getItem('token')
            }
        })

        if ( response ) {
            dispatch( setLista( response.data.usuarios.sort( (a, b) => a.name > b.name ? 1: -1  ) ) )
            return Promise.resolve(true);
        } else {
            return Promise.resolve(false);
        }
    }
}

export const find = (id) => {
    return async( dispatch ) => {
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

export const update = (id, user) => {
    return async( dispatch ) => {
        const response = await backendApi.put('usuarios/'+id, user, { 
            headers: {
                'x-token': localStorage.getItem('token'),
                ...headers
            }
        })

        if ( response ) {
            // dispatch( list() )
            return Promise.resolve( response );
        } else {
            return Promise.resolve(false);
        }
    }
}

export const remove = (id) => {
    return async( dispatch ) => {
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

export const passwords = (user) => {
    return async( dispatch ) => {
        const response = await backendApi.post('usuarios/passwords', user, { 
            headers: {
                'x-token': localStorage.getItem('token'),
                ...headers
            }
        })

        if ( response ) {
            // dispatch( list() )
            return Promise.resolve( response );
        } else {
            return Promise.resolve(false);
        }
    }
}

export const recovery = (email) => {
    return async( dispatch ) => {
        const response = await backendApi.post('usuarios/recovery', { email }, { 
            headers: {
                ...headers
            }
        })

        if ( response ) {
            // dispatch( list() )
            return Promise.resolve( response );
        } else {
            return Promise.resolve(false);
        }
    }
}