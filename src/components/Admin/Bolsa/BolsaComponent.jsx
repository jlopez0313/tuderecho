import React, { useState } from 'react'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Breadcrumb from '@/components/shared/Breadcrumb';

import { ComunidadesComponent } from './Comunidades/Comunidades';
import { ConferenciasComponent } from './Conferencias/Conferencias';
import { VideotecaComponent } from './Videoteca/Videoteca';

const breadcrumb = [
    {
        name: 'Home',
        href: '/admin',
        active: false
    },{
        name: 'Usuarios',
        href: '/admin/usuarios',
        active: false
    },{
        name: 'Bolsa',
        active: true
    }
]

export const BolsaComponent = () => {

    const [activeTab, setActiveTab] = useState('comunidades')

    const onSelect = ( evt ) => {
        setActiveTab( evt );
    }

    return (
        <div className="w-100 p-4 overflow-auto">
            <h1 className="mb-4"> Bolsa </h1>
            <Breadcrumb items={breadcrumb} />

            <Tabs
                id="justify-tab-example"
                className="mb-3"
                justify
                unmountOnExit={true}
                onSelect={(evt) => onSelect(evt) }
            >
                <Tab eventKey="comunidades" title="Comunidades">
                    <ComunidadesComponent />
                </Tab>
                <Tab eventKey="conferencias" title="Conferencias">
                    <ConferenciasComponent />
                </Tab>
                <Tab eventKey="videoteca" title="Videoteca">
                    <VideotecaComponent />
                </Tab>
            </Tabs>

        </div>
    )
}
