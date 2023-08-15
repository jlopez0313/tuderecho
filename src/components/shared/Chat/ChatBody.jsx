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
                                <img src={ user?.photo || Avatar} className={`me-1 ${styles.avatar}`} />
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
                        <img alt="Seen by Fernanda Garcia at Tuesday 2:07pm" className={styles.readBy} height="14px" src="https://scontent.fclo1-3.fna.fbcdn.net/v/t39.30808-1/338430551_231895846028394_7501418933711794115_n.jpg?stp=dst-jpg_p100x100&amp;_nc_cat=106&amp;ccb=1-7&amp;_nc_sid=7206a8&amp;_nc_eui2=AeEa1Dkmk3WbTEYBHclLR-I9BWjCzLvFDWAFaMLMu8UNYCKxuDxeguLP2Qu0jFHASjA&amp;_nc_ohc=YP8ZlbDTVzoAX__nCpj&amp;_nc_ad=z-m&amp;_nc_cid=0&amp;_nc_ht=scontent.fclo1-3.fna&amp;oh=00_AfC4Zwc5g5BmMmudhYKgymwxX1El6K8NvSKeg8Kq2SYRDg&amp;oe=64D5A5C9" width="14px" />
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
