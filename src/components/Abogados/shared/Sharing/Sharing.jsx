import React from 'react'
import { useTranslation } from 'react-i18next';
import {FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share'
import { TITLE } from '@/constants/constants';
import { useSelector } from 'react-redux';

export const Sharing = ({ id }) => {
    const { t } = useTranslation();

    const shareUrl = `${window.location.protocol}//${window.location.host}/posts/${id}`;
    
    const { settings } = useSelector(state => state.settings);
    const title = settings?.title ? settings?.title + `-${TITLE}` : TITLE;
    
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
