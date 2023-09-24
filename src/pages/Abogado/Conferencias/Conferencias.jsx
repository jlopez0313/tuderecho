import { Header } from "@/components/shared/Header/Header"
import styles from './Conferencias.module.scss'
import { Main } from "@/components/Abogados/Index/Conferencias/Main"
import { Conferencias as ConferenciasComponent } from "@/components/Abogados/shared/Left/Conferencias/Conferencias";

export const Conferencias = () => {
  return (
    <>
        <Header />
        <div className={`${styles.abogado}`}>
          <div id="scrollableDiv" className={`bg-light d-flex overflow-auto pt-2 ${styles.container}`}>
            <div className={`left position-sticky p-2 ${styles.left}`}>
              <div className='h-100'>
                  <ConferenciasComponent />
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
