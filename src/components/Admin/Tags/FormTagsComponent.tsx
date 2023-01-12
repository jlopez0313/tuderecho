import { Link, useParams } from 'react-router-dom';

export const FormTagsComponent = () => {
    const params = useParams();
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
                                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" readOnly={true} value={ params.id } />
                                    </div>
                                </div>
                            </> : null
                        }
                        <div className="mb-3 row">
                            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Palabra Clave:</label>
                            <div className="col-sm-10">
                                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Link to="/admin/tags" className='text-white btn btn-primary'>
                Guardar
            </Link>
        </div>
    )
}
