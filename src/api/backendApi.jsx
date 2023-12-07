import axios from "axios";
import { getTenant } from "@/helpers/helpers";

export const backendApi = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API
})

backendApi.interceptors.request.use( (config) => {
    const token = localStorage.getItem('token');
    const tenant = getTenant();
    config.headers['x-tenant'] =  tenant || 'abogados';
    config.headers['x-token'] =  token ? `${token}` : '';
    config.headers['Access-Control-Allow-Origin'] = '*';
    // config.headers['Content-Type'] = 'application/json';
    return config;
})