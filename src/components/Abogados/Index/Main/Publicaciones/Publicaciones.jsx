import Card from 'react-bootstrap/Card';
import Avatar from '@/assets/images/abogado/perfil/avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { decodeToken } from "react-jwt";
import styles from './Publicaciones.module.scss';

export const Publicaciones = ({publi, onRemoveComment}) => {

    const token = localStorage.getItem('token') || '';
    const { uid } = decodeToken(token);

    return (
        <Card className='mt-3 p-3 shadow-sm rounded-0'>
            <div className={`d-flex align-items-center ${styles.owner}`}>
                <div>
                    <Card.Img
                        variant="top"
                        className={`${styles.avatar}`}
                        src={ publi.user.perfil?.photo || Avatar}
                        alt=''
                    />
                </div>
                <div className="ms-2 d-flex flex-column w-100">

                    <strong className={styles.user}>  {publi.user.name} </strong>
                    <small className={styles.date}>
                        Creado el {new Date(publi.fecha).toLocaleDateString()}
                    </small>
                </div>
                <div className={`flex-shrink-1 ${styles.icon}`}>
                    {
                        uid === publi.user.id 
                        ?
                            <FontAwesomeIcon
                                icon={faTrashCan}
                                className='cursor-pointer'
                                onClick={() => onRemoveComment( publi.id ) }
                                title="Eliminar"
                            />
                        : null
                    }
                </div>
            </div>
            <Card.Body>
                <Card.Text>
                    {publi.comment}
                </Card.Text>
                <div className={`${publi.medias.length > 1 ? styles.grid : ''}`}>
                    {
                        publi.medias.map( (media, key2) => {
                            return <div key={ key2 } className={`${styles.gridItem}`}>
                                <img className={`${styles.media}`} src={media} />
                            </div>
                        })
                    }
                </div>
                {
                    publi.gif
                    ? 
                        <div className={`${styles.gridItem}`}>
                            <img className={`${styles.media}`} src={publi.gif} />
                        </div>
                    : null
                }
            </Card.Body>
        </Card>
    )
}
