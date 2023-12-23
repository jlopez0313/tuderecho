
import { Routes, Route } from 'react-router-dom';
import { NotFound } from '@/pages/Errors/NotFound';
import { TenantRoutes } from './tenant/routes';
import { SuperadminRoutes } from './superadmin/SuperadminRoutes';

export const Routing = () => {
  return (
    <Routes>        
        <Route path="/superadmin/*" element={ <SuperadminRoutes /> } />
        <Route path="/*" element={ <TenantRoutes />} />
        <Route path='/:tenant/*' element={ <TenantRoutes /> } />        
        <Route path="/notFound" element={ <NotFound />} />
        <Route path="*" element={ <NotFound />} />
    </Routes>
  )
}
