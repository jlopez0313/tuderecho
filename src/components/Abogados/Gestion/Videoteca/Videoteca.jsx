import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { list, remove } from '@/store/videoteca/thunks';
import styles from './Videoteca.module.scss'
import { notify } from '@/helpers/helpers';
import { VideotecaModal } from '@/components/Modals/Videoteca/Videoteca';
import { Video } from '@/components/shared/Video/Video';

export const VideotecaComponent = () => {

    const dispatch = useDispatch();
    const { videoteca: lista } = useSelector( (state) => state.videoteca )
    
    const [item, setItem] = useState({});
    const [modalShow, setModalShow] = useState(false);
    
    const onShowModal = ( item ) => {
        setItem(item);
        setModalShow(true);
    }

    const onGetList = async () => {
        dispatch( list() )
    }

    const onRefreshVideoteca = (callRefresh = false) => {
        if (callRefresh ) onGetList();
        setModalShow(false)
    }

    const onRemove = ( id ) => {
        const removed = dispatch( remove( id ) )

        removed
        .then( () => {
            onGetList();
            notify('Videoteca removida', 'success')
        })
        .catch( error => {
            notify('Videoteca onRemove: Internal Error', 'error')
        })
    }

    useEffect( () => {
        onGetList()
    }, [])

    return (
        <>
            <div className="container pb-5">
                <h3 className="mt-5 text-danger"> Mi Videoteca </h3>

                <div className="d-flex">
                    <div className={`w-100 h-75 ps-3 pe-2 mt-2 ${styles.list}`}>
                        {
                            lista?.map((item, key) => {
                                return <Video item={item} key={key} onRemove={onRemove} onEdit={onShowModal}  />
                            })
                        }
                    </div>
                </div>

                <VideotecaModal
                    item={ item }
                    title='Modifica tu Conferencia'
                    show={modalShow}
                    onHide={( callRefresh ) => onRefreshVideoteca( callRefresh )}
                />
                
            </div>
        </>
    )
}
