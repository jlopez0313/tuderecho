import React from 'react'
import { forwardRef } from 'react'
import Popover from 'react-bootstrap/Popover';

export const List = forwardRef(
    ({ popper, children, ...props }, ref) => {
        return (
            <Popover
                ref={ref}
                {...props}
                style={{
                    ...props.style, maxWidth: '360px', width: '360px'
                }}
            >
                <Popover.Header>
                    <strong>Chat</strong>
                </Popover.Header>
                <Popover.Body>
                    <div>Chat</div>    
                </Popover.Body>
            </Popover>
        )
    }
)
