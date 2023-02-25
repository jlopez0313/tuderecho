import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUsers, faRightFromBracket, faKey, faClose } from '@fortawesome/free-solid-svg-icons';
import Avatar from '@/assets/images/abogado/perfil/avatar.png';
import 'animate.css';
import './SideMenu.scss';
import { logout } from '@/helpers/helpers';
import { decodeToken } from "react-jwt";
import { useSelector } from 'react-redux';

export const SideMenu = ({animateClass, setAnimateClass}) => {

    const token = localStorage.getItem('token') || '';
    const { rol } = decodeToken(token);
    const { user } = useSelector( state => state.user )
    const navigate = useNavigate()

    const onToggleClass = () => {
        setAnimateClass('animate__slideOutRight')
    }

    const onLogout = () => {
        logout( navigate );
    }

    return (
        <div className={`offcanvas offcanvas-end show side-menu-abogado animate__animated ${animateClass} animate__fast`}>
            <div className='bg-danger p-3'>
                <FontAwesomeIcon icon={faClose} className='position-absolute top-2 end-4 cursor-pointer text-white' onClick={() => onToggleClass()} />
                <div className='text-white w-100 text-center top d-flex align-items-center'>
                    <img src={user?.perfil?.photo || Avatar} alt="" className='avatar me-3'/>
                    <span className='w-100'> { user?.name } </span>
                </div>
            </div>

            <ul className='mt-5'>
                <strong className='text-danger'> Mi Perfil </strong>
                <li className='border shadow-sm p-2 m-2'> 
                <Link to={`/${ rol.toLowerCase() }s/perfil`}>
                    <FontAwesomeIcon className='me-2' icon={faUsers} />
                    <strong className='text-dark'> Información Básica </strong>
                </Link>
                </li>
                <strong className='text-danger d-block mt-5'> Lenguaje de la Aplicación </strong>
                <li className='mt-3'>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" id="inlineCheckbox2" value="option2" />
                        <label className="form-check-label" htmlFor="inlineCheckbox2"> <strong> Español </strong> </label>
                    </div>
                </li>
                <li>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" id="inlineCheckbox2" value="option2" />
                        <label className="form-check-label" htmlFor="inlineCheckbox2"> <strong> Inglés </strong> </label>
                    </div>
                </li>
                <strong className='text-danger d-block mt-5'> Inicio de Sesión </strong>
                <li className='border shadow-sm p-2 m-2'> 
                    <Link to={`/${ rol.toLowerCase() }s/passwords`}>
                        <FontAwesomeIcon className='me-2' icon={faKey} />
                        <strong className='text-dark'> Cambiar Contraseña </strong>
                    </Link>
                </li>
                <li className='border shadow-sm p-2 m-2'> 
                    <button className='btn' onClick={() => onLogout()}>
                        <FontAwesomeIcon className='text-danger me-2' icon={faRightFromBracket} />
                        <strong className='text-dark'> Cerrar Sesión </strong>
                    </button>
                </li>
            </ul>
        </div>
    )
}
