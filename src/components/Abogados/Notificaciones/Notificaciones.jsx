import React from 'react'
import { forwardRef } from 'react'
import Popover from 'react-bootstrap/Popover';

export const Notificaciones = forwardRef(
    ({ popper, children, ...props }, ref)=> {
        return (
            <Popover
            ref={ref}
            {...props}
            style={{
                ...props.style, maxWidth: '490px', width: '490px'
            }}
        >
          <Popover.Header>
              <strong>Notificacfiones</strong>
          </Popover.Header>
          <Popover.Body>
                <div>Notificaciones</div>
            
            
          </Popover.Body>
        </Popover>
        )
})
