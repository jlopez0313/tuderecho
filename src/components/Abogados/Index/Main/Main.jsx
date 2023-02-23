import React, { useEffect, useState } from 'react'
import { Post } from '@/components/shared/Modals/Posts/Post';
import { useDispatch, useSelector } from 'react-redux';
import { get, remove } from '@/store/publicaciones/thunks';
import Card from 'react-bootstrap/Card';
import './Main.scss'
import Avatar from '@/assets/images/abogado/perfil/avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { notify } from '@/helpers/helpers'
import { decodeToken } from "react-jwt";

export const Main = () => {

    const token = localStorage.getItem('token') || '';
    const { uid } = decodeToken(token);

    const [modalShow, setModalShow] = useState(false);
    const dispatch = useDispatch();
    const { publis } = useSelector( (state) => state.publicacion )

    const onGetList = async () => {
        dispatch( get() )
    }

    const onRemoveComment = ( id ) => {
        const removed = dispatch( remove( id ) )

        removed
        .then( () => {
            onGetList();
            notify('Publicación removida', 'success')
        })
        .catch( error => {
            notify('onRemoveComment: Internal Error', 'error')
        })
    }

    const onRefreshPublis = () => {
        onGetList()
        setModalShow(false)
    }

    useEffect( () => {
        onGetList()
    }, [])

    return (
        <>
            <button 
                className="form-control"
                type="button" 
                onClick={() => setModalShow(true)}
            > Crea un Post </button>

            <Post
                title='Crea un Post'
                show={modalShow}
                onHide={() => onRefreshPublis()}
            />

            {
                publis?.map( (publi, key) => {
                    return <Card key={key} className='mt-3 p-2'>
                        <div className='owner d-flex align-items-center'>
                            <div>
                                <Card.Img
                                    variant="top"
                                    className='avatar'
                                    src={ publi.user.perfil.photo || Avatar}
                                />
                            </div>
                            <div className="ms-2 d-flex flex-column w-100">

                                <strong>  {publi.user.name} </strong>
                                <span className='date'>
                                    Creado el {new Date(publi.fecha).toLocaleDateString()}
                                </span>
                            </div>
                            <div className='icon flex-shrink-1'>
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
                            <div className="grid">
                                {
                                    publi.medias.map( (media, key2) => {
                                        return <div key={ key2 } className='grid-item'>
                                            <img className='media' src={media} />
                                        </div>
                                    })
                                }
                            </div>
                            {
                                publi.gif
                                ? 
                                    <div className='grid-item'>
                                        <img className='media' src={publi.gif} />
                                    </div>
                                : null
                            }
                        </Card.Body>
                    </Card>
                })
            }

        </>
    )
}
