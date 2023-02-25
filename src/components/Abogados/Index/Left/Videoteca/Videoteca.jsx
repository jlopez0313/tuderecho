import React from 'react'
import { Video } from './Video/Video';
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '../../Index.module.scss';

export const Videoteca = () => {
  return (
    <>
        <div className="w-100 text-center border p-2 bg-danger text-white cursor-pointer"> 
            <FontAwesomeIcon icon={faPencil} />
            <span className='ms-3'>Sube tu Video</span>
        </div>

        <div className='border shadow-sm bg-white py-2 overflow-hidden h-90'>

            <div className="px-3">
                <h5 className='text-danger w-100 fw-bold'> Videoteca </h5>
                <input className="m-auto form-control explorar" type="text" placeholder="Buscar..."/>
            </div>

            <div className={`overflow-auto h-75 pe-2 ps-3 mt-2 ${styles.list}`}>
                {
                    [1,1].map((item, key) => {
                        return <Video item={item} key={key} />
                    })
                }
            </div>

        </div>
    </>
  )
}
