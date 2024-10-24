import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '@/assets/images/logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { loginAuth } from '@/store/user/thunks';
import { useForm } from '@/hooks/useForm';
import { notify } from '@/helpers/helpers';
import { GmailLogin, FacebookLogin } from '@/firebase/auth';
import GoogleIcon from '@/assets/images/pre-registro/google.png';
import FacebookIcon from '@/assets/images/pre-registro/facebook.png';
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import './Login.scss';

import { useTranslation } from 'react-i18next';
import { getTenant } from '@/helpers/helpers';

export const Login = () => {

    const { t } = useTranslation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState( false )
    const { settings } = useSelector(state => state.settings);

    const { email, password, onInputChange} = useForm({
        name: '',
        email: '',
        password: ''
    });

    const onFacebookLogin = (data) => {
        setIsLoading( true )
        FacebookLogin()
        .then( (data) => {
            setIsLoading( false )
            onProcessLogin(data.email, data.uid)
        }).catch( (error) => {
            setIsLoading( false )
            console.log( error )
        })
    }

    const onGmailLogin = () => {
        setIsLoading( true )
        GmailLogin()
        .then( (data) => {
            setIsLoading( false )
            onProcessLogin( data.email, data.uid )
        }).catch( (error) => {
            setIsLoading( false )
            console.log( error )
        })
    }

    const onDoLogin = ( evt ) => {
        evt.preventDefault();
        onProcessLogin(email, password)
    }

    const onProcessLogin = (email, password) => {
        setIsLoading( true )

        const data = dispatch( loginAuth( email, password ) )
        data.then( ( { rol } ) => {

            setIsLoading( false )
            notify( t('login.alerts.welcome'), 'success');

            const lastPath = localStorage.getItem('lastPath')

            switch (rol) {
                case 'Profesional':
                    if ( lastPath && lastPath.toLowerCase().includes( rol.toLowerCase() ) ) {
                        navigate(lastPath || '/profesionales', {
                            replace: true
                        });
                    } else {
                        navigate('/profesionales', {
                            replace: true
                        });
                    }
                break;
                case 'Cliente':
                    if ( lastPath && lastPath.toLowerCase().includes( rol.toLowerCase() ) ) {
                        navigate(lastPath || '/clientes', {
                            replace: true
                        });
                    } else {
                        navigate('/clientes', {
                            replace: true
                        });
                    }
                break;
                case 'Admin':
                    navigate('/admin', {
                        replace: true
                    });
                break;
            }
        }).catch( (error) => {

            setIsLoading( false )
            notify(error?.response?.data?.msg || t('login.alerts.error'), 'warning');

            error.response?.status == 400 && navigate('/pre-registro', { replace: true });
        })
    }
    
    return (
        <div className='container w-sm-25 mt-5'>
            <div className="d-block text-center mb-5">
                <Link to={'/'}>
                    <img src={settings.logo} className='logo-preregistro' alt=''/>
                </Link>
            </div>
            <h2 className='mb-4 text-danger fw-bold text-center'> { t('login.title') } </h2>
            
            <div className="form">
                <form onSubmit={onDoLogin}>

                    <div className="form-floating mb-3">
                        <input required name="email" onChange={onInputChange} type="email" className="form-control" id="floatingInputEmail" placeholder={ t('login.form.email-placeholder') } />
                        <label htmlFor="floatingInputEmail"> { t('login.form.email') } </label>
                    </div>
                    
                    <div className="form-floating mb-3">
                        <input required name="password" onChange={onInputChange} type="password" className="form-control" id="floatingInputPassword" placeholder={ t('login.form.password-placeholder') } minLength={6} />
                        <label htmlFor="floatingInputPassword"> { t('login.form.password') } </label>
                    </div>
                    
                    <button type='submit' className="btn btn-primary mx-auto d-block mt-4 w-100" disabled={isLoading}>
                        { 
                            isLoading ? t('loading') : t('login.form.login')
                        } 
                    </button>

                    <Link to={'/recover'}>
                        <span className='d-block mx-auto text-center mt-3'> { t('login.form.forgot') } </span>
                    </Link>

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
                        </div>
                    </div>

                </form>
                    
                <div className="text-center mt-3">
                    <label htmlFor="staticEmail" className="col-form-label"> { t('login.form.new') } &nbsp; </label>
                    <Link to={'/pre-registro'} replace={true} >
                        { t('login.form.register') }
                    </Link>
                </div>
                    
            </div>
        </div>
    )
}
