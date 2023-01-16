import { toast } from 'react-toastify';

export const notify = ( message: string, type: string, newOptions = {} ) => {
    const options: any = {
        position: "top-right",
        autoClose: 5000,
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

export const logout = ( navigate: any ) => {
  notify('Tu sesión ha finalizado', 'success');
  localStorage.removeItem('token')
  navigate("/")
}