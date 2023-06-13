import React, { useEffect, useState } from 'react'

import styles from './Conferencia.module.scss';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { useParams } from 'react-router-dom';
import { find } from '@/services/Conferencias';
import Spinner from 'react-bootstrap/esm/Spinner';
import { Main } from '../../Publicaciones/Main';

import { useTranslation } from 'react-i18next';

export const ConferenciaComponent = () => {

    const { t } = useTranslation();

    const breadcrumb = [
        {
            name: 'Home',
            href: '/abogados',
            active: false
        },{
            name: t('conferencias.title'),
            href: '/abogados/conferencias',
        }
    ]

    const params = useParams();
    const [conferencia,  setConferencia] = useState({});
    const [isLoading, setIsLoading] = useState(false)

    const getConferencia = async () => {
        setIsLoading(true);
        
        const { conferencia } = await find( params.id )

        breadcrumb[2] = {
            name: conferencia.titulo,
            active: true
        }

        setConferencia( conferencia );
        setIsLoading(false);
    }

    useEffect( () => {
        getConferencia();
    }, [params])

    return (
        <div className={`${styles.main}`}>
            <Breadcrumb className='mt-3' items={breadcrumb} />
            {
                isLoading
                ? 
                    <div className="text-center mt-5">
                        <Spinner animation="grow" />
                    </div>
                : <Main />
            }
        </div>
    )
}
