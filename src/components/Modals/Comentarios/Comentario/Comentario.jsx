import React, { useState } from 'react'
import Avatar from '@/assets/images/abogado/perfil/avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faMessage, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faShare, faThumbsUp as myLike } from '@fortawesome/free-solid-svg-icons';
import { usePublicacion } from '@/hooks/usePublicacion';
import { sendLike, hasMyLike } from '@/helpers/Likes';
import styles from './Comentario.module.scss'
import { decodeToken } from "react-jwt";
import { setNumberformat } from '@/helpers/helpers';
import { remove } from '@/helpers/Comentarios';

export const Comentario = ({ item, onDoRemoveComment }) => {

    const [comment, setComment] = useState( item )

    const token = localStorage.getItem('token') || '';
    const { uid } = decodeToken(token);

    const {totalComments, totalLikes} = usePublicacion(comment);

    const toggleLike = async (id) => {
        const toggled = await sendLike('comentarios', id);
        setComment( toggled )
    }

    const onRemoveComment = async (id) => {
        const removed = await remove(id);
        onDoRemoveComment( id )
    }

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
                                    className='text-danger cursor-pointer'
                                    onClick={() => onRemoveComment( item.id ) }
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
                    <small className='text-danger cursor-pointer' onClick={() => toggleLike( item.id )}>
                        {
                            totalLikes == 0 
                            ? ''
                            : setNumberformat(totalLikes)
                        }
                        {
                            hasMyLike( comment )
                            ? <FontAwesomeIcon icon={myLike} className='ms-1 me-2' /> 
                            : <FontAwesomeIcon icon={faThumbsUp} className='ms-1 me-2' />
                        }
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
