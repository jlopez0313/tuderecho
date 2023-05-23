import React, { useState } from 'react'
import styles from './Main.module.scss';
import Breadcrumb from '@/components/shared/Breadcrumb';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { decodeToken } from 'react-jwt';
import { Lista } from './Lista/Lista';

const breadcrumb = [
    {
        name: 'Home',
        href: '/abogados',
        active: false
    },{
        name: 'Comunidades',
        active: true
    }
]

export const Main = () => {  
  
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
                onSelect={(evt) => onSelect(evt) }
            >
                <Tab eventKey="home" title="Descubrir">
                    <Lista uid={ null } />
                </Tab>
                <Tab eventKey="profile" title="Mis Comunidades">
                    <Lista uid={ uid }/>
                </Tab>
            </Tabs>
        </div>
    )
}
