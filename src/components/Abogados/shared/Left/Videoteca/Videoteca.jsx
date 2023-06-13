import React, { useEffect, useState } from 'react'
import { Video } from './Video/Video';
import { faPencil, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '@/assets/styles/shared.module.scss';
import { VideotecaModal } from '@/components/Modals/Videoteca/Videoteca';
import { myList, remove } from '@/services/Videoteca';
import { notify } from '@/helpers/helpers';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setRefresh } from '@/store/videoteca/VideotecaSlice';

import { useTranslation } from 'react-i18next';

export const Videoteca = () => {

    const { t } = useTranslation();

    const { refresh } = useSelector(state => state.videoteca);
    const dispatch = useDispatch()

    const [modalShow, setModalShow] = useState(false);
    const [search, setSearch] = useState('');
    const [lista, setLista] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const onGetList = async () => {
        setIsLoading( true )
        setLista( await myList(search) )
        setIsLoading( false )
        dispatch( setRefresh(false) );
    }
    
    const onRefreshVideoteca = (doRefresh) => {
        if (doRefresh) {
            onGetList()
        }

        setModalShow(false)
    }

    const onRemove = ( id ) => {
        remove( id )
        .then( () => {
            onGetList();
            notify( t('videoteca.alerts.removed'), 'success')
        })
        .catch( error => {
            notify( t('videoteca.alerts.error'), 'error')
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
          onGetList();
        }
    }, [refresh])

    return (
        <>
            <h5 className='text-danger w-100 fw-bold'> { t('videoteca.title') } </h5>

            <div className={`border rounded shadow-sm bg-white overflow-hidden position-relative ${styles.container}`}>

                <div className="w-100 rounded text-center border p-2 bg-danger text-white cursor-pointer"
                    onClick={() => setModalShow(true)}
                > 
                    <FontAwesomeIcon icon={faPencil} />
                    <span className='ms-3'> { t('videoteca.create') } </span>
                </div>

                <div className="px-3 mt-2">
                    <input className="m-auto form-control explorar" type="text" placeholder={ t('search') } onChange={doSetSearch}/>
                </div>

                <div className={`overflow-auto h-75 pe-2 ps-3 mt-2 ${styles.list}`}>
                    {
                        isLoading
                        ? 
                            <div className="text-center">
                                <Spinner animation="grow" />
                            </div>
                        :
                            lista?.length > 0
                            ?
                                lista.map((item, key) => {
                                    return <Video item={item} key={key} onRemove={onRemove} />
                                })
                            : <div className='alert alert-danger'> { t('empty') } </div>
                    }
                </div>


                <VideotecaModal
                    title={ t('videoteca.create') }
                    modalShow={modalShow}
                    onHide={(doRefresh = false) => onRefreshVideoteca(doRefresh)}
                />
                

                <Link to="/abogados/videoteca" className="order-1 m-auto">
                    <Button className='position-absolute rounded-circle bottom-2 end-2'>
                        <FontAwesomeIcon icon={faSearch} />
                    </Button>
                </Link>

            </div>
        </>
    )
}
