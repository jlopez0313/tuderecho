import { Link, useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '@/assets/images/logo.png'
import './Header.scss';
import { logout } from '@/global/global';

export const Header = () => {
  const token = localStorage.getItem('token') || '';

  const navigate = useNavigate();

  const onLogout = () => {
    logout(navigate);
  }

  return (
    <div className='header'>
      <Navbar className='menu'>
          <Navbar.Brand href="#home">
            <img className='logo' src={Logo} />
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="#home">Inicio</Nav.Link>
            <Nav.Link href="#features">Sobre Nosotros</Nav.Link>
            <Nav.Link href="#pricing">Servicios</Nav.Link>
            <Nav.Link href="#pricing">Contactanos</Nav.Link>
            {
              !token 
              ? 
                <>
                  <Link className="nav-link" to="/login">
                    <button className='btn btn-primary'> Iniciar Sesión </button>
                  </Link>
                  <Link className="nav-link" to="/pre-registro">
                    <button className='btn btn-primary'> Registrarme </button>
                  </Link>
                </> 
              : 
                <>
                  <Link className="nav-link" to="/abogados/perfil">
                    <button className='btn btn-primary'> Ingresa </button>
                  </Link>
                  <span className="nav-link">
                    <button className='btn btn-primary' onClick={ () => onLogout() }> Salir </button>
                  </span>
                </>
            }
          </Nav>
      </Navbar>
{/*
        <div className="col d-flex align-items-center justify-content-end">
          <Link to="/login">
            
          </Link>
        </div>
        <div className="col d-flex align-items-center justify-content-end">
          <Link to="/registro">
            
          </Link>
        </div>
        <div className="col-6">
          <input placeholder='Ciudad de búsqueda' className='form-control ciudad' />
        </div>
        <div className="col-6">
          <input placeholder='Palabras claves' className='form-control tags' />
      </div>
*/}
    </div>
  )
}
