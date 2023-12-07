import { Link, useParams } from 'react-router-dom';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { getTenant } from '@/helpers/helpers';

const breadcrumb = [
    {
        name: 'Home',
        href: '/admin',
        active: false
    },{
        name: 'Usuarios',
        href: '/admin/usuarios',
        active: false
    },{
        name: 'Formulario Usuarios',
        active: true
    }
]

export const FormUsuariosComponent = () => {
    const params = useParams();

    return (
        <div className="w-100 p-4">
            <h1 className="mb-4"> Usuarios </h1>
            
            <Breadcrumb items={breadcrumb} />

            <h5 className="mb-4"> Formulario Usuarios </h5>
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
                            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Nombre Completo:</label>
                            <div className="col-sm-10">
                                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Link to={'/' + getTenant() + "/admin/usuarios"} className='text-white btn btn-primary'>
                Guardar
            </Link>
        </div>
    )
}
