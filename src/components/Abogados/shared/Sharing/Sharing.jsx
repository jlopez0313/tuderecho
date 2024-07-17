import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import {FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share'
import { TITLE } from '@/constants/constants';
import { useSelector } from 'react-redux';

import { PublicacionContext } from '@/context/publicacion/PublicacionContext';

export const Sharing = ({ id }) => {

    const { t } = useTranslation();
    const shareUrl = `${window.location.protocol}//${window.location.host}/posts/${id}`;
    const { settings } = useSelector(state => state.settings);
    const title = settings?.title ? settings?.title + `-${TITLE}` : TITLE;
    
    const { publicacion } = useContext( PublicacionContext );

    useEffect(() => {
        
        if( publicacion ) {
            let img =  ''
            if ( publicacion.medias.length > 0 ) {
                img = publicacion.medias[0]
            } else if ( publicacion.gif ) {
                img = publicacion.gif
            }
            
            const desc = publicacion.comment || 'Sabiux is where over 100 million proffesionals shape the future together.'
            
            const ogImage = document.querySelector("meta[class='og-image']")
            ogImage?.setAttribute("content", img)

            const ogImageAlt = document.querySelector("meta[class='og-image-alt']")
            ogImageAlt?.setAttribute("content", desc)

            const ogUrl = document.querySelector("meta[class='og-url']")
            ogUrl?.setAttribute("content", shareUrl)
            
            const ogDescription = document.querySelector("meta[class='og-description']")
            ogDescription?.setAttribute("content", desc)
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

        </>
    )
}
