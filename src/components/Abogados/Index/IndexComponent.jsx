import { Main } from "./Main/Main"
import styles from './Index.module.scss';
import { Left } from "./Left/Left";
import { Right } from "./Right/Right";

export const IndexComponent = () => {
  return (
    <>
      <div className={`bg-light d-flex overflow-auto pt-2 ${styles.container}`}>
        <div className={`position-sticky p-2 ${styles.left}`}>
          <Left />
        </div>
        <div className="d-flex justify-content-center flex-grow-1 p-2">
          <Main />
        </div>
        <div className={`position-sticky p-2 ${styles.right}`}>
          <Right />
        </div>
      </div>      
    </>
  )
}
