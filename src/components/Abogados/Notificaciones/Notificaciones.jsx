import React from 'react'
import { forwardRef } from 'react'
import Popover from 'react-bootstrap/Popover';

export const Notificaciones = forwardRef(
    ()=> {

        return (
            
            <div
                className='rounded popover'
                style={{
                    maxWidth: '345px', width: '345px', height: '100%'
                }}
            >
                <Popover.Header className='bg-danger text-white rounded-top'>
                    <strong> Notificaciones </strong>
                </Popover.Header>
                <Popover.Body>
                    <div>Notificaciones</div>    
                </Popover.Body>
            </div>
        )
})
