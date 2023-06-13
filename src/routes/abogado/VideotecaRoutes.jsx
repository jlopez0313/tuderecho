import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Videoteca } from '@/pages/Abogado/Videoteca/Videoteca';

export const VideotecaRoutes = () => {

  return (
    <Routes>
      <Route path='/' element={ <Videoteca /> } />
    </Routes>
  )
}
