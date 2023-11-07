import { backendApi } from "@/api/backendApi"

const module = 'zoom/'

export const auth = async () => {
    const response = await backendApi.get(module + 'auth');
    
    if ( response ) {
        return Promise.resolve( response.data.response );
    } else {
        return Promise.resolve( false );
    }
}