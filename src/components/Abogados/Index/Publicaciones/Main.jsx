import React, { useEffect, useState } from 'react'
import { PostModal } from '@/components/Modals/Posts/Post';
import { useSelector } from 'react-redux';
import { list } from '@/services/Publicaciones';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import Avatar from '@/assets/images/abogado/perfil/avatar.png';
import styles from './Main.module.scss';
import { Publicacion } from '@/components/Abogados/shared/Publicacion/Publicacion';
import { ComentariosModal } from '@/components/Modals/Comentarios/Comentarios';
import { PublicacionProvider } from '@/context/publicacion/PublicacionProvider';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useTranslation } from 'react-i18next';
import { Loader } from '@/components/shared/Loader/Loader';

export const Main = ({ comunidad = '' }) => {

    const limit = 10;
    const { t } = useTranslation();

    const { user } = useSelector( state => state.user )
    
    const [modalShow, setModalShow] = useState(false);
    const [showModalComments, setShowModalComments] = useState(false);
    const [showModalShare, setShowModalShare] = useState(false);
    const [lista, setLista] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    

    const onGetList = async () => {
        setIsLoading( true )
        setLista( await list({ comunidad }, page, limit) )
        
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
        setShowModalComments( true )
    }

    const onSharing = async ( idx ) => {
        setShowModalShare( true )
    }

    const onRemovePubli = ( idx ) => {
        const tmpList = [...lista];
        tmpList.splice(idx, 1)
        setLista( tmpList )
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
        setShowModalComments(false)
        setShowModalShare(false)
    }

/*

    const onSetPubli = (publi) => {
        const idx = lista.findIndex( item => item.id === publi.id );
        const posts = [...lista ]
        posts.splice(idx, 1, publi);
        setLista(posts)
    }

    useEffect( () => {
        onSetPubli( post )
    }, [post])
*/
    useEffect( () => {
        onGetList()
    }, [])
    
    return (
        <PublicacionProvider>
            <div className={`main ${styles.main}`}>
                <div className='bg-white rounded d-flex border shadow-sm px-3 py-2 align-items-center'>
                    <div>
                        <img src={user?.perfil?.photo || Avatar} className={`me-3 ${styles.avatar}`} />
                    </div>
                    <div 
                        className="text-center text-danger w-100 cursor-pointer"
                        onClick={() => setModalShow(true)}
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
                                        onComentar={() => onComentar()}
                                        onSharing={() => onSharing()}
                                        onRemovePubli={(idx) => onRemovePubli(idx)}
                                    />
                                })
                            }
                        </InfiniteScroll>
                }
                
                <PostModal
                    title={ t('posts.create') }
                    comunidad={comunidad}
                    modalShow={modalShow}
                    onHide={(refresh = false) => onRefreshPublis( refresh )}
                />

                <ComentariosModal
                    title={ t('comentarios.title') }
                    modalShow={showModalComments}
                    onHide={(refresh = false) => onHideModal( refresh )}
                />
 
                <PostModal
                    title={ t('share') }
                    comunidad={comunidad}
                    modalShow={showModalShare}
                    onHide={(doRefresh = false) => onHideShare( doRefresh )}
                />

            </div>
        </PublicacionProvider>

    )
}
