import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { list, remove } from '@/store/conferencias/thunks';
import { Conferencia } from '@/components/shared/Conferencia/Conferencia';
import styles from './Conferencias.module.scss'
import { notify } from '@/helpers/helpers';
import { ConferenciaModal } from '@/components/Modals/Conferencias/Conferencia';

export const ConferenciasComponent = () => {

    const dispatch = useDispatch();
    const { conferencias: lista } = useSelector( (state) => state.conferencia )
    
    const [item, setItem] = useState({});
    const [modalShow, setModalShow] = useState(false);
    
    const onShowModal = ( item ) => {
        setItem(item);
        setModalShow(true);
    }

    const onGetList = async () => {
        dispatch( list() )
    }

    const onRefreshConferencias = (callRefresh = false) => {
        if (callRefresh ) onGetList();
        setModalShow(false)
    }

    const onRemove = ( id ) => {
        const removed = dispatch( remove( id ) )

        removed
        .then( () => {
            onGetList();
            notify('Conferencia removida', 'success')
        })
        .catch( error => {
            notify('Conferencias onRemove: Internal Error', 'error')
        })
    }

    useEffect( () => {
        onGetList()
    }, [])

    return (
        <>
            <div className="container pb-5">
                <h3 className="mt-5 text-danger"> Mis Conferencias </h3>

                <div className="d-flex">
                    <div className={`w-100 h-75 ps-3 pe-2 mt-2 ${styles.list}`}>
                        {
                            lista?.map((item, key) => {
                                return <Conferencia item={item} key={key} onRemove={onRemove} onEdit={onShowModal}  />
                            })
                        }
                    </div>
                </div>

                <ConferenciaModal
                    item={ item }
                    title='Modifica tu Conferencia'
                    show={modalShow}
                    onHide={( callRefresh ) => onRefreshConferencias( callRefresh )}
                />
                
            </div>
        </>
    )
}
