import { backendApi } from "@/api/backendApi"

const modulo = 'chat/'

export const all = async () => {
    const response = await backendApi.get(modulo + 'all')

    if ( response ) {
        return response.data.rooms;
    } else {
        return Promise.resolve(false);
    }
}