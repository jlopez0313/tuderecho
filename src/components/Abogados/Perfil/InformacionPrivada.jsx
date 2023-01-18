import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { RegionDropdown } from 'react-country-region-selector'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

export const InformacionPrivada = ({ user, formState, onInputChange, onRadioChange }) => {
    const [country, setCountry] = useState( '' )
    const [region, setRegion] = useState( '' )

    const selectRegion = (val) => {
        setRegion( val );
        const evt = { target: { name: 'region', value: val } }
        onInputChange( evt )
    }

    const onShowAlertEstudiante = () => {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            icon: 'question',
            confirmButtonColor: 'red',
            html: `<p>Si aún eres estudiante
                puedes acceder a nuestra red
                de abogados pero no recibirás 
                solicitudes de atención. A No ser
                que seas decreto 176. </p>`,
        })
    }

    useEffect( () => {
        setCountry( formState.pais );
        setRegion( formState.region );
    }, [formState])

    return (
        <div className="card p-3">

            <div className="mb-3 row">
                <div className="col-sm-6">
                    <div className="form-floating col-sm-12">
                        <input
                            type="text"
                            className="form-control"
                            minLength={7}
                            name='tarjeta_profesional'
                            onChange={onInputChange} 
                            placeholder="Tarjeta Profesional"
                            defaultValue={formState.tarjeta_profesional}
                        />
                        <label htmlFor="staticEmail">Tarjeta Profesional:</label>
                    </div>
                </div>
                <div className="col-sm-6">
                    <label htmlFor="staticEmail">
                        Estudiante: 
                        <button className='btn' onClick={onShowAlertEstudiante}>
                            <FontAwesomeIcon icon={faQuestionCircle} />
                        </button>
                    </label>
                    <div className="form-floating col-sm-12">
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value="S"
                                name='estudiante'
                                onChange={onRadioChange}
                                checked={ formState.estudiante === 'S' }
                            />
                            <label className="form-check-label" htmlFor="inlineCheckbox1"> SI </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value="S"
                                name='decreto176'
                                onChange={onRadioChange}
                                checked={ formState.decreto176 === 'S' }
                            />
                            <label className="form-check-label" htmlFor="inlineCheckbox2"> Estudiante de Derecho - licencia temporal (Decreto 176 de 1971) </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-3 row">
                <div className="col-sm-6 mb-3">
                    <div className="form-floating col-sm-12">
                        <RegionDropdown
                            required
                            defaultOptionLabel='Selecciona...'
                            className="form-control"
                            country={ country }
                            value={region}
                            onChange={(val) => selectRegion(val)} />
                        <label htmlFor="staticEmail">Región:</label>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-floating col-sm-12">
                        <input type="text" required className="form-control" placeholder="Ciudad" name="ciudad" defaultValue={formState.ciudad} onChange={onInputChange} />
                        <label htmlFor="staticEmail">Ciudad:</label>
                    </div>
                </div>
            </div>
            <div className="mb-3 row">
                <div className="col-sm-6 mb-3">
                    <div className="form-floating col-sm-12">
                        <span className="form-control"> {user.email} </span>
                        <label htmlFor="staticEmail">Correo:</label>
                    </div>
                </div>
                <div className="form-floating col-sm-6">
                    <input type="number"required  className="form-control"placeholder="Teléfono" name="telefono" defaultValue={formState.telefono} onChange={onInputChange} />
                    <label htmlFor="staticEmail">Teléfono:</label>
                </div>
            </div>
            <div className="my-4 row ms-2">
                <div className="form-check form-switch align-items-center d-flex">
                    <input className="form-check-input" type="checkbox" role="switch" name="cuenta" onChange={onRadioChange} value='I' checked={ formState.cuenta === 'I' } />
                    <label className="form-check-label ms-2" htmlFor="flexSwitchCheckDefault">Desactivar Cuenta temporalmente</label>
                </div>
            </div>
        </div>
    )
}
