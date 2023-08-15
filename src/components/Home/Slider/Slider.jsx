import React from 'react'
import './Slider.scss';

import { useTranslation } from 'react-i18next';

export const Slider = () => {

  const { t } = useTranslation();

  return (
    <div className='slider'>
        <div className="container pt-7">
            <h2 className='w-sm-25 d-block text-white title'>
              { t('home.slider.title') }
            </h2>
            <span className='d-block mb-4 subtitle'>
              { t('home.slider.description') }
            </span>
            <button className='w-25 btn btn-primary'> { t('home.slider.start') } </button>
        </div>
    </div>
  )
}
