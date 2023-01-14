import { useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  faTrash, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { list, update } from "@/store/user/thunks";
import { notify } from '@/global/global';
import Breadcrumb from '@/components/shared/Breadcrumb';

const breadcrumb = [
    {
        name: 'Home',
        href: '/admin',
        active: false
    },{
        name: 'Usuarios',
        active: true
    }
]


export const UsuariosComponent = () => {
    const {usuarios} = useSelector( (state: any) => state.user)
    const dispatch = useDispatch();

    const onApproveUser = ( user: any) => {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            icon: 'question',
            confirmButtonColor: 'red',
            text: 'Deseas Aprobar este usuario',
            showCancelButton: true,
        }).then( ({isConfirmed}) => {
            if ( isConfirmed ) {

                const removed = dispatch(update(user.id, {...user, estado: 'A'}))
                removed.then( () => {
                    onList();
                    notify('Usuario Aprobado!', 'success')
                })
            }
        })
    }

    const onDenyUser = (user: any) => {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            icon: 'question',
            confirmButtonColor: 'red',
            text: 'Deseas Rechazar este usuario',
            showCancelButton: true,
        }).then( ({isConfirmed}) => {
            if ( isConfirmed ) {
                const removed = dispatch(update(user.id, {...user, estado: 'R'}))
                removed.then( () => {
                    onList();
                    notify('Usuario Rechazado!', 'success')
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
            
            <Breadcrumb items={breadcrumb} />

            <table className="table table-bordered table-striped table-hovered table-condensed">
                <thead>
                    <tr>
                        <th> # </th>
                        <th> Rol </th>
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
                                    <td> { item.rol } </td>
                                    <td> { item.name } </td>
                                    <td> { item.email } </td>
                                    <td> 
                                        { item.estado == 'A' 
                                            ? 'Aprobado' 
                                            : item.estado == 'P' 
                                                ? 'Pendiente' 
                                                : 'Rechazado'
                                        } 
                                    </td>
                                    <td>
                                        <button className="btn me-1" title="Ver Detalle">
                                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                                        </button>
                                        {
                                            item.estado === 'P'
                                            ? 
                                            <>
                                                <button className="btn me-1" title="Aprobar" onClick={() => onApproveUser( item )}>
                                                    <FontAwesomeIcon icon={faCircleCheck}/>
                                                </button>
                                                <button className="btn me-1" title="Rechazar" onClick={() => onDenyUser( item )}>
                                                    <FontAwesomeIcon icon={faCircleXmark}/>
                                                </button>
                                            </>
                                            : item.estado == 'A' 
                                                ?
                                                    <button className="btn me-1" title="Rechazar" onClick={() => onDenyUser( item )}>
                                                        <FontAwesomeIcon icon={faCircleXmark}/>
                                                    </button>
                                                :
                                                    <button className="btn me-1" title="Aprobar" onClick={() => onApproveUser( item )}>
                                                        <FontAwesomeIcon icon={faCircleCheck}/>
                                                    </button> 
                                        }
                                    </td>
                                </tr>
                            )
                        })
                        
                    }
                </tbody>
            </table>
        </div>
    )
}
