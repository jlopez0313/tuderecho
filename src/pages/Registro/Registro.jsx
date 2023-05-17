import { Link, useNavigate, useParams } from 'react-router-dom';
import Logo from '@/assets/images/logo.png'
import { useDispatch } from 'react-redux';
import { registerAuth } from '@/store/user/thunks';
import { update } from '@/services/Usuarios';
import { useForm } from '@/hooks/useForm';
import { notify } from '@/helpers/helpers';
import { GmailLogin, FacebookLogin } from '@/firebase/auth';
import GoogleIcon from '@/assets/images/pre-registro/google.png';
import FacebookIcon from '@/assets/images/pre-registro/facebook.png';
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

export const Registro = () => {
    const { type }= useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const {name, email, password, onInputChange} = useForm({
        name: '',
        email: '',
        password: ''
    });

    const onFacebookLogin = (data) => {
        FacebookLogin()
        .then( (data) => {
            console.log( data )
            onProcessRegister( data.displayName, data.email, data.uid, data.photoURL, 'FACEBOOK' )
        }).catch( (error) => {
            console.log(error);
        })
    }

    const onGmailLogin = () => {
        GmailLogin()
        .then( (data) => {
            onProcessRegister( data.displayName, data.email, data.uid, data.photoURL, 'GMAIL' )
        }).catch( (error) => {
            console.log(error);
        })
    }

    const onDoRegiser = (evt) => {
        evt.preventDefault();
        onProcessRegister(name, email, password, '', 'WEB')
    }

    const onProcessRegister = ( name, email, password, photoUrl='', provider ) => {
        const data = dispatch( registerAuth( type, name, email, password, provider ) )
        data.then( ( user ) => {

            update( user.id, {...user, photo: photoUrl} )
            .then( (data) => {
                dispatch( register( {...data.usuario} ) )
            }).catch( error => {
                console.log( error );
                notify('Error Interno.', 'error');
            })


            notify('Bienvenido!', 'success');
            switch (user.rol) {
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
            notify(error?.response?.data?.msg || 'Internal Error onProcessRegister', 'error');
        })
    }
    
    return (
        <div className='container w-sm-25 mt-5'>
            <div className="d-block text-center mb-5">
                <Link to="/">
                    <img src={Logo} className='logo-preregistro' />
                </Link>
            </div>
            <h2 className='mb-4 text-danger fw-bold text-center'> Regístrate </h2>
            
            <div className="form">
                
                <form onSubmit={onDoRegiser}>
                    <div className="form-floating mb-3">
                        <input required name="name" onChange={onInputChange} type="text" className="form-control" id="floatingInputName" placeholder="name@example.com" />
                        <label htmlFor="floatingInputName">Nombre Completo</label>
                    </div>
                
                    <div className="form-floating mb-3">
                        <input required name="email" onChange={onInputChange} type="email" className="form-control" id="floatingInputEmail" placeholder="name@example.com" />
                        <label htmlFor="floatingInputEmail">Correo electrónico</label>
                    </div>
                    
                    <div className="form-floating mb-3">
                        <input required name="password" onChange={onInputChange} type="password" className="form-control" id="floatingInputPassword" placeholder="name@example.com" minLength={6} />
                        <label htmlFor="floatingInputPassword">Contraseña</label>
                    </div>
                    
                    <button className="btn btn-primary mx-auto d-block mt-4" type="submit">Registrarme</button>

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
                    <label htmlFor="staticEmail" className="col-form-label">Ya tienes una cuenta? &nbsp; </label>
                    <Link to="/login" replace={true}>
                        Ingresa
                    </Link>
                </div>
            </div>
        </div>
    )
}
