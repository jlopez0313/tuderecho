import React from 'react'
import './Slider.scss';

export const Slider = () => {
  return (
    <div className='slider'>
        <div className="container pt-7">
            <h2 className='w-sm-25 d-block text-white title'>
              Coméntanos tu caso
            </h2>
            <span className='d-block mb-5 subtitle'>
                Queremos que nos comentes tu caso.
            </span>
            <button className='btn btn-primary'> Iniciar Caso </button>
        </div>
    </div>
  )
}
