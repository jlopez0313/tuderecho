import React, { memo, useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner';
import { list, myList, remove } from '@/services/Conferencias';
import { Item } from './Item/Item';
import styles from './Lista.module.scss';
import { useDispatch } from 'react-redux';
import { setRefresh } from '@/store/comunidades/ComunidadesSlice';
import { ConferenciaModal } from '@/components/Modals/Conferencias/Conferencia';
import { PostModal } from '@/components/Modals/Posts/Post';
import { PublicacionProvider } from '@/context/publicacion/PublicacionProvider';

import { useTranslation } from 'react-i18next';

export const Lista = memo( ({ uid }) => {

    const { t } = useTranslation();

    const [item, setItem] = useState({});
    const [modalShow, setModalShow] = useState(false);
    const [showModalShare, setShowModalShare] = useState(false);

    const [lista, setLista] = useState([])
    const [isLoading, setIsLoading] = useState(false)

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
        
        if (uid) {
            setLista( await myList() )
        } else {
            setLista( await list() )
        }
        setIsLoading( false )

    }

    const onRefresh = (doRefresh) => {
        if (doRefresh) {
            onGetList()
        }
        setModalShow(false)
        setShowModalShare(false);
    }

    const onRemove = ( id ) => {
        remove( id )
        .then( () => {
            onGetList();
            notify( t('conferencias.alerts.removed') , 'success')
            dispatch( setRefresh( true ) )
        })
        .catch( error => {
            notify( t('conferencias.alerts.error'), 'error')
        })
      }

    useEffect( () => {
        onGetList();
    }, [uid])

    return (
        <PublicacionProvider>
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
                                        onShare={onSharing}
                                        onEdit={onShowModal} 
                                        onRefresh={(doRefresh = false) => onRefresh( doRefresh )}
                                        onRemove={(id) => onRemove(id)}
                                    />
                                })
                            }
                        </div>
                    : 
                        <div className='alert alert-danger m-auto w-75'> { t('conferencias.empty') } </div>
            }
            
            <ConferenciaModal
                item={ item }
                title= { t('conferencias.update') }
                modalShow={modalShow}
                onHide={( callRefresh ) => onRefresh( callRefresh )}
            />

            <PostModal
                title={ t('share') }
                conferencia={item}
                modalShow={showModalShare}
                onHide={( callRefresh = false ) => onRefresh( callRefresh )}
            />
        </PublicacionProvider>
    )
})
