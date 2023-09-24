import React, { memo, useEffect, useState } from 'react'
import { list, myList, remove } from '@/services/Videoteca';
import { Item } from './Item/Item';
import styles from '@/assets/styles/shared.module.scss';
import { useDispatch } from 'react-redux';
import { setRefresh } from '@/store/comunidades/ComunidadesSlice';
import { VideotecaModal } from '@/components/Modals/Videoteca/Videoteca';
import { PostModal } from '@/components/Modals/Posts/Post';
import { PublicacionProvider } from '@/context/publicacion/PublicacionProvider';

import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader } from '@/components/shared/Loader/Loader';

import { useTranslation } from 'react-i18next';

import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { Filter } from '@/components/shared/Filter/Filter';
import { useFilter } from '@/hooks/useFilter';

export const Lista = memo( ({ uid, tab, onChangeTab }) => {
    
    const limit = 10;
    const { t } = useTranslation();

    const [item, setItem] = useState({});
    const [modalShow, setModalShow] = useState(false);

    const [lista, setLista] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [showModalShare, setShowModalShare] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const { filteredList, onFilter, setFilter, setFilteredList } = useFilter( uid, lista )

    const dispatch = useDispatch();

    const onShowModal = ( item ) => {
        setItem(item);
        setModalShow(true);
    }

    const onSharing = ( item ) => {
        setItem(item);
        setShowModalShare(true);
    }
    
    const onGetList = async () => {
        setIsLoading( true )
        
        let lista = []
        
        if (uid) {
            lista = await myList( '', 1, limit )
        } else {
            lista = await list( '', 1, limit )
        }

        setLista( lista )
        setFilteredList( lista )

        if ( lista.length < limit ) {
            setHasMore( false )
        }

        setIsLoading( false )
        setPage(prevPage => prevPage + 1);
    }

    const onGetMore = async () => {
        let moreList = [];
        
        if (uid) {
            moreList = await myList( '', page, limit )
        } else {
            moreList =  await list( '', page, limit )
        }

        if ( moreList.length < limit ) {
            setHasMore( false )
        }

        const list = [...lista, ...moreList]
        setLista(list)
        onFilter(list)
        setPage(prevPage => prevPage + 1);
    }

    const onRefresh = async (doRefresh) => {
        if (doRefresh) {
            await onGetList();
            onChangeTab('profile');
        }
        setModalShow(false)
        setShowModalShare(false);
    }

    const onRemove = ( id ) => {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            icon: 'question',
            confirmButtonColor: 'red',
            text: t('videoteca.alerts.sure'),
            showCancelButton: true,
        }).then( ({isConfirmed}) => {
            if ( isConfirmed ) {
                        
                remove( id )
                .then( () => {
                    onGetList();
                    notify( t('videoteca.alerts.removed'), 'success')
                    dispatch( setRefresh( true ) )
                })
                .catch( error => {
                    notify( t('videoteca.alerts.error'), 'error')
                })
            }
        })
    }

    useEffect( () => {
        onGetList();
    }, [uid])

    return (
        <PublicacionProvider>
            {

                isLoading ? <Loader />
                :
                <>
                     <Filter onFilter={(filter) => setFilter( filter )}/>
                    {
                        filteredList.length ? 
                            <InfiniteScroll
                                dataLength={ filteredList.length }
                                next={onGetMore}
                                hasMore={ hasMore }
                                loader={ <Loader /> }
                                endMessage={ <div className='mt-3'> </div> }
                                scrollableTarget="scrollableDiv"
                            >
                                <div className={`row h-75 mt-4 mx-0`}>
                                    {
                                        filteredList?.map( (item, key) => {
                                            return <div className="col-xxl-3 col-sm-6 col-12" key={key}>
                                                <Item
                                                    tab={tab}
                                                    item={item}
                                                    uid={uid}
                                                    idx={key}
                                                    onShare={onSharing}
                                                    onEdit={onShowModal} 
                                                    onRefresh={(doRefresh = false) => onRefresh( doRefresh )}
                                                    onRemove={(id) => onRemove(id)}
                                                />
                                            </div>
                                        })
                                    }
                                </div>
                            </InfiniteScroll>
                            : 
                            <div className='alert alert-danger m-auto w-75'> { t('videoteca.empty') } </div>
                    }
                </>
            }
            
            <VideotecaModal
                item={ item }
                title={ t('videoteca.update') }
                modalShow={modalShow}
                onHide={( callRefresh ) => onRefresh( callRefresh )}
            />

            <PostModal
                title={ t('share') }
                videoteca={item}
                modalShow={showModalShare}
                onHide={( callRefresh = false ) => onRefresh( callRefresh )}
            />
        </PublicacionProvider>
    )
})
