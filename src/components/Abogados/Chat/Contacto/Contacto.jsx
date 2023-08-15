import React, { memo, useEffect, useState } from 'react'
import styles from './Contacto.module.scss';
import Avatar from '@/assets/images/abogado/perfil/avatar.png';
import { decodeToken } from "react-jwt";
import { format } from 'timeago.js';

export const Contacto = memo( ({ item }) => {

  const token = localStorage.getItem('token') || '';
  const { uid } = decodeToken(token);

  const [from, setFrom] = useState({});
  
  const doSetFrom = () => {
    const user = item.users.find( user => user.id === item.chats[0].from )
    const to = item.users.find( user => user.id === item.chats[0].to )
    
    if ( item.chats[0].from === uid ) {
      setFrom( { name: to.name, from: 'Tu:', perfil: to.perfil } )
    } else {
      setFrom( { name: user.name, from: '', perfil: user.perfil } )
    }
  }

  useEffect( () => {
    doSetFrom()
  }, [item])


  return (
    <div className='d-flex align-items-center border mb-2 py-2 ps-2 pe-0 shadow-sm bg-light cursor-pointer'>
        <div>
            <img src={ from.perfil?.photo || Avatar} className={`me-3 ${styles.avatar}`} alt=''/>
        </div>
        <div className="d-flex flex-column w-100">
            <strong>{from.name}</strong>
            <small className='text-muted'> {from.from} {item.chats[0].text}.  { format(item.chats[0].updatedAt) } </small>
        </div>
        <div>
            <img src={Avatar} className={`me-3 ${styles.avatarSmall}`} alt=''/>
        </div>
    </div>
  )
})
