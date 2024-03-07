import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import styles from '@/assets/styles/shared.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping, faShare } from '@fortawesome/free-solid-svg-icons';
import style from './Item.module.scss';
import { Link } from 'react-router-dom';
import { ComunidadesModal } from '@/components/Modals/Payment/Comunidades/Comunidades';
import { numberFormat } from '@/helpers/numbers';

import { useTranslation } from 'react-i18next';

export const Item = ({ item, uid, onRefresh, onEdit, onRemove }) => {

    const { t } = useTranslation();

    const [paymentModal, setPaymentModal] = useState(false);

    const onDoRefresh = ( refresh ) => {
        setPaymentModal(false)
        onRefresh( refresh )
    }
    
    return (
        <>
            <Card className={`d-flex h-95 flex-column border rounded-0 shadow-sm bg-light mb-3 ${style.listItem}`}>
                
                <div className={`rounded ${style.imgContent}`}
                    style={{ backgroundImage: `url(${item.archivo})`}}
                >
                </div>
                
                <Card.Body>
                    <div className="d-flex flex-column w-100 mb-2">
                        <strong> {item.titulo} </strong>
                        <div className="">
                            <small className="w-100">{item.objetivo}</small>
                        </div>
                        <div className="d-flex justify-content-between">
                            <small className="w-100">{ t('people') }: { item.usuarios?.length || 0} </small>
                        </div>
                    </div>
                
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
                                        className='me-3'
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

            <ComunidadesModal
                title={ t('comunidades.suscription') }
                item={ item }
                modalShow={paymentModal}
                onHide={(refresh = false) => onDoRefresh( refresh )}
            />
        </>
    )
}
