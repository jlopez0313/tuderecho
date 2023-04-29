import React, { useState } from 'react'
import styles from './Chat.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

export const ChatFooter = ({ socket, user, chat }) => {

    const [message, setMessage] = useState('');
  
    const onSendMessage = ( evt ) => {
        evt.preventDefault();

        if (message.trim()) {
            socket.emit('sendMessage', 
                {
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

    return (
        <div className={`${styles.chatFooter}`}>
            <form className="form d-flex" onSubmit={(e) => onSendMessage(e)}>
                <input
                    type="text"
                    placeholder="Escribe tu mensaje"
                    className="form-control message"
                    value={message}
                    onChange={(e) => handleTyping(e)}
                />
                <button className="btn">
                    <FontAwesomeIcon icon={faPlay} className='text-danger' />
                </button>
            </form>
        </div>
    )
}
