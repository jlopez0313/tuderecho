import { Header } from "../shared/Header"

export const PerfilComponent = () => {
  return (
    <>
      <Header />
      <div className="card p-3 mb-3">
        <div className="row">
          <div className="col-6"></div>
          <div className="col-6">
            <div className="mb-3 row">
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Pais:</label>
                <div className="col-sm-10">
                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Identificación:</label>
                <div className="col-sm-10">
                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Teléfono:</label>
                <div className="col-sm-10">
                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                </div>
            </div>
          </div>
        </div>
        <div className="mb-3 row">
          <div className="col-6">
            <div className="row">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Teléfono:</label>
              <div className="col-sm-10">
                  <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="row">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Teléfono:</label>
              <div className="col-sm-10">
                  <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
              </div>
            </div>
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Teléfono:</label>
          <div className="col-sm-10">
              <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
          </div>
        </div>
        <div className="mb-3 row">
          <div className="col-6">
            <div className="row">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Especialidad:</label>
              <div className="col-sm-10">
                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="row">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Palabras Clave:</label>
              <div className="col-sm-10">
                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <span> Información Privada (Verificaremos tus Datos)</span>
        <hr />
      </div>
      <div className="card p-3">
        <div className="mb-3 row">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Palabras Clave:</label>
          <div className="col-sm-10">
            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Estudiante:</label>
          <div className="col-sm-10">
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
              <label className="form-check-label" htmlFor="inlineCheckbox1">1</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
              <label className="form-check-label" htmlFor="inlineCheckbox2">2</label>
            </div>
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Palabras Clave:</label>
          <div className="col-sm-10">
            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Palabras Clave:</label>
          <div className="col-sm-10">
            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Palabras Clave:</label>
          <div className="col-sm-10">
            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
          </div>
        </div>
        <div className="mb-3 row">
        <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Desactivar Cuenta temporalmente</label>
        </div>
        </div>
      </div>
    </>
  )
}
