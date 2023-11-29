import React from 'react'
import { PasswordsComponent } from '@/components/shared/Passwords/PasswordsComponent'
import { Header } from "@/components/shared/Header/Header"
import Breadcrumb from '@/components/shared/Breadcrumb';

const breadcrumb = [
    {
        name: 'Home',
        href: '/abogados',
        active: false
    },{
        name: 'Passwords',
        active: true
    }
]
export const Passwords = () => {
  return (
    <>
      <Header />
      <div className='d-flex h-100'>
        <div className="w-100 p-4 overflow-auto">
          <h1 className="mb-4"> Passwords </h1>

          <Breadcrumb items={breadcrumb} />
          <PasswordsComponent />
        </div>
      </div>
    </>
  )
}
