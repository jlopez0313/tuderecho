import { Header } from "@/components/shared/Header/Header"
import styles from './Comunidades.module.scss'
import { Main } from "@/components/Abogados/Index/Comunidades/Main"
import { Comunidades as ComunidadesComponent } from "@/components/Abogados/shared/Right/Comunidades/Comunidades";
import { PublicacionProvider } from '@/context/publicacion/PublicacionProvider';

export const Comunidades = () => {
  return (
    <>
        <Header />
        <div className={`${styles.abogado}`}>
          <div id="scrollableDiv" className={`bg-light d-flex overflow-auto pt-2 ${styles.container}`}>
            
            <div className={`left position-sticky p-2 ${styles.left}`}>
              <div className='h-100'>
                <ComunidadesComponent />
              </div>
            </div>      

            <div className={`d-flex justify-content-center flex-grow-1 p-2`}>
              <PublicacionProvider>
                <Main />
              </PublicacionProvider>
            </div>    

          </div>
        </div>
    </>
  )
}
