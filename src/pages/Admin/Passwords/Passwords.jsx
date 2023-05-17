import React from 'react'
import { PasswordsComponent } from '@/components/shared/Passwords/PasswordsComponent'
import { SideMenu } from '@/components/Admin/SideMenu/SideMenu'
import Breadcrumb from '@/components/shared/Breadcrumb';

const breadcrumb = [
    {
        name: 'Home',
        href: '/admin',
        active: false
    },{
        name: 'Contraseñas',
        active: true
    }
]
export const Passwords = () => {
  return (
    <div className='d-flex h-100'>
      <SideMenu />
      <div className="w-100 p-4 overflow-auto">
        <h1 className="mb-4"> Passwords </h1>

        <Breadcrumb items={breadcrumb} />
        <PasswordsComponent />
      </div>
    </div>
  )
}
