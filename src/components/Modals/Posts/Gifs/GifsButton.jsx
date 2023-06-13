import { useState } from "react"
import { GifsModal } from "./GifsModal";

export const GifsButton = ({ onSetGif, gif, medias}) => {
    const [show, setModalShow] = useState( false );

    const onDoSetGif = ( gif ) => {
        onSetGif( gif )
        setModalShow( false )
    }

    return (
        <>
            <span
                className={`icon cursor-pointer mx-2 ${ gif || medias.length ? 'disabled' : '' }`}
                onClick={() => setModalShow( true )}
                title="GIF"
            > GIF </span>
            <GifsModal
                showGifs={ show }
                onHide={() => setModalShow( false )}
                onSetGif={(gif) => onDoSetGif( gif )}
            />
        </>
    )
}
