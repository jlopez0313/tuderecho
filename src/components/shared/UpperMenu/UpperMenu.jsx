import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from 'react-bootstrap/esm/Button';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '@/helpers/helpers';
import { decodeToken } from "react-jwt";
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Popover from 'react-bootstrap/Popover';
import styles from '@/assets/styles/shared.module.scss';
import { getTenant } from "@/helpers/helpers";

export const UpperMenu = () => {

    const { t, i18n } = useTranslation();

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
        <div 
            className={`rounded popover`}
            style={{
                maxWidth: '345px', width: '345px', height: '100%'
            }}
        >
            <Popover.Header className='bg-danger text-white rounded-top'>
                <strong> Menu </strong>
            </Popover.Header>
            <Popover.Body className={styles.popperBody}>
                <ul className='mt-3'>
                    <strong className='text-danger d-block'> { t("conferencias.title") } </strong>
                    <li className='border shadow-sm p-2 m-2'> 
                        <Link to={'/conferencias'} className="">
                            <FontAwesomeIcon className='me-2' icon={faSearch} />
                            <strong className='text-dark'> { t("conferencias.discover") } </strong>
                        </Link>
                    </li>

                    <strong className='text-danger d-block'> { t("videoteca.title") } </strong>
                    <li className='border shadow-sm p-2 m-2'> 
                        <Link to={'/videoteca'} className="">
                            <FontAwesomeIcon className='me-2' icon={faSearch} />
                            <strong className='text-dark'> { t("videoteca.discover") } </strong>
                        </Link>
                    </li>

                    <strong className='text-danger d-block'> { t("comunidades.title") } </strong>
                    <li className='border shadow-sm p-2 m-2'> 
                        <Link to={'/comunidades'} className="">
                            <FontAwesomeIcon className='me-2' icon={faSearch} />
                            <strong className='text-dark'> { t("comunidades.discover") } </strong>
                        </Link>
                    </li>
                </ul>                        
            </Popover.Body>

            
        </div>
    )
}
