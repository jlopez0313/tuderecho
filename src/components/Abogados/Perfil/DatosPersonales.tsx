import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import Avatar from '@/assets/images/abogado/perfil/avatar.png';
import './Perfil.scss'
import { list } from '@/store/especialidades/thunks';
import { list as allTags } from '@/store/tags/thunks';
import { CountryDropdown } from 'react-country-region-selector';

const animatedComponents = makeAnimated();

export const DatosPersonales = ( { user, selectedTags, formState, onInputChange } ) => {
    const {especialidades} = useSelector( (state: any) => state.especialidad)
    const {tags} = useSelector( (state: any) => state.tag)
    const [myTags, setMyTags] = useState( [] )
    const [country, setCountry] = useState( '' )
    const dispatch = useDispatch();

    const selectCountry = (val) => {
        setCountry( val );
        const evt = { target: { name: 'pais', value: val } }
        console.log( );
        onInputChange( evt )
    }

    const onList = () => {
        dispatch(list())
        dispatch(allTags())
    }

    const onSetMyTags = () => {
        setMyTags(
            tags.map( (tag: any) => {
                return {
                    value: tag.id,
                    label: tag.name
                }
            })
        )
    }

    const onPrepareTags = (selectedTags: any[]) => {
        const evt = { target: { name: 'tags', value: selectedTags.map( tag => { return tag.value }) } }
        onInputChange( evt )
    } 

    useEffect(() => {
        onSetMyTags()
    }, [tags])

    useEffect(() => {
        setCountry( formState.pais );
    }, [formState])

    useEffect(() => {
        onList();
    }, [])

    return (
        <div className="card p-3 my-4">

            <div className="row">
                <div className="col-3 text-center">
                    <img src={Avatar} alt="" className='avatar'/>
                </div>
                <div className="col-9">
                    <div className="form-floating mb-2">
                        <input type="number" required className="form-control" placeholder='Identificación' name='identificacion' defaultValue={formState.identificacion} onChange={onInputChange}/>
                        <label htmlFor="staticEmail">Identificación:</label>
                    </div>
                    <div className="form-floating mb-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre"
                            name='name'
                            defaultValue={ user.name }
                            onChange={onInputChange}
                        />
                        <label htmlFor="staticEmail">Nombre Completo:</label>
                    </div>
                    <div className="form-floating mb-2">
                        <CountryDropdown
                            required
                            defaultOptionLabel="Selecciona..."
                            classes="form-control"
                            value={country}
                            onChange={(val) => selectCountry(val)} />
                        <label htmlFor="staticEmail">Pais:</label>
                    </div>
                </div>
            </div>
            
            <div className="form-floating mb-3">
                <textarea className="form-control" placeholder='Biografía' required name='biografia' onChange={onInputChange} defaultValue={formState.biografia}></textarea>
                <label htmlFor="staticEmail">Biografía:</label>
            </div>
            
            <div className="mb-3 row">
                <div className="col-6">
                    <div className="form-floating col-sm-12">
                        <select required value={formState.especialidad} name='especialidad' onChange={onInputChange} className="form-select" id="floatingSelect">
                            <option value=''>Selecciona</option>
                            {
                                especialidades.map( (item, key) => {
                                    return (
                                        <option key={key} value={item.id} > {item.name} </option>
                                    )
                                    
                                })
                            }
                        </select>
                        <label htmlFor="especialidad">Especialidad:</label>
                    </div>
                </div>

                <div className="col-6">
                    <div className="form-floating col-sm-12">
                        <Select
                            required
                            name='tags'
                            onChange={onPrepareTags}
                            placeholder='Palabras Clave'
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
