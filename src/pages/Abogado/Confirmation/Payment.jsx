import { Header } from "@/components/shared/Header/Header"
import styles from './Payment.module.scss'
import { Left } from "@/components/Abogados/shared/Left/Left";
import { Right } from "@/components/Abogados/shared/Right/Right";
import { notify } from '@/helpers/helpers'
import { update } from '@/services/Usuarios';

import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useEpayco } from '@/hooks/useEpayco';
import { useComunidad } from '@/hooks/useComunidad';
import { useConferencia } from "@/hooks/useConferencia";
import { useVideoteca } from "@/hooks/useVideoteca";
import { useEffect } from "react";

export const Payment = () => {

    const { t } = useTranslation();
    
    const { checkTransaction } = useEpayco();
    const [params, _] = useSearchParams();
    const navigate = useNavigate();

    const doCheckTransaction = async ( ) => {
        const data = await checkTransaction( params.get('ref_payco') );
        if ( data.x_cod_respuesta == 1 ) {
            switch ( data.x_extra3 ) {
                case 'PLAN':
                    subscribePlan( data );
                    break;
                case 'COMUN':
                    subscribeComunidad( data );
                    break;
                case 'CONFE':
                    subscribeConferencia( data );
                    break;
                case 'VIDEO':
                    subscribeVideoteca( data );
                    break;
            }
        }
    }

    const subscribeComunidad = ( data ) => {
        try {
            const { doSubscribe } = useComunidad();

            doSubscribe( data.x_extra1 )
            .then( () => {
                notify( t('comunidades.alerts.paid'), 'success')
                navigate(data.x_extra2);
            })
        } catch(error) {
            console.log( error );
            notify( t('comunidades.alerts.error'), 'error')
        }
    }

    const subscribeConferencia = ( data ) => {
        try {
            const { doSubscribe } = useConferencia();
            
            doSubscribe( data.x_extra1 )
            .then( () => {
                notify( t('conferencias.alerts.paid'), 'success')
                navigate(data.x_extra2);
            })
        } catch(error) {
            console.log( error );
            notify( t('conferencias.alerts.error'), 'error')
        }
    }

    const subscribeVideoteca = ( data ) => {
        try {
            const { doSubscribe } = useVideoteca();
            
            doSubscribe( data.x_extra1 )
            .then( () => {
                notify( t('videoteca.alerts.paid'), 'success')
                navigate(data.x_extra2);
            })
        } catch(error) {
            console.log( error );
            notify( t('videoteca.alerts.error'), 'error')
        }
    }

    const subscribePlan = ( data ) => {
        try {
            update( data.x_extra1, {plan: data.x_extra4} )
            .then( (data) => {
                notify( t('videoteca.alerts.paid'), 'success')
                navigate(data.x_extra2);
            }).catch( error => {
                console.log( error );
                notify( t('profile.alerts.error'), 'error');
            })


        } catch(error) {
            console.log( error );
            notify( t('videoteca.alerts.error'), 'error')
        }
    }

    useEffect(()=> {
        if ( params?.get('ref_payco') ) {
            doCheckTransaction();
        }
    }, [params])

    return (
        <>
            <Header />
            <div className={`${styles.abogado}`}>
            <div className={`bg-light d-flex overflow-auto pt-2 ${styles.container}`}>
                <div className={`left position-sticky p-2 ${styles.left}`}>
                <Left />
                </div>
                
                <div className={`d-flex justify-content-center flex-grow-1 p-2`}>
                </div>
                
                <div className={`right position-sticky p-2 ${styles.right}`}>
                <Right />
                </div>
            </div>
            </div>
        </>
    )
}
