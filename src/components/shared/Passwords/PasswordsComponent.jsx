import { useEffect, useState } from 'react';
import { decodeToken } from "react-jwt";
import { passwords } from '@/services/Usuarios';
import { Header } from "@/components/shared/Header/Header"
import { useSelector } from 'react-redux';
import { useForm } from '@/hooks/useForm';
import { notify } from '@/helpers/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import bcrypt from 'bcryptjs'

import { useTranslation } from 'react-i18next';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export const PasswordsComponent = () => {

    const { t } = useTranslation();

    const [hideP1, setHideP1] = useState( false );
    const [hideP2, setHideP2] = useState( false );
    const [hideP3, setHideP3] = useState( false );
    const [isLoading, setIsLoading] = useState( false )


    const { user } = useSelector( (state) => state.user );

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
        onSetFormState( {...formState, email: user.email }  )
    }

    const onDoSubmit= ( evt ) => {
        evt.preventDefault();

        if( formState.password1 !== formState.password2 ) {
            notify( t('passwords.alerts.error-passwords'), 'error')
        } else {
            setIsLoading( true )

            passwords( formState )
            .then( () => {
                onFind();
                setIsLoading( false )
                notify( t('passwords.alerts.saved'), 'success');
            }).catch( error => {
                setIsLoading( false )
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
                            <div className="mb-3">
                                <label htmlFor="staticEmail" className='form-label'> { t('passwords.form.current') } *:</label>
                                <div className="input-group">
                                    <input
                                        type={ hideP1 ? "text" : "password"}
                                        required
                                        placeholder={ t('passwords.form.current-placeholder') }
                                        className="form-control"
                                        name='password'
                                        onChange={onInputChange}
                                    />
                                    <div className="input-group-text"  onClick={() => { setHideP1( !hideP1 ) }} >
                                        <FontAwesomeIcon icon={ hideP1 ? faEyeSlash : faEye }/>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="staticEmail" className='form-label'> { t('passwords.form.new') } *:</label>
                                <div className="input-group">
                                    <input
                                        type={ hideP2 ? "text" : "password"}
                                        placeholder={ t('passwords.form.new-placeholder') }
                                        required
                                        className="form-control"
                                        name='password1'
                                        onChange={onInputChange}
                                        onCopy={(e) => e.preventDefault()}
                                    />
                                    <div className="input-group-text"  onClick={() => { setHideP2( !hideP2 ) }} >
                                        <FontAwesomeIcon icon={ hideP2 ? faEyeSlash : faEye }/>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="staticEmail" className='form-label'> { t('passwords.form.repeat') } *:</label>
                                <div className="input-group">
                                    <input
                                        type={ hideP3 ? "text" : "password"}
                                        required
                                        placeholder={ t('passwords.form.repeat-placeholder') }
                                        className="form-control"
                                        name='password2'
                                        onChange={onInputChange}
                                        onPaste={(e) => e.preventDefault()}
                                    />
                                    <div className="input-group-text"  onClick={() => { setHideP3( !hideP3 ) }} >
                                        <FontAwesomeIcon icon={ hideP3 ? faEyeSlash : faEye }/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button type='submit' className="btn btn-primary mt-3 mx-auto d-block" disabled={isLoading}> 
                    {
                        isLoading ? t('loading') : t('save')
                    }
                </button>
            </form>
        </div>
        </>
    )
}
