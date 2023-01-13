import { Header } from "../shared/Header/Header"
import { DatosPersonales } from "./DatosPersonales"
import { InformacionPrivada } from "./InformacionPrivada"
import { useDispatch, useSelector } from 'react-redux';

export const PerfilComponent = () => {
  const { user } = useSelector( (state: any) => state.user );

  return (
    <>
      <Header />
      <div className="container pb-5">
        
        <DatosPersonales user={user} />

        <h3 className="mt-5 text-danger"> Información Privada (Verificaremos tus Datos)</h3>
        <hr />

        <InformacionPrivada user={user} />

        <button className="btn btn-primary mt-3 mx-auto d-block"> Guardar </button>
      </div>
    </>
  )
}
