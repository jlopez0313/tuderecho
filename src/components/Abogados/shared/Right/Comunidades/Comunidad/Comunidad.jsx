import React from 'react'
import styles from './Comunidad.module.scss';
import Avatar from '@/assets/images/abogado/perfil/avatar.png';
import { decodeToken } from 'react-jwt';
import { Link } from 'react-router-dom';

export const Comunidad = ({item, onRemove}) => {
  
  const token = localStorage.getItem('token') || '';
  const { uid } = decodeToken(token);

  return (
    <Link to={'/abogados/comunidades/' + item.id}>
    <div className='d-flex border rounded mb-3 p-3 shadow-sm bg-light'>
        <div>
            <img src={item.archivo || Avatar} className={`me-3 ${styles.avatar}`} />
        </div>
        <div className="d-flex flex-column w-100">
            <strong className='text-dark'> {item.titulo} </strong>
            <div className="d-flex justify-content-between">
                <small className='text-dark'> Personas: 25 </small>
            </div>
        </div>
    </div>
    </Link>
  )
}
