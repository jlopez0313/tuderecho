import { Link, useNavigate, useParams } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '@/assets/images/logo.png'
import './Header.scss';
import { logout } from '@/helpers/helpers';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { decodeToken } from 'react-jwt';
import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { getTenant, setTenant } from '@/helpers/helpers';
import { find } from '@/services/Settings';
import { setSettings } from '@/helpers/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { set } from '@/store/settings/SettingsSlice';

export const Header = () => {

  const { t } = useTranslation();

  const token = localStorage.getItem('token') || '';
  const user = decodeToken(token);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { settings } = useSelector(state => state.settings);

  const params = useParams();
  setTenant(params.tenant);

  const [show, setShow] = useState('')

  const onGoToProfile = () => {
    switch( user.rol ) {
      case 'Profesional':
          navigate('/' + getTenant() + '/perfil');
      break;
      case 'Cliente':
          navigate('/' + getTenant() + '/clientes/perfil');
      break;
      case 'Admin':
          navigate('/' + getTenant() +'/admin');
      break;
    }
  }

  const onLogout = () => {
    logout(navigate);
  }

  const onLoadSettings = async() => {
    const {settings} = await find();
    setSettings( settings );
    dispatch( set( settings ) )
  }

  useEffect( () => {
    onLoadSettings()
  }, [])

  return (
    <div className='header'>
      <Navbar expand="md" className='menu'>
          <Navbar.Brand href="#home" className='text-center'>
            <img className='logo' src={settings.logo} alt=''/>
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
                <img className='logo' src={settings.logo} alt=''/>
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
                        <Link className="nav-link" to={"/" + getTenant() + "/login"} replace={true}>
                          <button className='btn btn-primary'> { t('home.header.login') } </button>
                        </Link>
                        <Link className="nav-link" to={"/" + getTenant() + "/pre-registro"} replace={true}>
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
