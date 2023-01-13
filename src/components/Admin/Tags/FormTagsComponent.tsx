import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '@/hooks/useForm';
import { create, find, update } from '@/store/tags/thunks';
import { notify } from '@/global/global';

export const FormTagsComponent = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {tag} = useSelector( (state: any) => state.tag);
    
    const { id, name, onSetFormState, onInputChange} = useForm({
        id: '', name: ''
    });

    const onSave = () => {
        let data: any = null;
        let message = ''
        if (!id) {
            data = dispatch( create( name ) )
            message = 'Palabra Clave registrada!'
        }
        else {
            data = dispatch( update( id, name ) )
            message = 'Palabra Clave actualizada!'
        }

        data.then( () => {
            notify(message, 'success');
            navigate('/admin/tags');

        }).catch( (error: any) => {
            notify(error?.response?.data?.msg, 'error');
        })
    }

    const onDoFind = () => {
        onSetFormState({
            id: tag.id,
            name: tag.name
        })
    }

    useEffect(() => {
        onDoFind()
    }, [tag])

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
            <h1 className="mb-4"> Palabras Clave </h1>
            <h5 className="mb-4"> Formulario Palabras Clave </h5>
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
                            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Palabra Clave:</label>
                            <div className="col-sm-10">
                                <input 
                                    name="name"
                                    type="text"
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    placeholder="Palabra Clave"
                                    value={name || ""}
                                    onChange={onInputChange} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button className='btn btn-primary' onClick={onSave}> Guardar </button>
        </div>
    )
}
