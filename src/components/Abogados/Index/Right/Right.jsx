import React from 'react'
import { Contactos } from './Contactos/Contactos'
import { Comunidades } from './Comunidades/Comunidades'

export const Right = () => {
  return (
    <div className='h-90'>
        <div className='h-50'>
          <Comunidades />          
        </div>
        <div className='mt-5 h-50'>
          <Contactos />          
        </div>
    </div>
  )
}
