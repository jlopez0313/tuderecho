import Card from 'react-bootstrap/Card';
import Avatar from '@/assets/images/abogado/perfil/avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faThumbsUp, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { decodeToken } from "react-jwt";
import styles from './Publicacion.module.scss';
import { faShare, faThumbsUp as myLike } from '@fortawesome/free-solid-svg-icons';
import { memo, useContext, useEffect, useState } from 'react';
import { usePublicacion } from '@/hooks/usePublicacion';
import { sendLike, hasMyLike } from '@/services/Likes';
import { setNumberformat } from '@/helpers/helpers';
import { PublicacionContext } from '@/context/publicacion/PublicacionContext';
import { format, render, cancel, register } from 'timeago.js';
import { remove } from '@/services/Publicaciones';
import { notify } from '@/helpers/helpers'

export const Publicacion = memo( ( {idx, post, onComentar, onRemovePubli, onSharing, showActions = true, ...props} ) => {

    const {setPublicacion, setIndex } = useContext( PublicacionContext );

    const [publi, setPubli] = useState( post )

    const token = localStorage.getItem('token') || '';
    const { uid } = decodeToken(token);    
    const {totalLikes, totalShares} = usePublicacion(publi, setPubli);

    const toggleLike = async (id) => {
        const toggled = await sendLike('publicaciones', id);
        setPublicacion( toggled )
    }

    const doRemovePubli = async ( id ) => {
        remove( id )
        .then( () => {
            onRemovePubli ( idx );
            notify('Publicación removida', 'success')
        })
        .catch( error => {
            notify('onRemoveComment: Internal Error', 'error')
        })
    }

    const onSetPublicacion = () => {
        setPublicacion( post );
        onComentar();
    }

    const doSharing = () => {
        setPublicacion( post );
        onSharing();
    }

    useEffect(()=> {
        setPubli( post );
        setIndex( idx );
    }, [post, idx])

    return (
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
                        { format(publi.createdAt) }
                    </small>
                </div>
                <div className={`flex-shrink-1 ${styles.icon}`}>
                    {
                        uid === publi.user?.id && showActions
                        ?
                            <FontAwesomeIcon
                                icon={faTrashCan}
                                className='cursor-pointer'
                                onClick={() => doRemovePubli( publi.id ) }
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

                {
                    publi.post?.id
                    ?
                    <div className='overflow-auto'>
                        <Publicacion
                            className='mb-3'
                            post={publi.post}
                            showActions={false}
                        />
                    </div>
                    :null
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
                            
                            <small className='text-danger cursor-pointer' onClick={onSetPublicacion}>
                                {post.total_comments == 0 ? '' : post.total_comments} <FontAwesomeIcon icon={faMessage} className='me-2' />
                                Comentar
                            </small>
                            
                            <small className='text-danger cursor-pointer' onClick={doSharing}> 
                                {totalShares == 0 ? '' : totalShares} <FontAwesomeIcon icon={faShare} className='me-2' />
                                Compartir
                            </small>
                        </div>
                    </Card.Footer>
                : null
            }
        </Card>
    )
})
