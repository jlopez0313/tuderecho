import { Link, useNavigate, useParams } from 'react-router-dom';
import Logo from '@/assets/images/logo.png'
import { useDispatch } from 'react-redux';
import { registerAuth } from '@/store/user/thunks';
import { useForm } from '@/hooks/useForm';
import { notify } from '@/global/global';

export const Registro = () => {
    const { type }= useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const {name, email, password, onInputChange} = useForm({
        name: '',
        email: '',
        password: ''
    });


    const onDoRegiser = (evt: any) => {
        evt.preventDefault();
        const data = dispatch( registerAuth( type, name, email, password ) )
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
                </form>
                
                <div className="text-center mt-3">
                    <label htmlFor="staticEmail" className="col-form-label">Ya tienes una cuenta? &nbsp; </label>
                    <Link to="/login">
                        Ingresa
                    </Link>
                </div>
            </div>
        </div>
    )
}
