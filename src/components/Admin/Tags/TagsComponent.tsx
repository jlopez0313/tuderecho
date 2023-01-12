import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const TagsComponent = () => {
    const onDeleteItem = () => {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            icon: 'question',
            text: 'Deseas Eliminar este registro',
            showCancelButton: true,
        })
    }
        
    return (
        <div className="w-100 p-4">
            <h1 className="mb-4"> Palabras Clave </h1>
            <table className="table table-bordered table-striped table-hovered table-condensed">
                <thead>
                    <tr>
                        <th> # </th>
                        <th> Palabra Clave </th>
                        <th> Acciones </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td> 1 </td>
                        <td> Hola </td>
                        <td>
                            <Link to="editar/1">
                                <FontAwesomeIcon icon={faPencil} className='me-4' />
                            </Link>
                            <button className="btn me-1" onClick={() => onDeleteItem()}>
                                <FontAwesomeIcon icon={faTrash} title="Eliminar" />
                            </button>
                        </td>
                    </tr>
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
