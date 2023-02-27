import React from 'react'
import styles from './Comunidad.module.scss';
import Avatar from '@/assets/images/abogado/perfil/avatar.png';

export const Comunidad = ({item, onRemove}) => {
  return (
    <div className='d-flex border mb-3 p-3 shadow-sm bg-light'>
        <div>
            <img src={item.archivo || Avatar} className={`me-3 ${styles.avatar}`} />
        </div>
        <div className="d-flex flex-column w-100">
            <strong> {item.titulo} </strong>
            <div className="d-flex justify-content-between">
                <small>Personas: 25</small>
                <small className='text-danger'>Suscribirse { item.gratis === 'S' ? '' : `$${item.precio}`}</small>
            </div>
        </div>
    </div>
  )
}
