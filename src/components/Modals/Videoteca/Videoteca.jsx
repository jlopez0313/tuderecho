import React, { memo, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../MyModal.scss'
import { decodeToken } from "react-jwt";
import { notify, getYoutubeId } from '@/helpers/helpers'
import { useForm } from '@/hooks/useForm';
import { useVimeo } from '@/hooks/useVimeo';
import "react-datepicker/dist/react-datepicker.css";
import style from './Videoteca.module.scss'
import { create, update } from '@/services/Videoteca';
import { upload } from '@/services/Dacast';

import { useDispatch } from 'react-redux';
import { setRefresh } from '@/store/videoteca/VideotecaSlice';

import { useTranslation } from 'react-i18next';

import Vimeo from '@u-wave/react-vimeo';


export const VideotecaModal = memo( ( {modalShow, item = {}, ...props} ) => {

    const { t } = useTranslation();
    // const { upload } = useVimeo();
    const dispatch = useDispatch();

    const initFormData = {
        titulo: '',
        video: '',
        gratis: 'S',
        precio: '',
        conferencista: '',
    }

    const { onInputChange, onRadioChange, onSetFormState, formState } = useForm(initFormData)

    const [show, setShow] = useState( true );
    const [videoUrl, setVideoUrl] = useState('');
    const [isLoading, setIsLoading] = useState( false );

    const doHide = ( hide = false ) => {
        setShow( false )
        setVideoUrl( '' )
        
        const timer1 = setTimeout( () => {
            props.onHide( hide );
        }, 100)

        const timer2 = setTimeout( () => {
            setShow( true )
        }, 200)

        // clearTimeout(timer1)
        // clearTimeout(timer2)

    }

    const onDoSubmit = async (evt) => {
        evt.preventDefault();

        setIsLoading( true );

        try {
            let carga = {}

            if (videoUrl) {
                carga = await upload(videoUrl, formState.titulo);
            }

            const token = localStorage.getItem('token') || '';
            const { uid } = decodeToken(token);

            let obj = {}
            if ( carga.id ) {            
                obj = {
                    ...formState,
                    video: carga.id,
                    user: uid,
                }
            } else {
                obj = {
                    ...formState,
                    user: uid,
                }
            }

            let action = null;
            if (item.id) {
                action = update( item.id, obj )
            } else {
                action = create( obj )
            }

            action
            .then( () => {
                setIsLoading( false );
                notify( t('posts.alerts.saved'), 'success');
                onSetFormState(initFormData);
                dispatch( setRefresh( true ) )
                doHide( true );
            })
            .catch( error => {
                setIsLoading( false );
                notify( t('posts.alerts.error'), 'error')
            })

        } catch( error) {
            console.log( error );
            setIsLoading( false );
            notify( t('posts.alerts.error'), 'error')
        }
    }

    const onGetVideoURI = async (evt) => {
        setVideoUrl(evt.target.files[0]);
    }

    useEffect(() => {
        if ( item.id ) {
            // setVideoUrl(item.video);
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
                                    placeholder={ t('videoteca.form.title-placeholder') }
                                    onChange={onInputChange}
                                    value={ formState.titulo }
                                />
                                <label htmlFor="especialidad"> { t('videoteca.form.title') } *</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input
                                    required
                                    name="conferencista"
                                    className='form-control'
                                    placeholder={ t('videoteca.form.expositor-placeholder') }
                                    onChange={onInputChange}
                                    value={ formState.conferencista }
                                />
                                <label htmlFor="especialidad">{ t('videoteca.form.expositor') } *</label>
                            </div>

                            <div className="mb-3">
                                <input
                                    type="file"
                                    required={!item.id}
                                    className='form-control'
                                    placeholder='Ej: https://www.youtube.com/watch?v=3082r1-0DXc'
                                    onChange={onGetVideoURI}
                                />
                            </div>

                            <div className="d-flex justify-content-evenly mb-3">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="gratis" value="S" checked={ formState.gratis === 'S' } onChange={onRadioChange}/>
                                    <label className="form-check-label" htmlFor="inlineRadio1">{ t('videoteca.form.free') }</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="gratis" value="N" checked={ formState.gratis === 'N' } onChange={onRadioChange}/>
                                    <label className="form-check-label" htmlFor="inlineRadio2">{ t('videoteca.form.cover') }</label>
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
                                            placeholder={ t('videoteca.form.price-placeholder') }
                                            onChange={onInputChange}
                                            value={ formState.precio }
                                        />
                                        <label htmlFor="especialidad">{ t('videoteca.form.price') } *</label>
                                    </div>
                                : null
                            }

                            {
                                formState.video 
                                ?
                                    <Vimeo
                                        video={formState.video}
                                        className={style.archivo}
                                    />
                                :
                                    null
                            }


                    </Modal.Body>

                    <Modal.Footer className='d-block text-center'>
                        <Button className='w-100 m-0' type='submit' disabled={!videoUrl || isLoading}> 
                            { 
                                isLoading ? t('loading') : t('save')
                            }
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>        
        )
    }
} )
