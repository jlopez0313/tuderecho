import { useEffect, useState } from 'react';
import { numberFormat } from '@/helpers/numbers';
import { useDispatch } from 'react-redux';
import { update } from '@/services/Usuarios';
import { notify } from '@/helpers/helpers';
import { register } from '@/store/user/UserSlice';
import { useEpayco } from '@/hooks/useEpayco';

import './Planes.scss'

import { useTranslation } from 'react-i18next';

export const Plan = ( { selected, title, plan, description, price, formState, onSetFormState } ) => {

    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const { doEpayco } = useEpayco();

    const onSetPlan = () => {
        if (price != 0 ) {
            const item = {
                titulo: title,
                precio: price,
                id: formState.id,
                extra: plan
            }
            doEpayco( item, '/planes', 'PLAN' )
        }
        else 
            onSubmit()
    }

    const onSubmit = () => {
        setIsLoading( true )
        update( formState.id, {...formState, plan} )
        .then( (data) => {
          setIsLoading( false )
    
          onSetFormState( {...formState, ...data.usuario}  )
    
          dispatch( register( {...data.usuario} ) );
          notify( t('profile.alerts.updated'), 'success');
          
        }).catch( error => {
          setIsLoading( false )
          
          console.log( error );
          notify( t('profile.alerts.error'), 'error');
        })
      }

    const { t } = useTranslation();

    return (
        <div className={`card p-3 my-4 mx-2 ${ selected ? 'bg-danger' : ''}`}>
            <div className="card-body">
                <h2 className="card-title"> {title} </h2>
                <div className="card-text" dangerouslySetInnerHTML={{__html: description}}>
                </div>
                <button 
                    type='button'
                    className="btn btn-primary mt-3 mx-auto d-block"
                    disabled={isLoading}
                    onClick={() => onSetPlan()}
                > 
                {
                    isLoading ? t('loading') : 
                        price == 0 ? t('free') : `$ ${ numberFormat(price) }`
                }
                </button>
            </div>
        </div>
    )
}
