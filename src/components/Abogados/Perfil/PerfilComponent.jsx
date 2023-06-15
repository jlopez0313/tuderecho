import { useEffect, useState } from 'react';
import { DatosPersonales } from "./DatosPersonales"
import { InformacionPrivada } from "./InformacionPrivada"
import { useSelector } from 'react-redux';
import { decodeToken } from "react-jwt";
import { update } from '@/services/Usuarios';
import { useForm } from '@/hooks/useForm';
import { notify } from '@/helpers/helpers';
import Breadcrumb from '@/components/shared/Breadcrumb';

import { useTranslation } from 'react-i18next';

export const PerfilComponent = () => {
  
  const { t } = useTranslation();

  const breadcrumb = [
    {
        name: 'Home',
        href: '/abogados',
        active: false
    },{
        name: t('profile.title'),
        active: true
    }
  ]

  const { user } = useSelector( state => state.user );
  const [id, setId] = useState('');

  const formData = {
    cuenta: 'A',
    email: '',
    name: '',
    perfil: {
      biografia: '',
      ciudad: '',
      cuenta: '',
      decreto176: '',
      especialidad: '',
      estudiante: '',
      identificacion: '',
      oldImage: '',
      pais: '',
      photo: '',
      region: '',
      tags: [],
      tarjeta_profesional: '',
      telefono: '',
      tipoDoc: ''
    },
  }

  const { onInputChange, onRadioChange, onSetFormState, formState } = useForm(formData)

  const onFindUser = () => {
    const token = localStorage.getItem('token') || '';
    const { uid } = decodeToken(token);
    setId(uid);
    onSetFormState( {...formState, ...user}  )
  }

  const onDoSubmit= ( evt ) => {
    evt.preventDefault();

    update( id, formState )
    .then( (data) => {
      onSetFormState( {...formState, ...data.usuario}  )
      notify( t('profile.alerts.updated'), 'success');
    }).catch( error => {
      console.log( error );
      notify( t('profile.alerts.error'), 'error');
    })

  }

  useEffect(() => {
    onFindUser()
  }, [user])
  

  return (
    <>
      <div className="container pb-5">
        <form onSubmit={onDoSubmit}>

          <Breadcrumb className='mt-3' items={breadcrumb} />
          
          <h3 className="mt-4 text-danger"> { t('profile.form.personal') } </h3>
          <hr />

          <DatosPersonales formState={formState} onInputChange={onInputChange} />

          <h3 className="mt-5 text-danger"> { t('profile.form.basic') } </h3>
          <hr />

          <InformacionPrivada formState={formState} onInputChange={onInputChange} onRadioChange={onRadioChange}/>

          <button type='submit' className="btn btn-primary mt-3 mx-auto d-block"> { t('save') } </button>
        </form>
      </div>
    </>
  )
}
