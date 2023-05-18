import { Header } from "@/components/shared/Header/Header"
import styles from './Comunidades.module.scss'
import { Left } from "@/components/Abogados/shared/Left/Left";
import { Right } from "@/components/Abogados/shared/Right/Right";
import { Main } from "@/components/Abogados/Index/Comunidades/Main"

export const Comunidades = () => {
  return (
    <>
        <Header />
        <div className={`${styles.abogado}`}>
          <div className={`bg-light d-flex overflow-auto pt-2 ${styles.container}`}>
            <div className={`position-sticky p-2 ${styles.left}`}>
              <Left />
            </div>
        
            <div className={`d-flex justify-content-center flex-grow-1 p-2`}>
              <Main />
            </div>

            <div className={`position-sticky p-2 ${styles.right}`}>
              <Right />
            </div>          
          </div>
        </div>
    </>
  )
}
