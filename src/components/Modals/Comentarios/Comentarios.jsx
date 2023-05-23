import React, { memo, useContext, useEffect, useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Avatar from '@/assets/images/abogado/perfil/avatar.png';
import '../MyModal.scss'
import { decodeToken } from "react-jwt";
import { notify } from '@/helpers/helpers'
import { useForm } from '@/hooks/useForm';
import "react-datepicker/dist/react-datepicker.css";
import { create } from '@/services/Comentarios';
import { Comentario } from './Comentario/Comentario';
import { Publicacion } from '@/components/Abogados/shared/Publicacion/Publicacion';
import styles from './Comentarios.module.scss';
import shared from '@/assets/styles/shared.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { useSelector } from 'react-redux';
import { PublicacionContext } from '@/context/publicacion/PublicacionContext';

export const ComentariosModal = memo( ( {modalShow, ...props} ) => {

    const { publicacion, setPublicacion } = useContext( PublicacionContext );

    const [show, setShow] = useState( true );
    
    const initFormData = {
        comentario: '',
    }
    
    const { user } = useSelector( state => state.user )

    const { onInputChange,  onSetFormState, formState } = useForm(initFormData)
    const comentario = useRef()


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

    const onDoSubmit = async (evt) => {
        evt.preventDefault();
        // if (evt.key === 'Enter') {
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
                // onAddChild( publicacion, saved )
                setPublicacion( saved )
            } else {
                notify('onDoSubmit Conferencia: Internal Error', 'error')
            }
        // }
    }

    const onComentar = () => {
        comentario.current.select()
    }

    useEffect(()=> {
        if ( publicacion) {
            onSetFormState({
                ...initFormData,
                publicacion: publicacion.id,
                publicacionID: publicacion.id
            })


        }
    }, [publicacion])
    

    if ( modalShow ) {
        return (
            <Modal
                show={show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className={styles.modal}
            >
                    <Modal.Header closeButton className='text-center pb-0' onHide={doHide}>
                        <Modal.Title className='m-auto' id="contained-modal-title-vcenter">
                            {props.title}
                        </Modal.Title>
                    </Modal.Header>
                
                    <Modal.Body className={`py-0 ${styles.body} ${shared.list}`}>

                        <div className='overflow-auto'>
                            <Publicacion
                                className='mb-3'
                                post={publicacion}
                                onComentar={onComentar}
                            />

                            {
                                publicacion.comentarios?.map( (item, key) => {
                                    return <Comentario
                                        key={key}
                                        item={item}
                                    />
                                })
                            }
                        </div>

                    </Modal.Body>

                    <Modal.Footer className='d-block'>
                        <div className='d-flex align-items-center justify-content-between border rounded px-1 mb-2'>
                            <div>
                                <img src={user.perfil?.photo || Avatar} className={`me-3 ${styles.avatar}`} />
                            </div>
                            <form className='w-100' onSubmit={onDoSubmit}>
                                <div className="form-floating">
                                    <input
                                        ref={comentario}
                                        required
                                        name="comentario"
                                        className='form-control border-0 pe-5'
                                        placeholder='Escribe tu comentario'
                                        onChange={onInputChange}
                                        value={ formState.comentario }
                                    />
                                    <label htmlFor="especialidad">Tu Comentario *</label>
                                    <FontAwesomeIcon
                                        role="button"
                                        className={`position-absolute bottom-25 end-0 me-2 text-danger ${ formState.comentario ? '' : 'disabled'}`}
                                        icon={faPaperPlane} onClick={onDoSubmit}
                                    />
                                </div>
                            </form>
                        </div>
                    </Modal.Footer>
            </Modal>
        )
    }
})
