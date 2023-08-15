import React, { memo, useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import styles from '@/assets/styles/shared.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping, faShare } from '@fortawesome/free-solid-svg-icons';
import style from './Item.module.scss';
import { format } from 'date-fns'
import { Link } from 'react-router-dom';
import { VideotecaModal } from '@/components/Modals/Payment/Videoteca/Videoteca';
import { getYoutubeId } from '@/helpers/helpers'

import { useTranslation } from 'react-i18next';
import { numberFormat } from '@/helpers/numbers';

import Vimeo from '@u-wave/react-vimeo';

export const Item = memo( ({ item, uid, onRefresh, onEdit, onShare, onRemove }) => {
    
    const { t } = useTranslation();

    const [paymentModal, setPaymentModal] = useState(false);
    const [videoId, setVideoId] = useState('')

    const onDoRefresh = ( refresh ) => {
        setPaymentModal(false)
        onRefresh( refresh )
    }

    const onSetVideoId = () => {
        const id = getYoutubeId( item.video )
        setVideoId( id );
    }
    
    useEffect(()=> {
        onSetVideoId();
    }, [item])
    
    return (
        <>
            <Card className={`d-flex h-95 flex-column border rounded shadow-sm bg-light mb-3 ${style.listItem}`}>
                
                <div className={`rounded ${style.imgContent}`}>
                    <Vimeo
                        width='310'
                        showByline={false}
                        showTitle={false}
                        video={item.video}
                    />
                </div>

                <Card.Body>
                    <Card.Text className='d-flex flex-column'>
                        <small className='text-uppercase d-flex'> 
                            <strong className='flex-grow-1'> {item.titulo} </strong>
                        </small>
                        <small className=''> {t('videoteca.expositor')}: {item.user.name} </small>
                    </Card.Text>
                
                    <div className='d-flex justify-content-between align-items-center'>
                        {
                            uid ?
                                <a className={`${uid === item.user.id ? 'me-2' : ''} w-100`} href={`http://www.youtube.com/watch?v=${item.video}`} target="_blank">
                                    <button type='button' className="btn btn-primary w-100" > {t('see')} </button>
                                </a>
                            : 
                                <button type='button' className="btn btn-primary w-100" onClick={() => setPaymentModal(true)}>
                                    <FontAwesomeIcon icon={faCartShopping} className='me-2' />
                                    { item.gratis === 'S' ? 'Gratis' : `$ ${ numberFormat(item.precio) } `}
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

            <VideotecaModal
                title={ t('videoteca.suscription') }
                item={ item }
                modalShow={paymentModal}
                onHide={(refresh = false) => onDoRefresh( refresh )}
            />
        </>
    )
})
