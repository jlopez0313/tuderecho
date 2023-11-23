import React, { memo, useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import style from './Conferencia.module.scss';
import { format } from 'date-fns'
import 'animate.css';
import { useTranslation } from 'react-i18next';
import { decodeToken } from 'react-jwt';

export const Item = memo(({ item }) => {

    const { t } = useTranslation();

    const token = localStorage.getItem('token') || '';
    const { uid } = decodeToken(token);

    const [showPeople, setShowPeople] = useState(false);
    const [hasUser, setHasUser] = useState(false)

    const onToggleShowPeople = () => {
        setShowPeople(!showPeople)
    }

    const onFindUser = () => {
        const findUser = item.usuarios?.find( user => user.id == uid );
        setHasUser(findUser)
    }

    useEffect(() => {
        onFindUser()
    }, [item])

    return (
        <Card className={`d-flex flex-column border rounded-2 shadow-sm bg-light mb-3 ${style.listItem}`}>
            <div className={`rounded ${style.imgContent}`}
                style={{ backgroundImage: `url(${item.archivo})` }}
            >
            </div>
            <Card.Body>
                <div className='d-flex flex-column'>
                    <small className='text-uppercase d-flex'>
                        <strong className='flex-grow-1'> {item?.titulo} </strong>
                    </small>
                    <small className=''> {t('conferencias.expositor')}: {item?.conferencista} </small>
                    <small className=''> {t('conferencias.date')}: {format(new Date(item?.fecha || null), 'yyyy-MM-dd,  HH:mm a')} </small>
                    {
                        hasUser ? 
                            item?.url && <strong className=''> <a target='_blank' href={item?.url}> Click para Acceder </a> </strong> : null
                    }

                    {
                        hasUser &&  
                        <div className="mt-2 accordion" id="accordionExample">
                            <div className="accordion-item" onClick={() => onToggleShowPeople()}>
                                <h2 className="accordion-header" id="headingOne">
                                    <button className={`px-2 accordion-button ${style.accordionButton} ${showPeople? '': `collapsed ${style.collapsed}`}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        {t('people')}: &nbsp; <strong className='flex-grow-1'> {item?.usuarios?.length || 0} </strong>
                                    </button>
                                </h2>
                                <div id="collapseOne" className={`accordion-collapse collapse ${ showPeople? 'show' : ''}`} aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <ul>
                                            {item?.usuarios?.map((user, key) => {
                                                return <li key={key}> {user.name} </li>
                                            })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </Card.Body>
        </Card>
    )
})
