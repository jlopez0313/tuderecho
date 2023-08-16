import { decodeToken } from "react-jwt";
import { backendApi } from "@/api/backendApi"

export const sendLike = async ( route, post ) => {
    
    const response = await backendApi.post(`${route}/likes/${post}`, 
        {},
        { 
            headers: {
                'x-token': localStorage.getItem('token')
            }
        }
    )

    if ( response ) {
        return response.data.updated;
    } else {
        return false;
    }
}

export const hasMyLike = ( post ) => {
    const token = localStorage.getItem('token') || '';
    const { uid } = decodeToken(token);
    return post.likes?.find( like => like === uid )
}