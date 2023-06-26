import React from 'react'
import { SideMenu } from "@/components/Admin/SideMenu/SideMenu"
import '../admin.scss'
import { BolsaComponent } from '@/components/Admin/Bolsa/BolsaComponent'

export const Bolsa = () => {
  return (
    <div className='d-flex h-100'>
        <SideMenu />
        <BolsaComponent />
    </div>
  )
}
