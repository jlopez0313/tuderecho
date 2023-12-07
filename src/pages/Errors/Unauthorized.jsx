import { Link } from 'react-router-dom';
import Logo from '@/assets/images/logo.png'
import './Errors.scss';
import { getTenant } from '@/helpers/helpers';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { decodeToken } from 'react-jwt';

export const Unauthorized = () => {
  const { settings } = useSelector(state => state.settings);

  const token = localStorage.getItem('token') || '';
  const { rol } = decodeToken(token);
    
  const [link, setLink] = useState('');

  const onSetLink = () => {
    if ( rol.toLowerCase() == 'profesional' ) {
      setLink( '/' + getTenant() + "/profesionales" )
    } else {
      setLink( '/' + getTenant() + "/clientes" )
    }
  }

  useEffect( () => {
    onSetLink();
  }, [])

  return (
    <div className='container pt-7 text-center'>
        <div className="d-block text-center mb-5">
            <Link to={link}>
                <img src={settings.logo} alt=''/>
            </Link>
        </div>
        <div className="row container">
            <h1> Error 403 </h1>
            <h5> Unauthorized page :( </h5>
        </div>
    </div>
    
  )
}
