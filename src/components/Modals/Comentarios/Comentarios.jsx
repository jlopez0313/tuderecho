import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../MyModal.scss'
import { useDispatch } from 'react-redux';
import { decodeToken } from "react-jwt";
import { notify } from '@/helpers/helpers'
import { useForm } from '@/hooks/useForm';
import "react-datepicker/dist/react-datepicker.css";
import { create, get } from '@/store/comentarios/thunks';
import { Comentario } from './Comentario/Comentario';
import { Publicacion } from './Publicacion/Publicacion';
import styles from './Comentarios.module.scss';
import shared from '@/assets/styles/shared.module.scss';

export const ComentariosModal = ({publi, ...props}) => {

    const initFormData = {
        publicacion: publi.id,
        comentario: '',
    }
    
    const { onInputChange,  onSetFormState, formState } = useForm(initFormData)
    const comentario = useRef()
    const dispatch = useDispatch()

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
            notify('Conferencia registrada!', 'success');
            onSetFormState(initFormData)
            props.onHide( true );
        })
        .catch( error => {
            notify('onDoSubmit Conferencia: Internal Error', 'error')
        })
    }

    const onComentar = () => {
        comentario.current.select()
    }

    useEffect(()=> {
        // dispatch(get())
    }, [])

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className={styles.modal}
        >
                <form onSubmit={onDoSubmit}>
                    <Modal.Header closeButton className='text-center'>
                        <Modal.Title className='m-auto' id="contained-modal-title-vcenter">
                            {props.title}
                        </Modal.Title>
                    </Modal.Header>
                
                    <Modal.Body className={`py-0 ${styles.body} ${shared.list}`}>

                        <div className='overflow-auto'>
                            <Publicacion publi={publi} onComentar={onComentar}/>

                            {
                                publi.comentarios.map( (item, key) => {
                                    

                                    return <Comentario key={key} item={item} />
                                })
                            }
                        </div>

                    </Modal.Body>

                    <Modal.Footer className='d-block'>
                        <div className="form-floating mb-3">
                            <input
                                ref={comentario}
                                required
                                name="comentario"
                                className='form-control'
                                placeholder='Escribe tu comentario'
                                onChange={onInputChange}
                                defaultValue={ formState.comentario }
                            />
                            <label htmlFor="especialidad">Tu Comentario *</label>
                        </div>

                        <Button className='w-100 m-0' type='submit'> Crear </Button>
                    </Modal.Footer>
                </form>
        </Modal>        
    )
}
