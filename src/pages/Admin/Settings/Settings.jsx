import { SettingsComponent } from '@/components/Admin/Settings/SettingsComponent'
import { SideMenu } from '@/components/Admin/SideMenu/SideMenu'
import '../admin.scss'

export const Settings = () => {
  return (
    <div className='d-flex h-100'>
        <SideMenu />
        <SettingsComponent />
    </div>
  )
}
