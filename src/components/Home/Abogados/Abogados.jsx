import Profile from '@/assets/images/home/abogados/profile.png';
import Heart from '@/assets/images/home/abogados/heart.png';

export const Abogados = () => {
  return (
    <div className="card">
        <div className="card-body">
            <h5 className="card-title">Perfil del Profesional</h5>
            <div className="row">
                <div className="col-sm-4">
                    <img src={Profile} alt=''/>
                </div>
                <div className="col-sm-8">
                    <span> Alfredo Jiménez </span>
                    {
                        [1, 2, 3, 4, 5].map( item => {
                            return <img  src={Heart} alt="" className="heart" key={item}/>
                        })
                    }
                    <p>
                        <span> Biografía </span>
                        <span> xxxxxxxxxx xxxxxxxxxxx xxxxxxxxx xxx </span>
                    </p>
                </div>
            </div>
            <div className="row">
                <span className="col-sm-6">Especialidad</span>
                <span className="col-sm-6">Derecho Penal</span>
            </div>
            <div className="row">
                <span className="col-sm-6">Contacto</span>
                <span className="col-sm-6">3171234567</span>
            </div>
            <div className="row">
                <span className="col-sm-6">Dirección</span>
                <span className="col-sm-6">Calle 12 # 5-67 Cali</span>
            </div>
            <div className="row">
                <span className="col-sm-6">Correo</span>
                <span className="col-sm-6">info@gmail.com</span>
            </div>
        </div>
    </div>
  )
}
