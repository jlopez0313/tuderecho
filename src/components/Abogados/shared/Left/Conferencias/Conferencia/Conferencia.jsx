import React from 'react'
import Card from 'react-bootstrap/Card';
import shared from '@/assets/styles/shared.module.scss';
import styles from './Conferencia.module.scss';
import { format } from 'date-fns'
import { decodeToken } from 'react-jwt';
import { Link } from 'react-router-dom';
import noImage from '@/assets/images/no-image.png';

import { useTranslation } from 'react-i18next';
import { getTenant } from '@/helpers/helpers';

export const Conferencia = ({item, onRemove, onEdit}) => {

  const { t } = useTranslation();
  
  const token = localStorage.getItem('token') || '';
  const { uid } = decodeToken(token);

  return (
    <Link to={'/conferencias/' + item.id}>

      <Card className={`d-flex flex-column border rounded shadow-sm bg-light mb-3 ${shared.listItem} text-dark`}>
        <div className="row g-0 p-1">
          <div className="col-md-4 ps-2 pt-3">
            <Card.Img variant="top" className=' rounded' src={item.archivo || noImage} alt='' />
          </div>
          <div className="col-md-8">
              <div className='d-flex flex-column px-2 pt-1'>
                <small className='text-uppercase d-flex'> 
                  <strong className='flex-grow-1'> {item.titulo} </strong>
                </small>
                <small className=''> { t('conferencias.expositor') }: {item.conferencista} </small>
                <small className=''> { t('conferencias.date') }: { format(new Date(item.fecha), 'yyyy-MM-dd,  HH:mm') } </small>
                <small className="w-100"> { t('conferencias.form.target') }: {item.objetivo} </small>
              </div>
          </div>
        </div>
      </Card>

    </Link>
  )
}
