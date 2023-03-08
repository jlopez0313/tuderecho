import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { myList, remove } from '@/store/comunidades/thunks';
import styles from './Comunidades.module.scss'
import { notify } from '@/helpers/helpers';
import { ComunidadesModal } from '@/components/Modals/Comunidades/Comunidades';
import { Comunidad } from './Comunidad/Comunidad';
import Spinner from 'react-bootstrap/Spinner';

export const ComunidadesComponent = () => {

    const dispatch = useDispatch();
    const { comunidades: lista, isLoading } = useSelector( (state) => state.comunidad )
    
    const [item, setItem] = useState({});
    const [modalShow, setModalShow] = useState(false);
    const [search, setSearch] = useState('');
    
    const onShowModal = ( item ) => {
        setItem(item);
        setModalShow(true);
    }

    const onGetList = async () => {
        dispatch( myList(search) )
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
                <h3 className="mt-5 text-danger"> Mis Comunidades </h3>

                <div className="px-3 mt-2">
                    <input className="m-auto form-control explorar" type="text" placeholder="Buscar..." onChange={doSetSearch}/>
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
                    title='Modifica tu Comunidad'
                    show={modalShow}
                    onHide={( callRefresh ) => onRefreshVideoteca( callRefresh )}
                />
                
            </div>
        </>
    )
}
