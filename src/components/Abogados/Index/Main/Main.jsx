import React, { useEffect, useState } from 'react'
import { PostModal } from '@/components/Modals/Posts/Post';
import { useDispatch, useSelector } from 'react-redux';
import { get, remove } from '@/store/publicaciones/thunks';
import { notify } from '@/helpers/helpers'
import { Publicacion } from './Publicacion/Publicacion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import Avatar from '@/assets/images/abogado/perfil/avatar.png';
import styles from './Main.module.scss';

import Spinner from 'react-bootstrap/esm/Spinner';

export const Main = () => {

    const { user } = useSelector( state => state.user )
    
    const [modalShow, setModalShow] = useState(false);
    const dispatch = useDispatch();
    const { publis, isLoading } = useSelector( (state) => state.publicacion )

    const onGetList = async () => {
        dispatch( get() )
    }

    const onRemovePubli = ( id ) => {
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

    const onRefreshPublis = (doRefresh) => {
        if (doRefresh) {
            onGetList()
        }

        setModalShow(false)
    }

    useEffect( () => {
        onGetList()
    }, [])

    return (
        <div className={`${styles.main}`}>
            <div className='bg-white rounded d-flex border shadow-sm px-3 py-2 align-items-center'>
                <div>
                    <img src={user?.perfil?.photo || Avatar} className={`me-3 ${styles.avatar}`} />
                </div>
                <div 
                    className="text-center text-danger w-100 cursor-pointer"
                    onClick={() => setModalShow(true)}
                >
                    <FontAwesomeIcon icon={faPencil} />
                    <span className='ms-3'>Crea un Post</span>
                </div>
            </div>

            <PostModal
                title='Crea un Post'
                show={modalShow}
                onHide={(doRefresh = false) => onRefreshPublis( doRefresh )}
            />

            {
                isLoading
                ? 
                    <div className="text-center mt-5">
                        <Spinner animation="grow" />
                    </div>
                :
                    publis?.map( (post, key) => {
                        return <Publicacion
                                key={key}
                                post={post}
                                onRemovePubli={(doRefresh = false) => onRemovePubli(doRefresh)}
                                onRefreshPublis={(doRefresh = false) => onRefreshPublis(doRefresh)}
                            />
                    })
            }

        </div>
    )
}
