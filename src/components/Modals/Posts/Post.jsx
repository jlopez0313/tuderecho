import React, { memo, useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../MyModal.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faClose } from '@fortawesome/free-solid-svg-icons';
import { Multimedia } from './Multimedia/Multimedia';
import { GifsButton } from './Gifs/GifsButton';
import { EmojiButton } from './Emojis/EmojiButton';
import { save } from '@/services/Publicaciones';
import { decodeToken } from "react-jwt";

import { notify } from '@/helpers/helpers'
import { Publicacion } from '@/components/Abogados/shared/Publicacion/Publicacion';
import styles from './Post.module.scss';
import shared from '@/assets/styles/shared.module.scss';
import { PublicacionContext } from '@/context/publicacion/PublicacionContext';

import { useTranslation } from 'react-i18next';
import { Conferencia } from '@/components/Abogados/shared/Conferencia/Conferencia';
import { Videoteca } from '@/components/Abogados/shared/Videoteca/Videoteca';

export const PostModal = memo( ( {modalShow, conferencia = null, videoteca = null, comunidad = '', post, ...props} ) => {

  const { t } = useTranslation();

  const { publicacion, setPublicacion } = useContext( PublicacionContext );

  const [postID, setPostID] = useState('');
  const [comment, setComment] = useState('');
  const [medias, setMedias] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [gif, setGif] = useState('');
  const [show, setShow] = useState( true );
  const [isLoading, setIsLoading] = useState( false )

  const doHide = ( refresh = false ) => {
      setShow( false )
      
      const timer1 = setTimeout( () => {
          props.onHide( refresh );
      }, 100)

      const timer2 = setTimeout( () => {
          setShow( true )
      }, 200)

      // clearTimeout(timer1)
      // clearTimeout(timer2)

  }


  const onSetMedias = ( mediaList ) => {

    Object.keys(mediaList).forEach( key => {

      const item = mediaList[key]
      setMedias( list => [...list, item ])

      const preview = URL.createObjectURL( item )
      setPreviews( list => [...list, preview ])

    })

  }

  const onSetGif = ( gif ) => {
    setGif(gif)
  }

  const onSetComment = (text) => {
    setComment(comment => comment + text)
  }

  const onRemoveMedia = ( key ) => {
    const files = [...medias]
    files.splice(key, 1)
    setMedias([...files])

    const prevs = [...previews]
    prevs.splice(key, 1)
    setPreviews([...prevs])
  }

  const onDoSavePubli = async () => {
    const token = localStorage.getItem('token') || '';
    const { uid } = decodeToken(token);

    const obj = {
      user: uid,
      conferencia: conferencia?.id || '',
      videoteca: videoteca?.id || '',
      comunidad,
      comment,
      gif,
      medias,
      post: postID || null,
      fecha: new Date()
    }

    setIsLoading( true )
    const saved = await save( obj );
    setIsLoading( false )
    
    if( saved ) {
      setComment('');
      setGif('');
      setMedias([])
      setPreviews([])
      setPublicacion( null );

      notify( t('posts.alerts.saved'), 'success')
      doHide( true );
    } else {
      notify( t('posts.alerts.error'), 'error')
    }
  }

  useEffect(() => {
    if (publicacion) 
      setPostID(publicacion.id)
  }, [publicacion])
  
  if (modalShow) {

    return (
      <Modal
        show={show}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={styles.modal}
      >
          <Modal.Header closeButton className='text-center' onHide={doHide}>
              <Modal.Title className='m-auto' id="contained-modal-title-vcenter">
                {props.title}
              </Modal.Title>
          </Modal.Header>
        
          <Modal.Body className='py-0 pe-1'>
            <div className={`pe-1 ${styles.body} ${shared.list}`}>
              <textarea
                className='form-control'
                rows='5'
                placeholder={ t('posts.form.post') }
                onChange={(evt) => setComment( evt.target.value )}
                value={ comment }
              ></textarea>
              {
                previews.length
                ?
                  <div className="grid mt-3">
                    {
                      previews.map( (media, key) => {
                        return <div className='grid-item' key={key}>
                          <FontAwesomeIcon className='remove cursor-pointer' icon={faClose} onClick={() => onRemoveMedia( key )} title={ t('posts.form.remove') } />
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
                    <FontAwesomeIcon className='remove cursor-pointer' icon={faClose} onClick={() => setGif( null )} title={ t('posts.form.remove') } />
                    <img className='media' src={gif} />
                  </div>
                : null
              }

              {
                publicacion
                ?
                  <div className='overflow-auto'>
                    <Publicacion
                        className='mb-3'
                        post={publicacion}
                        showActions={false}
                    />
                  </div>
                : null
              }

              {
                conferencia
                ?
                  <div className='overflow-auto'>
                    <Conferencia conferencia={conferencia} />
                  </div>
                : null
              }

              {
                videoteca
                ?
                  <div className='overflow-auto'>
                    <Videoteca videoteca={videoteca} />
                  </div>
                : null
              }

            </div>

              
              <div className="options mt-2 d-flex justify-content-end align-items-center border rounded p-2 me-2">
                {
                  !post
                  ? 
                    <>
                      <Multimedia onSetMedias={onSetMedias} medias={medias} gif={gif} />
                      <GifsButton onSetGif={onSetGif} medias={medias} gif={gif} />
                    </>
                  : null
                }

                <EmojiButton onSetComment={ onSetComment } />
                  {/*
                    <FontAwesomeIcon className='icon cursor-pointer mx-2' icon={faAt} />
                  */}
              </div>

          </Modal.Body>

          <Modal.Footer className='d-block text-center'>
              <Button className='w-100 m-0' onClick={onDoSavePubli} disabled={isLoading}>
                { 
                  isLoading ? t('loading') : t('posts.form.publish')
                } 
              </Button>
          </Modal.Footer>
      </Modal>        
    )
  }
})
