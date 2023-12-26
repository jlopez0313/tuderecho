import React, { useState } from 'react'
import './Slider.scss';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { FormModal } from '@/components/Modals/Form/Form'

export const Slider = () => {

  const { t } = useTranslation();
  const { settings } = useSelector(state => state.settings);
  const [showModal, setShowModal] = useState(false);

  
  const onShowModal = ( ) => {
    setShowModal( true )
  }

  const onHideModal = ( ) => {
      setShowModal(false)
}


  return (
    <div className='slider' style={{backgroundImage: `url(${settings.fondo})`}}>
        <div className="container pt-7">
            <h2 className='w-sm-25 d-block text-white title'>
              { t('home.slider.title') }
            </h2>
            <span className='d-block mb-4 subtitle'>
              { t('home.slider.description') }
            </span>
            <button className='w-25 btn btn-primary' onClick={onShowModal}> { t('home.slider.start') } </button>
        </div>

        
        
        <FormModal
            title={ t('form.title') }
            modalShow={showModal}
            onHide={(refresh = false) => onHideModal( refresh )}
        />

    </div>
  )
}
