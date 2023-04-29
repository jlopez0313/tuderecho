import Card from 'react-bootstrap/Card';
import Avatar from '@/assets/images/abogado/perfil/avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faThumbsUp, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { decodeToken } from "react-jwt";
import styles from './Publicacion.module.scss';
import { faShare, faThumbsUp as myLike } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { usePublicacion } from '@/hooks/usePublicacion';
import { sendLike, hasMyLike } from '@/services/Likes';
import { setNumberformat } from '@/helpers/helpers';
import { useDispatch } from 'react-redux';
import { setPubli } from '@/store/publicaciones/PublicacionesSlice';

export const Publicacion = ({post, showActions = true, onComentar, onSharing, ...props}) => {

    const dispatch = useDispatch();
    const [publi, setPost] = useState( post )

    const token = localStorage.getItem('token') || '';
    const { uid } = decodeToken(token);    
    const {totalComments, totalLikes, totalShares} = usePublicacion(publi);

    const toggleLike = async (id) => {
        const toggled = await sendLike('publicaciones', id);
        setPost( toggled )
        await dispatch( setPubli( toggled ) )
    }

    const onRemovePubli = async ( id ) => {
        await onRemoveChild ( id );
    }

    useEffect(()=> {
        setPost( post )
    }, [post])
    
    return (
        <>
            <Card className={`mt-3 p-3 shadow-sm rounded ${props.className}`}>
                <div className={`d-flex align-items-center ${styles.owner}`}>
                    <div>
                        <Card.Img
                            variant="top"
                            className={`${styles.avatar}`}
                            src={ publi.user?.perfil?.photo || Avatar}
                            alt=''
                        />
                    </div>
                    <div className="ms-2 d-flex flex-column w-100">

                        <strong className={styles.user}>  {publi.user?.name} </strong>
                        <small className={styles.date}>
                            Creado el {new Date(publi.fecha).toLocaleDateString()}
                        </small>
                    </div>
                    <div className={`flex-shrink-1 ${styles.icon}`}>
                        {
                            uid === publi.user?.id 
                            ?
                                <FontAwesomeIcon
                                    icon={faTrashCan}
                                    className='cursor-pointer'
                                    onClick={() => onRemovePubli( publi.id ) }
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
                {
                    showActions
                    ? 
                        <Card.Footer>
                            <div className="d-flex justify-content-between">
                                <small className='text-danger cursor-pointer' onClick={() => toggleLike( publi.id )}>
                                    {
                                        totalLikes == 0 
                                        ? ''
                                        : setNumberformat(totalLikes)
                                    }
                                    {
                                        hasMyLike( publi )
                                        ? <FontAwesomeIcon icon={myLike} className='ms-1 me-2' /> 
                                        : <FontAwesomeIcon icon={faThumbsUp} className='ms-1 me-2' />
                                    }
                                    Me Gusta
                                </small>
                                
                                <small className='text-danger cursor-pointer' onClick={() => onComentar()}>
                                    {totalComments == 0 ? '' : totalComments} <FontAwesomeIcon icon={faMessage} className='me-2' />
                                    Comentar
                                </small>
                                
                                <small className='text-danger cursor-pointer' onClick={() => onSharing()}> 
                                    {totalShares == 0 ? '' : totalShares} <FontAwesomeIcon icon={faShare} className='me-2' />
                                    Compartir
                                </small>
                            </div>
                        </Card.Footer>
                    : null
                }
            </Card>           
        </>
    )
}
