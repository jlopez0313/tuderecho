import React from 'react'
import styles from './Chat.module.scss';
import shared from '@/assets/styles/shared.module.scss';
import Avatar from '@/assets/images/abogado/perfil/avatar.png';
import { useSelector } from 'react-redux';

export const ChatBody = ({ user, typingStatus, messages, lastMessageRef }) => {

    const { read } = useSelector( state => state.chat );

    return (
        <div className={`${shared.list} ${styles.chatBody}`}>
            {
                messages.map( (message, idx) => {
                    return message.sender === user?.uid ?
                        <div className={`message__chats`} key={idx}>
                            <div className={`${styles.message} ${styles.sender}`}>
                                <span>{message.text}</span>
                            </div>
                        </div>
                    : 
                        <div className={`message__chats d-flex align-items-center`}  key={idx}>
                            { /*
                            <div className='position-relative'>
                                <img src={ user?.photo || Avatar} className={`me-1 ${styles.avatar}`} alt=''/>
                            </div>
                            */}
                            <div className={`${styles.message} ${styles.recipient} w-100`}>
                                <span>{message.text}</span>
                            </div>
                        </div>
                })
            }

            {
                read ? 
                    <div className={`d-flex justify-content-end ${styles.read}`}>
                        <img alt="Seen by Fernanda Garcia at Tuesday 2:07pm" className={styles.readBy} height="14px" src="" width="14px" />
                    </div>
                : null
            }


            {/*This is triggered when a user is typing*/}
            <div className={`${styles.status}`}>
                <span>{typingStatus}</span>
            </div>

            <div ref={lastMessageRef} />
        </div>
    )
}
