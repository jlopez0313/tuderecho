import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUsers, faTags, faSuitcase, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Logo from '@/assets/images/logo.png'

export const SideMenu = () => {
  return (
    <div className='side-menu'>
        <div className='text-white w-100 text-center'>
            <Link to="/">
            <img src={Logo} />
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
