import React, { useState } from 'react'
import styles from './Main.module.scss';
import Breadcrumb from '@/components/shared/Breadcrumb';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { decodeToken } from 'react-jwt';
import { Lista } from './Lista/Lista';

import { useTranslation } from 'react-i18next';

export const Main = () => {

    const { t } = useTranslation();

    const breadcrumb = [
        {
            name: 'Home',
            href: '/abogados',
            active: false
        },{
            name: t('comunidades.title'),
            active: true
        }
    ]

  
    const token = localStorage.getItem('token') || '';
    const { uid } = decodeToken(token);

    const [activeTab, setActiveTab] = useState('home')

    const onSelect = ( evt ) => {
        setActiveTab( evt );
    }

    return (
        <div className={`${styles.main}`}>
            <Breadcrumb className='mt-3' items={breadcrumb} />

            <Tabs
                id="justify-tab-example"
                className="mb-3"
                justify
                unmountOnExit={true}
                activeKey={ activeTab }
                onSelect={(evt) => onSelect(evt) }
            >
                <Tab eventKey="home" title={ t('comunidades.discover') }>
                    <Lista uid={ null } onChangeTab={(tab) => onSelect(tab)} />
                </Tab>
                <Tab eventKey="profile" title={ t('comunidades.my-list') }>
                    <Lista uid={ uid } onChangeTab={(tab) => onSelect(tab)}/>
                </Tab>
            </Tabs>
        </div>
    )
}
