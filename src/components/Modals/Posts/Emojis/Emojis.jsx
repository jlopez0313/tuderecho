import React, { forwardRef, useEffect, useState } from 'react'
import Popover from 'react-bootstrap/Popover';
import Modal from 'react-bootstrap/Modal';
import Picker from 'emoji-picker-react';

export const Emojis = ({ onChosenEmoji, ...props }, ref) => {

    const onEmojiClick = (emojiObject) => {
        onChosenEmoji(emojiObject)
    };

    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className='text-center'>
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
