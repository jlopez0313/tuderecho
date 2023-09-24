import React, { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

export const Filter = ({ onFilter }) => {

    const { t } = useTranslation();

    const filtros = [
        {
          key: 1,
          value: t('filters.labels.mine')
        },
        {
          key: 2,
          value: t('filters.labels.others')
        },
        {
          key: 3,
          value: t('filters.labels.all')
        },
    ]

    const [filter, setFilter] = useState( t('filters.labels.all') )
    const [showFilter, setShowFilter] = useState( false )

    const onDoFilter = ( filter ) => {
        setFilter( filter.value );
        onSetShowFilter();
        onFilter( filter.key || 3 );
    }

    const onSetShowFilter = () => {
        setShowFilter( !showFilter )
    }

    return (
        <nav className="navbar navbar-expand-lg p-0">
            <div className="container-fluid">
                <ul className="navbar-nav me-auto p-0">
                    <li className="nav-item dropdown">
                        <span className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => { onSetShowFilter() }}>
                            { t('filters.filter') }: { filter }
                        </span>
                        <ul className={`dropdown-menu ${showFilter ? 'show':''}`}>
                            {
                                filtros.map( (item, idx) => {
                                    return <li key={ idx }> <span className="dropdown-item" onClick={() => onDoFilter(item)}> { item.value } </span> </li>
                                })
                            }
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
