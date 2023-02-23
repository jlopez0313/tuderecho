import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import Avatar from '@/assets/images/abogado/perfil/avatar.png';
import './Perfil.scss'
import { list as getEspecialidades } from '@/store/especialidades/thunks';
import { list as getAllTags } from '@/store/tags/thunks';
import { CountryDropdown } from 'react-country-region-selector';
import { notify } from '@/helpers/helpers'
import { tipoDocumentos } from '@/constants/constants';

const animatedComponents = makeAnimated();

export const DatosPersonales = ( { formState, onInputChange } ) => {

    const {especialidades} = useSelector( (state) => state.especialidad)
    const {tags} = useSelector( (state) => state.tag)

    const [allTags, setAllTags] = useState( [] )
    const [myTags, setMyTags] = useState([]);
    const image = useRef(null)

    const dispatch = useDispatch();

    const selectCountry = (val) => {
        const evt = { target: { name: 'perfil', value: val } }
        onInputChange( evt, 'pais' )
    }

    const onGetLists = () => {
        dispatch(getEspecialidades())
        dispatch(getAllTags())
    }

    const onSetMyTags = () => {
        const myTags = tags.filter( tag => formState.perfil.tags.includes(tag.id) )
        setMyTags(
            myTags.map( (tag) => {
                return {
                    value: tag.id,
                    label: tag.name
                }
            })
        )

        setAllTags(
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
            notify("No se pudo cargar la imágen", "error");
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
                        <img src={formState.perfil.photo || Avatar} alt='' className='avatar'/>
                        <input type='file' accept='image/png, image/jpeg' className='d-none' ref={image} onChange={onUploadImage} />
                    </div>
                </div>
                <div className="col-sm-9">
                    <div className="form-floating mb-2">
                        <select
                            required
                            className="form-select"
                            name='perfil'
                            value={formState.perfil.tipoDoc}
                            onChange={(evt) => onInputChange(evt, 'tipoDoc')}
                            id="floatingSelect"
                        >
                            <option value=''>Selecciona uno...</option>
                            {
                                tipoDocumentos.map( (tipo, key) => {
                                    return <option value={tipo.key} key={key}>{tipo.value}</option>
                                })
                            }
                        </select>
                        <label htmlFor="especialidad">Tipo de Documento *:</label>
                    </div>
                    <div className="form-floating mb-2">
                        <input
                            type="number"
                            placeholder='Ej: 123456789'
                            required
                            className="form-control"
                            name='perfil'
                            value={formState.perfil.identificacion}
                            onChange={(evt) => onInputChange(evt, 'identificacion')}
                        />
                        <label htmlFor="staticEmail">Identificación *:</label>
                    </div>
                    <div className="form-floating mb-2">
                        <input
                            type="text"
                            required
                            placeholder="Ej: Pedro Perez"
                            className="form-control"
                            name='name'
                            defaultValue={ formState.name }
                            onChange={onInputChange}
                        />
                        <label htmlFor="staticEmail">Nombre Completo *:</label>
                    </div>
                    <div className="form-floating mb-2">
                        <CountryDropdown
                            required
                            defaultOptionLabel="Selecciona uno..."
                            classes="form-control"
                            value={formState.perfil.pais}
                            onChange={(val) => selectCountry(val)} />
                        <label htmlFor="staticEmail">Pais *:</label>
                    </div>
                </div>
            </div>
            
            <div className="form-floating mb-3">
                <textarea
                    placeholder='Cuéntanos sobre tí...'
                    className="form-control"
                    required
                    name='perfil'
                    onChange={(evt) => onInputChange(evt, 'biografia')}
                    value={formState.perfil.biografia}
                ></textarea>
                <label htmlFor="staticEmail">Biografía *:</label>
            </div>
            
            <div className="mb-3 row">
                <div className="col-sm-6 mb-3">
                    <div className="form-floating col-sm-12">
                        <select
                            required
                            value={formState.perfil.especialidad}
                            name='perfil'
                            onChange={(evt) => onInputChange(evt, 'especialidad')}
                            className="form-select"
                            id="floatingSelect"
                        >
                            <option value=''>Selecciona una...</option>
                            {
                                especialidades.map( (item, key) => {
                                    return (
                                        <option key={key} value={item.id} > {item.name} </option>
                                    )
                                    
                                })
                            }
                        </select>
                        <label htmlFor="especialidad">Especialidad *:</label>
                    </div>
                </div>

                <div className="col-sm-6">
                    <div className="form-floating col-sm-12">
                        <Select
                            required
                            name='tags'
                            onChange={onPrepareTags}
                            placeholder='Selecciona algunas *'
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti
                            value={myTags}
                            options={allTags}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}
