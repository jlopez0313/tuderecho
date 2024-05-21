import { logout } from '@/helpers/helpers';
import { useEffect } from 'react';
import { decodeToken, isExpired } from "react-jwt";
import { useLocation, useNavigate } from "react-router-dom";
import { find } from '@/services/Usuarios';
import { useDispatch } from 'react-redux';
import { register } from '@/store/user/UserSlice';
import { getTenant } from '@/helpers/helpers';

export const PrivateRoutes = ({ children, rol }) => {

    const token = localStorage.getItem('token') || '';
    const isMyTokenExpired = isExpired(token);
    const user = decodeToken(token);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {pathname, search} = useLocation();
    localStorage.setItem('lastPath', `${pathname}${search}`)

    const getUser = async () => {
        try {
            const data = await find( user.uid )
            dispatch( register( {...data.usuario} ) )
        } catch (error) {
            console.log( error );
        }
    }

    useEffect(() => {
        if(isMyTokenExpired){
            logout(navigate);
        } else if ( rol !== user.rol ) {
            navigate('/unauthorized')
        } else {
            getUser();
        }
    }, [children]);

    return !isMyTokenExpired ? children : null
}
