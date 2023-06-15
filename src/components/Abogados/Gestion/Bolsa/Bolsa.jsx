import React, { useEffect, useState } from 'react'
import styles from './Bolsa.module.scss'
import Spinner from 'react-bootstrap/Spinner';
import Breadcrumb from '@/components/shared/Breadcrumb';

import { useTranslation } from 'react-i18next';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { ComunidadesComponent } from './Comunidades/Comunidades';
import { ConferenciasComponent } from './Conferencias/Conferencias';
import { VideotecaComponent } from './Videoteca/Videoteca';

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

    const [activeTab, setActiveTab] = useState('comunidades')

    const onSelect = ( evt ) => {
        setActiveTab( evt );
    }

    return (
        <>
            <div className="container pb-5">
                
                <Breadcrumb className='mt-3' items={breadcrumb} />

                <h3 className="mt-4 text-danger"> { t('bolsa.title') } </h3>

                <Tabs
                    id="justify-tab-example"
                    className="mb-3"
                    justify
                    unmountOnExit={true}
                    onSelect={(evt) => onSelect(evt) }
                >
                    <Tab eventKey="comunidades" title={ t('comunidades.my-list') }>
                        <ComunidadesComponent />
                    </Tab>
                    <Tab eventKey="conferencias" title={ t('conferencias.my-list') }>
                        <ConferenciasComponent />
                    </Tab>
                    <Tab eventKey="videoteca" title={ t('videoteca.my-list') }>
                        <VideotecaComponent />
                    </Tab>
                </Tabs>

            </div>
        </>
    )
}
