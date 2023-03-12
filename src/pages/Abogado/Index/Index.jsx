import { IndexComponent } from '@/components/Abogados/Index/IndexComponent'
import { Header } from "@/components/shared/Header/Header"
import styles from './Index.module.scss'

export const Index = () => {
  return (
    <>
        <Header />
        <div className={`${styles.abogado}`}>
          <IndexComponent />
        </div>
    </>
  )
}
