import React, { memo, useEffect, useMemo, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../MyModal.scss'
import { decodeToken } from "react-jwt";
import { notify } from '@/helpers/helpers'
import { useForm } from '@/hooks/useForm';
import { format, subDays } from 'date-fns'
import es from "date-fns/locale/es";
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import style from './Conferencia.module.scss'
import { create, update } from '@/services/Conferencias';
import { signal } from '@preact/signals-react';
import { useDispatch } from 'react-redux';
import { setRefresh } from '@/store/conferencias/ConferenciasSlice';

import { useTranslation } from 'react-i18next';
import { auth } from '@/services/Zoom';

const shown = signal( false );
export const ConferenciaModal = memo( ( {modalShow, item = {}, ...props} ) => {

    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [show, setShow] = useState( true );
    const [file, setFile] = useState( null );
    const [isLoading, setIsLoading] = useState( false );

    const initFormData = {
        titulo: '',
        fecha:'',
        objetivo: '',
        gratis: 'S',
        precio: '',
        archivo: '',
        conferencista: '',
    }

    const { onInputChange, onRadioChange, onSetFormState, formState } = useForm(initFormData)

    const doHide = ( hide = false ) => {
        setShow( false )
        setFile('');
        
        const timer1 = setTimeout( () => {
            props.onHide( hide );
        }, 100)

        const timer2 = setTimeout( () => {
            setShow( true )
        }, 200)

        // clearTimeout(timer1)
        // clearTimeout(timer2)

    }

    const onSetStartDate = (date) => {
        console.log(date)
        const evt = { target: {name: 'fecha', value: date} }
        onInputChange( evt )
    }

    const onUploadImage = ( evt ) => {
        setFile(evt.target.files[0])

        const myEvent2 = { target: { name: 'preview', value: URL.createObjectURL(evt.target.files[0]) }}
        onInputChange( myEvent2 )
    }

    const onDoSubmit = async (evt) => {
        evt.preventDefault();
        
        const token = localStorage.getItem('token') || '';
        const { uid } = decodeToken(token);
        
        const {access_token} = await auth();
        
        const obj = {
            ...formState,
            archivo: file,
            user: uid,
            access_token
        }

        let action = null;
        if (item.id) {
            action = update( item.id, obj )
        } else {
            action = create( obj )
        }

        setIsLoading( true );
        action
        .then( () => {
            setIsLoading( false );
            notify( t('conferencias.alerts.saved'), 'success');
            onSetFormState(initFormData);
            dispatch( setRefresh( true ) )
            doHide( true );
        })
        .catch( error => {
            setIsLoading( false );
            notify( t('conferencias.alerts.error'), 'error')
        })
    }

    useEffect(() => {
        registerLocale("es-CO", es);
    }, []);
    
    useEffect(()=> {
        if (item.id) {
            const data = { 
                ...item,
                preview: item.archivo,
                archivo: null,
                fecha: new Date( item.fecha )
            }
            onSetFormState( data )
        }
    }, [item])
    
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
                            <input
                                required
                                name="titulo"
                                className='form-control'
                                placeholder={ t('conferencias.form.title-placeholder') }
                                onChange={onInputChange}
                                defaultValue={ formState.titulo }
                            />
                            <label htmlFor="especialidad"> { t('conferencias.form.title') } *</label>
                        </div>
    
                        <div className="form-floating mb-3">
                            <input
                                required
                                name="conferencista"
                                className='form-control'
                                placeholder={ t('conferencias.form.expositor-placeholder') }
                                onChange={onInputChange}
                                defaultValue={ formState.conferencista }
                            />
                            <label htmlFor="especialidad">{ t('conferencias.form.expositor') } *</label>
                        </div>
    
                        <div className="form-floating mb-3">
                            <DatePicker
                                required
                                className='form-control'
                                withPortal
                                placeholderText={ t('conferencias.form.date') + ' *' }
                                isClearable
                                showTimeSelect
                                dateFormat="Pp"
                                timeFormat="p"
                                locale={'es-CO'}
                                showPopperArrow={false}
                                selected={formState.fecha}
                                minDate={subDays(new Date(), -2)}
                                onChange={(date) => onSetStartDate(date)}
                            />
    
                        </div>
                        
                        <div className="form-floating mb-3">
                            <textarea
                                required
                                name="objetivo"
                                className='form-control'
                                placeholder={ t('conferencias.form.target-placeholder') }
                                onChange={onInputChange}
                                value={ formState.objetivo }
                                style={{height: '150px'}}
                            ></textarea>
                            <label htmlFor="especialidad">{ t('conferencias.form.target') } *</label>
                        </div>
    
                        <div className="d-flex justify-content-evenly mb-3">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gratis" value="S" checked={ formState.gratis === 'S' } onChange={onRadioChange}/>
                                <label className="form-check-label" htmlFor="inlineRadio1"> { t('free') } </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gratis" value="N" checked={ formState.gratis === 'N' } onChange={onRadioChange}/>
                                <label className="form-check-label" htmlFor="inlineRadio2"> { t('conferencias.form.cover') } </label>
                            </div>
                        </div>
    
                        {
                            formState.gratis === 'N' ?
                                <div className="form-floating mb-3">
                                    <input
                                        required
                                        name='precio'
                                        type='number'
                                        className='form-control'
                                        placeholder={ t('conferencias.form.price-placeholder') }
                                        onChange={onInputChange}
                                        defaultValue={ formState.precio }
                                    />
                                    <label htmlFor="especialidad"> { t('conferencias.form.price') } *</label>
                                </div>
                            : null
                        }
    
                        <div className="mb-3">
                            <input
                                required={!item.id}
                                className="form-control"
                                type="file"
                                accept='image/png, image/jpeg'
                                onChange={onUploadImage}
                            />
                        </div>
                        <img src={formState.preview} alt='' className={style.archivo}/>
    
                    </Modal.Body>
                    <Modal.Footer className='d-block text-center'>
                        <Button className='w-100 m-0' type='submit' disabled={!formState.fecha || isLoading}> 
                            {
                                isLoading ? t('loading') : t('save')
                            }
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        )
    }
})
