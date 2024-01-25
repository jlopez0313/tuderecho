import { Link } from 'react-router-dom';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { notify } from '@/helpers/helpers'
import { useForm } from '@/hooks/useForm';
import { update } from '@/services/Settings';

import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { set } from '@/store/settings/SettingsSlice';
import { setSettings } from '@/helpers/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

const breadcrumb = [
    {
        name: 'Home',
        href: '/admin',
        active: false
    },{
        name: 'Settings',
        active: true
    }
]

export const SettingsComponent = () => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState( false )

    const dispatch = useDispatch();
    const { settings } = useSelector(state => state.settings);

    const formData = {
      title: '',
      heroe: '',
      logo: '',
      fondo: '',
    }

    const { onInputChange, onSetFormState, formState } = useForm(formData)

    const onSave= ( evt ) => {
        evt.preventDefault();
        setIsLoading( true )

        update( formState )
        .then( (data) => {
            setIsLoading( false )
            
            setSettings( data.saved );
            dispatch( set( data.saved ) )

            onSetFormState( {...formData}  )
            notify( 'Configuración Actualizada', 'success');
        }).catch( error => {
            setIsLoading( false )
            
            console.log( error );
            notify( 'Configuración Error', 'error');
        })
    }


    const onUploadImage = ( evt, key ) => {

        const logoSize = {
            width: 427,
            height: 117,
        }

        const heroeSize = {
            width: 104,
            height: 161,
        }

        let finalSize = {
            width: 0,
            height: 0,
        }


        const reader = new FileReader();
        reader.readAsDataURL(evt.target.files[0]);
        reader.onload = function(event) {

            var image=new Image();
            image.src=event.target.result;
            image.onload = function () {
                let hasSize = true;
                switch(key) {
                    case 'logo':
                        finalSize = logoSize;
                        if( image.width > logoSize.width) {
                            if ( Math.ceil(image.width/logoSize.width) != Math.ceil(image.height/logoSize.height)) {
                                hasSize = false;
                            }
                        } else {
                            if ( Math.ceil(logoSize.width/image.width) != Math.ceil(logoSize.height/image.height)) {
                                hasSize = false;
                            }
                        }
                        break;
                    case 'heroe':
                        finalSize = heroeSize;

                        if( image.width > heroeSize.width) {
                            if ( Math.ceil(image.width/heroeSize.width) != Math.ceil(image.height/heroeSize.height)) {
                                hasSize = false;
                            }
                        } else {
                            if ( Math.ceil(heroeSize.width/image.width) != Math.ceil(heroeSize.height/image.height)) {
                                hasSize = false;
                            }
                        }
                        break;
                    default:
                        break;
                }

                if ( hasSize ) {
                    const myEvent = { target: { name: key, value: event.target.result }}
                    onInputChange( myEvent )
                } else {
                    notify( `El tamaño de la imagen debe coincidir con ${finalSize.width}x${finalSize.height} o su ratio equivalente`, "error");
                }
            };

        };
            reader.onerror = function() {
            notify( t('profile.alerts.error-image'), "error");
        };
    }

    return (
        <div className="w-100 p-4">
            <h1 className="mb-4"> Settings </h1>
            
            <Breadcrumb items={breadcrumb} />

            <h5 className="mb-4"> Settings Form </h5>
            <form onSubmit={onSave}>
                <div className="card mb-4">
                    <div className="card-body">
                        <div className="form">
                            <div className="mb-3 row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Título:</label>
                                <div className="col-sm-10">
                                    <input
                                        placeholder='Titulo del Sitio'
                                        value={formState.title}
                                        name='title'
                                        type='text'
                                        className='form-control'
                                        onChange={onInputChange} />
                                </div>
                            </div>
                            
                            <div className="mb-3 row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Logo:</label>
                                <div className="col-sm-9">
                                    <input
                                        type='file'
                                        accept='image/png, image/jpeg'
                                        className='form-control'
                                        onChange={(evt) => onUploadImage(evt, 'logo')} />
                                </div>
                                <div className="col-sm-1">
                                    <button className='btn'>
                                        <FontAwesomeIcon icon={faQuestion} />
                                    </button>
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <div className="col-sm-2"></div>
                                <div className="col-sm-10">
                                    <img src={ settings.logo } style={{ maxWidth: '180px'}} />
                                </div>
                            </div>
                            
                            <div className="mb-3 row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Heroe:</label>
                                <div className="col-sm-9">
                                    <input 
                                        type='file'
                                        accept='image/png, image/jpeg'
                                        className='form-control'
                                        onChange={(evt) => onUploadImage(evt, 'heroe')} />
                                </div>
                                <div className="col-sm-1">
                                    <FontAwesomeIcon icon={faQuestion} />
                                </div>
                            </div>
                            
                            <div className="mb-3 row">
                                <div className="col-sm-2"></div>
                                <div className="col-sm-10">
                                    <img src={ settings.heroe } style={{ maxWidth: '180px'}} />
                                </div>
                            </div>
                            
                            <div className="mb-3 row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Imagen de Fondo:</label>
                                <div className="col-sm-10">
                                    <input 
                                        type='file'
                                        accept='image/png, image/jpeg'
                                        className='form-control'
                                        onChange={(evt) => onUploadImage(evt, 'fondo')} />
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <div className="col-sm-2"></div>
                                <div className="col-sm-10">
                                    <img src={ settings.fondo } style={{ maxWidth: '180px'}} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='btn btn-primary' type='submit' disabled={isLoading}>
                    { 
                        isLoading ? t('loading') : t('save')
                    }
                </button>
            </form>
        </div>
    )
}
