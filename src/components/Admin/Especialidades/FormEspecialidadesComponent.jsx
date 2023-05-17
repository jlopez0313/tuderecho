import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from '@/hooks/useForm';
import { notify } from '@/helpers/helpers';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { create, find } from '@/services/Especialidades';

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
    const navigate = useNavigate()
    
    const { id, name, onSetFormState, onInputChange} = useForm({
        id: '', name: ''
    });

    const onSave = ( evt ) => {
        evt.preventDefault();

        let data = null;
        let message = ''
        if (!id) {
            data = create( name )
            message = 'Especialidad registrada!'
        }
        else {
            data = update( id, name )
            message = 'Especialidad actualizada!'
        }

        data.then( () => {
            notify(message, 'success');
            navigate('/admin/especialidades');

        }).catch( (error) => {
            notify(error?.response?.data?.msg || 'Internal Error onSave Especialidades', 'error');
        })
    }

    const onDoFind = async () => {
        const especialidad = await find ( params.id )
        onSetFormState({
            id: especialidad.id,
            name: especialidad.name
        })
    }

    useEffect(() => {
        if ( params.id ) {
            onDoFind()
        }
    }, [params])
    
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
