import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../MyModal.scss'
import { useDispatch } from 'react-redux';
import { decodeToken } from "react-jwt";
import { notify } from '@/helpers/helpers'
import { useForm } from '@/hooks/useForm';
import "react-datepicker/dist/react-datepicker.css";
import { create } from '@/helpers/Comentarios';
import { Comentario } from './Comentario/Comentario';
import { Publicacion } from '@/components/shared/Publicacion/Publicacion';
import styles from './Comentarios.module.scss';
import shared from '@/assets/styles/shared.module.scss';

export const ComentariosModal = ({post, onSetPubli, ...props}) => {

    const [publi, setPubli] = useState( post );

    const initFormData = {
        publicacion: post.id,
        comentario: '',
    }
    
    const { onInputChange,  onSetFormState, formState } = useForm(initFormData)
    const comentario = useRef()

    const onDoSubmit = async (evt) => {
        evt.preventDefault();
        const token = localStorage.getItem('token') || '';
        const { uid } = decodeToken(token);

        const obj = {
            ...formState,
            user: uid,
        }

        const saved = await create( obj )
        if ( saved ) {
            notify('Comentario registrado!', 'success');
            onSetFormState(initFormData)
            const list = [...publi.comentarios, saved]
            const post = {...publi, comentarios: list}
            setPubli( post );
            onSetPubli( post )
            // props.onHide( true );
        } else {
            notify('onDoSubmit Conferencia: Internal Error', 'error')
        }
    }

    const onComentar = () => {
        comentario.current.select()
    }

    const onDoRemoveComment = (id) => {
        const list = publi.comentarios.filter( comment => comment.id !== id)
        const post = {...publi, comentarios: list}
        setPubli( post );
        onSetPubli( post )
    } 

    useEffect(()=> {
        setPubli( post )
    }, [post])

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
                            <Publicacion
                                post={publi}
                                onComentar={onComentar}
                                onSetPubli={onSetPubli}
                            />

                            {
                                publi.comentarios?.map( (item, key) => {
                                    

                                    return <Comentario key={key} item={item} onDoRemoveComment={onDoRemoveComment} />
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
                                value={ formState.comentario }
                            />
                            <label htmlFor="especialidad">Tu Comentario *</label>
                        </div>

                        <Button className='w-100 m-0' type='submit'> Crear </Button>
                    </Modal.Footer>
                </form>
        </Modal>        
    )
}
