import { SideMenu } from '@/components/Admin/shared/SideMenu'
import '../admin.scss'
import { FormTagsComponent } from '@/components/Admin/Tags/FormTagsComponent'

export const FormTags = () => {
  return (
    <div className='d-flex h-100'>
        <SideMenu />
        <FormTagsComponent />
    </div>
  )
}
