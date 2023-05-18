import { Index } from '@/pages/Abogado/Index/Index';
import { Routes, Route } from 'react-router-dom';
import { Perfil } from '@/pages/Abogado/Perfil/Perfil';
import { NotFound } from '@/pages/Errors/NotFound';
import { Passwords } from '@/pages/Passwords/Passwords';
import { Videoteca } from '@/pages/Abogado/Gestion/Videoteca';
import { Conferencias } from '@/pages/Abogado/Gestion/Conferencias';
import { Comunidades } from '@/pages/Abogado/Gestion/Comunidades';
import { Comunidades as ComunidadesIndex } from '@/pages/Abogado/Comunidades/Comunidades';

export const AbogadosRoutes = () => {
  return (
    <Routes>
      <Route path='' element={ <Index /> } />
      <Route path='comunidades' element={ <ComunidadesIndex /> } />
      <Route path='perfil' element={ <Perfil /> } />
      <Route path='gestion/*' element={
        <Routes>
          <Route path='conferencias' element={ <Conferencias /> } />
          <Route path='comunidades' element={ <Comunidades /> } />
          <Route path='videoteca' element={ <Videoteca /> } />
        </Routes>
      } />
      <Route path='passwords' element={ <Passwords /> } />
      <Route path="*" element={ <NotFound />} />
    </Routes>
  )
}
