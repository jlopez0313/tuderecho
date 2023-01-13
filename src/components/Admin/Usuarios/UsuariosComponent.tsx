import { useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  faTrash, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { list } from "@/store/user/thunks";

export const UsuariosComponent = () => {
    const {usuarios} = useSelector( (state: any) => state.user)
    const dispatch = useDispatch();

    const onApproveUser = () => {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            icon: 'question',
            text: 'Deseas Aprobar este usuario',
            showCancelButton: true,
        })
    }

    const onDenyUser = () => {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            icon: 'question',
            text: 'Deseas Rechazar este usuario',
            showCancelButton: true,
        })
    }

    const onDeleteUser = (id: string) => {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            icon: 'question',
            text: 'Deseas Eliminar este usuario',
            showCancelButton: true,
        }).then( ({isConfirmed}) => {
            if ( isConfirmed ) {
                const removed = dispatch(remove(id))
                removed.then( () => {
                    onList();
                    notify('Especialidad eliminada!', 'success')
                })
            }
        })
    }

    const onList = () => {
        dispatch(list())
    }

    useEffect(() => {
        onList()
    }, [])

    return (
        <div className="w-100 p-4">
            <h1 className="mb-4"> Usuarios </h1>
            <table className="table table-bordered table-striped table-hovered table-condensed">
                <thead>
                    <tr>
                        <th> # </th>
                        <th> Usuario </th>
                        <th> Correo </th>
                        <th> Estado </th>
                        <th> Acciones </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios?.map( (item, key) => {
                            return (
                                <tr>
                                    <td> {key + 1} </td>
                                    <td> { item.name } </td>
                                    <td> { item.email } </td>
                                    <td> Aprobado </td>
                                    <td>
                                        <button className="btn me-1" title="Ver Detalle">
                                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                                        </button>
                                        <button className="btn me-1" title="Aprobar" onClick={() => onApproveUser()}>
                                            <FontAwesomeIcon icon={faCircleCheck}/>
                                        </button>
                                        <button className="btn me-1" title="Rechazar" onClick={() => onDenyUser()}>
                                            <FontAwesomeIcon icon={faCircleXmark}/>
                                        </button>
                                        <button className="btn me-1" title="Eliminar" onClick={() => onDeleteUser()}>
                                            <FontAwesomeIcon icon={faTrash}/>
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
