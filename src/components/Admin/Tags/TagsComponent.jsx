import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { notify } from '@/helpers/helpers';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { paginate, remove } from '@/services/Tags';
import DataTable from 'react-data-table-component';
import { getTenant } from '@/helpers/helpers';

const breadcrumb = [
    {
        name: 'Home',
        href: '/admin',
        active: false
    },{
        name: 'Palabras Clave',
        active: true
    }
]

export const TagsComponent = () => {

    const [tags, setTags] = useState([])
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);

    const columns = [
        {
            name: 'Palabra Clave',
            selector: row => row.name,
        },
        {
            name: 'Acciones',
            cell: item => (                
                <>
                    <Link to={`editar/${item.id}`}>
                        <FontAwesomeIcon icon={faPencil} className='me-4' />
                    </Link>
                    <button className="btn text-danger" onClick={() => onDeleteItem(item.id)}>
                        <FontAwesomeIcon icon={faTrash} title="Eliminar" />
                    </button>
                </>
            ),
        },
    ];

    const onDeleteItem = (id) => {
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
                    onList( page );
                    notify('Especialidad eliminada!', 'success')
                })
            }
        })
    }

    const onList = async (page) => {
        setLoading(true);
        setPage( page );

        const data = await paginate(page, perPage);

        setTags( data.tags )
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

        setTags( data.tags )
    	setPerPage(newPerPage);
    	setLoading(false);
    };

    useEffect(() => {
        onList(page)
    }, [])
        
    return (
        <div className="w-100 p-4 overflow-auto">
            <h1 className="mb-4"> Palabras Clave </h1>

            <Breadcrumb items={breadcrumb} />

            <DataTable
                columns={columns}
                data={tags}
                progressPending={loading}
                pagination
                paginationServer
                paginationTotalRows={totalRows}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                highlightOnHover
                className='data-table'
            />

            <Link to={'crear'}>
                <div className="fab">
                    +
                </div>
            </Link>
        </div>
    )
}
