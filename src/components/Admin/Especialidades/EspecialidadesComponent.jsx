import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { notify } from '@/helpers/helpers';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { all as getAll, remove } from '@/services/Especialidades';

const breadcrumb = [
    {
        name: 'Home',
        href: '/admin',
        active: false
    },{
        name: 'Especialidades',
        active: true
    }
]

export const EspecialidadesComponent = () => {
    
    const [especialidades, setEspecialidades] = useState([])
    

    const onDeleteItem = ( id ) => {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            icon: 'question',
            confirmButtonColor: 'red',
            text: 'Deseas Eliminar este registro',
            showCancelButton: true,
        }).then( ({isConfirmed}) => {
            if ( isConfirmed ) {
                remove(id)
                .then( () => {
                    onList();
                    notify('Especialidad eliminada!', 'success')
                })
            }
        })
    }

    const onList = async () => {
        setEspecialidades( await ( getAll()) || [] )
    }

    useEffect(() => {
        onList()
    }, [])
    

    return (
        <div className="w-100 p-4 overflow-auto">
            <h1 className="mb-4"> Especialidades </h1>

            <Breadcrumb items={breadcrumb} />

            <table className="table table-bordered table-striped table-hovered table-condensed">
                <thead>
                    <tr>
                        <th> # </th>
                        <th> Especialidad </th>
                        <th> Acciones </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        especialidades?.map( (item, key) => {
                            return (
                                <tr key={key}>
                                    <td> {key + 1} </td>
                                    <td> {item.name} </td>
                                    <td className='d-flex align-content-center justify-content-between'>
                                        <Link to={`editar/${item.id}`}>
                                            <FontAwesomeIcon icon={faPencil} className='me-4' />
                                        </Link>
                                        <button className="btn text-danger" onClick={() => onDeleteItem(item.id)}>
                                            <FontAwesomeIcon icon={faTrash} title="Eliminar" />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    
                </tbody>
            </table>

            <Link to='crear'>
                <div className="fab">
                    +
                </div>
            </Link>
        </div>
    )
}
