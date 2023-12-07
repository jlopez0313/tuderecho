import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from '@/pages/Home/Home';
import { Login } from '@/pages/Login/Login';
import { Registro } from '@/pages/Registro/Registro';
import { PreRegistro } from '@/pages/PreRegistro/PreRegistro';
import { AbogadosRoutes } from '../abogado/AbogadosRoutes';
import { AdminRoutes } from '../admin/AdminRoutes';
import { Recover } from '@/pages/Passwords/Recover';
import { Passwords } from '@/pages/Passwords/Passwords';
import { ClientesRoutes } from '../cliente/ClientesRoutes';
import { PrivateRoutes } from '../PrivateRoutes';
import { Unauthorized } from '@/pages/Errors/Unauthorized';

export const TenantRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/pre-registro' element={ <PreRegistro /> } />
        <Route path='/registro/:type' element={ <Registro /> } />
        <Route path='/recover' element={ <Recover /> } />
        <Route path='/claves' element={ <Passwords /> } />
        <Route path='/login' element={ <Login /> } />
        
        <Route path='/clientes/*'
          element={
            <PrivateRoutes rol={ 'Cliente' }>
              <ClientesRoutes />
            </PrivateRoutes>
          }
        />
        
        <Route path='/admin/*' element={            
            <PrivateRoutes rol={ 'Admin' }>
                <AdminRoutes />
            </PrivateRoutes>
        } />

        <Route path='/*' element={        
            <PrivateRoutes rol={ 'Profesional' } >
                <AbogadosRoutes />
            </PrivateRoutes>
         } />

        <Route path="/unauthorized" element={ <Unauthorized />} />
    </Routes>
  )
}
