import Profile from '@/assets/images/abogado/perfil/avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import styles from './Abogados.module.scss'

export const Abogados = ({ item }) => {
  return (
    <div className="card shadow-sm">
        <div className="card-body">
            <h5 className="card-title">Perfil del Profesional</h5>
            <div className="row">
                <div className="col-sm-4">
                    <img className={styles.avatar} src={ item.perfil?.photo || Profile} alt=''/>
                </div>
                <div className="col-sm-8">
                    <div className="d-flex justify-content-between align-items-center">
                        <span> { item.name } </span>
                        <span className="badge m-0 p-1 alert alert-warning">                        
                            <FontAwesomeIcon icon={ faHeart } className={styles.heart } /> { item.pts }
                        </span>
                    </div>
                    <span className="col-12"> { item.perfil?.especialidad?.name }</span>
                </div>
            </div>
        </div>
    </div>
  )
}
