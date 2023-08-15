import React, { useEffect, useState } from 'react'
import { forwardRef } from 'react'
import Popover from 'react-bootstrap/Popover';
import { Contacto } from './Contacto/Contacto';
import styles from '@/assets/styles/shared.module.scss';
import { all } from '@/services/Chat';
import { Loader } from '@/components/shared/Loader/Loader';

export const List = forwardRef(
    () => {

        const [rooms, setRooms] = useState([]);
        const [isLoading, setIsLoading] = useState(false)

        const getAll = async () => {
            setIsLoading( true )
            const rooms = await all();
            setRooms( rooms );
            setIsLoading( false )
        }
    
        useEffect( () => {
            getAll();
        }, [])

        return (
            <div
                className='rounded popover'
                style={{
                    maxWidth: '345px', width: '345px', height: '100%'
                }}
            >
                <Popover.Header className='bg-danger text-white rounded-top'>
                    <strong> Chat </strong>
                </Popover.Header>
                <Popover.Body className={styles.popperBody}>
                    
                <div className={`overflow-auto h-95 pe-2 ps-3 mt-2 ${styles.list}`}>
                    {
                        isLoading ? <Loader />
                        :
                            rooms.map( (item, key)=> {

                                return <Contacto key={key} item={item} />
                            })
                    }
                </div>
                    
                </Popover.Body>
            </div>
        )
    }
)
