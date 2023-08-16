import React, { useEffect, useState } from 'react'
import { list, myList, remove } from '@/services/Conferencias';
import { Conferencia } from './Conferencia/Conferencia';
import styles from '@/assets/styles/shared.module.scss';

import { notify } from '@/helpers/helpers';
import { ConferenciaModal } from '@/components/Modals/Conferencias/Conferencia';
import Spinner from 'react-bootstrap/Spinner';
import Breadcrumb from '@/components/shared/Breadcrumb';

import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader } from '@/components/shared/Loader/Loader';

import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

import { useTranslation } from 'react-i18next';

export const ConferenciasComponent = () => {

    const limit = 10;
    const { t } = useTranslation();

    const breadcrumb = [
        {
            name: 'Home',
            href: '/abogados',
            active: false
        },{
            name: t('conferencias.title'),
            active: true
        }
    ]

    const [item, setItem] = useState({});
    const [modalShow, setModalShow] = useState(false);
    const [search, setSearch] = useState('');
    const [lista, setLista] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    
    const onShowModal = ( item ) => {
        setItem(item);
        setModalShow(true);
    }

    const onGetList = async () => {
        setIsLoading( true )
        setLista( await myList(search, page, limit) )
        
        if ( lista.length < limit ) {
            setHasMore( false )
        }

        setIsLoading( false )

        if( search ) {
            setPage(prevPage => prevPage + 1);
        }
    }

    const onGetMore = async () => {
        const moreList = await myList( '', page, limit )

        if ( moreList.length < limit ) {
            setHasMore( false )
        }

        setLista( list => [...list, ...moreList] )
    }

    const onRefreshConferencias = (callRefresh = false) => {
        if (callRefresh ) onGetList();
        setModalShow(false)
    }

    const onRemove = ( id ) => {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            icon: 'question',
            confirmButtonColor: 'red',
            text: t('conferencias.alerts.sure'),
            showCancelButton: true,
        }).then( ({isConfirmed}) => {
            if ( isConfirmed ) {
                remove( id )
                .then( () => {
                    onGetList();
                    notify( t('conferencias.alerts.removed'), 'success')
                })
                .catch( error => {
                    notify( t('conferencias.alerts.error'), 'error')
                })
            }
        })
    }

    const doSetSearch = (evt) => {
      setSearch( evt.target.value )
    }

    useEffect( () => {
        const timer = setTimeout(() => onGetList(), search ? 1000 : 0);
        return () => clearTimeout(timer);
    }, [search])

    return (
        <>
            <div className={`container pb-5 h-90`}>
                
                <Breadcrumb className='mt-3' items={breadcrumb} />

                <h3 className="mt-4 text-danger"> { t('conferencias.my-list') } </h3>

                <div className="px-3 mt-2">
                    <input className="m-auto form-control explorar" type="text" placeholder={ t('search') } onChange={doSetSearch}/>
                </div>

                <div id="divConferencias" className={`overflow-auto h-90 d-flex flex-column p-2  ${styles.list}`}>
                    {
                        isLoading ? <Loader />
                        :
                            <InfiniteScroll
                                dataLength={ lista.length }
                                next={onGetMore}
                                hasMore={ hasMore }
                                loader={ <Loader /> }
                                endMessage={ <div className='mt-3'> </div> }
                                scrollableTarget="divConferencias"
                            >
                                <div className={`row mt-2 mx-0`}>
                                    {
                                        lista?.map((item, key) => {
                                            return <div className='col-xl-4 col-sm-6 col-12' key={key}>
                                                <Conferencia item={item} onRemove={onRemove} onEdit={onShowModal}  />
                                            </div>
                                        })
                                    }
                                </div>
                            </InfiniteScroll>
                    }
                    
                </div>

                <ConferenciaModal
                    item={ item }
                    title={ t('conferencias.update') }
                    modalShow={modalShow}
                    onHide={( callRefresh ) => onRefreshConferencias( callRefresh )}
                />
                
            </div>
        </>
    )
}
