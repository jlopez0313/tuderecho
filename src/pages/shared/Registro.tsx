import { Link } from 'react-router-dom';
import Logo from '@/assets/images/logo.png'

export const Registro = () => {
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
                    Registro de Usuarios
                </h5>
                <div className="form">
                    <div className="mb-3 row">
                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Nombre completo:</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Correo electrónico:</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                        </div>
                    </div>

                    <div className="mb-3 form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Soy Abogado
                        </label>
                    </div>
                    <div className="mb-3 form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                            Soy Cliente
                        </label>
                    </div>
                    
                    <Link to="/abogados/perfil">
                        <button type="button" className="btn btn-primary">Ingresar</button>
                    </Link>
                    
                    <div className="text-center">
                        <label htmlFor="staticEmail" className="col-form-label">Ya tienes una cuenta? &nbsp; </label>
                        <Link to="/login">
                            Ingresa
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </>
    
  )
}
