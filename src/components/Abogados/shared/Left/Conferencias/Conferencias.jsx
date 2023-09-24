import React, { useEffect, useState } from 'react'
import { Conferencia } from './Conferencia/Conferencia';
import { faPencil, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '@/assets/styles/shared.module.scss';
import { ConferenciaModal } from '@/components/Modals/Conferencias/Conferencia';
import { myList, remove } from '@/services/Conferencias';
import { notify } from '@/helpers/helpers';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setRefresh } from '@/store/conferencias/ConferenciasSlice';

import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader } from '@/components/shared/Loader/Loader';

import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

import { useTranslation } from 'react-i18next';

export const Conferencias = () => {

    const limit = 10;
    const { t } = useTranslation();
    
    const { refresh } = useSelector(state => state.conferencia);
    const dispatch = useDispatch()
    
    const [modalShow, setModalShow] = useState( false );
    const [search, setSearch] = useState('');
    const [lista, setLista] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const onGetList = async () => {
        setIsLoading( true )
        
        const lista = await myList(search, page, limit)
        setLista( lista )
        
        if ( lista.length < limit ) {
            setHasMore( false )
        }

        setIsLoading( false );
        dispatch( setRefresh(false) );
        
        if (search) {
            setPage(prevPage => prevPage + 1);
        }
    }

    const onGetMore = async () => {
        const moreList = await myList( search, page, limit )

        if ( moreList.length < limit ) {
            setHasMore( false )
        }

        setLista( list => [...list, ...moreList] )
        setPage(prevPage => prevPage + 1);
    }

    const onRefreshConferencias = ( doRefresh ) => {
        if (doRefresh) {
            onGetList()
        }

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
                    notify( t('conferencia.alerts.removed') , 'success')
                })
                .catch( error => {
                    notify( t('conferencia.alerts.error'), 'error')
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

    useEffect( () => {
        if ( refresh ) {
            setPage(1);            
            onGetList();
        }
    }, [refresh])

    return (
        <>
            <h6 className='text-danger w-100 fw-bold'> { t('conferencias.title') } </h6>

            <div className={`border rounded shadow-sm bg-white overflow-hidden position-relative ${styles.container}`}>
                <div className="w-100 rounded text-center border p-2 bg-danger text-white cursor-pointer"
                    onClick={() => setModalShow(true)}
                > 
                    <FontAwesomeIcon icon={faPencil} />
                    <span className='ms-3'> { t('conferencias.create') } </span>
                </div>

                {/*
                    <div className="px-3 mt-2">
                        <input className="m-auto form-control explorar" type="text" placeholder="Buscar..." onChange={doSetSearch}/>
                    </div>
                */}

                <div id="divConferences" className={`overflow-auto px-3 mt-2 ${styles.list}`}>
                    {
                        isLoading ? <Loader />
                        :
                            lista?.length > 0
                            ?
                                <InfiniteScroll
                                    dataLength={ lista.length }
                                    next={onGetMore}
                                    hasMore={ hasMore }
                                    loader={ <Loader /> }
                                    endMessage={ <div className='mt-3'> </div> }
                                    scrollableTarget="divConferences"
                                >
                                    {
                                        lista.map((item, key) => {
                                            return <Conferencia item={item} key={key} onRemove={onRemove} />
                                        })
                                    }
                                </InfiniteScroll>
                            : <div className='alert alert-danger'> { t('empty') } </div>
                    }
                </div>


                <ConferenciaModal
                    title={ t('conferencias.create') }
                    modalShow={modalShow}
                    onHide={(doRefresh = false ) => onRefreshConferencias( doRefresh)}
                />

                <Link to="/abogados/conferencias" className="order-1 m-auto">
                    <Button className='position-absolute rounded-circle bottom-2 end-2'>
                        <FontAwesomeIcon icon={faSearch} />
                    </Button>
                </Link>

            </div>

        </>
    )
}
