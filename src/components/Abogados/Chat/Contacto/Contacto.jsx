import React from 'react'
import styles from './Contacto.module.scss';
import Avatar from '@/assets/images/abogado/perfil/avatar.png';

export const Contacto = () => {
  return (
    <div className='d-flex align-items-center border mb-2 py-2 ps-2 pe-0 shadow-sm bg-light cursor-pointer'>
        <div>
            <img src={Avatar} className={`me-3 ${styles.avatar}`} />
        </div>
        <div className="d-flex flex-column w-100">
            <strong>El Derecho Penal</strong>
            <small className='text-muted'> Tu: Hola Mundo.  1d </small>
        </div>
        <div>
            <img src={Avatar} className={`me-3 ${styles.avatarSmall}`} />
        </div>
    </div>
  )
}
