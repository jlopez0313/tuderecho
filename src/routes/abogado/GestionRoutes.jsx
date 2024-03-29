import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Videoteca } from '@/pages/Abogado/Gestion/Videoteca';
import { Conferencias } from '@/pages/Abogado/Gestion/Conferencias';
import { Comunidades } from '@/pages/Abogado/Gestion/Comunidades';
import { Bolsa } from '@/pages/Abogado/Gestion/Bolsa';

export const GestionRoutes = () => {
  return (
    <Routes>
      <Route path='bolsa' element={ <Bolsa /> } />
      <Route path='conferencias' element={ <Conferencias /> } />
      <Route path='comunidades' element={ <Comunidades /> } />
      <Route path='videoteca' element={ <Videoteca /> } />
    </Routes>
  )
}
