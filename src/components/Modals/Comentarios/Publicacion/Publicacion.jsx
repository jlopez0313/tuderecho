import React from 'react'
import Card from 'react-bootstrap/Card';
import Avatar from '@/assets/images/abogado/perfil/avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faThumbsUp, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { usePublicacion } from '@/hooks/usePublicacion';
import styles from './Publicacion.module.scss';
import { decodeToken } from "react-jwt";

export const Publicacion = ({publi, onComentar}) => {
    const token = localStorage.getItem('token') || '';
    const { uid } = decodeToken(token);
    const [modalShow, setModalShow] = useState(false);
    
    const {totalComments} = usePublicacion(publi);

    return (
        <Card className='mb-3 p-2 shadow-sm rounded'>
            <div className={`d-flex align-items-center ${styles.owner}`}>
                <div>
                    <Card.Img
                        variant="top"
                        className={`${styles.avatar}`}
                        src={ publi.user.perfil?.photo || Avatar}
                        alt=''
                    />
                </div>
                <div className="ms-2 d-flex flex-column w-100">

                    <strong className={styles.user}>  {publi.user.name} </strong>
                    <small className={styles.date}>
                        Creado el {new Date(publi.fecha).toLocaleDateString()}
                    </small>
                </div>
                <div className={`flex-shrink-1 ${styles.icon}`}>
                    {
                        uid === publi.user.id 
                        ?
                            <FontAwesomeIcon
                                icon={faTrashCan}
                                className='cursor-pointer'
                                onClick={() => onRemoveComment( publi.id ) }
                                title="Eliminar"
                            />
                        : null
                    }
                </div>
            </div>
            <Card.Body>
                <Card.Text>
                    {publi.comment}
                </Card.Text>
                <div className={`${publi.medias?.length > 1 ? styles.grid : ''}`}>
                    {
                        publi.medias?.map( (media, key2) => {
                            return <div key={ key2 } className={`${styles.gridItem}`}>
                                <img className={`${styles.media}`} src={media} />
                            </div>
                        })
                    }
                </div>
                {
                    publi.gif
                    ? 
                        <div className={`${styles.gridItem}`}>
                            <img className={`${styles.media}`} src={publi.gif} />
                        </div>
                    : null
                }
            </Card.Body>
            <Card.Footer>
                <div className="d-flex justify-content-between">
                    <small className=''>
                        32 <FontAwesomeIcon icon={faThumbsUp} className='me-2' />
                        Me Gusta
                    </small>
                    
                    <small className='text-danger cursor-pointer' onClick={() => onComentar()}>
                        {totalComments == 0 ? '' : totalComments} <FontAwesomeIcon icon={faMessage} className='me-2' />
                        Comentar
                    </small>
                    
                    <small className=''> 
                        12 <FontAwesomeIcon icon={faShare} className='me-2' />
                        Compartir
                    </small>
                </div>
            </Card.Footer>
        </Card>      
    )
}
