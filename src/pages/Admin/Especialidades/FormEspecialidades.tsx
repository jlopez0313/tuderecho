import { SideMenu } from '@/components/Admin/shared/SideMenu'
import '../admin.scss'
import { FormEspecialidadesComponent } from '@/components/Admin/Especialidades/FormEspecialidadesComponent'

export const FormEspecialidades = () => {
  return (
    <div className='d-flex h-100'>
        <SideMenu />
        <FormEspecialidadesComponent />
    </div>
  )
}
