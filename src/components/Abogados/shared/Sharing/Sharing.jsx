import React from 'react'
import { useTranslation } from 'react-i18next';
import {FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share'

export const Sharing = () => {
    const { t } = useTranslation();

    const shareUrl = 'http://github.com';
    const title = 'GitHub';
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
