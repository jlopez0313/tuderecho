import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUsers, faTags, faSuitcase, faRightFromBracket, faKey, faSackDollar } from '@fortawesome/free-solid-svg-icons';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

import Logo from '@/assets/images/logo.png'
import './SideMenu.scss'
import { logout } from '@/helpers/helpers';

export const SideMenu = () => {

    const navigate = useNavigate();

    const onDoLogout = () => {
        logout(navigate)
    }

    return (
        <div className='side-menu bg-dark'>
            <Navbar expand='sm' className="mb-3 flex-column p-0">
                    <div className='bg-white w-100 text-center p-3 border d-none d-sm-block'>
                        <Link to="/admin">
                            <img className='logo' src={Logo} alt=''/>
                        </Link>
                    </div>
                    <Navbar.Toggle className='m-2 bg-white' aria-controls='offcanvasNavbar-expand-sm' />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-sm`}
                        aria-labelledby='offcanvasNavbarLabel-expand-sm'
                        placement="start"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id='offcanvasNavbarLabel-expand-sm'>
                                <img className='logo' src={Logo} alt=''/>
                            </Offcanvas.Title>
                        </Offcanvas.Header>

                        <Offcanvas.Body className='bg-dark'>
                            <Nav className="flex-column mt-4">
                                <Link to='/admin/usuarios'>
                                    <FontAwesomeIcon icon={faUsers} />
                                    Usuarios
                                </Link>

                                <Link to='/admin/tags'>
                                    <FontAwesomeIcon icon={faTags} />
                                    Palabras Clave
                                </Link>

                                <Link to='/admin/especialidades'>
                                    <FontAwesomeIcon icon={faSuitcase} />
                                    Especialidades
                                </Link>

                                <Link to='/admin/passwords'>
                                    <FontAwesomeIcon icon={faKey} />
                                    Contraseñas
                                </Link>

                                <Link to='/admin/bolsa'>
                                    <FontAwesomeIcon icon={faSackDollar} />
                                    Mi Bolsa
                                </Link>
                                
                                <Nav.Item>
                                    <span onClick={() => onDoLogout() } className='text-light cursor-pointer' >
                                        <FontAwesomeIcon icon={faRightFromBracket} className='me-4' />
                                        Salir
                                    </span>
                                </Nav.Item>
                                
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
            </Navbar>
        </div>
    )
}
