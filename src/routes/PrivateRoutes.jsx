import { logout } from '@/helpers/helpers';
import { useEffect } from 'react';
import { decodeToken, isExpired } from "react-jwt";
import { useNavigate } from "react-router-dom";

export const PrivateRoutes = ({ children, rol }) => {
    const token = localStorage.getItem('token') || '';
    const isMyTokenExpired = isExpired(token);
    const user = decodeToken(token);

    const navigate = useNavigate();

    useEffect(() => {
        if(isMyTokenExpired){
            logout(navigate);
        } else if ( rol !== user.rol ) {
            navigate('unauthorized')
        }
    }, []);

    return !isMyTokenExpired ? children : null
}
