import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Comunidades } from '@/pages/Abogado/Comunidades/Comunidades';
import { Comunidad } from '@/pages/Abogado/Comunidades/Comunidad/Comunidad';

export const ComunidadesRoutes = () => {

  return (
    <Routes>
      <Route path='/' element={ <Comunidades /> } />
      <Route path='/:id' element={ <Comunidad /> } />
    </Routes>
  )
}
