import React, { memo, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '@/components/Modals/MyModal.scss'
import { useForm } from '@/hooks/useForm';
import "react-datepicker/dist/react-datepicker.css";
import { useEpayco } from '@/hooks/useEpayco';
import { useComunidad } from '@/hooks/useComunidad';
import { notify } from '@/helpers/helpers'
import { useDispatch } from 'react-redux';
import { setRefresh } from '@/store/comunidades/ComunidadesSlice';

import { useTranslation } from 'react-i18next';

export const ComunidadesModal = memo( ( {modalShow, item = {}, ...props} ) => {
    const dispatch = useDispatch();
    
    const { t } = useTranslation();
    const { doEpayco } = useEpayco();
    const { doSubscribe } = useComunidad();

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
            doEpayco( item, '/profesionales/comunidades', 'COMUN' )
        } else {
            try {
                doSubscribe( item?.id )
                .then( () => {
                    notify( t('comunidades.alerts.paid'), 'success')
                    dispatch( setRefresh( true ) )
                    doHide( true )
                })
            } catch(error) {
                console.log( error );
                notify( t('comunidades.alerts.error'), 'error')
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
                                <label htmlFor="especialidad"> { t('comunidades.form.title') } </label>
                            </div>

                            <div className="form-floating mb-3">
                                <span className='form-control' style={{height: '150px'}}> { item?.objetivo } </span>
                                <label htmlFor="especialidad"> { t('comunidades.form.target') } </label>
                            </div>

                            <div className="form-floating mb-3">
                                <span className='form-control'> { item.gratis === 'S' ? t('free') : `$${item.precio}`} </span>
                                <label htmlFor="especialidad"> { t('comunidades.form.price') } </label>
                            </div>

                    </Modal.Body>

                    <Modal.Footer className='d-block text-center'>
                        <Button className='w-100 m-0' type='submit'> { 
                            item.gratis === 'S' ? t('comunidades.form.subscribe') : t('comunidades.form.pay')
                        } </Button>
                    </Modal.Footer>

                </form>
            </Modal>        
        )
    }
})
