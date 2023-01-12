import { TagsComponent } from '@/components/Admin/Tags/TagsComponent'
import { SideMenu } from '@/components/Admin/shared/SideMenu'
import '../admin.scss'

export const Tags = () => {
  return (
    <div className='d-flex h-100'>
        <SideMenu />
        <TagsComponent />
    </div>
  )
}
