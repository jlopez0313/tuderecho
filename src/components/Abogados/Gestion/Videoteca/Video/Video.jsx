import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import styles from '@/assets/styles/shared.module.scss';
import { decodeToken } from 'react-jwt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping, faShare } from '@fortawesome/free-solid-svg-icons';
import { getYoutubeId } from '@/helpers/helpers'

import { useTranslation } from 'react-i18next';

export const Video = ({item, onRemove, onEdit}) => {

  const { t } = useTranslation();

  const token = localStorage.getItem('token') || '';
  const { uid } = decodeToken(token);

  const [videoId, setVideoId] = useState('')

  const onSetVideoId = () => {
    const id = getYoutubeId( item.video )
    setVideoId( id );
  }

  useEffect(()=> {
    onSetVideoId();
  }, [item])

  return (
    <Card className={`d-flex flex-column border rounded shadow-sm bg-light mb-3 ${styles.listItem}`}>
        
        <Card.Img variant="top" className='rounded' src={`http://img.youtube.com/vi/${videoId}/0.jpg`} alt='' />

        <Card.Body>
          <Card.Text className='d-flex flex-column mb-2'>
            <small className='text-uppercase'> 
              <strong> { t('videoteca.conference') } {item.titulo} </strong>
            </small>
            <small className=''> { t('videoteca.expositor') }: {item.user.name} </small>
          </Card.Text>
          <div className='d-flex justify-content-between'>
            <small
              className={`${ uid === item.user.id ? 'w-100' : '' } `}
            >
              <FontAwesomeIcon icon={faShare} className='me-2' />
              { t('share') }
            </small>
            
            {
                uid === item.user.id ? 
                  <>
                    <FontAwesomeIcon
                        icon={faEdit}
                        className='me-4'
                        // onClick={() => onEdit( item ) }
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
