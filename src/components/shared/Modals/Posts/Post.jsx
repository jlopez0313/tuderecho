import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../MyModal.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faClose } from '@fortawesome/free-solid-svg-icons';
import { Multimedia } from './Multimedia/Multimedia';
import { GifsButton } from './Gifs/GifsButton';
import { EmojiButton } from './Emojis/EmojiButton';
import { useDispatch } from 'react-redux';
import { save } from '@/store/publicaciones/thunks';
import { decodeToken } from "react-jwt";
import { notify } from '@/helpers/helpers'

export const PostModal = (props) => {

  const [comment, setComment] = useState('');
  const [medias, setMedias] = useState([]);
  const [gif, setGif] = useState('');
  const dispatch = useDispatch()

  const onSetMedias = ( list ) => {
    setMedias(current => [...current, ...list])
  }

  const onSetGif = ( gif ) => {
    setGif(gif)
  }

  const onSetComment = (text) => {
    setComment(comment => comment + text)
  }

  const onDoRemove = ( key ) => {
    const files = [...medias]
    files.splice(key, 1)
    setMedias([...files])
  }

  const onDoSavePubli = () => {
    const token = localStorage.getItem('token') || '';
    const { uid } = decodeToken(token);

    const obj = {
      user: uid,
      comment,
      gif,
      medias,
      fecha: new Date()
    }

    const callSave = dispatch( save( obj ) )

    callSave
    .then( () => {
      setComment('');
      setGif('');
      setMedias([])
      notify('Publicación registrada!', 'success')
      props.onHide();
    })
    .catch( error => {
      notify('onDoSavePubli: Internal Error', 'error')
    })
  }

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
        <Modal.Header closeButton className='text-center'>
            <Modal.Title className='m-auto' id="contained-modal-title-vcenter">
                Crea un Post
            </Modal.Title>
        </Modal.Header>
      
        <Modal.Body className='py-0'>
            <textarea
              className='form-control'
              rows='5'
              placeholder='Que quieres escribir hoy?'
              onChange={(evt) => setComment( evt.target.value )}
              value={ comment }
            ></textarea>
            {
              medias.length
              ?
                <div className="grid mt-3">
                  {
                    medias.map( (media, key) => {
                      return <div className='grid-item' key={key}>
                        <FontAwesomeIcon className='remove cursor-pointer' icon={faClose} onClick={() => onDoRemove( key )} title='Eliminar' />
                        <img className='media' src={media} />
                      </div>
                    })
                  }
                </div>
              : null   
            }

            {
              gif
              ?
                <div className='grid-item'>
                  <FontAwesomeIcon className='remove cursor-pointer' icon={faClose} onClick={() => setGif( null )} title='Eliminar' />
                  <img className='media' src={gif} />
                </div>
              : null
            }

            <div className="options mt-2 d-flex justify-content-end align-items-center border rounded p-2">
                <Multimedia onSetMedias={onSetMedias} medias={medias} gif={gif} />
                <GifsButton onSetGif={onSetGif} medias={medias} gif={gif} />
                <EmojiButton onSetComment={ onSetComment } />
                {/*
                  <FontAwesomeIcon className='icon cursor-pointer mx-2' icon={faAt} />
                */}
            </div>

        </Modal.Body>

        <Modal.Footer className='d-block text-center'>
            <Button className='w-100 m-0' onClick={onDoSavePubli}> Publicar </Button>
        </Modal.Footer>
    </Modal>        
  )
}
