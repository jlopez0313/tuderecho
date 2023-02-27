import React from 'react'
import Card from 'react-bootstrap/Card';
import styles from '../../../Index.module.scss';
import { decodeToken } from 'react-jwt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

export const Video = ({item, onRemove}) => {

  const token = localStorage.getItem('token') || '';
  const { uid } = decodeToken(token);

  return (
    <Card className={`d-flex flex-column border rounded-0 shadow-sm bg-light mb-3 ${styles.listItem}`}>
        <Card.Img variant="top" className='rounded-0' src={`http://img.youtube.com/vi/${item.video}/0.jpg`} alt='' />

        <Card.Body>
          {
              uid === item.user.id 
              ?
                  <FontAwesomeIcon
                      icon={faTrashCan}
                      className='cursor-pointer position-absolute end-3 text-danger'
                      onClick={() => onRemove( item.id ) }
                      title="Eliminar"
                  />
              : null
          }

          <Card.Text className='d-flex flex-column mb-2'>
            <small className='text-uppercase'> 
              <strong> Conferencia {item.titulo} </strong>
            </small>
            <small className=''> Expositor: {item.user.name} </small>
          </Card.Text>
          <div className='d-flex justify-content-between'>
            <small className='text-danger'> Suscribirse </small>
            <small className='text-danger'> Compartir </small>
          </div>
        </Card.Body>
    </Card>
  )
}
