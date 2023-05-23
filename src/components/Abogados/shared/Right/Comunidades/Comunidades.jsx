import React, { useEffect, useState } from 'react'
import { Comunidad } from './Comunidad/Comunidad'
import { faPencil, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ComunidadesModal } from '@/components/Modals/Comunidades/Comunidades';
import { myList, remove } from '@/services/Comunidades';
import { notify } from '@/helpers/helpers';
import Spinner from 'react-bootstrap/Spinner';
import styles from '@/assets/styles/shared.module.scss';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export const Comunidades = () => {

  const { t } = useTranslation();

  const [modalShow, setModalShow] = useState(false);
  const [search, setSearch] = useState('');
  const [lista, setLista] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const { refresh } = useSelector(state => state.comunidad);
  const dispatch = useDispatch();
  
  const onGetList = async () => {
    setIsLoading( true )
    setLista( await myList(search) )
    setIsLoading( false )
  }

  const onRefreshComunidades = (doRefresh) => {
    if (doRefresh) {
      onGetList()
    }

    setModalShow(false)
  }
  
  const onRemove = ( id ) => {
    remove( id )
    .then( () => {
        onGetList();
        notify('Comunidad removida', 'success')
    })
    .catch( error => {
        notify('Comunidad onRemove: Internal Error', 'error')
    })
  }

  const doSetSearch = (evt) => {
    setSearch( evt.target.value )
  }

  useEffect( () => {
    const timer = setTimeout(() => onGetList(), search ? 1000 : 0);
      return () => clearTimeout(timer);
  }, [search])

  useEffect( () => {
    if ( refresh ) {
      onGetList();
    }
  }, [refresh])


  return (
    <>

      <h5 className='text-danger w-100 fw-bold'> {t('comunidades.title')} </h5>

      <div className='border rounded shadow-sm bg-white overflow-hidden h-100 position-relative'>
        
        <div className="w-100 rounded text-center border p-2 bg-danger text-white cursor-pointer"
          onClick={() => setModalShow(true)}
        > 
          <FontAwesomeIcon icon={faPencil} />
          <span className='ms-3'>Crea tu Comunidad</span>
        </div>

        <div className="px-3 mt-2">
          <input className="m-auto form-control explorar" type="text" placeholder="Buscar..." onChange={doSetSearch}/>
        </div>

        <div className={`overflow-auto h-75 ps-3 pe-2 mt-2 ${styles.list}`}>
          {
            isLoading
            ? 
                <div className="text-center">
                    <Spinner animation="grow" />
                </div>
            :
              lista.map( (item, key)=> {

                  return (
                    <Comunidad key={key} item={item} onRemove={onRemove} />
                  )
              })
          }
        </div>

        <ComunidadesModal
            title='Crea tu Comunidad'
            modalShow={modalShow}
            onHide={(doRefresh = false) => onRefreshComunidades(doRefresh)}
        />

        <Link to="/abogados/comunidades" className="order-1 m-auto">
          <Button className='position-absolute rounded-circle bottom-2 end-2'>
            <FontAwesomeIcon icon={faSearch} />
          </Button>
        </Link>
      </div>
    </>
  )
}
