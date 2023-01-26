import { useEffect, useState } from 'react';
import { Header } from "@/components/shared/Header/Header"
import { DatosPersonales } from "./DatosPersonales"
import { InformacionPrivada } from "./InformacionPrivada"
import { useDispatch, useSelector } from 'react-redux';
import { decodeToken } from "react-jwt";
import { find, update } from '@/store/user/thunks';
import { register } from '@/store/user/UserSlice';
import { useForm } from '@/hooks/useForm';
import { notify } from '@/global/global';

export const PerfilComponent = () => {
  const [id, setId] = useState('');
  const [perfil, setPerfil] = useState({ tags: [] });
  const { user } = useSelector( (state) => state.user );
  const dispatch = useDispatch();

  const formData = {
    especialidad: '',
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
    const { uid: id } = decodeToken(token);
    setId( id );

    const resp = dispatch( find( id ) );
    resp.then( (data) => {
      dispatch( register( data.usuario ) )
      setPerfil( data.perfil );
      onSetFormState( {...formState, ...data.usuario, ...data.perfil, oldImage: data.oldImage, tags: data.perfil?.tags.map((tag) => tag._id)}  )
    })
  }

  const onDoSubmit= ( evt ) => {
    evt.preventDefault();
    const resp = dispatch( update( id, formState ) )
    resp.then( (data) => {
      onSetFormState( {...formState, ...data.usuario, ...data.perfil, oldImage: data.oldImage, tags: data.perfil?.tags.map((tag) => tag._id)}  )
      notify('Perfil Actualizado.', 'success');
    }).catch( error => {
      console.log( error );
      notify('Error Interno.', 'error');
    })
  }

  useEffect(() => {
    // setSelectedTags( formState.tags )
  }, [formState])

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

          <DatosPersonales user={user} formState={formState} currentTags={perfil?.tags || [] } onInputChange={onInputChange} />

          <h3 className="mt-5 text-danger"> Información Privada (Verificaremos tus Datos)</h3>
          <hr />

          <InformacionPrivada user={user} formState={formState} onInputChange={onInputChange} onRadioChange={onRadioChange}/>

          <button type='submit' className="btn btn-primary mt-3 mx-auto d-block"> Guardar </button>
        </form>
      </div>
    </>
  )
}
