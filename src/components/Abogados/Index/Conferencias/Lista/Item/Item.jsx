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
        <>
            <Card className={`d-flex h-95 flex-column border rounded shadow-sm bg-light ${style.listItem}`}>
                
                <div className={`rounded ${style.imgContent}`}
                    style={{ backgroundImage: `url(${item.archivo})`}}
                >
                </div>

                <Card.Body>
                    <Card.Text className='d-flex flex-column'>
                        <small className='text-uppercase d-flex'> 
                            <strong className='flex-grow-1'> {item.titulo} </strong>
                        </small>
                        <small className=''> { t('conferencias.expositor') }: {item.conferencista} </small>
                        <small className=''> { t('conferencias.date') }: { format(new Date(item.fecha), 'yyyy-MM-dd,  HH:mm') } </small>
                        <small className="w-100"> { t('conferencias.form.target') }: {item.objetivo} </small>
                        {
                            item?.url && uid && <strong className=''> <a target='_blank' href={item.url}> Click para Acceder </a> </strong>
                        }

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
        </>
    )
}
