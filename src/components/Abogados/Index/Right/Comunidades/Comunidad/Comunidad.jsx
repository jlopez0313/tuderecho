import React from 'react'
import styles from './Comunidad.module.scss';
import Avatar from '@/assets/images/abogado/perfil/avatar.png';

export const Comunidad = () => {
  return (
    <div className='d-flex border mb-3 p-3 shadow-sm bg-light'>
        <div>
            <img src={Avatar} className={`me-3 ${styles.avatar}`} />
        </div>
        <div className="d-flex flex-column w-100">
            <strong>El Derecho Penal</strong>
            <div className="d-flex justify-content-between">
                <small>Personas: 25</small>
                <small>Suscribirse $25</small>
            </div>
        </div>
    </div>
  )
}
