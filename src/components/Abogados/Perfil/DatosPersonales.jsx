import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import Avatar from '@/assets/images/abogado/perfil/avatar.png';
import './Perfil.scss'
import { list } from '@/store/especialidades/thunks';
import { list as allTags } from '@/store/tags/thunks';
import { CountryDropdown } from 'react-country-region-selector';
import { notify } from '@/global/global'

const animatedComponents = makeAnimated();

export const DatosPersonales = ( { user, currentTags, formState, onInputChange } ) => {
    const [profilePic, setProfilePic] = useState( Avatar );

    const {especialidades} = useSelector( (state) => state.especialidad)
    const [selectedTags, setSelectedTags] = useState([]);
    const {tags} = useSelector( (state) => state.tag)
    const [myTags, setMyTags] = useState( [] )
    const [country, setCountry] = useState('')
    const image = useRef(null)

    const dispatch = useDispatch();

    const selectCountry = (val) => {
        setCountry( val );
        const evt = { target: { name: 'pais', value: val } }
        onInputChange( evt )
    }

    const onList = () => {
        dispatch(list())
        dispatch(allTags())
    }

    const onSetMyTags = () => {
        setMyTags(
            tags.map( (tag) => {
                return {
                    value: tag.id,
                    label: tag.name
                }
            })
        )
    }

    const onPrepareTags = (
        newValue,
        actionMeta
    ) => {
        const tags = newValue.map( (tag) => { return tag.value })
        const evt = { target: { name: 'tags', value: tags } }

        setSelectedTags( newValue.map( (tag) => { return {value: tag.value, label: tag.label} } ) )
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
        onSetMyTags();
        setSelectedTags( currentTags.map( (tag) => { return {value: tag._id, label: tag.name} } ) )
    }, [tags])

    useEffect(() => {
        setSelectedTags( currentTags.map( (tag) => { return {value: tag._id, label: tag.name} } ) )
    }, [currentTags])

    useEffect(() => {
        setCountry( formState.pais );
        setProfilePic( formState.photo || Avatar )
    }, [formState])

    useEffect(() => {
        onList();
    }, [])

    return (
        <div className="card p-3 my-4">

            
            
            <div className="row">
                <div className="col-sm-3 mb-3 text-center">
                    <div className="avatar-container m-auto d-flex justify-content-center align-items-center cursor-pointer" onClick={onClickImage}>
                        <img src={profilePic} alt='' className='avatar'/>
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
                            className="form-control"
                            name='identificacion'
                            defaultValue={formState.identificacion}
                            onChange={onInputChange}
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
            
            <div className="form-floating mb-3">
                <textarea
                    placeholder='Cuéntanos sobre tí...'
                    className="form-control"
                    required
                    name='biografia'
                    onChange={onInputChange}
                    defaultValue={formState.biografia}
                ></textarea>
                <label htmlFor="staticEmail">Biografía *:</label>
            </div>
            
            <div className="mb-3 row">
                <div className="col-sm-6 mb-3">
                    <div className="form-floating col-sm-12">
                        <select
                            required
                            value={formState.especialidad}
                            name='especialidad'
                            onChange={onInputChange}
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
                            value={selectedTags}
                            options={myTags}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}
