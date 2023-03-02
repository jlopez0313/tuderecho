import React from 'react'
import { Contacto } from './Contacto/Contacto'
import styles from '@/assets/styles/shared.module.scss';

export const Contactos = () => {
  return (
    <>    
      <h5 className='text-danger w-100 fw-bold'> Contactos </h5>

      <div className='border shadow-sm bg-white overflow-hidden h-100'>

        <div className={`overflow-auto h-95 pe-2 ps-3 mt-2 ${styles.list}`}>
          {
            [1,1,1,1,1,1].map( (item, key)=> {

                return <Contacto key={key} item={item} />
            })
          }
        </div>

      </div>
    </>
  )
}
