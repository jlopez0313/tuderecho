import React, { useState } from 'react'
import styles from './Contacto.module.scss';
import Avatar from '@/assets/images/abogado/perfil/avatar.png';

export const Contacto = ({ usuario, onAddChat }) => {
  
  return (
    <>
      <div className='d-flex rounded align-items-center border mb-2 p-2 shadow-sm bg-light cursor-pointer' onClick={() => onAddChat( usuario )}>
          <div className='position-relative'>
              <img src={usuario?.photo || Avatar} className={`me-3 ${styles.avatar}`} />
              <div className={`${styles.logged}`}></div>              
          </div>
          <div className="d-flex flex-column w-100">
              <strong>{usuario?.name}</strong>
          </div>
      </div>
    </>
  )
}
