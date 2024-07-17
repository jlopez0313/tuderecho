import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  faMagnifyingGlass, faSackDollar } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { notify } from '@/helpers/helpers';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { Link } from 'react-router-dom';
import { paginate, update } from '@/services/Usuarios';

import DataTable from 'react-data-table-component';

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

    const [usuarios, setUsuarios] = useState([])
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);
 
    const columns = [
        {
            name: 'Rol',
            selector: row => row.rol,
        },
        {
            name: 'Usuario',
            selector: row => row.name,
        },
        {
            name: 'Correo',
            selector: row => row.email,
        },
        {
            name: 'Estado',
            selector: row =>
                row.estado == 'A' 
                    ? 'Aprobado' 
                    : row.estado == 'P' 
                        ? 'Pendiente' 
                        : 'Rechazado'
                 
            ,
        },
        {
            name: 'Bolsa',
            cell: item => (
                <Link className="btn me-1" to={`bolsa/${item.id}`}>
                    <FontAwesomeIcon className='text-danger' icon={faSackDollar} />
                </Link>
            ),
        },
        {
            name: 'Acciones',
            cell: item => (                
                <>
                    <Link className="btn me-1" to={`detalle/${item.id}`}>
                        <FontAwesomeIcon className='text-danger' icon={faMagnifyingGlass} />
                    </Link>
    
                    {
                        item.estado === 'P'
                        ? 
                        <>
                            <button className="btn me-1" title="Aprobar" onClick={() => onApproveUser( item )}>
                                <FontAwesomeIcon className='text-danger' icon={faCircleCheck}/>
                            </button>
                            <button className="btn me-1" title="Rechazar" onClick={() => onDenyUser( item )}>
                                <FontAwesomeIcon className='text-danger' icon={faCircleXmark}/>
                            </button>
                        </>
                        : item.estado == 'A' 
                            ?
                                <button className="btn me-1" title="Rechazar" onClick={() => onDenyUser( item )}>
                                    <FontAwesomeIcon className='text-danger' icon={faCircleXmark}/>
                                </button>
                            :
                                <button className="btn me-1" title="Aprobar" onClick={() => onApproveUser( item )}>
                                    <FontAwesomeIcon className='text-danger' icon={faCircleCheck}/>
                                </button> 
                    }
                </>
            ),
        },
    ];
    
    
    const onApproveUser = ( user ) => {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            icon: 'question',
            confirmButtonColor: 'red',
            text: 'Deseas Aprobar este usuario',
            showCancelButton: true,
        }).then( ({isConfirmed}) => {
            if ( isConfirmed ) {

                update(user.id, {...user, estado: 'A'})
                .then( () => {
                    onList();
                    notify('Usuario Aprobado!', 'success')
                })
            }
        })
    }

    const onDenyUser = (user) => {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            icon: 'question',
            confirmButtonColor: 'red',
            text: 'Deseas Rechazar este usuario',
            showCancelButton: true,
        }).then( ({isConfirmed}) => {
            if ( isConfirmed ) {
                update(user.id, {...user, estado: 'R'})
                .then( () => {
                    onList();
                    notify('Usuario Rechazado!', 'success')
                })
            }
        })
    }

    const onList = async (page = 1) => {
        setLoading(true);
        setPage( page );

        const data = await paginate(page, perPage);

        setUsuarios( data.usuarios )
        setTotalRows(data.total);
		setLoading(false);
    }

    const handlePageChange = (page) => {
    	onList(page);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
    	setLoading(true);
        setPage( page );

    	const data = await getAll(page, newPerPage);

        setUsuarios( data.usuarios )
    	setPerPage(newPerPage);
    	setLoading(false);
    };

    useEffect(() => {
        onList(page)
    }, [])

    return (
        <div className="w-100 p-4 overflow-auto">
            
            <h1 className="mb-4"> Usuarios </h1>
            
            <Breadcrumb items={breadcrumb} />

            <DataTable
                columns={columns}
                data={usuarios}
                progressPending={loading}
                pagination
                paginationServer
                paginationTotalRows={totalRows}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                highlightOnHover
                className='data-table'
            />

        </div>
    )
}
