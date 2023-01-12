import { IndexComponent } from '@/components/Admin/Index/IndexComponent'
import { SideMenu } from '@/components/Admin/shared/SideMenu'
import '../admin.scss'

export const Index = () => {
  return (
    <div className='d-flex h-100'>
        <SideMenu />
        <IndexComponent />
    </div>
  )
}
