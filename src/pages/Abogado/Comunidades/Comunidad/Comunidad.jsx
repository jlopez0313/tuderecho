import { Header } from "@/components/shared/Header/Header"
import styles from './Comunidad.module.scss'
import { Left } from "@/components/Abogados/shared/Left/Left";
import { Right } from "@/components/Abogados/shared/Right/Right";
import { ComunidadComponent } from "@/components/Abogados/Index/Comunidades/Comunidad/Comunidad"
import { Comunidades } from "@/components/Abogados/shared/Right/Comunidades/Comunidades";

export const Comunidad = () => {

    return (
        <>
            <Header />
            <div className={`${styles.abogado}`}>
            <div id="scrollableDiv" className={`bg-light d-flex overflow-auto pt-2 ${styles.container}`}>
                <div className={`left position-sticky p-2 ${styles.left}`}>
                    <div className='h-100'>
                        <Comunidades />
                    </div>
                </div>
            
                <div className={`d-flex justify-content-center flex-grow-1`}>
                    <ComunidadComponent />
                </div>     
            </div>
            </div>
        </>
    )
}
