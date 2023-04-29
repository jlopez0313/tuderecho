import { backendApi } from "@/api/backendApi"
import { decodeToken } from "react-jwt";

export const allConectados = async () => {
    const token = localStorage.getItem('token');
    const { uid } = decodeToken(token);

    const response = await backendApi.post('usuarios/conectados', 
        {
            uid
        },
        { 
            headers: {
                'x-token': token
            }
        }
    )

    if ( response ) {
        return response.data.usuarios;
    } else {
        return false;
    }
}