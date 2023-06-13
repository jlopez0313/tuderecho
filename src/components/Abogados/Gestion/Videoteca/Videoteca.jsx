import React, { useEffect, useState } from 'react'
import { myList, remove } from '@/services/Videoteca';
import styles from './Videoteca.module.scss'
import { notify } from '@/helpers/helpers';
import { VideotecaModal } from '@/components/Modals/Videoteca/Videoteca';
import { Video } from './Video/Video';
import Spinner from 'react-bootstrap/Spinner';
import Breadcrumb from '@/components/shared/Breadcrumb';

import { useTranslation } from 'react-i18next';

export const VideotecaComponent = () => {

    const { t } = useTranslation();

    const breadcrumb = [
        {
            name: 'Home',
            href: '/abogados',
            active: false
        },{
            name: t('videoteca.title'),
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

    return (
        <>
            <div className="container pb-5">
                
                <Breadcrumb className='mt-3' items={breadcrumb} />

                <h3 className="mt-4 text-danger"> { t('videoteca.my-list') } </h3>

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
                                        return <Video item={item} key={key} onRemove={onRemove} onEdit={onShowModal}  />
                                    })
                                }
                            </div>
                    }
                </div>

                <VideotecaModal
                    item={ item }
                    title={ t('videoteca.update') }
                    show={modalShow}
                    onHide={( callRefresh ) => onRefreshVideoteca( callRefresh )}
                />
                
            </div>
        </>
    )
}
