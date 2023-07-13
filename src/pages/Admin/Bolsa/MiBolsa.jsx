import React from 'react'
import { SideMenu } from "@/components/Admin/SideMenu/SideMenu"
import '../admin.scss'
import { BolsaComponent } from '@/components/Admin/MiBolsa/BolsaComponent'

export const MiBolsa = () => {
  return (
    <div className='d-flex h-100'>
        <SideMenu />
        <BolsaComponent />
    </div>
  )
}
