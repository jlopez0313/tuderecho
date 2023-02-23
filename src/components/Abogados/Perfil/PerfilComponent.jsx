import { useEffect, useState } from 'react';
import { Header } from "@/components/shared/Header/Header"
import { DatosPersonales } from "./DatosPersonales"
import { InformacionPrivada } from "./InformacionPrivada"
import { useDispatch } from 'react-redux';
import { decodeToken } from "react-jwt";
import { find, update } from '@/store/user/thunks';
import { register } from '@/store/user/UserSlice';
import { useForm } from '@/hooks/useForm';
import { notify } from '@/helpers/helpers';

export const PerfilComponent = () => {
  const dispatch = useDispatch();
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
  
    const resp = dispatch( find( uid ) );
    resp.then( (data) => {
      dispatch( register( {...data.usuario} ) )
      onSetFormState( {...formState, ...data.usuario}  )
    })
    
  }

  const onDoSubmit= ( evt ) => {
    evt.preventDefault();

    const resp = dispatch( update( id, formState ) )
    resp.then( (data) => {
      onSetFormState( {...formState, ...data.usuario}  )
      notify('Perfil Actualizado.', 'success');
    }).catch( error => {
      console.log( error );
      notify('Error Interno.', 'error');
    })

  }

  useEffect(() => {
    onFindUser()
  }, [])
  

  return (
    <>
      <Header />
      <div className="container pb-5">
        <form onSubmit={onDoSubmit}>
          
          <h3 className="mt-5 text-danger"> Información Personal </h3>
          <hr />

          <DatosPersonales formState={formState} onInputChange={onInputChange} />

          <h3 className="mt-5 text-danger"> Información Privada (Verificaremos tus Datos)</h3>
          <hr />

          <InformacionPrivada formState={formState} onInputChange={onInputChange} onRadioChange={onRadioChange}/>

          <button type='submit' className="btn btn-primary mt-3 mx-auto d-block"> Guardar </button>
        </form>
      </div>
    </>
  )
}
