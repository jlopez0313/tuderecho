import React, { useEffect, useState } from 'react'
import { PostModal } from '@/components/Modals/Posts/Post';
import { useSelector } from 'react-redux';
import { list, remove } from '@/services/Publicaciones';
import { notify } from '@/helpers/helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import Avatar from '@/assets/images/abogado/perfil/avatar.png';
import styles from './Main.module.scss';
import { Publicacion } from '@/components/shared/Publicacion/Publicacion';
import Spinner from 'react-bootstrap/esm/Spinner';
import { ComentariosModal } from '@/components/Modals/Comentarios/Comentarios';

export const Main = () => {

    const { user } = useSelector( state => state.user )
    
    const [modalShow, setModalShow] = useState(false);
    const [showModalComments, setShowModalComments] = useState(false);
    const [showModalShare, setShowModalShare] = useState(false);
    const [lista, setLista] = useState([])
    const [post, setPost] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const onGetList = async () => {
        setIsLoading( true )
        setLista( await list() )
        setIsLoading( false )
    }

    const onComentar = async ( post ) => {
        setPost( post )
        setShowModalComments( true )
    }

    const onSharing = async ( post ) => {
        setPost( post )
        setShowModalShare( true )
    }

    const onRemovePubli = ( id ) => {
        remove( id )
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
        setShowModalShare(false)
    }

    const onHideShare = (doRefresh) => {
        onRefreshPublis(doRefresh)
        setShowModalShare(false)
    }

    const onSetPubli = (publi) => {
        const idx = lista.findIndex( item => item.id === publi.id );
        const posts = [...lista ]
        posts.splice(idx, 1, publi);
        setLista(posts)
    }

    useEffect( () => {
        onSetPubli( post )
    }, [post])

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

            {
                isLoading
                ? 
                    <div className="text-center mt-5">
                        <Spinner animation="grow" />
                    </div>
                :
                    lista?.map( (post, key) => {
                        return <Publicacion
                                key={key}
                                post={post}
                                setPost={setPost}
                                onComentar={() => onComentar(post)}
                                onSharing={() => onSharing(post)}
                                onRemovePubli={(doRefresh = false) => onRemovePubli(doRefresh)}
                                onRefreshPublis={(doRefresh = false) => onRefreshPublis(doRefresh)}
                            />
                    })
            }

            <PostModal
                title='Crea un Post'
                modalShow={modalShow}
                onHide={(doRefresh = false) => onRefreshPublis( doRefresh )}
            />

            <ComentariosModal
                title='Comentarios'
                modalShown={showModalComments}
                post={post}
                onHide={(doRefresh = false) => onHideModal( doRefresh )}
            />

            <PostModal
                title='Compartir'
                modalShow={showModalShare}
                post={post}
                onHide={(doRefresh = false) => onHideShare( doRefresh )}
            />

        </div>
    )
}
