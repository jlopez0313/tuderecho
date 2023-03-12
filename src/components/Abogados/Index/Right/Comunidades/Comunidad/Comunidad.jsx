import React from 'react'
import styles from './Comunidad.module.scss';
import Avatar from '@/assets/images/abogado/perfil/avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { decodeToken } from 'react-jwt';
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';

export const Comunidad = ({item, onRemove}) => {
  
  const token = localStorage.getItem('token') || '';
  const { uid } = decodeToken(token);

  return (
    <div className='d-flex border rounded mb-3 p-3 shadow-sm bg-light'>
        <div>
            <img src={item.archivo || Avatar} className={`me-3 ${styles.avatar}`} />
        </div>
        <div className="d-flex flex-column w-100">
            <strong> {item.titulo} </strong>
            <div className="d-flex justify-content-between">
                <small
                  className={ uid === item.user.id ? 'w-100' : '' }
                >
                  Personas: 25
                </small>
                {
                  uid === item.user.id ? 
                    <>
                        <FontAwesomeIcon
                            icon={faEdit}
                            className='me-4'
                            // onClick={() => onRemove( item.id ) }
                            title="Editar"
                        />
                        
                        <FontAwesomeIcon
                            icon={faTrashCan}
                            className='cursor-pointer text-danger'
                            onClick={() => onRemove( item.id ) }
                            title="Eliminar"
                        />
                    </>
                  : 
                    <small className=''>
                      <FontAwesomeIcon icon={faCartShopping} className='me-2' />
                      Suscribirse { item.gratis === 'S' ? 'Gratis' : `$${item.precio}`}
                    </small>
                }

            </div>
        </div>
    </div>
  )
}
