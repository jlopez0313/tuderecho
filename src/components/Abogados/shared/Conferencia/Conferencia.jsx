import React from 'react'
import Card from 'react-bootstrap/Card';
import styles from '@/assets/styles/shared.module.scss';
import { format } from 'date-fns'
import { decodeToken } from 'react-jwt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping, faShare } from '@fortawesome/free-solid-svg-icons';

export const Conferencia = ({item, onRemove, onEdit}) => {
  
  const token = localStorage.getItem('token') || '';
  const { uid } = decodeToken(token);

  return (
    <Card className={`d-flex flex-column border rounded shadow-sm bg-light mb-3 ${styles.listItem}`}>
        <Card.Img variant="top" className='rounded' src={item.archivo} alt='' />

        <Card.Body>
          <Card.Text className='d-flex flex-column mb-2'>
            <small className='text-uppercase d-flex'> 
              <strong className='flex-grow-1'> Conferencia {item.titulo} </strong>
            </small>
            <small className=''> Expositor: {item.user.name} </small>
            <small className=''> Fecha: { format(new Date(item.fecha), 'yyyy-MM-dd,  HH:mm') } </small>
          </Card.Text>
          <div className='d-flex justify-content-between'>
            
            <small
              className={`${ uid === item.user.id ? 'w-100' : '' } `}
            >
              <FontAwesomeIcon icon={faShare} className='me-2' />
              Compartir
            </small>
            
            {
                uid === item.user.id ? 
                <>
                    <FontAwesomeIcon
                        icon={faEdit}
                        className='me-4'
                        // onClick={() => onEdit( item ) }
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
                <small className='text-danger'> 
                  <FontAwesomeIcon icon={faCartShopping} className='me-2' />
                  Suscribirse { item.gratis === 'S' ? 'Gratis' : `$${item.precio}`}
                </small>
            }

          </div>
        </Card.Body>

    </Card>
  )
}
