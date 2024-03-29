import { FormEspecialidades } from '@/pages/Admin/Especialidades/FormEspecialidades';
import { Especialidades } from '@/pages/Admin/Especialidades/Especialidades';
import { Index } from '@/pages/Admin/Index/Index';
import { FormTags } from '@/pages/Admin/Tags/FormTags';
import { Tags } from '@/pages/Admin/Tags/Tags';
import { FormUsuarios } from '@/pages/Admin/Usuarios/FormUsuarios';
import { Usuarios } from '@/pages/Admin/Usuarios/Usuarios';
import { Settings } from '@/pages/Admin/Settings/Settings';
import { Routes, Route } from 'react-router-dom';
import { NotFound } from '@/pages/Errors/NotFound';
import { Detalle } from '@/pages/Admin/Usuarios/Detalle';
import { Passwords } from '@/pages/Admin/Passwords/Passwords';
import { Bolsa } from '@/pages/Admin/Bolsa/Bolsa';
import { MiBolsa } from '@/pages/Admin/Bolsa/MiBolsa';

export const AdminRoutes = () => {
  return (
    <Routes>
        <Route path='' element={ <Index /> } />
        <Route path='settings'>
          <Route path='' element={ <Settings /> } />
        </Route>
        <Route path='usuarios'>
          <Route path='' element={ <Usuarios /> } />
          <Route path='crear' element={ <FormUsuarios /> } />
          <Route path='detalle'>
            <Route path=':id' element={ <Detalle /> } />
          </Route>
          <Route path='bolsa'>
            <Route path=':id' element={ <Bolsa /> } />
          </Route>
        </Route>
        <Route path='tags'>
          <Route path='' element={ <Tags /> } />
          <Route path='crear' element={ <FormTags /> } />
          <Route path='editar'>
            <Route path=':id' element={ <FormTags /> } />
          </Route>
        </Route>
        <Route path='especialidades'>
          <Route path='' element={ <Especialidades /> } />
          <Route path='crear' element={ <FormEspecialidades /> } />
          <Route path='editar'>
            <Route path=':id' element={ <FormEspecialidades /> } />
          </Route>
        </Route>
        <Route path='bolsa' element={ <MiBolsa /> } />
        <Route path='passwords' element={ <Passwords /> } />
        <Route path="*" element={ <NotFound />} />
    </Routes>
  )
}
