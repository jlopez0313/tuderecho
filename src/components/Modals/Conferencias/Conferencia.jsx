import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../MyModal.scss'
import { useDispatch } from 'react-redux';
import { save } from '@/store/publicaciones/thunks';
import { decodeToken } from "react-jwt";
import { notify } from '@/helpers/helpers'
import { useForm } from '@/hooks/useForm';
import { format, subDays } from 'date-fns'
import es from "date-fns/locale/es";
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import style from './Conferencia.module.scss'
import { create } from '@/store/conferencias/thunks';

export const ConferenciaModal = (props) => {

    const formData = {
        titulo: '',
        conferencista: '',
        fecha: '',
        objetivo: '',
        gratis: 'S',
        precio: '',
        archivo: '',
    }

    const { onInputChange, onRadioChange, onSetFormState, formState } = useForm(formData)

    const dispatch = useDispatch()

    const onSetStartDate = (date) => {
        const evt = { target: {name: 'fecha', value: date} }
        onInputChange( evt )
    }

    const onUploadImage = ( evt ) => {

        const reader = new FileReader();
        reader.readAsDataURL(evt.target.files[0]);
        reader.onload = function(event) {
            const myEvent = { target: { name: 'archivo', value: event.target.result }}
            onInputChange( myEvent )
        };
            reader.onerror = function() {
            notify("No se pudo cargar la imágen", "error");
        };
    }

    const onDoSubmit = (evt) => {
        evt.preventDefault();
        const token = localStorage.getItem('token') || '';
        const { uid } = decodeToken(token);

        const obj = {
            ...formState,
            user: uid,
        }

        const callSave = dispatch( create( obj ) )

        callSave
        .then( () => {
            notify('Conferencia registrada!', 'success')
            props.onHide();
        })
        .catch( error => {
            notify('onDoSubmit Conferencia: Internal Error', 'error')
        })
    }

    useEffect(() => {
        registerLocale("es-CO", es);
    }, []);

    return (
        <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <form onSubmit={onDoSubmit}>
                <Modal.Header closeButton className='text-center'>
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
                                value={ formState.comment }
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
                                value={ formState.conferencista }
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
                                        value={ formState.precio }
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

                        <img src={formState.archivo} alt='' className={style.archivo}/>

                </Modal.Body>

                <Modal.Footer className='d-block text-center'>
                    <Button className='w-100 m-0' type='submit'> Crear </Button>
                </Modal.Footer>
            </form>
        </Modal>        
    )
}
