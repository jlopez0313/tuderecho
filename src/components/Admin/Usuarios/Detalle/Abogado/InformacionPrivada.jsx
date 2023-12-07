import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

export const InformacionPrivada = ({ formState }) => {
    
    const onShowAlertEstudiante = () => {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            icon: 'question',
            confirmButtonColor: 'red',
            html: `<p>Si aún es estudiante
                puedes acceder a nuestra red
                de profesionales pero no recibirá
                solicitudes de atención. A No ser
                que seas decreto 176. </p>`,
        })
    }

    return (
        <div className="card p-3">

            <div className="mb-3 row">
                <div className="col-sm-6">
                    <div className="form-floating col-sm-12">
                        <span className="form-control"> {formState.perfil?.tarjeta_profesional} </span>
                        <label htmlFor="staticEmail">Tarjeta Profesional:</label>
                    </div>
                </div>
                <div className="col-sm-6">
                    <label htmlFor="staticEmail">
                        Es Estudiante?
                        <button className='btn' onClick={onShowAlertEstudiante}>
                            <FontAwesomeIcon icon={faQuestionCircle} />
                        </button>
                    </label>
                    <div className="form-floating col-sm-12">
                        <div className="form-check form-check-inline">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                name='estudiante'
                                readOnly={true}
                                checked={ formState.perfil?.estudiante === 'S' }
                            />
                            <label className="form-check-label" htmlFor="inlineCheckbox1"> SI </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                name='decreto176'
                                readOnly={true}
                                checked={ formState.perfil?.decreto176 === 'S' }
                            />
                            <label className="form-check-label" htmlFor="inlineCheckbox2"> Estudiante de Derecho - licencia temporal (Decreto 176 de 1971) </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-3 row">
                <div className="col-sm-6 mb-3">
                    <div className="form-floating col-sm-12">
                        <span className="form-control"> {formState.perfil?.region} </span>
                        <label htmlFor="staticEmail">Región *:</label>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-floating col-sm-12">
                        <span className="form-control"> {formState.perfil?.ciudad} </span>
                        <label htmlFor="staticEmail">Ciudad *:</label>
                    </div>
                </div>
            </div>
            <div className="mb-3 row">
                <div className="col-sm-6 mb-3">
                    <div className="form-floating col-sm-12">
                        <span className="form-control"> {formState.email} </span>
                        <label htmlFor="staticEmail">Correo *:</label>
                    </div>
                </div>
                <div className="form-floating col-sm-6">
                    <span className="form-control"> {formState.perfil?.telefono} </span>
                    <label htmlFor="staticEmail">Teléfono *:</label>
                </div>
            </div>
            <div className="mb-3 row">
                <div className="form-floating col-sm-6">
                    <div className="form-floating col-sm-12">
                        <span className="form-control">
                            {
                                formState.estado === 'R' 
                                ? 'Rechazado'
                                : formState.estado === 'A' ? 
                                    'Aprobado' : 'Pendiente'
                            }
                        </span>
                        <label htmlFor="staticEmail">Estado</label>
                    </div>
                </div>
                <div className="col-sm-6">
                    {
                        formState.perfil?.cuenta === 'I' 
                        ? <div className="alert alert-danger"> Cuenta temporalmente desactivada </div>
                        : formState.perfil?.cuenta === 'A' ?
                            <div className="alert alert-success"> Cuenta activa </div>
                            : 
                            <div className="alert alert-warning"> Cuenta pendiente </div>
                    }
                </div>
            </div>
        </div>
    )
}
