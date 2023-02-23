import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComment, faBell } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Logo from '@/assets/images/logo.png'
import { SideMenu } from "../SideMenu/SideMenu";
import { useState } from "react";
import './Header.scss';
import { Notificaciones } from "@/components/Abogados/Notificaciones/Notificaciones";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Button } from "./Buttons/Button";
import { List } from "@/components/Abogados/Chat/List";

export const Header = () => {
    const [showSubmenu, setShowSubmenu] = useState(false)
    const [animateClass, setAnimateClass] = useState('animate__slideInRight')

    const onToggleSubMenu = () => {
        setShowSubmenu( true )
        setAnimateClass( 'animate__slideInRight' )
    }
   
    return (
        <div className='header'>
            <div className='p-4 d-flex flex-wrap border align-items-center justify-content-sm-between'>
                <Link to="/abogados" className="order-1 m-auto">
                    <img src={Logo} className='logo2' />
                </Link>
                
                <input className="m-auto order-sm-2 order-3 form-control w-sm-50 p-3 explorar" type="text" placeholder="Explorar..." aria-label="default input example" />
                
                <div className="d-flex order-sm-3 order-2 ms-auto justify-content-between">
                    <Button component={<List />} icon={faComment} />
                    <Button component={<Notificaciones />} icon={faBell} />

                    <button className="btn me-3" onClick={ onToggleSubMenu}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    {
                        showSubmenu ? <SideMenu animateClass={animateClass} setAnimateClass={setAnimateClass}/> : null
                    }
                </div>

            </div>
        </div>
    )
}
