import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { decodeToken } from "react-jwt";
import { useForm } from '@/hooks/useForm';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { Plan } from "./Plan"
import { find } from '@/services/Usuarios';
import { register } from '@/store/user/UserSlice';

import { useTranslation } from 'react-i18next';

export const PlanesComponent = () => {
  
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const breadcrumb = [
    {
        name: 'Home',
        href: '/profesionales',
        active: false
    },{
        name: t('sidemenu.profile.plan'),
        active: true
    }
  ]
  
  const [id, setId] = useState('');

  const formData = {
    cuenta: 'A',
    email: '',
    name: '',
    plan: '',
  }

  const { onInputChange, onRadioChange, onSetFormState, formState } = useForm(formData)

  const onFindUser = async () => {
    const token = localStorage.getItem('token') || '';
    const { uid } = decodeToken(token);
    setId(uid);

    const { usuario } = await find( uid );

    await dispatch( register( {...usuario} ) );
    onSetFormState( {...formState, ...usuario}  )
  }

  useEffect(() => {
    onFindUser()
  }, [])

  return (
    <>
      <div className="container pb-5">
        <form>

          <Breadcrumb className='mt-3' items={breadcrumb} />
          
          <h3 className="mt-4 text-danger"> { t('sidemenu.profile.plan') } </h3>
          <hr />

          <div className="d-flex justify-content-around">
            <Plan
              selected={ formState.plan == 1}
              plan={1}
              title = "Plan 1"
              description = "
                <ul>
                  <li> 1Gb de Almacenamiento para archivos multimedia. </li>
                </ul>
              "
              price={0}
              formState={formState}
              onSetFormState={onSetFormState}
            />
            
            <Plan
              selected={ formState.plan == 2}
              plan={2}
              title = "Plan 2"
              description = "
                <ul>
                  <li> 3Gb de Almacenamiento para archivos multimedia. </li>
                </ul>
              "
              price={20000}
              formState={formState}
              onSetFormState={onSetFormState}
            />
            
            <Plan
              selected={ formState.plan == 3}
              plan={3}
              title = "Plan 3"
              description = "
                <ul>
                  <li> 5Gb de Almacenamiento para archivos multimedia. </li>
                </ul>
              "
              price={30000}
              formState={formState}
              onSetFormState={onSetFormState}
            />

          </div>

          
        </form>
      </div>
    </>
  )
}
