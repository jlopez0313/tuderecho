import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '@/assets/images/logo.png'
import { useDispatch } from 'react-redux';
import { loginAuth } from '@/store/user/thunks';
import { useForm } from '@/hooks/useForm';
import { notify } from '@/global/global';
import { GmailLogin, FacebookLogin } from '@/firebase/auth';
import GoogleIcon from '@/assets/images/pre-registro/google.png';
import FacebookIcon from '@/assets/images/pre-registro/facebook.png';
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import './Login.scss';

export const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { email, password, onInputChange} = useForm({
        name: '',
        email: '',
        password: ''
    });

    const onFacebookLogin = (data) => {
        FacebookLogin()
        .then( (data) => {
            console.log( data )
            onProcessLogin(data.email, data.uid)
        }).catch( (error) => {
            // console.log( error )
        })
    }

    const onGmailLogin = () => {
        GmailLogin()
        .then( (data) => {
            onProcessLogin( data.email, data.uid )
        }).catch( (error) => {
            // console.log( error )
        })
    }

    const onDoLogin = ( evt ) => {
        evt.preventDefault();
        onProcessLogin(email, password)
    }

    const onProcessLogin = (email, password) => {
        const data = dispatch( loginAuth( email, password ) )
        data.then( ( { rol } ) => {
            notify('Bienvenido de nuevo!', 'success');
            switch (rol) {
                case 'Abogado':
                    navigate('/abogados/perfil');
                break;
                case 'Cliente':
                    navigate('/clientes/perfil');
                break;
                case 'Admin':
                    navigate('/admin');
                break;
            }
        }).catch( (error) => {
            notify(error?.response?.data?.msg || 'Internal Error onProcessLogin', 'warning');
            navigate('/pre-registro', { replace: true });
        })
    }
    
    return (
        <div className='container w-sm-25 mt-5'>
            <div className="d-block text-center mb-5">
                <Link to="/">
                    <img src={Logo} className='logo-preregistro' />
                </Link>
            </div>
            <h2 className='mb-4 text-danger fw-bold text-center'> Inicia Sesión </h2>
            
            <div className="form">
                <form onSubmit={onDoLogin}>

                    <div className="form-floating mb-3">
                        <input required name="email" onChange={onInputChange} type="email" className="form-control" id="floatingInputEmail" placeholder="name@example.com" />
                        <label htmlFor="floatingInputEmail">Correo electrónico</label>
                    </div>
                    
                    <div className="form-floating mb-3">
                        <input required name="password" onChange={onInputChange} type="password" className="form-control" id="floatingInputPassword" placeholder="name@example.com" minLength={6} />
                        <label htmlFor="floatingInputPassword">Contraseña</label>
                    </div>
                    
                    <button type='submit' className="btn btn-primary mx-auto d-block mt-4">Ingresar</button>

                    <Link to="/recover">
                        <span className='d-block mx-auto text-center mt-3'> Olvidé mi Contraseña </span>
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
                            {
                                /*
                            <FacebookLogin
                                appId={import.meta.env.VITE_FACEBOOK_APP_ID}
                                autoLoad={false}
                                fields="name,email,picture"
                                callback={responseFacebook}
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
                    <label htmlFor="staticEmail" className="col-form-label">¿Eres nuevo con nosotros? &nbsp; </label>
                    <Link to="/pre-registro" replace={true} >
                        Regístrate
                    </Link>
                </div>
                    
            </div>
        </div>
    )
}