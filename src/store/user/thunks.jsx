import { backendApi } from "@/api/backendApi"

import { register } from "./UserSlice"

export const registerAuth = (rol, name, email, password, provider) => {
    return async( dispatch ) => {
        const body = {rol, name, email, password, provider, estado: rol == 'Cliente' ? 'A': 'P'}
        const response = await backendApi.post('auth/register', body)
        if ( response ) {
            
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.usuario) );
            
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
            localStorage.setItem('user', JSON.stringify(response.data.usuario) );

            dispatch( register( {...response.data.usuario, token: response.data.token } ) )
            return Promise.resolve(response.data.usuario);
        } else {
            return Promise.resolve(false);
        }
    }
}
