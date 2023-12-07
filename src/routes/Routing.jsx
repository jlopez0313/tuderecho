
import { Routes, Route } from 'react-router-dom';
import { NotFound } from '@/pages/Errors/NotFound';
import { TenantRoutes } from './tenant/routes';

export const Routing = () => {
  return (
    <Routes>        
        <Route path="/" element={ <> Hello !! </>} />
        <Route path="/superadmin" element={ <SuperadminRoutes /> } />
        <Route path='/:tenant/*' element={ <TenantRoutes /> } />        
        <Route path="*" element={ <NotFound />} />
    </Routes>
  )
}
