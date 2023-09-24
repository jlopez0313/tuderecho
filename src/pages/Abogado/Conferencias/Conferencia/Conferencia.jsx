import { Header } from "@/components/shared/Header/Header"
import styles from './Conferencia.module.scss'
import { Left } from "@/components/Abogados/shared/Left/Left";
import { Right } from "@/components/Abogados/shared/Right/Right";
import { ConferenciaComponent } from "@/components/Abogados/Index/Conferencias/Conferencia/Conferencia"
import { Conferencias } from "@/components/Abogados/shared/Left/Conferencias/Conferencias";

export const Conferencia = () => {

    return (
        <>
            <Header />
            <div className={`${styles.abogado}`}>
            <div id="scrollableDiv" className={`bg-light d-flex overflow-auto pt-2 ${styles.container}`}>
                <div className={`left position-sticky p-2 ${styles.left}`}>
                    <div className='h-100'>
                        <Conferencias />
                    </div>
                </div>
            
                <div className={`d-flex justify-content-center flex-grow-1 p-2`}>
                    <ConferenciaComponent />
                </div>      
            </div>
            </div>
        </>
    )
}
