import { Link, useNavigate, useParams } from 'react-router-dom';
import Logo from '@/assets/images/logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { registerAuth } from '@/store/user/thunks';
import { update } from '@/services/Usuarios';
import { useForm } from '@/hooks/useForm';
import { notify } from '@/helpers/helpers';
import { GmailLogin, FacebookLogin } from '@/firebase/auth';
import GoogleIcon from '@/assets/images/pre-registro/google.png';
import FacebookIcon from '@/assets/images/pre-registro/facebook.png';
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { register } from '@/store/user/UserSlice';
import { getTenant } from '@/helpers/helpers';

export const Registro = () => {
    
    const { t } = useTranslation();

    const { type }= useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState( false )
    const { settings } = useSelector(state => state.settings);

    const {name, email, password, onInputChange} = useForm({
        name: '',
        email: '',
        password: ''
    });

    const onFacebookLogin = (data) => {
        setIsLoading( true )

        FacebookLogin()
        .then( (data) => {
            setIsLoading( false )
            console.log( data )
            onProcessRegister( data.displayName, data.email, data.uid, data.photoURL, 'FACEBOOK' )
        }).catch( (error) => {
            setIsLoading( false )
            console.log(error);
        })
    }

    const onGmailLogin = () => {
        setIsLoading( true )

        GmailLogin()
        .then( (data) => {
            setIsLoading( false )
            onProcessRegister( data.displayName, data.email, data.uid, data.photoURL, 'GMAIL' )
        }).catch( (error) => {
            setIsLoading( false )
            console.log(error);
        })
    }

    const onDoRegiser = (evt) => {
        evt.preventDefault();
        onProcessRegister(name, email, password, '', 'WEB')
    }

    const onProcessRegister = ( name, email, password, photoUrl='', provider ) => {
        setIsLoading( true )

        const data = dispatch( registerAuth( type, name, email, password, provider ) )
        data.then( ( user ) => {

            update( user.id, {...user, photo: photoUrl} )
            .then( (data) => {
                setIsLoading( false )
                dispatch( register( {...data.usuario} ) )
            }).catch( error => {
                setIsLoading( false )
                console.log( error );
                notify('Error Interno.', 'error');
            })


            notify('Bienvenido!', 'success');
            switch (user.rol) {
                case 'Profesional':
                    navigate('/profesionales/perfil');
                break;
                case 'Cliente':
                    navigate('/clientes/perfil');
                break;
                case 'Admin':
                    navigate('/admin');
                break;
            }
        }).catch( (error) => {
            setIsLoading( false )
            notify(error?.response?.data?.msg || 'Internal Error onProcessRegister', 'error');
        })
    }
    
    return (
        <div className='container w-sm-25 mt-5'>
            <div className="d-block text-center mb-5">
                <Link to={'/'}>
                    <img src={settings.logo} className='logo-preregistro' alt=''/>
                </Link>
            </div>
            <h2 className='mb-4 text-danger fw-bold text-center'> { t('register.title') } </h2>
            
            <div className="form">
                
                <form onSubmit={onDoRegiser}>
                    <div className="form-floating mb-3">
                        <input required name="name" onChange={onInputChange} type="text" className="form-control" id="floatingInputName" placeholder={ t('register.form.name-placeholder') } />
                        <label htmlFor="floatingInputName"> { t('register.form.name') } </label>
                    </div>
                
                    <div className="form-floating mb-3">
                        <input required name="email" onChange={onInputChange} type="email" className="form-control" id="floatingInputEmail" placeholder={ t('register.form.email-placeholder') }  />
                        <label htmlFor="floatingInputEmail"> { t('register.form.email') } </label>
                    </div>
                    
                    <div className="form-floating mb-3">
                        <input required name="password" onChange={onInputChange} type="password" className="form-control" id="floatingInputPassword" placeholder={ t('register.form.password-placeholder') } minLength={6} />
                        <label htmlFor="floatingInputPassword"> { t('register.form.password') } </label>
                    </div>
                    
                    <button className="btn btn-primary mx-auto d-block mt-4 w-100" type="submit" disabled={isLoading}>
                        {
                            isLoading ? t('loading') : t('register.form.save')
                        }
                    </button>

                    <div className="row mt-4">
                        <div className="col">
                            <button type="button" className="btn btn-outline-danger login-btn w-100" onClick={() => onGmailLogin() } >
                                <img className='cursor-pointer me-2' src={GoogleIcon} style={{maxWidth: '24px'}} alt=""/>
                                Google
                            </button>
                        </div>
                        <div className="col">
                            <button type="button" className="btn btn-outline-primary login-btn  w-100"  onClick={() => onFacebookLogin() }>
                                <img className='cursor-pointer me-2' src={FacebookIcon} alt="" style={{maxWidth: '24px'}}/>
                                Facebook
                            </button>
                            {
                            /*
                            <FacebookLogin
                                appId={import.meta.env.VITE_FACEBOOK_APP_ID}
                                autoLoad={false}
                                fields="name,email,picture"
                                callback={onFacebookLogin}
                                render={(renderProps) => (
                                    <button type="button" className="btn btn-outline-primary login-btn  w-100"  onClick={renderProps.onClick}>
                                        <img className='cursor-pointer me-2' src={FacebookIcon} alt="" style={{maxWidth: '24px'}}/>
                                        Facebook
                                    </button>
                                )}
                            />   
                            */
                            }
                        </div>
                    </div>
                    
                </form>
                
                <div className="text-center mt-3">
                    <label htmlFor="staticEmail" className="col-form-label"> { t('login.form.registered') } &nbsp; </label>
                    <Link to={'/login'} replace={true}>
                        { t('login.form.login') }
                    </Link>
                </div>
            </div>
        </div>
    )
}
