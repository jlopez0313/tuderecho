import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import {FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share'
import { TITLE } from '@/constants/constants';
import { useSelector } from 'react-redux';

import { PublicacionContext } from '@/context/publicacion/PublicacionContext';

export const Sharing = ({ id }) => {

    const { t } = useTranslation();
    const shareUrl = `${window.location.protocol}//${window.location.host}/posts/${id}`;

    const [] = useState('');

    const { publicacion } = useContext( PublicacionContext );
    const { settings } = useSelector(state => state.settings);
    const title = settings?.title ? settings?.title + `-${TITLE}` : TITLE;

    useEffect(() => {
        
    }, []);

    useEffect(() => {
        document.head.querySelectorAll('.meta')
            .forEach( (node) => node.parentElement.removeChild(node) );

        if( publicacion ) {
            let img =  ''
            if ( publicacion.medias.length > 0 ) {
                img = publicacion.medias[0]
            } else if ( publicacion.gif ) {
                img = publicacion.gif
            }

            let desc = publicacion.comment || 'Sabiux is where over 100 million proffesionals shape the future together.'

            document.head.innerHTML+=`
                <meta class='meta' name="description" content="${desc}">
                <meta class='meta' name="twitter:image:src" content="${img}" />
                <meta class='meta' name="twitter:site" content="@sabiux" />
                <meta class='meta' name="twitter:description" content="${desc}" />
                <meta class='meta' name="twitter:card" content="summary_large_image" />
                <meta class='meta' name="twitter:title" content="Sabiux: Let's start from here" />
                
                <meta class='meta' property="og:image" content="${img}" />
                <meta class='meta' property="og:image:alt" content="${desc}" />
                <meta class='meta' property="og:url" content="${shareUrl}" />
                <meta class='meta' property="og:description" content="${desc}" />
                <meta class='meta' property="og:site_name" content="Sabiux" />
                <meta class='meta' property="og:type" content="object" />
                <meta class='meta' property="og:title" content="Sabiux: Let's start from here" />
            `
        }
    }, [publicacion])
    
    return (
        <>
            <span> { t('shareOn')}: </span>

            <FacebookShareButton
                url={shareUrl}
                quote={title}
                className="mx-2"
            >
                <FacebookIcon size={18} round />
            </FacebookShareButton>


            <TwitterShareButton
                url={shareUrl}
                title={title}
                className="mx-2"
            >
                <TwitterIcon size={18} round />
            </TwitterShareButton>


            <WhatsappShareButton
                url={shareUrl}
                title={title}
                separator=":: "
                className="mx-2"
            >
                <WhatsappIcon size={18} round />
            </WhatsappShareButton>

            {/*
            <FontAwesomeIcon 
                className='icon cursor-pointer mx-2'
                icon={faInstagram}
                title="Instagram"
            />
            */}
        </>
    )
}
