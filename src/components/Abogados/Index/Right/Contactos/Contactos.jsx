import React from 'react'
import { Contacto } from './Contacto/Contacto'
import styles from '../../Index.module.scss';

export const Contactos = () => {
  return (
    <>    
      <div className='border shadow-sm bg-white py-2 overflow-hidden h-100'>
      
        <div className="px-3">
          <h5 className='text-danger w-100 fw-bold'> Contactos </h5>
        </div>

        <div className={`overflow-auto h-90 ps-3 pe-2 mt-2 ${styles.list}`}>
          {
            [1,1,1,1,1].map( (item, key)=> {

                return <Contacto key={key} item={item} />
            })
          }
        </div>

      </div>
    </>
  )
}
