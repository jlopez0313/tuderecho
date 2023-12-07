import { useEffect, useState } from 'react';
import { decodeToken } from "react-jwt";
import { passwordsWithToken } from '@/services/Usuarios';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from '@/hooks/useForm';
import { notify } from '@/helpers/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from '@/assets/images/logo.png'

import bcrypt from 'bcryptjs'

import { useTranslation } from 'react-i18next';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { getTenant } from '@/helpers/helpers';

export const Passwords = () => {
  const { t } = useTranslation();
  const { settings } = useSelector(state => state.settings);

  const navigate = useNavigate()
  const [params, _] = useSearchParams();

  const [hideP2, setHideP2] = useState(false);
  const [hideP3, setHideP3] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formData = {
    token: params.get('temporary_token'),
    password1: '',
    password2: '',
  }

  const { onInputChange, onSetFormState, formState } = useForm(formData)

  const onDoSubmit = (evt) => {
    evt.preventDefault();

    if (formState.password1 !== formState.password2) {
      notify(t('passwords.alerts.error-passwords'), 'error')
    } else {
      setIsLoading(true)

      passwordsWithToken(formState)
        .then(() => {
          setIsLoading(false)
          notify(t('passwords.alerts.saved'), 'success');
          navigate('/' + getTenant() + '/login');
        }).catch(error => {
          setIsLoading(false)
          console.log(error);
          notify(t('passwords.alerts.error'), 'error');
        })
    }
  }

  return (
    <div className='container w-sm-25 mt-5'>
      <div className="d-block text-center mb-5">
        <Link to={'/' + getTenant() + "/profesionales"}>
          <img src={settings.logo} className='logo-preregistro' alt='' />
        </Link>
      </div>
      <h2 className='mb-4 text-danger fw-bold text-center'> {t('passwords.form.title')} </h2>

      <div className="form">
        <form onSubmit={onDoSubmit}>
            <div className="row">
              <div className="col-sm-12">
                <div className="mb-3">
                  <label htmlFor="staticEmail" className='form-label'> {t('passwords.form.new')} *:</label>
                  <div className="input-group">
                    <input
                      type={hideP2 ? "text" : "password"}
                      placeholder={t('passwords.form.new-placeholder')}
                      required
                      className="form-control"
                      name='password1'
                      onChange={onInputChange}
                      onCopy={(e) => e.preventDefault()}
                    />
                    <div className="input-group-text" onClick={() => { setHideP2(!hideP2) }} >
                      <FontAwesomeIcon icon={hideP2 ? faEyeSlash : faEye} />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="staticEmail" className='form-label'> {t('passwords.form.repeat')} *:</label>
                  <div className="input-group">
                    <input
                      type={hideP3 ? "text" : "password"}
                      required
                      placeholder={t('passwords.form.repeat-placeholder')}
                      className="form-control"
                      name='password2'
                      onChange={onInputChange}
                      onPaste={(e) => e.preventDefault()}
                    />
                    <div className="input-group-text" onClick={() => { setHideP3(!hideP3) }} >
                      <FontAwesomeIcon icon={hideP3 ? faEyeSlash : faEye} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          <button type='submit' className="w-100 btn btn-primary mt-3 mx-auto d-block" disabled={isLoading}>
            {
              isLoading ? t('loading') : t('save')
            }
          </button>
        </form>

      </div>
    </div>
  )
}
