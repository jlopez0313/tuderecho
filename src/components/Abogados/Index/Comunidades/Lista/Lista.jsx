import React, { memo, useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner';
import { list, myList, remove } from '@/services/Comunidades';
import { Item } from './Item/Item';
import styles from './Lista.module.scss';
import { useDispatch } from 'react-redux';
import { setRefresh } from '@/store/comunidades/ComunidadesSlice';

export const Lista = memo( ({ uid }) => {

    const [lista, setLista] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch();

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
    }

    const onRemove = ( id ) => {
        remove( id )
        .then( () => {
            onGetList();
            notify('Comunidad removida', 'success')
            dispatch( setRefresh( true ) )
        })
        .catch( error => {
            notify('Comunidad onRemove: Internal Error', 'error')
        })
      }

    useEffect( () => {
        onGetList();
    }, [uid])

    return (
        isLoading
        ? 
            <div className="text-center mt-5">
                <Spinner animation="grow" />
            </div>
        :
            <div className={`w-100 h-75 ps-3 pe-2 mt-5 ${styles.list}`}>
                {
                    lista?.map( (item, key) => {
                        return <Item
                            key={key}
                            item={item}
                            uid={uid}
                            idx={key}
                            onRefresh={(doRefresh = false) => onRefresh( doRefresh )}
                            onRemove={(id) => onRemove(id)}
                        />
                    })
                }
            </div>
    )
})
