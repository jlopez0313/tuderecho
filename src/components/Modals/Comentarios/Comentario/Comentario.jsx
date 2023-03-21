import React, { useEffect, useRef, useState } from 'react'
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
import { useSelector } from 'react-redux';
import { notify } from '@/helpers/helpers'
import { create } from '@/helpers/Comentarios';
import { useForm } from '@/hooks/useForm';

export const Comentario = ({ item, ...props }) => {

    const [parent, setParent] = useState( item )
    const [addComment, setAddComment] = useState( false )
    const inputRef = useRef()
    
    const token = localStorage.getItem('token') || '';
    const { user } = useSelector( state => state.user )
    const { uid } = decodeToken(token);

    const initFormData = {
        parent: item.id,
        comentario: '',
    }

    const { onInputChange,  onSetFormState, formState } = useForm(initFormData)
    const {totalComments, totalLikes, onAddChild, onRemoveChild} = usePublicacion(parent);

    const toggleLike = async (id) => {
        const toggled = await sendLike('comentarios', id);
        setParent( toggled )
    }

    const onComentar = async ( show ) => {
        await setAddComment( show )
        
        if ( show ) {
            inputRef.current.select()
        }
    }

    const onRemoveComment = async (id) => {
        const updated = await onRemoveChild( id );
        setParent( updated );
        await remove( id )
    }

    const onSendcomment = async (evt) => {
        if (evt.key === 'Enter') {
            const obj = {
                ...formState,
                user: uid,
            }

            const saved = await create( obj )
            if ( saved ) {
                notify('Comentario registrado!', 'success');
                onSetFormState(initFormData)
                await onAddChild( saved )
                onComentar( false )
            } else {
                notify('onDoSubmit Comentario: Internal Error', 'error')
            }
        }
    }

    useEffect(()=> {
        setParent( item )
        onSetFormState({
            ...initFormData,
            parent: item.id
        })
    }, [item])

    return (
        <>
        
            <div className={`d-flex align-items-center border rounded mb-2 p-2 shadow-sm bg-light ${styles.comment}`}>
                <div>
                    <img src={parent.user.perfil?.photo || Avatar} className={`me-3 ${styles.avatar}`} />
                </div>
                <div className="ms-2 d-flex flex-column w-100">

                    <div className='d-flex'>
                        <strong className={`w-100 ${styles.user}`}>  {parent.user.name} </strong>
                        <div className={`flex-shrink-1 ${styles.icon}`}>
                            {
                                uid === parent.user.id 
                                ?
                                    <FontAwesomeIcon
                                        icon={faTrashCan}
                                        className='text-danger cursor-pointer'
                                        onClick={() => onRemoveComment( parent.id ) }
                                        title="Eliminar"
                                    />
                                : null
                            }
                        </div>
                    </div>
                    {parent.comentario}
                    <small className={styles.date}>
                        Creado el {new Date(parent.created_at).toLocaleDateString()}
                    </small>
                    <div className="">
                        <small
                            className='text-danger cursor-pointer me-4'
                            onClick={() => toggleLike( parent.id )}
                        >
                            {
                                totalLikes == 0 
                                ? ''
                                : setNumberformat(totalLikes)
                            }
                            {
                                hasMyLike( parent )
                                ? <FontAwesomeIcon icon={myLike} className='ms-1 me-2' /> 
                                : <FontAwesomeIcon icon={faThumbsUp} className='ms-1 me-2' />
                            }
                            Me Gusta
                        </small>
                        
                        <small 
                            className='text-danger cursor-pointer'
                            onClick={() => onComentar( true )}
                        >
                            {totalComments == 0 ? '' : totalComments} <FontAwesomeIcon icon={faMessage} className='me-2' />
                            Comentar
                        </small>
                    </div>
                </div>
            </div>

            {
                parent.comentarios.map( (child, key) => {
                    return <div className="ms-5" key={key}>
                        <Comentario
                            item={child}
                        />
                    </div>
                })
            }
            
            {
                addComment 
                ? 
                    <div className='ms-5 d-flex'>
                        <div>
                            <img src={user.perfil?.photo || Avatar} className={`me-3 ${styles.avatar}`} />
                        </div>
                        <div className="form-floating mb-3 w-100">
                            <input
                                ref={ inputRef }
                                required
                                name="comentario"
                                className='form-control'
                                placeholder='Escribe tu comentario'
                                onChange={onInputChange}
                                value={ formState.comentario }
                                onKeyUp={onSendcomment}
                            />
                            <label htmlFor="especialidad">Tu Comentario *</label>
                        </div>
                    </div>
                : null

            }
        </>
    )
}
