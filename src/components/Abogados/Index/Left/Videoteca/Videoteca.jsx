import React, { useEffect, useState } from 'react'
import { Video } from '@/components/shared/Video/Video';
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '@/assets/styles/shared.module.scss';
import { VideotecaModal } from '@/components/Modals/Videoteca/Videoteca';
import { list, remove } from '@/store/videoteca/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { notify } from '@/helpers/helpers';
import Spinner from 'react-bootstrap/Spinner';

export const Videoteca = () => {

    const dispatch = useDispatch();
    const { videoteca: lista, isLoading } = useSelector( (state) => state.videoteca )
    
    const [modalShow, setModalShow] = useState(false);
    const [search, setSearch] = useState('');

    const onGetList = async () => {
        dispatch( list(search) )
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
            notify('Video removido', 'success')
        })
        .catch( error => {
            notify('Video onRemove: Internal Error', 'error')
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
            <h5 className='text-danger w-100 fw-bold'> Videoteca </h5>

            <div className='border shadow-sm bg-white overflow-hidden h-100'>

                <div className="w-100 text-center border p-2 bg-danger text-white cursor-pointer"
                    onClick={() => setModalShow(true)}
                > 
                    <FontAwesomeIcon icon={faPencil} />
                    <span className='ms-3'>Sube tu Video</span>
                </div>

                <div className="px-3 mt-2">
                    <input className="m-auto form-control explorar" type="text" placeholder="Buscar..." onChange={doSetSearch}/>
                </div>

                <div className={`overflow-auto h-75 pe-2 ps-3 mt-2 ${styles.list}`}>
                    {
                        isLoading
                        ? 
                            <div className="text-center">
                                <Spinner animation="grow" />
                            </div>
                        :
                            lista?.map((item, key) => {
                                return <Video item={item} key={key} onRemove={onRemove} />
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
