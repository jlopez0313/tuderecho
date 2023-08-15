import React, { memo, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '@/components/Modals/MyModal.scss'
import { useDispatch } from 'react-redux';
import { notify } from '@/helpers/helpers'
import { useForm } from '@/hooks/useForm';
import "react-datepicker/dist/react-datepicker.css";
import { setRefresh } from '@/store/videoteca/VideotecaSlice';
import { useTranslation } from 'react-i18next';

import { useEpayco } from '@/hooks/useEpayco';
import { useVideoteca } from '@/hooks/useVideoteca';
import Vimeo from '@u-wave/react-vimeo';

export const VideotecaModal = memo( ( {modalShow, item = {}, ...props} ) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const { doEpayco } = useEpayco();
    const { doSubscribe } = useVideoteca();

    const initFormData = {
        gratis: 'S',
        precio: '',
    }

    const { onInputChange, onRadioChange, onSetFormState, formState } = useForm(initFormData)

    const [show, setShow] = useState( true );

    const doHide = ( hide = false ) => {
        setShow( false )
        
        const timer1 = setTimeout( () => {
            props.onHide( hide );
        }, 100)

        const timer2 = setTimeout( () => {
            setShow( true )
        }, 200)

        // clearTimeout(timer1)
        // clearTimeout(timer2)

    }

    const onDoSubmit = (evt) => {
        evt.preventDefault();

        if( item.gratis === 'N' ) {
            doEpayco( item, '/abogados/videoteca', 'VIDEO' )
        } else {
            try {
                doSubscribe( item?.id )
                .then( () => {
                    notify( t('videoteca.alerts.paid'), 'success')
                    dispatch( setRefresh( true ) )
                    doHide( true );
                })
            } catch(error) {
                console.log( error );
                notify( t('videoteca.alerts.error'), 'error')
            }
        }

/*        
        const token = localStorage.getItem('token') || '';
        const { uid } = decodeToken(token);

        const obj = {
            ...formState,
            archivo: file,
            user: uid,
        }

        create( obj )
        .then( () => {
            notify('Comunidad registrada!', 'success');
            onSetFormState(initFormData)
        })
        .catch( error => {
            notify('onDoSubmit Comunidad: Internal Error', 'error')
        })
*/
    }

    if (modalShow) {
        return (
            <Modal
                show={ show }
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <form onSubmit={onDoSubmit}>
                    <Modal.Header closeButton className='text-center' onHide={doHide}>
                        <Modal.Title className='m-auto' id="contained-modal-title-vcenter">
                            {props.title}
                        </Modal.Title>
                    </Modal.Header>
                
                    <Modal.Body className='py-0'>
                        
                            <div className="form-floating mb-3">
                                <span className='form-control'> { item?.titulo } </span>
                                <label htmlFor="especialidad"> { t('videoteca.form.title') } </label>
                            </div>

                            <div className="form-floating mb-3">
                                <span className='form-control'> { item?.user.name } </span>
                                <label htmlFor="especialidad"> { t('videoteca.form.expositor') } </label>
                            </div>

                            <div className="form-floating mb-3">
                                <span className='form-control'> { item.gratis === 'S' ? t('videoteca.form.free') : `$${item.precio}`} </span>
                                <label htmlFor="especialidad"> { t('videoteca.form.price') }  </label>
                            </div>

                            <div className="form-floating mb-3">
                                <Vimeo
                                    width='465'
                                    controls={false}
                                    showByline={false}
                                    showTitle={false}
                                    video={item.video}
                                />
                            </div>

                    </Modal.Body>

                    <Modal.Footer className='d-block text-center'>
                        <Button className='w-100 m-0' type='submit'> { 
                            item.gratis === 'S' ? t('videoteca.form.subscribe') : t('videoteca.form.pay')
                        } </Button>
                    </Modal.Footer>
                </form>
            </Modal>        
        )
    }
})
