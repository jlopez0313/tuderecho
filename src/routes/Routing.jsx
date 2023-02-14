
import { Home } from '@/pages/Home/Home';
import { Login } from '@/pages/Login/Login';
import { Registro } from '@/pages/Registro/Registro';
import { PreRegistro } from '@/pages/PreRegistro/PreRegistro';
import { Routes, Route } from 'react-router-dom';
import { AbogadosRoutes } from './abogado/AbogadosRoutes';
import { AdminRoutes } from './admin/AdminRoutes';
import { ClientesRoutes } from './cliente/ClientesRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import { Unauthorized } from '@/pages/Errors/Unauthorized';
import { NotFound } from '@/pages/Errors/NotFound';
import { Recover } from '../pages/Passwords/Recover';

export const Routing = () => {
  return (
    <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/pre-registro' element={ <PreRegistro /> } />
        <Route path='/registro/:type' element={ <Registro /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/recover' element={ <Recover /> } />
        <Route path='/admin/*' 
          element={ 
            <PrivateRoutes rol={ 'Admin' }>
              <AdminRoutes />
            </PrivateRoutes> 
          }
        />
        <Route path='/abogados/*'
          element={ 
            <PrivateRoutes rol={ 'Abogado' } >
              <AbogadosRoutes />
            </PrivateRoutes>
          }
        />
        <Route path='/clientes/*'
          element={
            <PrivateRoutes rol={ 'Cliente' }>
              <ClientesRoutes />
            </PrivateRoutes>
          }
        />
        <Route path="*" element={ <NotFound />} />

        <Route path="unauthorized" element={ <Unauthorized />} />

    </Routes>
  )
}
