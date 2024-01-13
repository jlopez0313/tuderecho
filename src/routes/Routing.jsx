
import { Routes, Route } from 'react-router-dom';
import { NotFound } from '@/pages/Errors/NotFound';
import { TenantRoutes } from './tenant/routes';
import { SuperadminRoutes } from './superadmin/SuperadminRoutes';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const Routing = () => {

  const { settings } = useSelector(state => state.settings);
  document.title = settings?.title ? settings?.title + '-Sabiux' : 'Sabiux';

  return (
    <Routes>        
        <Route path="/superadmin/*" element={ <SuperadminRoutes /> } />
        <Route path="/*" element={ <TenantRoutes />} />
        <Route path="/notFound" element={ <NotFound />} />
        <Route path="*" element={ <NotFound />} />
    </Routes>
  )
}
