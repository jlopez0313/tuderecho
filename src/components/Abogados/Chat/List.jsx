import React from 'react'
import { forwardRef } from 'react'
import Popover from 'react-bootstrap/Popover';
import { Contacto } from './Contacto/Contacto';
import styles from '@/assets/styles/shared.module.scss';

export const List = forwardRef(
    ({ popper, children, ...props }, ref) => {
        return (
            <Popover
                ref={ref}
                {...props}
                className='rounded-0'
                style={{
                    ...props.style, maxWidth: '345px', width: '345px', height: 'calc(100% - 90px)'
                }}
            >
                <Popover.Header className='bg-danger text-white rounded-0'>
                    <strong> Chat </strong>
                </Popover.Header>
                <Popover.Body className={styles.popperBody}>
                    
                <div className={`overflow-auto h-95 pe-2 ps-3 mt-2 ${styles.list}`}>
                    {
                        [1,1,1,1,1,1].map( (item, key)=> {

                            return <Contacto key={key} item={item} />
                        })
                    }
                </div>
                    
                </Popover.Body>
            </Popover>
        )
    }
)
