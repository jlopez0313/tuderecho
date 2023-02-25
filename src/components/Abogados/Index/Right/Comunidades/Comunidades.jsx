import React from 'react'
import { Comunidad } from './Comunidad/Comunidad'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '../../Index.module.scss';

export const Comunidades = () => {
  return (
    <>
      <div className="w-100 text-center border p-2 bg-danger text-white cursor-pointer"> 
        <FontAwesomeIcon icon={faPencil} />
        <span className='ms-3'>Crea tu Comunidad</span>
      </div>

      <div className='border shadow-sm bg-white py-2 overflow-hidden h-95'>
      
        <div className="px-3">
          <h5 className='text-danger w-100 fw-bold'> Comunidades </h5>
          <input className="m-auto form-control explorar" type="text" placeholder="Buscar..."/>
        </div>

        <div className={`overflow-auto h-75 ps-3 pe-2 mt-2 ${styles.list}`}>
          {
            [1,1,1,1,1,1,1,1,1].map( (item, key)=> {

                return <Comunidad key={key} item={item} />
            })
          }
        </div>

      </div>
    </>
  )
}
