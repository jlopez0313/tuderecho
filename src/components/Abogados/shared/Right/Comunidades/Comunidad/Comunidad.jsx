import React from 'react'
import styles from './Comunidad.module.scss';
import Avatar from '@/assets/images/abogado/perfil/avatar.png';
import { decodeToken } from 'react-jwt';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { getTenant } from '@/helpers/helpers';

export const Comunidad = ({item, onRemove}) => {

  const { t } = useTranslation();
  
  const token = localStorage.getItem('token') || '';
  const { uid } = decodeToken(token);

  return (
    <Link to={'/comunidades/' + item.id}>
      <div className='d-flex border rounded mb-3 p-2 shadow-sm bg-light'>
          <div>
              <img src={item.archivo || Avatar} className={`me-3 ${styles.avatar}`} alt=''/>
          </div>
          <div className="d-flex flex-column w-100">
              <strong className='text-dark'> {item.titulo} </strong>
              <small className="text-dark"> {item.objetivo} </small>
              <div className="d-flex justify-content-between">
                  <small className='text-dark'> { t('people') }: { item.usuarios?.length || 0} </small>
              </div>
          </div>
      </div>
    </Link>
  )
}
