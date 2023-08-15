import { Link, useNavigate } from 'react-router-dom';
import Logo from '@/assets/images/logo.png'
import { recovery } from '@/services/Usuarios';
import { useForm } from '@/hooks/useForm';
import { notify } from '@/helpers/helpers';

import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export const Recover = () => {

    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState( false )

    const navigate = useNavigate()

    const { email, onInputChange} = useForm({
        email: ''
    });

    const onDoLogin = ( evt ) => {
        evt.preventDefault();
        
        setIsLoading( true )

        recovery( email )
        .then( () => {
            setIsLoading( false )
            notify( t('passwords.messages.sent') , 'success');
            navigate('/login');
        }).catch( (error) => {
            setIsLoading( false )
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
            <h2 className='mb-4 text-danger fw-bold text-center'> { t('passwords.form.title') } </h2>
            
            <div className="form">
                <form onSubmit={onDoLogin}>

                    <div className="form-floating mb-3">
                        <input required name="email" onChange={onInputChange} type="email" className="form-control" id="floatingInputEmail" placeholder="name@example.com" />
                        <label htmlFor="floatingInputEmail"> { t('passwords.form.email') } </label>
                    </div>
                    
                    
                    <button type='submit' className="btn btn-primary mx-auto d-block mt-4 w-100" disabled={isLoading}> 
                        { 
                            isLoading ? t('loading') : t('passwords.form.send')
                        }
                    </button>

                    <div className="text-center mt-3">
                        <label htmlFor="staticEmail" className="col-form-label"> { t('login.form.registered') }  &nbsp; </label>
                        <Link to="/login" replace={true}>
                            { t('login.form.login') }
                        </Link>
                    </div>

                    <div className="text-center mt-3">
                        <label htmlFor="staticEmail" className="col-form-label">{ t('login.form.new') } &nbsp; </label>
                        <Link to="/pre-registro" replace={true} >
                            { t('login.form.register') }
                        </Link>
                    </div>

                </form>
                    
            </div>
        </div>
    )
}
