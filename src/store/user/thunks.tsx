import { backendApi } from "@/api/backendApi"
import { register } from "./UserSlice"

export const registerAuth = (name: string, email: string, password: string) => {
    return async( dispatch: any ) => {
        const body = {name, email, password}
        const response = await backendApi.post('auth/register', body)
        if ( response ) {
            dispatch( register( body ) )
            return Promise.resolve(true);
        } else {
            // throw new Error('Register Failed');
            return Promise.resolve(false);
        }
    }
}