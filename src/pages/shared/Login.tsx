import { Link } from 'react-router-dom';
import Logo from '@/assets/images/logo.png'

export const Login = () => {
  return (
    <>
        <div className='row'>
            <div className="col text-center">
                <Link to="/">
                    <img src={Logo} />
                </Link>
            </div>
        </div>
        <div className="card mb-5">
            <div className="card-body">
                <h5 className="card-title">
                    Iniciar Sesión
                </h5>
                <div className="form">
                    <div className="mb-3 row">
                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Usuario:</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Contraseña:</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                        </div>
                    </div>
                    <button type="button" className="btn btn-primary">
                        <Link to="/admin" className='text-white'>
                            Ingresar
                        </Link>
                    </button>
                    
                    <div className="text-center">
                        <Link to="/registro">
                            Olvidé mi Contraseña
                        </Link>
                    </div>
                    <div className="text-center">
                        <label htmlFor="staticEmail" className="col-form-label">¿Nuevo con Nosotros? &nbsp; </label>
                        <Link to="/registro">
                            Regístrate
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </>
    
  )
}
