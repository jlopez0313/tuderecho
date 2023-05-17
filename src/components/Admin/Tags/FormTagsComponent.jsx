import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from '@/hooks/useForm';
import { notify } from '@/helpers/helpers';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { create, find } from '@/services/Tags';

const breadcrumb = [
    {
        name: 'Home',
        href: '/admin',
        active: false
    },{
        name: 'Palabras Clave',
        href: '/admin/tags',
        active: false
    },{
        name: 'Formulario Palabras Clave',
        active: true
    }
]

export const FormTagsComponent = () => {
    const params = useParams();
    const navigate = useNavigate();
    
    const { id, name, onSetFormState, onInputChange} = useForm({
        id: '', name: ''
    });

    const onSave = ( evt ) => {
        evt.preventDefault();

        let data = null;
        let message = ''
        if (!id) {
            data = create( name )
            message = 'Palabra Clave registrada!'
        }
        else {
            data = update( id, name )
            message = 'Palabra Clave actualizada!'
        }

        data.then( () => {
            notify(message, 'success');
            navigate('/admin/tags');

        }).catch( (error) => {
            notify(error?.response?.data?.msg || 'Internal Error onSave Tags', 'error');
        })
    }

    const onDoFind = async () => {
        const tag = await find ( params.id )
        onSetFormState({
            id: tag.id,
            name: tag.name
        })
    }

    useEffect(() => {
        if ( params.id ) {
            onDoFind()
        }
    }, [params])
    
    return (
        <div className="w-100 p-4">
            <h1 className="mb-4"> Palabras Clave </h1>
            
            <Breadcrumb items={breadcrumb} />

            <h5 className="mb-4"> Formulario Palabras Clave </h5>
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
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Palabra Clave:</label>
                                <div className="col-sm-10">
                                    <input
                                        required
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

                <button className='btn btn-primary' type='submit'> Guardar </button>
            </form>
        </div>
    )
}
