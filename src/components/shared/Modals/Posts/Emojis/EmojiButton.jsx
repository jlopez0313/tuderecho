import React, { useState } from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { Emojis } from './Emojis';

export const EmojiButton = ({onSetComment}) => {
    const [show, setModalShow] = useState( false );
    
    const onChosenEmoji = ( chosenEmoji ) => {
        onSetComment( chosenEmoji.emoji )
    }

    return (
        <>
            <FontAwesomeIcon
                className='icon cursor-pointer mx-2'
                icon={faFaceSmile}
                title='Emojis'
                onClick={() => setModalShow( true )}
            />
            <Emojis
                show={ show }
                onHide={() => setModalShow( false )}
                onChosenEmoji={onChosenEmoji}
            />
        </>
    )
}
