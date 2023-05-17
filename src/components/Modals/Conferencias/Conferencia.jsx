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
import { create } from '@/services/Conferencias';
import { signal } from '@preact/signals-react';

const shown = signal( false );
export const ConferenciaModal = memo( ( {modalShow, item = {}, ...props} ) => {

    const [show, setShow] = useState( true );
    const [file, setFile] = useState( {} );
    
    const initFormData = {
        titulo:     item?.titulo    || '',
        fecha:      item?.fecha     || '',
        objetivo:   item?.objetivo  || '',
        gratis:     item?.gratis    || 'S',
        precio:     item?.precio    || '',
        archivo:    item?.archivo   || '',
        conferencista: item?.conferencista || '',
    }

    const { onInputChange, onRadioChange, onSetFormState, formState } = useForm(initFormData)

    const doHide = ( hide = false ) => {
        setShow( false )
        
        setTimeout( () => {
            props.onHide( hide );
        }, 100)

        setTimeout( () => {
            setShow( true )
        }, 200)

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

    const onDoSubmit = (evt) => {
        evt.preventDefault();
        const token = localStorage.getItem('token') || '';
        const { uid } = decodeToken(token);
        console.log( formState );

        const obj = {
            ...formState,
            archivo: file,
            user: uid,
        }

        create( obj )
        .then( () => {
            notify('Conferencia registrada!', 'success');
            onSetFormState(initFormData)
            doHide( true );
        })
        .catch( error => {
            notify('onDoSubmit Conferencia: Internal Error', 'error')
        })
    }

    useEffect(() => {
        registerLocale("es-CO", es);
    }, []);
    
    useEffect(() => {
        if ( item.fecha ) {
            onSetFormState({
                ...item,
                fecha: new Date( item.fecha )
            })
        }
    }, [item]);
    
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
                                placeholder='Ej: El Abogado como mediador de conflictos'
                                onChange={onInputChange}
                                defaultValue={ formState.titulo }
                            />
                            <label htmlFor="especialidad">Título *</label>
                        </div>
    
                        <div className="form-floating mb-3">
                            <input
                                required
                                name="conferencista"
                                className='form-control'
                                placeholder='Ej: Pedro Pérez'
                                onChange={onInputChange}
                                defaultValue={ formState.conferencista }
                            />
                            <label htmlFor="especialidad">Nombre del Conferencista *</label>
                        </div>
    
                        <div className="form-floating mb-3">
                            <DatePicker
                                required
                                className='form-control'
                                withPortal
                                placeholderText="Fecha *"
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
                                placeholder='Describe el objetivo de la Conferencia'
                                onChange={onInputChange}
                                value={ formState.objetivo }
                                style={{height: '150px'}}
                            ></textarea>
                            <label htmlFor="especialidad">Objetivo *</label>
                        </div>
    
                        <div className="d-flex justify-content-evenly mb-3">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gratis" value="S" checked={ formState.gratis === 'S' } onChange={onRadioChange}/>
                                <label className="form-check-label" htmlFor="inlineRadio1">Gratis</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gratis" value="N" checked={ formState.gratis === 'N' } onChange={onRadioChange}/>
                                <label className="form-check-label" htmlFor="inlineRadio2">Pago</label>
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
                                        placeholder='Ej: $50 USD'
                                        onChange={onInputChange}
                                        defaultValue={ formState.precio }
                                    />
                                    <label htmlFor="especialidad">Precio Suscripción *</label>
                                </div>
                            : null
                        }
    
                        <div className="mb-3">
                            <input
                                required
                                className="form-control"
                                type="file"
                                accept='image/png, image/jpeg'
                                onChange={onUploadImage}
                            />
                        </div>
                        <img src={formState.preview} alt='' className={style.archivo}/>
    
                    </Modal.Body>
    
                    <Modal.Footer className='d-block text-center'>
                        <Button className='w-100 m-0' type='submit'> Crear </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        )
    }
})
