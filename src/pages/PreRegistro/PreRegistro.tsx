import { Link } from 'react-router-dom';
import Logo from '@/assets/images/logo.png'
import Cliente from '@/assets/images/pre-registro/cliente.png';
import Abogado from '@/assets/images/pre-registro/abogado.png';
import './PreRegistro.scss';

export const PreRegistro = () => {
  return (
    <div className='container pt-7 text-center'>
        <div className="d-block text-center mb-5">
            <Link to="/">
                <img src={Logo} />
            </Link>
        </div>
        <h2 className='mb-5 text-danger fw-bold'> Regístrate </h2>

        <div className="row container">
            <div className="col-2"></div>
            <div className="col-4 text-center">
                <Link to="/registro/cliente">
                    <button className='type btn btn-light border shadow'>
                        <img src={Cliente} className="d-block mx-auto mb-4" />
                        <span> Soy cliente </span>
                    </button>
                </Link>
            </div>
            <div className="col-4 text-center">
                <Link to="/registro/abogado">
                    <button className='type btn btn-light border shadow'>
                        <img src={Abogado} className="d-block mx-auto mb-4" />
                        <span> Soy abogado </span>
                    </button>
                </Link>
            </div>
            <div className="col-2"></div>
        </div>
    </div>
    
  )
}
