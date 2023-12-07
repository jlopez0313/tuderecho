import { toast } from 'react-toastify';

export const getTenant = () => {
  return localStorage.getItem('tenant') || 'test';
}

export const setTenant = ( tenant ) => {
  return localStorage.setItem('tenant', tenant );
}

export const getSettings = () => {
  return JSON.parse(localStorage.getItem('settings') || '{}' );
}

export const setSettings = ( data ) => {
  localStorage.setItem('settings', JSON.stringify(data) );
}

export const logout = ( navigate ) => {
    notify('Tu sesión ha finalizado', 'success');
    localStorage.removeItem('token')
    navigate( '/' + getTenant()  + "/", { replace: true })
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

export const getYoutubeId = (url) => {
  // let regex = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
  let regex = /(https?:\/\/)?(www.)?(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(?:embed\/|v\/|watch\?v=|watch\?list=(.*)&v=|watch\?(.*[^&]&)v=)?((\w|-){11})(&list=(\w+)&?)?/gims
  const arr = regex.exec(url);
  if( arr ) return arr[6]
  return '';
}

export const setNumberformat = (number) => {
  return number >= 1000000000
          ? Math.floor(number/1000000000) + 'B'
          : number >= 1000000
              ? Math.floor(number/1000000) + 'M'
              : number >= 1000
                  ? Math.floor(number/1000) + 'K'
                  : number
}