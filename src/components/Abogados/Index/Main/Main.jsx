import React, { useEffect, useState } from 'react'
import { PostModal } from '@/components/shared/Modals/Posts/Post';
import { useDispatch, useSelector } from 'react-redux';
import { get, remove } from '@/store/publicaciones/thunks';
import { notify } from '@/helpers/helpers'
import { Publicaciones } from './Publicaciones/Publicaciones';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import Avatar from '@/assets/images/abogado/perfil/avatar.png';
import styles from './Main.module.scss';

export const Main = () => {

    const { user } = useSelector( state => state.user )
    
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
        <div className={styles.main}>
            <div className='bg-white d-flex border shadow-sm px-3 py-2 align-items-center'>
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
                onHide={() => onRefreshPublis()}
            />

            {
                publis?.map( (publi, key) => {
                    return <Publicaciones publi={publi} onRemoveComment={onRemoveComment} key={key} />
                })
            }

        </div>
    )
}
