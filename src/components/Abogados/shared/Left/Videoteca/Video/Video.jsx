import React, { memo, useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import styles from '@/assets/styles/shared.module.scss';
import { decodeToken } from 'react-jwt';
import { getYoutubeId } from '@/helpers/helpers'

import { useTranslation } from 'react-i18next';

export const Video = memo( ({item, onRemove, onEdit}) => {

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
          <Card.Text className='d-flex flex-column'>
            <small className='text-uppercase'> 
              <strong> { t('videoteca.conference') } {item.titulo} </strong>
            </small>
            <small className=''> { t('videoteca.expositor') }: {item.user.name} </small>
          </Card.Text>        
        </Card.Body>
    </Card>
  )
})
