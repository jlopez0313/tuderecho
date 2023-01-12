import { UsuariosComponent } from '@/components/Admin/Usuarios/UsuariosComponent'
import { SideMenu } from '@/components/Admin/shared/SideMenu'
import '../admin.scss'

export const Usuarios = () => {
  return (
    <div className='d-flex h-100'>
        <SideMenu />
        <UsuariosComponent />
    </div>
  )
}
