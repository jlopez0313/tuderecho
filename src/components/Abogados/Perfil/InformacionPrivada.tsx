import React from 'react'

export const InformacionPrivada = () => {
  return (
        <div className="card p-3">
            
            
            <div className="mb-3 row">
                <div className="col-6">
                    <div className="form-floating col-sm-12">
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                        <label htmlFor="staticEmail">Tarjeta Profesional:</label>
                    </div>
                </div>
                <div className="col-6">
                    <label htmlFor="staticEmail">Estudiante:</label>
                    <div className="form-floating col-sm-12">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
                            <label className="form-check-label" htmlFor="inlineCheckbox1"> SI </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                            <label className="form-check-label" htmlFor="inlineCheckbox2"> Estudiante ley 196 o licencia temporal </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-3 row">
                <div className="col-6">
                    <div className="form-floating col-sm-12">
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                        <label htmlFor="staticEmail">Correo:</label>
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-floating col-sm-12">
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                        <label htmlFor="staticEmail">Ciudad:</label>
                    </div>
                </div>
            </div>
            <div className="mb-3 row">
                <div className="form-floating col-sm-12">
                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                    <label htmlFor="staticEmail">Teléfono:</label>
                </div>
            </div>
            <div className="my-4 row ms-2">
                <div className="form-check form-switch align-items-center d-flex">
                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                    <label className="form-check-label ms-2" htmlFor="flexSwitchCheckDefault">Desactivar Cuenta temporalmente</label>
                </div>
            </div>
        </div>
  )
}
