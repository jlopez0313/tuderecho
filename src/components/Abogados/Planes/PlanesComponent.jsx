import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { decodeToken } from "react-jwt";
import { useForm } from '@/hooks/useForm';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { Add } from "./Add"
import { Plan } from "./Plan"
import { find } from '@/services/Usuarios';
import { register } from '@/store/user/UserSlice';
import styles from './Planes.module.scss';

import { useTranslation } from 'react-i18next';
import { useCharts } from '@/hooks/useCharts';
import { GIGAS } from "@/constants/constants";
import { PLANS } from '@/constants/constants';

export const PlanesComponent = () => {
  
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [chart3, setChart3] = useState(null)
  const { drawDonuts } = useCharts();

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
  const [totalStorage, setTotalStorage] = useState(0);

  const formData = {
    cuenta: 'A',
    email: '',
    name: '',
    plan: '',
  }

  const { onSetFormState, formState } = useForm(formData)

  const onFindUser = async () => {
    const token = localStorage.getItem('token') || '';
    const { uid } = decodeToken(token);
    setId(uid);

    const { usuario } = await find( uid );

    await dispatch( register( {...usuario} ) );
    onSetFormState( {...formState, ...usuario}  )

    onDrawStorage( usuario.total_storage['$numberDecimal'] || GIGAS, usuario.storage['$numberDecimal'] || 0 );
  }

  const onDrawStorage = ( total_storage, storage ) => {
    const available = (total_storage - storage) / GIGAS
    setTotalStorage( total_storage );

    const used = storage/GIGAS;
    
    const data3 = [
      { label: t('charts.storage.used'), count: used },
      { label: t('charts.storage.avaible'), count: available },
    ]

    if ( chart3 ) {
      chart3.destroy();
    }

    const chart = drawDonuts('bar3',  t('charts.storage.storage'),  total_storage/GIGAS + t('plans.gigas') , t('plans.gigas'), data3);
    setChart3( chart )
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

          <div className={`d-flex justify-content-around ${styles.canva}`}>
            <canvas id="bar3"></canvas>
          </div>

          <div className="row">
            {
              PLANS.map( (plan, idx) => {
                return <div key={idx} className="col-12 col-md-4 justify-content-around">
                  <Plan
                    selected={ formState.plan == plan.plan }
                    plan={ plan.plan }
                    title = {plan.title}
                    description = {plan.description}
                    price={plan.price}
                    formState={formState}
                    onSetFormState={onSetFormState}
                  />
                </div>
              })
            }
            <div className="col-12 col-md-4 justify-content-around">
              <div className={`card p-1 my-4`}>
                <div className="card-body">
                  <h4 className="card-title">{ t('plans.title') }</h4>
                  <div className="card-text">
                    <Add id={id} totalStorage={totalStorage} />
                  </div>
                </div>
              </div>
            </div>
          </div>          
        </form>
      </div>
    </>
  )
}
