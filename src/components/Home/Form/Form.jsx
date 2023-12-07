import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const Form = () => {
    const showSuccess = () => {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            icon: 'success',
            confirmButtonColor: 'red',
            text: `Su solicitud ha sido enviada
            a nuestra red de profesionales. Por favor no 
            cierre ésta página.`
        })
    }

    const showAlert = () => {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            icon: 'question',
            confirmButtonColor: 'red',
            html: `<p> Al diligenciar el formulario
            le informaremos a nuestra 
            comunidad acerca de tu solicitud;
            tres profesionales te atenderán
            a través del chat de Sabiux, esto 
            puede tardar entre 2 a 5 minutos.
            Por favor no cierres ésta página </p>`
        })
    }

    return (
        <>
            <h1 className="text-center">
                ¿Quieres que lo hagamos por tí?
                <button className="btn ms-5" onClick={ () => showAlert() }>
                    <FontAwesomeIcon icon={faCircleQuestion} />
                </button>
            </h1>

            <div className="card mb-5">
                <div className="card-body">
                    <div className="form">
                        <div className="mb-3 row">
                            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Tu nombre:</label>
                            <div className="col-sm-10">
                                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Palabras clave:</label>
                            <div className="col-sm-10">
                                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Explícanos tu Caso</label>
                            <div className="col-sm-10">
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows={3}></textarea>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Tu correo</label>
                            <div className="col-sm-10">
                                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                            </div>
                        </div>
                        
                        <div className="mb-3 form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Acepto Términos y Condiciones
                            </label>
                        </div>
                        <button type="button" className="btn btn-primary" onClick={() => showSuccess()}>Enviar</button>
                    </div>
                </div>
            </div>
        </>
    )
}
