import React from 'react'
import { forwardRef } from 'react'
import Popover from 'react-bootstrap/Popover';

export const Notificaciones = forwardRef(
    ({ popper, children, ...props }, ref)=> {
        return (
            <Popover
                ref={ref}
                {...props}
                className='rounded-0'
                style={{
                    ...props.style,
                    maxWidth: '345px',
                    width: '345px',
                    height: 'calc(100% - 90px)',
                    position: 'absolute',
                    right: '20px'
                }}
            >
                <Popover.Header className='bg-danger text-white rounded-0'>
                    <strong> Notificaciones </strong>
                </Popover.Header>
                <Popover.Body>
                    <div>Notificaciones</div>    
                </Popover.Body>
            </Popover>
        )
})
