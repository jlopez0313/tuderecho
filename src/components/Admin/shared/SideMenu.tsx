import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUsers, faTags, faSuitcase, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Logo from '@/assets/images/logo.png'
import './SideMenu.scss'

export const SideMenu = () => {
  return (
    <div className='side-menu'>
        <div className='bg-white w-100 text-center p-3 border'>
            <Link to="/admin">
            <img className='logo' src={Logo} />
          </Link>
        </div>
        <ul className='pt-4'>
            <li> 
                <Link to='/admin/usuarios'>
                    <FontAwesomeIcon icon={faUsers} />
                    Usuarios
                </Link>
            </li>
            <li> 
                <Link to='/admin/tags'>
                    <FontAwesomeIcon icon={faTags} />
                    Palabras Clave
                </Link>
            </li>
            <li> 
                <Link to='/admin/especialidades'>
                    <FontAwesomeIcon icon={faSuitcase} />
                    Especialidades
                </Link>
            </li>
            <li> 
                <Link to='/'>
                    <FontAwesomeIcon icon={faRightFromBracket} />
                    Salir
                </Link>
            </li>
        </ul>
    </div>
  )
}
