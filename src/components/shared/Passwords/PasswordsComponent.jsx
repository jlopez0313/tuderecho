import { useEffect, useState } from 'react';
import { decodeToken } from "react-jwt";
import { find, passwords } from '@/store/user/thunks';
import { Header } from "@/components/shared/Header/Header"
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '@/hooks/useForm';
import { notify } from '@/helpers/helpers';
import { register } from '@/store/user/UserSlice';

import bcrypt from 'bcryptjs'

export const PasswordsComponent = () => {

    const [id, setId] = useState('');
    const [perfil, setPerfil] = useState({ tags: [] });
    const { user } = useSelector( (state) => state.user );
    const dispatch = useDispatch();

    const formData = {
        email: '',
        password: '',
        password1: '',
        password2: '',
    }
    
    const { onInputChange, onSetFormState, formState } = useForm(formData)

    const onFind = () => {
        const token = localStorage.getItem('token') || '';
        const { uid: id } = decodeToken(token);
        setId( id );
    
        const resp = dispatch( find( id ) );
        resp.then( (data) => {
            dispatch( register( data.usuario ) )
            setPerfil( data.perfil );
            onSetFormState( {...formState, email: data.usuario.email }  )
        })
    }

    const onDoSubmit= ( evt ) => {
        evt.preventDefault();
        
        const passwowrdValid = bcrypt.compareSync(formState.password, user.password)

        if( !passwowrdValid ) {
            notify('Tu contraseña actual no coincide', 'error')
        } else if( formState.password1 !== formState.password2 ) {
            notify('Tu nueva contraseña no coincide', 'error')
        } else {
            const resp = dispatch( passwords( formState ) )
            resp.then( () => {
                onFind();
                notify('Contraseña Actualizada.', 'success');
            }).catch( error => {
                console.log( error );
                notify('Error Interno.', 'error');
            })
        }
    }

    useEffect(() => {
        onFind()
    }, [])

    return (
        <>
        
        <div className="container pb-5">
            <form onSubmit={onDoSubmit}>
            
                <h3 className="mt-5 text-danger"> Cambiar Contraseña </h3>
                <hr />

                <div className="card p-3 my-4">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="form-floating mb-2">
                                <input
                                    type="password"
                                    required
                                    placeholder="Ej: ABC123"
                                    className="form-control"
                                    name='password'
                                    onChange={onInputChange}
                                />
                                <label htmlFor="staticEmail"> Contraseña Actual *:</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input
                                    type="password"
                                    placeholder='Ej: ABC456'
                                    required
                                    className="form-control"
                                    name='password1'
                                    onChange={onInputChange}
                                    onCopy={(e) => e.preventDefault()}
                                />
                                <label htmlFor="staticEmail">Nueva Contraseña *:</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input
                                    type="password"
                                    required
                                    placeholder="Ej: ABC456"
                                    className="form-control"
                                    name='password2'
                                    onChange={onInputChange}
                                    onPaste={(e) => e.preventDefault()}
                                />
                                <label htmlFor="staticEmail">Repetir Contraseña *:</label>
                            </div>
                        </div>
                    </div>
                </div>

                <button type='submit' className="btn btn-primary mt-3 mx-auto d-block"> Guardar </button>
            </form>
        </div>
        </>
    )
}
