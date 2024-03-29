import { useRef } from 'react';
import Avatar from '@/assets/images/abogado/perfil/avatar.png';
import './Perfil.scss'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { tipoDocumentos } from '@/constants/constants';

import { useTranslation } from 'react-i18next';

export const DatosPersonales = ({ formState, onInputChange, onRadioChange }) => {

    const { t } = useTranslation();

    const image = useRef(null)

    const selectCountry = (val) => {
        const evt = { target: { name: 'perfil', value: val } }
        onInputChange( evt, 'pais' )
    }

    const selectRegion = (val) => {
        const evt = { target: { name: 'perfil', value: val } }
        onInputChange( evt, 'region' )
    }

    const onClickImage = () => {
        image.current?.click()
    }

    const onUploadImage = ( evt ) => {

        const reader = new FileReader();
        reader.readAsDataURL(evt.target.files[0]);
        reader.onload = function(event) {
            const myEvent = { target: { name: 'perfil', value: event.target.result }}
            onInputChange( myEvent, 'photo' )
        };
            reader.onerror = function() {
            notify("No se pudo cargar la imágen", "error");
        };
    }

    return (
        <div className="card p-3 my-4">
            
            <div className="row">
                <div className="col-sm-3 mb-3 text-center">
                    <div className="avatar-container m-auto d-flex justify-content-center align-items-center cursor-pointer" onClick={onClickImage}>
                        <img src={formState.perfil?.photo || Avatar} alt='' className='avatar'/>
                        <input type='file' accept='image/png, image/jpeg' className='d-none' ref={image} onChange={onUploadImage} />
                    </div>
                </div>
                <div className="col-sm-9">
                    <div className="form-floating mb-2">
                        <select
                            required
                            className="form-select"
                            name='perfil'
                            value={formState.perfil?.tipoDoc || ''}
                            onChange={(evt) => onInputChange(evt, 'tipoDoc')}
                            id="floatingSelect"
                        >
                            <option value=''> { t('profile.form.chose') } </option>
                            {
                                tipoDocumentos.map( (tipo, key) => {
                                    return <option value={tipo.key} key={key}>{tipo.value}</option>
                                })
                            }
                        </select>
                        <label htmlFor="especialidad"> { t('profile.form.document') } *</label>
                    </div>
                    <div className="form-floating mb-2">
                        <input
                            type="number"
                            placeholder={ t('profile.form.id-placeholder') }
                            required
                            className="form-control"
                            name='perfil'
                            defaultValue={formState.perfil?.identificacion || ''}
                            onChange={(evt) => onInputChange(evt, 'identificacion')}
                        />
                        <label htmlFor="staticEmail"> { t('profile.form.id') } *</label>
                    </div>
                    <div className="form-floating mb-2">
                        <input
                            type="text"
                            required
                            placeholder={ t('profile.form.name-placeholder') }
                            className="form-control"
                            name='name'
                            value={ formState.name }
                            onChange={onInputChange}
                        />
                        <label htmlFor="staticEmail"> { t('profile.form.name') } *</label>
                    </div>
                    <div className="form-floating mb-2">
                        <CountryDropdown
                            required
                            defaultOptionLabel={ t('profile.form.chose') }
                            classes="form-control"
                            value={formState.perfil?.pais || ''}
                            onChange={(val) => selectCountry(val)} />
                        <label htmlFor="staticEmail"> { t('profile.form.country') } *</label>
                    </div>
                </div>
            </div>
            
            <div className="mb-3 row">
                <div className="col-sm-6 mb-3">
                    <div className="form-floating col-sm-12">
                        <RegionDropdown
                                required
                                defaultOptionLabel={ t('profile.form.chose') }
                                className="form-control"
                                country={ formState.perfil?.pais  || ''}
                                value={ formState.perfil?.region  || ''}
                                onChange={(val) => selectRegion(val)} />
                            <label htmlFor="staticEmail"> { t('profile.form.region') } *</label>
                    </div>
                </div>

                <div className="col-sm-6">
                    <div className="form-floating col-sm-12">
                        <input
                            type="text"
                            required
                            className="form-control"
                            placeholder={ t('profile.form.city-placeholder') }
                            name="perfil"
                            defaultValue={formState.perfil?.ciudad || ''}
                            onChange={(evt) => onInputChange(evt, 'ciudad')}
                        />
                        <label htmlFor="staticEmail">{ t('profile.form.city') } *</label>
                    </div>
                </div>
            </div>

            <div className="mb-3 row">
                <div className="col-sm-6 mb-3">
                    <div className="form-floating col-sm-12">
                        <span className="form-control"> {formState.email} </span>
                        <label htmlFor="staticEmail"> { t('profile.form.email') } *</label>
                    </div>
                </div>
                <div className="form-floating col-sm-6">
                    <input
                        type="number"
                        placeholder="Ej: 12345679"
                        required
                        className="form-control"
                        name="perfil"
                        defaultValue={formState.perfil?.telefono || ''}
                        onChange={(evt) => onInputChange(evt, 'telefono')}
                    />
                    <label htmlFor="staticEmail"> { t('profile.form.phone') } *</label>
                </div>
            </div>
            
            <div className="form-floating mb-3">
                <textarea
                    className="form-control"
                    placeholder='Cuéntanos sobre tí'
                    required
                    name='perfil'
                    onChange={(evt) => onInputChange(evt, 'biografia')}
                    value={formState.perfil?.biografia || ''}
                ></textarea>
                <label htmlFor="staticEmail"> { t('profile.form.biography') } *</label>
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
                        checked={ formState.perfil && formState.perfil.cuenta === 'I' }
                    />
                    <label className="form-check-label ms-2" htmlFor="flexSwitchCheckDefault">  { t('profile.form.inactive') }</label>
                </div>
            </div>

        </div>
    )
}
