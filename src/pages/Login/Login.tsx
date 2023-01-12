import { Link } from 'react-router-dom';
import Logo from '@/assets/images/logo.png'

export const Login = () => {
    
    return (
        <div className='container w-25 mt-5'>
            <div className="d-block text-center mb-5">
                <Link to="/">
                    <img src={Logo} />
                </Link>
            </div>
            <h2 className='mb-4 text-danger fw-bold text-center'> Inicia Sesión </h2>
            
            <div className="form">
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="floatingInputEmail" placeholder="name@example.com" />
                    <label htmlFor="floatingInputEmail">Correo electrónico</label>
                </div>
                
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="floatingInputPassword" placeholder="name@example.com" />
                    <label htmlFor="floatingInputPassword">Contraseña</label>
                </div>
                
                <Link to="/abogados/perfil">
                    <button className="btn btn-primary mx-auto d-block mt-4">Ingresar</button>
                </Link>

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
