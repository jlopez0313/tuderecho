import React, { forwardRef, memo, useEffect, useState } from 'react'
import Popover from 'react-bootstrap/Popover';
import Modal from 'react-bootstrap/Modal';
import Picker from 'emoji-picker-react';

export const Emojis = memo( ({ onChosenEmoji, showEmojis, ...props }, ref) => {

    const [show, setShow] = useState( true );

    const doHide = ( refresh = false ) => {
        setShow( false )
        
        const timer1 = setTimeout( () => {
            props.onHide( refresh );
        }, 100)
  
        const timer2 = setTimeout( () => {
            setShow( true )
        }, 200)
  
    }

    const onEmojiClick = (emojiObject) => {
        onChosenEmoji(emojiObject)
    };

    if ( showEmojis) {
        return (
            <Modal
                show={show}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton className='text-center' onHide={doHide} >
                    <Modal.Title className='m-auto' id="contained-modal-title-vcenter">
                        Emojis
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='py-2'>
                    <Picker
                        width={270}
                        height={350}
                        autoFocusSearch={false}
                        previewConfig={ {showPreview: false} }
                        onEmojiClick={onEmojiClick} disableSearchBar={true}
                    />
                </Modal.Body>
            </Modal>
        )
    }

})
