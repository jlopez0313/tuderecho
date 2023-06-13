import { useEffect, useState } from 'react';
import { decodeToken } from "react-jwt";
import { find, passwords } from '@/services/Usuarios';
import { Header } from "@/components/shared/Header/Header"
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '@/hooks/useForm';
import { notify } from '@/helpers/helpers';
import { register } from '@/store/user/UserSlice';

import bcrypt from 'bcryptjs'

import { useTranslation } from 'react-i18next';

export const PasswordsComponent = () => {

    const { t } = useTranslation();

    // const [perfil, setPerfil] = useState({ tags: [] });
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
        const { uid } = decodeToken(token);
        find( uid )
        .then( (data) => {
            dispatch( register( data.usuario ) )
            // setPerfil( data.perfil );
            onSetFormState( {...formState, email: data.usuario.email }  )
        })
    }

    const onDoSubmit= ( evt ) => {
        evt.preventDefault();
        
        const passwowrdValid = bcrypt.compareSync(formState.password, user.password)

        if( !passwowrdValid || formState.password1 !== formState.password2 ) {
            notify( t('passwords.alerts.error-passwords'), 'error')
        } else {
            passwords( formState )
            .then( () => {
                onFind();
                notify( t('passwords.alerts.saved'), 'success');
            }).catch( error => {
                console.log( error );
                notify( t('passwords.alerts.error'), 'error');
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
            
                <h3 className="mt-5 text-danger"> { t('passwords.form.title') } </h3>
                <hr />

                <div className="card p-3 my-4">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="form-floating mb-2">
                                <input
                                    type="password"
                                    required
                                    placeholder={ t('passwords.form.current-placeholder') }
                                    className="form-control"
                                    name='password'
                                    onChange={onInputChange}
                                />
                                <label htmlFor="staticEmail"> { t('passwords.form.current') } *:</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input
                                    type="password"
                                    placeholder={ t('passwords.form.new-placeholder') }
                                    required
                                    className="form-control"
                                    name='password1'
                                    onChange={onInputChange}
                                    onCopy={(e) => e.preventDefault()}
                                />
                                <label htmlFor="staticEmail"> { t('passwords.form.new') } *:</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input
                                    type="password"
                                    required
                                    placeholder={ t('passwords.form.repeat-placeholder') }
                                    className="form-control"
                                    name='password2'
                                    onChange={onInputChange}
                                    onPaste={(e) => e.preventDefault()}
                                />
                                <label htmlFor="staticEmail">{ t('passwords.form.repeat') } *:</label>
                            </div>
                        </div>
                    </div>
                </div>

                <button type='submit' className="btn btn-primary mt-3 mx-auto d-block"> { t('save') } </button>
            </form>
        </div>
        </>
    )
}
