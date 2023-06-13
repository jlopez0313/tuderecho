import React, { memo, useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner';
import { list, myList, remove } from '@/services/Comunidades';
import { Item } from './Item/Item';
import styles from './Lista.module.scss';
import { useDispatch } from 'react-redux';
import { setRefresh } from '@/store/comunidades/ComunidadesSlice';
import { ComunidadesModal } from '@/components/Modals/Comunidades/Comunidades';

import { useTranslation } from 'react-i18next';

export const Lista = memo( ({ uid }) => {

    const { t } = useTranslation();

    const [item, setItem] = useState({});
    const [modalShow, setModalShow] = useState(false);

    const [lista, setLista] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch();

    const onShowModal = ( item ) => {
        setItem(item);
        setModalShow(true);
    }

    const onGetList = async () => {
        setIsLoading( true )
        
        if (uid) {
            setLista( await myList() )
        } else {
            setLista( await list() )
        }
        setIsLoading( false )

    }

    const onRefresh = (doRefresh = false) => {
        if (doRefresh) {
            onGetList()
        }

        setModalShow(false)
    }

    const onRemove = ( id ) => {
        remove( id )
        .then( () => {
            onGetList();
            notify( t('comunidades.alerts.removed') , 'success')
            dispatch( setRefresh( true ) )
        })
        .catch( error => {
            notify( t('comunidades.alerts.error') , 'error')
        })
    }

    useEffect( () => {
        onGetList();
    }, [uid])

    return (
        <>
            {
                isLoading
                ? 
                    <div className="text-center mt-5">
                        <Spinner animation="grow" />
                    </div>
                :
                    lista.length ? 
                        <div className={`w-100 h-75 ps-3 pe-2 mt-5 ${styles.list}`}>
                            {
                                lista?.map( (item, key) => {
                                    return <Item
                                        key={key}
                                        item={item}
                                        uid={uid}
                                        idx={key}
                                        onEdit={onShowModal}
                                        onRefresh={(doRefresh = false) => onRefresh( doRefresh )}
                                        onRemove={(id) => onRemove(id)}
                                    />
                                })
                            }
                        </div>
                    : 
                        <div className='alert alert-danger m-auto w-75'> { t('comunidades.empty') } </div>
            
            }

            <ComunidadesModal
                item={ item }
                title={ t('comunidades.update') }
                modalShow={modalShow}
                onHide={( callRefresh ) => onRefresh( callRefresh )}
            />
        </>
    )
})
