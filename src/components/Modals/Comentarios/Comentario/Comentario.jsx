import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faMessage, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { usePublicacion } from '@/hooks/usePublicacion';
import styles from './Comentario.module.scss'
import { decodeToken } from "react-jwt";

export const Comentario = ({ item }) => {
    const token = localStorage.getItem('token') || '';
    const { uid } = decodeToken(token);

    const {totalComments} = usePublicacion(item);

    return (
        <div className={`d-flex align-items-center border rounded mb-2 p-2 shadow-sm bg-light ${styles.comment}`}>
            <div>
                <img src={item.user.perfil?.photo || Avatar} className={`me-3 ${styles.avatar}`} />
            </div>
            <div className="ms-2 d-flex flex-column w-100">

                <div className='d-flex'>
                    <strong className={`w-100 ${styles.user}`}>  {item.user.name} </strong>
                    <div className={`flex-shrink-1 ${styles.icon}`}>
                        {
                            uid === item.user.id 
                            ?
                                <FontAwesomeIcon
                                    icon={faTrashCan}
                                    className=''
                                    // onClick={() => onRemovePubli( item.id ) }
                                    title="Eliminar"
                                />
                            : null
                        }
                    </div>
                </div>
                {item.comentario}
                <small className={styles.date}>
                    Creado el {new Date(item.created_at).toLocaleDateString()}
                </small>
                <div className="d-flex justify-content-between">
                    <small className=''>
                        32 <FontAwesomeIcon icon={faThumbsUp} className='me-2' />
                        Me Gusta
                    </small>
                    
                    <small 
                        className=''
                        // onClick={() => setModalShow(true)}
                    >
                        {totalComments == 0 ? '' : totalComments} <FontAwesomeIcon icon={faMessage} className='me-2' />
                        Comentar
                    </small>
                    
                    <small className=''> 
                        12 <FontAwesomeIcon icon={faShare} className='me-2' />
                        Compartir
                    </small>
                </div>

            </div>
        </div>
    )
}
