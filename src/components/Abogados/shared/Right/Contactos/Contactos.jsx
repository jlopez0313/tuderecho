import React, { useEffect, useRef } from 'react'
import { Contacto } from './Contacto/Contacto'
import shared from '@/assets/styles/shared.module.scss';
import styles from './Contactos.module.scss';
import { Chat } from '@/components/shared/Chat/Chat';
import { decodeToken } from "react-jwt";
import socketIO from 'socket.io-client';
import { signal } from "@preact/signals-react";

const onlineUsers = signal([]);
const chatList = signal([])

export const Contactos = () => {

  const socket = useRef( );
  const token = localStorage.getItem('token') || '';
  const user = decodeToken(token);

  const connectToChat = () => {
    socket.current = socketIO.connect(import.meta.env.VITE_BACKEND);
    socket.current.emit('newUser', { ...user, socketID: socket.current.id });

    socket.current.on('getUsers', 
      async(data) => {
        const lista = data.filter( usuario => usuario.uid !== user.uid )
        onlineUsers.value = [...lista];
      }
    );

    socket.current.on('newMessage', (data) => {
      const { to, sender } = data
      
      if( to === user.uid ) {
        const from = onlineUsers.value.find( user => user.uid === sender );
        
        if ( from ) {
          onAddChat ( from )
        } else {
          console.log( 'Empty Users', onlineUsers, from, to);
        }

      }
    })
  }

  const onAddChat = ( usuario ) => {
    socket.current.emit('join', 
      { id: user.uid, friend: usuario.uid || usuario.id },
      ( room ) => {
        if ( chatList.value.some( chat => chat.user.uid === usuario.uid ) ) {
          return ;
        } else if ( chatList.value.length === 3 ) {
          onRemoveChat(0)
        } else {
          chatList.value = [...chatList.value, { user: usuario, room } ];
        }
      }
    );
  }

  const onRemoveChat = ( key ) => {
    const list = [...chatList.value];
    list.splice(key, 1);
    chatList.value = list;
  }

  useEffect(() => {
    connectToChat();
  }, [])

  return (
    <>    
      <h5 className='text-danger w-100 fw-bold'> Contactos </h5>

      <div className='border rounded shadow-sm bg-white overflow-hidden h-100'>

        <div className={`overflow-auto h-95 pe-2 ps-3 mt-2 ${shared.list}`}>
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
