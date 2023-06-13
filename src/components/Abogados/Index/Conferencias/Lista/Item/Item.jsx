import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import styles from '@/assets/styles/shared.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping, faShare } from '@fortawesome/free-solid-svg-icons';
import style from './Item.module.scss';
import { format } from 'date-fns'
import { Link } from 'react-router-dom';
import { ConferenciasModal } from '@/components/Modals/Payment/Conferencias/Conferencias';
import { numberFormat } from '@/helpers/numbers';

import { useTranslation } from 'react-i18next';

export const Item = ({ item, uid, onRefresh, onEdit, onShare, onRemove }) => {

    const { t } = useTranslation();

    const [paymentModal, setPaymentModal] = useState(false);

    const onDoRefresh = ( refresh ) => {
        setPaymentModal(false)
        onRefresh( refresh )
    }
    
    return (
        <div>
            <Card className={`d-flex flex-column border rounded shadow-sm bg-light mb-3 ${style.listItem}`}>
                
                <div className={`rounded ${style.imgContent}`}>
                    <Card.Img variant="top" className={`rounded ${style.picture}`} src={item.archivo} alt='' />
                </div>

                <Card.Body>
                    <Card.Text className='d-flex flex-column'>
                        <small className='text-uppercase d-flex'> 
                            <strong className='flex-grow-1'>  { t('conferencias.conference') } {item.titulo} </strong>
                        </small>
                        <small className=''> { t('conferencias.expositor') }: {item.user.name} </small>
                        <small className=''> { t('conferencias.date') }: { format(new Date(item.fecha), 'yyyy-MM-dd,  HH:mm') } </small>
                    </Card.Text>
                
                    <div className='d-flex justify-content-between align-items-center'>
                        {
                            uid ?
                                <Link className={`${uid === item.user.id ? 'me-2' : ''} w-100`} to={`${item.id}`}>
                                    <button type='button' className="btn btn-primary w-100" > { t('see') } </button>
                                </Link>
                            : 
                                <button type='button' className="btn btn-primary w-100" onClick={() => setPaymentModal(true)}>
                                    <FontAwesomeIcon icon={faCartShopping} className='me-2' />
                                    { item.gratis === 'S' ? t('free') : `$ ${ numberFormat(item.precio) }`}
                                </button>
                        }
                            
                        {
                            
                            uid === item.user.id ? 
                                <>
                                    <FontAwesomeIcon 
                                        icon={faShare} 
                                        className='me-3 cursor-pointer text-danger'
                                        onClick={() => onShare( item ) }
                                        title={ t('share') }
                                    />
                                    <FontAwesomeIcon
                                        icon={faEdit}
                                        className='me-3 cursor-pointer text-danger'
                                        onClick={() => onEdit( item ) }
                                        title={ t('edit') }
                                    />
                                    
                                    <FontAwesomeIcon
                                        icon={faTrashCan}
                                        className='cursor-pointer text-danger'
                                        onClick={() => onRemove( item.id ) }
                                        title={ t('remove') }
                                    />
                                </>
                            : null
                            
                        }

                    </div>
                </Card.Body>

            </Card>

            <ConferenciasModal
                title={ t('conferencias.suscription') }
                item={ item }
                modalShow={paymentModal}
                onHide={(refresh = false) => onDoRefresh( refresh )}
            />
        </div>
    )
}
