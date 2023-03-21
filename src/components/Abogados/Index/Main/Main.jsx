import React, { useEffect, useState } from 'react'
import { PostModal } from '@/components/Modals/Posts/Post';
import { useDispatch, useSelector } from 'react-redux';
import { get, remove } from '@/store/publicaciones/thunks';
import { notify } from '@/helpers/helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import Avatar from '@/assets/images/abogado/perfil/avatar.png';
import styles from './Main.module.scss';
import { Publicacion } from '@/components/shared/Publicacion/Publicacion';
import Spinner from 'react-bootstrap/esm/Spinner';
import { ComentariosModal } from '@/components/Modals/Comentarios/Comentarios';
import { setPubli } from '@/store/publicaciones/PublicacionesSlice';

export const Main = () => {

    const { user } = useSelector( state => state.user )
    
    const [modalShow, setModalShow] = useState(false);
    const [showModalComments, setShowModalComments] = useState(false);
    const dispatch = useDispatch();
    const { publis: lista, post, isLoading } = useSelector( (state) => state.publicacion )
    const [publis, setPublis] = useState(lista);

    const onGetList = async () => {
        dispatch( get() )
    }

    const onComentar = async ( post ) => {
        await dispatch( setPubli( post ) )
        setShowModalComments( true )
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

    const onHideModal = (doRefresh) => {
        onRefreshPublis(doRefresh)
        setShowModalComments(false)
    }

    const onSetPubli = (publi) => {
        const idx = publis.findIndex( item => item.id === publi.id );
        const posts = [...publis ]
        posts.splice(idx, 1, publi);
        setPublis(posts)
    }

    useEffect( () => {
        onGetList()
    }, [])

    useEffect( () => {
        setPublis(lista)
    }, [lista])

    useEffect( () => {
        console.log('publi setted')
        onSetPubli( post )
    }, [post])
    
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
                                onComentar={() => onComentar(post)}
                                onRemovePubli={(doRefresh = false) => onRemovePubli(doRefresh)}
                                onRefreshPublis={(doRefresh = false) => onRefreshPublis(doRefresh)}
                            />
                    })
            }

            <ComentariosModal
                title='Comentarios'
                show={showModalComments}
                post={post}
                onHide={(doRefresh = false) => onHideModal( doRefresh )}
            />

        </div>
    )
}
