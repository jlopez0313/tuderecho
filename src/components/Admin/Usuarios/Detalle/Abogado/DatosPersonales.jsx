import { useEffect, useState } from 'react';
import Avatar from '@/assets/images/abogado/perfil/avatar.png';
import '../Perfil.scss'
import { tipoDocumentos } from '@/constants/constants';
import { all as getAll } from '@/services/Especialidades';
import { all as getTags } from '@/services/Tags';

export const DatosPersonales = ( { formState } ) => {
    const [especialidades, setEspecialidades] = useState([])
    const [myTags, setMyTags] = useState([]);
    const [tags, setTags] = useState([])

    const onList = async () => {
        setTags( await ( getTags()) || [] )
        setEspecialidades( await getAll() )
    }

    const onSetMyTags = () => {
        const myTags = tags.filter( tag => formState.perfil?.tags.includes(tag.id) )
        setMyTags(
            myTags.map( (tag) => {
                return tag.name
            })
        )
    }

    useEffect(() => {
        onSetMyTags();
    }, [tags, formState])

    useEffect(() => {
        onList();
    }, [])

    return (
        <div className="card p-3 my-4">
            
            <div className="row">
                <div className="col-sm-3 mb-3 text-center">
                    <div className="avatar-container m-auto d-flex justify-content-center align-items-center cursor-pointer">
                        <img src={formState.perfil?.photo || Avatar} alt='' className='avatar'/>
                    </div>
                </div>
                <div className="col-sm-9">
                    <div className="form-floating mb-2">
                        <span className="form-control"> { tipoDocumentos.find(tipo => tipo.key === formState.perfil?.tipoDoc)?.value } </span>
                        <label htmlFor="especialidad">Tipo de Documento *:</label>
                    </div>
                    <div className="form-floating mb-2">
                        <span className="form-control"> {formState.perfil?.identificacion} </span>
                        <label htmlFor="staticEmail">Identificación *:</label>
                    </div>
                    <div className="form-floating mb-2">
                        <span className="form-control"> {formState.name} </span>
                        <label htmlFor="staticEmail">Nombre Completo *:</label>
                    </div>
                    <div className="form-floating mb-2">
                        <span className="form-control"> {formState.perfil?.pais} </span>
                        <label htmlFor="staticEmail">Pais *:</label>
                    </div>
                </div>
            </div>
            
            <div className="form-floating mb-3">
                <span className="form-control"> {formState.perfil?.biografia} </span>
                <label htmlFor="staticEmail">Biografía *:</label>
            </div>
            
            <div className="mb-3 row">
                <div className="col-sm-6 mb-3">
                    <div className="form-floating col-sm-12">
                        <span className="form-control"> {especialidades.find(item => item.id === formState.perfil?.especialidad)?.name} </span>
                        <label htmlFor="especialidad">Especialidad *:</label>
                    </div>
                </div>

                <div className="col-sm-6">
                    <div className="form-floating col-sm-12">
                        <span className="form-control"> {myTags.join(', ')} </span>
                    </div>
                </div>
            </div>

        </div>
    )
}
