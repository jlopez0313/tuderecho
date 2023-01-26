import { useEffect, useState, useRef } from 'react';
import makeAnimated from 'react-select/animated';

import Avatar from '@/assets/images/abogado/perfil/avatar.png';
import './Perfil.scss'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

const animatedComponents = makeAnimated();

export const DatosPersonales = ({ user, formState, onInputChange, onRadioChange }) => {
    const [profilePic, setProfilePic] = useState( Avatar );

    const [country, setCountry] = useState('')
    const [region, setRegion] = useState( '' )
    const image = useRef(null)

    const selectCountry = (val) => {
        setCountry( val );
        const evt = { target: { name: 'pais', value: val } }
        console.log( );
        onInputChange( evt )
        setRegion( val );
    }

    const selectRegion = (val) => {
        setRegion( val );
        const evt = { target: { name: 'region', value: val } }
        onInputChange( evt )
    }

    const onClickImage = () => {
        image.current?.click()
    }

    const onUploadImage = ( evt ) => {
        const reader = new FileReader();
        reader.readAsDataURL(evt.target.files[0]);
        reader.onload = function(event) {
            setProfilePic( event.target.result )
            const myEvent = { target: { name: 'photo', value: event.target.result }}
            onInputChange(myEvent )
        };
            reader.onerror = function() {
            notify("No se pudo cargar la imágen", "error");
        };
    }

    useEffect(() => {
        setCountry( formState.pais );
        setRegion( formState.region );
        setProfilePic( formState.photo || Avatar )
    }, [formState])

    return (
        <div className="card p-3 my-4">
            
            <div className="row">
                <div className="col-sm-3 mb-3 text-center">
                    <div className="avatar-container m-auto d-flex justify-content-center align-items-center cursor-pointer" onClick={onClickImage}>
                        <img src={profilePic} alt="" className='avatar'/>
                        <input type='file' accept='image/png, image/jpeg' className='d-none' ref={image} onChange={onUploadImage} />
                    </div>
                </div>
                <div className="col-sm-9">
                    <div className="form-floating mb-2">
                        <select
                            required
                            value={formState.tipoDoc}
                            name='tipoDoc'
                            onChange={onInputChange}
                            className="form-select"
                            id="floatingSelect"
                        >
                            <option value=''>Selecciona uno...</option>
                            <option value='CC'>Cédula de Ciudadanía</option>
                            <option value='CE'>Cédula de Extranjería</option>
                            <option value='TI'>Tarjeta de Identidad</option>
                            <option value='PA'>Pasaporte</option>
                            <option value='ID'>ID</option>
                            
                        </select>
                        <label htmlFor="especialidad">Tipo de Documento *:</label>
                    </div>
                    <div className="form-floating mb-2">
                        <input
                            type="number"
                            placeholder='Ej: 123456789'
                            required
                            name='identificacion'
                            defaultValue={formState.identificacion}
                            className="form-control"
                            onChange={onInputChange}
                        />
                        <label htmlFor="staticEmail">Identificación *:</label>
                    </div>
                    <div className="form-floating mb-2">
                        <input
                            type="text"
                            required
                            className="form-control"
                            placeholder="Nombre"
                            name='name'
                            defaultValue={ user.name }
                            onChange={onInputChange}
                        />
                        <label htmlFor="staticEmail">Nombre Completo *:</label>
                    </div>
                    <div className="form-floating mb-2">
                        <CountryDropdown
                            required
                            defaultOptionLabel="Selecciona uno..."
                            classes="form-control"
                            value={country}
                            onChange={(val) => selectCountry(val)} />
                        <label htmlFor="staticEmail">Pais *:</label>
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
                                country={ country }
                                value={region}
                                onChange={(val) => selectRegion(val)} />
                            <label htmlFor="staticEmail">Región *:</label>
                    </div>
                </div>

                <div className="col-sm-6">
                    <div className="form-floating col-sm-12">
                        <input
                            type="text"
                            required
                            className="form-control"
                            placeholder="Ej: Cali"
                            name="ciudad"
                            defaultValue={formState.ciudad}
                            onChange={onInputChange}
                        />
                        <label htmlFor="staticEmail">Ciudad *:</label>
                    </div>
                </div>
            </div>

            <div className="mb-3 row">
                <div className="col-sm-6 mb-3">
                    <div className="form-floating col-sm-12">
                        <span className="form-control"> {user.email} </span>
                        <label htmlFor="staticEmail">Correo *:</label>
                    </div>
                </div>
                <div className="form-floating col-sm-6">
                    <input
                        type="number"
                        placeholder="Ej: 12345679"
                        required
                        className="form-control"
                        name="telefono"
                        defaultValue={formState.telefono}
                        onChange={onInputChange}
                    />
                    <label htmlFor="staticEmail">Teléfono  *:</label>
                </div>
            </div>
            
            <div className="form-floating mb-3">
                <textarea
                    className="form-control"
                    placeholder='Cuéntanos sobre tí'
                    required
                    name='biografia'
                    onChange={onInputChange}
                    defaultValue={formState.biografia}
                ></textarea>
                <label htmlFor="staticEmail">Biografía *:</label>
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
