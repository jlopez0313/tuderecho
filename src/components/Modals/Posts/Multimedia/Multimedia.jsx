import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhotoFilm } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';

export const Multimedia = ({onSetMedias, medias, gif, isMultiple = true}) => {
    const file = useRef(null)
    const [mediaList, setMedias] = useState([]);
    
    const onClickImage = () => {
        file.current?.click()
    }

    const onUploadImage = async ( evt ) => {
        const files = await Array.from( evt.target.files )
        setMedias( files );
    }

    useEffect( () => {
        onSetMedias(mediaList)
    }, [mediaList])

    return (
        <>
            <input type='file' multiple={isMultiple} accept='image/png, image/jpeg' className='d-none' ref={file} onChange={onUploadImage} />
            <FontAwesomeIcon className={`icon cursor-pointer mx-2  ${ gif || medias.length === 4 ? 'disabled' : '' }`} icon={faPhotoFilm} onClick={ onClickImage } title='Foto/Video' />
        </>
    )
}
