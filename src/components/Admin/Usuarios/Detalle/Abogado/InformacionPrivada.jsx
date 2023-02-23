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
                de abogados pero no recibirá
                solicitudes de atención. A No ser
                que seas decreto 176. </p>`,
        })
    }

    return (
        <div className="card p-3">

            <div className="mb-3 row">
                <div className="col-sm-6">
                    <div className="form-floating col-sm-12">
                        <span className="form-control"> {formState.tarjeta_profesional} </span>
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
                                checked={ formState.estudiante === 'S' }
                            />
                            <label className="form-check-label" htmlFor="inlineCheckbox1"> SI </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                name='decreto176'
                                readOnly={true}
                                checked={ formState.decreto176 === 'S' }
                            />
                            <label className="form-check-label" htmlFor="inlineCheckbox2"> Estudiante de Derecho - licencia temporal (Decreto 176 de 1971) </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-3 row">
                <div className="col-sm-6 mb-3">
                    <div className="form-floating col-sm-12">
                        <span className="form-control"> {formState.region} </span>
                        <label htmlFor="staticEmail">Región *:</label>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-floating col-sm-12">
                        <span className="form-control"> {formState.ciudad} </span>
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
                    <span className="form-control"> {formState.telefono} </span>
                    <label htmlFor="staticEmail">Teléfono *:</label>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    {
                        formState.cuenta === 'I' 
                        ? <div className="alert alert-danger"> Cuenta temporalmente desactivada </div>
                        : <div className="alert alert-success"> Cuenta activa </div>
                    }
                </div>
            </div>
        </div>
    )
}
