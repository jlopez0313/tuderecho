import { toast } from 'react-toastify';

export const logout = ( navigate ) => {
    notify('Tu sesión ha finalizado', 'success');
    localStorage.removeItem('token')
    navigate("/", { replace: true })
}

export const notify = ( message, type, newOptions = {} ) => {
    const options = {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
        ...newOptions,
    }
    switch (type) {
        case 'info':
            toast.info(message, options);
          break;
        case 'success':
            toast.success(message, options);
          break;
        case 'warning':
            toast.warn(message, options);
          break;
        case 'error':
            toast.error(message, options);
          break;
      }
}