import { EspecialidadesComponent } from "@/components/Admin/Especialidades/EspecialidadesComponent"
import { SideMenu } from "@/components/Admin/shared/SideMenu"
import '../admin.scss'

export const Especialidades = () => {
  return (
    <div className='d-flex h-100'>
        <SideMenu />
        <EspecialidadesComponent />
    </div>
  )
}
