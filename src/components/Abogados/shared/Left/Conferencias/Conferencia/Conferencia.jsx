import React from 'react'
import Card from 'react-bootstrap/Card';
import styles from '@/assets/styles/shared.module.scss';
import { format } from 'date-fns'
import { decodeToken } from 'react-jwt';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

export const Conferencia = ({item, onRemove, onEdit}) => {

  const { t } = useTranslation();
  
  const token = localStorage.getItem('token') || '';
  const { uid } = decodeToken(token);

  return (
    <Link to={'/abogados/conferencias/' + item.id}>

      <Card className={`d-flex flex-column border rounded shadow-sm bg-light mb-3 ${styles.listItem} text-dark`}>
          <Card.Img variant="top" className='rounded' src={item.archivo} alt='' />

          <Card.Body>
            <Card.Text className='d-flex flex-column'>
              <small className='text-uppercase d-flex'> 
                <strong className='flex-grow-1'> { t('conferencias.conference') } {item.titulo} </strong>
              </small>
              <small className=''> { t('conferencias.expositor') }: {item.user.name} </small>
              <small className=''> { t('conferencias.date') }: { format(new Date(item.fecha), 'yyyy-MM-dd,  HH:mm') } </small>
            </Card.Text>
          </Card.Body>

      </Card>

    </Link>
  )
}
