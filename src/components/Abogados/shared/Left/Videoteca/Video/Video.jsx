import React, { memo, useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import styles from '@/assets/styles/shared.module.scss';
import { decodeToken } from 'react-jwt';
import { getYoutubeId } from '@/helpers/helpers'

import { useTranslation } from 'react-i18next';
import Vimeo from '@u-wave/react-vimeo';

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
    <Card className={`d-flex flex-column border rounded shadow-sm bg-light mb-3 p-1 ${styles.listItem}`}>
        <div className="row g-0 p-1">
          <div className="col-md-4">
            <video
                className='rounded w-100'
                controls={false}
                responsive='true'
                src={item.video}
            />
          </div>
          <div className="col-md-8">
              <div className='d-flex flex-column ps-2 pt-1'>
                <small className='text-uppercase'> 
                  <strong> {item.titulo} </strong>
                </small>
                <small className=''> { t('videoteca.expositor') }: {item.conferencista} </small>
              </div>
          </div>
        </div>
    </Card>
  )
})
