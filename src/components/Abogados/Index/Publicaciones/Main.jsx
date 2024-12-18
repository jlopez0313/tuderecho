import React, { useContext, useEffect, useState } from 'react'
import { PostModal } from '@/components/Modals/Posts/Post';
import { useSelector } from 'react-redux';
import { list } from '@/services/Publicaciones';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import Avatar from '@/assets/images/abogado/perfil/avatar.png';
import styles from './Main.module.scss';
import { Publicacion } from '@/components/Abogados/shared/Publicacion/Publicacion';
import { ComentariosModal } from '@/components/Modals/Comentarios/Comentarios';
import { PublicacionContext } from '@/context/publicacion/PublicacionContext';

import InfiniteScroll from 'react-infinite-scroll-component';

import { useTranslation } from 'react-i18next';
import { Loader } from '@/components/shared/Loader/Loader';

export const Main = ({ comunidad = '' }) => {

    const limit = 10;
    const { t } = useTranslation();

    const {setPublicacion, setIndex, publicacion } = useContext( PublicacionContext );
    const { user } = useSelector( state => state.user )
    
    const [idx, setIdx] = useState(0);
    const [modalShow, setModalShow] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [showModalComments, setShowModalComments] = useState(false);
    const [showModalShare, setShowModalShare] = useState(false);
    const [lista, setLista] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    

    const onGetList = async () => {
        setIsLoading( true )

        const lista = await list({ comunidad }, 1, limit)
        setLista( lista )
        
        if ( lista.length < limit ) {
            setHasMore( false )
        }

        setIsLoading( false )
        setPage(prevPage => prevPage + 1);
    }

    const onGetMore = async () => {
        const moreList = await list({ comunidad }, page, limit);
        if ( moreList.length < limit ) {
            setHasMore( false )
        }

        setLista( list => [...list, ...moreList] )
        setPage(prevPage => prevPage + 1);
    }

    const onComentar = async ( idx ) => {
        setIdx( idx )
        setShowModalComments( true )
    }

    const onEdit = async() => {
        setShowModalComments( false )
        setModalEdit(true)
    }

    const onSharing = async ( idx ) => {
        setShowModalComments( false )
        setShowModalShare( true )
    }

    const onRemovePubli = ( idx ) => {
        const tmpList = [...lista];
        tmpList.splice(idx, 1)
        setLista( tmpList )
    }

    const onRefreshPublis = async (doRefresh) => {
        if (doRefresh) {
            await setPage(1)
            onGetList()
        }

        setModalShow(false)
        setModalEdit(false)
    }

    const onHideModal = (doRefresh) => {
        onRefreshPublis(doRefresh)
        setShowModalComments(false)
        setShowModalShare(false)
    }

    const onHideShare = (doRefresh) => {

        onRefreshPublis(doRefresh)
        setShowModalComments(false)
        setShowModalShare(false)
    }
    
    const onSetPubli = (publi) => {
        const posts = [...lista ]
        posts.splice(idx, 1, publi);
        setLista(posts)
    }

    const onNewPost = () => {
        setPublicacion( null );
        setModalShow(true)
    }
    
/*
    useEffect( () => {
        console.log( publicacion )
    }, [publicacion])
*/
    useEffect( () => {
        onGetList()
    }, [])
    
    return (
        <div className={`main ${styles.main}`}>
            <div className='bg-white rounded d-flex border shadow-sm px-3 py-2 align-items-center'>
                <div>
                    <img src={user?.perfil?.photo || Avatar} className={`me-3 ${styles.avatar}`} alt=''/>
                </div>
                <div 
                    className="text-center text-danger w-100 cursor-pointer"
                    onClick={ onNewPost }
                >
                    <FontAwesomeIcon icon={faPencil} />
                    <span className='ms-3'> { t('posts.create') } </span>
                </div>
            </div>

            {
                isLoading ? <Loader />
                :
                    <InfiniteScroll
                        dataLength={ lista.length }
                        next={onGetMore}
                        hasMore={ hasMore }
                        loader={ <Loader /> }
                        endMessage={ <div className='mt-3'> </div> }
                        scrollableTarget="scrollableDiv"
                    >
                        {
                            lista?.map( (post, key) => {
                                return <Publicacion
                                    key={key}
                                    post={post}
                                    idx={key}
                                    onEdit={() => onEdit() }
                                    onComentar={() => onComentar(key)}
                                    onSharing={() => onSharing()}
                                    onRemovePubli={(idx) => onRemovePubli(idx)}
                                />
                            })
                        }
                    </InfiniteScroll>
            }
            
            <PostModal
                title={ t('posts.edit') }
                comunidad={comunidad}
                modalShow={modalEdit}
                sharing={false}
                isEdit={true}
                onHide={(refresh = false) => onRefreshPublis( refresh )}
            />
            
            <PostModal
                title={ t('posts.create') }
                comunidad={comunidad}
                modalShow={modalShow}
                sharing={false}
                isEdit={false}
                onHide={(refresh = false) => onRefreshPublis( refresh )}
            />

            <ComentariosModal
                idx={idx}
                title={ t('comentarios.title') }
                modalShow={showModalComments}
                onHide={(refresh = false) => onHideModal( refresh )}
                onSetPubli={(publi) => onSetPubli( publi )}
                onSharing={() => onSharing()}
            />

            <PostModal
                title={ t('share') }
                comunidad={comunidad}
                isEdit={false}
                modalShow={showModalShare}
                onHide={(doRefresh = false) => onHideShare( doRefresh )}
            />

        </div>
    )
}
