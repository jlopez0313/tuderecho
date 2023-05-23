import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import styles from '@/assets/styles/shared.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping, faShare } from '@fortawesome/free-solid-svg-icons';
import style from './Item.module.scss';
import { Link } from 'react-router-dom';
import { ComunidadesModal } from '@/components/Modals/Payment/Comunidades/Comunidades';


export const Item = ({ item, uid, onRefresh, onRemove }) => {

    const [paymentModal, setPaymentModal] = useState(false);

    const onDoRefresh = ( refresh ) => {
        setPaymentModal(false)
        onRefresh( refresh )
    }
    
    return (
        <div>
            <Card className={`d-flex flex-column border rounded-0 shadow-sm bg-light mb-3 ${styles.listItem}`}>
                <Card.Body>
                    <div className="d-flex border rounded mb-3 p-3 shadow-sm bg-light">
                        <div>
                            <img src={item.archivo} className={`me-3 ${style.avatar}`} />
                        </div>
                        <div className="d-flex flex-column w-100">
                            <strong> {item.titulo} </strong>
                            <div className="d-flex justify-content-between">
                                <small className="w-100">Personas: 25</small>
                            </div>
                        </div>
                    </div>
                
                <div className='d-flex justify-content-between align-items-center'>
                    {
                        uid ?
                            <Link className='w-100' to={`${item.id}`}>
                                <button type='button' className="btn btn-primary w-100" > Ver </button>
                            </Link>
                        : 
                            <button type='button' className="btn btn-primary w-100" onClick={() => setPaymentModal(true)}>
                                <FontAwesomeIcon icon={faCartShopping} className='me-2' />
                                { item.gratis === 'S' ? 'Gratis' : `$${item.precio}`}
                             </button>
                    }
                        
                    {
                        /*
                        uid === item.user.id ? 
                            <>
                                <FontAwesomeIcon 
                                    icon={faShare} 
                                    className='me-3'
                                    title='Compartir'
                                />
                                <FontAwesomeIcon
                                    icon={faEdit}
                                    className='me-3'
                                    // onClick={() => onEdit( item ) }
                                    title="Editar"
                                />
                                
                                <FontAwesomeIcon
                                    icon={faTrashCan}
                                    className='cursor-pointer text-danger'
                                    onClick={() => onRemove( item.id ) }
                                    title="Eliminar"
                                />
                            </>
                        : null
                        */
                    }

                </div>
                </Card.Body>

            </Card>

            <ComunidadesModal
                title='Suscripción'
                item={ item }
                modalShow={paymentModal}
                onHide={(refresh = false) => onDoRefresh( refresh )}
            />
        </div>
    )
}
