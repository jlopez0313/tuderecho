import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComment, faBell } from '@fortawesome/free-regular-svg-icons';
import { faBackward, faBackwardStep, faBars, faChevronLeft, faChevronRight, faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Logo from '@/assets/images/logo.png'
import LogoSmall from '@/assets/images/logo-small.png'
import { SideMenu } from "../SideMenu/SideMenu";
import { useState } from "react";
import './Header.scss';
import { Notificaciones } from "@/components/Abogados/Notificaciones/Notificaciones";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Button } from "./Buttons/Button";
import { List } from "@/components/Abogados/Chat/List";

import { useTranslation } from 'react-i18next';

export const Header = () => {

    const { t } = useTranslation();

    const [showSubmenu, setShowSubmenu] = useState(false);
    const [animateClass, setAnimateClass] = useState('animate__slideInRight')

    const onShowSubMenu = () => {
        setShowSubmenu( true )
        setAnimateClass( 'animate__slideInRight' )
    }
   
    return (
        <div className='header border shadow-sm'>
            <div className='px-4 py-2 d-flex flex-wrap align-items-center justify-content-sm-between'>
                <Link to="/abogados" className="order-1 m-auto">
                    <img src={LogoSmall} className='logo-sm' alt=''/>
                    <img src={Logo} className='logo2' alt=''/>
                </Link>
                
                <input className="m-auto order-sm-2 order-3 form-control w-sm-50 p-2 explorar" type="text" placeholder={ t('explore')} aria-label="default input example" />
                
                <div className="d-flex order-sm-3 order-2 ms-auto justify-content-between">
                    <Button className='d-none left-min' component={<List />} icon={faChevronRight} />
                    <Button className='d-none right-min' component={<List />} icon={faChevronLeft} />
                    <Button className='d-none plus-min' component={<List />} icon={faPlus} />
                    <Button component={<List />} icon={faComment} />

                    <Button component={<Notificaciones />} icon={faBell} />

                    <button className="btn me-3" onClick={onShowSubMenu}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    {
                        showSubmenu ? 
                            <>
                                {
                                    animateClass === 'animate__slideInRight' ? 
                                        <div className="offcanvas-backdrop show"></div>
                                    : null
                                }
                                <SideMenu animateClass={animateClass} setAnimateClass={setAnimateClass}/>
                            </>
                        : null
                    }
                </div>

            </div>
        </div>
    )
}
