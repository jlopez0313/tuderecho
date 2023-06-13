import { useEffect, useState, useRef } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Avatar from '@/assets/images/abogado/perfil/avatar.png';
import './Perfil.scss'
import { CountryDropdown } from 'react-country-region-selector';
import { notify } from '@/helpers/helpers'
import { tipoDocumentos } from '@/constants/constants';
import { all as getAll } from '@/services/Especialidades';
import { all as getTags } from '@/services/Tags';

import { useTranslation } from 'react-i18next';

const animatedComponents = makeAnimated();

export const DatosPersonales = ( { formState, onInputChange } ) => {

    const { t } = useTranslation();

    const [especialidades, setEspecialidades] = useState([])
    const [tags, setTags] = useState([])
    const [mappedTags, setMappedTags] = useState( [] )
    const [myTags, setMyTags] = useState([]);
    const image = useRef(null)

    const selectCountry = (val) => {
        const evt = { target: { name: 'perfil', value: val } }
        onInputChange( evt, 'pais' )
    }

    const onGetLists = async() => {
        setTags( await ( getTags()) || [] )
        setEspecialidades( await getAll() )

    }

    const onSetMyTags = () => {
        const myTags = tags.filter( tag => formState.perfil?.tags.includes(tag.id) )
        setMyTags(
            myTags.map( (tag) => {
                return {
                    value: tag.id,
                    label: tag.name
                }
            })
        )

        setMappedTags(
            tags.map( (tag) => {
                return {
                    value: tag.id,
                    label: tag.name
                }
            })
        )
    }

    const onPrepareTags = (
        newTags,
        actionMeta
    ) => {
        const newTagsId = newTags.map( (tag) => { return tag.value })
        const evt = { target: { name: 'perfil', value: newTagsId } }

        setMyTags( newTags.map( (tag) => { return {value: tag.value, label: tag.label} } ) )
        onInputChange( evt, 'tags' )
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
            notify( t('profile.alerts.error-image'), "error");
        };
    }

    useEffect(() => {
        onSetMyTags();
    }, [tags, formState])

    useEffect(() => {
        onGetLists();
    }, [])

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
                            value={formState.perfil?.tipoDoc}
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
                        <label htmlFor="perfil"> { t('profile.form.document') } *</label>
                    </div>
                    <div className="form-floating mb-2">
                        <input
                            type="number"
                            placeholder={ t('profile.form.id-placeholder') }
                            required
                            className="form-control"
                            name='perfil'
                            value={formState.perfil?.identificacion}
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
                            defaultValue={ formState.name }
                            onChange={onInputChange}
                        />
                        <label htmlFor="staticEmail"> { t('profile.form.name') } *</label>
                    </div>
                    <div className="form-floating mb-2">
                        <CountryDropdown
                            required
                            defaultOptionLabel={ t('profile.form.chose') }
                            classes="form-control"
                            value={formState.perfil?.pais}
                            onChange={(val) => selectCountry(val)} />
                        <label htmlFor="staticEmail"> { t('profile.form.country') } *</label>
                    </div>
                </div>
            </div>
            
            <div className="form-floating mb-3">
                <textarea
                    placeholder={ t('profile.form.biography-placeholder') }
                    className="form-control"
                    required
                    name='perfil'
                    onChange={(evt) => onInputChange(evt, 'biografia')}
                    value={formState.perfil?.biografia}
                ></textarea>
                <label htmlFor="staticEmail"> { t('profile.form.biography') } *</label>
            </div>
            
            <div className="mb-3 row">
                <div className="col-sm-6 mb-3">
                    <div className="form-floating col-sm-12">
                        <select
                            required
                            value={formState.perfil?.especialidad}
                            name='perfil'
                            onChange={(evt) => onInputChange(evt, 'especialidad')}
                            className="form-select"
                            id="floatingSelect"
                        >
                            <option value=''> { t('profile.form.chose') }</option>
                            {
                                especialidades.map( (item, key) => {
                                    return (
                                        <option key={key} value={item.id} > {item.name} </option>
                                    )
                                    
                                })
                            }
                        </select>
                        <label htmlFor="especialidad"> { t('profile.form.specialization') } *</label>
                    </div>
                </div>

                <div className="col-sm-6">
                    <div className="form-floating col-sm-12">
                        <Select
                            required
                            name='tags'
                            onChange={onPrepareTags}
                            placeholder={ t('profile.form.chose-some') }
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti
                            value={myTags}
                            options={mappedTags}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}
