import { Header } from "@/components/shared/Header/Header"
import styles from './Videoteca.module.scss'
import { Main } from "@/components/Abogados/Index/Videoteca/Main"
import { Videoteca as VideotecaComponent } from "@/components/Abogados/shared/Left/Videoteca/Videoteca";

export const Videoteca = () => {
  return (
    <>
        <Header />
        <div className={`${styles.abogado}`}>
          <div id="scrollableDiv" className={`bg-light d-flex overflow-auto pt-2 ${styles.container}`}>
            <div className={`left position-sticky p-2 ${styles.left}`}>
              <div className='h-100'>
                  <VideotecaComponent />
              </div>
            </div>
        
            <div className={`d-flex justify-content-center flex-grow-1 p-2`}>
              <Main />
            </div>

          </div>
        </div>
    </>
  )
}
