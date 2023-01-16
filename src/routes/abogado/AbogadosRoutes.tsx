import { Index } from '@/pages/Abogado/Index/Index';
import { Routes, Route } from 'react-router-dom';
import { Perfil } from '@/pages/Abogado/Perfil/Perfil';
import { NotFound } from '@/pages/Errors/NotFound';

export const AbogadosRoutes = () => {
  return (
    <Routes>
      <Route path='' element={ <Index /> } />
      <Route path='perfil' element={ <Perfil /> } />
      <Route path="*" element={ <NotFound />} />
    </Routes>
  )
}
