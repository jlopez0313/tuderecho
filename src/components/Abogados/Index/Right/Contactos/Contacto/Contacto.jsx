import React from 'react'
import styles from './Contacto.module.scss';
import Avatar from '@/assets/images/abogado/perfil/avatar.png';

export const Contacto = () => {
  return (
    <div className='d-flex align-items-center border mb-2 p-2 shadow-sm bg-light'>
        <div>
            <img src={Avatar} className={`me-3 ${styles.avatar}`} />
        </div>
        <div className="d-flex flex-column w-100">
            <strong>El Derecho Penal</strong>
        </div>
    </div>
  )
}
