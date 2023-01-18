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
      onSetFormState( {...formState, ...data.usuario, ...data.perfil}  )
    })
  }

  const onDoSubmit= ( evt) => {
    evt.preventDefault();
    dispatch( update( id, formState ) )
    notify('Perfil Actualizado.', 'success');
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
