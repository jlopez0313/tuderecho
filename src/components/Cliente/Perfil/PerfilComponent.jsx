import { useEffect, useState } from 'react';
import { Header } from "@/components/shared/Header/Header"
import { DatosPersonales } from "./DatosPersonales"
import { useDispatch, useSelector } from 'react-redux';
import { decodeToken } from "react-jwt";
import { find, update } from '@/store/user/thunks';
import { register } from '@/store/user/UserSlice';
import { useForm } from '@/hooks/useForm';
import { notify } from '@/global/global';

export const PerfilComponent = () => {
  const [id, setId] = useState('');
  const { user } = useSelector( (state) => state.user );
  const dispatch = useDispatch();

  const formData = {
    especialidad: null,
    tipoDoc: '',
    identificacion: '',
    name: '',
    pais: '',
    region: '',
    ciudad: '',
    email: '',
    telefono: '',
    cuenta: 'A',
    estudiante: '',
    decreto176: '',
    photo: '',
    oldImage: '',
    tags: []
  }

  const { onInputChange, onRadioChange, onSetFormState, formState } = useForm(formData)

  const onFind = () => {
    const token = localStorage.getItem('token') || '';
    const { uid: id }= decodeToken(token);
    setId( id );

    const resp = dispatch( find( id ) );
    resp.then( (data) => {
      dispatch( register( data.usuario ) )
      onSetFormState( {...formState, ...data.usuario, oldImage: data.oldImage, ...data.perfil}  )
    })
  }

  const onDoSubmit= ( evt) => {
    evt.preventDefault();
    const resp = dispatch( update( id, formState ) )
    resp.then( (data) => {
      onSetFormState( {...formState, ...data.usuario, oldImage: data.oldImage, ...data.perfil}  )
      notify('Perfil Actualizado.', 'success');
    }).catch( error => {
      console.log( error );
      notify('Error Interno.', 'error');
    })
  }

  useEffect(() => {
    onFind()
  }, [])
  

  return (
    <>
      <Header />
      <div className="container pb-5">
        <form onSubmit={onDoSubmit}>
          
          <h3 className="mt-5 text-danger"> Información Personal </h3>
          <hr />

          <DatosPersonales user={user} formState={formState} onInputChange={onInputChange} onRadioChange={onRadioChange} />

          <button type='submit' className="btn btn-primary mt-3 mx-auto d-block"> Guardar </button>
        </form>
      </div>
    </>
  )
}
