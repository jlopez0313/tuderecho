import React, { useState } from 'react'
import styles from './Chat.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { decodeToken } from "react-jwt";
import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';
import { setFocus } from '@/store/chat/ChatSlice';

export const ChatFooter = ({ socket, user, chat }) => {

    const token = localStorage.getItem('token') || '';
    const { uid } = decodeToken(token);

    const { t } = useTranslation();

    const [message, setMessage] = useState('');
    const dispatch = useDispatch()
  
    const onSendMessage = ( evt ) => {
        evt.preventDefault();

        if (message.trim()) {
            socket.emit('sendMessage', 
                {
                    read: false,
                    from: uid,
                    to: chat.user.uid,
                    room: chat.room,
                    text: message,
                    sender: user?.uid,
                    id: user?.uid,
                    socketID: socket.id,
                },
                ( data ) => {
                    console.log('respuesta', data);
                }
            )
        }

        setMessage('');
        socket.emit('typing',
            {
                room: chat.room,
                text: '',
            }
        );
    }

    const handleTyping = (evt) => {
        const message = evt.target.value;
        setMessage( message )

        if (message.trim()) {
            socket.emit('typing', 
                {
                    room: chat.room,
                    text: `${user?.name} is typing...`,
                }
            );
        } else {
            socket.emit('typing',
                {
                    room: chat.room,
                    text: '',
                }
            );
        }
    }

    const doOnFocus = ( hasFocus ) => {
        dispatch( setFocus( hasFocus ) )

        const uIDs = chat.room.split('-room-');
        const otherUID = uIDs.find( id => id !== uid );

        console.log('object');
        socket.emit('read',
            {
                from: otherUID,
                room: chat.room
            }
        );
    }

    return (
        <div className={`${styles.chatFooter}`}>
            <form className="form d-flex" onSubmit={(e) => onSendMessage(e)}>
                <input
                    type="text"
                    placeholder={ t('chat.form.message-placehoder') }
                    className="form-control message"
                    value={message}
                    onChange={(e) => handleTyping(e)}
                    onFocus={() => doOnFocus( true )}
                    onBlur={() => doOnFocus( false )}
                />
                <button className="btn">
                    <FontAwesomeIcon icon={faPlay} className='text-danger' />
                </button>
            </form>
        </div>
    )
}
