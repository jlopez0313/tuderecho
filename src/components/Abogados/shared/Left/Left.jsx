import React from 'react'
import { Conferencias } from './Conferencias/Conferencias'
import { Videoteca } from './Videoteca/Videoteca'

export const Left = () => {
  return (
    <div className='h-100'>
        <div className='h-50'>
          <Conferencias />
        </div>
        <div className='h-50'>
          <Videoteca />
        </div>
    </div>
  )
}
