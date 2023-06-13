import React, { memo, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../MyModal.scss'
import { useDispatch } from 'react-redux';
import { decodeToken } from "react-jwt";
import { notify } from '@/helpers/helpers'
import { useForm } from '@/hooks/useForm';
import "react-datepicker/dist/react-datepicker.css";
import style from './Comunidades.module.scss'
import { create, update } from '@/services/Comunidades';
import { useTranslation } from 'react-i18next';

export const ComunidadesModal = memo( ( {modalShow, item = {}, ...props} ) => {

    const { t } = useTranslation();

    const initFormData = {
        titulo: '',
        objetivo: '',
        gratis: 'S',
        precio: '',
        archivo: '',
    }

    const { onInputChange, onRadioChange, onSetFormState, formState } = useForm(initFormData)

    const [show, setShow] = useState( true );
    const [file, setFile] = useState( null );

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

    const onUploadImage = ( evt ) => {
        setFile(evt.target.files[0])

        const myEvent2 = { target: { name: 'preview', value: URL.createObjectURL(evt.target.files[0]) }}
        onInputChange( myEvent2 )
    }

    const onDoSubmit = (evt) => {
        evt.preventDefault();
        const token = localStorage.getItem('token') || '';
        const { uid } = decodeToken(token);

        const obj = {
            ...formState,
            archivo: file,
            user: uid,
        }

        let action = null;
        if (item.id) {
            action = update( item.id, obj )
        } else {
            action = create( obj )
        }

        action
        .then( () => {
            notify( t('comunidades.alerts.saved'), 'success');
            onSetFormState(initFormData)
            doHide( true );
        })
        .catch( error => {
            console.log( error );
            notify( t('comunidades.alerts.error'), 'error')
        })
    }

    useEffect(()=> {
        if (item.id) {
            const data = {
                ...item,
                preview: item.archivo,
                archivo: null,
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
                                    placeholder={ t('comunidades.form.title-placeholder') }
                                    onChange={onInputChange}
                                    value={ formState.titulo }
                                />
                                <label htmlFor="especialidad"> { t('comunidades.form.title') } *</label>
                            </div>

                            <div className="form-floating mb-3">
                                <textarea
                                    required
                                    name="objetivo"
                                    className='form-control'
                                    placeholder={ t('comunidades.form.target-placeholder') }
                                    onChange={onInputChange}
                                    value={ formState.objetivo }
                                    style={{height: '150px'}}
                                ></textarea>
                                <label htmlFor="especialidad"> { t('comunidades.form.target') } *</label>
                            </div>

                            <div className="d-flex justify-content-evenly mb-3">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="gratis" value="S" checked={ formState.gratis === 'S' } onChange={onRadioChange}/>
                                    <label className="form-check-label" htmlFor="inlineRadio1"> { t('free') } </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="gratis" value="N" checked={ formState.gratis === 'N' } onChange={onRadioChange}/>
                                    <label className="form-check-label" htmlFor="inlineRadio2"> { t('comunidades.form.cover') } </label>
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
                                            placeholder={ t('comunidades.form.price-placeholder') }
                                            onChange={onInputChange}
                                            value={ formState.precio }
                                        />
                                        <label htmlFor="especialidad"> { t('comunidades.form.price') } *</label>
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
                        <Button className='w-100 m-0' type='submit'> { t('save') } </Button>
                    </Modal.Footer>
                </form>
            </Modal>        
        )
    }
})
