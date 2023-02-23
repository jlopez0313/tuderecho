import { Link, useNavigate } from 'react-router-dom';
import Logo from '@/assets/images/logo.png'
import { useDispatch } from 'react-redux';
import { recovery } from '@/store/user/thunks';
import { useForm } from '@/hooks/useForm';
import { notify } from '@/helpers/helpers';

export const Recover = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { email, onInputChange} = useForm({
        email: ''
    });

    const onDoLogin = ( evt ) => {
        evt.preventDefault();
        const data = dispatch( recovery( email ) )
        data.then( () => {
            notify('Hemos enviado un correo a tu cuenta!', 'success');
            navigate('/login');
        }).catch( (error) => {
            notify(error?.response?.data?.msg || 'Internal Error onProcessLogin', 'warning');
        })
    }
    
    return (
        <div className='container w-sm-25 mt-5'>
            <div className="d-block text-center mb-5">
                <Link to="/">
                    <img src={Logo} className='logo-preregistro' />
                </Link>
            </div>
            <h2 className='mb-4 text-danger fw-bold text-center'> Cambiar Contraseña </h2>
            
            <div className="form">
                <form onSubmit={onDoLogin}>

                    <div className="form-floating mb-3">
                        <input required name="email" onChange={onInputChange} type="email" className="form-control" id="floatingInputEmail" placeholder="name@example.com" />
                        <label htmlFor="floatingInputEmail">Correo electrónico</label>
                    </div>
                    
                    
                    <button type='submit' className="btn btn-primary mx-auto d-block mt-4">Enviar</button>

                    <div className="text-center mt-3">
                        <label htmlFor="staticEmail" className="col-form-label">Ya tienes una cuenta? &nbsp; </label>
                        <Link to="/login" replace={true}>
                            Ingresa
                        </Link>
                    </div>

                    <div className="text-center mt-3">
                        <label htmlFor="staticEmail" className="col-form-label">¿Eres nuevo con nosotros? &nbsp; </label>
                        <Link to="/pre-registro" replace={true} >
                            Regístrate
                        </Link>
                    </div>

                </form>
                    
            </div>
        </div>
    )
}
