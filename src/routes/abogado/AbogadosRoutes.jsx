import { Routes, Route } from 'react-router-dom';
import { Index } from '@/pages/Abogado/Index/Index';
import { Perfil } from '@/pages/Abogado/Perfil/Perfil';
import { Payment } from '@/pages/Abogado/Confirmation/Payment';
import { NotFound } from '@/pages/Errors/NotFound';
import { Passwords } from '@/pages/Abogado/Passwords/Passwords';
import { GestionRoutes } from './GestionRoutes';
import { ComunidadesRoutes } from './ComunidadesRoutes';
import { ConferenciasRoutes } from './ConferenciasRoutes';
import { VideotecaRoutes } from './VideotecaRoutes';
import { Posts } from '@/pages/Posts/Posts';

export const AbogadosRoutes = () => {
  return (
    <Routes>
      <Route path='profesionales/' element={ <Index /> } />
      <Route path='confirmation/' element={ < Payment /> } />
      <Route path='comunidades/*' element={ < ComunidadesRoutes /> } />
      <Route path='conferencias/*' element={ < ConferenciasRoutes /> } />
      <Route path='videoteca/*' element={ < VideotecaRoutes /> } />
      <Route path='gestion/*' element={ <GestionRoutes />} />

      <Route path='perfil' element={ <Perfil /> } />
      <Route path='passwords' element={ <Passwords /> } />
      
      <Route path='posts/:id' element={ <Posts /> } />
      <Route path="*" element={ <NotFound />} />
    </Routes>
  )
}
