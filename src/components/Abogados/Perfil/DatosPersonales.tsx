import Avatar from '@/assets/images/abogado/perfil/avatar.png';
import './Perfil.scss'

export const DatosPersonales = () => {
  return (
    <div className="card p-3 my-4">

        <div className="row">
            <div className="col-3 text-center">
                <img src={Avatar} alt="" className='avatar'/>
            </div>
            <div className="col-9">
                <div className="form-floating mb-2">
                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                    <label htmlFor="staticEmail">Nombre Completo:</label>
                </div>
                <div className="form-floating mb-2">
                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                    <label htmlFor="staticEmail">Identificación:</label>
                </div>
                <div className="form-floating mb-2">
                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                    <label htmlFor="staticEmail">Pais:</label>
                </div>
            </div>
        </div>
        
        <div className="form-floating mb-3">
            <textarea className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"></textarea>
            <label htmlFor="staticEmail">Biografía:</label>
        </div>
        
        <div className="mb-3 row">
            <div className="col-6">
                <div className="form-floating col-sm-12">
                    <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
                        <option selected>Selecciona</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    <label htmlFor="staticEmail">Especialidad:</label>
                </div>
            </div>

            <div className="col-6">
                <div className="form-floating col-sm-12">
                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                    <label htmlFor="staticEmail">Palabras Clave:</label>
                </div>
            </div>
        </div>

    </div>
  )
}
