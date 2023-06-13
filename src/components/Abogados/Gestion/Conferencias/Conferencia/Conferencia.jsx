import React from 'react'
import Card from 'react-bootstrap/Card';
import styles from '@/assets/styles/shared.module.scss';
import { format } from 'date-fns'
import { decodeToken } from 'react-jwt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping, faSearch, faShare } from '@fortawesome/free-solid-svg-icons';

import style from './Conferencia.module.scss'
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

export const Conferencia = ({item, onRemove, onEdit}) => {

  const { t } = useTranslation();
  
  const token = localStorage.getItem('token') || '';
  const { uid } = decodeToken(token);

  return (
    <Card className={`d-flex flex-column border rounded shadow-sm bg-light mb-3 ${style.listItem}`}>
        <div className={`rounded ${style.imgContent}`}>
          <Card.Img variant="top" className={`rounded ${style.picture}`} src={item.archivo} alt='' />
        </div>

        <Card.Body>
          <Card.Text className='d-flex flex-column mb-2'>
            <small className='text-uppercase d-flex'> 
              <strong className='flex-grow-1'> { t('conferencias.conference') } {item.titulo} </strong>
            </small>
            <small className=''> { t('conferencias.expositor') }: {item.user.name} </small>
            <small className=''> { t('conferencias.date') }: { format(new Date(item.fecha), 'yyyy-MM-dd,  HH:mm') } </small>
          </Card.Text>
          <div className='d-flex justify-content-between'>
            
            <small
              className={`${ uid === item.user.id ? 'w-100' : '' } `}
            >
              <FontAwesomeIcon icon={faShare} className='me-2' />
              { t('share') }
            </small>

            <Link to={'/abogados/conferencias/' + item.id} className={ uid == item.user.id && 'me-4' }>
              <FontAwesomeIcon
                  icon={faSearch}
                  className='cursor-pointer text-danger'
                  title={ t('see') }
              />
            </Link>
            
            {
                uid === item.user.id ? 
                <>
                    <FontAwesomeIcon
                        icon={faEdit}
                        className='me-4 cursor-pointer text-danger'
                        onClick={() => onEdit( item ) }
                        title={ t('edit') }
                    />
                    
                    <FontAwesomeIcon
                        icon={faTrashCan}
                        className='cursor-pointer text-danger'
                        onClick={() => onRemove( item.id ) }
                        title={ t('remove') }
                    />
                </>
                : null
            }

          </div>
        </Card.Body>

    </Card>
  )
}
