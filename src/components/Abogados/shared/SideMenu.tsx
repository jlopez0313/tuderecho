import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUsers, faTags, faSuitcase } from '@fortawesome/free-solid-svg-icons';
import 'animate.css';

export const SideMenu = () => {
  return (
    <div className='side-menu-abogado animate__animated  animate__fadeIn'>
        <div className='text-white w-100 text-center'>
            <div className="col-4"></div>
            <div className="col-8"> Roberto </div>
        </div>
        <ul>
            <div className="col-12 text-center"> <span className='text-white'> Mi Perfil </span> </div>
            <li> 
              <Link to='/abogados/perfil'>
                  <FontAwesomeIcon icon={faUsers} />
                  Información Básica
              </Link>
            </li>
          </ul>
          <ul>
            <div className="col-12 text-center"> <span className='text-white'> Lenguaje de la Aplicación </span> </div>
            <li>
              <Link to='/admin/tags'>
                  <FontAwesomeIcon icon={faTags} />
                  Español
              </Link>
            </li>
            <li>
              <Link to='/admin/tags'>
                  <FontAwesomeIcon icon={faTags} />
                  Inglés
              </Link>
            </li>
          </ul>
          <ul>
            <div className="col-12 text-center"> <span className='text-white'> Inicio de Sesión </span> </div>
            <li> 
                <Link to='/admin/especialidades'>
                    <FontAwesomeIcon icon={faSuitcase} />
                    Cambiar Contraseña
                </Link>
            </li>
            <li> 
                <Link to='/admin/especialidades'>
                    <FontAwesomeIcon icon={faSuitcase} />
                    Cerrar Sesión
                </Link>
            </li>
        </ul>
    </div>
  )
}
