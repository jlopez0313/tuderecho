import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { useEffect, useState } from 'react';
import { useForm } from '@/hooks/useForm';
import { DatosPersonales as DatosAbogado } from './Detalle/Abogado/DatosPersonales';
import { DatosPersonales as DatosCliente } from './Detalle/Cliente/DatosPersonales';
import { InformacionPrivada } from './Detalle/Abogado/InformacionPrivada';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { notify } from '@/helpers/helpers';
import { find, update } from '@/services/Usuarios';

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
        name: 'Detalle Usuarios',
        active: true
    }
]

export const DetalleComponent = () => {
    const formData = {
        cuenta: 'A',
        email: '',
        name: '',
        perfil: {
          biografia: '',
          ciudad: '',
          cuenta: '',
          decreto176: '',
          especialidad: '',
          estudiante: '',
          identificacion: '',
          oldImage: '',
          pais: '',
          photo: '',
          region: '',
          tags: [],
          tarjeta_profesional: '',
          telefono: '',
          tipoDoc: ''
        },
      }

    const params = useParams();
    const navigate = useNavigate()
    const { onSetFormState, formState } = useForm(formData)

    const onApproveUser = ( user ) => {
        console.log( user );
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
                    navigate('/admin/usuarios')
                    notify('Usuario Aprobado!', 'success')
                })
            }
        })
    }

    const onDenyUser = (user) => {
        console.log( user );
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
                    navigate('/admin/usuarios')
                    notify('Usuario Rechazado!', 'success')
                })
            }
        })
    }

    const onFind = async () => {
        find ( params.id )
        .then( (data) => {
            onSetFormState( {...formState, ...data.usuario} )
        })
    }

    useEffect(() => {
        onFind()
    }, [])

    return (
        <div className="w-100 p-4 overflow-auto">
            <h1 className="mb-4"> Usuarios </h1>
            
            <Breadcrumb items={breadcrumb} />

            <h5 className="mb-4"> Detalle Usuarios </h5>
            <div className="card mb-4">
                <div className="card-body">
                    <div className="form">
                        <h3 className="mt-1 text-danger"> Información Personal </h3>
                        <hr />

                        {
                            formState.rol === 'Abogado'
                            ? <DatosAbogado formState={formState}/>
                            : <DatosCliente formState={formState}/>
                        }
                        
                        {
                            formState.rol === 'Abogado'
                            ?
                                <>
                                    <h3 className="mt-3 text-danger"> Información Privada </h3>
                                    <hr />

                                    <InformacionPrivada formState={formState}/>
                                </>
                            : null
                        }
                    </div>
                </div>
            </div>
            {
                formState.estado === 'P'
                ? 
                <>
                    <button className="btn btn-primary me-3 mb-5" title="Aprobar" onClick={() => onApproveUser( formState )}>
                        Aprobar
                    </button>
                    <button className="btn btn-secondary me-3 mb-5" title="Rechazar" onClick={() => onDenyUser( formState )}>
                        Rechazar
                    </button>
                </>
                : formState.estado == 'A' 
                    ?           
                        <button className="btn btn-secondary me-3 mb-5" title="Rechazar" onClick={() => onDenyUser( formState )}>
                            Rechazar
                        </button>
                    :
                        <button className="btn btn-primary me-3 mb-5" title="Aprobar" onClick={() => onApproveUser( formState )}>
                            Aprobar
                        </button>
        }
        </div>
    )
}
