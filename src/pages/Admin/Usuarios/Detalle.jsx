import { SideMenu } from '@/components/Admin/SideMenu/SideMenu'
import '../admin.scss'
import { DetalleComponent } from '@/components/Admin/Usuarios/DetalleComponent'

export const Detalle = () => {
  return (
    <div className='d-flex h-100'>
        <SideMenu />
        <DetalleComponent />
    </div>
  )
}
