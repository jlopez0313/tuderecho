import React, { useEffect, useState } from 'react'
import { myList, remove } from '@/services/Conferencias';
import { Conferencia } from '@/components/shared/Conferencia/Conferencia';
import styles from './Conferencias.module.scss'
import { notify } from '@/helpers/helpers';
import { ConferenciaModal } from '@/components/Modals/Conferencias/Conferencia';
import Spinner from 'react-bootstrap/Spinner';
import Breadcrumb from '@/components/shared/Breadcrumb';

const breadcrumb = [
    {
        name: 'Home',
        href: '/abogados',
        active: false
    },{
        name: 'Mis Conferencias',
        active: true
    }
]

export const ConferenciasComponent = () => {

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
            notify('Conferencia removida', 'success')
        })
        .catch( error => {
            notify('Conferencias onRemove: Internal Error', 'error')
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

                <h3 className="mt-4 text-danger"> Mis Conferencias </h3>

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
                                        return <Conferencia item={item} key={key} onRemove={onRemove} onEdit={onShowModal}  />
                                    })
                                }
                            </div>
                    }
                    
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
