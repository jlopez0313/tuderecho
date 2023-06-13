import React, { memo, useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { format } from 'date-fns'
import { getYoutubeId } from '@/helpers/helpers'

import { useTranslation } from 'react-i18next';

export const Videoteca = memo( ( {videoteca} ) => {
    
    const { t } = useTranslation();

    const [videoId, setVideoId] = useState('')

    const onSetVideoId = () => {
        const id = getYoutubeId( videoteca.video )
        setVideoId( id );
    }

    useEffect(()=> {
        onSetVideoId();
    }, [videoteca])

    return (
        <Card className={`d-flex flex-column border rounded shadow-sm bg-light mt-3`}>
                
            <div className={`rounded`}>
                
                <Card.Img variant="top" className={`rounded`} src={`http://img.youtube.com/vi/${videoId}/0.jpg`} alt='' />
            </div>

            <Card.Body>
                <Card.Text className='d-flex flex-column'>
                    <small className='text-uppercase d-flex'> 
                        <strong className='flex-grow-1'> { t('videoteca.conference') } {videoteca.titulo} </strong>
                    </small>
                    <small className=''> {t('videoteca.expositor')}: {videoteca.conferencista} </small>
                </Card.Text>                  
            </Card.Body>
        </Card>
    )
})
