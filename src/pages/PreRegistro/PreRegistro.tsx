import { Link } from 'react-router-dom';
import Logo from '@/assets/images/logo.png'
import Cliente from '@/assets/images/pre-registro/cliente.png';
import Abogado from '@/assets/images/pre-registro/abogado.png';
import { getTenant } from '@/helpers/helpers';
import './PreRegistro.scss';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

export const PreRegistro = () => {
    
    const { t } = useTranslation();
    const { settings } = useSelector(state => state.settings);

    return (
        <div className='container pt-7 text-center pb-5'>
            <div className="d-block text-center mb-3">
                <Link to={'/' + getTenant() + "/"}>
                    <img src={settings.logo}  className='logo-preregistro' alt=''/>
                </Link>
            </div>
            <h2 className='mb-5 text-danger fw-bold'> { t('register.title') } </h2>

            <div className="row container m-0">
                <div className="col-sm-2"></div>
                <div className="col-sm-4 text-center mt-4">
                    <Link to={'/' + getTenant() + "/registro/Cliente"} replace={true} >
                        <button className='type btn btn-light border shadow'>
                            <img src={Cliente} className="d-block mx-auto mb-4" alt=''/>
                            <span> { t('register.client') } </span>
                        </button>
                    </Link>
                </div>
                <div className="col-sm-4 text-center mt-4">
                    <Link to={'/' + getTenant() + "/registro/Profesional"} replace={true} >
                        <button className='type btn btn-light border shadow'>
                            <img src={settings.heroe} className="d-block mx-auto mb-4" alt=''/>
                            <span> { t('register.lawyer') } </span>
                        </button>
                    </Link>
                </div>
                <div className="col-sm-2"></div>
            </div>

            <div className="text-center mt-5">
                <label htmlFor="staticEmail" className="col-form-label"> { t('login.form.registered') } &nbsp; </label>
                <Link to={'/' + getTenant() + "/login"} replace >
                    { t('login.form.login') }
                </Link>
            </div>
        </div>
    )
}
