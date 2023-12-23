import React, { useEffect } from 'react'
import { Header } from '@/components/Home/Header/Header'
import { Form } from '@/components/Home/Form/Form'
import { Abogados } from '@/components/Home/Abogados/Abogados'
import { Slider } from '@/components/Home/Slider/Slider'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '@/components/shared/Loader/Loader'

import {  useParams } from 'react-router-dom';
import { setTenant } from '@/helpers/helpers';
import { find } from '@/services/Settings';
import { setSettings } from '@/helpers/helpers';
import { set } from '@/store/settings/SettingsSlice';
import { findByDomain } from '@/services/Tenants';

export const Home = () => {

  const params = useParams();
  const dispatch = useDispatch();

  const { settings } = useSelector( state => state.settings );
  localStorage.removeItem('token');

  const onLoadSettings = async() => {
    const {settings} = await find();
    setSettings( settings );
    dispatch( set( settings ) )
  }

  const onGetTenant = async () => {
    try {
      if ( params.tenant ) {
        setTenant(params.tenant);
      }
      else {
        const tenant = await findByDomain( window.location.host )
        setTenant(tenant?.name);
      }

      onLoadSettings()

    } catch(error) { }
  }
  
  useEffect( () => {
    onGetTenant()
  }, [params])

  return (
    <>
      {
        settings?.logo ? 
        <>
          <Header />
          <Slider />
        </> 
        : <Loader />
      }

      {/*
      <div className="row my-3">
        {
          [1,1,1,1,1,1].map( (_, index) => {
            return (
              <div className="col-4 mb-3" key={ index }>
                <Abogados />
              </div>
            )
          })
        }
      </div>

      <Form />
    */}
    </>
  )
}
