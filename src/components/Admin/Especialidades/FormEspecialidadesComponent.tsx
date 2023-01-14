import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '@/hooks/useForm';
import { create, find, update } from '@/store/especialidades/thunks';
import { notify } from '@/global/global';
import Breadcrumb from '@/components/shared/Breadcrumb';

const breadcrumb = [
    {
        name: 'Home',
        href: '/admin',
        active: false
    },{
        name: 'Especialidades',
        href: '/admin/especialidades',
        active: false
    },{
        name: 'Formulario Especialidades',
        active: true
    }
]


export const FormEspecialidadesComponent = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const {especialidad} = useSelector( (state: any) => state.especialidad);
    
    const { id, name, onSetFormState, onInputChange} = useForm({
        id: '', name: ''
    });

    const onSave = ( evt: any ) => {
        evt.preventDefault();

        let data: any = null;
        let message = ''
        if (!id) {
            data = dispatch( create( name ) )
            message = 'Especialidad registrada!'
        }
        else {
            data = dispatch( update( id, name ) )
            message = 'Especialidad actualizada!'
        }

        data.then( () => {
            notify(message, 'success');
            navigate('/admin/especialidades');

        }).catch( (error: any) => {
            notify(error?.response?.data?.msg, 'error');
        })
    }

    const onDoFind = () => {
        onSetFormState({
            id: especialidad.id,
            name: especialidad.name
        })
    }

    useEffect(() => {
        onDoFind()
    }, [especialidad])

    useEffect(() => {
        if ( params.id ) {
            dispatch( find( params.id ) )
        } else {
            onSetFormState({
                id: '', name: ''
            })
        }
    }, [])
    
    return (
        <div className="w-100 p-4">
            <h1 className="mb-4"> Especialidades </h1>
            
            <Breadcrumb items={breadcrumb} />

            <h5 className="mb-4"> Formulario Especialidades </h5>
            <form onSubmit={onSave}>
                <div className="card mb-4">
                    <div className="card-body">
                        <div className="form">
                                {
                                    params.id ?
                                    <>
                                        <div className="mb-3 row">
                                            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">ID:</label>
                                            <div className="col-sm-10">
                                                <span className="form-control">{ params.id } </span>
                                            </div>
                                        </div>
                                    </> : null
                                }
                                <div className="mb-3 row">
                                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Especialidad:</label>
                                    <div className="col-sm-10">
                                        <input
                                            required
                                            name="name"
                                            type="text"
                                            className="form-control"
                                            id="exampleFormControlInput1"
                                            placeholder="Especialidad"
                                            value={name || ""}
                                            onChange={onInputChange} />
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
                
                <button className='btn btn-primary' type='submit'> Guardar </button>
            </form>
        </div>
    )
}
