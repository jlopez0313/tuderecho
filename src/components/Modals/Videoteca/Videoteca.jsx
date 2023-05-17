import React, { memo, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../MyModal.scss'
import { decodeToken } from "react-jwt";
import { notify, getYoutubeId } from '@/helpers/helpers'
import { useForm } from '@/hooks/useForm';
import "react-datepicker/dist/react-datepicker.css";
import style from './Videoteca.module.scss'
import { create } from '@/services/Videoteca';

export const VideotecaModal = memo( ( {modalShow, item = {}, ...props} ) => {

    const initFormData = {
        titulo:     item?.titulo    || '',
        video:      item?.video     || '',
        gratis:     item?.gratis    || 'S',
        precio:     item?.precio    || '',
        conferencista:  item?.conferencista     || '',
    }

    const { onInputChange, onRadioChange, onSetFormState, formState } = useForm(initFormData)

    const [show, setShow] = useState( true );

    const doHide = ( hide = false ) => {
        setShow( false )
        
        setTimeout( () => {
            props.onHide( hide );
        }, 100)

        setTimeout( () => {
            setShow( true )
        }, 200)

    }

    const onDoSubmit = (evt) => {
        evt.preventDefault();

        const token = localStorage.getItem('token') || '';
        const { uid } = decodeToken(token);

        const obj = {
            ...formState,
            user: uid,
        }

        create( obj )
        .then( () => {
            notify('Videoteca registrada!', 'success');
            onSetFormState(initFormData)
            doHide( true );
        })
        .catch( error => {
            notify('onDoSubmit Videoteca: Internal Error', 'error')
        })
    }

    const onGetYoutubeId = async (evt) => {
        const ID = getYoutubeId( evt.target.value )
        const event = {target: { name: 'video', value: ID } }
        onInputChange( event )
    }

    useEffect(() => {
        if ( item.titulo ) {
            onSetFormState({
                ...item,
            })
        }
    }, [item]);

    if (modalShow) {
        return (
            <Modal
                show={show}
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
                                    value={ formState.titulo }
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
                                <input
                                    required
                                    className='form-control'
                                    placeholder='Ej: https://www.youtube.com/watch?v=3082r1-0DXc'
                                    onChange={onGetYoutubeId}
                                />
                                <label htmlFor="especialidad">Youtube URL *</label>
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

                            {
                                formState.video 
                                ?
                                    <img src={`http://img.youtube.com/vi/${formState.video}/0.jpg`} alt='' className={style.archivo}/>
                                :
                                    <div className="alert alert-danger">
                                        No Video Found
                                    </div>
                            }


                    </Modal.Body>

                    <Modal.Footer className='d-block text-center'>
                        <Button className='w-100 m-0' type='submit' disabled={!formState.video}> Crear </Button>
                    </Modal.Footer>
                </form>
            </Modal>        
        )
    }
} )
