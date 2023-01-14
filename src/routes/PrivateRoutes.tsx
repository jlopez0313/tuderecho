import { useEffect } from 'react';
import { isExpired } from "react-jwt";
import { useNavigate } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
    const token = localStorage.getItem('token') || '';
    const isMyTokenExpired = isExpired(token);
    
    const navigate = useNavigate();

    useEffect(() => {
        if(isMyTokenExpired){
            navigate("/")
        }
    }, []);

    return !isMyTokenExpired ? children : null
}
