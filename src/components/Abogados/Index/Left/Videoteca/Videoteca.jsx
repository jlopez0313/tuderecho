import React, { useEffect, useState } from 'react'
import { Video } from './Video/Video';
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '../../Index.module.scss';
import { VideotecaModal } from '@/components/Modals/Videoteca/Videoteca';
import { list, remove } from '@/store/videoteca/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { notify } from '@/helpers/helpers';

export const Videoteca = () => {

    const dispatch = useDispatch();
    const { videoteca: lista } = useSelector( (state) => state.videoteca )
    
    const [modalShow, setModalShow] = useState(false);

    const onGetList = async () => {
        dispatch( list() )
    }
    
    const onRefreshVideoteca = () => {
        onGetList()
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
            <h5 className='text-danger w-100 fw-bold'> Videoteca </h5>

            <div className='border shadow-sm bg-white overflow-hidden h-90'>

                <div className="w-100 text-center border p-2 bg-danger text-white cursor-pointer"
                    onClick={() => setModalShow(true)}
                > 
                    <FontAwesomeIcon icon={faPencil} />
                    <span className='ms-3'>Sube tu Video</span>
                </div>

                <div className="px-3 mt-2">
                    <input className="m-auto form-control explorar" type="text" placeholder="Buscar..."/>
                </div>

                <div className={`overflow-auto h-75 pe-2 ps-3 mt-2 ${styles.list}`}>
                    {
                        lista.map((item, key) => {
                            return <Video item={item} key={key} />
                        })
                    }
                </div>

            </div>

            <VideotecaModal
                title='Sube tu Video'
                show={modalShow}
                onHide={() => onRefreshVideoteca()}
            />
        </>
    )
}
