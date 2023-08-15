import React, { useContext, useEffect, useRef, useState } from 'react'
import Avatar from '@/assets/images/abogado/perfil/avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faMessage, faTrashCan, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faShare, faThumbsUp as myLike } from '@fortawesome/free-solid-svg-icons';
import { usePublicacion } from '@/hooks/usePublicacion';
import { sendLike, hasMyLike } from '@/services/Likes';
import styles from './Comentario.module.scss'
import { decodeToken } from "react-jwt";
import { setNumberformat } from '@/helpers/helpers';
import { create, remove } from '@/services/Comentarios';
import { useSelector } from 'react-redux';
import { notify } from '@/helpers/helpers'
import { useForm } from '@/hooks/useForm';
import { memo } from 'react';
import { PublicacionContext } from '@/context/publicacion/PublicacionContext';
import { format, render, cancel, register } from 'timeago.js';
import { localeFunc } from '@/helpers/timeAgo';

import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

import { useTranslation } from 'react-i18next';

export const Comentario = memo( ( { item, ...props } ) => {

    const { t } = useTranslation();

    const { publicacion, setPublicacion } = useContext( PublicacionContext );
    register('my-locale', localeFunc);

    const [parent, setParent] = useState( item )
    const [addComment, setAddComment] = useState( false )
    const inputRef = useRef()
    
    const token = localStorage.getItem('token') || '';
    const { user } = useSelector( state => state.user )
    const { uid } = decodeToken(token);

    const initFormData = {
        publicacionID: publicacion.id,
        parent: item.id,
        comentario: '',
    }

    const { onInputChange,  onSetFormState, formState } = useForm(initFormData)
    const {totalComments, totalLikes} = usePublicacion(parent, setParent);

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

        const MySwal = withReactContent(Swal)
        MySwal.fire({
            icon: 'question',
            confirmButtonColor: 'red',
            text: t('comentarios.alerts.sure'),
            showCancelButton: true,
        }).then( async ({isConfirmed}) => {
            if ( isConfirmed ) {
                const publi = await remove( id, formState );
                if ( publi ) {
                    notify( t('comentarios.alerts.removed'), 'success');
                    setPublicacion( publi )
                    onComentar( false )
                } else {
                    notify( t('comentarios.alerts.error'), 'error')
                }
            }
        })

        
    }

    const onSendcomment = async (evt) => {
        evt.preventDefault();
        // if (evt.key === 'Enter') {
            const obj = {
                ...formState,
                user: uid,
            }

            const saved = await create( obj )
            if ( saved ) {
                notify( t('comentarios.alerts.saved'), 'success');
                onSetFormState(initFormData)
                setPublicacion( saved )
                onComentar( false )
            } else {
                notify( t('comentarios.alerts.error'), 'error')
            }
        // }
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
                    <img src={parent.user.perfil?.photo || Avatar} className={`me-3 ${styles.avatar}`} alt=''/>
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
                                        title={ t('remove') }
                                    />
                                : null
                            }
                        </div>
                    </div>
                    <div  className='text-break w-98'>
                        {parent.comentario}
                    </div>
                    <small className={styles.date}>
                        { format(parent.createdAt, 'my-locale') }
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
                                ? <FontAwesomeIcon icon={myLike} className='ms-1 me-1' /> 
                                : <FontAwesomeIcon icon={faThumbsUp} className='ms-1 me-1' />
                            }
                            { t('posts.like') }
                        </small>
                        
                        <small 
                            className='text-danger cursor-pointer'
                            onClick={() => onComentar( true )}
                        >
                            {totalComments == 0 ? '' : totalComments} <FontAwesomeIcon icon={faMessage} className='me-1' />
                            { t('comentarios.form.reply') }
                        </small>
                    </div>
                </div>
            </div>

            {
                parent.comentarios.map( (child, key) => {
                    return <div className="ms-5" key={key}>
                        <Comentario
                            onSetPubli={setParent}
                            item={child}
                        />
                    </div>
                })
            }
            
            {
                addComment 
                ? 
                    <div className='ms-5 d-flex align-items-center justify-content-between border rounded px-1 mb-2'>
                        <div>
                            <img src={user.perfil?.photo || Avatar} className={`me-3 ${styles.avatar}`} alt=''/>
                        </div>
                        <form onSubmit={onSendcomment} className='w-100'>
                            <div className="form-floating">
                                <input
                                    ref={ inputRef }
                                    required
                                    name="comentario"
                                    className='form-control border-0 pe-5'
                                    placeholder={ t('comentarios.form.comentario-placehoder') }
                                    onChange={onInputChange}
                                    value={ formState.comentario }
                                />
                                <label htmlFor="especialidad">{ t('comentarios.your-comment') } *</label>
                                <FontAwesomeIcon 
                                    role="button"
                                    className={`position-absolute bottom-25 end-0 me-2 text-danger ${ formState.comentario ? '' : 'disabled'}`}
                                    icon={faPaperPlane}
                                    onClick={onSendcomment}
                                />  
                            </div>
                        </form>
                    </div>
                : null

            }
        </>
    )
})
