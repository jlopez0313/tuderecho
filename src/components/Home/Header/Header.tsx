import { Link } from 'react-router-dom';
import Logo from '@/assets/images/logo.png'
import './Header.scss';

export const Header = () => {
  return (
    <div className='header'>
      <div className='row'>
        <div className="col">
          <Link to="/">
            <img src={Logo} />
          </Link>
        </div>
        <div className="col d-flex align-items-center justify-content-end">
          <Link to="/login">
            <button className='btn btn-primary'> Iniciar Sesión </button>
          </Link>
        </div>
        <div className="col d-flex align-items-center justify-content-end">
          <Link to="/registro">
            <button className='btn btn-primary'> Registrarme </button>
          </Link>
        </div>
      </div>
      <div className='row'>
        <div className="col-6">
          <input placeholder='Ciudad de búsqueda' className='form-control ciudad' />
        </div>
        <div className="col-6">
          <input placeholder='Palabras claves' className='form-control tags' />
        </div>
      </div>
    </div>
  )
}
