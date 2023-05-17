import { backendApi } from "@/api/backendApi"

export const allMessages = async ( room ) => {
    const token = localStorage.getItem('token');
    const response = await backendApi.get(`chat/${ room }`, 
        { 
            headers: {
                'x-token': token
            }
        }
    )

    if ( response ) {
        return response.data.room.chats;
    } else {
        return false;
    }
}