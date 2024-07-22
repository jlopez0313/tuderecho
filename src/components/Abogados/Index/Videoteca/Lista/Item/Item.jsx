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

export const Item = memo( ({ item, uid, tab, onRefresh, onEdit, onShare, onRemove }) => {
    
    const { t } = useTranslation();

    const [paymentModal, setPaymentModal] = useState(false);
    const [videoId, setVideoId] = useState('')
    const [videoClass, setVideoClass] = useState('')

    const onDoRefresh = ( refresh ) => {
        setPaymentModal(false)
        onRefresh( refresh )
    }

    const onSetVideoId = () => {
        const id = getYoutubeId( item.video )
        setVideoId( id );
    }

    const asd = (evt) => {
        console.log( evt );
    }

    const onGetMetadata = ( evt ) => {
        if( evt.target.videoHeight > evt.target.videoWidth ) {
            setVideoClass( 'h-100' )
        } else {
            setVideoClass( 'w-100' )
        }
    }
    
    useEffect(()=> {
        onSetVideoId();

        const handleContextmenu = e => {
            e.preventDefault()
        }
        document.addEventListener('contextmenu', handleContextmenu)
        return function cleanup() {
            document.removeEventListener('contextmenu', handleContextmenu)
        }

    }, [item])
    
    return (
        <>
            <Card className={`d-flex h-95 flex-column border rounded shadow-sm bg-light mb-3 ${style.listItem}`}>
                
                <div className={`rounded d-flex align-items-center justify-content-center ${style.imgContent}`} 
                        onClick={asd}>
                    <video
                        className={ videoClass }
                        responsive='true'
                        controls={ tab === 'profile' }
                        src={item.video}
                        onLoadedMetadata={ onGetMetadata }
                    />
                </div>

                <Card.Body>
                    <Card.Text className='d-flex flex-column'>
                        <small className='text-uppercase d-flex'> 
                            <strong className='flex-grow-1'> {item.titulo} </strong>
                        </small>
                        <small className=''> {t('videoteca.expositor')}: {item.conferencista} </small>
                    </Card.Text>
                
                    <div className='d-flex justify-content-between align-items-center'>
                        {
                            uid ?
                                null
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
