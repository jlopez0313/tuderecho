import React, { useEffect, useState } from 'react'
import { myList, remove } from '@/services/Conferencias';
import { Conferencia } from './Conferencia/Conferencia';
import styles from './Conferencias.module.scss'
import { notify } from '@/helpers/helpers';
import { ConferenciaModal } from '@/components/Modals/Conferencias/Conferencia';
import Spinner from 'react-bootstrap/Spinner';
import Breadcrumb from '@/components/shared/Breadcrumb';

import { useTranslation } from 'react-i18next';

export const ConferenciasComponent = () => {

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
    
    const onShowModal = ( item ) => {
        setItem(item);
        setModalShow(true);
    }

    const onGetList = async () => {
        setIsLoading( true )
        setLista( await myList(search) )
        setIsLoading( false )
    }

    const onRefreshConferencias = (callRefresh = false) => {
        if (callRefresh ) onGetList();
        setModalShow(false)
    }

    const onRemove = ( id ) => {
        remove( id )
        .then( () => {
            onGetList();
            notify( t('conferencias.alerts.removed'), 'success')
        })
        .catch( error => {
            notify( t('conferencias.alerts.error'), 'error')
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
            <div className="container pb-5">
                
                <Breadcrumb className='mt-3' items={breadcrumb} />

                <h3 className="mt-4 text-danger"> { t('conferencias.my-list') } </h3>

                <div className="px-3 mt-2">
                    <input className="m-auto form-control explorar" type="text" placeholder={ t('search') } onChange={doSetSearch}/>
                </div>

                <div className="d-flex flex-column">
                    {
                        isLoading
                        ? 
                            <div className="w-100 mt-5 text-center">
                                <Spinner animation="grow" />
                            </div>
                        :
                            <div className={`w-100 h-75 ps-3 pe-2 mt-2 ${styles.list}`}>
                                {
                                    lista?.map((item, key) => {
                                        return <Conferencia item={item} key={key} onRemove={onRemove} onEdit={onShowModal}  />
                                    })
                                }
                            </div>
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
