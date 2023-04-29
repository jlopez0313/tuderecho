import React from 'react'
import styles from './Chat.module.scss';

import Avatar from '@/assets/images/abogado/perfil/avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faRectangleXmark, faWindowMaximize } from '@fortawesome/free-regular-svg-icons';

export const ChatHeader = ({ recipient, minimize, onMinimizeChat, onHideChat, headerStyles }) => {
    return (
        <div className={`bg-outline-danger ${headerStyles.background} p-2 ${styles.chatHeader} d-flex rounded-top`}>
            <div className={`${headerStyles.textColor} w-100 top d-flex align-items-center`}>
                <div>
                    <img src={recipient?.photo || Avatar} alt="" className={`${styles.avatar} me-3`}/>
                </div>
                <span className='w-100'> { recipient?.name } </span>
            </div>
            {
                minimize 
                ? <FontAwesomeIcon icon={faWindowMaximize} className={`cursor-pointer me-3 ${headerStyles.textColor}`} onClick={() => onMinimizeChat( false )} />  
                : <FontAwesomeIcon icon={faMinus} className={`cursor-pointer me-3 ${headerStyles.textColor}`} onClick={() => onMinimizeChat( true )} />
            }
            <FontAwesomeIcon icon={faRectangleXmark} className={`cursor-pointer ${headerStyles.textColor}`} onClick={() => onHideChat()} />
        </div>
    )
}
