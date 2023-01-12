
import { Home } from '@/pages/Clliente/Home/Home';
import { Login } from '@/pages/shared/Login';
import { NotFoundPage } from '@/pages/shared/NotFoundPage';
import { Registro } from '@/pages/shared/Registro';
import { Routes, Route } from 'react-router-dom';
import { AbogadosRoutes } from './AbogadosRoutes';
import { AdminRoutes } from './AdminRoutes';
import { ClientesRoutes } from './ClientesRoutes';

export const Routing = () => {
  return (
    <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/registro' element={ <Registro /> } />
        <Route path='/admin/*' element={ <AdminRoutes /> } />
        <Route path='/abogados/*' element={ <AbogadosRoutes /> } />
        <Route path='/clientes/*' element={ <ClientesRoutes /> } />
        <Route path="*" element={ <NotFoundPage />} />

    </Routes>
  )
}
