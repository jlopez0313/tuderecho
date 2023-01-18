import { Link } from 'react-router-dom';
import Logo from '@/assets/images/logo.png'
import Cliente from '@/assets/images/pre-registro/cliente.png';
import Abogado from '@/assets/images/pre-registro/abogado.png';
import './PreRegistro.scss';

export const PreRegistro = () => {
  return (
    <div className='container pt-7 text-center pb-5'>
        <div className="d-block text-center mb-3">
            <Link to="/">
                <img src={Logo}  className='logo-preregistro'/>
            </Link>
        </div>
        <h2 className='mb-5 text-danger fw-bold'> Regístrate </h2>

        <div className="row container">
            <div className="col-sm-2"></div>
            <div className="col-sm-4 text-center mt-4">
                <Link to="/registro/Cliente">
                    <button className='type btn btn-light border shadow'>
                        <img src={Cliente} className="d-block mx-auto mb-4" />
                        <span> Soy cliente </span>
                    </button>
                </Link>
            </div>
            <div className="col-sm-4 text-center mt-4">
                <Link to="/registro/Abogado">
                    <button className='type btn btn-light border shadow'>
                        <img src={Abogado} className="d-block mx-auto mb-4" />
                        <span> Soy abogado </span>
                    </button>
                </Link>
            </div>
            <div className="col-sm-2"></div>
        </div>
    </div>
    
  )
}
