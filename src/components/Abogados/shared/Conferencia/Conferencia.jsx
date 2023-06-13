import React, { memo } from 'react'
import Card from 'react-bootstrap/Card';
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next';

export const Conferencia = memo( ( {conferencia} ) => {
    
    const { t } = useTranslation();

    return (
        <Card className={`d-flex flex-column border rounded shadow-sm bg-light mt-3 w-100`}>
                    
            <div className={`rounded`}>
                <Card.Img variant="top" className={`rounded`} src={conferencia.archivo} alt='' />
            </div>

            <Card.Body>
                <Card.Text className='d-flex flex-column'>
                    <small className='text-uppercase d-flex'> 
                        <strong className='flex-grow-1'>  { t('conferencias.conference') } {conferencia.titulo} </strong>
                    </small>
                    <small className=''> { t('conferencias.expositor') }: {conferencia.conferencista} </small>
                    <small className=''> { t('conferencias.date') }: { format(new Date(conferencia.fecha), 'yyyy-MM-dd,  HH:mm') } </small>
                </Card.Text>                      
            </Card.Body>
        </Card>
    )
})
