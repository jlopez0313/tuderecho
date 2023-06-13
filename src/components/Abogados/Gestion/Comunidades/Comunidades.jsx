import React, { useEffect, useState } from 'react'
import { myList, remove } from '@/services/Comunidades';
import styles from './Comunidades.module.scss'
import { notify } from '@/helpers/helpers';
import { ComunidadesModal } from '@/components/Modals/Comunidades/Comunidades';
import { Comunidad } from './Comunidad/Comunidad';
import Spinner from 'react-bootstrap/Spinner';
import Breadcrumb from '@/components/shared/Breadcrumb';

import { useTranslation } from 'react-i18next';

export const ComunidadesComponent = () => {
    
    const { t } = useTranslation();

    const breadcrumb = [
        {
            name: 'Home',
            href: '/abogados',
            active: false
        },{
            name: t('comunidades.title'),
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

    const onRefreshVideoteca = (callRefresh = false) => {
        if (callRefresh ) onGetList();
        setModalShow(false)
    }

    const onRemove = ( id ) => {
        remove( id )
        .then( () => {
            onGetList();
            notify( t('comunidades.alerts.removed'), 'success')
        })
        .catch( error => {
            notify( t('comunidades.alerts.error'), 'error')
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

                <h3 className="mt-4 text-danger"> { t('comunidades.my-list') } </h3>

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
                                        return <Comunidad item={item} key={key} onRemove={onRemove} onEdit={onShowModal}  />
                                    })
                                }
                            </div>
                    }
                </div>

                <ComunidadesModal
                    item={ item }
                    title= { t('comunidades.update') }
                    modalShow={modalShow}
                    onHide={( callRefresh ) => onRefreshVideoteca( callRefresh )}
                />
                
            </div>
        </>
    )
}
