import { Link } from 'react-router-dom';
import Logo from '@/assets/images/logo.png'
import Cliente from '@/assets/images/pre-registro/cliente.png';
import Abogado from '@/assets/images/pre-registro/abogado.png';
import './PreRegistro.scss';

import { useTranslation } from 'react-i18next';

export const PreRegistro = () => {
    
    const { t } = useTranslation();

    return (
        <div className='container pt-7 text-center pb-5'>
            <div className="d-block text-center mb-3">
                <Link to="/">
                    <img src={Logo}  className='logo-preregistro'/>
                </Link>
            </div>
            <h2 className='mb-5 text-danger fw-bold'> { t('register.title') } </h2>

            <div className="row container m-0">
                <div className="col-sm-2"></div>
                <div className="col-sm-4 text-center mt-4">
                    <Link to="/registro/Cliente" replace={true} >
                        <button className='type btn btn-light border shadow'>
                            <img src={Cliente} className="d-block mx-auto mb-4" />
                            <span> { t('register.client') } </span>
                        </button>
                    </Link>
                </div>
                <div className="col-sm-4 text-center mt-4">
                    <Link to="/registro/Abogado" replace={true} >
                        <button className='type btn btn-light border shadow'>
                            <img src={Abogado} className="d-block mx-auto mb-4" />
                            <span> { t('register.lawyer') } </span>
                        </button>
                    </Link>
                </div>
                <div className="col-sm-2"></div>
            </div>

            <div className="text-center mt-5">
                <label htmlFor="staticEmail" className="col-form-label"> { t('login.form.registered') } &nbsp; </label>
                <Link to="/login" replace >
                    { t('login.form.login') }
                </Link>
            </div>
        </div>
    )
}
