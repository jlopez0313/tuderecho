import React from 'react'
import Card from 'react-bootstrap/Card';
import styles from '../../../Index.module.scss';

export const Video = ({item}) => {
  return (
    <Card className={`d-flex flex-column border rounded-0 shadow-sm bg-light mb-3 ${styles.listItem}`}>
        <Card.Img variant="top" className='rounded-0' src="http://img.youtube.com/vi/UyI4v5sxT54/0.jpg"/>

        <Card.Body>
          <Card.Text className='d-flex flex-column'>
            <small className='text-uppercase'> 
              <strong> Conferencia El Abogado como mediador de conflictos </strong>
            </small>
            <div className='d-flex justify-content-between mt-1'>
              <small className='text-danger'> Suscribirse </small>
              <small className='text-danger'> Compartir </small>
            </div>
          </Card.Text>
        </Card.Body>
    </Card>
  )
}
