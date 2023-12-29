import React, { useEffect, useState } from 'react'
import { PasswordsComponent } from '@/components/shared/Passwords/PasswordsComponent'
import { Header } from "@/components/shared/Header/Header"
import Breadcrumb from '@/components/shared/Breadcrumb';
import { getTenant } from '@/helpers/helpers';
import { decodeToken } from 'react-jwt';

export const Passwords = () => {
  
  const token = localStorage.getItem('token') || '';
  const { rol } = decodeToken(token);

  const [breadcrumb, setBreadcrumb] = useState([
      {
          name: 'Home',
          href: '/profesionales',
          active: false
      },{
          name: 'Passwords',
          active: true
      }
  ])

  const [link, setLink] = useState('');

  const onSetLink = () => {
    if ( rol.toLowerCase() == 'profesional' ) {
      setLink( '/' )
    } else {
      setLink( '/clientes' )

      setBreadcrumb([
        {
            name: 'Home',
            href: '/clientes',
            active: false
        },{
            name: 'Passwords',
            active: true
        }
      ])
    
    }

  }

  useEffect( () => {
    onSetLink();
  }, [])

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
