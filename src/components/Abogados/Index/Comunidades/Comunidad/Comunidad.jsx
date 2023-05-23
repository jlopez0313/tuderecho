import React, { useEffect, useState } from 'react'

import styles from './Comunidad.module.scss';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { useParams } from 'react-router-dom';
import { find } from '@/services/Comunidades';
import Spinner from 'react-bootstrap/esm/Spinner';
import { Main } from '../../Publicaciones/Main';


const breadcrumb = [
    {
        name: 'Home',
        href: '/abogados',
        active: false
    },{
        name: 'Comunidades',
        href: '/abogados/comunidades',
    }
]

export const ComunidadComponent = () => {

    const params = useParams();
    const [comunidad,  setComunidad] = useState({});
    const [isLoading, setIsLoading] = useState(false)

    const getComunidad = async () => {
        setIsLoading(true);
        
        const { comunidad } = await find( params.id )

        breadcrumb[2] = {
            name: comunidad.titulo,
            active: true
        }

        setComunidad( comunidad );
        setIsLoading(false);
    }

    useEffect( () => {
        getComunidad();
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
