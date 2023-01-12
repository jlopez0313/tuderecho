
import { Home } from '@/pages/Clliente/Home/Home';
import { Login } from '@/pages/Login/Login';
import { NotFoundPage } from '@/pages/shared/NotFoundPage';
import { Registro } from '@/pages/Registro/Registro';
import { PreRegistro } from '@/pages/PreRegistro/PreRegistro';
import { Routes, Route } from 'react-router-dom';
import { AbogadosRoutes } from './AbogadosRoutes';
import { AdminRoutes } from './AdminRoutes';
import { ClientesRoutes } from './ClientesRoutes';

export const Routing = () => {
  return (
    <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/pre-registro' element={ <PreRegistro /> } />
        <Route path='/registro/:type' element={ <Registro /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/admin/*' element={ <AdminRoutes /> } />
        <Route path='/abogados/*' element={ <AbogadosRoutes /> } />
        <Route path='/clientes/*' element={ <ClientesRoutes /> } />
        <Route path="*" element={ <NotFoundPage />} />

    </Routes>
  )
}
