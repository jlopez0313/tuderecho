import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '@/assets/images/logo.png'
import { useDispatch } from 'react-redux';
import { loginAuth } from '@/store/user/thunks';
import { useForm } from '@/hooks/useForm';
import { notify } from '@/global/global';
import { GmailLogin } from '@/firebase/auth';
import GoogleButon from '@/assets/images/pre-registro/google-signin-button.png';
import FacebookButon from '@/assets/images/pre-registro/login-with-facebook.png';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

export const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { email, password, onInputChange} = useForm({
        name: '',
        email: '',
        password: ''
    });

    const responseFacebook = (data) => {
        onProcessLogin(data.email, data.id)
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
            notify(error?.response?.data?.msg, 'error');
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

                    <Link to="/pre-registro">
                        <span className='d-block mx-auto text-center mt-3'> Olvidé mi Contraseña </span>
                    </Link>

                    <div className="row mt-4">
                        <div className="col">
                            <img className='cursor-pointer' src={GoogleButon} alt="" style={{width: '100%'}} onClick={() => onGmailLogin() } />
                        </div>
                        <div className="col">                            
                            <FacebookLogin
                                appId="6449671321727781"
                                autoLoad={false}
                                fields="name,email,picture"
                                callback={responseFacebook}
                                render={(renderProps) => (
                                    <img className='cursor-pointer' src={FacebookButon} alt="" style={{width: '100%'}} onClick={renderProps.onClick}/>
                                )}
                            />
                        </div>
                    </div>

                </form>
                    
                <div className="text-center mt-3">
                    <label htmlFor="staticEmail" className="col-form-label">¿Eres nuevo con nosotros? &nbsp; </label>
                    <Link to="/pre-registro">
                        Regístrate
                    </Link>
                </div>
                    
            </div>
        </div>
    )
}
