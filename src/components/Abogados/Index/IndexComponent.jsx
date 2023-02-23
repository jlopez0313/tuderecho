import { Header } from "@/components/shared/Header/Header"
import { Main } from "./Main/Main"
import styles from './Index.module.scss';

export const IndexComponent = () => {
  return (
    <>
      <Header />
      <div className={`row py-4 overflow-auto ${styles.container}`}>
        <div className="col-sm-4"></div>
        <div className="col-sm-4">
          <Main />
        </div>
        <div className="col-sm-4"></div>
      </div>      
    </>
  )
}
