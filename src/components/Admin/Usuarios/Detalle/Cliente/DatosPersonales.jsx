import Avatar from '@/assets/images/abogado/perfil/avatar.png';
import '../Perfil.scss'
import { tipoDocumentos } from '@/constants/constants';

export const DatosPersonales = ( { formState } ) => {
    return (
        <div className="card p-3 my-4">

            <div className="row">
                <div className="col-sm-3 mb-3 text-center">
                    <div className="avatar-container m-auto d-flex justify-content-center align-items-center cursor-pointer">
                        <img src={formState.photo || Avatar} alt='' className='avatar'/>
                    </div>
                </div>
                <div className="col-sm-9">
                    <div className="form-floating mb-2">
                        <span className="form-control"> { tipoDocumentos.find(tipo => tipo.key === formState.tipoDoc)?.value } </span>
                        <label htmlFor="especialidad">Tipo de Documento *:</label>
                    </div>
                    <div className="form-floating mb-2">
                        
                        <span className="form-control"> { formState.identificacion } </span>
                        <label htmlFor="staticEmail">Identificación *:</label>
                    </div>
                    <div className="form-floating mb-2">
                        <span className="form-control"> { formState.name } </span>
                        <label htmlFor="staticEmail">Nombre Completo *:</label>
                    </div>
                    <div className="form-floating mb-2">
                        <span className="form-control"> { formState.pais } </span>
                        <label htmlFor="staticEmail">Pais *:</label>
                    </div>
                </div>
            </div>
            
            <div className="mb-3 row">
                <div className="col-sm-6 mb-3">
                    <div className="form-floating col-sm-12">                        
                        <span className="form-control"> { formState.region } </span>
                        <label htmlFor="staticEmail">Región *:</label>
                    </div>
                </div>

                <div className="col-sm-6">
                    <div className="form-floating col-sm-12">                        
                        <span className="form-control"> { formState.ciudad } </span>
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
                    <span className="form-control"> { formState.telefono } </span>
                    <label htmlFor="staticEmail">Teléfono  *:</label>
                </div>
            </div>
            
            <div className="form-floating mb-3">
                <span className="form-control"> { formState.biografia } </span>
                <label htmlFor="staticEmail">Biografía *:</label>
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
