import { Link, useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '@/assets/images/logo.png'
import './Header.scss';
import { logout } from '@/helpers/helpers';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { decodeToken } from 'react-jwt';

export const Header = () => {
  const token = localStorage.getItem('token') || '';
  const user = decodeToken(token);
  const navigate = useNavigate();

  const onGoToProfile = () => {
    switch( user.rol ) {
      case 'Abogado':
          navigate('/abogados/perfil');
      break;
      case 'Cliente':
          navigate('/clientes/perfil');
      break;
      case 'Admin':
          navigate('/admin');
      break;
    }
  }

  const onLogout = () => {
    logout(navigate);
  }

  return (
    <div className='header'>
      <Navbar expand="sm" className='menu'>
          <Navbar.Brand href="#home" className='text-center'>
            <img className='logo' src={Logo} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='offcanvasNavbar-expand-sm' />
          <Navbar.Offcanvas
            id='offcanvasNavbar-expand-sm'
            aria-labelledby='offcanvasNavbarLabel-expand-sm'
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id='offcanvasNavbarLabel-expand-sm'>
                <img className='logo' src={Logo} />
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="ms-auto">
                <Nav.Link href="#home">Inicio</Nav.Link>
                <Nav.Link href="#features">Sobre Nosotros</Nav.Link>
                <Nav.Link href="#pricing">Servicios</Nav.Link>
                <Nav.Link href="#pricing">Contáctanos</Nav.Link>
                {
                  !token 
                  ? 
                    <>
                      <Link className="nav-link" to="/login" replace={true}>
                        <button className='btn btn-primary'> Iniciar Sesión </button>
                      </Link>
                      <Link className="nav-link" to="/pre-registro" replace={true}>
                        <button className='btn btn-primary'> Registrarme </button>
                      </Link>
                    </> 
                  : 
                    <>
                      <span className="nav-link">
                        <button className='btn btn-primary' onClick={() => onGoToProfile()}> Ingresa </button>
                      </span>
                      <span className="nav-link">
                        <button className='btn btn-primary' onClick={() => onLogout()}> Salir </button>
                      </span>
                    </>
                }
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
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
