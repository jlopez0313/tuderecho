import React, { useEffect, useState } from 'react'
import styles from './Bolsa.module.scss'
import Spinner from 'react-bootstrap/Spinner';
import Breadcrumb from '@/components/shared/Breadcrumb';

import { useTranslation } from 'react-i18next';

export const BolsaComponent = () => {
    
    const { t } = useTranslation();

    const breadcrumb = [
        {
            name: 'Home',
            href: '/abogados',
            active: false
        },{
            name: t('bolsa.title'),
            active: true
        }
    ]

    return (
        <>
            <div className="container pb-5">
                
                <Breadcrumb className='mt-3' items={breadcrumb} />

                <h3 className="mt-4 text-danger"> { t('bolsa.title') } </h3>

            </div>
        </>
    )
}
