import React from 'react'
import styles from './Posts.module.scss'

import { Header } from "@/components/shared/Header/Header"
import { PostComponent } from '@/components/Abogados/shared/Sharing/Post/PostComponent'
import { PublicacionProvider } from '@/context/publicacion/PublicacionProvider';

export const Posts = () => {
  return (
    <>
        <Header />
        <div className={`d-flex justify-content-center mt-3 ${styles.abogado}`}>
            <PublicacionProvider>
                <PostComponent />
            </PublicacionProvider>
        </div>
    </>
  )
}
