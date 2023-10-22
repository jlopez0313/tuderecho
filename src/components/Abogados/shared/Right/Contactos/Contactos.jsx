import React, { useContext, useEffect, useRef } from 'react'
import { Contacto } from './Contacto/Contacto'
import shared from '@/assets/styles/shared.module.scss';
import styles from './Contactos.module.scss';
import { Chat } from '@/components/shared/Chat/Chat';

import { decodeToken } from "react-jwt";
import { useTranslation } from 'react-i18next';
import { ChatContext } from '@/context/Chat/ChatContext';

export const Contactos = () => {

  const {connectToChat, onAddChat, onRemoveChat, onlineUsers, chatList, socket} = useContext( ChatContext );

  const { t } = useTranslation();

  const token = localStorage.getItem("token") || "";
  const user = decodeToken(token);

  useEffect(() => {
    connectToChat();
  }, [])

  return (
    <>    
      <h6 className='text-danger w-100 fw-bold'> { t('contacts.title') } </h6>

      <div className={`border rounded shadow-sm bg-white overflow-hidden ${shared.container}`}>
        
        <div className={`overflow-auto pe-2 ps-3 mt-2 ${shared.list}`}>
          {
            onlineUsers.value.map( (usuario, key)=> {
                return <Contacto key={key} usuario={usuario} onAddChat={onAddChat} />
            })
          }
        </div>

      </div>

      <div className={`d-flex ${styles.chat}`}>
        {
          chatList.value.map( (chat, key) => {
            return <Chat 
                key={key}
                socket={socket.current}
                user={user}
                chat={ chat }
                onHideChat={() => onRemoveChat(key) }
              />
          })
        }
      </div>
    </>
  )
}
