import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUsers, faRightFromBracket, faKey, faClose, faUser, faVideo, faPersonChalkboard, faSackDollar, faCog } from '@fortawesome/free-solid-svg-icons';
import Avatar from '@/assets/images/abogado/perfil/avatar.png';
import 'animate.css';
import styles from './SideMenu.module.scss';
import { logout } from '@/helpers/helpers';
import { decodeToken } from "react-jwt";
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getTenant } from '@/helpers/helpers';
import { useEffect, useState } from 'react';

export const SideMenu = ({animateClass, setAnimateClass}) => {

    const { t, i18n } = useTranslation();

    const token = localStorage.getItem('token') || '';
    const { rol } = decodeToken(token);

    const [link, setLink] = useState('');

    const { user } = useSelector( state => state.user )
    const navigate = useNavigate()

    const onToggleClass = () => {
        setAnimateClass('animate__slideOutRight')
    }

    const onLogout = () => {
        logout( navigate );
    }

    const onSetLink = () => {
        if ( rol.toLowerCase() == 'profesional' ) {
          setLink( '' )
        } else {
          setLink( '/clientes' )
        }
    }

    useEffect( () => {
        onSetLink();
    }, [])

    return (
        <div className={`offcanvas offcanvas-end show ${styles.sideMenuAbogado} animate__animated ${animateClass} animate__fast`}>
            <div className='bg-danger px-3'>
                <FontAwesomeIcon icon={faClose} className='position-absolute top-1 end-3 cursor-pointer text-white' onClick={() => onToggleClass()} />
                <div className={`text-white w-100 text-center ${styles.top} d-flex align-items-center`}>
                    <div className='text-center'>
                        <img src={user?.perfil?.photo || Avatar} alt="" className={`${styles.avatar} m-auto`}/>
                    </div>
                    <span className='w-100'> { user?.name } </span>
                </div>
            </div>

            <div className={styles.menu}>
                <ul className='mt-5'>
                    <strong className='text-danger d-block'> { t("sidemenu.profile.title") } </strong>
                    <li className='border shadow-sm p-2 m-2'> 
                        <Link to={link + `/perfil`}>
                            <FontAwesomeIcon className='me-2' icon={faUser} />
                            <strong className='text-dark'> { t("sidemenu.profile.basic-info") } </strong>
                        </Link>
                    </li>
                    <li className='border shadow-sm p-2 m-2'> 
                        <Link to={link + `/passwords`}>
                            <FontAwesomeIcon className='me-2' icon={faKey} />
                            <strong className='text-dark'> { t("sidemenu.login.passwords") } </strong>
                        </Link>
                    </li>
                    <li className='border shadow-sm p-2 m-2'> 
                        <Link to={link + `/planes`}>
                            <FontAwesomeIcon className='me-2' icon={faCog} />
                            <strong className='text-dark'> { t("sidemenu.profile.plan") } </strong>
                        </Link>
                    </li>
                </ul>

                {
                    rol.toLowerCase() == 'profesional' && 
                        <ul className=''>
                            <strong className='text-danger d-block mt-5'> { t("sidemenu.gestion.title") } </strong>
                            <li className='border shadow-sm p-2 m-2'> 
                                <Link to={'/gestion/bolsa'}>
                                    <FontAwesomeIcon className='me-2' icon={faSackDollar} />
                                    <strong className='text-dark'> { t("sidemenu.gestion.bag") } </strong>
                                </Link>
                            </li>
                        </ul>
                }

                <ul className=''>
                    <strong className='text-danger d-block mt-5'> { t("sidemenu.language.title") } </strong>
                    <li className='mt-3'>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="lang" defaultChecked={i18n.language == 'es-US'} onClick={() => i18n.changeLanguage('es-US')} />
                            <label className="form-check-label" htmlFor="inlineCheckbox2"> <strong> { t("sidemenu.language.spanish") } </strong> </label>
                        </div>
                    </li>
                    <li>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="lang" defaultChecked={i18n.language == 'en-US'} onClick={() => i18n.changeLanguage('en-US')} />
                            <label className="form-check-label" htmlFor="inlineCheckbox2"> <strong> { t("sidemenu.language.english") } </strong> </label>
                        </div>
                    </li>
                </ul>

                <ul className=''>
                    <strong className='text-danger d-block mt-5'> { t("sidemenu.login.title") } </strong>
                    <li className='border shadow-sm m-2'> 
                        <button className='btn' onClick={() => onLogout()}>
                            <FontAwesomeIcon className='text-danger me-2' icon={faRightFromBracket} />
                            <strong className='text-dark'> { t("sidemenu.login.logout") } </strong>
                        </button>
                    </li>
                </ul>
            </div>

            
        </div>
    )
}
