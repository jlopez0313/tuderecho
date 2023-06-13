import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';

import styles from './Comunidad.module.scss';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { useParams } from 'react-router-dom';
import { find } from '@/services/Comunidades';
import Spinner from 'react-bootstrap/esm/Spinner';
import { Main } from '../../Publicaciones/Main';

import { useTranslation } from 'react-i18next';

export const ComunidadComponent = () => {

    const { t } = useTranslation();

    const [breadcrumb, setBreadcrumb] = useState([
        {
            name: 'Home',
            href: '/abogados',
            active: false
        },{
            name: t('comunidades.title'),
            href: '/abogados/comunidades',
        }
    ])

    const params = useParams();
    const [comunidad,  setComunidad] = useState({});
    const [isLoading, setIsLoading] = useState(false)

    const getComunidad = async () => {
        setIsLoading(true);
        
        const { comunidad } = await find( params.id )

        setBreadcrumb(list => [...list, {
            name: comunidad.titulo,
            active: true
        }])

        setComunidad( comunidad );
        setIsLoading(false);
    }

    useEffect( () => {
        getComunidad();
    }, [params])

    return (
        <div className={`main ${styles.main}`}>
            <Breadcrumb className='' items={breadcrumb} />
            {
                isLoading
                ? 
                    <div className="text-center mt-5">
                        <Spinner animation="grow" />
                    </div>
                : 
                <>
                    <div className={`d-flex justify-content-center flex-grow-1 p-2 ${styles.main}`}>
                        <Main comunidad={ comunidad.id } />
                    </div>

                </>
            }
        </div>
    )
}
