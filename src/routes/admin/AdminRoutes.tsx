import { FormEspecialidades } from '@/pages/Admin/Especialidades/FormEspecialidades';
import { Especialidades } from '@/pages/Admin/Especialidades/Especialidades';
import { Index } from '@/pages/Admin/Index/Index';
import { FormTags } from '@/pages/Admin/Tags/FormTags';
import { Tags } from '@/pages/Admin/Tags/Tags';
import { FormUsuarios } from '@/pages/Admin/Usuarios/FormUsuarios';
import { Usuarios } from '@/pages/Admin/Usuarios/Usuarios';
import { Routes, Route } from 'react-router-dom';
import { NotFound } from '@/pages/Errors/NotFound';

export const AdminRoutes = () => {
  return (
    <Routes>
        <Route path='' element={ <Index /> } />
        <Route path='usuarios'>
          <Route path='' element={ <Usuarios /> } />
          <Route path='crear' element={ <FormUsuarios /> } />
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
        <Route path="*" element={ <NotFound />} />
    </Routes>
  )
}
