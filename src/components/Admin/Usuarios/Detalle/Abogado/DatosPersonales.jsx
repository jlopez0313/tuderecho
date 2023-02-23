import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Avatar from '@/assets/images/abogado/perfil/avatar.png';
import '../Perfil.scss'
import { list } from '@/store/especialidades/thunks';
import { tipoDocumentos } from '@/constants/constants';

export const DatosPersonales = ( { currentTags, formState } ) => {
    const {especialidades} = useSelector( (state) => state.especialidad)
    const dispatch = useDispatch();

    const onList = () => {
        dispatch(list())
    }

    useEffect(() => {
        onList();
    }, [])

    return (
        <div className="card p-3 my-4">

            
            
            <div className="row">
                <div className="col-sm-3 mb-3 text-center">
                    <div className="avatar-container m-auto d-flex justify-content-center align-items-center cursor-pointer">
                        <img src={formState.photo || Avatar} alt='' className='avatar'/>
                    </div>
                </div>
                <div className="col-sm-9">
                    <div className="form-floating mb-2">
                        <span className="form-control"> { tipoDocumentos.find(tipo => tipo.key === formState.tipoDoc)?.value } </span>
                        <label htmlFor="especialidad">Tipo de Documento *:</label>
                    </div>
                    <div className="form-floating mb-2">
                        <span className="form-control"> {formState.identificacion} </span>
                        <label htmlFor="staticEmail">Identificación *:</label>
                    </div>
                    <div className="form-floating mb-2">
                        <span className="form-control"> {formState.name} </span>
                        <label htmlFor="staticEmail">Nombre Completo *:</label>
                    </div>
                    <div className="form-floating mb-2">
                        <span className="form-control"> {formState.pais} </span>
                        <label htmlFor="staticEmail">Pais *:</label>
                    </div>
                </div>
            </div>
            
            <div className="form-floating mb-3">
                <span className="form-control"> {formState.biografia} </span>
                <label htmlFor="staticEmail">Biografía *:</label>
            </div>
            
            <div className="mb-3 row">
                <div className="col-sm-6 mb-3">
                    <div className="form-floating col-sm-12">
                        <span className="form-control"> {especialidades.find(item => item.id === formState.especialidad)?.name} </span>
                        <label htmlFor="especialidad">Especialidad *:</label>
                    </div>
                </div>

                <div className="col-sm-6">
                    <div className="form-floating col-sm-12">
                        <span className="form-control"> {currentTags.map(tag => { return tag.name }).join(', ')} </span>
                    </div>
                </div>
            </div>

        </div>
    )
}
