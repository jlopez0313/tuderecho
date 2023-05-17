import { useEffect, useState } from 'react';
import { DatosPersonales } from "./DatosPersonales"
import { useDispatch } from 'react-redux';
import { decodeToken } from "react-jwt";
import { find, update } from '@/services/Usuarios';
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

    find( uid )
    .then( (data) => {
      dispatch( register( {...data.usuario} ) )
      onSetFormState( {...formState, ...data.usuario}  )
    })

  }

  const onDoSubmit= ( evt ) => {
    evt.preventDefault();

    update( id, formState )
    .then( (data) => {
      onSetFormState( {...formState, ...data.usuario}  )
      dispatch( register( {...data.usuario} ) )
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
      <div className="container pb-5">
        <form onSubmit={onDoSubmit}>
          
          <h3 className="mt-5 text-danger"> Información Personal </h3>
          <hr />

          <DatosPersonales formState={formState} onInputChange={onInputChange} onRadioChange={onRadioChange} />

          <button type='submit' className="btn btn-primary mt-3 mx-auto d-block"> Guardar </button>
        </form>
      </div>
    </>
  )
}
