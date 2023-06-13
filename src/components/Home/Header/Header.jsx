import { Link, useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '@/assets/images/logo.png'
import './Header.scss';
import { logout } from '@/helpers/helpers';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { decodeToken } from 'react-jwt';
import { useState } from 'react';

import { useTranslation } from 'react-i18next';

export const Header = () => {

  const { t } = useTranslation();

  const token = localStorage.getItem('token') || '';
  const user = decodeToken(token);
  const navigate = useNavigate();


  const [show, setShow] = useState('')

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
      <Navbar expand="md" className='menu'>
          <Navbar.Brand href="#home" className='text-center'>
            <img className='logo' src={Logo} />
          </Navbar.Brand>
          
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={ () => setShow('show') }
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`offcanvas offcanvas-end ${show}`}
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            
            <Offcanvas.Header>
              <Offcanvas.Title id='offcanvasNavbarLabel'>
                <img className='logo' src={Logo} />
              </Offcanvas.Title>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" onClick={ () => setShow('hiding') }></button>
            </Offcanvas.Header>

            <Offcanvas.Body>
              <Nav className="ms-auto">
                  <Nav.Link href="#home"> { t('home.header.home') } </Nav.Link>
                  <Nav.Link href="#features"> { t('home.header.about') } </Nav.Link>
                  <Nav.Link href="#pricing"> { t('home.header.services') } </Nav.Link>
                  <Nav.Link href="#pricing"> { t('home.header.contact') } </Nav.Link>
                  {
                    !token 
                    ? 
                      <>
                        <Link className="nav-link" to="/login" replace={true}>
                          <button className='btn btn-primary'> { t('home.header.login') } </button>
                        </Link>
                        <Link className="nav-link" to="/pre-registro" replace={true}>
                          <button className='btn btn-primary'> { t('home.header.register') } </button>
                        </Link>
                      </> 
                    : 
                      <>
                        <span className="nav-link">
                          <button className='btn btn-primary' onClick={() => onGoToProfile()}> { t('home.header.enter') } </button>
                        </span>
                        <span className="nav-link">
                          <button className='btn btn-primary' onClick={() => onLogout()}> { t('home.header.leave') } </button>
                        </span>
                      </>
                  }
                </Nav>
            </Offcanvas.Body>
          </div>

        { show === 'show' && <div className="offcanvas-backdrop fade show"></div> }
        
      </Navbar>

    </div>
  )
}
