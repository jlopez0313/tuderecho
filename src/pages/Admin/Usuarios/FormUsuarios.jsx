import { SideMenu } from '@/components/Admin/SideMenu/SideMenu'
import '../admin.scss'
import { FormUsuariosComponent } from '@/components/Admin/Usuarios/FormUsuariosComponent'

export const FormUsuarios = () => {
  return (
    <div className='d-flex h-100'>
        <SideMenu />
        <FormUsuariosComponent />
    </div>
  )
}
