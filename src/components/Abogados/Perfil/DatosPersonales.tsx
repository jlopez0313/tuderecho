import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Avatar from '@/assets/images/abogado/perfil/avatar.png';
import './Perfil.scss'
import { list } from '@/store/especialidades/thunks';

export const DatosPersonales = ( { user } ) => {
    const {especialidades} = useSelector( (state: any) => state.especialidad)
    const dispatch = useDispatch();

    const onList = () => {
        dispatch(list())
    }

    useEffect(() => {
        onList()
    }, [])

    const handleChange = () => {

    }
    return (
        <div className="card p-3 my-4">

            <div className="row">
                <div className="col-3 text-center">
                    <img src={Avatar} alt="" className='avatar'/>
                </div>
                <div className="col-9">
                    <div className="form-floating mb-2">
                        <input
                            type="email"
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="name@example.com"
                            defaultValue={user.name || ''}
                        />
                        <label htmlFor="staticEmail">Nombre Completo:</label>
                    </div>
                    <div className="form-floating mb-2">
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                        <label htmlFor="staticEmail">Identificación:</label>
                    </div>
                    <div className="form-floating mb-2">
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                        <label htmlFor="staticEmail">Pais:</label>
                    </div>
                </div>
            </div>
            
            <div className="form-floating mb-3">
                <textarea className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"></textarea>
                <label htmlFor="staticEmail">Biografía:</label>
            </div>
            
            <div className="mb-3 row">
                <div className="col-6">
                    <div className="form-floating col-sm-12">
                        <select value='' onChange={handleChange} className="form-select" id="floatingSelect">
                            <option defaultValue=''>Selecciona</option>
                            {
                                especialidades.map( (item, key) => {
                                    return (
                                        <option key={key} value={item.key}> {item.name} </option>
                                    )
                                    
                                })
                            }
                        </select>
                        <label htmlFor="staticEmail">Especialidad:</label>
                    </div>
                </div>

                <div className="col-6">
                    <div className="form-floating col-sm-12">
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                        <label htmlFor="staticEmail">Palabras Clave:</label>
                    </div>
                </div>
            </div>

        </div>
    )
}
