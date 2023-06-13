import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Conferencias } from '@/pages/Abogado/Conferencias/Conferencias';
import { Conferencia } from '@/pages/Abogado/Conferencias/Conferencia/Conferencia';

export const ConferenciasRoutes = () => {

  return (
    <Routes>
      <Route path='/' element={ <Conferencias /> } />
      <Route path='/:id' element={ <Conferencia /> } />
    </Routes>
  )
}
