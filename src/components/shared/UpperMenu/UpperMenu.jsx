import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from 'react-bootstrap/esm/Button';
import { faAdd, faPencil, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '@/helpers/helpers';
import { decodeToken } from "react-jwt";
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Popover from 'react-bootstrap/Popover';
import styles from '@/assets/styles/shared.module.scss';
import { getTenant } from "@/helpers/helpers";
import { useState } from "react";
import { ConferenciaModal } from '@/components/Modals/Conferencias/Conferencia';
import { VideotecaModal } from '@/components/Modals/Videoteca/Videoteca';
import { ComunidadesModal } from '@/components/Modals/Comunidades/Comunidades';

export const UpperMenu = () => {

    const { t, i18n } = useTranslation();
    
    const [modalConferenciaShow, setModalConferenciaShow] = useState( false );
    const [modalComunidadShow, setModalComunidadShow] = useState( false );
    const [modalVideotecaShow, setModalVideotecaShow] = useState( false );

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

    const onRefreshConferencias = ( doRefresh ) => {
        setModalConferenciaShow(false)
    }

    const onRefreshVideoteca = (doRefresh) => {
        setModalVideotecaShow(false)
    }

    const onRefreshComunidades = (doRefresh) => {
        setModalComunidadShow(false)
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

                        <li className='border shadow-sm m-2'> 
                            <div className="w-100 rounded p-2 bg-outlet-danger cursor-pointer"
                                onClick={() => setModalConferenciaShow(true)}
                            > 
                                <FontAwesomeIcon icon={faPencil} />
                                <strong> { t('conferencias.create') } </strong>
                            </div>
                        </li>

                    <strong className='text-danger d-block'> { t("videoteca.title") } </strong>
                        <li className='border shadow-sm p-2 m-2'> 
                            <Link to={'/videoteca'} className="">
                                <FontAwesomeIcon className='me-2' icon={faSearch} />
                                <strong className='text-dark'> { t("videoteca.discover") } </strong>
                            </Link>
                        </li>
                        

                        <li className='border shadow-sm m-2'> 
                            <div className="w-100 rounded p-2 bg-outlet-danger cursor-pointer"
                                onClick={() => setModalVideotecaShow(true)}
                            > 
                                <FontAwesomeIcon icon={faPencil} />
                                <strong> { t('videoteca.create') } </strong>
                            </div>
                        </li>

                    <strong className='text-danger d-block'> { t("comunidades.title") } </strong>
                        <li className='border shadow-sm p-2 m-2'> 
                            <Link to={'/comunidades'} className="">
                                <FontAwesomeIcon className='me-2' icon={faSearch} />
                                <strong className='text-dark'> { t("comunidades.discover") } </strong>
                            </Link>
                        </li>
                        

                        <li className='border shadow-sm m-2'> 
                            <div className="w-100 rounded p-2 bg-outlet-danger cursor-pointer"
                                onClick={() => setModalComunidadShow(true)}
                            > 
                                <FontAwesomeIcon icon={faPencil} />
                                <strong> { t('comunidades.create') } </strong>
                            </div>
                        </li>
                </ul>                        
            </Popover.Body>

            <ConferenciaModal
                title={ t('conferencias.create') }
                modalShow={modalConferenciaShow}
                onHide={(doRefresh = false ) => onRefreshConferencias(doRefresh)}
            />

            <VideotecaModal
                title={ t('videoteca.create') }
                modalShow={modalVideotecaShow}
                onHide={(doRefresh = false) => onRefreshVideoteca(doRefresh)}
            />

            <ComunidadesModal
                title={ t('comunidades.create') }
                modalShow={modalComunidadShow}
                onHide={(doRefresh = false) => onRefreshComunidades(doRefresh)}
            />

            
        </div>
    )
}
