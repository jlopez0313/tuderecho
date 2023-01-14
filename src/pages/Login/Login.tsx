import { Link, useNavigate } from 'react-router-dom';
import Logo from '@/assets/images/logo.png'
import { useDispatch } from 'react-redux';
import { loginAuth } from '@/store/user/thunks';
import { useForm } from '@/hooks/useForm';
import { notify } from '@/global/global';

export const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { email, password, onInputChange} = useForm({
        name: '',
        email: '',
        password: ''
    });


    const onDoLogin = ( evt: any ) => {
        evt.preventDefault();

        const data = dispatch( loginAuth( email, password ) )
        data.then( () => {
            navigate('/abogados/perfil');
        }).catch( (error: any) => {
            notify(error?.response?.data?.msg, 'error');
        })
    }
    
    return (
        <div className='container w-25 mt-5'>
            <div className="d-block text-center mb-5">
                <Link to="/">
                    <img src={Logo} />
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
                </form>
                    
                <Link to="/pre-registro">
                    <span className='d-block mx-auto text-center mt-4'> Olvidé mi Contraseña </span>
                </Link>
                
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
