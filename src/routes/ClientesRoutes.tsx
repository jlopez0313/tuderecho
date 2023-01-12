import { Index } from '@/pages/Abogado/Index/Index';
import { NotFoundPage } from '@/pages/shared/NotFoundPage';
import { Routes, Route } from 'react-router-dom';
import { Perfil } from '@/pages/Abogado/Perfil/Perfil';

export const ClientesRoutes = () => {
  return (
    <Routes>
        <Route path='' element={ <Index /> } />
        <Route path='perfil' element={ <Perfil /> } />
        <Route path="*" element={ <NotFoundPage />} />
    </Routes>
  )
}
