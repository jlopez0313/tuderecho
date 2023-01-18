import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComment, faBell } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Logo from '@/assets/images/logo.png'
import { SideMenu } from "../SideMenu/SideMenu";
import { useState } from "react";
import './Header.scss';

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
                <Link to="/" className="order-1 m-auto">
                    <img src={Logo} className='logo2' />
                </Link>
                
                <input className="m-auto order-sm-2 order-3 form-control w-sm-50 p-3 explorar" type="text" placeholder="Explorar..." aria-label="default input example" />
                
                <div className="d-flex order-sm-3 order-2 ms-auto justify-content-between">
                    <button className="btn me-3">
                        <FontAwesomeIcon icon={faComment} className='' />
                    </button>
                    <button className="btn me-3">
                        <FontAwesomeIcon icon={faBell}  className='' />
                    </button>
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
