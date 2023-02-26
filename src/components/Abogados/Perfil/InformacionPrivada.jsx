import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { RegionDropdown } from 'react-country-region-selector'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

export const InformacionPrivada = ({ formState, onInputChange, onRadioChange }) => {
    const selectRegion = (val) => {
        const evt = { target: { name: 'perfil', value: val } }
        onInputChange( evt, 'region' )
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

    return (
        <div className="card p-3">

            <div className="mb-3 row">
                <div className="col-sm-6">
                    <div className="form-floating col-sm-12">
                        <input
                            type="text"
                            placeholder="Ej: ABC123"
                            className="form-control"
                            minLength={3}
                            name='perfil'
                            onChange={(evt) => onInputChange(evt, 'tarjeta_profesional')} 
                            value={formState.perfil.tarjeta_profesional}
                        />
                        <label htmlFor="staticEmail">Tarjeta Profesional:</label>
                    </div>
                </div>
                <div className="col-sm-6">
                    <label htmlFor="staticEmail">
                        Eres Estudiante?
                        <button className='btn' onClick={onShowAlertEstudiante}>
                            <FontAwesomeIcon icon={faQuestionCircle} />
                        </button>
                    </label>
                    <div className="form-floating col-sm-12">
                        <div className="form-check form-check-inline">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                value="S"
                                name='perfil'
                                onChange={(evt) => onRadioChange(evt, 'estudiante')}
                                checked={ formState.perfil.estudiante === 'S' }
                            />
                            <label className="form-check-label" htmlFor="inlineCheckbox1"> SI </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                value="S"
                                name='perfil'
                                onChange={(evt) => onRadioChange(evt, 'decreto176')}
                                checked={ formState.perfil.decreto176 === 'S' }
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
                            defaultOptionLabel='Selecciona una...'
                            className="form-control"
                            country={ formState.perfil.pais }
                            value={formState.perfil.region}
                            onChange={(val) => selectRegion(val)} />
                        <label htmlFor="staticEmail">Región *</label>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-floating col-sm-12">
                        <input
                            type="text"
                            placeholder="Ej: Cali"
                            required
                            name="perfil"
                            className="form-control"
                            value={formState.perfil.ciudad}
                            onChange={(evt) => onInputChange(evt, 'ciudad')}
                        />
                        <label htmlFor="staticEmail">Ciudad *</label>
                    </div>
                </div>
            </div>
            <div className="mb-3 row">
                <div className="col-sm-6 mb-3">
                    <div className="form-floating col-sm-12">
                        <span className="form-control"> {formState.email} </span>
                        <label htmlFor="staticEmail">Correo *</label>
                    </div>
                </div>
                <div className="form-floating col-sm-6">
                    <input
                        type="number"
                        placeholder="Ej: 12345679"
                        required  
                        className="form-control"
                        name="perfil"
                        value={formState.perfil.telefono}
                        onChange={(evt) => onInputChange(evt, 'telefono')}
                    />
                    <label htmlFor="staticEmail">Teléfono *</label>
                </div>
            </div>
            <div className="my-4 row ms-2">
                <div className="form-check form-switch align-items-center d-flex">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        name="perfil"
                        onChange={(evt) => onRadioChange(evt, 'cuenta')}
                        value='I'
                        checked={ formState.perfil.cuenta === 'I' }
                    />
                    <label className="form-check-label ms-2" htmlFor="flexSwitchCheckDefault">Desactivar Cuenta temporalmente</label>
                </div>
            </div>
        </div>
    )
}
