import { Header } from "@/components/shared/Header/Header"
import styles from './Index.module.scss'
import { Left } from "@/components/Abogados/shared/Left/Left";
import { Right } from "@/components/Abogados/shared/Right/Right";
import { Main } from "@/components/Abogados/Index/Publicaciones/Main"
import { PublicacionProvider } from '@/context/publicacion/PublicacionProvider';

export const Index = () => {
  return (
    <>
        <Header />
        <div className={`${styles.abogado}`}>
          <div id="scrollableDiv" className={`bg-light d-flex overflow-auto pt-2 ${styles.container}`}>
            <div className={`left position-sticky p-2 ${styles.left}`}>
              <Left />
            </div>
            
            <div className={`d-flex justify-content-center flex-grow-1 p-2`}>
              <PublicacionProvider>
                <Main />
              </PublicacionProvider>
            </div>
            
            <div className={`right position-sticky p-2 ${styles.right}`}>
              <Right />
            </div>
          </div>
        </div>
    </>
  )
}
