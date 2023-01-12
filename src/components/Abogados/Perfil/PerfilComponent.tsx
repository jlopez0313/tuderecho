import { Header } from "../shared/Header/Header"
import { DatosPersonales } from "./DatosPersonales"
import { InformacionPrivada } from "./InformacionPrivada"

export const PerfilComponent = () => {
  return (
    <>
      <Header />
      <div className="container pb-5">
        
        <DatosPersonales />

        <h3 className="mt-5 text-danger"> Información Privada (Verificaremos tus Datos)</h3>
        <hr />

        <InformacionPrivada />

        <button className="btn btn-primary mt-3 mx-auto d-block"> Guardar </button>
      </div>
    </>
  )
}
